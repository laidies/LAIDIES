#!/usr/bin/env python3
"""Build the revised 56-second SUNNYVAiLE television opening."""

from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / "assets"
BRAND = ASSETS / "brand"
DELIVERY = ASSETS / "video" / "delivery-20260714-opening-v6"
SHOTS = DELIVERY / "shots"
PROOFS = DELIVERY / "proofs"
BUILDINGS = ROOT / "approved-assets" / "buildings-storefronts"
MUSIC = ROOT / "content" / "music" / "sunnyvaile-town-anthem.mp3"
OUT = DELIVERY / "sunnyvaile-opening-credits-v32-body.mp4"

W, H, FPS = 1920, 1080, 30
DURATION = 71.0
MUSIC_START = 0.0

PLUM = (55, 20, 52)
PINK = (233, 130, 171)
TEAL = (87, 182, 192)
GOLD = (233, 185, 72)
CORAL = (226, 94, 104)
CREAM = (255, 244, 219)

ROCKWELL = "/System/Library/Fonts/Supplemental/Rockwell.ttc"
SIGNPAINTER = "/System/Library/Fonts/Supplemental/SignPainter.ttc"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
AVENIR_CONDENSED = "/System/Library/Fonts/Avenir Next Condensed.ttc"
JOST = DELIVERY / "fonts" / "Jost.ttf"


def font(path: str | Path, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(path), size=size, index=index)
    except OSError:
        return ImageFont.truetype(ARIAL_BOLD, size=size)


def homepage_wordmark() -> Image.Image:
    """Render the canonical homepage LAiDIES live-Jost wordmark for dusk video."""
    face = font(JOST, 260)
    try:
        face.set_variation_by_name("Bold")
    except (AttributeError, OSError):
        pass
    pieces = (("L", CREAM), ("Aı", TEAL), ("DIES", CREAM))
    widths = [round(ImageDraw.Draw(Image.new("RGB", (1, 1))).textlength(text, font=face)) for text, _ in pieces]
    mark = Image.new("RGBA", (sum(widths) + 28, 310), (0, 0, 0, 0))
    draw = ImageDraw.Draw(mark)
    x = 8
    for (text, colour), width in zip(pieces, widths):
        draw.text((x, 4), text, font=face, fill=colour + (255,), stroke_width=0)
        x += width
    # Homepage canon: only the lowercase i tittle is the rose pixel accent.
    ai_start = 8 + widths[0]
    a_width = round(draw.textlength("A", font=face))
    draw.rounded_rectangle((ai_start + a_width + 34, 96, ai_start + a_width + 66, 128), radius=5, fill=PINK + (255,))
    return mark


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


def motion_cover(image: Image.Image, margin: int = 86) -> Image.Image:
    """Pre-size a plate once; deterministic crops provide stable camera motion."""
    image = image.convert("RGB")
    tw, th = W + margin * 2, H + margin * 2
    scale = max(tw / image.width, th / image.height)
    return image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)


