#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const checker = path.join(root, 'scripts/check-newsstand-release-scope.mjs');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-newsstand-release-scope-'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const record = (filePath, value) => ({ path: filePath, bytes: Buffer.byteLength(value), sha256: digest(value) });
const manifest = files => ({
  schema: 'laidies-release-artifact-manifest/v1',
  identitySha256: digest(JSON.stringify(files)),
  files,
});
const write = (name, value) => {
  const target = path.join(temp, name);
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
  return target;
};
const run = (base, candidate, scope) => spawnSync(process.execPath, [checker, base, candidate, scope], { encoding: 'utf8' });

const scope = write('scope.json', {
  schema: 'laidies.newsstand-production-scope.v1',
  project: 'laidies-sunnyvaile',
  allowedArtifactPaths: ['newsstand.html', 'content/newsstand-stories.js'],
  verificationPaths: ['index.html', 'newsstand.html', 'content/newsstand-stories.js'],
});
const base = write('base.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v1'),
  record('content/newsstand-stories.js', 'stories-v1'),
]));
const valid = write('valid.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', 'stories-v2'),
]));

let result = run(base, valid, scope);
assert.equal(result.status, 0, result.stderr);
assert.match(result.stdout, /NEWSSTAND RELEASE SCOPE: PASS/);

const unrelated = write('unrelated.json', manifest([
  record('index.html', 'home-v2'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', 'stories-v2'),
]));
result = run(base, unrelated, scope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /outside NewsStand scope: index\.html/);

const added = write('added.json', manifest([
  record('index.html', 'home-v1'),
  record('newsstand.html', 'paper-v2'),
  record('content/newsstand-stories.js', 'stories-v2'),
  record('new-public-file.html', 'unexpected'),
]));
const permissiveScope = write('permissive-scope.json', {
  schema: 'laidies.newsstand-production-scope.v1',
  project: 'laidies-sunnyvaile',
  allowedArtifactPaths: ['newsstand.html', 'content/newsstand-stories.js', 'new-public-file.html'],
  verificationPaths: ['index.html'],
});
result = run(base, added, permissiveScope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /may modify but not add or remove/);

result = run(base, base, scope);
assert.notEqual(result.status, 0);
assert.match(result.stderr, /no public changes/);

console.log('NEWSSTAND RELEASE SCOPE CALIBRATION: PASS · unrelated mutation, public addition and no-op candidate rejected');
