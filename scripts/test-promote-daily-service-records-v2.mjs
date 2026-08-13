#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promoteDailyServiceRecordsV2 } from "./promote-daily-service-records-v2.mjs";

const TEMP = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-daily-service-v2-"));
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const write = (relative, value) => {
  const absolute = path.join(TEMP, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  const raw = typeof value === "string" ? value : `${JSON.stringify(value)}\n`;
  fs.writeFileSync(absolute, raw);
  return { path: relative, sha256: sha256(raw), raw };
};
const readBoundFile = relative => fs.readFileSync(path.join(TEMP, relative), "utf8");
const source = write("sources/current.md", "Exact current source evidence.\n");
const serviceReview = write("evidence/service-review.json", { verdict: "PASS", defects: [] });
const makeCandidate = ({ type, lane, recordId, headline, body, destination = null }) => write(`candidates/${type}.json`, {
  schemaVersion: "laidies-newsstand-service-exemplar.v1",
  candidateId: `candidate-${type}`,
  laneId: lane,
  status: "PRIVATE_REVIEW_CANDIDATE",
  editionDate: "2026-08-13",
  headline,
  body,
  destination,
  owner: "newsstand-daily",
  sourceEvidence: [{ path: source.path, sha256: source.sha256 }],
  freshness: { checkedAt: "2026-08-13T12:00:00Z", recheckTriggers: ["source changes"] },
  storage: { recordId, publicEligibility: "INELIGIBLE_PENDING_ALI_ACCEPTANCE" }
});
const paige = makeCandidate({
  type: "paige_tip",
  lane: "paige_tip",
  recordId: "DAILY-2026-08-13-PAIGE-CALIBRATION",
  headline: "One bounded work action",
  body: "This complete Paige column names a recognizable work moment, gives one exact action, explains the mechanism and preserves the important human check. The full useful substance stays readable in the newspaper rather than hiding behind another card or an empty label."
});
const career = makeCandidate({
  type: "career_life",
  lane: "career_work_life",
  recordId: "DAILY-2026-08-13-CAREER-CALIBRATION",
  headline: "One useful career action",
  body: "This complete career column starts with useful career guidance that works before AI enters. It gives concrete wording, earns one faithful AI connection, names where that comparison stops and closes with a realistic action the reader can take without sharing private information."
});
const song = write("candidates/song.json", {
  schemaVersion: "laidies-newsstand-daily-desk-candidate.v1",
  candidateId: "candidate-song",
  laneId: "song_of_the_day",
  classification: "audio",
  status: "PRIVATE_REVIEW_CANDIDATE",
  editionDate: "2026-08-13",
  headline: "One verified listening pick",
  body: "This complete Song of the Day selection names the track and artist, explains in one useful sentence why it belongs with today's paper and gives a currently lawful listening route without reproducing lyrics or implying that LAiDIES owns the recording.",
  destination: "https://example.com/current-lawful-listen-route",
  owner: "newsstand-daily",
  sourceEvidence: [{ path: source.path, sha256: source.sha256 }],
  freshness: { checkedAt: "2026-08-13T12:00:00Z", recheckTriggers: ["source changes"] },
  rightsAndAvailabilityVerified: true,
  storage: { recordId: "DAILY-2026-08-13-SONG-CALIBRATION", publicEligibility: "INELIGIBLE_PENDING_ALI_ACCEPTANCE" }
});
const readyDesk = (type, candidate, recordId, headline, summary, destination = null) => ({
  type,
  state: "ready",
  recordId,
  headline,
  summary,
  displayMode: "INLINE_FULL_USEFUL_SUBSTANCE",
  destination,
  sourceCandidate: { path: candidate.path, sha256: candidate.sha256 }
});
const emptyDesk = type => ({ type, state: "empty", recordId: null, emptyState: "No admitted item is filed in this desk today." });
const basePackage = {
  schemaVersion: "laidies-newsstand-complete-daily-review-package.v2",
  editionDate: "2026-08-13",
  status: "PRIVATE_COMPLETE_DAILY_REVIEW_CANDIDATE",
  publicEligibility: "INELIGIBLE_PENDING_ALI_APPROVAL",
  releaseAuthority: { canonicalWrite: false, deploy: false, public: false },
  desks: [
    readyDesk("paige_tip", paige, "DAILY-2026-08-13-PAIGE-CALIBRATION", "One bounded work action", JSON.parse(paige.raw).body),
    readyDesk("career_life", career, "DAILY-2026-08-13-CAREER-CALIBRATION", "One useful career action", JSON.parse(career.raw).body),
    readyDesk("song", song, "DAILY-2026-08-13-SONG-CALIBRATION", "One verified listening pick", JSON.parse(song.raw).body, "https://example.com/current-lawful-listen-route"),
    ...["promptoscope", "mme_claio", "did_you_know", "town_note", "curiosity", "fiction"].map(emptyDesk)
  ],
  evidence: { serviceReview: { path: serviceReview.path, sha256: serviceReview.sha256 } }
};
const packageRaw = `${JSON.stringify(basePackage)}\n`;
const approval = write("evidence/ali-approval.json", {
  schemaVersion: "laidies-ali-artifact-verdict.v1",
  decision: "APPROVE",
  artifactKind: "COMPLETE_DAILY_NEWSPAPER",
  editionDate: "2026-08-13",
  packageSha256: sha256(packageRaw),
  authority: "ALI_DIRECT_REVIEW"
});
const record = ({ type, classification, id, headline, summary, destination = null }) => ({
  id,
  editionDate: "2026-08-13",
  type,
  classification,
  status: "APPROVED",
  headline,
  summary,
  sourcePath: source.path,
  sourceId: "current-source",
  destination,
  owner: "newsstand-daily",
  freshness: { lastCheckedAt: "2026-08-13", expiresAt: "2026-09-13", recheckTriggers: ["source changes"] },
  reviewEvidence: Object.fromEntries(["accuracy", "editorial", "voice", "format", "owner", "safety"].map(key => [key, serviceReview.path])),
  publicEligibility: "ELIGIBLE"
});
const baseDecision = {
  schemaVersion: "daily-service-admission-v2",
  decision: "ACCEPT_LOCAL_CANONICAL_WRITE",
  editionDate: "2026-08-13",
  packageSha256: sha256(packageRaw),
  reviewedAt: "2026-08-13T15:00:00Z",
  reviewedBy: "independent-service-release-reviewer",
  reviewerRole: "Independent Daily service release reviewer",
  aliApproval: { path: approval.path, sha256: approval.sha256 },
  serviceReview: { path: serviceReview.path, sha256: serviceReview.sha256 },
  records: [
    record({ type: "paige_tip", classification: "sourced_service", id: "DAILY-2026-08-13-PAIGE-CALIBRATION", headline: "One bounded work action", summary: JSON.parse(paige.raw).body }),
    record({ type: "career_life", classification: "sourced_service", id: "DAILY-2026-08-13-CAREER-CALIBRATION", headline: "One useful career action", summary: JSON.parse(career.raw).body }),
    record({ type: "song", classification: "audio", id: "DAILY-2026-08-13-SONG-CALIBRATION", headline: "One verified listening pick", summary: JSON.parse(song.raw).body, destination: "https://example.com/current-lawful-listen-route" })
  ]
};
const baseStore = { schemaVersion: "1.0.0", owner: "newsstand-daily", updatedAt: "2026-08-12", emptyStates: {}, records: [] };
const run = ({ store = baseStore, pkg = basePackage, decision = baseDecision, maker = "service-record-maker", packageInspector = () => ({ errors: [] }), serviceInspector = () => ({ errors: [] }) } = {}) => {
  const raw = `${JSON.stringify(pkg)}\n`;
  const nextDecision = structuredClone(decision);
  nextDecision.packageSha256 = sha256(raw);
  if (nextDecision.aliApproval.path === approval.path) {
    const boundApproval = parseApproval(nextDecision.aliApproval.path);
    if (boundApproval.packageSha256 !== nextDecision.packageSha256) {
      const successor = write(`evidence/ali-${nextDecision.packageSha256.slice(0, 8)}.json`, { ...boundApproval, packageSha256: nextDecision.packageSha256 });
      nextDecision.aliApproval = { path: successor.path, sha256: successor.sha256 };
    }
  }
  return promoteDailyServiceRecordsV2({
    store,
    packageRaw: raw,
    decisionRaw: `${JSON.stringify(nextDecision)}\n`,
    maker,
    readBoundFile,
    now: "2026-08-13T16:00:00Z",
    packageInspector,
    serviceInspector
  });
};
const parseApproval = relative => JSON.parse(readBoundFile(relative));

try {
  const promoted = run();
  assert.equal(promoted.changed, true);
  assert.equal(promoted.records.length, 3);
  assert.equal(promoted.store.records.length, 3);
  const retried = run({ store: promoted.store });
  assert.equal(retried.changed, false);

  const oldPackage = structuredClone(basePackage);
  oldPackage.schemaVersion = "laidies-newsstand-complete-daily-review-package.v1";
  assert.throws(() => run({ pkg: oldPackage }), /complete-Daily v2/);

  const missingRecord = structuredClone(baseDecision);
  missingRecord.records.pop();
  assert.throws(() => run({ decision: missingRecord }), /every and only READY/);

  const extraRecord = structuredClone(baseDecision);
  extraRecord.records.push({ ...extraRecord.records[0], id: "extra", type: "promptoscope" });
  assert.throws(() => run({ decision: extraRecord }), /every and only READY/);

  const rejectedApproval = write("evidence/ali-rejected.json", { ...parseApproval(approval.path), decision: "REJECT" });
  const rejectedDecision = structuredClone(baseDecision);
  rejectedDecision.aliApproval = { path: rejectedApproval.path, sha256: rejectedApproval.sha256 };
  assert.throws(() => run({ decision: rejectedDecision }), /Ali approval/);

  assert.throws(() => run({ maker: baseDecision.reviewedBy }), /independent admission identity/);

  const badCandidateValue = JSON.parse(paige.raw);
  badCandidateValue.sourceEvidence[0].sha256 = "0".repeat(64);
  const badCandidate = write("candidates/paige-stale-source.json", badCandidateValue);
  const stalePackage = structuredClone(basePackage);
  stalePackage.desks[0].sourceCandidate = { path: badCandidate.path, sha256: badCandidate.sha256 };
  assert.throws(() => run({ pkg: stalePackage }), /source bytes changed/);

  const unsupportedPackage = structuredClone(basePackage);
  unsupportedPackage.desks[0].type = "unknown_desk";
  assert.throws(() => run({ pkg: unsupportedPackage }), /has no admitted v2 promotion contract/);

  const songWithoutRights = JSON.parse(song.raw);
  songWithoutRights.rightsAndAvailabilityVerified = false;
  const badSong = write("candidates/song-no-rights.json", songWithoutRights);
  const noRightsPackage = structuredClone(basePackage);
  noRightsPackage.desks.find(desk => desk.type === "song").sourceCandidate = { path: badSong.path, sha256: badSong.sha256 };
  assert.throws(() => run({ pkg: noRightsPackage }), /rights and availability/);

  const noReadyPackage = structuredClone(basePackage);
  noReadyPackage.desks = noReadyPackage.desks.map(desk => emptyDesk(desk.type));
  assert.throws(() => run({ pkg: noReadyPackage }), /no READY service desks/);

  const conflictingStore = structuredClone(baseStore);
  conflictingStore.records.push({ ...baseDecision.records[0], id: "different-paige-id" });
  assert.throws(() => run({ store: conflictingStore }), /slot already exists/);

  assert.throws(() => run({ packageInspector: () => ({ errors: ["calibrated complete-Daily failure"] }) }), /calibrated complete-Daily failure/);
  assert.throws(() => run({ serviceInspector: () => ({ errors: ["calibrated service failure"] }) }), /calibrated service failure/);

  console.log("DAILY SERVICE V2 PROMOTION CALIBRATION PASS variable_ready=3 governed_types=9 idempotent=1 mutations=12 write_default=dry-run deploy=false");
} finally {
  fs.rmSync(TEMP, { recursive: true, force: true });
}
