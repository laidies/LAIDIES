#!/usr/bin/env node
import fs from "node:fs";

const book = JSON.parse(fs.readFileSync("content/library-books/verification-rulebook.json", "utf8"));
const source = book.sources.find((item) => item.id === "SRC-C2PA-2-4");
if (!source?.currentVersion || !source?.versionIndexUrl || !source?.versionPattern) {
  throw new Error("ECO-01 C2PA version monitor configuration is incomplete");
}

const fixtureIndex = process.argv.indexOf("--fixture");
let body;
if (fixtureIndex >= 0) {
  const fixturePath = process.argv[fixtureIndex + 1];
  if (!fixturePath) throw new Error("--fixture requires a path");
  body = fs.readFileSync(fixturePath, "utf8");
} else {
  const response = await fetch(source.versionIndexUrl, { redirect: "follow", signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`C2PA version index returned HTTP ${response.status}`);
  body = await response.text();
}

const versions = [
  ...[...body.matchAll(/C2PA Specifications\s+([0-9]+\.[0-9]+)/gi)].map((match) => match[1]),
  ...[...body.matchAll(/\/specifications\/specifications\/([0-9]+\.[0-9]+)\//gi)].map((match) => match[1])
];
if (!versions.length) throw new Error("C2PA version monitor found no specification version");
const parts = (version) => version.split(".").map(Number);
const latest = versions.sort((a, b) => {
  const [aMajor, aMinor] = parts(a);
  const [bMajor, bMinor] = parts(b);
  return bMajor - aMajor || bMinor - aMinor;
})[0];
if (latest !== source.currentVersion) {
  console.error(`ECO-01 SOURCE VERSION FAIL: ledger=${source.currentVersion} official_index=${latest}`);
  process.exit(1);
}
console.log(`ECO-01 SOURCE VERSION PASS: C2PA ${latest}`);
