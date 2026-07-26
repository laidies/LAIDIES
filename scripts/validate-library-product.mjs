#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.LIBRARY_ROOT || process.cwd());
const read = (relative) =>
  fs.readFileSync(path.join(root, relative), "utf8");
const page = read("library.html");
const puffies = read("content/site/puffy-bookmarks.js");

const match = page.match(/const SECTIONS=(\[[\s\S]*?\]);\nconst ADMITTED_BOOK_SOURCES=/);
if (!match) throw new Error("LIBRAiRY catalogue manifest is not parseable");
const sections = Function("B", `"use strict"; return (${match[1]});`)(
  "assets/library-101/bright-family-v2/"
);
const books = sections.flatMap((section) => section.books);
const ids = new Set();
const allowed = new Set(["available", "preview", "hold", "not-published"]);

if (books.length !== 15) throw new Error(`expected 15 books, found ${books.length}`);
for (const book of books) {
  if (!book.id || ids.has(book.id)) throw new Error(`duplicate/missing book id ${book.id}`);
  ids.add(book.id);
  if (!allowed.has(book.status)) throw new Error(`${book.id} has invalid status`);
  if (!book.statusLabel) throw new Error(`${book.id} lacks a visible status label`);
  if (book.status === "available" && !book.src) {
    throw new Error(`${book.id} is available without a source`);
  }
}

const counts = Object.fromEntries(
  [...allowed].map((status) => [
    status,
    books.filter((book) => book.status === status).length
  ])
);
if (counts.hold !== 8 || counts.preview !== 7 || counts.available !== 0) {
  throw new Error(`unexpected truthful catalogue state ${JSON.stringify(counts)}`);
}

for (const contract of [
  "function bookIsAvailable(b)",
  "const ADMITTED_BOOK_SOURCES=Object.freeze({",
  "const ALL=Object.freeze(",
  "function exactAdmittedBookSource(id)",
  "function admittedBook(id)",
  "url.origin!==location.origin",
  "url.pathname!==source",
  "credentials:'same-origin',redirect:'error'",
  "if(!publication)",
  "data-library-status",
  "short shelf description is not a substitute",
  "Miss Jeeves and saved links cannot open it until that review clears"
]) {
  if (!page.includes(contract)) throw new Error(`missing page contract: ${contract}`);
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
if (puffies.includes("var a = document.createElement('a');")) {
  throw new Error("Puffy board still nests a button inside a link");
}

console.log(
  `LIBRAiRY CONTRACT PASS · books=${books.length} · hold=${counts.hold} · preview=${counts.preview} · available=${counts.available} · Puffy write/read truth`
);
