#!/usr/bin/env python3
"""Build the Episode 03 p43 narration-specific repair sequence.

The current master holds one cocktail card for 50.7 seconds while the audio
moves through a worked prompt, the three-move recap, the cocktail setup and
the guessing/confident-friend explanation.  This local review sequence keeps
the exact master clock and uses existing Episode 03 art in narration order.
It is review material only and carries no release authority.
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
OUTPUT = OUT / "p43-method-to-cocktail-review-v1.mp4"
CONTACT = OUT / "p43-method-to-cocktail-review-v1-contact-sheet.jpg"
RECEIPT = OUT / "p43-method-to-cocktail-review-v1-build.json"
START = 813.4
END = 864.1
FPS = 30

SEGMENTS = [
    {
        "start": 813.4,
        "end": 821.17,
        "source": "assets/episodes/ep-03/comic/ep03-method-prompt-like-elle-comicpage.png",
        "visible_description": "The complete Prompt Like Elle page: give the source, allow an honest blank, show the exact line and invent no receipts.",
        "narration": "Summarize only what is here, mark undecided items pending, and show the line behind every claim.",
    },
    {
        "start": 821.17,
        "end": 825.07,
        "source": "assets/episodes/ep-03/comic/ep03-method-rule-comic.png",
        "visible_description": "No Invented Receipts rule card naming links, dates, quotes and numbers that require evidence.",
        "narration": "No phantom July approval because no gap was left for the machine to fill.",
    },
    {
        "start": 825.07,
        "end": 827.40,
        "source": "assets/episodes/ep-03/comic/ep03-method-move1-comic.png",
        "visible_description": "Move One: give the model the real source.",
        "narration": "Prompt Like Elle: hand her the file.",
    },
    {
        "start": 827.40,
        "end": 829.70,
        "source": "assets/episodes/ep-03/comic/ep03-method-move2-comic.png",
        "visible_description": "Move Two: explicitly allow the model to say I don't know.",
        "narration": "Let her say I don't know.",
    },
    {
        "start": 829.70,
        "end": 832.91,
        "source": "assets/episodes/ep-03/comic/ep03-method-move3-comic.png",
        "visible_description": "Move Three: require the exact supporting sentence.",
        "narration": "Make her show the line.",
    },
    {
        "start": 832.91,
        "end": 838.71,
        "source": "assets/video/episode-03-full-scene-replacements-v4/ep03-cocktail-party-bronze-aige-y2k-v3-inclusive-bg.png",
        "visible_description": "Women gather at the BRONZE AiGE cocktail bar, establishing the happy-hour explanation setting.",
        "narration": "Which brings me to my favourite part: the cocktail-party explanation.",
    },
    {
        "start": 838.71,
        "end": 851.15,
        "source": "assets/episodes/ep-03/comic/ep03-cocktail-comic.png",
        "visible_description": "Cocktail explanation card: it is not lying; lying takes intent; it is guessing.",
        "narration": "Why does it make things up? It is not lying.",
    },
    {
        "start": 851.15,
        "end": 854.47,
        "source": "assets/video/episode-03-full-scene-replacements-v4/ep03-cocktail-party-bronze-aige-y2k-v2.png",
        "visible_description": "The cocktail group reacts together in the BRONZE AiGE.",
        "narration": "Lying takes intent. It is guessing.",
    },
    {
        "start": 854.47,
        "end": 864.1,
        "source": "assets/episodes/ep-03/comic/ep03-cocktail-comic.png",
        "visible_description": "Cocktail explanation card lands on the plausible-sounding confident-friend warning and receipt rule.",
        "narration": "It reaches for the plausible-sounding thing, says it with its whole chest, and becomes your most confident friend.",
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
        raise RuntimeError("Repair sequence does not cover the exact p43 window")
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
        "-metadata", "comment=LOCAL EPISODE 03 P43 REVIEW SEQUENCE — NO RELEASE AUTHORITY",
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
        "window": {"occurrence": "p43", "start_seconds": START, "end_seconds": END, "duration_seconds": END - START},
        "sequence": {"path": str(OUTPUT.relative_to(ROOT)), "sha256": sha256(OUTPUT)},
        "contact_sheet": {"path": str(CONTACT.relative_to(ROOT)), "sha256": sha256(CONTACT)},
        "segments": SEGMENTS,
        "editorial_decision": "Replace one 50.7-second static cocktail card with narration-specific progression through the worked prompt, three-move recap, cocktail setting, guessing distinction and confident-friend payoff. Generic camera motion is not used as a substitute for semantic progression.",
        "next_gate": "deterministic duration/audio/scene-order checks, full contact-sheet inspection and independent normal-speed narration-picture review before successor assembly",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["sequence"], indent=2))


if __name__ == "__main__":
    build()
