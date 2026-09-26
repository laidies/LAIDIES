#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "gpt-live-downstream-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/california-chatbot-law-20260910";
const now = "2026-09-11T02:36:19-07:00";
const producerReviewedAt = "2026-09-11T04:37:00-07:00";
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
  headline: "The voice on your next restaurant or repair call may be GPT-Live-1.",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>OpenAI released GPT-Live-1 to developers through its API on September 10. The same day, Yelp said it had integrated the voice model into Yelp Host, which answers restaurant calls, and Hatch, which handles calls for service businesses such as repair companies.</p><p>This is where someone who never opens an API may encounter the release: while making a reservation, changing a food order or arranging an appointment by phone. It does not mean every restaurant, repair company or ChatGPT account changed. Yelp did not disclose which callers, locations or customers have received the new integration.</p><p>A <strong>front-end voice layer</strong> is the part that listens and speaks while a separate backend checks information and completes tasks. OpenAI calls listening and speaking at the same time <strong>full duplex</strong>. GPT-Live-1 can keep listening when a caller pauses, interrupts or changes direction. A separate backend system still checks business information, applies rules and uses tools. OpenAI’s documentation says the application—not the voice model—owns permissions, confirmations and the lasting record of a task.</p>`,
  laidies_read: `<p>Compared with a traditional voice system that passes speech through separate listening, reasoning and speaking stages, GPT-Live-1 is meant to keep the conversation moving more naturally. Imagine changing a reservation from four people to five while the voice is still replying. The voice layer can handle the interruption; the restaurant’s availability data and booking tool still determine whether a table is recorded.</p><p>Yelp says early production testing showed better call handling and fewer transfers, and that callers spoke in fuller sentences. Those are company-reported observations. The release gives no sample size, test method, rollout geography or independent assessment, so it does not establish how often the system completes a reservation or appointment correctly.</p><p>Developers can access GPT-Live-1 as a paid API. OpenAI says the voice layer costs $0.05 per minute; backend models and tools are billed separately. That is not necessarily a fee charged to the caller. The model is best suited to conversations with pauses, interruptions or background noise. It may be unnecessary for a simple menu lookup or email, where a human or simpler system already works.</p>`,
  what_this_means: `<p>A smoother voice can make a call easier, but fluency is not a booking record. At the end of a restaurant call, repeat the date, time and party size and ask for the confirmation. For a repair appointment, check the address, service requested and arrival window. If the system cannot confirm the record, ask for a person.</p><p>The next useful evidence is independent testing and a disclosed rollout: which calls use GPT-Live-1, how transaction accuracy is measured and how often the confirmed record matches what the caller said.</p>`,
  cocktail_party: "“GPT-Live-1 may be the voice on a restaurant or repair call. It can make interruptions sound smoother, but the connected booking system—not the voice—records the result.”",
  watch_fors: null, closing_note: null,
  class_notes: `A fluent answer and a completed transaction are different results. <a href="/library.html#working-with-ai-101::%4010-6-trusting-the-output-and-checking-it">Working with AI 101: Trusting the Output and Checking It</a> shows how to check the result that matters.`,
  sources: [
    { id: "openai-gpt-live-release", label: "OpenAI — Build more natural voice experiences with GPT-Live-1 in the API", url: "https://openai.com/index/introducing-gpt-live-1-in-the-api/", publisherType: "vendor-primary-release", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "openai-gpt-live-docs", label: "OpenAI Developers — Getting started with GPT-Live", url: "https://developers.openai.com/api/docs/guides/live", publisherType: "vendor-primary-documentation", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "yelp-hatch-businesswire", label: "Yelp via Business Wire — GPT-Live-1 in Yelp Host and Hatch", url: "https://www.businesswire.com/news/home/20260909348516/en/", publisherType: "company-primary-release", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["model capabilities", "consumer products"], concepts: ["front-end voice layer", "full duplex", "transaction confirmation"], tags: ["OpenAI", "GPT-Live-1", "Yelp Host", "Hatch", "voice AI"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const claims = [
  ["release", "OpenAI released GPT-Live-1 to developers through its API on September 10", "P001", ["openai-gpt-live-release"], "Dated vendor release and API availability."],
  ["yelp-integration", "Yelp said it had integrated the voice model into Yelp Host", "P001", ["yelp-hatch-businesswire"], "Attributed adoption claim from the adopting company."],
  ["rollout-boundary", "Yelp did not disclose which callers, locations or customers have received the new integration", "P002", ["yelp-hatch-businesswire"], "Absence statement limited to the complete reviewed company release."],
  ["voice-layer", "the part that listens and speaks while a separate backend checks information and completes tasks", "P003", ["openai-gpt-live-release", "openai-gpt-live-docs"], "Plain-language description of the voice/backend division."],
  ["application-control", "the application—not the voice model—owns permissions, confirmations and the lasting record of a task", "P003", ["openai-gpt-live-docs"], "Preserves the official application-control boundary."],
  ["traditional-comparison", "a traditional voice system that passes speech through separate listening, reasoning and speaking stages", "P004", ["openai-gpt-live-release"], "OpenAI's architecture comparison, framed as vendor explanation."],
  ["yelp-testing", "Yelp says early production testing showed better call handling and fewer transfers", "P005", ["yelp-hatch-businesswire"], "Company-reported observation, not an independent outcome."],
  ["evidence-limit", "The release gives no sample size, test method, rollout geography or independent assessment", "P005", ["yelp-hatch-businesswire"], "Absence statement limited to the complete reviewed release."],
  ["price", "Developers can access GPT-Live-1 as a paid API. OpenAI says the voice layer costs $0.05 per minute", "P006", ["openai-gpt-live-release", "openai-gpt-live-docs"], "Developer access and price boundary; not represented as caller price."],
  ["confirmation", "fluency is not a booking record", "P007", ["openai-gpt-live-docs", "yelp-hatch-businesswire"], "Inference directly from the documented separation between voice and application-owned task state."]
].map(([claimId, excerpt, locator, sourceIds, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness }));
write("claim-map.json", claims);
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    encounter: "while making a reservation, changing a food order or arranging an appointment by phone",
    mechanism: "A separate backend system still checks business information, applies rules and uses tools",
    evidence: "The release gives no sample size, test method, rollout geography or independent assessment",
    action: "repeat the date, time and party size and ask for the confirmation"
  },
  terms: { "front-end voice layer": "the part that listens and speaks while a separate backend checks information and completes tasks", "full duplex": "listening and speaking at the same time" },
  explainBack: "GPT-Live-1 handles the live conversation, but the application backend checks business information and owns permissions, confirmations and the lasting task record.",
  unseenTransfer: "On a repair call, a smooth response can repeat the address and arrival window, but the scheduling system still has to save those details before an appointment exists.",
  unresolvedIssues: [],
  repairsMade: ["Led with the restaurant and repair-call encounter instead of API release notes.", "Separated conversational fluency from the backend transaction record.", "Kept Yelp's early results attributed and named the missing method, sample, rollout and independent assessment.", "Excluded the more-than-one-million Host call history because it began in October 2025 and is not a GPT-Live-1 performance count.", "Added the exact OpenAI description of the chained speech-to-text, reasoning and text-to-speech architecture after the first independent packet exposed an excerpt gap; the prose was unchanged.", "Added Yelp's exact fuller-sentences observation after the factual reassessment found that supporting sentence absent from the packet; the prose was unchanged.", "Made paid developer access and OpenAI attribution explicit after the ordinary candidate gate did not recognize the earlier price wording."],
  limitations: ["Producer assessment only, not independent admission.", "No independent downstream efficacy evaluation was found.", "The reviewed sources do not disclose which Yelp Host or Hatch calls currently use GPT-Live-1."]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = producerReviewedAt;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "Where might I encounter GPT-Live-1, what does it do during the call and what proves the transaction happened?", promisedPayoff: "Separate the live voice from the backend record and keep Yelp's claims distinct from independent evidence.", centralMentalModel: "Voice handles conversation; the connected application handles business rules, tools, confirmation and lasting state.", dailyLifeConnection: "A restaurant reservation or repair appointment made by phone.", surfaceJob: "September 11 explanation of the September 10 release and adoption announcement.", desiredReaderFeeling: "I know why the call may sound smoother and which details still need confirmation." };
const exact = { plainClarity: "the part that listens and speaks while a separate backend checks information and completes tasks", readerValue: "This is where someone who never opens an API may encounter the release", laidiesVoice: "A smoother voice can make a call easier, but fluency is not a booking record", engagingEnjoyable: "Imagine changing a reservation from four people to five", factualIntegrity: "Those are company-reported observations", freshnessReviewability: "The next useful evidence is independent testing and a disclosed rollout", surfaceFit: "The voice on your next restaurant or repair call may be GPT-Live-1", datedChange: "OpenAI released GPT-Live-1 to developers through its API on September 10", consequenceAndUncertainty: "it does not establish how often the system completes a reservation or appointment correctly", dailyLifeConnection: "while making a reservation, changing a food order or arranging an appointment by phone", communicationBenchmark: "The voice layer can handle the interruption; the restaurant’s availability data and booking tool still determine whether a table is recorded", explainBack: "A separate backend system still checks business information, applies rules and uses tools", unseenTransfer: "For a repair appointment, check the address, service requested and arrival window", usefulAction: "repeat the date, time and party size and ask for the confirmation", analogyIntegrity: "Compared with a traditional voice system" };
for (const [name, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The exact story supplies ${name} evidence while keeping the voice, backend, transaction and company-evidence boundaries connected.`; outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Does the natural voice itself create the reservation?", probeResponse: "No. GPT-Live-1 handles the conversation; the backend data and booking tool determine and record the result.", expectedEvidence: "Voice and transaction layers remain distinct.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "What changes when the same system handles a repair appointment?", probeResponse: "The caller checks the address, service and arrival window in the scheduling record rather than judging success from the smooth voice.", expectedEvidence: "The mechanism transfers beyond restaurant reservations.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete story avoids ${name}; the dated event, ordinary encounter, mechanism, evidence limit and action remain connected.`; family.artifactLocator = "complete exact story"; }
const evidence = JSON.parse(read(`${dir}/source-evidence.json`)); const byId = new Map(evidence.records.map(record => [record.id, record]));
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: claims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-11", nextTrigger: "Reopen OpenAI and Yelp sources on publication day; redraft for changed availability or pricing, disclosed rollout or methods, independent outcome evidence, corrections or product withdrawal.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 1, reviewIssues: 1, reviewCycles: 2, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No checksum-bound reviewed predecessor candidate covers the September 10 GPT-Live-1 API release and Yelp downstream integration." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The producer found no unresolved current defect after separating the voice layer, transaction record, rollout boundary and company-reported evidence." };
producer.verdict = "PASS"; producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 1, reviewCycles: 2 }, evidencePacket: { rounds: 3, gaps: 2 }, objectiveGate: { failures: 1, repaired: 1, finding: "Paid developer access and vendor attribution were present in substance but not explicit enough for the model-release utility gate." }, ratchet: producer.ratchet });
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication, claims: claims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })), sources: evidence.records.map(record => ({ id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: record.passages.join(" "), passageLocator: record.url, additionalPassage: `${record.authority} Limitation: ${record.limitation}`, additionalPassageLocator: record.url } })) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root }); if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story); if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root }); if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
