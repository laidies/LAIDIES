#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-codex-config-'));
const source = path.join(tmp, 'source.toml');
const target = path.join(tmp, 'config.toml');
fs.writeFileSync(source, '[agents]\nmax_concurrent_threads_per_session = 2\n');

function run(args = []) {
  return spawnSync(process.execPath, ['scripts/sync-codex-workspace-config.mjs', ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, LAIDIES_CODEX_WORKSPACE_SOURCE: source, LAIDIES_CODEX_WORKSPACE_TARGET: target }
  });
}

const missing = run(['--check']);
if (missing.status === 0 || !missing.stderr.includes('missing')) throw new Error('missing target must fail');
const synced = run();
if (synced.status !== 0) throw new Error(`sync failed: ${synced.stderr}`);
const valid = run(['--check']);
if (valid.status !== 0) throw new Error(`valid target failed: ${valid.stderr}`);
fs.writeFileSync(target, '[agents]\nmax_concurrent_threads_per_session = 6\n');
const drift = run(['--check']);
if (drift.status === 0 || !drift.stderr.includes('drift')) throw new Error('drifted target must fail');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('CODEX WORKSPACE CONFIG CALIBRATION PASS missing=blocked sync=pass exact=pass drift=blocked');
