import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import distance_transform_edt


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "selected-comic-background-wordmark-v1.png"
VARIANT = os.environ.get("LAIDIES_VARIANT", "symbol-sequence-v5")
SYMBOL_SHEET = ROOT / os.environ.get(
    "LAIDIES_SYMBOL_SHEET",
    "custom-symbol-family-transparent-v3.png",
)
USE_QUIET_ZONE = os.environ.get("LAIDIES_QUIET_ZONE", "1") == "1"
ICON_SCALE = float(os.environ.get("LAIDIES_ICON_SCALE", "1.0"))
SYMBOL_HOLD_SECONDS = float(os.environ.get("LAIDIES_SYMBOL_HOLD", "0.16"))
OUTPUT = ROOT / f"continuous-i-{VARIANT}.webp"
FRAME_DIR = Path(f"/tmp/laidies-continuous-i-{VARIANT}-frames")
CONTACT_SHEET = ROOT / f"continuous-i-{VARIANT}-contact-sheet.jpg"
QUIET_ZONE_STILL = ROOT / f"continuous-i-{VARIANT}-still.png"

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


def refine_central_background(image):
    rgb = np.asarray(image.convert("RGB"))
    red, green, blue = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]

    # Preserve the handmade wordmark, cyan offset and yellow edge while
    # suppressing only the radial/halftone artwork behind it.
    yy, xx = np.ogrid[: OUT_SIZE[1], : OUT_SIZE[0]]
    wordmark_region = (
        (xx > 95)
        & (xx < 875)
        & (yy > 105)
        & (yy < 390)
    )
    pink = (red > 145) & (red > green * 1.18) & (blue > 70)
    yellow = (red > 165) & (green > 105) & (blue < 180)
    cyan = (green > 125) & (blue > 150) & (blue > red * 1.45)
    pale = (red > 185) & (green > 165) & (blue > 175)
    logo_mask = Image.fromarray(
        ((pink | yellow | cyan | pale) & wordmark_region).astype("uint8") * 255
    ).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(0.8))

    zone = Image.new("L", OUT_SIZE, 0)
    ImageDraw.Draw(zone).ellipse((110, 72, 872, 438), fill=205)
    zone = zone.filter(ImageFilter.GaussianBlur(62))

    # Retain purple texture, but lower contrast and visual frequency through
    # the reading zone.  This is a quiet pocket, not a blank oval.
    softened = image.filter(ImageFilter.GaussianBlur(4.5))
    purple = Image.new("RGBA", OUT_SIZE, (42, 5, 105, 255))
    softened = Image.blend(softened, purple, 0.31)
    quiet = Image.composite(softened, image, zone)
    quiet = Image.composite(image, quiet, logo_mask)
    return quiet


def signed_distance(mask):
    inside = mask > 0.5
    return distance_transform_edt(inside) - distance_transform_edt(~inside)


def alpha_from_sdf(sdf):
    return np.clip(127.5 + sdf * 74.0, 0, 255).astype("uint8")


def shifted_alpha(alpha, dx, dy):
    shifted = Image.new("L", OUT_SIZE, 0)
    shifted.paste(alpha, (dx, dy))
    return shifted


def brand_shape(alpha, echo=0.0):
    alpha_image = Image.fromarray(alpha)
    layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))

    cyan_dx = round(5 + 9 * echo)
    cyan_dy = round(5 + 4 * abs(echo))
    cyan = Image.new("RGBA", OUT_SIZE, (28, 224, 255, 0))
    cyan.putalpha(shifted_alpha(alpha_image, cyan_dx, cyan_dy))
    layer.alpha_composite(cyan)

    yellow_dx = round(-2 - 5 * echo)
    yellow_dy = round(-2 - 2 * abs(echo))
    yellow_alpha = shifted_alpha(alpha_image, yellow_dx, yellow_dy).filter(
        ImageFilter.MaxFilter(3)
    )
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


