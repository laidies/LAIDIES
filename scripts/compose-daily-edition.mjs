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
import { selectAidbEdition } from "./select-aidb-edition.mjs";
import { validateNewsstandSourceRoutes } from "./check-practitioner-signal-pilot.mjs";

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
const QUIET_COVERAGE_START = "2026-09-05";
const HASH = /^[a-f0-9]{64}$/;

function parseStories(raw) {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  if (!context.window.NEWSSTAND_DATA) reject("canonical NewsStand data is missing");
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

const coverageVancouverDay = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) return null;
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
};
const exactKeys = (value, keys, label) => {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join("\n") !== [...keys].sort().join("\n")) reject(`${label} keys do not match the contract`);
};
const validDispositionRefs = (refs) => Array.isArray(refs) && refs.every((ref) => typeof ref === "string" && /^(?:story:[a-z0-9]+(?:-[a-z0-9]+)*|terminal:(?:duplicate|false-premise|no-distinct-reader-value|no-longer-relevant):[a-z0-9]+(?:-[a-z0-9]+)*)$/.test(ref));
const readBoundJson = (root, binding, expectedPath, label) => {
  exactKeys(binding, ["path", "sha256"], label);
  if (binding.path !== expectedPath || !HASH.test(binding.sha256 || "")) reject(`${label} binding is invalid`);
  const absolute = path.join(root, binding.path);
  if (!fs.existsSync(absolute)) reject(`${label} file is missing`);
  const raw = fs.readFileSync(absolute, "utf8");
  if (sha256(raw) !== binding.sha256) reject(`${label} bytes changed`);
  try { return { raw, value: JSON.parse(raw) }; } catch { reject(`${label} is not valid JSON`); }
};

// A dated receipt is evidence of recorded source work, not proof that a person
// understood a remote page. Quiet is withheld unless that record is complete.
export function validateDailyQuietCoverage({ date, radarRaw, root = ROOT, now = new Date().toISOString() }) {
  const nowMs = Date.parse(now);
  if (!Number.isFinite(nowMs)) reject("quiet coverage validation time is invalid");
  const fenced = [...radarRaw.matchAll(/```json\s*\n([\s\S]*?)\n```/g)].map((match) => {
    try { return { raw: match[1], value: JSON.parse(match[1]) }; } catch { return null; }
  }).filter(Boolean).filter((block) => block.value?.schemaVersion === "newsstand-daily-coverage-v1");
  if (fenced.length !== 1) reject("quiet receipt requires exactly one newsstand-daily-coverage-v1 JSON block");
  const { raw: coverageRaw, value: coverage } = fenced[0];
  exactKeys(coverage, ["schemaVersion", "asOf", "deskChecks", "aidb"], "quiet coverage");
  if (coverage.asOf !== date || date < QUIET_COVERAGE_START) reject("quiet coverage date is invalid");
  const rosterPath = path.join(root, "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json");
  if (!fs.existsSync(rosterPath)) reject("quiet coverage source roster is missing");
  const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));
  try { validateNewsstandSourceRoutes(roster, date); }
  catch (error) { reject(`quiet coverage source routes failed: ${error.message}`); }
  const routes = roster.newsstandCoverage?.deskRoutes;
  const sources = new Map((roster.sources || []).map((source) => [source.id, source]));
  const canonicalStoriesPath = path.join(root, "content/newsstand-stories.js");
  if (!fs.existsSync(canonicalStoriesPath)) reject("quiet coverage canonical stories are missing");
  const canonicalStories = new Map(parseStories(fs.readFileSync(canonicalStoriesPath, "utf8")).stories.map((story) => [story.id, story]));
  const validRef = (ref) => {
    if (!validDispositionRefs([ref])) return false;
    if (!ref.startsWith("story:")) return true;
    const story = canonicalStories.get(ref.slice("story:".length));
    return Boolean(story && ["published", "corrected"].includes(story.status) && story.sourceApproval?.status === "approved" && Number.isFinite(Date.parse(story.publishedAt)) && Date.parse(story.publishedAt) <= nowMs);
  };
  if (roster.newsstandCoverage?.status !== "BOUNDED_RECURRING_ROUTES" || roster.newsstandCoverage?.researchCompletionCertified !== false || !Array.isArray(routes) || routes.length !== 6) reject("quiet coverage source routes are invalid");
  if (!Array.isArray(coverage.deskChecks) || coverage.deskChecks.length !== routes.length) reject("quiet coverage requires all six desk checks");
  const checks = new Map(coverage.deskChecks.map((check) => [check?.routeId, check]));
  if (checks.size !== routes.length) reject("quiet coverage desk routes are duplicated or missing");
  for (const route of routes) {
    const check = checks.get(route.id);
    exactKeys(check, ["routeId", "readAt", "outcome", "assessmentSummary", "dispositionRefs", "unresolvedCandidateIds", "sourceChecks"], `quiet coverage desk ${route.id}`);
    if (coverageVancouverDay(check.readAt) !== date || Date.parse(check.readAt) > nowMs) reject(`quiet coverage desk ${route.id} was not read on the research date`);
    if (!['NO_MATERIAL_CHANGE', 'NO_UNCOVERED_MATERIAL_STORY'].includes(check.outcome) || typeof check.assessmentSummary !== "string" || !check.assessmentSummary.trim() || !validDispositionRefs(check.dispositionRefs) || !check.dispositionRefs.every(validRef) || !Array.isArray(check.unresolvedCandidateIds) || check.unresolvedCandidateIds.length || (check.outcome === 'NO_UNCOVERED_MATERIAL_STORY' && !check.dispositionRefs.length)) reject(`quiet coverage desk ${route.id} has unresolved work`);
    if (!Array.isArray(check.sourceChecks) || check.sourceChecks.length !== route.sourceIds.length) reject(`quiet coverage desk ${route.id} source checks are incomplete`);
    const sourceChecks = new Map(check.sourceChecks.map((sourceCheck) => [sourceCheck?.sourceId, sourceCheck]));
    if (sourceChecks.size !== route.sourceIds.length) reject(`quiet coverage desk ${route.id} source checks are duplicated or missing`);
    for (const sourceId of route.sourceIds) {
      const source = sources.get(sourceId);
      const sourceCheck = sourceChecks.get(sourceId);
      exactKeys(sourceCheck, ["sourceId", "url", "readAt", "outcome", "assessmentSummary", "dispositionRefs"], `quiet coverage source ${sourceId}`);
      if (!source || sourceCheck.url !== source.channelUrl || coverageVancouverDay(sourceCheck.readAt) !== date || Date.parse(sourceCheck.readAt) > nowMs || !['NO_MATERIAL_CHANGE', 'NO_UNCOVERED_MATERIAL_STORY'].includes(sourceCheck.outcome) || typeof sourceCheck.assessmentSummary !== "string" || !sourceCheck.assessmentSummary.trim() || !validDispositionRefs(sourceCheck.dispositionRefs) || !sourceCheck.dispositionRefs.every(validRef) || (sourceCheck.outcome === 'NO_UNCOVERED_MATERIAL_STORY' && !sourceCheck.dispositionRefs.length)) reject(`quiet coverage source ${sourceId} is not a dated assessment`);
    }
  }
  exactKeys(coverage.aidb, ["inventory", "cursor"], "quiet coverage AIDB");
  const inventoryPath = `operations/agents/aidb-intelligence-desk/daily/${date}-aidb-inventory.json`;
  const cursorPath = "operations/agents/aidb-intelligence-desk/edition-cursor.json";
  const inventory = readBoundJson(root, coverage.aidb.inventory, inventoryPath, "quiet coverage AIDB inventory");
  const cursor = readBoundJson(root, coverage.aidb.cursor, cursorPath, "quiet coverage AIDB cursor");
  let aidbSelection;
  try { aidbSelection = selectAidbEdition(inventory.value, cursor.value, date); }
  catch (error) { reject(`quiet coverage AIDB selection failed: ${error.message}`); }
  if (!aidbSelection.quietAllowed || aidbSelection.status !== "QUIET_NO_NEW_COMPLETE_AIDB_EDITION") reject(`quiet coverage AIDB is ${aidbSelection.status}`);
  return {
    schemaVersion: coverage.schemaVersion,
    coverageSha256: sha256(coverageRaw),
    inventoryPath: coverage.aidb.inventory.path,
    inventorySha256: coverage.aidb.inventory.sha256,
    cursorPath: coverage.aidb.cursor.path,
    cursorSha256: coverage.aidb.cursor.sha256,
    aidbStatus: "QUIET_NO_NEW_COMPLETE_AIDB_EDITION"
  };
}

