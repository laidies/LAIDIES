#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_EMPTY_SOURCE_TRACKS = new Set([
  "official_or_primary",
  "independent_reporting",
  "named_reference",
  "aliases_and_mechanism"
]);
const RESOLVED_DISPOSITIONS = new Set([
  "VERIFIED",
  "PARTIALLY_VERIFIED",
  "SOURCE_HELD_MATERIAL_UPDATE",
  "ROUTED"
]);
const SEARCH_OUTCOMES = new Set(["FOUND", "NO_RESULT", "INACCESSIBLE"]);
const RESULT_RELATIONSHIPS = new Set([
  "CONFIRMS_MATERIAL_CLAIM",
  "CONTRADICTS_MATERIAL_CLAIM",
  "CONTEXT_ONLY",
  "FALSE_POSITIVE"
]);

function timestamp(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateSourceReconciliation(record) {
  const errors = [];
  if (record?.schemaVersion !== "laidies-source-reconciliation.v1") {
    errors.push("schemaVersion must be laidies-source-reconciliation.v1");
  }
  if (!record?.receiptId) errors.push("receiptId is missing");
  if (!Array.isArray(record?.signals) || record.signals.length === 0) {
    errors.push("signals must contain at least one reconciled source item");
    return { errors, signals: 0, claims: 0 };
  }

  let claimCount = 0;
  for (const [signalIndex, signal] of record.signals.entries()) {
    const at = `signals[${signalIndex}]`;
    if (!signal.signalId || !signal.sourceSystem || !signal.sourceUrl) errors.push(`${at} identity is incomplete`);
    const sourcePublishedAt = timestamp(signal.sourcePublishedAt);
    const observedAt = timestamp(signal.observedAt);
    const disposedAt = timestamp(signal.disposedAt);
    const finalRecheckAt = timestamp(signal.finalRecheckAt);
    if (sourcePublishedAt === null || observedAt === null || disposedAt === null || finalRecheckAt === null) {
      errors.push(`${at} has an invalid sourcePublishedAt, observedAt, finalRecheckAt or disposedAt`);
    } else {
      if (observedAt < sourcePublishedAt) errors.push(`${at} was observed before it was published`);
      if (finalRecheckAt < observedAt || disposedAt < finalRecheckAt) errors.push(`${at} final recheck must follow observation and precede disposition`);
      if (disposedAt - finalRecheckAt > 2 * 60 * 60 * 1000) errors.push(`${at} final source recheck is more than two hours before disposition`);
    }
    if (!Array.isArray(signal.materialClaims)) errors.push(`${at} materialClaims must be an array`);

    for (const [claimIndex, claim] of (signal.materialClaims || []).entries()) {
      claimCount += 1;
      const claimAt = `${at}.materialClaims[${claimIndex}]`;
      if (!claim.claimId || !claim.claim || !claim.disposition) errors.push(`${claimAt} identity or disposition is incomplete`);
      if (!Array.isArray(claim.namedReferences) || claim.namedReferences.length === 0) errors.push(`${claimAt} must preserve named references`);
      if (!Array.isArray(claim.aliasesChecked) || claim.aliasesChecked.length < 2) errors.push(`${claimAt} must check at least two exact names or aliases`);
      if (!Array.isArray(claim.searches) || claim.searches.length === 0) errors.push(`${claimAt} searches are missing`);

      const tracks = new Set();
      let confirmsMaterialClaim = false;
      for (const [searchIndex, search] of (claim.searches || []).entries()) {
        const searchAt = `${claimAt}.searches[${searchIndex}]`;
        if (!search.track || !search.query) errors.push(`${searchAt} track or exact query is missing`);
        tracks.add(search.track);
        if (!SEARCH_OUTCOMES.has(search.outcome)) errors.push(`${searchAt} has invalid outcome`);
        const checkedAt = timestamp(search.checkedAt);
        if (checkedAt === null) errors.push(`${searchAt} checkedAt is invalid`);
        if (disposedAt !== null && checkedAt !== null && checkedAt > disposedAt) errors.push(`${searchAt} occurs after disposition`);
        if (finalRecheckAt !== null && checkedAt !== null && checkedAt > finalRecheckAt) errors.push(`${searchAt} occurs after the final recheck`);
        if (search.outcome === "FOUND" && (!Array.isArray(search.results) || search.results.length === 0)) {
          errors.push(`${searchAt} FOUND requires exact result URLs`);
        }
        for (const [resultIndex, result] of (search.results || []).entries()) {
          const resultAt = `${searchAt}.results[${resultIndex}]`;
          if (!result.url || !result.publisher || !result.publishedAt) errors.push(`${resultAt} identity is incomplete`);
          if (!RESULT_RELATIONSHIPS.has(result.relationship)) errors.push(`${resultAt} relationship is invalid`);
          if (result.relationship === "CONFIRMS_MATERIAL_CLAIM") confirmsMaterialClaim = true;
        }
      }

      if (signal.sourceLinksState === "EMPTY") {
        for (const required of REQUIRED_EMPTY_SOURCE_TRACKS) {
          if (!tracks.has(required)) errors.push(`${claimAt} empty source trail missing ${required} search`);
        }
      }
      if (confirmsMaterialClaim && !RESOLVED_DISPOSITIONS.has(claim.disposition)) {
        errors.push(`${claimAt} found a material confirmation but remained ${claim.disposition}`);
      }
    }
  }
  return { errors, signals: record.signals.length, claims: claimCount };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const filePath = path.resolve(process.argv[2] || "");
  let record;
  try { record = JSON.parse(fs.readFileSync(filePath, "utf8")); } catch (error) {
    console.error("SOURCE RECONCILIATION CHECK FAIL");
    console.error(`- invalid JSON: ${error.message}`);
    process.exit(1);
  }
  const result = validateSourceReconciliation(record);
  if (result.errors.length) {
    console.error("SOURCE RECONCILIATION CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("SOURCE RECONCILIATION CHECK PASS");
  console.log(`signals=${result.signals} claims=${result.claims}`);
}
