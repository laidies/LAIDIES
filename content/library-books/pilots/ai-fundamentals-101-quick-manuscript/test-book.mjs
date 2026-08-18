#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectBook } from "./check-book.mjs";

const pilotDir = path.dirname(fileURLToPath(import.meta.url));
const current = inspectBook(pilotDir);
if (!current.pass) throw new Error(`current book failed: ${current.errors.join("; ")}`);

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-aif-book-check-"));
try {
  fs.cpSync(pilotDir, temporary, { recursive: true });
  const reviewPath = path.join(temporary, "review.html");
  const review = fs.readFileSync(reviewPath, "utf8");
  fs.writeFileSync(reviewPath, review.replace('class="chapter-turn"', 'class="chapter-turn-removed"'));
  const deliberatelyBad = inspectBook(temporary);
  if (deliberatelyBad.pass || !deliberatelyBad.errors.some(error => error.includes("chapter-turn"))) {
    throw new Error("calibration failed: checker accepted a review with a missing chapter-turn control");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const misplacedReview = fs.readFileSync(reviewPath, "utf8");
  const finalNavigation = misplacedReview.match(/<nav class="chapter-turn" data-for="chapter-20"[\s\S]*?<\/nav>/)?.[0];
  if (!finalNavigation) throw new Error("calibration fixture could not find Chapter 20 navigation");
  fs.writeFileSync(reviewPath, misplacedReview
    .replace(finalNavigation, "")
    .replace(/(<h2 id="chapter-1"[^>]*>)/, `$1${finalNavigation}`));
  const misplacedNavigation = inspectBook(temporary);
  if (misplacedNavigation.pass || !misplacedNavigation.errors.some(error => error.includes("chapter-20 navigation is outside its chapter"))) {
    throw new Error("calibration failed: checker accepted Chapter 20 navigation inside Chapter 1");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const unnumberedReview = fs.readFileSync(reviewPath, "utf8").replace("1.1 — ", "");
  fs.writeFileSync(reviewPath, unnumberedReview);
  const missingSectionNumber = inspectBook(temporary);
  if (missingSectionNumber.pass || !missingSectionNumber.errors.some(error => error.includes("numbered chapter section"))) {
    throw new Error("calibration failed: checker accepted a missing section number");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const missingPartOpenerReview = fs.readFileSync(reviewPath, "utf8").replace('class="part-opener"', 'class="part-opener-removed"');
  fs.writeFileSync(reviewPath, missingPartOpenerReview);
  const missingPartOpener = inspectBook(temporary);
  if (missingPartOpener.pass || !missingPartOpener.errors.some(error => error.includes("major part openers"))) {
    throw new Error("calibration failed: checker accepted a missing major part opener");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const sidebarReview = fs.readFileSync(reviewPath, "utf8").replace("Concept in Practice: Why Does This Matter?", "Sidebar: Why Does This Matter?");
  fs.writeFileSync(reviewPath, sidebarReview);
  const internalSidebar = inspectBook(temporary);
  if (internalSidebar.pass || !internalSidebar.errors.some(error => error.includes("internal Sidebar label"))) {
    throw new Error("calibration failed: checker accepted an internal Sidebar label");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const secondReview = fs.readFileSync(reviewPath, "utf8");
  fs.writeFileSync(reviewPath, secondReview.replace("Calling every useful computer feature AI? As if.", "Generic replacement."));
  const missingSprinkle = inspectBook(temporary);
  if (missingSprinkle.pass || !missingSprinkle.errors.some(error => error.includes("HUMOUR-AIF-CH01-AS-IF"))) {
    throw new Error("calibration failed: checker accepted a review with a missing humour sprinkle");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const rewindPath = path.join(temporary, "rewind-amendments.json");
  const rewind = JSON.parse(fs.readFileSync(rewindPath, "utf8"));
  delete rewind.sprinkles[0].quoteSource;
  fs.writeFileSync(rewindPath, `${JSON.stringify(rewind, null, 2)}\n`);
  const missingQuoteSource = inspectBook(temporary);
  if (missingQuoteSource.pass || !missingQuoteSource.errors.some(error => error.includes("verified quote source"))) {
    throw new Error("calibration failed: checker accepted a humour sprinkle with no quote source");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('class="key-term-card"', 'class="key-term-card-removed"'));
  const missingKeyTermCard = inspectBook(temporary);
  if (missingKeyTermCard.pass || !missingKeyTermCard.errors.some(error => error.includes("154 key terms"))) {
    throw new Error("calibration failed: checker accepted a missing key-term card");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<details class="answer-reveal">', '<details class="answer-reveal" open>'));
  const exposedAnswers = inspectBook(temporary);
  if (exposedAnswers.pass || !exposedAnswers.errors.some(error => error.includes("open by default"))) {
    throw new Error("calibration failed: checker accepted answers exposed by default");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<h3 id="ch-1-1-1-the-spam-filter-that-gave-away-the-secret"', '<figure class="teaching-visual teaching-kind-pipeline" data-teaching-section="1.1"><figcaption>Rejected visual returned</figcaption></figure><h3 id="ch-1-1-1-the-spam-filter-that-gave-away-the-secret"'));
  const returnedSectionVisual = inspectBook(temporary);
  if (returnedSectionVisual.pass || !returnedSectionVisual.errors.some(error => error.includes("rejected section-bound instructional diagrams have returned"))) {
    throw new Error("calibration failed: checker accepted a returned rejected section visual");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<section class="chapter-ahead"', '<details class="chapter-ahead"'));
  const hiddenChapterFrontMatter = inspectBook(temporary);
  if (hiddenChapterFrontMatter.pass || !hiddenChapterFrontMatter.errors.some(error => error.includes("visibly available"))) {
    throw new Error("calibration failed: checker accepted hidden chapter goals and terms");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<h3 id="ch-1-1-1-the-spam-filter-that-gave-away-the-secret"', '<figure class="ch1-visual" data-teaching-visual="ch01-generalisation"><figcaption>Rejected visual returned</figcaption></figure><h3 id="ch-1-1-1-the-spam-filter-that-gave-away-the-secret"'));
  const returnedChapterOneVisual = inspectBook(temporary);
  if (returnedChapterOneVisual.pass || !returnedChapterOneVisual.errors.some(error => error.includes("rejected Chapter 1 teaching visuals have returned"))) {
    throw new Error("calibration failed: checker accepted a returned rejected Chapter 1 visual");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<h3 id="ch-20-20-1-what-is-agi-and-why-no-one-agrees"', '<figure class="system-map system-map-complete"><div class="ai-system-blueprint">Rejected map returned</div></figure><h3 id="ch-20-20-1-what-is-agi-and-why-no-one-agrees"'));
  const returnedSystemMap = inspectBook(temporary);
  if (returnedSystemMap.pass || !returnedSystemMap.errors.some(error => error.includes("rejected AI-system maps have returned"))) {
    throw new Error("calibration failed: checker accepted a returned rejected AI-system map");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  const manifestPath = path.join(temporary, "artifact-manifest.json");
  const returnedAssetManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  returnedAssetManifest.artifacts.push({ path: "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/assets/ch01-rejected.png", sha256: "rejected" });
  fs.writeFileSync(manifestPath, `${JSON.stringify(returnedAssetManifest, null, 2)}\n`);
  const returnedVisualAsset = inspectBook(temporary);
  if (returnedVisualAsset.pass || !returnedVisualAsset.errors.some(error => error.includes("missing or rejected Chapter 1 visual assets"))) {
    throw new Error("calibration failed: checker accepted a rejected visual asset in the active manifest");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch01-automation-vs-ai-purpose-built-mobile-v4.png">', ""));
  const missingPurposeBuiltMobile = inspectBook(temporary);
  if (missingPurposeBuiltMobile.pass || !missingPurposeBuiltMobile.errors.some(error => error.includes("separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted a purpose-built visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch02-model-family-and-agent-system-mobile-v1.png">', ""));
  const missingChapterTwoMobile = inspectBook(temporary);
  if (missingChapterTwoMobile.pass || !missingChapterTwoMobile.errors.some(error => error.includes("Chapter 2 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 2 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch03-data-choices-pipeline-mobile-v1.png">', ""));
  const missingChapterThreeMobile = inspectBook(temporary);
  if (missingChapterThreeMobile.pass || !missingChapterThreeMobile.errors.some(error => error.includes("Chapter 3 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 3 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch04-tokenisation-vocabulary-mobile-v1.png">', ""));
  const missingChapterFourMobile = inspectBook(temporary);
  if (missingChapterFourMobile.pass || !missingChapterFourMobile.errors.some(error => error.includes("Chapter 4 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 4 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch05-training-loop-mobile-v1.png">', ""));
  const missingChapterFiveMobile = inspectBook(temporary);
  if (missingChapterFiveMobile.pass || !missingChapterFiveMobile.errors.some(error => error.includes("Chapter 5 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 5 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch06-photo-to-context-mobile-v1.png">', ""));
  const missingChapterSixMobile = inspectBook(temporary);
  if (missingChapterSixMobile.pass || !missingChapterSixMobile.errors.some(error => error.includes("Chapter 6 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 6 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch07-send-to-stream-mobile-v1.png">', ""));
  const missingChapterSevenMobile = inspectBook(temporary);
  if (missingChapterSevenMobile.pass || !missingChapterSevenMobile.errors.some(error => error.includes("Chapter 7 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 7 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<source media="(max-width: 600px)" srcset="assets/ch08-rag-context-mobile-v1.png">', ""));
  const missingChapterEightMobile = inspectBook(temporary);
  if (missingChapterEightMobile.pass || !missingChapterEightMobile.errors.some(error => error.includes("Chapter 8 purpose-built visual is missing its separately composed mobile asset"))) {
    throw new Error("calibration failed: checker accepted the Chapter 8 visual with no mobile composition");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('.callout-practice{background:#fff0e8;border-left-color:#e65e2e}', '.callout-practice{background:#ffe1f1;border-left-color:var(--electric-pink)}'));
  const duplicatedCalloutColour = inspectBook(temporary);
  if (duplicatedCalloutColour.pass || !duplicatedCalloutColour.errors.some(error => error.includes("unique consistent colour mapping"))) {
    throw new Error("calibration failed: checker accepted two callout types sharing one colour");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('</nav>\n<h2 id="chapter-2"', '</nav><aside class="map-piece" data-chapter="1">False component</aside>\n<h2 id="chapter-2"'));
  const falseChapterOneMapPiece = inspectBook(temporary);
  if (falseChapterOneMapPiece.pass || !falseChapterOneMapPiece.errors.some(error => error.includes("rejected cumulative map pieces have returned"))) {
    throw new Error("calibration failed: checker accepted Chapter 1 as a system-map component");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('<h3 id="ch-1-1-1-the-spam-filter-that-gave-away-the-secret"', '<figure data-representative-teaching-visual="ch01-rejected-css-figure"><figcaption>Rejected CSS figure returned</figcaption></figure><h3 id="ch-1-1-1-the-spam-filter-that-gave-away-the-secret"'));
  const returnedRepresentativeVisual = inspectBook(temporary);
  if (returnedRepresentativeVisual.pass || !returnedRepresentativeVisual.errors.some(error => error.includes("rejected CSS representative teaching diagrams have returned"))) {
    throw new Error("calibration failed: checker accepted a returned rejected CSS representative visual");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace("A model normally predicts from token pieces", "The model never sees individual letters. A model normally predicts from token pieces"));
  const returnedAbsoluteTokenClaim = inspectBook(temporary);
  if (returnedAbsoluteTokenClaim.pass || !returnedAbsoluteTokenClaim.errors.some(error => error.includes("rejected absolute tokenisation claim"))) {
    throw new Error("calibration failed: checker accepted a rejected absolute tokenisation claim");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace("The useful clue is that the answer is still being produced", "Each word you see is a new token. The useful clue is that the answer is still being produced"));
  const returnedWordTokenClaim = inspectBook(temporary);
  if (returnedWordTokenClaim.pass || !returnedWordTokenClaim.errors.some(error => error.includes("rejected word-to-token streaming claim"))) {
    throw new Error("calibration failed: checker accepted a rejected word-to-token streaming claim");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace("Neither route guarantees a correct answer.", "RAG is cheap, fast and always current."));
  const returnedRagGuarantee = inspectBook(temporary);
  if (returnedRagGuarantee.pass || !returnedRagGuarantee.errors.some(error => error.includes("rejected context-history or RAG guarantee"))) {
    throw new Error("calibration failed: checker accepted a rejected RAG currency guarantee");
  }
  console.log("AI FUNDAMENTALS BOOK CHECK CALIBRATION PASS current=PASS missing_chapter_turn=FAIL misplaced_chapter_turn=FAIL missing_section_number=FAIL missing_part_opener=FAIL internal_sidebar=FAIL missing_humour_sprinkle=FAIL missing_quote_source=FAIL missing_key_term_card=FAIL exposed_answers=FAIL returned_section_visual=FAIL hidden_chapter_front_matter=FAIL returned_chapter_one_visual=FAIL returned_system_map=FAIL returned_visual_asset=FAIL missing_purpose_built_mobile=FAIL missing_chapter_two_mobile=FAIL missing_chapter_three_mobile=FAIL missing_chapter_four_mobile=FAIL missing_chapter_five_mobile=FAIL missing_chapter_six_mobile=FAIL missing_chapter_seven_mobile=FAIL missing_chapter_eight_mobile=FAIL duplicate_callout_colour=FAIL returned_map_piece=FAIL returned_rejected_css_representative=FAIL returned_absolute_token_claim=FAIL returned_word_token_claim=FAIL returned_rag_guarantee=FAIL technical_clarifications=19");
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
