import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const root=process.cwd(),out=root+'/operations/product-stewards/town-entry-homepage/candidates/women-wide-spacing-20260907';
const origin=process.env.WOMEN_ORIGIN||'https://bd93f9fb.laidies-sunnyvaile.pages.dev',hosted=!!process.env.WOMEN_ORIGIN;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const rows=[];
try {
  for(const kind of hosted?['hosted']:['parent','candidate'])for(const width of [1440,1920,2560,1074,390]) {
    const p=await browser.newPage({viewport:{width,height:1800},reducedMotion:'reduce'});
    if(kind==='candidate')await p.route(origin+'/',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(root+'/index.html')}));
    await p.goto(origin+'/#why-laidies-title',{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    await p.locator('.why-laidies>figure>img').evaluate(i=>i.decode());
    await p.locator('.why-laidies').scrollIntoViewIfNeeded();
    const data=await p.evaluate(()=>{
      const s=document.querySelector('.why-laidies'),copy=s.querySelector(':scope>div:not(.why-links)'),img=s.querySelector('figure>img');
      const rect=e=>{let r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right}};
      const type=e=>{let c=getComputedStyle(e);return {font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,spacing:c.letterSpacing,colour:c.color}};
      return {overflow:document.documentElement.scrollWidth>innerWidth,section:rect(s),image:rect(img),figure:rect(s.querySelector('figure')),copy:rect(copy),footer:rect(s.querySelector('.why-links')),asset:img.getAttribute('src'),decoded:img.complete&&img.naturalWidth>0,bodyType:type(copy.querySelector('p:not(.eyebrow)')),text:[...copy.querySelectorAll('p:not(.women-subheading)')].map(p=>p.textContent.replace(/\s+/g,' ').trim()).filter(t=>!t.startsWith('Inside the LUMINA')),links:[...s.querySelectorAll('a')].map(a=>[a.textContent,a.getAttribute('href')]),headings:[...s.querySelectorAll('.women-subheading')].map(h=>({text:h.textContent,type:type(h),rect:rect(h)})),quote:s.querySelector('blockquote').textContent};
    });
    Object.assign(data,{kind,width,gap:Math.abs(data.figure.bottom-data.copy.bottom)});
    assert(!data.overflow&&data.decoded);
    if(kind!=='parent') {
      assert.equal(data.headings.length,2);assert.equal(data.headings[0].text,'IT WAS WOMEN ALL ALONG');
      assert.deepEqual(data.headings[0].type,data.headings[1].type);
      assert.notEqual(data.headings[0].type.colour,data.bodyType.colour);
      if(width>=1200)assert(data.gap<90,`Wide column gap ${width}: ${data.gap}`);
    }
    await p.locator('.why-laidies').screenshot({path:`${out}/${kind}-${width}.png`});rows.push(data);await p.close();
  }
  if(!hosted)for(const width of [1440,1920,2560,1074,390]) {
    const a=rows.find(r=>r.kind==='parent'&&r.width===width),b=rows.find(r=>r.kind==='candidate'&&r.width===width);
    for(const k of ['text','links','quote','asset'])assert.deepEqual(a[k],b[k]);
    assert.equal(a.bodyType.font,b.bodyType.font);
    if(width<1200){assert.equal(a.image.width,b.image.width);assert.deepEqual(a.bodyType,b.bodyType);}
  }
  const oldGapRejected=hosted?JSON.parse(fs.readFileSync(out+'/checks.json')).oldGapRejected:rows.some(r=>r.kind==='parent'&&r.width===1920&&r.gap>=90);
  assert(oldGapRejected,'Known wide gap must fail the 90px criterion');
  fs.writeFileSync(out+'/'+(hosted?'hosted-checks.json':'checks.json'),JSON.stringify({status:'PASS',sourceSha:crypto.createHash('sha256').update(fs.readFileSync(root+'/index.html')).digest('hex'),oldGapRejected,rows},null,2)+'\n');
  console.log('Five widths checked: gap below 90px on wide screens; smaller image widths and body type preserved; both subheadings match; copy, art and links preserved. Original wide gap rejected.');
} finally {await browser.close()}
