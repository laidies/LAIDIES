from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import subprocess

ROOT = Path(__file__).resolve().parents[2]
VIDEO = ROOT / "assets/video"
PIX = ROOT / "assets/episodes/ep-04/pixel"
COMIC = VIDEO / "comic-interstitials-v1"
FF = Path.home() / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
AUDIO = ROOT / "content/music/episode-04-narration.mp3"
OUT = VIDEO / "episode-04-narration-motion-v10-cue-locked-review.mp4"
BASE = VIDEO / ".ep04-v10-cue-locked-base.mp4"
GRACE = PIX / "ep04-scene-05-grace-narration-sync-v10-locked.mp4"
WORK = VIDEO / ".ep04-v4-clean"
WORK.mkdir(exist_ok=True)


def correct_luminairy_sign(path):
    im = Image.open(path).convert("RGB")
    # The generated plaque had two lowercase i's. Replace only the plaque with
    # deterministic typography: LUMINAiRY, with exactly one lowercase i.
    w, h = im.size
    box = (int(w*.345), int(h*.012), int(w*.825), int(h*.116))
    dr = ImageDraw.Draw(im)
    dr.rounded_rectangle(box, radius=max(4, h//160), fill=(24,45,59), outline=(180,119,44), width=max(3,h//220))
    fpath = "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf"
    size = max(24, int(h*.055))
    f = ImageFont.truetype(fpath, size)
    text = "LUMINAiRY"
    bb = dr.textbbox((0,0), text, font=f, stroke_width=1)
    x = (box[0]+box[2]-(bb[2]-bb[0]))/2
    y = (box[1]+box[3]-(bb[3]-bb[1]))/2-bb[1]
    dr.text((x,y), text, font=f, fill=(238,177,71), stroke_width=1, stroke_fill=(91,52,25))
    im.save(path, optimize=True)


def montage(name, files, columns=3):
    out = WORK / name
    canvas = Image.new("RGB", (1920,1080), (6,16,31))
    n = len(files); cellw = 1920//columns
    for i, raw in enumerate(files):
        im = Image.open(raw).convert("RGB")
        im.thumbnail((cellw-34, 1000), Image.Resampling.LANCZOS)
        x = i*cellw + (cellw-im.width)//2
        y = (1080-im.height)//2
        canvas.paste(im, (x,y))
    canvas.save(out, optimize=True)
    return out


def portrait_page(name, files):
    """Six approved blue portraits per 16:9 page; no rejected card artwork."""
    out = WORK / name
    canvas = Image.new("RGB", (1920,1080), (4,16,34))
    cellw, cellh = 1920//3, 1080//2
    for i, raw in enumerate(files):
        im = Image.open(raw).convert("RGB")
        im.thumbnail((cellw-28, cellh-28), Image.Resampling.LANCZOS)
        col, row = i%3, i//3
        x = col*cellw + (cellw-im.width)//2
        y = row*cellh + (cellh-im.height)//2
        canvas.paste(im, (x,y))
    canvas.save(out, optimize=True)
    return out


def dark_variant(raw, name):
    out = WORK / name
    im = Image.open(raw).convert("RGB")
    im = ImageEnhance.Brightness(im).enhance(.52)
    im = ImageEnhance.Color(im).enhance(.72)
    im.save(out, optimize=True)
    return out


def corrected_attention_frame(raw):
    """Clean the generated whiteboard label without altering the approved source."""
    out = WORK / "ep04-scene-10-attention-label-corrected-v1.png"
    im = Image.open(raw).convert("RGB")
    # Whiteboard coordinates in the 1672×941 source frame.
    # Clone nearby board texture first so the repair does not read as a CSS box.
    patch = im.crop((382, 174, 478, 206)).resize((96, 32), Image.Resampling.BICUBIC)
    im.paste(patch, (382, 207))
    dr = ImageDraw.Draw(im)
    f = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 17)
    dr.text((430, 224), "Attention", font=f, anchor="mm", fill=(58, 47, 49))
    im.save(out, optimize=True)
    return out


def fit(raw, idx):
    out = WORK / f"prepared-{idx:02d}-{raw.stem}.png"
    if out.exists() and out.stat().st_mtime >= raw.stat().st_mtime:
        return out
    im = Image.open(raw).convert("RGB")
    sw,sh=im.size
    if abs(sw/sh-16/9) < .04:
        im=im.resize((1920,1080),Image.Resampling.LANCZOS)
    else:
        bg=im.resize((1920,1080),Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(18))
        bg=ImageEnhance.Brightness(bg).enhance(.38)
        fg=im.copy(); fg.thumbnail((1840,1030),Image.Resampling.LANCZOS)
        bg.paste(fg,((1920-fg.width)//2,(1080-fg.height)//2)); im=bg
    im=ImageEnhance.Contrast(im).enhance(1.02)
    im.save(out,optimize=True); return out


def build():
    # Only the approved full blue stained-glass set is permitted here.
    mav = ROOT / "assets/mavens/y2k-stained-glass-v2"
    all_mavens = sorted(mav.glob("*-y2k-stained-glass.png"))
    portrait_pages = [portrait_page(f"maivens-blue-all-v1-page-{i//6+1}.png", all_mavens[i:i+6])
                      for i in range(0, len(all_mavens), 6)]
    correct_hall = PIX/"ep04-scene-02-luminairy-v2-c-end.png"
    hall_dark = dark_variant(correct_hall, "ep04-correct-hall-lights-off-v1.png")
    language_frame = corrected_attention_frame(PIX/"ep04-scene-10-language-to-chatbox-v1-review.png")

    A=ROOT/"approved-assets/style-refs/pixel-art/laidies-video-master-anchor-v1.png"
    B=ROOT/"assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel"
    EP3=ROOT/"assets/episodes/ep-03/pixel"
    EP3R=VIDEO/"episode-03-full-scene-replacements-v4"
    cues=[
      # The announcer's “Previously” recap uses Episode 3 imagery, in story order.
      (0.00, EP3/"ep03-scene-01-cold-open.png",True),
      (10.00,EP3R/"ep03-bethany-one-clue-big-claim-v1.png",True),
      (20.00,EP3R/"ep03-elle-perm-timeline-v2-blue-eyes.png",True),
      (30.00,EP3R/"ep03-three-moves-source-gap-line-v1.png",True),
      (36.00,PIX/"ep04-title-master-anchor-v1-review.png",False),
      (41.10,PIX/"ep04-scene-01-cold-open-v5-hands-paused-review.png",True),
      (72.00,PIX/"ep04-scene-01-cold-open-v5-window-realization-review.png",True),
      (86.00,COMIC/"ep04-wonder-question-1-v3.png",False),
      (99.00,COMIC/"ep04-wonder-question-2-v3.png",False),
      (110.00,VIDEO/"episode-01-full-scene-replacements-v2/ep01-ai-new-hire-onboarding-v1.png",True),
      (119.00,ROOT/"assets/episodes/issue-02/ep02-the-brief.png",True),
      (132.00,EP3/"ep03-scene-08-elle-file.png",True),
      # Current-week setup: no returns to Episode 3 recap or unrelated office frames.
      (140.45,COMIC/"ep04-just-use-ai-v2.png",False),
      (150.45,COMIC/"ep04-which-ai-v1.png",False),
      (167.45,COMIC/"ep04-just-use-internet-v2.png",False),
      # Corporate-to-Sunnyvaile transformation begins exactly at 03:25.
      (204.45,PIX/"ep04-transform-corporate-wand-v3-signless-review.png",False),
      (209.45,PIX/"ep04-transform-sunnyvaile-wand-v3-signless-review.png",False),
      # Cut the misspelled exterior entirely: transformation goes straight inside.
      (214.45,PIX/"ep04-scene-02b-luminairy-nave-pixel-v1.png",True),
      (233.00,PIX/"ep04-scene-02b-luminairy-nave-maivens-open-v1.png",True),
      (240.00,correct_hall,True),
      (245.30,PIX/"ep04-scene-03-ada-v2-repaired-base-review.png",True),
      (278.00,PIX/"ep04-scene-03-ada-b-mid.png",True),
      (310.00,PIX/"ep04-scene-03-ada-c-end.png",True),
      (341.55,PIX/"ep04-scene-04-hedy.png",True),
      (374.00,PIX/"ep04-scene-04-hedy-b-mid-v2-review.png",True),
      (406.00,PIX/"ep04-scene-04-hedy-c-end-v2-review.png",True),
      (437.30,PIX/"ep04-scene-04b-eniac-v4-actual-six-review.png",True),
      (470.00,PIX/"ep04-scene-04b-eniac-v5-actual-six-mid-review.png",True),
      (505.00,PIX/"ep04-scene-04b-eniac-v5-actual-six-end-review.png",True),
      (540.55,PIX/"ep04-scene-05a-grace-navy-office-v2-a-start.png",True),
      (550.50,PIX/"ep04-scene-05a-grace-navy-office-v3-application-handoff.png",True),
      (560.50,PIX/"ep04-scene-05a-grace-navy-office-v3-application-review.png",True),
      (571.00,PIX/"ep04-scene-05-grace-a-start.png",True),
      (625.62,PIX/"ep04-scene-05-grace-c-end.png",False),
      (631.00,PIX/"ep04-scene-06-naming.png",True),
      (646.00,PIX/"ep04-scene-06-naming-c-end.png",True),
      (661.43,PIX/"ep04-scene-07-ai-winter.png",True),
      (676.70,PIX/"ep04-scene-08-karen.png",True),
      (706.00,PIX/"ep04-scene-08-karen-b-mid.png",True),
      (735.00,PIX/"ep04-scene-08-karen-c-end.png",True),
      (764.98,PIX/"ep04-scene-09-fei-fei-a-start.png",True),
      (791.00,PIX/"ep04-scene-09-fei-fei-b-mid.png",True),
      (818.00,PIX/"ep04-scene-09-fei-fei.png",True),
      (843.80,language_frame,True),
      (858.45,COMIC/"ep04-chatgpt-public-v2.png",False),
      (895.65,PIX/"ep04-scene-11-checkers-v2-emily-correct-review.png",True),
      (929.00,PIX/"ep04-scene-11-checkers-v2-emily-correct-review.png",True),
      (975.45,PIX/"ep04-scene-11b-kate-crawford-supply-chain-v1-review.png",True),
      (1003.68,hall_dark,False),
      (1012.00,correct_hall,True),
      (1060.00,VIDEO/"episode-03-full-scene-replacements-v4/ep03-cocktail-party-bronze-aige-y2k-v3-inclusive-bg.png",True),
      (1095.45,COMIC/"ep04-laidies-ai-build-01.png",False),
      (1097.00,COMIC/"ep04-laidies-ai-build-02.png",False),
      (1098.00,COMIC/"ep04-laidies-ai-build-03.png",False),
      (1099.00,COMIC/"ep04-laidies-ai-build-04.png",False),
      (1100.00,COMIC/"ep04-laidies-ai-build-05.png",False),
      (1101.00,COMIC/"ep04-laidies-ai-build-06.png",False),
      (1102.00,COMIC/"ep04-laidies-ai-build-07.png",False),
      (1103.00,COMIC/"ep04-laidies-ai-build-08.png",False),
      (1104.00,COMIC/"ep04-laidies-ai-build-09.png",False),
      (1105.00,COMIC/"ep04-laidies-ai-build-10.png",False),
      (1106.00,portrait_pages[0],True),
      (1117.00,portrait_pages[1],True),
      (1128.00,portrait_pages[2],True),
      (1139.00,portrait_pages[3],True),
      (1149.00,B/"08-blend-and-snap-v3.png",True),
      (1152.00,B/"14-sunnyvaile-high-v3.png",True),
      (1157.00,B/"16-ksvl-community-raidio-v3.png",True),
      (1166.00,B/"09-maikeover-on-maine-v3.png",True),
      (1174.45,COMIC/"ep04-so-remember-v3.png",False),
      (1196.45,COMIC/"ep04-next-time.png",False),
    ]
    end=1222.40; X=.55; FPS=30
    src=[fit(Path(p),i) for i,(_,p,_) in enumerate(cues)]
    cmd=[str(FF),'-y','-hide_banner','-loglevel','warning']
    for i,(t,p,m) in enumerate(cues):
        stop=cues[i+1][0] if i+1<len(cues) else end
        cmd += ['-loop','1','-framerate',str(FPS),'-t',f'{stop-t+(X if i+1<len(cues) else 0):.3f}','-i',str(src[i])]
    cmd += ['-i',str(AUDIO)]
    filters=[]
    for i,(t,p,motion) in enumerate(cues):
        if motion:
            q=(f'[{i}:v]scale=3840:2160,zoompan=z=\'min(zoom+0.000004,1.006)\':'
               f'x=\'iw/2-(iw/zoom/2)\':y=\'ih/2-(ih/zoom/2)\':d=1:s=1920x1080:fps={FPS},setsar=1,format=yuv420p')
        else:q=f'[{i}:v]scale=1920:1080,setsar=1,format=yuv420p'
        filters.append(f'{q}[v{i}]')
    prev='v0'
    for i in range(1,len(cues)):
        # Never dissolve one editorial text layer over another. A brief fade through
        # black keeps every comic card fully legible and prevents double-text ghosts.
        outgoing = Path(cues[i-1][1]).parent == COMIC
        incoming = Path(cues[i][1]).parent == COMIC
        prev_name = Path(cues[i-1][1]).name
        next_name = Path(cues[i][1]).name
        logo_build = prev_name.startswith('ep04-laidies-ai-build-') and next_name.startswith('ep04-laidies-ai-build-')
        # The LAiDIES.AI build must keep its entire background fixed. Only the new
        # cumulative letter changes, with a near-instant clean dissolve.
        transition = 'fade' if logo_build else ('fadeblack' if (outgoing or incoming) else 'fade')
        duration = .04 if logo_build else X
        out=f'x{i}';filters.append(f'[{prev}][v{i}]xfade=transition={transition}:duration={duration}:offset={cues[i][0]:.3f}[{out}]');prev=out
    cmd += ['-filter_complex',';'.join(filters),'-map',f'[{prev}]','-map',f'{len(cues)}:a:0','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-t',f'{end:.3f}',str(BASE)]
    subprocess.run(cmd,check=True)

    # Replace 9:31–10:25.62 with the already approved Grace motion portion.
    # Local 32.45 aligns the approved moth flight to exactly 10:13.
    dur=54.62
    cmd=[str(FF),'-y','-hide_banner','-loglevel','warning','-i',str(BASE),'-ss','32.45','-t',f'{dur:.3f}','-i',str(GRACE),
         '-filter_complex',f'[1:v]scale=1920:1080,setsar=1,setpts=PTS+571/TB[g];[0:v][g]overlay=enable=\'between(t,571,625.62)\':eof_action=pass[v]',
         '-map','[v]','-map','0:a:0','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart','-t',f'{end:.3f}',str(OUT)]
    subprocess.run(cmd,check=True)
    print(OUT)


if __name__ == '__main__': build()
