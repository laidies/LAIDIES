#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { captureSources } from './capture-newsstand-hosted-sources.mjs';
import {
  HOSTED_RESEARCH_OUTPUT_SCHEMA,
  runHostedResearch,
} from './run-newsstand-hosted-research.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'test-newsstand-hosted-research-'));
const privateToken = 'PRIVATE TOKEN MUST NOT LEAK';
const sourceOneBody = 'The council opened a six-week consultation. The proposal is not a rule in force. Public comments close on Friday.';
const sourceTwoBody = 'The technical note says reporting electricity and water use is voluntary during the pilot. It does not report measured savings.';
const sourcesDirectory = path.join(root, 'capture');
const capture = await captureSources({
  sources: [
    { id: 'primary-notice', url: 'https://example.com/notice' },
    { id: 'technical-note', url: 'https://example.org/note' },
  ],
  approvedHosts: ['example.com', 'example.org'],
  outputDirectory: sourcesDirectory,
  fetcher: async (url) => new Response(url.includes('notice') ? sourceOneBody : sourceTwoBody, {
    headers: { 'content-type': 'text/plain' },
  }),
});
const researchPlan = {
  schema: 'newsstand-hosted-research-plan.v1',
  candidateId: 'synthetic-research-case',
  readerQuestion: 'What is being requested, and what has not yet happened?',
  evidenceNeeds: [
    { needId: 'consultation-status', question: 'Is this a consultation or a rule already in force?' },
    { needId: 'measured-outcome', question: 'Do the supplied sources establish measured environmental savings?' },
  ],
  sourceBudgets: { 'primary-notice': 40, 'technical-note': 40 },
};

function output({ badExcerpt = false, missingBinding = false, missingEvidence = false, gap = true } = {}) {
  const excerpt = badExcerpt ? 'The source definitely proves mandatory savings.' : 'The proposal is not a rule in force.';
  return {
    sourceBindings: [
      { sourceId: 'primary-notice', sha256: capture.records[0].sha256, bytes: capture.records[0].bytes },
      ...(missingBinding ? [] : [{ sourceId: 'technical-note', sha256: capture.records[1].sha256, bytes: capture.records[1].bytes }]),
    ],
    findings: [
      {
        needId: 'consultation-status',
        status: 'SUPPORTED',
        claimId: 'consultation-not-rule',
        claim: 'The proposal is a consultation rather than a rule already in force.',
        scopeAndFreshness: 'Bound to the captured notice and its observed date.',
        evidence: missingEvidence ? [] : [{
          sourceId: 'primary-notice', excerpt, occurrence: 1, support: 'DIRECT',
          qualification: 'This establishes status, not the outcome of the consultation.',
        }],
      },
      gap ? {
        needId: 'measured-outcome', status: 'GAP',
        gap: 'The supplied source explicitly says it does not report measured savings.',
      } : {
        needId: 'measured-outcome',
        status: 'SUPPORTED',
        claimId: 'voluntary-pilot-language',
        claim: 'The technical note describes reporting during the pilot as voluntary.',
        scopeAndFreshness: 'Bound to the captured technical note and its observed date.',
        evidence: [{
          sourceId: 'technical-note', excerpt: 'The technical note says reporting electricity and water use is voluntary during the pilot.', occurrence: 1,
          support: 'DIRECT', qualification: 'This does not establish a measured environmental outcome.',
        }],
      },
    ],
    limitations: ['Research output still requires independent source and claim verification.'],
    researchAdmission: false,
    independentVerificationRequired: true,
  };
}

function executorFor(structuredOutput, { throwSecret = false } = {}) {
  const calls = [];
  const execute = async (input) => {
    calls.push(input);
    if (throwSecret) throw new Error(`${privateToken}: ${sourceOneBody}`);
    return {
      is_error: false,
      subtype: 'success',
      modelUsage: { 'claude-fable-5': { inputTokens: 1, outputTokens: 1 } },
      structured_output: structuredOutput,
    };
  };
  return { execute, calls };
}

const capturedLogs = [];
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { capturedLogs.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { capturedLogs.push(String(chunk)); return true; });

