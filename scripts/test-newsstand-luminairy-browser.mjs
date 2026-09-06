#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath, pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const playwright = process.env.PLAYWRIGHT_CORE_PATH;
if (!playwright || !process.env.NEWSSTAND_FEATURE_ROOT) throw Error('Set PLAYWRIGHT_CORE_PATH and NEWSSTAND_FEATURE_ROOT to the complete public artifact.');
const {chromium} = await import(pathToFileURL(path.join(playwright, 'index.mjs')));
const root=process.env.NEWSSTAND_FEATURE_OVERLAY || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base=process.env.NEWSSTAND_FEATURE_ROOT;
const external=process.env.NEWSSTAND_FEATURE_URL;
const changed=['newsstand.html','content/newsstand-design.css','content/site/newsstand-luminairy.js','content/site/ksvl-theme-buttons.js'];
const output=process.env.NEWSSTAND_FEATURE_OUTPUT || fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-profiles-'));fs.mkdirSync(output,{recursive:true});
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.mp3':'audio/mpeg','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{let rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '');if(!path.extname(rel))rel=(rel||'index')+'.html';const file=path.resolve(changed.includes(rel)?root:base,rel);if(!file.startsWith(root+'/')&&!file.startsWith(base+'/'))return res.writeHead(404).end();if(!fs.existsSync(file))return res.writeHead(404).end();res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=external || 'http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const profiles=JSON.parse(fs.readFileSync(path.join(base,'content/luminairy-profiles.json')));const results=[];
try{
for(const width of [1280,390,320]){
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await ctx.newPage();if(!external) await page.clock.install({time:new Date('2026-09-05T17:00:00Z')});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/newsstand',{waitUntil:'domcontentloaded'});await page.locator('#ns-luminairy[data-state="ready"]').waitFor();
 const selected=await page.locator('.ns-luminairy__profile').evaluateAll(cards=>cards.map(c=>c.dataset.profileId));if(!external)assert.deepEqual(selected,['sister-mary-clarence','hannah-fry','allie-k-miller']);
 for(const [index,wing] of ['saints','mavens','trailblazers'].entries()){const id=selected[index],profile=profiles[wing].find(p=>p.id===id),card=page.locator('.ns-luminairy__profile[data-profile-id="'+id+'"]');assert.equal(await card.count(),1);assert.equal(await card.locator('.ns-luminairy__about').innerText(),profile.about);assert.equal(await card.locator('.ns-luminairy__lesson p').innerText(),profile.lesson);await card.scrollIntoViewIfNeeded();await card.locator('img').evaluate(i=>i.decode());assert.equal(await card.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0),true);assert.equal(await card.locator('a').first().getAttribute('href'),'/luminairy#'+id);}
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);await page.locator('#ns-luminairy').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-85));await page.screenshot({path:path.join(output,'profiles-'+width+'.png'),fullPage:false});await page.locator('#ns-luminairy').screenshot({path:path.join(output,'profiles-full-'+width+'.png')});
 const controls=page.locator('#ns-luminairy a, #ns-luminairy button');for(const control of await controls.all()){const rect=await control.boundingBox();assert.ok(rect.height>=44);}
 const person=profiles.mavens.find(p=>p.id===selected[1]);const cardLink=page.getByRole('link',{name:person.name+': open her LUMINAiRY card'});await cardLink.click();await page.locator('#profile-'+person.id).waitFor();assert.equal(await page.locator('#profile-'+person.id+' h3').innerText(),person.name);results.push({width,result:'PASS',profiles:3,exactCopy:true,actualProfileJourney:true});await ctx.close();
}
if(!external){
for(const failure of ['changed-prose','missing-receipts','expired-claim']){const ctx=await browser.newContext({viewport:{width:390,height:900}});const page=await ctx.newPage();if(failure==='changed-prose'){await page.route('**/content/luminairy-profiles.json',route=>{const bad=structuredClone(profiles);bad.saints[0].about='Unauthorised assertion';return route.fulfill({json:bad});});}else if(failure==='missing-receipts'){await page.route('**/content/luminairy-editorial-receipts.json',route=>route.fulfill({status:404,body:'Missing'}));}else{await page.route('**/content/luminairy-claims.json',route=>{const bad=JSON.parse(fs.readFileSync(path.join(base,'content/luminairy-claims.json')));bad.records[0].recheckOn='2026-01-01';return route.fulfill({json:bad});});}await page.goto(origin+'/newsstand',{waitUntil:'domcontentloaded'});await page.locator('#ns-luminairy[data-state="unavailable"]').waitFor();assert.equal(await page.locator('.ns-luminairy__profile').count(),0);assert.equal(await page.getByRole('button',{name:'Play the NewsStand theme',exact:true}).isVisible(),true);results.push({failure,result:'PASS',profileProseExposed:false});await ctx.close();}
const ctx=await browser.newContext();const page=await ctx.newPage();await page.clock.install({time:new Date('2026-09-09T17:00:00Z')});await page.goto(origin+'/newsstand',{waitUntil:'domcontentloaded'});await page.locator('#ns-luminairy[data-state="ready"]').waitFor();const ids=await page.locator('.ns-luminairy__profile').evaluateAll(n=>n.map(e=>e.dataset.profileId));assert.equal(ids.length,3);assert.ok(!ids.includes('sister-mary-clarence')&&!ids.includes('hannah-fry')&&!ids.includes('allie-k-miller'));results.push({scenario:'next-Wednesday',result:'PASS',ids});await ctx.close();
}
fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify({scope:'Local feature integration only; exact existing profile prose reused; no new biographical approval',results},null,2)+'\n');console.log(JSON.stringify({result:'PASS',results}));
}finally{await browser.close();await new Promise(r=>server.close(r));}
