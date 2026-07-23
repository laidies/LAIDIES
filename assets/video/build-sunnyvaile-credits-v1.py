#!/usr/bin/env python3
"""Build the SUNNYVAiLE opening and closing credits videos.

Production notes:
- Opening audio: 2:50.7–3:27.7 of Wednesdays in SUNNYVAiLE, faded in/out.
- Closing audio: 3:27.7–end, faded in only.
- All character plates are original project-bound image-generation outputs.
- The heroine uses the approved four-frame Episode 4 walk cycle from the repo.
"""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[2]
VIDEO_DIR = ROOT / "assets" / "video"
PLATES_DIR = VIDEO_DIR / "sunnyvaile-credits-v1-plates"
EP4_DIR = ROOT / "assets" / "episodes" / "ep-04" / "pixel"
MUSIC = ROOT / "content" / "music" / "the-laidies-wednesday-in-sunnyvaile.mp3"
WORDMARK = ROOT / "assets" / "brand" / "laidies-wordmark-final-b-dark.png"

OPENING_OUT = VIDEO_DIR / "sunnyvaile-opening-credits-v1.mp4"
CLOSING_OUT = VIDEO_DIR / "sunnyvaile-closing-credits-v1.mp4"

W, H, FPS = 1920, 1080, 30
OPENING_DURATION = 37.0
SONG_END = 243.74
CLOSING_START = 207.7
CLOSING_DURATION = SONG_END - CLOSING_START

PLUM = (75, 33, 72)
DEEP_PLUM = (42, 17, 45)
ROSE = (155, 63, 95)
PINK = (233, 130, 171)
TEAL = (87, 182, 192)
GOLD = (201, 162, 39)
CREAM = (255, 253, 251)

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_CONDENSED = "/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size=size)
    except OSError:
        return ImageFont.truetype(FONT_BOLD, size=size)


def clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, value))


def ease(value: float) -> float:
    value = clamp(value)
    return value * value * (3.0 - 2.0 * value)


def alpha_curve(t: float, start: float, end: float, fade: float = 0.35) -> float:
    if t < start or t >= end:
        return 0.0
    return min(clamp((t - start) / fade), clamp((end - t) / fade))


def crop_cover(image: Image.Image, scale: float, pan_x: float, pan_y: float) -> Image.Image:
    image = image.convert("RGB")
    cover = max(W / image.width, H / image.height) * scale
    width = max(W, round(image.width * cover))
    height = max(H, round(image.height * cover))
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    max_x, max_y = width - W, height - H
    left = round(clamp(pan_x) * max_x)
    top = round(clamp(pan_y) * max_y)
    frame = resized.crop((left, top, left + W, top + H))
    return ImageEnhance.Sharpness(frame).enhance(1.08)


def ken_burns(image: Image.Image, local: float, zoom0: float, zoom1: float,
              pan0: tuple[float, float], pan1: tuple[float, float]) -> Image.Image:
    p = ease(local)
    scale = zoom0 + (zoom1 - zoom0) * p
    pan_x = pan0[0] + (pan1[0] - pan0[0]) * p
    pan_y = pan0[1] + (pan1[1] - pan0[1]) * p
    return crop_cover(image, scale, pan_x, pan_y)


def rounded_panel(size: tuple[int, int], fill: tuple[int, int, int, int]) -> Image.Image:
    panel = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(panel)
    draw.rounded_rectangle((3, 3, size[0] - 4, size[1] - 4), radius=20,
                           fill=fill, outline=GOLD + (235,), width=4)
    draw.line((22, 18, 22, size[1] - 18), fill=TEAL + (255,), width=7)
    return panel


def lower_third(name: str, job: str, side: str, progress: float) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    panel_w, panel_h = 735, 154
    panel = rounded_panel((panel_w, panel_h), DEEP_PLUM + (226,))
    draw = ImageDraw.Draw(panel)
    name_font = font(FONT_CONDENSED, 50)
    job_font = font(FONT_BOLD, 26)
    draw.text((50, 25), name, font=name_font, fill=CREAM + (255,),
              stroke_width=1, stroke_fill=PLUM + (255,))
    draw.text((52, 92), job, font=job_font, fill=PINK + (255,))

    pop = 1.0 + 0.06 * math.sin(clamp(progress) * math.pi)
    panel = panel.resize((round(panel_w * pop), round(panel_h * pop)), Image.Resampling.LANCZOS)
    target_x = 76 if side == "left" else W - panel.width - 76
    offset = round((1.0 - ease(progress)) * (panel.width + 110))
    x = target_x - offset if side == "left" else target_x + offset
    y = H - panel.height - 70
    layer.alpha_composite(panel, (x, y))
    return layer


