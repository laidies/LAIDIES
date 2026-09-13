import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import path from 'node:path';
const root=path.resolve(process.cwd(),'operations/product-stewards/newsstand/candidates/hannah-fry-profile-20260911/integration-20260913');
const gate=fs.readFileSync(path.join(root,'content/site/luminairy-claim-gate.js'),'utf8');
const profiles=JSON.parse(fs.readFileSync(path.join(root,'content/luminairy-profiles.json'),'utf8'));
const claims=JSON.parse(fs.readFileSync(path.join(root,'content/luminairy-claims.json'),'utf8'));
const receipts=JSON.parse(fs.readFileSync(path.join(root,'content/luminairy-editorial-receipts.json'),'utf8'));
const clone=x=>JSON.parse(JSON.stringify(x));
async function run(name,{profileMutation,receiptMutation}={}) {
  const localProfiles=clone(profiles),localClaims=clone(claims),localReceipts=clone(receipts);
  profileMutation?.(localProfiles); receiptMutation?.(localReceipts);
  const document={documentElement:{dataset:{}}};
  const window={crypto:crypto.webcrypto};
  const fetch=async url=>{ const value=url.endsWith('luminairy-claims.json')?localClaims:url.endsWith('luminairy-editorial-receipts.json')?localReceipts:null; if(!value)return {ok:false,json:async()=>null}; return {ok:true,json:async()=>clone(value)}; };
  const context=vm.createContext({window,document,fetch,TextEncoder,BigInt,Uint8Array,encodeURIComponent,unescape,Promise,JSON,String,Array,Math,Object,Set,Date});
  vm.runInContext(gate,context,{timeout:2000});
  try {const data=await context.window.LAIDIES_LUMINAIRY_CLAIM_GATE.admit(localProfiles);return {name,result:'PASS',returnedProfiles:Object.values(data).filter(Array.isArray).reduce((n,a)=>n+a.length,0),dataset:document.documentElement.dataset.luminairyClaims||null};}
  catch(error){return {name,result:'HOLD',error:String(error.message||error),dataset:document.documentElement.dataset.luminairyClaims||null};}
}
const result=[];
result.push(await run('valid-all-43'));
result.push(await run('tampered-hannah-profile',{profileMutation:x=>x.mavens.find(p=>p.id==='hannah-fry').about+=' altered'}));
result.push(await run('tampered-hannah-signature',{receiptMutation:x=>{const r=x.receipts.find(v=>v.claimId==='mavens-hannah-fry');r.signature=(r.signature[0]==='A'?'B':'A')+r.signature.slice(1);}}));
if(result[0].result!=='PASS'||result[0].returnedProfiles!==43||result[0].dataset!=='admitted'||result.slice(1).some(x=>x.result!=='HOLD'||x.dataset!==null)) {console.error(JSON.stringify(result,null,2));process.exit(1)}
console.log(JSON.stringify(result,null,2));
