#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = path.join(root, "scripts", ".independent-judge-fixture.md");
fs.writeFileSync(fixture, "A deliberately small teaching artifact.\n");
try {
  const result = spawnSync(process.execPath, ["scripts/run-independent-content-judge.mjs", "--artifact", "scripts/.independent-judge-fixture.md", "--dry-run"], { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const invocation = JSON.parse(result.stdout);
  assert.equal(invocation.modelFamily, "claude");
  assert.equal(invocation.model, "fable");
  assert.equal(invocation.artifact.path, "scripts/.independent-judge-fixture.md");
  assert.match(invocation.prompt, /EXACT ARTIFACT/);
  assert.match(invocation.prompt, /BINDING WRITING LOCK/);
  assert.match(invocation.prompt, /POSITIVE VOICE EXEMPLAR/);
  assert.doesNotMatch(invocation.prompt, /PRODUCER_SELF_REVIEW/);
  assert.deepEqual(invocation.excludedContext, ["producer brief", "producer self-review", "maker receipts", "manifest", "validator output", "prior reviewer comments", "repository instructions"]);
  const news = spawnSync(process.execPath, ["scripts/run-independent-content-judge.mjs", "--artifact", "scripts/.independent-judge-fixture.md", "--content-class", "NEWS", "--dry-run"], { cwd: root, encoding: "utf8" });
  assert.equal(news.status, 0, news.stderr);
  const newsInvocation = JSON.parse(news.stdout);
  assert.equal(newsInvocation.contentClass, "NEWS");
  assert.equal(newsInvocation.exemplar.path, "operations/product-stewards/learning-content-ecosystem/exemplars/CQX-GOOD-NEWS-001-eu-ai-act.md");
  assert.equal(newsInvocation.productionStandard.path, "operations/product-stewards/newsstand/NEWSSTAND-EDITORIAL-PRODUCTION-STANDARD.md");
  assert.equal(newsInvocation.knownBad.path, "operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-exact-prose.md");
  assert.match(newsInvocation.prompt, /BINDING NEWSSTAND PRODUCTION STANDARD/);
  assert.match(newsInvocation.prompt, /DIRECTLY REJECTED PREDECESSOR/);
  const missing = spawnSync(process.execPath, ["scripts/run-independent-content-judge.mjs", "--artifact", "scripts/does-not-exist.md", "--dry-run"], { cwd: root, encoding: "utf8" });
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /BLOCKED/);
  console.log("INDEPENDENT CONTENT JUDGE CALIBRATION PASS: stripped artifact-first Fable invocation; missing artifact rejected");
} finally {
  fs.rmSync(fixture, { force: true });
}
