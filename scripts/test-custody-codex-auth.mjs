import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'test-custody-codex-auth-'));
const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const script = path.resolve(scriptsDirectory, 'custody-codex-auth.mjs');
const key = crypto.randomBytes(32).toString('base64');
const auth = {
  auth_mode: 'chatgpt',
  tokens: {access_token: 'test-access', refresh_token: 'test-refresh', id_token: 'test-id'},
};
const metadata = {
  AUTH_CUSTODY_WORKFLOW_ID: '123',
  AUTH_CUSTODY_RUN_ID: '456',
  AUTH_CUSTODY_RUN_STARTED_AT: '2026-09-26T10:11:12Z',
  AUTH_CUSTODY_SOURCE_COMMIT: 'a'.repeat(40),
  AUTH_CUSTODY_SOURCE_REF: 'refs/heads/main',
};

function run(args, env = {}) {
  const result = spawnSync(process.execPath, [script, ...args], {
    encoding: 'utf8',
    env: {
      ...process.env,
      GITHUB_REPOSITORY: 'laidies/newsstand-automation',
      NEWSSTAND_PRIVATE_HANDOFF_KEY_B64: key,
      ...metadata,
      ...env,
    },
  });
  return result;
}

try {
  const source = path.join(root, 'auth.json');
  const encrypted = path.join(root, 'capsule', 'auth.enc');
  const sidecar = path.join(root, 'capsule', 'auth-meta.json');
  const restored = path.join(root, 'restored', 'auth.json');
  fs.writeFileSync(source, JSON.stringify(auth), {mode: 0o600});

  let result = run(['seal', source, encrypted, sidecar]);
  assert.equal(result.status, 0, result.stderr);
  const record = JSON.parse(fs.readFileSync(sidecar, 'utf8'));
  assert.deepEqual(record, {
    version: 1,
    workflowId: '123',
    runId: '456',
    runStartedAt: '2026-09-26T10:11:12Z',
    sourceCommit: 'a'.repeat(40),
    sourceRef: 'refs/heads/main',
  });

  result = run(['restore', encrypted, restored, sidecar]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(fs.readFileSync(restored, 'utf8')), auth);

  const tamperedSidecar = path.join(root, 'tampered-meta.json');
  fs.writeFileSync(tamperedSidecar, JSON.stringify({...record, runId: '457'}));
  result = run(['restore', encrypted, path.join(root, 'tampered', 'auth.json'), tamperedSidecar]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /CODEX_AUTH_CUSTODY_HELD/);

  result = run(['seed', 'dedicated-seed', path.join(root, 'seed', 'auth.json')], {
    ALLOW_BOOTSTRAP: 'false',
    CODEX_AUTH_JSON: JSON.stringify(auth),
  });
  assert.equal(result.status, 2);

  result = run(['seed', 'dedicated-seed', path.join(root, 'seed-valid', 'auth.json')], {
    ALLOW_BOOTSTRAP: 'true',
    CODEX_AUTH_JSON: JSON.stringify(auth),
  });
  assert.equal(result.status, 0, result.stderr);
  const publicRestore = path.join(root, 'public-restored', 'auth.json');
  result = run(['restore', encrypted, publicRestore, sidecar], { GITHUB_REPOSITORY: 'laidies/LAIDIES', GITHUB_ACTIONS: 'true', GITHUB_WORKFLOW_REF: 'laidies/LAIDIES/.github/workflows/newsstand-cloud-intake.yml@refs/heads/main' });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(fs.readFileSync(publicRestore, 'utf8')), auth);
  result = run(['restore', encrypted, path.join(root, 'bad-public', 'auth.json'), sidecar], { GITHUB_REPOSITORY: 'laidies/LAIDIES', GITHUB_ACTIONS: 'true', GITHUB_WORKFLOW_REF: 'laidies/LAIDIES/.github/workflows/other.yml@refs/heads/main' });
  assert.equal(result.status, 2, 'unapproved public workflow must reject');
  result = run(['restore', encrypted, path.join(root, 'fork', 'auth.json'), sidecar], { GITHUB_REPOSITORY: 'other/LAIDIES', GITHUB_ACTIONS: 'true', GITHUB_WORKFLOW_REF: 'laidies/LAIDIES/.github/workflows/newsstand-cloud-intake.yml@refs/heads/main' });
  assert.equal(result.status, 2, 'fork must reject');
  console.log('PASS custody migration: exact public recipient, workflow and branch only; tampered ciphertext or metadata, forks and unauthorized workflows reject');
} finally {
  fs.rmSync(root, {recursive: true, force: true});
}
