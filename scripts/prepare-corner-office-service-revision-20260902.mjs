#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-09-02";
const recordId = "DAILY-2026-09-02-CAREER-LIFE-CORNER-02-PRIORITIES";
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const writeExact = (relative, bytes) => {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temporary = `${target}.tmp-${process.pid}`;
  fs.writeFileSync(temporary, bytes, { flag: "wx" });
  fs.renameSync(temporary, target);
};

const issues = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-daily-issues.json")));
const issue = issues.issues.filter(item => item.editionDate === date)[0];
if (!issue || issues.issues.filter(item => item.editionDate === date).length !== 1) throw new Error("Exact September 2 issue missing");
const columnsRaw = fs.readFileSync(path.join(root, "content/daily-edition-columns.json"));
const columns = JSON.parse(columnsRaw);
const record = columns.records.find(item => item.id === recordId);
if (!record || record.status !== "APPROVED") throw new Error("Approved Corner Office record missing");
const storiesRaw = fs.readFileSync(path.join(root, "content/newsstand-stories.js"));
const predecessorSource = "operations/product-stewards/newsstand/candidates/anthropic-agentic-incidents-2026-09-02/publication-base.js";
const predecessorRaw = fs.readFileSync(path.join(root, predecessorSource));
if (sha256(predecessorRaw) !== issue.sourceIdentity.storiesSha256) throw new Error("Frozen predecessor does not match the admitted issue source");
const predecessorEvidence = "operations/product-stewards/newsstand/evidence/corner-office-20260902/predecessor-stories.js";
writeExact(predecessorEvidence, predecessorRaw);

const desks = issue.desks.map(desk => desk.type === "career_life" ? {
  type: "career_life",
  state: "ready",
  recordId,
  headline: record.headline,
  summary: record.summary,
  destination: record.destination
} : desk);
const sourceIdentity = {
  radarPath: issue.sourceIdentity.radarPath,
  radarSha256: issue.sourceIdentity.radarSha256,
  storiesPath: issue.sourceIdentity.storiesPath,
  storiesSha256: sha256(storiesRaw),
  columnsPath: issue.sourceIdentity.columnsPath,
  columnsSha256: sha256(columnsRaw)
};
const envelope = {
  schemaVersion: "daily-private-issue-v1",
  mode: "PRIVATE_DRAFT_ONLY",
  editionDate: date,
  editorialTimeZone: issue.editorialTimeZone,
  disposition: "SERVICE_READY",
  status: "PRIVATE_REVIEW_DRAFT",
  storyIds: issue.storyIds,
  storySnapshots: issue.stories,
  desks,
  sourceIdentity,
  canonicalWrite: false,
  deployActionTaken: false,
  frontPaigeStoryId: issue.frontPaigeStoryId,
  weeklyStoryId: issue.weeklyStoryId
};
const envelopeRaw = `${canonicalJson(envelope)}\n`;
const envelopePath = "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-09-02-corner-office-service-revision.json";
writeExact(envelopePath, envelopeRaw);
console.log(JSON.stringify({
  envelopePath,
  envelopeSha256: sha256(envelopeRaw),
  predecessorEnvelopeSha256: issue.envelopeSha256,
  predecessorStories: { path: predecessorEvidence, sha256: sha256(predecessorRaw) },
  addedServiceRecordIds: [recordId]
}, null, 2));
