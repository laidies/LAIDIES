#!/usr/bin/env node
// Exact-base overlay only. Not a deployment command.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const base='/tmp/laidies-resident-portraits-successor.sUUusY';
const identity='cdf13233f16fdc3512fc6273dd861ba8a6c4655d898154733fb509fb1470edb6';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const manifest=JSON.parse(fs.readFileSync(base+'.manifest.json','utf8'));
const computed=crypto.createHash('sha256').update(manifest.files.map(f=>`${f.sha256}  ${f.path}\n`).join('')).digest('hex');
if(manifest.identitySha256!==identity||computed!==identity)throw Error('Exact base identity mismatch');
for(const f of manifest.files)if(hash(path.join(base,f.path))!==f.sha256)throw Error('Base changed '+f.path);
function data(p){const c={window:{}};vm.runInNewContext(fs.readFileSync(p,'utf8'),c);return JSON.parse(JSON.stringify(c.window.NEWSSTAND_DATA));}
const before=data(path.join(base,'content/newsstand-stories.js')),after=data(path.join(root,'content/newsstand-stories.js'));
if(JSON.stringify(before.stories)!==JSON.stringify(after.stories))throw Error('Existing article text changed');
for(const key of Object.keys(before.publications).filter(k=>k!=='daily'))if(JSON.stringify(before.publications[key])!==JSON.stringify(after.publications[key]))throw Error('Other publication changed '+key);
const owned=['newsstand.html','content/newsstand.css','content/site/newsstand-catchup-v1.js','content/newsstand-stories.js','content/daily-edition-columns.json','content/newsstand-daily-issues.json','content/newsstand-public-feed.json','content/newsstand-archive-index.json'];
const output=fs.mkdtempSync('/tmp/laidies-newsstand-bank-successor.');
fs.cpSync(base,output,{recursive:true,errorOnExist:false,force:false});
for(const p of owned){if(!manifest.files.some(f=>f.path===p))throw Error('Unexpected public addition '+p);fs.copyFileSync(path.join(root,p),path.join(output,p));}
execFileSync(process.execPath,[path.join(root,'scripts/create-release-manifest.mjs'),output,output+'.manifest.json'],{stdio:'inherit'});
execFileSync(process.execPath,[path.join(root,'scripts/check-newsstand-release-scope.mjs'),base+'.manifest.json',output+'.manifest.json',path.join(root,'operations/release-control/newsstand-production-scope.json'),path.join(root,'operations/product-stewards/newsstand/evidence/service-revision-2026-08-30/release-scope.json')],{stdio:'inherit'});
const next=JSON.parse(fs.readFileSync(output+'.manifest.json'));
for(const f of next.files)if(!owned.includes(f.path)&&hash(path.join(base,f.path))!==f.sha256)throw Error('Unrelated bytes changed '+f.path);
console.log(JSON.stringify({input:output,manifest:output+'.manifest.json',identity:next.identitySha256,files:next.files.length,unchangedStories:before.stories.length,protectedNonNewsStandBytes:true,deployed:false},null,2));
