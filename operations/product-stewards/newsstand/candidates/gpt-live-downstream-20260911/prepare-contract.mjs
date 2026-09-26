#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const id = "gpt-live-downstream-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/california-chatbot-law-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "Where might an ordinary caller encounter GPT-Live-1, what part of the phone conversation does it handle, and does a natural voice prove a reservation or appointment was recorded?",
  promisedPayoff: "Recognize the new voice layer in restaurant and service-business calls, understand its boundary with business data and booking tools, and check the resulting transaction without needing to use an API.",
  priorKnowledge: "No knowledge of APIs, voice-agent architecture, developer tools, Yelp Host or Hatch is assumed.",
  centralMentalModel: "GPT-Live-1 handles the live listening and speaking; the connected backend handles business rules, data, tools, permissions, confirmations and the lasting record.",
  dailyLifeConnection: "A woman calls a restaurant to change a reservation or a repair company to book a visit and hears a fluent automated voice.",
  surfaceJob: "A September 11 NewsStand explanation of OpenAI's September 10 developer release and Yelp's downstream adoption announcement.",
  desiredFeeling: "I understand why the call may sound different, where the real transaction happens and what remains a company claim."
};
contract.canonicalTruth = [{
  claimId: "gpt-live-release-and-downstream-use",
  owner: "OpenAI owns the product release and architecture claims; current OpenAI documentation owns the voice/backend division; Yelp owns its adoption and initial test claims; NewsStand owns the bounded synthesis.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen OpenAI and Yelp sources on publication day; redraft for changed availability or pricing, disclosed rollout or methods, independent outcome evidence, corrections or product withdrawal."
}];
const guard = "Do not turn an API release into a claim that every caller or ChatGPT user received a feature. Keep the voice layer separate from backend business data, tools, permissions and confirmation. Attribute Yelp's early results to Yelp, disclose missing method and rollout details, and never assign the more-than-one-million historical Host calls to GPT-Live-1.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The planned story starts with the consumer encounter, traces voice to backend to transaction record, and separates company observations from independent outcomes.";
}
contract.draftArchitecture = {
  plainAnswer: "OpenAI released GPT-Live-1 to developers on September 10, and Yelp says it integrated the voice layer into restaurant and service-business phone products; callers may hear it without using the API themselves.",
  causalSequence: [
    "OpenAI made the model available through its API and Yelp announced two named downstream integrations.",
    "GPT-Live-1 listens and speaks during the call, including interruptions and changed directions.",
    "A separate backend checks availability, applies business rules and uses the booking or appointment tool.",
    "The resulting record, not the fluency of the voice, determines whether the transaction happened."
  ],
  workedCase: "A caller changes a restaurant reservation from four people to five mid-sentence. The voice layer handles the interruption, while availability data and the booking tool decide and record the result.",
  transferCase: "On a repair call, a fluent voice can repeat an address and appointment window, but the connected scheduling system must still record them correctly.",
  usefulAction: "At the end of the call, repeat the details that matter and ask for confirmation of the actual reservation or appointment; ask for a person if the system cannot confirm it.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Lead with the ordinary phone encounter, then explain the smallest useful architecture. Avoid a developer tutorial, a vendor feature list, a work-only frame or generalized AI caution.",
  analogyPlan: [],
  humourPlan: { noneReason: "The practical reservation example supplies warmth and clarity without a decorative reference." },
  readerQuestions: [
    { id: "encounter", question: "Where might I encounter GPT-Live-1 without using an API?" },
    { id: "mechanism", question: "What does the voice layer do, and what remains in the backend?" },
    { id: "evidence", question: "Which benefits are company claims and what evidence is missing?" },
    { id: "action", question: "How do I check that the requested reservation or appointment actually exists?" }
  ],
  requiredTerms: [
    { term: "front-end voice layer", meaning: "the part that listens and speaks while a separate backend checks information and completes tasks" },
    { term: "full duplex", meaning: "listening and speaking at the same time" }
  ],
  presentationPlan: "Reuse the existing approved NewsStand evidence-checking illustration unchanged; no new image or fictional caller portrait."
};
contract.communicationDesign.surfaceAdaptation = "Answer the nondeveloper's encounter first, make the voice-to-backend-to-record mechanism visible and keep the vendor evidence boundary beside the claimed improvements.";
for (const [key, value] of Object.entries(contract.communicationDesign.dimensions)) {
  value.disposition = key === "humourSurprise" ? "NOT_APPLICABLE" : "APPLY";
  value.reason = "Help a beginner separate a more natural phone conversation from the connected transaction system that determines the result.";
  value.plannedEvidence = "The exact story uses one changed reservation, then transfers the same check to a repair appointment.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["dated release", "ordinary caller encounter", "voice-layer mechanism", "backend boundary", "company-reported results", "specific confirmation check"],
  adaptation: "The encounter leads; the mechanism receives the centre; the landing checks the record that matters."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Does a caller need an API account to encounter GPT-Live-1?", answer: "No. A restaurant or service business may deploy it inside its phone system." },
  { question: "Does the smooth voice itself create the reservation?", answer: "No. A connected backend and booking tool must check and record it." },
  { question: "Do Yelp's early observations prove transaction accuracy?", answer: "No. The release gives no sample, method, rollout scope or independent assessment." }
];
contract.representativeProofPlan = {
  highestRisk: "The piece could become developer release notes or imply that conversational fluency proves transaction success.",
  plannedProof: "Use one ordinary reservation correction to show the voice/backend boundary, then require confirmation of the recorded details.",
  acceptanceOutcome: "A reader can name where she may encounter the model, explain which layer records the result and distinguish Yelp's claims from independent evidence."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
