#!/usr/bin/env node

import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const [artifactArg, outputArg] = process.argv.slice(2);
if (!artifactArg || !outputArg) throw new Error('Usage: node scripts/create-release-manifest.mjs <artifact-directory> <output-json>');
const artifactDirectory = path.resolve(artifactArg);
const outputPath = path.resolve(outputArg);
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

function listFiles(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(absolute, relative) : [{ relative, absolute }];
    });
}

let totalBytes = 0;
const files = listFiles(artifactDirectory).map(({ relative, absolute }) => {
  const contents = fs.readFileSync(absolute);
  totalBytes += contents.byteLength;
  return { path: relative, bytes: contents.byteLength, sha256: sha256(contents) };
});
const identitySha256 = sha256(Buffer.from(files.map((file) => `${file.sha256}  ${file.path}\n`).join(''), 'utf8'));
const manifest = { schema: 'laidies-release-artifact-manifest.v1', identitySha256, fileCount: files.length, totalBytes, files };
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`RELEASE MANIFEST: ${files.length} files · ${totalBytes} bytes · ${identitySha256}`);
