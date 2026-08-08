#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-cli-guard-'));
const scripts = [
  path.join(root, 'scripts/build-public-site.mjs'),
  path.join(root, 'operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/inventory-public-assets.mjs'),
];

for (const script of scripts) {
  const help = spawnSync(process.execPath, [script, '--help'], { cwd: sandbox, encoding: 'utf8' });
  assert.equal(help.status, 0, `${path.basename(script)} --help must exit successfully`);
  assert.match(help.stdout, /^Usage:/, `${path.basename(script)} --help must print usage`);
  assert.equal(fs.existsSync(path.join(sandbox, '--help')), false, `${path.basename(script)} must not create --help`);

  const rejected = spawnSync(process.execPath, [script, '--dependency-report'], { cwd: sandbox, encoding: 'utf8' });
  assert.notEqual(rejected.status, 0, `${path.basename(script)} must reject a flag-like output path`);
  assert.match(rejected.stderr, /flag-like output paths are rejected/, `${path.basename(script)} must explain the rejection`);
  assert.equal(fs.existsSync(path.join(sandbox, '--dependency-report')), false, `${path.basename(script)} must not create --dependency-report`);
}

console.log('OUTPUT PATH CLI GUARDS PASS help_safe=2 flag_like_rejected=2 no_artifacts=1');
