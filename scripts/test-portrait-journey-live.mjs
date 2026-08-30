#!/usr/bin/env node
// One opt-in paid photo batch using an AI-generated, non-personal fixture.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const dir=process.env.PORTRAIT_TEST_DIR;
assert.ok(dir && process.env.PORTRAIT_TEST_PAID==='yes');
const account=JSON.parse(fs.readFileSync(path.join(dir,'account.json'),'utf8'));
assert.match(account.email,/^portrait-recovery-\d+@example\.com$/);
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const origin='https://laidies.ai';
async function signIn(page) {
  await page.goto(origin+'/resident-card.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!!window.LAIDIESResidentAccountRuntime);
  await page.evaluate(async credentials=>{
    const runtime=await window.LAIDIESResidentAccountRuntime.get();
    const result=await runtime.client.auth.signInWithPassword(credentials);
    if(result.error) throw new Error('test-sign-in-failed');
  },account);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('#rcAccountSignedIn').waitFor({state:'visible'});
}
async function envelope(page) {return page.evaluate(()=>JSON.parse(localStorage.getItem('laidies_resident_card_v1')));}
async function save(page,name) {
  await page.locator('[data-mo-tool="finish"]').click();
  await page.locator('#moNameInput').fill(name);
  await page.locator('#moSave').click();
  await page.waitForFunction(()=>document.querySelector('#moSaveMsg').textContent.includes('Saved on this device'));
}
async function geometry(page,label){
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,label+' overflow');
  assert.equal(await page.locator('img:visible').evaluateAll(images=>images.filter(i=>i.complete&&!i.naturalWidth).length),0,label+' broken images');
}
try {
  const a=await browser.newContext({viewport:{width:1280,height:900}});
  const b=await browser.newContext({viewport:{width:390,height:844}});
  const first=await a.newPage(), second=await b.newPage();
  const errors=[];
  first.on('requestfailed',request=>{if(request.url().includes('laidies-avatar.')) console.log('AVATAR NETWORK FAILURE '+request.failure()?.errorText);});
  first.on('response',response=>{if(response.url().includes('laidies-avatar.')) console.log('AVATAR HTTP '+response.status());});
  first.on('pageerror',e=>errors.push(e.message)); second.on('pageerror',e=>errors.push(e.message));
  await signIn(first);
  await first.goto(origin+'/maikeover.html',{waitUntil:'domcontentloaded'});
  await first.waitForFunction(()=>document.querySelector('#moPortraitAuth').textContent.includes('Signed in for portraits'));
  await first.locator('input[name="moPortraitMode"][value="photo"]').check();
  await first.locator('#moPhoto').setInputFiles(path.join(dir,'scratch-0.png'));
  await first.locator('#moPhotoConsent').check();
  await first.locator('#moEra button').nth(3).click();
  await first.locator('#moFit button').nth(2).click();
  await first.locator('#moAcc button').nth(0).click();
  await first.locator('#moBackdrop button').nth(0).click();
  console.log('LIVE JOURNEY requesting one photo batch through actual MAiKEOVER controls');
  await first.locator('#moMake').click();
  await first.waitForFunction(()=>!document.querySelector('#moMake').disabled,{},{timeout:190000});
  const status=await first.locator('#moStatus').innerText();
  console.log('LIVE JOURNEY generation status: '+status);
  assert.equal(await first.locator('#moCands button').count(),3,'three live UI portrait choices');
  await first.locator('#moCands button').nth(1).click();
  await first.screenshot({path:path.join(dir,'desktop-selected.png'),fullPage:true});
  await geometry(first,'desktop maker');
  await save(first,'Portrait Journey');
  const original=await envelope(first); assert.match(original.fields.cardAvatarUrl,/^data:image\/jpeg;base64,/);
  fs.writeFileSync(path.join(dir,'selected.jpg'),Buffer.from(original.fields.cardAvatarUrl.split(',')[1],'base64'),{mode:0o600});
  await first.goto(origin+'/resident-card.html',{waitUntil:'domcontentloaded'});
  await first.locator('#rcAccountClaimButton').waitFor({state:'visible'});
  await first.locator('#rcAccountClaimButton').click();
  await first.locator('#rcAccountRestoreButton').waitFor({state:'visible'});
  await signIn(second);
  await second.goto(origin+'/laidies-card.html',{waitUntil:'domcontentloaded'});
  await second.waitForFunction(()=>document.querySelector('#closetPersistenceState').textContent.includes('Account-backed view'));
  assert.deepEqual(await envelope(second),original,'fresh phone-sized browser restores full portrait Card');
  await geometry(second,'phone Closet');
  await second.screenshot({path:path.join(dir,'phone-closet.png'),fullPage:true});
  await first.goto(origin+'/maikeover.html',{waitUntil:'domcontentloaded'});
  await first.locator('#moAvatar img').waitFor({state:'visible'});
  await save(first,'Portrait Updated');
  const updated=await envelope(first);
  await first.goto(origin+'/laidies-card.html',{waitUntil:'domcontentloaded'});
  await first.waitForFunction(()=>document.querySelector('#closetPersistenceState').textContent.includes('different saved Card'));
  assert.deepEqual(await envelope(first),updated,'Closet preserves unsubmitted local edit');
  await first.goto(origin+'/resident-card.html',{waitUntil:'domcontentloaded'});
  await first.locator('#rcAccountUpdateButton').waitFor({state:'visible'});
  await first.locator('#rcAccountUpdateButton').click();
  await first.locator('#rcAccountUpdate').waitFor({state:'hidden'});
  await second.goto(origin+'/resident-card.html',{waitUntil:'domcontentloaded'});
  await second.locator('#rcAccountRestoreButton').click();
  assert.deepEqual(await envelope(second),updated,'explicit account update/restoration preserves selected portrait');
  await first.goto(origin+'/maikeover.html',{waitUntil:'domcontentloaded'});
  await first.waitForFunction(()=>document.querySelector('#moPortraitAuth').textContent.includes('Signed in for portraits'));
  await first.locator('#moDescribe').fill('a fictional adult portrait');
  await first.locator('#moMake').click();
  await first.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('limit has been reached'));
  assert.deepEqual(await envelope(first),updated,'live quota denial preserves Card');
  await first.setViewportSize({width:320,height:800}); await geometry(first,'320px maker');
  await first.setViewportSize({width:390,height:844}); await geometry(first,'390px maker');
  await first.screenshot({path:path.join(dir,'phone-maker.png'),fullPage:true});
  assert.deepEqual(errors,[],'no page exceptions');
  console.log('LIVE PORTRAIT JOURNEY PASS photo=3 choice=1 local_save=1 claim=1 fresh_browser_restore=1 update=1 local_edit_preserved=1 quota=1 desktop_mobile=1');
} finally {await browser.close();}