def scale_about(layer, scale, centre):
    if abs(scale - 1.0) < 0.001:
        return layer
    bounds = layer.getchannel("A").getbbox()
    if not bounds:
        return layer
    cropped = layer.crop(bounds)
    resized = cropped.resize(
        (
            max(1, round(cropped.width * scale)),
            max(1, round(cropped.height * scale)),
        ),
        Image.Resampling.LANCZOS,
    )
    source_centre = ((bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2)
    offset_x = centre[0] + (source_centre[0] - centre[0]) * scale
    offset_y = centre[1] + (source_centre[1] - centre[1]) * scale
    result = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    result.alpha_composite(
        resized,
        (
            round(offset_x - resized.width / 2),
            round(offset_y - resized.height / 2),
        ),
    )
    return result


def impact_layer(strength):
    strength = max(0.0, min(1.0, strength))
    layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = collapse_target
    radius = 67 + round(18 * strength)
    colours = [
        (255, 226, 35, round(185 * strength)),
        (28, 224, 255, round(160 * strength)),
        (255, 42, 169, round(145 * strength)),
    ]
    for index in range(12):
        angle = np.deg2rad(index * 30 + 8)
        inner = radius + (index % 3) * 5
        outer = inner + 13 + (index % 2) * 7
        colour = colours[index % len(colours)]
        draw.line(
            (
                cx + np.cos(angle) * inner,
                cy + np.sin(angle) * inner,
                cx + np.cos(angle) * outer,
                cy + np.sin(angle) * outer,
            ),
            fill=colour,
            width=3,
        )
    return layer.filter(ImageFilter.GaussianBlur(0.35))


def translated_layer(layer, dx=0, dy=0, opacity=1.0):
    moved = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    adjusted = layer_opacity(layer, opacity)
    moved.alpha_composite(adjusted, (round(dx), round(dy)))
    return moved


def spatial_mask(bounds):
    mask = Image.new("L", OUT_SIZE, 0)
    ImageDraw.Draw(mask).rectangle(bounds, fill=255)
    return mask


def masked_layer(layer, mask):
    result = layer.copy()
    result.putalpha(
        Image.fromarray(
            np.minimum(
                np.asarray(layer.getchannel("A"), dtype=np.uint8),
                np.asarray(mask, dtype=np.uint8),
            )
        )
    )
    return result


def reveal_from_left(layer, progress):
    progress = max(0.0, min(1.0, progress))
    bounds = layer.getchannel("A").getbbox()
    if not bounds:
        return layer
    reveal_x = bounds[0] + round((bounds[2] - bounds[0] + 40) * progress)
    mask = Image.new("L", OUT_SIZE, 0)
    ImageDraw.Draw(mask).rectangle((0, 0, reveal_x, OUT_SIZE[1]), fill=255)
    return masked_layer(layer, mask.filter(ImageFilter.GaussianBlur(5)))


def icon_microaction(icon_layer, icon_index, progress):
    progress = max(0.0, min(1.0, progress))
    result = icon_layer.copy()
    bounds = icon_layer.getchannel("A").getbbox()
    if not bounds:
        return result
    left, top, right, bottom = bounds
    width, height = right - left, bottom - top
    overlay = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    if icon_index in (0, 2):
        # The two media formats share a readable internal behaviour: each reel
        # advances through one bright arc without moving the cassette body.
        centre_y = top + 0.54 * height
        radius = max(3, round(min(width, height) * 0.10))
        angle = round(40 + progress * 250)
        for centre_x in (left + 0.28 * width, left + 0.72 * width):
            box = (
                centre_x - radius,
                centre_y - radius,
                centre_x + radius,
                centre_y + radius,
            )
            draw.arc(box, start=angle, end=angle + 145, fill=(255, 226, 35, 245), width=2)
            draw.arc(
                box,
                start=angle + 180,
                end=angle + 285,
                fill=(28, 224, 255, 220),
                width=2,
            )
    elif icon_index == 1:
        # One deliberate terminal blink, not a continuous software-style
        # cursor animation.
        visible = progress < 0.42 or progress > 0.76
        if visible:
            y = top + round(height * 0.61)
            draw.line(
                (
                    left + round(width * 0.47),
                    y,
                    left + round(width * 0.66),
                    y,
                ),
                fill=(255, 226, 35, 255),
                width=3,
            )
    elif icon_index == 3:
        # The instant camera visibly develops one small photo during its hold.
        travel = round(5 * smoothstep(progress))
        x0 = left + round(width * 0.32)
        x1 = left + round(width * 0.69)
        y0 = top + round(height * 0.62) + travel
        y1 = top + round(height * 0.88) + travel
        draw.rounded_rectangle(
            (x0, y0, x1, y1),
            radius=2,
            fill=(252, 2, 146, 255),
            outline=(255, 226, 35, 255),
            width=2,
        )
        sparkle = 1.0 - abs(progress * 2.0 - 1.0)
        cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
        length = round(2 + 4 * sparkle)
        draw.line((cx - length, cy, cx + length, cy), fill=(255, 226, 35, 255), width=2)
        draw.line((cx, cy - length, cx, cy + length), fill=(255, 226, 35, 255), width=2)

    result.alpha_composite(overlay)
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

plate_stage_raw = stage(plate)
plate_stage = (
    refine_central_background(plate_stage_raw)
    if USE_QUIET_ZONE
    else plate_stage_raw
)
i_layer = stage(i_layer_native)
i_mask = np.asarray(i_layer.getchannel("A"), dtype=np.float32) / 255.0
dot_layer = stage(dot)
stem_layer = stage(stem)
dot_mask_image = dot_layer.getchannel("A")
stem_mask_image = stem_layer.getchannel("A")

# The first beat is causal: the dot physically drops into the stem.  Keep the
# horizontal drift from the italic lettering so it feels attached to this
# particular i rather than like a generic vertical squash.
contact_dot = shifted_alpha(dot_mask_image, -11, 41)
contact_mask_image = Image.fromarray(
    np.maximum(
        np.asarray(stem_mask_image, dtype=np.uint8),
        np.asarray(contact_dot, dtype=np.uint8),
    )
)
contact_mask = np.asarray(contact_mask_image, dtype=np.float32) / 255.0

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
squash = Image.new("L", OUT_SIZE, 0)
ImageDraw.Draw(squash).ellipse(
    (
        collapse_target[0] - 40,
        collapse_target[1] - 17,
        collapse_target[0] + 40,
        collapse_target[1] + 17,
    ),
    fill=255,
)
squash_mask = np.asarray(squash, dtype=np.float32) / 255.0

sheet = Image.open(SYMBOL_SHEET).convert("RGBA")
q = sheet.width // 2
quadrants = [
    ("rewind", (0, 0, q, q), 122),
    ("cd-rom", (q, 0, sheet.width, q), 122),
    ("cursor", (0, q, q, sheet.height), 116),
    ("ai-bubble", (q, q, sheet.width, sheet.height), 122),
]
icon_layers = []
icon_masks = []
for name, crop_box, size in quadrants:
    icon = sheet.crop(crop_box)
    bbox = icon.getchannel("A").getbbox()
    if bbox:
        icon = icon.crop(bbox)
    target_size = round(size * ICON_SCALE)
    icon.thumbnail((target_size, target_size), Image.Resampling.LANCZOS)
    layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    layer.alpha_composite(
        icon,
        (
            collapse_target[0] - icon.width // 2,
            collapse_target[1] - icon.height // 2,
        ),
    )
    icon_layers.append((name, layer))
    icon_masks.append(
        np.asarray(layer.getchannel("A"), dtype=np.float32) / 255.0
    )

sdf_i = signed_distance(i_mask)
sdf_contact = signed_distance(contact_mask)
sdf_squash = signed_distance(squash_mask)
sdf_orb = signed_distance(orb_mask)
sdf_icons = [signed_distance(mask) for mask in icon_masks]


def morph_layer(progress, icon_index, direction=1.0):
    progress = max(0.0, min(1.0, progress))
    if progress < 0.28:
        local = smoothstep(progress / 0.28)
        sdf = sdf_i * (1.0 - local) + sdf_contact * local
    elif progress < 0.48:
        local = smoothstep((progress - 0.28) / 0.20)
        sdf = sdf_contact * (1.0 - local) + sdf_squash * local
    elif progress < 0.63:
        local = smoothstep((progress - 0.48) / 0.15)
        sdf = sdf_squash * (1.0 - local) + sdf_orb * local
    else:
        local = smoothstep((progress - 0.63) / 0.37)
        sdf = sdf_orb * (1.0 - local) + sdf_icons[icon_index] * local

    echo_strength = direction * 0.95 * np.sin(progress * np.pi) ** 2
    generated = brand_shape(alpha_from_sdf(sdf), echo=echo_strength)
    result = generated

    if progress < 0.10:
        original_weight = smoothstep((0.10 - progress) / 0.10)
        result = layer_opacity(generated, 1.0 - original_weight)
        result.alpha_composite(layer_opacity(i_layer, original_weight))
    elif progress > 0.84:
        icon_weight = smoothstep((progress - 0.84) / 0.16)
        result = layer_opacity(generated, 1.0 - icon_weight)
        result.alpha_composite(
            layer_opacity(icon_layers[icon_index][1], icon_weight)
        )
    if progress > 0.72:
        # One controlled overshoot gives the reveal a payoff without turning
        # the hand-painted mark into bouncy app-interface motion.
        local = (progress - 0.72) / 0.28
        overshoot = 1.0 + 0.075 * np.sin(local * np.pi)
        result = scale_about(result, overshoot, collapse_target)
    return result


full_i = plate_stage.copy()
full_i.alpha_composite(i_layer)
full_i.convert("RGB").save(QUIET_ZONE_STILL)

# Build an authored entrance from the exact selected wordmark.  The centre
# begins as a soft colour rush; LA and DIES arrive from opposite brush
# directions, the underline draws on, and the lowercase i lands last.
full_rgb = np.asarray(full_i.convert("RGB"))
red, green, blue = (
    full_rgb[:, :, 0],
    full_rgb[:, :, 1],
    full_rgb[:, :, 2],
)
yy, xx = np.ogrid[: OUT_SIZE[1], : OUT_SIZE[0]]
wordmark_region = (xx > 75) & (xx < 890) & (yy > 95) & (yy < 405)
wordmark_colour = (
    ((red > 145) & (red > green * 1.18) & (blue > 70))
    | ((red > 165) & (green > 105) & (blue < 180))
    | ((green > 125) & (blue > 150) & (blue > red * 1.45))
    | ((red > 185) & (green > 165) & (blue > 175))
)
wordmark_alpha = Image.fromarray(
    (wordmark_colour & wordmark_region).astype("uint8") * 255
).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(0.6))
wordmark_layer = full_i.copy()
wordmark_layer.putalpha(wordmark_alpha)

