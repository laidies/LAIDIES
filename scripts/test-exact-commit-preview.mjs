#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { validateExactCommitPreview } from './check-exact-commit-preview.mjs';

function validateWorkflowText(text) {
  const errors = [];
  const lines = text.split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)run:\s*\|\s*$/);
    if (!match) continue;
    const indentation = match[1].length;
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const currentIndentation = lines[cursor].match(/^\s*/)[0].length;
      if (lines[cursor].trim() && currentIndentation <= indentation) break;
      if (lines[cursor].includes('${{ inputs.')) errors.push('workflow input is interpolated directly into shell');
    }
  }
  const deployJob = text.split(/\n  deploy-preview:\n/)[1] || '';
  if (deployJob.includes('actions/checkout')) errors.push('credentialed deploy job checks out candidate code');
  if (!text.includes('CONTROLLER_SHA: ${{ vars.PREVIEW_CONTROLLER_SHA }}') || !text.includes('git diff --quiet "$CONTROLLER_SHA" "$INPUT_COMMIT_SHA"')) {
    errors.push('candidate gate code is not pinned to the trusted controller');
  }
  if (!deployJob.includes('deployments-before.json') || !deployJob.includes('deployments-after.json')) errors.push('deployment is not isolated from prior deployments');
  if (!deployJob.includes('curl --fail') || !deployJob.includes('deployed_library_sha')) errors.push('deployed Library bytes are not verified');
  if (!text.includes('playwright-core@1.62.1') || !text.includes('CHROME_PATH=') || !text.includes('PLAYWRIGHT_CORE_PATH=')) errors.push('Library browser runtime is not pinned and provisioned');
  if (!text.includes('run: npm run ci:build') || text.includes('run: npm run ci\n')) errors.push('preview build is coupled to unrelated portfolio operational status');
  if (text.includes('test-library-modular-reading-system.mjs')) errors.push('production preview invokes a quarantined design-exploration test');
  if (!deployJob.includes('PROJECT_NAME: laidies-sunnyvaile-preview') || deployJob.includes('PROJECT_NAME: laidies-sunnyvaile\n')) errors.push('preview is not isolated from the production Pages project');
  if (!deployJob.includes('/access/apps') || !deployJob.includes('CF-Access-Client-Id') || !deployJob.includes('unauthenticated_status')) errors.push('preview Access protection is not verified');
  if (!text.includes('environment: production')) errors.push('existing protected Cloudflare credential environment is missing');
  if (!text.includes('CLOUDFLARE_ACCESS_API_TOKEN: ${{ secrets.CLOUDFLARE_ACCESS_API_TOKEN }}')) errors.push('separately scoped Access API secret is missing');
  if ((deployJob.match(/CLOUDFLARE_ACCESS_API_TOKEN: \$\{\{ secrets\.CLOUDFLARE_ACCESS_API_TOKEN \}\}/g) || []).length !== 3) errors.push('Access validation, creation and revocation must each receive the scoped token');
  if ((deployJob.match(/CLOUDFLARE_API_TOKEN: \$\{\{ secrets\.CLOUDFLARE_API_TOKEN \}\}/g) || []).length !== 1) errors.push('only the Pages deploy step may receive the Pages token');
  if (deployJob.includes('CLOUDFLARE_ACCESS_READ_TOKEN') || deployJob.includes('secrets.CF_ACCESS_CLIENT_ID') || deployJob.includes('secrets.CF_ACCESS_CLIENT_SECRET')) errors.push('preview depends on missing permanent Access secrets');
  if (deployJob.includes('Authorization: Bearer $CLOUDFLARE_API_TOKEN')) errors.push('Pages deploy token is reused for Access APIs');
  if (!deployJob.includes('/access/service_tokens') || !deployJob.includes('any_valid_service_token')) errors.push('temporary Access token and existing policy are not verified');
  if (!deployJob.includes('.result.id // empty')) errors.push('temporary token ID is not captured before response validation');
  if ((deployJob.match(/::add-mask::/g) || []).length < 2) errors.push('both temporary credential values must be masked');
  if ((deployJob.match(/--request DELETE/g) || []).length < 2 || !deployJob.includes('if: ${{ always() }}')) errors.push('temporary Access token is not revoked on every path');
  if (deployJob.indexOf('Revoke temporary Access verification credential') < 0 || deployJob.indexOf('Revoke temporary Access verification credential') > deployJob.indexOf('Upload deployed preview receipt')) errors.push('temporary Access token is not revoked before receipt upload');
  if (deployJob.includes('node scripts/')) errors.push('credentialed deploy job executes candidate scripts');
  return errors;
}

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const librarySha = sha256('library candidate');
const records = [
  { path: 'index.html', bytes: 5, sha256: sha256('index') },
  { path: 'library.html', bytes: 17, sha256: librarySha },
];
const identitySha = sha256(records.map((record) => `${record.sha256}  ${record.path}\n`).join(''));
const manifest = {
  schema: 'laidies-release-artifact-manifest/v1',
  identitySha256: identitySha,
  files: records,
};
const receipt = {
  schema: 'laidies.exact-commit-preview.v1',
  status: 'PREPARED_NO_DEPLOY',
  source_commit: 'a'.repeat(40),
  project: 'laidies-sunnyvaile-preview',
  candidate: { path: 'library.html', source_sha256: sha256('library source'), artifact_sha256: librarySha },
  artifact_manifest: { path: 'artifact-manifest.json', identity_sha256: identitySha },
  deployment_id: null,
  preview_url: null,
  access_credential: null,
  checks: [
    { id: 'minimum-integrity-ci', result: 'PASS' },
    { id: 'library-product-browser', result: 'PASS' },
    { id: 'library-inline-handler-calibration', result: 'PASS' },
    { id: 'design-review-admission', result: 'PASS' },
    { id: 'curated-public-build', result: 'PASS' },
  ],
};

