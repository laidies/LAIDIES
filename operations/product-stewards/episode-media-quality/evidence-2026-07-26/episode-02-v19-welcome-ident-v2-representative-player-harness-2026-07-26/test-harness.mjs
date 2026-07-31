#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { BINDING, keyAction, parseVtt, railText, reducedMotionPolicy, stripVttMarkup, tailState } from './harness-core.mjs';

const root = path.resolve(process.cwd());
const here = import.meta.dirname;
const files = {
  media: path.join(root, BINDING.mediaPath),
  vtt: path.join(root, BINDING.vttPath),
  binding: path.join(here, 'binding.json'),
  html: path.join(here, 'index.html'),
  css: path.join(here, 'player.css'),
  player: path.join(here, 'player.js')
};
const sha = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const results = [];
const test = (name, fn) => {
  try { fn(); results.push({ name, result: 'PASS' }); }
  catch (error) { results.push({ name, result: 'FAIL', error: error.message }); }
};

test('exact MP4 bytes', () => assert.equal(sha(files.media), BINDING.mediaSha256));
test('exact VTT bytes', () => assert.equal(sha(files.vtt), BINDING.vttSha256));
test('exact media byte size', () => assert.equal(fs.statSync(files.media).size, BINDING.mediaBytes));
const vtt = fs.readFileSync(files.vtt, 'utf8');
const cues = parseVtt(vtt);
test('194 ordered caption cues', () => {
  assert.equal(cues.length, BINDING.cueCount);
  cues.forEach((cue, index) => { assert.ok(cue.end > cue.start); if (index) assert.ok(cue.start >= cues[index - 1].end); });
});
test('caption endpoint 986.670', () => assert.equal(cues.at(-1).end, BINDING.captionEnd));
test('voice markup sanitizer', () => {
  const fixture = [...vtt.matchAll(/<v[^\n>]*>([^\n]+)/g)].slice(0, 10).map((match) => match[0]);
  assert.ok(fixture.length >= 5);
  fixture.map(stripVttMarkup).forEach((text) => { assert.ok(text.length > 4); assert.doesNotMatch(text, /<\/?v/i); });
});
test('keyboard contract', () => {
  assert.equal(keyAction({ key: 'Space', currentTime: 10, duration: BINDING.videoSeconds, paused: true }).action, 'toggle-play');
  assert.equal(keyAction({ key: 'ArrowRight', currentTime: 10, duration: BINDING.videoSeconds, paused: true }).currentTime, 20);
  assert.equal(keyAction({ key: 'ArrowLeft', currentTime: 5, duration: BINDING.videoSeconds, paused: true }).currentTime, 0);
  assert.equal(keyAction({ key: 'End', currentTime: 5, duration: BINDING.videoSeconds, paused: true }).currentTime, BINDING.videoSeconds);
  assert.equal(keyAction({ key: 'C', currentTime: 5, duration: BINDING.videoSeconds, paused: true }).action, 'toggle-captions');
});
test('caption state and final tail', () => {
  assert.equal(railText({ enabled: false, state: 'loaded', activeText: '', currentTime: 0, duration: BINDING.videoSeconds }), 'Captions are off.');
  assert.match(railText({ enabled: true, state: 'error', activeText: '', currentTime: 0, duration: BINDING.videoSeconds }), /failed to load/);
  assert.equal(tailState(987, BINDING.videoSeconds), 'captions-complete-audio-continues');
});
test('reduced motion contract', () => assert.deepEqual(reducedMotionPolicy(true), { animation: 'none', transition: 'none', scrollBehavior: 'auto' }));
const html = fs.readFileSync(files.html, 'utf8');
const css = fs.readFileSync(files.css, 'utf8');
const player = fs.readFileSync(files.player, 'utf8');
test('no-JS fail-safe boundary', () => { assert.match(html, /<noscript>/); assert.match(html, /playback remains safely unbound/i); });
test('runtime exact source and retry binding', () => {
  assert.match(player, /source\.src = useFailure \? BINDING\.missingMedia : BINDING\.mediaPath/);
  assert.match(player, /source\.addEventListener\('error', showMediaError/);
  assert.match(player, /retryCount \+= 1/);
  assert.match(player, /film\.playbackRate = 1/);
  assert.match(player, /film\.muted = false/);
});
test('external captions and custom rail', () => {
  assert.match(player, /trackNode\.src = failCaptions \? BINDING\.missingVtt : BINDING\.vttPath/);
  assert.match(player, /track\.mode = 'hidden'/);
  assert.match(html, /id="caption-rail"/);
});
test('responsive focus and reduced-motion CSS', () => {
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 520px/);
});

const failures = results.filter((item) => item.result === 'FAIL');
const output = {
  schema: 'laidies.episode-02.v2.representative-player.deterministic-results.v1',
  status: failures.length ? 'FAIL' : 'PASS',
  pass_count: results.length - failures.length,
  fail_count: failures.length,
  frozen: {
    media: { path: BINDING.mediaPath, sha256: sha(files.media), bytes: fs.statSync(files.media).size },
    captions: { path: BINDING.vttPath, sha256: sha(files.vtt), cue_count: cues.length, last_end_seconds: cues.at(-1)?.end }
  },
  checks: results,
  boundary: 'Deterministic maker checks do not establish actual browser decode, audible playback, or independent acceptance.'
};
fs.writeFileSync(path.join(here, 'test-results.json'), JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exitCode = 1;
