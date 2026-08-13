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

const forbiddenOutput = path.join(repositoryRoot, '.release-test-output');
let result = run(process.execPath, [builder, forbiddenOutput], repositoryRoot);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /outside the source repository/);

const approvalDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-release-approval-'));
const approvalPath = path.join(approvalDirectory, 'approval.json');
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
const builderSource = fs.readFileSync(builder, 'utf8');
const protectedBuilderDependencies = [
  'scripts/lib/active-asset-admission.mjs',
  'scripts/compile-library-admission.mjs',
  'scripts/library-correction-service.mjs',
  'scripts/check-library-book-content-admission.mjs',
  'scripts/render-library-book.mjs',
  'scripts/lib/context-navigation-distribution-v1.mjs',
  'scripts/lib/public-html-transform.mjs',
  'scripts/lib/public-screening-room-admission.mjs',
  'scripts/lib/public-runtime-family-admission.mjs',
];
assert.match(builderSource, /reproducible: true/);
assert.doesNotMatch(builderSource, /generatedAt:\s*new Date\(\)\.toISOString\(\)/,
  'public artifact identity must not change with the build clock');
assert.match(workflow, /workflow_dispatch:/);
for (const dependency of protectedBuilderDependencies) {
  assert.ok(fs.existsSync(path.join(repositoryRoot, dependency)), `controller is missing builder dependency ${dependency}`);
  assert.ok(workflow.includes(dependency), `workflow does not protect builder dependency ${dependency}`);
}
assert.doesNotMatch(workflow, /^\s*push:/m);
assert.match(workflow, /PRODUCTION_APPROVER_LOGIN/);
assert.match(workflow, /PRODUCTION_CONTROLLER_SHA/);
assert.match(workflow, /environment:\n\s+name: production/);
assert.match(workflow, /PROJECT_NAME: laidies-sunnyvaile/);
assert.match(workflow, /wrangler@4\.119\.0 pages deploy/);
assert.match(workflow, /--branch "\$PRODUCTION_BRANCH"/);
assert.match(workflow, /new-id\+branch\+exact-byte-verification/);
assert.match(workflow, /conflicting provider commit metadata/);
assert.match(workflow, /for attempt in \$\(seq 1 10\)/);
assert.match(workflow, /if\(matches\.length===0\) process\.exit\(2\);/);
assert.match(workflow, /\/pages\/projects\/\$PROJECT_NAME\/deployments\?page=1&per_page=15/);
assert.doesNotMatch(workflow, /pages deployment list/);
assert.match(workflow, /CLOUDFLARE_API_TOKEN/);
assert.match(workflow, /check-newsstand-release-scope\.mjs/);
assert.match(workflow, /base_commit:/);
assert.match(workflow, /https:\/\/laidies\.ai\/\$\{artifact_path\}/);
assert.doesNotMatch(workflow, /actions\/deploy-pages@/);
assert.match(workflow, /operations\/ACTIVE-WORK\.md/);

console.log('PRODUCTION RELEASE CONTROLLER CALIBRATION: PASS · in-repository output rejected · altered approval rejected · manual Ali-bound Cloudflare workflow and NewsStand scope guard bound');
