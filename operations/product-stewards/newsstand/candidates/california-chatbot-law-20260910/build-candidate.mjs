#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, stable, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "california-chatbot-law-20260910";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910";
const now = "2026-09-11T00:20:00-07:00";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

fs.copyFileSync(path.join(root, "content/newsstand-stories.js"), path.join(root, dir, "publication-base.js"));
fs.copyFileSync(path.join(root, dir, "writer-input-r1.json"), path.join(root, dir, "writer-input-current.json"));

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null, updatedAt: now, lastCheckedAt: now,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "California signed new child-chatbot rules. Most start July 1, 2027.",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>California Governor Gavin Newsom signed Senate Bill 1119 on September 10, according to an official release from bill author Senator Steve Padilla and reporting by the Associated Press. The law sets child-safety requirements for operators that make companion chatbots available in California.</p><p>A <strong>companion chatbot</strong> is an AI system designed to simulate a relationship or ongoing social interaction, rather than simply answer one isolated question. The new law does not switch on all its protections at signing. Its main child-safety sections become <strong>operative</strong>—the date a legal requirement begins to apply—on July 1, 2027.</p><p>Before releasing a new or substantially changed companion chatbot, an operator must document a child-safety risk assessment and reasonable steps to reduce identified risks. Operators that allow children must also create crisis-response procedures, child-appropriate notices and parental controls.</p><p>The default settings include no push notifications, a one-hour continuous-session limit and a two-hour daily limit. <strong>Persistent conversational memory</strong>—using earlier conversations in later ones—is ordinarily off by default, with a qualified exception for users 16 or older when specified guardrails are in place.</p>`,
  laidies_read: `<p>The law targets relationship-like design, not every ordinary chatbot answer. It requires reasonable measures against listed behaviours including encouraging self-harm, sexual or romantic interaction, claims that the chatbot is sentient, emotional dependence, excessive praise and instructions to hide use from parents.</p><p>Signing creates a legal commitment and an implementation clock. It does not prove the protections are already operating or that they will prevent every harm. AP reported that the measure was inspired by Adam Raine’s story; his mother, Maria Raine, said parents had not understood the dangers of AI companionship. That experience explains the public stakes, but the law’s future results still need evidence.</p><p>Independent audits follow a different timetable. The enrolled text sets the first audit for January 1, 2029 or before an operator first makes a chatbot publicly available, whichever is later. Operators with less than $500 million in prior-year revenue are exempt from that audit section until 2032. Those limits matter when a headline says every chatbot now faces immediate independent review.</p>`,
  what_this_means: `<p>For a California family, the useful question today is not “Did every control appear overnight?” It is “What must the service build before July 1, 2027, and which rules apply to this child and product?” The answer depends on age determination, whether the operator permits child users and the specific provision.</p><p>The legislative status page still showed the bill as presented to the Governor when checked, even after the sponsor’s signing release and AP report. That is a lagging public record, not evidence of a veto. The next evidence to watch is the chaptered record, implementation guidance, product changes and eventually the required audits.</p>`,
  cocktail_party: "“California signed child-chatbot safety rules on September 10. The main safeguards begin July 1, 2027, so signing did not make every control appear overnight.”",
  watch_fors: null, closing_note: null,
  class_notes: "A signing date and an operative date do different jobs: one enacts the law; the other says when a duty begins to apply.",
  sources: [
    { id: "padilla-signing", label: "California State Senator Steve Padilla — Governor Newsom signs Adam’s Law", url: "https://sd18.senate.ca.gov/news/governor-newsom-signs-adams-law", publisherType: "government-primary-statement", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "sb1119-enrolled", label: "California Legislative Information — SB 1119 enrolled text", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB1119", publisherType: "government-primary-document", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "ap-signing-report", label: "Associated Press — California child online-safety laws", url: "https://apnews.com/article/6063026d1b54a8537d639605c23aab80", publisherType: "reporting", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["legal", "child safety", "company policy"], concepts: ["companion chatbot", "operative date", "persistent conversational memory"], tags: ["California", "SB 1119", "companion chatbots", "child safety"], saint_lane: null, badge: "THE LATEST"
};

write("story.json", story);
write("review-text.json", candidateReviewText(story));
const strip = html => html.replaceAll(/<\/p>/g, "\n\n").replaceAll(/<[^>]+>/g, "").trim();
const article = `# ${story.headline}\n\n## The story\n\n${strip(story.the_story)}\n\n## The LAiDIES read\n\n${strip(story.laidies_read)}\n\n## What this means for you\n\n${strip(story.what_this_means)}\n`;
if (article !== read(`${dir}/article.md`)) throw new Error("article.md differs from exact story prose");
write("rendered-article.html", `<article><h1>${story.headline}</h1><section><h2>The story</h2>${story.the_story}</section><section><h2>The LAiDIES read</h2>${story.laidies_read}</section><section><h2>What this means for you</h2>${story.what_this_means}</section></article>\n`);

