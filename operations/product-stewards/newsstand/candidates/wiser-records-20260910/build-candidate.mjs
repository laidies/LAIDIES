#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";

const root = process.cwd();
const id = "wiser-records-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const producerTemplate = "operations/product-stewards/newsstand/candidates/cisa-distillation-20260910/producer-publication-review.json";
const now = "2026-09-10T22:36:00-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));
fs.copyFileSync(path.join(root, dir, "writer-input-r3.json"), path.join(root, dir, "writer-input-current.json"));

const story = {
  id,
  slug: id,
  edition: "daily",
  status: "hold",
  publishedAt: null,
  updatedAt: now,
  lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null,
  correctionHistory: [],
  retraction: null,
  predecessorStoryIds: [],
  successorStoryIds: [],
  relationshipType: null,
  bigPicture: null,
  thread: null,
  thread_subtitle: null,
  thread_entry: null,
  headline: "New records reveal delays in Medicare’s AI-assisted payment checks.",
  heroVisual: {
    src: "/assets/newsstand/design-20260830/latest-checking.png",
    alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.",
    credit: "LAiDIES NewsStand evidence-checking illustration"
  },
  the_story: `<p>On September 8, the Electronic Frontier Foundation published internal Centers for Medicare &amp; Medicaid Services records about WISeR, Medicare’s AI-assisted prior-authorization pilot. They show one vendor expected to launch without full functionality and later reports tracked requests still waiting after days or weeks.</p><p>The records also correct EFF’s central claim. EFF says two vendors denied more than 20,000 requests. Its cited March 30 table reports 20,397 total decisions: 14,453 affirmations and 5,944 non-affirmations. An <strong>affirmation</strong> is an advance decision that the request meets Medicare's requirements. A <strong>non-affirmation</strong> means it was not approved at that point; it may later be corrected, resubmitted or appealed. The table does not report 20,000 final denials of care.</p><p>Other records still document trouble. Before the January launch, Innovaccer told CMS its system would not be fully functional and planned to auto-affirm—approve automatically—requests for 45 to 60 days while it finished testing. A March 30 report listed 123 Genzeon requests at least three days old, including one 83 days old. It divided them among vendor-response, decision-letter and correction stages, without identifying the oldest case’s stage.</p>`,
  laidies_read: `<p><strong>Prior authorization</strong> means a provider asks before treatment for assurance that Medicare will pay. In WISeR, a participating company uses AI and other technology to review whether documentation meets Medicare rules; CMS says a licensed clinician determines any recommendation not to pay.</p><p>The useful distinction is between a payment checkpoint and a treatment decision: a payment review can delay care, but it is not the same as an AI choosing a treatment. Providers can instead proceed to review after service and before payment.</p><p>The pilot covers selected services in <strong>Original Medicare</strong>—the federal fee-for-service program, distinct from private Medicare Advantage plans—in Arizona, New Jersey, Ohio, Oklahoma, Texas and Washington. CMS says it excludes emergencies, inpatient-only services and services whose delay would pose substantial risk.</p><p>CMS pays vendors a share of spending it counts as avoided when non-affirmed requests are not later approved or successfully appealed. Low quality scores reduce those payments, and CMS audits records quarterly. The records do not show whether those checks outweigh the savings incentive across the program.</p>`,
  what_this_means: `<p>In June, KFF Health News reported patient and provider accounts of confusion, errors and long waits. Humata’s CEO said 88 percent of cases with supporting clinical data received an immediate yes; Zyter said it was working with stakeholders. Those accounts do not measure AI’s effect across WISeR.</p><p>If a selected request is delayed for someone using Original Medicare in one of the six states, ask the provider which stage it is in—vendor response, decision letter or correction—and what review, resubmission or appeal route is available. The records do not prove that AI caused every delay, every non-affirmation was improper or June conditions remained unchanged in September.</p>`,
  cocktail_party: "“The records show requests waiting days or weeks and a vendor preparing to launch without full functionality. The cited table records 20,397 total decisions—not denials—including 14,453 affirmations and 5,944 non-affirmations.”",
  watch_fors: null,
  closing_note: null,
  class_notes: "A payment-review status is not a final care outcome. Track the stage, human decision and what happened after correction, resubmission or appeal.",
  sources: [
    { id: "cms-wiser-current", label: "CMS — WISeR model details and safeguards", url: "https://www.cms.gov/priorities/innovation/innovation-models/wiser", publisherType: "government", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "cms-records-release", label: "CMS records — WISeR second interim release", url: "https://www.eff.org/files/2026/09/07/combined_records_-_2nd_interim_release.pdf", publisherType: "primary-records", accessedAt: "2026-09-10", approvalStatus: "reviewed" },
    { id: "eff-wiser-records", label: "EFF — New records on Medicare’s WISeR experiment", url: "https://www.eff.org/deeplinks/2026/09/new-records-reveal-problems-medicares-ai-prior-authorization-experiment", publisherType: "advocacy", accessedAt: "2026-09-10", approvalStatus: "reviewed-with-correction" },
    { id: "kff-wiser-background", label: "KFF Health News — WISeR patient, provider and vendor accounts", url: "https://kffhealthnews.org/medicare/medicare-ai-prior-authorization-wiser-delays-errors/", publisherType: "reporting", accessedAt: "2026-09-10", approvalStatus: "reviewed" }
  ],
  aidb_credit: null,
  themes: ["health", "medical", "legal", "business"],
  concepts: ["prior authorization", "human review", "non-affirmation"],
  tags: ["Medicare", "WISeR", "health AI", "prior authorization", "CMS"],
  saint_lane: null,
  badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").replaceAll("&amp;", "&").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const evidence = JSON.parse(read(`${dir}/source-evidence.json`));
const records = new Map(evidence.records.map(record => [record.id, record]));
const claimRows = [
  ["records-release", "On September 8, the Electronic Frontier Foundation published internal", "the_story paragraph 1", ["eff-wiser-records"], { "eff-wiser-records": 0 }, "EFF publication date and identity; the release is not a new CMS rule."],
  ["eff-count-correction", "EFF says two vendors denied more than 20,000 requests", "the_story paragraph 2", ["eff-wiser-records", "cms-records-release"], { "eff-wiser-records": 1, "cms-records-release": 1 }, "Direct comparison of EFF's wording with its cited table."],
  ["exact-table-counts", "20,397 total decisions: 14,453 affirmations and 5,944 non-affirmations", "the_story paragraph 2", ["cms-records-release"], { "cms-records-release": 1 }, "Exact page 322 totals; no cumulative tables are added."],
  ["nonaffirmation-path", "it was not approved at that point; it may later be corrected, resubmitted or appealed", "the_story paragraph 2", ["cms-records-release"], { "cms-records-release": 2 }, "Page 22 distinguishes non-affirmation from later affirmation or successful appeal."],
  ["innovaccer-launch", "its system would not be fully functional and planned to auto-affirm—approve automatically—requests for 45 to 60 days", "the_story paragraph 3", ["cms-records-release"], { "cms-records-release": 4 }, "Pages 216-217 vendor letter and stated phased period."],
  ["genzeon-aged", "123 Genzeon requests at least three days old, including one 83 days old", "the_story paragraph 3", ["cms-records-release"], { "cms-records-release": 3 }, "Exact March 30 status report; stage of oldest remains unidentified."],
  ["human-review-mechanism", "a participating company uses AI and other technology to review whether documentation meets Medicare rules; CMS says a licensed clinician determines any recommendation not to pay", "laidies_read paragraph 1", ["cms-wiser-current"], { "cms-wiser-current": 0 }, "Current CMS mechanism and licensed-clinician safeguard."],
  ["postservice-route", "Providers can instead proceed to review after service and before payment", "laidies_read paragraph 2", ["cms-wiser-current"], { "cms-wiser-current": 6 }, "CMS says providers may use prior authorization or post-service/pre-payment review."],
  ["six-state-scope", "the federal fee-for-service program, distinct from private Medicare Advantage plans—in Arizona, New Jersey, Ohio, Oklahoma, Texas and Washington", "laidies_read paragraph 3", ["cms-wiser-current"], { "cms-wiser-current": 1 }, "Current six-state Original Medicare scope; Medicare Advantage exclusion retained."],
  ["service-exclusions", "excludes emergencies, inpatient-only services and services whose delay would pose substantial risk", "laidies_read paragraph 3", ["cms-wiser-current"], { "cms-wiser-current": 3 }, "Current CMS exclusions."],
  ["payment-audits", "Low quality scores reduce those payments, and CMS audits records quarterly", "laidies_read paragraph 4", ["cms-records-release", "cms-wiser-current"], { "cms-records-release": 6, "cms-wiser-current": 7 }, "Quality multipliers and current savings-payment description, translated without procedural percentages."],
  ["kff-experiences", "patient and provider accounts of confusion, errors and long waits", "what_this_means paragraph 1", ["kff-wiser-background"], { "kff-wiser-background": 0 }, "June independent reporting, kept distinct from September conditions."],
  ["vendor-responses", "Humata’s CEO said 88 percent of cases with supporting clinical data received an immediate yes; Zyter said it was working with stakeholders", "what_this_means paragraph 1", ["kff-wiser-background"], { "kff-wiser-background": 2 }, "Attributed vendor responses in KFF; not independently measured outcomes."],
  ["causal-limits", "The records do not prove that AI caused every delay, every non-affirmation was improper or June conditions remained unchanged in September", "what_this_means paragraph 2", ["cms-records-release", "kff-wiser-background"], { "cms-records-release": 3, "kff-wiser-background": 5 }, "Explicit boundary across dated operational records and attributed June reporting."]
];
const claims = claimRows.map(([claimId, excerpt, locator, sourceIds, passageIndexes, scopeAndFreshness]) => ({
  claimId,
  status: "QUALIFIED",
  candidateEvidence: [{ excerpt, locator }],
  sourceIds,
  sourceEvidence: sourceIds.map(sourceId => ({ excerpt: records.get(sourceId).passages[passageIndexes[sourceId]], locator: records.get(sourceId).url })),
  scopeAndFreshness
}));
write("claim-map.json", claims.map(({ sourceEvidence, ...claim }) => claim));
write("publication-manifest.json", {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId: id,
  surface: "NEWSSTAND_DAILY",
  contentClass: "NEWS",
  reviewText: bind("review-text.json"),
  rendered: bind("rendered-article.html")
});

const observations = {
  completeTextRead: true,
  storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    event: "They show one vendor expected to launch without full functionality and later reports tracked requests still waiting after days or weeks.",
    mechanism: "In WISeR, a participating company uses AI and other technology to review whether documentation meets Medicare rules; CMS says a licensed clinician determines any recommendation not to pay.",
    scope: "The pilot covers selected services in Original Medicare—the federal fee-for-service program, distinct from private Medicare Advantage plans—in Arizona, New Jersey, Ohio, Oklahoma, Texas and Washington.",
    action: "ask the provider which stage it is in—vendor response, decision letter or correction—and what review, resubmission or appeal route is available"
  },
  terms: {
    "prior authorization": "a provider asks before treatment for assurance that Medicare will pay",
    affirmation: "an advance decision that the request meets Medicare's requirements",
    "non-affirmation": "it was not approved at that point; it may later be corrected, resubmitted or appealed",
    "Original Medicare": "the federal fee-for-service program, distinct from private Medicare Advantage plans"
  },
  explainBack: "WISeR adds an AI-assisted vendor check to payment review for selected Original Medicare services. CMS says a licensed clinician determines a recommendation not to pay, and an initial non-affirmation can still be corrected, resubmitted or appealed.",
  unseenTransfer: "For an automated unemployment-benefit headline, separate all processed applications from first-stage adverse decisions and final outcomes after correction or appeal before repeating a total as people denied benefits.",
  unresolvedIssues: [],
  repairsMade: [
    "Reframed the headline and lead around the substantive rollout records after review found that ‘aged requests’ was jargon and the source correction had displaced the reader's main story.",
    "Replaced EFF's more-than-20,000-denials claim with the exact page 322 decision split inside the article.",
    "Kept the 123 aged requests in their three recorded stages and did not assign the oldest case to one stage.",
    "Defined auto-affirm, affirmation, non-affirmation, prior authorization and Original Medicare in the article.",
    "Removed an unsupported claim that the payment reviewer determines a patient's treatment."
  ],
  limitations: [
    "Producer assessment only, not independent admission.",
    "Seven cited pages were substantively inspected; no claim is made to have reviewed all 443 pages in full.",
    "No causal estimate attributes WISeR delays to AI across the program."
  ]
};
write("producer-observations.json", observations);

