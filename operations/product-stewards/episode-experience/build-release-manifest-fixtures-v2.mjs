import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "fixtures", "release-manifest-v2");
const valid = join(root, "valid");
const invalid = join(root, "invalid");

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
}

function sha(value) {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex");
}

function envelope(recordType, payload) {
  const body = { schemaVersion: "2.0.0", recordType, payload };
  return {
    body,
    integrity: {
      algorithm: "sha-256",
      canonicalization: "RFC8785-JCS",
      bodySha256: sha(body)
    }
  };
}

async function put(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

await rm(root, { recursive: true, force: true });
await mkdir(valid, { recursive: true });
await mkdir(invalid, { recursive: true });

const historyEmpty = {
  episodeId: "episode-05",
  asOf: "2026-07-26T11:55:00Z",
  accepted: []
};
await put(join(root, "history-empty.json"), historyEmpty);

const candidate1Payload = {
  transactionId: "ep05-add-v1",
  transactionType: "addition",
  createdAt: "2026-07-26T12:00:00Z",
  episode: { id: "episode-05", title: "The Super Models" },
  issue: {
    route: "/issues/issue-05.html",
    artifactPath: "issues/issue-05.html",
    artifactSha256: "1111111111111111111111111111111111111111111111111111111111111111"
  },
  formats: {
    readingIssue: {
      present: true,
      artifactPath: "issues/issue-05.html",
      artifactSha256: "1111111111111111111111111111111111111111111111111111111111111111",
      mediaQualityVerdict: null,
      accessibilityVerdict: "accepted"
    },
    narratedListenAlong: {
      present: false,
      artifactPath: null,
      artifactSha256: null,
      mediaQualityVerdict: null,
      accessibilityVerdict: null
    },
    visualEdition: {
      present: false,
      artifactPath: null,
      artifactSha256: null,
      mediaQualityVerdict: null,
      accessibilityVerdict: null
    },
    motionFilm: {
      present: false,
      artifactPath: null,
      artifactSha256: null,
      mediaQualityVerdict: null,
      accessibilityVerdict: null
    }
  },
  dependencies: { requiredTransactionFiles: ["issues/issue-05.html"] },
  candidate: { id: "ep05-candidate-v1", productionVerdicts: [], independentVerdicts: [] },
  supersession: {
    supersedesCandidateId: null,
    supersedesCandidateBodySha256: null,
    invalidatesAdmissions: [],
    reason: null
  },
  historyContext: {
    ledgerPath: "history-empty.json",
    ledgerSha256: sha(historyEmpty),
    acceptedCandidateCount: 0
  },
  proposedAvailability: {
    editorialState: "forthcoming",
    readingIssue: "forthcoming",
    narratedListenAlong: "unavailable",
    visualEdition: "unavailable",
    motionFilm: "unavailable"
  },
  rollback: { mode: "no-prior", candidateId: null, chickFlicksAdmissionId: null }
};
const candidate1 = envelope("engine-candidate", candidate1Payload);
await put(join(valid, "first-addition.json"), candidate1);

const admission1Payload = {
  admissionId: "cf-admission-v1",
  transactionId: "ep05-add-v1",
  candidateId: "ep05-candidate-v1",
  candidateBodySha256: candidate1.integrity.bodySha256,
  createdAt: "2026-07-26T12:30:00Z",
  disposition: "partial",
  formats: {
    readingIssue: "accepted",
    narratedListenAlong: "unavailable",
    visualEdition: "unavailable",
    motionFilm: "unavailable"
  },
  reasons: ["reading issue only"],
  controlRoomLockId: null,
  supersedesAdmissionBodySha256: null
};
const admission1 = envelope("chick-flicks-admission", admission1Payload);
await put(join(valid, "admission-v1.json"), admission1);

const historyPrior = {
  episodeId: "episode-05",
  asOf: "2026-07-26T12:55:00Z",
  accepted: [{
    candidateId: "ep05-candidate-v1",
    candidateBodySha256: candidate1.integrity.bodySha256,
    chickFlicksAdmissionId: "cf-admission-v1",
    chickFlicksAdmissionBodySha256: admission1.integrity.bodySha256
  }]
};
await put(join(root, "history-with-prior.json"), historyPrior);

const candidate2Payload = {
  ...candidate1Payload,
  transactionId: "ep05-correction-v2",
  transactionType: "correction",
  createdAt: "2026-07-26T13:00:00Z",
  candidate: { id: "ep05-candidate-v2", productionVerdicts: [], independentVerdicts: [] },
  supersession: {
    supersedesCandidateId: "ep05-candidate-v1",
    supersedesCandidateBodySha256: candidate1.integrity.bodySha256,
    invalidatesAdmissions: ["cf-admission-v1"],
    reason: "correction"
  },
  historyContext: {
    ledgerPath: "history-with-prior.json",
    ledgerSha256: sha(historyPrior),
    acceptedCandidateCount: 1
  },
  rollback: {
    mode: "restore-prior",
    candidateId: "ep05-candidate-v1",
    chickFlicksAdmissionId: "cf-admission-v1"
  }
};
const candidate2 = envelope("engine-candidate", candidate2Payload);
await put(join(valid, "correction-v2.json"), candidate2);

const admission2 = envelope("chick-flicks-admission", {
  ...admission1Payload,
  admissionId: "cf-admission-v2",
  transactionId: "ep05-correction-v2",
  candidateId: "ep05-candidate-v2",
  candidateBodySha256: candidate2.integrity.bodySha256,
  createdAt: "2026-07-26T13:15:00Z",
  disposition: "accept",
  reasons: [],
  supersedesAdmissionBodySha256: null
});
await put(join(valid, "admission-v2.json"), admission2);

const engineFailed = envelope("engine-public-proof-receipt", {
  receiptId: "engine-proof-failed-v1",
  candidateId: "ep05-candidate-v1",
  candidateBodySha256: candidate1.integrity.bodySha256,
  observedAt: "2026-07-26T12:35:00Z",
  verdict: "failed",
  evidence: [{
    path: "proof/engine-failed.json",
    sha256: "2222222222222222222222222222222222222222222222222222222222222222"
  }],
  supersedesReceiptBodySha256: null,
  previousReceiptBodySha256: null
});
await put(join(valid, "engine-proof-failed.json"), engineFailed);
const engineVerified = envelope("engine-public-proof-receipt", {
  ...engineFailed.body.payload,
  receiptId: "engine-proof-verified-v1",
  observedAt: "2026-07-26T12:45:00Z",
  verdict: "verified",
  evidence: [{
    path: "proof/engine-verified.json",
    sha256: "3333333333333333333333333333333333333333333333333333333333333333"
  }],
  supersedesReceiptBodySha256: engineFailed.integrity.bodySha256,
  previousReceiptBodySha256: engineFailed.integrity.bodySha256
});
await put(join(valid, "engine-proof-verified.json"), engineVerified);

const cfFailed = envelope("chick-flicks-public-proof-receipt", {
  receiptId: "cf-proof-failed-v1",
  candidateId: "ep05-candidate-v1",
  candidateBodySha256: candidate1.integrity.bodySha256,
  admissionId: "cf-admission-v1",
  admissionBodySha256: admission1.integrity.bodySha256,
  observedAt: "2026-07-26T12:36:00Z",
  verdict: "failed",
  evidence: [{
    path: "proof/cf-failed.json",
    sha256: "4444444444444444444444444444444444444444444444444444444444444444"
  }],
  supersedesReceiptBodySha256: null,
  previousReceiptBodySha256: null
});
await put(join(valid, "cf-proof-failed.json"), cfFailed);
const cfVerified = envelope("chick-flicks-public-proof-receipt", {
  ...cfFailed.body.payload,
  receiptId: "cf-proof-verified-v1",
  observedAt: "2026-07-26T12:46:00Z",
  verdict: "verified",
  evidence: [{
    path: "proof/cf-verified.json",
    sha256: "5555555555555555555555555555555555555555555555555555555555555555"
  }],
  supersedesReceiptBodySha256: cfFailed.integrity.bodySha256,
  previousReceiptBodySha256: cfFailed.integrity.bodySha256
});
await put(join(valid, "cf-proof-verified.json"), cfVerified);

const hold = envelope("episode-availability-control", {
  transactionId: "ep05-hold-v1",
  transactionType: "hold",
  createdAt: "2026-07-26T12:10:00Z",
  episodeId: "episode-05",
  target: {
    candidateId: "ep05-candidate-v1",
    candidateBodySha256: candidate1.integrity.bodySha256,
    chickFlicksAdmissionId: null,
    chickFlicksAdmissionBodySha256: null
  },
  scope: { editorialPackage: true, formats: [] },
  reason: "independent acceptance not complete",
  effectiveAt: "2026-07-26T12:10:00Z",
  safePublicState: "unavailable",
  historyContext: {
    ledgerPath: "history-empty.json",
    ledgerSha256: sha(historyEmpty),
    acceptedCandidateCount: 0
  },
  restore: { mode: "no-prior", candidateId: null, chickFlicksAdmissionId: null }
});
await put(join(valid, "hold-no-prior.json"), hold);

const removal = envelope("episode-availability-control", {
  transactionId: "ep05-removal-v1",
  transactionType: "removal",
  createdAt: "2026-07-26T13:20:00Z",
  episodeId: "episode-05",
  target: {
    candidateId: "ep05-candidate-v1",
    candidateBodySha256: candidate1.integrity.bodySha256,
    chickFlicksAdmissionId: "cf-admission-v1",
    chickFlicksAdmissionBodySha256: admission1.integrity.bodySha256
  },
  scope: { editorialPackage: true, formats: ["readingIssue"] },
  reason: "withdraw the admitted issue",
  effectiveAt: "2026-07-26T13:20:00Z",
  safePublicState: "removed",
  historyContext: {
    ledgerPath: "history-with-prior.json",
    ledgerSha256: sha(historyPrior),
    acceptedCandidateCount: 1
  },
  restore: {
    mode: "restore-prior",
    candidateId: "ep05-candidate-v1",
    chickFlicksAdmissionId: "cf-admission-v1"
  }
});
await put(join(valid, "removal-restore-prior.json"), removal);

const formatRevoke = envelope("chick-flicks-admission", {
  ...admission1Payload,
  admissionId: "cf-admission-format-revoke-v2",
  createdAt: "2026-07-26T13:25:00Z",
  disposition: "partial",
  formats: {
    readingIssue: "accepted",
    narratedListenAlong: "revoked",
    visualEdition: "unavailable",
    motionFilm: "unavailable"
  },
  reasons: ["listen-along revoked; reading issue remains valid"],
  supersedesAdmissionBodySha256: admission1.integrity.bodySha256
});
await put(join(valid, "format-revoke-reading-remains.json"), formatRevoke);

function altered(source, mutate) {
  const copy = structuredClone(source);
  mutate(copy);
  copy.integrity.bodySha256 = sha(copy.body);
  return copy;
}

const payloadOnly = structuredClone(candidate1);
payloadOnly.body.recordType = "episode-availability-control";
payloadOnly.integrity.bodySha256 = sha(payloadOnly.body.payload);
await put(join(invalid, "payload-only-relabel.json"), payloadOnly);

await put(join(invalid, "half-null-rollback.json"), altered(candidate2, (r) => {
  r.body.payload.rollback.chickFlicksAdmissionId = null;
}));
await put(join(invalid, "false-no-prior-history.json"), altered(candidate1, (r) => {
  r.body.payload.historyContext = {
    ledgerPath: "history-with-prior.json",
    ledgerSha256: sha(historyPrior),
    acceptedCandidateCount: 1
  };
}));
await put(join(invalid, "engine-cross-type-prior.json"), altered(engineVerified, (r) => {
  r.body.payload.previousReceiptBodySha256 = candidate1.integrity.bodySha256;
  r.body.payload.supersedesReceiptBodySha256 = candidate1.integrity.bodySha256;
}));
await put(join(invalid, "engine-cross-subject-prior.json"), altered(engineVerified, (r) => {
  r.body.payload.candidateId = "ep05-candidate-v2";
  r.body.payload.candidateBodySha256 = candidate2.integrity.bodySha256;
}));
await put(join(invalid, "engine-non-monotonic-prior.json"), altered(engineVerified, (r) => {
  r.body.payload.observedAt = "2026-07-26T12:34:00Z";
}));
await put(join(invalid, "cf-cross-type-prior.json"), altered(cfVerified, (r) => {
  r.body.payload.previousReceiptBodySha256 = admission1.integrity.bodySha256;
  r.body.payload.supersedesReceiptBodySha256 = admission1.integrity.bodySha256;
}));
await put(join(invalid, "cf-cross-subject-prior.json"), altered(cfVerified, (r) => {
  r.body.payload.candidateId = "ep05-candidate-v2";
  r.body.payload.candidateBodySha256 = candidate2.integrity.bodySha256;
  r.body.payload.admissionId = "cf-admission-v2";
  r.body.payload.admissionBodySha256 = admission2.integrity.bodySha256;
}));
await put(join(invalid, "cf-cross-admission-prior.json"), altered(cfVerified, (r) => {
  r.body.payload.admissionId = "cf-admission-v2";
  r.body.payload.admissionBodySha256 = admission2.integrity.bodySha256;
}));
await put(join(invalid, "cf-foreign-supersedes.json"), altered(cfVerified, (r) => {
  r.body.payload.supersedesReceiptBodySha256 = engineFailed.integrity.bodySha256;
}));
await put(join(invalid, "control-half-admission-target.json"), altered(hold, (r) => {
  r.body.payload.target.chickFlicksAdmissionId = "cf-admission-v1";
}));
await put(join(invalid, "invented-rollback-target.json"), altered(candidate2, (r) => {
  r.body.payload.rollback.candidateId = "invented-candidate";
  r.body.payload.rollback.chickFlicksAdmissionId = "invented-admission";
}));
await put(join(invalid, "invented-control-target.json"), altered(removal, (r) => {
  r.body.payload.target.candidateId = "invented-candidate";
}));
await put(join(invalid, "absent-motion-released.json"), altered(candidate1, (r) => {
  r.body.payload.proposedAvailability.motionFilm = "released";
}));
await put(join(invalid, "present-listen-no-media-verdict.json"), altered(candidate1, (r) => {
  r.body.payload.formats.narratedListenAlong = {
    present: true,
    artifactPath: "media/episode-05-listen.mp3",
    artifactSha256: "6666666666666666666666666666666666666666666666666666666666666666",
    mediaQualityVerdict: null,
    accessibilityVerdict: "accepted"
  };
  r.body.payload.dependencies.requiredTransactionFiles.push("media/episode-05-listen.mp3");
}));
await put(join(invalid, "rejected-player-caption-released.json"), altered(candidate1, (r) => {
  r.body.payload.formats.narratedListenAlong = {
    present: true,
    artifactPath: "media/episode-05-listen.mp3",
    artifactSha256: "6666666666666666666666666666666666666666666666666666666666666666",
    mediaQualityVerdict: "rejected",
    accessibilityVerdict: "rejected"
  };
  r.body.payload.proposedAvailability.narratedListenAlong = "released";
  r.body.payload.dependencies.requiredTransactionFiles.push("media/episode-05-listen.mp3");
}));
await put(join(invalid, "duplicate-required-files.json"), altered(candidate1, (r) => {
  r.body.payload.dependencies.requiredTransactionFiles.push("issues/issue-05.html");
}));
await put(join(invalid, "stray-media-no-transaction.json"), altered(candidate1, (r) => {
  r.body.payload.dependencies.requiredTransactionFiles.push("media/stray.mp4");
}));
await put(join(invalid, "unsafe-removal.json"), altered(removal, (r) => {
  r.body.payload.scope = { editorialPackage: false, formats: [] };
  r.body.payload.safePublicState = "held";
  r.body.payload.restore.candidateId = "invented-candidate";
  r.body.payload.restore.chickFlicksAdmissionId = "invented-admission";
}));
await put(join(invalid, "unknown-proof-supersedes.json"), altered(engineFailed, (r) => {
  r.body.payload.supersedesReceiptBodySha256 =
    "7777777777777777777777777777777777777777777777777777777777777777";
}));
await put(join(invalid, "proof-forked-head.json"), altered(engineVerified, (r) => {
  r.body.payload.receiptId = "engine-proof-fork-v1";
  r.body.payload.observedAt = "2026-07-26T12:50:00Z";
}));
await put(join(invalid, "proof-receipt-id-conflict.json"), altered(engineVerified, (r) => {
  r.body.payload.receiptId = "engine-proof-failed-v1";
}));

console.log(JSON.stringify({
  historyEmptySha256: sha(historyEmpty),
  candidate1BodySha256: candidate1.integrity.bodySha256,
  admission1BodySha256: admission1.integrity.bodySha256,
  historyPriorSha256: sha(historyPrior),
  candidate2BodySha256: candidate2.integrity.bodySha256,
  admission2BodySha256: admission2.integrity.bodySha256,
  engineFailedBodySha256: engineFailed.integrity.bodySha256,
  cfFailedBodySha256: cfFailed.integrity.bodySha256
}, null, 2));
