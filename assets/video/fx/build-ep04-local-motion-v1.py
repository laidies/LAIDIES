#!/usr/bin/env python3
"""Build protected, local-motion replacements for EP04's failed AI clips.

The rejected clips regenerated 24–87% of each illustration. These replacements
never move the camera or synthesize new character pixels. They animate only
named screens, windows, practical lights, snow, or photo-wall highlights, then
restore the original human foreground from reusable segmentation masks.

Outputs are new versioned files beside the approved source frames. Existing
files are never overwritten.
"""

from __future__ import annotations

import hashlib
import json
import math
import subprocess
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[3]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
MASKS = ROOT / "operations/video-qa/episode-04-local-motion-masks-v1"
QA = ROOT / "operations/video-qa/episode-04-local-motion-v1"
MANIFEST = QA / "manifest.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
SECONDS = 5.0
FRAMES = round(SECONDS * FPS)
GROUP_COUNT = 32
PATTERN_SLOTS = 10


@dataclass(frozen=True)
class Job:
    cue: int
    source: str
    output: str
    effects: tuple[str, ...]
    person_mask: bool = False
    regions: dict[str, tuple[tuple[int, int], ...]] = field(default_factory=dict)
    mode: str = "loop"
    note: str = ""


def rect(x1: int, y1: int, x2: int, y2: int) -> tuple[tuple[int, int], ...]:
    return ((x1, y1), (x2, y1), (x2, y2), (x1, y2))


