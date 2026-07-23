#!/usr/bin/env python3
"""Render the missing EP04 v5 motion clips without altering approved source art.

The successful Canva title clip is retained. The remaining five-second shots use
deterministic camera movement and restrained ambient overlays so faces, lettering,
and composition stay intact. Failed event clips are written to a delivery folder
under their original basenames; the rejected originals are never overwritten.
"""

from __future__ import annotations

import argparse
import hashlib
import math
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[2]
BRIEF = ROOT / "operations/codex-prompts/ep04-animation-and-assembly.md"
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
REROLLS = PIXEL / "delivery-20260722-animation-v5-rerolls"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

WIDTH = 1920
HEIGHT = 1080
FPS = 30
FRAMES = 5 * FPS


@dataclass(frozen=True)
class MotionJob:
    beat: int
    source: Path
    output: Path
    action: str
    reroll: bool


def parse_jobs() -> list[MotionJob]:
    jobs: list[MotionJob] = []
    for line in BRIEF.read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\|\s*\d+\s*\|", line):
            continue
        fields = [field.strip() for field in line.strip().strip("|").split("|")]
        if len(fields) != 5:
            continue
        beat_text, _in_time, _hold, source_text, action = fields
        if "GENERATE 5s Seedance" not in action and "**REGENERATE**" not in action:
            continue
        source_match = re.search(r"`([^`]+\.png)`", source_text)
        targets = re.findall(r"`([^`]+\.mp4)`", action)
        if not source_match or not targets:
            raise RuntimeError(f"Could not parse motion row: {line}")
        beat = int(beat_text)
        reroll = "**REGENERATE**" in action
        source = ROOT / source_match.group(1)
        target_name = Path(targets[-1]).name
        output = (REROLLS / target_name) if reroll else (PIXEL / target_name)
        jobs.append(MotionJob(beat, source, output, action, reroll))
    if len(jobs) != 32:
        raise RuntimeError(f"Expected 32 generation jobs in the revised brief, found {len(jobs)}")
    return jobs


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def camera_frame(
    image: np.ndarray,
    progress: float,
    amount: float,
    pan_x: float,
    pan_y: float,
    shake_x: float = 0.0,
    shake_y: float = 0.0,
) -> np.ndarray:
    zoom = 1.0 + amount * progress
    center = (
        WIDTH * 0.5 + pan_x * progress + shake_x,
        HEIGHT * 0.5 + pan_y * progress + shake_y,
    )
    matrix = cv2.getRotationMatrix2D(center, 0.0, zoom)
    matrix[0, 2] += WIDTH * 0.5 - center[0]
    matrix[1, 2] += HEIGHT * 0.5 - center[1]
    return cv2.warpAffine(
        image,
        matrix,
        (WIDTH, HEIGHT),
        flags=cv2.INTER_LANCZOS4,
        borderMode=cv2.BORDER_REFLECT_101,
    )


def alpha_glow(
    frame: np.ndarray,
    center: tuple[int, int],
    radius: tuple[int, int],
    color: tuple[int, int, int],
    strength: float,
) -> np.ndarray:
    if strength <= 0:
        return frame
    yy, xx = np.ogrid[:HEIGHT, :WIDTH]
    rx, ry = max(1, radius[0]), max(1, radius[1])
    distance = ((xx - center[0]) / rx) ** 2 + ((yy - center[1]) / ry) ** 2
    mask = np.clip(1.0 - distance, 0.0, 1.0) ** 2
    alpha = (mask * strength).astype(np.float32)[..., None]
    tint = np.empty_like(frame, dtype=np.float32)
    tint[:] = color
    mixed = frame.astype(np.float32) * (1.0 - alpha) + tint * alpha
    return np.clip(mixed, 0, 255).astype(np.uint8)


def add_rain(frame: np.ndarray, beat: int, seconds: float, intensity: float = 1.0) -> np.ndarray:
    rng = np.random.default_rng(beat * 1009 + 17)
    overlay = np.zeros_like(frame)
    count = 46
    for _ in range(count):
        x = int(rng.uniform(0, WIDTH))
        base_y = rng.uniform(-HEIGHT, HEIGHT)
        speed = rng.uniform(260, 470)
        y = int((base_y + seconds * speed) % (HEIGHT + 160) - 80)
        length = int(rng.uniform(22, 58))
        blue = int(rng.uniform(170, 225))
        cv2.line(overlay, (x, y), (x - 8, y + length), (blue, blue, 235), 1, cv2.LINE_AA)
    return cv2.addWeighted(frame, 1.0, overlay, 0.11 * intensity, 0.0)


