#!/usr/bin/env node

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const [artifactArg, outputArg] = process.argv.slice(2);

if (!artifactArg || !outputArg) {
  console.error(
    "Usage: node scripts/create-release-manifest.mjs <artifact-directory> <output-json>",
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

const files = await listFiles(artifactDirectory);
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
  `RELEASE MANIFEST: ${manifest.fileCount} files · ${manifest.totalBytes} bytes · ${manifest.identitySha256}`,
);
console.log(outputPath);
