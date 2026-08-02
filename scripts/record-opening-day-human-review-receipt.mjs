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
const mediaGateRelative = process.env.REVIEW_MEDIA_GATE_PATH || 'operations/launch/opening-day-media-gate-2026-07-31.json';
const receiptDirRelative = process.env.REVIEW_RECEIPT_DIR || 'operations/video-qa/human-review-receipts';
const queuePath = path.resolve(root, queueRelative);
const mediaGatePath = path.resolve(root, mediaGateRelative);
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
const mediaGate = JSON.parse(fs.readFileSync(mediaGatePath, 'utf8'));
const pools = ['review_now', 'being_built', 'completed_review'];
let source = null;
for (const pool of pools) {
  const found = (queue[pool] || []).find((item) => item.id === receipt.review_id);
  if (found && !source) source = found;
}
if (!source) throw new Error(`Cannot locate ${receipt.review_id} in ${queueRelative}`);

const programmeId = receipt.review_id.startsWith('trailer')
  ? 'trailer'
  : receipt.review_id.match(/episode-(\d{2})/)?.[1];
const programme = mediaGate.programmes?.find((candidate) => candidate.id === programmeId);
if (!programme) throw new Error(`Cannot locate programme ${programmeId || '<unknown>'} in ${mediaGateRelative}`);
if (programme.master?.path !== receipt.master.path || programme.master?.sha256 !== receipt.master.sha256) {
  throw new Error(`${programmeId}: launch gate master does not match the exact reviewed master`);
}
if (programme.captions?.path !== receipt.captions.path || programme.captions?.sha256 !== receipt.captions.sha256) {
  throw new Error(`${programmeId}: launch gate captions do not match the exact reviewed captions`);
}

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

programme.human_review_receipt = receiptRecord;
if (!programme.evidence.includes(destinationRelative)) programme.evidence.push(destinationRelative);
if (receipt.film_decision === 'PASS') {
  programme.gates.human_full_audible_watch = 'PASS';
  programme.status = 'HUMAN WATCH PASS — OTHER RELEASE GATES HOLD';
  programme.known_issues = (programme.known_issues || []).filter((issue) =>
    !/human sound-on 1x watch|full audible watch|complete human.*watch/i.test(issue)
  );
  programme.next_action = 'Resolve the remaining independently owned release gates shown in this record; do not repeat the exact human sound-on watch unless the master changes.';
} else if (receipt.film_decision === 'HOLD') {
  programme.gates.human_full_audible_watch = 'HOLD';
  programme.status = 'HUMAN REVIEW HOLD — REBUILD REQUIRED';
  const issue = `Human review receipt ${receiptSha.slice(0, 12)}: ${receipt.timecoded_notes.trim()}`;
  if (!programme.known_issues.includes(issue)) programme.known_issues.push(issue);
  programme.next_action = `Repair only the timecoded film findings in ${destinationRelative}, build a checksum-distinct successor, and return that successor to human review.`;
}
programme.release_ready = mediaGate.required_gates.every((gate) => programme.gates[gate] === 'PASS');
mediaGate.last_human_review_receipt_at = receipt.saved_at;

writeJsonAtomic(queuePath, queue);
writeJsonAtomic(mediaGatePath, mediaGate);

console.log(`HUMAN REVIEW RECEIPT: RECORDED ${receipt.decision}`);
console.log(`- receipt ${destinationRelative}`);
console.log(`- receipt SHA-256 ${receiptSha}`);
console.log(`- remaining owner reviews ${queue.summary.review_now}`);
console.log(`- launch gate human watch ${programme.gates.human_full_audible_watch}; release-ready ${programme.release_ready}`);
console.log('- release boundary preserved: no release, deployment, publication or public-player binding changed');
