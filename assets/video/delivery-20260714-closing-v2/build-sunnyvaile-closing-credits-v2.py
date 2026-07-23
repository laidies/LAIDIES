#!/usr/bin/env python3
"""Build the stable 36-second SUNNYVAiLE closing-credits re-roll."""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "assets"
POSTCARDS = ASSETS / "postcards" / "from-sunnyvaile"
STREETS = ASSETS / "sunnyvaile-streets"
BRAND = ASSETS / "brand"
DELIVERY = ASSETS / "video" / "delivery-20260714-closing-v2"
MUSIC = ROOT / "content" / "music" / "sunnyvaile-town-anthem.mp3"
OUT = DELIVERY / "sunnyvaile-closing-credits-v1.mp4"

W, H, FPS = 1920, 1080, 30
DURATION = 36.0
MUSIC_START = 182.42  # final 36 seconds of the 3:38.42 anthem
XFADE = 0.72

DEEP_PLUM = (28, 11, 32)
PLUM = (75, 33, 72)
ROSE = (153, 62, 96)
PINK = (217, 92, 145)
TEAL = (58, 154, 166)
GOLD = (183, 142, 30)
CREAM = (255, 248, 231)
INK = (63, 31, 58)

GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
GEORGIA_ITALIC = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
DIDOT = "/System/Library/Fonts/Supplemental/Didot.ttc"
FUTURA = "/System/Library/Fonts/Supplemental/Futura.ttc"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size=size, index=index)
    except OSError:
        return ImageFont.truetype(ARIAL_BOLD, size=size)


def clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, value))


def smooth(value: float) -> float:
    value = clamp(value)
    return value * value * (3.0 - 2.0 * value)


def cover(image: Image.Image, width: int, height: int) -> Image.Image:
    """Stable centered cover: no per-frame position or scale changes."""
    image = image.convert("RGB")
    scale = max(width / image.width, height / image.height)
    resized = image.resize(
        (max(width, round(image.width * scale)), max(height, round(image.height * scale))),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def contain(image: Image.Image, max_w: int, max_h: int) -> Image.Image:
    scale = min(max_w / image.width, max_h / image.height)
    return image.convert("RGB").resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )


def blurred_background(image: Image.Image) -> Image.Image:
    bg = cover(image, W, H).filter(ImageFilter.GaussianBlur(28))
    bg = ImageEnhance.Brightness(bg).enhance(0.43)
    return ImageEnhance.Color(bg).enhance(0.84)


def shadow(width: int, height: int) -> Image.Image:
    result = Image.new("RGBA", (width + 120, height + 120), (0, 0, 0, 0))
    draw = ImageDraw.Draw(result)
    draw.rounded_rectangle(
        (45, 45, width + 75, height + 75), radius=24, fill=(8, 3, 12, 168)
    )
    return result.filter(ImageFilter.GaussianBlur(27))


