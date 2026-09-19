import fs from 'node:fs';
import crypto from 'node:crypto';

const d='operations/product-stewards/newsstand/candidates/ai-research-automation-20260919/';
const primaryPath=d+'source-capture-primary.json';
const continuationPath=d+'source-capture-continuation.json';
const primary=JSON.parse(fs.readFileSync(primaryPath,'utf8'));
const continuation=JSON.parse(fs.readFileSync(continuationPath,'utf8'));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const write=(n,v)=>fs.writeFileSync(d+n,JSON.stringify(v,null,2)+'\n');
const line=(capture,prefix)=>{
  const match=capture.split('\n').find(value=>value.startsWith(prefix));
  if(!match)throw Error(`Missing exact source line: ${prefix}`);
  return match.slice(match.indexOf(':')+2);
};
const exact=(capture,passage)=>{
  if(!capture.includes(passage))throw Error(`Missing exact source passage: ${passage}`);
  return passage;
};
const passages={
  Anthropic:[
    exact(primary,'It runs from AL0 (no AI involvement) to AL5 (AI operates fully autonomously, with no human in the loop). In AL3, AI “collaborates”: it can do large chunks of work under close human direction.'),
    line(primary,'L43: In AL4, AI “leads”'),
    line(primary,'L46:   * Claude is not operating'),
    line(primary,'L47:   * Claude “leads”'),
    line(primary,'L48:   * The share of work'),
    exact(primary,'(a model fully autonomously building its successor).'),
    exact(primary,'First is the lack of a common methodology.'),
    exact(primary,'Second, we’re using our own models to evaluate our systems, which could mean that the “judge” model could make the same kinds of errors as the model it is checking.'),
    exact(primary,'An independent Claude judge then read the resulting evidence and assigned one of six automation levels'),
    exact(primary,'There remains real room for disagreement on borderline cases, such as where exactly “AI collaborates” ends and “AI leads” begins.')
  ],
  OpenAI:[
    exact(continuation,'AI research is a complex process with many potential bottlenecks, so the overall pace of progress likely won’t keep pace with these specific metrics.'),
    exact(continuation,'People still set our research priorities, judge which ideas and results to pursue, and decide whether to scale, pause, or deploy systems.'),
    exact(continuation,'Agentic systems are new and rapidly changing, and our measurement efforts are still preliminary.'),
    exact(continuation,'In terms of a standard 8 hour workday, as of mid-August, in total, the research organization uses 3.1 agent-workdays of effort for every workday of human labor.'),
    exact(continuation,'However, agents still require significant human steering to be successful, especially as task complexity rises.'),
    line(continuation,'L101: In the last 6 months'),
    exact(continuation,'Some indicators, such as the amount of code our research teams generate, are relatively easy to gather, but hard to interpret because their relationship to research progress is uncertain.'),
    line(continuation,'L133:   * Metrics of coding agent use')
  ]
};
const verification=[];
for(const [publisher,items] of Object.entries(passages)){
  const capture=publisher==='Anthropic'?primary:continuation;
  for(const [index,passage] of items.entries()){
    const occurrences=capture.split(passage).length-1;
    if(occurrences<1)throw Error(`${publisher} passage ${index+1} is not an exact capture substring`);
    verification.push({publisher,passageIndex:index+1,sha256:crypto.createHash('sha256').update(passage).digest('hex'),occurrences,status:'EXACT_SUBSTRING_MATCH'});
  }
}
const captures={
  primary:{path:primaryPath,sha256:sha(primaryPath),capturedAt:'2026-09-19T16:04:57-07:00',serialization:'JSON.stringify untouched web-tool result'},
  continuation:{path:continuationPath,sha256:sha(continuationPath),capturedAt:'2026-09-19T16:05:22-07:00',serialization:'JSON.stringify untouched web-tool result'}
};
const wordCount=value=>(value.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g)||[]).length;
const exactSourceWords={Anthropic:passages.Anthropic.reduce((sum,value)=>sum+wordCount(value),0),OpenAI:passages.OpenAI.reduce((sum,value)=>sum+wordCount(value),0)};
if(exactSourceWords.Anthropic>=200||exactSourceWords.OpenAI>=200)throw Error(`Exact source passage budget exceeded: ${JSON.stringify(exactSourceWords)}`);
write('source-passages.json',{schemaVersion:'newsstand-exact-source-passages-v1',candidateId:'ai-research-automation-20260919',captures,passages,exactSourceWords,limits:{Anthropic:200,OpenAI:200},verification});
const records=[
  {
    sourceId:'anthropic-measuring-pace-20260919',publisher:'Anthropic',url:'https://www.anthropic.com/institute/measuring-pace-of-ai-development',publisherType:'provider-measurement-report',budgetWords:200,quoteBudgetWords:25,
    readScope:'Complete accessible primary article lines 0-146 read from the untouched primary capture. The bounded exact claim passages are individually substring-verified and remain below 200 words.',
    exactCapturedText:passages.Anthropic.join('\n'),
    exactPassages:passages.Anthropic,
    sourceCapture:captures.primary,
    passageEvidence:{path:d+'source-passages.json',sha256:null},
    limitations:['Provider measures its own internal work.','Claude helped construct and judge the index.','The frozen task basket and person-time weights are approximations.','No common cross-lab methodology or independent verification is supplied in this article.']
  },
  {
    sourceId:'openai-research-acceleration-20260906',publisher:'OpenAI',url:'https://openai.com/index/research-acceleration-view-inside-openai/',publisherType:'provider-measurement-report',budgetWords:200,quoteBudgetWords:25,
    readScope:'Complete accessible primary article lines 0-134 and appendix read across the untouched primary and continuation captures. The bounded exact claim passages are individually substring-verified and remain below 200 words.',
    exactCapturedText:passages.OpenAI.join('\n'),
    exactPassages:passages.OpenAI,
    sourceCapture:captures.continuation,
    passageEvidence:{path:d+'source-passages.json',sha256:null},
    limitations:['Provider measures its own internal research organization.','Agent-use coverage is incomplete.','Agent runtime, code and experiment counts do not directly establish overall research progress.','Available compute also changed during the measured period.']
  }
];
write('source-packet.json',{schemaVersion:'newsstand-exact-source-packet-v1',candidateId:'ai-research-automation-20260919',capturedAt:'2026-09-19T16:05:22-07:00',records,exactSourceWords,sourceFamilyAggregate:{Anthropic:200,OpenAI:200},quoteBudgetAggregate:{Anthropic:25,OpenAI:25}});
const passageSha=sha(d+'source-passages.json');
const packet=JSON.parse(fs.readFileSync(d+'source-packet.json','utf8'));
for(const record of packet.records)record.passageEvidence.sha256=passageSha;
write('source-packet.json',packet);
write('source-evidence.json',{
  schemaVersion:'newsstand-source-evidence-v1',candidateId:'ai-research-automation-20260919',checkedAt:new Date().toISOString(),
  exactSourcePacket:{path:d+'source-packet.json',sha256:sha(d+'source-packet.json'),scope:'Both complete accessible primary provider articles read from untouched web-tool captures; every claim-bearing passage is an exact verified substring.'},
  passages:{path:d+'source-passages.json',sha256:passageSha,checks:verification.length,status:'ALL_EXACT_SUBSTRINGS_MATCH'},
  records:records.map(record=>({sourceId:record.sourceId,status:'COMPLETE_ACCESSIBLE_PRIMARY_PROVIDER_SOURCE',authority:`${record.publisher} report for its own internal measurements and stated limitations.`,url:record.url,readScope:record.readScope,limits:record.limitations.join(' '),accessedAt:'2026-09-19',sourceCapture:record.sourceCapture}))
});
write('source-substring-verification.json',{schemaVersion:'newsstand-source-substring-verification-v1',candidateId:'ai-research-automation-20260919',checkedAt:new Date().toISOString(),captures,checks:verification,status:'PASS'});
console.log(JSON.stringify({status:'PASS',captures,passages:verification.length,packetSha256:sha(d+'source-packet.json'),evidenceSha256:sha(d+'source-evidence.json')},null,2));
