#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectContentProducerContract } from "./check-content-producer-contract.mjs";
import { inspectProseQualityReview } from "./check-prose-quality-admission.mjs";

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
  const producerContractBlocked = [];
  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  let queue;
  try { queue = JSON.parse(fs.readFileSync(queuePath, "utf8")); } catch (error) { return { errors: [`content work orders invalid: ${error.message}`] }; }
  if (queue.schemaVersion !== "1.1.0") errors.push("content work orders schemaVersion must be 1.1.0");
  const orders = new Map();
  for (const order of queue.workOrders || []) {
    if (orders.has(order.id)) errors.push(`duplicate content work order ${order.id}`);
    orders.set(order.id, order);
    if (!order.ownerProductId) errors.push(`${order.id} missing ownerProductId`);
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
    if (BOUND_STATUSES.has(order.status)) {
      for (const field of ["producerContractPath", "producerReviewPath", "semanticAdmissionPath"]) {
        if (!order[field] || !fs.existsSync(path.join(root, order[field]))) errors.push(`${order.id} ${order.status} lacks ${field}`);
      }
      if (order.producerContractPath && fs.existsSync(path.join(root, order.producerContractPath))) {
        const contract = JSON.parse(fs.readFileSync(path.join(root, order.producerContractPath), "utf8"));
        const result = inspectContentProducerContract(contract, { root });
        if (contract.candidateId !== order.id || contract.status !== "READY_TO_DRAFT" || result.errors.length) errors.push(`${order.id} ${order.status} has invalid producer contract`);
      }
      if (order.producerReviewPath && fs.existsSync(path.join(root, order.producerReviewPath))) {
        const review = JSON.parse(fs.readFileSync(path.join(root, order.producerReviewPath), "utf8"));
        const result = inspectProseQualityReview(review, { root });
        if (review.candidateId !== order.id || review.stage !== "PRODUCER_SELF_REVIEW" || review.verdict !== "PASS" || result.errors.length) errors.push(`${order.id} ${order.status} has invalid producer self-review`);
      }
      if (["CONTENT_VERIFIED", "EXPERIENCE_VERIFIED", "APPROVED", "DEPLOYED", "VERIFIED_PUBLICLY"].includes(order.status) && order.semanticAdmissionPath && fs.existsSync(path.join(root, order.semanticAdmissionPath))) {
        const review = JSON.parse(fs.readFileSync(path.join(root, order.semanticAdmissionPath), "utf8"));
        const result = inspectProseQualityReview(review, { root });
        if (review.candidateId !== order.id || review.stage !== "INDEPENDENT_SEMANTIC_ADMISSION" || review.verdict !== "PASS" || result.errors.length) errors.push(`${order.id} ${order.status} has invalid semantic admission`);
      }
    }
    if (order.status === "QUEUED_WITH_TRIGGER" && order.dispatchState !== "NOT_READY") errors.push(`${order.id} queued trigger must be NOT_READY`);
    if (order.dispatchState === "READY_TO_DISPATCH") {
      const contractPath = order.producerContractPath && path.join(root, order.producerContractPath);
      if (!contractPath || !fs.existsSync(contractPath)) {
        producerContractBlocked.push(`${order.id}:missing producerContractPath`);
      } else {
        try {
          const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
          const result = inspectContentProducerContract(contract, { root });
          if (contract.candidateId !== order.id) result.errors.push(`candidateId must equal ${order.id}`);
          if (contract.status !== "READY_TO_DRAFT") result.errors.push("status must be READY_TO_DRAFT");
          if (result.errors.length) producerContractBlocked.push(`${order.id}:${result.errors.join("; ")}`);
        } catch (error) {
          producerContractBlocked.push(`${order.id}:producer contract unreadable: ${error.message}`);
        }
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
    for (const id of item.workOrderIds || []) if (!orders.has(id)) errors.push(`${item.path} references missing ${id}`);
    if (item.disposition === "NO_BUILD_REQUIRED" && !item.reason) errors.push(`${item.path} declines build without a reason`);
  }
  return {
    errors,
    workOrders: orders.size,
    coveredRecords: coverage.size,
    readyToDispatch: [...orders.values()].filter((order) => order.dispatchState === "READY_TO_DISPATCH" && !producerContractBlocked.some((item) => item.startsWith(`${order.id}:`))).map((order) => order.id),
    producerContractBlocked,
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
  console.log(`producer_contract_blocked=${result.producerContractBlocked.join(" | ") || "none"}`);
  console.log(`queued_with_trigger=${result.queuedWithTrigger.join(",") || "none"}`);
}
