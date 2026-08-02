#!/usr/bin/env python3
"""Build one compact review sheet for the Trailer wardrobe candidate batch."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
CANDIDATE_DIR = ROOT / "operations/video-qa/trailer-multicolour-outfit-candidates-v1"
OUTPUT = CANDIDATE_DIR / "trailer-multicolour-candidates-contact-v1.jpg"

ITEMS = (
    ("B01 · WELCOME", "trailer-b01-multicolour-candidate-v1.png"),
    ("B04 · FOURTH WALL", "trailer-b04-multicolour-candidate-v1.png"),
    ("B07 · SEASON ARC", "trailer-b07-multicolour-candidate-v1.png"),
    ("B15 · LIFE IN TOWN", "trailer-b15-multicolour-candidate-v1.png"),
    ("B31 · TRY-ON", "trailer-b31-multicolour-candidate-v1.png"),
    ("B39 · POOF CLEARS", "trailer-b39-p3-multicolour-candidate-v1.png"),
    ("B39 · REVEAL", "trailer-b39-p4-multicolour-candidate-v1.png"),
    ("B56 · SIGN-OFF", "trailer-b56-multicolour-candidate-v1.png"),
)


def main() -> None:
    thumb_size = (640, 360)
    label_height = 54
    gap = 18
    margin = 28
    columns = 2
    rows = 4
    width = margin * 2 + columns * thumb_size[0] + gap
    height = margin * 2 + rows * (thumb_size[1] + label_height) + (rows - 1) * gap
    sheet = Image.new("RGB", (width, height), "#21102c")
    draw = ImageDraw.Draw(sheet)
    font_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    font = ImageFont.truetype(font_path, 26) if Path(font_path).exists() else ImageFont.load_default()

    for index, (label, filename) in enumerate(ITEMS):
        row, column = divmod(index, columns)
        x = margin + column * (thumb_size[0] + gap)
        y = margin + row * (thumb_size[1] + label_height + gap)
        with Image.open(CANDIDATE_DIR / filename) as source:
            thumb = source.convert("RGB").resize(thumb_size, Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y))
        draw.rectangle((x, y + thumb_size[1], x + thumb_size[0], y + thumb_size[1] + label_height), fill="#ef2aa8")
        draw.text((x + 18, y + thumb_size[1] + 12), label, fill="#fff7cf", font=font)

    sheet.save(OUTPUT, quality=92, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
