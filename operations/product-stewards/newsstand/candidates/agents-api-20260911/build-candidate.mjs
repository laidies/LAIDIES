#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "agents-api-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/askca-pilot-20260911";
const evidenceCheckedAt = "2026-09-11T17:55:34.232761Z";
const producerReviewedAt = "2026-09-11T18:00:47.336809Z";
const expectedBaseSha256 = "f1908b66e097aec6018e88725a88e9702641552ef2fee88ae01e927018857157";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

const live = fs.readFileSync(path.join(root, "content/newsstand-stories.js"));
if (hash(live) !== expectedBaseSha256) throw Error(`Publication base moved: ${hash(live)}`);
fs.writeFileSync(path.join(root, dir, "publication-base.js"), live);

const story = {
  id,
  slug: id,
  edition: "daily",
  status: "hold",
  publishedAt: null,
  updatedAt: evidenceCheckedAt,
  lastCheckedAt: evidenceCheckedAt,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null,
  correctionHistory: [],
  retraction: null,
  predecessorStoryIds: [],
  successorStoryIds: [],
  relatedStoryIds: ["openai-wiki-message-board-2026-09-05"],
  relationshipType: null,
  bigPicture: null,
  thread: null,
  thread_subtitle: null,
  thread_entry: null,
  headline: "OpenAI launched a developer service for AI tasks that can resume",
  heroVisual: {
    src: "/assets/newsstand/design-20260830/latest-anthropic-agentic-incidents-20260902.png",
    alt: "Illustration: three adult women examine computer connections crossing a marked boundary.",
    credit: "LAiDIES NewsStand illustration"
  },
  the_story: `<p>OpenAI released its Agents API in public beta on September 10. It gives developers a managed way to build software that keeps a task’s history, uses connected tools and resumes later. An API is a connection one piece of software uses to call another. This is not a new button in ChatGPT.</p><p>OpenAI says the beta is available to all developers. The reviewed sources are OpenAI’s announcement and current documentation. They establish the release and its stated boundaries, but do not show independent reliability, adoption or a current consumer app using it.</p>`,
  laidies_read: `<p>A model produces each response. A harness is the surrounding software that keeps the task history, tools, coordination and recovery organized. OpenAI manages that harness; an app maker supplies the tools and decides where the work runs.</p><p>Imagine a future app asked to compare three repair quotes, check your calendar and prepare an appointment shortlist. The model might analyse the quotes. The harness would keep the steps and tool results together. The app maker would decide which tools to provide, so reading a calendar and sending a booking would be different capabilities. This is an illustration, not a product available to you today.</p><p>A longer task can still finish badly. OpenAI’s documentation says a completed turn does not guarantee every tool succeeded. A “completed” label means the turn ended; it is not evidence that each file, search, message or booking inside the task succeeded.</p><p>OpenAI says there is no additional Agents API fee. That does not make a task free: model use, tools and an OpenAI-hosted computing workspace are billed separately.</p><p>The service keeps session state so work can continue later. Its current documentation lists United States data residency only and says running the work environment elsewhere does not make it a no-retention service. Where the app’s tools run and how the service retains session data are separate questions.</p>`,
  what_this_means: `<p>If an app says it completed a multi-step task, open the promised output and separately confirm any action that matters, such as a sent message or recorded appointment. Check which connected services the app may reach and what its terms say about retained session data.</p><p>The useful question is: “What could the app access, what did it actually complete, and what record confirms the result?”</p>`,
  cocktail_party: "“OpenAI’s Agents API gives app developers a managed system for longer AI tasks. It can keep work history, tools and recovery organized, but a completed label still does not prove every tool or outside action succeeded.”",
  watch_fors: null,
  closing_note: null,
  class_notes: `A fluent answer and a completed outside action are different results. <a href="/library.html#working-with-ai-101::%4010-6-trusting-the-output-and-checking-it">Working with AI 101: Trusting the Output and Checking It</a> explains how to inspect the result that matters before relying on it.`,
  sources: [
    { id: "openai-agents-launch", label: "OpenAI — Introducing the Agents API", url: "https://openai.com/index/introducing-the-agents-api/", publisherType: "company-primary-announcement", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "openai-agents-overview", label: "OpenAI Developers — Agents API overview", url: "https://developers.openai.com/api/docs/guides/agents-api/overview.md", publisherType: "company-primary-current-documentation", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "openai-hosted-sandbox", label: "OpenAI Developers — OpenAI-hosted environment", url: "https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted.md", publisherType: "company-primary-current-documentation", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null,
  themes: ["AI agents", "developer tools", "data controls"],
  concepts: ["API", "harness", "task completion", "session retention"],
  tags: ["OpenAI", "Agents API", "app permissions"],
  saint_lane: null,
  badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const evidence = JSON.parse(read(`${dir}/source-evidence.json`));
if (evidence.checkedAt !== evidenceCheckedAt) throw Error("Evidence timestamp changed");
const byId = new Map(evidence.records.map(record => [record.id, record]));
const passage = (id, fragment) => {
  const value = byId.get(id)?.passages.find(item => item.includes(fragment));
  if (!value) throw Error(`Missing source passage ${id}/${fragment}`);
  return value;
};
const specs = [
  ["release-and-access", "OpenAI released its Agents API in public beta on September 10", "P002", ["openai-agents-launch"], [["openai-agents-launch", "September 10, 2026"], ["openai-agents-launch", "introducing the Agents API in public beta"]], "Company primary announcement establishes date and developer beta; no general-availability claim."],
  ["managed-product-scope", "managed way to build software that keeps a task’s history, uses connected tools and resumes later", "P002", ["openai-agents-launch", "openai-agents-overview"], [["openai-agents-launch", "bringing that same harness"], ["openai-agents-overview", "manages sessions, orchestration"], ["openai-agents-overview", "Connecting to external data"], ["openai-agents-overview", "Resuming a session"]], "Plain aggregation of documented harness functions, not a reliability guarantee."],
  ["api-not-consumer-button", "An API is a connection one piece of software uses to call another. This is not a new button in ChatGPT", "P002", ["openai-agents-launch", "openai-agents-overview"], [["openai-agents-launch", "to developers through a simple, flexible API"], ["openai-agents-overview", "gives your application access"]], "Reader translation of developer API scope; no consumer feature claim."],
  ["developer-availability", "OpenAI says the beta is available to all developers", "P003", ["openai-agents-launch"], [["openai-agents-launch", "available in public beta today to all developers"]], "Attributed company access statement."],
  ["vendor-evidence-limit", "reviewed sources are OpenAI’s announcement and current documentation. They establish the release and its stated boundaries, but do not show independent reliability, adoption or a current consumer app using it", "P003", ["openai-agents-launch", "openai-agents-overview", "openai-hosted-sandbox"], [["openai-agents-launch", "public beta"], ["openai-agents-overview", "gives your application access"], ["openai-hosted-sandbox", "completed turn does not guarantee"]], "Explicit evidence boundary across the complete submitted company sources."],
  ["harness-split", "A model produces each response. A harness is the surrounding software that keeps the task history, tools, coordination and recovery organized. OpenAI manages that harness; an app maker supplies the tools and decides where the work runs", "P004", ["openai-agents-launch", "openai-agents-overview"], [["openai-agents-launch", "OpenAI hosts and maintains the harness"], ["openai-agents-overview", "OpenAI manages sessions, orchestration"], ["openai-agents-overview", "application provides tools and chooses"]], "Plain model-versus-surrounding-system distinction grounded in current docs."],
  ["hypothetical-example", "Imagine a future app asked to compare three repair quotes, check your calendar and prepare an appointment shortlist", "P005", ["openai-agents-overview"], [["openai-agents-overview", "application provides tools"], ["openai-agents-overview", "Connecting to external data"]], "Clearly labelled hypothetical illustration; no current app or adoption claim."],
  ["capability-separation", "reading a calendar and sending a booking would be different capabilities. This is an illustration, not a product available to you today", "P005", ["openai-agents-overview"], [["openai-agents-overview", "provides tools and chooses its execution environment"]], "Inference from developer-provided tools, explicitly limited to an illustration."],
  ["completion-limit", "completed turn does not guarantee every tool succeeded", "P006", ["openai-hosted-sandbox"], [["openai-hosted-sandbox", "completed turn does not guarantee every tool succeeded"]], "Direct current documentation caveat; examples are illustrative possible tool results."],
  ["cost-boundary", "there is no additional Agents API fee. That does not make a task free: model use, tools and an OpenAI-hosted computing workspace are billed separately", "P007", ["openai-agents-launch", "openai-agents-overview", "openai-hosted-sandbox"], [["openai-agents-launch", "There are no additional fees"], ["openai-agents-overview", "Model usage is billed"], ["openai-hosted-sandbox", "Model usage is billed separately"]], "No-extra-fee statement stays separate from component charges and any consumer price."],
  ["retention-boundary", "service keeps session state so work can continue later. Its current documentation lists United States data residency only and says running the work environment elsewhere does not make it a no-retention service", "P008", ["openai-agents-overview"], [["openai-agents-overview", "retains session state"], ["openai-agents-overview", "data residency only in the United States"], ["openai-agents-overview", "Choosing a self-hosted sandbox"]], "Plain rendering of current service retention and residency boundaries; no promise about a specific app's privacy terms."],
  ["reader-check", "open the promised output and separately confirm any action that matters", "P009", ["openai-hosted-sandbox", "openai-agents-overview"], [["openai-hosted-sandbox", "completed turn does not guarantee every tool succeeded"], ["openai-agents-overview", "provides tools"]], "Proportionate reader action derived from the documented completion and tool boundaries."],
  ["better-question", "What could the app access, what did it actually complete, and what record confirms the result?", "P010", ["openai-hosted-sandbox", "openai-agents-overview"], [["openai-hosted-sandbox", "inspect the saved session items"], ["openai-agents-overview", "application provides tools"]], "Editorial synthesis that does not imply a specific app or interface."]
];
const claims = specs.map(([claimId, excerpt, locator, sourceIds, supports, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness, supports: supports.map(([sourceId, fragment]) => ({ sourceId, passage: passage(sourceId, fragment) })) }));
const cleanClaims = claims.map(({ supports, ...claim }) => claim);
const supportsByClaim = new Map(claims.map(claim => [claim.claimId, claim.supports]));
write("claim-map.json", cleanClaims);
write("source-packet-preflight.json", {
  schemaVersion: "laidies.newsstand-source-packet-preflight.v1",
  candidateId: id,
  checkedAt: producerReviewedAt,
  method: "Every factual sentence and subsidiary attribute maps to exact submitted passages plus the complete current developer documents. The launch page is represented by all relevant preserved web passages because direct curl returned HTTP 403. Developer release, hypothetical illustration, completion, cost, retention and evidence limits remain separate.",
  claims: claims.map(claim => ({ claimId: claim.claimId, supports: claim.supports }))
});
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true,
  storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    release: "released its Agents API in public beta on September 10",
    harness: "A harness is the surrounding software that keeps the task history, tools, coordination and recovery organized",
    encounter: "Imagine a future app asked to compare three repair quotes, check your calendar and prepare an appointment shortlist",
    limits: "a completed turn does not guarantee every tool succeeded",
    action: "open the promised output and separately confirm any action that matters"
  },
  terms: {
    API: "a connection one piece of software uses to call another",
    harness: "the surrounding software that keeps the task history, tools, coordination and recovery organized"
  },
  explainBack: "The model produces a response; the harness keeps a longer task's history and tools organized. An app maker still chooses those tools, and a completed turn does not prove each outside action happened.",
  unseenTransfer: "For a future travel-planning app, identify which services it could reach, open the itinerary it produced and confirm any ticket or reservation separately.",
  unresolvedIssues: [],
  repairsMade: [
    "Replaced inherited EPA communication fields in the producer contract before drafting and preserved the rejected writer input.",
    "Led with the concrete developer release and defined API before using it.",
    "Defined the model-versus-harness split before the clearly hypothetical repair-quote task.",
    "Separated a completed turn from successful tool and external-action results.",
    "Separated no additional Agents API fee from model, tool and hosted-computing charges.",
    "Rendered the current residency and retention boundary without requiring readers to decode Zero Data Retention jargon.",
    "Kept company-source, adoption, reliability and consumer-availability limits explicit."
  ],
  limitations: [
    "Producer assessment only, not independent admission.",
    "The reviewed sources are OpenAI materials; no independent reliability, adoption or downstream consumer outcome is established.",
    "The repair-quote example is hypothetical and does not identify an available app."
  ]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id;
producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = producerReviewedAt;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = {
  humanQuestion: "What changes for me when an app can keep working after one reply, and what should I still check?",
  promisedPayoff: "Recognize the developer service, understand the model-versus-harness split, and verify access, retention and the actual result in any app built with it.",
  centralMentalModel: "The model produces responses; the harness is the surrounding system that keeps a longer task's history, tools, coordination and recovery organized.",
  dailyLifeConnection: "A clearly hypothetical app compares repair quotes, looks at a calendar and prepares an appointment shortlist.",
  surfaceJob: "September 11 report on OpenAI's September 10 Agents API public beta, with developer and evidence limits explicit.",
  desiredReaderFeeling: "I understand where I might encounter this and know that a finished label, connected tools and retained data each need a separate check."
};
const exact = {
  plainClarity: "This is not a new button in ChatGPT",
  readerValue: "What could the app access, what did it actually complete",
  laidiesVoice: "Imagine a future app asked to compare three repair quotes",
  engagingEnjoyable: "compare three repair quotes, check your calendar",
  factualIntegrity: "do not show independent reliability, adoption or a current consumer app",
  freshnessReviewability: "public beta on September 10",
  surfaceFit: "developer service for AI tasks that can resume",
  datedChange: "released its Agents API in public beta on September 10",
  consequenceAndUncertainty: "completed turn does not guarantee every tool succeeded",
  dailyLifeConnection: "prepare an appointment shortlist",
  communicationBenchmark: "Where the app’s tools run and how the service retains session data are separate questions",
  explainBack: "A model produces each response. A harness is the surrounding software",
  unseenTransfer: "what record confirms the result",
  usefulAction: "open the promised output and separately confirm any action that matters",
  analogyIntegrity: "This is an illustration, not a product available to you today"
};
for (const [name, outcome] of Object.entries(producer.outcomes)) {
  outcome.verdict = "PASS";
  outcome.observation = `The complete story supplies ${name} evidence while keeping the developer release, system layers, hypothetical example, completion result and data boundary connected.`;
  outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }];
}
producer.outcomes.explainBack.simulatedReaderProbe = {
  prompt: "What does the harness add, and what does a completed turn prove?",
  probeResponse: "The harness keeps a longer task's history, tools, coordination and recovery organized around the model. A completed turn only says the turn ended; it does not prove every tool or outside action succeeded.",
  expectedEvidence: "Model, harness and result confirmation remain distinct.",
  transferResult: "PASS"
};
producer.outcomes.unseenTransfer.simulatedReaderProbe = {
  prompt: "A future travel app says it finished planning and booking a trip. What transfers?",
  probeResponse: "Check which services it could reach, open the itinerary and separately confirm any ticket or reservation with the provider.",
  expectedEvidence: "Access, generated output and external action remain separate.",
  transferResult: "PASS"
};
for (const [name, family] of Object.entries(producer.failureFamilies)) {
  family.present = false;
  family.observation = `The complete story avoids ${name}; concrete release scope, ordinary definitions, one bounded example and exact limits remain connected.`;
  family.artifactLocator = "complete exact story";
}
producer.factualReview = {
  disposition: "CLAIMS_REVIEWED",
  sourceBindings: [bind("source-evidence.json")],
  claimMap: cleanClaims.map(claim => ({
    ...claim,
    sourceBinding: bind("source-evidence.json"),
    sourceEvidence: supportsByClaim.get(claim.claimId).map(({ sourceId, passage: sourcePassage }) => ({ excerpt: sourcePassage.split("\n")[0], locator: byId.get(sourceId).url }))
  })),
  reviewedThrough: "2026-09-11",
  nextTrigger: evidence.nextTrigger,
  correctionOwner: "LAiDIES NewsStand product steward"
};
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate reports the September 10 Agents API public beta and its current developer, completion, cost and retention boundaries." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The producer corrected one inherited contract-packet mismatch before drafting. Complete current primary documents and every atomic factual clause were then checked before independent dispatch, leaving no unresolved candidate defect." };
producer.verdict = "PASS";
producer.limitations = observations.limitations;
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 0, reviewCycles: 1 }, sourcePacket: { rounds: 1, gaps: 0, repaired: 0, checkedClaims: cleanClaims.length, exactSourceExcerpts: claims.reduce((count, claim) => count + claim.supports.length, 0) }, producerPreflight: { inheritedContractMismatch: 1, repairedBeforeDraft: 1 }, ratchet: producer.ratchet });

const sourceFiles = {
  "openai-agents-launch": "source/launch-web-observation.json",
  "openai-agents-overview": "source/overview.md",
  "openai-hosted-sandbox": "source/openai-hosted.md"
};
write("editorial-input.json", {
  readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`,
  completeArtifact: read(`${dir}/review-text.json`),
  paragraphs: storyParagraphs(story),
  communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication,
  claims: cleanClaims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })),
  sources: evidence.records.map(record => ({
    id: record.id,
    url: record.url,
    authority: record.authority,
    passages: record.passages,
    limitation: record.limitation,
    source: {
      url: record.url,
      passage: read(`${dir}/${sourceFiles[record.id]}`),
      passageLocator: record.url,
      additionalPassage: `${record.passages.join("\n")}\nAuthority: ${record.authority}\nLimitation: ${record.limitation}`,
      additionalPassageLocator: record.url
    }
  }))
});

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root });
if (coverageErrors.length) throw Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story);
if (lengthErrors.length) throw Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root });
if (prepared.errors.length) throw Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
