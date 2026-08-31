#!/usr/bin/env node

// Project an independently admitted Daily snapshot into the existing schema-2
// publication record. This changes local publication data only; never deploys.
import fs from "node:fs";
import { careerLaneErrors } from "./newsstand-career-lane.mjs";
import path from "node:path";
import vm from "node:vm";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { loadOrdinaryStoryCandidate, publishCandidateStory, vancouverDay } from "./validate-newsstand-ordinary-story-candidate.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = path.join(ROOT, "content/newsstand-stories.js");
const STORE_PATH = path.join(ROOT, "content/newsstand-daily-issues.json");
const COLUMNS_PATH = path.join(ROOT, "content/daily-edition-columns.json");
const reject = (message) => { throw new Error(`DAILY_CANONICAL_PUBLICATION_REJECT: ${message}`); };
const stable = (value) => value === null || typeof value !== "object" ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;

export function verifyProjectionAdmission({ issue, envelopeRaw, decision, root = ROOT }) {
  const digest = createHash("sha256").update(envelopeRaw).digest("hex");
  if (digest !== issue.envelopeSha256 || digest !== decision.envelopeSha256 || decision.editionDate !== issue.editionDate) reject("exact envelope admission checksum/date mismatch");
  for (const field of ["decision", "reviewedAt", "reviewedBy", "reviewerRole"]) {
    if (decision[field] !== issue.admission[field]) reject(`admission ${field} changed`);
  }
  const envelope = JSON.parse(envelopeRaw);
  const ordinary = envelope.sourceIdentity.ordinaryCandidate ? loadOrdinaryStoryCandidate(envelope.sourceIdentity.ordinaryCandidate, { root, date: issue.editionDate }) : null;
  if (ordinary && !["daily-issue-admission-v1", "daily-issue-news-revision-admission-v1"].includes(decision.schemaVersion)) reject("ordinary projection requires initial or news-revision admission");
  const expected = {
    editionDate: envelope.editionDate, editorialTimeZone: envelope.editorialTimeZone,
    disposition: envelope.disposition.toLowerCase(), storyIds: envelope.storyIds,
    stories: envelope.storySnapshots.map(story => ordinary?.story.id === story.id ? publishCandidateStory(story, issue.admission.reviewedAt) : story), desks: envelope.desks, sourceIdentity: envelope.sourceIdentity,
    frontPaigeStoryId: envelope.frontPaigeStoryId || null, weeklyStoryId: envelope.weeklyStoryId || null,
    serviceRecordIds: envelope.desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId)
  };
  const actual = Object.fromEntries(Object.keys(expected).map((key) => [key, issue[key] ?? null]));
  if (stable(actual) !== stable(expected)) reject("stored issue differs from exact admitted envelope");
}

export function projectDailyIssue({ dataset, issue, columns, root = ROOT }) {
  if (!dataset || dataset.schemaVersion !== "2.0.0" || dataset.datasetStatus !== "published") reject("schema-2 canonical dataset is required");
  if (!issue || issue.status !== "complete" || !issue.admission ||
      !["ACCEPT_LOCAL_CANONICAL_WRITE", "ACCEPT_LOCAL_CANONICAL_SUCCESSOR"].includes(issue.admission.decision) ||
      !/independent/i.test(issue.admission.reviewedBy || "") || !/^[a-f0-9]{64}$/.test(issue.envelopeSha256 || "")) {
    reject("exact independently admitted Daily issue is required");
  }
  const next = structuredClone(dataset);
  const stories = new Map(next.stories.map((story) => [story.id, story]));
  const isAdmitted = (story) => story && ["published", "corrected"].includes(story.status) && story.sourceApproval?.status === "approved";
  const ordinary = issue.sourceIdentity?.ordinaryCandidate ? loadOrdinaryStoryCandidate(issue.sourceIdentity.ordinaryCandidate, { root, date: issue.editionDate }) : null;
  if (ordinary) {
    const published = publishCandidateStory(ordinary.story, issue.admission.reviewedAt);
    const snapshot = issue.stories.find(story => story.id === published.id);
    if (!issue.storyIds.includes(published.id) || stable(snapshot) !== stable(published)) reject("ordinary candidate differs from its independently admitted snapshot");
    const existing = stories.get(published.id);
    if (existing && stable(existing) !== stable(published)) reject("ordinary publication cannot overwrite an existing story");
    if (next.stories.some(story => story.slug === published.slug && story.id !== published.id)) reject("ordinary publication duplicates an existing slug");
    if (!existing) {
      next.stories.push(published);
      stories.set(published.id, published);
    }
  }
  for (const id of issue.storyIds) {
    const story = stories.get(id);
    if (!isAdmitted(story) || story.edition !== "daily" || vancouverDay(story.publishedAt) !== issue.editionDate || /^front-paige-/.test(id)) {
      reject(`dated Daily story ${id} is not admitted for this issue`);
    }
  }
  if (issue.frontPaigeStoryId && (!isAdmitted(stories.get(issue.frontPaigeStoryId)) || !/^front-paige-/.test(issue.frontPaigeStoryId) || issue.storyIds.includes(issue.frontPaigeStoryId))) {
    reject("persistent Front PAiGE is missing, held or duplicated");
  }
  if (issue.weeklyStoryId && (!isAdmitted(stories.get(issue.weeklyStoryId)) || stories.get(issue.weeklyStoryId).edition !== "weekly")) reject("Weekly continuity is not admitted");
  const weekly = dataset.publications.weekly;
  const currentWeeklyId = weekly?.status === "current" ? weekly.storyId : null;
  if ((issue.weeklyStoryId || null) !== (currentWeeklyId || null) ||
      (weekly?.status === "current" && (!currentWeeklyId || weekly.editionDate > issue.editionDate))) {
    reject("Weekly continuity must preserve the exact current canonical pointer; Daily cannot replace or clear it");
  }
  for (const id of issue.serviceRecordIds) {
    const record = columns.records.find((item) => item.id === id);
    const laneErrors = careerLaneErrors(record, issue.editionDate);
    if (laneErrors.length) reject(`${id}: ${laneErrors.join('; ')}`);
    if (!record || record.editionDate !== issue.editionDate || !["APPROVED", "PUBLISHED", "CORRECTED"].includes(record.status) ||
        record.publicEligibility !== "ELIGIBLE" || !record.freshness || record.freshness.expiresAt < issue.editionDate) {
      reject(`service record ${id} is not exactly admitted for this date`);
    }
  }
  const timestamp = issue.admission.reviewedAt;
  if (!Number.isFinite(Date.parse(timestamp))) reject("admission timestamp is invalid");
  next.generatedAt = timestamp;
  next.lastCheckedAt = timestamp;
  next.publications.daily = {
    ...next.publications.daily,
    editionDate: issue.editionDate,
    editorialTimeZone: issue.editorialTimeZone,
    issue: {
      status: "complete",
      disposition: issue.disposition,
      ...(issue.frontPaigeStoryId ? { frontPaigeStoryId: issue.frontPaigeStoryId } : {}),
      weeklyStoryId: issue.weeklyStoryId || null,
      storyIds: [...issue.storyIds],
      serviceRecordIds: [...issue.serviceRecordIds],
      ...(issue.disposition === "quiet" ? { sourceIdentity: { radarSha256: issue.sourceIdentity.radarSha256 } } : {})
    },
    status: "current",
    publishedAt: timestamp,
    updatedAt: timestamp,
    lastCheckedAt: timestamp,
    note: issue.storyIds.length ? `The Daily for ${issue.editionDate}.` : "No new news story was published today. The latest Front PAiGE and available columns remain below."
  };
  // Daily never edits Weekly identity, status or dates. A separate admitted
  // Weekly successor (or explicit hold/retraction) controls that publication.
  return next;
}

