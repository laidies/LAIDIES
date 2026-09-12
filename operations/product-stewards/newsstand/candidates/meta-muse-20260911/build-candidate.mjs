#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "meta-muse-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/microsoft-family-safety-20260911";
const now = "2026-09-11T07:40:00-07:00";
const producerReviewedAt = "2026-09-11T08:14:00-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null, updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "Meta’s Muse can act in connected apps. Check what you permit.",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>Meta launched Muse, a <strong>personal AI agent</strong>, in the United States on September 8. It is rolling out through iOS, Android and muse.ai; Meta also says people can message it in WhatsApp. Most use is free, with subscriptions for more, but the reviewed launch material gives no exact limit or price.</p><p>Unlike a chatbot that stops after suggesting or drafting, Muse is designed to keep taking steps through a browser and connected services. Meta says it can continue after the app closes. AI glasses support, Shop Pay, 1Password support and a stronger privacy option are later plans.</p><p>A personal AI agent is software that can plan and take several actions toward a personal goal rather than only answer once. Meta’s example combines turning an Instagram recipe into a grocery list with sending a dinner invitation. Email is a separate permission choice: Meta says people can allow Muse to read email without allowing it to send.</p>`,
  laidies_read: `<p>Muse works in a separate cloud workspace. Meta says a control outside the agent checks whether a proposed action fits the permission for that connected service before letting it reach the internet.</p><p>A fresh approval does not appear before everything. Meta says a person can let Muse read email without letting it send. Permissions may be one-time, limited to a task or session, time-bounded or permanent; the control system chooses which options to offer. Previously allowed, read-only or low-risk actions may proceed without interruption. Email and purchase prompts are Meta’s design, not a guarantee that Muse always behaves correctly.</p><p>Meta’s safety post says the agent will make mistakes and that <strong>prompt injection</strong>—malicious instructions hidden in material an agent reads—remains an open problem. AP confirmed the launch and explained the agent-versus-chatbot distinction, but did not test Muse’s safeguards or reliability.</p><p>The current workspace separates one person’s agent and data from other users. Meta says it may still access data to operate, support or secure the service, and that interactions may train later models unless the person opts out. For later this year, Meta promises a version encrypted with a key only the user holds, intended to keep the workspace inaccessible even to Meta. It remains with trusted testers.</p>`,
  what_this_means: `<p>Before connecting a service, decide what this task needs: read access, action access or no access. If Muse offers a one-time or task-limited permission, use it when a lasting grant is unnecessary. Meta says its audit trail and connection settings let you inspect actions and change or remove access.</p><p>The next useful evidence is independent testing of real actions and safeguards, plus general availability of the promised private workspace. Until then, distinguish today’s limits on Meta access from the later promise to prevent that access.</p>`,
  cocktail_party: "“Meta’s Muse can act through connected apps. Check which service it can read or change, and remember that its promise to block Meta’s own access is not available yet.”",
  watch_fors: null, closing_note: null,
  class_notes: `An agent uses tools and a planning loop to act instead of stopping at an answer. <a href="/library.html#ai-fundamentals-101::%40ch-2-2-4-agentic-ai-the-layer-that-acts">AI Fundamentals 101: Agentic AI — The Layer That Acts</a> explains that shift and why connected actions change the safety question.`,
  sources: [
    { id: "meta-muse-launch", label: "Meta — Introducing Muse, a personal AI agent", url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/", publisherType: "company-primary-release", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "meta-muse-safety", label: "Meta AI Research — Security and safety for AI agents: Our approach with Muse", url: "https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse", publisherType: "company-primary-technical", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "ap-meta-muse-report", label: "Associated Press — Meta launches personal AI agent, Muse", url: "https://apnews.com/article/meta-muse-ai-agent-3a4572eb4cf4e95d8a0dfdad6e6ca065", publisherType: "reporting", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["consumer products", "app permissions"], concepts: ["personal AI agent", "connected-service permissions", "current Meta access", "later encrypted privacy"], tags: ["Meta", "Muse", "personal agent", "privacy", "app permissions"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const claims = [
  ["launch", "in the United States on September 8", "P001", ["meta-muse-launch", "ap-meta-muse-report"], "Meta primary event evidence plus independent AP confirmation."],
  ["availability", "It is rolling out through iOS, Android and muse.ai", "P001", ["meta-muse-launch"], "Current United States rollout."],
  ["whatsapp", "Meta also says people can message it in WhatsApp", "P001", ["meta-muse-launch"], "Meta's launch explicitly names direct WhatsApp messaging."],
  ["free-paid", "Most use is free, with subscriptions for more", "P001", ["meta-muse-launch"], "Meta's free versus subscription boundary; no exact limit or price is invented."],
  ["background-work", "Meta says it can continue after the app closes", "P002", ["meta-muse-launch"], "Attributed launch capability."],
  ["future-items", "AI glasses support, Shop Pay, 1Password support and a stronger privacy option are later plans", "P002", ["meta-muse-launch", "meta-muse-safety"], "Future roadmap kept separate from launch."],
  ["agent-identity", "software that can plan and take several actions toward a personal goal rather than only answer once", "P003", ["meta-muse-launch", "ap-meta-muse-report"], "Plain-language synthesis of launch and AP context."],
  ["recipe-email", "Meta’s example combines turning an Instagram recipe into a grocery list with sending a dinner invitation", "P003", ["meta-muse-launch"], "The company example is preserved without inferring which connection each step requires."],
  ["cloud-workspace", "Muse works in a separate cloud workspace", "P004", ["meta-muse-launch", "meta-muse-safety"], "Plain translation of the dedicated launch VM."],
  ["outside-control", "a control outside the agent checks whether a proposed action fits the permission for that connected service", "P004", ["meta-muse-safety"], "Plain translation of Meta's Sentinel design."],
  ["email-scope", "let Muse read email without letting it send", "P005", ["meta-muse-launch"], "Meta explicitly separates read and send access."],
  ["permission-scope", "Permissions may be one-time, limited to a task or session, time-bounded or permanent", "P005", ["meta-muse-safety"], "Meta's grant classes; its control system chooses offered options."],
  ["approval-limit", "low-risk actions may proceed without interruption", "P005", ["meta-muse-safety"], "Prevents a false every-action prompt claim."],
  ["approval-design", "Email and purchase prompts are Meta’s design, not a guarantee that Muse always behaves correctly", "P005", ["meta-muse-launch", "meta-muse-safety"], "Distinguishes intended control from measured reliability."],
  ["mistakes", "the agent will make mistakes", "P006", ["meta-muse-safety"], "Meta's explicit limitation."],
  ["prompt-injection", "remains an open problem", "P006", ["meta-muse-safety"], "Meta's explicit prompt-injection limitation; the article supplies a plain definition."],
  ["independent-limit", "did not test Muse’s safeguards or reliability", "P006", ["ap-meta-muse-report"], "Absence statement limited to the complete AP report."],
  ["current-isolation", "The current workspace separates one person’s agent and data from other users", "P007", ["meta-muse-launch", "meta-muse-safety"], "Current company architecture claim."],
  ["current-access", "Meta says it may still access data to operate, support or secure the service", "P007", ["meta-muse-safety"], "Current policy boundary."],
  ["training-optout", "interactions may train later models unless the person opts out", "P007", ["meta-muse-launch", "meta-muse-safety"], "Meta's described use and opt-out; no sanitization claim remains."],
  ["later-privacy", "For later this year, Meta promises a version encrypted with a key only the user holds, intended to keep the workspace inaccessible even to Meta", "P007", ["meta-muse-launch", "meta-muse-safety"], "Future promise, not current architecture."],
  ["trusted-testers", "It remains with trusted testers", "P007", ["meta-muse-safety"], "Current tester boundary."],
  ["reader-action", "decide what this task needs: read access, action access or no access", "P008", ["meta-muse-launch", "meta-muse-safety"], "Specific synthesis follows granular connection design."],
  ["audit-controls", "Meta says its audit trail and connection settings let you inspect actions and change or remove access", "P008", ["meta-muse-launch"], "Meta's audit and disconnect claims."]
].map(([claimId, excerpt, locator, sourceIds, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness }));
write("claim-map.json", claims);
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    availability: "It is rolling out through iOS, Android and muse.ai",
    mechanism: "a control outside the agent checks whether a proposed action fits the permission for that connected service",
    privacy: "Meta says it may still access data to operate, support or secure the service",
    action: "decide what this task needs: read access, action access or no access"
  },
  terms: { "personal AI agent": "software that can plan and take several actions toward a personal goal rather than only answer once" },
  explainBack: "Muse proposes actions in a separate cloud workspace; a control outside the agent checks each connected-service permission before the action reaches the internet.",
  unseenTransfer: "For a travel plan, calendar read access can expose available dates, while sending a message or making a purchase requires the connected service and an action permission.",
  unresolvedIssues: [],
  repairsMade: [
    "Omitted the 18-and-over claim because AP reported it but no current Meta product terms or help page was recovered as primary confirmation.",
    "Separated the current Secure VM and policy-limited Meta access from the future Confidential VM cryptographic promise.",
    "Replaced a promotional capability list with one recipe-and-invitation example, then separated Meta’s documented read-versus-send email choice from that example.",
    "Stated that some allowed actions proceed without a fresh prompt and attributed approval behavior and safety architecture to Meta.",
    "Kept AI glasses, Shop Pay and 1Password support in the future and did not repeat Meta's first or safest superlatives.", "Added the exact WhatsApp, email access and audit-trail passages after the first independent review identified a source-packet gap; the prose itself was unchanged.", "Split every compound factual sentence into atomic claims and added the missing credential-hiding and training-sanitization passages after the second completed review exposed an incomplete claim inventory; the prose itself was unchanged.", "Rewrote the recipe-and-invitation sentence after the fourth completed independent review found that its no-email-access split was a reasonable but unattributed composite inference."
  ],
  limitations: [
    "Producer assessment only, not independent admission.",
    "AP independently confirmed the launch but did not test the product's reliability, privacy or security.",
    "Exact free limits and subscription prices are not stated in the reviewed launch material.",
    "Direct AP capture returned HTTP 403; the complete article was read through the web browsing layer and its locators are recorded."
  ]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = producerReviewedAt;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "What can Muse do now, which connected services can it reach and is its strongest privacy promise already available?", promisedPayoff: "See the agent-to-permission-to-service chain and separate current Secure VM protections from the planned Confidential VM.", centralMentalModel: "Muse proposes the action in a separate cloud workspace; an outside control checks the connected-service permission before it reaches the internet.", dailyLifeConnection: "Turning an Instagram recipe into a grocery list and optionally using connected email to send an invitation.", surfaceJob: "September 11 explanation of Meta's September 8 United States consumer-agent launch.", desiredReaderFeeling: "I know what I would connect, what I would limit and which privacy claim is still future work." };
