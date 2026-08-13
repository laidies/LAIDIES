#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandFeatureLanes } from "./check-newsstand-feature-lanes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json"), "utf8"));
const valid = inspectNewsstandFeatureLanes(registry, { root });
assert.deepEqual(valid.errors, []);
assert.equal(valid.laneCount, 15);
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
assert.match(inspectNewsstandFeatureLanes(falseReady, { root }).errors.join("\n"), /positiveExemplar/);
const unknownNegative = structuredClone(registry);
unknownNegative.lanes.find((lane) => lane.id === "daily_news").negativeExemplarIds.push("CQX-BAD-999");
assert.match(inspectNewsstandFeatureLanes(unknownNegative, { root }).errors.join("\n"), /unknown negative exemplar/);
const samplerEligible = structuredClone(registry);
samplerEligible.exemplarPolicy.samplersAndOutlinesAreIneligible = false;
assert.match(inspectNewsstandFeatureLanes(samplerEligible, { root }).errors.join("\n"), /samplersAndOutlinesAreIneligible must be true/);

console.log("NEWSSTAND FEATURE LANES CALIBRATION PASS: 15 required lanes valid; missing lane, duplicate lane, false-ready lane, unknown negative and sampler-as-exemplar policy rejected");
