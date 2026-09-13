import {chromium} from '/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root='/Users/alisoneakin/Projects/laidies-newsstand-overheard-20260907';
const privateRoot=root+'/operations/product-stewards/newsstand/candidates/hannah-fry-profile-20260911';
const fixture=process.env.HANNAH_STAGE;
const candidate=JSON.parse(fs.readFileSync(privateRoot+'/final-v10/profile-candidate.json'));
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const results=[];
try{
 for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000}});
  if(fixture)await page.route('https://laidies.ai/**',async route=>{const p=new URL(route.request().url()).pathname;const file=fixture+p;if(fs.existsSync(file)&&fs.statSync(file).isFile())await route.fulfill({path:file,contentType:p.endsWith('.js')?'application/javascript':p.endsWith('.json')?'application/json':'text/html'});else await route.continue();});
  await page.goto('https://laidies.ai/luminairy.html#mavens',{waitUntil:'domcontentloaded'});
  await page.locator('.lum-card').first().waitFor();
  await page.getByRole('tab',{name:/MAiVENS/}).click();
  assert.equal(await page.locator('.lum-card').count(),23);
  await page.locator('#lumSearch').fill('Hannah Fry');
  const card=page.locator('.lum-card');assert.equal(await card.count(),1);
  const text=await card.innerText();assert.ok(text.includes(candidate.profile.about));
  assert.equal(await card.locator('.lum-card__link').count(),7);
  const image=card.locator('img');await image.evaluate(async i=>{i.loading='eager';await i.decode();});
  assert.ok(await image.evaluate(i=>i.naturalWidth>100));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await card.scrollIntoViewIfNeeded();await page.screenshot({path:privateRoot+'/integration-20260913/'+(fixture?'candidate':'live')+'-'+width+'.png'});
  results.push({width,exactAbout:true,links:7,mavenCount:23,imageDecoded:true,noHorizontalOverflow:true});
  await page.close();
 }
 console.log(JSON.stringify({mode:fixture?'candidate-overlay':'live',results},null,2));
}finally{await browser.close();}
