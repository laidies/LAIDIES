#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.EP04_BANNED_ROOT || process.cwd());
const decisionsPath = path.resolve(
  root,
  process.env.EP04_CUT_DECISIONS || "operations/ep04-cut-decisions.md",
);

function readBannedSubstrings() {
  const decisions = fs.readFileSync(decisionsPath, "utf8");
  const block = decisions.match(/```banned\s*\n([\s\S]*?)```/);
  if (!block) throw new Error(`EP04 BANNED-CUT FAIL: banned block missing from ${decisionsPath}`);
  const banned = block[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!banned.length) throw new Error("EP04 BANNED-CUT FAIL: banned block is empty");
  return banned;
}

function walk(directory, matches) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolute, matches);
      continue;
    }
    if (!/\.(?:py|mjs|js|sh)$/i.test(entry.name)) continue;
    if (!/(?:episode-04|ep04)/i.test(entry.name)) continue;
    if (/check-episode-04-banned-cut-assets|test-episode-04-banned-cut-assets/.test(entry.name)) continue;
    matches.push(absolute);
  }
}

function activeConsumerPaths() {
  if (process.env.EP04_BANNED_SCAN_PATHS) {
    return process.env.EP04_BANNED_SCAN_PATHS
      .split(path.delimiter)
      .filter(Boolean)
      .map((item) => path.resolve(root, item));
  }
  const paths = [path.join(root, "content/episodes/episode-04-cues.json")];
  walk(path.join(root, "scripts"), paths);
  walk(path.join(root, "assets/video"), paths);
  return paths;
}

const banned = readBannedSubstrings();
const violations = [];
for (const file of activeConsumerPaths()) {
  if (!fs.existsSync(file)) {
    violations.push(`${path.relative(root, file)}: active consumer missing`);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  for (const token of banned) {
    if (source.includes(token)) violations.push(`${path.relative(root, file)}: ${token}`);
  }
}

if (violations.length) {
  console.error("EP04 BANNED-CUT FAIL");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log("EP04 BANNED-CUT PASS");
console.log(`banned_tokens=${banned.length}`);
console.log(`active_consumers=${activeConsumerPaths().length}`);
