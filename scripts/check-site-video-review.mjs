#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(root, 'operations/video-qa/site-video-review-registry-2026-07-31.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const errors = [];
const validStatuses = new Set(['PASS', 'HOLD', 'FAIL']);
let occurrenceSchema = null;
const requiredContentTypes = [
  'trailer',
  'episode',
  'class_lesson',
  'class_demonstration',
  'lab_or_tool_demonstration',
  'explainer',
  'music_video_or_visualizer',
  'homepage_or_building_film',
  'promo_or_social_embed',
  'logo_ident',
  'silent_instructional_animation',
  'interface_motion',
  'ambient_loop'
];

function fail(message) {
  errors.push(message);
}

async function sha256(file) {
  const hash = crypto.createHash('sha256');
  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', resolve);
    stream.on('error', reject);
  });
  return hash.digest('hex');
}

async function verifyFile(label, relativePath, expectedHash) {
  const file = relativePath ? path.join(root, relativePath) : null;
  if (!file || !fs.existsSync(file)) {
    fail(`${label}: missing file ${relativePath ?? '<unset>'}.`);
    return;
  }
  if (!/^[a-f0-9]{64}$/.test(expectedHash || '')) {
    fail(`${label}: missing exact SHA-256.`);
    return;
  }
  const actual = await sha256(file);
  if (actual !== expectedHash) fail(`${label}: checksum mismatch (${actual}).`);
}

