#!/usr/bin/env python3
"""Build the 56-second SUNNYVAiLE TV opening-credits re-roll.

The sequence uses newly staged, full-screen cast-in-world plates. Cameras are
locked. Motion is restricted to fixed-position light, glow, steam and title
beats so the result reads as a living still without jitter or fake walking.
"""

from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "assets"
BRAND = ASSETS / "brand"
DELIVERY = ASSETS / "video" / "delivery-20260714-opening-v3"
SHOTS = DELIVERY / "shots"
PROOFS = DELIVERY / "proofs"
MUSIC = ROOT / "content" / "music" / "sunnyvaile-town-anthem.mp3"
OUT = DELIVERY / "sunnyvaile-opening-credits-v1.mp4"

W, H, FPS = 1920, 1080, 30
DURATION = 56.0
MUSIC_START = 69.0

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
    """Stable, centered 16:9 cover with no frame-to-frame movement."""
    image = image.convert("RGB")
    scale = max(W / image.width, H / image.height)
    resized = image.resize(
        (max(W, round(image.width * scale)), max(H, round(image.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x = (resized.width - W) // 2
    y = (resized.height - H) // 2
    return resized.crop((x, y, x + W, y + H))


def darken_lower_left(frame: Image.Image) -> Image.Image:
    """Give the credit card contrast without introducing a panel or postcard."""
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for radius in range(1120, 40, -40):
        alpha = round(112 * (1 - radius / 1160) ** 0.45)
        draw.ellipse((-510 - radius, H - 90 - radius, -510 + radius, H - 90 + radius), fill=alpha)
    shade = Image.new("RGBA", (W, H), PLUM + (0,))
    shade.putalpha(mask)
    return Image.alpha_composite(frame.convert("RGBA"), shade).convert("RGB")


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
    """Postcard-title lettering: coral extrusion, teal edge, cream face."""
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


def credit_card(name: str, job: str) -> Image.Image:
    """One consistent, hero-sized card used for every cast member."""
    canvas = Image.new("RGBA", (1740, 345), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    tracked_text(draw, (22, 8), "STARRING", font(JOST, 31), PINK + (255,), 8)

    name_size = 108
    name_font = font(ROCKWELL, name_size, index=2)
    while draw.textbbox((0, 0), name, font=name_font, stroke_width=10)[2] > 1630:
        name_size -= 4
        name_font = font(ROCKWELL, name_size, index=2)
    layered_text(draw, (15, 49), name, name_font)

    job_font = font(SIGNPAINTER, 56, index=1)
    draw.text(
        (31, 218), job, font=job_font, fill=CREAM + (255,),
        stroke_width=5, stroke_fill=PLUM + (255,),
    )
    draw.line((32, 302, 680, 302), fill=GOLD + (235,), width=4)
    for x in (700, 730, 755):
        r = 4 if x != 730 else 6
        draw.ellipse((x - r, 302 - r, x + r, 302 + r), fill=TEAL + (235,))
    return canvas


def alpha_scaled(image: Image.Image, alpha: float) -> Image.Image:
    alpha = clamp(alpha)
    result = image.copy()
    result.putalpha(result.getchannel("A").point(lambda value: round(value * alpha)))
    return result


def place_credit(frame: Image.Image, card: Image.Image, seconds: float) -> Image.Image:
    """Sitcom pop-in, long hold, clean fade. Background never moves."""
    if seconds < 0.72 or seconds > 4.72:
        return frame
    if seconds < 1.08:
        p = smooth((seconds - 0.72) / 0.36)
        scale = 0.90 + 0.15 * p
        opacity = p
    elif seconds < 1.30:
        p = smooth((seconds - 1.08) / 0.22)
        scale = 1.05 - 0.05 * p
        opacity = 1.0
    elif seconds > 4.35:
        scale = 1.0
        opacity = 1.0 - smooth((seconds - 4.35) / 0.37)
    else:
        scale = 1.0
        opacity = 1.0

    card_scaled = card.resize(
        (round(card.width * scale), round(card.height * scale)), Image.Resampling.LANCZOS
    )
    card_scaled = alpha_scaled(card_scaled, opacity)
    x = 82
    y = 696 + (card.height - card_scaled.height) // 2
    result = frame.convert("RGBA")
    result.alpha_composite(card_scaled, (x, y))
    return result.convert("RGB")


def ambient(frame: Image.Image, t: float, seed: int, *, glow: tuple[int, int] | None = None) -> Image.Image:
    """Fixed-position twinkles and one optional breathing light source."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for index in range(11):
        x = 100 + ((seed * 137 + index * 311) % 1720)
        y = 80 + ((seed * 73 + index * 179) % 720)
        pulse = 0.5 + 0.5 * math.sin(t * 1.75 + index * 1.31)
        alpha = round(24 + 82 * pulse)
        radius = 1 + index % 2
        colour = GOLD if index % 3 else TEAL
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=colour + (alpha,))
    if glow:
        pulse = 0.5 + 0.5 * math.sin(t * 1.65 + seed)
        gx, gy = glow
        for radius in range(70, 4, -7):
            alpha = round((1 - radius / 74) * (5 + 18 * pulse))
            draw.ellipse((gx - radius, gy - radius, gx + radius, gy + radius), fill=PINK + (alpha,))
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def steam(frame: Image.Image, t: float, x: int, y: int) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for index in range(3):
        phase = (t * 0.22 + index / 3) % 1.0
        yy = y - round(85 * phase)
        xx = x + round(10 * math.sin(phase * math.pi * 2 + index))
        alpha = round(75 * math.sin(phase * math.pi))
        draw.arc((xx - 18, yy - 22, xx + 18, yy + 22), 210, 510, fill=CREAM + (alpha,), width=3)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def logo_bloom(frame: Image.Image, wordmark: Image.Image, seconds: float, *, final: bool = False) -> Image.Image:
    if final:
        start, end = 0.35, 4.70
    else:
        start, end = 0.70, 4.65
    if seconds < start or seconds > end:
        return frame
    p = smooth((seconds - start) / 0.45)
    out = 1.0 if seconds < end - 0.35 else 1.0 - smooth((seconds - (end - 0.35)) / 0.35)
    scale = 0.94 + 0.06 * p
    max_w = 760 if not final else 815
    base_scale = min(max_w / wordmark.width, 335 / wordmark.height) * scale
    mark = wordmark.resize(
        (round(wordmark.width * base_scale), round(wordmark.height * base_scale)),
        Image.Resampling.LANCZOS,
    )
    glow = mark.getchannel("A").filter(ImageFilter.GaussianBlur(24))
    glow_layer = Image.new("RGBA", mark.size, CREAM + (0,))
    glow_layer.putalpha(glow.point(lambda value: round(value * 0.34 * p * out)))
    mark = alpha_scaled(mark, p * out)
    result = frame.convert("RGBA")
    x = (W - mark.width) // 2
    y = 280 if not final else 155
    result.alpha_composite(glow_layer, (x, y))
    result.alpha_composite(mark, (x, y))
    return result.convert("RGB")


def title_frame(frame: Image.Image, wordmark: Image.Image, seconds: float) -> Image.Image:
    frame = ImageEnhance.Brightness(frame).enhance(0.68)
    frame = logo_bloom(frame, wordmark, seconds, final=True)
    if seconds < 0.68:
        return frame
    p = smooth((seconds - 0.68) / 0.42)
    if seconds > 4.55:
        p *= 1.0 - smooth((seconds - 4.55) / 0.45)
    layer = Image.new("RGBA", (1750, 245), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    title_font = font(ROCKWELL, 154, index=2)
    title = "SUNNYVAiLE"
    box = draw.textbbox((0, 0), title, font=title_font, stroke_width=10)
    x = (layer.width - (box[2] - box[0])) // 2
    layered_text(draw, (x, 6), title, title_font, front_stroke=6)
    layer = alpha_scaled(layer, p)
    result = frame.convert("RGBA")
    result.alpha_composite(layer, ((W - layer.width) // 2, 635))
    return result.convert("RGB")


SCENES = [
    (0.0, 5.0, "establishing", None),
    (5.0, 10.0, "heroine", ("YOUR HEROINE", "a few steps ahead of you")),
    (10.0, 15.0, "mme", ("MME CLAi-O", "the read, the message, the move")),
    (15.0, 20.0, "ksvl", None),
    (20.0, 25.0, "dj", ("DJ SUNNYV", "KSVL 99.9, on the air")),
    (25.0, 30.0, "mayor", ("MAYOR DEB", "Mayor of SUNNYVAiLE")),
    (30.0, 36.0, "luminairy", None),
    (36.0, 41.0, "fairy", ("THE FAiRY GODMOTHER", "the town's own AI")),
    (41.0, 46.0, "barista", ("THE BARISTA", "at the Blend & Snap")),
    (46.0, 51.0, "crew", None),
    (51.0, 56.0, "title", None),
]


def scene_at(t: float) -> tuple[int, float, str, tuple[str, str] | None]:
    for index, (start, end, key, credit) in enumerate(SCENES):
        if start <= t < end or (index == len(SCENES) - 1 and t >= start):
            return index, t - start, key, credit
    raise ValueError(t)


def make_frame(t: float, images: dict[str, Image.Image], cards: dict[str, Image.Image]) -> Image.Image:
    index, seconds, key, credit = scene_at(t)
    base_key = "establishing" if key == "title" else key
    frame = images[base_key].copy()

    glow_points = {
        "establishing": (1502, 222), "heroine": (600, 780), "mme": (515, 598),
        "ksvl": (1494, 210), "dj": (350, 255), "mayor": (635, 380),
        "luminairy": (1010, 540), "fairy": (1250, 430), "barista": (505, 260),
        "crew": (980, 180), "title": (1502, 222),
    }
    frame = ambient(frame, t, 13 + index * 17, glow=glow_points.get(key))
    if key == "heroine":
        frame = steam(frame, t, 544, 760)
    elif key == "barista":
        frame = steam(frame, t, 850, 815)

    if credit:
        frame = darken_lower_left(frame)
        frame = place_credit(frame, cards[key], seconds)
    elif key == "establishing":
        frame = logo_bloom(frame, images["wordmark"], seconds)
    elif key == "title":
        frame = title_frame(frame, images["wordmark"], seconds)

    if t < 0.75:
        frame = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), frame, smooth(t / 0.75))
    if t > 55.0:
        frame = Image.blend(frame, Image.new("RGB", (W, H), (0, 0, 0)), smooth(t - 55.0))
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
        "establishing": SHOTS / "opening-01-establishing.png",
        "heroine": SHOTS / "opening-02-heroine.png",
        "mme": SHOTS / "opening-03-mme-claio.png",
        "ksvl": SHOTS / "opening-04-ksvl-tower.png",
        "dj": SHOTS / "opening-05-dj-sunnyv.png",
        "mayor": SHOTS / "opening-06-mayor-deb.png",
        "luminairy": SHOTS / "opening-07-luminairy.png",
        "fairy": SHOTS / "opening-08-fairy-godmother.png",
        "barista": SHOTS / "opening-09-barista.png",
        "crew": SHOTS / "opening-10-crew.png",
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


def make_cards() -> dict[str, Image.Image]:
    return {
        key: credit_card(*credit)
        for _, _, key, credit in SCENES if credit is not None
    }


def write_proofs(images: dict[str, Image.Image], cards: dict[str, Image.Image]) -> None:
    PROOFS.mkdir(parents=True, exist_ok=True)
    proof_times = [2.7, 7.4, 12.4, 22.4, 27.4, 38.4, 43.4, 48.5, 53.1]
    thumbs: list[Image.Image] = []
    for index, seconds in enumerate(proof_times, start=1):
        frame = make_frame(seconds, images, cards)
        path = PROOFS / f"opening-v3-proof-{index:02d}.jpg"
        frame.save(path, quality=92)
        thumbs.append(frame.resize((640, 360), Image.Resampling.LANCZOS))
    sheet = Image.new("RGB", (1920, 1080), (20, 8, 20))
    for index, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((index % 3) * 640, (index // 3) * 360))
    sheet.save(PROOFS / "opening-v3-contact-sheet.jpg", quality=94)


def encode(images: dict[str, Image.Image], cards: dict[str, Image.Image]) -> None:
    ffmpeg = ffmpeg_path()
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "-",
        "-ss", f"{MUSIC_START:.2f}", "-t", f"{DURATION:.2f}", "-i", str(MUSIC),
        "-map", "0:v:0", "-map", "1:a:0", "-t", f"{DURATION:.2f}",
        "-vf", "format=yuv420p",
        "-af", "afade=t=in:st=0:d=0.75,afade=t=out:st=55:d=1.0,atrim=duration=56",
        "-c:v", "libx264", "-preset", "medium", "-crf", "17",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart", str(OUT),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for frame_index in range(round(DURATION * FPS)):
            process.stdin.write(make_frame(frame_index / FPS, images, cards).tobytes())
    finally:
        process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("ffmpeg failed while encoding the opening credits")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--proofs", action="store_true", help="write still proofs only")
    args = parser.parse_args()
    images = load_images()
    cards = make_cards()
    if args.proofs:
        write_proofs(images, cards)
        print(PROOFS / "opening-v3-contact-sheet.jpg")
    else:
        encode(images, cards)
        print(OUT)


if __name__ == "__main__":
    main()