def contain_original(image: Image.Image) -> Image.Image:
    """Show a canonical portrait plate completely, without crop or invented extensions."""
    image = image.convert("RGB")
    scale = min(W / image.width, H / image.height)
    fitted = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    frame = Image.new("RGB", (W, H), (9, 20, 24))
    frame.paste(fitted, ((W - fitted.width) // 2, (H - fitted.height) // 2))
    return frame


def pixel_normalize(image: Image.Image) -> Image.Image:
    """Bring approved painterly storefronts into the fine-pixel episode finish."""
    base = cover(image).resize((960, 540), Image.Resampling.LANCZOS)
    base = base.quantize(colors=192, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG).convert("RGB")
    return base.resize((W + 172, H + 172), Image.Resampling.NEAREST)


def camera(image: Image.Image, seconds: float, duration: float, direction: int, travel_px: int = 92) -> Image.Image:
    p = smooth(seconds / duration)
    max_x, max_y = image.width - W, image.height - H
    travel = min(travel_px, max_x)
    x0 = max(0, (max_x - travel) // 2)
    x = x0 + travel * (p if direction > 0 else 1 - p)
    y = max(0.0, max_y / 2 + 4.0 * math.sin(p * math.pi))
    # Float source bounds + bicubic resampling eliminate integer crop stepping.
    return image.transform(
        (W, H), Image.Transform.EXTENT, (x, y, x + W, y + H),
        resample=Image.Resampling.BICUBIC,
    )


def soft_practical_glow(
    frame: Image.Image,
    t: float,
    xy: tuple[int, int],
    *,
    colour: tuple[int, int, int] = GOLD,
    radius: int = 92,
    strength: int = 28,
    speed: float = 1.0,
) -> Image.Image:
    """A restrained breathing practical light, blurred into the photographed source."""
    pulse = 0.35 + 0.65 * (0.5 + 0.5 * math.sin(t * speed))
    spot = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(spot)
    x, y = xy
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=round(strength * pulse))
    spot = spot.filter(ImageFilter.GaussianBlur(radius * 0.58))
    light = Image.new("RGBA", (W, H), colour + (0,))
    light.putalpha(spot)
    return Image.alpha_composite(frame.convert("RGBA"), light).convert("RGB")


def object_light_cycle(
    frame: Image.Image, t: float, xy: tuple[int, int], *, colour: tuple[int, int, int],
    radius: int, strength: int = 70, speed: float = 1.0, phase: float = 0.0,
) -> Image.Image:
    """Add light only to an existing lamp/sign; never lay a dark shape over the scene."""
    pulse = smooth(0.5 + 0.5 * math.sin(t * speed + phase))
    # A compact feathered mask stays on the fixture itself. It is additive only:
    # no dark off-state disc and no broad exposure wash across the image.
    x, y = xy
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    core = max(8, round(radius * 0.36))
    md.ellipse((x - core, y - core, x + core, y + core), fill=round(min(255, strength * pulse * 1.7)))
    mask = mask.filter(ImageFilter.GaussianBlur(max(4, radius * 0.18)))
    light = Image.new("RGBA", (W, H), colour + (0,))
    light.putalpha(mask)
    return Image.alpha_composite(frame.convert("RGBA"), light).convert("RGB")


def natural_cup_steam(frame: Image.Image, t: float, origin: tuple[int, int]) -> Image.Image:
    """Soft multi-wisp steam attached to the cup; no drawn lines or bubble shapes."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    x0, y0 = origin
    # Many overlapping low-alpha particles form continuous translucent wisps.
    for stream, offset in enumerate((-18, 3, 22)):
        for particle in range(11):
            age = ((t * (0.20 + stream * 0.018)) + particle / 11.0 + stream * 0.19) % 1.0
            y = y0 - 18 - age * 185
            drift = math.sin(age * 7.2 + t * 0.72 + stream * 1.8) * (9 + age * 16)
            x = x0 + offset + drift
            width = 13 + age * 25
            height = 22 + age * 32
            alpha = round(108 * math.sin(math.pi * age) ** 0.7)
            puff = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            pd = ImageDraw.Draw(puff)
            pd.ellipse((x - width, y - height, x + width, y + height), fill=(245, 238, 224, alpha))
            puff = puff.filter(ImageFilter.GaussianBlur(10 + age * 12))
            layer = Image.alpha_composite(layer, puff)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def rect_fixture_cycle(
    frame: Image.Image, t: float, bbox: tuple[int, int, int, int], *,
    colour: tuple[int, int, int], strength: int = 115, speed: float = 1.0, phase: float = 0.0,
) -> Image.Image:
    """Illuminate only already-luminous pixels inside a fixture's bounding box."""
    pulse = smooth(0.5 + 0.5 * math.sin(t * speed + phase))
    mask = Image.new("L", (W, H), 0)
    crop = frame.crop(bbox).convert("L")
    # Darkness stays transparent; only existing lettering, bulbs, and screens
    # receive light. This prevents any visible geometric overlay boundary.
    local = crop.point(lambda value: round(max(0, min(255, (value - 118) * 2.2 * pulse * strength / 115))))
    local = local.filter(ImageFilter.GaussianBlur(2.2))
    mask.paste(local, (bbox[0], bbox[1]))
    light = Image.new("RGBA", (W, H), colour + (0,))
    light.putalpha(mask)
    return Image.alpha_composite(frame.convert("RGBA"), light).convert("RGB")


def fixture_blink(
    frame: Image.Image, t: float, bbox: tuple[int, int, int, int], *,
    colour: tuple[int, int, int], strength: int = 135, phase: int = 0, rate: float = 3.0,
) -> Image.Image:
    """Blink only the authored luminous pixels in a fixture—never a geometric glow."""
    # A short repeating bank of held on/off states reads like real studio lights.
    states = (0.0, 1.0, 1.0, 0.0, 0.65, 1.0, 0.0, 1.0)
    pulse = states[(int(t * rate) + phase) % len(states)]
    mask = Image.new("L", (W, H), 0)
    source_crop = frame.crop(bbox)
    crop = source_crop.convert("L")
    local = crop.point(
        lambda value: round(max(0, min(255, (value - 92) * 3.4)))
    )
    # A one-pixel feather preserves the source fixture edges without a halo.
    local = local.filter(ImageFilter.GaussianBlur(0.8))
    mask.paste(local, (bbox[0], bbox[1]))
    if pulse <= 0:
        # Switch off only the luminous authored pixels inside the fixture.
        muted = ImageEnhance.Brightness(source_crop).enhance(0.30)
        muted = ImageEnhance.Color(muted).enhance(0.42)
        off = frame.copy()
        off.paste(muted, (bbox[0], bbox[1]), local)
        return off
    light = Image.new("RGBA", (W, H), colour + (0,))
    light.putalpha(mask.point(lambda value: round(value * pulse * strength / 135)))
    return Image.alpha_composite(frame.convert("RGBA"), light).convert("RGB")


def exposure_breathe(frame: Image.Image, t: float, amount: float = 0.018) -> Image.Image:
    """Sub-frame exposure variation keeps living stills alive without visible overlays."""
    factor = 1.0 + amount * math.sin(t * 0.72)
    return ImageEnhance.Brightness(frame).enhance(factor)


def light_pixel_finish(image: Image.Image) -> Image.Image:
    """Preserve the source's authored fine pixels; add clarity without posterization."""
    return image.convert("RGB").filter(ImageFilter.UnsharpMask(radius=0.55, percent=55, threshold=4))


def postcard_frame(image: Image.Image, seconds: float) -> Image.Image:
    """Full-bleed postcard artwork: crop beyond its printed outer border."""
    p = smooth(seconds / 5.0)
    scale = max(W / image.width, H / image.height) * (1.055 + 0.010 * p)
    art = image.convert("RGB").resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )
    x = (art.width - W) // 2
    # Bottom-bias preserves the complete SUNNYVAiLE title and handwritten line;
    # the added scale keeps the printed postcard border outside the video frame.
    y = max(0, art.height - H - 18)
    return art.crop((x, y, x + W, y + H))


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
    tracked_text(draw, (22, 8), "STARRING", font(AVENIR_CONDENSED, 34, index=3), PINK + (255,), 7)

    name_size = 108
    name_font = font(AVENIR_CONDENSED, name_size, index=9)
    while draw.textbbox((0, 0), name, font=name_font, stroke_width=10)[2] > 1630:
        name_size -= 4
        name_font = font(AVENIR_CONDENSED, name_size, index=9)
    layered_text(draw, (15, 49), name, name_font, front=TEAL, mid=CREAM, back=PINK, front_stroke=5)

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


def place_credit(frame: Image.Image, card: Image.Image, seconds: float, duration: float) -> Image.Image:
    """Sitcom pop-in, long hold, clean fade. Background never moves."""
    if seconds < 0.58 or seconds > duration - 0.08:
        return frame
    if seconds < 0.94:
        p = smooth((seconds - 0.58) / 0.36)
        scale = 0.90 + 0.15 * p
        opacity = p
    elif seconds < 1.16:
        p = smooth((seconds - 0.94) / 0.22)
        scale = 1.05 - 0.05 * p
        opacity = 1.0
    elif seconds > duration - 0.40:
        scale = 1.0
        opacity = 1.0 - smooth((seconds - (duration - 0.40)) / 0.32)
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
    # Continuous open S-curves read as steam; detached arcs looked like bubbles.
    for index in range(2):
        phase = (t * 0.18 + index * 0.41) % 1.0
        rise = round(28 * phase)
        points = []
        for step in range(34):
            u = step / 33
            yy = y - rise - round(105 * u)
            xx = x + (index * 13 - 7) + round(8 * math.sin(u * math.pi * 2.2 + t * 0.7 + index))
            points.append((xx, yy))
        # A single open tapered-looking wisp, never a loop or closed circle.
        draw.line(points, fill=CREAM + (58,), width=3, joint="curve")
        draw.line(points[10:], fill=CREAM + (34,), width=2, joint="curve")
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def sparkle_cluster(frame: Image.Image, t: float, x: int, y: int) -> Image.Image:
    """Small open four-point wand/string-light twinkles; never bubbles."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for index, (dx, dy) in enumerate(((0, 0), (27, -24), (-22, -35), (38, 12))):
        pulse = max(0.0, math.sin(t * 3.1 + index * 1.7))
        radius = 3 + round(7 * pulse)
        alpha = round(55 + 180 * pulse)
        cx, cy = x + dx, y + dy
        draw.line((cx - radius, cy, cx + radius, cy), fill=CREAM + (alpha,), width=2)
        draw.line((cx, cy - radius, cx, cy + radius), fill=GOLD + (alpha,), width=2)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def equipment_pulse(frame: Image.Image, t: float, x: int, y: int, colour=PINK) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    pulse = 0.5 + 0.5 * math.sin(t * 3.6)
    for index in range(5):
        height = 5 + round((10 + index * 3) * (0.35 + 0.65 * abs(math.sin(t * 2.4 + index))))
        draw.rectangle((x + index * 13, y - height, x + index * 13 + 6, y), fill=colour + (round(70 + 130 * pulse),))
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def crt_scan(frame: Image.Image, t: float, x: int, y: int, width: int) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    yy = y + round((t * 38) % 115)
    draw.line((x, yy, x + width, yy), fill=TEAL + (80,), width=2)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def stamp_flash(frame: Image.Image, t: float, x: int, y: int) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    beat = max(0.0, math.sin(t * math.pi * 1.4)) ** 6
    inset = round(8 * beat)
    draw.rectangle((x - inset, y - inset, x + 118 + inset, y + 48 + inset), outline=CORAL + (round(150 * beat),), width=3)
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
    # Preserve the canonical homepage cream/teal/rose colour assignment.
    glow_layer = Image.new("RGBA", mark.size, PINK + (0,))
    glow_layer.putalpha(glow.point(lambda value: round(value * 0.58 * p * out)))
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
    (0.0, 4.0, "establishing", None),
    (4.0, 8.5, "heroine", ("YOUR HEROINE", "a few steps ahead of you")),
    (8.5, 11.35, "mainstreet", None),
    (11.35, 14.20, "mme_exterior", None),
    (14.20, 18.70, "mme", ("MME CLAi-O", "the read, the message, the move")),
    (18.70, 21.55, "ksvl", None),
    (21.55, 26.05, "dj", ("DJ SUNNYV", "KSVL 99.9, on the air")),
    (26.05, 28.90, "schoolhouse", None),
    (28.90, 31.75, "wisteria", None),
    (31.75, 36.25, "mayor", ("MAYOR DEB", "Mayor of SUNNYVAiLE")),
    (36.25, 39.10, "willow", None),
    (39.10, 43.60, "fairy", ("THE FAiRY GODMOTHER", "the town's own AI")),
    (43.60, 46.45, "luminairy", None),
    (46.45, 49.30, "dreamphone", None),
    (49.30, 53.80, "barista", ("THE BARISTA", "at the Blend & Snap")),
    (53.80, 56.65, "library_exterior", None),
    (56.65, 61.15, "jeeves", ("MISS JEEVES", "the LIBRAiRY reference desk")),
    (61.15, 66.0, "crew", None),
    (66.0, 71.0, "postcard", None),
]


def staged_action(
    images: dict[str, Image.Image], keys: list[str], seconds: float, *, continuous: bool = False
) -> Image.Image:
    """Blend through real intermediate poses; the limb and prop advance together."""
    # Hold the establishing pose, move through each keyframe, then hold the result.
    progress = smooth((seconds - 0.72) / 1.75)
    position = progress * (len(keys) - 1)
    left = min(len(keys) - 1, int(position))
    right = min(len(keys) - 1, left + 1)
    # Hold each authored pose, then use only the final quarter of the interval
    # for a short optical dissolve. Long blends made moving props appear twice.
    phase = position - left
    mix = smooth(phase) if continuous else smooth((phase - 0.75) / 0.25)
    return Image.blend(images[keys[left]], images[keys[right]], mix)


def scene_at(t: float) -> tuple[int, float, str, tuple[str, str] | None]:
    for index, (start, end, key, credit) in enumerate(SCENES):
        if start <= t < end or (index == len(SCENES) - 1 and t >= start):
            return index, t - start, key, credit
    raise ValueError(t)


def make_frame(
    t: float,
    images: dict[str, Image.Image],
    cards: dict[str, Image.Image],
    _transition: bool = True,
) -> Image.Image:
    index, seconds, key, credit = scene_at(t)
    duration = SCENES[index][1] - SCENES[index][0]
    district_keys = {"mainstreet", "mme_exterior", "schoolhouse", "wisteria", "willow", "dreamphone", "library_exterior", "postcard"}
    action_sequences = {
        # Cast remain still; Fairy Godmother's separate envelope/wand prop changes.
        "fairy": ["fairy", "fairy_start"],
        "ksvl": ["ksvl_dark", "ksvl"],
        "luminairy": ["luminairy_dark", "luminairy"],
    }
    if key == "postcard":
        frame = postcard_frame(images[key], seconds)
    else:
        source = images[key]
        if key in action_sequences:
            source = staged_action(images, action_sequences[key], seconds)
        # Grace-reference pacing: slow and deliberate, never a fast Ken Burns sweep.
        frame = camera(source, seconds, duration, 1 if index % 2 else -1, 8 if key in district_keys else 28)

    glow_points = {
        "establishing": (1502, 222), "heroine": (600, 780), "mme": (515, 598),
        "ksvl": (1494, 210), "dj": (350, 255), "mayor": (635, 380),
        "luminairy": (1010, 540), "fairy": (1250, 430), "barista": (505, 260),
        "jeeves": (950, 215),
        "crew": (980, 180),
    }
    # Living-still motion is integrated as practical light/exposure changes.
    # No drawn steam, sparkles, scan lines, rings, or random decorative marks.
    practicals = {
        "establishing": ((1502, 222), PINK, 90, 18, 1.15),
        "mainstreet": ((980, 185), TEAL, 68, 42, 0.90),
        "ksvl": ((1494, 210), CORAL, 78, 28, 1.20),
        "luminairy": ((1010, 540), GOLD, 95, 22, 0.68),
        "dreamphone": ((960, 510), TEAL, 105, 28, 1.08),
        "library_exterior": ((890, 355), GOLD, 75, 20, 0.78),
    }
    if key in practicals:
        xy, colour, radius, strength, speed = practicals[key]
        # Town lights need to read as animation at normal playback size.
        if key in {"ksvl", "luminairy", "dreamphone", "establishing"}:
            strength = round(strength * 2.25)
            radius = round(radius * 1.18)
        frame = soft_practical_glow(
            frame, seconds, xy, colour=colour, radius=radius, strength=strength, speed=speed
        )
    # Character motion is prop-specific only. Never wash animated light over faces.
    if key == "mme_exterior":
        # Crystal ball and vertical PSYCHIC neon in the connected three-store row.
        frame = object_light_cycle(frame, seconds, (720, 625), colour=PINK, radius=64, strength=120, speed=1.8)
        frame = object_light_cycle(frame, seconds, (1112, 535), colour=TEAL, radius=48, strength=108, speed=1.35, phase=1.4)
    elif key == "mme":
        # The crystal ball is well left of her face.
        frame = object_light_cycle(frame, seconds, (190, 500), colour=PINK, radius=82, strength=122, speed=1.7)
    elif key == "dj":
        # One restrained authored fixture only. Nothing touches her body or lava lamp.
        frame = fixture_blink(frame, seconds, (650, 75, 845, 220), colour=CORAL, strength=145, phase=0, rate=2.5)
    elif key == "schoolhouse":
        frame = rect_fixture_cycle(frame, seconds, (825, 365, 1095, 405), colour=GOLD, strength=110, speed=1.45)
        frame = rect_fixture_cycle(frame, seconds, (865, 455, 1055, 535), colour=TEAL, strength=78, speed=1.95, phase=1.6)
    elif key == "wisteria":
        frame = rect_fixture_cycle(frame, seconds, (650, 350, 1260, 450), colour=PINK, strength=105, speed=1.55)
        frame = rect_fixture_cycle(frame, seconds, (650, 470, 1280, 540), colour=GOLD, strength=92, speed=1.95, phase=1.4)
    elif key == "barista":
        # Neon coffee-cup sign and espresso-machine indicator; both avoid her face.
        frame = rect_fixture_cycle(frame, seconds, (205, 190, 350, 320), colour=PINK, strength=105, speed=1.65)
        frame = rect_fixture_cycle(frame, seconds, (1360, 395, 1460, 450), colour=TEAL, strength=90, speed=2.1, phase=1.3)
    elif key == "jeeves":
        # CRT display and glass-block desk light, away from Miss Jeeves herself.
        frame = rect_fixture_cycle(frame, seconds, (235, 220, 430, 390), colour=TEAL, strength=105, speed=1.5)
        frame = rect_fixture_cycle(frame, seconds, (940, 120, 1120, 300), colour=PINK, strength=62, speed=1.25, phase=1.5)
    elif key == "postcard":
        frame = rect_fixture_cycle(frame, seconds, (1325, 365, 1435, 455), colour=PINK, strength=98, speed=1.2)
        frame = rect_fixture_cycle(frame, seconds, (880, 315, 1170, 380), colour=GOLD, strength=82, speed=1.55, phase=1.8)
    # Apply the reference's fine, high-resolution pixel/dither surface after all
    # camera resampling, then draw the broadcast typography cleanly on top.
    frame = light_pixel_finish(frame)

    if credit:
        frame = darken_lower_left(frame)
        frame = place_credit(frame, cards[key], seconds, duration)
    elif key == "establishing":
        frame = logo_bloom(frame, images["wordmark"], seconds)

    if t < 0.75:
        frame = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), frame, smooth(t / 0.75))
    if t > 69.2:
        frame = Image.blend(frame, Image.new("RGB", (W, H), (0, 0, 0)), smooth((t - 69.2) / 1.8))
    # A short optical dissolve removes hard visual jumps without making the
    # beat-driven edit feel mushy. Previous frames are rendered without recursion.
    if _transition and index > 0 and seconds < 0.20:
        previous = make_frame(SCENES[index][0] - 1.0 / FPS, images, cards, False)
        frame = Image.blend(previous, frame, smooth(seconds / 0.20))
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
        "heroine": SHOTS / "opening-02-heroine-camera-smile-v14.png",
        "heroine_start": SHOTS / "opening-02-heroine-bright-yellow-natural-hands-v13.png",
        "mme": SHOTS / "opening-03-mme-claio-clean-face.png",
        "ksvl": SHOTS / "opening-04-ksvl-tower.png",
        "ksvl_dark": SHOTS / "opening-04-ksvl-lights-off-v2.png",
        "dj": SHOTS / "opening-05-dj-sunnyv-no-face-artifact-v2.png",
        "dj_action": SHOTS / "opening-05-dj-headphone-mic-action-v3.png",
        "mayor": SHOTS / "opening-06-mayor-deb-stamp-release-v23.png",
        "mayor_clean": SHOTS / "opening-06-mayor-deb-clean-paper-v23.png",
        "mayor_contact": SHOTS / "opening-06-mayor-deb-stamp-contact-v23.png",
        "mayor_release": SHOTS / "opening-06-mayor-deb-stamp-release-v23.png",
        "luminairy": SHOTS / "opening-07-luminairy.png",
        "luminairy_dark": SHOTS / "opening-07-luminairy-lights-off-v2.png",
        "fairy": SHOTS / "opening-08-fairy-letter-raised-v2.png",
        "fairy_start": SHOTS / "opening-08-fairy-godmother-house-continuity.png",
        "barista": SHOTS / "opening-09-barista-approved-identity-v2.png",
        "barista_start": SHOTS / "opening-09-barista-cup-down-v3.png",
        "barista_quarter": SHOTS / "opening-09-barista-cup-quarter-v6.png",
        "barista_mid": SHOTS / "opening-09-barista-cup-true-mid-v5.png",
        "barista_three_quarter": SHOTS / "opening-09-barista-cup-three-quarter-v6.png",
        "jeeves": SHOTS / "opening-10-miss-jeeves-approved-wide.png",
        "jeeves_action": SHOTS / "opening-10-miss-jeeves-files-card-v2.png",
        "crew": SHOTS / "opening-11-crew-camera-smiles-v10.png",
        "mainstreet": ASSETS / "sunnyvaile-buildings" / "y2k-v3-defairytale" / "episode-pixel" / "three-store-rows" / "01-welcome-newsstand-chick-flicks-pixel-v1.png",
        "mme_exterior": ASSETS / "sunnyvaile-buildings" / "y2k-v3-defairytale" / "episode-pixel" / "06-mme-claios-shop-map-continuity-pixel-v1.png",
        "schoolhouse": ASSETS / "sunnyvaile-streets" / "schoolhouse-road-morning.webp",
        "wisteria": SHOTS / "opening-town-delta-lai-nu-user-v28.png",
        "willow": SHOTS / "opening-town-fairy-godmother-house-user-v29.png",
        "dreamphone": ASSETS / "sunnyvaile-buildings" / "y2k-v3" / "17-dream-phone-booth.webp",
        "library_exterior": ASSETS / "sunnyvaile-buildings" / "y2k-v3-rendered-signs" / "03-town-library.png",
        "postcard": SHOTS / "opening-12-pc-welcome-no-flags.png",
    }
    sources.update({
        f"barista_motion_{i:02d}": SHOTS / f"opening-09-barista-motion-{i:02d}-v7.png"
        for i in range(13)
    })
    for name, count in {"heroine": 7, "dj": 7, "mayor": 13, "fairy": 7, "jeeves": 7, "crew": 13}.items():
        sources.update({
            f"{name}_motion_{i:02d}": SHOTS / f"opening-{name}-motion-{i:02d}-v15.png"
            for i in range(count)
        })
    missing = [str(path) for path in list(sources.values()) + [MUSIC] if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n" + "\n".join(missing))
    loaded: dict[str, Image.Image] = {}
    for key, path in sources.items():
        image = Image.open(path)
        if key == "postcard":
            loaded[key] = image.convert("RGB")
        elif key in {"crew", "mainstreet", "mme_exterior", "library_exterior"}:
            # Keep all seven cast members in frame; the ensemble is a locked-off hero beat.
            loaded[key] = cover(image)
        else:
            loaded[key] = motion_cover(image)
    loaded["wordmark"] = Image.open(SHOTS / "laidies-homepage-wordmark-exact-v20.png").convert("RGBA")
    return loaded


def make_cards() -> dict[str, Image.Image]:
    return {
        key: credit_card(*credit)
        for _, _, key, credit in SCENES if credit is not None
    }


def write_proofs(images: dict[str, Image.Image], cards: dict[str, Image.Image]) -> None:
    PROOFS.mkdir(parents=True, exist_ok=True)
    proof_times = [2.4, 6.2, 9.7, 12.7, 16.4, 20.1, 23.8, 27.4, 30.2, 33.9, 37.6, 41.3, 45.0, 47.8, 51.5, 55.2, 58.8, 63.2, 68.2]
    thumbs: list[Image.Image] = []
    for index, seconds in enumerate(proof_times, start=1):
        frame = make_frame(seconds, images, cards)
        path = PROOFS / f"opening-v6-proof-{index:02d}.jpg"
        frame.save(path, quality=92)
        thumbs.append(frame.resize((480, 270), Image.Resampling.LANCZOS))
    rows = math.ceil(len(thumbs) / 4)
    sheet = Image.new("RGB", (1920, rows * 270), (20, 8, 20))
    for index, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((index % 4) * 480, (index // 4) * 270))
    sheet.save(PROOFS / "opening-v6-contact-sheet.jpg", quality=94)


def encode(images: dict[str, Image.Image], cards: dict[str, Image.Image]) -> None:
    ffmpeg = ffmpeg_path()
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "-",
        "-ss", f"{MUSIC_START:.2f}", "-t", f"{DURATION:.2f}", "-i", str(MUSIC),
        "-map", "0:v:0", "-map", "1:a:0", "-t", f"{DURATION:.2f}",
        "-vf", "format=yuv420p",
        "-af", "afade=t=in:st=0:d=0.75,afade=t=out:st=69.4:d=1.6,atrim=duration=71",
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
        print(PROOFS / "opening-v6-contact-sheet.jpg")
    else:
        encode(images, cards)
        print(OUT)


if __name__ == "__main__":
    main()
