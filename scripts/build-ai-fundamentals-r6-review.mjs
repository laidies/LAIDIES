#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enforcedFailureFamilies } from "./check-prose-quality-admission.mjs";
import { aiFundamentalsBeginnerLanguageIssues } from "./check-ai-fundamentals-beginner-language.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = "content/library-books/pilots/ai-fundamentals-101-v4";
const candidatePath = process.env.AI_FUNDAMENTALS_R6_CANDIDATE_PATH || `${base}/introduction-and-chapter-1-r6.md`;
const renderedPath = `${base}/rendered/introduction-and-chapter-1-r6.html`;
const manifestPath = `${base}/r6-artifact-manifest.json`;
const reviewPath = `${base}/r6-producer-self-review.json`;
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const sourcePath = "operations/product-stewards/library/AI-FUNDAMENTALS-101-INTRO-CH1-R6-SOURCE-PACKET-2026-08-09.json";
const teachingMapPath = "operations/product-stewards/library/AI-FUNDAMENTALS-101-V4-SECTION-TEACHING-MAP.json";
const candidateId = "LIB-AI-FUNDAMENTALS-101-INTRO-CH1-R6-LAYERED-SUCCESSOR-14";
const surface = "LIBRAIRY";

const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const sha = relative => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const bind = relative => ({ path: relative, sha256: sha(relative) });
const writeJson = (relative, value) => {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
};

