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
