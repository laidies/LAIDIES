#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkContentWorkOrders } from "./check-content-work-orders.mjs";

const gates = ["accuracy", "antiSlop", "currentBestPractice", "laidiesVoice", "analogyIntegrity", "usefulnessDepth", "formatFit", "searchIndexing", "relationshipLinking", "canonConsistency", "songOpportunity", "derivativeFeeds"];
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-work-orders-"));
const writeJson = (relative, value) => {
  const target = path.join(fixtureRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
};
const baseOrder = () => ({
  id: "LCWO-999", title: "Fixture", ownerProductId: "library", status: "SPECIFIED", dispatchState: "READY_TO_DISPATCH",
  nextAction: "Wait.", nextTrigger: "A real candidate exists.", sourceRefs: ["source"], targetPaths: ["draft.md"],
  acceptanceEvidence: ["Evidence"], reviewChain: [{ stage: "EDITORIAL", owner: "library", status: "REQUIRED" }],
  qualityGates: Object.fromEntries(gates.map((name) => [name, { owner: "owner", status: "REQUIRED", evidenceRequired: "Evidence", evidencePaths: [] }])),
  artifactBinding: { status: "UNBOUND", manifestPath: null, sha256: null }, publicRelease: { status: "NOT_AUTHORIZED" }
});
const runFixture = (mutate = () => {}) => {
  const order = baseOrder();
  const queue = { schemaVersion: "1.1.0", owner: "learning-content-ecosystem", status: "ACTIVE", intakeCoverage: [], workOrders: [order] };
  mutate({ order, queue });
  writeJson("operations/product-stewards/learning-content-ecosystem/content-work-orders.json", queue);
  return checkContentWorkOrders({ root: fixtureRoot });
};

try {
  const preflight = runFixture();
  assert.deepEqual(preflight.errors, []);
  assert.deepEqual(preflight.readyForProducerPreflight, ["LCWO-999"], "an eligible new order must reach producer preflight without a contract");
  assert.deepEqual(preflight.readyToDraft, [], "preflight eligibility is not permission to draft");
  assert.match(preflight.producerContractBlocked.join("\n"), /missing producerContractPath/);
  assert.match(runFixture(({ queue }) => { queue.schemaVersion = "0"; }).errors.join("\n"), /schemaVersion/);
  assert.match(runFixture(({ queue }) => { queue.status = "WHATEVER"; }).errors.join("\n"), /invalid status WHATEVER/);
  assert.match(runFixture(({ order }) => { delete order.ownerProductId; }).errors.join("\n"), /missing ownerProductId/);
  assert.match(runFixture(({ order }) => { order.qualityGates.accuracy.status = "PASS"; }).errors.join("\n"), /claims PASS without evidence/);
  assert.match(runFixture(({ order }) => { order.artifactBinding = { status: "BOUND" }; }).errors.join("\n"), /incomplete artifact binding/);
  assert.match(runFixture(({ order }) => { order.status = "TYPO"; }).errors.join("\n"), /invalid status TYPO/);
  assert.match(runFixture(({ order }) => { order.dispatchState = "WHATEVER"; }).errors.join("\n"), /invalid dispatchState WHATEVER/);
  assert.match(runFixture(({ order }) => { order.id = "bad-id"; }).errors.join("\n"), /invalid id bad-id/);
  assert.match(runFixture(({ order, queue }) => { queue.workOrders.push(structuredClone(order)); }).errors.join("\n"), /duplicate content work order/);
  assert.match(runFixture(({ queue }) => { queue.workOrders = null; }).errors.join("\n"), /workOrders must be an array/);
  assert.match(runFixture(({ queue }) => { queue.intakeCoverage = null; }).errors.join("\n"), /intakeCoverage must be an array/);
  const invalidContract = runFixture(({ order }) => { order.producerContractPath = "records/invalid.json"; writeJson("records/invalid.json", { nope: true }); });
  assert.deepEqual(invalidContract.readyForProducerPreflight, ["LCWO-999"]);
  assert.deepEqual(invalidContract.readyToDraft, []);
  assert.ok(invalidContract.producerContractBlocked.length > 0, "an invalid contract must block drafting");

  const live = checkContentWorkOrders({ root: path.resolve(path.dirname(new URL(import.meta.url).pathname), "..") });
  assert.deepEqual(live.errors, [], "the real preserved queue must remain internally valid");
  assert.equal(live.workOrders, 17);
  assert.equal(live.readyForProducerPreflight.length, 14, "current READY_TO_DISPATCH orders must remain eligible for owner preflight");
  assert.deepEqual(live.readyToDraft, [], "no real order may draft without its valid producer contract");
  assert.equal(live.producerContractBlocked.length, 14);
  assert.equal(live.queuedWithTrigger.length, 3);
  console.log("CONTENT WORK ORDER CHECKER TEST PASS valid_preflight=1 rejected_shape_or_state=11 invalid_contract=1 live_orders=17 preflight=14 ready_to_draft=0 contract_blocked=14 queued=3");
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