try {
  const successfulExecutor = executorFor(output());
  const result = await runHostedResearch({
    capture,
    captureDirectory: sourcesDirectory,
    researchPlan,
    execute: successfulExecutor.execute,
  });
  assert.equal(result.status, 'RESEARCH_TRANSPORT_SUCCESS');
  assert.equal(result.transportSuccess, true);
  assert.equal(result.evidencePacketProduced, true);
  assert.equal(result.researchAdmission, false);
  assert.equal(result.independentVerificationRequired, true);
  assert.deepEqual(result.researchExecution, {
    provider: 'anthropic', model: 'claude-fable-5', effort: 'medium', role: 'research-evidence-extractor', makerIdentityClaimed: false,
  });
  assert.equal(result.qualification, 'NOT_ESTABLISHED');
  assert.equal(result.publicationActionTaken, false);
  assert.equal(JSON.stringify(result).includes(sourceOneBody), false, 'public serialization excludes source bodies');
  assert.equal(JSON.stringify(result).includes('consultation-not-rule'), false, 'public serialization excludes model claims');
  assert.equal(result.privateResult.modelOutput.findings[1].status, 'GAP', 'missing evidence remains an explicit gap');
  assert.ok(result.privateResult.boundEvidence.findings[0].evidence[0].sourceSha256);
  assert.ok(Number.isInteger(result.privateResult.boundEvidence.findings[0].evidence[0].byteStart));

  assert.equal(successfulExecutor.calls.length, 1);
  const invocation = successfulExecutor.calls[0];
  assert.equal(invocation.model, 'claude-fable-5');
  assert.equal(invocation.effort, 'medium');
  assert.deepEqual(invocation.request.outputSchema, HOSTED_RESEARCH_OUTPUT_SCHEMA);
  assert.deepEqual(invocation.request.messages.map((message) => message.role), ['system', 'user']);
  const requestPayload = JSON.parse(invocation.request.messages[1].content);
  assert.equal(requestPayload.sources.length, 2);
  assert.equal(requestPayload.sources[0].body, sourceOneBody, 'request consumes the complete captured source body');
  assert.equal(requestPayload.sources[1].body, sourceTwoBody, 'request consumes every complete captured source body');
  assert.equal(requestPayload.sources[0].sha256, crypto.createHash('sha256').update(sourceOneBody).digest('hex'));
  assert.match(invocation.request.messages[0].content, /Never invent a citation/);

  for (const invalidOutput of [output({ badExcerpt: true }), output({ missingBinding: true }), output({ missingEvidence: true })]) {
    const attempted = executorFor(invalidOutput);
    const rejected = await runHostedResearch({ capture, captureDirectory: sourcesDirectory, researchPlan, execute: attempted.execute });
    assert.equal(rejected.status, 'EVIDENCE_VALIDATION_REJECTED');
    assert.equal(rejected.researchAdmission, false);
    assert.equal(rejected.privateResult, undefined);
  }

  const tightBudgetPlan = structuredClone(researchPlan);
  tightBudgetPlan.sourceBudgets['technical-note'] = 5;
  const overBudgetExecutor = executorFor(output({ gap: false }));
  const overBudget = await runHostedResearch({ capture, captureDirectory: sourcesDirectory, researchPlan: tightBudgetPlan, execute: overBudgetExecutor.execute });
  assert.equal(overBudget.status, 'EVIDENCE_VALIDATION_REJECTED', 'exact excerpts cannot exceed the explicit per-source quote budget');

  const tamperedDirectory = path.join(root, 'tampered');
  fs.cpSync(sourcesDirectory, tamperedDirectory, { recursive: true });
  fs.chmodSync(tamperedDirectory, 0o700);
  fs.appendFileSync(path.join(tamperedDirectory, 'primary-notice.body'), 'tamper');
  const mustNotExecute = executorFor(output());
  const sourceRejected = await runHostedResearch({ capture, captureDirectory: tamperedDirectory, researchPlan, execute: mustNotExecute.execute });
  assert.equal(sourceRejected.status, 'SOURCE_BINDING_REJECTED');
  assert.equal(mustNotExecute.calls.length, 0, 'source hash mismatch stops before model execution');

  const secretFailure = executorFor(output(), { throwSecret: true });
  const failed = await runHostedResearch({ capture, captureDirectory: sourcesDirectory, researchPlan, execute: secretFailure.execute });
  assert.equal(failed.status, 'EXECUTION_ERROR');
  assert.equal(JSON.stringify(failed).includes(privateToken), false);
  assert.equal(JSON.stringify(failed).includes(sourceOneBody), false);
  assert.equal(capturedLogs.join(''), '', 'adapter emits no credentials, source bodies, claims, or provider output');
} finally {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  fs.rmSync(root, { recursive: true, force: true });
}

console.log('PASS newsstand-hosted-research: full captured sources, hash-bound exact evidence, explicit gaps, private transport output, and no admission claim');
