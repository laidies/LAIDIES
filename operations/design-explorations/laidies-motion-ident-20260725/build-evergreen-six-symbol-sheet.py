from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
CELL = 512
PADDING = 42

SOURCES = [
    ("vhs", "custom-symbol-family-rewind-ai-transparent-v6.png", (0, 0)),
    ("cassette", "custom-symbol-family-rewind-ai-transparent-v6.png", (0, 1)),
    ("cd-rom", "custom-symbol-family-transparent-v3.png", (1, 0)),
    ("floppy-disk", "custom-symbol-family-ai-making-transparent-v3.png", (0, 0)),
    ("crt-monitor", "custom-symbol-family-rewind-ai-transparent-v6.png", (1, 0)),
    ("polaroid-camera", "custom-symbol-family-rewind-ai-transparent-v6.png", (1, 1)),
]


def extract_quadrant(filename, column, row):
    sheet = Image.open(ROOT / filename).convert("RGBA")
    half_width = sheet.width // 2
    half_height = sheet.height // 2
    icon = sheet.crop(
        (
            column * half_width,
            row * half_height,
            (column + 1) * half_width,
            (row + 1) * half_height,
        )
    )
    bounds = icon.getchannel("A").getbbox()
    if not bounds:
        raise RuntimeError(f"No visible artwork in {filename} quadrant {column},{row}")
    return icon.crop(bounds)


output = Image.new("RGBA", (CELL * len(SOURCES), CELL), (0, 0, 0, 0))
for index, (_, filename, quadrant) in enumerate(SOURCES):
    icon = extract_quadrant(filename, *quadrant)
    icon.thumbnail(
        (CELL - PADDING * 2, CELL - PADDING * 2),
        Image.Resampling.LANCZOS,
    )
    output.alpha_composite(
        icon,
        (
            index * CELL + (CELL - icon.width) // 2,
            (CELL - icon.height) // 2,
        ),
    )

destination = ROOT / "custom-symbol-family-evergreen-six-transparent-v1.png"
output.save(destination)
print(destination)
