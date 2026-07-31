import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  deriveVersionKey,
  payloadSha256,
  sha256,
  sharedHeaderRequests
} from "../release-binding/asset-cache-binding-v1.mjs";

function exactKeys(object, keys, label) {
  assert(object && typeof object === "object" && !Array.isArray(object), `${label} must be an object`);
  assert.deepEqual(Object.keys(object).sort(), [...keys].sort(), `${label} has missing or unknown fields`);
}

function resolvePath(root, relativePath) {
  assert.equal(path.isAbsolute(relativePath), false, `${relativePath} must be repository-relative`);
  const base = path.resolve(root);
  const resolved = path.resolve(base, relativePath);
  assert(resolved.startsWith(`${base}${path.sep}`), `${relativePath} escapes repository`);
  return resolved;
}

function fileBytes(root, relativePath) {
  return fs.readFileSync(resolvePath(root, relativePath));
}

function verifyFile(root, record, label) {
  exactKeys(record, ["path", "sha256"], label);
  const bytes = fileBytes(root, record.path);
  assert.equal(sha256(bytes), record.sha256, `${label} checksum mismatch`);
  return bytes;
}

export function validateRouteRequests(payload, texts, mode) {
  assert(["integrated", "rollback"].includes(mode), `unknown request mode: ${mode}`);
  for (const route of payload.routes) {
    const observed = sharedHeaderRequests(texts[route.role]);
    const expected = route.consumesSharedHeader
      ? [mode === "integrated" ? payload.version.requestPath : payload.rollback.requestPath]
      : [];
    assert.deepEqual(observed, expected, `${route.role} ${mode} request mismatch`);
  }
  return {
    mode,
    routes: payload.routes.length,
    consumers: payload.routes.filter((route) => route.consumesSharedHeader).length
  };
}

