import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const platformDir = dirname(fileURLToPath(import.meta.url));
const episodeDir = resolve(platformDir, "../episode-experience");
const candidatePath = join(
  episodeDir,
  "release-manifest-schema-candidate-v2-2026-07-26.json"
);
const schemaRelative = "schema/episode-release-envelope-v2.0.0.schema.json";
const schemaPath = join(episodeDir, schemaRelative);
const fixtureDir = join(episodeDir, "fixtures/release-manifest-v2");
const temporary = await mkdtemp(join(tmpdir(), "laidies-platform-v2-review-"));

const EXPECTED = Object.freeze({
  candidateId: "EPX-CF13-SCHEMA-2026-07-26-v2",
  candidateFileSha256:
    "b1813da7654277b8fa3dd8e8106c10ec63d16f45fdd0485af81d6744a5470fad",
  payloadSha256:
    "f62c3cf67363096ea161ad91dd529eb4087e86c46ef19573843552941cbae5f1",
  boundFiles: 40
});

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalize(value[key])}`
  ).join(",")}}`;
}

function shaBytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function shaValue(value) {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex");
}

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function validates(schema, record) {
  const recordPath = join(temporary, `record-${randomUUID()}.json`);
  await writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "ajv-cli@5.0.0",
      "validate",
      "--spec=draft2020",
      "--strict=false",
      "--all-errors",
      "-s",
      schema,
      "-d",
      recordPath
    ],
    { encoding: "utf8" }
  );
  return result.status === 0;
}

async function mutatedSchema(name, mutate) {
  const schema = await json(schemaPath);
  mutate(schema);
  const path = join(temporary, `${name}.schema.json`);
  await writeFile(path, `${JSON.stringify(schema, null, 2)}\n`);
  return path;
}

try {
  const candidateBytes = await readFile(candidatePath);
  const candidate = JSON.parse(candidateBytes);
  assert.equal(shaBytes(candidateBytes), EXPECTED.candidateFileSha256);
  assert.equal(candidate.payload.candidateId, EXPECTED.candidateId);
  assert.equal(candidate.integrity.payloadSha256, EXPECTED.payloadSha256);
  assert.equal(shaValue(candidate.payload), EXPECTED.payloadSha256);
  assert.equal(candidate.payload.files.length, EXPECTED.boundFiles);
  assert.equal(new Set(candidate.payload.files.map((file) => file.path)).size,
    EXPECTED.boundFiles, "bound paths must be unique");

  for (const file of candidate.payload.files) {
    assert.equal(
      shaBytes(await readFile(join(episodeDir, file.path))),
      file.sha256,
      `bound checksum mismatch: ${file.path}`
    );
  }
  assert.ok(candidate.payload.files.some((file) => file.path === schemaRelative));

  const firstAddition = await json(join(fixtureDir, "valid/first-addition.json"));
  const halfRollback = await json(join(fixtureDir, "invalid/half-null-rollback.json"));
  const halfAdmission = await json(
    join(fixtureDir, "invalid/control-half-admission-target.json")
  );
  const duplicateFiles = await json(
    join(fixtureDir, "invalid/duplicate-required-files.json")
  );

  assert.equal(await validates(schemaPath, firstAddition), true);
  assert.equal(await validates(schemaPath, halfRollback), false);
  assert.equal(await validates(schemaPath, halfAdmission), false);
  assert.equal(await validates(schemaPath, duplicateFiles), false);

  const weakRollback = await mutatedSchema("weak-rollback", (schema) => {
    schema.$defs.rollback = { type: "object" };
  });
  assert.equal(await validates(weakRollback, halfRollback), true);

  const weakAdmissionTuple = await mutatedSchema("weak-admission-tuple", (schema) => {
    delete schema.$defs.control.properties.target.oneOf;
  });
  assert.equal(await validates(weakAdmissionTuple, halfAdmission), true);

  const weakUnique = await mutatedSchema("weak-unique", (schema) => {
    delete schema.$defs.candidate.properties.dependencies
      .properties.requiredTransactionFiles.uniqueItems;
  });
  assert.equal(await validates(weakUnique, duplicateFiles), true);

  const unexpectedField = structuredClone(firstAddition);
  unexpectedField.body.payload.unexpectedPlatformField = true;
  assert.equal(await validates(schemaPath, unexpectedField), false);
  const weakClosedBody = await mutatedSchema("weak-closed-body", (schema) => {
    schema.$defs.candidate.additionalProperties = true;
  });
  assert.equal(await validates(weakClosedBody, unexpectedField), true);

  const relabelledBody = structuredClone(firstAddition);
  relabelledBody.body.recordType = "episode-availability-control";
  assert.equal(await validates(schemaPath, relabelledBody), false);
  const weakTypedBody = await mutatedSchema("weak-typed-body", (schema) => {
    delete schema.allOf;
  });
  assert.equal(await validates(weakTypedBody, relabelledBody), true);

  console.log(
    "PLATFORM EPISODE RELEASE V2 PASS " +
    "checksum_bound=40 schema_negative=3 mutation_controls=5"
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
