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
fs.mkdirSync(path.join(ROOT, 'scripts'), { recursive: true });
fs.copyFileSync(path.join(SOURCE_ROOT, 'scripts/check-content-producer-contract.mjs'), path.join(ROOT, 'scripts/check-content-producer-contract.mjs'));
fs.copyFileSync(path.join(SOURCE_ROOT, 'scripts/newsstand-service-continuity.mjs'), path.join(ROOT, 'scripts/newsstand-service-continuity.mjs'));
fs.mkdirSync(path.join(ROOT, 'content'), { recursive: true });
fs.copyFileSync(path.join(SOURCE_ROOT, 'content/newsstand-reader-contract.js'), path.join(ROOT, 'content/newsstand-reader-contract.js'));
for (const relative of ['scripts/validate-newsstand-ordinary-story-candidate.mjs','scripts/check-prose-quality-admission.mjs','scripts/newsstand-career-lane.mjs','scripts/lib/newsstand-luminairy-links.mjs','scripts/compose-daily-edition.mjs','scripts/promote-daily-edition.mjs','scripts/publish-daily-edition.mjs','content/luminairy-profiles.json','content/newsstand-stories.js','content/daily-edition-columns.json','operations/agents/aidb-intelligence-desk/daily/2026-08-04.md','operations/agents/aidb-intelligence-desk/daily/2026-08-30.md']) {
  fs.mkdirSync(path.dirname(path.join(ROOT,relative)),{recursive:true});
  let bytes=fs.readFileSync(path.join(SOURCE_ROOT,relative),'utf8');
  if(relative==='content/newsstand-stories.js') bytes+='\nwindow.NEWSSTAND_DATA.publications.weekly.status="quiet";\n';
  fs.writeFileSync(path.join(ROOT,relative),bytes);
}
const {composeDailyEnvelope}=await import(pathToFileURL(path.join(ROOT,'scripts/compose-daily-edition.mjs')));
const {promoteDailyIssue}=await import(pathToFileURL(path.join(ROOT,'scripts/promote-daily-edition.mjs')));
const {projectDailySourceRaw}=await import(pathToFileURL(path.join(ROOT,'scripts/publish-daily-edition.mjs')));
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

