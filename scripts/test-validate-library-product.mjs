#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { compileAdmissionManifest } from "./compile-library-admission.mjs";

const root = process.cwd();
const checker = path.join(root, "scripts/validate-library-product.mjs");
const clean = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });
assert.equal(clean.status, 0, clean.stderr || clean.stdout);
assert.match(clean.stdout, /available=4 · admitted=4/);

const stale = spawnSync(process.execPath, [checker], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, LIBRARY_CONTRACT_CALIBRATION: "unauthorized-admission" }
});
assert.notEqual(stale.status, 0, "an unauthorized admission must fail the Library contract");
assert.match(`${stale.stdout}${stale.stderr}`, /unexpected compiled Library admission/);

const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/admission-manifest.json"), "utf8"));
const rejectionState = JSON.parse(fs.readFileSync(path.join(root, "content/library-books/rejected-artifacts.json"), "utf8"));
const rejectedArtifacts = new Map(rejectionState.artifacts.map((artifact) => [artifact.artifact_sha256, artifact]));
const conceptsAvailable = structuredClone(manifest);
const rejectedConcepts = conceptsAvailable.books.find((row) => row.book_id === "concepts-101");
rejectedConcepts.artifact_sha256 = "bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b";
rejectedConcepts.learning_admission.artifact_sha256 = rejectedConcepts.artifact_sha256;
assert.throws(
  () => compileAdmissionManifest(conceptsAvailable, { root, rejectedArtifacts }),
  /directly rejected/,
  "Ali-rejected exact bytes must never be readmitted"
);

const briefingAvailable = structuredClone(manifest);
const briefing = briefingAvailable.books.find((row) => row.book_id === "briefing-101");
delete briefing.learning_admission;
assert.throws(
  () => compileAdmissionManifest(briefingAvailable, { root, rejectedArtifacts }),
  /mandatory learning admission/,
  "nonempty review strings must not substitute for the learning admission contract"
);

briefing.learning_admission = structuredClone(manifest.books.find((row) => row.book_id === "briefing-101").learning_admission);
briefing.learning_admission.criteria.coherent_scope = "FAIL";
assert.throws(
  () => compileAdmissionManifest(briefingAvailable, { root, rejectedArtifacts }),
  /every mandatory artifact-bound book criterion must independently PASS/,
  "one failed book criterion must block admission"
);
briefing.learning_admission.criteria.coherent_scope = "PASS";
assert.deepEqual(
  Object.keys(compileAdmissionManifest(briefingAvailable, { root, rejectedArtifacts })).sort(),
  ["accounts-101", "briefing-101", "concepts-101", "setup-101"],
  "a complete exact evidence tuple with every criterion PASS may compile"
);

console.log("LIBRAiRY CONTRACT CALIBRATION PASS");
console.log("- Current compiled admission binds the four independently admitted opening books.");
console.log("- Unauthorized, directly rejected, missing-evidence and failed-criterion admissions were rejected.");
