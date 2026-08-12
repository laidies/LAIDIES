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

const weeklyConfigPath = path.join(ROOT, "operations/product-stewards/newsstand/candidates/weekly-cross-lab-longform-compile.json");
const weeklyResult = compile(weeklyConfigPath);
assert.equal(weeklyResult.status, 0, weeklyResult.stderr);
const weeklyCompiled = JSON.parse(weeklyResult.stdout);
assert.equal(weeklyCompiled.sections.length, 6);
assert.equal(weeklyCompiled.sections.flatMap((section) => section.blocks).length, 43);
const weeklyCandidate = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/candidates/weekly-cross-lab-story-record-candidate.json"), "utf8"));
assert.equal(weeklyCandidate.candidateStatus, "HELD_NOT_PUBLISHED");
assert.equal(weeklyCandidate.story.edition, "weekly");
assert.equal(weeklyCandidate.story.publishedAt, null);
assert.deepEqual(weeklyCandidate.story.longform, weeklyCompiled, "the Weekly held record must bind the exact compiler output");
assert.equal(weeklyCandidate.story.sources.length, 5);
const weeklyDataset = JSON.parse(JSON.stringify(dataContext.window.NEWSSTAND_DATA));
weeklyDataset.stories.push(weeklyCandidate.story);
assert.equal(contractContext.module.exports.validate(weeklyDataset).length, 0, "the Weekly held story must pass the production reader contract");
const weeklyDecision = contractContext.module.exports.accessDecision(weeklyDataset, weeklyCandidate.story, { scope: "hash" }, "2026-08-12T12:45:00Z");
assert.equal(weeklyDecision.canExpose, false, "the Weekly held story must remain inaccessible");
assert.equal(weeklyDecision.state, "hold");

const dailyConfigPath = path.join(ROOT, "operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-longform-compile.json");
const dailyResult = compile(dailyConfigPath);
assert.equal(dailyResult.status, 0, dailyResult.stderr);
const dailyConfig = JSON.parse(fs.readFileSync(dailyConfigPath, "utf8"));
const dailyCandidatePath = path.resolve(path.dirname(dailyConfigPath), dailyConfig.outputPath);
assert.equal(dailyResult.stdout.trim(), path.relative(ROOT, dailyCandidatePath));
const dailyCandidate = JSON.parse(fs.readFileSync(dailyCandidatePath, "utf8"));
const dailyCompiled = dailyCandidate.story.longform;
assert.equal(dailyCandidate.candidateStatus, "HELD_NOT_PUBLISHED");
assert.equal(dailyCandidate.story.edition, "daily");
assert.equal(dailyCandidate.story.status, "hold");
assert.equal(dailyCandidate.story.publishedAt, null);
assert.equal(dailyCompiled.sections.length, 8);
assert.equal(dailyCompiled.sections.flatMap((section) => section.blocks).length, 27);
assert.deepEqual(dailyCompiled.jumpSectionIds, [
  "the-file-is-bigger-than-the-chat-window", "the-number-to-circle-is-64",
  "patched-does-not-mean-nothing-to-learn-here", "where-this-becomes-your-problem",
  "before-you-hit-share", "the-cocktail-party-version"
]);
const dailyDataset = JSON.parse(JSON.stringify(dataContext.window.NEWSSTAND_DATA));
dailyDataset.stories.push(dailyCandidate.story);
assert.equal(contractContext.module.exports.validate(dailyDataset).length, 0, "the Daily held story must pass the production reader contract");
const dailyDecision = contractContext.module.exports.accessDecision(dailyDataset, dailyCandidate.story, { scope: "hash" }, "2026-08-12T20:08:00Z");
assert.equal(dailyDecision.canExpose, false, "the Daily held story must remain inaccessible");
assert.equal(dailyDecision.state, "hold");

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
const weeklyConfig = JSON.parse(fs.readFileSync(weeklyConfigPath, "utf8"));
const weeklySource = fs.readFileSync(path.resolve(path.dirname(weeklyConfigPath), weeklyConfig.sourcePath), "utf8");
const weeklySourceMeaning = plain(weeklySource.split(/\r?\n/).slice(3).filter((line) => line.trim() !== "---").map((line) => line
  .replace(/^#{2,3}\s+/, "").replace(/^>\s?/, "").replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")).join(" ")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]/g, ""));
const weeklyCompiledMeaning = plain(weeklyCompiled.sections.flatMap((section) => [section.label === weeklyConfig.introSectionLabel ? "" : section.label, ...section.blocks.flatMap((block) => {
  if (block.type === "subheading" && ["At work", "At home"].includes(block.text)) return [];
  return block.items || block.text || block.body;
})]).join(" "));
assert.equal(weeklyCompiledMeaning, weeklySourceMeaning, "the Weekly compiler must preserve all source meaning-bearing text in order");

const dailySource = fs.readFileSync(path.resolve(path.dirname(dailyConfigPath), dailyConfig.sourcePath), "utf8");
const dailySourceMeaning = plain(dailySource.split(/\r?\n/).slice(5).filter((line) => line.trim() !== "---").map((line) => line
  .replace(/^#{2,3}\s+/, "").replace(/^>\s?/, "").replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")).join(" ")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]/g, ""));
const dailyCompiledMeaning = plain(dailyCompiled.sections.flatMap((section) => [section.label === dailyConfig.introSectionLabel ? "" : section.label, ...section.blocks.flatMap((block) => block.items || block.text || block.body)]).join(" "));
assert.equal(dailyCompiledMeaning, dailySourceMeaning, "the Daily compiler must preserve all source meaning-bearing text in order");

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

  const dailySourcePath = path.resolve(path.dirname(dailyConfigPath), dailyConfig.sourcePath);
  const missingDailyBlockSource = fs.readFileSync(dailySourcePath, "utf8").replace(
    /\nThis is where the numbers need name labels\.[^\n]+\n/,
    "\n"
  );
  const missingDailyBlockSourcePath = path.join(temp, "daily-missing-statistical-unit-bridge.md");
  fs.writeFileSync(missingDailyBlockSourcePath, missingDailyBlockSource);
  const missingDailyBlockConfig = {
    ...dailyConfig,
    sourcePath: missingDailyBlockSourcePath,
    storyTemplatePath: path.resolve(path.dirname(dailyConfigPath), dailyConfig.storyTemplatePath),
    outputPath: path.join(temp, "daily-missing-statistical-unit-bridge.json")
  };
  const missingDailyBlockConfigPath = path.join(temp, "daily-missing-statistical-unit-bridge-config.json");
  fs.writeFileSync(missingDailyBlockConfigPath, JSON.stringify(missingDailyBlockConfig));
  const missingDailyBlockResult = compile(missingDailyBlockConfigPath);
  assert.equal(missingDailyBlockResult.status, 0, missingDailyBlockResult.stderr);
  const missingDailyBlock = JSON.parse(fs.readFileSync(missingDailyBlockConfig.outputPath, "utf8"));
  assert.notEqual(
    missingDailyBlock.story.longform.sections.flatMap((section) => section.blocks).length,
    27,
    "calibration: deleting the statistical-unit bridge must trip the exact block-count guard"
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log("✓ NEWSSTAND LONGFORM COMPILER: exact prose order preserved · Big Question + Weekly + Daily held records · 3 negative calibrations");
