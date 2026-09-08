import fs from 'node:fs'; import assert from 'node:assert/strict';
import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
const b=await chromium.launch({channel:'chrome',headless:true});const results=[];
for(const width of [320,650,800,1280]){
 const p=await b.newPage({viewport:{width,height:1000}});
 await p.goto('https://laidies.ai/newsstand?v=b0e9d90',{waitUntil:'domcontentloaded'});await p.locator('.ns-luminairy__story').waitFor();await p.locator('.ns-publication__headline').first().waitFor();await p.evaluate(()=>document.fonts.ready);
 const overlap=await p.locator('.ns-luminairy__profile').evaluate(el=>{const nodes=[...el.children].filter(x=>x.getBoundingClientRect().height>0);return nodes.flatMap((a,i)=>nodes.slice(i+1).flatMap(b=>{const x=a.getBoundingClientRect(),y=b.getBoundingClientRect();return Math.min(x.right,y.right)-Math.max(x.left,y.left)>1&&Math.min(x.bottom,y.bottom)-Math.max(x.top,y.top)>1?[[a.className,b.className]]:[]}));});
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 for(const [name,sel] of [['weekly','.ns-front-desk--weekly'],['big','.ns-front-desk--big-picture'],['lum','.ns-luminairy'],['play','.ns-play-desk'],['wit','.ns-overheard']]){await p.locator(sel).scrollIntoViewIfNeeded();await p.locator(sel).locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))));await p.locator(sel).screenshot({style:'.topbar,.skip-link{visibility:hidden!important}',path:`/tmp/ns-layout-repair/live-${name}-${width}.png`});}
 assert.equal(overflow,false);assert.deepEqual(overlap,[]);results.push({width,overlap,overflow});await p.close();
}await b.close();fs.writeFileSync('/tmp/ns-layout-repair/live-check.json',JSON.stringify(results,null,2));console.log(results);