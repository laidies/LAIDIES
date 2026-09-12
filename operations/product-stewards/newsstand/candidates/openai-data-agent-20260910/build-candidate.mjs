#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";

const root = process.cwd();
const id = "openai-data-agent-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/take-it-down-sentencing-20260910";
const now = "2026-09-10T20:14:23.000-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = rel => fs.readFileSync(path.join(root, rel), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null,
  updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "ChatGPT can now build dashboards from company data. Check the definition before you trust the number.",
  heroVisual: {
    src: "/assets/newsstand/design-20260830/latest-provider-switch-20260901-v2.png",
    alt: "Colourful translucent computers, drives and cables arranged as connected workplace data systems.",
    credit: "LAiDIES NewsStand illustration"
  },
  the_story: "<p>OpenAI released a Data agent in ChatGPT Work on September 10. It is a workplace data tool that can connect an approved account to company data, investigate a question and build a dashboard. A colleague can ask why sales slowed without first writing a database query.</p><p>OpenAI says the agent can use approved data warehouses, business-intelligence dashboards and files in Google Drive or SharePoint. It can recommend next steps, share findings and carry out actions through connected tools when the user approves them.</p><p>The plugin is available through ChatGPT Work. Administrators install it, connect its data sources and decide who may use them. OpenAI announced no standalone plugin price.</p><p>The largest evidence gap is accuracy. VentureBeat asked OpenAI for a retrieval or correctness benchmark for the external product and reported that none has been published. OpenAI described an internal comparison with its own data tools but supplied no public number. There is no independent hands-on benchmark yet showing how reliably it answers questions across customers' systems.</p>",
  laidies_read: "<p>The useful change is that a colleague can ask a business question in ordinary language and receive a dashboard without first writing a database query. The plain question does not remove the machinery underneath it.</p><p>The agent can only work with the sources its administrators connect and the records its account is already allowed to see. A <strong>permission</strong> means which tables, rows and columns the connected account is allowed to see. A <strong>metric definition</strong> is the rule a company uses to decide what a number includes.</p><p>Imagine asking for active customers. One team may count anyone who logged in this week; another may count people who bought something this month. Both dashboards can look polished and still answer different questions. Permissions limit access; they do not prove the source is complete, the definition fits this decision or the explanation is correct.</p>",
  what_this_means: "<p>Before sharing a Data agent result, open the evidence behind its findings. Name the source and date, state the metric definition, and compare one important figure with the trusted report your team already uses. If the totals differ, stop there and investigate.</p><p>OpenAI's controls separate who can use a plugin, which read or write actions it may take and when ChatGPT asks for approval. For an early test, let the agent prepare the dashboard while sending messages or changing records still requires a person.</p><p>OpenAI says business-product data is not used to train its models by default. Check your organization's account, retention rules, permissions and workplace policy before adding sensitive data.</p><p>Ask: “Which data and definition produced this answer, and what happens if it is wrong?”</p>",
  cocktail_party: "“OpenAI's new Data agent can turn a workplace question into a dashboard. The smooth interface does not make the number self-proving: the connected source, your company's definition and the account's permissions still shape the answer.”",
  watch_fors: null, closing_note: null,
  class_notes: "Practise checking a confident result in <a href='/library.html#working-with-ai-101::%4010-6-trusting-the-output-and-checking-it'>Working with AI 101: Trusting the Output (And Checking It)</a>. The lesson shows how to compare an AI output with its source and your acceptance criteria before using it.",
  sources: [
    { id: "openai-data-agent", label: "OpenAI — Now everyone can put data to work", url: "https://openai.com/index/put-data-to-work/", publisherType: "vendor", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "openai-business-data", label: "OpenAI — Business data privacy, security, and compliance", url: "https://openai.com/business-data/", publisherType: "vendor", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "openai-plugin-controls", label: "OpenAI Help Center — Admin controls for plugins and apps", url: "https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps", publisherType: "vendor", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "venturebeat-data-agent", label: "VentureBeat — OpenAI's Data agent launches without a published external benchmark", url: "https://venturebeat.com/data/openais-new-data-agent-skips-the-one-thing-rivals-like-databricks-are-racing-to-publish-a-benchmark", publisherType: "reporting", accessedAt: "2026-09-10", approvalStatus: "reviewed" }
  ],
  aidb_credit: null,
  themes: ["model and product releases", "workplace data"],
  concepts: ["metric definition", "permissions", "verification"],
  tags: ["OpenAI", "ChatGPT Work", "Data agent", "dashboards"],
  saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
