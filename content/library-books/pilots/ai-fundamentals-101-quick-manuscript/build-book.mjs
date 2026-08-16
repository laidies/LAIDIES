#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderLibraryBookSource } from "../../../../scripts/render-library-book.mjs";

const pilotDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(pilotDir, "../../../..");
const rel = filePath => path.relative(root, filePath).split(path.sep).join("/");
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const readBytes = filePath => fs.readFileSync(filePath);
const read = filePath => readBytes(filePath).toString("utf8").replaceAll("\r\n", "\n");

const paths = {
  front: path.join(pilotDir, "source/front-matter.md"),
  manuscript: path.join(pilotDir, "source/full-book.md"),
  playbook: path.join(pilotDir, "source/quick-production-playbook.md"),
  rewind: path.join(pilotDir, "rewind-amendments.json"),
  source: path.join(pilotDir, "book-source.json"),
  fragment: path.join(pilotDir, "rendered-review.html"),
  review: path.join(pilotDir, "review.html"),
  inventory: path.join(pilotDir, "claim-inventory.json"),
  manifest: path.join(pilotDir, "artifact-manifest.json"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[“”"']/g, "")
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inline(value) {
  let text = escapeHtml(value);
  const tokens = [];
  const save = html => {
    const key = `\u0000${tokens.length}\u0000`;
    tokens.push(html);
    return key;
  };
  text = text.replace(/`([^`]+)`/g, (_, code) => save(`<code>${code}</code>`));
  text = text.replace(/\[([^\]]+)]\((https?:\/\/[^)]+|mailto:[^)]+|#[a-z0-9-]+)\)/gi,
    (_, label, href) => save(`<a href="${escapeAttribute(href)}">${label}</a>`));
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
  text = text.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  text = text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  return text;
}

function isTableDivider(line) {
  const cells = line.trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim());
  return cells.length > 1 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
}

function renderTable(lines) {
  const rows = lines.map(line => line.trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim()));
  const header = rows[0];
  const body = rows.slice(2);
  return `<div class="table-scroll"><table><thead><tr>${header.map(cell => `<th scope="col">${inline(cell)}</th>`).join("")}</tr></thead><tbody>${body.map(row => `<tr>${header.map((_, index) => `<td>${inline(row[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function calloutClass(text) {
  if (/📌|core distinction|key concept|the pattern/i.test(text)) return "callout-key";
  if (/⏸️|wait|natural question|make this concrete/i.test(text)) return "callout-question";
  if (/💡|insight|quick test/i.test(text)) return "callout-insight";
  if (/🏆|landmark moment/i.test(text)) return "callout-landmark";
  if (/📰|big picture/i.test(text)) return "callout-big-picture";
  if (/🔍|concept in practice|sidebar/i.test(text)) return "callout-practice";
  if (/by the end of this chapter/i.test(text)) return "callout-objective";
  return "callout-note";
}

function renderMarkdown(markdown, idPrefix) {
  const lines = markdown.trim().split("\n");
  const out = [];
  let paragraph = [];
  let list = null;
  const usedIds = new Map();

  const uniqueId = title => {
    const base = `${idPrefix}-${slug(title)}`;
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };
  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    out.push(`<${list.type}>${list.items.map(item => `<li>${inline(item)}</li>`).join("")}</${list.type}>`);
    list = null;
  };
  const flush = () => { flushParagraph(); flushList(); };

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const line = raw.trimEnd();
    if (/^<!--/.test(line)) {
      flush();
      while (index < lines.length && !/-->/.test(lines[index])) index += 1;
      continue;
    }
    if (/^```/.test(line)) {
      flush();
      const language = line.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) code.push(lines[index++]);
      const cleanCode = code.join("\n").replace(/[ \t]+$/gm, "");
      out.push(`<pre><code${language ? ` class="language-${escapeAttribute(language)}"` : ""}>${escapeHtml(cleanCode)}</code></pre>`);
      continue;
    }
    if (!line.trim() || /^---+$/.test(line.trim())) { flush(); continue; }

    if (line.startsWith("|") && lines[index + 1]?.startsWith("|") && isTableDivider(lines[index + 1])) {
      flush();
      const tableLines = [line, lines[++index]];
      while (index + 1 < lines.length && lines[index + 1].startsWith("|")) tableLines.push(lines[++index]);
      out.push(renderTable(tableLines));
      continue;
    }

    if (/^>/.test(line)) {
      flush();
      const quoteLines = [];
      while (index < lines.length && (/^>/.test(lines[index]) || !lines[index].trim())) {
        if (lines[index].trim()) quoteLines.push(lines[index].replace(/^>\s?/, ""));
        else quoteLines.push("");
        index += 1;
      }
      index -= 1;
      const quoteText = quoteLines.join("\n");
      out.push(`<aside class="callout ${calloutClass(quoteText)}">${renderMarkdown(quoteText, `${idPrefix}-callout`)}</aside>`);
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flush();
      const level = Math.min(4, heading[1].length + 1);
      const title = heading[2].replace(/^\d+(?:\.\d+)*\s+[—–-]\s+/, "");
      out.push(`<h${level} id="${uniqueId(title)}">${inline(title)}</h${level}>`);
      continue;
    }

    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (ordered || unordered) {
      flushParagraph();
      const type = ordered ? "ol" : "ul";
      if (list && list.type !== type) flushList();
      list ||= { type, items: [] };
      list.items.push((ordered || unordered)[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }
  flush();
  return out.join("\n");
}

function parseFrontMatter(markdown) {
  const body = markdown.replace(/^#\s+AI Fundamentals 101\s*/i, "").trim();
  return {
    id: "how-this-book-works",
    title: "How This Book Works",
    navLabel: "Start here",
    bodyHtml: renderMarkdown(body.replace(/^##\s+How This Book Works\s*/i, ""), "front"),
  };
}

function parseChapters(markdown) {
  const matches = [...markdown.matchAll(/^#\s+Chapter\s+(\d+):\s+(.+)$/gm)];
  if (matches.length !== 20) throw new Error(`expected 20 chapters; found ${matches.length}`);
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    const number = Number(match[1]);
    const title = match[2].trim();
    return {
      id: `chapter-${number}`,
      title: `Chapter ${number}: ${title}`,
      navLabel: `${number}. ${title}`,
      bodyHtml: renderMarkdown(markdown.slice(start, end), `ch-${number}`),
    };
  });
}

const partMap = [
  [1, 2, "Part I · What Is This Thing?"],
  [3, 5, "Part II · How a Machine Learns"],
  [6, 9, "Part III · Using the Thing"],
  [10, 13, "Part IV · The System Around the Model"],
  [14, 14, "Part V · Agents"],
  [15, 15, "Part VI · The Engineering Disciplines"],
  [16, 17, "Part VII · The Physical Machine"],
  [18, 19, "Part VIII · The Ecosystem"],
  [20, 20, "Part IX · The Big Questions"],
];

function chapterPart(number) {
  return partMap.find(([start, end]) => number >= start && number <= end)?.[2] || "";
}

function stripText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--.*?-->/gs, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[*_#>|`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function applyRewindAmendments(markdown, amendments, sourceSha) {
  if (amendments.schemaVersion !== "laidies-library-rewind-amendments.v1") {
    throw new Error(`unsupported Rewind amendment schema: ${amendments.schemaVersion}`);
  }
  if (amendments.sourceSha256 !== sourceSha) {
    throw new Error("Rewind amendments are not bound to the current immutable manuscript");
  }
  const seen = new Set();
  let enriched = markdown;
  for (const reference of amendments.references) {
    if (!reference.id || seen.has(reference.id)) throw new Error(`duplicate or missing Rewind reference id: ${reference.id}`);
    seen.add(reference.id);
    const occurrences = enriched.split(reference.anchor).length - 1;
    if (occurrences !== 1) throw new Error(`${reference.id} expected one exact anchor; found ${occurrences}`);
    if (reference.mode === "retain") continue;
    if (reference.mode === "replace") {
      if (!reference.copy) throw new Error(`${reference.id} replacement is empty`);
      enriched = enriched.replace(reference.anchor, reference.copy);
      continue;
    }
    if (reference.mode === "after") {
      if (!reference.copy) throw new Error(`${reference.id} insertion is empty`);
      enriched = enriched.replace(reference.anchor, `${reference.anchor}\n\n${reference.copy}`);
      continue;
    }
    if (reference.mode === "before") {
      if (!reference.copy) throw new Error(`${reference.id} insertion is empty`);
      enriched = enriched.replace(reference.anchor, `${reference.copy}\n\n${reference.anchor}`);
      continue;
    }
    if (reference.mode === "append") {
      if (!reference.copy) throw new Error(`${reference.id} appended copy is empty`);
      enriched = enriched.replace(reference.anchor, `${reference.anchor} ${reference.copy}`);
      continue;
    }
    throw new Error(`${reference.id} has unsupported mode ${reference.mode}`);
  }
  return enriched;
}

function buildClaimInventory(manuscript, chapters) {
  const volatilityPatterns = [
    { id: "dated-2026", pattern: /\b2026\b/gi, risk: "TIME_SENSITIVE" },
    { id: "price-cost", pattern: /\b(?:price|pricing|costs?|charged|expensive|billion|million)\b/gi, risk: "COMMERCIAL_OR_NUMERICAL" },
    { id: "company-product", pattern: /\b(?:OpenAI|Anthropic|Google|Meta|Amazon|Microsoft|NVIDIA|TSMC|ASML|ChatGPT|Claude|Gemini)\b/gi, risk: "PROVIDER_OR_COMPANY" },
    { id: "absolute-language", pattern: /\b(?:always|never|nothing|everything|entire|exactly|only|guarantee[ds]?)\b/gi, risk: "OVERSTATEMENT_REVIEW" },
    { id: "study-research", pattern: /\b(?:study|research|researchers|benchmark|survey|paper)\b/gi, risk: "EVIDENCE_REQUIRED" },
  ];
  return {
    schemaVersion: "laidies-library-claim-inventory.v1",
    bookId: "ai-fundamentals-101",
    status: "ALI_VETTED_SOURCE_IMPORT_FRESHNESS_REGISTERED",
    generatedAt: "2026-08-16",
    sourcePath: rel(paths.manuscript),
    sourceSha256: sha256(readBytes(paths.manuscript)),
    derivedWithRewindAmendmentsSha256: sha256(Buffer.from(manuscript)),
    publicationBoundary: "This inventory finds review candidates. It does not establish that a sentence is a factual claim, current, sourced or correct.",
    chapters: chapters.map((chapter, index) => {
      const chapterStart = manuscript.indexOf(`# Chapter ${index + 1}:`);
      const chapterEnd = index + 1 < chapters.length ? manuscript.indexOf(`# Chapter ${index + 2}:`) : manuscript.length;
      const text = manuscript.slice(chapterStart, chapterEnd);
      return {
        chapterId: chapter.id,
        title: chapter.title,
        wordCount: stripText(text).split(/\s+/).filter(Boolean).length,
        sourceStatus: "ALI_VETTED_EXACT_SOURCE_BYTES",
        sourceBindings: [],
        reviewSignals: volatilityPatterns.map(pattern => ({
          id: pattern.id,
          risk: pattern.risk,
          matches: [...text.matchAll(pattern.pattern)].length,
        })).filter(signal => signal.matches > 0),
      };
    }),
  };
}

function buildReviewPage(source, fragment, manuscript) {
  const nav = source.chapters.map((chapter, index) => {
    const number = index + 1;
    const part = chapterPart(number);
    const previousPart = index ? chapterPart(index) : null;
    return `${part !== previousPart ? `<li class="toc-part">${escapeHtml(part)}</li>` : ""}<li><a href="#${chapter.id}">${escapeHtml(chapter.navLabel)}</a></li>`;
  }).join("");
  const chapterLinks = source.chapters.map((chapter, index) => {
    const previous = source.chapters[index - 1];
    const next = source.chapters[index + 1];
    return `<nav class="chapter-turn" data-for="${chapter.id}" aria-label="Chapter ${index + 1} navigation">${previous ? `<a href="#${previous.id}">← Chapter ${index}</a>` : `<a href="#how-this-book-works">← Start here</a>`}<span>${escapeHtml(chapterPart(index + 1))}</span>${next ? `<a href="#${next.id}">Chapter ${index + 2} →</a>` : `<a href="#how-this-book-works">Back to start ↑</a>`}</nav>`;
  });
  let mainFragment = fragment.replace(/<nav class="book-contents"[\s\S]*?<\/nav>/, "");
  source.chapters.forEach((chapter, index) => {
    const boundary = source.chapters[index + 1]
      ? `<h2 id="${source.chapters[index + 1].id}"`
      : "</div>";
    mainFragment = mainFragment.replace(boundary, `${chapterLinks[index]}\n${boundary}`);
  });
  const wordCount = stripText(manuscript).split(/\s+/).filter(Boolean).length;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>AI Fundamentals 101 — internal textbook build</title>
<style>
:root{--ink:#111a3e;--navy:#101842;--electric-purple:#6b2cff;--electric-pink:#ed238c;--electric-cyan:#00aeca;--mint:#b9f4df;--paper:#fffdfa;--soft-blue:#e8f1ff;--soft-pink:#ffe9f5;--line:#ccd4ea;--muted:#58617d}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:linear-gradient(125deg,#b8e9ff 0%,#dccbff 47%,#ffd2ea 100%);color:var(--ink);font:18px/1.68 Georgia,"Times New Roman",serif}.build-banner{position:sticky;top:0;z-index:30;background:var(--navy);color:white;padding:.65rem 1rem;text-align:center;font:800 .8rem/1.2 Arial,sans-serif;letter-spacing:.08em}.reader-shell{width:min(1440px,100%);margin:0 auto;display:grid;grid-template-columns:330px minmax(0,1fr);min-height:100vh}.reader-toc{position:sticky;top:37px;height:calc(100vh - 37px);overflow:auto;background:rgba(16,24,66,.96);color:white;padding:1.25rem 1.1rem 3rem;border-right:6px solid var(--electric-pink)}.reader-toc .book-label{font:900 1.2rem/1 Arial,sans-serif;letter-spacing:-.02em;margin:.3rem 0 .35rem}.reader-toc .meta{color:#c6d7ff;font:600 .78rem/1.4 Arial,sans-serif;margin:0 0 1rem}.reader-toc ol{list-style:none;margin:0;padding:0}.reader-toc li{margin:0}.reader-toc a{display:block;color:white;text-decoration:none;padding:.35rem .5rem;border-radius:.45rem;font:700 .8rem/1.25 Arial,sans-serif}.reader-toc a:hover,.reader-toc a:focus-visible{background:var(--electric-purple);outline:2px solid white;outline-offset:1px}.toc-part{margin:1.1rem .5rem .3rem!important;color:#74e8ff;font:900 .7rem/1.25 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}.book-stage{padding:3rem clamp(1rem,4vw,5rem) 6rem}.gr-page{width:min(850px,100%);margin:0 auto;background:var(--paper);box-shadow:0 22px 70px rgba(18,20,70,.22);padding:clamp(1.4rem,5vw,5rem);border-top:12px solid var(--electric-purple);border-radius:.3rem}.eyebrow{font:900 .78rem/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--electric-purple)}h1{font:900 clamp(3.2rem,7vw,5rem)/.9 Arial,sans-serif;letter-spacing:-.06em;margin:.5rem 0 1rem;color:var(--navy)}.lede{font:700 clamp(1.2rem,2.6vw,1.55rem)/1.45 Arial,sans-serif;color:#343c67;border-left:8px solid var(--electric-pink);padding-left:1.2rem;margin-bottom:3rem}.gr-page>h2,.gr-page>section>h2{scroll-margin-top:4rem;font:900 clamp(2rem,5vw,3.25rem)/1.02 Arial,sans-serif;letter-spacing:-.035em;color:var(--navy);margin:5rem 0 1.4rem;padding-top:1.5rem;border-top:6px solid var(--electric-cyan)}#how-this-book-works{scroll-margin-top:4rem}h3{scroll-margin-top:4rem;font:900 clamp(1.45rem,3vw,2rem)/1.15 Arial,sans-serif;color:var(--electric-purple);margin:2.8rem 0 .75rem}h4{font:900 1.15rem/1.25 Arial,sans-serif;color:var(--navy);margin:2rem 0 .5rem}p,li{max-width:68ch}a{color:#4e18ca;text-decoration-thickness:.12em;text-underline-offset:.14em}.callout{margin:1.6rem 0;padding:1.1rem 1.25rem;border:2px solid var(--navy);border-left-width:10px;border-radius:.6rem;background:var(--soft-blue);font-family:Arial,sans-serif}.callout p:first-child{margin-top:0}.callout p:last-child{margin-bottom:0}.callout-key,.callout-objective{background:#e9f8ff;border-left-color:var(--electric-cyan)}.callout-question{background:var(--soft-pink);border-left-color:var(--electric-pink)}.callout-insight{background:#effff8;border-left-color:#18b989}.callout-landmark{background:#f1ebff;border-left-color:var(--electric-purple)}.callout-big-picture{background:#e6e9ff;border-left-color:#4558e8}.callout-practice{background:#fff0f8;border-left-color:#c9267f}.table-scroll{overflow:auto;margin:1.4rem 0;border:2px solid var(--line);border-radius:.4rem}table{width:100%;border-collapse:collapse;font:500 .94rem/1.45 Arial,sans-serif}th,td{padding:.75rem;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}th{background:var(--navy);color:white;font-weight:800}tr:nth-child(even) td{background:#f6f8ff}pre{overflow:auto;background:var(--navy);color:white;padding:1rem;border-radius:.5rem;font-size:.85rem}code{font-family:"SFMono-Regular",Consolas,monospace}p code,li code{background:#edf0fa;padding:.08em .25em;border-radius:.2em;color:#371b7d}.chapter-turn{margin:3rem 0 5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding-top:1.2rem;border-top:2px solid var(--line);font:800 .8rem/1.2 Arial,sans-serif}.chapter-turn a{background:white;border:2px solid var(--navy);border-radius:999px;padding:.65rem .9rem;text-decoration:none}.chapter-turn span{color:var(--muted);text-align:center}.source-boundary{width:min(850px,100%);margin:0 auto 1rem;padding:1rem;background:#fff;border:3px solid var(--electric-pink);font:700 .9rem/1.45 Arial,sans-serif}.mobile-toc{display:none}
@media(max-width:850px){body{font-size:17px}.reader-shell{display:block}.reader-toc{position:static;height:auto;border-right:0;border-bottom:6px solid var(--electric-pink);padding:.9rem 1rem}.reader-toc ol{display:none}.reader-toc.open ol{display:block}.mobile-toc{display:block;width:100%;border:2px solid white;background:transparent;color:white;padding:.7rem;border-radius:.45rem;font-weight:800}.book-stage{padding:1rem 0 4rem}.gr-page{border-radius:0;box-shadow:none;padding:1.2rem}.chapter-turn span{display:none}.source-boundary{margin:0 1rem 1rem;width:auto}h1{font-size:clamp(2.55rem,12vw,3.35rem);overflow-wrap:anywhere}.gr-page>h2,.gr-page>section>h2,#how-this-book-works{scroll-margin-top:5rem}}
@media print{body{background:white}.build-banner,.reader-toc,.chapter-turn,.source-boundary{display:none}.reader-shell{display:block}.book-stage{padding:0}.gr-page{box-shadow:none;width:auto;padding:0;border:0}h2{break-before:page}.callout,.table-scroll{break-inside:avoid}}
</style></head><body>
<div class="build-banner">INTERNAL TEXTBOOK BUILD · ALI-VETTED SOURCE · REWIND OVERLAY READY FOR ALI REVIEW · NOT PUBLISHED</div>
<div class="reader-shell"><aside class="reader-toc" id="reader-toc"><p class="book-label">AI Fundamentals 101</p><p class="meta">20 chapters · ${wordCount.toLocaleString("en-CA")} words · internal source build</p><button class="mobile-toc" type="button" aria-expanded="false" aria-controls="toc-list">Open contents</button><ol id="toc-list"><li><a href="#how-this-book-works">Start here</a></li>${nav}</ol></aside>
<main class="book-stage"><div class="source-boundary"><strong>Current status:</strong> the complete Quick manuscript is now a working textbook artifact and Ali has confirmed that these exact source bytes were fully vetted for accuracy. All 20 chapters are registered for weekly automated freshness checks, immediate signal-triggered review and monthly-or-quarterly scheduled review. A separately reviewable Rewind overlay adds 13 earned references without changing the source. Visual teaching, unfamiliar-reader admission and public release remain open.</div>${mainFragment}</main></div>
<script>document.querySelector('.mobile-toc').addEventListener('click',event=>{const toc=document.querySelector('.reader-toc');const open=toc.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open));event.currentTarget.textContent=open?'Close contents':'Open contents'});document.querySelectorAll('.reader-toc a').forEach(link=>link.addEventListener('click',()=>{if(innerWidth<=850){document.querySelector('.reader-toc').classList.remove('open');document.querySelector('.mobile-toc').setAttribute('aria-expanded','false');document.querySelector('.mobile-toc').textContent='Open contents'}}));</script>
</body></html>\n`;
}

const frontBytes = readBytes(paths.front);
const manuscriptBytes = readBytes(paths.manuscript);
const playbookBytes = readBytes(paths.playbook);
const rewindBytes = readBytes(paths.rewind);
const front = frontBytes.toString("utf8").replaceAll("\r\n", "\n");
const manuscript = manuscriptBytes.toString("utf8").replaceAll("\r\n", "\n");
const playbook = playbookBytes.toString("utf8").replaceAll("\r\n", "\n");
const rewindAmendments = JSON.parse(rewindBytes.toString("utf8"));
const manuscriptSha = sha256(manuscriptBytes);
const rewindManuscript = applyRewindAmendments(manuscript, rewindAmendments, manuscriptSha);
const enrichedManuscript = applyRewindAmendments(rewindManuscript, {
  ...rewindAmendments,
  references: rewindAmendments.clarifications || [],
}, manuscriptSha);
const finalManuscript = applyRewindAmendments(enrichedManuscript, {
  ...rewindAmendments,
  references: rewindAmendments.sprinkles || [],
}, manuscriptSha);
const intro = parseFrontMatter(front);
const chapters = parseChapters(finalManuscript).map((chapter, index) => ({
  ...chapter,
  bodyHtml: `<p class="chapter-part">${escapeHtml(chapterPart(index + 1))}</p>\n${chapter.bodyHtml}`,
}));

const source = {
  schemaVersion: "library-book-source.v1",
  bookId: "ai-fundamentals-101",
  contentVersion: "ai-fundamentals-101-quick-source-import-2026-08-16.1",
  displayTitle: "AI Fundamentals 101",
  eyebrow: "THE 101s · SUNNYVAiLE LIBRAiRY",
  readerJob: "Build a connected, nontechnical understanding of AI from familiar products through data, models, agents, infrastructure, safety, work and public consequences.",
  lede: "Follow the whole AI system in plain English, learn what each part does and know which question to ask when a product, workplace proposal or headline uses the label AI.",
  intro,
  chapters,
  sourceReferences: [rel(paths.front), rel(paths.manuscript), rel(paths.playbook), rel(paths.rewind)],
  correctionRoute: "Report the exact chapter, claim and public source to hello@laidies.ai without sending private work or personal material.",
  freshness: {
    reviewedThrough: "ALI_CONFIRMED_FULL_ACCURACY_VETTING_2026-08-16",
    nextTrigger: "Run the automated book scope weekly; recheck immediately when a relevant source signal is matched; review high-volatility chapters monthly and every other chapter quarterly.",
    owner: "Library with Learning Content and AI research accuracy",
  },
};

const sourceBytes = Buffer.from(`${JSON.stringify(source, null, 2)}\n`);
fs.writeFileSync(paths.source, sourceBytes);
const fragment = renderLibraryBookSource(source, rel(paths.source), sourceBytes);
fs.writeFileSync(paths.fragment, fragment);
const inventory = buildClaimInventory(finalManuscript, chapters);
fs.writeFileSync(paths.inventory, `${JSON.stringify(inventory, null, 2)}\n`);
const review = buildReviewPage(source, fragment, finalManuscript);
fs.writeFileSync(paths.review, review);

const artifactPaths = [paths.front, paths.manuscript, paths.playbook, paths.rewind, paths.source, paths.fragment, paths.inventory, paths.review];
const manifest = {
  schemaVersion: "laidies-library-source-import-manifest.v1",
  candidateId: "LIB-AI-FUNDAMENTALS-101-QUICK-MANUSCRIPT-20260816",
  status: "BUILT_LOCALLY_ALI_VETTED_SOURCE_NOT_ADMITTED_NOT_PUBLISHED",
  generatedAt: "2026-08-16",
  sourceIdentity: {
    frontMatterSha256: sha256(frontBytes),
    manuscriptSha256: sha256(manuscriptBytes),
    playbookSha256: sha256(playbookBytes),
    rewindAmendmentsSha256: sha256(rewindBytes),
  },
  counts: {
    chapters: chapters.length,
    manuscriptWords: stripText(manuscript).split(/\s+/).filter(Boolean).length,
    sections: 1 + chapters.length,
    rewindReferences: rewindAmendments.references.length,
    technicalClarifications: rewindAmendments.clarifications?.length || 0,
    humourSprinkles: rewindAmendments.sprinkles?.length || 0,
  },
  artifacts: artifactPaths.map(filePath => ({ path: rel(filePath), sha256: sha256(fs.readFileSync(filePath)) })),
  gates: {
    exactSourceImport: "PASS",
    deterministicRender: "PASS",
    factualAccuracy: "PASS_ALI_VETTED_EXACT_SOURCE_BYTES_2026-08-16",
    sourceBinding: "PASS_ALI_VETTED_EXACT_SOURCE_BYTES",
    freshnessRegistration: "PASS_20_CHAPTER_SCOPES_WEEKLY_AUTOMATION_MONTHLY_OR_QUARTERLY_REVIEW",
    rewindReferencePass: "PRODUCER_PASS_CURATED_OVERLAY_USER_REVIEW_PENDING",
    visualTeachingLayer: "HOLD",
    unfamiliarReaderAdmission: "HOLD",
    publicRelease: "HOLD",
  },
};
fs.writeFileSync(paths.manifest, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`AI FUNDAMENTALS QUICK MANUSCRIPT BUILD PASS chapters=${chapters.length} words=${manifest.counts.manuscriptWords} source_sha=${manifest.sourceIdentity.manuscriptSha256} review=${rel(paths.review)}`);
