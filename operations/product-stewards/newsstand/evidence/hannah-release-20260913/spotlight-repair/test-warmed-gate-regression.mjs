import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';

const root = process.cwd();
const base = `${root}/operations/product-stewards/newsstand/candidates/hannah-fry-profile-20260911/live-base-20260913`;
const integration = `${root}/operations/product-stewards/newsstand/candidates/hannah-fry-profile-20260911/integration-20260913`;
const origin = 'https://31128083.laidies-sunnyvaile.pages.dev';
const liveNewsstand = await (await fetch(`${origin}/newsstand.html`)).text();
const localNewsstand = fs.readFileSync(`${root}/newsstand.html`, 'utf8');
const oldFingerprint = liveNewsstand.match(/luminairy-claim-gate\.js\?v=([^\"']+)/)?.[1];
const freshFingerprint = localNewsstand.match(/luminairy-claim-gate\.js\?v=([^\"']+)/)?.[1];
assert.equal(oldFingerprint, '20260902-1');
assert.ok(freshFingerprint && freshFingerprint !== oldFingerprint);
const freshNewsstand = liveNewsstand.replace(`luminairy-claim-gate.js?v=${oldFingerprint}`, `luminairy-claim-gate.js?v=${freshFingerprint}`);
const oldGate = fs.readFileSync(`${base}/content/site/luminairy-claim-gate.js`, 'utf8');
const newGate = fs.readFileSync(`${integration}/content/site/luminairy-claim-gate.js`, 'utf8');
const profileBytes = JSON.parse(await (await fetch(`${origin}/content/luminairy-profiles.json`)).text());
const results = [];
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
try {
  for (const fixture of [
    { name: 'warmed-old-gate', html: liveNewsstand, gate: oldGate, expectedState: 'unavailable' },
    { name: 'fresh-r7-gate', html: freshNewsstand, gate: newGate, expectedState: 'ready' }
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.route(`${origin}/newsstand.html`, route => route.fulfill({ status: 200, contentType: 'text/html', body: fixture.html }));
    await page.route(/luminairy-claim-gate\.js\?v=/, route => route.fulfill({ status: 200, contentType: 'application/javascript', body: fixture.gate }));
    await page.goto(`${origin}/newsstand.html`, { waitUntil: 'networkidle' });
    await page.locator('#ns-luminairy').waitFor();
    await page.waitForFunction(expected => document.querySelector('#ns-luminairy')?.dataset.state === expected, fixture.expectedState);
    const state = await page.locator('#ns-luminairy').getAttribute('data-state');
    const status = await page.locator('#ns-luminairy [role="status"]').innerText();
    const admitted = await page.evaluate(async () => {
      const data = await fetch('/content/luminairy-profiles.json', { cache: 'no-store' }).then(r => r.json());
      try { const admitted = await window.LAIDIES_LUMINAIRY_CLAIM_GATE.admit(data); return { result: 'admitted', count: ['saints', 'mavens', 'trailblazers'].flatMap(wing => admitted[wing]).length }; }
      catch (error) { return { result: 'held', error: String(error.message || error) }; }
    });
    if (fixture.name === 'warmed-old-gate') {
      assert.equal(state, 'unavailable');
      assert.match(status, /couldn’t open this week’s spotlight/i);
      assert.equal(admitted.result, 'held');
    } else {
      assert.equal(state, 'ready');
      assert.equal(admitted.result, 'admitted');
      assert.equal(admitted.count, 43);
      assert.equal(profileBytes.mavens.filter(profile => profile.id !== 'hannah-fry').length, 22);
    }
    results.push({ name: fixture.name, state, status, gateAdmission: admitted, preservedNonHannahMavens: fixture.name === 'fresh-r7-gate' ? 22 : null });
    await page.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify({ origin, liveGateReference: oldFingerprint, freshGateReference: freshFingerprint, results }, null, 2));
