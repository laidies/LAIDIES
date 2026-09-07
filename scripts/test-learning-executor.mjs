#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectLearningExecutor } from "./check-learning-executor.mjs";
import { runLearningExecutionPreparation } from "./run-learning-executor-cycle.mjs";

const sourceRoot = process.cwd();
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-learning-executor-v2-"));
const queueRelative = "operations/product-stewards/learning-content-ecosystem/content-work-orders.json";
const stateRelative = "operations/product-stewards/learning-content-ecosystem/executor-state.json";
const metadataRelative = "operations/product-stewards/learning-content-ecosystem/execution-metadata.json";
const automationRoot = path.join(temporaryRoot, "automations");
const now = new Date();

function read(relative, root = temporaryRoot) {
  return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
}

function write(relative, value) {
  const destination = path.join(temporaryRoot, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, `${JSON.stringify(value, null, 2)}\n`);
}

function hash(relative) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(temporaryRoot, relative))).digest("hex");
}

function reset() {
  for (const relative of [queueRelative, stateRelative, metadataRelative]) {
    const destination = path.join(temporaryRoot, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(sourceRoot, relative), destination);
  }
  fs.rmSync(automationRoot, { recursive: true, force: true });
}

function inspect() {
  return inspectLearningExecutor({ root: temporaryRoot, now, automationRoot });
}

function iso(offsetMinutes = 0) {
  return new Date(now.getTime() + offsetMinutes * 60000).toISOString();
}

function writeAutomation(state, { kind = "heartbeat", status = "ACTIVE", target = state.automation.targetThreadId } = {}) {
  const destination = path.join(automationRoot, state.automation.id, "automation.toml");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, [
    `kind = "${kind}"`,
    `status = "${status}"`,
    `target_thread_id = "${target}"`
  ].join("\n") + "\n");
}

function enabledState() {
  const state = read(stateRelative);
  state.status = "ENABLED_BOUND";
  state.automation = {
    status: "REQUIRED",
    id: "fixture-learning-executor",
    laneId: "codex-heartbeat:fixture-learning-executor",
    targetThreadId: state.ownerTaskId
  };
  write(stateRelative, state);
  return state;
}

function preparedRecord(order, latestState = "OWNER_ACKNOWLEDGED") {
  const evidencePath = `evidence/${order.id}-ack.md`;
  const evidenceAbsolute = path.join(temporaryRoot, evidencePath);
  fs.mkdirSync(path.dirname(evidenceAbsolute), { recursive: true });
  fs.writeFileSync(evidenceAbsolute, "fixture acknowledgement\n");
  const all = [
    { state: "SELECTION_PROPOSED", at: iso(-3), authority: "PROPOSAL_ONLY_NO_OWNER_ACKNOWLEDGEMENT" },
    { state: "DISPATCH_RECEIPT_DRAFTED", at: iso(-2), receiptId: `DRAFT-${order.id}`, authority: "DRAFT_ONLY_NO_OWNER_ACKNOWLEDGEMENT" },
    { state: "OWNER_ACKNOWLEDGED", at: iso(-1), ownerProductId: order.ownerProductId, evidencePath },
    { state: "DISPATCHED", at: iso(), laneId: "codex-heartbeat:fixture-learning-executor" }
  ];
  return { workOrderId: order.id, ownerProductId: order.ownerProductId, events: all.slice(0, all.findIndex((event) => event.state === latestState) + 1) };
}

reset();
let result = inspect();
assert.deepEqual(result.errors, []);
assert.equal(result.mode, "DISABLED_UNBOUND");
assert.equal(result.workOrders, 17);

const queue = read(queueRelative);
const eligible = queue.workOrders.filter((order) => order.dispatchState === "READY_TO_DISPATCH");
assert(eligible.length >= 2);
const queueHashBefore = hash(queueRelative);
let transition = runLearningExecutionPreparation({ root: temporaryRoot, action: "propose", workOrderId: eligible[0].id, now });
assert.equal(transition.state, "SELECTION_PROPOSED");
transition = runLearningExecutionPreparation({ root: temporaryRoot, action: "draft-receipt", workOrderId: eligible[0].id, now: new Date(now.getTime() + 1000) });
assert.equal(transition.state, "DISPATCH_RECEIPT_DRAFTED");
assert.throws(() => runLearningExecutionPreparation({ root: temporaryRoot, action: "acknowledge", workOrderId: eligible[0].id, now }), /unsupported action/);
assert.equal(hash(queueRelative), queueHashBefore);
result = inspectLearningExecutor({ root: temporaryRoot, now: new Date(now.getTime() + 1000), automationRoot });
assert.deepEqual(result.errors, []);
assert.equal(result.preparedReceipts, 1);
assert.equal(result.activeWorkOrderIds.length, 0);

