from pathlib import Path
import math, subprocess
import cv2
import numpy as np

ROOT=Path(__file__).resolve().parent
FPS=30; DURATION=45.57; SIZE=(1920,1080)
SOURCES=[
 'ep04-scene-02a-luminairy-approach-v2-a-start.png',
 'ep04-scene-02a-luminairy-approach-v2-b-mid.png',
 'ep04-scene-02a-luminairy-approach-v2-c-end.png',
 'ep04-scene-02b-luminairy-nave-pixel-v1.png',
 'ep04-scene-02-luminairy-v2.png',
 'ep04-scene-02-luminairy-v2-b-mid.png',
 'ep04-scene-02-luminairy-v2-c-end.png']
OUT=ROOT/'ep04-scene-02-luminairy-v2-narration-sync-v11-review.mp4'
TMP=ROOT/'ep04-scene-02-luminairy-v2-narration-sync-v11-review-intermediate.mp4'

def smooth(x):
 x=max(0,min(1,x)); return x*x*(3-2*x)

def crop(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=smooth(p)
 cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p
 cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy))
 return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)

def glow(f,t,state):
 # Restrained global glass/candle breath; no flash transition.
 pulse=.0045*math.sin(t*math.tau*.12+state*.7)
 f[:]=np.clip(f.astype(np.float32)*(1+pulse),0,255).astype(np.uint8)

def cover(f):
 if f.shape[:2]==(1080,1920): return f
 h,w=f.shape[:2]; s=max(1920/w,1080/h); nw,nh=round(w*s),round(h*s)
 f=cv2.resize(f,(nw,nh),interpolation=cv2.INTER_LANCZOS4)
 x=(nw-1920)//2; y=(nh-1080)//2
 return f[y:y+1080,x:x+1920].copy()

SHOTS=[
 (0,7.0,0,(930,520),(985,520),1.025),
 (7.0,13.0,1,(960,520),(1005,520),1.06),
 (13.0,18.0,2,(960,500),(960,470),1.10),
 (18.0,24.5,3,(960,560),(960,520),1.04),
 (24.5,31.5,4,(960,540),(1000,540),1.025),
 (31.5,38.5,5,(960,540),(1000,540),1.04),
 (38.5,45.57,6,(960,540),(925,540),1.08)]

def main():
 ims=[cv2.imread(str(ROOT/x)) for x in SOURCES]
 if any(x is None for x in ims): raise RuntimeError('Scene 02 source missing')
 ims=[cover(x) for x in ims]
 w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(DURATION*FPS)):
  t=i/FPS; s=next(x for x in SHOTS if t<x[1]); a,b,state,c0,c1,z=s
  f=ims[state].copy(); glow(f,t,state); f=crop(f,(t-a)/(b-a),c0,c1,z); w.write(f)
 w.release()
 subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True)
 print(OUT)
if __name__=='__main__': main()
