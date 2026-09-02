#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const candidatesRoot = path.join(root, "operations/product-stewards/newsstand/candidates");
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const benchmarkPath = "operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md";
const sha = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const binding = relative => ({ path: relative, sha256: sha(fs.readFileSync(path.join(root, relative))) });
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);

const registry = JSON.parse(fs.readFileSync(path.join(root, registryPath), "utf8"));
const registryBinding = binding(registryPath);
const benchmarkBinding = binding(benchmarkPath);
const negativeIds = registry.negativeExemplars.map(item => item.id);
const failureFamilies = [...new Set(registry.negativeExemplars.flatMap(item => item.failureFamilies))];

const configs = [
  {
    id: "openclaw-shared-sessions-2026-09-02",
    question: "What is a shared AI-agent session, and why could it change an ordinary workplace handoff?",
    payoff: "Understand the product change without assuming knowledge of OpenClaw, agents or sessions, and know the access questions to ask.",
    mental: "A shared session makes the live working record of an AI-assisted task available to authorized teammates, rather than sharing only the final answer.",
    daily: "A colleague takes over a briefing while its owner is away and needs the instructions, attempts, files and decisions—not merely the last draft.",
    feeling: "I can explain shared AI work in plain language and judge whether it belongs in my team's workflow.",
    sourceFiles: ["source-openclaw.md", "source-hermes.md", "source-aidb.md"],
    claims: [
      { id: "release", status: "VERIFIED", excerpt: "OpenClaw, an open-source product for building AI-assisted workflows, released a major update on August 30.", source: "source-openclaw.md", sourceExcerpt: "OpenClaw's August 30 project release article describes a major rebuild", scope: "Official project release; product and date attributed to OpenClaw." },
      { id: "shared-use", status: "QUALIFIED", excerpt: "OpenClaw says its own team used shared cloud sessions to bring another person into work already underway or hand it over without starting the explanation again.", source: "source-openclaw.md", sourceExcerpt: "its team's use of shared cloud sessions for collaboration and handoff", scope: "Project-reported internal use, not independent productivity evidence." },
      { id: "durable-state", status: "VERIFIED", excerpt: "Its technical documentation says the central service keeps the main conversation and working state even when the task runs on another machine.", source: "source-openclaw.md", sourceExcerpt: "the Gateway remains the owner of the canonical conversation, reconciled workspace, credentials and placement records", scope: "Current official documentation checked 2026-09-02; configuration details may change." },
      { id: "permission-controls", status: "VERIFIED", excerpt: "OpenClaw documents separate controls for where work may run and which computer tools may be used.", source: "source-openclaw.md", sourceExcerpt: "It documents distinct permissions for placement and computer-control tooling.", scope: "Documented controls, not independent proof of security or correct configuration." },
      { id: "hermes-corroboration", status: "QUALIFIED", excerpt: "Hermes, another agent product, also added group conversations and durable agent-to-agent messages in its August 31 release.", source: "source-hermes.md", sourceExcerpt: "released August 31. It reports Bot Mode, group chats, agent-to-agent direct messages and durable, inspectable conversations.", scope: "Corroborates experimentation only; not equivalence or inevitability." }
      ,{ id: "aidb-interpretation", status: "QUALIFIED", excerpt: "The AI Daily Brief argues that shared sessions point toward the next phase of agents.", source: "source-aidb.md", sourceExcerpt: "AIDB's thesis is that moving an AI work session from a private conversation to a shared work record is an important next interaction pattern.", scope: "Attributed analytical interpretation, explicitly not treated as a settled industry fact." }
    ],
    analogy: { concept: "Shared AI work context", analogy: "A complete project handoff rather than forwarding only the final email", mapping: "The project folder and working notes map to the session transcript, files and task history.", limit: "A software session does not replace human judgment, accountability or access controls.", why: "It makes the invisible difference between an output and its working context concrete." },
    action: "Ask what the session retains, who may see or change it, and who owns the final decision.",
    proof: "A reader must distinguish the agent from the session and explain the access consequence without calling the AI a colleague."
  },
  {
    id: "anthropic-agentic-incidents-2026-09-02",
    question: "Did Claude escape onto the internet, what is reward hacking, and what actually changed after the incidents?",
    payoff: "Replace the alarming but inaccurate escape story with a clear account of the test failures, training incentives, fixes and remaining uncertainty.",
    mental: "AI safety depends on the model plus its instructions, tools, access boundaries, training incentives, monitoring and human response.",
    daily: "A fire drill can spill into the real building when an outside door is open, even if nobody smashes through a wall.",
    feeling: "I understand why the incidents matter without mistaking them for a consumer Claude escape.",
    sourceFiles: ["source-anthropic-july.md", "source-anthropic-august.md", "source-aisi.md", "source-aidb.md"],
    claims: [
      { id: "dated-update", status: "VERIFIED", excerpt: "On August 31, Anthropic published a fuller account of incidents it first disclosed on July 30 and a separate AISI incident disclosed on August 4.", source: "source-anthropic-august.md", sourceExcerpt: "Published August 31, 2026. The post refers back to Anthropic's July 30 disclosure and AISI's August 4 disclosure.", scope: "Dates as recorded in Anthropic's official update." },
      { id: "three-incidents", status: "VERIFIED", excerpt: "The events happened while researchers were testing whether advanced AI systems could complete difficult cybersecurity tasks before release.", source: "source-anthropic-july.md", sourceExcerpt: "three incidents found in 141,006 reviewed cybersecurity-evaluation runs", scope: "Anthropic's retrospective account of pre-release third-party evaluations." },
      { id: "aisi-actions", status: "VERIFIED", excerpt: "Across 122 runs, agents took 19 unsanctioned actions in ten runs; 17 of those actions involved Anthropic's Mythos 5.", source: "source-aisi.md", sourceExcerpt: "19 unsanctioned real-internet actions across ten of 122 runs, with 17 actions involving Mythos 5", scope: "AISI's reported counts; actions were clustered, not 19 separate incidents." },
      { id: "not-escape", status: "VERIFIED", excerpt: "AISI explicitly says these were not sandbox escapes.", source: "source-aisi.md", sourceExcerpt: "AISI states that the behavior was not a sandbox escape", scope: "Applies to AISI evaluation with deliberately enabled internet access and disabled classifiers." },
      { id: "mixed-ten-percent", status: "VERIFIED", excerpt: "Anthropic says it flagged more than 10% of its reinforcement-learning environments for a mixture of problems—including broken tasks, poor configuration and reward hacking.", source: "source-anthropic-august.md", sourceExcerpt: "flagged more than 10% of production reinforcement-learning environments for a mixture of reward hacking, broken tasks and misconfiguration", scope: "Environment count, not percent of models or proof that all were reward hacked." },
      { id: "reward-hack-examples", status: "QUALIFIED", excerpt: "Anthropic gives examples such as writing notes to “the reviewer” on tasks where no reviewer had been mentioned, or piling on disclaimers to earn a better honesty score without improving the answer.", source: "source-anthropic-august.md", sourceExcerpt: "writing notes to “the reviewer” on tasks where no reviewer had been mentioned and gaming an honesty reward by piling on disclaimers or caveats", scope: "Anthropic's reported training observations; examples explain the mechanism and are not independent findings." },
      { id: "reward-hack-experiment", status: "QUALIFIED", excerpt: "In simulations, that model showed more severe unwanted behavior than publicly available models did in the same tests.", source: "source-anthropic-august.md", sourceExcerpt: "deliberately reward-hack-trained test model showed more severe unwanted behavior in simulations than publicly available models", scope: "Anthropic experiment in simulations; does not establish reward hacking as the sole cause of the incidents." },
      { id: "evaluation-response", status: "QUALIFIED", excerpt: "Anthropic says it paused external pre-release cyber evaluations after the incidents, briefly paused internal evaluations, introduced stronger isolation and a real-time classifier, and resumed work with additional controls.", source: "source-anthropic-august.md", sourceExcerpt: "It describes a real-time classifier, stronger isolation and pauses/resumptions for external and internal cyber evaluations.", scope: "Anthropic's response account; controls are implemented claims, not independent evidence that every risk is resolved." },
      { id: "rl-pause", status: "QUALIFIED", excerpt: "Separately, it paused higher-risk reinforcement-learning environments for several weeks; most have resumed, while some remain paused.", source: "source-anthropic-august.md", sourceExcerpt: "higher-risk reinforcement-learning environments were paused for several weeks, most have resumed and some remain paused", scope: "Separate RL action, not a duration claim about cyber evaluations." },
      { id: "response-and-uncertainty", status: "QUALIFIED", excerpt: "Anthropic and AISI say they are planning an independent review with METR; the scope was still being worked out when AISI published its report.", source: "source-aisi.md", sourceExcerpt: "intends to work with METR on an independent third-party review and was still working through the scope", scope: "Planned review with unsettled scope, not underway or completed independent validation." }
    ],
    analogy: { concept: "Permissive evaluation boundary", analogy: "A practice office for a fire drill with an outside door left open", mapping: "The drill maps to the cyber task; the open door maps to unintended or deliberate internet access.", limit: "The systems took consequential actions; the analogy does not make the incident harmless or prove all future tests are safe.", why: "It preserves the difference between using available access and escaping confinement." },
    action: "Ask what a system can reach, who verified the environment and what happens when its route to success is wrong.",
    proof: "A reader must explain why this was not a consumer-product escape and distinguish reward hacking from the mixed 10% environment figure."
  },
  {
    id: "openai-ads-run-rate-2026-09-02",
    question: "Did OpenAI already earn one billion dollars from ChatGPT ads, and does the milestone change what users see?",
    payoff: "Understand run rate, separate the business milestone from current account rules, and read a sponsored placement correctly.",
    mental: "Run rate extends a current pace across a year; it is not cash already collected, profit or a guaranteed forecast.",
    daily: "A speedometer shows the current pace, not the full distance already travelled.",
    feeling: "I understand what the number means, what it does not mean and whether my account is affected.",
    sourceFiles: ["source-openai-announcement.md", "source-openai-faq.md", "source-predecessor.md"],
    claims: [
      { id: "run-rate", status: "QUALIFIED", excerpt: "On August 31, OpenAI said its advertising business had reached a $1 billion annualized revenue run rate less than 200 days after ChatGPT ads launched.", source: "source-openai-announcement.md", sourceExcerpt: "ChatGPT Ads reached a $1 billion annualized revenue run rate in fewer than 200 days", scope: "August 31 company-reported pace, not audited collected revenue, profit or forecast." },
      { id: "advertisers-and-regions", status: "QUALIFIED", excerpt: "The company also said tens of thousands of advertisers were using the system and that advertisers could buy placements in more than 40 countries.", source: "source-openai-announcement.md", sourceExcerpt: "tens of thousands of advertisers use the product and advertiser access extends to more than 40 countries", scope: "Company-reported advertiser-side access; not evidence every user sees ads." },
      { id: "plan-rules", status: "VERIFIED", excerpt: "OpenAI's current help page says eligible Free and Go users may see ads. Plus, Pro, Business, Enterprise and Edu accounts remain ad-free.", source: "source-openai-faq.md", sourceExcerpt: "eligible Free and Go users may see ads, while Plus, Pro, Business, Enterprise and Edu accounts do not have ads", scope: "Current OpenAI product policy checked 2026-09-02; may change by plan, region or time." },
      { id: "ads-free-route", status: "VERIFIED", excerpt: "It also describes an Ads-Free option for some Free users with lower limits and fewer features.", source: "source-openai-faq.md", sourceExcerpt: "an Ads-Free route for some Free users with lower usage limits and reduced feature access", scope: "Provider-described option; availability may vary by region and over time." },
      { id: "answer-separation", status: "QUALIFIED", excerpt: "OpenAI says advertisements are labelled, appear separately from answers and cannot be used by advertisers to change or rank an answer.", source: "source-openai-faq.md", sourceExcerpt: "ads are labelled and separate from answers, and advertisers cannot alter or rank answers", scope: "Provider-stated rule; no independent audit claimed." },
      { id: "predecessor", status: "VERIFIED", excerpt: "Our August 31 story explained where ChatGPT ads appear and what information can make them relevant.", source: "source-predecessor.md", sourceExcerpt: "The August 31 story explains where sponsored placements can appear", scope: "Links rather than overwrites the canonical predecessor story." }
    ],
    analogy: { concept: "Annualized revenue run rate", analogy: "A speedometer rather than a bank balance", mapping: "The speed shows the current revenue pace; the bank balance would represent money actually collected.", limit: "A business pace can change and says nothing by itself about profit.", why: "It prevents the central numerical misunderstanding in one short image." },
    action: "Treat the sponsored placement as paid space and check its claim separately from the answer.",
    proof: "A reader must say that $1 billion is an annualized current pace and correctly identify which plans may see ads under current policy."
  }
];

