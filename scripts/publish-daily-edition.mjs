#!/usr/bin/env node

// Project an independently admitted Daily snapshot into the existing schema-2
// publication record. This changes local publication data only; never deploys.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = path.join(ROOT, "content/newsstand-stories.js");
const STORE_PATH = path.join(ROOT, "content/newsstand-daily-issues.json");
const COLUMNS_PATH = path.join(ROOT, "content/daily-edition-columns.json");
const reject = (message) => { throw new Error(`DAILY_CANONICAL_PUBLICATION_REJECT: ${message}`); };
const stable = (value) => value === null || typeof value !== "object" ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;

export function verifyProjectionAdmission({ issue, envelopeRaw, decision }) {
  const digest = createHash("sha256").update(envelopeRaw).digest("hex");
  if (digest !== issue.envelopeSha256 || digest !== decision.envelopeSha256 || decision.editionDate !== issue.editionDate) reject("exact envelope admission checksum/date mismatch");
  for (const field of ["decision", "reviewedAt", "reviewedBy", "reviewerRole"]) {
    if (decision[field] !== issue.admission[field]) reject(`admission ${field} changed`);
  }
  const envelope = JSON.parse(envelopeRaw);
  const expected = {
    editionDate: envelope.editionDate, editorialTimeZone: envelope.editorialTimeZone,
    disposition: envelope.disposition.toLowerCase(), storyIds: envelope.storyIds,
    stories: envelope.storySnapshots, desks: envelope.desks, sourceIdentity: envelope.sourceIdentity,
    frontPaigeStoryId: envelope.frontPaigeStoryId || null, weeklyStoryId: envelope.weeklyStoryId || null,
    serviceRecordIds: envelope.desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId)
  };
  const actual = Object.fromEntries(Object.keys(expected).map((key) => [key, issue[key] ?? null]));
  if (stable(actual) !== stable(expected)) reject("stored issue differs from exact admitted envelope");
}

export function projectDailyIssue({ dataset, issue, columns }) {
  if (!dataset || dataset.schemaVersion !== "2.0.0" || dataset.datasetStatus !== "published") reject("schema-2 canonical dataset is required");
  if (!issue || issue.status !== "complete" || !issue.admission ||
      !["ACCEPT_LOCAL_CANONICAL_WRITE", "ACCEPT_LOCAL_CANONICAL_SUCCESSOR"].includes(issue.admission.decision) ||
      !/independent/i.test(issue.admission.reviewedBy || "") || !/^[a-f0-9]{64}$/.test(issue.envelopeSha256 || "")) {
    reject("exact independently admitted Daily issue is required");
  }
  const next = structuredClone(dataset);
  const stories = new Map(next.stories.map((story) => [story.id, story]));
  const isAdmitted = (story) => story && ["published", "corrected"].includes(story.status) && story.sourceApproval?.status === "approved";
  for (const id of issue.storyIds) {
    const story = stories.get(id);
    if (!isAdmitted(story) || story.edition !== "daily" || String(story.publishedAt).slice(0, 10) !== issue.editionDate || /^front-paige-/.test(id)) {
      reject(`dated Daily story ${id} is not admitted for this issue`);
    }
  }
  if (issue.frontPaigeStoryId && (!isAdmitted(stories.get(issue.frontPaigeStoryId)) || !/^front-paige-/.test(issue.frontPaigeStoryId) || issue.storyIds.includes(issue.frontPaigeStoryId))) {
    reject("persistent Front PAiGE is missing, held or duplicated");
  }
  if (issue.weeklyStoryId && (!isAdmitted(stories.get(issue.weeklyStoryId)) || stories.get(issue.weeklyStoryId).edition !== "weekly")) reject("Weekly continuity is not admitted");
  for (const id of issue.serviceRecordIds) {
    const record = columns.records.find((item) => item.id === id);
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
  // Weekly is a Wednesday-to-Wednesday publication, not a Daily refill slot.
  // A held or missing Weekly is never elevated merely to populate the page.
  if (!issue.weeklyStoryId) {
    next.publications.weekly = {
      ...next.publications.weekly,
      status: "quiet",
      publishedAt: null,
      updatedAt: timestamp,
      lastCheckedAt: timestamp,
      note: "No Weekly roundup is available for the current Wednesday-to-Wednesday window."
    };
  }
  return next;
}

function main() {
  const index = process.argv.indexOf("--date");
  const date = index >= 0 ? process.argv[index + 1] : null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) reject("--date YYYY-MM-DD is required");
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  const store = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  const matches = store.issues.filter((issue) => issue.editionDate === date);
  if (matches.length !== 1) reject("exactly one admitted dated issue is required");
  verifyProjectionAdmission({
    issue: matches[0],
    envelopeRaw: fs.readFileSync(path.join(ROOT, `operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/${date}.json`), "utf8"),
    decision: JSON.parse(fs.readFileSync(path.join(ROOT, `operations/product-stewards/newsstand/evidence/daily-issue-admission-${date}.json`), "utf8"))
  });
  const columns = JSON.parse(fs.readFileSync(COLUMNS_PATH, "utf8"));
  const next = projectDailyIssue({ dataset: context.window.NEWSSTAND_DATA, issue: matches[0], columns });
  const start = raw.indexOf("window.NEWSSTAND_DATA = ");
  const end = raw.indexOf("\n};", start);
  if (start < 0 || end < 0) reject("canonical dataset assignment boundary is missing");
  const nextRaw = raw.slice(0, start) + `window.NEWSSTAND_DATA = ${JSON.stringify(next, null, 2)};` + raw.slice(end + 3);
  if (process.argv.includes("--check")) {
    if (raw !== nextRaw) reject("schema-2 publication differs from the admitted issue projection");
  } else if (raw !== nextRaw) fs.writeFileSync(DATA_PATH, nextRaw);
  console.log(`DAILY CANONICAL PUBLICATION ${process.argv.includes("--check") ? "CHECK" : "WRITE"} PASS date=${date} stories=${matches[0].storyIds.length} service_records=${matches[0].serviceRecordIds.length} deploy=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
