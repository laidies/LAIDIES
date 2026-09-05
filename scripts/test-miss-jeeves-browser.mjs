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
const server=http.createServer(async(req,res)=>{
 try{
 const chunks=[];for await(const chunk of req)chunks.push(chunk);
 const body=Buffer.concat(chunks);if(req.url==='/api/miss-jeeves')requests.push(JSON.parse(body));
 const request=new Request(`http://127.0.0.1:${server.address().port}${req.url}`,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body}: {})});
 const response=await worker.fetch(request,env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch(error){res.writeHead(500);res.end(String(error));}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
 for(const width of [390,1280]){
 const context=await browser.newContext({viewport:{width,height:900}});
 await context.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(`${origin}/library.html#miss-jeeves`,{waitUntil:'domcontentloaded'});
 const before=researchCalls;const aiBefore=aiCalls;
 await page.locator('#jv-q').fill('Can I upload a work document?');
 const searchResponse=page.waitForResponse(response=>new URL(response.url()).pathname==='/api/miss-jeeves');
 await page.locator('.jv-form button[type=submit]').click();
 await searchResponse;
 assert.equal(researchCalls,before,'free search must not call the paid research service');
 assert.equal(aiCalls,aiBefore,'free search must not call a legacy AI model');
 await page.locator('#jv-research').waitFor();
 assert.equal(requests.at(-1).intent,'search');
 assert.match(await page.locator('#jv-results').innerText(),/Before choosing a format/);
 assert.doesNotMatch(await page.locator('#jv-results').innerText(),/<(?:p|strong|div)\b/);
 await page.locator('#jv-research').click();
 await page.locator('.jv-answer-copy').waitFor();
 assert.equal(researchCalls,before+1,'one deliberate click starts one research request');
 assert.equal(requests.at(-1).intent,'research');
 assert.match(forwarded.researchAttemptId,/^[a-f0-9-]{36}$/);
 const completedAttempt=forwarded.researchAttemptId;
 assert.doesNotMatch(await page.locator('#jv-results').innerText(),/\bof (?:3|5)\b/,'Pages must not infer fixed 3/5 allowances from an adaptive backend response');
 assert.match(forwarded.related_laidies_material.find(e=>/Upload, Paste/.test(e.title)).sourceText,/If you cannot answer the first three/);
 await page.locator('.jv-form button[type=submit]').click();await page.locator('#jv-research').waitFor();await page.locator('#jv-research').click();
 await page.locator('.jv-answer-copy').waitFor();
 assert.equal(researchCalls,before+2,'a successful adaptive allowance permits another deliberate research request');
 assert.notEqual(forwarded.researchAttemptId,completedAttempt,'a new deliberate request after a completed response gets a new identity');
 assert.equal(forwarded.guestToken,'research-fixture','repeat research reuses the opaque guest token');
 fixture='clarify';
 await page.locator('.jv-form button[type=submit]').click();await page.locator('#jv-research').waitFor();await page.locator('#jv-research').click();
 await page.getByRole('heading',{name:'One detail first'}).waitFor();
 assert.equal(await page.evaluate(()=>localStorage.getItem('laidies_miss_jeeves_guest_token_v1')),'clarification-fixture');
 assert.equal(await page.locator('#jv-q').inputValue(),'Can I upload a work document?');
 fixture='capacity';
 await page.locator('.jv-form button[type=submit]').click();await page.locator('#jv-research').waitFor();
 const beforeCapacity=researchCalls;await page.locator('#jv-research').click();
 await page.locator('.jv-limit').waitFor();
 assert.equal(researchCalls,beforeCapacity+1,'capacity state reaches the backend only after an explicit research click');
 assert.equal(await page.locator('.jv-limit a').count(),0,'adaptive capacity must not show the retired guest-upgrade path');
 assert.doesNotMatch(await page.locator('.jv-limit').innerText(),/three guest|five .*today/i,'adaptive capacity must not show fixed quota copy');
 assert.equal(await page.evaluate(()=>localStorage.getItem('laidies_miss_jeeves_guest_token_v1')),'capacity-fixture');
 await page.locator('.jv-form button[type=submit]').click();await page.locator('#jv-research').waitFor();
 assert.equal(researchCalls,beforeCapacity+1,'free search after capacity pause must not call the paid research backend');
 assert.equal(requests.at(-1).intent,'search');
 fixture='answer';
 // Lose a research response at the browser boundary. Retrying that same query
 // must preserve the attempt identity rather than commissioning it twice.
 let lostAttempt;
 await page.route('**/api/miss-jeeves',async route=>{
  const body=route.request().postDataJSON();
  if(body.intent==='research'&&!lostAttempt){lostAttempt=body.researchAttemptId;await route.abort();}
  else await route.continue();
 });
 await page.locator('#jv-q').fill('A transport retry question');
 await page.locator('.jv-form button[type=submit]').click();await page.locator('#jv-research').waitFor();await page.locator('#jv-research').click();
 await page.locator('#jv-service-retry').waitFor();
 assert.ok(lostAttempt);
 await page.locator('#jv-service-retry').click();await page.locator('#jv-research').waitFor();await page.locator('#jv-research').click();
 await page.locator('.jv-answer-copy').waitFor();
 assert.equal(forwarded.researchAttemptId,lostAttempt,'transport retry must retain the paid attempt identity');
 await page.unroute('**/api/miss-jeeves');
 await page.locator('#jv-q').fill('zzxxyyqqww');await page.locator('.jv-form button[type=submit]').click();
 await page.locator('#jv-topic-request').waitFor();assert.equal(await page.locator('#jv-request-consent').isChecked(),false);
 assert.deepEqual(errors,[],'page must not throw runtime errors');
 await context.close();
 console.log(`PASS ${width}px: free search, research consent, complete conditions, clarification identity, editorial consent.`);
 }
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
