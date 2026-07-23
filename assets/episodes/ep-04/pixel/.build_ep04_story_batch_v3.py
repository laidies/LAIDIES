from pathlib import Path
import math, subprocess, sys
import cv2, numpy as np

R=Path(__file__).resolve().parent; FPS=30; SIZE=(1920,1080)
CFG={
'01':(57.68,'cold-open-v4',['ep04-scene-01-cold-open-v4-face-review.png','ep04-scene-01-cold-open-v4-b-mid-review.png','ep04-scene-01-cold-open-v4-c-end-review.png']),
'02':(45.57,'luminairy-v4',['ep04-scene-02a-luminairy-wide-v6-LUMINAiRY-review.png','ep04-scene-02a-luminairy-entrance-v5-LUMINAiRY-review.png','ep04-scene-02b-luminairy-nave-pixel-v1.png','ep04-scene-02-luminairy-v2.png','ep04-scene-02-luminairy-v2-b-mid.png','ep04-scene-02-luminairy-v2-c-end.png']),
'06':(33.81,'naming-v4',['ep04-scene-06-naming-b-mid-v2-review.png','ep04-scene-06-naming-c-end.png']),
'07':(15.27,'ai-winter',['ep04-scene-07-ai-winter.png','ep04-scene-07-ai-winter-c-end-v2-review.png']),
'08':(88.28,'karen',['ep04-scene-08-karen.png','ep04-scene-08-karen-b-mid.png','ep04-scene-08-karen-c-end.png']),
'09':(78.82,'fei-fei',['ep04-scene-09-fei-fei-a-start.png','ep04-scene-09-fei-fei-b-mid.png','ep04-scene-09-fei-fei.png']),
'10':(51.85,'desk-v3',['ep04-scene-10-desk-v3-face-review.png','ep04-scene-10-desk-v3-c-end-review.png']),
'11':(108.03,'checkers-v4',['ep04-scene-11-checkers.png','ep04-scene-11-checkers-c-end.png','ep04-scene-11-checkers-b-parrot-review.png','ep04-scene-11-checkers-c-extraction-review.png','ep04-scene-11-checkers-c-end.png']),
'12':(79.22,'lights-up-v2',['ep04-scene-12-lights-up-v2.png','ep04-scene-12-lights-up-v2-b-mid.png','ep04-scene-12-lights-up-v2-c-end.png'])}

def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def cover(f):
 h,w=f.shape[:2]; q=max(1920/w,1080/h); nw,nh=int(round(w*q)),int(round(h*q)); f=cv2.resize(f,(nw,nh),interpolation=cv2.INTER_LANCZOS4)
 x=(nw-1920)//2; y=(nh-1080)//2; return f[y:y+1080,x:x+1920].copy()
def cam(f,p,z,cx=960,cy=540,dx=24):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p); x=cx-dx/2+dx*p
 x=max(cw/2,min(1920-cw/2,x)); cy=max(ch/2,min(1080-ch/2,cy))
 return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(x,cy)),SIZE,interpolation=cv2.INTER_LINEAR)
def lamps(im):
 hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV); m=((hsv[:,:,1]>90)&(hsv[:,:,2]>155)).astype(np.uint8)
 n,l,s,_=cv2.connectedComponentsWithStats(m,8); out=[]
 for j in range(1,n):
  x,y,w,h,a=s[j]
  if 2<=a<=55 and w<=13 and h<=13:
   yy,xx=np.where(l==j); out.append((yy,xx,j*.53))
 return out
def ambient(f,src,t,scene,ls):
 if scene in {'02','08','12'}:
  for yy,xx,p in ls[::9]:
   q=math.sin(t*.82+p)
   if q>.78: f[yy,xx]=np.clip(src[yy,xx].astype(np.float32)*1.24,0,255).astype(np.uint8)
 if scene=='06':
  rng=np.random.default_rng(int(t*4));
  for _ in range(10):
   x=int(rng.integers(70,520)); y=int(rng.integers(80,650)); cv2.circle(f,(x,y),1,(150,190,220),-1)
 if scene=='07' and t<8:
  # Restrained CRT struggle, confined to the foreground screen rectangle.
  gain=.86+.14*max(0,math.sin(t*7.4))*max(0,1-t/8)
  f[431:543,1265:1392]=np.clip(f[431:543,1265:1392].astype(np.float32)*gain,0,255).astype(np.uint8)

def shot_plan(scene,d,nstates):
 count=max(nstates,math.ceil(d/11)); bounds=np.linspace(0,d,count+1); out=[]
 for i in range(count):
  k=min(nstates-1,int(i*nstates/count))
  if i>=count-max(1,count//3): k=nstates-1
  # Full compositions dominate; alternate only restrained, meaningful reframes.
  z=[1.02,1.10,1.04][i%3]; cx=960; cy=540
  if scene=='01' and i%3==1: cx,cy,z=1050,500,1.10
  if scene=='02': z=1.02
  if scene=='08' and i%3==1: cx,cy,z=720,520,1.13
  if scene=='09' and i%3==1: cx,cy,z=710,500,1.11
  if scene=='10' and i%3==1: cx,cy,z=1030,480,1.10
  if scene=='11' and i%3==1: cx,cy,z=720,500,1.11
  if scene=='12': z=1.02
  if scene=='06' and i%3==1: cx,cy,z=1180,470,1.10
  if scene=='07': z=1.02
  out.append((bounds[i],bounds[i+1],k,z,cx,cy))
 return out

def build(scene):
 d,stem,names=CFG[scene]; raw=[cv2.imread(str(R/n)) for n in names]
 if any(x is None for x in raw): raise RuntimeError(scene)
 ims=[cover(x) for x in raw]
 ls=[lamps(x) for x in ims]; plan=shot_plan(scene,d,len(ims))
 tmp=R/f'ep04-scene-{scene}-{stem}-narration-sync-v3-story-intermediate.mp4'; out=R/f'ep04-scene-{scene}-{stem}-narration-sync-v3-story.mp4'
 w=cv2.VideoWriter(str(tmp),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(d*FPS)):
  t=i/FPS; a,b,k,z,cx,cy=next(x for x in plan if t<x[1]); p=(t-a)/(b-a)
  if scene=='02' and k==0: z=1.0+.10*sm(p)
  f=ims[k].copy(); ambient(f,ims[k],t,scene,ls[k]); w.write(cam(f,p,z,cx,cy))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(tmp),'-p','Preset1920x1080','-o',str(out),'--replace'],check=True); print(out,flush=True)

if __name__=='__main__':
 for s in (sys.argv[1:] or CFG): build(s)
