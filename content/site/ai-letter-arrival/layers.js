window.createAiLetterRenderer=async function(canvas,video){
const W=960,H=540,ctx=canvas.getContext('2d');
const img=new Image();img.src='/content/site/ai-original-arrival/poster.png';await img.decode();
function surface(){const c=document.createElement('canvas');c.width=W;c.height=H;return c;}
const scratch=surface(),sc=scratch.getContext('2d',{willReadFrequently:true});sc.drawImage(img,0,0);const original=sc.getImageData(0,0,W,H);
const aPath=new Path2D();[[393,612],[399,564],[445,499],[393,509],[390,480],[472,446],[617,303],[681,281],[704,300],[655,411],[693,414],[694,455],[643,474],[628,587],[601,615],[566,594],[564,523],[462,561],[425,617]].forEach(([x,y],i)=>i?aPath.lineTo(x*960/1672,y*540/941):aPath.moveTo(x*960/1672,y*540/941));aPath.closePath();
const iPath=new Path2D();iPath.ellipse(441,200,25,25,0,0,Math.PI*2);iPath.moveTo(416,218);iPath.lineTo(453,220);iPath.lineTo(415,308);iPath.lineTo(399,320);iPath.lineTo(371,309);iPath.lineTo(404,233);iPath.closePath();
const A=surface(),I=surface(),wings=surface();const aa=A.getContext('2d').createImageData(W,H),ii=I.getContext('2d').createImageData(W,H),ww=wings.getContext('2d').createImageData(W,H);
const wordPath=new Path2D();[[225,147],[890,147],[890,205],[818,300],[800,338],[710,341],[707,384],[259,392],[240,368],[120,378],[99,340]].forEach(([x,y],i)=>i?wordPath.lineTo(x,y):wordPath.moveTo(x,y));wordPath.closePath();
const isAi=new Uint8Array(W*H),isWing=new Uint8Array(W*H);
for(let y=145;y<390;y++)for(let x=105;x<900;x++){
if(!sc.isPointInPath(wordPath,x,y))continue;
const n=(y*W+x)*4,r=original.data[n],g=original.data[n+1],b=original.data[n+2];
const bright=r+g>200&&(r>140||g>135);if(!bright)continue;
const inA=sc.isPointInPath(aPath,x,y),inI=sc.isPointInPath(iPath,x,y),target=inA?aa:inI?ii:ww;
target.data.set(original.data.subarray(n,n+4),n);target.data[n+3]=255;
if(inA||inI)isAi[y*W+x]=1;else isWing[y*W+x]=1;
}
// Keep the original brush stem visible; animated objects occupy its dot position.
const marked=new Uint8Array(W*H);for(let seed=0;seed<W*H;seed++){if(marked[seed]||!aa.data[seed*4+3])continue;const todo=[seed],part=[];marked[seed]=1;while(todo.length){const n=todo.pop();part.push(n);for(const next of [n-1,n+1,n-W,n+W]){if(next<0||next>=W*H||marked[next]||!aa.data[next*4+3])continue;marked[next]=1;todo.push(next);}}if(part.length<60)for(const n of part)aa.data[n*4+3]=0;}
A.getContext('2d').putImageData(aa,0,0);I.getContext('2d').putImageData(ii,0,0);wings.getContext('2d').putImageData(ww,0,0);
const focus=surface(),fc=focus.getContext('2d'),echo=surface(),ec=echo.getContext('2d');
const stem=surface();stem.getContext('2d').drawImage(I,0,219,W,H-219,0,219,W,H-219);
const dyn=surface(),dc=dyn.getContext('2d'),live=surface(),lc=live.getContext('2d',{willReadFrequently:true});
let iconImpact=0,previousIcon=null,previousTime=-1;
function iconFrame(){lc.drawImage(video,0,0,W,H);const d=lc.getImageData(0,0,W,H),out=dc.createImageData(W,H);
// Estimate the source's intentional static-letter dimming from A's upper stroke.
let sum=0,count=0;for(let y=190;y<225;y++)for(let x=337;x<355;x++){const n=(y*W+x)*4;if(aa.data[n+3]&&original.data[n]>180){sum+=d.data[n]/original.data[n];count++;}}const dim=count?sum/count:1;
for(let y=160;y<332;y++)for(let x=347;x<485;x++){const i=y*W+x,n=i*4,r=d.data[n],g=d.data[n+1];if(r+g<185)continue;
const nativeI=ii.data[n+3]>0,diff=Math.abs(r-original.data[n]*dim)+Math.abs(g-original.data[n+1]*dim)+Math.abs(d.data[n+2]-original.data[n+2]*dim);
if(!nativeI&&((x-414)**2/67**2+(y-246)**2/69**2)>1)continue;
const sameInk=Math.abs(g/Math.max(r,1)-original.data[n+1]/Math.max(original.data[n],1))<.25&&Math.abs(d.data[n+2]/Math.max(r,1)-original.data[n+2]/Math.max(original.data[n],1))<.25;
if(!nativeI&&(isWing[i]||aa.data[n+3]||original.data[n]+original.data[n+1]>145)&&sameInk)continue;
out.data.set(d.data.subarray(n,n+4),n);out.data[n+3]=255;}
// Remove disconnected remnants of neighbouring brush strokes, retaining the central morph.
const seen=new Uint8Array(W*H);for(let y=160;y<332;y++)for(let x=347;x<485;x++){const seed=y*W+x;if(seen[seed]||!out.data[seed*4+3])continue;const stack=[seed],part=[];let sx=0,sy=0;seen[seed]=1;while(stack.length){const n=stack.pop();part.push(n);const px=n%W,py=Math.floor(n/W);sx+=px;sy+=py;for(const next of [n-1,n+1,n-W,n+W]){if(next<0||next>=W*H||seen[next]||!out.data[next*4+3])continue;seen[next]=1;stack.push(next);}}const cx=sx/part.length,cy=sy/part.length;if(part.length<150&&!(Math.abs(cx-414)<30&&Math.abs(cy-246)<50))for(const n of part)out.data[n*4+3]=0;}
// A short light pulse follows actual changing source pixels, not an unrelated timer.
const dt=video.currentTime-previousTime;let change=0,samples=0;
if(previousIcon&&dt>0&&dt<.1){for(let y=160;y<332;y+=3)for(let x=347;x<485;x+=3){const n=(y*W+x)*4;change+=Math.abs(out.data[n]-previousIcon[n])+Math.abs(out.data[n+1]-previousIcon[n+1])+Math.abs(out.data[n+2]-previousIcon[n+2]);samples++;}iconImpact=Math.max(iconImpact*Math.exp(-dt*20),Math.min(1,change/Math.max(1,samples)/35));}else iconImpact=0;
previousIcon=out.data;previousTime=video.currentTime;
dc.putImageData(out,0,0);return dyn;}
return function(p,showOriginalI){
// The source ends by morphing back into a whole i. Never scale that letter
// into the dot slot above our permanent stem: restore the single native i.
showOriginalI=showOriginalI||video.currentTime>=3.55;
ctx.clearRect(0,0,W,H);
ctx.save();ctx.globalAlpha=1-p;ctx.save();ctx.beginPath();ctx.rect(0,0,300-95*p,H);ctx.clip();ctx.drawImage(wings,-95*p,0);ctx.restore();ctx.save();ctx.beginPath();ctx.rect(300+95*p,0,W,H);ctx.clip();ctx.drawImage(wings,95*p,0);ctx.restore();ctx.restore();
// Build the unchanged Ai once, then use its alpha for fleeting coloured motion echoes.
fc.clearRect(0,0,W,H);fc.drawImage(A,0,0);
if(showOriginalI){fc.drawImage(I,0,0);const pulse=Math.max(0,1-(video.currentTime-3.55)/.12);if(video.currentTime>=3.55&&pulse>0){fc.save();fc.shadowColor='#24eaff';fc.shadowBlur=14*pulse;fc.drawImage(I,0,0,W,219,0,0,W,219);fc.restore();}}
else{fc.drawImage(stem,0,0);fc.save();fc.translate(441,198);fc.scale(.58,.58);fc.translate(-414,-246);const icon=iconFrame();fc.shadowColor='#ff36d3';fc.shadowBlur=3+18*iconImpact;fc.drawImage(icon,0,0);fc.restore();}
ctx.save();ctx.translate(480,270);ctx.scale(1+(canvas.clientWidth<560?.9:.25)*p,1+(canvas.clientWidth<560?.9:.25)*p);ctx.translate(-480+130*p,-270);
const energy=4*p*(1-p);
if(energy>.001){for(const [colour,offset] of [['#23eaff',-8],['#ff33c4',6]]){ec.clearRect(0,0,W,H);ec.globalCompositeOperation='source-over';ec.drawImage(focus,0,0);ec.globalCompositeOperation='source-in';ec.fillStyle=colour;ec.fillRect(0,0,W,H);ctx.globalCompositeOperation='screen';ctx.shadowColor=colour;ctx.shadowBlur=8;ctx.globalAlpha=energy*.32;ctx.drawImage(echo,offset*energy,0);}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.shadowBlur=0;}
ctx.drawImage(focus,0,0);ctx.restore();};
};
