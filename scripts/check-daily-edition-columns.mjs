#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = [
  "paige_tip", "promptoscope", "career_life", "concept_week", "mme_claio",
  "dear_miss_jeeves", "behind_build", "around_town", "whats_new_sunnyvaile",
  "crossword", "song", "did_you_know", "town_note", "curiosity", "fiction"
];
const PUBLIC = new Set(["APPROVED", "PUBLISHED", "CORRECTED"]);
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function calendarDateInZone(value = new Date(), timeZone = "America/Vancouver") {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(value).reduce((result, part) => {
    if (part.type !== "literal") result[part.type] = part.value;
    return result;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function checkDailyEditionColumns(data, { root = ROOT, asOf = calendarDateInZone(), release = false, issueDate = null } = {}) {
  const errors = [];
  if (!data || data.schemaVersion !== "1.0.0" || data.owner !== "newsstand-daily") errors.push("invalid Daily column authority");
  for (const type of TYPES) if (!data?.emptyStates?.[type]) errors.push(`missing ${type} empty state`);
  const ids = new Set();
  const slots = new Set();
  for (const record of data?.records || []) {
    if (ids.has(record.id)) errors.push(`duplicate record ${record.id}`);
    ids.add(record.id);
    if (!TYPES.includes(record.type)) errors.push(`${record.id} has invalid type`);
    const slot = `${record.editionDate}:${record.type}`;
    if (slots.has(slot)) errors.push(`duplicate Daily slot ${slot}`);
    slots.add(slot);
    const sourcePath = path.join(root, String(record.sourcePath || "").replace(/^\/+/, ""));
    if (!record.sourcePath || !fs.existsSync(sourcePath)) errors.push(`${record.id} sourcePath does not resolve`);
    if (!record.freshness?.lastCheckedAt || !record.freshness?.expiresAt || !record.freshness?.recheckTriggers?.length) errors.push(`${record.id} has incomplete freshness`);
    if (PUBLIC.has(record.status)) {
      if (record.publicEligibility !== "ELIGIBLE") errors.push(`${record.id} is public without ELIGIBLE ruling`);
      if (record.freshness.expiresAt < asOf) errors.push(`${record.id} is expired`);
      for (const gate of ["accuracy", "editorial", "voice", "format", "owner"]) {
        if (!record.reviewEvidence?.[gate]) errors.push(`${record.id} is public without ${gate} evidence`);
        else {
          const evidencePath = path.join(root, String(record.reviewEvidence[gate]).replace(/^\/+/, ""));
          if (!fs.existsSync(evidencePath)) errors.push(`${record.id} ${gate} evidence does not resolve`);
        }
      }
      if (record.type === "mme_claio" && !record.reviewEvidence?.safety) errors.push(`${record.id} Mme CLAi-O selection lacks safety evidence`);
      if (record.type === "mme_claio" && record.reviewEvidence?.safety) {
        const safetyPath = path.join(root, String(record.reviewEvidence.safety).replace(/^\/+/, ""));
        if (!fs.existsSync(safetyPath)) errors.push(`${record.id} safety evidence does not resolve`);
      }
    } else if (record.publicEligibility === "ELIGIBLE") {
      errors.push(`${record.id} is non-public but ELIGIBLE`);
    }
    if (record.classification === "fiction" && !["fiction", "around_town"].includes(record.type)) errors.push(`${record.id} mislabels fiction`);
  }
  const records = data?.records || [];
  const publicRecords = records.filter((record) => PUBLIC.has(record.status)).length;
  const issuePublicRecords = issueDate
    ? records.filter((record) => record.editionDate === issueDate && PUBLIC.has(record.status)).length
    : 0;

  // `emptyStates` are display copy, not an authorization to release an empty Daily.
  // This schema has no governed quiet-publication object, so release mode must fail
  // closed until one is deliberately added and validated here.
  if (release && records.length === 0) {
    errors.push("Daily release has no records; emptyStates are not a governed quiet-release state");
  }
  if (release && publicRecords === 0) {
    errors.push("Daily release has no public records; a held-only issue is not release-ready");
  }
  if (release && (!issueDate || !DATE.test(issueDate))) {
    errors.push("Daily release requires an explicit YYYY-MM-DD issueDate");
  } else if (release && issuePublicRecords === 0) {
    errors.push(`Daily release has no public records for issueDate ${issueDate}`);
  }

  return { errors, records: records.length, publicRecords, issueDate, issuePublicRecords };
}

const data = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
const release = process.argv.includes("--release");
const valueAfter = (flag) => {
  const index = process.argv.indexOf(flag);
  return index === -1 ? null : process.argv[index + 1];
};
const issueDate = valueAfter("--issue-date");
const asOf = valueAfter("--as-of") || calendarDateInZone();
if (process.argv.includes("--calibrate")) {
  const bad = structuredClone(data);
  bad.records.push(structuredClone(bad.records[0]));
  const result = checkDailyEditionColumns(bad);
  if (!result.errors.some((error) => error.includes("duplicate"))) {
    console.error("DAILY EDITION COLUMN CALIBRATION FAIL");
    process.exit(1);
  }
  const empty = structuredClone(data);
  empty.records = [];
  const emptyResult = checkDailyEditionColumns(empty, { release: true, issueDate: "2026-08-04", asOf: "2026-08-04" });
  if (!emptyResult.errors.some((error) => error.includes("no records")) || !emptyResult.errors.some((error) => error.includes("no public records"))) {
    console.error("DAILY EDITION COLUMN CALIBRATION FAIL empty_release_accepted=1");
    process.exit(1);
  }
  const staleDateResult = checkDailyEditionColumns(data, { release: true, issueDate: "2026-08-04", asOf: "2026-08-04" });
  if (!staleDateResult.errors.some((error) => error.includes("no public records for issueDate 2026-08-04"))) {
    console.error("DAILY EDITION COLUMN CALIBRATION FAIL prior_date_issue_accepted=1");
    process.exit(1);
  }
  console.log("DAILY EDITION COLUMN CALIBRATION PASS deliberate_duplicate_rejected=1 empty_release_rejected=1 prior_date_issue_rejected=1");
  process.exit(0);
}
const result = checkDailyEditionColumns(data, { release, issueDate, asOf });
if (result.errors.length) {
  console.error(`DAILY EDITION COLUMN ${release ? "RELEASE READINESS" : "SPECIFICATION"} CHECK FAIL`);
  result.errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`DAILY EDITION COLUMN ${release ? "RELEASE READINESS" : "SPECIFICATION"} CHECK PASS records=${result.records} public_records=${result.publicRecords}${release ? ` issue_date=${result.issueDate} issue_public_records=${result.issuePublicRecords}` : ""}`);
