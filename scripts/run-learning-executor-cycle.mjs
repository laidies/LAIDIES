#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { checkContentWorkOrders } from "./check-content-work-orders.mjs";

const root = process.cwd();
const statePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/executor-state.json");
const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const contentResult = checkContentWorkOrders({ root });
if (contentResult.errors.length) {
  console.error("LEARNING EXECUTOR HEARTBEAT REFUSED");
  for (const error of contentResult.errors) console.error("- " + error);
  process.exit(1);
}

const active = (queue.workOrders || []).filter((order) => ["DISPATCHED", "BUILDING"].includes(order.execution?.state));
if (active.length > 1) {
  console.error("LEARNING EXECUTOR HEARTBEAT REFUSED");
  console.error("- more than one active work order: " + active.map((order) => order.id).join(","));
  process.exit(1);
}
if (active.length === 1) {
  const expectedLane = "codex-heartbeat:" + state.automationId;
  if (active[0].execution?.dispatch?.laneId !== expectedLane) {
    console.error("LEARNING EXECUTOR HEARTBEAT REFUSED");
    console.error("- " + active[0].id + " is not bound to " + expectedLane);
    process.exit(1);
  }
}

state.lastHeartbeatAt = new Date().toISOString();
state.activeWorkOrderId = active[0]?.id || null;
state.nextAction = active.length
  ? "Continue the exact nextAction for " + active[0].id + "; record a terminal disposition or a truthful current checkpoint."
  : "Validate current sources and work-order state; dispatch at most one eligible primary output or remain IDLE_HEALTHY with evidence.";
const temporaryPath = statePath + ".tmp-" + process.pid;
fs.writeFileSync(temporaryPath, JSON.stringify(state, null, 2) + "\n");
fs.renameSync(temporaryPath, statePath);
console.log("LEARNING EXECUTOR HEARTBEAT RECORDED");
console.log("mode=" + (active.length ? "ACTIVE" : "IDLE_HEALTHY"));
console.log("active_work_order=" + (state.activeWorkOrderId || "none"));
console.log("heartbeat=" + state.lastHeartbeatAt);