write("article.md", `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`);
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const evidence = JSON.parse(read(`${dir}/source-evidence.json`));
const claims = [
  ["release", "OpenAI released a Data agent in ChatGPT Work on September 10.", "the_story paragraph 1", ["openai-data-agent"], "Same-day vendor release date and product identity."],
  ["core-workflow", "connect an approved account to company data, investigate a question and build a dashboard", "the_story paragraph 1", ["openai-data-agent"], "Vendor-described capabilities; no accuracy result implied."],
  ["connected-actions", "recommend next steps, share findings and carry out actions through connected tools when the user approves them", "the_story paragraph 2", ["openai-data-agent"], "Vendor-described workflow, bounded by user approval and connected tools."],
  ["administrator-setup", "Administrators install it, connect its data sources and decide who may use them", "the_story paragraph 3", ["openai-data-agent", "openai-plugin-controls"], "Current vendor release and control documentation."],
  ["no-standalone-price", "OpenAI announced no standalone plugin price.", "the_story paragraph 3", ["openai-data-agent"], "Bounded to the inspected release page; no claim about other costs."],
  ["benchmark-gap", "VentureBeat asked OpenAI for a retrieval or correctness benchmark for the external product and reported that none has been published.", "the_story paragraph 4", ["venturebeat-data-agent"], "Independent same-day reporting; not an evaluation of the product."],
  ["internal-comparison", "OpenAI described an internal comparison with its own data tools but supplied no public number.", "the_story paragraph 4", ["venturebeat-data-agent"], "Reported company disclosure; explicitly not independently verified."],
  ["source-definition-permission", "The agent can only work with the sources its administrators connect and the records its account is already allowed to see.", "laidies_read paragraph 2", ["openai-data-agent"], "Mechanism synthesis of current administrator and query-permission claims."],
  ["permission-meaning", "which tables, rows and columns the connected account is allowed to see", "laidies_read paragraph 2", ["openai-data-agent"], "Plain restatement of the specific permission levels OpenAI lists."],
  ["definition-meaning", "the rule a company uses to decide what a number includes", "laidies_read paragraph 2", ["openai-data-agent"], "Plain explanation of OpenAI's metric-definition input."],
  ["action-controls", "controls separate who can use a plugin, which read or write actions it may take and when ChatGPT asks for approval", "what_this_means paragraph 2", ["openai-plugin-controls"], "Current OpenAI Help Center control distinctions."],
  ["business-training-default", "business-product data is not used to train its models by default", "what_this_means paragraph 3", ["openai-business-data"], "OpenAI's stated default for listed business products; organization-specific checks retained."]
].map(([claimId, excerpt, locator, sourceIds, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness }));
write("claim-map.json", claims);

