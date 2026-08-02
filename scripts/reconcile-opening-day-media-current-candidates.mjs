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
    basis: 'Ali began the human sound-on review of the exact v8 hash and confirmed release-blocking visual defects immediately: the opening heroine is off-model, her wardrobe is wrong, and the street is not the approved SUNNYVAiLE; the title plays predominantly as static slides rather than meaningful narration-synchronised animation; Hedy and other MAiVENS are incorrectly presented as town characters; caption capitalization is not preserving approved spelled terms. The exact wardrobe candidate batch used by v8 was explicitly LOCAL CANDIDATE / UNADMITTED and required a decision before binding.',
    evidence: 'operations/video-qa/trailer-v8-human-preview-hold-2026-08-02/receipt.json',
    confirmedDefect: true
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
  const note = evidenceNotes[programme.id];
  // The universal registry also contains class and other site-video
  // programmes. This reconciler owns only the five opening-day films.
  if (!note) continue;
  const current = binding.programmes[programme.id];
  if (!current) throw new Error(`Binding manifest is missing programme ${programme.id}`);
  programme.master_path = current.film.path;
  programme.master_sha256 = current.film.sha256;
  programme.caption_path = current.captions.path;
  programme.caption_sha256 = current.captions.sha256;
  for (const field of ['relevance_review', 'continuity_and_occlusion_review', 'motion_semantics_review']) {
    programme[field] = {
      reviewed_occurrences: programme.expected_occurrences,
      status: note.confirmedDefect ? 'FAIL' : 'HOLD',
      basis: note.basis
    };
  }
  programme.open_findings = note.confirmedDefect ? [
    `Human preview HOLD evidence: ${note.evidence}`,
    '00:00–00:06: opening heroine identity, wardrobe, rendering style and location fail the approved references; the scene is not approved SUNNYVAiLE.',
    'Trailer-wide: the picture behaves predominantly as a slideshow; camera moves or zooms do not satisfy meaningful animation synchronized to narration.',
    '04:55: the woman is not the approved heroine and the surrounding men/people are invented, unidentified characters with no established canon role.',
    '05:48: heroine wardrobe continuity fails; an episode-specific outfit replaces the locked Trailer look.',
    '06:03: a retired SUNNYVAiLE map is used instead of the current approved town geography/map.',
    '06:19: an invented human tour guide is placed over another obsolete/noncanonical town map.',
    '07:25: JoJo appears at Blend & Snap without any character introduction or explanation of her role.',
    'Trailer-wide: the story never explains the heroine’s corporate-to-Rewind-Era transformation and never names or explains the Rewind Era.',
    '09:33–09:35: the transformation flashes the Episode 4 yellow-plaid outfit before switching to the intended Trailer outfit.',
    '14:10: the film uses an old, retired LAiDIES wordmark instead of the current approved animated identity; retain the approved electric burst background, not the retired mark.',
    '14:48–15:03 / B57: the card, spoken announcement and captions use the retired Episode 1 title “On Wednesdays We Use AI” instead of the current “On Wednesdays We Do AI.”',
    '15:03–16:07 / B58: the town anthem begins with no identifying handoff, uses a disconnected recycled-image montage, carries a rejected ornate postcard frame and ends abruptly without a resolved final beat.',
    'Approx. 13:36–14:05 / LUMINAiRY sequence: Hedy and the other MAiVENS must not be presented as SUNNYVAiLE town characters.',
    'Trailer-wide captions: preserve exact approved capitalization when names and terms are spelled aloud.',
    'Ali completed the full 16:07 review; build one consolidated successor addressing the complete checksum-bound defect list.',
    'Public film binding, release, deploy and publication remain unauthorized and fail-closed.'
  ] : [
    `Current exact-candidate evidence: ${note.evidence}`,
    'No machine- or visual-review defect currently requests another render.',
    'A qualified human must watch and hear this exact hash continuously at 1x and return PASS or a timecoded HOLD.',
    'The exact cover family still requires one visual acceptance before release identity can be sealed.',
    'Public film binding, release, deploy and publication remain unauthorized and fail-closed.'
  ];
  // These successors have no confirmed machine/visual defect, but they cannot
  // be admitted until the complete human sound-on review and cover acceptance
  // are recorded.  Preserve that distinction as HOLD; carrying forward the
  // superseded candidates' FAIL value sends cleared films back into repair.
  programme.admission_status = note.confirmedDefect ? 'FAIL' : 'HOLD';
}
registry.updated = '2026-08-02';
registry.status = 'HOLD';

