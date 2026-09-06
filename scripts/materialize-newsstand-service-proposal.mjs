#!/usr/bin/env node
// Appends only independently admitted, exact service proposal rows to the dated
// column authority. It never assesses prose, composes an issue, or publishes.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {prepareServiceBankProposal} from './prepare-newsstand-service-bank.mjs';
import {checkDailyEditionColumns} from './check-daily-edition-columns.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const DATE=/^\d{4}-\d{2}-\d{2}$/;
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const stable=value=>value===null||typeof value!=='object'?JSON.stringify(value):Array.isArray(value)?`[${value.map(stable).join(',')}]`:`{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const fail=message=>{throw new Error('SERVICE_PROPOSAL_MATERIALIZE_REJECT: '+message)};
const day=now=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Vancouver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));
const ready=entry=>entry?.proposalState==='READY_FOR_INDEPENDENT_ADMISSION'&&entry?.record?.status==='APPROVED'&&entry?.record?.publicEligibility==='ELIGIBLE';
const equal=(left,right)=>stable(left)===stable(right);
const canonicalHash=value=>hash(stable(value));

function proposalSelections(proposal){
  const values=proposal?.selection?.items;
  if(!values||typeof values!=='object'||Array.isArray(values)) fail('proposal selection bindings are required');
  return values;
}
function newColumnErrors(before,after){return after.filter(error=>!before.includes(error))}
function verifyProposal({proposal,bank,bankRaw,columns,columnsRaw,root,bankPath,recompute,checkColumns}){
  if(proposal?.schemaVersion!=='newsstand-service-bank-proposal-v1'||proposal?.mode!=='PRIVATE_PROPOSAL_ONLY'||!DATE.test(proposal.editionDate||'')) fail('invalid private service proposal');
  const identity=proposal.sourceIdentity;
  if(identity?.bankSha256!==hash(bankRaw)||identity?.columnsPath!=='content/daily-edition-columns.json'||!identity?.columnsCanonicalSha256) fail('proposal source bindings are missing or invalid');
  if(identity.bankPath&&path.resolve(root,identity.bankPath)!==path.resolve(root,bankPath)) fail('proposal bank path does not match the supplied governed bank');
  const entries=Array.isArray(proposal.records)?proposal.records:[];
  const ids=new Set();
  for(const entry of entries){
    if(!entry?.type||!entry?.bankItemId||!entry?.record?.id||ids.has(entry.record.id)) fail('proposal contains missing or duplicate record IDs');
    ids.add(entry.record.id);
  }
  const additions=entries.filter(ready).map(entry=>entry.record);
  const existingById=new Map((columns.records||[]).map(record=>[record.id,record]));
  const already=additions.filter(record=>existingById.has(record.id));
  if(already.some(record=>!equal(existingById.get(record.id),record))) fail('existing record conflicts with proposal');
  if(already.length&&already.length!==additions.length) fail('proposal is partially materialized');
  const replay=additions.length>0&&already.length===additions.length;
  const predecessor=replay?{...columns,records:(columns.records||[]).filter(record=>!ids.has(record.id))}:columns;
  if(replay){
    if(canonicalHash(predecessor)!==identity.columnsCanonicalSha256) fail('replayed columns do not reconstruct the exact bound predecessor');
  } else {
    if(identity.columnsSha256!==hash(columnsRaw)||canonicalHash(columns)!==identity.columnsCanonicalSha256) fail('proposal column binding changed; prepare a new proposal');
  }
  const before=checkColumns(predecessor,{root,asOf:proposal.editionDate}).errors;
  const recomputed=recompute({date:proposal.editionDate,bank,columns:predecessor,selections:proposalSelections(proposal),reuseAdmitted:Boolean(proposal.selection.reuseAdmitted),root});
  if(!equal(recomputed.records,entries)) fail('proposal rows do not match the bound bank selection');
  for(const record of additions){
    if(record.editionDate!==proposal.editionDate) fail('proposal record has a different effective date');
    const item=(bank.items||[]).find(candidate=>candidate.id===record.bankItemId);
    if(!item||item.status!=='APPROVED'||item.publicEligibility!=='ELIGIBLE') fail('proposal record is not currently independently admitted');
    if((predecessor.records||[]).some(existing=>existing.editionDate===record.editionDate&&existing.type===record.type)) fail('same-date service desk already has a different record');
  }
  const next={...predecessor,records:[...(predecessor.records||[]),...additions]};
  const after=checkColumns(next,{root,asOf:proposal.editionDate}).errors;
  const introduced=newColumnErrors(before,after);
  if(introduced.length) fail(`materialized Daily columns fail their canonical validator: ${introduced.join('; ')}`);
  if(replay&&!equal(columns,next)) fail('replayed columns contain unrelated changes');
  return {additions,changed:additions.length>0&&!replay,idempotent:replay,next};
}

export function materializeNewsstandServiceProposal({proposalRaw,bankRaw,columnsRaw,root=ROOT,bankPath='operations/product-stewards/newsstand/candidates/service-bank.json',now=new Date().toISOString(),recompute=prepareServiceBankProposal,checkColumns=checkDailyEditionColumns}){
  let proposal,bank,columns;
  try { proposal=JSON.parse(proposalRaw);bank=JSON.parse(bankRaw);columns=JSON.parse(columnsRaw); }
  catch { fail('proposal, bank, and columns must be valid JSON'); }
  if(proposal.editionDate>day(now)) fail('future-effective service proposal cannot be materialized');
  const result=verifyProposal({proposal,bank,bankRaw,columns,columnsRaw,root,bankPath,recompute,checkColumns});
  return {next:result.next,addedRecordIds:result.additions.map(record=>record.id),changed:result.changed,idempotent:result.idempotent};
}

function argument(name,args){const index=args.indexOf(name);return index<0?null:args[index+1]}
function bound(root,value,label){
  if(!value) fail(label+' is required');
  const absolute=path.resolve(root,value);
  if(!absolute.startsWith(root+path.sep)||!fs.existsSync(absolute)||!fs.realpathSync(absolute).startsWith(fs.realpathSync(root)+path.sep)) fail(label+' must exist inside the repository');
  return absolute;
}
function main(){
  const args=process.argv.slice(2),proposalPath=bound(ROOT,argument('--proposal',args),'--proposal'),bankPath=bound(ROOT,argument('--bank',args)||'operations/product-stewards/newsstand/candidates/service-bank.json','--bank'),columnsPath=bound(ROOT,argument('--columns',args),'--columns');
  const result=materializeNewsstandServiceProposal({proposalRaw:fs.readFileSync(proposalPath,'utf8'),bankRaw:fs.readFileSync(bankPath,'utf8'),columnsRaw:fs.readFileSync(columnsPath,'utf8'),bankPath:path.relative(ROOT,bankPath)});
  if(!args.includes('--check')&&result.changed){const temporary=columnsPath+'.tmp-'+process.pid;fs.writeFileSync(temporary,JSON.stringify(result.next,null,2)+'\n',{flag:'wx'});fs.renameSync(temporary,columnsPath);}
  console.log(`SERVICE PROPOSAL MATERIALIZE ${args.includes('--check')?'CHECK':result.changed?'PASS':'IDEMPOTENT'} added=${result.addedRecordIds.length} columns_write=${!args.includes('--check')&&result.changed}`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{main()}catch(error){console.error(String(error?.message||error));process.exitCode=1}}
