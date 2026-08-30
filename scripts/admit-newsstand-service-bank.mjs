#!/usr/bin/env node
// Applies exact already-issued PASS decisions to a new private bank snapshot.
// No model judgment is generated here; no canonical issue or public file writes.
import fs from 'node:fs';
import path from 'node:path';
import {prepareServiceBankProposal,reviewedContentSha256} from './prepare-newsstand-service-bank.mjs';
const root=path.resolve(import.meta.dirname,'..');
const dir='operations/product-stewards/newsstand/evidence/service-bank-20260830';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const args=process.argv.slice(2),val=n=>args[args.indexOf(n)+1];
if(!args.includes('--output'))throw Error('New private --output required');
const out=path.resolve(root,val('--output'));
if(!out.startsWith(path.join(root,dir)+path.sep)||fs.existsSync(out))throw Error('Output must be a new private bank snapshot');
const bank=read('operations/product-stewards/newsstand/candidates/service-bank.json');
const deck=read('content/data/mme-claio-deck.json');
const format=`${dir}/format-owner-check.md`;
const verdicts=[];
for(const item of bank.items){
 if(item.status!=='CANDIDATE')continue;
 const producer=`${dir}/producer-receipts/${item.id}.json`;
 const independent=['completed-teaching-receipts','completed-site-receipts'].map(d=>`${dir}/${d}/${item.id}.json`).find(p=>fs.existsSync(path.join(root,p)));
 if(!independent||!fs.existsSync(path.join(root,producer))){verdicts.push({id:item.id,state:'HELD',reason:'Complete review chain unavailable'});continue;}
 const receipt=read(independent);
 if(receipt.verdict!=='PASS'){verdicts.push({id:item.id,state:'HELD',reason:receipt.verdict});continue;}
 if(item.type==='crossword')throw Error('Native assistive-technology admission not granted');
 if(item.type==='mme_claio'){
  const card=deck.cards.find(c=>c.card===item.headline);
  if(!card||card.read!==item.summary||JSON.stringify([card.message,card.move])!==JSON.stringify(item.body))throw Error('Mme card copy differs from authored deck '+item.id);
 }
 item.status='APPROVED';item.publicEligibility='ELIGIBLE';
 item.reviewedContentSha256=reviewedContentSha256(item);
 item.reviewEvidence={accuracy:independent,editorial:independent,voice:independent,producer,format,owner:format,safety:item.type==='mme_claio'?format:null};
 verdicts.push({id:item.id,state:'APPROVED',independent});
}
// This validates real PASS/PASS chains, exact content and raw judgment bindings.
prepareServiceBankProposal({date:'2026-08-30',bank,columns:read('content/daily-edition-columns.json'),root});
fs.writeFileSync(out,JSON.stringify(bank,null,2)+'\n');
console.log(JSON.stringify({output:out,approved:verdicts.filter(v=>v.state==='APPROVED').length,held:verdicts.filter(v=>v.state==='HELD'),publicWrite:false},null,2));
