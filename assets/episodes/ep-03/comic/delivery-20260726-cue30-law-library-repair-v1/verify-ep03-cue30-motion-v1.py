#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[4]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
CLIP = HERE / "ep03-cue30-law-library-lamp-dust-zero-net-loop-v1.mp4"
REPORT = HERE / "ep03-cue30-law-library-lamp-dust-zero-net-loop-v1-qc.json"
SOURCE = HERE / "ep03-cue30-law-library-law-clerk-clean-textfree-v1-1920.png"
BUILD_SCRIPT = HERE / "build-ep03-cue30-motion-v1.sh"
FILTER_GRAPH = HERE / "ep03-cue30-motion-filter-v1.txt"
SOURCE_JUDGE_MD = (
    ROOT / "operations/product-stewards/episode-media-quality/evidence-2026-07-26/"
    "emq-e03-cue30-law-library-source-independent-judge-2026-07-26.md"
)
SOURCE_JUDGE_JSON = SOURCE_JUDGE_MD.with_suffix(".json")
W, H, CHANNELS = 1920, 1080, 3
FRAME_BYTES = W * H * CHANNELS

# Padded semantic masks around the only authorized effects:
# banker-lamp glow at left and five dust glints in the right window-light shaft.
ALLOWED = np.zeros((H, W), dtype=bool)
ALLOWED[215:425, 0:410] = True
ALLOWED[225:375, 1490:1785] = True

cmd = [
    str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(CLIP),
    "-map", "0:v:0", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"
]
proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
assert proc.stdout is not None

first: np.ndarray | None = None
last: np.ndarray | None = None
mid: np.ndarray | None = None
frame_count = 0
max_outside_absdiff = 0
outside_changed_pixels = 0
inside_changed_union = np.zeros((H, W), dtype=bool)
moving_frames_over_2 = 0
moving_frames_over_16 = 0
peak_absdiff = 0

while True:
    raw = proc.stdout.read(FRAME_BYTES)
    if not raw:
        break
    if len(raw) != FRAME_BYTES:
        raise RuntimeError(f"partial decoded frame: {len(raw)} bytes")
    frame = np.frombuffer(raw, dtype=np.uint8).reshape(H, W, CHANNELS).copy()
    if first is None:
        first = frame
    else:
        delta = np.abs(frame.astype(np.int16) - first.astype(np.int16)).max(axis=2)
        outside = delta[~ALLOWED]
        current_outside_max = int(outside.max(initial=0))
        max_outside_absdiff = max(max_outside_absdiff, current_outside_max)
        outside_changed_pixels += int(np.count_nonzero(outside))
        inside_changed_union |= (delta >= 2) & ALLOWED
        current_peak = int(delta.max(initial=0))
        peak_absdiff = max(peak_absdiff, current_peak)
        moving_frames_over_2 += int(np.any(delta >= 2))
        moving_frames_over_16 += int(np.any(delta >= 16))
    if frame_count == 180:
        mid = frame
    last = frame
    frame_count += 1

stderr = proc.stderr.read().decode("utf-8", "replace") if proc.stderr else ""
returncode = proc.wait()
if returncode != 0:
    raise RuntimeError(f"decode failed ({returncode}): {stderr}")
if first is None or last is None or mid is None:
    raise RuntimeError("missing required decoded frames")

def raw_sha(frame: np.ndarray) -> str:
    return hashlib.sha256(frame.tobytes()).hexdigest()

def file_sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

first_last_equal = bool(np.array_equal(first, last))
report = {
    "schema_version": "1.0",
    "scope": "Maker verification only; independent semantic-motion judgment required.",
    "candidate": str(CLIP.relative_to(HERE.parents[4])),
    "candidate_sha256": file_sha(CLIP),
    "provenance": {
        "accepted_source_path": str(SOURCE.relative_to(ROOT)),
        "accepted_source_sha256": file_sha(SOURCE),
        "independent_source_accept_md_sha256": file_sha(SOURCE_JUDGE_MD),
        "independent_source_accept_json_sha256": file_sha(SOURCE_JUDGE_JSON),
        "ffmpeg_binary": str(FFMPEG),
        "build_script_sha256": file_sha(BUILD_SCRIPT),
        "filter_graph_sha256": file_sha(FILTER_GRAPH),
        "verification_script_sha256": file_sha(Path(__file__).resolve()),
    },
    "expected_video_contract": {
        "width": W,
        "height": H,
        "fps": 30,
        "duration_seconds": 12.0,
        "decoded_frames": 360,
        "audio_streams": 0,
    },
    "decode": {
        "returncode": returncode,
        "decoded_frames": frame_count,
        "full_decode_pass": returncode == 0 and frame_count == 360,
    },
    "zero_net": {
        "first_frame_rgb_sha256": raw_sha(first),
        "mid_frame_180_rgb_sha256": raw_sha(mid),
        "last_frame_rgb_sha256": raw_sha(last),
        "first_last_decoded_rgb_equal": first_last_equal,
    },
    "motion_localization": {
        "allowed_regions_xyxy": [
            [0, 215, 410, 425],
            [1490, 225, 1785, 375],
        ],
        "max_absdiff_outside_allowed_regions": max_outside_absdiff,
        "cumulative_outside_changed_pixels": outside_changed_pixels,
        "outside_regions_pixel_exact_static": max_outside_absdiff == 0,
        "inside_changed_union_pixels_at_least_2_levels": int(inside_changed_union.sum()),
        "inside_changed_union_percent_of_frame": round(
            float(inside_changed_union.mean() * 100.0), 6
        ),
        "peak_absdiff_levels": peak_absdiff,
        "moving_frames_at_least_2_levels": moving_frames_over_2,
        "moving_frames_at_least_16_levels": moving_frames_over_16,
    },
    "maker_verdict": "PASS_MAKER_TECHNICAL_QC"
    if (
        returncode == 0
        and frame_count == 360
        and first_last_equal
        and max_outside_absdiff == 0
        and moving_frames_over_16 > 0
    )
    else "FAIL_MAKER_TECHNICAL_QC",
    "admission": "PENDING_INDEPENDENT_MOTION_JUDGE",
}
REPORT.write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
if report["maker_verdict"] != "PASS_MAKER_TECHNICAL_QC":
    raise SystemExit(1)
