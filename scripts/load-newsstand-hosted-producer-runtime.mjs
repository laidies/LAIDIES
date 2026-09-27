#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SHA256 = /^[a-f0-9]{64}$/;
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

export const QUALIFIED_PRODUCER_RUNTIME_V2 = Object.freeze({
  strictProducerContract: Object.freeze({ path: 'scripts/check-content-producer-contract.mjs', sha256: '239256e4f08aba1cccc8fbcb6a9eb7fd47299b3f458556f13a42ab48fff81342', exportName: 'inspectContentProducerContract' }),
  preparedDraft: Object.freeze({ path: 'scripts/prepare-newsstand-draft.mjs', sha256: 'c3f16997ab48e966317153dce44a161572187177854c290f2ca40229cd5a287e', exportName: 'inspectPreparedDraft' }),
  storyCoverage: Object.freeze({ path: 'scripts/validate-newsstand-story-type-coverage.mjs', sha256: 'cfafc9a901a196e8c96a1c45f2002fbf47cee728961a751262e55b7729da02b9', exportName: 'validateStoryTypeCoverage' }),
  proseReview: Object.freeze({ path: 'scripts/check-prose-quality-admission.mjs', sha256: '5570093bb4a6150e67684c7c47f6f24a9044e7e7645f78e8e5019d91ed8e2b6e', exportName: 'inspectProseQualityReview' }),
});

export const QUALIFIED_PRODUCER_RUNTIME_V2_DEPENDENCIES = Object.freeze({
  learningAdmission: Object.freeze({ path: 'scripts/admit-content-quality-learning.mjs', sha256: '85e9bf5552ff905949ffa7d54fc774e6d3fbd9a6eb95c7af1c036a5999259e05' }),
  readerContract: Object.freeze({ path: 'content/newsstand-reader-contract.js', sha256: '1ad2e39123cdc91e49b2df48459b125b2a9b4932f32cb7ef6d6764c6a48efe88' }),
  bigPictureContract: Object.freeze({ path: 'content/newsstand-big-picture-versions.js', sha256: '80b48b82ba45bc00948eabc11f047c04e5ffeb708fc6ade7f014649676d41dd0' }),
  storyTypeModules: Object.freeze({ path: 'operations/product-stewards/newsstand/story-type-modules.json', sha256: '641ac9ce195bf1cd0bffe4f3ce98ff987a43f0471ddfd18d5556cc1463b8d6f7' }),
  learningIndex: Object.freeze({ path: 'content/site/miss-jeeves-index.json', sha256: '8b0a040b619fd242bce3db7a77b022f7e9de844fb9af95bab5e15ae813acadc3' }),
  librarySurface: Object.freeze({ path: 'library.html', sha256: '36180ae2726c455b792c36295b5e43ffe2f2d2c0a84a84f502093ff3d6e035b2' }),
  exemplarRegistry: Object.freeze({ path: 'operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json', sha256: 'be22fb5ae73c431ae0fd5e20c3d29f305eaaa609d5c752dbfc7abedff6ecb06b' }),
  ordinaryNewsPolicy: Object.freeze({ path: 'operations/product-stewards/newsstand/ordinary-news-editorial-policy.json', sha256: 'cf9b18549711b0e14633b3d2d9f55d4cf2a791c547200e818588a94f48050a1e' }),
});

function privateRoot(runtimeRoot) {
  if (typeof runtimeRoot !== 'string' || !path.isAbsolute(runtimeRoot)) throw new Error('INVALID_RUNTIME_ROOT');
  const stat = fs.lstatSync(runtimeRoot);
  if (!stat.isDirectory() || stat.isSymbolicLink() || (stat.mode & 0o077) !== 0) throw new Error('UNSAFE_RUNTIME_ROOT');
  return fs.realpathSync(runtimeRoot);
}

function qualifiedFile(root, pin) {
  const target = path.resolve(root, pin.path);
  if (!target.startsWith(`${root}${path.sep}`)) throw new Error('UNSAFE_RUNTIME_PATH');
  const stat = fs.lstatSync(target);
  if (!stat.isFile() || stat.isSymbolicLink() || (stat.mode & 0o077) !== 0) throw new Error('UNSAFE_RUNTIME_FILE');
  const real = fs.realpathSync(target);
  if (!real.startsWith(`${root}${path.sep}`)) throw new Error('UNSAFE_RUNTIME_PATH');
  const bytes = fs.readFileSync(real);
  if (sha256(bytes) !== pin.sha256) throw new Error('RUNTIME_GATE_SHA_MISMATCH');
  return real;
}

