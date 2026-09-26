#!/usr/bin/env node
// Assemble actual checksum-bound Claude reader and factual judgments into the
// repository's ordinary-story schemas. This creates no editorial verdict.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../..");
const candidate = path.relative(root, path.dirname(fileURLToPath(import.meta.url)));
const p = (...parts) => path.join(root, ...parts);
const c = (...parts) => p(candidate, ...parts);
const read = file => fs.readFileSync(file);
const json = file => JSON.parse(read(file));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const bind = file => ({ path: path.relative(root, file).split(path.sep).join("/"), sha256: sha256(read(file)) });
const stable = value => value === null || typeof value !== "object"
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const bytes = `${JSON.stringify(value, null, 2)}\n`;
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") !== bytes) throw Error(`Preserve differing assembly output: ${file}`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, bytes, { flag: "wx" });
  return bind(file);
};
const state = value => value === "pass" ? "PASS" : value === "hold" ? "HOLD" : "FAIL";
const analysis = value => ({
  evidenceType: "AI_EDITORIAL_ANALYSIS",
  prompt: value.question,
  response: value.answer,
  expectedEvidence: value.expectedEvidence,
  assessment: value.assessment
});

const readerRuntime = c("independent-review", "runtime-claude-fable-20260911-v4");
const factualRuntime = readerRuntime;
const intermediateRuntime = c("independent-review", "runtime-claude-fable-20260911-v2");
const firstRuntime = c("independent-review", "runtime-claude-fable-20260911-v1");
const output = c("independent-review", "final-v3");
const checked = json(path.join(factualRuntime, "article-editorial-checked.json"));
const factualChecked = checked;
const factualJudgment = json(path.join(factualRuntime, "article-editorial-judgment.json"));
const factualRaw = json(path.join(factualRuntime, "article-editorial-provider.raw.json"));
const factualPacket = json(path.join(factualRuntime, "article-editorial-packet.json"));
const readerRaw = json(path.join(readerRuntime, "article-editorial-provider.raw.json"));
const story = json(c("story.json"));
const publicProse = ["headline", "front_read", "weeklyHighlights", "the_story", "laidies_read", "what_this_means", "cocktail_party", "class_notes", "watch_fors", "closing_note"]
  .flatMap(key => Array.isArray(story?.[key]) ? story[key] : [story?.[key]])
  .filter(value => typeof value === "string");
const normalizeEvidence = evidence => (evidence || []).map(item => {
  if (publicProse.some(value => value.includes(item.excerpt))) return item;
  const decoded = item.excerpt.replaceAll('\\"', '"');
  assert.ok(publicProse.some(value => value.includes(decoded)), `Reviewer evidence does not occur in public prose: ${item.locator}`);
  return { ...item, excerpt: decoded };
});
const producer = json(c("producer-publication-review.json"));
const editorialInput = json(c("editorial-input.json"));
const storyTypeCoverage = json(c("story-type-coverage.json"));
const reviewText = read(c("review-text.json")).toString("utf8");
const storySha256 = sha256(Buffer.from(stable(story)));
const principal = "anthropic:claude-fable-5:newsstand-editorial:medium";

assert.equal(factualPacket.completeArtifact, reviewText, "Factual reviewer saw different prose");
assert.equal(checked.verdict, "PASS", "Combined checked review is not PASS");
assert.equal(checked.reader.verdict, "PASS", "Reader review is not PASS");
assert.equal(checked.facts.verdict, "PASS", "Factual review is not PASS");
assert.equal(factualChecked.verdict, "PASS", "Factual checked artifact is not PASS");
assert.equal(factualRaw.is_error, false, "Factual provider returned error");
assert.equal(factualRaw.subtype, "success", "Factual provider run did not complete");
assert.ok(Object.keys(factualRaw.modelUsage || {}).includes("claude-fable-5"), "Claude Fable factual model receipt missing");
assert.ok(Object.keys(readerRaw.modelUsage || {}).includes("claude-fable-5"), "Claude Fable reader model receipt missing");
assert.deepEqual(factualRaw.structured_output, factualJudgment, "Saved factual judgment differs from provider output");
assert.equal(factualChecked.rawSha256, bind(path.join(factualRuntime, "article-editorial-provider.raw.json")).sha256, "Checked/raw binding changed");
assert.equal(checked.reader.learningDisposition.disposition, "NO_NEW_DEFECT");
assert.equal(checked.facts.learningDisposition.disposition, "NO_NEW_DEFECT");
assert.ok(Date.parse(factualChecked.completedAt) > Date.parse(producer.reviewedAt), "Independent review must follow producer review");
assert.equal(bind(c("publication-base.js")).sha256, "71bd056777df83f2d14b64df4f99fed2219cf8df99e4ddd7209e78db513aedeb", "Publication base changed");

