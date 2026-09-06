import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=process.env.NEWSSTAND_ROTATION_ROOT || '.';
const deck=JSON.parse(fs.readFileSync(path.join(root,'content/data/mme-claio-deck.json')));
const source=fs.readFileSync('content/site/newsstand-catchup-v1.js','utf8');
const code=source.slice(source.indexOf('  function validatedReadingCards('),source.indexOf('  function renderFrontDesks('));
const c={DAY_MS:86400000};vm.createContext(c);vm.runInContext(code,c);
assert.equal(c.validatedReadingCards(deck).length,100);
const date=week=>new Date(Date.UTC(2026,8,2)+week*7*86400000).toISOString().slice(0,10);
const seen=new Set();
for(let week=0;week<100;week++){
 const selected=c.weeklyReadingCard(deck.cards,date(week));seen.add(selected.id);
 assert.equal(selected.id,deck.cards[week].id);
 if(!['beanie-baby-tag','hair-wrap-thread','milky-pen','temporary-tattoo'].includes(selected.art_slug)) assert.ok(fs.existsSync(path.join(root,'assets/mme-claio/reading-cards',selected.art_slug+'.webp')),selected.id+' original art missing');
}
assert.equal(seen.size,100);assert.equal(c.weeklyReadingCard(deck.cards,date(100)).id,deck.cards[0].id);
assert.equal(c.weeklyReadingCard(deck.cards,'2026-09-08').id,deck.cards[0].id);
assert.equal(c.weeklyReadingCard(deck.cards,'2026-09-09').id,deck.cards[1].id);
assert.equal(c.weeklyReadingCard(deck.cards,'2026-11-03').id,c.weeklyReadingCard(deck.cards,'2026-10-28').id,'DST must not move Wednesday');
assert.equal(c.weeklyReadingCard(deck.cards,'2026-02-30'),null);
assert.equal(c.validatedReadingCards({...deck,cards:deck.cards.slice(0,99)}),null);
const duplicate=structuredClone(deck);duplicate.cards[99]=duplicate.cards[0];assert.equal(c.validatedReadingCards(duplicate),null);
const unsafe=structuredClone(deck);unsafe.cards[0].art_slug='../escape';assert.equal(c.validatedReadingCards(unsafe),null);
const missing=structuredClone(deck);delete missing.cards[0].move;assert.equal(c.validatedReadingCards(missing),null);
const lum=fs.readFileSync('content/site/newsstand-luminairy.js','utf8');
vm.runInContext("var first={saints:'sister-mary-clarence',mavens:'hannah-fry',trailblazers:'allie-k-miller'};"+lum.slice(lum.indexOf('  function spotlightForWeek('),lum.indexOf('  function safeLink(')),c);
const profiles=JSON.parse(fs.readFileSync(path.join(root,'content/luminairy-profiles.json')));
for(const [index,wing] of ['saints','mavens','trailblazers'].entries()){
 const roster=profiles[wing].filter(p=>!p.antiSaint), ids=new Set();
 for(let visit=0;visit<roster.length;visit++){
  const s=c.spotlightForWeek(profiles,visit*3+index);assert.equal(s.wing,wing);ids.add(s.profile.id);
 }
 assert.equal(ids.size,roster.length,wing+' entire roster before repeat');
 assert.equal(c.spotlightForWeek(profiles,index).profile.id,c.spotlightForWeek(profiles,roster.length*3+index).profile.id);
}
assert.equal(c.spotlightForWeek(profiles,0).profile.id,'sister-mary-clarence');
console.log('FEATURE ROTATION PASS: all 100 original cards; 96 artwork paths plus 4 canonical text-only cards; full cycle before repeat; Wednesday/DST; invalid decks reject; one wing weekly; every roster member before repeat.');
