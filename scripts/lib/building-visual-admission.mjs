import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SHA256 = /^[a-f0-9]{64}$/;
const REQUIRED_VIEWPORTS = { desktop_1440: 1440, mobile_390: 390, mobile_320: 320 };
const REQUIRED_JUDGES = ['information_architecture_judge', 'product_ux_judge', 'brand_visual_judge'];

function digest(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function pngWidth(file) {
  const bytes = fs.readFileSync(file);
  if (bytes.length < 24 || bytes.subarray(1, 4).toString('ascii') !== 'PNG') return null;
  return bytes.readUInt32BE(16);
}

function exactFile(root, binding, label, errors) {
  if (!binding || typeof binding.path !== 'string' || !SHA256.test(binding.sha256 || '')) {
    errors.push(`${label}: exact path/SHA-256 binding is missing`);
    return null;
  }
  const file = path.resolve(root, binding.path);
  if (!file.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    errors.push(`${label}: bound file is missing or outside the repository: ${binding.path}`);
    return null;
  }
  const actual = digest(file);
  if (actual !== binding.sha256) errors.push(`${label}: SHA-256 is stale; expected ${binding.sha256}, current ${actual}`);
  return file;
}

export function validateBuildingVisualAdmission({ root, product, manifest, assetRegistry }) {
  const errors = [];
  const pointer = manifest.visual_experience_admission;
  if (!pointer || pointer.status !== 'PASS' || typeof pointer.admission_id !== 'string') {
    return { pass: false, errors: [`${product.id}: visual_experience_admission PASS pointer is missing`] };
  }
  const recordFile = exactFile(root, pointer.record, `${product.id}.visual_experience_admission.record`, errors);
  if (!recordFile) return { pass: false, errors };
  let record;
  try { record = JSON.parse(fs.readFileSync(recordFile, 'utf8')); }
  catch (error) { return { pass: false, errors: [...errors, `${product.id}: invalid visual admission JSON: ${error.message}`] }; }

  if (record.admission_id !== pointer.admission_id) errors.push(`${product.id}: admission_id pointer mismatch`);
  if (record.owner_id !== product.id) errors.push(`${product.id}: visual admission owner mismatch`);
  if (record.status !== 'PASS' || record.control_room_result !== 'ADMIT') errors.push(`${product.id}: visual admission is not PASS/ADMIT`);
  const candidateFile = exactFile(root, record.candidate, `${product.id}.candidate`, errors);
  const expectedRouteArtifact = (manifest.route || '').replace(/^\//, '');
  if (record.candidate?.path !== expectedRouteArtifact) errors.push(`${product.id}: candidate does not equal current route artifact ${expectedRouteArtifact}`);
  if (!Array.isArray(record.route_artifacts) || !record.route_artifacts.some(binding => binding.path === record.candidate?.path && binding.sha256 === record.candidate?.sha256)) {
    errors.push(`${product.id}: route_artifacts must include the exact candidate and every visual/runtime dependency`);
  }
  for (const [index, artifact] of (record.route_artifacts || []).entries()) {
    exactFile(root, artifact, `${product.id}.route_artifacts[${index}]`, errors);
  }

  const active = new Map((assetRegistry.entries || []).filter(entry => entry.status === 'ACTIVE').map(entry => [entry.path, entry]));
  if (!Array.isArray(record.environment_assets) || record.environment_assets.length === 0) {
    errors.push(`${product.id}: no exact environment asset bindings`);
  }
  const manifestEnvironmentAssets = new Set(
    (manifest.environment_assets || []).map(asset => typeof asset === 'string' ? asset.replace(/^\/+/, '') : '')
  );
  const admittedEnvironmentAssets = new Set(
    (record.environment_assets || []).map(asset => typeof asset?.path === 'string' ? asset.path.replace(/^\/+/, '') : '')
  );
  if (manifestEnvironmentAssets.has('') || manifestEnvironmentAssets.size === 0) {
    errors.push(`${product.id}: manifest environment_assets are missing or invalid`);
  }
  for (const assetPath of manifestEnvironmentAssets) {
    if (!admittedEnvironmentAssets.has(assetPath)) {
      errors.push(`${product.id}: manifest environment asset is omitted from visual admission: ${assetPath}`);
    }
  }
  for (const assetPath of admittedEnvironmentAssets) {
    if (!manifestEnvironmentAssets.has(assetPath)) {
      errors.push(`${product.id}: visual admission contains an environment asset absent from the manifest: ${assetPath}`);
    }
  }
  for (const [index, asset] of (record.environment_assets || []).entries()) {
    exactFile(root, asset, `${product.id}.environment_assets[${index}]`, errors);
    if (typeof asset.role !== 'string' || !/(environment|arrival|shelf|primary|room|interior|object)/i.test(asset.role)) {
      errors.push(`${product.id}.environment_assets[${index}]: visual role is missing`);
    }
    const authority = active.get(asset.path);
    if (!authority || authority.sha256 !== asset.sha256 || authority.role !== asset.role) {
      errors.push(`${product.id}.environment_assets[${index}]: asset is not exact ACTIVE path/SHA/role authority`);
    }
  }

  const captureIdentities = new Set();
  for (const [viewport, width] of Object.entries(REQUIRED_VIEWPORTS)) {
    const capture = record.screenshots?.[viewport];
    const file = exactFile(root, capture, `${product.id}.screenshots.${viewport}`, errors);
    if (capture?.candidate_sha256 !== record.candidate?.sha256) errors.push(`${product.id}.${viewport}: capture is not bound to current candidate`);
    if (capture?.viewport_width !== width) errors.push(`${product.id}.${viewport}: viewport_width must be ${width}`);
    if (file && pngWidth(file) !== width) errors.push(`${product.id}.${viewport}: PNG width does not equal ${width}`);
    if (capture?.path && capture?.sha256) captureIdentities.add(`${capture.path}|${capture.sha256}`);
  }
  if (captureIdentities.size !== Object.keys(REQUIRED_VIEWPORTS).length) errors.push(`${product.id}: required captures are not distinct`);

  const roleIds = [];
  for (const role of REQUIRED_JUDGES) {
    const judge = record.roles?.[role];
    if (!judge?.agent_id || judge.result !== 'ACCEPT') errors.push(`${product.id}: ${role} did not explicitly ACCEPT`);
    else roleIds.push(judge.agent_id);
    const receipt = exactFile(root, judge?.receipt, `${product.id}.${role}.receipt`, errors);
    if (receipt && candidateFile && !fs.readFileSync(receipt, 'utf8').includes(record.candidate.sha256)) {
      errors.push(`${product.id}.${role}: receipt does not bind candidate SHA-256`);
    }
  }
  const red = record.roles?.red_team;
  if (!red?.agent_id || red.result !== 'UNSHAKEN') errors.push(`${product.id}: red team did not return UNSHAKEN`);
  else roleIds.push(red.agent_id);
  const redReceipt = exactFile(root, red?.receipt, `${product.id}.red_team.receipt`, errors);
  if (redReceipt && candidateFile && !fs.readFileSync(redReceipt, 'utf8').includes(record.candidate.sha256)) {
    errors.push(`${product.id}.red_team: receipt does not bind candidate SHA-256`);
  }
  const opus = record.roles?.claude_opus_5_reviewer;
  if (!opus?.agent_id || opus.model_id !== 'claude-opus-5' || opus.recommendation !== 'ADMIT') {
    errors.push(`${product.id}: exact Claude Opus 5 ADMIT is missing`);
  } else roleIds.push(opus.agent_id);
  const opusReceipt = exactFile(root, opus?.receipt, `${product.id}.claude_opus_5_reviewer.receipt`, errors);
  if (opusReceipt && candidateFile && !fs.readFileSync(opusReceipt, 'utf8').includes(record.candidate.sha256)) {
    errors.push(`${product.id}.claude_opus_5_reviewer: receipt does not bind candidate SHA-256`);
  }
  if (new Set(roleIds).size !== roleIds.length) errors.push(`${product.id}: independent visual roles are not distinct`);

  return { pass: errors.length === 0, errors, record };
}

export const BUILDING_VISUAL_VIEWPORTS = REQUIRED_VIEWPORTS;
