import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const root=process.cwd(),out=root+'/operations/product-stewards/town-entry-homepage/candidates/discovery-restoration-20260907';
const origin=process.env.DISCOVERY_ORIGIN||'https://5e9a67fd.laidies-sunnyvaile.pages.dev',hosted=!!process.env.DISCOVERY_ORIGIN;
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),rows=[];
try{for(const kind of hosted?['hosted']:['parent','candidate'])for(const width of [1440,390]){
 const p=await b.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});
 if(kind==='candidate'){
  await p.route(origin+'/',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(root+'/index.html')}));
  await p.route('**/assets/**',r=>{const f=root+new URL(r.request().url()).pathname;return fs.existsSync(f)?r.fulfill({path:f}):r.continue()});
 }
 await p.goto(origin+'/#dyk-title',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 const titles=[];for(let i=0;i<8;i++){
  await p.locator('[data-dyk-slide].is-active img').evaluateAll(a=>Promise.all(a.map(i=>i.decode())));
  titles.push(await p.locator('[data-dyk-slide].is-active').innerText());
  await p.getByRole('button',{name:'Next feature',exact:true}).click();
 }
 assert.equal(new Set(titles).size,8);
 await p.getByRole('button',{name:'Previous feature',exact:true}).click();
 assert((await p.locator('[data-dyk-slide].is-active').innerText()).includes('Mall'));
 await p.getByRole('button',{name:'Next feature',exact:true}).click();
 await p.locator('.dyk-slim').screenshot({path:`${out}/${kind}-banner-${width}.png`});
 const data=await p.evaluate(()=>{
  const r=e=>{let a=e.getBoundingClientRect();return {width:a.width,height:a.height}};
  const s=e=>{let c=getComputedStyle(e);return {colour:c.color,background:c.backgroundImage,font:c.fontFamily,weight:c.fontWeight}};
  const banner=document.querySelector('.dyk-slim'),intent=document.querySelector('#today');
  return{overflow:document.documentElement.scrollWidth>innerWidth,banner:{rect:r(banner),title:s(banner.querySelector('h2')),background:getComputedStyle(banner).backgroundImage,slides:[...banner.querySelectorAll('[data-dyk-slide]')].map(e=>({text:e.textContent.replace(/\s+/g,' ').trim(),href:e.getAttribute('href'),radio:e.hasAttribute('data-ksvl-start-live'),images:[...e.querySelectorAll('img')].map(i=>i.getAttribute('src')),copy:s(e.querySelector('h3,.dyk-title')),link:s(e.querySelector('.dyk-cta'))}))},shortcuts:[...intent.querySelectorAll('.intent-grid>a')].map(a=>({text:a.textContent.replace(/\s+/g,' ').trim(),href:a.getAttribute('href'),image:a.querySelector('img').getAttribute('src'),rect:r(a)}))};
 });
 Object.assign(data,{kind,width});assert(!data.overflow);
 if(kind!=='parent'){
  assert.equal(data.banner.title.colour,'rgb(242, 84, 169)');
  for(const slide of data.banner.slides){assert.equal(slide.copy.colour,'rgb(255, 115, 102)');assert.equal(slide.link.colour,'rgb(120, 199, 255)');}
 }
 await p.locator('#today').scrollIntoViewIfNeeded();await p.locator('#today img').evaluateAll(a=>Promise.all(a.map(i=>i.decode())));
 await p.locator('#today').screenshot({path:`${out}/${kind}-shortcuts-${width}.png`});rows.push(data);await p.close();
}
if(!hosted)for(const width of[1440,390]){
 const a=rows.find(r=>r.kind==='parent'&&r.width===width),n=rows.find(r=>r.kind==='candidate'&&r.width===width);
 assert.deepEqual(a.banner.rect,n.banner.rect);assert.deepEqual(a.banner.slides.map(({copy,link,...x})=>x),n.banner.slides.map(({copy,link,...x})=>x));
 assert.deepEqual(a.shortcuts.map(({image,...x})=>x),n.shortcuts.map(({image,...x})=>x));
}
const parentOrangeRejected=hosted?JSON.parse(fs.readFileSync(out+'/checks.json')).parentOrangeRejected:rows.filter(r=>r.kind==='parent').every(r=>r.banner.title.colour!=='rgb(242, 84, 169)');assert(parentOrangeRejected);
fs.writeFileSync(out+'/'+(hosted?'hosted-checks.json':'checks.json'),JSON.stringify({status:'PASS',sourceSha:crypto.createHash('sha256').update(fs.readFileSync(root+'/index.html')).digest('hex'),parentOrangeRejected,rows},null,2)+'\n');
console.log('Desktop and phone: pink title, coral copy, sky links; eight decoded features, next/previous controls, unchanged wording/actions and geometry; original orange title rejected.');
}finally{await b.close()}
