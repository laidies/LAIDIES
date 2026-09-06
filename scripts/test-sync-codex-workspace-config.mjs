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
// An isolated checkout must default to its own config, never its parent's.
const checkout = path.join(tmp, 'checkout');
fs.mkdirSync(path.join(checkout, 'scripts'), { recursive: true });
fs.mkdirSync(path.join(checkout, 'operations/codex-contract'), { recursive: true });
fs.copyFileSync(path.join(root, 'scripts/sync-codex-workspace-config.mjs'), path.join(checkout, 'scripts/sync-codex-workspace-config.mjs'));
fs.copyFileSync(source, path.join(checkout, 'operations/codex-contract/workspace-config.toml'));
const isolatedEnv = { ...process.env };
delete isolatedEnv.LAIDIES_CODEX_WORKSPACE_SOURCE;
delete isolatedEnv.LAIDIES_CODEX_WORKSPACE_TARGET;
const isolated = spawnSync(process.execPath, ['scripts/sync-codex-workspace-config.mjs'], { cwd: checkout, encoding: 'utf8', env: isolatedEnv });
if (isolated.status !== 0 || !fs.existsSync(path.join(checkout, '.codex/config.toml')) || fs.existsSync(path.join(tmp, '.codex/config.toml'))) throw new Error('default sync must stay inside isolated checkout');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('CODEX WORKSPACE CONFIG CALIBRATION PASS missing=blocked sync=pass exact=pass drift=blocked');
