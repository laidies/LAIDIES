// Unit tests and a loopback-only browser fixture. Never writes public files or
// approval records. Fixture eligibility is synthetic, not editorial admission.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const runtime = read('content/site/newsstand-catchup-v1.js');
const bank = JSON.parse(read('operations/product-stewards/newsstand/candidates/service-bank.json'));
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const sandbox = {
  window: { location: {href:'http://127.0.0.1/newsstand.html'}, NEWSSTAND_DATA: {publications: {}, stories: []}, localStorage: {getItem:()=>null} },
  document: {readyState:'loading', addEventListener(){}, createElement(){return {set textContent(v){this.innerHTML=escape(v)}}}},
  Date, URL, Intl, Set, TextEncoder
};
vm.runInNewContext(runtime.replace('})(window);', `
  global.testReader = {readableColumn, columnBodyHTML, columnHref, serviceLink, issueEnvelopeProjection, canonicalJson,
    setFixture: function(c,i) { columns=c;dailyIssues=i; }};
})(window);`), sandbox);
const helper = sandbox.window.testReader;
const date = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Vancouver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const item = structuredClone(bank.items.find(i=>i.id==='jeeves-01-time'));
Object.assign(item,{editionDate:date,status:'APPROVED',publicEligibility:'ELIGIBLE'});
item.freshness.expiresAt='2099-01-01';
const issue = {editionDate:date,status:'complete',desks:[{recordId:item.id,type:item.type,state:'ready'}]};
function set(record, issued=issue){helper.setFixture({records:[record]}, {issues:[issued]});}
set(item);
assert.equal(helper.readableColumn(item.id)?.id,item.id);
for(const patch of [{status:'CANDIDATE'},{publicEligibility:'INELIGIBLE'},{body:[]},{body:['']},{availableUntil:'2000-01-01'},{freshness:{expiresAt:'2000-01-01'}}]){
  set({...item,...patch});assert.equal(helper.readableColumn(item.id),null);
}
set(item,{...issue,desks:[]});assert.equal(helper.readableColumn(item.id),null);
set(item);
const html=helper.columnBodyHTML(item);
assert.ok(html.indexOf(item.question.signature)<html.indexOf(escape(item.body[0])),'question must precede answer');
for(const p of item.body)assert.ok(html.includes(escape(p)),'every paragraph renders');
assert.equal((html.match(/<a /g)||[]).length,1,'duplicate source/destination link is removed');
const hostile=helper.columnBodyHTML({...item,body:['<script>alert(1)</script>'],sourceLinks:[{url:'javascript:alert(1)',label:'bad'}],destination:null});
assert.ok(!hostile.includes('<script>') && !hostile.includes('javascript:'));
assert.equal(helper.serviceLink('//example.com'), '');
assert.ok(helper.columnHref(item.id).includes('?column='));
assert.ok(!helper.columnHref(item.id).includes('#'));
const mme=bank.items.find(i=>i.type==='mme_claio');
assert.ok(helper.columnBodyHTML(mme).includes(escape(mme.summary)), 'authored reading is retained along with message and move');
for(const type of bank.requiredTypes)assert.ok(read('newsstand.html').includes(`data-desk="${type}"`));
console.log('SERVICE READER TEST PASS full_body=1 question_first=1 source_dedup=1 escaping=1 candidate_expired_orphan_denied=1 eight_slots=1');

if(process.argv.includes('--serve')){
  // All changed eligibility exists in memory on this loopback server only.
  // The on-disk candidate bank and canonical files remain untouched.
  const ctx={window:{}};vm.runInNewContext(read('content/newsstand-stories.js'),ctx);
  const data=ctx.window.NEWSSTAND_DATA;
  const columns=JSON.parse(read('content/daily-edition-columns.json'));
  const store=JSON.parse(read('content/newsstand-daily-issues.json'));
  const current=store.issues.find(i=>i.editionDate===data.publications.daily.editionDate);
  assert.ok(current,'fixture needs existing canonical issue');
  const selected=bank.requiredTypes.map(type=>bank.items.find(i=>i.type===type));
  const records=selected.map(i=>({...structuredClone(i),id:'TEST-FIXTURE-'+i.id,editionDate:current.editionDate,status:'APPROVED',publicEligibility:'ELIGIBLE',freshness:{...i.freshness,expiresAt:'2099-01-01'}}));
  columns.records.push(...records);
  current.desks=current.desks.map(d=>{const r=records.find(r=>r.type===d.type);return r?{type:r.type,state:'ready',recordId:r.id,headline:r.headline,summary:r.summary,destination:r.destination}:d});
  current.serviceRecordIds=current.desks.filter(d=>d.state==='ready').map(d=>d.recordId);
  current.disposition='service_ready';
  data.publications.daily.issue.serviceRecordIds=current.serviceRecordIds;
  current.envelopeSha256=crypto.createHash('sha256').update(helper.canonicalJson(helper.issueEnvelopeProjection(current))+'\n').digest('hex');
  const replacements={
    '/content/newsstand-stories.js':'window.NEWSSTAND_DATA = '+JSON.stringify(data)+';',
    '/content/daily-edition-columns.json':JSON.stringify(columns),
    '/content/newsstand-daily-issues.json':JSON.stringify(store)
  };
  const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg'};
  const server=http.createServer((req,res)=>{
    const pathname=new URL(req.url,'http://127.0.0.1').pathname;
    const file=path.resolve(root,'.'+pathname);
    if(!file.startsWith(root+path.sep)||pathname.startsWith('/operations/')||pathname.startsWith('/scripts/')||pathname.includes('/.')){res.writeHead(404).end();return;}
    try{
      let bytes=replacements[pathname]??fs.readFileSync(file);
      if(pathname==='/newsstand.html')bytes=String(bytes).replace('</body>','<aside style="position:fixed;bottom:0;left:0;right:0;z-index:999999;background:#ffeb57;color:#191331;text-align:center;font:700 13px sans-serif;padding:5px">LOCAL TEST FIXTURE — unapproved draft content; not for publication</aside></body>');
      res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);
    }catch{res.writeHead(404).end();}
  });
  server.listen(0,'127.0.0.1',()=>console.log('PRIVATE FIXTURE http://127.0.0.1:'+server.address().port+'/newsstand.html'));
}
