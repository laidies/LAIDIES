import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const RESULTS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'navigation-test-results.json');
const BASELINE = 'f3fc008f';

function sourceAt(revision, file) {
  if (!revision) return fs.readFileSync(path.join(ROOT, file), 'utf8');
  return execFileSync('git', ['show', `${revision}:${file}`], { cwd: ROOT, encoding: 'utf8' });
}

function section(source, start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `Could not extract ${start}`);
  return source.slice(from, to);
}

function resumeFunction(source) {
  const start = source.indexOf('window.svShowResume = function');
  const end = source.indexOf('\n  };', start);
  assert.ok(start >= 0 && end > start, 'Could not extract svShowResume');
  return source.slice(start, end + '\n  };'.length);
}

class Element {
  constructor({ href = '', attributes = {}, children = {} } = {}) {
    this.href = href;
    this.attributes = new Map(Object.entries(attributes));
    this.children = children;
    this.textContent = '';
    this.hidden = false;
    this.classList = { contains: () => false };
  }
  hasAttribute(name) { return this.attributes.has(name); }
  setAttribute(name, value = '') { this.attributes.set(name, String(value)); }
  removeAttribute(name) { this.attributes.delete(name); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  querySelector(selector) { return this.children[selector] || null; }
}

function pageFixture({ latestFirst, source }) {
  const intentTitle = new Element();
  const intentSummary = new Element();
  const intent = new Element({
    href: '#this-week',
    attributes: { 'data-latest-episode-link': '' },
    children: {
      '[data-intent-episode-title]': intentTitle,
      '[data-intent-episode-summary]': intentSummary
    }
  });
  const latest = new Element({ href: '/issues/issue-04.html', attributes: { 'data-latest-episode-link': '' } });
  const current = new Element({ href: '/issues/issue-04.html', attributes: { 'data-current-episode-link': '' } });
  const heading = new Element();
  const read = new Element({ href: '/issues/issue-04.html' });
  const listen = new Element({ href: '/watch.html?ep=04' });
  const defaultCard = new Element();
  const resumeTitle = new Element();
  const resumeLink = new Element({ href: '/chick-flicks.html' });
  const resumeCard = new Element({ children: { '.fc-resume-title': resumeTitle, '.fc-resume-link': resumeLink } });
  const document = {
    querySelectorAll(selector) {
      if (selector === '[data-latest-episode-link]') return [intent, latest];
      if (selector === '[data-latest-episode-link], [data-current-episode-link]') return [intent, latest, current];
      return [];
    },
    querySelector(selector) {
      return ({
        '.fc-default': defaultCard,
        '.fc-resume': resumeCard,
        '.fc-default h3': heading,
        '.fc-default .fc-btn-teal': read,
        '.fc-default .fc-btn-coral': listen,
        '[data-intent-episode]': intent
      })[selector] || null;
    },
    addEventListener() {}
  };
  let resolveFetch;
  const fetch = () => new Promise(resolve => { resolveFetch = resolve; });
  const window = { document, addEventListener() {}, setTimeout, clearTimeout };
  const context = vm.createContext({ window, document, fetch, console, setTimeout, clearTimeout, Date, Number, String, Error });
  vm.runInContext(section(source, '/* ---------- latest-episode links:', '/* ---------- menu / filters / district tabs ---------- */'), context);
  vm.runInContext(resumeFunction(source), context);
  const published = { episodes: [
    { status: 'draft', number: 99, title: 'Never release', issueUrl: 'issues/issue-99.html' },
    { status: 'published', number: 4.5, title: 'Fraction', issueUrl: 'issues/issue-45.html' },
    { status: 'published', number: 5, title: '', issueUrl: 'issues/issue-05.html' },
    { status: 'published', number: 5, title: 'Bad route', issueUrl: 'issues/nope.html' },
    { status: 'published', number: 5, title: 'The Fifth Lesson', issueUrl: 'issues/issue-05.html' }
  ] };
  const finishLatest = async () => { resolveFetch({ ok: true, json: async () => published }); await Promise.resolve(); await Promise.resolve(); };
  const resume = () => window.svShowResume('Episode 03 · The Burn Book Problem', '/watch.html?ep=03');
  if (latestFirst) { return finishLatest().then(() => ({ intent, latest, current, heading, read, listen, resume, intentTitle, intentSummary })); }
  return Promise.resolve({ intent, latest, current, heading, read, listen, resume, intentTitle, intentSummary, finishLatest });
}

async function currentContinuationOrdering() {
  const source = fs.readFileSync(path.join(ROOT, 'content/site/homepage.js'), 'utf8');
  const early = await pageFixture({ latestFirst: false, source });
  early.resume();
  await early.finishLatest();
  assert.equal(early.intent.href, '/watch.html?ep=03');
  assert.equal(early.intent.getAttribute('aria-label'), null);
  assert.equal(early.intent.getAttribute('data-episode-continuation'), '');
  assert.equal(early.intentTitle.textContent, 'Continue where you left off');

  const late = await pageFixture({ latestFirst: true, source });
  assert.equal(late.intent.href, '/issues/issue-05.html');
  assert.equal(late.current.href, '/issues/issue-05.html');
  assert.equal(late.heading.textContent, 'Episode 05 · The Fifth Lesson');
  late.resume();
  assert.equal(late.intent.href, '/watch.html?ep=03');
  assert.equal(late.intent.getAttribute('aria-label'), null);
  assert.equal(late.intentSummary.textContent, 'Episode 03 · The Burn Book Problem');
}

async function baselineAccessibilityRegression() {
  const source = sourceAt(BASELINE, 'content/site/homepage.js');
  const fixture = await pageFixture({ latestFirst: true, source });
  fixture.resume();
  assert.equal(fixture.intent.href, '/watch.html?ep=03');
  // This is intentionally the pre-fix failure: its visible continuation is announced as Latest Episode.
  assert.equal(fixture.intent.getAttribute('aria-label'), 'Latest Episode: The Fifth Lesson');
}

async function thisWeekRouting() {
  const source = fs.readFileSync(path.join(ROOT, 'this-week.html'), 'utf8');
  const script = source.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
  assert.ok(script, 'this-week redirect script is present');
  const run = async ({ response, search = '' }) => {
    const link = new Element({ href: '/issues/issue-04.html' });
    const replaces = [];
    let timer;
    const context = vm.createContext({
      document: { getElementById: id => id === 'episode' ? link : null },
      fetch: async () => response,
      setTimeout: fn => { timer = fn; return 1; },
      clearTimeout: () => { timer = null; },
      location: { search, replace: href => replaces.push(href) },
      URLSearchParams, Number, String, Error
    });
    vm.runInContext(`(async()=>{${script}})()`, context);
    // The page script starts a promise chain without returning it from its IIFE.
    // Yield macrotasks so the real chain reaches its finally redirect.
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    return { link, replaces, timer };
  };
  const valid = await run({ response: { ok: true, json: async () => ({ episodes: [
    { status: 'published', number: 6, title: 'Six', issueUrl: 'issues/issue-06.html' },
    { status: 'draft', number: 99, title: 'Draft', issueUrl: 'issues/issue-99.html' },
    { status: 'published', number: 7.1, title: 'Bad', issueUrl: 'issues/issue-71.html' }
  ] }) } });
  assert.equal(valid.link.href, '/issues/issue-06.html');
  assert.equal(valid.replaces.join(','), '/issues/issue-06.html');
  const fallback = await run({ response: { ok: false, json: async () => ({}) } });
  assert.equal(fallback.link.href, '/issues/issue-04.html');
  assert.equal(fallback.replaces.join(','), '/issues/issue-04.html');
  const bag = await run({ response: { ok: false, json: async () => ({}) }, search: '?bag=open&issue=03' });
  assert.equal(bag.link.href, '/blend-snap.html?issue=3#the-study-pack');
  assert.equal(bag.replaces.join(','), '/blend-snap.html?issue=3#the-study-pack');
  const legacyBag = await run({ response: { ok: false, json: async () => ({}) }, search: '?bag=open&issue=not-a-number' });
  assert.equal(legacyBag.link.href, '/blend-snap.html#the-study-pack');
  assert.equal(legacyBag.replaces.join(','), '/blend-snap.html#the-study-pack');
}

async function staticRoutes() {
  const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const redirects = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8');
  assert.match(index, /class="express" data-current-episode-link href="\/issues\/issue-04\.html"/);
  assert.doesNotMatch(redirects, /^\/this-week\.html\s/m, 'legacy weekly route must reach its document, not the homepage');
  assert.match(fs.readFileSync(path.join(ROOT, 'this-week.html'), 'utf8'), /id="episode" href="\/issues\/issue-04\.html"/);
  for (const episode of [1, 2, 3, 4]) {
    const issue = fs.readFileSync(path.join(ROOT, `issues/issue-0${episode}.html`), 'utf8');
    assert.match(issue, new RegExp(`href="/blend-snap\\.html\\?issue=${episode}#the-study-pack"`));
    assert.match(issue, new RegExp(`href="/learn/quiz\\.html\\?issue=${episode}#quiz-start"`));
  }
  const blendSnap = fs.readFileSync(path.join(ROOT, 'blend-snap.html'), 'utf8');
  assert.ok(blendSnap.includes('var requestedNumber = /^\\d+$/.test(requested || "") ? Number(requested) : 0;'));
  assert.match(blendSnap, /currentEpisode = sortedEpisodes\.find\(function\(episode\) \{\s*return episode\.number === requestedNumber;\s*\}\) \|\| sortedEpisodes\[0\];/);
  assert.match(blendSnap, /var past = sortedEpisodes\.filter\(function\(episode\) \{ return episode\.number !== currentEpisode\.number; \}\);/);
}

const checks = [];
for (const [name, test] of [
  ['baseline accessible-label regression', baselineAccessibilityRegression],
  ['current continuation ordering and malformed episode filtering', currentContinuationOrdering],
  ['Express fallback and legacy this-week route', thisWeekRouting],
  ['static Express and redirect contract', staticRoutes]
]) {
  await test();
  checks.push({ name, status: 'pass' });
}
const result = { schema: 'laidies.navigation-tests.v1', baseline: BASELINE, checks, passedAt: new Date().toISOString() };
fs.writeFileSync(RESULTS, JSON.stringify(result, null, 2) + '\n');
console.log(`NAVIGATION TEST PASS checks=${checks.length} baseline=${BASELINE}`);
