import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import selection from '../content/newsstand-selection.js';
const html=fs.readFileSync(new URL('../newsstand.html',import.meta.url),'utf8');
const start=html.indexOf('function storiesForCurrentPublication(');
const end=html.indexOf('Array.prototype.forEach.call(document.querySelectorAll("[data-contents-for]"',start);
const historical=[{id:'honeybook-plugin-20260912'},{id:'amodei-ai-pacing-20260912'}];
function run(text,state){
 const context={window:{NewsstandSelection:selection},contract:{visibleStories:()=>historical},admittedArchiveStories:()=>historical,data:{},now:'2026-09-12T20:00:00Z'};
 vm.runInNewContext(text+'\nthis.result=storiesForCurrentPublication("daily",{issue:{storyIds:'+JSON.stringify(historical.map(x=>x.id))+'}},'+JSON.stringify(state)+');',context);
 return JSON.parse(JSON.stringify(context.result)).map(x=>x.id);
}
const fn=html.slice(start,end);
assert.deepEqual(run(fn,'current'),historical.map(x=>x.id).reverse());
for(const state of ['archive','stale']) assert.deepEqual(run(fn,state),historical.map(x=>x.id));
const knownBad=fn.replace('state === "current" ? datedStories.sort(window.NewsstandSelection.compare) : datedStories','datedStories.sort(window.NewsstandSelection.compare)');
assert.notDeepEqual(run(knownBad,'archive'),historical.map(x=>x.id),'calibration must expose historical order regression');
console.log('SELECTION: current editorial order, archive/stale original order, known-bad archived reorder detected');
const oldImportant={id:'take-it-down-sentencing-20260910',publishedAt:'2026-09-10T20:00:00Z'};
const newerNiche={id:'honeybook-plugin-20260912',publishedAt:'2026-09-12T19:00:00Z'};
assert.deepEqual([oldImportant,newerNiche].sort(selection.compare),[newerNiche,oldImportant],'newer calendar date always precedes older relevance');
const lateLocal={id:'honeybook-plugin-20260912',publishedAt:'2026-09-11T06:00:00Z'};
assert.deepEqual([lateLocal,oldImportant].sort(selection.compare),[oldImportant,lateLocal],'UTC midnight does not split one Vancouver publication day');
const imageStart=html.indexOf('function storyIllustration('),imageEnd=html.indexOf('function renderArticleHero(',imageStart);
const imageContext={};vm.runInNewContext(html.slice(imageStart,imageEnd)+'\nthis.pick=storyIllustration;',imageContext);
for(const id of ['anthropic-threat-report-20260910','historical-snapshot']) assert.equal(imageContext.pick({id,heroVisual:{src:'/assets/newsstand/design-20260830/latest-anthropic-agentic-incidents-20260902.png'}}),null);
assert.equal(imageContext.pick({id:'other',heroVisual:{src:'/approved.png'}}).src,'/approved.png');
console.log('DATE/ART: newest local date first, midnight case, rejected image blocked for every story ID, unrelated art retained');
