#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const candidate = 'operations/design-explorations/building-wave-1/visitors-centre/index.html';
const out = path.join(root, 'operations/design-explorations/building-wave-1/visitors-centre/evidence');
const { chromium } = await import(pathToFileURL(path.join(root, '.ds-sync/node_modules/playwright-core/index.mjs')));
fs.mkdirSync(out, { recursive: true });
const mime = new Map([['.html','text/html'],['.js','text/javascript'],['.webp','image/webp'],['.png','image/png'],['.css','text/css']]);
const server = http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname.replace(/^\/+/, '')||candidate;const file=path.resolve(root,name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory())return res.writeHead(404).end();res.writeHead(200,{'content-type':mime.get(path.extname(file))||'application/octet-stream'});fs.createReadStream(file).pipe(res)});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`; const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const checks=[]; const check=(ok,name)=>checks.push({ok,name});
try {
  for (const [name,width,height,state] of [['desktop',1440,960,''],['mobile-390',390,844,'returning'],['mobile-320',320,700,'card'],['storage-denied',390,844,'storage-denied']]) {
    const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'}); const page=await context.newPage();
    await page.goto(`${origin}/${candidate}${state?`?state=${state}`:''}`,{waitUntil:'networkidle'});
    check(await page.locator('.place').count()===17,`${name}: 17 equal directory controls`);
    check(await page.locator('.spot').count()===17,`${name}: 17 map controls`);
    check(!(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1)),`${name}: no horizontal overflow`);
    if(state) check(await page.locator('#stateNote').isVisible(),`${name}: explicit local-state message`);
    await page.locator('#placeSelect').selectOption('sanctuary');
    check(await page.locator('#reveal').isVisible(),`${name}: selection reveals truthful handoff note`);
    check((await page.locator('#reveal').innerText()).includes('profile research is under review'),`${name}: receives current held limitation`);
    check((await page.locator('#reveal a').getAttribute('href'))==='/luminairy.html',`${name}: exact destination href`);
    await page.keyboard.press('Escape'); check(await page.locator('#reveal').isHidden(),`${name}: Escape closes reveal`);
    await page.screenshot({path:path.join(out,`${name}.png`),fullPage:true}); await context.close();
  }
  const noJs=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false}); const noJsPage=await noJs.newPage(); await noJsPage.goto(`${origin}/${candidate}`,{waitUntil:'domcontentloaded'});
  check(await noJsPage.locator('noscript a').count()===17,'no-JS: 17 structural direct route links'); check((await noJsPage.locator('noscript').innerText()).includes('decorative without JavaScript'),'no-JS: map recovery is honest'); await noJsPage.screenshot({path:path.join(out,'mobile-390-nojs.png'),fullPage:true}); await noJs.close();
  for (const [name,width,height] of [['mobile-390-image-failure',390,844],['mobile-320-image-failure',320,700]]) {
    const failure=await browser.newContext({viewport:{width,height}}); const failurePage=await failure.newPage(); await failurePage.goto(`${origin}/${candidate}`,{waitUntil:'networkidle'}); await failurePage.evaluate(()=>{const image=document.querySelector('#townMap'); image.src='/missing-map.webp'}); await failurePage.waitForTimeout(250);
    check(await failurePage.locator('#mapFallback').isVisible(),`${name}: named-directory recovery visible`);
    check(await failurePage.locator('.spot:visible').count()===0,`${name}: zero visible hotspots`);
    check(await failurePage.locator('.spot:not([disabled])').count()===0,`${name}: zero enabled/focusable hotspots`);
    check(await failurePage.locator('.place').count()===17,`${name}: equal directory retains all 17 controls`);
    await failurePage.screenshot({path:path.join(out,`${name}.png`),fullPage:true}); await failure.close();
  }
} finally {await browser.close(); await new Promise(resolve=>server.close(resolve));}
const result={candidate,checks,passed:checks.filter(x=>x.ok).length,failed:checks.filter(x=>!x.ok).map(x=>x.name),at:new Date().toISOString()}; fs.writeFileSync(path.join(out,'test-result.json'),JSON.stringify(result,null,2)+'\n'); console.log(JSON.stringify(result,null,2)); if(result.failed.length)process.exitCode=1;
