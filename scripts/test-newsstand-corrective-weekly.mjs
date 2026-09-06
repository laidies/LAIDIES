#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {prepareNewsstandWeekly, correctiveWeekPeriodFor} from './prepare-newsstand-weekly.mjs';
import {validateWeeklyPublicationTiming} from './publish-newsstand-weekly.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const reader=require('../content/newsstand-reader-contract.js');
const liveRaw=fs.readFileSync(path.join(ROOT,'content/newsstand-stories.js'),'utf8');
const context={window:{}};vm.runInNewContext(liveRaw,context,{timeout:1000});
const data=JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
const preserved=data.stories.find(story=>story.id==='weekly-accountable-systems-2026-08-24');
assert.ok(preserved,'fixture requires the preserved August 26 Weekly story');
const current={...data.publications.weekly,storyId:preserved.id,editionDate:'2026-08-26',publishedAt:preserved.publishedAt,updatedAt:preserved.updatedAt,lastCheckedAt:preserved.lastCheckedAt,note:'The 2026-08-19–2026-08-26 Weekly.'};
delete current.correctivePublication;
data.publications.weekly=current;
const raw=`window.NEWSSTAND_DATA = ${JSON.stringify(data,null,2)};`;
const date='2026-09-06';
const period={startDate:'2026-08-31',endDate:date};
const corrective={mode:'MISSED_WEDNESDAY_CURRENT_WEEK',publicationDate:date,period};
const candidate={period,correctivePublication:corrective};

assert.deepEqual(correctiveWeekPeriodFor(date),period,'Sunday correction must cover only the closed current Vancouver week');
const prepared=prepareNewsstandWeekly({storiesRaw:raw,asOf:date,publicationDate:date,correctiveCurrentWeek:true});
assert.equal(prepared.mode,'PRIVATE_CORRECTIVE_PREPARATION_ONLY');
assert.deepEqual(prepared.period,period);
assert.deepEqual(prepared.correctivePublication,corrective);
assert.equal(prepared.candidateInputs.stories.length,8,'corrective packet includes every admitted Daily in the closed Vancouver week');
assert.deepEqual(prepared.candidateInputs.stories.map(item=>item.id).sort(),[
  'anthropic-agentic-incidents-2026-09-02','anthropic-fable-5-1-2026-09-02','chatgpt-ad-expansion-2026-08-31','gastric-cancer-prediction-2026-09-05','openai-gpt-6-astra-launch-2026-09-04','openai-wiki-message-board-2026-09-05','openclaw-shared-sessions-2026-09-02','us-doj-openai-copyright-2026-09-05'
].sort());
const normal=prepareNewsstandWeekly({storiesRaw:raw,asOf:date});
assert.equal(normal.publicationDate,'2026-09-09','ordinary preparation retains its Wednesday cadence');
assert.equal(normal.correctivePublication,null);
assert.equal(validateWeeklyPublicationTiming({candidate,date,now:'2026-09-06T20:00:00Z',current}).pointerNote,'The 2026-08-31–2026-09-06 corrective Weekly.');
assert.equal(validateWeeklyPublicationTiming({candidate:{period:{startDate:'2026-09-02',endDate:'2026-09-09'}},date:'2026-09-09',now:'2026-09-09T20:00:00Z',current}).pointerNote,'The 2026-09-02–2026-09-09 Weekly.');
assert.throws(()=>prepareNewsstandWeekly({storiesRaw:raw,asOf:date,publicationDate:'2026-09-05',correctiveCurrentWeek:true}),/current Vancouver day/,'a corrective cannot backdate');
assert.throws(()=>prepareNewsstandWeekly({storiesRaw:raw,asOf:date,correctiveCurrentWeek:true,publicationDate:'2026-09-13'}),/current Vancouver day/,'a corrective cannot use a future date');
assert.throws(()=>validateWeeklyPublicationTiming({candidate:{...candidate,correctivePublication:{...corrective,period:{startDate:'2026-08-30',endDate:date}}},date,now:'2026-09-06T20:00:00Z',current}),/metadata is invalid/,'partial or extended corrective coverage rejects');
assert.throws(()=>validateWeeklyPublicationTiming({candidate:{...candidate,correctivePublication:{...corrective,publicationDate:'2026-09-05'}},date,now:'2026-09-06T20:00:00Z',current}),/metadata is invalid/,'date mismatch rejects');
assert.throws(()=>validateWeeklyPublicationTiming({candidate:{...candidate,correctivePublication:{...corrective,owner:'private'}},date,now:'2026-09-06T20:00:00Z',current}),/metadata is invalid/,'unsupported metadata rejects');
assert.throws(()=>validateWeeklyPublicationTiming({candidate,date,now:'2026-09-07T20:00:00Z',current}),/today in Vancouver/,'a correction cannot publish after its actual day');
assert.throws(()=>validateWeeklyPublicationTiming({candidate,date,now:'2026-09-06T20:00:00Z',current:{...current,editionDate:'2026-09-02'}}),/missed Wednesday/,'a current Wednesday issue cannot be overwritten by Sunday correction');
const corrected=structuredClone(data);corrected.publications.weekly={...current,editionDate:date,correctivePublication:corrective};
assert.equal(reader.validate(corrected).length,0,'reader accepts exact corrective Weekly metadata');
corrected.publications.weekly.correctivePublication={...corrective,period:{startDate:'2026-08-30',endDate:date}};
assert.match(reader.validate(corrected).join('\n'),/valid missed-Wednesday correction/,'reader rejects altered corrective coverage');
corrected.publications.weekly.correctivePublication={...corrective,owner:'private'};
assert.match(reader.validate(corrected).join('\n'),/valid missed-Wednesday correction/,'reader rejects unrecognized corrective metadata');
corrected.publications.weekly={...current,editionDate:'2026-02-29',correctivePublication:{mode:'MISSED_WEDNESDAY_CURRENT_WEEK',publicationDate:'2026-02-29',period:{startDate:'2026-02-23',endDate:'2026-02-29'}}};
assert.match(reader.validate(corrected).join('\n'),/weekly editionDate is invalid|valid missed-Wednesday correction/,'reader rejects impossible calendar literals rather than JavaScript date rollover');
console.log('NEWSSTAND CORRECTIVE WEEKLY PASS closed_week=1 normal_wednesday=1 sunday_only=1 current_day=1 missed_successor=1 reader_metadata=1');
