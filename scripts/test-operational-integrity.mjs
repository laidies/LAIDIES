#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const checker = path.join(root, 'scripts/check-operational-integrity.mjs');
const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' });
if (current.status !== 0) throw new Error(`current state must pass:\n${current.stdout}${current.stderr}`);
const unsafeClock = spawnSync(process.execPath, [checker], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, LAIDIES_WORK_RESOLUTION_NOW: '2020-01-01T00:00:00Z' }
});
if (unsafeClock.status === 0 || !`${unsafeClock.stdout}${unsafeClock.stderr}`.includes('fixture overrides require --fixture')) {
  throw new Error(`production child-check override was not rejected:\n${unsafeClock.stdout}${unsafeClock.stderr}`);
}

const queuePath = path.join(root, 'operations/control-room/owner-review-queue.json');
const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const bad = structuredClone(queue);
const objectiveFailure = bad.internal_repair_required.find(item => /^(trailer|episode-)/.test(item.id || ''));
if (!objectiveFailure) throw new Error('negative fixture requires one objective media failure');
bad.review_now = [objectiveFailure];
bad.summary.review_now = 1;
bad.internal_repair_required = bad.internal_repair_required.filter(item => item.id !== objectiveFailure.id);
bad.summary.internal_repair_required = bad.internal_repair_required.length;
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-integrity-'));
const badPath = path.join(dir, 'bad-queue.json');
fs.writeFileSync(badPath, JSON.stringify(bad));
const negative = spawnSync(process.execPath, [checker, '--fixture'], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, LAIDIES_QUEUE_PATH: badPath }
});
fs.rmSync(dir, { recursive: true, force: true });
if (negative.status === 0 || !`${negative.stdout}${negative.stderr}`.includes('cannot enter Ali review')) {
  throw new Error('negative fixture did not fail review admission');
}

const lostRuling = structuredClone(queue);
lostRuling.internal_repair_required = lostRuling.internal_repair_required.filter(item => item.id !== 'odc-101-teaching-design-rejection');
lostRuling.summary.internal_repair_required = lostRuling.internal_repair_required.length;
lostRuling.being_built = [{ title: "ODC-101 — What You're Looking At", status: 'Review animatic built.', ali_action: 'Review later.' }];
lostRuling.summary.being_built = 1;
const lostRulingPath = path.join(dir, 'lost-ruling-queue.json');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(lostRulingPath, JSON.stringify(lostRuling));
const rulingNegative = spawnSync(process.execPath, [checker, '--fixture'], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, LAIDIES_QUEUE_PATH: lostRulingPath }
});
fs.rmSync(dir, { recursive: true, force: true });
if (rulingNegative.status === 0 || !`${rulingNegative.stdout}${rulingNegative.stderr}`.includes('ODC-101 rejection is missing')) {
  throw new Error('negative fixture did not catch lost ODC-101 ruling');
}
console.log('OPERATIONAL INTEGRITY TEST PASS');
