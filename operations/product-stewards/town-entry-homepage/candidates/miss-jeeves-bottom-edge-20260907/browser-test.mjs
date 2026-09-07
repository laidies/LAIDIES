import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const root=process.cwd(),out=root+'/operations/product-stewards/town-entry-homepage/candidates/miss-jeeves-bottom-edge-20260907';fs.mkdirSync(out,{recursive:true});
const origin=process.env.EDGE_ORIGIN||'https://ca2efb36.laidies-sunnyvaile.pages.dev',hosted=!!process.env.EDGE_ORIGIN;
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const rows=[];
try {for(const kind of hosted?['hosted']:['parent','candidate'])for(const width of [1440,1074,390]){
const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
if(kind==='candidate')await p.route(origin+'/',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(root+'/index.html','utf8')}));
const response=await p.goto(origin+'/#reference',{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);
if(kind==='parent'&&width===1440)fs.writeFileSync(out+'/parent.html',await response.body());
await p.locator('#reference').scrollIntoViewIfNeeded();await p.locator('.jeeves-corner-cutout').evaluate(i=>i.decode());
const row=await p.evaluate(()=>{const s=document.querySelector('#reference'),i=s.querySelector('img'),f=s.querySelector('form');const rect=e=>{let r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}};const sr=rect(s),ir=rect(i);return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,section:sr,image:ir,handOverlap:ir.bottom-ir.height*(46/660)-sr.bottom,copy:s.innerText,links:[...s.querySelectorAll('a')].map(a=>a.getAttribute('href')),form:rect(f),asset:i.getAttribute('src'),colour:getComputedStyle(s).background,decoded:i.naturalWidth===535}});
row.kind=kind;rows.push(row);assert(!row.overflow&&row.decoded);if(kind!=='parent'&&width>600)assert(row.handOverlap>=7&&row.handOverlap<=15,JSON.stringify(row));
await p.screenshot({path:`${out}/${kind}-${width}.png`,clip:{x:row.section.x,y:row.section.y,width:row.section.width,height:row.section.height+20}});
if(kind!=='parent'&&width===1440){await p.locator('#lookup').fill('What is a context window?');await p.locator('#homepage-jeeves-form button').click();await p.locator('#homepage-jeeves-answer[aria-busy=false]').waitFor();row.answer=(await p.locator('#homepage-jeeves-answer').innerText()).slice(0,500);assert(row.answer.includes('Context window'));row.answerGap=await p.evaluate(()=>{let i=document.querySelector('.jeeves-corner-cutout').getBoundingClientRect(),a=document.querySelector('#homepage-jeeves-answer').getBoundingClientRect();return a.top-(i.bottom-i.height*46/660)});await p.locator('#homepage-jeeves-answer').screenshot({path:out+'/answer-detail.png'}); console.log('Answer boundary gap',row.answerGap); row.answerContentGap=await p.evaluate(()=>{let i=document.querySelector('.jeeves-corner-cutout').getBoundingClientRect(),a=document.querySelector('#homepage-jeeves-answer li').getBoundingClientRect();return a.top-(i.bottom-i.height*46/660)});assert(row.answerContentGap>0);}
await p.close();
}
if(!hosted)for(const old of rows.filter(r=>r.kind==='parent')){const n=rows.find(r=>r.kind==='candidate'&&r.width===old.width);for(const k of ['copy','links','asset','colour'])assert.deepEqual(n[k],old[k]);assert(Math.abs(n.section.height-old.section.height)<1);assert.deepEqual(n.form,old.form);if(old.width===390)assert.deepEqual(n.image,old.image);}
const checks={status:'PASS',sourceSha:crypto.createHash('sha256').update(fs.readFileSync(root+'/index.html')).digest('hex'),oldGapRejected:hosted?undefined:rows.filter(r=>r.kind==='parent'&&r.width>600).every(r=>r.handOverlap<0),rows};
fs.writeFileSync(out+'/'+(hosted?'hosted-checks':'checks')+'.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks));
}finally{await b.close()}
