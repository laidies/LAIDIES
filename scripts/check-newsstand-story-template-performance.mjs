#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { inspectNewsstandProducerProof } from "./check-newsstand-producer-proof.mjs";

const text = value => typeof value === "string" && value.trim().length > 0;
const normalize = value => String(value || "").replace(/[*_`]/g, "").trim();

export function requiredTemplateBeats(templateText, sectionName) {
  const escaped = String(sectionName || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(templateText || "").match(new RegExp(`^## ${escaped}\\s*$([\\s\\S]*?)(?=^## |\\Z)`, "m"));
  if (!match) return { errors: [`accepted template section is missing: ${sectionName}`], beats: [] };
  const rows = match[1].split(/\r?\n/).filter(line => /^\|/.test(line));
  const beats = [];
  for (const row of rows) {
    const cells = row.split("|").slice(1, -1).map(normalize);
    const first = cells[0];
    if (!first || /^(section|content|position)$/i.test(first) || /^-+$/.test(first)) continue;
    if (/^headline$/i.test(first)) continue;
    beats.push(first);
  }
  return { errors: beats.length ? [] : [`accepted template section has no section jobs: ${sectionName}`], beats };
}

function sectionBody(prose, heading) {
  const escaped = String(heading || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(prose || "").match(new RegExp(`^#{1,6} ${escaped}\\s*$([\\s\\S]*?)(?=^#{1,6} |(?![\\s\\S]))`, "m"))?.[1] || "";
}

export function inspectTemplatePerformance({ templateText, sectionName, prose, proof = null }) {
  const parsed = requiredTemplateBeats(templateText, sectionName);
  const errors = [...parsed.errors];
  const headings = String(prose || "").split(/\r?\n/)
    .map(line => line.match(/^#{1,6}\s+(.+?)\s*$/)?.[1])
    .filter(Boolean)
    .map(normalize);
  if (headings.length === 0) errors.push("exact prose has no readable Markdown headings");
  let cursor = 0;
  for (const beat of parsed.beats) {
    const index = headings.indexOf(beat, cursor);
    if (index === -1) errors.push(`exact prose does not perform accepted section heading in order: ${beat}`);
    else cursor = index + 1;
  }
  const sourceBeat = parsed.beats.find(beat => /^Sources and watch point$/i.test(beat));
  if (sourceBeat) {
    const sources = sectionBody(prose, sourceBeat);
    const links = sources.match(/\[[^\]]+\]\(https:\/\/[^)]+\)/g) || [];
    if (links.length === 0) errors.push("Sources and watch point must include direct reader-facing HTTPS Markdown links");
  }
  for (const phrase of (proof?.terminologyPlan?.prohibitedSynonyms || [])) {
    if (String(prose || "").toLowerCase().includes(String(phrase).toLowerCase())) errors.push(`exact prose uses prohibited synonym: ${phrase}`);
  }
  for (const phrase of (proof?.draftLimits?.prohibitedPhrases || [])) {
    if (String(prose || "").toLowerCase().includes(String(phrase).toLowerCase())) errors.push(`exact prose uses prohibited phrase: ${phrase}`);
  }
  return { errors, requiredBeats: parsed.beats, proseHeadings: headings };
}

function main() {
  const [proofPath, prosePath] = process.argv.slice(2);
  if (!proofPath || !prosePath) {
    console.error("usage: node scripts/check-newsstand-story-template-performance.mjs <producer-proof.json> <exact-prose.md>");
    process.exit(2);
  }
  let proof;
  try { proof = JSON.parse(fs.readFileSync(path.resolve(proofPath), "utf8")); }
  catch (error) { console.error(`NEWSSTAND STORY TEMPLATE PERFORMANCE FAIL\n- proof unavailable: ${error.message}`); process.exit(1); }
  const proofResult = inspectNewsstandProducerProof(proof);
  const errors = proofResult.errors.map(error => `producer proof: ${error}`);
  let templateText = "";
  let prose = "";
  try { templateText = fs.readFileSync(path.resolve(proof?.storyTemplate?.path), "utf8"); }
  catch (error) { errors.push(`accepted template unavailable: ${error.message}`); }
  try { prose = fs.readFileSync(path.resolve(prosePath), "utf8"); }
  catch (error) { errors.push(`exact prose unavailable: ${error.message}`); }
  const performance = inspectTemplatePerformance({ templateText, sectionName: proof?.storyTemplate?.section, prose, proof });
  errors.push(...performance.errors);
  if (errors.length) {
    console.error("NEWSSTAND STORY TEMPLATE PERFORMANCE FAIL");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`NEWSSTAND STORY TEMPLATE PERFORMANCE PASS section=${JSON.stringify(proof.storyTemplate.section)} beats=${performance.requiredBeats.length}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) main();
