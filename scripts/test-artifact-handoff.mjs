#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-handoff-'));
const outside = path.join(path.dirname(repo), `${path.basename(repo)}-outside.txt`);
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const write = (relative, text) => { const file = path.join(repo, relative); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); return file; };
try {
  write('scripts/check-artifact-handoff.mjs', fs.readFileSync(path.join(sourceRoot, 'scripts/check-artifact-handoff.mjs')));
  write('operations/runtime/artifact-handoff.schema.json', fs.readFileSync(path.join(sourceRoot, 'operations/runtime/artifact-handoff.schema.json')));
  const artifact = write('artifact.txt', 'exact\n'), brief = write('brief.md', 'brief\n');
  const base = { task: 'w', outcome: 'reader outcome', artifact: { path: 'artifact.txt', sha256: sha(artifact) }, brief: { path: 'brief.md', sha256: sha(brief) }, inputs: [], forbidden: ['prior verdicts'], accept: ['exact bytes'], run: ['test'], return: { status: 'PASS' }, budget: { in: 1, out: 1, wall: 1 }, evidence_time: '2026-08-08T00:00:00-07:00', locks: [], acceptance_owner: 'judge', next_trigger: 'none', authority_truth: { public: false, deploy: false, spend: false, ali_approval: false }, worktree_truth: { state: 'NO_REPOSITORY_MUTATION', paths: [] } };
  const handoff = write('handoff.json', JSON.stringify(base));
  const run = () => spawnSync(process.execPath, ['scripts/check-artifact-handoff.mjs', 'handoff.json'], { cwd: repo, encoding: 'utf8' });
  assert.equal(run().status, 0, run().stderr);
  base.artifact.path = 'nested/../../artifact.txt'; fs.writeFileSync(handoff, JSON.stringify(base)); assert.match(run().stderr, /must bind path and sha256/);
  base.artifact.path = 'linked.txt'; fs.writeFileSync(outside, 'outside\n'); fs.symlinkSync(outside, path.join(repo, 'linked.txt')); base.artifact.sha256 = sha(outside); fs.writeFileSync(handoff, JSON.stringify(base)); assert.match(run().stderr, /resolves outside repository/);
  base.artifact.path = 'artifact.txt'; base.artifact.sha256 = sha(artifact);
  base.artifact.sha256 = '0'.repeat(64); fs.writeFileSync(handoff, JSON.stringify(base)); assert.match(run().stderr, /sha256 mismatch/);
  base.artifact.sha256 = sha(artifact); base.worktree_truth = { state: 'UNCOMMITTED_OWNED', paths: ['candidate.html'], owner: 'maker', reason: 'awaiting review', next_trigger: 'review' }; fs.writeFileSync(handoff, JSON.stringify(base)); assert.match(run().stderr, /PASS cannot bind UNCOMMITTED_OWNED/);
  base.return.status = 'HOLD'; fs.writeFileSync(handoff, JSON.stringify(base)); assert.equal(run().status, 0, run().stderr);
  console.log('ARTIFACT HANDOFF CALIBRATION PASS exact=allowed stale=blocked uncommitted_pass=blocked owned_hold=allowed');
} finally { fs.rmSync(repo, { recursive: true, force: true }); fs.rmSync(outside, { force: true }); }
