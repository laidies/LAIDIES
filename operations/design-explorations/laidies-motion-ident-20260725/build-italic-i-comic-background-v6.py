from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "selected-comic-background-wordmark-v1.png"
SYMBOL_SHEET = ROOT / "custom-symbol-family-transparent-v2.png"
OUTPUT = ROOT / "italic-i-comic-background-motion-proof-v6.webp"
FRAME_DIR = Path("/tmp/laidies-italic-i-proof-v6-frames")
CONTACT_SHEET = ROOT / "italic-i-comic-background-motion-proof-v6-contact-sheet.jpg"

FPS = 60
OUT_SIZE = (960, 540)
SOURCE_CROP_HEIGHT = 941
Y_PAD = 0
SCALE = OUT_SIZE[0] / 1672


def smoothstep(value: float) -> float:
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
            np.maximum(np.asarray(core, dtype=np.uint8), np.asarray(colour_near_core, dtype=np.uint8)),
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
    height, width = mask.shape
    # Protect the underline. The prior broad mask crossed it, leaving two
    # conspicuous vertical seams in the decoded video.
    mask[566:, :] = False
    x_left, x_right = 600, 875
    for y in range(250, min(566, height)):
        row = rgb[y, x_left:x_right]
        blue_pixels = row[
            (row[:, 2] > row[:, 0] * 1.35)
            & (row[:, 2] > row[:, 1] * 1.12)
            & (row[:, 2] > 95)
        ]
        if len(blue_pixels):
            fill = np.median(blue_pixels, axis=0).astype(np.uint8)
        else:
            fill = np.array([10, 25, 180], dtype=np.uint8)
        rgb[y, mask[y]] = fill
    plate = Image.fromarray(rgb)
    clipped_alpha = Image.fromarray((mask * 255).astype("uint8")).filter(
        ImageFilter.GaussianBlur(1.0)
    )
    return Image.composite(plate, source, clipped_alpha)


def stage_image(image):
    cropped = image.crop((0, 0, 1672, SOURCE_CROP_HEIGHT))
    scaled = cropped.resize((OUT_SIZE[0], round(SOURCE_CROP_HEIGHT * SCALE)), Image.Resampling.LANCZOS)
    backdrop = scaled.resize(OUT_SIZE, Image.Resampling.BICUBIC).filter(ImageFilter.GaussianBlur(28))
    backdrop.paste(scaled, (0, Y_PAD))
    return backdrop.convert("RGBA")