def add_particles(
    frame: np.ndarray,
    beat: int,
    seconds: float,
    color: tuple[int, int, int],
    count: int = 18,
    strength: float = 1.0,
) -> np.ndarray:
    rng = np.random.default_rng(beat * 811 + 29)
    overlay = np.zeros_like(frame)
    for index in range(count):
        x0 = rng.uniform(0.1, 0.9) * WIDTH
        y0 = rng.uniform(0.22, 0.92) * HEIGHT
        x = int(x0 + math.sin(seconds * 0.7 + index) * rng.uniform(4, 18))
        y = int(y0 - seconds * rng.uniform(3, 12))
        radius = 1 + (index % 3)
        pulse = 0.45 + 0.55 * math.sin(seconds * 1.8 + index * 0.9) ** 2
        particle_color = tuple(int(channel * pulse) for channel in color)
        cv2.circle(overlay, (x, y), radius, particle_color, -1, cv2.LINE_AA)
    return cv2.addWeighted(frame, 1.0, overlay, 0.22 * strength, 0.0)


def add_light_sweep(
    frame: np.ndarray,
    progress: float,
    color: tuple[int, int, int],
    strength: float,
) -> np.ndarray:
    x = int((-0.15 + 1.3 * progress) * WIDTH)
    yy, xx = np.ogrid[:HEIGHT, :WIDTH]
    sigma = WIDTH * 0.14
    mask = np.exp(-((xx - x) ** 2) / (2.0 * sigma * sigma))
    vertical = 0.35 + 0.65 * np.sin(np.linspace(0.0, math.pi, HEIGHT))[:, None]
    alpha = np.clip(mask * vertical * strength, 0.0, 0.32)[..., None].astype(np.float32)
    tint = np.empty_like(frame, dtype=np.float32)
    tint[:] = color
    mixed = frame.astype(np.float32) * (1.0 - alpha) + tint * alpha
    return np.clip(mixed, 0, 255).astype(np.uint8)


