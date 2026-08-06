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
assert.match(clean.stdout, /admitted=0/);

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
Object.assign(conceptsAvailable.books.find((row) => row.book_id === "concepts-101"), { status: "available", correction_state: "clear" });
assert.throws(
  () => compileAdmissionManifest(conceptsAvailable, { root, rejectedArtifacts }),
  /directly rejected/,
  "Ali-rejected exact bytes must never be readmitted"
);

const briefingAvailable = structuredClone(manifest);
const briefing = briefingAvailable.books.find((row) => row.book_id === "briefing-101");
Object.assign(briefing, { status: "available", correction_state: "clear" });
assert.throws(
  () => compileAdmissionManifest(briefingAvailable, { root, rejectedArtifacts }),
  /mandatory learning admission/,
  "nonempty review strings must not substitute for the learning admission contract"
);

const evidencePath = "operations/library-decisions.md";
const evidenceSha = crypto.createHash("sha256").update(fs.readFileSync(path.join(root, evidencePath))).digest("hex");
const binding = { path: evidencePath, sha256: evidenceSha };
const criteria = {
  governing_reader_question: "PASS",
  single_causal_mental_model: "PASS",
  truthful_scannable_architecture: "PASS",
  coherent_scope: "PASS",
  recurring_worked_case: "PASS",
  mapped_analogies_with_limits: "PASS",
  nonduplicative_concept_relationships: "PASS",
  synthesis_and_retention_map: "PASS",
  useful_next_experience: "PASS",
  maintenance_and_currentness_contract: "PASS"
};
briefing.learning_admission = {
  schema_version: "library-book-learning-admission.v1",
  artifact_sha256: briefing.artifact_sha256,
  learning_intake: binding,
  architecture_evidence: binding,
  instructional_verdict: binding,
  unfamiliar_reader_verdict: binding,
  criteria,
  ali_rejection_state: "clear",
  derivative_use: "allowed"
};
briefing.learning_admission.criteria.coherent_scope = "FAIL";
assert.throws(
  () => compileAdmissionManifest(briefingAvailable, { root, rejectedArtifacts }),
  /every mandatory artifact-bound book criterion must independently PASS/,
  "one failed book criterion must block admission"
);
briefing.learning_admission.criteria.coherent_scope = "PASS";
assert.deepEqual(
  Object.keys(compileAdmissionManifest(briefingAvailable, { root, rejectedArtifacts })),
  ["briefing-101"],
  "a complete exact evidence tuple with every criterion PASS may compile"
);

console.log("LIBRAiRY CONTRACT CALIBRATION PASS");
console.log("- Current compiled admission binds zero books; all four opening books fail closed pending valid learning admission.");
console.log("- Unauthorized, directly rejected, missing-evidence and failed-criterion admissions were rejected.");
