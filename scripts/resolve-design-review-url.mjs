#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { homepageCorrectionId, homepageCorrectionPacket } from './lib/homepage-correction-admission.mjs';

const root = process.cwd();
const fixtureMode = process.argv.includes('--fixture');
const candidateArg = process.argv.slice(2).find(value => value !== '--fixture');
const queuePath = fixtureMode && process.env.LAIDIES_QUEUE_PATH
  ? process.env.LAIDIES_QUEUE_PATH
  : path.join(root, 'operations/control-room/owner-review-queue.json');
const checker = path.join(root, 'scripts/check-design-review-admission.mjs');
const programManifestPath = path.join(root, 'operations/design-programs/homepage-library-visitors-20260822.json');
const programChecker = path.join(root, 'scripts/check-three-page-design-program.mjs');
const fail = message => {
  console.error(`DESIGN PRESENTATION BLOCKED — ${message}`);
  process.exit(1);
};

if (!candidateArg) fail('provide the exact candidate path');
const candidatePath = path.resolve(root, candidateArg);
if (!candidatePath.startsWith(`${root}${path.sep}`) || !fs.existsSync(candidatePath) || !fs.statSync(candidatePath).isFile()) {
  fail('candidate is missing or outside the repository');
}

if (!fixtureMode && fs.existsSync(programManifestPath)) {
  const program = JSON.parse(fs.readFileSync(programManifestPath, 'utf8'));
  const relative = path.relative(root, candidatePath);
  const digest = crypto.createHash('sha256').update(fs.readFileSync(candidatePath)).digest('hex');
  const direction = Object.values(program.pages || {}).flatMap(page => page.candidates || []).find(item =>
    item.status === 'ADMITTED_FOR_ALI_REVIEW' &&
    item.entry_path === relative &&
    item.admission?.candidate_sha256 === digest
  );
  if (direction) {
    const checked = spawnSync(process.execPath, [programChecker, programManifestPath], { cwd: root, encoding: 'utf8', env: process.env });
    if (checked.status !== 0) fail('three-page direction admission is not passing');
    console.log(`DESIGN PRESENTATION ADMITTED ${direction.id}`);
    console.log(pathToFileURL(candidatePath).href);
    process.exit(0);
  }
}

const relative = path.relative(root, candidatePath);
const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
const exception = (queue.review_now || []).find(item => item.design_admission?.candidate?.path === relative && item.design_admission?.owner_exception === homepageCorrectionId);
const checkArgs = [checker, ...(fixtureMode ? ['--fixture'] : []), ...(exception ? ['--candidate', relative] : [])];
const checked = spawnSync(process.execPath, checkArgs, {
  cwd: root,
  encoding: 'utf8',
  env: process.env
});
if (checked.status !== 0) fail('full design-review admission is not passing');

const digest = crypto.createHash('sha256').update(fs.readFileSync(candidatePath)).digest('hex');
const admitted = (queue.review_now || []).find(item =>
  ['building_page_visual', 'building_page_visual_concept'].includes(item.review_type) &&
  item.design_admission?.candidate?.path === relative &&
  item.design_admission?.candidate?.sha256 === digest &&
  (item.review_artifacts || []).some(binding => binding.path === relative && binding.sha256 === digest)
);
if (!admitted) fail('exact candidate path and SHA-256 are not admitted in review_now');

if (exception) {
  const hostedPath = path.join(root, homepageCorrectionPacket, 'hosted-preview.json');
  if (!fs.existsSync(hostedPath)) fail('exact hosted preview verification is missing');
  const hosted = JSON.parse(fs.readFileSync(hostedPath, 'utf8'));
  if (hosted.status !== 'VERIFIED_PREVIEW' || hosted.sourceSha256 !== digest ||
      hosted.runtimeSha256 !== exception.design_admission.runtime.sha256 ||
      !/^https:\/\/[a-f0-9]{8}\.laidies-sunnyvaile\.pages\.dev\/$/.test(hosted.url) ||
      hosted.productionChanged !== false) fail('exact hosted preview verification is missing');
  console.log(`DESIGN PRESENTATION ADMITTED ${admitted.id}`);
  console.log(hosted.url);
  process.exit(0);
}
console.log(`DESIGN PRESENTATION ADMITTED ${admitted.id}`);
console.log(pathToFileURL(candidatePath).href);
