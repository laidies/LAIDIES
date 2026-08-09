#!/usr/bin/env node

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const release = args.includes("--release");
const positional = args.filter((argument) => argument !== "--release");
const [artifactArg, outputArg] = positional;

if (!artifactArg || !outputArg) {
  console.error(
    "Usage: node scripts/create-release-manifest.mjs [--release] <artifact-directory> <output-json>",
  );
  process.exit(2);
}

const artifactDirectory = path.resolve(artifactArg);
const outputPath = path.resolve(outputArg);

async function listFiles(directory, prefix = "") {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));

  const files = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath, relativePath)));
    } else if (entry.isFile()) {
      files.push({ relativePath, absolutePath });
    }
  }
  return files;
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

let artifactStat;
try {
  artifactStat = await fs.stat(artifactDirectory);
} catch {
  console.error(`RELEASE MANIFEST ${release ? "RELEASE READINESS" : "INTEGRITY"} FAIL artifact directory does not exist: ${artifactDirectory}`);
  process.exit(1);
}
if (!artifactStat.isDirectory()) {
  console.error(`RELEASE MANIFEST ${release ? "RELEASE READINESS" : "INTEGRITY"} FAIL artifact path is not a directory: ${artifactDirectory}`);
  process.exit(1);
}

const files = await listFiles(artifactDirectory);
if (release && files.length === 0) {
  console.error("RELEASE MANIFEST RELEASE READINESS FAIL artifact directory is empty");
  process.exit(1);
}
const index = files.find((file) => file.relativePath === "index.html");
if (release && !index) {
  console.error("RELEASE MANIFEST RELEASE READINESS FAIL artifact is missing index.html");
  process.exit(1);
}
if (release) {
  const indexStat = await fs.stat(index.absolutePath);
  if (indexStat.size === 0) {
    console.error("RELEASE MANIFEST RELEASE READINESS FAIL artifact index.html is empty");
    process.exit(1);
  }
}

const records = [];
let totalBytes = 0;
for (const file of files) {
  const contents = await fs.readFile(file.absolutePath);
  totalBytes += contents.byteLength;
  records.push({
    path: file.relativePath,
    bytes: contents.byteLength,
    sha256: sha256(contents),
  });
}

const identityInput = records
  .map((record) => `${record.sha256}  ${record.path}\n`)
  .join("");

const manifest = {
  schema: "laidies-release-artifact-manifest/v1",
  createdAt: new Date().toISOString(),
  artifactDirectory,
  fileCount: records.length,
  totalBytes,
  identitySha256: sha256(Buffer.from(identityInput, "utf8")),
  files: records,
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(
  `RELEASE MANIFEST ${release ? "RELEASE ARTIFACT" : "INTEGRITY"}: ${manifest.fileCount} files · ${manifest.totalBytes} bytes · ${manifest.identitySha256}`,
);
console.log(outputPath);
