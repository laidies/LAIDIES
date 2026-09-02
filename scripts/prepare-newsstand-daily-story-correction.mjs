#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HASH = /^[a-f0-9]{64}$/;
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => value === null || typeof value !== "object" ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(canonicalJson).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
const fail = message => { throw new Error(`DAILY_STORY_CORRECTION_REJECT: ${message}`); };
const arg = name => process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : null;
const bind = relative => {
  const absolute = path.resolve(ROOT, relative || "");
  const evidenceRoot = path.join(ROOT, "operations/product-stewards/newsstand/evidence") + path.sep;
  if (!absolute.startsWith(evidenceRoot) || !fs.existsSync(absolute)) fail("correction evidence must exist under NewsStand evidence");
  const raw = fs.readFileSync(absolute, "utf8");
  return { path: path.relative(ROOT, absolute), sha256: sha256(raw), value: JSON.parse(raw) };
};
const parseStories = raw => {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA || {}));
};
const projection = issue => ({
  schemaVersion: "daily-private-issue-v1",
  mode: "PRIVATE_DRAFT_ONLY",
  editionDate: issue.editionDate,
  editorialTimeZone: issue.editorialTimeZone,
  disposition: issue.disposition === "quiet" ? "QUIET" : issue.disposition === "service_ready" ? "SERVICE_READY" : "CANDIDATES_PENDING_REVIEW",
  status: issue.disposition === "quiet" ? "PRIVATE_QUIET_DRAFT" : "PRIVATE_REVIEW_DRAFT",
  ...(Object.prototype.hasOwnProperty.call(issue, "frontPaigeStoryId") ? { frontPaigeStoryId: issue.frontPaigeStoryId } : {}),
  ...(Object.prototype.hasOwnProperty.call(issue, "weeklyStoryId") ? { weeklyStoryId: issue.weeklyStoryId } : {}),
  storyIds: issue.storyIds,
  storySnapshots: issue.stories,
  desks: issue.desks,
  sourceIdentity: issue.sourceIdentity,
  canonicalWrite: false,
  deployActionTaken: false
});

export function prepareCorrection({ root = ROOT, date, storyId, evidencePath }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !storyId) fail("--date and --story-id are required");
  const storePath = path.join(root, "content/newsstand-daily-issues.json");
  const storiesPath = path.join(root, "content/newsstand-stories.js");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  const matches = store.issues.filter(issue => issue.editionDate === date);
  if (matches.length !== 1) fail("exactly one dated issue is required");
  const existing = matches[0];
  const index = existing.storyIds.indexOf(storyId);
  if (index < 0 || existing.storyIds.filter(id => id === storyId).length !== 1) fail("story is not uniquely present in the dated issue");
  const storiesRaw = fs.readFileSync(storiesPath, "utf8");
  const canonical = parseStories(storiesRaw).stories?.filter(story => story.id === storyId) || [];
  if (canonical.length !== 1 || canonical[0].edition !== "daily" || !["published", "corrected"].includes(canonical[0].status) || canonical[0].sourceApproval?.status !== "approved") fail("current canonical story is not admitted");
  if (String(canonical[0].publishedAt || "").slice(0, 10) !== date) fail("current story publication date differs from the issue date");
  const evidence = bind(evidencePath);
  if (evidence.value.storyId !== storyId || evidence.value.candidateStatus !== "approved-for-publication" || evidence.value.candidatePath !== "content/newsstand-stories.js") fail("evidence does not admit the current canonical story");
  const predecessorStorySha256 = sha256(canonicalJson(existing.stories[index]));
  const successorStorySha256 = sha256(canonicalJson(canonical[0]));
  if (!HASH.test(existing.envelopeSha256 || "")) fail("issue has no admitted predecessor envelope");
  if (predecessorStorySha256 === successorStorySha256) {
    const prior = existing.sourceIdentity?.storyCorrection;
    if (!prior || prior.storyId !== storyId || prior.successorStorySha256 !== successorStorySha256 ||
        prior.evidence?.path !== evidence.path || prior.evidence?.sha256 !== evidence.sha256 ||
        !HASH.test(existing.admission?.predecessorEnvelopeSha256 || "")) fail("issue has no distinct admitted story correction to project");
    const envelope = projection(existing);
    const raw = `${canonicalJson(envelope)}\n`;
    return { envelope, raw, sha256: sha256(raw), predecessorEnvelopeSha256: existing.admission.predecessorEnvelopeSha256, correctionEvidence: { path: evidence.path, sha256: evidence.sha256 } };
  }
  const sourceIdentity = { ...existing.sourceIdentity, storiesSha256: sha256(storiesRaw) };
  delete sourceIdentity.ordinaryCandidate;
  sourceIdentity.storyCorrection = {
    storyId,
    predecessorStorySha256,
    successorStorySha256,
    evidence: { path: evidence.path, sha256: evidence.sha256 }
  };
  const nextIssue = {
    ...existing,
    stories: existing.stories.map((story, storyIndex) => storyIndex === index ? canonical[0] : story),
    sourceIdentity
  };
  delete nextIssue.envelopeSha256;
  delete nextIssue.admission;
  const envelope = projection(nextIssue);
  const raw = `${canonicalJson(envelope)}\n`;
  return { envelope, raw, sha256: sha256(raw), predecessorEnvelopeSha256: existing.envelopeSha256, correctionEvidence: { path: evidence.path, sha256: evidence.sha256 } };
}

function main() {
  const result = prepareCorrection({ date: arg("--date"), storyId: arg("--story-id"), evidencePath: arg("--evidence") });
  const output = path.resolve(arg("--output") || "");
  const privateRoot = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private") + path.sep;
  if (!output.startsWith(privateRoot)) fail("--output must be a private Daily envelope path");
  if (fs.existsSync(output) && fs.readFileSync(output, "utf8") !== result.raw) fail("refusing to overwrite different private envelope bytes");
  if (!process.argv.includes("--check")) fs.writeFileSync(output, result.raw, { flag: fs.existsSync(output) ? "w" : "wx" });
  console.log(JSON.stringify({ output: path.relative(ROOT, output), envelopeSha256: result.sha256, predecessorEnvelopeSha256: result.predecessorEnvelopeSha256, correctionEvidence: result.correctionEvidence }, null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
