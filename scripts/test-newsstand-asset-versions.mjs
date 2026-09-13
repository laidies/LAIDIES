import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { checkNewsstandAssetVersions, NEWSSTAND_VERSIONED_ASSETS as assets } from './lib/newsstand-asset-versions.mjs';

const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const old = ['h1{text-transform:uppercase}', 'h1{font-size:44px}', 'window.fixtureEdition="old";', 'window.fixtureSelection="old";', 'window.fixtureCatchup="old";', 'window.fixtureGate="old";'];
const current = ['h1{text-transform:none}', 'h1{font-size:28px}', 'window.fixtureEdition="current";', 'window.fixtureSelection="current";', 'window.fixtureCatchup="current";', 'window.fixtureGate="current";'];
const html = versioned => `<html><head>${assets.map((file, index) => {
  const url = `/${file}?v=${versioned ? sha(current[index]).slice(0, 16) : 'old-fixed-version'}`;
  return file.endsWith('.css') ? `<link rel="stylesheet" href="${url}">` : `<script src="${url}"></script>`;
}).join('')}</head><body><h1>A current headline</h1></body></html>`;
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-cache-'));
const record = (file, bytes) => ({ path: file, bytes: Buffer.byteLength(bytes), sha256: sha(bytes) });
const candidate = { artifactDirectory: temp, files: [...assets.map((file, i) => record(file, current[i])), record('newsstand.html', html(true))] };
try {
  fs.writeFileSync(path.join(temp, 'newsstand.html'), html(true));
  checkNewsstandAssetVersions(candidate, assets);
  fs.writeFileSync(path.join(temp, 'newsstand.html'), html(false));
  const stale = { ...candidate, files: [...candidate.files.filter(f => f.path !== 'newsstand.html'), record('newsstand.html', html(false))] };
  for (const asset of assets) assert.throws(() => checkNewsstandAssetVersions(stale, [asset]), /stale NewsStand asset URL/);
  assert.throws(() => checkNewsstandAssetVersions(candidate, assets), /differs from its manifest/);
  fs.unlinkSync(path.join(temp, 'newsstand.html'));
  assert.throws(() => checkNewsstandAssetVersions(candidate, assets), /exact newsstand.html artifact/);

  const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs');
  let released = false;
  const requests = [];
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const index = assets.indexOf(url.pathname.slice(1));
    if (index >= 0) {
      requests.push(url.pathname + url.search);
      response.writeHead(200, { 'content-type': index < 2 ? 'text/css' : 'text/javascript', 'cache-control': 'public, max-age=14400, must-revalidate' });
      response.end((released ? current : old)[index]);
    } else {
      response.writeHead(200, { 'content-type': 'text/html', 'cache-control': 'no-store' });
      response.end(html(released && url.pathname === '/fixed'));
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
    const page = await browser.newPage();
    const base = `http://127.0.0.1:${server.address().port}`;
    await page.goto(base + '/warm');
    assert.equal(await page.evaluate(() => window.fixtureEdition), 'old');
    released = true;
    await page.goto(base + '/unchanged-url');
    assert.equal(await page.evaluate(() => window.fixtureEdition), 'old', 'negative control must retain the cached edition');
    assert.equal(await page.locator('h1').evaluate(n => getComputedStyle(n).textTransform), 'uppercase');
    assert.equal(await page.evaluate(() => window.fixtureGate), 'old', 'unchanged gate URL keeps outdated trust cached');
    await page.goto(base + '/fixed');
    assert.equal(await page.evaluate(() => window.fixtureEdition), 'current');
    assert.equal(await page.locator('h1').evaluate(n => getComputedStyle(n).textTransform), 'none');
    assert.equal(await page.locator('h1').evaluate(n => getComputedStyle(n).fontSize), '28px');
    assert.deepEqual(await page.evaluate(() => [window.fixtureSelection, window.fixtureCatchup, window.fixtureGate]), ['current', 'current', 'current']);
    assert.equal(requests.length, assets.length * 2, 'old URLs remain cached; each new fingerprint requests its current asset once');
    console.log('NEWSSTAND ASSET CACHE PASS: six stale URLs rejected; forged/missing HTML rejected; real warm-cache negative control stayed old; fingerprinted CSS, story, selection catch-up and admission gate scripts refreshed without clearing cache.');
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
