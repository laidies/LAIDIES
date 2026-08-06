#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateLibraryKnownFailures } from './lib/library-known-failures.mjs';

const assets = [
  'assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png',
  'assets/building-interiors/library-shelf/room/wall-neutral-light-v1.png',
  'assets/building-interiors/library-shelf/room/floor-clean-v1.png',
  'assets/library/library-printer-sign-v1.png',
  'assets/library/library-flatbed-scanner-v1.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png',
  'assets/building-interiors/library-shelf/library-wall-case-2bay-two-row-v2.png',
  'assets/building-interiors/library-shelf/delivery-20260722-3-shelf-upright-v1/library-shelf-unit-3-shelf-upright-v1.png',
  'assets/library/episode-01-pop-comic-bg-v1.png'
].join(' ');
const good = `<style>body{background:#fffdfb}.library-hero{background:linear-gradient(145deg,#ef4d9c,#b75cc4 58%,#6c7cd1)}.library-world{background:linear-gradient(120deg,#f2c6e5,#c7d7f5)}.jv{background:linear-gradient(120deg,rgba(239,77,156,.86),rgba(113,55,214,.84),rgba(101,209,227,.9)),url('assets/library/episode-01-pop-comic-bg-v1.png')}.shelf-guide{background:#67bde8 url('assets/library/episode-01-pop-comic-bg-v1.png')}</style>
<style>/* CATALOGUE_ROUNDED_GRAMMAR_CONTRACT */.shelf-guide .eyebrow{border-radius:999px}.shelf-caption{border-radius:24px}.catalogue-controls{border-radius:24px}.catalogue-closet{justify-content:center;min-height:76px}.catalogue-closet strong{display:block}.shelf-guide input{border-radius:16px}/* LIBRARY_WALL_CROP_CONTRACT */.library-room-unit{background-image:linear-gradient(red,red),url('assets/building-interiors/library-shelf/room/wall-neutral-light-v1.png'),url('assets/building-interiors/library-shelf/room/floor-clean-v1.png');background-size:100% 83.3%,100% 83.3%,100% auto}.library-room-unit[data-collection-room="0"]{--room-tint:pink}.library-room-unit[data-collection-room="1"]{--room-tint:cyan}.library-room-unit[data-collection-room="2"]{--room-tint:purple}.library-room-unit.is-compact-room{aspect-ratio:2.1/1}/* LIBRARY_SHELF_DEPTH_CONTRACT */.shelf-unit:not(.is-compact){bottom:-5%}.shelf-unit::after{z-index:5;background:url('assets/building-interiors/library-shelf/delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png')}.shelf-unit.is-compact{bottom:0}.shelf-unit.is-compact::after{background:url('assets/building-interiors/library-shelf/library-wall-case-2bay-two-row-v2.png')}.brow--1{bottom:65.3%}.brow--2{bottom:38.7%}.brow--3{bottom:12.2%}.shelf-unit.is-compact .brow--1{bottom:51.2%}.shelf-unit.is-compact .brow--2{bottom:13.7%}.bk img{transform:translateY(0)}</style><style>@media(max-width:700px){.mobile-shelf-caption{display:none}.department{z-index:6}.brow{height:27%;z-index:6}.brow--1{bottom:65.5%}.brow--2{bottom:37%}.brow--3{bottom:8.5%}.shelf-unit.is-compact .brow{height:22%}.shelf-unit.is-compact .brow--1{bottom:60%}.shelf-unit.is-compact .brow--2{bottom:35%}.bk img{transform:translateY(-4%)}}</style>
<script>const BOOK_VISIBLE_SIZE_CONTRACT={};const LIBRARY_CASE_ANCHOR_CONTRACT={};const BOOK_PREVIEW_CHOICE_CONTRACT={};/* CATALOGUE_QUIET_DEFAULT_CONTRACT */const catalogueHasActiveFilter=false;const visible={length:4};const compactClass=visible.length>0&&visible.length<=4?' is-compact':'';result.textContent=!catalogueHasActiveFilter?'':'1 book found.';function resetBookPreview(){};resetBookPreview(true);returnTarget.focus({preventScroll:true});</script>
<!-- MISS_JEEVES_SUGGESTION_CONTRACT --><div class="jv-chips"><button>how do I write a better prompt?</button><button>what's a hallucination?</button><button>who built AI?</button><button>what is generative AI?</button></div>
<script>const jeevesRoutes=[{id:'prompt-brief',sourceId:'ep-02'},{id:'hallucination-basics',sourceId:'ep-03'},{id:'women-built-ai',sourceId:'ep-04'},{id:'generative-ai-basics',sourceId:'concept-generative'}];const answer='<article data-answer-id="prompt-brief"><a data-source-id="ep-02"></a></article>';</script>
<button id="book-preview-back">Back to the shelf</button><button>Open this book</button>
<h1 id="library-title">The LIBR<span class="ai">Ai</span>RY</h1><small>Not sure where to start? Ask Miss Jeeves. Looking for a specific topic? Browse the shelves.</small><p class="visitor-state" id="puffyVisitorState" aria-live="polite" hidden></p><img class="arrival-printer-sign" src="assets/library/library-printer-sign-v1.png"><img class="arrival-scanner" src="assets/library/library-flatbed-scanner-v1.png"><div class="shelf-guide-heading"></div><div class="shelf-captions"></div><script>section.books.filter(book=>book.listed!==false&&book.img).slice(0,3);const guide='<a class="shelf-caption" href="#library-shelf-\${sectionIndex}" data-shelf-jump="\${sectionIndex}"><div class="shelf-caption-art"></div></a>';const room='<div id="library-shelf-\${sectionIndex}"></div>';</script><p class="library-status sr-only" id="library-status"></p><div class="library-room-unit"><div class="shelf-unit"><div class="brow brow--1" data-book-count="1"><button class="bk" data-preview-book data-visible-scale="1"><span class="sr-only">Preview book</span></button></div></div></div>${assets}`;

