import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createFeedbackClient } from './src/feedback-client.mjs';
const child=spawn(process.execPath,['worker-operating-pilot/staging/server.mjs'],{env:process.env,stdio:['ignore','pipe','pipe']});
let logs='';child.stderr.on('data',chunk=>logs+=chunk);
try {
 const origin=await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(Error('Staging startup timeout: '+logs)),10000);
  child.once('exit',code=>{clearTimeout(timer);reject(Error('Staging exited '+code+': '+logs))});
  child.stdout.on('data',chunk=>{const match=String(chunk).match(/SYNTHETIC_STAGING_URL=(http:\/\/127\.0\.0\.1:\d+)/);if(match){clearTimeout(timer);resolve(match[1])}});
 });
 assert.match(await(await fetch(origin)).text(),/Local test only/);
 assert.equal((await fetch(origin+'/src/feedback-client.mjs')).status,200);
 assert.equal((await fetch(origin+'/api/staff/list')).status,403);
 const staff=await fetch(origin+'/staff');const cookie=staff.headers.get('set-cookie').split(';')[0];
 async function post(path,value={}) {return fetch(origin+path,{method:'POST',headers:{Origin:origin,Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify(value)})}
 async function list(){return(await fetch(origin+'/api/staff/list',{headers:{Cookie:cookie}})).json()}
 assert.equal((await fetch(origin+'/api/test/expire',{method:'POST',headers:{Origin:'https://attacker.invalid',Cookie:cookie}})).status,403);
 await post('/api/test/lose-next-reply');
 const map=new Map();
 const client=createFeedbackClient({endpoint:origin+'/api/feedback',storage:{getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)},getChallengeToken:async()=> 'synthetic-only',fetcher:(url,init)=>fetch(url,{...init,headers:{...init.headers,Origin:origin}})});
 const input={submission_type:'suggestion',subject:'Synthetic browser flow',body:'Synthetic complete card for staging.'};
 await assert.rejects(()=>client.submit(input),/uncertain/);
 assert.equal((await list()).length,1);
 assert.equal((await client.submit(input)).status,'accepted');
 const rows=await list();assert.equal(rows.length,1);
 assert.equal((await post('/api/staff/review',{id:rows[0].id,status:'triaged'})).status,200);
 assert.equal((await post('/api/staff/review',{id:rows[0].id,status:'addressed'})).status,200);
 assert.equal((await list())[0].status,'addressed');
 assert.equal((await post('/api/test/expire')).status,200);assert.deepEqual(await list(),[]);
 console.log('FEEDBACK STAGING PASS client_http_postgres_staff_expiry=true lost_reply_retry_rows=1 unauthorized_staff=denied public_services=untouched');
} finally {
 child.kill('SIGTERM');
 await new Promise(resolve=>{if(child.exitCode!==null)return resolve();const timer=setTimeout(()=>{child.kill('SIGKILL');resolve()},3000);child.once('exit',()=>{clearTimeout(timer);resolve()})});
}