JOBS = [
    Job(
        4,
        "ep04-open-05-unease-comic-v1-face-lock-1920.png",
        "ep04-cue04-local-motion-v1.mp4",
        ("screen", "rain"),
        True,
        {"screen": rect(0, 75, 650, 870), "window": rect(650, 0, 1920, 1080)},
        note="chat screen breathes; rain remains behind the protected heroine",
    ),
    Job(
        5,
        "ep04-open-06-thinking-closeup-comic-v1-face-lock-1920.png",
        "ep04-cue05-local-motion-v1.mp4",
        ("screen", "rain"),
        True,
        {"screen": rect(0, 80, 510, 1080), "window": rect(1180, 0, 1920, 1080)},
        note="screen and distant rainy window only",
    ),
    Job(
        7,
        "ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png",
        "ep04-cue07-local-motion-v1.mp4",
        ("indicators",),
        regions={"lights": rect(0, 0, 1920, 1080)},
        note="source-size storefront, streetlamp, radio and van lights",
    ),
    Job(
        9,
        "ep04-open-10-car-engine-comic-v5-comic-question-mark-1920.png",
        "ep04-cue09-headlight-event-v1.mp4",
        ("headlight",),
        True,
        {"headlight": ((1430, 795), (1920, 745), (1920, 1080), (1340, 1080))},
        mode="event",
        note="headlight wakes once, then holds; heroine remains source-pixel exact",
    ),
    Job(
        12,
        "ep04-open-13-just-use-internet-comic-v2-clean-counter-no-sign-1920.png",
        "ep04-cue12-local-motion-v1.mp4",
        ("screen", "indicators"),
        regions={
            "screen": ((835, 120), (1550, 165), (1515, 735), (870, 690)),
            "lights": rect(760, 675, 1190, 915),
        },
        note="CRT breathes and modem indicators blink",
    ),
    Job(
        13,
        "ep04-open-14-question-hangs-comic-v1-face-lock-1920.png",
        "ep04-cue13-local-motion-v1.mp4",
        ("screen", "rain"),
        True,
        {"screen": rect(0, 640, 700, 1080), "window": rect(820, 0, 1920, 1080)},
        note="question holds; only screen and rain move",
    ),
    Job(
        17,
        "ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png",
        "ep04-cue17-local-motion-v1.mp4",
        ("warm_lights",),
        True,
        {"lights": rect(0, 260, 1920, 1080)},
        note="candles and practical lamps lead into the locked London time-jump",
    ),
    Job(
        22,
        "ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png",
        "ep04-cue22-local-motion-v1.mp4",
        ("warm_lights",),
        True,
        {"lights": rect(0, 0, 1920, 1080)},
        note="studio and vanity bulbs flicker; Hedy is restored untouched",
    ),
    Job(
        26,
        "ep04-comicpage-eniac-models-comic-v2-barnes-1920.png",
        "ep04-cue26-credit-reveal-event-v1.mp4",
        ("credit_reveal",),
        True,
        {
            "caption": rect(5, 5, 585, 225),
            "men": rect(0, 600, 970, 800),
            "women": rect(900, 930, 1920, 1080),
        },
        mode="event",
        note="credit labels resolve once without warping either archival panel",
    ),
    Job(
        28,
        "ep04-scene-05-grace-a-start-comic-v1-locked-1920.png",
        "ep04-cue28-local-motion-v1.mp4",
        ("indicators",),
        True,
        {"lights": rect(1350, 250, 1920, 900)},
        note="office-machine indicators only; both figures are protected",
    ),
    Job(
        29,
        "ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png",
        "ep04-scene-05-grace-b-mid-comic-v1-locked-1920-loop-v2.mp4",
        ("indicators",),
        True,
        {"lights": rect(0, 0, 1920, 1080)},
        note="replaces v1 so Grace's hand remains completely static",
    ),
    Job(
        36,
        "ep04-scene-07-ai-winter-comic-v1-fresh-1920.png",
        "ep04-cue36-monitor-dies-event-v1.mp4",
        ("monitor_dies", "snow"),
        regions={
            "screen": rect(850, 430, 1140, 690),
            "window": rect(1080, 0, 1920, 650),
        },
        mode="event",
        note="the remaining monitor flickers and dies while snow continues",
    ),
    Job(
        37,
        "ep04-scene-07-ai-winter-c-end-comic-v1-locked-1920.png",
        "ep04-cue37-local-motion-v1.mp4",
        ("snow",),
        regions={"window": rect(1060, 0, 1920, 680)},
        note="empty dark room; snow beyond the windows only",
    ),
    Job(
        40,
        "ep04-scene-08-karen-c-end-comic-v1-locked-1920.png",
        "ep04-cue40-local-motion-v1.mp4",
        ("green_screen", "rain"),
        True,
        {
            "screen": ((430, 360), (920, 330), (970, 785), (410, 815)),
            "window": rect(1330, 0, 1920, 760),
        },
        note="CRT breathes and rain stays behind Karen",
    ),
    Job(
        44,
        "ep04-scene-09-fei-fei-comic-v2-timnit-style-lock-1920.png",
        "ep04-cue44-local-motion-v1.mp4",
        ("photo_wall",),
        True,
        {"wall": ((0, 0), (1040, 0), (1130, 790), (0, 1080))},
        note="a narrow highlight travels across the image wall; Fei-Fei is static",
    ),
    Job(
        47,
        "ep04-scene-11a-joy-comic-v2-timnit-style-lock-1920.png",
        "ep04-cue47-local-motion-v1.mp4",
        ("screen", "scan"),
        True,
        {"screen": rect(1210, 90, 1920, 820)},
        note="analysis displays pulse and scan behind protected Joy",
    ),
    Job(
        48,
        "ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png",
        "ep04-cue48-local-motion-v1.mp4",
        ("screen", "alarm"),
        True,
        {
            "screen": rect(0, 330, 710, 805),
            "alarm": rect(0, 790, 430, 1080),
        },
        note="model report and physical alert pulse; Timnit remains exact",
    ),
    Job(
        49,
        "ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png",
        "ep04-cue49-local-motion-v1.mp4",
        ("hologram",),
        True,
        {"hologram": rect(760, 60, 1540, 950)},
        note="holographic parrot and word blocks breathe; Emily remains exact",
    ),
]


def load_rgb(path: Path) -> np.ndarray:
    with Image.open(path) as image:
        if image.size != (W, H):
            raise ValueError(f"{path.name}: expected {W}x{H}, got {image.size}")
        return np.asarray(image.convert("RGB"), dtype=np.float32)


def polygon_mask(points: tuple[tuple[int, int], ...], blur: float = 0.0) -> np.ndarray:
    image = Image.new("L", (W, H), 0)
    ImageDraw.Draw(image).polygon(points, fill=255)
    if blur:
        image = image.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(image, dtype=np.float32) / 255.0


