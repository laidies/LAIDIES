#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_PATH = "content/site/newsstand-catchup-v1.js";

const BANNED_VISITOR_COPY = [
  ["empty space honest", /empty space honest/i],
  ["desks stayed quiet", /desks stayed quiet/i],
  ["desk-by-desk record", /desk-by-desk record/i],
  ["Filed in this edition", /Filed in this edition/i],
  ["All nine service desks were checked", /All nine service desks were checked/i]
];

const REQUIRED_VISITOR_CONTROLS = [
  ["Daily section switcher", /class="ns-daily-section-switcher"/],
  ["Weekly route", /data-open-paper="weekly"/],
  ["Big Picture route", /data-open-paper="tribune"/],
  ["archive route", /data-open-archive/],
  ["topic continuation", /data-daily-topic/],
  ["brief-edition visitor copy", /Today&rsquo;s edition is brief\. More tomorrow\./]
];

export function inspectNewsstandDailyVisitorCopy(source) {
  const errors = [];
  for (const [label, pattern] of BANNED_VISITOR_COPY) {
    if (pattern.test(source)) errors.push(`visitor-facing administrative copy remains: ${label}`);
  }
  for (const [label, pattern] of REQUIRED_VISITOR_CONTROLS) {
    if (!pattern.test(source)) errors.push(`missing ${label}`);
  }
  if (/emptySecondaryDesks\.map\(deskMarkup\)|desks\.map\(deskMarkup\)/.test(source)) {
    errors.push("empty service-desk records are still rendered to visitors");
  }
  if (!/readySideDesks\.map\(deskMarkup\)/.test(source) || !/readySecondaryDesks\.map\(deskMarkup\)/.test(source)) {
    errors.push("admitted service items are not the only desk records rendered");
  }
  return { errors };
}

function main() {
  const file = path.resolve(ROOT, process.argv[2] || DEFAULT_PATH);
  const source = fs.readFileSync(file, "utf8");
  const result = inspectNewsstandDailyVisitorCopy(source);
  if (result.errors.length) {
    console.error("NEWSSTAND DAILY VISITOR COPY HOLD");
    result.errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log("NEWSSTAND DAILY VISITOR COPY PASS: administrative scaffolding absent; Daily, Weekly, Big Picture, archive and topic routes present");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
