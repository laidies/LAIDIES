#!/usr/bin/env node
/* Deterministic no-listener proof for the exact v2 caption/control rules. */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  FROZEN, initialCaptionState, stripWebVttMarkup, finalTailState,
  captionRailLabel, keyControl, mobileContainment, reducedMotionPolicy
} from './witness-v2-core.mjs';

const root = path.resolve(process.cwd());
const here = path.resolve(import.meta.dirname);
const files = {
  mp4: 'assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4',
  vtt: 'assets/captions/episode-02.vtt',
  witness: 'operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2.html'
};
const expected = {
  mp4: 'e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3',
  vtt: '7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f'
};
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for (const key of ['mp4', 'vtt']) assert.equal(hash(path.join(root, files[key])), expected[key], `${key} frozen bytes differ`);
const vtt = fs.readFileSync(path.join(root, files.vtt), 'utf8');
const witness = fs.readFileSync(path.join(root, files.witness), 'utf8');

const initial = initialCaptionState(false);
assert.deepEqual(initial, { captionsEnabled: true, trackMode: 'showing', captionLoadState: 'loading', vttRequest: FROZEN.vtt, buttonLabel: 'Captions on', ariaPressed: 'true' });
assert.ok(witness.indexOf("track.mode = initialCaptions.trackMode") < witness.indexOf("trackNode.addEventListener('load'"), 'showing must be set before load handling');
assert.ok(witness.includes("trackNode.src = initialCaptions.vttRequest"), 'first render must bind the exact VTT request');

const rawCues = [...vtt.matchAll(/\n<v[^\n]*>[^\n]+(?:\n[^\n]+)*/g)].slice(0, 5).map(([value]) => value.trim());
assert.ok(rawCues.length >= 3, 'exact VTT voice-markup fixtures missing');
const rendered = rawCues.map(stripWebVttMarkup);
for (const text of rendered) { assert.ok(text.length > 8); assert.doesNotMatch(text, /<\/?v(?:\s|>)/i); }
assert.match(rendered[0], /Previously, on LAiDIES/);

assert.equal(captionRailLabel({ ...initial, activeText: '', currentTime: 0, duration: 987.466667 }), 'Captions loading…');
assert.equal(captionRailLabel({ captionsEnabled: true, captionLoadState: 'loaded', activeText: rendered[0], currentTime: 1, duration: 987.466667 }), rendered[0]);
assert.equal(captionRailLabel({ captionsEnabled: false, captionLoadState: 'loaded', activeText: rendered[0], currentTime: 1, duration: 987.466667 }), 'Captions are off.');
assert.match(captionRailLabel({ captionsEnabled: true, captionLoadState: 'error', activeText: '', currentTime: 1, duration: 987.466667 }), /failed to load/);
assert.equal(finalTailState(987, 987.466667), 'caption-complete-audio-continues');
assert.match(captionRailLabel({ captionsEnabled: true, captionLoadState: 'loaded', activeText: '', currentTime: 987, duration: 987.466667 }), /audio continues to the end/);

assert.deepEqual(keyControl({ key: 'Space', currentTime: 12, duration: 987.466667, paused: true }), { handled: true, currentTime: 12, paused: false, action: 'toggle-play' });
assert.equal(keyControl({ key: 'ArrowRight', currentTime: 12, duration: 987.466667, paused: false }).currentTime, 17);
assert.equal(keyControl({ key: 'ArrowLeft', currentTime: 2, duration: 987.466667, paused: false }).currentTime, 0);
assert.equal(keyControl({ key: 'End', currentTime: 2, duration: 987.466667, paused: false }).currentTime, 987.466667);
const mobile = mobileContainment(320);
assert.deepEqual(mobile, { viewportWidth: 320, documentWidth: 320, mainWidth: 288, videoWidth: 288, railWidth: 288, horizontalOverflow: false });
assert.deepEqual(reducedMotionPolicy(true), { animation: 'none', transition: 'none', scrollBehavior: 'auto' });

for (const key of ['mp4', 'vtt']) assert.equal(hash(path.join(root, files[key])), expected[key], `${key} changed during no-network test`);
const result = {
  schema: 'laidies.e2-v19.player-witness-v2.no-network-test.v1',
  status: 'PASS — deterministic maker behavior proof; no actual browser/player or human full audible listen claimed',
  frozen_hashes: expected,
  checks: {
    initial_track_showing_and_exact_vtt_request: 'PASS', raw_voice_markup_removed: 'PASS',
    truthful_loading_off_error_labels: 'PASS', keyboard_play_pause_seek: 'PASS',
    caption_failure_state: 'PASS', final_tail_calculation: 'PASS', mobile_containment_contract: 'PASS',
    reduced_motion_branch: 'PASS', file_origin_browser_boundary: 'BLOCKED_BY_IN_APP_BROWSER_URL_POLICY'
  },
  boundary: 'The in-app browser rejected file:// navigation. No listener, localhost, network request, or browser workaround was used. This is pure-function/static source evidence only.'
};
fs.writeFileSync(path.join(here, 'no-network-result.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
