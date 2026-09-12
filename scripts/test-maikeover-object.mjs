import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';

// Run from the repository root. Uses installed playwright-core, or set
// PLAYWRIGHT_CORE_PATH to an external playwright-core package directory.
const require=createRequire(import.meta.url);
let playwrightEntry;
try { playwrightEntry=process.env.PLAYWRIGHT_CORE_PATH ? process.env.PLAYWRIGHT_CORE_PATH+'/index.mjs' : require.resolve('playwright-core'); }
catch { throw new Error('Install the repository dev dependencies or set PLAYWRIGHT_CORE_PATH to the playwright-core package directory. No browser/provider work has run.'); }
const {chromium}=await import(pathToFileURL(playwrightEntry));
const root=process.cwd();
const shots=process.env.SHOTS || '/private/tmp/maikeover-photo-picker-review';
fs.mkdirSync(shots,{recursive:true});
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);
  if(!file.startsWith(root+'/')||!fs.existsSync(file)||fs.statSync(file).isDirectory())return res.writeHead(404).end();
  const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg'}[path.extname(file)];
  res.setHeader('Content-Type',type||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const fixture=fs.readFileSync(path.join(root,'assets/puffies/usable-25-images/64-black-pink-cassette.png'));
const fixtureBase64=fixture.toString('base64');
const pngFile={name:'portrait.png',mimeType:'image/png',buffer:fixture};
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
async function makeContext(signedIn, provider){
  const context=await browser.newContext();
  context.setDefaultTimeout(5000);
  await context.addInitScript(({signedIn})=>{
    window.__maikeoverTestSession={current:signedIn?{access_token:'test-token-a',user:{id:'test-user-a',email:'a@example.invalid'}}:null};
    const client={auth:{getSession:async()=>({data:{session:window.__maikeoverTestSession.current}})}};
    window.LAIDIESResidentAccountRuntime={get:async()=>({client})};
  },{signedIn});
  await context.route('**/*',async route=>{
    const url=route.request().url();
    if(url.includes('resident-account-runtime-v1.js'))return route.fulfill({contentType:'text/javascript',body:''});
    if(url.startsWith('https://laidies-avatar.'))return provider(route);
    return url.startsWith(origin)?route.continue():route.abort();
  });
  return context;
}
try{
  const payloads=[]; let photoRequests=0;
  const signedIn=await makeContext(true,async route=>{
    payloads.push(JSON.parse(route.request().postData()||'{}')); photoRequests++;
    if(photoRequests===1)return route.fulfill({status:503,headers:{'access-control-allow-origin':'*'},contentType:'application/json',body:JSON.stringify({error:'mock outage'})});
    if(photoRequests===2)return route.fulfill({status:200,headers:{'access-control-allow-origin':'*'},contentType:'application/json',body:JSON.stringify({images:['deliberately-not-base64']})});
    return route.fulfill({status:200,headers:{'access-control-allow-origin':'*'},contentType:'application/json',body:JSON.stringify({images:[fixtureBase64]})});
  });
  const page=await signedIn.newPage(); await page.goto(origin+'/maikeover.html'); await page.locator('[data-mo-tool="portrait"]').click();
  await page.evaluate(()=>{ window.__maikeoverTestAccount={saves:0}; window.LAIDIESMaikeoverAccount={beforeSave:async()=>({id:window.__maikeoverTestSession.current.user.id}),validateSession:async()=>{},save:async()=>{window.__maikeoverTestAccount.saves++;}}; });
  assert.equal(await page.locator('#moDescribe, #moDescriptionPanel, input[value="scratch"][name="moPortraitMode"]').count(),0,'description mode is absent');
  assert.equal(await page.locator('input[name="moHair"]:checked').count(),0,'neither hair option is preselected');
  await page.locator('#moPhoto').setInputFiles(pngFile); await page.locator('#moMake').click();
  await page.waitForFunction(()=>!document.querySelector('#moHairError').hidden);
  assert.equal(payloads.length,0,'missing hair choice makes no provider call'); assert.equal(await page.locator('#moPhoto').evaluate(el=>el.files.length),1,'missing hair choice retains the file');
  await page.locator('input[name="moHair"][value="keep"]').check(); await page.locator('#moMake').click();
  await page.waitForFunction(()=>!document.querySelector('#moPhotoConsentError').hidden);
  assert.equal(payloads.length,0,'missing permission makes no provider call'); assert.equal(await page.locator('#moPhoto').evaluate(el=>el.files.length),1,'missing permission retains the file');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'moPhotoConsent','missing permission receives focus');
  await page.locator('#moPhotoConsent').check(); await page.locator('#moMake').click();
  await page.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('temporarily unavailable'));
  assert.equal(payloads.length,1,'provider failure was mocked once'); assert.equal(payloads[0].hair,'keep','photo payload carries explicit hair');
  assert.match(payloads[0].image,/^data:image\/jpeg;base64,/,'photo payload carries a resized raster'); assert.equal(await page.locator('#moPhoto').evaluate(el=>el.files.length),1,'provider failure retains the file');
  await page.locator('#moMake').click(); await page.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('could not be read'));
  assert.equal(await page.locator('#moCands button').count(),0,'deliberately malformed provider response creates no candidate');
  assert.equal(await page.locator('#moPhoto').evaluate(el=>el.files.length),1,'malformed provider response retains the file');
  await page.locator('#moMake').click(); await page.waitForFunction(()=>document.querySelectorAll('#moCands button').length===1);
  const preview=`data:image/png;base64,${fixtureBase64}`;
  assert.equal(await page.locator('#moCands img').getAttribute('src'),preview,'candidate preview preserves the full provider raster');
  await page.evaluate(()=>{window.__maikeoverTestSession.current={access_token:'test-token-b',user:{id:'test-user-b',email:'b@example.invalid'}};});
  await page.locator('#moCands button').click(); await page.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('sign-in changed'));
  assert.equal(await page.locator('#moCands button').count(),0,'a delayed photo selection is discarded after an account change');
  assert.equal(await page.locator('#moAvatar img').count(),0,'a stale photo candidate does not update the preview');
  await page.evaluate(()=>{window.__maikeoverTestSession.current={access_token:'test-token-a',user:{id:'test-user-a',email:'a@example.invalid'}};});
  await page.locator('#moPhoto').setInputFiles(pngFile); await page.locator('#moPhotoConsent').check(); await page.locator('#moMake').click(); await page.waitForFunction(()=>document.querySelectorAll('#moCands button').length===1);
  await page.locator('#moCands button').click(); const saved=await page.locator('#moAvatar img').getAttribute('src');
  assert.match(saved,/^data:image\/jpeg;base64,/,'selected candidate is saved as a safe JPEG raster'); assert(saved.length<=131095,'saved candidate obeys the Card byte limit');
  await page.evaluate(()=>{window.__maikeoverTestSession.current={access_token:'test-token-b',user:{id:'test-user-b',email:'b@example.invalid'}};});
  await page.locator('[data-mo-tool="finish"]').click();
  await page.locator('#moSave').click(); await page.waitForFunction(()=>document.querySelector('#moSaveMsg').textContent.includes('different sign-in'));
  assert.equal(await page.evaluate(()=>localStorage.getItem('laidies_resident_card_v1')),null,'stale selected photo cannot be written locally after an account change');
  assert.equal(await page.evaluate(()=>window.__maikeoverTestAccount.saves),0,'stale selected photo cannot reach account save after an account change');
  await page.evaluate(()=>{window.__maikeoverTestSession.current={access_token:'test-token-a',user:{id:'test-user-a',email:'a@example.invalid'}};});
  await page.locator('[data-mo-tool="portrait"]').click();
  await page.locator('[value="object"][name="moPortraitMode"]').check(); assert.equal(await page.locator('#moPortraitOptions').isVisible(),false,'object mode hides photo/hair controls'); assert(await page.locator('#moObjectPanel').isVisible(),'object picker is visible');
  const beforeObjectCalls=payloads.length; await page.locator('#moReadyImages button').filter({hasText:'Mixtape cassette'}).click();
  await page.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('Portrait selected'));
  assert.equal(payloads.length,beforeObjectCalls,'ready-made picker never calls the provider'); const objectSaved=await page.locator('#moAvatar img').getAttribute('src');
  assert.match(objectSaved,/^data:image\/jpeg;base64,/,'ready-made image becomes a safe raster'); assert(objectSaved.length<=131095,'ready-made saved raster obeys the Card byte limit');
  assert.equal(await page.locator('#moReadyImages button').count(),13,'all thirteen approved choices are present');
  for(const button of await page.locator('#moReadyImages button').all()) {
    const before=await page.locator('#moAvatar img').getAttribute('src');
    if((await button.getAttribute('aria-label')).includes('Mixtape cassette')) continue;
    await button.click();
    await page.waitForFunction(old=>document.querySelector('#moAvatar img')?.src!==old,before,{timeout:20000}).catch(async error=>{throw new Error((await button.innerText())+': '+await page.locator('#moStatus').innerText()+'; '+error.message);});
    assert((await page.locator('#moAvatar img').getAttribute('src')).length<=131095,'each ready image fits shared Card storage');
  }
  assert.equal(payloads.length,beforeObjectCalls,'all thirteen ready images remain local');
  for(const width of [390,800,1280]){ await page.setViewportSize({width,height:844}); await page.locator('.mo-portrait-modes').scrollIntoViewIfNeeded(); await page.waitForTimeout(100); assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`no horizontal overflow at ${width}px`); }
  await page.setViewportSize({width:390,height:844}); await page.locator('#moReadyImages').scrollIntoViewIfNeeded(); await page.waitForTimeout(100); await page.screenshot({path:path.join(shots,'object-picker-390-viewport.png')});
  for(const [index,label] of ['Choose Platform sandal','Choose Portable CD player'].entries()) {
    await page.getByRole('button',{name:label,exact:true}).scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(shots,'object-picker-390-new-'+index+'.png')});
  }
  await signedIn.close();
  const signedOutPayloads=[]; const signedOut=await makeContext(false,async route=>{ signedOutPayloads.push(route.request().postData()); return route.fulfill({status:500,contentType:'application/json',body:'{}'}); });
  const signedOutPage=await signedOut.newPage(); await signedOutPage.goto(origin+'/maikeover.html'); await signedOutPage.locator('[data-mo-tool="portrait"]').click(); await signedOutPage.locator('[value="object"][name="moPortraitMode"]').check(); await signedOutPage.locator('#moReadyImages button').filter({hasText:'Mixtape cassette'}).click();
  await signedOutPage.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('Portrait selected'));
  assert.equal(signedOutPayloads.length,0,'signed-out ready-made selection makes no provider request'); assert.match(await signedOutPage.locator('#moAvatar img').getAttribute('src'),/^data:image\/jpeg;base64,/,'signed-out ready-made selection updates the local preview'); await signedOut.close();
  console.log(`OBJECT PHOTO PICKER PASS: description absent; hair/permission/provider failures retain the file; malformed provider output was not accepted; photo candidates are rejected on delayed account changes and before save; ready-made picker is local signed-in and signed-out; saved rasters <=131095; no overflow at 390/800/1280. Picker viewport: ${path.join(shots,'object-picker-390-viewport.png')}`);
}finally{await browser.close();await new Promise(r=>server.close(r));}
