#!/usr/bin/env node
// Assemble the actual checksum-bound Claude judgment into the repository's
// ordinary-story review and candidate schemas. This creates no editorial verdict.
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
// The provider reads the serialized story and can quote JSON-escaped HTML
// attributes. Admission checks the parsed public prose fields, so normalize
// only that serialization escape before binding exact candidate evidence.
const publicEvidence = evidence => (evidence || []).map(item => ({
  ...item,
  excerpt: item.excerpt.replaceAll('\\"', '"')
}));
const analysis = value => ({
  evidenceType: "AI_EDITORIAL_ANALYSIS",
  prompt: value.question,
  response: value.answer,
  expectedEvidence: value.expectedEvidence,
  assessment: value.assessment
});

const runtime = c("independent-review", "runtime-claude-fable-20260911-v1");
const output = c("independent-review", "final-v1");
const checked = json(path.join(runtime, "article-editorial-checked.json"));
const judgment = json(path.join(runtime, "article-editorial-judgment.json"));
const raw = json(path.join(runtime, "article-editorial-provider.raw.json"));
const packet = json(path.join(runtime, "article-editorial-packet.json"));
const story = json(c("story.json"));
const producer = json(c("producer-publication-review.json"));
const editorialInput = json(c("editorial-input.json"));
const storyTypeCoverage = json(c("story-type-coverage.json"));
const reviewText = read(c("review-text.json")).toString("utf8");
const storySha256 = sha256(Buffer.from(stable(story)));
const principal = "anthropic:claude-fable-5:newsstand-editorial:medium";

assert.equal(packet.completeArtifact, reviewText, "Reviewer saw different prose");
assert.equal(checked.verdict, "PASS", "Checked review is not PASS");
assert.equal(checked.reader.verdict, "PASS", "Reader review is not PASS");
assert.equal(checked.facts.verdict, "PASS", "Factual review is not PASS");
assert.equal(raw.is_error, false, "Provider returned error");
assert.equal(raw.subtype, "success", "Provider run did not complete");
assert.ok(Object.keys(raw.modelUsage || {}).includes("claude-fable-5"), "Claude Fable model receipt missing");
assert.deepEqual(raw.structured_output, judgment, "Saved judgment differs from provider output");
assert.equal(checked.rawSha256, bind(path.join(runtime, "article-editorial-provider.raw.json")).sha256, "Checked/raw binding changed");
assert.equal(checked.reader.learningDisposition.disposition, "NO_NEW_DEFECT");
assert.equal(checked.facts.learningDisposition.disposition, "NO_NEW_DEFECT");
assert.ok(Date.parse(checked.completedAt) > Date.parse(producer.reviewedAt), "Independent review must follow producer review");
assert.equal(bind(c("publication-base.js")).sha256, "4c63ed2d1efe859360e6ac485a09b7fd831694b26f600605db83a25386c2bc70", "Publication base changed");

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
  artifactEvidence: publicEvidence(value.artifactEvidence),
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
    candidateEvidence: publicEvidence(fact.artifactEvidence),
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
    artifactEvidence: publicEvidence(value.artifactEvidence)
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
  readerProviderRaw: bind(path.join(runtime, "article-editorial-provider.raw.json")),
  factualProviderRaw: bind(path.join(runtime, "article-editorial-provider.raw.json")),
  factualJudgment: bind(path.join(runtime, "article-editorial-judgment.json")),
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
  reviewedAt: checked.completedAt,
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
    "GreyNoise remains the source for the campaign totals and AI attribution; PaperCut explicitly says it has not independently verified the indicators. Motive and downstream outcomes remain unknown."
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
console.log(JSON.stringify({ status: "PAPERCUT_CANDIDATE_ASSEMBLED", storySha256, review: reviewBinding, raw: rawBinding, claimMap: claimBinding, candidate: ordinaryBinding }));
