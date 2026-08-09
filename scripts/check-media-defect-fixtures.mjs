#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
if (!fixtureMode && process.env.LAIDIES_MEDIA_FIXTURE_PATH) {
  console.error('MEDIA DEFECT FIXTURES FAIL\n- LAIDIES_MEDIA_FIXTURE_PATH requires --fixture');
  process.exit(1);
}
const fixturePath = path.resolve(root, fixtureMode && process.env.LAIDIES_MEDIA_FIXTURE_PATH
  ? process.env.LAIDIES_MEDIA_FIXTURE_PATH
  : 'operations/evals/media-defect-fixtures.json');
const corpus = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const errors = [];
const required = new Set(['retired_wordmark','wrong_heroine','wrong_outfit','false_or_old_map','irrelevant_or_invented_characters','caption_placement','caption_casing','static_slideshow','light_box_overlay','missing_animation','impossible_object_geometry','phantom_limbs','unrelated_or_gibberish_text','period_anachronism','narration_visual_mismatch','loop_or_motion_class_error']);
const ids = new Set();

for (const fixture of corpus.fixtures || []) {
  if (ids.has(fixture.id)) errors.push(`${fixture.id}: duplicate fixture id`);
  ids.add(fixture.id);
  required.delete(fixture.category);
  if (fixture.expected_verdict !== 'REJECT' || fixture.builder_block !== true) errors.push(`${fixture.id}: known defect must fail closed as REJECT`);
  for (const field of ['stage','code','requirement']) if (!fixture.deterministic_guard?.[field]) errors.push(`${fixture.id}: deterministic_guard.${field} is required`);
  for (const field of ['question','fail_when']) if (!fixture.human_rubric?.[field]) errors.push(`${fixture.id}: human_rubric.${field} is required`);
  const sourcePath = path.join(root, fixture.source || '');
  if (!fs.existsSync(sourcePath)) { errors.push(`${fixture.id}: missing evidence source ${fixture.source}`); continue; }
  const assertion = fixture.source_assertion || {};
  if (assertion.type === 'text_contains') {
    const text = fs.readFileSync(sourcePath, 'utf8');
    for (const needle of assertion.needles || []) if (!text.includes(needle)) errors.push(`${fixture.id}: source no longer contains ${needle}`);
  } else if (assertion.type === 'retired_asset') {
    const registry = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    if (!(registry.retired_paths || []).includes(assertion.path)) errors.push(`${fixture.id}: retired path is not quarantined`);
    if ((registry.entries || []).some(entry => entry.status === 'ACTIVE' && entry.path === assertion.path)) errors.push(`${fixture.id}: retired path is also ACTIVE`);
  } else if (assertion.type === 'active_role_and_retired') {
    const registry = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    const active = (registry.entries || []).find(entry => entry.role === assertion.role && entry.status === 'ACTIVE');
    if (active?.path !== assertion.active_path) errors.push(`${fixture.id}: ${assertion.role} does not resolve to ${assertion.active_path}`);
    if (!(registry.retired_paths || []).includes(assertion.retired_path)) errors.push(`${fixture.id}: historical map is not retired`);
  } else {
    errors.push(`${fixture.id}: unsupported source_assertion.type ${assertion.type || 'MISSING'}`);
  }
}
for (const category of required) errors.push(`missing required defect category: ${category}`);
if (errors.length) {
  console.error('MEDIA DEFECT FIXTURES FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`${fixtureMode ? 'MEDIA DEFECT FIXTURES FIXTURE PASS — NOT PRODUCTION EVIDENCE' : 'MEDIA DEFECT FIXTURES PASS'} (${(corpus.fixtures || []).length} known-reject fixtures)`);
