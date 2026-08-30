#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const SOURCE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Keep the historical August 4 test separate from current Weekly authority.
const ROOT = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'newsstand-promoter-regression-')));
for (const relative of ['scripts/compose-daily-edition.mjs','scripts/promote-daily-edition.mjs','content/newsstand-stories.js','content/daily-edition-columns.json','operations/agents/aidb-intelligence-desk/daily/2026-08-04.md']) {
  fs.mkdirSync(path.dirname(path.join(ROOT,relative)),{recursive:true});
  let bytes=fs.readFileSync(path.join(SOURCE_ROOT,relative),'utf8');
  if(relative==='content/newsstand-stories.js') bytes+='\nwindow.NEWSSTAND_DATA.publications.weekly.status="quiet";\n';
  fs.writeFileSync(path.join(ROOT,relative),bytes);
}
const {composeDailyEnvelope}=await import(pathToFileURL(path.join(ROOT,'scripts/compose-daily-edition.mjs')));
const {promoteDailyIssue}=await import(pathToFileURL(path.join(ROOT,'scripts/promote-daily-edition.mjs')));
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
const decision = {
  schemaVersion: "daily-issue-admission-v1",
  decision: "ACCEPT_LOCAL_CANONICAL_WRITE",
  editionDate: date,
  envelopeSha256,
  reviewedAt: "2026-08-04T20:00:00Z",
  reviewedBy: "independent-daily-issue-judge",
  reviewerRole: "NewsStand Daily independent judge"
};

const promoted = promoteDailyIssue({ store, envelope, envelopeRaw, decision, maker: "daily-issue-maker" });
assert.equal(promoted.changed, true);
assert.equal(promoted.store.issues.length, 1);
assert.equal(promoted.issue.status, "complete");
assert.equal(promoted.issue.disposition, "quiet");
assert.equal(promoted.issue.storyIds.length, 0);
assert.equal(promoted.issue.stories.length, 0);
assert.equal(promoted.issue.serviceRecordIds.length, 0);
const idempotent = promoteDailyIssue({ store: promoted.store, envelope, envelopeRaw, decision, maker: "daily-issue-maker" });
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
  schemaVersion: "daily-issue-successor-admission-v1",
  decision: "ACCEPT_LOCAL_CANONICAL_SUCCESSOR",
  predecessorEnvelopeSha256: predecessorSha256
};
const successor = promoteDailyIssue({ store: { ...store, issues: [predecessorIssue] }, envelope, envelopeRaw, decision: successorDecision, maker: "daily-issue-maker" });
assert.equal(successor.changed, true, "exact checksum-bound predecessor may be replaced by its snapshot successor");
assert.deepEqual(successor.issue.stories, envelope.storySnapshots);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: successorDecision, maker: "daily-issue-maker" }), /no canonical predecessor/, "successor admission cannot create a first issue");
assert.throws(() => promoteDailyIssue({ store: { ...store, issues: [{ ...predecessorIssue, envelopeSha256: "f".repeat(64) }] }, envelope, envelopeRaw, decision: successorDecision, maker: "daily-issue-maker" }), /conflicting canonical issue/, "successor admission cannot replace a different predecessor");

assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, envelopeSha256: "0".repeat(64) }, maker: "daily-issue-maker" }), /checksum mismatch/);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, reviewedBy: "daily-issue-maker" }, maker: "daily-issue-maker" }), /self-approval/);
const conflict = structuredClone(promoted.store);
conflict.issues[0].envelopeSha256 = "f".repeat(64);
assert.throws(() => promoteDailyIssue({ store: conflict, envelope, envelopeRaw, decision, maker: "daily-issue-maker" }), /conflicting canonical issue/);
const forgedExisting = structuredClone(promoted.store);
forgedExisting.issues[0].desks[0].emptyState = "FORGED";
assert.throws(() => promoteDailyIssue({ store: forgedExisting, envelope, envelopeRaw, decision, maker: "daily-issue-maker" }), /canonical issue integrity mismatch/);
const duplicateExisting = structuredClone(promoted.store);
duplicateExisting.issues.push(structuredClone(duplicateExisting.issues[0]));
assert.throws(() => promoteDailyIssue({ store: duplicateExisting, envelope, envelopeRaw, decision, maker: "daily-issue-maker" }), /duplicate canonical issue/);
const mismatchedObject = structuredClone(envelope);
mismatchedObject.desks[0].recordId = "UNBOUND";
assert.throws(() => promoteDailyIssue({ store, envelope: mismatchedObject, envelopeRaw, decision, maker: "daily-issue-maker" }), /raw\/object mismatch/);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, reviewedAt: "2099-01-01T00:00:00Z" }, maker: "daily-issue-maker" }), /reviewer identity\/time/);
assert.throws(() => promoteDailyIssue({ store, envelope, envelopeRaw, decision: { ...decision, reviewedBy: "claimed-reviewer", reviewerRole: "Reviewer" }, maker: "daily-issue-maker" }), /reviewer identity\/time/);
const unsafeQuiet = structuredClone(envelope);
unsafeQuiet.storyIds = ["invented-story"];
unsafeQuiet.storySnapshots = [{ id: "invented-story" }];
const unsafeRaw = `${JSON.stringify(unsafeQuiet)}\n`;
const unsafeDecision = { ...decision, envelopeSha256: crypto.createHash("sha256").update(unsafeRaw).digest("hex") };
assert.throws(() => promoteDailyIssue({ store, envelope: unsafeQuiet, envelopeRaw: unsafeRaw, decision: unsafeDecision, maker: "daily-issue-maker" }), /not bound|quiet issue contains/);

console.log(`DAILY EDITION LOCAL CANONICAL WRITER TEST PASS admitted=1 idempotent=1 successor_replaced=1 successor_without_predecessor_rejected=1 wrong_predecessor_rejected=1 checksum_tamper_rejected=1 self_approval_rejected=1 conflict_rejected=1 stored_tamper_rejected=1 duplicate_date_rejected=1 raw_object_mismatch_rejected=1 future_review_rejected=1 claimed_reviewer_rejected=1 unsafe_quiet_rejected=1 envelope_sha256=${envelopeSha256}`);
