import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(here, "fixtures", "release-manifest-v1.1");

function canonicalize(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("non-finite number");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
  }
  throw new TypeError(`unsupported JSON value: ${typeof value}`);
}

function payloadHash(payload) {
  return createHash("sha256").update(canonicalize(payload), "utf8").digest("hex");
}

function pairState(pair, label) {
  assert.ok(pair && typeof pair === "object", `${label} missing`);
  const left = pair.candidateId;
  const right = pair.chickFlicksAdmissionId;
  const bothNull = left === null && right === null;
  const bothStrings = typeof left === "string" && left.length > 0
    && typeof right === "string" && right.length > 0;
  assert.ok(bothNull || bothStrings, `${label} must be both-null or both-populated`);
  return bothNull ? "none" : "complete";
}

function validateEnvelope(record) {
  assert.deepEqual(
    Object.keys(record).sort(),
    ["integrity", "payload", "recordType", "schemaVersion"],
    "envelope has unknown/missing fields",
  );
  assert.equal(record.schemaVersion, "1.1.0");
  assert.equal(record.integrity.algorithm, "sha-256");
  assert.equal(record.integrity.canonicalization, "RFC8785-JCS");
  assert.match(record.integrity.payloadSha256, /^[0-9a-f]{64}$/);
  assert.equal(record.integrity.payloadSha256, payloadHash(record.payload), "payload hash mismatch");
}

function validateSemantics(record, recordsByHash) {
  const payload = record.payload;
  if (record.recordType === "engine-candidate") {
    assert.ok(!Object.hasOwn(payload, "enginePublicProof"), "candidate must not contain mutable public proof");
    assert.ok(!Object.hasOwn(payload.candidate, "manifestSha256"), "candidate payload must not hash itself");
    const rollback = pairState(payload.rollback, "rollback");
    if (payload.transactionType === "addition") {
      assert.equal(rollback, "none", "first-addition fixture must have no prior rollback");
    } else {
      assert.equal(rollback, "complete", "correction/replacement requires prior rollback pair");
      assert.ok(
        recordsByHash.has(payload.supersession.supersedesCandidatePayloadSha256),
        "correction/replacement references unknown superseded candidate",
      );
    }
  } else if (record.recordType === "engine-public-proof-receipt") {
    assert.notEqual(payload.verdict, "pending", "proof receipt cannot be pending");
    assert.ok(recordsByHash.has(payload.candidatePayloadSha256), "proof references unknown candidate hash");
    if (payload.previousReceiptPayloadSha256 !== null) {
      assert.ok(recordsByHash.has(payload.previousReceiptPayloadSha256), "proof chain references unknown receipt");
    }
  } else if (record.recordType === "chick-flicks-admission") {
    assert.ok(!Object.hasOwn(payload, "publicProof"), "admission must not contain mutable public proof");
    assert.ok(recordsByHash.has(payload.candidatePayloadSha256), "admission references unknown candidate");
  } else if (record.recordType === "chick-flicks-public-proof-receipt") {
    assert.notEqual(payload.verdict, "pending", "proof receipt cannot be pending");
    assert.ok(recordsByHash.has(payload.candidatePayloadSha256), "CF proof references unknown candidate");
    assert.ok(recordsByHash.has(payload.admissionPayloadSha256), "CF proof references unknown admission");
  } else if (record.recordType === "episode-availability-control") {
    pairState(payload.restore, "restore");
    assert.ok(["held", "removed", "unavailable"].includes(payload.safePublicState));
    assert.ok(recordsByHash.has(payload.target.candidatePayloadSha256), "control references unknown candidate");
    if (payload.target.chickFlicksAdmissionPayloadSha256 !== null) {
      assert.ok(
        recordsByHash.has(payload.target.chickFlicksAdmissionPayloadSha256),
        "control references unknown admission",
      );
    }
  } else {
    assert.fail(`unsupported recordType ${record.recordType}`);
  }
}

const fixtureFiles = (await readdir(fixturesDir))
  .filter((name) => name.endsWith(".json"))
  .sort();
const fixtures = new Map();
for (const name of fixtureFiles) {
  fixtures.set(name, JSON.parse(await readFile(path.join(fixturesDir, name), "utf8")));
}

const validNames = fixtureFiles.filter((name) => name.startsWith("valid-"));
const invalidNames = fixtureFiles.filter((name) => name.startsWith("invalid-"));
const recordsByHash = new Map();

assert.equal(
  canonicalize({z: -0, a: "é", aa: [3, true, null]}),
  "{\"a\":\"é\",\"aa\":[3,true,null],\"z\":0}",
  "canonicalizer regression",
);

for (const name of validNames) {
  const record = fixtures.get(name);
  validateEnvelope(record);
  recordsByHash.set(record.integrity.payloadSha256, record);
}
for (const name of validNames) {
  validateSemantics(fixtures.get(name), recordsByHash);
}

for (const name of invalidNames) {
  assert.throws(() => {
    const record = fixtures.get(name);
    validateEnvelope(record);
    validateSemantics(record, recordsByHash);
  }, undefined, `${name} should fail`);
}

const failedProof = fixtures.get("valid-engine-proof-failed.json");
const verifiedProof = fixtures.get("valid-engine-proof-verified.json");
assert.equal(
  verifiedProof.payload.previousReceiptPayloadSha256,
  failedProof.integrity.payloadSha256,
  "verified proof must append to failed proof",
);

console.log(`RELEASE MANIFEST CONTRACT PASS valid=${validNames.length} invalid=${invalidNames.length}`);
