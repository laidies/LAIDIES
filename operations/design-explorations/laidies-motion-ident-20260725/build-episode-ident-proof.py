import json
import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont
from scipy.ndimage import distance_transform_edt


ROOT = Path(__file__).resolve().parent
MASTER_SOURCE = ROOT / "selected-comic-background-wordmark-v1.png"
BACKGROUND_SOURCE = ROOT / "comic-radial-background-base-v1.png"
MANIFESTS = json.loads((ROOT / "ident-variant-manifests.json").read_text())
IDENT_KEY = os.environ.get("LAIDIES_IDENT_KEY", "episode-04")
if IDENT_KEY not in MANIFESTS:
    raise SystemExit(
        f"Unknown LAIDIES_IDENT_KEY={IDENT_KEY!r}; "
        f"choose one of {', '.join(MANIFESTS)}"
    )
IDENT = MANIFESTS[IDENT_KEY]
SOURCE = ROOT / f"{IDENT_KEY}-comic-background-wordmark-v1.png"
BACKGROUND_PLATE_SOURCE = ROOT / f"{IDENT_KEY}-comic-background-only-v1.png"
VARIANT = os.environ.get("LAIDIES_VARIANT", IDENT["variant"])
SYMBOL_SHEET = ROOT / os.environ.get(
    "LAIDIES_SYMBOL_SHEET",
    IDENT["symbol_sheet"],
)
FORMATION_MODES = IDENT["formations"]
MICROACTION_MODES = IDENT["microactions"]
SYMBOL_COUNT = len(FORMATION_MODES)
ENTER_TRANSITIONS = IDENT.get("enter_transitions", ["standard"] * SYMBOL_COUNT)
EXIT_TRANSITIONS = IDENT.get("exit_transitions", ["standard"] * SYMBOL_COUNT)
STATE_TRANSITIONS = IDENT.get("state_transitions", [])
SEQUENCE_MODE = IDENT.get("sequence_mode", "reset")
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
IMPACT_FONT = Path("/System/Library/Fonts/Supplemental/Impact.ttf")
ARIAL_BOLD = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")


def build_episode_source():
    """Rebuild the master plate with Episode 04 language around a quiet centre."""
    background = Image.open(BACKGROUND_SOURCE).convert("RGBA")
    master = Image.open(MASTER_SOURCE).convert("RGBA")

    # The wordmark is lifted from the exact selected master. The central mask
    # excludes the old evergreen perimeter terms without redrawing the logo.
    master_rgb = np.asarray(master.convert("RGB"), dtype=np.int16)
    background_rgb = np.asarray(background.convert("RGB"), dtype=np.int16)
    difference = np.max(np.abs(master_rgb - background_rgb), axis=2)
    yy, xx = np.ogrid[: master.height, : master.width]
    old_token_tail = (xx < 240) & (yy > 340) & (yy < 530)
    central = (
        (xx > 180)
        & (xx < 1510)
        & (yy > 250)
        & (yy < 690)
        & ~old_token_tail
    )
    logo_alpha = Image.fromarray(
        ((difference > 13) & central).astype("uint8") * 255
    ).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(0.55))
    logo = master.copy()
    logo.putalpha(logo_alpha)

    draw = ImageDraw.Draw(background)
    term_slots = [
        ((44, 68), 86, 420, -5, (77, 217, 255), (252, 2, 146)),
        ((680, 38), 58, 330, 0, (255, 226, 35), (252, 2, 146)),
        ((1240, 78), 74, 390, 5, (197, 153, 255), (28, 224, 255)),
        ((48, 388), 58, 270, 0, (255, 226, 35), (252, 2, 146)),
        ((1490, 365), 54, 300, 90, (94, 206, 255), (252, 2, 146)),
        ((42, 788), 66, 450, -4, (197, 153, 255), (28, 224, 255)),
        ((1280, 790), 66, 360, 4, (94, 220, 255), (252, 2, 146)),
    ]
    for text_value, (
        anchor,
        maximum_size,
        maximum_width,
        angle,
        fill,
        shadow,
    ) in zip(IDENT["terms"], term_slots):
        size = maximum_size
        while size > 30:
            font = ImageFont.truetype(str(IMPACT_FONT), size)
            measured = draw.textbbox((0, 0), text_value, font=font, stroke_width=5)
            if measured[2] - measured[0] <= maximum_width:
                break
            size -= 2
        font = ImageFont.truetype(str(IMPACT_FONT), size)
        box = draw.textbbox((0, 0), text_value, font=font, stroke_width=2)
        tile = Image.new(
            "RGBA",
            (box[2] - box[0] + 90, box[3] - box[1] + 56),
            (0, 0, 0, 0),
        )
        td = ImageDraw.Draw(tile)
        if text_value != IDENT["terms"][3]:
            td.text(
                (14, 18),
                text_value,
                font=font,
                fill=shadow + (205,),
                stroke_width=5,
                stroke_fill=(37, 4, 92, 230),
            )
        td.text(
            (10, 12),
            text_value,
            font=font,
            fill=fill + (235,),
            stroke_width=3,
            stroke_fill=(37, 4, 92, 250),
        )
        if angle:
            tile = tile.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
        background.alpha_composite(tile, anchor)

    background.convert("RGB").save(BACKGROUND_PLATE_SOURCE)
    background.alpha_composite(logo)
    background.convert("RGB").save(SOURCE)


build_episode_source()


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


