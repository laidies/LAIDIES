#!/usr/bin/env python3
"""Bind and technically validate the exact-audio Episode 04 Grace review.

This is a maker-side mechanical gate. It proves that the repaired Grace-moth
candidate occupies the correct p30 narration window, that the surrounding
parent-master picture and exact narration survive, and that the encoded moth
continuity gate passed. It deliberately does not make the independent
normal-speed semantic/admission decision.
"""

from __future__ import annotations

import hashlib
import json
import math
import re
import subprocess
from pathlib import Path

import cv2
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
SOURCE_QA = ROOT / "operations/video-qa/episode-04-perceptible-rain-and-grace-moth-v3"
PACKET = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01"
SEQUENCES = PACKET / "review-sequences"

MASTER = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
CANDIDATE = ROOT / "assets/episodes/ep-04/pixel/ep04-scene-05-grace-moth-landing-comic-event-v3.mp4"
CONTEXT = SOURCE_QA / "episode-04-grace-moth-context-review.mp4"
CONTEXT_MANIFEST = SOURCE_QA / "context-review-manifest.json"
ENCODED_GATE = SOURCE_QA / "grace-moth-v3-encoded-frame-continuity.json"
OUTPUT_REPORT = SEQUENCES / "p30-grace-moth-context-review-v1-validation.json"
CONTACT_SHEET = SEQUENCES / "p30-grace-moth-context-review-v1-contact-sheet.jpg"
TIMELINE_SHEET = SEQUENCES / "p30-grace-moth-context-review-v1-timeline-contact-sheet.jpg"

EXPECTED_HASHES = {
    "master": "d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4",
    "candidate": "ec171ff100363db616f7295842e3ad8a430ffd7f755c68a2eb9b7e479560ae43",
    "context": "c1491c3825010d8952a1e10656feb2dbc982e4e6b7654147e73f04ba2ba9d187",
    "context_manifest": "0613b73edb45e53e159e5551d38e573904ccb1322fdef11f256d2f1e349490d7",
    "encoded_gate": "a7e158f5f78edcb74ba28122e246889a632aca7f5d496c9a4a2e3ad92675a6ea",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run_ffmpeg(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [str(FFMPEG), *args],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )


def inspect_video(path: Path) -> dict[str, float | int]:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"OpenCV could not open {path}")
    result = {
        "width": int(round(capture.get(cv2.CAP_PROP_FRAME_WIDTH))),
        "height": int(round(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))),
        "fps": float(capture.get(cv2.CAP_PROP_FPS)),
        "frames": int(round(capture.get(cv2.CAP_PROP_FRAME_COUNT))),
    }
    capture.release()
    result["duration_seconds"] = result["frames"] / result["fps"]
    return result


def frame_at(path: Path, seconds: float, size: tuple[int, int] | None = None) -> np.ndarray:
    capture = cv2.VideoCapture(str(path))
    capture.set(cv2.CAP_PROP_POS_MSEC, seconds * 1000)
    ok, frame = capture.read()
    capture.release()
    if not ok or frame is None:
        raise RuntimeError(f"Could not decode {path} at {seconds:.3f}s")
    if size:
        frame = cv2.resize(frame, size, interpolation=cv2.INTER_AREA)
    return frame


def font(size: int):
    for candidate in (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ):
        if Path(candidate).is_file():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def write_sheet(samples: list[tuple[float, str]], output: Path, columns: int) -> None:
    tile_w, tile_h, label_h = 480, 270, 46
    rows = math.ceil(len(samples) / columns)
    canvas = Image.new("RGB", (columns * tile_w, rows * (tile_h + label_h)), (32, 13, 40))
    draw = ImageDraw.Draw(canvas)
    label_font = font(22)
    for index, (seconds, label) in enumerate(samples):
        bgr = frame_at(CONTEXT, seconds, (tile_w, tile_h))
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
        tile = Image.fromarray(rgb)
        x = (index % columns) * tile_w
        y = (index // columns) * (tile_h + label_h)
        canvas.paste(tile, (x, y))
        draw.text((x + 12, y + tile_h + 9), f"{seconds:05.2f}s · {label}", fill=(255, 245, 205), font=label_font)
    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, quality=94, subsampling=0)


