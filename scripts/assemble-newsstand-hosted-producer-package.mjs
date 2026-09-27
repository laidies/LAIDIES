#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SHA256 = /^[a-f0-9]{64}$/;
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stable = (value) => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value) => typeof value === 'string' && value.trim().length > 0;
const exactKeys = (value, keys) => object(value) && Object.keys(value).sort().join(',') === [...keys].sort().join(',');

function publicResult(status, extra = {}) {
  return {
    status,
    producerPackageBuilt: ['PRODUCER_PACKAGE_READY', 'PRODUCER_PACKAGE_CHECK_FAILED'].includes(status),
    readyForIndependentReview: status === 'PRODUCER_PACKAGE_READY',
    independentAdmission: false,
    publicationActionTaken: false,
    humanEvidenceClaimed: false,
    ...extra,
  };
}

function validRuntime(runtime) {
  const checks = runtime?.checks;
  return runtime?.schemaVersion === 'newsstand-hosted-package-runtime.v1'
    && exactKeys(checks, ['strictProducerContractSha256', 'preparedDraftSha256', 'storyCoverageSha256', 'proseReviewSha256'])
    && Object.values(checks).every((value) => SHA256.test(value ?? ''))
    && ['inspectStrictProducerContract', 'inspectPreparedDraft', 'validateStoryTypeCoverage', 'inspectProseQualityReview'].every((name) => typeof runtime?.[name] === 'function');
}

function validBinding(binding) {
  return exactKeys(binding, ['path', 'sha256']) && text(binding.path) && SHA256.test(binding.sha256 ?? '');
}

function bindingMatches(root, binding) {
  if (!validBinding(binding)) return false;
  try {
    const realRoot = fs.realpathSync(root);
    const target = path.resolve(realRoot, binding.path);
    if (!target.startsWith(`${realRoot}${path.sep}`)) return false;
    const real = fs.realpathSync(target);
    return real.startsWith(`${realRoot}${path.sep}`) && fs.statSync(real).isFile() && sha256(fs.readFileSync(real)) === binding.sha256;
  } catch { return false; }
}

function validQualification(value, writerResult) {
  if (!exactKeys(value, ['schemaVersion', 'qualificationRunId', 'qualificationArtifact', 'model', 'effort', 'actualModels', 'writerExecution'])
    || value.schemaVersion !== 'newsstand-hosted-model-qualification.v1'
    || !text(value.qualificationRunId) || !validBinding(value.qualificationArtifact)
    || value.model !== 'claude-fable-5' || value.effort !== 'medium'
    || !Array.isArray(value.actualModels) || value.actualModels.length < 1
    || stable(value.actualModels) !== stable(writerResult.model)
    || !exactKeys(value.writerExecution, ['startedAt', 'completedAt', 'writerProviderRawSha256', 'selfReviewProviderRawSha256'])
    || !Number.isFinite(Date.parse(value.writerExecution.startedAt))
    || !Number.isFinite(Date.parse(value.writerExecution.completedAt))
    || Date.parse(value.writerExecution.startedAt) > Date.parse(value.writerExecution.completedAt)
    || !SHA256.test(value.writerExecution.writerProviderRawSha256 ?? '')
    || !SHA256.test(value.writerExecution.selfReviewProviderRawSha256 ?? '')) return false;
  return value.writerExecution.writerProviderRawSha256 === sha256(stable(writerResult.privateResult.writerProvider))
    && value.writerExecution.selfReviewProviderRawSha256 === sha256(stable(writerResult.privateResult.reviewProvider));
}

function validMetrics(metrics) {
  return exactKeys(metrics, ['schemaVersion', 'reviewIssues', 'reviewCycles', 'repeatedKnownDefects', 'objectiveDefectsFirstFoundAtReview', 'evidenceRounds', 'evidenceGaps'])
    && metrics.schemaVersion === 'newsstand-hosted-producer-metrics.v1'
    && ['reviewIssues', 'repeatedKnownDefects', 'objectiveDefectsFirstFoundAtReview', 'evidenceGaps'].every((key) => metrics[key] === 0)
    && Number.isInteger(metrics.reviewCycles) && metrics.reviewCycles >= 1
    && Number.isInteger(metrics.evidenceRounds) && metrics.evidenceRounds >= 1;
}