def person_mask(job: Job) -> np.ndarray:
    if not job.person_mask:
        return np.zeros((H, W), dtype=np.float32)
    path = MASKS / f"cue-{job.cue:02d}-people-mask.png"
    if not path.is_file():
        raise FileNotFoundError(path)
    raw = np.asarray(Image.open(path).convert("L"), dtype=np.float32) / 255.0
    value = np.clip((raw - 0.20) / 0.20, 0.0, 1.0)
    value = value * value * (3.0 - 2.0 * value)
    value = cv2.dilate(
        np.round(value * 255.0).astype(np.uint8),
        np.ones((5, 5), dtype=np.uint8),
        iterations=1,
    ).astype(np.float32) / 255.0
    return cv2.GaussianBlur(value, (0, 0), 1.1)


def screen_tint(
    frame: np.ndarray,
    mask: np.ndarray,
    color: tuple[float, float, float],
    amount: float,
) -> np.ndarray:
    alpha = mask[..., None] * amount
    tint = np.asarray(color, dtype=np.float32)[None, None, :]
    if amount >= 0:
        return np.clip(frame * (1.0 - alpha) + tint * alpha, 0.0, 255.0)
    return np.clip(frame * (1.0 + alpha), 0.0, 255.0)


def screen_glow(
    base: np.ndarray,
    points: tuple[tuple[int, int], ...],
    seconds: float,
    color: tuple[float, float, float] = (22.0, 198.0, 222.0),
    phase: float = 0.0,
) -> np.ndarray:
    mask = polygon_mask(points, 4.0)
    breathe = math.sin(2.0 * math.pi * seconds / SECONDS + phase)
    return screen_tint(base, mask, color, 0.035 + 0.030 * breathe)


def restore_people(frame: np.ndarray, base: np.ndarray, people: np.ndarray) -> np.ndarray:
    return frame * (1.0 - people[..., None]) + base * people[..., None]


def particle_overlay(
    cue: int,
    seconds: float,
    region: np.ndarray,
    *,
    snow: bool,
) -> np.ndarray:
    rng = np.random.default_rng(cue * 1709 + (1 if snow else 2))
    overlay = np.zeros((H, W, 3), dtype=np.float32)
    count = 72 if snow else 38
    interval = H + 180
    for index in range(count):
        x0 = rng.uniform(0, W)
        y0 = rng.uniform(-90, H + 90)
        cycles = int(rng.integers(1, 4))
        speed = interval * cycles / SECONDS
        y = int((y0 + speed * seconds + 90) % interval - 90)
        x = int(x0 + (8.0 if snow else -24.0) * math.sin(
            2.0 * math.pi * seconds / SECONDS + index
        ))
        if snow:
            radius = int(rng.integers(1, 4))
            cv2.circle(overlay, (x, y), radius, (188, 211, 232), -1, cv2.LINE_AA)
        else:
            length = int(rng.integers(22, 55))
            cv2.line(
                overlay,
                (x, y),
                (x - 8, y + length),
                (125, 190, 226),
                1,
                cv2.LINE_AA,
            )
    return overlay * region[..., None] * (0.28 if snow else 0.24)


