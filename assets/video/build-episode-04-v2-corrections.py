from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import subprocess

ROOT = Path(__file__).resolve().parents[2]
VIDEO = ROOT / "assets/video"
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
FF = Path.home() / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
BASE = VIDEO / "episode-04-narration-motion-v1-locked-scenes-full.mp4"
OUT = VIDEO / "episode-04-narration-motion-v3-corrected-smooth-review.mp4"
TITLE = PIXEL / "ep04-title-master-anchor-v1-review.png"
NAVY = PIXEL / "ep04-scene-05-grace-navy-hold-v1-review.png"

CREAM = (255, 244, 219)
PLUM = (55, 20, 52)
PINK = (226, 94, 104)
TEAL = (87, 182, 192)
ROCKWELL = "/System/Library/Fonts/Supplemental/Rockwell.ttc"
AVENIR = "/System/Library/Fonts/Avenir Next Condensed.ttc"
SIGNPAINTER = "/System/Library/Fonts/Supplemental/SignPainter.ttc"


def layered(draw, xy, text, font):
    x, y = xy
    draw.text((x + 15, y + 17), text, font=font, fill=PINK, stroke_width=10, stroke_fill=PLUM)
    draw.text((x + 7, y + 8), text, font=font, fill=TEAL, stroke_width=8, stroke_fill=PLUM)
    draw.text((x, y), text, font=font, fill=CREAM, stroke_width=5, stroke_fill=PLUM)


def make_title():
    src = ROOT / "approved-assets/style-refs/pixel-art/laidies-video-master-anchor-v1.png"
    im = Image.open(src).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
    im = ImageEnhance.Brightness(im).enhance(0.70).convert("RGBA")
    shade = Image.new("RGBA", im.size, (20, 8, 24, 0))
    sd = ImageDraw.Draw(shade)
    sd.rectangle((0, 0, 1920, 1080), fill=(20, 8, 24, 45))
    sd.rounded_rectangle((54, 52, 770, 245), radius=22, fill=(10, 5, 18, 120))
    sd.rounded_rectangle((54, 720, 1260, 1015), radius=24, fill=(10, 5, 18, 155))
    im.alpha_composite(shade)
    dr = ImageDraw.Draw(im)
    logo_font = ImageFont.truetype(ROCKWELL, 86, index=2)
    layered(dr, (76, 70), "laidies.ai", logo_font)
    script = ImageFont.truetype(SIGNPAINTER, 36, index=1)
    dr.text((88, 178), "new episode every Wednesday", font=script, fill=CREAM,
            stroke_width=4, stroke_fill=PLUM)
    kicker = ImageFont.truetype(AVENIR, 38, index=9)
    dr.text((82, 752), "EPISODE FOUR", font=kicker, fill=PINK, stroke_width=3, stroke_fill=PLUM)
    title_font = ImageFont.truetype(ROCKWELL, 82, index=2)
    layered(dr, (74, 806), "The Founding Mothers", title_font)
    sub = ImageFont.truetype(SIGNPAINTER, 43, index=1)
    dr.text((86, 936), "The origin story was women all along", font=sub, fill=CREAM,
            stroke_width=4, stroke_fill=PLUM)
    im.convert("RGB").save(TITLE, optimize=True)


def extract_navy():
    subprocess.run([
        str(FF), "-y", "-hide_banner", "-loglevel", "error", "-ss", "552.0",
        "-i", str(BASE), "-frames:v", "1", str(NAVY)
    ], check=True)


def build():
    make_title()
    extract_navy()
    # Full-screen corrections only. The base master and its audio remain untouched
    # everywhere else, including the locked Grace moth sequence.
    overlays = [
        (0.0, 18.0, TITLE),
        (18.0, 65.0, ROOT / "approved-assets/style-refs/pixel-art/laidies-video-master-anchor-v1.png"),
        (65.0, 100.0, PIXEL / "ep04-scene-01-cold-open-v5-hands-paused-review.png"),
        (100.0, 140.0, PIXEL / "ep04-scene-01-cold-open-v5-window-realization-review.png"),
        (140.0, 170.0, ROOT / "approved-assets/style-refs/pixel-art/laidies-video-master-anchor-v1.png"),
        (170.0, 199.73, PIXEL / "ep04-scene-01-cold-open-v5-hands-paused-review.png"),
        (199.73, 223.0, PIXEL / "ep04-scene-02a-luminairy-entrance-v5-LUMINAiRY-review.png"),
        (223.0, 245.30, PIXEL / "ep04-scene-02a-luminairy-wide-v6-LUMINAiRY-review.png"),
        (437.30, 487.0, PIXEL / "ep04-scene-04b-eniac-v2-six-distinct-review.png"),
        (487.0, 540.55, PIXEL / "ep04-scene-04b-eniac-v2-side-angle-review.png"),
        (555.0, 560.0, NAVY),
        (843.80, 895.65, PIXEL / "ep04-scene-10-language-to-chatbox-v1-review.png"),
        (925.0, 975.0, PIXEL / "ep04-scene-11-joy-timnit-emily-v1-review.png"),
        (975.0, 1003.68, PIXEL / "ep04-scene-11b-kate-crawford-supply-chain-v1-review.png"),
        (1082.90, 1122.0, VIDEO / "episode-03-full-scene-replacements-v4/ep03-cocktail-party-bronze-aige-y2k-v2.png"),
        (1122.0, 1145.0, PIXEL / "ep04-scene-12-lights-up-v2.png"),
        (1145.0, 1164.0, ROOT / "assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/08-blend-and-snap-v3.png"),
        (1164.0, 1182.0, ROOT / "assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/14-sunnyvaile-high-v3.png"),
        (1182.0, 1200.0, ROOT / "assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/16-ksvl-community-raidio-v3.png"),
        (1200.0, 1222.40, ROOT / "assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/09-maikeover-on-maine-v3.png"),
    ]
    cmd = [str(FF), "-y", "-hide_banner", "-loglevel", "warning", "-i", str(BASE)]
    for start, end, image in overlays:
        cmd += ["-loop", "1", "-framerate", "30", "-t", f"{end-start:.3f}", "-i", str(image)]

    filters = ["[0:v]scale=1920:1080,setsar=1[base0]"]
    previous = "base0"
    for index, (start, end, image) in enumerate(overlays, start=1):
        duration = end - start
        fade = min(0.45, duration / 4)
        filters.append(
            f"[{index}:v]scale=3840:2160,"
            f"zoompan=z='min(zoom+0.000006,1.008)':"
            f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"d=1:s=1920x1080:fps=30,setsar=1,format=rgba,"
            f"fade=t=in:st=0:d={fade:.3f}:alpha=1,"
            f"fade=t=out:st={duration-fade:.3f}:d={fade:.3f}:alpha=1,"
            f"setpts=PTS+{start:.3f}/TB[ov{index}]"
        )
        output = f"base{index}"
        filters.append(f"[{previous}][ov{index}]overlay=eof_action=pass:shortest=0[{output}]")
        previous = output

    cmd += [
        "-filter_complex", ";".join(filters),
        "-map", f"[{previous}]", "-map", "0:a:0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
        "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart",
        "-t", "1222.40", str(OUT)
    ]
    subprocess.run(cmd, check=True)
    print(OUT)


if __name__ == "__main__":
    build()
