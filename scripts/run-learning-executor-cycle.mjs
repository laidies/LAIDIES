#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectLearningExecutor } from "./check-learning-executor.mjs";

const QUEUE_RELATIVE = "operations/product-stewards/learning-content-ecosystem/content-work-orders.json";
const METADATA_RELATIVE = "operations/product-stewards/learning-content-ecosystem/execution-metadata.json";

function writeJsonAtomic(filePath, value) {
  const temporary = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(temporary, filePath);
}

export function runLearningExecutionPreparation({ root = process.cwd(), action, workOrderId, now = new Date() }) {
  const before = inspectLearningExecutor({ root, now });
  if (before.errors.length) throw new Error(`preparation refused: ${before.errors.join("; ")}`);
  const queue = JSON.parse(fs.readFileSync(path.join(root, QUEUE_RELATIVE), "utf8"));
  const metadataPath = path.join(root, METADATA_RELATIVE);
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const order = queue.workOrders.find((candidate) => candidate.id === workOrderId);
  if (!order) throw new Error(`preparation refused: unknown work order ${workOrderId}`);
  let record = metadata.records.find((candidate) => candidate.workOrderId === workOrderId);
  const at = now.toISOString();

  if (action === "propose") {
    if (record) throw new Error(`preparation refused: ${workOrderId} already has execution metadata`);
    if (order.dispatchState !== "READY_TO_DISPATCH") throw new Error(`preparation refused: ${workOrderId} is not eligible for producer preflight`);
    record = {
      workOrderId,
      ownerProductId: order.ownerProductId,
      events: [{ state: "SELECTION_PROPOSED", at, authority: "PROPOSAL_ONLY_NO_OWNER_ACKNOWLEDGEMENT" }]
    };
    metadata.records.push(record);
  } else if (action === "draft-receipt") {
    if (!record || record.events.at(-1)?.state !== "SELECTION_PROPOSED") throw new Error(`preparation refused: ${workOrderId} lacks a current proposal`);
    record.events.push({
      state: "DISPATCH_RECEIPT_DRAFTED",
      at,
      receiptId: `DRAFT-${workOrderId}-${at.replace(/[^0-9]/g, "").slice(0, 14)}`,
      authority: "DRAFT_ONLY_NO_OWNER_ACKNOWLEDGEMENT"
    });
  } else {
    throw new Error(`preparation refused: unsupported action ${action || "MISSING"}`);
  }

  const temporaryPath = `${metadataPath}.candidate-${process.pid}`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(metadata, null, 2)}\n`);
  const after = inspectLearningExecutor({ root, now, metadataPath: temporaryPath });
  if (after.errors.length) {
    fs.unlinkSync(temporaryPath);
    throw new Error(`preparation refused: ${after.errors.join("; ")}`);
  }
  fs.unlinkSync(temporaryPath);
  writeJsonAtomic(metadataPath, metadata);
  return { action, workOrderId, state: record.events.at(-1).state, mode: after.mode };
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  try {
    const result = runLearningExecutionPreparation({
      root: argument("--root") || process.cwd(),
      action: argument("--action"),
      workOrderId: argument("--work-order"),
      now: argument("--now") ? new Date(argument("--now")) : new Date()
    });
    console.log("LEARNING EXECUTION PREPARATION PASS");
    console.log(`work_order=${result.workOrderId}`);
    console.log(`state=${result.state}`);
    console.log("authority=preparation-only");
  } catch (error) {
    console.error("LEARNING EXECUTION PREPARATION REFUSED");
    console.error(`- ${error.message}`);
    process.exit(1);
  }
}
