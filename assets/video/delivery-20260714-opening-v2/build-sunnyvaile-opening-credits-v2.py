#!/usr/bin/env python3
"""Build the 71-second SUNNYVAiLE TV opening in a moving-postcard style.

The sequence alternates the approved cast-in-world scenes with existing town
postcards. The heroine comes from the Episode 4 art. Motion is limited to slow
camera drift and dissolves; there is no generated character animation.
"""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "assets"
POSTCARDS = ASSETS / "postcards" / "from-sunnyvaile"
PLATES = ASSETS / "video" / "sunnyvaile-credits-v1-plates"
EP4 = ASSETS / "episodes" / "ep-04" / "pixel"
VIDEO = ASSETS / "video"
DELIVERY = VIDEO / "delivery-20260714-opening-v2"

MUSIC = ROOT / "content" / "music" / "sunnyvaile-town-anthem.mp3"
REVEAL = VIDEO / "sunnyvaile-logo-reveal.mp4"
BODY_OUT = DELIVERY / "sunnyvaile-opening-credits-v2-body.mp4"
FINAL_OUT = DELIVERY / "sunnyvaile-opening-credits-v1.mp4"

W, H, FPS = 1920, 1080, 30
BODY_DURATION = 63.0
TOTAL_DURATION = 71.0
XFADE = 0.46

DEEP_PLUM = (28, 11, 32)
PLUM = (75, 33, 72)
PINK = (217, 92, 145)
TEAL = (58, 154, 166)
GOLD = (183, 142, 30)
CREAM = (255, 248, 231)
INK = (63, 31, 58)

GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FUTURA = "/System/Library/Fonts/Supplemental/Futura.ttc"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size=size)
    except OSError:
        return ImageFont.truetype(ARIAL_BOLD, size=size)


def clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, value))


def smooth(value: float) -> float:
    value = clamp(value)
    return value * value * (3.0 - 2.0 * value)


def cover(image: Image.Image, width: int, height: int, zoom: float,
          pan_x: float, pan_y: float) -> Image.Image:
    image = image.convert("RGB")
    scale = max(width / image.width, height / image.height) * zoom
    size = (max(width, round(image.width * scale)), max(height, round(image.height * scale)))
    resized = image.resize(size, Image.Resampling.LANCZOS)
    left = round(clamp(pan_x) * (resized.width - width))
    top = round(clamp(pan_y) * (resized.height - height))
    return resized.crop((left, top, left + width, top + height))


def blurred_background(image: Image.Image, local: float, drift: int) -> Image.Image:
    p = smooth(local)
    pan_x = clamp(0.5 + drift * (p - 0.5) * 0.11)
    bg = cover(image, W, H, 1.10 + 0.025 * p, pan_x, 0.5)
    bg = bg.filter(ImageFilter.GaussianBlur(28))
    bg = ImageEnhance.Brightness(bg).enhance(0.44)
    return ImageEnhance.Color(bg).enhance(0.80)


def drop_shadow(width: int, height: int) -> Image.Image:
    shadow = Image.new("RGBA", (width + 110, height + 110), (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)
    draw.rounded_rectangle(
        (40, 40, width + 70, height + 70), radius=22, fill=(8, 3, 12, 165)
    )
    return shadow.filter(ImageFilter.GaussianBlur(25))


def postcard_image_frame(image: Image.Image, local: float, drift: int) -> Image.Image:
    """Show an existing designed postcard in full, without cropping its lettering."""
    bg = blurred_background(image, local, drift).convert("RGBA")
    p = smooth(local)
    max_w, max_h = 1740, 980
    scale = min(max_w / image.width, max_h / image.height) * (1.0 + 0.010 * p)
    card = image.convert("RGB").resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )
    card = ImageEnhance.Sharpness(card).enhance(1.05)
    card_w, card_h = card.size
    x = (W - card_w) // 2 + round(drift * 8 * (p - 0.5))
    y = (H - card_h) // 2
    bg.alpha_composite(drop_shadow(card_w + 14, card_h + 14), (x - 62, y - 62))
    paper = Image.new("RGBA", (card_w + 14, card_h + 14), CREAM + (255,))
    paper.alpha_composite(card.convert("RGBA"), (7, 7))
    bg.alpha_composite(paper, (x - 7, y - 7))
    return bg.convert("RGB")


