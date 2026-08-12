import { validateNewsstandEvidenceTruth } from "./lib/newsstand-evidence-truth.mjs";

const completeTruth = {
  circulatingFraming: "A reputable headline says the intervention caused a large universal improvement.",
  whatHappened: "Researchers compared one bounded intervention with a named alternative in one setting.",
  evidenceEstablishes: "The recorded result applies to the measured participants, tasks and observation period.",
  evidenceDoesNotEstablish: "It does not establish universal effectiveness, durability or the proposed mechanism.",
  mechanism: "The intervention changed the information available before participants completed the measured task.",
  realWorldImpact: "A reader may treat this as a reason to test a bounded workflow, not as a universal rule.",
  uncertainty: "Replication, longer follow-up and different populations could change the practical assessment.",
  headlineRisk: "The simplified headline drops the comparison, population, measured outcome and uncertainty.",
  editorialDecision: "Explain the bounded result and its limits; do not repeat the causal or universal framing."
};

const researchDecode = {
  researchQuestion: "Whether the intervention changed the named outcome for the enrolled participants.",
  studyStatus: "Synthetic peer-reviewed fixture used only to calibrate the validator rejection path.",
  design: "A bounded controlled comparison with a prespecified outcome and observation period.",
  population: "A defined synthetic participant group; no claim is made about broader populations.",
  comparison: "The intervention group was compared with a named synthetic control condition.",
  measures: "The fixture records one task outcome and does not substitute self-report for performance.",
  result: "The intervention group differed on the recorded outcome during the observation period.",
  limitations: "Synthetic fixture, bounded task, limited period and no evidence of long-term transfer.",
  causalBoundary: "The design may support the bounded comparison but not an unmeasured explanatory mechanism.",
  generalizationBoundary: "The result cannot be generalized beyond the population, task and setting tested.",
  fundingAndConflicts: "Synthetic fixture has no sponsor; a real record must name funding and conflicts.",
  practicalMeaning: "At most, the result earns a bounded real-world test with monitoring and rollback."
};

const notCovered = {
  status: "NOT_COVERED",
  checkedAt: "2026-08-11",
  independentReadCompletedFirst: true,
  rationale: "The complete available AIDB coverage was checked and contained no substantive analysis of this topic."
};

const base = { sources: [{ type: "independent-reporting" }], truthExplanation: completeTruth, researchDecode: null, aidbComparison: notCovered };
if (validateNewsstandEvidenceTruth(base).length) throw new Error("complete non-research fixture should pass");

const reputationOnly = structuredClone(base);
delete reputationOnly.truthExplanation.evidenceDoesNotEstablish;
if (!validateNewsstandEvidenceTruth(reputationOnly).some(error => error.includes("evidenceDoesNotEstablish"))) {
  throw new Error("validator failed to reject reputable reporting without an evidence limit");
}

const researchWithoutDecode = { sources: [{ type: "academic" }], truthExplanation: completeTruth, researchDecode: null, aidbComparison: notCovered };
if (!validateNewsstandEvidenceTruth(researchWithoutDecode).some(error => error.includes("researchDecode"))) {
  throw new Error("validator failed to reject research coverage without study decoding");
}

const missingAidb = structuredClone(base);
delete missingAidb.aidbComparison;
if (!validateNewsstandEvidenceTruth(missingAidb).some(error => error.includes("aidbComparison"))) {
  throw new Error("validator failed to reject a missing AIDB cross-check");
}

const completeResearch = { sources: [{ type: "research-paper" }], truthExplanation: completeTruth, researchDecode, aidbComparison: notCovered };
if (validateNewsstandEvidenceTruth(completeResearch).length) throw new Error("complete research fixture should pass");

console.log("NEWSSTAND EVIDENCE TRUTH TEST PASS");
console.log("calibration=reputation-without-limit,research-without-decode,missing-aidb-check rejected");
