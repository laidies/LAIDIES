from pathlib import Path
import json, math, subprocess
import cv2, numpy as np
R=Path(__file__).resolve().parent; FPS=30; SIZE=(1920,1080)
CFG={
'04':('hedy',['ep04-scene-04-hedy.png','ep04-scene-04-hedy-c-end.png'],[(960,540),(540,700),(1080,390),(1450,420)]),
'04b':('eniac',['ep04-scene-04b-eniac-a-start.png','ep04-scene-04b-eniac.png','ep04-scene-04b-eniac-c-end.png'],[(960,540),(500,520),(1380,520),(960,710)]),
'06':('naming',['ep04-scene-06-naming.png','ep04-scene-06-naming-c-end.png'],[(960,540),(1180,360),(930,620),(1450,430)]),
'07':('ai-winter',['ep04-scene-07-ai-winter.png','ep04-scene-07-ai-winter-c-end.png'],[(960,540),(1190,520),(520,450)]),
'08':('karen',['ep04-scene-08-karen.png','ep04-scene-08-karen-b-mid.png','ep04-scene-08-karen-c-end.png'],[(960,540),(520,500),(1120,400),(620,690)]),
'09':('fei-fei',['ep04-scene-09-fei-fei-a-start.png','ep04-scene-09-fei-fei-b-mid.png','ep04-scene-09-fei-fei.png'],[(960,540),(1450,400),(580,420),(1050,700)]),
'10':('desk-v2',['ep04-scene-10-desk-v2.png','ep04-scene-10-desk-v2-c-end.png'],[(960,540),(540,440),(1210,405),(850,710)]),
'11':('checkers',['ep04-scene-11-checkers.png','ep04-scene-11-checkers-c-end.png'],[(960,540),(700,420),(1180,430),(430,430)]),
'12':('lights-up-v2',['ep04-scene-12-lights-up-v2.png','ep04-scene-12-lights-up-v2-b-mid.png','ep04-scene-12-lights-up-v2-c-end.png'],[(960,540),(500,430),(1420,430),(960,760)])}
def sm(x): x=max(0,min(1,x)); return x*x*(3-2*x)
def cover(f):
 if f.shape[:2]==(1080,1920): return f
 h,w=f.shape[:2]; s=max(1920/w,1080/h); f=cv2.resize(f,(round(w*s),round(h*s)),interpolation=cv2.INTER_LANCZOS4); h,w=f.shape[:2]; return f[(h-1080)//2:(h-1080)//2+1080,(w-1920)//2:(w-1920)//2+1920]
def cam(f,p,a,b,z):
 cw=int(1920/z)//2*2; ch=int(1080/z)//2*2; p=sm(p); cx=a[0]+(b[0]-a[0])*p; cy=a[1]+(b[1]-a[1])*p
 cx=max(cw/2,min(1920-cw/2,cx)); cy=max(ch/2,min(1080-ch/2,cy)); return cv2.resize(cv2.getRectSubPix(f,(cw,ch),(cx,cy)),SIZE,interpolation=cv2.INTER_LINEAR)
def build(scene,stem,names,centers,dur):
 out=R/f'ep04-scene-{scene}-{stem}-narration-sync-v2-review.mp4'; tmp=R/f'ep04-scene-{scene}-{stem}-narration-sync-v2-review-intermediate.mp4'
 ims=[cv2.imread(str(R/n)) for n in names]
 if any(x is None for x in ims): raise RuntimeError(scene); ims=[cover(x) for x in ims]
 ims=[cover(x) for x in ims]
 count=max(len(centers)*2,math.ceil(dur/9)); bounds=np.linspace(0,dur,count+1); w=cv2.VideoWriter(str(tmp),cv2.VideoWriter_fourcc(*'mp4v'),FPS,SIZE)
 for i in range(round(dur*FPS)):
  t=i/FPS; q=min(count-1,np.searchsorted(bounds,t,side='right')-1); state=min(len(ims)-1,int(q*len(ims)/count)); state=len(ims)-1 if q>=count-max(1,count//3) else state
  c=centers[q%len(centers)]; dx=35 if q%2==0 else -35; a=(c[0]-dx,c[1]); b=(c[0]+dx,c[1]); z=(1.03,1.30,1.42,1.18)[q%4]; f=ims[state].copy(); gain=1+.0035*math.sin(t*math.tau*.14+q); f[:]=np.clip(f.astype(np.float32)*gain,0,255).astype(np.uint8); w.write(cam(f,(t-bounds[q])/(bounds[q+1]-bounds[q]),a,b,z))
 w.release(); subprocess.run(['/usr/bin/avconvert','-s',str(tmp),'-p','Preset1920x1080','-o',str(out),'--replace'],check=True); print('DONE',scene,out.name,flush=True)
def main():
 d={x['scene']:x['duration'] for x in json.loads((R/'ep04-narration-scene-timings.json').read_text())['scenes']}
 for s,v in CFG.items(): build(s,*v,d[s])
if __name__=='__main__': main()
