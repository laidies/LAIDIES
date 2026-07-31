#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.TOWN_CATALOGUE_ROOT || process.cwd());
const productDir = path.join(root, "operations/product-stewards/trading-cards");
const file = path.join(productDir, "town-character-technical-catalogue-candidate-v1-2026-07-27.json");
const catalogue = JSON.parse(fs.readFileSync(file, "utf8"));
const required = [
  "card_key", "deck", "catalog_version", "release_state", "episode_or_roster",
  "front_title", "front_hook", "back_heading", "back_copy", "source_authority",
  "source_locator", "image_front", "image_back_or_rendered_copy", "alt_front",
  "alt_back", "pack_keys", "identity_ref", "visual_review_receipt",
  "editorial_review_receipt", "correction_owner", "updated_at"
];

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

assert.equal(catalogue.records.length, 13, "exact Town record count");
assert.equal(catalogue.release_state, "held");
assert.equal(catalogue.pack_state, "not_created");
assert.equal(catalogue.ownership_state, "none");
assert.equal(catalogue.closet_projection_state, "not_wired");
assert.equal(catalogue.public_state, "not_released");
assert.equal(new Set(catalogue.records.map((record) => record.card_key)).size, 13);
assert.equal(new Set(catalogue.records.map((record) => record.identity_ref)).size, 13);

for (const record of catalogue.records) {
  for (const field of required) {
    assert.ok(Object.hasOwn(record, field), `${record.card_key} has ${field}`);
  }
  assert.equal(record.deck, "character");
  assert.equal(record.catalog_version, catalogue.catalog_version);
  assert.equal(record.release_state, "held");
  assert.deepEqual(record.pack_keys, []);
  assert.equal(record.image_back_or_rendered_copy.kind, "rendered_copy");
  assert.ok(record.back_copy.length >= 30);
  assert.ok(record.alt_front.length >= 24);
  assert.ok(record.alt_back.length >= 24);

  const front = path.join(root, record.image_front.path);
  assert.ok(fs.existsSync(front), `${record.card_key} front exists`);
  assert.equal(sha256(front), record.image_front.sha256, `${record.card_key} front hash`);

  for (const receipt of [
    record.source_authority,
    record.visual_review_receipt,
    record.editorial_review_receipt,
    record.accessibility_review_receipt
  ]) {
    const receiptPath = path.join(root, receipt.path);
    assert.ok(fs.existsSync(receiptPath), `${record.card_key} receipt exists`);
    assert.equal(sha256(receiptPath), receipt.sha256, `${record.card_key} receipt hash`);
  }
}

const serialized = JSON.stringify(catalogue);
assert.doesNotMatch(serialized, /entitlement_id|resident_id|opened_at|odds_version|idempotency_key/);
assert.doesNotMatch(serialized, /"release_state":"admitted"|"pack_state":"created"|"ownership_state":"owned"/);

console.log("TOWN TECHNICAL CATALOGUE PASS records=13 required-fields=21 fronts=13 receipts=52 release=held pack=not-created ownership=none");
