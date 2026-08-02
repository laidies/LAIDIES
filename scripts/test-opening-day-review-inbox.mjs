#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root=process.cwd();
const playwrightRoot=process.env.PLAYWRIGHT_CORE_PATH||path.join(root,'.ds-sync/node_modules/playwright-core');
const chrome=process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const {chromium}=await import(pathToFileURL(path.join(playwrightRoot,'index.mjs')));
const evidenceDir=path.join(root,'operations/control-room/evidence/owner-review-inbox-2026-08-01');
const types={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8'};

const server=http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  const relative=pathname==='/'?'operations/control-room/review-inbox.html':pathname.replace(/^\/+/, '');
  const file=path.resolve(root,relative);
  if(!file.startsWith(`${root}${path.sep}`)||!fs.existsSync(file)||!fs.statSync(file).isFile()){response.writeHead(404).end('Not found');return}
  const stat=fs.statSync(file);const headers={'Accept-Ranges':'bytes','Cache-Control':'no-store','Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream'};
  const match=/^bytes=(\d*)-(\d*)$/.exec(request.headers.range||'');
  if(match){const start=match[1]?Number(match[1]):0;const end=Math.min(match[2]?Number(match[2]):stat.size-1,stat.size-1);response.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${stat.size}`});fs.createReadStream(file,{start,end}).pipe(response);return}
  response.writeHead(200,{...headers,'Content-Length':stat.size});fs.createReadStream(file).pipe(response);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;const browser=await chromium.launch({executablePath:chrome,headless:true});
try{
  fs.mkdirSync(evidenceDir,{recursive:true});
  for(const width of [390,1280]){
    const page=await browser.newPage({viewport:{width,height:950}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`${base}/operations/control-room/review-inbox.html`,{waitUntil:'domcontentloaded'});await page.locator('#readyTabs button').first().waitFor();
    assert.equal(await page.locator('#readyCount').textContent(),'4');assert.equal(await page.locator('#buildCount').textContent(),'1');assert.equal(await page.locator('#blockedCount').textContent(),'2');
    assert.equal(await page.locator('#readyTabs button').count(),4);assert.equal(await page.locator('#title').textContent(),'Episode 01 — On Wednesdays We Do AI');
    assert.match(await page.locator('#hash').textContent(),/50311e89c1664c1f/);assert.equal(await page.locator('#building .work-card').count(),1);assert.equal(await page.locator('#blocked .work-card').count(),2);
    const expected=[
      {title:'Episode 01',hash:/50311e89c1664c1f/,min:1171,max:1173},
      {title:'Episode 02',hash:/2b8bd0c3cfb968ad/,min:986,max:988},
      {title:'Episode 03',hash:/6a7f2381666b355a/,min:1047,max:1049},
      {title:'Episode 04',hash:/9fc40d965cf67e08/,min:1221,max:1223}
    ];
    for(const item of expected){
      await page.locator('#readyTabs button').filter({hasText:item.title}).click();
      assert.match(await page.locator('#hash').textContent(),item.hash);
      await page.locator('#player').evaluate((video,title)=>new Promise((resolve,reject)=>{if(video.readyState>=1)return resolve();video.addEventListener('loadedmetadata',resolve,{once:true});video.addEventListener('error',()=>reject(new Error(`${title} metadata failed`)),{once:true})}),item.title);
      const media=await page.locator('#player').evaluate(video=>({duration:video.duration,width:video.videoWidth,height:video.videoHeight,tracks:video.querySelectorAll('track[kind="captions"]').length}));
      assert.ok(media.duration>item.min&&media.duration<item.max,`${item.title} duration ${media.duration}`);assert.equal(media.width,1920);assert.equal(media.height,1080);assert.equal(media.tracks,1);
    }
    await page.locator('#readyTabs button').filter({hasText:'Episode 01'}).click();
    await page.selectOption('#decision','HOLD');await page.fill('#notes','00:42 — test note');await page.click('#save');await page.locator('#saved').filter({hasText:'Saved on this device'}).waitFor();
    const storedBeforeReload=await page.evaluate(()=>localStorage.getItem('laidies-owner-review:episode-01-v27-human-watch'));assert.match(storedBeforeReload,/00:42/);
    await page.reload({waitUntil:'domcontentloaded'});await page.locator('#readyTabs button').first().waitFor();await page.waitForTimeout(500);
    const reloadState=await page.evaluate(()=>({stored:localStorage.getItem('laidies-owner-review:episode-01-v27-human-watch'),notes:document.querySelector('#notes')?.value,title:document.querySelector('#title')?.textContent}));
    assert.equal(reloadState.notes,'00:42 — test note',JSON.stringify(reloadState));
    assert.equal(await page.locator('#decision').inputValue(),'HOLD');assert.equal(await page.locator('#notes').inputValue(),'00:42 — test note');
    await page.locator('#readyTabs button').filter({hasText:'Episode 04'}).click();assert.match(await page.locator('#hash').textContent(),/9fc40d965cf67e08/);
    const overflow=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));assert.ok(overflow.document<=overflow.viewport+1,JSON.stringify(overflow));assert.ok(overflow.body<=overflow.viewport+1,JSON.stringify(overflow));
    assert.deepEqual(errors,[]);await page.screenshot({path:path.join(evidenceDir,width===390?'mobile.png':'desktop.png'),fullPage:true});await page.close();
  }
    console.log('OWNER REVIEW INBOX: PASS (390px + 1280px; exact current Episode 01–04 masters)');
}finally{await browser.close();server.close()}
