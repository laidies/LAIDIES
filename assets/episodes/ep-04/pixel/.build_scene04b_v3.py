from pathlib import Path
import math, subprocess
import cv2, numpy as np

R=Path(__file__).resolve().parent; FPS=30; D=103.25; SIZE=(1920,1080)
N=['ep04-scene-04b-eniac-a-start.png','ep04-scene-04b-eniac.png','ep04-scene-04b-eniac-c-end.png']
TMP=R/'ep04-scene-04b-eniac-narration-sync-v3-story-intermediate.mp4'
OUT=R/'ep04-scene-04b-eniac-narration-sync-v3-story.mp4'

def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def cam(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p)
 cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p
 cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy))
 return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)
def lamps(im):
 hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV); m=((hsv[:,:,0]<38)&(hsv[:,:,1]>100)&(hsv[:,:,2]>155)).astype(np.uint8)
 n,l,s,_=cv2.connectedComponentsWithStats(m,8); out=[]
 for j in range(1,n):
  x,y,w,h,a=s[j]
  if 2<=a<=65 and w<=14 and h<=14:
   yy,xx=np.where(l==j); out.append((yy,xx,j*.71))
 return out
def blink(f,src,t,ls):
 for yy,xx,p in ls[::5]:
  q=math.sin(t*.95+p)
  if q>.70: f[yy,xx]=np.clip(src[yy,xx].astype(np.float32)*1.32,0,255).astype(np.uint8)
  elif q<-.82: f[yy,xx]=np.clip(src[yy,xx].astype(np.float32)*.62,0,255).astype(np.uint8)

S=[(0,13,0,(960,540),(990,540),1.01),(13,25,0,(490,510),(530,510),1.16),(25,37,0,(1390,510),(1350,510),1.16),(37,49,1,(960,540),(990,540),1.01),(49,61,1,(520,520),(560,520),1.15),(61,73,1,(1390,520),(1350,520),1.15),(73,84,2,(960,540),(990,540),1.01),(84,94,2,(520,520),(560,520),1.14),(94,103.25,2,(960,540),(990,540),1.02)]
def main():
 ims=[cv2.imread(str(R/n)) for n in N]; ls=[lamps(x) for x in ims]
 if any(x is None or x.shape[:2]!=(1080,1920) for x in ims): raise RuntimeError('ENIAC sources')
 w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(D*FPS)):
  t=i/FPS; a,b,k,c0,c1,z=next(x for x in S if t<x[1]); f=ims[k].copy(); blink(f,ims[k],t,ls[k]); w.write(cam(f,(t-a)/(b-a),c0,c1,z))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True); print(OUT)
if __name__=='__main__': main()