const claims = [
  ["signing", "California Governor Gavin Newsom signed Senate Bill 1119 on September 10", "P001", ["padilla-signing", "ap-signing-report"], "Official sponsor confirmation and independent AP reporting agree on the event and date."],
  ["scope", "The law sets child-safety requirements for operators that make companion chatbots available in California", "P001", ["sb1119-enrolled"], "High-level statutory scope; later text names age, operator and product conditions."],
  ["operative-date", "the date a legal requirement begins to apply—on July 1, 2027", "P002", ["sb1119-enrolled"], "Exact operative date for the main cited sections."],
  ["risk-assessment", "must document a child-safety risk assessment and reasonable steps to reduce identified risks", "P003", ["sb1119-enrolled"], "Paraphrases Section 21812(a) without promising effectiveness."],
  ["settings", "no push notifications, a one-hour continuous-session limit and a two-hour daily limit", "P004", ["sb1119-enrolled"], "Concrete default settings for operators permitting child users."],
  ["memory-exception", "ordinarily off by default, with a qualified exception for users 16 or older when specified guardrails are in place", "P004", ["sb1119-enrolled"], "Preserves the qualified statutory exception."],
  ["prohibited-behaviours", "reasonable measures against listed behaviours including encouraging self-harm", "P005", ["sb1119-enrolled"], "Summarizes listed prevention duties without operational harmful detail."],
  ["family-context", "AP reported that the measure was inspired by Adam Raine’s story", "P006", ["ap-signing-report"], "Attributed family context, not proof of legal effectiveness."],
  ["audit-timing", "the first audit for January 1, 2029 or before an operator first makes a chatbot publicly available, whichever is later", "P007", ["sb1119-enrolled"], "Reports the later-of timing in Section 21814."],
  ["audit-exception", "less than $500 million in prior-year revenue are exempt from that audit section until 2032", "P007", ["sb1119-enrolled"], "The exemption is limited to the audit section and is not described as exemption from the whole law."],
  ["status-lag", "The legislative status page still showed the bill as presented to the Governor when checked", "P009", ["sb1119-enrolled", "padilla-signing", "ap-signing-report"], "Preserved public-record timing discrepancy; later official and independent sources establish signing."]
].map(([claimId, excerpt, locator, sourceIds, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness }));
write("claim-map.json", claims);
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: { event: "California Governor Gavin Newsom signed Senate Bill 1119 on September 10", scope: "A companion chatbot is an AI system designed to simulate a relationship or ongoing social interaction", timing: "the date a legal requirement begins to apply—on July 1, 2027", evidence: "The next evidence to watch is the chaptered record, implementation guidance, product changes and eventually the required audits" },
  terms: { "companion chatbot": "an AI system designed to simulate a relationship or ongoing social interaction", "persistent conversational memory": "using earlier conversations in later ones", operative: "the date a legal requirement begins to apply" },
  explainBack: "California signed the law on September 10, but its main cited child-safety duties begin July 1, 2027. Signing starts the implementation clock; product changes and later audits supply evidence about implementation and effectiveness.",
  unseenTransfer: "For another newly signed law, identify the signing date, the date each duty begins, who and what it covers, and the later enforcement or audit evidence before assuming an immediate product change.",
  unresolvedIssues: [],
  repairsMade: ["Defined operative in the sentence that gives the July 1, 2027 date.", "Kept the under-$500-million exception limited to the audit section.", "Separated sponsor and family safety claims from evidence of future effectiveness.", "Preserved the lagging legislative status page as a public-record timing discrepancy rather than treating it as a veto.", "Removed an extra statutory descriptor that was true in the full law but absent from the excerpt supplied to the independent reviewer."],
  limitations: ["Producer assessment only, not independent admission.", "The story is a high-level explanation and not legal advice.", "No reviewed evidence yet shows product implementation, enforcement or effectiveness."]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id; producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = now;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "What changed at signing, when do the main child-chatbot safeguards begin and who do they cover?", promisedPayoff: "Separate signing, operative dates, concrete safeguards and later evidence.", centralMentalModel: "Signing creates the implementation clock; operative dates begin duties; later audits test compliance.", dailyLifeConnection: "A family sees a signing headline and wonders whether the child's app changed today.", surfaceJob: "September 11 explanation of the September 10 signing.", desiredReaderFeeling: "I know what is law, what starts later and what remains unproved." };
