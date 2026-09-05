#!/usr/bin/env node
import assert from "node:assert/strict";
import { applyStoryLineageTransaction, storySha256, validateStoryLineageReplay } from "./newsstand-story-lineage.mjs";

const old = {
  id: "earlier-report", slug: "earlier-report", headline: "Earlier report", edition: "daily",
  publishedAt: "2026-09-01T20:00:00Z", sources: [{ url: "https://example.test/earlier" }],
  predecessorStoryIds: [], successorStoryIds: []
};
const dataset = { stories: [old] };
const successor = {
  id: "later-development", slug: "later-development", headline: "Later development", edition: "daily",
  publishedAt: "2026-09-02T20:00:00Z", sources: [{ url: "https://example.test/later" }],
  predecessorStoryIds: [old.id], successorStoryIds: []
};
const lineage = { predecessors: [{ storyId: old.id, storySha256: storySha256(old) }] };
const next = applyStoryLineageTransaction({ dataset, story: successor, lineage });
assert.deepEqual(dataset.stories, [old], "validation must not mutate its input");
assert.deepEqual(next.stories[0], { ...old, successorStoryIds: [successor.id] }, "only reciprocal successor ID may change on the predecessor");
assert.deepEqual(next.stories[1], successor, "new dated story is preserved exactly");
assert.doesNotThrow(() => validateStoryLineageReplay({ dataset: next, story: successor, lineage }), "exact reciprocal replay remains idempotent");
const partial = structuredClone(next); partial.stories[0].successorStoryIds = [];
assert.throws(() => validateStoryLineageReplay({ dataset: partial, story: successor, lineage }), /reciprocal successor link/);
const neverPublished = structuredClone(old); neverPublished.publishedAt = null;
assert.throws(() => applyStoryLineageTransaction({ dataset: { stories: [neverPublished] }, story: successor, lineage: { predecessors: [{ storyId: neverPublished.id, storySha256: storySha256(neverPublished) }] } }), /never published/);
const late = structuredClone(old); late.publishedAt = "2026-09-03T20:00:00Z";
assert.throws(() => applyStoryLineageTransaction({ dataset: { stories: [late] }, story: successor, lineage: { predecessors: [{ storyId: late.id, storySha256: storySha256(late) }] } }), /not earlier/);
for (const [change, pattern] of [
  [value => value.story.predecessorStoryIds = [old.id, old.id], /duplicates/],
  [value => value.story.predecessorStoryIds = [value.story.id], /self-link/],
  [value => value.lineage.predecessors[0].storySha256 = "0".repeat(64), /old-state changed/],
  [value => { value.story.predecessorStoryIds = ["missing"]; value.lineage.predecessors[0].storyId = "missing"; }, /does not exist/],
  [value => value.story.successorStoryIds = ["future-story"], /cannot name successors/]
]) {
  const value = { dataset, story: structuredClone(successor), lineage: structuredClone(lineage) };
  change(value);
  assert.throws(() => applyStoryLineageTransaction(value), pattern);
  assert.deepEqual(dataset.stories, [old], "rejected transaction must not mutate predecessor state");
}
console.log("NEWSSTAND STORY LINEAGE PASS reciprocal=1 preserved_old_prose_date_sources=1 strict_prior_publication=1 exact_replay=1 partial_replay_rejected=1 bad_cases_rejected=7 mutation_before_validation=0");
