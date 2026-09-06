import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const source = await readFile(new URL('./private-assets/index.html', import.meta.url), 'utf8');
function checkPalette(html) {
  for (const token of ['--navy:#080b22','--ink:#11142d','--pink:#ef4d9c','--teal:#19d3d1','--purple:#744fc0','--periwinkle:#6c7cd1','--coral:#ff6b61']) assert.ok(html.includes(token), `Missing current colour: ${token}`);
  for (const retired of ['#38253e','#faf6ee','#edcfda','#4b2148','#c9a227','var(--plum)','var(--rose)']) assert.ok(!html.includes(retired), `Retired palette returned: ${retired}`);
}
checkPalette(source);
const previous = execFileSync('git',['show','2525abb794322fd51f213dc0619e96b739b6acfd:worker-operating-pilot/private-assets/index.html'],{encoding:'utf8'});
assert.throws(()=>checkPalette(previous), /Missing current colour/);
const luminance = hex => { const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722; };
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const pairs=[['11142d','f2fbff'],['744fc0','f2fbff'],['485575','f2fbff'],['11142d','19d3d1'],['11142d','ef4d9c'],['11142d','6c7cd1'],['eefcff','18244a'],['bec8e5','18244a'],['ef4d9c','272043'],['aabbd9','080b22']];
for(const [text,background] of pairs)assert.ok(contrast(text,background)>=4.5, `Low contrast: ${text}/${background}`);
assert.ok(contrast('777777','888888')<4.5);
console.log('PRIVATE PALETTE PASS current_tokens=7 rejected_previous_theme=1 text_pairs=10; token/contrast checks are not visual approval');
