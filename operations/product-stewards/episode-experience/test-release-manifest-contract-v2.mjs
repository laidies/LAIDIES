import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const schemaRelative = "schema/episode-release-envelope-v2.0.0.schema.json";
const schemaPath = join(here, schemaRelative);
const candidatePath = join(here, "release-manifest-schema-candidate-v2-2026-07-26.json");
const fixturesRoot = join(here, "fixtures", "release-manifest-v2");
const validDir = join(fixturesRoot, "valid");
const invalidDir = join(fixturesRoot, "invalid");
const temporary = await mkdtemp(join(tmpdir(), "laidies-release-v2-"));
let fixtureValidationStarted = false;

class ContractError extends Error {
  constructor(code, detail = "") {
    super(`${code}${detail ? `: ${detail}` : ""}`);
    this.code = code;
  }
}

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
}

function shaValue(value) {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex");
}

function shaBytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function verifyCandidate(candidateFile = candidatePath) {
  const candidate = await json(candidateFile);
  if (candidate.payload.candidateId !== "EPX-CF13-SCHEMA-2026-07-26-v2") {
    throw new ContractError("CANDIDATE_ID_MISMATCH");
  }
  if (candidate.payload.contractSchemaVersion !== "2.0.0") {
    throw new ContractError("CANDIDATE_SCHEMA_VERSION_MISMATCH");
  }
  if (candidate.integrity.payloadSha256 !== shaValue(candidate.payload)) {
    throw new ContractError("CANDIDATE_PAYLOAD_HASH_MISMATCH");
  }
  for (const entry of candidate.payload.files) {
    let bytes;
    try {
      bytes = await readFile(join(here, entry.path));
    } catch {
      throw new ContractError("CANDIDATE_FILE_MISSING", entry.path);
    }
    if (shaBytes(bytes) !== entry.sha256) {
      throw new ContractError("CANDIDATE_FILE_HASH_MISMATCH", entry.path);
    }
  }
  const boundSchema = candidate.payload.files.find((entry) => entry.path === schemaRelative);
  if (!boundSchema) throw new ContractError("CANDIDATE_SCHEMA_NOT_BOUND");
  return candidate;
}

