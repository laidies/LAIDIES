import sys
from pathlib import Path

import numpy as np
from PIL import Image


if len(sys.argv) != 3:
    raise SystemExit("usage: remove-cassette-waveform.py INPUT.png OUTPUT.png")

source_path = Path(sys.argv[1])
output_path = Path(sys.argv[2])
image = np.asarray(Image.open(source_path).convert("RGBA")).copy()
height, width = image.shape[:2]

# In the lower-left sprite quadrant the cassette ends at y=962; everything
# below is the optional waveform.  Preserve a small antialiased safety margin.
image[965:height, : width // 2, :] = 0

Image.fromarray(image).save(output_path)
print(output_path)