def add_lower_third(frame: Image.Image, t: float, start: float, end: float,
                    name: str, job: str, side: str) -> Image.Image:
    show_start = start + 0.45
    show_end = end - 0.28
    if not (show_start <= t < show_end):
        return frame
    in_p = clamp((t - show_start) / 0.42)
    out_p = clamp((show_end - t) / 0.28)
    progress = min(in_p, out_p)
    layer = lower_third(name, job, side, progress)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def add_vignette(frame: Image.Image, strength: int = 38) -> Image.Image:
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for i in range(90):
        alpha = round(strength * (1 - i / 90) ** 2)
        draw.rounded_rectangle((i, i, W - i - 1, H - i - 1), radius=85,
                               outline=alpha, width=2)
    shade = Image.new("RGBA", (W, H), (21, 7, 25, 255))
    shade.putalpha(mask)
    return Image.alpha_composite(frame.convert("RGBA"), shade).convert("RGB")


def fade_black(frame: Image.Image, amount: float) -> Image.Image:
    amount = clamp(amount)
    if amount <= 0:
        return frame
    return Image.blend(frame.convert("RGB"), Image.new("RGB", (W, H), (0, 0, 0)), amount)


def draw_centered(draw: ImageDraw.ImageDraw, text: str, y: int,
                  text_font: ImageFont.FreeTypeFont, fill: tuple[int, int, int, int],
                  stroke: int = 0, stroke_fill: tuple[int, int, int, int] | None = None) -> None:
    box = draw.textbbox((0, 0), text, font=text_font, stroke_width=stroke)
    x = (W - (box[2] - box[0])) // 2
    draw.text((x, y), text, font=text_font, fill=fill,
              stroke_width=stroke, stroke_fill=stroke_fill)


def title_background(t: float) -> Image.Image:
    image = Image.new("RGB", (W, H), DEEP_PLUM)
    draw = ImageDraw.Draw(image)
    for y in range(H):
        p = y / H
        color = tuple(round(DEEP_PLUM[i] * (1 - p) + PLUM[i] * p) for i in range(3))
        draw.line((0, y, W, y), fill=color)
    for i in range(46):
        x = (i * 307 + 71) % W
        y = (i * 181 + 43) % H
        phase = 0.55 + 0.45 * math.sin(t * 4.2 + i)
        r = 1 + (i % 3)
        sparkle = tuple(round(channel * (0.55 + 0.45 * phase)) for channel in GOLD)
        draw.rectangle((x - r, y - r, x + r, y + r), fill=sparkle)
    return image


