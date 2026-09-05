// Local synthetic fixture only. No provider credentials, external connections,
// production frontend, deployment configuration or retained visitor data.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { createFeedbackHandler } from '../src/feedback-http.mjs';
const { PGlite } = await import(pathToFileURL(process.env.PGLITE_MODULE_PATH).href);
const db = new PGlite('memory://');
await db.exec(`create schema auth; create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
create role anon;create role authenticated;create role service_role;
create table public.town_hall_feedback(id uuid primary key default gen_random_uuid(),user_id uuid,
submission_type text not null check(submission_type in ('compliment','complaint','suggestion')),
subject text check(subject is null or char_length(subject)<=100),body text not null check(char_length(body) between 3 and 2000),
submitter_email text,submitter_display_name text,status text not null default 'filed' check(status in ('filed','triaged','addressed','ignored','deb-flected')),
admin_notes text,submitted_at timestamptz not null default now(),reviewed_at timestamptz);`);
await db.exec(await readFile(new URL('../../supabase/migrations/20260905030000_town_hall_feedback_intake.sql', import.meta.url), 'utf8'));
await db.exec('update public.town_hall_feedback_intake_config_v1 set enabled=true,retention_days=7');
const staffId=randomUUID(), staffCookie=randomUUID();
await db.query('insert into public.town_hall_feedback_staff_v1(user_id) values($1)',[staffId]);
let origin, loseNextReply=false;
let queue=Promise.resolve();
function serial(fn) { const task=queue.then(fn);queue=task.catch(()=>{});return task; }
async function asRole(role,fn) {
  return serial(async()=>{await db.exec(`set role ${role}`);try{return await fn()}finally{await db.exec('reset role')}});
}
const handler=createFeedbackHandler({enabled:true,origin:'http://127.0.0.1',actorSecret:'synthetic-fixture-secret-only-'.repeat(3),verifyChallenge:async({token})=>token==='synthetic-only',store:async p=>{
  const r=await asRole('service_role',()=>db.query('select public.intake_town_hall_feedback_v1($1,$2,$3,$4::jsonb) r',[p.p_key,p.p_digest,p.p_actor_hash,JSON.stringify(p.p_input)]));
  if(loseNextReply){loseNextReply=false;throw Error('synthetic reply loss after commit')}
  return r.rows[0].r;
}});
const server=createServer(async(req,res)=>{
 try {
  const path=new URL(req.url,origin).pathname;
  const send=(status,value,headers={})=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store',...headers});res.end(JSON.stringify(value));};
  if(req.method==='GET' && (path==='/'||path==='/staff')) {
   const html=await readFile(new URL(path==='/staff'?'staff.html':'submit.html',import.meta.url));
   res.writeHead(200,{'Content-Type':'text/html','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'",...(path==='/staff'?{'Set-Cookie':`staging_staff=${staffCookie}; HttpOnly; SameSite=Strict; Path=/`}:{})});res.end(html);return;
  }
  if(req.method==='GET'&&['/src/feedback-client.mjs','/src/feedback-contract.mjs'].includes(path)) {
   res.writeHead(200,{'Content-Type':'text/javascript','Cache-Control':'no-store'});res.end(await readFile(new URL('..'+path,import.meta.url)));return;
  }
  if(path.startsWith('/api/')&&req.method==='POST'&&req.headers.origin!==origin){send(403,{error:'origin'});return;}
  if(path==='/api/feedback'&&req.method==='POST') {
   // Map loopback origin to fixed fixture origin, never change production handler.
   const headers=new Headers(req.headers);headers.set('Origin','http://127.0.0.1');
   const result=await handler(new Request('http://127.0.0.1/api/feedback',{method:'POST',headers,body:req,duplex:'half'}),{remoteAddress:req.socket.remoteAddress});
   res.writeHead(result.status,Object.fromEntries(result.headers));res.end(await result.text());return;
  }
  if(path.startsWith('/api/staff/')||path.startsWith('/api/test/')) {
   if(req.headers.cookie?.split('; ').includes(`staging_staff=${staffCookie}`)!==true){send(403,{error:'staff_required'});return;}
   if(path==='/api/staff/list'&&req.method==='GET') {
    const r=await serial(async()=>{await db.query("select set_config('request.jwt.claim.sub',$1,false)",[staffId]);await db.exec('set role authenticated');try{return await db.query('select public.list_town_hall_feedback_v1(50) r')}finally{await db.exec('reset role')}});
    send(200,r.rows[0].r);return;
   }
   if(path==='/api/test/lose-next-reply'&&req.method==='POST'){loseNextReply=true;send(200,{synthetic_fault_armed:true});return;}
   if(path==='/api/test/expire'&&req.method==='POST') {
    await serial(async()=>{await db.exec("update public.town_hall_feedback_attempts_v1 set expires_at=now()-interval '1 second'");await db.query('select public.expire_town_hall_feedback_v1()')});send(200,{synthetic_payloads_expired:true});return;
   }
   if(path==='/api/staff/review'&&req.method==='POST') {
    let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>1024){send(413,{error:'size'});return}}
    const input=JSON.parse(raw);
    await serial(async()=>{await db.query("select set_config('request.jwt.claim.sub',$1,false)",[staffId]);await db.exec('set role authenticated');try{await db.query('select public.review_town_hall_feedback_v1($1,$2)',[input.id,input.status])}finally{await db.exec('reset role')}});
    send(200,{reviewed:true});return;
   }
  }
  send(404,{error:'not_found'});
 }catch {res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'staging_request_rejected'}))}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
origin=`http://127.0.0.1:${server.address().port}`;
console.log(`SYNTHETIC_STAGING_URL=${origin}`);
async function close(){server.closeAllConnections();server.close();await db.close();process.exit(0)}
process.on('SIGTERM',close);process.on('SIGINT',close);