function ajv(schema, data) {
  const result = spawnSync(
    "npx",
    ["--yes", "ajv-cli@5.0.0", "validate", "--spec=draft2020", "--strict=false", "--all-errors", "-s", schema, "-d", data],
    { encoding: "utf8" }
  );
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

async function schemaValidate(record, schema = schemaPath) {
  const path = join(temporary, `record-${crypto.randomUUID()}.json`);
  await writeFile(path, `${JSON.stringify(record, null, 2)}\n`);
  const result = ajv(schema, path);
  if (result.status !== 0) throw new ContractError("SCHEMA_INVALID", result.output.trim());
}

function requireRecord(records, hash, type, code) {
  const record = records.get(hash);
  if (!record) throw new ContractError(code, `unknown ${hash}`);
  if (record.body.recordType !== type) throw new ContractError(code, `expected ${type}`);
  return record;
}

function sameProofSubject(a, b) {
  if (a.candidateId !== b.candidateId || a.candidateBodySha256 !== b.candidateBodySha256) return false;
  if ("admissionId" in a || "admissionId" in b) {
    return a.admissionId === b.admissionId && a.admissionBodySha256 === b.admissionBodySha256;
  }
  return true;
}

function historyFor(payload, histories) {
  const context = payload.historyContext;
  const history = histories.get(context.ledgerPath);
  if (!history || shaValue(history) !== context.ledgerSha256) {
    throw new ContractError("HISTORY_CONTEXT_HASH_MISMATCH");
  }
  if (history.accepted.length !== context.acceptedCandidateCount) {
    throw new ContractError("HISTORY_CONTEXT_COUNT_MISMATCH");
  }
  return history;
}

function validateRestore(pair, history, codePrefix) {
  if (pair.mode === "no-prior") {
    if (history.accepted.length !== 0) throw new ContractError(`${codePrefix}_HISTORY_NOT_EMPTY`);
    return;
  }
  const found = history.accepted.some((entry) =>
    entry.candidateId === pair.candidateId
    && entry.chickFlicksAdmissionId === pair.chickFlicksAdmissionId);
  if (!found) throw new ContractError(`${codePrefix}_TARGET_NOT_ACCEPTED`);
}

function expectedFiles(payload) {
  const paths = [payload.issue.artifactPath];
  for (const format of Object.values(payload.formats)) {
    if (format.present && !paths.includes(format.artifactPath)) paths.push(format.artifactPath);
  }
  return paths.sort();
}

function validateSemantics(record, records, histories, allValid) {
  const { recordType, payload } = record.body;
  if (record.integrity.bodySha256 !== shaValue(record.body)) {
    throw new ContractError("BODY_HASH_MISMATCH");
  }
  if (recordType === "engine-candidate") {
    const history = historyFor(payload, histories);
    validateRestore(payload.rollback, history, "ROLLBACK");
    if (payload.rollback.mode === "no-prior" && payload.transactionType !== "addition") {
      throw new ContractError("NO_PRIOR_REQUIRES_ADDITION");
    }
    if (["correction", "replacement"].includes(payload.transactionType)) {
      if (payload.rollback.mode !== "restore-prior") throw new ContractError("CORRECTION_REQUIRES_RESTORE_PRIOR");
      const prior = requireRecord(records, payload.supersession.supersedesCandidateBodySha256, "engine-candidate", "SUPERSEDED_CANDIDATE_UNKNOWN");
      if (prior.body.payload.candidate.id !== payload.supersession.supersedesCandidateId) {
        throw new ContractError("SUPERSEDED_CANDIDATE_ID_HASH_MISMATCH");
      }
    }
    for (const [name, format] of Object.entries(payload.formats)) {
      const availability = payload.proposedAvailability[name];
      if (!format.present && availability !== "unavailable") {
        throw new ContractError("ABSENT_FORMAT_HAS_AVAILABILITY", name);
      }
      if (name !== "readingIssue" && format.present && format.mediaQualityVerdict === null) {
        throw new ContractError("MEDIA_QUALITY_VERDICT_REQUIRED", name);
      }
      if (availability === "released"
        && (format.mediaQualityVerdict !== "accepted" || format.accessibilityVerdict !== "accepted")) {
        throw new ContractError("RELEASED_FORMAT_VERDICT_NOT_ACCEPTED", name);
      }
    }
    const required = [...payload.dependencies.requiredTransactionFiles].sort();
    if (JSON.stringify(required) !== JSON.stringify(expectedFiles(payload))) {
      throw new ContractError("REQUIRED_TRANSACTION_FILES_NOT_EXACT");
    }
  } else if (recordType === "chick-flicks-admission") {
    const candidate = requireRecord(records, payload.candidateBodySha256, "engine-candidate", "ADMISSION_CANDIDATE_UNKNOWN");
    if (candidate.body.payload.candidate.id !== payload.candidateId) {
      throw new ContractError("ADMISSION_CANDIDATE_ID_HASH_MISMATCH");
    }
    if (payload.supersedesAdmissionBodySha256) {
      const prior = requireRecord(records, payload.supersedesAdmissionBodySha256, "chick-flicks-admission", "SUPERSEDED_ADMISSION_UNKNOWN");
      if (prior.body.payload.candidateId !== payload.candidateId) {
        throw new ContractError("SUPERSEDED_ADMISSION_SUBJECT_MISMATCH");
      }
    }
  } else if (recordType.endsWith("public-proof-receipt")) {
    const proofType = recordType;
    requireRecord(records, payload.candidateBodySha256, "engine-candidate", "PROOF_CANDIDATE_UNKNOWN");
    if (recordType === "chick-flicks-public-proof-receipt") {
      requireRecord(records, payload.admissionBodySha256, "chick-flicks-admission", "PROOF_ADMISSION_UNKNOWN");
    }
    if (payload.previousReceiptBodySha256) {
      const previous = records.get(payload.previousReceiptBodySha256);
      if (!previous || previous.body.recordType !== proofType) throw new ContractError("PROOF_PREVIOUS_WRONG_TYPE");
      if (!sameProofSubject(payload, previous.body.payload)) throw new ContractError("PROOF_PREVIOUS_SUBJECT_MISMATCH");
      if (Date.parse(payload.observedAt) <= Date.parse(previous.body.payload.observedAt)) {
        throw new ContractError("PROOF_TIME_NOT_MONOTONIC");
      }
    }
    if (payload.supersedesReceiptBodySha256) {
      const superseded = records.get(payload.supersedesReceiptBodySha256);
      if (!superseded || superseded.body.recordType !== proofType) throw new ContractError("PROOF_SUPERSEDES_WRONG_TYPE");
      if (!sameProofSubject(payload, superseded.body.payload)) throw new ContractError("PROOF_SUPERSEDES_SUBJECT_MISMATCH");
      let cursor = payload.previousReceiptBodySha256;
      let found = false;
      while (cursor) {
        if (cursor === payload.supersedesReceiptBodySha256) found = true;
        const linked = records.get(cursor);
        cursor = linked?.body.payload.previousReceiptBodySha256 ?? null;
      }
      if (!found) throw new ContractError("PROOF_SUPERSEDES_NOT_IN_CHAIN");
    }
    if (payload.previousReceiptBodySha256) {
      const competing = allValid.find((other) =>
        other !== record
        && other.body.recordType === proofType
        && other.body.payload.previousReceiptBodySha256 === payload.previousReceiptBodySha256);
      if (competing) throw new ContractError("PROOF_PREVIOUS_NOT_CHAIN_HEAD");
    }
  } else if (recordType === "episode-availability-control") {
    const targetCandidate = requireRecord(records, payload.target.candidateBodySha256, "engine-candidate", "CONTROL_TARGET_CANDIDATE_UNKNOWN");
    if (targetCandidate.body.payload.candidate.id !== payload.target.candidateId) {
      throw new ContractError("CONTROL_TARGET_CANDIDATE_ID_HASH_MISMATCH");
    }
    if (payload.target.chickFlicksAdmissionBodySha256) {
      const admission = requireRecord(records, payload.target.chickFlicksAdmissionBodySha256, "chick-flicks-admission", "CONTROL_TARGET_ADMISSION_UNKNOWN");
      if (admission.body.payload.admissionId !== payload.target.chickFlicksAdmissionId
        || admission.body.payload.candidateBodySha256 !== payload.target.candidateBodySha256) {
        throw new ContractError("CONTROL_TARGET_ADMISSION_ID_HASH_MISMATCH");
      }
    }
    const history = historyFor(payload, histories);
    validateRestore(payload.restore, history, "RESTORE");
    const scoped = payload.scope.editorialPackage || payload.scope.formats.length > 0;
    if (!scoped) throw new ContractError("CONTROL_SCOPE_EMPTY");
    if (payload.transactionType === "removal" && !["removed", "unavailable"].includes(payload.safePublicState)) {
      throw new ContractError("REMOVAL_PUBLIC_STATE_UNSAFE");
    }
    if (payload.transactionType === "hold" && !["held", "unavailable"].includes(payload.safePublicState)) {
      throw new ContractError("HOLD_PUBLIC_STATE_UNSAFE");
    }
  }
}

const expectedCodes = {
  "payload-only-relabel.json": "BODY_HASH_MISMATCH",
  "half-null-rollback.json": "SCHEMA_INVALID",
  "false-no-prior-history.json": "ROLLBACK_HISTORY_NOT_EMPTY",
  "engine-cross-type-prior.json": "PROOF_PREVIOUS_WRONG_TYPE",
  "engine-cross-subject-prior.json": "PROOF_PREVIOUS_SUBJECT_MISMATCH",
  "engine-non-monotonic-prior.json": "PROOF_TIME_NOT_MONOTONIC",
  "cf-cross-type-prior.json": "PROOF_PREVIOUS_WRONG_TYPE",
  "cf-cross-subject-prior.json": "PROOF_PREVIOUS_SUBJECT_MISMATCH",
  "cf-cross-admission-prior.json": "PROOF_PREVIOUS_SUBJECT_MISMATCH",
  "cf-foreign-supersedes.json": "PROOF_SUPERSEDES_WRONG_TYPE",
  "control-half-admission-target.json": "SCHEMA_INVALID",
  "invented-rollback-target.json": "ROLLBACK_TARGET_NOT_ACCEPTED",
  "invented-control-target.json": "CONTROL_TARGET_CANDIDATE_ID_HASH_MISMATCH",
  "absent-motion-released.json": "ABSENT_FORMAT_HAS_AVAILABILITY",
  "present-listen-no-media-verdict.json": "MEDIA_QUALITY_VERDICT_REQUIRED",
  "rejected-player-caption-released.json": "RELEASED_FORMAT_VERDICT_NOT_ACCEPTED",
  "duplicate-required-files.json": "SCHEMA_INVALID",
  "stray-media-no-transaction.json": "REQUIRED_TRANSACTION_FILES_NOT_EXACT",
  "unsafe-removal.json": "RESTORE_TARGET_NOT_ACCEPTED",
  "unknown-proof-supersedes.json": "PROOF_SUPERSEDES_WRONG_TYPE"
  ,"proof-forked-head.json": "PROOF_PREVIOUS_NOT_CHAIN_HEAD"
  ,"proof-receipt-id-conflict.json": "RECEIPT_ID_CONFLICT"
};

try {
  await verifyCandidate();

  const candidateMutation = await json(candidatePath);
  candidateMutation.payload.files.find((entry) => entry.path === schemaRelative).sha256 = "0".repeat(64);
  candidateMutation.integrity.payloadSha256 = shaValue(candidateMutation.payload);
  const badCandidatePath = join(temporary, "bad-candidate.json");
  await writeFile(badCandidatePath, `${JSON.stringify(candidateMutation, null, 2)}\n`);
  await assert.rejects(() => verifyCandidate(badCandidatePath), (error) =>
    error.code === "CANDIDATE_FILE_HASH_MISMATCH");
  assert.equal(fixtureValidationStarted, false, "candidate checksum must fail before fixtures");

  const renamedCandidate = await json(candidatePath);
  renamedCandidate.payload.files.find((entry) => entry.path === schemaRelative).path =
    "schema/renamed-episode-release-envelope-v2.0.0.schema.json";
  renamedCandidate.integrity.payloadSha256 = shaValue(renamedCandidate.payload);
  const renamedCandidatePath = join(temporary, "renamed-candidate.json");
  await writeFile(renamedCandidatePath, `${JSON.stringify(renamedCandidate, null, 2)}\n`);
  await assert.rejects(() => verifyCandidate(renamedCandidatePath), (error) =>
    error.code === "CANDIDATE_FILE_MISSING");
  assert.equal(fixtureValidationStarted, false, "renamed schema must fail before fixtures");

  const missingSchema = ajv(join(temporary, "missing-schema.json"), join(validDir, "first-addition.json"));
  assert.notEqual(missingSchema.status, 0, "missing schema must fail closed");
  const malformedSchemaPath = join(temporary, "malformed-schema.json");
  await writeFile(malformedSchemaPath, "{\"type\":");
  assert.notEqual(ajv(malformedSchemaPath, join(validDir, "first-addition.json")).status, 0, "malformed schema must fail closed");

  const schema = await json(schemaPath);
  const weakened = structuredClone(schema);
  delete weakened.$defs.candidate.properties.dependencies.properties.requiredTransactionFiles.uniqueItems;
  const weakenedPath = join(temporary, "weakened-schema.json");
  await writeFile(weakenedPath, `${JSON.stringify(weakened, null, 2)}\n`);
  assert.equal(
    ajv(weakenedPath, join(invalidDir, "duplicate-required-files.json")).status,
    0,
    "constraint mutation sentinel: duplicate fixture must pass weakened schema"
  );

  fixtureValidationStarted = true;
  const histories = new Map([
    ["history-empty.json", await json(join(fixturesRoot, "history-empty.json"))],
    ["history-with-prior.json", await json(join(fixturesRoot, "history-with-prior.json"))]
  ]);
  const validNames = (await readdir(validDir)).filter((name) => name.endsWith(".json")).sort();
  const validRecords = await Promise.all(validNames.map((name) => json(join(validDir, name))));
  const records = new Map(validRecords.map((record) => [record.integrity.bodySha256, record]));
  assert.equal(records.size, validRecords.length, "immutable body hashes must be unique");
  const receiptIds = new Map();
  for (const record of validRecords.filter((item) => item.body.recordType.endsWith("public-proof-receipt"))) {
    const id = record.body.payload.receiptId;
    if (receiptIds.has(id) && receiptIds.get(id) !== record.integrity.bodySha256) {
      throw new ContractError("RECEIPT_ID_CONFLICT");
    }
    receiptIds.set(id, record.integrity.bodySha256);
  }
  for (const record of validRecords) {
    await schemaValidate(record);
    validateSemantics(record, records, histories, validRecords);
  }

  const invalidNames = (await readdir(invalidDir)).filter((name) => name.endsWith(".json")).sort();
  assert.deepEqual(invalidNames, Object.keys(expectedCodes).sort(), "every invalid fixture needs one exact expected code");
  for (const name of invalidNames) {
    const record = await json(join(invalidDir, name));
    let code = null;
    try {
      if (record.integrity.bodySha256 !== shaValue(record.body)) throw new ContractError("BODY_HASH_MISMATCH");
      await schemaValidate(record);
      if (expectedCodes[name] === "RECEIPT_ID_CONFLICT") {
        const existingHash = receiptIds.get(record.body.payload.receiptId);
        if (existingHash && existingHash !== record.integrity.bodySha256) {
          throw new ContractError("RECEIPT_ID_CONFLICT");
        }
      }
      validateSemantics(record, records, histories, validRecords);
    } catch (error) {
      code = error.code;
    }
    assert.equal(code, expectedCodes[name], `${name} must reject for its named reason`);
  }

  const engineFailed = await json(join(validDir, "engine-proof-failed.json"));
  const engineVerified = await json(join(validDir, "engine-proof-verified.json"));
  const cfFailed = await json(join(validDir, "cf-proof-failed.json"));
  const cfVerified = await json(join(validDir, "cf-proof-verified.json"));
  assert.equal(engineVerified.body.payload.previousReceiptBodySha256, engineFailed.integrity.bodySha256);
  assert.equal(cfVerified.body.payload.previousReceiptBodySha256, cfFailed.integrity.bodySha256);

  console.log(`RELEASE MANIFEST V2 CONTRACT PASS valid=${validNames.length} invalid=${invalidNames.length} schema=draft2020 mutation_controls=5`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
