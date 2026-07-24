#!/usr/bin/env node

/*
 * Verify that every audio dependency in the public KSVL queue exists in the
 * curated artifact and is byte-for-byte identical to its source file.
 *
 * Usage:
 *   node scripts/validate-ksvl-artifact.mjs /path/to/public-artifact
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const artifact = path.resolve(process.argv[2] || path.join(process.env.TMPDIR || '/tmp', 'laidies-public-site'));
const playerRelative = 'content/site/ksvl-player.js';
const playerPath = path.join(root, playerRelative);

if (!fs.existsSync(playerPath)) {
  console.error(`KSVL player source is missing: ${playerRelative}`);
  process.exit(1);
}
if (!fs.existsSync(artifact) || !fs.statSync(artifact).isDirectory()) {
  console.error(`Public artifact directory is missing: ${artifact}`);
  process.exit(1);
}

const source = fs.readFileSync(playerPath, 'utf8');
const stringConstants = new Map();
for (const match of source.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(["'`])([^"'`]*?)\2\s*;/g)) {
  if (!match[3].includes('${')) stringConstants.set(match[1], match[3]);
}

const audioReferences = new Set();
for (const match of source.matchAll(/\b([A-Za-z_$][\w$]*)\s*\+\s*(["'`])([^"'`]+?\.(?:m4a|mp3|ogg|wav))\2/gi)) {
  const prefix = stringConstants.get(match[1]);
  if (prefix === undefined) continue;
  audioReferences.add(`${prefix}${match[3]}`.replace(/^\/+/, ''));
}

const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const failures = [];
let bytes = 0;

for (const relative of [...audioReferences].sort()) {
  const sourceFile = path.join(root, relative);
  const artifactFile = path.join(artifact, relative);
  if (!fs.existsSync(sourceFile)) {
    failures.push(`${relative}: missing from source`);
    continue;
  }
  if (!fs.existsSync(artifactFile)) {
    failures.push(`${relative}: missing from artifact`);
    continue;
  }
  const sourceStat = fs.statSync(sourceFile);
  const artifactStat = fs.statSync(artifactFile);
  if (!sourceStat.isFile() || !artifactStat.isFile()) {
    failures.push(`${relative}: expected regular files`);
    continue;
  }
  if (sourceStat.size < 1024) {
    failures.push(`${relative}: suspiciously small source (${sourceStat.size} bytes)`);
    continue;
  }
  if (sourceStat.size !== artifactStat.size || sha256(sourceFile) !== sha256(artifactFile)) {
    failures.push(`${relative}: artifact bytes do not match source`);
    continue;
  }
  bytes += artifactStat.size;
}

if (!audioReferences.size) failures.push('No computed KSVL audio references were discovered');

if (failures.length) {
  console.error(`✗ KSVL artifact validation failed (${failures.length} problem${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `✓ KSVL artifact: ${audioReferences.size} audio dependencies · `
  + `${(bytes / 1024 / 1024).toFixed(2)} MiB · source and artifact hashes match`,
);