function verifyAdmittedResearch(packet, candidateId) {
  if (!object(packet) || packet.schemaVersion !== 'newsstand-hosted-admitted-research.v1'
    || packet.candidateId !== candidateId || packet.decision !== 'ADMIT_FOR_DRAFTING'
    || !Array.isArray(packet.sourceBindings) || packet.sourceBindings.length < 1
    || !Array.isArray(packet.claims) || packet.claims.length < 1
    || !Array.isArray(packet.limitations)) return false;
  const payload = {
    candidateId: packet.candidateId,
    sourceSetSha256: packet.sourceSetSha256,
    evidenceOutputSha256: packet.evidenceOutputSha256,
    sourceBindings: packet.sourceBindings,
    claims: packet.claims,
    limitations: packet.limitations,
  };
  return SHA256.test(packet.admittedPayloadSha256 ?? '') && sha256(stable(payload)) === packet.admittedPayloadSha256;
}

function validSelfReview(review) {
  return object(review) && review.verdict === 'PASS'
    && Array.isArray(review.outcomes) && review.outcomes.length > 0
    && review.outcomes.every((item) => text(item?.name) && item.verdict === 'PASS' && text(item.observation) && Array.isArray(item.artifactEvidence) && item.artifactEvidence.length > 0)
    && Array.isArray(review.failureFamilies) && review.failureFamilies.length > 0
    && review.failureFamilies.every((item) => text(item?.name) && item.present === false && text(item.observation) && text(item.artifactLocator))
    && Array.isArray(review.readerAnswers) && Array.isArray(review.termChecks)
    && object(review.explainBack) && object(review.unseenTransfer)
    && exactKeys(review.calibration, ['negatives', 'positive'])
    && Array.isArray(review.calibration.negatives) && review.calibration.negatives.length > 0
    && object(review.calibration.positive)
    && Array.isArray(review.repairsRequired) && review.repairsRequired.length === 0
    && Array.isArray(review.unresolvedIssues) && review.unresolvedIssues.length === 0
    && review.learningDisposition?.disposition === 'NO_NEW_DEFECT';
}

function safeOutput(root, relative) {
  if (!text(root) || !text(relative) || path.isAbsolute(relative)) return null;
  const realRoot = fs.realpathSync(root);
  const target = path.resolve(realRoot, relative);
  if (!target.startsWith(`${realRoot}${path.sep}`) || fs.existsSync(target)) return null;
  let parent = path.dirname(target);
  while (!fs.existsSync(parent)) parent = path.dirname(parent);
  const realParent = fs.realpathSync(parent);
  if (!realParent.startsWith(`${realRoot}${path.sep}`) && realParent !== realRoot) return null;
  fs.mkdirSync(target, { recursive: true, mode: 0o700 });
  if (fs.realpathSync(target) !== target) return null;
  return { root: realRoot, target, relative: path.relative(realRoot, target) };
}

function stripHtml(value) {
  return String(value ?? '').replace(/<\/p>\s*<p>/gi, '\n\n').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
}

function storyParagraphs(story) {
  const fields = ['the_story', 'laidies_read', 'what_this_means', 'cocktail_party', 'class_notes'];
  const rows = [];
  for (const field of fields) {
    const parts = String(story[field] ?? '').split(/<\/p>\s*<p>/i).map((part) => stripHtml(part)).filter(Boolean);
    parts.forEach((part, index) => rows.push({ id: `${field}-${index + 1}`, text: part, exact: part, field }));
  }
  return rows;
}