function verifySchemaBoundOccurrenceEvidence(label, relativePath, expectedCount) {
  if (!occurrenceSchema || !relativePath) return;
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) return;

  let evidence;
  try {
    evidence = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${label}: occurrence evidence is not valid JSON (${error.message}).`);
    return;
  }

  // Older audits predate the occurrence schema. New evidence that explicitly
  // binds the schema must validate instead of merely existing by checksum.
  if (evidence.occurrence_schema !== registry.occurrence_schema) return;
  if (!Array.isArray(evidence.occurrences)) {
    fail(`${label}: schema-bound evidence requires an occurrences array.`);
    return;
  }
  if (evidence.occurrences.length !== expectedCount) {
    fail(`${label}: schema-bound evidence contains ${evidence.occurrences.length} occurrences, expected ${expectedCount}.`);
  }

  for (const [index, occurrence] of evidence.occurrences.entries()) {
    for (const field of occurrenceSchema.required ?? []) {
      if (!Object.hasOwn(occurrence, field)) {
        fail(`${label}: occurrence ${index + 1} omits required field ${field}.`);
      }
    }
    const anyOfSatisfied = (occurrenceSchema.anyOf ?? []).some((variant) =>
      (variant.required ?? []).every((field) => Object.hasOwn(occurrence, field))
    );
    if (!anyOfSatisfied) {
      fail(`${label}: occurrence ${index + 1} has neither a timed window nor an interface trigger.`);
    }
    for (const [field, definition] of Object.entries(occurrenceSchema.properties ?? {})) {
      if (!Object.hasOwn(occurrence, field)) continue;
      if (definition.enum && !definition.enum.includes(occurrence[field])) {
        fail(`${label}: occurrence ${index + 1} has invalid ${field}=${occurrence[field]}.`);
      }
      if (definition.type === 'boolean' && typeof occurrence[field] !== 'boolean') {
        fail(`${label}: occurrence ${index + 1} requires boolean ${field}.`);
      }
      if (definition.pattern && typeof occurrence[field] === 'string' && !(new RegExp(definition.pattern).test(occurrence[field]))) {
        fail(`${label}: occurrence ${index + 1} has invalid ${field}.`);
      }
    }
  }
}

if (!fs.existsSync(path.join(root, registry.contract || ''))) {
  fail('The binding site-video review contract is missing.');
}

const occurrenceSchemaPath = path.join(root, registry.occurrence_schema || '');
if (!registry.occurrence_schema || !fs.existsSync(occurrenceSchemaPath)) {
  fail('The machine-valid occurrence review schema is missing.');
} else {
  occurrenceSchema = JSON.parse(fs.readFileSync(occurrenceSchemaPath, 'utf8'));
  const requiredOccurrenceFields = [
    'route_or_surface',
    'placement_id',
    'parent_master_version',
    'narration_excerpt_or_silent_purpose',
    'visual_description',
    'observed_result',
    'relevance_disposition',
    'continuity_identity_verdict',
    'occlusion_flicker_verdict',
    'motion_semantics_verdict',
    'exact_repair_action',
    'normal_speed_final_context_confirmed'
  ];
  for (const field of requiredOccurrenceFields) {
    if (!occurrenceSchema.required?.includes(field)) fail(`Occurrence schema does not require ${field}.`);
  }
  const dispositions = occurrenceSchema.properties?.relevance_disposition?.enum ?? [];
  for (const disposition of registry.scope?.occurrence_dispositions ?? []) {
    if (!dispositions.includes(disposition)) fail(`Occurrence schema omits disposition ${disposition}.`);
  }
}

for (const type of requiredContentTypes) {
  if (!registry.scope?.content_types?.includes(type)) fail(`Scope omits ${type}.`);
}

for (const format of ['mp4', 'webm', 'm4v', 'gif', 'lottie', 'rive', 'css_animation']) {
  if (!registry.scope?.formats?.includes(format)) fail(`Scope omits ${format}.`);
}

const sitewideInventory = registry.sitewide_inventory;
let sitewideInventoryData = null;
if (!sitewideInventory) {
  fail('The deterministic sitewide motion inventory is not bound to the registry.');
} else {
  await verifyFile('Sitewide motion inventory JSON', sitewideInventory.json_path, sitewideInventory.json_sha256);
  await verifyFile('Sitewide motion inventory report', sitewideInventory.report_path, sitewideInventory.report_sha256);
  const inventoryFile = path.join(root, sitewideInventory.json_path || '');
  if (fs.existsSync(inventoryFile)) {
    const inventory = JSON.parse(fs.readFileSync(inventoryFile, 'utf8'));
    sitewideInventoryData = inventory;
    if (inventory.contract !== registry.contract) fail('Sitewide inventory is bound to a different review contract.');
    if (inventory.status !== sitewideInventory.status) fail('Sitewide inventory status does not match the registry.');
    const countBindings = {
      scanned_source_files: inventory.route_scope?.scanned_source_files,
      literal_motion_references: inventory.summary?.literal_motion_references,
      unregistered_literal_references: inventory.summary?.unregistered_literal_references,
      missing_literal_motion_files: inventory.summary?.missing_literal_motion_files,
      dynamic_video_renderers: inventory.summary?.dynamic_video_renderers,
      runtime_animation_definitions: inventory.summary?.runtime_animation_definitions,
      reviewed_runtime_animation_definitions: inventory.summary?.reviewed_runtime_animation_definitions,
      admitted_runtime_animation_definitions: inventory.summary?.admitted_runtime_animation_definitions,
      unreviewed_or_unadmitted_runtime_animation_definitions: inventory.summary?.unreviewed_or_unadmitted_runtime_animation_definitions,
      semantic_or_instructional_runtime_animations: inventory.summary?.semantic_or_instructional_runtime_animations
    };
    for (const [field, actual] of Object.entries(countBindings)) {
      if (sitewideInventory[field] !== actual) fail(`Sitewide inventory count mismatch for ${field}.`);
    }
    if ((inventory.route_scope?.missing_sitemap_files ?? []).length) fail('Sitewide inventory has unresolved sitemap routes.');
    if (sitewideInventory.status === 'PASS' && (
      sitewideInventory.unregistered_literal_references !== 0 ||
      sitewideInventory.missing_literal_motion_files !== 0 ||
      sitewideInventory.dynamic_video_renderers !== 0 ||
      sitewideInventory.unreviewed_or_unadmitted_runtime_animation_definitions !== 0
    )) {
      fail('Sitewide inventory cannot PASS while unadmitted motion surfaces remain.');
    }
  }
  if (!validStatuses.has(sitewideInventory.status)) fail('Sitewide inventory status is invalid.');
  const builderFile = path.join(root, sitewideInventory.builder || '');
  if (!sitewideInventory.builder || !fs.existsSync(builderFile)) fail('Sitewide inventory builder is missing.');
}

const runtimeReviewKeys = new Set();
for (const review of registry.runtime_animation_reviews ?? []) {
  const key = `${review.source_path}:${review.kind}:${review.name}`;
  if (runtimeReviewKeys.has(key)) fail(`${review.id}: duplicate runtime-animation review key ${key}.`);
  runtimeReviewKeys.add(key);
  if (!registry.scope?.content_types?.includes(review.content_type)) fail(`${review.id}: unknown content type ${review.content_type}.`);
  if (!registry.scope?.source_types?.includes(review.source_type)) fail(`${review.id}: unknown source type ${review.source_type}.`);
  if (!validStatuses.has(review.admission_status)) fail(`${review.id}: invalid admission status.`);
  if (!review.interface_trigger || !review.silent_purpose) fail(`${review.id}: interface trigger and silent purpose are required.`);
  if (!Number.isInteger(review.expected_instances) || review.expected_instances < 1) fail(`${review.id}: expected_instances must be positive.`);
  if (review.reviewed_instances !== review.expected_instances) fail(`${review.id}: reviewed instances do not cover expected instances.`);
  await verifyFile(`${review.id}: runtime source`, review.source_path, review.source_sha256);
  await verifyFile(`${review.id}: runtime evidence`, review.evidence_path, review.evidence_sha256);

  const evidenceFile = path.join(root, review.evidence_path || '');
  if (fs.existsSync(evidenceFile)) {
    let evidence;
    try {
      evidence = JSON.parse(fs.readFileSync(evidenceFile, 'utf8'));
    } catch (error) {
      fail(`${review.id}: runtime evidence is not valid JSON (${error.message}).`);
    }
    if (evidence) {
      if (evidence.source_path !== review.source_path || evidence.source_sha256 !== review.source_sha256) {
        fail(`${review.id}: runtime evidence is bound to a different source.`);
      }
      if (evidence.reviewed_class_instances !== review.reviewed_instances) fail(`${review.id}: evidence instance count does not match the registry.`);
      const animationEvidence = (evidence.animation_reviews ?? []).find((item) => item.kind === review.kind && item.name === review.name);
      if (!animationEvidence || animationEvidence.status !== review.admission_status || animationEvidence.source_type !== review.source_type) {
        fail(`${review.id}: exact animation evidence is missing or disagrees with the registry.`);
      }
      for (const capture of evidence.captures ?? []) {
        await verifyFile(`${review.id}: responsive capture`, capture.path, capture.sha256);
      }
      if (review.admission_status === 'PASS') {
        if (evidence.status !== 'PASS') fail(`${review.id}: PASS requires a PASS evidence receipt.`);
        if (!evidence.checks?.desktop_and_mobile || !evidence.checks?.no_horizontal_overflow) {
          fail(`${review.id}: PASS requires desktop/mobile and overflow proof.`);
        }
        if (!evidence.checks?.reduced_motion_disables_both_animations) {
          fail(`${review.id}: PASS requires reduced-motion proof.`);
        }
      }
    }
  }

  if (review.admission_status === 'PASS') {
    if (review.responsive_review?.desktop_1280 !== 'PASS' ||
        review.responsive_review?.mobile_390 !== 'PASS' ||
        review.responsive_review?.horizontal_overflow !== 'PASS') {
      fail(`${review.id}: PASS requires explicit responsive PASS results.`);
    }
    if (review.reduced_motion_review?.status !== 'PASS') fail(`${review.id}: PASS requires a reduced-motion PASS.`);
  }

  const inventoryEntry = sitewideInventoryData?.runtime_animations?.find((item) =>
    item.source_path === review.source_path && item.kind === review.kind && item.name === review.name
  );
  if (!inventoryEntry) {
    fail(`${review.id}: reviewed animation is absent from the deterministic sitewide inventory.`);
  } else {
    if (inventoryEntry.review_id !== review.id) fail(`${review.id}: sitewide inventory is not bound to this exact review.`);
    if (inventoryEntry.admission_status !== review.admission_status) fail(`${review.id}: sitewide inventory status disagrees with the review.`);
    if (inventoryEntry.source_sha256 !== review.source_sha256) fail(`${review.id}: sitewide inventory source checksum disagrees with the review.`);
  }
}

for (const surface of registry.runtime_surfaces ?? []) {
  const file = path.join(root, surface.path || '');
  if (!fs.existsSync(file)) {
    fail(`${surface.id}: runtime surface is missing at ${surface.path}.`);
    continue;
  }
  const source = fs.readFileSync(file, 'utf8');
  if (surface.status !== 'FAIL_CLOSED') fail(`${surface.id}: runtime surface is not fail-closed.`);
  if (!surface.proof_pattern || !source.includes(surface.proof_pattern)) {
    fail(`${surface.id}: fail-closed proof pattern is absent.`);
  }
  if (surface.source_sha256) {
    await verifyFile(`${surface.id}: runtime source`, surface.path, surface.source_sha256);
  }
  if (surface.evidence_path || surface.evidence_sha256) {
    await verifyFile(`${surface.id}: runtime evidence`, surface.evidence_path, surface.evidence_sha256);
  }
  for (const binding of surface.data_bindings ?? []) {
    await verifyFile(`${surface.id}: data binding`, binding.path, binding.sha256);
  }

  if (surface.current_state_check?.type === 'class-player-three-gate') {
    const registerFile = path.join(root, surface.current_state_check.register_path || '');
    const ledgerFile = path.join(root, surface.current_state_check.ledger_path || '');
    if (!fs.existsSync(registerFile) || !fs.existsSync(ledgerFile)) {
      fail(`${surface.id}: class-player state files are missing.`);
      continue;
    }
    const register = JSON.parse(fs.readFileSync(registerFile, 'utf8'));
    const ledger = JSON.parse(fs.readFileSync(ledgerFile, 'utf8'));
    const classes = Array.isArray(register.classes) ? register.classes : [];
    const classRecords = Array.isArray(ledger.records)
      ? ledger.records.filter((record) => record.kind === 'class')
      : [];
    const liveRows = classes.filter((item) => item.status === 'live');
    const videoRows = classes.filter((item) => typeof item.video === 'string' && item.video.trim());
    const admittedRecords = classRecords.filter((record) => record.status === 'admitted');
    const playableRows = classes.filter((item) => {
      if (item.status !== 'live' || typeof item.video !== 'string' || !item.video.trim()) return false;
      const record = classRecords.find((candidate) => candidate.recordId === item.learning_record);
      return Boolean(record && record.status === 'admitted' && record.bindings?.videoPath === item.video);
    });
    const expected = surface.current_state_check.expected;
    const actual = {
      registered_classes: classes.length,
      live_register_rows: liveRows.length,
      rows_with_video_path: videoRows.length,
      admitted_class_learning_records: admittedRecords.length,
      playable_class_occurrences: playableRows.length
    };
    for (const [field, expectedValue] of Object.entries(expected ?? {})) {
      if (actual[field] !== expectedValue) {
        fail(`${surface.id}: ${field} changed from ${expectedValue} to ${actual[field]}. Re-audit the class-player admission state.`);
      }
    }
    if (!source.includes("cls.status === 'live' && cls.video && admitted")) {
      fail(`${surface.id}: the three-condition live playback gate is absent.`);
    }
    if (!source.includes('not a playable or approved class')) {
      fail(`${surface.id}: the explicit non-playable production status is absent.`);
    }
  }
}

const admittedAssetPaths = new Set();
for (const asset of registry.direct_motion_assets ?? []) {
  admittedAssetPaths.add(asset.path);
  await verifyFile(asset.id, asset.path, asset.sha256);
  if (!validStatuses.has(asset.occurrence_review?.status)) {
    fail(`${asset.id}: occurrence review has no PASS/HOLD/FAIL status.`);
  }
  const expected = asset.occurrence_review?.expected_occurrences;
  const reviewed = asset.occurrence_review?.reviewed_occurrences;
  if (!Number.isInteger(expected) || expected < 1 || !Number.isInteger(reviewed) || reviewed < 0 || reviewed > expected) {
    fail(`${asset.id}: occurrence coverage is invalid.`);
  }
  if (reviewed > 0) {
    await verifyFile(
      `${asset.id} occurrence evidence`,
      asset.occurrence_review?.evidence_path,
      asset.occurrence_review?.evidence_sha256
    );
    verifySchemaBoundOccurrenceEvidence(
      `${asset.id} occurrence evidence`,
      asset.occurrence_review?.evidence_path,
      reviewed
    );
    const dispositionCounts = asset.occurrence_review?.disposition_counts;
    if (!dispositionCounts || typeof dispositionCounts !== 'object') {
      fail(`${asset.id}: reviewed occurrences require disposition counts.`);
    } else {
      const counted = Object.values(dispositionCounts).reduce((total, count) => (
        Number.isInteger(count) && count >= 0 ? total + count : Number.NaN
      ), 0);
      if (!Number.isFinite(counted) || counted !== reviewed) {
        fail(`${asset.id}: disposition counts do not total reviewed occurrences.`);
      }
    }
  }
  if (!validStatuses.has(asset.admission_status)) fail(`${asset.id}: admission status is invalid.`);
  if (asset.admission_status === 'PASS' && (asset.occurrence_review.status !== 'PASS' || reviewed !== expected)) {
    fail(`${asset.id}: PASS requires complete occurrence review.`);
  }
  for (const sourcePath of asset.bound_sources ?? []) {
    const sourceFile = path.join(root, sourcePath);
    if (!fs.existsSync(sourceFile)) {
      fail(`${asset.id}: bound source is missing at ${sourcePath}.`);
      continue;
    }
    const source = fs.readFileSync(sourceFile, 'utf8');
    if (!source.includes(asset.path) && !source.includes(`/${asset.path}`)) {
      fail(`${asset.id}: ${sourcePath} no longer contains the declared binding.`);
    }
  }
}

const referencePattern = /\/?assets\/[A-Za-z0-9_./-]+\.(?:mp4|webm|m4v|gif)/g;
const monitoredSources = new Set(registry.monitored_visitor_sources ?? []);

const sitemapPath = path.join(root, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  for (const [, rawPath] of sitemap.matchAll(/<loc>https:\/\/laidies\.ai([^<]*)<\/loc>/g)) {
    const pathname = rawPath || '/';
    const candidate = pathname === '/' ? 'index.html' : `${pathname.replace(/^\//, '')}.html`;
    if (fs.existsSync(path.join(root, candidate))) monitoredSources.add(candidate);
  }
}

function addContentSources(relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) addContentSources(relative);
    else if (/\.(?:js|json)$/.test(entry.name)) monitoredSources.add(relative);
  }
}

