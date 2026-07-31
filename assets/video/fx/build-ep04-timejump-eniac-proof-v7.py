#!/usr/bin/env python3
"""Build small, random ENIAC indicator blinks under a protected people layer.

Unlike v1-v6, this pass does not use a conservative machine-light mask around
the women.  It segments the six women into a foreground layer, animates the
complete machine underneath, then restores the untouched foreground pixels.
Lamps retain their detected source-pixel footprint: no enlarged circles or
broad halos.
"""

from __future__ import annotations

import importlib.util
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


HERE = Path(__file__).resolve().parent
V1_SCRIPT = HERE / "build-ep04-timejump-eniac-proof-v1.py"

spec = importlib.util.spec_from_file_location("eniac_proof_v1", V1_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V1_SCRIPT}")
v1 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v1)

OUTPUT = v1.PIXEL / "ep04-timejump-to-eniac-motion-proof-v7.mp4"
PERSON_MASK_FILE = v1.QA / "ep04-eniac-people-mask-u2net-v2.png"
PERSON_PREVIEW = v1.QA / "ep04-eniac-people-layer-v7.jpg"
LAMP_PREVIEW = v1.QA / "ep04-eniac-small-lamp-mask-v7.jpg"

GROUP_COUNT = 48
PATTERN_SLOTS = 10
LOOP_SECONDS = 5.0


def smooth_array(values: np.ndarray) -> np.ndarray:
    values = np.clip(values, 0.0, 1.0)
    return values * values * (3.0 - 2.0 * values)


def complete_people_mask() -> np.ndarray:
    """Combine tiled U-2-Net edges with tight fills for missed dark skirts."""
    raw = np.asarray(Image.open(PERSON_MASK_FILE).convert("L"), dtype=np.float32)
    raw /= 255.0
    # Keep the model's confident silhouettes. Lower-confidence regions spread
    # into the dark machinery in this illustration and would suppress lamps.
    mask = smooth_array((raw - 0.30) / 0.18)

    fill = np.zeros((v1.H, v1.W), dtype=np.uint8)
    polygons = [
        # Only the dark skirts/dresses that the model under-segments. Heads,
        # hands, arms and upper bodies come from the fitted model silhouette.
        [(1090, 390), (1365, 370), (1395, 850), (1358, 910),
         (1090, 910), (1075, 465)],
        [(1345, 400), (1565, 392), (1595, 815), (1550, 870),
         (1335, 870), (1325, 455)],
        [(1690, 410), (1895, 392), (1920, 850), (1660, 880),
         (1648, 490)],
    ]
    for points in polygons:
        cv2.fillPoly(fill, [np.asarray(points, dtype=np.int32)], 255)
    # Close small confidence holes inside dark hair, which otherwise resemble
    # warm indicator pixels to the lamp detector.
    for centre, axes in [
        ((500, 245), (175, 160)),
        ((905, 430), (150, 112)),
        ((1200, 210), (132, 116)),
        ((1450, 260), (105, 98)),
        ((1600, 485), (112, 92)),
        ((1810, 290), (105, 94)),
    ]:
        cv2.ellipse(fill, centre, axes, 0.0, 0.0, 360.0, 255, -1)

    fill = cv2.GaussianBlur(fill, (0, 0), 1.4).astype(np.float32) / 255.0
    mask = np.maximum(mask, fill)
    mask = cv2.dilate(
        np.round(mask * 255.0).astype(np.uint8),
        np.ones((5, 5), dtype=np.uint8),
        iterations=1,
    ).astype(np.float32) / 255.0
    return cv2.GaussianBlur(mask, (0, 0), 1.0)


def machine_region() -> np.ndarray:
    region = np.zeros((v1.H, v1.W), dtype=np.uint8)
    cv2.fillPoly(
        region,
        [np.asarray(
            [(0, 0), (1450, 0), (1510, 220), (1550, 360),
             (1460, 650), (1360, 800), (650, 1040), (0, 1040)],
            dtype=np.int32,
        )],
        1,
    )
    return region.astype(bool)


