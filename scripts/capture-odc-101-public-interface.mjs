#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const outputDir = path.join(
  root,
  'operations/classes/media/odc-101-interface-capture-2026-08-02'
);
const playwrightRoot = process.env.HIGH_PLAYWRIGHT_ROOT || path.join(root, '.ds-sync');
const playwrightModule = path.join(playwrightRoot, 'node_modules/playwright-core/index.mjs');
const { chromium } = await import(pathToFileURL(playwrightModule).href);
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: chrome });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'light',
  locale: 'en-CA',
  timezoneId: 'America/Vancouver'
});

const page = await context.newPage();
const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});

const targets = [
  {
    id: 'chatgpt-public-home',
    url: 'https://chatgpt.com/',
    titlePattern: /ChatGPT/i,
    screenshot: 'chatgpt-public-home-1440x900.png'
  },
  {
    id: 'openai-chatgpt-search-help',
    url: 'https://help.openai.com/en/articles/9237897-chatgpt-search',
    titlePattern: /ChatGPT search/i,
    screenshot: 'openai-chatgpt-search-help-1440x900.png'
  }
];

const observations = [];
for (const target of targets) {
  const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(2_000);
  const title = await page.title();
  const finalUrl = page.url();
  await page.screenshot({ path: path.join(outputDir, target.screenshot), fullPage: false });
  observations.push({
    id: target.id,
    requested_url: target.url,
    final_url: finalUrl,
    status: response?.status() ?? null,
    title,
    title_matches_expected_surface: target.titlePattern.test(title),
    captured_at: new Date().toISOString(),
    screenshot: target.screenshot
  });
}

await fs.writeFile(
  path.join(outputDir, 'capture-receipt.json'),
  JSON.stringify({
    schema_version: 1,
    purpose: 'Fresh non-personal public-interface evidence for ODC-101 teaching-media production.',
    privacy_boundary: 'Fresh browser context; no stored profile, account, credentials, prompts, uploads or private data.',
    observations,
    console_errors: consoleErrors
  }, null, 2) + '\n'
);

await browser.close();

if (observations.some((item) => item.status !== 200 || !item.title_matches_expected_surface)) {
  console.error(JSON.stringify(observations, null, 2));
  process.exitCode = 1;
} else {
  console.log(`Captured ${observations.length} fresh public surfaces in ${outputDir}`);
}
