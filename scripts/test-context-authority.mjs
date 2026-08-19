#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-context-authority.mjs');
const manifestPath = path.join(root, 'operations/context-authority.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const fixtureDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-context-authority-'));

try {
  const badManifest = structuredClone(manifest);
  badManifest.startupAuthority[3].path = badManifest.startupAuthority[0].path;
  const badPath = path.join(fixtureDirectory, 'duplicate-startup-path.json');
  fs.writeFileSync(badPath, `${JSON.stringify(badManifest, null, 2)}\n`);

  const bad = spawnSync(process.execPath, [checker, '--fixture', '--fixture-manifest', badPath], {
    cwd: root,
    encoding: 'utf8'
  });
  const badOutput = `${bad.stdout}${bad.stderr}`;
  if (bad.status === 0 || !badOutput.includes('RULE_01: startupAuthority contains a duplicate path')) {
    console.error('CONTEXT AUTHORITY CALIBRATION FAIL');
    console.error(badOutput.trim());
    process.exit(1);
  }
  console.log('CALIBRATION PASS: duplicate startup authority is rejected');

  const wrongBindingManifest = structuredClone(manifest);
  wrongBindingManifest.startupAuthority[0].path = 'operations/CODEX-WORKING-AGREEMENT.md';
  const wrongBindingPath = path.join(fixtureDirectory, 'wrong-operating-contract.json');
  fs.writeFileSync(wrongBindingPath, `${JSON.stringify(wrongBindingManifest, null, 2)}\n`);
  const wrongBinding = spawnSync(process.execPath, [checker, '--fixture', '--fixture-manifest', wrongBindingPath], {
    cwd: root,
    encoding: 'utf8'
  });
  const wrongBindingOutput = `${wrongBinding.stdout}${wrongBinding.stderr}`;
  if (wrongBinding.status === 0 || !wrongBindingOutput.includes('operating_contract must bind AGENTS.md')) {
    console.error('CONTEXT AUTHORITY BINDING CALIBRATION FAIL');
    console.error(wrongBindingOutput.trim());
    process.exit(1);
  }
  console.log('CALIBRATION PASS: operating contract cannot be rebound');

  const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
  process.stdout.write(current.stdout);
  process.stderr.write(current.stderr);
  if (current.status !== 0) process.exit(current.status ?? 1);

  console.log('CONTEXT AUTHORITY TEST PASS');
} finally {
  fs.rmSync(fixtureDirectory, { recursive: true, force: true });
}
