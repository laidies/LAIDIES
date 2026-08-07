#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const HASH = /^[a-f0-9]{64}$/;
const CORE = ["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit"];
const TEACHING = ["connectedSystemUnderstanding", "dailyLifeConnection", "explainBack", "unseenTransfer", "usefulAction", "analogyIntegrity"];
const REQUIRED_BY_CLASS = {
  EPISODE: [...CORE, ...TEACHING, "storyCarriesMechanism", "humourServesLearning"],
  CLASS: [...CORE, ...TEACHING, "practiceFeedback"],
  EXPLANATION: [...CORE, ...TEACHING],
  REFERENCE: [...CORE, "lookupAccuracy", "systemRelationship", "dailyLifeConnection", "usefulAction", "analogyIntegrity"],
  FAQ: [...CORE, "answersActualQuestion", "dailyLifeConnection", "usefulAction", "analogyIntegrity"],
  NEWS: [...CORE, "datedChange", "consequenceAndUncertainty", "dailyLifeConnection", "usefulAction", "analogyIntegrity"],
  PRACTICE: [...CORE, "retrievalOrPractice", "practiceFeedback", "unseenTransfer", "recoveryRoute"],
  INTERACTIVE: [...CORE, "dailyLifeConnection", "usefulAction", "practiceFeedback", "honestLimits"],
  PROMOTIONAL: [...CORE, "truthfulPromise", "clearAction"],
  MICROCOPY: [...CORE, "truthfulPromise", "clearAction"]
};
export const FAILURE_FAMILIES = [
  "glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti",
  "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem",
  "factlessConfidence", "staleUnreviewableClaims", "corporateSludge", "joylessInstruction"
];

const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const text = value => typeof value === "string" && value.trim().length > 0;

function loadBinding(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !HASH.test(binding.sha256 || "")) { errors.push(`${label}: exact path and SHA-256 are required`); return null; }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) { errors.push(`${label}: file missing or outside repository`); return null; }
  const bytes = fs.readFileSync(absolute);
  const actual = sha256(bytes);
  if (actual !== binding.sha256) errors.push(`${label}: SHA-256 mismatch expected=${binding.sha256} actual=${actual}`);
  return bytes.toString("utf8");
}

function evidenceAppears(body, evidence, label, errors) {
  if (!Array.isArray(evidence) || evidence.length === 0) { errors.push(`${label}: exact prose evidence is required`); return; }
  for (const [index, item] of evidence.entries()) {
    if (!text(item?.excerpt) || item.excerpt.trim().length < 15 || !text(item?.locator)) errors.push(`${label}[${index}]: excerpt of at least 15 characters and locator are required`);
    else if (!body?.includes(item.excerpt)) errors.push(`${label}[${index}]: excerpt does not occur in the exact prose`);
  }
}

