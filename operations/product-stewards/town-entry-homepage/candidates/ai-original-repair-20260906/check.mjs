import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const p='operations/product-stewards/town-entry-homepage/candidates/ai-original-repair-20260906/';
function inspect(html,video){assert.equal(crypto.createHash('sha256').update(video).digest('hex'),'05a52c003ecf0b0caad7dcdb9c056da3b77dd9ee27d9dc67ee0aa7eaf2c1ffa3','Original footage changed');assert(!/putting the ai in laidies|we put ai in laidies/i.test(html),'Unwanted slogan');assert(html.includes('data-original-arrival'),'Missing original arrival');assert(!html.includes('ai-arrival__word'),'Replacement wordmark returned');}
const html=fs.readFileSync('index.html','utf8'),video=fs.readFileSync('content/site/ai-original-arrival/original.mp4');inspect(html,video);
assert.throws(()=>inspect(html+'Putting the Ai in LAiDIES',video));assert.throws(()=>inspect(html,Buffer.from('replacement video')));
const trace=JSON.parse(fs.readFileSync(p+'continuous-browser-check.json'));assert(trace.ended&&trace.hidden);for(const phase of ['dial','original-name','approach','original-icons','return','tracking'])assert(trace.rows.some(r=>r.phase===phase));
const checks=JSON.parse(fs.readFileSync(p+'functional-checks.json'));assert(checks.pauseFreezes&&checks.completion.hidden&&checks.completion.replay&&!checks.completion.overflow);assert.equal(checks.completion.videoTime,checks.completion.duration);
console.log('Original footage, no slogan, all phases and pause/completion verified. Bad slogan and replacement footage rejected. No visual-quality or dropped-frame claim.');
