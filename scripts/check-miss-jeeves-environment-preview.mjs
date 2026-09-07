import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const packet='operations/product-stewards/library/environment-answer-20260907/';const read=f=>JSON.parse(fs.readFileSync(f));const digest=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const a=read(packet+'presentation-admission.json');
function check(a){
 assert.equal(a.scope,'ENVIRONMENT_ANSWER_AND_NO_WHITE_REPAIR');assert.equal(a.status,'ADMITTED_FOR_BOUNDED_PREVIEW');assert.equal(a.ownerApproval,'yes stop asking just do');assert.equal(a.productionReleaseApproved,false);assert.equal(a.broaderServiceComplete,false);
 for(const b of a.bindings)assert.equal(digest(b.path),b.sha256,'Stale '+b.path);
 for(const f of ['library.html','content/site/homepage.js','_worker.js','scripts/lib/miss-jeeves-source-check.mjs',packet+'reviewed-record.json',packet+'claude-render-review.json',packet+'second-render-review.json'])assert(a.bindings.some(b=>b.path===f));
 const c=read(packet+'claude-render-review.json'),d=read(packet+'second-render-review.json');assert.equal(c.visualVerdict,'PASS');assert.equal(c.artifactFirst,true);assert.equal(d.verdict,'PASS');assert.equal(d.independentOfMaker,true);assert.notEqual(c.principalId,d.principalId);for(const review of [c,d])for(const b of review.inspected)assert.equal(digest(b.path),b.sha256);
 const r=read(packet+'reviewed-record.json');assert.equal(r.canonicalQuestion,'Is AI bad for the environment?');assert.equal(r.sourcePolicyVersion,a.sourcePolicy);assert(r.review.total>=17);assert(r.review.minimumDimension>=3);assert(Date.parse(r.expiresAt)>Date.now());assert(a.artworkSources.length>0&&a.artworkSources.every(s=>s.unchanged&&/^[a-f0-9]{64}$/.test(s.sha256)));
}
check(a);for(const mutate of [x=>x.ownerApproval='',x=>x.bindings[0].sha256='0'.repeat(64),x=>x.productionReleaseApproved=true,x=>x.broaderServiceComplete=true]){const bad=structuredClone(a);mutate(bad);assert.throws(()=>check(bad));}
console.log('Bounded environment preview admission verified; four bad candidates rejected; no production or broader-service admission.');
