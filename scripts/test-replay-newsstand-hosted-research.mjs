#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { replayHostedResearch } from './replay-newsstand-hosted-research.mjs';

const stable = (value) => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(',')}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const sha256 = (value) => crypto.createHash('sha256').update(stable(value)).digest('hex');
const source = '/private/tmp/newsstand-research-result-36282171408';
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'test-replay-hosted-research-'));
fs.chmodSync(temp, 0o700);

function input(directory = source) {
  return {
    extraction: JSON.parse(fs.readFileSync(path.join(directory, 'extraction.json'), 'utf8')),
    verification: JSON.parse(fs.readFileSync(path.join(directory, 'verification.json'), 'utf8')),
    capture: JSON.parse(fs.readFileSync(path.join(directory, 'sources/capture.json'), 'utf8')),
    captureDirectory: path.join(directory, 'sources'),
    controlledPlan: JSON.parse(fs.readFileSync(path.join(directory, 'controlled-plan.json'), 'utf8')),
  };
}

try {
  const admitted = await replayHostedResearch(input());
  assert.equal(admitted.status, 'ADMITTED_RESEARCH_READY');
  assert.equal(admitted.admittedForDrafting, true);
  assert.equal(admitted.publicationActionTaken, false);

  const raw = input();
  raw.extraction.privateResult.provider.uuid = 'tampered-raw-provider-uuid';
  assert.equal((await replayHostedResearch(raw)).status, 'RESEARCH_REPLAY_REJECTED');

  const request = input();
  request.verification.privateResult.request.messages[1].content += ' ';
  assert.equal((await replayHostedResearch(request)).status, 'RESEARCH_REPLAY_REJECTED');

  const copied = path.join(temp, 'body-tamper');
  fs.cpSync(source, copied, { recursive: true });
  fs.appendFileSync(path.join(copied, 'sources/mai-announcement.body'), '\\nbody tamper');
  assert.equal((await replayHostedResearch(input(copied))).status, 'RESEARCH_REPLAY_REJECTED');

  const semantic = input();
  semantic.verification.privateResult.provider.structured_output.overallVerdict = 'HOLD';
  semantic.verification.result.verificationProviderRawSha256 = sha256(semantic.verification.privateResult.provider);
  assert.equal((await replayHostedResearch(semantic)).status, 'RESEARCH_REPLAY_REJECTED');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log('PASS hosted research replay: authenticated actual replay and raw/request/body/semantic tamper rejection without provider execution');
