#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  CURRENT_PRODUCER_CHECKER_SHA256,
  runHostedWriter,
} from './run-newsstand-hosted-writer.mjs';
import { FAILURE_FAMILIES } from './check-prose-quality-admission.mjs';

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stable = (value) => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const makerPrincipal = 'anthropic:hosted-writer:synthetic-run-42';
const contract = {
  schemaVersion: 'laidies-content-producer-contract.v1', candidateId: 'synthetic-story', surface: 'NEWSSTAND_DAILY', contentClass: 'NEWS', producer: makerPrincipal, status: 'READY_TO_DRAFT',
  readerContract: { humanQuestion: 'What changed?', promisedPayoff: 'Know what the proposal does and does not establish.', priorKnowledge: 'No technical background.', centralMentalModel: 'A proposal asks for disclosure; it does not prove an outcome.', dailyLifeConnection: 'A public consultation.', surfaceJob: 'Ordinary Daily explanation.', desiredFeeling: 'Clear and able to ask a better question.' },
  draftArchitecture: {
    readerQuestions: [{ id: 'change', question: 'What changed?' }],
    requiredTerms: [{ term: 'disclosure', meaning: 'making information public' }],
  },
  positiveExemplars: [{ id: 'GOOD', strengthsToUse: ['A connected explanation'], patternsNotToCopy: ['Exact wording'] }],
  knownFailurePreflight: { negativeExemplarIds: ['BAD'], dispositions: Object.fromEntries(FAILURE_FAMILIES.map((family) => [family, { status: 'CLEAR' }])) },
};
const producerContractRaw = `${JSON.stringify(contract)}\n`;
const writerInput = {
  packet: {
    schemaVersion: 'laidies-newsstand-writer-input.v1', candidateId: contract.candidateId,
    method: 'Explain the dated change, mechanism, consequence, uncertainty and useful question.',
    reader: contract.readerContract, explanationPlan: contract.draftArchitecture,
    communication: { mode: 'PROPORTIONAL' }, prevention: contract.knownFailurePreflight.dispositions,
    positiveExamples: [{ artifact: 'A clear explanation connects the request to what it does and does not establish.' }],
    negativeExamples: [{ failureFamilies: ['missingMechanism'], artifact: 'A vague announcement offers confidence but never explains what changed or how.' }],
    reportingFrame: {
      schema: 'laidies.newsstand-story-type-coverage.v1', primaryType: 'legal-policy', overlays: [],
      universalAnswers: { whatHappened: 'placeholder answer replaced by the hosted writer' },
      typeAnswers: { 'legal-policy': { legalStatus: 'placeholder answer replaced by the hosted writer' } },
      translation: {
        schema: 'laidies.newsstand-reader-translation.v1',
        newsVersionExact: 'placeholder', actualMeaningExact: 'placeholder', mechanismExact: 'placeholder', familiarExampleExact: 'placeholder',
        jargon: [{ term: 'disclosure', plainMeaning: 'placeholder' }],
        learningConnections: [{ concept: 'Evidence', learningPayoff: 'Learn to check claims.', disposition: 'link', destination: '/library.html#working-with-ai-101', recordPath: 'private/learning.json' }],
      },
    },
    sources: [{ text: 'unadmitted source bytes must not enter the request' }],
  },
  bindings: [{ path: 'private/source-packet.json', sha256: '1'.repeat(64) }],
  producerContract: { path: 'private/producer-contract.json', sha256: sha256(producerContractRaw) },
};
const sourceBindings = [{
  sourceId: 'primary', url: 'https://example.com/notice', label: 'Primary notice', publisherType: 'official',
  observedAt: '2026-09-26T18:00:00Z', sha256: '2'.repeat(64), bytes: 100,
}];
const claims = [{
  claimId: 'proposal-status', claim: 'The proposal asks for disclosure and is not a rule in force.', status: 'QUALIFIED',
  scopeAndFreshness: 'Bound to the September 26 captured notice.',
  sourceEvidence: [{ sourceId: 'primary', sourceSha256: '2'.repeat(64), excerpt: 'The proposal asks companies to disclose energy and water use.', occurrence: 1, support: 'QUALIFIED', qualification: 'The source describes a proposal, not an implemented rule.' }],
}];
const admittedPayload = { candidateId: contract.candidateId, sourceSetSha256: '3'.repeat(64), evidenceOutputSha256: '4'.repeat(64), sourceBindings, claims, limitations: ['Synthetic evidence for adapter tests only.'] };
const researchPacket = {
  schemaVersion: 'newsstand-hosted-admitted-research.v1', candidateId: contract.candidateId, decision: 'ADMIT_FOR_DRAFTING',
  researcherPrincipalId: 'anthropic:hosted-researcher:synthetic-run-42',
  reviewer: { principalId: 'independent:research-reviewer:synthetic', role: 'independent source and claim reviewer', independentFromResearcher: true },
  reviewedAt: '2026-09-26T18:10:00Z', sourceSetSha256: admittedPayload.sourceSetSha256, evidenceOutputSha256: admittedPayload.evidenceOutputSha256,
  admittedPayloadSha256: sha256(stable(admittedPayload)), sourceBindings, claims, limitations: admittedPayload.limitations,
};
const storyFrame = {
  schemaVersion: 'newsstand-hosted-story-frame.v1', candidateId: contract.candidateId, slug: contract.candidateId,
  producedAt: '2026-09-26T18:20:00Z', heroVisual: { src: '/assets/newsstand/synthetic-story.png', alt: 'An illustrated reporting folder beside electricity and water meters.', credit: 'Illustration: LAiDIES' },
  sourceApprovalRecord: 'newsstand:source-approval:synthetic-story',
  learningDestination: { href: '/library.html#working-with-ai-101', label: 'Working with AI 101' },
  badge: 'THE LATEST', predecessorStoryIds: [],
};
const runtime = (errors = []) => ({
  schemaVersion: 'newsstand-hosted-producer-runtime.v1', checkerPath: 'scripts/check-content-producer-contract.mjs',
  checkerSha256: CURRENT_PRODUCER_CHECKER_SHA256,
  inspect: (value) => ({ errors, status: value.status, requiredProducerRepairs: [] }),
});
const storyOutput = (claimId = 'proposal-status') => ({
  storyContent: {
    headline: 'A proposal asks AI companies to disclose energy and water use.',
    the_story: '<p>A new proposal asks AI companies to disclose how much electricity and water their systems use. The proposal is not a rule in force.</p><p>Disclosure means making information public. The request could make company reports easier to compare, while leaving the underlying environmental result unmeasured.</p>',
    laidies_read: '<p>The important split is between asking for measurements and achieving a reduction. A reporting request can reveal information; it does not itself lower electricity or water use.</p>',
    what_this_means: '<p>If you read a claim about the proposal, ask whether it describes a requested disclosure, a rule that took effect, or a measured outcome. The supplied notice establishes only the first.</p>',
    cocktail_party: '“The proposal asks for disclosure. It does not prove that energy or water use fell.”',
    class_notes: '<a href="/library.html#working-with-ai-101">Working with AI 101</a> helps you separate a fluent claim from the evidence that supports it.',
    watch_fors: 'Watch for a later rule or measured report.', closing_note: null,
    themes: ['AI accountability'], concepts: ['Disclosure'], tags: ['AI', 'energy'],
  },
  claimMap: [{
    claimId,
    candidateEvidence: ['The proposal is not a rule in force.', 'The request could make company reports easier to compare, while leaving the underlying environmental result unmeasured.'],
    sourceIds: ['primary'], status: 'QUALIFIED', scopeAndFreshness: claims[0].scopeAndFreshness,
  }],
  storyTypeCoverage: {
    schema: 'laidies.newsstand-story-type-coverage.v1', primaryType: 'legal-policy', overlays: [],
    universalAnswers: { whatHappened: 'The proposal asks companies to disclose how much electricity and water their systems use.' },
    typeAnswers: { 'legal-policy': { legalStatus: 'The proposal is not a rule in force.' } },
    translation: {
      schema: 'laidies.newsstand-reader-translation.v1',
      newsVersionExact: 'A new proposal asks AI companies to disclose how much electricity and water their systems use.',
      actualMeaningExact: 'The proposal is not a rule in force.',
      mechanismExact: 'A reporting request can reveal information; it does not itself lower electricity or water use.',
      familiarExampleExact: 'ask whether it describes a requested disclosure, a rule that took effect, or a measured outcome',
      jargon: [{ term: 'disclosure', plainMeaning: 'making information public' }],
      learningConnections: [{ concept: 'Evidence', learningPayoff: 'Learn to check claims.', disposition: 'link', destination: '/library.html#working-with-ai-101', recordPath: 'private/learning.json' }],
    },
  },
});

