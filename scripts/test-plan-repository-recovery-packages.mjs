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

const rows = [
  { path: 'content/library-books/new-book.md', bytes: 20, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'operations/product-stewards/library/state.json', bytes: 30, classification: 'ACTIVE_SOURCE', git_state: 'TRACKED_MODIFIED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 2 },
  { path: 'mystery/blob.bin', bytes: 40, classification: 'UNKNOWN', git_state: 'UNTRACKED', disposition: 'HOLD_UNKNOWN', reference_count: 0 },
  { path: 'operations/archive/old.md', bytes: 50, classification: 'HISTORICAL', git_state: 'UNTRACKED', disposition: 'PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF', reference_count: 3 },
  { path: 'operations/runtime/unreconciled.json', bytes: 60, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  { path: 'misc/weak-route.md', bytes: 70, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 },
  ...Array.from({ length: 26 }, (_, index) => ({
    path: `content/library-books/pilots/oversized-book/part-${String(index + 1).padStart(2, '0')}.md`,
    bytes: 10,
    classification: 'ACTIVE_SOURCE',
    git_state: 'UNTRACKED',
    disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT',
    reference_count: 0
  }))
];
fs.writeFileSync(inventoryPath, `${JSON.stringify({ generated_at: 'inventory-fixture', rows })}\n`);
fs.writeFileSync(reconciliationPath, `${JSON.stringify({ generated_at: 'reconcile-fixture', rows: [
  { path: rows[0].path, comparison: 'BASELINE_MISSING' },
  { path: rows[1].path, comparison: 'DIFFERS_FROM_BASELINE' },
  { path: rows[5].path, comparison: 'BASELINE_MISSING' },
  ...rows.slice(6).map(row => ({ path: row.path, comparison: 'BASELINE_MISSING' }))
] })}\n`);

const result = spawnSync(process.execPath, [
  'scripts/plan-repository-recovery-packages.mjs',
  '--inventory', inventoryPath,
  '--reconciliation', reconciliationPath,
  '--output', outputPath
], { cwd: root, encoding: 'utf8' });
assert.equal(result.status, 0, result.stderr);
const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
assert.equal(report.mutation, 'NONE');
assert.equal(report.dirty_file_count, 32);
assert.equal(report.action_counts.REVIEW_UNTRACKED_ADDITION, 28);
assert.equal(report.action_counts.REVIEW_TRACKED_DIFF, 1);
assert.equal(report.action_counts.HOLD_UNKNOWN, 1);
assert.equal(report.action_counts.PRESERVE_PENDING_ARCHIVE_GATES, 1);
assert.equal(report.action_counts.HOLD_MISSING_RECONCILIATION, 1);
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
assert.equal(report.maximum_reviewable_paths_per_package, 25);
assert.equal(report.ready_reviewable_paths, 2);
assert.equal(report.package_status_counts.READY_FOR_OWNER_REVIEW, 1);
assert.equal(report.package_status_counts.HOLD_ROUTE_CONFIRMATION, 1);
assert.equal(report.package_status_counts.HOLD_OVERSIZED_REQUIRES_SUBDIVISION, 1);
assert.match(report.safety_rules.join(' '), /UNKNOWN never moves/);
assert.match(report.safety_rules.join(' '), /Only HIGH-confidence routes/);

fs.rmSync(fixture, { recursive: true, force: true });
console.log('REPOSITORY RECOVERY PACKAGE PLANNER CALIBRATION PASS ready=2 route_hold=1 oversized_hold=26 unknown_hold=1 archive_hold=1 missing_reconciliation_hold=1');
