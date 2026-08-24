#!/usr/bin/env node
import fs from "node:fs";

const ALLOWED = new Set([
  "DUPLICATE",
  "QUIET",
  "WATCH",
  "NO_BUILD",
  "QUEUED_WITH_TRIGGER",
  "WORK_ORDER_CREATED"
]);
const REVIEW_REQUIRED = new Set(["WATCH", "QUEUED_WITH_TRIGGER"]);

function isHttps(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function isTimestamp(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function validateDispositionRegistry(registry) {
  const errors = [];
  if (registry?.schemaVersion !== "newsstand-cloud-intake-dispositions.v1") errors.push("schemaVersion must be newsstand-cloud-intake-dispositions.v1");
  if (registry?.owner !== "learning-content-ecosystem") errors.push("owner must be learning-content-ecosystem");
  if (!isTimestamp(registry?.updatedAt)) errors.push("updatedAt must be an ISO timestamp");
  if (registry?.issue?.repository !== "laidies/LAIDIES") errors.push("issue repository must be laidies/LAIDIES");
  if (!Number.isInteger(registry?.issue?.number) || registry.issue.number < 1) errors.push("issue number must be a positive integer");
  if (!isHttps(registry?.issue?.url)) errors.push("issue url must use HTTPS");
  for (const flag of ["draftActionTaken", "publicationActionTaken", "canonicalWrite", "deploymentActionTaken"]) {
    if (registry?.[flag] !== false) errors.push(`${flag} must be false`);
  }

  const seen = new Set();
  if (!Array.isArray(registry?.signals) || registry.signals.length === 0) errors.push("signals must contain at least one disposition");
  for (const [index, signal] of (registry?.signals || []).entries()) {
    const at = `signals[${index}]`;
    if (!/^NSCI-[a-f0-9]{20}$/.test(signal?.signalId || "")) errors.push(`${at}.signalId is invalid`);
    if (seen.has(signal?.signalId)) errors.push(`${at}.signalId is duplicated`);
    seen.add(signal?.signalId);
    for (const field of ["sourceId", "title", "ownerProductId", "reason", "nextTrigger"]) {
      if (typeof signal?.[field] !== "string" || !signal[field].trim()) errors.push(`${at}.${field} is required`);
    }
    if (!isHttps(signal?.sourceUrl)) errors.push(`${at}.sourceUrl must use HTTPS`);
    if (!(signal?.publishedAt === null || isTimestamp(signal?.publishedAt))) errors.push(`${at}.publishedAt must be null or an ISO timestamp`);
    if (signal?.publishedAt === null && !isTimestamp(signal?.observedAt)) errors.push(`${at}.observedAt is required when publishedAt is unknown`);
    if (signal?.publishedAt === null && !["WATCH", "NO_BUILD"].includes(signal?.disposition)) errors.push(`${at}.unknown publication date is allowed only for WATCH or NO_BUILD`);
    if (!isTimestamp(signal?.decidedAt)) errors.push(`${at}.decidedAt must be an ISO timestamp`);
    if (!ALLOWED.has(signal?.disposition)) errors.push(`${at}.disposition is invalid`);
    if (!Array.isArray(signal?.evidenceRefs) || signal.evidenceRefs.length === 0) errors.push(`${at}.evidenceRefs must not be empty`);
    if (!Array.isArray(signal?.relatedRecords)) errors.push(`${at}.relatedRecords must be an array`);
    if (REVIEW_REQUIRED.has(signal?.disposition) && !isDate(signal?.reviewBy)) errors.push(`${at}.reviewBy is required for ${signal?.disposition}`);
    if (!REVIEW_REQUIRED.has(signal?.disposition) && signal?.reviewBy !== null && !isDate(signal?.reviewBy)) errors.push(`${at}.reviewBy must be null or YYYY-MM-DD`);
  }

  if (!Array.isArray(registry?.sourceHealth)) errors.push("sourceHealth must be an array");
  for (const [index, source] of (registry?.sourceHealth || []).entries()) {
    const at = `sourceHealth[${index}]`;
    for (const field of ["sourceId", "alertMarker", "state", "disposition", "nextAction"]) {
      if (typeof source?.[field] !== "string" || !source[field].trim()) errors.push(`${at}.${field} is required`);
    }
    if (!isHttps(source?.url)) errors.push(`${at}.url must use HTTPS`);
    if (!isTimestamp(source?.observedAt)) errors.push(`${at}.observedAt must be an ISO timestamp`);
    if (!isDate(source?.reviewBy)) errors.push(`${at}.reviewBy must be YYYY-MM-DD`);
  }
  return { ok: errors.length === 0, errors };
}

async function main() {
  const file = process.argv[2] || new URL("../operations/product-stewards/newsstand/cloud-intake-dispositions.json", import.meta.url);
  const registry = JSON.parse(fs.readFileSync(file, "utf8"));
  const result = validateDispositionRegistry(registry);
  if (!result.ok) {
    console.error("NEWSSTAND CLOUD INTAKE DISPOSITIONS FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`NEWSSTAND CLOUD INTAKE DISPOSITIONS PASS signals=${registry.signals.length} source_health=${registry.sourceHealth.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