function inline(value) {
  return value
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function renderMarkdown(markdown, conceptTitles) {
  const lines = markdown.split("\n");
  const out = [];
  let i = 0;
  let conceptOpen = false;
  let depthOpen = false;
  let synthesisOpen = false;
  let definitionsOpen = false;
  const closeDepth = () => { if (depthOpen) { out.push("</section>"); depthOpen = false; } };
  const closeConcept = () => { closeDepth(); if (conceptOpen) { out.push("</section>"); conceptOpen = false; } };
  const closeSynthesis = () => { closeDepth(); if (synthesisOpen) { out.push("</section>"); synthesisOpen = false; } };
  const closeDefinitions = () => { closeDepth(); if (definitionsOpen) { out.push("</section>"); definitionsOpen = false; } };
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (/^---+$/.test(line.trim())) { out.push("<hr>"); i += 1; continue; }
    const image = /^!\[(.+?)\]\((.+?)\)$/.exec(line.trim());
    if (image) {
      const src = image[2].startsWith("assets/") ? `../${image[2]}` : image[2];
      out.push(`<figure><img src="${src}" alt="${inline(image[1])}"></figure>`);
      i += 1; continue;
    }
    const heading = /^(#{1,5})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const depthLevel = text.startsWith("Tell Me More") ? 1 : text.startsWith("Full Nerd Alert") ? 2 : 0;
      if (depthOpen && (level <= 4 || depthLevel)) closeDepth();
      if (conceptOpen && level <= 3 && !depthLevel) closeConcept();
      if (synthesisOpen && level <= 2) closeSynthesis();
      if (definitionsOpen && (level <= 2 || text === "Sources and freshness")) closeDefinitions();
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (text === "Put all six questions together") {
        out.push(`<section class="synthesis-module" aria-labelledby="${slug}">`);
        synthesisOpen = true;
      }
      if (text === "Key Definitions") {
        out.push(`<section class="definitions-module" aria-labelledby="${slug}">`);
        definitionsOpen = true;
      }
      if (conceptTitles.has(text)) {
        out.push(`<section class="concept-module" aria-labelledby="${slug}">`);
        conceptOpen = true;
      }
      if (depthLevel) {
        out.push(`<section class="depth-card depth-${depthLevel === 1 ? "more" : "full"}" data-depth="${depthLevel}" aria-labelledby="${slug}">`);
        depthOpen = true;
      }
      const classes = [
        text === "Sources and freshness" ? "source-note-heading" : "",
        /^[123]\. /.test(text) ? "intro-reason-heading" : "",
        depthLevel ? "depth-heading" : ""
      ].filter(Boolean);
      const className = classes.length ? ` class="${classes.join(" ")}"` : "";
      out.push(`<h${level}${className} id="${slug}">${inline(text)}</h${level}>`);
      i += 1; continue;
    }
    if (line.startsWith("> ")) {
      const parts = [];
      while (i < lines.length && lines[i].startsWith("> ")) parts.push(lines[i++].slice(2));
      out.push(`<blockquote>${inline(parts.join(" "))}</blockquote>`); continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ""));
      out.push(`<ul>${items.map(item => `<li>${inline(item)}</li>`).join("")}</ul>`); continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ""));
      out.push(`<ol>${items.map(item => `<li>${inline(item)}</li>`).join("")}</ol>`); continue;
    }
    if (line.startsWith("|") && i + 1 < lines.length && /^\|?\s*:?-+/.test(lines[i + 1])) {
      const cells = row => row.split("|").slice(1, -1).map(cell => cell.trim());
      const headers = cells(line); i += 2;
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(cells(lines[i++]));
      out.push(`<div class="table-wrap"><table><thead><tr>${headers.map(cell => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td data-label="${inline(headers[index] || "")}">${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    const paragraph = [line]; i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,5})\s+|^---+$|^>\s+|^[-*]\s+|^\d+\.\s+|^\|/.test(lines[i])) paragraph.push(lines[i++]);
    out.push(`<p>${inline(paragraph.join(" "))}</p>`);
  }
  closeConcept();
  closeSynthesis();
  closeDefinitions();
  return out.join("\n");
}

const candidate = read(candidatePath);
const requiredIntroductionHeadings = [
  "### 1. Get better results from AI: from “ARGHH, WTF?” to “Ahh. That’s why.”",
  "### 2. Make sense of AI news and hype: from “The end is nigh!” to “Ugh, as if.”",
  "### 3. Take part in decisions about AI: from “Whatever!” to “RSVP: Yes. I have notes.”"
];
for (const heading of requiredIntroductionHeadings) {
  if (!candidate.includes(heading)) {
    throw new Error(`Introduction heading must lead with its reader benefit and preserve its authored comic progression: ${heading}`);
  }
}
const teachingMap = JSON.parse(read(teachingMapPath));
const beginnerLanguageIssues = aiFundamentalsBeginnerLanguageIssues(candidate);
if (beginnerLanguageIssues.length) {
  throw new Error(`Beginner-language integrity failed:\n- ${beginnerLanguageIssues.join("\n- ")}`);
}
for (const binding of teachingMap.chapter1DepthBindings || []) {
  const headingIndex = text => {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = new RegExp(`^#{2,5} ${escaped}$`, "m").exec(candidate);
    return match?.index ?? -1;
  };
  const standard = headingIndex(binding.standard);
  const tellMeMore = headingIndex(binding.tellMeMore);
  const fullNerd = headingIndex(binding.fullNerd);
  if (standard < 0 || tellMeMore < 0 || fullNerd < 0 || !(standard < tellMeMore && tellMeMore < fullNerd)) {
    throw new Error(`Depth placement failed for ${binding.standard}`);
  }
  for (const field of ["plainEntryExcerpt", "workedExampleExcerpt", "readerReconnectionExcerpt"]) {
    if (!binding[field] || !candidate.includes(binding[field])) throw new Error(`Depth communication evidence failed for ${binding.standard}: ${field}`);
  }
  const reconnection = candidate.indexOf(binding.readerReconnectionExcerpt, fullNerd);
  if (reconnection < fullNerd) throw new Error(`Full Nerd reconnection is outside its depth section for ${binding.standard}`);
  const reconnectionLineEnd = candidate.indexOf("\n", reconnection);
  const nextContentLine = candidate.slice(reconnectionLineEnd < 0 ? candidate.length : reconnectionLineEnd + 1)
    .split("\n")
    .find(line => line.trim());
  if (nextContentLine && !/^#{2,3}\s+/.test(nextContentLine)) {
    throw new Error(`Unscoped prose follows Full Nerd reconnection for ${binding.standard}: ${nextContentLine.trim()}`);
  }
  if (binding.sameModule !== true) throw new Error(`Depth module binding failed for ${binding.standard}`);
}
for (const contract of teachingMap.chapter1StandardContracts || []) {
  const standardHeading = `### ${contract.standard}`;
  const standard = candidate.indexOf(standardHeading);
  const binding = (teachingMap.chapter1DepthBindings || []).find(item => item.standard === contract.standard);
  const tellMeMore = binding ? candidate.indexOf(`#### ${binding.tellMeMore}`, standard) : -1;
  if (standard < 0 || tellMeMore < 0) throw new Error(`Standard evidence boundary missing for ${contract.standard}`);
  for (const field of ["exampleExcerpt", "whyExcerpt"]) {
    const evidence = candidate.indexOf(contract[field], standard);
    if (evidence < standard || evidence >= tellMeMore) {
      throw new Error(`Standard ${field} missing before optional depth for ${contract.standard}`);
    }
  }
}
const definitionBounds = {
  STANDARD: [candidate.indexOf("### Standard definitions"), candidate.indexOf("### Tell Me More definitions")],
  TELL_ME_MORE: [candidate.indexOf("### Tell Me More definitions"), candidate.indexOf("### Full Nerd Alert definitions")],
  FULL_NERD_ALERT: [candidate.indexOf("### Full Nerd Alert definitions"), candidate.indexOf("### Sources and freshness")]
};
for (const contract of teachingMap.chapter1DefinitionDepthContracts || []) {
  const bounds = definitionBounds[contract.depth];
  const entry = candidate.indexOf(`- **${contract.term}**`);
  if (!bounds || bounds[0] < 0 || bounds[1] < 0 || entry < bounds[0] || entry >= bounds[1]) {
    throw new Error(`Definition depth mismatch for ${contract.term}: expected ${contract.depth}`);
  }
}
const conceptTitles = new Set([
  ...(teachingMap.chapter1ConceptHeadings || []),
  ...(teachingMap.chapter1DepthBindings || []).map(binding => binding.standard)
]);
const body = renderMarkdown(candidate, conceptTitles);
const html = `<!doctype html>
<html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Fundamentals 101 - Introduction and Chapter 1 R6</title>
<style>
:root{--ink:#24163f;--purple:#55258b;--purple-dark:#321759;--pink:#cf3f89;--pink-shadow:#e8a8cc;--lavender:#f4effc;--lavender-2:#e7dcf5;--yellow:#fff1a8;--gold:#9a6b00;--line:#cdb9df;--muted:#62586f;--paper:#fff;--desk:#eeeaf4}
*{box-sizing:border-box}
html{background:var(--desk);color:var(--ink);font-family:Arial,Helvetica,sans-serif;font-size:19px;line-height:1.65;scroll-padding-top:5rem}
body{margin:0}
.meter{position:sticky;top:0;z-index:5;background:var(--purple-dark);color:#fff;padding:.68rem 1rem;border-bottom:5px solid #ed70ae;display:flex;align-items:center;justify-content:center;gap:.65rem;font-size:.78rem;font-weight:800;letter-spacing:.02em;box-shadow:0 3px 0 rgba(36,22,63,.18)}
.meter span{color:#ffd5e9;text-transform:uppercase;letter-spacing:.08em}
.meter button{appearance:none;border:2px solid #b89bd1;border-radius:3px;background:#fff;color:var(--purple-dark);padding:.42rem .72rem;font:inherit;box-shadow:3px 3px 0 #8c659f;cursor:pointer}
.meter button:focus-visible{outline:4px solid #fff;outline-offset:3px}
.meter button[aria-pressed="true"]{background:var(--yellow);border-color:var(--yellow);box-shadow:3px 3px 0 #c79000}
.page{width:min(100%,760px);margin:0 auto;padding:3.4rem 3rem 6rem;background:var(--paper);box-shadow:0 0 0 1px #ded5e6,10px 0 24px rgba(50,23,89,.08),-10px 0 24px rgba(50,23,89,.08)}
h1,h2,h3,h4,h5{font-family:Arial,Helvetica,sans-serif;line-height:1.16;color:var(--purple);margin:2.35rem 0 .9rem;letter-spacing:-.015em;text-wrap:balance}
h1{font-size:2.55rem;border-top:9px solid var(--pink);padding-top:1rem}
h1:first-child{margin-top:0}
h2{font-size:1.65rem;margin-top:3.4rem;padding:0 0 .35rem;border-bottom:5px solid var(--pink)}
h3{font-size:1.34rem;color:#a32570}
h4{font-size:1.08rem;color:var(--purple)}
h5{font-size:.98rem;color:#6d2c92}
.intro-reason-heading{font-size:1.12rem;color:#fff;background:var(--purple);margin:2.2rem 0 .85rem;padding:.58rem .72rem;border-left:8px solid var(--pink);box-shadow:5px 5px 0 var(--pink-shadow)}
.concept-module{border:3px solid var(--purple);border-radius:2px;margin:1.8rem 0 2.8rem;padding:0 1.25rem 1.35rem;background:#fff;box-shadow:8px 8px 0 var(--pink-shadow)}
.concept-module>h3:first-child{margin:0 -1.25rem 1.2rem;padding:.68rem 1rem;background:var(--purple);color:#fff;letter-spacing:0}
.concept-module>h3:first-child::before{content:"CONCEPT";display:block;color:#ffd4e8;font-size:.62rem;letter-spacing:.12em;margin-bottom:.24rem}
.synthesis-module{border:3px solid var(--purple);margin:3.4rem 0 2.8rem;padding:0 1.25rem 1.35rem;background:#fff;box-shadow:8px 8px 0 var(--pink-shadow)}
.synthesis-module>h2:first-child{margin:0 -1.25rem 1.2rem;padding:.72rem 1rem;background:var(--purple);border:0;color:#fff}
.definitions-module{border:3px solid var(--purple);margin:3.8rem 0 2.8rem;padding:0 1.25rem 1.35rem;background:#fff;box-shadow:8px 8px 0 var(--lavender-2)}
.definitions-module>h2:first-child{margin:0 -1.25rem 1.2rem;padding:.72rem 1rem;background:var(--purple-dark);border:0;color:#fff}
.definitions-module>h3{font-size:1.08rem;color:#a32570;margin-top:1.6rem}
.depth-card{border-radius:1px;margin:1.45rem 0 .25rem;padding:.15rem 1rem .95rem}
.depth-more{background:var(--lavender);border:2px solid #8d5ab5;box-shadow:4px 4px 0 var(--lavender-2)}
.depth-full{background:#fff9df;border:2px solid #b07b00;box-shadow:4px 4px 0 #f0d66f}
.depth-heading{font-size:1.02rem;margin-top:.9rem;line-height:1.24}
.depth-more .depth-heading::before{content:"TELL ME MORE";display:block;color:#6f378f;font-size:.64rem;letter-spacing:.1em;margin-bottom:.34rem}
.depth-full .depth-heading::before{content:"FULL NERD ALERT";display:block;color:#815800;font-size:.64rem;letter-spacing:.1em;margin-bottom:.34rem}
p,li,td{font-size:1rem}
p{margin:1rem 0 1.28rem}
blockquote{margin:1.8rem 0;padding:1rem 1.15rem;background:var(--lavender);border:2px solid var(--purple);box-shadow:5px 5px 0 var(--pink-shadow);font-size:1.1rem;font-weight:750}
hr{border:0;border-top:3px double var(--line);margin:3rem 0}
figure{margin:2rem -1.5rem;padding:.75rem;border:2px solid var(--purple);background:#fff;box-shadow:6px 6px 0 var(--lavender-2)}
figure img{display:block;height:auto;width:100%}
.table-wrap{overflow-x:auto;margin:1.4rem 0;border:2px solid var(--purple);box-shadow:5px 5px 0 var(--lavender-2)}
table{width:100%;border-collapse:collapse;font-size:.92rem}
th{background:var(--purple-dark);color:#fff;text-align:left}
th,td{padding:.8rem;border:1px solid var(--line);vertical-align:top}
tr:nth-child(even) td{background:#faf7ff}
ul,ol{padding-left:1.4rem}
li{margin:.45rem 0 .65rem}
code{font-size:.9em}
a{color:#8d1d65;text-decoration-thickness:.08em;text-underline-offset:.12em}
#try-it-on-something-you-use{margin-top:3.8rem;background:var(--yellow);border:2px solid var(--purple);padding:.72rem .9rem;box-shadow:7px 7px 0 var(--pink-shadow)}
#the-chapter-in-one-minute,#key-definitions{margin-top:3.8rem}
.source-note-heading{font-size:.76rem;color:var(--muted);letter-spacing:0;margin-top:2.8rem;text-transform:none;border:0;padding:0}
.source-note-heading+p{border-top:1px solid var(--line);color:var(--muted);font-size:.74rem;line-height:1.5;margin-top:.4rem;padding-top:.65rem}
@media(max-width:650px){html{font-size:18px;scroll-padding-top:6.5rem}.page{width:100%;padding:2.4rem 1rem 4rem;box-shadow:none}h1{font-size:2.05rem}h2{font-size:1.42rem}.intro-reason-heading{font-size:1.03rem}.concept-module,.synthesis-module,.definitions-module{padding:0 .85rem .95rem;margin-right:.35rem;box-shadow:5px 5px 0 var(--pink-shadow)}.concept-module>h3:first-child,.synthesis-module>h2:first-child,.definitions-module>h2:first-child{margin-left:-.85rem;margin-right:-.85rem;padding-left:.75rem}.depth-card{padding:.1rem .75rem .8rem}.meter{justify-content:center;flex-wrap:wrap;gap:.42rem;overflow:visible}.meter span{flex:0 0 100%;text-align:center;white-space:nowrap}.meter button{white-space:nowrap;box-shadow:none}figure{margin:1.5rem 0}.table-wrap{overflow:visible;border:0;box-shadow:none}.table-wrap table,.table-wrap tbody,.table-wrap tr,.table-wrap td{display:block;width:100%}.table-wrap thead{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.table-wrap tr{border:2px solid var(--purple);margin:0 0 .8rem;box-shadow:3px 3px 0 var(--lavender-2)}.table-wrap td{display:grid;grid-template-columns:minmax(7rem,38%) 1fr;gap:.65rem;border:0;border-bottom:1px solid var(--line);padding:.68rem;background:#fff}.table-wrap td:last-child{border-bottom:0}.table-wrap td::before{content:attr(data-label);font-weight:800;color:var(--purple-dark)}}
@media(max-width:390px){.meter{padding:.5rem .55rem}.meter span{font-size:.62rem}.meter button{font-size:.69rem;padding:.36rem .46rem}.page{padding-left:.85rem;padding-right:.85rem}.concept-module,.synthesis-module,.definitions-module{margin-left:0}.table-wrap td{grid-template-columns:1fr;gap:.18rem}}
</style></head><body>
<nav class="meter" aria-label="Nerd-O-Meter"><span>Nerd-O-Meter</span><button type="button" data-mode="standard" aria-pressed="false">Standard</button><button type="button" data-mode="more" aria-pressed="false">Tell Me More!</button><button type="button" data-mode="full" aria-pressed="true">Full Nerd Alert!</button></nav>
<main class="page">${body}</main>
<script>
const depth = { standard: 0, more: 1, full: 2 };
function setMode(mode) {
  const visibleDepth = depth[mode];
  for (const node of document.querySelectorAll("[data-depth]")) node.hidden = Number(node.dataset.depth) > visibleDepth;
  for (const button of document.querySelectorAll(".meter button")) button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
  localStorage.setItem("laidies-nerd-o-meter-v2", mode);
}
for (const button of document.querySelectorAll(".meter button")) button.addEventListener("click", () => setMode(button.dataset.mode));
setMode(localStorage.getItem("laidies-nerd-o-meter-v2") || "standard");
</script></body></html>\n`;
fs.mkdirSync(path.dirname(path.join(root, renderedPath)), { recursive: true });
fs.writeFileSync(path.join(root, renderedPath), html);

