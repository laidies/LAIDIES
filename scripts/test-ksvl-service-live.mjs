import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=path.resolve(process.env.RESIDENT_CARD_ROOT||process.cwd());
const credentials=JSON.parse(fs.readFileSync(process.env.RESIDENT_TEST_CREDENTIALS_FILE,'utf8'));
assert.match(credentials.email,/^ksvl-test-\d+@example\.com$/,'disposable account only');
const {chromium}=await import(pathToFileURL(path.join(process.env.PLAYWRIGHT_CORE_PATH,'index.mjs')));
const server=http.createServer((req,res)=>{let file=path.join(root,new URL(req.url,'http://localhost').pathname);if(!path.extname(file))file+='.html';if(!file.startsWith(root+'/')||!fs.existsSync(file)){res.writeHead(404).end();return;}res.setHeader('content-type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=process.env.RESIDENT_TEST_ORIGIN||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
async function login(page){await page.waitForFunction(()=>window.LAIDIESResidentAccountRuntime&&window.LAIDIESResidentContinuationV1);return page.evaluate(async c=>{const r=await window.LAIDIESResidentAccountRuntime.get();const s=await r.client.auth.signInWithPassword(c);if(s.error)throw Error(s.error.code);return s.data.user.id;},credentials);}
try{
 const a=await browser.newContext({viewport:{width:1280,height:900}}),b=await browser.newContext({viewport:{width:390,height:844}});
 const p=await a.newPage(),q=await b.newPage();
 await p.goto(origin+'/radio#hub-stickers',{waitUntil:'domcontentloaded'});const owner=await login(p);console.log('Controlled account',owner);
 // Reset only the exact disposable account continuation for repeatable pre/postdeploy testing.
 await p.evaluate(async()=>{const c=window.LAIDIESResidentContinuationV1,r=await window.LAIDIESResidentAccountRuntime.get();const old=await r.client.rpc('get_my_resident_continuation_v1');const result=await r.client.rpc('put_my_resident_continuation_v1',{p_document:c.emptyDocument(),p_expected_revision:old.data?.continuation?.revision||null,p_idempotency_key:crypto.randomUUID()});if(result.error)throw Error(result.error.code);c.clearSupportedLocalState();c.applyDocument(c.emptyDocument());});
 for(const s of ['ksvl-community-raidio','band-the-laidies','band-the-recalls'])await p.locator(`button[data-slug="${s}"]`).click();
 await p.locator('#ksvl-stickers-confirm').click();
 await p.waitForFunction(()=>document.querySelector('#ksvl-stickers-status').textContent.includes('Saved to your account'),{timeout:30000});
 await q.goto(origin+'/laidies-card#ksvlClosetStickers',{waitUntil:'domcontentloaded'});await login(q);
 await q.evaluate(async()=>window.LAIDIESResidentContinuationV1.syncWith(await window.LAIDIESResidentAccountRuntime.get()));
 assert.equal(await q.locator('#ksvlClosetStickerGrid img').count(),3,'fresh second browser must read actual backend');
 await q.getByRole('button',{name:'Remove THE LAiDIES',exact:true}).click();
 await q.waitForFunction(()=>document.querySelector('#ksvlClosetStickerStatus').textContent.includes('Saved to your account'),{timeout:30000});
 await p.evaluate(async()=>window.LAIDIESResidentContinuationV1.syncWith(await window.LAIDIESResidentAccountRuntime.get()));
 assert.equal(await p.locator('#ksvl-stickers-grid .is-earned').count(),2,'remote removal must reach old Radio browser');
 if(process.env.KSVL_TEST_REQUESTS==='1'){
   await p.goto(origin+'/radio#hub-request',{waitUntil:'domcontentloaded'});
   await p.locator('#ksvl-req-list').getByText('No active station requests.').waitFor();
   await p.locator('#ksvl-req-style').selectOption('coffeehouse-acoustic');await p.locator('#ksvl-req-topic').fill('Disposable service verification');await p.locator('#ksvl-req-lyrics').fill('Synthetic line one\nSynthetic line two');
   await p.locator('#ksvl-req-submit').click();await p.waitForFunction(()=>document.querySelector('#ksvl-req-status').textContent.includes('Received for station review'));
   const id=await p.locator('[data-ksvl-request-delete]').getAttribute('data-ksvl-request-delete');
   await q.goto(origin+'/radio#hub-request',{waitUntil:'domcontentloaded'});await q.locator(`[data-ksvl-request-delete="${id}"]`).waitFor();
   await q.locator(`[data-ksvl-request-delete="${id}"]`).click();await q.waitForFunction(()=>document.querySelector('#ksvl-req-status').textContent.startsWith('Request deleted'));
   console.log('REAL REQUEST browser submit/receipt/second-browser status/own delete PASS');
 }
 console.log('REAL KSVL STICKER ACCOUNT PASS desktop pickup / phone Closet restore / removal back to desktop');
 await a.close();await b.close();
}finally{await browser.close();await new Promise(r=>server.close(r));}
