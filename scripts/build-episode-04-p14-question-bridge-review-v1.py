#!/usr/bin/env python3
"""Build the exact-audio Episode 04 p14 question bridge review sequence.

This local review artifact replaces the unrelated outfit transformation with
three narration-led beats: the ordinary desk, the question that interrupts it,
and the day AI landed on the heroine's desk.  The LUMINAiRY reveal remains in
p15, where the narration actually introduces it.
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
OUT = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences"
OUTPUT = OUT / "p14-question-bridge-review-v1.mp4"
CONTACT = OUT / "p14-question-bridge-review-v1-contact-sheet.jpg"
TIMELINE_CONTACT = OUT / "p14-question-bridge-review-v1-timeline-contact-sheet.jpg"
BUILD_RECEIPT = OUT / "p14-question-bridge-review-v1-build.json"

START = 185.000
END = 202.000
FPS = 30

SEGMENTS = [
    {
        "start": 185.000,
        "end": 188.580,
        "source": "assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920.png",
        "narration": "The coworker who said to just use it could not have explained it either.",
        "editorial_purpose": "Finish the coworker thought in the same ordinary rainy-office world where the question arose.",
    },
    {
        "start": 188.580,
        "end": 195.360,
        "source": "assets/episodes/ep-04/pixel/ep04-open-14-question-hangs-comic-v1-face-lock-1920.png",
        "narration": "Before which part does what, a more basic question gets in the way.",
        "editorial_purpose": "Move from task confusion to the real question without inventing a costume transformation.",
    },
    {
        "start": 195.360,
        "end": 202.000,
        "source": "assets/episodes/ep-04/pixel/ep04-emph-landed-on-your-desk-comic-v1-exact-text-1920.png",
        "narration": "What is this thing, really, and how did it get all the way to your desk?",
        "editorial_purpose": "Land the exact desk/origins question immediately before p15 introduces the LUMINAiRY.",
    },
]

# The caption boundaries do not land on exact 30 fps frame boundaries. These
# allocations use the nearest admissible cuts while preserving exactly 510
# frames / 17.000 seconds overall.
SEGMENT_FRAMES = [107, 204, 199]


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

    OUT.mkdir(parents=True, exist_ok=True)
    command = [str(FFMPEG), "-y", "-i", str(MASTER)]
    filters: list[str] = []
    labels: list[str] = []

    for index, segment in enumerate(SEGMENTS, start=1):
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        duration = segment["end"] - segment["start"]
        frames = SEGMENT_FRAMES[index - 1]
        command.extend(["-loop", "1", "-framerate", str(FPS), "-i", str(source)])
        label = f"v{index}"
        labels.append(label)
        filters.append(
            f"[{index}:v]scale=1920:1080:force_original_aspect_ratio=increase,"
            f"crop=1920:1080,trim=end_frame={frames},"
            f"setpts=N/({FPS}*TB),format=yuv420p[{label}]"
        )

    target_frames = round((END - START) * FPS)
    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"concat=n={len(labels)}:v=1:a=0[joined]"
    )
    filters.append(
        "[joined]tpad=stop_mode=clone:stop_duration=0.200,"
        f"trim=end_frame={target_frames},setpts=N/({FPS}*TB)[video]"
    )
    filters.append(
        f"[0:a]atrim=start={START:.3f}:end={END:.3f},"
        "asetpts=PTS-STARTPTS[audio]"
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
            "-r",
            str(FPS),
            "-fps_mode",
            "cfr",
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
            "-ac",
            "1",
            "-ar",
            "48000",
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
                [f"[{index}:v]scale=640:360[v{index}]" for index in range(3)]
                + ["[v0][v1][v2]hstack=inputs=3[out]"]
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

    run(
        [
            str(FFMPEG),
            "-y",
            "-i",
            str(OUTPUT),
            "-vf",
            "fps=1/2,scale=480:270,tile=4x2:padding=0:margin=0",
            "-frames:v",
            "1",
            "-update",
            "1",
            "-q:v",
            "2",
            str(TIMELINE_CONTACT),
        ]
    )

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
        "timeline_contact_sheet": str(TIMELINE_CONTACT.relative_to(ROOT)),
        "timeline_contact_sheet_sha256": sha256(TIMELINE_CONTACT),
        "segments": [
            {
                **segment,
                "narration_window_duration": round(segment["end"] - segment["start"], 3),
                "render_frames": SEGMENT_FRAMES[index],
                "render_duration": round(SEGMENT_FRAMES[index] / FPS, 6),
                "source_sha256": sha256(ROOT / segment["source"]),
                "motion_claim": "DELIBERATE_STILL_HARD_CUT_NO_FALSE_ANIMATION_CLAIM",
            }
            for index, segment in enumerate(SEGMENTS)
        ],
        "editorial_boundary": "p14 ends on the desk/origins question; p15 retains the LUMINAiRY introduction",
        "required_gate": [
            "independent exact-audio narration-picture review at normal speed",
            "independent text-legibility and hold-duration review",
            "independent p13-to-p14 and p14-to-p15 transition review",
            "responsive-player crop and full-audible-watch review after assembly",
        ],
    }
    BUILD_RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    build()