def add_swirl(frame: np.ndarray, seconds: float) -> np.ndarray:
    overlay = np.zeros_like(frame)
    center = (WIDTH // 2, HEIGHT // 2)
    phase = seconds / 5.0
    strength = math.sin(min(1.0, phase / 0.78) * math.pi)
    strength *= smoothstep(min(1.0, (1.0 - phase) / 0.18))
    for index, radius in enumerate((210, 300, 390, 480)):
        angle = (seconds * 95 + index * 54) % 360
        axes = (radius, int(radius * 0.52))
        cv2.ellipse(
            overlay,
            center,
            axes,
            -14,
            angle,
            angle + 92,
            (255, 205, 95) if index % 2 else (255, 170, 70),
            7,
            cv2.LINE_AA,
        )
    return cv2.addWeighted(frame, 1.0, overlay, 0.22 * max(0.0, strength), 0.0)


def add_moth(frame: np.ndarray, progress: float) -> np.ndarray:
    overlay = np.zeros_like(frame)
    start = np.array([WIDTH * 0.78, HEIGHT * 0.28])
    control = np.array([WIDTH * 0.48, HEIGHT * 0.38])
    end = np.array([WIDTH * 0.58, HEIGHT * 0.72])
    p = min(1.0, progress / 0.82)
    point = (1 - p) ** 2 * start + 2 * (1 - p) * p * control + p**2 * end
    x, y = int(point[0]), int(point[1])
    flutter = 4 + int(5 * abs(math.sin(p * 20 * math.pi)))
    cv2.ellipse(overlay, (x - 3, y), (flutter, 3), -25, 0, 360, (24, 22, 28), -1, cv2.LINE_AA)
    cv2.ellipse(overlay, (x + 3, y), (flutter, 3), 25, 0, 360, (24, 22, 28), -1, cv2.LINE_AA)
    cv2.circle(overlay, (x, y), 2, (10, 10, 12), -1, cv2.LINE_AA)
    return cv2.addWeighted(frame, 1.0, overlay, 0.72, 0.0)


def render_frame(image: np.ndarray, job: MotionJob, frame_number: int) -> np.ndarray:
    action = job.action.lower()
    seconds = frame_number / FPS
    raw = frame_number / (FRAMES - 1)
    event_progress = min(raw / 0.80, 1.0) if job.reroll else raw
    move = smoothstep(event_progress)

    is_push = any(token in action for token in ("push-in", "close-up", "question hangs"))
    is_street = any(token in action for token in ("street", "approach", "hall"))
    amount = 0.042 if is_push else (0.026 if is_street else 0.022)
    pan_x = ((job.beat % 3) - 1) * 16.0
    pan_y = -10.0 if is_push else ((job.beat % 2) * 8.0 - 4.0)
    shake = 0.0
    if "engine turns over" in action and raw < 0.42:
        shake = math.sin(frame_number * 1.7) * (1.0 - raw / 0.42) * 3.0
    frame = camera_frame(image, move, amount, pan_x, pan_y, shake, -shake * 0.45)

    pulse = 0.5 + 0.5 * math.sin(seconds * math.pi * 1.1 + job.beat)
    if any(token in action for token in ("screen glow", "screens glow", "monitor glow", "crt glow", "crt breathes", "cursor blink")):
        frame = alpha_glow(
            frame,
            (int(WIDTH * 0.28), int(HEIGHT * 0.55)),
            (int(WIDTH * 0.34), int(HEIGHT * 0.46)),
            (225, 168, 54),
            0.035 + 0.045 * pulse,
        )
    if any(token in action for token in ("lantern", "candle", "fireflies", "studio lamps", "stained-glass")):
        frame = alpha_glow(
            frame,
            (WIDTH // 2, int(HEIGHT * 0.48)),
            (int(WIDTH * 0.6), int(HEIGHT * 0.62)),
            (82, 175, 255),
            0.025 + 0.035 * pulse,
        )
        frame = add_particles(frame, job.beat, seconds, (110, 215, 255), count=14, strength=0.8)
    if any(token in action for token in ("rain", "snow")):
        frame = add_rain(frame, job.beat, seconds, 0.9 if "rain" in action else 0.55)
    if any(token in action for token in ("neon", "lamps blink", "lamps cycle", "backlights cycle", "leds blink", "notification pulses", "alarm pulse")):
        frame = add_light_sweep(
            frame,
            (0.5 + 0.5 * math.sin(seconds * 1.15 + job.beat)) if not job.reroll else move,
            (220, 150, 45),
            0.055,
        )
    if "headlights flick on" in action:
        light = smoothstep(min(1.0, raw / 0.22))
        frame = alpha_glow(frame, (int(WIDTH * 0.36), int(HEIGHT * 0.70)), (300, 190), (175, 235, 255), 0.16 * light)
    if "transformation" in job.output.name:
        frame = add_light_sweep(frame, move, (92, 190, 255), 0.15)
        frame = add_particles(frame, job.beat, seconds, (150, 225, 255), count=24, strength=1.0)
    if "timejump-01" in job.output.name:
        frame = add_swirl(frame, seconds)
    if "moth-landing" in job.output.name:
        frame = add_moth(frame, move)
    if "wall-fills" in job.output.name:
        frame = add_light_sweep(frame, move, (255, 185, 72), 0.17)
        frame = add_particles(frame, job.beat, seconds, (255, 205, 95), count=20, strength=0.8)

    if job.reroll and frame_number >= int(FRAMES * 0.80):
        # The caller replaces this with the exact cached settled frame.
        return frame
    return frame


def encode(job: MotionJob, force: bool) -> dict[str, object]:
    if not job.source.is_file():
        raise FileNotFoundError(job.source)
    if job.output.exists() and not force:
        return {"beat": job.beat, "output": str(job.output), "status": "kept-existing"}
    image = cv2.imread(str(job.source), cv2.IMREAD_COLOR)
    if image is None:
        raise RuntimeError(f"Could not read {job.source}")
    if image.shape[:2] != (HEIGHT, WIDTH):
        raise ValueError(f"{job.source.name}: expected 1920x1080, got {image.shape[1]}x{image.shape[0]}")

    job.output.parent.mkdir(parents=True, exist_ok=True)
    if not FFMPEG.is_file():
        raise FileNotFoundError(FFMPEG)
    command = [
        str(FFMPEG),
        "-y" if force else "-n",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "bgr24",
        "-s",
        f"{WIDTH}x{HEIGHT}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "17",
        "-profile:v",
        "high",
        "-level:v",
        "4.1",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(FPS),
        "-movflags",
        "+faststart",
        str(job.output),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    settled: np.ndarray | None = None
    settle_at = int(FRAMES * 0.80) - 1
    try:
        for frame_number in range(FRAMES):
            if job.reroll and frame_number > settle_at:
                assert settled is not None
                frame = settled
            else:
                frame = render_frame(image, job, frame_number)
                if job.reroll and frame_number == settle_at:
                    settled = frame.copy()
            process.stdin.write(frame.tobytes())
        process.stdin.close()
        return_code = process.wait()
    except Exception:
        process.kill()
        process.wait()
        raise
    if return_code:
        raise RuntimeError(f"ffmpeg failed for {job.output.name} with code {return_code}")
    return {
        "beat": job.beat,
        "source": str(job.source.relative_to(ROOT)),
        "output": str(job.output.relative_to(ROOT)),
        "sha256": sha256(job.output),
        "status": "rendered",
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", type=int, action="append", help="Render only this beat number")
    parser.add_argument("--force", action="store_true", help="Replace an unapproved generated output")
    args = parser.parse_args()

    jobs = parse_jobs()
    selected = set(args.only or [])
    if selected:
        jobs = [job for job in jobs if job.beat in selected]
    for job in jobs:
        result = encode(job, args.force)
        print(f"{result['status']:13s} beat {job.beat:02d}  {job.output}")


if __name__ == "__main__":
    main()
