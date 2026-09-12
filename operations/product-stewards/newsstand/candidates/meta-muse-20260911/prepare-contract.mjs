#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const id = "meta-muse-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const templatePath = "operations/product-stewards/newsstand/candidates/california-chatbot-law-20260910/producer-contract.json";
const evidencePath = `${dir}/source-evidence.json`;
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const contract = JSON.parse(fs.readFileSync(templatePath, "utf8"));

contract.candidateId = id;
contract.readerContract = {
  humanQuestion: "What can Meta's new Muse agent do for me now, which parts of my apps can it reach, and is its strongest privacy promise already available?",
  promisedPayoff: "Recognize the new personal agent, see how a requested action crosses from Muse to a connected service, and separate current permissions and Secure VM protections from the later Confidential VM promise.",
  priorKnowledge: "No knowledge of AI agents, connectors, virtual machines, prompt injection or Meta's developer systems is assumed.",
  centralMentalModel: "Muse proposes steps inside a dedicated cloud computer; a separate control layer checks connector permissions and network requests before an action reaches an outside service.",
  dailyLifeConnection: "A woman may ask Muse to turn an Instagram recipe into a grocery list or use connected email to send an invitation.",
  surfaceJob: "A September 11 NewsStand explanation of Meta's September 8 United States consumer-agent launch and its current versus promised privacy protections.",
  desiredFeeling: "I can tell what Muse can do, what access it needs, what Meta says protects that access and which privacy feature is still future work."
};
contract.canonicalTruth = [{
  claimId: "meta-muse-launch-permissions-and-privacy-boundary",
  owner: "Meta owns the launch, product, architecture, permission and privacy claims; Associated Press owns its independent event and industry context; NewsStand owns the bounded synthesis.",
  source: { path: evidencePath, sha256: hash(fs.readFileSync(evidencePath)) },
  freshnessTrigger: "Reopen Meta and AP sources on publication day; redraft for changed availability, pricing, connector defaults, training settings, general Confidential VM access, corrections, withdrawal or independent reliability and security evidence."
}];
const guard = "Do not repeat Meta's safety superlatives as fact or turn designed approval prompts into guaranteed reliability. Keep current Secure VM protections separate from the future Confidential VM. Label planned AI glasses, Shop Pay and 1Password support as future, omit the unverified age rule, and explain ordinary connector permissions without a promotional lifehack list.";
for (const value of Object.values(contract.knownFailurePreflight.dispositions)) {
  value.producerGuard = guard;
  value.preventionEvidence = "The planned story follows one ordinary recipe-and-invitation task through the agent, connected service and Sentinel permission check, then places Meta's own error admission and current-versus-future privacy boundary beside the claims.";
}
contract.draftArchitecture = {
  plainAnswer: "Meta launched Muse in the United States on September 8 as a personal AI agent that can browse and act through connected services; Meta says a separate control layer governs those actions, but the company also says the agent will make mistakes and its strongest Confidential VM privacy mode is planned for later in 2026.",
  causalSequence: [
    "The person gives Muse a goal and chooses which outside services to connect.",
    "Muse plans and proposes actions inside a dedicated cloud virtual machine.",
    "A separate Sentinel layer checks the connector permission and every network request; some actions can use a prior or narrowly bounded grant, while selected sensitive actions prompt the person.",
    "The current Secure VM isolates data but still allows Meta access needed to operate, support or secure the service.",
    "Meta's promised Confidential VM would block Meta access cryptographically, but it remains limited to trusted testers and is planned for later this year."
  ],
  workedCase: "Muse can turn a recipe saved on Instagram into a grocery list without email access; sending an invitation requires connecting email and granting permission to send.",
  transferCase: "For a travel plan, access to a calendar can reveal available dates, while an actual purchase or message requires the relevant service and action permission.",
  usefulAction: "Before connecting a service, decide whether the task needs read access, action access or no access. Where Muse offers a one-time or bounded grant, use it when a lasting grant is unnecessary.",
  formatSpecificStructure: "The Story; LAiDIES Read; What This Means for You; Cocktail Party; Class Notes.",
  antiTemplateDecision: "Lead with the consumer launch and ordinary app-access consequence, then make the smallest permission mechanism visible. Avoid a vendor feature list, a work-only frame, generalized security advice, superlatives or treating Meta's architecture as independently validated.",
  analogyPlan: [],
  humourPlan: { noneReason: "The recipe-to-invitation permission boundary is memorable without a decorative analogy or joke." },
  readerQuestions: [
    { id: "availability", question: "Where is Muse available now, and what still requires a future rollout?" },
    { id: "mechanism", question: "How does an intended action move from Muse to a connected service?" },
    { id: "privacy", question: "What does today's Secure VM protect, and what would the later Confidential VM add?" },
    { id: "action", question: "What should I decide before giving Muse access to an app?" }
  ],
  requiredTerms: [
    { term: "personal AI agent", meaning: "software that can plan and take several actions toward a personal goal rather than only answer once" },
    { term: "virtual machine", meaning: "a dedicated cloud computer where Muse runs and stores its working data" }
  ],
  presentationPlan: "Reuse the existing approved NewsStand evidence-checking illustration unchanged; do not generate Meta-branded or fictional-user art."
};
contract.communicationDesign.surfaceAdaptation = "Answer the ordinary consumer encounter first, make the agent-to-Sentinel-to-connected-service mechanism visible and keep present protections, future promises and acknowledged failure beside the relevant claims.";
for (const [key, value] of Object.entries(contract.communicationDesign.dimensions)) {
  value.disposition = key === "humourSurprise" ? "NOT_APPLICABLE" : "APPLY";
  value.reason = "Help a beginner distinguish an agent's proposed action, the permission governing the connected service and the privacy boundary around its cloud workspace.";
  value.plannedEvidence = "The exact story uses one recipe-and-invitation task, then transfers the mechanism to calendar access and a travel purchase.";
}
contract.communicationDesign.explanationArc = {
  mode: "PROPORTIONAL",
  retainedMoves: ["dated United States launch", "ordinary app connection", "agent-to-Sentinel permission mechanism", "Meta's error admission", "current-versus-future privacy boundary", "specific access decision"],
  adaptation: "The launch and encounter lead; the permission and privacy mechanism receives the centre; the landing narrows the access decision."
};
contract.communicationDesign.analogyChecks = [];
contract.communicationDesign.discoveryChecks = [
  { question: "Does Muse need access to every app to be useful?", answer: "No. Each connected service is a separate decision, and the task may need read access, action access or no access." },
  { question: "Does Muse ask before every action?", answer: "No. Meta says previously allowed, read-only or low-risk actions may proceed without interruption; Sentinel governs the permission scope." },
  { question: "Can Meta access the data inside today's Secure VM?", answer: "Meta says employee access is restricted by policy, but current operations still permit access needed to support, secure or operate Muse. The cryptographic block is a future Confidential VM claim." }
];
contract.representativeProofPlan = {
  highestRisk: "The story could echo Meta's marketing by presenting approval prompts as guaranteed safety or the later Confidential VM as a launch feature.",
  plannedProof: "Follow one invitation from a saved recipe through separate Instagram and email permissions, then state the current access and future privacy boundary in the same explanation.",
  acceptanceOutcome: "A reader can explain how Muse reaches a connected service, identify one action that may rely on an existing grant and distinguish Secure VM from the planned Confidential VM."
};

fs.writeFileSync(`${dir}/producer-contract.json`, `${JSON.stringify(contract, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ candidateId: id, contractSha256: hash(fs.readFileSync(`${dir}/producer-contract.json`)) }));