def detect_indicators(
    base: np.ndarray,
    allow: np.ndarray,
    people: np.ndarray,
    *,
    warm: bool,
    seed: int,
) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, int]:
    hsv = cv2.cvtColor(base.astype(np.uint8), cv2.COLOR_RGB2HSV)
    if warm:
        candidate = (
            (base[..., 0] >= 128)
            & (base[..., 1] >= 58)
            & (base[..., 2] <= 175)
            & ((base[..., 0] - base[..., 2]) >= 32)
        )
    else:
        candidate = (hsv[..., 1] >= 72) & (hsv[..., 2] >= 126)
    candidate &= (allow >= 0.50) & (people < 0.08)

    count, labels, stats, centroids = cv2.connectedComponentsWithStats(
        candidate.astype(np.uint8), connectivity=8
    )
    core = np.zeros((H, W), dtype=np.float32)
    groups = np.zeros((H, W), dtype=np.uint8)
    accepted = 0
    for label in range(1, count):
        x, y, width, height, area = stats[label]
        max_area = 1500 if warm else 260
        max_side = 55 if warm else 28
        if not 2 <= area <= max_area or width > max_side or height > max_side:
            continue
        cx, cy = centroids[label]
        component = labels == label
        group = (
            int(round(cx)) * 37
            + int(round(cy)) * 61
            + int(cx // 31) * 17
        ) % GROUP_COUNT
        core[component] = 1.0
        groups[component] = group
        accepted += 1

    rng = np.random.default_rng(seed)
    states = (rng.random((GROUP_COUNT, PATTERN_SLOTS)) < 0.48).astype(np.float32)
    offsets = rng.uniform(0.0, SECONDS / PATTERN_SLOTS, GROUP_COUNT)
    return core, groups, states, offsets, accepted


def blink_amounts(seconds: float, states: np.ndarray, offsets: np.ndarray) -> np.ndarray:
    slot_seconds = SECONDS / PATTERN_SLOTS
    amounts = np.zeros(GROUP_COUNT, dtype=np.float32)
    for group in range(GROUP_COUNT):
        position = ((seconds + offsets[group]) % SECONDS) / slot_seconds
        index = int(math.floor(position)) % PATTERN_SLOTS
        fraction = position - math.floor(position)
        previous = states[group, (index - 1) % PATTERN_SLOTS]
        current = states[group, index]
        if fraction < 0.24 and previous != current:
            mix = fraction / 0.24
            mix = mix * mix * (3.0 - 2.0 * mix)
            amounts[group] = previous * (1.0 - mix) + current * mix
        else:
            amounts[group] = current
    return amounts


def indicator_frame(
    base: np.ndarray,
    core: np.ndarray,
    groups: np.ndarray,
    states: np.ndarray,
    offsets: np.ndarray,
    seconds: float,
) -> np.ndarray:
    amount = blink_amounts(seconds, states, offsets)[groups] * core
    off = base * (1.0 - core[..., None] * 0.34)
    on = np.clip(base * 1.28 + np.array([20.0, 12.0, 3.0]), 0.0, 255.0)
    return off * (1.0 - amount[..., None]) + on * amount[..., None]


class Encoder:
    def __init__(self, output: Path):
        if output.exists():
            raise FileExistsError(f"Refusing to overwrite local-motion asset: {output}")
        command = [
            str(FFMPEG),
            "-n",
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
            "-r",
            str(FPS),
            "-movflags",
            "+faststart",
            str(output),
        ]
        self.process = subprocess.Popen(command, stdin=subprocess.PIPE)
        assert self.process.stdin is not None

    def write(self, frame: np.ndarray) -> None:
        assert self.process.stdin is not None
        self.process.stdin.write(
            np.clip(frame, 0.0, 255.0).astype(np.uint8).tobytes()
        )

    def close(self) -> None:
        assert self.process.stdin is not None
        self.process.stdin.close()
        if self.process.wait() != 0:
            raise RuntimeError("ffmpeg encode failed")


def prepare(job: Job, base: np.ndarray, people: np.ndarray) -> dict[str, object]:
    prepared: dict[str, object] = {}
    for name, points in job.regions.items():
        prepared[name] = polygon_mask(points, 3.0)
    if "indicators" in job.effects or "warm_lights" in job.effects:
        allow = prepared["lights"]
        assert isinstance(allow, np.ndarray)
        prepared["indicator_data"] = detect_indicators(
            base,
            allow,
            people,
            warm="warm_lights" in job.effects,
            seed=job.cue * 1997,
        )
    return prepared


def frame_for(
    job: Job,
    base: np.ndarray,
    people: np.ndarray,
    prepared: dict[str, object],
    seconds: float,
) -> np.ndarray:
    frame = base.copy()
    if "screen" in job.effects:
        frame = screen_glow(
            frame,
            job.regions["screen"],
            seconds,
            (38.0, 191.0, 220.0),
            job.cue * 0.31,
        )
    if "green_screen" in job.effects:
        frame = screen_glow(
            frame,
            job.regions["screen"],
            seconds,
            (72.0, 220.0, 92.0),
            0.5,
        )
    if "rain" in job.effects:
        window = prepared["window"]
        assert isinstance(window, np.ndarray)
        frame = np.clip(
            frame + particle_overlay(job.cue, seconds, window, snow=False),
            0.0,
            255.0,
        )
    if "snow" in job.effects:
        window = prepared["window"]
        assert isinstance(window, np.ndarray)
        frame = np.clip(
            frame + particle_overlay(job.cue, seconds, window, snow=True),
            0.0,
            255.0,
        )
    if "indicators" in job.effects or "warm_lights" in job.effects:
        core, groups, states, offsets, _accepted = prepared["indicator_data"]
        frame = indicator_frame(frame, core, groups, states, offsets, seconds)
    if "headlight" in job.effects:
        mask = prepared["headlight"]
        assert isinstance(mask, np.ndarray)
        progress = np.clip((seconds - 0.45) / 1.05, 0.0, 1.0)
        progress = progress * progress * (3.0 - 2.0 * progress)
        frame = screen_tint(frame, mask, (255.0, 230.0, 155.0), 0.17 * progress)
    if "credit_reveal" in job.effects:
        progress = np.clip((seconds - 0.40) / 2.1, 0.0, 1.0)
        progress = progress * progress * (3.0 - 2.0 * progress)
        combined = np.maximum.reduce(
            [prepared["caption"], prepared["men"], prepared["women"]]
        )
        frame = frame * (1.0 - combined[..., None] * (1.0 - progress) * 0.68)
    if "monitor_dies" in job.effects:
        screen = prepared["screen"]
        assert isinstance(screen, np.ndarray)
        flicker = 0.55 + 0.45 * math.sin(seconds * 17.0) ** 2
        fade = 1.0 - np.clip((seconds - 1.45) / 1.30, 0.0, 1.0)
        frame = frame * (
            1.0 - screen[..., None] * (1.0 - (0.12 + 0.88 * flicker * fade))
        )
    if "photo_wall" in job.effects:
        wall = prepared["wall"]
        assert isinstance(wall, np.ndarray)
        yy, xx = np.mgrid[0:H, 0:W]
        centre = -220.0 + (W + 440.0) * seconds / SECONDS
        band = np.exp(-((xx - centre - 0.25 * yy) / 48.0) ** 2)
        frame = screen_tint(
            frame,
            wall * band.astype(np.float32),
            (255.0, 240.0, 194.0),
            0.12,
        )
    if "scan" in job.effects:
        screen = prepared["screen"]
        assert isinstance(screen, np.ndarray)
        yy = np.arange(H, dtype=np.float32)[:, None]
        centre = H * seconds / SECONDS
        band = np.exp(-((yy - centre) / 20.0) ** 2)
        frame = screen_tint(
            frame,
            screen * band,
            (72.0, 225.0, 196.0),
            0.13,
        )
    if "alarm" in job.effects:
        alarm = prepared["alarm"]
        assert isinstance(alarm, np.ndarray)
        pulse = 0.5 + 0.5 * math.sin(2.0 * math.pi * seconds / 1.25)
        frame = screen_tint(
            frame,
            alarm,
            (255.0, 34.0, 24.0),
            0.025 + 0.08 * pulse,
        )
    if "hologram" in job.effects:
        hologram = prepared["hologram"]
        assert isinstance(hologram, np.ndarray)
        breathe = 0.5 + 0.5 * math.sin(2.0 * math.pi * seconds / SECONDS)
        frame = screen_tint(
            frame,
            hologram,
            (62.0, 193.0, 255.0),
            0.025 + 0.055 * breathe,
        )
        yy = np.arange(H, dtype=np.float32)[:, None]
        centre = H * seconds / SECONDS
        band = np.exp(-((yy - centre) / 18.0) ** 2)
        frame = screen_tint(
            frame,
            hologram * band,
            (150.0, 235.0, 255.0),
            0.13,
        )
    return restore_people(frame, base, people)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def render(job: Job) -> dict[str, object]:
    source = PIXEL / job.source
    output = PIXEL / job.output
    if not source.is_file():
        raise FileNotFoundError(source)
    base = load_rgb(source)
    people = person_mask(job)
    prepared = prepare(job, base, people)

    encoder = Encoder(output)
    minimum = np.full((H, W, 3), 255, dtype=np.uint8)
    maximum = np.zeros((H, W, 3), dtype=np.uint8)
    for frame_number in range(FRAMES):
        seconds = frame_number / FPS
        frame = frame_for(job, base, people, prepared, seconds)
        encoded = np.clip(frame, 0.0, 255.0).astype(np.uint8)
        minimum = np.minimum(minimum, encoded)
        maximum = np.maximum(maximum, encoded)
        encoder.write(encoded)
    encoder.close()

    travel = (maximum.astype(np.float32) - minimum.astype(np.float32)).mean(axis=2)
    heat = np.clip(travel * 7.0, 0.0, 255.0).astype(np.uint8)
    preview = base.astype(np.uint8).copy()
    preview[..., 0] = np.clip(
        preview[..., 0].astype(np.int16) + heat.astype(np.int16), 0, 255
    ).astype(np.uint8)
    preview[..., 1] = np.clip(
        preview[..., 1].astype(np.int16) - heat.astype(np.int16) // 2, 0, 255
    ).astype(np.uint8)
    preview[..., 2] = np.clip(
        preview[..., 2].astype(np.int16) - heat.astype(np.int16) // 2, 0, 255
    ).astype(np.uint8)
    QA.mkdir(parents=True, exist_ok=True)
    heatmap = QA / f"cue-{job.cue:02d}-motion-heatmap.jpg"
    Image.fromarray(preview).save(heatmap, quality=92)

    indicator_count = None
    if "indicator_data" in prepared:
        indicator_count = int(prepared["indicator_data"][4])
        if indicator_count < 4:
            raise RuntimeError(
                f"cue {job.cue}: only {indicator_count} practical lights detected"
            )
    return {
        "cue": job.cue,
        "source": str(source.relative_to(ROOT)),
        "source_sha256": sha256(source),
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "output_bytes": output.stat().st_size,
        "mode": job.mode,
        "effects": list(job.effects),
        "note": job.note,
        "indicator_components": indicator_count,
        "heatmap": str(heatmap.relative_to(ROOT)),
        "peak_travel": round(float(travel.max()), 3),
        "moved_percent_16_levels": round(float((travel >= 16.0).mean() * 100.0), 4),
    }


def build_contact_sheet(records: list[dict[str, object]]) -> Path:
    tile_w, tile_h = 480, 270
    columns = 3
    rows = math.ceil(len(records) / columns)
    sheet = Image.new("RGB", (tile_w * columns, (tile_h + 34) * rows), (14, 9, 19))
    draw = ImageDraw.Draw(sheet)
    for index, record in enumerate(records):
        path = ROOT / str(record["heatmap"])
        image = Image.open(path).convert("RGB").resize(
            (tile_w, tile_h), Image.Resampling.LANCZOS
        )
        x = index % columns * tile_w
        y = index // columns * (tile_h + 34)
        sheet.paste(image, (x, y + 34))
        draw.text(
            (x + 6, y + 9),
            f"cue {record['cue']} · red = motion · {record['moved_percent_16_levels']}%",
            fill=(255, 255, 255),
        )
    output = QA / "episode-04-local-motion-heatmaps-v1.jpg"
    sheet.save(output, quality=93)
    return output


def verify_decode(output: Path) -> None:
    result = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(output),
            "-f",
            "null",
            "-",
        ],
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"Decode verification failed: {output}")


def main() -> None:
    if not FFMPEG.is_file():
        raise FileNotFoundError(FFMPEG)
    if MANIFEST.exists():
        raise FileExistsError(f"Refusing to overwrite manifest: {MANIFEST}")
    records = []
    for job in JOBS:
        print(f"rendering cue {job.cue}: {job.output}", flush=True)
        record = render(job)
        verify_decode(ROOT / str(record["output"]))
        records.append(record)
        print(
            f"  moved {record['moved_percent_16_levels']}% · "
            f"peak {record['peak_travel']}",
            flush=True,
        )
    contact_sheet = build_contact_sheet(records)
    manifest = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "standard": {"width": W, "height": H, "fps": FPS, "seconds": SECONDS},
        "policy": {
            "camera_motion": False,
            "human_pixels_restored": True,
            "whole_frame_generation": False,
            "approved_originals_overwritten": False,
        },
        "records": records,
        "contact_sheet": str(contact_sheet.relative_to(ROOT)),
    }
    QA.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(contact_sheet)
    print(MANIFEST)


if __name__ == "__main__":
    main()
