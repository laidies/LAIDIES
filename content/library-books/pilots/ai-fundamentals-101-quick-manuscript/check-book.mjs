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
  const renderedConceptSections = [...review.matchAll(/class="teaching-visual [^"]+" data-teaching-section="(\d+\.\d+)"/g)].map(match => match[1]);
  const conceptChapters = renderedConceptSections.map(section => section.split(".")[0]);
  if (renderedConceptSections.length === 20 && new Set(conceptChapters).size === 20) errors.push("visual plan has collapsed to a one-per-chapter quota instead of section-bound concept decisions");
  if (renderedConceptSections.length !== conceptDiagramCount) errors.push("review does not render every registered section-bound instructional diagram");
  if (new Set(renderedConceptSections).size !== renderedConceptSections.length) errors.push("two instructional diagrams claim the same section anchor");
  if (count(review, /<figure class="teaching-visual [^"]+"[\s\S]*?<figcaption><strong>The point:<\/strong>[\s\S]*?<\/figure>/g) !== conceptDiagramCount) errors.push("instructional diagrams do not each explain their teaching job");
  if (/<figure class="teaching-visual tv-/.test(review)) errors.push("an instructional figure reuses an inner layout class and can collapse at mobile width");
  if (conceptDiagramCount !== 0) errors.push("rejected visual layer is still counted as active");
  if (renderedConceptSections.length !== 0) errors.push("rejected section-bound instructional diagrams have returned to the reader");
  const representativeVisualIds = [...review.matchAll(/data-representative-teaching-visual="([^"]+)"/g)].map(match => match[1]);
  if (manifest.counts?.representativeTeachingVisuals !== 9) errors.push("bounded representative visual count is not exactly nine");
  if (representativeVisualIds.length !== 9 || !representativeVisualIds.includes("ch01-rule-or-learned-pattern") || !representativeVisualIds.includes("ch02-four-jobs-one-family") || !representativeVisualIds.includes("ch03-data-choices-lifecycle") || !representativeVisualIds.includes("ch04-text-to-tokens") || !representativeVisualIds.includes("ch05-guess-check-adjust-loop") || !representativeVisualIds.includes("ch06-photo-to-patches") || !representativeVisualIds.includes("ch07-prefill-decode-stream") || !representativeVisualIds.includes("ch08-weights-context-memory-rag") || !representativeVisualIds.includes("ch09-context-or-weights-decision")) errors.push("a bounded representative visual is missing or duplicated");
  if (!review.includes("Who supplied the deciding rule?") || !review.includes("Human-written rule") || !review.includes("Learned filter compares combined signals") || !review.includes("NOW THE SAME NEW EMAIL ENTERS") || !review.includes("ONE INBOX CAN USE BOTH")) errors.push("Chapter 1.1 representative visual has lost its exact causal comparison");
  const chapterOneVisualIndex = review.indexOf('data-representative-teaching-visual="ch01-rule-or-learned-pattern"');
  const chapterOneSectionIndex = review.indexOf('>1.1 ');
  const chapterOneNextSectionIndex = review.indexOf('>1.2 ');
  if (chapterOneVisualIndex < chapterOneSectionIndex || chapterOneVisualIndex > chapterOneNextSectionIndex) errors.push("Chapter 1.1 representative visual is outside its teaching section");
  if (!review.includes("Do not ask only “Is this AI?” Ask what job it is doing.") || !review.includes("PREDICT") || !review.includes("INTERPRET") || !review.includes("CREATE") || !review.includes("ACT")) errors.push("Chapter 2.4 representative visual has lost its four distinct jobs");
  const chapterTwoVisualIndex = review.indexOf('data-representative-teaching-visual="ch02-four-jobs-one-family"');
  const chapterTwoSectionIndex = review.indexOf('>2.4 ');
  const chapterTwoNextSectionIndex = review.indexOf('>2.5 ');
  if (chapterTwoVisualIndex < chapterTwoSectionIndex || chapterTwoVisualIndex > chapterTwoNextSectionIndex) errors.push("Chapter 2.4 representative visual is outside its teaching section");
  if (!review.includes("A spam filter begins with a chain of human choices") || !review.includes("SPLIT BEFORE LEARNING") || !review.includes("HELD-OUT TEST") || !review.includes("WHAT IS MISSING STAYS MISSING")) errors.push("Chapter 3.3 representative visual has lost its data-choice lifecycle");
  const chapterThreeVisualIndex = review.indexOf('data-representative-teaching-visual="ch03-data-choices-lifecycle"');
  const chapterThreeSectionIndex = review.indexOf('>3.3 ');
  const chapterThreeNextSectionIndex = review.indexOf('>3.4 ');
  if (chapterThreeVisualIndex < chapterThreeSectionIndex || chapterThreeVisualIndex > chapterThreeNextSectionIndex) errors.push("Chapter 3.3 representative visual is outside its teaching section");
  if (!review.includes("The model never receives the sentence the way you see it") || !review.includes("WHAT THE MODEL RECEIVES") || !review.includes("Six token entries—not four words.")) errors.push("Chapter 4.3 representative visual has lost its exact causal teaching sequence");
  const chapterFourVisualIndex = review.indexOf('data-representative-teaching-visual="ch04-text-to-tokens"');
  const chapterFourSectionIndex = review.indexOf('>4.3 ');
  const chapterFourNextSectionIndex = review.indexOf('>4.4 ');
  if (chapterFourVisualIndex < chapterFourSectionIndex || chapterFourVisualIndex > chapterFourNextSectionIndex) errors.push("Chapter 4.3 representative visual is outside its teaching section");
  if (!review.includes("Training turns one error into millions of tiny targeted adjustments") || !review.includes("FORWARD CALCULATION") || !review.includes("BACKWARD CALCULATION") || !review.includes("SMALL TARGETED UPDATES") || !review.includes("NEXT EXAMPLE → GUESS → CHECK → ADJUST → REPEAT")) errors.push("Chapter 5.5 representative visual has lost its causal training loop");
  const chapterFiveVisualIndex = review.indexOf('data-representative-teaching-visual="ch05-guess-check-adjust-loop"');
  const chapterFiveSectionIndex = review.indexOf('>5.5 ');
  const chapterFiveNextSectionIndex = review.indexOf('>5.6 ');
  if (chapterFiveVisualIndex < chapterFiveSectionIndex || chapterFiveVisualIndex > chapterFiveNextSectionIndex) errors.push("Chapter 5.5 representative visual is outside its teaching section");
  if (!review.includes("A photo becomes pieces the model can calculate with") || !review.includes("ONE COMBINED SEQUENCE")) errors.push("Chapter 6.2 representative visual has lost its exact causal teaching sequence");
  const chapterSixVisualIndex = review.indexOf('data-representative-teaching-visual="ch06-photo-to-patches"');
  const chapterSixSectionIndex = review.indexOf('>6.2 ');
  const chapterSixNextSectionIndex = review.indexOf('>6.3 ');
  if (chapterSixVisualIndex < chapterSixSectionIndex || chapterSixVisualIndex > chapterSixNextSectionIndex) errors.push("Chapter 6.2 representative visual is outside its teaching section");
  if (!review.includes("The model reads the supplied context, then writes one piece at a time") || !review.includes("THE APP ASSEMBLES WHAT THIS REQUEST CAN SEE") || !review.includes("PREFILL · READ") || !review.includes("DECODE · WRITE") || !review.includes("STREAM TO YOUR SCREEN") || !review.includes("WHAT DID NOT HAPPEN:")) errors.push("Chapter 7.2 representative visual has lost its request-lifecycle teaching sequence");
  const chapterSevenVisualIndex = review.indexOf('data-representative-teaching-visual="ch07-prefill-decode-stream"');
  const chapterSevenSectionIndex = review.indexOf('>7.2 ');
  const chapterSevenNextSectionIndex = review.indexOf('>7.3 ');
  if (chapterSevenVisualIndex < chapterSevenSectionIndex || chapterSevenVisualIndex > chapterSevenNextSectionIndex) errors.push("Chapter 7.2 representative visual is outside its teaching section");
  if (!review.includes("The model has learned patterns—but the product decides what it can see now") || !review.includes("BEFORE ANY QUESTION") || !review.includes("SAVED PRODUCT MEMORY") || !review.includes("RAG RETRIEVAL") || !review.includes("CONTEXT FOR THIS TURN") || !review.includes("FROZEN WEIGHTS") || !review.includes("WHEN THE TURN ENDS:")) errors.push("Chapter 8.6 representative visual has lost its context/retrieval teaching sequence");
  const chapterEightVisualIndex = review.indexOf('data-representative-teaching-visual="ch08-weights-context-memory-rag"');
  const chapterEightSectionIndex = review.indexOf('>8.6 ');
  const chapterEightNextSectionIndex = review.indexOf('>8.7 ');
  if (chapterEightVisualIndex < chapterEightSectionIndex || chapterEightVisualIndex > chapterEightNextSectionIndex) errors.push("Chapter 8.6 representative visual is outside its teaching section");
  if (!review.includes("A wrong answer does not automatically mean “train the model”") || !review.includes("CHANGE WHAT THIS REQUEST CAN SEE") || !review.includes("RAG · RETRIEVE THE POLICY INTO CONTEXT") || !review.includes("CHANGE LEARNED BEHAVIOUR BEFORE USE") || !review.includes("FINE-TUNING ON CURATED EXAMPLES") || !review.includes("REAL SYSTEMS COMBINE METHODS")) errors.push("Chapter 9.8 representative visual has lost its context-versus-weights decision logic");
  const chapterNineVisualIndex = review.indexOf('data-representative-teaching-visual="ch09-context-or-weights-decision"');
  const chapterNineSectionIndex = review.indexOf('>9.8 ');
  const chapterNineNextSectionIndex = review.indexOf('>9.9 ');
  if (chapterNineVisualIndex < chapterNineSectionIndex || chapterNineVisualIndex > chapterNineNextSectionIndex) errors.push("Chapter 9.8 representative visual is outside its teaching section");
  const teachingVisualIds = [...review.matchAll(/data-teaching-visual="([^"]+)"/g)].map(match => match[1]);
  if (teachingVisualIds.length !== 0) errors.push("rejected Chapter 1 teaching visuals have returned to the reader");
  if (review.includes('data-chapter-one-summary="ch01-ai-claim-check"')) errors.push("rejected Chapter 1 visual summary has returned to the reader");
  const chapterOneStart = review.indexOf('<h2 id="chapter-1"');
  const chapterTwoStart = review.indexOf('<h2 id="chapter-2"');
  const chapterOne = review.slice(chapterOneStart, chapterTwoStart);
  if (chapterOne.includes("Millions of numerical weights")) errors.push("Chapter 1 reintroduces unexplained numerical-weight jargon in its visual");
  if (!chapterOne.includes("The rules it figures out aren't in words. They're in numbers") || !chapterOne.includes("You'll see exactly how this works in Chapter 5")) errors.push("Chapter 1 has lost its plain-language bridge from learned rules to Chapter 5");
  if (!review.includes("body{font-family:var(--reading-font);font-size:19px;line-height:1.64}")) errors.push("textbook reading typography has regressed below the repaired hierarchy");
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
  if (count(review, /class="map-piece"/g) !== 0) errors.push("rejected cumulative map pieces have returned to the reader");
  if (count(review, /class="system-map(?: system-map-complete)?"/g) !== 0) errors.push("rejected AI-system maps have returned to the reader");
  if (review.includes('class="ai-system-blueprint"')) errors.push("rejected final AI-system blueprint has returned to the reader");
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
    const diagramIndex = review.indexOf(`data-teaching-section="${section}"`);
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
  if (manifest.counts?.teachingImages !== 0) errors.push("manifest still counts rejected Chapter 1 teaching visuals as active");
  if (manifest.counts?.cumulativeSystemMaps !== 0) errors.push("manifest still counts rejected cumulative maps as active");
  if (manifest.gates?.visualTeachingLayer !== "REJECTED_BY_ALI_2026_08_17_QUARANTINED_NOT_RENDERED_NOT_INTEGRATED_NOT_PUBLISHED") errors.push("manifest does not preserve Ali's rejection and quarantine of the visual teaching layer");
  if (manifest.gates?.representativeTeachingVisual !== "BUILT_LOCALLY_MAKER_AND_INDEPENDENT_VISUAL_REVIEW_PASS_ALI_REVIEW_PENDING_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 6.2 representative visual status");
  if (manifest.gates?.chapterOneDecisionSeam !== "BUILT_LOCALLY_MAKER_AND_INDEPENDENT_VISUAL_REVIEW_PASS_ALI_REVIEW_PENDING_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 1.1 representative visual status");
  if (manifest.gates?.chapterFourTokenProof !== "BUILT_LOCALLY_MAKER_AND_INDEPENDENT_VISUAL_REVIEW_PASS_ALI_REVIEW_PENDING_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 4.3 representative visual status");
  if (manifest.gates?.chapterTwoJobFamily !== "BUILT_LOCALLY_MAKER_AND_INDEPENDENT_VISUAL_REVIEW_PASS_ALI_REVIEW_PENDING_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 2.4 representative visual status");
  if (manifest.gates?.chapterThreeDataLifecycle !== "BUILT_LOCALLY_MAKER_AND_INDEPENDENT_VISUAL_REVIEW_PASS_ALI_REVIEW_PENDING_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 3.3 representative visual status");
  if (manifest.gates?.chapterFiveTrainingLoop !== "BUILT_LOCALLY_MAKER_AND_INDEPENDENT_VISUAL_REVIEW_PASS_ALI_REVIEW_PENDING_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 5.5 representative visual status");
  if ((manifest.artifacts || []).some(artifact => /ch01-/.test(artifact.path))) errors.push("manifest still binds rejected Chapter 1 visual assets as active artifacts");
  if (count(JSON.stringify(manifest.artifacts || []), /ch06-bicycle-tree-learning-image\.png/g) !== 1) errors.push("Chapter 6.2 representative source image is not bound exactly once in the active manifest");
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