def lamp_layers(
    image: np.ndarray,
    people: np.ndarray,
) -> tuple[np.ndarray, np.ndarray, np.ndarray, int]:
    """Return exact-size lamp cores, timing-group map and random blink table."""
    red, green, blue = image[..., 0], image[..., 1], image[..., 2]
    xx = np.indices((v1.H, v1.W))[1].astype(np.float32)
    distance = xx / v1.W
    candidate = (
        machine_region()
        & (people < 0.06)
        & (red >= (132.0 - 24.0 * distance))
        & (green >= (58.0 - 9.0 * distance))
        & (blue <= 112.0)
        & ((red - blue) >= 42.0)
        & ((red - green) >= 15.0)
    )

    count, labels, stats, centroids = cv2.connectedComponentsWithStats(
        candidate.astype(np.uint8), connectivity=8
    )
    luminance = image.mean(axis=2)
    core = np.zeros((v1.H, v1.W), dtype=np.float32)
    group_map = np.zeros((v1.H, v1.W), dtype=np.uint8)
    accepted = 0

    for label in range(1, count):
        x, y, width, height, area = stats[label]
        if not 2 <= area <= 150:
            continue
        if width > 24 or height > 24:
            continue
        if max(width / max(height, 1), height / max(width, 1)) > 2.8:
            continue

        cx, cy = centroids[label]
        x0, y0 = max(0, x - 8), max(0, y - 8)
        x1 = min(v1.W, x + width + 8)
        y1 = min(v1.H, y + height + 8)
        surrounding = luminance[y0:y1, x0:x1]
        if np.median(surrounding) >= 92.0:
            continue
        if float(np.mean(surrounding < 88.0)) <= 0.40:
            continue

        component = labels == label
        group = (
            int(round(cx)) * 37
            + int(round(cy)) * 61
            + int(cx // 31) * 17
        ) % GROUP_COUNT
        core[component] = 1.0
        group_map[component] = group
        accepted += 1

    rng = np.random.default_rng(1945)
    states = rng.random((GROUP_COUNT, PATTERN_SLOTS)) < 0.47
    for group in range(GROUP_COUNT):
        if states[group].all() or not states[group].any():
            states[group, group % PATTERN_SLOTS] = True
            states[group, (group + 3) % PATTERN_SLOTS] = False
    offsets = rng.uniform(0.0, LOOP_SECONDS / PATTERN_SLOTS, GROUP_COUNT)
    return core, group_map, states.astype(np.float32), offsets, accepted


def blink_amounts(
    seconds: float,
    states: np.ndarray,
    offsets: np.ndarray,
) -> np.ndarray:
    slot_seconds = LOOP_SECONDS / PATTERN_SLOTS
    amounts = np.zeros(GROUP_COUNT, dtype=np.float32)
    for group in range(GROUP_COUNT):
        position = ((seconds + offsets[group]) % LOOP_SECONDS) / slot_seconds
        index = int(np.floor(position)) % PATTERN_SLOTS
        fraction = position - np.floor(position)
        previous = states[group, (index - 1) % PATTERN_SLOTS]
        current = states[group, index]
        if fraction < 0.22 and previous != current:
            transition = v1.smoothstep(fraction / 0.22)
            amounts[group] = previous * (1.0 - transition) + current * transition
        else:
            amounts[group] = current
    return amounts


def machine_frame(
    base: np.ndarray,
    people: np.ndarray,
    core: np.ndarray,
    group_map: np.ndarray,
    states: np.ndarray,
    offsets: np.ndarray,
    seconds: float,
) -> np.ndarray:
    amounts = blink_amounts(seconds, states, offsets)
    per_pixel = amounts[group_map] * core

    # Only the detected luminous pixels change. The metal housings, cables and
    # surrounding panels retain their original size and colour.
    dimmed = base * (1.0 - core[..., None] * 0.46)
    glow = per_pixel * 192.0
    animated = v1.screen_glow(dimmed, glow, (255.0, 174.0, 54.0))
    return animated * (1.0 - people[..., None]) + base * people[..., None]


def save_previews(
    image: np.ndarray,
    people: np.ndarray,
    core: np.ndarray,
) -> None:
    v1.QA.mkdir(parents=True, exist_ok=True)
    people_preview = image.astype(np.uint8).copy()
    active_people = people >= 0.50
    people_preview[active_people] = (
        people_preview[active_people].astype(np.float32) * 0.38
        + np.asarray([20.0, 205.0, 255.0], dtype=np.float32) * 0.62
    ).astype(np.uint8)
    Image.fromarray(people_preview).save(PERSON_PREVIEW, quality=94)

    lamp_preview = image.astype(np.uint8).copy()
    active_lamps = core >= 0.50
    lamp_preview[active_lamps] = (
        lamp_preview[active_lamps].astype(np.float32) * 0.28
        + np.asarray([255.0, 30.0, 18.0], dtype=np.float32) * 0.72
    ).astype(np.uint8)
    Image.fromarray(lamp_preview).save(LAMP_PREVIEW, quality=94)


def main() -> None:
    if OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite proof: {OUTPUT}")
    for path in (
        v1.HEDY,
        v1.ERA_CARD,
        v1.ENIAC,
        v1.SWIRL,
        v1.NARRATION,
        v1.FFMPEG,
        V1_SCRIPT,
        PERSON_MASK_FILE,
    ):
        if not path.is_file():
            raise FileNotFoundError(path)

    hedy = v1.load_rgb(v1.HEDY)
    card = v1.load_rgb(v1.ERA_CARD)
    eniac = v1.load_rgb(v1.ENIAC)
    hedy_groups = v1.hedy_signal_groups(hedy)

    full_region = np.ones((v1.H, v1.W), dtype=bool)
    card_candidate = v1.warm_candidates(card, full_region)
    card_groups, card_lights = v1.component_glow_groups(
        card_candidate, 7, min_area=3, max_area=240
    )

    people = complete_people_mask()
    core, group_map, states, offsets, machine_lights = lamp_layers(eniac, people)
    if card_lights < 90:
        raise RuntimeError(f"Too few era-card lamps detected: {card_lights}")
    if machine_lights < 220:
        raise RuntimeError(f"Too few full-machine ENIAC lamps: {machine_lights}")

    save_previews(eniac, people, core)
    original_lamp_frame = v1.lamp_frame

    def dispatch_lamp_frame(
        base: np.ndarray,
        groups: list[np.ndarray],
        seconds: float,
        *,
        period: float,
        gain: float,
    ) -> np.ndarray:
        if base is eniac:
            return machine_frame(
                base,
                people,
                core,
                group_map,
                states,
                offsets,
                seconds,
            )
        return original_lamp_frame(
            base, groups, seconds, period=period, gain=gain
        )

    v1.lamp_frame = dispatch_lamp_frame
    v1.OUTPUT = OUTPUT

    with tempfile.TemporaryDirectory(prefix="laidies-eniac-proof-v7-") as directory:
        picture = Path(directory) / "picture.mp4"
        v1.encode_picture(
            picture,
            hedy,
            card,
            eniac,
            hedy_groups,
            card_groups,
            [],
        )
        v1.mux_narration(picture)

    print(f"card lamps: {card_lights}")
    print(f"small full-machine ENIAC lamps: {machine_lights}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
