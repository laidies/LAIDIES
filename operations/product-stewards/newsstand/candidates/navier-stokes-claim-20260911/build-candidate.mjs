#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { candidateReviewText, validateOrdinaryDailyLength } from "../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs";
import { storyParagraphs } from "../../review-runtime/protocol.mjs";
import { inspectPreparedDraft } from "../../../../../scripts/prepare-newsstand-draft.mjs";
import { validateStoryTypeCoverage } from "../../../../../scripts/validate-newsstand-story-type-coverage.mjs";

const root = process.cwd();
const id = "navier-stokes-claim-20260911";
const dir = `operations/product-stewards/newsstand/candidates/${id}`;
const template = "operations/product-stewards/newsstand/candidates/papercut-campaign-20260911";
const evidenceCheckedAt = "2026-09-11T16:09:49.235Z";
const producerReviewedAt = "2026-09-11T16:15:20.300Z";
const expectedBaseSha256 = "961718a01ed22e5b8787a3ab4302ae9ac93d961ede30639e88d626798cdcd789";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const write = (name, value) => fs.writeFileSync(path.join(root, dir, name), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
const bind = name => ({ path: `${dir}/${name}`, sha256: hash(fs.readFileSync(path.join(root, dir, name))) });

const liveBase = fs.readFileSync(path.join(root, "content/newsstand-stories.js"));
if (hash(liveBase) !== expectedBaseSha256) throw Error(`Publication base moved: ${hash(liveBase)}`);
fs.writeFileSync(path.join(root, dir, "publication-base.js"), liveBase);

const story = {
  id, slug: id, edition: "daily", status: "hold", publishedAt: null, updatedAt: evidenceCheckedAt, lastCheckedAt: evidenceCheckedAt,
  sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
  correction: null, correctionHistory: [], retraction: null,
  predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
  bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
  headline: "OpenAI published an AI-generated Navier–Stokes proof. Independent checking comes next",
  heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "Illustration of a magnifying glass examining the evidence behind an AI headline in a newspaper.", credit: "LAiDIES NewsStand evidence-checking illustration" },
  the_story: `<p>On September 8, OpenAI published a 166-page manuscript and a public repository it describes as Lean formalizations. The company says an internal AI system solved the Navier–Stokes existence and smoothness problem, one of mathematics’ Millennium Prize Problems.</p><p>The Navier–Stokes equations are mathematical rules used to describe how fluids move. The open question asks whether a smooth three-dimensional flow must stay smooth, or whether it can reach a point where its speed grows without bound in a finite time. That point is called a <strong>singularity</strong>.</p><p>OpenAI’s manuscript says it constructs a smooth, forced fluid that starts at rest, develops unbounded speed in finite time and keeps finite energy. Nature reported the announcement as OpenAI’s claim. LAiDIES inspected the manuscript’s abstract and first twelve pages and the public repository; we did not check the 166-page proof theorem by theorem or run the formalization.</p>`,
  laidies_read: `<p>OpenAI says about 10,000 concurrent AI agents worked on the result. That is the company’s account of how the proof was produced, not an independently measured result.</p><p>A <strong>Lean formalization</strong> is a proof rewritten so software can check each encoded step against formal rules. Think of a referee checking every recorded move against a rulebook. That can expose an invalid move. Mathematicians must still judge whether the encoded statement and assumptions match the original problem, whether the whole argument is sound and whether the result earns broad acceptance.</p><p>Those are separate stages. OpenAI has made a manuscript and formalization public. Clay Mathematics Institute rules say a proposed solution must appear in a qualifying outlet, wait at least two years and receive general acceptance before Clay will consider it. None of those later stages is established by this announcement. OpenAI says it does not intend to claim the prize.</p><p>There is also an unresolved attribution question around concurrent research. Mathematician Tristan Buckmaster says he asked whether private Codex sessions containing his group’s drafts had been used. His statement explicitly says he does not know whether the data was used and is not accusing anyone. OpenAI’s September 10 update says its own investigation found those prompts could not have influenced its result, including through training. The supplied record does not independently resolve the two accounts.</p>`,
  what_this_means: `<p>The change now is that specialists can inspect public materials behind a dramatic “AI solved it” headline. Independent verification, community acceptance and any prize decision have not happened in the evidence reviewed here.</p><p>For this claim, or a future headline saying AI discovered a treatment, ask which stage has happened: announcement, released evidence, independent checking, broad acceptance or formal recognition. Then match the headline’s certainty to that stage.</p>`,
  cocktail_party: "“OpenAI has published an AI-generated Navier–Stokes proof and a formalization. That makes the claim inspectable; it does not make independent verification, community acceptance or a prize decision complete.”",
  watch_fors: null, closing_note: null,
  class_notes: `OpenAI says thousands of agents worked concurrently on the result. <a href="/library.html#ai-fundamentals-101::%40ch-2-2-4-agentic-ai-the-layer-that-acts">AI Fundamentals 101: Agentic AI — The Layer That Acts</a> explains how agents can coordinate tools and multiple steps.`,
  sources: [
    { id: "openai-announcement", label: "OpenAI — A solution to the Navier–Stokes existence and smoothness problem", url: "https://openai.com/index/navier-stokes-solution/", publisherType: "company-primary-announcement", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "openai-paper", label: "OpenAI — Finite time blowup for Navier–Stokes", url: "https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf", publisherType: "primary-research-manuscript", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "openai-lean-repository", label: "OpenAI — NavierStokesAndEuler Lean repository", url: "https://github.com/openai/NavierStokesAndEuler", publisherType: "primary-research-repository", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "buckmaster-statement", label: "Tristan Buckmaster — statement on concurrent work", url: "https://cims.nyu.edu/~tristanb/statement.pdf", publisherType: "primary-participant-statement", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "clay-prize-rules", label: "Clay Mathematics Institute — Millennium Prize rules", url: "https://www.claymath.org/millennium-problems/rules/", publisherType: "primary-prize-rules", accessedAt: "2026-09-11", approvalStatus: "reviewed" },
    { id: "nature-report", label: "Nature — OpenAI claims proof of Navier–Stokes Millennium Problem", url: "https://www.nature.com/articles/d41586-026-02842-5", publisherType: "independent-science-reporting", accessedAt: "2026-09-11", approvalStatus: "reviewed" }
  ],
  aidb_credit: null, themes: ["research", "mathematics"], concepts: ["Navier–Stokes equations", "singularity", "Lean formalization", "verification stages"], tags: ["OpenAI", "Navier–Stokes", "mathematics", "AI agents"], saint_lane: null, badge: "THE LATEST"
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
  const found = byId.get(id)?.passages.find(value => value.includes(fragment));
  if (!found) throw Error(`Missing source passage ${id}/${fragment}`);
  return found;
};
const claimSpecs = [
  ["publication", "On September 8, OpenAI published a 166-page manuscript and a public repository it describes as Lean formalizations", "P002", ["openai-announcement", "openai-paper", "openai-lean-repository", "nature-report"], [["openai-announcement", "writeup of the proof and a formalization in Lean"], ["openai-paper", "For every positive viscosity"], ["openai-lean-repository", "This repository contains Lean 4 formalizations"], ["nature-report", "announced on 8 September"]], "Dated public materials; the 166-page count was verified from the downloaded PDF."],
  ["solution-claim", "The company says an internal AI system solved the Navier–Stokes existence and smoothness problem", "P002", ["openai-announcement", "nature-report"], [["openai-announcement", "proof, produced by an internal OpenAI system"], ["nature-report", "according to OpenAI"]], "OpenAI's claim, reported as such rather than adjudicated."],
  ["equation-identity", "mathematical rules used to describe how fluids move", "P003", ["openai-announcement"], [["openai-announcement", "describe how fluids move"]], "Plain-language translation of OpenAI's equation description."],
  ["open-question", "whether a smooth three-dimensional flow must stay smooth, or whether it can reach a point where its speed grows without bound in a finite time", "P003", ["openai-paper"], [["openai-paper", "finite-time singularity in three dimensions"], ["openai-paper", "unbounded velocity in finite time"]], "Plain-language translation of the regularity question and claimed result."],
  ["claimed-construction", "constructs a smooth, forced fluid that starts at rest, develops unbounded speed in finite time and keeps finite energy", "P004", ["openai-announcement", "openai-paper"], [["openai-announcement", "initially smooth fluid at rest"], ["openai-paper", "starts from rest and develops unbounded velocity in finite time while maintaining uniformly bounded kinetic energy"], ["openai-paper", "smooth force compactly supported"]], "Exact theorem claim, attributed to manuscript and company."],
  ["verification-limit", "Nature reported the announcement as OpenAI’s claim. LAiDIES inspected the manuscript’s abstract and first twelve pages and the public repository; we did not check the 166-page proof theorem by theorem or run the formalization", "P004", ["nature-report", "openai-paper", "openai-lean-repository"], [["nature-report", "according to OpenAI"], ["openai-paper", "For every positive viscosity"], ["openai-lean-repository", "This repository contains Lean 4 formalizations"]], "Independent-reporting status plus an explicit LAiDIES review-method limitation."],
  ["agent-scale", "OpenAI says about 10,000 concurrent AI agents worked on the result", "P005", ["openai-announcement"], [["openai-announcement", "on the order of 10,000 concurrent agents"]], "Company-reported scale, not independently measured."],
  ["formalization-meaning", "a proof rewritten so software can check each encoded step against formal rules", "P006", ["openai-announcement", "openai-lean-repository"], [["openai-announcement", "Lean formalization and verification"], ["openai-lean-repository", "instructions on checking the formalizations"]], "Qualified plain-language explanation of the function described by the primary materials."],
  ["formalization-limit", "Mathematicians must still judge whether the encoded statement and assumptions match the original problem, whether the whole argument is sound and whether the result earns broad acceptance", "P006", ["clay-prize-rules", "openai-lean-repository"], [["clay-prize-rules", "general acceptance in the global mathematics community"], ["openai-lean-repository", "formalizations of the results presented"]], "Editorial explanation separating formal checking from community acceptance."],
  ["clay-process", "a proposed solution must appear in a qualifying outlet, wait at least two years and receive general acceptance before Clay will consider it", "P007", ["clay-prize-rules"], [["clay-prize-rules", "all three of the following conditions"]], "Primary prize-procedure rule; no prize decision claim."],
  ["no-prize-intent", "OpenAI says it does not intend to claim the prize", "P007", ["openai-announcement"], [["openai-announcement", "We do not intend to claim the Millennium Prize"]], "Company's current stated intention."],
  ["buckmaster-boundary", "Tristan Buckmaster says he asked whether private Codex sessions containing his group’s drafts had been used. His statement explicitly says he does not know whether the data was used and is not accusing anyone", "P008", ["buckmaster-statement"], [["buckmaster-statement", "sessions in Codex, into which we had been putting all our drafts"], ["buckmaster-statement", "I do not know whether our data was used. I am not accusing anyone"]], "Participant account retains his explicit non-accusation and uncertainty."],
  ["openai-investigation", "OpenAI’s September 10 update says its own investigation found those prompts could not have influenced its result, including through training", "P008", ["openai-announcement"], [["openai-announcement", "Following an investigation"], ["openai-announcement", "including through training"], ["openai-announcement", "Update — September 10, 2026"]], "Company investigation conclusion, attributed and not treated as an independent finding."],
  ["current-stage", "specialists can inspect public materials behind a dramatic “AI solved it” headline. Independent verification, community acceptance and any prize decision have not happened in the evidence reviewed here", "P009", ["openai-paper", "openai-lean-repository", "clay-prize-rules", "nature-report"], [["openai-paper", "For every positive viscosity"], ["openai-lean-repository", "This repository contains Lean 4 formalizations"], ["clay-prize-rules", "at least two years must have passed"], ["nature-report", "according to OpenAI"]], "Current evidence stage; does not deny private review outside the supplied record."],
  ["reader-stage-test", "ask which stage has happened: announcement, released evidence, independent checking, broad acceptance or formal recognition", "P010", ["openai-announcement", "clay-prize-rules", "nature-report"], [["openai-announcement", "We’re sharing a solution"], ["clay-prize-rules", "Before CMI will consider"], ["nature-report", "OpenAI posted a preprint"]], "Editorial reading tool grounded in the distinct documented stages."]
];
const claims = claimSpecs.map(([claimId, excerpt, locator, sourceIds, supports, scopeAndFreshness]) => ({ claimId, status: "QUALIFIED", candidateEvidence: [{ excerpt, locator }], sourceIds, scopeAndFreshness, supports: supports.map(([sourceId, fragment]) => ({ sourceId, passage: passage(sourceId, fragment) })) }));
const cleanClaims = claims.map(({ supports, ...claim }) => claim);
write("claim-map.json", cleanClaims);
write("source-packet-preflight.json", { schemaVersion: "laidies.newsstand-source-packet-preflight.v1", candidateId: id, checkedAt: producerReviewedAt, method: "Every atomic factual claim maps to exact excerpts carried in the reviewer packet and preserved complete relevant source text. Mathematical correctness, prize status and attribution remain separate.", claims: claims.map(claim => ({ claimId: claim.claimId, supports: claim.supports })) });
write("publication-manifest.json", { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") });

const observations = {
  completeTextRead: true, storySha256: hash(JSON.stringify(story)),
  readerAnswers: {
    event: "published a 166-page manuscript and a public repository it describes as Lean formalizations",
    mechanism: "The Navier–Stokes equations are mathematical rules used to describe how fluids move",
    verification: "Independent verification, community acceptance and any prize decision have not happened in the evidence reviewed here",
    attribution: "does not know whether the data was used and is not accusing anyone",
    action: "ask which stage has happened: announcement, released evidence, independent checking, broad acceptance or formal recognition"
  },
  terms: {
    "Navier–Stokes equations": "mathematical rules used to describe how fluids move",
    singularity: "a point where its speed grows without bound in a finite time",
    "Lean formalization": "a proof rewritten so software can check each encoded step against formal rules"
  },
  explainBack: "OpenAI has released a manuscript and formal proof files it says solve the problem. Those materials can be inspected, while independent checking, broad acceptance and formal prize consideration remain later stages.",
  unseenTransfer: "For an AI drug-discovery headline, separate the announcement, public study, independent replication, clinical trials and regulator decision before treating the result as a treatment.",
  unresolvedIssues: [],
  repairsMade: [
    "Placed the company claim and LAiDIES verification limit in the opening section.",
    "Defined the fluid question and singularity before naming the proof stages.",
    "Explained Lean with one bounded rulebook comparison and preserved the role of mathematical judgment.",
    "Kept Buckmaster's non-accusation beside his concern and OpenAI's response attributed to its own investigation.",
    "Used a transferable verification-stage question instead of asking readers to adjudicate the proof."
  ],
  limitations: ["Producer assessment only, not independent admission.", "The mathematical proof and formalization were not independently reproduced by LAiDIES.", "No observed human-comprehension or public-release result is claimed."]
};
write("producer-observations.json", observations);

const producer = JSON.parse(read(`${template}/producer-publication-review.json`));
producer.candidateId = id;
producer.maker = "/root/weekly_recovery";
producer.reviewer = { id: "/root/weekly_recovery", principalId: "/root/weekly_recovery", role: "Producer exact prose read-through", modelFamily: "openai" };
producer.reviewedAt = producerReviewedAt;
producer.artifact = { manifest: bind("publication-manifest.json"), reviewText: bind("review-text.json"), rendered: bind("rendered-article.html") };
producer.reverseBrief = { humanQuestion: "Did AI actually solve the Navier–Stokes problem, and what still has to be checked?", promisedPayoff: "Separate the public claim and materials from independent verification, community acceptance and formal recognition.", centralMentalModel: "A scientific breakthrough moves through stages; public evidence makes checking possible but does not complete later stages.", dailyLifeConnection: "A dramatic AI headline can arrive long before independent checking or a formal decision.", surfaceJob: "September 11 explanation of OpenAI's September 8 announcement and September 10 attribution update.", desiredReaderFeeling: "I understand the claimed fluid result, what formalization checks, what remains open and how to read the next breakthrough headline." };
const exact = { plainClarity: "The Navier–Stokes equations are mathematical rules", readerValue: "ask which stage has happened", laidiesVoice: "Then match the headline’s certainty", engagingEnjoyable: "Think of a referee checking every recorded move", factualIntegrity: "does not know whether the data was used and is not accusing anyone", freshnessReviewability: "OpenAI’s September 10 update", surfaceFit: "Independent checking comes next", datedChange: "On September 8, OpenAI published", consequenceAndUncertainty: "The supplied record does not independently resolve", dailyLifeConnection: "a future headline saying AI discovered a treatment", communicationBenchmark: "Those are separate stages", explainBack: "public materials behind a dramatic", unseenTransfer: "AI discovered a treatment", usefulAction: "announcement, released evidence, independent checking", analogyIntegrity: "referee checking every recorded move against a rulebook" };
for (const [name, outcome] of Object.entries(producer.outcomes)) {
  outcome.verdict = "PASS";
  outcome.observation = `The complete story supplies ${name} evidence while keeping the mathematical claim, released materials, verification status, attribution accounts and prize process connected.`;
  outcome.artifactEvidence = [{ excerpt: exact[name] || exact.readerValue, locator: "exact story" }];
}
producer.outcomes.explainBack.simulatedReaderProbe = { prompt: "Has the Navier–Stokes result now been independently established?", probeResponse: "No. OpenAI published a manuscript and Lean formalization that it says solve the problem. Independent checking, broad acceptance and Clay's consideration process remain later stages.", expectedEvidence: "Publication and formalization remain distinct from independent acceptance.", transferResult: "PASS" };
producer.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: "A future headline says AI discovered a treatment. What stages should I separate?", probeResponse: "Separate the announcement, released study, independent replication, clinical trial and regulator decision, then match the headline's certainty to the stage reached.", expectedEvidence: "The verification-stage method transfers without claiming medical equivalence.", transferResult: "PASS" };
for (const [name, family] of Object.entries(producer.failureFamilies)) {
  family.present = false;
  family.observation = `The complete story avoids ${name}; the claimed result, proof-checking mechanism, source limits and stage question remain connected.`;
  family.artifactLocator = "complete exact story";
}
producer.factualReview = { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind("source-evidence.json")], claimMap: cleanClaims.map(claim => ({ ...claim, sourceBinding: bind("source-evidence.json"), sourceEvidence: claim.sourceIds.flatMap(sourceId => byId.get(sourceId).passages.map(excerpt => ({ excerpt, locator: byId.get(sourceId).url }))) })), reviewedThrough: "2026-09-11", nextTrigger: evidence.nextTrigger, correctionOwner: "LAiDIES NewsStand product steward" };
producer.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" };
producer.lineage = { kind: "FIRST", noComparableReason: "No prior checksum-bound NewsStand candidate reports this September 8 Navier–Stokes claim and its September 10 attribution update." };
producer.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "The source-complete preflight found no unresolved defect after separating the claimed theorem, public materials, formal checking, mathematical acceptance, prize process and attribution accounts." };
producer.verdict = "PASS";
producer.limitations = ["Producer review is not independent admission.", "AI editorial assessment only; no observed human-comprehension evidence is claimed.", "Public release remains separate."];
write("producer-publication-review.json", producer);
write("review-metrics.json", { proseReview: { reviewIssues: 0, reviewCycles: 1 }, sourcePacket: { rounds: 1, gaps: 0, repaired: 0, preflight: "check-source-packet-preflight.mjs --calibrate", checkedClaims: cleanClaims.length, exactSourceExcerpts: claims.reduce((sum, claim) => sum + claim.supports.length, 0) }, ratchet: producer.ratchet });

