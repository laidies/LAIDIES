from pathlib import Path
import math, subprocess
import cv2, numpy as np
R=Path(__file__).resolve().parent; FPS=30; D=45.57; SIZE=(1920,1080)
N=['ep04-scene-02a-luminairy-approach-v2-a-start.png','ep04-scene-02a-luminairy-entrance-v5-LUMINAiRY-review.png','ep04-scene-02b-luminairy-nave-pixel-v1.png','ep04-scene-02-luminairy-v2-b-mid.png','ep04-scene-02-luminairy-v2-c-end.png']
TMP=R/'ep04-scene-02-luminairy-v2-narration-sync-v17-story-intermediate.mp4'; OUT=R/'ep04-scene-02-luminairy-v2-narration-sync-v17-story.mp4'
def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def cover(f):
 h,w=f.shape[:2]; s=max(1920/w,1080/h); f=cv2.resize(f,(round(w*s),round(h*s)),interpolation=cv2.INTER_LANCZOS4); h,w=f.shape[:2]; return f[(h-1080)//2:(h-1080)//2+1080,(w-1920)//2:(w-1920)//2+1920]
def cam(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p); cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p; cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy)); return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)
def centers(f):
 hsv=cv2.cvtColor(f,cv2.COLOR_BGR2HSV); c=((hsv[:,:,0]<35)&(hsv[:,:,1]<90)&(hsv[:,:,2]>240)).astype(np.uint8); reg=np.zeros_like(c); reg[400:1050,0:800]=1; reg[400:1050,1080:1920]=1; c*=reg; n,l,st,cen=cv2.connectedComponentsWithStats(c,8); out=[]
 for i in range(1,n):
  x,y,w,h,a=st[i]
  if 2<=a<=100 and w<=14 and h<=14: out.append((round(cen[i][0]),round(cen[i][1]),i*.61))
 return out
def lights(f,src,t,points):
 for cx,cy,phase in points:
  wave=.5+.5*math.sin(t*math.tau*(.15+(int(phase*10)%5)*.02)+phase); r=12; x0=max(0,cx-r); x1=min(1920,cx+r+1); y0=max(0,cy-r); y1=min(1080,cy+r+1); yy,xx=np.mgrid[y0:y1,x0:x1]; mask=np.exp(-((xx-cx)**2+(yy-cy)**2)/(2*4.7**2))[:,:,None]; base=src[y0:y1,x0:x1].astype(np.float32); warm=base.copy(); warm[:,:,2]*=.35+wave*1.55; warm[:,:,1]*=.55+wave*.95; warm+=np.array([0,22,58],np.float32)*wave; f[y0:y1,x0:x1]=np.clip(base*(1-mask*.9)+warm*(mask*.9),0,255).astype(np.uint8)
S=[(0,10,0,(960,570),(960,520),1.025),(10,20,1,(930,570),(985,520),1.03),(20,27,1,(1080,470),(1105,440),1.15),(27,35,2,(960,560),(960,520),1.03),(35,41,3,(960,540),(995,540),1.025),(41,45.57,4,(960,540),(925,540),1.06)]
def main():
 ims=[cover(cv2.imread(str(R/n))) for n in N]; pts=[centers(ims[0]),centers(ims[1])]
 w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(D*FPS)):
  t=i/FPS; s=next(x for x in S if t<x[1]); a,b,k,c0,c1,z=s; f=ims[k].copy()
  if k<2: lights(f,ims[k],t,pts[k])
  w.write(cam(f,(t-a)/(b-a),c0,c1,z))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True); print(OUT)
if __name__=='__main__': main()
