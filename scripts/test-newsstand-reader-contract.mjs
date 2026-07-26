#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "content", "newsstand-stories.js");
const CONTRACT_FILE = path.join(ROOT, "content", "newsstand-reader-contract.js");
const CASE_FILE = path.join(ROOT, "operations", "test-fixtures", "newsstand-reader", "state-cases.json");
const DRILL_FILE = path.join(ROOT, "operations", "test-fixtures", "newsstand-reader", "correction-retraction-rollback-drill.json");
const NOW = "2026-07-25T20:00:00Z";

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA_FILE, "utf8"), context, { filename: DATA_FILE });
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

function loadContract() {
  const context = { module: { exports: {} }, exports: {}, window: undefined };
  vm.runInNewContext(fs.readFileSync(CONTRACT_FILE, "utf8"), context, { filename: CONTRACT_FILE });
  return context.module.exports;
}

function mutate(base, mutation) {
  if (mutation === "missing-dataset") return null;
  const data = JSON.parse(JSON.stringify(base));
  if (mutation === "empty-stories") data.stories = [];
  if (mutation === "dataset-hold") data.datasetStatus = "hold";
  if (mutation === "publication-unavailable") data.publications.tribune.status = "unavailable";
  if (mutation === "mixed-current-and-stale") {
    data.publications.tribune.lastCheckedAt = "2026-06-01T00:00:00Z";
    data.publications.daily.status = "current";
    data.publications.daily.publishedAt = "2026-07-25T17:00:00Z";
  }
  if (mutation === "stale-publications") {
    Object.values(data.publications).forEach((publication) => {
      publication.lastCheckedAt = "2026-06-01T00:00:00Z";
    });
  }
  if (mutation === "story-hold") {
    data.stories[1].status = "hold";
    data.stories[1].sourceApproval.status = "independent-review-required";
  }
  if (mutation === "story-corrected") {
    data.stories[1].status = "corrected";
    data.stories[1].correction = {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: "/operations/test-fixtures/newsstand-reader/evidence/correction-label-truth-2026-07-25.json"
    };
  }
  if (mutation === "story-retracted") {
    data.stories[1].status = "retracted";
    data.stories[1].retraction = {
      retractedAt: "2026-07-25T18:00:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor",
      record: "/operations/test-fixtures/newsstand-reader/evidence/retraction-label-truth-2026-07-25.json"
    };
  }
  return data;
}

const contract = loadContract();
const base = loadData();
const cases = JSON.parse(fs.readFileSync(CASE_FILE, "utf8"));
const drill = JSON.parse(fs.readFileSync(DRILL_FILE, "utf8"));

assert.deepEqual(Array.from(contract.EDITIONS), ["breaking", "daily", "weekly", "tribune"]);
assert.equal(contract.validate(base).length, 0);
assert.equal(contract.visibleStories(base, "weekly", NOW).length, 0, "held Weekly story must fail closed");
assert.equal(contract.visibleStories(base, "tribune", NOW).length, 1);

for (const fixture of cases) {
  const candidate = mutate(base, fixture.mutation);
  const datasetState = contract.datasetState(candidate, NOW);
  if (fixture.expectedDatasetState) {
    assert.equal(datasetState.state, fixture.expectedDatasetState, fixture.id);
  }
  if (fixture.expectedTribuneState) {
    assert.equal(
      contract.effectivePublicationState(candidate.publications.tribune, NOW),
      fixture.expectedTribuneState,
      `${fixture.id}: Tribune state`
    );
  }
  if (fixture.expectedStoryState) {
    assert.equal(contract.storyState(candidate.stories[1]), fixture.expectedStoryState, fixture.id);
  }
  if (fixture.expectedTribuneAccess) {
    const decision = contract.accessDecision(candidate, candidate.stories[1], { scope: "hash" }, NOW);
    assert.equal(decision.state, fixture.expectedTribuneAccess, `${fixture.id}: direct hash state`);
    assert.equal(decision.canExpose, fixture.expectedTribuneExposed, `${fixture.id}: direct hash exposure`);
  }
  if (fixture.expectedSearchExposed === false) {
    const search = contract.accessDecision(candidate, null, { scope: "search" }, NOW);
    assert.equal(search.canExpose, false, `${fixture.id}: archive search must fail closed`);
  }
  if (candidate) assert.equal(contract.validate(candidate).length, 0, `${fixture.id}: mutated dataset contract`);
}

const baseSources = new Set(base.stories[1].sources.map((source) => source.id));
assert.deepEqual(new Set(drill.sourceBinding), baseSources, "rollback drill must retain the exact approved source binding");
for (const stage of drill.stages) {
  const candidate = JSON.parse(JSON.stringify(base));
  const story = candidate.stories[1];
  story.status = stage.storyStatus;
  if (stage.storyStatus === "corrected") {
    story.correction = {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: stage.record
    };
  }
  if (stage.storyStatus === "retracted") {
    story.retraction = {
      retractedAt: "2026-07-25T18:30:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor",
      record: stage.record
    };
  }
  assert.equal(contract.validate(candidate).length, 0, `${stage.stage}: complete schema contract`);
  const decision = contract.accessDecision(candidate, story, { scope: "hash" }, NOW);
  assert.equal(decision.state, stage.expectedAccessState, `${stage.stage}: access state`);
  assert.equal(decision.canExpose, stage.expectedBodyVisible, `${stage.stage}: body visibility`);
  if (stage.record) {
    const recordPath = path.join(ROOT, stage.record.replace(/^\//, ""));
    assert.equal(fs.existsSync(recordPath), true, `${stage.stage}: evidence record must resolve`);
    const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
    assert.equal(record.storyId, story.id, `${stage.stage}: evidence story binding`);
    assert.deepEqual(new Set(record.sourceIds), baseSources, `${stage.stage}: evidence source binding`);
  }
}

const html = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "content", "newsstand.css"), "utf8");
assert.match(html, /aria-pressed="false"/);
assert.match(html, /id="ns-reader-title" tabindex="-1"/);
assert.match(html, /focusAfterPaint\(destination\)/);
assert.match(html, /The publication record did not load/);
assert.match(html, /Editorial hold/);
assert.match(html, /Retraction notice/);
assert.match(html, /Correction/);
assert.match(html, /contract\.accessDecision\(data, null, \{ edition: edition, scope: "paper" \}/);
assert.match(html, /contract\.accessDecision\(data, null, \{ scope: "search" \}/);
assert.match(html, /contract\.accessDecision\(data, story, \{ scope: "hash" \}/);
assert.match(html, /Archived route · check overdue/);
assert.match(html, /state\.nsReaderView = view \|\| captureReaderView/);
assert.match(html, /storyState\.nsPreviousView = previousView/);
assert.match(html, /function restoreHashlessView\(\)/);
assert.match(html, /data-ns-restoration/, "history restoration must expose an observable settled state");
assert.match(html, /newsstand:history-restored/, "history restoration must emit an observable event");
assert.doesNotMatch(html, /window\.setTimeout\(function \(\) \{ window\.scrollTo/, "history restoration must not rely on a timing guess");
assert.match(html, /if \(location\.hash\) renderHash\(true, lastInvoker\);\s*else restoreHashlessView\(\);/);
assert.match(html, /rack\.innerHTML = "";\s*empty\.hidden = true;/);
assert.doesNotMatch(html, /story\.edition === "wednesday"/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(css, /\.ns-story-notice--corrected/);
assert.match(css, /\.ns-story-notice--retracted/);

console.log(`✓ NEWSSTAND READER: ${cases.length} state fixtures · canonical editions · focus/ARIA/failure-state contracts`);
