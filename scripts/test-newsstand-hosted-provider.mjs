import assert from 'node:assert/strict';
import {readProvider} from './read-newsstand-hosted-provider.mjs';
const id='a359b8ef-ca44-4fba-9bb9-789dd3aa2bab';
const project={production_branch:'homepage-redesign',canonical_deployment:{id,url:'https://a359b8ef.laidies-sunnyvaile.pages.dev'}};
const opts={accountId:'a'.repeat(32),token:'synthetic-secret'};
function fake({drift=false,empty=false,status=200}={}) {let projects=0;return async (url,options)=>{assert.equal(options.redirect,'error');assert.equal(options.headers.Authorization,'Bearer synthetic-secret');assert.match(url,/^https:\/\/api.cloudflare.com\/client\/v4\/accounts\/a+\/pages\/projects\/laidies-sunnyvaile/);let result;if(url.endsWith('/files')) result={files:empty?{}:{'/newsstand.html':'b'.repeat(32)}};else {projects++;result=structuredClone(project);if(drift&&projects>1) result.canonical_deployment.id='changed';}return {ok:status===200,status,json:async()=>({success:true,result})};};}
assert.equal((await readProvider({...opts,fetcher:fake()})).id,id);
await assert.rejects(()=>readProvider({...opts,fetcher:fake({drift:true})}),/PROVIDER_HEAD_CHANGED/);
await assert.rejects(()=>readProvider({...opts,fetcher:fake({empty:true})}),/EMPTY_PROVIDER_MANIFEST/);
await assert.rejects(()=>readProvider({...opts,fetcher:fake({status:401})}),/PROVIDER_HTTP_401/);
await assert.rejects(()=>readProvider({accountId:opts.accountId}),/CLOUDFLARE_AUTH_MISSING/);
console.log('HOSTED PROVIDER READ TEST PASS current_head=1 race_rejected=1 empty_rejected=1 unauthorized_rejected=1 missing_auth_rejected=1');
