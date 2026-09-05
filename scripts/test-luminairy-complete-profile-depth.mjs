#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { inspectCompleteProfileDepth } from "./check-luminairy-complete-profile-depth.mjs";

const currentCompactProfile = `
# Cher Horowitz + Dionne Davenport

A LAiDIES teaching duo inspired by two fictional friends who make taste practical, social, and unmistakably their own.

Build a useful, personal way of working that other people want to copy. Trendsetting creates the pattern; staying current notices what changed.
`;

const bad = inspectCompleteProfileDepth(currentCompactProfile);
assert.ok(bad.errors.length >= 7, `known-shallow profile unexpectedly passed: ${bad.errors.join("; ")}`);

const candidate = fs.readFileSync(
  new URL("../operations/product-stewards/luminairy/cher-dionne-complete-profile-candidate-2026-09-05.md", import.meta.url),
  "utf8"
);
const good = inspectCompleteProfileDepth(candidate);
assert.deepEqual(good.errors, [], good.errors.join("\n"));

console.log(`LUMINAIRY COMPLETE PROFILE DEPTH CALIBRATION PASS known_bad_rejected=${bad.errors.length} candidate_words=${good.wordCount} quality_authority=none`);
