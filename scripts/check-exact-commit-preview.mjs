#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const SHA40 = /^[a-f0-9]{40}$/;
const SHA64 = /^[a-f0-9]{64}$/;
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const REQUIRED_CHECKS = new Set([
  'minimum-integrity-ci',
  'library-product-browser',
  'library-inline-handler-calibration',
  'design-review-admission',
  'curated-public-build',
]);

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

export function validateExactCommitPreview(receipt, manifest) {
  const errors = [];
  if (receipt?.schema !== 'laidies.exact-commit-preview.v1') errors.push('unsupported receipt schema');
  if (!SHA40.test(receipt?.source_commit || '')) errors.push('source_commit must be an exact lowercase 40-character Git SHA');
  if (receipt?.project !== 'laidies-sunnyvaile-preview') errors.push('unexpected Cloudflare Pages project');
  if (receipt?.candidate?.path !== 'library.html') errors.push('candidate path must be library.html');
  if (!SHA64.test(receipt?.candidate?.source_sha256 || '')) errors.push('candidate source sha256 is invalid');
  if (!SHA64.test(receipt?.candidate?.artifact_sha256 || '')) errors.push('candidate artifact sha256 is invalid');
  if (receipt?.artifact_manifest?.path !== 'artifact-manifest.json') errors.push('artifact manifest path must be artifact-manifest.json');
  if (!SHA64.test(receipt?.artifact_manifest?.identity_sha256 || '')) errors.push('artifact identity is invalid');

  if (manifest?.schema !== 'laidies-release-artifact-manifest/v1') errors.push('unsupported artifact manifest schema');
  const records = Array.isArray(manifest?.files) ? manifest.files : [];
  const identityInput = records.map((record) => `${record.sha256}  ${record.path}\n`).join('');
  const computedIdentity = sha256(Buffer.from(identityInput, 'utf8'));
  if (manifest?.identitySha256 !== computedIdentity) errors.push('artifact manifest identity does not match its file records');
  if (receipt?.artifact_manifest?.identity_sha256 !== manifest?.identitySha256) errors.push('receipt artifact identity does not match manifest');
  const libraryRecord = records.find((record) => record.path === 'library.html');
  if (!libraryRecord) errors.push('artifact manifest does not contain library.html');
  else if (libraryRecord.sha256 !== receipt?.candidate?.artifact_sha256) errors.push('candidate artifact hash does not match artifact library.html');

  const checks = new Map((Array.isArray(receipt?.checks) ? receipt.checks : []).map((entry) => [entry?.id, entry?.result]));
  for (const required of REQUIRED_CHECKS) {
    if (checks.get(required) !== 'PASS') errors.push(`required check is not PASS: ${required}`);
  }

  if (receipt?.status === 'PREPARED_NO_DEPLOY') {
    if (receipt.deployment_id !== null || receipt.preview_url !== null || receipt.access_credential !== null) errors.push('prepared receipt cannot claim a deployment, preview URL or credential');
  } else if (receipt?.status === 'DEPLOYED_PREVIEW') {
    if (!UUID.test(receipt?.deployment_id || '')) errors.push('deployed preview requires a deployment UUID');
    if (!/^review-[a-f0-9]{12}-[0-9]+$/.test(receipt?.review_branch || '')) errors.push('deployed preview requires its unique review branch');
    if (SHA40.test(receipt?.source_commit || '') && !receipt.review_branch?.startsWith(`review-${receipt.source_commit.slice(0, 12)}-`)) {
      errors.push('review branch is not bound to the source commit');
    }
    let preview;
    try { preview = new URL(receipt.preview_url); } catch { errors.push('deployed preview requires a valid URL'); }
    if (preview && (preview.protocol !== 'https:' || !preview.hostname.endsWith('.laidies-sunnyvaile-preview.pages.dev') || preview.pathname !== '/')) {
      errors.push('preview URL must be an immutable HTTPS laidies-sunnyvaile-preview.pages.dev root');
    }
    if (preview && receipt?.deployment_id && preview.hostname !== `${receipt.deployment_id.slice(0, 8)}.laidies-sunnyvaile-preview.pages.dev`) {
      errors.push('preview URL is not bound to the deployment ID');
    }
    const credential = receipt?.access_credential;
    if (credential?.type !== 'TEMPORARY_SERVICE_TOKEN' || !UUID.test(credential?.service_token_id || '') || credential?.duration !== '30m' || credential?.policy_selector !== 'any_valid_service_token' || credential?.revoked !== true) {
      errors.push('deployed preview requires a revoked temporary Access verification credential');
    }
    if (receipt?.public_verification?.route !== '/library.html' || receipt?.public_verification?.http_status !== 200 || receipt?.public_verification?.access_protected !== true || ![302, 401, 403].includes(receipt?.public_verification?.unauthenticated_status) || receipt?.public_verification?.result !== 'PASS') {
      errors.push('deployed preview requires successful Library route verification');
    }
    if (receipt?.public_verification?.sha256 !== receipt?.candidate?.artifact_sha256) errors.push('deployed Library bytes do not match the admitted artifact');
  } else {
    errors.push('status must be PREPARED_NO_DEPLOY or DEPLOYED_PREVIEW');
  }
  return errors;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const receiptPath = process.argv[2];
  if (!receiptPath) {
    console.error('Usage: node scripts/check-exact-commit-preview.mjs <preview-receipt.json>');
    process.exit(2);
  }
  const absoluteReceipt = path.resolve(receiptPath);
  const receipt = JSON.parse(fs.readFileSync(absoluteReceipt, 'utf8'));
  const manifestPath = path.join(path.dirname(absoluteReceipt), receipt?.artifact_manifest?.path || '');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const errors = validateExactCommitPreview(receipt, manifest);
  if (errors.length) {
    console.error('EXACT COMMIT PREVIEW FAIL');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`EXACT COMMIT PREVIEW PASS status=${receipt.status} commit=${receipt.source_commit} candidate_source=${receipt.candidate.source_sha256} candidate_artifact=${receipt.candidate.artifact_sha256} artifact=${receipt.artifact_manifest.identity_sha256}`);
}
