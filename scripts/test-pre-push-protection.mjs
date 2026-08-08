#!/usr/bin/env node
import assert from 'node:assert/strict';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hook = path.join(root, '.githooks/pre-push');
const run = line => spawnSync('bash', [hook, 'origin', 'https://github.com/laidies/LAIDIES.git'], { cwd: root, input: `${line}\n`, encoding: 'utf8' });
const main = run('refs/heads/main aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa refs/heads/main bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
assert.notEqual(main.status, 0); assert.match(main.stderr, /DIRECT PUSH BLOCKED/);
const branch = run('refs/heads/feature aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa refs/heads/feature bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
assert.equal(branch.status, 0, branch.stderr);
console.log('PRE-PUSH PROTECTION CALIBRATION PASS main=blocked feature=allowed');
