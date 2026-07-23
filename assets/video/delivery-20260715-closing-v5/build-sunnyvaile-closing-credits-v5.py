#!/usr/bin/env python3
"""Build the final 38-second SUNNYVAiLE closing-credits sequence."""

from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "assets"
BRAND = ASSETS / "brand"
DELIVERY = ASSETS / "video" / "delivery-20260715-closing-v5"
SHOTS = DELIVERY / "shots"
PROOFS = DELIVERY / "proofs"
MUSIC = ROOT / "content" / "music" / "sunnyvaile-town-anthem.mp3"
OUT = DELIVERY / "sunnyvaile-closing-credits-v7.mp4"

W, H, FPS = 1920, 1080, 30
DURATION = 38.0
MUSIC_START = 180.4
XFADE = 0.90

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


def motion_cover(image: Image.Image, margin: int = 48) -> Image.Image:
    image = image.convert("RGB")
    scale = max((W + margin * 2) / image.width, (H + margin * 2) / image.height)
    return image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)


def fine_pixel_finish(image: Image.Image, *, margin: int = 48) -> Image.Image:
    """Replace painterly brush texture with one consistent two-pixel episode grid."""
    prepared = motion_cover(image, margin)
    logical = prepared.resize(
        (max(1, prepared.width // 2), max(1, prepared.height // 2)), Image.Resampling.LANCZOS
    )
    logical = logical.quantize(
        colors=224, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG
    ).convert("RGB")
    return logical.resize(prepared.size, Image.Resampling.NEAREST)


def crisp_pixel_frame(image: Image.Image) -> Image.Image:
    """Grace-reference finish: sharp 1080p detail with a light, fine dither surface."""
    sharp = image.convert("RGB").filter(ImageFilter.UnsharpMask(radius=0.65, percent=85, threshold=3))
    return sharp.quantize(
        colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG
    ).convert("RGB")


def smooth_camera(image: Image.Image, seconds: float, duration: float, direction: int) -> Image.Image:
    p = smooth(seconds / max(duration, 0.01))
    max_x, max_y = image.width - W, image.height - H
    travel = min(16.0, max_x * 0.18)
    x0 = max(0.0, (max_x - travel) / 2)
    x = x0 + travel * (p if direction > 0 else 1 - p)
    y = max(0.0, max_y / 2 + 2.0 * math.sin(p * math.pi))
    return image.transform(
        (W, H), Image.Transform.EXTENT, (x, y, x + W, y + H),
        resample=Image.Resampling.BICUBIC,
    )


def full_bleed_postcard(image: Image.Image, seconds: float, duration: float) -> Image.Image:
    """Crop beyond the printed postcard border and hold with a near-imperceptible push."""
    p = smooth(seconds / max(duration, 0.01))
    scale = max(W / image.width, H / image.height) * (1.055 + 0.010 * p)
    art = image.convert("RGB").resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )
    x = (art.width - W) / 2
    # Bottom-bias preserves the postcard's complete title and handwritten tagline;
    # the extra scale keeps the printed outer border beyond the video frame.
    y = max(0.0, art.height - H - 18.0)
    return art.transform(
        (W, H), Image.Transform.EXTENT, (x, y, x + W, y + H),
        resample=Image.Resampling.BICUBIC,
    )


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


def practical_glow(
    frame: Image.Image,
    t: float,
    xy: tuple[int, int],
    colour: tuple[int, int, int],
    radius: int = 110,
) -> Image.Image:
    """Soft source-integrated light pulse; no visible dots, lines, or drawn effects."""
    pulse = 0.35 + 0.65 * (0.5 + 0.5 * math.sin(t * 0.82))
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    x, y = xy
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=round(25 * pulse))
    mask = mask.filter(ImageFilter.GaussianBlur(radius * 0.62))
    layer = Image.new("RGBA", (W, H), colour + (0,))
    layer.putalpha(mask)
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
    frame = soft_left_shade(frame, 102)
    opacity = smooth((seconds - 0.65) / 0.8)
    if seconds > 5.45:
        opacity *= 1.0 - smooth((seconds - 5.45) / 0.55)
    layer = Image.new("RGBA", (1500, 300), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    tracked_text(draw, (14, 8), "SEE YOU NEXT WEDNESDAY", font(JOST, 30), PINK + (255,), 6)
    draw.text((18, 66), "in", font=font(SIGNPAINTER, 68, index=1), fill=CREAM + (255,), stroke_width=4, stroke_fill=PLUM + (255,))
    layered_text(draw, (118, 62), "SUNNYVAiLE", font(ROCKWELL, 116, index=2), front_stroke=5)
    draw.line((24, 235, 1040, 235), fill=GOLD + (235,), width=4)
    layer.putalpha(layer.getchannel("A").point(lambda value: round(value * opacity)))
    result = frame.convert("RGBA")
    result.alpha_composite(layer, (88, 720))
    return result.convert("RGB")


def end_card(frame: Image.Image, seconds: float) -> Image.Image:
    """Homepage-correct sign-off over the full-bleed Dial-Up postcard."""
    opacity = smooth((seconds - 0.45) / 0.85)
    if seconds > 10.15:
        opacity *= 1.0 - smooth((seconds - 10.15) / 0.85)
    panel = Image.new("RGBA", (920, 255), (0, 0, 0, 0))
    draw = ImageDraw.Draw(panel)
    layered_text(draw, (12, 22), "laidies.ai", font(ROCKWELL, 108, index=2), front_stroke=5)
    draw.text((24, 160), "new episode every Wednesday", font=font(SIGNPAINTER, 48, index=1), fill=CREAM + (255,), stroke_width=4, stroke_fill=PLUM + (255,))
    panel.putalpha(panel.getchannel("A").point(lambda value: round(value * opacity)))
    result = frame.convert("RGBA")
    result.alpha_composite(panel, (W - panel.width - 74, 70))
    return result.convert("RGB")


SCENES = [
    (0.0, 7.0, "establishing"),
    (7.0, 14.0, "blend"),
    (14.0, 21.0, "ksvl"),
    (21.0, 27.0, "luminairy"),
    (27.0, 38.0, "end"),
]


def raw_scene(index: int, t: float, images: dict[str, Image.Image]) -> Image.Image:
    start, end, key = SCENES[index]
    seconds = t - start
    duration = end - start
    action_starts = {"ksvl": "ksvl_dim", "luminairy": "luminairy_dim", "end": "end_dialing"}
    if key in action_starts:
        if key == "end":
            before = full_bleed_postcard(images[action_starts[key]], seconds, duration)
            after = full_bleed_postcard(images[key], seconds, duration)
            action = smooth((seconds - 1.7) / 2.1)
        else:
            before = smooth_camera(images[action_starts[key]], seconds, duration, 1 if index % 2 else -1)
            after = smooth_camera(images[key], seconds, duration, 1 if index % 2 else -1)
            action = smooth((seconds - 1.4) / 1.8)
        frame = Image.blend(before, after, action)
    else:
        frame = smooth_camera(images[key], seconds, duration, 1 if index % 2 else -1)
    glow_points = {
        "establishing": (1502, 222), "blend": (725, 586), "ksvl": (1494, 210),
        "luminairy": (1010, 540), "end": (1435, 450),
    }
    glow_colours = {"establishing": PINK, "blend": GOLD, "ksvl": PINK, "luminairy": GOLD}
    if key != "end":
        frame = practical_glow(frame, seconds, glow_points[key], glow_colours[key])
        frame = ImageEnhance.Brightness(frame).enhance(1.0 + 0.012 * math.sin(seconds * 0.58))
    # Camera transforms happen above. Lock the final background to a crisp,
    # intentional two-pixel grid before adding clean broadcast typography.
    frame = crisp_pixel_frame(frame)
    if key == "luminairy":
        frame = signoff(frame, seconds)
    elif key == "end":
        frame = end_card(frame, seconds)
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
        "ksvl_dim": SHOTS / "closing-03-ksvl-dim.png",
        "luminairy_dim": SHOTS / "closing-04-luminairy-dim.png",
        "end_dialing": SHOTS / "closing-05-dial-up-postcard.png",
        "end": SHOTS / "closing-05-dial-up-connected.png",
    }
    missing = [str(path) for path in list(sources.values()) + [MUSIC] if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n" + "\n".join(missing))
    loaded: dict[str, Image.Image] = {}
    for key, path in sources.items():
        image = Image.open(path)
        loaded[key] = motion_cover(image, margin=0) if key in {"end", "end_dialing"} else motion_cover(image)
    return loaded


def write_proofs(images: dict[str, Image.Image]) -> None:
    PROOFS.mkdir(parents=True, exist_ok=True)
    proof_times = [3.5, 10.5, 17.5, 24.0, 30.8, 35.5]
    thumbs: list[Image.Image] = []
    for index, seconds in enumerate(proof_times, start=1):
        frame = make_frame(seconds, images)
        frame.save(PROOFS / f"closing-v7-proof-{index:02d}.png")
        thumbs.append(frame.resize((640, 360), Image.Resampling.LANCZOS))
    sheet = Image.new("RGB", (1920, 720), (20, 8, 20))
    for index, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((index % 3) * 640, (index // 3) * 360))
    sheet.save(PROOFS / "closing-v7-contact-sheet.png")


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
        print(PROOFS / "closing-v7-contact-sheet.png")
    else:
        encode(images)
        print(OUT)


if __name__ == "__main__":
    main()
