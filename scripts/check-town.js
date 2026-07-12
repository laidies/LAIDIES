#!/usr/bin/env node
/*
 * check-town.js — the SUNNYVAiLE consistency gate (built 2026-07-12).
 * One command that catches the drift class that keeps burning us:
 *   1. Every PUBLISHED episode must have canon (episode-0N.canon.md) — the system's fuel.
 *   2. Episode titles must agree across episode-index.json, site-data.js, chick-flicks.html.
 *   3. No dead href="#" on live top-level pages.
 *   4. Every site-index.json entry must point at a file that exists.
 *   5. Reward events consumed by the Closet must be emitted somewhere in script.js.
 * Exit 1 on any failure — wire me into .githooks/pre-commit.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));
let failures = [];
const fail = (msg) => failures.push(msg);

// ---------- 1 + 2: episode canon presence & title parity ----------
const epIndex = JSON.parse(read('content/episode-index.json'));
const episodes = epIndex.episodes || epIndex;
global.window = {};
require(path.join(ROOT, 'content/site/site-data.js'));
const siteData = global.window.LAIDIES_SITE_DATA || {};
const sdEpisodes = siteData.episodes || [];
const chick = read('chick-flicks.html');

for (const ep of episodes) {
  if (ep.status !== 'published') continue;
  const n = String(ep.number).padStart(2, '0');
  const canonPath = `content/episodes/episode-${n}.canon.md`;
  if (!exists(canonPath)) fail(`Ep${n}: PUBLISHED but no canon file (${canonPath}) — the canon system is starved for this episode`);
  const sd = sdEpisodes.find((e) => String(e.number).padStart(2, '0') === n);
  if (sd && sd.title !== ep.title) fail(`Ep${n}: title split-brain — episode-index says "${ep.title}", site-data.js says "${sd.title}"`);
  if (ep.title && !chick.includes(ep.title)) fail(`Ep${n}: chick-flicks.html never mentions canonical title "${ep.title}"`);
}

// ---------- 3: dead links on live top-level pages ----------
const livePages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !f.startsWith('preview') && !f.startsWith('design-comp') && !f.startsWith('quiz-issue'));
for (const page of livePages) {
  const n = (read(page).match(/href="#"/g) || []).length;
  if (n > 0) fail(`${page}: ${n} dead href="#" link(s)`);
}

// ---------- 4: site-index entries resolve ----------
try {
  const idx = JSON.parse(read('content/site/site-index.json'));
  for (const e of idx.entries || []) {
    const p = (e.url || '').split('#')[0].split('?')[0].replace(/^\//, '');
    if (p && !exists(p)) fail(`site-index.json: entry "${e.title}" points at missing ${e.url}`);
  }
} catch (err) { fail('site-index.json unreadable: ' + err.message); }

// ---------- 5: reward event emit/consume parity ----------
const scriptJs = read('script.js');
const cardJs = read('laidies-card.html');
const consumed = [...new Set([...cardJs.matchAll(/["'](quiz_score|quiz_sticker|trading_card|secret_badge|community_room_post|merit_badge|dare_penalty|sticker_girl_talk|hidden_charm)["']/g)].map((m) => m[1]))];
for (const type of consumed) {
  const emitted = scriptJs.includes(`"${type}"`) || scriptJs.includes(`'${type}'`);
  if (!emitted) fail(`reward-sync: Closet consumes "${type}" but script.js never emits it`);
}

// ---------- report ----------
if (failures.length) {
  console.error(`\n✗ CHECK-TOWN: ${failures.length} problem(s):\n`);
  failures.forEach((f) => console.error('  · ' + f));
  console.error('\nFix these (or consciously bypass with git commit --no-verify) before shipping.\n');
  process.exit(1);
} else {
  console.log('✓ CHECK-TOWN: canon, titles, links, index, and rewards all agree.');
}
