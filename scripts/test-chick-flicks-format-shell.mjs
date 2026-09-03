import assert from 'node:assert/strict';
import fs from 'node:fs';

const bad = process.argv.includes('--calibration-bad');
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const watch = bad ? read('watch.html').replace('screeningCover', 'missingCover') : read('watch.html');
const watchCss = read('content/watch-v2.css');
const formatCss = read('content/episode-format-navigation.css');
const issueJs = read('content/issue-feature-v2.js');

assert.match(watch, /id="screeningCover"/);
assert.doesNotMatch(watch, /Screening Room One/i);
assert.match(watch, /<p class="scr-eyebrow">The Chick Flicks<\/p>/);
assert.match(watch, /id="arrivalPlay"/);
assert.match(watch, /id="arrivalPlayLabel">Start Episode 01/);
assert.match(watch, /<small>Listen now<\/small>/);
assert.match(watch, /id="playerFallbackCover"/);
assert.match(watch, /resumePanel\.hidden = true/);
assert.match(watch, /playerFallbackCover\.hidden = false/);
assert.match(watch, /class="screening-extras"/);
assert.match(watch, /Everything in this episode/);
for (const route of ['blend-snap.html#the-study-pack', 'radio.html', 'sorority-house.html', 'learn/quiz.html']) {
  assert.match(watch, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}
assert.match(watch, /arrivalPlay\.addEventListener\('click', togglePlay\)/);
assert.match(watch, /function syncArrivalPlay\(\)/);
assert.match(watch, /EPISODE_COVERS\s*=\s*\{/);
assert.match(watch, /listenCover\.src = EPISODE_COVERS\[episodeKey\(ep\)\] \|\| admission\.posterPublicUrl/);
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
assert.match(watchCss, /\.screening-arrival-play\s*\{/);
assert.match(watchCss, /\.screening-arrival-play__icon\s*\{/);
assert.match(watchCss, /grid-template-columns:\s*4\.8rem minmax\(0, 1fr\)/);
assert.match(watchCss, /\.screening-extras\s*\{/);
assert.match(watchCss, /\.screening-room-page \.player-status p\s*\{/);
assert.match(watchCss, /\.screening-departures\s*\{[^}]*background:\s*var\(--screen-paper\)/s);

console.log('CHICK FLICKS FORMAT SHELL PASS');
