#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const manifestPath = path.join(root, 'operations/classes/media/odc-101-teaching-media-review-animatic-v1/manifest.json');
const specPath = path.join(root, 'operations/classes/odc-101-teaching-media-script-2026-08-02.json');
const classesPath = path.join(root, 'content/site/high-classes.json');
const ffmpegLookup = spawnSync('python3', ['-c', 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'], { encoding: 'utf8' });
assert.equal(ffmpegLookup.status, 0, `could not locate bundled ffmpeg: ${ffmpegLookup.stderr}`);
const ffmpeg = ffmpegLookup.stdout.trim();
assert.ok(ffmpeg, 'bundled ffmpeg path is empty');

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const parseClock = (clock) => {
  const match = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/.exec(clock);
  assert.ok(match, `invalid VTT clock ${clock}`);
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
};

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const catalogue = JSON.parse(fs.readFileSync(classesPath, 'utf8'));
const cls = catalogue.classes.find((item) => item.slug === spec.class_slug);

assert.equal(manifest.class_id, 'ODC-101');
assert.equal(manifest.status, 'BUILT_LOCALLY_HOLD');
assert.match(manifest.release_boundary, /Not bound/i);
assert.equal(spec.status, 'REVIEW_ANIMATIC');
assert.equal(spec.voice_status, 'PROVISIONAL_SYSTEM_VOICE_NOT_RELEASE_APPROVED');
assert.equal(spec.scenes.length, 10);
assert.ok(cls, 'ODC-101 class record is missing');
assert.equal(cls.status, 'scripted');
assert.equal(cls.video, null, 'review animatic must not bind public video');
assert.equal(cls.poster, null, 'review animatic must not bind public poster');

for (const output of manifest.outputs) {
  const absolute = path.join(root, output.path);
  assert.ok(fs.existsSync(absolute), `missing output ${output.path}`);
  assert.equal(fs.statSync(absolute).size, output.bytes, `byte-size mismatch ${output.path}`);
  assert.equal(sha256(absolute), output.sha256, `hash mismatch ${output.path}`);
}

const master = path.join(root, manifest.outputs.find((item) => item.path.endsWith('.mp4')).path);
const captions = path.join(root, manifest.outputs.find((item) => item.path.endsWith('.vtt')).path);
const transcript = path.join(root, manifest.outputs.find((item) => item.path.endsWith('-transcript.md')).path);
const decode = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-i', master, '-f', 'null', '-'], { encoding: 'utf8' });
assert.equal(decode.status, 0, `master decode failed: ${decode.stderr}`);

const probe = spawnSync(ffmpeg, ['-hide_banner', '-i', master], { encoding: 'utf8' });
const probeText = `${probe.stdout}\n${probe.stderr}`;
assert.match(probeText, /Video: h264/);
assert.match(probeText, /1920x1080/);
assert.match(probeText, /Audio: aac/);
assert.match(probeText, /48000 Hz, stereo/);

const vtt = fs.readFileSync(captions, 'utf8');
const cueMatches = [...vtt.matchAll(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([^\n]+)/g)];
assert.ok(cueMatches.length >= 35, `expected useful caption granularity, found ${cueMatches.length}`);
let previous = -1;
for (const cue of cueMatches) {
  const start = parseClock(cue[1]);
  const end = parseClock(cue[2]);
  assert.ok(start >= previous, 'caption cues are not monotonic');
  assert.ok(end > start, 'caption cue has non-positive duration');
  previous = end;
}
assert.ok(Math.abs(previous - manifest.duration_seconds) < 1.5, 'captions do not cover the master clock');

const words = fs.readFileSync(transcript, 'utf8');
for (const forbidden of ['name the furniture', 'the box you type in', 'confidence gap']) {
  assert.ok(!words.toLowerCase().includes(forbidden), `retired framing leaked into transcript: ${forbidden}`);
}
for (const required of ['app', 'model', 'context', 'optional tools', 'verification']) {
  assert.ok(words.toLowerCase().includes(required), `missing required concept: ${required}`);
}

const sourceReceipt = JSON.parse(fs.readFileSync(path.join(root, 'operations/classes/media/odc-101-interface-capture-2026-08-02/source-receipt.json'), 'utf8'));
assert.equal(sourceReceipt.direct_capture.excluded_from_media, true);
for (const file of sourceReceipt.files.filter((item) => item.sha256)) {
  const absolute = path.join(root, 'operations/classes/media/odc-101-interface-capture-2026-08-02', file.path);
  assert.equal(sha256(absolute), file.sha256, `official interface source mismatch: ${file.path}`);
}

console.log(JSON.stringify({
  status: 'PASS',
  class_id: manifest.class_id,
  master_sha256: manifest.outputs.find((item) => item.path.endsWith('.mp4')).sha256,
  duration_seconds: manifest.duration_seconds,
  captions: cueMatches.length,
  public_binding_changed: false,
  release_status: manifest.status
}, null, 2));
