#!/usr/bin/env python3
"""Build the EP04 comic-animation delivery requested on 2026-07-22.

The approved PNG keyframes and the reusable alpha swirl are read-only. Every
deliverable is a silent 1920x1080, 30 fps H.264 MP4 written beside the EP04
source frames. Directional actions play once and then hold their own last frame.
"""

from __future__ import annotations

import argparse
import gc
import hashlib
import json
import math
import re
import subprocess
import tempfile
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[3]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
FX = ROOT / "assets/video/fx"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
WARM_WHITE = np.array([255.0, 249.0, 232.0], dtype=np.float32)


S = {
    "transform": [
        "ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png",
        "ep04-open-15p1-transformation-poof-build-no-wand-v1-1920.png",
        "ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png",
        "ep04-open-15p3-transformation-poof-clearing-no-wand-v1-1920.png",
        "ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png",
    ],
    "ada_card": "ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png",
    "ada_study": "ep04-scene-03-ada-a-start-comic-v1-locked-1920.png",
    "grace_before": "ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png",
    "grace_end": "ep04-scene-05-grace-c-end-comic-v1-locked-1920.png",
    "naming_start": "ep04-scene-06-naming-comic-v1-fresh-exact-board-1920.png",
    "naming_end": "ep04-scene-06-naming-b-mid-comic-v1-locked-1920.png",
    "winter_start": "ep04-scene-07-ai-winter-a-start-comic-v1-locked-1920.png",
    "winter_mid": "ep04-scene-07-ai-winter-comic-v1-fresh-1920.png",
    "winter_end": "ep04-scene-07-ai-winter-c-end-comic-v1-locked-1920.png",
    "fei_start": "ep04-scene-09-fei-fei-a-start-comic-v1-locked-1920.png",
    "fei_end": "ep04-scene-09-fei-fei-b-mid-comic-v1-locked-1920.png",
    "finale_start": "ep04-splash-lights-up-comic-v1-start-dim-1920.png",
    "finale_end": "ep04-splash-lights-up-comic-v1-end-blazing-1920.png",
    "hall_portal": "ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png",
    "hedy_out": "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png",
    "eniac_out": "ep04-scene-04b-eniac-c-end-comic-v1-locked-1920.png",
    "karen_out": "ep04-scene-08-karen-c-end-comic-v1-locked-1920.png",
    "desk_out": "ep04-open-04-desk-comic-v1-face-lock-1920.png",
    "card_london": "ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png",
    "card_hollywood": "ep04-tj-hedy-comic-v2-timnit-style-lock-exact-caption-1920.png",
    "card_philadelphia": "ep04-tj-eniac-comic-v1-exact-caption-1920.png",
    "card_grace": "ep04-tj-grace-comic-v2-philadelphia-1952-1920.png",
    "card_dartmouth": "ep04-tj-dartmouth-comic-v2-timnit-style-lock-exact-caption-1920.png",
    "card_cambridge": "ep04-tj-karen-comic-v2-timnit-style-lock-exact-caption-1920.png",
    "card_feifei": "ep04-tj-feifei-comic-v1-exact-caption-1920.png",
    "card_modern": "ep04-tj-modern-comic-v1-2018-2021-1920.png",
}


O = {
    "transform": "ep04-open-15p-transformation-comic-event-v1.mp4",
    "ada": "ep04-scene-03-ada-punched-card-toward-camera-comic-event-v1.mp4",
    "grace": "ep04-scene-05-grace-moth-landing-comic-event-v1.mp4",
    "fei": "ep04-scene-09-fei-fei-wall-fills-comic-event-v1.mp4",
    "naming": "ep04-scene-06-naming-chalk-writes-comic-event-v1.mp4",
    "winter": "ep04-scene-07-ai-winter-screens-darken-comic-event-v1.mp4",
    "finale": "ep04-splash-lights-up-portraits-ignite-comic-event-v1.mp4",
    "tj_london": "ep04-timejump-01-london-1843-comic-event-v1.mp4",
    "tj_hollywood": "ep04-timejump-02-hollywood-comic-event-v1.mp4",
    "tj_philadelphia": "ep04-timejump-03-philadelphia-comic-event-v1.mp4",
    "tj_grace": "ep04-timejump-04-philadelphia-1952-comic-event-v1.mp4",
    "tj_dartmouth": "ep04-timejump-05-dartmouth-1956-comic-event-v1.mp4",
    "tj_cambridge": "ep04-timejump-06-cambridge-1972-comic-event-v1.mp4",
    "tj_feifei": "ep04-timejump-07-fei-fei-comic-event-v1.mp4",
    "tj_modern": "ep04-timejump-08-2018-2021-comic-event-v1.mp4",
}

