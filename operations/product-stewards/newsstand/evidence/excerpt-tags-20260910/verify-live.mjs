import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});const checks=[];
for(const origin of process.argv.slice(2))for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}});
 const response=await page.goto(origin+'/newsstand?v=fc6e325a',{waitUntil:'domcontentloaded'});
 const html=await response.text(); fs.writeFileSync('/tmp/ns-browser-response.html',html); if(!html.includes('escapeHTML(stripHTML(lead.the_story))'))throw Error('Fix absent '+origin);
 await page.locator('.ns-front-opening').waitFor();
 const text=await page.locator('.ns-front-opening').innerText();
 if(/<\/?(?:p|a|strong|em|br)\b/i.test(text)||!text.startsWith('Women accounted'))throw Error('Preview failed');
 await page.goto(origin+'/newsstand#front-paige-accountable-systems-2026-08-24',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(700);
 const reader=page.locator('.ns-reader');
 if(!(await reader.innerText()).includes('Women accounted'))throw Error('Reader missing');
 checks.push({origin,width,preview:'no HTML tags',article:'opens with original text'});await page.close();
}
await browser.close();console.log(JSON.stringify(checks,null,2));
