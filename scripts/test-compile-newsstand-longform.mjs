#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CONFIG = path.join(ROOT, "operations/product-stewards/newsstand/candidates/big-question-cross-lab-longform-compile.json");
const SCRIPT = path.join(ROOT, "scripts/compile-newsstand-longform.mjs");

function compile(configPath) {
  return childProcess.spawnSync(process.execPath, [SCRIPT, configPath], { cwd: ROOT, encoding: "utf8" });
}

function plain(value) {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

const result = compile(CONFIG);
assert.equal(result.status, 0, result.stderr);
const compiled = JSON.parse(result.stdout);
assert.equal(compiled.sections.length, 10);
assert.deepEqual(compiled.jumpSectionIds, [
  "the-short-answer", "what-has-actually-happened", "so-how-worried-should-you-be",
  "what-is-still-missing-from-the-takeover-chain", "sources-and-what-could-change-this-conclusion"
]);
const blocks = compiled.sections.flatMap((section) => section.blocks);
assert.deepEqual(blocks.filter((block) => block.type === "subheading" && ["At work", "At home"].includes(block.text)).map((block) => block.text), ["At work", "At home"]);
assert.deepEqual(blocks.filter((block) => block.type === "quote").map((block) => block.role), ["evidence", "myth", "conclusion", "conclusion"]);

const candidatePath = path.join(ROOT, "operations/product-stewards/newsstand/candidates/big-question-cross-lab-story-record-candidate.json");
const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
assert.equal(candidate.candidateStatus, "HELD_NOT_PUBLISHED");
assert.equal(candidate.story.status, "hold");
assert.equal(candidate.story.publishedAt, null, "a held record must not fabricate a publication instant");
assert.deepEqual(candidate.story.longform, compiled, "the held record must bind the exact compiler output");
assert.equal(candidate.story.sources.length, 12);
assert.equal(candidate.story.sources.every((source) => source.approvalStatus === "reviewed" && ["http:", "https:"].includes(new URL(source.url).protocol)), true);

const vm = await import("node:vm");
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"), dataContext);
const contractContext = { module: { exports: {} }, exports: {}, window: undefined };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content/newsstand-reader-contract.js"), "utf8"), contractContext);
const candidateDataset = JSON.parse(JSON.stringify(dataContext.window.NEWSSTAND_DATA));
candidateDataset.stories.push(candidate.story);
assert.equal(contractContext.module.exports.validate(candidateDataset).length, 0, "the held story record must pass the production reader contract");
const decision = contractContext.module.exports.accessDecision(candidateDataset, candidate.story, { scope: "hash" }, "2026-08-12T12:30:00Z");
assert.equal(decision.canExpose, false, "the held story record must remain inaccessible");
assert.equal(decision.state, "hold");

const config = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
const source = fs.readFileSync(path.resolve(path.dirname(CONFIG), config.sourcePath), "utf8");
const sourceMeaning = plain(source.split(/\r?\n/).slice(3).filter((line) => line.trim() !== "---").map((line) => line
  .replace(/^#{2,3}\s+/, "").replace(/^>\s?/, "").replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")).join(" ")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]/g, ""));
const compiledMeaning = plain(compiled.sections.flatMap((section) => [section.label, ...section.blocks.flatMap((block) => {
  if (block.type === "subheading" && ["At work", "At home"].includes(block.text)) return [];
  return block.items || block.text || block.body;
})]).join(" "));
assert.equal(compiledMeaning, sourceMeaning, "the compiler must preserve all source meaning-bearing text in order");

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-longform-"));
try {
  const missingJumpConfig = { ...config, sourcePath: path.resolve(path.dirname(CONFIG), config.sourcePath), jumpHeadings: [...config.jumpHeadings, "Invented missing section"] };
  const missingJumpPath = path.join(temp, "missing-jump.json");
  fs.writeFileSync(missingJumpPath, JSON.stringify(missingJumpConfig));
  const missingJump = compile(missingJumpPath);
  assert.notEqual(missingJump.status, 0, "calibration: an invented jump target must fail");
  assert.match(missingJump.stderr, /Configured jump target is missing/);

  const wrongIdentityConfig = { ...config, sourcePath: path.resolve(path.dirname(CONFIG), config.sourcePath), expectedTitle: "Wrong article" };
  const wrongIdentityPath = path.join(temp, "wrong-identity.json");
  fs.writeFileSync(wrongIdentityPath, JSON.stringify(wrongIdentityConfig));
  const wrongIdentity = compile(wrongIdentityPath);
  assert.notEqual(wrongIdentity.status, 0, "calibration: a source identity mismatch must fail");
  assert.match(wrongIdentity.stderr, /Source identity mismatch/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log("✓ NEWSSTAND LONGFORM COMPILER: exact prose order preserved · 10 sections · 2 negative calibrations");
