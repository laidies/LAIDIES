from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter, ImageStat
import argparse, json, subprocess, textwrap

ROOT=Path(__file__).resolve().parents[2]
FF=Path.home()/'.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
FPS=30; X=.55
PLUM=(55,20,52); PINK=(233,130,171); TEAL=(87,182,192); CREAM=(255,244,219)
BACKDROP=ROOT/'assets/video/delivery-20260714-opening-v6/shots/opening-01-establishing.png'
AVENIR='/System/Library/Fonts/Avenir Next Condensed.ttc'
SIGNPAINTER='/System/Library/Fonts/Supplemental/SignPainter.ttc'
ROCKWELL='/System/Library/Fonts/Supplemental/Rockwell.ttc'

def font(size,bold=False,script=False):
 path=SIGNPAINTER if script else AVENIR; index=1 if script else 9 if bold else 3
 return ImageFont.truetype(path,size,index=index)

def fit_full(raw):
 im=Image.open(raw).convert('RGB'); sw,sh=im.size
 if abs(sw/sh-16/9)<.035: return im.resize((1920,1080),Image.Resampling.LANCZOS)
 bg=Image.open(BACKDROP).convert('RGB').resize((1920,1080),Image.Resampling.LANCZOS)
 bg=ImageEnhance.Brightness(bg).enhance(.28).filter(ImageFilter.GaussianBlur(4))
 fg=im.copy(); fg.thumbnail((1760,980),Image.Resampling.LANCZOS); x=(1920-fg.width)//2; y=(1080-fg.height)//2
 out=bg.convert('RGBA'); plate=Image.new('RGBA',(fg.width+14,fg.height+14),PLUM+(235,)); plate.alpha_composite(fg.convert('RGBA'),(7,7)); out.alpha_composite(plate,(x-7,y-7)); return out.convert('RGB')

def layered(draw,xy,text,f):
 x,y=xy; draw.text((x+15,y+17),text,font=f,fill=(226,94,104),stroke_width=10,stroke_fill=PLUM); draw.text((x+7,y+8),text,font=f,fill=TEAL,stroke_width=8,stroke_fill=PLUM); draw.text((x,y),text,font=f,fill=CREAM,stroke_width=5,stroke_fill=PLUM)

def rockwell(size): return ImageFont.truetype(ROCKWELL,size,index=2)

def logo_overlay(im,width=390):
 panel=Image.new('RGBA',(760,225),(0,0,0,0)); draw=ImageDraw.Draw(panel); layered(draw,(24,22),'laidies.ai',rockwell(86)); draw.text((36,145),'new episode every Wednesday',font=font(37,script=True),fill=CREAM,stroke_width=4,stroke_fill=PLUM)
 panel.thumbnail((width,210),Image.Resampling.LANCZOS); out=im.convert('RGBA'); out.alpha_composite(panel,(48,40)); return out.convert('RGB')

def intro_card(ep,i,c):
 out=Path(__file__).resolve().parent/'.cuecards-v8-clean'/f'ep{ep}-{i:02d}-closing-style-v8.png'; out.parent.mkdir(exist_ok=True)
 # Text cards need a quiet field. Putting typography over the detailed town
 # panorama created the “text over text” failure in the Episode 3 opening.
 im=Image.new('RGBA',(1920,1080),PLUM+(255,)); dr=ImageDraw.Draw(im)
 dr.rounded_rectangle((36,36,1884,1044),radius=28,outline=TEAL,width=4)
 dr.rounded_rectangle((50,50,1870,1030),radius=24,outline=PINK,width=2)
 im=logo_overlay(im.convert('RGB'),300).convert('RGBA'); dr=ImageDraw.Draw(im)
 kind=c.get('type','quote'); kicker=c.get('chapter') or c.get('term') or ('THE NUMBER' if kind in {'stat','stats3'} else 'FROM THE EPISODE')
 main=f"{c.get('big','')}{c.get('unit','')}" if kind=='stat' else c.get('term') if kind=='def' else c.get('text') or c.get('title') or c.get('label') or c.get('line') or ''
 sub=c.get('label','') if kind=='stat' else c.get('line','') if kind=='def' else c.get('sub','')
 dr.text((92,560),str(kicker).upper(),font=font(34),fill=PINK,stroke_width=2,stroke_fill=PLUM)
 lines=textwrap.wrap(str(main),34); size=82 if len(lines)<=2 else 64; y=610
 for line in lines[:3]: layered(dr,(82,y),line,rockwell(size)); y+=size+25
 if sub: dr.text((98,min(965,y+3)),str(sub),font=font(42,script=True),fill=CREAM,stroke_width=4,stroke_fill=PLUM)
 attrib=c.get('attrib') or c.get('source') or ''
 if attrib: dr.text((98,1012),attrib,font=font(24),fill=CREAM,stroke_width=2,stroke_fill=PLUM)
 im.convert('RGB').save(out,optimize=True); return out

