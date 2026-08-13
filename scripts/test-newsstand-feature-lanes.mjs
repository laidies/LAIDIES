#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandFeatureLanes } from "./check-newsstand-feature-lanes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json"), "utf8"));
const valid = inspectNewsstandFeatureLanes(registry, { root });
assert.deepEqual(valid.errors, []);
assert.equal(valid.laneCount, 16);
assert.deepEqual(valid.ready, []);
assert.deepEqual(registry.lanes.find((lane) => lane.id === "paige_tip").negativeExemplarIds, ["CQX-BAD-009", "CQX-BAD-010"]);
assert.ok(registry.lanes.find((lane) => lane.id === "career_work_life").negativeExemplarIds.includes("CQX-BAD-011"));

const missing = structuredClone(registry);
missing.lanes = missing.lanes.filter((lane) => lane.id !== "promptoscope");
assert.match(inspectNewsstandFeatureLanes(missing, { root }).errors.join("\n"), /required NewsStand lane is missing: promptoscope/);
const duplicate = structuredClone(registry);
duplicate.lanes.push(structuredClone(duplicate.lanes[0]));
assert.match(inspectNewsstandFeatureLanes(duplicate, { root }).errors.join("\n"), /duplicated/);
const falseReady = structuredClone(registry);
falseReady.lanes.find((lane) => lane.id === "paige_tip").status = "READY_AUTONOMOUS_PRODUCTION";
assert.match(inspectNewsstandFeatureLanes(falseReady, { root }).errors.join("\n"), /cannot be autonomous without a positive exemplar/);
const singleDailyExample = structuredClone(registry);
const singleDailyLane = singleDailyExample.lanes.find((lane) => lane.id === "daily_news");
singleDailyLane.status = "READY_AUTONOMOUS_PRODUCTION";
singleDailyLane.positiveExemplar = { path: "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json", sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json"))).digest("hex") };
assert.match(inspectNewsstandFeatureLanes(singleDailyExample, { root }).errors.join("\n"), /positiveExemplarsByMode/);
const unknownNegative = structuredClone(registry);
unknownNegative.lanes.find((lane) => lane.id === "daily_news").negativeExemplarIds.push("CQX-BAD-999");
assert.match(inspectNewsstandFeatureLanes(unknownNegative, { root }).errors.join("\n"), /unknown negative exemplar/);
const samplerEligible = structuredClone(registry);
samplerEligible.exemplarPolicy.samplersAndOutlinesAreIneligible = false;
assert.match(inspectNewsstandFeatureLanes(samplerEligible, { root }).errors.join("\n"), /samplersAndOutlinesAreIneligible must be true/);

const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-feature-lanes-"));
const writeFixture = (relative, body) => {
  const absolute = path.join(fixtureRoot, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, body);
  return { path: relative, sha256: crypto.createHash("sha256").update(body).digest("hex") };
};
fs.mkdirSync(path.join(fixtureRoot, "operations/product-stewards/learning-content-ecosystem"), { recursive: true });
fs.copyFileSync(
  path.join(root, "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"),
  path.join(fixtureRoot, "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json")
);
fs.mkdirSync(path.join(fixtureRoot, "operations/product-stewards/newsstand"), { recursive: true });
fs.copyFileSync(
  path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-STORY-TEMPLATES-CANDIDATE.md"),
  path.join(fixtureRoot, "operations/product-stewards/newsstand/NEWSSTAND-STORY-TEMPLATES-CANDIDATE.md")
);
fs.copyFileSync(
  path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-SERVICE-TEMPLATES-CANDIDATE.md"),
  path.join(fixtureRoot, "operations/product-stewards/newsstand/NEWSSTAND-SERVICE-TEMPLATES-CANDIDATE.md")
);
fs.copyFileSync(
  path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-STORY-TEMPLATE-REVIEW-2026-08-13.json"),
  path.join(fixtureRoot, "operations/product-stewards/newsstand/NEWSSTAND-STORY-TEMPLATE-REVIEW-2026-08-13.json")
);
fs.copyFileSync(
  path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-SERVICE-TEMPLATE-REVIEW-2026-08-13.json"),
  path.join(fixtureRoot, "operations/product-stewards/newsstand/NEWSSTAND-SERVICE-TEMPLATE-REVIEW-2026-08-13.json")
);
const producerSelfReview = writeFixture("fixtures/producer-self-review.md", "producer read exact prose and found no known defects\n");
const independentReview = writeFixture("fixtures/independent-review.md", "independent artifact-first review pass\n");
const sourceFreshnessEvidence = writeFixture("fixtures/source-freshness.md", "source and freshness evidence\n");
const acceptedBinding = (laneId, slot) => {
  const candidate = writeFixture(`fixtures/${laneId}-${slot}.json`, JSON.stringify({ laneId, slot, headline: "Full publish-shaped example", body: "Complete example text." }));
  const acceptance = writeFixture(`fixtures/${laneId}-${slot}-acceptance.json`, JSON.stringify({
    schemaVersion: "laidies-newsstand-positive-exemplar-acceptance.v1",
    laneId,
    exemplarSlot: slot,
    candidate,
    aliDecision: { verdict: "ACCEPT", decidedAt: "2026-08-12T23:00:00-07:00", exactWords: "APPROVE THIS EXAMPLE" },
    producerSelfReview,
    independentReview,
    sourceFreshnessEvidence,
    authorityBoundary: "EXEMPLAR_ONLY_NO_PUBLICATION_AUTHORITY"
  }));
  return { ...candidate, acceptanceRecord: acceptance };
};
const acceptedTemplateBinding = (laneId, slot) => {
  const section = `${laneId} ${slot}`;
  const sectionBody = `## ${section}\n\n| Section | Content | Analysis | Delivery | Must not do |\n|---|---|---|---|---|\n| Answer | Exact answer | Establish meaning | Plain opening | Tease |\n| Mechanism | Causal chain | Test links | Concrete explanation | Use labels only |\n| Action | Useful next move | Match evidence | Direct close | Generic caution |\n`;
  const template = writeFixture(`fixtures/${laneId}-${slot}-template.md`, `# Candidate\n\n${sectionBody}`);
  const acceptance = writeFixture(`fixtures/${laneId}-${slot}-template-acceptance.json`, JSON.stringify({
    schemaVersion: "laidies-newsstand-template-acceptance.v1",
    laneId,
    templateSlot: slot,
    template,
    aliDecision: { verdict: "ACCEPT", decidedAt: "2026-08-13T14:00:00-07:00", exactWords: "APPROVE THIS TEMPLATE" },
    authorityBoundary: "TEMPLATE_ONLY_PRIVATE_EXAMPLE_AUTHORITY"
  }));
  return { ...template, section, sectionSha256: crypto.createHash("sha256").update(sectionBody).digest("hex"), acceptanceRecord: acceptance };
};
const vagueTemplate = writeFixture("fixtures/vague-template.md", "# Candidate\n\n## The Breaking\n\nMake it clear and useful.\n");
const vagueTemplateRegistry = structuredClone(registry);
vagueTemplateRegistry.lanes.find((lane) => lane.id === "the_breaking").templateCandidate = { ...vagueTemplate, section: "The Breaking" };
assert.match(inspectNewsstandFeatureLanes(vagueTemplateRegistry, { root: fixtureRoot }).errors.join("\n"), /Content, Analysis, Delivery and Must not do/);
const readyDaily = structuredClone(registry);
const readyDailyLane = readyDaily.lanes.find((lane) => lane.id === "daily_news");
readyDailyLane.status = "READY_AUTONOMOUS_PRODUCTION";
readyDailyLane.approvedTemplatesByMode = Object.fromEntries(readyDailyLane.storyModes.map((mode) => [mode, acceptedTemplateBinding("daily_news", mode)]));
readyDailyLane.positiveExemplarsByMode = Object.fromEntries(readyDailyLane.storyModes.map((mode) => [mode, acceptedBinding("daily_news", mode)]));
const readyDailyResult = inspectNewsstandFeatureLanes(readyDaily, { root: fixtureRoot });
assert.deepEqual(readyDailyResult.errors, []);
assert.deepEqual(readyDailyResult.ready, ["daily_news"]);
const missingAcceptance = structuredClone(readyDaily);
delete missingAcceptance.lanes.find((lane) => lane.id === "daily_news").positiveExemplarsByMode.REPORT_OR_ANNOUNCEMENT.acceptanceRecord;
assert.match(inspectNewsstandFeatureLanes(missingAcceptance, { root: fixtureRoot }).errors.join("\n"), /acceptanceRecord/);
const missingTemplateAcceptance = structuredClone(readyDaily);
delete missingTemplateAcceptance.lanes.find((lane) => lane.id === "daily_news").approvedTemplatesByMode.REPORT_OR_ANNOUNCEMENT.acceptanceRecord;
assert.match(inspectNewsstandFeatureLanes(missingTemplateAcceptance, { root: fixtureRoot }).errors.join("\n"), /approvedTemplate\.acceptanceRecord/);
fs.rmSync(fixtureRoot, { recursive: true, force: true });

console.log("NEWSSTAND FEATURE LANES CALIBRATION PASS: 16 required lanes valid; Daily needs one Ali-accepted template and exemplar per enabled story mode; missing template acceptance, missing exemplar acceptance, missing lane, duplicate lane, false-ready lane, unknown negative and sampler-as-exemplar policy rejected");
