#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const checker = path.join(root, "scripts", "check-product-stewards.mjs");

function run(args) {
  return spawnSync(process.execPath, [checker, ...args], { cwd: root, encoding: "utf8" });
}

const unrelated = run(["--owner-entry", "episode-experience"]);
assert.equal(unrelated.status, 0, unrelated.stderr || unrelated.stdout);
assert.match(unrelated.stdout, /owner_entry_product=episode-experience:PASS/);
assert.match(unrelated.stdout, /owner_entry_unrelated_attention=learning relationships: LCR-003 is overdue/);

const owningProduct = run(["--owner-entry", "sunnyvaile-high"]);
assert.notEqual(owningProduct.status, 0, "the owner responsible for the overdue blocker must still fail");
assert.match(owningProduct.stderr, /learning relationships: LCR-003 is overdue/);

const strict = run(["--owner-entry", "episode-experience", "--strict-owner-entry"]);
assert.notEqual(strict.status, 0, "strict owner-entry must retain portfolio-wide enforcement");
assert.match(strict.stderr, /learning relationships: LCR-003 is overdue/);

console.log("PRODUCT STEWARD OWNER-ENTRY SCOPE TEST PASS");
console.log("unrelated_owner=PASS_WITH_ATTENTION");
console.log("responsible_owner=FAIL_AS_CALIBRATED");
console.log("strict_owner_entry=FAIL_AS_CALIBRATED");
