#!/usr/bin/env node

import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts/compile-newsstand-longform.mjs");
const CANDIDATE_DIR = path.join(ROOT, "operations/product-stewards/newsstand/candidates");
const CONFIG_PATH = path.join(CANDIDATE_DIR, "ai-work-files-private-details-2026-08-12-longform-compile-v2.json");
const SOURCE_PATH = path.join(CANDIDATE_DIR, "ai-work-files-private-details-2026-08-12-exact-prose-v2.md");
const TEMPLATE_PATH = path.join(CANDIDATE_DIR, "ai-work-files-private-details-2026-08-12-story-record-template-v2.json");
const CANDIDATE_PATH = path.join(CANDIDATE_DIR, "ai-work-files-private-details-2026-08-12-story-record-candidate-v2.json");

function compile(configPath) {
  return childProcess.spawnSync(process.execPath, [SCRIPT, configPath], { cwd: ROOT, encoding: "utf8" });
}

function plain(value) {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const expectedCandidate = JSON.parse(fs.readFileSync(CANDIDATE_PATH, "utf8"));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-daily-longform-"));

try {
  const outputPath = path.join(temp, "daily-candidate.json");
  const exactConfig = {
    ...config,
    sourcePath: SOURCE_PATH,
    storyTemplatePath: TEMPLATE_PATH,
    outputPath
  };
  const exactConfigPath = path.join(temp, "exact.json");
  fs.writeFileSync(exactConfigPath, JSON.stringify(exactConfig));
  const exact = compile(exactConfigPath);
  assert.equal(exact.status, 0, exact.stderr);
  const candidate = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  assert.deepEqual(candidate, expectedCandidate, "compiler output must equal the exact reviewed held candidate");
  assert.equal(candidate.candidateStatus, "HELD_NOT_PUBLISHED");
  assert.equal(candidate.story.status, "hold");
  assert.equal(candidate.story.publishedAt, null);
  assert.equal(candidate.story.longform.sections.length, 6);
  assert.equal(candidate.story.longform.sections.flatMap((section) => section.blocks).length, 17);

  const dataContext = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"), dataContext);
  const contractContext = { module: { exports: {} }, exports: {}, window: undefined };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content/newsstand-reader-contract.js"), "utf8"), contractContext);
  const heldDataset = JSON.parse(JSON.stringify(dataContext.window.NEWSSTAND_DATA));
  heldDataset.stories.push(candidate.story);
  const access = contractContext.module.exports.accessDecision(heldDataset, candidate.story, { scope: "hash" }, "2026-08-12T23:00:00Z");
  assert.equal(access.canExpose, false, "held story must remain inaccessible");
  const publicStory = {
    ...candidate.story,
    status: "published",
    publishedAt: "2026-08-12T23:00:00Z",
    updatedAt: "2026-08-12T23:01:00Z",
    lastCheckedAt: "2026-08-12T23:01:00Z",
    sourceApproval: { status: "approved", record: "/operations/product-stewards/newsstand/evidence/stories/ai-work-logs-can-carry-secrets.json" }
  };
  const publicDataset = JSON.parse(JSON.stringify(dataContext.window.NEWSSTAND_DATA));
  publicDataset.stories.push(publicStory);
  assert.equal(contractContext.module.exports.validate(publicDataset).length, 0, "promoted public story shape must pass the reader contract");

  const source = fs.readFileSync(SOURCE_PATH, "utf8");
  const sourceMeaning = plain(source.split(/\r?\n/).slice(5).filter((line) => line.trim() !== "---").map((line) => line
    .replace(/^#{2,3}\s+/, "").replace(/^>\s?/, "").replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")).join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]/g, ""));
  const compiledMeaning = plain(candidate.story.longform.sections.flatMap((section) => [
    section.label === config.introSectionLabel ? "" : section.label,
    ...section.blocks.flatMap((block) => block.items || block.text || block.body)
  ]).join(" "));
  assert.equal(compiledMeaning, sourceMeaning, "compiler must preserve every meaning-bearing source word in order");

  const wrongIdentityPath = path.join(temp, "wrong-identity.json");
  fs.writeFileSync(wrongIdentityPath, JSON.stringify({ ...exactConfig, expectedTitle: "Wrong article", outputPath: path.join(temp, "wrong.json") }));
  const wrongIdentity = compile(wrongIdentityPath);
  assert.notEqual(wrongIdentity.status, 0, "calibration: wrong source identity must fail");
  assert.match(wrongIdentity.stderr, /Source identity mismatch/);

  const missingJumpPath = path.join(temp, "missing-jump.json");
  fs.writeFileSync(missingJumpPath, JSON.stringify({ ...exactConfig, jumpHeadings: [...config.jumpHeadings, "Invented section"], outputPath: path.join(temp, "missing-jump-output.json") }));
  const missingJump = compile(missingJumpPath);
  assert.notEqual(missingJump.status, 0, "calibration: missing jump target must fail");
  assert.match(missingJump.stderr, /Configured jump target is missing/);

  const missingBridgeSource = source.replace(/ These figures[\s\S]*?many real-people files remained\./, "");
  const missingBridgeSourcePath = path.join(temp, "missing-statistical-bridge.md");
  fs.writeFileSync(missingBridgeSourcePath, missingBridgeSource);
  const missingBridgeOutputPath = path.join(temp, "missing-statistical-bridge.json");
  const missingBridgeConfigPath = path.join(temp, "missing-statistical-bridge-config.json");
  fs.writeFileSync(missingBridgeConfigPath, JSON.stringify({ ...exactConfig, sourcePath: missingBridgeSourcePath, outputPath: missingBridgeOutputPath }));
  const missingBridge = compile(missingBridgeConfigPath);
  assert.equal(missingBridge.status, 0, missingBridge.stderr);
  const changedCandidate = JSON.parse(fs.readFileSync(missingBridgeOutputPath, "utf8"));
  assert.notDeepEqual(changedCandidate.story.longform, expectedCandidate.story.longform,
    "calibration: removing the statistical-unit bridge must change the exact compiled artifact");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

console.log("NEWSSTAND DAILY LONGFORM COMPILER PASS · exact prose preserved · exact reviewed candidate reproduced · held access denied · 3 bad inputs rejected");
