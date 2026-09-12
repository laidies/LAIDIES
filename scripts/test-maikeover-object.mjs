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
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);
  if(!file.startsWith(root+'/')||!fs.existsSync(file)||fs.statSync(file).isDirectory())return res.writeHead(404).end();
  const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp'}[path.extname(file)];
  res.setHeader('Content-Type',type||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 const context=await browser.newContext(); const payloads=[];
 await context.addInitScript(()=>{
   const session={access_token:'test',user:{id:'test',email:'test@example.invalid'}};
   const client={auth:{getSession:async()=>({data:{session}})}};
   window.LAIDIESResidentAccountRuntime={get:async()=>({client})};
 });
 await context.route('**/*',async route=>{
  const url=route.request().url();
  if(url.includes('resident-account-runtime-v1.js'))return route.fulfill({contentType:'text/javascript',body:''});
  if(url.startsWith('https://laidies-avatar.')){
   payloads.push(JSON.parse(route.request().postData()));
   return route.fulfill({status:200,headers:{'access-control-allow-origin':'*'},contentType:'application/json',body:JSON.stringify({images:['invalid-image']})});
  }
  return url.startsWith(origin)?route.continue():route.abort();
 });
 const page=await context.newPage(); await page.goto(origin+'/maikeover.html');
 await page.locator('[data-mo-tool="portrait"]').click();
 assert.match(await page.locator('#moDescribeExample').innerText(),/woman in her 40s/);
 await page.locator('#moDescribe').fill('private description must not leak into object request');
 await page.locator('[value="photo"][name="moPortraitMode"]').check();
 await page.locator('#moPhotoConsent').check();
 await page.locator('[value="object"][name="moPortraitMode"]').check();
 assert.equal(await page.locator('#moPhotoConsent').isChecked(),false);
 assert.equal(await page.locator('#moPortraitOptions').isVisible(),false);
 assert.equal(await page.locator('#moDescriptionPanel').isVisible(),false);
 await page.locator('#moObject').selectOption('cassette');
 await page.locator('#moMake').click();
 await page.waitForFunction(()=>document.querySelector('#moStatus').textContent.includes('could not be read'));
 assert.equal(payloads.length,1);assert.equal(payloads[0].object,'cassette');
 assert.deepEqual(Object.keys(payloads[0]).sort(),['object','requestId']);
 assert.equal(await page.locator('#moCands button').count(),0,'malformed raster rejected');
 for(const width of [390,800,1280]){
  await page.setViewportSize({width,height:844});
  await page.locator('.mo-portrait-modes').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(process.env.SHOTS)await page.screenshot({path:process.env.SHOTS+`/object-${width}.png`});
 }
 await page.locator('[value="scratch"][name="moPortraitMode"]').check();
 assert(await page.locator('#moPortraitOptions').isVisible());
 assert.equal(await page.locator('#moObjectPanel').isVisible(),false);
 await page.locator('[value="photo"][name="moPortraitMode"]').check();
 assert(await page.locator('#moPhotoPanel').isVisible());
 assert(await page.locator('#moPortraitOptions').isVisible());
 assert.equal(await page.locator('#moObjectPanel').isVisible(),false);
 assert.equal(await page.locator('#moDescriptionPanel').isVisible(),false);
 console.log('OBJECT MODE PASS: isolated request, discarded consent, visible example, restored human controls, invalid raster rejected, 390/800/1280 fit. Provider mocked; no saved account changes.');
}finally{await browser.close();await new Promise(r=>server.close(r));}
