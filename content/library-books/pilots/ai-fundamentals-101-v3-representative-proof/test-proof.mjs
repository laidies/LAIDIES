#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectProof, loadAndInspectProof } from "./check-proof.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const read = relative => fs.readFileSync(path.join(here, relative), "utf8");
const valid = {
  reviewText: read("review-text.md"),
  html: read("review.html"),
  desktopSvg: read("visuals/strawberry-token-route.svg"),
  mobileSvg: read("visuals/strawberry-token-route-mobile.svg")
};
const manifest = JSON.parse(read("artifact-manifest.json"));
const readerProtocol = read("cold-reader-session-protocol.md");

assert.deepEqual(loadAndInspectProof(here), [], "current representative proof must satisfy objective guard");
assert.match(readerProtocol, new RegExp(manifest.rendered.sha256), "cold-reader protocol must bind the current rendered artifact SHA");
for (const requiredTask of ["### 1. Orientation", "### 2. Lookup", "### 3. Explain-back", "### 4. Unseen transfer"]) {
  assert.ok(readerProtocol.includes(requiredTask), `cold-reader protocol is missing ${requiredTask}`);
}

const failures = [];
const expectFailure = (name, mutate, pattern) => {
  const candidate = structuredClone(valid);
  mutate(candidate);
  const errors = inspectProof(candidate);
  assert.ok(errors.some(error => pattern.test(error)), `${name} did not fail for the expected reason:\n${errors.join("\n")}`);
  failures.push(name);
};

expectFailure("technical-jargon", value => { value.reviewText = value.reviewText.replace("Before a language model", "UTF-8 byte-pair merge rankings come first. Before a language model"); }, /UTF-8|byte-pair/);
expectFailure("universal-failure", value => { value.reviewText = value.reviewText.replace("Current AI products may answer it correctly.", "Every model fails the strawberry question."); }, /universal/);
expectFailure("screenshot", value => { value.html = value.html.replace("strawberry-token-route.svg", "blurry-screenshot.png"); }, /raster screenshots/);
expectFailure("missing-mobile-visual", value => { value.html = value.html.replace("strawberry-token-route-mobile.svg", "strawberry-token-route.svg"); }, /mobile deterministic SVG/);
expectFailure("unlabelled-encoding", value => { value.desktopSvg = value.desktopSvg.replace("o200k_base", "one example"); }, /name the exact encoding/);
expectFailure("render-drift", value => { value.html = value.html.replace("Current AI products may answer it correctly.", "Chatbots always fail this."); }, /rendered artifact drifted/);
expectFailure("index-merged-into-lesson", value => { value.reviewText = value.reviewText.replace("## Concept Index entry", "## Lookup notes"); }, /required teaching anchor|separate lookup route/);

console.log(`AI FUNDAMENTALS V3 REPRESENTATIVE PROOF CALIBRATION PASS valid=1 rejected=${failures.length} forbidden_jargon=1 universal_claim=1 screenshots=1 mobile_visual=1 encoding_label=1 render_drift=1 index_separation=1`);
