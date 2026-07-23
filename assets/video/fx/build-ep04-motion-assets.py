#!/usr/bin/env python3
"""Build the EP04 opening ambient loops and reusable time-jump swirl.

All motion is additive or confined to a background mask. Source artwork is read-only.
Outputs are 1920x1080 at 30 fps. The swirl is ProRes 4444 with alpha; loops are H.264.
"""

from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[3]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
CLIPS = ROOT / "assets/episodes/ep-04/clips"
FX = ROOT / "assets/video/fx"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
LOOP_FRAMES = 5 * FPS
SWIRL_FRAMES = 2 * FPS


SOURCES = {
    "hall": "ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png",
    # ⚠ Must be the frame the CUE plays. This was `-comic-v3-six-visible-crown-clips-`
    # while cue 14 plays `-comic-v1-`, so the loop was built from a different picture
    # and the substitution silently never fired. Composition is identical between the
    # two, so the light coordinates below carry over unchanged.
    "approach": "ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png",
    "title": "ep04-open-03-title-comic-v1-exact-text-1920.png",
    "desk": "ep04-open-04-desk-comic-v1-face-lock-1920.png",
    "directory": "ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920.png",
}


# How hard each light source is driven. Tuned against `operations/tools/measure-motion.py`,
# which reports peak-to-peak travel in the hottest 1% of pixels as a multiple of a
# known-STILL hold in the same encode. Target band is 8-15x that floor: clearly alive,
# not strobing. `title` shipped at ~36x and reads as ambient, so the ceiling is generous.
#
# These swing AROUND the painted value rather than only adding to it. Additive-only is
# why the first pass measured as still: the candles were already near white, so extra
# light clipped at 255 and produced no travel at all. A flame that dips as well as
# flares also happens to be what a flame does.
GAIN = {
    "hall_candles": 0.62,
    "hall_glass": 0.075,
    "approach_lights": 0.68,
    "approach_sky": 0.32,
    "approach_fireflies": 0.60,
    "desk_screen": 0.34,
    "desk_spill": 0.13,
    "directory_panels": 0.20,
    "directory_neon": 0.42,
}


OUTPUTS = {
    key: PIXEL / f"{Path(filename).stem}-loop-v1.mp4"
    for key, filename in SOURCES.items()
}
OUTPUTS["swirl"] = FX / "timejump-swirl-v1.mov"
OUTPUTS["first_transition"] = CLIPS / "ep04-timejump-first-london-v1.mp4"


def load_rgb(key: str) -> np.ndarray:
    path = PIXEL / SOURCES[key]
    with Image.open(path) as im:
        if im.size != (W, H):
            raise ValueError(f"{path.name}: expected {W}x{H}, got {im.size}")
        return np.asarray(im.convert("RGB"), dtype=np.float32)


def pulse(frame: int, phase: float = 0.0, harmonic: float = 0.0) -> float:
    theta = 2.0 * math.pi * (frame / LOOP_FRAMES) + phase
    value = 0.5 + 0.5 * math.sin(theta)
    if harmonic:
        value = 0.72 * value + 0.28 * (0.5 + 0.5 * math.sin(3 * theta + harmonic))
    return value


def polygon_mask(points, blur: float = 0.0) -> np.ndarray:
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    if blur:
        mask = mask.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(mask, dtype=np.float32) / 255.0


def rectangle_mask(box, blur: float = 0.0) -> np.ndarray:
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).rectangle(box, fill=255)
    if blur:
        mask = mask.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(mask, dtype=np.float32) / 255.0


def glow_map(points, color=(255, 170, 64), core=7, halo=34, strength=1.0) -> np.ndarray:
    core_layer = Image.new("L", (W, H), 0)
    halo_layer = Image.new("L", (W, H), 0)
    dc = ImageDraw.Draw(core_layer)
    dh = ImageDraw.Draw(halo_layer)
    for x, y, scale in points:
        rr = max(2, int(core * scale))
        hr = max(5, int(halo * scale))
        dc.ellipse((x - rr, y - 2 * rr, x + rr, y + 2 * rr), fill=255)
        dh.ellipse((x - hr, y - hr, x + hr, y + hr), fill=205)
    core_layer = core_layer.filter(ImageFilter.GaussianBlur(max(2, core * 0.55)))
    halo_layer = halo_layer.filter(ImageFilter.GaussianBlur(max(4, halo * 0.62)))
    alpha = (
        np.asarray(core_layer, dtype=np.float32) / 255.0
        + 0.50 * np.asarray(halo_layer, dtype=np.float32) / 255.0
    )
    alpha = np.clip(alpha * strength, 0.0, 1.0)[..., None]
    return alpha * np.asarray(color, dtype=np.float32)[None, None, :]


