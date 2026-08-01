#!/usr/bin/env python3
"""Validate the encoded Episode 04 Grace-moth foreground continuity.

This audit does not trust the builder's frame counter. It reconstructs the
intended foreground composite for every frame, decodes the H.264 candidate,
and measures whether the moth's encoded pixel contribution survives wherever
its path overlaps the protected Grace-person mask. It also writes dense visual
evidence for independent normal-speed review.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import math
import sys
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
BUILDER = ROOT / "assets/video/fx/build-ep04-perceptible-rain-and-grace-moth-v3.py"
CANDIDATE = ROOT / "assets/episodes/ep-04/pixel/ep04-scene-05-grace-moth-landing-comic-event-v3.mp4"
QA = ROOT / "operations/video-qa/episode-04-perceptible-rain-and-grace-moth-v3"
REPORT = QA / "grace-moth-v3-encoded-frame-continuity.json"
FLIGHT_SHEET = QA / "grace-moth-v3-flight-continuity.jpg"
LANDING_SHEET = QA / "grace-moth-v3-landing-continuity.jpg"

EXPECTED = {
    "builder": "4dd061ad4949e054f64dd947fe4107b11f8a6629d2e99ee0ed8183212755c24d",
    "candidate": "ec171ff100363db616f7295842e3ad8a430ffd7f755c68a2eb9b7e479560ae43",
    "grace_end": "a26009bfae2e1282c076251b16af29d1db344c68d1eef7aa2cd2e0088b05bbf5",
    "people_mask": "d6c26f0b4ed0b5913a3838a2bbdffc656a8fd56248937678d5fb730885f63e68",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def smoothstep(value: float) -> float:
    value = float(np.clip(value, 0.0, 1.0))
    return value * value * (3.0 - 2.0 * value)


def sprite_state(old, sprite: np.ndarray, seconds: float) -> tuple[np.ndarray, np.ndarray] | None:
    if seconds < 0.72 or seconds >= 5.20:
        return None
    u = smoothstep((seconds - 0.72) / 4.48)
    one = 1.0 - u
    start = np.array([1835.0, 250.0])
    control1 = np.array([1725.0, 330.0])
    control2 = np.array([1505.0, 760.0])
    finish = np.array([1040.0, 917.0])
    point = (
        one ** 3 * start
        + 3.0 * one ** 2 * u * control1
        + 3.0 * one * u ** 2 * control2
        + u ** 3 * finish
    )
    flutter = math.sin(2.0 * math.pi * 6.0 * u) * 7.0 * (1.0 - u)
    scale = 0.48 + 0.52 * u
    angle = -22.0 + 22.0 * u + flutter
    h, w = sprite.shape[:2]
    matrix = cv2.getRotationMatrix2D((w / 2, h / 2), angle, scale)
    matrix[0, 2] += float(point[0]) - w / 2
    matrix[1, 2] += float(point[1]) - h / 2
    warped = cv2.warpAffine(
        sprite,
        matrix,
        (old.W, old.H),
        flags=cv2.INTER_CUBIC,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0, 0),
    )
    return warped, point


def expected_frame(old, blank_protected: np.ndarray, end: np.ndarray, sprite: np.ndarray, seconds: float):
    state = sprite_state(old, sprite, seconds)
    if seconds < 0.72:
        return blank_protected, np.zeros((old.H, old.W), dtype=np.float32), None
    if state is None:
        return end, np.zeros((old.H, old.W), dtype=np.float32), None
    warped, point = state
    alpha = warped[..., 3].astype(np.float32) / 255.0
    frame = np.clip(
        blank_protected.astype(np.float32) * (1.0 - alpha[..., None])
        + warped[..., :3].astype(np.float32) * alpha[..., None],
        0.0,
        255.0,
    ).astype(np.uint8)
    return frame, alpha, point


def font(size: int):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).is_file():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def contact_sheet(samples: list[tuple[int, float, np.ndarray]], output: Path, crop: tuple[int, int, int, int], columns: int) -> None:
    x1, y1, x2, y2 = crop
    tile_w = 360
    tile_h = round(tile_w * (y2 - y1) / (x2 - x1))
    label_h = 38
    rows = math.ceil(len(samples) / columns)
    canvas = Image.new("RGB", (columns * tile_w, rows * (tile_h + label_h)), (32, 13, 40))
    draw = ImageDraw.Draw(canvas)
    label_font = font(22)
    for index, (frame_number, seconds, rgb) in enumerate(samples):
        tile = Image.fromarray(rgb[y1:y2, x1:x2]).resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        x = (index % columns) * tile_w
        y = (index // columns) * (tile_h + label_h)
        canvas.paste(tile, (x, y))
        draw.rectangle((x, y + tile_h, x + tile_w, y + tile_h + label_h), fill=(32, 13, 40))
        draw.text((x + 10, y + tile_h + 7), f"f{frame_number:03d}  {seconds:05.2f}s", fill=(255, 245, 205), font=label_font)
    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, quality=94, subsampling=0)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    for path in (REPORT, FLIGHT_SHEET, LANDING_SHEET):
        if path.exists() and not args.force:
            raise FileExistsError(f"Refusing to overwrite evidence without --force: {path}")

    actual_hashes = {
        "builder": sha256(BUILDER),
        "candidate": sha256(CANDIDATE),
        "grace_end": sha256(ROOT / "assets/episodes/ep-04/pixel/ep04-scene-05-grace-c-end-comic-v1-locked-1920.png"),
        "people_mask": sha256(ROOT / "operations/video-qa/episode-04-local-motion-masks-v1/cue-30-people-mask.png"),
    }
    checksum_pass = actual_hashes == EXPECTED
    if not checksum_pass:
        raise RuntimeError(f"Source checksum drift: expected={EXPECTED} actual={actual_hashes}")

    builder = load_module("ep04_grace_v3_builder_for_audit", BUILDER)
    old = builder.old
    end = old.load_rgb(old.S["grace_end"])
    blank, sprite = builder.events.grace_moth_sprite(end)
    people = builder.events.people_mask(30)
    blank_protected = builder.events.restore(blank, end, people)

    landing_alpha = sprite[..., 3].astype(np.float32) / 255.0
    landing_support = np.zeros((old.H, old.W), dtype=bool)
    landing_support[832:832 + landing_alpha.shape[0], 928:928 + landing_alpha.shape[1]] = landing_alpha > 0.10

    capture = cv2.VideoCapture(str(CANDIDATE))
    if not capture.isOpened():
        raise RuntimeError(f"Could not decode {CANDIDATE}")
    nominal_frames = int(round(capture.get(cv2.CAP_PROP_FRAME_COUNT)))
    width = int(round(capture.get(cv2.CAP_PROP_FRAME_WIDTH)))
    height = int(round(capture.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    fps = float(capture.get(cv2.CAP_PROP_FPS))

    mae_values: list[float] = []
    flight_preservation: list[float] = []
    overlap_preservation: list[float] = []
    overlap_frames: list[int] = []
    landing_preservation: list[float] = []
    black_frames: list[int] = []
    flight_samples: list[tuple[int, float, np.ndarray]] = []
    landing_samples: list[tuple[int, float, np.ndarray]] = []
    decoded = 0

    while True:
        ok, bgr = capture.read()
        if not ok:
            break
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
        seconds = decoded / old.FPS
        expected, alpha, _point = expected_frame(old, blank_protected, end, sprite, seconds)
        mae_values.append(float(np.abs(rgb.astype(np.float32) - expected.astype(np.float32)).mean()))
        if float(rgb.mean()) < 2.0:
            black_frames.append(decoded)

        support = alpha > 0.10
        if support.any():
            expected_effect = np.abs(expected.astype(np.float32) - blank_protected.astype(np.float32)).mean(axis=2)
            actual_effect = np.abs(rgb.astype(np.float32) - blank_protected.astype(np.float32)).mean(axis=2)
            expected_sum = float(expected_effect[support].sum())
            actual_sum = float(actual_effect[support].sum())
            if expected_sum > 1.0:
                flight_preservation.append(actual_sum / expected_sum)

            overlap = support & (people > 0.20)
            if int(overlap.sum()) >= 24:
                overlap_frames.append(decoded)
                expected_overlap = float(expected_effect[overlap].sum())
                actual_overlap = float(actual_effect[overlap].sum())
                if expected_overlap > 1.0:
                    overlap_preservation.append(actual_overlap / expected_overlap)

        if seconds >= 5.20:
            expected_effect = np.abs(end.astype(np.float32) - blank_protected.astype(np.float32)).mean(axis=2)
            actual_effect = np.abs(rgb.astype(np.float32) - blank_protected.astype(np.float32)).mean(axis=2)
            expected_sum = float(expected_effect[landing_support].sum())
            actual_sum = float(actual_effect[landing_support].sum())
            if expected_sum > 1.0:
                landing_preservation.append(actual_sum / expected_sum)

        if 0.60 <= seconds <= 5.40 and decoded % 6 == 0:
            flight_samples.append((decoded, seconds, rgb.copy()))
        if decoded in {144, 150, 156, 162, 168, 180, 210, 270, 330, 378}:
            landing_samples.append((decoded, seconds, rgb.copy()))
        decoded += 1

    capture.release()

    contact_sheet(flight_samples, FLIGHT_SHEET, (820, 120, 1920, 1080), 5)
    contact_sheet(landing_samples, LANDING_SHEET, (780, 650, 1380, 1080), 5)

    checks = {
        "checksum_bindings": checksum_pass,
        "decode_complete": decoded == nominal_frames == 379,
        "geometry": width == old.W and height == old.H and abs(fps - old.FPS) < 0.01,
        "no_black_frames": not black_frames,
        "encoded_matches_expected_composite": max(mae_values, default=999.0) < 8.0,
        "moth_visible_through_flight": min(flight_preservation, default=0.0) > 0.70,
        "moth_survives_person_mask_overlap": bool(overlap_preservation) and min(overlap_preservation) > 0.65,
        "moth_visible_after_landing": min(landing_preservation, default=0.0) > 0.70,
    }
    technical_pass = all(checks.values())
    report = {
        "schema_version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": (
            "MECHANICAL_FOREGROUND_CONTINUITY_PASS_INDEPENDENT_NORMAL_SPEED_REVIEW_REQUIRED"
            if technical_pass
            else "HOLD_MECHANICAL_FOREGROUND_CONTINUITY_FAILURE"
        ),
        "release_authority": "NONE",
        "scope": "Episode 04 cue 30 Grace Hopper moth v3 encoded-frame foreground continuity",
        "candidate": str(CANDIDATE.relative_to(ROOT)),
        "candidate_sha256": actual_hashes["candidate"],
        "source_bindings": {key: {"expected_sha256": EXPECTED[key], "actual_sha256": actual_hashes[key]} for key in EXPECTED},
        "video": {
            "decoded_frames": decoded,
            "nominal_frames": nominal_frames,
            "width": width,
            "height": height,
            "fps": fps,
            "duration_seconds": decoded / fps if fps else None,
        },
        "checks": checks,
        "metrics": {
            "encoded_expected_mae_mean": round(float(np.mean(mae_values)), 6),
            "encoded_expected_mae_max": round(float(max(mae_values)), 6),
            "flight_frames_measured": len(flight_preservation),
            "flight_preservation_ratio_min": round(float(min(flight_preservation)), 6),
            "flight_preservation_ratio_mean": round(float(np.mean(flight_preservation)), 6),
            "person_mask_overlap_frames": len(overlap_frames),
            "person_mask_overlap_first_last": [min(overlap_frames), max(overlap_frames)] if overlap_frames else None,
            "person_mask_overlap_preservation_ratio_min": round(float(min(overlap_preservation)), 6) if overlap_preservation else None,
            "person_mask_overlap_preservation_ratio_mean": round(float(np.mean(overlap_preservation)), 6) if overlap_preservation else None,
            "landing_frames_measured": len(landing_preservation),
            "landing_preservation_ratio_min": round(float(min(landing_preservation)), 6),
            "landing_preservation_ratio_mean": round(float(np.mean(landing_preservation)), 6),
            "black_frames": black_frames,
        },
        "evidence": {
            "flight_contact_sheet": str(FLIGHT_SHEET.relative_to(ROOT)),
            "landing_contact_sheet": str(LANDING_SHEET.relative_to(ROOT)),
        },
        "limits": [
            "This proves the exact encoded candidate retains the deterministic foreground composite, including where the moth overlaps the protected person mask.",
            "It does not independently admit narration fit, natural motion, taste, or normal-speed viewer quality.",
            "The exact-audio context clip must still receive an independent normal-speed occurrence verdict before episode-master admission.",
        ],
    }
    QA.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))
    if not technical_pass:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
