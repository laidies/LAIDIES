#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authorityErrors } from "./check-authority-consolidation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const canon = fs.readFileSync(path.join(root, "operations/voice/laidies-canon-index.md"), "utf8");
const writing = fs.readFileSync(path.join(root, "operations/voice/laidies-writing-lock.md"), "utf8");

assert.deepEqual(authorityErrors({ canon, writing }), []);

const staleCanon = canon.replace("THE GRIMOIRE IS RETIRED", "THE LAiDIES GRIMOIRE");
assert(authorityErrors({ canon: staleCanon, writing }).some((error) => error.includes("does not retire")));

const staleWriting = `${writing}\nCanonical guide name: the SLAiYER Handbook.\n`;
assert(authorityErrors({ canon, writing: staleWriting }).some((error) => error.includes("revives retired architecture")));

const missingBoundary = writing.replace("Public Copy Is Not An Operations Log", "Visitor copy");
assert(authorityErrors({ canon, writing: missingBoundary }).some((error) => error.includes("public-copy boundary")));

console.log("AUTHORITY CONSOLIDATION CALIBRATION PASS stale_canon=FAIL stale_writing=FAIL missing_public_boundary=FAIL current=PASS");
