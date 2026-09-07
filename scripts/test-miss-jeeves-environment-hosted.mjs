import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const workerPath=process.env.LAIDIES_MISS_JEEVES_WORKER || path.join(root,'_worker.js');
const {default:worker}=await import(pathToFileURL(workerPath));
const artifact=process.env.LAIDIES_PUBLIC_ROOT || root;
const runtime=process.env.PLAYWRIGHT_MODULE || '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const {chromium}=await import(pathToFileURL(runtime));
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
async function captureSection(page, selector, file) {
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>window.scrollTo({top:0,left:0,behavior:"instant"}));
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const clip=await page.locator(selector).boundingBox();
 assert(clip && clip.width>0 && clip.height>0);
 await page.screenshot({path:file,clip,fullPage:true});
}
const requests=[];let aiCalls=0;let researchCalls=0;let fixture='answer';let forwarded;
const asset=async request=>{
 const url=new URL(request.url);let relative=decodeURIComponent(url.pathname).replace(/^\//,'');
 if(!relative)relative='index.html';if(!path.extname(relative))relative+='.html';
 if(relative.includes('..'))return new Response('',{status:400});
 const owned=['library.html','content/site/miss-jeeves-index.json'];
 const file=path.join(owned.includes(relative)?root:artifact,relative);
 if(!fs.existsSync(file))return new Response('',{status:404});
 return new Response(fs.readFileSync(file),{headers:{'content-type':mime[path.extname(file)]||'application/octet-stream'}});
};
const env={ASSETS:{fetch:asset},AI:{run(){aiCalls++;throw Error('legacy AI invoked');}},FAIRY_AI:{async fetch(request){
 researchCalls++;forwarded=await request.json();
 if(fixture==='clarify')return Response.json({status:'clarification_required',model:'gpt-5.6-sol',question:'Which AI tool are you using?',guestToken:'clarification-fixture',allowance:{kind:'guest',policy:'adaptive.v1',state:'available'}});
 if(fixture==='capacity')return Response.json({status:'error',error:'research_capacity_reached',guestToken:'capacity-fixture',allowance:{kind:'guest',policy:'adaptive.v1',state:'paused',retryAt:'2026-09-06T00:00:00.000Z'}},{status:429});
 return Response.json({status:'ok',model:'gpt-5.6-sol',source_policy_version:'fixture',citation_policy:'all-approved-https.v1',guestToken:'research-fixture',allowance:{kind:'guest',policy:'adaptive.v1',state:'available',remaining:7},output:[{content:[{type:'output_text',text:'Check whether your employer permits this account to receive the document before uploading. If you do not know, ask first.',annotations:[{type:'url_citation',url:'https://help.openai.com/',title:'Fixture source'}]}]}]});
}}};
let reviewedRecords=[];
if(process.env.JEEVES_REVIEWED_RECORD){
 const {DatabaseSync}=await import('node:sqlite');
 const {importReviewedAnswer}=await import('./lib/miss-jeeves-answer-bank.mjs');
 const loaded=JSON.parse(fs.readFileSync(process.env.JEEVES_REVIEWED_RECORD,'utf8'));
 reviewedRecords=Array.isArray(loaded)?loaded:[loaded];
 const sqlite=new DatabaseSync(':memory:');sqlite.exec(fs.readFileSync(path.join(root,'migrations/library-corrections/0004_miss_jeeves_answer_bank.sql'),'utf8'));
 const db={prepare(sql){const stmt=sqlite.prepare(sql);return{bind(...args){return{run:async()=>stmt.run(...args),all:async()=>stmt.all(...args)};}};},async batch(statements){for(const stmt of statements)await stmt.run();}};
 if(process.env.JEEVES_BANK_PREDECESSORS)for(const item of JSON.parse(fs.readFileSync(process.env.JEEVES_BANK_PREDECESSORS,'utf8')))assert.equal((await importReviewedAnswer(db,item.record,{id:item.id})).status,'imported');
 for(const record of reviewedRecords)assert.equal((await importReviewedAnswer(db,record)).status,'imported');
 Object.assign(env,{MISS_JEEVES_DB:db,MISS_JEEVES_ANSWER_BANK_ENABLED:'true',MISS_JEEVES_ANSWER_BANK_SOURCE_POLICY_VERSION:reviewedRecords[0].sourcePolicyVersion});
}
const origin=process.env.JEEVES_PREVIEW_ORIGIN;if(!/^https:\/\/[a-f0-9]+\.laidies-sunnyvaile\.pages\.dev$/.test(origin||''))throw Error('Exact preview origin required');
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
 const record=reviewedRecords[0];assert.equal(record.answerKey,'environment-ai');
 for(const width of [390,820,1280]){
  const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();const errors=[];const apiRequests=[];page.on('request',r=>{if(new URL(r.url()).pathname==='/api/miss-jeeves'&&r.method()==='POST')apiRequests.push(r.postDataJSON());});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/library#miss-jeeves');
  const response=page.waitForResponse(r=>new URL(r.url()).pathname==='/api/miss-jeeves');await page.getByRole('button',{name:record.canonicalQuestion,exact:true}).click();
  const result=await(await response).json();assert.equal(result.answer_key,'environment-ai');
  await page.locator('.jv-answer-copy').waitFor();assert.equal((await page.locator('.jv-answer-copy').innerText()).trim(),record.answer);
  assert.equal(await page.locator('.jv-clarification-form').count(),0);assert.equal(await page.locator('.jv-chip').count(),1);assert.equal(await page.locator('#jv-q').inputValue(),record.canonicalQuestion);
  assert.match(await page.locator('.jv-question-context').innerText(),/Is AI bad for the environment/);assert.match(await page.locator('.jv-sources').innerText(),/2026/);assert.match(await page.locator('.jv-sources').innerText(),/2024/);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  const whites=await page.locator('#miss-jeeves').evaluate(root=>[root,...root.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().height>0).filter(e=>{const s=getComputedStyle(e);return s.color==='rgb(255, 255, 255)'||s.backgroundColor==='rgb(255, 255, 255)'}).map(e=>e.className));assert.deepEqual(whites,[]);
  await page.locator('.jv-answer-copy').evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY+200));
  const sticky=await page.locator('.jv-question-context').boundingBox();assert(sticky.y>=0&&sticky.y<80,'question must remain visible while reading');
  await captureSection(page,'#miss-jeeves',path.join(process.env.JEEVES_SCREENSHOT_DIR,'environment-'+width+'.png'));
  await page.goto(origin+'/#reference');const hr=page.waitForResponse(r=>new URL(r.url()).pathname==='/api/miss-jeeves');await page.getByRole('button',{name:record.canonicalQuestion,exact:true}).click();assert.equal((await(await hr).json()).answer_key,'environment-ai');await page.locator('#homepage-jeeves-answer').getByRole('heading',{name:'Your reviewed answer'}).waitFor();
  assert.equal(await page.locator('[data-jeeves-example]:visible').count(),1);await captureSection(page,'#reference',path.join(process.env.JEEVES_SCREENSHOT_DIR,'environment-homepage-'+width+'.png'));
  assert(apiRequests.length>=2&&apiRequests.every(r=>r.intent==='search'),'Hosted requests must remain free search');assert.deepEqual(errors,[]);console.log('HOSTED '+width+'px environment: example, direct exact answer, full question, dated sources, no white, no overflow, homepage, only free-search requests.');await context.close();
 }
}finally{await browser.close();}
