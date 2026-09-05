#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const DEFAULT_BYTE_LIMIT = 8 * 1024;
const DEFAULT_RESULT_LIMIT = 8;
const MAX_QUERY_BYTES = 1024;
const value = flag => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const positiveInteger = (flag, fallback, minimum, maximum) => {
  const raw = value(flag);
  if (raw === null) return fallback;
  if (!/^\d+$/.test(raw) || Number(raw) < minimum || Number(raw) > maximum) throw new Error(`${flag} must be an integer from ${minimum} to ${maximum}`);
  return Number(raw);
};
const source = value("--source");
const query = value("--query");
const product = value("--product");
const byteLimit = positiveInteger("--max-bytes", DEFAULT_BYTE_LIMIT, 1024, 32 * 1024);
const resultLimit = positiveInteger("--max-results", DEFAULT_RESULT_LIMIT, 1, 20);
if (!source || !query) {
  console.error("usage: node scripts/query-laidies-context.mjs --source decisions|lessons|canon|product --query <text> [--product <id>] [--max-bytes <1024-32768>] [--max-results <1-20>]");
  process.exit(2);
}
const queryByteLimit = Math.min(MAX_QUERY_BYTES, Math.floor(byteLimit / 4));
if (Buffer.byteLength(query, "utf8") > queryByteLimit) throw new Error(`--query exceeds ${queryByteLimit} UTF-8 bytes for --max-bytes=${byteLimit}`);
const fixed = {
  decisions: ["operations/DECISIONS.md"],
  lessons: ["operations/LESSONS-ACTIVE.md"],
  canon: ["operations/voice/laidies-canon-index.md"]
};
let files = fixed[source];
if (source === "product") {
  if (!product || !/^[a-z0-9-]+$/.test(product)) throw new Error("--product requires a safe product id");
  const directory = path.join(root, "operations", "product-stewards", product);
  if (!fs.existsSync(directory)) throw new Error(`unknown product dossier: ${product}`);
  files = fs.readdirSync(directory).filter(name => /\.(md|json)$/.test(name)).sort().map(name => path.relative(root, path.join(directory, name)));
}
if (!files) throw new Error(`unknown source: ${source}`);

const utf8 = text => Buffer.byteLength(text, "utf8");
const output = response => `${JSON.stringify(response, null, 2)}\n`;
const clipUtf8 = (text, limit) => {
  let clipped = "";
  for (const character of text) {
    if (utf8(clipped + character) > limit) break;
    clipped += character;
  }
  return clipped;
};
const excerptFor = (lines, index, needle) => {
  const line = lines[index];
  const match = line.toLocaleLowerCase().indexOf(needle);
  const characters = Array.from(line);
  const matchCharacter = Array.from(line.slice(0, Math.max(0, match))).length;
  const needleCharacters = Array.from(line.slice(match, match + needle.length)).length;
  const start = Math.max(0, matchCharacter - 180);
  const end = Math.min(characters.length, matchCharacter + Math.max(needleCharacters, 1) + 360);
  const focus = `${start ? "…" : ""}${characters.slice(start, end).join("")}${end < characters.length ? "…" : ""}`;
  const before = index > 0 ? clipUtf8(lines[index - 1], 180) : "";
  const after = index + 1 < lines.length ? clipUtf8(lines[index + 1], 180) : "";
  return [before, focus, after].filter(Boolean).join("\n");
};

const needle = query.toLocaleLowerCase();
const candidates = [];
for (const relative of files) {
  const absolute = path.join(root, relative);
  const lines = fs.readFileSync(absolute, "utf8").split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].toLocaleLowerCase().includes(needle)) continue;
    const matchedLine = lines[index];
    const match = matchedLine.toLocaleLowerCase().indexOf(needle);
    const excerpt = excerptFor(lines, index, needle);
    const fullWindow = lines.slice(Math.max(0, index - 1), index + 2).filter(Boolean).join("\n");
    candidates.push({ path: relative, line: index + 1, excerpt, excerptTruncated: excerpt !== fullWindow,
      focus: `${match ? "…" : ""}${matchedLine.slice(match, match + query.length)}${match + query.length < matchedLine.length ? "…" : ""}` });
  }
}
if (!candidates.length) {
  console.error(`NO CONTEXT MATCH source=${source} query=${JSON.stringify(query)}`);
  process.exit(1);
}

const response = {
  source,
  query,
  previewOnly: true,
  notice: "Preview excerpts only. Retrieve and read the exact source before making a decision.",
  byteLimit,
  resultLimit,
  truncated: false,
  results: []
};
if (utf8(output(response)) > byteLimit) throw new Error("query metadata exceeds output byte budget; shorten --query");
for (const candidate of candidates) {
  if (response.results.length >= resultLimit) break;
  const { focus, ...preview } = candidate;
  let result = preview;
  response.results.push(result);
  if (utf8(output(response)) <= byteLimit) continue;
  response.results.pop();
  // Keep the actual matched text rather than clipping off the reason for the hit.
  result = { ...preview, excerpt: focus, excerptTruncated: true };
  if (utf8(output({ ...response, results: [...response.results, result] })) <= byteLimit) response.results.push(result);
  else break;
}
response.truncated = response.results.length < candidates.length;
while (utf8(output(response)) > byteLimit && response.results.length) {
  response.results.pop();
  response.truncated = true;
}
process.stdout.write(output(response));
