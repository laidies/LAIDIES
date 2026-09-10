#!/usr/bin/env node
// Operational delivery check only: never grants editorial or release approval.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const datePattern=/^\d{4}-\d{2}-\d{2}$/;
function date(value){if(!datePattern.test(value)||new Date(value+'T12:00:00Z').toISOString().slice(0,10)!==value)throw Error('Invalid date: '+value);return value;}
export function inspectCycle({issues,stories,from,now=new Date().toISOString()}) {
 date(from);const instant=new Date(now);if(!Number.isFinite(+instant))throw Error('Invalid now');
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Vancouver',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(instant).map(p=>[p.type,p.value]));
 const today=`${parts.year}-${parts.month}-${parts.day}`;
 const through=Number(parts.hour)>=7?today:new Date(Date.parse(today+'T12:00:00Z')-86400000).toISOString().slice(0,10);
 if(from>today)throw Error('Recovery start cannot be in the future');
 if(!Array.isArray(issues?.issues)||!stories?.publications?.weekly||!Array.isArray(stories.stories))throw Error('Public data shape unavailable');
 const byDate=new Map();for(const row of issues.issues){date(row.editionDate);if(byDate.has(row.editionDate))throw Error('Duplicate issue date');byDate.set(row.editionDate,row);}
 const missing=[];const delivered=[];
 for(let day=from;day<=through;day=new Date(Date.parse(day+'T12:00:00Z')+86400000).toISOString().slice(0,10)){
  const row=byDate.get(day);
  if(row?.status!=='complete')missing.push(day);
  else delivered.push({date:day,disposition:row.disposition,newsStories:row.storyIds?.length||0,services:row.serviceRecordIds?.length||0});
 }
 const end=new Date(through+'T12:00:00Z');const offset=(end.getUTCDay()+4)%7;const expectedWeekly=new Date(+end-offset*86400000).toISOString().slice(0,10);
 const weekly=stories.publications.weekly;if(weekly.editionDate){date(weekly.editionDate);if(weekly.editionDate>today)throw Error('Future public Weekly date');}const weeklyStory=stories.stories.find(s=>s.id===weekly.storyId&&s.status==='published');
 const weeklyOverdue=expectedWeekly>=from&&(!weeklyStory||!weekly.editionDate||weekly.editionDate<expectedWeekly);
 const latestNews=stories.stories.filter(s=>s.status==='published'&&s.edition==='daily'&&s.badge==='THE LATEST').map(s=>({id:s.id,publishedAt:s.publishedAt})).sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt)))[0]||null;
 return {observedAt:now,timeZone:'America/Vancouver',today,dueThrough:through,status:missing.length||weeklyOverdue?'DELIVERY_INCOMPLETE':'DATED_DELIVERY_PRESENT',missingDailyDates:missing,delivered,weekly:{expected:expectedWeekly,actual:weekly.editionDate,overdue:weeklyOverdue},latestNews,scope:'Public delivery presence only; service-only is not new news, and this does not certify research, editorial quality, source freshness or browser verification.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const args=process.argv.slice(2);const take=(key)=>{const n=args.indexOf(key);return n<0?null:args[n+1];};
  const now=take('--now')||new Date().toISOString();const from=take('--from');if(!from)throw Error('Usage: --from YYYY-MM-DD [--now ISO] [--fixture DIR]');
  const fixture=take('--fixture');
  const get=(name)=>fixture?fs.readFileSync(path.join(fixture,name),'utf8'):execFileSync('curl',['-fsSL','--max-time','30','https://laidies.ai/content/'+name+'?cycle-check='+Date.now()],{encoding:'utf8',maxBuffer:12*1024*1024});
  const issues=JSON.parse(get('newsstand-daily-issues.json'));const raw=get('newsstand-stories.js');const match=raw.match(/^window\.NEWSSTAND_DATA\s*=\s*([\s\S]*?);\s*window\.NEWSSTAND_STORIES/);if(!match)throw Error('Unrecognized story data wrapper');
  const result=inspectCycle({issues,stories:JSON.parse(match[1]),from,now});console.log(JSON.stringify(result,null,2));if(result.status==='DELIVERY_INCOMPLETE')process.exitCode=1;
 }catch(error){console.error(JSON.stringify({status:'UNVERIFIED',error:error.message}));process.exitCode=2;}
}
