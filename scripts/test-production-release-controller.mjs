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

function assertWorkflowContextIsDispatchable(source) {
  if (/\$\{\{\s*runner\.temp\s*\}\}/.test(source)) {
    throw new Error('runner context is unavailable in the job-level env block');
  }
}

function assertWorkflowArtifactOutputIsOutsideSource(source) {
  const safeOutput = 'ARTIFACT_DIR: /tmp/laidies-candidate-site';
  if (source.split(safeOutput).length - 1 !== 2 ||
      source.includes('ARTIFACT_DIR: ${{ github.workspace }}/.release/site')) {
    throw new Error('candidate artifact output must stay outside the source repository in both release jobs');
  }
}

function assertWorkflowRedirectVerificationIsSafe(source) {
  const redirectFlags = "--location --proto-redir '=https' --max-redirs 3";
  const redirectFetches = source.split(redirectFlags).length - 1;
  if (redirectFetches < 2 ||
      !source.includes('validate_effective_url "$deployment_url" "$artifact_path"') ||
      !source.includes('validate_effective_url "https://laidies.ai/" "$artifact_path"') ||
      !source.includes("effective.protocol !== 'https:'") ||
      !source.includes('effective.host !== base.host') ||
      !source.includes('[originalPath, canonicalPath].includes(effective.pathname)')) {
    throw new Error('release verification must follow only bounded same-origin HTTPS canonical redirects');
  }
}

function assertWorkflowScopeTransferIsComplete(source) {
  if (!source.includes('cp "$RELEASE_SCOPE_PATH" "$RECEIPT_DIR/release-scope.json"') ||
      !source.includes('RELEASE_SCOPE_PATH: ${{ github.workspace }}/.release/receipt/release-scope.json') ||
      !source.includes("jq -r '.removedPaths[]' \"$RELEASE_SCOPE_PATH\"")) {
    throw new Error('deploy job must consume the exact scope transferred in the release receipt');
  }
}

function assertWorkflowApiVerificationIsComplete(source) {
  if (!source.includes('verify_api_origin "$deployment_url" immutable') ||
      !source.includes('verify_api_origin "https://laidies.ai/" custom-domain') ||
      !source.includes('"${base_url}api/miss-jeeves?release=${SOURCE_COMMIT}"') ||
      !source.includes('method_not_allowed') ||
      !source.includes('book-concepts-101') ||
      !source.includes('book-section-ai-dictionary-term-token') ||
      !source.includes('.parentId == "ai-dictionary"') ||
      !source.includes('.wholeUrl == "/library.html#ai-dictionary"')) {
    throw new Error('release verification must prove the exact public API handler, Dictionary term route and rejected-book denial');
  }
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
assert.doesNotThrow(() => assertWorkflowContextIsDispatchable(workflow));
assert.throws(
  () => assertWorkflowContextIsDispatchable(`${workflow}\n  BASE_SOURCE_DIR: \${{ runner.temp }}/bad-source\n`),
  /runner context is unavailable/,
  'known invalid GitHub workflow context must fail calibration',
);
assert.doesNotThrow(() => assertWorkflowArtifactOutputIsOutsideSource(workflow));
assert.throws(
  () => assertWorkflowArtifactOutputIsOutsideSource(workflow.replace(
    'ARTIFACT_DIR: /tmp/laidies-candidate-site',
    'ARTIFACT_DIR: ${{ github.workspace }}/.release/site',
  )),
  /outside the source repository/,
  'known in-repository candidate output must fail calibration',
);
assert.doesNotThrow(() => assertWorkflowApiVerificationIsComplete(workflow));
assert.throws(
  () => assertWorkflowApiVerificationIsComplete(workflow.replace('verify_api_origin "$deployment_url" immutable', ':')),
  /public API handler, Dictionary term route and rejected-book denial/,
  'missing immutable API verification must fail calibration',
);
assert.doesNotThrow(() => assertWorkflowRedirectVerificationIsSafe(workflow));
assert.throws(
  () => assertWorkflowRedirectVerificationIsSafe(workflow.replaceAll("--location --proto-redir '=https' --max-redirs 3", '')),
  /bounded same-origin HTTPS canonical redirects/,
  'known redirect-following omission must fail calibration',
);
assert.doesNotThrow(() => assertWorkflowScopeTransferIsComplete(workflow));
assert.throws(
  () => assertWorkflowScopeTransferIsComplete(workflow.replace('cp "$RELEASE_SCOPE_PATH" "$RECEIPT_DIR/release-scope.json"', ':')),
  /scope transferred in the release receipt/,
  'missing deploy-scope transfer must fail calibration',
);
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
assert.match(workflow, /--retry 20 --retry-delay 5 --retry-max-time 120 --retry-all-errors/);
assert.match(workflow, /if\(matches\.length===0\) process\.exit\(2\);/);
assert.match(workflow, /\/pages\/projects\/\$PROJECT_NAME\/deployments\?page=1&per_page=15/);
assert.doesNotMatch(workflow, /pages deployment list/);
assert.match(workflow, /CLOUDFLARE_API_TOKEN/);
assert.match(workflow, /check-newsstand-release-scope\.mjs/);
assert.match(workflow, /base_commit:/);
assert.match(workflow, /https:\/\/laidies\.ai\/\$\{artifact_path\}/);
assert.doesNotMatch(workflow, /actions\/deploy-pages@/);
assert.match(workflow, /operations\/ACTIVE-WORK\.md/);

console.log('PRODUCTION RELEASE CONTROLLER CALIBRATION: PASS · invalid job-level runner context rejected · in-repository workflow output rejected · unsafe redirect verification rejected · missing deploy-scope transfer rejected · missing API verification rejected · in-repository builder output rejected · altered approval rejected · manual Ali-bound Cloudflare workflow, new-identity provider verification and exact four-book scope guard bound');
