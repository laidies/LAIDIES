#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ownDir = path.dirname(fileURLToPath(import.meta.url));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const count = (text, pattern) => (text.match(pattern) || []).length;
const visibleText = text => text
  .replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replaceAll("&quot;", '"')
  .replaceAll("&amp;", "&")
  .replace(/[*_`]/g, "")
  .replace(/\s+/g, " ")
  .trim();
const compactVisibleText = text => visibleText(text).replace(/\s+/g, "");

export function inspectBook(pilotDir = ownDir) {
  const read = name => fs.readFileSync(path.join(pilotDir, name));
  const json = name => JSON.parse(read(name).toString("utf8"));
  const manuscript = read("source/full-book.md");
  const front = read("source/front-matter.md");
  const playbook = read("source/quick-production-playbook.md");
  const rewind = json("rewind-amendments.json");
  const source = json("book-source.json");
  const fragment = read("rendered-review.html").toString("utf8");
  const review = read("review.html").toString("utf8");
  const manifest = json("artifact-manifest.json");
  const errors = [];

  const expected = {
    manuscript: "721522ed4ff94760c7e5d62beef64a6299286efc1d7a7b90e6262a4ca4091eb9",
    front: "288a736ed80cedab1e45f4d96cea60ec11edaf226d19226476b890178a051c37",
    playbook: "43596af4f16bf97c0c1df70e16dbdcb8195542dbd717158dea7edb1e45455074",
  };
  for (const [name, bytes] of [["manuscript", manuscript], ["front", front], ["playbook", playbook]]) {
    if (sha256(bytes) !== expected[name]) errors.push(`${name} is not the exact supplied source`);
  }
  if (rewind.sourceSha256 !== expected.manuscript) errors.push("Rewind overlay is not bound to the manuscript");
  if (rewind.references?.length !== 13) errors.push(`expected 13 Rewind references; found ${rewind.references?.length ?? 0}`);
  const ids = new Set();
  for (const reference of rewind.references || []) {
    if (!reference.id || ids.has(reference.id)) errors.push(`missing or duplicate Rewind id ${reference.id || "(missing)"}`);
    ids.add(reference.id);
    if (!reference.anchor || !reference.teachingJob || !reference.limitation) errors.push(`${reference.id} is missing its anchor, teaching job or limitation`);
    if (!["retain", "replace", "after", "before", "append"].includes(reference.mode)) errors.push(`${reference.id} has unsupported mode`);
  }
  if (rewind.clarifications?.length !== 1) errors.push(`expected 1 separated technical clarification; found ${rewind.clarifications?.length ?? 0}`);
  for (const clarification of rewind.clarifications || []) {
    if (!clarification.id || !clarification.anchor || !clarification.copy || clarification.mode !== "before") errors.push("synthetic-data clarification is incomplete");
  }
  if (rewind.sprinkles?.length !== 5) errors.push(`expected 5 inline humour sprinkles; found ${rewind.sprinkles?.length ?? 0}`);
  for (const sprinkle of rewind.sprinkles || []) {
    if (!sprinkle.id || ids.has(sprinkle.id)) errors.push(`missing or duplicate humour sprinkle id ${sprinkle.id || "(missing)"}`);
    ids.add(sprinkle.id);
    if (!sprinkle.anchor || !sprinkle.copy || !sprinkle.teachingJob || !sprinkle.limitation || sprinkle.mode !== "append") errors.push(`${sprinkle.id} is incomplete or not inline`);
    if (!sprinkle.quoteSource?.work || !sprinkle.quoteSource?.url) errors.push(`${sprinkle.id} is not bound to a verified quote source`);
  }
  const renderedVisibleText = compactVisibleText(review);
  for (const sprinkle of rewind.sprinkles || []) {
    if (!renderedVisibleText.includes(compactVisibleText(sprinkle.copy))) errors.push(`${sprinkle.id} is missing from the rendered review`);
  }
  if (source.chapters?.length !== 20) errors.push(`expected 20 source chapters; found ${source.chapters?.length ?? 0}`);
  if (!source.sourceReferences?.some(value => value.endsWith("rewind-amendments.json"))) errors.push("book source does not bind the Rewind overlay");
  if (count(fragment, /<h2 id="chapter-/g) !== 20) errors.push("rendered fragment does not contain 20 chapters");
  if (count(review, /<h2 id="chapter-/g) !== 20) errors.push("review does not contain 20 chapters");
  if (count(review, /class="chapter-turn"/g) !== 20) errors.push("review does not contain 20 chapter-turn controls");
  for (let chapterNumber = 1; chapterNumber <= 20; chapterNumber += 1) {
    const headingIndex = review.indexOf(`<h2 id="chapter-${chapterNumber}"`);
    const navigationMarker = `class="chapter-turn" data-for="chapter-${chapterNumber}"`;
    const navigationIndex = review.indexOf(navigationMarker);
    const nextHeadingIndex = chapterNumber < 20 ? review.indexOf(`<h2 id="chapter-${chapterNumber + 1}"`) : review.length;
    if (count(review, new RegExp(navigationMarker, "g")) !== 1) errors.push(`chapter-${chapterNumber} does not have exactly one navigation control`);
    if (headingIndex < 0 || navigationIndex < headingIndex || navigationIndex > nextHeadingIndex) {
      errors.push(`chapter-${chapterNumber} navigation is outside its chapter`);
    }
  }
  if (count(review, /class="toc-part"/g) !== 9) errors.push("review does not contain 9 table-of-contents parts");
  if (count(review, /📼/g) !== 11) errors.push("review does not contain the 11 newly rendered Rewind callouts");
  if (manifest.counts?.rewindReferences !== 13) errors.push("manifest Rewind count is not 13");
  if (manifest.counts?.technicalClarifications !== 1) errors.push("manifest technical clarification count is not 1");
  if (manifest.counts?.humourSprinkles !== 5) errors.push("manifest humour-sprinkle count is not 5");
  if (manifest.gates?.factualAccuracy !== "PASS_ALI_VETTED_EXACT_SOURCE_BYTES_2026-08-16") errors.push("manifest lost Ali's exact-source accuracy authority");
  if (!String(manifest.gates?.freshnessRegistration || "").startsWith("PASS_20_CHAPTER")) errors.push("manifest freshness registration is not passing");
  for (const artifact of manifest.artifacts || []) {
    const absolute = path.join(path.resolve(pilotDir, "../../../.."), artifact.path);
    if (!fs.existsSync(absolute) || sha256(fs.readFileSync(absolute)) !== artifact.sha256) errors.push(`artifact binding mismatch: ${artifact.path}`);
  }
  return { pass: errors.length === 0, errors };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = inspectBook();
  if (!result.pass) {
    console.error(`AI FUNDAMENTALS BOOK CHECK FAIL\n- ${result.errors.join("\n- ")}`);
    process.exit(1);
  }
  console.log("AI FUNDAMENTALS BOOK CHECK PASS chapters=20 rewind_references=13 humour_sprinkles=5 rendered_callouts=11 chapter_turns=20 parts=9");
}
