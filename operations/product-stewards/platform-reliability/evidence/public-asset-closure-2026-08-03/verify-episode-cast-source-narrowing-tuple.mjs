import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const sha=value=>createHash('sha256').update(value).digest('hex');
const head=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
const candidates=[
  {route:'issues/issue-01.html',currentHash:'c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c',targets:[
    ['Cher Horowitz','../assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.jpg'],
    ['Dolly Parton','../assets/saints/y2k-stained-glass-v2/dolly-parton-y2k-stained-glass.jpg'],
    ['Regina George','../assets/saints/y2k-stained-glass-v2/regina-george-cautionary-red-y2k-stained-glass.jpg']
  ]},
  {route:'issues/issue-02.html',currentHash:'5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e',targets:[
    ['David Rose','../assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.jpg'],
    ['Miranda Priestly','../assets/saints/y2k-stained-glass-v2/miranda-priestly-y2k-stained-glass.jpg'],
    ['Elle Woods','../assets/saints/y2k-stained-glass-v2/elle-woods-y2k-stained-glass.jpg']
  ]},
  {route:'issues/issue-03.html',currentHash:'e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a',targets:[
    ['Elle Woods','../assets/saints/y2k-stained-glass-v2/elle-woods-y2k-stained-glass.jpg'],
    ['Cher Horowitz','../assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.jpg'],
    ['Regina George','../assets/saints/y2k-stained-glass-v2/regina-george-cautionary-red-y2k-stained-glass.jpg']
  ]},
  {route:'issues/issue-04.html',currentHash:'7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74',targets:[
    ['Ada Lovelace','../assets/mavens/y2k-stained-glass-v2/ada-lovelace-y2k-stained-glass.jpg']
  ]}
];

function count(haystack,needle){return haystack.split(needle).length-1}
function oldImageFragment(headSource,name,asset){
  const re=new RegExp(`<img src="${asset.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"[^>]*><b>${name}</b>`);
  const matches=headSource.match(re)||[];
  assert.equal(matches.length,1,`HEAD:${asset} must bind one exact cast image fragment`);
  return matches[0];
}
function proveBounded(predecessor,current,replacements){
  let oldRest=predecessor,newRest=current;
  for(const {oldFragment,currentFragment} of replacements){
    const oldAt=oldRest.indexOf(oldFragment),newAt=newRest.indexOf(currentFragment);
    assert.ok(oldAt>=0&&newAt>=0,'each bounded replacement must occur in its source');
    assert.equal(oldRest.slice(0,oldAt),newRest.slice(0,newAt),'bytes before each intended replacement differ');
    oldRest=oldRest.slice(oldAt+oldFragment.length);
    newRest=newRest.slice(newAt+currentFragment.length);
  }
  assert.equal(oldRest,newRest,'bytes after intended replacements differ');
}

const result={head,tuple:[],calibration:null};
for(const candidate of candidates){
  const current=fs.readFileSync(path.join(root,candidate.route),'utf8');
  assert.equal(sha(current),candidate.currentHash,`${candidate.route} is not the bound current candidate`);
  const headSource=execFileSync('git',['show',`${head}:${candidate.route}`],{cwd:root,encoding:'utf8'});
  const replacements=candidate.targets.map(([name,asset])=>{
    const currentFragment=`<span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>${name}</b>`;
    assert.equal(count(current,currentFragment),1,`${candidate.route}:${name} must have one exact held replacement`);
    assert.equal(count(current,asset),0,`${candidate.route}:${name} still requests the removed asset`);
    const oldFragment=oldImageFragment(headSource,name,asset);
    return {name,asset,oldFragment,currentFragment};
  });
  let predecessor=current;
  for(const {oldFragment,currentFragment} of replacements){predecessor=predecessor.replace(currentFragment,oldFragment)}
  assert.equal(replacements.reduce((text,{oldFragment,currentFragment})=>text.replace(oldFragment,currentFragment),predecessor),current,`${candidate.route} forward reconstruction must equal current`);
  proveBounded(predecessor,current,replacements);
  result.tuple.push({route:candidate.route,predecessorSha256:sha(predecessor),currentSha256:sha(current),replacements:replacements.map(({name,asset})=>({name,removedAsset:asset,replacement:'Portrait held'}))});
}

const first=result.tuple[0];
const firstCurrent=fs.readFileSync(path.join(root,first.route),'utf8');
const firstHead=execFileSync('git',['show',`${head}:${first.route}`],{cwd:root,encoding:'utf8'});
const firstReplacements=candidates[0].targets.map(([name,asset])=>({oldFragment:oldImageFragment(firstHead,name,asset),currentFragment:`<span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>${name}</b>`}));
let reconstructed=firstCurrent;for(const {oldFragment,currentFragment} of firstReplacements){reconstructed=reconstructed.replace(currentFragment,oldFragment)}
assert.throws(()=>proveBounded(reconstructed,firstCurrent.replace('<title>','<title data-calibration="unintended">'),firstReplacements),/bytes before each intended replacement differ/);
result.calibration='PASS — an unrelated title-attribute mutation is rejected';
console.log(JSON.stringify(result,null,2));
