#!/usr/bin/env node
"use strict";

// The historical runtime-family manifest records the inherited postcard bytes,
// but it does not grant public admission. This guard prevents either consumer
// from reconstructing that held family while preserving the audit record.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../../../..");
const picker = fs.readFileSync(path.join(root, "postcard.html"), "utf8");
const rack = fs.readFileSync(path.join(root, "content/site/post-office.js"), "utf8");
const environment = JSON.parse(fs.readFileSync(path.join(root, "operations/product-stewards/post-office/INTERACTIVE-ENVIRONMENT.json"), "utf8"));
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "content/site/postcard-catalog.json"), "utf8"));
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/assets/active-asset-registry.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(
  root,
  "operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/runtime-family-manifest.v1.json"
), "utf8"));

assert.equal(catalogue.schemaVersion, "1.0.0", "catalogue schema must remain current");
assert.equal(catalogue.catalogId, "postcard-picker-v1", "catalogue identity must remain stable");
assert.equal(catalogue.visualState, "HELD", "postcard artwork must remain explicitly held");
assert.deepEqual(catalogue.cards, [], "held public catalogue must construct no postcard choice");
assert.ok(catalogue.preDispatchBoundary.includes("No postcard has been selected"), "held catalogue must retain the pre-dispatch boundary");

assert.match(picker, /CATALOG_URL = '\/content\/site\/postcard-catalog\.json'/, "composer must consume the shared catalogue");
assert.match(rack, /CATALOG_URL = "\/content\/site\/postcard-catalog\.json"/, "rack must consume the shared catalogue");
assert.doesNotMatch(picker, /assets\/postcards\/from-sunnyvaile\//, "composer must not reconstruct held postcard paths");
assert.doesNotMatch(rack, /assets\/postcards\/from-sunnyvaile\//, "rack must not reconstruct held postcard paths");

const family = manifest.families.find((item) => item.id === "postcard-picker");
assert.ok(family && family.members.length === 11, "historical 11-byte family must remain auditable");
const activePaths = new Set((registry.entries || []).filter((item) => item.status === "ACTIVE").map((item) => (item.path || "").replace(/^\/+/, "")));
for (const member of family.members) {
  assert.equal(activePaths.has(member.path.replace(/^\/+/, "")), false, `held postcard must not be ACTIVE: ${member.path}`);
}
const postcardFeature = environment.features.find((item) => item.id === "postcard-rack-and-writing-desk");
assert.ok(postcardFeature, "postcard environment feature must remain declared");
assert.match(postcardFeature.result, /HELD.*zero public choices/, "environment truth must describe the current zero-choice held catalogue");
assert.doesNotMatch(JSON.stringify(postcardFeature), /11 supported IDs|Choose an admitted public postcard/, "environment truth must not describe historical candidates as public choices");

// Calibration: an ACTIVE visual state with no exact cards and an injected
// ACTIVE historical member must both be rejected.
const bad = { ...catalogue, visualState: "ACTIVE" };
assert.throws(() => {
  assert.equal(bad.visualState, "HELD");
}, /Expected values to be strictly equal/);
const injectedActive = new Set(activePaths);
injectedActive.add(family.members[0].path);
assert.throws(() => {
  assert.equal(injectedActive.has(family.members[0].path), false);
}, /Expected values to be strictly equal/);

console.log(`PASS postcard held picker: public choices=0 historical_members=${family.members.length} active_members=0 calibration_active=FAIL_EXPECTED calibration_registry=FAIL_EXPECTED`);
