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
  fs.cpSync(path.join(root, contract, 'rules'), path.join(checkout, contract, 'rules'), { recursive: true });
  const sentinel = path.join(tmp, 'AGENTS.md');
  fs.writeFileSync(sentinel, 'unrelated parent instructions\n');
  assert.notEqual(run(['--check']).status, 0, 'missing generated instructions must fail');
  assert.equal(run().status, 0);
  assert.equal(fs.readFileSync(sentinel, 'utf8'), 'unrelated parent instructions\n');
  assert.equal(run(['--check']).status, 0);
  const agentPath = path.join(checkout, 'AGENTS.md');
  const entry = fs.readFileSync(agentPath, 'utf8');
  assert.ok(Buffer.byteLength(entry) < 8192, 'automatic entry must remain a bounded map');
  assert.doesNotMatch(entry, /Public meaning-bearing prose is never produced from/,
    'detailed prose policy must not be automatically inlined');
  for (const policy of ['working-rules', 'model-routing', 'teaching-production', 'production-design', 'episode-media', 'standing-authorization']) {
    assert.ok(entry.includes(`rules/${policy}.md`), `entry must route ${policy}`);
    const file = path.join(checkout, contract, 'rules', `${policy}.md`);
    const contents = fs.readFileSync(file, 'utf8');
    fs.unlinkSync(file);
    assert.notEqual(run(['--check']).status, 0, `missing ${policy} must fail`);
    assert.equal(fs.readFileSync(agentPath, 'utf8'), entry, 'failed route check must not replace entry');
    fs.writeFileSync(file, contents);
  }
  const templatePath = path.join(checkout, contract, 'AGENTS.template.md');
  const template = fs.readFileSync(templatePath, 'utf8');
  fs.appendFileSync(templatePath, 'x'.repeat(8193));
  assert.notEqual(run().status, 0, 'oversized entry must fail before writing');
  assert.equal(fs.readFileSync(agentPath, 'utf8'), entry);
  fs.writeFileSync(templatePath, template);
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
  console.log('Instruction distribution: missing/stale/outer drift, missing policy routes and oversized entry rejected; isolated parent preserved; explicit dual render passed.');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
