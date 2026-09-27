#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assembleHostedProducerPackage } from './assemble-newsstand-hosted-producer-package.mjs';

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stable = (value) => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'test-hosted-producer-package-'));
fs.chmodSync(root, 0o700);
const maker = 'anthropic:hosted-writer:package-test';
const story = {
  id: 'package-test', slug: 'package-test', edition: 'daily', status: 'hold', publishedAt: null,
  updatedAt: '2026-09-26T23:20:00Z', lastCheckedAt: '2026-09-26T23:20:00Z',
  sourceApproval: { status: 'independent-review-required', record: 'newsstand:source-approval:package-test' }, correction: null, correctionHistory: [], predecessorStoryIds: [], successorStoryIds: [], bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: 'A consultation asks companies to report resource use',
  heroVisual: { src: '/assets/newsstand/package-test.png', alt: 'Meters beside a reporting folder and a server room.', credit: 'Illustration: LAiDIES' },
  the_story: '<p>The consultation asks companies to report electricity and water use. It is not a rule in force.</p>',
  laidies_read: '<p>Disclosure means making information public. Reporting can support comparison; it does not prove a reduction.</p>',
  what_this_means: '<p>When you read a claim, ask whether it reports a request, a rule or a measured outcome.</p>',
  cocktail_party: '“The consultation requests reporting; it does not establish an environmental result.”',
  watch_fors: null, closing_note: null,
  class_notes: '<a href="/library.html#working-with-ai-101">Working with AI 101</a> helps you check the evidence behind a claim.',
  sources: [{ id: 'primary', label: 'Consultation notice', url: 'https://example.com/notice', publisherType: 'official-primary', accessedAt: '2026-09-26', approvalStatus: 'reviewed' }],
  aidb_credit: null, themes: ['public policy'], concepts: ['disclosure'], tags: ['policy'], saint_lane: null, badge: 'THE LATEST', retraction: null,
};
const storyRaw = `${JSON.stringify(story, null, 2)}\n`;
const contract = {
  schemaVersion: 'laidies-content-producer-contract.v1', candidateId: story.id, surface: 'NEWSSTAND_DAILY', contentClass: 'NEWS', producer: maker, status: 'READY_TO_DRAFT',
  readerContract: { humanQuestion: 'What changed?', promisedPayoff: 'Separate a request from a measured result.', priorKnowledge: 'None.', centralMentalModel: 'Reporting is evidence, not an outcome.', dailyLifeConnection: 'Reading a public claim.', surfaceJob: 'Daily explanation.', desiredFeeling: 'Clear.' },
  communicationDesign: { mode: 'PROPORTIONAL' },
  knownFailurePreflight: { registrySha256: '1'.repeat(64) },
};
const producerContractRaw = `${JSON.stringify(contract)}\n`;
const coverage = {
  schema: 'laidies.newsstand-story-type-coverage.v1', primaryType: 'legal-policy', overlays: [],
  universalAnswers: { whatHappened: 'The consultation asks companies to report electricity and water use.' },
  typeAnswers: { 'legal-policy': { legalStatus: 'It is not a rule in force.' } },
  translation: { schema: 'laidies.newsstand-reader-translation.v1', newsVersionExact: 'The consultation asks companies to report electricity and water use.', actualMeaningExact: 'It is not a rule in force.', mechanismExact: 'Reporting can support comparison; it does not prove a reduction.', familiarExampleExact: 'ask whether it reports a request, a rule or a measured outcome', jargon: [{ term: 'disclosure', plainMeaning: 'making information public' }], learningConnections: [{ concept: 'Evidence', learningPayoff: 'Check evidence.', disposition: 'link', destination: '/library.html#working-with-ai-101', recordPath: 'private/learning.json' }] },
};
const writerInput = { packet: { candidateId: story.id }, producerContract: { path: 'private/contract.json', sha256: sha256(producerContractRaw) }, bindings: [] };
const writerInputRaw = `${JSON.stringify(writerInput)}\n`;
const outcomes = ['plainClarity', 'readerValue', 'laidiesVoice', 'engagingEnjoyable', 'factualIntegrity', 'freshnessReviewability', 'surfaceFit', 'datedChange', 'consequenceAndUncertainty', 'dailyLifeConnection', 'communicationBenchmark', 'explainBack', 'unseenTransfer', 'usefulAction', 'analogyIntegrity'];
const artifactEvidence = [{ excerpt: 'The consultation asks companies to report electricity and water use.', locator: 'the_story' }];
const selfReview = {
  reviewerPrincipalId: maker, modelFamily: 'anthropic', artifactSha256: sha256(storyRaw), verdict: 'PASS',
  outcomes: outcomes.map((name) => ({ name, verdict: 'PASS', observation: `Actual model observation for ${name}.`, artifactEvidence })),
  failureFamilies: [{ name: 'missingMechanism', present: false, observation: 'The reporting mechanism is explicit.', artifactLocator: 'laidies_read' }],
  factualClaims: [{ claimId: 'request-status', verdict: 'QUALIFIED', observation: 'The claim preserves the request boundary.' }],
  readerAnswers: [{ questionId: 'change', answer: 'The consultation requests reporting.', artifactEvidence: 'The consultation asks companies to report electricity and water use.' }],
  termChecks: [{ term: 'disclosure', meaning: 'making information public', artifactEvidence: 'Disclosure means making information public.' }],
  explainBack: { evidenceType: 'PRODUCER_SIMULATION', prompt: 'Explain it.', probeResponse: 'A request for reporting is not proof of a reduction.', expectedEvidence: 'request versus outcome', assessment: 'The distinction is retained.' },
  unseenTransfer: { evidenceType: 'PRODUCER_SIMULATION', prompt: 'Apply it elsewhere.', probeResponse: 'A workplace reporting request does not establish improvement.', expectedEvidence: 'reporting versus result', assessment: 'The new case preserves the distinction.' },
  calibration: { negatives: [{ exemplarId: 'BAD', verdict: 'REJECT', identifiedFailureFamilies: ['missingMechanism'], evidence: [{ excerpt: 'bad example without a mechanism', locator: 'BAD' }] }], positive: { exemplarId: 'GOOD', verdict: 'PASS', strengthsRetained: ['connected explanation'], evidence: [{ excerpt: 'good connected explanation evidence', locator: 'GOOD' }] } },
  repairsRequired: [], unresolvedIssues: [], learningDisposition: { disposition: 'NO_NEW_DEFECT', rationale: 'No unresolved producer defect remains.' }, humanEvidenceClaimed: false, independentAdmissionClaimed: false,
};
const claimMap = [{ claimId: 'request-status', candidateEvidence: ['The consultation asks companies to report electricity and water use.', 'It is not a rule in force.'], sourceIds: ['primary'], status: 'QUALIFIED', scopeAndFreshness: 'Bound to the captured consultation.' }];
const writerOutput = { storyContent: { headline: story.headline }, claimMap, storyTypeCoverage: coverage };
const writerProvider = { is_error: false, subtype: 'success', modelUsage: { 'claude-fable-5': {} }, structured_output: writerOutput };
const reviewProvider = { is_error: false, subtype: 'success', modelUsage: { 'claude-fable-5': {} }, structured_output: selfReview };
const writerResult = {
  status: 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED', readyForIndependentReview: false, makerPrincipal: maker,
  storySha256: sha256(storyRaw), model: ['claude-fable-5'], writerRequestSha256: '2'.repeat(64), selfReviewRequestSha256: '3'.repeat(64),
};
Object.defineProperty(writerResult, 'privateResult', { value: { story, storyRaw, storyTypeCoverage: coverage, claimMap, writerOutput, producerSelfReviewAssessment: selfReview, writerProvider, reviewProvider } });
const sourceBindings = [{ sourceId: 'primary', url: 'https://example.com/notice', label: 'Consultation notice', publisherType: 'official-primary', observedAt: '2026-09-26T22:00:00Z', sha256: '4'.repeat(64), bytes: 100 }];
const claims = [{ claimId: 'request-status', claim: 'The notice requests reporting and is not a rule in force.', status: 'QUALIFIED', scopeAndFreshness: 'Bound to the captured consultation.', sourceEvidence: [{ sourceId: 'primary', sourceSha256: '4'.repeat(64), excerpt: 'The proposal asks companies to report electricity and water use.', occurrence: 1, support: 'QUALIFIED', qualification: 'The notice establishes a request, not compliance or an outcome.' }] }];
const limitations = ['The notice establishes a request, not an outcome.'];
const payload = { candidateId: story.id, sourceSetSha256: '5'.repeat(64), evidenceOutputSha256: '6'.repeat(64), sourceBindings, claims, limitations };
const admittedResearch = { schemaVersion: 'newsstand-hosted-admitted-research.v1', candidateId: story.id, decision: 'ADMIT_FOR_DRAFTING', researcherPrincipalId: 'anthropic:hosted-research-extractor:test', reviewer: { principalId: 'anthropic:hosted-research-reviewer:test', role: 'independent source and claim reviewer', independentFromResearcher: true }, reviewedAt: '2026-09-26T22:30:00Z', sourceSetSha256: payload.sourceSetSha256, evidenceOutputSha256: payload.evidenceOutputSha256, admittedPayloadSha256: sha256(stable(payload)), sourceBindings, claims, limitations };
const modelQualification = {
  schemaVersion: 'newsstand-hosted-model-qualification.v1', qualificationRunId: '36280285796', qualificationArtifact: { path: 'private/qualification.json', sha256: '7'.repeat(64) }, model: 'claude-fable-5', effort: 'medium', actualModels: ['claude-fable-5'],
  writerExecution: { startedAt: '2026-09-26T23:10:00Z', completedAt: '2026-09-26T23:12:00Z', writerProviderRawSha256: sha256(stable(writerProvider)), selfReviewProviderRawSha256: sha256(stable(reviewProvider)) },
};
const metrics = { schemaVersion: 'newsstand-hosted-producer-metrics.v1', reviewIssues: 0, reviewCycles: 1, repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, evidenceRounds: 2, evidenceGaps: 0 };
const plan = {
  root, outputDirectory: 'private/candidate-package', reviewMetricsPolicy: { path: 'policy.json', sha256: '8'.repeat(64) }, calibrationRegistry: { path: 'registry.json', sha256: '1'.repeat(64) },
  lineage: { kind: 'FIRST', noComparableReason: 'First synthetic package for this adapter test.' }, reviewBoundaryInstruction: 'Reject any claim that a request is a measured outcome.', correctionOwner: 'NewsStand product steward', nextTrigger: 'The consultation or source changes.',
  limitations: ['Producer AI assessment only; no observed human-comprehension evidence is claimed.'], heroVisualEvidence: {},
};
for (const [file, content] of [['policy.json', 'policy'], ['registry.json', 'registry'], ['private/qualification.json', 'qualification']]) {
  const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true, mode: 0o700 }); fs.writeFileSync(target, content, { mode: 0o600 });
}
plan.reviewMetricsPolicy.sha256 = sha256('policy');
plan.calibrationRegistry.sha256 = sha256('registry');
contract.knownFailurePreflight.registrySha256 = plan.calibrationRegistry.sha256;
modelQualification.qualificationArtifact.sha256 = sha256('qualification');
const reboundContractRaw = `${JSON.stringify(contract)}\n`;
writerInput.producerContract.sha256 = sha256(reboundContractRaw);
const reboundWriterInputRaw = `${JSON.stringify(writerInput)}\n`;
const calls = [];
function runtime(failure = null) {
  return {
    schemaVersion: 'newsstand-hosted-package-runtime.v1',
    checks: { strictProducerContractSha256: '9'.repeat(64), preparedDraftSha256: 'a'.repeat(64), storyCoverageSha256: 'b'.repeat(64), proseReviewSha256: 'c'.repeat(64) },
    inspectStrictProducerContract: (value) => { calls.push('contract'); assert.equal(value.producer, maker); return { errors: failure === 'contract' ? ['stale contract'] : [] }; },
    inspectPreparedDraft: (storyValue, input, observations) => { calls.push('prepared'); assert.equal(input.producerContract.sha256, sha256(reboundContractRaw)); assert.equal(observations.readerAnswers.change, 'The consultation asks companies to report electricity and water use.'); return { errors: failure === 'prepared' ? ['missing actual reader answer'] : [] }; },
    validateStoryTypeCoverage: (value) => { calls.push('coverage'); assert.equal(value.universalAnswers.whatHappened, coverage.universalAnswers.whatHappened); return failure === 'coverage' ? ['coverage failed'] : []; },
    inspectProseQualityReview: (receipt) => { calls.push('prose'); assert.equal(receipt.outcomes.plainClarity.observation, 'Actual model observation for plainClarity.'); assert.equal(receipt.calibration.negatives[0], selfReview.calibration.negatives[0]); return { errors: failure === 'prose' ? ['receipt failed'] : [] }; },
  };
}

