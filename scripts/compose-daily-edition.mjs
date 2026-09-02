#!/usr/bin/env node

// Deterministic private Daily issue composer. It assembles exact same-date
// admitted inputs and governed empty desks; it cannot mutate public content.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { careerLaneErrors } from "./newsstand-career-lane.mjs";
import { fileURLToPath } from "node:url";
import { loadOrdinaryStoryCandidate, vancouverDay } from "./validate-newsstand-ordinary-story-candidate.mjs";
import { loadServicePredecessor, carryIdentity, serviceEligible, validateServiceSelection } from "./newsstand-service-continuity.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const LEGACY_TYPES = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
const CURRENT_TYPES = ["paige_tip", "career_life", "concept_week", "mme_claio", "dear_miss_jeeves", "behind_build", "around_town", "whats_new_sunnyvaile", "crossword", "song", "did_you_know", "town_note", "curiosity"];
const typesForDate = (date) => date >= "2026-08-23" ? CURRENT_TYPES : LEGACY_TYPES;
const PUBLIC = new Set(["APPROVED", "PUBLISHED", "CORRECTED"]);
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

export function composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw, candidateBinding = null, servicePredecessor = null, root = ROOT }) {
  if (!DATE.test(date || "")) reject("--date must be YYYY-MM-DD");
  const allowedReceiptPaths = [
    path.join(root, `operations/agents/aidb-intelligence-desk/daily/${date}.md`),
    path.join(root, `operations/product-stewards/newsstand/editorial-intake/${date}.md`)
  ];
  if (!allowedReceiptPaths.includes(path.resolve(radarPath || ""))) reject("receipt must be the exact dated AIDB or NewsStand editorial-intake record");
  if (!radarRaw.includes(date)) reject("editorial receipt does not contain the issue date");
  const dispositions = Array.from(radarRaw.matchAll(/^- \*\*NewsStand:\*\* (.+)$/gm), (match) => match[1].trim());
  if (!dispositions.length && /\*\*Result:\*\*\s+QUIET\b/.test(radarRaw)) dispositions.push("NO NEW HANDOFF. Quiet source cycle.");
  if (!dispositions.length) reject("editorial receipt lacks a structured NewsStand disposition");
  const quietRows = dispositions.filter((value) => /^NO (?:NEW )?HANDOFF\.(?:\s|$)/.test(value));
  if (quietRows.length && quietRows.length !== dispositions.length) reject("editorial receipt contains conflicting NewsStand dispositions");
  const quiet = quietRows.length === dispositions.length;
  const storiesData = parseStories(storiesRaw);
  const columnsData = JSON.parse(columnsRaw);
  const types = typesForDate(date);
  if (!columnsData || columnsData.owner !== "newsstand-daily" || !Array.isArray(columnsData.records)) reject("invalid Daily column authority");

  const sameDateRecords = columnsData.records.filter((record) => record.editionDate === date);
  const slots = new Set();
  for (const record of sameDateRecords) {
    if (!types.includes(record.type)) reject(`invalid desk type ${record.type}`);
    if (slots.has(record.type)) reject(`duplicate desk ${record.type}`);
    slots.add(record.type);
  }
  // Older bank entries remain opportunities, not permission to republish under
  // a new date. A reused service requires its own exactly admitted dated row.
  const eligiblePool = sameDateRecords;
  let eligible = eligiblePool.filter((record) => types.includes(record.type) && serviceEligible(record, date))
    .sort((a, b) => String(b.editionDate).localeCompare(String(a.editionDate)));
  const predecessor = servicePredecessor ? loadServicePredecessor(servicePredecessor, { root, date, storiesRaw, columns: columnsData }) : null;
  for (const record of predecessor?.records || []) {
    if (!eligible.some(item => item.type === record.type)) eligible.push(record);
  }
  for (const record of [...eligible]) {
    const laneErrors = careerLaneErrors(record, date);
    if (laneErrors.length && record.editionDate === date) reject(`${record.id}: ${laneErrors.join('; ')}`);
    if (laneErrors.length) eligible = eligible.filter(item => item.id !== record.id);
  }
  let exactStories = (storiesData.stories || []).filter((story) => story.edition === "daily" &&
    !/^front-paige-/.test(String(story.id || "")) && vancouverDay(story.publishedAt) === date &&
    ["published", "corrected"].includes(story.status) && story.sourceApproval && story.sourceApproval.status === "approved");
  let candidateIdentity = null;
  if (candidateBinding) {
    let validated; try { validated = loadOrdinaryStoryCandidate(candidateBinding, { root, date }); } catch (error) { reject(error.message); }
    if (validated.publicationBaseRaw !== storiesRaw) reject("ordinary candidate publication base differs from current canonical source");
    if (storiesData.stories.some(story => story.id === validated.story.id || story.slug === validated.story.slug)) reject("ordinary candidate duplicates an incumbent ID or slug");
    exactStories.push(validated.story);
    candidateIdentity = { ...candidateBinding, storyId: validated.story.id,
      unpublishedState: { status: validated.story.status, publishedAt: validated.story.publishedAt, sourceApproval: validated.story.sourceApproval } };
  }
  const frontPaigeStory = (storiesData.stories || []).filter((story) => story.edition === "daily" &&
    /^front-paige-/.test(String(story.id || "")) && ["published", "corrected"].includes(story.status) &&
    story.sourceApproval && story.sourceApproval.status === "approved")
    .sort((a, b) => String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")))[0] || null;
  const weeklyPublication = storiesData.publications && storiesData.publications.weekly;
  // Wednesday is a successor-review cadence, not an expiry. Only the explicit
  // canonical Weekly pointer can carry; a newer candidate is not authority.
  const weeklyStory = weeklyPublication?.status === "current" && weeklyPublication.editionDate <= date
    ? (storiesData.stories || []).find((story) => story.id === weeklyPublication.storyId && story.edition === "weekly" &&
      ["published", "corrected"].includes(story.status) && story.sourceApproval?.status === "approved") || null : null;
  if (weeklyPublication?.status === "current" && !weeklyStory) reject("current Weekly lacks an admitted non-future canonical story pointer");
  if (quiet && exactStories.length) reject("quiet editorial disposition conflicts with a same-date published story");

  const desks = types.map((type) => {
    const record = eligible.find((item) => item.type === type);
    return record ? {
      type, state: "ready", recordId: record.id, headline: record.headline,
      summary: record.summary, destination: record.destination || null,
      ...(record.editionDate < date ? { carriedFrom: carryIdentity(predecessor.prior, record) } : {})
    } : {
      type, state: "empty", recordId: null,
      emptyState: columnsData.emptyStates && columnsData.emptyStates[type] || "No admitted item is filed in this desk."
    };
  });
  const envelope = {
    schemaVersion: "daily-private-issue-v1",
    mode: "PRIVATE_DRAFT_ONLY",
    editionDate: date,
    editorialTimeZone: "America/Vancouver",
    disposition: exactStories.length || eligible.length ? "SERVICE_READY" : quiet ? "QUIET" : "CANDIDATES_PENDING_REVIEW",
    status: exactStories.length || eligible.length ? "PRIVATE_REVIEW_DRAFT" : quiet ? "PRIVATE_QUIET_DRAFT" : "PRIVATE_REVIEW_DRAFT",
    frontPaigeStoryId: frontPaigeStory ? frontPaigeStory.id : null,
    weeklyStoryId: weeklyStory ? weeklyStory.id : null,
    storyIds: exactStories.map((story) => story.id),
    storySnapshots: exactStories,
    desks,
    sourceIdentity: {
      radarPath: path.relative(root, radarPath), radarSha256: sha256(radarRaw),
      storiesPath: "content/newsstand-stories.js", storiesSha256: sha256(storiesRaw),
      columnsPath: "content/daily-edition-columns.json", columnsSha256: sha256(columnsRaw), ...(candidateIdentity ? { ordinaryCandidate: candidateIdentity } : {}),
      ...(servicePredecessor ? { servicePredecessor } : {})
    },
    canonicalWrite: false,
    deployActionTaken: false
  };
  validateServiceSelection({ desks, columns: columnsData, date, predecessor, canonicalIssue: storiesData.publications?.daily?.issue });
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
  const candidatePath = argument("--story-candidate", args);
  const predecessorPath = argument("--service-predecessor", args);
  if (!output.startsWith(`${PRIVATE_ROOT}${path.sep}`)) reject("output must remain inside the private Daily issue directory");
  if (!radarPath.startsWith(`${path.join(ROOT, "operations")}${path.sep}`) || !fs.existsSync(radarPath)) reject("editorial receipt must be an existing operations file");
  const radarRaw = fs.readFileSync(radarPath, "utf8");
  const storiesRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8");
  const columnsRaw = fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8");
  const candidateBinding = candidatePath ? { path: path.relative(ROOT, path.resolve(candidatePath)), sha256: sha256(fs.readFileSync(path.resolve(candidatePath))) } : null;
  const servicePredecessor = predecessorPath ? { path: path.relative(ROOT, path.resolve(predecessorPath)), sha256: sha256(fs.readFileSync(path.resolve(predecessorPath))) } : null;
  const result = composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw, candidateBinding, servicePredecessor });
  fs.mkdirSync(path.dirname(output), { recursive: true });
  if (fs.existsSync(output) && fs.readFileSync(output, "utf8") !== result.canonical) reject("private envelope already exists; use a new revision filename rather than overwrite reviewed evidence");
  if (!fs.existsSync(output)) fs.writeFileSync(output, result.canonical, { flag: "wx" });
  console.log(`DAILY EDITION PRIVATE COMPOSER PASS date=${date} disposition=${result.envelope.disposition} stories=${result.envelope.storyIds.length} ready_desks=${result.envelope.desks.filter((desk) => desk.state === "ready").length} sha256=${result.sha256} public_write=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
