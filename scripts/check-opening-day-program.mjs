#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { validateBuildingVisualAdmission } from './lib/building-visual-admission.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const registryPath = path.join(root, 'operations/product-stewards/registry.json');
const programPath = process.env.LAIDIES_OPENING_DAY_PROGRAM_PATH
  ? path.resolve(process.env.LAIDIES_OPENING_DAY_PROGRAM_PATH)
  : path.join(root, 'operations/launch/opening-day-whole-town-program-2026-07-31.json');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const program = JSON.parse(fs.readFileSync(programPath, 'utf8'));
const errors = [];
const assetRegistry = JSON.parse(fs.readFileSync(path.join(root, 'operations/assets/active-asset-registry.json'), 'utf8'));
const requireLaunchReady = process.argv.includes('--require-launch-ready');
let mediaGate = null;
let classCatalogue = null;
let siteVideoGate = null;

function readManifest(manifestPath, missingMessage) {
  if (typeof manifestPath !== 'string' || !fs.existsSync(path.join(root, manifestPath))) {
    errors.push(missingMessage);
    return null;
  }
  return JSON.parse(fs.readFileSync(path.join(root, manifestPath), 'utf8'));
}

function existingRelativeFile(value) {
  return typeof value === 'string' && value.length > 0 && fs.existsSync(path.join(root, value));
}

function visualAdmission(product) {
  const manifestPath = path.join(root, `operations/product-stewards/${product.id}/INTERACTIVE-ENVIRONMENT.json`);
  if (!fs.existsSync(manifestPath)) return { pass: false, errors: [`${product.id}: environment manifest missing`] };
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return validateBuildingVisualAdmission({ root, product, manifest, assetRegistry });
  } catch (error) {
    return { pass: false, errors: [`${product.id}: environment manifest invalid: ${error.message}`] };
  }
}

classCatalogue = readManifest(program.class_catalogue_manifest, 'Opening-day class catalogue manifest is missing.');
mediaGate = readManifest(program.media_gate_manifest, 'Opening-day media gate manifest is missing.');
siteVideoGate = readManifest(program.site_video_gate_manifest, 'Universal site video and animation gate manifest is missing.');

const registered = registry.products
  .filter((product) => product.kind === 'building')
  .sort((a, b) => a.building_number - b.building_number);
const planned = [...program.buildings].sort((a, b) => a.number - b.number);

if (registered.length !== 17) errors.push(`Expected 17 registered buildings; found ${registered.length}.`);
if (planned.length !== registered.length) errors.push(`Program covers ${planned.length}/${registered.length} buildings.`);

for (const product of registered) {
  const item = planned.find((candidate) => candidate.id === product.id);
  if (!item) {
    errors.push(`Missing building: ${product.id}.`);
    continue;
  }
  if (item.number !== product.building_number) errors.push(`${product.id}: number ${item.number} != registry ${product.building_number}.`);
  if (item.name !== product.name) errors.push(`${product.id}: name does not match registry.`);
  if (typeof item.status !== 'string' || item.status.trim().length < 3) errors.push(`${product.id}: missing status.`);
  for (const field of ['opening_day_floor', 'acceptance_proof', 'next_action']) {
    if (typeof item[field] !== 'string' || item[field].trim().length < 12) errors.push(`${product.id}: missing substantive ${field}.`);
  }
  if (/RELEASE_READY|VERIFIED PUBLICLY|VERIFIED_PUBLICLY/.test(item.status || '') && !visualAdmission(product).pass) {
    errors.push(`${product.id}: ${item.status} requires exact visual-experience admission from the owner environment manifest.`);
  }
}

const plannedIds = new Set();
for (const item of planned) {
  if (plannedIds.has(item.id)) errors.push(`Duplicate building id: ${item.id}.`);
  plannedIds.add(item.id);
}

for (const field of ['episodes', 'classes', 'library_books', 'study_packs', 'news', 'daily', 'music', 'luminairy', 'community', 'games_and_tools']) {
  if (typeof program.launch_catalogue?.[field] !== 'string' || program.launch_catalogue[field].trim().length < 12) {
    errors.push(`Missing substantive launch catalogue floor: ${field}.`);
  }
}

if (!Array.isArray(program.shared_systems) || program.shared_systems.length < 8) errors.push('Expected at least eight shared-system launch contracts.');
for (const system of program.shared_systems ?? []) {
  for (const field of ['id', 'owner_product', 'status', 'opening_day_floor', 'acceptance_proof', 'next_action']) {
    if (typeof system[field] !== 'string' || system[field].trim().length < 3) errors.push(`Shared system ${system.id ?? '<unknown>'}: missing ${field}.`);
  }
}

const openingEpisodes = program.episode_cutline?.opening_day ?? [];
if (openingEpisodes.length !== 5 || !openingEpisodes.some((entry) => entry.startsWith('Episode 04'))) {
  errors.push('Opening episode cutline must contain Trailer plus Episodes 01–04.');
}
if (program.episode_cutline?.first_post_opening_release !== 'Episode 05') errors.push('Episode 05 must remain the first post-opening release.');
if (program.episode_cutline?.scheduled_release_date !== '2026-08-05') errors.push('Episode 05 release date must be 2026-08-05.');

const buildingReady = planned.filter(item => /RELEASE_READY|VERIFIED_PUBLICLY/.test(item.status || '')).length;
const visualResults = registered.map(product => ({ product, result: visualAdmission(product) }));
const visualReady = visualResults.filter(entry => entry.result.pass).length;
const openingMediaIds = new Set(['trailer', '01', '02', '03', '04']);
const mediaProgrammes = (mediaGate?.programmes || []).filter(item => openingMediaIds.has(item.id));
const mediaProgrammeReady = (item) => item?.release_ready === true
  && /RELEASE_READY|VERIFIED_PUBLICLY/.test(item.status || '')
  && mediaGate?.required_gates?.every(gate => item.gates?.[gate] === 'PASS');