assert.deepEqual(validateExactCommitPreview(receipt, manifest), []);
const deployed = {
  ...receipt,
  status: 'DEPLOYED_PREVIEW',
  deployment_id: '9f161385-7486-4207-9afe-8512ea453973',
  preview_url: 'https://9f161385.laidies-sunnyvaile-preview.pages.dev/',
  review_branch: 'review-aaaaaaaaaaaa-123456789',
  access_credential: { type: 'TEMPORARY_SERVICE_TOKEN', service_token_id: 'f174e90a-fafe-4643-bbbc-4a0ed4fc8415', duration: '30m', policy_selector: 'any_valid_service_token', revoked: true },
  public_verification: { route: '/library.html', http_status: 200, unauthenticated_status: 302, access_protected: true, sha256: librarySha, result: 'PASS' },
};
assert.deepEqual(validateExactCommitPreview(deployed, manifest), []);

const rejects = [
  [{ ...receipt, source_commit: 'main' }, manifest, 'exact commit'],
  [{ ...receipt, candidate: { ...receipt.candidate, artifact_sha256: 'b'.repeat(64) } }, manifest, 'candidate mismatch'],
  [{ ...receipt, access_credential: { type: 'TEMPORARY_SERVICE_TOKEN' } }, manifest, 'prepared credential claim'],
  [{ ...receipt, checks: receipt.checks.filter((check) => check.id !== 'design-review-admission') }, manifest, 'missing gate'],
  [{ ...deployed, preview_url: 'https://example.com/' }, manifest, 'foreign preview'],
  [{ ...deployed, public_verification: { ...deployed.public_verification, sha256: 'd'.repeat(64) } }, manifest, 'live byte mismatch'],
  [{ ...deployed, review_branch: 'review-bbbbbbbbbbbb-123456789' }, manifest, 'branch not bound to commit'],
  [{ ...deployed, access_credential: { ...deployed.access_credential, revoked: false } }, manifest, 'unrevoked temporary credential'],
  [{ ...deployed, public_verification: { ...deployed.public_verification, access_protected: false } }, manifest, 'unprotected preview'],
  [receipt, { ...manifest, identitySha256: 'c'.repeat(64) }, 'tampered manifest'],
];
for (const [candidate, candidateManifest, label] of rejects) {
  assert(validateExactCommitPreview(candidate, candidateManifest).length > 0, `${label} must fail`);
}

const workflowPath = path.resolve(import.meta.dirname, '..', '.github', 'workflows', 'exact-library-preview.yml');
const workflow = fs.readFileSync(workflowPath, 'utf8');
assert.deepEqual(validateWorkflowText(workflow), []);
const packageJson = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '..', 'package.json'), 'utf8'));
assert.equal(
  packageJson.scripts?.['preview:library'],
  'node operations/tools/preview-server.js . 8765',
  'Library review must use the canonical HTTP preview server, never a raw file:// route'
);
const workflowRejects = [
  workflow.replace('[[ "$INPUT_COMMIT_SHA"', '[[ "${{ inputs.commit_sha }}"'),
  workflow.replace('  deploy-preview:\n', '  deploy-preview:\n    # actions/checkout\n'),
  workflow.replaceAll('curl --fail', 'curl'),
  workflow.replaceAll('PROJECT_NAME: laidies-sunnyvaile-preview', 'PROJECT_NAME: laidies-sunnyvaile'),
  workflow.replace('CF-Access-Client-Id', 'X-Removed-Access-Client-Id'),
  workflow.replace('environment: production', 'environment: preview'),
  workflow.replace('if: ${{ always() }}', 'if: ${{ success() }}'),
  workflow.replaceAll('--request DELETE', '--request GET'),
  workflow.replaceAll('any_valid_service_token', 'removed_service_token_policy'),
  workflow.replace('.result.id // empty', '.result.missing_id // empty'),
  workflow.replace('::add-mask::', '::notice::'),
  workflow.replace('playwright-core@1.62.1', 'playwright-core@latest'),
  workflow.replace('run: npm run ci:build', 'run: npm run ci'),
  workflow.replace('run: node scripts/test-library-product.cjs', 'run: node scripts/test-library-product.cjs && node scripts/test-library-modular-reading-system.mjs'),
  workflow.replaceAll('CLOUDFLARE_ACCESS_API_TOKEN', 'CLOUDFLARE_API_TOKEN'),
];
for (const [index, candidate] of workflowRejects.entries()) assert(validateWorkflowText(candidate).length > 0, `unsafe workflow mutation ${index + 1} must fail`);

console.log('EXACT COMMIT PREVIEW CONTRACT TEST PASS');
console.log(`calibrated_rejections=${rejects.length + workflowRejects.length}`);
