#!/usr/bin/env node

import fs from "node:fs";

const fundamentalsPath = "content/library-books/sources/ai-fundamentals-101.source.json";
const workingPath = "content/library-books/sources/working-with-ai-101.source.json";

function figures(html) {
  return [...html.matchAll(/<figure class="teaching-visual">[\s\S]*?<\/figure>/g)].map(match => match[0]);
}

export function inspectVisualPlacement(fundamentals, working) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  const chapterOne = fundamentals.chapters.find(section => section.id === "chapter-1")?.bodyHtml || "";
  const chapterFigures = figures(chapterOne);
  const firstAnchor = `<p>That swap is the exact seam between the software you've used your whole life and the stuff now getting called AI.</p>`;
  const secondAnchor = `<p>In real life, you don't encounter "AI" and "not AI" as separate things. You encounter <em>products</em> — and most products have both going on at the same time, in the same app, working together.</p>`;

  require(!chapterOne.trimStart().startsWith("<figure"), "AI Fundamentals chapter 1 may not open with a teaching visual");
  require(chapterFigures.length === 2, "AI Fundamentals chapter 1 must contain its two admitted teaching visuals exactly once");
  require(!/<\/figure>\s*<figure class="teaching-visual">/.test(chapterOne), "AI Fundamentals teaching visuals may not be stacked together");
  require(chapterOne.includes(`${firstAnchor}${chapterFigures[0] || "__missing__"}`), "automation-versus-AI visual must follow the explanation in section 1.1");
  require(chapterOne.includes(`${secondAnchor}${chapterFigures[1] || "__missing__"}`), "combined inbox routes visual must follow the introduction to section 1.4");

  const workingIntro = working.intro?.bodyHtml || "";
  const workingFigures = figures(workingIntro);
  const loopAnchor = `<p>This book turns those moving parts into one repeatable loop:</p>`;
  require(!workingIntro.trimStart().startsWith("<figure"), "Working with AI introduction may not open with a teaching visual");
  require(workingFigures.length === 1, "Working with AI introduction must contain its admitted loop visual exactly once");
  const loopVisualIndex = workingFigures[0] ? workingIntro.indexOf(workingFigures[0]) : -1;
  const loopAnchorIndex = workingIntro.indexOf(loopAnchor);
  const loopBlockIndex = workingIntro.indexOf('<blockquote class="working-principle">');
  require(loopAnchorIndex >= 0 && loopVisualIndex === loopAnchorIndex + loopAnchor.length && loopBlockIndex > loopVisualIndex, "Working with AI loop visual must sit between its explanation and the loop itself");
  return errors;
}

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

const fundamentals = loadJson(fundamentalsPath);
const working = loadJson(workingPath);
const errors = inspectVisualPlacement(fundamentals, working);

if (process.argv.includes("--calibrate")) {
  const knownBadFundamentals = structuredClone(fundamentals);
  const knownBadWorking = structuredClone(working);
  const chapter = knownBadFundamentals.chapters.find(section => section.id === "chapter-1");
  const chapterVisuals = figures(chapter.bodyHtml);
  chapter.bodyHtml = chapterVisuals.join("") + chapter.bodyHtml.replace(/<figure class="teaching-visual">[\s\S]*?<\/figure>/g, "");
  const introVisuals = figures(knownBadWorking.intro.bodyHtml);
  knownBadWorking.intro.bodyHtml = introVisuals.join("") + knownBadWorking.intro.bodyHtml.replace(/<figure class="teaching-visual">[\s\S]*?<\/figure>/g, "");
  const calibrationErrors = inspectVisualPlacement(knownBadFundamentals, knownBadWorking);
  if (calibrationErrors.length < 4) {
    console.error(`LIBRARY VISUAL PLACEMENT CALIBRATION FAIL errors=${calibrationErrors.length}`);
    process.exit(1);
  }
  console.log(`LIBRARY VISUAL PLACEMENT CALIBRATION PASS known_bad_rejected=${calibrationErrors.length}`);
}

if (errors.length) {
  console.error(`LIBRARY VISUAL PLACEMENT FAIL\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log("LIBRARY VISUAL PLACEMENT PASS fundamentals=2 contextual working=1 contextual stacked=0");
