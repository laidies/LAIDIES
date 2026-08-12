#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const COMMUNICATION_BENCHMARK = "operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md";
const EXPLANATION_REASONING_BENCHMARK = "operations/product-stewards/learning-content-ecosystem/LAIDIES-EXPLANATION-AND-EDITORIAL-REASONING-BENCHMARK.md";
const HASH = /^[a-f0-9]{64}$/;
const CONTENT_CLASSES = new Set(["EPISODE", "CLASS", "EXPLANATION", "REFERENCE", "FAQ", "NEWS", "PRACTICE", "INTERACTIVE", "PROMOTIONAL", "MICROCOPY"]);
const FULL_COMMUNICATION_CLASSES = new Set(["EPISODE", "CLASS", "EXPLANATION"]);
const PROPORTIONAL_COMMUNICATION_CLASSES = new Set(["REFERENCE", "FAQ", "NEWS", "PRACTICE", "INTERACTIVE"]);
const COMMUNICATION_DIMENSIONS = [
  "humanQuestion", "usefulCuriosity", "invisibleProcessConcrete",
  "familiarTechnicalMovement", "limitationsConsequences", "humourSurprise",
  "betterNextQuestion"
];

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

  const communication = contract?.communicationDesign;
  require(communication?.benchmarkId === "HANNAH_FRY_COMMUNICATION_LENS_V2", "communicationDesign.benchmarkId mismatch");
  require(communication?.benchmark?.path === COMMUNICATION_BENCHMARK, `communicationDesign.benchmark.path must be ${COMMUNICATION_BENCHMARK}`);
  boundFile(root, communication?.benchmark, "communicationDesign.benchmark", errors);
  require(["FULL", "PROPORTIONAL", "NOT_APPLICABLE"].includes(communication?.mode), "communicationDesign.mode is required");
  require(text(communication?.surfaceAdaptation), "communicationDesign.surfaceAdaptation is required");
  require(communication?.imitationBoundary === "ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA", "communicationDesign.imitationBoundary must prohibit Hannah Fry voice or persona imitation");
  const expectedMode = FULL_COMMUNICATION_CLASSES.has(contract?.contentClass)
    ? "FULL"
    : PROPORTIONAL_COMMUNICATION_CLASSES.has(contract?.contentClass) ? "PROPORTIONAL" : "NOT_APPLICABLE";
  require(communication?.mode === expectedMode, `${contract?.contentClass || "content"} requires communicationDesign.mode=${expectedMode}`);
  let appliedDimensions = 0;
  for (const dimension of COMMUNICATION_DIMENSIONS) {
    const plan = communication?.dimensions?.[dimension];
    require(["APPLY", "NOT_APPLICABLE"].includes(plan?.disposition), `communicationDesign.dimensions.${dimension}.disposition is required`);
    require(text(plan?.reason), `communicationDesign.dimensions.${dimension}.reason is required`);
    if (plan?.disposition === "APPLY") {
      appliedDimensions += 1;
      require(text(plan?.plannedEvidence), `communicationDesign.dimensions.${dimension}.plannedEvidence is required when applied`);
      require(!/^hannah fry(?: inspired| style| benchmark)?[.! ]*$/i.test(plan?.plannedEvidence?.trim() || ""), `communicationDesign.dimensions.${dimension} cannot be satisfied by naming Hannah Fry`);
    }
  }
  if (expectedMode === "FULL") {
    require(appliedDimensions >= 6, "FULL communication design requires at least six applied benchmark dimensions");
    for (const dimension of ["humanQuestion", "invisibleProcessConcrete", "familiarTechnicalMovement", "limitationsConsequences", "betterNextQuestion"]) {
      require(communication?.dimensions?.[dimension]?.disposition === "APPLY", `FULL communication design must apply ${dimension}`);
    }
    const arc = communication?.explanationArc;
    require(arc?.mode === "DEFAULT_SUBSTANTIAL_EXPLANATION", "FULL communication design requires the default substantial-explanation arc");
    for (const field of ["sharedStartingPoint", "curiosityGap", "earnedClick", "smallLanding", "safetyBoundary"]) {
      require(text(arc?.[field]), `communicationDesign.explanationArc.${field} is required`);
    }
    require(array(arc?.mechanismSequence, 3), "communicationDesign.explanationArc.mechanismSequence requires at least three cause-and-effect steps");
    require(arc?.order === "START_AND_GAP_THEN_MECHANISM_THEN_EARNED_CLICK_THEN_SMALL_LANDING", "communicationDesign.explanationArc.order must preserve the default explanatory sequence");
  } else if (expectedMode === "PROPORTIONAL") {
    require(appliedDimensions >= 2, "PROPORTIONAL communication design requires at least two applied benchmark dimensions");
    const arc = communication?.explanationArc;
    require(["PROPORTIONAL", "NOT_APPLICABLE"].includes(arc?.mode), "PROPORTIONAL communication design must adapt or explicitly decline the default arc");
    if (arc?.mode === "PROPORTIONAL") {
      require(array(arc?.retainedMoves), "communicationDesign.explanationArc.retainedMoves is required when proportional");
      require(text(arc?.adaptation), "communicationDesign.explanationArc.adaptation is required when proportional");
    } else require(text(arc?.reason), "communicationDesign.explanationArc.reason is required when not applicable");
  } else {
    require(appliedDimensions === 0, "NOT_APPLICABLE communication design cannot claim applied benchmark dimensions");
    require(communication?.explanationArc?.mode === "NOT_APPLICABLE", "NOT_APPLICABLE communication design must declare explanationArc.mode=NOT_APPLICABLE");
    require(text(communication?.explanationArc?.reason), "communicationDesign.explanationArc.reason is required when not applicable");
  }

  const reasoning = contract?.explanationReasoningDesign;
  require(reasoning?.benchmarkId === "LAIDIES_EXPLANATION_EDITORIAL_TRIAD_V1", "explanationReasoningDesign.benchmarkId mismatch");
  require(reasoning?.benchmark?.path === EXPLANATION_REASONING_BENCHMARK, `explanationReasoningDesign.benchmark.path must be ${EXPLANATION_REASONING_BENCHMARK}`);
  boundFile(root, reasoning?.benchmark, "explanationReasoningDesign.benchmark", errors);
  require(reasoning?.mode === expectedMode, `${contract?.contentClass || "content"} requires explanationReasoningDesign.mode=${expectedMode}`);
  require(reasoning?.imitationBoundary === "ADAPT_METHODS_KEEP_LAIDIES_VOICE_NEVER_DEFER_TO_AIDB", "explanationReasoningDesign must preserve LAiDIES voice and prohibit imitation or AIDB deference");
  if (expectedMode === "NOT_APPLICABLE") {
    require(text(reasoning?.exemptionReason), "NOT_APPLICABLE explanationReasoningDesign requires an exemptionReason");
    require(reasoning?.containsTeachingClaim === false, "NOT_APPLICABLE explanationReasoningDesign cannot contain a teaching claim");
  } else {
    for (const field of ["humanEntry", "fakeUnderstandingRisk", "explainBackTest", "transferCase", "usefulLanding", "rewindEraAdaptation"]) {
      require(text(reasoning?.[field]), `explanationReasoningDesign.${field} is required`);
    }
    require(array(reasoning?.firstPrinciplesSequence, expectedMode === "FULL" ? 3 : 1), `explanationReasoningDesign.firstPrinciplesSequence requires ${expectedMode === "FULL" ? "at least three" : "at least one"} causal step(s)`);
    require(reasoning?.explainBackTest !== reasoning?.transferCase, "explanationReasoningDesign explain-back and transfer must be different");
    require(!/^(?:hannah fry|feynman|aidb)(?: inspired| style| method)?[.! ]*$/i.test(reasoning?.humanEntry?.trim() || ""), "explanationReasoningDesign cannot be satisfied by naming a benchmark");
    const evidence = reasoning?.evidenceAnalysis;
    for (const field of ["claimUnderInspection", "primaryEvidence", "establishes", "doesNotEstablish", "claimedImpact", "realConsequence"]) {
      require(text(evidence?.[field]), `explanationReasoningDesign.evidenceAnalysis.${field} is required`);
    }
    require(["COMPARED", "DATED_ABSENCE", "NOT_APPLICABLE_TO_SUBJECT"].includes(evidence?.aidbDisposition), "explanationReasoningDesign.evidenceAnalysis.aidbDisposition is required");
    require(text(evidence?.aidbReason), "explanationReasoningDesign.evidenceAnalysis.aidbReason is required");
  }

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
