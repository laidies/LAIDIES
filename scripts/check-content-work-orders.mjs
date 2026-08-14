#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectContentProducerContract } from "./check-content-producer-contract.mjs";
import { inspectProseQualityReview } from "./check-prose-quality-admission.mjs";

const ACTIVE_EXECUTION_STATES = new Set(["DISPATCHED", "BUILDING"]);
const BOUND_STATUSES = new Set(["EDITORIAL_REVIEW", "CONTENT_VERIFIED", "EXPERIENCE_VERIFIED", "APPROVED", "DEPLOYED", "VERIFIED_PUBLICLY"]);
const CONTRACT_REQUIRED_STATUSES = new Set(["BUILT_LOCALLY", ...BOUND_STATUSES]);
const REVIEW_REQUIRED_STATUSES = new Set(["EDITORIAL_REVIEW", ...BOUND_STATUSES]);

function walk(directory, predicate) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute, predicate);
    return predicate(absolute) ? [absolute] : [];
  });
}
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateProducerContract({ root, order, errors }) {
  if (!order.producerContractPath || !fs.existsSync(path.join(root, order.producerContractPath))) {
    errors.push(`${order.id} ${order.status} lacks producerContractPath`);
    return;
  }
  try {
    const contract = readJson(path.join(root, order.producerContractPath));
    const result = inspectContentProducerContract(contract, { root });
    if (contract.candidateId !== order.id || contract.status !== "READY_TO_DRAFT" || result.errors.length) {
      errors.push(`${order.id} ${order.status} has invalid producer contract`);
    }
  } catch (error) {
    errors.push(`${order.id} producer contract unreadable: ${error.message}`);
  }
}

function validateReview({ root, order, field, stage, errors }) {
  if (!order[field] || !fs.existsSync(path.join(root, order[field]))) {
    errors.push(`${order.id} ${order.status} lacks ${field}`);
    return;
  }
  try {
    const review = readJson(path.join(root, order[field]));
    const result = inspectProseQualityReview(review, { root });
    if (review.candidateId !== order.id || review.stage !== stage || review.verdict !== "PASS" || result.errors.length) {
      errors.push(`${order.id} ${order.status} has invalid ${field}`);
    }
  } catch (error) {
    errors.push(`${order.id} ${field} unreadable: ${error.message}`);
  }
}

function validateDispatchReceipt({ root, order, errors }) {
  const dispatch = order.execution?.dispatch;
  if (!dispatch) {
    errors.push(`${order.id} ${order.execution?.state || "UNKNOWN"} lacks a dispatch receipt binding`);
    return;
  }
  const required = ["receiptId", "receiptPath", "ownerId", "laneId", "collisionBoundary", "dispatchedAt", "checkpointAt", "slaDueAt"];
  for (const field of required) if (!dispatch[field]) errors.push(`${order.id} dispatch missing ${field}`);
  if (!Array.isArray(dispatch.acceptedScope) || dispatch.acceptedScope.length === 0) errors.push(`${order.id} dispatch missing acceptedScope`);
  if (dispatch.ownerId !== order.ownerProductId) errors.push(`${order.id} dispatch owner does not match ownerProductId`);
  const receiptPath = dispatch.receiptPath && path.join(root, dispatch.receiptPath);
  if (!receiptPath || !fs.existsSync(receiptPath)) {
    errors.push(`${order.id} dispatch receipt file missing`);
    return;
  }
  try {
    const receipt = readJson(receiptPath);
    if (
      receipt.workOrderId !== order.id ||
      receipt.receiptId !== dispatch.receiptId ||
      receipt.ownerId !== dispatch.ownerId ||
      receipt.laneId !== dispatch.laneId ||
      JSON.stringify(receipt.acceptedScope) !== JSON.stringify(dispatch.acceptedScope) ||
      receipt.collisionBoundary !== dispatch.collisionBoundary ||
      receipt.dispatchedAt !== dispatch.dispatchedAt ||
      receipt.checkpointAt !== dispatch.checkpointAt ||
      receipt.slaDueAt !== dispatch.slaDueAt
    ) errors.push(`${order.id} dispatch receipt does not match the queue binding`);
  } catch (error) {
    errors.push(`${order.id} dispatch receipt unreadable: ${error.message}`);
  }
}

