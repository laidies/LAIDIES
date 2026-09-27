#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { captureSources } from './capture-newsstand-hosted-sources.mjs';
import { runHostedResearch } from './run-newsstand-hosted-research.mjs';
import {
  HOSTED_RESEARCH_VERIFICATION_SCHEMA,
  verifyHostedResearch,
} from './verify-newsstand-hosted-research.mjs';

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stable = (value) => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'test-newsstand-research-verifier-'));
const captureDirectory = path.join(root, 'capture');
const primaryBody = 'The agency opened a consultation. The proposal asks companies to report electricity and water use. It is not a rule in force.';
const contextBody = 'The independent report says disclosure can make later comparisons possible. It reports no measured reduction in energy or water use.';
const capture = await captureSources({
  sources: [
    { id: 'primary', url: 'https://agency.example/notice' },
    { id: 'context', url: 'https://news.example/report' },
  ],
  approvedHosts: ['agency.example', 'news.example'],
  outputDirectory: captureDirectory,
  fetcher: async (url) => new Response(url.includes('agency') ? primaryBody : contextBody, { headers: { 'content-type': 'text/plain' } }),
});
const researchPlan = {
  schema: 'newsstand-hosted-research-plan.v1', candidateId: 'synthetic-verification',
  readerQuestion: 'What is requested and what outcome is established?',
  evidenceNeeds: [{ needId: 'proposal-status', question: 'Is this a proposal rather than a rule or measured result?' }],
  sourceBudgets: { primary: 100, context: 100 },
};
const extractorOutput = {
  sourceBindings: capture.records.map((source) => ({ sourceId: source.id, sha256: source.sha256, bytes: source.bytes })),
  findings: [{
    needId: 'proposal-status', status: 'SUPPORTED', claimId: 'proposal-not-outcome',
    claim: 'The proposal requests disclosure and does not establish a measured environmental reduction.',
    scopeAndFreshness: 'Bound to the captured consultation and report.',
    evidence: [
      { sourceId: 'primary', excerpt: 'The proposal asks companies to report electricity and water use.', occurrence: 1, support: 'DIRECT', qualification: 'This is a request, not compliance or a measured result.' },
      { sourceId: 'context', excerpt: 'It reports no measured reduction in energy or water use.', occurrence: 1, support: 'QUALIFIED', qualification: 'Absence of a measured result here does not prove no reduction occurred elsewhere.' },
    ],
  }],
  limitations: ['The captured records establish a request and reporting limit, not an environmental outcome.'],
  researchAdmission: false,
  independentVerificationRequired: true,
};

function extractorExecutor(output = extractorOutput) {
  return async () => ({ is_error: false, subtype: 'success', modelUsage: { 'claude-fable-5': {} }, structured_output: output });
}
const researchResult = await runHostedResearch({ capture, captureDirectory, researchPlan, execute: extractorExecutor() });
assert.equal(researchResult.status, 'RESEARCH_TRANSPORT_SUCCESS');

const sourceProfiles = [
  { sourceId: 'primary', label: 'Agency consultation notice', publisherType: 'official-primary', authorityScope: 'Authoritative for the consultation wording and status.', freshnessPolicy: 'Use only for this captured consultation version.' },
  { sourceId: 'context', label: 'Independent context report', publisherType: 'independent-reporting', authorityScope: 'Independent context for what the report did and did not measure.', freshnessPolicy: 'Qualify findings to the captured report date.' },
];
const extractorIdentity = { principalId: 'anthropic:hosted-research-extractor:synthetic-42', sessionId: 'extractor-session-42' };
const reviewerIdentity = { principalId: 'anthropic:hosted-research-reviewer:synthetic-42', sessionId: 'reviewer-session-42' };
const writerPrincipal = 'anthropic:hosted-writer:synthetic-42';

