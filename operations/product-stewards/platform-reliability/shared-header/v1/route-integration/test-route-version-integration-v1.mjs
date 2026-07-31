#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import { payloadSha256 } from "../release-binding/asset-cache-binding-v1.mjs";
import {
  validateRouteIntegration,
  validateRouteRequests
} from "./route-version-integration-v1.mjs";

const root = process.cwd();
const receiptPath = "operations/product-stewards/platform-reliability/shared-header/v1/route-integration/svgh-320-route-version-integration-v1.json";
const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
const reseal = (value) => {
  value.seal.payloadSha256 = payloadSha256(value.payload);
  return value;
};
const reject = (label, mutate, pattern, shouldReseal = true) => {
  const candidate = clone(receipt);
  mutate(candidate);
  if (shouldReseal) reseal(candidate);
  assert.throws(() => validateRouteIntegration(candidate, { root }), pattern, `${label} must fail`);
};

const first = validateRouteIntegration(receipt, { root });
const second = validateRouteIntegration(receipt, { root });
assert.deepEqual(second, first, "route validation must be idempotent");

reject("seal tamper", (candidate) => {
  candidate.seal.payloadSha256 = "0".repeat(64);
}, /seal mismatch/, false);
reject("source hash tamper", (candidate) => {
  candidate.payload.acceptedSource.sha256 = "0".repeat(64);
}, /acceptedSource checksum mismatch/);
reject("stale version key", (candidate) => {
  candidate.payload.version.versionKey = "stale";
}, /source-derived/);
reject("Homepage integrated hash tamper", (candidate) => {
  candidate.payload.routes[0].integratedSha256 = "0".repeat(64);
}, /homepage integrated checksum mismatch/);
reject("Start Here invented consumption", (candidate) => {
  candidate.payload.routes[1].consumesSharedHeader = true;
  candidate.payload.routes[1].priorRequestPath = candidate.payload.rollback.requestPath;
}, /startHere must contain one integrated request/);
reject("Visitor containment authority escalation", (candidate) => {
  candidate.payload.authority.visitorContainmentRemoval = true;
}, /escalates authority/);
reject("rollback prior hash tamper", (candidate) => {
  candidate.payload.routes[2].priorSha256 = "0".repeat(64);
}, /inverse rollback/);
reject("unknown receipt field", (candidate) => {
  candidate.payload.routes[0].extra = true;
}, /missing or unknown fields/);

const texts = Object.fromEntries(receipt.payload.routes.map((route) => [
  route.role,
  fs.readFileSync(route.path, "utf8")
]));
const mixed = {
  ...texts,
  visitorsCentre: texts.visitorsCentre.replace(
    receipt.payload.version.requestPath,
    receipt.payload.rollback.requestPath
  )
};
assert.throws(
  () => validateRouteRequests(receipt.payload, mixed, "integrated"),
  /visitorsCentre integrated request mismatch/,
  "mixed old/new cache keys must fail"
);
const duplicate = {
  ...texts,
  homepage: `${texts.homepage}\n<script src="${receipt.payload.version.requestPath}"></script>`
};
assert.throws(
  () => validateRouteRequests(receipt.payload, duplicate, "integrated"),
  /homepage integrated request mismatch/,
  "duplicate shared-header mount requests must fail"
);

console.log(
  `ROUTE VERSION INTEGRATION V1 PASS receipt=${first.receiptId} ` +
  `version=${first.versionKey} routes=3 consumers=2 valid=2 invalid=10 ` +
  "rollback=PASS containment=PRESERVED owner_acceptance=PENDING mutation=false"
);

