// Bounded research runner: subscription-authenticated Claude Code, no API key.
// Outputs are actual child-process results, not authored sample answers.
import {spawn} from 'node:child_process';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const base=dirname(fileURLToPath(import.meta.url));
const [caseName,effort]=process.argv.slice(2);
if(!['ordinary','harder','revision','repair'].includes(caseName)||!['medium','high'].includes(effort)) throw Error('Use ordinary|harder|revision|repair medium|high');
const id=`claude-sonnet5-${caseName}-${effort}`;
const output=resolve(base,'runs',id);
const cwd=resolve('/tmp/laidies-book-pilot.Hwkpyd',id);
// Refuse to replace an earlier observation with a later run.
await mkdir(output); await mkdir(cwd,{recursive:true});
let prompt=await readFile(resolve(base,'run-prompt.md'),'utf8');
prompt+='\n'+await readFile(resolve(base,`${['revision','repair'].includes(caseName)?'harder':caseName}-input.md`),'utf8');
if(['revision','repair'].includes(caseName)){
  prompt+='\nThe following are the actual prior outputs, supplied explicitly as context in a fresh session. Revise these rather than starting a new proposal.';
  for(const name of ['proposal.md','evidence.md']) prompt+=`\n## Previous ${name}\n`+await readFile(resolve(base,'runs',caseName==='repair'?'claude-sonnet5-revision-medium':'claude-sonnet5-harder-medium',name),'utf8');
  prompt+='\n'+await readFile(resolve(base,'revision-input.md'),'utf8');
}
if(caseName==='repair') prompt+='\n'+await readFile(resolve(base,'claude-repair-prompt.md'),'utf8');
prompt+='\nThis run can write files. Save exactly proposal.md and evidence.md in the current working directory. No other files. Return a brief completion summary.';
await writeFile(resolve(output,'submitted-prompt.txt'),prompt);
const args=['--safe-mode','--no-chrome','--model','claude-sonnet-5','--effort',effort,'--tools','Write','--allowedTools','Write','--permission-mode','dontAsk','--no-session-persistence','--output-format','json','-p'];
const env={...process.env,CLAUDE_CODE_DISABLE_FAST_MODE:'1'};
// Never route this test through an inherited separately billed API credential.
delete env.ANTHROPIC_API_KEY; delete env.ANTHROPIC_AUTH_TOKEN;
delete env.ANTHROPIC_BASE_URL;
const started=new Date();
const child=spawn('/Users/alisoneakin/.local/bin/claude',args,{cwd,env,stdio:['pipe','pipe','pipe']});
let stdout='',stderr='';
child.stdout.on('data',x=>stdout+=x); child.stderr.on('data',x=>stderr+=x);
child.stdin.end(prompt);
const timer=setTimeout(()=>child.kill('SIGTERM'),240000);
const exitCode=await new Promise((res,rej)=>{child.on('error',rej);child.on('close',res)});clearTimeout(timer);
await writeFile(resolve(output,'response.json'),stdout);
await writeFile(resolve(output,'stderr.txt'),stderr);
const saved=[];
for(const name of ['proposal.md','evidence.md']){try{await copyFile(resolve(cwd,name),resolve(output,name));saved.push(name)}catch(e){if(e.code!=='ENOENT')throw e}}
const record={id,caseName,effort,modelRequested:'claude-sonnet-5',surface:'Claude Code 2.1.225',authentication:'claude.ai subscription; Max observed',customizations:'safe-mode; no skills, memories, hooks or MCP',tools:['Write'],started:started.toISOString(),finished:new Date().toISOString(),elapsedMs:Date.now()-started.valueOf(),exitCode,saved,comparability:'Different surface/tool access from Free Chat; not a model-only comparison',billing:'API-equivalent cost if returned is not a subscription invoice'};
await writeFile(resolve(output,'run.json'),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify(record));
try{const j=JSON.parse(stdout);console.log(JSON.stringify({is_error:j.is_error,result:j.result,modelUsage:j.modelUsage,permission_denials:j.permission_denials}));}catch{console.log('Unparseable output saved; no success assumed')}
if(exitCode!==0)process.exitCode=1;
