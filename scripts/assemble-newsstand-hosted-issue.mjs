#!/usr/bin/env node
// Private, no-write assembly bridge for one same-day ordinary-news successor.
import crypto from 'node:crypto';
import fs from 'node:fs';
import { reviewHostedIssue } from './review-newsstand-hosted-issue.mjs';
const sha = (v) => crypto.createHash('sha256').update(v).digest('hex');
const object = (v) => v && typeof v === 'object' && !Array.isArray(v);
const HASH = /^[a-f0-9]{64}$/;
function held(status, extra = {}, privateResult) { const out={status,canonicalWrite:false,projectionWritten:false,publicationActionTaken:false,decision:null,...extra}; if(privateResult)Object.defineProperty(out,'privateResult',{value:privateResult,enumerable:false}); return out; }
function bound(raw, binding) { return typeof raw==='string' && object(binding) && HASH.test(binding.sha256 ?? '') && binding.sha256===sha(raw); }

// runtime is intentionally supplied by the approved portable runtime bundle.
// It must expose composeDailyEnvelope, promoteDailyIssue, projectDailySourceRaw,
// and loadOrdinaryStoryCandidate; this adapter never invents a source base.
export async function assembleHostedIssue({ predecessorEnvelopeRaw, predecessorBinding, liveStoriesRaw, liveStoriesBinding, columnsRaw, columnsBinding, radarRaw, radarBinding, store, candidateProof, issueMaker, root, runtimeRoot, runtime, executor, now, review = reviewHostedIssue } = {}) {
  if (!runtime || ['composeDailyEnvelope','promoteDailyIssue','projectDailySourceRaw','loadOrdinaryStoryCandidate'].some((key)=>typeof runtime[key] !== 'function')
    || !bound(predecessorEnvelopeRaw, predecessorBinding) || !bound(liveStoriesRaw, liveStoriesBinding)
    || !bound(columnsRaw, columnsBinding) || !bound(radarRaw, radarBinding) || !object(store) || !object(candidateProof)) return held('ISSUE_ASSEMBLY_INPUT_REJECTED');
  try {
    const prior=JSON.parse(predecessorEnvelopeRaw); const date=prior.editionDate;
    if (!date || store.issues?.filter((x)=>x?.editionDate===date).length!==1 || store.issues.find((x)=>x.editionDate===date).envelopeSha256!==predecessorBinding.sha256) return held('ISSUE_ASSEMBLY_INPUT_REJECTED');
    const composed=runtime.composeDailyEnvelope({date,radarRaw,radarPath:radarBinding.path,storiesRaw:liveStoriesRaw,columnsRaw,candidateBinding:candidateProof.binding,root,now});
    if (!composed?.canonical || !composed?.envelope || sha(composed.canonical)!==composed.envelopeSha256) return held('ISSUE_ASSEMBLY_HELD');
    const reviewResult=await review({predecessorEnvelopeRaw,proposedEnvelopeRaw:composed.canonical,candidateProof,store,issueMaker,root,runtimeRoot,runtime,executor,now});
    if (reviewResult.status!=='HOSTED_ISSUE_REVIEW_ACCEPTED') return held('ISSUE_ASSEMBLY_HELD',{reviewStatus:reviewResult.status},{review:reviewResult});
    const probe=runtime.promoteDailyIssue({store:structuredClone(store),envelope:composed.envelope,envelopeRaw:composed.canonical,decision:reviewResult.decision,maker:issueMaker,root,now});
    if (!probe?.changed) return held('ISSUE_ASSEMBLY_HELD',{reviewStatus:reviewResult.status},{review:reviewResult,probe});
    const projection=runtime.projectDailySourceRaw({raw:liveStoriesRaw,issue:probe.issue,columns:JSON.parse(columnsRaw),root,now});
    if (typeof projection!=='string' || projection===liveStoriesRaw) return held('ISSUE_ASSEMBLY_HELD',{reviewStatus:reviewResult.status},{review:reviewResult,probe});
    const out={status:'ISSUE_ASSEMBLY_READY_PRIVATE',canonicalWrite:false,projectionWritten:false,publicationActionTaken:false,decision:reviewResult.decision,proposedEnvelopeSha256:sha(composed.canonical),projectedStoriesSha256:sha(projection)};
    Object.defineProperty(out,'privateResult',{value:{review:reviewResult,probe,projection,proposedEnvelopeRaw:composed.canonical},enumerable:false}); return out;
  } catch (error) { return held('ISSUE_ASSEMBLY_HELD',{}, {errorCode:error?.code??'ASSEMBLY_OR_GATE_REJECTED'}); }
}
if (import.meta.url===new URL(process.argv[1], 'file:').href) { console.error('ISSUE_ASSEMBLY_PRIVATE_ONLY: invoke through an approved runtime bundle; no filesystem write is available.'); process.exitCode=2; }
