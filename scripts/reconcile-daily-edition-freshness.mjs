#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calendarDateInZone, checkDailyEditionColumns } from "./check-daily-edition-columns.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORE_PATH = path.join(ROOT, "content/daily-edition-columns.json");
const PUBLIC = new Set(["APPROVED", "PUBLISHED", "CORRECTED"]);
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function reconcileDailyEditionFreshness(data, { asOf = calendarDateInZone() } = {}) {
  if (!DATE.test(asOf || "")) throw new Error("DAILY_FRESHNESS_REJECT: --as-of must be YYYY-MM-DD");
  const next = structuredClone(data);
  const expiredIds = [];
  for (const record of next.records || []) {
    if (PUBLIC.has(record.status) && record.freshness?.expiresAt < asOf) {
      record.status = "EXPIRED";
      record.publicEligibility = "INELIGIBLE";
      expiredIds.push(record.id);
    }
  }
  if (expiredIds.length) next.updatedAt = asOf;
  const result = checkDailyEditionColumns(next, { root: ROOT, asOf });
  if (result.errors.length) {
    throw new Error(`DAILY_FRESHNESS_REJECT: successor is invalid\n${result.errors.map((error) => `- ${error}`).join("\n")}`);
  }
  return { data: next, expiredIds, changed: expiredIds.length > 0 };
}

function argument(name, args) {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
}

function main() {
  const args = process.argv.slice(2);
  const asOf = argument("--as-of", args) || calendarDateInZone();
  const write = args.includes("--write");
  const current = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  const result = reconcileDailyEditionFreshness(current, { asOf });
  if (write && result.changed) {
    const temporary = `${STORE_PATH}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, `${JSON.stringify(result.data, null, 2)}\n`, { flag: "wx" });
    fs.renameSync(temporary, STORE_PATH);
  }
  console.log(`DAILY FRESHNESS ${write ? "WRITE" : "DRY RUN"} PASS as_of=${asOf} changed=${result.expiredIds.length} expired=${result.expiredIds.join(",") || "none"}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
