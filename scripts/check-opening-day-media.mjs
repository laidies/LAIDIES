#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gatePath = path.join(root, 'operations/launch/opening-day-media-gate-2026-07-31.json');
const gate = JSON.parse(fs.readFileSync(gatePath, 'utf8'));
const errors = [];
const requiredIds = ['trailer', '01', '02', '03', '04'];
const validVerdicts = new Set(['PASS', 'HOLD', 'FAIL']);

async function sha256(file) {
  const hash = crypto.createHash('sha256');
  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', resolve);
    stream.on('error', reject);
  });
  return hash.digest('hex');
}

function fail(message) {
  errors.push(message);
}

if (JSON.stringify(gate.opening_day_cutline) !== JSON.stringify(requiredIds)) {
  fail('Opening-day cutline must be Trailer plus Episodes 01-04 in order.');
}

if (!Array.isArray(gate.required_gates) || gate.required_gates.length < 12) {
  fail('The complete media gate list is missing.');
}

if (gate.programmes?.length !== requiredIds.length) {
  fail(`Expected ${requiredIds.length} programmes; found ${gate.programmes?.length ?? 0}.`);
}

for (const id of requiredIds) {
  const programme = gate.programmes?.find((item) => item.id === id);
  if (!programme) {
    fail(`Missing programme ${id}.`);
    continue;
  }

  for (const artifact of ['master', 'captions']) {
    const record = programme[artifact];
    const file = record?.path ? path.join(root, record.path) : null;
    if (!file || !fs.existsSync(file)) {
      fail(`${id}: ${artifact} is missing at ${record?.path ?? '<unset>'}.`);
      continue;
    }
    const actual = await sha256(file);
    if (actual !== record.sha256) fail(`${id}: ${artifact} checksum mismatch (${actual}).`);
  }

  const captionText = fs.readFileSync(path.join(root, programme.captions.path), 'utf8');
  const cueCount = (captionText.match(/-->/g) || []).length;
  if (cueCount !== programme.captions.cue_count) {
    fail(`${id}: caption cue count ${cueCount} != ${programme.captions.cue_count}.`);
  }

  for (const required of gate.required_gates) {
    if (!validVerdicts.has(programme.gates?.[required])) {
      fail(`${id}: ${required} has no valid PASS/HOLD/FAIL verdict.`);
    }
  }

  for (const evidence of programme.evidence ?? []) {
    if (!fs.existsSync(path.join(root, evidence))) fail(`${id}: evidence missing at ${evidence}.`);
  }

  const allPass = gate.required_gates.every((required) => programme.gates[required] === 'PASS');
  if (programme.release_ready !== allPass) {
    fail(`${id}: release_ready=${programme.release_ready} but all-gates-pass=${allPass}.`);
  }
  if (!programme.next_action || programme.next_action.length < 40) fail(`${id}: exact next action is missing.`);
}

if (!fs.existsSync(path.join(root, gate.review_surface))) fail('The human review surface is missing.');

if (errors.length) {
  console.error('OPENING MEDIA GATE: INVALID');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const ready = gate.programmes.filter((programme) => programme.release_ready);
const ownerWatch = gate.programmes.filter((programme) => programme.status === 'READY FOR OWNER WATCH');
const rebuild = gate.programmes.filter((programme) => programme.status === 'REBUILD REQUIRED');

console.log('OPENING MEDIA GATE: VALID');
console.log(`- ${ready.length}/5 release-ready`);
console.log(`- owner watch queue: ${ownerWatch.map((item) => item.id).join(', ') || 'none'}`);
console.log(`- rebuild queue: ${rebuild.map((item) => item.id).join(', ') || 'none'}`);
console.log(`- overall admission: ${gate.status}`);

if (process.argv.includes('--require-ready') && ready.length !== requiredIds.length) {
  console.error('OPENING MEDIA ADMISSION: HOLD');
  for (const programme of gate.programmes.filter((item) => !item.release_ready)) {
    const blockers = gate.required_gates.filter((required) => programme.gates[required] !== 'PASS');
    console.error(`- ${programme.id}: ${programme.status}; ${blockers.join(', ')}`);
  }
  process.exit(2);
}
