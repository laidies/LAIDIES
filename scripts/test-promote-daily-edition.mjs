#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { composeDailyEnvelope } from "./compose-daily-edition.mjs";
import { promoteDailyIssue } from "./promote-daily-edition.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-08-04";
const radarPath = path.join(ROOT, `operations/agents/aidb-intelligence-desk/daily/${date}.md`);
const composed = composeDailyEnvelope({
  date,
  radarRaw: fs.readFileSync(radarPath, "utf8"),
  radarPath,
  storiesRaw: fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"),
  columnsRaw: fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8")
});
const envelopeRaw = composed.canonical;
const envelope = JSON.parse(envelopeRaw);
const envelopeSha256 = crypto.createHash("sha256").update(envelopeRaw).digest("hex");
const store = { schemaVersion: "daily-issues-v1", owner: "newsstand-daily", issues: [] };
const files = new Map([
  ["operations/product-stewards/newsstand/evidence/daily-test-1440.png", "desktop full-page pixels\n"],
  ["operations/product-stewards/newsstand/evidence/daily-test-390.png", "mobile full-page pixels\n"]
]);
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const visualReview = {
  schemaVersion: "laidies-newsstand-complete-daily-visual-review.v1",
  verdict: "PASS",
  editionDate: date,
  envelopeSha256,
  reviewScope: "COMPLETE_DAILY_NEWSPAPER_PAGE",
  defaultExperience: "THE_DAILY",
  reviewer: { independentFromMaker: true, artifactFirst: true },
  screenshots: [
    { path: "operations/product-stewards/newsstand/evidence/daily-test-1440.png", sha256: hash(files.get("operations/product-stewards/newsstand/evidence/daily-test-1440.png")), width: 1440, height: 1000, state: "DAILY_DEFAULT" },
    { path: "operations/product-stewards/newsstand/evidence/daily-test-390.png", sha256: hash(files.get("operations/product-stewards/newsstand/evidence/daily-test-390.png")), width: 390, height: 844, state: "DAILY_DEFAULT" }
  ],
  judgment: { fullPageInspected: true, looksLikeDailyNewspaper: true, dailyIsDefault: true, articleAndServiceDesksShareOneIssue: true }
};
const visualReviewRaw = `${JSON.stringify(visualReview)}\n`;
files.set("operations/product-stewards/newsstand/evidence/daily-test-visual-review.json", visualReviewRaw);
const aliApproval = {
  schemaVersion: "laidies-ali-artifact-verdict.v1", decision: "APPROVE", artifactKind: "COMPLETE_DAILY_NEWSPAPER",
  editionDate: date, envelopeSha256, visualReviewSha256: hash(visualReviewRaw), authority: "ALI_DIRECT_REVIEW"
};
const aliApprovalRaw = `${JSON.stringify(aliApproval)}\n`;
files.set("operations/product-stewards/newsstand/evidence/daily-test-ali-approval.json", aliApprovalRaw);
const readBoundFile = (record) => {
  if (!files.has(record)) throw new Error(`missing test record ${record}`);
  return files.get(record);
};
const decision = {
  schemaVersion: "daily-issue-admission-v2",
  decision: "ACCEPT_LOCAL_CANONICAL_WRITE",
  editionDate: date,
  envelopeSha256,
  reviewedAt: "2026-08-04T20:00:00Z",
  reviewedBy: "independent-daily-issue-judge",
  reviewerRole: "NewsStand Daily independent judge",
  completePageVisualReview: { record: "operations/product-stewards/newsstand/evidence/daily-test-visual-review.json", sha256: hash(visualReviewRaw) },
  aliApproval: { record: "operations/product-stewards/newsstand/evidence/daily-test-ali-approval.json", sha256: hash(aliApprovalRaw) }
};

const promoted = promoteDailyIssue({ store, envelope, envelopeRaw, decision, maker: "daily-issue-maker", readBoundFile });
assert.equal(promoted.changed, true);
assert.equal(promoted.store.issues.length, 1);
assert.equal(promoted.issue.status, "complete");
assert.equal(promoted.issue.disposition, "quiet");
assert.equal(promoted.issue.storyIds.length, 0);
assert.equal(promoted.issue.stories.length, 0);
assert.equal(promoted.issue.serviceRecordIds.length, 0);
const idempotent = promoteDailyIssue({ store: promoted.store, envelope, envelopeRaw, decision, maker: "daily-issue-maker", readBoundFile });
assert.equal(idempotent.changed, false, "same exact envelope must be idempotent");

