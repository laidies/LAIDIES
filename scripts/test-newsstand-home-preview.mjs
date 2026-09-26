#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
const feed=JSON.parse(fs.readFileSync(new URL('../content/newsstand-public-feed.json',import.meta.url))),script=fs.readFileSync(new URL('../content/site/newsstand-home-preview-v1.js',import.meta.url),'utf8');
assert(feed.dailyActivity,'test requires an admitted current activity');
const now=Date.parse(feed.generatedAt)+60000, browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try {
  for(const scenario of ['current','stale-feed','yesterday','held','missing','external-url','wrong-destination','failed-fetch']) {
    const page=await browser.newPage(), sample=structuredClone(feed);
    await page.addInitScript(({now})=>{const RealDate=Date;globalThis.Date=class extends RealDate{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}};},{now});
    if(scenario==='stale-feed')sample.expiresAt=new Date(now-1).toISOString();
    if(scenario==='yesterday')sample.dailyActivity.editionDate='2026-01-01';
    if(scenario==='held')sample.dailyActivity.status='hold';
    if(scenario==='missing')sample.dailyActivity=null;
    if(scenario==='wrong-destination')sample.dailyActivity.url='/newsstand?daily='+sample.dailyActivity.editionDate;
    if(scenario==='external-url')sample.dailyActivity.url='https://example.com/';
    await page.route('https://preview.test/',r=>r.fulfill({contentType:'text/html',body:'<section id="today"><div><h2>Existing entry choices</h2></div><div class="intent-grid"><a href="/newsstand">NewsStand</a></div></section><script src="/preview.js"></script>'}));
    await page.route('**/preview.js',r=>r.fulfill({body:script,contentType:'text/javascript'}));
    await page.route('**/content/newsstand-public-feed.json',r=>scenario==='failed-fetch'?r.fulfill({status:503,body:'Unavailable'}):r.fulfill({contentType:'application/json',body:JSON.stringify(sample)}));
    await page.goto('https://preview.test/',{waitUntil:'networkidle'});
    assert.equal(await page.locator('[data-daily-activity-preview]').count(),scenario==='current'?1:0,scenario);
    assert.equal(await page.locator('.intent-grid a').count(),1,'existing door retained');
    if(scenario==='current') {
      assert.equal(await page.locator('.ns-home-activity__copy').textContent(),feed.dailyActivity.text);
      assert.equal(await page.locator('.ns-home-activity a').getAttribute('href'),feed.dailyActivity.url);
      assert(await page.locator('.intent-grid').evaluate(n=>Boolean(n.nextElementSibling?.hasAttribute('data-daily-activity-preview'))),'entry choices precede optional activity');
      await page.evaluate(()=>{Date.now=()=>Number.MAX_SAFE_INTEGER;window.dispatchEvent(new Event('focus'));});
      assert.equal(await page.locator('[data-daily-activity-preview]').count(),0,'stale open tab removes note');
    }
    assert.equal(await page.evaluate(()=>localStorage.length),0,'preview stores no reader activity');
    await page.close();
  }
  const real=await browser.newPage({viewport:{width:390,height:844}});
  await real.route('https://laidies.ai/',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('</body>','<script src="/content/site/newsstand-home-preview-v1.js"></script></body>')});});
  await real.route('**/content/site/newsstand-home-preview-v1.js',r=>r.fulfill({body:script,contentType:'text/javascript'}));
  await real.route('**/content/newsstand-public-feed.json',r=>r.fulfill({body:JSON.stringify(feed),contentType:'application/json'}));
  await real.goto('https://laidies.ai/',{waitUntil:'domcontentloaded'});
  await real.locator('.ns-home-activity a').click();
  await real.locator('[data-paper="service"] .ns-service-article').waitFor();
  assert.equal(await real.locator('.ns-service-article').getAttribute('data-column-id'),feed.dailyActivity.id,'Homepage opens the exact advertised activity');
  await real.close();
  console.log('Homepage Daily activity: exact text, link, hierarchy, seven failure states, stale-tab removal and no tracking passed.');
} finally { await browser.close(); }
