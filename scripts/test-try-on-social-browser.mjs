import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=process.cwd();const origin=process.env.TRYON_ORIGIN||'https://laidies.ai';
const output=process.env.TRYON_EVIDENCE_DIR||'/tmp/laidies-social-check';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const files={'/try-on':'try-on.html','/try-on.html':'try-on.html','/content/try-on-social.css':'content/try-on-social.css','/content/site/try-on-social.js':'content/site/try-on-social.js'};
const results=[];
async function setup(width,{fontFailure=false,shareMode='abort'}={}){
 const context=await browser.newContext({viewport:{width,height:1000},acceptDownloads:true});
 await context.addInitScript(({fontFailure,shareMode})=>{
  if(!localStorage.getItem('laidiesWednesdayTryOnNotes')) localStorage.setItem('laidiesWednesdayTryOnNotes',JSON.stringify({'issue-04':{notes:'My private saved note',rating:8,customField:'Preserve me'}}));
  if(!localStorage.getItem('laidiesWednesdayRitualVisits')) localStorage.setItem('laidiesWednesdayRitualVisits','{"saved-before":true}');
  Object.defineProperty(navigator,'canShare',{value:()=>true});
  Object.defineProperty(navigator,'share',{value:async(data)=>{window.shareCall={file:data.files[0].name,type:data.files[0].type,size:data.files[0].size};if(shareMode==='abort')throw new DOMException('Cancelled','AbortError');if(shareMode==='fail')throw new Error('Share failed');}});
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.copiedCaption=text;}}});
  if(fontFailure)document.fonts.load=async()=>{throw new Error('font unavailable');};
 },{fontFailure,shareMode});
 if(process.env.TRYON_LIVE!=='1') await context.route(`${origin}/**`,route=>{const f=files[new URL(route.request().url()).pathname];return f?route.fulfill({status:200,contentType:f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':'text/html',body:fs.readFileSync(f==='try-on.html'&&process.argv[2]?process.argv[2]:path.join(root,f))}):route.continue();});
 return context;
}
try{
 for(const width of [1440,390,320]){
  const ctx=await setup(width);const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(origin+'/try-on?issue=4&from=blend-snap',{waitUntil:'domcontentloaded'});
  await p.locator('#socialDownload:not([disabled])').waitFor({timeout:30000});
  const visible=await p.locator('body').innerText();
  assert.doesNotMatch(visible,/Who did you meet|One name\. One sentence|Save my discovery|Vanity visual held|one woman you wish|Butterfly.clip rating/i);
  assert.equal(await p.locator('#legacyTryOn').isVisible(),false);
  assert.equal(await p.locator('#mavenSocial textarea:visible').count(),0);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  assert.match(await p.locator('#socialTitle').evaluate(e=>getComputedStyle(e).fontFamily),/Jost/);
  assert.equal(await p.locator('#socialTitle').evaluate(e=>getComputedStyle(e).fontWeight),'800');
  if(await p.locator('#socialTitle .ai').count())assert.equal(await p.locator('#socialTitle .ai').evaluate(e=>getComputedStyle(e).color),'rgb(255, 226, 76)');
  assert.match(await p.locator('body').evaluate(e=>getComputedStyle(e).backgroundImage),/108, 124, 209/,'Current periwinkle surface must survive legacy overrides');
  await p.screenshot({path:`${output}/desktop-${width}.png`,fullPage:true});
  for(const format of ['post','story']){
   if(format==='story'){await p.locator('[data-social-format="story"]').click();await p.locator('#socialDownload:not([disabled])').waitFor();}
   const [download]=await Promise.all([p.waitForEvent('download'),p.locator('#socialDownload').click()]);
   assert.equal(download.suggestedFilename(),`laidies-karen-sparck-jones-${format}.png`);
   const dest=`${output}/${format}-${width}.png`;await download.saveAs(dest);
   const bytes=fs.readFileSync(dest);assert.equal(bytes.readUInt32BE(16),1080);assert.equal(bytes.readUInt32BE(20),format==='post'?1350:1920);
   await p.locator('#socialShare').click();assert.match(await p.locator('#socialStatus').innerText(),/cancelled/);
   assert.equal((await p.evaluate(()=>window.shareCall)).file,download.suggestedFilename());
   if(format==='story')await p.screenshot({path:`${output}/story-page-${width}.png`,fullPage:true});
  }
  await p.locator('#socialCopy').click();assert.match(await p.evaluate(()=>window.copiedCaption),/1972/);assert.doesNotMatch(await p.evaluate(()=>window.copiedCaption),/My private/);
  const saved=await p.evaluate(()=>({notes:localStorage.getItem('laidiesWednesdayTryOnNotes'),visits:localStorage.getItem('laidiesWednesdayRitualVisits')}));
  assert.equal(JSON.parse(saved.notes)['issue-04'].customField,'Preserve me');assert.equal(saved.visits,'{"saved-before":true}');
  assert.equal(await p.locator('.social-return').getAttribute('href'),'/blend-snap.html#the-study-pack');
  for(const issue of [2,3]){
   await p.goto(origin+`/try-on?issue=${issue}&from=blend-snap`,{waitUntil:'domcontentloaded'});
   assert.equal(await p.locator('#mavenSocial').isVisible(),false);assert.equal(await p.locator('#tryonRating').isVisible(),true);
   assert.equal(await p.locator('#receiptSaveFields').isVisible(),issue===3);
   if(issue===3){await p.locator('#sampleAnswerButton').click();assert.match(await p.locator('#answerToCheck').inputValue(),/July could work/);}
   await p.locator('#tryonNotes').fill(`Episode ${issue} regression`);await p.locator('#saveButton').click();
   await p.reload({waitUntil:'domcontentloaded'});
   assert.equal(await p.locator('#tryonNotes').inputValue(),`Episode ${issue} regression`);
   assert.equal(await p.evaluate(i=>JSON.parse(localStorage.getItem('laidiesWednesdayTryOnNotes'))[`issue-0${i}`].notes,issue),`Episode ${issue} regression`);
  }
  assert.deepEqual(errors,[]);results.push({width,postAndStory:'downloaded valid PNGs',shareCancellation:'preserved',caption:'copied',privateData:'untouched',otherEpisodes:'controls and saves retained'});await ctx.close();
 }
 const ctx=await setup(390,{fontFailure:true});const p=await ctx.newPage();await p.goto(origin+'/try-on?issue=4',{waitUntil:'domcontentloaded'});await p.locator('#socialRetry:visible').waitFor();assert.equal(await p.locator('#socialDownload').isDisabled(),true);assert.match(await p.locator('#socialStatus').innerText(),/try again/);assert.equal(await p.locator('.social-source a').first().isVisible(),true);results.push({fontFailure:'honest retry, no wrong-font export'});await ctx.close();
 fs.writeFileSync(`${output}/browser-results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await browser.close();}
