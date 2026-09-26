#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  decryptPrivateEnvelope,
  encryptPrivateEnvelope,
  MAX_PRIVATE_PAYLOAD_BYTES,
  PrivateEnvelopeError,
  runPrivateEnvelopeCli,
} from './newsstand-private-envelope.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'test-newsstand-private-envelope-'));
const keyB64 = crypto.randomBytes(32).toString('base64');
const wrongKeyB64 = crypto.randomBytes(32).toString('base64');
const context = 'qualified-news-current-registry-20260926-v3';
const schema = 'newsstand-editorial-protocol-v1';
const runPurpose = 'exact-private-editorial-calibration-handoff';
const payload = Buffer.from('private article, evidence, and exact reviewer judgment', 'utf8');
const shared = { keyB64, context, schema, runPurpose };
const secrets = [keyB64, wrongKeyB64, payload.toString('utf8'), context, schema, runPurpose];

function expectCode(fn, code) {
  assert.throws(fn, (error) => {
    assert.ok(error instanceof PrivateEnvelopeError);
    assert.equal(error.code, code);
    const serialized = JSON.stringify({ name: error.name, code: error.code, message: error.message, stack: error.stack });
    for (const secret of secrets) assert.ok(!serialized.includes(secret), 'sanitized error excludes input and key values');
    return true;
  });
}

const captured = [];
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stdout.write = ((chunk) => { captured.push(String(chunk)); return true; });
process.stderr.write = ((chunk) => { captured.push(String(chunk)); return true; });

