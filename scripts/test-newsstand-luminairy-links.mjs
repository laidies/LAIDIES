#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandLuminairyLinks } from "./lib/newsstand-luminairy-links.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const story = {
  headline: "Hannah Fry asks who is responsible when AI causes harm",
  the_story: "Her documentary AI Confidential follows the question into courtrooms and control rooms.",
  laidies_read: "Responsibility does not disappear because software sits in the middle.",
  what_this_means: "Ask who chose, tested and deployed the system."
};

const omitted = inspectNewsstandLuminairyLinks(story, { root });
assert.match(omitted.errors.join(" "), /Hannah Fry is named.*not linked/);

const linked = inspectNewsstandLuminairyLinks({
  ...story,
  relatedPeople: [{
    profileId: "hannah-fry",
    name: "Hannah Fry",
    reason: "Watch her programmes and continue with her books, talks and podcasts."
  }]
}, { root });
assert.deepEqual(linked.errors, []);

const invented = inspectNewsstandLuminairyLinks({
  ...story,
  relatedPeople: [{ profileId: "hannah-fry-fan-page", name: "Hannah Fry", reason: "Follow her." }]
}, { root });
assert.match(invented.errors.join(" "), /does not resolve/);

const reader = fs.readFileSync(path.join(root, "newsstand.html"), "utf8");
assert.match(reader, /function renderRelatedPeople\(story\)/);
assert.match(reader, /\.\/luminairy\.html#/);
assert.equal((reader.match(/renderRelatedPeople\(story\),/g) || []).length, 2, "daily and Big Picture readers must both render LUMINAiRY links");

console.log("NEWSSTAND LUMINAiRY LINK PASS: named women require exact profile relationships; valid links resolve; invented profiles fail");