assert.deepEqual(validateLibraryKnownFailures(good), []);

const fixtures = [
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-purple-sign-wall-v5.png'), 'lumpy Miss Jeeves v5 masthead'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-purple-sign-wall-v7-clean-metal-stacks.png'), 'mottled Miss Jeeves v7 masthead'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-style-b-hand-inked-animation.png'), 'replacement hand-inked masthead'],
  [good.replace('library-interior-from-credits-dechromed-v4-no-baked-text.png', 'library-interior-purple-sign-wall-v8-clean-jeeves.png'), 'over-rendered floppy-sign masthead'],
  [good.replace('arrival-printer-sign', 'arrival-printer-removed'), 'localized printer sign or scanner'],
  [good.replace('Not sure where to start? Ask Miss Jeeves. Looking for a specific topic? Browse the shelves.', 'Ask Miss Jeeves when you only know the question.'), 'ask-or-browse orientation'],
  [good.replace('aria-live="polite" hidden', 'aria-live="polite"'), 'Resident Card setup copy'],
  [good.replace('113,55,214', '65,209,227'), 'Miss Jeeves background'],
  [good.replace('MISS_JEEVES_SUGGESTION_CONTRACT', 'REMOVED_JEEVES_SUGGESTION_CONTRACT'), 'bounded suggestion contract'],
  [good.replace('who built AI?', 'how does AI work?'), 'broad Miss Jeeves suggestion'],
  [good.replace('what is generative AI?', 'what is an LLM?'), 'required bounded Miss Jeeves suggestion'],
  [good.replace("sourceId:'ep-04'", "sourceId:'missing-ep-04'"), 'deterministic answer/source route'],
  [good.replace('data-answer-id', 'data-answer-removed'), 'answer/source evidence attributes'],
  [good.replaceAll('assets/library/episode-01-pop-comic-bg-v1.png', 'assets/library/missing-comic.png'), 'pop-comic catalogue background'],
  [good.replace('#c7d7f5', '#19d3d1'), 'Library world gradient'],
  [good + '<section class="library-handback"></section>', 'library-handback slab'],
  [good + '<span class="bk-status">PREVIEW</span>', 'status slab'],
  [good + '<div id="shelf-pages"><button>Next</button></div>', 'pagination'],
  [good + `compactShelfLayout?'.department':'.library-room-unit'`, 'detach'],
  [good.replace('BOOK_VISIBLE_SIZE_CONTRACT', 'REMOVED_SIZE_CONTRACT'), 'visible-alpha'],
  [good.replace('LIBRARY_CASE_ANCHOR_CONTRACT', 'REMOVED_ANCHOR_CONTRACT'), 'wall/case'],
  [good.replace('LIBRARY_WALL_CROP_CONTRACT', 'REMOVED_WALL_CROP_CONTRACT'), 'collection room wall layer'],
  [good.replace('data-collection-room="1"', 'data-room-removed="1"'), 'distinct collection wall colours'],
  [good.replace('LIBRARY_SHELF_DEPTH_CONTRACT', 'REMOVED_SHELF_DEPTH_CONTRACT'), 'foreground metal frame'],
  [good.replaceAll('library-wall-case-2bay-two-row-v2.png', 'missing-compact-case.png'), 'compact two-bay case'],
  [good.replace('translateY(0)', 'translateY(2.5%)'), 'shelf/rail seating geometry'],
  [good.replace('.brow--1{bottom:65.3%}', '.brow--1{bottom:64.7%}'), 'shelf/rail seating geometry'],
  [good.replaceAll('floor-clean-v1.png', 'floor-clean-tinted-v1.png'), 'shared unfiltered Library carpet'],
  [good.replace('.department{z-index:6}', '.department{z-index:3}'), 'mobile shelf books'],
  [good.replace('BOOK_PREVIEW_CHOICE_CONTRACT', 'REMOVED_PREVIEW_CHOICE_CONTRACT'), 'physical one-click shelf']
  ,[good.replace('id="book-preview-back"', 'id="preview-return-removed"'), 'one-click preview choice']
  ,[good + '<article class="shelf-book-record"><div class="shelf-book-copy"></div></article>', 'inline full-preview shelf']
  ,[good + '<p class="shelf-instruction">Do this first</p>', 'instruction paragraph']
  ,[good + '<p>Held books explain the hold and cannot open.</p>', 'held-book warning']
  ,[good.replace('CATALOGUE_ROUNDED_GRAMMAR_CONTRACT', 'REMOVED_ROUNDED_GRAMMAR_CONTRACT'), 'rounded catalogue grammar']
  ,[good.replace('min-height:76px', 'min-height:50px'), 'Closet copy']
  ,[good.replace('CATALOGUE_QUIET_DEFAULT_CONTRACT', 'REMOVED_QUIET_DEFAULT_CONTRACT'), 'quiet default catalogue']
  ,[good.replace('class="library-status sr-only"', 'class="library-status"'), 'screen-reader-only']
  ,[good.replace('The LIBR<span class="ai">Ai</span>RY', 'The Town LIBR<span class="ai">Ai</span>RY'), 'Library title']
  ,[good.replace('shelf-caption-art', 'shelf-caption-removed'), 'comic collection guide']
  ,[good.replace('data-shelf-jump', 'data-shelf-static'), 'exact physical shelves']
];

for (const [fixture, expected] of fixtures) {
  assert(validateLibraryKnownFailures(fixture).some(error => error.includes(expected)), `${expected} fixture must fail`);
}

console.log('LIBRARY KNOWN-FAILURE TEST PASS');
console.log(`calibrated_reject_fixtures=${fixtures.length}`);
