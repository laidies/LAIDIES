#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultManifestPath = path.join(
  root,
  'operations/video-qa/town-entry-transformation-cue-v1/episode-transformation-bindings.json'
);

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function verifyAsset(asset, rootDirectory, errors, label) {
  if (!asset?.path || !/^[a-f0-9]{64}$/.test(asset.sha256 || '')) {
    errors.push({ code: 'UNBOUND_ASSET', message: `${label} lacks an exact path or SHA-256.` });
    return;
  }
  const file = path.join(rootDirectory, asset.path);
  if (!fs.existsSync(file)) {
    errors.push({ code: 'MISSING_ASSET', message: `${label} is missing at ${asset.path}.` });
    return;
  }
  const actual = sha256(file);
  if (actual !== asset.sha256) {
    errors.push({ code: 'CHECKSUM_MISMATCH', message: `${label} checksum is ${actual}, expected ${asset.sha256}.` });
  }
}

export function validateTownEntryManifest(manifest, rootDirectory = root) {
  const errors = [];
  const expectedStatuses = new Set(['RECOVERED_SOURCE_HOLD', 'REVIEW_READY', 'REPLACEMENT_REQUIRED']);
  const reviewStatuses = new Set(['PASS', 'HOLD', 'FAIL']);

  if (manifest?.schema_version !== 1) {
    errors.push({ code: 'SCHEMA_VERSION', message: 'schema_version must be 1.' });
  }
  if (manifest?.required_copy?.line_1 !== 'NOW ENTERING SUNNYVAiLE') {
    errors.push({ code: 'COPY_DRIFT', message: 'The primary town-entry copy changed.' });
  }
  if (manifest?.required_copy?.line_2 !== 'REWIND ERA GLOW-UP: DIALING UP...') {
    errors.push({ code: 'COPY_DRIFT', message: 'The dial-up explanation copy changed.' });
  }

  const cue = manifest?.cue_master ?? {};
  verifyAsset({ path: cue.path, sha256: cue.sha256 }, rootDirectory, errors, 'cue master');
  verifyAsset({ path: cue.builder_path, sha256: cue.builder_sha256 }, rootDirectory, errors, 'cue builder');
  verifyAsset(
    { path: cue.style_reference_path, sha256: cue.style_reference_sha256 },
    rootDirectory,
    errors,
    'cue style reference'
  );
  if (!cue.silent || cue.width !== 1920 || cue.height !== 1080 || cue.fps !== 30) {
    errors.push({ code: 'CUE_FORMAT', message: 'Cue must remain silent 1920x1080 at 30 fps.' });
  }
  if (!cue.clears_before_final_reveal || !(cue.cue_end_seconds > 0 && cue.cue_end_seconds < 3.5)) {
    errors.push({ code: 'CUE_TIMING', message: 'Cue must clear before the final reveal and before 3.5 seconds.' });
  }

  const ids = new Set();
  for (const binding of manifest?.bindings ?? []) {
    if (!binding?.id || ids.has(binding.id)) {
      errors.push({ code: 'BINDING_ID', message: 'Every binding needs a unique id.' });
      continue;
    }
    ids.add(binding.id);
    if (!expectedStatuses.has(binding.status)) {
      errors.push({ code: 'BINDING_STATUS', message: `${binding.id} has invalid status ${binding.status}.` });
    }
    if (binding.occurrence_kind !== 'SUNNYVAILE_ENTRY' || binding.cue_required !== true) {
      errors.push({ code: 'BINDING_SCOPE', message: `${binding.id} is not explicitly scoped as a required SUNNYVAiLE entry.` });
    }
    if (!reviewStatuses.has(binding.independent_review_status) || binding.admission_status !== 'HOLD') {
      errors.push({ code: 'FAIL_CLOSED', message: `${binding.id} must remain HOLD until a separately admitted successor exists.` });
    }
    if (!binding.exact_next_action) {
      errors.push({ code: 'MISSING_NEXT_ACTION', message: `${binding.id} has no exact next action.` });
    }
    for (const [index, asset] of (binding.source_assets ?? []).entries()) {
      verifyAsset(asset, rootDirectory, errors, `${binding.id} source ${index + 1}`);
    }
    if (!(binding.source_assets ?? []).length) {
      errors.push({ code: 'MISSING_SOURCE', message: `${binding.id} has no checksum-bound source.` });
    }

    if (binding.source_semantic_status === 'REJECTED' && binding.cue_attached) {
      errors.push({
        code: 'MISLEADING_SOURCE',
        message: `${binding.id} attaches the town-entry cue to a rejected or misleading transformation.`
      });
    }
    if (binding.status === 'REVIEW_READY') {
      if (!binding.cue_attached || binding.cue_master_path !== cue.path) {
        errors.push({ code: 'CUE_NOT_BOUND', message: `${binding.id} is review-ready without the exact shared cue.` });
      }
      if (!binding.clears_before_final_reveal || binding.cue_end_seconds !== cue.cue_end_seconds) {
        errors.push({ code: 'CUE_TIMING', message: `${binding.id} does not preserve the exact cue-clear timing.` });
      }
      verifyAsset(binding.review_candidate, rootDirectory, errors, `${binding.id} review candidate`);
      verifyAsset(binding.contact_sheet, rootDirectory, errors, `${binding.id} contact sheet`);
    }
    if (binding.status === 'REPLACEMENT_REQUIRED' && binding.source_semantic_status !== 'REJECTED') {
      errors.push({ code: 'REPLACEMENT_REASON', message: `${binding.id} needs an explicit rejected source status.` });
    }
  }

  if ((manifest?.bindings ?? []).length !== 4) {
    errors.push({ code: 'EPISODE_COVERAGE', message: 'Opening-day Episodes 01-04 must all have explicit bindings.' });
  }
  for (const exclusion of manifest?.explicit_exclusions ?? []) {
    verifyAsset(
      { path: exclusion.source_master_path, sha256: exclusion.source_master_sha256 },
      rootDirectory,
      errors,
      `${exclusion.id} exclusion source`
    );
    if (exclusion.status !== 'EXCLUDED' || !exclusion.reason) {
      errors.push({ code: 'EXCLUSION_REASON', message: `${exclusion.id} is not a reasoned explicit exclusion.` });
    }
  }

  return { valid: errors.length === 0, errors, status: manifest?.status ?? 'UNKNOWN' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifestPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultManifestPath;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const result = validateTownEntryManifest(manifest, root);
  if (!result.valid) {
    console.error('SUNNYVAiLE TOWN-ENTRY CUE: INVALID');
    for (const error of result.errors) console.error(`- ${error.code}: ${error.message}`);
    process.exit(1);
  }
  console.log('SUNNYVAiLE TOWN-ENTRY CUE: VALID');
  console.log(`- bindings: ${manifest.bindings.length}`);
  console.log(`- review-ready: ${manifest.bindings.filter((item) => item.status === 'REVIEW_READY').length}`);
  console.log(`- replacement-required: ${manifest.bindings.filter((item) => item.status === 'REPLACEMENT_REQUIRED').length}`);
  console.log(`- admission: ${result.status}`);
}
