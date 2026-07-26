#!/usr/bin/env python3
"""Make a checksum-bound *location-only* QA sheet for repaired portrait crops."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
INPUT = HERE / "coordinate-qa"
OUT = INPUT / "coordinate-qa-contact-sheet.png"
SOURCES = [
    ("cue16-item9.png", "Cue 16 / item 9 · x1550–1650 y260–610"),
]
FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 20)
BOLD = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 18)
CELL_W, CELL_H, LABEL_H = 680, 430, 70

def fit(image: Image.Image) -> Image.Image:
    copy = image.convert("RGB")
    copy.thumbnail((CELL_W, CELL_H), Image.Resampling.LANCZOS)
    return copy

sheet = Image.new("RGB", (CELL_W, 86 + CELL_H + LABEL_H), "#07102c")
draw = ImageDraw.Draw(sheet)
draw.text((18, 15), "EP04 P0.2 · COORDINATE QA ONLY · NOT IDENTITY EVIDENCE", fill="#fffdf7", font=BOLD)
for index, (name, label) in enumerate(SOURCES):
    image = fit(Image.open(INPUT / name))
    x = (CELL_W - image.width) // 2
    y = 86 + (CELL_H - image.height) // 2
    sheet.paste(image, (x, y))
    draw.text((14, 86 + CELL_H + 12), label, fill="#ff72bb", font=FONT)
    draw.text((14, 86 + CELL_H + 38), "Location crop only — no person is identified or admitted.", fill="#fffdf7", font=FONT)
sheet.save(OUT, "PNG", optimize=True)
print(OUT)