CONTACT_SHEET = PIXEL / "ep04-animation-delivery-v1-contact-sheet.jpg"
MANIFEST = PIXEL / "ep04-animation-delivery-v1-manifest.json"


@dataclass
class ClipRecord:
    key: str
    filename: str
    category: str
    duration_seconds: float
    frames: int
    sources: list[str]
    sample_times: list[float]
    sha256: str = ""
    size_bytes: int = 0
    decode_qc: str = "pending"


RECORDS = [
    ClipRecord("transform", O["transform"], "event", 17.0, 510, S["transform"], [0.5, 4.0, 16.5]),
    ClipRecord("ada", O["ada"], "event", 49.7, 1491, [S["ada_card"]], [0.5, 6.0, 49.2]),
    ClipRecord("grace", O["grace"], "event", 12.6, 378, [S["grace_before"], S["grace_end"]], [0.5, 3.5, 12.1]),
    ClipRecord("fei", O["fei"], "event", 23.0, 690, [S["fei_start"], S["fei_end"]], [0.5, 5.0, 22.5]),
    ClipRecord("naming", O["naming"], "event", 5.0, 150, [S["naming_start"], S["naming_end"]], [0.1, 2.5, 4.8]),
    ClipRecord("winter", O["winter"], "event", 15.0, 450, [S["winter_start"], S["winter_mid"], S["winter_end"]], [1.0, 7.0, 14.0]),
    ClipRecord("finale", O["finale"], "event", 79.0, 2370, [S["finale_start"], S["finale_end"]], [1.0, 9.0, 78.0]),
    ClipRecord("tj_london", O["tj_london"], "transition", 10.3, 309, [S["hall_portal"], S["card_london"], S["ada_study"], "../video/fx/timejump-swirl-v1.mov"], [1.0, 4.7, 10.2]),
    ClipRecord("tj_hollywood", O["tj_hollywood"], "transition", 1.5, 45, [O["ada"], S["card_hollywood"]], [0.1, 0.75, 1.4]),
    ClipRecord("tj_philadelphia", O["tj_philadelphia"], "transition", 1.5, 45, [S["hedy_out"], S["card_philadelphia"]], [0.1, 0.75, 1.4]),
    ClipRecord("tj_grace", O["tj_grace"], "transition", 1.5, 45, [S["eniac_out"], S["card_grace"]], [0.1, 0.75, 1.4]),
    ClipRecord("tj_dartmouth", O["tj_dartmouth"], "transition", 1.5, 45, [O["grace"], S["card_dartmouth"]], [0.1, 0.75, 1.4]),
    ClipRecord("tj_cambridge", O["tj_cambridge"], "transition", 1.5, 45, [O["winter"], S["card_cambridge"]], [0.1, 0.75, 1.4]),
    ClipRecord("tj_feifei", O["tj_feifei"], "transition", 1.5, 45, [S["karen_out"], S["card_feifei"]], [0.1, 0.75, 1.4]),
    ClipRecord("tj_modern", O["tj_modern"], "transition", 1.5, 45, [S["desk_out"], S["card_modern"]], [0.1, 0.75, 1.4]),
]


def p(name: str) -> Path:
    return PIXEL / name


def load_rgb(name: str) -> np.ndarray:
    path = p(name)
    with Image.open(path) as im:
        if im.size != (W, H):
            raise ValueError(f"{path.name}: expected {W}x{H}, got {im.size}")
        return np.asarray(im.convert("RGB"), dtype=np.uint8)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def smoothstep(value: float) -> float:
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


def blend(a: np.ndarray, b: np.ndarray, amount: float) -> np.ndarray:
    if amount <= 0:
        return a
    if amount >= 1:
        return b
    return np.clip(a.astype(np.float32) * (1.0 - amount) + b.astype(np.float32) * amount, 0, 255).astype(np.uint8)


def polygon_mask(points: list[tuple[int, int]], blur: float = 0.0) -> np.ndarray:
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    if blur:
        mask = mask.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(mask, dtype=np.float32) / 255.0


