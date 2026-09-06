(async()=>{
const W=960,H=540,canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d'),video=document.querySelector('video'),state=document.querySelector('#state');
const img=new Image();img.src='../ai-original-arrival/poster.png';await img.decode();
function surface(){const c=document.createElement('canvas');c.width=W;c.height=H;return c;}
const scratch=surface(),sc=scratch.getContext('2d',{willReadFrequently:true});sc.drawImage(img,0,0);const original=sc.getImageData(0,0,W,H);
const aPath=new Path2D();[[393,612],[399,564],[445,499],[393,509],[390,480],[472,446],[617,303],[681,281],[704,300],[655,411],[693,414],[694,455],[643,474],[628,587],[601,615],[566,594],[564,523],[462,561],[425,617]].forEach(([x,y],i)=>i?aPath.lineTo(x*960/1672,y*540/941):aPath.moveTo(x*960/1672,y*540/941));aPath.closePath();
const iPath=new Path2D();iPath.ellipse(441,200,25,25,0,0,Math.PI*2);iPath.moveTo(416,218);iPath.lineTo(453,220);iPath.lineTo(415,308);iPath.lineTo(399,320);iPath.lineTo(371,309);iPath.lineTo(404,233);iPath.closePath();
const A=surface(),I=surface(),wings=surface();const aa=A.getContext('2d').createImageData(W,H),ii=I.getContext('2d').createImageData(W,H),ww=wings.getContext('2d').createImageData(W,H);
const isAi=new Uint8Array(W*H),isWing=new Uint8Array(W*H);
for(let y=145;y<390;y++)for(let x=105;x<900;x++){
const n=(y*W+x)*4,r=original.data[n],g=original.data[n+1],b=original.data[n+2];
const bright=r+g>200&&(r>140||g>135);if(!bright)continue;
const inA=sc.isPointInPath(aPath,x,y),inI=sc.isPointInPath(iPath,x,y),target=inA?aa:inI?ii:ww;
target.data.set(original.data.subarray(n,n+4),n);target.data[n+3]=255;
if(inA||inI)isAi[y*W+x]=1;else isWing[y*W+x]=1;
}
A.getContext('2d').putImageData(aa,0,0);I.getContext('2d').putImageData(ii,0,0);wings.getContext('2d').putImageData(ww,0,0);
const dyn=surface(),dc=dyn.getContext('2d'),live=surface(),lc=live.getContext('2d',{willReadFrequently:true});
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
dc.putImageData(out,0,0);return dyn;}
const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};let start=0,raf=0;
function draw(now){const t=(now-start)/1000,p=ease((t-.8)/.65)*(1-ease((t-4.75)/.65));ctx.clearRect(0,0,W,H);
ctx.save();ctx.globalAlpha=1-p;ctx.save();ctx.beginPath();ctx.rect(0,0,300-95*p,H);ctx.clip();ctx.drawImage(wings,-95*p,0);ctx.restore();ctx.save();ctx.beginPath();ctx.rect(300+95*p,0,W,H);ctx.clip();ctx.drawImage(wings,95*p,0);ctx.restore();ctx.restore();
ctx.save();ctx.translate(130*p,0);ctx.drawImage(A,0,0);ctx.drawImage(t<1.45||video.ended?I:iconFrame(),0,0);ctx.restore();
state.textContent=t<.8?'full':t<1.45?'separating':t<4.75?'Ai':t<5.4?'reassembling':'full';
if(t>=1.45&&video.paused&&!video.ended)video.play();if(t<6.1)raf=requestAnimationFrame(draw);else video.pause();}
function run(){cancelAnimationFrame(raf);video.pause();video.currentTime=.7;start=performance.now();raf=requestAnimationFrame(draw);}
window.pauseProof=()=>{cancelAnimationFrame(raf);video.pause();};document.querySelector('#go').onclick=run;window.proofReady=true;run();
})();
