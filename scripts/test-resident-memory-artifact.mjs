import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(process.argv[2]);
const names=new Set(['sv-global-header.js','resident-continuation-bootstrap-v1.js','resident-continuation-v1.js','luminairy-app.js','script.js']);
let checks=0;
function walk(dir) {
  for(const item of fs.readdirSync(dir,{withFileTypes:true})) {
    if(item.name.startsWith('.'))continue;
    const full=path.join(dir,item.name);
    if(item.isDirectory())walk(full);
    else if(item.name.endsWith('.html')) {
      const source=fs.readFileSync(full,'utf8');
      for(const match of source.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)/gi)) {
        const url=new URL(match[1],'https://laidies.ai/'+path.relative(root,full));
        if(url.origin==='https://laidies.ai'&&names.has(path.basename(url.pathname))) {
          assert.equal(url.searchParams.get('v'),'20260830-closet-memory-1',`${path.relative(root,full)} stale ${url.pathname}`);
          assert.ok(fs.existsSync(path.join(root,url.pathname)),`${url.pathname} missing`);
          checks++;
        }
      }
    }
  }
}
walk(root);
assert.ok(checks>=60,'full public artifact required');
assert.match(fs.readFileSync(path.join(root,'content/site/sv-global-header.js'),'utf8'),/resident-continuation-bootstrap-v1\.js\?v=20260830-closet-memory-1/);
assert.match(fs.readFileSync(path.join(root,'content/site/resident-continuation-bootstrap-v1.js'),'utf8'),/continuation \+ "\?v=20260830-closet-memory-1"/);
console.log(`RESIDENT MEMORY ARTIFACT PASS ${checks} loader edges plus shared bootstrap dependencies`);
