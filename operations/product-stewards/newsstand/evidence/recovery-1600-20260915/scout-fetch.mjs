import fs from 'node:fs';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const dir=new URL('.',import.meta.url).pathname;
const sources=[['aidb-agent-index','https://aidailybrief.ai/agent.json'],['aidb-sep15-edition','https://aidailybrief.ai/e/2026-09-15.json'],['aidb-sep15-transcript','https://aidailybrief.ai/e/2026-09-15/transcript.md'],['aidb-apple-index','https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614'],['scout-allie-resources','https://www.alliekmiller.com/resources'],['scout-mollick-feed','https://www.oneusefulthing.org/feed'],['scout-mollick-home','https://www.oneusefulthing.org/']];
const captures=await Promise.all(sources.map(async ([name,url])=>{const requestedAt=new Date().toISOString(); const r=spawnSync('curl',['-L','--max-time','35','-sS','-D',dir+name+'.headers','-o',dir+name+'.body','-w','%{http_code}\n%{url_effective}',url],{encoding:'utf8'}); fs.writeFileSync(dir+name+'.stderr',r.stderr||''); return {name,url,requestedAt,completedAt:new Date().toISOString(),exitCode:r.status,status:r.stdout.trim().split('\n'),bodySha256:fs.existsSync(dir+name+'.body')?crypto.createHash('sha256').update(fs.readFileSync(dir+name+'.body')).digest('hex'):null};}));
fs.writeFileSync(dir+'aidb-captures.json',JSON.stringify(captures,null,2)+'\n');
console.log(JSON.stringify(captures,null,2));
