#!/usr/bin/env node
// Mechanical, fail-closed overlay onto a freshly identified production artifact.
// Never deploys and never changes the supplied base.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [baseArg, outputArg] = process.argv.slice(2);
if (!baseArg || !outputArg) throw new Error('Usage: node scripts/prepare-getting-ready-release.mjs BASE NEW_OUTPUT');
const base = path.resolve(baseArg), output = path.resolve(outputArg);
if (!fs.statSync(base).isDirectory() || fs.existsSync(output) || output.startsWith(base + path.sep)) throw new Error('Output must be new and outside base');
const replacements = new Map();
function edit(file, before, after) {
  const source = replacements.get(file) ?? fs.readFileSync(path.join(base,file),'utf8');
  const matches = typeof before === 'string' ? source.split(before).length - 1 : [...source.matchAll(new RegExp(before.source,'g'))].length;
  if (matches !== 1) throw new Error(`Expected exactly one marker in ${file}; got ${matches}`);
  replacements.set(file, source.replace(before, after));
}
const sourceImage = path.join(root,'assets/resident-card/backgrounds/getting-ready-v2.png');
const digest = crypto.createHash('sha256').update(fs.readFileSync(sourceImage)).digest('hex');
if (digest !== '06085887508984a498c5de4146d00e07eadeb599314f1c9db2dcb65a57f19295') throw new Error('Approved artwork identity mismatch');
for (const file of ['maikeover.html','laidies-card.html','resident-card.html','library.html','shop.html','handbook.html']) {
  edit(file,/resident-card-contract-v1\.js\?v=[^"']+/, 'resident-card-contract-v1.js?v=20260906-getting-ready-1');
}
const style = '  <link rel="stylesheet" href="/content/resident-card-getting-ready.css?v=20260906-1">';
edit('maikeover.html', /[^\n]*<link[^\n]*maikeover-v2\.css[^\n]*/, match => match + '\n' + style);
edit('laidies-card.html', /[^\n]*<link[^\n]*closet-v2\.css[^\n]*/, match => match + '\n' + style);
for (const file of ['maikeover.html','laidies-card.html']) {
  edit(file, "holo:     'linear-gradient(120deg,#fbe0ee 0%,#e2ddf6 45%,#d5eef0 100%)'",
    "holo:     'linear-gradient(120deg,#fbe0ee 0%,#e2ddf6 45%,#d5eef0 100%)',\n      gettingready: 'url(\"/assets/resident-card/backgrounds/getting-ready-v2.png\") center / cover'");
}
edit('maikeover.html', "var BG_ORDER = ['classic','pinklilac','peach','mint','lavender','holo'];", "var BG_ORDER = ['classic','pinklilac','peach','mint','lavender','holo','gettingready'];");
edit('maikeover.html', "lavender:'Lavender',holo:'Holo'}", "lavender:'Lavender',holo:'Holo',gettingready:'Getting Ready'}");
edit('maikeover.html', 'c.title = key;', 'c.title = BG_LABEL[key];');
edit('maikeover.html', "c.setAttribute('aria-label', key + ' card background');", "c.setAttribute('aria-label', BG_LABEL[key] + ' card background');");
edit('laidies-card.html', "var bg = CARD_BG[(p && p.card_bg) || 'classic'] || CARD_BG.classic;", "var finish = (p && p.card_bg) || 'classic';\n    if (!Object.prototype.hasOwnProperty.call(CARD_BG, finish)) finish = 'classic';\n    var bg = CARD_BG[finish];");
edit('laidies-card.html', 'for (var i = 0; i < faces.length; i++) faces[i].style.background = bg;', 'for (var i = 0; i < faces.length; i++) {\n      faces[i].dataset.finish = finish;\n      faces[i].style.background = bg;\n    }');
edit('content/site/resident-card-contract-v1.js', '"classic", "pinklilac", "peach", "mint", "lavender", "holo"', '"classic", "pinklilac", "peach", "mint", "lavender", "holo", "gettingready"');
fs.cpSync(base, output, {recursive:true, errorOnExist:true});
for (const [file, contents] of replacements) fs.writeFileSync(path.join(output,file),contents);
for (const file of ['assets/resident-card/backgrounds/getting-ready-v2.png','content/resident-card-getting-ready.css']) {
  fs.mkdirSync(path.dirname(path.join(output,file)),{recursive:true});
  fs.copyFileSync(path.join(root,file),path.join(output,file));
}
console.log(JSON.stringify({output,changed:[...replacements.keys()],added:['assets/resident-card/backgrounds/getting-ready-v2.png','content/resident-card-getting-ready.css'],status:'PREPARED_NOT_DEPLOYED'},null,2));
