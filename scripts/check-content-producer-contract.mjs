#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const HASH = /^[a-f0-9]{64}$/;
const CONTENT_CLASSES = new Set(["EPISODE", "CLASS", "EXPLANATION", "REFERENCE", "FAQ", "NEWS", "PRACTICE", "INTERACTIVE", "PROMOTIONAL", "MICROCOPY"]);

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const text = value => typeof value === "string" && value.trim().length > 0;
const array = (value, minimum = 1) => Array.isArray(value) && value.length >= minimum;

function boundFile(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !HASH.test(binding.sha256 || "")) {
    errors.push(`${label}: exact path and SHA-256 are required`);
    return;
  }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) {
    errors.push(`${label}: bound file is missing or outside the repository`);
    return;
  }
  const actual = sha256(fs.readFileSync(absolute));
  if (actual !== binding.sha256) errors.push(`${label}: SHA-256 mismatch expected=${binding.sha256} actual=${actual}`);
}

export function inspectContentProducerContract(contract, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  let registry;
  let registryBytes;
  try {
    registryBytes = fs.readFileSync(path.join(root, REGISTRY));
    registry = JSON.parse(registryBytes.toString("utf8"));
  }
  catch (error) { return { errors: [`exemplar registry unavailable: ${error.message}`], status: null }; }

  require(contract?.schemaVersion === "laidies-content-producer-contract.v1", "schemaVersion mismatch");
  require(text(contract?.candidateId), "candidateId is required");
  require(text(contract?.surface), "surface is required");
  require(CONTENT_CLASSES.has(contract?.contentClass), "contentClass is invalid");
  require(text(contract?.producer), "producer identity is required");
  require(["READY_TO_DRAFT", "REPAIR_PRODUCER", "SUPERSEDED"].includes(contract?.status), "status is invalid");

  for (const field of ["humanQuestion", "promisedPayoff", "priorKnowledge", "centralMentalModel", "dailyLifeConnection", "surfaceJob", "desiredFeeling"]) {
    require(text(contract?.readerContract?.[field]), `readerContract.${field} is required`);
  }

  require(array(contract?.canonicalTruth), "canonicalTruth requires at least one governed claim or explicit no-claim record");
  for (const [index, claim] of (contract?.canonicalTruth || []).entries()) {
    for (const field of ["claimId", "owner", "freshnessTrigger"]) require(text(claim?.[field]), `canonicalTruth[${index}].${field} is required`);
    boundFile(root, claim?.source, `canonicalTruth[${index}].source`, errors);
  }

  const positives = new Map((registry.positiveExemplars || []).map(item => [item.id, item]));
  require(array(contract?.positiveExemplars), "at least one positive exemplar must shape the draft");
  for (const [index, use] of (contract?.positiveExemplars || []).entries()) {
    const exemplar = positives.get(use?.id);
    require(Boolean(exemplar), `positiveExemplars[${index}] is not registered`);
    if (exemplar) {
      require(exemplar.useFor.includes(contract.contentClass), `positive exemplar ${use.id} is not approved for ${contract.contentClass}`);
      boundFile(root, { path: exemplar.path, sha256: exemplar.sha256 }, `positive exemplar ${use.id}`, errors);
    }
    require(array(use?.strengthsToUse), `positiveExemplars[${index}].strengthsToUse is required`);
    require(array(use?.patternsNotToCopy), `positiveExemplars[${index}].patternsNotToCopy is required`);
  }

  const negatives = registry.negativeExemplars || [];
  const negativeIds = negatives.map(item => item.id);
  require(contract?.knownFailurePreflight?.registryVersion === registry.schemaVersion, "knownFailurePreflight registryVersion is stale");
  require(contract?.knownFailurePreflight?.registrySha256 === sha256(registryBytes), "knownFailurePreflight registrySha256 is stale");
  require(new Set(negativeIds).size === negativeIds.length, "negative exemplar IDs must be unique");
  const suppliedNegativeIds = contract?.knownFailurePreflight?.negativeExemplarIds || [];
  require(suppliedNegativeIds.length === negativeIds.length && negativeIds.every(id => suppliedNegativeIds.includes(id)), "every registered negative exemplar must be consumed before drafting");
  require(Array.isArray(contract?.knownFailurePreflight?.knownDefectsRemaining), "knownDefectsRemaining must be an array");
  const dispositions = contract?.knownFailurePreflight?.dispositions || {};
  for (const negative of negatives) {
    require(text(negative?.incidentId), `negative exemplar ${negative?.id || "unknown"} lacks incidentId`);
    require(array(negative?.appliesTo), `negative exemplar ${negative?.id || "unknown"} lacks appliesTo`);
    boundFile(root, { path: negative.path, sha256: negative.sha256 }, `negative exemplar ${negative.id}`, errors);
    for (const family of negative?.failureFamilies || []) {
      require(dispositions?.[family]?.status === "CLEAR", `known failure ${family} is not CLEAR before drafting`);
      require(text(dispositions?.[family]?.producerGuard), `known failure ${family} lacks a producer guard`);
      require(text(dispositions?.[family]?.preventionEvidence), `known failure ${family} lacks prevention evidence`);
    }
  }
  if (contract?.status === "READY_TO_DRAFT") require(contract.knownFailurePreflight.knownDefectsRemaining.length === 0, "READY_TO_DRAFT forbidden while known defects remain");

  const architecture = contract?.draftArchitecture;
  for (const field of ["plainAnswer", "workedCase", "transferCase", "usefulAction", "formatSpecificStructure", "antiTemplateDecision"]) {
    require(text(architecture?.[field]), `draftArchitecture.${field} is required`);
  }
  require(array(architecture?.causalSequence, 3), "draftArchitecture.causalSequence requires at least three connected steps");
  require(architecture?.workedCase !== architecture?.transferCase, "workedCase and transferCase must be different");
  require(Array.isArray(architecture?.analogyPlan), "draftArchitecture.analogyPlan must be an array; use [] when no analogy earns a place");
  for (const [index, analogy] of (architecture?.analogyPlan || []).entries()) {
    for (const field of ["concept", "analogy", "mapping", "limit", "whyItHelps"]) require(text(analogy?.[field]), `analogyPlan[${index}].${field} is required`);
  }
  require(text(architecture?.humourPlan?.lessonJob) || text(architecture?.humourPlan?.noneReason), "humourPlan must name how humour serves the lesson or why none is appropriate");

  for (const field of ["highestRisk", "plannedProof", "acceptanceOutcome"]) require(text(contract?.representativeProofPlan?.[field]), `representativeProofPlan.${field} is required`);
  const metrics = contract?.ratchet?.targets;
  require(metrics?.repeatedKnownDefects === 0, "ratchet target repeatedKnownDefects must be 0");
  require(metrics?.objectiveDefectsFirstFoundAtReview === 0, "ratchet target objectiveDefectsFirstFoundAtReview must be 0");
  require(contract?.ratchet?.rule === "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW", "ratchet must stop and repair the producer on repeated known defects");

  return { errors, status: contract?.status || null };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-content-producer-contract.mjs <contract.json>"); process.exit(2); }
  let contract;
  try { contract = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`CONTENT PRODUCER CONTRACT FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectContentProducerContract(contract);
  if (result.errors.length) {
    console.error("CONTENT PRODUCER CONTRACT FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`CONTENT PRODUCER CONTRACT INTEGRITY MATCH status=${result.status} quality_authority=none`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