function assessment({ verdict = 'ADMIT_FOR_DRAFTING', entailment = 'QUALIFIED', sourceFreshness = 'CURRENT_FOR_SCOPE', authority = 'FIT_FOR_CLAIM' } = {}) {
  return {
    reviewerPrincipalId: reviewerIdentity.principalId,
    reviewSessionId: reviewerIdentity.sessionId,
    sourceDispositions: sourceProfiles.map((source) => ({ sourceId: source.sourceId, authority, freshness: sourceFreshness, limitations: ['Use only within the captured source scope.'], observation: 'The exact source body and metadata were assessed.' })),
    claimDispositions: [{
      needId: 'proposal-status', claimId: 'proposal-not-outcome', entailment,
      freshness: sourceFreshness, authority, limitationsRetained: true,
      admittedScopeAndFreshness: 'The captured records establish a disclosure request and no measured result in the cited report; they do not establish the environmental outcome.',
      observation: entailment === 'NOT_ENTAILED' ? 'The evidence does not entail the proposed claim.' : 'The exact evidence supports the claim only with its stated limits.',
    }],
    overallVerdict: verdict,
    limitations: ['This is an independent AI assessment for drafting, not observed human evidence.'],
    humanEvidenceClaimed: false,
    publicationAdmissionClaimed: false,
  };
}

function verifierExecutor(value, { throwSecret = false } = {}) {
  const calls = [];
  const execute = async (input) => {
    calls.push(input);
    if (throwSecret) throw new Error(`PRIVATE TOKEN ${primaryBody}`);
    return { is_error: false, subtype: 'success', modelUsage: { 'claude-fable-5': {} }, structured_output: value };
  };
  return { execute, calls };
}

const base = { researchResult, capture, captureDirectory, researchPlan, sourceProfiles, extractorIdentity, reviewerIdentity, writerPrincipal, clock: () => new Date('2026-09-26T23:00:00Z') };
const capturedLogs = [];
const originalOut = process.stdout.write.bind(process.stdout);
const originalErr = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { capturedLogs.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { capturedLogs.push(String(chunk)); return true; });

