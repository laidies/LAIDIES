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
const evidenceDir=process.env.REVIEW_INBOX_EVIDENCE_DIR||path.join(root,'operations/control-room/evidence/owner-review-inbox-2026-08-01');
const receiptEvidencePath=process.env.REVIEW_RECEIPT_PATH||'';
const types={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.mp4':'video/mp4','.m4a':'audio/mp4','.vtt':'text/vtt; charset=utf-8','.jpg':'image/jpeg'};

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
    await page.goto(`${base}/operations/control-room/review-inbox.html`,{waitUntil:'domcontentloaded'});await page.locator('#nothingReady').waitFor();
    assert.equal(await page.locator('#readyCount').textContent(),'0');assert.equal(await page.locator('#buildCount').textContent(),'1');assert.equal(await page.locator('#repairCount').textContent(),'5');assert.equal(await page.locator('#doneCount').textContent(),'0');assert.equal(await page.locator('#blockedCount').textContent(),'2');
    assert.equal(await page.locator('#readyTabs button').count(),0);assert.equal(await page.locator('#reviewPanel').isHidden(),true);assert.equal(await page.locator('#nothingReady').isVisible(),true);
    assert.equal(await page.locator('#repairs .work-card').count(),5);assert.match(await page.locator('#repairs').textContent(),/Trailer/);assert.match(await page.locator('#repairs').textContent(),/Episode 04/);assert.match(await page.locator('#repairs').textContent(),/No action for Ali/);
    assert.equal(await page.locator('#building .work-card').count(),1);assert.match(await page.locator('#building .work-card').first().textContent(),/ODC-101/);assert.equal(await page.locator('#completed .work-card').count(),0);assert.equal(await page.locator('#blocked .work-card').count(),2);
    assert.equal(await page.locator('#modules .work-card').count(),9);assert.equal(await page.locator('#portfolioIndex .portfolio-group').count(),7);
    assert.equal(await page.locator('#captionBand').count(),1,'review player template requires one below-picture caption band');
    assert.equal(await page.locator('details.technical-details').count(),1,'technical checksums must be collapsed behind details');
    const overflow=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));assert.ok(overflow.document<=overflow.viewport+1,JSON.stringify(overflow));assert.ok(overflow.body<=overflow.viewport+1,JSON.stringify(overflow));
    assert.deepEqual(errors,[]);await page.screenshot({path:path.join(evidenceDir,width===390?'mobile.png':'desktop.png'),fullPage:true});await page.close();
  }
    console.log('OWNER REVIEW INBOX: PASS (390px + 1280px; zero premature reviews, five visible internal repairs, no Ali debugging action, responsive work inventory, below-picture caption template and collapsed technical details)');
}finally{await browser.close();server.close()}
