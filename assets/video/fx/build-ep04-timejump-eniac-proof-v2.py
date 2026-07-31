#!/usr/bin/env python3
"""Build the v2 Hedy -> ENIAC proof with clearly visible machine motion.

The v1 time-jump is deliberately retained.  The ENIAC section uses larger,
sequenced lamp-bank activation rather than isolated pixel-scale flicker.  A
conservative guard keeps the six women source-pixel static.
"""

from __future__ import annotations

import importlib.util
import math
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

OUTPUT = v1.PIXEL / "ep04-timejump-to-eniac-motion-proof-v2.mp4"
MASK_PREVIEW = v1.QA / "ep04-eniac-proof-lamp-mask-v2.jpg"


def visible_machine_groups(
    image: np.ndarray,
    guard: np.ndarray,
    group_count: int = 6,
) -> tuple[list[np.ndarray], np.ndarray, int]:
    """Create larger activation banks around safe, existing amber lamps."""
    region = np.zeros((v1.H, v1.W), dtype=bool)
    region[:760, :] = True
    candidate = v1.warm_candidates(image, region) & (guard < 0.015)

    count, labels, stats, centroids = cv2.connectedComponentsWithStats(
        candidate.astype(np.uint8), connectivity=8
    )
    cores = [np.zeros((v1.H, v1.W), dtype=np.float32) for _ in range(group_count)]
    tight_union = np.zeros((v1.H, v1.W), dtype=np.float32)
    accepted = 0

    for label in range(1, count):
        _x, _y, width, height, area = stats[label]
        if not 3 <= area <= 260:
            continue
        if width > 38 or height > 38:
            continue
        cx, cy = centroids[label]
        group = min(group_count - 1, int((cx / v1.W) * group_count))
        radius = max(6, min(11, int(round(math.sqrt(area / math.pi) * 1.8))))
        centre = (int(round(cx)), int(round(cy)))
        cv2.circle(cores[group], centre, radius, 255.0, -1)
        cv2.circle(tight_union, centre, max(4, radius - 2), 255.0, -1)
        accepted += 1

    safe = np.clip(1.0 - guard, 0.0, 1.0)
    groups: list[np.ndarray] = []
    for core in cores:
        hot = cv2.GaussianBlur(core, (0, 0), 3.0)
        local = cv2.GaussianBlur(core, (0, 0), 20.0) * 0.88
        halo = cv2.GaussianBlur(core, (0, 0), 46.0) * 0.48
        bank = cv2.GaussianBlur(core, (0, 0), 82.0) * 0.20
        groups.append(np.clip(hot + local + halo + bank, 0.0, 255.0) * safe)

    tight_union = cv2.GaussianBlur(tight_union, (0, 0), 1.6)
    tight_union = np.clip(tight_union / 255.0, 0.0, 1.0) * safe
    return groups, tight_union, accepted


def machine_frame(
    base: np.ndarray,
    groups: list[np.ndarray],
    tight_union: np.ndarray,
    seconds: float,
) -> np.ndarray:
    """Run a high-contrast activation wave across the ENIAC light banks."""
    period = 4.4
    amounts: list[float] = []
    for group in range(len(groups)):
        phase = 2.0 * math.pi * group / len(groups)
        wave = 0.5 + 0.5 * math.sin(2.0 * math.pi * seconds / period - phase)
        pulse = wave ** 3.2
        amounts.append(0.025 + 1.32 * pulse)

    # Existing safe lamp cores fall dark between pulses, so the activation
    # remains legible at normal playback size rather than reading as noise.
    peak = max(amounts)
    dim_strength = 0.62 * (1.0 - min(1.0, peak / 1.35) * 0.22)
    dimmed = base * (1.0 - tight_union[..., None] * dim_strength)
    glow = v1.combine(groups, amounts)
    return v1.screen_glow(dimmed, glow, (255.0, 176.0, 55.0))


def save_mask_preview(image: np.ndarray, groups: list[np.ndarray]) -> None:
    v1.QA.mkdir(parents=True, exist_ok=True)
    heat = np.max(np.stack(groups), axis=0)
    active = heat >= 5.0
    preview = image.astype(np.uint8).copy()
    preview[active] = (
        preview[active].astype(np.float32) * 0.35
        + np.asarray([255.0, 28.0, 18.0], dtype=np.float32) * 0.65
    ).astype(np.uint8)
    Image.fromarray(preview).save(MASK_PREVIEW, quality=94)


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

    guard = v1.eniac_person_guard()
    machine_groups, tight_union, machine_lights = visible_machine_groups(eniac, guard)
    if card_lights < 90:
        raise RuntimeError(f"Too few era-card lamps detected: {card_lights}")
    if machine_lights < 28:
        raise RuntimeError(f"Too few safe ENIAC lamps detected: {machine_lights}")

    save_mask_preview(eniac, machine_groups)

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
            return machine_frame(base, groups, tight_union, seconds)
        return original_lamp_frame(
            base, groups, seconds, period=period, gain=gain
        )

    v1.lamp_frame = dispatch_lamp_frame
    v1.OUTPUT = OUTPUT

    with tempfile.TemporaryDirectory(prefix="laidies-eniac-proof-v2-") as directory:
        picture = Path(directory) / "picture.mp4"
        v1.encode_picture(
            picture,
            hedy,
            card,
            eniac,
            hedy_groups,
            card_groups,
            machine_groups,
        )
        v1.mux_narration(picture)

    print(f"card lamps: {card_lights}")
    print(f"safe ENIAC lamps: {machine_lights}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
