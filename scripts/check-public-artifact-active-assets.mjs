#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { assertAssetNotRetired, compileActiveAssetRegistry } from "./lib/active-asset-admission.mjs";

const args = process.argv.slice(2);
const calibrate = args.includes("--calibrate");
const artifactArg = args.find((arg) => !arg.startsWith("--"));

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function activeAssetRecords(entries) {
  return entries.flatMap((entry) => {
    if (entry.status !== "ACTIVE" || typeof entry.path !== "string") return [];
    if (!Array.isArray(entry.members)) return [entry];
    return entry.members
      .filter((member) => typeof member.path === "string")
      .map((member) => ({
        ...member,
        path: path.posix.join(entry.path, member.path),
        role: entry.role,
      }));
  });
}

function referencedActiveAssets(entries, publicText) {
  return activeAssetRecords(entries).filter((entry) => publicText.includes(entry.path));
}

if (calibrate) {
  const fixture = [
    { status: "ACTIVE", path: "assets/known-bad-missing.png", sha256: "0".repeat(64) },
    {
      status: "ACTIVE",
      role: "known-bad-group",
      path: "assets/group",
      members: [{ path: "known-bad-member.png", sha256: "0".repeat(64) }],
    },
  ];
  const referenced = referencedActiveAssets(
    fixture,
    '<img src="/assets/known-bad-missing.png"><img src="/assets/group/known-bad-member.png">',
  );
  if (referenced.length !== 2 || !referenced.some((entry) => entry.path === "assets/group/known-bad-member.png")) {
    console.error("PUBLIC ARTIFACT ACTIVE ASSET CALIBRATION FAIL known-bad reference accepted");
    process.exit(1);
  }
  console.log("PUBLIC ARTIFACT ACTIVE ASSET CALIBRATION PASS known-bad missing asset rejected");
  process.exit(0);
}

if (!artifactArg) {
  console.error("Usage: node scripts/check-public-artifact-active-assets.mjs <artifact-directory> [--calibrate]");
  process.exit(2);
}

const root = process.cwd();
const artifactRoot = path.resolve(artifactArg);
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/assets/active-asset-registry.json"), "utf8"));
const compiledRegistry = compileActiveAssetRegistry(registry);
const textExtensions = new Set([".css", ".html", ".js", ".mjs", ".json", ".svg"]);
const publicSources = [];
const publicFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".wrangler") continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile() && textExtensions.has(path.extname(entry.name))) {
      publicSources.push(fs.readFileSync(absolute, "utf8"));
    }
    if (entry.isFile()) publicFiles.push(absolute);
  }
}

if (!fs.statSync(artifactRoot, { throwIfNoEntry: false })?.isDirectory()) {
  console.error(`PUBLIC ARTIFACT ACTIVE ASSET FAIL missing artifact directory: ${artifactRoot}`);
  process.exit(2);
}
walk(artifactRoot);

const referenced = referencedActiveAssets(
  [...(registry.entries || []), ...(registry.dynamic_families || [])],
  publicSources.join("\n"),
);
const failures = [];
const publicText = publicSources.join("\n");
for (const retiredPath of compiledRegistry.retiredPaths) {
  if (publicText.includes(retiredPath)) failures.push({ path: retiredPath, reason: "retired_reference" });
}
for (const absolutePath of publicFiles) {
  const relativePath = path.relative(artifactRoot, absolutePath).split(path.sep).join("/");
  try {
    assertAssetNotRetired({ relativePath, absolutePath, registry: compiledRegistry });
  } catch (error) {
    failures.push({ path: relativePath, reason: "retired_asset", detail: error.message });
  }
}
for (const entry of referenced) {
  const absolute = path.join(artifactRoot, entry.path);
  if (!fs.statSync(absolute, { throwIfNoEntry: false })?.isFile()) {
    failures.push({ path: entry.path, reason: "missing", role: entry.role });
    continue;
  }
  const actual = sha256(absolute);
  if (actual !== entry.sha256) {
    failures.push({ path: entry.path, reason: "hash_mismatch", role: entry.role, expected: entry.sha256, actual });
  }
}

if (failures.length) {
  console.error(`PUBLIC ARTIFACT ACTIVE ASSET FAIL referenced=${referenced.length} failures=${failures.length}`);
  for (const failure of failures) console.error(JSON.stringify(failure));
  process.exit(1);
}

console.log(`PUBLIC ARTIFACT ACTIVE ASSET PASS referenced=${referenced.length} failures=0`);
