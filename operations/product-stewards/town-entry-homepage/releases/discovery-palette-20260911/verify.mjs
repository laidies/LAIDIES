import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
const dir=decodeURIComponent(new URL('.',import.meta.url).pathname).replace(/\/$/,''),origin=process.argv[2]||'https://laidies.ai',label=process.argv[3]||'pilot',strip=s=>s.replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/[\s\S]*?<\/script>\s*/g,'');
const b=await chromium.launch({channel:'chrome',headless:true}),rows=[];
try{
 if(label==='pilot'){
 const p=await b.newPage();const r=await p.goto(origin+'/',{waitUntil:'domcontentloaded'});const before=strip((await r.body()).toString());fs.writeFileSync(dir+'/before.html',before);assert(!before.includes('discovery-palette-pink-blue'));
 const css=fs.readFileSync(dir+'/palette.css','utf8'),style='<style id="discovery-palette-pink-blue">\n'+css+'</style>\n';const candidate=before.replace('</head>',style+'</head>');assert.equal(candidate.replace(style,''),before);fs.writeFileSync(dir+'/index.html',candidate);await p.close();
 }
 const expected=fs.readFileSync(dir+'/index.html','utf8');
 for(const width of [390,960,1440]){
 let incumbent;
 for(const state of label==='pilot'?['before','candidate']:[label]){
 const p=await b.newPage({viewport:{width,height:1050},reducedMotion:'reduce'});
 if(state==='candidate')await p.route(origin+'/',r=>r.fulfill({status:200,contentType:'text/html',body:expected}));
 const r=await p.goto(origin+'/',{waitUntil:'domcontentloaded'});if(label!=='pilot')assert.equal(strip((await r.body()).toString()),expected);
 await p.evaluate(()=>document.fonts.ready);await p.locator('.dyk-pause').waitFor();if(await p.locator('.dyk-pause').textContent()==='Pause')await p.locator('.dyk-pause').click();
 await p.locator('[data-dyk]').evaluate(n=>scrollTo({top:n.getBoundingClientRect().top+scrollY-95,behavior:'instant'}));
 await p.evaluate(async()=>{const urls=new Set();for(const n of [document.body,document.querySelector('[data-dyk]'),document.querySelector('#dyk-title'),document.querySelector('#today')])for(const pseudo of [null,'::before','::after']){const s=getComputedStyle(n,pseudo);for(const v of [s.backgroundImage,s.maskImage])for(const m of v.matchAll(/url\("?([^"\)]+)"?\)/g))urls.add(m[1]);}await Promise.all([...urls].map(async src=>{const i=new Image();i.src=src;await i.decode().catch(()=>{})}));await Promise.all([...document.querySelectorAll('[data-dyk] img')].map(i=>i.decode().catch(()=>{})))});
 await p.waitForTimeout(400);
 const row=await p.evaluate(()=>{const q=s=>document.querySelector(s),cs=s=>getComputedStyle(q(s));return{width:innerWidth,banner:cs('[data-dyk]').backgroundImage,bannerPattern:getComputedStyle(q('[data-dyk]'),'::before').backgroundImage,patternBlend:getComputedStyle(q('[data-dyk]'),'::before').mixBlendMode,copy:cs('.dyk-title').color,link:cs('.dyk-cta').color,heading:cs('#dyk-title').color,stroke:cs('#dyk-title').webkitTextStrokeWidth,burst:getComputedStyle(q('#dyk-title'),'::after').backgroundColor,today:cs('#today').backgroundImage,eyebrow:cs('#today .eyebrow').color,todayHeading:cs('#intent-title').color,overflow:document.documentElement.scrollWidth>innerWidth+1,wallpaper:cs('body').backgroundImage,geometry:['[data-dyk]','#dyk-title','#today','.intent-grid-5'].map(s=>({selector:s,w:q(s).offsetWidth,h:q(s).offsetHeight})),slides:[...document.querySelectorAll('[data-dyk-slide]')].map(n=>({text:n.textContent,href:n.getAttribute('href'),images:[...n.querySelectorAll('img')].map(i=>i.getAttribute('src'))})),cards:q('.intent-grid-5').innerHTML,preview:!!q('[data-daily-activity-preview]')}});
 function paletteCheck(){assert(row.banner.includes('25, 73, 195'),'old dark-purple banner retained');assert.equal(row.copy,'rgb(125, 226, 194)');assert.equal(row.link,'rgb(183, 228, 43)');assert(row.today.startsWith('linear-gradient(rgb(242, 84, 169)'),'pink must start needs section');assert(!row.today.includes('255, 155, 61'));}
 if(state==='before'){incumbent=row;assert.throws(paletteCheck,/old dark-purple banner/);}else{paletteCheck();if(incumbent){assert.deepEqual(row.geometry,incumbent.geometry);assert.deepEqual(row.slides,incumbent.slides);assert.equal(row.cards,incumbent.cards);}assert.equal(row.heading,'rgb(242, 84, 169)');assert.equal(row.stroke,'2px');assert.equal(row.burst,'rgb(183, 228, 43)');assert(!row.preview);assert(!row.overflow);assert(row.wallpaper.includes('rewind-wallpaper-20260906.webp'));const current=()=>p.locator('[data-dyk-slide]:not([hidden])').textContent(),first=await current();await p.locator('[data-dyk-next]').click();assert.notEqual(await current(),first);await p.locator('[data-dyk-prev]').click();assert.equal(await current(),first);}
 await p.screenshot({path:`${dir}/${state}-${width}.png`});rows.push({state,...row});await p.close();
 }
 }
 fs.writeFileSync(`${dir}/${label}-checks.json`,JSON.stringify({origin,rows},null,2));console.log(label+': palette, exact geometry/content/assets, controls and no preview verified at three widths');
}finally{await b.close()}
