import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSourceRegistry } from "./check-source-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json"), "utf8"));
const practitioner = JSON.parse(fs.readFileSync(path.join(root, "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json"), "utf8"));
const clone = value => JSON.parse(JSON.stringify(value));
const expectFail = (name, candidate, roster, pattern) => {
  const result = validateSourceRegistry(candidate, roster);
  if (result.ok || !result.errors.some(error => pattern.test(error))) throw new Error(`${name}: validator failed to reject fixture: ${result.errors.join(" | ")}`);
};

const baseline = validateSourceRegistry(registry, practitioner);
if (!baseline.ok) throw new Error(`baseline invalid: ${baseline.errors.join(" | ")}`);

const duplicate = clone(registry);
duplicate.sources.push(clone(duplicate.sources[0]));
expectFail("duplicate id", duplicate, practitioner, /duplicate id/);

const placeholder = clone(registry);
placeholder.sources[0].urls[0] = "https://example.com/…/source";
expectFail("placeholder URL", placeholder, practitioner, /placeholder URL/);

const nonAiCareerSource = clone(registry);
nonAiCareerSource.sources.push({
  id: "TEST-GENERAL-CAREER-SOURCE", name: "General career source", publisher: "Test",
  authorityTier: "SECONDARY_SCOUT", status: "HOLD", cadence: "ON_TRIGGER",
  urls: ["https://example.org/career"], destinations: ["career_work_life_tip"],
  bestUse: "A useful workplace situation that does not discuss AI.",
  limits: "The source is a lead, not authority for the AI mirror.",
  verifyBeforeUse: "Verify the workplace guidance and bind a separate AI source for the mirror.",
  checkedAt: null, recheckTrigger: "Before use.", legacyIds: []
});
const acceptedCareer = validateSourceRegistry(nonAiCareerSource, practitioner);
if (!acceptedCareer.ok) throw new Error(`non-AI career source should be eligible: ${acceptedCareer.errors.join(" | ")}`);

const missingCareerTransformation = clone(registry);
delete missingCareerTransformation.destinationContracts.career_work_life_tip;
expectFail("missing career transformation", missingCareerTransformation, practitioner, /allow non-AI career|transformation contract/);

const missingBigQuestionContract = clone(registry);
delete missingBigQuestionContract.destinationContracts.news_big_question;
expectFail("missing Big Question contract", missingBigQuestionContract, practitioner, /news_big_question/);

const missingMissJeevesContract = clone(registry);
delete missingMissJeevesContract.destinationContracts.dear_miss_jeeves;
expectFail("missing Dear Miss Jeeves contract", missingMissJeevesContract, practitioner, /dear_miss_jeeves/);

const automaticVisitorQuestionIntake = clone(registry);
automaticVisitorQuestionIntake.destinationContracts.dear_miss_jeeves.intakeBoundary = "Visitor questions publish automatically.";
expectFail("automatic visitor question intake", automaticVisitorQuestionIntake, practitioner, /prohibit automatic visitor-question/);

const reputationAsAuthority = clone(registry);
reputationAsAuthority.publicationEvidenceContract.reportingRole = "Reputable reporting is sufficient authority.";
expectFail("reputation as authority", reputationAsAuthority, practitioner, /deny reputation-based authority/);

const missingAidbPublicationCheck = clone(registry);
missingAidbPublicationCheck.publicationEvidenceContract.requiredBeforeNewsstandPublication =
  missingAidbPublicationCheck.publicationEvidenceContract.requiredBeforeNewsstandPublication.filter(item => !item.includes("AIDB"));
expectFail("missing AIDB publication check", missingAidbPublicationCheck, practitioner, /AIDB cross-check|NOT_COVERED/);

const uncovered = clone(registry);
for (const source of uncovered.sources) source.destinations = source.destinations.filter(destination => destination !== "promptoscope");
expectFail("destination coverage", uncovered, practitioner, /uncovered destination promptoscope/);

const missingPractitioner = clone(registry);
missingPractitioner.sources = missingPractitioner.sources.filter(source => source.id !== "SRC-AIDB");
expectFail("practitioner reconciliation", missingPractitioner, practitioner, /practitioner source missing/);

const falseMollickXCoverage = clone(registry);
falseMollickXCoverage.sources.find(source => source.id === "SRC-ETHAN-MOLLICK").channelCoverage
  .find(channel => channel.url === "https://x.com/emollick").status = "ACTIVE_MACHINE_MONITOR";
expectFail("false Mollick X coverage", falseMollickXCoverage, practitioner, /X channel must disclose/);

const unboundRecurringUrl = clone(registry);
unboundRecurringUrl.sources.find(source => source.id === "SRC-ETHAN-MOLLICK").recurringUrl = "https://example.org/not-registered";
expectFail("unbound recurring URL", unboundRecurringUrl, practitioner, /recurringUrl must be one of urls/);

console.log("SOURCE REGISTRY TEST PASS");
console.log("calibration=duplicate-id,placeholder-url,missing-career-transformation,missing-big-question,missing-dear-miss-jeeves,automatic-visitor-intake,reputation-as-authority,missing-aidb-publication-check,missing-destination,missing-practitioner,false-mollick-x-coverage,unbound-recurring-url rejected; non-AI-career-source accepted");
