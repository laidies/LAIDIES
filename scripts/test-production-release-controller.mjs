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
const protectedReleaseChecks = [
  'package.json',
  'package-lock.json',
  'scripts/validate-blend-snap-packs.mjs',
  'scripts/test-validate-blend-snap-packs.mjs',
  'scripts/test-blend-snap-browser.mjs',
  'scripts/test-library-product.cjs',
  'scripts/test-miss-jeeves-worker.mjs',
  'scripts/test-compose-daily-edition.mjs',
  'scripts/test-promote-daily-edition.mjs',
  'scripts/test-daily-private-workflow.mjs',
  'scripts/test-newsstand-canonical-migration.mjs',
  'scripts/test-compile-newsstand-daily-longform.mjs',
  'scripts/test-promote-newsstand-story.mjs',
  'scripts/validate-newsstand-stories.mjs',
  'scripts/test-newsstand-reader-contract.mjs',
  'scripts/test-newsstand-reader-browser.mjs',
  'scripts/test-newsstand-release-pipeline-v1.mjs',
];
assert.match(builderSource, /reproducible: true/);
assert.doesNotMatch(builderSource, /generatedAt:\s*new Date\(\)\.toISOString\(\)/,
  'public artifact identity must not change with the build clock');
assert.match(workflow, /workflow_dispatch:/);
for (const dependency of protectedBuilderDependencies) {
  assert.ok(fs.existsSync(path.join(repositoryRoot, dependency)), `controller is missing builder dependency ${dependency}`);
  assert.ok(workflow.includes(dependency), `workflow does not protect builder dependency ${dependency}`);
}
for (const checkPath of protectedReleaseChecks) {
  assert.ok(fs.existsSync(path.join(repositoryRoot, checkPath)), `controller is missing release check ${checkPath}`);
  assert.ok(workflow.includes(checkPath), `workflow does not protect release check ${checkPath}`);
}
assert.doesNotMatch(workflow, /^\s*push:/m);
assert.match(workflow, /PRODUCTION_APPROVER_LOGIN/);
assert.match(workflow, /PRODUCTION_CONTROLLER_SHA/);
assert.match(workflow, /environment:\n\s+name: production/);
assert.match(workflow, /PROJECT_NAME: laidies-sunnyvaile/);
assert.match(workflow, /wrangler@4\.119\.0 pages deploy/);
assert.match(workflow, /--branch "\$PRODUCTION_BRANCH"/);
assert.match(workflow, /CLOUDFLARE_API_TOKEN/);
assert.match(workflow, /check-newsstand-release-scope\.mjs/);
assert.match(workflow, /NEWSSTAND_REQUIRE_BROWSER=1 node scripts\/test-newsstand-reader-browser\.mjs/);
assert.match(workflow, /base_commit:/);
assert.match(workflow, /BASE_SOURCE_DIR="\$RUNNER_TEMP\/laidies-base-source"/);
assert.match(workflow, /BASE_ARTIFACT_DIR="\$RUNNER_TEMP\/laidies-base-site"/);
assert.match(workflow, /https:\/\/laidies\.ai\/\$\{artifact_path\}/);
assert.doesNotMatch(workflow, /actions\/deploy-pages@/);
assert.match(workflow, /operations\/ACTIVE-WORK\.md/);

console.log('PRODUCTION RELEASE CONTROLLER CALIBRATION: PASS · invalid job-level runner context rejected · unsafe redirect verification rejected · missing deploy-scope transfer rejected · in-repository output rejected · altered approval rejected · manual Ali-bound Cloudflare workflow and exact Sunday scope guard bound');