def opening_title_frame(t: float, wordmark: Image.Image) -> Image.Image:
    frame = title_background(t)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    if t < 34.1:
        a = alpha_curve(t, 32.0, 34.2, 0.35)
        mark = wordmark.copy().convert("RGBA")
        scale = min(1120 / mark.width, 390 / mark.height)
        mark = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.Resampling.LANCZOS)
        mark.putalpha(mark.getchannel("A").point(lambda px: round(px * a)))
        layer.alpha_composite(mark, ((W - mark.width) // 2, (H - mark.height) // 2 - 20))
    else:
        a = alpha_curve(t, 33.85, 37.0, 0.34)
        title_font = font(FONT_CONDENSED, 180)
        sub_font = font(FONT_BOLD, 34)
        title = "SUNNYVAiLE"
        box = draw.textbbox((0, 0), title, font=title_font, stroke_width=7)
        x = (W - (box[2] - box[0])) // 2
        draw.text((x + 10, 410 + 10), title, font=title_font, fill=ROSE + (round(220 * a),),
                  stroke_width=7, stroke_fill=GOLD + (round(230 * a),))
        draw.text((x, 410), title, font=title_font, fill=CREAM + (round(255 * a),),
                  stroke_width=4, stroke_fill=PLUM + (round(255 * a),))
        ai_prefix = "SUNNYV"
        prefix_w = draw.textlength(ai_prefix, font=title_font)
        draw.text((x + prefix_w, 410), "Ai", font=title_font,
                  fill=TEAL + (round(255 * a),), stroke_width=4,
                  stroke_fill=PLUM + (round(255 * a),))
        draw_centered(draw, "WHERE GIRL POWER MEETS MACHINE POWER", 640, sub_font,
                      TEAL + (round(235 * a),))
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def opening_frame(t: float, plates: dict[str, Image.Image], heroine: list[Image.Image],
                  wordmark: Image.Image) -> Image.Image:
    cuts = [
        (0.0, 4.5, "street", "Your Heroine", "a few steps ahead of you", "left"),
        (4.5, 9.5, "mme", "Mme CLAi-O", "the read, the message, the move", "right"),
        (9.5, 14.5, "dj", "DJ SunnyV", "KSVL 99.9, on the air", "left"),
        (14.5, 19.5, "mayor", "Mayor Deb", "Mayor of SUNNYVAiLE", "right"),
        (19.5, 24.5, "fairy", "The FAiRY Godmother", "the town's own AI", "left"),
        (24.5, 29.5, "barista", "The Barista", "at the Blend & Snap", "right"),
    ]
    if t >= 32.0:
        frame = opening_title_frame(t, wordmark)
    elif t >= 29.5:
        index = min(5, int((t - 29.5) / (2.5 / 6)))
        key = ["street", "mme", "dj", "mayor", "fairy", "barista"][index]
        local = ((t - 29.5) % (2.5 / 6)) / (2.5 / 6)
        frame = ken_burns(plates[key], local, 1.02, 1.08,
                          (0.15 + 0.12 * (index % 2), 0.42),
                          (0.80 - 0.12 * (index % 2), 0.47))
        if local < 0.07:
            frame = Image.blend(frame, Image.new("RGB", (W, H), CREAM), (0.07 - local) / 0.07 * 0.32)
    else:
        cut = next(c for c in cuts if c[0] <= t < c[1])
        start, end, key, name, job, side = cut
        local = (t - start) / (end - start)
        pan0 = (0.05, 0.50) if side == "left" else (0.95, 0.46)
        pan1 = (0.58, 0.48) if side == "left" else (0.38, 0.50)
        frame = ken_burns(plates[key], local, 1.02, 1.085, pan0, pan1)

        if key == "street":
            sprite = heroine[int(t * 8) % len(heroine)].copy()
            sprite_h = 700
            sprite_w = round(sprite.width * sprite_h / sprite.height)
            sprite = sprite.resize((sprite_w, sprite_h), Image.Resampling.LANCZOS)
            center_x = round(-210 + (W + 420) * ease(local))
            x = center_x - sprite_w // 2
            y = H - sprite_h - 42 + round(7 * math.sin(t * math.pi * 4))
            rgba = frame.convert("RGBA")
            shadow = Image.new("RGBA", (sprite_w + 80, 90), (0, 0, 0, 0))
            sd = ImageDraw.Draw(shadow)
            sd.ellipse((12, 20, shadow.width - 12, shadow.height - 10), fill=(31, 12, 35, 95))
            shadow = shadow.filter(ImageFilter.GaussianBlur(12))
            rgba.alpha_composite(shadow, (x - 40, H - 108))
            rgba.alpha_composite(sprite, (x, y))
            frame = rgba.convert("RGB")

        frame = add_lower_third(frame, t, start, end, name, job, side)
        frame = add_vignette(frame, 30)

    frame = fade_black(frame, 1.0 - clamp(t / 0.75))
    frame = fade_black(frame, clamp((t - 36.0) / 1.0))
    return frame


def closing_frame(t: float, town: Image.Image) -> Image.Image:
    local = clamp(t / CLOSING_DURATION)
    frame = ken_burns(town, local, 1.015, 1.10, (0.34, 0.36), (0.68, 0.47))
    frame = ImageEnhance.Brightness(frame).enhance(1.0 - 0.14 * ease(local))
    frame = add_vignette(frame, 54)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    if 7.5 <= t < 19.0:
        a1 = alpha_curve(t, 7.5, 15.0, 0.8)
        a2 = alpha_curve(t, 11.0, 19.0, 0.8)
        sign_font = font(FONT_CONDENSED, 112)
        town_font = font(FONT_CONDENSED, 138)
        draw_centered(draw, "See you next Wednesday", 325, sign_font,
                      CREAM + (round(255 * a1),), stroke=4,
                      stroke_fill=PLUM + (round(255 * a1),))
        title = "in SUNNYVAiLE"
        box = draw.textbbox((0, 0), title, font=town_font, stroke_width=5)
        x = (W - (box[2] - box[0])) // 2
        draw.text((x, 490), title, font=town_font, fill=PINK + (round(255 * a2),),
                  stroke_width=5, stroke_fill=DEEP_PLUM + (round(255 * a2),))
        prefix_w = draw.textlength("in SUNNYV", font=town_font)
        draw.text((x + prefix_w, 490), "Ai", font=town_font,
                  fill=TEAL + (round(255 * a2),), stroke_width=5,
                  stroke_fill=DEEP_PLUM + (round(255 * a2),))

    if t >= 24.0:
        dark = clamp((t - 24.0) / 2.0) * 0.86
        overlay = Image.alpha_composite(overlay, Image.new("RGBA", (W, H), DEEP_PLUM + (round(255 * dark),)))
        draw = ImageDraw.Draw(overlay)
        a = alpha_curve(t, 25.0, CLOSING_DURATION + 0.25, 0.8)
        domain_font = font(FONT_CONDENSED, 146)
        episode_font = font(FONT_BOLD, 40)
        letters_font = font(FONT_BOLD, 32)
        draw_centered(draw, "ladies.ai", 365, domain_font, CREAM + (round(255 * a),),
                      stroke=3, stroke_fill=PLUM + (round(255 * a),))
        draw_centered(draw, "new episode every Wednesday", 570, episode_font,
                      PINK + (round(255 * a),))
        if t >= 29.2:
            letters_a = clamp((t - 29.2) / 0.8)
            draw_centered(draw, "L,  A,  i,  D,  I,  E,  S", 680, letters_font,
                          TEAL + (round(235 * letters_a),))

    frame = Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")
    frame = fade_black(frame, 1.0 - clamp(t / 1.0))
    frame = fade_black(frame, clamp((t - (CLOSING_DURATION - 1.4)) / 1.4))
    return frame


def ffmpeg_path() -> str:
    result = subprocess.run(
        ["/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3",
         "-c", "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"],
        check=True, capture_output=True, text=True,
    )
    return result.stdout.strip()


def encode_video(path: Path, duration: float, audio_start: float,
                 frame_builder, fade_out_audio: bool) -> None:
    ffmpeg = ffmpeg_path()
    total_frames = round(duration * FPS)
    audio_filter = "afade=t=in:st=0:d=1"
    if fade_out_audio:
        audio_filter += f",afade=t=out:st={duration - 1:.3f}:d=1"
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "-",
        "-ss", f"{audio_start:.3f}", "-t", f"{duration:.3f}", "-i", str(MUSIC),
        "-map", "0:v:0", "-map", "1:a:0",
        "-vf", "format=yuv420p",
        "-af", audio_filter,
        "-c:v", "libx264", "-preset", "slow", "-crf", "17",
        "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k", "-ar", "48000",
        "-movflags", "+faststart", "-shortest", str(path),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for index in range(total_frames):
            frame = frame_builder(index / FPS).convert("RGB")
            process.stdin.write(frame.tobytes())
    finally:
        process.stdin.close()
    if process.wait() != 0:
        raise SystemExit(f"ffmpeg failed while creating {path}")


def main() -> None:
    required = {
        "street": PLATES_DIR / "opening-01-main-street.png",
        "mme": PLATES_DIR / "opening-02-mme-claio.png",
        "dj": PLATES_DIR / "opening-03-dj-sunnyv.png",
        "mayor": PLATES_DIR / "opening-04-mayor-deb.png",
        "fairy": PLATES_DIR / "opening-05-fairy-godmother.png",
        "barista": PLATES_DIR / "opening-06-barista.png",
        "closing": PLATES_DIR / "closing-01-town-dusk.png",
    }
    missing = [str(path) for path in required.values() if not path.exists()]
    if missing:
        raise SystemExit("Missing plate(s):\n" + "\n".join(missing))

    plates = {key: Image.open(path).convert("RGB") for key, path in required.items() if key != "closing"}
    town = Image.open(required["closing"]).convert("RGB")
    heroine = [
        Image.open(EP4_DIR / f"ep04-scene-02a-heroine-walk-cycle-v3n-{letter}.png").convert("RGBA")
        for letter in "abcd"
    ]
    wordmark = Image.open(WORDMARK).convert("RGBA")

    encode_video(
        OPENING_OUT, OPENING_DURATION, 170.7,
        lambda t: opening_frame(t, plates, heroine, wordmark),
        fade_out_audio=True,
    )
    encode_video(
        CLOSING_OUT, CLOSING_DURATION, CLOSING_START,
        lambda t: closing_frame(t, town),
        fade_out_audio=False,
    )


if __name__ == "__main__":
    main()
