#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectContentProducerContract } from './check-content-producer-contract.mjs';
import { FAILURE_FAMILIES } from './check-prose-quality-admission.mjs';
import {
  createHostedProtocolExecutor,
  HOSTED_PROTOCOL_EFFORT,
  HOSTED_PROTOCOL_MODEL,
} from './execute-newsstand-hosted-protocol.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECKER_PATH = path.join(ROOT, 'scripts/check-content-producer-contract.mjs');
const SHA256 = /^[a-f0-9]{64}$/;
const SAFE_ID = /^[a-zA-Z0-9_-]{1,120}$/;
const MAKER = /^anthropic:hosted-writer:[a-zA-Z0-9._-]{1,160}$/;
const STORY_FIELDS = ['headline', 'the_story', 'laidies_read', 'what_this_means', 'cocktail_party', 'class_notes'];
const NEWS_OUTCOMES = [
  'plainClarity', 'readerValue', 'laidiesVoice', 'engagingEnjoyable', 'factualIntegrity',
  'freshnessReviewability', 'surfaceFit', 'datedChange', 'consequenceAndUncertainty',
  'dailyLifeConnection', 'communicationBenchmark', 'explainBack', 'unseenTransfer',
  'usefulAction', 'analogyIntegrity',
];

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stable = (value) => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(',')}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, maximum = 20_000) => typeof value === 'string' && value.trim().length > 0 && value.length <= maximum;
const exactKeys = (value, keys) => isObject(value) && Object.keys(value).sort().join(',') === [...keys].sort().join(',');

export const CURRENT_PRODUCER_CHECKER_SHA256 = sha256(fs.readFileSync(CHECKER_PATH));

export const HOSTED_WRITER_OUTPUT_SCHEMA = Object.freeze({
  type: 'object',
  additionalProperties: false,
  required: ['storyContent', 'claimMap', 'storyTypeCoverage'],
  properties: {
    storyContent: {
      type: 'object',
      additionalProperties: false,
      required: [...STORY_FIELDS, 'watch_fors', 'closing_note', 'themes', 'concepts', 'tags'],
      properties: {
        headline: { type: 'string', minLength: 1 },
        the_story: { type: 'string', minLength: 1 },
        laidies_read: { type: 'string', minLength: 1 },
        what_this_means: { type: 'string', minLength: 1 },
        cocktail_party: { type: 'string', minLength: 1 },
        class_notes: { type: 'string', minLength: 1 },
        watch_fors: { type: ['string', 'null'] },
        closing_note: { type: ['string', 'null'] },
        themes: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
        concepts: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
        tags: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
      },
    },
    claimMap: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['claimId', 'candidateEvidence', 'sourceIds', 'status', 'scopeAndFreshness'],
        properties: {
          claimId: { type: 'string', minLength: 1 },
          candidateEvidence: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
          sourceIds: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
          status: { enum: ['VERIFIED', 'QUALIFIED'] },
          scopeAndFreshness: { type: 'string', minLength: 1 },
        },
      },
    },
    storyTypeCoverage: { type: 'object' },
  },
});

function schemaFromTemplate(value, { constants = false } = {}) {
  if (typeof value === 'string') return constants ? { const: value } : { type: 'string', minLength: 1 };
  if (typeof value === 'boolean') return { const: value };
  if (typeof value === 'number') return { type: 'number' };
  if (Array.isArray(value)) {
    if (constants && value.every((item) => typeof item === 'string')) return { type: 'array', minItems: value.length, maxItems: value.length, items: { enum: value } };
    return { type: 'array', minItems: value.length, ...(value.length ? { items: schemaFromTemplate(value[0]) } : {}) };
  }
  if (!isObject(value)) return {};
  const keys = Object.keys(value);
  return {
    type: 'object', additionalProperties: false, required: keys,
    properties: Object.fromEntries(keys.map((key) => [key, schemaFromTemplate(value[key], { constants: ['schema', 'primaryType', 'overlays'].includes(key) })])),
  };
}

function writerOutputSchema(reportingFrame) {
  return {
    ...HOSTED_WRITER_OUTPUT_SCHEMA,
    properties: { ...HOSTED_WRITER_OUTPUT_SCHEMA.properties, storyTypeCoverage: schemaFromTemplate(reportingFrame) },
  };
}

const WRITER_SYSTEM_PROMPT = `You are the named hosted LAiDIES NewsStand producer. Create one complete ordinary Daily story for smart professional women with no technical AI background. Follow the supplied valid producer contract and writer guidance. The independently admitted research packet is the only factual authority. Do not use memory, browse, infer a missing citation, strengthen QUALIFIED evidence, or add a factual assertion that is absent from the admitted claim set.

Return the public story content, an exhaustive map of every material factual claim used, and fresh answers for the supplied story-type coverage structure. The coverage translations and term meanings must be exact excerpts from your public prose; preserve the selected type, overlays and learning destination. Candidate evidence must be an exact excerpt from the returned public prose, and every claimId and sourceId must come from the admitted research. Preserve uncertainty, distinguish a request or disclosure promise from an accomplished outcome, explain necessary terms in context, answer the contracted reader questions, and use the exact supplied learning destination. Do not claim publication, independent admission, observed human evidence, or producer self-review. A separate isolated call reads the exact finished artifact and performs the producer self-review plus calibration against the supplied positive and negative exemplars.`;

