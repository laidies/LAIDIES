import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const [base,manifestPath,out]=process.argv.slice(2);
if(!base||!manifestPath||!out)throw Error('Expected base artifact, manifest, new output');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const m=JSON.parse(fs.readFileSync(manifestPath));
if(m.identitySha256!=='823e53a85375a232e66e623ca50272a71799ece94c9d6895419b312902bbbab7')throw Error('Wrong production baseline');
for(const f of m.files)if(sha(fs.readFileSync(path.join(base,f.path)))!==f.sha256)throw Error('Changed base file: '+f.path);
const original=fs.readFileSync(path.join(base,'index.html'),'utf8');
if(original.includes('data-original-arrival')||!original.includes('data-home-arrival'))throw Error('Arrival already patched or baseline unrecognized');
if(fs.existsSync(out))throw Error('Output already exists');
const approved=fs.readFileSync('index.html','utf8');
const admission=JSON.parse(fs.readFileSync('operations/product-stewards/town-entry-homepage/candidates/ai-letter-layer-repair-20260906/admission.json'));
const names=['content/site/ai-letter-arrival/arrival.css','content/site/ai-letter-arrival/arrival.js','content/site/ai-letter-arrival/layers.js','content/site/ai-letter-arrival/background.png','content/site/ai-original-arrival/original.mp4','content/site/ai-original-arrival/poster.png','content/site/ai-original-arrival/background.png'];
for(const name of ['index.html',...names]){const b=admission.bindings.find(x=>x.path===name);if(!b||sha(fs.readFileSync(name))!==b.sha256)throw Error('Changed approved source: '+name);}
const intro=approved.match(/      <div class="original-arrival"[\s\S]*?(?=      <div class="hero-shade")/)[0];
const links=approved.match(/<link rel="stylesheet" href="\/content\/site\/ai-letter-arrival\/arrival.css">[\s\S]*?<\/script>/)[0]+'\n<script src="/content/site/ai-letter-arrival/arrival.js" defer></script>\n';
const old=original.match(/      <div class="hero-arrival"[\s\S]*?(?=      <div class="hero-shade")/)[0];
const button='      <button class="arrival-replay" type="button" data-arrival-replay hidden>Replay arrival</button>\n';
const anchor=original.match(/        <p class="namecheck">[^\n]*\n/)[0];
let html=original.replace(old,intro).replace('</head>',links+'</head>').replace(anchor,anchor+button);
if(html.replace(intro,old).replace(links,'').replace(button,'')!==original)throw Error('Unexpected homepage delta');
execFileSync('cp',['-cR',base,out]);
fs.writeFileSync(path.join(out,'index.html'),html);
for(const name of names){fs.mkdirSync(path.dirname(path.join(out,name)),{recursive:true});fs.copyFileSync(name,path.join(out,name));}
console.log(JSON.stringify({out,changed:['index.html'],added:names,preserved:m.files.length-1,homepageSha256:sha(Buffer.from(html))},null,2));
