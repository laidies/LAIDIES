from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import distance_transform_edt


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "selected-comic-background-wordmark-v1.png"
SYMBOL_SHEET = ROOT / "custom-symbol-family-transparent-v2.png"
OUTPUT = ROOT / "continuous-i-to-cd-morph-proof-v1.webp"
FRAME_DIR = Path("/tmp/laidies-continuous-i-cd-morph-v1-frames")
CONTACT_SHEET = ROOT / "continuous-i-to-cd-morph-proof-v1-contact-sheet.jpg"

FPS = 60
OUT_SIZE = (960, 540)
SCALE = OUT_SIZE[0] / 1672


def smoothstep(value):
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def polygon_mask(size, points):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return mask


def ellipse_mask(size, bounds):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).ellipse(bounds, fill=255)
    return mask


def extract_coloured_part(source, spatial_mask):
    rgb = np.asarray(source.convert("RGB"))
    red, green, blue = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    pink = (red > 145) & (red > green * 1.18) & (blue > 75)
    yellow = (red > 165) & (green > 105) & (blue < 175)
    white = (red > 190) & (green > 170) & (blue > 175)
    core = Image.fromarray(((pink | yellow | white) * 255).astype("uint8"))
    expanded = core.filter(ImageFilter.MaxFilter(23))
    bright = ((red + green + blue) > 250).astype("uint8") * 255
    colour_near_core = Image.fromarray(bright).filter(ImageFilter.GaussianBlur(0.8))
    alpha = Image.fromarray(
        np.minimum(
            np.asarray(expanded, dtype=np.uint8),
            np.maximum(
                np.asarray(core, dtype=np.uint8),
                np.asarray(colour_near_core, dtype=np.uint8),
            ),
        )
    )
    alpha = Image.composite(alpha, Image.new("L", source.size, 0), spatial_mask)
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))
    part = source.convert("RGBA")
    part.putalpha(alpha)
    return part, alpha


def fill_removed_i(source, alpha):
    rgb = np.asarray(source.convert("RGB")).copy()
    mask = np.asarray(alpha) > 4
    mask[566:, :] = False
    for y in range(250, 566):
        row = rgb[y, 600:875]
        blue_pixels = row[
            (row[:, 2] > row[:, 0] * 1.35)
            & (row[:, 2] > row[:, 1] * 1.12)
            & (row[:, 2] > 95)
        ]
        fill = (
            np.median(blue_pixels, axis=0).astype(np.uint8)
            if len(blue_pixels)
            else np.array([42, 12, 118], dtype=np.uint8)
        )
        rgb[y, mask[y]] = fill
    clipped = Image.fromarray((mask * 255).astype("uint8")).filter(
        ImageFilter.GaussianBlur(1.0)
    )
    return Image.composite(Image.fromarray(rgb), source, clipped)


def stage(image):
    return image.resize(OUT_SIZE, Image.Resampling.LANCZOS).convert("RGBA")


def signed_distance(mask):
    inside = mask > 0.5
    return distance_transform_edt(inside) - distance_transform_edt(~inside)


def alpha_from_sdf(sdf):
    return np.clip(127.5 + sdf * 74.0, 0, 255).astype("uint8")


def shifted_alpha(alpha, dx, dy):
    shifted = Image.new("L", OUT_SIZE, 0)
    shifted.paste(alpha, (dx, dy))
    return shifted


