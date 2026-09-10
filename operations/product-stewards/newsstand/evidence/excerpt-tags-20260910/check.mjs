import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
for(const [name,file] of [['incumbent','/tmp/ns-live-tags.html'],['candidate',process.cwd()+'/newsstand.html']]){
 for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}});
 await page.route('https://laidies.ai/newsstand*',r=>r.request().resourceType()==='document'?r.fulfill({status:200,contentType:'text/html',body:fs.readFileSync(file,'utf8')}):r.continue());
 await page.goto('https://laidies.ai/newsstand',{waitUntil:'domcontentloaded'});
 await page.locator('.ns-front-opening').waitFor();
 const opening=await page.locator('.ns-front-opening').innerText();
 const leak=/<\/?(?:p|a|strong|em|br)\b/i.test(opening);
 results.push({name,width,leak,opening:opening.slice(0,160)});
 if(leak!==(name==='incumbent'))throw Error('calibration/correction failed');
 await page.locator('.ns-front-opening').scrollIntoViewIfNeeded();
 await page.screenshot({path:process.cwd()+`/operations/product-stewards/newsstand/evidence/excerpt-tags-20260910/${name}-${width}.png`});
 await page.close();
 }
}
await browser.close();console.log(JSON.stringify(results,null,2));