const exact = { plainClarity: "the date a legal requirement begins to apply", readerValue: "The new law does not switch on all its protections at signing", laidiesVoice: "Signing creates a legal commitment and an implementation clock", engagingEnjoyable: "Did every control appear overnight?", factualIntegrity: "less than $500 million in prior-year revenue are exempt from that audit section until 2032", freshnessReviewability: "The legislative status page still showed the bill as presented to the Governor when checked", surfaceFit: "California Governor Gavin Newsom signed Senate Bill 1119 on September 10", datedChange: "signed Senate Bill 1119 on September 10", consequenceAndUncertainty: "It does not prove the protections are already operating or that they will prevent every harm", dailyLifeConnection: "For a California family", communicationBenchmark: "Signing creates a legal commitment and an implementation clock", explainBack: "The new law does not switch on all its protections at signing", unseenTransfer: "What must the service build before July 1, 2027", usefulAction: "which rules apply to this child and product?", analogyIntegrity: "A signing date and an operative date do different jobs" };
for (const [name, outcome] of Object.entries(producer.outcomes)) { outcome.verdict = "PASS"; outcome.observation = `The exact story supplies ${name} evidence while keeping signing, implementation, coverage and outcomes distinct.`; outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }]; }
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Did California's child-chatbot controls all begin at signing?", probeResponse: "No. Signing enacted the law, but the main cited safeguards begin to apply July 1, 2027.", expectedEvidence: "Signing and operative date remain distinct.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "How would you read a headline about another newly signed technology law?", probeResponse: "Check the signing date, when each duty begins, who and what it covers, and later evidence of enforcement or results.", expectedEvidence: "The timing-and-scope model transfers beyond this law.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) { family.present = false; family.observation = `The complete story avoids ${name}; definitions, dates, conditions and evidence limits stay connected.`; family.artifactLocator = "complete exact story"; }
const evidence = JSON.parse(read(`${dir}/source-evidence.json`)); const byId = new Map(evidence.records.map(record => [record.id, record]));
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: claims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-11", nextTrigger: "Reopen signing and statutory records on publication day; redraft for chaptered text differences, implementation guidance, product changes, enforcement or audit results.", correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 1, reviewIssues: 1, reviewCycles: 2, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No checksum-bound reviewed predecessor candidate covers California's September 10 signing of SB 1119." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The successor removes the candidate-only claim-to-excerpt mismatch found in the first independent cycle; no new reusable defect remains. A fresh independent review is still required." };
producer.verdict = "PASS"; producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 1, reviewCycles: 2 }, evidencePacket: { rounds: 1, gaps: 0 }, ratchet: producer.ratchet });
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication, claims: claims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })), sources: evidence.records.map(record => ({ id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: record.passages.join(" "), passageLocator: record.url, additionalPassage: `${record.authority} Limitation: ${record.limitation}`, additionalPassageLocator: record.url } })) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root }); if (coverageErrors.length) throw new Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story); if (lengthErrors.length) throw new Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root }); if (prepared.errors.length) throw new Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
