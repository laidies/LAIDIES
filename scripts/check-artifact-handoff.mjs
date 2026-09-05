#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHA256 = /^[a-f0-9]{64}$/;
const COMMIT = /^[a-f0-9]{40}$/;
const worktreeStates = new Set(['NO_REPOSITORY_MUTATION', 'UNCOMMITTED_OWNED', 'COMMITTED', 'PUSHED', 'DEPLOYED', 'VERIFIED_PUBLICLY']);
const committedStates = new Set(['COMMITTED', 'PUSHED', 'DEPLOYED', 'VERIFIED_PUBLICLY']);
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const git = (root, args) => spawnSync('git', args, { cwd: root, encoding: 'utf8' });
const safePath = value => typeof value === 'string' && value && !path.isAbsolute(value) && !value.includes('\\') && !value.split('/').includes('..');

function sourceBytes(root, relative, sourceCommit) {
  if (!safePath(relative)) throw new Error('path is outside repository');
  if (!sourceCommit) {
    const repository = fs.realpathSync(root);
    const resolved = fs.realpathSync(path.join(root, relative));
    if (!resolved.startsWith(`${repository}${path.sep}`)) throw new Error('path resolves outside repository');
    return fs.readFileSync(resolved);
  }
  if (!COMMIT.test(sourceCommit)) throw new Error('sourceCommit must be an exact 40-character commit');
  const result = spawnSync('git', ['show', `${sourceCommit}:${relative}`], { cwd: root, encoding: null });
  if (result.status !== 0) throw new Error(`path missing from commit ${sourceCommit}: ${relative}`);
  return result.stdout;
}

export function validateArtifactHandoff(data, { root = ROOT, sourceCommit = null } = {}) {
  const errors = [];
  let schema = { required: [] };
  try { schema = JSON.parse(fs.readFileSync(path.join(root, 'operations/runtime/artifact-handoff.schema.json'), 'utf8')); }
  catch (error) { errors.push(`schema unavailable: ${error.message}`); }
  for (const key of schema.required || []) if (data?.[key] === undefined) errors.push(`missing ${key}`);
  const bind = (value, label, commit) => {
    if (!value || !safePath(value.path) || !SHA256.test(value.sha256 || '')) { errors.push(`${label} must bind path and sha256`); return; }
    try { if (digest(sourceBytes(root, value.path, commit)) !== value.sha256) errors.push(`${label} sha256 mismatch`); }
    catch (error) { errors.push(`${label} ${error.message}`); }
  };
  const truth = data?.worktree_truth;
  const referenceCommit = sourceCommit;
  bind(data?.artifact, 'artifact', referenceCommit);
  bind(data?.brief, 'brief', referenceCommit);
  for (const [index, input] of (data?.inputs || []).entries()) bind(input, `inputs[${index}]`, referenceCommit);
  if (!Array.isArray(data?.accept) || !data.accept.length) errors.push('accept must be non-empty');
  if (!Array.isArray(data?.run) || !data.run.length) errors.push('run must be non-empty');
  if (!data?.budget || ![data.budget.in, data.budget.out, data.budget.wall].every(Number.isFinite)) errors.push('budget requires numeric in/out/wall');
  if (!['PASS', 'HOLD', 'BLOCKED', 'IN_PROGRESS_WITH_EXTERNAL_DEPENDENCY'].includes(data?.return?.status)) errors.push('return.status invalid');
  for (const key of ['public', 'deploy', 'spend', 'ali_approval']) if (typeof data?.authority_truth?.[key] !== 'boolean') errors.push(`authority_truth.${key} must be boolean`);
  if (!truth || !worktreeStates.has(truth.state)) errors.push('worktree_truth.state invalid');
  else {
    if (!Array.isArray(truth.paths)) errors.push('worktree_truth.paths must be an array');
    if (truth.state === 'NO_REPOSITORY_MUTATION' && truth.paths.length) errors.push('NO_REPOSITORY_MUTATION cannot list changed paths');
    if (truth.state === 'UNCOMMITTED_OWNED') {
      if (data?.return?.status === 'PASS') errors.push('PASS cannot bind UNCOMMITTED_OWNED work; commit exact changed paths or return a non-completion status');
      if (!truth.owner || !truth.reason || !truth.next_trigger) errors.push('UNCOMMITTED_OWNED requires owner, reason and next_trigger');
    }
    if (committedStates.has(truth.state)) {
      if (!COMMIT.test(truth.commit || '')) errors.push(`${truth.state} requires an exact 40-character commit`);
      else {
        if (git(root, ['cat-file', '-e', `${truth.commit}^{commit}`]).status !== 0) errors.push(`worktree_truth.commit does not resolve: ${truth.commit}`);
        const changed = new Set(git(root, ['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', truth.commit]).stdout.split(/\r?\n/).filter(Boolean));
        for (const item of truth.paths || []) if (!safePath(item) || !changed.has(item)) errors.push(`worktree_truth path is not in commit ${truth.commit}: ${item}`);
      }
    }
  }
  return { errors, data };
}

export function readCommittedHandoff(tuple, { root = ROOT } = {}) {
  if (!tuple || !safePath(tuple.path) || !SHA256.test(tuple.sha256 || '') || !COMMIT.test(tuple.commit || '')) throw new Error('handoff must bind path, sha256 and exact commit');
  if (git(root, ['cat-file', '-e', `${tuple.commit}^{commit}`]).status !== 0) throw new Error(`handoff commit does not resolve: ${tuple.commit}`);
  const bytes = sourceBytes(root, tuple.path, tuple.commit);
  if (digest(bytes) !== tuple.sha256) throw new Error('handoff sha256 mismatch');
  let data;
  try { data = JSON.parse(bytes.toString('utf8')); } catch { throw new Error('handoff is not valid JSON'); }
  const result = validateArtifactHandoff(data, { root, sourceCommit: data?.worktree_truth?.commit });
  if (result.errors.length) throw new Error(result.errors.join('; '));
  return data;
}

const direct = process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const file = process.argv[2];
  if (!file) { console.error('ARTIFACT HANDOFF FAIL missing path'); process.exit(1); }
  try {
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
    const result = validateArtifactHandoff(data, { root: process.cwd() });
    if (result.errors.length) throw new Error(result.errors.join('\n- '));
    console.log(`ARTIFACT HANDOFF PASS task=${data.task}`);
  } catch (error) { console.error(`ARTIFACT HANDOFF FAIL\n- ${error.message}`); process.exit(1); }
}
