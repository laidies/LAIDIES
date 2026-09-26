import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),contract=require('../content/newsstand-reader-contract.js');const w={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../content/newsstand-stories.js',import.meta.url),'utf8'),w);const data=w.window.NEWSSTAND_DATA;const html=fs.readFileSync(new URL('../newsstand.html',import.meta.url),'utf8');const code=html.slice(html.indexOf('function similarStories('),html.indexOf('function renderSimilarStories('));const ctx={stories:data.stories,data,contract,now:new Date().toISOString()};vm.createContext(ctx);vm.runInContext(code,ctx);const current=data.stories.find(x=>x.id.startsWith('nvidia-hugging'));const peer=data.stories.find(x=>x.id==='cursor-openai-access-2026-08-28');assert.equal(ctx.similarStories(current)[0].id,peer.id);assert.equal(ctx.similarStories(data.stories.find(x=>x.id.startsWith('gastric-cancer'))).length,0);
for(const story of data.stories){const matches=ctx.similarStories(story);assert.ok(matches.length<=3);assert.equal(new Set(matches.map(x=>x.id)).size,matches.length);for(const m of matches){assert.notEqual(m.id,story.id);assert.ok(contract.accessDecision(data,m,{scope:'hash',edition:m.edition},ctx.now).canExpose);}}
const saved=JSON.parse(JSON.stringify(peer));for(const status of ['hold','retracted']){peer.status=status;assert.equal(ctx.similarStories(current).length,0);}Object.assign(peer,saved);peer.publishedAt='2099-01-01T00:00:00Z';assert.equal(ctx.similarStories(current).length,0);Object.assign(peer,saved);peer.sourceApproval.status='pending';assert.equal(ctx.similarStories(current).length,0);Object.assign(peer,JSON.parse(JSON.stringify(saved)));
peer.status='hold';const spoiled=code.slice(0,code.indexOf('.filter(function (item)'))+code.slice(code.indexOf('.slice(0, 3)'));const bad={...ctx};vm.createContext(bad);vm.runInContext(spoiled,bad);assert.throws(()=>assert.equal(bad.similarStories(current).length,0),'unfiltered implementation must fail the same held-story assertion');Object.assign(peer,saved);assert.equal((html.match(/renderSimilarStories\(story\),/g)||[]).length,2,'both article templates');console.log('PASS related selection, exclusions, no filler, max3, no duplicates, both article templates');

// Explicit source-bound editorial relationships use the same admission filter.
{
const start=html.indexOf('        function similarStories(story) {'),end=html.indexOf('        function renderSimilarStories',start);
assert(start>=0&&end>start);
const story=(id,overrides={})=>({id,slug:id,status:'published',publishedAt:'2026-09-10T01:00:00Z',edition:'daily',...overrides});
const items=[story('earlier'),story('later'),story('held',{status:'hold'}),story('future',{publishedAt:'2026-09-12T01:00:00Z'}),story('blocked',{admitted:false}),story('corrected',{status:'corrected'})];
const context={stories:items,now:'2026-09-11T01:00:00Z',data:{},contract:{storyState:s=>s.status,accessDecision:(_d,s)=>({canExpose:s.admitted!==false})}};
vm.createContext(context);vm.runInContext(html.slice(start,end),context);
const result=context.similarStories(story('current',{predecessorStoryIds:['earlier','held','future','missing'],successorStoryIds:['later','blocked'],relatedStoryIds:['corrected','earlier','current']}));
assert.deepEqual(Array.from(result,s=>s.id),['corrected','earlier','later']);
assert.equal(context.similarStories(story('unrelated',{tags:['AI']})).length,0,'broad tags must not manufacture related stories');
assert.equal(context.similarStories(story('bad',{relatedStoryIds:'earlier'})).length,0,'malformed relation ignored');
console.log('SIMILAR STORIES PASS explicit relationships retained; held/future/blocked/missing/self/duplicate excluded; no broad-tag inference');

}

assert(!html.includes('escapeHTML(story.relationshipType.replace'), "internal relationship type is not an explanation of what changed");
