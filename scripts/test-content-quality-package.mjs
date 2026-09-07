#!/usr/bin/env node
// Repository integration check, not semantic review or publication admission.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { PRODUCER_INSTRUCTION_PATHS, inspectContentProducerContract } from './check-content-producer-contract.mjs';
import { checkContentReleaseReadiness } from './check-content-release-readiness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = 'operations/product-stewards/learning-content-ecosystem/';
function workflowErrors(scripts) {
  const errors = [];
  const proseSteps = (scripts['test:content-prose-quality'] || '').split(' && ');
  const requiredProseSteps = [
    'node scripts/test-content-quality-package.mjs',
    'node scripts/test-content-quality-learning.mjs',
    'node scripts/test-content-producer-contract.mjs',
    'node scripts/test-prose-quality-admission.mjs',
    'node scripts/test-content-release-readiness.mjs'
  ];
  const positions = requiredProseSteps.map(step => proseSteps.indexOf(step));
  if (positions.some(position => position < 0)) errors.push('content prose workflow is missing a required quality consumer');
  if (positions.some((position, index) => index > 0 && position <= positions[index - 1])) errors.push('content prose workflow consumers are out of order');
  const buildSteps = (scripts['ci:build'] || '').split(' && ');
  const buildRequired = [
    'npm run test:content-prose-quality',
    'npm run test:content-work-orders',
    'node scripts/check-content-work-orders.mjs',
    'node scripts/check-content-release-readiness.mjs'
  ];
  const buildPositions = buildRequired.map(step => buildSteps.indexOf(step));
  if (buildPositions.some(position => position < 0)) errors.push('ci:build is missing a required content consumer');
  if (buildPositions.some((position, index) => index > 0 && position <= buildPositions[index - 1])) errors.push('ci:build content consumers are out of order');
  return errors;
}
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
assert.deepEqual(workflowErrors(packageJson.scripts), [], 'actual package workflow must consume package, learning, producer, review, work-order and release checks in dependency order');
for (const missing of [
  'node scripts/test-content-quality-learning.mjs',
  'node scripts/test-content-producer-contract.mjs',
  'node scripts/test-prose-quality-admission.mjs',
  'npm run test:content-work-orders',
  'node scripts/check-content-work-orders.mjs',
  'node scripts/check-content-release-readiness.mjs'
]) {
  const broken = structuredClone(packageJson.scripts);
  const owner = missing.startsWith('node scripts/test-') && missing !== 'node scripts/check-content-work-orders.mjs' && missing !== 'node scripts/check-content-release-readiness.mjs'
    ? 'test:content-prose-quality'
    : 'ci:build';
  broken[owner] = broken[owner].split(' && ').filter(step => step !== missing).join(' && ');
  assert.ok(workflowErrors(broken).length > 0, `workflow calibration must reject omission: ${missing}`);
}
{
  const broken = structuredClone(packageJson.scripts);
  broken['test:content-prose-quality'] = broken['test:content-prose-quality'].replace(
    'node scripts/test-content-quality-learning.mjs && node scripts/test-content-producer-contract.mjs',
    'node scripts/test-content-producer-contract.mjs && node scripts/test-content-quality-learning.mjs'
  );
  assert.match(workflowErrors(broken).join('\n'), /out of order/);
}
const registry = JSON.parse(fs.readFileSync(path.join(root, base, 'content-quality-exemplars.json')));
assert.equal(registry.schemaVersion, 'laidies-content-quality-exemplars.v1');
const entries = [...registry.negativeExemplars, ...registry.positiveExemplars];
assert.equal(new Set(entries.map(e => e.id)).size, entries.length, 'duplicate exemplar ID');
function checkBinding(relative, expected) {
  assert.match(expected || '', /^[a-f0-9]{64}$/);
  const absolute = fs.realpathSync(path.resolve(root, relative));
  assert.ok(absolute.startsWith(fs.realpathSync(root) + path.sep), 'binding escapes repository');
  const actual = crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex');
  assert.equal(actual, expected, `bound bytes changed: ${relative}`);
}
for (const entry of entries) {
  checkBinding(entry.path, entry.sha256);
  if (entry.evidencePath !== undefined || entry.evidenceSha256 !== undefined) {
    checkBinding(entry.evidencePath, entry.evidenceSha256);
  }
}
assert.throws(() => checkBinding(entries[0].path, '0'.repeat(64)), /bound bytes changed/);
assert.throws(() => checkBinding(base + 'missing-calibration-artifact', entries[0].sha256), /ENOENT/);
// Exercise actual package instruction bindings, separately from semantic quality.
for (const relative of Object.values(PRODUCER_INSTRUCTION_PATHS)) {
  const bytes = fs.readFileSync(path.join(root, relative));
  assert.ok(bytes.length > 0, `current instruction missing or empty: ${relative}`);
}
const failedTrialPath = base + 'trials/2026-09-06-producer-transfer/case-a/producer-contract.json';
const failedTrial = JSON.parse(fs.readFileSync(path.join(root, failedTrialPath)));
assert.ok(inspectContentProducerContract(failedTrial, { root }).errors.some(error => error.startsWith('instructionBindings.')),
  'the preserved real producer trial must remain rejected without current instruction bindings');
const queue = JSON.parse(fs.readFileSync(path.join(root, base, 'content-work-orders.json')));
assert.ok(Array.isArray(queue.workOrders) && queue.workOrders.length > 0, 'real work queue missing or empty');
assert.equal(new Set(queue.workOrders.map(order => order.id)).size, queue.workOrders.length, 'duplicate work order');
const release = checkContentReleaseReadiness({ root, requireReady: 1 });
assert.deepEqual(release.errors, [], 'real queue claims unsupported state');
assert.equal(release.ready.length + release.held.length, queue.workOrders.length);
for (const order of queue.workOrders.filter(order => order.artifactBinding?.status === 'UNBOUND')) {
  assert.ok(release.held.some(item => item.id === order.id), `unbound order escaped hold: ${order.id}`);
}
if (queue.workOrders.every(order => order.artifactBinding?.status === 'UNBOUND')) {
  assert.equal(release.ready.length, 0);
  assert.equal(release.readinessThresholdMet, false);
}
console.log(`REAL CONTENT QUEUE INTEGRITY MATCH orders=${queue.workOrders.length} ready=${release.ready.length} held=${release.held.length}; not release authorization`);
console.log(`CONTENT QUALITY PACKAGE INTEGRITY MATCH exemplars=${entries.length}; changed/missing bytes rejected; semantic quality NOT EVALUATED`);
console.log('CONTENT QUALITY WORKFLOW WIRING PASS actual=1 rejected_omissions=6 rejected_order=1');
