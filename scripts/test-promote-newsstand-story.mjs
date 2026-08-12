#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { compileStoryDatasetWrite, promoteNewsstandStory, publicStoryFromCandidate } from "./promote-newsstand-story.mjs";

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const storyRecord = {
  id: "test-story", slug: "test-story", edition: "daily", status: "hold", publishedAt: null,
  updatedAt: "2026-08-12T20:00:00Z", lastCheckedAt: "2026-08-12T20:00:00Z",
  sourceApproval: { status: "independent-review-required", record: "/operations/product-stewards/newsstand/candidates/test-claims.md" },
  correction: null, retraction: null, headline: "A bounded test story", the_story: "What happened.",
  laidies_read: "What it means.", what_this_means: "What to do.", cocktail_party: "The short version.",
  class_notes: "A durable note.", sources: [{ id: "source-1", label: "Primary source", url: "https://example.org/source", publisherType: "primary-document", accessedAt: "2026-08-12", approvalStatus: "reviewed" }]
};
const files = new Map([
  ["operations/product-stewards/newsstand/candidates/test-prose.md", "exact prose\n"],
  ["operations/product-stewards/newsstand/candidates/test-claims.md", "claim map\n"],
  ["operations/product-stewards/newsstand/evidence/test-ali-approval.md", "Ali approved the exact candidate.\n"],
  ["operations/product-stewards/newsstand/evidence/test-explain-back.md", "Observed explain-back.\n"],
  ["operations/product-stewards/newsstand/evidence/test-independent-review.json", "{}\n"],
  ["operations/product-stewards/newsstand/evidence/test-visual-review.json", "{}\n"],
  ["operations/product-stewards/newsstand/evidence/test-render.html", "<article>Exact render</article>\n"],
  ["operations/product-stewards/newsstand/candidates/test-producer.json", "{}\n"]
]);
const readBoundFile = (record) => {
  if (!files.has(record)) throw new Error(`missing test bound file: ${record}`);
  return files.get(record);
};
const candidate = {
  schemaVersion: "newsstand-story-candidate.v1", candidateStatus: "HELD_NOT_PUBLISHED", workOrderId: "TEST-1",
  sourceText: { path: "operations/product-stewards/newsstand/candidates/test-prose.md", sha256: sha256(files.get("operations/product-stewards/newsstand/candidates/test-prose.md")) },
  claimMap: { path: "operations/product-stewards/newsstand/candidates/test-claims.md", sha256: sha256(files.get("operations/product-stewards/newsstand/candidates/test-claims.md")) },
  story: storyRecord
};
const candidateRaw = `${JSON.stringify(candidate)}\n`;
const evidenceRecord = "operations/product-stewards/newsstand/evidence/stories/test-story.json";
const decisionBase = {
  schemaVersion: "newsstand-story-admission-v1", decision: "ACCEPT_LOCAL_CANONICAL_WRITE", storyId: storyRecord.id,
  candidateSha256: sha256(candidateRaw), evidenceSha256: "", publicStorySha256: "",
  publishedAt: "2026-08-12T22:00:00Z", reviewedAt: "2026-08-12T22:01:00Z",
  reviewedBy: "independent-newsstand-release-judge", reviewerRole: "independent NewsStand release judge",
  aliApproval: { record: "operations/product-stewards/newsstand/evidence/test-ali-approval.md", sha256: sha256(files.get("operations/product-stewards/newsstand/evidence/test-ali-approval.md")) },
  observedExplainBack: { record: "operations/product-stewards/newsstand/evidence/test-explain-back.md", sha256: sha256(files.get("operations/product-stewards/newsstand/evidence/test-explain-back.md")) }
};
const publicStory = publicStoryFromCandidate(storyRecord, decisionBase, evidenceRecord);
const publicStorySha256 = sha256(`${canonicalJson(publicStory)}\n`);
const evidence = {
  schemaVersion: "newsstand-story-evidence.v1", storyId: storyRecord.id, correctionOwner: "NewsStand accuracy desk", nextRecheckAt: "2026-08-13",
  sources: storyRecord.sources, claims: [{ claim: "The bounded claim.", sourceIds: ["source-1"] }],
  independentReview: "operations/product-stewards/newsstand/evidence/test-independent-review.json",
  visualReview: "operations/product-stewards/newsstand/evidence/test-visual-review.json",
  reviewRender: "operations/product-stewards/newsstand/evidence/test-render.html",
  producerContract: "operations/product-stewards/newsstand/candidates/test-producer.json",
  exactProse: "operations/product-stewards/newsstand/candidates/test-prose.md",
  artifactBindings: [
    { record: "operations/product-stewards/newsstand/evidence/test-independent-review.json", sha256: sha256(files.get("operations/product-stewards/newsstand/evidence/test-independent-review.json")) },
    { record: "operations/product-stewards/newsstand/evidence/test-visual-review.json", sha256: sha256(files.get("operations/product-stewards/newsstand/evidence/test-visual-review.json")) },
    { record: "operations/product-stewards/newsstand/evidence/test-render.html", sha256: sha256(files.get("operations/product-stewards/newsstand/evidence/test-render.html")) },
    { record: "operations/product-stewards/newsstand/candidates/test-producer.json", sha256: sha256(files.get("operations/product-stewards/newsstand/candidates/test-producer.json")) },
    { record: "operations/product-stewards/newsstand/candidates/test-prose.md", sha256: sha256(files.get("operations/product-stewards/newsstand/candidates/test-prose.md")) }
  ],
  aliApproval: decisionBase.aliApproval.record, observedExplainBack: decisionBase.observedExplainBack.record,
  reviewArtifact: { canonicalization: "recursive-key-sorted-json-plus-newline", storySha256: publicStorySha256 }
};
const evidenceRaw = `${JSON.stringify(evidence)}\n`;
const decision = { ...decisionBase, evidenceSha256: sha256(evidenceRaw), publicStorySha256 };
const decisionRaw = `${JSON.stringify(decision)}\n`;
const datasetRaw = `window.NEWSSTAND_DATA = {
  schemaVersion: "1.0.0",
  datasetStatus: "published",
  generatedAt: "2026-08-12T20:00:00Z",
  lastCheckedAt: "2026-08-12T20:00:00Z",
  publications: {},
  stories: [
    { id: "predecessor", slug: "predecessor" }
  ]
};

/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */
window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;
`;

