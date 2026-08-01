#!/usr/bin/env python3
"""Build Episode 03 p07 without altering the approved spoken-welcome ident.

The exact p07 clock has four semantic beats: finish the cold-open question,
play the existing welcome ident and its terminal hold, recall David Rose, and
hand off to the correct Episode 03 Elle transformation.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-03-full-v14-repaired-review.mp4"
MASTER_SHA256 = "b67aa6d74b488c54317d42616c95908c080be962bd54c7d1d51ad471173660a7"
OUT = ROOT / "operations/video-qa/episode-03-v15-repair-production-packet-2026-08-01/review-sequences"
OUTPUT = OUT / "p07-welcome-bridge-review-v1.mp4"
CONTACT = OUT / "p07-welcome-bridge-review-v1-contact-sheet.jpg"
RECEIPT = OUT / "p07-welcome-bridge-review-v1-build.json"
START = 108.4
END = 135.0
FPS = 30

SEGMENTS = [
    {
        "start": 108.4,
        "end": 116.18,
        "kind": "still",
        "source": "assets/episodes/ep-03/comic/ep03-scene-02-couldnt-help-but-wonder-comic.png",
        "visible_description": "The rainy-office reflection stays with the unresolved cold-open question until the heroine finishes asking how she can catch one quietly wrong line.",
        "narration": "How am I supposed to catch the one line in it that's quietly, completely wrong?",
    },
    {
        "start": 116.18,
        "end": 125.44,
        "kind": "parent_video",
        "source": "assets/video/episode-03-full-v14-repaired-review.mp4",
        "source_window": [116.18, 125.44],
        "protected_ident_window": [116.18, 123.82],
        "visible_description": "The existing Episode 03 spoken-welcome ident plays at its approved clock, followed by its existing terminal hold before the recap begins.",
        "narration": "Welcome back to LAiDIES... from a little internet town called SUNNYVAiLE.",
    },
    {
        "start": 125.44,
        "end": 133.94,
        "kind": "still",
        "source": "assets/episodes/ep-02/comic/ep02-scene-19-david-rose-intro-comic.png",
        "visible_description": "The current Episode 02 David Rose source appears exactly when last week's fold-in-the-cheese lesson is recalled.",
        "narration": "Last week, David Rose taught us to say what we actually want—fold in the cheese, but for your inbox.",
    },
    {
        "start": 133.94,
        "end": 135.0,
        "kind": "still",
        "source": "assets/episodes/ep-03/comic/ep03-open-05p4-transformation-reveal-dramatic-stage-no-wand-v1-1920.png",
        "visible_description": "The correct Episode 03 Elle Woods weekly look begins the handoff into the transformation sequence that follows at 135 seconds.",
        "narration": "This week, Elle Woods teaches us what to check...",
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
    if sha256(MASTER) != MASTER_SHA256:
        raise RuntimeError("Episode 03 v14 master checksum drift")
    if SEGMENTS[0]["start"] != START or SEGMENTS[-1]["end"] != END:
        raise RuntimeError("Repair sequence does not cover the exact p07 window")
    for previous, current in zip(SEGMENTS, SEGMENTS[1:]):
        if abs(previous["end"] - current["start"]) > 0.0001:
            raise RuntimeError("Repair sequence contains a clock gap or overlap")

    OUT.mkdir(parents=True, exist_ok=True)
    command = [str(FFMPEG), "-y"]
    for segment in SEGMENTS:
        duration = segment["end"] - segment["start"]
        source = ROOT / segment["source"]
        if not source.is_file():
            raise FileNotFoundError(source)
        segment["source_sha256"] = sha256(source)
        segment["duration_seconds"] = round(duration, 3)
        segment["frames"] = round(duration * FPS)
        if segment["kind"] == "parent_video":
            source_start, source_end = segment["source_window"]
            command += ["-ss", f"{source_start:.3f}", "-t", f"{source_end - source_start:.3f}", "-i", str(source)]
        else:
            command += ["-loop", "1", "-framerate", str(FPS), "-t", f"{duration:.3f}", "-i", str(source)]
    command += ["-ss", f"{START:.3f}", "-t", f"{END - START:.3f}", "-i", str(MASTER)]

    filters: list[str] = []
    labels: list[str] = []
    for index, segment in enumerate(SEGMENTS):
        label = f"v{index}"
        duration = segment["duration_seconds"]
        if segment["kind"] == "parent_video":
            filters.append(
                f"[{index}:v]fps={FPS},scale=1920:1080:force_original_aspect_ratio=increase,"
                f"crop=1920:1080,trim=end_frame={segment['frames']},setpts=PTS-STARTPTS,"
                f"setsar=1,format=yuv420p[{label}]"
            )
        else:
            filters.append(
                f"[{index}:v]scale=2000:1125:force_original_aspect_ratio=increase,crop=2000:1125,"
                f"zoompan=z='min(zoom+0.00020,1.035)':x='iw/2-(iw/zoom/2)':"
                f"y='ih/2-(ih/zoom/2)':d={segment['frames']}:s=1920x1080:fps={FPS},"
                f"setsar=1,format=yuv420p,trim=duration={duration:.3f},setpts=PTS-STARTPTS[{label}]"
            )
        labels.append(f"[{label}]")
    filters.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=0[vout]")
    audio_index = len(SEGMENTS)
    command += [
        "-filter_complex", ";".join(filters),
        "-map", "[vout]", "-map", f"{audio_index}:a:0",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        "-r", str(FPS), "-fps_mode", "cfr", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-t", f"{END - START:.3f}", "-movflags", "+faststart",
        "-metadata", "comment=LOCAL EPISODE 03 P07 WELCOME-BRIDGE REVIEW — NO RELEASE AUTHORITY",
        str(OUTPUT),
    ]
    run(command)

    midpoint_inputs: list[str] = []
    for segment in SEGMENTS:
        midpoint_inputs += ["-ss", f"{(segment['start'] + segment['end']) / 2 - START:.3f}", "-i", str(OUTPUT)]
    contact_filters = [f"[{index}:v]scale=400:225[t{index}]" for index in range(len(SEGMENTS))]
    contact_filters.append("".join(f"[t{index}]" for index in range(len(SEGMENTS))) + f"hstack=inputs={len(SEGMENTS)}[out]")
    run([str(FFMPEG), "-y", *midpoint_inputs, "-filter_complex", ";".join(contact_filters), "-map", "[out]", "-frames:v", "1", str(CONTACT)])

    receipt = {
        "status": "BUILT_LOCALLY_INDEPENDENT_REVIEW_REQUIRED",
        "publication_authority": False,
        "master": {"path": str(MASTER.relative_to(ROOT)), "sha256": MASTER_SHA256},
        "window": {"occurrences": "p07", "start_seconds": START, "end_seconds": END, "duration_seconds": END - START},
        "protected_ident": {
            "clock_seconds": [116.18, 123.82],
            "authority": "operations/video-qa/episode-03-full-v12-spoken-welcome-ident-manifest.json",
            "treatment": "reused from the checksum-bound v14 parent at the same clock; no alternate ident or replacement art",
        },
        "sequence": {"path": str(OUTPUT.relative_to(ROOT)), "sha256": sha256(OUTPUT)},
        "contact_sheet": {"path": str(CONTACT.relative_to(ROOT)), "sha256": sha256(CONTACT)},
        "segments": SEGMENTS,
        "editorial_decision": "Finish the cold-open question before the welcome; preserve the approved spoken-welcome ident; then show the established David Rose and correct Episode 03 Elle sources at their spoken turns.",
        "next_gate": "deterministic validation and independent normal-speed narration-picture review before successor assembly",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["sequence"], indent=2))


if __name__ == "__main__":
    build()
