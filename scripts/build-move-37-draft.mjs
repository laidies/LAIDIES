#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { renderLibraryBookSource } from "./render-library-book.mjs";

const root = process.cwd();
const manuscriptPath = "content/library-books/sources/move-37.manuscript.md";
const sourcePath = "content/library-books/sources/move-37.source.json";
const renderedPath = "content/library-books/rendered/move-37.html";

const escapeHtml = value => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

function inline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function bodyHtml(lines) {
  const out = [];
  let paragraph = [];
  let list = [];
  const flushParagraph = () => {
    if (paragraph.length) out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) out.push(`<ul>${list.map(item => `<li>${inline(item)}</li>`).join("")}</ul>`);
    list = [];
  };
  for (const line of [...lines, ""]) {
    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  return out.join("");
}

const raw = fs.readFileSync(path.join(root, manuscriptPath), "utf8");
const parts = raw.split(/^## /m).slice(1);
const parsedSections = parts.map(part => {
  const lines = part.split("\n");
  const [id, navLabel, title] = lines.shift().split(" | ").map(value => value.trim());
  if (!id || !navLabel || !title) throw new Error(`invalid section header: ${part.slice(0, 100)}`);
  return { id, navLabel, title, bodyHtml: bodyHtml(lines) };
});
const readingOrder = [
  "start-here",
  "invisible-editor",
  "parallel-machines",
  "labelled-world",
  "machines-hear",
  "language-looks-back",
  "generative-contest",
  "move-thirty-seven",
  "transformer-turn",
  "practice-without-labels",
  "protein-puzzle",
  "pictures-from-noise",
  "assistant-arrives",
  "science-searches",
  "who-controls",
  "what-comes-next",
  "sources-and-updates"
];
const byId = new Map(parsedSections.map(section => [section.id, section]));
const sections = readingOrder.map(id => byId.get(id));
if (sections.some(section => !section) || sections.length !== parsedSections.length) throw new Error("reading order does not match manuscript sections");
if (sections.length < 3 || sections[0].id !== "start-here") throw new Error("manuscript must begin with start-here and contain chapters");

const sourceReferences = [...new Set([...raw.matchAll(/https?:\/\/[^)\s]+/g)].map(match => match[0]))];
const source = {
  schemaVersion: "library-book-source.v1",
  bookId: "move-37",
  contentVersion: "breakthroughs-that-changed-modern-ai-2026-08-24.draft-2",
  displayTitle: "The Breakthroughs That Changed Modern AI",
  eyebrow: "A LIVING HISTORY · 2000 TO TODAY · SUNNYVAiLE LIBRAiRY",
  readerJob: "Understand the pivotal changes that produced modern AI, what each one made possible and where the evidence stops.",
  lede: "Modern AI came from faster chips, larger datasets, better training methods, harder tests and interfaces ordinary people could actually use.",
  intro: sections[0],
  chapters: sections.slice(1),
  sourceReferences,
  correctionRoute: "Send the LIBRAiRY owner the chapter, exact sentence, supporting source and proposed correction. Accepted changes produce a new content version and exact review.",
  freshness: {
    reviewedThrough: "2026-08-24",
    nextTrigger: "New primary evidence, correction or retraction affecting a named landmark; durable evidence that a watchlist candidate removed a real constraint; or a reader-comprehension failure.",
    owner: "LAiDIES LIBRAiRY with AI research accuracy and Learning System review"
  }
};

const sourceBytes = Buffer.from(`${JSON.stringify(source, null, 2)}\n`);
fs.writeFileSync(path.join(root, sourcePath), sourceBytes);
const rendered = renderLibraryBookSource(source, sourcePath, sourceBytes);
fs.writeFileSync(path.join(root, renderedPath), rendered);
console.log(`MOVE 37 DRAFT BUILD PASS sections=${sections.length} sources=${sourceReferences.length} rendered=${renderedPath}`);