def nonuniform_scale_about(layer, width_scale, height_scale, centre):
    bounds = layer.getchannel("A").getbbox()
    if not bounds:
        return layer
    cropped = layer.crop(bounds)
    resized = cropped.resize(
        (
            max(1, round(cropped.width * width_scale)),
            max(1, round(cropped.height * height_scale)),
        ),
        Image.Resampling.LANCZOS,
    )
    source_centre = ((bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2)
    offset_x = centre[0] + (source_centre[0] - centre[0]) * width_scale
    offset_y = centre[1] + (source_centre[1] - centre[1]) * height_scale
    result = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    result.alpha_composite(
        resized,
        (
            round(offset_x - resized.width / 2),
            round(offset_y - resized.height / 2),
        ),
    )
    return result


def rotate_about(layer, angle, centre):
    if abs(angle) < 0.05:
        return layer
    bounds = layer.getchannel("A").getbbox()
    if not bounds:
        return layer
    cropped = layer.crop(bounds)
    rotated = cropped.rotate(
        angle,
        resample=Image.Resampling.BICUBIC,
        expand=True,
    )
    source_centre = ((bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2)
    result = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    result.alpha_composite(
        rotated,
        (
            round(source_centre[0] - rotated.width / 2),
            round(source_centre[1] - rotated.height / 2),
        ),
    )
    return result


def choreograph_transition(layer, progress, style, direction):
    """Give each object a distinct route between the shared orb and icon."""
    if style == "standard" or progress <= 0.55:
        return layer
    phase = smoothstep((progress - 0.55) / 0.45)
    remaining = 1.0 - phase
    result = layer

    if style == "flip":
        result = nonuniform_scale_about(
            result,
            0.08 + 0.92 * phase,
            0.76 + 0.24 * phase,
            collapse_target,
        )
        result = rotate_about(result, -9 * remaining * direction, collapse_target)
    elif style == "spin":
        result = scale_about(result, 0.55 + 0.45 * phase, collapse_target)
        result = rotate_about(result, 320 * remaining * direction, collapse_target)
    elif style == "whip":
        result = scale_about(result, 0.80 + 0.20 * phase, collapse_target)
        result = rotate_about(result, -24 * remaining * direction, collapse_target)
        result = translated_layer(
            result,
            dx=38 * remaining * direction,
            dy=-8 * np.sin(phase * np.pi),
        )
    elif style == "fold":
        result = nonuniform_scale_about(
            result,
            0.70 + 0.30 * phase,
            0.10 + 0.90 * phase,
            collapse_target,
        )
        result = rotate_about(result, 14 * remaining * direction, collapse_target)
    elif style == "tumble":
        result = nonuniform_scale_about(
            result,
            0.42 + 0.58 * phase,
            0.66 + 0.34 * phase,
            collapse_target,
        )
        result = rotate_about(result, 150 * remaining * direction, collapse_target)
        result = translated_layer(
            result,
            dy=-16 * np.sin(phase * np.pi),
        )
    elif style == "spiral":
        result = scale_about(result, 0.40 + 0.60 * phase, collapse_target)
        result = rotate_about(result, 460 * remaining * direction, collapse_target)
    elif style == "iris":
        result = scale_about(result, 0.16 + 0.84 * phase, collapse_target)
        result = rotate_about(result, 45 * remaining * direction, collapse_target)
    elif style == "snap":
        snap_scale = (
            0.62
            + 0.38 * phase
            + 0.12 * np.sin(phase * np.pi)
        )
        result = scale_about(result, snap_scale, collapse_target)
        result = rotate_about(result, -18 * remaining * direction, collapse_target)
        result = translated_layer(result, dx=-22 * remaining * direction)
    else:
        raise ValueError(f"Unknown transition style: {style}")
    return result


def transition_accent(style, strength, direction):
    """A small local cue makes the route change legible without a flash."""
    strength = max(0.0, min(1.0, strength))
    if strength <= 0 or style == "standard":
        return Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = collapse_target
    alpha = round(205 * strength)

    if style in ("spin", "spiral", "tumble"):
        radius = 42 + round(18 * strength)
        angle = 80 if direction > 0 else 260
        for offset, colour in (
            (0, (28, 224, 255, alpha)),
            (7, (255, 226, 35, round(alpha * 0.8))),
        ):
            draw.arc(
                (
                    cx - radius - offset,
                    cy - radius - offset,
                    cx + radius + offset,
                    cy + radius + offset,
                ),
                start=angle,
                end=angle + 205,
                fill=colour,
                width=3,
            )
    elif style in ("flip", "fold"):
        for index in range(4):
            y = cy - 21 + index * 14
            reach = 42 + index * 7
            draw.line(
                (cx - reach, y, cx + reach, y),
                fill=(
                    28 if index % 2 == 0 else 255,
                    224 if index % 2 == 0 else 226,
                    255 if index % 2 == 0 else 35,
                    round(alpha * (1.0 - index * 0.14)),
                ),
                width=2,
            )
    elif style in ("whip", "snap"):
        for index in range(5):
            offset = index * 9
            draw.line(
                (
                    cx - 58 * direction,
                    cy + 28 - offset,
                    cx - 18 * direction,
                    cy + 10 - offset,
                ),
                fill=(28, 224, 255, round(alpha * (1.0 - index * 0.12))),
                width=3,
            )
    elif style == "iris":
        for index in range(3):
            radius = 22 + index * 13 + round(8 * strength)
            draw.ellipse(
                (cx - radius, cy - radius, cx + radius, cy + radius),
                outline=(
                    255,
                    226 if index % 2 == 0 else 42,
                    35 if index % 2 == 0 else 169,
                    round(alpha * (1.0 - index * 0.18)),
                ),
                width=2,
            )
    return layer.filter(ImageFilter.GaussianBlur(0.4))


def direct_state_layer(from_index, to_index, progress, style):
    """Transform one centre character directly into the next without an i reset."""
    progress = max(0.0, min(1.0, progress))
    eased = smoothstep(progress)
    outgoing = icon_layers[from_index][1]
    incoming = icon_layers[to_index][1]
    result = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))

    if style == "horizontal-flip":
        if eased < 0.5:
            local = smoothstep(eased / 0.5)
            layer = nonuniform_scale_about(
                outgoing,
                1.0 - 0.94 * local,
                1.0 - 0.12 * local,
                collapse_target,
            )
            layer = rotate_about(layer, -11 * local, collapse_target)
        else:
            local = smoothstep((eased - 0.5) / 0.5)
            layer = nonuniform_scale_about(
                incoming,
                0.06 + 0.94 * local,
                0.88 + 0.12 * local,
                collapse_target,
            )
            layer = rotate_about(layer, 11 * (1.0 - local), collapse_target)
        result.alpha_composite(layer)
    elif style == "reel-spin":
        outgoing_weight = 1.0 - smoothstep(progress / 0.62)
        incoming_weight = smoothstep((progress - 0.24) / 0.76)
        outgoing_layer = scale_about(
            outgoing,
            1.0 - 0.58 * eased,
            collapse_target,
        )
        outgoing_layer = rotate_about(
            outgoing_layer,
            230 * eased,
            collapse_target,
        )
        incoming_layer = scale_about(
            incoming,
            0.34 + 0.66 * eased,
            collapse_target,
        )
        incoming_layer = rotate_about(
            incoming_layer,
            -285 * (1.0 - eased),
            collapse_target,
        )
        result.alpha_composite(layer_opacity(outgoing_layer, outgoing_weight))
        result.alpha_composite(layer_opacity(incoming_layer, incoming_weight))
    elif style == "edge-flip":
        if eased < 0.5:
            local = smoothstep(eased / 0.5)
            layer = nonuniform_scale_about(
                outgoing,
                1.0 - 0.95 * local,
                1.0 + 0.08 * np.sin(local * np.pi),
                collapse_target,
            )
        else:
            local = smoothstep((eased - 0.5) / 0.5)
            layer = nonuniform_scale_about(
                incoming,
                0.05 + 0.95 * local,
                1.0 + 0.08 * np.sin(local * np.pi),
                collapse_target,
            )
        result.alpha_composite(layer)
    elif style == "screen-zoom":
        outgoing_layer = translated_layer(
            scale_about(outgoing, 1.0 - 0.42 * eased, collapse_target),
            dy=24 * eased,
            opacity=1.0 - smoothstep(progress / 0.72),
        )
        incoming_layer = scale_about(
            incoming,
            0.28 + 0.72 * eased,
            collapse_target,
        )
        incoming_layer = translated_layer(
            incoming_layer,
            dy=-18 * (1.0 - eased),
            opacity=smoothstep((progress - 0.18) / 0.82),
        )
        result.alpha_composite(outgoing_layer)
        result.alpha_composite(incoming_layer)
    elif style == "lens-iris":
        outgoing_layer = scale_about(
            outgoing,
            1.0 - 0.80 * eased,
            collapse_target,
        )
        outgoing_layer = rotate_about(
            outgoing_layer,
            38 * eased,
            collapse_target,
        )
        incoming_layer = scale_about(
            incoming,
            0.18 + 0.82 * eased,
            collapse_target,
        )
        incoming_layer = rotate_about(
            incoming_layer,
            -58 * (1.0 - eased),
            collapse_target,
        )
        result.alpha_composite(
            layer_opacity(outgoing_layer, 1.0 - smoothstep(progress / 0.70))
        )
        result.alpha_composite(
            layer_opacity(incoming_layer, smoothstep((progress - 0.20) / 0.80))
        )
    else:
        from_sdf = sdf_icons[from_index]
        to_sdf = sdf_icons[to_index]
        generated = brand_shape(
            alpha_from_sdf(from_sdf * (1.0 - eased) + to_sdf * eased),
            echo=0.70 * np.sin(progress * np.pi),
        )
        result.alpha_composite(generated)

    # The reference's centre character does not occupy one fixed box. Give
    # each edge a different scale arc so some changes swell and others tighten.
    scale_arcs = (0.58, -0.42, 0.66, -0.36, 0.54)
    arc = scale_arcs[from_index % len(scale_arcs)]
    result = scale_about(
        result,
        1.0 + arc * np.sin(progress * np.pi),
        collapse_target,
    )

    # The reference carries motion inside the changing object. Let cyan lag and
    # yellow lead the silhouette itself; do not surround it with a separate
    # persistent emblem.
    if 0.08 < progress < 0.92:
        strength = np.sin(progress * np.pi)
        alpha = result.getchannel("A")
        echoed = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
        cyan = Image.new("RGBA", OUT_SIZE, (28, 224, 255, 0))
        cyan.putalpha(
            shifted_alpha(
                alpha,
                round(-18 * strength),
                round(5 * strength),
            ).point(lambda value: round(value * 0.60 * strength))
        )
        yellow = Image.new("RGBA", OUT_SIZE, (255, 226, 35, 0))
        yellow.putalpha(
            shifted_alpha(
                alpha,
                round(13 * strength),
                round(-4 * strength),
            ).point(lambda value: round(value * 0.48 * strength))
        )
        echoed.alpha_composite(cyan)
        echoed.alpha_composite(yellow)
        echoed.alpha_composite(result)
        result = echoed
    return result


