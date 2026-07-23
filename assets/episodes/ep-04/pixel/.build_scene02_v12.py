from pathlib import Path
import math, subprocess
import cv2, numpy as np
R=Path(__file__).resolve().parent; SRC=R/'ep04-scene-02a-luminairy-entrance-v4-correct-sign-review.png'; TMP=R/'ep04-scene-02-luminairy-v2-narration-sync-v16-lights-intermediate.mp4'; OUT=R/'ep04-scene-02-luminairy-v2-narration-sync-v16-lights.mp4'; FPS=30; D=45.57; SIZE=(1920,1080)
def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def bulbs(f):
 hsv=cv2.cvtColor(f,cv2.COLOR_BGR2HSV); c=((hsv[:,:,0]<35)&(hsv[:,:,1]<90)&(hsv[:,:,2]>240)).astype(np.uint8); reg=np.zeros_like(c); reg[int(400*f.shape[0]/1080):int(1050*f.shape[0]/1080),0:int(800*f.shape[1]/1920)]=1; reg[int(400*f.shape[0]/1080):int(1050*f.shape[0]/1080),int(1080*f.shape[1]/1920):f.shape[1]]=1; c*=reg; n,l,st,cen=cv2.connectedComponentsWithStats(c,8); out=[]
 for i in range(1,n):
  x,y,w,h,a=st[i]
  if 2<=a<=100 and w<=14 and h<=14:
   cx,cy=cen[i]; out.append((round(cx),round(cy),i*.61))
 return out
def main():
 src=cv2.imread(str(SRC)); z=1.12
 # Scale once, before rendering. Every output frame is then a native 1920x1080 crop,
 # so the pixel art is never resized differently from one frame to the next.
 scaled=cv2.resize(src,(round(1920*z),round(1080*z)),interpolation=cv2.INTER_LANCZOS4)
 comp=bulbs(scaled); w=cv2.VideoWriter(str(TMP),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(D*FPS)):
  t=i/FPS; f=scaled.copy()
  for cx,cy,phase in comp:
   wave=.5+.5*math.sin(t*math.tau*(.14+(int(phase*10)%5)*.022)+phase)
   radius=13; x0=max(0,cx-radius); x1=min(f.shape[1],cx+radius+1); y0=max(0,cy-radius); y1=min(f.shape[0],cy+radius+1)
   yy,xx=np.mgrid[y0:y1,x0:x1]; mask=np.exp(-((xx-cx)**2+(yy-cy)**2)/(2*5.0**2))[:,:,None]
   base=f[y0:y1,x0:x1].astype(np.float32); warm=base.copy(); warm[:,:,2]*=.35+wave*1.55; warm[:,:,1]*=.55+wave*.95; warm += np.array([0,22,58],np.float32)*wave
   f[y0:y1,x0:x1]=np.clip(base*(1-mask*.90)+warm*(mask*.90),0,255).astype(np.uint8)
  # Constant-speed diagonal track up the path. End center is the front entrance.
  p=min(1.0,t/D); cx=(900+(1040-900)*p)*z; cy=(595+(480-595)*p)*z
  w.write(cv2.getRectSubPix(f,SIZE,(cx,cy)))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(TMP),'-p','Preset1920x1080','-o',str(OUT),'--replace'],check=True); print(OUT)
if __name__=='__main__': main()
