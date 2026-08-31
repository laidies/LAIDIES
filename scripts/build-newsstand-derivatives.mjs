#!/usr/bin/env node

// Deterministic public NewsStand feed and archive builder. Both derivatives
// use one eligibility boundary and derive their timestamps from schema-2.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { validatePublicCarry } from "./newsstand-service-continuity.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORY_PATH = path.join(ROOT, "content/newsstand-stories.js");
const COLUMNS_PATH = path.join(ROOT, "content/daily-edition-columns.json");
const ISSUES_PATH = path.join(ROOT, "content/newsstand-daily-issues.json");
const FEED_PATH = path.join(ROOT, "content/newsstand-public-feed.json");
const ARCHIVE_PATH = path.join(ROOT, "content/newsstand-archive-index.json");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const reject = (message) => { throw new Error(`NEWSSTAND_DERIVATIVE_REJECT: ${message}`); };

function loadDataset(raw) {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  if (!context.window.NEWSSTAND_DATA) reject("schema-2 canonical dataset is missing");
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

function sentence(value) {
  const clean = String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const match = clean.match(/^(.+?[.!?])(?:\s|$)/);
  return match ? match[1] : clean;
}

function shorten(value, limit = 280) {
  const clean = String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  return `${clean.slice(0, limit - 1).replace(/\s+\S*$/, "")}…`;
}

function eligibleStory(story) {
  return story && ["published", "corrected", "retracted"].includes(story.status) &&
    story.sourceApproval && story.sourceApproval.status === "approved";
}

function storyFeedItem(story, currentIds) {
  return {
    id: story.id,
    edition: story.edition,
    status: story.status,
    current: story.status !== "retracted" && currentIds.has(story.id),
    publishedAt: story.publishedAt,
    updatedAt: story.updatedAt,
    lastCheckedAt: story.lastCheckedAt,
    headline: story.headline,
    summary: story.status === "retracted" ? "This story has been withdrawn." : shorten(story.front_summary || story.what_this_means || story.laidies_read || story.the_story),
    url: `/newsstand.html#${story.slug}`,
    themes: story.themes || [],
    concepts: story.concepts || [],
    correction: story.correction || null,
    correctionHistory: story.correctionHistory || [],
    retraction: story.retraction || null
  };
}

function storyArchiveItem(story) {
  return {
    id: `story:${story.id}`,
    kind: "story",
    edition: story.edition,
    desk: null,
    editionDate: String(story.publishedAt).slice(0, 10),
    publishedAt: story.publishedAt,
    headline: story.headline,
    summary: story.status === "retracted" ? "This story has been withdrawn." : sentence(story.front_summary || story.laidies_read || story.the_story),
    themes: [...(story.themes || [])].sort(),
    concepts: [...(story.concepts || [])].sort(),
    status: story.status,
    slug: story.slug,
    correction: story.correction || null,
    correctionHistory: story.correctionHistory || [],
    retraction: story.retraction || null,
    predecessorStoryIds: story.predecessorStoryIds || [],
    successorStoryIds: story.successorStoryIds || [],
    relationshipType: story.relationshipType || null,
    bigPicture: story.bigPicture || null
  };
}

export function buildDerivatives({ storyRaw, columns, issues }) {
  const data = loadDataset(storyRaw);
  if (data.schemaVersion !== "2.0.0" || data.datasetStatus !== "published") reject("canonical dataset is not publishable schema-2");
  const currentIds = new Set();
  const dailyIssue = data.publications.daily && data.publications.daily.issue || {};
  [...(dailyIssue.storyIds || []), dailyIssue.frontPaigeStoryId].filter(Boolean).forEach((id) => currentIds.add(id));
  const weekly = data.publications.weekly;
  if (weekly && weekly.status === "current" && weekly.storyId) currentIds.add(weekly.storyId);
  const bigPicture = (data.stories || []).filter((story) => story.edition === "big-picture" && story.status !== "retracted" && eligibleStory(story))
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))[0];
  if (data.publications["big-picture"]?.status === "current" && bigPicture) currentIds.add(bigPicture.id);

  const eligibleStories = (data.stories || []).filter(eligibleStory)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)) || a.id.localeCompare(b.id));
  for (const id of currentIds) {
    if (!eligibleStories.some((story) => story.id === id)) reject(`current story ${id} is not eligible`);
  }
  const feedItems = eligibleStories.map((story) => storyFeedItem(story, currentIds));
  const generatedAt = data.generatedAt;
  const expiresAt = new Date(Date.parse(generatedAt) + 24 * 3600000).toISOString().replace(".000Z", "Z");
  const feed = {
    schemaVersion: "newsstand-public-feed-v1",
    generatedAt,
    expiresAt,
    sourceDatasetSha256: sha256(storyRaw),
    state: "current",
    current: feedItems.filter((item) => item.current),
    archive: feedItems
  };

  const columnsById = new Map((columns.records || []).map((record) => [record.id, record]));
  const serviceItems = [];
  for (const issue of issues.issues || []) {
    if (!issue || issue.status !== "complete" || !issue.admission) continue;
    if (issue.editionDate > data.publications.daily.editionDate) continue;
    for (const recordId of issue.serviceRecordIds || []) {
      const record = columnsById.get(recordId);
      if (!record) reject(`admitted issue ${issue.editionDate} references ineligible service record ${recordId}`);
      if (!["APPROVED", "PUBLISHED", "CORRECTED", "EXPIRED"].includes(record.status)) continue;
      const historicallyBound = record && record.editionDate <= issue.editionDate && record.freshness &&
        record.freshness.expiresAt >= issue.editionDate && issue.admission && issue.admission.decision;
      if (!historicallyBound) {
        reject(`admitted issue ${issue.editionDate} references ineligible service record ${recordId}`);
      }
      const desk = issue.desks?.find(d => d.recordId === recordId && d.state === 'ready');
      if (desk?.carriedFrom) validatePublicCarry(desk, issue, issues, record);
      const original = desk?.carriedFrom ? issues.issues.find(i => i.editionDate === record.editionDate && i.status === 'complete' && i.admission && i.serviceRecordIds.includes(recordId)) : issue;
      if (!original) reject(`carried service ${recordId} has no original publication`);
      serviceItems.push({
        id: `service:${record.id}`,
        kind: "service",
        edition: "daily",
        desk: record.type,
        editionDate: original.editionDate,
        publishedAt: original.admission.reviewedAt,
        headline: record.headline,
        summary: record.summary,
        themes: [...(record.themes || [])].sort(),
        concepts: [...(record.concepts || [])].sort(),
        status: "published",
        slug: null,
        destination: record.destination || null
      });
    }
  }
  const byId = new Map();
  [...eligibleStories.map(storyArchiveItem), ...serviceItems].forEach((item) => {
    const prior = byId.get(item.id);
    if (!prior || item.editionDate > prior.editionDate) byId.set(item.id, item);
  });
  const archive = {
    schemaVersion: "newsstand-archive-v1",
    generatedAt,
    sourceDatasetSha256: sha256(storyRaw),
    items: [...byId.values()].sort((a, b) => b.editionDate.localeCompare(a.editionDate) || a.id.localeCompare(b.id))
  };
  return { feed, archive };
}

function output(value) { return `${JSON.stringify(value, null, 2)}\n`; }
function main() {
  const storyRaw = fs.readFileSync(STORY_PATH, "utf8");
  const columns = JSON.parse(fs.readFileSync(COLUMNS_PATH, "utf8"));
  const issues = JSON.parse(fs.readFileSync(ISSUES_PATH, "utf8"));
  const result = buildDerivatives({ storyRaw, columns, issues });
  const check = process.argv.includes("--check");
  for (const [file, value] of [[FEED_PATH, result.feed], [ARCHIVE_PATH, result.archive]]) {
    const next = output(value);
    if (check) {
      if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== next) reject(`${path.relative(ROOT, file)} is not the deterministic derivative`);
    } else fs.writeFileSync(file, next);
  }
  console.log(`NEWSSTAND DERIVATIVES ${check ? "CHECK" : "BUILD"} PASS current=${result.feed.current.length} archive=${result.archive.items.length} source_sha256=${result.feed.sourceDatasetSha256}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
