#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateLibraryKnownFailures } from './lib/library-known-failures.mjs';

const assets = [
  'assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
  'assets/building-interiors/library-shelf/room/wall-neutral-light-v1.png',
  'assets/building-interiors/library-shelf/room/floor-geometric-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
  'assets/building-interiors/library-shelf/library-wall-case-2bay-two-row-v2.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png',
  'assets/library/episode-01-pop-comic-bg-v1.png'
].join(' ');
const good = `<style>body{background:#fffdfb}.library-hero{background:linear-gradient(145deg,#ef4d9c,#b75cc4 58%,#6c7cd1)}.library-world{background:linear-gradient(120deg,#f2c6e5,#c7d7f5)}.jv{background:linear-gradient(120deg,rgba(239,77,156,.86),rgba(113,55,214,.84),rgba(101,209,227,.9)),url('assets/library/episode-01-pop-comic-bg-v1.png')}.shelf-guide{background:#67bde8 url('assets/library/episode-01-pop-comic-bg-v1.png')}</style>
<style>/* CATALOGUE_ROUNDED_GRAMMAR_CONTRACT */.shelf-guide .eyebrow{border-radius:999px}.shelf-caption{border-radius:24px}.catalogue-controls{border-radius:24px}.catalogue-closet{justify-content:center;min-height:76px}.catalogue-closet[hidden]{display:none}.catalogue-closet strong{display:block}.shelf-guide input{border-radius:16px}/* LIBRARY_WALL_CROP_CONTRACT */.library-room-unit{background-image:linear-gradient(red,red),url('assets/building-interiors/library-shelf/room/wall-neutral-light-v1.png'),url('assets/building-interiors/library-shelf/room/floor-geometric-v1.png');background-size:100% 100%,100% 100%,auto 6%;background-repeat:no-repeat,no-repeat,repeat-x}.library-room-unit[data-collection-room="0"]{--room-tint:pink}.library-room-unit[data-collection-room="1"]{--room-tint:cyan}.library-room-unit[data-collection-room="2"]{--room-tint:purple}.library-room-unit.is-compact-room{aspect-ratio:2.1/1}/* LIBRARY_SHELF_DEPTH_CONTRACT */.shelf-unit:not(.is-compact){bottom:-5%}.shelf-unit::after{z-index:5;background:url('assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png')}.shelf-unit.is-compact{bottom:0}.shelf-unit.is-compact::after{background:url('assets/building-interiors/library-shelf/library-wall-case-2bay-two-row-v2.png')}.brow--1{bottom:65.3%}.brow--2{bottom:38.7%}.brow--3{bottom:12.2%}.shelf-unit.is-compact .brow--1{bottom:51.2%}.shelf-unit.is-compact .brow--2{bottom:13.7%}.bk img{transform:translateY(-3%)}</style><style>@media(max-width:700px){/* MOBILE_BOOK_VISIBLE_SIZE_CONTRACT */.library-room-unit{background-size:100% calc(100% - 60px),100% calc(100% - 60px),auto 60px}.mobile-shelf-caption{display:none}.department{z-index:6}.brow{height:27%;min-height:120px;z-index:6}.brow--1{bottom:65.5%}.brow--2{bottom:37%}.brow--3{bottom:8.5%}.shelf-unit.is-compact .brow{height:22%;min-height:120px}.shelf-unit.is-compact .brow--1{bottom:60%}.shelf-unit.is-compact .brow--2{bottom:35%}.bk img{transform:translateY(-4%)}}</style>
<style>@media(max-width:700px){.library-room-unit{background-size:100% 100%,100% 100%,auto 6%}.shelf-unit.is-compact .brow{height:35%;min-height:120px}.shelf-unit.is-compact .brow--1{bottom:65%}.shelf-unit.is-compact .brow--2{bottom:5%}.bk img{transform:translateY(-4%)}}</style>
<script>/* BOOK_VISIBLE_SIZE_CONTRACT */const LIBRARY_CASE_ANCHOR_CONTRACT={};const BOOK_PREVIEW_CHOICE_CONTRACT={};/* CATALOGUE_QUIET_DEFAULT_CONTRACT */const catalogueHasActiveFilter=false;const visible={length:4};const compactClass=visible.length>0&&visible.length<=4?' is-compact':'';result.textContent=!catalogueHasActiveFilter?'':'1 book found.';function resetBookPreview(){};resetBookPreview(true);returnTarget.focus({preventScroll:true});</script>
<div class="jv-chips"><button>Which AI should I use?</button><button>Can I upload a work document?</button><button>How do I check an AI answer?</button><button>What can AI help me do at work?</button></div>
<script>const answer='<article data-answer-id="service-answer"><a data-source-id="governed-source"></a></article>';</script>
<button id="book-preview-back">Back to the shelf</button><button>Open this book</button>
<h1 id="library-title">The LIBR<span class="ai">Ai</span>RY</h1><small>Not sure where to start? Ask Miss Jeeves. Looking for a specific topic? Browse the shelves.</small><p class="visitor-state" id="puffyVisitorState" aria-live="polite" hidden></p><a class="catalogue-closet" hidden><span id="library-saved-count"></span></a><script>const closet=output.closest('.catalogue-closet');closet.hidden=!count;</script><div class="shelf-guide-heading"></div><div class="shelf-captions"></div><script>section.books.filter(book=>book.listed!==false&&book.img).slice(0,3);const guide='<a class="shelf-caption" href="#library-shelf-\${sectionIndex}" data-shelf-jump="\${sectionIndex}"><div class="shelf-caption-art"></div></a>';const room='<div id="library-shelf-\${sectionIndex}"></div>';</script><p class="library-status sr-only" id="library-status"></p><div class="library-room-unit"><div class="shelf-unit"><div class="brow brow--1" data-book-count="1"><button class="bk" data-preview-book data-visible-scale="1"><span class="sr-only">Preview book</span></button></div></div></div>${assets}`;

