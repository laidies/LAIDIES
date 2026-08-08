#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const candidateArg = process.argv.slice(2).find(value => value !== '--fixture');
const queuePath = fixtureMode && process.env.LAIDIES_QUEUE_PATH
  ? process.env.LAIDIES_QUEUE_PATH
  : path.join(root, 'operations/control-room/owner-review-queue.json');
const checker = path.join(root, 'scripts/check-design-review-admission.mjs');
const fail = message => {
  console.error(`DESIGN PRESENTATION BLOCKED — ${message}`);
  process.exit(1);
};

if (!candidateArg) fail('provide the exact candidate path');
const candidatePath = path.resolve(root, candidateArg);
if (!candidatePath.startsWith(`${root}${path.sep}`) || !fs.existsSync(candidatePath) || !fs.statSync(candidatePath).isFile()) {
  fail('candidate is missing or outside the repository');
}

const checkArgs = [checker, ...(fixtureMode ? ['--fixture'] : [])];
const checked = spawnSync(process.execPath, checkArgs, {
  cwd: root,
  encoding: 'utf8',
  env: process.env
});
if (checked.status !== 0) fail('full design-review admission is not passing');

const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const relative = path.relative(root, candidatePath);
const digest = crypto.createHash('sha256').update(fs.readFileSync(candidatePath)).digest('hex');
const admitted = (queue.review_now || []).find(item =>
  ['building_page_visual', 'building_page_visual_concept'].includes(item.review_type) &&
  item.design_admission?.candidate?.path === relative &&
  item.design_admission?.candidate?.sha256 === digest &&
  (item.review_artifacts || []).some(binding => binding.path === relative && binding.sha256 === digest)
);
if (!admitted) fail('exact candidate path and SHA-256 are not admitted in review_now');

console.log(`DESIGN PRESENTATION ADMITTED ${admitted.id}`);
console.log(pathToFileURL(candidatePath).href);
