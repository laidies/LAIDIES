#!/usr/bin/env node

import fs from "node:fs";

const path = process.argv[2] || "content/library-books/sources/move-37.manuscript.md";
const manuscript = fs.readFileSync(path, "utf8");

const failures = [
  ["abstract beauty language", /\b(?:gorgeous|beautiful|beauty)\b/gi],
  ["breathless awe language", /\b(?:wonder|wonderful|wonderfully|awe|astonishing|astonished|extraordinary|remarkable|remarkably|profound|glorious)\b/gi],
  ["technology described as magic", /\b(?:magic|magical)\b/gi],
  ["inflated history claim", /\b(?:changed the world forever|the world after it was not quite the same)\b/gi],
  ["canned not-this-but-that reveal", /\b(?:the real breakthrough was not|what made the breakthrough .* was not)\b/gi],
  ["self-congratulatory landing", /\b(?:that is .{0,40}enough|our job is not to ration)\b/gi],
  ["public operations language", /\b(?:receipt|candidate seal|admission gate|working draft preview)\b/gi],
];

const findings = [];
for (const [label, pattern] of failures) {
  for (const match of manuscript.matchAll(pattern)) {
    const line = manuscript.slice(0, match.index).split("\n").length;
    findings.push({ label, line, text: match[0] });
  }
}

if (findings.length) {
  console.error(`MOVE 37 VOICE CHECK: FAIL (${findings.length} findings)`);
  for (const finding of findings) {
    console.error(`${path}:${finding.line}: ${finding.label}: “${finding.text}”`);
  }
  process.exit(1);
}

console.log("MOVE 37 VOICE CHECK: PASS");
