#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validateRejectionPrevention } from "./lib/rejection-prevention.mjs";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/control-room/rejections.json"), "utf8"));
const activeLessons = fs.readFileSync(path.join(root, "operations/LESSONS-ACTIVE.md"), "utf8");
const mediaFixtures = JSON.parse(fs.readFileSync(path.join(root, "operations/evals/media-defect-fixtures.json"), "utf8"));
const validate = (candidate) => validateRejectionPrevention({ registry: candidate, activeLessons, mediaFixtures });

assert.deepEqual(validate(registry), []);

const missing = structuredClone(registry);
delete missing.rejections[0].prevention_refs;
assert(validate(missing).some((error) => error.includes("missing prevention_refs")));

const unknown = structuredClone(registry);
unknown.rejections[0].prevention_refs = ["LESSON-999"];
assert(validate(unknown).some((error) => error.includes("unknown prevention ref")));

console.log("REJECTION PREVENTION TEST PASS");
console.log("missing_prevention=FAIL_AS_CALIBRATED");
console.log("unknown_prevention=FAIL_AS_CALIBRATED");
