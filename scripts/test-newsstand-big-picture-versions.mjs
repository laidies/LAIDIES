#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const helper = await import(path.join(ROOT, "content", "newsstand-big-picture-versions.js"));
const api = helper.default || helper;
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content", "newsstand-stories.js"), "utf8"), dataContext);
const current = JSON.parse(JSON.stringify(dataContext.window.NEWSSTAND_DATA.stories.find(story => story.id === "big-picture-data-centre-deal-2026-08-24")));

function proofFor(story, hashFn = hash) {
  return {
    kind: "verified-public-artifact.v1",
    verificationState: "PUBLICLY_VERIFIED",
    independentlyVerified: true,
    verifiedAt: "2026-09-06T01:39:06.161Z",
    verifier: "independent public-artifact verifier",
    articleSha256: api.articleIdentity(api.publicArticle(story), hashFn),
    artifactManifestSha256: "a".repeat(64)
  };
}

function snapshot(story = current) {
  const result = api.createSnapshot(story, {
    versionId: "2026-08-29-public",
    replacedAt: "2026-09-06T02:00:00Z",
    summary: "Updated the evidence and argument for readers."
  }, proofFor(story), hash);
  assert.equal(result.ok, true, result.reason);
  return result.snapshot;
}

const retained = snapshot();
assert.equal(api.syncSha256(""), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
assert.equal(api.syncSha256("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
assert.equal(api.syncSha256("The quick brown fox jumps over the lazy dog"), "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592");
assert.equal(api.createSnapshot(current, { versionId: "browser-default", replacedAt: "2026-09-06T02:00:00Z", summary: "Browser hash path." }, proofFor(current, undefined), undefined).ok, true);
assert.equal(retained.originallyPublishedAt, current.bigPicture.originallyPublishedAt);
assert.equal(retained.lastMeaningfullyUpdatedAt, current.bigPicture.lastMeaningfullyUpdatedAt);
assert.deepEqual(retained.article.examination_sections, current.examination_sections);
assert.deepEqual(retained.article.sources, current.sources.map(({ id, label, url, publisherType, accessedAt }) => ({ id, label, url, publisherType, accessedAt })));
assert.deepEqual(retained.article.heroVisual, current.heroVisual);
assert.equal(retained.article.quick_read, current.quick_read);
assert.equal(retained.article.front_read, current.front_read);
assert.equal(retained.article.sourceApproval, undefined);
assert.equal(retained.article.bigPicture, undefined);
assert.equal(retained.article.sources.some(source => Object.hasOwn(source, "approvalStatus")), false);
assert.deepEqual(api.validateSnapshots([retained], hash), []);

const changed = JSON.parse(JSON.stringify(current));
changed.headline = "Changed after the public proof";
assert.equal(api.createSnapshot(changed, { versionId: "bad", replacedAt: "2026-09-06T02:00:00Z", summary: "Bad" }, proofFor(current), hash).ok, false);
assert.equal(api.createSnapshot(current, { versionId: "missing-proof", replacedAt: "2026-09-06T02:00:00Z", summary: "Bad" }, null, hash).ok, false);

const privateSnapshot = JSON.parse(JSON.stringify(retained));
privateSnapshot.article.reviewRecord = "private";
assert.match(api.validateSnapshots([privateSnapshot], hash).join("\n"), /private or unsupported/);
const privatePrior = JSON.parse(JSON.stringify(current));
privatePrior.heroVisual.reviewRecord = "private";
assert.equal(api.createSnapshot(privatePrior, { versionId: "private-prior", replacedAt: "2026-09-06T02:00:00Z", summary: "Must reject." }, proofFor(privatePrior), hash).ok, false);
const malformedSource = JSON.parse(JSON.stringify(current));
malformedSource.sources[0].reviewRecord = "private";
assert.equal(api.createSnapshot(malformedSource, { versionId: "bad-source", replacedAt: "2026-09-06T02:00:00Z", summary: "Must reject." }, proofFor(malformedSource), hash).ok, false);
const malformedSection = JSON.parse(JSON.stringify(current));
malformedSection.examination_sections[0].internalNote = "private";
assert.equal(api.createSnapshot(malformedSection, { versionId: "bad-section", replacedAt: "2026-09-06T02:00:00Z", summary: "Must reject." }, proofFor(malformedSection), hash).ok, false);

const duplicate = JSON.parse(JSON.stringify(retained));
assert.match(api.validateSnapshots([retained, duplicate], hash).join("\n"), /invalid identity|chronological/);
const outOfOrder = JSON.parse(JSON.stringify(retained));
outOfOrder.versionId = "2026-08-28-public";
outOfOrder.replacedAt = "2026-08-29T00:00:00Z";
assert.match(api.validateSnapshots([retained, outOfOrder], hash).join("\n"), /chronological/);
const mismatchedDate = JSON.parse(JSON.stringify(retained));
mismatchedDate.originallyPublishedAt = "2026-08-23";
assert.match(api.validateSnapshots([mismatchedDate], hash).join("\n"), /lacks a public published/);
assert.equal(api.validDate("2026-02-29"), false);
assert.equal(api.validDate("2026-02-28"), true);
assert.equal(api.validDate("2026-08-32T12:00:00Z"), false);
assert.deepEqual(api.resolveSnapshot([retained], retained.versionId, hash).story, retained.article);
assert.equal(api.resolveSnapshot([retained], "not-retained", hash).state, "unavailable");
assert.equal(api.resolveSnapshot([privateSnapshot], retained.versionId, hash).state, "unavailable");

const correctedPrior = structuredClone(current);
correctedPrior.status = "corrected";
correctedPrior.correctionHistory = [{ correctedAt: "2026-08-29", summary: "A source figure was corrected.", successorStoryId: current.id, owner: "Private editor principal" }];
const correctedSnapshot = snapshot(correctedPrior);
assert.equal(correctedSnapshot.article.correctionHistory[0].owner, undefined);
assert.equal(correctedSnapshot.article.correctionHistory[0].summary, "A source figure was corrected.");
assert.deepEqual(api.validateSnapshots([correctedSnapshot]), []);
correctedSnapshot.article.correctionHistory[0].record = "private";
assert.ok(api.validateSnapshots([correctedSnapshot]).length);

console.log("✓ BIG PICTURE VERSIONS: current public article preserved; proof, privacy, chronology, and unavailable-version guards exercised");