const calibrationSource = json(p("operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910/independent-review/final-v1/independent-review.json")).calibration;
const calibrationResult = json(p("operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/calibration-result.json"));
assert.equal(calibrationResult.status, "CALIBRATION_PASSED");
assert.equal(calibrationSource.registrySha256, calibrationResult.registrySha256);
assert.equal(calibrationSource.reviewerPrincipalId, principal);

const outcomes = Object.fromEntries([
  ...Object.entries(checked.reader.outcomes),
  ...Object.entries(checked.facts.outcomes)
].map(([name, value]) => [name, {
  verdict: state(value.state),
  observation: value.reason,
    artifactEvidence: normalizeEvidence(value.artifactEvidence),
  ...(name === "explainBack" ? { aiEditorialAnalysis: analysis(checked.reader.explainBack) } : {}),
  ...(name === "unseenTransfer" ? { aiEditorialAnalysis: analysis(checked.reader.unseenTransfer) } : {})
}]));

const producerClaims = new Map(producer.factualReview.claimMap.map(claim => [claim.claimId, claim]));
assert.deepEqual([...producerClaims.keys()].sort(), Object.keys(checked.facts.claims).sort(), "Claim sets differ");
const claimMap = Object.entries(checked.facts.claims).map(([claimId, fact]) => {
  const source = producerClaims.get(claimId);
  assert.ok(["supported", "qualified"].includes(fact.state), `Claim did not pass: ${claimId}`);
  return {
    ...source,
    status: fact.state === "supported" ? "VERIFIED" : "QUALIFIED",
    candidateEvidence: normalizeEvidence(fact.artifactEvidence),
    scopeAndFreshness: fact.reason
  };
});

const editorialAnalysis = {
  evidenceType: "AI_EDITORIAL_ANALYSIS",
  candidateId: story.id,
  reviewerPrincipalId: principal,
  reviewTextSha256: bind(c("review-text.json")).sha256,
  outcomes: {
    explainBack: analysis(checked.reader.explainBack),
    unseenTransfer: analysis(checked.reader.unseenTransfer)
  },
  checks: Object.fromEntries(Object.entries(checked.reader.newsChecks).map(([name, value]) => [name, {
    verdict: state(value.state),
    observation: value.reason,
    artifactEvidence: normalizeEvidence(value.artifactEvidence)
  }]))
};
const analysisBinding = write(path.join(output, "news-editorial-analysis.json"), editorialAnalysis);

const rawReport = {
  schemaVersion: "laidies-newsstand-combined-editorial-raw.v1",
  candidateId: story.id,
  storySha256,
  reviewerPrincipalId: principal,
  verdict: "PASS",
  findings: { reader: checked.reader.summary, facts: checked.facts.summary },
  readerProviderRaw: bind(path.join(readerRuntime, "article-editorial-provider.raw.json")),
  readerJudgment: bind(path.join(readerRuntime, "article-editorial-judgment.json")),
  factualProviderRaw: bind(path.join(factualRuntime, "article-editorial-provider.raw.json")),
  factualJudgment: bind(path.join(factualRuntime, "article-editorial-judgment.json")),
  preservedAttempts: [
    {
      status: "PROTOCOL_NORMALIZATION_FAILURE_DESPITE_PASSING_ASSESSMENTS",
      failure: bind(path.join(firstRuntime, "article-editorial-failure.json")),
      judgment: bind(path.join(firstRuntime, "article-editorial-judgment.json"))
    },
    {
      status: "FACTUAL_HOLD_MISSING_EXACT_YELP_EXCERPT",
      checked: bind(path.join(intermediateRuntime, "article-facts-checked.json")),
      judgment: bind(path.join(intermediateRuntime, "article-facts-judgment.json"))
    },
    {
      status: "OBJECTIVE_CANDIDATE_GATE_REPAIR_REQUIRED_FRESH_PROSE_REVIEW",
      priorCandidate: bind(c("independent-review", "final-v1", "ordinary-candidate.json")),
      metrics: bind(c("review-metrics.json"))
    },
    {
      status: "REVIEW_EVIDENCE_JSON_QUOTE_NORMALIZATION_REQUIRED",
      priorReceipt: bind(c("independent-review", "final-v2", "independent-review.json"))
    }
  ],
  evidenceNormalization: "One Class Notes anchor excerpt was decoded from its JSON-escaped review-packet representation to the exact public story field; the raw reviewer bytes remain bound above.",
  calibration: bind(p("operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/calibration-result.json"))
};
const rawBinding = write(path.join(output, "independent-raw-report.json"), rawReport);

