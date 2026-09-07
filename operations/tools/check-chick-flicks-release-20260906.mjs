import { chromium } from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
const base=process.argv[2];
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
 for(const width of [1440,390,320]){
  const p=await browser.newPage({viewport:{width,height:1000}});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/chick-flicks.html',{waitUntil:'networkidle'});
  assert.equal(await p.locator('.cf-tape').count(),8);
  assert.equal(await p.locator('.cf-tape--coming a').count(),0);
  assert.equal(await p.locator('.cf-tape--coming').count(),3);
  await p.evaluate(()=>document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager'));
  await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
  assert.deepEqual(await p.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src)),[]);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  for(const n of ['01','02','03','04']){
   const t=p.locator('.cf-tape[href="#episode-'+n+'"]');await t.click();
   assert.equal(await p.locator('#cf-episode-dialog').evaluate(d=>d.open),true);
   const panel=p.locator('#episode-'+n);assert.ok(await panel.isVisible());
   for(const name of ['Read','Listen','Watch'])assert.equal(await panel.getByRole('link',{name,exact:true}).count(),1);
   await p.keyboard.press('Escape');assert.equal(await p.locator('#cf-episode-dialog').evaluate(d=>d.open),false);
   assert.equal(await t.evaluate(e=>e===document.activeElement),true);
  }
  await p.goto(base+'/chick-flicks.html#episode-04',{waitUntil:'networkidle'});
  assert.equal(await p.locator('#cf-episode-dialog').evaluate(d=>d.open),true);
  await p.keyboard.press('Escape');
  await p.screenshot({path:'/private/tmp/chick-flicks-release-'+width+'.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS shelf, images, modal 01–04, actions, Escape/focus, direct link, overflow, script errors: '+width);
  await p.close();
 }
}finally{await browser.close();}
