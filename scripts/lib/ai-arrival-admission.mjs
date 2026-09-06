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

export const originalArrivalId='ai-original-repair-20260906-two-reviewer';
export function inspectOriginalArrival(item,root){
 const errors=[],sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 try{
  const raw=fs.readFileSync(path.join(root,"operations/product-stewards/town-entry-homepage/candidates/ai-original-repair-20260906/admission.json"));if(sha(raw)!=="55f6c567c67e55627999d01934a03164651101d4e44a99d44792c163543bc459")throw Error('changed original-repair manifest');const a=JSON.parse(raw);
  if(item.id!==originalArrivalId||item.design_admission.owner_exception!==originalArrivalId||item.design_admission.candidate.path!=='index.html'||item.design_admission.candidate.sha256!==a.bindings[0].sha256)throw Error('wrong exact original-repair candidate');
  for(const b of a.bindings)if(sha(fs.readFileSync(path.join(root,b.path)))!==b.sha256)errors.push('changed bound file: '+b.path);
  if(!fs.readFileSync(path.join(root,'operations/DECISIONS.md'),'utf8').includes('routine preview autonomy'))errors.push('missing owner ruling');
 }catch(e){errors.push(e.message);}return errors;
}

export const letterArrivalId='ai-letter-repair-20260906-two-reviewer';
export function inspectLetterArrival(item,root){
 const errors=[],sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 try{
  const raw=fs.readFileSync(path.join(root,'operations/product-stewards/town-entry-homepage/candidates/ai-letter-layer-repair-20260906/admission.json'));if(sha(raw)!=='46b84c8396f5361464468c9fd7de3a350c05521a71c6ab4d4f13828b3f6c4d89')throw Error('changed letter-repair manifest');const a=JSON.parse(raw);
  if(item.id!==letterArrivalId||item.design_admission.owner_exception!==letterArrivalId||item.design_admission.candidate.path!=='index.html'||item.design_admission.candidate.sha256!==a.bindings[0].sha256)throw Error('wrong exact letter-repair candidate');
  for(const b of a.bindings)if(sha(fs.readFileSync(path.join(root,b.path)))!==b.sha256)errors.push('changed bound file: '+b.path);
  if(!fs.readFileSync(path.join(root,'operations/DECISIONS.md'),'utf8').includes('routine preview autonomy'))errors.push('missing owner ruling');
 }catch(e){errors.push(e.message);}return errors;
}
