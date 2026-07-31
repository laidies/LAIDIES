#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_REL = process.env.ECO01_SOURCE || "content/library-books/verification-rulebook.json";
const SOURCE = path.join(ROOT, SOURCE_REL);
const OUTPUT_REL = process.env.ECO01_OUTPUT || "content/library-books/rendered/verification-rulebook.html";
const OUTPUT = path.join(ROOT, OUTPUT_REL);
const LEDGER_OUTPUT = path.join(ROOT, process.env.ECO01_LEDGER_OUTPUT || "content/library-books/verification-rulebook.claims.json");

const book = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
const sourceBytes = fs.readFileSync(SOURCE);
const sourceSha = crypto.createHash("sha256").update(sourceBytes).digest("hex");
// This is intentionally a content address, not an editorial/admission claim.
// A changed canonical JSON must produce a changed reader binding.
const contentVersion = `sha256-${sourceSha}`;

function fail(message) {
  throw new Error(`ECO-01 source rejected: ${message}`);
}

if (book.schemaVersion !== "1.0.0") fail("unsupported schemaVersion");
if (book.bookId !== "verification-rulebook") fail("wrong bookId");
if (book.status !== "HOLD") fail("maker renderer may only emit a HOLD candidate");
if (!Array.isArray(book.chapters) || book.chapters.length !== 7) fail("exactly seven chapters are required");
if (!Array.isArray(book.sources) || book.sources.length < 7) fail("source drawer is incomplete");
if (!book.sourceLedger || !book.evaluationSet || !book.correctionRoute) fail("ledger, evaluation and correction bindings are required");
if (!Array.isArray(book.claimRegistry) || book.claimRegistry.length !== 14) fail("exactly 14 canonical claim records are required");
if (new Set(book.claimRegistry.map((claim) => claim.id)).size !== book.claimRegistry.length) fail("claim IDs must be unique");
for (const [index, chapter] of book.chapters.entries()) {
  if (chapter.number !== index + 1 || !chapter.slug || !chapter.title) fail(`chapter ${index + 1} identity is invalid`);
  if (!chapter.interaction?.type) fail(`chapter ${index + 1} interaction type is missing`);
}

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const paragraphs = (items = []) => items.map((item) => `<p>${esc(item)}</p>`).join("\n");
const list = (items = []) => items.length ? `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : "";
const definitions = (items = []) => items.length
  ? `<dl class="vr-definitions">${items.map((item) => `<div><dt>${esc(item.term)}</dt><dd>${esc(item.definition)}</dd></div>`).join("")}</dl>`
  : "";
const table = (data) => data
  ? `<div class="vr-table-wrap" tabindex="0" role="region" aria-label="${esc(data.headers[0])} table"><table><thead><tr>${data.headers.map((cell) => `<th scope="col">${esc(cell)}</th>`).join("")}</tr></thead><tbody>${data.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
  : "";

const claimMap = new Map(book.claimRegistry.map((claim) => [claim.id, claim]));
const sourceMap = new Map(book.sources.map((source) => [source.id, source]));
sourceMap.set("INTERNAL-ECO01-SPEC", {
  id: "INTERNAL-ECO01-SPEC",
  title: "ECO-01 build packet",
  publisher: "LAiDIES",
  url: "/operations/product-stewards/learning-content-ecosystem/build-packet-eco-01-verification-rulebook-2026-07-25.md",
  use: "Internal product and instructional contract."
});

for (const claim of book.claimRegistry) {
  for (const field of ["id", "publicWording", "claimType", "riskTier", "sourceIds", "supportLocation", "publicationVersion", "accessed", "scope", "qualification", "status", "nextReview", "history"]) {
    if (claim[field] === undefined || claim[field] === "") fail(`${claim.id} missing ${field}`);
  }
  if (!Array.isArray(claim.sourceIds) || !claim.sourceIds.length) fail(`${claim.id} has no sources`);
  for (const sourceId of claim.sourceIds) if (!sourceMap.has(sourceId)) fail(`${claim.id} references missing source ${sourceId}`);
}

function correctionHref(claimId) {
  const url = new URL(book.correctionRoute);
  url.searchParams.set("body", `Claim ID: ${claimId}\n\nWhat I found:\n\nSource or evidence:\n`);
  return url.toString();
}

function claimBlocks(ids = []) {
  return ids.map((id) => {
    const claim = claimMap.get(id);
    if (!claim) fail(`content references missing claim ${id}`);
    const links = claim.sourceIds.map((sourceId) => {
      const source = sourceMap.get(sourceId);
      return `<a href="${esc(source.url)}" rel="noopener noreferrer">${esc(sourceId)} · ${esc(source.publisher)}</a>`;
    }).join(" · ");
    return `<aside class="vr-claim" id="claim-${esc(id)}" data-claim-id="${esc(id)}" data-claim-status="${esc(claim.status)}">
      <p class="vr-claim-id"><a href="#ledger-${esc(id)}">${esc(id)} · ${esc(claim.status)}</a></p>
      <p class="vr-claim-wording">${esc(claim.publicWording)}</p>
      <p class="vr-claim-sources"><strong>Evidence:</strong> ${links}</p>
      <p><strong>Qualification:</strong> ${esc(claim.qualification)}</p>
      <p><a href="${esc(correctionHref(id))}">Report a correction for ${esc(id)}</a></p>
    </aside>`;
  }).join("");
}

function optionSelect(name, choices, answer, label) {
  return `<label class="vr-select-label">${esc(label)}<select name="${esc(name)}" data-answer="${esc(answer)}" required><option value="">Choose…</option>${choices.map((choice, index) => `<option value="${esc(String(index))}">${esc(choice)}</option>`).join("")}</select></label>`;
}

function selfCheckRubric(dimensions, id) {
  if (!dimensions) return "";
  return `<div class="vr-self-check" data-self-check hidden>
    <h3>Comparison rubric</h3>
    <p>Compare your response yourself. This records reflection; it does not score your reasoning.</p>
    ${Object.entries(dimensions).map(([dimension, wording]) => `<div class="vr-rubric-row">
      <p><strong>${esc(dimension[0].toUpperCase() + dimension.slice(1))}:</strong> ${esc(wording)}</p>
      <label>My comparison for ${esc(dimension)}
        <select name="${esc(id)}-rubric-${esc(dimension)}" data-rubric-choice>
          <option value="">Choose…</option>
          <option value="met">Met</option>
          <option value="revise">Revise</option>
          <option value="unsure">Unsure</option>
        </select>
      </label>
    </div>`).join("")}
    <button type="button" data-record-self-check>Record self-check</button>
  </div>`;
}

function interaction(data, id) {
  let body = "";
  if (data.type === "single-choice") {
    body = data.options.map((option) => `<label><input type="radio" name="${esc(id)}" value="${esc(option.id)}" data-correct="${option.correct ? "true" : "false"}" required> <span>${esc(option.label)}</span></label>`).join("");
  } else if (["classification", "artifact-match", "stakes"].includes(data.type)) {
    body = data.items.map((item, index) => optionSelect(`${id}-${item.id}`, data.choices, String(data.choices.indexOf(item.answer)), `${index + 1}. ${item.label ? `${item.label}: ` : ""}${item.text}`) + `<p class="vr-item-feedback" data-for="${esc(item.id)}" hidden>${esc(item.feedback)}</p>`).join("");
  } else if (data.type === "repair") {
    body = data.items.map((item, index) => optionSelect(`${id}-${item.id}`, item.choices, String(item.answerIndex), `${index + 1}. ${item.text}`) + `<p class="vr-item-feedback" data-for="${esc(item.id)}" hidden>${esc(item.feedback)}</p>`).join("");
  } else if (data.type === "source-compare") {
    body = `<div role="group" aria-label="Choose the most diagnostic source">${data.options.map((option) => `<label><input type="radio" name="${esc(id)}-choice" value="${esc(option.id)}" data-correct="${option.correct ? "true" : "false"}" required> <span>${esc(option.label)}</span></label>`).join("")}</div>
      <label>Why is it diagnostic?<textarea name="${esc(id)}-reason" minlength="${data.minimumReasonLength}" required></textarea></label>
      <label>What exact evidence action comes next?<textarea name="${esc(id)}-action" minlength="${data.minimumActionLength}" required></textarea></label>`;
  } else if (data.type === "claim-table") {
    body = `<div class="vr-table-wrap" tabindex="0" role="region" aria-label="Claim decision table"><table><thead><tr><th scope="col">Claim</th><th scope="col">Source</th><th scope="col">Your verdict</th></tr></thead><tbody>${data.rows.map((row) => `<tr><th scope="row">${esc(row.claim)}</th><td>${esc(row.source)}</td><td>${optionSelect(`${id}-${row.id}`, data.verdicts, String(data.verdicts.indexOf(row.answer)), "Verdict")}</td></tr>`).join("")}</tbody></table></div><label>Explain how the source supports your three verdicts.<textarea name="${esc(id)}-reason" minlength="${data.minimumReasonLength}" required></textarea></label><label>What evidence or revision action comes next?<textarea name="${esc(id)}-action" minlength="${data.minimumActionLength}" required></textarea></label>`;
  } else if (data.type === "dual-case") {
    body = data.cases.map((item, index) => optionSelect(`${id}-${item.id}`, data.verdicts, String(data.verdicts.indexOf(item.answer)), `${index + 1}. ${item.label}: ${item.text}`) + `<p class="vr-item-feedback" data-for="${esc(item.id)}" hidden>${esc(item.feedback)}</p>`).join("") + `<label>Explain the evidence gap in both cases.<textarea name="${esc(id)}-reason" minlength="${data.minimumReasonLength}" required></textarea></label><label>What exact evidence action comes next for each case?<textarea name="${esc(id)}-action" minlength="${data.minimumActionLength}" required></textarea></label>`;
  } else {
    fail(`unsupported interaction type ${data.type}`);
  }
  return `<form class="vr-check" data-check="${esc(id)}" data-type="${esc(data.type)}">
    <fieldset>
      <legend>${esc(data.prompt || data.question || "")}</legend>
      ${body}
    </fieldset>
    <button type="submit">Check my reasoning</button>
    ${selfCheckRubric(data.rubricDimensions, id)}
    <p class="vr-feedback" role="status" aria-live="polite" aria-atomic="true"></p>
  </form>`;
}

function section(part) {
  return `<section class="vr-subsection">
    <h3>${esc(part.heading)}</h3>
    ${paragraphs(part.paragraphs)}
    ${list(part.list)}
    ${definitions(part.definitions)}
    ${table(part.table)}
    ${claimBlocks(part.claimIds)}
  </section>`;
}

const chapters = book.chapters.map((chapter) => `<article class="gr-page vr-chapter" id="${esc(chapter.slug)}" aria-labelledby="${esc(chapter.slug)}-title">
  <p class="vr-kicker">Chapter ${chapter.number} of 7</p>
  <h2 id="${esc(chapter.slug)}-title">${esc(chapter.title)}</h2>
  <p class="vr-dek">${esc(chapter.dek)}</p>
  ${chapter.sections.map(section).join("\n")}
  ${interaction(chapter.interaction, `chapter-${chapter.number}`)}
</article>`).join("\n");

const sources = book.sources.map((source) => `<li id="${esc(source.id)}">
  <a href="${esc(source.url)}" rel="noopener noreferrer"><strong>${esc(source.title)}</strong> · ${esc(source.publisher)}</a>
  <span>${esc(source.use)}</span>
</li>`).join("");

const ledgerItems = book.claimRegistry.map((claim) => `<li id="ledger-${esc(claim.id)}">
  <p><strong>${esc(claim.id)} · ${esc(claim.status)}</strong></p>
  <p>${esc(claim.publicWording)}</p>
  <p><strong>Sources:</strong> ${claim.sourceIds.map((sourceId) => `<a href="#${esc(sourceId)}">${esc(sourceId)}</a>`).join(" · ")}</p>
  <p><strong>Support:</strong> ${esc(claim.supportLocation)}</p>
  <p><strong>Version/access:</strong> ${esc(claim.publicationVersion)} · ${esc(claim.accessed)}</p>
  <p><strong>Scope:</strong> ${esc(claim.scope)}</p>
  <p><strong>Qualification:</strong> ${esc(claim.qualification)}</p>
  <p><strong>Next review:</strong> ${esc(claim.nextReview)}</p>
  <p><a href="${esc(correctionHref(claim.id))}">Report a correction for ${esc(claim.id)}</a></p>
</li>`).join("");

const handoffs = book.handoffs.map((handoff) => `<li>
  ${handoff.status === "HOLD" ? `<strong>${esc(handoff.label)} · HOLD</strong>` : `<a href="${esc(handoff.href)}">${esc(handoff.label)}</a>`}
  <span>${esc(handoff.payoff)}</span>
</li>`).join("");

const output = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(book.title)} · The LIBRAiRY</title>
  <meta name="description" content="${esc(book.description)}">
  <meta name="robots" content="noindex,nofollow">
  <meta name="laidies:canonical-source" content="/${SOURCE_REL}">
  <meta name="laidies:canonical-source-sha256" content="${sourceSha}">
  <meta name="laidies:content-version" content="${contentVersion}">
  <meta name="laidies:editorial-status" content="${esc(book.status)}">
  <link rel="icon" type="image/png" href="/assets/brand/laidies-logo-square-pearl-512-v1.png">
  <link rel="stylesheet" href="/styles.css?v=sticky-fix-2">
  <link rel="stylesheet" href="/content/grimoire.css?v=grimoire-17">
  <style>
    :root{--vr-ink:#25162d;--vr-paper:#fffaf0;--vr-pink:#b84978;--vr-pink-dark:#7b244b;--vr-blue:#164f91;--vr-gold:#e1ad36;--vr-line:#d7c7c3}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;color:var(--vr-ink);background:#e8d9ce;font-family:Georgia,"Times New Roman",serif;line-height:1.62}
    a{color:var(--vr-blue);text-underline-offset:.16em;overflow-wrap:anywhere}
    a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible,[tabindex="0"]:focus-visible{outline:3px solid #087c96;outline-offset:3px}
    .vr-shell{max-width:1120px;margin:0 auto;background:var(--vr-paper);min-height:100vh;box-shadow:0 0 40px #3c213733}
    .vr-topbar{display:flex;gap:1rem;justify-content:space-between;align-items:center;padding:.8rem clamp(1rem,4vw,2.5rem);background:#2d1735;color:#fff;position:sticky;top:0;z-index:10}
    .vr-topbar a{color:#fff}
    .vr-hold{padding:.8rem clamp(1rem,4vw,2.5rem);background:#fff0bd;border-bottom:2px solid #8a5b00;font:700 .95rem/1.4 system-ui,sans-serif}
    main{display:block}
    .vr-hero,.gr-page{padding:clamp(2rem,6vw,5rem) clamp(1rem,6vw,5.5rem)}
    .vr-hero{background:linear-gradient(145deg,#fff7dc,#f9deeb);border-bottom:4px double var(--vr-pink)}
    .vr-eyebrow,.vr-kicker{font:800 .8rem/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.13em;color:var(--vr-pink-dark)}
    h1{font-size:clamp(2.5rem,8vw,5.7rem);line-height:.94;margin:.3rem 0 1rem;max-width:12ch}
    h2{font-size:clamp(2rem,5vw,3.4rem);line-height:1.05;margin:.25rem 0 .8rem}
    h3{font-size:clamp(1.25rem,3vw,1.7rem);line-height:1.2;margin:2rem 0 .5rem}
    [id]{scroll-margin-top:5.5rem}
    p,li,dd{font-size:clamp(1rem,1.5vw,1.15rem)}
    .vr-promise,.vr-dek{font-size:clamp(1.2rem,2.4vw,1.55rem);max-width:46rem}
    .vr-scenario{max-width:48rem;padding:1rem 1.2rem;border-left:5px solid var(--vr-gold);background:#fff}
    .vr-chapter:nth-of-type(even){background:#fff4f7}
    .vr-chapter{border-bottom:1px solid var(--vr-line)}
    .vr-subsection{max-width:52rem}
    .vr-subsection ul,.vr-loop,.vr-transfer ol{padding-left:1.35rem}
    .vr-definitions{display:grid;gap:.7rem;max-width:52rem}
    .vr-definitions div{display:grid;grid-template-columns:minmax(8rem,12rem) 1fr;gap:1rem;padding:.8rem;border:1px solid var(--vr-line);background:#fff}
    .vr-definitions dt{font-weight:800}
    .vr-definitions dd{margin:0}
    .vr-table-wrap{overflow-x:auto;max-width:100%;border:1px solid var(--vr-line)}
    table{border-collapse:collapse;min-width:680px;background:#fff}
    th,td{text-align:left;vertical-align:top;padding:.75rem;border:1px solid var(--vr-line)}
    thead th{background:#2d1735;color:#fff;font-family:system-ui,sans-serif}
    .vr-check{margin:2rem 0 0;padding:clamp(1rem,3vw,1.5rem);border:2px solid var(--vr-pink);border-radius:.8rem;background:#fff;max-width:52rem}
    fieldset{border:0;padding:0;margin:0}
    legend{font-weight:800;font-size:1.15rem;margin-bottom:.7rem}
    .vr-check label{display:flex;align-items:flex-start;gap:.7rem;margin:.55rem 0;padding:.65rem;border:1px solid var(--vr-line);border-radius:.35rem;cursor:pointer}
    .vr-check input{width:1.25rem;height:1.25rem;flex:0 0 auto}
    .vr-check select,.vr-check textarea{display:block;width:100%;margin:.45rem 0 1rem;padding:.7rem;border:1px solid #765d70;border-radius:.25rem;background:#fff;color:var(--vr-ink);font:1rem/1.4 system-ui,sans-serif}
    .vr-check textarea{min-height:7rem;resize:vertical}
    .vr-select-label{display:block;margin:1rem 0;font-weight:700}
    .vr-item-feedback{margin:-.65rem 0 .85rem;padding:.55rem;background:#f3efe9}
    button,.vr-copy{min-height:44px;border:0;border-radius:.35rem;padding:.7rem 1rem;background:var(--vr-pink-dark);color:#fff;font:800 1rem/1.2 system-ui,sans-serif;cursor:pointer}
    .vr-feedback{min-height:1.8rem;margin:.7rem 0 0;font-weight:700}
    .vr-feedback[data-result="keyed-match"],.vr-feedback[data-result="recorded"]{color:#116032}
    .vr-feedback[data-result="review"]{color:#8a3900}
    .vr-feedback[data-result="self-check-ready"]{color:#164f91}
    .vr-self-check{margin-top:1rem;padding:1rem;border:1px solid var(--vr-blue);background:#f2f7ff}
    .vr-rubric-row{padding:.7rem 0;border-bottom:1px solid var(--vr-line)}
    .vr-loop{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;padding:0;margin:1.2rem 0}
    .vr-loop li{padding:.45rem .7rem;background:#2d1735;color:#fff;border-radius:99px;font:800 .9rem/1.2 system-ui,sans-serif}
    .vr-prompt,.vr-transfer,.vr-metadata,.vr-sources,.vr-next{padding:clamp(2rem,5vw,4rem) clamp(1rem,6vw,5.5rem);border-bottom:1px solid var(--vr-line)}
    .vr-prompt{background:#27162e;color:#fff}
    .vr-prompt > h2,.vr-prompt > p,.vr-prompt > label{color:#fff!important}
    .vr-prompt textarea{display:block;width:100%;min-height:13rem;padding:1rem;margin:1rem 0;background:#fff;color:#211327;font:1rem/1.55 ui-monospace,SFMono-Regular,monospace}
    .vr-prompt > .vr-warning{font-weight:800;color:#ffe09b!important}
    .vr-meta-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem}
    .vr-meta-grid div{padding:1rem;border:1px solid var(--vr-line);background:#fff}
    .vr-meta-grid dt{font:800 .8rem/1.3 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.08em}
    .vr-meta-grid dd{margin:.4rem 0 0}
    details{max-width:55rem;border:1px solid var(--vr-line);background:#fff;padding:1rem}
    summary{cursor:pointer;font-weight:800}
    .vr-source-list,.vr-handoffs{list-style:none;padding:0}
    .vr-source-list li,.vr-handoffs li{display:grid;gap:.25rem;padding:1rem 0;border-bottom:1px solid var(--vr-line)}
    .vr-source-list span,.vr-handoffs span{font-size:.95rem}
    .vr-claim{margin:1rem 0;padding:1rem;border-left:5px solid var(--vr-blue);background:#f2f7ff}
    .vr-claim p{margin:.35rem 0;font-size:.95rem}
    .vr-prompt > .vr-claim p{color:var(--vr-ink)!important}
    .vr-prompt > .vr-claim a{color:var(--vr-blue)!important}
    .vr-claim-id{font-family:system-ui,sans-serif;font-weight:800}
    .vr-claim-wording{font-weight:700}
    .vr-ledger-list{list-style:none;padding:0}
    .vr-ledger-list>li{padding:1rem 0;border-bottom:2px solid var(--vr-line)}
    .vr-footer{padding:2rem;text-align:center;background:#2d1735;color:#fff;font:1rem/1.5 system-ui,sans-serif}
    .vr-footer a{color:#fff}
    @media(max-width:560px){.vr-topbar{position:static;align-items:flex-start;flex-direction:column}.vr-definitions div{grid-template-columns:1fr}.vr-hero,.gr-page,.vr-prompt,.vr-transfer,.vr-metadata,.vr-sources,.vr-next{padding-left:1rem;padding-right:1rem}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important;transition:none!important}}
    @media print{.vr-topbar,.vr-check button,.vr-copy{display:none}.vr-shell{box-shadow:none}.vr-hold{border:2px solid #000}.vr-chapter,.vr-prompt{break-inside:avoid;background:#fff!important;color:#000!important}.vr-prompt > h2,.vr-prompt > p,.vr-prompt > label,.vr-prompt > .vr-warning{color:#000!important}.vr-prompt textarea{border:1px solid #000}.vr-source-list a::after{content:" (" attr(href) ")";font-size:.85em}}
  </style>
</head>
<body>
  <!-- GENERATED FILE. Canonical source: /${SOURCE_REL}; SHA-256: ${sourceSha} -->
  <div class="vr-shell">
    <nav class="vr-topbar" aria-label="Book navigation">
      <a href="/library.html">← Back to the LIBRAiRY</a>
      <a href="#receipt-loop">Jump to the Receipt Loop</a>
      <a href="#source-bound-prompt">Copyable prompt</a>
    </nav>
    <div class="vr-hold" role="status">Preview candidate · independent learning, accuracy, brand and accessibility review has not passed. Do not treat this page as an approved or published LAiDIES book.</div>
    <main>
      <header class="vr-hero">
        <p class="vr-eyebrow">${esc(book.opening.eyebrow)}</p>
        <h1>${esc(book.title)}</h1>
        <p class="vr-promise">${esc(book.opening.promise)}</p>
        <p class="vr-scenario">${esc(book.opening.scenario)}</p>
        ${interaction(book.opening, "opening")}
        ${claimBlocks(book.opening.claimIds)}
        <h2 id="receipt-loop-overview">The Receipt Loop</h2>
        <ol class="vr-loop" aria-label="Receipt Loop steps">${book.receiptLoop.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>
        <p>The label is a mnemonic. The mechanism is the claim-to-evidence decision process taught below.</p>
      </header>
      ${chapters}
      <section class="vr-prompt" id="source-bound-prompt" aria-labelledby="prompt-title">
        <h2 id="prompt-title">${esc(book.promptCard.title)}</h2>
        <p>${esc(book.promptCard.intro)}</p>
        <label for="vr-prompt-text">Copyable prompt</label>
        <textarea id="vr-prompt-text" readonly>${esc(book.promptCard.text)}</textarea>
        <button type="button" class="vr-copy" data-copy-target="vr-prompt-text">Copy prompt</button>
        <p class="vr-copy-status" role="status" aria-live="polite"></p>
        <p class="vr-warning">${esc(book.promptCard.warning)}</p>
        ${claimBlocks(book.promptCard.claimIds)}
      </section>
      <section class="vr-transfer" aria-labelledby="transfer-title">
        <h2 id="transfer-title">${esc(book.transferChallenge.title)}</h2>
        <p class="vr-scenario">${esc(book.transferChallenge.scenario)}</p>
        <ol>${book.transferChallenge.tasks.map((task) => `<li>${esc(task)}</li>`).join("")}</ol>
        <form class="vr-check vr-transfer-form" data-transfer>
          <label for="vr-transfer-claims">Split the material claims.</label>
          <textarea id="vr-transfer-claims" minlength="${book.transferChallenge.minimumClaimLength}" required></textarea>
          ${optionSelect("vr-transfer-price-verdict", book.transferChallenge.verdicts, "", "Price evidence verdict")}
          ${optionSelect("vr-transfer-speed-verdict", book.transferChallenge.verdicts, "", "Speed evidence verdict")}
          <label for="vr-transfer-action">What exact evidence actions come next?</label>
          <textarea id="vr-transfer-action" minlength="${book.transferChallenge.minimumActionLength}" required></textarea>
          <label for="vr-transfer-limitation">What scope, freshness or method limitations remain?</label>
          <textarea id="vr-transfer-limitation" minlength="${book.transferChallenge.minimumLimitationLength}" required></textarea>
          <button type="submit">Record my response and open self-check</button>
          ${selfCheckRubric(book.transferChallenge.rubricDimensions, "transfer")}
          <p class="vr-feedback" role="status" aria-live="polite" aria-atomic="true"></p>
        </form>
      </section>
      <section class="vr-metadata" aria-labelledby="metadata-title">
        <h2 id="metadata-title">Review, freshness and corrections</h2>
        <dl class="vr-meta-grid">
          <div><dt>Published</dt><dd>${esc(book.published)}</dd></div>
          <div><dt>Content version</dt><dd><code>${contentVersion}</code></dd></div>
          <div><dt>Last reviewed</dt><dd>${esc(book.lastReviewed)} · maker review only</dd></div>
          <div><dt>Next review</dt><dd>${esc(book.nextReview)}</dd></div>
          <div><dt>What can change</dt><dd>${esc(book.whatCanChange)}</dd></div>
        </dl>
        <p><a href="${esc(book.correctionRoute)}">Report a correction about a chapter, claim or source</a>. Include the relevant ID and what you found; do not email private source material.</p>
        <p><strong>Canonical source:</strong> <code>/${SOURCE_REL}</code><br><strong>Source SHA-256:</strong> <code>${sourceSha}</code><br><strong>Content version:</strong> <code>${contentVersion}</code></p>
      </section>
      <section class="vr-sources" aria-labelledby="sources-title">
        <h2 id="sources-title">Source drawer</h2>
        <p>Every material claim below is generated from the same canonical record as the reader wording. A working link does not, by itself, prove semantic support or currentness.</p>
        <details><summary>Open the claim ledger</summary><ol class="vr-ledger-list">${ledgerItems}</ol></details>
        <details><summary>Open all source records</summary><ol class="vr-source-list">${sources}</ol></details>
      </section>
      <section class="vr-next" aria-labelledby="next-title">
        <h2 id="next-title">Where to go next</h2>
        <ul class="vr-handoffs">${handoffs}</ul>
      </section>
    </main>
    <footer class="vr-footer">ECO-01 candidate · status HOLD · <a href="/library.html">Return to the LIBRAiRY</a></footer>
  </div>
  <script>
  (() => {
    function eco01SubmissionState({ fieldsValid, keyedMatch, prose }) {
      if (!fieldsValid) return "incomplete";
      if (String(prose || "").trim()) return "self-check-ready";
      return keyedMatch ? "keyed-match" : "review";
    }
    window.ECO01SubmissionState = eco01SubmissionState;
    document.querySelectorAll(".vr-check:not([data-transfer])").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const feedback = form.querySelector(".vr-feedback");
        if (!form.reportValidity()) {
          feedback.textContent = "Complete every choice and required explanation before checking.";
          feedback.dataset.result = "review";
          return;
        }
        const selects = [...form.querySelectorAll("select[data-answer]")];
        const radios = [...form.querySelectorAll('input[type="radio"]:checked')];
        const selectPass = selects.every((select) => select.value === select.dataset.answer);
        const radioPass = radios.length === 0 || radios.every((radio) => radio.dataset.correct === "true");
        const prose = [...form.querySelectorAll("textarea")].map((field) => field.value).join("\\n");
        const result = eco01SubmissionState({ fieldsValid: true, keyedMatch: selectPass && radioPass, prose });
        form.querySelectorAll(".vr-item-feedback").forEach((item) => { item.hidden = false; });
        const modelFeedback = ${JSON.stringify(book.chapters.map((chapter) => chapter.interaction.feedback || ""))}[Number(form.dataset.check?.replace("chapter-", "")) - 1] || "";
        if (result === "self-check-ready") {
          form.querySelector("[data-self-check]")?.removeAttribute("hidden");
          feedback.textContent = (selectPass && radioPass ? "Keyed choices match the model key. " : "Some keyed choices differ from the model key. ") + "Your written reasoning is recorded but not semantically scored. Compare it with the rubric and mark each dimension Met, Revise or Unsure. " + modelFeedback;
        } else {
          feedback.textContent = (result === "keyed-match" ? "Keyed choices match the model key. This checks selection, not independent understanding. " : "Review the model feedback and try the keyed choices again. ") + modelFeedback;
        }
        feedback.dataset.result = result;
      });
    });
    document.querySelector("[data-transfer]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const feedback = form.querySelector(".vr-feedback");
      if (!form.reportValidity()) {
        feedback.textContent = "Write a complete evidence plan before revealing the rubric.";
        feedback.dataset.result = "review";
        return;
      }
      form.querySelector("[data-self-check]")?.removeAttribute("hidden");
      feedback.textContent = "Response recorded but not semantically scored. Compare it with the rubric and mark each dimension Met, Revise or Unsure.";
      feedback.dataset.result = "self-check-ready";
    });
    document.querySelectorAll("[data-record-self-check]").forEach((button) => {
      button.addEventListener("click", () => {
        const form = button.closest("form");
        const choices = [...form.querySelectorAll("[data-rubric-choice]")];
        const feedback = form.querySelector(".vr-feedback");
        if (choices.some((choice) => !choice.value)) {
          feedback.textContent = "Mark every rubric dimension Met, Revise or Unsure before recording your self-check.";
          feedback.dataset.result = "review";
          choices.find((choice) => !choice.value)?.focus();
          return;
        }
        feedback.textContent = "Self-check recorded. This is reflection evidence, not an independent correctness score.";
        feedback.dataset.result = "recorded";
      });
    });
    const copyButton = document.querySelector("[data-copy-target]");
    copyButton?.addEventListener("click", async () => {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      const status = document.querySelector(".vr-copy-status");
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(target.value);
          copied = true;
        }
      } catch (_) {}
      if (!copied) {
        target.focus();
        target.select();
        try { copied = document.execCommand("copy"); } catch (_) {}
      }
      status.textContent = copied ? "Prompt copied. Open and check every material source before relying on the answer." : "Copy was unavailable. The prompt is selected so you can copy it manually.";
    });
  })();
  </script>
</body>
</html>
`;

const derivedLedger = {
  schemaVersion: "2.0.0",
  bookId: book.bookId,
  generatedFrom: `/${SOURCE_REL}`,
  generatedFromSha256: sourceSha,
  contentVersion,
  ledgerStatus: "CANDIDATE_UNDER_INDEPENDENT_REVIEW",
  reviewedOn: book.lastReviewed,
  reviewer: "ECO-01 maker — not an independent accuracy approval",
  canonicalVerdicts: book.canonicalVerdicts,
  claims: book.claimRegistry,
  sources: [...sourceMap.values()]
};
fs.mkdirSync(path.dirname(LEDGER_OUTPUT), { recursive: true });
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(LEDGER_OUTPUT, `${JSON.stringify(derivedLedger, null, 2)}\n`);
fs.writeFileSync(OUTPUT, output.replace(/[ \t]+$/gm, ""));
console.log(`Rendered ${OUTPUT_REL} from ${SOURCE_REL}`);
console.log(`Generated ${path.relative(ROOT, LEDGER_OUTPUT)} from ${SOURCE_REL}`);
console.log(`source_sha256=${sourceSha}`);
console.log(`content_version=${contentVersion}`);
