import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=process.cwd();const origin=process.env.TRYON_ORIGIN||'https://laidies.ai';
const output=process.env.TRYON_EVIDENCE_DIR||'/tmp/laidies-social-check';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const files={'/try-on':'try-on.html','/try-on.html':'try-on.html','/content/try-on-social.css':'content/try-on-social.css','/content/site/try-on-social.js':'content/site/try-on-social.js','/content/site/social-zip.js':'content/site/social-zip.js'};
const results=[];
async function setup(width,{fontFailure=false,shareMode='abort',clipboardDenied=false}={}){
 const context=await browser.newContext({viewport:{width,height:1000},acceptDownloads:true});
 await context.addInitScript(({fontFailure,shareMode,clipboardDenied})=>{
  if(!localStorage.getItem('laidiesWednesdayTryOnNotes')) localStorage.setItem('laidiesWednesdayTryOnNotes',JSON.stringify({'issue-04':{notes:'My private saved note',rating:8,customField:'Preserve me'}}));
  if(!localStorage.getItem('laidiesWednesdayRitualVisits')) localStorage.setItem('laidiesWednesdayRitualVisits','{"saved-before":true}');
  if(shareMode==='unsupported'){
   Object.defineProperty(navigator,'canShare',{value:()=>false});
   Object.defineProperty(navigator,'share',{value:undefined});
  }else{
   Object.defineProperty(navigator,'canShare',{value:()=>true});
   Object.defineProperty(navigator,'share',{value:async(data)=>{window.shareCall={file:data.files[0].name,fileCount:data.files.length,type:data.files[0].type,size:data.files[0].size};if(shareMode==='abort')throw new DOMException('Cancelled','AbortError');if(shareMode==='fail')throw new Error('Share failed');}});
  }
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{if(clipboardDenied)throw new DOMException('Denied','NotAllowedError');window.copiedCaption=text;}}});
  if(fontFailure)document.fonts.load=async()=>{throw new Error('font unavailable');};
 },{fontFailure,shareMode,clipboardDenied});
 if(process.env.TRYON_LIVE!=='1') await context.route(`${origin}/**`,route=>{const f=files[new URL(route.request().url()).pathname];return f?route.fulfill({status:200,contentType:f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':'text/html',body:fs.readFileSync(f==='try-on.html'&&process.argv[2]?process.argv[2]:f==='content/site/try-on-social.js'&&process.env.TRYON_SOCIAL_JS_PATH?process.env.TRYON_SOCIAL_JS_PATH:path.join(root,f))}):route.continue();});
 return context;
}
try{
 for(const width of [1440,390,320]){
  const ctx=await setup(width);const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(origin+'/try-on?issue=4&from=blend-snap',{waitUntil:'domcontentloaded'});
  await p.locator('#socialDownload:not([disabled])').waitFor({timeout:30000});
  const skip=p.locator('.svgh-skip');
  await skip.focus();await skip.press('Enter');
  assert.equal(await skip.getAttribute('href'),'#mavenSocial');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'mavenSocial','Skip link must focus the visible Episode04 main');
  await p.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
  await p.locator('.svgh-skip').evaluate(e=>Promise.all(e.getAnimations().map(a=>a.finished)));
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
   assert.equal(await p.locator('#socialSize').innerText(),`${format==='post'?'Post · 1080 × 1350':'Story · 1080 × 1920'} · Image 1 of 3`);
   const imageDownloads=[];
   for(const slide of [0,1,2]){
    await p.locator(`[data-social-slide="${slide}"]`).click();
    assert.equal(await p.locator('#socialSize').innerText(),`${format==='post'?'Post · 1080 × 1350':'Story · 1080 × 1920'} · Image ${slide+1} of 3`);
    assert.match(await p.locator('#socialTranscript').textContent(),/IMAGE 1 OF 3/);
    const [download]=await Promise.all([p.waitForEvent('download'),p.locator('#socialDownload').click()]);
    assert.equal(download.suggestedFilename(),`laidies-karen-sparck-jones-${format}-${slide+1}.png`);
    const dest=`${output}/${format}-${width}-${slide+1}.png`;await download.saveAs(dest);imageDownloads.push(dest);
    const bytes=fs.readFileSync(dest);assert.equal(bytes.readUInt32BE(16),1080);assert.equal(bytes.readUInt32BE(20),format==='post'?1350:1920);assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
   }
   const [zipDownload]=await Promise.all([p.waitForEvent('download'),p.locator('#socialDownloadAll').click()]);
   assert.equal(zipDownload.suggestedFilename(),`laidies-karen-sparck-jones-${format}.zip`);
   const zipDest=`${output}/${format}-${width}.zip`;await zipDownload.saveAs(zipDest);assert.equal(fs.readFileSync(zipDest).subarray(0,4).toString('hex'),'504b0304');
   const names=JSON.parse(execFileSync('python3',['-c',`import json,zipfile,sys
z=zipfile.ZipFile(sys.argv[1]); assert z.testzip() is None
names=z.namelist(); assert names==[f'laidies-karen-sparck-jones-${format}-' + str(i) + '.png' for i in range(1,4)]
for i,path in enumerate(sys.argv[2:],1): assert z.read(names[i-1]) == open(path,'rb').read()
print(json.dumps(names))`,zipDest,...imageDownloads],{encoding:'utf8'}));
   assert.deepEqual(names,[`laidies-karen-sparck-jones-${format}-1.png`,`laidies-karen-sparck-jones-${format}-2.png`,`laidies-karen-sparck-jones-${format}-3.png`]);
   await p.locator('[data-social-slide="0"]').click();await p.locator('#socialShare').click();assert.match(await p.locator('#socialStatus').innerText(),/cancelled/);assert.equal((await p.evaluate(()=>window.shareCall)).fileCount,3);
   if(format==='story')await p.screenshot({path:`${output}/story-page-${width}.png`,fullPage:true});
  }
  await p.locator('.social-caption summary').click();
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
  assert.deepEqual(errors,[]);results.push({width,postAndStory:'downloaded three valid PNGs in both formats',zip:'signature, names and extracted bytes verified',shareCancellation:'preserved',sharedFileCount:3,caption:'copied',privateData:'untouched',otherEpisodes:'controls and saves retained',skipLink:'focused visible social content'});await ctx.close();
 }
 const ctx=await setup(390,{fontFailure:true});const p=await ctx.newPage();await p.goto(origin+'/try-on?issue=4',{waitUntil:'domcontentloaded'});await p.locator('#socialRetry:visible').waitFor();assert.equal(await p.locator('#socialDownload').isDisabled(),true);assert.match(await p.locator('#socialStatus').innerText(),/try again/);assert.equal(await p.locator('.social-source a').first().isVisible(),true);results.push({fontFailure:'honest retry, no wrong-font export'});await ctx.close();
 const noShare=await setup(390,{shareMode:'unsupported'});const noSharePage=await noShare.newPage();await noSharePage.goto(origin+'/try-on?issue=4',{waitUntil:'domcontentloaded'});await noSharePage.locator('#socialDownload:not([disabled])').waitFor();assert.equal(await noSharePage.locator('#socialShare').isVisible(),false);assert.equal(await noSharePage.locator('#socialDownload').isDisabled(),false);results.push({noFileSharing:'download remains available; share control is hidden'});await noShare.close();
 const shareFailure=await setup(390,{shareMode:'fail'});const shareFailurePage=await shareFailure.newPage();await shareFailurePage.goto(origin+'/try-on?issue=4',{waitUntil:'domcontentloaded'});await shareFailurePage.locator('#socialDownload:not([disabled])').waitFor();await shareFailurePage.locator('#socialShare').click();assert.match(await shareFailurePage.locator('#socialStatus').innerText(),/isn.t available here.*Download image instead/i);assert.equal(await shareFailurePage.locator('#socialDownload').isDisabled(),false);results.push({shareRejection:'download fallback is offered'});await shareFailure.close();
 const clipboardFailure=await setup(390,{clipboardDenied:true});const clipboardFailurePage=await clipboardFailure.newPage();await clipboardFailurePage.goto(origin+'/try-on?issue=4',{waitUntil:'domcontentloaded'});await clipboardFailurePage.locator('#socialDownload:not([disabled])').waitFor();await clipboardFailurePage.locator('.social-caption summary').click();await clipboardFailurePage.locator('#socialCopy').click();assert.equal(await clipboardFailurePage.locator('#socialCaptionFallback').isVisible(),true);assert.match(await clipboardFailurePage.locator('#socialStatus').innerText(),/Automatic copy was blocked/);assert.equal(await clipboardFailurePage.locator('#socialCaptionFallback').inputValue(),await clipboardFailurePage.locator('#socialCaption').innerText());assert.equal(await clipboardFailurePage.locator('#socialCaptionFallback').evaluate(e=>e.selectionStart===0&&e.selectionEnd===e.value.length),true);results.push({clipboardDenied:'caption fallback is visible, populated and selected'});await clipboardFailure.close();
 const rapidSwitch=await setup(390);const rapidSwitchPage=await rapidSwitch.newPage();await rapidSwitchPage.goto(origin+'/try-on?issue=4',{waitUntil:'domcontentloaded'});await rapidSwitchPage.locator('#socialDownload:not([disabled])').waitFor();await rapidSwitchPage.evaluate(()=>{document.querySelector('[data-social-format="story"]').click();document.querySelector('[data-social-format="post"]').click();});await rapidSwitchPage.locator('#socialDownload:not([disabled])').waitFor();assert.equal(await rapidSwitchPage.locator('#socialSize').innerText(),'Post · 1080 × 1350 · Image 1 of 3');assert.equal(await rapidSwitchPage.locator('[data-social-format="post"]').getAttribute('aria-pressed'),'true');assert.equal(await rapidSwitchPage.locator('[data-social-format="story"]').getAttribute('aria-pressed'),'false');const [latestDownload]=await Promise.all([rapidSwitchPage.waitForEvent('download'),rapidSwitchPage.locator('#socialDownload').click()]);assert.equal(latestDownload.suggestedFilename(),'laidies-karen-sparck-jones-post-1.png');results.push({rapidSwitch:'latest Post selection controls the export'});await rapidSwitch.close();
 fs.writeFileSync(`${output}/browser-results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await browser.close();}
