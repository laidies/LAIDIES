#!/usr/bin/env python3
"""Build a narration-synced Hedy -> Philadelphia 1945 -> ENIAC motion proof.

This is a non-destructive review artifact, not an episode master. It uses only
the approved stills named in the Episode 04 authoritative motion brief plus the
existing transparent time-jump particle asset. People remain source-pixel
static. Motion is confined to Hedy's drawn signal and isolated ENIAC lamps.
"""

from __future__ import annotations

import math
import subprocess
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[3]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
FX = ROOT / "assets/video/fx"
QA = ROOT / "operations/video-qa/eniac-motion-proof-20260723"

HEDY = PIXEL / "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png"
ERA_CARD = PIXEL / "ep04-tj-eniac-comic-v1-exact-caption-1920.png"
ENIAC = PIXEL / "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png"
SWIRL = FX / "timejump-swirl-v1.mov"
NARRATION = ROOT / "content/music/episode-04-narration.mp3"
OUTPUT = PIXEL / "ep04-timejump-to-eniac-motion-proof-v1.mp4"

FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
PROOF_START = 430.70  # 07:10.70 — clean lead-in to Hedy's final sentence
DURATION = 30.0
TIMEJUMP_AT = 437.30 - PROOF_START
TRANSITION_DURATION = 2.0
TRANSITION_END = TIMEJUMP_AT + TRANSITION_DURATION
ENIAC_AT = 442.30 - PROOF_START
ENIAC_DISSOLVE = 0.80


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def load_rgb(path: Path) -> np.ndarray:
    with Image.open(path) as image:
        if image.size != (W, H):
            raise ValueError(f"{path.name}: expected {W}x{H}, got {image.size}")
        return np.asarray(image.convert("RGB"), dtype=np.float32)


def warm_candidates(image: np.ndarray, region: np.ndarray) -> np.ndarray:
    red, green, blue = image[..., 0], image[..., 1], image[..., 2]
    return (
        region
        & (red >= 142)
        & (green >= 72)
        & (blue <= 135)
        & ((red - blue) >= 58)
        & ((red - green) >= 24)
    )


def component_glow_groups(
    candidate: np.ndarray,
    group_count: int,
    *,
    min_area: int = 3,
    max_area: int = 210,
    guard: np.ndarray | None = None,
) -> tuple[list[np.ndarray], int]:
    count, labels, stats, centroids = cv2.connectedComponentsWithStats(
        candidate.astype(np.uint8), connectivity=8
    )
    cores = [np.zeros((H, W), dtype=np.float32) for _ in range(group_count)]
    accepted = 0

    for label in range(1, count):
        x, y, width, height, area = stats[label]
        if not min_area <= area <= max_area:
            continue
        if width > 34 or height > 34:
            continue
        cx, cy = centroids[label]
        group = int((cx / W) * group_count) % group_count
        radius = max(2, min(7, int(round(math.sqrt(area / math.pi) * 1.15))))
        cv2.circle(cores[group], (int(round(cx)), int(round(cy))), radius, 255.0, -1)
        accepted += 1

    groups: list[np.ndarray] = []
    for core in cores:
        tight = cv2.GaussianBlur(core, (0, 0), 2.2)
        halo = cv2.GaussianBlur(core, (0, 0), 15.0) * 0.72
        wide = cv2.GaussianBlur(core, (0, 0), 32.0) * 0.22
        glow = np.clip(tight + halo + wide, 0.0, 255.0)
        if guard is not None:
            glow *= 1.0 - guard
        groups.append(glow)
    return groups, accepted


def hedy_signal_groups(image: np.ndarray, group_count: int = 8) -> list[np.ndarray]:
    red, green, blue = image[..., 0], image[..., 1], image[..., 2]
    yy, xx = np.indices((H, W))
    candidate = (
        (yy >= 760)
        & (xx >= 230)
        & (xx <= 1130)
        & (blue >= 92)
        & (green >= 108)
        & (red <= 125)
        & ((blue - red) >= 28)
    )

    groups: list[np.ndarray] = []
    span = 930 / group_count
    for group in range(group_count):
        left = 210 + group * span
        right = left + span * 1.45
        band = candidate & (xx >= left) & (xx <= right)
        core = band.astype(np.float32) * 255.0
        tight = cv2.GaussianBlur(core, (0, 0), 2.0)
        halo = cv2.GaussianBlur(core, (0, 0), 18.0) * 0.78
        wide = cv2.GaussianBlur(core, (0, 0), 38.0) * 0.20
        groups.append(np.clip(tight + halo + wide, 0.0, 255.0))
    return groups


