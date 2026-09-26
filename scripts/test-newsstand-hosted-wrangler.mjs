#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mergePreservedManifest, patchWrangler, PIN} from './patch-newsstand-hosted-wrangler.mjs';
const hash='a'.repeat(32), uploaded={'/newsstand.html':'b'.repeat(32)};
assert.deepEqual(mergePreservedManifest({...uploaded},{'/index.html':hash}),{...uploaded,'/index.html':hash});
for (const bad of [null,[],{}, {'/newsstand.html':hash}, {'../index.html':hash}, {'/a/../index.html':hash}, {'/a//b':hash}, {'/a\\b':hash}, {'/index.html?x':hash}, {'/index.html':'bad'}]) {
  const original={...uploaded};
  assert.throws(()=>mergePreservedManifest(original,bad));
  assert.deepEqual(original,uploaded,'failure must not partially alter the upload');
}
assert.throws(()=>patchWrangler('different source',PIN.version),/PIN_MISMATCH/);
assert.throws(()=>patchWrangler('different source','latest'),/PIN_MISMATCH/);
if (process.argv[2]) {
  const original=fs.readFileSync(process.argv[2],'utf8');
  const patched=patchWrangler(original,PIN.version);
  assert.ok(patched.includes('PRESERVATION_MANIFEST_REQUIRED'));
  assert.equal(patched.split('formData.append("manifest", JSON.stringify(manifest));').length,2);
}
console.log('HOSTED WRANGLER PASS: preservation merge and malformed/overlapping entries; no deployment performed.');
