import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root = path.resolve(process.env.RESIDENT_CARD_ROOT || process.cwd());
const {chromium} = await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH, 'index.mjs')));
const server = http.createServer((req,res)=>{
  let file = path.join(root,new URL(req.url,'http://localhost').pathname);
  if(!path.extname(file)) file += '.html';
  if(!file.startsWith(root+'/') || !fs.existsSync(file)) {res.writeHead(404).end();return;}
  const ext=path.extname(file);
  res.setHeader('content-type',({'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml'})[ext]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=process.env.RESIDENT_TEST_ORIGIN || `http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
let cases=0;
try {
  for(const width of [1280,390,320]) {
    for(const route of ['laidies-card','luminairy','town-hall','sunnyvaile-high']) {
      const ctx=await browser.newContext({viewport:{width,height:900}});
      await ctx.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
      const page=await ctx.newPage();
      const errors=[];page.on('pageerror',e=>errors.push(String(e)));
      await page.goto(`${origin}/${route}`,{waitUntil:'networkidle'});
      await page.waitForFunction(()=>!!window.LAIDIESResidentContinuationV1);
      await page.evaluate(()=>{
        const api=window.LAIDIESResidentContinuationV1, doc=api.emptyDocument();
        const add=value=>({value,updated_at:new Date().toISOString()});
        doc.activities={luminaryMaven:add('ada-lovelace'),luminaryBuilder:add('mira-murati'),luminaryTownRegular:add('dj-sunnyv'),buildingVisits:add({library:{n:3,first:1700000000000,last:1700001000000}}),quizProgress:add({'ep01-imposter-syndrome':{bestScore:4,latestScore:4,attempts:2,maxScore:5,completedAt:new Date().toISOString()}})};
        api.applyDocument(doc);api.applyDocument(doc);
      });
      if(route==='laidies-card') {
        assert.match(await page.locator('#covenMavenPick').innerText(),/Ada/i);
        assert.equal(await page.locator('#walletGrid .wallet-card').count(),17);
        assert.match(await page.locator('#clipJarLedger').innerText(),/Best quiz score: 4/);
        await page.evaluate(()=>{const a=window.LAIDIESResidentContinuationV1;a.clearSupportedLocalState();a.applyDocument(a.emptyDocument());});
        assert.match(await page.locator('#covenMavenPick').innerText(),/pick one/i);
        assert.match(await page.locator('#clipJarLedger').innerText(),/No saved progress/i);
      }
      if(route==='luminairy') assert.match(await page.locator('[data-pick-output="mavens"]').innerText(),/Ada/i);
      if(route==='town-hall') assert.match(await page.locator('button[data-town-slug="dj-sunnyv"]').getAttribute('class'),/is-picked/);
      if(route==='sunnyvaile-high') {
        // Current admitted quiz IDs come from the same index the consumer uses.
        await page.evaluate(async()=>{
          const [idx,q]=await Promise.all([fetch('/content/episode-index.json').then(r=>r.json()),fetch('/content/site/quizzes.json').then(r=>r.json())]);
          const meta=q.quizzes||q, ep=idx.episodes.find(e=>e.status==='published'&&meta[e.websiteModules?.quiz]);
          const api=window.LAIDIESResidentContinuationV1,doc=api.emptyDocument();
          doc.activities.quizProgress={value:{[ep.websiteModules.quiz]:{bestScore:4,attempts:2,maxScore:5}},updated_at:new Date().toISOString()};
          api.applyDocument(doc);
        });
        assert.match(await page.locator('#rc-rows').innerText(),/4/);
      }
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${route} ${width}px overflow`);
      assert.deepEqual(errors,[],`${route} page errors`);
      await ctx.close();cases++;
    }
  }
  console.log(`CLOSET MEMORY BROWSER PASS ${cases}/12 same-tab refresh, repeated apply, clear, 1280/390/320`);
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
