import assert from 'node:assert/strict';
import {allApiPages, unresolvedSignalIds} from './upsert-newsstand-intake-issue.mjs';
const urls=[];
const comments=await allApiPages('/issues/82/comments',async url=>{
 urls.push(url); return url.endsWith('page=1')?Array.from({length:100},()=>({body:'resolved earlier comment'})):[{body:'Unresolved NSCI-abcdef0123456789abcd'}];
});
assert.equal(comments.length,101);
assert.deepEqual(urls,['/issues/82/comments?per_page=100&page=1','/issues/82/comments?per_page=100&page=2']);
assert.deepEqual(unresolvedSignalIds(comments.map(x=>x.body).join('\n'),{}, {signals:[]}),['NSCI-abcdef0123456789abcd']);
await allApiPages('/issues?state=open',async url=>{assert.equal(url,'/issues?state=open&per_page=100&page=1');return [];});
await assert.rejects(()=>allApiPages('/x',async()=>({message:'failure'})),/PAGINATION_INVALID/);
await assert.rejects(()=>allApiPages('/x',async()=>Array(100).fill({})),/PAGINATION_LIMIT/);
await assert.rejects(()=>allApiPages('/x',async url=>{if(url.endsWith('page=2'))throw Error('network');return Array(100).fill({});}),/network/);
console.log('PASS complete queue pagination; later unresolved signal retained; malformed, capped and failed pagination cannot close queue');
