#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-instruction-distribution-'));
const checkout = path.join(tmp, 'isolated-checkout');
const contract = 'operations/codex-contract';
const builder = `${contract}/build-agents-md.sh`;
const run = (args = [], env = {}) => spawnSync('bash', [builder, ...args], {
  cwd: checkout, encoding: 'utf8',
  env: { ...process.env, LAIDIES_AGENTS_WORKSPACE_TARGET: '', ...env }
});
try {
  fs.mkdirSync(path.join(checkout, contract), { recursive: true });
  for (const name of ['AGENTS.template.md', 'build-agents-md.sh'])
    fs.copyFileSync(path.join(root, contract, name), path.join(checkout, contract, name));
  const sentinel = path.join(tmp, 'AGENTS.md');
  fs.writeFileSync(sentinel, 'unrelated parent instructions\n');
  assert.notEqual(run(['--check']).status, 0, 'missing generated instructions must fail');
  assert.equal(run().status, 0);
  assert.equal(fs.readFileSync(sentinel, 'utf8'), 'unrelated parent instructions\n');
  assert.equal(run(['--check']).status, 0);
  const agentPath = path.join(checkout, 'AGENTS.md');
  fs.writeFileSync(agentPath, fs.readFileSync(agentPath, 'utf8').replace('GPT-6 Astra / Medium', 'GPT-5.6 Sol / Medium'));
  assert.notEqual(run(['--check']).status, 0, 'stale model instructions must fail');
  assert.equal(run().status, 0);
  const workspace = path.join(tmp, 'explicit-workspace');
  fs.mkdirSync(workspace);
  const env = { LAIDIES_AGENTS_WORKSPACE_TARGET: workspace };
  assert.equal(run([], env).status, 0);
  assert.equal(run(['--check'], env).status, 0);
  assert.match(fs.readFileSync(path.join(workspace, 'AGENTS.md'), 'utf8'), /Website-homepage\/operations\/DECISIONS.md/);
  fs.appendFileSync(path.join(workspace, 'AGENTS.md'), 'drift\n');
  assert.notEqual(run(['--check'], env).status, 0, 'outer instruction drift must fail');
  console.log('Instruction distribution: missing/stale/outer drift rejected; isolated parent preserved; explicit dual render passed.');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