export async function loadHostedProducerRuntime({ runtimeRoot }) {
  const root = privateRoot(runtimeRoot);
  const resolved = Object.fromEntries(Object.entries(QUALIFIED_PRODUCER_RUNTIME_V2).map(([name, pin]) => [name, qualifiedFile(root, pin)]));
  const dependencySha256 = Object.fromEntries(Object.entries(QUALIFIED_PRODUCER_RUNTIME_V2_DEPENDENCIES).map(([name, pin]) => {
    qualifiedFile(root, pin);
    return [name, pin.sha256];
  }));
  const modules = {};
  for (const [name, pin] of Object.entries(QUALIFIED_PRODUCER_RUNTIME_V2)) {
    const loaded = await import(`${pathToFileURL(resolved[name]).href}?qualified_sha256=${pin.sha256}`);
    if (typeof loaded[pin.exportName] !== 'function') throw new Error('RUNTIME_GATE_EXPORT_MISSING');
    modules[name] = loaded[pin.exportName];
  }
  return Object.freeze({
    schemaVersion: 'newsstand-hosted-package-runtime.v1',
    runtimeContractVersion: 'newsstand-hosted-producer-runtime.v2',
    runtimeRoot: root,
    dependencySha256: Object.freeze(dependencySha256),
    checks: Object.freeze({
      strictProducerContractSha256: QUALIFIED_PRODUCER_RUNTIME_V2.strictProducerContract.sha256,
      preparedDraftSha256: QUALIFIED_PRODUCER_RUNTIME_V2.preparedDraft.sha256,
      storyCoverageSha256: QUALIFIED_PRODUCER_RUNTIME_V2.storyCoverage.sha256,
      proseReviewSha256: QUALIFIED_PRODUCER_RUNTIME_V2.proseReview.sha256,
    }),
    inspectStrictProducerContract: modules.strictProducerContract,
    inspectPreparedDraft: modules.preparedDraft,
    validateStoryTypeCoverage: modules.storyCoverage,
    inspectProseQualityReview: modules.proseReview,
  });
}

export function createHostedProducerMetrics({
  writerResult,
  reviewCycles,
  evidenceRounds,
  evidenceGaps,
  repeatedKnownDefects,
  objectiveDefectsFirstFoundAtReview,
}) {
  const review = writerResult?.privateResult?.producerSelfReviewAssessment;
  if (writerResult?.status !== 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED' || review?.verdict !== 'PASS'
    || !Array.isArray(review.outcomes) || !Array.isArray(review.failureFamilies)
    || !Array.isArray(review.factualClaims) || !Array.isArray(review.repairsRequired) || !Array.isArray(review.unresolvedIssues)
    || !Number.isInteger(reviewCycles) || reviewCycles < 1
    || !Number.isInteger(evidenceRounds) || evidenceRounds < 1
    || !Number.isInteger(evidenceGaps) || evidenceGaps < 0
    || !Number.isInteger(repeatedKnownDefects) || repeatedKnownDefects < 0
    || !Number.isInteger(objectiveDefectsFirstFoundAtReview) || objectiveDefectsFirstFoundAtReview < 0) throw new Error('INVALID_ACTUAL_METRICS_INPUT');
  const reviewIssues = review.outcomes.filter((item) => item.verdict !== 'PASS').length
    + review.failureFamilies.filter((item) => item.present !== false).length
    + review.factualClaims.filter((item) => !['SUPPORTED', 'QUALIFIED'].includes(item.verdict)).length
    + review.repairsRequired.length
    + review.unresolvedIssues.length;
  if (reviewIssues !== 0 || evidenceGaps !== 0 || repeatedKnownDefects !== 0 || objectiveDefectsFirstFoundAtReview !== 0) {
    throw new Error('PASS_METRICS_CONTRADICT_ACTUAL_RESULTS');
  }
  return Object.freeze({
    schemaVersion: 'newsstand-hosted-producer-metrics.v1',
    reviewIssues,
    reviewCycles,
    repeatedKnownDefects,
    objectiveDefectsFirstFoundAtReview,
    evidenceRounds,
    evidenceGaps,
  });
}