export function projectDailySourceRaw({ raw, issue, columns, root = ROOT }) {
  const ordinary = issue.sourceIdentity?.ordinaryCandidate ? loadOrdinaryStoryCandidate(issue.sourceIdentity.ordinaryCandidate, { root, date: issue.editionDate }) : null;
  const baseRaw = ordinary ? ordinary.publicationBaseRaw : raw;
  if (ordinary && createHash("sha256").update(baseRaw).digest("hex") !== issue.sourceIdentity.storiesSha256) reject("ordinary frozen publication base differs from admitted source");
  const context = { window: {} };
  vm.runInNewContext(baseRaw, context, { timeout: 1000 });
  const next = projectDailyIssue({ dataset: context.window.NEWSSTAND_DATA, issue, columns, root });
  const start = baseRaw.indexOf("window.NEWSSTAND_DATA = ");
  const end = baseRaw.indexOf("\n};", start);
  if (start < 0 || end < 0) reject("canonical dataset assignment boundary is missing");
  const nextRaw = baseRaw.slice(0, start) + `window.NEWSSTAND_DATA = ${JSON.stringify(next, null, 2)};` + baseRaw.slice(end + 3);
  if (ordinary && raw !== baseRaw && raw !== nextRaw) reject("ordinary publication base changed after review; retry is not exact projected output");
  return nextRaw;
}

function main() {
  const arg = name => process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : null;
  const index = process.argv.indexOf("--date");
  const date = index >= 0 ? process.argv[index + 1] : null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) reject("--date YYYY-MM-DD is required");
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const store = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  const matches = store.issues.filter((issue) => issue.editionDate === date);
  if (matches.length !== 1) reject("exactly one admitted dated issue is required");
  const envelopePath = path.resolve(arg("--envelope") || path.join(ROOT, `operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/${date}.json`));
  const decisionPath = path.resolve(arg("--decision") || path.join(ROOT, `operations/product-stewards/newsstand/evidence/daily-issue-admission-${date}.json`));
  if (!envelopePath.startsWith(path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/")) || !decisionPath.startsWith(path.join(ROOT, "operations/product-stewards/newsstand/evidence/"))) reject("projection requires private envelope and NewsStand evidence paths");
  verifyProjectionAdmission({
    issue: matches[0],
    envelopeRaw: fs.readFileSync(envelopePath, "utf8"),
    decision: JSON.parse(fs.readFileSync(decisionPath, "utf8"))
  });
  const columns = JSON.parse(fs.readFileSync(COLUMNS_PATH, "utf8"));
  const nextRaw = projectDailySourceRaw({ raw, issue: matches[0], columns });
  if (process.argv.includes("--check")) {
    if (raw !== nextRaw) reject("schema-2 publication differs from the admitted issue projection");
  } else if (raw !== nextRaw) {
    const temporary = `${DATA_PATH}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, nextRaw, { flag: "wx" });
    fs.renameSync(temporary, DATA_PATH);
  }
  console.log(`DAILY CANONICAL PUBLICATION ${process.argv.includes("--check") ? "CHECK" : "WRITE"} PASS date=${date} stories=${matches[0].storyIds.length} service_records=${matches[0].serviceRecordIds.length} deploy=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