assert.deepEqual(validateLibraryKnownFailures(good), []);

const fixtures = [
  [good + "<script>const artifactSha256='3bf3d6bddd659af063426701541c4d19debc2a39707bde2f7435a555cc835508';</script>", 'directly rejected AI Fundamentals artifact'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-purple-sign-wall-v5.png'), 'lumpy Miss Jeeves v5 masthead'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-purple-sign-wall-v7-clean-metal-stacks.png'), 'mottled Miss Jeeves v7 masthead'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-style-b-hand-inked-animation.png'), 'replacement hand-inked masthead'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-purple-sign-wall-v8-clean-jeeves.png'), 'over-rendered floppy-sign masthead'],
  [good + '<img class="arrival-prop arrival-printer-sign" src="assets/library/library-printer-sign-v1.png">', 'sticker-like masthead overlay'],
  [good + '<img class="arrival-scanner" src="assets/library/library-flatbed-scanner-v1.png">', 'floating scanner overlay'],
  [good.replace('Not sure where to start? Ask Miss Jeeves. Looking for a specific topic? Browse the shelves.', 'Ask Miss Jeeves when you only know the question.'), 'ask-or-browse orientation'],
  [good.replace('aria-live="polite" hidden', 'aria-live="polite"'), 'Resident Card setup copy'],
  [good.replace('113,55,214', '65,209,227'), 'Miss Jeeves background'],
  [good.replace('Which AI should I use?', 'how do I write a better prompt?'), 'prompt-first or browser-hardcoded Miss Jeeves answer'],
  [good.replace('const answer=', "const JEEVES_ANSWERS=[{id:'prompt-brief'}];const answer="), 'prompt-first or browser-hardcoded Miss Jeeves answer'],
  [good.replace('data-answer-id', 'data-answer-removed'), 'answer/source evidence attributes'],
  [good.replaceAll('assets/library/episode-01-pop-comic-bg-v1.png', 'assets/library/missing-comic.png'), 'pop-comic catalogue background'],
  [good.replace('#c7d7f5', '#19d3d1'), 'Library world gradient'],
  [good + '<section class="library-handback"></section>', 'library-handback slab'],
  [good + '<span class="bk-status">PREVIEW</span>', 'status slab'],
  [good + '<div id="shelf-pages"><button>Next</button></div>', 'pagination'],
  [good + `compactShelfLayout?'.department':'.library-room-unit'`, 'detach'],
  [good.replace('/* BOOK_VISIBLE_SIZE_CONTRACT */', '/* REMOVED_SIZE_CONTRACT */'), 'visible-alpha'],
  [good.replace('min-height:120px', 'min-height:80px'), '120px visible-book dimension'],
  [good.replaceAll('min-height:120px', 'min-height:96px'), '120px visible-book dimension'],
  [good.replace('LIBRARY_CASE_ANCHOR_CONTRACT', 'REMOVED_ANCHOR_CONTRACT'), 'wall/case'],
  [good.replace('LIBRARY_WALL_CROP_CONTRACT', 'REMOVED_WALL_CROP_CONTRACT'), 'collection room wall layer'],
  [good.replace('data-collection-room="1"', 'data-room-removed="1"'), 'distinct collection wall colours'],
  [good.replace('LIBRARY_SHELF_DEPTH_CONTRACT', 'REMOVED_SHELF_DEPTH_CONTRACT'), 'foreground metal frame'],
  [good.replaceAll('library-wall-case-2bay-two-row-v2.png', 'missing-compact-case.png'), 'compact two-bay case'],
  [good.replace('translateY(-3%)', 'translateY(2.5%)'), 'shelf/rail seating geometry'],
  [good.replace('.brow--1{bottom:65.3%}', '.brow--1{bottom:64.7%}'), 'shelf/rail seating geometry'],
  [good.replaceAll('floor-geometric-v1.png', 'floor-clean-v1.png'), 'correct geometric Library carpet'],
  [good + "<style>.library-room-unit{background:url('assets/building-interiors/library-shelf/room/floor-clean-v1.png')}</style>", 'retired dark-arrow carpet'],
  [good.replaceAll('100% 100%,100% 100%,auto 6%', '100% 83.3%,100% 83.3%,100% auto'), 'rises behind the shelves'],
  [good.replaceAll('auto 6%', 'auto 18%'), 'correct geometric Library carpet'],
  [good.replace('<style>@media(max-width:700px){.library-room-unit{background-size:100% 100%,100% 100%,auto 6%}', '<style>@media(max-width:700px){.library-room-unit{background-size:100% calc(100% - 60px),100% calc(100% - 60px),auto 60px}'), 'mobile carpet rises behind the lower shelf row'],
  [good.replace('.department{z-index:6}', '.department{z-index:3}'), 'mobile shelf books'],
  [good.replace('BOOK_PREVIEW_CHOICE_CONTRACT', 'REMOVED_PREVIEW_CHOICE_CONTRACT'), 'physical one-click shelf']
  ,[good.replace('id="book-preview-back"', 'id="preview-return-removed"'), 'one-click preview choice']
  ,[good + '<article class="shelf-book-record"><div class="shelf-book-copy"></div></article>', 'inline full-preview shelf']
  ,[good + '<p class="shelf-instruction">Do this first</p>', 'instruction paragraph']
  ,[good + '<p>Held books explain the hold and cannot open.</p>', 'held-book warning']
  ,[good.replace('CATALOGUE_ROUNDED_GRAMMAR_CONTRACT', 'REMOVED_ROUNDED_GRAMMAR_CONTRACT'), 'rounded catalogue grammar']
  ,[good.replace('class="catalogue-closet" hidden', 'class="catalogue-closet"'), 'empty My Closet control']
  ,[good.replace('CATALOGUE_QUIET_DEFAULT_CONTRACT', 'REMOVED_QUIET_DEFAULT_CONTRACT'), 'quiet default catalogue']
  ,[good.replace('class="library-status sr-only"', 'class="library-status"'), 'screen-reader-only']
  ,[good.replace('The LIBR<span class="ai">Ai</span>RY', 'The Town LIBR<span class="ai">Ai</span>RY'), 'Library title']
  ,[good.replace('shelf-caption-art', 'shelf-caption-removed'), 'comic collection guide']
  ,[good.replace('data-shelf-jump', 'data-shelf-static'), 'exact physical shelves']
];

for (const [fixture, expected] of fixtures) {
  assert(validateLibraryKnownFailures(fixture).some(error => error.includes(expected)), `${expected} fixture must fail`);
}

const currentLibrary=fs.readFileSync('library.html','utf8');
assert.doesNotMatch(currentLibrary,/how do i write a better prompt|\bbetter prompt\b|JEEVES_ANSWERS|id:\s*['"]prompt-brief['"]/i,'current Library must not restore prompt-first or browser-hardcoded Miss Jeeves answers');
const currentChipBlock=currentLibrary.match(/<div class=["']jv-chips["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]||'';
for(const question of ['Which AI should I use?','Can I upload a work document?','How do I check an AI answer?','What can AI help me do at work?']) assert.ok(currentChipBlock.includes(`>${question}</button>`),`current Library must show tested common question: ${question}`);
assert.match(currentLibrary,/placeholder="Ask your question about AI or using it at work"/,'current Library must invite the visitor’s own ordinary-language question');

console.log('LIBRARY KNOWN-FAILURE TEST PASS');
console.log(`calibrated_reject_fixtures=${fixtures.length}`);