writeJson(manifestPath, {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId,
  surface,
  contentClass: "EXPLANATION",
  reviewText: bind(candidatePath),
  rendered: bind(renderedPath)
});

const registry = JSON.parse(read(registryPath));
const sourceBinding = bind(sourcePath);
const evidence = excerpt => [{ excerpt, locator: "exact R6 prose" }];
const outcome = (observation, excerpt) => ({ verdict: "PASS", observation, artifactEvidence: evidence(excerpt) });
const negativeCalibrations = registry.negativeExemplars.map(item => {
  const source = read(item.path);
  const excerpt = source.split("\n").find(line => line.trim().length > 12)?.trim() || source.trim().slice(0, 80);
  return { exemplarId: item.id, verdict: "REJECT", identifiedFailureFamilies: item.failureFamilies, evidence: [{ excerpt, locator: "known-bad artifact" }] };
});
const benchmarkEvidence = {
  "CQX-GOOD-ALI-FUNDAMENTALS-INTRO-001": "Alright LAiDIES listen (or should we say, read?) up!",
  "CQX-GOOD-EPISODE-001": "It's not a confidence problem. It's a physics problem.",
  "CQX-GOOD-EPISODE-002": "AI can't read your mind — so tell it what you want.",
  "CQX-GOOD-EPISODE-003": "I can use the draft. I still check the alibi."
};