reset();
let state = read(stateRelative);
state.schemaVersion = "laidies-learning-executor-state.v999";
write(stateRelative, state);
assert.throws(() => runLearningExecutionPreparation({ root: temporaryRoot, action: "propose", workOrderId: eligible[0].id, now }), /preparation refused/);

reset();
let metadata = read(metadataRelative);
metadata.records = [{ workOrderId: eligible[0].id, ownerProductId: eligible[0].ownerProductId, events: [{ state: "SELECTION_PROPOSED", at: iso(-5000) }] }];
write(metadataRelative, metadata);
assert(inspect().errors.some((error) => error.includes("stale")));

reset();
metadata = read(metadataRelative);
metadata.records = [{ workOrderId: eligible[0].id, ownerProductId: eligible[0].ownerProductId, events: [{ state: "SELECTION_PROPOSED", at: iso(5) }] }];
write(metadataRelative, metadata);
assert(inspect().errors.some((error) => error.includes("future")));

reset();
state = enabledState();
writeAutomation(state);
metadata = read(metadataRelative);
metadata.records = [preparedRecord(eligible[0]), preparedRecord(eligible[1])];
write(metadataRelative, metadata);
result = inspect();
assert(result.errors.filter((error) => error.includes("unavailable live state OWNER_ACKNOWLEDGED")).length >= 2);
assert(result.errors.some((error) => error.includes("live enablement is unavailable")));

reset();
state = read(stateRelative);
state.queueBinding.sha256 = "0".repeat(64);
write(stateRelative, state);
assert(inspect().errors.some((error) => error.includes("does not match canonical queue bytes")));

reset();
metadata = read(metadataRelative);
metadata.records = [{ workOrderId: eligible[0].id, ownerProductId: "wrong-owner", events: [{ state: "SELECTION_PROPOSED", at: iso() }] }];
write(metadataRelative, metadata);
assert(inspect().errors.some((error) => error.includes("ownerProductId is missing or wrong")));

reset();
state = read(stateRelative);
delete state.ownerTaskId;
write(stateRelative, state);
assert(inspect().errors.some((error) => error.includes("ownerTaskId is missing or wrong")));

reset();
state = enabledState();
assert(inspect().errors.some((error) => error.includes("live enablement is unavailable")));
writeAutomation(state, { kind: "cron", target: "wrong-task" });
result = inspect();
assert(result.errors.some((error) => error.includes("live enablement is unavailable")));

reset();
state = enabledState();
writeAutomation(state);
metadata = read(metadataRelative);
const terminal = preparedRecord(eligible[0], "DISPATCHED");
terminal.events[2].evidencePath = ".";
terminal.events.push({ state: "TERMINAL", at: iso(), disposition: "VERIFIED_PUBLICLY", evidencePaths: ["."] });
metadata.records = [terminal];
write(metadataRelative, metadata);
assert.equal(eligible[0].artifactBinding.status, "UNBOUND");
result = inspect();
assert(result.errors.some((error) => error.includes("unavailable live state OWNER_ACKNOWLEDGED")));
assert(result.errors.some((error) => error.includes("unavailable live state DISPATCHED")));
assert(result.errors.some((error) => error.includes("unavailable live state TERMINAL")));
assert(result.errors.some((error) => error.includes("live enablement is unavailable")));

reset();
metadata = read(metadataRelative);
metadata.records = [{
  workOrderId: eligible[0].id,
  ownerProductId: eligible[0].ownerProductId,
  events: [
    { state: "OWNER_ACKNOWLEDGED", at: iso(-1), ownerProductId: eligible[0].ownerProductId, evidencePath: "." },
    { state: "SELECTION_PROPOSED", at: iso() }
  ]
}];
write(metadataRelative, metadata);
assert(inspect().errors.some((error) => error.includes("unavailable live state OWNER_ACKNOWLEDGED")));

reset();
const unsupportedQueue = read(queueRelative);
unsupportedQueue.schemaVersion = "1.2.0";
write(queueRelative, unsupportedQueue);
assert(inspect().errors.some((error) => error.includes("unsupported canonical queue schema")));

fs.rmSync(temporaryRoot, { recursive: true, force: true });
console.log("LEARNING EXECUTOR ADAPTER TEST PASS");
console.log("transition=selection_proposed->dispatch_receipt_drafted queue_unchanged=1 active_claim=0");
console.log("rejected=invalid_state,stale,future,forbidden_live_history,changed_queue,wrong_owner,missing_owner,enabled_state,fake_public_terminal,unsupported_schema");
