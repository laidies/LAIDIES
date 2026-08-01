#!/usr/bin/env python3
"""Build the Episode 03 p39-p42 narration-specific method sequence.

The v14 review master holds four method cards for 102.2 seconds while the
narration moves from trusted source guidance through three distinct prompt
moves and a worked example.  This review-only sequence keeps the exact master
clock and audio while giving each spoken idea a corresponding existing frame.
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
OUTPUT = OUT / "p39-p42-three-move-method-review-v1.mp4"
CONTACT = OUT / "p39-p42-three-move-method-review-v1-contact-sheet.jpg"
RECEIPT = OUT / "p39-p42-three-move-method-review-v1-build.json"
START = 711.2
END = 813.4
FPS = 30

SEGMENTS = [
    {
        "start": 711.2,
        "end": 717.01,
        "source": "assets/episodes/ep-03/comic/ep03-emph-sources-attached-comic.png",
        "visible_description": "A comic warning distinguishes merely attaching sources from actually checking them.",
        "narration": "Use current guidance from the organizations and researchers who publish it.",
    },
    {
        "start": 717.01,
        "end": 729.29,
        "source": "assets/episodes/ep-03/comic/ep03-scene-12-prompt-like-elle-comic.png",
        "visible_description": "Elle stands in the library with the verification rulebook beside official source shelves.",
        "narration": "OpenAI, Anthropic, Google and Stanford guidance becomes three moves you can use.",
    },
    {
        "start": 729.29,
        "end": 745.21,
        "source": "assets/episodes/ep-03/comic/ep03-method-move1-comic.png",
        "visible_description": "Move One shows the source, policy and current pricing being handed to the model.",
        "narration": "Move one: give her the source; paste the current document or turn on search when freshness matters.",
    },
    {
        "start": 745.21,
        "end": 754.8,
        "source": "assets/episodes/ep-03/comic/ep03-scene-08-elle-file-comic-rebalance-v1.png",
        "visible_description": "Elle brings a real file and points to its timeline in court.",
        "narration": "Tell the model to answer only from the material you supplied; Elle walks in with the file.",
    },
    {
        "start": 754.8,
        "end": 762.917,
        "source": "assets/episodes/ep-03/comic/ep03-method-move2-comic.png",
        "visible_description": "Move Two explicitly allows an honest I don't know and labels inference.",
        "narration": "Move two: let her say I don't know.",
    },
    {
        "start": 762.917,
        "end": 775.81,
        "source": "assets/episodes/ep-03/comic/ep03-concept-receipt-comic.png",
        "visible_description": "A receipt card defines evidence as something the user can open, name, date, quote or point to.",
        "narration": "If the answer is not in the source, say so rather than guessing to be helpful.",
    },
    {
        "start": 775.81,
        "end": 792.17,
        "source": "assets/episodes/ep-03/comic/ep03-method-move3-comic.png",
        "visible_description": "Move Three highlights the exact supporting sentence in the supplied document.",
        "narration": "Move three: make it show the line, including the exact sentence and the missing Spring Fling identification.",
    },
    {
        "start": 792.17,
        "end": 801.17,
        "source": "assets/episodes/ep-03/comic/ep03-method-rule-comic.png",
        "visible_description": "The No Invented Receipts card rejects made-up links, dates, quotes, numbers and policies.",
        "narration": "No invented receipts and no made-up links, dates, quotes or numbers.",
    },
    {
        "start": 801.17,
        "end": 813.4,
        "source": "assets/episodes/ep-03/comic/ep03-method-prompt-like-elle-comicpage.png",
        "visible_description": "The complete Prompt Like Elle page assembles all three moves and the receipt rule.",
        "narration": "Watch the method work in the complete prompt: use only the sources, mark what is pending and show the line.",
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
        raise RuntimeError("Repair sequence does not cover the exact p39-p42 window")
    for previous, current in zip(SEGMENTS, SEGMENTS[1:]):
        if abs(previous["end"] - current["start"]) > 0.0001:
            raise RuntimeError("Repair sequence contains a clock gap or overlap")
    for segment in SEGMENTS:
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        segment["source_sha256"] = sha256(source)
        segment["duration_seconds"] = round(segment["end"] - segment["start"], 3)

    OUT.mkdir(parents=True, exist_ok=True)
    command = [str(FFMPEG), "-y"]
    for segment in SEGMENTS:
        command += [
            "-loop", "1", "-framerate", str(FPS),
            "-t", f"{segment['duration_seconds']:.3f}",
            "-i", str(ROOT / segment["source"]),
        ]
    command += ["-ss", f"{START:.3f}", "-t", f"{END - START:.3f}", "-i", str(MASTER)]

    filters = []
    labels = []
    for index, segment in enumerate(SEGMENTS):
        label = f"v{index}"
        filters.append(
            f"[{index}:v]scale=1920:1080:force_original_aspect_ratio=decrease,"
            f"pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p,"
            f"trim=duration={segment['duration_seconds']:.3f},setpts=PTS-STARTPTS[{label}]"
        )
        labels.append(f"[{label}]")
    filters.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=0[vout]")
    audio_index = len(SEGMENTS)
    command += [
        "-filter_complex", ";".join(filters),
        "-map", "[vout]", "-map", f"{audio_index}:a:0",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", "-r", str(FPS), "-fps_mode", "cfr",
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-t", f"{END - START:.3f}", "-movflags", "+faststart",
        "-metadata", "comment=LOCAL EPISODE 03 P39-P42 REVIEW SEQUENCE — NO RELEASE AUTHORITY",
        str(OUTPUT),
    ]
    run(command)

    midpoint_inputs = []
    for segment in SEGMENTS:
        midpoint_inputs += ["-ss", f"{(segment['start'] + segment['end']) / 2 - START:.3f}", "-i", str(OUTPUT)]
    tile_filters = []
    tile_labels = []
    for index in range(len(SEGMENTS)):
        label = f"t{index}"
        tile_filters.append(f"[{index}:v]scale=480:270[{label}]")
        tile_labels.append(f"[{label}]")
    tile_filters.append("".join(tile_labels) + "xstack=inputs=9:layout=0_0|480_0|960_0|0_270|480_270|960_270|0_540|480_540|960_540[out]")
    run([
        str(FFMPEG), "-y", *midpoint_inputs,
        "-filter_complex", ";".join(tile_filters), "-map", "[out]",
        "-frames:v", "1", str(CONTACT),
    ])

    receipt = {
        "status": "BUILT_LOCALLY_INDEPENDENT_REVIEW_REQUIRED",
        "publication_authority": False,
        "master": {"path": str(MASTER.relative_to(ROOT)), "sha256": MASTER_SHA256},
        "window": {"occurrences": "p39-p42", "start_seconds": START, "end_seconds": END, "duration_seconds": END - START},
        "sequence": {"path": str(OUTPUT.relative_to(ROOT)), "sha256": sha256(OUTPUT)},
        "contact_sheet": {"path": str(CONTACT.relative_to(ROOT)), "sha256": sha256(CONTACT)},
        "segments": SEGMENTS,
        "editorial_decision": "Replace four long method-card holds with nine narration-specific beats that move from trusted sources through the three Prompt Like Elle moves and into the worked example. Existing approved Episode 03 art is used at its native meaning; generic camera movement is not counted as semantic progression.",
        "next_gate": "deterministic duration/audio/scene-order checks, full contact-sheet inspection and independent normal-speed narration-picture review before successor assembly",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["sequence"], indent=2))


if __name__ == "__main__":
    build()
