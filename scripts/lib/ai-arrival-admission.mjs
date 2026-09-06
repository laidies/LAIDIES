import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export const aiArrivalId='ai-arrival-20260906-two-reviewer';
export function inspectAiArrival(item,root){
 const errors=[];
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 try {
  const raw=fs.readFileSync(path.join(root,"operations/product-stewards/town-entry-homepage/candidates/ai-reveal-20260906/admission.json"));
  if(sha(raw)!=="02a852539674b27e51172e314c40f03c3bbfe5b22f5ab8136d7c109bf5e19055")throw Error('changed admission manifest');
  const a=JSON.parse(raw);
  if(item.id!==aiArrivalId||item.design_admission.owner_exception!==aiArrivalId||item.design_admission.candidate.path!=='index.html'||item.design_admission.candidate.sha256!==a.bindings[0].sha256)throw Error('wrong exact candidate');
  for(const b of a.bindings)if(sha(fs.readFileSync(path.join(root,b.path)))!==b.sha256)errors.push('changed bound file: '+b.path);
  if(!fs.readFileSync(path.join(root,'operations/DECISIONS.md'),'utf8').includes('Ai arrival preview exception approved; routine preview autonomy'))errors.push('missing owner ruling');
 }catch(e){errors.push(e.message);}
 return errors;
}