left_letters = masked_layer(
    wordmark_layer,
    spatial_mask((70, 90, 370, 350)),
)
right_letters = masked_layer(
    wordmark_layer,
    spatial_mask((455, 90, 900, 350)),
)
underline = masked_layer(
    wordmark_layer,
    spatial_mask((250, 315, 700, 405)),
)

intro_zone = Image.new("L", OUT_SIZE, 0)
ImageDraw.Draw(intro_zone).ellipse((65, 65, 905, 450), fill=255)
intro_zone = intro_zone.filter(ImageFilter.GaussianBlur(45))
colour_rush = full_i.filter(ImageFilter.GaussianBlur(34))
purple_rush = Image.new("RGBA", OUT_SIZE, (45, 5, 118, 255))
colour_rush = Image.blend(colour_rush, purple_rush, 0.42)
intro_plate = Image.composite(colour_rush, full_i, intro_zone)

frames = []
entrance_frames = round(0.58 * FPS)
for index in range(entrance_frames):
    progress = index / max(1, entrance_frames - 1)
    frame = intro_plate.copy()

    left_progress = smoothstep((progress - 0.05) / 0.42)
    right_progress = smoothstep((progress - 0.16) / 0.43)
    underline_progress = smoothstep((progress - 0.38) / 0.34)
    stem_progress = smoothstep((progress - 0.58) / 0.23)
    dot_progress = smoothstep((progress - 0.70) / 0.22)

    frame.alpha_composite(
        translated_layer(
            left_letters,
            dx=-34 * (1.0 - left_progress),
            opacity=left_progress,
        )
    )
    frame.alpha_composite(
        translated_layer(
            right_letters,
            dx=38 * (1.0 - right_progress),
            opacity=right_progress,
        )
    )
    frame.alpha_composite(reveal_from_left(underline, underline_progress))
    frame.alpha_composite(
        translated_layer(
            stem_layer,
            dy=8 * (1.0 - stem_progress),
            opacity=stem_progress,
        )
    )
    frame.alpha_composite(
        translated_layer(
            dot_layer,
            dy=-34 * (1.0 - dot_progress),
            opacity=dot_progress,
        )
    )

    # Resolve the temporary colour rush back to the exact source artwork
    # before the first dot-collapse begins.
    exact_weight = smoothstep((progress - 0.86) / 0.14)
    if exact_weight > 0:
        frame = Image.blend(frame, full_i, exact_weight)
    frames.append(frame)