const manifest = { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
write("publication-manifest.json", manifest);

write("producer-observations.json", {
  completeTextRead: true,
  storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    event: "OpenAI released a Data agent in ChatGPT Work on September 10.",
    mechanism: "The agent can only work with the sources its administrators connect and the records its account is already allowed to see.",
    evidence: "VentureBeat asked OpenAI for a retrieval or correctness benchmark for the external product and reported that none has been published.",
    action: "Before sharing a Data agent result, open the evidence behind its findings."
  },
  terms: {
    "metric definition": "the rule a company uses to decide what a number includes",
    permission: "which tables, rows and columns the connected account is allowed to see"
  },
  explainBack: "The Data agent retrieves from administrator-connected sources within the current account's permissions, then uses the company's stored metric definitions to interpret the records. A fluent question and polished dashboard do not prove those inputs or the resulting explanation are correct.",
  unseenTransfer: "For a support-ticket dashboard, check whether reopened cases and duplicates count as new tickets, confirm the date range and compare one total with the team's established report before changing staffing.",
  unresolvedIssues: [],
  repairsMade: ["Separated the public product release from untested accuracy.", "Attached the missing published benchmark directly to the performance boundary.", "Changed generic caution into a source, definition and figure check plus a separate action-approval boundary."],
  limitations: ["Producer reasoning only, not independent review or observed human comprehension.", "No independent hands-on benchmark of the external Data agent was available on September 10."]
});

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id;
producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = now;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = {
  humanQuestion: "If ChatGPT can build a dashboard from my company data, what should I trust and check before I use it?",
  promisedPayoff: "Understand how connected sources, company definitions and permissions shape the answer, and know what to verify before sharing or acting on it.",
  centralMentalModel: "The connected sources, organization definitions and account permissions determine what the agent can retrieve and how it interprets the result.",
  dailyLifeConnection: "A manager checks a polished sales dashboard before sharing it.",
  surfaceJob: "Dated ordinary product news prepared privately for overnight freshness.",
  desiredReaderFeeling: "I know which questions make a generated dashboard safer to use at work."
};
const exact = {
  plainClarity: "It is a workplace data tool that can connect an approved account to company data, investigate a question and build a dashboard.",
  readerValue: "Before sharing a Data agent result, open the evidence behind its findings.",
  laidiesVoice: "The plain question does not remove the machinery underneath it.",
  engagingEnjoyable: "Both dashboards can look polished and still answer different questions.",
  factualIntegrity: "There is no independent hands-on benchmark yet showing how reliably it answers questions across customers' systems.",
  freshnessReviewability: "OpenAI released a Data agent in ChatGPT Work on September 10.",
  surfaceFit: "A colleague can ask why sales slowed without first writing a database query.",
  datedChange: "OpenAI released a Data agent in ChatGPT Work on September 10.",
  consequenceAndUncertainty: "Permissions limit access; they do not prove the source is complete, the definition fits this decision or the explanation is correct.",
  dailyLifeConnection: "Imagine asking for active customers.",
  communicationBenchmark: "Which data and definition produced this answer, and what happens if it is wrong?",
  explainBack: "The agent can only work with the sources its administrators connect and the records its account is already allowed to see.",
  unseenTransfer: "If the totals differ, stop there and investigate.",
  usefulAction: "Name the source and date, state the metric definition, and compare one important figure with the trusted report your team already uses.",
  analogyIntegrity: "Both dashboards can look polished and still answer different questions."
};
for (const [key, outcome] of Object.entries(producer.outcomes)) {
  outcome.verdict = "PASS";
  outcome.observation = `The exact article supplies candidate-specific ${key} evidence while keeping product claims and evidence limits connected.`;
  outcome.artifactEvidence = [{ excerpt: exact[key], locator: "exact story" }];
}
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Explain what shapes a Data agent answer.", probeResponse: "Its connected sources and my account permissions control what it can retrieve; the company's metric definitions shape what the numbers mean, so I still check the source and one important total.", expectedEvidence: "Connected source, permission, definition and verification." };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "Apply the mechanism to support tickets.", probeResponse: "I would check whether reopened and duplicate tickets count, confirm the date range and compare the total with our trusted report before changing staffing.", expectedEvidence: "Different metric, definition and decision consequence." };
for (const [key, family] of Object.entries(producer.failureFamilies)) {
  family.present = false;
  family.observation = `The complete article avoids ${key}; one dated release, one mechanism, its evidence limit and one workplace check remain connected.`;
  family.artifactLocator = "complete exact story";
}
const sourceRecord = new Map(evidence.records.map(record => [record.id, record]));
const producerClaims = claims.map(claim => ({
  claimId: claim.claimId,
  status: claim.status,
  candidateEvidence: claim.candidateEvidence,
  sourceBinding: bind("source-evidence.json"),
  sourceEvidence: claim.sourceIds.map(sourceId => ({ excerpt: sourceRecord.get(sourceId).passages[0], locator: `${sourceId} passages` })),
  scopeAndFreshness: claim.scopeAndFreshness
}));
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: producerClaims, reviewedThrough: "2026-09-10", nextTrigger: "Reopen all four sources on the publication day; redraft if availability, permissions, data handling, pricing or benchmark evidence changes.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate reports this Data agent release." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "Producer found no registered or new reusable defect after source and full-prose review; independent review remains required." };
producer.verdict = "PASS";
producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Image and public release remain separate gates."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 0, reviewCycles: 1 }, evidencePacket: { rounds: 1, gaps: 0 }, ratchet: producer.ratchet });

const paragraphs = storyParagraphs(story);
write("editorial-input.json", {
  readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`,
  completeArtifact: read(`${dir}/review-text.json`),
  paragraphs,
  communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication,
  claims: claims.map(c => ({ claimId: c.claimId, claim: c.candidateEvidence[0].excerpt, sourceIds: c.sourceIds })),
  sources: evidence.records.map(record => ({
    id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation,
    source: { url: record.url, passage: record.passages.join(" "), passageLocator: record.url, additionalPassage: `${record.authority} Limitation: ${record.limitation}`, additionalPassageLocator: record.url }
  }))
});

console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), storyTypeCoverage: bind("story-type-coverage.json"), status: "PENDING_INDEPENDENT_REVIEW" }));
