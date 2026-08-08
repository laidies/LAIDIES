#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const value = flag => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const source = value("--source");
const query = value("--query");
const product = value("--product");
if (!source || !query) {
  console.error("usage: node scripts/query-laidies-context.mjs --source decisions|lessons|canon|product --query <text> [--product <id>]");
  process.exit(2);
}
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
const needle = query.toLowerCase();
const results = [];
for (const relative of files) {
  const absolute = path.join(root, relative);
  const lines = fs.readFileSync(absolute, "utf8").split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].toLowerCase().includes(needle)) continue;
    const start = Math.max(0, index - 2);
    const end = Math.min(lines.length, index + 3);
    results.push({ path: relative, line: index + 1, excerpt: lines.slice(start, end).join("\n") });
    if (results.length >= 20) break;
  }
  if (results.length >= 20) break;
}
if (!results.length) {
  console.error(`NO CONTEXT MATCH source=${source} query=${JSON.stringify(query)}`);
  process.exit(1);
}
process.stdout.write(`${JSON.stringify({ source, query, results }, null, 2)}\n`);
