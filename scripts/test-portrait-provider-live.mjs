#!/usr/bin/env node
// Explicit opt-in: makes at most two real three-image batches for one disposable
// account. Never supply an existing resident's account or a person's photo.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const directory = process.env.PORTRAIT_TEST_DIR;
assert.ok(directory && process.env.PORTRAIT_TEST_PAID === 'yes', 'explicit disposable paid-test opt-in required');
const account = JSON.parse(fs.readFileSync(path.join(directory,'account.json'),'utf8'));
assert.match(account.email,/^portrait-recovery-\d+@example\.com$/);
const config = fs.readFileSync('content/site/supabase-config.js','utf8');
const url = config.match(/url:\s*["']([^"']+)/)[1];
const key = config.match(/anonKey:\s*["']([^"']+)/)[1];
const auth = await fetch(url+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:key,'content-type':'application/json'},body:JSON.stringify(account)});
assert.equal(auth.status,200,'disposable sign-in');
const session = await auth.json();
const endpoint = 'https://laidies-avatar.wednesday-laidies.workers.dev';
const payload = {requestId:crypto.randomUUID(),itemPrompt:'A fictional adult woman aged 45, dark curly shoulder-length hair, brown eyes, medium brown skin. 1995 fashion, denim jacket, hoop earrings and choker necklace, blue cloud school-portrait backdrop. Head and shoulders. No writing.'};
const headers = {'content-type':'application/json',origin:'https://laidies.ai',authorization:'Bearer '+session.access_token};
async function call(data, customHeaders=headers) {
  const response=await fetch(endpoint,{method:'POST',headers:customHeaders,body:JSON.stringify(data),signal:AbortSignal.timeout(180000)});
  return {status:response.status,data:await response.json()};
}
assert.equal((await call(payload,{'content-type':'application/json',origin:'https://laidies.ai'})).status,401,'anonymous request blocked');
assert.equal((await call(payload,{...headers,origin:'https://example.com'})).status,403,'unapproved origin blocked');
console.log('LIVE PORTRAIT auth/origin rejection verified; requesting one scratch batch');
const scratch = await call(payload);
console.log('LIVE PORTRAIT scratch status='+scratch.status+' completed='+(scratch.data.completed||0)+' error='+(scratch.data.error||'none'));
assert.equal(scratch.status,200,'scratch batch succeeds');
assert.equal(scratch.data.images.length,3,'three scratch candidates');
for(let i=0;i<3;i++) fs.writeFileSync(path.join(directory,'scratch-'+i+'.png'),Buffer.from(scratch.data.images[i],'base64'),{mode:0o600});
assert.equal((await call(payload)).status,409,'duplicate does not trigger another batch');
if(process.env.PORTRAIT_TEST_PHOTO === 'yes') {
  const photo={requestId:crypto.randomUUID(),image:'data:image/png;base64,'+scratch.data.images[0],traits:{extras:'Preserve this fictional adult woman. 2000 fashion, baby tee, butterfly hair clips, pink and blue laser backdrop.'},consent:true};
  // Provider PNG may exceed input limit: caller must first supply a resized
  // test-only derivative through the separately verified browser photo path.
  if(Buffer.from(scratch.data.images[0],'base64').length <= 2000000) {
    const edited=await call(photo); console.log('LIVE PORTRAIT photo status='+edited.status+' completed='+(edited.data.completed||0));
    assert.equal(edited.status,200); assert.equal(edited.data.images.length,3);
    for(let i=0;i<3;i++) fs.writeFileSync(path.join(directory,'photo-'+i+'.png'),Buffer.from(edited.data.images[i],'base64'),{mode:0o600});
    assert.equal((await call({...payload,requestId:crypto.randomUUID()})).status,429,'third batch blocked');
  }
}
console.log('LIVE PORTRAIT provider PASS; disposable user='+session.user.id);
