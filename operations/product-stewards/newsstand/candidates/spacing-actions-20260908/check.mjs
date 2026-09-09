import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const css=fs.readFileSync('/Users/alisoneakin/Projects/laidies-newsstand-overheard-20260907/content/newsstand-design.css','utf8');
const b=await chromium.launch({channel:'chrome',headless:true});let all=[];
for(const width of [1440,900,390,320])for(const mode of ['before','after']){
 const p=await b.newPage({viewport:{width,height:1000}});
 if(mode==='after')await p.route('**/content/newsstand-design.css*',r=>r.fulfill({contentType:'text/css',body:css}));
 await p.goto('https://laidies.ai/newsstand?v=spacing',{waitUntil:'domcontentloaded'});await p.locator('.ns-luminairy__story').waitFor();await p.waitForTimeout(500);
 await p.locator('.ns-feature-desk img').evaluateAll(a=>a.forEach(i=>i.loading='eager')); await p.locator('.ns-feature-desk img').evaluateAll(a=>Promise.race([Promise.all(a.map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,15000))]));
 const metrics=await p.evaluate(()=>{const box=s=>document.querySelector(s).getBoundingClientRect();const h=box('.ns-feature-desk__head--useful'),g=box('.ns-feature-desk__grid--useful'),l=box('.ns-luminairy');return {gap:g.top-h.bottom,overflow:document.documentElement.scrollWidth>innerWidth,lumGap:l.top-g.bottom,buttons:[...document.querySelectorAll('.ns-service-action')].map(x=>getComputedStyle(x).backgroundColor)}});
 for(const [n,s] of [['useful','.ns-feature-desk__grid--useful'],['lum','.ns-luminairy']])await p.locator(s).screenshot({path:`/tmp/ns-spacing/${mode}-${n}-${width}.png`,style:'.topbar,.skip-link{visibility:hidden!important}'});
 all.push({width,mode,...metrics});await p.close();
}await b.close();fs.writeFileSync('/tmp/ns-spacing/results.json',JSON.stringify(all,null,2));console.log(all);
