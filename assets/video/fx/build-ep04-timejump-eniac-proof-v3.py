#!/usr/bin/env python3
"""Build a distributed, individual-lamp ENIAC motion proof.

V3 keeps the accepted v1 time-jump, removes v2's broad glow blocks, and sends a
travelling activation pulse through hundreds of small, existing indicator
lights across the machine.  Carefully fitted masks protect the six women.
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

OUTPUT = v1.PIXEL / "ep04-timejump-to-eniac-motion-proof-v3.mp4"
MASK_PREVIEW = v1.QA / "ep04-eniac-proof-lamp-mask-v3.jpg"


def fitted_person_guard() -> np.ndarray:
    """Tightly protect the figures without masking the machinery between them."""
    guard = np.zeros((v1.H, v1.W), dtype=np.uint8)
    polygons = [
        # Foreground woman's raised hand and arm.
        [(77, 70), (125, 54), (168, 88), (247, 254), (211, 289),
         (171, 232), (132, 161), (101, 142)],
        # Foreground woman's head, torso and lower body. The left edge follows
        # her silhouette so the large lower-left machine bank remains usable.
        [(357, 92), (523, 78), (627, 132), (690, 252), (649, 374),
         (708, 430), (783, 565), (905, 930), (866, 1080), (225, 1080),
         (211, 900), (238, 680), (254, 503), (247, 392), (294, 284),
         (321, 214)],
        # Foreground woman's lower hand and arm crossing that machine bank.
        [(137, 747), (190, 724), (299, 747), (553, 673), (623, 712),
         (567, 822), (304, 854), (157, 816)],
        # Crouching woman in beige: head, body and the two extended arms.
        [(742, 377), (805, 322), (941, 329), (1022, 403), (1002, 512),
         (945, 552), (824, 535), (742, 470)],
        [(754, 516), (946, 498), (1072, 582), (1226, 900),
         (1205, 1080), (744, 1080), (603, 752), (643, 598)],
        [(589, 535), (641, 516), (810, 554), (905, 618), (874, 671),
         (769, 634), (628, 592)],
        [(630, 655), (688, 639), (824, 684), (880, 733), (838, 782),
         (716, 743), (646, 710)],
        # Standing woman in blue: raised arm.
        [(928, 91), (966, 70), (1009, 91), (1089, 260), (1134, 329),
         (1081, 373), (1037, 279), (972, 184)],
        # Standing woman in blue: head, bent arm, torso and skirt.
        [(1083, 104), (1125, 78), (1227, 86), (1307, 148),
         (1317, 240), (1275, 303), (1176, 329), (1092, 263),
         (1071, 170)],
        [(994, 310), (1038, 295), (1125, 331), (1198, 379),
         (1171, 432), (1085, 404), (1009, 365)],
        [(1061, 257), (1184, 246), (1278, 286), (1371, 347),
         (1402, 850), (1354, 905), (1072, 905), (1038, 402)],
        # Standing woman in purple: raised arm, head, front arm, body.
        [(1259, 188), (1299, 169), (1354, 218), (1425, 295),
         (1391, 341), (1329, 286), (1274, 235)],
        [(1380, 170), (1447, 151), (1514, 190), (1539, 259),
         (1501, 331), (1416, 351), (1371, 300)],
        [(1289, 331), (1338, 315), (1447, 353), (1504, 389),
         (1474, 443), (1405, 413), (1301, 383)],
        [(1380, 296), (1511, 292), (1574, 380), (1600, 801),
         (1554, 857), (1330, 857), (1312, 414)],
        # Crouching woman in blue: head, two arms, torso and skirt.
        [(1482, 401), (1574, 372), (1660, 413), (1697, 487),
         (1653, 562), (1523, 573), (1461, 517)],
        [(1401, 529), (1445, 512), (1543, 553), (1603, 603),
         (1571, 649), (1492, 615), (1418, 575)],
        [(1391, 597), (1436, 579), (1530, 622), (1606, 681),
         (1570, 728), (1485, 686), (1404, 644)],
        [(1528, 526), (1703, 499), (1797, 586), (1846, 850),
         (1784, 920), (1450, 908), (1409, 701)],
        # Standing woman in cream: extended arm.
        [(1571, 291), (1614, 266), (1705, 306), (1768, 371),
         (1723, 425), (1650, 356), (1593, 348)],
        # Standing woman in cream: head, body and lowered arm.
        [(1736, 196), (1817, 176), (1882, 216), (1906, 299),
         (1862, 368), (1768, 371), (1717, 308)],
        [(1690, 327), (1841, 334), (1920, 424), (1920, 857),
         (1672, 878), (1634, 493)],
        [(1762, 356), (1842, 344), (1918, 405), (1920, 520),
         (1850, 568), (1768, 494)],
    ]
    for points in polygons:
        cv2.fillPoly(guard, [np.asarray(points, dtype=np.int32)], 255)
    guard = cv2.dilate(guard, np.ones((9, 9), dtype=np.uint8), iterations=1)
    guard = cv2.GaussianBlur(guard, (0, 0), 2.4)
    return guard.astype(np.float32) / 255.0


def distributed_lamp_groups(
    image: np.ndarray,
    guard: np.ndarray,
    group_count: int = 16,
) -> tuple[list[np.ndarray], np.ndarray, int]:
    """Detect individual amber indicators across the full machine."""
    # Follow the receding silhouette of the ENIAC banks. This excludes the
    # ceiling/floor while retaining the full left-to-right machine surface.
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
    region = region.astype(bool)
    red, green, blue = image[..., 0], image[..., 1], image[..., 2]
    # Distant indicators are intentionally dimmer in the illustration, so the
    # threshold is lower than the era-card detector.
    candidate = (
        region
        & (red >= 100)
        & (green >= 45)
        & (blue <= 100)
        & ((red - blue) >= 38)
        & ((red - green) >= 16)
    )
    count, labels, stats, centroids = cv2.connectedComponentsWithStats(
        candidate.astype(np.uint8), connectivity=8
    )

    luminance = image.mean(axis=2)
    cores = [np.zeros((v1.H, v1.W), dtype=np.float32) for _ in range(group_count)]
    tight_union = np.zeros((v1.H, v1.W), dtype=np.float32)
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
        if guard[int(round(cy)), int(round(cx))] > 0.08:
            continue

        x0, y0 = max(0, x - 10), max(0, y - 10)
        x1 = min(v1.W, x + width + 10)
        y1 = min(v1.H, y + height + 10)
        surrounding = luminance[y0:y1, x0:x1]
        if np.median(surrounding) >= 85.0:
            continue
        if float(np.mean(surrounding < 80.0)) <= 0.45:
            continue

        component = (labels == label).astype(np.uint8) * 255
        # Receding lamps are smaller in the source. A slightly larger kernel
        # keeps those right-side indicators legible without joining them.
        kernel_size = 5 if cx < 800 else (7 if cx < 1200 else 9)
        component = cv2.dilate(
            component,
            cv2.getStructuringElement(
                cv2.MORPH_ELLIPSE, (kernel_size, kernel_size)
            ),
            iterations=1,
        ).astype(np.float32)

        # A stable spatial hash scatters each timing group across the machine.
        # Nearby lamps therefore do not fade as one rectangular bank.
        group = (
            int(round(cx)) * 37
            + int(round(cy)) * 61
            + int(cx // 40) * 17
        ) % group_count
        cores[group] = np.maximum(cores[group], component)
        tight_union = np.maximum(tight_union, component)
        accepted += 1

    safe = np.clip(1.0 - guard, 0.0, 1.0)
    _yy, xx = np.indices((v1.H, v1.W))
    perspective_weight = 0.78 + 1.20 * (xx.astype(np.float32) / v1.W)
    groups: list[np.ndarray] = []
    for core in cores:
        hot = cv2.GaussianBlur(core, (0, 0), 1.3)
        local = cv2.GaussianBlur(core, (0, 0), 5.5) * 0.62
        halo = cv2.GaussianBlur(core, (0, 0), 12.0) * 0.18
        groups.append(
            np.clip(
                (hot + local + halo) * perspective_weight,
                0.0,
                255.0,
            ) * safe
        )

    tight_union = cv2.GaussianBlur(tight_union, (0, 0), 1.0)
    tight_union = np.clip(tight_union / 255.0, 0.0, 1.0) * safe
    return groups, tight_union, accepted


def machine_frame(
    base: np.ndarray,
    groups: list[np.ndarray],
    tight_union: np.ndarray,
    seconds: float,
) -> np.ndarray:
    """Blink the indicators in quick, staggered, machine-like rhythms."""
    loop_duration = 5.0
    amounts: list[float] = []
    for group in range(len(groups)):
        # Integer cycles make the pattern loop cleanly every five seconds.
        cycles = 3 + (group % 3)
        offset = ((group * 7) % len(groups)) / len(groups)
        phase = (seconds * cycles / loop_duration + offset) % 1.0
        duty = 0.30 + 0.055 * (group % 4)
        edge = 0.075  # quick change, but not the frantic two-frame v5 snap
        rise = v1.smoothstep(phase / edge)
        fall = 1.0 - v1.smoothstep((phase - duty) / edge)
        blink = rise * fall
        amounts.append(0.008 + 1.30 * blink)

    # Drop the detected indicator cores towards dark between blinks. This gives
    # hundreds of small lights real on/off contrast without creating glow blocks.
    dimmed = base * (1.0 - tight_union[..., None] * 0.72)
    glow = v1.combine(groups, amounts)
    return v1.screen_glow(dimmed, glow, (255.0, 171.0, 46.0))


def save_mask_preview(image: np.ndarray, groups: list[np.ndarray]) -> None:
    v1.QA.mkdir(parents=True, exist_ok=True)
    heat = np.max(np.stack(groups), axis=0)
    active = heat >= 10.0
    preview = image.astype(np.uint8).copy()
    preview[active] = (
        preview[active].astype(np.float32) * 0.34
        + np.asarray([255.0, 30.0, 18.0], dtype=np.float32) * 0.66
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

    guard = fitted_person_guard()
    machine_groups, tight_union, machine_lights = distributed_lamp_groups(
        eniac, guard
    )
    if card_lights < 90:
        raise RuntimeError(f"Too few era-card lamps detected: {card_lights}")
    if machine_lights < 180:
        raise RuntimeError(f"Too few distributed ENIAC lamps: {machine_lights}")

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

    with tempfile.TemporaryDirectory(prefix="laidies-eniac-proof-v3-") as directory:
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
    print(f"distributed safe ENIAC lamps: {machine_lights}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
