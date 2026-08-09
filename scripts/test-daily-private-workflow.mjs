#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workflowPath = path.join(process.cwd(), ".github/workflows/daily-private-review.yml");
const source = fs.readFileSync(workflowPath, "utf8");

function errors(value) {
  const result = [];
  if (!/^\s*workflow_dispatch:/m.test(value)) result.push("manual trigger missing");
  if (/^\s*schedule:/m.test(value) || /\bcron:/m.test(value)) result.push("scheduled trigger forbidden");
  if (!/^permissions:\s*\n\s+contents: read\s*$/m.test(value)) result.push("permissions are not read-only");
  if (!/compose-daily-edition\.mjs/.test(value)) result.push("private composer missing");
  if (/node scripts\/promote-daily-edition\.mjs(?:\s|\\)/m.test(value) || /scripts\/update-hot-goss\.py/.test(value)) result.push("promotion or retired workflow invoked");
  if (!/PRIVATE_DRAFT_ONLY/.test(value) || !/canonicalWrite/.test(value) || !/deployActionTaken/.test(value)) result.push("private boundaries are not asserted");
  if (!/actions\/upload-artifact@v4/.test(value) || !/retention-days:\s*7/.test(value)) result.push("bounded private artifact missing");
  return result;
}

assert.deepEqual(errors(source), []);
assert(errors(`${source}\n  schedule:\n    - cron: '0 0 * * *'\n`).includes("scheduled trigger forbidden"));
const promotionSubstitution = source.replaceAll("compose-daily-edition.mjs", "promote-daily-edition.mjs");
assert(errors(promotionSubstitution).includes("private composer missing"));
assert(errors(promotionSubstitution).includes("promotion or retired workflow invoked"));

console.log("DAILY PRIVATE WORKFLOW TEST PASS");
console.log("scheduled_trigger=FAIL_AS_CALIBRATED");
console.log("promotion_substitution=FAIL_AS_CALIBRATED");
