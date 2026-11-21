#!/usr/bin/env node
// Filters encrypted custody artifacts against GitHub's run identity and exact metadata.
const HASH=/^[a-f0-9]{40}$/;
const ID=/^[1-9][0-9]*$/;
const TIME=/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/;
export function eligibleCustodyArtifact({artifact,run,sidecar,workflowIds,allowExpiredBootstrap=false}) {
 const table={
  'newsstand-codex-auth-migration': {workflow:'production',branch:'ops/newsstand-hosted-20260926'},
  'newsstand-codex-auth-current': {workflow:'intake',branch:'main'},
 };
 const route=table[artifact?.name];
 if(!route || (!allowExpiredBootstrap && artifact.expired!==false) || !ID.test(String(artifact.id)) || !Number.isInteger(artifact.size_in_bytes) || artifact.size_in_bytes<1 || artifact.size_in_bytes>6*1024*1024) return false;
 const workflowId=String(workflowIds?.[route.workflow]||'');
 if(!ID.test(workflowId)||!ID.test(String(run?.id))||String(artifact.workflow_run?.id)!==String(run.id)||String(run.workflow_id)!==workflowId || run.status!=='completed' || run.conclusion!=='success' || run.head_branch!==route.branch || !HASH.test(run.head_sha||'') || !TIME.test(run.created_at||'')) return false;
 if(!sidecar || Object.keys(sidecar).sort().join(',')!=='runId,runStartedAt,sourceCommit,sourceRef,version,workflowId')return false;
 return sidecar.version===1 && sidecar.workflowId===workflowId && sidecar.runId===String(run.id) && sidecar.runStartedAt===run.created_at && sidecar.sourceCommit===run.head_sha && sidecar.sourceRef===`refs/heads/${route.branch}`;
}
