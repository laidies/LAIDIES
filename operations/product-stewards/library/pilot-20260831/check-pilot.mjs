// Narrow fixture checks only: not source-fidelity, prose quality or admission.
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const base=dirname(fileURLToPath(import.meta.url));
const references={
  ordinary:[24000,16200,2500,3600,46300,4630,50930,9070],
  harder:[24000,18000,2500,3600,48100,4810,52910,7090],
  revision:[22050,19800,2500,4400,48750,4875,53625,6375]
};
const fields=['venue','catering','delivery','printing','subtotal','reserve','total','remaining'];
function inspect(text,kind){
  const errors=[],found={};
  const block=text.match(/^## (?:Itemized )?Budget[^\n]*\n([\s\S]*?)(?=^## |$(?![\s\S]))/mi)?.[1]||'';
  for(const line of block.split('\n').filter(x=>x.startsWith('|'))){
    const cells=line.split('|').slice(1,-1).map(x=>x.replace(/[*`]/g,'').trim());
    const label=cells[0]?.toLowerCase();
    const key=/delivery/.test(label)?'delivery':/subtotal/.test(label)?'subtotal':/remaining/.test(label)?'remaining':/reserve/.test(label)?'reserve':/^total/.test(label)?'total':/catering/.test(label)?'catering':/print/.test(label)?'printing':/venue|north hall|west room/.test(label)?'venue':null;
    if(key)found[key]=Math.round(Number(cells.at(-1).replace(/[$,]/g,''))*100);
  }
  fields.forEach((key,i)=>{if(found[key]!==references[kind][i])errors.push(`${key}: expected ${references[kind][i]/100}, found ${found[key]/100}`)});
  const times=[...text.matchAll(/^\|\s*(\d+):(\d+)\s*[–-]\s*(\d+):(\d+)\s*\|([^\n]*)/gm)].map(m=>({start:Number(m[1])*60+Number(m[2]),end:Number(m[3])*60+Number(m[4]),rest:m[5]}));
  if(!times.length||times[0].start!==0||times.at(-1).end!==90||times.some((x,i)=>x.end<=x.start||(i&&x.start!==times[i-1].end)))errors.push('Agenda must be contiguous 0–90 minutes');
  if(!times.some(x=>/break/i.test(x.rest)&&x.end-x.start===10))errors.push('Missing 10-minute break');
  const invitation=text.split('\n').filter(x=>x.startsWith('>')).map(x=>x.replace(/^>\s?/,'').replace(/[*`]/g,'')).join(' ').trim();
  const words=invitation?invitation.split(/\s+/u).length:0;
  if(!words||words>120)errors.push(`Invitation words: ${words}`);
  return {errors,amountsCents:found,agendaMinutes:times.reduce((n,x)=>n+x.end-x.start,0),invitationWords:words};
}
const ids=[
  ['chatgpt-free-ordinary','ordinary'],['claude-sonnet5-ordinary-medium','ordinary'],
  ['chatgpt-free-harder','harder'],['claude-sonnet5-harder-medium','harder'],['claude-sonnet5-harder-high','harder'],
  ['chatgpt-free-revision','revision'],['chatgpt-free-repair','revision'],
  ['claude-sonnet5-revision-medium','revision'],['claude-sonnet5-repair-medium','revision']
];
const good=readFileSync(resolve(base,'runs/chatgpt-free-harder/proposal.md'),'utf8');
const bad=good.replaceAll('529.10','529.11');
if(inspect(good,'harder').errors.length||!inspect(bad,'harder').errors.some(e=>e.startsWith('total:')))throw Error('Calibration failed');
console.log('CALIBRATION: intentionally wrong total rejected; actual source files unchanged.');
let unexpected=false;
for(const [id,kind]of ids){
  const result=inspect(readFileSync(resolve(base,'runs',id,'proposal.md'),'utf8'),kind);
  const expectedFailure=id==='chatgpt-free-revision';
  const expectedFields=['catering','subtotal','reserve','total','remaining'];
  const observedExpectedFailure=expectedFailure&&result.errors.length===5&&expectedFields.every(key=>result.errors.some(e=>e.startsWith(key+':')));
  if(expectedFailure?!observedExpectedFailure:result.errors.length>0)unexpected=true;
  console.log(JSON.stringify({id,...result,verdict:result.errors.length?'FIXTURE_FAIL':'NUMERIC_AND_LENGTH_CHECKS_ONLY',expectedFailure}));
}
console.log('Boundary: source fidelity, agreement with evidence.md, usefulness and reader comprehension require separate inspection.');
if(unexpected)process.exitCode=1;
