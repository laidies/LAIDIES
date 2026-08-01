#!/usr/bin/env python3
"""Build the exact-audio Episode 04 opening repair review sequence.

This is a local review artifact, not a successor master. It keeps the exact
audio from the bound Episode 04 v9 parent and replaces only the picture track
for p03-p06. The editorial progression is deliberately sentence-led:
ordinary chat -> interruption -> dawning realization -> deeper doubt -> the
question that launches the episode.
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
OUTPUT = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2.mp4"
CONTACT = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2-contact-sheet.jpg"
TIMELINE_CONTACT = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2-timeline-contact-sheet.jpg"
BUILD_RECEIPT = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2-build.json"

START = 40.960
END = 101.500

SEGMENTS = [
    {
        "start": 40.960,
        "end": 51.168,
        "kind": "video",
        "source": "assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920-loop-v1.mp4",
        "narration": "An ordinary Wednesday chat: asking, correcting and typing at the desk.",
        "editorial_purpose": "Establish the routine before the thought interrupts it.",
    },
    {
        "start": 51.168,
        "end": 66.600,
        "kind": "video",
        "source": "assets/episodes/ep-04/pixel/ep04-cue04-local-motion-v2-rain-visible.mp4",
        "narration": "It hits her; she stops typing, then inventories three weeks of talking to the machine.",
        "editorial_purpose": "The first perceptible-rain beat marks the interruption without moving the heroine.",
    },
    {
        "start": 66.600,
        "end": 78.000,
        "kind": "still",
        "source": "assets/episodes/ep-04/pixel/ep04-scene-01-cold-open-v5-window-realization-review.png",
        "narration": "She cannot say where it came from, what it is or who made it; the family analogy begins.",
        "editorial_purpose": "A genuinely different wide composition moves attention away from the chat window and into reflection.",
    },
    {
        "start": 78.000,
        "end": 93.060,
        "kind": "video",
        "source": "assets/episodes/ep-04/pixel/ep04-cue05-local-motion-v3-rain-prominent.mp4",
        "narration": "The family analogy resolves and the internal question becomes: is this thing actually new?",
        "editorial_purpose": "The closer rain beat returns to the heroine only after the story has earned the closer view.",
    },
    {
        "start": 93.060,
        "end": 101.500,
        "kind": "still",
        "source": "assets/episodes/ep-04/pixel/ep04-open-07-questions-comic-v1-exact-text-1920.png",
        "narration": "The question under the question: who built it?",
        "editorial_purpose": "Land the exact launch question before the SUNNYVAiLE welcome begins.",
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

    SEQUENCE_DIR.mkdir(parents=True, exist_ok=True)
    command = [str(FFMPEG), "-y", "-i", str(MASTER)]
    filters: list[str] = []
    labels: list[str] = []

    for index, segment in enumerate(SEGMENTS, start=1):
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        duration = segment["end"] - segment["start"]
        if segment["kind"] == "video":
            command.extend(["-stream_loop", "-1", "-i", str(source)])
            normalise = (
                f"[{index}:v]fps=30,"
                "scale=1920:1080:force_original_aspect_ratio=increase,"
                "crop=1920:1080,"
                f"trim=duration={duration:.3f},setpts=PTS-STARTPTS,format=yuv420p"
            )
        else:
            command.extend(["-loop", "1", "-framerate", "30", "-i", str(source)])
            frames = round(duration * 30)
            normalise = (
                f"[{index}:v]scale=1960:1103:force_original_aspect_ratio=increase,"
                "crop=1960:1103,"
                "zoompan=z='min(zoom+0.000025,1.012)':"
                "x='iw/2-(iw/zoom/2)+18*(on/360)':"
                "y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30,"
                f"trim=end_frame={frames},setpts=PTS-STARTPTS,format=yuv420p"
            )
        label = f"v{index}"
        labels.append(label)
        filters.append(f"{normalise}[{label}]")

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
            "-r",
            "30",
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
                    "[v0][v1][v2][v3][v4]"
                    "xstack=inputs=5:layout=0_0|480_0|960_0|240_270|720_270:"
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

    run(
        [
            str(FFMPEG),
            "-y",
            "-i",
            str(OUTPUT),
            "-vf",
            "fps=1/4,scale=384:216,tile=4x4:padding=0:margin=0",
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
                "duration": round(segment["end"] - segment["start"], 3),
                "source_sha256": sha256(ROOT / segment["source"]),
            }
            for segment in SEGMENTS
        ],
        "required_gate": [
            "independent exact-audio narration-picture review at normal speed",
            "independent rain-perceptibility and heroine-protection review",
            "independent repetitive-zoom and shot-progression review",
            "responsive-player crop and full-audible-watch review after assembly",
        ],
    }
    BUILD_RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    build()
