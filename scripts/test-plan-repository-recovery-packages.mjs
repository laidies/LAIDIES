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
  { path: 'operations/runtime/unreconciled.json', bytes: 60, classification: 'ACTIVE_SOURCE', git_state: 'UNTRACKED', disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT', reference_count: 0 }
];
fs.writeFileSync(inventoryPath, `${JSON.stringify({ generated_at: 'inventory-fixture', rows })}\n`);
fs.writeFileSync(reconciliationPath, `${JSON.stringify({ generated_at: 'reconcile-fixture', rows: [
  { path: rows[0].path, comparison: 'BASELINE_MISSING' },
  { path: rows[1].path, comparison: 'DIFFERS_FROM_BASELINE' }
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
assert.equal(report.dirty_file_count, 5);
assert.equal(report.action_counts.REVIEW_UNTRACKED_ADDITION, 1);
assert.equal(report.action_counts.REVIEW_TRACKED_DIFF, 1);
assert.equal(report.action_counts.HOLD_UNKNOWN, 1);
assert.equal(report.action_counts.PRESERVE_PENDING_ARCHIVE_GATES, 1);
assert.equal(report.action_counts.HOLD_MISSING_RECONCILIATION, 1);
const library = report.packages.find(group => group.package_key === 'product-steward:library:root');
assert.equal(library.file_count, 2);
assert.equal(library.reviewable_count, 2);
assert.equal(library.referenced_paths, 1);
const mystery = report.packages.find(group => group.package_key === 'path:mystery/blob.bin');
assert.equal(mystery.routing_confidence, 'LOW');
assert.equal(mystery.reviewable_count, 0);
assert.match(report.safety_rules.join(' '), /UNKNOWN never moves/);

fs.rmSync(fixture, { recursive: true, force: true });
console.log('REPOSITORY RECOVERY PACKAGE PLANNER CALIBRATION PASS reviewable=2 unknown_hold=1 archive_hold=1 missing_reconciliation_hold=1');
