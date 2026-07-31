#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  canonicalize,
  deriveVersionKey,
  loadAndValidateBinding,
  payloadSha256,
  rewriteConsumerTexts,
  validateBinding,
  validateConsumerReferences
} from "./asset-cache-binding-v1.mjs";

const root = process.cwd();
const bindingPath = "operations/product-stewards/platform-reliability/shared-header/v1/release-binding/svgh-320-asset-cache-binding-v1.json";
const binding = JSON.parse(fs.readFileSync(bindingPath, "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
const reseal = (value) => {
  value.seal.payloadSha256 = payloadSha256(value.payload);
  return value;
};
const mustReject = (label, mutate, options = {}) => {
  const candidate = clone(binding);
  mutate(candidate);
  if (options.reseal !== false) reseal(candidate);
  assert.throws(
    () => validateBinding(candidate, { root }),
    options.pattern || /./,
    `${label} must fail closed`
  );
};

const first = loadAndValidateBinding(bindingPath, { root });
const second = loadAndValidateBinding(bindingPath, { root });
assert.deepEqual(second, first, "validation must be idempotent");
assert.equal(
  deriveVersionKey(binding.payload.candidateId, binding.payload.acceptedSource.sha256),
  binding.payload.release.versionKey
);
assert.equal(canonicalize(binding.payload), canonicalize(JSON.parse(JSON.stringify(binding.payload))));

const currentTexts = Object.fromEntries(binding.payload.consumers.map((consumer) => [
  consumer.role,
  fs.readFileSync(consumer.path, "utf8")
]));
const releaseTexts = rewriteConsumerTexts(binding.payload, currentTexts, "current", "release");
validateConsumerReferences(binding.payload, releaseTexts, "release");
const rollbackTexts = rewriteConsumerTexts(binding.payload, releaseTexts, "release", "rollback");
validateConsumerReferences(binding.payload, rollbackTexts, "rollback");
assert.deepEqual(
  rewriteConsumerTexts(binding.payload, currentTexts, "current", "release"),
  releaseTexts,
  "release rewrite must be deterministic"
);

mustReject("detached seal corruption", (candidate) => {
  candidate.seal.payloadSha256 = "0".repeat(64);
}, { reseal: false, pattern: /seal mismatch/ });
mustReject("source checksum corruption", (candidate) => {
  candidate.payload.acceptedSource.sha256 = "0".repeat(64);
}, { pattern: /acceptedSource bytes do not match checksum/ });
mustReject("stale source-derived version", (candidate) => {
  candidate.payload.release.versionKey = "stale";
}, { pattern: /versionKey/ });
mustReject("consumer checksum corruption", (candidate) => {
  candidate.payload.consumers[0].sha256 = "0".repeat(64);
}, { pattern: /consumer homepage bytes do not match checksum/ });
mustReject("invented Start Here consumption", (candidate) => {
  candidate.payload.consumers[1].consumesSharedHeader = true;
  candidate.payload.consumers[1].currentRequestPath = candidate.payload.consumers[0].currentRequestPath;
}, { pattern: /startHere current shared-header request mismatch/ });
mustReject("rollback object corruption", (candidate) => {
  candidate.payload.rollback.gitObject = "0".repeat(40);
}, { pattern: /rollback git object mismatch/ });
mustReject("half rollback record", (candidate) => {
  delete candidate.payload.rollback.sourceSha256;
}, { pattern: /rollback has missing or unknown fields/ });
mustReject("release request mismatch", (candidate) => {
  candidate.payload.release.requestPath = "/content/site/sv-global-header.js?v=wrong";
}, { pattern: /release requestPath mismatch/ });
mustReject("duplicate consumer role", (candidate) => {
  candidate.payload.consumers[2].role = "homepage";
}, { pattern: /consumer roles must be exact/ });
mustReject("authority escalation", (candidate) => {
  candidate.payload.authority.deploy = true;
}, { pattern: /must not claim external authority/ });

const mixedTexts = { ...releaseTexts, visitorsCentre: currentTexts.visitorsCentre };
assert.throws(
  () => validateConsumerReferences(binding.payload, mixedTexts, "release"),
  /visitorsCentre release shared-header request mismatch/,
  "mixed old/new route references must fail closed"
);
const inventedStartHere = {
  ...releaseTexts,
  startHere: `${releaseTexts.startHere}\n<script src="${binding.payload.release.requestPath}"></script>`
};
assert.throws(
  () => validateConsumerReferences(binding.payload, inventedStartHere, "release"),
  /startHere release shared-header request mismatch/,
  "non-consuming route must remain non-consuming"
);

console.log(
  `ASSET CACHE BINDING V1 PASS binding=${first.bindingId} ` +
  `version=${first.versionKey} rollback=${first.rollbackVersionKey} ` +
  "valid=2 invalid=12 current=3 release=3 rollback=3 mutation=false"
);

