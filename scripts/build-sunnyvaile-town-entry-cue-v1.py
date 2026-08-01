#!/usr/bin/env python3
"""Build the shared SUNNYVAiLE town-entry cue and an Episode 03 review composite.

The cue is deliberately silent. It explains the recurring visual transformation
without changing episode narration, and clears before the episode-specific final
look is held on screen.
"""

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "operations/video-qa/town-entry-transformation-cue-v1"
SOURCE = ROOT / "assets/episodes/ep-03/comic/ep03-cue08-canva-transformation-once-v2.mp4"
STYLE_REFERENCE = ROOT / "assets/video/sunnyvaile-logo-reveal.mp4"
OVERLAY = OUT / "sunnyvaile-town-entry-cue-overlay-v1.mov"
REVIEW = OUT / "episode-03-town-entry-cue-review-v1.mp4"
CONTACT = OUT / "episode-03-town-entry-cue-contact-v1.png"
FRAME_DIR = OUT / "frames"

WIDTH = 1920
HEIGHT = 1080
FPS = 30
FRAME_COUNT = 149

PLUM = (53, 17, 63)
ELECTRIC_TEAL = (30, 215, 217)
HOT_PINK = (236, 39, 159)
CORAL = (255, 112, 103)
YELLOW = (255, 214, 61)
WHITE = (255, 248, 241)

JOST = ROOT / "operations/design-explorations/study-pack-storefront-20260728/prototype/public/fonts/Jost-ExtraBold.ttf"
MONACO = Path("/System/Library/Fonts/Monaco.ttf")


def run(*args: str) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def ease(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def neon_text(
    layer: Image.Image,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    glow: tuple[int, int, int],
    alpha: int,
) -> None:
    glow_layer = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_draw.text(xy, text, font=font, fill=(*glow, int(alpha * 0.72)), stroke_width=2)
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(12))
    layer.alpha_composite(glow_layer)
    draw = ImageDraw.Draw(layer)
    draw.text(xy, text, font=font, fill=(*fill, alpha), stroke_width=1, stroke_fill=(*PLUM, alpha))


def branded_sunnyvaile(
    layer: Image.Image,
    xy: tuple[int, int],
    font: ImageFont.FreeTypeFont,
    alpha: int,
) -> None:
    prefix = "SUNNYV"
    accent = "Ai"
    suffix = "LE"
    draw = ImageDraw.Draw(layer)
    x, y = xy
    neon_text(layer, (x, y), prefix, font, WHITE, ELECTRIC_TEAL, alpha)
    x += int(draw.textlength(prefix, font=font))
    neon_text(layer, (x, y), accent, font, HOT_PINK, HOT_PINK, alpha)
    x += int(draw.textlength(accent, font=font))
    neon_text(layer, (x, y), suffix, font, WHITE, ELECTRIC_TEAL, alpha)


