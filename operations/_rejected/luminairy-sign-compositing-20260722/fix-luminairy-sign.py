#!/usr/bin/env python3
"""Repaint the LUMINAiRY marquee so it reads LUMINAiRY, not LUMiNAiRY.

The sign has TWO lowercase i's. The second one, in "-AiRY", is correct and is the
brand's accent letter. The first, in "LUMiN-", is a rendering error and has blocked
the episode and the trailer.

This does NOT regenerate the frame. Regeneration needs an API token that is not on
this machine, and re-rolling a hero frame risks losing everything else that is right
about it. Instead it does letter surgery: the typeface is a slab serif, so a capital
"I" is a stem between two serifs — and the "L" in the same word already supplies a
stem and a top serif at exactly the right weight, colour and lighting. Mirror its
serif for the foot and you have an "I" that cannot be off-model, because every pixel
came from the sign itself.

Writes a NEW file. Never overwrites the source.

Usage:  python3 Website-homepage/operations/tools/fix-luminairy-sign.py [--preview DIR]
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"

SOURCE = PIXEL / "ep04-open-16-luminairy-approach-comic-v1-1920.png"
OUTPUT = PIXEL / "ep04-open-16-luminairy-approach-comic-v5-capital-I-1920.png"

# Measured off the source by column-profiling the gold letters (see the segmentation
# in fix-luminairy-sign notes). x ranges are glyph bounds; the band is the plaque.
WRONG_I = (1243, 253, 1257, 295)      # the lowercase i in LUMiN, generous bounds
L_GLYPH = (1171, 258, 1188, 292)      # the L in LUM, source of stem + serif
PLAQUE_PATCH = (1226, 253, 1243, 295)  # clean plaque between M and i, for the fill


def load() -> np.ndarray:
    with Image.open(SOURCE) as im:
        if im.size != (1920, 1080):
            raise ValueError(f"expected 1920x1080, got {im.size}")
        return np.asarray(im.convert("RGB"), dtype=np.float32)


def gold_mask(patch: np.ndarray) -> np.ndarray:
    """Where the lit gold letter is, as a soft 0..1 alpha."""
    lum = patch.max(axis=2)
    warm = patch[..., 0] - patch[..., 2]
    hard = (lum > 150) & (warm > 45)
    # Feather so the composite keeps the artwork's soft comic edge instead of
    # cutting a hard-edged sticker into it.
    from scipy.ndimage import gaussian_filter
    return np.clip(gaussian_filter(hard.astype(np.float32), 0.7), 0, 1)


def build_capital_i(image: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """An 'I' made by copying the whole L and taking its foot off.

    Copying the glyph WHOLE is the point. Weight, colour, glow, the halftone and the
    anti-aliased edge all come across intact, because they are the same pixels. An
    earlier version synthesised a stem from a single row and it rendered thin and
    pale next to its neighbours -- the letter was right and the ink was wrong.
    """
    x0, y0, x1, y1 = L_GLYPH
    ell = image[y0:y1, x0:x1].copy()
    alpha = gold_mask(ell)
    h, w = alpha.shape

    serif_rows = max(4, int(round(h * 0.17)))
    # Stem columns, measured across the waist where the L is stem-only.
    waist = alpha[int(h * 0.35):int(h * 0.65)]
    columns = np.nonzero(waist.max(axis=0) > 0.35)[0]
    stem_lo, stem_hi = int(columns.min()), int(columns.max()) + 1

    # Drop the foot arm: below the waist, keep only the stem.
    keep = np.zeros_like(alpha)
    keep[:, stem_lo:stem_hi] = 1.0
    body = alpha * np.maximum(keep, 0.0)
    body[:serif_rows] = alpha[:serif_rows]          # top serif survives whole
    body[h - serif_rows:] = alpha[:serif_rows][::-1]  # foot = top serif, mirrored

    rgb = ell.copy()
    rgb[h - serif_rows:] = ell[:serif_rows][::-1]
    return rgb, body


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--preview", type=Path)
    args = parser.parse_args()

    if OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite {OUTPUT}")

    image = load()
    before = image.copy()

    ix0, iy0, ix1, iy1 = WRONG_I
    ih, iw = iy1 - iy0, ix1 - ix0

    # 1. Erase the lowercase i by tiling clean plaque over it. The plaque has a
    #    gradient, so the patch is taken from the SAME rows immediately beside it.
    # Same ROWS, so the plaque's vertical gradient and its bevel line up exactly.
    # np.resize would wrap the flat buffer and produce stripes -- crop, never resize.
    px0 = PLAQUE_PATCH[0]
    fill = before[iy0:iy1, px0:px0 + iw].copy()
    if fill.shape[:2] != (ih, iw):
        raise RuntimeError(f"plaque patch is {fill.shape[:2]}, need {(ih, iw)}")
    image[iy0:iy1, ix0:ix1] = fill

    # 2. Cap height comes from the L, so the I sits on the same baseline.
    lx0, ly0, lx1, ly1 = L_GLYPH
    glyph_rgb, glyph_alpha = build_capital_i(before)
    gh, gw = glyph_alpha.shape

    # Centre it on the gap the lowercase i vacated, on the capitals' baseline.
    cx = (ix0 + ix1) // 2
    gx0 = cx - gw // 2
    gy0 = ly0
    a = glyph_alpha[..., None]
    region = image[gy0:gy0 + gh, gx0:gx0 + gw]
    image[gy0:gy0 + gh, gx0:gx0 + gw] = region * (1 - a) + glyph_rgb * a

    Image.fromarray(np.clip(image, 0, 255).astype(np.uint8)).save(OUTPUT)
    print(f"wrote {OUTPUT}")

    if args.preview:
        args.preview.mkdir(parents=True, exist_ok=True)
        box = (1150, 240, 1400, 310)
        strip = Image.new("RGB", ((box[2] - box[0]) * 4, (box[3] - box[1]) * 8 + 8), (18, 10, 22))
        for i, arr in enumerate((before, image)):
            crop = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).crop(box)
            crop = crop.resize((crop.width * 4, crop.height * 4), Image.LANCZOS)
            strip.paste(crop, (0, i * (crop.height + 8)))
        out = args.preview / "luminairy-sign-before-after.png"
        strip.save(out)
        print(f"wrote {out}  (top = before / bottom = after)")


if __name__ == "__main__":
    main()
