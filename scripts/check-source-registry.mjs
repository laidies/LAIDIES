import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.resolve(root, process.argv[2] || "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json");
const practitionerPath = path.resolve(root, process.argv[3] || "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json");

export function validateSourceRegistry(registry, practitionerRoster) {
  const errors = [];
  const requiredDestinations = [
    "news_breaking", "news_daily", "news_weekly", "news_tribune",
    "straight_answers", "paige_ai_tip", "career_work_life_tip", "promptoscope",
    "library", "classes", "episodes", "study_packs", "tools_games",
    "behind_build", "operations", "external_learning", "freshness"
  ];
  const tiers = new Set(["PRIMARY_AUTHORITY", "PRIMARY_RESEARCH", "INSTITUTIONAL_SYNTHESIS", "INDEPENDENT_REPORTING", "PRACTITIONER_LEAD", "SECONDARY_SCOUT", "TEACHING_METHOD", "COURSE_COMPARATOR", "INDUSTRY_RESEARCH"]);
  const statuses = new Set(["ACTIVE_MONITOR", "PILOT_MONITOR", "ON_TRIGGER", "REFERENCE", "HOLD"]);
  const cadences = new Set(["TWICE_DAILY", "DAILY", "DAILY_RELEASE_CHECK", "TWICE_WEEKLY", "WEEKLY", "WEEKLY_RELEASE_CHECK", "MONTHLY", "MONTHLY_AND_ANNUAL_RELEASE", "QUARTERLY", "ANNUAL", "ON_TRIGGER"]);

  if (registry?.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  const careerContract = registry?.destinationContracts?.career_work_life_tip;
  if (!careerContract || !/does not need to mention AI/i.test(careerContract.sourceEligibility || "")) {
    errors.push("career_work_life_tip must allow non-AI career and work-life sources");
  }
  const requiredCareerMoves = ["workplace situation", "AI or workflow principle", "comparison stops", "concrete next move", "separately verified AI source"];
  const careerMoves = (careerContract?.transformationRequired || []).join(" ");
  for (const move of requiredCareerMoves) {
    if (!careerMoves.toLowerCase().includes(move.toLowerCase())) errors.push(`career_work_life_tip transformation contract missing: ${move}`);
  }
  const publicationContract = registry?.publicationEvidenceContract;
  const publicationRequirements = (publicationContract?.requiredBeforeNewsstandPublication || []).join(" ");
  for (const requirement of ["independent LAiDIES read", "underlying primary evidence", "does not establish", "causal boundary", "generalization boundary", "AIDB cross-check", "NOT_COVERED"]) {
    if (!publicationRequirements.toLowerCase().includes(requirement.toLowerCase())) errors.push(`publication evidence contract missing: ${requirement}`);
  }
  if (!/never automatic authority/i.test(publicationContract?.reportingRole || "")) errors.push("publication evidence contract must deny reputation-based authority");
  if (!/^HOLD\b/.test(publicationContract?.failureState || "")) errors.push("publication evidence contract must fail closed to HOLD");
  if (!Array.isArray(registry?.sources) || registry.sources.length < 20) errors.push("registry must contain at least 20 governed sources");
  const ids = new Set();
  const covered = new Set();
  for (const [i, source] of (registry?.sources || []).entries()) {
    const at = `sources[${i}]`;
    for (const key of ["id", "name", "publisher", "authorityTier", "status", "cadence", "bestUse", "limits", "verifyBeforeUse", "recheckTrigger"]) {
      if (!source?.[key] || typeof source[key] !== "string") errors.push(`${at}: missing ${key}`);
    }
    if (ids.has(source.id)) errors.push(`${at}: duplicate id ${source.id}`);
    ids.add(source.id);
    if (!tiers.has(source.authorityTier)) errors.push(`${at}: invalid authorityTier ${source.authorityTier}`);
    if (!statuses.has(source.status)) errors.push(`${at}: invalid status ${source.status}`);
    if (!cadences.has(source.cadence)) errors.push(`${at}: invalid cadence ${source.cadence}`);
    if (!Array.isArray(source.urls) || !source.urls.length) errors.push(`${at}: urls must be non-empty`);
    for (const url of source.urls || []) {
      if (!/^https:\/\//.test(url) || /…|\.\.\./.test(url)) errors.push(`${at}: invalid or placeholder URL ${url}`);
    }
    if (!Array.isArray(source.destinations) || !source.destinations.length) errors.push(`${at}: destinations must be non-empty`);
    for (const destination of source.destinations || []) {
      if (!requiredDestinations.includes(destination)) errors.push(`${at}: unknown destination ${destination}`);
      covered.add(destination);
    }
    if (!Array.isArray(source.legacyIds)) errors.push(`${at}: legacyIds must be an array`);
    if (!(source.checkedAt === null || /^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt || ""))) errors.push(`${at}: checkedAt must be YYYY-MM-DD or null`);
  }
  for (const destination of requiredDestinations) if (!covered.has(destination)) errors.push(`uncovered destination ${destination}`);
  for (const source of practitionerRoster?.sources || []) {
    const match = (registry?.sources || []).find(candidate => candidate.id === source.id || candidate.legacyIds?.includes(source.id));
    if (!match) errors.push(`practitioner source missing from canonical registry: ${source.id}`);
    if (["PROMOTED", "PILOT"].includes(source.promotionStatus) && !["ACTIVE_MONITOR", "PILOT_MONITOR"].includes(match?.status)) {
      errors.push(`recurring practitioner source ${source.id} is not an active/pilot canonical monitor`);
    }
  }
  return { ok: errors.length === 0, errors, sourceCount: registry?.sources?.length || 0, destinationCount: covered.size };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const practitioner = JSON.parse(fs.readFileSync(practitionerPath, "utf8"));
  const result = validateSourceRegistry(registry, practitioner);
  if (!result.ok) {
    console.error("SOURCE REGISTRY FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("SOURCE REGISTRY PASS");
  console.log(`sources=${result.sourceCount}`);
  console.log(`destinations=${result.destinationCount}`);
}