def cast_postcard_frame(
    image: Image.Image,
    local: float,
    drift: int,
    name: str,
    job: str,
) -> Image.Image:
    """Put a cast scene and its credit on one physical-postcard composition."""
    bg = blurred_background(image, local, drift).convert("RGBA")
    p = smooth(local)
    paper_w, paper_h = 1740, 980
    image_w, image_h = 1688, 790
    zoom = 1.0 + 0.025 * p
    pan_x = clamp(0.5 + drift * (p - 0.5) * 0.09)
    scene = cover(image, image_w, image_h, zoom, pan_x, 0.48)
    scene = ImageEnhance.Sharpness(scene).enhance(1.04)

    paper = Image.new("RGBA", (paper_w, paper_h), CREAM + (255,))
    paper.alpha_composite(scene.convert("RGBA"), (26, 26))
    draw = ImageDraw.Draw(paper)

    # A printed credit in the postcard margin: never on the character's face.
    name_font = font(GEORGIA_BOLD, 61)
    job_font = font(FUTURA, 28)
    draw.text((60, 839), name, font=name_font, fill=INK + (255,))
    draw.line((62, 924, 545, 924), fill=GOLD + (255,), width=3)
    draw.ellipse((58, 920, 67, 929), fill=TEAL + (255,))
    draw.text((60, 938), job, font=job_font, fill=PINK + (255,))

    # Small decorative postal lines balance the name without looking like a UI panel.
    for i in range(3):
        y = 858 + i * 32
        draw.line((1230, y, 1655, y), fill=PLUM + (95,), width=2)
    draw.rounded_rectangle((1510, 835, 1655, 945), radius=10, outline=TEAL + (150,), width=3)
    draw.text((1530, 860), "SV", font=font(GEORGIA_BOLD, 42), fill=PLUM + (170,))

    angle = 0.28 * drift * math.sin(local * math.pi)
    paper = paper.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True, fillcolor=(0, 0, 0, 0))
    x = (W - paper.width) // 2 + round(drift * 8 * (p - 0.5))
    y = (H - paper.height) // 2
    bg.alpha_composite(drop_shadow(paper.width, paper.height), (x - 55, y - 55))
    bg.alpha_composite(paper, (x, y))
    return bg.convert("RGB")


# start, end, key, type, drift, optional name/job
SCENES = [
    (0.0, 5.0, "welcome", "postcard", 1, None),
    (5.0, 10.0, "heroine", "cast", -1,
     ("Your Heroine", "a few steps ahead of you")),
    (10.0, 13.0, "main_street", "postcard", 1, None),
    (13.0, 17.5, "mme", "cast", -1,
     ("Mme CLAi-O", "the read, the message, the move")),
    (17.5, 20.5, "mme_postcard", "postcard", 1, None),
    (20.5, 25.0, "dj", "cast", -1,
     ("DJ SunnyV", "KSVL 99.9, on the air")),
    (25.0, 28.0, "ksvl_postcard", "postcard", 1, None),
    (28.0, 32.5, "mayor", "cast", -1,
     ("Mayor Deb", "Mayor of SUNNYVAiLE")),
    (32.5, 35.5, "park", "postcard", 1, None),
    (35.5, 40.0, "fairy", "cast", -1,
     ("The FAiRY Godmother", "the town’s own AI")),
    (40.0, 43.0, "fairy_postcard", "postcard", 1, None),
    (43.0, 47.5, "barista", "cast", -1,
     ("The Barista", "at the Blend & Snap")),
    (47.5, 50.5, "blend_postcard", "postcard", 1, None),
    (50.5, 53.5, "library", "postcard", -1, None),
    (53.5, 56.5, "chick_flicks", "postcard", 1, None),
    (56.5, 60.0, "dialup", "postcard", -1, None),
    (60.0, 63.0, "greetings", "postcard", 1, None),
]


def scene_frame(scene: tuple, t: float, images: dict[str, Image.Image]) -> Image.Image:
    start, end, key, kind, drift, credit = scene
    local = clamp((t - start) / (end - start))
    if kind == "cast":
        assert credit is not None
        return cast_postcard_frame(images[key], local, drift, *credit)
    return postcard_image_frame(images[key], local, drift)