def eniac_person_guard() -> np.ndarray:
    """Conservative masks around all six women, expanded beyond their outlines."""
    guard = np.zeros((H, W), dtype=np.uint8)
    polygons = [
        # Foreground woman, raised arm, head, torso and lower body.
        [(65, 0), (245, 0), (285, 105), (360, 95), (620, 105), (710, 240),
         (700, 465), (790, 610), (915, 1080), (0, 1080), (0, 385), (95, 220)],
        # Crouching woman in beige.
        [(615, 420), (770, 325), (990, 360), (1155, 515), (1275, 1080),
         (790, 1080), (580, 685)],
        # Standing woman in blue, including both raised arms.
        [(845, 0), (1030, 0), (1085, 105), (1230, 55), (1405, 225),
         (1370, 895), (1010, 900), (900, 315)],
        # Standing woman in purple.
        [(1205, 95), (1395, 105), (1525, 265), (1560, 870), (1285, 870),
         (1200, 320)],
        # Crouching woman in blue.
        [(1415, 410), (1605, 335), (1785, 455), (1850, 915), (1425, 915)],
        # Standing woman in cream, including the extended arm.
        [(1570, 170), (1815, 120), (1920, 245), (1920, 865), (1665, 865),
         (1560, 350)],
    ]
    for points in polygons:
        cv2.fillPoly(guard, [np.asarray(points, dtype=np.int32)], 255)
    guard = cv2.dilate(guard, np.ones((35, 35), dtype=np.uint8), iterations=1)
    guard = cv2.GaussianBlur(guard, (0, 0), 8.0)
    return guard.astype(np.float32) / 255.0


def combine(groups: list[np.ndarray], amounts: list[float]) -> np.ndarray:
    output = np.zeros((H, W), dtype=np.float32)
    for group, amount in zip(groups, amounts):
        if amount > 0.001:
            output += group * amount
    return np.clip(output, 0.0, 255.0)


def screen_glow(
    image: np.ndarray,
    glow: np.ndarray,
    color: tuple[float, float, float],
) -> np.ndarray:
    overlay = glow[..., None] * (np.asarray(color, dtype=np.float32) / 255.0)
    normalized_image = image / 255.0
    normalized_overlay = np.clip(overlay, 0.0, 255.0) / 255.0
    return np.clip(
        (1.0 - (1.0 - normalized_image) * (1.0 - normalized_overlay)) * 255.0,
        0.0,
        255.0,
    )


def hedy_frame(
    base: np.ndarray,
    groups: list[np.ndarray],
    seconds: float,
) -> np.ndarray:
    travel = min(len(groups) - 1, max(0.0, seconds / 5.75 * (len(groups) - 1)))
    amounts = []
    for group in range(len(groups)):
        distance = group - travel
        moving = math.exp(-0.5 * (distance / 0.72) ** 2)
        amounts.append(0.08 + 0.92 * moving)
    return screen_glow(base, combine(groups, amounts), (36.0, 208.0, 255.0))


def lamp_frame(
    base: np.ndarray,
    groups: list[np.ndarray],
    seconds: float,
    *,
    period: float,
    gain: float,
) -> np.ndarray:
    amounts = []
    for group in range(len(groups)):
        phase = 2.0 * math.pi * group / len(groups)
        wave = 0.5 + 0.5 * math.sin(2.0 * math.pi * seconds / period - phase)
        amounts.append(0.10 + gain * (wave ** 2.6))
    return screen_glow(base, combine(groups, amounts), (255.0, 150.0, 48.0))


def blend(first: np.ndarray, second: np.ndarray, amount: float) -> np.ndarray:
    return first * (1.0 - amount) + second * amount


def swirl_decoder() -> subprocess.Popen:
    return subprocess.Popen(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(SWIRL),
            "-f",
            "rawvideo",
            "-pix_fmt",
            "rgba",
            "-",
        ],
        stdout=subprocess.PIPE,
    )


def read_swirl_frame(process: subprocess.Popen) -> np.ndarray:
    assert process.stdout is not None
    frame_bytes = process.stdout.read(W * H * 4)
    if len(frame_bytes) != W * H * 4:
        raise RuntimeError("Transparent swirl ended before 60 frames")
    return np.frombuffer(frame_bytes, dtype=np.uint8).reshape(H, W, 4)


def composite_swirl(base: np.ndarray, rgba: np.ndarray, strength: float) -> np.ndarray:
    alpha = rgba[..., 3:4].astype(np.float32) / 255.0
    alpha *= strength
    foreground = rgba[..., :3].astype(np.float32)
    return base * (1.0 - alpha) + foreground * alpha


def save_mask_preview(image: np.ndarray, groups: list[np.ndarray]) -> None:
    QA.mkdir(parents=True, exist_ok=True)
    heat = np.max(np.stack(groups), axis=0)
    active = heat >= 5.0
    preview = image.astype(np.uint8).copy()
    preview[active] = (
        preview[active].astype(np.float32) * 0.38
        + np.asarray([255.0, 26.0, 18.0], dtype=np.float32) * 0.62
    ).astype(np.uint8)
    Image.fromarray(preview).save(QA / "ep04-eniac-proof-lamp-mask-v1.jpg", quality=94)


