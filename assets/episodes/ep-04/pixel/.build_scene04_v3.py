from pathlib import Path
import math, subprocess
import cv2, numpy as np

R=Path(__file__).resolve().parent; FPS=30; D=95.75; SIZE=(1920,1080)
N=['ep04-scene-04-hedy.png','ep04-scene-04-hedy-b-mid-v2-review.png','ep04-scene-04-hedy-c-end-v2-review.png']
TMP=R/'ep04-scene-04-hedy-narration-sync-v3-story-intermediate.mp4'
OUT=R/'ep04-scene-04-hedy-narration-sync-v3-story.mp4'

def sm(x):
 x=max(0,min(1,x)); return x*x*(3-2*x)

def cam(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p)
 cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p
 cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy))
 return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)

def bulbs(f,t):
 base=f.astype(np.float32); mask=np.zeros((1080,1920),np.float32)
 for j,(x,y) in enumerate([(74,120),(128,120),(184,120),(240,120),(296,120),(351,120),(74,174),(351,174),(74,228),(351,228)]):
  amp=.04+.025*math.sin(t*.72+j*1.7)
  cv2.circle(mask,(x,y),34,max(0,amp),-1)
 mask=cv2.GaussianBlur(mask,(0,0),22)[:,:,None]
 warm=base.copy(); warm[:,:,2]*=1.18; warm[:,:,1]*=1.07
 f[:]=np.clip(base*(1-mask)+warm*mask,0,255).astype(np.uint8)

S=[
 (0,13,0,(960,540),(990,540),1.02),
 (13,25,0,(1215,390),(1185,390),1.27),
 (25,37,0,(955,590),(975,590),1.15),
 (37,49,1,(960,540),(990,540),1.02),
 (49,61,1,(955,590),(975,590),1.15),
 (61,73,2,(960,540),(990,540),1.02),
 (73,84,2,(985,590),(1005,590),1.15),
 (84,95.75,2,(1215,390),(1185,390),1.27),
]

def main():
 ims=[cv2.imread(str(R/n)) for n in N]
 if any(x is None or x.shape[:2]!=(1080,1920) for x in ims): raise RuntimeError('Hedy v3 sources')
 w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(D*FPS)):
  t=i/FPS; a,b,k,c0,c1,z=next(x for x in S if t<x[1]); f=ims[k].copy(); bulbs(f,t)
  w.write(cam(f,(t-a)/(b-a),c0,c1,z))
 w.release()
 subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True)
 print(OUT)

if __name__=='__main__': main()
