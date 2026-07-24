#!/usr/bin/env node
/*
 * check-town.js — the SUNNYVAiLE consistency gate (built 2026-07-12).
 * One command that catches the drift class that keeps burning us:
 *   1. Every PUBLISHED episode must have canon (episode-0N.canon.md) — the system's fuel.
 *   2. Episode titles must agree across episode-index.json, site-data.js, chick-flicks.html.
 *   3. No dead href="#" on live top-level pages.
 *   4. Every site-index.json entry must point at a file that exists.
 *   5. Reward events consumed by the Closet must be emitted somewhere in script.js.
 *   6. Every quiz selector has data, and the embedded fallback matches quizzes.json.
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
  const chickLoadsCanonicalIndex = chick.includes('/content/episode-index.json');
  if (ep.title && !chick.includes(ep.title) && !chickLoadsCanonicalIndex) {
    fail(`Ep${n}: chick-flicks.html neither names canonical title "${ep.title}" nor loads content/episode-index.json`);
  }
}

// ---------- 3: dead links on live top-level pages ----------
const livePages = fs.readdirSync(ROOT).filter((f) =>
  f.endsWith('.html') &&
  !f.startsWith('_') &&
  !f.startsWith('preview') &&
  !f.startsWith('design-comp') &&
  !f.startsWith('quiz-issue')
);
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

// ---------- 6: quiz selector/data parity ----------
try {
  const quizPage = read('learn/quiz.html');
  const quizFile = JSON.parse(read('content/site/quizzes.json'));
  const embeddedQuizzes = siteData.quizzes || {};
  const selectorKeys = [...quizPage.matchAll(/data-quiz-open=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const key of selectorKeys) {
    if (!quizFile[key]) fail(`quiz: selector "${key}" has no entry in content/site/quizzes.json`);
    if (!embeddedQuizzes[key]) fail(`quiz: selector "${key}" has no embedded fallback in content/site/site-data.js`);
  }
  if (JSON.stringify(sortObject(quizFile)) !== JSON.stringify(sortObject(embeddedQuizzes))) {
    fail('quiz: content/site/quizzes.json and the site-data.js fallback differ');
  }
} catch (err) { fail('quiz data unreadable: ' + err.message); }

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== 'object') return value;
  return Object.keys(value).sort().reduce((result, key) => {
    result[key] = sortObject(value[key]);
    return result;
  }, {});
}

// ---------- report ----------
if (failures.length) {
  console.error(`\n✗ CHECK-TOWN: ${failures.length} problem(s):\n`);
  failures.forEach((f) => console.error('  · ' + f));
  console.error('\nFix these (or consciously bypass with git commit --no-verify) before shipping.\n');
  process.exit(1);
} else {
  console.log('✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.');
}
