#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const packageRoot = path.join(root, 'operations/classes/media/odc-101-final-narration-production-2026-08-02');
const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, 'manifest.json'), 'utf8'));
const spec = JSON.parse(fs.readFileSync(path.join(root, 'operations/classes/odc-101-teaching-media-script-2026-08-02.json'), 'utf8'));
const catalogue = JSON.parse(fs.readFileSync(path.join(root, 'content/site/high-classes.json'), 'utf8'));
const currentAnimatic = JSON.parse(fs.readFileSync(path.join(root, 'operations/classes/media/odc-101-teaching-media-review-animatic-v1/manifest.json'), 'utf8'));
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

assert.equal(manifest.class_id, 'ODC-101');
assert.equal(manifest.status, 'TEACHING_DESIGN_CANDIDATE_NARRATION_REJECTED_HOLD');
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
assert.equal(sha256(path.join(root, manifest.instructional_design_standard.path)), manifest.instructional_design_standard.sha256, 'instructional design standard drifted');
assert.equal(manifest.teaching_design.status, 'CANDIDATE_PENDING_INDEPENDENT_INSTRUCTIONAL_REVIEW');
assert.equal(manifest.teaching_design.class_structure, 'MULTI_LESSON');
assert.equal(sha256(path.join(root, manifest.teaching_design.path)), manifest.teaching_design.sha256, 'teaching design drifted');
assert.match(manifest.release_boundary, /No audio, captions, picture, class catalogue or public player is admitted/);

for (const item of [...manifest.inputs, ...manifest.workbench]) {
  const absolute = path.join(root, item.path);
  assert.ok(fs.existsSync(absolute), `missing bound file: ${item.path}`);
  assert.equal(sha256(absolute), item.sha256, `checksum mismatch: ${item.path}`);
}

const narrationWords = spec.scenes
  .flatMap((scene) => scene.narration.trim().split(/\s+/))
  .filter(Boolean).length;
assert.equal(narrationWords, manifest.narration_word_count, 'narration word count drifted');
assert.equal(spec.voice_status, 'PROVISIONAL_SYSTEM_VOICE_NOT_RELEASE_APPROVED');
assert.ok(currentAnimatic.known_limits.some((item) => /word counts/.test(item) && /not release-caption evidence/.test(item)), 'provisional caption boundary missing');

const cls = catalogue.classes.find((item) => item.slug === spec.class_slug);
assert.ok(cls, 'ODC-101 catalogue record missing');
assert.equal(cls.video, null, 'final narration package must not bind a public video');
assert.equal(cls.poster, null, 'final narration package must not bind a public poster');

const recordingScript = fs.readFileSync(path.join(packageRoot, 'recording-script.md'), 'utf8');
const normalizedRecordingScript = recordingScript.replace(/\s+/g, ' ');
for (const required of ['Hope — upbeat and clear', 'Eleven v3', 'one continuous chapter', 'Fluency is a presentation quality, not a receipt.', 'A citation gives you somewhere to look.', 'That is what you are looking at.']) {
  assert.ok(recordingScript.includes(required), `recording workbench missing: ${required}`);
}
for (const required of ['smartest best friend', 'real screenshots or screen recordings', 'replaceable current-path']) {
  assert.ok(normalizedRecordingScript.includes(required), `instructional production contract missing: ${required}`);
}
assert.match(recordingScript, /REJECTED AS INSTRUCTIONALLY INCOMPLETE \/ DO NOT RECORD/);
const teachingDesign = fs.readFileSync(path.join(root, manifest.teaching_design.path), 'utf8');
for (const required of ['Why a learner would take this class', 'Questions the teaching must answer', 'Observable end-of-class abilities', 'Lesson 1', 'Lesson 6', 'Mechanism / why', 'Controlled comparison', 'Guided Try-On', 'Diagnose and repair', 'Transfer between products']) {
  assert.ok(teachingDesign.includes(required), `teaching design missing: ${required}`);
}
assert.ok(manifest.release_requirements.some((item) => /Approved class teaching design/.test(item)), 'teaching-design release gate missing');
const visualPlan = fs.readFileSync(path.join(packageRoot, 'visual-evidence-plan.md'), 'utf8');
for (const required of ['screen recording', 'screenshot', 'volatile current-path insert', 'non-personal fixture', 'freshness response']) {
  assert.ok(visualPlan.toLowerCase().includes(required), `visual evidence plan missing: ${required}`);
}
assert.ok(manifest.release_requirements.some((item) => /instructional visual-job gate/.test(item)), 'visual-job release gate missing');
assert.ok(manifest.release_requirements.some((item) => /real screenshots or screen recordings/.test(item)), 'real-interface evidence gate missing');
assert.ok(manifest.release_requirements.some((item) => /replaceable current-path inserts/.test(item)), 'replaceable UI insert gate missing');
for (const retired of ['name the furniture', 'the box you type in', 'confidence gap']) {
  assert.ok(!recordingScript.toLowerCase().includes(retired), `retired framing leaked into workbench: ${retired}`);
}

const auditionScript = fs.readFileSync(path.join(packageRoot, 'voice-audition-script.md'), 'utf8');
for (const required of ['one continuous block in one Studio pass', '[warm, conversational—not salesy]', '[light emphasis;', 'Fluency is a presentation quality, not a receipt.', 'Exact provider voice ID: `tnSpp4vdxKPjI9w0GnoV`', 'Model: `Eleven v3` (`eleven_v3`)', 'selected as a much better course-voice direction']) {
  assert.ok(auditionScript.includes(required), `voice audition contract missing: ${required}`);
}
assert.match(auditionScript, /NOT RELEASE AUDIO/);

console.log(JSON.stringify({
  status: 'PASS',
  class_id: manifest.class_id,
  package_status: manifest.status,
  narration_words: narrationWords,
  public_binding_changed: false,
  next_gate: 'independent instructional review of the multi-lesson design, then successor lesson narration'
}, null, 2));
