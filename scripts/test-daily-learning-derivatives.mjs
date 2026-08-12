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
  const originalCareer = duplicateCareer.records.find((record) => record.id === "DLD-2026-08-03-CAREER-DELEGATE-THE-OUTCOME");
  originalCareer.status = "APPROVED";
  originalCareer.publicEligibility = "ELIGIBLE";
  delete originalCareer.aliRejectionEvidence;
  const career = clone(originalCareer);
  career.id = "DLD-2026-08-03-CAREER-DUPLICATE";
  duplicateCareer.records.push(career);
  write(dataPath, duplicateCareer);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /multiple public career_life records/);

  const staleCareer = clone(data);
  const staleCareerRecord = staleCareer.records.find((record) => record.id === "DLD-2026-08-03-CAREER-DELEGATE-THE-OUTCOME");
  staleCareerRecord.status = "APPROVED";
  staleCareerRecord.publicEligibility = "ELIGIBLE";
  staleCareerRecord.freshness.expiresAt = "2026-08-10";
  delete staleCareerRecord.aliRejectionEvidence;
  write(dataPath, staleCareer);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /expired but public/);

  const reapprovedRejection = clone(data);
  const rejectedCareer = reapprovedRejection.records.find((record) => record.id === "DLD-2026-08-03-CAREER-DELEGATE-THE-OUTCOME");
  rejectedCareer.status = "APPROVED";
  rejectedCareer.publicEligibility = "ELIGIBLE";
  write(dataPath, reapprovedRejection);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /carries Ali rejection and cannot return to APPROVED/);

  const rejectionWithoutEvidence = clone(data);
  delete rejectionWithoutEvidence.records.find((record) => record.status === "REJECTED").aliRejectionEvidence;
  write(dataPath, rejectionWithoutEvidence);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /direct rejection needs Ali evidence/);

  const inventedPublicHistory = clone(data);
  inventedPublicHistory.records.find((record) => record.publicHistory).publicHistory.artifactSha256 = "reviewed-locally";
  write(dataPath, inventedPublicHistory);
  assert.match(checkDailyLearningDerivatives({ root: tempRoot, asOf: "2026-08-11" }).errors.join("\n"), /publicHistory needs an exact SHA-256/);

  console.log("DAILY LEARNING DERIVATIVE TEST PASS");
  console.log("calibration=missing-career-empty-state,duplicate-career-slot,expired-career,reapproved-Ali-rejection,rejection-without-evidence,invented-public-history rejected");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
