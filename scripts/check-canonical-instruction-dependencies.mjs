#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const errors = [];

const contextCheck = spawnSync(process.execPath, ['scripts/check-context-authority.mjs'], {
  cwd: root,
  encoding: 'utf8'
});
if (contextCheck.status !== 0) {
  errors.push(`minimum context authority failed:\n${contextCheck.stdout}${contextCheck.stderr}`.trim());
}

const required = [
  'operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md',
  'operations/product-stewards/OWNER-ENTRY-CONTRACT.md'
];
for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`missing retrieval control: ${relative}`);
}

if (!errors.length) {
  const map = fs.readFileSync(path.join(root, required[0]), 'utf8');
  const owner = fs.readFileSync(path.join(root, required[1]), 'utf8');
  const normalizedMap = map.replace(/\s+/g, ' ').toLowerCase();
  for (const phrase of [
    'retrieve only the sources needed',
    'Do not preload every dossier',
    'archived material'
  ]) {
    if (!normalizedMap.includes(phrase.toLowerCase())) errors.push(`retrieval map missing: ${phrase}`);
  }
  for (const phrase of [
    'minimum packet in `operations/context-authority.json`',
    'Do not preload the full registry',
    'task-specific dependencies'
  ]) {
    if (!owner.includes(phrase)) errors.push(`owner entry missing: ${phrase}`);
  }
}

if (errors.length) {
  console.error('CANONICAL INSTRUCTION DEPENDENCIES FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('CANONICAL INSTRUCTION DEPENDENCIES PASS (minimum packet + task retrieval)');
