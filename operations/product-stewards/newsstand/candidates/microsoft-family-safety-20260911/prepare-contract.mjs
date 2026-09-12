#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const id = "microsoft-family-safety-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/california-chatbot-law-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "What changed in Microsoft’s family and youth protections, what can a family use now, and are Windows age checks already universal?",
  promisedPayoff: "Separate the current Copilot account rule and usable Family Safety fixes from Windows age signals that are still in preview, without treating company safety claims as measured outcomes.",
  priorKnowledge: "No knowledge of Windows Insider previews, APIs, Microsoft Entra accounts, age assurance or parental-control software is assumed.",
  centralMentalModel: "The Microsoft account can identify an age category; a product can use that category to choose an experience; separate Family Safety controls govern things such as screen time, apps and spending.",
  dailyLifeConnection: "A woman helping a young person use a shared or personal Windows computer needs to know which controls exist today and which announced safeguards are still being tested.",
  surfaceJob: "A September 11 NewsStand explanation of Microsoft’s September 10 framework and the concrete September 8 family-product changes it cites.",
  desiredFeeling: "I can tell the current account rule, current family controls and future Windows app signal apart, and I know what Microsoft has not proved."
};
contract.canonicalTruth = [{
  claimId: "microsoft-family-and-age-signal-changes",
  owner: "Microsoft owns its current Copilot rule, Family Safety feature, availability, architecture and safety claims; Windows Central owns its independent scope reporting; NewsStand owns the bounded synthesis.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen all Microsoft pages on publication day; redraft for changed Copilot age or account rules, general Windows Age API availability, changed Family Safety availability, corrections or independent safety-outcome evidence."
}];
const guard = "Do not call Microsoft’s framework a measured safety result. Keep three layers distinct: the current Copilot personal-account rule, available Family Safety fixes, and Windows age signals still limited to Insiders. Do not imply every Windows app checks age, a precise date of birth is shared, or work and school Copilot accounts follow the personal-account support page.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The planned story starts with what a family can use now, then traces account to limited age signal to app response and places the preview and evidence boundaries beside the claim.";
}
contract.draftArchitecture = {
  plainAnswer: "Microsoft now requires a personal Microsoft account to use its updated Copilot app and restricts it below age 13, while current Family Safety apps add practical fixes; a wider Windows system for sharing age categories with apps is still an Insider preview.",
  causalSequence: [
    "A personal Microsoft account carries the age context used by the updated Copilot experience and Family Safety controls.",
    "Microsoft’s current Copilot support page sets a minimum age of 13, or higher where regional rules require it.",
    "Available Family Safety fixes change approval speed, activity coverage, spending balances and family-group management.",
    "The separate Windows Age API is designed to give an app an age bracket or verification status without a full birth date, but it is still limited to Windows Insiders and one function is future work.",
    "The app developer still decides what experience follows from the signal, and the reviewed evidence does not measure safety outcomes."
  ],
  workedCase: "A young person asks for more screen time. The current Family Safety approval flow handles that request; the preview Windows age signal is a different mechanism that could let an app learn an age bracket and adapt its own experience.",
  transferCase: "A game receiving a teen age category would still need its developer to decide which chat or purchase controls to apply; the age signal does not create the control by itself.",
  usefulAction: "If helping manage a family account, update the Family Safety app or use its web page for current controls; when reading a new age-safety claim, ask whether it describes Copilot, Family Safety or an Insider-only Windows API.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Lead with the usable change and the preview limit. Avoid a framework recap, a feature list, universal age-check language, legal advice or an assumption that every reader is a parent.",
  analogyPlan: [],
  humourPlan: { noneReason: "The everyday screen-time request shows the product layers more clearly than a decorative analogy." },
  readerQuestions: [
    { id: "now", question: "What can a family actually use now?" },
    { id: "copilot", question: "Which Copilot users and accounts does the new age rule cover?" },
    { id: "mechanism", question: "What does Windows share with an app, and what does the app still decide?" },
    { id: "limits", question: "Which parts are preview-only, and what outcome has not been independently established?" }
  ],
  requiredTerms: [
    { term: "age signal", meaning: "an age category or verification status an account can pass to an app without giving it a full date of birth" },
    { term: "Windows Insider", meaning: "a person using a preview version of Windows before a feature reaches the general public" }
  ],
  presentationPlan: "Reuse the existing approved NewsStand evidence-checking illustration unchanged; do not generate family or child imagery."
};
contract.communicationDesign.surfaceAdaptation = "Answer what works now first, make account-to-signal-to-app visible and keep preview and company-evidence limits beside the relevant claims.";
for (const [key, value] of Object.entries(contract.communicationDesign.dimensions)) {
  value.disposition = key === "humourSurprise" ? "NOT_APPLICABLE" : "APPLY";
  value.reason = "Help a beginner distinguish a current account rule and family controls from a preview platform signal and a developer’s later choice.";
  value.plannedEvidence = "The exact story uses one screen-time request, then transfers the mechanism to an app deciding how to adapt for a teen account.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["dated announcement", "current family controls", "account-to-age-signal mechanism", "Insider preview boundary", "company-evidence boundary", "specific layer check"],
  adaptation: "The current reader consequence leads; the mechanism receives the centre; the landing identifies which product layer a future claim concerns."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Does every Windows app receive an age check today?", answer: "No. The Windows Age APIs are available to Windows Insiders, and app developers must choose whether and how to use the signal." },
  { question: "Does an app receive the account’s full birth date?", answer: "Microsoft says the API can supply a limited age category or verification status without the full date of birth." },
  { question: "Do Microsoft’s announcements prove safer outcomes?", answer: "No. The sources establish product changes and company claims; they do not measure whether harm fell." }
];
contract.representativeProofPlan = {
  highestRisk: "The story could collapse three different product layers into a false claim that Microsoft now verifies every Windows user’s age everywhere.",
  plannedProof: "Use one ordinary screen-time request to contrast current Family Safety controls with the preview age signal an app may use, then state what Microsoft and independent reporting do not establish.",
  acceptanceOutcome: "A reader can name one current control, explain the account-to-age-signal-to-app chain and identify the Insider-only boundary."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
