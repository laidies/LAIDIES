import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { shaValue } from "../../readiness-projection/v1/readiness-projection-v1.mjs";

const root = process.cwd();
const state = JSON.parse(fs.readFileSync(path.join(
  root,
  "operations/product-stewards/platform-reliability/context-navigation/v1/context-navigation-distribution-v1-acceptance-state.json"
), "utf8"));
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (relative) => fs.readFileSync(path.join(root, relative));

assert.equal(state.schemaVersion, 1);
assert.equal(state.status, "REQUIRED_CONSUMERS_ACCEPTED_HIGH_SUPPLEMENTARY_OPEN");
assert.equal(shaValue(state.payload), state.seal.payloadSha256);
assert.equal(
  sha(read(state.payload.candidateReceipt.path)),
  state.payload.candidateReceipt.sha256
);
assert.equal(
  JSON.parse(read(state.payload.candidateReceipt.path)).seal.payloadSha256,
  state.payload.candidateReceipt.payloadSha256
);
const visitor = state.payload.acceptances.visitorsCentre;
assert.equal(visitor.status, "ACCEPT");
assert.equal(sha(read(visitor.path)), visitor.sha256);
const town = state.payload.acceptances.townEntry;
assert.equal(town.status, "ACCEPT");
assert.equal(sha(read(town.path)), town.sha256);
const high = state.payload.acceptances.sunnyvaileHighSupplementary;
assert.equal(high.status, "OPEN_SUPPLEMENTARY");
assert.equal(high.path, null);
assert.equal(high.sha256, null);
assert.equal(high.releaseGate, false);
assert.match(high.scope, /SUNNYVAiLE High/);
assert.equal(state.payload.releaseGate.independentConsumerAcceptanceComplete, true);
assert.equal(state.payload.releaseGate.deploy, false);
assert.equal(state.payload.releaseGate.publicMutation, false);

console.log("CONTEXT NAV ACCEPTANCE STATE PASS required=2 accepted=2 high_supplementary=open public_release=false");
