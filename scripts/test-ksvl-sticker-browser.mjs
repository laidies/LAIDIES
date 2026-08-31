import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(process.env.RESIDENT_CARD_ROOT||process.cwd());
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
const server=http.createServer((req,res)=>{
  let file=path.join(root,new URL(req.url,'http://localhost').pathname);
  if(!path.extname(file))file+='.html';
  if(!file.startsWith(root+'/')||!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('content-type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=process.env.RESIDENT_TEST_ORIGIN||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
async function context(width){const ctx=await browser.newContext({viewport:{width,height:900}});await ctx.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());return ctx;}
let count=0;
try{
  for(const width of [1280,390,320]){
    const ctx=await context(width),page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
    await page.goto(origin+'/radio#hub-stickers',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>window.KSVL_stickers&&window.LAIDIESResidentContinuationV1);
    assert.equal(await page.locator('#ksvl-stickers-grid button').count(),14,'declarations must be keyboard buttons');
    assert.equal(await page.locator('#ksvl-stickers-grid .ksvl-sticker-tile').count(),20);
    for(const slug of ['ksvl-community-raidio','band-the-laidies','band-the-recalls']) await page.locator(`button[data-slug="${slug}"]`).press('Space');
    await page.locator('#ksvl-stickers-confirm').click();
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('laidies_ksvl_sticker_picks_v1')||'null')?.slugs.length===3);
    assert.equal(await page.locator('#ksvl-stickers-grid button').count(),0);
    assert.equal(await page.evaluate(()=>window.KSVL_stickers.earn('ksvl-encore')),false,'no invented listening achievements');
    await page.goto(origin+'/laidies-card#ksvlClosetStickers',{waitUntil:'domcontentloaded'});
    await page.locator('#ksvlClosetStickers').waitFor({state:'visible'});
    assert.equal(await page.locator('#ksvlClosetStickerGrid img').count(),3);
    await page.locator('#ksvlClosetStickerGrid').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>Array.from(document.querySelectorAll('#ksvlClosetStickerGrid img')).every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(await page.locator('#ksvlClosetStickerGrid img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)),true,'real sticker pixels must load');
    await page.getByRole('button',{name:'Remove THE LAiDIES',exact:true}).click();
    await page.waitForFunction(()=>document.querySelectorAll('#ksvlClosetStickerGrid img').length===2);
    const doc=await page.evaluate(()=>window.LAIDIESResidentContinuationV1.collectLocal());
    const phone=await context(width),fresh=await phone.newPage();
    await fresh.goto(origin+'/laidies-card',{waitUntil:'domcontentloaded'});
    await fresh.waitForFunction(()=>window.LAIDIESResidentContinuationV1&&window.KSVL_stickers);
    await fresh.evaluate(d=>window.LAIDIESResidentContinuationV1.applyDocument(d),doc);
    assert.equal(await fresh.locator('#ksvlClosetStickerGrid img').count(),2,'restored picks visible without reload');
    await fresh.evaluate(()=>{const a=window.LAIDIESResidentContinuationV1;a.clearSupportedLocalState();a.applyDocument(a.emptyDocument());});
    assert.equal(await fresh.locator('#ksvlClosetStickerGrid img').count(),0,'account clear removes picks');
    await page.goto(origin+'/laidies-card?u=someone-else',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#ksvlClosetStickers').isVisible(),false,'public profile cannot show private picks');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width}`);
    assert.deepEqual(errors,[]);
    await phone.close();await ctx.close();count++;
  }
  const denied=await context(390),p=await denied.newPage();
  await p.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='laidies_ksvl_sticker_picks_v1')throw new Error('denied');return original.call(this,k,v);};});
  await p.goto(origin+'/radio#hub-stickers',{waitUntil:'domcontentloaded'});
  await p.locator('button[data-slug="band-the-laidies"]').click();await p.locator('#ksvl-stickers-confirm').click();
  assert.match(await p.locator('#ksvl-stickers-status').innerText(),/Could not confirm/);
  assert.equal(await p.evaluate(()=>localStorage.getItem('laidies_ksvl_sticker_picks_v1')),null);
  await denied.close();
  console.log(`KSVL STICKER BROWSER PASS ${count} widths keyboard/pick/Closet/remove/restore/isolation plus storage denial`);
}finally{await browser.close();await new Promise(r=>server.close(r));}
