from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageStat
import argparse, json, subprocess, textwrap

ROOT=Path(__file__).resolve().parents[2]
FF=Path.home()/'.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
FPS=30; X=.45

def font(size,bold=False):
 p='/System/Library/Fonts/Menlo.ttc'
 return ImageFont.truetype(p,size)

def pixelize_source(ep,i,source):
 """Create a non-destructive, moderately pixelated episode-video source.

 960x540 working pixels retain faces and signage while giving the same visible
 two-screen-pixel grid as the approved Episode 4 frames.  The restrained
 palette/dither avoids the muddy, over-pixelated failure the earlier cuts had.
 """
 out=Path(__file__).resolve().parent/'.pixelized'/f'ep{ep}-{i:02d}-{source.stem}.png'
 out.parent.mkdir(exist_ok=True)
 if out.exists() and out.stat().st_mtime >= source.stat().st_mtime: return out
 im=Image.open(source).convert('RGB')
 # Fill a 16:9 canvas before reducing so portrait/square sources never leave bars.
 sw,sh=im.size; scale=max(1920/sw,1080/sh)
 im=im.resize((round(sw*scale),round(sh*scale)),Image.Resampling.LANCZOS)
 left=(im.width-1920)//2; top=(im.height-1080)//2
 im=im.crop((left,top,left+1920,top+1080))
 im=ImageEnhance.Contrast(im).enhance(1.06)
 im=ImageEnhance.Color(im).enhance(1.04)
 small=im.resize((960,540),Image.Resampling.LANCZOS)
 small=small.quantize(colors=128,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG).convert('RGB')
 im=small.resize((1920,1080),Image.Resampling.NEAREST)
 # A very light scanline texture, confined to existing pixels.
 shade=Image.new('RGBA',im.size,(0,0,0,0)); sd=ImageDraw.Draw(shade)
 for y in range(3,1080,4): sd.line((0,y,1919,y),fill=(4,5,9,9),width=1)
 im=Image.alpha_composite(im.convert('RGBA'),shade).convert('RGB')
 im.save(out,optimize=True); return out

def cue_card(ep,i,c):
 d=Path(__file__).resolve().parent/'.cuecards'/f'ep{ep}-{i:02d}-pixel-v2.png'; d.parent.mkdir(exist_ok=True)
 im=Image.new('RGB',(1920,1080)); px=im.load()
 for y in range(1080):
  for x in range(1920):
   glow=max(0,1-(((x-960)/1100)**2+((y-520)/700)**2)); scan=-3 if y%4==0 else 0
   px[x,y]=(max(0,int(28+18*glow)+scan),max(0,int(18+10*glow)+scan),max(0,int(47+28*glow)+scan))
 dr=ImageDraw.Draw(im); dr.rectangle((110,90,1810,990),outline=(66,205,223),width=3)
 kind=c.get('type','quote'); kicker=c.get('chapter') or c.get('term') or ('THE NUMBER' if kind in {'stat','stats3'} else 'LAiDIES')
 dr.text((160,135),str(kicker).upper(),font=font(34,True),fill=(235,166,76))
 if kind=='stat':
  main=f"{c.get('big','')}{c.get('unit','')}"; sub=c.get('label','')
  dr.text((960,445),main,font=font(150,True),fill=(107,225,235),anchor='mm')
  lines=textwrap.wrap(sub,52)
 elif kind=='def':
  main=c.get('term',''); sub=c.get('line',''); dr.text((960,430),main,font=font(145,True),fill=(107,225,235),anchor='mm'); lines=textwrap.wrap(sub,55)
 else:
  main=c.get('text') or c.get('title') or c.get('label') or c.get('line') or ''
  lines=textwrap.wrap(main,48)
 y=430 if kind not in {'stat','def'} else 630
 if kind not in {'stat','def'}:
  for line in lines:
   dr.text((960,y),line,font=font(62,True),fill=(245,238,222),anchor='mm'); y+=88
 else:
  for line in lines:
   dr.text((960,y),line,font=font(48),fill=(245,238,222),anchor='mm'); y+=66
 attrib=c.get('attrib') or c.get('source') or ''
 if attrib: dr.text((960,890),attrib,font=font(30),fill=(190,176,198),anchor='mm')
 im.save(d); return d

