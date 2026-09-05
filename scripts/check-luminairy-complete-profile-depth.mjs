#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_HEADINGS = [
  "Why they are here",
  "The move",
  "What this looks like at work",
  "Try it this week",
  "Do not confuse it with staying current",
  "Where the analogy stops",
  "Keep going"
];

export function inspectCompleteProfileDepth(body) {
  const errors = [];
  const words = String(body || "").match(/[A-Za-z0-9’'-]+/g) || [];
  if (words.length < 450) errors.push(`complete profile needs at least 450 words; found ${words.length}`);
  for (const heading of REQUIRED_HEADINGS) {
    if (!String(body || "").includes(`## ${heading}`)) errors.push(`missing section: ${heading}`);
  }
  const numberedSteps = String(body || "").match(/^\d+\. \*\*/gm) || [];
  if (numberedSteps.length < 4) errors.push(`mechanism needs at least four explicit steps; found ${numberedSteps.length}`);
  if (!/AI[^\n.]{0,120}(check|verify)|(?:check|verify)[^\n.]{0,120}AI/i.test(body)) errors.push("worked case must keep an explicit human check around the AI step");
  if (!/illustrative (?:example|case|scenario)/i.test(body)) errors.push("worked case must be labelled illustrative unless it is evidence-bound");
  if (!/Popularity is not proof/i.test(body)) errors.push("profile needs the adoption-is-not-evidence boundary");
  const externalLinks = String(body || "").match(/https:\/\/[^)\s]+/g) || [];
  if (externalLinks.length < 2) errors.push(`complete profile needs at least two source destinations; found ${externalLinks.length}`);
  if (!/Sources checked \d{4}-\d{2}-\d{2}/.test(body)) errors.push("sources need an exact checked date");
  return { errors, wordCount: words.length };
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node scripts/check-luminairy-complete-profile-depth.mjs <profile.md>");
    process.exit(2);
  }
  const body = fs.readFileSync(path.resolve(file), "utf8");
  const result = inspectCompleteProfileDepth(body);
  if (result.errors.length) {
    console.error("LUMINAIRY COMPLETE PROFILE DEPTH FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`LUMINAIRY COMPLETE PROFILE DEPTH MATCH words=${result.wordCount} quality_authority=none`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
