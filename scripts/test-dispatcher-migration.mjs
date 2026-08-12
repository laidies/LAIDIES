#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-dispatcher-migration.mjs');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'operations/runtime/dispatcher-migration.json'), 'utf8'));
const sourceRoot = path.join(os.homedir(), '.codex/automations');
const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
if (current.status !== 0) throw new Error(`current migration must pass:\n${current.stdout}${current.stderr}`);
const ciHome = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-empty-home-'));
const ciContract = spawnSync(process.execPath, [checker], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, CI: 'true', HOME: ciHome }
});
fs.rmSync(ciHome, { recursive: true, force: true });
if (ciContract.status !== 0 || !`${ciContract.stdout}${ciContract.stderr}`.includes('LIVE AUTOMATION STATE UNVERIFIED')) {
  throw new Error(`CI configuration-only proof ceiling was not preserved:\n${ciContract.stdout}${ciContract.stderr}`);
}

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-dispatcher-migration-'));
try {
  const ids = [contract.dispatcher.automation_id, ...contract.related_automations.map(item => item.automation_id)];
  for (const id of ids) {
    const targetDir = path.join(temporary, id);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(path.join(sourceRoot, id, 'automation.toml'), path.join(targetDir, 'automation.toml'));
  }
  const dispatcherPath = path.join(temporary, contract.dispatcher.automation_id, 'automation.toml');
  const unsafe = fs.readFileSync(dispatcherPath, 'utf8').replace('status = "ACTIVE"', 'status = "PAUSED"');
  fs.writeFileSync(dispatcherPath, unsafe);
  const negative = spawnSync(process.execPath, [checker, '--fixture'], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_AUTOMATIONS_ROOT: temporary }
  });
  if (negative.status === 0 || !`${negative.stdout}${negative.stderr}`.includes('expected ACTIVE')) {
    throw new Error(`paused-successor fixture was not rejected:\n${negative.stdout}${negative.stderr}`);
  }
  const unsafeOverride = spawnSync(process.execPath, [checker], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_AUTOMATIONS_ROOT: temporary }
  });
  if (unsafeOverride.status === 0 || !`${unsafeOverride.stdout}${unsafeOverride.stderr}`.includes('fixture overrides require --fixture')) {
    throw new Error(`production automation-root override was not rejected:\n${unsafeOverride.stdout}${unsafeOverride.stderr}`);
  }
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
console.log('DISPATCHER MIGRATION TEST PASS');