def build(ep,end,cue_file=None):
 cue_path=Path(cue_file) if cue_file else ROOT/f'content/episodes/episode-{ep}-cues.json'
 data=json.loads(cue_path.read_text()); cues=data['cues']; audio=ROOT/data['audio'].split('?')[0].lstrip('/')
 # Some legacy cue sheets were stamped against an earlier, longer narration
 # export. Preserve their story order by proportionally retiming the cue marks
 # to the narration file that is actually being delivered.
 if cues and cues[-1]['t'] >= end:
  scale=(end-30.0)/cues[-1]['t']
  cues=[dict(c,t=c['t']*scale) for c in cues]
 src=[]
 for i,c in enumerate(cues):
  raw=ROOT/c['src'].split('?')[0].lstrip('/') if c.get('src') else cue_card(ep,i,c)
  src.append(pixelize_source(ep,i,raw))
 out=Path(__file__).resolve().parent/f'episode-{ep}-narration-motion-v3-pixel-ambient.mp4'
 cmd=[str(FF),'-y','-hide_banner','-loglevel','warning']
 for i,c in enumerate(cues):
  stop=cues[i+1]['t'] if i+1<len(cues) else end; dur=stop-c['t']+(X if i+1<len(cues) else 0)
  cmd += ['-loop','1','-framerate',str(FPS),'-t',f'{dur:.3f}','-i',str(src[i])]
 cmd += ['-i',str(audio)]; filters=[]
 for i,c in enumerate(cues):
  stop=cues[i+1]['t'] if i+1<len(cues) else end; dur=stop-c['t']+(X if i+1<len(cues) else 0); n=max(1,dur*FPS)
  base=f'[{i}:v]scale=2100:1182:force_original_aspect_ratio=increase,crop=2100:1182'
  mode=i%4
  if mode==0: mv=f"zoompan=z='1.01+0.05*on/{n:.3f}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
  elif mode==1: mv=f"zoompan=z='1.06':x='(iw-iw/zoom)*on/{n:.3f}':y='ih/2-(ih/zoom/2)'"
  elif mode==2: mv=f"zoompan=z='1.06':x='(iw-iw/zoom)*(1-on/{n:.3f})':y='ih/2-(ih/zoom/2)'"
  else: mv=f"zoompan=z='1.07-0.04*on/{n:.3f}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
  motion=f"{base},{mv}:d=1:s=1920x1080:fps={FPS},setsar=1,format=yuv420p"
  # Dark visual scenes get a highlight-only pulse: panel bulbs, windows and CRT
  # phosphors vary gently while characters and the camera plate remain stable.
  mean=sum(ImageStat.Stat(Image.open(src[i]).resize((1,1))).mean)/3
  if c.get('src') and mean < 105:
   filters.append(f"{motion},split=2[b{i}][h{i}]")
   filters.append(f"[h{i}]eq=brightness=0.025[hb{i}]")
   filters.append(f"[b{i}][hb{i}]blend=all_expr='if(gt(A,205),A+(B-A)*(0.35+0.35*sin(T*2.1)),A)'[v{i}]")
  else:
   filters.append(f"{motion}[v{i}]")
 prev='v0'
 for i in range(1,len(cues)):
  o=f'x{i}'; filters.append(f'[{prev}][v{i}]xfade=transition=fade:duration={X}:offset={cues[i]["t"]:.3f}[{o}]'); prev=o
 cmd += ['-filter_complex',';'.join(filters),'-map',f'[{prev}]','-map',f'{len(cues)}:a:0','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','-t',f'{end:.3f}',str(out)]
 subprocess.run(cmd,check=True); print(out)

if __name__=='__main__':
 ap=argparse.ArgumentParser(); ap.add_argument('episode'); ap.add_argument('end',type=float); ap.add_argument('--cue-file'); a=ap.parse_args(); build(a.episode,a.end,a.cue_file)
