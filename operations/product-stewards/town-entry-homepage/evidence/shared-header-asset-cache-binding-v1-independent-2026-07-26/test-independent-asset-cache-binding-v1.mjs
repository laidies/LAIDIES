#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import {
  canonicalize,
  deriveVersionKey,
  payloadSha256,
  validateBinding,
  validateConsumerReferences
} from "../../../platform-reliability/shared-header/v1/release-binding/asset-cache-binding-v1.mjs";

const root = process.cwd();
const bindingPath =
  "operations/product-stewards/platform-reliability/shared-header/v1/release-binding/svgh-320-asset-cache-binding-v1.json";
const binding = JSON.parse(fs.readFileSync(bindingPath, "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const reseal = (candidate) => {
  candidate.seal.payloadSha256 = payloadSha256(candidate.payload);
  return candidate;
};
const reject = (label, mutate, pattern, shouldReseal = true) => {
  const candidate = clone(binding);
  mutate(candidate);
  if (shouldReseal) reseal(candidate);
  assert.throws(() => validateBinding(candidate, { root }), pattern, label);
};

const first = validateBinding(binding, { root });
const second = validateBinding(clone(binding), { root });
assert.deepEqual(second, first, "validation is idempotent");

assert.equal(
  binding.seal.payloadSha256,
  sha256(Buffer.from(canonicalize(binding.payload))),
  "detached seal must cover payload only"
);
assert.notEqual(
  binding.seal.payloadSha256,
  sha256(Buffer.from(canonicalize(binding))),
  "seal must not be circular"
);

const changedSourceHash = `f${binding.payload.acceptedSource.sha256.slice(1)}`;
assert.notEqual(
  deriveVersionKey(binding.payload.candidateId, changedSourceHash),
  binding.payload.release.versionKey,
  "changed accepted bytes must derive a different version key"
);

assert.deepEqual(
  binding.payload.consumers.map(({ role, sha256: checksum, consumesSharedHeader }) => ({
    role, checksum, consumesSharedHeader
  })),
  [
    {
      role: "homepage",
      checksum: "c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772",
      consumesSharedHeader: true
    },
    {
      role: "startHere",
      checksum: "a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0",
      consumesSharedHeader: false
    },
    {
      role: "visitorsCentre",
      checksum: "de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743",
      consumesSharedHeader: true
    }
  ],
  "accepted consumer set/hash/consumption must be exact"
);

const rollbackBytes = execFileSync(
  "git",
  ["show", `${binding.payload.rollback.gitCommit}:${binding.payload.rollback.source}`],
  { cwd: root }
);
assert.equal(sha256(rollbackBytes), binding.payload.rollback.sourceSha256);
assert.equal(rollbackBytes.length, binding.payload.rollback.bytes);
assert.equal(
  execFileSync(
    "git",
    ["rev-parse", `${binding.payload.rollback.gitCommit}:${binding.payload.rollback.source}`],
    { cwd: root, encoding: "utf8" }
  ).trim(),
  binding.payload.rollback.gitObject
);

reject(
  "unsealed tamper fails",
  (candidate) => { candidate.payload.release.cachePolicy = "PURGE_FIRST"; },
  /seal mismatch/,
  false
);
reject(
  "resealed stale current route hash fails",
  (candidate) => { candidate.payload.consumers[0].sha256 = "0".repeat(64); },
  /homepage bytes do not match/
);
reject(
  "resealed invented Start Here consumption fails",
  (candidate) => {
    candidate.payload.consumers[1].consumesSharedHeader = true;
    candidate.payload.consumers[1].currentRequestPath =
      candidate.payload.consumers[0].currentRequestPath;
  },
  /startHere current shared-header request mismatch/
);
reject(
  "resealed authority escalation fails",
  (candidate) => { candidate.payload.authority.publicCacheMutation = true; },
  /must not claim external authority/
);
reject(
  "resealed premature release status fails",
  (candidate) => { candidate.status = "RELEASED"; },
  /release ceiling/
);

const currentTexts = Object.fromEntries(
  binding.payload.consumers.map((consumer) => [
    consumer.role,
    fs.readFileSync(consumer.path, "utf8")
  ])
);
const mixedReleaseTexts = {
  ...currentTexts,
  homepage: currentTexts.homepage.replace(
    binding.payload.consumers[0].currentRequestPath,
    binding.payload.release.requestPath
  )
};
assert.throws(
  () => validateConsumerReferences(binding.payload, mixedReleaseTexts, "release"),
  /visitorsCentre release shared-header request mismatch/,
  "mixed route references fail closed"
);

assert.equal(first.releaseIntegration, "PENDING_ROUTE_VERSION_UPDATE_AND_REACCEPTANCE");
assert.equal(first.mutation, false);
console.log(
  `INDEPENDENT ASSET CACHE BINDING PASS binding=${first.bindingId} ` +
  `payload=${first.payloadSha256} valid=2 adversarial=6 ` +
  `rollbackGitBytes=PASS idempotent=PASS mutation=false`
);
