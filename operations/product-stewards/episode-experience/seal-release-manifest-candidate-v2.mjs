import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, "fixtures", "release-manifest-v2");

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
}

function sha(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function walk(root) {
  const output = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) output.push(...await walk(path));
    else if (entry.isFile()) output.push(path);
  }
  return output;
}

const paths = [
  join(here, "EPISODE-RELEASE-MANIFEST-SPEC.md"),
  join(here, "schema", "episode-release-envelope-v2.0.0.schema.json"),
  join(here, "build-release-manifest-fixtures-v2.mjs"),
  join(here, "test-release-manifest-contract-v2.mjs"),
  join(here, "seal-release-manifest-candidate-v2.mjs"),
  ...await walk(fixtures)
].sort();

const files = [];
for (const path of paths) {
  files.push({
    path: relative(here, path),
    sha256: sha(await readFile(path))
  });
}

const payload = {
  candidateId: "EPX-CF13-SCHEMA-2026-07-26-v2",
  contractSchemaVersion: "2.0.0",
  status: "BUILT_LOCALLY_PLATFORM_REVIEW_PENDING",
  sharedLiveIntegration: "BLOCKED_JOINT_CONTROL_ROOM_LOCK_HELD",
  supersedesRejectedCandidateId: "EPX-CF13-SCHEMA-2026-07-26-v1",
  acceptanceOrder: ["functionality-platform", "chick-flicks"],
  files,
  test: {
    command: "node operations/product-stewards/episode-experience/test-release-manifest-contract-v2.mjs",
    expected: "RELEASE MANIFEST V2 CONTRACT PASS valid=11 invalid=22 schema=draft2020 mutation_controls=5"
  }
};

const record = {
  schemaVersion: "1.0.0",
  recordType: "release-manifest-schema-candidate",
  payload,
  integrity: {
    algorithm: "sha-256",
    canonicalization: "RFC8785-JCS",
    payloadSha256: sha(Buffer.from(canonicalize(payload), "utf8"))
  }
};

const target = join(here, "release-manifest-schema-candidate-v2-2026-07-26.json");
await writeFile(target, `${JSON.stringify(record, null, 2)}\n`);
console.log(`${record.payload.candidateId} ${record.integrity.payloadSha256} files=${files.length}`);