def add(frame: np.ndarray, layer: np.ndarray, amount: float) -> np.ndarray:
    return np.clip(frame + layer * amount, 0, 255)


class Encoder:
    def __init__(self, output: Path, alpha: bool = False):
        output.parent.mkdir(parents=True, exist_ok=True)
        self.output = output
        self.alpha = alpha
        input_pix = "rgba" if alpha else "rgb24"
        cmd = [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-f", "rawvideo", "-pix_fmt", input_pix,
            "-s:v", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-an",
        ]
        if alpha:
            cmd += [
                "-c:v", "prores_ks", "-profile:v", "4",
                "-pix_fmt", "yuva444p10le", "-vendor", "apl0",
            ]
        else:
            cmd += [
                "-c:v", "libx264", "-preset", "medium", "-crf", "16",
                "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            ]
        cmd.append(str(output))
        self.proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    def write(self, frame: np.ndarray) -> None:
        assert self.proc.stdin is not None
        self.proc.stdin.write(np.ascontiguousarray(frame, dtype=np.uint8).tobytes())

    def close(self) -> None:
        assert self.proc.stdin is not None
        self.proc.stdin.close()
        result = self.proc.wait()
        if result:
            raise RuntimeError(f"ffmpeg failed for {self.output} with exit code {result}")


def render_hall() -> None:
    base = load_rgb("hall")
    candles = [
        (43, 250, 1.30), (349, 709, 0.70), (447, 316, 1.00),
        (711, 354, 0.70), (906, 432, 0.58), (1047, 481, 0.45),
        (1123, 503, 0.40), (1216, 518, 0.36), (1311, 521, 0.34),
        (1396, 509, 0.38), (1456, 480, 0.46), (1547, 450, 0.52),
        (1630, 403, 0.60), (1728, 317, 0.88), (1871, 275, 1.05),
        (866, 638, 0.42), (1004, 624, 0.38), (1424, 623, 0.38),
        (1568, 647, 0.42), (379, 876, 0.48), (653, 773, 0.36),
        (998, 782, 0.35), (1361, 765, 0.34), (1612, 809, 0.42),
    ]
    groups = [glow_map(candles[i::4], strength=0.78) for i in range(4)]
    yy, xx = np.mgrid[0:H, 0:W]
    stained = (
        (base[..., 2] > 52)
        & (base[..., 2] > base[..., 0] * 1.16)
        & (base[..., 2] > base[..., 1] * 1.04)
        & (yy < 670)
    ).astype(np.float32)
    # Avoid the foreground heroine and large portrait figures. The shimmer remains in glass.
    protected = np.zeros((H, W), dtype=np.float32)
    protected[40:1030, 55:620] = 1
    protected[100:610, 680:840] = 1
    protected[135:620, 910:1000] = 1
    protected[130:610, 1510:1830] = 1
    stained *= 1.0 - protected
    stained = np.asarray(
        Image.fromarray((stained * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(8)),
        dtype=np.float32,
    ) / 255.0
    blue_layer = stained[..., None] * np.array([38, 82, 155], dtype=np.float32)

    enc = Encoder(OUTPUTS["hall"])
    for f in range(LOOP_FRAMES):
        frame = base.copy()
        for i, layer in enumerate(groups):
            # Swing either side of the painted brightness: the flame flares AND gutters.
            amp = GAIN["hall_candles"] * (pulse(f, phase=i * 1.57, harmonic=0.8 + i) - 0.5)
            frame = add(frame, layer, amp)
        breathe = GAIN["hall_glass"] * (pulse(f, phase=0.35) - 0.5)
        frame = add(frame, blue_layer, breathe)
        enc.write(frame)
    enc.close()


def render_approach() -> None:
    base = load_rgb("approach")
    person_guard = polygon_mask(
        [(603, 318), (700, 294), (770, 351), (805, 520), (823, 780),
         (781, 1018), (681, 1056), (535, 1008), (512, 890), (548, 650)],
        blur=3,
    )[..., None]
    lights = [
        (34, 111, 1.00), (126, 199, 0.90), (225, 249, 0.80),
        (280, 286, 0.70), (332, 321, 0.66), (480, 393, 0.62),
        (548, 424, 0.55), (627, 455, 0.48), (705, 481, 0.42),
        (790, 512, 0.40), (877, 537, 0.35), (954, 554, 0.32),
        (1089, 572, 0.34), (1218, 558, 0.34), (1324, 527, 0.38),
        (1419, 496, 0.43), (1526, 463, 0.48), (1660, 420, 0.54),
        (1777, 367, 0.62), (1846, 335, 0.72),
        (274, 903, 0.85), (584, 983, 0.82), (793, 820, 0.63),
        (876, 749, 0.52), (1284, 1031, 0.90), (1315, 801, 0.48),
        (1134, 649, 0.40), (1546, 695, 0.43), (1715, 596, 0.44),
    ]
    groups = [glow_map(lights[i::5], strength=0.88) for i in range(5)]
    sky_mask = polygon_mask(
        [(310, 0), (1550, 0), (1320, 190), (1110, 295), (855, 325),
         (640, 405), (520, 348), (395, 286)],
        blur=22,
    )[..., None] * (1.0 - person_guard)
    sky_left = np.asarray(Image.fromarray(base.astype(np.uint8)).transform(
        (W, H), Image.Transform.AFFINE, (1, 0, 6, 0, 1, 0),
        resample=Image.Resampling.BICUBIC,
    ), dtype=np.float32)
    sky_right = np.asarray(Image.fromarray(base.astype(np.uint8)).transform(
        (W, H), Image.Transform.AFFINE, (1, 0, -6, 0, 1, 0),
        resample=Image.Resampling.BICUBIC,
    ), dtype=np.float32)
    fireflies = [
        (452, 565, 1.2, 0.2), (520, 620, 0.8, 1.0), (848, 605, 1.0, 2.1),
        (1090, 620, 0.9, 3.0), (1364, 657, 1.1, 4.2), (1480, 579, 0.8, 5.0),
        (1615, 684, 1.0, 1.6), (1760, 554, 0.8, 3.7), (1196, 711, 0.9, 0.8),
    ]

    enc = Encoder(OUTPUTS["approach"])
    for f in range(LOOP_FRAMES):
        u = f / LOOP_FRAMES
        drift_mix = 0.5 + 0.5 * math.sin(2 * math.pi * u)
        shifted_sky = sky_left * (1 - drift_mix) + sky_right * drift_mix
        frame = base * (1 - GAIN["approach_sky"] * sky_mask) + shifted_sky * (GAIN["approach_sky"] * sky_mask)
        for i, layer in enumerate(groups):
            amp = GAIN["approach_lights"] * (pulse(f, phase=i * 1.27, harmonic=1.3 + i) - 0.5)
            frame = add(frame, layer * (1.0 - person_guard), amp)

        fire_points = []
        for x, y, scale, phase in fireflies:
            angle = 2 * math.pi * u + phase
            fx = int(x + 4.0 * math.cos(angle))
            fy = int(y + 3.0 * math.sin(angle))
            flicker = 0.35 + 0.65 * (0.5 + 0.5 * math.sin(3 * angle + phase))
            fire_points.append((fx, fy, scale * flicker))
        fire_layer = glow_map(fire_points, core=3, halo=12, strength=0.65)
        frame = add(frame, fire_layer * (1.0 - person_guard), GAIN["approach_fireflies"])
        enc.write(frame)
    enc.close()


def render_title() -> None:
    base = load_rgb("title")
    yy, xx = np.mgrid[0:H, 0:W]
    gold = (
        (xx > 330) & (xx < 1560) & (yy > 170) & (yy < 900)
        & (base[..., 0] > 145) & (base[..., 1] > 82)
        & (base[..., 0] > base[..., 2] * 1.7)
    ).astype(np.float32)
    gold = np.asarray(
        Image.fromarray((gold * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)),
        dtype=np.float32,
    ) / 255.0
    enc = Encoder(OUTPUTS["title"])
    motes = [(95 + i * 61 % 1730, 60 + i * 137 % 900, 0.35 + (i % 4) * 0.12) for i in range(26)]
    for f in range(LOOP_FRAMES):
        u = f / LOOP_FRAMES
        center = -520 + u * 2960
        diagonal = center + 0.28 * (yy - 540)
        band = np.exp(-((xx - diagonal) / 62.0) ** 2).astype(np.float32)
        shine = (gold * band)[..., None] * np.array([120, 100, 52], dtype=np.float32)
        frame = add(base.copy(), shine, 0.42)
        dust = []
        for i, (x, y, scale) in enumerate(motes):
            speed = 1 + (i % 3)
            my = int((y - speed * f * H / LOOP_FRAMES) % (H + 40) - 20)
            mx = int(x + 5 * math.sin(2 * math.pi * u + i * 0.7))
            dust.append((mx, my, scale))
        frame = add(frame, glow_map(dust, color=(232, 211, 164), core=2, halo=8, strength=0.42), 0.18)
        enc.write(frame)
    enc.close()


def render_desk() -> None:
    base = load_rgb("desk")
    screen = polygon_mask([(292, 85), (687, 197), (741, 653), (363, 658)], blur=5)[..., None]
    spill = polygon_mask([(258, 595), (736, 638), (1020, 920), (175, 957)], blur=45)[..., None]
    # The spill stops below her wrist/body, keeping the character pixels untouched.
    person_guard = polygon_mask([(742, 0), (1920, 0), (1920, 1080), (900, 1080), (735, 700)], blur=10)[..., None]
    spill *= 1.0 - person_guard
    cyan = np.array([16, 92, 128], dtype=np.float32)[None, None, :]
    enc = Encoder(OUTPUTS["desk"])
    for f in range(LOOP_FRAMES):
        breathe = 0.5 + 0.5 * math.sin(2 * math.pi * f / LOOP_FRAMES - 0.55)
        frame = base.copy()
        frame = add(frame, screen * cyan, GAIN["desk_screen"] * (breathe - 0.5))
        frame = add(frame, spill * cyan, GAIN["desk_spill"] * (breathe - 0.5))
        enc.write(frame)
    enc.close()


def render_directory() -> None:
    base = load_rgb("directory")
    boxes = [
        (610, 205, 1096, 305), (606, 310, 1078, 388), (606, 403, 1078, 480),
        (606, 496, 1078, 573), (606, 588, 1078, 665), (606, 681, 1078, 758),
        (606, 772, 1078, 854),
    ]
    panels = [rectangle_mask(box, blur=10)[..., None] for box in boxes]
    panel_color = np.array([62, 52, 20], dtype=np.float32)[None, None, :]
    neon_points = [
        [(126, 483, 1.1), (164, 483, 0.8), (202, 483, 0.8), (242, 483, 0.8)],
        [(1454, 497, 1.1), (1469, 517, 0.8), (1438, 518, 0.8)],
        [(1200, 450, 0.8), (1212, 452, 0.6)],
    ]
    neon = [
        glow_map(neon_points[0], color=(255, 67, 170), core=7, halo=30, strength=0.9),
        glow_map(neon_points[1], color=(145, 77, 255), core=7, halo=30, strength=0.9),
        glow_map(neon_points[2], color=(255, 186, 56), core=5, halo=22, strength=0.8),
    ]
    enc = Encoder(OUTPUTS["directory"])
    for f in range(LOOP_FRAMES):
        frame = base.copy()
        for i, mask in enumerate(panels):
            amp = GAIN["directory_panels"] * (pulse(f, phase=i * 0.71, harmonic=0.4 + i) - 0.5)
            frame = add(frame, mask * panel_color, amp)
        for i, layer in enumerate(neon):
            theta = 2 * math.pi * f / LOOP_FRAMES + i * 1.9
            buzz = 0.55 + 0.24 * math.sin(theta) + 0.15 * math.sin(5 * theta + 0.7)
            frame = add(frame, layer, GAIN["directory_neon"] * (buzz - 0.5))
        enc.write(frame)
    enc.close()


def render_swirl() -> None:
    rng = np.random.default_rng(1843)
    count = 170
    theta0 = rng.uniform(0, 2 * math.pi, count)
    radius0 = rng.uniform(230, 1030, count)
    yscale = rng.uniform(0.46, 0.62, count)
    width = rng.uniform(1.0, 3.2, count)
    bright = rng.uniform(0.55, 1.0, count)
    phase = rng.uniform(0, 2 * math.pi, count)
    palette = np.array(
        [[255, 185, 70], [255, 224, 148], [66, 154, 232], [89, 208, 242], [54, 100, 206]],
        dtype=np.float32,
    )
    colors = palette[rng.integers(0, len(palette), count)]
    cx, cy = W / 2, H / 2

    enc = Encoder(OUTPUTS["swirl"], alpha=True)
    for f in range(SWIRL_FRAMES):
        u = f / (SWIRL_FRAMES - 1)
        ease = u ** 1.72
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        core = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        dg = ImageDraw.Draw(glow)
        dc = ImageDraw.Draw(core)
        fade_in = min(1.0, u / 0.12) if u > 0 else 0.0
        streak_fade = fade_in * (1.0 - max(0.0, (u - 0.78) / 0.22))
        for i in range(count):
            wobble = 0.035 * math.sin(phase[i] + u * 2 * math.pi)
            r = radius0[i] * max(0.035, (1.0 - ease) ** 1.28)
            angle = theta0[i] + 2 * math.pi * (0.32 * ease + 0.82 * ease * ease) + wobble
            # Tail follows the same spiral slightly earlier: broad soft streak, no hard geometry.
            tail_ease = max(0.0, ease - (0.030 + 0.018 * bright[i]))
            rt = radius0[i] * max(0.040, (1.0 - tail_ease) ** 1.28)
            at = theta0[i] + 2 * math.pi * (0.32 * tail_ease + 0.82 * tail_ease * tail_ease) + wobble
            x = cx + r * math.cos(angle)
            y = cy + r * yscale[i] * math.sin(angle)
            xt = cx + rt * math.cos(at)
            yt = cy + rt * yscale[i] * math.sin(at)
            c = tuple(int(v) for v in colors[i])
            a = int(115 * bright[i] * streak_fade)
            ac = int(205 * bright[i] * streak_fade)
            dg.line((xt, yt, x, y), fill=(*c, a), width=max(2, int(width[i] * 5)))
            dc.line((xt, yt, x, y), fill=(*c, ac), width=max(1, int(width[i])))
            rr = max(1.0, width[i] * 0.8)
            dc.ellipse((x - rr, y - rr, x + rr, y + rr), fill=(*c, ac))
        glow = glow.filter(ImageFilter.GaussianBlur(10))
        combined = Image.alpha_composite(glow, core)

        # Warm white bloom begins after the vortex has accelerated into centre.
        if u > 0.68:
            b = (u - 0.68) / 0.32
            bloom = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            db = ImageDraw.Draw(bloom)
            radius = 65 + b * 1280
            alpha = int(248 * min(1.0, b * 1.28))
            db.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(255, 249, 232, alpha))
            bloom = bloom.filter(ImageFilter.GaussianBlur(max(22, int(88 * (1 - b) + 24))))
            combined = Image.alpha_composite(combined, bloom)
        enc.write(np.asarray(combined, dtype=np.uint8))
    enc.close()


def decode_video(path: Path, pix_fmt: str, channels: int) -> np.ndarray:
    result = subprocess.run(
        [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
            "-f", "rawvideo", "-pix_fmt", pix_fmt, "-",
        ],
        check=True,
        stdout=subprocess.PIPE,
    )
    frame_bytes = W * H * channels
    if len(result.stdout) % frame_bytes:
        raise RuntimeError(f"Unexpected raw frame size while decoding {path}")
    return np.frombuffer(result.stdout, dtype=np.uint8).reshape((-1, H, W, channels))


def shift_rgba(frame: np.ndarray, dx: int, dy: int) -> np.ndarray:
    shifted = np.zeros_like(frame)
    src_x1, src_x2 = max(0, -dx), min(W, W - dx)
    src_y1, src_y2 = max(0, -dy), min(H, H - dy)
    dst_x1, dst_x2 = max(0, dx), min(W, W + dx)
    dst_y1, dst_y2 = max(0, dy), min(H, H + dy)
    shifted[dst_y1:dst_y2, dst_x1:dst_x2] = frame[src_y1:src_y2, src_x1:src_x2]
    return shifted


def smoothstep(value: float) -> float:
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


def render_first_transition() -> None:
    """Render 04:00.00–04:10.30 with narration-locked light and portal beats."""
    with Image.open(PIXEL / "ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png") as im:
        hall = np.asarray(im.convert("RGB"), dtype=np.float32)
    with Image.open(PIXEL / "ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png") as im:
        card = np.asarray(im.convert("RGB"), dtype=np.float32)
    ada_frames = decode_video(CLIPS / "ep04-scene-03-ada-loop-v1.mp4", "rgb24", 3)
    ada = ada_frames[0].astype(np.float32)
    swirl = decode_video(OUTPUTS["swirl"], "rgba", 4)

    portal = polygon_mask(
        [(0, 0), (900, 0), (940, 240), (965, 720), (890, 930),
         (610, 1015), (245, 965), (0, 835)],
        blur=52,
    )[..., None]
    yy, xx = np.mgrid[0:H, 0:W]

    enc = Encoder(OUTPUTS["first_transition"])
    total_frames = int(round(10.30 * FPS))
    for f in range(total_frames):
        t = f / FPS
        if t < 4.45:
            frame = hall.copy()
        elif t < 5.35:
            mix = smoothstep((t - 4.45) / 0.90)
            frame = hall * (1.0 - mix) + card * mix
        elif t < 8.90:
            frame = card.copy()
        elif t < 9.30:
            mix = smoothstep((t - 8.90) / 0.40)
            frame = card * (1.0 - mix) + np.array([255, 249, 232], dtype=np.float32) * mix
        else:
            frame = ada.copy()
            recede = smoothstep((t - 9.30) / 1.00)
            radius = 1320.0 * (1.0 - recede)
            feather = 95.0
            dist = np.sqrt((xx - W / 2) ** 2 + (yy - H / 2) ** 2)
            white_alpha = np.clip((radius + feather - dist) / feather, 0.0, 1.0)[..., None]
            warm_white = np.array([255, 249, 232], dtype=np.float32)[None, None, :]
            frame = frame * (1.0 - white_alpha) + warm_white * white_alpha

        # 04:01.24–04:02.78: the actual narration words "The lights go soft."
        if 1.24 <= t < 4.55:
            dim = smoothstep((t - 1.24) / 1.54)
            dimmed = frame * (1.0 - 0.28 * dim)
            dimmed[..., 0] += 10.0 * dim
            dimmed[..., 1] += 4.0 * dim
            frame = dimmed

        # The Ada panel wakes as the rest of the hall stays down.
        if 2.78 <= t < 4.55:
            wake = smoothstep((t - 2.78) / 1.00)
            lit = np.clip(frame * 1.18 + np.array([18, 22, 28], dtype=np.float32), 0, 255)
            frame = frame * (1.0 - portal * wake) + lit * (portal * wake)

        # The particle centre starts on Ada's panel; the bloom recentres as it fills frame.
        if 3.05 <= t < 5.75:
            rel = t - 3.05
            index = min(len(swirl) - 1, int(rel * FPS))
            u = index / max(1, len(swirl) - 1)
            recentre = smoothstep((u - 0.64) / 0.36)
            dx = int(round(-350 * (1.0 - recentre)))
            dy = int(round(-205 * (1.0 - recentre)))
            layer = shift_rgba(swirl[index], dx, dy).astype(np.float32)
            opacity = 1.0 if t < 5.05 else max(0.0, (5.75 - t) / 0.70)
            alpha = (layer[..., 3:4] / 255.0) * opacity
            frame = frame * (1.0 - alpha) + layer[..., :3] * alpha

        enc.write(frame)
    enc.close()


# ── Scene ambient loops ──────────────────────────────────────────────────────
#
# The opening loops above hand-place every light. That does not scale to the scene
# beats, which have hundreds of indicator lamps each. These detect the practical
# lights instead: small, bright, ISOLATED blobs. A face is bright but it is neither
# small nor isolated, so it is not picked up — and `guards` is the belt to that
# braces, because the standing rule is background motion only, never a face.
#
# Every one of these is verified by rendering a "what moved" heatmap and looking at
# it. Numbers alone cannot tell you the light landed on a cheekbone.

SCENE_LOOPS = {
    "eniac": {
        "src": "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png",
        "cue": "7:22.30",
        "min_lum": 150, "min_sat": 60, "max_blob": 1500, "gain": 0.70, "groups": 6,
        # Fitted to the six women rather than bounding-boxed around them. The first
        # boxes covered the machine banks too and left only 1,629 lit pixels, which
        # rendered as a still. These free the lamp banks above and between the figures.
        "guards": [
            (150, 0, 300, 340), (200, 100, 830, 1080), (840, 350, 1310, 1080),
            (915, 80, 1450, 1080), (1340, 220, 1530, 1080), (1470, 390, 1760, 880),
            (1640, 220, 1900, 830),
        ],
    },
    "grace": {
        "src": "ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png",
        "cue": "9:35.00",
        "min_lum": 168, "min_sat": 85, "max_blob": 1500, "gain": 0.52, "groups": 5,
        "guards": [(240, 0, 1040, 1080)],
    },
    "kate": {
        "src": "ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png",
        "cue": "16:11.60",
        "min_lum": 172, "min_sat": 80, "max_blob": 1400, "gain": 0.55, "groups": 6,
        # Kate herself; the bodiless workers' hands bottom-right that are a known defect
        # in this frame; and the whole landscape half — the brief asks for server racks
        # and the chip, not a twinkling mountain range.
        "guards": [(505, 0, 1245, 1080), (1040, 690, 1920, 1080), (0, 0, 540, 1080)],
    },
    "karen": {
        "src": "ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png",
        "cue": "11:21.70",
        "min_lum": 165, "min_sat": 80, "max_blob": 1600, "gain": 0.50, "groups": 5,
        "guards": [(680, 0, 1540, 1080)],
    },
    "ada_b": {
        "src": "ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png",
        "cue": "5:00.00",
        "min_lum": 170, "min_sat": 80, "max_blob": 1500, "gain": 0.58, "groups": 5,
        # Her hand, the glove and the punch card she is holding — the card IS the subject
        # of this beat, and a subject that pulses reads as a mistake.
        "guards": [(180, 330, 1180, 1080), (1040, 0, 1920, 1080)],
    },
}

for _key, _spec in SCENE_LOOPS.items():
    OUTPUTS[_key] = PIXEL / f"{Path(_spec['src']).stem}-loop-v1.mp4"


def practical_lights(base: np.ndarray, spec: dict) -> tuple[list[np.ndarray], np.ndarray]:
    """Find the small isolated light sources and split them into phase groups."""
    from scipy import ndimage

    lum = base.max(axis=2)
    # A lamp is COLOURED; a specular highlight is near-white. Without this the
    # detector lights up spectacle lenses, which is a face, which is banned.
    # (First pass did exactly that on Grace and Karen — caught in the heatmap.)
    saturation = lum - base.min(axis=2)
    candidate = (lum >= spec["min_lum"]) & (saturation >= spec["min_sat"])

    for x1, y1, x2, y2 in spec["guards"]:
        candidate[y1:y2, x1:x2] = False

    labels, count = ndimage.label(candidate)
    if not count:
        return [], np.zeros(base.shape[:2], dtype=np.float32)

    sizes = np.bincount(labels.ravel())
    # Keep only compact blobs. A lamp is a few dozen pixels; a lit wall, a sky or a
    # face is thousands, and modulating one of those reads as the whole shot flashing.
    keep = np.zeros(count + 1, dtype=bool)
    keep[1:] = (sizes[1:] >= 4) & (sizes[1:] <= spec["max_blob"])

    rng = np.random.default_rng(len(spec["src"]))
    assignment = rng.integers(0, spec["groups"], count + 1)

    masks = []
    for g in range(spec["groups"]):
        member = keep & (assignment == g)
        raw = member[labels].astype(np.float32)
        soft = np.asarray(
            Image.fromarray((raw * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5)),
            dtype=np.float32,
        ) / 255.0
        # The blur bleeds outside the guards; put them back.
        for x1, y1, x2, y2 in spec["guards"]:
            soft[y1:y2, x1:x2] = 0.0
        masks.append(soft[..., None])
    return masks, keep[labels].astype(np.float32)


# ── One-shots: DIRECTIONAL, so they play once and freeze on their own last frame ──
#
# The arc in Hedy's blueprint is ALREADY DRAWN. Nothing is added and nothing is erased —
# a crest of light travels along the line she is describing and leaves it lit behind.
# Revealing it instead would mean painting the arc OUT first, which is the compositing
# move that keeps getting rejected.

HEDY_ONE_SHOT = {
    "src": "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png",
    "out": "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920-signal-v1.mp4",
    "cue": "6:32.00",
    "seconds": 6.0,
    "trail": 0.34,   # how much the arc stays lit once the signal has passed
    "crest": 1.05,   # the travelling head of the signal
    "crest_px": 55,
}

OUTPUTS["hedy_signal"] = PIXEL / HEDY_ONE_SHOT["out"]


def render_hedy_signal() -> None:
    spec = HEDY_ONE_SHOT
    with Image.open(PIXEL / spec["src"]) as im:
        if im.size != (W, H):
            raise ValueError(f"{spec['src']}: expected {W}x{H}, got {im.size}")
        base = np.asarray(im.convert("RGB"), dtype=np.float32)

    # The glowing cyan arc: strong blue and green, weak red.
    arc = (
        (base[..., 2] > 150) & (base[..., 1] > 120) & (base[..., 0] < base[..., 2] * 0.75)
    ).astype(np.float32)
    if arc.sum() < 500:
        raise RuntimeError(f"arc not found ({int(arc.sum())} px) — the frame may have changed")

    ys, xs = np.nonzero(arc)
    x_lo, x_hi = int(xs.min()), int(xs.max())
    top, bottom = int(ys.min()), int(ys.max())
    if top < 700:
        raise RuntimeError(
            f"arc detection reaches y={top}, above the blueprint — it is catching "
            "something else in frame and would light the wrong thing"
        )

    soft = np.asarray(
        Image.fromarray((arc * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(4)),
        dtype=np.float32,
    ) / 255.0
    glow = soft[..., None] * np.array([70, 190, 255], dtype=np.float32)

    frames = int(round(spec["seconds"] * FPS))
    columns = np.arange(W, dtype=np.float32)[None, :]

    enc = Encoder(PIXEL / spec["out"])
    for f in range(frames):
        u = f / (frames - 1)
        eased = u * u * (3.0 - 2.0 * u)
        front = x_lo + eased * (x_hi - x_lo)
        lit = np.clip((front - columns) / 26.0, 0.0, 1.0)
        crest = np.exp(-(((columns - front) / spec["crest_px"]) ** 2))
        # (1, W, 1) so it broadcasts across rows and colour channels.
        amount = (spec["trail"] * lit + spec["crest"] * crest * lit)[..., None]
        enc.write(add(base.copy(), glow, amount))
    enc.close()
    print(f"  hedy signal: {int(arc.sum())} arc px, x {x_lo}-{x_hi}, "
          f"{frames} frames, plays once", flush=True)


def make_scene_renderer(key: str):
    def render() -> None:
        spec = SCENE_LOOPS[key]
        with Image.open(PIXEL / spec["src"]) as im:
            if im.size != (W, H):
                raise ValueError(f"{spec['src']}: expected {W}x{H}, got {im.size}")
            base = np.asarray(im.convert("RGB"), dtype=np.float32)

        masks, kept = practical_lights(base, spec)
        lit = int(kept.sum())
        if lit < 200:
            raise RuntimeError(
                f"{key}: only {lit} lit pixels found — the detector missed the lamps, "
                "so this would ship as a still. Adjust min_lum/max_blob."
            )
        print(f"  {key}: {len(masks)} phase groups over {lit} lit pixels", flush=True)

        # Each lamp glows in its OWN colour, taken from the artwork, so nothing is tinted.
        colour = base * kept[..., None]

        enc = Encoder(OUTPUTS[key])
        for f in range(LOOP_FRAMES):
            frame = base.copy()
            for i, mask in enumerate(masks):
                amp = spec["gain"] * (pulse(f, phase=i * 2 * math.pi / len(masks),
                                            harmonic=0.6 + i) - 0.5)
                frame = add(frame, colour * mask, amp)
            enc.write(frame)
        enc.close()
    return render


RENDERERS = {
    "hall": render_hall,
    "approach": render_approach,
    "title": render_title,
    "desk": render_desk,
    "directory": render_directory,
    "swirl": render_swirl,
    "first_transition": render_first_transition,
    "hedy_signal": render_hedy_signal,
    **{key: make_scene_renderer(key) for key in SCENE_LOOPS},
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "assets", nargs="*", choices=sorted(RENDERERS),
        help="assets to render (default: all)",
    )
    args = parser.parse_args()
    selected = args.assets or list(RENDERERS)
    if not FFMPEG.exists():
        raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
    for key in selected:
        print(f"rendering {key}: {OUTPUTS[key]}", flush=True)
        RENDERERS[key]()
    print("done", flush=True)


if __name__ == "__main__":
    main()