def stage_part(image):
    cropped = image.crop((0, 0, 1672, SOURCE_CROP_HEIGHT))
    scaled = cropped.resize((OUT_SIZE[0], round(SOURCE_CROP_HEIGHT * SCALE)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    canvas.alpha_composite(scaled, (0, Y_PAD))
    return canvas


def transformed_part(part, bbox, target, progress, collapse=True):
    left, top, right, bottom = bbox
    crop = part.crop(bbox)
    if collapse:
        width_scale = 1.0 - 0.36 * progress
        height_scale = max(0.035, 1.0 - 0.965 * progress)
        opacity = 1.0 - progress
    else:
        width_scale = 0.64 + 0.36 * progress
        height_scale = 0.035 + 0.965 * progress
        opacity = progress
    new_size = (
        max(1, round(crop.width * width_scale)),
        max(1, round(crop.height * height_scale)),
    )
    crop = crop.resize(new_size, Image.Resampling.LANCZOS)
    if opacity < 1:
        alpha = crop.getchannel("A").point(lambda value: round(value * opacity))
        crop.putalpha(alpha)
    canvas = Image.new("RGBA", part.size, (0, 0, 0, 0))
    x = round(target[0] - new_size[0] / 2)
    y = round(target[1] - new_size[1] / 2)
    canvas.alpha_composite(crop, (x, y))
    return canvas


def moved_dot(dot, bbox, start, target, progress, reverse=False, scale_gain=0.18):
    crop = dot.crop(bbox)
    if reverse:
        progress = 1.0 - progress
    x = start[0] + (target[0] - start[0]) * progress
    y = start[1] + (target[1] - start[1]) * progress
    scale = 1.0 + scale_gain * progress
    size = (round(crop.width * scale), round(crop.height * scale))
    crop = crop.resize(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", dot.size, (0, 0, 0, 0))
    canvas.alpha_composite(crop, (round(x - size[0] / 2), round(y - size[1] / 2)))
    return canvas


def layer_opacity(layer, opacity):
    adjusted = layer.copy()
    adjusted.putalpha(adjusted.getchannel("A").point(lambda value: round(value * opacity)))
    return adjusted


def glowing_symbol(icon, center, scale, opacity, pixel_art=False):
    size = max(1, round(116 * scale))
    resampling = Image.Resampling.NEAREST if pixel_art else Image.Resampling.LANCZOS
    icon = icon.resize((size, size), resampling)
    alpha = icon.getchannel("A").point(lambda value: round(value * opacity))
    icon.putalpha(alpha)
    glow = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    glow_alpha = alpha.filter(ImageFilter.GaussianBlur(max(4, round(14 * scale))))
    glow_layer = Image.new("RGBA", icon.size, (70, 220, 255, 0))
    glow_layer.putalpha(glow_alpha.point(lambda value: round(value * 0.75)))
    pos = (round(center[0] - size / 2), round(center[1] - size / 2))
    glow.alpha_composite(glow_layer, pos)
    glow.alpha_composite(icon, pos)
    return glow


def sheet_symbol(sheet, box):
    symbol = sheet.crop(box)
    alpha_bbox = symbol.getchannel("A").getbbox()
    if alpha_bbox:
        symbol = symbol.crop(alpha_bbox)
    canvas_size = max(symbol.size) + 36
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    canvas.alpha_composite(
        symbol,
        ((canvas_size - symbol.width) // 2, (canvas_size - symbol.height) // 2),
    )
    return canvas


source = Image.open(SOURCE).convert("RGB")
dot_spatial = ellipse_mask(source.size, (710, 286, 822, 408))
stem_spatial = polygon_mask(source.size, [(706, 386), (795, 374), (754, 563), (646, 563)])
dot, dot_alpha = extract_coloured_part(source, dot_spatial)
stem, stem_alpha = extract_coloured_part(source, stem_spatial)
combined_alpha = Image.fromarray(
    np.maximum(np.asarray(dot_alpha), np.asarray(stem_alpha)).astype("uint8")
).filter(ImageFilter.MaxFilter(9))
plate = fill_removed_i(source, combined_alpha)

plate_stage = stage_image(plate)
dot_stage = stage_part(dot)
stem_stage = stage_part(stem)

dot_bbox = (
    round(700 * SCALE),
    round(280 * SCALE) + Y_PAD,
    round(830 * SCALE),
    round(415 * SCALE) + Y_PAD,
)
stem_bbox = (
    round(620 * SCALE),
    round(370 * SCALE) + Y_PAD,
    round(805 * SCALE),
    round(650 * SCALE) + Y_PAD,
)
dot_start = (round(766 * SCALE), round(349 * SCALE) + Y_PAD)
dot_contact = (round(747 * SCALE), round(420 * SCALE) + Y_PAD)
collapse_target = (round(722 * SCALE), round(500 * SCALE) + Y_PAD)

symbol_sheet = Image.open(SYMBOL_SHEET).convert("RGBA")
quadrant = symbol_sheet.width // 2
icons = [
    sheet_symbol(symbol_sheet, (0, 0, quadrant, quadrant)),
    sheet_symbol(symbol_sheet, (quadrant, 0, symbol_sheet.width, quadrant)),
    sheet_symbol(symbol_sheet, (0, quadrant, quadrant, symbol_sheet.height)),
    sheet_symbol(
        symbol_sheet,
        (quadrant, quadrant, symbol_sheet.width, symbol_sheet.height),
    ),
]

frames = []


def compose_i_frame(collapse_amount):
    frame = plate_stage.copy()
    amount = smoothstep(collapse_amount)
    contact_fraction = 0.42
    if amount < contact_fraction:
        dot_progress = smoothstep(amount / contact_fraction)
        frame.alpha_composite(stem_stage)
        frame.alpha_composite(
            moved_dot(dot_stage, dot_bbox, dot_start, dot_contact, dot_progress, scale_gain=0.06)
        )
    else:
        pull_progress = smoothstep((amount - contact_fraction) / (1.0 - contact_fraction))
        frame.alpha_composite(
            transformed_part(stem_stage, stem_bbox, collapse_target, pull_progress, collapse=True)
        )
        dot_from_contact = moved_dot(
            dot_stage,
            dot_bbox,
            dot_contact,
            collapse_target,
            pull_progress,
            scale_gain=0.22,
        )
        frame.alpha_composite(dot_from_contact)
    return frame


def compose_symbol_frame(icon, reveal, pixel_art=False):
    frame = plate_stage.copy()
    eased = smoothstep(reveal)
    collapsed_dot = moved_dot(
        dot_stage, dot_bbox, dot_start, collapse_target, 1.0, scale_gain=0.22
    )
    frame.alpha_composite(layer_opacity(collapsed_dot, 1.0 - eased))
    frame.alpha_composite(
        glowing_symbol(
            icon,
            collapse_target,
            0.72 + 0.28 * eased,
            eased,
            pixel_art=pixel_art,
        )
    )
    return frame


def compose_return_frame(return_amount):
    frame = plate_stage.copy()
    amount = smoothstep(return_amount)
    rebuild_fraction = 0.58
    if amount < rebuild_fraction:
        rebuild_progress = smoothstep(amount / rebuild_fraction)
        frame.alpha_composite(
            transformed_part(stem_stage, stem_bbox, collapse_target, rebuild_progress, collapse=False)
        )
        frame.alpha_composite(
            moved_dot(
                dot_stage,
                dot_bbox,
                collapse_target,
                dot_contact,
                rebuild_progress,
                scale_gain=0.22,
            )
        )
    else:
        rise_progress = smoothstep((amount - rebuild_fraction) / (1.0 - rebuild_fraction))
        frame.alpha_composite(stem_stage)
        frame.alpha_composite(
            moved_dot(dot_stage, dot_bbox, dot_contact, dot_start, rise_progress, scale_gain=0.06)
        )
    return frame


full_i = plate_stage.copy()
full_i.alpha_composite(stem_stage)
full_i.alpha_composite(dot_stage)

for _ in range(round(0.22 * FPS)):
    frames.append(full_i.copy())

collapse_frames = round(0.20 * FPS)
symbol_in_frames = round(0.08 * FPS)
symbol_hold_frames = round(0.18 * FPS)
symbol_out_frames = round(0.08 * FPS)
return_frames = round(0.20 * FPS)
i_reset_frames = round(0.14 * FPS)

for icon_index, icon in enumerate(icons):
    pixel_art = icon_index == 2
    for index in range(collapse_frames):
        frames.append(compose_i_frame(index / max(1, collapse_frames - 1)))
    for index in range(symbol_in_frames):
        frames.append(
            compose_symbol_frame(
                icon,
                index / max(1, symbol_in_frames - 1),
                pixel_art=pixel_art,
            )
        )
    for _ in range(symbol_hold_frames):
        frames.append(compose_symbol_frame(icon, 1.0, pixel_art=pixel_art))
    for index in range(symbol_out_frames):
        frames.append(
            compose_symbol_frame(
                icon,
                1.0 - index / max(1, symbol_out_frames - 1),
                pixel_art=pixel_art,
            )
        )
    for index in range(return_frames):
        frames.append(compose_return_frame(index / max(1, return_frames - 1)))
    for _ in range(i_reset_frames):
        frames.append(full_i.copy())

for _ in range(round(0.30 * FPS)):
    frames.append(full_i.copy())

frames_rgb = [frame.convert("RGB") for frame in frames]
FRAME_DIR.mkdir(parents=True, exist_ok=True)
for old_frame in FRAME_DIR.glob("frame-*.png"):
    old_frame.unlink()
for index, frame in enumerate(frames_rgb):
    frame.save(FRAME_DIR / f"frame-{index:04d}.png")

sample_indices = np.linspace(0, len(frames_rgb) - 1, 16, dtype=int)
thumb_size = (480, 270)
contact = Image.new("RGB", (thumb_size[0] * 4, thumb_size[1] * 4), (6, 12, 92))
for position, frame_index in enumerate(sample_indices):
    thumb = frames_rgb[frame_index].resize(thumb_size, Image.Resampling.LANCZOS)
    contact.paste(thumb, ((position % 4) * thumb_size[0], (position // 4) * thumb_size[1]))
contact.save(CONTACT_SHEET, quality=92)

frames_rgb[0].save(
    OUTPUT,
    save_all=True,
    append_images=frames_rgb[1:],
    duration=round(1000 / FPS),
    loop=0,
    quality=88,
    method=4,
)
print(
    f"{OUTPUT}\n{FRAME_DIR}\n{CONTACT_SHEET}\n"
    f"frames={len(frames_rgb)} fps={FPS} duration={len(frames_rgb) / FPS:.2f}s"
)
