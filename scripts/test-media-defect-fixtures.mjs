#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-media-defect-fixtures.mjs');
const source = path.join(root, 'operations/evals/media-defect-fixtures.json');
const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
if (current.status !== 0) throw new Error(`current fixture corpus must pass:\n${current.stdout}${current.stderr}`);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-media-fixtures-'));
try {
  const brokenPath = path.join(temporary, 'broken.json');
  const broken = JSON.parse(fs.readFileSync(source, 'utf8'));
  broken.fixtures[0].expected_verdict = 'PASS';
  fs.writeFileSync(brokenPath, JSON.stringify(broken));
  const negative = spawnSync(process.execPath, [checker, '--fixture'], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_MEDIA_FIXTURE_PATH: brokenPath } });
  if (negative.status === 0 || !`${negative.stdout}${negative.stderr}`.includes('known defect must fail closed')) {
    throw new Error(`false-accept fixture was not rejected:\n${negative.stdout}${negative.stderr}`);
  }
  const unsafeOverride = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8', env: { ...process.env, LAIDIES_MEDIA_FIXTURE_PATH: brokenPath } });
  if (unsafeOverride.status === 0 || !`${unsafeOverride.stdout}${unsafeOverride.stderr}`.includes('requires --fixture')) {
    throw new Error(`production media-fixture override was not rejected:\n${unsafeOverride.stdout}${unsafeOverride.stderr}`);
  }
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
console.log('MEDIA DEFECT FIXTURES TEST PASS');
