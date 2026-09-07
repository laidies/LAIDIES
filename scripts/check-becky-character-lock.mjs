import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const master = 'assets/town-characters/approved/becky/becky-character-approved-20260907.png';
const retired = ['becky-scene.png', 'becky-character-card-front-v1.png', 'becky-masthead-v1.png'];
const rejects = text => retired.some(name => text.includes(name));
// Negative calibration: each old source must fail, the exact master must pass.
for (const name of retired) assert.equal(rejects(`<img src="${name}">`), true);
assert.equal(rejects(master), false);
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, master))).digest('hex'), '9e050b5b633922aa0a5c4adec925b4e0ee1ee71b0de09079391d9bd9b0c29ce9');
const files = [];
function scan(dir) {
  for (const item of fs.readdirSync(path.join(root, dir), {withFileTypes:true})) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) scan(p);
    else if (/\.(html|css|js|json|md)$/.test(p)) files.push(p);
  }
}
for (const dir of ['content', 'operations/codex-prompts']) scan(dir);
files.push(...fs.readdirSync(root).filter(p => p.endsWith('.html')), 'operations/trailer-comic-storyboard.md');
const failures = files.filter(p => rejects(fs.readFileSync(path.join(root,p),'utf8')));
assert.deepEqual(failures, [], 'Retired Becky art remains in an active consumer or production prompt');
const registry = JSON.parse(fs.readFileSync(path.join(root,'operations/assets/active-asset-registry.json'),'utf8'));
assert.ok(registry.entries.some(e => e.role === 'character.becky.identity' && e.status === 'ACTIVE' && e.path === master));
console.log(`Becky identity lock: exact master, negative calibration and ${files.length} active source/prompt checks passed. Historical evidence and other checkouts are not scanned.`);
