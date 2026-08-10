#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = "content/library-books/pilots/ai-fundamentals-101-v4";
const sourcePath = `${base}/introduction-and-chapter-1-r7.md`;
const renderedPath = `${base}/rendered/introduction-and-chapter-1-r7.html`;
const manifestPath = `${base}/r7-artifact-manifest.json`;
const candidateId = "LIB-AI-FUNDAMENTALS-101-INTRO-CH1-R7-SUCCESSOR-16";

const bytes = relative => fs.readFileSync(path.join(root, relative));
const read = relative => bytes(relative).toString("utf8");
const sha = relative => crypto.createHash("sha256").update(bytes(relative)).digest("hex");
const bind = relative => ({ path: relative, sha256: sha(relative) });
const write = (relative, value) => {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value);
};

function inline(value) {
  return value
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function render(markdown) {
  const lines = markdown.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (/^---+$/.test(line.trim())) { out.push("<hr>"); i += 1; continue; }
    const heading = /^(#{1,5})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const label = heading[2];
      const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const classes = [
        /^[123]\. /.test(label) ? "intro-reason" : "",
        label.startsWith("Go deeper") ? "go-deeper-heading" : "",
        label === "Sources and freshness" ? "source-heading" : "",
        label === "Recognise it" || label === "Explain it" || label === "Draw it" || label === "Use it" ? "check-heading" : ""
      ].filter(Boolean).join(" ");
      out.push(`<h${level}${classes ? ` class="${classes}"` : ""} id="${slug}">${inline(label)}</h${level}>`);
      i += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      const parts = [];
      while (i < lines.length && lines[i].startsWith("> ")) parts.push(lines[i++].slice(2));
      out.push(`<blockquote>${inline(parts.join(" "))}</blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ""));
      out.push(`<ul>${items.map(item => `<li>${inline(item)}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ""));
      out.push(`<ol>${items.map(item => `<li>${inline(item)}</li>`).join("")}</ol>`);
      continue;
    }
    if (line.startsWith("|") && i + 1 < lines.length && /^\|?\s*:?-+/.test(lines[i + 1])) {
      const cells = row => row.split("|").slice(1, -1).map(cell => cell.trim());
      const headers = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(cells(lines[i++]));
      out.push(`<div class="table-wrap"><table><thead><tr>${headers.map(cell => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td data-label="${inline(headers[index] || "")}">${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,5})\s+|^---+$|^>\s+|^[-*]\s+|^\d+\.\s+|^\|/.test(lines[i])) paragraph.push(lines[i++]);
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
  }
  return out.join("\n");
}

const markdown = read(sourcePath);
const forbidden = [
  ["Nerd-O-Meter", "R7 must not restore the global Nerd-O-Meter"],
  ["chapter-1-how-ai-types-fit-together.svg", "R7 must not restore the rejected R6 diagram"],
  ["Pokémon", "R7 must not use the excluded reference"]
];
for (const [needle, message] of forbidden) if (markdown.includes(needle)) throw new Error(message);
for (const required of [
  "thou shalt not forsaketh the AI",
  "bro friends in crypto",
  "words have escaped the lab and are now breeding in PowerPoint",
  "AI is the broad field. Machine learning is one important way",
  "An agent can stop.",
  "There is no universally accepted definition or test for AGI.",
  "## Check that the labels now make sense",
  "## Key Definitions"
]) if (!markdown.includes(required)) throw new Error(`Required R7 teaching or authorial-flow evidence is missing: ${required}`);

const body = render(markdown);
const html = `<!doctype html>
<html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Fundamentals 101: Introduction and Chapter 1 R7</title>
<style>
:root{--ink:#2a1844;--plum:#4c2377;--violet:#6b36a5;--pink:#e34395;--teal:#008fa9;--yellow:#ffd85a;--lav:#f4effb;--blue:#e9f8fb;--rule:#cdbbe2;--paper:#fff;--desk:#ece8f2;--muted:#655a71}
*{box-sizing:border-box}html{font:19px/1.68 Arial,Helvetica,sans-serif;background:var(--desk);color:var(--ink)}body{margin:0}.page{width:min(100%,800px);margin:auto;padding:3.7rem 4rem 6rem;background:var(--paper);box-shadow:0 0 0 1px #d8cfe3,0 12px 36px rgba(42,24,68,.12)}
h1,h2,h3,h4{font-family:Arial,Helvetica,sans-serif;line-height:1.14;text-wrap:balance;color:var(--plum);margin:2.6rem 0 .9rem}h1{font-size:2.55rem;border-top:10px solid var(--pink);padding-top:.9rem}h1:first-child{margin-top:0}h2{font-size:1.68rem;border-bottom:5px solid var(--pink);padding-bottom:.35rem;margin-top:3.6rem}h3{font-size:1.3rem;color:#a3206d}h4{font-size:1.08rem}.intro-reason{font-size:1.13rem;background:var(--plum);color:#fff;padding:.7rem .85rem;border-left:9px solid var(--pink);box-shadow:6px 6px 0 #efb0d1;margin-top:2.4rem}.go-deeper-heading{background:var(--blue);border:3px solid var(--teal);padding:.7rem .9rem;margin-top:2.4rem;box-shadow:6px 6px 0 #a9dfeb;color:#075e71}.go-deeper-heading+p,.go-deeper-heading~p{ }.check-heading{background:var(--yellow);border:2px solid var(--plum);padding:.55rem .75rem;box-shadow:5px 5px 0 #e8b430;margin-top:2.2rem}p{margin:1rem 0 1.3rem}li{margin:.5rem 0 .7rem}ul,ol{padding-left:1.5rem}blockquote{margin:2rem 0;padding:1rem 1.15rem;background:var(--lav);border:3px solid var(--plum);box-shadow:7px 7px 0 #e9acd0;font-size:1.08rem;font-weight:800}.table-wrap{margin:1.6rem 0;border:2px solid var(--plum);box-shadow:6px 6px 0 var(--rule);overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:.91rem}th{background:var(--plum);color:#fff;text-align:left}th,td{padding:.8rem;border:1px solid var(--rule);vertical-align:top}tbody tr:nth-child(even){background:#faf8fd}hr{border:0;border-top:4px double var(--rule);margin:3.5rem 0}.source-heading{font-size:.78rem;color:var(--muted);border:0;margin-top:3rem}.source-heading+p{font-size:.75rem;line-height:1.5;color:var(--muted);border-top:1px solid var(--rule);padding-top:.7rem}a{color:#8d1d65}code{font-size:.9em}
@media(max-width:680px){html{font-size:18px}.page{width:100%;padding:2.4rem 1.15rem 4rem;box-shadow:none}h1{font-size:2.05rem}h2{font-size:1.45rem}.intro-reason{font-size:1.02rem}.table-wrap{border:0;box-shadow:none;overflow:visible}.table-wrap table,.table-wrap tbody,.table-wrap tr,.table-wrap td{display:block;width:100%}.table-wrap thead{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.table-wrap tr{border:2px solid var(--plum);margin-bottom:.9rem;box-shadow:4px 4px 0 var(--rule)}.table-wrap td{display:grid;grid-template-columns:minmax(7rem,38%) 1fr;gap:.65rem;border:0;border-bottom:1px solid var(--rule);background:#fff}.table-wrap td::before{content:attr(data-label);font-weight:800;color:var(--plum)}}
@media(max-width:390px){.page{padding-left:.9rem;padding-right:.9rem}.table-wrap td{grid-template-columns:1fr;gap:.2rem}}
</style></head><body><main class="page">${body}</main></body></html>\n`;

write(renderedPath, html);
const manifest = {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId,
  surface: "LIBRAIRY",
  contentClass: "EXPLANATION",
  reviewText: bind(sourcePath),
  rendered: bind(renderedPath),
  visualAssets: []
};
write(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`R7 BUILD COMPLETE source=${sha(sourcePath)} rendered=${sha(renderedPath)} manifest=${sha(manifestPath)}`);