def rectangle_mask(box: tuple[int, int, int, int], blur: float = 0.0) -> np.ndarray:
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).rectangle(box, fill=255)
    if blur:
        mask = mask.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(mask, dtype=np.float32) / 255.0


def zoom_frame(base: np.ndarray, zoom: float, center: tuple[float, float]) -> np.ndarray:
    if abs(zoom - 1.0) < 1e-6:
        return base
    crop_w = max(2, int(round(W / zoom)))
    crop_h = max(2, int(round(H / zoom)))
    x0 = int(round(center[0] - crop_w / 2))
    y0 = int(round(center[1] - crop_h / 2))
    x0 = min(max(0, x0), W - crop_w)
    y0 = min(max(0, y0), H - crop_h)
    crop = base[y0:y0 + crop_h, x0:x0 + crop_w]
    return cv2.resize(crop, (W, H), interpolation=cv2.INTER_LANCZOS4)


class Encoder:
    def __init__(self, output: Path):
        self.output = output
        cmd = [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-f", "rawvideo", "-pix_fmt", "rgb24", "-s:v", f"{W}x{H}",
            "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264",
            "-preset", "fast", "-crf", "15", "-pix_fmt", "yuv420p",
            "-profile:v", "high", "-level:v", "4.1", "-g", "60",
            "-color_primaries", "bt709", "-color_trc", "bt709",
            "-colorspace", "bt709", "-movflags", "+faststart", str(output),
        ]
        self.proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    def write(self, frame: np.ndarray) -> None:
        assert self.proc.stdin is not None
        self.proc.stdin.write(np.ascontiguousarray(frame, dtype=np.uint8).tobytes())

    def close(self) -> None:
        assert self.proc.stdin is not None
        self.proc.stdin.close()
        code = self.proc.wait()
        if code:
            raise RuntimeError(f"ffmpeg failed for {self.output.name} with exit code {code}")


def render_transformation() -> None:
    frames = [load_rgb(name) for name in S["transform"]]
    starts = [0.0, 2.0, 3.3, 4.6, 5.9]
    fade = 0.24
    enc = Encoder(p(O["transform"]))
    for index in range(17 * FPS):
        t = index / FPS
        key = max(i for i, start in enumerate(starts) if start <= t)
        if key < len(frames) - 1 and t >= starts[key + 1] - fade:
            amount = smoothstep((t - (starts[key + 1] - fade)) / fade)
            frame = blend(frames[key], frames[key + 1], amount)
        else:
            frame = frames[key]
        enc.write(frame)
    enc.close()


def ada_final_frame() -> np.ndarray:
    return zoom_frame(load_rgb(S["ada_card"]), 1.33, (728.0, 455.0))


def render_ada() -> None:
    base = load_rgb(S["ada_card"])
    final = zoom_frame(base, 1.33, (728.0, 455.0))
    enc = Encoder(p(O["ada"]))
    for index in range(round(49.7 * FPS)):
        t = index / FPS
        if t < 1.0:
            frame = base
        elif t < 9.5:
            amount = smoothstep((t - 1.0) / 8.5)
            zoom = 1.0 + 0.33 * amount
            cx = 960.0 + (728.0 - 960.0) * amount
            cy = 540.0 + (455.0 - 540.0) * amount
            frame = zoom_frame(base, zoom, (cx, cy))
        else:
            frame = final
        enc.write(frame)
    enc.close()


