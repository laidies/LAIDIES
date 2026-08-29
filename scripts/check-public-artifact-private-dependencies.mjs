#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const calibrate = args.includes("--calibrate");
const artifactArg = args.find((arg) => !arg.startsWith("--"));

function runtimeReferences(source, relative) {
  const failures = [];
  const pattern = /<(audio|img|link|script|source|video)\b[^>]*\b(href|src)\s*=\s*(["'])(\/operations\/[^"']+)\3/gi;
  for (const match of source.matchAll(pattern)) {
    failures.push({
      path: relative,
      tag: match[1].toLowerCase(),
      attribute: match[2].toLowerCase(),
      dependency: match[4],
    });
  }
  return failures;
}

if (calibrate) {
  const knownBad = '<!doctype html><link rel="stylesheet" href="/operations/private/proof.css"><main>Known bad</main>';
  const failures = runtimeReferences(knownBad, "known-bad.html");
  if (failures.length !== 1 || failures[0].dependency !== "/operations/private/proof.css") {
    console.error("PUBLIC ARTIFACT PRIVATE DEPENDENCY CALIBRATION FAIL known-bad accepted");
    process.exit(1);
  }
  console.log("PUBLIC ARTIFACT PRIVATE DEPENDENCY CALIBRATION PASS known-bad runtime reference rejected");
  process.exit(0);
}

if (!artifactArg) {
  console.error("Usage: node scripts/check-public-artifact-private-dependencies.mjs <artifact-directory> [--calibrate]");
  process.exit(2);
}

const artifactRoot = path.resolve(artifactArg);
if (!fs.statSync(artifactRoot, { throwIfNoEntry: false })?.isDirectory()) {
  console.error(`PUBLIC ARTIFACT PRIVATE DEPENDENCY FAIL missing artifact directory: ${artifactRoot}`);
  process.exit(2);
}

const htmlFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".wrangler") continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(absolute);
  }
}
walk(artifactRoot);

const failures = [];
for (const absolute of htmlFiles.sort()) {
  const relative = path.relative(artifactRoot, absolute).split(path.sep).join("/");
  failures.push(...runtimeReferences(fs.readFileSync(absolute, "utf8"), relative));
}

if (failures.length) {
  console.error(`PUBLIC ARTIFACT PRIVATE DEPENDENCY FAIL references=${failures.length}`);
  for (const failure of failures) {
    console.error(`${failure.path}: <${failure.tag}> ${failure.attribute}=${failure.dependency}`);
  }
  process.exit(1);
}

console.log(`PUBLIC ARTIFACT PRIVATE DEPENDENCY PASS html=${htmlFiles.length} references=0`);
