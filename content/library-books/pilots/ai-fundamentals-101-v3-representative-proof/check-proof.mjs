#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export function inspectProof({ reviewText, html, desktopSvg, mobileSvg }) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  const mainRoute = reviewText.split("## Concept Index entry")[0];
  const forbidden = [
    [/UTF-8/i, "main route reintroduced UTF-8"],
    [/byte[- ]pair|BPE merge|merge ranking/i, "main route reintroduced byte-pair implementation detail"],
    [/token IDs?|integer IDs?/i, "main route reintroduced token IDs"],
    [/A token is a token/i, "main route reintroduced rejected example"],
    [/ChatGPT (?:cannot|can’t) count|every (?:current )?model (?:fails|gets)/i, "main route makes a universal strawberry-failure claim"]
  ];
  for (const [pattern, message] of forbidden) require(!pattern.test(mainRoute), message);

  for (const anchor of [
    "Tokens: why AI can write a paragraph and still trip over a word",
    "st | raw | berry",
    "Another encoding may split the same word differently.",
    "The Rewind Era version",
    "What the strawberry example actually shows",
    "A context window is measured in tokens.",
    "Some AI services meter API use in tokens.",
    "Exact text jobs deserve exact methods.",
    "your text → tokenizer → token pieces → model → generated token pieces → readable response",
    "## Concept Index entry",
    "**Do not confuse it with:**"
  ]) require(reviewText.includes(anchor), `required teaching anchor is missing: ${anchor}`);

  require(reviewText.indexOf("## Concept Index entry") > reviewText.indexOf("The question to take with you"), "Concept Index must remain a separate lookup route after the connected lesson");
  require(!/\.(png|jpe?g|webp)["')]/i.test(html), "rendered proof must not use raster screenshots");
  require(html.includes("strawberry-token-route.svg"), "desktop deterministic SVG is not rendered");
  require(html.includes("strawberry-token-route-mobile.svg"), "mobile deterministic SVG is not rendered");
  require(html.includes("(max-width: 560px)"), "mobile visual breakpoint is missing");
  require(desktopSvg.includes('viewBox="0 0 1200 720"'), "desktop SVG viewBox changed");
  require(mobileSvg.includes('viewBox="0 0 390 1060"'), "mobile SVG viewBox changed");
  require((desktopSvg.match(/o200k_base/g) || []).length === 2 && (mobileSvg.match(/o200k_base/g) || []).length === 2, "each visual must name the exact encoding in its visible label and accessible description");
  require(desktopSvg.includes("another encoding may split it differently") && mobileSvg.includes("Another encoding may split it differently"), "encoding-variation warning is missing from a visual");

  for (const anchor of [
    "Tokens: why AI can write a paragraph and still trip over a word",
    "Current AI products may answer it correctly.",
    "The tokenizer is not rummaging through",
    "Tokenization is therefore one reason letter-by-letter jobs can be unexpectedly awkward",
    "A context window is measured in tokens.",
    "How was this text split, what else is sharing the context window"
  ]) require(html.includes(anchor), `rendered artifact drifted from reviewed prose: ${anchor}`);

  return errors;
}

export function loadAndInspectProof(root = here) {
  const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
  return inspectProof({
    reviewText: read("review-text.md"),
    html: read("review.html"),
    desktopSvg: read("visuals/strawberry-token-route.svg"),
    mobileSvg: read("visuals/strawberry-token-route-mobile.svg")
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = loadAndInspectProof();
  if (errors.length) {
    console.error("AI FUNDAMENTALS V3 REPRESENTATIVE PROOF FAIL");
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log("AI FUNDAMENTALS V3 REPRESENTATIVE PROOF OBJECTIVE MATCH quality_authority=none");
}