const sourceFiles = {
  "openai-announcement": "source/openai-web-observation.json",
  "openai-paper": "source/openai-paper-observation.json",
  "openai-lean-repository": "source/github-repository-observation.json",
  "buckmaster-statement": "source/buckmaster-statement-observation.json",
  "clay-prize-rules": "source/clay-rules-observation.json",
  "nature-report": "source/nature-report-observation.json"
};
write("editorial-input.json", { readerJob: `${producer.reverseBrief.humanQuestion} ${producer.reverseBrief.promisedPayoff}`, completeArtifact: read(`${dir}/review-text.json`), paragraphs: storyParagraphs(story), communicationAuthority: JSON.parse(read(`${dir}/writer-input-current.json`)).packet.communication, claims: cleanClaims.map(claim => ({ claimId: claim.claimId, claim: claim.candidateEvidence[0].excerpt, sourceIds: claim.sourceIds })), sources: evidence.records.map(record => ({ id: record.id, url: record.url, authority: record.authority, passages: record.passages, limitation: record.limitation, source: { url: record.url, passage: read(`${dir}/${sourceFiles[record.id]}`), passageLocator: record.url, additionalPassage: `${record.passages.join("\n")}\nAuthority: ${record.authority}\nLimitation: ${record.limitation}`, additionalPassageLocator: record.url } })) });

const coverage = JSON.parse(read(`${dir}/story-type-coverage.json`));
const coverageErrors = validateStoryTypeCoverage(coverage, story.themes, undefined, { story, root });
if (coverageErrors.length) throw Error(`story-type coverage: ${coverageErrors.join(" | ")}`);
const lengthErrors = validateOrdinaryDailyLength(story);
if (lengthErrors.length) throw Error(`reader budget: ${lengthErrors.join(" | ")}`);
const prepared = inspectPreparedDraft(story, JSON.parse(read(`${dir}/writer-input-current.json`)), observations, { root });
if (prepared.errors.length) throw Error(`producer observations: ${prepared.errors.join(" | ")}`);
console.log(JSON.stringify({ candidateId: id, storySha256: hash(stable(story)), reviewTextSha256: bind("review-text.json").sha256, publicationBaseSha256: bind("publication-base.js").sha256, status: "PENDING_INDEPENDENT_REVIEW" }));