const outcomes = ['plainClarity', 'readerValue', 'laidiesVoice', 'engagingEnjoyable', 'factualIntegrity', 'freshnessReviewability', 'surfaceFit', 'datedChange', 'consequenceAndUncertainty', 'dailyLifeConnection', 'communicationBenchmark', 'explainBack', 'unseenTransfer', 'usefulAction', 'analogyIntegrity'];
function reviewOutput(storyRaw, verdict = 'PASS') {
  const pass = verdict === 'PASS';
  return {
    reviewerPrincipalId: makerPrincipal, modelFamily: 'anthropic', artifactSha256: sha256(storyRaw), verdict,
    outcomes: outcomes.map((name) => ({ name, verdict: pass ? 'PASS' : name === 'factualIntegrity' ? 'HOLD' : 'PASS', observation: `The exact story was assessed for ${name}.`, artifactEvidence: [{ excerpt: 'The proposal is not a rule in force.', locator: 'the_story' }] })),
    failureFamilies: FAILURE_FAMILIES.map((name) => ({ name, present: false, observation: `${name} is not present in the exact story.`, artifactLocator: 'complete story' })),
    factualClaims: [{ claimId: 'proposal-status', verdict: pass ? 'QUALIFIED' : 'GAP', observation: pass ? 'The claim retains the admitted proposal boundary.' : 'The claim needs more evidence.' }],
    readerAnswers: [{ questionId: 'change', answer: 'A proposal asks companies to disclose use.', artifactEvidence: 'A new proposal asks AI companies to disclose how much electricity and water their systems use.' }],
    termChecks: [{ term: 'disclosure', meaning: 'making information public', artifactEvidence: 'Disclosure means making information public.' }],
    explainBack: { evidenceType: 'PRODUCER_SIMULATION', prompt: 'Explain the proposal boundary.', probeResponse: 'It asks for reporting and does not prove a reduction.', expectedEvidence: 'request versus result', assessment: 'The explanation preserves the distinction.' },
    unseenTransfer: { evidenceType: 'PRODUCER_SIMULATION', prompt: 'Apply the distinction to a voluntary workplace report.', probeResponse: 'A request to report a number does not establish improvement.', expectedEvidence: 'reporting versus outcome', assessment: 'The transfer uses a different case.' },
    calibration: {
      negatives: [{ exemplarId: 'BAD', verdict: 'REJECT', identifiedFailureFamilies: ['missingMechanism'], evidence: [{ excerpt: 'never explains what changed or how', locator: 'negative exemplar BAD' }] }],
      positive: { exemplarId: 'GOOD', verdict: 'PASS', strengthsRetained: ['connected explanation'], evidence: [{ excerpt: 'connects the request to what it does and does not establish', locator: 'positive exemplar GOOD' }] },
    },
    repairsRequired: pass ? [] : ['Obtain evidence for the unsupported outcome.'], unresolvedIssues: pass ? [] : ['Measured outcome is unsupported.'],
    learningDisposition: { disposition: pass ? 'NO_NEW_DEFECT' : 'EVIDENCE_GAP', rationale: pass ? 'No reusable defect was found in this producer assessment.' : 'The candidate needs evidence before independent review.' },
    humanEvidenceClaimed: false, independentAdmissionClaimed: false,
  };
}

