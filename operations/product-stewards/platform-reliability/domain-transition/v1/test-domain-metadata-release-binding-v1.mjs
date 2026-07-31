#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";
import { metadataTags } from "./domain-metadata-v1.mjs";

const root = process.cwd();
const binding = JSON.parse(fs.readFileSync(path.join(
  root,
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-release-binding-v1.json"
), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relative) => fs.readFileSync(path.join(root, relative));

assert.equal(binding.schemaVersion, 1);
assert.equal(binding.status, "CHECKSUM_BOUND_LOCAL_RELEASE_CANDIDATE_NOT_DEPLOYED");
assert.equal(shaValue(binding.payload), binding.seal.payloadSha256);

for (const record of [
  binding.payload.acceptedCandidate,
  binding.payload.acceptanceClosure,
  binding.payload.artifact,
  {
    path: binding.payload.artifact.builderPath,
    sha256: binding.payload.artifact.builderSha256,
  },
  {
    path: binding.payload.rollback.predecessorManifestPath,
    sha256: binding.payload.rollback.predecessorManifestSha256,
  }
]) {
  assert.equal(sha(read(record.path)), record.sha256, `binding drift: ${record.path}`);
}
assert.equal(
  JSON.parse(read(binding.payload.acceptedCandidate.path)).seal.payloadSha256,
  binding.payload.acceptedCandidate.payloadSha256
);
assert.equal(
  JSON.parse(read(binding.payload.acceptanceClosure.path)).seal.payloadSha256,
  binding.payload.acceptanceClosure.payloadSha256
);

const artifact = JSON.parse(read(binding.payload.artifact.path));
assert.equal(artifact.routes.length, 28);
assert.equal(artifact.seal.artifactCorpusSha256, binding.payload.artifact.artifactCorpusSha256);
assert.equal(artifact.authorityCeiling.deploy, false);

const buildOutput = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-domain-release-test-"));
try {
  const build = spawnSync(
    process.execPath,
    ["scripts/build-public-site.mjs", buildOutput],
    { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  assert.equal(build.status, 0, `curated build failed\n${build.stdout}\n${build.stderr}`);
  for (const row of artifact.routes) {
    const bytes = fs.readFileSync(path.join(buildOutput, row.artifactPath));
    assert.equal(sha(bytes), row.artifactSha256, `artifact drift: ${row.artifactPath}`);
    const tags = metadataTags(bytes.toString("utf8"));
    assert.equal(tags.canonical.length, 1);
    assert.equal(tags.ogUrl.length, 1);
  }
} finally {
  fs.rmSync(buildOutput, { recursive: true });
}

assert.equal(binding.payload.rollback.exactSourcePredecessors, 28);
assert.equal(binding.payload.rollback.inverseVerified, 28);
assert.equal(binding.payload.authorityCeiling.deploy, false);
assert.equal(binding.payload.authorityCeiling.publicMutation, false);
assert.equal(binding.payload.remainingGates.privacySafeAttribution, "UNKNOWN");

console.log(
  `DOMAIN METADATA RELEASE BINDING PASS routes=28` +
  ` version=${binding.payload.releaseVersionKey} rollback=28 public_release=false`
);
