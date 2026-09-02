import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const choices = {
  E15: 'A placement that fits your question is still a placement someone paid for',
  E16: 'not a recommendation you earned by giving ChatGPT a beautifully detailed brief.',
  E17: 'This story shows why the same information can matter to more than one part of a product.'
};
const prompt = `You already independently passed the article's noInternalNotesOrInventedAdvice check but left its exact evidence blank. Choose the single evidence ID that best demonstrates a coherent, useful ending without invented compulsory advice. You may not answer none.\n${Object.entries(choices).map(([id,text])=>`${id}: ${text}`).join('\n')}\nReturn JSON only: {"evidenceId":"E15|E16|E17","reason":"specific reason"}.`;
const output = path.join(root, d + 'independent-workers-ai-v2-ending-evidence.json');
if (fs.existsSync(output)) throw new Error('Do not overwrite ending evidence');
const response = await fetch('http://localhost:8791', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ messages:[{role:'system',content:'Return one exact evidence choice as JSON.'},{role:'user',content:prompt}],response_format:{type:'json_object'},max_tokens:300,temperature:0,seed:20260837 }) });
if (!response.ok) throw new Error(`ending evidence HTTP ${response.status}: ${await response.text()}`);
const wrapper=await response.json(); const raw=wrapper.response??wrapper.choices?.[0]?.message?.content; const result=typeof raw==='string'?JSON.parse(raw):raw;
if(!choices[result.evidenceId]||!result.reason)throw new Error('invalid ending evidence choice');
fs.writeFileSync(output,JSON.stringify({model:'@cf/meta/llama-3.3-70b-instruct-fp8-fast',promptSha256:hash(prompt),wrapper,result,choices},null,2)+'\n');
console.log(JSON.stringify(result));
