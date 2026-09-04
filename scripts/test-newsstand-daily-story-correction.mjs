#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareCorrection } from "./prepare-newsstand-daily-story-correction.mjs";
import { promoteDailyIssue } from "./promote-daily-edition.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-09-04";
const storyId = "openai-gpt-6-astra-launch-2026-09-04";
const evidencePath = "operations/product-stewards/newsstand/evidence/stories/openai-gpt-6-astra-launch-2026-09-04-reader-fit.json";
const result = prepareCorrection({ root, date, storyId, evidencePath });
const store = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-daily-issues.json"), "utf8"));
const canonicalJson = value => value === null || typeof value !== "object" ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(canonicalJson).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
const predecessor = structuredClone(store.issues.find(issue => issue.editionDate === date));
predecessor.stories[0].headline = "Rejected predecessor fixture";
predecessor.envelopeSha256 = "a".repeat(64);
predecessor.admission = { decision: "ACCEPT_LOCAL_CANONICAL_WRITE", reviewedAt: "2026-09-04T16:04:05.000Z", reviewedBy: "independent-predecessor-fixture", reviewerRole: "Independent predecessor fixture" };
const envelope = structuredClone(result.envelope);
envelope.sourceIdentity.storyCorrection.predecessorStorySha256 = crypto.createHash("sha256").update(canonicalJson(predecessor.stories[0])).digest("hex");
const envelopeRaw = `${canonicalJson(envelope)}\n`;
const decision = {
  schemaVersion: "daily-issue-story-correction-admission-v1",
  decision: "ACCEPT_LOCAL_CANONICAL_SUCCESSOR",
  editionDate: date,
  envelopeSha256: crypto.createHash("sha256").update(envelopeRaw).digest("hex"),
  predecessorEnvelopeSha256: predecessor.envelopeSha256,
  correctedStoryIds: [storyId],
  correctionEvidence: result.correctionEvidence,
  reviewedAt: "2026-09-04T20:25:00.000Z",
  reviewedBy: "independent-correction-fixture",
  reviewerRole: "Independent NewsStand correction fixture"
};
const fixtureStore = { ...store, issues: store.issues.map(issue => issue.editionDate === date ? predecessor : issue) };
const promoted = promoteDailyIssue({ store: fixtureStore, envelope, envelopeRaw, decision, maker: "daily-correction-maker", now: "2026-09-04T20:26:00.000Z", root });
assert.equal(promoted.changed, true);
assert.equal(promoted.issue.stories[0].headline, "OpenAI’s latest Astra model is built for work that crosses apps—not every task.");
assert.equal(promoted.issue.weeklyStoryId, store.issues.find(issue => issue.editionDate === date).weeklyStoryId);
assert.equal(promoted.issue.desks.length, store.issues.find(issue => issue.editionDate === date).desks.length);
const unauthorized = structuredClone(envelope);
unauthorized.disposition = "CANDIDATES_PENDING_REVIEW";
const unauthorizedRaw = `${JSON.stringify(unauthorized)}\n`;
assert.throws(() => promoteDailyIssue({ store: fixtureStore, envelope: unauthorized, envelopeRaw: unauthorizedRaw, decision: { ...decision, envelopeSha256: crypto.createHash("sha256").update(unauthorizedRaw).digest("hex") }, maker: "daily-correction-maker", now: "2026-09-04T20:26:00.000Z", root }), /changes protected disposition/);
const wrongStory = structuredClone(envelope);
wrongStory.storySnapshots[0].headline = "Different unreviewed story";
assert.throws(() => promoteDailyIssue({ store: fixtureStore, envelope: wrongStory, envelopeRaw: `${JSON.stringify(wrongStory)}\n`, decision, maker: "daily-correction-maker", now: "2026-09-04T20:26:00.000Z", root }), /REJECT/);
console.log(`DAILY STORY CORRECTION TEST PASS corrected=1 weekly_preserved=1 desks_preserved=1 unauthorized_desk_rejected=1 unbound_story_rejected=1 envelope_sha256=${result.sha256}`);