const promoted = promoteNewsstandStory({ datasetRaw, candidateRaw, evidenceRaw, decisionRaw, maker: "newsstand-story-maker", readBoundFile, evidenceRecord, now: "2026-08-12T22:02:00Z" });
assert.equal(promoted.publicStory.status, "published");
assert.equal(promoted.publicStory.sourceApproval.record, `/${evidenceRecord}`);
assert.equal(promoted.publicStorySha256, publicStorySha256);
assert.match(promoted.datasetRaw, /"id": "test-story"/);
assert.match(promoted.datasetRaw, /generatedAt: "2026-08-12T22:01:00Z"/);

const selfDecision = { ...decision, reviewedBy: "newsstand-story-maker" };
assert.throws(() => promoteNewsstandStory({ datasetRaw, candidateRaw, evidenceRaw, decisionRaw: `${JSON.stringify(selfDecision)}\n`, maker: "newsstand-story-maker", readBoundFile, evidenceRecord, now: "2026-08-12T22:02:00Z" }), /reviewer identity/);
const badExplain = { ...decision, observedExplainBack: { ...decision.observedExplainBack, sha256: "0".repeat(64) } };
assert.throws(() => promoteNewsstandStory({ datasetRaw, candidateRaw, evidenceRaw, decisionRaw: `${JSON.stringify(badExplain)}\n`, maker: "newsstand-story-maker", readBoundFile, evidenceRecord, now: "2026-08-12T22:02:00Z" }), /observedExplainBack bytes changed/);
const badStoryHash = { ...decision, publicStorySha256: "0".repeat(64) };
assert.throws(() => promoteNewsstandStory({ datasetRaw, candidateRaw, evidenceRaw, decisionRaw: `${JSON.stringify(badStoryHash)}\n`, maker: "newsstand-story-maker", readBoundFile, evidenceRecord, now: "2026-08-12T22:02:00Z" }), /public story checksum/);
assert.equal(compileStoryDatasetWrite({ datasetRaw: promoted.datasetRaw, publicStory, timestamp: decision.reviewedAt }), promoted.datasetRaw);
const conflictingStory = { ...publicStory, headline: "Changed without a successor decision" };
assert.throws(() => compileStoryDatasetWrite({ datasetRaw: promoted.datasetRaw, publicStory: conflictingStory, timestamp: decision.reviewedAt }), /conflicting story identity already exists/);

console.log("NEWSSTAND STORY PROMOTION CALIBRATION: PASS · exact story promoted and retried idempotently · maker self-approval, altered explain-back, wrong story checksum and conflicting identity rejected");
