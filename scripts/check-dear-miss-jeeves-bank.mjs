#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = new Set(["SCHEDULED", "PUBLISHED"]);
const VERIFIED = new Set(["ANSWER_VERIFIED", "COLUMN_READY", "SCHEDULED", "PUBLISHED", "UPDATE_DUE"]);

export function validateDearMissJeevesBank(data) {
  const errors = [];
  if (data?.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  if (data?.owner !== "learning-content-ecosystem") errors.push("owner must be learning-content-ecosystem");
  if (data?.cadence?.bankIntake !== "CONTINUOUS" || data?.cadence?.publication !== "WEEKLY_WHEN_ADMITTED" || data?.cadence?.maximumPublishedPerWeek !== 1) {
    errors.push("cadence must preserve continuous bank intake and at most one admitted weekly publication");
  }
  if (data?.futureQuestionIntake?.status !== "NOT_IMPLEMENTED" || !/private|privacy/i.test(data?.futureQuestionIntake?.rule || "")) {
    errors.push("future visitor-question intake must remain private and not implemented");
  }
  const ids = new Set();
  const weekSlots = new Set();
  for (const record of data?.records || []) {
    if (!/^DMJ-[0-9]{3}$/.test(record.id || "")) errors.push(`${record.id || "unknown"} has invalid id`);
    if (ids.has(record.id)) errors.push(`duplicate record ${record.id}`);
    ids.add(record.id);
    if (!/^Dear Miss Jeeves,/i.test(record.question || "")) errors.push(`${record.id} question must begin Dear Miss Jeeves,`);
    if (VERIFIED.has(record.status)) {
      for (const field of ["userSituation", "directAnswer", "mechanism", "commonMisunderstanding", "readerMove", "productBoundary"]) {
        if (!record[field]) errors.push(`${record.id} ${record.status} missing ${field}`);
      }
      if (!record.canonicalAnswer?.answerId || !record.canonicalAnswer?.path) errors.push(`${record.id} ${record.status} lacks canonical answer binding`);
      if (!record.sourceClaimIds?.length || !record.sourceContentIds?.length) errors.push(`${record.id} ${record.status} lacks source bindings`);
      if (!record.freshness?.lastCheckedAt || !record.freshness?.expiresAt || !record.freshness?.recheckTriggers?.length) errors.push(`${record.id} ${record.status} lacks freshness contract`);
    }
    if (PUBLIC.has(record.status)) {
      if (!record.schedule?.publicationDate) errors.push(`${record.id} ${record.status} lacks publicationDate`);
      for (const gate of ["producer", "accuracy", "editorial", "laidiesVoice", "formatFit", "owner"]) {
        if (!record.reviewEvidence?.[gate]) errors.push(`${record.id} ${record.status} lacks ${gate} evidence`);
      }
      if (record.publicEligibility !== "ELIGIBLE") errors.push(`${record.id} ${record.status} is not ELIGIBLE`);
      if (record.schedule?.publicationDate) {
        const date = new Date(`${record.schedule.publicationDate}T12:00:00Z`);
        const thursday = new Date(date);
        thursday.setUTCDate(date.getUTCDate() + (4 - date.getUTCDay()));
        const key = thursday.toISOString().slice(0, 10);
        if (weekSlots.has(key)) errors.push(`multiple Dear Miss Jeeves publications in week ${key}`);
        weekSlots.add(key);
      }
    } else if (record.publicEligibility === "ELIGIBLE") {
      errors.push(`${record.id} is not scheduled/published but marked ELIGIBLE`);
    }
    if (record.radioAdaptation?.status === "PUBLISHED" && (!record.radioAdaptation.scriptPath || !record.radioAdaptation.audioPath || record.status !== "PUBLISHED")) {
      errors.push(`${record.id} radio publication lacks a published canonical column and exact script/audio`);
    }
  }
  return { errors, records: (data?.records || []).length, scheduledWeeks: weekSlots.size };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const filePath = path.join(process.cwd(), process.argv[2] || "content/dear-miss-jeeves-bank.json");
  let data;
  try { data = JSON.parse(fs.readFileSync(filePath, "utf8")); } catch (error) {
    console.error("DEAR MISS JEEVES BANK CHECK FAIL");
    console.error(`- invalid JSON: ${error.message}`);
    process.exit(1);
  }
  const result = validateDearMissJeevesBank(data);
  if (result.errors.length) {
    console.error("DEAR MISS JEEVES BANK CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("DEAR MISS JEEVES BANK CHECK PASS");
  console.log(`records=${result.records}`);
  console.log(`scheduled_weeks=${result.scheduledWeeks}`);
}
