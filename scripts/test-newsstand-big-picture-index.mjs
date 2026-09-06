import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('newsstand.html','utf8');
const start=source.indexOf('            var allPictures = stories.filter');
assert(start>0);
const code=source.slice(start,source.indexOf('\n          }\n          renderTopicButtons();',start));
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
function render(stories){const morePicture={};vm.runInNewContext(code,{stories,morePicture,data:{},now:new Date(),contract:{accessDecision(_data,s,options){assert.equal(options.scope,'search');return {canExpose:s.admitted};}},escapeHTML:escape,escapeAttribute:escape,formatDate:s=>s});return morePicture;}
const make=(id,admitted=true,edition='big-picture')=>({slug:id,headline:id,publishedAt:'2026-09-06',admitted,edition});
for(const rows of [[],[make('one')],[make('one'),make('draft',false),make('daily',true,'daily')]]){const r=render(rows);assert.equal(r.hidden,true);assert.equal(r.innerHTML,'');}
const full=render([make('lead'),make('two'),make('three'),make('four'),make('five'),make('private',false)]);
assert.equal(full.hidden,false);assert.match(full.innerHTML,/<details><summary>Read all Big Picture →<\/summary>/);assert.equal((full.innerHTML.match(/<a /g)||[]).length,5);assert(full.innerHTML.includes('#lead'));assert(!full.innerHTML.includes('private'));
const unsafe=render([make('safe'),make('<img onerror="bad">')]);assert(!unsafe.innerHTML.includes('<img'));assert(unsafe.innerHTML.includes('&lt;img'));
console.log('BIG PICTURE INDEX PASS: 0/1 hidden; 2+ native disclosure; lead and all five included; inaccessible/non-Big-Picture excluded; escaped content.');