addContentSources('content');

for (const sourcePath of monitoredSources) {
  const sourceFile = path.join(root, sourcePath);
  if (!fs.existsSync(sourceFile)) {
    fail(`Monitored visitor source is missing at ${sourcePath}.`);
    continue;
  }
  const source = fs.readFileSync(sourceFile, 'utf8');
  const references = source.match(referencePattern) ?? [];
  for (const reference of references) {
    const normalized = reference.replace(/^\//, '');
    if (!admittedAssetPaths.has(normalized)) {
      fail(`${sourcePath}: motion reference ${normalized} is absent from the review registry.`);
    }
  }
}

for (const programme of registry.programmes ?? []) {
  await verifyFile(`${programme.id} master`, programme.master_path, programme.master_sha256);
  await verifyFile(`${programme.id} captions`, programme.caption_path, programme.caption_sha256);
  if (!Number.isInteger(programme.expected_occurrences) || programme.expected_occurrences < 1) {
    fail(`${programme.id}: expected occurrence count is invalid.`);
  }
  for (const dimension of ['relevance_review', 'continuity_and_occlusion_review', 'motion_semantics_review']) {
    const review = programme[dimension];
    if (!validStatuses.has(review?.status)) fail(`${programme.id}: ${dimension} verdict is invalid.`);
    if (!Number.isInteger(review?.reviewed_occurrences) || review.reviewed_occurrences < 0 || review.reviewed_occurrences > programme.expected_occurrences) {
      fail(`${programme.id}: ${dimension} coverage is invalid.`);
    }
  }
  if (!validStatuses.has(programme.admission_status)) fail(`${programme.id}: admission status is invalid.`);
  if (programme.admission_status === 'PASS') {
    for (const dimension of ['relevance_review', 'continuity_and_occlusion_review', 'motion_semantics_review']) {
      if (programme[dimension].status !== 'PASS' || programme[dimension].reviewed_occurrences !== programme.expected_occurrences) {
        fail(`${programme.id}: PASS requires complete PASS coverage for ${dimension}.`);
      }
    }
    if ((programme.open_findings ?? []).length) fail(`${programme.id}: PASS cannot retain open findings.`);
  }
}

const everything = [...(registry.direct_motion_assets ?? []), ...(registry.programmes ?? [])];
const allPass = everything.length > 0 &&
  everything.every((item) => item.admission_status === 'PASS') &&
  sitewideInventory?.status === 'PASS';
if ((registry.status === 'PASS') !== allPass) {
  fail(`Registry status ${registry.status} does not match all-items-pass=${allPass}.`);
}

if (errors.length) {
  console.error('SITE VIDEO REVIEW REGISTRY: INVALID');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const held = everything.filter((item) => item.admission_status === 'HOLD');
const failed = everything.filter((item) => item.admission_status === 'FAIL');
console.log('SITE VIDEO REVIEW REGISTRY: VALID');
console.log(`- tracked exact items: ${everything.length}`);
console.log(`- admitted: ${everything.filter((item) => item.admission_status === 'PASS').length}`);
console.log(`- hold: ${held.map((item) => item.id).join(', ') || 'none'}`);
console.log(`- fail: ${failed.map((item) => item.id).join(', ') || 'none'}`);
console.log(`- sitewide inventory: ${sitewideInventory?.status ?? 'missing'}`);
console.log(`- registry admission: ${registry.status}`);

if (process.argv.includes('--require-ready') && !allPass) {
  console.error('SITE VIDEO ADMISSION: HOLD');
  process.exit(2);
}
