#!/usr/bin/env python3
"""Build the stable 38-second SUNNYVAiLE closing-credits re-roll."""

from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "assets"
BRAND = ASSETS / "brand"
DELIVERY = ASSETS / "video" / "delivery-20260714-closing-v3"
SHOTS = DELIVERY / "shots"
PROOFS = DELIVERY / "proofs"
MUSIC = ROOT / "content" / "music" / "sunnyvaile-town-anthem.mp3"
OUT = DELIVERY / "sunnyvaile-closing-credits-v1.mp4"

W, H, FPS = 1920, 1080, 30
DURATION = 38.0
MUSIC_START = 180.4
XFADE = 0.58

PLUM = (55, 20, 52)
PINK = (233, 130, 171)
TEAL = (87, 182, 192)
GOLD = (233, 185, 72)
CORAL = (226, 94, 104)
CREAM = (255, 244, 219)

ROCKWELL = "/System/Library/Fonts/Supplemental/Rockwell.ttc"
SIGNPAINTER = "/System/Library/Fonts/Supplemental/SignPainter.ttc"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
JOST = DELIVERY / "fonts" / "Jost.ttf"


def font(path: str | Path, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(path), size=size, index=index)
    except OSError:
        return ImageFont.truetype(ARIAL_BOLD, size=size)


def clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, value))


def smooth(value: float) -> float:
    value = clamp(value)
    return value * value * (3.0 - 2.0 * value)


