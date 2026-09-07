#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OWNER_TASK_ID = "019f9f7f-9e4c-72d2-8882-447bcbe01691";
const QUEUE_RELATIVE = "operations/product-stewards/learning-content-ecosystem/content-work-orders.json";
const STATE_RELATIVE = "operations/product-stewards/learning-content-ecosystem/executor-state.json";
const METADATA_RELATIVE = "operations/product-stewards/learning-content-ecosystem/execution-metadata.json";
const STATES = ["SELECTION_PROPOSED", "DISPATCH_RECEIPT_DRAFTED"];
const FORBIDDEN_FUTURE_STATES = new Set(["OWNER_ACKNOWLEDGED", "DISPATCHED", "TERMINAL"]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function checkBinding(binding, queueBytes, queue, label, errors) {
  if (!binding || typeof binding !== "object") {
    errors.push(`${label} queueBinding is missing`);
    return;
  }
  if (binding.path !== QUEUE_RELATIVE) errors.push(`${label} queueBinding path is invalid`);
  if (binding.schemaVersion !== "1.1.0") errors.push(`${label} queueBinding schemaVersion must be 1.1.0`);
  if (binding.schemaVersion !== queue.schemaVersion) errors.push(`${label} queueBinding schemaVersion does not match queue`);
  if (binding.sha256 !== sha256(queueBytes)) errors.push(`${label} queueBinding sha256 does not match canonical queue bytes`);
}

export function inspectLearningExecutor({
  root = process.cwd(),
  now = new Date(),
  statePath = path.join(root, STATE_RELATIVE),
  metadataPath = path.join(root, METADATA_RELATIVE)
} = {}) {
  const errors = [];
  const queuePath = path.join(root, QUEUE_RELATIVE);
  let queueBytes;
  let queue;
  let state;
  let metadata;
  try {
    queueBytes = fs.readFileSync(queuePath);
    queue = JSON.parse(queueBytes.toString("utf8"));
  } catch (error) {
    return { errors: [`canonical queue is unreadable: ${error.message}`], mode: "INVALID" };
  }
  try { state = readJson(statePath); } catch (error) { return { errors: [`executor state is unreadable: ${error.message}`], mode: "INVALID" }; }
  try { metadata = readJson(metadataPath); } catch (error) { return { errors: [`execution metadata is unreadable: ${error.message}`], mode: "INVALID" }; }

  if (queue.schemaVersion !== "1.1.0") errors.push(`unsupported canonical queue schema ${queue.schemaVersion || "MISSING"}`);
  if (!Array.isArray(queue.workOrders)) errors.push("canonical queue workOrders must be an array");
  if (state.schemaVersion !== "laidies-learning-executor-state.v2") errors.push("unsupported executor state schema");
  if (state.ownerTaskId !== OWNER_TASK_ID) errors.push("executor ownerTaskId is missing or wrong");
  if (state.status !== "DISABLED_UNBOUND") errors.push("executor must remain DISABLED_UNBOUND; live enablement is unavailable");
  if (!Number.isFinite(state.maxOpenAgeMinutes) || state.maxOpenAgeMinutes < 1) errors.push("executor maxOpenAgeMinutes is invalid");
  if (metadata.schemaVersion !== "laidies-learning-execution-metadata.v1") errors.push("unsupported execution metadata schema");
  if (!Array.isArray(metadata.records)) errors.push("execution metadata records must be an array");
  checkBinding(state.queueBinding, queueBytes, queue, "executor state", errors);
  checkBinding(metadata.queueBinding, queueBytes, queue, "execution metadata", errors);

  const automation = state.automation || {};
  if (automation.status !== "UNBOUND" || automation.id !== null || automation.laneId !== null || automation.targetThreadId !== null) {
    errors.push("disabled executor must have an unbound null automation");
  }

  const orders = new Map((queue.workOrders || []).map((order) => [order.id, order]));
  const seen = new Set();
  for (const record of metadata.records || []) {
    const id = record?.workOrderId || "MISSING";
    if (seen.has(id)) errors.push(`duplicate execution record ${id}`);
    seen.add(id);
    const order = orders.get(id);
    if (!order) errors.push(`${id} is not present in the canonical queue`);
    if (!record?.ownerProductId || record.ownerProductId !== order?.ownerProductId) errors.push(`${id} ownerProductId is missing or wrong`);
    if (!Array.isArray(record?.events) || record.events.length === 0) {
      errors.push(`${id} events are missing`);
      continue;
    }
    let priorIndex = -1;
    for (const event of record.events) {
      if (FORBIDDEN_FUTURE_STATES.has(event?.state)) errors.push(`${id} contains unavailable live state ${event.state}`);
      const index = STATES.indexOf(event?.state);
      if (index < 0) errors.push(`${id} has invalid execution state ${event?.state || "MISSING"}`);
      else if (index !== priorIndex + 1) errors.push(`${id} has invalid state transition to ${event.state}`);
      priorIndex = index;
      const timestamp = Date.parse(event?.at || "");
      if (!Number.isFinite(timestamp)) errors.push(`${id} has invalid event timestamp`);
      else if (timestamp > now.getTime() + 60000) errors.push(`${id} has an event timestamp in the future`);
      if (event?.state === "DISPATCH_RECEIPT_DRAFTED") {
        if (!event.receiptId || event.authority !== "DRAFT_ONLY_NO_OWNER_ACKNOWLEDGEMENT") {
          errors.push(`${id} has an invalid draft receipt`);
        }
      }
    }
    const latest = record.events.at(-1);
    const latestAt = Date.parse(latest?.at || "");
    if (Number.isFinite(latestAt) && Number.isFinite(state.maxOpenAgeMinutes) && now.getTime() - latestAt > state.maxOpenAgeMinutes * 60000) {
      errors.push(`${id} open execution metadata is stale`);
    }
    if (latest?.state === "SELECTION_PROPOSED" && order?.dispatchState !== "READY_TO_DISPATCH") errors.push(`${id} is not eligible for producer-preflight selection`);
  }

  const prepared = (metadata.records || []).filter((record) => record.events?.at(-1)?.state === "DISPATCH_RECEIPT_DRAFTED").length;
  return {
    errors,
    mode: errors.length ? "INVALID" : state.status,
    queueSha256: sha256(queueBytes),
    workOrders: orders.size,
    preparedReceipts: prepared,
    activeWorkOrderIds: []
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const result = inspectLearningExecutor();
  if (result.errors.length) {
    console.error("LEARNING EXECUTOR CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("LEARNING EXECUTOR CHECK PASS");
  console.log(`mode=${result.mode}`);
  console.log(`work_orders=${result.workOrders}`);
  console.log(`prepared_receipts=${result.preparedReceipts}`);
  console.log(`active_work_orders=${result.activeWorkOrderIds.join(",") || "none"}`);
}
