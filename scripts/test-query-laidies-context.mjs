#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-context-query-"));
const queryScript = path.join(temporaryRoot, "scripts", "query-laidies-context.mjs");
const write = (relative, body) => {
  const target = path.join(temporaryRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body);
};
const run = argv => spawnSync(process.execPath, [queryScript, ...argv], { encoding: "utf8" });
try {
  fs.mkdirSync(path.dirname(queryScript), { recursive: true });
  fs.copyFileSync(path.join(sourceRoot, "scripts", "query-laidies-context.mjs"), queryScript);
  const longLine = `${"🙂 ".repeat(12000)}The unicode target appears here with enough surrounding detail to remain useful. ${"終".repeat(12000)}`;
  assert.ok(Buffer.byteLength(longLine, "utf8") > 1024, "fixture reproduces the formerly unbounded matched-line risk");
  write("operations/DECISIONS.md", `# Decisions\n\n${longLine}\n`);
  write("operations/LESSONS-ACTIVE.md", "# Lessons\nordinary lesson retrieval is useful\n");
  write("operations/voice/laidies-canon-index.md", "# Canon\ncanon result\n");

  const bounded = run(["--source", "decisions", "--query", "unicode target", "--max-bytes", "1024", "--max-results", "4"]);
  assert.equal(bounded.status, 0, bounded.stderr);
  assert.ok(Buffer.byteLength(bounded.stdout, "utf8") <= 1024, "JSON output must remain within its advertised byte limit");
  const boundedBody = JSON.parse(bounded.stdout);
  assert.equal(boundedBody.previewOnly, true);
  assert.equal(boundedBody.byteLimit, 1024);
  assert.match(boundedBody.notice, /Retrieve and read the exact source/i);
  assert.match(boundedBody.results[0].excerpt, /unicode target/i);
  assert.equal(boundedBody.results[0].excerptTruncated, true);
  assert.equal(boundedBody.truncated, false);

  const ordinary = run(["--source", "lessons", "--query", "ordinary lesson"]);
  assert.equal(ordinary.status, 0, ordinary.stderr);
  assert.match(JSON.parse(ordinary.stdout).results[0].excerpt, /ordinary lesson retrieval/i);

  write("operations/DECISIONS.md", `${"🙂".repeat(16000)} actual needle ${"🙂".repeat(16000)}`);
  const dense = run(["--source", "decisions", "--query", "actual needle", "--max-bytes", "1024"]);
  assert.equal(dense.status, 0, dense.stderr);
  assert.ok(Buffer.byteLength(dense.stdout, "utf8") <= 1024);
  assert.match(JSON.parse(dense.stdout).results[0].excerpt, /actual needle/);

  write("operations/DECISIONS.md", Array.from({ length: 30 }, (_, i) => `match ${i}`).join("\n"));
  const many = run(["--source", "decisions", "--query", "match", "--max-results", "2"]);
  assert.equal(JSON.parse(many.stdout).results.length, 2);
  assert.equal(JSON.parse(many.stdout).truncated, true);
  assert.ok(Buffer.byteLength(many.stdout, "utf8") <= 8192);

  const noMatch = run(["--source", "canon", "--query", "missing phrase"]);
  assert.equal(noMatch.status, 1);
  assert.match(noMatch.stderr, /NO CONTEXT MATCH/);
  console.log("CONTEXT QUERY CALIBRATION PASS long_unicode_bounded=1 ordinary=1 no_match=1");
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
