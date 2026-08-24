#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(process.env.KSVL_ROOT || process.cwd());
const radioPath = path.join(root, 'radio.html');
const helperPath = path.join(root, 'content/site/ksvl-request-draft.js');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(fs.existsSync(radioPath), 'radio.html is missing');
check(fs.existsSync(helperPath), 'device-local request-draft helper is missing');

if (fs.existsSync(radioPath)) {
  const radio = fs.readFileSync(radioPath, 'utf8');
  check(/ksvl-request-draft\.js\?v=/.test(radio), 'Radio does not load the request-draft helper');
  check(/id="ksvl-req-delete"[^>]*hidden/.test(radio), 'Radio lacks a hidden delete-draft control');
  check(/id="ksvl-req-topic"[^>]*minlength="3"/.test(radio), 'Radio does not enforce the three-character topic boundary');
  check(/draftApi\s*=\s*window\.KSVLRequestDraft/.test(radio), 'Radio does not bind the strict request-draft contract');
  check(/draftApi\.read\(/.test(radio), 'Radio does not restore a valid device-local draft');
  check(/draftApi\.write\(/.test(radio), 'Radio does not write through the strict draft contract');
  check(/draftApi\.clear\(/.test(radio), 'Radio does not delete through the strict draft contract');
  check(!/localStorage\.setItem\(['"]ksvl_pending_request/.test(radio), 'Radio bypasses the strict draft writer');
  check(/provider unavailable[\s\S]{0,1800}saveLocalDraft\(/i.test(radio), 'Provider-unavailable fallback does not preserve a device-local draft');
  check(/Insert failed[\s\S]{0,1200}saveLocalDraft\(/.test(radio), 'Provider failure does not preserve a device-local draft');
}

if (fs.existsSync(helperPath)) {
  const require = createRequire(import.meta.url);
  delete require.cache[require.resolve(helperPath)];
  const drafts = require(helperPath);

  class MemoryStorage {
    constructor() { this.values = new Map(); }
    getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
    setItem(key, value) { this.values.set(key, String(value)); }
    removeItem(key) { this.values.delete(key); }
  }

  const now = Date.parse('2026-08-23T18:00:00.000Z');
  const valid = {
    style: 'y2k-pop-anthem',
    topic: 'The status meeting that should have been an email',
    lyrics: 'A calendar invite with no agenda',
  };

  const storage = new MemoryStorage();
  const written = drafts.write(storage, valid, now);
  assert.equal(written.state, 'saved');
  assert.equal(written.draft.schema_version, 1);
  assert.equal(written.draft.saved_at, new Date(now).toISOString());
  const restored = drafts.read(storage, now + 60_000);
  assert.equal(restored.state, 'restored');
  assert.equal(restored.draft.topic, valid.topic);

  const edited = drafts.write(storage, {...valid, topic: 'The 4pm status meeting edit'}, now + 120_000);
  assert.equal(edited.state, 'saved');
  assert.equal(drafts.read(storage, now + 121_000).draft.topic, 'The 4pm status meeting edit');

  const legacy = new MemoryStorage();
  legacy.setItem(drafts.DRAFT_KEY, JSON.stringify({...valid, saved_at: new Date(now).toISOString()}));
  const migrated = drafts.read(legacy, now + 10_000);
  assert.equal(migrated.state, 'restored');
  assert.equal(migrated.migrated, true);
  assert.equal(JSON.parse(legacy.getItem(drafts.DRAFT_KEY)).schema_version, 1);

  for (const badValue of [
    '{not json',
    JSON.stringify({...valid, schema_version: 1, saved_at: new Date(now - drafts.DRAFT_TTL_MS - 1).toISOString()}),
    JSON.stringify({...valid, schema_version: 1, saved_at: new Date(now + 301_000).toISOString()}),
    JSON.stringify({...valid, schema_version: 1, style: 'unknown-style', saved_at: new Date(now).toISOString()}),
    JSON.stringify({...valid, schema_version: 1, topic: 'No', saved_at: new Date(now).toISOString()}),
    JSON.stringify({...valid, schema_version: 1, extra: 'not allowed', saved_at: new Date(now).toISOString()}),
  ]) {
    const hostile = new MemoryStorage();
    hostile.setItem(drafts.DRAFT_KEY, badValue);
    assert.equal(drafts.read(hostile, now).state, 'discarded');
    assert.equal(hostile.getItem(drafts.DRAFT_KEY), null);
  }

  const readDenied = new MemoryStorage();
  readDenied.getItem = () => { throw new Error('denied'); };
  assert.equal(drafts.read(readDenied, now).state, 'unavailable');

  const writeDenied = new MemoryStorage();
  writeDenied.setItem = () => { throw new Error('denied'); };
  assert.equal(drafts.write(writeDenied, valid, now).state, 'unavailable');

  const removed = drafts.clear(storage);
  assert.equal(removed.state, 'cleared');
  assert.equal(storage.getItem(drafts.DRAFT_KEY), null);
}

if (failures.length) {
  console.error(`KSVL REQUEST DRAFT CONTRACT FAIL\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('KSVL REQUEST DRAFT CONTRACT PASS restore=1 edit=1 delete=1 expiry=6h legacy=migrated storage-denial=held provider-fallback=local-only');
