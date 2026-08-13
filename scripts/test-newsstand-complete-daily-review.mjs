#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectCompleteDailyReview } from "./check-newsstand-complete-daily-review.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE = path.join(ROOT, "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v1.json");
const pkg = JSON.parse(fs.readFileSync(PACKAGE, "utf8"));

assert.deepEqual(inspectCompleteDailyReview(pkg).errors, []);
const badCases = [
  { ...pkg, publicEligibility: "ELIGIBLE" },
  { ...pkg, remainingGates: pkg.remainingGates.slice(1) },
  { ...pkg, evidence: { ...pkg.evidence, semanticReview: { ...pkg.evidence.semanticReview, sha256: "0".repeat(64) } } },
  { ...pkg, evidence: { ...pkg.evidence, screenshots: pkg.evidence.screenshots.slice(0, 5) } },
  { ...pkg, releaseAuthority: { canonicalWrite: true, deploy: false, public: false } },
  { ...pkg, desks: pkg.desks.map(desk => desk.type === "paige_tip" ? { ...desk, sourceCandidate: { ...desk.sourceCandidate, sha256: "f".repeat(64) } } : desk) }
];
for (const [index, candidate] of badCases.entries()) assert(inspectCompleteDailyReview(candidate).errors.length > 0, `bad case ${index + 1} must fail`);
console.log(`NEWSSTAND COMPLETE DAILY REVIEW CALIBRATION PASS accepted=1 rejected=${badCases.length}`);
