import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const REQUIRED_ROLES = ["homepage", "startHere", "visitorsCentre"];
const CACHE_RULES = [
  "versionKey changes whenever accepted source bytes change",
  "one versionKey maps to exactly one source hash",
  "release switches every consuming route to one requestPath in one artifact",
  "rollback switches every consuming route to one rollbackRequestPath in one artifact",
  "non-consuming accepted routes remain non-consuming",
  "missing stale mixed or tampered bindings fail closed"
];

export function sha256(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

export function canonicalize(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    assert(Number.isFinite(value), "canonical JSON rejects non-finite numbers");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(",")}]`;
  }
  assert(value && typeof value === "object", "canonical JSON supports JSON values only");
  return `{${Object.keys(value).sort().map((key) => (
    `${JSON.stringify(key)}:${canonicalize(value[key])}`
  )).join(",")}}`;
}

export function payloadSha256(payload) {
  return sha256(Buffer.from(canonicalize(payload)));
}

export function deriveVersionKey(candidateId, sourceSha256) {
  const slug = candidateId.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug}-${sourceSha256.slice(0, 12)}`;
}

export function deriveRollbackVersionKey(commit, sourceSha256) {
  return `rollback-${commit.slice(0, 8)}-${sourceSha256.slice(0, 12)}`;
}

function exactKeys(object, keys, label) {
  assert(object && typeof object === "object" && !Array.isArray(object), `${label} must be an object`);
  assert.deepEqual(Object.keys(object).sort(), [...keys].sort(), `${label} has missing or unknown fields`);
}

function resolveBoundPath(root, relativePath) {
  assert.equal(path.isAbsolute(relativePath), false, "bound paths must be repository-relative");
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, relativePath);
  assert(
    resolved === resolvedRoot || resolved.startsWith(`${resolvedRoot}${path.sep}`),
    `bound path escapes repository: ${relativePath}`
  );
  return resolved;
}

function fileEvidence(root, record, label) {
  exactKeys(record, ["path", "sha256"], label);
  assert.match(record.sha256, /^[a-f0-9]{64}$/, `${label}.sha256 must be lowercase SHA-256`);
  const bytes = fs.readFileSync(resolveBoundPath(root, record.path));
  assert.equal(sha256(bytes), record.sha256, `${label} bytes do not match checksum`);
  return { path: record.path, sha256: record.sha256, bytes: bytes.length };
}

export function sharedHeaderRequests(html) {
  return [...html.matchAll(/<script\b[^>]*\bsrc=(["'])([^"']*\/content\/site\/sv-global-header\.js[^"']*)\1[^>]*>/gi)]
    .map((match) => match[2]);
}

function consumerTextsFromDisk(root, consumers) {
  return Object.fromEntries(consumers.map((consumer) => [
    consumer.role,
    fs.readFileSync(resolveBoundPath(root, consumer.path), "utf8")
  ]));
}

export function validateConsumerReferences(payload, consumerTexts, mode) {
  assert(["current", "release", "rollback"].includes(mode), `unsupported consumer mode: ${mode}`);
  for (const consumer of payload.consumers) {
    assert.equal(typeof consumerTexts[consumer.role], "string", `missing consumer text: ${consumer.role}`);
    const observed = sharedHeaderRequests(consumerTexts[consumer.role]);
    const expected = consumer.consumesSharedHeader
      ? [mode === "current"
        ? consumer.currentRequestPath
        : mode === "release"
          ? payload.release.requestPath
          : payload.rollback.requestPath]
      : [];
    assert.deepEqual(observed, expected, `${consumer.role} ${mode} shared-header request mismatch`);
  }
  return { mode, roles: payload.consumers.length, consumingRoutes: payload.consumers.filter((row) => row.consumesSharedHeader).length };
}

export function rewriteConsumerTexts(payload, consumerTexts, fromMode, toMode) {
  assert(["current", "release", "rollback"].includes(fromMode), "invalid rewrite source mode");
  assert(["release", "rollback"].includes(toMode), "invalid rewrite target mode");
  const result = { ...consumerTexts };
  for (const consumer of payload.consumers) {
    if (!consumer.consumesSharedHeader) continue;
    const from = fromMode === "current"
      ? consumer.currentRequestPath
      : fromMode === "release"
        ? payload.release.requestPath
        : payload.rollback.requestPath;
    const to = toMode === "release" ? payload.release.requestPath : payload.rollback.requestPath;
    const occurrences = result[consumer.role].split(from).length - 1;
    assert.equal(occurrences, 1, `${consumer.role} rewrite requires exactly one source request`);
    result[consumer.role] = result[consumer.role].replace(from, to);
  }
  return result;
}

