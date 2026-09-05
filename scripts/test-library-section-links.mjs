#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../library.html',import.meta.url),'utf8');
const body=source.slice(source.indexOf('function findBookHeading('),source.indexOf('function scrollBookTo('));
const compile=text=>vm.runInNewContext(`(${text})`);
const verify=find=>{
 const target={id:'chapter-10-your-first-ai-agent-10-6-trusting-the-output-and-checking-it',textContent:'10.6 Trusting the Output (And Checking It)'};
 const headings=[target]; const book={querySelectorAll:()=>headings};
 assert.equal(find(book,'@10-6-trusting-the-output-and-checking-it'),target,'historical section route must reach its full heading');
 assert.equal(find(book,'@'+target.id),target,'current exact route must remain valid');
 for(const invalid of ['@checking-it','@6','@','@unknown','@10-6-not-present'])assert.equal(find(book,invalid),null,`unresolved fragment must not guess: ${invalid}`);
 const exact={id:'10-6-trusting-the-output-and-checking-it',textContent:'Exact'}; headings.push(exact);
 assert.equal(find(book,'@'+exact.id),exact,'exact heading takes precedence over a historical alias');
 headings.pop(); headings.push({...target,id:'chapter-99-other-10-6-trusting-the-output-and-checking-it'});
 assert.equal(find(book,'@10-6-trusting-the-output-and-checking-it'),null,'ambiguous aliases must not choose a heading');
};
verify(compile(body));
const old=body.replace(/    const headings=[\s\S]*?return legacy.length===1\?legacy\[0\]:null;/,"    return [...txt.querySelectorAll('h1,h2,h3,h4')].find(h=>h.id===sectionId)||null;");
assert.notEqual(old,body);assert.throws(()=>verify(compile(old)),/historical section route/);
const loose=body.replace("    if(!/^\\d+-\\d+(?:-[a-z0-9]+)+$/.test(sectionId))return null;\n",'');
assert.notEqual(loose,body);assert.throws(()=>verify(compile(loose)),/must not guess/);
console.log('LIBRARY SECTION LINKS PASS: legacy/current routes, exact precedence, ambiguity and missing fragments; both known-bad resolvers rejected.');
