import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
const dir=decodeURIComponent(new URL('.',import.meta.url).pathname).replace(/\/$/,''),origin=process.argv[2]||'https://laidies.ai',label=process.argv[3]||'pilot';
const b=await chromium.launch({channel:'chrome',headless:true});const rows=[];
const strip=s=>s.replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/[\s\S]*?<\/script>\s*/g,'');
try{
 if(label==='pilot'){
 const p=await b.newPage();const r=await p.goto(origin+'/',{waitUntil:'domcontentloaded'});const before=strip((await r.body()).toString());fs.writeFileSync(dir+'/before.html',before);
 let candidate=before;
 for(const line of ['<link rel="stylesheet" href="/content/site/newsstand-home-preview-v1.css">','<script src="/content/site/newsstand-home-preview-v1.js" defer></script>']){assert.equal(candidate.split(line).length,2);candidate=candidate.replace(line+'\n','');}
 function guard(s){assert(!s.includes('/content/site/newsstand-home-preview-v1.'),'rejected Homepage activity import');}
 assert.throws(()=>guard(before),/rejected Homepage activity import/);guard(candidate);fs.writeFileSync(dir+'/index.html',candidate);await p.close();
 }
 const expected=fs.readFileSync(dir+'/index.html','utf8');
 const activityURL='https://laidies.ai/newsstand?column=DAILY-2026-09-11-CURIOSITY-CURIOSITY-01-ASK-EXAMPLE';
 for(const width of [390,960,1440]){
 let incumbent;
 for(const state of label==='pilot'?['before','candidate']:[label]){
 const p=await b.newPage({viewport:{width,height:1050},reducedMotion:'reduce'});
 if(state==='candidate')await p.route(origin+'/',r=>r.fulfill({status:200,contentType:'text/html',body:expected}));
 const r=await p.goto(origin+'/',{waitUntil:'domcontentloaded'});
 if(label!=='pilot')assert.equal(strip((await r.body()).toString()),expected);
 await p.evaluate(()=>document.fonts.ready);
 if(state==='before')await p.locator('[data-daily-activity-preview]').waitFor();else {await p.locator('.intent-grid-5 a').first().waitFor();await p.waitForTimeout(500);assert.equal(await p.locator('[data-daily-activity-preview]').count(),0);}
 await p.locator('.intent-grid-5').evaluate(n=>scrollTo({top:n.getBoundingClientRect().bottom+scrollY-innerHeight*.6,behavior:'instant'}));
 await p.evaluate(async()=>{await Promise.all(['/assets/homepage/rewind-wallpaper-20260906.webp','/assets/homepage/did-you-know-question-mark-20260906.webp','/assets/library-reader/preface-burst-v1.png','/assets/homepage/pattern-purple-computing.png'].map(async src=>{const i=new Image();i.src=src;await i.decode()}))});
 await p.waitForTimeout(450);
 await p.locator('.intent-grid-5 img').evaluateAll(async imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))));
 const metrics=await p.evaluate(()=>({cards:[...document.querySelectorAll('.intent-grid-5 a')].map(n=>({html:n.outerHTML,width:n.offsetWidth,height:n.offsetHeight})),overflow:document.documentElement.scrollWidth>innerWidth+1,sectionHeight:document.querySelector('#today').offsetHeight,wallpaper:getComputedStyle(document.body).backgroundImage,hero:document.querySelectorAll('.hero-jumps>a').length,directory:document.querySelector('.directory-disclosure').open,links:document.querySelectorAll('.directory-disclosure a').length,imports:[...document.scripts].filter(s=>s.src.includes('newsstand-home-preview')).length}));
 assert.equal(metrics.cards.length,6);assert(!metrics.overflow);assert.equal(metrics.hero,3);assert.equal(metrics.directory,false);assert.equal(metrics.links,26);assert(metrics.wallpaper.includes('rewind-wallpaper-20260906.webp'));
 if(state==='before')incumbent=metrics;else {assert.equal(metrics.imports,0);if(incumbent){assert.deepEqual(metrics.cards,incumbent.cards);assert(metrics.sectionHeight<incumbent.sectionHeight);}}
 await p.screenshot({path:`${dir}/${state}-${width}.png`});rows.push({width,state,...metrics});await p.close();
 }
 }
 const p=await b.newPage();await p.goto(activityURL,{waitUntil:'domcontentloaded'});await p.locator('#ns-reader-title').filter({hasText:'One example, please.'}).waitFor({timeout:20000});assert(await p.getByText('The nodding can wait.',{exact:false}).count()>0);await p.close();
 fs.writeFileSync(`${dir}/${label}-checks.json`,JSON.stringify({origin,knownBadRejected:label==='pilot',newsstandActivityStillAvailable:true,rows},null,2));console.log(label+': three widths, exact six cards, no preview/overflow, retained discovery and NewsStand activity verified');
}finally{await b.close()}
