#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECKER = path.join(ROOT, "scripts", "check-newsstand-release-scope.mjs");
const MANIFEST = path.join(ROOT, "scripts", "create-release-manifest.mjs");
const versions = createRequire(import.meta.url)("../content/newsstand-big-picture-versions.js");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"), context);
const original = context.window.NEWSSTAND_DATA;
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-big-picture-update-"));
const hash = value => createHash("sha256").update(value).digest("hex");
const clone = value => JSON.parse(JSON.stringify(value));

function render(data) { return `window.NEWSSTAND_DATA = ${JSON.stringify(data, null, 2)};\nwindow.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n`; }
function story(data) { return data.stories.find(item => item.edition === "big-picture" && item.status === "published"); }
function artifact(name, data) {
  const dir = path.join(temp, name);
  fs.mkdirSync(path.join(dir, "content"), { recursive: true });
  fs.writeFileSync(path.join(dir, "content/newsstand-stories.js"), render(data));
  const manifest = path.join(temp, `${name}.manifest.json`);
  const made = spawnSync(process.execPath, [MANIFEST, dir, manifest], { encoding: "utf8" });
  assert.equal(made.status, 0, made.stderr);
  return { dir, manifest };
}
function scope(name) {
  const target = path.join(temp, `${name}.scope.json`);
  fs.writeFileSync(target, JSON.stringify({ schema: "laidies.newsstand-production-scope.v1", project: "laidies-sunnyvaile", allowedArtifactPaths: ["content/newsstand-stories.js"], verificationPaths: ["content/newsstand-stories.js"] }));
  return target;
}
function run(base, candidate, name) { return spawnSync(process.execPath, [CHECKER, base.manifest, candidate.manifest, scope(name)], { cwd: ROOT, encoding: "utf8" }); }
function rejects(result, pattern) { assert.notEqual(result.status, 0, "calibration must reject"); assert.match(`${result.stderr}${result.stdout}`, pattern); }
function proofFor(predecessor) { return { kind: "verified-public-artifact.v1", verificationState: "PUBLICLY_VERIFIED", independentlyVerified: true, verifiedAt: "2026-09-05T23:00:00Z", verifier: "synthetic artifact-byte fixture", articleSha256: versions.articleIdentity(versions.publicArticle(predecessor)), artifactManifestSha256: "a".repeat(64) }; }
function appendSnapshot(before, after, versionId = "synthetic-retained-public", replacedAt = "2026-09-06T01:00:00Z") {
  const result = versions.createSnapshot(before, { versionId, replacedAt, summary: "Expanded the public explanation with updated evidence." }, proofFor(before));
  assert.equal(result.ok, true, result.reason);
  after.bigPicture.previousVersions = [...(before.bigPicture.previousVersions || []), result.snapshot];
}
function meaningfulSuccessor() {
  const data = clone(original), after = story(data), before = clone(after);
  after.headline = `${after.headline} Updated`;
  after.updatedAt = "2026-09-06T01:00:00Z";
  after.lastCheckedAt = "2026-09-06T01:00:00Z";
  after.bigPicture.lastMeaningfullyUpdatedAt = "2026-09-06";
  after.bigPicture.sourcesLastCheckedAt = "2026-09-06";
  return { data, before, after };
}

