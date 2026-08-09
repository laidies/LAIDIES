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
const rulingsPath = value('--rulings');
if (!inventoryPath || !reconciliationPath || !outputPath) {
  throw new Error('required: --inventory FILE --reconciliation FILE --output FILE');
}

const inventory = JSON.parse(fs.readFileSync(path.resolve(inventoryPath), 'utf8'));
const reconciliation = JSON.parse(fs.readFileSync(path.resolve(reconciliationPath), 'utf8'));
if (!Array.isArray(inventory.rows) || !Array.isArray(reconciliation.rows)) {
  throw new Error('inventory and reconciliation must contain rows arrays');
}

const reconciled = new Map(reconciliation.rows.map(row => [row.path, row]));
const rulings = rulingsPath
  ? JSON.parse(fs.readFileSync(path.resolve(rulingsPath), 'utf8'))
  : { schema_version: 1, rulings: [] };
if (rulings.schema_version !== 1 || !Array.isArray(rulings.rulings)) {
  throw new Error('rulings must use schema_version 1 and contain a rulings array');
}
const rulingByPath = new Map();
for (const ruling of rulings.rulings) {
  if (!ruling?.path || !ruling?.source_sha256 || !ruling?.decision || !ruling?.reason) {
    throw new Error('every ruling requires path, source_sha256, decision and reason');
  }
  if (ruling.target_sha256 && !ruling.import_transformation) {
    throw new Error(`ruling with target_sha256 requires import_transformation for ${ruling.path}`);
  }
  if (rulingByPath.has(ruling.path)) throw new Error(`duplicate ruling for ${ruling.path}`);
  rulingByPath.set(ruling.path, ruling);
}
const MAX_REVIEWABLE_PATHS_PER_PACKAGE = 25;
const MAX_DEPENDENCY_SCAN_BYTES = 2 * 1024 * 1024;
const DEPENDENCY_SCAN_EXTENSIONS = new Set(['.html', '.js', '.json', '.md', '.mjs']);
const sourceRoot = inventory.root ? path.resolve(inventory.root) : null;
const baselineRoot = reconciliation.baseline_root ? path.resolve(reconciliation.baseline_root) : null;
const RULING_DECISIONS = new Set([
  'IMPORT_CURRENT',
  'HOLD_STALE_AUTHORITY',
  'HOLD_AUTHORITY_RECONCILIATION',
  'HOLD_OWNER_RECONCILIATION'
]);