def mean_delta(first: np.ndarray, second: np.ndarray) -> float:
    return float(cv2.absdiff(first, second).mean())


def main() -> None:
    paths = {
        "master": MASTER,
        "candidate": CANDIDATE,
        "context": CONTEXT,
        "context_manifest": CONTEXT_MANIFEST,
        "encoded_gate": ENCODED_GATE,
    }
    actual_hashes = {key: sha256(path) for key, path in paths.items()}
    checksum_bindings = actual_hashes == EXPECTED_HASHES
    if not checksum_bindings:
        raise RuntimeError(f"Source checksum drift: expected={EXPECTED_HASHES} actual={actual_hashes}")

    context_manifest = json.loads(CONTEXT_MANIFEST.read_text())
    encoded_gate = json.loads(ENCODED_GATE.read_text())
    grace_record = next(
        record
        for record in context_manifest["records"]
        if Path(record["output"]).name == "episode-04-grace-moth-context-review.mp4"
    )
    manifest_bindings = (
        context_manifest["master"]["sha256"] == EXPECTED_HASHES["master"]
        and grace_record["sha256"] == EXPECTED_HASHES["context"]
        and grace_record["episode_v9_source_window_seconds"] == [611.0, 631.0]
    )
    encoded_continuity_pass = (
        encoded_gate["candidate_sha256"] == EXPECTED_HASHES["candidate"]
        and encoded_gate["status"].startswith("MECHANICAL_FOREGROUND_CONTINUITY_PASS")
        and all(encoded_gate["checks"].values())
    )

    observed = inspect_video(CONTEXT)
    decode = run_ffmpeg(["-v", "error", "-i", str(CONTEXT), "-f", "null", "-"])
    probe = run_ffmpeg(["-hide_banner", "-i", str(CONTEXT), "-f", "null", "-"])
    black = run_ffmpeg([
        "-hide_banner", "-i", str(CONTEXT), "-an",
        "-vf", "blackdetect=d=0.10:pic_th=0.98", "-f", "null", "-",
    ])
    black_events = [line.strip() for line in black.stderr.splitlines() if "black_start:" in line]

    comparison_size = (480, 270)
    surround_checks = []
    for context_second, master_second, label in (
        (1.0, 612.0, "pre-repair parent picture"),
        (3.5, 614.5, "pre-repair handoff"),
        (17.0, 628.0, "post-repair parent picture"),
        (19.0, 630.0, "post-repair tail"),
    ):
        delta = mean_delta(
            frame_at(CONTEXT, context_second, comparison_size),
            frame_at(MASTER, master_second, comparison_size),
        )
        surround_checks.append({
            "label": label,
            "context_seconds": context_second,
            "master_seconds": master_second,
            "mean_abs_pixel_delta_after_context_encode": round(delta, 6),
            "parent_picture_preserved_pass": delta < 8.0,
        })

    inserted_checks = []
    for candidate_second in (0.5, 2.5, 4.4, 7.0, 10.0, 12.2):
        context_second = candidate_second + 4.0
        delta = mean_delta(
            frame_at(CONTEXT, context_second, comparison_size),
            frame_at(CANDIDATE, candidate_second, comparison_size),
        )
        inserted_checks.append({
            "candidate_seconds": candidate_second,
            "context_seconds": context_second,
            "mean_abs_pixel_delta_after_context_encode": round(delta, 6),
            "candidate_picture_preserved_pass": delta < 8.0,
        })

    audio_present = bool(re.search(r"Audio:\s*aac", probe.stderr, re.IGNORECASE))
    mono_48000 = bool(re.search(r"48000 Hz, mono", probe.stderr, re.IGNORECASE))
    technical_checks = {
        "checksum_bindings": checksum_bindings,
        "manifest_bindings": manifest_bindings,
        "encoded_foreground_continuity_gate_pass": encoded_continuity_pass,
        "geometry_1920x1080_30fps": (
            observed["width"] == 1920
            and observed["height"] == 1080
            and abs(float(observed["fps"]) - 30.0) < 0.01
        ),
        "frame_count_600": observed["frames"] == 600,
        "duration_20_seconds": abs(float(observed["duration_seconds"]) - 20.0) <= (1 / 30),
        "full_decode": decode.returncode == 0,
        "aac_audio_present": audio_present,
        "mono_48000_hz_audio": mono_48000,
        "no_black_events": black.returncode == 0 and not black_events,
        "surrounding_parent_picture_preserved": all(item["parent_picture_preserved_pass"] for item in surround_checks),
        "inserted_candidate_picture_preserved": all(item["candidate_picture_preserved_pass"] for item in inserted_checks),
    }
    technical_pass = all(technical_checks.values())

    write_sheet(
        [
            (1.0, "parent context"), (3.8, "handoff in"),
            (4.8, "moth enters"), (7.0, "flight"),
            (9.0, "arm overlap"), (12.0, "landing approach"),
            (16.0, "landed hold"), (17.2, "handoff out"),
        ],
        CONTACT_SHEET,
        4,
    )
    write_sheet(
        [
            (0.0, "611.0 episode"), (2.0, "613.0 episode"),
            (4.0, "615.0 repair starts"), (6.0, "617.0 episode"),
            (8.0, "619.0 episode"), (10.0, "621.0 episode"),
            (12.0, "623.0 episode"), (14.0, "625.0 episode"),
            (16.0, "627.0 episode"), (16.6, "repair ends"),
            (18.0, "629.0 episode"), (19.5, "630.5 episode"),
        ],
        TIMELINE_SHEET,
        4,
    )

    receipt = {
        "schema_version": 1,
        "status": (
            "TECHNICAL_CONTEXT_PASS_INDEPENDENT_NORMAL_SPEED_REVIEW_REQUIRED"
            if technical_pass else "HOLD_TECHNICAL_CONTEXT_FAILURE"
        ),
        "authority": "NO_EDITORIAL_ACCEPTANCE_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "scope": "Episode 04 p30 Grace Hopper moth exact-audio narration context",
        "episode_v9_window_seconds": [611.0, 631.0],
        "repair_in_context_seconds": [4.0, 16.62],
        "repair_in_episode_seconds": [615.0, 627.62],
        "bindings": {
            key: {"path": str(paths[key].relative_to(ROOT)), "expected_sha256": EXPECTED_HASHES[key], "actual_sha256": actual_hashes[key]}
            for key in paths
        },
        "observed": observed,
        "checks": technical_checks,
        "black_events": black_events,
        "surrounding_picture_comparisons": surround_checks,
        "inserted_picture_comparisons": inserted_checks,
        "encoded_foreground_metrics": encoded_gate["metrics"],
        "evidence": {
            "contact_sheet": str(CONTACT_SHEET.relative_to(ROOT)),
            "timeline_contact_sheet": str(TIMELINE_SHEET.relative_to(ROOT)),
            "encoded_flight_contact_sheet": encoded_gate["evidence"]["flight_contact_sheet"],
            "encoded_landing_contact_sheet": encoded_gate["evidence"]["landing_contact_sheet"],
        },
        "required_human_gate": {
            "status": "HOLD",
            "review": "Independent normal-speed watch with exact narration",
            "allowed_verdicts": ["PASS", "CLOSE_ENOUGH", "RETIME", "REPLACE", "ADD_OR_REPAIR_ANIMATION"],
            "must_judge": [
                "whether the moth action reflects the narration at the exact time it appears",
                "whether the moth stays perceptibly in front of Grace through the arm overlap",
                "whether flight, landing and hold feel natural at normal speed",
                "whether p29-to-p30 and p30-to-p31 transitions work in the assembled successor",
            ],
        },
        "explicit_limits": [
            "This maker-side gate proves exact-window placement, decode, audio, source binding and encoded foreground continuity.",
            "It does not independently admit narration fit, natural motion, taste, historical accuracy or successor-master use.",
            "A successor still requires occurrence invalidation and one complete 1x audible responsive-player watch.",
        ],
    }
    OUTPUT_REPORT.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(receipt, indent=2))
    if not technical_pass:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