def brand_shape(alpha):
    alpha_image = Image.fromarray(alpha, mode="L")
    layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))

    cyan = Image.new("RGBA", OUT_SIZE, (28, 224, 255, 0))
    cyan.putalpha(shifted_alpha(alpha_image, 5, 5))
    layer.alpha_composite(cyan)

    yellow_alpha = shifted_alpha(alpha_image, -2, -2).filter(ImageFilter.MaxFilter(3))
    yellow = Image.new("RGBA", OUT_SIZE, (255, 226, 35, 0))
    yellow.putalpha(yellow_alpha)
    layer.alpha_composite(yellow)

    pink = Image.new("RGBA", OUT_SIZE, (255, 42, 169, 0))
    pink.putalpha(alpha_image)
    layer.alpha_composite(pink)

    # A fixed, subtle dry-brush grain prevents the morph from looking like a
    # glossy vector blob while keeping the silhouette continuous.
    rng = np.random.default_rng(1994)
    grain = rng.integers(218, 256, OUT_SIZE[::-1], dtype=np.uint8)
    current_alpha = np.asarray(layer.getchannel("A"), dtype=np.uint16)
    layer.putalpha(
        Image.fromarray(((current_alpha * grain.astype(np.uint16)) // 255).astype("uint8"))
    )
    return layer


def layer_opacity(layer, opacity):
    result = layer.copy()
    result.putalpha(
        result.getchannel("A").point(
            lambda value: round(value * max(0.0, min(1.0, opacity)))
        )
    )
    return result


source = Image.open(SOURCE).convert("RGB")
dot_spatial = ellipse_mask(source.size, (710, 286, 822, 408))
stem_spatial = polygon_mask(
    source.size,
    [(706, 386), (795, 374), (754, 563), (646, 563)],
)
dot, dot_alpha = extract_coloured_part(source, dot_spatial)
stem, stem_alpha = extract_coloured_part(source, stem_spatial)
i_alpha_native = Image.fromarray(
    np.maximum(np.asarray(dot_alpha), np.asarray(stem_alpha)).astype("uint8")
)
i_layer_native = source.convert("RGBA")
i_layer_native.putalpha(i_alpha_native)
plate = fill_removed_i(
    source,
    i_alpha_native.filter(ImageFilter.MaxFilter(9)),
)

plate_stage = stage(plate)
i_layer = stage(i_layer_native)
i_mask = np.asarray(i_layer.getchannel("A"), dtype=np.float32) / 255.0

collapse_target = (round(722 * SCALE), round(500 * SCALE))
orb = Image.new("L", OUT_SIZE, 0)
ImageDraw.Draw(orb).ellipse(
    (
        collapse_target[0] - 29,
        collapse_target[1] - 29,
        collapse_target[0] + 29,
        collapse_target[1] + 29,
    ),
    fill=255,
)
orb_mask = np.asarray(orb, dtype=np.float32) / 255.0

sheet = Image.open(SYMBOL_SHEET).convert("RGBA")
q = sheet.width // 2
cd = sheet.crop((q, 0, sheet.width, q))
cd_bbox = cd.getchannel("A").getbbox()
if cd_bbox:
    cd = cd.crop(cd_bbox)
cd = cd.resize((122, 122), Image.Resampling.LANCZOS)
cd_layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
cd_layer.alpha_composite(
    cd,
    (collapse_target[0] - cd.width // 2, collapse_target[1] - cd.height // 2),
)
cd_mask = np.asarray(cd_layer.getchannel("A"), dtype=np.float32) / 255.0

sdf_i = signed_distance(i_mask)
sdf_orb = signed_distance(orb_mask)
sdf_cd = signed_distance(cd_mask)


def morph_layer(progress):
    progress = max(0.0, min(1.0, progress))
    if progress < 0.5:
        local = smoothstep(progress / 0.5)
        sdf = sdf_i * (1.0 - local) + sdf_orb * local
    else:
        local = smoothstep((progress - 0.5) / 0.5)
        sdf = sdf_orb * (1.0 - local) + sdf_cd * local

    generated = brand_shape(alpha_from_sdf(sdf))
    result = generated

    if progress < 0.12:
        original_weight = smoothstep((0.12 - progress) / 0.12)
        result = layer_opacity(generated, 1.0 - original_weight)
        result.alpha_composite(layer_opacity(i_layer, original_weight))
    elif progress > 0.84:
        icon_weight = smoothstep((progress - 0.84) / 0.16)
        result = layer_opacity(generated, 1.0 - icon_weight)
        result.alpha_composite(layer_opacity(cd_layer, icon_weight))
    return result


frames = []
full_i = plate_stage.copy()
full_i.alpha_composite(i_layer)
for _ in range(round(0.28 * FPS)):
    frames.append(full_i.copy())

morph_frames = round(0.68 * FPS)
for index in range(morph_frames):
    frame = plate_stage.copy()
    frame.alpha_composite(morph_layer(index / max(1, morph_frames - 1)))
    frames.append(frame)

for _ in range(round(0.42 * FPS)):
    frame = plate_stage.copy()
    frame.alpha_composite(cd_layer)
    frames.append(frame)

for index in range(morph_frames):
    frame = plate_stage.copy()
    frame.alpha_composite(
        morph_layer(1.0 - index / max(1, morph_frames - 1))
    )
    frames.append(frame)

for _ in range(round(0.34 * FPS)):
    frames.append(full_i.copy())

frames_rgb = [frame.convert("RGB") for frame in frames]
FRAME_DIR.mkdir(parents=True, exist_ok=True)
for old in FRAME_DIR.glob("frame-*.png"):
    old.unlink()
for index, frame in enumerate(frames_rgb):
    frame.save(FRAME_DIR / f"frame-{index:04d}.png")

samples = np.linspace(0, len(frames_rgb) - 1, 12, dtype=int)
contact = Image.new("RGB", (480 * 4, 270 * 3), (30, 8, 74))
for position, frame_index in enumerate(samples):
    thumb = frames_rgb[frame_index].resize((480, 270), Image.Resampling.LANCZOS)
    contact.paste(thumb, ((position % 4) * 480, (position // 4) * 270))
contact.save(CONTACT_SHEET, quality=92)

frames_rgb[0].save(
    OUTPUT,
    save_all=True,
    append_images=frames_rgb[1:],
    duration=round(1000 / FPS),
    loop=0,
    quality=90,
    method=4,
)
print(
    f"{OUTPUT}\n{FRAME_DIR}\n{CONTACT_SHEET}\n"
    f"frames={len(frames_rgb)} fps={FPS} duration={len(frames_rgb) / FPS:.2f}s"
)
