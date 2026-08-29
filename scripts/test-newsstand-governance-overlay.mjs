#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storyPath = path.join(ROOT, "content", "newsstand-stories.js");
const catchupPath = path.join(ROOT, "content", "site", "newsstand-catchup-v1.js");
const feedPath = path.join(ROOT, "content", "newsstand-public-feed.json");
const archivePath = path.join(ROOT, "content", "newsstand-archive-index.json");
const heldIds = new Set([
  "openai-frontier-training-pause-2026-08-18",
  "weekly-accountable-systems-2026-08-24"
]);

function errorsFor(catchupSource) {
  const errors = [];
  const context = { window: {} };
  const storySource = fs.readFileSync(storyPath, "utf8");
  vm.runInNewContext(storySource, context, { filename: storyPath });
  const data = context.window.NEWSSTAND_DATA;
  const stories = new Map(data.stories.map((story) => [story.id, story]));
  for (const id of heldIds) {
    const story = stories.get(id);
    if (story?.status !== "hold" || story?.sourceApproval?.status !== "independent-review-required") {
      errors.push(`${id} is not held`);
    }
  }
  if (data.publications.daily.issue.storyIds.some((id) => heldIds.has(id))) errors.push("held Daily story remains in current issue ids");
  if (!/function currentCanonicalStory\(snapshot\)/.test(catchupSource)) errors.push("canonical snapshot resolver missing");
  if ((catchupSource.match(/\.map\(currentCanonicalStory\)/g) || []).length !== 2) errors.push("not every historical snapshot path applies current governance");

  const feed = JSON.parse(fs.readFileSync(feedPath, "utf8"));
  const archive = JSON.parse(fs.readFileSync(archivePath, "utf8"));
  if ([...(feed.current || []), ...(feed.archive || [])].some((item) => heldIds.has(item.id))) errors.push("held story remains in public feed");
  if ((archive.items || []).some((item) => heldIds.has(String(item.id || "").replace(/^story:/, "")))) errors.push("held story remains in archive index");
  const storyHash = crypto.createHash("sha256").update(fs.readFileSync(storyPath)).digest("hex");
  if (feed.sourceDatasetSha256 !== storyHash) errors.push("public feed source hash is stale");
  return errors;
}

let catchupSource = fs.readFileSync(catchupPath, "utf8");
if (process.argv.includes("--calibrate")) {
  catchupSource = catchupSource.replace("return (issue.stories || []).map(currentCanonicalStory);", "return JSON.parse(JSON.stringify(issue.stories || []));");
  assert.ok(errorsFor(catchupSource).includes("not every historical snapshot path applies current governance"));
  console.log("NEWSSTAND GOVERNANCE CALIBRATION PASS known-bad historical snapshot bypass rejected");
} else {
  assert.deepEqual(errorsFor(catchupSource), []);
  console.log("NEWSSTAND GOVERNANCE PASS held stories fail closed across canonical, Catch Me Up, feed and archive paths");
}
