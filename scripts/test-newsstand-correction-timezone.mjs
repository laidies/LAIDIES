#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { prepareCorrection, editorialDate } from "./prepare-newsstand-daily-story-correction.mjs";

const root = path.resolve(import.meta.dirname, "..");
const id = "openai-gpt-6-astra-launch-2026-09-04";
const evidencePath = "operations/product-stewards/newsstand/evidence/stories/openai-gpt-6-astra-launch-2026-09-04-reader-fit.json";
const parseStories = raw => {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  return context.window.NEWSSTAND_DATA;
};

// Calibration: the former UTC slice rejects a story that belongs to September 6 in Vancouver.
assert.notEqual("2026-09-07T02:40:49Z".slice(0, 10), "2026-09-06", "the retired UTC-slice check must expose its false rejection");
assert.equal(editorialDate("2026-09-07T02:40:49Z", "America/Vancouver"), "2026-09-06");
assert.equal(editorialDate("2026-11-01T08:30:00Z", "America/Vancouver"), "2026-11-01", "DST fall-back morning retains its Vancouver date");
assert.equal(editorialDate("2026-03-08T07:30:00Z", "America/Vancouver"), "2026-03-07", "DST spring-forward eve is still the preceding Vancouver date");
assert.throws(() => editorialDate("not-a-timestamp", "America/Vancouver"), /publication timestamp is invalid/);
assert.throws(() => editorialDate("2026-09-07T02:40:49Z", "Mars/Olympus"), /editorial time zone is invalid/);

function fixture({ publishedAt, issueDate = "2026-09-06", timeZone = "America/Vancouver" }) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-correction-timezone-"));
  const content = path.join(temporary, "content");
  fs.mkdirSync(content, { recursive: true });
  const data = parseStories(fs.readFileSync(path.join(root, "content/newsstand-stories.js"), "utf8"));
  const story = structuredClone(data.stories.find(item => item.id === id));
  story.publishedAt = publishedAt;
  data.stories[data.stories.findIndex(item => item.id === id)] = story;
  fs.writeFileSync(path.join(content, "newsstand-stories.js"), `window.NEWSSTAND_DATA = ${JSON.stringify(data)};`);
  const issue = {
    editionDate: issueDate,
    editorialTimeZone: timeZone,
    storyIds: [id],
    stories: [structuredClone(story)],
    envelopeSha256: "a".repeat(64),
    sourceIdentity: {}
  };
  // Make the predecessor distinct so the return proves normal correction projection, not the idempotent branch.
  issue.stories[0].headline = "Prior snapshot headline";
  fs.writeFileSync(path.join(content, "newsstand-daily-issues.json"), JSON.stringify({ issues: [issue] }));
  return temporary;
}

let temp = fixture({ publishedAt: "2026-09-07T02:40:49Z" });
try {
  const result = prepareCorrection({ root: temp, date: "2026-09-06", storyId: id, evidencePath });
  assert.equal(result.envelope.editionDate, "2026-09-06", "the Vancouver September 6 correction is admitted");
  assert.equal(result.envelope.storySnapshots[0].publishedAt, "2026-09-07T02:40:49Z", "the original instant is preserved");
} finally { fs.rmSync(temp, { recursive: true, force: true }); }

temp = fixture({ publishedAt: "2026-09-07T07:30:00Z" }); // 00:30 September 7 in Vancouver
try {
  assert.throws(() => prepareCorrection({ root: temp, date: "2026-09-06", storyId: id, evidencePath }), /publication date differs from the issue date/, "a true next Vancouver day is rejected");
} finally { fs.rmSync(temp, { recursive: true, force: true }); }

temp = fixture({ publishedAt: "2026-09-07T02:40:49Z", timeZone: "Mars/Olympus" });
try {
  assert.throws(() => prepareCorrection({ root: temp, date: "2026-09-06", storyId: id, evidencePath }), /editorial time zone is invalid/, "invalid issue time zone is rejected");
} finally { fs.rmSync(temp, { recursive: true, force: true }); }

console.log("NEWSSTAND CORRECTION TIMEZONE TEST PASS incumbent_utc_slice_rejected=1 vancouver_same_day_admitted=1 next_local_day_rejected=1 invalid_timestamp_rejected=1 invalid_timezone_rejected=1 dst_boundaries_checked=2");