def moth_assets(end: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    x1, y1, x2, y2 = 928, 832, 1152, 1002
    crop = end[y1:y2, x1:x2].copy()
    # The moth is extracted from its approved landed frame with a hand-fitted
    # silhouette. This excludes the notebook lines and the painted drop shadow.
    alpha_im = Image.new("L", (x2 - x1, y2 - y1), 0)
    draw = ImageDraw.Draw(alpha_im)
    draw.polygon([(22, 55), (30, 48), (50, 43), (91, 44), (106, 53), (99, 66), (66, 75), (36, 71), (22, 64)], fill=255)
    draw.polygon([(111, 52), (127, 42), (182, 35), (198, 39), (198, 53), (188, 61), (158, 70), (126, 65)], fill=255)
    draw.polygon([(103, 62), (92, 73), (76, 82), (70, 88), (78, 96), (96, 101), (110, 94), (114, 75)], fill=255)
    draw.polygon([(116, 65), (130, 72), (160, 78), (175, 87), (171, 95), (151, 103), (135, 97), (119, 80)], fill=255)
    draw.polygon([(102, 48), (110, 43), (119, 49), (122, 69), (126, 89), (119, 103), (108, 103), (102, 91), (100, 63)], fill=255)
    draw.line([(108, 54), (77, 30)], fill=255, width=4)
    draw.line([(114, 53), (143, 27)], fill=255, width=4)
    manual = np.asarray(alpha_im, dtype=np.uint8)
    saturation = cv2.cvtColor(crop, cv2.COLOR_RGB2HSV)[..., 1]
    painted_moth = ((manual > 0) & (saturation > 135)).astype(np.uint8) * 255
    painted_moth = cv2.morphologyEx(painted_moth, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    alpha = cv2.GaussianBlur(painted_moth, (0, 0), 0.8)
    sprite = np.dstack([crop, alpha])
    return end, sprite


def overlay_sprite(base: np.ndarray, sprite: np.ndarray, center: tuple[float, float], scale: float, angle: float) -> np.ndarray:
    h, w = sprite.shape[:2]
    matrix = cv2.getRotationMatrix2D((w / 2, h / 2), angle, scale)
    matrix[0, 2] += center[0] - w / 2
    matrix[1, 2] += center[1] - h / 2
    warped = cv2.warpAffine(sprite, matrix, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    alpha = warped[..., 3:4].astype(np.float32) / 255.0
    return np.clip(base.astype(np.float32) * (1.0 - alpha) + warped[..., :3].astype(np.float32) * alpha, 0, 255).astype(np.uint8)


def render_grace() -> None:
    before = load_rgb(S["grace_before"])
    end = load_rgb(S["grace_end"])
    _, sprite = moth_assets(end)
    enc = Encoder(p(O["grace"]))
    for index in range(round(12.6 * FPS)):
        t = index / FPS
        if t < 1.0:
            frame = before
        elif t < 5.2:
            u = smoothstep((t - 1.0) / 4.2)
            one = 1.0 - u
            x = one ** 3 * 1870 + 3 * one ** 2 * u * 1740 + 3 * one * u ** 2 * 1510 + u ** 3 * 1425
            y = one ** 3 * 170 + 3 * one ** 2 * u * 210 + 3 * one * u ** 2 * 360 + u ** 3 * 455
            flutter = math.sin(2 * math.pi * 5.5 * u) * 7.0 * (1.0 - u)
            frame = overlay_sprite(before, sprite, (x, y), 0.46 + 0.54 * u, -24.0 + 24.0 * u + flutter)
        else:
            frame = end
        enc.write(frame)
    enc.close()


def fei_wall_mask() -> np.ndarray:
    return polygon_mask(
        [(0, 0), (1395, 0), (1600, 278), (1440, 420), (1235, 670), (1010, 1015), (0, 1080)],
        blur=3.0,
    )


def render_fei() -> None:
    start = load_rgb(S["fei_start"])
    end = load_rgb(S["fei_end"])
    wall = fei_wall_mask()
    dark = np.clip(end.astype(np.float32) * 0.11 + np.array([15, 24, 30], dtype=np.float32), 0, 255)
    empty = np.clip(end.astype(np.float32) * (1.0 - wall[..., None]) + dark * wall[..., None], 0, 255).astype(np.uint8)
    yy, xx = np.mgrid[0:H, 0:W]
    distance = np.sqrt(((xx - 1320.0) / 1540.0) ** 2 + ((yy - 290.0) / 1120.0) ** 2)
    distance = np.clip(distance / max(1e-6, float(distance[wall > 0.1].max())), 0.0, 1.0)
    enc = Encoder(p(O["fei"]))
    for index in range(23 * FPS):
        t = index / FPS
        if t < 1.5:
            frame = start
        elif t < 8.5:
            u = smoothstep((t - 1.5) / 7.0)
            reveal = np.clip((u - distance + 0.075) / 0.075, 0.0, 1.0) * wall
            composed = np.clip(empty.astype(np.float32) * (1.0 - reveal[..., None]) + end.astype(np.float32) * reveal[..., None], 0, 255).astype(np.uint8)
            zoom = 1.30 - 0.30 * u
            cx = 1060.0 + (960.0 - 1060.0) * u
            cy = 515.0 + (540.0 - 515.0) * u
            frame = zoom_frame(composed, zoom, (cx, cy))
        else:
            frame = end
        enc.write(frame)
    enc.close()


def chalk_mask_and_blank(frame: np.ndarray, box: tuple[int, int, int, int]) -> tuple[np.ndarray, np.ndarray]:
    x1, y1, x2, y2 = box
    roi = frame[y1:y2, x1:x2]
    hsv = cv2.cvtColor(roi, cv2.COLOR_RGB2HSV)
    # Chalk is the only broad, light, low-to-mid-saturation mark in this board ROI.
    selected = ((hsv[..., 2] > 126) & (hsv[..., 1] < 145)).astype(np.uint8) * 255
    selected = cv2.morphologyEx(selected, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    selected = cv2.dilate(selected, np.ones((5, 5), np.uint8))
    mask = np.zeros((H, W), dtype=np.uint8)
    mask[y1:y2, x1:x2] = selected
    blank = cv2.inpaint(frame, mask, 7, cv2.INPAINT_TELEA)
    soft = cv2.GaussianBlur(mask, (0, 0), 1.0).astype(np.float32) / 255.0
    return blank, soft


def render_naming() -> None:
    start = load_rgb(S["naming_start"])
    end = load_rgb(S["naming_end"])
    start_blank, _ = chalk_mask_and_blank(start, (905, 50, 1515, 345))
    end_blank, chalk = chalk_mask_and_blank(end, (900, 45, 1515, 350))
    yy, xx = np.mgrid[0:H, 0:W]
    enc = Encoder(p(O["naming"]))
    for index in range(5 * FPS):
        t = index / FPS
        if t < 0.4:
            frame = start_blank
        else:
            if t < 1.65:
                progress = smoothstep((t - 0.45) / 1.20)
                line = (yy < 190).astype(np.float32)
                sweep = np.clip((progress - (xx - 900) / 620.0 + 0.045) / 0.045, 0, 1)
                reveal = chalk * line * sweep
            elif t < 3.05:
                progress = smoothstep((t - 1.65) / 1.40)
                line1 = (yy < 190).astype(np.float32) * chalk
                sweep = np.clip((progress - (xx - 900) / 620.0 + 0.045) / 0.045, 0, 1)
                line2 = ((yy >= 175) & (yy < 310)).astype(np.float32) * chalk * sweep
                reveal = np.maximum(line1, line2)
            elif t < 3.45:
                progress = smoothstep((t - 3.05) / 0.40)
                upper = (yy < 310).astype(np.float32) * chalk
                sweep = np.clip((progress - (xx - 900) / 620.0 + 0.05) / 0.05, 0, 1)
                underline = (yy >= 295).astype(np.float32) * chalk * sweep
                reveal = np.maximum(upper, underline)
            else:
                reveal = chalk
            frame = np.clip(end_blank.astype(np.float32) * (1.0 - reveal[..., None]) + end.astype(np.float32) * reveal[..., None], 0, 255).astype(np.uint8)
        enc.write(frame)
    enc.close()


def dim_rectangles(frame: np.ndarray, boxes: list[tuple[int, int, int, int]], amount: float) -> np.ndarray:
    mask = np.zeros((H, W), dtype=np.float32)
    for box in boxes:
        mask = np.maximum(mask, rectangle_mask(box, blur=3.0))
    alpha = mask[..., None] * amount
    dark = frame.astype(np.float32) * 0.14
    return np.clip(frame.astype(np.float32) * (1.0 - alpha) + dark * alpha, 0, 255).astype(np.uint8)


def render_winter() -> None:
    start = load_rgb(S["winter_start"])
    mid = load_rgb(S["winter_mid"])
    end = load_rgb(S["winter_end"])
    enc = Encoder(p(O["winter"]))
    for index in range(15 * FPS):
        t = index / FPS
        if t < 5.0:
            amount = smoothstep((t - 3.45) / 1.45)
            frame = dim_rectangles(start, [(878, 430, 947, 496), (1045, 429, 1079, 492)], amount)
        elif t < 10.0:
            amount = smoothstep((t - 8.45) / 1.45)
            frame = dim_rectangles(mid, [(876, 430, 946, 500)], amount)
        else:
            frame = end
        enc.write(frame)
    enc.close()


def finale_panel_masks() -> list[np.ndarray]:
    upper_left = [(0, 0, 158, 435), (145, 0, 330, 435), (315, 0, 490, 435), (470, 0, 620, 435), (600, 0, 745, 435), (720, 0, 855, 435)]
    upper_right = [(1065, 0, 1215, 435), (1195, 0, 1350, 435), (1330, 0, 1490, 435), (1470, 0, 1630, 435), (1610, 0, 1780, 435), (1755, 0, 1919, 435)]
    lower_left = [(0, 375, 170, 840), (150, 375, 320, 840), (300, 375, 475, 840), (455, 375, 620, 840), (600, 375, 750, 840), (725, 375, 855, 840)]
    lower_right = [(1060, 375, 1220, 840), (1200, 375, 1360, 840), (1340, 375, 1500, 840), (1480, 375, 1640, 840), (1620, 375, 1790, 840), (1765, 375, 1919, 840)]
    boxes = upper_left + upper_right + lower_left + lower_right
    # Alternate around the hall so each portrait visibly wakes as an individual beat.
    order = [5, 6, 17, 18, 4, 7, 16, 19, 3, 8, 15, 20, 2, 9, 14, 21, 1, 10, 13, 22, 0, 11, 12, 23]
    return [rectangle_mask(boxes[i], blur=10.0) for i in order]


def render_finale() -> None:
    start = load_rgb(S["finale_start"])
    end = load_rgb(S["finale_end"])
    masks = finale_panel_masks()
    delta = end.astype(np.float32) - start.astype(np.float32)
    enc = Encoder(p(O["finale"]))
    for index in range(79 * FPS):
        t = index / FPS
        if t < 2.0:
            frame = start
        elif t < 16.0:
            alpha = np.zeros((H, W), dtype=np.float32)
            for i, mask in enumerate(masks):
                begin = 2.0 + i * 0.43
                factor = smoothstep((t - begin) / 0.85)
                if factor > 0:
                    alpha = np.maximum(alpha, mask * factor)
            global_finish = smoothstep((t - 13.7) / 2.3)
            alpha = np.maximum(alpha, global_finish)
            frame = np.clip(start.astype(np.float32) + delta * alpha[..., None], 0, 255).astype(np.uint8)
        else:
            frame = end
        enc.write(frame)
    enc.close()


def decode_swirl() -> np.ndarray:
    swirl_path = FX / "timejump-swirl-v1.mov"
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(swirl_path), "-f", "rawvideo", "-pix_fmt", "rgba", "-"],
        check=True,
        stdout=subprocess.PIPE,
    )
    frame_bytes = W * H * 4
    if len(result.stdout) % frame_bytes:
        raise RuntimeError("Unexpected alpha swirl decode size")
    return np.frombuffer(result.stdout, dtype=np.uint8).reshape((-1, H, W, 4))


def shift_rgba(frame: np.ndarray, dx: int, dy: int) -> np.ndarray:
    shifted = np.zeros_like(frame)
    sx1, sx2 = max(0, -dx), min(W, W - dx)
    sy1, sy2 = max(0, -dy), min(H, H - dy)
    dx1, dx2 = max(0, dx), min(W, W + dx)
    dy1, dy2 = max(0, dy), min(H, H + dy)
    shifted[dy1:dy2, dx1:dx2] = frame[sy1:sy2, sx1:sx2]
    return shifted


def overlay_rgba(base: np.ndarray, layer: np.ndarray, opacity: float = 1.0) -> np.ndarray:
    alpha = layer[..., 3:4].astype(np.float32) / 255.0 * opacity
    return np.clip(base.astype(np.float32) * (1.0 - alpha) + layer[..., :3].astype(np.float32) * alpha, 0, 255).astype(np.uint8)


def render_first_timejump(swirl: np.ndarray) -> None:
    hall = load_rgb(S["hall_portal"])
    card = load_rgb(S["card_london"])
    destination = load_rgb(S["ada_study"])
    portal = polygon_mask([(0, 0), (900, 0), (940, 240), (965, 720), (890, 930), (610, 1015), (245, 965), (0, 835)], blur=52.0)
    yy, xx = np.mgrid[0:H, 0:W]
    enc = Encoder(p(O["tj_london"]))
    for index in range(round(10.3 * FPS)):
        t = index / FPS
        if t < 4.35:
            frame = hall.astype(np.float32)
            dim = smoothstep((t - 1.20) / 1.55)
            frame *= 1.0 - 0.28 * dim
            frame[..., 0] += 10.0 * dim
            frame[..., 1] += 4.0 * dim
            wake = smoothstep((t - 2.55) / 1.0)
            lit = np.clip(frame * 1.19 + np.array([18, 22, 28], dtype=np.float32), 0, 255)
            frame = frame * (1.0 - portal[..., None] * wake) + lit * (portal[..., None] * wake)
            frame = np.clip(frame, 0, 255).astype(np.uint8)
        elif t < 5.35:
            frame = blend(hall, card, smoothstep((t - 4.35) / 1.0))
        elif t < 8.90:
            frame = card
        elif t < 9.30:
            frame = blend(card, np.broadcast_to(WARM_WHITE, card.shape).astype(np.uint8), smoothstep((t - 8.90) / 0.40))
        elif t >= 10.05:
            frame = destination
        else:
            recede = smoothstep((t - 9.30) / 0.75)
            radius = 1320.0 * (1.0 - recede)
            feather = 95.0
            dist = np.sqrt((xx - W / 2) ** 2 + (yy - H / 2) ** 2)
            white_alpha = np.clip((radius + feather - dist) / feather, 0.0, 1.0)[..., None]
            frame = np.clip(destination.astype(np.float32) * (1.0 - white_alpha) + WARM_WHITE * white_alpha, 0, 255).astype(np.uint8)

        if 3.0 <= t < 5.55:
            rel = min(1.0, (t - 3.0) / 2.0)
            swirl_index = min(len(swirl) - 1, int(round(rel * (len(swirl) - 1))))
            recentre = smoothstep((rel - 0.64) / 0.36)
            layer = shift_rgba(swirl[swirl_index], int(round(-350 * (1.0 - recentre))), int(round(-205 * (1.0 - recentre))))
            opacity = 1.0 if t < 5.0 else max(0.0, (5.55 - t) / 0.55)
            frame = overlay_rgba(frame, layer, opacity)
        enc.write(frame)
    enc.close()


def render_short_timejump(output_key: str, outgoing: np.ndarray, card_name: str, swirl: np.ndarray) -> None:
    card = load_rgb(card_name)
    enc = Encoder(p(O[output_key]))
    total = round(1.5 * FPS)
    for index in range(total):
        u = index / (total - 1)
        card_mix = smoothstep((u - 0.78) / 0.22)
        base = blend(outgoing, card, card_mix)
        swirl_index = min(len(swirl) - 1, int(round(u * (len(swirl) - 1))))
        opacity = 1.0 - smoothstep((u - 0.82) / 0.18)
        frame = overlay_rgba(base, swirl[swirl_index], opacity)
        enc.write(frame)
    enc.close()


def render_timejumps() -> None:
    swirl = decode_swirl()
    render_first_timejump(swirl)
    render_short_timejump("tj_hollywood", ada_final_frame(), S["card_hollywood"], swirl)
    render_short_timejump("tj_philadelphia", load_rgb(S["hedy_out"]), S["card_philadelphia"], swirl)
    render_short_timejump("tj_grace", load_rgb(S["eniac_out"]), S["card_grace"], swirl)
    render_short_timejump("tj_dartmouth", load_rgb(S["grace_end"]), S["card_dartmouth"], swirl)
    render_short_timejump("tj_cambridge", load_rgb(S["winter_end"]), S["card_cambridge"], swirl)
    render_short_timejump("tj_feifei", load_rgb(S["karen_out"]), S["card_feifei"], swirl)
    render_short_timejump("tj_modern", load_rgb(S["desk_out"]), S["card_modern"], swirl)
    del swirl
    gc.collect()


def validate_input_files() -> dict[str, str]:
    if not FFMPEG.is_file():
        raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
    names: set[str] = set()
    for value in S.values():
        if isinstance(value, list):
            names.update(value)
        else:
            names.add(value)
    checksums = {}
    for name in sorted(names):
        path = p(name)
        if not path.is_file():
            raise FileNotFoundError(path)
        checksums[name] = sha256(path)
    swirl = FX / "timejump-swirl-v1.mov"
    if not swirl.is_file():
        raise FileNotFoundError(swirl)
    checksums[str(swirl.relative_to(ROOT))] = sha256(swirl)
    return checksums


def decode_qc(record: ClipRecord) -> None:
    path = p(record.filename)
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path), "-f", "null", "-"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if result.returncode:
        raise RuntimeError(f"Decode QC failed for {path.name}: {result.stderr.decode(errors='replace')}")
    probe = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    ).stderr.decode(errors="replace")
    if "Video: h264" not in probe or not re.search(r"1920x1080[^\n]*30 fps", probe):
        raise RuntimeError(f"Format QC failed for {path.name}: {probe}")
    record.sha256 = sha256(path)
    record.size_bytes = path.stat().st_size
    record.decode_qc = "passed"


