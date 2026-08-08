#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { inspectManifestCandidateBinding } from "./resolve-review-url.mjs";

const repoRoot = process.cwd();
const scriptPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "resolve-review-url.mjs");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-review-door-"));
const sha256 = filePath => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

try {
  const candidateRelative = "candidate.html";
  const candidatePath = path.join(temp, candidateRelative);
  fs.writeFileSync(candidatePath, "<main>Exact candidate</main>\n");
  const manifestPath = path.join(temp, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify({
    reviewText: { path: candidateRelative, sha256: sha256(candidatePath) }
  }));

  const bound = inspectManifestCandidateBinding({
    root: temp,
    manifestPath: "manifest.json",
    candidatePath: candidateRelative
  });
  assert.deepEqual(bound.errors, []);

  fs.appendFileSync(candidatePath, "<!-- changed after review -->\n");
  const stale = inspectManifestCandidateBinding({
    root: temp,
    manifestPath: "manifest.json",
    candidatePath: candidateRelative
  });
  assert.match(stale.errors.join("\n"), /current SHA-256/);

  const knownBad = "content/library-books/pilots/ai-fundamentals-101-v2/review.html";
  const blocked = spawnSync(process.execPath, [
    scriptPath,
    "--type", "content",
    "--work-order", "LCWO-001",
    knownBad
  ], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(blocked.status, 1);
  assert.match(blocked.stderr, /REVIEW DOOR BLOCKED/);
  assert.match(blocked.stderr, /work order is not release-ready/);

  const warned = spawnSync(process.execPath, [
    scriptPath,
    "--warn-only",
    "--type", "content",
    "--work-order", "LCWO-001",
    knownBad
  ], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(warned.status, 0);
  assert.match(warned.stderr, /REVIEW DOOR WOULD BLOCK/);
  assert.doesNotMatch(warned.stdout, /file:\/\//);

  const missingId = spawnSync(process.execPath, [
    scriptPath,
    "--type", "content",
    knownBad
  ], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(missingId.status, 1);
  assert.match(missingId.stderr, /content requires --work-order/);

  for (const type of ["prose", "book"]) {
    const result = spawnSync(process.execPath, [scriptPath, "--type", type, knownBad], { cwd: repoRoot, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, new RegExp(`${type} requires --work-order`));
  }

  for (const type of ["page", "visual", "media"]) {
    const result = spawnSync(process.execPath, [scriptPath, "--type", type, "missing-candidate.html"], { cwd: repoRoot, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /candidate is missing/);
  }

  console.log("REVIEW DOOR TEST PASS classes=prose,book,page,visual,media known_bad=blocked stale_bytes=blocked warn_only=no_url");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