def cover(image: Image.Image) -> Image.Image:
    image = image.convert("RGB")
    scale = max(W / image.width, H / image.height)
    resized = image.resize(
        (max(W, round(image.width * scale)), max(H, round(image.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x = (resized.width - W) // 2
    y = (resized.height - H) // 2
    return resized.crop((x, y, x + W, y + H))


def layered_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    text_font: ImageFont.FreeTypeFont,
    *,
    front: tuple[int, int, int] = CREAM,
    mid: tuple[int, int, int] = TEAL,
    back: tuple[int, int, int] = CORAL,
    front_stroke: int = 4,
) -> None:
    x, y = xy
    draw.text(
        (x + 15, y + 17), text, font=text_font, fill=back + (255,),
        stroke_width=10, stroke_fill=PLUM + (255,),
    )
    draw.text(
        (x + 7, y + 8), text, font=text_font, fill=mid + (255,),
        stroke_width=8, stroke_fill=PLUM + (255,),
    )
    draw.text(
        (x, y), text, font=text_font, fill=front + (255,),
        stroke_width=front_stroke, stroke_fill=PLUM + (255,),
    )


def tracked_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    text_font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking: int,
) -> None:
    x, y = xy
    for character in text:
        draw.text((x, y), character, font=text_font, fill=fill)
        x += round(draw.textlength(character, font=text_font)) + tracking


def ambient(frame: Image.Image, t: float, seed: int, glow: tuple[int, int] | None = None) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for index in range(13):
        x = 85 + ((seed * 131 + index * 307) % 1760)
        y = 55 + ((seed * 71 + index * 181) % 760)
        pulse = 0.5 + 0.5 * math.sin(t * 1.15 + index * 1.37)
        alpha = round(18 + 76 * pulse)
        radius = 1 + index % 2
        colour = GOLD if index % 4 else TEAL
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=colour + (alpha,))
    if glow:
        pulse = 0.5 + 0.5 * math.sin(t * 1.3 + seed)
        gx, gy = glow
        for radius in range(72, 5, -7):
            alpha = round((1 - radius / 76) * (4 + 19 * pulse))
            draw.ellipse((gx - radius, gy - radius, gx + radius, gy + radius), fill=PINK + (alpha,))
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def soft_left_shade(frame: Image.Image, strength: int = 132) -> Image.Image:
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for x in range(0, 1280, 16):
        alpha = round(strength * (1 - x / 1280) ** 1.7)
        draw.rectangle((x, 0, x + 16, H), fill=alpha)
    layer = Image.new("RGBA", (W, H), PLUM + (0,))
    layer.putalpha(mask)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def signoff(frame: Image.Image, seconds: float) -> Image.Image:
    frame = soft_left_shade(frame, 94)
    opacity = smooth((seconds - 0.65) / 0.8)
    if seconds > 5.45:
        opacity *= 1.0 - smooth((seconds - 5.45) / 0.55)
    layer = Image.new("RGBA", (1570, 330), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    tracked_text(draw, (14, 10), "SEE YOU NEXT WEDNESDAY", font(JOST, 30), PINK + (255,), 6)
    script = font(SIGNPAINTER, 72, index=1)
    draw.text(
        (18, 65), "in", font=script, fill=CREAM + (255,),
        stroke_width=5, stroke_fill=PLUM + (255,),
    )
    layered_text(draw, (120, 76), "SUNNYVAiLE", font(ROCKWELL, 125, index=2), front_stroke=5)
    draw.line((25, 258, 1035, 258), fill=GOLD + (235,), width=4)
    layer.putalpha(layer.getchannel("A").point(lambda value: round(value * opacity)))
    result = frame.convert("RGBA")
    result.alpha_composite(layer, (96, 678))
    return result.convert("RGB")


def end_card(frame: Image.Image, wordmark: Image.Image, seconds: float) -> Image.Image:
    frame = soft_left_shade(ImageEnhance.Brightness(frame).enhance(0.92), 156)
    opacity = smooth((seconds - 0.45) / 0.85)
    if seconds > 10.15:
        opacity *= 1.0 - smooth((seconds - 10.15) / 0.85)

    result = frame.convert("RGBA")
    mark = wordmark.copy().convert("RGBA")
    scale = min(430 / mark.width, 185 / mark.height)
    mark = mark.resize(
        (round(mark.width * scale), round(mark.height * scale)), Image.Resampling.LANCZOS
    )
    mark.putalpha(mark.getchannel("A").point(lambda value: round(value * opacity)))
    result.alpha_composite(mark, (112, 155))

    layer = Image.new("RGBA", (1080, 500), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    layered_text(draw, (12, 5), "laidies.ai", font(ROCKWELL, 142, index=2), front_stroke=6)
    draw.text(
        (26, 205), "new episode every Wednesday", font=font(SIGNPAINTER, 70, index=1),
        fill=CREAM + (255,), stroke_width=5, stroke_fill=PLUM + (255,),
    )
    draw.line((28, 305, 865, 305), fill=GOLD + (235,), width=4)
    tracked_text(
        draw, (31, 338), "L  ·  A  ·  i  ·  D  ·  I  ·  E  ·  S",
        font(JOST, 27), PINK + (255,), 3,
    )
    layer.putalpha(layer.getchannel("A").point(lambda value: round(value * opacity)))
    result.alpha_composite(layer, (92, 395))
    return result.convert("RGB")


SCENES = [
    (0.0, 7.0, "establishing"),
    (7.0, 14.0, "blend"),
    (14.0, 21.0, "ksvl"),
    (21.0, 27.0, "luminairy"),
    (27.0, 38.0, "end"),
]


def raw_scene(index: int, t: float, images: dict[str, Image.Image]) -> Image.Image:
    start, _, key = SCENES[index]
    seconds = t - start
    frame = images[key].copy()
    glow_points = {
        "establishing": (1502, 222), "blend": (725, 586), "ksvl": (1494, 210),
        "luminairy": (1010, 540), "end": (1435, 450),
    }
    frame = ambient(frame, t, 47 + index * 19, glow_points[key])
    if key == "luminairy":
        frame = signoff(frame, seconds)
    elif key == "end":
        frame = end_card(frame, images["wordmark"], seconds)
    return frame


def make_frame(t: float, images: dict[str, Image.Image]) -> Image.Image:
    index = next(
        i for i, (start, end, _) in enumerate(SCENES)
        if start <= t < end or (i == len(SCENES) - 1 and t >= start)
    )
    frame = raw_scene(index, t, images)
    _, end, _ = SCENES[index]
    if index + 1 < len(SCENES) and t >= end - XFADE:
        next_frame = raw_scene(index + 1, t, images)
        frame = Image.blend(frame, next_frame, smooth((t - (end - XFADE)) / XFADE))
    if t < 1.0:
        frame = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), frame, smooth(t))
    if t > 37.1:
        frame = Image.blend(frame, Image.new("RGB", (W, H), (0, 0, 0)), smooth((t - 37.1) / 0.9))
    return frame


def ffmpeg_path() -> str:
    python = "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"
    result = subprocess.run(
        [python, "-c", "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"],
        check=True, capture_output=True, text=True,
    )
    return result.stdout.strip()


def load_images() -> dict[str, Image.Image]:
    sources = {
        "establishing": SHOTS / "closing-01-establishing.png",
        "blend": SHOTS / "closing-02-blend-snap.png",
        "ksvl": SHOTS / "closing-03-ksvl.png",
        "luminairy": SHOTS / "closing-04-luminairy.png",
        "end": SHOTS / "closing-05-end-sign.png",
        "wordmark": BRAND / "laidies-wordmark-final-b-dark.png",
    }
    missing = [str(path) for path in list(sources.values()) + [MUSIC] if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n" + "\n".join(missing))
    loaded: dict[str, Image.Image] = {}
    for key, path in sources.items():
        image = Image.open(path)
        loaded[key] = image.convert("RGBA") if key == "wordmark" else cover(image)
    return loaded


def write_proofs(images: dict[str, Image.Image]) -> None:
    PROOFS.mkdir(parents=True, exist_ok=True)
    proof_times = [3.5, 10.5, 17.5, 24.0, 30.8, 35.5]
    thumbs: list[Image.Image] = []
    for index, seconds in enumerate(proof_times, start=1):
        frame = make_frame(seconds, images)
        frame.save(PROOFS / f"closing-v3-proof-{index:02d}.jpg", quality=92)
        thumbs.append(frame.resize((640, 360), Image.Resampling.LANCZOS))
    sheet = Image.new("RGB", (1920, 720), (20, 8, 20))
    for index, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((index % 3) * 640, (index // 3) * 360))
    sheet.save(PROOFS / "closing-v3-contact-sheet.jpg", quality=94)


def encode(images: dict[str, Image.Image]) -> None:
    ffmpeg = ffmpeg_path()
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "-",
        "-ss", f"{MUSIC_START:.2f}", "-t", f"{DURATION:.2f}", "-i", str(MUSIC),
        "-map", "0:v:0", "-map", "1:a:0", "-t", f"{DURATION:.2f}",
        "-vf", "format=yuv420p", "-af", "afade=t=in:st=0:d=1.0,atrim=duration=38",
        "-c:v", "libx264", "-preset", "medium", "-crf", "17",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart", str(OUT),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for frame_index in range(round(DURATION * FPS)):
            process.stdin.write(make_frame(frame_index / FPS, images).tobytes())
    finally:
        process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("ffmpeg failed while encoding the closing credits")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--proofs", action="store_true", help="write still proofs only")
    args = parser.parse_args()
    images = load_images()
    if args.proofs:
        write_proofs(images)
        print(PROOFS / "closing-v3-contact-sheet.jpg")
    else:
        encode(images)
        print(OUT)


if __name__ == "__main__":
    main()
