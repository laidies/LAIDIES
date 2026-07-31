#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const receiptPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-successor-v1.json";
const receipt = JSON.parse(fs.readFileSync(path.join(root, receiptPath), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relative) => fs.readFileSync(path.join(root, relative));

assert.equal(receipt.schemaVersion, 1);
assert.equal(receipt.candidateId, "LAIDIES-DOMAIN-METADATA-2026-07-26-v1");
assert.equal(shaValue(receipt.payload), receipt.seal.payloadSha256);

const bindings = [
  [receipt.payload.authority.path, receipt.payload.authority.sha256],
  [receipt.payload.sitemap.path, receipt.payload.sitemap.sha256],
  [receipt.payload.implementation.modulePath, receipt.payload.implementation.moduleSha256],
  [receipt.payload.implementation.applyPath, receipt.payload.implementation.applySha256],
  [receipt.payload.implementation.predecessorManifestPath, receipt.payload.implementation.predecessorManifestSha256],
  [receipt.payload.implementation.outputPath, receipt.payload.implementation.outputSha256],
  [receipt.payload.tests.successorPath, receipt.payload.tests.successorSha256],
  [receipt.payload.tests.localReadinessPath, receipt.payload.tests.localReadinessSha256]
];
for (const [relative, expected] of bindings) {
  assert.equal(sha(read(relative)), expected, `bound file changed: ${relative}`);
}

const output = JSON.parse(read(receipt.payload.implementation.outputPath));
assert.equal(output.routes.length, 28);
assert.equal(output.counts.changedRoutes, 28);
assert.equal(output.seal.corpusSha256, receipt.payload.implementation.corpusSha256);
for (const row of output.routes) {
  assert.equal(sha(read(row.file)), row.successorSha256, `route changed: ${row.file}`);
}
assert.equal(receipt.payload.result.metadataOnly, true);
assert.equal(receipt.payload.result.canonicalMissingAfter, 0);
assert.equal(receipt.payload.result.ogUrlMissingAfter, 0);
assert.equal(receipt.payload.authorityCeiling.deploy, false);
assert.equal(receipt.payload.authorityCeiling.publicMutation, false);

console.log("DOMAIN METADATA RECEIPT PASS files=8 routes=28 release=false");
