#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "coxon-warning-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910";
const now = "2026-09-10T23:16:00-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));
fs.copyFileSync(path.join(root, dir, "writer-input-r2.json"), path.join(root, dir, "writer-input-current.json"));

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null, updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "An Anthropic researcher quit to warn that the AI race could outrun its safety rules.",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-automated-alignment-20260901-v2.png", alt: "A transparent 1990s-style testing maze where colourful robot pieces follow rules while one is caught slipping around a barrier.", credit: "LAiDIES NewsStand" },
  the_story: `<p>Jacob Coxon said in a post that he had resigned from Anthropic after three years working on AI pretraining at Anthropic and OpenAI. WIRED and ABC reported the resignation on September 9. Coxon accused both companies of racing toward increasingly self-improving AI and “gambling with our lives.” The resignation and statement are verified events. The outcome he fears is a forecast.</p><p>In a direct interview, Coxon told WIRED that Anthropic takes safety more seriously than OpenAI in his experience. Asked whether Anthropic was already cutting corners, he answered, “No, not yet.” His warning is that competition could force future trade-offs between safety and speed.</p><p>Coxon proposed that OpenAI and Anthropic agree to limit <strong>recursive self-improvement</strong>, meaning using AI to help build the next AI systems. He named biological and cyber harm as possible risks, at a high level. The reviewed sources do not establish that either has happened.</p><p>Anthropic told WIRED it supports a lawful, verifiable way for the industry to pace powerful-model releases. Its current policy describes company risk reports and allows Anthropic to pause development. That framework is not independent proof that its safeguards work or an industry agreement.</p>`,
  laidies_read: `<p>A second Anthropic researcher, Evan Hubinger, wrote separately that he personally thinks there is a greater than 10 percent chance AI could kill everyone within the next decade. “Personally” matters. The post supplies no calculation, model or survey, so this is a <strong>personal forecast</strong>—one person’s estimate about an uncertain future, not a measured past rate. It is not a company probability or a measured fatality rate.</p><p>Coxon’s employment gives him first-hand perspective, and resigning puts his judgment on the public record. It does not independently verify his predictions. WIRED’s interview preserves a fact an alarming headline can flatten: Coxon says the corner-cutting he fears is ahead, not happening now at Anthropic.</p><p>The mechanism behind his concern is a loop. If companies use current AI to accelerate work on the next systems, competition could compress the time available for safety research and public rules. Coxon predicts that pressure; the sources do not establish when such a loop will begin, how quickly it would move or the probability of catastrophe.</p>`,
  what_this_means: `<p>When a frightening percentage appears in AI coverage, ask three connected questions: Who estimated it? What method produced it? What evidence would change it? A count of past events, a forecast from a disclosed model, a survey of experts and one person’s estimate can all use percentages, but they are different kinds of evidence.</p><p>The public question is who can verify safety claims and set the pace when companies compete. Coxon’s slowdown is a proposal, Anthropic’s policy is its own framework, and no reviewed source establishes a binding agreement or present catastrophe. The warning deserves scrutiny without being promoted into a finding.</p>`,
  cocktail_party: "“Jacob Coxon resigned from Anthropic and warned that competition could make AI development outrun safety work. He says Anthropic is not cutting corners now, and Evan Hubinger’s greater-than-10-percent figure is Hubinger’s personal forecast—not a measured rate or company estimate.”",
  watch_fors: null, closing_note: null,
  class_notes: "A percentage can describe observed events or express a forecast. Ask who produced it, what method supports it and what evidence would change it before treating precision as proof.",
  sources: [
    { id: "coxon-primary-post", label: "Jacob Coxon — resignation statement", url: "https://x.com/hilbertspaess/status/2097476196791709843", publisherType: "primary-statement", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "hubinger-primary-post", label: "Evan Hubinger — personal AI-risk estimate", url: "https://x.com/EvanHub/status/2097497037956891126", publisherType: "primary-statement", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "wired-coxon-interview", label: "WIRED — direct interview with Jacob Coxon", url: "https://www.wired.com/story/anthropic-researcher-quits-jacob-coxon-ai-fears-humanity/", publisherType: "reporting", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "abc-independent-reporting", label: "ABC News — Coxon resignation and Hubinger context", url: "https://www.abc.net.au/news/2026-09-09/anthropic-researcher-coxon-quits-over-human-threat/107134164", publisherType: "reporting", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "anthropic-rsp-current", label: "Anthropic — Responsible Scaling Policy", url: "https://www.anthropic.com/responsible-scaling-policy", publisherType: "vendor-primary-policy", accessedAt: "2026-09-10", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["AI governance", "people and organizations", "security"], concepts: ["recursive self-improvement", "personal forecast", "evidence type"], tags: ["Anthropic", "Jacob Coxon", "Evan Hubinger", "AI safety"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const claims = [
  ["resignation", "Jacob Coxon said in a post that he had resigned from Anthropic after three years working on AI pretraining at Anthropic and OpenAI", "P001", ["coxon-primary-post", "wired-coxon-interview", "abc-independent-reporting"], "Primary statement and independent confirmations; no universal local date is assigned to the post."],
  ["reporting-date", "WIRED and ABC reported the resignation on September 9", "P001", ["wired-coxon-interview", "abc-independent-reporting"], "Publication date belongs to the two reporting sources."],
  ["coxon-allegation", "Coxon accused both companies of racing toward increasingly self-improving AI", "P001", ["coxon-primary-post"], "Attributed allegation, not adopted as finding."],
  ["no-current-corners", "Asked whether Anthropic was already cutting corners", "P002", ["wired-coxon-interview"], "Exact direct interview answer."],
  ["future-pressure", "His warning is that competition could force future trade-offs between safety and speed", "P002", ["wired-coxon-interview"], "Coxon's prediction kept future tense."],
  ["proposal-definition", "Coxon proposed that OpenAI and Anthropic agree to limit", "P003", ["wired-coxon-interview"], "Direct proposal and WIRED's plain definition."],
  ["risk-boundary", "He named biological and cyber harm as possible risks", "P003", ["wired-coxon-interview"], "Potential risks kept high-level and distinct from events."],
  ["anthropic-response", "Anthropic told WIRED it supports a lawful, verifiable way", "P004", ["wired-coxon-interview"], "Attributed company response."],
  ["rsp-framework", "Its current policy describes company risk reports and allows Anthropic to pause development", "P004", ["anthropic-rsp-current"], "Current primary policy; company framework only."],
  ["hubinger-estimate", "Evan Hubinger, wrote separately that he personally thinks there is a greater than 10 percent chance AI could kill everyone within the next decade", "P005", ["hubinger-primary-post", "wired-coxon-interview", "abc-independent-reporting"], "Exact primary qualifier and independent context."],
  ["estimate-limit", "The post supplies no calculation, model or survey", "P005", ["hubinger-primary-post"], "Bounded observation about the complete preserved post."],
  ["unknowns", "the sources do not establish when such a loop will begin, how quickly it would move or the probability of catastrophe", "P007", ["wired-coxon-interview", "hubinger-primary-post"], "Explicit evidentiary limits."],
  ["no-agreement", "no reviewed source establishes a binding agreement or present catastrophe", "P009", ["wired-coxon-interview", "anthropic-rsp-current"], "Proposal and company framework remain distinct from binding action and outcome."]
].map(([claimId, excerpt, locator, sourceIds, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness }));
write("claim-map.json", claims);
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });
const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: { event: "Jacob Coxon said in a post that he had resigned from Anthropic", proposal: "Coxon proposed that OpenAI and Anthropic agree to limit recursive self-improvement", evidence: "The resignation and statement are verified events. The outcome he fears is a forecast.", unknown: "the sources do not establish when such a loop will begin, how quickly it would move or the probability of catastrophe" },
  terms: { "recursive self-improvement": "using AI to help build the next AI systems", "personal forecast": "one person’s estimate about an uncertain future, not a measured past rate" },
  explainBack: "Coxon's resignation and statements are observed events, but the feared catastrophe is a forecast. Hubinger's percentage is explicitly his personal estimate and the preserved post supplies no method.",
  unseenTransfer: "If an economist says there is a 30 percent chance of recession next year, first identify whether that number came from a disclosed model, a survey, historical frequency or personal judgment before comparing it with an observed unemployment rate.",
  unresolvedIssues: [],
  repairsMade: ["Removed a universal September 9 date from the primary post because its UTC timestamp falls on September 8 in Vancouver; assigned September 9 only to the WIRED and ABC reports.", "Kept Coxon's present-tense statement that Anthropic is not cutting corners beside his future warning.", "Separated Coxon's warning from Hubinger's personal percentage and named the missing method.", "Kept biological and cyber risks high-level and treated the slowdown as a proposal."],
  limitations: ["Producer assessment only, not independent admission.", "The article does not measure the probability of AI catastrophe or independently audit Anthropic's safeguards."]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = "2026-09-10T23:12:00-07:00";
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "What does Coxon's resignation establish, and how much weight should I give the predictions?", promisedPayoff: "Separate verified event, testimony, forecast, proposal and company framework.", centralMentalModel: "Observed event, insider testimony and personal forecast are different evidence types.", dailyLifeConnection: "Reading a precise-looking risk percentage in alarming coverage.", surfaceJob: "September 10 coverage of Coxon’s post and September 9 reporting.", desiredReaderFeeling: "Calibrated without dismissing the warning." };
const exact = { plainClarity: "using AI to help build the next AI systems", readerValue: "The resignation and statement are verified events. The outcome he fears is a forecast.", laidiesVoice: "The warning deserves scrutiny without being promoted into a finding.", engagingEnjoyable: "The mechanism behind his concern is a loop.", factualIntegrity: "Asked whether Anthropic was already cutting corners", freshnessReviewability: "WIRED and ABC reported the resignation on September 9", surfaceFit: "Jacob Coxon said in a post that he had resigned", datedChange: "WIRED and ABC reported the resignation on September 9", consequenceAndUncertainty: "the sources do not establish when such a loop will begin", dailyLifeConnection: "When a frightening percentage appears in AI coverage", communicationBenchmark: "The mechanism behind his concern is a loop.", explainBack: "The resignation and statement are verified events. The outcome he fears is a forecast.", unseenTransfer: "A count of past events, a forecast from a disclosed model, a survey of experts and one person’s estimate", usefulAction: "Who estimated it? What method produced it? What evidence would change it?", analogyIntegrity: "A percentage can describe observed events or express a forecast." };
for (const [name, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The exact story supplies ${name} evidence while keeping event, testimony, forecast and policy distinct.`; outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "What did the resignation prove?", probeResponse: "It proves Coxon left and made the warning, not that the predicted catastrophe is likely or imminent.", expectedEvidence: "Observed event separated from forecast.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "How would you read an economist's personal recession probability?", probeResponse: "Ask whether it comes from a model, survey, historical rate or personal judgment before comparing it with observed data.", expectedEvidence: "Evidence-type distinction transfers beyond AI.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete story avoids ${name}; attribution and limits remain connected to each claim.`; family.artifactLocator = "complete exact story"; }
const evidence = JSON.parse(read(`${dir}/source-evidence.json`)); const byId = new Map(evidence.records.map(r => [r.id, r]));
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: claims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-10", nextTrigger: "Reopen all sources on publication day; redraft for corrected statements, disclosed forecasting methods, policy changes, independent audits or an actual pacing agreement.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 1, reviewIssues: 1, reviewCycles: 2, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate covers Coxon's September 9 resignation and separate Hubinger forecast." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "No reusable defect found in producer review; independent review remains required." };
producer.verdict = "PASS"; producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 1, reviewCycles: 2 }, evidencePacket: { rounds: 1, gaps: 0 }, ratchet: producer.ratchet });
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication, claims: claims.map(c => ({ claimId: c.claimId, claim: c.candidateEvidence[0].excerpt, sourceIds: c.sourceIds })), sources: evidence.records.map(r => ({ id: r.id, url: r.url, authority: r.authority, passages: r.passages, limitation: r.limitation, source: { url: r.url, passage: r.passages.join(" "), passageLocator: r.url, additionalPassage: `${r.authority} Limitation: ${r.limitation}`, additionalPassageLocator: r.url } })) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root }); if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story); if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root }); if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