function selfReviewSchema(outcomes, families, calibrationMaterials) {
  return {
    type: 'object', additionalProperties: false,
    required: ['reviewerPrincipalId', 'modelFamily', 'artifactSha256', 'verdict', 'outcomes', 'failureFamilies', 'factualClaims', 'readerAnswers', 'termChecks', 'explainBack', 'unseenTransfer', 'calibration', 'repairsRequired', 'unresolvedIssues', 'learningDisposition', 'humanEvidenceClaimed', 'independentAdmissionClaimed'],
    properties: {
      reviewerPrincipalId: { type: 'string', minLength: 1 },
      modelFamily: { const: 'anthropic' },
      artifactSha256: { type: 'string', pattern: '^[a-f0-9]{64}$' },
      verdict: { enum: ['PASS', 'HOLD', 'REJECT'] },
      outcomes: { type: 'array', minItems: outcomes.length, maxItems: outcomes.length, items: { type: 'object', additionalProperties: false, required: ['name', 'verdict', 'observation', 'artifactEvidence'], properties: { name: { enum: outcomes }, verdict: { enum: ['PASS', 'HOLD', 'FAIL'] }, observation: { type: 'string', minLength: 1 }, artifactEvidence: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['excerpt', 'locator'], properties: { excerpt: { type: 'string', minLength: 1 }, locator: { type: 'string', minLength: 1 } } } } } } },
      failureFamilies: { type: 'array', minItems: families.length, maxItems: families.length, items: { type: 'object', additionalProperties: false, required: ['name', 'present', 'observation', 'artifactLocator'], properties: { name: { enum: families }, present: { type: 'boolean' }, observation: { type: 'string', minLength: 1 }, artifactLocator: { type: 'string', minLength: 1 } } } },
      factualClaims: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['claimId', 'verdict', 'observation'], properties: { claimId: { type: 'string', minLength: 1 }, verdict: { enum: ['SUPPORTED', 'QUALIFIED', 'GAP'] }, observation: { type: 'string', minLength: 1 } } } },
      readerAnswers: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['questionId', 'answer', 'artifactEvidence'], properties: { questionId: { type: 'string', minLength: 1 }, answer: { type: 'string', minLength: 1 }, artifactEvidence: { type: 'string', minLength: 1 } } } },
      termChecks: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['term', 'meaning', 'artifactEvidence'], properties: { term: { type: 'string', minLength: 1 }, meaning: { type: 'string', minLength: 1 }, artifactEvidence: { type: 'string', minLength: 1 } } } },
      explainBack: { type: 'object', additionalProperties: false, required: ['evidenceType', 'prompt', 'probeResponse', 'expectedEvidence', 'assessment'], properties: { evidenceType: { const: 'PRODUCER_SIMULATION' }, prompt: { type: 'string', minLength: 1 }, probeResponse: { type: 'string', minLength: 1 }, expectedEvidence: { type: 'string', minLength: 1 }, assessment: { type: 'string', minLength: 1 } } },
      unseenTransfer: { type: 'object', additionalProperties: false, required: ['evidenceType', 'prompt', 'probeResponse', 'expectedEvidence', 'assessment'], properties: { evidenceType: { const: 'PRODUCER_SIMULATION' }, prompt: { type: 'string', minLength: 1 }, probeResponse: { type: 'string', minLength: 1 }, expectedEvidence: { type: 'string', minLength: 1 }, assessment: { type: 'string', minLength: 1 } } },
      calibration: {
        type: 'object', additionalProperties: false, required: ['negatives', 'positive'], properties: {
          negatives: {
            type: 'array', minItems: calibrationMaterials.negatives.length, maxItems: calibrationMaterials.negatives.length,
            items: {
              type: 'object', additionalProperties: false, required: ['exemplarId', 'verdict', 'identifiedFailureFamilies', 'evidence'],
              properties: {
                exemplarId: { enum: calibrationMaterials.negatives.map((item) => item.exemplarId) },
                verdict: { const: 'REJECT' },
                identifiedFailureFamilies: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
                evidence: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['excerpt', 'locator'], properties: { excerpt: { type: 'string', minLength: 15 }, locator: { type: 'string', minLength: 1 } } } },
              },
            },
          },
          positive: {
            type: 'object', additionalProperties: false, required: ['exemplarId', 'verdict', 'strengthsRetained', 'evidence'],
            properties: {
              exemplarId: { const: calibrationMaterials.positive.exemplarId },
              verdict: { const: 'PASS' },
              strengthsRetained: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
              evidence: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['excerpt', 'locator'], properties: { excerpt: { type: 'string', minLength: 15 }, locator: { type: 'string', minLength: 1 } } } },
            },
          },
        },
      },
      repairsRequired: { type: 'array', items: { type: 'string', minLength: 1 } },
      unresolvedIssues: { type: 'array', items: { type: 'string', minLength: 1 } },
      learningDisposition: { type: 'object', additionalProperties: false, required: ['disposition', 'rationale'], properties: { disposition: { enum: ['NO_NEW_DEFECT', 'CANDIDATE_REPAIR_ONLY', 'EVIDENCE_GAP'] }, rationale: { type: 'string', minLength: 1 } } },
      humanEvidenceClaimed: { const: false },
      independentAdmissionClaimed: { const: false },
    },
  };
}

