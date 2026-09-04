#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultRoster = path.join(root, "operations", "agents", "aidb-intelligence-desk", "sources", "practitioner-source-roster.json");
const DAY_MS = 86400000;

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function daysBetween(from, to) {
  return Math.floor((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);
}

export function inspectSourceBank(roster, asOf) {
  const errors = [];
  const sources = [];
  if (roster?.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  if (roster?.recurringAuthority !== true) errors.push("recurringAuthority must be true");
  if (!Array.isArray(roster?.sources) || !roster.sources.length) errors.push("sources must be a non-empty array");
  const ids = new Set();
  for (const source of roster?.sources || []) {
    if (!/^SRC-[A-Z0-9-]+$/.test(source?.id || "")) errors.push(`invalid source id: ${source?.id || "(missing)"}`);
    if (ids.has(source?.id)) errors.push(`duplicate source id: ${source.id}`);
    ids.add(source?.id);
    if (!isDate(source?.verifiedAt)) errors.push(`${source?.id || "(missing)"}: invalid verifiedAt`);
    if (!isDate(source?.expiresAt)) errors.push(`${source?.id || "(missing)"}: invalid expiresAt`);
    if (isDate(source?.verifiedAt) && source.verifiedAt > asOf) errors.push(`${source.id}: verifiedAt is in the future`);
    let url;
    try { url = new URL(source?.channelUrl); } catch { errors.push(`${source?.id || "(missing)"}: invalid channelUrl`); }
    if (url && url.protocol !== "https:") errors.push(`${source.id}: channelUrl must use https`);
    if (!source?.tier) errors.push(`${source?.id || "(missing)"}: tier is required`);
    if (!source?.promotionStatus) errors.push(`${source?.id || "(missing)"}: promotionStatus is required`);
    const daysUntilReview = isDate(source?.expiresAt) ? daysBetween(asOf, source.expiresAt) : null;
    sources.push({
      id: source?.id,
      identity: source?.identity,
      channelUrl: source?.channelUrl,
      tier: source?.tier,
      promotionStatus: source?.promotionStatus,
      verifiedAt: source?.verifiedAt,
      expiresAt: source?.expiresAt,
      daysUntilReview,
      state: daysUntilReview === null ? "INVALID" : daysUntilReview < 0 ? "EXPIRED" : daysUntilReview <= 7 ? "DUE" : "CURRENT"
    });
  }
  return { asOf, errors, sources };
}

export async function checkAccessibility(records, fetchImpl = fetch) {
  return Promise.all(records.map(async record => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetchImpl(record.channelUrl, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "LAiDIES trusted-source freshness checker/1.0" }
      });
      await response.body?.cancel();
      return { ...record, accessible: response.ok, httpStatus: response.status, finalUrl: response.url || record.channelUrl };
    } catch (error) {
      return { ...record, accessible: false, httpStatus: null, accessibilityError: error?.name === "AbortError" ? "timeout" : "request_failed" };
    } finally {
      clearTimeout(timer);
    }
  }));
}

export function renderBankReport(result) {
  const expired = result.sources.filter(source => source.state === "EXPIRED");
  const due = result.sources.filter(source => source.state === "DUE");
  const inaccessible = result.sources.filter(source => source.accessible === false);
  const lines = [
    `# Miss Jeeves trusted-resource bank check — ${result.asOf}`,
    "",
    `- Schema errors: ${result.errors.length}`,
    `- Expired: ${expired.length}`,
    `- Due within seven days: ${due.length}`,
    `- Accessibility failures: ${inaccessible.length}`,
    "",
    "A reachable page is not automatically renewed. Review the exact source, its authority and its current subject fit before changing `verifiedAt` or `expiresAt`.",
    "",
    "| Source | Role | Review state | Review deadline | Accessibility |",
    "| --- | --- | --- | --- | --- |"
  ];
  for (const source of result.sources) {
    const access = source.accessible === undefined ? "not checked" : source.accessible ? `HTTP ${source.httpStatus}` : source.accessibilityError || `HTTP ${source.httpStatus}`;
    lines.push(`| ${source.identity || source.id} | ${source.tier || "missing"} | ${source.state} | ${source.expiresAt || "missing"} | ${access} |`);
  }
  if (result.errors.length) lines.push("", "## Schema errors", "", ...result.errors.map(error => `- ${error}`));
  return `${lines.join("\n")}\n`;
}

function parseArgs(argv) {
  const args = { roster: defaultRoster, asOf: new Date().toISOString().slice(0, 10), network: false, strict: false, json: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--roster") args.roster = path.resolve(argv[++i]);
    else if (argv[i] === "--as-of") args.asOf = argv[++i];
    else if (argv[i] === "--network") args.network = true;
    else if (argv[i] === "--strict") args.strict = true;
    else if (argv[i] === "--json") args.json = path.resolve(argv[++i]);
    else throw new Error(`unknown argument: ${argv[i]}`);
  }
  if (!isDate(args.asOf)) throw new Error("--as-of must be YYYY-MM-DD");
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let result = inspectSourceBank(JSON.parse(fs.readFileSync(args.roster, "utf8")), args.asOf);
  if (args.network) result = { ...result, sources: await checkAccessibility(result.sources) };
  const expired = result.sources.some(source => source.state === "EXPIRED");
  const reviewDue = result.sources.some(source => source.state === "DUE");
  const inaccessible = result.sources.some(source => source.accessible === false);
  result.status = result.errors.length || expired || inaccessible ? "HOLD" : reviewDue ? "REVIEW_DUE" : "PASS";
  if (args.json) fs.writeFileSync(args.json, `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(renderBankReport(result));
  if (result.errors.length) process.exitCode = 1;
  else if (args.strict && result.status !== "PASS") process.exitCode = 2;
}

if (pathToFileURL(process.argv[1] || "").href === import.meta.url) await main();
