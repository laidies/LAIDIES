import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const raw=fs.readFileSync('content/site/newsstand-catchup-v1.js','utf8');
const fn=raw.slice(raw.indexOf('  function latestPublishedDesk('),raw.indexOf('  function renderFrontDesks('));
const record={id:'published-concept',editionDate:'2026-08-30',type:'concept_week',headline:'Context',summary:'Available information',destination:null};
const desk={type:record.type,state:'ready',recordId:record.id,headline:record.headline,summary:record.summary,destination:null};
const old={status:'complete',editionDate:'2026-08-30',desks:[desk]};
const current={status:'complete',editionDate:'2026-09-06',desks:[{type:'concept_week',state:'empty'}]};
function select(issues,records=[record]) {
 const c={dailyIssues:issues===null?null:{issues},editorialToday:()=> '2026-09-06',columnById:id=>records.find(r=>r.id===id)};
 vm.createContext(c);vm.runInContext(fn+';result=latestPublishedDesk("concept_week")',c);return c.result;
}
assert.equal(select([old,current]).recordId,record.id,'new empty issue must not erase a published current column');
assert.equal(select([old,current]).publishedEditionDate,'2026-08-30','retain original date');
assert.equal(select([current]),null,'unpublished bank rows must not surface');
assert.equal(select(null),null,'unverified issue store must not surface a bank row');
assert.equal(select([old,current],[]),null,'expired or withdrawn record must stay hidden');
assert.equal(select([{...old,status:'pending'}]),null,'unadmitted issue must stay hidden');
assert.equal(select([{...old,editionDate:'2026-09-07'}]),null,'future issue must stay hidden');
assert.equal(select([old],[{...record,headline:'tampered'}]),null,'changed record must fail exact admitted copy');
const newer={...record,id:'new-concept',editionDate:'2026-09-05'};
const newIssue={...old,editionDate:'2026-09-05',desks:[{...desk,recordId:newer.id}]};
assert.equal(select([old,newIssue,current],[record,newer]).recordId,newer.id,'latest published replacement wins');
assert.equal(select([old,newIssue,current],[record]),null,'withdrawing the latest must not resurrect an older version');
console.log('PUBLISHED DESKS PASS: retained original date; current replacement; unissued, missing store, expired, pending, future, tampered, withdrawn-latest blocked.');
