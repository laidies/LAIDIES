#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(root, 'operations/video-qa/site-video-review-registry-2026-07-31.json');
const gatePath = path.join(root, 'operations/launch/opening-day-media-gate-2026-07-31.json');
const bindingPath = path.join(root, 'operations/video-qa/opening-day-playback-binding-v1/manifest.json');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const gate = JSON.parse(fs.readFileSync(gatePath, 'utf8'));
const binding = JSON.parse(fs.readFileSync(bindingPath, 'utf8'));

const evidenceNotes = {
  trailer: {
    basis: 'The exact v8 successor preserves the approved ident, earlier narration-picture and motion repairs, the repaired home-to-town sequence, and replaces all seven disputed outfit occurrences with the selected multicolour Trailer treatment. Full decode and the frozen audio payload pass. Continuous human sound-on judgment remains pending.',
    evidence: 'operations/video-qa/trailer-v8-multicolour-review/manifest.json'
  },
  '01': {
    basis: 'The exact v27 successor contains the consolidated 71-occurrence repair, complete captions and a full decode pass. The repaired visual sequence cleared the available frame, sequence and textual checks. Continuous human sound-on judgment remains pending.',
    evidence: 'operations/video-qa/episode-01-full-v27-occurrence-repaired-review/manifest.json'
  },
  '02': {
    basis: 'The exact v20 successor contains all 61 narration-picture and motion repairs, preserves the frozen audio payload and captions, and passed full decode plus independent visual review. Continuous human sound-on judgment remains pending.',
    evidence: 'operations/video-qa/episode-02-v20-occurrence-repaired-review/manifest.json'
  },
  '03': {
    basis: 'The exact v15 successor clears all 13 repaired sequences covering the 21 prior occurrence holds, full decode, caption and audio-payload continuity, and the strongest available full-title visual/textual review. Continuous human sound-on judgment remains pending.',
    evidence: 'operations/product-stewards/episode-media-quality/evidence-2026-08-01/episode-03-v15-independent-full-title-review-receipt-2026-08-01.json'
  },
  '04': {
    basis: 'The exact v10 successor clears the repaired sequences, full decode, caption and audio-payload continuity, dense full-title visual inspection and the strongest available narration-picture review. No confirmed media defect remains. Continuous human sound-on judgment remains pending.',
    evidence: 'operations/product-stewards/episode-media-quality/evidence-2026-08-01/episode-04-v10-independent-full-title-review-receipt-2026-08-01.json'
  }
};

function cueCount(relativePath) {
  return (fs.readFileSync(path.join(root, relativePath), 'utf8').match(/-->/g) || []).length;
}

for (const programme of registry.programmes) {
  const current = binding.programmes[programme.id];
  if (!current) throw new Error(`Binding manifest is missing programme ${programme.id}`);
  const note = evidenceNotes[programme.id];
  programme.master_path = current.film.path;
  programme.master_sha256 = current.film.sha256;
  programme.caption_path = current.captions.path;
  programme.caption_sha256 = current.captions.sha256;
  for (const field of ['relevance_review', 'continuity_and_occlusion_review', 'motion_semantics_review']) {
    programme[field] = {
      reviewed_occurrences: programme.expected_occurrences,
      status: 'HOLD',
      basis: note.basis
    };
  }
  programme.open_findings = [
    `Current exact-candidate evidence: ${note.evidence}`,
    'No machine- or visual-review defect currently requests another render.',
    'A qualified human must watch and hear this exact hash continuously at 1x and return PASS or a timecoded HOLD.',
    'The exact cover family still requires one visual acceptance before release identity can be sealed.',
    'Public film binding, release, deploy and publication remain unauthorized and fail-closed.'
  ];
}
registry.updated = '2026-08-02';
registry.status = 'HOLD';

for (const programme of gate.programmes) {
  const current = binding.programmes[programme.id];
  if (!current) throw new Error(`Binding manifest is missing programme ${programme.id}`);
  const note = evidenceNotes[programme.id];
  programme.status = 'OWNER WATCH REQUIRED';
  programme.release_ready = false;
  programme.master = {
    path: current.film.path,
    sha256: current.film.sha256,
    role: 'current exact opening-day review candidate; built locally and not accepted'
  };
  programme.captions = {
    path: current.captions.path,
    sha256: current.captions.sha256,
    cue_count: cueCount(current.captions.path),
    coverage: 'complete for current exact candidate'
  };
  delete programme.decision_required;
  programme.gates = {
    exact_master: 'PASS',
    decode_and_clock: 'PASS',
    captions: 'PASS',
    content_accuracy: 'PASS',
    narration_picture_timing: 'HOLD',
    visual_identity_and_continuity: 'HOLD',
    motion_and_animation: 'HOLD',
    occurrence_narration_or_purpose_relevance: 'HOLD',
    occurrence_motion_continuity_and_occlusion: 'HOLD',
    recurring_opening_and_closing_credits: 'HOLD',
    human_full_audible_watch: 'HOLD',
    website_player: 'PASS',
    responsive_and_accessible_playback: 'PASS',
    public_exact_identity: 'FAIL',
    discovery_and_correction_propagation: 'HOLD'
  };
  programme.known_issues = [
    'No confirmed defect remains in the strongest available machine, frame, sequence and textual review of this exact candidate.',
    'The complete human sound-on 1x watch has not yet been performed.',
    'The opening-day cover family is built locally but has not received final visual acceptance.',
    'The exact candidate is intentionally not bound to the public Screening Room.'
  ];
  programme.next_action = 'Watch and hear this exact checksum-bound candidate continuously at normal speed; return PASS or a timecoded HOLD. If it passes, accept its cover family, seal the release package, and only then authorize public-host binding and verification.';
  programme.evidence = [note.evidence, 'operations/video-qa/opening-day-playback-binding-v1/manifest.json'];
}
gate.updated = '2026-08-02';
gate.status = 'HOLD';

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
fs.writeFileSync(gatePath, `${JSON.stringify(gate, null, 2)}\n`);
console.log('Reconciled opening-day media registry and launch gate to current exact candidates.');
