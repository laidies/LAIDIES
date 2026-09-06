import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { deriveTargets, exportMaster, parseMaster, renderMaster } from './export-episode-master.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'scripts/export-episode-master.mjs');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'episode-master-'));

function master({ settings = '{"episode":1,"status":"PRODUCER_REPAIR","shared":{"title":"A <B> & C","dolly_bridge":"Build it"}}', written = '<article data-title="{{EP:title}}"><h1>{{EP:title}}</h1><p>Keep <em>this</em> markup.</p><p>{{EP:dolly_bridge}}</p></article>', narration = '[warm] {{EP:title}}\n[beat] {{EP:dolly_bridge}}' } = {}) {
  return `# Private master\n\n## Export settings\n\`\`\`json\n${settings}\n\`\`\`\n\nKeep these bytes outside exports.\n\n## Written edition\n\`\`\`html\n${written}\n\`\`\`\n\n## Narration\n\`\`\`text\n${narration}\n\`\`\`\n`;
}

function write(name, value) {
  const file = path.join(fixture, name);
  fs.writeFileSync(file, value, 'utf8');
  return file;
}

const source = master();
const parsed = parseMaster(source);
const rendered = renderMaster(parsed);
assert.equal(rendered.issueHtml, '<article data-title="A &lt;B&gt; &amp; C"><h1>A &lt;B&gt; &amp; C</h1><p>Keep <em>this</em> markup.</p><p>Build it</p></article>\n');
assert.equal(rendered.narration, '[warm] A <B> & C\n[beat] Build it\n');
assert.match(rendered.issueHtml, /<em>this<\/em>/, 'HTML markup is retained');
assert.match(rendered.narration, /^\[warm\]/, 'narration cue is retained');

const changed = renderMaster(parseMaster(master({ settings: '{"episode":1,"status":"PRODUCER_REPAIR","shared":{"title":"Changed","dolly_bridge":"Build it"}}' })));
assert.match(changed.issueHtml, /Changed/);
assert.match(changed.narration, /Changed/);

for (const [label, value, expected] of [
  ['missing section', source.replace('## Narration', '## Narration missing'), /Narration section/],
  ['duplicate section', `${source}\n## Narration\n\`\`\`text\nagain\n\`\`\`\n`, /Narration section/],
  ['bad metadata', master({ settings: '{"episode":5,"status":"PRODUCER_REPAIR","shared":{}}' }), /episode must/],
  ['unknown token', master({ written: '<p>{{EP:nope}}</p>' }), /unknown shared token/],
  ['invalid token', master({ written: '<p>{{EP:Bad}}</p>' }), /invalid shared token/],
  ['unused shared', master({ settings: '{"episode":1,"status":"PRODUCER_REPAIR","shared":{"title":"A","dolly_bridge":"B","unused":"C"}}' }), /unused/],
  ['one-sided binding', master({ narration: '[warm] {{EP:title}}' }), /both editions/],
  ['empty payload', master({ narration: '' }), /payload must not be empty/]
]) {
  assert.throws(() => renderMaster(parseMaster(value)), expected, label);
}

const validMaster = write('episode-01.master.md', source);
const targets = deriveTargets(validMaster, 1);
const first = exportMaster(validMaster);
assert.deepEqual(first.changed.sort(), [targets.issueHtml, targets.narration].sort(), 'export writes both derived private outputs');
assert.equal(fs.readFileSync(targets.issueHtml, 'utf8'), rendered.issueHtml);
assert.equal(fs.readFileSync(targets.narration, 'utf8'), rendered.narration);
assert.equal(spawnSync(process.execPath, [cli, validMaster, '--check'], { encoding: 'utf8' }).status, 0, 'exact outputs pass --check');
fs.writeFileSync(targets.narration, 'drift\n', 'utf8');
const drift = spawnSync(process.execPath, [cli, validMaster, '--check'], { encoding: 'utf8' });
assert.equal(drift.status, 1, 'drift fails --check');
assert.match(drift.stderr, /output drift/);
assert.equal(fs.readFileSync(targets.narration, 'utf8'), 'drift\n', '--check never writes');

const protectedHtml = '<p>keep me</p>\n';
const protectedNarration = '[cue] keep me\n';
fs.writeFileSync(targets.issueHtml, protectedHtml, 'utf8');
fs.writeFileSync(targets.narration, protectedNarration, 'utf8');
const badMaster = write('bad.master.md', master({ written: '<p>{{EP:missing}}</p>' }));
const failed = spawnSync(process.execPath, [cli, badMaster], { encoding: 'utf8' });
assert.equal(failed.status, 1, 'validation failure exits nonzero');
assert.equal(fs.readFileSync(targets.issueHtml, 'utf8'), protectedHtml, 'invalid input cannot write HTML');
assert.equal(fs.readFileSync(targets.narration, 'utf8'), protectedNarration, 'invalid input cannot write narration');

fs.rmSync(fixture, { recursive: true, force: true });
console.log('PASS test-export-episode-master');
