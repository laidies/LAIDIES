#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promoteDailyIssue } from "./promote-daily-edition.mjs";

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(canonicalJson).join(",")}]` : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
const clone = (value) => structuredClone(value);
const root = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-historical-correction-"));
const storyId = "front-paige-accountable-systems-2026-08-24";
const otherId = "daily-unchanged";
const radarPath = "operations/agents/aidb-intelligence-desk/daily/2026-08-24.md";
const columnsPath = "content/daily-edition-columns.json";
const storiesPath = "content/newsstand-stories.js";
const frozen = { radarPath, radarSha256: "a".repeat(64), columnsPath, columnsSha256: "b".repeat(64) };
const deskTypes = ["paige_tip", "career_life", "concept_week", "mme_claio", "dear_miss_jeeves", "behind_build", "around_town", "whats_new_sunnyvaile", "crossword", "song", "did_you_know", "town_note", "curiosity"];
const desks = deskTypes.map((type) => ({ type, state: "empty", recordId: null, emptyState: "Historical fixture." }));
const story = (id, headline) => ({ id, slug: id, edition: "daily", status: "published", publishedAt: "2026-08-24T17:00:00Z", updatedAt: "2026-08-24T17:00:00Z", lastCheckedAt: "2026-08-24T17:00:00Z", sourceApproval: { status: "approved", record: `approval:${id}` }, headline, the_story: headline });
const oldStory = story(storyId, "Original");
const newStory = story(storyId, "Corrected");
const unchanged = story(otherId, "Unchanged");
const storiesRaw = `window.NEWSSTAND_DATA = ${JSON.stringify({ publications: { daily: { editionDate: "2026-08-24", issue: {} } }, stories: [newStory, unchanged] })};`;
fs.mkdirSync(path.join(root, "content"), { recursive: true });
fs.mkdirSync(path.join(root, "operations/product-stewards/newsstand/evidence/stories"), { recursive: true });
fs.writeFileSync(path.join(root, storiesPath), storiesRaw);
const evidencePath = "operations/product-stewards/newsstand/evidence/stories/opportunity-access-20260907.json";
const evidenceRaw = fs.readFileSync(path.resolve(path.dirname(new URL(import.meta.url).pathname), "../operations/product-stewards/newsstand/evidence/stories/opportunity-access-20260907.json"), "utf8");
const existing = { editionDate: "2026-08-24", editorialTimeZone: "America/Vancouver", status: "complete", disposition: "service_ready", storyIds: [storyId, otherId], stories: [oldStory, unchanged], serviceRecordIds: [], desks, sourceIdentity: { ...frozen, storiesPath, storiesSha256: "c".repeat(64) }, envelopeSha256: "d".repeat(64), admission: { decision: "ACCEPT_LOCAL_CANONICAL_WRITE", reviewedAt: "2026-08-24T18:00:00Z", reviewedBy: "independent:old", reviewerRole: "Independent reviewer" } };
const envelope = { schemaVersion: "daily-private-issue-v1", mode: "PRIVATE_DRAFT_ONLY", editionDate: "2026-08-24", editorialTimeZone: "America/Vancouver", disposition: "SERVICE_READY", status: "PRIVATE_REVIEW_DRAFT", storyIds: [storyId, otherId], storySnapshots: [newStory, unchanged], desks, sourceIdentity: { ...frozen, storiesPath, storiesSha256: sha256(storiesRaw), storyCorrection: { storyId, predecessorStorySha256: sha256(canonicalJson(oldStory)), successorStorySha256: sha256(canonicalJson(newStory)), evidence: { path: evidencePath, sha256: sha256(evidenceRaw) } } }, canonicalWrite: false, deployActionTaken: false };
const decisionFor = (value) => ({ schemaVersion: "daily-issue-story-correction-admission-v1", decision: "ACCEPT_LOCAL_CANONICAL_SUCCESSOR", editionDate: value.editionDate, envelopeSha256: sha256(`${canonicalJson(value)}\n`), predecessorEnvelopeSha256: existing.envelopeSha256, correctedStoryIds: [storyId], correctionEvidence: value.sourceIdentity.storyCorrection.evidence, reviewedAt: "2026-09-07T21:30:00Z", reviewedBy: "independent:test", reviewerRole: "Independent correction reviewer" });
const promote = (value, store = { schemaVersion: "daily-issues-v1", owner: "newsstand-daily", issues: [existing] }) => promoteDailyIssue({ store, envelope: value, envelopeRaw: `${canonicalJson(value)}\n`, decision: decisionFor(value), maker: "maker:test", root, now: "2026-09-07T21:31:00Z" });
const rejects = (label, value, store) => assert.throws(() => promote(value, store), /DAILY_EDITION_PROMOTION_REJECT/, label);

// This fixture intentionally omits the historical radar and current columns
// bytes. The valid correction must rely on the exact admitted predecessor.
assert.equal(promote(envelope).changed, true, "historical correction accepts frozen missing/drifted inputs");
for (const [label, mutate, store] of [
  ["tampered radar hash", (v) => { v.sourceIdentity.radarSha256 = "e".repeat(64); }],
  ["tampered radar path", (v) => { v.sourceIdentity.radarPath = "operations/product-stewards/newsstand/editorial-intake/2026-08-24.md"; }],
  ["tampered columns hash", (v) => { v.sourceIdentity.columnsSha256 = "f".repeat(64); }],
  ["other story snapshot", (v) => { v.storySnapshots[1] = story(otherId, "Changed"); }],
  ["current story source", (v) => { v.sourceIdentity.storiesSha256 = "0".repeat(64); }],
  ["missing predecessor", null, { schemaVersion: "daily-issues-v1", owner: "newsstand-daily", issues: [] }]
]) { const candidate = clone(envelope); if (mutate) mutate(candidate); rejects(label, candidate, store); }
const ordinary = clone(envelope);
delete ordinary.sourceIdentity.storyCorrection;
ordinary.sourceIdentity.storiesSha256 = sha256(storiesRaw);
const ordinaryDecision = { schemaVersion: "daily-issue-admission-v1", decision: "ACCEPT_LOCAL_CANONICAL_WRITE", editionDate: ordinary.editionDate, envelopeSha256: sha256(`${canonicalJson(ordinary)}\n`), reviewedAt: "2026-09-07T21:30:00Z", reviewedBy: "independent:test", reviewerRole: "Independent reviewer" };
assert.throws(() => promoteDailyIssue({ store: { schemaVersion: "daily-issues-v1", owner: "newsstand-daily", issues: [] }, envelope: ordinary, envelopeRaw: `${canonicalJson(ordinary)}\n`, decision: ordinaryDecision, maker: "maker:test", root, now: "2026-09-07T21:31:00Z" }), /source bytes changed for/, "ordinary admission still requires current radar/columns inputs");
console.log("PASS historical correction frozen provenance: valid correction accepted; six correction tamper cases and ordinary admission rejected");
