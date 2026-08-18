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
  if (rewind.clarifications?.length !== 48) errors.push(`expected 48 separated technical clarifications or corrections; found ${rewind.clarifications?.length ?? 0}`);
  for (const clarification of rewind.clarifications || []) {
    if (!clarification.id || !clarification.anchor || !clarification.copy || !["before", "replace"].includes(clarification.mode)) errors.push("a technical clarification or correction is incomplete");
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
  if (manifest.counts?.representativeTeachingVisuals !== 0) errors.push("rejected CSS representative teaching diagrams are still counted as active");
  if (representativeVisualIds.length !== 0) errors.push("rejected CSS representative teaching diagrams have returned to the reader");
  const teachingVisualIds = [...review.matchAll(/data-teaching-visual="([^"]+)"/g)].map(match => match[1]);
  if (teachingVisualIds.length !== 0) errors.push("rejected Chapter 1 teaching visuals have returned to the reader");
  if (review.includes('data-chapter-one-summary="ch01-ai-claim-check"')) errors.push("rejected Chapter 1 visual summary has returned to the reader");
  const purposeBuiltVisuals = [...review.matchAll(/data-purpose-built-teaching-visual="([^"]+)"/g)].map(match => match[1]);
  const expectedPurposeBuiltVisuals = ["ch01-rule-versus-learned-pattern", "ch02-model-family-and-agent-system", "ch03-data-choices-become-model-behaviour", "ch04-fixed-vocabulary-splits-message", "ch05-training-improves-one-prediction", "ch06-photo-becomes-image-token-context", "ch07-send-prefill-decode-stream", "ch08-rag-selected-documents-context", "ch09-context-or-weight-change", "ch10-product-around-model"];
  if (purposeBuiltVisuals.length !== expectedPurposeBuiltVisuals.length || expectedPurposeBuiltVisuals.some(id => !purposeBuiltVisuals.includes(id))) errors.push("reader does not contain the exact active purpose-built visuals");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch01-automation-vs-ai-purpose-built-mobile-v4.png">')) errors.push("Chapter 1 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch01-automation-vs-ai-purpose-built-desktop-v4.png"')) errors.push("Chapter 1 purpose-built visual is missing its desktop asset");
  if (!review.includes("One shared suspicious email is tested in two ways")) errors.push("Chapter 1 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch02-model-family-and-agent-system-mobile-v1.png">')) errors.push("Chapter 2 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch02-model-family-and-agent-system-desktop-v1.png"')) errors.push("Chapter 2 purpose-built visual is missing its desktop asset");
  if (!review.includes("Two relationships—not four nesting dolls")) errors.push("Chapter 2 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch03-data-choices-pipeline-mobile-v1.png">')) errors.push("Chapter 3 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch03-data-choices-pipeline-desktop-v1.png"')) errors.push("Chapter 3 purpose-built visual is missing its desktop asset");
  if (!review.includes("The model never sees the whole world")) errors.push("Chapter 3 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch04-tokenisation-vocabulary-mobile-v1.png">')) errors.push("Chapter 4 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch04-tokenisation-vocabulary-desktop-v1.png"')) errors.push("Chapter 4 purpose-built visual is missing its desktop asset");
  if (!review.includes("The vocabulary was built earlier; your message is split now")) errors.push("Chapter 4 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch05-training-loop-mobile-v1.png">')) errors.push("Chapter 5 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch05-training-loop-desktop-v1.png"')) errors.push("Chapter 5 purpose-built visual is missing its desktop asset");
  if (!review.includes("One training update, slowed down")) errors.push("Chapter 5 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch06-photo-to-context-mobile-v1.png">')) errors.push("Chapter 6 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch06-photo-to-context-desktop-v1.png"')) errors.push("Chapter 6 purpose-built visual is missing its desktop asset");
  if (!review.includes("One photo, converted before the language model uses it")) errors.push("Chapter 6 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch07-send-to-stream-mobile-v1.png">')) errors.push("Chapter 7 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch07-send-to-stream-desktop-v1.png"')) errors.push("Chapter 7 purpose-built visual is missing its desktop asset");
  if (!review.includes("The answer is generated live, not revealed from behind a curtain")) errors.push("Chapter 7 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch08-rag-context-mobile-v1.png">')) errors.push("Chapter 8 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch08-rag-context-desktop-v1.png"')) errors.push("Chapter 8 purpose-built visual is missing its desktop asset");
  if (!review.includes("RAG retrieves before the model answers")) errors.push("Chapter 8 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch09-change-request-mobile-v2.png">') || !review.includes('<source media="(max-width: 600px)" srcset="assets/ch09-train-model-version-mobile-v2.png">')) errors.push("Chapter 9 purpose-built visual is missing one of its separately composed mobile panels");
  if (!review.includes('<img src="assets/ch09-change-request-desktop-v2.png"') || !review.includes('<img src="assets/ch09-train-model-version-desktop-v2.png"')) errors.push("Chapter 9 purpose-built visual is missing one of its desktop panels");
  if (!review.includes("First decide what needs to change")) errors.push("Chapter 9 purpose-built visual is missing its equivalent text explanation");
  if (!review.includes('<source media="(max-width: 600px)" srcset="assets/ch10-product-around-model-mobile-v1.png">')) errors.push("Chapter 10 purpose-built visual is missing its separately composed mobile asset");
  if (!review.includes('<img src="assets/ch10-product-around-model-desktop-v1.png"')) errors.push("Chapter 10 purpose-built visual is missing its desktop asset");
  if (!review.includes("The model is one part of the product")) errors.push("Chapter 10 purpose-built visual is missing its equivalent text explanation");
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
  if (manifest.counts?.technicalClarifications !== 48) errors.push("manifest technical clarification count is not 48");
  if (/model never sees individual letters|no way to examine individual characters inside a token|Every letter, number, and punctuation mark is a token/i.test(visibleText(review))) {
    errors.push("Chapter 4 has returned a rejected absolute tokenisation claim");
  }
  if (/responses? (?:appear|stream) word by word|each word (?:you see )?(?:appear )?is a (?:newly generated |new )?token|each word appears as it's generated/i.test(visibleText(review))) {
    errors.push("Chapter 7 has returned a rejected word-to-token streaming claim");
  }
  if (/entire conversation history|RAG[^.]{0,120}always current|accurate answer about your company'?s specific policy/i.test(visibleText(review))) {
    errors.push("the book has returned a rejected context-history or RAG guarantee");
  }
  if (/baking the behaviour in permanently|What RAG changes:\s*What the model knows about|does naturally[^.]{0,100}make that format the default|Every major chatbot you'?ve used[^.]{0,100}this process|Same outcome, fewer steps|Bakes behaviour into the weights permanently|RAG won'?t help\. You need fine-tuning|behaviour is baked in|Fine-tune only if behaviour needs permanent change/i.test(visibleText(review))) {
    errors.push("Chapter 9 has returned a rejected permanence, equivalence or universal-training claim");
  }
  if (/ensures it'?s safe|Every AI product you use has all of these layers|The model itself makes the decision|Modern AI products are orchestrated systems, not single model calls|saves 70[–-]90% on inference costs|All of that happens in 1[–-]5 seconds|Billed per token\.|Products that don'?t show you this choice are still routing|Most real AI products are orchestrated multi-step systems|Applied on both sides of the model/i.test(visibleText(review))) {
    errors.push("Chapter 10 has returned a rejected guarantee, universal-stack, tool-agency, routing or pricing claim");
  }
  if (manifest.counts?.humourSprinkles !== 5) errors.push("manifest humour-sprinkle count is not 5");
  if (manifest.counts?.conceptDiagrams !== renderedConceptSections.length) errors.push("manifest concept-diagram count does not match the section-bound registry render");
  if (manifest.counts?.teachingImages !== 10) errors.push("manifest does not count exactly ten active purpose-built teaching visuals");
  if (manifest.counts?.cumulativeSystemMaps !== 0) errors.push("manifest still counts rejected cumulative maps as active");
  if (manifest.gates?.visualTeachingLayer !== "REJECTED_BY_ALI_2026_08_17_QUARANTINED_NOT_RENDERED_NOT_INTEGRATED_NOT_PUBLISHED") errors.push("manifest does not preserve Ali's rejection and quarantine of the visual teaching layer");
  if (manifest.gates?.chapterOnePurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 1 purpose-built visual status");
  if (manifest.gates?.chapterTwoPurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 2 purpose-built visual status");
  if (manifest.gates?.chapterThreePurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 3 purpose-built visual status");
  if (manifest.gates?.chapterFourPurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 4 purpose-built visual status");
  if (manifest.gates?.chapterFivePurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 5 purpose-built visual status");
  if (manifest.gates?.chapterSixPurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 6 purpose-built visual status");
  if (manifest.gates?.chapterSevenPurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 7 purpose-built visual status");
  if (manifest.gates?.chapterEightPurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 8 purpose-built visual status");
  if (manifest.gates?.chapterNinePurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 9 purpose-built visual status");
  if (manifest.gates?.chapterTenPurposeBuiltVisual !== "BUILT_LOCALLY_PENDING_ALI_ACCEPTANCE_NOT_PUBLISHED") errors.push("manifest overstates or loses the Chapter 10 purpose-built visual status");
  const rejectedRepresentativeStatus = "REJECTED_BY_ALI_2026_08_17_DISABLED_NOT_RENDERED_NOT_PUBLISHED";
  for (const gate of ["representativeTeachingVisual", "chapterOneDecisionSeam", "chapterFourTokenProof", "chapterTwoJobFamily", "chapterThreeDataLifecycle", "chapterFiveTrainingLoop", "chapterSevenRequestJourney", "chapterEightContextRetrieval", "chapterNineCustomisationDecision"]) {
    if (manifest.gates?.[gate] !== rejectedRepresentativeStatus) errors.push(`manifest does not preserve rejection of ${gate}`);
  }
  const chapterOneVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch01-/.test(artifact.path));
  const allowedChapterOneVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch01-automation-vs-ai-purpose-built-desktop-v4.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch01-automation-vs-ai-purpose-built-mobile-v4.png",
  ]);
  if (chapterOneVisualArtifacts.length !== 2 || chapterOneVisualArtifacts.some(artifact => !allowedChapterOneVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 1 visual assets");
  const chapterTwoVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch02-/.test(artifact.path));
  const allowedChapterTwoVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch02-model-family-and-agent-system-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch02-model-family-and-agent-system-mobile-v1.png",
  ]);
  if (chapterTwoVisualArtifacts.length !== 2 || chapterTwoVisualArtifacts.some(artifact => !allowedChapterTwoVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 2 visual assets");
  const chapterThreeVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch03-/.test(artifact.path));
  const allowedChapterThreeVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch03-data-choices-pipeline-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch03-data-choices-pipeline-mobile-v1.png",
  ]);
  if (chapterThreeVisualArtifacts.length !== 2 || chapterThreeVisualArtifacts.some(artifact => !allowedChapterThreeVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 3 visual assets");
  const chapterFourVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch04-/.test(artifact.path));
  const allowedChapterFourVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch04-tokenisation-vocabulary-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch04-tokenisation-vocabulary-mobile-v1.png",
  ]);
  if (chapterFourVisualArtifacts.length !== 2 || chapterFourVisualArtifacts.some(artifact => !allowedChapterFourVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 4 visual assets");
  const chapterFiveVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch05-/.test(artifact.path));
  const allowedChapterFiveVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch05-training-loop-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch05-training-loop-mobile-v1.png",
  ]);
  if (chapterFiveVisualArtifacts.length !== 2 || chapterFiveVisualArtifacts.some(artifact => !allowedChapterFiveVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 5 visual assets");
  const chapterSixVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch06-photo-to-context-/.test(artifact.path));
  const allowedChapterSixVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch06-photo-to-context-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch06-photo-to-context-mobile-v1.png",
  ]);
  if (chapterSixVisualArtifacts.length !== 2 || chapterSixVisualArtifacts.some(artifact => !allowedChapterSixVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 6 visual assets");
  const chapterSevenVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch07-send-to-stream-/.test(artifact.path));
  const allowedChapterSevenVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch07-send-to-stream-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch07-send-to-stream-mobile-v1.png",
  ]);
  if (chapterSevenVisualArtifacts.length !== 2 || chapterSevenVisualArtifacts.some(artifact => !allowedChapterSevenVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 7 visual assets");
  const chapterEightVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch08-rag-context-/.test(artifact.path));
  const allowedChapterEightVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch08-rag-context-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch08-rag-context-mobile-v1.png",
  ]);
  if (chapterEightVisualArtifacts.length !== 2 || chapterEightVisualArtifacts.some(artifact => !allowedChapterEightVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 8 visual assets");
  const chapterNineVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch09-(?:change-request|train-model-version)-/.test(artifact.path));
  const allowedChapterNineVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch09-change-request-desktop-v2.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch09-change-request-mobile-v2.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch09-train-model-version-desktop-v2.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch09-train-model-version-mobile-v2.png",
  ]);
  if (chapterNineVisualArtifacts.length !== 4 || chapterNineVisualArtifacts.some(artifact => !allowedChapterNineVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 9 visual assets");
  const chapterTenVisualArtifacts = (manifest.artifacts || []).filter(artifact => /\/ch10-product-around-model-/.test(artifact.path));
  const allowedChapterTenVisuals = new Set([
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch10-product-around-model-desktop-v1.png",
    "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch10-product-around-model-mobile-v1.png",
  ]);
  if (chapterTenVisualArtifacts.length !== 2 || chapterTenVisualArtifacts.some(artifact => !allowedChapterTenVisuals.has(artifact.path))) errors.push("manifest binds missing or rejected Chapter 10 visual assets");
  if (count(JSON.stringify(manifest.artifacts || []), /ch06-bicycle-tree-learning-image\.png/g) !== 0) errors.push("manifest still binds a rejected Chapter 6 visual asset as active");
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
  console.log("AI FUNDAMENTALS BOOK CHECK PASS chapters=20 rewind_references=13 humour_sprinkles=5 technical_clarifications=48 teaching_images=10 chapter_turns=20 parts=9");
}
