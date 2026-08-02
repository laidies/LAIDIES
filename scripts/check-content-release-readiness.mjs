#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

export function checkContentReleaseReadiness({ root = process.cwd() } = {}) {
  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  const errors = [];
  let queue;
  try {
    queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  } catch (error) {
    return { errors: [`content work orders invalid: ${error.message}`], ready: [], held: [] };
  }

  const ready = [];
  const held = [];
  for (const order of queue.workOrders || []) {
    const reasons = [];
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
  return { errors, ready, held };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const result = checkContentReleaseReadiness();
  if (result.errors.length) {
    console.error("CONTENT RELEASE READINESS FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("CONTENT RELEASE ADMISSION INTEGRITY PASS");
  console.log(`release_ready=${result.ready.join(",") || "none"}`);
  console.log(`held=${result.held.length}`);
  if (process.argv.includes("--details")) {
    for (const item of result.held) console.log(`hold=${item.id}|${item.reasons.join(";")}`);
  }
}
