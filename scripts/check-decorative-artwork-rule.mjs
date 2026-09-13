import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export function imitationPatterns(text) {
  const variables=new Map([...text.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)/g)].map(m=>[m[1],m[2]]));
  for(let i=0;i<8;i++)text=text.replace(/var\(\s*(--[\w-]+)\s*\)/g,(match,name)=>variables.get(name)||match);
  const findings=new Set();
  for(const [,selector,body] of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)){
    if(/\.cf-section-head\b/.test(selector)&&/radial-gradient\s*\(\s*circle\s*,/i.test(body))findings.add('CSS dot/halftone artwork');
    if(/\.cf-routebar\s*>\s*a\b/.test(selector)&&/clip-path\s*:\s*polygon\s*\(/i.test(body))findings.add('CSS polygon ticket/burst artwork');
    if(/\.cf-section-head\s+h2\b/.test(selector)&&/transform\s*:\s*rotate\s*\(/i.test(body))findings.add('rotated decorative treatment');
  }
  if(/<svg\b[^>]*class=["'][^"']*\bcf-route-art\b/i.test(text))findings.add('primitive route illustration');
  return [...findings];
}
export function checkArtworkSources(sources, root) {
  if (!Array.isArray(sources)||!sources.length) return ['artwork implementation source bindings are required'];
  const errors=[];
  for(const source of sources){
    const target=path.resolve(root,source?.path||'');
    if(!target.startsWith(path.resolve(root)+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){errors.push('artwork source missing or outside repository');continue;}
    const bytes=fs.readFileSync(target),hash=crypto.createHash('sha256').update(bytes).digest('hex');
    if(hash!==source.sha256){errors.push(`${source.path}: stale source binding`);continue;}
    for(const finding of imitationPatterns(bytes.toString()))errors.push(`${source.path}: ${finding}; rejected Chick Flicks implementation signature`);
  }
  return errors;
}
