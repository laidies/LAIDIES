#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HASH = /^[a-f0-9]{64}$/;
const day = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const httpsUrl = value => {
  try { return typeof value === "string" && new URL(value).protocol === "https:" && !/\s/.test(value); }
  catch { return false; }
};
const vancouverDay = value => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !day(value.slice(0, 10)) || !Number.isFinite(Date.parse(value))) return null;
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
};

// This checks the recorded discovery work, not the truth or completeness of a feed.
// A channel failure must remain visible even if another channel yields useful work.
function coverageGaps(inventory, editions, asOf) {
  if (Array.isArray(inventory)) return ["Legacy inventory has no website/podcast reconciliation"];
  if (inventory.schema !== "aidb-edition-inventory.v2" || !Array.isArray(inventory.channelChecks)) throw new Error("inventory requires aidb-edition-inventory.v2 and channelChecks");
  const gaps = [];
  const knownUrls = new Set(editions.flatMap(item => [item.url, ...(item.alsoPublishedAt || [])]));
  for (const channel of ["website", "podcast"]) {
    const checks = inventory.channelChecks.filter(check => check?.channel === channel);
    if (checks.length !== 1) { gaps.push(`${channel}: exactly one channel check is required`); continue; }
    const check = checks[0];
    if (check.status !== "CHECKED") gaps.push(`${channel}: ${check.status || "not checked"}`);
    if (!httpsUrl(check.url)) gaps.push(`${channel}: missing source URL`);
    if (vancouverDay(check.checkedAt) !== asOf) gaps.push(`${channel}: check must be on the research date in Vancouver`);
    if (!Array.isArray(check.releaseUrls) || check.releaseUrls.some(url => !httpsUrl(url))) {
      gaps.push(`${channel}: releaseUrls must enumerate the observed release URLs`);
    } else {
      for (const url of check.releaseUrls) if (!knownUrls.has(url)) gaps.push(`${channel}: observed release missing from inventory: ${url}`);
    }
  }
  return gaps;
}

export function selectAidbEdition(inventory, cursor, asOf) {
  if (!day(asOf)) throw new Error("asOf must be YYYY-MM-DD");
  const editions = Array.isArray(inventory) ? inventory : inventory?.editions;
  if (!Array.isArray(editions)) throw new Error("inventory must be an array or contain editions");
  const seen = new Set();
  for (const item of editions) {
    if (!item || !day(item.editionDate) || !httpsUrl(item.url) || typeof item.complete !== "boolean") throw new Error("edition requires a valid date, HTTPS URL and boolean complete");
    if (item.complete && (!HASH.test(item.transcriptSha256 || "") || !Number.isInteger(item.itemCount) || item.itemCount < 1)) throw new Error(`complete edition lacks transcript identity: ${item.url}`);
    if (item.alsoPublishedAt !== undefined && (!Array.isArray(item.alsoPublishedAt) || item.alsoPublishedAt.some(url => !httpsUrl(url)) || (item.alsoPublishedAt.length && !httpsUrl(item.identityEvidenceUrl)))) throw new Error(`cross-channel aliases require URLs and identityEvidenceUrl: ${item.url}`);
    for (const url of [item.url, ...(item.alsoPublishedAt || [])]) {
      if (seen.has(url)) throw new Error(`duplicate edition URL; reconcile the episode once: ${url}`);
      seen.add(url);
    }
  }
  const gaps = coverageGaps(inventory, editions, asOf);
  const processed = new Map((cursor?.processedEditions || []).map(item => [`${item.editionDate}|${item.url}`, item]));
  const released = editions.filter(item => item.editionDate <= asOf).sort((a, b) => b.editionDate.localeCompare(a.editionDate));
  const pendingEditions = released.filter(item => !item.complete);
  const state = { pendingEditions, coverageGaps: gaps, quietAllowed: false };
  const eligible = released.filter(item => item.complete);
  for (const item of eligible) {
    const prior = processed.get(`${item.editionDate}|${item.url}`);
    if (!prior) return { status: "PROCESS_NEW_COMPLETE_EDITION", edition: item, ...state };
    if (prior.transcriptSha256 !== item.transcriptSha256 || prior.itemCount !== item.itemCount) return { status: "RECHECK_CHANGED_TRANSCRIPT", edition: item, prior, ...state };
  }
  if (pendingEditions.length) return { status: "HOLD_AIDB_RELEASE_REVIEW", edition: null, ...state };
  if (gaps.length) return { status: "HOLD_AIDB_SOURCE_COVERAGE", edition: null, ...state };
  return { status: "QUIET_NO_NEW_COMPLETE_AIDB_EDITION", edition: null, ...state, quietAllowed: true };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [inventoryPath, cursorPath, asOf] = process.argv.slice(2);
  if (!inventoryPath || !cursorPath || !asOf) throw new Error("Usage: select-aidb-edition.mjs <inventory.json> <cursor.json> <YYYY-MM-DD>");
  console.log(JSON.stringify(selectAidbEdition(JSON.parse(fs.readFileSync(inventoryPath)), JSON.parse(fs.readFileSync(cursorPath)), asOf), null, 2));
}
