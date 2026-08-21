#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(repo, 'scripts/quarantine-all-episode-media.mjs');
function fixture() {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-all-episode-quarantine-'));
  const source = path.join(base, 'source'); const destination = path.join(base, 'quarantine');
  fs.mkdirSync(path.join(source, 'assets/episodes/shared'), { recursive: true });
  fs.mkdirSync(path.join(source, 'operations/assets'), { recursive: true });
  fs.writeFileSync(path.join(source, 'assets/episodes/shared/welcome-back-series-comic-v1-1920.png'), 'known rejected bytes');
  fs.writeFileSync(path.join(source, 'operations/assets/active-asset-registry.json'), JSON.stringify({ entries: [] }));
  return { source, destination };
}
function run(source, destination, mode) { return spawnSync(process.execPath, [script, source, destination, mode], { encoding: 'utf8' }); }
const valid = fixture();
assert.equal(run(valid.source, valid.destination, '--apply').status, 0, 'valid fixture must quarantine');
assert.equal(run(valid.source, valid.destination, '--verify').status, 0, 'valid quarantine must verify');
const manifest = JSON.parse(fs.readFileSync(path.join(valid.destination, 'manifest.json'), 'utf8'));
const row = manifest.records[0];
fs.writeFileSync(path.join(valid.destination, row.original_path), 'tampered');
assert.notEqual(run(valid.source, valid.destination, '--verify').status, 0, 'tampered quarantine must fail');
console.log('ALL EPISODE QUARANTINE CALIBRATION PASS applied=1 valid=passed hash_tamper=failed');