const receipt = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId: story.id,
  stage: "INDEPENDENT_SEMANTIC_ADMISSION",
  contentClass: "NEWS",
  surface: "NEWSSTAND_DAILY",
  maker: producer.maker,
  reviewer: {
    id: "claude-fable-newsstand-editorial",
    principalId: principal,
    role: "independent ordinary NewsStand editorial reviewer",
    modelFamily: "anthropic",
    independentFromMaker: true,
    artifactFirst: true
  },
  reviewMode: "EXACT_PROSE_IN_FULL",
  reviewedAt: factualChecked.completedAt,
  artifact: producer.artifact,
  calibration: calibrationSource,
  reverseBrief: checked.reader.reverseBrief,
  outcomes,
  failureFamilies: Object.fromEntries(Object.entries(checked.reader.families).map(([name, value]) => [name, {
    present: value.state === "present",
    observation: value.reason,
    artifactLocator: value.artifactLocator
  }])),
  factualReview: {
    disposition: "CLAIMS_REVIEWED",
    sourceBindings: producer.factualReview.sourceBindings,
    claimMap,
    reviewedThrough: "2026-09-11",
    nextTrigger: producer.factualReview.nextTrigger,
    correctionOwner: producer.factualReview.correctionOwner
  },
  ratchet: producer.ratchet,
  lineage: producer.lineage,
  learningDisposition: {
    disposition: "NO_NEW_DEFECT",
    rationale: `${checked.reader.learningDisposition.rationale} ${checked.facts.learningDisposition.rationale}`
  },
  verdict: "PASS",
  limitations: [
    "AI editorial assessment only; no observed human-comprehension evidence is claimed.",
    "Two source-packet issues were repaired without changing prose. The ordinary candidate gate then required explicit paid-access and vendor-attribution wording; that small prose repair received a fresh full independent review, and all earlier attempts remain preserved."
  ],
  newsEditorialReview: {
    policy: bind(p("operations/product-stewards/newsstand/ordinary-news-editorial-policy.json")),
    analysis: analysisBinding
  },
  reportBinding: rawBinding
};
const reviewBinding = write(path.join(output, "independent-review.json"), receipt);
const claimBinding = write(path.join(output, "publication-claim-map.json"), claimMap);

const evidenceBinding = producer.factualReview.sourceBindings[0];
assert.equal(editorialInput.sources.length, story.sources.length);
const ordinary = {
  schemaVersion: "newsstand-ordinary-story-candidate-v2",
  candidateStatus: "READY_FOR_ISSUE_ADMISSION",
  candidateId: story.id,
  editionDate: "2026-09-11",
  story,
  storyTypeCoverage,
  storySha256,
  publicationBase: bind(c("publication-base.js")),
  sourceText: bind(c("review-text.json")),
  claimMap: claimBinding,
  producerContract: bind(c("producer-contract.json")),
  draftPreparation: {
    writerInput: bind(c("writer-input-current.json")),
    observations: bind(c("producer-observations.json"))
  },
  sources: story.sources.map(source => ({ id: source.id, url: source.url, evidence: evidenceBinding })),
  reviewEvidence: {
    producer: bind(c("producer-publication-review.json")),
    independent: reviewBinding,
    independentRawReport: rawBinding
  },
  lineage: null
};
const ordinaryBinding = write(path.join(output, "ordinary-candidate.json"), ordinary);
console.log(JSON.stringify({ status: "GPT_LIVE_CANDIDATE_ASSEMBLED", storySha256, review: reviewBinding, raw: rawBinding, claimMap: claimBinding, candidate: ordinaryBinding }));
