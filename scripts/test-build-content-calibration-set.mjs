#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-calibration-set-'));
const items = [];
for (let index = 0; index < 22; index += 1) {
  const file = path.join(tmp, `fixture-${index}.txt`); fs.writeFileSync(file, `bad ${index}`);
  items.push({ id: `BAD-${index}`, path: path.basename(file), sha256: crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), introducedAt: index === 0 ? '2025-01-01T00:00:00Z' : `2026-07-${String(Math.min(index, 28)).padStart(2, '0')}T00:00:00Z` });
}
const registry = path.join(tmp, 'registry.json'); fs.writeFileSync(registry, JSON.stringify({ negativeExemplars: items }));
const run = file => spawnSync(process.execPath, ['scripts/build-content-calibration-set.mjs'], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_CONTENT_EXEMPLAR_REGISTRY: file, LAIDIES_CONTENT_ROOT: tmp, LAIDIES_CALIBRATION_NOW: '2026-08-07T00:00:00Z' } });
const valid = run(registry); assert.equal(valid.status, 0, valid.stderr);
const set = JSON.parse(valid.stdout); assert.equal(set.active.length, 20); assert.equal(set.excluded_from_active_calibration.length, 2); assert.match(set.rule, /never deletes/i);
items[1].sha256 = '0'.repeat(64); fs.writeFileSync(registry, JSON.stringify({ negativeExemplars: items }));
const bad = run(registry); assert.notEqual(bad.status, 0); assert.match(bad.stderr, /SHA does not match/);
fs.rmSync(tmp, { recursive: true, force: true });
console.log('CONTENT CALIBRATION SET CALIBRATION PASS active_cap=20 stale_or_overflow=2 hash_reject=1');
