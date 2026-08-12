#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validateDearMissJeevesBank } from "./check-dear-miss-jeeves-bank.mjs";

const source = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/dear-miss-jeeves-bank.json"), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
assert.deepEqual(validateDearMissJeevesBank(source).errors, []);

const automaticIntake = clone(source);
automaticIntake.futureQuestionIntake.status = "ACTIVE";
automaticIntake.futureQuestionIntake.rule = "Publish questions automatically.";
assert.match(validateDearMissJeevesBank(automaticIntake).errors.join("\n"), /private and not implemented/);

const falseReady = clone(source);
falseReady.records[0].status = "COLUMN_READY";
assert.match(validateDearMissJeevesBank(falseReady).errors.join("\n"), /missing userSituation|lacks canonical answer binding/);

const duplicateWeek = clone(source);
for (let index = 0; index < 2; index += 1) {
  const record = duplicateWeek.records[index];
  record.status = "SCHEDULED";
  record.userSituation = "A bounded situation";
  record.directAnswer = "A bounded answer";
  record.mechanism = "A bounded mechanism";
  record.commonMisunderstanding = "A bounded misconception";
  record.readerMove = "A bounded move";
  record.productBoundary = "A bounded product limit";
  record.canonicalAnswer = { answerId: `SA-${index + 1}`, path: "content/library-books/straight-answers.md" };
  record.sourceClaimIds = ["CLM-DEF-MODEL"];
  record.sourceContentIds = ["straight-answers" ];
  record.freshness = { lastCheckedAt: "2026-08-11", expiresAt: "2026-09-11", recheckTriggers: ["The product changes."] };
  record.reviewEvidence = { producer: "p", accuracy: "a", editorial: "e", laidiesVoice: "v", formatFit: "f", owner: "o" };
  record.schedule.publicationDate = index === 0 ? "2026-08-12" : "2026-08-14";
  record.publicEligibility = "ELIGIBLE";
}
assert.match(validateDearMissJeevesBank(duplicateWeek).errors.join("\n"), /multiple Dear Miss Jeeves publications/);

console.log("DEAR MISS JEEVES BANK TEST PASS");
console.log("calibration=automatic-intake,false-ready,duplicate-week rejected");