export function composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw, candidateBinding = null, servicePredecessor = null, root = ROOT, now = new Date().toISOString() }) {
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
  const issueStorePath = path.join(root, "content/newsstand-daily-issues.json");
  const issueStore = fs.existsSync(issueStorePath) ? JSON.parse(fs.readFileSync(issueStorePath, "utf8")) : { issues: [] };
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

  const existingSameDateIssue = candidateBinding && storiesData.publications?.daily?.editionDate === date
    ? (issueStore.issues || []).find(issue => issue.editionDate === date && issue.status === "complete") || null
    : null;
  if (existingSameDateIssue) {
    const currentIssue = storiesData.publications.daily.issue;
    if (currentIssue?.status !== "complete" || canonicalJson(currentIssue.serviceRecordIds || []) !== canonicalJson(existingSameDateIssue.serviceRecordIds || []) ||
        canonicalJson(currentIssue.storyIds || []) !== canonicalJson(existingSameDateIssue.storyIds || []) ||
        existingSameDateIssue.frontPaigeStoryId !== (frontPaigeStory?.id || null) || existingSameDateIssue.weeklyStoryId !== (weeklyStory?.id || null)) {
      reject("same-date news revision does not match the exact current issue");
    }
  }
  const desks = existingSameDateIssue ? types.map((type) => {
    const priorDesk = existingSameDateIssue.desks.find(desk => desk.type === type);
    if (!priorDesk) reject(`same-date predecessor is missing desk ${type}`);
    if (priorDesk.state === "ready") {
      const record = columnsData.records.find(item => item.id === priorDesk.recordId);
      if (!record || !serviceEligible(record, date) || record.type !== type || record.headline !== priorDesk.headline ||
          record.summary !== priorDesk.summary || (record.destination || null) !== priorDesk.destination) reject(`same-date predecessor desk ${type} changed`);
    }
    return structuredClone(priorDesk);
  }) : types.map((type) => {
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
  const quietIssue = quiet && !exactStories.length && !eligible.length;
  const dailyCoverage = quietIssue && date >= QUIET_COVERAGE_START ? validateDailyQuietCoverage({ date, radarRaw, root, now }) : null;
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
      columnsPath: "content/daily-edition-columns.json", columnsSha256: sha256(columnsRaw), ...(dailyCoverage ? { dailyCoverage } : {}), ...(candidateIdentity ? { ordinaryCandidate: candidateIdentity } : {}),
      ...(servicePredecessor ? { servicePredecessor } : {})
    },
    canonicalWrite: false,
    deployActionTaken: false
  };
  validateServiceSelection({ desks, columns: columnsData, date, predecessor, canonicalIssue: storiesData.publications?.daily?.issue, sameDateNewsAppend: Boolean(existingSameDateIssue) });
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
