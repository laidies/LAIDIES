import sys
from pathlib import Path

import numpy as np
from PIL import Image


if len(sys.argv) != 3:
    raise SystemExit("usage: normalize-symbol-pink.py INPUT.png OUTPUT.png")

source_path = Path(sys.argv[1])
output_path = Path(sys.argv[2])
image = np.asarray(Image.open(source_path).convert("RGBA")).copy()
red, green, blue, alpha = [image[:, :, channel] for channel in range(4)]
pink = (
    (alpha > 20)
    & (red > 145)
    & (red > green * 1.18)
    & (blue > 70)
)

pixels = image[:, :, :3][pink].astype(np.int16)
if not len(pixels):
    raise SystemExit("no pink pixels found")

# The approved master-symbol sheet has a median hot pink of #fc0292.
# Shift rather than flatten so dry-brush variation and antialiasing survive.
target = np.array([252, 2, 146], dtype=np.int16)
median = np.median(pixels, axis=0).astype(np.int16)
shifted = np.clip(pixels + (target - median), 0, 255).astype(np.uint8)
image[:, :, :3][pink] = shifted

Image.fromarray(image).save(output_path)
print(f"{output_path}\nsource_median={median.tolist()} target={target.tolist()}")