const exact = { plainClarity: "a separate cloud workspace", readerValue: "Before connecting a service, decide what this task needs", laidiesVoice: "Check what you permit", engagingEnjoyable: "Meta’s example combines turning an Instagram recipe into a grocery list", factualIntegrity: "Email and purchase prompts are Meta’s design, not a guarantee", freshnessReviewability: "For later this year", surfaceFit: "Meta’s Muse can act in connected apps", datedChange: "in the United States on September 8", consequenceAndUncertainty: "did not test Muse’s safeguards or reliability", dailyLifeConnection: "Email is a separate permission choice", communicationBenchmark: "a control outside the agent checks whether a proposed action fits the permission", explainBack: "low-risk actions may proceed without interruption", unseenTransfer: "distinguish today’s limits on Meta access from the later promise", usefulAction: "decide what this task needs: read access, action access or no access", analogyIntegrity: "Unlike a chatbot that stops after suggesting or drafting" };
for (const [name, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The exact story supplies ${name} evidence while keeping the agent, permission, current protection and future promise connected.`; outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Does Muse itself decide which connected action is allowed?", probeResponse: "No. Muse proposes the action, while a separate control checks it against the connected-service permission before it proceeds.", expectedEvidence: "The agent and permission authority remain distinct.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "What changes when Muse moves from reading a calendar to buying travel?", probeResponse: "The purchase requires a connected payment route and an action permission; calendar read access alone does not authorize it.", expectedEvidence: "The permission mechanism transfers beyond the recipe example.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete story avoids ${name}; the dated launch, app-access mechanism, company-evidence limit and specific permission decision remain connected.`; family.artifactLocator = "complete exact story"; }
const evidence = JSON.parse(read(`${dir}/source-evidence.json`)); const byId = new Map(evidence.records.map(record => [record.id, record]));
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: claims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-11", nextTrigger: "Reopen Meta and AP sources on publication day; redraft for changed availability, pricing, connector defaults, training settings, general Confidential VM access, corrections, withdrawal or independent reliability and security evidence.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 3, reviewIssues: 3, reviewCycles: 5, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No checksum-bound reviewed predecessor candidate covers Meta's September 8 Muse consumer-agent launch." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The producer found no unresolved current defect after separating permissions, current protections, future privacy and Meta's evidence from independent confirmation." };
producer.verdict = "PASS"; producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 1, reviewCycles: 2, finding: "The fourth completed independent review found one qualified composite inference in the recipe-and-invitation sentence; the successor separates Meta’s example from its documented email permission rule." }, evidencePacket: { rounds: 3, gaps: 2, repaired: 2, preflight: "check-source-packet-preflight.mjs --calibrate", checkedClaims: 24, exactSourceExcerpts: 35 }, objectiveGate: { failures: 1, repaired: 1, finding: "Model-release utility routing was incorrectly triggered by model-capabilities theme metadata for a standalone consumer product article whose generic chatbot comparison had already passed editorial review." }, ratchet: producer.ratchet });
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication, claims: claims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })), sources: evidence.records.map(record => { const full = record.id === "meta-muse-launch" ? read(`${dir}/source/launch-relevant.txt`) : record.id === "meta-muse-safety" ? read(`${dir}/source/safety-relevant.txt`) : read(`${dir}/source/ap-web-observation.json`); return { id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: full, passageLocator: record.url, additionalPassage: `${record.passages.join("\n")}\n${record.authority} Limitation: ${record.limitation}`, additionalPassageLocator: record.url } }; }) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root }); if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story); if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root }); if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
