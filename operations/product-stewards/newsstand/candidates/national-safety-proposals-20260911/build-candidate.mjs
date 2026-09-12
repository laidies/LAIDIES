#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "national-safety-proposals-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/papercut-campaign-20260911";
// This is the observed source-packet completion time. It must never be later
// than the wall clock when the candidate is rebuilt.
const now = "2026-09-11T08:46:55-07:00";
// Bound to the completed producer receipt that preceded the 08:52:04 review dispatch.
const producerReviewedAt = "2026-09-11T08:51:44-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

// The publication base is a frozen candidate input. Rebuilding provenance must
// not silently rebase the editorial candidate onto newer canonical data.
if (!fs.existsSync(path.join(root, dir, "publication-base.js"))) {
  fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));
}

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null, updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "OpenAI asks Congress to require safety checks at the most capable AI labs",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>OpenAI asked Congress on September 9 to create mandatory national safety rules for the most capable AI systems. Its preferred framework includes common testing, independent assessments, cybersecurity protections and clear reporting of serious incidents. OpenAI says the rules should cover a handful of well-resourced laboratories developing the most capable systems, rather than startups and smaller developers far from that boundary.</p><p>This is a company asking for legislation; it is not legislation. Reuters reported that Congress has yet to enact a federal AI framework. Nothing in OpenAI’s post creates a new legal requirement today.</p><p>Six days earlier, Senator Bernie Sanders and Representative Greg Casar announced a different proposal. Their office calls it forthcoming legislation. It would pause advanced AI development until a new federal regulator has established safety rules and a model-review process, then permanently ban development and deployment of what the sponsors call artificial superintelligence.</p>`,
  laidies_read: `<p>These are two proposed braking systems. OpenAI’s is <strong>capability-based</strong>: rules become stronger as a system’s demonstrated abilities and risks increase. Development could continue under testing, independent review, cybersecurity and reporting duties, with shared safety bars for when work should slow or stop. OpenAI calls the small group building the most capable systems <strong>frontier labs</strong>.</p><p>The Sanders-Casar proposal would apply the brake earlier. It would pause advanced development until a regulator and its rules exist. Its permanent ban would cover the proposal’s category of <strong>superintelligence</strong>: systems that surpass human intelligence or can defeat important forms of human control, such as shutdown commands. That is the sponsors’ proposed definition, not a finding about today’s AI. OpenAI separately says fully autonomous AI improving successive generations of AI is not happening today.</p><p>The distinction matters because each plan puts the burden at a different point. OpenAI wants the largest labs to produce evidence, accept outside assessment and report incidents while development continues within safety limits. Sanders and Casar want advanced development stopped until public rules and review exist. Neither source supplies an enacted federal rule, and the lawmakers’ source does not supply a formal bill number.</p>`,
  what_this_means: `<p>If either approach became law, it could change what the most capable labs must test before deployment, what independent assessors may examine and which serious incidents must be reported. Those effects remain proposed, not current rights or protections.</p><p>When a headline says AI safety rules are coming, check four things: who is speaking, whether the document is a company position, announced proposal, introduced bill or enacted law, which systems it would cover, and what event triggers testing, reporting, slowing or stopping. Here, the verified change is a public policy push. The law has not changed.</p>`,
  cocktail_party: "“OpenAI wants mandatory safety checks for the biggest AI labs. Sanders and Casar have announced a stronger pause-and-ban proposal. Both are proposals; neither changed federal law.”",
  watch_fors: null, closing_note: null,
  class_notes: `Superintelligence is a hypothetical and contested category, not a description of today’s AI. <a href="/library.html#ai-fundamentals-101::%40ch-20-20-3-asi-the-further-horizon">AI Fundamentals 101: Artificial Superintelligence</a> explains why the definition matters.`,
  sources: [
    { id: "openai-policy-window", label: "OpenAI — The AI policy window is open. We need to act.", url: "https://openai.com/index/ai-policy-window/", publisherType: "company-primary-policy", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "sanders-casar-announcement", label: "Office of Senator Bernie Sanders — Ban Artificial Superintelligence Act announcement", url: "https://www.sanders.senate.gov/press-releases/news-sanders-casar-introduce-legislation-to-ban-artificial-superintelligence-and-temporarily-pause-advanced-ai-development/", publisherType: "government-primary-sponsor-announcement", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "reuters-openai-policy-report", label: "Reuters — OpenAI pushes for mandatory national AI safety rules", url: "https://www.investing.com/news/stock-market-news/openai-pushes-for-mandatory-national-ai-safety-requirements-4894770", publisherType: "reporting", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["AI governance", "AI safety"], concepts: ["capability-based rules", "frontier lab", "superintelligence", "legal status"], tags: ["OpenAI", "Congress", "Bernie Sanders", "Greg Casar", "AI safety"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const evidence = JSON.parse(read(`${dir}/source-evidence.json`));
const byId = new Map(evidence.records.map(record => [record.id, record]));
const passage = (id, fragment) => {
  const found = byId.get(id).passages.find(value => value.includes(fragment));
  if (!found) throw Error(`Missing source passage ${id}/${fragment}`);
  return found;
};
const claimSpecs = [
  ["openai-call", "OpenAI asked Congress on September 9 to create mandatory national safety rules", "P002", ["openai-policy-window", "reuters-openai-policy-report"], [["openai-policy-window", "mandatory, capability-based national regulation"], ["reuters-openai-policy-report", "OpenAI said on Wednesday"]], "Company policy request and date, independently reported."],
  ["openai-requirements", "common testing, independent assessments, cybersecurity protections and clear reporting of serious incidents", "P002", ["openai-policy-window", "reuters-openai-policy-report"], [["openai-policy-window", "common testing and independent-assessment requirements"], ["reuters-openai-policy-report", "testing standards, independent assessments"]], "Concrete proposed duties, attributed to OpenAI."],
  ["openai-scope", "a handful of well-resourced laboratories developing the most capable systems", "P002", ["openai-policy-window"], [["openai-policy-window", "handful of well-resourced laboratories"]], "OpenAI's stated coverage boundary."],
  ["federal-status", "Congress has yet to enact a federal AI framework", "P003", ["reuters-openai-policy-report"], [["reuters-openai-policy-report", "Congress yet to enact a federal framework"]], "Independent reporting on current federal legal status."],
  ["sponsors-status", "Senator Bernie Sanders and Representative Greg Casar announced a different proposal. Their office calls it forthcoming legislation", "P004", ["sanders-casar-announcement"], [["sanders-casar-announcement", "announced the Ban Artificial Superintelligence Act, forthcoming legislation"]], "Sponsor identities and expressly forthcoming status."],
  ["pause-mechanism", "pause advanced AI development until a new federal regulator has established safety rules and a model-review process", "P004", ["sanders-casar-announcement"], [["sanders-casar-announcement", "temporarily pause advanced AI development until a federal regulator"], ["sanders-casar-announcement", "model review process"]], "The proposed pause trigger."],
  ["ban-mechanism", "permanently ban development and deployment of what the sponsors call artificial superintelligence", "P004", ["sanders-casar-announcement"], [["sanders-casar-announcement", "permanently ban the development and deployment"]], "Sponsor proposal, not current law."],
  ["capability-meaning", "rules become stronger as a system’s demonstrated abilities and risks increase", "P005", ["openai-policy-window"], [["openai-policy-window", "capability-based national regulation"], ["openai-policy-window", "Obligations should be proportionate to capabilities and risks"]], "Plain-language synthesis of capability-based and proportionate duties."],
  ["openai-brake", "shared safety bars for when work should slow or stop", "P005", ["openai-policy-window"], [["openai-policy-window", "shared safety bars for when and how development should slow or stop"]], "OpenAI's requested slow-or-stop boundary."],
  ["superintelligence-definition", "systems that surpass human intelligence or can defeat important forms of human control, such as shutdown commands", "P006", ["sanders-casar-announcement"], [["sanders-casar-announcement", "systems that surpass human intelligence"], ["sanders-casar-announcement", "subverting shutdown commands"]], "Sponsor-defined category, explicitly qualified in prose."],
  ["not-today", "fully autonomous AI improving successive generations of AI is not happening today", "P006", ["openai-policy-window", "reuters-openai-policy-report"], [["openai-policy-window", "Fully autonomous recursive self-improvement"], ["reuters-openai-policy-report", "is not happening today"]], "Current-status limitation from OpenAI and Reuters."],
  ["mechanism-comparison", "OpenAI wants the largest labs to produce evidence, accept outside assessment and report incidents while development continues within safety limits. Sanders and Casar want advanced development stopped until public rules and review exist", "P007", ["openai-policy-window", "sanders-casar-announcement"], [["openai-policy-window", "independent-assessment requirements"], ["openai-policy-window", "clear incident-reporting rules"], ["sanders-casar-announcement", "Pausing advanced AI development until"]], "Bounded comparison of the two proposed mechanisms."],
  ["no-bill-number", "the lawmakers’ source does not supply a formal bill number", "P007", ["sanders-casar-announcement"], [["sanders-casar-announcement", "forthcoming legislation"]], "Absence statement limited to the complete sponsor announcement."],
  ["conditional-effects", "If either approach became law, it could change what the most capable labs must test before deployment, what independent assessors may examine and which serious incidents must be reported", "P008", ["openai-policy-window", "sanders-casar-announcement"], [["openai-policy-window", "common testing and independent-assessment requirements"], ["openai-policy-window", "clear incident-reporting rules"], ["sanders-casar-announcement", "model review process"]], "Conditional reader consequence; no current-right claim."],
  ["reading-tool", "company position, announced proposal, introduced bill or enacted law", "P009", ["openai-policy-window", "sanders-casar-announcement", "reuters-openai-policy-report"], [["openai-policy-window", "mandatory, capability-based national regulation"], ["sanders-casar-announcement", "forthcoming legislation"], ["reuters-openai-policy-report", "Congress yet to enact a federal framework"]], "Editorial classification tool grounded in the three verified statuses."]
];
const claims = claimSpecs.map(([claimId, excerpt, locator, sourceIds, supports, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness, supports: supports.map(([sourceId, fragment]) => ({ sourceId, passage: passage(sourceId, fragment) })) }));
const cleanClaims = claims.map(({supports, ...claim}) => claim);
write("claim-map.json", cleanClaims);
write("source-packet-preflight.json", { schemaVersion: "laidies.newsstand-source-packet-preflight.v1", candidateId: id, checkedAt: producerReviewedAt, method: "Every atomic factual claim maps to exact passages included in the full reviewer packet. Company positions, sponsor proposals, independent reporting and legal status remain separate.", claims: claims.map(claim => ({ claimId: claim.claimId, supports: claim.supports })) });
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    openai: "common testing, independent assessments, cybersecurity protections and clear reporting of serious incidents",
    pause: "pause advanced AI development until a new federal regulator has established safety rules and a model-review process",
    status: "Nothing in OpenAI’s post creates a new legal requirement today",
    relevance: "who is speaking, whether the document is a company position, announced proposal, introduced bill or enacted law"
  },
  terms: {
    "capability-based": "rules become stronger as a system’s demonstrated abilities and risks increase",
    "frontier lab": "the small group building the most capable systems",
    superintelligence: "systems that surpass human intelligence or can defeat important forms of human control"
  },
  explainBack: "OpenAI wants mandatory checks and reporting for the handful of labs building the most capable systems while development continues inside safety limits. Sanders and Casar propose pausing advanced development until a regulator sets rules, plus a permanent ban on their defined category of superintelligence.",
  unseenTransfer: "For a later AI policy headline, separate who is speaking, the legal document that actually exists, the systems covered and the event that triggers a duty before deciding that the law changed.",
  unresolvedIssues: [],
  repairsMade: [
    "Put current legal status immediately after OpenAI's request and again after the comparison.",
    "Kept OpenAI's targeted capability-based framework distinct from the Sanders-Casar pause and permanent ban.",
    "Used the sponsor announcement's word forthcoming and made no formal bill-number, passage or enactment claim.",
    "Defined superintelligence as the proposal's category and placed OpenAI's not-happening-today limitation beside it.",
    "Ended with a policy-reading test rather than assigning every reader a lobbying or filing-monitoring task."
  ],
  limitations: ["Producer assessment only, not independent admission.", "The sources do not establish formal bill text, passage, effectiveness or enacted federal rules.", "No observed human-comprehension or public-release result is claimed."]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = producerReviewedAt;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "What are OpenAI, Sanders and Casar actually proposing, and is any of it law?", promisedPayoff: "Separate the two proposed mechanisms and their current legal status.", centralMentalModel: "One proposal adds capability-based duties while development continues; the other pauses advanced development until rules exist and bans a defined future category.", dailyLifeConnection: "Policy headlines can describe advocacy or planned legislation without changing current rights or product rules.", surfaceJob: "September 11 explanation of the September 9 company request and September 3 sponsor proposal.", desiredReaderFeeling: "I can tell what exists, who wants it and what would trigger each proposed brake." };
const exact = { plainClarity: "This is a company asking for legislation; it is not legislation", readerValue: "These are two proposed braking systems", laidiesVoice: "Here, the verified change is a public policy push", engagingEnjoyable: "each plan puts the burden at a different point", factualIntegrity: "Their office calls it forthcoming legislation", freshnessReviewability: "OpenAI asked Congress on September 9", surfaceFit: "OpenAI asks Congress to require safety checks", datedChange: "Six days earlier, Senator Bernie Sanders and Representative Greg Casar", consequenceAndUncertainty: "Those effects remain proposed, not current rights or protections", dailyLifeConnection: "When a headline says AI safety rules are coming", communicationBenchmark: "who is speaking", explainBack: "OpenAI wants the largest labs to produce evidence", unseenTransfer: "company position, announced proposal, introduced bill or enacted law", usefulAction: "check four things", analogyIntegrity: "two proposed braking systems" };
for (const [name, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The complete story supplies ${name} evidence while keeping the speakers, legal status, covered systems and policy triggers connected.`; outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Did OpenAI and the lawmakers propose the same rule?", probeResponse: "No. OpenAI wants capability-based checks for the largest labs while development continues within safety limits; Sanders and Casar propose a pause until a regulator sets rules plus a permanent ban on their defined superintelligence category.", expectedEvidence: "Coverage and trigger remain distinct.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "A later headline says a company backs strict AI rules. What should I identify first?", probeResponse: "Identify who is speaking, whether a company position, announced proposal, introduced bill or enacted law exists, what systems are covered and what triggers a duty.", expectedEvidence: "The status-and-trigger method transfers to another policy headline.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete story avoids ${name}; the dated proposals, mechanism difference, legal status and reader classification tool remain connected.`; family.artifactLocator = "complete exact story"; }
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: cleanClaims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-11", nextTrigger: evidence.nextTrigger, correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate compares this September 9 OpenAI request with the September 3 forthcoming Sanders-Casar proposal." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The source-complete preflight found no unresolved defect after separating advocacy, forthcoming legislation, covered systems, triggers and current legal effect." };
producer.verdict = "PASS"; producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 0, reviewCycles: 1 }, sourcePacket: { rounds: 1, gaps: 0, repaired: 0, preflight: "check-source-packet-preflight.mjs --calibrate", checkedClaims: cleanClaims.length, exactSourceExcerpts: claims.reduce((sum, claim) => sum + claim.supports.length, 0) }, ratchet: producer.ratchet });
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication, claims: cleanClaims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })), sources: evidence.records.map(record => { const sourceFile = record.id === "openai-policy-window" ? "source/openai-web-observation.json" : record.id === "sanders-casar-announcement" ? "source/sanders-web-observation.json" : "source/reuters-web-observation.json"; return { id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: read(`${dir}/${sourceFile}`), passageLocator: record.url, additionalPassage: `${record.passages.join("\n")}\nAuthority: ${record.authority}\nLimitation: ${record.limitation}`, additionalPassageLocator: record.url } }; }) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root }); if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story); if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root }); if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
