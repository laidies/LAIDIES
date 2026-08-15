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

if (!headline) errors.push("headline is missing");
if (!standfirst) errors.push("standfirst is missing");
if (!negation.test(headline)) errors.push("headline does not correct the likely frightening conclusion");
if (!negation.test(standfirst)) errors.push("standfirst does not repeat the correction before explanation");
if (!/\b(developer|developers|researcher|researchers)\b/.test(first120)) errors.push("first 120 words do not name the actual actor");
if (!/\b(posted|published|uploaded|shared)\b/.test(first120)) errors.push("first 120 words do not name the deliberate sharing action");
if (!/\b(file|files)\b/.test(first120)) errors.push("first 120 words do not name the ordinary object as a file");
if (!/\b(private chat|private chats|ordinary chat|ordinary chats)\b/.test(first120)) errors.push("first 120 words do not state the ordinary-chat boundary");
if (!/\b(inspect|study|reuse|show how|understand how)\b/.test(first120)) errors.push("first 120 words do not say why the file was shared");

if (errors.length) {
  console.error(`NEWSSTAND READER ENTRY FAIL\n${errors.map(error => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log("NEWSSTAND READER ENTRY INTEGRITY MATCH correction=headline+standfirst actor=present action=present object=file ordinary_chat_boundary=present sharing_reason=present boundary_words=120 quality_authority=none");
