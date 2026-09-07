#!/usr/bin/env node
// Exact three-option overlay. Fails before writing if the current base differs.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [baseArg,outArg]=process.argv.slice(2);
if(!baseArg||!outArg) throw Error('Usage: prepare-pop-card-release.mjs BASE NEW_OUTPUT|--source');
const base=path.resolve(baseArg), sourceMode=outArg==='--source';
const out=sourceMode?base:path.resolve(outArg);
if(sourceMode&&base!==root) throw Error('Source mode is limited to this owned checkout');
if(!sourceMode&&(fs.existsSync(out)||out.startsWith(base+path.sep))) throw Error('Output must be new and outside base');
const assets={
 'assets/resident-card/backgrounds/skates-v2.png':'dc6990e75c34514c3a8b6c2b134607599dd8ac1244c54ffee40d91ab221b7a12',
 'assets/resident-card/backgrounds/boombox-v3.png':'6e4702af260a7ab08f43e10190d51cb405549d42f16c4e34265489c94372070a',
 'assets/resident-card/backgrounds/computer.png':'8772513a58087da6d0cb49621562c804eef861b24dbd08076c4df5ac2445a0d0'
};
for(const [f,sha] of Object.entries(assets)) if(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')!==sha) throw Error('Unapproved art '+f);
const edits=new Map();
function edit(file,before,after){
 const s=edits.get(file)??fs.readFileSync(path.join(base,file),'utf8');
 const n=typeof before==='string'?s.split(before).length-1:[...s.matchAll(new RegExp(before.source,'g'))].length;
 if(n!==1) throw Error('Expected one marker: '+file+' got '+n);
 edits.set(file,s.replace(before,after));
}
for(const f of ['maikeover.html','laidies-card.html','resident-card.html','library.html','shop.html','handbook.html'])
 edit(f,/resident-card-contract-v1\.js\?v=[^"']+/,'resident-card-contract-v1.js?v=20260906-pop-card-1');
for(const f of ['maikeover.html','laidies-card.html']) {
 edit(f,/[^\n]*<link[^\n]*resident-card-getting-ready\.css[^\n]*/,m=>m+'\n  <link rel="stylesheet" href="/content/resident-card-pop-backgrounds.css?v=20260906-1">');
 edit(f, `gettingready: 'url("/assets/resident-card/backgrounds/getting-ready-v2.png") center / cover'`,
 `gettingready: 'url("/assets/resident-card/backgrounds/getting-ready-v2.png") center / cover',
      skates: 'url("/assets/resident-card/backgrounds/skates-v2.png") center / cover',
      boombox: 'url("/assets/resident-card/backgrounds/boombox-v3.png") center / cover',
      computer: 'url("/assets/resident-card/backgrounds/computer.png") center / cover'`);
}
edit('maikeover.html',"var BG_ORDER = ['classic','pinklilac','peach','mint','lavender','holo','gettingready'];","var BG_ORDER = ['classic','pinklilac','peach','mint','lavender','holo','gettingready','skates','boombox','computer'];");
edit('maikeover.html',"gettingready:'Getting Ready'}","gettingready:'Getting Ready',skates:'Skates',boombox:'Boombox',computer:'Computer'}");
edit('content/site/resident-card-contract-v1.js','"holo", "gettingready"','"holo", "gettingready", "skates", "boombox", "computer"');
if(!sourceMode) fs.cpSync(base,out,{recursive:true,errorOnExist:true});
for(const [f,s] of edits) fs.writeFileSync(path.join(out,f),s);
if(!sourceMode) for(const f of [...Object.keys(assets),'content/resident-card-pop-backgrounds.css']) {
 fs.mkdirSync(path.dirname(path.join(out,f)),{recursive:true}); fs.copyFileSync(path.join(root,f),path.join(out,f));
}
console.log(JSON.stringify({out,changed:[...edits.keys()],added:[...Object.keys(assets),'content/resident-card-pop-backgrounds.css'],status:'PREPARED_NOT_DEPLOYED'},null,2));
