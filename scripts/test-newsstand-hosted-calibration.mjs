#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { calibrateHosted } from './calibrate-newsstand-hosted.mjs';

function bundleArgument(argv) {
  if (argv.length !== 2 || argv[0] !== '--bundle' || !argv[1]) {
    throw new Error('TEST_BUNDLE_ARGUMENT_REQUIRED');
  }
  return argv[1];
}

const digest = (value) => crypto.createHash('sha256').update(value).digest('hex');
const clone = (value) => structuredClone(value);
const bundlePath = bundleArgument(process.argv.slice(2));
const bundleRaw = fs.readFileSync(bundlePath, 'utf8');
const sourceBundle = JSON.parse(bundleRaw);
const sourceBundleDigest = digest(JSON.stringify(sourceBundle));
const registry = JSON.parse(sourceBundle.registryRaw);
const positive = registry.positiveExemplars.find((item) => item.useFor.includes('NEWS') && item.status !== 'SUPERSEDED_FOR_FULL_NEWS_CALIBRATION');
const expectedItems = [...registry.negativeExemplars, positive];
assert.equal(expectedItems.length, 4, 'private bundle must contain the four current calibration cases');
assert.equal(sourceBundle.samples.length, 4, 'private bundle must provide all four current samples');

const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'test-newsstand-hosted-calibration-'));
const protocolPath = path.join(temporaryRoot, 'protocol.mjs');
fs.writeFileSync(protocolPath, sourceBundle.protocolSource, { mode: 0o600 });
const sourceProtocol = await import(`${pathToFileURL(protocolPath).href}?test=${Date.now()}`);

const privateBodyFragments = sourceBundle.samples.flatMap((sample) => [
  sample.packet.completeArtifact,
  ...sample.packet.paragraphs.map((paragraph) => paragraph.text),
]).filter((value) => typeof value === 'string' && value.length >= 20);

function expectedNormalized(index, verdictOverride) {
  const item = expectedItems[index];
  const verdict = verdictOverride ?? (item === positive ? 'PASS' : 'REJECT');
  return {
    verdict,
    families: Object.fromEntries((item.failureFamilies ?? []).map((family) => [family, {
      state: 'present',
      reason: 'Mock calibration evidence is present for this registered failure family.',
    }])),
    attestations: [],
  };
}

function assertBlindRequest(request, sampleIndex) {
  const serialized = JSON.stringify(request);
  assert.ok(!/expectedVerdict/i.test(serialized), 'model request excludes an expected-verdict field');
  assert.ok(!/oldJudgment/i.test(serialized), 'model request excludes an old-judgment field');
  assert.ok(!serialized.includes(expectedItems[sampleIndex].id), 'model request excludes the exemplar identity');
  assert.ok(!serialized.includes(expectedItems[sampleIndex].sha256), 'model request excludes the registered source hash');
}

function harness({ verdictOverrideAt = -1, executeFailureAt = -1, normalizeFailureAt = -1 } = {}) {
  let executeIndex = 0;
  let normalizeIndex = 0;
  const requests = [];
  const saved = new Map();
  const protocol = {
    calibrationPacketFor(input) {
      return sourceProtocol.calibrationPacketFor(input);
    },
    requestFor(kind, packet) {
      assert.equal(kind, 'calibration');
      return sourceProtocol.requestFor(kind, packet);
    },
    normalize(kind, judgment) {
      assert.equal(kind, 'calibration');
      const index = normalizeIndex++;
      if (index === normalizeFailureAt) throw new Error('MOCK_NORMALIZATION_FAILURE');
      return judgment;
    },
  };
  const execute = async ({ request, model, effort }) => {
    const index = executeIndex++;
    assert.equal(model, 'claude-fable-5');
    assert.equal(effort, 'medium');
    assertBlindRequest(request, index);
    requests.push(request);
    if (index === executeFailureAt) throw new Error('MOCK_SOURCE_FAILURE');
    const structured_output = expectedNormalized(index, index === verdictOverrideAt ? 'PASS' : undefined);
    return {
      type: 'result',
      subtype: 'success',
      is_error: false,
      id: `mock-provider-${index + 1}`,
      modelUsage: { 'claude-fable-5': { inputTokens: 1, outputTokens: 1 } },
      usage: { input_tokens: 1, output_tokens: 1 },
      structured_output,
    };
  };
  const save = async (name, value) => {
    assert.ok(!saved.has(name), 'calibration must not overwrite a prior private artifact');
    saved.set(name, clone(value));
  };
  return { protocol, execute, save, requests, saved };
}

async function run(bundle, options) {
  const before = digest(JSON.stringify(bundle));
  const testHarness = harness(options);
  const result = await calibrateHosted({ bundle, ...testHarness });
  assert.equal(digest(JSON.stringify(bundle)), before, 'calibration preserves its private input bundle');
  return { result, ...testHarness };
}

