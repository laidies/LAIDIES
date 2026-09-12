#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const id = "wiser-records-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "What do newly released records show about delays and safeguards in Medicare's AI-assisted WISeR payment review?",
  promisedPayoff: "Understand the rollout problems in the newly released records, how AI-assisted prior authorization works, what safeguards CMS requires and what an affected person can ask when a request is delayed.",
  priorKnowledge: "No knowledge of Medicare payment review, insurance administration or health AI is assumed.",
  centralMentalModel: "WISeR is an AI-assisted payment checkpoint with licensed clinical review. Operational delays can affect care even though a payment-review status is not a treatment decision or final care outcome.",
  dailyLifeConnection: "A reader or family member may use Medicare, help arrange a procedure or encounter a frightening headline saying AI denied thousands of people care.",
  surfaceJob: "A September 10 NewsStand report on records EFF released September 8, leading with the documented rollout problems and accurately correcting EFF's key count inside the story.",
  desiredFeeling: "I can take the delays seriously without repeating a false number or imagining that an AI alone made every decision."
};
contract.canonicalTruth = [{
  claimId: "wiser-records-and-current-scope",
  owner: "CMS owns the program requirements and primary records; EFF owns its release and advocacy claims; KFF owns its independent reporting; NewsStand owns the bounded comparison and correction.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen CMS, EFF and KFF on publication day; redraft for corrected record totals, new CMS performance data, corrective action, program expansion, litigation outcome or evidence changing current delays or safeguards."
}];
const guard = "Use the primary table exactly: 20,397 total decisions, 14,453 affirmations and 5,944 non-affirmations. Never call total decisions denials, equate every non-affirmation with final denied care, merge cumulative tables, assign every delay to AI or extend six-state Original Medicare scope to Medicare Advantage.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The planned story leads with the documented rollout problems, then connects the payment-review mechanism, EFF count correction, CMS safeguards, vendor responses and the exact limits of causation and scope.";
}
contract.draftArchitecture = {
  plainAnswer: "The records document requests waiting days or weeks and a vendor preparing to launch without full functionality. The cited table also corrects EFF's claim: its 20,397 total decisions contain 14,453 affirmations and 5,944 non-affirmations, not more than 20,000 denials.",
  causalSequence: [
    "A provider asks for advance assurance that Original Medicare will pay for one of WISeR's selected services.",
    "A participating company uses AI and other technology to check documentation against Medicare rules; CMS says a licensed clinician determines any recommendation not to pay.",
    "The request can be affirmed, non-affirmed, corrected, resubmitted or appealed, so one status table does not state every patient's final outcome.",
    "Operational delays can still affect scheduling and payment assurance even when the record cannot prove AI caused each delay."
  ],
  workedCase: "Page 322 reports 20,397 total decisions for two vendors and separates 14,453 affirmations from 5,944 non-affirmations; EFF incorrectly described the total as more than 20,000 denials.",
  transferCase: "When another automated-benefits headline gives one alarming total, separate all processed cases from adverse first-stage decisions and final outcomes after correction or appeal.",
  usefulAction: "If an affected request is delayed, ask the provider which stage it is in—vendor response, decision letter or correction—and which review, resubmission or appeal route applies.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Centre the newly documented rollout problems and the actual payment-review sequence; keep the count correction in context, and avoid a generic AI-bias essay, personal medical advice or a checklist detached from a live delayed request.",
  analogyPlan: [],
  humourPlan: { noneReason: "Medicare access and reported patient delays call for calm, exact language rather than a joke." },
  readerQuestions: [
    { id: "event", question: "What did EFF release and what does the cited table actually say?" },
    { id: "mechanism", question: "Where do AI, the vendor and a licensed clinician enter the prior-authorization process?" },
    { id: "scope", question: "Who and which services are covered by WISeR?" },
    { id: "action", question: "What can an affected person ask when a request is delayed?" }
  ],
  requiredTerms: [
    { term: "prior authorization", meaning: "a provider asks before treatment for assurance that Medicare will pay" },
    { term: "affirmation", meaning: "an advance decision that the request meets Medicare's requirements" },
    { term: "non-affirmation", meaning: "it was not approved at that point; it may later be corrected, resubmitted or appealed" },
    { term: "Original Medicare", meaning: "the federal fee-for-service program, distinct from private Medicare Advantage plans" }
  ],
  presentationPlan: "Reuse the approved NewsStand evidence-checking illustration unchanged; it must not depict an AI doctor, a final clinical denial or a patient identity."
};
contract.communicationDesign.surfaceAdaptation = "Lead with the newly documented rollout problems, make the payment-review sequence visible, keep the exact count correction in context and preserve CMS safeguards, vendor responses and causal limits beside the claims they constrain.";
for (const [key, value] of Object.entries(contract.communicationDesign.dimensions)) {
  value.disposition = key === "humourSurprise" ? "NOT_APPLICABLE" : "APPLY";
  value.reason = "Help a beginner distinguish processed decisions, first-stage non-affirmations and final care outcomes while seeing why administrative delay still matters.";
  value.plannedEvidence = "The article follows one request through vendor technology, licensed clinical review and possible correction, resubmission or appeal, then applies that sequence to the exact primary-record totals.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["dated records release", "rollout records", "number correction", "payment-review mechanism", "personal consequence", "bounded action"],
  adaptation: "The substantive rollout records come first; the count correction follows inside the story, and the mechanism earns why both the delays and the distinction between stages matter."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Did two WISeR vendors deny more than 20,000 requests?", answer: "No. The cited table reports 20,397 total decisions, including 14,453 affirmations and 5,944 non-affirmations." },
  { question: "Did AI make every non-payment recommendation?", answer: "CMS says licensed clinicians determine all recommendations for non-payment; the records do not expose AI's contribution to every case." },
  { question: "Does WISeR apply to Medicare Advantage?", answer: "No. CMS says the model applies to selected Original Medicare services in six states." }
];
contract.representativeProofPlan = {
  highestRisk: "The story could repeat EFF's false 20,000-denial figure or use real delays to imply that AI alone made every decision and caused every harm.",
  plannedProof: "Bind every number to the exact record page, define non-affirmation before drawing consequences, retain the page 234 stage breakdown, and place CMS's licensed-clinician, service-exclusion and Medicare Advantage limits in the main prose.",
  acceptanceOutcome: "A reader can state the correct count, explain the AI-assisted payment checkpoint and identify both documented rollout problems and what the evidence does not prove."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
