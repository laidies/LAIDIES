#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkLearningExecutor } from "./check-learning-executor.mjs";

const sourceRoot = process.cwd();
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-learning-executor-"));
const automationRoot = path.join(temporaryRoot, "automations");
const stateRelative = "operations/product-stewards/learning-content-ecosystem/executor-state.json";
const queueRelative = "operations/product-stewards/learning-content-ecosystem/content-work-orders.json";
const sourceState = JSON.parse(fs.readFileSync(path.join(sourceRoot, stateRelative), "utf8"));
const sourceQueue = JSON.parse(fs.readFileSync(path.join(sourceRoot, queueRelative), "utf8"));
const now = new Date("2026-08-11T23:00:00.000Z");

function writeJson(relative, value) {
  const destination = path.join(temporaryRoot, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, JSON.stringify(value, null, 2) + "\n");
}
function writeAutomation(status = "ACTIVE") {
  const destination = path.join(automationRoot, sourceState.automationId, "automation.toml");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, [
    'kind = "heartbeat"',
    'status = "' + status + '"',
    'target_thread_id = "' + sourceState.targetThreadId + '"'
  ].join("\n") + "\n");
}
function reset() {
  const state = structuredClone(sourceState);
  state.lastHeartbeatAt = "2026-08-11T22:30:00.000Z";
  writeJson(stateRelative, state);
  writeJson(queueRelative, sourceQueue);
  for (const evidencePath of state.lastCycle.evidencePaths) {
    const destination = path.join(temporaryRoot, evidencePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, "fixture\n");
  }
  writeAutomation();
  return state;
}

reset();
let result = checkLearningExecutor({ root: temporaryRoot, automationRoot, now });
assert.equal(result.errors.length, 0);
assert.equal(result.mode, "IDLE_HEALTHY");
assert.deepEqual(result.waitingOnPrerequisiteIds, sourceState.waitingOnPrerequisiteIds || []);

let state = reset();
  state.lastHeartbeatAt = "2026-08-11T03:00:00.000Z";
writeJson(stateRelative, state);
result = checkLearningExecutor({ root: temporaryRoot, automationRoot, now });
assert(result.errors.some((error) => error.includes("EXECUTION_STALLED")));

reset();
writeAutomation("PAUSED");
result = checkLearningExecutor({ root: temporaryRoot, automationRoot, now });
assert(result.errors.some((error) => error.includes("not ACTIVE")));

state = reset();
const queue = structuredClone(sourceQueue);
const order = queue.workOrders.find((candidate) => candidate.id === "LCWO-018");
order.status = "CREATING";
order.dispatchState = "DISPATCHED";
order.execution.state = "BUILDING";
order.execution.dispatch.laneId = "codex-task:dead-lane";
state.activeWorkOrderId = "LCWO-018";
writeJson(queueRelative, queue);
writeJson(stateRelative, state);
result = checkLearningExecutor({ root: temporaryRoot, automationRoot, now });
assert(result.errors.some((error) => error.includes("not bound")));

state = reset();
const unreconciledQueue = structuredClone(sourceQueue);
unreconciledQueue.intakeCoverage.push({
  path: "operations/agents/aidb-intelligence-desk/daily/2026-08-12.md",
  checkedAt: "2026-08-12",
  disposition: "NO_BUILD_REQUIRED"
});
writeJson(queueRelative, unreconciledQueue);
writeJson(stateRelative, state);
result = checkLearningExecutor({ root: temporaryRoot, automationRoot, now });
assert(result.errors.some((error) => error.includes("requires sourceReconciliationPath")));

state = reset();
state.waitingOnPrerequisiteIds = [];
writeJson(stateRelative, state);
result = checkLearningExecutor({ root: temporaryRoot, automationRoot, now });
assert(result.errors.some((error) => error.includes("waitingOnPrerequisiteIds does not match")));

fs.rmSync(temporaryRoot, { recursive: true, force: true });
console.log("LEARNING EXECUTOR TEST PASS");
console.log("calibration=stale-heartbeat,paused-automation,dead-lane,unreconciled-source-intake,hidden-prerequisite rejected");
