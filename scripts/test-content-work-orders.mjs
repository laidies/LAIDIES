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
  id: "LCWO-FIXTURE", title: "Fixture", ownerProductId: "library", status: "SPECIFIED", dispatchState: "NOT_READY",
  nextAction: "Wait.", nextTrigger: "A real candidate exists.", sourceRefs: ["source"], targetPaths: ["draft.md"],
  acceptanceEvidence: ["Evidence"], reviewChain: [{ stage: "EDITORIAL", owner: "library", status: "REQUIRED" }],
  qualityGates: Object.fromEntries(gates.map((name) => [name, { owner: "owner", status: "REQUIRED", evidenceRequired: "Evidence", evidencePaths: [] }])),
  artifactBinding: { status: "UNBOUND", manifestPath: null, sha256: null }, publicRelease: { status: "NOT_AUTHORIZED" }
});
const runFixture = (mutate = () => {}) => {
  const order = baseOrder();
  const queue = { schemaVersion: "1.1.0", intakeCoverage: [], workOrders: [order] };
  mutate({ order, queue });
  writeJson("operations/product-stewards/learning-content-ecosystem/content-work-orders.json", queue);
  return checkContentWorkOrders({ root: fixtureRoot });
};

try {
  assert.deepEqual(runFixture().errors, []);
  assert.match(runFixture(({ queue }) => { queue.schemaVersion = "0"; }).errors.join("\n"), /schemaVersion/);
  assert.match(runFixture(({ order }) => { delete order.ownerProductId; }).errors.join("\n"), /missing ownerProductId/);
  assert.match(runFixture(({ order }) => { order.qualityGates.accuracy.status = "PASS"; }).errors.join("\n"), /claims PASS without evidence/);
  assert.match(runFixture(({ order }) => { order.artifactBinding = { status: "BOUND" }; }).errors.join("\n"), /incomplete artifact binding/);
  assert.match(runFixture(({ order }) => { order.status = "QUEUED_WITH_TRIGGER"; order.dispatchState = "READY_TO_DISPATCH"; }).errors.join("\n"), /queued trigger must be NOT_READY/);

  const live = checkContentWorkOrders({ root: path.resolve(path.dirname(new URL(import.meta.url).pathname), "..") });
  assert.deepEqual(live.errors, [], "the real preserved queue must remain internally valid");
  assert.equal(live.workOrders, 17);
  assert.deepEqual(live.readyToDispatch, [], "no order may dispatch without its valid producer contract");
  assert.equal(live.producerContractBlocked.length, 14);
  assert.equal(live.queuedWithTrigger.length, 3);
  console.log("CONTENT WORK ORDER CHECKER TEST PASS valid=1 rejected=5 live_orders=17 ready=0 contract_blocked=14 queued=3");
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