function assertNoPrivateBody(value, label) {
  const serialized = JSON.stringify(value);
  for (const fragment of privateBodyFragments) {
    assert.ok(!serialized.includes(fragment), `${label} excludes private article body text`);
  }
}

const captured = [];
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { captured.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { captured.push(String(chunk)); return true; });

try {
  const ordinary = await run(clone(sourceBundle));
  assert.equal(ordinary.result.status, 'CALIBRATION_PASSED');
  assert.equal(ordinary.result.evaluations.length, 4);
  assert.ok(ordinary.result.evaluations.every((evaluation) => evaluation.passed));
  assert.equal(ordinary.requests.length, 4);
  assertNoPrivateBody(ordinary.result, 'public calibration result');

  const falsePass = await run(clone(sourceBundle), { verdictOverrideAt: 0 });
  assert.equal(falsePass.result.status, 'HOLD_CALIBRATION', 'PASS on a registered bad example must hold calibration');
  assert.equal(falsePass.result.evaluations.length, 1);
  assert.equal(falsePass.result.evaluations[0].expected, 'REJECT');
  assert.equal(falsePass.result.evaluations[0].actual, 'PASS');
  assert.equal(falsePass.result.evaluations[0].passed, false);
  assertNoPrivateBody(falsePass.result, 'false-pass hold result');

  const missingSample = clone(sourceBundle);
  missingSample.samples.pop();
  await assert.rejects(
    calibrateHosted({ bundle: missingSample, ...harness() }),
    (error) => error?.message === 'CALIBRATION_SAMPLE_MISMATCH',
  );

  const badSourceHash = clone(sourceBundle);
  badSourceHash.samples[0].sourceRaw += '\nsource-hash-test-mutation';
  await assert.rejects(
    calibrateHosted({ bundle: badSourceHash, ...harness() }),
    (error) => error?.message === 'CALIBRATION_SAMPLE_MISMATCH',
  );

  const protocolDrift = clone(sourceBundle);
  protocolDrift.protocolSource += '\n// protocol-drift-test';
  await assert.rejects(
    calibrateHosted({ bundle: protocolDrift, ...harness() }),
    (error) => error?.message === 'CALIBRATION_BINDING_MISMATCH',
  );

  const packetBodyTamper = clone(sourceBundle);
  packetBodyTamper.samples[0].packet.paragraphs[0].text += ' private packet tamper';
  await assert.rejects(
    calibrateHosted({ bundle: packetBodyTamper, ...harness() }),
    (error) => error?.message?.includes('CALIBRATION_PACKET_MISMATCH'),
  );

  const sourceFailure = await run(clone(sourceBundle), { executeFailureAt: 1 });
  assert.equal(sourceFailure.result.status, 'HOLD_CALIBRATION');
  assert.equal(sourceFailure.result.evaluations.length, 2);
  assert.equal(sourceFailure.result.evaluations[0].passed, true, 'prior successful evaluation remains present');
  assert.equal(sourceFailure.result.evaluations[1].failureKind, 'EXECUTION_OR_PROTOCOL_FAILURE');
  assert.ok(sourceFailure.saved.has('sample-c3af0bae62-packet.json'), 'prior private packet remains saved');
  assert.ok(sourceFailure.saved.has('sample-1cc8aa5f96-request.json'), 'failing sample request is preserved before execution');
  assertNoPrivateBody(sourceFailure.result, 'source-failure hold result');

  const normalizeFailure = await run(clone(sourceBundle), { normalizeFailureAt: 1 });
  assert.equal(normalizeFailure.result.status, 'HOLD_CALIBRATION');
  assert.equal(normalizeFailure.result.evaluations.length, 2);
  assert.equal(normalizeFailure.result.evaluations[0].passed, true, 'prior successful evaluation remains present');
  assert.equal(normalizeFailure.result.evaluations[1].failureKind, 'EXECUTION_OR_PROTOCOL_FAILURE');
  assert.ok(normalizeFailure.saved.has('sample-c3af0bae62-packet.json'), 'prior private packet remains saved');
  assert.ok(normalizeFailure.saved.has('sample-1cc8aa5f96-provider.raw.json'), 'provider input to failed normalization is preserved');
  assertNoPrivateBody(normalizeFailure.result, 'normalization-failure hold result');

  assert.equal(digest(JSON.stringify(sourceBundle)), sourceBundleDigest, 'all cases preserve the original private bundle');
  assert.equal(captured.join(''), '', 'calibration test path writes no private data to stdout or stderr');
} finally {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}

console.log('PASS newsstand-hosted-calibration: four blind cases, false-pass hold, binding rejection, failure preservation, and no private-body output');