export function checkContentWorkOrders({ root = process.cwd(), now = new Date() } = {}) {
  const errors = [];
  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  const registryPath = path.join(root, "operations/product-stewards/registry.json");
  const pipelinePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json");
  let queue;
  let registry;
  let pipelines;
  try { queue = readJson(queuePath); } catch (error) { return { errors: [`content work orders invalid: ${error.message}`] }; }
  try { registry = readJson(registryPath); } catch (error) { return { errors: [`product registry invalid: ${error.message}`] }; }
  try { pipelines = readJson(pipelinePath); } catch (error) { return { errors: [`publication pipeline registry invalid: ${error.message}`] }; }

  if (queue.schemaVersion !== "1.2.0") errors.push("content work orders schemaVersion must be 1.2.0");
  const productIds = new Set(registry.products.map((product) => product.id));
  const publicationFormatIds = new Set((pipelines.formats || []).map((format) => format.id));
  const orders = new Map();

  for (const order of queue.workOrders || []) {
    if (orders.has(order.id)) errors.push(`duplicate content work order ${order.id}`);
    orders.set(order.id, order);
    if (!productIds.has(order.ownerProductId)) errors.push(`${order.id} has unknown ownerProductId ${order.ownerProductId}`);
    for (const field of ["title", "nextAction", "nextTrigger"]) if (!order[field]) errors.push(`${order.id} missing ${field}`);
    for (const field of ["sourceRefs", "targetPaths", "acceptanceEvidence", "reviewChain"]) {
      if (!Array.isArray(order[field]) || order[field].length === 0) errors.push(`${order.id} missing ${field}`);
    }
    if (order.surface === "NEWSSTAND") {
      if (!Array.isArray(order.publicationFormatIds) || order.publicationFormatIds.length === 0) {
        errors.push(`${order.id} NEWSSTAND work order lacks publicationFormatIds`);
      }
      for (const formatId of order.publicationFormatIds || []) {
        if (!publicationFormatIds.has(formatId)) errors.push(`${order.id} references unknown publication format ${formatId}`);
        if (formatId === "news_tribune") errors.push(`${order.id} uses retired public format id news_tribune`);
      }
      if (order.status !== "DECLINED") {
        if (!Array.isArray(order.formatRouting) || order.formatRouting.length === 0) {
          errors.push(`${order.id} NEWSSTAND work order lacks formatRouting`);
        }
        const routedFormats = new Set();
        for (const route of order.formatRouting || []) {
          routedFormats.add(route.publicationFormatId);
          if (!(order.publicationFormatIds || []).includes(route.publicationFormatId)) errors.push(`${order.id} routes an undeclared publication format ${route.publicationFormatId}`);
          if (!["PRIMARY_OUTPUT", "CONTRIBUTING_EVIDENCE", "UPDATE_EXISTING", "RELATED_READING"].includes(route.relationship)) errors.push(`${order.id} has invalid format relationship ${route.relationship}`);
          if (!route.contributionJob) errors.push(`${order.id} format route lacks contributionJob`);
          if (!Array.isArray(route.sourceVersionIds) || route.sourceVersionIds.length === 0) errors.push(`${order.id} format route lacks sourceVersionIds`);
        }
        for (const formatId of order.publicationFormatIds || []) if (!routedFormats.has(formatId)) errors.push(`${order.id} lacks routing detail for ${formatId}`);
      }
    }

    const execution = order.execution;
    if (!execution) {
      errors.push(`${order.id} missing execution control`);
      continue;
    }
    if (execution.primaryOutput?.ownerProductId !== order.ownerProductId || execution.primaryOutput?.surface !== order.surface) {
      errors.push(`${order.id} primary output does not match its owner/surface`);
    }
    if (JSON.stringify(execution.primaryOutput?.targetPaths) !== JSON.stringify(order.targetPaths)) {
      errors.push(`${order.id} primary output targetPaths do not match the work order`);
    }
    if (!Number.isInteger(execution.wip?.ownerLimit) || execution.wip.ownerLimit < 1) errors.push(`${order.id} has invalid owner WIP limit`);
    if (!Array.isArray(execution.requiredPrimaryGates) || execution.requiredPrimaryGates.length === 0) {
      errors.push(`${order.id} has no required primary gates`);
    } else {
      for (const gateName of execution.requiredPrimaryGates) {
        const gate = order.qualityGates?.[gateName];
        if (!gate) { errors.push(`${order.id} missing primary quality gate ${gateName}`); continue; }
        if (!gate.owner || !gate.evidenceRequired) errors.push(`${order.id} ${gateName} lacks owner/evidence requirement`);
        if (gate.status === "PASS" && (!Array.isArray(gate.evidencePaths) || gate.evidencePaths.length === 0)) errors.push(`${order.id} ${gateName} claims PASS without evidence`);
      }
    }
    for (const derivative of execution.derivatives || []) {
      if (!["APPLICABLE", "PARKED", "NOT_APPLICABLE", "COMPLETE"].includes(derivative.state)) errors.push(`${order.id} derivative ${derivative.id} has invalid state`);
      if (!derivative.reason || !derivative.activationTrigger) errors.push(`${order.id} derivative ${derivative.id} lacks reason/trigger`);
      if (derivative.state === "APPLICABLE" && !derivative.childWorkOrderId) errors.push(`${order.id} applicable derivative ${derivative.id} lacks childWorkOrderId`);
    }

    if (order.dispatchState === "READY_TO_DISPATCH" && execution.state !== "BACKLOG") errors.push(`${order.id} READY_TO_DISPATCH must be BACKLOG`);
    if (order.dispatchState === "DISPATCHED" && !ACTIVE_EXECUTION_STATES.has(execution.state)) errors.push(`${order.id} DISPATCHED has non-active execution state ${execution.state}`);
    if (ACTIVE_EXECUTION_STATES.has(execution.state)) validateDispatchReceipt({ root, order, errors });
    if (ACTIVE_EXECUTION_STATES.has(execution.state)) {
      const due = Date.parse(execution.dispatch?.slaDueAt || "");
      if (!Number.isFinite(due)) errors.push(`${order.id} dispatch has invalid slaDueAt`);
      else if (due < now.getTime()) errors.push(`${order.id} EXECUTION_STALLED: SLA expired at ${execution.dispatch.slaDueAt}`);
    }

    if (CONTRACT_REQUIRED_STATUSES.has(order.status)) validateProducerContract({ root, order, errors });
    if (REVIEW_REQUIRED_STATUSES.has(order.status)) validateReview({ root, order, field: "producerReviewPath", stage: "PRODUCER_SELF_REVIEW", errors });
    if (["CONTENT_VERIFIED", "EXPERIENCE_VERIFIED", "APPROVED", "DEPLOYED", "VERIFIED_PUBLICLY"].includes(order.status)) {
      validateReview({ root, order, field: "semanticAdmissionPath", stage: "INDEPENDENT_SEMANTIC_ADMISSION", errors });
    }

    if (BOUND_STATUSES.has(order.status) && order.artifactBinding?.status !== "BOUND") errors.push(`${order.id} ${order.status} lacks a bound artifact`);
    if (order.artifactBinding?.status === "BOUND" && (!order.artifactBinding.manifestPath || !/^[a-f0-9]{64}$/.test(order.artifactBinding.sha256 || ""))) errors.push(`${order.id} has incomplete artifact binding`);
    if (order.status === "VERIFIED_PUBLICLY") {
      if (!order.publicRelease?.url || !order.publicRelease?.releaseReceipt || !/^[a-f0-9]{64}$/.test(order.publicRelease?.sha256 || "")) errors.push(`${order.id} claims VERIFIED_PUBLICLY without exact public release proof`);
      if (execution.closure?.state !== "VERIFIED_PUBLICLY") errors.push(`${order.id} VERIFIED_PUBLICLY lacks matching closure`);
    }
    if (order.status === "DECLINED" && (execution.state !== "CLOSED" || execution.closure?.state !== "DECLINED" || !execution.closure?.receiptPath || !execution.closure?.reason)) {
      errors.push(`${order.id} DECLINED lacks an exact closure receipt/reason`);
    }
    if (order.status === "QUEUED_WITH_TRIGGER" && order.dispatchState !== "NOT_READY") errors.push(`${order.id} queued trigger must be NOT_READY`);
  }

  for (const order of orders.values()) {
    for (const derivative of order.execution?.derivatives || []) {
      if (derivative.state === "APPLICABLE") {
        const child = orders.get(derivative.childWorkOrderId);
        if (!child || child.parentWorkOrderId !== order.id) errors.push(`${order.id} derivative ${derivative.id} does not have a distinct bound child work order`);
      }
    }
  }

  const active = [...orders.values()].filter((order) => ACTIVE_EXECUTION_STATES.has(order.execution?.state));
  const byOwner = new Map();
  for (const order of active) {
    const list = byOwner.get(order.ownerProductId) || [];
    list.push(order);
    byOwner.set(order.ownerProductId, list);
  }
  for (const [owner, list] of byOwner) {
    const limit = Math.min(...list.map((order) => order.execution.wip.ownerLimit));
    if (list.length > limit) errors.push(`owner WIP exceeded for ${owner}: active=${list.map((order) => order.id).join(",")} limit=${limit}`);
  }
  for (let i = 0; i < active.length; i += 1) {
    const left = new Set(active[i].execution.dispatch?.acceptedScope || []);
    for (let j = i + 1; j < active.length; j += 1) {
      const overlap = (active[j].execution.dispatch?.acceptedScope || []).filter((item) => left.has(item));
      if (overlap.length) errors.push(`active dispatch collision ${active[i].id}/${active[j].id}: ${overlap.join(",")}`);
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
    activeDispatches: active.map((order) => order.id),
    waitingOnPrerequisite: [...orders.values()].filter((order) => order.execution?.state === "WAITING_ON_PREREQUISITE").map((order) => order.id),
    reconciliationRequired: [...orders.values()].filter((order) => order.execution?.state === "RECONCILIATION_REQUIRED").map((order) => order.id),
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
  console.log(`active_dispatches=${result.activeDispatches.join(",") || "none"}`);
  console.log(`waiting_on_prerequisite=${result.waitingOnPrerequisite.join(",") || "none"}`);
  console.log(`reconciliation_required=${result.reconciliationRequired.join(",") || "none"}`);
  console.log(`queued_with_trigger=${result.queuedWithTrigger.join(",") || "none"}`);
}
