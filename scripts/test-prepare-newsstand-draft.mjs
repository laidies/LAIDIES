#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { prepareDraft, inspectPreparedDraft } from "./prepare-newsstand-draft.mjs";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-draft-fixture-")));
const contractPath = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/producer-repair/producer-contract.json";
const storyPath = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/producer-repair/story.json";
const observationsPath = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/producer-repair/producer-observations.json";
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const copy = relative => { const from = path.join(sourceRoot, relative), to = path.join(root, relative); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
const readJson = relative => JSON.parse(fs.readFileSync(path.join(sourceRoot, relative), "utf8"));
const contract = readJson(contractPath);
const registry = readJson(registryPath);
for (const relative of [contractPath, storyPath, observationsPath, registryPath, contract.communicationDesign.benchmark.path, ...contract.canonicalTruth.map(item => item.source.path), ...registry.positiveExemplars.map(item => item.path), ...registry.negativeExemplars.map(item => item.path)]) copy(relative);
for (const relative of ["content/newsstand-reader-contract.js", "content/newsstand-big-picture-versions.js", "scripts/prepare-newsstand-draft.mjs", "scripts/check-content-producer-contract.mjs"]) copy(relative);

const fixtureContract = JSON.parse(fs.readFileSync(path.join(root, contractPath), "utf8"));
const story = JSON.parse(fs.readFileSync(path.join(root, storyPath), "utf8"));
const observations = JSON.parse(fs.readFileSync(path.join(root, observationsPath), "utf8"));
const packet = prepareDraft(fixtureContract, { root, reportingFrame: { fixture: true } });
const preservedContract=structuredClone(fixtureContract);
const positive=registry.positiveExemplars.find(item=>item.id===preservedContract.positiveExemplars[0].id);
const savedPositive=fs.readFileSync(path.join(root,positive.path));
const preservedPath='operations/product-stewards/newsstand/candidates/approved-positive-frozen'+path.extname(positive.path);
fs.writeFileSync(path.join(root,preservedPath),savedPositive);
preservedContract.positiveExemplars[0].preservedArtifact={path:preservedPath,sha256:positive.sha256};
fs.writeFileSync(path.join(root,positive.path),'Changed mutable source.');
assert.deepEqual(prepareDraft(preservedContract,{root,reportingFrame:{fixture:true}}).packet.positiveExamples,packet.packet.positiveExamples,'writer must actually consume exact preserved approved bytes');
fs.writeFileSync(path.join(root,positive.path),savedPositive);
assert.equal(packet.packet.qualityVerdict, undefined, "writer packet cannot manufacture a quality verdict");
assert.equal(packet.packet.outputBoundary, "PRIVATE_PRODUCER_ARTIFACT_REQUIRES_SELF_REVIEW_AND_INDEPENDENT_ADMISSION");
assert.equal(inspectPreparedDraft(story, packet, observations).qualityVerdict, null, "draft inspection is presence/identity only");
assert.deepEqual(inspectPreparedDraft(story, packet, observations).errors, [], "actual bound repair inputs prepare and inspect cleanly");
assert.ok(inspectPreparedDraft({ ...story, heroVisual: null }, packet, observations).errors.some(error => /published story image is missing or incomplete/.test(error)), "missing eventual published hero rejects before review");
assert.ok(inspectPreparedDraft({ ...story, heroVisual: { src: "/assets/newsstand/design-20260830/latest-checking.png", alt: "short" } }, packet, observations).errors.some(error => /published story image is missing or incomplete/.test(error)), "incomplete image alt rejects before review");
assert.ok(inspectPreparedDraft({ ...story, heroVisual: { src: "/unapproved/story.gif", alt: "A sufficiently descriptive synthetic fixture image." } }, packet, observations).errors.some(error => /published story image is missing or incomplete/.test(error)), "incomplete image path rejects before review");

const reject = (mutate, pattern) => {
  const candidate = structuredClone(fixtureContract); mutate(candidate);
  assert.throws(() => prepareDraft(candidate, { root }), pattern);
};
reject(candidate => { candidate.canonicalTruth[0].source.path = "missing-evidence.md"; }, /Repair production inputs|missing/);
reject(candidate => { candidate.canonicalTruth[0].source.sha256 = "0".repeat(64); }, /Repair production inputs|SHA-256/);
reject(candidate => { candidate.canonicalTruth[0].source.path = "../outside.md"; }, /Repair production inputs|outside/);
const outside = path.join(path.dirname(root), "newsstand-draft-outside.md"); fs.writeFileSync(outside, fs.readFileSync(path.join(root, fixtureContract.canonicalTruth[0].source.path)));
const linkPath = "operations/product-stewards/newsstand/candidates/symlinked-evidence.md";
fs.symlinkSync(outside, path.join(root, linkPath));
reject(candidate => { candidate.canonicalTruth[0].source = { path: linkPath, sha256: hash(fs.readFileSync(outside)) }; }, /repository/);

const inspection = mutate => { const next = structuredClone(observations); mutate(next); return inspectPreparedDraft(story, packet, next); };
assert.ok(inspection(value => delete value.readerAnswers["what-happened"]).errors.some(error => /Reader answer missing/.test(error)), "missing reader answer rejects");
assert.ok(inspection(value => delete value.terms.agent).errors.some(error => /Term meaning missing/.test(error)), "missing explanation rejects");
assert.ok(inspectPreparedDraft({ ...story, headline: story.headline + " changed" }, packet, observations).errors.some(error => /different draft/.test(error)), "draft altered after self-review rejects");
assert.ok(inspection(value => value.unresolvedIssues = ["Need primary evidence"]).errors.some(error => /unresolved/.test(error)), "unresolved issues reject");

const cli = args => execFileSync(process.execPath, [path.join(root, "scripts/prepare-newsstand-draft.mjs"), ...args], { cwd: root, encoding: "utf8" });
const output = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/producer-repair/fixture-writer-input.json";
assert.match(cli([contractPath, output]), /DRAFT_INPUT_PREPARED/);
assert.equal(JSON.parse(fs.readFileSync(path.join(root, output), "utf8")).packet.outputBoundary, "PRIVATE_PRODUCER_ARTIFACT_REQUIRES_SELF_REVIEW_AND_INDEPENDENT_ADMISSION");
const traversal = spawnSync(process.execPath, [path.join(root, "scripts/prepare-newsstand-draft.mjs"), contractPath, "operations/product-stewards/../public-writer-input.json"], { cwd: root, encoding: "utf8" });
assert.notEqual(traversal.status, 0, "private-output traversal must fail");
assert.match(traversal.stderr, /Draft input must remain private/);
console.log("NEWSSTAND DRAFT PREPARATION PASS valid_packet=1 no_quality_verdict=1 bound_input_rejections=4 inspection_rejections=7 image_rejections=3 private_output_traversal_rejected=1 fixture=" + root);
