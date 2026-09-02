#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const APPROVED_PATHS = [
  "luminairy.html",
  "content/luminairy-profiles.json",
  "content/luminairy-claims.json",
  "content/luminairy-editorial-receipts.json",
  "content/site/luminairy-claim-gate.js",
  "content/site/luminairy-app.js",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/grace-wahba-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/cynthia-dwork-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/daphne-koller-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/barbara-liskov-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/jean-sammet-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/adele-goldberg-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/shafi-goldwasser-y2k-stained-glass.png",
  "assets/mavens/y2k-stained-glass-v4-dark-sapphire/lynn-conway-y2k-stained-glass.png",
  "assets/builders/y2k-stained-glass-v5-golden/amanda-askell-y2k-stained-glass.png",
];

const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

function inventory(root, prefix = "") {
  const rows = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) rows.push(...inventory(absolute, relative));
    else if (entry.isFile()) {
      const bytes = fs.readFileSync(absolute);
      rows.push({ path: relative, bytes: bytes.length, sha256: sha256(bytes) });
    }
  }
  return rows;
}

function manifestFor(root) {
  const files = inventory(root);
  const identity = files.map((file) => `${file.sha256}  ${file.path}\n`).join("");
  return {
    schema: "laidies-release-artifact-manifest/v1",
    createdAt: new Date().toISOString(),
    artifactDirectory: root,
    fileCount: files.length,
    totalBytes: files.reduce((sum, file) => sum + file.bytes, 0),
    identitySha256: sha256(Buffer.from(identity)),
    files,
  };
}

function verifyArtifact(label, artifactRoot, manifestPath) {
  const declared = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const actual = manifestFor(artifactRoot);
  if (declared.schema !== actual.schema || declared.fileCount !== actual.fileCount || declared.totalBytes !== actual.totalBytes || declared.identitySha256 !== actual.identitySha256) {
    throw new Error(`${label} artifact does not match its manifest`);
  }
  return actual;
}

function main(args) {
  if (args.length !== 9 || args[0] !== "--expected-payload-identity") {
    throw new Error("Usage: node scripts/prepare-luminairy-profile-release-overlay.mjs --expected-payload-identity <sha256> <base-artifact> <base-manifest> <provider-binding> <tested-payload-artifact> <tested-payload-manifest> <output-artifact> <output-manifest>");
  }
  const [expectedPayloadIdentity, baseArg, baseManifestArg, bindingArg, payloadArg, payloadManifestArg, outputArg, outputManifestArg] = args.slice(1);
  if (!/^[a-f0-9]{64}$/.test(expectedPayloadIdentity || "")) throw new Error("expected payload identity must be an exact SHA-256");
  const base = path.resolve(baseArg);
  const payload = path.resolve(payloadArg);
  const output = path.resolve(outputArg);
  const outputManifest = path.resolve(outputManifestArg);
  if (fs.existsSync(output)) throw new Error("output artifact already exists");
  const baseManifest = verifyArtifact("base", base, path.resolve(baseManifestArg));
  const payloadManifest = verifyArtifact("tested payload", payload, path.resolve(payloadManifestArg));
  if (payloadManifest.identitySha256 !== expectedPayloadIdentity) throw new Error("tested payload identity mismatch");

  const binding = JSON.parse(fs.readFileSync(path.resolve(bindingArg), "utf8"));
  if (!/^[a-f0-9-]{36}$/.test(binding.deploymentId || "") || !/^https:\/\/[a-f0-9]+\.laidies-sunnyvaile\.pages\.dev\/?$/.test(binding.immutableOrigin || "") || binding.artifactIdentitySha256 !== baseManifest.identitySha256 || binding.exactArtifactRecovered !== true) {
    throw new Error("provider binding does not bind an exact recovered Pages artifact");
  }

  fs.cpSync(base, output, { recursive: true, errorOnExist: true });
  for (const relative of APPROVED_PATHS) {
    const source = path.join(payload, relative);
    if (!fs.statSync(source, { throwIfNoEntry: false })?.isFile()) throw new Error(`tested payload path missing: ${relative}`);
    const destination = path.join(output, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }

  const candidate = manifestFor(output);
  const oldRows = new Map(baseManifest.files.map((file) => [file.path, file.sha256]));
  const newRows = new Map(candidate.files.map((file) => [file.path, file.sha256]));
  const delta = [...new Set([...oldRows.keys(), ...newRows.keys()])].filter((relative) => oldRows.get(relative) !== newRows.get(relative)).sort();
  const outside = delta.filter((relative) => !APPROVED_PATHS.includes(relative));
  if (outside.length) throw new Error(`overlay changed unapproved paths: ${outside.join(", ")}`);
  for (const [relative, hash] of oldRows) {
    if (!APPROVED_PATHS.includes(relative) && newRows.get(relative) !== hash) throw new Error(`base path changed: ${relative}`);
  }
  fs.mkdirSync(path.dirname(outputManifest), { recursive: true });
  fs.writeFileSync(outputManifest, `${JSON.stringify(candidate, null, 2)}\n`);
  console.log(JSON.stringify({ deploymentId: binding.deploymentId, baseIdentity: baseManifest.identitySha256, candidateIdentity: candidate.identitySha256, fileCount: candidate.fileCount, changedPaths: delta }, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try { main(process.argv.slice(2)); } catch (error) { console.error(`LUMINAiRY OVERLAY HOLD: ${error.message}`); process.exit(1); }
}
