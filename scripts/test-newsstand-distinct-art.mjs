import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('newsstand.html','utf8');
const helper=html.slice(html.indexOf('        function storyIllustration('),html.indexOf('        function renderArticleHero('));
const start=html.indexOf('          Array.prototype.forEach.call(document.querySelectorAll("[data-secondary-for]")');
const end=html.indexOf('\n        }\n\n        function setArrivalState',start);
const renderer=html.slice(start,end);
function render(stories){
 const node={getAttribute:()=> 'daily',innerHTML:''};
 const c={document:{querySelectorAll:()=>[node]},data:{publications:{daily:{}}},contract:{effectivePublicationState:()=> 'current',withinRecentCalendarDays:()=>true},now:'2026-09-06',admittedArchiveStories:()=>stories,escapeHTML:String,escapeAttribute:String,formatDate:String};
 vm.createContext(c);vm.runInContext(helper+renderer,c);return node.innerHTML;
}
const story=(id,src)=>({id,slug:id,headline:id,publishedAt:'2026-09-06',heroVisual:{src,alt:'Example'}});
const duplicate=render([story('a','/same.png'),story('b','/same.png')]);
assert.equal((duplicate.match(/<img /g)||[]).length,1,'duplicate art must become a text brief, not repeat');
assert.match(duplicate,/>b<\/strong>/,'duplicate suppression must retain story');
const distinct=render([story('gastric-cancer-prediction-2026-09-05','/same.png'),story('us-doj-openai-copyright-2026-09-05','/same.png')]);
assert.match(distinct,/cancer-vibrant.png/);assert.match(distinct,/copyright-vibrant.png/);
assert.doesNotMatch(distinct,/same.png/);
console.log('DISTINCT ART PASS: known-bad duplicate suppressed; both stories retained; medical/legal art distinct.');
