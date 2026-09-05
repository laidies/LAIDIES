const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin=process.env.TRYON_ORIGIN || 'https://laidies.ai';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=process.argv[2];
const html=source?fs.readFileSync(source,'utf8'):null;
const out=process.env.TRYON_EVIDENCE_DIR||'/tmp/laidies-tryon-check';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
const results=[];
try {
 for(const width of [1440,390,320]) {
  const context=await browser.newContext({viewport:{width,height:900}});
  if(html) await context.route(`${origin}/try-on.html*`,r=>r.fulfill({status:200,contentType:'text/html',body:html}));
  const page=await context.newPage();
  await page.goto(`${origin}/try-on.html?issue=4&from=blend-snap`,{waitUntil:'domcontentloaded',timeout:30000});
  await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${out}/episode04-${width}.png`,fullPage:true});
  assert.match(await page.locator('#tryonLede').innerText(),/field trip/i,'Episode04 introduction must describe its actual field trip');
  const visible=await page.locator('main').innerText();
  assert.doesNotMatch(visible,/two prompts|One task\. One before|How much better did it get|five-minute fit check|apply it to actual work|butterfly-clip rating/i,'Episode04 must not promise a prompt comparison or output improvement rating');
  assert.equal(await page.locator('#tryonRating').isVisible(),false);
  assert.equal(await page.locator('#tryonPromptBlock').isVisible(),false);
  assert.equal(await page.locator('#receiptSaveFields').isVisible(),false);
  const trip=page.locator('#tryonDestination');assert.equal(await trip.getAttribute('href'),'/luminairy.html#mavens');
  assert.equal(await page.locator('[data-wednesday-return]').getAttribute('href'),'/blend-snap.html#the-study-pack');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,`No document overflow at ${width}`);
  await page.locator('#saveButton').click();
  assert.match(await page.locator('#saveStatus').innerText(),/Add her name/);
  assert.equal(await page.evaluate(()=>localStorage.getItem('laidiesWednesdayRitualVisits')),null,'Blank note cannot complete activity');
  const note='A new name, and one thing I learned to share with a friend.';
  await page.locator('#tryonNotes').fill(note);await page.locator('#saveButton').click();
  const record=await page.evaluate(()=>JSON.parse(localStorage.getItem('laidiesWednesdayTryOnNotes'))['issue-04']);
  assert.equal(record.notes,note);assert.equal('rating' in record,false,'New field-trip notes must not receive an invented rating');
  await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.locator('#tryonNotes').inputValue(),note);
  await page.evaluate(()=>{const m=JSON.parse(localStorage.getItem('laidiesWednesdayTryOnNotes'));m['issue-04']={...m['issue-04'],rating:8,ratingDescription:'Actually useful.',answerToCheck:'Legacy work',customField:'Preserve me'};localStorage.setItem('laidiesWednesdayTryOnNotes',JSON.stringify(m));});
  await page.reload({waitUntil:'domcontentloaded'});await page.locator('#tryonNotes').fill(note+' Updated.');await page.locator('#saveButton').click();
  const legacy=await page.evaluate(()=>JSON.parse(localStorage.getItem('laidiesWednesdayTryOnNotes'))['issue-04']);
  assert.equal(legacy.rating,8);assert.equal(legacy.answerToCheck,'Legacy work');assert.equal(legacy.customField,'Preserve me');
  await trip.click();await page.waitForURL(u=>/^\/luminairy(?:\.html)?$/.test(u.pathname)&&u.hash==='#mavens',{waitUntil:'domcontentloaded'});await page.locator('#tab-mavens[aria-selected="true"]').waitFor({timeout:20000});
  assert.match(await page.locator('#tab-mavens').innerText(),/MAiVENS/i);assert.equal(await page.locator('#lumPanel').isVisible(),true);
  await page.goBack({waitUntil:'domcontentloaded'});assert.equal(await page.locator('#tryonNotes').inputValue(),note+' Updated.');
  await page.locator('.tryon-portal-note a').click();await page.waitForURL(u=>/^\/blend-snap(?:\.html)?$/.test(u.pathname)&&u.hash==='#the-study-pack',{waitUntil:'domcontentloaded'});
  results.push({width,episode04:'PASS',saveReloadLegacyData:'PASS',liveMavensRoute:'PASS',blendReturn:'PASS'});
  for(const issue of [2,3]) {
   await page.goto(`${origin}/try-on.html?issue=${issue}&from=blend-snap`,{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('#tryonRating').isVisible(),true);
   assert.equal(await page.locator('#tryonDestination').isVisible(),false);
   assert.equal(await page.locator('#receiptSaveFields').isVisible(),issue===3);
   assert.equal(await page.locator('#tryonPromptBlock').isVisible(),issue===3);
   if(issue===2) assert.match(await page.locator('#tryonLede').innerText(),/two prompts/);
   if(issue===3) {await page.locator('#sampleAnswerButton').click();assert.match(await page.locator('#answerToCheck').inputValue(),/July could work/);}
   await page.locator('#tryonNotes').fill(`Episode ${issue} saved check`);await page.locator('#tryonRating').fill('7');await page.locator('#saveButton').click();await page.reload({waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('#tryonNotes').inputValue(),`Episode ${issue} saved check`);assert.equal(await page.locator('#tryonRating').inputValue(),'7');
   results.push({width,issue,controlsAndSave:'PASS'});
  }
  await context.close();
 }
 fs.writeFileSync(`${out}/browser-results.json`,JSON.stringify({mode:html?'candidate HTML on live dependencies':'public live',source,results},null,2)+'\n');
 console.log(JSON.stringify(results));
} finally {await browser.close();}
