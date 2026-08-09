#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const value = flag => {
  const index = args.indexOf(flag);
  return index < 0 ? null : args[index + 1];
};

const inventoryPath = value('--inventory');
const sourceRoot = value('--source-root');
const baselineRoot = value('--baseline-root');
const outputPath = value('--output');

if (!inventoryPath || !sourceRoot || !baselineRoot || !outputPath) {
  throw new Error('required: --inventory FILE --source-root DIR --baseline-root DIR --output FILE');
}

const inventory = JSON.parse(fs.readFileSync(path.resolve(inventoryPath), 'utf8'));
const source = path.resolve(sourceRoot);
const baseline = path.resolve(baselineRoot);
const actionable = new Set([
  'REVIEW_FOR_EXACT_PACKAGE_COMMIT',
  'REVIEW_TRACKED_GENERATED_FILE',
  'VERIFY_DELETION_IN_EXACT_PACKAGE'
]);

function safePath(root, relative) {
  const resolved = path.resolve(root, relative);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error(`inventory path escapes root: ${relative}`);
  }
  return resolved;
}

function fileSha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function regularFile(file) {
  try {
    return fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

const rows = [];
const comparisonCounts = {};
for (const row of inventory.rows.filter(candidate => actionable.has(candidate.disposition))) {
  const sourceFile = safePath(source, row.path);
  const baselineFile = safePath(baseline, row.path);
  const sourceExists = regularFile(sourceFile);
  const baselineExists = regularFile(baselineFile);
  const sourceSha256 = sourceExists ? fileSha256(sourceFile) : null;
  const baselineSha256 = baselineExists ? fileSha256(baselineFile) : null;
  const comparison = !sourceExists
    ? 'SOURCE_MISSING'
    : !baselineExists
      ? 'BASELINE_MISSING'
      : sourceSha256 === baselineSha256
        ? 'MATCHES_BASELINE'
        : 'DIFFERS_FROM_BASELINE';
  comparisonCounts[comparison] = (comparisonCounts[comparison] || 0) + 1;
  rows.push({
    path: row.path,
    inventory_disposition: row.disposition,
    classification: row.classification || 'UNKNOWN',
    git_state: row.git_state,
    bytes: row.bytes,
    reference_count: Number.isInteger(row.reference_count) ? row.reference_count : 0,
    comparison,
    source_sha256: sourceSha256,
    baseline_sha256: baselineSha256
  });
}

const report = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  inventory_path: path.resolve(inventoryPath),
  inventory_generated_at: inventory.generated_at,
  source_root: source,
  baseline_root: baseline,
  compared_rows: rows.length,
  comparison_counts: comparisonCounts,
  interpretation: {
    MATCHES_BASELINE: 'Bytes already exist in the clean integration baseline; no new package import is needed.',
    DIFFERS_FROM_BASELINE: 'Bytes need exact owner/package review before integration.',
    BASELINE_MISSING: 'Path needs exact owner/package review before integration.',
    SOURCE_MISSING: 'Deletion or missing-source state needs exact owner/package review.'
  },
  mutation: 'NONE',
  rows
};

fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  schema_version: report.schema_version,
  generated_at: report.generated_at,
  compared_rows: report.compared_rows,
  comparison_counts: report.comparison_counts,
  mutation: report.mutation
}, null, 2)}\n`);
