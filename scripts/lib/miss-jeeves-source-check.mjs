import { hashAnswerBankValue, normalizeSourceText, sourceDigestFor } from './miss-jeeves-answer-bank.mjs';
// Each extractor is tied to a reviewed source, not arbitrary visitor URLs.
const APPROVED_SOURCES = new Map([
 ['https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices?c=caelum','claude-doc-article.v1']
]);
export function extractReviewedSource(html, extractor) {
 if(extractor!=='claude-doc-article.v1') throw new Error('unknown_extractor');
 const matches=[...html.matchAll(/<article\b[^>]*id="content-container"[^>]*>([\s\S]*?)<\/article>/gi)];
 if(matches.length!==1)throw new Error('source_structure_changed');
 const text=matches[0][1].replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<!--[^]*?-->/g,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 if(text.length<1000 || !text.includes('Be clear and direct') || !text.includes('Use examples effectively'))throw new Error('source_content_missing');
 return normalizeSourceText(text);
}
export async function checkReviewedSources({sources,sourceDigest},{fetchImpl=fetch,timeoutMs=5000}={}) {
 if(!Array.isArray(sources)||!sources.length||sources.length>4)return {current:false};
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try {
  const refreshed=[];
  for(const source of sources){
   const extractor=APPROVED_SOURCES.get(source.url);
   if(!extractor)return {current:false};
   const response=await fetchImpl(source.url,{redirect:'manual',signal:controller.signal,headers:{accept:'text/html','user-agent':'LAiDIES source freshness checker'}});
   if(response.status!==200||!response.headers.get('content-type')?.includes('text/html')){await response.body?.cancel();return {current:false};}
   const reader=response.body?.getReader();if(!reader)return {current:false};let size=0;const chunks=[];
   try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1500000){await reader.cancel();return {current:false};}chunks.push(value);}}finally{reader.releaseLock();}
   const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
   const text=extractReviewedSource(new TextDecoder().decode(bytes),extractor);
   const contentDigest=await hashAnswerBankValue(text);
   if(contentDigest!==source.contentDigest)return {current:false};
   refreshed.push({...source,contentDigest});
  }
  const digest=await sourceDigestFor(refreshed);
  return {current:digest===sourceDigest,sourceDigest:digest};
 }catch{return {current:false};}finally{clearTimeout(timer);}
}
