import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';
import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const root='/Users/alisoneakin/Projects/laidies-homepage-corrections-20260905';const packet=root+'/operations/product-stewards/town-entry-homepage/candidates/banner-highlights-20260906';
const origin=process.env.SHORTCUT_ORIGIN||'https://40010f23.laidies-sunnyvaile.pages.dev';const hosted=!!process.env.SHORTCUT_ORIGIN;const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const checks=[];
try{for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 if(!hosted)await page.route('**/content/site/homepage.js*',r=>r.fulfill({contentType:'text/javascript',body:fs.readFileSync(root+'/content/site/homepage.js')}));
 if(!hosted)await page.route(origin+'/',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(root+'/index.html')}));
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 await page.locator('[data-intent-episode-summary]').filter({hasText:'Episode 04'}).waitFor();
 assert(await page.locator('[data-dyk]').evaluate(el=>el.previousElementSibling.classList.contains('hero')));
 const highlights=JSON.parse(fs.readFileSync(packet+'/highlights.json'));const heights=[];
 assert.equal(await page.locator('[data-dyk-slide]').count(),8);
 for(let i=0;i<8;i++){
  const slide=page.locator('[data-dyk-slide]:visible');assert.equal(await slide.getAttribute('href'),highlights[i].href);
  await slide.locator('img').evaluate(img=>img.decode());assert(await slide.locator('img').evaluate(img=>img.naturalWidth>0));
  assert.equal(await slide.locator('h3').innerText(),highlights[i].text);
  const box=await page.locator('[data-dyk]').boundingBox();heights.push(box.height);
  assert(box.height<(width===1440?190:295),`banner too tall: ${width} ${box.height}`);
  await page.locator('[data-dyk]').screenshot({path:packet+`/${hosted?'hosted-':''}banner-${width}-${i+1}.png`});
  await page.locator('[data-dyk-next]').click();
 }
 assert(Math.max(...heights)-Math.min(...heights)<2,'rotation must not shift page');
 await page.locator('[data-dyk-prev]').click();assert.equal(await page.locator('[data-dyk-slide]:visible').getAttribute('href'),'/mall.html');
 await page.locator('[data-dyk-next]').click();assert.equal(await page.locator('[data-dyk-pause]').textContent(),'Play');
 const radio=page.locator('[data-dyk-slide]').nth(2);assert.equal(await radio.getAttribute('target'),'_blank');
 assert.equal(await page.locator('.intent-grid>a').count(),6);assert(await page.locator('.intent-grid').isVisible());
 assert.equal(await page.locator('.intent-grid>a').nth(0).getAttribute('href'),'/learn.html');assert.equal(await page.locator('.intent-grid>a').nth(1).getAttribute('href'),'/learn.html#help-now');
 assert(await page.locator('#full-directory').evaluate(el=>el.previousElementSibling.id==='today'));
 await page.locator('#today').scrollIntoViewIfNeeded();await page.locator('#today img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
 await page.locator('#today').screenshot({path:packet+`/${hosted?'hosted-':''}shortcuts-${width}.png`});
 const d=page.locator('.directory-disclosure'),s=d.locator('summary');assert.equal(await d.getAttribute('open'),null);assert.equal(await page.locator('.feature-directory-groups').isVisible(),false);
 await page.locator('#full-directory').screenshot({path:packet+`/${hosted?'hosted-':''}directory-closed-${width}.png`});
 const pillWidth=await s.evaluate(el=>el.getBoundingClientRect().width);const contentWidth=await d.evaluate(el=>el.getBoundingClientRect().width);assert(Math.abs(pillWidth-contentWidth)<2);
 await s.focus();await page.keyboard.press('Enter');assert(await d.evaluate(el=>el.open));assert.equal(await page.locator('.feature-group').count(),4);assert.equal(await page.locator('.feature-group li a:visible').count(),26);
 await page.locator('.homepage-radio-pill').waitFor({state:'visible'});await page.locator('#full-directory').screenshot({path:packet+`/${hosted?'hosted-':''}directory-open-${width}.png`});
 await s.focus();await page.keyboard.press('Space');assert.equal(await d.evaluate(el=>el.open),false);
 await page.locator('.intent-grid>a').nth(0).click();await page.waitForURL(u=>/^\/learn(?:\.html)?$/.test(u.pathname),{waitUntil:'domcontentloaded'});assert(await page.locator('#learn-your-way').isVisible());
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});await page.locator('.intent-grid>a').nth(1).click();await page.waitForURL(u=>/^\/learn(?:\.html)?$/.test(u.pathname)&&u.hash==='#help-now',{waitUntil:'domcontentloaded'});assert(await page.locator('#help-now').isVisible());
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth);assert(overflow<=width);assert.deepEqual(errors,[]);
 if(!hosted){await page.route('**/content/episode-index.json',async r=>{const res=await r.fetch();const body=await res.json();body.episodes.push({number:5,title:'The Super Models',status:'published',issueUrl:'issues/issue-05.html'},{number:6,title:'Draft never live',status:'draft',issueUrl:'issues/issue-06.html'});await r.fulfill({json:body});});await page.reload({waitUntil:'domcontentloaded'});await page.locator('[data-intent-episode-summary]').filter({hasText:'Episode 05'}).waitFor();assert((await page.locator('[data-intent-episode]').getAttribute('href')).includes('issue-05'));}
 checks.push({width,errors,overflow,bannerSlides:8,stableBannerHeight:true,shortcuts:6,categories:4,directLinks:26,learningJourney:true,helpJourney:true,collapsedInitially:true,keyboardExpandCollapse:true,pillFullWidth:true,episodeRollover:!hosted?'published05; draft06 excluded':'actual live data'});await context.close();
}
const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await c.newPage();if(!hosted)await p.route(origin+'/',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(root+'/index.html')}));await p.goto(origin+'/',{waitUntil:'domcontentloaded'});await p.locator('.directory-disclosure>summary').click();assert(await p.locator('.directory-disclosure').evaluate(el=>el.open));assert.equal(await p.locator('.feature-group li a:visible').count(),26);await c.close();
}finally{await browser.close();}
const result={status:'PASS',sourceSha256:sha(fs.readFileSync(root+'/index.html')),origin,hosted,noJavaScriptDisclosure:true,checks};fs.writeFileSync(packet+`/${hosted?'hosted':'browser'}-checks.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
