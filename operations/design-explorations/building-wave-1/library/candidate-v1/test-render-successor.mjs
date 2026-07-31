import { chromium } from '../../../../../../operations/tools/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';

const url = 'http://127.0.0.1:4179/operations/design-explorations/building-wave-1/library/candidate-v1/';
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ headless: true, executablePath });
const results = { viewports: [], flows: {} };
const check = (condition, message) => { if (!condition) throw new Error(message); };

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 800 }]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => ({
    innerWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)
  }));
  check(metrics.documentScrollWidth === viewport.width, `${viewport.width}: document overflow ${metrics.documentScrollWidth}`);
  check(metrics.bodyScrollWidth === viewport.width, `${viewport.width}: body overflow ${metrics.bodyScrollWidth}`);
  check(metrics.brokenImages.length === 0, `${viewport.width}: broken images`);
  await page.screenshot({ path: `evidence/successor-render-${viewport.width}x${viewport.height}.png`, fullPage: true });
  results.viewports.push({ ...viewport, ...metrics });
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const vocab = page.getByRole('tab', { name: 'Vocab' });
  await vocab.focus();
  await vocab.press('ArrowRight');
  check(await page.getByRole('tab', { name: 'Concepts' }).getAttribute('aria-selected') === 'true', 'ArrowRight did not select Concepts');
  await page.getByRole('tab', { name: 'Concepts' }).press('End');
  check(await page.getByRole('tab', { name: 'Tools' }).getAttribute('aria-selected') === 'true', 'End did not select Tools');
  await page.getByRole('tab', { name: 'Tools' }).press('Home');
  check(await vocab.getAttribute('aria-selected') === 'true', 'Home did not select Vocab');
  await vocab.press('ArrowLeft');
  check(await page.getByRole('tab', { name: 'Tools' }).getAttribute('aria-selected') === 'true', 'ArrowLeft did not wrap to Tools');

  await vocab.click();
  await page.getByRole('button', { name: /Vocab 101.*Available review fixture/ }).click();
  check(await page.getByRole('button', { name: 'Return to shelf' }).evaluate(element => element === document.activeElement), 'reader focus did not start on Return');
  await page.getByRole('button', { name: /Put this place/ }).click();
  check((await page.locator('#save-status').textContent()).includes('only in this browser'), 'local save scope missing');
  await page.getByRole('button', { name: 'Resume exact place' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Remove from Puffy' }).click();
  check((await page.locator('#pouch').textContent()).includes('No saved place yet'), 'Puffy remove failed');

  await page.getByRole('tab', { name: 'Concepts' }).click();
  await page.getByRole('button', { name: /Concepts 101.*hold: cannot open/ }).click();
  check((await page.locator('#reader-book-title').textContent()).includes('hold'), 'held state did not render');
  check(await page.locator('#save-puffy').isHidden(), 'held state exposed save');

  await page.locator('#jeeves-question').fill('What is a prompt?');
  await page.getByRole('button', { name: 'Ask' }).click();
  check((await page.locator('#jeeves-answer').textContent()).includes('A starting place'), 'Jeeves answer missing');
  await page.getByRole('button', { name: 'See the honest unavailable state' }).click();
  check((await page.locator('#jeeves-answer').textContent()).includes('unavailable right now'), 'Jeeves failure missing');
  results.flows.keyboardHeldPuffyJeeves = 'PASS';
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Denied', 'SecurityError'); }; });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Vocab 101.*Available review fixture/ }).click();
  await page.getByRole('button', { name: /Put this place/ }).click();
  check((await page.locator('#save-status').textContent()).includes('Nothing was saved'), 'storage denial painted success');
  results.flows.storageDenied = 'PASS';
  await context.close();
}

{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  check((await page.locator('.nojs-shelf').textContent()).includes('held or preview'), 'no-JS truthful shelf missing');
  const metrics = await page.evaluate(() => ({ documentScrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth }));
  check(metrics.documentScrollWidth === 320 && metrics.bodyScrollWidth === 320, `no-JS overflow ${JSON.stringify(metrics)}`);
  await page.screenshot({ path: 'evidence/successor-render-320x800-nojs.png', fullPage: true });
  results.flows.noJS = 'PASS';
  await context.close();
}

await browser.close();
writeFileSync('evidence/successor-browser-result.json', `${JSON.stringify(results, null, 2)}\n`);
console.log('LIBRARY CANDIDATE SUCCESSOR BROWSER PASS', JSON.stringify(results));
