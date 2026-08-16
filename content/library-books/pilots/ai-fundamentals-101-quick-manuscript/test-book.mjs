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
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('class="concept-diagram"', 'class="concept-diagram-removed"'));
  const missingConceptDiagram = inspectBook(temporary);
  if (missingConceptDiagram.pass || !missingConceptDiagram.errors.some(error => error.includes("one instructional concept diagram"))) {
    throw new Error("calibration failed: checker accepted a missing concept diagram");
  }
  fs.cpSync(pilotDir, temporary, { recursive: true, force: true });
  fs.writeFileSync(reviewPath, fs.readFileSync(reviewPath, "utf8").replace('class="system-map system-map-complete"', 'class="system-map"'));
  const missingCompleteMap = inspectBook(temporary);
  if (missingCompleteMap.pass || !missingCompleteMap.errors.some(error => error.includes("completed final AI ecosystem map"))) {
    throw new Error("calibration failed: checker accepted a missing completed AI map");
  }
  console.log("AI FUNDAMENTALS BOOK CHECK CALIBRATION PASS current=PASS missing_chapter_turn=FAIL misplaced_chapter_turn=FAIL missing_section_number=FAIL missing_part_opener=FAIL internal_sidebar=FAIL missing_humour_sprinkle=FAIL missing_quote_source=FAIL missing_key_term_card=FAIL exposed_answers=FAIL missing_concept_diagram=FAIL missing_complete_map=FAIL");
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
