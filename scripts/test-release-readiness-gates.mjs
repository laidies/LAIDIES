#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-release-readiness-"));

function command(args) {
  return spawnSync(process.execPath, args, { cwd: ROOT, encoding: "utf8" });
}

function expectFailure(args, expected) {
  const result = command(args);
  assert.notEqual(result.status, 0, `${args.join(" ")} unexpectedly passed`);
  assert.match(`${result.stdout}\n${result.stderr}`, expected);
}

try {
  const missingArtifact = path.join(tempRoot, "missing");
  expectFailure(
    ["scripts/create-release-manifest.mjs", "--release", missingArtifact, path.join(tempRoot, "missing.json")],
    /artifact directory does not exist/,
  );

  const nonDirectoryArtifact = path.join(tempRoot, "file.txt");
  fs.writeFileSync(nonDirectoryArtifact, "not a directory\n");
  expectFailure(
    ["scripts/create-release-manifest.mjs", "--release", nonDirectoryArtifact, path.join(tempRoot, "file.json")],
    /artifact path is not a directory/,
  );

  const emptyArtifact = path.join(tempRoot, "empty");
  fs.mkdirSync(emptyArtifact);
  const integrityEmpty = command(["scripts/create-release-manifest.mjs", emptyArtifact, path.join(tempRoot, "empty-integrity.json")]);
  assert.equal(integrityEmpty.status, 0, integrityEmpty.stderr);
  assert.match(integrityEmpty.stdout, /RELEASE MANIFEST INTEGRITY: 0 files/);
  expectFailure(
    ["scripts/create-release-manifest.mjs", "--release", emptyArtifact, path.join(tempRoot, "empty.json")],
    /artifact directory is empty/,
  );

  const noIndexArtifact = path.join(tempRoot, "no-index");
  fs.mkdirSync(noIndexArtifact);
  fs.writeFileSync(path.join(noIndexArtifact, "asset.txt"), "present\n");
  expectFailure(
    ["scripts/create-release-manifest.mjs", "--release", noIndexArtifact, path.join(tempRoot, "no-index.json")],
    /missing index\.html/,
  );

  const emptyIndexArtifact = path.join(tempRoot, "empty-index");
  fs.mkdirSync(emptyIndexArtifact);
  fs.writeFileSync(path.join(emptyIndexArtifact, "index.html"), "");
  expectFailure(
    ["scripts/create-release-manifest.mjs", "--release", emptyIndexArtifact, path.join(tempRoot, "empty-index.json")],
    /index\.html is empty/,
  );

  const validArtifact = path.join(tempRoot, "valid");
  fs.mkdirSync(validArtifact);
  fs.writeFileSync(path.join(validArtifact, "index.html"), "<!doctype html><title>LAiDIES</title>\n");
  const validOutput = path.join(tempRoot, "valid.json");
  const valid = command(["scripts/create-release-manifest.mjs", "--release", validArtifact, validOutput]);
  assert.equal(valid.status, 0, valid.stderr);
  assert.match(valid.stdout, /RELEASE MANIFEST RELEASE ARTIFACT: 1 files/);
  assert.equal(JSON.parse(fs.readFileSync(validOutput, "utf8")).fileCount, 1);

  console.log("RELEASE READINESS GATES PASS missing_artifact=1 non_directory=1 integrity_empty=1 empty_artifact=1 missing_index=1 empty_index=1 valid_release=1");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
