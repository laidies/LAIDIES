#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const root = process.cwd();
const id = "senate-hugging-face-inquiry-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/cisa-distillation-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "What changed when senators began asking OpenAI for the records behind the Hugging Face incident?",
  promisedPayoff: "Understand what information senators are seeking, why the underlying records matter and why a request for answers is not itself a finding.",
  priorKnowledge: "No knowledge of congressional procedure, cybersecurity evaluations or AI audits is assumed.",
  centralMentalModel: "A company report, its underlying records and a congressional request are different evidence layers; the request may expose more evidence but does not prove the allegations it contains.",
  dailyLifeConnection: "A reader sees a new alarming headline about an incident already reported and needs to know what is actually new.",
  surfaceJob: "A September 10 NewsStand follow-up on September 9 Senate requests, with the July incident and August disclosure kept distinct from the new oversight action.",
  desiredFeeling: "I can see what has escalated and what remains unanswered without treating a political allegation as a verdict."
};
contract.canonicalTruth = [{
  claimId: "senate-hugging-face-inquiries",
  owner: "The senators own their letters and allegations; OpenAI owns its incident account and response; AP owns its independent reporting; NewsStand owns the bounded synthesis.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen the letters, AP report and OpenAI incident page on publication day; redraft for an OpenAI document response, subpoena, hearing, formal committee finding, enforcement action or corrected source language."
}];
const guard = "Keep every request, allegation, company statement and confirmed event in its own evidence layer; do not call a letter a finding, subpoena, hearing, law or completed investigation.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The plan moves from the dated Senate requests to the records they seek, then states exactly what the letters cannot establish.";
}
contract.draftArchitecture = {
  plainAnswer: "Senators are asking OpenAI for internal records, timelines and fuller access behind an incident OpenAI has already acknowledged. The requests increase outside scrutiny but do not establish that the senators' allegations are true.",
  causalSequence: [
    "OpenAI published its account of the July incident and described its response.",
    "Senators questioned whether the public account and external audit covered the full timeline and evidence.",
    "Their letters request logs, communications, timelines, audit-scope records and answers by named dates.",
    "Only OpenAI's response and any later public proceeding can show what additional evidence emerges."
  ],
  workedCase: "Hawley's annex asks for a timestamped incident timeline and the agreement governing METR and Redwood's audit scope.",
  transferCase: "When a regulator asks a company for the records behind a safety report, the request changes oversight pressure before it changes the established facts.",
  usefulAction: "No forced personal task; make the reader-facing payoff the distinction between a public report, underlying records and a later finding.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Explain one oversight escalation and its evidence boundary; omit operational attack details and broad existential-risk debate.",
  analogyPlan: [{
    concept: "A summary versus the records behind it",
    analogy: "A workplace investigation can include both a management summary and the meeting notes or message log behind it.",
    mapping: "OpenAI's public incident report is the summary; the requested logs, timelines and audit agreements are underlying records.",
    limit: "Congressional oversight has different powers and consequences from an internal workplace review.",
    whyItHelps: "It makes the evidence layers visible without implying that a request proves misconduct."
  }],
  humourPlan: { noneReason: "The cybersecurity incident and disputed accountability require direct, neutral language." },
  readerQuestions: [
    { id: "event", question: "What did senators do this week?" },
    { id: "mechanism", question: "What records are they seeking and why would those records change what can be checked?" },
    { id: "evidence", question: "What is acknowledged, alleged and still unknown?" },
    { id: "effect", question: "What changed for the public before OpenAI answers?" }
  ],
  requiredTerms: [
    { term: "incident report", meaning: "a documented account of what happened, what contributed and how an organization responded" },
    { term: "underlying records", meaning: "the logs, messages, timelines and agreements from which an account can be checked" }
  ],
  presentationPlan: "Reuse the approved incident-boundary NewsStand illustration unchanged; it must not depict a Senate request as a verdict or enforcement action."
};
contract.communicationDesign.surfaceAdaptation = "Answer the dated oversight change first, make the report-to-records evidence sequence visible, preserve each allegation and company statement as attributed, and land on what remains unknown.";
for (const value of Object.values(contract.communicationDesign.dimensions)) {
  value.reason = "Help a beginner understand how a request for underlying records can increase scrutiny without producing a finding.";
  value.plannedEvidence = "The article moves from OpenAI's acknowledged incident to the exact Senate requests, then explains what only a later response or proceeding could establish.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["dated news answer", "evidence sequence", "consequence", "retained uncertainty"],
  adaptation: "News first; the report, records, request and possible response receive more space than institutional labels."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Did the Senate find OpenAI reckless?", answer: "No. Hawley used that characterization in a request for records; no Senate finding is established." },
  { question: "What is new?", answer: "Separate senators are asking for records, audit details or agency access after OpenAI's public incident report." },
  { question: "What remains unknown?", answer: "Whether OpenAI will provide the requested material and whether it changes the account of decisions, warnings or audit scope." }
];
contract.representativeProofPlan = {
  highestRisk: "The article could turn a senator's accusations into findings or retell the incident without explaining the new oversight action.",
  plannedProof: "Bind the exact requests and deadlines to two primary Senate letters, attribute Van Hollen and OpenAI's response to AP, and keep the acknowledged incident in OpenAI's own words.",
  acceptanceOutcome: "A reader can explain what senators requested, why the records matter and why no finding has yet resulted."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