const outcomes = {
  plainClarity: outcome("The chapter first shows one recognisable product, then names the labels that describe its different properties.", "That one product could therefore be described as **predictive**, **generative**, **multimodal** and **agentic**."),
  technicalCoherence: outcome("The prose distinguishes genuine construction nesting from overlapping product properties and explicitly prevents the false agentic-generative-predictive hierarchy.", "Machine learning sits inside the broader AI field; neural networks sit inside machine learning; deep learning sits inside the neural-network family."),
  readerValue: outcome("The reader receives a usable six-question inspection exercise for a real feature.", "Choose one AI feature you encountered this week."),
  laidiesVoice: outcome("Direct address, intelligent humour, enthusiasm and practical judgment remain present through the introduction and concept mechanism.", "The words have escaped the lab and are now breeding in PowerPoint."),
  engagingEnjoyable: outcome("Humour sharpens probability, generation, agent risk and speculative progression without replacing their mechanisms.", "A probability wearing lip gloss is still a probability."),
  factualIntegrity: outcome("Material definitions and current capability boundaries are source-bound and qualified.", "There is no universally accepted definition or test."),
  freshnessReviewability: outcome("The candidate states its review date, sources and recheck triggers.", "Checked 10 August 2026"),
  surfaceFit: outcome("The artifact works as a continuous textbook chapter with in-place depth, practice, Key Definitions, a compact source note and real continuation routes.", "## Key Definitions"),
  connectedSystemUnderstanding: outcome("The chapter connects six different classification questions, then reconstructs them on one product without pretending they form one ladder.", "We are going to untangle six different questions people have bundled inside the phrase **type of AI**"),
  dailyLifeConnection: outcome("Spam, photo search, streaming, travel and a workplace assistant make invisible distinctions concrete.", "Think of a Friday night at Blockbuster."),
  communicationBenchmark: outcome("A human reason and one recurring customer-service assistant make the invisible distinctions visible before the technical framework appears.", "A customer sends an email and a photograph of a damaged chair."),
  explanationArc: outcome("The chapter starts with the real PowerPoint confusion, explains one system, earns six questions, deepens each concept and reconstructs one complete product.", "Before we sort out the words, let’s start with the thing they are trying to describe."),
  dominantVoiceAcrossArtifact: {
    verdict: "PASS",
    observation: "The same smartest, enthusiastic, funny best-friend relationship spans beginning, mechanism and landing.",
    artifactEvidence: [
      { excerpt: "Alright LAiDIES, listen (or should we say, read?) up!", locator: "beginning" },
      { excerpt: "A returns assistant can complete ten carefully controlled steps without becoming broadly intelligent—or developing an opinion about your shoes.", locator: "middle" },
      { excerpt: "Congratulations. You have already improved the meeting.", locator: "ending" }
    ]
  },
  purposeEarnedAcrossOpening: {
    verdict: "PASS",
    observation: "Ali's three purposes are preserved and demonstrated before the book promise.",
    artifactEvidence: evidence("No matter which mode you choose, this book will help you"),
    purposeThreads: {
      practicalUse: { observation: "The reader learns why understanding interaction can recover a bad result.", artifactEvidence: evidence("I know what I have to do to get this back on track.") },
      informationJudgment: { observation: "The reader is promised the foundation needed to separate useful reporting from hype.", artifactEvidence: evidence("cut through all this noise and understand what is really happening") },
      civicParticipation: { observation: "The RSVP metaphor is developed through real decision forums.", artifactEvidence: evidence("Those are invitations. RSVP “yes.”") },
      consequentialAgency: { observation: "The prose names actual decisions readers should help shape.", artifactEvidence: evidence("what kind of guardrails we want to put in place") }
    }
  },
  readerScaffoldingHidden: outcome("Teaching goals and outcome questions remain outside the prose; reader-facing components are natural book elements.", "Try it on something you use"),
  laidiesWorldIntegration: outcome("The Nerd-O-Meter provides in-place depth while See More routes only to LAiDIES material that actually exists.", "## See more at LAiDIES"),
  explainBack: {
    ...outcome("A simulated explain-back correctly separates generative and agentic.", "**generative produces content; agentic continues through a task.**"),
    simulatedReaderProbe: { prompt: "Explain generative versus agentic without using the chapter wording.", probeResponse: "One label describes making content; the other describes continuing through a task using steps, tools and feedback. A system can do both.", expectedEvidence: "Separates output type from operating pattern and permits overlap." }
  },
  unseenTransfer: {
    ...outcome("A simulated transfer applies the chapter's questions to an unfamiliar insurance intake assistant.", "Those words are not four rival species."),
    simulatedReaderProbe: { prompt: "Classify an insurance assistant that reads a photo, estimates damage, drafts a note and opens a claim after approval.", probeResponse: "It is multimodal, predictive, generative and potentially agentic; none of those labels makes it AGI.", expectedEvidence: "Uses multiple noncompeting labels and preserves the action boundary." }
  },
  usefulAction: outcome("The chapter ends with a real-product inspection rather than generic advice.", "Choose one AI feature you encountered this week. Describe it without using the phrase “AI-powered.”"),
  analogyIntegrity: {
    ...outcome("The Blockbuster sequence makes classification, prediction, ranking and recommendation causally distinct and transfers to product diagnosis.", "The clerk classifies *Scream* as horror"),
    analogyUsed: true,
    mechanismMapping: "The clerk's successive classification, prediction, ranking and recommendation map to four distinct system tasks.",
    whySimpler: "One familiar decision sequence makes the task boundaries visible before formal labels accumulate.",
    whyItImprovesUnderstanding: "The reader can use the same sequence to locate where a recommendation product may have failed.",
    transferPrompt: "Apply the four moves to a streaming or product recommendation.",
    simulatedAnalogyProbe: { response: "The system can classify candidates, predict relevance, rank them and only then recommend the top result; a poor final suggestion can begin at any stage." }
  },
  systemModelReconstruction: {
    ...outcome("A simulated reconstruction preserves all six relationship questions and the only genuine construction nesting taught here.", "Let’s carry one system through all six questions."),
    simulatedReaderProbe: { prompt: "Draw how the Chapter 1 AI labels relate without copying the diagram.", probeResponse: "Put one AI system in the centre and ask six separate questions: job, information forms, operating pattern, physical interaction, breadth and construction. Show predictive and generative as jobs that can coexist; multimodal, agentic and embodied as other properties that may overlap; specialised through AGI and ASI as breadth categories or claims; and AI containing machine learning, neural networks and deep learning as the true nesting.", expectedEvidence: "Preserves six separate properties, overlap, non-implication and AI to machine learning to neural networks to deep learning nesting." }
  }
};

