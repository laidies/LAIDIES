#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  QUALIFIED_PRODUCER_RUNTIME_V2,
  QUALIFIED_PRODUCER_RUNTIME_V2_DEPENDENCIES,
  createHostedProducerMetrics,
  loadHostedProducerRuntime,
} from './load-newsstand-hosted-producer-runtime.mjs';
import { assembleHostedProducerPackage } from './assemble-newsstand-hosted-producer-package.mjs';

const runtimeRoot = path.resolve(process.argv[2] ?? process.env.NEWSSTAND_TEST_RUNTIME_ROOT ?? '/private/tmp/newsstand-cloud-candidate-runtime-v4');
const runtime = await loadHostedProducerRuntime({ runtimeRoot });
assert.equal(runtime.schemaVersion, 'newsstand-hosted-package-runtime.v1');
assert.equal(runtime.runtimeContractVersion, 'newsstand-hosted-producer-runtime.v2');
assert.equal(runtime.runtimeRoot, fs.realpathSync(runtimeRoot));
assert.equal(runtime.dependencySha256.learningAdmission, QUALIFIED_PRODUCER_RUNTIME_V2_DEPENDENCIES.learningAdmission.sha256);
assert.deepEqual(runtime.checks, {
  strictProducerContractSha256: QUALIFIED_PRODUCER_RUNTIME_V2.strictProducerContract.sha256,
  preparedDraftSha256: QUALIFIED_PRODUCER_RUNTIME_V2.preparedDraft.sha256,
  storyCoverageSha256: QUALIFIED_PRODUCER_RUNTIME_V2.storyCoverage.sha256,
  proseReviewSha256: QUALIFIED_PRODUCER_RUNTIME_V2.proseReview.sha256,
});
assert.equal(typeof runtime.inspectStrictProducerContract, 'function');
assert.equal(typeof runtime.inspectPreparedDraft, 'function');
assert.equal(typeof runtime.validateStoryTypeCoverage, 'function');
assert.equal(typeof runtime.inspectProseQualityReview, 'function');

assert.ok(runtime.inspectStrictProducerContract({}, { root: runtimeRoot }).errors.length > 0, 'actual strict producer checker executes');
assert.ok(runtime.inspectPreparedDraft({}, {}, {}).errors.length > 0, 'actual prepared-draft checker executes');
assert.ok(runtime.validateStoryTypeCoverage({}, [], undefined, { root: runtimeRoot }).length > 0, 'actual story-coverage checker executes');
assert.ok(runtime.inspectProseQualityReview({}, { root: runtimeRoot }).errors.length > 0, 'actual modern prose checker executes');

const review = {
  verdict: 'PASS',
  outcomes: [{ name: 'plainClarity', verdict: 'PASS' }],
  failureFamilies: [{ name: 'missingMechanism', present: false }],
  factualClaims: [{ claimId: 'claim', verdict: 'QUALIFIED' }],
  repairsRequired: [], unresolvedIssues: [],
};
const writerResult = { status: 'PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED' };
Object.defineProperty(writerResult, 'privateResult', { value: { producerSelfReviewAssessment: review } });
assert.deepEqual(createHostedProducerMetrics({ writerResult, reviewCycles: 1, evidenceRounds: 2, evidenceGaps: 0, repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }), {
  schemaVersion: 'newsstand-hosted-producer-metrics.v1', reviewIssues: 0, reviewCycles: 1,
  repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, evidenceRounds: 2, evidenceGaps: 0,
});
const assemblerApiProbe = assembleHostedProducerPackage({
  writerResult: {}, producerContractRaw: '{}', writerInputRaw: '{}', admittedResearch: {}, packagePlan: {},
  metrics: createHostedProducerMetrics({ writerResult, reviewCycles: 1, evidenceRounds: 2, evidenceGaps: 0, repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }),
  modelQualification: {}, runtime,
});
assert.equal(assemblerApiProbe.status, 'WRITER_OR_BINDING_REJECTED', 'v2 loader object and generated metrics satisfy the assembler runtime API');
const failedReview = structuredClone(review);
failedReview.outcomes[0].verdict = 'HOLD';
const failedWriter = { status: writerResult.status };
Object.defineProperty(failedWriter, 'privateResult', { value: { producerSelfReviewAssessment: failedReview } });
assert.throws(() => createHostedProducerMetrics({ writerResult: failedWriter, reviewCycles: 1, evidenceRounds: 2, evidenceGaps: 0, repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }), /PASS_METRICS_CONTRADICT/);
assert.throws(() => createHostedProducerMetrics({ writerResult, reviewCycles: 1, evidenceRounds: 2, evidenceGaps: 1, repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }), /PASS_METRICS_CONTRADICT/);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'test-producer-runtime-loader-'));
try {
  const tampered = path.join(temp, 'tampered');
  fs.cpSync(runtimeRoot, tampered, { recursive: true, mode: fs.constants.COPYFILE_FICLONE });
  fs.chmodSync(tampered, 0o700);
  fs.appendFileSync(path.join(tampered, QUALIFIED_PRODUCER_RUNTIME_V2.preparedDraft.path), '\n// tamper\n');
  await assert.rejects(loadHostedProducerRuntime({ runtimeRoot: tampered }), /RUNTIME_GATE_SHA_MISMATCH/);

  const dependencyTamper = path.join(temp, 'dependency-tamper');
  fs.cpSync(runtimeRoot, dependencyTamper, { recursive: true, mode: fs.constants.COPYFILE_FICLONE });
  fs.chmodSync(dependencyTamper, 0o700);
  fs.appendFileSync(path.join(dependencyTamper, QUALIFIED_PRODUCER_RUNTIME_V2_DEPENDENCIES.learningAdmission.path), '\n// tamper\n');
  await assert.rejects(loadHostedProducerRuntime({ runtimeRoot: dependencyTamper }), /RUNTIME_GATE_SHA_MISMATCH/);

  const linked = path.join(temp, 'linked');
  fs.cpSync(runtimeRoot, linked, { recursive: true, mode: fs.constants.COPYFILE_FICLONE });
  fs.chmodSync(linked, 0o700);
  const gate = path.join(linked, QUALIFIED_PRODUCER_RUNTIME_V2.storyCoverage.path);
  const original = `${gate}.original`;
  fs.renameSync(gate, original);
  fs.symlinkSync(original, gate);
  await assert.rejects(loadHostedProducerRuntime({ runtimeRoot: linked }), /UNSAFE_RUNTIME_FILE/);

  const loose = path.join(temp, 'loose');
  fs.cpSync(runtimeRoot, loose, { recursive: true, mode: fs.constants.COPYFILE_FICLONE });
  fs.chmodSync(loose, 0o700);
  fs.chmodSync(path.join(loose, QUALIFIED_PRODUCER_RUNTIME_V2.proseReview.path), 0o644);
  await assert.rejects(loadHostedProducerRuntime({ runtimeRoot: loose }), /UNSAFE_RUNTIME_FILE/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log('PASS hosted producer runtime loader: exact v2 gate pins, actual exports, private paths, tamper/symlink/mode rejection, actual metrics');
