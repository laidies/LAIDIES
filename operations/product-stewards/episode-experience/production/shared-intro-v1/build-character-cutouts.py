#!/usr/bin/env python3

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path.cwd()
OUT = ROOT / "assets/episodes/shared/intro-v1/cutouts"
OUT.mkdir(parents=True, exist_ok=True)

SOURCES = {
    "heroine": "assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png",
    "penny": "assets/episodes/shared/intro-v1/penny-reference-original-face-new-clothes-candidate-v17.png",
    "cosmo": "assets/episodes/shared/intro-v1/cosmo-screenprint-restrained-1990s-bartender-candidate-v1.png",
    "deb": "assets/episodes/shared/intro-v1/mayor-deb-isolated-master-style-candidate-v5.png",
    "matron": "assets/episodes/shared/intro-v1/matron-lumen-isolated-master-style-candidate-v3.png",
    "claio": "assets/episodes/shared/intro-v1/mme-claio-isolated-master-style-candidate-v1.png",
    "fairy": "assets/episodes/shared/intro-v1/fairy-godmother-isolated-master-style-candidate-v1.png",
}


def make_cutout(name: str, relative_source: str) -> None:
    source = ROOT / relative_source
    image = Image.open(source).convert("RGBA")
    rgb = np.asarray(image)[..., :3].astype(np.float32) / 255.0
    high = rgb.max(axis=2)
    low = rgb.min(axis=2)
    saturation = np.divide(high - low, high, out=np.zeros_like(high), where=high > 0)

    # All seven source plates use a connected, low-saturation blue-grey studio field.
    # Only edge-connected pixels may be removed, so face, clothing and internal highlights
    # remain byte-for-byte unchanged.
    background_like = (saturation < 0.45) & (high > 0.19) & (high < 0.88)
    height, width = background_like.shape
    removed = np.zeros((height, width), dtype=bool)
    queue = deque()

    for x in range(width):
        if background_like[0, x]:
            queue.append((0, x))
        if background_like[height - 1, x]:
            queue.append((height - 1, x))
    for y in range(height):
        if background_like[y, 0]:
            queue.append((y, 0))
        if background_like[y, width - 1]:
            queue.append((y, width - 1))

    while queue:
        y, x = queue.popleft()
        if removed[y, x] or not background_like[y, x]:
            continue
        removed[y, x] = True
        if y:
            queue.append((y - 1, x))
        if y + 1 < height:
            queue.append((y + 1, x))
        if x:
            queue.append((y, x - 1))
        if x + 1 < width:
            queue.append((y, x + 1))

    alpha = np.where(removed, 0, 255).astype(np.uint8)
    alpha = np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=1.2)))
    output = np.dstack((np.asarray(image)[..., :3], alpha))
    destination = OUT / f"{name}-source-preserved-cutout-v1.png"
    Image.fromarray(output, "RGBA").save(destination)
    print(destination)


for character, source_path in SOURCES.items():
    make_cutout(character, source_path)
