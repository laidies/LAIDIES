#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../../../../..");
const dir=path.dirname(fileURLToPath(import.meta.url));
const requestedOut=process.argv[2];
if(!requestedOut)throw Error("Usage: run-independent-profile-review.mjs <output-directory>");
const out=path.resolve(requestedOut);
if(!out.startsWith(path.join(dir,"independent-review")+path.sep))throw Error("Review output must remain inside candidate independent-review directory");
fs.mkdirSync(out,{recursive:true});
const read=file=>fs.readFileSync(file,"utf8");
const json=file=>JSON.parse(read(file));
const sha=value=>crypto.createHash("sha256").update(value).digest("hex");
const rel=file=>path.relative(root,file).split(path.sep).join("/");
const write=(name,value)=>{const file=path.join(out,name);if(fs.existsSync(file))throw Error("Preserve existing independent attempt: "+file);fs.writeFileSync(file,typeof value==="string"?value:JSON.stringify(value,null,2)+"\n",{flag:"wx"});return {path:rel(file),sha256:sha(fs.readFileSync(file))}};
const reviewTextPath=path.join(dir,"review-text.md");
const successor=json(path.join(dir,"profile-successor.json"));
const changeProof=json(path.join(dir,"change-proof.json"));
const evidence=json(path.join(dir,"source-evidence.json"));
const registryPath=path.join(root,"operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json");
const registry=json(registryPath);
const packet={
 candidateArtifact:{path:rel(reviewTextPath),sha256:sha(read(reviewTextPath)),completeText:read(reviewTextPath)},
 readerJob:"A compact LUMINAiRY profile for adult beginner women must earn why LAiDIES celebrates Hannah Fry through a distinctive contribution, one concrete example, a reader consequence and a useful entry point. It must remain clear, factual and readable inside a shared card.",
 exactDecision:"Ali rejected the incumbent title-only treatment. The successor must explain why Fry matters beyond her title. Preserve role, lesson, image and all seven links.",
 successor,
 lockedFieldProof:changeProof,
 incumbentNegativeControl:{about:changeProof.incumbentAbout,expectedVerdict:"REJECT",reasonToTest:"A title alone does not supply contribution, concrete example, reader consequence or useful entry point."},
 completePrimarySources:evidence.records.map(record=>({...record,completeText:read(path.join(root,record.snapshot.path))})),
 currentQualityRegistry:{path:rel(registryPath),sha256:sha(read(registryPath)),definition:registry,knownBadArtifacts:registry.negativeExemplars.map(item=>({id:item.id,failureFamilies:item.failureFamilies,completeText:read(path.join(root,item.path))}))},
 reviewInstructions:[
  "Begin with candidateArtifact.completeText. Do not rely on producer receipts or summaries.",
  "Judge the exact About prose in the context of the preserved card fields.",
  "Map every factual claim to exact source passages. Treat Penguin as publisher copy and retain that limit.",
  "Reject title-only biography, award-list substitution, unsupported claims, first-person founder voice, jargon, or a generic inspirational ending.",
  "Independently test whether the last questions transfer to a new consequential automated decision.",
  "In the unseen transfer, ask questions or describe possibilities only. Do not invent or assert an unseen system's objective, inputs, omissions, causal effect or consequence as established fact.",
  "Give the incumbent negative control its own verdict. It must not inherit the candidate verdict.",
  "PASS requires zero material issues. Do not repair prose in the verdict."
 ]
};
const schema={type:"object",additionalProperties:false,required:["attestations","reverseBrief","candidateVerdict","incumbentControl","outcomes","facts","transfer","issues","learningDisposition","summary"],properties:{
 attestations:{type:"object",additionalProperties:false,required:["artifactFirst","independentFromMaker","completeTextRead","completeSourcesRead"],properties:{artifactFirst:{type:"boolean"},independentFromMaker:{type:"boolean"},completeTextRead:{type:"boolean"},completeSourcesRead:{type:"boolean"}}},
 reverseBrief:{type:"object",additionalProperties:false,required:["humanQuestion","promisedPayoff","distinctiveContribution","concreteExample","readerConsequence","usefulEntryPoint"],properties:Object.fromEntries(["humanQuestion","promisedPayoff","distinctiveContribution","concreteExample","readerConsequence","usefulEntryPoint"].map(k=>[k,{type:"string"}]))},
 candidateVerdict:{enum:["PASS","HOLD","REJECT"]},
 incumbentControl:{type:"object",additionalProperties:false,required:["verdict","reason"],properties:{verdict:{enum:["PASS","HOLD","REJECT"]},reason:{type:"string"}}},
 outcomes:{type:"object",additionalProperties:false,required:["plainClarity","distinctiveContribution","concreteExample","readerConsequence","usefulEntryPoint","surfaceFit","voice","lockedFieldPreservation"],properties:Object.fromEntries(["plainClarity","distinctiveContribution","concreteExample","readerConsequence","usefulEntryPoint","surfaceFit","voice","lockedFieldPreservation"].map(k=>[k,{type:"object",additionalProperties:false,required:["state","reason","artifactExcerpt"],properties:{state:{enum:["pass","hold","fail"]},reason:{type:"string"},artifactExcerpt:{type:"string"}}}]))},
 facts:{type:"array",minItems:4,items:{type:"object",additionalProperties:false,required:["claimId","state","reason","artifactExcerpt","sourceId","sourceExcerpt"],properties:{claimId:{type:"string"},state:{enum:["supported","qualified","unsupported"]},reason:{type:"string"},artifactExcerpt:{type:"string"},sourceId:{type:"string"},sourceExcerpt:{type:"string"}}}},
 transfer:{type:"object",additionalProperties:false,required:["scenario","question","answer","assessment"],properties:Object.fromEntries(["scenario","question","answer","assessment"].map(k=>[k,{type:"string"}]))},
 issues:{type:"array",items:{type:"object",additionalProperties:false,required:["severity","finding","artifactExcerpt"],properties:{severity:{enum:["material","minor"]},finding:{type:"string"},artifactExcerpt:{type:"string"}}}},
 learningDisposition:{type:"object",additionalProperties:false,required:["disposition","rationale"],properties:{disposition:{enum:["NO_NEW_DEFECT","CANDIDATE_REPAIR_ONLY","EVIDENCE_GAP","REUSABLE_DEFECT"]},rationale:{type:"string"}}},
 summary:{type:"string"}
}};
const system="You are an independent LUMINAiRY profile-content reviewer. You are not the maker. Inspect the complete candidate artifact before any supporting material. Be exacting: publishing a flattering but empty, unsupported or cramped card is a failure. Return only the requested JSON.";
const request={messages:[{role:"system",content:system},{role:"user",content:JSON.stringify(packet)}],outputSchema:schema};
write("request.json",request);write("packet.json",packet);
const isolated=fs.mkdtempSync(path.join(os.tmpdir(),"luminairy-profile-review-"));
const run=spawnSync("claude",["--print","--safe-mode","--tools","","--permission-mode","dontAsk","--no-session-persistence","--model","claude-fable-5","--effort","medium","--output-format","json","--json-schema",JSON.stringify(schema),"--system-prompt",system],{cwd:isolated,input:request.messages[1].content,encoding:"utf8",maxBuffer:64*1024*1024,timeout:240000});
fs.writeFileSync(path.join(out,"provider.raw.json"),run.stdout||"",{flag:"wx"});
if(run.stderr)fs.writeFileSync(path.join(out,"provider.stderr.txt"),run.stderr,{flag:"wx"});
if(run.status!==0)throw Error("Independent provider failed status="+run.status);
const raw=JSON.parse(run.stdout);
if(raw.is_error!==false||raw.subtype!=="success"||!Object.keys(raw.modelUsage||{}).includes("claude-fable-5"))throw Error("Actual Claude Fable completion missing");
const judgment=raw.structured_output||JSON.parse(raw.result);
write("judgment.json",judgment);
const errors=[];
if(!Object.values(judgment.attestations||{}).every(Boolean))errors.push("review attestations incomplete");
if(judgment.incumbentControl?.verdict!=="REJECT")errors.push("incumbent title-only negative control was not rejected");
if(judgment.candidateVerdict!=="PASS")errors.push("candidate verdict "+judgment.candidateVerdict);
for(const [name,value] of Object.entries(judgment.outcomes||{}))if(value.state!=="pass")errors.push("outcome "+name+"="+value.state);
for(const fact of judgment.facts||[])if(!["supported","qualified"].includes(fact.state))errors.push("claim "+fact.claimId+"="+fact.state);
if((judgment.issues||[]).length)errors.push("review issues="+judgment.issues.length);
if(judgment.learningDisposition?.disposition!=="NO_NEW_DEFECT")errors.push("learning disposition "+judgment.learningDisposition?.disposition);
const checked={schemaVersion:"laidies-luminairy-profile-independent-review-check.v1",candidateId:"hannah-fry-profile-20260911",reviewedAt:new Date().toISOString(),reviewer:{principalId:"anthropic:claude-fable-5:luminairy-profile:medium",modelFamily:"anthropic",independentFromMaker:true,artifactFirst:true},candidateArtifact:packet.candidateArtifact,profileSha256:successor.profileSha256,requestSha256:sha(read(path.join(out,"request.json"))),packetSha256:sha(read(path.join(out,"packet.json"))),providerRawSha256:sha(read(path.join(out,"provider.raw.json"))),judgmentSha256:sha(read(path.join(out,"judgment.json"))),verdict:errors.length?"HOLD":"PASS",errors,judgment,limitations:["AI editorial assessment; no observed human comprehension is claimed.","Penguin is publisher copy. It supports the book example and scope, not independent evaluation.","This review does not sign, integrate or publish the profile."]};
write("independent-review.json",checked);
console.log(JSON.stringify({verdict:checked.verdict,errors,profileSha256:successor.profileSha256,review:rel(path.join(out,"independent-review.json")),reviewSha256:sha(read(path.join(out,"independent-review.json"))),providerRawSha256:checked.providerRawSha256}));
if(errors.length)process.exitCode=1;
