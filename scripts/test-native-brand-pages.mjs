import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(process.env.NATIVE_BRAND_ROOT||process.cwd());
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
const server=http.createServer((req,res)=>{
  let file=path.join(root,new URL(req.url,'http://localhost').pathname);
  if(!path.extname(file))file+='.html';
  if(!file.startsWith(root+'/')||!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('content-type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=process.env.NATIVE_BRAND_ORIGIN||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try{
 for(const route of ['radio#hub-request','laidies-card','maikeover','visitors-centre','games/fairy-godmother'])for(const width of [1280,390,320]){
  const ctx=await browser.newContext({viewport:{width,height:900}}),page=await ctx.newPage();
  await page.goto(origin+'/'+route,{waitUntil:'load'});
  await page.waitForFunction(()=>typeof window.LAiDIESAccentRewrap==='function');
  await page.evaluate(()=>window.LAiDIESAccentRewrap(document.body));
  const options=await page.locator('option').count();assert.ok(options,route+' must exercise native options');
  assert.equal(await page.locator('option *').count(),0,route+' options must not contain decorative elements');
  const select=page.locator('select:visible').first();
  if(await select.count()){
   const value=await select.inputValue();
   const names=await select.locator('option').allTextContents();assert.ok(names.every(n=>n.trim()),route+' nonempty labels');
   await select.selectOption(value);assert.equal(await select.inputValue(),value);
  }
  console.log('NATIVE FULL PAGE PASS',route,width,options+' plain-text options');await ctx.close();
 }
}finally{await browser.close();await new Promise(r=>server.close(r));}
