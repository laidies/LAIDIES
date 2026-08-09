#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-storage-inventory-'));
const output = path.join(fixtureRoot, 'inventory.json');

function write(relative, contents) {
  const destination = path.join(fixtureRoot, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, contents);
}

function git(...parameters) {
  return execFileSync('git', parameters, { cwd: fixtureRoot, encoding: 'utf8' });
}

git('init', '--quiet');
git('config', 'user.name', 'LAiDIES inventory calibration');
git('config', 'user.email', 'inventory-calibration@invalid.local');
write('.gitignore', 'build/\n');
write('operations/DECISIONS.md', 'canonical decision\n');
write('operations/runtime/STANDING-CARD.md', 'current standing card\n');
write('build/tracked.log', 'tracked generated baseline\n');
git('add', '.gitignore', 'operations/DECISIONS.md', 'operations/runtime/STANDING-CARD.md');
git('add', '--force', 'build/tracked.log');
git('commit', '--quiet', '-m', 'fixture baseline');

write('operations/DECISIONS.md', 'canonical decision changed\n');
write('operations/new-source.md', 'new active source\n');
write('operations/external-review/fable-packet/sources/operations/DECISIONS.md', 'copied review input\n');
write('operations/external-review/FABLE-5-v2-SUPERSEDED.zip', 'superseded review bundle\n');
write('operations/design-qa/library-20260724/before-vs-after.png', 'design QA screenshot\n');
write('operations/design-audits/site-20260723/desktop.png', 'design audit screenshot\n');
write('operations/launch/eod-fixture/local-public-artifact/index.html', 'generated site snapshot\n');
write('operations/product-stewards/audience-growth/campaigns/week-01/assets/card.png', 'generated campaign image\n');
write('assets/__storage-inventory-calibration-unknown__.bin', 'deliberately ambiguous; must fail closed\n');
write('build/tracked.log', 'tracked generated changed\n');
write('build/ignored.log', 'ignored generated output\n');

const result = spawnSync(process.execPath, [
  path.join(root, 'scripts/inventory-repository-storage.mjs'),
  '--root', fixtureRoot,
  '--summary-only',
  '--output', output
], { cwd: root, encoding: 'utf8', timeout: 120000 });
assert.equal(result.status, 0, result.stderr);
const summary = JSON.parse(result.stdout);
const inventory = JSON.parse(fs.readFileSync(output, 'utf8'));
assert.ok(summary.file_count > 0);
assert.equal(summary.schema_version, 2);
assert.equal(summary.file_count, inventory.rows.length);
assert.equal(inventory.rows.find(row => row.path === 'operations/DECISIONS.md')?.classification, 'AUTHORITY');
assert.equal(inventory.rows.find(row => row.path === 'operations/runtime/STANDING-CARD.md')?.classification, 'ACTIVE_SOURCE');
assert.equal(inventory.rows.find(row => row.path === 'operations/DECISIONS.md')?.git_state, 'TRACKED_MODIFIED');
assert.equal(inventory.rows.find(row => row.path === 'operations/DECISIONS.md')?.disposition, 'REVIEW_FOR_EXACT_PACKAGE_COMMIT');
assert.equal(inventory.rows.find(row => row.path === 'operations/new-source.md')?.git_state, 'UNTRACKED');
assert.equal(inventory.rows.find(row => row.path === 'operations/new-source.md')?.disposition, 'REVIEW_FOR_EXACT_PACKAGE_COMMIT');
assert.equal(inventory.rows.find(row => row.path === 'operations/external-review/fable-packet/sources/operations/DECISIONS.md')?.classification, 'HISTORICAL');
assert.equal(inventory.rows.find(row => row.path === 'operations/external-review/fable-packet/sources/operations/DECISIONS.md')?.disposition, 'PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF');
assert.equal(inventory.rows.find(row => row.path === 'operations/external-review/FABLE-5-v2-SUPERSEDED.zip')?.classification, 'HISTORICAL');
assert.equal(inventory.rows.find(row => row.path === 'operations/external-review/FABLE-5-v2-SUPERSEDED.zip')?.disposition, 'PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF');
assert.equal(inventory.rows.find(row => row.path === 'operations/design-qa/library-20260724/before-vs-after.png')?.classification, 'GENERATED');
assert.equal(inventory.rows.find(row => row.path === 'operations/design-qa/library-20260724/before-vs-after.png')?.disposition, 'KEEP_OUT_OF_GIT');
assert.equal(inventory.rows.find(row => row.path === 'operations/design-audits/site-20260723/desktop.png')?.classification, 'GENERATED');
assert.equal(inventory.rows.find(row => row.path === 'operations/design-audits/site-20260723/desktop.png')?.disposition, 'KEEP_OUT_OF_GIT');
assert.equal(inventory.rows.find(row => row.path === 'operations/launch/eod-fixture/local-public-artifact/index.html')?.classification, 'GENERATED');
assert.equal(inventory.rows.find(row => row.path === 'operations/launch/eod-fixture/local-public-artifact/index.html')?.disposition, 'KEEP_OUT_OF_GIT');
assert.equal(inventory.rows.find(row => row.path === 'operations/product-stewards/audience-growth/campaigns/week-01/assets/card.png')?.classification, 'GENERATED');
assert.equal(inventory.rows.find(row => row.path === 'operations/product-stewards/audience-growth/campaigns/week-01/assets/card.png')?.disposition, 'KEEP_OUT_OF_GIT');
assert.equal(inventory.rows.find(row => row.path === 'assets/__storage-inventory-calibration-unknown__.bin')?.classification, 'UNKNOWN');
assert.equal(inventory.rows.find(row => row.path === 'assets/__storage-inventory-calibration-unknown__.bin')?.disposition, 'HOLD_UNKNOWN');
assert.equal(inventory.rows.find(row => row.path === 'build/tracked.log')?.disposition, 'REVIEW_TRACKED_GENERATED_FILE');
assert.equal(inventory.rows.find(row => row.path === 'build/ignored.log')?.disposition, 'KEEP_OUT_OF_GIT');
assert.ok(summary.dirty_file_count > 0);
assert.ok(summary.disposition_counts.REVIEW_FOR_EXACT_PACKAGE_COMMIT > 0);
assert.equal(summary.unknown_move_rule, 'UNKNOWN never moves');
fs.rmSync(fixtureRoot, { recursive: true, force: true });
console.log(`REPOSITORY STORAGE INVENTORY CALIBRATION PASS files=${summary.file_count} unknown=${summary.counts.UNKNOWN || 0}`);