const mediaReady = mediaProgrammes.filter(mediaProgrammeReady).length;
const mediaTotal = mediaProgrammes.length;

function strictClassReadiness(manifest) {
  const classes = manifest?.classes;
  const schemaPresent = manifest?.opening_day_ready === true
    && manifest?.public_verification === 'PASS'
    && Array.isArray(classes)
    && classes.length === 3
    && classes.every(item => typeof item.release_ready === 'boolean'
      && typeof item.admission_status === 'string'
      && typeof item.public_verification === 'string'
      && existingRelativeFile(item.release_receipt));
  const ready = schemaPresent
    && manifest.status === 'PASS'
    && classes.every(item => item.release_ready === true
      && item.admission_status === 'PASS'
      && item.public_verification === 'PASS');
  return { schemaPresent, ready, total: Array.isArray(classes) ? classes.length : 0 };
}

function strictSiteVideoReadiness(manifest) {
  const programmes = manifest?.programmes;
  const openingProgrammes = Array.isArray(programmes)
    ? programmes.filter(item => openingMediaIds.has(item.id) || ['odc-101', 'odc-201', 'odc-lab-01'].includes(item.id))
    : [];
  const expectedIds = ['trailer', '01', '02', '03', '04', 'odc-101', 'odc-201', 'odc-lab-01'];
  const schemaPresent = manifest?.opening_day_ready === true
    && manifest?.public_verification === 'PASS'
    && openingProgrammes.length === expectedIds.length
    && expectedIds.every(id => openingProgrammes.some(item => item.id === id))
    && openingProgrammes.every(item => typeof item.release_ready === 'boolean'
      && typeof item.admission_status === 'string'
      && typeof item.public_verification === 'string'
      && existingRelativeFile(item.release_receipt));
  const ready = schemaPresent
    && manifest.status === 'PASS'
    && openingProgrammes.every(item => item.release_ready === true
      && item.admission_status === 'PASS'
      && item.public_verification === 'PASS');
  return { schemaPresent, ready, total: openingProgrammes.length };
}

const classReadiness = strictClassReadiness(classCatalogue);
const siteVideoReadiness = strictSiteVideoReadiness(siteVideoGate);
const launchReady = buildingReady === planned.length
  && visualReady === planned.length
  && mediaTotal === openingMediaIds.size
  && mediaReady === openingMediaIds.size
  && mediaGate?.status === 'PASS'
  && classReadiness.ready
  && siteVideoReadiness.ready;

if (requireLaunchReady && !launchReady) {
  if (buildingReady !== planned.length || visualReady !== planned.length) {
    errors.push(`Strict launch requires all ${planned.length} buildings RELEASE_READY/VERIFIED_PUBLICLY with exact visual-experience admission; found ${buildingReady} release-ready and ${visualReady} visual admissions.`);
    for (const entry of visualResults.filter(entry => !entry.result.pass)) {
      errors.push(...entry.result.errors.map(error => `Visual admission: ${error}`));
    }
  }
  if (mediaTotal !== openingMediaIds.size || mediaReady !== openingMediaIds.size || mediaGate?.status !== 'PASS') {
    errors.push(`Strict launch requires 5/5 opening media programmes PASS with release_ready=true and every required gate PASS; found ${mediaReady}/${mediaTotal}; gate=${mediaGate?.status || 'UNKNOWN'}.`);
  }
  if (!classReadiness.schemaPresent) {
    errors.push('Strict launch class readiness is fail-closed: the class catalogue lacks the required opening_day_ready/public_verification and per-class release_ready/admission_status/public_verification/release_receipt schema.');
  } else if (!classReadiness.ready) {
    errors.push(`Strict launch requires all ${classReadiness.total}/3 classes PASS with public verification.`);
  }
  if (!siteVideoReadiness.schemaPresent) {
    errors.push('Strict launch site-video readiness is fail-closed: the registry lacks the required opening_day_ready/public_verification and per-programme release_ready/admission_status/public_verification/release_receipt schema.');
  } else if (!siteVideoReadiness.ready) {
    errors.push(`Strict launch requires all ${siteVideoReadiness.total}/8 opening video programmes PASS with public verification.`);
  }
}

if (errors.length) {
  console.error('OPENING DAY PROGRAM: FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OPENING DAY PROGRAM: ${launchReady ? 'RELEASE READY' : 'SPECIFICATION VALID — NOT RELEASE READY'}`);
console.log(`- ${planned.length}/${registered.length} canonical buildings covered; ${buildingReady}/${planned.length} release-ready`);
console.log(`- ${visualReady}/${planned.length} buildings have exact visual-experience admission`);
console.log(`- ${program.shared_systems.length} shared-system contracts covered`);
console.log(`- ${Object.keys(program.launch_catalogue).length} catalogue floors covered`);
console.log(`- Opening media: ${mediaReady}/${mediaTotal} release-ready; gate=${mediaGate?.status || 'UNKNOWN'}`);
console.log(`- Classes: ${classReadiness.ready ? 'READY' : 'NOT READY'}; strict readiness schema=${classReadiness.schemaPresent ? 'present' : 'missing'}`);
console.log(`- Site video: ${siteVideoReadiness.ready ? 'READY' : 'NOT READY'}; strict readiness schema=${siteVideoReadiness.schemaPresent ? 'present' : 'missing'}`);
console.log(`- LAUNCH READINESS: ${launchReady ? 'PASS' : 'HOLD'}`);
console.log('- Opening cutline specification: Trailer + Episodes 01–04');
console.log('- First post-opening release: Episode 05 on 2026-08-05');
