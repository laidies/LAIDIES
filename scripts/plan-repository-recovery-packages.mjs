#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const value = flag => {
  const index = args.indexOf(flag);
  return index < 0 ? null : args[index + 1];
};

const inventoryPath = value('--inventory');
const reconciliationPath = value('--reconciliation');
const outputPath = value('--output');
if (!inventoryPath || !reconciliationPath || !outputPath) {
  throw new Error('required: --inventory FILE --reconciliation FILE --output FILE');
}

const inventory = JSON.parse(fs.readFileSync(path.resolve(inventoryPath), 'utf8'));
const reconciliation = JSON.parse(fs.readFileSync(path.resolve(reconciliationPath), 'utf8'));
if (!Array.isArray(inventory.rows) || !Array.isArray(reconciliation.rows)) {
  throw new Error('inventory and reconciliation must contain rows arrays');
}

const reconciled = new Map(reconciliation.rows.map(row => [row.path, row]));

function route(relative) {
  const parts = relative.split('/');
  if (relative.startsWith('operations/product-stewards/')) {
    if (parts.length >= 4) {
      const child = parts.length >= 5 ? parts[3] : 'root';
      return { key: `product-steward:${parts[2]}:${child}`, confidence: 'HIGH' };
    }
    return { key: 'operating-system:product-stewards', confidence: 'HIGH' };
  }
  if (relative.startsWith('content/library-books/')) {
    const child = parts[2] === 'pilots' && parts[3]
      ? `book:${parts[3]}`
      : (parts.length >= 4 ? parts[2] : 'root');
    return { key: `product-steward:library:${child}`, confidence: 'HIGH' };
  }
  if (relative.startsWith('operations/agents/aidb-intelligence-desk/')) return { key: `intelligence:aidb:${parts[3] || 'root'}`, confidence: 'HIGH' };
  if (relative.startsWith('content/site/')) return { key: 'platform:site-runtime', confidence: 'HIGH' };
  if (relative.startsWith('operations/launch/')) return { key: `release:launch:${parts[2] || 'root'}`, confidence: 'HIGH' };
  if (relative.startsWith('operations/control-room/')) {
    const child = parts[2] === 'evidence' && parts[3] ? `evidence:${parts[3]}` : (parts[2] || 'root');
    return { key: `operating-system:control-room:${child}`, confidence: 'HIGH' };
  }
  if (relative.startsWith('operations/runtime/')) return { key: 'operating-system:runtime', confidence: 'HIGH' };
  if (relative.startsWith('operations/voice/')) return { key: 'authority:voice', confidence: 'HIGH' };
  if (relative.startsWith('operations/external-review/')) return { key: `operating-system:external-review:${parts[2] || 'root'}`, confidence: 'HIGH' };
  if (/^operations\/(design-|review-packets\/)/.test(relative)) return { key: `experience:design-review:${parts[2] || 'root'}`, confidence: 'HIGH' };
  if (relative.startsWith('scripts/')) return { key: 'toolchain:scripts', confidence: 'MEDIUM' };
  if (relative.startsWith('assets/')) return { key: 'assets:shared', confidence: 'MEDIUM' };
  return { key: `path:${parts.slice(0, 2).join('/')}`, confidence: 'LOW' };
}

function action(row, comparison) {
  if (row.disposition === 'HOLD_UNKNOWN') return 'HOLD_UNKNOWN';
  if (row.disposition === 'KEEP_OUT_OF_GIT') return 'KEEP_OUT_OF_GIT';
  if (row.disposition === 'PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF') return 'PRESERVE_PENDING_ARCHIVE_GATES';
  if (row.disposition === 'REVIEW_TRACKED_GENERATED_FILE') return 'REVIEW_TRACKED_GENERATED';
  if (row.disposition === 'VERIFY_DELETION_IN_EXACT_PACKAGE') return 'REVIEW_DELETION';
  if (row.disposition === 'REVIEW_FOR_EXACT_PACKAGE_COMMIT') {
    if (!comparison) return 'HOLD_MISSING_RECONCILIATION';
    if (comparison === 'MATCHES_BASELINE') return 'NO_IMPORT_NEEDED';
    if (comparison === 'DIFFERS_FROM_BASELINE') return 'REVIEW_TRACKED_DIFF';
    if (comparison === 'BASELINE_MISSING') return 'REVIEW_UNTRACKED_ADDITION';
    if (comparison === 'SOURCE_MISSING') return 'REVIEW_DELETION';
    return 'HOLD_UNKNOWN_COMPARISON';
  }
  return row.disposition === 'NO_ACTION' ? 'NO_ACTION' : 'HOLD_UNRECOGNIZED_DISPOSITION';
}