function publicResult(status, extra = {}) {
  return {
    status,
    draftProduced: ['PRODUCER_SELF_REVIEW_REJECTED', 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED'].includes(status),
    producerSelfReviewAssessmentPassed: status === 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED',
    canonicalProducerReceiptValidated: false,
    readyForIndependentReview: false,
    admissionAuthority: false,
    publicationActionTaken: false,
    humanEvidenceClaimed: false,
    ...extra,
  };
}

function defaultRuntime() {
  return {
    schemaVersion: 'newsstand-hosted-producer-runtime.v1',
    checkerPath: 'scripts/check-content-producer-contract.mjs',
    checkerSha256: CURRENT_PRODUCER_CHECKER_SHA256,
    inspect: (contract) => inspectContentProducerContract(contract, { root: ROOT }),
  };
}

function validateRuntime(runtime) {
  return isObject(runtime)
    && runtime.schemaVersion === 'newsstand-hosted-producer-runtime.v1'
    && runtime.checkerPath === 'scripts/check-content-producer-contract.mjs'
    && runtime.checkerSha256 === CURRENT_PRODUCER_CHECKER_SHA256
    && typeof runtime.inspect === 'function';
}

function parseContract(raw, writerInput, makerPrincipal, runtime) {
  if (typeof raw !== 'string' || !validateRuntime(runtime)) return null;
  let contract;
  try { contract = JSON.parse(raw); } catch { return null; }
  let inspection;
  try { inspection = runtime.inspect(contract); } catch { return null; }
  if (!inspection || !Array.isArray(inspection.errors) || inspection.errors.length
    || inspection.status !== 'READY_TO_DRAFT'
    || contract.status !== 'READY_TO_DRAFT'
    || contract.contentClass !== 'NEWS'
    || contract.surface !== 'NEWSSTAND_DAILY'
    || contract.producer !== makerPrincipal
    || writerInput?.producerContract?.sha256 !== sha256(raw)
    || typeof writerInput?.producerContract?.path !== 'string') return null;
  return contract;
}

function validateWriterInput(writerInput, candidateId) {
  if (!isObject(writerInput) || !isObject(writerInput.packet)
    || writerInput.packet.schemaVersion !== 'laidies-newsstand-writer-input.v1'
    || writerInput.packet.candidateId !== candidateId
    || !Array.isArray(writerInput.bindings)
    || writerInput.bindings.some((binding) => !text(binding?.path) || !SHA256.test(binding?.sha256 ?? ''))
    || !text(writerInput.packet.method)
    || !isObject(writerInput.packet.reader)
    || !isObject(writerInput.packet.explanationPlan)
    || !isObject(writerInput.packet.communication)
    || !isObject(writerInput.packet.prevention)
    || !Array.isArray(writerInput.packet.positiveExamples)
    || !Array.isArray(writerInput.packet.negativeExamples)) return false;
  return true;
}

function validateFrame(frame, candidateId) {
  if (!exactKeys(frame, ['schemaVersion', 'candidateId', 'slug', 'producedAt', 'heroVisual', 'sourceApprovalRecord', 'learningDestination', 'badge', 'predecessorStoryIds'])
    || frame.schemaVersion !== 'newsstand-hosted-story-frame.v1'
    || frame.candidateId !== candidateId
    || !SAFE_ID.test(frame.slug ?? '')
    || !text(frame.producedAt)
    || !Number.isFinite(Date.parse(frame.producedAt))
    || !exactKeys(frame.heroVisual, ['src', 'alt', 'credit'])
    || !/^\/assets\/newsstand\/[a-zA-Z0-9._/-]+$/.test(frame.heroVisual.src ?? '')
    || !text(frame.heroVisual.alt)
    || frame.heroVisual.alt.length < 15
    || !text(frame.heroVisual.credit)
    || !text(frame.sourceApprovalRecord)
    || !exactKeys(frame.learningDestination, ['href', 'label'])
    || !/^\/[a-zA-Z0-9._~!$&'()*+,;=:@%/?#-]+$/.test(frame.learningDestination.href ?? '')
    || !text(frame.learningDestination.label)
    || !text(frame.badge, 80)
    || !Array.isArray(frame.predecessorStoryIds)
    || frame.predecessorStoryIds.some((id) => !SAFE_ID.test(id))) return false;
  return true;
}

function sameShape(actual, template) {
  if (typeof template === 'string') return text(actual);
  if (typeof template === 'number') return typeof actual === 'number' && Number.isFinite(actual);
  if (typeof template === 'boolean') return actual === template;
  if (Array.isArray(template)) return Array.isArray(actual) && actual.length >= template.length && (template.length === 0 || actual.every((item) => sameShape(item, template[0])));
  if (!isObject(template)) return actual === template;
  return exactKeys(actual, Object.keys(template)) && Object.keys(template).every((key) => sameShape(actual[key], template[key]));
}

function validateCoverage(coverage, frame, publicText) {
  if (!sameShape(coverage, frame)
    || coverage.schema !== frame.schema
    || coverage.primaryType !== frame.primaryType
    || stable(coverage.overlays) !== stable(frame.overlays)) return false;
  for (const field of ['newsVersionExact', 'actualMeaningExact', 'mechanismExact', 'familiarExampleExact']) {
    if (!publicText.includes(coverage.translation?.[field] ?? '')) return false;
  }
  for (const [index, item] of (coverage.translation?.jargon ?? []).entries()) {
    if (item.term !== frame.translation?.jargon?.[index]?.term || !publicText.includes(item.plainMeaning ?? '')) return false;
  }
  for (const [index, item] of (coverage.translation?.learningConnections ?? []).entries()) {
    const planned = frame.translation?.learningConnections?.[index];
    if (!planned || ['concept', 'disposition', 'destination', 'recordPath'].some((field) => item[field] !== planned[field])) return false;
  }
  return true;
}

function calibrationMaterials(contract, writerInput) {
  const negativeIds = contract.knownFailurePreflight?.negativeExemplarIds;
  const negatives = writerInput.packet?.negativeExamples;
  const positives = writerInput.packet?.positiveExamples;
  if (!Array.isArray(negativeIds) || !Array.isArray(negatives) || negativeIds.length !== negatives.length
    || !Array.isArray(positives) || positives.length !== contract.positiveExemplars?.length || positives.length !== 1) return null;
  return {
    negatives: negativeIds.map((exemplarId, index) => ({ exemplarId, failureFamilies: negatives[index].failureFamilies, artifact: negatives[index].artifact })),
    positive: { exemplarId: contract.positiveExemplars[0].id, artifact: positives[0].artifact, strengths: contract.positiveExemplars[0].strengthsToUse },
  };
}

function validateResearch(packet, candidateId, makerPrincipal) {
  const rootKeys = ['schemaVersion', 'candidateId', 'decision', 'researcherPrincipalId', 'reviewer', 'reviewedAt', 'sourceSetSha256', 'evidenceOutputSha256', 'admittedPayloadSha256', 'sourceBindings', 'claims', 'limitations'];
  if (!exactKeys(packet, rootKeys)
    || packet.schemaVersion !== 'newsstand-hosted-admitted-research.v1'
    || packet.candidateId !== candidateId
    || packet.decision !== 'ADMIT_FOR_DRAFTING'
    || !text(packet.researcherPrincipalId)
    || !exactKeys(packet.reviewer, ['principalId', 'role', 'independentFromResearcher'])
    || !text(packet.reviewer.principalId)
    || !text(packet.reviewer.role)
    || packet.reviewer.independentFromResearcher !== true
    || packet.reviewer.principalId === packet.researcherPrincipalId
    || packet.reviewer.principalId === makerPrincipal
    || !Number.isFinite(Date.parse(packet.reviewedAt))
    || !SHA256.test(packet.sourceSetSha256 ?? '')
    || !SHA256.test(packet.evidenceOutputSha256 ?? '')
    || !SHA256.test(packet.admittedPayloadSha256 ?? '')
    || !Array.isArray(packet.sourceBindings)
    || packet.sourceBindings.length === 0
    || !Array.isArray(packet.claims)
    || packet.claims.length === 0
    || !Array.isArray(packet.limitations)) return null;

  const sources = new Map();
  for (const source of packet.sourceBindings) {
    if (!exactKeys(source, ['sourceId', 'url', 'label', 'publisherType', 'observedAt', 'sha256', 'bytes'])
      || !SAFE_ID.test(source.sourceId ?? '')
      || sources.has(source.sourceId)
      || !text(source.url)
      || !text(source.label)
      || !text(source.publisherType)
      || !Number.isFinite(Date.parse(source.observedAt))
      || !SHA256.test(source.sha256 ?? '')
      || !Number.isInteger(source.bytes)
      || source.bytes < 1) return null;
    try { if (new URL(source.url).protocol !== 'https:') return null; } catch { return null; }
    sources.set(source.sourceId, source);
  }
  const claims = new Map();
  for (const claim of packet.claims) {
    if (!exactKeys(claim, ['claimId', 'claim', 'status', 'scopeAndFreshness', 'sourceEvidence'])
      || !SAFE_ID.test(claim.claimId ?? '')
      || claims.has(claim.claimId)
      || !text(claim.claim)
      || !['VERIFIED', 'QUALIFIED'].includes(claim.status)
      || !text(claim.scopeAndFreshness)
      || !Array.isArray(claim.sourceEvidence)
      || claim.sourceEvidence.length === 0) return null;
    for (const evidence of claim.sourceEvidence) {
      const source = sources.get(evidence?.sourceId);
      if (!exactKeys(evidence, ['sourceId', 'sourceSha256', 'excerpt', 'occurrence', 'support', 'qualification'])
        || !source
        || evidence.sourceSha256 !== source.sha256
        || !text(evidence.excerpt, 4_000)
        || !Number.isInteger(evidence.occurrence)
        || evidence.occurrence < 1
        || !['DIRECT', 'QUALIFIED'].includes(evidence.support)
        || !text(evidence.qualification)) return null;
    }
    claims.set(claim.claimId, claim);
  }
  const admittedPayload = {
    candidateId: packet.candidateId,
    sourceSetSha256: packet.sourceSetSha256,
    evidenceOutputSha256: packet.evidenceOutputSha256,
    sourceBindings: packet.sourceBindings,
    claims: packet.claims,
    limitations: packet.limitations,
  };
  if (sha256(stable(admittedPayload)) !== packet.admittedPayloadSha256) return null;
  return { sources, claims };
}

function validateProvider(provider) {
  if (!isObject(provider) || provider.is_error !== false || provider.subtype !== 'success'
    || !isObject(provider.modelUsage) || !isObject(provider.structured_output)) return null;
  const models = Object.keys(provider.modelUsage);
  if (!models.includes(HOSTED_PROTOCOL_MODEL) || models.some((model) => !model.startsWith('claude-'))) return null;
  return models;
}

function publicProse(story) {
  return STORY_FIELDS.map((field) => story[field] ?? '').join('\n') + `\n${story.watch_fors ?? ''}\n${story.closing_note ?? ''}`;
}

function validateWriterOutput(output, contract, research, frame, reportingFrame) {
  if (!exactKeys(output, ['storyContent', 'claimMap', 'storyTypeCoverage'])
    || !exactKeys(output.storyContent, [...STORY_FIELDS, 'watch_fors', 'closing_note', 'themes', 'concepts', 'tags'])
    || output.storyContent.headline.includes('<')
    || STORY_FIELDS.some((field) => !text(output.storyContent[field]))
    || ![output.storyContent.watch_fors, output.storyContent.closing_note].every((value) => value === null || text(value))
    || !['themes', 'concepts', 'tags'].every((field) => Array.isArray(output.storyContent[field]) && output.storyContent[field].length > 0 && output.storyContent[field].every((value) => text(value, 100)))
    || !output.storyContent.class_notes.includes(frame.learningDestination.href)
    || !output.storyContent.class_notes.includes(frame.learningDestination.label)
    || /\b(?:TODO|TBD|INSERT SOURCE|INTERNAL NOTE)\b/i.test(publicProse(output.storyContent))
    || !Array.isArray(output.claimMap)
    || output.claimMap.length === 0) return null;

  const prose = publicProse(output.storyContent);
  if (!validateCoverage(output.storyTypeCoverage, reportingFrame, prose)) return null;
  const wordCount = prose.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 100 || wordCount > 2_000) return null;
  const usedClaims = new Set();
  for (const item of output.claimMap) {
    const admitted = research.claims.get(item?.claimId);
    if (!exactKeys(item, ['claimId', 'candidateEvidence', 'sourceIds', 'status', 'scopeAndFreshness'])
      || !admitted
      || usedClaims.has(item.claimId)
      || item.status !== admitted.status
      || item.scopeAndFreshness !== admitted.scopeAndFreshness
      || !Array.isArray(item.candidateEvidence)
      || item.candidateEvidence.length === 0
      || item.candidateEvidence.some((excerpt) => !text(excerpt) || excerpt.length < 10 || !prose.includes(excerpt))
      || !Array.isArray(item.sourceIds)
      || item.sourceIds.length === 0) return null;
    const admittedSources = new Set(admitted.sourceEvidence.map((evidence) => evidence.sourceId));
    if (new Set(item.sourceIds).size !== item.sourceIds.length || item.sourceIds.some((id) => !admittedSources.has(id))) return null;
    usedClaims.add(item.claimId);
  }
  for (const question of contract.draftArchitecture?.readerQuestions ?? []) {
    if (!SAFE_ID.test(question?.id ?? '') || !text(question?.question)) return null;
  }
  return output;
}

function assembleStory(content, frame, researchPacket) {
  return {
    id: frame.candidateId,
    slug: frame.slug,
    edition: 'daily',
    status: 'hold',
    publishedAt: null,
    updatedAt: frame.producedAt,
    lastCheckedAt: frame.producedAt,
    sourceApproval: { status: 'independent-review-required', record: frame.sourceApprovalRecord },
    correction: null,
    correctionHistory: [],
    predecessorStoryIds: frame.predecessorStoryIds,
    successorStoryIds: [],
    bigPicture: null,
    thread: null,
    thread_subtitle: null,
    thread_entry: null,
    headline: content.headline,
    heroVisual: frame.heroVisual,
    the_story: content.the_story,
    laidies_read: content.laidies_read,
    what_this_means: content.what_this_means,
    cocktail_party: content.cocktail_party,
    watch_fors: content.watch_fors,
    closing_note: content.closing_note,
    class_notes: content.class_notes,
    sources: researchPacket.sourceBindings.map((source) => ({
      id: source.sourceId,
      label: source.label,
      url: source.url,
      publisherType: source.publisherType,
      accessedAt: source.observedAt.slice(0, 10),
      approvalStatus: 'reviewed',
    })),
    aidb_credit: null,
    themes: content.themes,
    concepts: content.concepts,
    tags: content.tags,
    saint_lane: null,
    badge: frame.badge,
    retraction: null,
  };
}

function evidenceInArtifact(evidence, raw) {
  return Array.isArray(evidence)
    && evidence.length > 0
    && evidence.every((item) => exactKeys(item, ['excerpt', 'locator']) && text(item.excerpt) && text(item.locator) && raw.includes(item.excerpt));
}

function validateSelfReview(output, { makerPrincipal, artifactSha256, artifactRaw, outcomes, families, claimStatuses, questions, terms, calibration }) {
  if (!exactKeys(output, ['reviewerPrincipalId', 'modelFamily', 'artifactSha256', 'verdict', 'outcomes', 'failureFamilies', 'factualClaims', 'readerAnswers', 'termChecks', 'explainBack', 'unseenTransfer', 'calibration', 'repairsRequired', 'unresolvedIssues', 'learningDisposition', 'humanEvidenceClaimed', 'independentAdmissionClaimed'])
    || output.reviewerPrincipalId !== makerPrincipal
    || output.modelFamily !== 'anthropic'
    || output.artifactSha256 !== artifactSha256
    || !['PASS', 'HOLD', 'REJECT'].includes(output.verdict)
    || output.humanEvidenceClaimed !== false
    || output.independentAdmissionClaimed !== false
    || !Array.isArray(output.repairsRequired)
    || !Array.isArray(output.unresolvedIssues)
    || !exactKeys(output.learningDisposition, ['disposition', 'rationale'])
    || !['NO_NEW_DEFECT', 'CANDIDATE_REPAIR_ONLY', 'EVIDENCE_GAP'].includes(output.learningDisposition.disposition)
    || !text(output.learningDisposition.rationale)) return null;

  const outcomeMap = new Map();
  for (const item of output.outcomes ?? []) {
    if (!exactKeys(item, ['name', 'verdict', 'observation', 'artifactEvidence']) || outcomeMap.has(item.name)
      || !outcomes.includes(item.name) || !['PASS', 'HOLD', 'FAIL'].includes(item.verdict)
      || !text(item.observation) || !evidenceInArtifact(item.artifactEvidence, artifactRaw)) return null;
    outcomeMap.set(item.name, item);
  }
  const familyMap = new Map();
  for (const item of output.failureFamilies ?? []) {
    if (!exactKeys(item, ['name', 'present', 'observation', 'artifactLocator']) || familyMap.has(item.name)
      || !families.includes(item.name) || typeof item.present !== 'boolean' || !text(item.observation) || !text(item.artifactLocator)) return null;
    familyMap.set(item.name, item);
  }
  const factualMap = new Map();
  for (const item of output.factualClaims ?? []) {
    if (!exactKeys(item, ['claimId', 'verdict', 'observation']) || factualMap.has(item.claimId)
      || !claimStatuses.has(item.claimId)
      || !['SUPPORTED', 'QUALIFIED', 'GAP'].includes(item.verdict)
      || (claimStatuses.get(item.claimId) === 'QUALIFIED' && item.verdict === 'SUPPORTED')
      || !text(item.observation)) return null;
    factualMap.set(item.claimId, item);
  }
  const answerMap = new Map();
  for (const item of output.readerAnswers ?? []) {
    if (!exactKeys(item, ['questionId', 'answer', 'artifactEvidence']) || answerMap.has(item.questionId)
      || !questions.includes(item.questionId) || !text(item.answer) || !text(item.artifactEvidence) || !artifactRaw.includes(item.artifactEvidence)) return null;
    answerMap.set(item.questionId, item);
  }
  const termMap = new Map();
  for (const item of output.termChecks ?? []) {
    if (!exactKeys(item, ['term', 'meaning', 'artifactEvidence']) || termMap.has(item.term)
      || !terms.includes(item.term) || !text(item.meaning) || !text(item.artifactEvidence) || !artifactRaw.includes(item.artifactEvidence)) return null;
    termMap.set(item.term, item);
  }
  for (const probe of [output.explainBack, output.unseenTransfer]) {
    if (!exactKeys(probe, ['evidenceType', 'prompt', 'probeResponse', 'expectedEvidence', 'assessment'])
      || probe.evidenceType !== 'PRODUCER_SIMULATION'
      || !['prompt', 'probeResponse', 'expectedEvidence', 'assessment'].every((field) => text(probe[field]))) return null;
  }
  if (!exactKeys(output.calibration, ['negatives', 'positive'])
    || !Array.isArray(output.calibration.negatives)
    || output.calibration.negatives.length !== calibration.negatives.length
    || !exactKeys(output.calibration.positive, ['exemplarId', 'verdict', 'strengthsRetained', 'evidence'])
    || output.calibration.positive.exemplarId !== calibration.positive.exemplarId
    || output.calibration.positive.verdict !== 'PASS'
    || !Array.isArray(output.calibration.positive.strengthsRetained)
    || output.calibration.positive.strengthsRetained.length === 0
    || !evidenceInArtifact(output.calibration.positive.evidence, stable(calibration.positive.artifact))) return null;
  const calibratedNegatives = new Map();
  for (const item of output.calibration.negatives) {
    const material = calibration.negatives.find((entry) => entry.exemplarId === item?.exemplarId);
    if (!material || calibratedNegatives.has(item.exemplarId)
      || !exactKeys(item, ['exemplarId', 'verdict', 'identifiedFailureFamilies', 'evidence'])
      || item.verdict !== 'REJECT'
      || !Array.isArray(item.identifiedFailureFamilies)
      || !material.failureFamilies.every((family) => item.identifiedFailureFamilies.includes(family))
      || !evidenceInArtifact(item.evidence, stable(material.artifact))) return null;
    calibratedNegatives.set(item.exemplarId, item);
  }
  if (calibratedNegatives.size !== calibration.negatives.length) return null;
  if (output.explainBack.prompt === output.unseenTransfer.prompt
    || outcomeMap.size !== outcomes.length
    || familyMap.size !== families.length
    || factualMap.size !== claimStatuses.size
    || answerMap.size !== questions.length
    || termMap.size !== terms.length) return null;

  const actualPass = output.verdict === 'PASS'
    && [...outcomeMap.values()].every((item) => item.verdict === 'PASS')
    && [...familyMap.values()].every((item) => item.present === false)
    && [...factualMap.values()].every((item) => ['SUPPORTED', 'QUALIFIED'].includes(item.verdict))
    && output.repairsRequired.length === 0
    && output.unresolvedIssues.length === 0
    && output.learningDisposition.disposition === 'NO_NEW_DEFECT';
  return { output, actualPass };
}

export async function runHostedWriter({
  producerContractRaw,
  writerInput,
  researchPacket,
  storyFrame,
  makerPrincipal,
  execute,
  producerRuntime = defaultRuntime(),
}) {
  if (!MAKER.test(makerPrincipal ?? '')) return publicResult('INVALID_MAKER_PRINCIPAL');
  const contract = parseContract(producerContractRaw, writerInput, makerPrincipal, producerRuntime);
  if (!contract) return publicResult('PRODUCER_CONTRACT_REJECTED');
  if (!validateWriterInput(writerInput, contract.candidateId)) return publicResult('WRITER_INPUT_REJECTED');
  if (!validateFrame(storyFrame, contract.candidateId)) return publicResult('STORY_FRAME_REJECTED');
  const research = validateResearch(researchPacket, contract.candidateId, makerPrincipal);
  if (!research) return publicResult('RESEARCH_ADMISSION_REJECTED');
  const calibration = calibrationMaterials(contract, writerInput);
  if (!calibration || !isObject(writerInput.packet.reportingFrame)) return publicResult('WRITER_INPUT_REJECTED');

  let executor = execute;
  if (executor === undefined) {
    try { executor = createHostedProtocolExecutor(); }
    catch { return publicResult('EXECUTION_ERROR'); }
  }
  if (typeof executor !== 'function') return publicResult('EXECUTOR_MISSING');

  const guidance = { ...writerInput.packet };
  delete guidance.sources;
  const writerRequest = {
    outputSchema: writerOutputSchema(writerInput.packet.reportingFrame),
    messages: [
      { role: 'system', content: WRITER_SYSTEM_PROMPT },
      { role: 'user', content: JSON.stringify({
        schema: 'newsstand-hosted-writer-request.v1',
        makerPrincipal,
        producerContract: contract,
        writerGuidance: guidance,
        admittedResearch: researchPacket,
        storyFrame,
      }) },
    ],
  };
  let writerProvider;
  try { writerProvider = await executor({ request: writerRequest, model: HOSTED_PROTOCOL_MODEL, effort: HOSTED_PROTOCOL_EFFORT }); }
  catch { return publicResult('EXECUTION_ERROR'); }
  const writerModels = validateProvider(writerProvider);
  if (!writerModels) return publicResult('INVALID_WRITER_PROVIDER_OUTPUT');
  const writerOutput = validateWriterOutput(writerProvider.structured_output, contract, research, storyFrame, writerInput.packet.reportingFrame);
  if (!writerOutput) return publicResult('WRITER_OUTPUT_REJECTED');

  const story = assembleStory(writerOutput.storyContent, storyFrame, researchPacket);
  const storyRaw = `${JSON.stringify(story, null, 2)}\n`;
  const storySha256 = sha256(storyRaw);
  const outcomes = NEWS_OUTCOMES;
  const families = [...new Set([...FAILURE_FAMILIES, ...Object.keys(contract.knownFailurePreflight.dispositions ?? {})])].sort();
  const claimStatuses = new Map(writerOutput.claimMap.map((claim) => [claim.claimId, claim.status]));
  const questions = (contract.draftArchitecture.readerQuestions ?? []).map((question) => question.id);
  const terms = (contract.draftArchitecture.requiredTerms ?? []).map((term) => term.term);
  const reviewRequest = {
    outputSchema: selfReviewSchema(outcomes, families, calibration),
    messages: [
      { role: 'system', content: `You are ${makerPrincipal}, performing the producer's own artifact-first review of the exact story you just made. Read the complete supplied story bytes. This is a producer self-review, not independent admission and not observed human evidence. Assess every required NEWS outcome and every named failure family with exact artifact excerpts or locators. Check every mapped factual claim against the independently admitted research. Use PRODUCER_SIMULATION for explain-back and a distinct unseen-transfer case; never label either as an observed reader. Return PASS only if every outcome passes, no failure family is present, every claim remains supported or explicitly qualified, and no repair or unresolved issue remains. Otherwise return HOLD or REJECT and name the repair or evidence gap.` },
      { role: 'user', content: JSON.stringify({
        schema: 'newsstand-hosted-producer-self-review-request.v1',
        makerPrincipal,
        artifact: { sha256: storySha256, exactStoryJson: storyRaw },
        claimMap: writerOutput.claimMap,
        admittedResearch: researchPacket,
        readerContract: contract.readerContract,
        explanationPlan: contract.draftArchitecture,
        requiredOutcomes: outcomes,
        requiredFailureFamilies: families,
        calibrationMaterials: calibration,
      }) },
    ],
  };
  let reviewProvider;
  try { reviewProvider = await executor({ request: reviewRequest, model: HOSTED_PROTOCOL_MODEL, effort: HOSTED_PROTOCOL_EFFORT }); }
  catch {
    const outcome = publicResult('PRODUCER_SELF_REVIEW_EXECUTION_ERROR', { storySha256, makerPrincipal });
    Object.defineProperty(outcome, 'privateResult', { value: { story, storyRaw, writerOutput, writerRequest, writerProvider } });
    return outcome;
  }
  const reviewModels = validateProvider(reviewProvider);
  if (!reviewModels) return publicResult('INVALID_SELF_REVIEW_PROVIDER_OUTPUT', { storySha256, makerPrincipal });
  const review = validateSelfReview(reviewProvider.structured_output, {
    makerPrincipal, artifactSha256: storySha256, artifactRaw: storyRaw, outcomes, families, claimStatuses, questions, terms, calibration,
  });
  if (!review) return publicResult('INVALID_PRODUCER_SELF_REVIEW', { storySha256, makerPrincipal });

  const status = review.actualPass ? 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED' : 'PRODUCER_SELF_REVIEW_REJECTED';
  const outcome = publicResult(status, {
    storySha256,
    makerPrincipal,
    model: [...new Set([...writerModels, ...reviewModels])],
    effort: HOSTED_PROTOCOL_EFFORT,
    producerSelfReviewVerdict: review.output.verdict,
    nextRequiredStage: review.actualPass ? 'ASSEMBLE_AND_VALIDATE_CANONICAL_PRODUCER_SELF_REVIEW' : 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW',
    writerRequestSha256: sha256(stable(writerRequest)),
    selfReviewRequestSha256: sha256(stable(reviewRequest)),
  });
  Object.defineProperty(outcome, 'privateResult', {
    value: { story, storyRaw, storyTypeCoverage: writerOutput.storyTypeCoverage, claimMap: writerOutput.claimMap, writerOutput, producerSelfReviewAssessment: review.output, writerRequest, reviewRequest, writerProvider, reviewProvider },
  });
  return outcome;
}