export function validateBinding(binding, options = {}) {
  const root = options.root || process.cwd();
  exactKeys(binding, ["schemaVersion", "bindingId", "status", "payload", "seal"], "binding");
  assert.equal(binding.schemaVersion, 1, "unsupported schemaVersion");
  assert.equal(binding.status, "VERIFIED_LOCALLY_RELEASE_INTEGRATION_PENDING", "binding status must preserve the release ceiling");
  exactKeys(binding.seal, ["algorithm", "canonicalization", "payloadSha256"], "seal");
  assert.equal(binding.seal.algorithm, "SHA-256", "unsupported seal algorithm");
  assert.equal(binding.seal.canonicalization, "sorted-json-v1", "unsupported canonicalization");
  assert.equal(payloadSha256(binding.payload), binding.seal.payloadSha256, "detached payload seal mismatch");

  const payload = binding.payload;
  exactKeys(payload, [
    "candidateId",
    "acceptedSource",
    "candidateReceipt",
    "acceptanceEvidence",
    "consumers",
    "release",
    "rollback",
    "cacheRules",
    "authority",
    "acceptance"
  ], "payload");
  assert.equal(binding.bindingId, `${payload.candidateId}-ASSET-CACHE-v1`, "bindingId must derive from candidateId");
  assert.deepEqual(payload.cacheRules, CACHE_RULES, "cache rules differ from the closed v1 contract");

  exactKeys(payload.acceptedSource, ["path", "sha256", "bytes"], "acceptedSource");
  const sourceEvidence = fileEvidence(root, {
    path: payload.acceptedSource.path,
    sha256: payload.acceptedSource.sha256
  }, "acceptedSource");
  assert.equal(sourceEvidence.bytes, payload.acceptedSource.bytes, "accepted source byte length mismatch");
  fileEvidence(root, payload.candidateReceipt, "candidateReceipt");

  exactKeys(payload.acceptanceEvidence, ["townEntry", "visitorsCentre"], "acceptanceEvidence");
  fileEvidence(root, payload.acceptanceEvidence.townEntry, "townEntry acceptance");
  fileEvidence(root, payload.acceptanceEvidence.visitorsCentre, "Visitor acceptance");

  assert(Array.isArray(payload.consumers), "consumers must be an array");
  assert.equal(payload.consumers.length, 3, "exactly three accepted consumer inputs are required");
  assert.deepEqual(payload.consumers.map((row) => row.role).sort(), [...REQUIRED_ROLES].sort(), "consumer roles must be exact");
  for (const consumer of payload.consumers) {
    exactKeys(consumer, ["role", "path", "sha256", "consumesSharedHeader", "currentRequestPath"], `consumer ${consumer.role}`);
    fileEvidence(root, { path: consumer.path, sha256: consumer.sha256 }, `consumer ${consumer.role}`);
    assert.equal(typeof consumer.consumesSharedHeader, "boolean", `${consumer.role}.consumesSharedHeader must be boolean`);
    if (consumer.consumesSharedHeader) {
      assert.match(consumer.currentRequestPath, /^\/content\/site\/sv-global-header\.js\?v=[a-zA-Z0-9._-]+$/, `${consumer.role} current request invalid`);
    } else {
      assert.equal(consumer.currentRequestPath, null, `${consumer.role} must not invent a shared-header request`);
    }
  }

  exactKeys(payload.release, ["versionKey", "requestPath", "sourceSha256", "consumerSwitch", "cachePolicy"], "release");
  const versionKey = deriveVersionKey(payload.candidateId, payload.acceptedSource.sha256);
  assert.equal(payload.release.versionKey, versionKey, "release versionKey is not source-derived");
  assert.equal(payload.release.requestPath, `/content/site/sv-global-header.js?v=${versionKey}`, "release requestPath mismatch");
  assert.equal(payload.release.sourceSha256, payload.acceptedSource.sha256, "release source hash mismatch");
  assert.equal(payload.release.consumerSwitch, "ATOMIC_CURATED_ARTIFACT", "consumer switch must be atomic");
  assert.equal(payload.release.cachePolicy, "NEW_VERSION_KEY_BEFORE_PUBLIC_CACHE_PURGE", "cache policy mismatch");

  exactKeys(payload.rollback, ["versionKey", "requestPath", "source", "sourceSha256", "bytes", "gitCommit", "gitObject", "consumerSwitch", "triggers"], "rollback");
  assert.equal(payload.rollback.versionKey, deriveRollbackVersionKey(payload.rollback.gitCommit, payload.rollback.sourceSha256), "rollback versionKey mismatch");
  assert.equal(payload.rollback.requestPath, `/content/site/sv-global-header.js?v=${payload.rollback.versionKey}`, "rollback requestPath mismatch");
  assert.equal(payload.rollback.source, payload.acceptedSource.path, "rollback source path must match current source path");
  assert.match(payload.rollback.gitCommit, /^[a-f0-9]{40}$/, "rollback gitCommit invalid");
  assert.match(payload.rollback.gitObject, /^[a-f0-9]{40}$/, "rollback gitObject invalid");
  assert.match(payload.rollback.sourceSha256, /^[a-f0-9]{64}$/, "rollback sourceSha256 invalid");
  assert.equal(payload.rollback.consumerSwitch, "ATOMIC_CURATED_ARTIFACT", "rollback consumer switch must be atomic");
  assert.deepEqual(payload.rollback.triggers, [
    "accepted source hash mismatch",
    "mixed consumer version references",
    "native accessibility regression",
    "public origin or cache delivery mismatch"
  ], "rollback triggers differ from contract");
  if (options.verifyGitRollback !== false) {
    const object = execFileSync("git", ["rev-parse", `${payload.rollback.gitCommit}:${payload.rollback.source}`], {
      cwd: root,
      encoding: "utf8"
    }).trim();
    assert.equal(object, payload.rollback.gitObject, "rollback git object mismatch");
    const rollbackBytes = execFileSync("git", ["show", `${payload.rollback.gitCommit}:${payload.rollback.source}`], {
      cwd: root
    });
    assert.equal(sha256(rollbackBytes), payload.rollback.sourceSha256, "rollback bytes checksum mismatch");
    assert.equal(rollbackBytes.length, payload.rollback.bytes, "rollback byte length mismatch");
  }

  exactKeys(payload.authority, ["deploy", "publicCacheMutation", "providerSettings", "visitorContainmentRemoval"], "authority");
  assert.deepEqual(payload.authority, {
    deploy: false,
    publicCacheMutation: false,
    providerSettings: false,
    visitorContainmentRemoval: false
  }, "local binding must not claim external authority");
  exactKeys(payload.acceptance, ["consumerScope", "releaseIntegration", "nativeSafariVoiceOverTrueZoom", "publicOriginAndCache"], "acceptance");
  assert.equal(payload.acceptance.consumerScope, "ACCEPTED_LOCALLY", "consumer acceptance ceiling mismatch");
  assert.equal(payload.acceptance.releaseIntegration, "PENDING_ROUTE_VERSION_UPDATE_AND_REACCEPTANCE", "release integration ceiling mismatch");
  assert.equal(payload.acceptance.nativeSafariVoiceOverTrueZoom, "PENDING", "native gate must remain pending");
  assert.equal(payload.acceptance.publicOriginAndCache, "NOT_PERFORMED", "public gate must remain unperformed");

  const currentTexts = consumerTextsFromDisk(root, payload.consumers);
  const currentReferences = validateConsumerReferences(payload, currentTexts, "current");
  const releaseTexts = rewriteConsumerTexts(payload, currentTexts, "current", "release");
  const releaseReferences = validateConsumerReferences(payload, releaseTexts, "release");
  const rollbackTexts = rewriteConsumerTexts(payload, releaseTexts, "release", "rollback");
  const rollbackReferences = validateConsumerReferences(payload, rollbackTexts, "rollback");

  return {
    status: "PASS",
    bindingId: binding.bindingId,
    payloadSha256: binding.seal.payloadSha256,
    versionKey: payload.release.versionKey,
    rollbackVersionKey: payload.rollback.versionKey,
    sourceSha256: payload.acceptedSource.sha256,
    currentReferences,
    releaseReferences,
    rollbackReferences,
    releaseIntegration: payload.acceptance.releaseIntegration,
    mutation: false
  };
}

export function loadAndValidateBinding(bindingPath, options = {}) {
  const root = options.root || process.cwd();
  const binding = JSON.parse(fs.readFileSync(resolveBoundPath(root, bindingPath), "utf8"));
  return validateBinding(binding, { ...options, root });
}