const dirtyRows = inventory.rows.filter(row => !['TRACKED_CLEAN', 'IGNORED'].includes(row.git_state));
const groups = new Map();
const actionCounts = {};
for (const row of dirtyRows) {
  const comparison = reconciled.get(row.path)?.comparison || null;
  const routed = route(row.path);
  const proposedAction = action(row, comparison);
  actionCounts[proposedAction] = (actionCounts[proposedAction] || 0) + 1;
  if (!groups.has(routed.key)) {
    groups.set(routed.key, {
      package_key: routed.key,
      routing_confidence: routed.confidence,
      file_count: 0,
      bytes: 0,
      tracked_changes: 0,
      untracked_additions: 0,
      referenced_paths: 0,
      action_counts: {},
      rows: []
    });
  }
  const group = groups.get(routed.key);
  if (group.routing_confidence !== routed.confidence) group.routing_confidence = 'LOW';
  group.file_count += 1;
  group.bytes += row.bytes || 0;
  if (String(row.git_state).startsWith('TRACKED_')) group.tracked_changes += 1;
  if (row.git_state === 'UNTRACKED') group.untracked_additions += 1;
  if ((row.reference_count || 0) > 0) group.referenced_paths += 1;
  group.action_counts[proposedAction] = (group.action_counts[proposedAction] || 0) + 1;
  group.rows.push({
    path: row.path,
    bytes: row.bytes || 0,
    classification: row.classification,
    git_state: row.git_state,
    inventory_disposition: row.disposition,
    reference_count: row.reference_count || 0,
    comparison,
    proposed_action: proposedAction
  });
}

const packages = [...groups.values()]
  .map(group => ({
    ...group,
    reviewable_count: Object.entries(group.action_counts)
      .filter(([name]) => name.startsWith('REVIEW_'))
      .reduce((sum, [, count]) => sum + count, 0),
    rows: group.rows.sort((a, b) => a.path.localeCompare(b.path))
  }))
  .sort((a, b) => b.reviewable_count - a.reviewable_count || b.file_count - a.file_count || a.package_key.localeCompare(b.package_key));

const report = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  inventory_path: path.resolve(inventoryPath),
  inventory_generated_at: inventory.generated_at,
  reconciliation_path: path.resolve(reconciliationPath),
  reconciliation_generated_at: reconciliation.generated_at,
  dirty_file_count: dirtyRows.length,
  package_count: packages.length,
  action_counts: actionCounts,
  safety_rules: [
    'No row is deleted, moved, staged or committed by this planner.',
    'UNKNOWN never moves.',
    'Referenced historical or rejected material remains preserved until archive gates pass.',
    'A package key routes review; it does not confer owner authority.',
    'Only exact reviewed paths may be committed together.'
  ],
  mutation: 'NONE',
  packages
};

fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  schema_version: report.schema_version,
  generated_at: report.generated_at,
  dirty_file_count: report.dirty_file_count,
  package_count: report.package_count,
  action_counts: report.action_counts,
  top_packages: packages.slice(0, 12).map(group => ({
    package_key: group.package_key,
    routing_confidence: group.routing_confidence,
    file_count: group.file_count,
    reviewable_count: group.reviewable_count,
    tracked_changes: group.tracked_changes,
    untracked_additions: group.untracked_additions
  })),
  mutation: report.mutation
}, null, 2)}\n`);