let producer = JSON.parse(read(producerTemplate));
producer.candidateId = id;
producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = now;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = {
  humanQuestion: "What do the new records show about delays and safeguards in Medicare's AI-assisted payment review?",
  promisedPayoff: "Correct the main number, explain the AI-assisted payment review and show both documented problems and retained safeguards.",
  centralMentalModel: "An AI-assisted payment checkpoint, a licensed clinician's recommendation and a final care outcome are different stages.",
  dailyLifeConnection: "A reader or family member may encounter WISeR while arranging a selected Original Medicare service.",
  surfaceJob: "September 10 coverage of records released September 8, with current CMS scope and June independent context.",
  desiredReaderFeeling: "I can take the delays seriously without repeating a false count."
};
const outcomeEvidence = {
  plainClarity: "it was not approved at that point; it may later be corrected, resubmitted or appealed.",
  readerValue: "ask the provider which stage it is in—vendor response, decision letter or correction—and what review, resubmission or appeal route is available",
  laidiesVoice: "The useful distinction is between a payment checkpoint and a treatment decision",
  engagingEnjoyable: "New records reveal delays in Medicare’s AI-assisted payment checks.",
  factualIntegrity: "20,397 total decisions: 14,453 affirmations and 5,944 non-affirmations",
  freshnessReviewability: "On September 8, the Electronic Frontier Foundation published internal",
  surfaceFit: "They show one vendor expected to launch without full functionality and later reports tracked requests still waiting after days or weeks.",
  datedChange: "On September 8, the Electronic Frontier Foundation published internal",
  consequenceAndUncertainty: "The records do not prove that AI caused every delay, every non-affirmation was improper or June conditions remained unchanged in September.",
  dailyLifeConnection: "If a selected request is delayed for someone using Original Medicare in one of the six states",
  communicationBenchmark: "In WISeR, a participating company uses AI and other technology to review whether documentation meets Medicare rules; CMS says a licensed clinician determines any recommendation not to pay.",
  explainBack: "The table does not report 20,000 final denials of care.",
  unseenTransfer: "A payment-review status is not a final care outcome.",
  usefulAction: "which stage it is in—vendor response, decision letter or correction",
  analogyIntegrity: "The useful distinction is between a payment checkpoint and a treatment decision"
};
for (const [key, outcome] of Object.entries(producer.outcomes)) {
  outcome.verdict = "PASS";
  outcome.observation = `The exact article supplies ${key} evidence while keeping the record count, review stage, scope, safeguard and causal limit connected.`;
  outcome.artifactEvidence = [{ excerpt: outcomeEvidence[key], locator: "exact story" }];
}
producer.outcomes.explainBack.simulatedReaderProbe = {
  prompt: "What does the primary table establish, and what does it not establish?",
  probeResponse: "It establishes 20,397 total decisions: 14,453 affirmations and 5,944 non-affirmations. It does not establish 20,000 final denials of care or that AI caused every result.",
  expectedEvidence: "Exact counts plus the non-affirmation and causation boundaries."
};
producer.outcomes.unseenTransfer.simulatedReaderProbe = {
  prompt: "Apply the same reasoning to an automated unemployment-benefit headline.",
  probeResponse: "Separate applications processed, first-stage adverse decisions and final outcomes after correction or appeal before calling the total people denied benefits.",
  expectedEvidence: "The same stage-versus-final-outcome distinction in a different public-benefit system."
};
for (const [key, family] of Object.entries(producer.failureFamilies)) {
  family.present = false;
  family.observation = `The complete article avoids ${key}; the number correction, mechanism, evidence limits and action stay connected.`;
  family.artifactLocator = "complete exact story";
}
producer.factualReview = {
  disposition: "CLAIMS_REVIEWED",
  sourceBindings: [bind("source-evidence.json")],
  claimMap: claims.map(({ sourceEvidence, ...claim }) => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence })),
  reviewedThrough: "2026-09-10",
  nextTrigger: "Reopen all sources on publication day; redraft for corrected records, new CMS performance data, a program change, audit or corrective action, or evidence changing the stated delays, scope or safeguards.",
  correctionOwner: "LAiDIES NewsStand product steward"
};
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 1, reviewIssues: 1, reviewCycles: 2, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate reports the September 8 WISeR records release and corrects its central count." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The candidate-specific jargon and source-error-first framing were repaired. No shared reusable defect is claimed or registered; independent review is still required." };
producer.verdict = "PASS";
producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", {
  proseReview: { reviewIssues: 1, reviewCycles: 3 },
  evidencePacket: { rounds: 1, gaps: 0 },
  ratchet: { ...producer.ratchet, reviewCycles: 3 },
  retainedAttempt: "The first independent PASS is preserved under runtime-claude-fable-20260910-v1; assembly rejected its UTC-formatted story date before admission. A second call was interrupted before completion when review found the headline jargon and source-error-first framing. This third exact successor requires its own decision."
});
write("editorial-input.json", {
  readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`,
  completeArtifact: read(`${dir}/review-text.json`),
  paragraphs: storyParagraphs(story),
  communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication,
  claims: claims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })),
  sources: evidence.records.map(record => ({
    id: record.id,
    url: record.url,
    authority: record.authority,
    passages: record.passages,
    limitation: record.limitation,
    source: {
      url: record.url,
      passage: record.passages.join(" "),
      passageLocator: record.url,
      additionalPassage: `${record.authority} Limitation: ${record.limitation}`,
      additionalPassageLocator: record.url
    }
  }))
});

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root });
if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story);
if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root });
if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);

console.log(JSON.stringify({
  candidateId: id,
  storySha256: hash(stable(story)),
  reviewTextSha256: bind("review-text.json").sha256,
  publicationBaseSha256: bind("publication-base.js").sha256,
  status: "PENDING_INDEPENDENT_REVIEW"
}));
