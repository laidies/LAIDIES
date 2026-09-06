#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath,pathToFileURL} from 'node:url';
import versions from '../content/newsstand-big-picture-versions.js';
import contract from '../content/newsstand-reader-contract.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=process.env.NEWSSTAND_FEATURE_ROOT;
if(!base||!process.env.PLAYWRIGHT_CORE_PATH)throw Error('Complete public artifact and Playwright required.');
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'content/newsstand-stories.js'),'utf8'),ctx);
const current=JSON.parse(JSON.stringify(ctx.window.NEWSSTAND_DATA));
const prior=current.stories.find(s=>s.id==='big-picture-data-centre-deal-2026-08-24');
const testProof={kind:'verified-public-artifact.v1',verificationState:'PUBLICLY_VERIFIED',independentlyVerified:true,verifier:'TEST FIXTURE ONLY',verifiedAt:'2026-09-06T03:00:00Z',articleSha256:versions.articleIdentity(versions.publicArticle(prior)),artifactManifestSha256:'a'.repeat(64)};
const result=versions.createSnapshot(prior,{versionId:'2026-08-29-public',replacedAt:'2026-09-05T17:00:00Z',summary:'TEST FIXTURE: earlier text retained.'},testProof);assert.equal(result.ok,true);
const fixture=structuredClone(current);const successor=fixture.stories.find(s=>s.id===prior.id);successor.headline='TEST FIXTURE — successor article';successor.updatedAt='2026-09-05';successor.bigPicture.lastMeaningfullyUpdatedAt='2026-09-05';successor.bigPicture.previousVersions=[result.snapshot];assert.deepEqual(contract.validate(fixture),[]);
for(const [name,mutate] of Object.entries({changed:s=>s.article.headline='Altered retained text',private:s=>s.article.heroVisual.operatingRecipe='secret',wrongStory:s=>{s.article.id='another-story';s.articleSha256=versions.articleIdentity(s.article);},malformed:s=>{s.article.the_story={secret:'metadata'};s.articleSha256=versions.articleIdentity(s.article);}})){const bad=structuredClone(fixture);mutate(bad.stories.find(s=>s.id===prior.id).bigPicture.previousVersions[0]);assert.ok(contract.validate(bad).length,name+' must reject');}
const badLog=structuredClone(current);badLog.stories.find(s=>s.id===prior.id).bigPicture.changeLog.push({changedAt:'2026-09-05',summary:'Rebuilt from Ali’s Claude-edited manuscript.'});assert.ok(contract.validate(badLog).some(x=>x.includes('private production')));
const changed=['newsstand.html','content/newsstand-reader-contract.js','content/newsstand-big-picture-versions.js','content/newsstand-stories.js'];
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{let rel=new URL(req.url,'http://localhost').pathname.replace(/^\/+/, '');if(!path.extname(rel))rel=(rel||'index')+'.html';const file=path.resolve(changed.includes(rel)?root:base,rel);if(!file.startsWith(root+'/')&&!file.startsWith(base+'/'))return res.writeHead(404).end();if(!fs.existsSync(file))return res.writeHead(404).end();res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=process.env.NEWSSTAND_BIG_PICTURE_URL||'http://127.0.0.1:'+server.address().port;
const output=process.env.NEWSSTAND_BIG_PICTURE_OUTPUT||fs.mkdtempSync(path.join(os.tmpdir(),'newsstand-versions-browser-'));fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[];
try{
for(const width of [1280,390,320]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();await page.clock.install({time:new Date('2026-09-06T03:00:00Z')});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{window.__testViews=[];addEventListener('newsstand:publication-viewed',e=>window.__testViews.push(e.detail));});
 if(!process.env.NEWSSTAND_BIG_PICTURE_URL)await page.route('**/content/newsstand-stories.js*',r=>r.fulfill({contentType:'text/javascript',body:'window.NEWSSTAND_DATA = '+JSON.stringify(fixture)+';'}));
 await page.goto(origin+'/newsstand#'+prior.slug,{waitUntil:'domcontentloaded'});await page.locator('.ns-article--big-picture').waitFor();
 await page.locator('.ns-big-picture-history summary').click();
 assert.equal(await page.locator('.ns-big-picture-history').innerText().then(t=>/Ali’s|Claude-edited|rejected draft/.test(t)),false);
 if(process.env.NEWSSTAND_BIG_PICTURE_URL){assert.equal(await page.locator('.ns-big-picture-history li').count(),2);await page.locator('.ns-big-picture-history').screenshot({path:path.join(output,'current-history-'+width+'.png')});}
 if(!process.env.NEWSSTAND_BIG_PICTURE_URL){
  await page.getByRole('link',{name:/^Read the version from/}).click();
  await page.locator('[data-retained-version]').waitFor();assert.equal(await page.locator('#ns-story-title').innerText(),prior.headline);
  const texts=await page.locator('.ns-examination__copy').evaluateAll(nodes=>nodes.map(n=>n.innerHTML));assert.deepEqual(texts,prior.examination_sections.map(s=>s.body));
  assert.equal(await page.evaluate(()=>window.__testViews.length),1,'old version must not mark the current update read');
  await page.screenshot({path:path.join(output,'retained-'+width+'.png')});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.getByRole('link',{name:'Read the current article →'}).click();await page.waitForFunction(()=>document.querySelector('#ns-story-title')?.textContent==='TEST FIXTURE — successor article');
  await page.goBack();await page.locator('[data-retained-version]').waitFor();await page.reload({waitUntil:'domcontentloaded'});await page.locator('[data-retained-version]').waitFor();
 }
 await page.goto(origin+'/newsstand#'+prior.slug+'?version=never-retained',{waitUntil:'domcontentloaded'});await page.locator('[data-access-state="unavailable"]').waitFor();assert.equal(await page.locator('.ns-examination').count(),0);await page.getByRole('link',{name:'Read the current article →'}).click();await page.locator('.ns-examination').waitFor();assert.deepEqual(errors,[]);results.push({width,retainedJourney:!process.env.NEWSSTAND_BIG_PICTURE_URL,unknownVersion:'unavailable without current-body fallback',errors});await context.close();
}
fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify({scope:process.env.NEWSSTAND_BIG_PICTURE_URL?'Current public history and unavailable route; no retained edition exists yet':'Synthetic successor only; exact real public predecessor prose, no historical publication claim',results},null,2)+'\n');console.log(JSON.stringify({result:'PASS',output,results}));
}finally{await browser.close();await new Promise(r=>server.close(r));}
