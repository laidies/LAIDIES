import assert from 'node:assert/strict';
import fs from 'node:fs';

const bad = process.argv.includes('--calibration-bad');
const hiddenCaptionBad = process.argv.includes('--calibration-hidden-caption-bad');
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const watch = bad ? read('watch.html').replace('screeningCover', 'missingCover') : read('watch.html');
const watchCssSource = read('content/watch-v2.css');
const watchCss = hiddenCaptionBad
  ? watchCssSource.replace(/\.screening-room-page \.cap-bar\[hidden\]\s*\{\s*display:\s*none;\s*\}/, '')
  : watchCssSource;
const visualSystemCss = read('content/site/laidies-visual-system.css');
const formatCss = read('content/episode-format-navigation.css');
const issueJs = read('content/issue-feature-v2.js');

assert.match(watch, /id="screeningCover"/);
assert.doesNotMatch(watch, /Screening Room One/i);
assert.match(watch, /<p class="scr-eyebrow">The Chick Flicks<\/p>/);
assert.match(watch, /id="arrivalPlay"/);
assert.match(watch, /id="arrivalPlayLabel">Start Episode 01/);
assert.match(watch, /<small>Listen now<\/small>/);
assert.match(watch, /id="screeningStageLabel">Now listening<\/span>/);
assert.match(watch, /screeningStageLabel\.textContent = requestedFormat === 'watch' \? 'Now screening' : 'Now listening'/);
assert.match(watch, /id="deckPlayLabel">Play audio<\/span>/);
assert.match(watch, /deckPlayLabel\.textContent = playing\(\) \? 'Pause audio' : \(tape\.currentTime > 0 \? 'Continue audio' : 'Play audio'\)/);
assert.match(watch, /id="playerFallbackCover"/);
assert.match(watch, /resumePanel\.hidden = true/);
assert.match(watch, /playerFallbackCover\.hidden = false/);
assert.match(watch, /class="screening-extras"/);
assert.match(watch, /Special features/);
assert.doesNotMatch(watch, /screening-departures/);
assert.doesNotMatch(watch, /After the credits/);
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
assert.match(watch, /laidies-visual-system\.css\?v=/);
assert.match(watchCss, /body\.screening-room-page\[data-format="listen"\]\s*\{[^}]*--screen-ink:\s*var\(--laidies-ink\)[^}]*--screen-pink:\s*var\(--laidies-pink\)[^}]*--screen-cyan:\s*var\(--laidies-cyan\)[^}]*--screen-yellow:\s*var\(--laidies-yellow\)/s);
assert.match(watchCss, /body\[data-format="listen"\] \.screening-arrival\s*\{[^}]*background-image:\s*var\(--laidies-bg-comic-masthead\)/s);
assert.match(visualSystemCss, /--laidies-comic-texture:\s*url\('\/assets\/library\/episode-01-pop-comic-bg-v1\.png'\)/);
assert.match(watchCss, /body\[data-format="listen"\] \.screening-auditorium\s*\{[^}]*rgba\(21, 188, 224[^}]*episode-01-pop-comic-bg-v1\.png/s);
assert.match(watchCss, /body\.screening-room-page\[data-format="listen"\] \.theatre,[\s\S]*?body\[data-format="listen"\] \.theatre\s*\{[^}]*rgba\(242, 84, 169[^}]*rgba\(113, 55, 214[^}]*rgba\(21, 188, 224[^}]*episode-01-pop-comic-bg-v1\.png/s);
assert.match(watchCss, /body\[data-format="listen"\] \.episode-format-nav\[data-theme="dark"\]\s*\{[^}]*--format-bg:\s*var\(--screen-paper\)[^}]*--format-ink:\s*var\(--screen-ink\)/s);
assert.match(watchCss, /body\[data-format="listen"\] \.screening-program\s*\{[^}]*background:\s*var\(--screen-cyan\)/s);
assert.match(watch, /\.screening-mode\[hidden\]\s*\{\s*display:\s*none/);
assert.doesNotMatch(watchCss, /body\[data-format="listen"\] \.screening-auditorium\s*\{[^}]*(?:#101b48|#171040|#0b1335|#000|var\(--screen-midnight\))/s);
assert.match(watchCss, /body\.screening-room-page\[data-format="listen"\] \.theatre,[\s\S]*?body\[data-format="listen"\] \.theatre\s*\{[^}]*background-image:[^}]*episode-01-pop-comic-bg-v1\.png/s);
assert.match(watchCss, /\.screening-feature\s*\{/);
assert.match(watchCss, /\.screening-arrival-play\s*\{/);
assert.match(watchCss, /\.screening-arrival-play__icon\s*\{/);
assert.match(watchCss, /grid-template-columns:\s*4\.8rem minmax\(0, 1fr\)/);
assert.match(watchCss, /\.screening-extras\s*\{/);
assert.match(watchCss, /body\[data-format="listen"\] \.screening-extras\s*\{[^}]*rgba\(242, 84, 169[^}]*rgba\(113, 55, 214[^}]*rgba\(21, 188, 224[^}]*episode-01-pop-comic-bg-v1\.png/s);
assert.match(watchCss, /\.screening-extras__inner\s*\{/);
assert.match(watchCss, /\.screening-extras__links a\s*\{[^}]*color:\s*var\(--laidies-ink\)[^}]*background:\s*var\(--laidies-cyan\)/s);
for (const currentSiteAccent of ['#f254a9', '#7137d6', '#15bce0', '#ff7366', '#7de2c2', '#ffd34d']) {
  assert.match(visualSystemCss, new RegExp(currentSiteAccent));
}
assert.doesNotMatch(watchCss, /\.screening-extras\s*\{[^}]*background:\s*var\(--screen-midnight\)/s);
assert.doesNotMatch(watchCss, /\.screening-extras__links a\s*\{[^}]*#4b2148/s);
assert.doesNotMatch(watchCss, /\.screening-extras(?:__heading|__links|__note)[^{]*\{[^}]*\n\s*color:\s*(?:var\(--screen-paper\)|#fff)/s);
assert.match(watchCss, /\.screening-room-page \.player-status p\s*\{/);
assert.match(watchCss, /\.screening-room-page \.cap-bar\[hidden\]\s*\{\s*display:\s*none/);
assert.doesNotMatch(watchCss, /\.screening-departures\s*\{/);

console.log('CHICK FLICKS FORMAT SHELL PASS');
