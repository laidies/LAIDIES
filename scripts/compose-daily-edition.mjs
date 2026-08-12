#!/usr/bin/env node

// Deterministic private Daily issue composer. It assembles exact same-date
// admitted inputs and governed empty desks; it cannot mutate public content.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const TYPES = ["paige_tip", "promptoscope", "career_life", "dear_miss_jeeves", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
const PUBLIC = new Set(["APPROVED", "PUBLISHED", "CORRECTED"]);
const FALLBACK_EMPTY_STATES = {
  dear_miss_jeeves: "Miss Jeeves is checking the problem, the mechanism and the useful fix. No invented letter has been filed."
};
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const reject = (message) => { throw new Error(`DAILY_EDITION_COMPOSER_REJECT: ${message}`); };

function parseStories(raw) {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  if (!context.window.NEWSSTAND_DATA) reject("canonical NewsStand data is missing");
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

export function composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw }) {
  if (!DATE.test(date || "")) reject("--date must be YYYY-MM-DD");
  const expectedRadarPath = path.join(ROOT, `operations/agents/aidb-intelligence-desk/daily/${date}.md`);
  if (path.resolve(radarPath || "") !== expectedRadarPath) reject("radar receipt must be the authoritative dated AIDB daily record");
  if (!radarRaw.includes(date)) reject("radar receipt does not contain the issue date");
  const dispositions = Array.from(radarRaw.matchAll(/^- \*\*NewsStand:\*\* (.+)$/gm), (match) => match[1].trim());
  if (!dispositions.length) reject("radar receipt lacks a structured NewsStand disposition");
  const quietRows = dispositions.filter((value) => /^NO (?:NEW )?HANDOFF\.(?:\s|$)/.test(value));
  if (quietRows.length && quietRows.length !== dispositions.length) reject("radar receipt contains conflicting NewsStand dispositions");
  const quiet = quietRows.length === dispositions.length;
  const storiesData = parseStories(storiesRaw);
  const columnsData = JSON.parse(columnsRaw);
  if (!columnsData || columnsData.owner !== "newsstand-daily" || !Array.isArray(columnsData.records)) reject("invalid Daily column authority");

  const sameDateRecords = columnsData.records.filter((record) => record.editionDate === date);
  const slots = new Set();
  for (const record of sameDateRecords) {
    if (!TYPES.includes(record.type)) reject(`invalid desk type ${record.type}`);
    if (slots.has(record.type)) reject(`duplicate desk ${record.type}`);
    slots.add(record.type);
  }
  const eligible = sameDateRecords.filter((record) => PUBLIC.has(record.status) &&
    record.publicEligibility === "ELIGIBLE" && record.freshness && record.freshness.expiresAt >= date);
  const exactStories = (storiesData.stories || []).filter((story) => story.edition === "daily" &&
    String(story.publishedAt || "").slice(0, 10) === date && ["published", "corrected"].includes(story.status));
  if (quiet && exactStories.length) reject("quiet radar disposition conflicts with a same-date published story");

  const desks = TYPES.map((type) => {
    const record = eligible.find((item) => item.type === type);
    return record ? {
      type, state: "ready", recordId: record.id, headline: record.headline,
      summary: record.summary, destination: record.destination || null
    } : {
      type, state: "empty", recordId: null,
      emptyState: columnsData.emptyStates && columnsData.emptyStates[type] || FALLBACK_EMPTY_STATES[type] || "No admitted item is filed in this desk."
    };
  });
  const envelope = {
    schemaVersion: "daily-private-issue-v1",
    mode: "PRIVATE_DRAFT_ONLY",
    editionDate: date,
    editorialTimeZone: "America/Vancouver",
    disposition: quiet ? "QUIET" : "CANDIDATES_PENDING_REVIEW",
    status: quiet ? "PRIVATE_QUIET_DRAFT" : "PRIVATE_REVIEW_DRAFT",
    storyIds: exactStories.map((story) => story.id),
    storySnapshots: exactStories,
    desks,
    sourceIdentity: {
      radarPath: path.relative(ROOT, radarPath), radarSha256: sha256(radarRaw),
      storiesPath: "content/newsstand-stories.js", storiesSha256: sha256(storiesRaw),
      columnsPath: "content/daily-edition-columns.json", columnsSha256: sha256(columnsRaw)
    },
    canonicalWrite: false,
    deployActionTaken: false
  };
  return { envelope, canonical: `${canonicalJson(envelope)}\n`, sha256: sha256(`${canonicalJson(envelope)}\n`) };
}

function argument(name, args) {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
}

function main() {
  const args = process.argv.slice(2);
  const date = argument("--date", args);
  const radarPath = path.resolve(argument("--radar", args) || "");
  const output = path.resolve(argument("--output", args) || "");
  if (!output.startsWith(`${PRIVATE_ROOT}${path.sep}`)) reject("output must remain inside the private Daily issue directory");
  if (!radarPath.startsWith(`${path.join(ROOT, "operations")}${path.sep}`) || !fs.existsSync(radarPath)) reject("radar receipt must be an existing operations file");
  const radarRaw = fs.readFileSync(radarPath, "utf8");
  const storiesRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8");
  const columnsRaw = fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8");
  const result = composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw });
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, result.canonical);
  console.log(`DAILY EDITION PRIVATE COMPOSER PASS date=${date} disposition=${result.envelope.disposition} stories=${result.envelope.storyIds.length} ready_desks=${result.envelope.desks.filter((desk) => desk.state === "ready").length} sha256=${result.sha256} public_write=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
