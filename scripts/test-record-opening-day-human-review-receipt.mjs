#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root = process.cwd();
const queuePath = path.join(root, 'operations/control-room/owner-review-queue.json');
const packageIndex = JSON.parse(fs.readFileSync(path.join(root, 'operations/video-qa/opening-day-portable-media-v1/package-index.json')));
const queue = JSON.parse(fs.readFileSync(queuePath));
const queueShaBefore = crypto.createHash('sha256').update(fs.readFileSync(queuePath)).digest('hex');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-human-review-'));
const command = path.join(root, 'scripts/record-opening-day-human-review-receipt.mjs');

const packageFor = (programme) => {
  const entry = packageIndex.programmes.find((item) => item.programme === programme);
  return JSON.parse(fs.readFileSync(path.join(root, entry.manifest.path)));
};
const makeReceipt = (reviewId, decision, note = '') => {
  const item = queue.review_now.find((candidate) => candidate.id === reviewId);
  const programme = reviewId.startsWith('trailer') ? 'trailer' : reviewId.match(/episode-(\d{2})/)[1];
  const portable = packageFor(programme);
  const film = decision;
  const cover = decision;
  return {
    schema_version: 3,
    review_id: item.id,
    reviewer: 'Fixture Reviewer',
    title: item.title,
    queue_generated_at: queue.generated_at,
    master: {...item.master, duration_seconds: 100},
    captions: item.captions,
    audio: portable.assets.find((asset) => asset.role === 'AUDIO_MASTER'),
    cover_artifacts: portable.artwork.map(({kind, sourcePath, sha256}) => ({kind, path: sourcePath, sha256})),
    completed_full_title_unmuted_1x: true,
    film_decision: film,
    cover_decision: cover,
    decision,
    timecoded_notes: note,
    watch_contract: 'Complete title at 1x, unmuted and audible; time-code every release-blocking film problem. Review all four cover formats once.',
    saved_at: '2026-08-02T12:00:00.000Z',
    release_boundary: 'Human review gate only. This is not release, deployment or publication approval.'
  };
};
const run = (receipt, queueName, extra = []) => {
  const receiptPath = path.join(temporary, `${receipt.review_id}-${Math.random()}.json`);
  const testQueuePath = path.join(temporary, queueName);
  if (!fs.existsSync(testQueuePath)) fs.copyFileSync(queuePath, testQueuePath);
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  const receiptDir = path.join(temporary, `${queueName}-receipts`);
  const result = spawnSync(process.execPath, [command, receiptPath, ...extra], {
    cwd: root,
    env: {...process.env, REVIEW_QUEUE_PATH: testQueuePath, REVIEW_RECEIPT_DIR: receiptDir},
    encoding: 'utf8'
  });
  return {result, testQueuePath, receiptDir, receiptPath};
};

try {
  const pass = makeReceipt('episode-01-v27-human-watch', 'PASS');
  const applied = run(pass, 'pass-queue.json', ['--apply']);
  assert.equal(applied.result.status, 0, applied.result.stderr);
  assert.match(applied.result.stdout, /RECORDED PASS/);
  const passQueue = JSON.parse(fs.readFileSync(applied.testQueuePath));
  assert.equal(passQueue.summary.review_now, 4);
  assert.equal(passQueue.summary.completed_review, 1);
  assert.equal(passQueue.completed_review[0].id, pass.review_id);
  assert.equal(passQueue.completed_review[0].human_review_receipt.decision, 'PASS');
  assert.equal(fs.readdirSync(applied.receiptDir).length, 1);

  const idempotent = spawnSync(process.execPath, [command, applied.receiptPath, '--apply'], {
    cwd: root,
    env: {...process.env, REVIEW_QUEUE_PATH: applied.testQueuePath, REVIEW_RECEIPT_DIR: applied.receiptDir},
    encoding: 'utf8'
  });
  assert.equal(idempotent.status, 0, idempotent.stderr);
  assert.match(idempotent.stdout, /ALREADY RECORDED PASS/);
  assert.equal(fs.readdirSync(applied.receiptDir).length, 1);

  const badHold = makeReceipt('episode-02-v20-human-watch', 'HOLD', 'The picture is wrong.');
  const rejected = run(badHold, 'hold-queue.json', ['--apply']);
  assert.equal(rejected.result.status, 1);
  assert.match(rejected.result.stderr, /film HOLD requires at least one timecoded finding/);

  const goodHold = makeReceipt('episode-02-v20-human-watch', 'HOLD', '00:05:12–00:05:19 — narration and picture do not match.');
  const held = run(goodHold, 'hold-queue.json', ['--apply']);
  assert.equal(held.result.status, 0, held.result.stderr);
  const holdQueue = JSON.parse(fs.readFileSync(held.testQueuePath));
  assert.equal(holdQueue.summary.review_now, 4);
  assert.equal(holdQueue.summary.being_built, 1);
  assert.equal(holdQueue.being_built[0].id, goodHold.review_id);
  assert.match(holdQueue.being_built[0].status, /HUMAN HOLD RECORDED/);

  const queueShaAfter = crypto.createHash('sha256').update(fs.readFileSync(queuePath)).digest('hex');
  assert.equal(queueShaAfter, queueShaBefore, 'fixture test mutated the real owner queue');
  console.log('HUMAN REVIEW RECEIPT INTAKE: PASS (validation, exact recording, queue transition, idempotency and timecoded HOLD boundary)');
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
