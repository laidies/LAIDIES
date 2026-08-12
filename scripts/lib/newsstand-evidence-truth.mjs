const RESEARCH_TYPES = new Set(["academic", "research-paper", "preprint", "evaluator-report", "dataset"]);

const GENERAL_FIELDS = [
  "circulatingFraming",
  "whatHappened",
  "evidenceEstablishes",
  "evidenceDoesNotEstablish",
  "mechanism",
  "realWorldImpact",
  "uncertainty",
  "headlineRisk",
  "editorialDecision"
];

const RESEARCH_FIELDS = [
  "researchQuestion",
  "studyStatus",
  "design",
  "population",
  "comparison",
  "measures",
  "result",
  "limitations",
  "causalBoundary",
  "generalizationBoundary",
  "fundingAndConflicts",
  "practicalMeaning"
];

function substantialText(value) {
  return typeof value === "string" && value.trim().length >= 20;
}

export function validateNewsstandEvidenceTruth(manifest) {
  const errors = [];
  const explanation = manifest?.truthExplanation;
  for (const field of GENERAL_FIELDS) {
    if (!substantialText(explanation?.[field])) errors.push(`truthExplanation.${field} must be substantive`);
  }

  const types = new Set((manifest?.sources || []).map(source => source?.type));
  const hasResearch = [...types].some(type => RESEARCH_TYPES.has(type));
  if (hasResearch) {
    for (const field of RESEARCH_FIELDS) {
      if (!substantialText(manifest?.researchDecode?.[field])) errors.push(`researchDecode.${field} must be substantive for research evidence`);
    }
  } else if (!(manifest?.researchDecode === null || manifest?.researchDecode === undefined)) {
    errors.push("researchDecode must be null or omitted when no research source is used");
  }

  const aidb = manifest?.aidbComparison;
  if (!new Set(["COVERED", "NOT_COVERED", "UNAVAILABLE"]).has(aidb?.status)) {
    errors.push("aidbComparison.status must be COVERED, NOT_COVERED or UNAVAILABLE");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(aidb?.checkedAt || "")) errors.push("aidbComparison.checkedAt must be YYYY-MM-DD");
  if (aidb?.independentReadCompletedFirst !== true) errors.push("aidbComparison must confirm the independent LAiDIES read happened first");
  if (aidb?.status === "COVERED") {
    for (const field of ["evidencePath", "agreement", "aidbAdded", "laidiesAdded", "disagreements", "distinctiveUse"]) {
      if (!substantialText(aidb?.[field])) errors.push(`aidbComparison.${field} must be substantive when AIDB covered the topic`);
    }
  } else if (["NOT_COVERED", "UNAVAILABLE"].includes(aidb?.status) && !substantialText(aidb?.rationale)) {
    errors.push("aidbComparison.rationale must be substantive when no comparison is available");
  }

  return errors;
}

export const NEWSSTAND_TRUTH_FIELDS = Object.freeze({
  general: GENERAL_FIELDS,
  research: RESEARCH_FIELDS,
  researchTypes: [...RESEARCH_TYPES],
  aidbStatuses: ["COVERED", "NOT_COVERED", "UNAVAILABLE"]
});
