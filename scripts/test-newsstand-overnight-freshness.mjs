import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { validateOvernightFreshness } from "./lib/newsstand-overnight-freshness.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-overnight-freshness-"));
const dir = "operations/product-stewards/newsstand/candidates/overnight-fixture";
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
function write(name, value) { const raw = typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`; const relative = `${dir}/${name}`; const absolute = path.join(root, relative); fs.mkdirSync(path.dirname(absolute), { recursive: true }); fs.writeFileSync(absolute, raw); return { path: relative, sha256: hash(raw) }; }
const clone = value => structuredClone(value);
const expectReject = (fn, message) => assert.throws(fn, new RegExp(message));

function fixture() {
  const originalEvidence = write("source-original.md", "Original primary source receipt captured on the evening before publication with the reviewed announcement details.");
  const currentContent = "Morning check at 06:45 confirms the primary announcement remains available and its stated access boundary is unchanged.";
  const developmentContent = "Morning development search at 06:50 found no later official announcement, correction, withdrawal, or material update.";
  const currentEvidence = write("source-current.json", { schemaVersion: "laidies-newsstand-current-source-capture.v1", sourceUrl: "https://example.test/official", capturedAt: "2026-09-06T06:45:00-07:00", content: currentContent });
  const developmentEvidence = write("development.json", { schemaVersion: "laidies-newsstand-development-capture.v1", query: "site:example.test official announcement correction update", capturedAt: "2026-09-06T06:50:00-07:00", sourceUrls: ["https://example.test/search"], content: developmentContent });
  const independentReview = write("independent.json", { reviewedAt: "2026-09-05T20:15:00-07:00", verdict: "PASS" });
  const claimMap = write("claim-map.json", [{ claimId: "launch", text: "The official announcement says access begins in stages." }]);
  const story = { id: "overnight-fixture", status: "hold", updatedAt: "2026-09-05T20:00:00-07:00", lastCheckedAt: "2026-09-05T20:00:00-07:00", sources: [{ id: "official", url: "https://example.test/official", accessedAt: "2026-09-05" }] };
  const original = { schemaVersion: "newsstand-ordinary-story-candidate-v2", candidateId: "overnight-fixture", editionDate: "2026-09-05", story, storySha256: hash(stable(story)), claimMap, reviewEvidence: { independent: independentReview }, sources: [{ id: "official", url: "https://example.test/official", evidence: originalEvidence }] };
  const reviewedCandidate = write("original-candidate.json", original);
  const record = { schemaVersion: "laidies-newsstand-overnight-freshness.v1", candidateId: original.candidateId, storySha256: original.storySha256, publicationDate: "2026-09-06", reviewedCandidate, independentReview, claimMap, disposition: "NO_MATERIAL_CHANGE", checker: "NewsStand morning desk", checkedAt: "2026-09-06T07:00:00-07:00", sourceChecks: [{ id: "official", url: "https://example.test/official", disposition: "UNCHANGED", explanation: "The official page still states the reviewed availability boundary.", originalEvidence, currentEvidence, currentExcerpt: currentContent, currentCheckedAt: "2026-09-06T06:45:00-07:00" }], developmentCheck: { disposition: "NO_MATERIAL_CHANGE", query: "site:example.test official announcement correction update", explanation: "No later official development appeared in the morning check.", evidence: developmentEvidence, currentExcerpt: developmentContent, checkedAt: "2026-09-06T06:50:00-07:00" } };
  const recordBinding = write("overnight-freshness.json", record);
  const candidate = { ...clone(original), editionDate: "2026-09-06", overnightFreshness: recordBinding };
  return { original, candidate, record };
}

function validate(subject = fixture(), options = {}) { return validateOvernightFreshness(subject.record, { candidate: subject.candidate, originalCandidate: subject.original, root, now: "2026-09-06T08:00:00-07:00", ...options }); }
function rebindRecord(subject) {
  const binding = write(`overnight-freshness-${Math.random().toString(16).slice(2)}.json`, subject.record);
  subject.candidate.overnightFreshness = binding;
}

assert.deepEqual(validate(), { publicationDate: "2026-09-06", checkedAt: "2026-09-06T07:00:00-07:00" });
assert.deepEqual(validate(fixture(), { admittedHistoricalBase: true, now: "2026-10-01T08:00:00-07:00" }), { publicationDate: "2026-09-06", checkedAt: "2026-09-06T07:00:00-07:00" });
expectReject(() => validate(fixture(), { now: "2026-09-07T08:00:00-07:00" }), "publication must run on its publication day");
{
  const subject = fixture(); let calls = 0;
  assert.deepEqual(validate(subject, { readBinding: (passedRoot, binding) => { calls += 1; assert.equal(passedRoot, root); return fs.readFileSync(path.join(root, binding.path), "utf8"); } }), { publicationDate: "2026-09-06", checkedAt: "2026-09-06T07:00:00-07:00" });
  assert.ok(calls > 0, "injected reader should receive private bindings");
}
{
  const subject = fixture();
  expectReject(() => validate(subject, { readBinding: () => "forged reader output" }), "SHA-256 mismatch");
}
{
  const subject = fixture(); subject.record.sourceChecks[0].disposition = "CHANGED";
  rebindRecord(subject);
  expectReject(() => validate(subject), "unchanged, explained");
}
{
  const subject = fixture(); subject.record.sourceChecks = [];
  rebindRecord(subject);
  expectReject(() => validate(subject), "cover each original source");
}
{
  const subject = fixture(); subject.record.sourceChecks[0].url = "https://example.test/swapped";
  rebindRecord(subject);
  expectReject(() => validate(subject), "lacks an unchanged");
}
{
  const subject = fixture(); subject.record.sourceChecks[0].originalEvidence = subject.record.sourceChecks[0].currentEvidence;
  rebindRecord(subject);
  expectReject(() => validate(subject), "original evidence differs");
}
{
  const subject = fixture(); subject.record.sourceChecks[0].currentEvidence = write("narrative-source.md", "A narrative assertion is not a structured source capture even when it is longer than forty characters.");
  subject.record.sourceChecks[0].currentExcerpt = "A narrative assertion is not a structured source capture even when it is longer than forty characters.";
  rebindRecord(subject);
  expectReject(() => validate(subject), "structured JSON capture");
}
{
  const subject = fixture(); const check = subject.record.sourceChecks[0];
  check.currentEvidence = write("wrong-source-url.json", { schemaVersion: "laidies-newsstand-current-source-capture.v1", sourceUrl: "https://example.test/other", capturedAt: check.currentCheckedAt, content: check.currentExcerpt });
  rebindRecord(subject);
  expectReject(() => validate(subject), "source URL");
}
{
  const subject = fixture(); const check = subject.record.sourceChecks[0];
  check.currentEvidence = write("wrong-source-time.json", { schemaVersion: "laidies-newsstand-current-source-capture.v1", sourceUrl: check.url, capturedAt: "2026-09-06T06:44:00-07:00", content: check.currentExcerpt });
  rebindRecord(subject);
  expectReject(() => validate(subject), "capture timestamp");
}
{
  const subject = fixture(); const check = subject.record.sourceChecks[0];
  check.currentEvidence = write("excerpt-in-metadata.json", { schemaVersion: "laidies-newsstand-current-source-capture.v1", sourceUrl: check.url, capturedAt: check.currentCheckedAt, note: check.currentExcerpt, content: "A different captured source passage that does not contain the required excerpt." });
  rebindRecord(subject);
  expectReject(() => validate(subject), "inside capture content");
}
{
  const subject = fixture(); subject.candidate.story.headline = "Tampered after evening review";
  expectReject(() => validate(subject), "wrapper changed");
}
{
  const subject = fixture(); subject.candidate.story.headline = "Tampered after historical replay";
  expectReject(() => validate(subject, { admittedHistoricalBase: true, now: "2026-10-01T08:00:00-07:00" }), "wrapper changed");
}
{
  const subject = fixture(); subject.record.checkedAt = "2026-09-06T09:00:00-07:00";
  rebindRecord(subject);
  expectReject(() => validate(subject), "non-future");
}
{
  expectReject(() => validate(fixture(), { now: "not-a-timestamp" }), "non-future");
}
{
  const subject = fixture(); subject.candidate.editionDate = "2026-09-07"; subject.record.publicationDate = "2026-09-07";
  rebindRecord(subject);
  expectReject(() => validate(subject), "immediately following");
}
{
  const subject = fixture(); delete subject.record.developmentCheck;
  rebindRecord(subject);
  expectReject(() => validate(subject), "development check");
}
{
  const subject = fixture(); const check = subject.record.developmentCheck;
  check.evidence = write("development-no-urls.json", { schemaVersion: "laidies-newsstand-development-capture.v1", query: check.query, capturedAt: check.checkedAt, sourceUrls: [], content: check.currentExcerpt });
  rebindRecord(subject);
  expectReject(() => validate(subject), "fetched source URLs");
}
{
  const subject = fixture(); const check = subject.record.developmentCheck;
  check.evidence = write("development-bad-url.json", { schemaVersion: "laidies-newsstand-development-capture.v1", query: check.query, capturedAt: check.checkedAt, sourceUrls: ["file:///private/index"], content: check.currentExcerpt });
  rebindRecord(subject);
  expectReject(() => validate(subject), "fetched source URLs");
}
{
  const subject = fixture(); const check = subject.record.developmentCheck;
  check.evidence = write("development-wrong-query.json", { schemaVersion: "laidies-newsstand-development-capture.v1", query: "different query", capturedAt: check.checkedAt, sourceUrls: ["https://example.test/search"], content: check.currentExcerpt });
  rebindRecord(subject);
  expectReject(() => validate(subject), "query");
}
{
  const subject = fixture(); const check = subject.record.developmentCheck;
  check.evidence = write("development-wrong-time.json", { schemaVersion: "laidies-newsstand-development-capture.v1", query: check.query, capturedAt: "2026-09-06T06:49:00-07:00", sourceUrls: ["https://example.test/search"], content: check.currentExcerpt });
  rebindRecord(subject);
  expectReject(() => validate(subject), "capture timestamp");
}
{
  const subject = fixture();
  const outside = path.join(root, "outside-evidence.md");
  fs.writeFileSync(outside, "This outside file has a sufficiently long excerpt but must never become private NewsStand evidence through a symlink.");
  const link = path.join(root, dir, "source-symlink.md");
  fs.rmSync(link, { force: true }); fs.symlinkSync(outside, link);
  subject.record.sourceChecks[0].currentEvidence = { path: `${dir}/source-symlink.md`, sha256: hash(fs.readFileSync(outside, "utf8")) };
  subject.record.sourceChecks[0].currentExcerpt = fs.readFileSync(outside, "utf8");
  rebindRecord(subject);
  expectReject(() => validate(subject), "resolves outside");
}
{
  const subject = fixture();
  const escaped = path.join(root, "operations/product-stewards/escaped-evidence.md");
  fs.mkdirSync(path.dirname(escaped), { recursive: true }); fs.writeFileSync(escaped, "This escaped evidence has a sufficiently long excerpt but its lexical path leaves private NewsStand storage.");
  subject.record.sourceChecks[0].currentEvidence = { path: `${dir}/../../../escaped-evidence.md`, sha256: hash(fs.readFileSync(escaped, "utf8")) };
  subject.record.sourceChecks[0].currentExcerpt = fs.readFileSync(escaped, "utf8");
  rebindRecord(subject);
  expectReject(() => validate(subject), "private NewsStand path");
}

fs.rmSync(root, { recursive: true, force: true });
console.log("newsstand overnight freshness tests: PASS");
