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
  console.log("AI FUNDAMENTALS BOOK CHECK CALIBRATION PASS current=PASS missing_chapter_turn=FAIL");
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
