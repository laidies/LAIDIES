#!/usr/bin/env python3

import hashlib
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path.cwd()
OUTPUT = ROOT / "assets/episodes/shared/intro-v1/_rough/deb-matron-canon-source-pair-v3/mayor-deb-matron-lumen-canon-source-pair-v3-candidate.png"
FONT = ROOT / "assets/video/delivery-20260714-opening-v6/fonts/Jost.ttf"
SOURCES = {
    "deb": (
        ROOT / "assets/episodes/ep-04/pixel/ep04-character-test-mayor-deb-comic-v3-no-halftone-1920.png",
        "d28599cbd51694d9396db79518a346e008863f75931a648d9e4fa4e8ac1df5ec",
    ),
    "matron": (
        ROOT / "assets/cards/characters/candidates-20260727/matron-lumen-character-card-front-v1.png",
        "f5d5845bf0409a7d9c55017022321ee7425a0c54bae3ea385d300440bd9e6e28",
    ),
    "town": (
        ROOT / "assets/codex-map-refs-20260705/approved-scenes/civic-square-midday.png",
        "161a03ac06da370c2d77353ce4ca8367356ebbddf2dd00f149dfff34f963b87a",
    ),
}

if sys.argv[1:] != ["--candidate"]:
    raise SystemExit("Pass --candidate. The output remains internal until Ali accepts its exact pixels.")
if OUTPUT.exists():
    raise SystemExit(f"Refusing to overwrite: {OUTPUT}")
for source, expected in SOURCES.values():
    actual = hashlib.sha256(source.read_bytes()).hexdigest()
    if actual != expected:
        raise SystemExit(f"Source drift: {source}")

canvas = Image.open(SOURCES["town"][0]).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
deb_rgb = Image.open(SOURCES["deb"][0]).convert("RGB")
matron = Image.open(SOURCES["matron"][0]).convert("RGB").crop((140, 180, 1000, 1080)).resize((1100, 1151), Image.Resampling.LANCZOS)

# Remove only the edge-connected, low-saturation blue-grey field from Deb's
# existing comic plate. Character pixels are copied unchanged before scaling.
rgb = np.asarray(deb_rgb).astype(np.float32) / 255.0
high = rgb.max(axis=2)
low = rgb.min(axis=2)
saturation = np.divide(high - low, high, out=np.zeros_like(high), where=high > 0)
red = rgb[..., 0]
green = rgb[..., 1]
blue = rgb[..., 2]
background_like = (
    (saturation < 0.52)
    & (blue > red * 1.08)
    & (blue > green * 1.02)
    & (high > 0.14)
    & (high < 0.82)
)
height, width = background_like.shape
removed = np.zeros((height, width), dtype=bool)
queue = deque()
for x in range(width):
    if background_like[0, x]: queue.append((0, x))
    if background_like[height - 1, x]: queue.append((height - 1, x))
for y in range(height):
    if background_like[y, 0]: queue.append((y, 0))
    if background_like[y, width - 1]: queue.append((y, width - 1))
while queue:
    y, x = queue.popleft()
    if removed[y, x] or not background_like[y, x]: continue
    removed[y, x] = True
    if y: queue.append((y - 1, x))
    if y + 1 < height: queue.append((y + 1, x))
    if x: queue.append((y, x - 1))
    if x + 1 < width: queue.append((y, x + 1))
alpha = Image.fromarray(np.where(removed, 0, 255).astype(np.uint8))
deb_rgba = Image.merge("RGBA", (*deb_rgb.split(), alpha)).crop((350, 0, 1520, 1080)).resize((1110, 1025), Image.Resampling.LANCZOS)

deb_mask = Image.new("L", canvas.size, 0)
ImageDraw.Draw(deb_mask).polygon([(0, 0), (1110, 0), (1010, 250), (1090, 530), (990, 780), (1060, 1080), (0, 1080)], fill=255)
deb_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
deb_layer.alpha_composite(deb_rgba, (-40, 55))
canvas.paste(deb_layer.convert("RGB"), (0, 0), Image.composite(deb_layer.getchannel("A"), Image.new("L", canvas.size, 0), deb_mask))

matron_layer = Image.new("RGB", canvas.size, "#0a1022")
matron_layer.paste(matron, (865, -30))
matron_mask = Image.new("L", canvas.size, 0)
ImageDraw.Draw(matron_mask).polygon([(1080, 0), (1920, 0), (1920, 1080), (1030, 1080), (960, 780), (1060, 530), (980, 250)], fill=255)
canvas.paste(matron_layer, (0, 0), matron_mask)

draw = ImageDraw.Draw(canvas)
seam = [(1094, 0), (994, 250), (1074, 530), (974, 780), (1044, 1080)]
draw.line(seam, fill="#080d1d", width=62, joint="curve")
draw.line(seam, fill="#f5c64d", width=14, joint="curve")

name_font = ImageFont.truetype(str(FONT), 60)
place_font = ImageFont.truetype(str(FONT), 29)

def label(name, place, name_xy, place_xy, place_colour, line):
    draw.text(name_xy, name, font=name_font, fill="#fff6dc", stroke_width=9, stroke_fill="#080d1d")
    draw.text(place_xy, place, font=place_font, fill=place_colour, stroke_width=6, stroke_fill="#080d1d")
    draw.line(line, fill=place_colour, width=12)

label("MAYOR DEB", "TOWN HALL", (62, 885), (66, 966), "#28d6d8", [(64, 1041), (570, 1041), (620, 1018)])
label("MATRON LUMEN", "LUMINAiRY", (1260, 885), (1264, 966), "#f5c64d", [(1262, 1041), (1835, 1041), (1870, 1018)])

canvas.save(OUTPUT, optimize=True)
print(OUTPUT)
