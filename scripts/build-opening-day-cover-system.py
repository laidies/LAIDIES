#!/usr/bin/env python3
"""Build the held opening-day episode-cover family from canonical identity art.

This renderer is deterministic and intentionally does not bind any output to a
public page. Exact episode titles are drawn with local Jost fonts so generated
image text cannot drift or misspell canon.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "media" / "opening-day-covers-v1"
RECEIPT = ROOT / "operations" / "video-qa" / "opening-day-cover-system-v1" / "cover-build.json"

FONT_REGULAR = ROOT / "operations" / "design-explorations" / "study-pack-storefront-20260728" / "prototype" / "public" / "fonts" / "Jost-Regular.ttf"
FONT_SEMIBOLD = ROOT / "operations" / "design-explorations" / "study-pack-storefront-20260728" / "prototype" / "public" / "fonts" / "Jost-SemiBold.ttf"
FONT_EXTRABOLD = ROOT / "operations" / "design-explorations" / "study-pack-storefront-20260728" / "prototype" / "public" / "fonts" / "Jost-ExtraBold.ttf"

PLUM = "#35143d"
CREAM = "#fff8dc"
PINK = "#ef4d9c"
PURPLE = "#8d63d8"
BLUE = "#65bfe5"
CYAN = "#21cad0"
CORAL = "#ff675f"
YELLOW = "#f7d45c"
PANEL_STOPS = ["#ff9b75", "#f7d45c", "#69cce0"]


PROGRAMMES = {
    "trailer": {
        "number": "THE TRAILER",
        "title": ["WELCOME TO", "SUNNYVAiLE"],
        "source": "assets/episodes/trailer/comic/delivery/canonical-named-map/trailer-b08-title-laidies-no-pink-yellow-comic-v3-1920.png",
        "accent": CYAN,
    },
    "01": {
        "number": "EPISODE 01",
        "title": ["ON WEDNESDAYS", "WE DO AI"],
        "source": "operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-01-on-wednesdays-we-do-ai-clean-electric-v2-still.png",
        "accent": PINK,
    },
    "02": {
        "number": "EPISODE 02",
        "title": ["TELL ME", "WHAT YOU WANT"],
        "source": "operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-02-tell-me-what-you-want-clean-electric-v2-still.png",
        "accent": CORAL,
    },
    "03": {
        "number": "EPISODE 03",
        "title": ["THE BURN BOOK", "PROBLEM"],
        "source": "operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-03-the-burn-book-problem-clean-electric-v2-still.png",
        "accent": PURPLE,
    },
    "04": {
        "number": "EPISODE 04",
        "title": ["THE FOUNDING", "MOTHERS"],
        "source": "operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-04-founding-mothers-clean-electric-v2-still.png",
        "accent": YELLOW,
    },
}


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[index:index + 2], 16) for index in (0, 2, 4))


def gradient(size: tuple[int, int], stops: list[str], horizontal: bool = False) -> Image.Image:
    width, height = size
    line_length = width if horizontal else height
    image = Image.new("RGB", size)
    pixels = image.load()
    stop_rgbs = [hex_rgb(stop) for stop in stops]
    for point in range(line_length):
        position = point / max(line_length - 1, 1)
        segment_float = position * (len(stops) - 1)
        segment = min(int(segment_float), len(stops) - 2)
        amount = segment_float - segment
        colour = tuple(round(stop_rgbs[segment][channel] * (1 - amount) + stop_rgbs[segment + 1][channel] * amount) for channel in range(3))
        if horizontal:
            for y in range(height):
                pixels[point, y] = colour
        else:
            for x in range(width):
                pixels[x, point] = colour
    return image


def rounded_image(source: Image.Image, size: tuple[int, int], radius: int) -> Image.Image:
    # Image.thumbnail() never enlarges a source. The canonical episode ident
    # stills are 960x540, so using thumbnail left them floating at source size
    # inside the 3000px cover. ImageOps.fit fills the exact same 16:9 frame and
    # therefore scales without changing composition or cropping these sources.
    fitted = ImageOps.fit(source, size, method=Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    canvas.alpha_composite(fitted.convert("RGBA"), (0, 0))
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    canvas.putalpha(mask)
    return canvas


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def rounded_gradient_panel(base: Image.Image, box: tuple[int, int, int, int], radius: int, outline: str, outline_width: int) -> None:
    x1, y1, x2, y2 = box
    panel_size = (x2 - x1, y2 - y1)
    panel = gradient(panel_size, PANEL_STOPS, horizontal=True).convert("RGBA")
    mask = Image.new("L", panel_size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, panel_size[0] - 1, panel_size[1] - 1), radius=radius, fill=255)
    panel.putalpha(mask)
    base.alpha_composite(panel, (x1, y1))
    ImageDraw.Draw(base).rounded_rectangle(box, radius=radius, outline=outline, width=outline_width)


def left_colour_wash(size: tuple[int, int]) -> Image.Image:
    """Create a saturated left-side wash that preserves the ident artwork."""
    wash = gradient(size, [PINK, PURPLE, BLUE], horizontal=True).convert("RGBA")
    alpha = Image.new("L", size, 0)
    alpha_pixels = alpha.load()
    width, height = size
    for x in range(width):
        # Hold colour under the title, then fade completely by 72% width.
        if x <= width * 0.38:
            opacity = 232
        elif x >= width * 0.72:
            opacity = 0
        else:
            opacity = round(232 * (1 - ((x / width) - 0.38) / 0.34))
        for y in range(height):
            alpha_pixels[x, y] = opacity
    wash.putalpha(alpha)
    return wash


def centered_text(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, typeface: ImageFont.FreeTypeFont, fill: str, spacing: int = 0) -> None:
    x1, y1, x2, y2 = box
    left, top, right, bottom = draw.textbbox((0, 0), text, font=typeface, stroke_width=spacing)
    width = right - left
    height = bottom - top
    draw.text(((x1 + x2 - width) / 2, (y1 + y2 - height) / 2 - top), text, font=typeface, fill=fill)


def draw_cover(programme: dict, canvas_size: tuple[int, int], kind: str) -> Image.Image:
    width, height = canvas_size
    base = gradient(canvas_size, [PINK, PURPLE, BLUE], horizontal=False).convert("RGBA")
    draw = ImageDraw.Draw(base)
    source = Image.open(ROOT / programme["source"]).convert("RGBA")

    if kind == "square":
        inset = 115
        art_y = 390
        art_w = width - inset * 2
        art_h = round(art_w * 9 / 16)
        panel_y = art_y + art_h + 45
        panel_h = height - panel_y - 115
        number_font = font(FONT_EXTRABOLD, 72)
        title_font = font(FONT_EXTRABOLD, 205 if len(programme["title"][0]) < 14 else 178)
        footer_font = font(FONT_SEMIBOLD, 54)
        draw.text((inset, 112), programme["number"], font=number_font, fill=CREAM)
        draw.text((width - inset, 132), "THE CHICK FLICKS", font=footer_font, fill=PLUM, anchor="ra")
        draw.rounded_rectangle((inset + 28, art_y + 34, inset + art_w + 28, art_y + art_h + 34), radius=54, fill=programme["accent"])
        art = rounded_image(source, (art_w, art_h), 54)
        base.alpha_composite(art, (inset, art_y))
        rounded_gradient_panel(base, (inset, panel_y, width - inset, panel_y + panel_h), radius=54, outline=PLUM, outline_width=18)
        draw = ImageDraw.Draw(base)
        y = panel_y + 95
        for line in programme["title"]:
            draw.text((inset + 95, y), line, font=title_font, fill=PLUM)
            y += round(title_font.size * 0.94)
        draw.line((inset + 95, panel_y + panel_h - 135, width - inset - 95, panel_y + panel_h - 135), fill=programme["accent"], width=18)
        draw.text((inset + 95, panel_y + panel_h - 98), "WATCH  •  LISTEN  •  READ", font=footer_font, fill=PLUM)
        draw.rounded_rectangle((28, 28, width - 28, height - 28), radius=92, outline=PLUM, width=28)
        return base.convert("RGB")

    if kind in {"wide", "site"}:
        art = source.resize(canvas_size, Image.Resampling.LANCZOS)
        base = art.copy()
        base.alpha_composite(left_colour_wash(canvas_size))
        draw = ImageDraw.Draw(base)
        title_font = font(FONT_EXTRABOLD, round(height * 0.135))
        eyebrow_font = font(FONT_EXTRABOLD, round(height * 0.058))
        footer_font = font(FONT_SEMIBOLD, round(height * 0.04))
        left = round(width * 0.055)
        draw.text((left, round(height * 0.07)), programme["number"], font=eyebrow_font, fill=CREAM)
        y = round(height * 0.27)
        for line in programme["title"]:
            draw.text((left, y), line, font=title_font, fill=PLUM, stroke_width=max(2, round(height * 0.005)), stroke_fill=CREAM)
            y += round(title_font.size * 0.93)
        draw.line((left, round(height * 0.81), round(width * 0.52), round(height * 0.81)), fill=programme["accent"], width=round(height * 0.018))
        draw.text((left, round(height * 0.85)), "THE CHICK FLICKS  •  LAiDIES", font=footer_font, fill=CREAM)
        draw.rounded_rectangle((14, 14, width - 14, height - 14), radius=round(height * 0.05), outline=PLUM, width=14)
        return base.convert("RGB")

    if kind == "portrait":
        inset = 55
        art_y = 210
        art_w = width - inset * 2
        art_h = round(art_w * 9 / 16)
        draw.text((inset, 62), programme["number"], font=font(FONT_EXTRABOLD, 44), fill=CREAM)
        art = rounded_image(source, (art_w, art_h), 36)
        draw.rounded_rectangle((inset + 18, art_y + 22, inset + art_w + 18, art_y + art_h + 22), radius=36, fill=programme["accent"])
        base.alpha_composite(art, (inset, art_y))
        panel_y = art_y + art_h + 42
        rounded_gradient_panel(base, (inset, panel_y, width - inset, height - inset), radius=40, outline=PLUM, outline_width=12)
        draw = ImageDraw.Draw(base)
        title_font = font(FONT_EXTRABOLD, 82 if len(programme["title"][0]) < 14 else 72)
        y = panel_y + 70
        for line in programme["title"]:
            draw.text((inset + 55, y), line, font=title_font, fill=PLUM)
            y += round(title_font.size * 0.95)
        draw.line((inset + 55, height - 170, width - inset - 55, height - 170), fill=programme["accent"], width=12)
        draw.text((inset + 55, height - 135), "THE CHICK FLICKS  •  LAiDIES", font=font(FONT_SEMIBOLD, 31), fill=PLUM)
        draw.rounded_rectangle((14, 14, width - 14, height - 14), radius=56, outline=PLUM, width=14)
        return base.convert("RGB")

    raise ValueError(f"Unknown cover kind: {kind}")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    RECEIPT.parent.mkdir(parents=True, exist_ok=True)
    artifacts = []
    square_previews = []

    formats = {
        "master": ((3000, 3000), "square", "MASTER_EPISODE_COVER"),
        "youtube": ((1280, 720), "wide", "YOUTUBE_THUMBNAIL"),
        "site": ((1600, 900), "site", "SITE_POSTER"),
        "share": ((1080, 1350), "portrait", "SHARE_IMAGE"),
    }

    for programme_id, programme in PROGRAMMES.items():
        destination = OUT / programme_id
        destination.mkdir(parents=True, exist_ok=True)
        source_path = ROOT / programme["source"]
        source_sha = sha256(source_path)
        for suffix, (size, layout, kind) in formats.items():
            image = draw_cover(programme, size, layout)
            output = destination / f"{programme_id}-{suffix}.jpg"
            image.save(output, "JPEG", quality=94, subsampling=0, optimize=True)
            artifacts.append({
                "programme": programme_id,
                "canonicalTitle": " ".join(programme["title"]),
                "kind": kind,
                "sourcePath": str(output.relative_to(ROOT)),
                "sha256": sha256(output),
                "width": size[0],
                "height": size[1],
                "approvalStatus": "HOLD",
                "rightsStatus": "PASS",
                "derivedFromSource": programme["source"],
                "derivedFromSourceSha256": source_sha,
            })
            if suffix == "master":
                preview = image.resize((540, 540), Image.Resampling.LANCZOS)
                square_previews.append((programme_id, preview))

    sheet = gradient((1740, 1220), ["#d9e9fb", "#ecd8f2", "#f1cfe8"], horizontal=True)
    sheet_draw = ImageDraw.Draw(sheet)
    sheet_draw.text((60, 42), "OPENING-DAY COVER SYSTEM · HELD FOR REVIEW", font=font(FONT_EXTRABOLD, 48), fill=PLUM)
    positions = [(60, 140), (600, 140), (1140, 140), (330, 680), (870, 680)]
    for (_programme_id, preview), position in zip(square_previews, positions):
        sheet.paste(preview, position)
    contact = OUT / "opening-day-cover-contact-sheet.jpg"
    sheet.save(contact, "JPEG", quality=92, subsampling=0, optimize=True)

    receipt = {
        "schemaVersion": 1,
        "status": "BUILT LOCALLY / HOLD",
        "authority": {"accept": False, "release": False, "playerBind": False, "deploy": False, "publish": False},
        "designSystem": {
            "sourceRule": "Existing canonical Trailer title art and approved episode-specific clean-electric ident stills only.",
            "typeRule": "All canonical titles are rendered deterministically with local Jost fonts; no generated text.",
            "layoutRule": "One shared electric cover grammar; full 16:9 identity art is contained, not destructively cropped, in square and portrait derivatives.",
            "colourRule": "Electric LAiDIES pink-purple-blue gradient with deep-plum type and small episode-specific accents; plum is not used as a solid field."
        },
        "contactSheet": {
            "path": str(contact.relative_to(ROOT)),
            "sha256": sha256(contact),
            "width": 1740,
            "height": 1220
        },
        "artifacts": artifacts
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"status": receipt["status"], "artifacts": len(artifacts), "contactSheet": receipt["contactSheet"]}, indent=2))


if __name__ == "__main__":
    build()
