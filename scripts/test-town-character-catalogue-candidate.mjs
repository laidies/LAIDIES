#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const candidatePath = path.join(
  root,
  "operations/product-stewards/trading-cards/town-character-catalogue-admission-candidate-v1-2026-07-27.json"
);
const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const sha256 = (file) => crypto
  .createHash("sha256")
  .update(fs.readFileSync(path.join(root, file)))
  .digest("hex");

check(candidate.schema_version === 1, "schema version must be 1");
check(candidate.kind === "town_character_catalogue_admission_candidate", "kind mismatch");
check(candidate.release_state === "held_candidate", "candidate must remain held");
check(candidate.pack_state === "not_created", "candidate must not create a pack");
check(candidate.records?.length === 13, "expected exactly 13 Town records");
check(candidate.required_reviews?.length === 4, "all four independent review classes are required");

for (const [key, binding] of Object.entries(candidate.authority || {})) {
  check(typeof binding.path === "string" && typeof binding.sha256 === "string",
    `${key} authority binding is incomplete`);
  if (binding.path && fs.existsSync(path.join(root, binding.path))) {
    check(sha256(binding.path) === binding.sha256, `${key} authority hash drift`);
  } else {
    failures.push(`${key} authority path is missing`);
  }
}

const keys = new Set();
const identities = new Set();
for (const record of candidate.records || []) {
  check(/^character:town:[a-z0-9-]+:v1$/.test(record.card_key || ""),
    `${record.card_key || "unknown"} invalid card key`);
  check(!keys.has(record.card_key), `${record.card_key} duplicate card key`);
  keys.add(record.card_key);
  check(!identities.has(record.identity_id), `${record.identity_id} duplicate identity`);
  identities.add(record.identity_id);
  check(record.pack_eligibility === false, `${record.card_key} became pack eligible`);
  check(record.states?.release === "held", `${record.card_key} release is not held`);
  check(record.states?.editorial === "pending", `${record.card_key} editorial state is not pending`);
  check(record.states?.accessibility === "pending", `${record.card_key} accessibility state is not pending`);
  check(record.states?.technical === "pending", `${record.card_key} technical state is not pending`);
  check(typeof record.front?.file === "string", `${record.card_key} missing front file`);
  check(typeof record.front?.sha256 === "string", `${record.card_key} missing front hash`);
  if (record.front?.file && fs.existsSync(path.join(root, record.front.file))) {
    check(sha256(record.front.file) === record.front.sha256, `${record.card_key} front hash drift`);
  } else {
    failures.push(`${record.card_key} front file missing`);
  }
  check(typeof record.front?.title === "string" && record.front.title.length > 0,
    `${record.card_key} missing front title`);
  check(typeof record.front?.alt === "string" && record.front.alt.length >= 40,
    `${record.card_key} front alt is incomplete`);
  check(record.back?.render_kind === "rendered_copy_candidate",
    `${record.card_key} back is not an explicit rendered-copy candidate`);
  for (const field of ["heading", "teaching_move", "boundary", "alt"]) {
    check(typeof record.back?.[field] === "string" && record.back[field].trim().length >= 12,
      `${record.card_key} back ${field} is incomplete`);
  }
}

const serialized = JSON.stringify(candidate);
for (const prohibited of [
  "\"owned\":true",
  "\"granted\":true",
  "\"reward\"",
  "\"pack_key\"",
  "\"public\":true",
  "\"release_state\":\"admitted\""
]) {
  check(!serialized.includes(prohibited), `candidate contains prohibited authority: ${prohibited}`);
}

if (failures.length) {
  console.error(`TOWN CHARACTER CATALOGUE CANDIDATE FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  "TOWN CHARACTER CATALOGUE CANDIDATE PASS records=13 fronts=13 backs=13 " +
  "release=held pack=not-created ownership=none"
);
