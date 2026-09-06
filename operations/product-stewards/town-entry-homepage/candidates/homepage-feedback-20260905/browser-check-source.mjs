import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const root='/Users/alisoneakin/Projects/laidies-homepage-corrections-20260905';
const base='/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/newsstand-versions-release-1nq8w4u6/public';
const out='/tmp/laidies-homepage-feedback-tests';fs.mkdirSync(out,{recursive:true});
const workerFile=out+'/browser-worker.mjs';fs.copyFileSync(root+'/_worker.js',workerFile);const {default:worker}=await import(workerFile+'?v='+Date.now());
const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.mp4':'video/mp4'};
const env={ASSETS:{fetch:async req=>{let file=base+new URL(req.url).pathname;return fs.existsSync(file)?new Response(fs.readFileSync(file),{headers:{'content-type':types[path.extname(file)]||'application/octet-stream'}}):new Response('',{status:404});}},AI:{run(){throw new Error('PAID CALL FORBIDDEN')}},FAIRY_AI:{fetch(){throw new Error('PAID CALL FORBIDDEN')}}};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const checks=[];
try{for(const width of [1440,390,320,768]){
 const c=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});const page=await c.newPage();let calls=0;let mode='normal';const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(/plausible|clarity|cloudflareinsights/.test(u.hostname))return route.abort();
 if(u.hostname!=='laidies.ai')return route.continue();
 if(u.pathname==='/api/miss-jeeves'){calls++;if(mode==='error')return route.fulfill({status:503,body:'{}'});const res=await worker.fetch(new Request(u.href,{method:'POST',headers:{'content-type':'application/json'},body:route.request().postData()}),env,{});return route.fulfill({status:res.status,contentType:'application/json',body:await res.text()});}
 if(u.pathname==='/content/episode-index.json'&&mode==='future'){const d=JSON.parse(fs.readFileSync(base+u.pathname));d.episodes.push({number:5,title:'The Super Models',status:'published',issueUrl:'issues/issue-05.html'},{number:6,title:'Draft must not appear',status:'draft',issueUrl:'issues/issue-06.html'});return route.fulfill({json:d});}
 const owned=u.pathname==='/'?'index.html':u.pathname.slice(1);const file=['index.html','content/site/homepage.js'].includes(owned)?root+'/'+owned:base+'/'+owned;if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:types[path.extname(file)]||'application/octet-stream'});return route.continue();});
 await page.goto('https://laidies.ai/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);await page.locator('[data-latest-episode-title]').filter({hasText:'Episode 04'}).waitFor();
 assert.equal(await page.locator('.feature-directory .feature-group').count(),4);assert.equal(await page.locator('.feature-group li a').count(),26);assert.equal(await page.locator('.intent-grid').count(),0);
 assert.deepEqual(await page.locator('.hero-jumps a').allTextContents(),['Why women must shape AI','How LAiDIES works','Find what I need']);
 await page.locator('#method').scrollIntoViewIfNeeded();
 if(await page.locator('.steps-title').getAttribute('aria-expanded')==='false')await page.locator('.steps-title').click();
 assert(!(await page.locator('#method').innerText()).includes('Episode 04'));assert((await page.locator('#method').innerText()).includes('Pop Quiz'));
 assert.equal(await page.locator('[data-jeeves-example]').count(),3);await page.locator('[data-jeeves-example]').first().click();assert.equal(calls,0);await page.locator('#homepage-jeeves-form button').click();await page.locator('#homepage-jeeves-answer h3').waitFor();assert.equal(calls,1);assert.equal(page.url(),'https://laidies.ai/');assert(await page.locator('#homepage-jeeves-answer li').count()>0);
 const answerText=await page.locator('#homepage-jeeves-answer').innerText();
 await page.screenshot({path:out+`/answer-${width}.png`});
 for(const [key,selector] of [['hero','.hero'],['directory','#today'],['jeeves','#reference'],['resident','#collect'],['activities','.activity-grid'],['method','#method']]){const el=page.locator(selector);await el.scrollIntoViewIfNeeded();await el.locator('img').evaluateAll(async imgs=>{imgs.forEach(img=>img.loading='eager');await Promise.all(imgs.map(img=>img.decode().catch(()=>{})))});await el.screenshot({path:out+`/${key}-${width}.png`});}
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth);assert(overflow<=width,`overflow ${width}: ${overflow}`);
 mode='error';await page.locator('#homepage-jeeves-form button').click();await page.getByRole('button',{name:'Try again',exact:true}).waitFor();assert((await page.locator('#lookup').inputValue()).includes('make things up'));mode='normal';await page.getByRole('button',{name:'Try again',exact:true}).click();await page.locator('#homepage-jeeves-answer h3').waitFor();
 mode='future';await page.reload({waitUntil:'domcontentloaded'});await page.locator('[data-latest-episode-title]').filter({hasText:'Episode 05: The Super Models'}).waitFor();assert.equal(await page.locator('.fc-default h3').innerText(),'Episode 05: The Super Models');assert.equal(await page.locator('.fc-default .fc-btn-teal').getAttribute('href'),'/issues/issue-05.html');assert.equal(await page.locator('.season-track a[href="/issues/issue-06.html"]').count(),0);assert.equal(await page.locator('.season-track a[href="/issues/issue-05.html"]').count(),1);assert.equal(await page.locator('.fc-default .fc-btn-coral').innerText(),'Listen to Episode 05');
 assert.deepEqual(errors,[]);checks.push({width,overflow,errors,inlineSourceResult:answerText,episodeRollover:true,exampleDoesNotSubmit:true,retry:true});console.log('Verified',width);await c.close();}}
finally{await browser.close();}
fs.writeFileSync(out+'/browser-checks.json',JSON.stringify({checks},null,2));
