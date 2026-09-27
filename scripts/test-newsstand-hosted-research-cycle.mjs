#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runResearchCycle } from './run-newsstand-hosted-research-cycle.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'test-newsstand-research-cycle-'));
const plan = {
  capturePlan: { sources: [{ id: 'primary', url: 'https://example.com/source' }], approvedHosts: ['example.com'] },
  researchPlan: { schema: 'newsstand-hosted-research-plan.v1', candidateId: 'cycle-test' },
  sourceProfiles: [{ sourceId: 'primary', publisherType: 'official-primary' }],
};
const captured = {
  schema: 'newsstand-hosted-source-capture.v1', researchComplete: false, publicationAuthorized: false,
  records: [{ id: 'primary', status: 'CAPTURED_REQUIRES_SOURCE_REVIEW' }],
};
const rawExtraction = { is_error: false, subtype: 'success', structured_output: { findings: [{ claimId: 'claim-1' }] } };
const rawVerification = { is_error: false, subtype: 'success', structured_output: { overallVerdict: 'ADMIT_FOR_DRAFTING' } };

function privateResult(publicFields, privateFields) {
  const result = { ...publicFields };
  Object.defineProperty(result, 'privateResult', { value: privateFields });
  return result;
}

function read(directory, name) {
  return JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
}

function assertPrivatePermissions(directory) {
  assert.equal(fs.statSync(directory).mode & 0o777, 0o700);
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isFile()) assert.equal(fs.statSync(path.join(directory, entry.name)).mode & 0o777, 0o600);
  }
}

try {
  {
    const outputDirectory = path.join(root, 'source-failure');
    let extractionCalls = 0;
    let verificationCalls = 0;
    const result = await runResearchCycle({ plan, outputDirectory, runId: 'source-failure-1' }, {
      capture: async () => ({ ...captured, records: [{ id: 'primary', status: 'UNAVAILABLE', reason: 'SOURCE_FETCH_FAILED' }] }),
      extract: async () => { extractionCalls += 1; throw new Error('must not extract'); },
      verify: async () => { verificationCalls += 1; throw new Error('must not verify'); },
    });
    assert.deepEqual(result, {
      schema: 'newsstand-hosted-research-cycle.v1', stage: 'SOURCE_CAPTURE', status: 'HELD_SOURCE_UNAVAILABLE',
      runId: 'source-failure-1', publicationActionTaken: false,
    });
    assert.equal(extractionCalls, 0, 'an unavailable source stops before extraction');
    assert.equal(verificationCalls, 0, 'an unavailable source stops before verification');
    assert.equal(fs.existsSync(path.join(outputDirectory, 'extraction.json')), false);
    assert.equal(fs.existsSync(path.join(outputDirectory, 'admitted-research.json')), false);
  }

  {
    const outputDirectory = path.join(root, 'extractor-gap');
    const extracted = privateResult({ status: 'RESEARCH_TRANSPORT_SUCCESS' }, { provider: rawExtraction, boundEvidence: { findings: [{ status: 'GAP' }] } });
    const verified = privateResult({ status: 'EXTRACTOR_GAPS_REJECTED', researchAdmission: false }, { extractorRaw: rawExtraction });
    let received;
    const result = await runResearchCycle({ plan, outputDirectory, runId: 'extractor-gap-1' }, {
      capture: async () => captured,
      extract: async () => extracted,
      verify: async (input) => { received = input; return verified; },
    });
    assert.equal(result.status, 'EXTRACTOR_GAPS_REJECTED');
    assert.equal(fs.existsSync(path.join(outputDirectory, 'admitted-research.json')), false, 'an extractor gap cannot create an admission packet');
    assert.deepEqual(read(outputDirectory, 'extraction.json').privateResult.provider, rawExtraction, 'the exact extractor provider result is preserved');
    assert.deepEqual(read(outputDirectory, 'verification.json').privateResult.extractorRaw, rawExtraction, 'the verifier receipt retains the reviewed extractor result');
    assert.match(received.extractorIdentity.principalId, /^anthropic:hosted-research-extractor:/);
    assert.match(received.reviewerIdentity.principalId, /^anthropic:hosted-research-reviewer:/);
    assert.notEqual(received.extractorIdentity.principalId, received.reviewerIdentity.principalId);
    assert.notEqual(received.extractorIdentity.sessionId, received.reviewerIdentity.sessionId);
    assert.match(received.writerPrincipal, /^anthropic:hosted-writer:/);
  }

  {
    const outputDirectory = path.join(root, 'semantic-hold');
    const extracted = privateResult({ status: 'RESEARCH_TRANSPORT_SUCCESS' }, { provider: rawExtraction });
    const held = privateResult({ status: 'SEMANTIC_RESEARCH_HOLD', researchAdmission: false }, { provider: rawVerification, assessment: rawVerification.structured_output });
    const result = await runResearchCycle({ plan, outputDirectory, runId: 'semantic-hold-1' }, {
      capture: async () => captured,
      extract: async () => extracted,
      verify: async () => held,
    });
    assert.equal(result.status, 'SEMANTIC_RESEARCH_HOLD');
    assert.equal(fs.existsSync(path.join(outputDirectory, 'admitted-research.json')), false, 'a failed semantic verification cannot create an admission packet');
    assert.deepEqual(read(outputDirectory, 'verification.json').privateResult.provider, rawVerification, 'the exact failed verifier result is preserved for private review');
    assert.equal(JSON.stringify(result).includes('overallVerdict'), false, 'public cycle result excludes private verifier output');
  }

  {
    const outputDirectory = path.join(root, 'admitted');
    const admittedResearch = { schema: 'newsstand-hosted-admitted-research.v1', decision: 'ADMIT_FOR_DRAFTING', claims: [{ claimId: 'claim-1' }] };
    const extracted = privateResult({ status: 'RESEARCH_TRANSPORT_SUCCESS' }, { provider: rawExtraction });
    const verified = privateResult({ status: 'ADMITTED_RESEARCH_READY', researchAdmission: true }, {
      provider: rawVerification, extractorRaw: rawExtraction, admittedResearch,
    });
    let verifierInput;
    const result = await runResearchCycle({ plan, outputDirectory, runId: 'admitted-1' }, {
      capture: async () => captured,
      extract: async () => extracted,
      verify: async (input) => { verifierInput = input; return verified; },
    });
    assert.equal(result.status, 'ADMITTED_RESEARCH_READY');
    assert.equal(result.publicationActionTaken, false);
    assert.equal(Object.hasOwn(result, 'privateResult'), false, 'public result has no private result property');
    assert.equal(JSON.stringify(result).includes('claim-1'), false, 'public result does not serialize private claims');
    assert.deepEqual(read(outputDirectory, 'extraction.json').privateResult.provider, rawExtraction);
    assert.deepEqual(read(outputDirectory, 'verification.json').privateResult.provider, rawVerification);
    assert.deepEqual(read(outputDirectory, 'admitted-research.json'), admittedResearch);
    assert.notEqual(verifierInput.extractorIdentity.sessionId, verifierInput.reviewerIdentity.sessionId);
    assertPrivatePermissions(outputDirectory);
  }
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

console.log('PASS hosted research cycle: source stop, gap/semantic holds, distinct roles, private raw receipts, and no public leakage');
