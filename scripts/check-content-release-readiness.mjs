#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectContentProducerContract } from "./check-content-producer-contract.mjs";
import { inspectProseQualityReview } from "./check-prose-quality-admission.mjs";

const REQUIRED_GATES = [
  "accuracy", "antiSlop", "currentBestPractice", "laidiesVoice",
  "analogyIntegrity", "usefulnessDepth", "formatFit", "searchIndexing",
  "relationshipLinking", "canonConsistency", "songOpportunity",
  "derivativeFeeds"
];
const CONTENT_VERIFIED_STATES = new Set([
  "CONTENT_VERIFIED", "EXPERIENCE_VERIFIED", "APPROVED", "DEPLOYED",
  "VERIFIED_PUBLICLY"
]);
const PASS_STATES = new Set(["PASS", "PASS_LOCAL", "NOT_APPLICABLE"]);

function existingEvidence(root, evidencePath) {
  if (typeof evidencePath !== "string" || evidencePath.trim() === "") return false;
  if (/^https?:\/\//i.test(evidencePath)) return false;
  return fs.existsSync(path.join(root, evidencePath.split("#")[0]));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function readJsonRecord(root, recordPath, label, reasons) {
  if (!existingEvidence(root, recordPath) || !recordPath.endsWith(".json")) {
    reasons.push(`${label}:MISSING`);
    return null;
  }
  try { return JSON.parse(fs.readFileSync(path.join(root, recordPath), "utf8")); }
  catch { reasons.push(`${label}:INVALID_JSON`); return null; }
}

function validGateReceipt({ root, receiptPath, order, gateName }) {
  if (!receiptPath.endsWith(".json") || !existingEvidence(root, receiptPath)) return false;
  let receipt;
  try {
    receipt = JSON.parse(fs.readFileSync(path.join(root, receiptPath), "utf8"));
  } catch {
    return false;
  }
  if (
    receipt.schemaVersion !== "1.0.0" ||
    receipt.workOrderId !== order.id ||
    receipt.gate !== gateName ||
    receipt.verdict !== order.qualityGates[gateName].status ||
    receipt.artifact?.manifestPath !== order.artifactBinding?.manifestPath ||
    receipt.artifact?.sha256 !== order.artifactBinding?.sha256 ||
    !receipt.maker || !receipt.reviewer || receipt.maker === receipt.reviewer ||
    !receipt.reviewedAt || !receipt.findings ||
    !Array.isArray(receipt.evidence?.sourceRefs) ||
    !Array.isArray(receipt.evidence?.testRefs) ||
    !Array.isArray(receipt.limitations) ||
    !receipt.freshness?.reviewedThrough ||
    !receipt.freshness?.nextTrigger ||
    !receipt.freshness?.correctionOwner
  ) return false;
  if (gateName !== "formatFit") return true;
  const adaptation = receipt.surfaceAdaptation;
  if (
    !adaptation || adaptation.surface !== order.surface ||
    !adaptation.destinationJob || !adaptation.payloadPath ||
    !existingEvidence(root, adaptation.payloadPath) ||
    !adaptation.distinctFromOtherSurfaces ||
    !Array.isArray(adaptation.renderedEvidencePaths) ||
    adaptation.renderedEvidencePaths.length === 0 ||
    !adaptation.renderedEvidencePaths.every((item) => existingEvidence(root, item)) ||
    !Array.isArray(adaptation.interactionEvidencePaths) ||
    !adaptation.interactionEvidencePaths.every((item) => existingEvidence(root, item))
  ) return false;
  return true;
}

export function checkContentReleaseReadiness({ root = process.cwd(), requireReady = null } = {}) {
  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  const errors = [];
  let queue;
  try {
    queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  } catch (error) {
    return {
      errors: [`content work orders invalid: ${error.message}`],
      ready: [],
      held: [],
      requiredReady: requireReady,
      readinessThresholdMet: requireReady === null ? null : false
    };
  }

  const ready = [];
  const held = [];
  for (const order of queue.workOrders || []) {
    const reasons = [];
    const producerContract = readJsonRecord(root, order.producerContractPath, "producerContract", reasons);
    if (producerContract) {
      const result = inspectContentProducerContract(producerContract, { root });
      if (producerContract.candidateId !== order.id) reasons.push("producerContract:CANDIDATE_MISMATCH");
      if (producerContract.status !== "READY_TO_DRAFT") reasons.push(`producerContract:${producerContract.status || "NO_STATUS"}`);
      if (result.errors.length) reasons.push(`producerContract:INVALID(${result.errors.join("|")})`);
    }
    const producerReview = readJsonRecord(root, order.producerReviewPath, "producerReview", reasons);
    if (producerReview) {
      const result = inspectProseQualityReview(producerReview, { root });
      if (producerReview.candidateId !== order.id) reasons.push("producerReview:CANDIDATE_MISMATCH");
      if (producerReview.stage !== "PRODUCER_SELF_REVIEW" || producerReview.verdict !== "PASS") reasons.push("producerReview:NOT_PASS");
      if (result.errors.length) reasons.push(`producerReview:INVALID(${result.errors.join("|")})`);
    }
    const semanticAdmission = readJsonRecord(root, order.semanticAdmissionPath, "semanticAdmission", reasons);
    if (semanticAdmission) {
      const result = inspectProseQualityReview(semanticAdmission, { root });
      if (semanticAdmission.candidateId !== order.id) reasons.push("semanticAdmission:CANDIDATE_MISMATCH");
      if (semanticAdmission.stage !== "INDEPENDENT_SEMANTIC_ADMISSION" || semanticAdmission.verdict !== "PASS") reasons.push("semanticAdmission:NOT_PASS");
      if (result.errors.length) reasons.push(`semanticAdmission:INVALID(${result.errors.join("|")})`);
    }
    for (const gateName of REQUIRED_GATES) {
      const gate = order.qualityGates?.[gateName];
      if (!gate || !["PASS", "NOT_APPLICABLE"].includes(gate.status)) {
        reasons.push(`${gateName}:${gate?.status || "MISSING"}`);
        continue;
      }
      if (["PASS", "NOT_APPLICABLE"].includes(gate.status)) {
        if (!gate.evidencePaths?.length) {
          reasons.push(`${gateName}:NO_EVIDENCE`);
        } else if (!gate.evidencePaths.some((item) => validGateReceipt({ root, receiptPath: item, order, gateName }))) {
          reasons.push(`${gateName}:NO_VALID_ARTIFACT_RECEIPT`);
        }
      }
    }

    const manifestPath = order.artifactBinding?.manifestPath
      ? path.join(root, order.artifactBinding.manifestPath)
      : null;
    if (order.artifactBinding?.status !== "BOUND") {
      reasons.push("artifact:UNBOUND");
    } else if (!manifestPath || !fs.existsSync(manifestPath)) {
      reasons.push("artifact:MANIFEST_MISSING");
    } else if (sha256(manifestPath) !== order.artifactBinding.sha256) {
      reasons.push("artifact:MANIFEST_SHA_MISMATCH");
    }

    const reviewStages = order.reviewChain || [];
    const incompleteReview = reviewStages.filter(
      (stage) => !["RELEASE", "PUBLIC"].includes(stage.stage) && !PASS_STATES.has(stage.status)
    );
    if (incompleteReview.length) reasons.push(`review:${incompleteReview.map((stage) => stage.stage).join("+")}`);
    const passingOwners = new Set(
      reviewStages
        .filter((stage) => !["BUILD", "RELEASE", "PUBLIC"].includes(stage.stage) && PASS_STATES.has(stage.status))
        .map((stage) => stage.owner)
    );
    const builder = reviewStages.find((stage) => stage.stage === "BUILD")?.owner;
    if (passingOwners.size < 2 || (builder && [...passingOwners].every((owner) => owner === builder))) {
      reasons.push("review:INDEPENDENCE_NOT_PROVEN");
    }

    const formatEvidence = order.qualityGates?.formatFit?.evidencePaths || [];
    if (!formatEvidence.some((item) => validGateReceipt({ root, receiptPath: item, order, gateName: "formatFit" }))) {
      reasons.push("featureAdaptation:NOT_PROVEN");
    }

    if (reasons.length === 0) ready.push(order.id);
    else held.push({ id: order.id, reasons });

    if (CONTENT_VERIFIED_STATES.has(order.status) && reasons.length) {
      errors.push(`${order.id} claims ${order.status} but is not release-ready: ${reasons.join(", ")}`);
    }
    if (["APPROVED", "DEPLOYED", "VERIFIED_PUBLICLY"].includes(order.status)) {
      const ownerStage = reviewStages.find((stage) => stage.stage === "OWNER");
      if (!ownerStage || !PASS_STATES.has(ownerStage.status)) {
        errors.push(`${order.id} claims ${order.status} without destination-owner acceptance`);
      }
    }
    if (["DEPLOYED", "VERIFIED_PUBLICLY"].includes(order.status)) {
      const releaseStage = reviewStages.find((stage) => stage.stage === "RELEASE");
      if (!releaseStage || !PASS_STATES.has(releaseStage.status)) {
        errors.push(`${order.id} claims ${order.status} without release-stage PASS`);
      }
    }
    if (order.status === "VERIFIED_PUBLICLY") {
      const publicStage = reviewStages.find((stage) => stage.stage === "PUBLIC");
      if (!publicStage || !PASS_STATES.has(publicStage.status)) {
        errors.push(`${order.id} claims VERIFIED_PUBLICLY without public-stage PASS`);
      }
    }
  }
  return {
    errors,
    ready,
    held,
    requiredReady: requireReady,
    readinessThresholdMet: requireReady === null ? null : ready.length >= requireReady
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const requireReadyIndex = process.argv.indexOf("--require-ready");
  let requireReady = null;
  if (requireReadyIndex !== -1) {
    const rawMinimum = process.argv[requireReadyIndex + 1];
    if (!/^[1-9]\d*$/.test(rawMinimum || "")) {
      console.error("CONTENT RELEASE READINESS USAGE FAIL");
      console.error("- --require-ready needs a positive integer minimum");
      process.exit(2);
    }
    requireReady = Number(rawMinimum);
  }

  const result = checkContentReleaseReadiness({ requireReady });
  if (result.errors.length) {
    console.error("CONTENT RELEASE READINESS FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  if (requireReady !== null && !result.readinessThresholdMet) {
    console.error("CONTENT RELEASE READINESS FAIL");
    console.error(`- required release-ready minimum=${requireReady}; actual=${result.ready.length}`);
    if (process.argv.includes("--details")) {
      for (const item of result.held) console.error(`hold=${item.id}|${item.reasons.join(";")}`);
    }
    process.exit(1);
  }

  console.log(result.ready.length === 0
    ? "CONTENT RELEASE ADMISSION INTEGRITY VALID — RELEASE HOLD"
    : "CONTENT RELEASE ADMISSION INTEGRITY VALID");
  console.log(`release_ready=${result.ready.join(",") || "none"}`);
  console.log(`held=${result.held.length}`);
  if (process.argv.includes("--details")) {
    for (const item of result.held) console.log(`hold=${item.id}|${item.reasons.join(";")}`);
  }
}