const captured = [];
const out = process.stdout.write.bind(process.stdout);
const err = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { captured.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { captured.push(String(chunk)); return true; });
try {
  const result = assembleHostedProducerPackage({ writerResult, producerContractRaw: reboundContractRaw, writerInputRaw: reboundWriterInputRaw, admittedResearch, packagePlan: plan, metrics, modelQualification, runtime: runtime() });
  assert.equal(result.status, 'PRODUCER_PACKAGE_READY');
  assert.equal(result.readyForIndependentReview, true);
  assert.deepEqual(calls, ['contract', 'prepared', 'coverage', 'prose']);
  assert.equal(fs.statSync(path.join(root, result.bindings.producerReview.path)).mode & 0o077, 0);
  const review = JSON.parse(fs.readFileSync(path.join(root, result.bindings.producerReview.path)));
  assert.equal(review.outcomes.explainBack.simulatedReaderProbe.probeResponse, selfReview.explainBack.probeResponse);
  assert.equal(review.factualReview.claimMap[0].status, 'QUALIFIED');
  const writtenCoverage = JSON.parse(fs.readFileSync(path.join(root, result.bindings.coverage.path)));
  assert.deepEqual(writtenCoverage, coverage, 'story coverage comes from actual writer output');
  assert.equal(JSON.stringify(result).includes(story.the_story), false, 'public result excludes private prose');

  const missingReview = { ...writerResult };
  Object.defineProperty(missingReview, 'privateResult', { value: { ...writerResult.privateResult, producerSelfReviewAssessment: { ...selfReview, calibration: undefined } } });
  const denied = assembleHostedProducerPackage({ writerResult: missingReview, producerContractRaw: reboundContractRaw, writerInputRaw: reboundWriterInputRaw, admittedResearch, packagePlan: { ...plan, outputDirectory: 'private/missing-review' }, metrics, modelQualification, runtime: runtime() });
  assert.equal(denied.status, 'WRITER_OR_BINDING_REJECTED', 'canonical PASS cannot be authored without actual self-review calibration');

  const failed = assembleHostedProducerPackage({ writerResult, producerContractRaw: reboundContractRaw, writerInputRaw: reboundWriterInputRaw, admittedResearch, packagePlan: { ...plan, outputDirectory: 'private/failed-check' }, metrics, modelQualification, runtime: runtime('prose') });
  assert.equal(failed.status, 'PRODUCER_PACKAGE_CHECK_FAILED');
  assert.match(failed.checkErrors.join('\n'), /proseReview:receipt failed/);
  assert.equal(failed.readyForIndependentReview, false);

  const repeat = assembleHostedProducerPackage({ writerResult, producerContractRaw: reboundContractRaw, writerInputRaw: reboundWriterInputRaw, admittedResearch, packagePlan: plan, metrics, modelQualification, runtime: runtime() });
  assert.equal(repeat.status, 'UNSAFE_OR_EXISTING_OUTPUT', 'existing package is preserved rather than overwritten');
  assert.equal(captured.join(''), '', 'assembler logs no prose, source evidence, model raw output or token');
} finally {
  process.stdout.write = out;
  process.stderr.write = err;
  fs.rmSync(root, { recursive: true, force: true });
}
console.log('PASS hosted producer package: actual model coverage/self-review, exact bindings, canonical records, four runtime gates, no fabricated PASS');
