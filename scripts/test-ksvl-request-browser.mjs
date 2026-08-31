import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(process.env.RESIDENT_CARD_ROOT||process.cwd());
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
// Component browser test: exact Radio DOM/CSS and request client, with unrelated
// scripts removed. Real full-page/provider journeys use test-ksvl-service-live.
const server=http.createServer((req,res)=>{let file=path.join(root,new URL(req.url,'http://localhost').pathname);if(!path.extname(file))file+='.html';if(!file.startsWith(root+'/')||!fs.existsSync(file)){res.writeHead(404).end();return;}res.setHeader('content-type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream');let bytes=fs.readFileSync(file);if(file.endsWith('/radio.html'))bytes=bytes.toString().replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,s=>s.includes('ksvl-requests-v1.js')?s:'');res.end(bytes);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 for(const width of [1280,390,320]) {
  const ctx=await browser.newContext({viewport:{width,height:900}});await ctx.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
  const page=await ctx.newPage();await page.addInitScript(()=>{window.LAIDIESResidentAccountRuntime={get:async()=>{throw Error('synthetic offline');}};});
  await page.goto(origin+'/radio');await page.evaluate(()=>{document.querySelector('#hub-request').hidden=false;});
  await page.locator('#ksvl-req-style').selectOption('coffeehouse-acoustic');await page.locator('#ksvl-req-topic').fill('An offline draft');await page.locator('#ksvl-req-lyrics').fill('First line\nSecond line');
  assert.equal(await page.locator('#ksvl-req-topic-count').innerText(),'16 / 200');
  await page.locator('#ksvl-req-save-draft').click();await page.getByText('Draft saved only on this device for seven days. It has not been sent or reviewed.',{exact:true}).waitFor();
  await page.reload();await page.evaluate(()=>{document.querySelector('#hub-request').hidden=false;});
  await page.waitForFunction(()=>document.querySelector('#ksvl-req-topic').value==='An offline draft');
  assert.equal(await page.locator('#ksvl-req-lyrics').inputValue(),'First line\nSecond line');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'request overflow '+width);
  const size=await page.locator('#ksvl-req-save-draft').boundingBox();assert.ok(size.height>=44,'touch target');
  await page.locator('#ksvl-req-clear-draft').click();assert.equal(await page.locator('#ksvl-req-topic').inputValue(),'');
  assert.equal(await page.locator('#ksvl-req-topic-count').innerText(),'0 / 200');
  await page.evaluate(()=>{Storage.prototype.setItem=function(){throw Error('denied');};});
  await page.locator('#ksvl-req-style').selectOption('coffeehouse-acoustic');await page.locator('#ksvl-req-topic').fill('Denied draft');await page.locator('#ksvl-req-save-draft').click();
  await page.getByText('This browser could not save the draft. Nothing was sent; copy your text before leaving.',{exact:true}).waitFor();
  assert.equal(await page.locator('#ksvl-req-topic').inputValue(),'Denied draft');
  await ctx.close();console.log('REQUEST COMPONENT BROWSER PASS '+width+' offline save/restore/clear/counters/storage-denial/touch/overflow');
 }
}finally{await browser.close();await new Promise(r=>server.close(r));}
