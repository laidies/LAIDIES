import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  cp,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const platformDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(platformDir, "../../..");
const engineDir = path.join(
  repoRoot,
  "operations/product-stewards/episode-experience"
);
const fixtureDir = path.join(engineDir, "fixtures/release-manifest-v1.1");
const schemaPath = path.join(
  engineDir,
  "schema/episode-release-envelope.schema.json"
);
const candidatePath = path.join(
  engineDir,
  "release-manifest-schema-candidate-2026-07-26.json"
);
const makerTestPath = path.join(engineDir, "test-release-manifest-contract.mjs");

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
    return `{${keys.map((key) =>
      `${JSON.stringify(key)}:${canonicalize(value[key])}`
    ).join(",")}}`;
  }
  throw new TypeError(`unsupported JSON value: ${typeof value}`);
}

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function payloadHash(payload) {
  return sha256Bytes(Buffer.from(canonicalize(payload), "utf8"));
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function runMakerWithMutant(name, mutate, outputName = name) {
  const temporaryRoot = await mkdtemp(
    path.join(os.tmpdir(), "laidies-episode-manifest-review-")
  );
  try {
    const tempFixtureDir = path.join(
      temporaryRoot,
      "fixtures/release-manifest-v1.1"
    );
    await cp(fixtureDir, tempFixtureDir, { recursive: true });
    await cp(makerTestPath, path.join(temporaryRoot, "test-release-manifest-contract.mjs"));
    const record = await readJson(path.join(tempFixtureDir, name));
    mutate(record);
    record.integrity.payloadSha256 = payloadHash(record.payload);
    await writeFile(
      path.join(tempFixtureDir, outputName),
      `${JSON.stringify(record, null, 2)}\n`,
      "utf8"
    );
    return spawnSync(
      process.execPath,
      [path.join(temporaryRoot, "test-release-manifest-contract.mjs")],
      { encoding: "utf8" }
    );
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

const candidate = await readJson(candidatePath);
const schema = await readJson(schemaPath);
const makerRun = spawnSync(process.execPath, [makerTestPath], {
  encoding: "utf8"
});

assert.equal(makerRun.status, 0, makerRun.stderr);
assert.match(makerRun.stdout, /PASS valid=7 invalid=4/);
assert.equal(
  payloadHash(candidate.payload),
  candidate.integrity.payloadSha256,
  "candidate payload binding must recompute"
);

const bindingMismatches = [];
for (const entry of candidate.payload.files) {
  const bytes = await readFile(path.join(engineDir, entry.path));
  const observed = sha256Bytes(bytes);
  if (observed !== entry.sha256) {
    bindingMismatches.push({
      path: entry.path,
      declared: entry.sha256,
      observed
    });
  }
}

const firstAddition = await readJson(
  path.join(fixtureDir, "valid-first-addition.json")
);
const admission = await readJson(path.join(fixtureDir, "valid-admission.json"));
assert.equal(firstAddition.payload.rollback.candidateId, null);
assert.equal(firstAddition.payload.rollback.chickFlicksAdmissionId, null);
assert.ok(!Object.hasOwn(firstAddition.payload, "enginePublicProof"));
assert.ok(!Object.hasOwn(admission.payload, "publicProof"));

// The detached digest currently authenticates only payload. Changing the
// envelope's semantic type/version does not change the declared digest.
const relabelled = structuredClone(firstAddition);
relabelled.recordType = "engine-public-proof-receipt";
relabelled.schemaVersion = "9.9.9";
assert.equal(
  payloadHash(relabelled.payload),
  firstAddition.integrity.payloadSha256,
  "payload-only hash should reproduce the unbound envelope-metadata defect"
);

// JSON Schema describes nullable fields independently and has no explicit
// no-prior/restore-prior discriminator or all-or-none branch.
const rollbackPair = schema.$defs.rollbackPair;
assert.ok(!Object.hasOwn(rollbackPair.properties, "state"));
assert.ok(!Object.hasOwn(rollbackPair, "oneOf"));
assert.ok(!Object.hasOwn(rollbackPair, "allOf"));

// The maker test only checks that a previous Engine proof hash exists. A
// candidate hash is therefore accepted as a previous "receipt".
const badEngineChain = await runMakerWithMutant(
  "valid-engine-proof-verified.json",
  (record) => {
    record.payload.receiptId = "engine-proof-cross-type-extra";
    record.payload.observedAt = "2026-07-26T15:30:00Z";
    record.payload.previousReceiptPayloadSha256 =
      firstAddition.integrity.payloadSha256;
  },
  "valid-engine-proof-cross-type-extra.json"
);
assert.equal(
  badEngineChain.status,
  0,
  "review precondition changed: maker now rejects cross-type Engine chain"
);

// The maker test does not validate either previous/superseding CF receipt
// link. A candidate hash is accepted as the previous CF proof.
const badCfChain = await runMakerWithMutant(
  "valid-cf-proof.json",
  (record) => {
    record.payload.previousReceiptPayloadSha256 =
      firstAddition.integrity.payloadSha256;
  }
);
assert.equal(
  badCfChain.status,
  0,
  "review precondition changed: maker now rejects cross-type CF chain"
);

const fixtureNames = candidate.payload.files.map((entry) => entry.path);
assert.ok(
  !fixtureNames.some((entry) => /cf-proof-failed|cf-proof-revoked/.test(entry)),
  "review precondition changed: CF transition fixture now exists"
);

const inventedTarget = await runMakerWithMutant(
  "valid-hold-no-restore.json",
  (record) => {
    record.payload.target.candidatePayloadSha256 = "9".repeat(64);
  },
  "valid-hold-invented-target-extra.json"
);
assert.notEqual(
  inventedTarget.status,
  0,
  "availability control must reject an invented target"
);
const holdNoRestore = await readJson(
  path.join(fixtureDir, "valid-hold-no-restore.json")
);
assert.equal(holdNoRestore.payload.safePublicState, "held");
assert.equal(holdNoRestore.payload.scope.editorialPackage, true);
assert.equal(holdNoRestore.payload.restore.candidateId, null);
assert.equal(holdNoRestore.payload.restore.chickFlicksAdmissionId, null);

console.log("PLATFORM EPISODE RELEASE REVIEW REJECT");
console.log(
  `candidate_binding=${bindingMismatches.length ? "FAIL_STALE" : "PASS"}`
);
for (const mismatch of bindingMismatches) {
  console.log(
    `binding_mismatch=${mismatch.path} declared=${mismatch.declared} observed=${mismatch.observed}`
  );
}
console.log("detached_payload_non_circularity=PASS_NARROW");
console.log("immutable_candidate_and_admission=PASS");
console.log("envelope_metadata_hash_binding=FAIL");
console.log("explicit_no_prior_rollback_schema=FAIL");
console.log("half_null_rollback_fixture_rejection=PASS");
console.log("invented_hold_target_rejection=PASS");
console.log("hold_no_restore_contract_fixture=PASS_NARROW");
console.log("engine_receipt_chain_type_subject_binding=FAIL");
console.log("chick_flicks_receipt_chain_type_subject_binding=FAIL");
console.log("chick_flicks_append_only_transition_fixture=FAIL");
