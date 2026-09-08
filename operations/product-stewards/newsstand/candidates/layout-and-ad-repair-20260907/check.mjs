import fs from 'node:fs'; import assert from 'node:assert/strict';
import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
const b=await chromium.launch({channel:'chrome',headless:true});const results=[];
for(const width of [320,650,800,1280]){
 const p=await b.newPage({viewport:{width,height:1000}});
 await p.route('**/newsstand',r=>r.fulfill({body:fs.readFileSync('newsstand.html'),contentType:'text/html'}));
 await p.route('**/content/newsstand-design.css**',r=>r.fulfill({body:fs.readFileSync('content/newsstand-design.css'),contentType:'text/css'}));
 await p.route('**/content/newsstand-crossword-preview.svg',r=>r.fulfill({body:fs.readFileSync('content/newsstand-crossword-preview.svg'),contentType:'image/svg+xml'}));
 await p.goto('https://laidies.ai/newsstand',{waitUntil:'domcontentloaded'});await p.locator('.ns-luminairy__story').waitFor();await p.locator('.ns-publication__headline').first().waitFor();await p.evaluate(()=>document.fonts.ready);
 const overlap=await p.locator('.ns-luminairy__profile').evaluate(el=>{const nodes=[...el.children].filter(x=>x.getBoundingClientRect().height>0);return nodes.flatMap((a,i)=>nodes.slice(i+1).flatMap(b=>{const x=a.getBoundingClientRect(),y=b.getBoundingClientRect();return Math.min(x.right,y.right)-Math.max(x.left,y.left)>1&&Math.min(x.bottom,y.bottom)-Math.max(x.top,y.top)>1?[[a.className,b.className]]:[]}));});
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 for(const [name,sel] of [['weekly','.ns-front-desk--weekly'],['big','.ns-front-desk--big-picture'],['lum','.ns-luminairy'],['play','.ns-play-desk'],['wit','.ns-overheard']]){await p.locator(sel).scrollIntoViewIfNeeded();await p.locator(sel).locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))));await p.locator(sel).screenshot({style:'.topbar,.skip-link{visibility:hidden!important}',path:`/tmp/ns-layout-repair/after-${name}-${width}.png`});}
 results.push({width,overlap,overflow});await p.close();
}await b.close();fs.writeFileSync('/tmp/ns-layout-repair/check.json',JSON.stringify(results,null,2));console.log(results);
