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
    contribution: 'In 1972, Karen Spärck Jones showed how word frequency across a collection could help order search results.',
    query: 'pension plan',
    example: 'Search six invented work files. Plan appears in five files; pension in two. Counting matches equally gives Pension plan 2 points, Pension limits 1, and four plan-only files 1 each. Using her frequency-based method gives plan matches 1 point and pension matches 3. The totals become 4, 3 and 1 each: Pension limits is now alone in second place.',
    boundary: 'More weight means more points for a match, which can move a file higher in the results. Rarer in this collection does not mean truer or always relevant.',
    credit: 'Source: Spärck Jones, Journal of Documentation (1972).'
  };
  const caption = `You wanted the pension plan. The search also found the project plan, hiring plan, travel plan and marketing plan. Technically, they match. Helpful? Less so.\n\nKaren Spärck Jones showed how counting a word’s use across a collection could help distinguish results. A word in almost every file gives little help separating them; a matching word found in only a few can give more.\n\nIn this six-file example, “plan” appears in five files and “pension” in two. Her 1972 method gives each plan match 1 point and each pension match 3. The file matching both gets 4. Pension limits gets 3, separating it from the four plan-only files on 1 point each. That is what “more weight” does: it changes a match’s contribution to the result’s score and can change the order.\n\nThese are invented files with exact word matches. Rarity does not guarantee relevance or truth; current search systems may use other signals too.\n\nHer paper: ${source}\nMore women who shaped computing: https://laidies.ai/luminairy#mavens`;
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
  async function render(format,index) {
    const key=`${format}-${index}`;if(cache.has(key))return cache.get(key);
    const fonts=await Promise.all([500,600,800].map(w=>document.fonts.load(`${w} 80px Jost`)));
    if(fonts.some(f=>!f.length))throw new Error('FONT_UNAVAILABLE');
    const {w,h}=formats[format],story=format==='story';
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
    const c=canvas.getContext('2d');if(!c)throw new Error('CANVAS_UNAVAILABLE');
    const drawnText=[],paint=c.fillText.bind(c);
    c.fillText=(text,x,y)=>{
      const m=c.measureText(text),width=m.width,t=c.getTransform();
      const left=c.textAlign==='right'?x-width:c.textAlign==='center'?x-width/2:x;
      if(left+t.e<30||left+width+t.e>w-30||y+t.f-m.actualBoundingBoxAscent<20||y+t.f+m.actualBoundingBoxDescent>h-20)throw new Error('TEXT_OUTSIDE_EXPORT');
      if(Number(c.font.match(/([\d.]+)px/)[1])<44)throw new Error('TEXT_TOO_SMALL');
      drawnText.push(String(text));paint(text,x,y);
    };
    const ink='#07142f',pink='#ef4d9c',teal='#19d3d1',purple='#744fc0',paper='#fff9ed',yellow='#ffe24c';
    c.fillStyle=[pink,teal,purple][index];c.fillRect(0,0,w,h);
    c.fillStyle=index===2?'rgba(7,20,47,.18)':'rgba(116,79,192,.24)';
    for(let x=710;x<w;x+=25)for(let y=20;y<h;y+=25){c.beginPath();c.arc(x,y,4.5,0,Math.PI*2);c.fill();}
    c.translate(0,story?275:0);
    function txt(s,x,y,size=48,weight=500,color=ink){c.font=`${weight} ${size}px Jost`;c.fillStyle=color;c.fillText(s,x,y);}
    function panel(x,y,width,height,fill,cut=24){c.fillStyle=ink;c.beginPath();c.moveTo(x+12,y+12);c.lineTo(x+width+12,y+12);c.lineTo(x+width+12,y+height+12-cut);c.lineTo(x+width+12-cut,y+height+12);c.lineTo(x+12,y+height+12);c.closePath();c.fill();c.fillStyle=fill;c.strokeStyle=ink;c.lineWidth=6;c.beginPath();c.moveTo(x,y);c.lineTo(x+width,y);c.lineTo(x+width,y+height-cut);c.lineTo(x+width-cut,y+height);c.lineTo(x,y+height);c.closePath();c.fill();c.stroke();}
    function folder(x,y,label,color,width=430){c.fillStyle=color;c.strokeStyle=ink;c.lineWidth=5;c.beginPath();c.moveTo(x,y);c.lineTo(x+130,y);c.lineTo(x+153,y+20);c.lineTo(x+width,y+20);c.lineTo(x+width,y+102);c.lineTo(x,y+102);c.closePath();c.fill();c.stroke();txt(label,x+20,y+75,46,600);}
    function footer(){txt('MAiVENS / LAiDIES.AI',58,1291,44,800,index===2?paper:ink);c.textAlign='right';txt(`${index+1}/3`,1022,1291,44,800,index===2?paper:ink);c.textAlign='left';}
    if(index===0){
      txt('KAREN SPÄRCK JONES',58,77,46,800);txt('You wanted the',54,177,76,800,paper);txt('pension plan.',54,261,84,800,paper);
      txt('The marketing plan can wait.',58,335,46,600);
      panel(52,400,976,676,paper);
      c.fillStyle=ink;c.fillRect(55,403,970,82);txt('SEARCH: pension plan',79,461,48,600,paper);
      [['Pension plan',pink],['Project plan',teal],['Hiring plan',teal],['Travel plan',teal],['Marketing plan',teal],['Pension limits',pink]].forEach(([name,color],i)=>folder(i%2?562:80,530+Math.floor(i/2)*168,name,color,432));
      wrap(c,'Six invented files. Why should some matches count more?',58,1160,960,48,58,600,ink);footer();
    }else if(index===1){
      txt('HER IDEA, IN SIX FILES',58,77,46,800);txt('Not every match',54,177,75,800);txt('tells you as much.',54,260,75,800);
      function frequency(y,name,n,color,points){
        panel(52,y,976,345,paper);c.fillStyle=color;c.fillRect(55,y+3,970,77);txt(name,80,y+60,52,800);
        txt(`In ${n} of 6 files.`,80,y+143,48,500);
        for(let i=0;i<6;i++){const x=82+i*95;c.fillStyle=i<n?color:paper;c.strokeStyle=ink;c.lineWidth=4;c.beginPath();c.moveTo(x,y+177);c.lineTo(x+47,y+177);c.lineTo(x+68,y+199);c.lineTo(x+68,y+257);c.lineTo(x,y+257);c.closePath();c.fill();c.stroke();}
        c.fillStyle=color;c.strokeStyle=ink;c.lineWidth=6;c.beginPath();c.arc(857,y+186,104,0,Math.PI*2);c.fill();c.stroke();c.textAlign='center';txt(`+${points}`,857,y+217,83,800);c.textAlign='left';
        txt(`Each match earns ${points} ${points===1?'point.':'points.'}`,80,y+313,48,600);
      }
      frequency(333,'PLAN',5,teal,1);frequency(723,'PENSION',2,pink,3);
      wrap(c,'“Pension” narrows the field to fewer files.',58,1160,960,48,58,600,ink);footer();
    }else{
      txt('ADD THE MATCHING POINTS',58,77,46,800,paper);txt('The pension files',54,177,72,800,paper);txt('rise to the top.',54,259,72,800,paper);
      const rows=[['Pension plan','1 + 3 = 4 points',teal],['Pension limits','3 points',pink],['Four other plans','1 point each',paper]];
      rows.forEach(([name,score,color],i)=>{const y=331+i*195;if(i===2){c.fillStyle=ink;c.fillRect(74,y+26,940,153);c.fillStyle=paper;c.strokeStyle=ink;c.lineWidth=5;c.fillRect(65,y+13,947,153);c.strokeRect(65,y+13,947,153);}panel(52,y,976,161,color);txt(name,80,y+64,52,800);txt(score,80,y+126,48,500);if(i<2){c.textAlign='right';txt(`#${i+1}`,988,y+112,80,800);c.textAlign='left';}});
      wrap(c,'Pension limits was tied with the other plans. Now it ranks second.',58,973,960,48,58,600,paper);
      wrap(c,'Rarer does not mean truer or always relevant.',58,1140,960,44,53,500,paper);
      txt('Spärck Jones’s 1972 method.',58,1240,44,500,paper);footer();
    }
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('EXPORT_UNAVAILABLE')),'image/png'));
    const file=new File([blob],`laidies-karen-sparck-jones-${format}-${index+1}.png`,{type:'image/png'});
    const item={blob,file,url:URL.createObjectURL(blob),format,index,transcript:drawnText.join('\n')};cache.set(key,item);return item;
  }
  let currentItems=[],chosenSlide=0;
  function showSlide(index){
    if(!currentItems[index])return;chosenSlide=index;current=currentItems[index];
    image.src=current.url;image.alt=current.transcript.replace(/\n/g,'. ');$('socialTranscript').textContent=currentItems.map((item,i)=>`IMAGE ${i+1} OF 3\n${item.transcript}`).join('\n\n');
    $('socialSize').textContent=`${formats[chosen].label} · Image ${index+1} of 3`;
    root.querySelectorAll('[data-social-slide]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.socialSlide)===index)));
  }
  async function select(format) {
    chosen=format;const token=++revision;current=null;currentItems=[];
    download.disabled=true;$('socialDownloadAll').disabled=true;share.disabled=true;$('socialRetry').hidden=true;status.textContent='';
    $('socialLoading').hidden=false;$('socialLoading').textContent='Preparing your post…';image.hidden=true;
    for(const button of root.querySelectorAll('[data-social-format]'))button.setAttribute('aria-pressed',String(button.dataset.socialFormat===format));
    $('socialSize').textContent=formats[format].label;
    try {
      const items=await Promise.all([0,1,2].map(index=>render(format,index)));if(token!==revision)return;
      currentItems=items;showSlide(chosenSlide);
      image.hidden=false;$('socialLoading').hidden=true;download.disabled=false;$('socialDownloadAll').disabled=false;
      let supported=false;try{supported=typeof navigator.share==='function'&&typeof navigator.canShare==='function'&&navigator.canShare({files:items.map(item=>item.file)});}catch{}
      share.hidden=!supported;share.disabled=false;
    } catch {
      if(token!==revision)return;
      $('socialLoading').textContent='The image couldn’t load.';
      status.textContent='Please try again. You can still read the story and open Karen’s paper below.';
      $('socialRetry').hidden=false;
    }
  }
  root.querySelectorAll('[data-social-format]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.socialFormat)));
  root.querySelectorAll('[data-social-slide]').forEach(b=>b.addEventListener('click',()=>showSlide(Number(b.dataset.socialSlide))));
  $('socialDownloadAll').addEventListener('click',async()=>{
    if(currentItems.length!==3)return;const items=currentItems.slice(),format=chosen;
    try{const blob=await window.makeLaidiesSocialZip(items.map(item=>item.file));const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`laidies-karen-sparck-jones-${format}.zip`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);status.textContent='Your three images are downloading together. The caption is ready below.';}
    catch{status.textContent='The set could not download. You can download each image using the numbered previews.';}
  });
  $('socialRetry').addEventListener('click',()=>select(chosen));
  download.addEventListener('click',()=>{
    if(!current)return;
    const a=document.createElement('a');a.href=current.url;a.download=current.file.name;document.body.append(a);a.click();a.remove();
    status.textContent='Image download started. The caption is ready to copy below.';
  });
  share.addEventListener('click',async()=>{
    if(!current)return;
    try{await navigator.share({files:currentItems.map(item=>item.file),title:copy.title});status.textContent='Share sheet closed.';}
    catch(error){status.textContent=error.name==='AbortError'?'Sharing cancelled. Your image is still ready.':'Sharing isn’t available here. Use Download image instead.';}
  });
  $('socialCopy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(caption);status.textContent='Caption copied.';}
    catch{const field=$('socialCaptionFallback');field.hidden=false;field.focus();field.select();status.textContent='Automatic copy was blocked. The caption is selected below.';}
  });
  addEventListener('pagehide',event=>{if(!event.persisted)for(const item of cache.values())URL.revokeObjectURL(item.url);});
  select('post');
})();