def sparkles(frame: Image.Image, t: float, seed: int) -> Image.Image:
    """Fixed-position light pulses; nothing translates or jitters."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for i in range(16):
        x = (seed * 97 + i * 293 + 71) % W
        y = (seed * 61 + i * 173 + 47) % H
        pulse = 0.5 + 0.5 * math.sin(t * 1.6 + i * 1.13)
        alpha = round(35 + 95 * pulse)
        radius = 1 + i % 3
        color = GOLD if i % 3 else TEAL
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color + (alpha,))
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def postcard_front(
    image: Image.Image,
    t: float,
    seed: int,
    caption: tuple[str, str] | None = None,
) -> Image.Image:
    bg = sparkles(blurred_background(image), t, seed).convert("RGBA")
    paper_w, paper_h = 1740, 980
    margin = 154 if caption else 28
    image_h = paper_h - margin - 28
    image_w = paper_w - 56

    paper = Image.new("RGBA", (paper_w, paper_h), CREAM + (255,))
    art = contain(image, image_w, image_h)
    art_x = (paper_w - art.width) // 2
    art_y = 28 + (image_h - art.height) // 2
    paper.alpha_composite(art.convert("RGBA"), (art_x, art_y))

    if caption:
        line1, line2 = caption
        draw = ImageDraw.Draw(paper)
        first_font = font(GEORGIA_ITALIC, 50)
        second_font = font(FUTURA, 25)
        first_box = draw.textbbox((0, 0), line1, font=first_font)
        first_x = (paper_w - (first_box[2] - first_box[0])) // 2
        draw.text((first_x, 839), line1, font=first_font, fill=INK + (255,))
        draw.line((650, 910, 1090, 910), fill=GOLD + (255,), width=3)
        second_box = draw.textbbox((0, 0), line2, font=second_font)
        second_x = (paper_w - (second_box[2] - second_box[0])) // 2
        draw.text((second_x, 928), line2, font=second_font, fill=ROSE + (255,))

    x = (W - paper_w) // 2
    y = (H - paper_h) // 2
    bg.alpha_composite(shadow(paper_w, paper_h), (x - 60, y - 60))
    bg.alpha_composite(paper, (x, y))
    return bg.convert("RGB")


def draw_tracking(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    text_font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking: int,
) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=text_font, fill=fill)
        x += round(draw.textlength(char, font=text_font)) + tracking


def end_card(
    t: float,
    dialup: Image.Image,
    wordmark: Image.Image,
    logo_square: Image.Image,
) -> Image.Image:
    bg = sparkles(blurred_background(dialup), t, 91).convert("RGBA")
    paper_w, paper_h = 1740, 980
    paper = Image.new("RGBA", (paper_w, paper_h), CREAM + (255,))
    draw = ImageDraw.Draw(paper)

    # Postcard-back structure.
    draw.line((895, 105, 895, 875), fill=PLUM + (110,), width=3)
    for y in (345, 410, 475, 540):
        draw.line((1010, y, 1570, y), fill=PLUM + (105,), width=2)

    mark = wordmark.copy().convert("RGBA")
    mark_scale = min(670 / mark.width, 250 / mark.height)
    mark = mark.resize(
        (round(mark.width * mark_scale), round(mark.height * mark_scale)),
        Image.Resampling.LANCZOS,
    )
    paper.alpha_composite(mark, (105, 135))

    sign_font = font(GEORGIA_ITALIC, 52)
    town_font = font(GEORGIA_BOLD, 58)
    draw.text((118, 488), "See you next Wednesday", font=sign_font, fill=INK + (255,))
    draw.text((118, 568), "in SUNNYVAiLE", font=town_font, fill=ROSE + (255,))
    draw.line((120, 662, 690, 662), fill=GOLD + (255,), width=3)
    draw.text((118, 695), "The town will keep the lights on.",
              font=font(GEORGIA_ITALIC, 30), fill=PLUM + (210,))

    draw_tracking(
        draw, "DIAL BACK IN", (1010, 160), font(FUTURA, 24), PLUM + (205,), 5
    )
    domain_font = font(DIDOT, 112)
    draw.text((1004, 225), "laidies.ai", font=domain_font, fill=INK + (255,))
    draw_tracking(
        draw,
        "NEW EPISODE EVERY WEDNESDAY",
        (1012, 610),
        font(FUTURA, 20),
        ROSE + (255,),
        3,
    )

    stamp = logo_square.copy().convert("RGBA")
    stamp.thumbnail((118, 118), Image.Resampling.LANCZOS)
    stamp_x, stamp_y = 1510, 120
    draw.rounded_rectangle(
        (stamp_x - 12, stamp_y - 12, stamp_x + 130, stamp_y + 130),
        radius=10, outline=TEAL + (190,), width=4,
    )
    paper.alpha_composite(stamp, (stamp_x, stamp_y))
    draw.ellipse((1415, 70, 1645, 300), outline=ROSE + (105,), width=4)
    draw.ellipse((1430, 85, 1630, 285), outline=ROSE + (85,), width=3)
    draw_tracking(draw, "SUNNYVAiLE", (1458, 269), font(FUTURA, 16), ROSE + (150,), 2)

    x = (W - paper_w) // 2
    y = (H - paper_h) // 2
    bg.alpha_composite(shadow(paper_w, paper_h), (x - 60, y - 60))
    bg.alpha_composite(paper, (x, y))
    return bg.convert("RGB")


SCENES = [
    (0.0, 7.0, "dialup"),
    (7.0, 14.0, "main_street"),
    (14.0, 21.0, "ksvl"),
    (21.0, 28.0, "lantern"),
    (28.0, 36.0, "end"),
]


def scene_frame(
    scene: tuple[float, float, str],
    t: float,
    images: dict[str, Image.Image],
) -> Image.Image:
    _, _, key = scene
    if key == "end":
        return end_card(t, images["dialup"], images["wordmark"], images["logo_square"])
    caption = ("See you next Wednesday", "IN SUNNYVAiLE") if key == "lantern" else None
    seed = {"dialup": 11, "main_street": 27, "ksvl": 43, "lantern": 59}[key]
    return postcard_front(images[key], t, seed, caption)


def make_frame(t: float, images: dict[str, Image.Image]) -> Image.Image:
    index = next(i for i, scene in enumerate(SCENES) if scene[0] <= t < scene[1])
    scene = SCENES[index]
    frame = scene_frame(scene, t, images)
    if index + 1 < len(SCENES) and t >= scene[1] - XFADE:
        nxt = scene_frame(SCENES[index + 1], t, images)
        frame = Image.blend(frame, nxt, smooth((t - (scene[1] - XFADE)) / XFADE))
    if t < 1.0:
        frame = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), frame, smooth(t))
    if t > 35.0:
        frame = Image.blend(frame, Image.new("RGB", (W, H), (0, 0, 0)), smooth(t - 35.0))
    return frame


def ffmpeg_path() -> str:
    python = "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"
    result = subprocess.run(
        [python, "-c", "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"],
        check=True, capture_output=True, text=True,
    )
    return result.stdout.strip()


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    sources = {
        "dialup": POSTCARDS / "pc-dial-up.png",
        "main_street": STREETS / "main-street-dusk.png",
        "ksvl": POSTCARDS / "pc-ksvl.png",
        "lantern": STREETS / "lantern-hill-evening.png",
        "wordmark": BRAND / "laidies-wordmark-final-b-light.png",
        "logo_square": BRAND / "laidies-logo-square-transparent-512-v1.png",
    }
    required = list(sources.values()) + [MUSIC]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n" + "\n".join(missing))
    images = {
        key: Image.open(path).convert("RGBA" if key in {"wordmark", "logo_square"} else "RGB")
        for key, path in sources.items()
    }

    ffmpeg = ffmpeg_path()
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "-",
        "-ss", f"{MUSIC_START:.2f}", "-t", f"{DURATION:.2f}", "-i", str(MUSIC),
        "-map", "0:v:0", "-map", "1:a:0",
        "-vf", "format=yuv420p", "-af", "afade=t=in:st=0:d=1.0",
        "-c:v", "libx264", "-preset", "medium", "-crf", "17",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart", "-shortest", str(OUT),
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
    print(OUT)


if __name__ == "__main__":
    main()
