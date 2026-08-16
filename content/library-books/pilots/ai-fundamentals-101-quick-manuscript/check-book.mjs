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
  const manuscriptText = manuscript.toString("utf8").replaceAll("\r\n", "\n");
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
  const numberedSectionCount = count(manuscriptText, /^##\s+\d+\.\d+\s+[—–-]\s+/gm);
  if (count(review, /<h3 id="ch-\d+-\d+-\d+-[^"]*">\d+\.\d+\s+[—–-]\s+/g) !== numberedSectionCount) {
    errors.push("review does not preserve every numbered chapter section heading");
  }
  const partStarts = [1, 3, 6, 10, 14, 15, 16, 18, 20];
  if (count(review, /class="part-opener"/g) !== partStarts.length) errors.push("review does not contain 9 major part openers");
  if (review.includes('class="chapter-part"')) errors.push("review repeats a part label beneath a chapter heading");
  for (const start of partStarts) {
    const openerIndex = review.indexOf(`id="part-${start}-title"`);
    const chapterIndex = review.indexOf(`<h2 id="chapter-${start}"`);
    if (openerIndex < 0 || chapterIndex < 0 || openerIndex > chapterIndex) errors.push(`Part opener for chapter-${start} is missing or misplaced`);
  }
  if (/\bSidebar:/i.test(visibleText(review))) errors.push("review exposes an internal Sidebar label instead of one of the six box types");
  if (!visibleText(review).includes("Concept in Practice: Why Does This Matter?")) errors.push("review is missing the normalized Concept in Practice box label");
  const sourceQuickReferences = count(manuscriptText, /📖 \*\*Key Terms — Quick Reference\*\*/g);
  const sourceAnswerSections = count(manuscriptText, /^\*\*Answers:?\*\*\s*$/gm);
  if (sourceQuickReferences !== 20) errors.push(`expected 20 source Key Terms references; found ${sourceQuickReferences}`);
  if (count(review, /class="key-terms-reference"/g) !== sourceQuickReferences) errors.push("review does not render every Key Terms reference as a separate section");
  if (count(review, /class="key-term-card"/g) !== 154) errors.push("review does not render all 154 key terms as individual cards");
  if (count(review, /<details class="answer-reveal">/g) !== sourceAnswerSections) errors.push("review does not render every answer section as a closed disclosure");
  if (/<details class="answer-reveal"\s+open/i.test(review)) errors.push("an answer disclosure is open by default");
  if (count(review, /<details class="answer-reveal"><summary>Show answers<\/summary>/g) !== sourceAnswerSections) errors.push("answer disclosures are missing the exact Show answers control");
  const conceptDiagramCount = Number(manifest.counts?.conceptDiagrams || 0);
  const renderedConceptSections = [...review.matchAll(/class="concept-diagram" data-section="(\d+\.\d+)"/g)].map(match => match[1]);
  const conceptChapters = renderedConceptSections.map(section => section.split(".")[0]);
  if (renderedConceptSections.length === 20 && new Set(conceptChapters).size === 20) errors.push("visual plan has collapsed to a one-per-chapter quota instead of section-bound concept decisions");
  if (renderedConceptSections.length !== conceptDiagramCount) errors.push("review does not render every registered section-bound instructional diagram");
  if (new Set(renderedConceptSections).size !== renderedConceptSections.length) errors.push("two instructional diagrams claim the same section anchor");
  if (count(review, /<figure class="concept-diagram"[\s\S]*?<figcaption><strong>The point:<\/strong>[\s\S]*?<\/figure>/g) !== conceptDiagramCount) errors.push("instructional diagrams do not each explain their teaching job");
  for (const variant of ["decision-blueprint", "ai-claim-decision-tree", "learned-patterns-not-rulebook", "mixed-products"]) {
    if (count(review, new RegExp(`<figure class="concept-diagram"[^>]*data-variant="${variant}"`, "g")) !== 1) errors.push(`Chapter 1 is missing its unique ${variant} teaching visual`);
  }
  const calloutColourRules = [
    '.callout-question{background:#ffe1f1;border-left-color:var(--electric-pink)}',
    '.callout-practice{background:#fff0e8;border-left-color:#e65e2e}',
    '.callout-key{background:#f0e8ff;border-left-color:var(--electric-purple)}',
    '.callout-objective{background:#e5f8ff;border-left-color:var(--electric-cyan)}',
    '.callout-insight{background:#e7fff3;border-left-color:#18a76d}',
    '.callout-landmark{background:#e9eeff;border-left-color:#4558e8}',
    '.callout-big-picture{background:#e7e5ff;border-left-color:#332c9e}',
  ];
  if (!calloutColourRules.every(rule => review.includes(rule))) errors.push("callout types have lost their unique consistent colour mapping");
  if (count(review, /<section class="chapter-ahead"/g) !== 20) errors.push("review does not keep all chapter goals and opening terms visibly available");
  if (/<details class="chapter-ahead"/i.test(review)) errors.push("chapter goals and terms are hidden behind a disclosure");
  if (count(review, /class="map-piece"/g) !== 17) errors.push("review does not contain the 17 component-bearing cumulative map pieces from Chapters 3–19");
  if (/class="map-piece" data-chapter="(?:1|2)"/.test(review)) errors.push("Chapter 1 or 2 is incorrectly presented as an AI-system component");
  if (count(review, /class="system-map system-map-complete"/g) !== 1) errors.push("review does not contain exactly one completed final AI ecosystem map");
  if (!review.includes('class="ai-system-blueprint"')) errors.push("final system map is not rendered as one connected blueprint");
  if (!review.includes('class="hardware-to-work"') || !review.includes("COMPUTE POWERS TRAINING") || !review.includes("COMPUTE POWERS EACH RESPONSE")) errors.push("final system map does not connect physical compute to training and inference");
  if (!review.includes("Draw it from memory")) errors.push("final system map is missing its reconstruction guide");
  if (review.includes('class="map-band')) errors.push("final map has regressed to expandable layer cards");
  if (!review.includes('.map-node small{font-size:.67rem}') || !review.includes('.map-node strong{font-size:.86rem}') || !review.includes('.map-node span{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;font-size:.72rem')) {
    errors.push("mobile final-map labels have regressed to hidden or poster-scale text");
  }
  if (review.includes("part-1-ai-boundary-v1.png")) errors.push("review still contains the rejected decorative sorting-machine image");
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
  for (const section of renderedConceptSections) {
    const sectionHeadingTextIndex = review.indexOf(`>${section} `);
    const sectionHeadingStart = sectionHeadingTextIndex < 0 ? -1 : review.lastIndexOf("<h3", sectionHeadingTextIndex);
    const nextHeadingIndex = sectionHeadingStart < 0 ? -1 : review.indexOf("<h3", sectionHeadingTextIndex);
    const diagramIndex = review.indexOf(`class="concept-diagram" data-section="${section}"`);
    if (sectionHeadingStart < 0 || nextHeadingIndex < 0 || diagramIndex < sectionHeadingStart || diagramIndex > nextHeadingIndex) {
      errors.push(`concept diagram for section ${section} is not attached after that section`);
    }
  }
  if (count(review, /class="toc-part"/g) !== 9) errors.push("review does not contain 9 table-of-contents parts");
  if (count(review, /📼/g) !== 11) errors.push("review does not contain the 11 newly rendered Rewind callouts");
  if (manifest.counts?.rewindReferences !== 13) errors.push("manifest Rewind count is not 13");
  if (manifest.counts?.technicalClarifications !== 1) errors.push("manifest technical clarification count is not 1");
  if (manifest.counts?.humourSprinkles !== 5) errors.push("manifest humour-sprinkle count is not 5");
  if (manifest.counts?.conceptDiagrams !== renderedConceptSections.length) errors.push("manifest concept-diagram count does not match the section-bound registry render");
  if (manifest.counts?.cumulativeSystemMaps !== 18) errors.push("manifest cumulative-system-map count is not the 17 component pieces plus one completed map");
  if (manifest.gates?.visualTeachingLayer !== "BUILT_LOCALLY_REPRESENTATIVE_CHAPTER_1_AND_COMPLETE_MAP_REVIEW_PENDING_REMAINING_57_NOT_ADMITTED") errors.push("manifest visual-teaching status does not preserve representative-only review-pending truth");
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
