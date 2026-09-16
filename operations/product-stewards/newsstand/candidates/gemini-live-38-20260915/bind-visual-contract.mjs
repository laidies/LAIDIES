import fs from 'node:fs';import crypto from 'node:crypto';
import {prepareDraft,inspectPreparedDraft} from '../../../../../scripts/prepare-newsstand-draft.mjs';
const d='operations/product-stewards/newsstand/candidates/gemini-live-38-20260915/',read=n=>fs.readFileSync(d+n,'utf8'),json=n=>JSON.parse(read(n)),sha=x=>crypto.createHash('sha256').update(x).digest('hex'),write=(n,x)=>fs.writeFileSync(d+n,JSON.stringify(x,null,2)+'\n'),bind=n=>({path:d+n,sha256:sha(read(n))});
const c=json('producer-contract.json');c.draftArchitecture.presentationPlan='Use the destination-specific people-free smartphone, speech waves and unfinished route sketch illustration at /assets/newsstand/gemini-live-conversation-20260915.png. Root owns the checksum-bound companion visual admission before independent dispatch; deterministic HTML retains exact prose.';
if(process.argv[2]){const p=process.argv[2];c.visualAdmission={path:p,sha256:sha(fs.readFileSync(p))};}
write('producer-contract.json',c);
const w={...prepareDraft(c,{root:process.cwd(),reportingFrame:json('story-type-coverage.json'),sourcePacket:bind('source-evidence.json')}),producerContract:bind('producer-contract.json')};write('writer-input-current.json',w);
const editorial=json('editorial-input.json');editorial.communicationAuthority=w.packet.communication;write('editorial-input.json',editorial);
write('visual-contract-bind-integrity.json',{checkedAt:new Date().toISOString(),storySha256:sha(read('story.json')),reviewTextSha256:sha(read('review-text.json')),producerContract:bind('producer-contract.json'),draft:inspectPreparedDraft(json('story.json'),w,json('producer-observations.json')),visualAdmission:c.visualAdmission||null,independentDispatchAllowed:!!c.visualAdmission});
console.log(read('visual-contract-bind-integrity.json'));
