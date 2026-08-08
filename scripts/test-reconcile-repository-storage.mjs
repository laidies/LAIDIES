#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-storage-reconcile-'));
const source = path.join(fixture, 'source');
const baseline = path.join(fixture, 'baseline');
const inventoryPath = path.join(fixture, 'inventory.json');
const output = path.join(fixture, 'report.json');
fs.mkdirSync(source);
fs.mkdirSync(baseline);

function write(rootPath, relative, contents) {
  const destination = path.join(rootPath, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

write(source, 'match.txt', 'same\n');
write(baseline, 'match.txt', 'same\n');
write(source, 'different.txt', 'source\n');
write(baseline, 'different.txt', 'baseline\n');
write(source, 'new.txt', 'new\n');
write(baseline, 'deleted.txt', 'old\n');

const rows = ['match.txt', 'different.txt', 'new.txt', 'deleted.txt'].map(relative => ({
  path: relative,
  disposition: 'REVIEW_FOR_EXACT_PACKAGE_COMMIT',
  git_state: relative === 'deleted.txt' ? 'TRACKED_DELETED' : 'UNTRACKED',
  bytes: 4
}));
fs.writeFileSync(inventoryPath, `${JSON.stringify({ generated_at: 'fixture', rows })}\n`);

const result = spawnSync(process.execPath, [
  'scripts/reconcile-repository-storage.mjs',
  '--inventory', inventoryPath,
  '--source-root', source,
  '--baseline-root', baseline,
  '--output', output
], { cwd: root, encoding: 'utf8' });
assert.equal(result.status, 0, result.stderr);
const report = JSON.parse(fs.readFileSync(output, 'utf8'));
const byPath = new Map(report.rows.map(row => [row.path, row]));
assert.equal(byPath.get('match.txt').comparison, 'MATCHES_BASELINE');
assert.equal(byPath.get('different.txt').comparison, 'DIFFERS_FROM_BASELINE');
assert.equal(byPath.get('new.txt').comparison, 'BASELINE_MISSING');
assert.equal(byPath.get('deleted.txt').comparison, 'SOURCE_MISSING');
assert.deepEqual(report.comparison_counts, {
  MATCHES_BASELINE: 1,
  DIFFERS_FROM_BASELINE: 1,
  BASELINE_MISSING: 1,
  SOURCE_MISSING: 1
});
assert.equal(report.mutation, 'NONE');
fs.rmSync(fixture, { recursive: true, force: true });
console.log('REPOSITORY STORAGE RECONCILIATION CALIBRATION PASS match=1 different=1 baseline_missing=1 source_missing=1');
