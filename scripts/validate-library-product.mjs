#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(process.env.LIBRARY_ROOT || process.cwd());
const read = (relative) =>
  fs.readFileSync(path.join(root, relative), "utf8");
const page = read("library.html");
const puffies = read("content/site/puffy-bookmarks.js");
const card = read("laidies-card.html");

const match = page.match(
  /const SECTIONS=(\[[\s\S]*?\]);\nconst ADMITTED_BOOK_(?:SOURCES|RECORDS)=/
);
if (!match) throw new Error("LIBRAiRY catalogue manifest is not parseable");
const sections = Function("B", `"use strict"; return (${match[1]});`)(
  "assets/library-101/bright-family-v2/"
);
const books = sections.flatMap((section) => section.books);
const compiledMatch = page.match(
  /\/\* LIBRARY_ADMISSION_COMPILED_START \*\/\n([\s\S]*?)\n\/\* LIBRARY_ADMISSION_COMPILED_END \*\//
);
if (!compiledMatch) throw new Error("compiled Library admission is not parseable");
const admitted = JSON.parse(compiledMatch[1]);
const localReviewMatch = page.match(
  /const LOCAL_REVIEW_BOOK_RECORDS=Object\.freeze\(\{([\s\S]*?)\n\}\);/
);
if (!localReviewMatch) throw new Error("local-review Library admission is not parseable");
let localReviewBody = localReviewMatch[1];
if (process.env.LIBRARY_CONTRACT_CALIBRATION === "stale-local-review") {
  localReviewBody = localReviewBody.replace(
    /(artifactSha256:')[a-f0-9]{64}(')/,
    `$1${"0".repeat(64)}$2`
  );
}
if (process.env.LIBRARY_CONTRACT_CALIBRATION === "unauthorized-admission") {
  admitted["unauthorized-fixture"] = {
    sourcePath: "/content/library-books/rendered/briefing-101.html",
    contentVersion: "briefing-101-2026-08-05.1",
    admissionVersion: "unauthorized-calibration",
    correctionState: "clear",
    artifactSha256: "0".repeat(64)
  };
}
const ids = new Set();
const allowed = new Set(["ready", "preview", "hold", "not-published"]);

if (books.length !== 17) throw new Error(`expected 17 books, found ${books.length}`);
for (const book of books) {
  if (!book.id || ids.has(book.id)) throw new Error(`duplicate/missing book id ${book.id}`);
  ids.add(book.id);
  if (!allowed.has(book.status)) throw new Error(`${book.id} has invalid status`);
  if (!book.statusLabel) throw new Error(`${book.id} lacks a visible status label`);
  if (book.status === "ready" && !admitted[book.id]) {
    throw new Error(`${book.id} is ready without compiled admission`);
  }
}

const counts = Object.fromEntries(
  [...allowed].map((status) => [
    status,
    books.filter((book) => book.status === status).length
  ])
);
if (counts.hold !== 6 || counts.preview !== 7 || counts.ready !== 4) {
  throw new Error(`unexpected truthful catalogue state ${JSON.stringify(counts)}`);
}
const expectedAdmitted = ["ai-dictionary", "ai-fundamentals-101", "straight-answers", "working-with-ai-101"];
if (JSON.stringify(Object.keys(admitted).sort()) !== JSON.stringify(expectedAdmitted)) {
  throw new Error(`unexpected compiled Library admission ${JSON.stringify(Object.keys(admitted))}`);
}
for (const [id, record] of Object.entries(admitted)) {
  const target = path.join(root, record.sourcePath.replace(/^\/+/, ""));
  if (!fs.existsSync(target)) throw new Error(`${id} admitted source is missing`);
  const actual = crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex");
  if (actual !== record.artifactSha256) throw new Error(`${id} admitted source hash is stale`);
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const localHash = localReviewBody.match(
    new RegExp(`'${escapedId}':Object\\.freeze\\(\\{[^}]*artifactSha256:'([a-f0-9]{64})'`)
  )?.[1];
  if (localHash !== record.artifactSha256) {
    throw new Error(`${id} local-review source hash is stale`);
  }
}

for (const contract of [
  "function bookIsAvailable(b)",
  "const ALL=Object.freeze(",
  "function admittedBook(id)",
  "url.origin!==location.origin",
  "url.pathname!==source",
  "credentials:'same-origin',redirect:'error'",
  "if(!publication)",
  "data-library-status",
  "short shelf description is not a substitute",
  "Try another book marked Ready"
]) {
  if (!page.includes(contract)) throw new Error(`missing page contract: ${contract}`);
}
if (
  !page.includes("const ADMITTED_BOOK_SOURCES=Object.freeze({") &&
  !page.includes("const ADMITTED_BOOK_RECORDS=Object.freeze(")
) {
  throw new Error("missing private admitted-book authority");
}
if (
  !page.includes("function exactAdmittedBookSource(id)") &&
  !page.includes("function exactAdmittedBookRecord(id)")
) {
  throw new Error("missing exact admitted-book validation");
}
if (page.includes("window.LAIDIES_LIBRARY_CATALOGUE")) {
  throw new Error("live catalogue authority must remain private");
}

for (const contract of [
  "function canonicalBoardRecord(record)",
  "function normalizeBoard(value)",
  "function safeLocalRoute(value)",
  "function exactIsoDate(value)",
  "PUFFY_PAGE_ROUTES",
  "BOARD_FIELDS",
  "BOARD_SCHEMA_VERSION",
  "book_id",
  "section_id",
  "content_version",
  "data-puffy-migrated",
  "window.addEventListener('storage'",
  "data-puffy-visitor-state",
  "LAIDIES_PUFFY_VERIFIED_ACCOUNT",
  "stickerByFile(record.sticker)",
  "data-puffy-recovered",
  "damaged or unsafe device-local Puffy",
  "localStorage.getItem(KEY) !== serialized",
  "Nothing was saved or removed",
  "data-puffy-storage",
  "puffy-item-main"
]) {
  if (!puffies.includes(contract)) {
    throw new Error(`missing Puffy persistence contract: ${contract}`);
  }
}
for (const copy of [
  "not owned books, rewards, account history or synced saves",
  "current admission status can be checked again",
  'id="puffyVisitorState"'
]) {
  if (!card.includes(copy)) throw new Error(`missing Closet visitor-state truth: ${copy}`);
}
if (puffies.includes("var a = document.createElement('a');")) {
  throw new Error("Puffy board still nests a button inside a link");
}

console.log(
  `LIBRAiRY CONTRACT PASS · books=${books.length} · hold=${counts.hold} · preview=${counts.preview} · ready=${counts.ready} · admitted=${Object.keys(admitted).length} · Puffy write/read truth`
);
