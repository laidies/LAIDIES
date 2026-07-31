import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const engine = resolve(here, "../episode-experience");
const candidatePath = join(engine, "release-manifest-schema-candidate-v2-2026-07-26.json");
const makerPath = join(engine, "test-release-manifest-contract-v2.mjs");
const schemaPath = join(engine, "schema/episode-release-envelope-v2.0.0.schema.json");
const validDir = join(engine, "fixtures/release-manifest-v2/valid");
const historiesDir = join(engine, "fixtures/release-manifest-v2");
const temporary = await mkdtemp(join(tmpdir(), "cf-v2-independent-"));

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) =>
    `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
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

function reseal(record) {
  record.integrity.bodySha256 = shaValue(record.body);
  return record;
}

async function schemaAccepts(record, name) {
  const path = join(temporary, `${name}.json`);
  await writeFile(path, `${JSON.stringify(record, null, 2)}\n`);
  const result = spawnSync(
    "npx",
    ["--yes", "ajv-cli@5.0.0", "validate", "--spec=draft2020", "--strict=false",
      "--all-errors", "-s", schemaPath, "-d", path],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0, `${name} unexpectedly failed schema:\n${result.stdout}${result.stderr}`);
}

try {
  const candidateBytes = await readFile(candidatePath);
  const candidate = JSON.parse(candidateBytes);
  assert.equal(
    shaBytes(candidateBytes),
    "b1813da7654277b8fa3dd8e8106c10ec63d16f45fdd0485af81d6744a5470fad"
  );
  assert.equal(candidate.payload.candidateId, "EPX-CF13-SCHEMA-2026-07-26-v2");
  assert.equal(
    shaValue(candidate.payload),
    "f62c3cf67363096ea161ad91dd529eb4087e86c46ef19573843552941cbae5f1"
  );
  assert.equal(candidate.integrity.payloadSha256, shaValue(candidate.payload));
  assert.equal(candidate.payload.files.length, 40);
  assert.equal(new Set(candidate.payload.files.map(({ path }) => path)).size, 40);
  for (const entry of candidate.payload.files) {
    assert.equal(shaBytes(await readFile(join(engine, entry.path))), entry.sha256, entry.path);
  }

  const makerSource = await readFile(makerPath, "utf8");
  const start = makerSource.indexOf("class ContractError");
  const end = makerSource.indexOf("const expectedCodes");
  assert.ok(start >= 0 && end > start, "maker semantic validator could not be isolated");
  const context = { createHash, result: null };
  vm.createContext(context);
  vm.runInContext(
    `${makerSource.slice(start, end)}\nresult = { validateSemantics, shaValue };`,
    context
  );
  const { validateSemantics } = context.result;

  const validRecords = [];
  for (const name of (await readdir(validDir)).filter((name) => name.endsWith(".json")).sort()) {
    validRecords.push(await json(join(validDir, name)));
  }
  const records = new Map(validRecords.map((record) => [record.integrity.bodySha256, record]));
  const histories = new Map([
    ["history-empty.json", await json(join(historiesDir, "history-empty.json"))],
    ["history-with-prior.json", await json(join(historiesDir, "history-with-prior.json"))]
  ]);
  const admission = await json(join(validDir, "admission-v1.json"));
  const engineProof = await json(join(validDir, "engine-proof-failed.json"));
  const cfProof = await json(join(validDir, "cf-proof-failed.json"));
  const hold = await json(join(validDir, "hold-no-prior.json"));

  const cases = [
    {
      name: "admission-accepts-absent-motion",
      record: reseal(structuredClone(admission)),
      mutate(record) {
        record.body.payload.formats.motionFilm = "accepted";
      }
    },
    {
      name: "admission-transaction-id-not-candidate-bound",
      record: reseal(structuredClone(admission)),
      mutate(record) {
        record.body.payload.transactionId = "unrelated-transaction";
      }
    },
    {
      name: "engine-proof-candidate-id-not-hash-bound",
      record: reseal(structuredClone(engineProof)),
      mutate(record) {
        record.body.payload.candidateId = "invented-candidate";
      }
    },
    {
      name: "cf-proof-admission-id-not-hash-bound",
      record: reseal(structuredClone(cfProof)),
      mutate(record) {
        record.body.payload.admissionId = "invented-admission";
      }
    },
    {
      name: "control-episode-id-not-candidate-bound",
      record: reseal(structuredClone(hold)),
      mutate(record) {
        record.body.payload.episodeId = "episode-99";
      }
    }
  ];

  const falseAccepted = [];
  for (const item of cases) {
    item.mutate(item.record);
    reseal(item.record);
    await schemaAccepts(item.record, item.name);
    validateSemantics(item.record, records, histories, validRecords);
    falseAccepted.push({
      name: item.name,
      bodySha256: item.record.integrity.bodySha256
    });
  }

  assert.equal(falseAccepted.length, cases.length);
  console.log(JSON.stringify({
    verdict: "HOLD",
    candidateId: candidate.payload.candidateId,
    candidateFileSha256: shaBytes(candidateBytes),
    candidatePayloadSha256: shaValue(candidate.payload),
    boundFilesVerified: candidate.payload.files.length,
    schemaValidSemanticFalseAccepts: falseAccepted
  }, null, 2));
} finally {
  await rm(temporary, { recursive: true, force: true });
}
