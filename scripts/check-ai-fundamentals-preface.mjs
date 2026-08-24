#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const prefacePath = path.join(root, "content/library-books/sources/ai-fundamentals-101.preface.md");
const sourcePath = path.join(root, "content/library-books/sources/ai-fundamentals-101.source.json");
const renderedPath = path.join(root, "content/library-books/rendered/ai-fundamentals-101.html");

function defects(markdown) {
  const errors = [];
  const required = [
    "Alright, LAiDIES: listen—or should we say, read?—up. This book is important.",
    "## 1. From “ARGH, WTF?” to “Ah. That’s why.”",
    "## 2. From “OMG, the end is nigh!” to “Ugh, as if.”",
    "## 3. From “Whatever” to “RSVP: Yes. I have notes.”",
    "## What we want this book to change",
    "https://www.bcs.org/articles-opinion-and-research/computings-too-important-to-be-left-to-men/",
    "## How This Book Works"
  ];
  for (const text of required) if (!markdown.includes(text)) errors.push(`missing approved preface marker: ${text}`);
  if (markdown.indexOf("## How This Book Works") < markdown.indexOf("## What we want this book to change")) {
    errors.push("reading guidance appears before the approved purpose-led preface is complete");
  }
  if (markdown.includes("AI is already part of decisions about jobs, education, health care")) {
    errors.push("the rejected system-map substitute is still present");
  }
  if (/read this book in three modes|Standard, Tell Me More!|Nerd Alert!/i.test(markdown)) {
    errors.push("the unavailable three-mode promise is present");
  }
  return errors;
}

const knownBad = `# Preface — Why This Book Matters\n\nAI is already part of decisions about jobs, education, health care, public services.\n\n## How This Book Works\n\nYou can also read this book in three modes: Standard, Tell Me More!, and Nerd Alert!`;
if (!defects(knownBad).length) {
  console.error("AI FUNDAMENTALS PREFACE CALIBRATION FAIL: known-bad preface was accepted");
  process.exit(1);
}

const markdown = fs.readFileSync(prefacePath, "utf8");
const errors = defects(markdown);
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const rendered = fs.readFileSync(renderedPath, "utf8");
if (source.contentVersion !== "ai-fundamentals-101-2026-08-24.6") errors.push("canonical source content version is stale");
if (!source.intro?.bodyHtml?.includes("Alright, LAiDIES: listen—or should we say, read?—up.")) errors.push("canonical source does not contain the approved opening");
if (!source.intro?.bodyHtml?.includes("computings-too-important-to-be-left-to-men")) errors.push("canonical source lost the verified BCS citation");
if (!rendered.includes("Alright, LAiDIES: listen—or should we say, read?—up.")) errors.push("rendered book does not contain the approved opening");
if (!rendered.includes("computings-too-important-to-be-left-to-men")) errors.push("rendered book lost the verified BCS citation");
if (errors.length) {
  console.error(`AI FUNDAMENTALS PREFACE FAIL\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("AI FUNDAMENTALS PREFACE PASS · known_bad_rejected=1 · approved_sections=3 · unavailable_modes=0 · citation=BCS");
