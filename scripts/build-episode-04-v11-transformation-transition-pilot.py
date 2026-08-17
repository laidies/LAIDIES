#!/usr/bin/env python3
"""Build the Episode 04 transformation timing pilot from the five locked stage frames."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg


SOURCE_ROOT = Path(
    "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/"
    "Website-homepage/assets/episodes/ep-04/pixel"
)
WORKTREE = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
DELIVERY = WORKTREE / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
OUTPUT = DELIVERY / "episode-04-v11-transformation-smooth-stage-pilot.mp4"
MANIFEST = DELIVERY / "episode-04-v11-transformation-smooth-stage-pilot-manifest.json"
CONTACT = DELIVERY / "episode-04-v11-transformation-smooth-stage-pilot-contact-sheet.jpg"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

SOURCES = [
    ("p0-corporate", "ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png", "fd75dfdd13e3fb82cf5d7851e60a8bc788f9e177e59d673eac6f5c0c90fe990e"),
    ("p1-poof-build", "ep04-open-15p1-transformation-poof-build-no-wand-v1-1920.png", "007647cb8a1da240e6caf59c36b010dd12474b01638aaa6a871f1eccab860ed3"),
    ("p2-poof-cover", "ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png", "9269f94f1ecfb0a0a4fbe2ed1d604c2046d8357a57cb25c3bf73b934fcd67f0a"),
    ("p3-poof-clear", "ep04-open-15p3-transformation-poof-clearing-no-wand-v1-1920.png", "ef0eda3cfffa7e01c3f97bc8651f2366e51a947f10cf27857755d91cd3bc37b6"),
    ("p4-reveal", "ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png", "b6a92dfa1ac46db9e14ff31d1218fe8fc93488df16caf37c835b63dc25174d7d"),
]

# The old clip forced all meaningful change into about 1.3 seconds. This pilot
# gives each cloud state time to read while keeping the whole event concise.
DURATIONS = [1.5, 1.4, 1.4, 1.4, 1.9]
TRANSITION = 0.6
OFFSETS = [0.9, 1.7, 2.5, 3.3]
EXPECTED_SECONDS = 5.2


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    paths: list[Path] = []
    source_records = []
    for label, filename, expected_hash in SOURCES:
        path = SOURCE_ROOT / filename
        observed_hash = sha256(path)
        if observed_hash != expected_hash:
            raise SystemExit(f"SOURCE DRIFT {filename}: {observed_hash} != {expected_hash}")
        paths.append(path)
        source_records.append({"label": label, "path": str(path), "sha256": observed_hash})

    # Pre-render each still as a real constant-rate video. Passing looped PNG
    # demuxers straight into xfade fails closed in this FFmpeg build because
    # their reported frame rate is 1/0 even after an fps filter.
    with tempfile.TemporaryDirectory(prefix="ep04-transform-cfr-") as temp_name:
        temp_root = Path(temp_name)
        segments: list[Path] = []
        for index, (path, duration) in enumerate(zip(paths, DURATIONS)):
            segment = temp_root / f"state-{index}.mp4"
            run([
                str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
                "-loop", "1", "-framerate", "30", "-t", str(duration), "-i", str(path),
                "-vf", "fps=30,format=yuv420p", "-r", "30", "-an", "-c:v", "libx264",
                "-preset", "veryfast", "-crf", "10", "-pix_fmt", "yuv420p", str(segment),
            ])
            segments.append(segment)

        command = [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y"]
        for segment in segments:
            command.extend(["-i", str(segment)])
        filter_complex = (
            f"[0:v][1:v]xfade=transition=fade:duration={TRANSITION}:offset={OFFSETS[0]}[x1];"
            f"[x1][2:v]xfade=transition=fade:duration={TRANSITION}:offset={OFFSETS[1]}[x2];"
            f"[x2][3:v]xfade=transition=fade:duration={TRANSITION}:offset={OFFSETS[2]}[x3];"
            f"[x3][4:v]xfade=transition=fade:duration={TRANSITION}:offset={OFFSETS[3]},"
            "fps=30,tpad=stop_mode=clone:stop_duration=0.033334,format=yuv420p[v]"
        )
        command.extend([
            "-filter_complex", filter_complex,
            "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-frames:v", "156", str(OUTPUT),
        ])
        run(command)

    decoded_frames, decoded_seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded_frames != 156 or abs(decoded_seconds - EXPECTED_SECONDS) > (1 / 30):
        raise SystemExit(f"CLOCK FAIL frames={decoded_frames} seconds={decoded_seconds}")

    run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT),
        "-vf", "fps=6,scale=480:270,tile=8x4", "-frames:v", "1", str(CONTACT),
    ])

    record = {
        "status": "BUILT_LOCALLY_REVIEW_PILOT_NOT_RELEASE_AUTHORITY",
        "job": "Episode 04 corporate-to-SUNNYVAiLE abstract-stage transition",
        "motionDesign": {
            "problem": "The incumbent compresses the meaningful transformation into about 1.3 seconds and then holds the reveal.",
            "method": "Five locked states with 0.6-second eased dissolves; the pose and wardrobe switch occurs under the fully opaque p2 cloud.",
            "durationsSeconds": DURATIONS,
            "transitionSeconds": TRANSITION,
            "transitionOffsetsSeconds": OFFSETS,
            "outputSeconds": EXPECTED_SECONDS,
            "prohibitions": ["no town", "no LUMINAiRY", "no storefront", "no wand", "no FAiRY Godmother", "no generated replacement art"],
        },
        "sources": source_records,
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT), "decodedFrames": decoded_frames, "decodedSeconds": decoded_seconds},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "limitations": [
            "Visual timing pilot only; no narration or sound-on judgment.",
            "Not integrated into the Episode 04 master.",
            "Requires maker pixel inspection and role-distinct visual judgment before integration.",
        ],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
