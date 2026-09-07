import { hashAnswerBankValue, normalizeSourceText, sourceDigestFor } from './miss-jeeves-answer-bank.mjs';
// Each extractor is tied to a reviewed source, not arbitrary visitor URLs.
const APPROVED_SOURCES = new Map([
 ['https://support.microsoft.com/en-us/microsoft-365-copilot/validate-copilot-output','microsoft-validation.v1'],
 ['https://support.microsoft.com/en-us/word/copilot/draft-and-add-content-with-copilot-in-word','microsoft-drafting.v1'],
 ['https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices?c=caelum','claude-doc-article.v1'],
 ['https://www.cyber.gc.ca/en/guidance/generative-artificial-intelligence-ai-itsap00041','cyber-canada-article.v1'],
 ['https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai?wbdisable=true','opc-canada-main.v1'],
 ['https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf','openai-paper-bytes.v1']
]);
export function extractReviewedSource(html, extractor) {
 const patterns={
  'microsoft-validation.v1': /<main\b[^>]*id="supMainContent"[^>]*>([\s\S]*?)<\/main>/gi,
  'microsoft-drafting.v1': /<main\b[^>]*id="supMainContent"[^>]*>([\s\S]*?)<\/main>/gi,
  'claude-doc-article.v1': /<article\b[^>]*id="content-container"[^>]*>([\s\S]*?)<\/article>/gi,
  'cyber-canada-article.v1': /<article\b[^>]*about="\/en\/guidance\/generative-artificial-intelligence-ai-itsap00041"[^>]*>([\s\S]*?)<\/article>/gi,
  'opc-canada-main.v1': /<main\b[^>]*property="mainContentOfPage"[^>]*>([\s\S]*?)<\/main>/gi
 };
 if(!patterns[extractor])throw new Error('unknown_extractor');
 const matches=[...html.matchAll(patterns[extractor])];
 if(matches.length!==1)throw new Error('source_structure_changed');
 const text=matches[0][1].replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<!--[^]*?-->/g,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 const required={
  'microsoft-validation.v1':['Validation','source material'],
  'microsoft-drafting.v1':['Start a draft','reference'],
  'claude-doc-article.v1':['Be clear and direct','Use examples effectively'],
  'cyber-canada-article.v1':['Be careful what information you provide','sensitive corporate data'],
  'opc-canada-main.v1':['Limiting Collection, Use, and Disclosure','sensitive or confidential']
 };
 if(text.length<1000 || !required[extractor].every(x=>text.includes(x)))throw new Error('source_content_missing');
 return normalizeSourceText(text);
}
export async function reviewedSourceContentDigest(url,bytes) {
 const extractor=APPROVED_SOURCES.get(url);
 if(!extractor)throw new Error('unapproved_source');
 if(extractor==='openai-paper-bytes.v1'){
  if(bytes.length<10000||new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-')throw new Error('invalid_pdf');
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
 }
 return hashAnswerBankValue(extractReviewedSource(new TextDecoder().decode(bytes),extractor));
}
export async function checkReviewedSources({sources,sourceDigest},{fetchImpl=fetch,timeoutMs=5000}={}) {
 if(!Array.isArray(sources)||!sources.length||sources.length>4)return {current:false};
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try {
  const refreshed=[];
  for(const source of sources){
   const extractor=APPROVED_SOURCES.get(source.url);
   if(!extractor)return {current:false};
   const response=await fetchImpl(source.url,{redirect:'manual',signal:controller.signal,headers:{accept:extractor==='openai-paper-bytes.v1'?'application/pdf':'text/html','user-agent':'LAiDIES source freshness checker'}});
   if(response.status!==200||!response.headers.get('content-type')?.includes(extractor==='openai-paper-bytes.v1'?'application/pdf':'text/html')){await response.body?.cancel();return {current:false};}
   const reader=response.body?.getReader();if(!reader)return {current:false};let size=0;const chunks=[];
   try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1500000){await reader.cancel();return {current:false};}chunks.push(value);}}finally{reader.releaseLock();}
   const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
   const contentDigest=await reviewedSourceContentDigest(source.url,bytes);
   if(contentDigest!==source.contentDigest)return {current:false};
   refreshed.push({...source,contentDigest});
  }
  const digest=await sourceDigestFor(refreshed);
  return {current:digest===sourceDigest,sourceDigest:digest};
 }catch{return {current:false};}finally{clearTimeout(timer);}
}
