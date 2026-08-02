#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const manifestPath = path.join(root, 'operations/classes/media/odc-lab-01-teaching-media-review-animatic-v1/manifest.json');
const specPath = path.join(root, 'operations/classes/odc-lab-01-teaching-media-script-2026-08-02.json');
const sourceReceiptPath = path.join(root, 'operations/classes/media/odc-lab-01-source-freshness-2026-08-02.json');
const publicClassesPath = path.join(root, 'content/site/high-classes.json');
const ffmpegLookup = spawnSync('python3', ['-c', 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'], { encoding: 'utf8' });
assert.equal(ffmpegLookup.status, 0, `could not locate bundled ffmpeg: ${ffmpegLookup.stderr}`);
const ffmpeg = ffmpegLookup.stdout.trim();

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const parseClock = (clock) => {
  const match = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/.exec(clock);
  assert.ok(match, `invalid VTT clock ${clock}`);
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
};

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const sourceReceipt = JSON.parse(fs.readFileSync(sourceReceiptPath, 'utf8'));
const publicClasses = JSON.parse(fs.readFileSync(publicClassesPath, 'utf8'));

assert.equal(manifest.class_id, 'ODC-LAB-01');
assert.equal(manifest.status, 'BUILT_LOCALLY_HOLD');
assert.match(manifest.release_boundary, /Not bound/i);
assert.equal(manifest.duration_seconds, 430);
assert.equal(spec.status, 'REVIEW_ANIMATIC');
assert.equal(spec.voice_status, 'PROVISIONAL_SYSTEM_VOICE_NOT_RELEASE_APPROVED');
assert.equal(spec.scenes.length, 15);
assert.equal(spec.scenes.reduce((sum, scene) => sum + scene.duration_seconds, 0), 430);
assert.equal(sourceReceipt.status, 'PASS_FOR_REVIEW_ANIMATIC');
assert.equal(sourceReceipt.checked_on, '2026-08-02');
assert.equal(sourceReceipt.classification, 'MISLEADING_AS_STATED');
assert.equal(sha256(sourceReceiptPath), manifest.source_receipt_sha256);
const localClassRoute = publicClasses.classes.find((item) => item.slug === 'what-the-viral-reel-left-out');
assert.ok(localClassRoute, 'local ODC-LAB-01 class route is missing');
assert.equal(localClassRoute.status, 'scripted');
assert.equal(localClassRoute.video, null, 'review animatic must not be bound to the class player');
assert.equal(localClassRoute.poster, null, 'review poster must not be presented as release-approved');

for (const output of manifest.outputs) {
  const absolute = path.join(root, output.path);
  assert.ok(fs.existsSync(absolute), `missing output ${output.path}`);
  assert.equal(fs.statSync(absolute).size, output.bytes, `byte-size mismatch ${output.path}`);
  assert.equal(sha256(absolute), output.sha256, `hash mismatch ${output.path}`);
}

const contact = path.join(root, manifest.rendered_contact_sheet.path);
assert.ok(fs.existsSync(contact), 'rendered contact sheet missing');
assert.equal(fs.statSync(contact).size, manifest.rendered_contact_sheet.bytes);
assert.equal(sha256(contact), manifest.rendered_contact_sheet.sha256);

const master = path.join(root, manifest.outputs.find((item) => item.path.endsWith('.mp4')).path);
const captions = path.join(root, manifest.outputs.find((item) => item.path.endsWith('.vtt')).path);
const transcript = path.join(root, manifest.outputs.find((item) => item.path.endsWith('-transcript.md')).path);
const decode = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-i', master, '-f', 'null', '-'], { encoding: 'utf8' });
assert.equal(decode.status, 0, `master decode failed: ${decode.stderr}`);
const probe = spawnSync(ffmpeg, ['-hide_banner', '-i', master], { encoding: 'utf8' });
const probeText = `${probe.stdout}\n${probe.stderr}`;
assert.match(probeText, /Duration: 00:07:10\.0/);
assert.match(probeText, /Video: h264/);
assert.match(probeText, /1920x1080/);
assert.match(probeText, /Audio: aac/);
assert.match(probeText, /48000 Hz, stereo/);

const vtt = fs.readFileSync(captions, 'utf8');
const cueMatches = [...vtt.matchAll(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([^\n]+)/g)];
assert.ok(cueMatches.length >= 55, `expected useful caption granularity, found ${cueMatches.length}`);
let previous = -1;
for (const cue of cueMatches) {
  const start = parseClock(cue[1]);
  const end = parseClock(cue[2]);
  assert.ok(start >= previous - 0.001, 'caption cues are not monotonic');
  assert.ok(end > start, 'caption cue has non-positive duration');
  previous = end;
}
assert.ok(Math.abs(previous - manifest.duration_seconds) < 0.01, 'captions do not cover the exact master clock');

const words = fs.readFileSync(transcript, 'utf8').toLowerCase();
for (const required of [
  'the viral tip is not the workflow',
  'capability',
  'workflow',
  'prerequisites',
  'setup',
  'human-owned',
  'normal case',
  'edge case',
  'should stop',
  'build',
  'revise',
  'investigate',
  'decline',
  'monitor',
  'i remember it',
  'we recorded it',
  'this tool can access it',
  'current source'
]) {
  assert.ok(words.includes(required), `missing required teaching concept: ${required}`);
}
assert.match(words, /fictional.*no real account, private data, connected app, colleague or creator content/i, 'safe fictional-demo disclosure is missing');
assert.ok(!words.includes('autonomous department'), 'unsupported autonomous-department framing leaked into transcript');

for (const source of sourceReceipt.sources) {
  assert.match(source.url, /^https:\/\/help\.openai\.com\//);
  assert.ok(source.current_observation.length > 80, `source observation too weak: ${source.title}`);
}
assert.match(sourceReceipt.decision, /reusable-workflow capability is supported/i);
assert.match(sourceReceipt.release_boundary, /authorizes no public class binding/i);

console.log(JSON.stringify({
  status: 'PASS',
  class_id: manifest.class_id,
  master_sha256: manifest.outputs.find((item) => item.path.endsWith('.mp4')).sha256,
  duration_seconds: manifest.duration_seconds,
  captions: cueMatches.length,
  scenes: spec.scenes.length,
  source_claims_checked: sourceReceipt.sources.length,
  local_class_route_built: true,
  public_video_binding_changed: false,
  release_status: manifest.status
}, null, 2));