const predecessorEnvelope = structuredClone(envelope);
delete predecessorEnvelope.storySnapshots;
const predecessorRaw = `${JSON.stringify(predecessorEnvelope)}\n`;
const predecessorSha256 = crypto.createHash("sha256").update(predecessorRaw).digest("hex");
const predecessorIssue = structuredClone(promoted.issue);
delete predecessorIssue.stories;
predecessorIssue.envelopeSha256 = predecessorSha256;
predecessorIssue.admission = { ...predecessorIssue.admission, decision: "ACCEPT_LOCAL_CANONICAL_WRITE" };
const successorDecision = {
  ...decision,
  schemaVersion: "daily-issue-successor-admission-v2",
  decision: "ACCEPT_LOCAL_CANONICAL_SUCCESSOR",
  predecessorEnvelopeSha256: predecessorSha256
};
const successor = promoteDailyIssue({ store: { ...store, issues: [predecessorIssue] }, envelope, envelopeRaw, decision: successorDecision, maker: "daily-issue-maker", readBoundFile });
assert.equal(successor.changed, true, "exact checksum-bound predecessor may be replaced by its snapshot successor");
assert.deepEqual(successor.issue.stories, envelope.storySnapshots);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: successorDecision, maker: "daily-issue-maker", readBoundFile }), /no canonical predecessor/, "successor admission cannot create a first issue");
assert.throws(() => promoteDailyIssue({ store: { ...store, issues: [{ ...predecessorIssue, envelopeSha256: "f".repeat(64) }] }, envelope, envelopeRaw, decision: successorDecision, maker: "daily-issue-maker", readBoundFile }), /conflicting canonical issue/, "successor admission cannot replace a different predecessor");

assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, envelopeSha256: "0".repeat(64) }, maker: "daily-issue-maker", readBoundFile }), /checksum mismatch/);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, reviewedBy: "daily-issue-maker" }, maker: "daily-issue-maker", readBoundFile }), /self-approval/);
const conflict = structuredClone(promoted.store);
conflict.issues[0].envelopeSha256 = "f".repeat(64);
assert.throws(() => promoteDailyIssue({ store: conflict, envelope, envelopeRaw, decision, maker: "daily-issue-maker", readBoundFile }), /conflicting canonical issue/);
const forgedExisting = structuredClone(promoted.store);
forgedExisting.issues[0].desks[0].emptyState = "FORGED";
assert.throws(() => promoteDailyIssue({ store: forgedExisting, envelope, envelopeRaw, decision, maker: "daily-issue-maker", readBoundFile }), /canonical issue integrity mismatch/);
const duplicateExisting = structuredClone(promoted.store);
duplicateExisting.issues.push(structuredClone(duplicateExisting.issues[0]));
assert.throws(() => promoteDailyIssue({ store: duplicateExisting, envelope, envelopeRaw, decision, maker: "daily-issue-maker", readBoundFile }), /duplicate canonical issue/);
const mismatchedObject = structuredClone(envelope);
mismatchedObject.desks[0].recordId = "UNBOUND";
assert.throws(() => promoteDailyIssue({ store, envelope: mismatchedObject, envelopeRaw, decision, maker: "daily-issue-maker", readBoundFile }), /raw\/object mismatch/);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, reviewedAt: "2099-01-01T00:00:00Z" }, maker: "daily-issue-maker", readBoundFile }), /reviewer identity\/time/);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, reviewedBy: "claimed-reviewer", reviewerRole: "Reviewer" }, maker: "daily-issue-maker", readBoundFile }), /reviewer identity\/time/);
const unsafeQuiet = structuredClone(envelope);
unsafeQuiet.storyIds = ["invented-story"];
unsafeQuiet.storySnapshots = [{ id: "invented-story" }];
const unsafeRaw = `${JSON.stringify(unsafeQuiet)}\n`;
const unsafeDecision = { ...decision, envelopeSha256: crypto.createHash("sha256").update(unsafeRaw).digest("hex") };
assert.throws(() => promoteDailyIssue({ store, envelope: unsafeQuiet, envelopeRaw: unsafeRaw, decision: unsafeDecision, maker: "daily-issue-maker", readBoundFile }), /not bound|quiet issue contains|complete-page/);
const legacyDecision = { schemaVersion: "daily-issue-admission-v1", decision: "ACCEPT_LOCAL_CANONICAL_WRITE", editionDate: date, envelopeSha256, reviewedAt: decision.reviewedAt, reviewedBy: decision.reviewedBy, reviewerRole: decision.reviewerRole };
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: legacyDecision, maker: "daily-issue-maker" }), /legacy Daily admission cannot create/, "a checksum and claimed reviewer cannot create a new issue without the rendered newspaper");
const incompleteVisual = structuredClone(visualReview);
incompleteVisual.judgment.looksLikeDailyNewspaper = false;
const incompleteVisualRaw = `${JSON.stringify(incompleteVisual)}\n`;
files.set("operations/product-stewards/newsstand/evidence/daily-test-visual-review.json", incompleteVisualRaw);
const badVisualDecision = { ...decision, completePageVisualReview: { ...decision.completePageVisualReview, sha256: hash(incompleteVisualRaw) } };
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: badVisualDecision, maker: "daily-issue-maker", readBoundFile }), /complete-page visual review did not PASS/);

console.log(`DAILY EDITION LOCAL CANONICAL WRITER TEST PASS admitted=1 idempotent=1 complete_page_visual=1 ali_approval=1 legacy_metadata_only_rejected=1 non_newspaper_visual_rejected=1 envelope_sha256=${envelopeSha256}`);
