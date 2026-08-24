#!/usr/bin/env node

import assert from 'node:assert/strict';
import { validateLibraryPagePresentation } from './lib/library-page-presentation.mjs';

const goodLibrary = `<style>
.book .txt .callout>b:first-child{color:#101842}
.callout-objective{--panel-bg:#e5f8ff}.callout-question{--panel-bg:#ffe1f1}.callout-practice{--panel-bg:#fff0e8}.callout-insight{--panel-bg:#e7fff3}.callout-note{--panel-bg:#e8f1ff}.callout-key{--panel-bg:#f0e8ff}.callout-big-picture{--panel-bg:#e7e5ff}.callout-landmark{--panel-bg:#e9eeff}
.book .band #reader-report{min-width:0;background:transparent}
</style><header class="sv-header"></header><div>Browse the Library</div><button>Briefing &amp; context</button><button data-reader-save="book"><img src="/assets/puffies/usable-25-images/60-teal-floppy-disk.png" alt=""><span>Save Book</span></button><script>const saves=[{scope:'chapter'},{scope:'section'}];</script>`;
const goodPuffy = `function makeBtn(el){var scopeLabel = kind === 'entry' ? 'Section' : kind.charAt(0).toUpperCase() + kind.slice(1);var actionLabel = 'Save ' + scopeLabel;return '<img src="/assets/puffies/usable-25-images/60-teal-floppy-disk.png" alt="">'} var cssDone=false;`;

assert.deepEqual(validateLibraryPagePresentation(goodLibrary, goodPuffy), []);

const fixtures = [
  [goodLibrary + '<style>.bad{color:var(--yellow)}</style>', goodPuffy, 'yellow'],
  [goodLibrary.replace('.callout-practice{--panel-bg:#fff0e8}', ''), goodPuffy, 'semantic teaching'],
  [goodLibrary.replaceAll('--panel-bg:#ffe1f1', '--panel-bg:#e5f8ff').replaceAll('--panel-bg:#fff0e8', '--panel-bg:#e5f8ff').replaceAll('--panel-bg:#e7fff3', '--panel-bg:#e5f8ff').replaceAll('--panel-bg:#e8f1ff', '--panel-bg:#e5f8ff').replaceAll('--panel-bg:#f0e8ff', '--panel-bg:#e5f8ff').replaceAll('--panel-bg:#e7e5ff', '--panel-bg:#e5f8ff').replaceAll('--panel-bg:#e9eeff', '--panel-bg:#e5f8ff'), goodPuffy, 'colour families'],
  [goodLibrary, goodPuffy.replace('60-teal-floppy-disk.png', '75-pink-teal-magic-wand.png'), 'floppy-disk'],
  [goodLibrary, goodPuffy.replace("kind === 'entry' ? 'Section'", "kind === 'entry' ? 'Place'"), 'scope language'],
  [goodLibrary.replace('<span>Save Book</span>', '<span>Save this space</span>'), goodPuffy, 'Save Book'],
  [goodLibrary.replace("{scope:'chapter'}", "{scope:'book'}"), goodPuffy, 'Save Chapter'],
  [goodLibrary.replace('min-width:0;background:transparent', 'min-width:180px;background:#fff'), goodPuffy, 'small secondary'],
  [goodLibrary.replace('<header class="sv-header"></header>', ''), goodPuffy, 'town header'],
  [goodLibrary.replace('Browse the Library', 'Browse the catalogue'), goodPuffy, 'shelves metaphor'],
  [goodLibrary.replace('Briefing &amp; context', 'Prompting'), goodPuffy, 'briefing and context']
];

for (const [librarySource, puffySource, expected] of fixtures) {
  assert(validateLibraryPagePresentation(librarySource, puffySource).some(error => error.includes(expected)), `${expected} fixture must fail`);
}

console.log('LIBRARY PAGE PRESENTATION TEST PASS');
console.log(`calibrated_reject_fixtures=${fixtures.length}`);