function renderStory(story) {
  const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(story.headline)}</title></head><body><article><h1>${escape(story.headline)}</h1><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>The Cocktail Party Explanation</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article></body></html>\n`;
}

function checks(result) {
  if (Array.isArray(result)) return result;
  return Array.isArray(result?.errors) ? result.errors : ['runtime check returned an invalid result'];
}

export function assembleHostedProducerPackage({
  writerResult,
  producerContractRaw,
  writerInputRaw,
  admittedResearch,
  packagePlan,
  metrics,
  modelQualification,
  runtime,
}) {
  if (!validRuntime(runtime) || !validMetrics(metrics)) return publicResult('INVALID_ASSEMBLY_INPUT');
  let contract;
  let writerInput;
  try { contract = JSON.parse(producerContractRaw); writerInput = JSON.parse(writerInputRaw); }
  catch { return publicResult('INVALID_ASSEMBLY_INPUT'); }
  const privateWriter = writerResult?.privateResult;
  if (writerResult?.status !== 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED'
    || writerResult.readyForIndependentReview !== false
    || !object(privateWriter) || !object(privateWriter.story) || !text(privateWriter.storyRaw)
    || !object(privateWriter.writerOutput) || !object(privateWriter.writerProvider) || !object(privateWriter.reviewProvider)
    || !validSelfReview(privateWriter.producerSelfReviewAssessment) || !object(privateWriter.storyTypeCoverage)
    || contract.candidateId !== privateWriter.story.id || contract.producer !== writerResult.makerPrincipal
    || writerInput?.packet?.candidateId !== contract.candidateId
    || writerInput?.producerContract?.sha256 !== sha256(producerContractRaw)
    || sha256(privateWriter.storyRaw) !== writerResult.storySha256
    || privateWriter.producerSelfReviewAssessment.artifactSha256 !== writerResult.storySha256
    || privateWriter.producerSelfReviewAssessment.verdict !== 'PASS'
    || stable(privateWriter.writerProvider.structured_output) !== stable(privateWriter.writerOutput)
    || stable(privateWriter.reviewProvider.structured_output) !== stable(privateWriter.producerSelfReviewAssessment)
    || stable(privateWriter.writerOutput.claimMap) !== stable(privateWriter.claimMap)
    || stable(privateWriter.writerOutput.storyTypeCoverage) !== stable(privateWriter.storyTypeCoverage)
    || !verifyAdmittedResearch(admittedResearch, contract.candidateId)
    || !validQualification(modelQualification, writerResult)) return publicResult('WRITER_OR_BINDING_REJECTED');

  if (!exactKeys(packagePlan, ['root', 'outputDirectory', 'reviewMetricsPolicy', 'calibrationRegistry', 'lineage', 'reviewBoundaryInstruction', 'correctionOwner', 'nextTrigger', 'limitations', 'heroVisualEvidence'])
    || !validBinding(packagePlan.reviewMetricsPolicy) || !validBinding(packagePlan.calibrationRegistry)
    || packagePlan.calibrationRegistry.sha256 !== contract.knownFailurePreflight?.registrySha256
    || !object(packagePlan.lineage) || !text(packagePlan.reviewBoundaryInstruction)
    || !text(packagePlan.correctionOwner) || !text(packagePlan.nextTrigger)
    || !Array.isArray(packagePlan.limitations) || packagePlan.limitations.some((item) => !text(item))
    || !object(packagePlan.heroVisualEvidence)) return publicResult('INVALID_ASSEMBLY_INPUT');
  if (!bindingMatches(packagePlan.root, modelQualification.qualificationArtifact)
    || !bindingMatches(packagePlan.root, packagePlan.reviewMetricsPolicy)
    || !bindingMatches(packagePlan.root, packagePlan.calibrationRegistry)) return publicResult('BOUND_AUTHORITY_REJECTED');
  let destination;
  try { destination = safeOutput(packagePlan.root, packagePlan.outputDirectory); }
  catch { destination = null; }
  if (!destination) return publicResult('UNSAFE_OR_EXISTING_OUTPUT');

  const files = new Map();
  const write = (name, value) => {
    const body = typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`;
    const file = path.join(destination.target, name);
    fs.writeFileSync(file, body, { flag: 'wx', mode: 0o600 });
    const relative = path.posix.join(destination.relative.split(path.sep).join('/'), name);
    const binding = { path: relative, sha256: sha256(body) };
    files.set(name, { body, value: typeof value === 'string' ? null : value, binding });
    return binding;
  };
  const contractBinding = write('producer-contract.json', producerContractRaw);
  const originalWriterContractBinding = { ...writerInput.producerContract };
  writerInput = { ...writerInput, producerContract: contractBinding };
  const writerInputBinding = write('writer-input-current.json', writerInput);
  const story = privateWriter.story;
  const reviewText = write('review-text.json', privateWriter.storyRaw);
  const storyBinding = write('story.json', privateWriter.storyRaw);
  const rendered = write('rendered-article.html', renderStory(story));
  const coverageBinding = write('story-type-coverage.json', privateWriter.storyTypeCoverage);
  const manifest = {
    schemaVersion: 'laidies-content-artifact-manifest.v1', candidateId: story.id,
    surface: contract.surface, contentClass: contract.contentClass,
    reviewText, rendered, story: storyBinding,
    heroVisual: { ...story.heroVisual, ...packagePlan.heroVisualEvidence },
  };
  const manifestBinding = write('publication-manifest.json', manifest);

  const selfReview = privateWriter.producerSelfReviewAssessment;
  const observations = {
    schemaVersion: 'laidies-newsstand-producer-observations.v1', candidateId: story.id,
    completeTextRead: true, storySha256: sha256(JSON.stringify(story)),
    wordCount: stripHtml([story.headline, story.the_story, story.laidies_read, story.what_this_means, story.cocktail_party, story.class_notes].join(' ')).split(/\s+/).filter(Boolean).length,
    readerAnswers: Object.fromEntries(selfReview.readerAnswers.map((item) => [item.questionId, item.artifactEvidence])),
    terms: Object.fromEntries(selfReview.termChecks.map((item) => [item.term, item.artifactEvidence])),
    explainBack: selfReview.explainBack.probeResponse,
    unseenTransfer: selfReview.unseenTransfer.probeResponse,
    unresolvedIssues: selfReview.unresolvedIssues,
    repairsMade: selfReview.repairsRequired,
    limitations: [...packagePlan.limitations],
  };
  const observationsBinding = write('producer-observations.json', observations);

  const sourceById = new Map(admittedResearch.sourceBindings.map((item) => [item.sourceId, item]));
  const editorialSources = admittedResearch.sourceBindings.map((source) => {
    const evidence = admittedResearch.claims.flatMap((claim) => claim.sourceEvidence.filter((item) => item.sourceId === source.sourceId));
    const passages = [...new Set(evidence.map((item) => item.excerpt))];
    return {
      id: source.sourceId, url: source.url, authority: source.publisherType,
      source: { url: source.url, passage: passages[0], passageLocator: source.url, additionalPassage: passages.slice(1).join('\n'), additionalPassageLocator: source.url },
      limitations: [...new Set(evidence.map((item) => item.qualification))].join(' '),
    };
  });
  const claimMap = privateWriter.claimMap.map((used) => {
    const admitted = admittedResearch.claims.find((item) => item.claimId === used.claimId);
    return {
      claimId: used.claimId, claim: admitted.claim,
      candidateEvidence: used.candidateEvidence.map((excerpt) => ({ excerpt, locator: 'complete story' })),
      sourceIds: used.sourceIds,
      sourceEvidence: admitted.sourceEvidence.map((item) => ({ excerpt: item.excerpt, locator: sourceById.get(item.sourceId).url })),
      scopeAndFreshness: admitted.scopeAndFreshness,
      status: admitted.status,
    };
  });
  const editorialInput = {
    readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,
    completeArtifact: privateWriter.storyRaw,
    paragraphs: storyParagraphs(story),
    communicationAuthority: contract.communicationDesign,
    claims: claimMap.map(({ status, ...claim }) => claim),
    sources: editorialSources,
    reviewBoundary: { status: 'READY_FOR_DISTINCT_INDEPENDENT_REVIEW', instruction: packagePlan.reviewBoundaryInstruction },
  };
  const editorialBinding = write('editorial-input.json', editorialInput);

  const outcomes = Object.fromEntries(selfReview.outcomes.map((item) => {
    const base = { verdict: item.verdict, observation: item.observation, artifactEvidence: item.artifactEvidence };
    if (item.name === 'explainBack') base.simulatedReaderProbe = { prompt: selfReview.explainBack.prompt, probeResponse: selfReview.explainBack.probeResponse, expectedEvidence: selfReview.explainBack.expectedEvidence, transferResult: selfReview.explainBack.assessment };
    if (item.name === 'unseenTransfer') base.simulatedReaderProbe = { prompt: selfReview.unseenTransfer.prompt, probeResponse: selfReview.unseenTransfer.probeResponse, expectedEvidence: selfReview.unseenTransfer.expectedEvidence, transferResult: selfReview.unseenTransfer.assessment };
    return [item.name, base];
  }));
  const failureFamilies = Object.fromEntries(selfReview.failureFamilies.map((item) => [item.name, { present: item.present, observation: item.observation, artifactLocator: item.artifactLocator }]));
  const receipt = {
    schemaVersion: 'laidies-prose-quality-review.v1', stage: 'PRODUCER_SELF_REVIEW',
    candidateId: story.id, surface: contract.surface, contentClass: contract.contentClass,
    maker: writerResult.makerPrincipal, reviewMode: 'EXACT_PROSE_IN_FULL',
    reviewer: { id: writerResult.makerPrincipal, principalId: writerResult.makerPrincipal, role: 'Hosted producer exact prose read-through', modelFamily: 'anthropic' },
    reviewedAt: modelQualification.writerExecution.completedAt, verdict: 'PASS',
    artifact: { manifest: manifestBinding, reviewText, rendered },
    reviewMetricsPolicy: packagePlan.reviewMetricsPolicy,
    calibration: {
      registrySha256: packagePlan.calibrationRegistry.sha256,
      reviewerPrincipalId: writerResult.makerPrincipal,
      reviewedAt: modelQualification.writerExecution.completedAt,
      negatives: selfReview.calibration.negatives,
      positive: selfReview.calibration.positive,
    },
    reverseBrief: {
      humanQuestion: contract.readerContract.humanQuestion,
      promisedPayoff: contract.readerContract.promisedPayoff,
      centralMentalModel: contract.readerContract.centralMentalModel,
      dailyLifeConnection: contract.readerContract.dailyLifeConnection,
      surfaceJob: contract.readerContract.surfaceJob,
      desiredReaderFeeling: contract.readerContract.desiredFeeling,
    },
    outcomes, failureFamilies,
    factualReview: {
      disposition: 'CLAIMS_REVIEWED', sourceBindings: [editorialBinding],
      claimMap: claimMap.map((claim) => ({ ...claim, sourceBinding: editorialBinding })),
      reviewedThrough: modelQualification.writerExecution.completedAt.slice(0, 10),
      nextTrigger: packagePlan.nextTrigger, correctionOwner: packagePlan.correctionOwner,
    },
    ratchet: { repeatedKnownDefects: metrics.repeatedKnownDefects, objectiveDefectsFirstFoundAtReview: metrics.objectiveDefectsFirstFoundAtReview, reviewIssues: metrics.reviewIssues, reviewCycles: metrics.reviewCycles, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' },
    lineage: packagePlan.lineage,
    learningDisposition: selfReview.learningDisposition,
    limitations: [...packagePlan.limitations],
  };
  const receiptBinding = write('producer-publication-review.json', receipt);
  const assemblyMetrics = {
    schemaVersion: 'laidies.newsstand-hosted-producer-assembly-metrics.v1', candidateId: story.id,
    metrics, modelQualification, runtimeChecks: runtime.checks,
    writerRequestSha256: writerResult.writerRequestSha256,
    selfReviewRequestSha256: writerResult.selfReviewRequestSha256,
    admittedResearchSha256: admittedResearch.admittedPayloadSha256,
    writerInputRelocation: { originalSha256: sha256(writerInputRaw), originalContractBinding: originalWriterContractBinding, packageBinding: writerInputBinding, packageContractBinding: contractBinding, change: 'Only the exact unchanged contract locator is relocated into the self-contained candidate package.' },
  };
  const metricsBinding = write('assembly-metrics.json', assemblyMetrics);

  const errors = [];
  try { errors.push(...checks(runtime.inspectStrictProducerContract(contract, { root: destination.root })).map((item) => `producerContract:${item}`)); }
  catch { errors.push('producerContract:runtime execution failed'); }
  try { errors.push(...checks(runtime.inspectPreparedDraft(story, writerInput, observations, { root: destination.root })).map((item) => `preparedDraft:${item}`)); }
  catch { errors.push('preparedDraft:runtime execution failed'); }
  try { errors.push(...checks(runtime.validateStoryTypeCoverage(privateWriter.storyTypeCoverage, story.themes, undefined, { story, root: destination.root })).map((item) => `storyCoverage:${item}`)); }
  catch { errors.push('storyCoverage:runtime execution failed'); }
  try { errors.push(...checks(runtime.inspectProseQualityReview(receipt, { root: destination.root })).map((item) => `proseReview:${item}`)); }
  catch { errors.push('proseReview:runtime execution failed'); }

  const status = errors.length ? 'PRODUCER_PACKAGE_CHECK_FAILED' : 'PRODUCER_PACKAGE_READY';
  const result = publicResult(status, {
    candidateId: story.id,
    packagePath: destination.relative,
    storySha256: writerResult.storySha256,
    bindings: { story: storyBinding, reviewText, rendered, manifest: manifestBinding, coverage: coverageBinding, observations: observationsBinding, editorialInput: editorialBinding, producerReview: receiptBinding, metrics: metricsBinding },
    checkErrors: errors,
    nextRequiredStage: errors.length ? 'REPAIR_PRODUCER_PACKAGE' : 'DISTINCT_INDEPENDENT_REVIEW',
  });
  Object.defineProperty(result, 'privateResult', { value: { story, coverage: privateWriter.storyTypeCoverage, observations, editorialInput, receipt, manifest, assemblyMetrics } });
  return result;
}
