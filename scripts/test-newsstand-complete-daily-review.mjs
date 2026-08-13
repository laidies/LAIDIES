#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectCompleteDailyReview } from "./check-newsstand-complete-daily-review.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE = path.join(ROOT, "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v1.json");
const pkg = JSON.parse(fs.readFileSync(PACKAGE, "utf8"));
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

assert.match(inspectCompleteDailyReview(pkg).errors.join("\n"), /explicitly rejected/);
const structural = structuredClone(pkg);
for (const desk of structural.desks.filter(item => item.state === "ready")) {
  desk.sourceCandidate.sha256 = sha256(fs.readFileSync(path.join(ROOT, desk.sourceCandidate.path)));
}
for (const [viewport, file] of [[1440, "daily-review-full-page-1440.png"], [390, "daily-review-full-page-390.png"], [320, "daily-review-full-page-320.png"]]) {
  const relative = `operations/product-stewards/newsstand/evidence-newsstand-daily-review-v24-2026-08-13/${file}`;
  structural.evidence.screenshots.unshift({ mode: "COMPLETE_PAGE", viewport, path: relative, sha256: sha256(fs.readFileSync(path.join(ROOT, relative))) });
}
assert.deepEqual(inspectCompleteDailyReview(structural, { rejections: [] }).errors, []);
const badCases = [
  { ...structural, publicEligibility: "ELIGIBLE" },
  { ...structural, remainingGates: structural.remainingGates.slice(1) },
  { ...structural, evidence: { ...structural.evidence, semanticReview: { ...structural.evidence.semanticReview, sha256: "0".repeat(64) } } },
  { ...structural, evidence: { ...structural.evidence, screenshots: structural.evidence.screenshots.slice(0, 8) } },
  { ...structural, evidence: { ...structural.evidence, screenshots: structural.evidence.screenshots.map(item => item.mode === "COMPLETE_PAGE" && item.viewport === 390 ? { ...item, mode: "DAILY_FRONT" } : item) } },
  { ...structural, releaseAuthority: { canonicalWrite: true, deploy: false, public: false } },
  { ...structural, desks: structural.desks.map(desk => desk.type === "paige_tip" ? { ...desk, sourceCandidate: { ...desk.sourceCandidate, sha256: "f".repeat(64) } } : desk) }
];
for (const [index, candidate] of badCases.entries()) assert(inspectCompleteDailyReview(candidate, { rejections: [] }).errors.length > 0, `bad case ${index + 1} must fail`);
console.log(`NEWSSTAND COMPLETE DAILY REVIEW CALIBRATION PASS structural_fixture=1 complete_page_matrix=1 rejected_package=1 rejected_mutations=${badCases.length}`);
