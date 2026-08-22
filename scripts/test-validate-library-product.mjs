#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { compileAdmissionManifest } from "./compile-library-admission.mjs";

const root = process.cwd();
const checker = path.join(root, "scripts/validate-library-product.mjs");
const clean = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });
assert.equal(clean.status, 0, clean.stderr || clean.stdout);
assert.match(clean.stdout, /available=0 · admitted=0/);

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
assert.deepEqual(
  Object.keys(compileAdmissionManifest(manifest, { root, rejectedArtifacts })),
  [],
  "held candidates must not compile into public admission"
);

const rejectedConcepts = {
  book_id: "concepts-101",
  status: "available",
  source_path: "/content/library-books/rendered/concepts-101.html",
  content_version: "ai-fundamentals-101-2026-08-06.5",
  admission_version: "rejected-calibration",
  source_references: ["content/library-books/concepts-101.source.json"],
  claim_references: ["AF101-C001"],
  reviewed_at: "2026-08-07T05:58:00-07:00",
  review_owner: "Direct Ali rejection calibration",
  correction_state: "clear",
  artifact_sha256: "3bf3d6bddd659af063426701541c4d19debc2a39707bde2f7435a555cc835508",
  learning_admission: null
};
assert.throws(
  () => compileAdmissionManifest({ books: [...manifest.books, rejectedConcepts] }, { root, rejectedArtifacts }),
  /directly rejected/,
  "Ali-rejected exact bytes must never be readmitted"
);

const fundamentalsAvailable = structuredClone(manifest);
const fundamentals = fundamentalsAvailable.books.find((row) => row.book_id === "ai-fundamentals-101");
fundamentals.status = "available";
fundamentals.correction_state = "clear";
assert.throws(
  () => compileAdmissionManifest(fundamentalsAvailable, { root, rejectedArtifacts }),
  /mandatory learning admission/,
  "an exact held artifact must not become available without complete learning admission"
);

console.log("LIBRAiRY CONTRACT CALIBRATION PASS");
console.log("- Current held candidates compile to zero public books.");
console.log("- Unauthorized, directly rejected and missing-admission promotions were rejected.");
