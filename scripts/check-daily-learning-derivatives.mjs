#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = new Set(["APPROVED", "PUBLISHED"]);

export function checkDailyLearningDerivatives({ root = process.cwd(), asOf = new Date().toISOString().slice(0, 10) } = {}) {
  const errors = [];
  const dataPath = path.join(root, "content/daily-learning-derivatives.json");
  const claimsPath = path.join(root, "operations/product-stewards/learning-content-ecosystem/claim-register.json");
  let data;
  let claims;
  try { data = JSON.parse(fs.readFileSync(dataPath, "utf8")); } catch (error) { return { errors: [`daily derivatives invalid: ${error.message}`] }; }
  try { claims = JSON.parse(fs.readFileSync(claimsPath, "utf8")); } catch (error) { return { errors: [`claim register invalid: ${error.message}`] }; }
  if (data.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  if (data.owner !== "newsstand-daily") errors.push("owner must be newsstand-daily");
  for (const type of ["paige_tip", "promptoscope"]) if (!data.emptyStates?.[type]) errors.push(`missing ${type} empty state`);
  const knownClaims = new Map((claims.claims || []).map((claim) => [claim.id, claim]));
  const ids = new Set();
  const publicSlots = new Set();
  for (const record of data.records || []) {
    if (ids.has(record.id)) errors.push(`duplicate record ${record.id}`);
    ids.add(record.id);
    for (const field of ["id", "type", "status", "date", "headline", "body", "audienceJob", "canonicalPath"]) {
      if (!record[field]) errors.push(`${record.id || "unknown"} missing ${field}`);
    }
    if (!Array.isArray(record.sourceClaimIds) || !record.sourceClaimIds.length) errors.push(`${record.id} missing sourceClaimIds`);
    if (!Array.isArray(record.sourceContentIds) || !record.sourceContentIds.length) errors.push(`${record.id} missing sourceContentIds`);
    for (const claimId of record.sourceClaimIds || []) {
      const claim = knownClaims.get(claimId);
      if (!claim) errors.push(`${record.id} references unknown claim ${claimId}`);
      if (PUBLIC.has(record.status) && claim?.status !== "CURRENT") errors.push(`${record.id} cannot publish from ${claimId} status ${claim?.status}`);
    }
    if (!record.freshness?.lastCheckedAt || !record.freshness?.expiresAt || !record.freshness?.recheckTriggers?.length) errors.push(`${record.id} has incomplete freshness contract`);
    if (PUBLIC.has(record.status)) {
      if (record.freshness.expiresAt < asOf) errors.push(`${record.id} is expired but public`);
      if (record.publicEligibility !== "ELIGIBLE") errors.push(`${record.id} is public without ELIGIBLE ruling`);
      for (const gate of ["accuracy", "editorial", "laidiesVoice", "formatFit"]) {
        if (!record.reviewEvidence?.[gate]) errors.push(`${record.id} is public without ${gate} evidence`);
      }
      const slot = `${record.date}:${record.type}`;
      if (publicSlots.has(slot)) errors.push(`multiple public ${record.type} records for ${record.date}`);
      publicSlots.add(slot);
    } else if (record.publicEligibility === "ELIGIBLE") {
      errors.push(`${record.id} is non-public but marked ELIGIBLE`);
    }
    if (["RETRACTED", "EXPIRED"].includes(record.status) && record.publicEligibility !== "INELIGIBLE") errors.push(`${record.id} must be suppressed`);
  }
  return { errors, records: (data.records || []).length, publicRecords: publicSlots.size };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const result = checkDailyLearningDerivatives();
  if (result.errors.length) {
    console.error("DAILY LEARNING DERIVATIVE CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("DAILY LEARNING DERIVATIVE CHECK PASS");
  console.log(`records=${result.records}`);
  console.log(`public_records=${result.publicRecords}`);
}
