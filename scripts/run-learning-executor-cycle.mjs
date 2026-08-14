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
const waiting = (queue.workOrders || []).filter((order) => order.execution?.state === "WAITING_ON_PREREQUISITE");
const ready = (queue.workOrders || []).filter((order) => order.dispatchState === "READY_TO_DISPATCH");
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
state.waitingOnPrerequisiteIds = waiting.map((order) => order.id);
state.readyToDispatchIds = ready.map((order) => order.id);
state.nextAction = active.length
  ? "Continue the exact nextAction for " + active[0].id + "; record a terminal disposition or a truthful current checkpoint."
  : ready.length
    ? "Dispatch at most one eligible primary output: " + ready.map((order) => order.id).join(", ") + "."
    : waiting.length
      ? "No primary output is dispatchable; preserve and report exact prerequisites for: " + waiting.map((order) => order.id).join(", ") + "."
      : "Validate current sources and work-order state; no active, ready or prerequisite-held primary output exists.";
const temporaryPath = statePath + ".tmp-" + process.pid;
fs.writeFileSync(temporaryPath, JSON.stringify(state, null, 2) + "\n");
fs.renameSync(temporaryPath, statePath);
console.log("LEARNING EXECUTOR HEARTBEAT RECORDED");
console.log("mode=" + (active.length ? "ACTIVE" : ready.length ? "READY_TO_DISPATCH" : waiting.length ? "WAITING_ON_PREREQUISITE" : "IDLE_HEALTHY"));
console.log("active_work_order=" + (state.activeWorkOrderId || "none"));
console.log("ready_to_dispatch=" + (state.readyToDispatchIds.join(",") || "none"));
console.log("waiting_on_prerequisite=" + (state.waitingOnPrerequisiteIds.join(",") || "none"));
console.log("heartbeat=" + state.lastHeartbeatAt);
