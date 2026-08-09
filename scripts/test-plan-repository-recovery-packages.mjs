#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-recovery-packages-'));
const inventoryPath = path.join(fixture, 'inventory.json');
const reconciliationPath = path.join(fixture, 'reconciliation.json');
const outputPath = path.join(fixture, 'packages.json');
const rulingsPath = path.join(fixture, 'rulings.json');
const sourceRoot = path.join(fixture, 'source');
const baselineRoot = path.join(fixture, 'baseline');

const rows = [
  { path: 'content/library-books/new-book.md', bytes: 20, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'operations/product-stewards/library/state.json', bytes: 30, classification: 'ACTIVE_SOURCE', git_state: 'TRACKED_MODIFIED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 2 },
  { path: 'mystery/blob.bin', bytes: 40, classification: 'UNKNOWN', git_state: 'UNTRACKED', disposition: 'HOLD_UNKNOWN', reference_count: 0 },
  { path: 'operations/archive/old.md', bytes: 50, classification: 'HISTORICAL', git_state: 'UNTRACKED', disposition: 'PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF', reference_count: 3 },
  { path: 'operations/runtime/unreconciled.json', bytes: 60, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'misc/weak-route.md', bytes: 70, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'operations/agents/aidb-intelligence-desk/handoffs/site-refresh-register.md', bytes: 80, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 1 },
  { path: 'operations/product-stewards/current.md', bytes: 90, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'operations/product-stewards/stale.md', bytes: 100, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'operations/product-stewards/transformed.md', bytes: 110, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'operations/product-stewards/stale-target.md', bytes: 120, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  ...Array.from({ length: 26 }, (_, index) => ({
    path: `content/library-books/pilots/oversized-book/part-${String(index + 1).padStart(2, '0')}.md`,
    bytes: 10,
    classification: 'ACTIVE_SOURCE',
    git_state: 'UNTRACKED',
    disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT',
    reference_count: 0
  }))
];
for (const row of rows) {
  const absolute = path.join(sourceRoot, row.path);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, 'fixture\n');
}
fs.writeFileSync(path.join(sourceRoot, rows[0].path), '`operations/product-stewards/library/state.json` stays inside this package.\n');
fs.writeFileSync(path.join(sourceRoot, rows[1].path), '`operations/voice/settled.md` already exists in the baseline.\n');
fs.mkdirSync(path.join(sourceRoot, 'operations/voice'), { recursive: true });
fs.mkdirSync(path.join(baselineRoot, 'operations/voice'), { recursive: true });
fs.writeFileSync(path.join(sourceRoot, 'operations/voice/settled.md'), 'settled\n');
fs.writeFileSync(path.join(baselineRoot, 'operations/voice/settled.md'), 'settled\n');
const missingDependency = 'operations/agents/aidb-intelligence-desk/handoffs/site-refresh/missing.md';
fs.mkdirSync(path.dirname(path.join(sourceRoot, missingDependency)), { recursive: true });
fs.writeFileSync(path.join(sourceRoot, missingDependency), 'dirty-only dependency\n');
fs.writeFileSync(path.join(sourceRoot, rows[6].path), `Needs \`${missingDependency}\`.\n`);
fs.writeFileSync(inventoryPath, `${JSON.stringify({ generated_at: 'inventory-fixture', root: sourceRoot, rows })}\n`);
fs.writeFileSync(reconciliationPath, `${JSON.stringify({ generated_at: 'reconcile-fixture', baseline_root: baselineRoot, rows: [
  { path: rows[0].path, comparison: 'BASELINE_MISSING' },
  { path: rows[1].path, comparison: 'DIFFERS_FROM_BASELINE' },
  { path: rows[5].path, comparison: 'BASELINE_MISSING' },
  ...rows.slice(6).map(row => ({ path: row.path, comparison: 'BASELINE_MISSING' })),
  { path: rows[7].path, comparison: 'BASELINE_MISSING', source_sha256: 'current-sha' },
  { path: rows[8].path, comparison: 'BASELINE_MISSING', source_sha256: 'changed-sha' },
  { path: rows[9].path, comparison: 'DIFFERS_FROM_BASELINE', source_sha256: 'transform-source-sha', baseline_sha256: 'transform-target-sha' },
  { path: rows[10].path, comparison: 'DIFFERS_FROM_BASELINE', source_sha256: 'stale-target-source-sha', baseline_sha256: 'changed-target-sha' }
] })}\n`);
fs.writeFileSync(rulingsPath, `${JSON.stringify({ schema_version: 1, rulings: [
  {
    path: rows[7].path,
    source_sha256: 'current-sha',
    decision: 'IMPORT_CURRENT',
    package_key: 'operating-system:product-stewards:current',
    reason: 'Current authority.'
  },
  {
    path: rows[8].path,
    source_sha256: 'old-sha',
    decision: 'HOLD_STALE_AUTHORITY',
    package_key: 'operating-system:product-stewards:stale',
    reason: 'Predecessor authority.'
  },
  {
    path: rows[9].path,
    source_sha256: 'transform-source-sha',
    target_sha256: 'transform-target-sha',
    decision: 'IMPORT_CURRENT',
    package_key: 'operating-system:product-stewards:transformed',
    import_transformation: 'Formatting-only normalization.',
    reason: 'The transformed target is the accepted import.'
  },
  {
    path: rows[10].path,
    source_sha256: 'stale-target-source-sha',
    target_sha256: 'expected-target-sha',
    decision: 'IMPORT_CURRENT',
    package_key: 'operating-system:product-stewards:stale-target',
    import_transformation: 'Formatting-only normalization.',
    reason: 'The transformed target changed and must fail closed.'
  }
] })}\n`);

const result = spawnSync(process.execPath, [
  'scripts/plan-repository-recovery-packages.mjs',
  '--inventory', inventoryPath,
  '--reconciliation', reconciliationPath,
  '--rulings', rulingsPath,
  '--output', outputPath
], { cwd: root, encoding: 'utf8' });
assert.equal(result.status, 0, result.stderr);
const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
assert.equal(report.mutation, 'NONE');
assert.equal(report.dirty_file_count, 37);
assert.equal(report.action_counts.REVIEW_UNTRACKED_ADDITION, 30);
assert.equal(report.action_counts.REVIEW_TRACKED_DIFF, 1);
assert.equal(report.action_counts.HOLD_UNKNOWN, 1);
assert.equal(report.action_counts.PRESERVE_PENDING_ARCHIVE_GATES, 1);
assert.equal(report.action_counts.HOLD_MISSING_RECONCILIATION, 1);
assert.equal(report.action_counts.HOLD_STALE_RULING, 2);
assert.equal(report.action_counts.NO_IMPORT_NEEDED_TRANSFORMED, 1);
assert.equal(report.ruling_count, 4);
const library = report.packages.find(group => group.package_key === 'product-steward:library:root');
assert.equal(library.file_count, 2);
assert.equal(library.reviewable_count, 2);
assert.equal(library.referenced_paths, 1);
assert.equal(library.package_status, 'READY_FOR_OWNER_REVIEW');
const mystery = report.packages.find(group => group.package_key === 'path:mystery/blob.bin');
assert.equal(mystery.routing_confidence, 'LOW');
assert.equal(mystery.reviewable_count, 0);
assert.equal(mystery.package_status, 'NO_REVIEWABLE_WORK');
const weakRoute = report.packages.find(group => group.package_key === 'path:misc/weak-route.md');
assert.equal(weakRoute.reviewable_count, 1);
assert.equal(weakRoute.package_status, 'HOLD_ROUTE_CONFIRMATION');
const oversized = report.packages.find(group => group.package_key === 'product-steward:library:book:oversized-book');
assert.equal(oversized.reviewable_count, 26);
assert.equal(oversized.package_status, 'HOLD_OVERSIZED_REQUIRES_SUBDIVISION');
const dependencyHold = report.packages.find(group => group.package_key === 'intelligence:aidb:handoffs');
assert.equal(dependencyHold.reviewable_count, 1);
assert.equal(dependencyHold.package_status, 'HOLD_REFERENCED_DIRTY_PATH');
assert.deepEqual(dependencyHold.unresolved_referenced_paths, [missingDependency]);
assert.deepEqual(library.unresolved_referenced_paths, []);
const currentRuling = report.packages.find(group => group.package_key === 'operating-system:product-stewards:current');
assert.equal(currentRuling.package_status, 'READY_FOR_OWNER_REVIEW');
assert.equal(currentRuling.rows[0].recovery_ruling.status, 'CURRENT_IMPORT_RULING');
const staleRuling = report.packages.find(group => group.package_key === 'operating-system:product-stewards:stale');
assert.equal(staleRuling.package_status, 'NO_REVIEWABLE_WORK');
assert.equal(staleRuling.rows[0].proposed_action, 'HOLD_STALE_RULING');
assert.equal(staleRuling.rows[0].recovery_ruling.status, 'STALE_SOURCE_SHA');
const transformedRuling = report.packages.find(group => group.package_key === 'operating-system:product-stewards:transformed');
assert.equal(transformedRuling.package_status, 'NO_REVIEWABLE_WORK');
assert.equal(transformedRuling.rows[0].proposed_action, 'NO_IMPORT_NEEDED_TRANSFORMED');
assert.equal(transformedRuling.rows[0].recovery_ruling.status, 'TRANSFORMED_TARGET_MATCH');
assert.equal(transformedRuling.rows[0].recovery_ruling.target_sha256, 'transform-target-sha');
const staleTargetRuling = report.packages.find(group => group.package_key === 'operating-system:product-stewards:stale-target');
assert.equal(staleTargetRuling.package_status, 'NO_REVIEWABLE_WORK');
assert.equal(staleTargetRuling.rows[0].proposed_action, 'HOLD_STALE_RULING');
assert.equal(staleTargetRuling.rows[0].recovery_ruling.status, 'STALE_TARGET_SHA');
assert.equal(report.maximum_reviewable_paths_per_package, 25);
assert.equal(report.ready_reviewable_paths, 3);
assert.equal(report.package_status_counts.READY_FOR_OWNER_REVIEW, 2);
assert.equal(report.package_status_counts.HOLD_ROUTE_CONFIRMATION, 1);
assert.equal(report.package_status_counts.HOLD_OVERSIZED_REQUIRES_SUBDIVISION, 1);
assert.equal(report.package_status_counts.HOLD_REFERENCED_DIRTY_PATH, 1);
assert.match(report.safety_rules.join(' '), /UNKNOWN never moves/);
assert.match(report.safety_rules.join(' '), /Only HIGH-confidence routes/);
assert.match(report.safety_rules.join(' '), /exact backticked source path/);
assert.match(report.safety_rules.join(' '), /HOLD_STALE_RULING/);

fs.rmSync(fixture, { recursive: true, force: true });
console.log('REPOSITORY RECOVERY PACKAGE PLANNER CALIBRATION PASS ready=3 route_hold=1 oversized_hold=26 dependency_hold=1 unknown_hold=1 archive_hold=1 missing_reconciliation_hold=1 stale_source_hold=1 transformed_match=1 stale_target_hold=1');
