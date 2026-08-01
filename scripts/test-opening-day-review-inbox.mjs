#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.join(root, '.ds-sync/node_modules/playwright-core');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, 'index.mjs')));
const evidenceDir = path.join(root, 'operations/control-room/evidence/opening-day-media-review-2026-07-31');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.vtt': 'text/vtt; charset=utf-8'
};

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relative = pathname === '/' ? 'operations/control-room/review-inbox.html' : pathname.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404).end('Not found');
    return;
  }
  const stat = fs.statSync(file);
  const headers = {
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store',
    'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream'
  };
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || '');
  if (match) {
    const start = match[1] ? Number(match[1]) : 0;
    const end = Math.min(match[2] ? Number(match[2]) : stat.size - 1, stat.size - 1);
    if (start > end || start >= stat.size) {
      response.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
      return;
    }
    response.writeHead(206, {
      ...headers,
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`
    });
    fs.createReadStream(file, { start, end }).pipe(response);
    return;
  }
  response.writeHead(200, { ...headers, 'Content-Length': stat.size });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const results = [];

async function noOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  assert.ok(metrics.document <= metrics.viewport + 1, `${label}: document overflow ${JSON.stringify(metrics)}`);
  assert.ok(metrics.body <= metrics.viewport + 1, `${label}: body overflow ${JSON.stringify(metrics)}`);
}

try {
  fs.mkdirSync(evidenceDir, { recursive: true });
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 950 } });
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(`${base}/operations/control-room/review-inbox.html`, { waitUntil: 'domcontentloaded' });
    await page.locator('#tabs button').first().waitFor();
    assert.equal(await page.locator('#tabs button').count(), 5, `${width}px: five-title review queue missing`);
    assert.equal(await page.locator('#readyCount').textContent(), '0/5 release-ready');
    assert.equal(await page.locator('#title').textContent(), 'Episode 01 — On Wednesdays We Do AI');
    await page.locator('#player').evaluate((video) => new Promise((resolve, reject) => {
      if (video.readyState >= 1) return resolve();
      video.addEventListener('loadedmetadata', resolve, { once: true });
      video.addEventListener('error', () => reject(new Error('Episode 01 metadata failed')), { once: true });
    }));
    const media = await page.locator('#player').evaluate((video) => ({
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight,
      tracks: video.querySelectorAll('track[kind="captions"]').length
    }));
    assert.ok(media.duration > 1000, `${width}px: wrong Episode 01 duration ${media.duration}`);
    assert.equal(media.width, 1920, `${width}px: wrong video width`);
    assert.equal(media.height, 1080, `${width}px: wrong video height`);
    assert.equal(media.tracks, 1, `${width}px: caption track missing`);
    await noOverflow(page, `${width}px review inbox`);

    await page.selectOption('#decision', 'HOLD');
    await page.fill('#notes', '00:42 — test time-coded note');
    await page.click('#save');
    await page.locator('#saved').waitFor();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('#tabs button').first().waitFor();
    assert.equal(await page.locator('#decision').inputValue(), 'HOLD', `${width}px: decision did not restore`);
    assert.equal(await page.locator('#notes').inputValue(), '00:42 — test time-coded note', `${width}px: note did not restore`);

    await page.locator('#tabs button').filter({ hasText: 'Episode 04' }).click();
    assert.equal(await page.locator('#status').textContent(), 'REBUILD REQUIRED');
    await page.screenshot({
      path: path.join(evidenceDir, width === 390 ? 'review-inbox-mobile.png' : 'review-inbox-desktop.png'),
      fullPage: true
    });
    assert.deepEqual(pageErrors, [], `${width}px: page errors ${pageErrors.join('; ')}`);
    results.push(`${width}px: exact Episode 01 metadata/captions, saved review restore, Episode 04 hold and no overflow`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`OPENING MEDIA REVIEW INBOX: PASS (${results.length}/2)`);
for (const result of results) console.log(`- ${result}`);
