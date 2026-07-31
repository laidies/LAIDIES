#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GATES = [
  "accuracy", "antiSlop", "currentBestPractice", "laidiesVoice", "analogyIntegrity",
  "usefulnessDepth", "formatFit", "searchIndexing", "relationshipLinking",
  "canonConsistency", "songOpportunity", "derivativeFeeds"
];
const BOUND_STATUSES = new Set(["EDITORIAL_REVIEW", "CONTENT_VERIFIED", "EXPERIENCE_VERIFIED", "APPROVED", "DEPLOYED", "VERIFIED_PUBLICLY"]);

function walk(directory, predicate) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute, predicate);
    return predicate(absolute) ? [absolute] : [];
  });
}

export function checkContentWorkOrders({ root = process.cwd() } = {}) {
  const errors = [];
  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  const registryPath = path.join(root, "operations/product-stewards/registry.json");
  let queue;
  let registry;
  try { queue = JSON.parse(fs.readFileSync(queuePath, "utf8")); } catch (error) { return { errors: [`content work orders invalid: ${error.message}`] }; }
  try { registry = JSON.parse(fs.readFileSync(registryPath, "utf8")); } catch (error) { return { errors: [`product registry invalid: ${error.message}`] }; }
  if (queue.schemaVersion !== "1.1.0") errors.push("content work orders schemaVersion must be 1.1.0");
  const productIds = new Set(registry.products.map((product) => product.id));
  const orders = new Map();
  for (const order of queue.workOrders || []) {
    if (orders.has(order.id)) errors.push(`duplicate content work order ${order.id}`);
    orders.set(order.id, order);
    if (!productIds.has(order.ownerProductId)) errors.push(`${order.id} has unknown ownerProductId ${order.ownerProductId}`);
    for (const field of ["title", "nextAction", "nextTrigger"]) if (!order[field]) errors.push(`${order.id} missing ${field}`);
    for (const field of ["sourceRefs", "targetPaths", "acceptanceEvidence", "reviewChain"]) {
      if (!Array.isArray(order[field]) || order[field].length === 0) errors.push(`${order.id} missing ${field}`);
    }
    for (const gateName of GATES) {
      const gate = order.qualityGates?.[gateName];
      if (!gate) { errors.push(`${order.id} missing quality gate ${gateName}`); continue; }
      if (!gate.owner || !gate.evidenceRequired) errors.push(`${order.id} ${gateName} lacks owner/evidence requirement`);
      if (gate.status === "PASS" && (!Array.isArray(gate.evidencePaths) || gate.evidencePaths.length === 0)) {
        errors.push(`${order.id} ${gateName} claims PASS without evidence`);
      }
    }
    if (BOUND_STATUSES.has(order.status) && order.artifactBinding?.status !== "BOUND") errors.push(`${order.id} ${order.status} lacks a bound artifact`);
    if (order.artifactBinding?.status === "BOUND" && (!order.artifactBinding.manifestPath || !/^[a-f0-9]{64}$/.test(order.artifactBinding.sha256 || ""))) {
      errors.push(`${order.id} has incomplete artifact binding`);
    }
    if (order.status === "VERIFIED_PUBLICLY") {
      if (!order.publicRelease?.url || !order.publicRelease?.releaseReceipt || !/^[a-f0-9]{64}$/.test(order.publicRelease?.sha256 || "")) {
        errors.push(`${order.id} claims VERIFIED_PUBLICLY without exact public release proof`);
      }
    }
    if (order.status === "QUEUED_WITH_TRIGGER" && order.dispatchState !== "NOT_READY") errors.push(`${order.id} queued trigger must be NOT_READY`);
    if (order.status === "BUILT_LOCALLY") {
      for (const target of order.targetPaths) {
        const fileTarget = target.split("#")[0];
        if (!fs.existsSync(path.join(root, fileTarget))) errors.push(`${order.id} built target missing: ${fileTarget}`);
      }
    }
  }

  const coverage = new Map((queue.intakeCoverage || []).map((item) => [item.path, item]));
  const requiredCoverage = [
    ...walk(path.join(root, "operations/product-stewards/learning-content-ecosystem"), (file) => /NEWSSTAND-INTAKE-.*\.md$/.test(file)),
    ...walk(path.join(root, "operations/product-stewards/newsstand/validation-receipts"), (file) => /stage-4-learning-system-concepts-.*\.md$/.test(file))
  ].map((file) => path.relative(root, file));
  for (const requiredPath of requiredCoverage) if (!coverage.has(requiredPath)) errors.push(`uncovered learning-impact record: ${requiredPath}`);
  for (const item of queue.intakeCoverage || []) {
    if (!fs.existsSync(path.join(root, item.path))) errors.push(`coverage path missing: ${item.path}`);
    for (const id of item.workOrderIds || []) if (!orders.has(id)) errors.push(`${item.path} references missing ${id}`);
    if (item.disposition === "NO_BUILD_REQUIRED" && !item.reason) errors.push(`${item.path} declines build without a reason`);
  }
  return {
    errors,
    workOrders: orders.size,
    coveredRecords: coverage.size,
    readyToDispatch: [...orders.values()].filter((order) => order.dispatchState === "READY_TO_DISPATCH").map((order) => order.id),
    queuedWithTrigger: [...orders.values()].filter((order) => order.status === "QUEUED_WITH_TRIGGER").map((order) => order.id)
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const result = checkContentWorkOrders();
  if (result.errors.length) {
    console.error("CONTENT WORK ORDER CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("CONTENT WORK ORDER CHECK PASS");
  console.log(`work_orders=${result.workOrders}`);
  console.log(`covered_records=${result.coveredRecords}`);
  console.log(`ready_to_dispatch=${result.readyToDispatch.join(",") || "none"}`);
  console.log(`queued_with_trigger=${result.queuedWithTrigger.join(",") || "none"}`);
}
