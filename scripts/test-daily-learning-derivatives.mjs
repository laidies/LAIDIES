#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkDailyLearningDerivatives } from "./check-daily-learning-derivatives.mjs";

const sourceRoot = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-daily-derivatives-"));
const dataPath = "content/daily-learning-derivatives.json";
const claimsPath = "operations/product-stewards/learning-content-ecosystem/claim-register.json";
const data = JSON.parse(fs.readFileSync(path.join(sourceRoot, dataPath), "utf8"));
const claims = JSON.parse(fs.readFileSync(path.join(sourceRoot, claimsPath), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

function write(relative, value) {
  const target = path.join(tempRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(value, null, 2) + "\n");
}

try {
  write(dataPath, data);
  write(claimsPath, claims);
  assert.deepEqual(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors, []);

  const missingCareer = clone(data);
  delete missingCareer.emptyStates.career_life;
  write(dataPath, missingCareer);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /missing career_life empty state/);

  const duplicateCareer = clone(data);
  const career = clone(duplicateCareer.records.find((record) => record.type === "career_life"));
  career.id = "DLD-2026-08-03-CAREER-DUPLICATE";
  duplicateCareer.records.push(career);
  write(dataPath, duplicateCareer);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /multiple public career_life records/);

  const staleCareer = clone(data);
  staleCareer.records.find((record) => record.type === "career_life").freshness.expiresAt = "2026-08-10";
  write(dataPath, staleCareer);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /expired but public/);

  console.log("DAILY LEARNING DERIVATIVE TEST PASS");
  console.log("calibration=missing-career-empty-state,duplicate-career-slot,expired-career rejected");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