def frame_at(index: int) -> Image.Image:
    t = index / FPS
    image = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))

    # A short VHS/CRT lock line expands into the terminal plaque. The cue then
    # collapses and is fully gone before the final episode-specific reveal.
    if t < 0.18:
        line_alpha = int(255 * ease(t / 0.12) * (1.0 - ease(max(0.0, t - 0.13) / 0.05)))
        draw = ImageDraw.Draw(image)
        draw.rounded_rectangle((74, 187, 928, 197), radius=5, fill=(*WHITE, line_alpha))
        draw.rounded_rectangle((74, 191, 928, 197), radius=3, fill=(*ELECTRIC_TEAL, line_alpha))
        return image

    if t <= 0.50:
        open_amount = ease((t - 0.18) / 0.32)
        opacity = open_amount
    elif t < 2.67:
        open_amount = 1.0
        opacity = 1.0
    elif t < 3.08:
        open_amount = 1.0 - ease((t - 2.67) / 0.41)
        opacity = open_amount
    else:
        return image

    alpha = int(255 * opacity)
    panel_left, panel_right = 64, 952
    centre_y = 202
    full_height = 300
    half_height = max(5, int((full_height / 2) * open_amount))
    panel_top = centre_y - half_height
    panel_bottom = centre_y + half_height

    panel = Image.new("RGBA", image.size, (0, 0, 0, 0))
    panel_draw = ImageDraw.Draw(panel)
    panel_draw.rounded_rectangle(
        (panel_left, panel_top, panel_right, panel_bottom),
        radius=min(28, half_height),
        fill=(*PLUM, int(230 * opacity)),
        outline=(*ELECTRIC_TEAL, int(220 * opacity)),
        width=4,
    )
    if open_amount > 0.9:
        for y in range(panel_top + 9, panel_bottom - 8, 8):
            panel_draw.line((panel_left + 8, y, panel_right - 8, y), fill=(255, 255, 255, int(11 * opacity)), width=1)
    image.alpha_composite(panel)

    if open_amount < 0.72:
        return image

    text_alpha = int(alpha * ease((open_amount - 0.72) / 0.28))
    terminal = ImageFont.truetype(str(MONACO), 26)
    eyebrow = ImageFont.truetype(str(JOST), 38)
    title = ImageFont.truetype(str(JOST), 94)
    sub = ImageFont.truetype(str(MONACO), 28)
    draw = ImageDraw.Draw(image)

    draw.text((100, 78), "SUNNYVAiLE OS // v99.9", font=terminal, fill=(*ELECTRIC_TEAL, text_alpha))
    draw.text((100, 122), "> NOW ENTERING", font=eyebrow, fill=(*CORAL, text_alpha))
    branded_sunnyvaile(image, (98, 158), title, text_alpha)
    draw.text(
        (103, 267),
        "REWIND ERA GLOW-UP: DIALING UP...",
        font=sub,
        fill=(*YELLOW, text_alpha),
    )

    blocks = max(1, min(10, int((max(0.0, t - 0.42) / 2.1) * 10)))
    for block in range(10):
        x0 = 104 + block * 45
        color = ELECTRIC_TEAL if block < blocks else (108, 76, 119)
        draw.rounded_rectangle((x0, 318, x0 + 32, 334), radius=4, fill=(*color, text_alpha))
    draw.text((580, 304), "CONNECTING STORY MODE", font=terminal, fill=(*HOT_PINK, text_alpha))
    return image


def extract_frame(ffmpeg: str, timestamp: float, output: Path) -> None:
    run(
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-ss",
        f"{timestamp:.3f}",
        "-i",
        str(REVIEW),
        "-frames:v",
        "1",
        str(output),
    )


def make_contact() -> None:
    labels = [(0.08, "SIGNAL LOCK"), (0.80, "NOW ENTERING"), (2.20, "DIALING UP"), (3.45, "CUE CLEARED")]
    tiles: list[Image.Image] = []
    label_font = ImageFont.truetype(str(JOST), 28)
    for timestamp, label in labels:
        source = FRAME_DIR / f"review-{timestamp:04.2f}.png"
        tile = Image.open(source).convert("RGB").resize((640, 360), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (640, 408), PLUM)
        canvas.paste(tile, (0, 0))
        ImageDraw.Draw(canvas).text((18, 369), f"{timestamp:04.2f}s · {label}", font=label_font, fill=WHITE)
        tiles.append(canvas)
    contact = Image.new("RGB", (1280, 816), (18, 8, 24))
    for index, tile in enumerate(tiles):
        contact.paste(tile, ((index % 2) * 640, (index // 2) * 408))
    contact.save(CONTACT, optimize=True)


def main() -> None:
    if not SOURCE.exists() or not STYLE_REFERENCE.exists():
        raise SystemExit("Required transformation source or style reference is missing.")
    if not JOST.exists() or not MONACO.exists():
        raise SystemExit("Required brand fonts are missing.")

    OUT.mkdir(parents=True, exist_ok=True)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

    with tempfile.TemporaryDirectory(prefix="sunnyvaile-town-entry-") as temp_name:
        temp = Path(temp_name)
        for index in range(FRAME_COUNT):
            frame_at(index).save(temp / f"cue-{index:04d}.png")
        run(
            ffmpeg,
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-framerate",
            str(FPS),
            "-i",
            str(temp / "cue-%04d.png"),
            "-c:v",
            "qtrle",
            "-pix_fmt",
            "argb",
            str(OVERLAY),
        )

    run(
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        str(SOURCE),
        "-i",
        str(OVERLAY),
        "-filter_complex",
        "[0:v][1:v]overlay=shortest=1:format=auto,fps=30,format=yuv420p[v]",
        "-map",
        "[v]",
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "16",
        "-preset",
        "medium",
        "-movflags",
        "+faststart",
        str(REVIEW),
    )

    for timestamp in (0.08, 0.80, 2.20, 3.45):
        extract_frame(ffmpeg, timestamp, FRAME_DIR / f"review-{timestamp:04.2f}.png")
    make_contact()
    print(f"Built {OVERLAY.relative_to(ROOT)}")
    print(f"Built {REVIEW.relative_to(ROOT)}")
    print(f"Built {CONTACT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