for (const programme of gate.programmes) {
  const current = binding.programmes[programme.id];
  if (!current) throw new Error(`Binding manifest is missing programme ${programme.id}`);
  const note = evidenceNotes[programme.id];
  programme.status = note.confirmedDefect ? 'HUMAN PREVIEW HOLD — REBUILD REQUIRED' : 'OWNER WATCH REQUIRED';
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
    content_accuracy: note.confirmedDefect ? 'FAIL' : 'PASS',
    narration_picture_timing: note.confirmedDefect ? 'FAIL' : 'HOLD',
    visual_identity_and_continuity: note.confirmedDefect ? 'FAIL' : 'HOLD',
    motion_and_animation: note.confirmedDefect ? 'FAIL' : 'HOLD',
    occurrence_narration_or_purpose_relevance: note.confirmedDefect ? 'FAIL' : 'HOLD',
    occurrence_motion_continuity_and_occlusion: note.confirmedDefect ? 'FAIL' : 'HOLD',
    recurring_opening_and_closing_credits: 'HOLD',
    human_full_audible_watch: 'HOLD',
    website_player: 'PASS',
    responsive_and_accessible_playback: 'PASS',
    public_exact_identity: 'FAIL',
    discovery_and_correction_propagation: 'HOLD'
  };
  programme.known_issues = note.confirmedDefect ? [
    'Ali’s human preview has confirmed release-blocking visual, animation, canon and caption defects in the exact v8 candidate.',
    'The opening image uses an off-model heroine, wrong wardrobe/rendering and a non-approved town scene.',
    'The film is predominantly a slideshow rather than meaningful scene animation synchronized to narration.',
    'At 04:55 the candidate substitutes an off-model woman and invented crowd for the approved heroine and established town-character canon.',
    'At 05:48 the heroine changes into an episode-specific outfit, breaking Trailer wardrobe continuity.',
    'At 06:03 the candidate uses a retired town map rather than the current approved SUNNYVAiLE geography.',
    'At 06:19 the candidate invents a tour-guide character and reuses noncanonical geography instead of showing the approved tour system.',
    'At 07:25 JoJo is correctly located at Blend & Snap but is not introduced, so viewers cannot understand who she is or why she appears.',
    'The trailer does not name the Rewind Era or explain the heroine’s intentional corporate-to-SUNNYVAiLE outfit transformation.',
    'At 09:33–09:35 the glow-up sequence exposes an Episode 4 outfit before the Trailer outfit, so the reveal itself breaks wardrobe continuity.',
    'At 14:10 the film displays a retired LAiDIES wordmark that is prohibited from reuse; the electric burst background itself is approved to retain.',
    'At 14:48–15:03 / B57 the visible card, spoken announcement and captions use the retired Episode 1 title “On Wednesdays We Use AI”; current canon is “On Wednesdays We Do AI.”',
    'At 15:03–16:07 / B58 the town anthem arrives without a handoff, the montage recycles disconnected trailer images, the ornate postcard frame is rejected and the ending cuts off abruptly.',
    'The LUMINAiRY treatment incorrectly turns Hedy and other MAiVENS into town characters.',
    'Caption capitalization does not consistently preserve approved spelled terms.',
    'The exact candidate is intentionally not bound to the public Screening Room.'
  ] : [
    'No confirmed defect remains in the strongest available machine, frame, sequence and textual review of this exact candidate.',
    'The complete human sound-on 1x watch has not yet been performed.',
    'The opening-day cover family is built locally but has not received final visual acceptance.',
    'The exact candidate is intentionally not bound to the public Screening Room.'
  ];
  programme.next_action = note.confirmedDefect
    ? 'Ali completed the full-title review. Repair every confirmed checksum-bound finding in one successor. Require admitted source assets plus independent identity, location, canon, current-brand/title, caption, meaningful-motion and resolved-outro verification before the successor can return to owner review.'
    : 'Watch and hear this exact checksum-bound candidate continuously at normal speed; return PASS or a timecoded HOLD. If it passes, accept its cover family, seal the release package, and only then authorize public-host binding and verification.';
  programme.evidence = [note.evidence, 'operations/video-qa/opening-day-playback-binding-v1/manifest.json'];
}
gate.updated = '2026-08-02';
gate.status = 'HOLD';

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
fs.writeFileSync(gatePath, `${JSON.stringify(gate, null, 2)}\n`);
console.log('Reconciled opening-day media registry and launch gate to current exact candidates.');