def extract_sample(video: Path, timestamp: float, output: Path) -> None:
    subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-ss", f"{timestamp:.3f}", "-i", str(video), "-frames:v", "1", "-vf", "scale=480:270:flags=lanczos", "-q:v", "2", "-y", str(output)],
        check=True,
    )


def build_contact_sheet() -> None:
    thumb_w, thumb_h, label_h = 480, 270, 34
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 16)
    except OSError:
        font = ImageFont.load_default()
    sheet = Image.new("RGB", (thumb_w * 3, (thumb_h + label_h) * len(RECORDS)), (15, 15, 18))
    draw = ImageDraw.Draw(sheet)
    with tempfile.TemporaryDirectory(prefix="ep04-animation-qc-") as temp_dir:
        temp = Path(temp_dir)
        for row, record in enumerate(RECORDS):
            for col, timestamp in enumerate(record.sample_times):
                sample = temp / f"{row:02d}-{col}.jpg"
                extract_sample(p(record.filename), timestamp, sample)
                with Image.open(sample) as im:
                    sheet.paste(im.convert("RGB"), (col * thumb_w, row * (thumb_h + label_h)))
                label = f"{record.key}  {timestamp:.2f}s"
                x, y = col * thumb_w, row * (thumb_h + label_h) + thumb_h
                draw.rectangle((x, y, x + thumb_w, y + label_h), fill=(15, 15, 18))
                draw.text((x + 8, y + 8), label, fill=(245, 245, 245), font=font)
    sheet.save(CONTACT_SHEET, quality=92, subsampling=0)