function normalizeRepositoryPath(candidate) {
  let relative = candidate.trim().replace(/^\.\//, '');
  if (relative.startsWith('Website-homepage/')) relative = relative.slice('Website-homepage/'.length);
  if (!relative || path.isAbsolute(relative) || relative.includes('..') || relative.includes('*')) return null;
  return relative.split(path.sep).join('/');
}

function exactSourceReferences(relative) {
  if (!sourceRoot || !baselineRoot || !DEPENDENCY_SCAN_EXTENSIONS.has(path.extname(relative).toLowerCase())) return [];
  const absolute = path.join(sourceRoot, relative);
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile() || fs.statSync(absolute).size > MAX_DEPENDENCY_SCAN_BYTES) return [];
  const contents = fs.readFileSync(absolute, 'utf8');
  const references = new Set();
  for (const match of contents.matchAll(/`([^`\n]+)`/g)) {
    const normalized = normalizeRepositoryPath(match[1]);
    if (!normalized || normalized === relative) continue;
    const sourceCandidate = path.join(sourceRoot, normalized);
    if (fs.existsSync(sourceCandidate) && fs.statSync(sourceCandidate).isFile()) references.add(normalized);
  }
  return [...references].sort();
}

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

function packageReadiness(routingConfidence, reviewableCount, unresolvedReferencedPaths) {
  if (reviewableCount === 0) {
    return {
      status: 'NO_REVIEWABLE_WORK',
      reason: 'This package contains no path with a REVIEW action.'
    };
  }
  if (routingConfidence !== 'HIGH') {
    return {
      status: 'HOLD_ROUTE_CONFIRMATION',
      reason: `Routing confidence is ${routingConfidence}; confirm the exact owner and package boundary before review.`
    };
  }
  if (reviewableCount > MAX_REVIEWABLE_PATHS_PER_PACKAGE) {
    return {
      status: 'HOLD_OVERSIZED_REQUIRES_SUBDIVISION',
      reason: `${reviewableCount} reviewable paths exceed the ${MAX_REVIEWABLE_PATHS_PER_PACKAGE}-path package limit.`
    };
  }
  if (unresolvedReferencedPaths.length > 0) {
    return {
      status: 'HOLD_REFERENCED_DIRTY_PATH',
      reason: `${unresolvedReferencedPaths.length} exact referenced source path(s) are absent from the clean baseline and outside this package.`
    };
  }
  return {
    status: 'READY_FOR_OWNER_REVIEW',
    reason: 'The route is high-confidence and the package is within the bounded review limit.'
  };
}

const dirtyRows = inventory.rows.filter(row => !['TRACKED_CLEAN', 'IGNORED'].includes(row.git_state));
const groups = new Map();
const actionCounts = {};
for (const row of dirtyRows) {
  const reconciliationRow = reconciled.get(row.path) || null;
  const comparison = reconciliationRow?.comparison || null;
  const ruling = rulingByPath.get(row.path) || null;
  let routed = route(row.path);
  let proposedAction = action(row, comparison);
  let rulingStatus = null;
  if (ruling) {
    if (!RULING_DECISIONS.has(ruling.decision)) throw new Error(`unsupported ruling decision ${ruling.decision} for ${row.path}`);
    if (ruling.package_key) routed = { key: ruling.package_key, confidence: 'HIGH' };
    if (!reconciliationRow?.source_sha256 || reconciliationRow.source_sha256 !== ruling.source_sha256) {
      proposedAction = 'HOLD_STALE_RULING';
      rulingStatus = 'STALE_SOURCE_SHA';
    } else if (ruling.decision === 'IMPORT_CURRENT' && ruling.target_sha256) {
      if (!reconciliationRow?.baseline_sha256 || reconciliationRow.baseline_sha256 !== ruling.target_sha256) {
        proposedAction = 'HOLD_STALE_RULING';
        rulingStatus = 'STALE_TARGET_SHA';
      } else {
        proposedAction = 'NO_IMPORT_NEEDED_TRANSFORMED';
        rulingStatus = 'TRANSFORMED_TARGET_MATCH';
      }
    } else if (ruling.decision === 'IMPORT_CURRENT') {
      rulingStatus = 'CURRENT_IMPORT_RULING';
    } else {
      proposedAction = ruling.decision;
      rulingStatus = 'CURRENT_HOLD_RULING';
    }
  }
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
    proposed_action: proposedAction,
    recovery_ruling: ruling ? {
      decision: ruling.decision,
      status: rulingStatus,
      source_sha256: ruling.source_sha256,
      target_sha256: ruling.target_sha256 || null,
      reason: ruling.reason,
      import_transformation: ruling.import_transformation || 'NONE',
      authority: ruling.authority || []
    } : null
  });
}

const packages = [...groups.values()]
  .map(group => {
    const reviewableCount = Object.entries(group.action_counts)
      .filter(([name]) => name.startsWith('REVIEW_'))
      .reduce((sum, [, count]) => sum + count, 0);
    const packagePaths = new Set(group.rows.map(row => row.path));
    const unresolvedReferencedPaths = [...new Set(group.rows
      .filter(row => row.proposed_action.startsWith('REVIEW_'))
      .flatMap(row => exactSourceReferences(row.path))
      .filter(reference => !packagePaths.has(reference) && !fs.existsSync(path.join(baselineRoot || '', reference))))]
      .sort();
    const readiness = packageReadiness(group.routing_confidence, reviewableCount, unresolvedReferencedPaths);
    return {
      ...group,
      reviewable_count: reviewableCount,
      unresolved_referenced_paths: unresolvedReferencedPaths,
      package_status: readiness.status,
      package_status_reason: readiness.reason,
      rows: group.rows.sort((a, b) => a.path.localeCompare(b.path))
    };
  })
  .sort((a, b) => b.reviewable_count - a.reviewable_count || b.file_count - a.file_count || a.package_key.localeCompare(b.package_key));

const packageStatusCounts = packages.reduce((counts, group) => {
  counts[group.package_status] = (counts[group.package_status] || 0) + 1;
  return counts;
}, {});
const readyReviewablePaths = packages
  .filter(group => group.package_status === 'READY_FOR_OWNER_REVIEW')
  .reduce((sum, group) => sum + group.reviewable_count, 0);

const report = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  inventory_path: path.resolve(inventoryPath),
  inventory_generated_at: inventory.generated_at,
  reconciliation_path: path.resolve(reconciliationPath),
  reconciliation_generated_at: reconciliation.generated_at,
  rulings_path: rulingsPath ? path.resolve(rulingsPath) : null,
  ruling_count: rulings.rulings.length,
  dirty_file_count: dirtyRows.length,
  package_count: packages.length,
  maximum_reviewable_paths_per_package: MAX_REVIEWABLE_PATHS_PER_PACKAGE,
  package_status_counts: packageStatusCounts,
  ready_reviewable_paths: readyReviewablePaths,
  action_counts: actionCounts,
  safety_rules: [
    'No row is deleted, moved, staged or committed by this planner.',
    'UNKNOWN never moves.',
    'Referenced historical or rejected material remains preserved until archive gates pass.',
    'A package key routes review; it does not confer owner authority.',
    `Packages with more than ${MAX_REVIEWABLE_PATHS_PER_PACKAGE} reviewable paths remain held until subdivided.`,
    'Only HIGH-confidence routes can become ready for owner review.',
    'An exact backticked source path that exists only in the dirty source tree holds the package until the dependency is present in the clean baseline or included in the same package.',
    'A recovery ruling binds the exact dirty-source SHA; changed bytes become HOLD_STALE_RULING automatically.',
    'A HOLD ruling preserves bytes in place and grants no deletion, archive, import or current-authority claim.',
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
  maximum_reviewable_paths_per_package: report.maximum_reviewable_paths_per_package,
  package_status_counts: report.package_status_counts,
  ready_reviewable_paths: report.ready_reviewable_paths,
  action_counts: report.action_counts,
  top_packages: packages.slice(0, 12).map(group => ({
    package_key: group.package_key,
    routing_confidence: group.routing_confidence,
    package_status: group.package_status,
    file_count: group.file_count,
    reviewable_count: group.reviewable_count,
    tracked_changes: group.tracked_changes,
    untracked_additions: group.untracked_additions
  })),
  mutation: report.mutation
}, null, 2)}\n`);