def prepared(ep,i,raw):
 out=Path(__file__).resolve().parent/'.safe-v8-native'/f'ep{ep}-{i:02d}-{raw.stem}.png'; out.parent.mkdir(exist_ok=True)
 if out.exists() and out.stat().st_mtime>=raw.stat().st_mtime: return out
 im=fit_full(raw); im=ImageEnhance.Contrast(im).enhance(1.025); im=ImageEnhance.Color(im).enhance(1.02)
 # Preserve the detail in the already-finished pixel artwork. The prior 960px
 # re-quantization pass made faces, text and small props look unintentionally poor.
 im=logo_overlay(im)
 im.save(out,optimize=True); return out

def build(ep,end,cue_file=None,preview_cues=None,output=None):
 cue_path=Path(cue_file) if cue_file else ROOT/f'content/episodes/episode-{ep}-cues.json'; data=json.loads(cue_path.read_text()); cues=data['cues']; audio=ROOT/data['audio'].split('?')[0].lstrip('/')
 if cues and cues[-1]['t']>=end:
  scale=(end-30)/cues[-1]['t']; cues=[dict(c,t=c['t']*scale) for c in cues]
 if preview_cues:
  start,count=preview_cues; chosen=cues[start:start+count]; base=chosen[0]['t']; cues=[dict(c,t=c['t']-base) for c in chosen]; end=(cues[-1]['t']+20 if len(cues)>1 else 20); audio_offset=base
 else: audio_offset=0
 src=[]
 for i,c in enumerate(cues):
  raw=ROOT/c['src'].split('?')[0].lstrip('/') if c.get('src') else intro_card(ep,i,c); src.append(prepared(ep,i,raw))
 suffix='preview' if preview_cues else 'full'
 out=Path(output) if output else Path(__file__).resolve().parent/f'episode-{ep}-narration-motion-v12-opening-rebuild-{suffix}.mp4'
 cmd=[str(FF),'-y','-hide_banner','-loglevel','warning']
 for i,c in enumerate(cues):
  stop=cues[i+1]['t'] if i+1<len(cues) else end; dur=stop-c['t']+(X if i+1<len(cues) else 0); cmd+=['-loop','1','-framerate',str(FPS),'-t',f'{dur:.3f}','-i',str(src[i])]
 cmd+=['-ss',f'{audio_offset:.3f}','-i',str(audio)]; filters=[]
 for i,c in enumerate(cues):
  stop=cues[i+1]['t'] if i+1<len(cues) else end; dur=max(.1,stop-c['t'])
  if c.get('src') and c.get('motion', True):
   # A restrained, centered optical push. Rendering from a 2x working image
   # keeps the move sub-pixel smooth and prevents the one-pixel stepping/shake
   # seen in the earlier pan experiments. The crop never wanders off-subject.
   motion=(f'[{i}:v]scale=3840:2160,'
           f"zoompan=z='min(zoom+0.000006,1.008)':"
           f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
           f'd=1:s=1920x1080:fps={FPS},setsar=1,format=yuv420p')
  else:
   motion=f'[{i}:v]scale=1920:1080,setsar=1,format=yuv420p'
  mean=sum(ImageStat.Stat(Image.open(src[i]).resize((1,1))).mean)/3
  if c.get('src') and mean<105:
   filters += [f'{motion},split=2[b{i}][h{i}]',f'[h{i}]eq=brightness=0.018[hb{i}]',f"[b{i}][hb{i}]blend=all_expr='if(gt(A,210),A+(B-A)*(0.30+0.30*sin(T*1.7)),A)'[v{i}]"]
  else: filters.append(f'{motion}[v{i}]')
 prev='v0'
 for i in range(1,len(cues)):
  o=f'x{i}'; filters.append(f'[{prev}][v{i}]xfade=transition=fade:duration={X}:offset={cues[i]["t"]:.3f}[{o}]'); prev=o
 cmd+=['-filter_complex',';'.join(filters),'-map',f'[{prev}]','-map',f'{len(cues)}:a:0','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-t',f'{end:.3f}',str(out)]
 subprocess.run(cmd,check=True); print(out)

if __name__=='__main__':
 ap=argparse.ArgumentParser(); ap.add_argument('episode'); ap.add_argument('end',type=float); ap.add_argument('--cue-file'); ap.add_argument('--preview',nargs=2,type=int,metavar=('START','COUNT')); ap.add_argument('--output'); a=ap.parse_args(); build(a.episode,a.end,a.cue_file,a.preview,a.output)