def carrier_layer(time_seconds, visibility=1.0, energy=0.35):
    """Persistent rotating brush energy makes all icon states one performance."""
    visibility = max(0.0, min(1.0, visibility))
    energy = max(0.0, min(1.0, energy))
    if visibility <= 0:
        return Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))

    cx, cy = collapse_target
    phase = (time_seconds * 190.0) % 360.0
    layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))

    glow = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(
        (cx - 108, cy - 78, cx + 108, cy + 78),
        fill=(83, 16, 164, round(98 * visibility)),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    layer.alpha_composite(glow)

    orbit = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(orbit)
    orbit_colours = [
        (255, 42, 169, round(245 * visibility)),
        (28, 224, 255, round(225 * visibility)),
        (255, 226, 35, round(205 * visibility)),
    ]
    for index, (radius_x, radius_y, sweep) in enumerate(
        ((88, 62, 124), (98, 68, 88), (78, 56, 64))
    ):
        start = phase * (1.0 if index != 1 else -0.72) + index * 103
        draw.arc(
            (
                cx - radius_x,
                cy - radius_y,
                cx + radius_x,
                cy + radius_y,
            ),
            start=start,
            end=start + sweep,
            fill=orbit_colours[index],
            width=3 if index == 0 else 2,
        )

    spark_alpha = round((65 + 125 * energy) * visibility)
    for index in range(8):
        angle = np.deg2rad(phase + index * 45)
        inner = 101 + (index % 2) * 6
        outer = inner + 7 + round(9 * energy)
        colour = orbit_colours[index % len(orbit_colours)]
        draw.line(
            (
                cx + np.cos(angle) * inner,
                cy + np.sin(angle) * inner * 0.76,
                cx + np.cos(angle) * outer,
                cy + np.sin(angle) * outer * 0.76,
            ),
            fill=(colour[0], colour[1], colour[2], spark_alpha),
            width=2,
        )

    # Two asymmetric brush streaks replace a sterile perfect halo and give the
    # centre a left-to-right momentum that persists across every icon.
    streak_reach = 118 + round(24 * energy)
    draw.line(
        (cx - streak_reach, cy - 4, cx - 82, cy + 2),
        fill=(28, 224, 255, round(145 * visibility)),
        width=3,
    )
    draw.line(
        (cx + 82, cy + 5, cx + streak_reach, cy - 2),
        fill=(255, 42, 169, round(165 * visibility)),
        width=4,
    )
    layer.alpha_composite(orbit.filter(ImageFilter.GaussianBlur(0.35)))
    return layer


def living_icon_layer(icon_layer, icon_index, progress):
    """Keep each held icon internally alive instead of freezing."""
    result = icon_microaction(icon_layer, icon_index, progress)
    sway = 2.8 * np.sin(progress * np.pi * 2 + icon_index * 0.9)
    breathe = 1.0 + 0.018 * np.sin(progress * np.pi)
    result = rotate_about(result, sway, collapse_target)
    result = scale_about(result, breathe, collapse_target)
    trail = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    alpha = result.getchannel("A")
    drift = np.sin(progress * np.pi * 2 + icon_index)
    cyan = Image.new("RGBA", OUT_SIZE, (28, 224, 255, 0))
    cyan.putalpha(
        shifted_alpha(alpha, round(-3 - 2 * drift), 2).point(
            lambda value: round(value * 0.13)
        )
    )
    yellow = Image.new("RGBA", OUT_SIZE, (255, 226, 35, 0))
    yellow.putalpha(
        shifted_alpha(alpha, round(2 + 2 * drift), -1).point(
            lambda value: round(value * 0.10)
        )
    )
    trail.alpha_composite(cyan)
    trail.alpha_composite(yellow)
    trail.alpha_composite(result)
    return trail


def electric_optical_finish(frame, time_seconds, intensity):
    """Add the reference's clean neon optics without damaged-tape artifacts."""
    intensity = max(0.0, min(1.0, intensity))
    if intensity <= 0 or not IDENT.get("electric_optical", False):
        return frame

    cx, cy = collapse_target
    focus = Image.new("L", OUT_SIZE, 0)
    ImageDraw.Draw(focus).ellipse(
        (cx - 174, cy - 122, cx + 174, cy + 122),
        fill=round(230 * intensity),
    )
    focus = focus.filter(ImageFilter.GaussianBlur(44))

    blurred = frame.filter(ImageFilter.GaussianBlur(5.5))
    screened = ImageChops.screen(
        frame.convert("RGB"),
        blurred.convert("RGB"),
    ).convert("RGBA")
    global_bloom = Image.blend(frame, screened, 0.065 * intensity)
    centre_bloom = Image.blend(global_bloom, screened, 0.22 * intensity)
    result = Image.composite(centre_bloom, global_bloom, focus)

    red, green, blue, alpha = result.split()
    drift = 1 + round(0.8 * np.sin(time_seconds * 11.0))
    red_shift = shifted_alpha(red, drift, 0)
    blue_shift = shifted_alpha(blue, -drift, 0)
    split = Image.merge("RGBA", (red_shift, green, blue_shift, alpha))
    global_split = Image.blend(result, split, 0.055 * intensity)
    centre_split = Image.blend(global_split, split, 0.20 * intensity)
    result = Image.composite(centre_split, global_split, focus)

    # Smooth radial trails appear only at the energetic switching peaks. They
    # are light emitted by the changing object, not a permanent ring or noise.
    streak_strength = smoothstep((intensity - 0.76) / 0.24)
    if streak_strength > 0:
        streaks = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
        draw = ImageDraw.Draw(streaks)
        colours = (
            (28, 224, 255),
            (255, 42, 169),
            (255, 226, 35),
        )
        phase = time_seconds * 0.55
        for index in range(18):
            angle = phase + index * (np.pi * 2 / 18)
            inner = 58 + (index % 3) * 5
            outer = inner + 40 + (index % 4) * 13
            colour = colours[index % len(colours)]
            draw.line(
                (
                    cx + np.cos(angle) * inner,
                    cy + np.sin(angle) * inner * 0.72,
                    cx + np.cos(angle) * outer,
                    cy + np.sin(angle) * outer * 0.72,
                ),
                fill=(
                    colour[0],
                    colour[1],
                    colour[2],
                    round((58 + (index % 3) * 18) * streak_strength),
                ),
                width=2,
            )
        result.alpha_composite(streaks.filter(ImageFilter.GaussianBlur(1.4)))

    flicker = 1.0 + 0.010 * intensity * np.sin(time_seconds * 13.0)
    return ImageEnhance.Brightness(result).enhance(flicker)


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

    mode = MICROACTION_MODES[icon_index]

    if mode == "scan":
        x = left + round(width * (0.12 + 0.76 * smoothstep(progress)))
        draw.line(
            (x, top + round(height * 0.16), x, bottom - round(height * 0.14)),
            fill=(28, 224, 255, 225),
            width=3,
        )
    elif mode == "radio":
        pulse = 1.0 - abs(progress * 2.0 - 1.0)
        cx, cy = left + round(width * 0.62), top + round(height * 0.22)
        for index, radius in enumerate((10, 18, 27)):
            alpha = round((115 + index * 45) * pulse)
            draw.arc(
                (cx - radius, cy - radius, cx + radius, cy + radius),
                start=285,
                end=70,
                fill=(255, 226, 35, alpha),
                width=3,
            )
    elif mode == "flash":
        pulse = 1.0 - abs(progress * 2.0 - 1.0)
        x = left + round(width * 0.50)
        draw.line(
            (x, top + round(height * 0.23), x, bottom - round(height * 0.16)),
            fill=(28, 224, 255, round(220 * pulse)),
            width=3,
        )
    elif mode == "select":
        cell = min(2, int(progress * 3))
        cell_w = width * 0.20
        x0 = left + round(width * (0.10 + cell * 0.25))
        y0 = top + round(height * 0.12)
        draw.rounded_rectangle(
            (x0, y0, x0 + round(cell_w), y0 + round(height * 0.20)),
            radius=2,
            outline=(28, 224, 255, 245),
            width=3,
        )
    elif mode == "reels":
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
            draw.arc(
                box,
                start=angle,
                end=angle + 145,
                fill=(255, 226, 35, 245),
                width=2,
            )
    elif mode == "blink":
        if progress < 0.42 or progress > 0.76:
            y = top + round(height * 0.58)
            draw.line(
                (
                    left + round(width * 0.42),
                    y,
                    left + round(width * 0.64),
                    y,
                ),
                fill=(255, 226, 35, 255),
                width=3,
            )
    elif mode == "check":
        pulse = smoothstep(progress)
        x = left + round(width * 0.52)
        y = top + round(height * 0.54)
        reach = round(8 + 5 * pulse)
        draw.line(
            (x - reach, y, x - 2, y + reach // 2),
            fill=(28, 224, 255, 245),
            width=3,
        )
        draw.line(
            (x - 2, y + reach // 2, x + reach, y - reach),
            fill=(28, 224, 255, 245),
            width=3,
        )
    elif mode == "pulse":
        pulse = 1.0 - abs(progress * 2.0 - 1.0)
        radius = round(5 + 10 * pulse)
        cx, cy = left + width // 2, top + height // 2
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            outline=(28, 224, 255, round(240 * pulse)),
            width=3,
        )
    elif mode == "disc":
        cx, cy = left + width // 2, top + height // 2
        radius = max(8, round(min(width, height) * 0.35))
        angle = round(progress * 360)
        draw.arc(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            start=angle,
            end=angle + 112,
            fill=(28, 224, 255, 245),
            width=3,
        )
        spoke_x = cx + round(np.cos(np.deg2rad(angle)) * radius)
        spoke_y = cy + round(np.sin(np.deg2rad(angle)) * radius)
        draw.line((cx, cy, spoke_x, spoke_y), fill=(255, 226, 35, 235), width=2)
    elif mode == "photo":
        pulse = 1.0 - abs(progress * 2.0 - 1.0)
        cx = left + round(width * 0.52)
        cy = top + round(height * 0.55)
        reach = round(7 + 8 * pulse)
        draw.line((cx - reach, cy, cx + reach, cy), fill=(255, 226, 35, 245), width=3)
        draw.line((cx, cy - reach, cx, cy + reach), fill=(28, 224, 255, 235), width=3)

    result.alpha_composite(overlay)
    return result


source = Image.open(SOURCE).convert("RGB")
dot_spatial = ellipse_mask(source.size, (710, 286, 822, 408))
stem_spatial = polygon_mask(
    source.size,
    [(706, 386), (780, 374), (735, 563), (646, 563)],
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
intro_background = stage(
    Image.open(BACKGROUND_PLATE_SOURCE).convert("RGB")
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

collapse_target = (
    round(722 * SCALE),
    round(IDENT.get("centre_y_native", 500) * SCALE),
)
# During the living-centre performance, the reference changes visual hierarchy:
# the surrounding mark recedes slightly while the centre character stays hot.
# Preserve the comic background, but give the moving object a calm focal pocket.
performance_dark = Image.new("RGBA", OUT_SIZE, (22, 3, 70, 255))
performance_dimmed = Image.blend(plate_stage, performance_dark, 0.34)
performance_focus_mask = Image.new("L", OUT_SIZE, 0)
ImageDraw.Draw(performance_focus_mask).ellipse(
    (
        collapse_target[0] - 150,
        collapse_target[1] - 112,
        collapse_target[0] + 150,
        collapse_target[1] + 112,
    ),
    fill=255,
)
performance_focus_mask = performance_focus_mask.filter(ImageFilter.GaussianBlur(58))
performance_plate_stage = Image.composite(
    plate_stage,
    performance_dimmed,
    performance_focus_mask,
)
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
symbol_names = IDENT.get(
    "symbol_names",
    [
        "algorithm-card",
        "frequency-radio",
        "compiler-moth",
        "training-data-grid",
    ],
)
symbol_sizes = IDENT.get("symbol_sizes", [116] * SYMBOL_COUNT)
if IDENT.get("symbol_layout") == "horizontal":
    cell_width = sheet.width // SYMBOL_COUNT
    symbol_cells = [
        (
            symbol_names[index],
            (
                index * cell_width,
                0,
                sheet.width if index == SYMBOL_COUNT - 1 else (index + 1) * cell_width,
                sheet.height,
            ),
            symbol_sizes[index],
        )
        for index in range(SYMBOL_COUNT)
    ]
else:
    qx = sheet.width // 2
    qy = sheet.height // 2
    crop_boxes = [
        (0, 0, qx, qy),
        (qx, 0, sheet.width, qy),
        (0, qy, qx, sheet.height),
        (qx, qy, sheet.width, sheet.height),
    ]
    symbol_cells = [
        (symbol_names[index], crop_boxes[index], symbol_sizes[index])
        for index in range(SYMBOL_COUNT)
    ]
icon_layers = []
icon_masks = []
icon_alpha_images = []
for name, crop_box, size in symbol_cells:
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
    icon_alpha_images.append(layer.getchannel("A"))
    icon_masks.append(
        np.asarray(layer.getchannel("A"), dtype=np.float32) / 255.0
    )

sdf_i = signed_distance(i_mask)
sdf_contact = signed_distance(contact_mask)
sdf_squash = signed_distance(squash_mask)
sdf_orb = signed_distance(orb_mask)
sdf_icons = [signed_distance(mask) for mask in icon_masks]
formation_sdf_cache = {}


def nonuniform_alpha(alpha, width_scale, height_scale):
    bounds = alpha.getbbox()
    if not bounds:
        return alpha
    crop = alpha.crop(bounds)
    resized = crop.resize(
        (
            max(1, round(crop.width * width_scale)),
            max(1, round(crop.height * height_scale)),
        ),
        Image.Resampling.LANCZOS,
    )
    result = Image.new("L", OUT_SIZE, 0)
    result.paste(
        resized,
        (
            collapse_target[0] - resized.width // 2,
            collapse_target[1] - resized.height // 2,
        ),
    )
    return result


def formation_sdf(icon_index, local):
    # Quantization makes the reverse use the exact same silhouettes while
    # avoiding a second expensive distance calculation for every frame.
    step = max(0, min(60, round(local * 60)))
    key = (icon_index, step)
    if key in formation_sdf_cache:
        return formation_sdf_cache[key]
    local = step / 60
    eased = smoothstep(local)
    target_alpha = icon_alpha_images[icon_index]

    mode = FORMATION_MODES[icon_index]

    if mode == "horizontal_expand":
        formed = nonuniform_alpha(
            target_alpha,
            0.12 + 0.88 * eased,
            0.68 + 0.32 * eased,
        )
    elif mode == "vertical_expand":
        formed = nonuniform_alpha(
            target_alpha,
            0.58 + 0.42 * eased,
            0.08 + 0.92 * eased,
        )
    elif mode == "scanline":
        formed = nonuniform_alpha(
            target_alpha,
            0.88 + 0.12 * eased,
            0.035 + 0.965 * eased,
        )
    elif mode == "radial_expand":
        formed = nonuniform_alpha(
            target_alpha,
            0.12 + 0.88 * eased,
            0.12 + 0.88 * eased,
        )
    elif mode == "paper_feed":
        formed = nonuniform_alpha(
            target_alpha,
            0.42 + 0.58 * eased,
            0.10 + 0.90 * eased,
        )
    elif mode == "antenna":
        antenna = Image.new("L", OUT_SIZE, 0)
        antenna_height = round(12 + 46 * smoothstep(min(1.0, local / 0.42)))
        ImageDraw.Draw(antenna).line(
            (
                collapse_target[0],
                collapse_target[1] + 10,
                collapse_target[0],
                collapse_target[1] + 10 - antenna_height,
            ),
            fill=255,
            width=7,
        )
        body_progress = smoothstep((local - 0.24) / 0.76)
        body = nonuniform_alpha(
            target_alpha,
            0.28 + 0.72 * body_progress,
            0.18 + 0.82 * body_progress,
        )
        formed = Image.fromarray(
            np.maximum(np.asarray(antenna), np.asarray(body))
        )
    elif mode == "wings":
        formed = nonuniform_alpha(
            target_alpha,
            0.10 + 0.90 * eased,
            0.62 + 0.38 * eased,
        )
    elif mode == "eye_grid":
        formed = Image.new("L", OUT_SIZE, 0)
        eye_progress = smoothstep(min(1.0, local / 0.42))
        eye_w = round(10 + 34 * eye_progress)
        eye_h = round(7 + 20 * eye_progress)
        ImageDraw.Draw(formed).ellipse(
            (
                collapse_target[0] - eye_w,
                collapse_target[1] - eye_h,
                collapse_target[0] + eye_w,
                collapse_target[1] + eye_h,
            ),
            fill=255,
        )
        grid_progress = smoothstep((local - 0.28) / 0.72)
        if grid_progress > 0:
            grid = nonuniform_alpha(
                target_alpha,
                0.34 + 0.66 * grid_progress,
                0.34 + 0.66 * grid_progress,
            )
            formed = Image.fromarray(
                np.maximum(np.asarray(formed), np.asarray(grid))
            )
        if local > 0.92:
            formed = target_alpha
    else:
        raise ValueError(f"Unknown formation mode: {mode}")

    mask = np.asarray(formed, dtype=np.float32) / 255.0
    result = signed_distance(mask)
    formation_sdf_cache[key] = result
    return result


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
        phase = max(0.0, min(1.0, (progress - 0.63) / 0.37))
        if phase < 0.18:
            bridge = smoothstep(phase / 0.18)
            authored_start = formation_sdf(icon_index, 0.0)
            sdf = sdf_orb * (1.0 - bridge) + authored_start * bridge
        else:
            local = smoothstep((phase - 0.18) / 0.82)
            sdf = formation_sdf(icon_index, local)

    echo_strength = direction * 0.95 * np.sin(progress * np.pi) ** 2
    generated = brand_shape(alpha_from_sdf(sdf), echo=echo_strength)
    result = generated

    if progress < 0.10:
        original_weight = smoothstep((0.10 - progress) / 0.10)
        result = layer_opacity(generated, 1.0 - original_weight)
        result.alpha_composite(layer_opacity(i_layer, original_weight))
    elif progress > 0.90:
        icon_weight = smoothstep((progress - 0.90) / 0.10)
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
    style = (
        ENTER_TRANSITIONS[icon_index]
        if direction > 0
        else EXIT_TRANSITIONS[icon_index]
    )
    return choreograph_transition(result, progress, style, direction)


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

frames = []
entrance_frames = round(0.52 * FPS)
for index in range(entrance_frames):
    progress = index / max(1, entrance_frames - 1)
    frame = intro_background.copy()

    i_progress = smoothstep((progress - 0.04) / 0.24)
    if i_progress > 0:
        i_entry = scale_about(
            i_layer,
            0.52 + 0.48 * i_progress,
            collapse_target,
        )
        frame.alpha_composite(layer_opacity(i_entry, i_progress))

    word_progress = smoothstep((progress - 0.18) / 0.64)
    if word_progress > 0:
        radius_x = round(18 + 540 * word_progress)
        radius_y = round(12 + 255 * word_progress)
        reveal_mask = Image.new("L", OUT_SIZE, 0)
        ImageDraw.Draw(reveal_mask).ellipse(
            (
                collapse_target[0] - radius_x,
                collapse_target[1] - radius_y,
                collapse_target[0] + radius_x,
                collapse_target[1] + radius_y,
            ),
            fill=255,
        )
        reveal_mask = reveal_mask.filter(ImageFilter.GaussianBlur(8))
        revealed_wordmark = masked_layer(wordmark_layer, reveal_mask)
        revealed_wordmark = scale_about(
            revealed_wordmark,
            0.91 + 0.09 * word_progress,
            collapse_target,
        )
        frame.alpha_composite(
            layer_opacity(revealed_wordmark, word_progress)
        )

    burst = (
        smoothstep((progress - 0.10) / 0.20)
        * (1.0 - smoothstep((progress - 0.58) / 0.24))
    )
    if burst > 0:
        frame.alpha_composite(impact_layer(0.82 * burst))

    exact_weight = smoothstep((progress - 0.88) / 0.12)
    if exact_weight > 0:
        frame = Image.blend(frame, full_i, exact_weight)
    frame = electric_optical_finish(
        frame,
        len(frames) / FPS,
        0.58 + 0.42 * burst,
    )
    frames.append(frame)

for _ in range(round(0.08 * FPS)):
    frames.append(
        electric_optical_finish(full_i.copy(), len(frames) / FPS, 0.55)
    )

if SEQUENCE_MODE == "continuous-states":
    morph_frames = round(0.36 * FPS)
    for index in range(morph_frames):
        progress = index / max(1, morph_frames - 1)
        focus = smoothstep((progress - 0.30) / 0.70)
        frame = Image.blend(plate_stage, performance_plate_stage, focus)
        frame.alpha_composite(morph_layer(progress, 0))
        frame = electric_optical_finish(frame, len(frames) / FPS, 0.72 * focus)
        frames.append(frame)

    settle_frames = round(SYMBOL_HOLD_SECONDS * FPS)
    for index in range(settle_frames):
        frame = performance_plate_stage.copy()
        progress = index / max(1, settle_frames - 1)
        frame.alpha_composite(
            living_icon_layer(icon_layers[0][1], 0, progress)
        )
        frame = electric_optical_finish(frame, len(frames) / FPS, 0.78)
        frames.append(frame)

    state_frames = round(0.30 * FPS)
    for from_index in range(SYMBOL_COUNT - 1):
        to_index = from_index + 1
        style = STATE_TRANSITIONS[from_index]
        for index in range(state_frames):
            frame = performance_plate_stage.copy()
            progress = index / max(1, state_frames - 1)
            frame.alpha_composite(
                direct_state_layer(from_index, to_index, progress, style)
            )
            frame = electric_optical_finish(
                frame,
                len(frames) / FPS,
                0.84 + 0.16 * np.sin(progress * np.pi),
            )
            frames.append(frame)
        for index in range(settle_frames):
            frame = performance_plate_stage.copy()
            progress = index / max(1, settle_frames - 1)
            frame.alpha_composite(
                living_icon_layer(
                    icon_layers[to_index][1],
                    to_index,
                    progress,
                )
            )
            frame = electric_optical_finish(frame, len(frames) / FPS, 0.78)
            frames.append(frame)

    for index in range(morph_frames):
        progress = 1.0 - index / max(1, morph_frames - 1)
        focus = smoothstep(progress / 0.70)
        frame = Image.blend(plate_stage, performance_plate_stage, focus)
        frame.alpha_composite(
            morph_layer(progress, SYMBOL_COUNT - 1, direction=-1.0)
        )
        frame = electric_optical_finish(frame, len(frames) / FPS, 0.72 * focus)
        frames.append(frame)
else:
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
                transition_accent(
                    ENTER_TRANSITIONS[icon_index],
                    impact,
                    1.0,
                )
            )
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
            exit_impact = smoothstep((0.88 - progress) / 0.18) * (
                1.0 - smoothstep((0.60 - progress) / 0.16)
            )
            frame.alpha_composite(
                transition_accent(
                    EXIT_TRANSITIONS[icon_index],
                    exit_impact,
                    -1.0,
                )
            )
            frame.alpha_composite(
                morph_layer(progress, icon_index, direction=-1.0)
            )
            frames.append(frame)

        # This reset is intentionally readable.  The next dot-drop cannot begin
        # until the audience has seen the complete i return.
        for _ in range(round(0.10 * FPS)):
            frames.append(full_i.copy())

final_reset_frames = round(0.18 * FPS)
for index in range(final_reset_frames):
    intensity = 0.62 - 0.18 * index / max(1, final_reset_frames - 1)
    frames.append(
        electric_optical_finish(
            full_i.copy(),
            len(frames) / FPS,
            intensity,
        )
    )


def episode_title_frame(progress):
    """Let the episode identity arrive only after the final complete i reset."""
    progress = smoothstep(progress)
    frame = full_i.copy()
    title_layer = Image.new("RGBA", OUT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(title_layer)
    episode_font = ImageFont.truetype(str(ARIAL_BOLD), 20)
    title_font = ImageFont.truetype(str(IMPACT_FONT), 36)
    episode = IDENT["label"]
    title = IDENT["title"]
    while title_font.getbbox(title)[2] > 680:
        title_font = ImageFont.truetype(str(IMPACT_FONT), title_font.size - 1)
    episode_box = draw.textbbox((0, 0), episode, font=episode_font)
    title_box = draw.textbbox((0, 0), title, font=title_font, stroke_width=2)
    episode_x = (OUT_SIZE[0] - (episode_box[2] - episode_box[0])) // 2
    title_x = (OUT_SIZE[0] - (title_box[2] - title_box[0])) // 2
    y_offset = round(16 * (1.0 - progress))
    alpha = round(255 * progress)
    draw.text(
        (episode_x, 424 + y_offset),
        episode,
        font=episode_font,
        fill=(255, 226, 35, alpha),
        stroke_width=2,
        stroke_fill=(37, 4, 92, alpha),
    )
    draw.text(
        (title_x + 4, 448 + y_offset + 3),
        title,
        font=title_font,
        fill=(28, 224, 255, alpha),
        stroke_width=3,
        stroke_fill=(37, 4, 92, alpha),
    )
    draw.text(
        (title_x, 448 + y_offset),
        title,
        font=title_font,
        fill=(252, 2, 146, alpha),
        stroke_width=2,
        stroke_fill=(255, 226, 35, alpha),
    )
    frame.alpha_composite(title_layer)
    return frame


if IDENT.get("show_title", True):
    title_reveal_frames = round(0.42 * FPS)
    for index in range(title_reveal_frames):
        frames.append(
            episode_title_frame(index / max(1, title_reveal_frames - 1))
        )
    for _ in range(round(0.58 * FPS)):
        frames.append(episode_title_frame(1.0))
else:
    final_hold_frames = round(0.55 * FPS)
    for index in range(final_hold_frames):
        intensity = 0.36 - 0.18 * index / max(1, final_hold_frames - 1)
        frames.append(
            electric_optical_finish(
                full_i.copy(),
                len(frames) / FPS,
                intensity,
            )
        )

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
