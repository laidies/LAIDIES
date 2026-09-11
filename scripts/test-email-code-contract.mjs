import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = path => fs.readFileSync(new URL('../'+path, import.meta.url),'utf8');
const window={};
vm.runInNewContext(read('content/site/identity-client-v1.js'),{window,URL});
let requests=[], verifications=[], reject=false;
const session={user:{id:'existing-resident'}};
const client={auth:{
  signInWithOtp:async payload=>{requests.push(payload);return {error:null};},
  verifyOtp:async payload=>{verifications.push(payload);return reject?{error:Error('expired')}:{data:{session}};},
  getSession:async()=>({data:{session}})
},rpc:async()=>({data:{state:'ACCOUNT_BACKED',card:{revision:'original'}}})};
const account=window.LAIDIESIdentityV1.create({client,location:{origin:'https://laidies.ai'},allowedRedirectPaths:['/maikeover'],readLocalCard:()=>null,hasLocalHistory:()=>false});
await account.requestEmailCode('resident@example.com','/maikeover');
assert.equal(requests[0].options.emailRedirectTo,'https://laidies.ai/maikeover');
assert.equal(requests[0].options.shouldCreateUser,undefined,'default supports new and returning accounts');
const state=await account.verifyEmailCode('resident@example.com','123 456');
assert.equal(state.session.user.id,'existing-resident');
assert.equal(verifications[0].type,'email');
assert.equal(verifications[0].token,'123456');
await assert.rejects(account.verifyEmailCode('resident@example.com','bad'),/verification code/);
assert.equal(verifications.length,1,'invalid input never reaches provider');
reject=true;
await assert.rejects(account.verifyEmailCode('resident@example.com','123456'),/expired/);
function checkMarkup(html) {
  assert.match(html,/id="moAccountCode"[^>]*autocomplete="one-time-code"/);
  assert.match(html,/id="moAccountCode"[^>]*inputmode="numeric"/);
}
const html=read('maikeover.html');
checkMarkup(html);
assert.throws(()=>checkMarkup(html.replace('autocomplete="one-time-code"','autocomplete="off"')),'guard rejects removed autofill');
const templates=read('content/site/supabase-email-templates.md');
assert.equal((templates.match(/<p[^>]*>\{\{ \.Token \}\}<\/p>/g)||[]).length,2);
assert.equal((templates.match(/href="\{\{ \.ConfirmationURL \}\}"/g)||[]).length,2);
console.log('EMAIL CODE CONTRACT PASS: existing identity retained; new accounts allowed; invalid/expired rejected; autofill removal rejected; both legacy email links preserved. Mock provider only.');