function executor({ writer = storyOutput(), reviewVerdict = 'PASS', strengthenQualifiedClaim = false, throwSecret = false } = {}) {
  const calls = [];
  const execute = async (input) => {
    calls.push(input);
    if (throwSecret) throw new Error('PRIVATE TOKEN and private draft must not leak');
    const structured_output = calls.length === 1 ? writer : reviewOutput(JSON.parse(input.request.messages[1].content).artifact.exactStoryJson, reviewVerdict);
    if (calls.length === 2 && strengthenQualifiedClaim) structured_output.factualClaims[0].verdict = 'SUPPORTED';
    return { is_error: false, subtype: 'success', modelUsage: { 'claude-fable-5': {} }, structured_output };
  };
  return { execute, calls };
}

const base = { producerContractRaw, writerInput, researchPacket, storyFrame, makerPrincipal, producerRuntime: runtime() };
const captured = [];
const stdout = process.stdout.write.bind(process.stdout);
const stderr = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { captured.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { captured.push(String(chunk)); return true; });

try {
  const goodExecutor = executor();
  const good = await runHostedWriter({ ...base, execute: goodExecutor.execute });
  assert.equal(good.status, 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED');
  assert.equal(good.draftProduced, true);
  assert.equal(good.producerSelfReviewAssessmentPassed, true);
  assert.equal(good.canonicalProducerReceiptValidated, false);
  assert.equal(good.readyForIndependentReview, false);
  assert.equal(good.admissionAuthority, false);
  assert.equal(good.humanEvidenceClaimed, false);
  assert.equal(good.privateResult.story.status, 'hold');
  const schema = good.privateResult.writerRequest.outputSchema;
  assert.deepEqual(schema.properties.storyTypeCoverage.properties.overlays, { type: 'array', maxItems: 0 }, 'no overlays must be a valid empty-array schema, never enum: []');
  const checkEnums = value => { if (!value || typeof value !== 'object') return; if (Array.isArray(value.enum)) assert.ok(value.enum.length, 'JSON Schema forbids empty enums'); for (const child of Object.values(value)) checkEnums(child); };
  checkEnums(schema);
  assert.equal(schema.properties.claimMap.items.anyOf[0].properties.scopeAndFreshness.const, claims[0].scopeAndFreshness, 'provider schema preserves exact admitted scope');
  assert.equal(schema.properties.claimMap.items.anyOf[0].properties.status.const, claims[0].status);
  assert.equal(good.privateResult.producerSelfReviewAssessment.reviewerPrincipalId, makerPrincipal);
  assert.equal(goodExecutor.calls.length, 2, 'writer and producer self-review are separate isolated calls');
  const writerPayload = JSON.parse(goodExecutor.calls[0].request.messages[1].content);
  assert.equal(writerPayload.makerPrincipal, makerPrincipal);
  assert.equal(JSON.stringify(writerPayload).includes('unadmitted source bytes'), false, 'writer receives admitted research rather than unadmitted source text');
  const reviewPayload = JSON.parse(goodExecutor.calls[1].request.messages[1].content);
  assert.equal(reviewPayload.artifact.sha256, good.storySha256);
  assert.equal(reviewPayload.artifact.exactStoryJson, good.privateResult.storyRaw);
  assert.equal(reviewPayload.requiredOutcomes.length, outcomes.length);
  assert.equal(reviewPayload.requiredFailureFamilies.length, FAILURE_FAMILIES.length);
  assert.equal(JSON.stringify(good).includes(good.privateResult.story.headline), false, 'public result excludes private draft prose');

  const unsupportedExecutor = executor({ writer: storyOutput('unadmitted-claim') });
  const unsupported = await runHostedWriter({ ...base, execute: unsupportedExecutor.execute });
  assert.equal(unsupported.status, 'WRITER_OUTPUT_REJECTED');
  assert.ok(unsupported.privateResult.writerProvider, 'rejected actual output is retained privately for repair');
  assert.equal(JSON.stringify(unsupported).includes('writerProvider'), false);
  assert.equal(unsupportedExecutor.calls.length, 1, 'unsupported claim stops before producer self-review');

  const strengthenedExecutor = executor({ strengthenQualifiedClaim: true });
  const strengthened = await runHostedWriter({ ...base, execute: strengthenedExecutor.execute });
  assert.equal(strengthened.status, 'INVALID_PRODUCER_SELF_REVIEW', 'producer review cannot strengthen qualified research into support');

  const staleExecutor = executor();
  const stale = await runHostedWriter({ ...base, producerRuntime: runtime(['knownFailurePreflight registrySha256 is stale']), execute: staleExecutor.execute });
  assert.equal(stale.status, 'PRODUCER_CONTRACT_REJECTED');
  assert.equal(staleExecutor.calls.length, 0, 'stale contract stops before model execution');

  const holdExecutor = executor({ reviewVerdict: 'HOLD' });
  const held = await runHostedWriter({ ...base, execute: holdExecutor.execute });
  assert.equal(held.status, 'PRODUCER_SELF_REVIEW_REJECTED');
  assert.equal(held.readyForIndependentReview, false);
  assert.equal(held.nextRequiredStage, 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW');
  assert.equal(held.privateResult.producerSelfReviewAssessment.verdict, 'HOLD');

  const wrongMaker = await runHostedWriter({ ...base, makerPrincipal: 'openai:/root', execute: executor().execute });
  assert.equal(wrongMaker.status, 'INVALID_MAKER_PRINCIPAL');

  const secretExecutor = executor({ throwSecret: true });
  const failed = await runHostedWriter({ ...base, execute: secretExecutor.execute });
  assert.equal(failed.status, 'EXECUTION_ERROR');
  assert.equal(JSON.stringify(failed).includes('PRIVATE TOKEN'), false);
  assert.ok(failed.privateResult.writerRequest);
  assert.equal(failed.privateResult.executionFailure.code, 'EXECUTION_ERROR');
  assert.equal(captured.join(''), '', 'adapter logs no credentials, private research, draft, or review output');
} finally {
  process.stdout.write = stdout;
  process.stderr.write = stderr;
}

console.log('PASS newsstand-hosted-writer: current contract preflight, admitted-claim draft, exact-artifact producer review, truthful maker, and no admission shortcut');
