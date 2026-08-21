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

  const scopedRoot = path.join(fixtureDirectory, 'scoped-root');
  const write = (relative, text) => {
    const filename = path.join(scopedRoot, relative);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, text);
  };
  const scopedManifest = structuredClone(manifest);
  scopedManifest.historyOnly = [];
  scopedManifest.scopedInstructions = [{
    path: 'operations/prototypes/example/AGENTS.md',
    scopeRoot: 'operations/prototypes/example',
    classification: 'prototype_only'
  }];
  write('operations/context-authority.json', `${JSON.stringify(scopedManifest, null, 2)}\n`);
  write('AGENTS.md', '# Root contract\n');
  write('operations/DECISIONS.md', '<!-- context-authority: operations/context-authority.json -->\nAn archived register is not current authority.\n');
  write('operations/voice/laidies-canon-index.md', '<!-- context-authority: operations/context-authority.json -->\n# Canon\n');
  write('operations/ACTIVE-WORK.md', '<!-- context-authority: operations/context-authority.json -->\n## Current task\n\n- **Task ID:** TEST\n- **Status:** HOLD\n- **Owner:** test\n- **Updated:** test\n- **Goal:** test\n- **Acceptance:** test\n- **Current step:** test\n- **Next action:** test\n');
  write('operations/prototypes/example/AGENTS.md', '# Old prototype directions with no boundary\n');
  const configLines = Object.entries(scopedManifest.codexDefaults).map(([key, value]) => `${key} = ${typeof value === 'string' ? `"${value}"` : value}`).join('\n');
  write('.codex/config.toml', `${configLines}\n`);
  const badScope = spawnSync(process.execPath, [checker, '--fixture', '--root', scopedRoot], { cwd: root, encoding: 'utf8' });
  const badScopeOutput = `${badScope.stdout}${badScope.stderr}`;
  if (badScope.status === 0 || !badScopeOutput.includes('nested instruction lacks the required non-authority header')) {
    console.error('CONTEXT AUTHORITY SCOPED-INSTRUCTION CALIBRATION FAIL');
    console.error(badScopeOutput.trim());
    process.exit(1);
  }
  console.log('CALIBRATION PASS: inherited prototype instructions require a non-authority header');

  write('operations/prototypes/example/AGENTS.md', '<!-- laidies-scope: prototype_only; authority: local_reproduction_only; overrides_sitewide: false -->\n> Prototype-only instructions. Root `AGENTS.md` and routed current sources win.\n');
  write('operations/DECISIONS.md', '<!-- context-authority: operations/context-authority.json -->\nAn archived register is not current authority.\nCurrent source: `operations/archive/`\n');
  const broadRoute = spawnSync(process.execPath, [checker, '--fixture', '--root', scopedRoot], { cwd: root, encoding: 'utf8' });
  const broadRouteOutput = `${broadRoute.stdout}${broadRoute.stderr}`;
  if (broadRoute.status === 0 || !broadRouteOutput.includes('decision router contains a non-exact route')) {
    console.error('CONTEXT AUTHORITY ROUTER CALIBRATION FAIL');
    console.error(broadRouteOutput.trim());
    process.exit(1);
  }
  console.log('CALIBRATION PASS: broad directory routes are rejected');

  const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
  process.stdout.write(current.stdout);
  process.stderr.write(current.stderr);
  if (current.status !== 0) process.exit(current.status ?? 1);

  console.log('CONTEXT AUTHORITY TEST PASS');
} finally {
  fs.rmSync(fixtureDirectory, { recursive: true, force: true });
}
