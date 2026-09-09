#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { assertAssetNotRetired, compileActiveAssetRegistry } from './lib/active-asset-admission.mjs';

const registrySource = JSON.parse(fs.readFileSync('operations/assets/active-asset-registry.json', 'utf8'));
const retired = registrySource.entries.filter(entry => entry.role?.startsWith('ksvl.retired.'));
assert.equal(retired.length, 2, 'Both rejected KSVL exports must stay registered');
assert(retired.every(entry => entry.status === 'RETIRED' && entry.sha256));
const registry = compileActiveAssetRegistry({
  schema: registrySource.schema, default_policy: 'DENY', entries: retired,
});
const artifact = process.argv[2];
if (artifact) {
  const visit = directory => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) { if (entry.name !== '.wrangler') visit(absolute); continue; }
      if (!entry.isFile()) continue;
      assertAssetNotRetired({ relativePath: path.relative(artifact, absolute), absolutePath: absolute, registry });
      if (/\.(?:html|css|m?js|json|svg)$/i.test(entry.name)) {
        assert(!/ksvl-booth\.(?:jpg|png)/i.test(fs.readFileSync(absolute, 'utf8')), `Retired selector: ${absolute}`);
      }
    }
  };
  visit(artifact);
}

// Exercise the real artifact command with rejected image bytes, including a renamed copy.
const fixtures = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-ksvl-retirement-test-'));
try {
  const run = () => spawnSync(process.execPath, ['scripts/check-public-artifact-active-assets.mjs', fixtures], { encoding: 'utf8' });
  assert.equal(run().status, 0, 'An empty fixture is allowed');
  for (const entry of retired) {
    const original = fs.existsSync(entry.path)
      ? fs.readFileSync(entry.path)
      : spawnSync('git', ['show', `HEAD:${entry.path}`], { maxBuffer: 32 * 1024 * 1024 }).stdout;
    const filename = path.join(fixtures, 'renamed-studio.png');
    fs.writeFileSync(filename, original);
    const result = run();
    assert.equal(result.status, 1, `Renamed ${entry.path} must fail`);
    assert.match(result.stderr, /retired image bytes/);
    fs.unlinkSync(filename);
  }
  fs.writeFileSync(path.join(fixtures, 'index.html'), '<img src="/assets/building-interiors/ksvl-booth.jpg?v=old">');
  const result = run();
  assert.equal(result.status, 1, 'A retired selector without a local file must fail');
  assert.match(result.stderr, /retired_reference/);
} finally {
  fs.rmSync(fixtures, { recursive: true, force: true });
}
console.log(`KSVL RETIREMENT PASS: both original exports and renamed copies rejected${artifact ? '; artifact clear' : ''}`);
