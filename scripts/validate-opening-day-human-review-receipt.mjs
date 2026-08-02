#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const receiptPath = process.argv[2];
if (!receiptPath) {
  console.error('Usage: node scripts/validate-opening-day-human-review-receipt.mjs <receipt.json>');
  process.exit(2);
}

const readJson = (file) => JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8'));
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root, file))).digest('hex');
const queue = readJson('operations/control-room/owner-review-queue.json');
const packageIndex = readJson('operations/video-qa/opening-day-portable-media-v1/package-index.json');
const receipt = readJson(receiptPath);
const errors = [];

const required = [
  'schema_version', 'review_id', 'reviewer', 'title', 'queue_generated_at', 'master',
  'captions', 'audio', 'cover_artifacts', 'completed_full_title_unmuted_1x',
  'film_decision', 'cover_decision', 'decision', 'timecoded_notes', 'watch_contract',
  'saved_at', 'release_boundary'
];
for (const key of required) if (!(key in receipt)) errors.push(`missing ${key}`);

const queued = queue.review_now.find((item) => item.id === receipt.review_id);
if (!queued) errors.push(`review_id is not in the current owner queue: ${receipt.review_id}`);
const programme = receipt.review_id?.startsWith('trailer') ? 'trailer' : receipt.review_id?.match(/episode-(\d{2})/)?.[1];
const packageEntry = packageIndex.programmes.find((item) => item.programme === programme);
const portable = packageEntry ? readJson(packageEntry.manifest.path) : null;

const same = (label, actual, expected) => {
  if (actual !== expected) errors.push(`${label}: expected ${expected}, got ${actual}`);
};
const verifyFile = (label, file, expected) => {
  if (!file?.path) return errors.push(`${label}: missing path`);
  const absolute = path.resolve(root, file.path);
  if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute)) return errors.push(`${label}: missing ${file.path}`);
  const actual = sha256(file.path);
  if (actual !== file.sha256) errors.push(`${label}: receipt SHA mismatch; receipt=${file.sha256}, actual=${actual}`);
  if (expected) {
    same(`${label} path`, file.path, expected.path);
    same(`${label} SHA`, file.sha256, expected.sha256);
  }
};

if (receipt.schema_version !== 3) errors.push('schema_version must be 3');
if (!receipt.reviewer?.trim()) errors.push('reviewer is required');
if (!['PASS', 'HOLD', 'NOT REVIEWED'].includes(receipt.film_decision)) errors.push('invalid film_decision');
if (!['PASS', 'HOLD', 'NOT REVIEWED'].includes(receipt.cover_decision)) errors.push('invalid cover_decision');
if (!['PASS', 'HOLD', 'PARTIAL'].includes(receipt.decision)) errors.push('invalid decision');
if (receipt.release_boundary !== 'Human review gate only. This is not release, deployment or publication approval.') errors.push('release boundary changed');
if (queued) {
  same('title', receipt.title, queued.title);
  same('queue_generated_at', receipt.queue_generated_at, queue.generated_at);
  verifyFile('master', receipt.master, queued.master);
  verifyFile('captions', receipt.captions, queued.captions);
}
if (!(Number(receipt.master?.duration_seconds) > 0)) errors.push('master duration is missing or invalid');

const expectedAudio = portable?.assets?.find((item) => item.role === 'AUDIO_MASTER');
if (!expectedAudio) errors.push(`portable audio package missing for ${programme}`);
else {
  const audioFile = {path: receipt.audio?.sourcePath, sha256: receipt.audio?.sha256};
  verifyFile('audio', audioFile, {path: expectedAudio.sourcePath, sha256: expectedAudio.sha256});
}

const expectedCovers = portable?.artwork || [];
if (!Array.isArray(receipt.cover_artifacts) || receipt.cover_artifacts.length !== 4) errors.push('exactly four cover artifacts are required');
for (const expected of expectedCovers) {
  const actual = receipt.cover_artifacts?.find((item) => item.kind === expected.kind);
  if (!actual) errors.push(`cover missing: ${expected.kind}`);
  else verifyFile(`cover ${expected.kind}`, actual, {path: expected.sourcePath, sha256: expected.sha256});
}

if (receipt.film_decision === 'PASS' && receipt.completed_full_title_unmuted_1x !== true) errors.push('film PASS requires completed full-title unmuted 1x attestation');
if ((receipt.film_decision === 'HOLD' || receipt.cover_decision === 'HOLD') && !receipt.timecoded_notes?.trim()) errors.push('HOLD requires a specific note');
const expectedOverall = receipt.film_decision === 'HOLD' || receipt.cover_decision === 'HOLD'
  ? 'HOLD'
  : receipt.film_decision === 'PASS' && receipt.cover_decision === 'PASS' && receipt.completed_full_title_unmuted_1x === true
    ? 'PASS'
    : 'PARTIAL';
same('overall decision', receipt.decision, expectedOverall);

if (errors.length) {
  console.error('HUMAN REVIEW RECEIPT: INVALID');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`HUMAN REVIEW RECEIPT: VALID ${receipt.decision}`);
console.log(`- ${receipt.title}`);
console.log(`- exact master ${receipt.master.sha256}`);
console.log(`- film ${receipt.film_decision}; cover ${receipt.cover_decision}; full audible watch ${receipt.completed_full_title_unmuted_1x}`);
console.log('- boundary preserved: receipt validates the human review gate only; it does not release, deploy or publish');
