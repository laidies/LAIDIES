#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';

const library = fs.readFileSync('library.html', 'utf8');
const worker = fs.readFileSync('_worker.js', 'utf8');
const homepage = fs.readFileSync('content/site/homepage.js', 'utf8');
const puffies = fs.readFileSync('content/site/puffy-bookmarks.js', 'utf8');
const index = JSON.parse(fs.readFileSync('content/site/miss-jeeves-index.json', 'utf8'));

function validate(source, workerSource = worker, searchIndex = index) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(source.includes('>Browse the books</div>') && source.includes('Browse all four books'), 'visitor action is Browse the books');
  require(!/>Browse the shelves</i.test(source), 'retired Browse the shelves visitor label is absent');
  for (const [needle, label] of [
    ['library-interior-purple-sign-wall-v5.png', 'lumpy v5 masthead'],
    ['library-interior-purple-sign-wall-v7-clean-metal-stacks.png', 'mottled v7 masthead'],
    ['library-interior-style-b-hand-inked-animation.png', 'replacement hand-inked masthead'],
    ['library-interior-purple-sign-wall-v8-clean-jeeves.png', 'over-rendered floppy-sign masthead'],
    ['library-printer-sign-v1.png', 'sticker-like masthead overlay'],
    ['library-flatbed-scanner-v1.png', 'floating scanner overlay'],
    ['library-handback', 'library handback slab'],
    ['bk-status', 'status slab'],
    ['shelf-pages', 'pagination']
  ]) require(!source.includes(needle), `rejected ${label} is absent`);
  require(!/class="shelf-captions"|data-shelf-jump/.test(source), 'three category-choice boxes are absent');
  require((source.match(/id=\\?"library-shelf-all\\?"/g) || []).length === 1, 'one All Books shelf is rendered');
  require(source.includes('LAUNCH_ONE_SHELF_CONTRACT') && source.includes('SECTIONS.flatMap'), 'one-shelf renderer contract is active');
  require(source.includes('bookIsAvailable(book)') && source.includes('ALL BOOKS'), 'one shelf contains only the four admitted books');
  require(source.includes("has('library-proof')") && !source.includes("const localReviewHost="), 'held review books require an explicit review flag');
  const heading = source.indexOf('id="shelf-guide-title"');
  const shelf = source.indexOf('class="libroom"', heading);
  const controls = source.indexOf('class="catalogue-controls"', heading);
  require(heading >= 0 && shelf > heading && controls > shelf, 'four covers appear immediately before optional search controls');
  require(!/--yellow\s*:|var\(--yellow\)|#ffd34d/i.test(source), 'rejected yellow is absent');
  require(/\.arrival-visual\{[^}]*height:clamp\(240px,24vw,330px\)/.test(source), 'masthead has the compact desktop height');
  require(/@media\(max-width:900px\)[\s\S]*?\.arrival-visual\{height:clamp\(190px,42vw,260px\)/.test(source), 'masthead has the compact mobile height');
  require(/\.shelf-unit\.is-compact \.bk\{[^}]*clamp\(105px,30vw,135px\)/.test(source), 'mobile launch covers stay identifiable');
  require(/function previewBook[\s\S]*?\.libroom'\)\?\.after\(preview\)[\s\S]*?book-preview-read/.test(source), 'cover click opens adjacent information before Open this book');
  require(!source.includes('JEEVES_ANSWERS') && !source.includes('renderJeevesAnswer'), 'browser-hardcoded Miss Jeeves answers are absent');
  require(source.includes("fetch('/api/miss-jeeves'") && !source.includes("fetch('/content/site/site-index.json'"), 'browser uses only the Miss Jeeves service authority');
  require(homepage.includes("&from=homepage"), 'Homepage identifies its Miss Jeeves handoff to the shared service');
  require((puffies.match(/60-teal-floppy-disk\.png/g) || []).length >= 2 && !/puffy-button-art[\s\S]{0,180}75-pink-teal-magic-wand\.png/.test(puffies), 'save actions use a floppy disk, not a wand');
  for (const label of ['Understand the principle','See it explained','See what is happening now','Try it or reinforce it','Learn it step by step','Already on our list','Trusted places beyond SUNNYVAiLE']) {
    require(source.includes(label), `Miss Jeeves result group exists: ${label}`);
  }
  require(workerSource.includes("/content/site/miss-jeeves-index.json") && !workerSource.includes("new URL('/content/site/site-index.json'"), 'backend loads the governed Miss Jeeves index');
  require(searchIndex?._meta?.schema === 'laidies-miss-jeeves-index.v1' && searchIndex?._meta?.admittedBookCount === 4, 'governed index binds all four admitted books');
  require(searchIndex.entries.some(entry => entry.id === 'book-section-ai-dictionary-term-token'), 'Dictionary terms are exact searchable sections');
  require(searchIndex.entries.some(entry => entry.parentId === 'ai-fundamentals-101' && entry.type === 'book-section'), 'AI Fundamentals sections are searchable');
  require(searchIndex.entries.some(entry => entry.parentId === 'working-with-ai-101' && entry.type === 'book-section'), 'Working with AI sections are searchable');
  require(searchIndex.entries.some(entry => entry.parentId === 'straight-answers' && entry.type === 'book-section'), 'Straight Answers sections are searchable');
  return errors;
}

assert.deepEqual(validate(library), []);
const fixtures = [
  [library.replace('>Browse the books</div>', '>Browse the shelves</div>'), 'Browse the books'],
  [library.replace('<section class="libroom"', '<div class="shelf-captions"></div><section class="libroom"'), 'category-choice boxes'],
  [library.replace('id="library-shelf-all"', 'id="library-shelf-0"'), 'one All Books shelf'],
  [library.replace('--mint:#7de2c2;', '--mint:#7de2c2;--yellow:#ffd34d;'), 'yellow'],
  [library.replace('height:clamp(240px,24vw,330px)', 'height:clamp(480px,55vw,760px)'), 'compact desktop'],
  [library.replace("fetch('/api/miss-jeeves'", "fetch('/content/site/site-index.json'"), 'Miss Jeeves service authority'],
  [library + '\nconst JEEVES_ANSWERS=[];', 'hardcoded Miss Jeeves'],
  [library.replaceAll('clamp(105px,30vw,135px)', '82px'), 'identifiable'],
  [library + '<div id="shelf-pages"><button>Next</button></div>', 'pagination']
];
for (const [fixture, expected] of fixtures) {
  assert(validate(fixture).some(error => error.includes(expected)), `${expected} calibration fixture must fail`);
}
console.log(`LIBRARY LAUNCH SURFACE PASS one_shelf=1 books=4 jeeves_records=${index.entries.length} calibrated_reject_fixtures=${fixtures.length}`);
