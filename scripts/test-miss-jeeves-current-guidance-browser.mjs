#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || path.join(root, 'node_modules/playwright-core');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, 'index.mjs')));
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'], ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'], ['.jpg', 'image/jpeg'], ['.webp', 'image/webp'], ['.svg', 'image/svg+xml']
]);
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const relative = url.pathname === '/' ? 'library.html' : url.pathname.replace(/^\/+/, '');
  let file = path.resolve(root, relative);
  if (!path.extname(file) && fs.existsSync(`${file}.html`)) file += '.html';
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404).end('Not found'); return;
  }
  response.writeHead(200, { 'content-type': mime.get(path.extname(file)) || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const answer = 'Start with the task and the sensitivity of the data. Then compare the current product documentation before choosing.';
const citedText = 'current product documentation';
const start = answer.indexOf(citedText);
const payload = {
  status: 'ok', coverage: 'current', mode: 'catalogue-plus-current-guidance', topic_id: 'tools-model-selection', answer,
  current_guidance: {
    checked_at: '2026-09-04T20:00:00.000Z', model: 'openai/gpt-5.4-mini',
    citations: [{ start_index: start, end_index: start + citedText.length, url: 'https://developers.openai.com/api/docs/models', title: 'OpenAI models' }],
    sources: [{ title: 'OpenAI models', url: 'https://developers.openai.com/api/docs/models', domain: 'developers.openai.com' }]
  },
  results: [{ id: 'book-section-working-with-ai-101-chapter-7', parentId: 'working-with-ai-101', title: 'Choosing an AI tool', url: '/library.html#working-with-ai-101::Choosing%20an%20AI%20tool', type: '101', section: 'The 101s', summary: 'A practical LAiDIES guide to matching the tool to the job.', learnerJob: 'understand', topics: ['tools'] }]
};
const evidenceDir = '/tmp/laidies-miss-jeeves-current-guidance-evidence';
fs.mkdirSync(evidenceDir, { recursive: true });

try {
  for (const width of [390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.route('**/*', route => {
      const request = route.request();
      if (request.url() === `${origin}/api/miss-jeeves` && request.method() === 'POST') {
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(payload) }); return;
      }
      request.url().startsWith(origin) ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    await page.goto(`${origin}/library.html#miss-jeeves`, { waitUntil: 'domcontentloaded' });
    await page.locator('#jv-q').fill('Which AI should I use for spreadsheets?');
    await page.locator('.jv-form button').click();
    await page.locator('.jv-current-sources').waitFor();
    assert.equal(await page.locator('.jv-inline-citation').textContent(), citedText);
    assert.equal(await page.locator('.jv-inline-citation').getAttribute('href'), 'https://developers.openai.com/api/docs/models');
    assert.match(await page.locator('.jv-current-meta').textContent(), /Current guidance/i);
    assert.match(await page.locator('.jv-current-sources').textContent(), /OpenAI models/);
    assert.match(await page.locator('.jv-answer-links').textContent(), /From LAiDIES/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 1, `${width}px has ${overflow}px horizontal overflow`);
    assert.deepEqual(errors, []);
    await page.locator('#miss-jeeves').screenshot({ path: path.join(evidenceDir, `${width}px.png`) });
    await context.close();
  }
  console.log('MISS JEEVES CURRENT GUIDANCE UI PASS citations=clickable sources=visible laidies_routes=separate desktop=1280 phone=390 overflow=0');
} finally {
  await browser.close();
  server.close();
}
