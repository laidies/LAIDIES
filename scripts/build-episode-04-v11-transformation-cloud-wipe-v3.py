#!/usr/bin/env python3
"""Build the reusable no-provider LAiDIES transformation cloud-wipe shell."""

from __future__ import annotations

import hashlib
import json
import math
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFilter


SOURCE_ROOT = Path(
    "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/"
    "Website-homepage/assets/episodes/ep-04/pixel"
)
WORKTREE = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
DELIVERY = WORKTREE / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
OUTPUT = DELIVERY / "episode-04-v11-transformation-cloud-wipe-v3-pilot.mp4"
MANIFEST = DELIVERY / "episode-04-v11-transformation-cloud-wipe-v3-pilot-manifest.json"
CONTACT = DELIVERY / "episode-04-v11-transformation-cloud-wipe-v3-pilot-contact-sheet.jpg"
PEAK = DELIVERY / "episode-04-v11-transformation-cloud-wipe-v3-full-occlusion.png"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

SOURCES = [
    ("corporate", "ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png", "fd75dfdd13e3fb82cf5d7851e60a8bc788f9e177e59d673eac6f5c0c90fe990e"),
    ("opaque-cloud", "ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png", "9269f94f1ecfb0a0a4fbe2ed1d604c2046d8357a57cb25c3bf73b934fcd67f0a"),
    ("reveal", "ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png", "b6a92dfa1ac46db9e14ff31d1218fe8fc93488df16caf37c835b63dc25174d7d"),
]
PREDECESSORS = [
    {"sha256": "83e98a82fa7a131660f839761b0ffa16def17a8d0c01d710a463c70f4c7ce734", "verdict": "HOLD", "reason": "alpha-dissolved doubled figures"},
    {"sha256": "8133d1fda3541807128c1fc7fba28261625196d28fe7ac63756e9e2561c70547", "verdict": "HOLD", "reason": "pixel destruction, exposed shoes, rectangular matte boundary"},
]
FPS = 30
FRAME_COUNT = 156
SECONDS = FRAME_COUNT / FPS


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def ease(progress: float) -> float:
    progress = min(1.0, max(0.0, progress))
    return progress * progress * (3.0 - 2.0 * progress)


def cloud_mask(width: int, height: int, progress: float) -> Image.Image:
    """Organic multi-lobed wipe with no rectangular crop boundary."""
    progress = ease(progress)
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    lobes = [
        (960, 900, 310), (680, 855, 270), (1240, 855, 270),
        (790, 650, 265), (1130, 650, 265), (960, 600, 320),
        (810, 405, 245), (1110, 405, 245), (960, 250, 225),
        (610, 675, 180), (1310, 675, 180), (960, 1035, 255),
    ]
    # Stagger lobe growth slightly so the boundary behaves like a swelling puff.
    for index, (cx, cy, radius) in enumerate(lobes):
        stagger = max(0.0, min(1.0, progress * 1.22 - index * 0.018))
        current = max(1, round(radius * ease(stagger)))
        draw.ellipse((cx - current, cy - current, cx + current, cy + current), fill=255)
    return mask.filter(ImageFilter.GaussianBlur(3.0))


