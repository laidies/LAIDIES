import assert from 'node:assert/strict';
import fs from 'node:fs';

const bad = process.argv.includes('--calibration-bad');
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const watch = bad ? read('watch.html').replace('screeningCover', 'missingCover') : read('watch.html');
const watchCss = read('content/watch-v2.css');
const formatCss = read('content/episode-format-navigation.css');
const issueJs = read('content/issue-feature-v2.js');

assert.match(watch, /id="screeningCover"/);
assert.match(watch, /EPISODE_COVERS\s*=\s*\{/);
for (const episode of ['01', '02', '03', '04']) {
  assert.match(watch, new RegExp(`episode-vhs-boxes-v2/ep-${episode}\\.png`));
  const issue = read(`issues/issue-${episode}.html`);
  assert.match(issue, /episode-format-navigation\.css\?v=20260902-1/);
  assert.match(issue, /issue-feature-v2\.js\?v=20260902-1/);
}
assert.match(issueJs, /issue-feature--\(\\d\{2\}\)/);
assert.match(issueJs, /mode=listen/);
assert.match(issueJs, /mode=watch/);
assert.match(formatCss, /Episodes 01–04/);
assert.match(watchCss, /body\[data-format="listen"\]/);
assert.match(watchCss, /body\[data-format="watch"\]/);
assert.match(watchCss, /\.screening-feature\s*\{/);

console.log('CHICK FLICKS FORMAT SHELL PASS');
