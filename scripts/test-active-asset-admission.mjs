#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assertActiveAsset, compileActiveAssetRegistry } from './lib/active-asset-admission.mjs';

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-asset-admission-'));
try {
  const write = (relative, source) => {
    const filename = path.join(directory, relative);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, source);
    return { filename, sha256: crypto.createHash('sha256').update(source).digest('hex') };
  };
  const active = write('assets/active.png', 'active');
  const dynamic = write('assets/cards/one.png', 'dynamic');
  const retired = write('assets/retired.png', 'retired');
  const candidate = write('assets/card-candidate-v1.png', 'candidate');
  const registry = compileActiveAssetRegistry({
    schema: 'laidies.active-assets.v1', default_policy: 'DENY',
    entries: [
      { role: 'test.active', status: 'ACTIVE', path: 'assets/active.png', sha256: active.sha256 },
      { role: 'test.retired', status: 'RETIRED', path: 'assets/retired.png' },
    ],
    retired_paths: [],
    dynamic_families: [{ role: 'test.cards', status: 'ACTIVE', path: 'assets/cards', members: [{ path: 'one.png', sha256: dynamic.sha256 }] }],
  });

  assert.equal(assertActiveAsset({ relativePath: 'assets/active.png', absolutePath: active.filename, registry }).role, 'test.active');
  assert.equal(assertActiveAsset({ relativePath: 'assets/cards/one.png', absolutePath: dynamic.filename, registry }).dynamic_family, 'test.cards');
  assert.throws(() => assertActiveAsset({ relativePath: 'assets/retired.png', absolutePath: retired.filename, registry }), /non-ACTIVE/);
  assert.throws(() => assertActiveAsset({ relativePath: 'assets/card-candidate-v1.png', absolutePath: candidate.filename, registry }), /candidate/);
  assert.throws(() => assertActiveAsset({ relativePath: 'assets/unregistered.png', absolutePath: active.filename, registry }), /not registered ACTIVE/);
  fs.writeFileSync(active.filename, 'changed');
  assert.throws(() => assertActiveAsset({ relativePath: 'assets/active.png', absolutePath: active.filename, registry }), /checksum mismatch/);
  assert.throws(() => compileActiveAssetRegistry({ schema: 'laidies.active-assets.v1', default_policy: 'DENY', entries: [], retired_paths: [], dynamic_families: [{ status: 'ACTIVE', path: 'assets/cards', members: [] }] }), /explicit members/);
  console.log('ACTIVE ASSET ADMISSION TEST PASS');
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
