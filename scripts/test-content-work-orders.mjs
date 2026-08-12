#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkContentWorkOrders } from "./check-content-work-orders.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-content-execution-"));
const gateNames = ["accuracy", "antiSlop", "currentBestPractice", "laidiesVoice", "analogyIntegrity", "usefulnessDepth", "formatFit", "searchIndexing", "relationshipLinking", "canonConsistency"];

function write(relativePath, value) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, typeof value === "string" ? value : JSON.stringify(value, null, 2));
}

function registry() {
  write("operations/product-stewards/registry.json", { products: [{ id: "newsstand" }] });
  write("operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json", {
    formats: [
      { id: "news_daily" },
      { id: "news_big_question" }
    ]
  });
}

function baseOrder(id = "LCWO-001") {
  return {
    id,
    title: "Fixture",
    sourceRefs: ["fixture-source"],
    surface: "NEWSSTAND",
    action: "CREATE",
    ownerProductId: "newsstand",
    publicationFormatIds: ["news_daily"],
    formatRouting: [{ publicationFormatId: "news_daily", relationship: "PRIMARY_OUTPUT", contributionJob: "Fixture reader job.", sourceVersionIds: ["fixture-source-v1"] }],
    targetPaths: [`drafts/${id}.md`],
    status: "SPECIFIED",
    dispatchState: "READY_TO_DISPATCH",
    priority: "P1",
    nextAction: "Dispatch.",
    nextTrigger: "Now.",
    acceptanceEvidence: ["Fixture evidence."],
    reviewChain: [{ stage: "EDITORIAL", owner: "newsstand", status: "REQUIRED" }],
    qualityGates: Object.fromEntries(gateNames.map((name) => [name, { owner: "owner", status: "REQUIRED", evidenceRequired: "Evidence.", evidencePaths: [] }])),
    artifactBinding: { status: "UNBOUND", manifestPath: null, sha256: null },
    evidencePaths: [],
    publicRelease: { status: "NOT_AUTHORIZED", url: null, releaseReceipt: null, sha256: null },
    execution: {
      state: "BACKLOG",
      primaryOutput: { id: `${id}-primary`, surface: "NEWSSTAND", ownerProductId: "newsstand", targetPaths: [`drafts/${id}.md`] },
      requiredPrimaryGates: gateNames,
      derivatives: [
        { id: "songOpportunity", state: "PARKED", reason: "No song job.", activationTrigger: "Create a child order." },
        { id: "derivativeFeeds", state: "PARKED", reason: "No derivative job.", activationTrigger: "Create a child order." }
      ],
      wip: { ownerLimit: 1 },
      dispatch: null,
      closure: null
    }
  };
}

function queue(orders) {
  write("operations/product-stewards/learning-content-ecosystem/content-work-orders.json", {
    schemaVersion: "1.2.0",
    owner: "learning-content-ecosystem",
    status: "ACTIVE",
    updatedAt: "2026-08-11",
    orchestration: {},
    intakeCoverage: [],
    workOrders: orders
  });
}

function dispatch(order, { suffix = "01", scope = order.targetPaths, due = "2026-08-12T12:00:00-07:00" } = {}) {
  const receiptPath = `operations/product-stewards/learning-content-ecosystem/dispatch-receipts/${order.id}-${suffix}.json`;
  const receipt = {
    receiptId: `DSP-${order.id}-${suffix}`,
    workOrderId: order.id,
    ownerId: order.ownerProductId,
    laneId: `fixture:${order.id}`,
    acceptedScope: scope,
    collisionBoundary: "Fixture-owned paths only.",
    dispatchedAt: "2026-08-11T12:00:00-07:00",
    checkpointAt: "2026-08-11T13:00:00-07:00",
    slaDueAt: due
  };
  write(receiptPath, receipt);
  order.dispatchState = "DISPATCHED";
  order.execution.state = "DISPATCHED";
  order.execution.dispatch = { ...receipt, receiptPath };
  return order;
}

try {
  registry();

  const ready = baseOrder();
  queue([ready]);
  const readyResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.deepEqual(readyResult.errors, []);
  assert.deepEqual(readyResult.readyToDispatch, ["LCWO-001"], "dispatch eligibility must not require a producer contract");

  const active = dispatch(baseOrder());
  queue([active]);
  write("operations/runtime/work-resolution-loop.json", "{ deliberately invalid unrelated runtime state");
  const activeResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.deepEqual(activeResult.errors, [], "unrelated portfolio runtime debt must not suppress a scoped Learning dispatch");
  assert.deepEqual(activeResult.activeDispatches, ["LCWO-001"]);

  const stalledResult = checkContentWorkOrders({ root, now: new Date("2026-08-13T12:30:00-07:00") });
  assert.match(stalledResult.errors.join("\n"), /EXECUTION_STALLED/, "expired dispatch must fail closed");

  const missingFormat = baseOrder();
  delete missingFormat.publicationFormatIds;
  queue([missingFormat]);
  const missingFormatResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(missingFormatResult.errors.join("\n"), /lacks publicationFormatIds/, "NewsStand work must name its exact format");

  const retiredFormat = baseOrder();
  retiredFormat.publicationFormatIds = ["news_tribune"];
  queue([retiredFormat]);
  const retiredFormatResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(retiredFormatResult.errors.join("\n"), /unknown publication format|retired public format/, "retired Tribune routing must fail");

  const missingRelationship = baseOrder();
  delete missingRelationship.formatRouting[0].relationship;
  queue([missingRelationship]);
  const missingRelationshipResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(missingRelationshipResult.errors.join("\n"), /invalid format relationship/, "a multi-output contribution must name its relationship");

  const first = dispatch(baseOrder("LCWO-001"), { scope: ["drafts/one.md"] });
  first.execution.primaryOutput.targetPaths = first.targetPaths;
  const second = dispatch(baseOrder("LCWO-002"), { scope: ["drafts/two.md"], suffix: "02" });
  second.execution.primaryOutput.targetPaths = second.targetPaths;
  queue([first, second]);
  const wipResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(wipResult.errors.join("\n"), /owner WIP exceeded/, "two active outputs for one owner must fail");

  const collisionSecond = dispatch(baseOrder("LCWO-002"), { scope: ["drafts/shared.md"], suffix: "03" });
  const collisionFirst = dispatch(baseOrder("LCWO-001"), { scope: ["drafts/shared.md"], suffix: "04" });
  collisionFirst.execution.wip.ownerLimit = 2;
  collisionSecond.execution.wip.ownerLimit = 2;
  queue([collisionFirst, collisionSecond]);
  const collisionResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(collisionResult.errors.join("\n"), /active dispatch collision/, "overlapping dispatch paths must fail");

  const unboundDerivative = baseOrder();
  unboundDerivative.execution.derivatives[0] = { id: "songOpportunity", state: "APPLICABLE", reason: "Song selected.", activationTrigger: "Build child." };
  queue([unboundDerivative]);
  const derivativeResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(derivativeResult.errors.join("\n"), /lacks childWorkOrderId/, "applicable derivatives must not borrow primary admission");

  const declined = baseOrder();
  declined.status = "DECLINED";
  declined.dispatchState = "CLOSED";
  declined.execution.state = "CLOSED";
  queue([declined]);
  const closureResult = checkContentWorkOrders({ root, now: new Date("2026-08-11T12:30:00-07:00") });
  assert.match(closureResult.errors.join("\n"), /DECLINED lacks an exact closure/, "terminal claims require a closure receipt");

  console.log("CONTENT WORK ORDER EXECUTION TEST PASS");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