try {
  const first = encryptPrivateEnvelope({ payload, ...shared });
  const second = encryptPrivateEnvelope({ payload, ...shared });
  assert.ok(!first.equals(second), 'random 12-byte IV prevents deterministic envelope reuse');
  assert.deepEqual(decryptPrivateEnvelope({ envelope: first, ...shared }), payload, 'binary API round trips exact bytes');

  const tamperedCiphertext = Buffer.from(first);
  tamperedCiphertext[tamperedCiphertext.length - 1] ^= 0x01;
  expectCode(() => decryptPrivateEnvelope({ envelope: tamperedCiphertext, ...shared }), 'AUTHENTICATION_FAILED');

  const tamperedMetadata = Buffer.from(first);
  tamperedMetadata[10] ^= 0x01;
  expectCode(() => decryptPrivateEnvelope({ envelope: tamperedMetadata, ...shared }), 'AUTHENTICATION_FAILED');

  const badMagic = Buffer.from(first);
  badMagic[0] ^= 0x01;
  expectCode(() => decryptPrivateEnvelope({ envelope: badMagic, ...shared }), 'INVALID_ENVELOPE');

  const badVersion = Buffer.from(first);
  badVersion[4] = 2;
  expectCode(() => decryptPrivateEnvelope({ envelope: badVersion, ...shared }), 'UNSUPPORTED_VERSION');

  expectCode(() => decryptPrivateEnvelope({ envelope: first, ...shared, context: 'different-context' }), 'CONTEXT_MISMATCH');
  expectCode(() => decryptPrivateEnvelope({ envelope: first, ...shared, keyB64: wrongKeyB64 }), 'AUTHENTICATION_FAILED');
  expectCode(() => decryptPrivateEnvelope({ envelope: first.subarray(0, 20), ...shared }), 'INVALID_ENVELOPE');
  expectCode(() => encryptPrivateEnvelope({ payload: Buffer.alloc(MAX_PRIVATE_PAYLOAD_BYTES + 1), ...shared }), 'PAYLOAD_TOO_LARGE');
  expectCode(() => encryptPrivateEnvelope({ payload, ...shared, keyB64: 'not-a-key' }), 'INVALID_KEY');

  fs.mkdirSync(path.join(root, 'plain'), { mode: 0o700 });
  fs.writeFileSync(path.join(root, 'plain', 'input.bin'), payload, { mode: 0o600 });
  runPrivateEnvelopeCli({
    argv: ['encrypt', '--input', 'plain/input.bin', '--output', 'handoff/envelope.bin', '--context', context, '--schema', schema, '--purpose', runPurpose],
    cwd: root,
    keyB64,
  });
  assert.equal(fs.statSync(path.join(root, 'handoff')).mode & 0o777, 0o700, 'creates output parent with 0700 permissions');
  assert.equal(fs.statSync(path.join(root, 'handoff', 'envelope.bin')).mode & 0o777, 0o600, 'creates envelope with 0600 permissions');

  runPrivateEnvelopeCli({
    argv: ['decrypt', '--input', 'handoff/envelope.bin', '--output', 'restored/output.bin', '--context', context, '--schema', schema, '--purpose', runPurpose],
    cwd: root,
    keyB64,
  });
  assert.deepEqual(fs.readFileSync(path.join(root, 'restored', 'output.bin')), payload, 'CLI round trips exact file bytes');
  assert.equal(fs.statSync(path.join(root, 'restored')).mode & 0o777, 0o700);
  assert.equal(fs.statSync(path.join(root, 'restored', 'output.bin')).mode & 0o777, 0o600);

  expectCode(() => runPrivateEnvelopeCli({
    argv: ['encrypt', '--input', '../outside', '--output', 'safe/out', '--context', context, '--schema', schema, '--purpose', runPurpose], cwd: root, keyB64,
  }), 'UNSAFE_PATH');
  expectCode(() => runPrivateEnvelopeCli({
    argv: ['encrypt', '--input', 'plain/input.bin', '--output', 'handoff/envelope.bin', '--context', context, '--schema', schema, '--purpose', runPurpose], cwd: root, keyB64,
  }), 'OUTPUT_EXISTS');

  fs.symlinkSync(path.join(root, 'plain'), path.join(root, 'linked-parent'));
  expectCode(() => runPrivateEnvelopeCli({
    argv: ['encrypt', '--input', 'linked-parent/input.bin', '--output', 'safe/out', '--context', context, '--schema', schema, '--purpose', runPurpose], cwd: root, keyB64,
  }), 'UNSAFE_PATH');
  fs.symlinkSync(path.join(root, 'plain', 'input.bin'), path.join(root, 'plain', 'linked-input.bin'));
  expectCode(() => runPrivateEnvelopeCli({
    argv: ['encrypt', '--input', 'plain/linked-input.bin', '--output', 'safe/out', '--context', context, '--schema', schema, '--purpose', runPurpose], cwd: root, keyB64,
  }), 'FILE_ACCESS_FAILED');
  fs.symlinkSync(path.join(root, 'plain', 'input.bin'), path.join(root, 'handoff', 'linked-output.bin'));
  expectCode(() => runPrivateEnvelopeCli({
    argv: ['encrypt', '--input', 'plain/input.bin', '--output', 'handoff/linked-output.bin', '--context', context, '--schema', schema, '--purpose', runPurpose], cwd: root, keyB64,
  }), 'OUTPUT_EXISTS');

  const linkedRoot = `${root}-link`;
  fs.symlinkSync(root, linkedRoot);
  try {
    expectCode(() => runPrivateEnvelopeCli({
      argv: ['encrypt', '--input', 'plain/input.bin', '--output', 'safe/out', '--context', context, '--schema', schema, '--purpose', runPurpose], cwd: linkedRoot, keyB64,
    }), 'UNSAFE_PATH');
  } finally {
    fs.unlinkSync(linkedRoot);
  }

  assert.equal(captured.join(''), '', 'in-process API and CLI function emit no logs or private values');

  const script = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'newsstand-private-envelope.mjs');
  const childEnv = { PATH: process.env.PATH ?? '', NEWSSTAND_PRIVATE_HANDOFF_KEY_B64: keyB64 };
  const child = spawnSync(process.execPath, [script, 'decrypt', '--input', 'handoff/envelope.bin', '--output', 'child/output.bin', '--context', 'wrong', '--schema', schema, '--purpose', runPurpose], {
    cwd: root,
    env: childEnv,
    encoding: 'utf8',
  });
  assert.equal(child.status, 2);
  assert.equal(child.stdout, '');
  assert.match(child.stderr, /^NEWSSTAND_PRIVATE_ENVELOPE_ERROR CONTEXT_MISMATCH\n$/);
  for (const secret of secrets) {
    assert.ok(!child.stdout.includes(secret));
    assert.ok(!child.stderr.includes(secret));
  }
} finally {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  fs.rmSync(root, { recursive: true, force: true });
}

console.log('PASS newsstand-private-envelope: authenticated binary roundtrip, tamper/context rejection, bounded paths, private permissions, and no secret logs');
