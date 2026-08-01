#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateTownEntryManifest } from './check-town-entry-transformation-cue.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(
  root,
  'operations/video-qa/town-entry-transformation-cue-v1/episode-transformation-bindings.json'
);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const baseline = validateTownEntryManifest(manifest, root);
if (!baseline.valid) {
  console.error('TOWN-ENTRY CUE REGRESSION: BASELINE INVALID');
  for (const error of baseline.errors) console.error(`- ${error.code}: ${error.message}`);
  process.exit(1);
}

const misleading = structuredClone(manifest);
const episode04 = misleading.bindings.find((item) => item.content_id === 'episode-04');
episode04.status = 'REVIEW_READY';
episode04.cue_attached = true;
episode04.cue_master_path = misleading.cue_master.path;
episode04.cue_end_seconds = misleading.cue_master.cue_end_seconds;
episode04.clears_before_final_reveal = true;
episode04.review_candidate = misleading.bindings.find((item) => item.content_id === 'episode-03').review_candidate;
episode04.contact_sheet = misleading.bindings.find((item) => item.content_id === 'episode-03').contact_sheet;

const result = validateTownEntryManifest(misleading, root);
if (result.valid || !result.errors.some((error) => error.code === 'MISLEADING_SOURCE')) {
  console.error('TOWN-ENTRY CUE REGRESSION: FAIL');
  console.error('Attaching the cue to the rejected Episode 04 transformation did not fail MISLEADING_SOURCE.');
  process.exit(1);
}

console.log('TOWN-ENTRY CUE REGRESSION: PASS');
console.log('- rejected Episode 04 transformation fails even when the shared cue is attached');
