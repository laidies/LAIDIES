#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RENDERER_VERSION = "library-book-renderer.v2";
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

export function validateRenderableSource(source) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(source?.schemaVersion === "library-book-source.v1", "source schema must be library-book-source.v1");
  require(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source?.bookId || ""), "source bookId is invalid");
  for (const key of ["contentVersion", "displayTitle", "readerJob", "lede", "correctionRoute"]) {
    require(typeof source?.[key] === "string" && source[key].trim(), `source ${key} is required`);
  }
  require(Array.isArray(source?.sourceReferences) && source.sourceReferences.length > 0, "sourceReferences are required");
  require(source?.freshness && source.freshness.reviewedThrough && source.freshness.nextTrigger && source.freshness.owner, "freshness contract is required");
  require(source?.edition && source.edition.reviewedOn && source.edition.summary && source.edition.changeHistory, "visible edition record is required");
  const sections = [source?.intro, ...(Array.isArray(source?.chapters) ? source.chapters : [])];
  require(Array.isArray(source?.chapters) && source.chapters.length >= 2, "at least two authored chapters are required");
  const ids = [];
  for (const section of sections) {
    require(section && typeof section === "object", "every section must be an object");
    if (!section) continue;
    require(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id || ""), "section id is invalid");
    require(typeof section.title === "string" && section.title.trim(), `${section.id || "section"} title is required`);
    require(typeof section.navLabel === "string" && section.navLabel.trim(), `${section.id || "section"} navLabel is required`);
    require(typeof section.bodyHtml === "string" && section.bodyHtml.trim().length >= 40, `${section.id || "section"} bodyHtml is incomplete`);
    ids.push(section.id);
  }
  require(new Set(ids).size === ids.length, "section ids must be unique");
  return errors;
}

export function renderLibraryBookSource(source, canonicalPath, sourceBytes = Buffer.from(JSON.stringify(source, null, 2) + "\n")) {
  const errors = validateRenderableSource(source);
  if (errors.length) throw new Error(errors.join("; "));
  const sourceSha = sha256(sourceBytes);
  const sections = [source.intro, ...source.chapters];
  const body = sections.map((section, index) => `${index ? `<h2 id="${escapeAttribute(section.id)}" data-source-block="${escapeAttribute(section.id)}">${section.title}</h2>` : `<section id="${escapeAttribute(section.id)}" data-source-block="${escapeAttribute(section.id)}"><h2>${section.title}</h2>`}${section.bodyHtml}${index ? "" : "</section>"}`).join("\n\n");
  const edition = `<details class="book-edition-note"><summary>Edition reviewed ${escapeAttribute(source.edition.reviewedOn)}</summary><p>${source.edition.summary}</p><p><strong>What changed:</strong> ${source.edition.changeHistory}</p></details>`;
  return `<meta name="laidies:content-version" content="${escapeAttribute(source.contentVersion)}">\n<meta name="laidies:canonical-source" content="/${escapeAttribute(canonicalPath)}">\n<meta name="laidies:canonical-source-sha256" content="${sourceSha}">\n<meta name="laidies:renderer-version" content="${RENDERER_VERSION}">\n<div class="gr-page" data-book-id="${escapeAttribute(source.bookId)}">\n${source.eyebrow ? `<p class="eyebrow">${source.eyebrow}</p>\n` : ""}<h1>${source.displayTitle}</h1>\n<p class="lede">${source.lede}</p>\n${edition}\n${body}\n</div>\n`;
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  const sourcePath = process.argv[2];
  const outputPath = process.argv[3];
  if (!sourcePath || !outputPath) {
    console.error("usage: node scripts/render-library-book.mjs <source.json> <output.html>");
    process.exit(2);
  }
  const sourceBytes = fs.readFileSync(sourcePath);
  const source = JSON.parse(sourceBytes.toString("utf8"));
  const rendered = renderLibraryBookSource(source, sourcePath, sourceBytes);
  fs.writeFileSync(outputPath, rendered);
  console.log(`LIBRARY BOOK RENDER PASS book=${source.bookId} output=${outputPath} sha256=${sha256(rendered)}`);
}