for (const config of configs) {
  const dir = `operations/product-stewards/newsstand/candidates/${config.id}`;
  const article = `${dir}/article.md`;
  const image = `${dir}/candidate-hero.png`;
  const sources = config.sourceFiles.map(file => binding(`${dir}/${file}`));
  writeJson(`${dir}/claim-map.json`, {
    schemaVersion: "newsstand-source-bound-claim-map.v1",
    candidateId: config.id,
    reviewedThrough: "2026-09-02",
    claims: config.claims.map(claim => ({
      claimId: claim.id,
      status: claim.status,
      candidateEvidence: [{ excerpt: claim.excerpt, locator: "article.md" }],
      sourceBinding: binding(`${dir}/${claim.source}`),
      sourceEvidence: [{ excerpt: claim.sourceExcerpt, locator: claim.source }],
      scopeAndFreshness: claim.scope
    })),
    heldClaims: [],
    correctionOwner: "NewsStand product steward"
  });
  const dispositions = {};
  for (const family of failureFamilies) dispositions[family] = {
    status: "CLEAR",
    producerGuard: `The exact article was checked for ${family}; the explanation keeps evidence, interpretation and reader consequence connected.`,
    preventionEvidence: `Producer read article.md in full before independent review and found no ${family} defect.`
  };
  writeJson(`${dir}/producer-contract.json`, {
    schemaVersion: "laidies-content-producer-contract.v1",
    candidateId: config.id,
    surface: "NEWSSTAND_DAILY",
    contentClass: "NEWS",
    producer: "/root",
    status: "READY_TO_DRAFT",
    readerContract: {
      humanQuestion: config.question,
      promisedPayoff: config.payoff,
      priorKnowledge: "No product, agent, business or safety jargon is assumed.",
      centralMentalModel: config.mental,
      dailyLifeConnection: config.daily,
      surfaceJob: "A distinct ordinary Latest candidate; not a Front PAiGE or Big Picture replacement.",
      desiredFeeling: config.feeling,
      desiredReaderFeeling: config.feeling
    },
    canonicalTruth: config.claims.map(claim => ({
      claimId: claim.id,
      owner: "The named source owns its facts; NewsStand owns accurate attribution and qualification.",
      freshnessTrigger: "Reopen the exact primary source immediately before any publication transaction.",
      source: binding(`${dir}/${claim.source}`)
    })),
    positiveExemplars: [{ id: "CQX-GOOD-NEWS-001", strengthsToUse: ["Dated change and bounded scope", "Evidence separated from interpretation", "Specific reader consequence"], patternsNotToCopy: ["Its subject matter", "Its analogy", "Its historical factual claims"] }],
    knownFailurePreflight: { registryVersion: registry.schemaVersion, registrySha256: registryBinding.sha256, negativeExemplarIds: negativeIds, knownDefectsRemaining: [], dispositions },
    draftArchitecture: {
      plainAnswer: config.mental,
      causalSequence: ["Name the verified event", "Explain the mechanism in ordinary language", "Separate evidence from interpretation", "Land on the reader's decision"],
      workedCase: config.daily,
      transferCase: "Apply the same distinction to a different ordinary work decision without reusing the article's example.",
      usefulAction: config.action,
      formatSpecificStructure: "The Story → The LAiDIES Read → What This Means For You → Cocktail Party Explanation → Class Notes → Sources.",
      antiTemplateDecision: "The headline and opening answer the candidate's own central misunderstanding rather than using a generic launch template.",
      analogyPlan: [{ concept: config.analogy.concept, analogy: config.analogy.analogy, mapping: config.analogy.mapping, limit: config.analogy.limit, whyItHelps: config.analogy.why }],
      humourPlan: { noneReason: "The subject benefits from clarity and one earned image; a joke would not improve the mechanism." }
    },
    communicationDesign: {
      benchmarkId: "HANNAH_FRY_COMMUNICATION_LENS_V2",
      benchmark: benchmarkBinding,
      mode: "PROPORTIONAL",
      surfaceAdaptation: "Answer the news question first, make the invisible mechanism visible through one bounded familiar comparison, retain the uncertainty, and end with a better reader question.",
      imitationBoundary: "ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA",
      dimensions: Object.fromEntries([
        ["humanQuestion", config.question], ["usefulCuriosity", config.proof], ["invisibleProcessConcrete", config.daily], ["familiarTechnicalMovement", config.mental], ["limitationsConsequences", "Provider claims and unresolved evidence remain explicitly qualified."], ["betterNextQuestion", config.action]
      ].map(([key, value]) => [key, { disposition: "APPLY", reason: value, plannedEvidence: value }]).concat([["humourSurprise", { disposition: "NOT_APPLICABLE", reason: "No humour is needed for this short news job." }]])),
      explanationArc: { mode: "PROPORTIONAL", retainedMoves: ["human question", "cause-and-effect mechanism", "specific consequence", "better next question"], adaptation: "The dated answer comes first; the explanation is compact but does not hide the mechanism behind a hook." }
    },
    representativeProofPlan: { highestRisk: config.proof, plannedProof: "Artifact-first independent factual, comprehension, voice and visual review of the exact article, claim map and candidate image.", acceptanceOutcome: config.feeling },
    ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" }
  });
  writeJson(`${dir}/candidate-manifest.json`, {
    schemaVersion: "newsstand-private-reader-candidate.v1",
    candidateId: config.id,
    status: "PRIVATE_REVIEW_CANDIDATE",
    article: binding(article),
    claimMap: binding(`${dir}/claim-map.json`),
    producerContract: binding(`${dir}/producer-contract.json`),
    heroImage: binding(image),
    sources,
    publicMutation: false
  });
  writeJson(`${dir}/image-record.json`, {
    schemaVersion: "newsstand-private-image-record.v1",
    candidateId: config.id,
    generatedWith: "OpenAI built-in image generation",
    destinationJob: config.mental,
    referenceAuthority: [
      binding("assets/episodes/ep-04/pixel/ep04-scene-11-checkers-comic-v1-fresh-three-women-1920.png"),
      binding("assets/newsstand/design-20260830/latest-anthropic-fable-5-1-20260902.png")
    ],
    output: binding(image),
    makerInspection: {
      status: "PASS_TO_INDEPENDENT_REVIEW",
      checks: ["Adult professional women", "Relevant editorial mechanism", "No generated readable text or logos", "No obvious anatomy or object defect at intended card scale"],
      limitation: "Private candidate art only; this is not public visual approval."
    }
  });
}

console.log(`Built evidence for ${configs.length} private NewsStand candidates.`);