for _ in range(round(0.12 * FPS)):
    frames.append(full_i.copy())

for icon_index, (_, icon_layer) in enumerate(icon_layers):
    morph_frames = round(0.43 * FPS)
    for index in range(morph_frames):
        frame = plate_stage.copy()
        progress = index / max(1, morph_frames - 1)
        impact = smoothstep((progress - 0.70) / 0.20) * (
            1.0 - smoothstep((progress - 0.90) / 0.10)
        )
        frame.alpha_composite(impact_layer(impact))
        frame.alpha_composite(
            morph_layer(progress, icon_index)
        )
        frames.append(frame)

    settle_frames = round(SYMBOL_HOLD_SECONDS * FPS)
    for index in range(settle_frames):
        frame = plate_stage.copy()
        hold_progress = index / max(1, settle_frames - 1)
        settle = 1.0 + 0.035 * (1.0 - smoothstep(hold_progress))
        frame.alpha_composite(
            impact_layer(0.28 * (1.0 - hold_progress))
        )
        frame.alpha_composite(
            scale_about(
                icon_microaction(icon_layer, icon_index, hold_progress),
                settle,
                collapse_target,
            )
        )
        frames.append(frame)

    for index in range(morph_frames):
        frame = plate_stage.copy()
        progress = 1.0 - index / max(1, morph_frames - 1)
        frame.alpha_composite(
            morph_layer(progress, icon_index, direction=-1.0)
        )
        frames.append(frame)

    # This reset is intentionally readable.  The next dot-drop cannot begin
    # until the audience has seen the complete i return.
    for _ in range(round(0.10 * FPS)):
        frames.append(full_i.copy())

for _ in range(round(0.20 * FPS)):
    frames.append(full_i.copy())

frames_rgb = [frame.convert("RGB") for frame in frames]
FRAME_DIR.mkdir(parents=True, exist_ok=True)
for old in FRAME_DIR.glob("frame-*.png"):
    old.unlink()
for index, frame in enumerate(frames_rgb):
    frame.save(FRAME_DIR / f"frame-{index:04d}.png")

samples = np.linspace(0, len(frames_rgb) - 1, 16, dtype=int)
contact = Image.new("RGB", (480 * 4, 270 * 4), (30, 8, 74))
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
