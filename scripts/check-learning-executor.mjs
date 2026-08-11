#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ACTIVE_EXECUTION_STATES = new Set(["DISPATCHED", "BUILDING"]);
const TERMINAL_STATUSES = new Set(["DECLINED", "VERIFIED_PUBLICLY"]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseTomlValue(source, key) {
  const match = source.match(new RegExp("^" + key + "\\s*=\\s*\"([^\"]*)\"", "m"));
  return match ? match[1] : null;
}

export function checkLearningExecutor({
  root = process.cwd(),
  now = new Date(),
  automationRoot = process.env.CODEX_HOME
    ? path.join(process.env.CODEX_HOME, "automations")
    : path.join(os.homedir(), ".codex", "automations")
} = {}) {
  const errors = [];
  const statePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/executor-state.json");
  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  let state;
  let queue;
  try { state = readJson(statePath); } catch (error) { return { errors: ["executor state invalid: " + error.message] }; }
  try { queue = readJson(queuePath); } catch (error) { return { errors: ["content work orders invalid: " + error.message] }; }

  if (state.schemaVersion !== "laidies-learning-executor.v1") errors.push("executor state schemaVersion must be laidies-learning-executor.v1");
  if (state.status !== "ACTIVE") errors.push("executor state must be ACTIVE");
  if (state.cadence !== "HOURLY") errors.push("executor cadence must be HOURLY");
  if (!Number.isFinite(state.maxHeartbeatAgeMinutes) || state.maxHeartbeatAgeMinutes < 1) errors.push("executor maxHeartbeatAgeMinutes is invalid");
  if (!state.automationId) errors.push("executor automationId is missing");
  if (!state.targetThreadId) errors.push("executor targetThreadId is missing");

  const heartbeat = Date.parse(state.lastHeartbeatAt || "");
  const heartbeatAge = now.getTime() - heartbeat;
  if (!Number.isFinite(heartbeat)) errors.push("executor lastHeartbeatAt is invalid");
  else if (heartbeatAge < -60000) errors.push("executor heartbeat is in the future");
  else if (heartbeatAge > state.maxHeartbeatAgeMinutes * 60000) errors.push("EXECUTION_STALLED: heartbeat expired at " + state.lastHeartbeatAt);

  const automationPath = path.join(automationRoot, state.automationId || "", "automation.toml");
  if (!fs.existsSync(automationPath)) {
    errors.push("executor automation file is missing: " + automationPath);
  } else {
    const automation = fs.readFileSync(automationPath, "utf8");
    if (parseTomlValue(automation, "status") !== "ACTIVE") errors.push("executor automation is not ACTIVE");
    if (parseTomlValue(automation, "kind") !== "heartbeat") errors.push("executor automation is not a heartbeat");
    if (parseTomlValue(automation, "target_thread_id") !== state.targetThreadId) errors.push("executor automation target thread does not match state");
  }

  const orders = queue.workOrders || [];
  const active = orders.filter((order) => ACTIVE_EXECUTION_STATES.has(order.execution?.state));
  if (active.length > 1) errors.push("executor has more than one active work order: " + active.map((order) => order.id).join(","));
  const actualActiveId = active[0]?.id || null;
  if (state.activeWorkOrderId !== actualActiveId) {
    errors.push("executor activeWorkOrderId does not match the work-order queue");
  }
  for (const order of active) {
    const expectedLane = "codex-heartbeat:" + state.automationId;
    if (order.execution?.dispatch?.laneId !== expectedLane) {
      errors.push(order.id + " active dispatch is not bound to " + expectedLane);
    }
  }

  const lastOrder = orders.find((order) => order.id === state.lastCycle?.workOrderId);
  if (!lastOrder) {
    errors.push("executor lastCycle work order is missing");
  } else {
    if (!TERMINAL_STATUSES.has(lastOrder.status)) errors.push("executor lastCycle does not name a terminal work order");
    if (lastOrder.execution?.state !== "CLOSED") errors.push("executor lastCycle work order is not CLOSED");
    for (const evidencePath of state.lastCycle?.evidencePaths || []) {
      if (!fs.existsSync(path.join(root, evidencePath))) errors.push("executor lastCycle evidence is missing: " + evidencePath);
    }
  }

  return {
    errors,
    mode: errors.length ? "INVALID" : actualActiveId ? "ACTIVE" : "IDLE_HEALTHY",
    activeWorkOrderId: actualActiveId,
    lastCycleWorkOrderId: state.lastCycle?.workOrderId || null,
    automationPath
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const result = checkLearningExecutor();
  if (result.errors.length) {
    console.error("LEARNING EXECUTOR CHECK FAIL");
    for (const error of result.errors) console.error("- " + error);
    process.exit(1);
  }
  console.log("LEARNING EXECUTOR CHECK PASS");
  console.log("mode=" + result.mode);
  console.log("active_work_order=" + (result.activeWorkOrderId || "none"));
  console.log("last_cycle=" + (result.lastCycleWorkOrderId || "none"));
}