export function validateRouteIntegration(receipt, options = {}) {
  const root = options.root || process.cwd();
  exactKeys(receipt, ["schemaVersion", "receiptId", "status", "payload", "seal"], "receipt");
  assert.equal(receipt.schemaVersion, 1, "unsupported schemaVersion");
  assert.equal(receipt.receiptId, "SVGH-320-2026-07-26-v1-ROUTE-INTEGRATION-v1", "receiptId mismatch");
  assert.equal(receipt.status, "BUILT_LOCALLY_PENDING_OWNER_REACCEPTANCE", "status ceiling mismatch");
  exactKeys(receipt.seal, ["algorithm", "canonicalization", "payloadSha256"], "seal");
  assert.equal(receipt.seal.algorithm, "SHA-256");
  assert.equal(receipt.seal.canonicalization, "sorted-json-v1");
  assert.equal(payloadSha256(receipt.payload), receipt.seal.payloadSha256, "detached payload seal mismatch");

  const payload = receipt.payload;
  exactKeys(payload, [
    "candidateId",
    "acceptedSource",
    "priorBinding",
    "version",
    "routes",
    "rollback",
    "authority",
    "acceptance"
  ], "payload");
  const sourceBytes = verifyFile(root, {
    path: payload.acceptedSource.path,
    sha256: payload.acceptedSource.sha256
  }, "acceptedSource");
  assert.equal(sourceBytes.length, payload.acceptedSource.bytes, "source byte length mismatch");
  verifyFile(root, payload.priorBinding, "priorBinding");

  exactKeys(payload.version, ["versionKey", "requestPath", "sourceSha256"], "version");
  assert.equal(
    payload.version.versionKey,
    deriveVersionKey(payload.candidateId, payload.acceptedSource.sha256),
    "versionKey is not source-derived"
  );
  assert.equal(
    payload.version.requestPath,
    `/content/site/sv-global-header.js?v=${payload.version.versionKey}`,
    "version requestPath mismatch"
  );
  assert.equal(payload.version.sourceSha256, payload.acceptedSource.sha256, "version/source hash mismatch");

  assert(Array.isArray(payload.routes), "routes must be an array");
  assert.deepEqual(payload.routes.map((route) => route.role).sort(), ["homepage", "startHere", "visitorsCentre"], "route roles mismatch");
  const texts = {};
  for (const route of payload.routes) {
    exactKeys(route, [
      "role",
      "path",
      "priorSha256",
      "integratedSha256",
      "consumesSharedHeader",
      "priorRequestPath"
    ], `route ${route.role}`);
    const bytes = fileBytes(root, route.path);
    assert.equal(sha256(bytes), route.integratedSha256, `${route.role} integrated checksum mismatch`);
    texts[route.role] = bytes.toString("utf8");
    if (route.consumesSharedHeader) {
      assert.equal(typeof route.priorRequestPath, "string", `${route.role} prior request missing`);
      const occurrences = texts[route.role].split(payload.version.requestPath).length - 1;
      assert.equal(occurrences, 1, `${route.role} must contain one integrated request`);
      const inverse = texts[route.role].replace(payload.version.requestPath, route.priorRequestPath);
      assert.equal(sha256(Buffer.from(inverse)), route.priorSha256, `${route.role} inverse rollback does not recover accepted bytes`);
    } else {
      assert.equal(route.priorRequestPath, null, `${route.role} non-consumer prior request must be null`);
      assert.equal(route.integratedSha256, route.priorSha256, `${route.role} non-consumer bytes changed`);
    }
  }
  const integrated = validateRouteRequests(payload, texts, "integrated");

  exactKeys(payload.rollback, ["requestPath", "operation", "atomicity", "verification"], "rollback");
  assert.equal(payload.rollback.requestPath, payload.routes.find((route) => route.role === "homepage").priorRequestPath, "rollback requestPath mismatch");
  assert.equal(payload.rollback.operation, "replace integrated requestPath with priorRequestPath on every consuming route", "rollback operation mismatch");
  assert.equal(payload.rollback.atomicity, "ONE_CURATED_ARTIFACT", "rollback must be atomic");
  assert.equal(payload.rollback.verification, "inverse bytes equal prior accepted route hashes", "rollback verification mismatch");
  const rollbackTexts = { ...texts };
  for (const route of payload.routes) {
    if (!route.consumesSharedHeader) continue;
    rollbackTexts[route.role] = rollbackTexts[route.role].replace(payload.version.requestPath, route.priorRequestPath);
  }
  const rollback = validateRouteRequests(payload, rollbackTexts, "rollback");

  exactKeys(payload.authority, ["deploy", "publicCacheMutation", "providerSettings", "visitorContainmentRemoval", "unrelatedRouteChanges"], "authority");
  assert.deepEqual(payload.authority, {
    deploy: false,
    publicCacheMutation: false,
    providerSettings: false,
    visitorContainmentRemoval: false,
    unrelatedRouteChanges: false
  }, "route integration escalates authority");
  exactKeys(payload.acceptance, ["maker", "townEntry", "visitorsCentre", "nativeSafariVoiceOverTrueZoom", "publicOriginAndCache"], "acceptance");
  assert.equal(payload.acceptance.maker, "PASS");
  assert.equal(payload.acceptance.townEntry, "PENDING");
  assert.equal(payload.acceptance.visitorsCentre, "PENDING");
  assert.equal(payload.acceptance.nativeSafariVoiceOverTrueZoom, "PENDING");
  assert.equal(payload.acceptance.publicOriginAndCache, "NOT_PERFORMED");

  const visitor = texts.visitorsCentre;
  assert.match(visitor, /@media \(max-width: 340px\)[\s\S]*?\.svgh-nav \{ gap: 4px !important; \}/, "Visitor containment was removed or changed");

  return {
    status: "PASS",
    receiptId: receipt.receiptId,
    payloadSha256: receipt.seal.payloadSha256,
    versionKey: payload.version.versionKey,
    integrated,
    rollback,
    ownerAcceptance: "PENDING",
    mutation: false
  };
}

