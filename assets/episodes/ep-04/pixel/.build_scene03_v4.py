from pathlib import Path
import math, subprocess
import cv2, numpy as np
R=Path(__file__).resolve().parent; FPS=30; D=96.25; SIZE=(1920,1080)
N=['ep04-scene-03-ada-v2-repaired-base-review.png','ep04-scene-03-ada-machine-a-start-review.png','ep04-scene-03-ada-machine-b-mid-review.png','ep04-scene-03-ada-machine-c-end-review.png']
TMP=R/'ep04-scene-03-ada-narration-sync-v4-story-intermediate.mp4'; OUT=R/'ep04-scene-03-ada-narration-sync-v4-story.mp4'
def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def cam(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p); cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p; cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy)); return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)
def candle(f,t,machine):
 cx=55 if machine else 78; cy=410 if machine else 475; mask=np.zeros((1080,1920),np.float32); cv2.ellipse(mask,(cx,cy),(170,260),0,0,360,1,-1); mask=cv2.GaussianBlur(mask,(0,0),45)[:,:,None]; base=f.astype(np.float32); warm=base.copy(); p=.010+.008*math.sin(t*math.tau*.18); warm[:,:,2]*=1+p; warm[:,:,1]*=1+p*.45; f[:]=np.clip(base*(1-mask)+warm*mask,0,255).astype(np.uint8)
S=[(0,13,0,(960,540),(995,540),1.02),(13,25,0,(1220,430),(1185,430),1.28),(25,37,1,(960,540),(995,540),1.02),(37,48,2,(960,540),(995,540),1.02),(48,60,3,(960,540),(995,540),1.02),(60,72,3,(1080,500),(1045,500),1.18),(72,84,0,(960,540),(995,540),1.02),(84,96.25,0,(1240,420),(1205,420),1.26)]
def main():
 ims=[cv2.imread(str(R/n)) for n in N]
 if any(x is None or x.shape[:2]!=(1080,1920) for x in ims): raise RuntimeError('Ada v4 sources')
 w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(D*FPS)):
  t=i/FPS; s=next(x for x in S if t<x[1]); a,b,k,c0,c1,z=s; f=ims[k].copy(); candle(f,t,k>0); w.write(cam(f,(t-a)/(b-a),c0,c1,z))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True); print(OUT)
if __name__=='__main__': main()
