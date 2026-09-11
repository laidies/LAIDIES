import fs from 'node:fs';import assert from 'node:assert/strict';
const dir=new URL('./',import.meta.url);
const before=fs.readFileSync(new URL('live.html',dir),'utf8');
const candidate=fs.readFileSync(new URL('index.html',dir),'utf8');
const oldBox='.feature-directory-head>p{color:var(--hp-coral);background:var(--hp-ink);padding:18px 22px;border-radius:18px}';
const newBox='.feature-directory{background:linear-gradient(120deg,#2051cf,#234bd0)}\n.feature-directory::before{mix-blend-mode:multiply}\n.feature-directory-head>p{color:var(--hp-lime)}';
const oldBody='body{background:var(--hp-ink)}';
const newBody='body{background:#c195e9 url("/assets/homepage/rewind-wallpaper-20260906.webp") repeat 0 0 / 680px 680px;background-attachment:scroll}\n@media(max-width:700px){body{background-size:480px 480px}}';
function check(s){assert(s.includes(newBody),'approved wallpaper missing');assert(s.includes(newBox),'box-free bright directory treatment missing');assert(!s.includes(oldBox),'rejected box restored')}
assert.throws(()=>check(before),/approved wallpaper missing/);
assert.throws(()=>check(candidate.replace(newBox,oldBox)),/box-free bright directory treatment missing/);
check(candidate);
assert.equal(candidate.replace(newBody,oldBody).replace(newBox,oldBox),before,'unrelated source bytes changed');
console.log('Exact scoped replacement accepted; missing wallpaper and rejected-box fixtures fail.');