def make_frame(t: float, images: dict[str, Image.Image]) -> Image.Image:
    index = next(i for i, scene in enumerate(SCENES) if scene[0] <= t < scene[1])
    scene = SCENES[index]
    frame = scene_frame(scene, t, images)
    if index + 1 < len(SCENES) and t >= scene[1] - XFADE:
        nxt = scene_frame(SCENES[index + 1], t, images)
        frame = Image.blend(frame, nxt, smooth((t - (scene[1] - XFADE)) / XFADE))
    if t < 0.7:
        frame = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), frame, smooth(t / 0.7))
    return frame


def ffmpeg_path() -> str:
    python = "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"
    result = subprocess.run(
        [python, "-c", "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"],
        check=True, capture_output=True, text=True,
    )
    return result.stdout.strip()


def encode_body(images: dict[str, Image.Image]) -> None:
    ffmpeg = ffmpeg_path()
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "-", "-an", "-vf", "format=yuv420p",
        "-c:v", "libx264", "-preset", "medium", "-crf", "17",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(BODY_OUT),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for index in range(round(BODY_DURATION * FPS)):
            process.stdin.write(make_frame(index / FPS, images).tobytes())
    finally:
        process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("ffmpeg failed while encoding the 63-second postcard body")


def assemble_final() -> None:
    ffmpeg = ffmpeg_path()
    # The existing official reveal is placed inside the same cream postcard frame.
    filters = (
        f"[0:v]fps={FPS},scale={W}:{H}:flags=lanczos,setsar=1,"
        f"trim=duration={BODY_DURATION},setpts=PTS-STARTPTS[v0];"
        f"[1:v]fps={FPS},scale={W}:{H}:flags=lanczos,split=2[rb][rf];"
        "[rb]boxblur=24:2,eq=brightness=-0.45:saturation=0.8[revealbg];"
        "color=c=0xfff8e7:s=1760x1010:r=30:d=8[paper];"
        "[rf]scale=1718:966:flags=lanczos[revealfg];"
        "[paper][revealfg]overlay=21:21[revealcard];"
        "[revealbg][revealcard]overlay=(W-w)/2:(H-h)/2,"
        "trim=duration=8,setpts=PTS-STARTPTS[v1];"
        "[v0][v1]concat=n=2:v=1:a=0,format=yuv420p,"
        "fade=t=out:st=70.35:d=0.65[v];"
        f"[2:a]atrim=start=0:end={TOTAL_DURATION},asetpts=PTS-STARTPTS,"
        "afade=t=in:st=0:d=0.65,afade=t=out:st=70.2:d=0.8[a]"
    )
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-i", str(BODY_OUT), "-i", str(REVEAL), "-i", str(MUSIC),
        "-filter_complex", filters, "-map", "[v]", "-map", "[a]",
        "-t", str(TOTAL_DURATION), "-r", str(FPS),
        "-c:v", "libx264", "-preset", "slow", "-crf", "17",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart", str(FINAL_OUT),
    ]
    subprocess.run(command, check=True)


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    sources = {
        "welcome": POSTCARDS / "pc-welcome.png",
        "heroine": EP4 / "ep04-scene-01-cold-open-v2.png",
        "main_street": POSTCARDS / "pc-main-street.png",
        "mme": PLATES / "opening-02-mme-claio.png",
        "mme_postcard": POSTCARDS / "pc-mme-claio.png",
        "dj": PLATES / "opening-03-dj-sunnyv.png",
        "ksvl_postcard": POSTCARDS / "pc-ksvl.png",
        "mayor": PLATES / "opening-04-mayor-deb.png",
        "park": POSTCARDS / "pc-park.png",
        "fairy": PLATES / "opening-05-fairy-godmother.png",
        "fairy_postcard": POSTCARDS / "pc-fairy-godmother.png",
        "barista": PLATES / "opening-06-barista.png",
        "blend_postcard": POSTCARDS / "pc-blend-and-snap.png",
        "library": POSTCARDS / "pc-library.png",
        "chick_flicks": POSTCARDS / "pc-chick-flicks.png",
        "dialup": POSTCARDS / "pc-dial-up.png",
        "greetings": POSTCARDS / "greetings-from-sunnyvaile-post-card.png",
    }
    required = list(sources.values()) + [MUSIC, REVEAL]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n" + "\n".join(missing))
    images = {key: Image.open(path).convert("RGB") for key, path in sources.items()}
    encode_body(images)
    assemble_final()
    print(FINAL_OUT)


if __name__ == "__main__":
    main()
