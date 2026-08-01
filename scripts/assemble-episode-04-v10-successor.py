#!/usr/bin/env python3
"""Assemble the checksum-bound Episode 04 v10 local review successor.

The picture track is rebuilt only at the admitted repair windows. The exact
AAC stream and external WebVTT captions remain bound to the v9 parent. This
script creates a local review master and receipt; it does not publish or bind
the file to any public playback surface.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
PARENT = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
CAPTIONS = ROOT / "assets/captions/episode-04.vtt"
OUTPUT = ROOT / "assets/video/episode-04-full-v10-repaired-review.mp4"
TEMP_OUTPUT = OUTPUT.with_suffix(".building.mp4")
RECEIPT = ROOT / "operations/video-qa/episode-04-v10-successor-assembly-2026-08-01.json"

PARENT_SHA256 = "d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4"
CAPTIONS_SHA256 = "1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4"


REPLACEMENTS = [
    {
        "id": "p03-p06-opening",
        "start": 40.960,
        "end": 101.500,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p03-p06-opening-narration-review-v2.mp4",
        "sha256": "eb02422c40d46906cb3de2bb11d6f48a21eefc90ecf19fffc4631a46f6f88d88",
        "source_offset": 0.0,
    },
    {
        "id": "p14-question-bridge",
        "start": 185.000,
        "end": 202.000,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p14-question-bridge-review-v1.mp4",
        "sha256": "191e829a9a9e65228e37ab1e708eed1ae7b372aa31323aa29fd5db74ad0decb8",
        "source_offset": 0.0,
    },
    {
        "id": "p16-p17-maivens-entry",
        "start": 220.750,
        "end": 244.876,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p16-p17-maivens-entry-review-v1.mp4",
        "sha256": "956daeeb70d1685ddac0e871816d09cd076fc2e3b20b344de89a370c7bc9c558",
        "source_offset": 0.0,
    },
    {
        "id": "p18-ada-entry-from-recovered-v4",
        "start": 245.300,
        "end": 250.300,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p18-p20-ada-recovered-v4-review-v1.mp4",
        "sha256": "b4200b1f76157ca63ff13011491d8e6a3a787c8960a3f0ed12d48edec622a5cc",
        "source_offset": 0.0,
    },
    {
        "id": "p19-p20-ada-explanation-v2",
        "start": 250.300,
        "end": 341.550,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p19-p20-ada-narration-review-v2.mp4",
        "sha256": "9c8fc6644c3a977452714e528b0d95b8d80f932f1a04cd97221256ae4aa85764",
        "source_offset": 0.0,
    },
    {
        "id": "p22-p23-hedy",
        "start": 346.566667,
        "end": 437.300,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p22-p23-hedy-review-v1.mp4",
        "sha256": "5de93c0cb742b67b0eef4c3d3ef79d138862645d173c8c47aa23f5edf23191e8",
        "source_offset": 0.0,
    },
    {
        "id": "p25-p27-eniac",
        "start": 442.300,
        "end": 545.566667,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p25-p27-eniac-review-v1.mp4",
        "sha256": "e74cec3da8e1cb66f3a7811edd47d3c589ff96e38951148c64de044284ac09c6",
        "source_offset": 0.0,
    },
    {
        "id": "p30-grace-moth-continuity",
        "start": 611.000,
        "end": 631.000,
        "path": "operations/video-qa/episode-04-perceptible-rain-and-grace-moth-v3/episode-04-grace-moth-context-review.mp4",
        "sha256": "c1491c3825010d8952a1e10656feb2dbc982e4e6b7654147e73f04ba2ba9d187",
        "source_offset": 0.0,
    },
    {
        "id": "p37-p38-karen-sparck-jones",
        "start": 682.450,
        "end": 764.230,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p37-p38-karen-narration-review-v1.mp4",
        "sha256": "78a16db4b73a67e99b6d8fd9853aaf71edf45208946703c8e535da4623191f63",
        "source_offset": 0.0,
    },
    {
        "id": "p43-modern-language-to-chatbox",
        "start": 843.800,
        "end": 895.530,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p43-modern-language-to-chatbox-review-v1.mp4",
        "sha256": "61d8d5dfb387760063fee758846e602f984c37b0601407ef03ec3298d4558cf8",
        "source_offset": 0.0,
    },
    {
        "id": "p46-p49-modern-criticism",
        "start": 925.800,
        "end": 1003.666667,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p46-p49-modern-criticism-review-v1.mp4",
        "sha256": "2edcb4881d1fc4d144213547b57ca48d544851888bbd79e45083bb3229e8f28f",
        "source_offset": 0.0,
    },
    {
        "id": "p50-p51-closing",
        "start": 1003.666667,
        "end": 1128.000,
        "path": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p50-p51-closing-review-v1.mp4",
        "sha256": "233f73950c9863de4e25956101c914b8ecefb5a98819f2c2b7c32e23dac354a9",
        "source_offset": 0.0,
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
            str(FFMPEG),
            "-v",
            "error",
            "-i",
            str(path),
            "-map",
            "0:a:0",
            "-c",
            "copy",
            "-f",
            "hash",
            "-hash",
            "sha256",
            "-",
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
        raise RuntimeError("Episode 04 parent master checksum drift")
    if sha256(CAPTIONS) != CAPTIONS_SHA256:
        raise RuntimeError("Episode 04 caption checksum drift")

    previous_end = 0.0
    for item in REPLACEMENTS:
        if item["start"] < previous_end:
            raise RuntimeError(f"Overlapping replacement: {item['id']}")
        source = ROOT / item["path"]
        if not source.exists() or sha256(source) != item["sha256"]:
            raise RuntimeError(f"Repair source missing or drifted: {item['id']}")
        expected = item["end"] - item["start"]
        available = duration(source) - item["source_offset"]
        if available + 0.04 < expected:
            raise RuntimeError(
                f"Repair source too short: {item['id']} ({available:.3f} < {expected:.3f})"
            )
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
        source_start = item["source_offset"]
        source_end = source_start + replacement_duration
        label = f"r{output_index}"
        filters.append(
            normalise(
                f"[{input_index}:v]trim=start={source_start:.6f}:end={source_end:.6f},"
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
            "-filter_complex",
            ";".join(filters),
            "-map",
            "[vout]",
            "-map",
            "0:a:0",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
            "-r",
            "30",
            "-fps_mode",
            "cfr",
            "-c:a",
            "copy",
            "-movflags",
            "+faststart",
            "-metadata",
            "comment=LOCAL REVIEW SUCCESSOR — NOT PUBLICATION AUTHORITY",
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
        "status": "LOCAL_SUCCESSOR_ASSEMBLED_TECHNICAL_REVIEW_REQUIRED",
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
            "Preserve the correct p18 Ada entry from the recovered sequence.",
            "Use the stronger p19-p20 v2 explanatory sequence for punched cards, symbolic computation, capability limits, 1843 evidence and credit erasure.",
            "Use the Grace context sequence whose encoded-frame continuity gate confirms the moth remains visible through the arm-overlap window.",
            "Keep the exact parent audio stream and external caption file unchanged.",
        ],
        "next_gate": "full decode, boundary-frame review, scene-order verification and caption coverage",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["successor"], indent=2))


if __name__ == "__main__":
    build()