try {
  const base = artifact("base", clone(original));

  const checkOnly = clone(original);
  const checkOnlyStory = story(checkOnly);
  checkOnlyStory.updatedAt = "2026-09-06T01:00:00Z";
  checkOnlyStory.lastCheckedAt = "2026-09-06T01:00:00Z";
  checkOnlyStory.bigPicture.sourcesLastCheckedAt = "2026-09-06";
  checkOnlyStory.bigPicture.changeLog = checkOnlyStory.bigPicture.changeLog.map(item => ({ ...item, summary: "A reader-facing update summary." }));
  const sourceCheck = artifact("source-check-only", checkOnly);
  const sourceCheckResult = run(base, sourceCheck, "source-check");
  assert.equal(sourceCheckResult.status, 0, sourceCheckResult.stderr);

  const unearned = clone(original);
  const unearnedStory = story(unearned);
  const unearnedSnapshot = versions.createSnapshot(unearnedStory, { versionId: "synthetic-unearned-public", replacedAt: "2026-09-06T01:00:00Z", summary: "An unearned snapshot calibration." }, proofFor(unearnedStory));
  assert.equal(unearnedSnapshot.ok, true, unearnedSnapshot.reason);
  unearnedStory.bigPicture.previousVersions = [...(unearnedStory.bigPicture.previousVersions || []), unearnedSnapshot.snapshot];
  rejects(run(base, artifact("unearned-snapshot", unearned), "unearned"), /added an unearned retained version/);

  const missing = meaningfulSuccessor();
  rejects(run(base, artifact("meaningful-without-snapshot", missing.data), "missing"), /changed public article fields without one appended snapshot/);

  const retained = meaningfulSuccessor();
  appendSnapshot(retained.before, retained.after);
  const retainedResult = run(base, artifact("meaningful-with-snapshot", retained.data), "retained");
  assert.equal(retainedResult.status, 0, retainedResult.stderr);

  const corrected = meaningfulSuccessor();
  corrected.after.status = "corrected";
  appendSnapshot(corrected.before, corrected.after, "synthetic-corrected-public");
  const correctedResult = run(base, artifact("corrected-with-snapshot", corrected.data), "corrected");
  assert.equal(correctedResult.status, 0, correctedResult.stderr);

  const staleMeaningful = meaningfulSuccessor();
  staleMeaningful.after.bigPicture.lastMeaningfullyUpdatedAt = staleMeaningful.before.bigPicture.lastMeaningfullyUpdatedAt;
  appendSnapshot(staleMeaningful.before, staleMeaningful.after, "synthetic-stale-meaningful");
  rejects(run(base, artifact("stale-meaningful", staleMeaningful.data), "stale-meaningful"), /meaningful-update timestamp did not advance/);

  const equalReplacement = meaningfulSuccessor();
  appendSnapshot(equalReplacement.before, equalReplacement.after, "synthetic-equal-replacement", `${equalReplacement.before.bigPicture.lastMeaningfullyUpdatedAt}T00:00:00Z`);
  rejects(run(base, artifact("equal-replacement", equalReplacement.data), "equal-replacement"), /snapshot replacement is not after/);

  const privateSnapshot = meaningfulSuccessor();
  appendSnapshot(privateSnapshot.before, privateSnapshot.after, "synthetic-private");
  privateSnapshot.after.bigPicture.previousVersions.at(-1).article.heroVisual.internalNote = "hidden";
  rejects(run(base, artifact("private-snapshot", privateSnapshot.data), "private"), /retained versions are invalid/);

  const changedSnapshot = meaningfulSuccessor();
  appendSnapshot(changedSnapshot.before, changedSnapshot.after, "synthetic-changed");
  changedSnapshot.after.bigPicture.previousVersions.at(-1).article.headline = "Not the predecessor";
  rejects(run(base, artifact("changed-snapshot", changedSnapshot.data), "changed"), /retained versions are invalid|does not exactly retain/);

  const seeded = clone(original);
  const seededStory = story(seeded);
  const seed = versions.createSnapshot(seededStory, { versionId: "synthetic-existing-public", replacedAt: "2026-09-06T01:00:00Z", summary: "A prior public version for retention calibration." }, proofFor(seededStory));
  assert.equal(seed.ok, true, seed.reason);
  seededStory.bigPicture.previousVersions = [...(seededStory.bigPicture.previousVersions || []), seed.snapshot];
  const seededBase = artifact("seeded-base", seeded);
  const removed = clone(seeded); story(removed).bigPicture.previousVersions.pop();
  rejects(run(seededBase, artifact("removed-snapshot", removed), "removed"), /retained versions were removed or changed/);

  const swapped = clone(original); story(swapped).id = "different-big-picture";
  rejects(run(base, artifact("swapped", swapped), "swapped"), /removed or swapped/);

  const duplicate = clone(original); duplicate.stories.push(clone(story(duplicate)));
  rejects(run(base, artifact("duplicate-id", duplicate), "duplicate"), /duplicate story id/);

  const changedPublicationDate = clone(original); story(changedPublicationDate).publishedAt = "2026-08-25T17:00:00Z";
  rejects(run(base, artifact("changed-publication-date", changedPublicationDate), "publication-date"), /publication date changed/);

  const withdrawal = clone(original); story(withdrawal).status = "hold";
  const withdrawalResult = run(base, artifact("withdrawal", withdrawal), "withdrawal");
  assert.equal(withdrawalResult.status, 0, withdrawalResult.stderr);
  const changedWithdrawal = clone(withdrawal); changedWithdrawal.stories.find(item => item.edition === "big-picture").headline = "Changed while held";
  rejects(run(base, artifact("changed-withdrawal", changedWithdrawal), "changed-withdrawal"), /must retain its prior public prose and history/);

  const staleCandidate = artifact("stale-bytes", clone(original));
  fs.appendFileSync(path.join(staleCandidate.dir, "content/newsstand-stories.js"), "\n// stale manifest calibration\n");
  const staleManifest = JSON.parse(fs.readFileSync(staleCandidate.manifest, "utf8"));
  staleManifest.files.find(file => file.path === "content/newsstand-stories.js").sha256 = "b".repeat(64);
  fs.writeFileSync(staleCandidate.manifest, JSON.stringify(staleManifest));
  rejects(run(base, staleCandidate, "stale"), /dataset bytes do not match its manifest/);

  const unavailableManifest = JSON.parse(fs.readFileSync(sourceCheck.manifest, "utf8"));
  unavailableManifest.artifactDirectory = path.join(temp, "missing-artifact-directory");
  const unavailablePath = path.join(temp, "unavailable.manifest.json");
  fs.writeFileSync(unavailablePath, JSON.stringify(unavailableManifest));
  rejects(spawnSync(process.execPath, [CHECKER, base.manifest, unavailablePath, scope("unavailable")], { cwd: ROOT, encoding: "utf8" }), /artifact dataset is unavailable/);
  const unavailableBaseManifest = JSON.parse(fs.readFileSync(base.manifest, "utf8"));
  unavailableBaseManifest.artifactDirectory = path.join(temp, "missing-base-artifact-directory");
  const unavailableBasePath = path.join(temp, "unavailable-base.manifest.json");
  fs.writeFileSync(unavailableBasePath, JSON.stringify(unavailableBaseManifest));
  rejects(spawnSync(process.execPath, [CHECKER, unavailableBasePath, unavailablePath, scope("unavailable-both")], { cwd: ROOT, encoding: "utf8" }), /artifact dataset is unavailable/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log("✓ BIG PICTURE RETENTION: manifest-bound artifacts retain exact prior public prose; source checks, log sanitisation, and held withdrawal pass; missing, altered, private, unearned, removed, swapped, duplicate, stale, and unavailable cases reject");