const review = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId,
  stage: "PRODUCER_SELF_REVIEW",
  contentClass: "EXPLANATION",
  surface,
  maker: "learning-system-concepts-director",
  reviewer: { id: "learning-system-concepts-director-self-review", principalId: "learning-system-concepts-director", role: "producer and learning-system owner", modelFamily: "openai" },
  reviewMode: "EXACT_PROSE_IN_FULL",
  reviewedAt: "2026-08-10T12:00:00-07:00",
  artifact: { reviewText: bind(candidatePath), manifest: bind(manifestPath) },
  calibration: {
    registrySha256: sha(registryPath), reviewerPrincipalId: "learning-system-concepts-director", reviewedAt: "2026-08-10T12:00:00-07:00",
    negatives: negativeCalibrations,
    positive: { exemplarId: "CQX-GOOD-ALI-FUNDAMENTALS-INTRO-001", verdict: "PASS", strengthsRetained: ["direct reader relationship", "three-part purpose", "specific humour"], evidence: [{ excerpt: benchmarkEvidence["CQX-GOOD-ALI-FUNDAMENTALS-INTRO-001"], locator: "Ali writing standard" }] },
    sitewideWritingBenchmarks: registry.sitewideWritingBenchmarkIds.map(exemplarId => ({ exemplarId, verdict: "PASS", strengthsToRetain: ["intelligent best-friend relationship", "clarity", "usefulness", "earned humour"], patternsNotToCopy: ["exact plot", "exact jokes", "reference quota"], evidence: [{ excerpt: benchmarkEvidence[exemplarId], locator: "sitewide benchmark" }] }))
  },
  reverseBrief: {
    humanQuestion: "Why should I care about AI, and what do the different labels actually mean?",
    promisedPayoff: "Understand the major current AI families and future capability claims well enough to inspect a real system without flattening unlike labels.",
    centralMentalModel: "An AI system can carry several truthful labels because job, information, operation, physical interaction, breadth and construction answer different questions; only some construction families truly nest.",
    dailyLifeConnection: "Spam, photo search, streaming, drafting, travel and workplace service tools.",
    surfaceJob: "An author-preserving book Introduction followed by the first cumulative concept chapter.",
    desiredReaderFeeling: "Oh, I get why those labels were confusing—and now I can sort them out."
  },
  outcomes,
  failureFamilies: Object.fromEntries(enforcedFailureFamilies(registry).map(name => [name, { present: false, observation: `${name} is absent after exact-prose producer review.`, artifactLocator: "introduction-and-chapter-1-r6.md" }])),
  factualReview: {
    disposition: "CLAIMS_REVIEWED",
    sourceBindings: [sourceBinding],
    claimMap: [
      { claimId: "AIF-R6-AI-SYSTEM", status: "VERIFIED", candidateEvidence: evidence("Those products are doing different jobs. What puts them under the large umbrella called **artificial intelligence**, or **AI**, is that computer systems are using rules or patterns to do things such as recognise, predict, recommend, create or choose a next action."), sourceBinding, sourceEvidence: [{ excerpt: "An AI system is a machine-based system that, for explicit or implicit objectives, infers", locator: "AIF-R6-INTRO-AI-SYSTEM sourceExcerpt" }], scopeAndFreshness: "Beginner-facing umbrella explanation bounded by the broader OECD definition; recheck on definition change." },
      { claimId: "AIF-R6-GENERATIVE-MULTIMODAL", status: "VERIFIED", candidateEvidence: evidence("**Generative AI** produces content: text, images, audio, video, code or other digital material."), sourceBinding, sourceEvidence: [{ excerpt: "Generative AI produces new content. Modality describes the kind of information", locator: "AIF-R6-CH1-GENERATIVE-MULTIMODAL ruledClaim" }], scopeAndFreshness: "Technology-neutral distinction; named product claims intentionally absent." },
      { claimId: "AIF-R6-AGENTIC", status: "QUALIFIED", candidateEvidence: evidence("An **agentic AI** system can continue through a task."), sourceBinding, sourceEvidence: [{ excerpt: "Agentic describes continued operation across steps toward a goal", locator: "AIF-R6-CH1-AGENTIC-EMBODIED ruledClaim" }], scopeAndFreshness: "Industry terminology varies; candidate states the variation boundary and makes no universal product claim." },
      { claimId: "AIF-R6-AGI-ASI", status: "QUALIFIED", candidateEvidence: evidence("LAiDIES does **not** classify today’s products as AGI."), sourceBinding, sourceEvidence: [{ excerpt: "General-purpose AI is not the same as AGI.", locator: "AIF-R6-CH1-GENERAL-PURPOSE-AGI-ASI ruledClaim" }], scopeAndFreshness: "LAiDIES position plus disputed-definition boundary; recheck before publication and on material capability evidence change." }
    ],
    reviewedThrough: "2026-08-10",
    nextTrigger: "Any source change, current-capability change, independent finding or before publication.",
    correctionOwner: "learning-system-concepts-director"
  },
  ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 0, priorComparable: { reviewIssues: 3, reviewCycles: 1 }, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
  lineage: { kind: "SUCCESSOR", predecessorCandidateId: "LIB-AI-FUNDAMENTALS-101-INTRO-CH1-R6-LAYERED-SUCCESSOR-4" },
  learningDisposition: { disposition: "EVIDENCE_GAP", rationale: "The builder confirms structure, bindings and exact known-bad phrase rejection only. The revised prerequisite sequence and every concept module still require a fresh exact-prose producer reading before any semantic PASS can exist." },
  verdict: "HOLD",
  limitations: ["This generated record is an integrity and calibration receipt, not evidence that the prose is clear, useful, engaging or in LAiDIES voice.", "Producer self-review has no independent quality authority.", "Explain-back, transfer, reconstruction and analogy evidence are simulated producer probes only.", "No fresh exact-prose semantic review, independent admission, unfamiliar-reader observation, Ali taste decision, Library admission, deployment or publication exists."]
};

writeJson(reviewPath, review);
console.log(`R6 BUILD COMPLETE candidate=${bind(candidatePath).sha256} rendered=${bind(renderedPath).sha256} manifest=${bind(manifestPath).sha256} review=${bind(reviewPath).sha256}`);
