#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {distributeKsvl} from './lib/ksvl-distribution.mjs';

const [baseArg, manifestArg, expectedIdentity] = process.argv.slice(2);
if (!baseArg || !manifestArg || !/^[a-f0-9]{64}$/.test(expectedIdentity || '')) {
  throw new Error('Usage: build-ksvl-recovery-overlay.mjs exact-base manifest expected-identity');
}
const root = path.resolve(import.meta.dirname, '..');
const base = path.resolve(baseArg);
const manifest = JSON.parse(fs.readFileSync(manifestArg, 'utf8'));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
if (manifest.identitySha256 !== expectedIdentity ||
    sha(manifest.files.map(f => `${f.sha256}  ${f.path}\n`).join('')) !== expectedIdentity ||
    manifest.files.length !== manifest.fileCount) throw new Error('Base manifest identity mismatch');
for (const record of manifest.files) {
  if (path.isAbsolute(record.path) || record.path.split('/').includes('..')) throw new Error('Unsafe manifest path');
  const data = fs.readFileSync(path.join(base, record.path));
  if (data.length !== record.bytes || sha(data) !== record.sha256) throw new Error(`Base bytes changed: ${record.path}`);
}
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-ksvl-successor.'));
const owned = new Set(['content/site/ksvl-player.js', 'ksvl-popup.html', 'laidies-card.html']);
const changes = [];
for (const record of manifest.files) {
  let data = fs.readFileSync(path.join(owned.has(record.path) ? root : base, record.path));
  if (record.path === 'ksvl-popup.html') {
    const notePattern = /<p class="ksvl-pop-note">[\s\S]*?<\/p>/g;
    const notes = data.toString('utf8').match(notePattern);
    const original = fs.readFileSync(path.join(base, record.path), 'utf8');
    if (notes?.length !== 1 || original.match(notePattern)?.length !== 1) throw new Error('Popup note boundary changed');
    data = Buffer.from(original.replace(notePattern, () => notes[0]));
  }
  if (record.path.endsWith('.html')) data = Buffer.from(distributeKsvl(record.path, data.toString('utf8')));
  const target = path.join(output, record.path);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, data);
  if (sha(data) !== record.sha256) changes.push(record.path);
}
execFileSync(process.execPath, [path.join(root, 'scripts/create-release-manifest.mjs'), output, `${output}.manifest.json`], {stdio: 'inherit'});
console.log(JSON.stringify({artifact: output, baseIdentity: expectedIdentity, changedPaths: changes, additions: 0, removals: 0}));
