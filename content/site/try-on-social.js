/* Finished, deterministic social graphics. No AI calls, private notes, account or rewards. */
(() => {
  'use strict';
  if (!document.documentElement.classList.contains('social-episode')) return;
  const root = document.getElementById('mavenSocial');
  root.hidden = false;
  document.getElementById('legacyTryOn').hidden = true;
  root.tabIndex = -1;
  // The shared header initially selects the first main; Episode04 uses the second.
  const pointSkipAtSocial = () => {
    const skip = document.querySelector('.svgh-skip');
    if (skip) skip.setAttribute('href', '#mavenSocial');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pointSkipAtSocial, {once:true});
  else pointSkipAtSocial();
  document.title = 'Share a MAiVEN · Episode 04 | LAiDIES';
  document.querySelector('meta[name="description"]').content = 'Preview and download a sourced social post about Karen Spärck Jones’s contribution to document search.';
  const $ = id => document.getElementById(id);
  const source = 'https://www.cl.cam.ac.uk/archive/ksj21/ksjdigipapers/jdoc72.pdf';
  const copy = {
    title: 'Karen Spärck Jones',
    contribution: 'In 1972, she showed how giving less common words more weight could improve document search.',
    query: 'velvet blazer',
    example: 'If “velvet” appears in fewer documents than “blazer”, a match on “velvet” can carry more weight.',
    boundary: 'It depends on the collection you’re searching.',
    credit: 'Source: Spärck Jones, Journal of Documentation (1972).'
  };
  const caption = `${copy.title} had a useful idea about search: a word that turns up everywhere tells you less about which document you want.\n\n${copy.contribution}\n\nHer paper: ${source}\n\nMore women who shaped computing: https://laidies.ai/luminairy#mavens`;
  $('socialCaption').textContent = caption;
  $('socialCaptionFallback').value = caption;
  for (const text of [copy.title,copy.contribution,`Search example: ${copy.query}.`,copy.example,copy.boundary,copy.credit]) {
    const p=document.createElement('p');p.textContent=text;$('socialTranscript').append(p);
  }
  const image = $('socialImage');
  const download = $('socialDownload');
  const share = $('socialShare');
  const status = $('socialStatus');
  const formats = {post:{w:1080,h:1350,label:'Post · 1080 × 1350'},story:{w:1080,h:1920,label:'Story · 1080 × 1920'}};
  const cache = new Map();
  let current=null, chosen='post', revision=0;
  function wrap(ctx,text,x,y,width,size,lineHeight,weight=500,color='#07142f') {
    ctx.font=`${weight} ${size}px Jost`;ctx.fillStyle=color;
    let line='';
    for(const word of text.split(' ')) {
      const next=line?`${line} ${word}`:word;
      if(line && ctx.measureText(next).width>width) {ctx.fillText(line,x,y);y+=lineHeight;line=word;} else line=next;
    }
    ctx.fillText(line,x,y);return y+lineHeight;
  }
  function round(ctx,x,y,w,h,r,color) {ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  async function render(format) {
    if(cache.has(format)) return cache.get(format);
    const fonts=await Promise.all([500,600,800].map(w=>document.fonts.load(`${w} 80px Jost`)));
    if(fonts.some(f=>!f.length)) throw new Error('FONT_UNAVAILABLE');
    const {w,h}=formats[format], story=format==='story';
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
    const c=canvas.getContext('2d');if(!c) throw new Error('CANVAS_UNAVAILABLE');
    const gradient=c.createLinearGradient(0,0,w,h);gradient.addColorStop(0,'#ef4d9c');gradient.addColorStop(.54,'#b75cc4');gradient.addColorStop(1,'#6c7cd1');c.fillStyle=gradient;c.fillRect(0,0,w,h);
    // A restrained print halftone; no sticker/tape or worksheet decoration.
    c.fillStyle='rgba(7,20,47,.12)';for(let x=770;x<1080;x+=22)for(let y=40;y<500;y+=22){c.beginPath();c.arc(x,y,3.5,0,Math.PI*2);c.fill();}
    const offset=story?160:0;
    c.textBaseline='alphabetic';c.font='800 37px Jost';c.fillStyle='#07142f';c.fillText('MAiVENS',64,90+offset);
    c.font='600 24px Jost';c.fillText('WOMEN WHO SHAPED COMPUTING',64,158+offset);
    c.font='800 112px Jost';c.fillStyle='#19d3d1';c.fillText('Karen',70,297+offset);c.fillText('Spärck Jones',70,405+offset);
    c.fillStyle='#fff';c.fillText('Karen',64,291+offset);c.fillText('Spärck Jones',64,399+offset);
    wrap(c,copy.contribution,64,479+offset,925,39,51,600);
    const panelY=story?900:666;
    round(c,70,panelY+7,940,384,20,'#07142f');round(c,64,panelY,940,384,20,'#86e8cf');
    c.font='600 24px Jost';c.fillStyle='#07142f';c.fillText('A SEARCH EXAMPLE',94,panelY+48);
    round(c,94,panelY+75,880,88,12,'#fff');c.strokeStyle='#07142f';c.lineWidth=3;c.strokeRect(108,panelY+101,24,24);c.beginPath();c.moveTo(132,panelY+125);c.lineTo(144,panelY+137);c.stroke();
    c.font='800 46px Jost';c.fillStyle='#07142f';c.fillText(copy.query,170,panelY+135);
    let bottom=wrap(c,copy.example,94,panelY+218,850,34,43,500);
    wrap(c,copy.boundary,94,bottom+18,850,27,34,600);
    const footerY=story?1580:1164;
    c.fillStyle='#07142f';c.fillRect(64,footerY-34,940,3);
    wrap(c,copy.credit,64,footerY+6,930,27,34,500);
    c.font='800 33px Jost';c.fillText('laidies.ai/luminairy',64,footerY+100);
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('EXPORT_UNAVAILABLE')),'image/png'));
    const file=new File([blob],`laidies-karen-sparck-jones-${format}.png`,{type:'image/png'});
    const item={blob,file,url:URL.createObjectURL(blob),format};cache.set(format,item);return item;
  }
  async function select(format) {
    chosen=format;const token=++revision;current=null;
    download.disabled=true;share.disabled=true;$('socialRetry').hidden=true;status.textContent='';
    $('socialLoading').hidden=false;$('socialLoading').textContent='Preparing your post…';image.hidden=true;
    for(const button of root.querySelectorAll('[data-social-format]'))button.setAttribute('aria-pressed',String(button.dataset.socialFormat===format));
    $('socialSize').textContent=formats[format].label;
    try {
      const item=await render(format);if(token!==revision)return;
      current=item;image.src=item.url;image.alt=`${copy.title}. ${copy.contribution} Search example: ${copy.query}. ${copy.example} ${copy.boundary} ${copy.credit}`;
      image.hidden=false;$('socialLoading').hidden=true;download.disabled=false;
      let supported=false;try{supported=typeof navigator.share==='function'&&typeof navigator.canShare==='function'&&navigator.canShare({files:[item.file]});}catch{}
      share.hidden=!supported;share.disabled=false;
    } catch {
      if(token!==revision)return;
      $('socialLoading').textContent='The image couldn’t load.';
      status.textContent='Please try again. You can still read the story and open Karen’s paper below.';
      $('socialRetry').hidden=false;
    }
  }
  root.querySelectorAll('[data-social-format]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.socialFormat)));
  $('socialRetry').addEventListener('click',()=>select(chosen));
  download.addEventListener('click',()=>{
    if(!current)return;
    const a=document.createElement('a');a.href=current.url;a.download=current.file.name;document.body.append(a);a.click();a.remove();
    status.textContent='Image download started. The caption is ready to copy below.';
  });
  share.addEventListener('click',async()=>{
    if(!current)return;
    try{await navigator.share({files:[current.file],title:copy.title});status.textContent='Share sheet closed.';}
    catch(error){status.textContent=error.name==='AbortError'?'Sharing cancelled. Your image is still ready.':'Sharing isn’t available here. Use Download image instead.';}
  });
  $('socialCopy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(caption);status.textContent='Caption copied.';}
    catch{const field=$('socialCaptionFallback');field.hidden=false;field.focus();field.select();status.textContent='Automatic copy was blocked. The caption is selected below.';}
  });
  addEventListener('pagehide',event=>{if(!event.persisted)for(const item of cache.values())URL.revokeObjectURL(item.url);});
  select('post');
})();