def encode_picture(
    path: Path,
    hedy: np.ndarray,
    card: np.ndarray,
    eniac: np.ndarray,
    hedy_groups: list[np.ndarray],
    card_groups: list[np.ndarray],
    eniac_groups: list[np.ndarray],
) -> None:
    command = [
        str(FFMPEG),
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s",
        f"{W}x{H}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "16",
        "-profile:v",
        "high",
        "-level",
        "4.1",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(path),
    ]
    encoder = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert encoder.stdin is not None
    swirl = swirl_decoder()
    swirl_started = False

    try:
        for frame_number in range(round(DURATION * FPS)):
            seconds = frame_number / FPS

            if seconds < TIMEJUMP_AT:
                frame = hedy_frame(hedy, hedy_groups, seconds)
            elif seconds < TRANSITION_END:
                swirl_started = True
                progress = (seconds - TIMEJUMP_AT) / TRANSITION_DURATION
                source = hedy_frame(hedy, hedy_groups, TIMEJUMP_AT)
                destination = lamp_frame(
                    card, card_groups, max(0.0, seconds - TRANSITION_END), period=3.8, gain=0.72
                )
                destination_mix = smoothstep((progress - 0.48) / 0.27)
                frame = blend(source, destination, destination_mix)
                rgba = read_swirl_frame(swirl)
                frame = composite_swirl(frame, rgba, 0.93)
                flash = math.exp(-0.5 * ((progress - 0.80) / 0.105) ** 2) * 0.68
                if flash > 0.001:
                    frame = blend(frame, np.full_like(frame, (255.0, 246.0, 218.0)), flash)
            else:
                card_seconds = seconds - TRANSITION_END
                card_frame = lamp_frame(
                    card, card_groups, card_seconds, period=3.8, gain=0.72
                )
                bloom_fade = max(0.0, 1.0 - card_seconds / 0.62)
                if bloom_fade:
                    card_frame = blend(
                        card_frame,
                        np.full_like(card_frame, (255.0, 247.0, 222.0)),
                        smoothstep(bloom_fade) * 0.70,
                    )

                eniac_seconds = max(0.0, seconds - ENIAC_AT)
                machine_frame = lamp_frame(
                    eniac, eniac_groups, eniac_seconds, period=5.2, gain=0.92
                )
                dissolve_start = ENIAC_AT - ENIAC_DISSOLVE / 2.0
                dissolve = smoothstep((seconds - dissolve_start) / ENIAC_DISSOLVE)
                frame = blend(card_frame, machine_frame, dissolve)

            encoder.stdin.write(np.clip(frame, 0.0, 255.0).astype(np.uint8).tobytes())
    finally:
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError("Picture encode failed")
        if swirl.stdout is not None:
            swirl.stdout.close()
        if swirl_started:
            swirl.wait()
        else:
            swirl.terminate()


def mux_narration(picture: Path) -> None:
    subprocess.run(
        [
            str(FFMPEG),
            "-n",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(picture),
            "-ss",
            f"{PROOF_START:.3f}",
            "-t",
            f"{DURATION:.3f}",
            "-i",
            str(NARRATION),
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-af",
            "afade=t=in:st=0:d=0.10,afade=t=out:st=29.70:d=0.30",
            "-t",
            f"{DURATION:.3f}",
            "-movflags",
            "+faststart",
            str(OUTPUT),
        ],
        check=True,
    )


def main() -> None:
    if OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite proof: {OUTPUT}")
    for path in (HEDY, ERA_CARD, ENIAC, SWIRL, NARRATION, FFMPEG):
        if not path.is_file():
            raise FileNotFoundError(path)

    hedy = load_rgb(HEDY)
    card = load_rgb(ERA_CARD)
    eniac = load_rgb(ENIAC)

    hedy_groups = hedy_signal_groups(hedy)

    full_region = np.ones((H, W), dtype=bool)
    card_candidate = warm_candidates(card, full_region)
    card_groups, card_lights = component_glow_groups(
        card_candidate, 7, min_area=3, max_area=240
    )

    machine_region = np.zeros((H, W), dtype=bool)
    machine_region[:680, :] = True
    guard = eniac_person_guard()
    eniac_candidate = warm_candidates(eniac, machine_region) & (guard < 0.02)
    eniac_groups, eniac_lights = component_glow_groups(
        eniac_candidate, 7, min_area=3, max_area=155, guard=guard
    )

    if card_lights < 90:
        raise RuntimeError(f"Too few era-card lamps detected: {card_lights}")
    if eniac_lights < 28:
        raise RuntimeError(f"Too few safe ENIAC lamps detected: {eniac_lights}")

    save_mask_preview(eniac, eniac_groups)

    with tempfile.TemporaryDirectory(prefix="laidies-eniac-proof-") as directory:
        picture = Path(directory) / "picture.mp4"
        encode_picture(
            picture,
            hedy,
            card,
            eniac,
            hedy_groups,
            card_groups,
            eniac_groups,
        )
        mux_narration(picture)

    print(f"card lamps: {card_lights}")
    print(f"safe ENIAC lamps: {eniac_lights}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