export function inspectProseQualityReview(receipt, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  let registry;
  let registryBytes;
  try {
    registryBytes = fs.readFileSync(path.join(root, REGISTRY));
    registry = JSON.parse(registryBytes.toString("utf8"));
  }
  catch (error) { return { errors: [`exemplar registry unavailable: ${error.message}`], verdict: null }; }

  require(receipt?.schemaVersion === "laidies-prose-quality-review.v1", "schemaVersion mismatch");
  require(["PRODUCER_SELF_REVIEW", "INDEPENDENT_SEMANTIC_ADMISSION"].includes(receipt?.stage), "stage is invalid");
  require(Boolean(REQUIRED_BY_CLASS[receipt?.contentClass]), "contentClass is invalid");
  require(text(receipt?.candidateId) && text(receipt?.surface) && text(receipt?.maker), "candidateId, surface and maker are required");
  require(receipt?.reviewMode === "EXACT_PROSE_IN_FULL", "reviewer must read the exact prose in full");
  require(text(receipt?.reviewer?.id) && text(receipt?.reviewer?.principalId) && text(receipt?.reviewer?.role), "reviewer identity, principalId and role are required");
  if (receipt?.stage === "PRODUCER_SELF_REVIEW") require(receipt?.reviewer?.principalId === receipt?.maker, "producer self-review must be performed by the maker");
  if (receipt?.stage === "INDEPENDENT_SEMANTIC_ADMISSION") {
    require(receipt?.reviewer?.principalId !== receipt?.maker, "independent semantic admission cannot be maker self-review or alias");
    require(receipt?.reviewer?.independentFromMaker === true, "independent reviewer must attest independence from maker");
    require(receipt?.reviewer?.artifactFirst === true, "independent reviewer must begin with the artifact");
  }
  require(text(receipt?.reviewedAt) && !Number.isNaN(Date.parse(receipt?.reviewedAt)), "reviewedAt must be an ISO date-time");
  require(["PASS", "HOLD", "REJECT"].includes(receipt?.verdict), "verdict is invalid");
  require(Array.isArray(receipt?.limitations), "limitations must be an array");

  const artifactBody = loadBinding(root, receipt?.artifact?.reviewText, "artifact.reviewText", errors);
  const manifestBody = loadBinding(root, receipt?.artifact?.manifest, "artifact.manifest", errors);
  if (receipt?.artifact?.rendered) loadBinding(root, receipt.artifact.rendered, "artifact.rendered", errors);
  if (manifestBody) {
    try {
      const manifest = JSON.parse(manifestBody);
      require(manifest.schemaVersion === "laidies-content-artifact-manifest.v1", "artifact manifest schemaVersion mismatch");
      require(manifest.candidateId === receipt.candidateId, "artifact manifest candidateId mismatch");
      require(manifest.surface === receipt.surface, "artifact manifest surface mismatch");
      require(manifest.contentClass === receipt.contentClass, "artifact manifest contentClass mismatch");
      require(manifest.reviewText?.path === receipt.artifact.reviewText?.path && manifest.reviewText?.sha256 === receipt.artifact.reviewText?.sha256, "artifact manifest is not bound to the reviewed prose");
      if (receipt.artifact.rendered) require(manifest.rendered?.path === receipt.artifact.rendered.path && manifest.rendered?.sha256 === receipt.artifact.rendered.sha256, "artifact manifest is not bound to the rendered artifact");
    } catch (error) {
      if (error instanceof SyntaxError) errors.push(`artifact.manifest: invalid JSON: ${error.message}`);
    }
  }

  const negativeRegistry = new Map((registry.negativeExemplars || []).map(item => [item.id, item]));
  require(receipt?.calibration?.registrySha256 === sha256(registryBytes), "calibration registrySha256 is stale");
  require(receipt?.calibration?.reviewerPrincipalId === receipt?.reviewer?.principalId, "calibration reviewer does not match candidate reviewer");
  require(text(receipt?.calibration?.reviewedAt) && Date.parse(receipt.calibration.reviewedAt) <= Date.parse(receipt.reviewedAt), "calibration must be completed by this reviewer before candidate review");
  const suppliedNegatives = new Map((receipt?.calibration?.negatives || []).map(item => [item.exemplarId, item]));
  require(suppliedNegatives.size === negativeRegistry.size, "every registered negative exemplar must be calibrated");
  for (const [id, negative] of negativeRegistry) {
    const calibration = suppliedNegatives.get(id);
    require(Boolean(calibration), `registered negative calibration ${id} is required`);
    const negativeBody = loadBinding(root, { path: negative.path, sha256: negative.sha256 }, `calibration.negatives.${id}`, errors);
    require(calibration?.verdict === "REJECT", `known-bad calibration ${id} must be rejected`);
    for (const family of negative?.failureFamilies || []) require(calibration?.identifiedFailureFamilies?.includes(family), `known-bad calibration ${id} missed ${family}`);
    evidenceAppears(negativeBody, calibration?.evidence, `calibration.negatives.${id}.evidence`, errors);
  }

  const positiveRegistry = new Map((registry.positiveExemplars || []).map(item => [item.id, item]));
  const positive = positiveRegistry.get(receipt?.calibration?.positive?.exemplarId);
  require(Boolean(positive), "registered positive calibration is required");
  let positiveBody = null;
  if (positive) {
    require(positive.useFor.includes(receipt.contentClass), `positive exemplar ${positive.id} is not approved for ${receipt.contentClass}`);
    positiveBody = loadBinding(root, { path: positive.path, sha256: positive.sha256 }, "calibration.positive", errors);
  }
  require(receipt?.calibration?.positive?.verdict === "PASS", "positive calibration must be recognized as PASS");
  require(Array.isArray(receipt?.calibration?.positive?.strengthsRetained) && receipt.calibration.positive.strengthsRetained.length > 0, "positive calibration must name strengths retained without copying its template");
  evidenceAppears(positiveBody, receipt?.calibration?.positive?.evidence, "calibration.positive.evidence", errors);

  for (const field of ["humanQuestion", "promisedPayoff", "centralMentalModel", "dailyLifeConnection", "surfaceJob", "desiredReaderFeeling"]) require(text(receipt?.reverseBrief?.[field]), `reverseBrief.${field} is required`);

  const requiredOutcomes = REQUIRED_BY_CLASS[receipt?.contentClass] || [];
  for (const outcomeName of requiredOutcomes) {
    const outcome = receipt?.outcomes?.[outcomeName];
    require(Boolean(outcome), `required outcome ${outcomeName} is missing`);
    require(["PASS", "HOLD", "FAIL"].includes(outcome?.verdict), `outcome ${outcomeName} verdict is invalid`);
    require(text(outcome?.observation), `outcome ${outcomeName} needs a specific observation`);
    evidenceAppears(artifactBody, outcome?.artifactEvidence, `outcomes.${outcomeName}.artifactEvidence`, errors);
    if (["explainBack", "unseenTransfer"].includes(outcomeName)) {
      for (const field of ["prompt", "observedResponse", "expectedEvidence"]) require(text(outcome?.readerEvidence?.[field]), `${outcomeName}.readerEvidence.${field} is required`);
      loadBinding(root, outcome?.readerEvidence?.observationBinding, `${outcomeName}.readerEvidence.observationBinding`, errors);
    }
    if (receipt?.verdict === "PASS") require(outcome?.verdict === "PASS", `PASS forbidden: ${outcomeName} did not pass`);
  }

  for (const family of FAILURE_FAMILIES) {
    const finding = receipt?.failureFamilies?.[family];
    require(typeof finding?.present === "boolean", `failureFamilies.${family}.present is required`);
    require(text(finding?.observation) && text(finding?.artifactLocator), `failureFamilies.${family} needs an observation and locator`);
    if (receipt?.verdict === "PASS") require(finding?.present === false, `PASS forbidden: ${family} is present`);
  }

  require(["CLAIMS_REVIEWED", "NO_MATERIAL_CLAIMS"].includes(receipt?.factualReview?.disposition), "factualReview disposition is invalid");
  if (receipt?.factualReview?.disposition === "CLAIMS_REVIEWED") {
    require(Array.isArray(receipt.factualReview.sourceBindings) && receipt.factualReview.sourceBindings.length > 0, "factual claims require bound sources");
    for (const [index, binding] of (receipt.factualReview.sourceBindings || []).entries()) loadBinding(root, binding, `factualReview.sourceBindings[${index}]`, errors);
  } else require(text(receipt?.factualReview?.rationale), "NO_MATERIAL_CLAIMS requires a rationale");
  for (const field of ["reviewedThrough", "nextTrigger", "correctionOwner"]) require(text(receipt?.factualReview?.[field]), `factualReview.${field} is required`);

  require(receipt?.ratchet?.repeatedKnownDefects === 0 || receipt?.verdict !== "PASS", "PASS forbidden with a repeated known defect");
  require(receipt?.ratchet?.objectiveDefectsFirstFoundAtReview === 0 || receipt?.verdict !== "PASS", "PASS forbidden with an objective defect first found at review");
  if (receipt?.ratchet?.priorComparable) {
    require(receipt.ratchet.reviewIssues <= receipt.ratchet.priorComparable.reviewIssues, "review issues did not improve or hold against the comparable candidate");
    require(receipt.ratchet.reviewCycles <= receipt.ratchet.priorComparable.reviewCycles, "review cycles did not improve or hold against the comparable candidate");
  }
  require(receipt?.ratchet?.onKnownDefect === "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW", "known defects must repair the producer before another review");

  if (artifactBody && [...negativeRegistry.values()].some(negative => sha256(Buffer.from(artifactBody)) === negative.sha256) && receipt?.verdict === "PASS") errors.push("exact known-bad prose cannot receive PASS");
  return { errors, verdict: receipt?.verdict || null, qualityAuthority: receipt?.stage === "INDEPENDENT_SEMANTIC_ADMISSION" ? "INDEPENDENT_REVIEW" : "NONE" };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-prose-quality-admission.mjs <receipt.json>"); process.exit(2); }
  let receipt;
  try { receipt = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`PROSE QUALITY RECEIPT FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectProseQualityReview(receipt);
  if (result.errors.length) {
    console.error("PROSE QUALITY RECEIPT FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`PROSE QUALITY RECEIPT INTEGRITY MATCH verdict=${result.verdict} quality_authority=${result.qualityAuthority}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
