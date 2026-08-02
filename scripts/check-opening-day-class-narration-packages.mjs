#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const packages = [
  {
    id: 'ODC-101',
    directory: 'odc-101-final-narration-production-2026-08-02',
    script: 'operations/classes/odc-101-teaching-media-script-2026-08-02.json',
    animatic: 'operations/classes/media/odc-101-teaching-media-review-animatic-v1/manifest.json',
    expectedStatus: 'VOICE_AUDITION_RECEIVED_HOLD'
  },
  {
    id: 'ODC-201',
    directory: 'odc-201-final-narration-production-2026-08-02',
    script: 'operations/classes/odc-201-teaching-media-script-2026-08-02.json',
    animatic: 'operations/classes/media/odc-201-teaching-media-review-animatic-v1/manifest.json',
    expectedStatus: 'DRAFT_PERFORMANCE_WORKBENCH_HOLD_PENDING_CONTENT_REVIEW'
  },
  {
    id: 'ODC-LAB-01',
    directory: 'odc-lab-01-final-narration-production-2026-08-02',
    script: 'operations/classes/odc-lab-01-teaching-media-script-2026-08-02.json',
    animatic: 'operations/classes/media/odc-lab-01-teaching-media-review-animatic-v1/manifest.json',
    expectedStatus: 'DRAFT_PERFORMANCE_WORKBENCH_HOLD_PENDING_CONTENT_REVIEW'
  }
];

const catalogue = readJson(path.join(root, 'operations/classes/opening-day-class-catalogue-2026-07-31.json'));
const results = [];

for (const item of packages) {
  const packageRoot = path.join(root, 'operations/classes/media', item.directory);
  const manifest = readJson(path.join(packageRoot, 'manifest.json'));
  const script = readJson(path.join(root, item.script));
  const animatic = readJson(path.join(root, item.animatic));

  assert.equal(manifest.class_id, item.id);
  assert.equal(script.class_id, item.id);
  assert.equal(manifest.status, item.expectedStatus);
  assert.equal(manifest.voice.provider, 'ElevenLabs Studio');
  assert.equal(manifest.voice.display_name, 'Hope — upbeat and clear');
  assert.equal(manifest.voice.voice_id, 'tnSpp4vdxKPjI9w0GnoV');
  assert.equal(manifest.voice.model, 'Eleven v3');
  assert.equal(manifest.voice.model_id, 'eleven_v3');
  assert.equal(manifest.voice.settings, null);
  assert.equal(manifest.voice.approval, 'OWNER_SELECTED_SAMPLE_RECEIVED_PENDING_EXACT_SETTINGS_AND_FULL_SCRIPT_RENDER');
  assert.equal(manifest.instructional_design_standard.path, 'operations/classes/CLASS-MEDIA-PRODUCTION-STANDARD.md');
  assert.equal(manifest.instructional_design_standard.delivery, 'teach_your_smartest_best_friend');
  assert.equal(manifest.instructional_design_standard.volatile_ui_policy, 'durable_narration_plus_replaceable_current_path_inserts');
  assert.equal(sha256(path.join(root, manifest.instructional_design_standard.path)), manifest.instructional_design_standard.sha256, `${item.id} instructional design standard drifted`);
  assert.match(manifest.release_boundary, /(does not authorize|No audio)/);

  for (const bound of [...manifest.inputs, ...manifest.workbench]) {
    const file = path.join(root, bound.path);
    assert.ok(fs.existsSync(file), `missing bound file: ${bound.path}`);
    assert.equal(sha256(file), bound.sha256, `checksum mismatch: ${bound.path}`);
  }

  const narrationWords = script.scenes
    .flatMap((scene) => (scene.narration || '').trim().split(/\s+/))
    .filter(Boolean).length;
  assert.equal(narrationWords, manifest.narration_word_count, `${item.id} narration word count drifted`);
  assert.equal(script.voice_status, 'PROVISIONAL_SYSTEM_VOICE_NOT_RELEASE_APPROVED');
  assert.equal(animatic.status, 'BUILT_LOCALLY_HOLD');
  assert.ok(animatic.known_limits.some((limit) => /system voice/.test(limit) && /not an approved performance/.test(limit)), `${item.id} animatic voice boundary missing`);
  assert.ok(animatic.known_limits.some((limit) => /not release-caption evidence/.test(limit) && /approved final narration audio/.test(limit)), `${item.id} animatic caption boundary missing`);
  assert.ok(animatic.known_limits.some((limit) => /No public class video, poster/.test(limit)), `${item.id} public-binding boundary missing`);

  const packageScript = fs.readFileSync(path.join(packageRoot, 'recording-script.md'), 'utf8');
  const normalizedPackageScript = packageScript.replace(/\s+/g, ' ');
  assert.match(packageScript, /Hope — upbeat and clear/, `${item.id} selected course voice missing`);
  assert.match(packageScript, /Eleven v3/, `${item.id} selected course model missing`);
  assert.match(packageScript, /one\s+continuous chapter/, `${item.id} continuous Studio generation rule missing`);
  assert.match(normalizedPackageScript, /smartest best friend/, `${item.id} adult-peer teaching direction missing`);
  assert.match(normalizedPackageScript, /replaceable (?:current-path )?screen inserts|replaceable current-path/, `${item.id} volatile interface boundary missing`);
  assert.ok(!/Jessica \/ the Heroine/.test(packageScript), `${item.id} must not use the episode narrator as its course voice`);
  assert.ok(manifest.release_requirements.some((item) => /instructional visual-job gate/.test(item)), `${item.id} visual-job release gate missing`);
  assert.ok(manifest.release_requirements.some((item) => /real screenshots or screen recordings/.test(item)), `${item.id} real-interface evidence gate missing`);
  assert.ok(manifest.release_requirements.some((item) => /replaceable current-path inserts/.test(item)), `${item.id} replaceable UI insert gate missing`);

  const catalogueItem = catalogue.classes.find((entry) => entry.id === item.id);
  assert.ok(catalogueItem, `${item.id} opening-day catalogue entry missing`);
  assert.match(catalogueItem.current_truth, /voice is provisional|provisional system voice/i, `${item.id} catalogue voice boundary missing`);
  assert.ok(catalogueItem.remaining_work.some((work) => /final narration.*(?:before|then).*picture.*caption/i.test(work)), `${item.id} narration-first order missing from catalogue`);

  results.push({
    class_id: item.id,
    package_status: manifest.status,
    narration_words: narrationWords,
    voice_selection: 'OWNER_SELECTED_SAMPLE_RECEIVED_SETTINGS_PENDING',
    public_binding_changed: false
  });
}

console.log(JSON.stringify({
  status: 'PASS',
  packages: results,
  next_gate: 'content/source admission as required, exact Hope settings capture, then full continuous Eleven v3 narration render'
}, null, 2));
