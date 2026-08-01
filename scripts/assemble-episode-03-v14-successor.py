#!/usr/bin/env python3
"""Assemble the checksum-bound Episode 03 v14 local review successor."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
PARENT = ROOT / "assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4"
CAPTIONS = ROOT / "assets/captions/episode-03.vtt"
OUTPUT = ROOT / "assets/video/episode-03-full-v14-repaired-review.mp4"
TEMP_OUTPUT = OUTPUT.with_suffix(".building.mp4")
RECEIPT = ROOT / "operations/video-qa/episode-03-v14-successor-assembly-2026-08-01.json"

PARENT_SHA256 = "bcea0457b9b985558ace3581e4c18b4601173d8d668db4284c9e7589aca5a56f"
CAPTIONS_SHA256 = "aed14506fe7d399f0a77c391fa1e046746a920d86b65880093b30f0fc83c66be"

REPLACEMENTS = [
    {
        "id": "p01-p03-opening-setup-and-title",
        "start": 20.680,
        "end": 50.700,
        "path": "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01/review-sequences/p01-p03-opening-setup-and-title-review-v1.mp4",
        "sha256": "64eaa43fc6973305083ac41358889365c4b358c8237e457ffd771c3d79dce959",
    },
    {
        "id": "p17-p20-fake-citation-to-blue-hoodie",
        "start": 326.738,
        "end": 400.990,
        "path": "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01/review-sequences/p17-p20-fake-citation-to-blue-hoodie-review-v1.mp4",
        "sha256": "f4e991ba9689ee6a9ac5184603dac08441770faad8549889ef7abf1e624632be",
    },
    {
        "id": "p25-p30-three-piles-to-law-clerk",
        "start": 477.190,
        "end": 582.390,
        "path": "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01/review-sequences/p25-p30-three-piles-to-law-clerk-review-v1.mp4",
        "sha256": "0e037cd7ef84f555708138cf820bea8f8b36108cd92bb7ead8c0c0292a48dfae",
    },
    {
        "id": "p33-same-answer-different-outfit",
        "start": 604.870,
        "end": 634.610,
        "path": "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01/review-sequences/p33-same-answer-different-outfit-review-v1.mp4",
        "sha256": "ae8f304225b305f25fa9e4c4f8b14912e70d6a1632ba57b3aad4837ebd1dd405",
    },
    {
        "id": "p47-town-extras-to-signoff",
        "start": 957.890,
        "end": 1024.250,
        "path": "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01/review-sequences/p47-town-extras-to-signoff-review-v1.mp4",
        "sha256": "88001838a0abb2754a637240fc68281ec2b8a70a4042a7d6e29da865dd706b96",
    },
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(command: list[str], *, capture: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    )


def duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not parse duration for {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def audio_payload_hash(path: Path) -> str:
    result = run(
        [
            str(FFMPEG), "-v", "error", "-i", str(path), "-map", "0:a:0",
            "-c", "copy", "-f", "hash", "-hash", "sha256", "-",
        ],
        capture=True,
    )
    return result.stdout.strip().split("=", 1)[-1].lower()


def normalise(label: str) -> str:
    return (
        f"{label}fps=30,"
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,"
        "setsar=1,format=yuv420p"
    )


def build() -> None:
    if sha256(PARENT) != PARENT_SHA256:
        raise RuntimeError("Episode 03 parent master checksum drift")
    if sha256(CAPTIONS) != CAPTIONS_SHA256:
        raise RuntimeError("Episode 03 caption checksum drift")

    previous_end = 0.0
    for item in REPLACEMENTS:
        if item["start"] < previous_end:
            raise RuntimeError(f"Overlapping replacement: {item['id']}")
        source = ROOT / item["path"]
        if not source.exists() or sha256(source) != item["sha256"]:
            raise RuntimeError(f"Repair source missing or drifted: {item['id']}")
        if duration(source) + 0.04 < item["end"] - item["start"]:
            raise RuntimeError(f"Repair source too short: {item['id']}")
        previous_end = item["end"]

    command = [str(FFMPEG), "-y", "-i", str(PARENT)]
    for item in REPLACEMENTS:
        command.extend(["-i", str(ROOT / item["path"])])

    filters: list[str] = []
    labels: list[str] = []
    cursor = 0.0
    output_index = 0

    for input_index, item in enumerate(REPLACEMENTS, start=1):
        if item["start"] > cursor:
            label = f"g{output_index}"
            filters.append(
                normalise(
                    f"[0:v]trim=start={cursor:.6f}:end={item['start']:.6f},"
                    "setpts=PTS-STARTPTS,"
                )
                + f"[{label}]"
            )
            labels.append(f"[{label}]")
            output_index += 1

        replacement_duration = item["end"] - item["start"]
        label = f"r{output_index}"
        filters.append(
            normalise(
                f"[{input_index}:v]trim=start=0:end={replacement_duration:.6f},"
                "setpts=PTS-STARTPTS,"
            )
            + f"[{label}]"
        )
        labels.append(f"[{label}]")
        output_index += 1
        cursor = item["end"]

    tail_label = f"g{output_index}"
    filters.append(
        normalise(f"[0:v]trim=start={cursor:.6f},setpts=PTS-STARTPTS,")
        + f"[{tail_label}]"
    )
    labels.append(f"[{tail_label}]")
    filters.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=0[vout]")

    TEMP_OUTPUT.unlink(missing_ok=True)
    command.extend(
        [
            "-filter_complex", ";".join(filters),
            "-map", "[vout]", "-map", "0:a:0",
            "-c:v", "libx264", "-preset", "medium", "-crf", "18",
            "-pix_fmt", "yuv420p", "-r", "30", "-fps_mode", "cfr",
            "-c:a", "copy", "-movflags", "+faststart",
            "-metadata", "comment=LOCAL REVIEW SUCCESSOR — NOT PUBLICATION AUTHORITY",
            str(TEMP_OUTPUT),
        ]
    )
    run(command)
    TEMP_OUTPUT.replace(OUTPUT)

    parent_duration = duration(PARENT)
    output_duration = duration(OUTPUT)
    parent_audio = audio_payload_hash(PARENT)
    output_audio = audio_payload_hash(OUTPUT)
    if abs(parent_duration - output_duration) > 0.05:
        raise RuntimeError(
            f"Output duration drift: parent={parent_duration}, output={output_duration}"
        )
    if parent_audio != output_audio:
        raise RuntimeError("Copied audio payload does not match parent")

    receipt = {
        "status": "BUILT_LOCALLY_TECHNICAL_REVIEW_REQUIRED",
        "publication_authority": False,
        "parent": {
            "path": str(PARENT.relative_to(ROOT)),
            "sha256": PARENT_SHA256,
            "duration_seconds": parent_duration,
            "audio_payload_sha256": parent_audio,
        },
        "captions": {
            "path": str(CAPTIONS.relative_to(ROOT)),
            "sha256": CAPTIONS_SHA256,
        },
        "successor": {
            "path": str(OUTPUT.relative_to(ROOT)),
            "sha256": sha256(OUTPUT),
            "duration_seconds": output_duration,
            "audio_payload_sha256": output_audio,
            "geometry": "1920x1080",
            "frame_rate": 30,
        },
        "repair_windows": REPLACEMENTS,
        "editorial_decisions": [
            "Land the exact Episode 03 title only on its spoken line.",
            "Align claim, citation, jurisdiction, date and exception examples to their narration.",
            "Restore the draft, claim, receipt, Elle analogy and law-clerk sequence in order.",
            "Use the existing Regina/Chutney evidence montage as a deliberately close semantic match for repeated unsupported answers in different packaging.",
            "Replace the overlong signoff hold with destination, reward, Closet and final-signoff visuals; exclude the rejected fake map.",
            "Keep the exact parent audio stream and external caption file unchanged.",
        ],
        "next_gate": "full decode, black-frame scan, boundary and scene-order verification, caption coverage, then independent full 1x audible narration-picture review",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["successor"], indent=2))


if __name__ == "__main__":
    build()
