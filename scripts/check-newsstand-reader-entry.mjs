#!/usr/bin/env node

import fs from "node:fs";

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error("NEWSSTAND READER ENTRY FAIL\n- exact Markdown artifact path is required");
  process.exit(1);
}

const source = fs.readFileSync(file, "utf8");
const lines = source.split(/\r?\n/);
const headlineIndex = lines.findIndex(line => /^#\s+/.test(line));
const headline = headlineIndex >= 0 ? lines[headlineIndex].replace(/^#\s+/, "").trim() : "";
let standfirst = "";
const standfirstStart = lines.findIndex((line, index) => index > headlineIndex && /^\*[^*]/.test(line.trim()));
if (standfirstStart >= 0) {
  const parts = [];
  for (let index = standfirstStart; index < lines.length; index += 1) {
    parts.push(lines[index].trim());
    if (/\*$/.test(lines[index].trim()) && index > standfirstStart || /^\*[^*].*\*$/.test(lines[index].trim())) break;
  }
  standfirst = parts.join(" ").replace(/^\*|\*$/g, "").trim();
}
const prose = lines.slice(Math.max(0, headlineIndex + 1))
  .filter(line => !/^#{1,6}\s/.test(line) && !/^[-*]\s/.test(line) && !/^https?:\/\//.test(line))
  .join(" ")
  .replace(/[*_`[\]()]/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const first120 = prose.split(/\s+/).slice(0, 120).join(" ").toLowerCase();
const errors = [];
const negation = /\b(did not|didn't|does not|doesn't|not your|not every|not ordinary|was not|wasn't)\b/i;

const section = heading => {
  const start = lines.findIndex(line => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start < 0) return "";
  const endOffset = lines.slice(start + 1).findIndex(line => /^##\s+/.test(line));
  const end = endOffset < 0 ? lines.length : start + 1 + endOffset;
  return lines.slice(start + 1, end).join("\n").trim();
};

const publicItem = section("What you may have seen");
const storySummary = section("What it was saying");
const route = section("How this happened");
const boundaries = section("When this can happen — and when it cannot") || section("When this can happen—and when it cannot");
const unintended = section("What could be included without realizing it");

if (!headline) errors.push("headline is missing");
if (!standfirst) errors.push("standfirst is missing");
if (!negation.test(headline)) errors.push("headline does not correct the likely frightening conclusion");
if (!negation.test(standfirst)) errors.push("standfirst does not repeat the correction before explanation");
if (!/\b(developer|developers|researcher|researchers)\b/.test(first120)) errors.push("first 120 words do not name the actual actor");
if (!/\b(posted|published|uploaded|shared)\b/.test(first120)) errors.push("first 120 words do not name the deliberate sharing action");
if (!/\b(record|records|file|files)\b/.test(first120)) errors.push("first 120 words do not name the ordinary object as a saved record or file");
if (!/\b(private chat|private chats|ordinary chat|ordinary chats)\b/.test(first120)) errors.push("first 120 words do not state the ordinary-chat boundary");
if (!/\b(inspect|study|reuse|reproduce|show how|understand how)\b/.test(first120)) errors.push("first 120 words do not say why the record was shared");

if (!publicItem) errors.push("missing exact-source section: What you may have seen");
if (publicItem && !/https?:\/\//.test(publicItem)) errors.push("exact-source section does not link the public item");
if (publicItem && !/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},\s+\d{4}\b/i.test(publicItem)) errors.push("exact-source section does not give the publication date");
if (publicItem && !/\b(paper|preprint|article|report|post|announcement)\b/i.test(publicItem)) errors.push("exact-source section does not identify what kind of public item it was");
if (!storySummary) errors.push("missing fair-summary section: What it was saying");
if (storySummary && storySummary.split(/\s+/).length < 35) errors.push("story summary is too short to fairly state the public item's claim");

if (!route) errors.push("missing complete sharing journey: How this happened");
if (route && !/\b(used|using|asked)\b/i.test(route)) errors.push("sharing journey does not show the person using or instructing the AI tool");
if (route && !/\b(created|saved|recorded|produced|kept)\b/i.test(route)) errors.push("sharing journey does not show how the record was created or saved");
if (route && !/\b(uploaded|published|posted|committed)\b/i.test(route)) errors.push("sharing journey does not show the deliberate upload or publication action");
if (route && !/\b(github|hugging face|public repository|public website)\b/i.test(route)) errors.push("sharing journey does not name where the record went");
if (route && !/\b(inspect|study|reuse|reproduce)\b/i.test(route)) errors.push("sharing journey does not explain why the record was published");

if (!boundaries) errors.push("missing can/cannot boundary section");
if (boundaries && !/\bselect(?:ed|ing)?\b[^.]{0,100}\bvisible\b[^.]{0,100}\b(past(?:e|ed|ing)|cop(?:y|ied|ying))\b/i.test(boundaries)) errors.push("boundary section does not explain selecting visible words and pasting only those words");
if (boundaries && !/\b(public|share)\s+(chat\s+)?link\b/i.test(boundaries)) errors.push("boundary section does not distinguish a public chat link");
if (boundaries && !/\b(diagnostic|troubleshooting|support)\b/i.test(boundaries)) errors.push("boundary section does not distinguish a requested diagnostic record");
if (boundaries && !/\b(developer|research)\b[^.]{0,120}\b(record|run|file)\b/i.test(boundaries)) errors.push("boundary section does not identify the directly studied developer/research record");

if (!unintended) errors.push("missing unintended-contents section");
if (unintended && !/\b(passwords?|api keys?|access tokens?|private keys?)\b/i.test(unintended)) errors.push("unintended-contents section lacks concrete sensitive examples");
if (unintended && !/\b(clean|remove|sanitize|scrub)\w*\b/i.test(unintended)) errors.push("unintended-contents section lacks an evidence-supported route into the hidden record");
if (unintended && !/\b(could not determine|couldn't determine|unknown|not know|cannot know)\b/i.test(unintended)) errors.push("unintended-contents section does not preserve unknown origins");

if (/\b(copy(?:ing)? an answer|full work file)\b/i.test(source)) errors.push("article uses rejected vague shorthand: copying an answer or full work file");

if (errors.length) {
  console.error(`NEWSSTAND READER ENTRY FAIL\n${errors.map(error => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log("NEWSSTAND READER ENTRY INTEGRITY MATCH correction=headline+standfirst exact_source=present fair_summary=present sharing_journey=complete can_cannot_boundary=present unintended_contents=present boundary_words=120 quality_authority=none");
