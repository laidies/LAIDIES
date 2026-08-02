#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {spawnSync} from 'node:child_process';

const root = process.cwd();
const receiptArg = process.argv.slice(2).find((arg) => !arg.startsWith('--'));
const apply = process.argv.includes('--apply');
if (!receiptArg) {
  console.error('Usage: node scripts/record-opening-day-human-review-receipt.mjs <receipt.json> [--apply]');
  process.exit(2);
}

const queueRelative = process.env.REVIEW_QUEUE_PATH || 'operations/control-room/owner-review-queue.json';
const receiptDirRelative = process.env.REVIEW_RECEIPT_DIR || 'operations/video-qa/human-review-receipts';
const queuePath = path.resolve(root, queueRelative);
const receiptPath = path.resolve(root, receiptArg);
const receiptDir = path.resolve(root, receiptDirRelative);
const validator = path.resolve(root, 'scripts/validate-opening-day-human-review-receipt.mjs');
const sha = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const writeJsonAtomic = (file, value) => {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  const temporary = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(temporary, file);
};

const validation = spawnSync(process.execPath, [validator, receiptPath], {
  cwd: root,
  env: {...process.env, REVIEW_QUEUE_PATH: queueRelative},
  encoding: 'utf8'
});
if (validation.stdout) process.stdout.write(validation.stdout);
if (validation.status !== 0) {
  if (validation.stderr) process.stderr.write(validation.stderr);
  process.exit(validation.status || 1);
}

const raw = fs.readFileSync(receiptPath);
const receipt = JSON.parse(raw.toString('utf8'));
const receiptSha = sha(raw);
const safeTime = receipt.saved_at.replace(/[:.]/g, '-');
const destinationName = `${receipt.review_id}-${receipt.decision.toLowerCase()}-${safeTime}-${receiptSha.slice(0, 12)}.json`;
const destinationPath = path.join(receiptDir, destinationName);
const destinationRelative = path.relative(root, destinationPath);

if (!apply) {
  console.log('HUMAN REVIEW RECEIPT: VALIDATION-ONLY');
  console.log(`- would record ${destinationRelative}`);
  console.log('- rerun with --apply to record the decision and update the owner queue');
  process.exit(0);
}

const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const pools = ['review_now', 'being_built', 'completed_review'];
let source = null;
for (const pool of pools) {
  const found = (queue[pool] || []).find((item) => item.id === receipt.review_id);
  if (found && !source) source = found;
}
if (!source) throw new Error(`Cannot locate ${receipt.review_id} in ${queueRelative}`);

const prior = [...(queue.completed_review || []), ...(queue.being_built || [])]
  .find((item) => item.id === receipt.review_id && item.human_review_receipt?.sha256 === receiptSha);
if (prior) {
  console.log(`HUMAN REVIEW RECEIPT: ALREADY RECORDED ${receipt.decision}`);
  console.log(`- ${destinationRelative}`);
  process.exit(0);
}

const priorDecision = [...(queue.completed_review || []), ...(queue.being_built || [])]
  .find((item) => item.id === receipt.review_id)?.human_review_receipt;
if (priorDecision && Date.parse(priorDecision.saved_at) >= Date.parse(receipt.saved_at)) {
  throw new Error(`A newer or conflicting receipt is already recorded for ${receipt.review_id}`);
}

fs.mkdirSync(receiptDir, {recursive: true});
if (!fs.existsSync(destinationPath)) fs.writeFileSync(destinationPath, raw);

for (const pool of pools) queue[pool] = (queue[pool] || []).filter((item) => item.id !== receipt.review_id);
const receiptRecord = {
  path: destinationRelative,
  sha256: receiptSha,
  saved_at: receipt.saved_at,
  reviewer: receipt.reviewer,
  film_decision: receipt.film_decision,
  cover_decision: receipt.cover_decision,
  decision: receipt.decision
};
const item = {...source, human_review_receipt: receiptRecord};
if (receipt.decision === 'PASS') {
  item.status = 'HUMAN REVIEW PASS RECORDED — RELEASE STILL HELD';
  item.ali_action = 'Complete. No further review unless the exact master changes.';
  queue.completed_review.push(item);
} else if (receipt.decision === 'HOLD') {
  item.status = 'HUMAN HOLD RECORDED — repair queued from the timecoded receipt.';
  item.ali_action = 'No further action until a repaired successor returns.';
  queue.being_built.push(item);
} else {
  queue.review_now.push(item);
}
queue.summary.review_now = queue.review_now.length;
queue.summary.being_built = queue.being_built.length;
queue.summary.blocked_no_ali_action = (queue.blocked_no_ali_action || []).length;
queue.summary.completed_review = queue.completed_review.length;
queue.last_human_review_receipt_at = receipt.saved_at;
writeJsonAtomic(queuePath, queue);

console.log(`HUMAN REVIEW RECEIPT: RECORDED ${receipt.decision}`);
console.log(`- receipt ${destinationRelative}`);
console.log(`- receipt SHA-256 ${receiptSha}`);
console.log(`- remaining owner reviews ${queue.summary.review_now}`);
console.log('- release boundary preserved: no release, deployment, publication or public-player binding changed');
