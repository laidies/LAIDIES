#!/usr/bin/env python3
"""Build the exact-audio Episode 04 modern-criticism review sequence.

The v9 assembly reveals Gebru's dismissal while the narration is still
introducing her research with Emily Bender.  This review cut restores the
narrative order: research, stochastic parrot, Google context, dismissal,
colleague protest, then Kate Crawford's material-supply-chain critique.
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
OUTPUT = OUT / "p46-p49-modern-criticism-review-v1.mp4"
CONTACT = OUT / "p46-p49-modern-criticism-review-v1-contact-sheet.jpg"
TIMELINE_CONTACT = OUT / "p46-p49-modern-criticism-review-v1-timeline-contact-sheet.jpg"
BUILD_RECEIPT = OUT / "p46-p49-modern-criticism-review-v1-build.json"

START = 925.800
# The occurrence audit ends p49 at 1003.680.  The review endpoint is moved
# back 13 ms to the nearest 30 fps boundary so the exact-audio cut and video
# frame count remain deterministic.
END = 1003.666667
FPS = 30

SEGMENTS = [
    {
        "start": 925.800,
        "end": 945.780,
        "source": "assets/episodes/ep-04/pixel/ep04-scene-11-joy-timnit-emily-v1-review.png",
        "source_type": "still",
        "narration": "Joy's findings lead into Timnit Gebru and Emily Bender warning about language models that sound brilliant while understanding nothing.",
        "editorial_purpose": "Keep the researchers and their evidence on screen; do not reveal Gebru's later dismissal before the narration earns it.",
    },
    {
        "start": 945.780,
        "end": 958.720,
        "source": "assets/episodes/ep-04/pixel/ep04-scene-11c-emily-comic-v2-timnit-style-lock-parrot-1920.png",
        "source_type": "still",
        "narration": "Bender names the stochastic parrot: speech mimicry without understanding.",
        "editorial_purpose": "Show Bender and the parrot only while the parrot analogy is being explained.",
    },
    {
        "start": 958.720,
        "end": 963.930,
        "source": "assets/episodes/ep-04/pixel/ep04-tj-timnit-comic-v1-google-2020-1920.png",
        "source_type": "still",
        "narration": "Gebru raised the concern inside Google in 2020.",
        "editorial_purpose": "Establish the exact place and year without prematurely depicting the disputed departure.",
    },
    {
        "start": 963.930,
        "end": 969.600,
        "source": "assets/episodes/ep-04/pixel/ep04-scene-11b-timnit-comic-v1-raising-alarm-1920.png",
        "source_type": "still",
        "narration": "She was abruptly gone; Gebru says she was fired and Google says it accepted a resignation.",
        "editorial_purpose": "Place the research-access-terminated visual only under the dismissal dispute.",
    },
    {
        "start": 969.600,
        "end": 976.580,
        "source": "assets/episodes/ep-04/pixel/ep04-scene-11b2-timnit-aftermath-comic-v1-1920.png",
        "source_type": "still",
        "narration": "Thousands of colleagues signed their names in protest.",
        "editorial_purpose": "Move from individual aftermath to the collective protest the narration names.",
    },
    {
        "start": 976.580,
        "end": END,
        "source": "assets/episodes/ep-04/pixel/ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920-loop-v1.mp4",
        "source_type": "video",
        "narration": "Kate Crawford maps the mines, water, electricity and underpaid human labour behind the apparent magic, then explains why these critics make systems more trustworthy.",
        "editorial_purpose": "Begin Kate's supply-chain visual exactly when Kate enters the narration and preserve its admitted local motion.",
    },
]

# Nearest-boundary allocations from the exact narration times above.  They
# sum to 2,336 frames / 77.866667 seconds.
SEGMENT_FRAMES = [599, 389, 156, 170, 209, 813]


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
        if segment["source_type"] == "still":
            command.extend(["-loop", "1", "-framerate", str(FPS), "-i", str(source)])
        else:
            command.extend(["-stream_loop", "-1", "-i", str(source)])
        label = f"v{index}"
        labels.append(label)
        filters.append(
            f"[{index}:v]scale=1920:1080:force_original_aspect_ratio=increase,"
            f"crop=1920:1080,trim=end_frame={SEGMENT_FRAMES[index - 1]},"
            f"setpts=N/({FPS}*TB),format=yuv420p[{label}]"
        )

    target_frames = sum(SEGMENT_FRAMES)
    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"concat=n={len(labels)}:v=1:a=0,trim=end_frame={target_frames},"
        f"setpts=N/({FPS}*TB)[video]"
    )
    filters.append(
        f"[0:a]atrim=start={START:.3f}:end={END:.6f},asetpts=PTS-STARTPTS[audio]"
    )
    command.extend(
        [
            "-filter_complex", ";".join(filters),
            "-map", "[video]", "-map", "[audio]",
            "-c:v", "libx264", "-r", str(FPS), "-fps_mode", "cfr",
            "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "192k", "-ac", "1", "-ar", "48000",
            "-movflags", "+faststart", "-shortest", str(OUTPUT),
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
                [f"[{index}:v]scale=640:360[v{index}]" for index in range(6)]
                + ["[v0][v1][v2][v3][v4][v5]xstack=inputs=6:layout=0_0|640_0|1280_0|0_360|640_360|1280_360[out]"]
            ),
            "-map", "[out]", "-frames:v", "1", "-update", "1", "-q:v", "2", str(CONTACT),
        ]
    )
    run(contact_command)

    run(
        [
            str(FFMPEG), "-y", "-i", str(OUTPUT),
            "-vf", "fps=1/6,scale=480:270,tile=4x3:padding=0:margin=0",
            "-frames:v", "1", "-update", "1", "-q:v", "2", str(TIMELINE_CONTACT),
        ]
    )

    receipt = {
        "status": "LOCAL_REVIEW_SEQUENCE_ONLY_INDEPENDENT_REVIEW_REQUIRED",
        "authority": "NO_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "parent_master": str(MASTER.relative_to(ROOT)),
        "parent_master_sha256": actual_master,
        "audio_seconds": [START, END],
        "duration_seconds": round(target_frames / FPS, 6),
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
                "motion_claim": (
                    "ADMITTED_SOURCE_VIDEO_RETIMED"
                    if segment["source_type"] == "video"
                    else "DELIBERATE_STILL_HARD_CUT_NO_FALSE_ANIMATION_CLAIM"
                ),
            }
            for index, segment in enumerate(SEGMENTS)
        ],
        "editorial_boundary": "The dismissal appears only once the narration reaches the disputed departure; the protest and Kate Crawford each receive their own later beat.",
        "required_gate": [
            "independent exact-audio narration-picture review at normal speed",
            "independent likeness, accuracy and text-artifact review",
            "independent p45-to-p46 and p49-to-p50 transition review",
            "responsive-player crop and full-audible-watch review after assembly",
        ],
    }
    BUILD_RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    build()