def cover_peak_shoes(cloud: Image.Image) -> Image.Image:
    """Extend the source cloud over its two exposed corporate shoes."""
    result = cloud.copy().convert("RGB")
    draw = ImageDraw.Draw(result)
    puffs = [
        (780, 905, 1080, 1125, "#d9f4f5"),
        (690, 930, 930, 1110, "#f4bfd8"),
        (1000, 930, 1250, 1115, "#aee8ef"),
        (850, 960, 1045, 1125, "#f8f4ee"),
        (930, 910, 1160, 1085, "#cebde8"),
    ]
    for left, top, right, bottom, colour in puffs:
        draw.ellipse((left, top, right, bottom), fill=colour, outline="#1b2737", width=7)
    # Small comic sparkle accents prevent the shoe-cover patch reading as one blob.
    for cx, cy, radius in [(845, 955, 15), (1090, 970, 18), (965, 1015, 13)]:
        points = []
        for point in range(8):
            angle = point * math.pi / 4
            r = radius if point % 2 == 0 else radius * 0.25
            points.append((cx + math.cos(angle) * r, cy + math.sin(angle) * r))
        draw.polygon(points, fill="#fffdf7", outline="#1b2737")
    return result


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    images: list[Image.Image] = []
    source_records = []
    for label, filename, expected_hash in SOURCES:
        path = SOURCE_ROOT / filename
        observed = sha256(path)
        if observed != expected_hash:
            raise SystemExit(f"SOURCE DRIFT {filename}: {observed} != {expected_hash}")
        images.append(Image.open(path).convert("RGB"))
        source_records.append({"label": label, "path": str(path), "sha256": observed})

    corporate, cloud_source, reveal = images
    if corporate.size != cloud_source.size or corporate.size != reveal.size:
        raise SystemExit("GEOMETRY MISMATCH")
    width, height = corporate.size
    peak_cloud = cover_peak_shoes(cloud_source)
    full_mask = cloud_mask(width, height, 1.0)
    peak_frame = Image.composite(peak_cloud, corporate, full_mask)
    peak_frame.save(PEAK)

    with tempfile.TemporaryDirectory(prefix="ep04-cloud-wipe-v3-") as temp_name:
        temp_root = Path(temp_name)
        for frame_index in range(FRAME_COUNT):
            if frame_index < 18:  # 0.00-0.60 corporate endpoint
                frame = corporate
            elif frame_index < 66:  # 0.60-2.20 organic cloud grows
                mask = cloud_mask(width, height, (frame_index - 18) / 47)
                frame = Image.composite(peak_cloud, corporate, mask)
            elif frame_index < 81:  # 2.20-2.70 complete cover; hidden base switch
                frame = peak_frame
            elif frame_index < 132:  # 2.70-4.40 cloud shrinks over stable reveal
                mask = cloud_mask(width, height, 1.0 - (frame_index - 81) / 50)
                frame = Image.composite(peak_cloud, reveal, mask)
            else:  # 4.40-5.20 clean reveal
                frame = reveal
            frame.save(temp_root / f"frame-{frame_index:04d}.png")

        subprocess.run([
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-framerate", str(FPS), "-i", str(temp_root / "frame-%04d.png"),
            "-frames:v", str(FRAME_COUNT), "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
        ], check=True)

    decoded_frames, decoded_seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded_frames != FRAME_COUNT or abs(decoded_seconds - SECONDS) > (1 / FPS):
        raise SystemExit(f"CLOCK FAIL frames={decoded_frames} seconds={decoded_seconds}")
    subprocess.run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT),
        "-vf", "fps=6,scale=480:270,tile=8x4", "-frames:v", "1", str(CONTACT),
    ], check=True)

    record = {
        "status": "BUILT_LOCALLY_REVIEW_PILOT_NOT_RELEASE_AUTHORITY",
        "job": "Reusable provider-independent LAiDIES corporate-to-weekly-outfit transformation shell",
        "predecessors": PREDECESSORS,
        "mechanism": {
            "description": "A multi-lobed organic mask reveals the exact opaque p2 cloud over one stable corporate plate, holds complete occlusion for the hidden endpoint switch, then shrinks over one stable weekly reveal plate.",
            "reusableInputs": ["corporate endpoint", "opaque cloud plate"],
            "weeklyInput": "episode-specific reveal plate only",
            "noRecurringProvider": True,
            "clock": {"fps": FPS, "frames": FRAME_COUNT, "seconds": SECONDS},
            "prohibitions": ["no ByteDance generation", "no cross-dissolved people", "no pixel-noise dissolve", "no rectangular matte", "no exposed shoes at switch", "no town", "no wand"],
        },
        "sources": source_records,
        "peakOcclusion": {"path": str(PEAK), "sha256": sha256(PEAK)},
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT), "decodedFrames": decoded_frames, "decodedSeconds": decoded_seconds},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "limitations": ["Silent visual pilot only.", "Not integrated into Episode 04.", "Requires independent visual judgment."],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