try {
  const admittedAssessment = assessment();
  const admittedExecutor = verifierExecutor(admittedAssessment);
  const admitted = await verifyHostedResearch({ ...base, execute: admittedExecutor.execute });
  assert.equal(admitted.status, 'ADMITTED_RESEARCH_READY');
  assert.equal(admitted.researchAdmission, true);
  assert.equal(admitted.editorialAdmission, false);
  assert.equal(admitted.publicationActionTaken, false);
  assert.equal(admitted.privateResult.admittedResearch.decision, 'ADMIT_FOR_DRAFTING');
  assert.equal(admitted.privateResult.admittedResearch.claims[0].status, 'QUALIFIED', 'qualified source evidence cannot become VERIFIED');
  assert.equal(admitted.privateResult.admittedResearch.reviewer.principalId, reviewerIdentity.principalId);
  const packet = admitted.privateResult.admittedResearch;
  assert.equal(packet.admittedPayloadSha256, sha256(stable({ candidateId: packet.candidateId, sourceSetSha256: packet.sourceSetSha256, evidenceOutputSha256: packet.evidenceOutputSha256, sourceBindings: packet.sourceBindings, claims: packet.claims, limitations: packet.limitations })), 'packet uses the exact admitted payload binding consumed by the writer');
  assert.equal(admitted.privateResult.extractorRaw, researchResult.privateResult.provider, 'exact extractor raw result is retained privately');
  assert.equal(admitted.privateResult.provider.structured_output, admittedAssessment, 'exact verifier raw result is retained privately');
  assert.equal(JSON.stringify(admitted).includes(primaryBody), false, 'public result excludes sources and raw provider results');
  assert.equal(admittedExecutor.calls.length, 1);
  assert.deepEqual(admittedExecutor.calls[0].request.outputSchema, HOSTED_RESEARCH_VERIFICATION_SCHEMA);
  const verificationInput = JSON.parse(admittedExecutor.calls[0].request.messages[1].content);
  assert.equal(verificationInput.sources[0].body, primaryBody, 'independent reviewer receives the full primary source');
  assert.equal(verificationInput.sources[1].body, contextBody, 'independent reviewer receives every full source');
  assert.notEqual(verificationInput.extractorIdentity.sessionId, verificationInput.reviewerIdentity.sessionId);

  const unsupportedExecutor = verifierExecutor(assessment({ verdict: 'ADMIT_FOR_DRAFTING', entailment: 'NOT_ENTAILED' }));
  const unsupported = await verifyHostedResearch({ ...base, execute: unsupportedExecutor.execute });
  assert.equal(unsupported.status, 'SEMANTIC_RESEARCH_HOLD', 'a provider ADMIT cannot override its known unsupported-claim disposition');
  assert.equal(unsupported.researchAdmission, false);
  assert.equal(unsupported.privateResult.admittedResearch, undefined);

  const fakePassWithStaleSource = verifierExecutor(assessment({ verdict: 'ADMIT_FOR_DRAFTING', sourceFreshness: 'STALE_OR_UNKNOWN' }));
  const stale = await verifyHostedResearch({ ...base, execute: fakePassWithStaleSource.execute });
  assert.equal(stale.status, 'SEMANTIC_RESEARCH_HOLD', 'provider ADMIT cannot override an explicit stale-source disposition');

  const gappedOutput = structuredClone(extractorOutput);
  gappedOutput.findings[0] = { needId: 'proposal-status', status: 'GAP', gap: 'No supporting evidence.' };
  const gappedResult = await runHostedResearch({ capture, captureDirectory, researchPlan, execute: extractorExecutor(gappedOutput) });
  const mustNotReview = verifierExecutor(assessment());
  const gap = await verifyHostedResearch({ ...base, researchResult: gappedResult, execute: mustNotReview.execute });
  assert.equal(gap.status, 'EXTRACTOR_GAPS_REJECTED');
  assert.equal(mustNotReview.calls.length, 0, 'known missing evidence stops before semantic review');

  const tamperedResult = Object.create(Object.getPrototypeOf(researchResult), Object.getOwnPropertyDescriptors(researchResult));
  tamperedResult.evidenceOutputSha256 = '0'.repeat(64);
  const tampered = await verifyHostedResearch({ ...base, researchResult: tamperedResult, execute: verifierExecutor(assessment()).execute });
  assert.equal(tampered.status, 'EXTRACTOR_BINDING_REJECTED');

  const differentPlan = structuredClone(researchPlan);
  differentPlan.readerQuestion = 'A different question not used by the extractor.';
  const planMismatch = await verifyHostedResearch({ ...base, researchPlan: differentPlan, execute: verifierExecutor(assessment()).execute });
  assert.equal(planMismatch.status, 'EXTRACTOR_BINDING_REJECTED', 'verification plan must match the exact extractor request');

  const sameSession = await verifyHostedResearch({ ...base, reviewerIdentity: { ...reviewerIdentity, sessionId: extractorIdentity.sessionId }, execute: verifierExecutor(assessment()).execute });
  assert.equal(sameSession.status, 'INVALID_VERIFICATION_INPUT');

  const secret = await verifyHostedResearch({ ...base, execute: verifierExecutor(assessment(), { throwSecret: true }).execute });
  assert.equal(secret.status, 'EXECUTION_ERROR');
  assert.equal(JSON.stringify(secret).includes('PRIVATE TOKEN'), false);
  assert.equal(capturedLogs.join(''), '', 'adapter logs no token, source, evidence, or provider output');
} finally {
  process.stdout.write = originalOut;
  process.stderr.write = originalErr;
  fs.rmSync(root, { recursive: true, force: true });
}

console.log('PASS hosted research verification: distinct semantic review, complete sources, exact admission packet, gap and unsupported denial, private raw results');