def write_manifest(source_hashes_before: dict[str, str]) -> None:
    source_hashes_after = validate_input_files()
    if source_hashes_before != source_hashes_after:
        raise RuntimeError("Approved source checksum changed during render")
    payload = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "brief": "operations/codex-prompts/ep04-animation-brief.md",
        "delivery_root": str(PIXEL.relative_to(ROOT)),
        "video_standard": {"width": W, "height": H, "fps": FPS, "codec": "H.264", "pixel_format": "yuv420p", "audio": "none"},
        "clips": [asdict(record) for record in RECORDS],
        "qc": {
            "all_outputs_decode": all(record.decode_qc == "passed" for record in RECORDS),
            "approved_sources_untouched": True,
            "source_file_count": len(source_hashes_before),
            "contact_sheet": CONTACT_SHEET.name,
            "directional_actions": "play once, then hold final frame",
            "art_method": "approved comic keyframes only; no optical flow, generated poses, or pixel-art substitution",
        },
    }
    MANIFEST.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--replace-generated", action="store_true", help="Replace only the exact generated-v1 outputs from this script")
    args = parser.parse_args()
    protected_outputs = [p(record.filename) for record in RECORDS] + [CONTACT_SHEET, MANIFEST]
    existing = [path for path in protected_outputs if path.exists()]
    if existing and not args.replace_generated:
        raise FileExistsError("Generated-v1 output already exists; use --replace-generated only for this script's outputs:\n" + "\n".join(str(path) for path in existing))

    source_hashes = validate_input_files()
    jobs = [
        ("transformation", render_transformation),
        ("Ada punched card", render_ada),
        ("Grace moth", render_grace),
        ("Fei-Fei wall", render_fei),
        ("naming chalk", render_naming),
        ("AI winter", render_winter),
        ("LUMINAiRY finale", render_finale),
        ("eight time jumps", render_timejumps),
    ]
    for label, job in jobs:
        print(f"RENDER {label}", flush=True)
        job()
        print(f"DONE   {label}", flush=True)
        gc.collect()

    print("QC decode and format", flush=True)
    for record in RECORDS:
        decode_qc(record)
        print(f"PASS   {record.filename}", flush=True)
    build_contact_sheet()
    write_manifest(source_hashes)
    print(f"CONTACT {CONTACT_SHEET}", flush=True)
    print(f"MANIFEST {MANIFEST}", flush=True)


if __name__ == "__main__":
    main()
