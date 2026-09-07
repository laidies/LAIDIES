import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const source = process.cwd();
const base = '/private/tmp/laidies-newsstand-nvidia-admitted-20260906';
const manifest = JSON.parse(fs.readFileSync(base+'.manifest.json'));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
for (const f of manifest.files) assert.equal(sha(fs.readFileSync(path.join(base,f.path))), f.sha256, f.path);
const files = ['chick-flicks.html','content/chick-flicks.css','content/chick-flicks.js','content/site/laidies-visual-system.css',
 'assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-rental-store-interior-approved-v1.png',
 'assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-four-bay-shelf-v1.png',
 ...['trailer','ep-01','ep-02','ep-03','ep-04','coming-soon-vhs-v1'].map(n=>'assets/sunnyvaile-interiors/episode-vhs-boxes-v2/'+n+'.png')];
const out=fs.mkdtempSync('/private/tmp/laidies-chick-flicks-release-20260906-');
fs.cpSync(base,out,{recursive:true});
for(const f of files){fs.mkdirSync(path.dirname(path.join(out,f)),{recursive:true});fs.copyFileSync(path.join(source,f),path.join(out,f));}
// Confirm every absolute HTML/CSS dependency is present, without replacing shared production assets.
for(const f of ['chick-flicks.html','content/chick-flicks.css','content/site/laidies-visual-system.css']){
 const text=fs.readFileSync(path.join(out,f),'utf8');
 for(const m of text.matchAll(/(?:src=["']|href=["']|url\(["']?)(\/[^"')\s?#]+)(?:[^"')\s]*)/g)){
  const p=m[1]; if(!path.extname(p))continue;
  assert.ok(fs.existsSync(path.join(out,p)),`missing ${p}`);
 }
}
for(const f of manifest.files)if(!files.includes(f.path))assert.equal(sha(fs.readFileSync(path.join(out,f.path))),f.sha256,`unrelated change ${f.path}`);
console.log(JSON.stringify({out,base,baseIdentity:manifest.identitySha256,overlay:files},null,2));
