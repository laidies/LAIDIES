#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const builder = path.join(repositoryRoot, 'scripts/build-public-site.mjs');
const approvalChecker = path.join(repositoryRoot, 'scripts/check-production-release-approval.mjs');
const workflowPath = path.join(repositoryRoot, '.github/workflows/production-release.yml');

function run(command, args, cwd) {
  return spawnSync(command, args, { cwd, encoding: 'utf8' });
}

function fixture(reference) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-release-fixture-'));
  fs.mkdirSync(path.join(root, 'operations/release-control'), { recursive: true });
  fs.mkdirSync(path.join(root, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(root, 'index.html'), `<link rel="stylesheet" href="${reference}"><h1>LAiDIES</h1>`);
  fs.writeFileSync(path.join(root, 'assets/site.css'), 'body{color:#10183b}');
  fs.writeFileSync(path.join(root, 'operations/secret.txt'), 'private');
  fs.writeFileSync(path.join(root, 'operations/release-control/public-entrypoints.json'), JSON.stringify({ schema: 'laidies.public-entrypoints.v1', entrypoints: ['index.html'], publicRootFiles: [] }));
  run('git', ['init', '-q'], root);
  run('git', ['add', '.'], root);
  return root;
}

const goodRoot = fixture('assets/site.css');
const goodOutput = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-release-output-'));
let result = run(process.execPath, [builder, '--root', goodRoot, '--output', goodOutput], repositoryRoot);
assert.equal(result.status, 0, result.stderr);
assert.equal(fs.existsSync(path.join(goodOutput, 'index.html')), true);
assert.equal(fs.existsSync(path.join(goodOutput, 'assets/site.css')), true);
assert.equal(fs.existsSync(path.join(goodOutput, 'operations/secret.txt')), false);

const badRoot = fixture('operations/secret.txt');
const badOutput = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-release-output-'));
result = run(process.execPath, [builder, '--root', badRoot, '--output', badOutput], repositoryRoot);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /prohibited references/);

const approvalPath = path.join(goodRoot, 'approval.json');
const identity = 'b'.repeat(64);
fs.writeFileSync(approvalPath, JSON.stringify({
  schema: 'laidies.production-release-approval.v1', sourceCommit: 'a'.repeat(40), artifactIdentitySha256: identity,
  approvedBy: 'Ali', decision: 'APPROVE_PRODUCTION_RELEASE', publicUrl: 'https://laidies.ai/',
  approvedAt: '2026-08-08T20:00:00Z', confirmation: `APPROVE ${identity} FOR PRODUCTION`,
}));
result = run(process.execPath, [approvalChecker, approvalPath], repositoryRoot);
assert.equal(result.status, 0, result.stderr);
const altered = JSON.parse(fs.readFileSync(approvalPath, 'utf8'));
altered.confirmation = 'APPROVE SOMETHING ELSE';
fs.writeFileSync(approvalPath, JSON.stringify(altered));
result = run(process.execPath, [approvalChecker, approvalPath], repositoryRoot);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /confirmation/);

const workflow = fs.readFileSync(workflowPath, 'utf8');
assert.match(workflow, /workflow_dispatch:/);
assert.doesNotMatch(workflow, /^\s*push:/m);
assert.match(workflow, /PRODUCTION_APPROVER_LOGIN/);
assert.match(workflow, /PRODUCTION_CONTROLLER_SHA/);
assert.match(workflow, /environment:\n\s+name: production/);
assert.match(workflow, /actions\/upload-pages-artifact@v3/);
assert.match(workflow, /actions\/deploy-pages@v4/);
assert.match(workflow, /operations\/ACTIVE-WORK\.md/);

console.log('PRODUCTION RELEASE CONTROLLER CALIBRATION: PASS · safe artifact accepted · internal reference rejected · altered approval rejected · manual protected workflow bound');
