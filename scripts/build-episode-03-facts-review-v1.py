#!/usr/bin/env python3
"""Build the Episode 03 p34-p36 narration-specific evidence sequence.

The v14 review master advances the Nature, Stanford and KPMG cards before the
corresponding narration reaches them.  This review-only sequence preserves the
exact p34-p36 clock and master audio while realigning each visible claim with
the words being spoken.
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
OUTPUT = OUT / "p34-p36-evidence-facts-review-v1.mp4"
CONTACT = OUT / "p34-p36-evidence-facts-review-v1-contact-sheet.jpg"
RECEIPT = OUT / "p34-p36-evidence-facts-review-v1-build.json"
START = 623.7
END = 691.0
FPS = 30

SEGMENTS = [
    {
        "start": 623.7,
        "end": 635.35,
        "source": "assets/episodes/ep-03/comic/ep03-scene-11-chutney-thrice-montage-comic-v3-textfix.png",
        "visible_description": "Chutney gives three slightly changed versions of the same shower alibi at different times.",
        "narration": "The shirt order switched, but that is not verification; Chutney is repeating the same alibi in a slightly different color combination.",
    },
    {
        "start": 635.35,
        "end": 644.49,
        "source": "assets/episodes/ep-03/comic/ep03-scene-14-receipts-pass-comic-rebalance-v2-hair-cleanup.png",
        "visible_description": "Elle actively checks a receipt by date, quote and owner while the card warns that sources attached are not sources checked.",
        "narration": "Are the tools getting better at giving evidence? Yes.",
    },
    {
        "start": 644.49,
        "end": 657.41,
        "source": "assets/episodes/ep-03/comic/ep03-scene-12-prompt-like-elle-comic.png",
        "visible_description": "Elle carries a verification rulebook beside shelves for primary source organizations.",
        "narration": "Newer tools can search, cite, read documents and flag uncertainty. That is real and helpful, but better is not solved.",
    },
    {
        "start": 657.41,
        "end": 669.11,
        "source": "assets/episodes/ep-03/comic/ep03-fact-nature-comic.png",
        "visible_description": "A Nature 2026 fact card contrasts an honest I don't know with a rewarded confident guess.",
        "narration": "A 2026 Nature paper found that accuracy-based grading can reward a confident guess over an honest I don't know.",
    },
    {
        "start": 669.11,
        "end": 682.03,
        "source": "assets/episodes/ep-03/comic/ep03-fact-stanford-index-comic.png",
        "visible_description": "A Stanford AI Index 2026 fact card shows a model agreeing with a false belief rather than an independent fact.",
        "narration": "The Stanford 2026 AI Index found that if you feed a model a false belief, it will often agree with you.",
    },
    {
        "start": 682.03,
        "end": 691.0,
        "source": "assets/episodes/ep-03/comic/ep03-fact-kpmg-comic.png",
        "visible_description": "A KPMG fact card shows an AI report overflowing with fabricated citations above a tiny receipt drawer.",
        "narration": "KPMG pulled an AI report after a source check found 40 of its 45 citations were fabricated.",
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
        raise RuntimeError("Repair sequence does not cover the exact p34-p36 window")
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
        "-metadata", "comment=LOCAL EPISODE 03 P34-P36 REVIEW SEQUENCE — NO RELEASE AUTHORITY",
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
    tile_filters.append("".join(tile_labels) + "xstack=inputs=6:layout=0_0|480_0|960_0|0_270|480_270|960_270[out]")
    run([
        str(FFMPEG), "-y", *midpoint_inputs,
        "-filter_complex", ";".join(tile_filters), "-map", "[out]",
        "-frames:v", "1", str(CONTACT),
    ])

    receipt = {
        "status": "BUILT_LOCALLY_INDEPENDENT_REVIEW_REQUIRED",
        "publication_authority": False,
        "master": {"path": str(MASTER.relative_to(ROOT)), "sha256": MASTER_SHA256},
        "window": {"occurrences": "p34-p36", "start_seconds": START, "end_seconds": END, "duration_seconds": END - START},
        "sequence": {"path": str(OUTPUT.relative_to(ROOT)), "sha256": sha256(OUTPUT)},
        "contact_sheet": {"path": str(CONTACT.relative_to(ROOT)), "sha256": sha256(CONTACT)},
        "segments": SEGMENTS,
        "editorial_decision": "Realign the p34-p36 images to the narration: retain the clean repeated-alibi montage, show active source checking while the narration acknowledges improved tools, then present the Nature, Stanford and KPMG cards only when each named claim is spoken. Existing approved Episode 03 art is used at its native meaning; generic camera movement is not counted as semantic progression.",
        "next_gate": "deterministic duration/audio/scene-order checks, full contact-sheet inspection and independent normal-speed narration-picture review before successor assembly",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["sequence"], indent=2))


if __name__ == "__main__":
    build()
