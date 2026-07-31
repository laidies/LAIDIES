#!/usr/bin/env node
/* Non-public E2 v19 witness v2 browser gate.  It never writes media/VTT. */
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.cwd());
const evidenceDir = path.resolve(import.meta.dirname);
const witness = 'operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2.html';
const mp4 = 'assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4';
const vtt = 'assets/captions/episode-02.vtt';
const expected = {
  mp4: 'e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3',
  vtt: '7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f'
};
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.join(root, '.ds-sync', 'node_modules', 'playwright-core');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, 'index.mjs')));
const mime = { '.html': 'text/html; charset=utf-8', '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8' };
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for (const [name, relative] of Object.entries({ mp4, vtt })) assert.equal(sha256(path.join(root, relative)), expected[name], `${name} frozen hash changed`);

const requested = [];
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
  requested.push(pathname);
  const file = path.resolve(root, pathname.replace(/^\/+/, ''));
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return response.writeHead(404).end('Not found');
  const stat = fs.statSync(file);
  const headers = { 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store', 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' };
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || '');
  if (!range) return fs.createReadStream(file).pipe(response.writeHead(200, { ...headers, 'Content-Length': stat.size }));
  const start = range[1] ? Number(range[1]) : 0;
  const end = Math.min(range[2] ? Number(range[2]) : stat.size - 1, stat.size - 1);
  if (start > end || start >= stat.size) return response.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
  fs.createReadStream(file, { start, end }).pipe(response.writeHead(206, { ...headers, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${stat.size}` }));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const observations = {};

async function open(query = '', options = {}) {
  const context = await browser.newContext({ viewport: options.viewport || { width: 1280, height: 900 } });
  if (options.reducedMotion) await context.addInitScript(() => {
    const original = window.matchMedia;
    window.matchMedia = (query) => query.includes('prefers-reduced-motion') ? { matches: true, media: query, addEventListener() {}, removeEventListener() {} } : original(query);
  });
  const page = await context.newPage();
  await page.goto(`${base}/${witness}${query}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#film').readyState >= 1 || document.querySelector('#retry').hidden === false);
  return { context, page };
}

try {
  const normal = await open();
  await normal.page.waitForFunction(() => document.querySelector('#captionTrack').track && document.querySelector('#captionTrack').track.mode === 'showing');
  await normal.page.waitForFunction(() => document.querySelector('#status').value.includes('captionLoadState=loaded'));
  assert.ok(requested.includes('/assets/captions/episode-02.vtt'), 'exact VTT must be requested during initial captions-on render');
  assert.equal(await normal.page.locator('#captions').getAttribute('aria-pressed'), 'true');
  observations.initial_track_request = 'PASS';

  await normal.page.locator('#play').click();
  await normal.page.waitForFunction(() => document.querySelector('#film').currentTime > 0.15);
  const railText = await normal.page.locator('#captionRail').innerText();
  assert.match(railText, /Previously, on LAiDIES/);
  assert.doesNotMatch(railText, /<\/?v(?:\s|>)/i, 'raw WebVTT voice markup must not reach the rail');
  observations.sanitized_caption_text = 'PASS';

  await normal.page.keyboard.press('Space');
  await normal.page.waitForFunction(() => document.querySelector('#film').paused);
  const beforeSeek = await normal.page.locator('#film').evaluate((node) => node.currentTime);
  await normal.page.keyboard.press('ArrowRight');
  await normal.page.waitForFunction((before) => document.querySelector('#film').currentTime >= before + 4.5, beforeSeek);
  observations.keyboard_play_pause_seek = 'PASS';

  await normal.page.locator('#captions').click();
  assert.equal(await normal.page.locator('#captions').getAttribute('aria-pressed'), 'false');
  assert.equal(await normal.page.locator('#captionRail').innerText(), 'Captions are off.');
  await normal.page.locator('#captions').click();
  await normal.page.waitForFunction(() => document.querySelector('#captionTrack').track.mode === 'showing');
  observations.caption_state_labels = 'PASS';

  await normal.page.locator('#film').evaluate((node) => { node.currentTime = 987; node.dispatchEvent(new Event('timeupdate')); });
  await normal.page.waitForFunction(() => document.querySelector('#captionRail').textContent.includes('audio continues to the end'));
  observations.final_tail = 'PASS';
  await normal.context.close();

  const captionFailure = await open('?failCaptions=1');
  await captionFailure.page.waitForFunction(() => document.querySelector('#status').value.includes('captionLoadState=error'));
  assert.equal(await captionFailure.page.locator('#captions').getAttribute('aria-pressed'), 'true');
  assert.match(await captionFailure.page.locator('#captionRail').innerText(), /failed to load/i);
  observations.caption_failure_truth = 'PASS';
  await captionFailure.context.close();

  const mediaFailure = await open('?failMedia=1');
  await mediaFailure.page.locator('#retry').waitFor();
  assert.match(await mediaFailure.page.locator('#status').inputValue(), /mediaLoadState=error/);
  await mediaFailure.page.locator('#retry').click();
  await mediaFailure.page.waitForFunction(() => document.querySelector('#film').readyState >= 1);
  observations.media_failure_recovery = 'PASS';
  await mediaFailure.context.close();

  const mobile = await open('', { viewport: { width: 320, height: 700 } });
  const geometry = await mobile.page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, videoWidth: document.querySelector('#film').clientWidth, railWidth: document.querySelector('#captionRail').clientWidth }));
  assert.equal(geometry.scrollWidth, geometry.clientWidth, JSON.stringify(geometry));
  assert.ok(geometry.videoWidth <= 288 && geometry.railWidth <= 288, JSON.stringify(geometry));
  observations.mobile_reflow = { result: 'PASS', geometry };
  await mobile.context.close();

  const reduced = await open('', { reducedMotion: true });
  assert.match(await reduced.page.locator('#status').inputValue(), /reducedMotion=true/);
  const css = await reduced.page.locator('body').evaluate((node) => getComputedStyle(node).scrollBehavior);
  assert.equal(css, 'auto');
  observations.reduced_motion = 'PASS';
  await reduced.context.close();

  for (const [name, relative] of Object.entries({ mp4, vtt })) assert.equal(sha256(path.join(root, relative)), expected[name], `${name} frozen hash changed during test`);
  const result = {
    schema: 'laidies.e2-v19.player-witness-v2-maker-test.v1',
    status: 'PASS — technical maker evidence only; no human full audible listen claimed',
    frozen: { mp4: expected.mp4, vtt: expected.vtt },
    witness_surface: witness,
    observations,
    remaining_independent_boundary: 'Episode Media Quality must obtain and record a complete external human 1× unmuted listen before acceptance.'
  };
  fs.writeFileSync(path.join(evidenceDir, 'automated-result.json'), `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
