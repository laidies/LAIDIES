#!/usr/bin/env python3
"""Validate the local Episode 03 v14 successor assembly."""

from __future__ import annotations

import hashlib
import io
import json
import re
import subprocess
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageStat


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
ASSEMBLY_RECEIPT = ROOT / "operations/video-qa/episode-03-v14-successor-assembly-2026-08-01.json"
VALIDATION_RECEIPT = ROOT / "operations/video-qa/episode-03-v14-successor-validation-2026-08-01.json"
CONTACT_SHEET = ROOT / "operations/video-qa/episode-03-v14-successor-midpoint-contact-sheet.jpg"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def audio_payload_hash(path: Path) -> str:
    result = subprocess.run(
        [
            str(FFMPEG), "-v", "error", "-i", str(path), "-map", "0:a:0",
            "-c", "copy", "-f", "hash", "-hash", "sha256", "-",
        ],
        cwd=ROOT,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    return result.stdout.strip().split("=", 1)[-1].lower()


def frame(path: Path, timestamp: float) -> Image.Image:
    result = subprocess.run(
        [
            str(FFMPEG), "-v", "error", "-ss", f"{timestamp:.6f}",
            "-i", str(path), "-frames:v", "1", "-f", "image2pipe",
            "-vcodec", "png", "-",
        ],
        cwd=ROOT,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return Image.open(io.BytesIO(result.stdout)).convert("RGB")


def mean_absolute_difference(left: Image.Image, right: Image.Image) -> float:
    left = left.resize((480, 270), Image.Resampling.LANCZOS)
    right = right.resize((480, 270), Image.Resampling.LANCZOS)
    return sum(ImageStat.Stat(ImageChops.difference(left, right)).mean) / 3


def parse_vtt_time(value: str) -> float:
    parts = value.split(":")
    if len(parts) == 2:
        minutes, seconds = parts
        return int(minutes) * 60 + float(seconds)
    hours, minutes, seconds = parts
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def validate() -> None:
    receipt = json.loads(ASSEMBLY_RECEIPT.read_text())
    parent = ROOT / receipt["parent"]["path"]
    captions = ROOT / receipt["captions"]["path"]
    successor = ROOT / receipt["successor"]["path"]

    checks: dict[str, object] = {
        "parent_sha256_matches": sha256(parent) == receipt["parent"]["sha256"],
        "caption_sha256_matches": sha256(captions) == receipt["captions"]["sha256"],
        "successor_sha256_matches": sha256(successor) == receipt["successor"]["sha256"],
        "audio_payload_matches_parent": audio_payload_hash(successor) == audio_payload_hash(parent),
        "duration_delta_seconds": abs(
            receipt["successor"]["duration_seconds"] - receipt["parent"]["duration_seconds"]
        ),
    }

    decode = subprocess.run(
        [str(FFMPEG), "-v", "error", "-i", str(successor), "-f", "null", "-"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    checks["full_decode_pass"] = decode.returncode == 0 and not decode.stderr.strip()
    checks["full_decode_stderr"] = decode.stderr.strip()

    black_scan = subprocess.run(
        [
            str(FFMPEG), "-hide_banner", "-i", str(successor),
            "-vf", "blackdetect=d=0.5:pix_th=0.02", "-an", "-f", "null", "-",
        ],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    black_events = re.findall(r"black_start:[^\n]+", black_scan.stderr)
    checks["black_frame_scan_pass"] = black_scan.returncode == 0 and not black_events
    checks["black_frame_events"] = black_events

    cues = re.findall(
        r"(?m)^(\d{1,2}:\d{2}(?::\d{2})?\.\d{3}) --> "
        r"(\d{1,2}:\d{2}(?::\d{2})?\.\d{3})",
        captions.read_text(),
    )
    checks["caption_cue_count"] = len(cues)
    checks["caption_last_end_seconds"] = parse_vtt_time(cues[-1][1]) if cues else None
    checks["captions_within_successor"] = bool(cues) and (
        parse_vtt_time(cues[-1][1]) <= receipt["successor"]["duration_seconds"] + 0.05
    )

    samples: list[dict[str, object]] = []
    contact_frames: list[tuple[str, Image.Image]] = []
    for item in receipt["repair_windows"]:
        repair_duration = item["end"] - item["start"]
        source_time = repair_duration / 2
        successor_time = item["start"] + repair_duration / 2
        source_frame = frame(ROOT / item["path"], source_time)
        successor_frame = frame(successor, successor_time)
        delta = mean_absolute_difference(source_frame, successor_frame)
        samples.append(
            {
                "id": item["id"],
                "successor_time": round(successor_time, 6),
                "source_time": round(source_time, 6),
                "mean_absolute_pixel_delta": round(delta, 4),
                "picture_matches_admitted_source": delta < 12.0,
            }
        )
        contact_frames.append((item["id"], successor_frame))
    checks["scene_order_samples"] = samples
    checks["scene_order_pass"] = all(
        sample["picture_matches_admitted_source"] for sample in samples
    )

    tile_width, tile_height, label_height = 480, 270, 34
    columns = 3
    rows = (len(contact_frames) + columns - 1) // columns
    contact = Image.new(
        "RGB", (columns * tile_width, rows * (tile_height + label_height)), "#29102f"
    )
    draw = ImageDraw.Draw(contact)
    font = ImageFont.load_default(size=16)
    for index, (label, image) in enumerate(contact_frames):
        x = (index % columns) * tile_width
        y = (index // columns) * (tile_height + label_height)
        contact.paste(image.resize((tile_width, tile_height), Image.Resampling.LANCZOS), (x, y))
        draw.text((x + 10, y + tile_height + 8), label, fill="white", font=font)
    contact.save(CONTACT_SHEET, quality=92)

    required = [
        checks["parent_sha256_matches"],
        checks["caption_sha256_matches"],
        checks["successor_sha256_matches"],
        checks["audio_payload_matches_parent"],
        checks["duration_delta_seconds"] <= 0.05,
        checks["full_decode_pass"],
        checks["black_frame_scan_pass"],
        checks["caption_cue_count"] == 211,
        checks["captions_within_successor"],
        checks["scene_order_pass"],
    ]
    result = {
        "status": (
            "TECHNICAL_AND_SCENE_ORDER_PASS_INDEPENDENT_NORMAL_SPEED_REVIEW_REQUIRED"
            if all(required)
            else "VALIDATION_FAIL"
        ),
        "publication_authority": False,
        "successor": receipt["successor"],
        "checks": checks,
        "contact_sheet": str(CONTACT_SHEET.relative_to(ROOT)),
        "contact_sheet_sha256": sha256(CONTACT_SHEET),
        "next_gate": "independent full 1x audible narration-picture review of the complete successor master",
    }
    VALIDATION_RECEIPT.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))
    if result["status"] == "VALIDATION_FAIL":
        raise SystemExit(1)


if __name__ == "__main__":
    validate()
