import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { prepareSuccessorSigning, runSuccessorTrial, signSuccessorManifest, verifySuccessorManifest } from "./successor-classifier-trial.mjs";

export async function main(args=process.argv, dependencies={}) {
  const value=name=>{const i=args.indexOf(name);return i<0?null:args[i+1];};
  const run=dependencies.runSuccessorTrial||runSuccessorTrial, prepare=dependencies.prepareSuccessorSigning||prepareSuccessorSigning, score=dependencies.scoreSuccessor||((out)=>import("./score-successor-classifier-trial.mjs").then(({scoreSuccessor})=>scoreSuccessor({outputDirectory:out}))), sign=dependencies.signSuccessorManifest||signSuccessorManifest, verify=dependencies.verifySuccessorManifest||verifySuccessorManifest, write=dependencies.writeFileSync||fs.writeFileSync, exists=dependencies.existsSync||fs.existsSync, remove=dependencies.unlinkSync||fs.unlinkSync, log=dependencies.log||console.log;
  let key=value("--key-file")?path.resolve(value("--key-file")):null, signingPrivate=null;
  try { const journal=value("--authority-journal")?path.resolve(value("--authority-journal")):null;
    if(args.includes("--prepare-signing")){if(!journal)throw new Error("Missing --authority-journal");const prepared=prepare({authorityJournal:journal});log(JSON.stringify(prepared,null,2));return prepared;}
    const required=["--key-file","--authority-journal","--out","--signing-private","--signing-public","--approved-public-key-fingerprint"];for(const x of required)if(!value(x))throw new Error(`Missing ${x}`);signingPrivate=path.resolve(value("--signing-private"));const signingPublic=path.resolve(value("--signing-public")), fingerprint=value("--approved-public-key-fingerprint"), out=path.resolve(value("--out"));const result=await run({keyFile:key,authorityJournal:journal,outputDirectory:out,signingPrivatePath:signingPrivate,signingPublicPath:signingPublic,approvedPublicKeyFingerprint:fingerprint});const report=await score(out);write(path.join(out,"successor-score.json"),JSON.stringify(report,null,2)+"\n",{mode:0o600});sign({outputDirectory:out,scoreReport:report,signingPrivatePath:signingPrivate,signingPublicPath:signingPublic,approvedPublicKeyFingerprint:fingerprint});if(!verify({outputDirectory:out,scoreReport:report,approvedPublicKeyFingerprint:fingerprint}))throw new Error("successor_signed_manifest_verification_failed");const summary={...result.summary,gates:report.gates};log(JSON.stringify(summary,null,2));return summary;
  } finally { if(key&&exists(key))remove(key); if(signingPrivate&&exists(signingPrivate))remove(signingPrivate); }
}
if(import.meta.url===pathToFileURL(process.argv[1]).href) await main();
