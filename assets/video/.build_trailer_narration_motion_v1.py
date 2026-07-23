from pathlib import Path
import json, subprocess
from PIL import Image, ImageDraw, ImageEnhance, ImageStat

ROOT=Path(__file__).resolve().parents[2]
CUES=json.loads((ROOT/'content/episodes/episode-trailer-cues.json').read_text())['cues']
AUDIO=ROOT/'content/music/trailer-narration.mp3'
OUT=Path(__file__).resolve().parent/'trailer-narration-motion-v3-pixel-ambient.mp4'
FF=Path.home()/'.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1'
FPS=30; END=967.16; X=.45

def source(i,c):
 raw=ROOT/c['src'].split('?')[0].lstrip('/')
 out=Path(__file__).resolve().parent/'.pixelized'/f'trailer-{i:02d}-{raw.stem}.png'; out.parent.mkdir(exist_ok=True)
 if out.exists() and out.stat().st_mtime >= raw.stat().st_mtime: return out
 im=Image.open(raw).convert('RGB'); sw,sh=im.size; scale=max(1920/sw,1080/sh)
 im=im.resize((round(sw*scale),round(sh*scale)),Image.Resampling.LANCZOS)
 left=(im.width-1920)//2; top=(im.height-1080)//2; im=im.crop((left,top,left+1920,top+1080))
 im=ImageEnhance.Contrast(im).enhance(1.06); im=ImageEnhance.Color(im).enhance(1.04)
 im=im.resize((960,540),Image.Resampling.LANCZOS).quantize(colors=128,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG).convert('RGB').resize((1920,1080),Image.Resampling.NEAREST)
 shade=Image.new('RGBA',im.size,(0,0,0,0)); sd=ImageDraw.Draw(shade)
 for y in range(3,1080,4): sd.line((0,y,1919,y),fill=(4,5,9,9),width=1)
 im=Image.alpha_composite(im.convert('RGBA'),shade).convert('RGB'); im.save(out,optimize=True); return out

cmd=[str(FF),'-y','-hide_banner','-loglevel','warning']
for i,c in enumerate(CUES):
 end=CUES[i+1]['t'] if i+1<len(CUES) else END
 dur=end-c['t']+(X if i+1<len(CUES) else 0)
 cmd += ['-loop','1','-framerate',str(FPS),'-t',f'{dur:.3f}','-i',str(source(i,c))]
cmd += ['-i',str(AUDIO)]

filters=[]; SOURCES=[source(i,c) for i,c in enumerate(CUES)]
for i,c in enumerate(CUES):
 end=CUES[i+1]['t'] if i+1<len(CUES) else END
 dur=end-c['t']+(X if i+1<len(CUES) else 0); n=max(1,dur*FPS)
 base=f'[{i}:v]scale=2100:1182:force_original_aspect_ratio=increase,crop=2100:1182'
 if i%4==0:
  move=f"zoompan=z='1.01+0.055*on/{n:.3f}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
 elif i%4==1:
  move=f"zoompan=z='1.065':x='(iw-iw/zoom)*on/{n:.3f}':y='ih/2-(ih/zoom/2)'"
 elif i%4==2:
  move=f"zoompan=z='1.065':x='(iw-iw/zoom)*(1-on/{n:.3f})':y='ih/2-(ih/zoom/2)'"
 else:
  move=f"zoompan=z='1.075-0.045*on/{n:.3f}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
 motion=f"{base},{move}:d=1:s=1920x1080:fps={FPS},setsar=1,format=yuv420p"
 mean=sum(ImageStat.Stat(Image.open(SOURCES[i]).resize((1,1))).mean)/3
 if mean < 105:
  filters.append(f"{motion},split=2[b{i}][h{i}]")
  filters.append(f"[h{i}]eq=brightness=0.025[hb{i}]")
  filters.append(f"[b{i}][hb{i}]blend=all_expr='if(gt(A,205),A+(B-A)*(0.35+0.35*sin(T*2.1)),A)'[v{i}]")
 else:
  filters.append(f"{motion}[v{i}]")

prev='v0'
for i in range(1,len(CUES)):
 out=f'x{i}'; filters.append(f'[{prev}][v{i}]xfade=transition=fade:duration={X}:offset={CUES[i]["t"]:.3f}[{out}]'); prev=out

cmd += ['-filter_complex',';'.join(filters),'-map',f'[{prev}]','-map',f'{len(CUES)}:a:0','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','-t',f'{END:.3f}',str(OUT)]
subprocess.run(cmd,check=True)
print(OUT)
