#!/usr/bin/env node
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const read = p => JSON.parse(fs.readFileSync(path.isAbsolute(p) ? p : path.join(root, p), 'utf8'));
const errors = [];
const fixturePath = (envName, canonical) => fixtureMode && process.env[envName] ? process.env[envName] : canonical;
const queue = read(fixturePath('LAIDIES_QUEUE_PATH', 'operations/control-room/owner-review-queue.json'));
const hasDesignCandidate = [...(queue.review_now || []), ...(queue.being_built || [])]
  .some(item => item?.design_admission || /^building_page_visual/.test(item?.review_type || ''));
const productionOverrides = Object.keys(process.env).filter(name => name.startsWith('LAIDIES_'));
if (!fixtureMode && productionOverrides.length) {
  errors.push(`fixture overrides require --fixture: ${productionOverrides.join(', ')}`);
}
const pass = value => value === 'PASS' || String(value).startsWith('PASS_');

for (const checker of [
  'scripts/check-context-authority.mjs',
  'scripts/check-canonical-instruction-dependencies.mjs',
  'scripts/check-work-resolution-loop.mjs',
  'scripts/check-dispatcher-migration.mjs',
  'scripts/check-media-defect-fixtures.mjs',
  'scripts/check-design-review-admission.mjs'
]) {
  if (checker === 'scripts/check-design-review-admission.mjs' && !hasDesignCandidate) continue;
  const childEnv = { ...process.env };
  for (const name of Object.keys(childEnv)) if (name.startsWith('LAIDIES_')) delete childEnv[name];
  const result = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8', env: childEnv });
  if (result.status !== 0) errors.push(`${checker} failed:\n${result.stdout}${result.stderr}`.trim());
}

const gate = read(fixturePath('LAIDIES_MEDIA_GATE_PATH', 'operations/launch/opening-day-media-gate-2026-07-31.json'));
const mediaState = read(fixturePath('LAIDIES_MEDIA_STATE_PATH', 'operations/product-stewards/episode-media-quality/state.json'));
const registry = read(fixturePath('LAIDIES_ASSET_REGISTRY_PATH', 'operations/assets/active-asset-registry.json'));
const runQueue = read(fixturePath('LAIDIES_RUN_QUEUE_PATH', 'operations/product-stewards/run-queue.json'));
const classCatalogue = read(fixturePath('LAIDIES_CLASS_CATALOGUE_PATH', 'operations/classes/opening-day-class-catalogue-2026-07-31.json'));

for (const [key, items] of Object.entries({
  review_now: queue.review_now,
  internal_repair_required: queue.internal_repair_required,
  being_built: queue.being_built,
  blocked_no_ali_action: queue.blocked_no_ali_action,
  completed_review: queue.completed_review
})) {
  if (!Array.isArray(items)) errors.push(`queue.${key} must be an array`);
  else if (queue.summary?.[key] !== items.length) errors.push(`queue.summary.${key}=${queue.summary?.[key]} but ${items.length} items exist`);
}

const objectiveMediaGates = [
  'exact_master','decode_and_clock','captions','content_accuracy',
  'narration_picture_timing','visual_identity_and_continuity','motion_and_animation',
  'occurrence_narration_or_purpose_relevance','occurrence_motion_continuity_and_occlusion',
  'recurring_opening_and_closing_credits','website_player','responsive_and_accessible_playback'
];

const programmeById = new Map(gate.programmes.map(p => [String(p.id), p]));
for (const item of queue.review_now || []) {
  const match = item.id?.match(/^(trailer|episode-(\d\d))/);
  if (!match) continue;
  const id = match[1] === 'trailer' ? 'trailer' : match[2];
  const programme = programmeById.get(id);
  if (!programme) { errors.push(`${item.id}: no launch-gate programme`); continue; }
  for (const gateName of objectiveMediaGates) {
    if (!pass(programme.gates?.[gateName])) errors.push(`${item.id}: cannot enter Ali review; ${gateName}=${programme.gates?.[gateName] ?? 'MISSING'}`);
  }
  if (item.master?.sha256 !== programme.master?.sha256) errors.push(`${item.id}: queue master does not match launch gate`);
  if (/FAIL|REBUILD REQUIRED/i.test(programme.status || item.release_identity?.status || '')) errors.push(`${item.id}: failed/rebuild work cannot enter Ali review`);
}

for (const programme of gate.programmes || []) {
  const hasObjectiveProblem = objectiveMediaGates.some(name => !pass(programme.gates?.[name]));
  if (!hasObjectiveProblem) continue;
  const pattern = programme.id === 'trailer' ? /^trailer-/ : new RegExp(`^episode-${programme.id}-`);
  if (!(queue.internal_repair_required || []).some(item => pattern.test(item.id || ''))) {
    errors.push(`${programme.id}: objective media failure is missing from internal_repair_required`);
  }
}

const objectiveProblems = gate.programmes.flatMap(p => objectiveMediaGates
  .filter(name => !pass(p.gates?.[name]))
  .map(name => `${p.id}.${name}=${p.gates?.[name]}`));
if (objectiveProblems.length && /5_OF_5.*VERIFIED|NO_CONFIRMED.*DEFECT/i.test(mediaState.current_stage || '')) {
  errors.push(`episode-media state contradicts launch gate: ${objectiveProblems.slice(0, 4).join(', ')}`);
}

for (const entry of registry.entries || []) {
  if (entry.status !== 'ACTIVE' || !entry.path) continue;
  const target = path.join(root, entry.path);
  if (!fs.existsSync(target)) { errors.push(`${entry.role}: active asset missing: ${entry.path}`); continue; }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
  if (actual !== entry.sha256) errors.push(`${entry.role}: checksum mismatch`);
}
for (const retired of registry.retired_paths || []) {
  if ((queue.review_now || []).some(item => JSON.stringify(item).includes(retired))) errors.push(`review item binds retired asset: ${retired}`);
}

for (const item of [...(runQueue.active || []), ...(runQueue.active_portfolio_work || [])]) {
  if (!String(item.status || '').startsWith('RUNNING')) continue;
  const heartbeat = Date.parse(item.heartbeat_at || '');
  if (!Number.isFinite(heartbeat) || Date.now() - heartbeat > 24 * 60 * 60 * 1000) {
    errors.push(`${item.product_id || item.system_id}: stale RUNNING record; heartbeat_at=${item.heartbeat_at || 'MISSING'}`);
  }
}

// Ali's rejection must survive generated summaries. A technically passing
// animatic cannot make ODC-101 look active, acceptable or ready for review.
const odcQueue = (queue.internal_repair_required || []).find(item => item.id === 'odc-101-teaching-design-rejection');
const odcCatalogue = (classCatalogue.classes || []).find(item => item.id === 'ODC-101');
if (!odcQueue || !/INTERNAL REPAIR REQUIRED/.test(odcQueue.decision || '') || !/not good enough/i.test(odcQueue.why_you || '')) {
  errors.push('ODC-101 rejection is missing from internal_repair_required');
}
if ((queue.being_built || []).some(item => /ODC-101/.test(item.title || ''))) {
  errors.push('ODC-101 rejected teaching design cannot remain in being_built');
}
if (!odcCatalogue || !/INTERNAL REPAIR REQUIRED/.test(odcCatalogue.current_truth || '') || !/not good enough/i.test(odcCatalogue.current_truth || '')) {
  errors.push('ODC-101 catalogue truth does not preserve Ali rejection');
}

if (errors.length) {
  console.error('OPERATIONAL INTEGRITY FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(fixtureMode ? 'OPERATIONAL INTEGRITY FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'OPERATIONAL INTEGRITY PASS');
