#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { projectDailyIssue, verifyProjectionAdmission } from "./publish-daily-edition.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"), context);
const dataset = JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
const columns = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
const issues = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8")).issues;
const date = dataset.publications.daily.editionDate;
const issue = issues.find((candidate) => candidate.editionDate === date);
assert.ok(issue, "current Daily issue must exist");
// The stored issue carries its historical admitted snapshots; the live story
// may later retain a current presentation (including changed art). Restore only
// those snapshots in a disposable clone so this test checks replay of the
// historical admission without rewriting or assuming anything about live data.
const fixtureDataset = structuredClone(dataset);
for (const snapshot of issue.stories) {
  const storyIndex = fixtureDataset.stories.findIndex((story) => story.id === snapshot.id);
  assert.ok(storyIndex >= 0, `current fixture requires admitted story ${snapshot.id}`);
  fixtureDataset.stories[storyIndex] = structuredClone(snapshot);
}
const projected = projectDailyIssue({ dataset: fixtureDataset, issue, columns });
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const envelopeRoot = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const matchingEnvelopes = fs.readdirSync(envelopeRoot)
  .filter((name) => name.startsWith(date) && name.endsWith(".json"))
  .map((name) => fs.readFileSync(path.join(envelopeRoot, name), "utf8"))
  .filter((raw) => sha256(raw) === issue.envelopeSha256);
assert.equal(matchingEnvelopes.length, 1, "current Daily issue must resolve to one exact private envelope");
const envelopeRaw = matchingEnvelopes[0];
const evidenceRoot = path.join(ROOT, "operations/product-stewards/newsstand/evidence");
const matchingDecisions = fs.readdirSync(evidenceRoot, { recursive: true })
  .filter((name) => String(name).endsWith(".json"))
  .flatMap((name) => {
    try { return [JSON.parse(fs.readFileSync(path.join(evidenceRoot, String(name)), "utf8"))]; }
    catch { return []; }
  })
  .filter((candidate) => candidate.envelopeSha256 === issue.envelopeSha256 &&
    candidate.editionDate === issue.editionDate && candidate.decision === issue.admission.decision &&
    candidate.reviewedAt === issue.admission.reviewedAt && candidate.reviewedBy === issue.admission.reviewedBy &&
    candidate.reviewerRole === issue.admission.reviewerRole && /admission-v1$/.test(candidate.schemaVersion || ""));
assert.equal(matchingDecisions.length, 1, "current Daily issue must resolve to one exact independent admission");
const decision = matchingDecisions[0];
verifyProjectionAdmission({ issue, envelopeRaw, decision });
assert.throws(() => verifyProjectionAdmission({ issue, envelopeRaw: envelopeRaw + " ", decision }), /checksum/, "changed envelope bytes must fail");
const forged = structuredClone(issue);
forged.serviceRecordIds = ["FORGED-NON-ADMITTED-RECORD"];
assert.throws(() => verifyProjectionAdmission({ issue: forged, envelopeRaw, decision }), /differs from exact admitted envelope/, "stored membership tampering must fail");
assert.throws(() => verifyProjectionAdmission({ issue, envelopeRaw, decision: { ...decision, reviewedBy: "another-independent-reviewer" } }), /reviewedBy changed/, "review identity tampering must fail");
assert.deepEqual(projected, fixtureDataset, "admitted projection must be idempotent");
assert.deepEqual(projected.stories, fixtureDataset.stories, "publication cannot rewrite any story");
assert.deepEqual(projected.publications["big-picture"], fixtureDataset.publications["big-picture"], "publication cannot rewrite Big Picture");
const missingService = structuredClone(issue);
missingService.serviceRecordIds = ["missing"];
assert.throws(() => projectDailyIssue({ dataset: fixtureDataset, issue: missingService, columns }), /service IDs differ|not exactly admitted|older service lacks exact published predecessor binding/, "unknown service must fail projection");
const oldService = structuredClone(issue);
oldService.serviceRecordIds = ["DAILY-2026-08-03-CAREER-DELEGATION"];
assert.throws(() => projectDailyIssue({ dataset: fixtureDataset, issue: oldService, columns }), /service IDs differ|not exactly admitted|older service lacks exact published predecessor binding/, "old dated record cannot be silently republished");
const heldWeekly = structuredClone(issue);
heldWeekly.weeklyStoryId = "openai-frontier-training-pause-2026-08-18";
assert.throws(() => projectDailyIssue({ dataset: fixtureDataset, issue: heldWeekly, columns }), /Weekly continuity is not admitted|Weekly continuity must preserve/, "a non-Weekly story cannot populate continuity");
const duplicateFront = structuredClone(issue);
duplicateFront.storyIds = [issue.frontPaigeStoryId];
assert.throws(() => projectDailyIssue({ dataset: fixtureDataset, issue: duplicateFront, columns }), /ordinary candidate differs|not admitted for this issue/, "persistent Front PAiGE cannot masquerade as today's news");
console.log("DAILY CANONICAL PUBLICATION TEST PASS idempotent=1 stories_preserved=1 big_picture_preserved=1 missing_service_rejected=1 old_service_rejected=1 held_weekly_rejected=1 duplicate_front_rejected=1 envelope_tamper_rejected=1 membership_tamper_rejected=1 reviewer_tamper_rejected=1");
