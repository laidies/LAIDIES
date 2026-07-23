from pathlib import Path
import math, subprocess
import cv2
import numpy as np
ROOT=Path(__file__).resolve().parent; FPS=30; D=96.25; SIZE=(1920,1080)
N=['ep04-scene-03-ada.png','ep04-scene-03-ada-b-mid.png','ep04-scene-03-ada-c-end.png']
TMP=ROOT/'ep04-scene-03-ada-narration-sync-v3-grace-method-intermediate.mp4'; OUT=ROOT/'ep04-scene-03-ada-narration-sync-v3-grace-method.mp4'
def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def cam(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p); cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p
 cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy)); return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)
def life(f,t):
 # Only the existing candle side of the room breathes; Ada and the rest of the
 # frame remain pixel-for-pixel stable.
 pulse=.012+.010*math.sin(t*math.tau*.18)
 mask=np.zeros((1080,1920),np.float32); cv2.ellipse(mask,(180,610),(230,330),0,0,360,1,-1); mask=cv2.GaussianBlur(mask,(0,0),55)[:,:,None]
 base=f.astype(np.float32); warm=base.copy(); warm[:,:,2]*=1+pulse; warm[:,:,1]*=1+pulse*.45; f[:]=np.clip(base*(1-mask)+warm*mask,0,255).astype(np.uint8)
S=[
(0,12,0,(960,540),(1000,540),1.02),
(12,25,0,(520,500),(555,500),1.38),
(25,38,0,(1180,470),(1145,470),1.34),
(38,51,1,(960,540),(1000,540),1.03),
(51,65,1,(650,500),(690,500),1.36),
(65,79,2,(960,540),(1000,540),1.04),
(79,88,2,(1190,405),(1155,405),1.38),
(88,96.25,2,(760,430),(795,430),1.34)]
def main():
 im=[cv2.imread(str(ROOT/x)) for x in N]
 if any(x is None or x.shape[:2]!=(1080,1920) for x in im): raise RuntimeError('Ada sources')
 w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(D*FPS)):
  t=i/FPS; s=next(x for x in S if t<x[1]); a,b,k,c0,c1,z=s; f=im[k].copy(); life(f,t); w.write(cam(f,(t-a)/(b-a),c0,c1,z))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True); print(OUT)
if __name__=='__main__': main()
