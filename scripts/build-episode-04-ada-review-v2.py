#!/usr/bin/env python3
"""Build the narration-aligned Episode 04 Ada repair review sequence.

This is a local review artifact, not a successor master. It keeps the exact
audio from the bound Episode 04 v9 parent and replaces only the picture track
at caption-derived boundaries. Newly generated candidate frames remain held
for independent accuracy, likeness, narration-alignment and normal-speed
review.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
OUT = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01"
SEQUENCE_DIR = OUT / "review-sequences"
OUTPUT = SEQUENCE_DIR / "p19-p20-ada-narration-review-v2.mp4"
CONTACT = SEQUENCE_DIR / "p19-p20-ada-narration-review-v2-contact-sheet.jpg"
BUILD_RECEIPT = SEQUENCE_DIR / "p19-p20-ada-narration-review-v2-build.json"

START = 250.300
END = 341.550

SEGMENTS = [
    {
        "start": 250.300,
        "end": 270.660,
        "source": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p19-ada-machine.jpg",
        "narration": "The young woman beside the machine and the arithmetic it was designed to perform.",
    },
    {
        "start": 270.660,
        "end": 284.240,
        "source": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p19-ada-punched-card.jpg",
        "narration": "Ada recognizes that precise instructions can direct the machine beyond one fixed calculation.",
    },
    {
        "start": 284.240,
        "end": 297.620,
        "source": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p20-ada-symbols-music.jpg",
        "narration": "Numbers could represent symbols and music, opening possibilities no one had built yet.",
    },
    {
        "start": 297.620,
        "end": 318.520,
        "source": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p20-ada-capability-limit-v2.png",
        "narration": "The machine follows the instructions supplied to it; capability and limits are both visible.",
        "generated_candidate_sha256": "7de50c66a2a4be2aaad0d189b4514a416bb3756f983a70b3006be6ca63452881",
    },
    {
        "start": 318.520,
        "end": 331.380,
        "source": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p20-ada-1843-evidence-board-v2.jpg",
        "narration": "Ada's 1843 Note G, algorithm and explanation of the machine's capability and limits.",
    },
    {
        "start": 331.380,
        "end": 341.550,
        "source": "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p20-ada-credit-erasure-v2.png",
        "narration": "Ada's work was discounted and credit was handed to a man instead.",
        "generated_candidate_sha256": "1f70efb89b679112d4cab0ada90910713bb11b9544ace899eddb82a6d5625100",
    },
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def build() -> None:
    expected_master = "d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4"
    actual_master = sha256(MASTER)
    if actual_master != expected_master:
        raise RuntimeError(f"Parent master drift: {actual_master}")

    command = [str(FFMPEG), "-y", "-i", str(MASTER)]
    filters: list[str] = []
    labels: list[str] = []
    for index, segment in enumerate(SEGMENTS, start=1):
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        duration = segment["end"] - segment["start"]
        command.extend(["-loop", "1", "-framerate", "30", "-i", str(source)])
        label = f"v{index}"
        labels.append(label)
        filters.append(
            f"[{index}:v]"
            "scale=1920:1080:force_original_aspect_ratio=increase,"
            "crop=1920:1080,"
            "zoompan=z='min(zoom+0.00004,1.025)':"
            "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30,"
            f"trim=duration={duration:.3f},setpts=PTS-STARTPTS,format=yuv420p[{label}]"
        )

    target_frames = round((END - START) * 30)
    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"concat=n={len(labels)}:v=1:a=0[joined]"
    )
    filters.append(
        "[joined]tpad=stop_mode=clone:stop_duration=0.200,"
        f"trim=end_frame={target_frames},setpts=N/(30*TB)[video]"
    )
    filters.append(
        f"[0:a]atrim=start={START:.3f}:end={END:.3f},asetpts=PTS-STARTPTS[audio]"
    )
    command.extend(
        [
            "-filter_complex",
            ";".join(filters),
            "-map",
            "[video]",
            "-map",
            "[audio]",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            str(OUTPUT),
        ]
    )
    run(command)

    midpoints = [((segment["start"] + segment["end"]) / 2) - START for segment in SEGMENTS]
    contact_command = [str(FFMPEG), "-y"]
    for timestamp in midpoints:
        contact_command.extend(["-ss", f"{timestamp:.3f}", "-i", str(OUTPUT)])
    contact_command.extend(
        [
            "-filter_complex",
            ";".join(
                [f"[{index}:v]scale=480:270[v{index}]" for index in range(len(midpoints))]
                + [
                    "".join(f"[v{index}]" for index in range(len(midpoints)))
                    + "xstack=inputs=6:layout=0_0|480_0|960_0|0_270|480_270|960_270:"
                    "fill=0x25102a[out]"
                ]
            ),
            "-map",
            "[out]",
            "-frames:v",
            "1",
            "-update",
            "1",
            "-q:v",
            "2",
            str(CONTACT),
        ]
    )
    run(contact_command)

    receipt = {
        "status": "LOCAL_REVIEW_SEQUENCE_ONLY_INDEPENDENT_REVIEW_REQUIRED",
        "authority": "NO_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "parent_master": str(MASTER.relative_to(ROOT)),
        "parent_master_sha256": actual_master,
        "audio_seconds": [START, END],
        "duration_seconds": round(END - START, 3),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "contact_sheet": str(CONTACT.relative_to(ROOT)),
        "contact_sheet_sha256": sha256(CONTACT),
        "segments": [
            {
                **segment,
                "duration": round(segment["end"] - segment["start"], 3),
                "source_sha256": sha256(ROOT / segment["source"]),
            }
            for segment in SEGMENTS
        ],
        "required_gate": [
            "independent historical and visual accuracy review",
            "independent Ada likeness and generated-frame artifact review",
            "exact-audio narration-picture review at normal speed",
            "normal-speed hold-duration and continuity review",
        ],
    }
    BUILD_RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    build()
