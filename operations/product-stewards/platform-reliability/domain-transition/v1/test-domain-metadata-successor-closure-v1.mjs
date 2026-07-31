#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const closure = JSON.parse(fs.readFileSync(path.join(
  root,
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-successor-v1-closure.json"
), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relative) => fs.readFileSync(path.join(root, relative));

assert.equal(closure.schemaVersion, 1);
assert.equal(
  closure.status,
  "VERIFIED_LOCALLY_INDEPENDENTLY_ACCEPTED_PUBLIC_PROVIDER_PROOF_PENDING"
);
assert.equal(shaValue(closure.payload), closure.seal.payloadSha256);
assert.equal(sha(read(closure.payload.candidate.path)), closure.payload.candidate.sha256);
assert.equal(
  JSON.parse(read(closure.payload.candidate.path)).seal.payloadSha256,
  closure.payload.candidate.payloadSha256
);
assert.equal(
  sha(read(closure.payload.independentAcceptance.path)),
  closure.payload.independentAcceptance.sha256
);
assert.equal(
  sha(read(closure.payload.acceptedOutput.path)),
  closure.payload.acceptedOutput.sha256
);
const output = JSON.parse(read(closure.payload.acceptedOutput.path));
assert.equal(output.seal.corpusSha256, closure.payload.acceptedOutput.corpusSha256);
assert.equal(output.routes.length, 28);
assert.equal(closure.payload.releaseGate.localIndependentAcceptanceComplete, true);
assert.equal(closure.payload.releaseGate.deploy, false);
assert.equal(closure.payload.releaseGate.publicMutation, false);
assert.equal(closure.payload.releaseGate.analyticsAttribution, "UNKNOWN");

console.log("DOMAIN METADATA CLOSURE PASS accepted=1 routes=28 public_release=false");