const currentDate = "2026-08-30";
// The real bank can already contain Paige. Keep the synthetic empty-slot
// predecessor independent of the current production inventory.
const fixtureColumnsPath = path.join(ROOT, "content/daily-edition-columns.json");
const fixtureColumns = JSON.parse(fs.readFileSync(fixtureColumnsPath, "utf8"));
fixtureColumns.records = fixtureColumns.records.filter(record => !(record.editionDate === currentDate && record.type === "paige_tip"));
fs.writeFileSync(fixtureColumnsPath, JSON.stringify(fixtureColumns));
const currentRadarPath = path.join(ROOT, `operations/agents/aidb-intelligence-desk/daily/${currentDate}.md`);
const composeCurrent = () => composeDailyEnvelope({
  date: currentDate, radarRaw: fs.readFileSync(currentRadarPath, "utf8"), radarPath: currentRadarPath,
  storiesRaw: fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"), columnsRaw: fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8")
});
const currentBaseline = composeCurrent();
const currentEnvelope = JSON.parse(currentBaseline.canonical);
const currentDecision = { ...decision, editionDate: currentDate, envelopeSha256: crypto.createHash("sha256").update(currentBaseline.canonical).digest("hex"), reviewedAt: "2026-08-30T20:00:00Z" };
const currentPromoted = promoteDailyIssue({ store, envelope: currentEnvelope, envelopeRaw: currentBaseline.canonical, decision: currentDecision, maker: "daily-issue-maker" });
const predecessorStoriesPath = "operations/product-stewards/newsstand/evidence/service-revision-fixture/pre-publish-newsstand-stories.js";
const predecessorStoriesRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8");
fs.mkdirSync(path.dirname(path.join(ROOT, predecessorStoriesPath)), { recursive: true });
fs.writeFileSync(path.join(ROOT, predecessorStoriesPath), predecessorStoriesRaw);
const publishedStoriesRaw = projectDailySourceRaw({ raw: predecessorStoriesRaw, issue: currentPromoted.issue, columns: JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8")) });
fs.writeFileSync(path.join(ROOT, "content/newsstand-stories.js"), publishedStoriesRaw);
const changedColumns = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
const addedRecord = structuredClone(changedColumns.records.find(record => record.id === "DAILY-2026-08-30-CAREER-DELEGATION"));
assert.ok(addedRecord, "fixture needs the existing August 30 service record");
Object.assign(addedRecord, { id: "DAILY-2026-08-30-PAIGE-REVISION", type: "paige_tip", headline: "Revision-only service addition.", summary: "This test record is bound to the same-day service-revision path." });
changedColumns.records.push(addedRecord);
fs.writeFileSync(path.join(ROOT, "content/daily-edition-columns.json"), JSON.stringify(changedColumns));
const currentSuccessor = composeCurrent();
const currentSuccessorEnvelope = JSON.parse(currentSuccessor.canonical);
const serviceRevisionDecision = { schemaVersion: "daily-issue-service-revision-admission-v1", decision: "ACCEPT_LOCAL_CANONICAL_SUCCESSOR", editionDate: currentDate, envelopeSha256: crypto.createHash("sha256").update(currentSuccessor.canonical).digest("hex"), predecessorEnvelopeSha256: currentDecision.envelopeSha256, predecessorStories: { path: predecessorStoriesPath, sha256: crypto.createHash("sha256").update(predecessorStoriesRaw).digest("hex") }, addedServiceRecordIds: [addedRecord.id], reviewedAt: "2026-08-30T20:01:00Z", reviewedBy: "independent-daily-service-revision-judge", reviewerRole: "Independent NewsStand Daily service-revision judge" };
const writeEvidence = (relative, value) => {
  const raw = `${JSON.stringify(value, null, 2)}\n`;
  fs.writeFileSync(path.join(ROOT, relative), raw);
  return { path: relative, sha256: crypto.createHash("sha256").update(raw).digest("hex") };
};
const publishedBaseDirectory = "operations/product-stewards/newsstand/evidence/service-revision-fixture/published-base";
fs.mkdirSync(path.join(ROOT, publishedBaseDirectory), { recursive: true });
const deploymentId = "cdac28a7-05aa-45e7-9574-0be93534f48d";
const manifestIdentity = (files) => crypto.createHash("sha256").update(files.map((file) => `${file.sha256}  ${file.path}\n`).join("")).digest("hex");
const manifestFiles = [{ path: "content/newsstand-stories.js", sha256: crypto.createHash("sha256").update(publishedStoriesRaw).digest("hex") }];
const artifactIdentitySha256 = manifestIdentity(manifestFiles);
const manifest = { schema: "laidies-release-artifact-manifest/v1", identitySha256: artifactIdentitySha256, files: manifestFiles };
const manifestBinding = writeEvidence(`${publishedBaseDirectory}/manifest.json`, manifest);
const verification = { schemaVersion: "newsstand-published-base-verification-v1", deploymentId, artifactIdentitySha256, sourcePath: "content/newsstand-stories.js", sourceSha256: manifest.files[0].sha256, checkedAt: "2026-08-30T20:02:00.000Z", origins: [{ origin: "https://laidies.ai", url: "https://laidies.ai/content/newsstand-stories.js", status: 200, sha256: manifest.files[0].sha256, matched: true }, { origin: "https://cdac28a7.laidies-sunnyvaile.pages.dev", url: "https://cdac28a7.laidies-sunnyvaile.pages.dev/content/newsstand-stories.js", status: 200, sha256: manifest.files[0].sha256, matched: true }], limitation: "Public post-publication base, not recovery of an unavailable original input." };
const verificationBinding = writeEvidence(`${publishedBaseDirectory}/verification.json`, verification);
const publishedBase = { deploymentId, manifest: manifestBinding, verification: verificationBinding };
const publishedBaseDecision = { ...serviceRevisionDecision, publishedBase };
delete publishedBaseDecision.predecessorStories;
const serviceRevision = promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: serviceRevisionDecision, maker: "daily-issue-maker" });
assert.equal(serviceRevision.changed, true, "checksum-bound same-day service addition may replace the exact predecessor");
assert.equal(serviceRevision.issue.frontPaigeStoryId, currentPromoted.issue.frontPaigeStoryId, "service revision preserves Front PAiGE");
assert.deepEqual(serviceRevision.issue.storyIds, currentPromoted.issue.storyIds, "service revision preserves news membership");
assert.deepEqual(serviceRevision.issue.stories, currentPromoted.issue.stories, "service revision preserves news snapshots");
assert.ok(serviceRevision.issue.serviceRecordIds.includes(addedRecord.id), "service revision adds the independently named record");
assert.equal(promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: publishedBaseDecision, maker: "daily-issue-maker" }).changed, true, "published base may replace an unrecoverable predecessor source only when it is manifest and origin bound");
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...serviceRevisionDecision, addedServiceRecordIds: [] }, maker: "daily-issue-maker" }), /service revision/);
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...serviceRevisionDecision, predecessorStories: { ...serviceRevisionDecision.predecessorStories, sha256: "0".repeat(64) } }, maker: "daily-issue-maker" }), /does not bind the exact predecessor source/);
const wrongSourceFiles = [{ ...manifest.files[0], sha256: "0".repeat(64) }];
const wrongSourceManifestBinding = writeEvidence(`${publishedBaseDirectory}/wrong-source-manifest.json`, { ...manifest, identitySha256: manifestIdentity(wrongSourceFiles), files: wrongSourceFiles });
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...publishedBaseDecision, publishedBase: { ...publishedBase, manifest: wrongSourceManifestBinding } }, maker: "daily-issue-maker" }), /manifest does not bind current newsstand stories bytes/);
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...publishedBaseDecision, publishedBase: { ...publishedBase, manifest: { ...manifestBinding, sha256: "0".repeat(64) } } }, maker: "daily-issue-maker" }), /manifest checksum does not bind/);
const tamperedIdentityManifestBinding = writeEvidence(`${publishedBaseDirectory}/tampered-identity-manifest.json`, { ...manifest, identitySha256: "0".repeat(64) });
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...publishedBaseDecision, publishedBase: { ...publishedBase, manifest: tamperedIdentityManifestBinding } }, maker: "daily-issue-maker" }), /manifest identity is not computed/);
const wrongDeploymentVerificationBinding = writeEvidence(`${publishedBaseDirectory}/wrong-deployment-verification.json`, { ...verification, deploymentId: "wrong-deployment" });
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...publishedBaseDecision, publishedBase: { ...publishedBase, verification: wrongDeploymentVerificationBinding } }, maker: "daily-issue-maker" }), /verification does not bind the deployment/);
const missingOriginVerification = { ...verification, origins: [verification.origins[0]] };
const missingOriginVerificationBinding = writeEvidence(`${publishedBaseDirectory}/missing-origin-verification.json`, missingOriginVerification);
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: { ...publishedBaseDecision, publishedBase: { ...publishedBase, verification: missingOriginVerificationBinding } }, maker: "daily-issue-maker" }), /must include custom and immutable origin observations/);
const alteredReadyDeskStore = structuredClone(currentPromoted.store);
alteredReadyDeskStore.issues[0].desks.find(desk => desk.type === "career_life").summary = "Forged replacement.";
assert.throws(() => promoteDailyIssue({ store: alteredReadyDeskStore, envelope: currentSuccessorEnvelope, envelopeRaw: currentSuccessor.canonical, decision: serviceRevisionDecision, maker: "daily-issue-maker" }), /existing ready desk/);
const frontChanged = structuredClone(currentSuccessorEnvelope); frontChanged.frontPaigeStoryId = null;
const frontChangedRaw = `${JSON.stringify(frontChanged)}\n`;
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: frontChanged, envelopeRaw: frontChangedRaw, decision: { ...serviceRevisionDecision, envelopeSha256: crypto.createHash("sha256").update(frontChangedRaw).digest("hex") }, maker: "daily-issue-maker" }), /protected frontPaigeStoryId/);
const driftedStoriesRaw = publishedStoriesRaw.replace("No new news story was published today.", "A changed story source bypass attempt.");
assert.notEqual(driftedStoriesRaw, publishedStoriesRaw, "fixture must alter the projected stories source");
fs.writeFileSync(path.join(ROOT, "content/newsstand-stories.js"), driftedStoriesRaw);
const driftedSuccessor = composeCurrent();
assert.throws(() => promoteDailyIssue({ store: currentPromoted.store, envelope: JSON.parse(driftedSuccessor.canonical), envelopeRaw: driftedSuccessor.canonical, decision: { ...serviceRevisionDecision, envelopeSha256: crypto.createHash("sha256").update(driftedSuccessor.canonical).digest("hex") }, maker: "daily-issue-maker" }), /not the exact predecessor publication projection/);

console.log(`DAILY EDITION LOCAL CANONICAL WRITER TEST PASS admitted=1 idempotent=1 successor_replaced=1 successor_without_predecessor_rejected=1 wrong_predecessor_rejected=1 service_revision_added=1 service_revision_published_base_added=1 service_revision_addition_list_rejected=1 service_revision_predecessor_source_rejected=1 service_revision_published_base_wrong_source_rejected=1 service_revision_published_base_wrong_manifest_rejected=1 service_revision_published_base_tampered_identity_rejected=1 service_revision_published_base_wrong_deployment_rejected=1 service_revision_published_base_missing_origin_rejected=1 service_revision_ready_desk_rejected=1 service_revision_front_paige_rejected=1 service_revision_story_drift_rejected=1 checksum_tamper_rejected=1 self_approval_rejected=1 conflict_rejected=1 stored_tamper_rejected=1 duplicate_date_rejected=1 raw_object_mismatch_rejected=1 future_review_rejected=1 claimed_reviewer_rejected=1 unsafe_quiet_rejected=1 envelope_sha256=${envelopeSha256}`);
