#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const id = "coxon-warning-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "What does an Anthropic researcher's resignation establish, and how much weight should I give the frightening predictions attached to it?",
  promisedPayoff: "Understand the verified event, the proposed AI-development slowdown, the difference between testimony and measured evidence, and how to read a personal risk percentage.",
  priorKnowledge: "No knowledge of AI pretraining, alignment, forecasting or company safety policies is assumed.",
  centralMentalModel: "A resignation is an observed event; an insider warning is testimony; a probability about the future is a forecast whose evidentiary strength depends on its method.",
  dailyLifeConnection: "A reader encounters a precise-looking percentage in alarming coverage and needs to decide what the number actually tells her.",
  surfaceJob: "A September 10 NewsStand report on Coxon’s primary post and September 9 reporting, distinguishing the resignation, forecasts, proposal, current company position and unknowns.",
  desiredFeeling: "I can take the warning seriously without mistaking a personal estimate for a measured fatality rate."
};
contract.canonicalTruth = [{
  claimId: "coxon-resignation-and-risk-forecast",
  owner: "Coxon and Hubinger own their statements; WIRED and ABC own their reporting; Anthropic owns its policy and response; NewsStand owns the bounded synthesis.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen all sources on publication day; redraft for a corrected statement, company response, disclosed method, policy change, independent audit, agreement or evidence changing the present-versus-forecast boundary."
}];
const guard = "Attribute every warning and estimate. State that Coxon said Anthropic is not currently cutting corners. Treat Hubinger's greater-than-ten-percent figure as his personal forecast, never a measured fatality rate, consensus or company estimate. Keep biological and cyber risks high-level and describe pacing as a proposal.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The planned story separates observed event, first-hand testimony, personal forecast, company response and unresolved future claim in that order.";
}
contract.draftArchitecture = {
  plainAnswer: "Coxon resigned and issued a public warning. That establishes his departure and view, not the probability or timing of catastrophe. Hubinger's greater-than-ten-percent figure is explicitly his personal estimate.",
  causalSequence: [
    "Coxon says competition could push companies to use AI to help build the next AI systems faster.",
    "He worries safety work and public rules may not keep pace, and proposes coordinated limits.",
    "He also says Anthropic is not currently cutting corners, so his warning is about predicted future pressure rather than a present finding.",
    "Hubinger's percentage is a personal forecast without a published method in the reviewed post."
  ],
  workedCase: "Compare Coxon's observed resignation with Hubinger's explicitly personal greater-than-ten-percent forecast; the first is a dated event and the second is an uncertain judgment.",
  transferCase: "When an expert assigns a percentage to a future disruption, ask whether it came from observed frequencies, a disclosed model, a survey or personal judgment.",
  usefulAction: "When coverage presents a frightening probability, identify the estimator, the method and what evidence would change the estimate.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Lead with the resignation and specific proposal, then explain evidence strength. Avoid a generic AI-doom essay, operational harm details or a detached safety checklist.",
  analogyPlan: [],
  humourPlan: { noneReason: "Catastrophic-risk warnings call for precise, calm prose rather than a joke." },
  readerQuestions: [
    { id: "event", question: "What happened on September 9?" },
    { id: "proposal", question: "What does Coxon want companies and governments to do?" },
    { id: "evidence", question: "What do the resignation and percentage establish?" },
    { id: "unknown", question: "What remains unproved?" }
  ],
  requiredTerms: [
    { term: "recursive self-improvement", meaning: "using AI to help build the next AI systems" },
    { term: "personal forecast", meaning: "one person's estimate about an uncertain future, not a measured past rate" }
  ],
  presentationPlan: "Reuse the approved NewsStand testing-maze illustration unchanged; it must not depict a real person, biological weapon, cyber target or realized catastrophe."
};
contract.communicationDesign.surfaceAdaptation = "Answer the dated event first, make the competition-to-future-pressure mechanism visible, and keep every prediction beside its evidence limit.";
for (const [key, value] of Object.entries(contract.communicationDesign.dimensions)) {
  value.disposition = key === "humourSurprise" ? "NOT_APPLICABLE" : "APPLY";
  value.reason = "Help a beginner distinguish an observed resignation from testimony, a personal forecast and a company policy response.";
  value.plannedEvidence = "The exact story names the speaker and evidence type at each step and supplies a reusable question for probability claims.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["resignation statement", "dated reporting", "specific proposal", "current-company boundary", "forecast interpretation", "public governance question"],
  adaptation: "The event leads; the mechanism and evidence types receive the centre; the landing is one concrete reading move."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Did Coxon say Anthropic is already cutting corners?", answer: "No. He told WIRED it is not currently cutting corners and predicted future pressure." },
  { question: "Is greater than ten percent a measured death rate?", answer: "No. Hubinger explicitly called it his personal estimate and supplied no calculation in the reviewed post." },
  { question: "Did the feared biological or cyber outcome occur?", answer: "No reviewed source establishes that; these are high-level future risks in Coxon's warning." }
];
contract.representativeProofPlan = {
  highestRisk: "A vivid extinction percentage could be laundered into a measured fact, while Coxon's present-tense statement about Anthropic could be lost.",
  plannedProof: "Bind the percentage to the exact primary post, quote its personal qualifier in meaning, and place Coxon's no-current-corners statement beside his prediction of future pressure.",
  acceptanceOutcome: "A reader can identify the observed event, explain recursive self-improvement, classify the percentage correctly and name what remains unproved."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
