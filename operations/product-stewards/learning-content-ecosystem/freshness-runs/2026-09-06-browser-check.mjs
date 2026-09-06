import fs from 'node:fs';import assert from 'node:assert/strict';
import {chromium} from '/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';
const root='/Users/alisoneakin/Projects/laidies-blend-snap-menu-20260905';
const out=root+'/operations/product-stewards/learning-content-ecosystem/freshness-runs/2026-09-06-browser';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const records=[];
try{for(const width of [1280,390]){
 const c=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const manifest=await(await c.request.get('https://laidies.ai/content/blend-snap-weekly-packs.json')).json();
 for(const pack of manifest.packs){
  await p.goto('https://laidies.ai/blend-snap',{waitUntil:'domcontentloaded'});await p.locator('#bsOrderState:not([disabled])').waitFor();
  await p.locator('[data-drink="Cortado"]').click();
  if(pack.episodeNumber===4)await p.locator('#bsOrderState').click();else{await p.locator('.bs-regulars summary').click();await p.locator(`[data-pack-episode="${pack.episodeNumber}"]`).click();}
  await p.locator('#bsReceipt.is-open').waitFor();assert((await p.locator('#bsReceiptTitle').innerText()).includes(pack.episodeTitle));
  const rows=p.locator('#bsReceiptComponents li');assert.equal(await rows.count(),pack.components.length);
  for(let i=0;i<pack.components.length;i++)assert.equal(await rows.nth(i).locator('a').count(),pack.components[i].status==='available'?1:0);
  let geometry=await p.locator('#bsReceiptTitle').boundingBox();assert(geometry.y>60,JSON.stringify(geometry));assert(await p.evaluate(()=>document.documentElement.scrollWidth)<=width);
  if(pack.episodeNumber===4){await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:out+`/receipt-${width}.png`});}
  const rec={width,episode:pack.episodeNumber,receiptText:await p.locator('#bsReceipt').innerText(),heldUnlinked:true,receiptTitleTop:geometry.y,activity:null};
  const activity=pack.components.find(x=>x.status==='available');
  if(activity){await p.locator('#bsReceiptComponents a').click();await p.locator('#tryonNotes').waitFor();rec.activity={url:p.url(),instructions:await p.locator('main').innerText()};
   const synthetic=`Synthetic freshness review only, Episode ${pack.episodeNumber}. No personal information.`;await p.locator('#tryonNotes').fill(synthetic);await p.locator('#saveButton').click();await p.reload({waitUntil:'domcontentloaded'});assert.equal(await p.locator('#tryonNotes').inputValue(),synthetic);rec.activity.deviceLocalSaveReload=true;
   if(pack.episodeNumber===3){await p.locator('#sampleAnswerButton').click();rec.activity.miniExample=await p.locator('#answerToCheck').inputValue();assert(rec.activity.miniExample.includes('July'));}
   assert(await p.evaluate(()=>document.documentElement.scrollWidth)<=width);
  }
  await p.goto('https://laidies.ai'+pack.quizHandoff.route,{waitUntil:'domcontentloaded'});await p.locator('input[type=radio]:visible').first().waitFor();rec.quiz={url:p.url(),intro:await p.locator('main').innerText()};assert(rec.quiz.intro.includes('EPISODE '+String(pack.episodeNumber).padStart(2,'0')));
  let count=0;while(await p.locator('#quizNextQuestion').isVisible()){
   await p.locator('label.quiz-option:visible').first().click();count++;await p.locator('#quizNextQuestion').click();if(count>20)throw new Error('Quiz does not finish');
  }
  await p.locator('label.quiz-option:visible').first().click();count++;await p.locator('#quizSubmitButton').click();
  rec.quiz.selectionActions=count;rec.quiz.questionsAnswered=await p.locator('#quizQuestions input[type=radio]').evaluateAll(inputs=>new Set(inputs.map(input=>input.name)).size);rec.quiz.result=await p.locator('#quizResult').innerText();rec.quiz.reviewText=await p.locator('main').innerText();
  assert(rec.quiz.reviewText.includes('correct')||rec.quiz.reviewText.includes('Correct')||rec.quiz.reviewText.includes('score'));
  assert(await p.evaluate(()=>document.documentElement.scrollWidth)<=width);
  if(pack.episodeNumber===4)await p.screenshot({path:out+`/quiz-result-${width}.png`});records.push(rec);console.log('Reviewed live pack',pack.episodeNumber,width);
 }
 assert.deepEqual(errors,[]);await c.close();
}}catch(e){fs.writeFileSync(out+'/failure.json',JSON.stringify({message:e.message,stack:e.stack},null,2));throw e;}finally{await browser.close();fs.writeFileSync(out+'/observations.json',JSON.stringify({reviewDate:'2026-09-06',origin:'https://laidies.ai',syntheticDeviceLocalDataOnly:true,records},null,2)+'\n');}
