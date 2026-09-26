#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const id = "california-chatbot-law-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "California signed child-chatbot safety rules. What changed at signing, when do the main safeguards begin, and which products and families do they cover?",
  promisedPayoff: "Understand the signed law, its companion-chatbot scope, the July 1, 2027 implementation date, concrete child defaults, audit timing and what is not yet evidence of effectiveness.",
  priorKnowledge: "No knowledge of California legislation, chatbot design, age assurance or regulatory audits is assumed.",
  centralMentalModel: "Signing creates a legal commitment and an implementation clock; operative dates say when duties begin to apply, while later product changes and audits show implementation and results.",
  dailyLifeConnection: "A family sees a signing headline and needs to know whether a child's chatbot settings changed today or whether the service has time to build the controls.",
  surfaceJob: "A September 11 NewsStand explanation of the September 10 signing, grounded in the official sponsor confirmation, enrolled bill text and independent AP reporting.",
  desiredFeeling: "I know what the law requires, when the main rules begin and which future evidence will show whether the safeguards work."
};
contract.canonicalTruth = [{
  claimId: "california-sb1119-signing-and-timeline",
  owner: "California's official sponsor release owns signing confirmation; enrolled statutory text owns definitions, duties and dates; AP owns independent event and family reporting; NewsStand owns the bounded synthesis.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen the signing and statutory records on publication day; redraft for a chaptered text difference, implementation guidance, product change, court or enforcement action, or audit evidence changing the scope, timing or effectiveness boundary."
}];
const guard = "Confirm signing from the official sponsor and AP, but use enacted or enrolled text for provisions. Define operative as begin to apply. Do not claim immediate controls, universal chatbot coverage, guaranteed safety, legal advice or an immediate audit. Preserve age, operator, product and smaller-operator audit conditions.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The planned story separates signing, July 2027 duties, later audits and future effectiveness evidence, with concrete defaults and explicit scope conditions.";
}
contract.draftArchitecture = {
  plainAnswer: "Newsom signed SB 1119 on September 10. Its main cited child-safety sections begin to apply July 1, 2027, so signing does not mean every covered service changed overnight.",
  causalSequence: [
    "The official sponsor release and AP independently establish the September 10 signing.",
    "The law applies to companion chatbots designed for ongoing relationship-like or social interaction and imposes duties on covered operators.",
    "Before a new or substantially modified covered chatbot is released, operators must assess child-safety risks and document reasonable mitigation; child-permitting services face specific notices, controls and defaults.",
    "The main cited provisions begin July 1, 2027, while interface tests and independent audits follow separate dates, so implementation and effectiveness remain future evidence."
  ],
  workedCase: "A California family reads 'law signed' on September 10. The story shows why no-push defaults and session limits are legal requirements for the July 2027 implementation date rather than proof that the child's app changed that day.",
  transferCase: "When another law is announced, separate the signing date, operative date, covered product and enforcement or audit timetable before assuming a service already changed.",
  usefulAction: "Ask the service which specific child control it must implement, when that duty begins and what later evidence shows the control is present and working.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Lead with the signed law and delayed implementation date, then explain concrete settings and audit limits. Avoid generic child-safety advice, legal conclusions or a catalogue of every statutory subsection.",
  analogyPlan: [],
  humourPlan: { noneReason: "The child-safety context and family testimony call for clear, restrained prose." },
  readerQuestions: [
    { id: "event", question: "What did California sign?" },
    { id: "scope", question: "What counts as a companion chatbot here?" },
    { id: "timing", question: "When do the main safeguards begin to apply?" },
    { id: "evidence", question: "What would show implementation and effectiveness later?" }
  ],
  requiredTerms: [
    { term: "companion chatbot", meaning: "an AI system designed for an ongoing relationship-like or social interaction" },
    { term: "persistent conversational memory", meaning: "using earlier conversations in later ones" },
    { term: "operative", meaning: "begin to apply" }
  ],
  presentationPlan: "Reuse an existing approved NewsStand evidence-checking illustration unchanged; do not depict Adam Raine, his family or a fictionalized child."
};
contract.communicationDesign.surfaceAdaptation = "Answer the signed event and July 2027 date first, make the signing-to-implementation-to-audit sequence visible, and keep family context distinct from proof of effectiveness.";
for (const [key, value] of Object.entries(contract.communicationDesign.dimensions)) {
  value.disposition = key === "humourSurprise" ? "NOT_APPLICABLE" : "APPLY";
  value.reason = "Help a beginner separate a signed law from an immediate product change and understand concrete child settings without legal jargon.";
  value.plannedEvidence = "The exact story defines the covered product, names the main date beside example controls and closes with future evidence to watch.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["signed event", "covered product", "specific duties", "operative date", "family stakes", "audit timing", "future evidence"],
  adaptation: "The event and date lead; the concrete controls and scope carry the centre; the landing is one precise implementation question."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Did every child-chatbot control appear on signing day?", answer: "No. The main cited child-safety sections begin to apply July 1, 2027." },
  { question: "Does the law automatically cover every answer from every general chatbot?", answer: "No. The cited definition and duties target companion chatbots and contain operator, age and product conditions." },
  { question: "Does signing prove the safeguards prevent harm?", answer: "No. Product implementation, guidance, enforcement and audits remain future evidence." }
];
contract.representativeProofPlan = {
  highestRisk: "A signing headline could be misread as immediate product protection, while the audit exception could be misreported as an exemption from the whole law.",
  plannedProof: "Place the July 1, 2027 date beside the concrete settings and state that the under-$500-million exception applies to the audit section until 2032.",
  acceptanceOutcome: "A reader can explain what was signed, name two concrete controls, distinguish signing from operation and state what remains unproved."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
