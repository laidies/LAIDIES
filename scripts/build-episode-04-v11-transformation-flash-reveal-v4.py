#!/usr/bin/env python3
"""Build a reusable hard-matte cloud/flash/reveal transformation pilot."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFilter


SOURCE_ROOT = Path("/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/assets/episodes/ep-04/pixel")
WORKTREE = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
DELIVERY = WORKTREE / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
OUTPUT = DELIVERY / "episode-04-v11-transformation-flash-reveal-v4-pilot.mp4"
MANIFEST = DELIVERY / "episode-04-v11-transformation-flash-reveal-v4-pilot-manifest.json"
CONTACT = DELIVERY / "episode-04-v11-transformation-flash-reveal-v4-pilot-contact-sheet.jpg"
SWITCH = DELIVERY / "episode-04-v11-transformation-flash-reveal-v4-switch-contact-sheet.jpg"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
FPS = 30
FRAME_COUNT = 156

SOURCES = [
    ("corporate", "ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png", "fd75dfdd13e3fb82cf5d7851e60a8bc788f9e177e59d673eac6f5c0c90fe990e"),
    ("cloud", "ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png", "9269f94f1ecfb0a0a4fbe2ed1d604c2046d8357a57cb25c3bf73b934fcd67f0a"),
    ("reveal", "ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png", "b6a92dfa1ac46db9e14ff31d1218fe8fc93488df16caf37c835b63dc25174d7d"),
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def ease(value: float) -> float:
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


LOBES = [
    (960, 900, 315), (680, 855, 275), (1240, 855, 275),
    (790, 650, 270), (1130, 650, 270), (960, 600, 325),
    (810, 405, 250), (1110, 405, 250), (960, 250, 230),
    (610, 675, 185), (1310, 675, 185), (960, 1035, 265),
]


def growth_mask(size: tuple[int, int], progress: float) -> Image.Image:
    """A hard organic wipe: never alpha-blend the two character plates."""
    width, height = size
    progress = ease(progress)
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    for index, (cx, cy, radius) in enumerate(LOBES):
        stagger = max(0.0, min(1.0, progress * 1.22 - index * 0.018))
        current = max(1, round(radius * ease(stagger)))
        draw.ellipse((cx - current, cy - current, cx + current, cy + current), fill=255)
    # One-pixel softness suppresses stair-stepping without creating ghost figures.
    return mask.filter(ImageFilter.GaussianBlur(1.0))


def clearing_mask(size: tuple[int, int], progress: float) -> Image.Image:
    """Clear from the shoes upward after the flash, then collapse the cloud."""
    width, height = size
    remaining = growth_mask(size, 1.0 - progress)
    pixels = remaining.load()
    clear_line = int(height + 120 - ease(progress) * (height + 240))
    feather = 36
    for y in range(height):
        if y >= clear_line:
            vertical = max(0, min(255, int(255 * (clear_line + feather - y) / feather)))
            for x in range(width):
                pixels[x, y] = min(pixels[x, y], vertical)
    return remaining


def flash_frame(base: Image.Image, strength: float) -> Image.Image:
    """A full-frame comic flash hides the exact endpoint swap."""
    white = Image.new("RGB", base.size, "#fffdf7")
    return Image.blend(base, white, ease(strength))


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    plates: list[Image.Image] = []
    source_records = []
    for label, filename, expected in SOURCES:
        path = SOURCE_ROOT / filename
        observed = sha256(path)
        if observed != expected:
            raise SystemExit(f"SOURCE DRIFT {filename}: {observed} != {expected}")
        plates.append(Image.open(path).convert("RGB"))
        source_records.append({"label": label, "path": str(path), "sha256": observed})
    corporate, cloud, reveal = plates
    if len({plate.size for plate in plates}) != 1:
        raise SystemExit("GEOMETRY MISMATCH")

    full = growth_mask(corporate.size, 1.0)
    covered_corporate = Image.composite(cloud, corporate, full)
    covered_reveal = Image.composite(cloud, reveal, full)

    with tempfile.TemporaryDirectory(prefix="ep04-transformation-v4-") as temp_name:
        temp = Path(temp_name)
        for index in range(FRAME_COUNT):
            if index < 18:
                frame = corporate
            elif index < 66:
                frame = Image.composite(cloud, corporate, growth_mask(corporate.size, (index - 18) / 47))
            elif index < 72:
                frame = covered_corporate
            elif index < 77:
                frame = flash_frame(covered_corporate, (index - 71) / 5)
            elif index < 82:
                # The base swaps only while the frame is fully white.
                frame = flash_frame(covered_reveal, (81 - index) / 5)
            elif index < 132:
                frame = Image.composite(cloud, reveal, clearing_mask(corporate.size, (index - 82) / 49))
            else:
                frame = reveal
            frame.save(temp / f"frame-{index:04d}.png")

        subprocess.run([
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-framerate", str(FPS), "-i", str(temp / "frame-%04d.png"),
            "-frames:v", str(FRAME_COUNT), "-an", "-c:v", "libx264", "-preset", "slow",
            "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
        ], check=True)

    decoded_frames, seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded_frames != FRAME_COUNT or abs(seconds - FRAME_COUNT / FPS) > 1 / FPS:
        raise SystemExit(f"CLOCK FAIL frames={decoded_frames} seconds={seconds}")
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "fps=6,scale=480:270,tile=8x4", "-frames:v", "1", str(CONTACT)], check=True)
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "select='between(n,64,92)',scale=480:270,tile=6x5", "-vsync", "0", "-frames:v", "1", str(SWITCH)], check=True)

    record = {
        "status": "BUILT_LOCALLY_INTERNAL_PILOT_NOT_RELEASE_AUTHORITY",
        "job": "Reusable provider-independent corporate-to-SUNNYVAiLE outfit transformation",
        "mechanism": "Exact approved cloud plate grows over the corporate endpoint; a five-frame full-screen flash hides the hard endpoint swap; the cloud clears from the shoes upward over the exact approved reveal endpoint.",
        "predecessors": [
            {"version": "v1", "verdict": "HOLD", "reason": "cross-dissolved doubled figures"},
            {"version": "v2", "verdict": "HOLD", "reason": "pixel destruction, exposed shoes, rectangular matte"},
            {"version": "v3", "verdict": "INTERNAL_REJECT", "reason": "invented flat cloud patch looked pasted onto approved art"},
        ],
        "sources": source_records,
        "clock": {"fps": FPS, "frames": decoded_frames, "seconds": seconds},
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT)},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "switchContactSheet": {"path": str(SWITCH), "sha256": sha256(SWITCH)},
        "constraints": ["no paid video provider", "no generated replacement art", "no cross-dissolved people", "no SUNNYVAiLE background", "no wand", "silent visual pilot only"],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
