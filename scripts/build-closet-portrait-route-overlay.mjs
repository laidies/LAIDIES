import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const [base, manifestPath, identity] = process.argv.slice(2);
const root = path.resolve(import.meta.dirname, '..');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.identitySha256, identity);
assert.equal(sha(manifest.files.map(r => `${r.sha256}  ${r.path}\n`).join('')), identity);
const before = `      <label class="edit-field-label">Pick your archetype (this is your card face)</label>
      <div class="avatar-picker-note">
        <strong>The 24 archetype avatars are being illustrated.</strong><br>
        When they land, this grid will show them (12 archetypes × F/M presentations).
      </div>`;
const source = fs.readFileSync(path.join(root, 'laidies-card.html'), 'utf8');
const after = source.match(/      <p class="edit-field-label">Your Card portrait<\/p>\n      <div class="avatar-picker-note">[\s\S]*?      <\/div>/)?.[0];
assert.ok(after, 'exact source-owned portrait routing block required');
assert.ok(after.includes('href="/maikeover.html"'));
assert.ok(after.includes('Save any edits here before leaving.'));
const replace = text => {
  assert.equal(text.split(before).length, 2, 'exactly one unchanged predecessor block required');
  return text.replace(before, after);
};
assert.throws(() => replace('missing predecessor'), /exactly one/);
assert.throws(() => replace(before + before), /exactly one/);
for (const r of manifest.files) {
  assert.ok(!path.isAbsolute(r.path) && !r.path.split('/').includes('..'));
  const bytes = fs.readFileSync(path.join(base, r.path));
  assert.equal(sha(bytes), r.sha256, r.path);
  assert.equal(bytes.length, r.bytes, r.path);
}
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'laidies-closet-portrait-route.'));
const changed = [];
for (const r of manifest.files) {
  let bytes = fs.readFileSync(path.join(base, r.path));
  if (r.path === 'laidies-card.html') bytes = Buffer.from(replace(bytes.toString()));
  const target = path.join(output, r.path);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.writeFileSync(target, bytes);
  if (sha(bytes) !== r.sha256) changed.push(r.path);
}
assert.deepEqual(changed, ['laidies-card.html']);
execFileSync(process.execPath, [path.join(root, 'scripts/create-release-manifest.mjs'), output, output + '.manifest.json'], {stdio:'inherit'});
console.log(JSON.stringify({artifact:output, baseIdentity:identity, changed, added:[], removed:[], calibration:'missing and duplicated predecessor rejected'}));
