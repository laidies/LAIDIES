#!/usr/bin/env python3
"""Build the Episode 03 p15-p16 evidence-to-conclusion repair sequence."""

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
OUTPUT = OUT / "p15-p16-evidence-conclusion-review-v1.mp4"
CONTACT = OUT / "p15-p16-evidence-conclusion-review-v1-contact-sheet.jpg"
RECEIPT = OUT / "p15-p16-evidence-conclusion-review-v1-build.json"
START = 284.0
END = 328.0
FPS = 30

SEGMENTS = [
    {
        "start": 284.0,
        "end": 299.0,
        "source": "assets/episodes/ep-03/comic/ep03-scene-05-bethany-byrd-comic-rebalance-v1.png",
        "crop": "1200:675:0:200",
        "visible_description": "Bethany holds the single tampon box that triggered an oversized verdict; the gym and Claire's headband keep the example grounded in the spoken scene.",
        "narration": "One box produces a verdict, then the more specific and less scandalous explanation arrives.",
    },
    {
        "start": 299.0,
        "end": 307.4,
        "source": "assets/episodes/ep-03/comic/ep03-emph-claires-headband-comic.png",
        "visible_description": "A butterfly hair clip races across a comic burst from clue to conclusion.",
        "narration": "That was never evidence; it was a clue in a Claire's headband sprinting to a conclusion.",
    },
    {
        "start": 307.4,
        "end": 312.14,
        "source": "assets/episodes/ep-03/comic/ep03-concept-assumption-comic.png",
        "visible_description": "The Assumption card labels how one right-sounding clue gets stated as fact without enough context.",
        "narration": "One data point. No context. Enormous conclusion.",
    },
    {
        "start": 312.14,
        "end": 318.34,
        "source": "assets/episodes/ep-03/comic/ep03-scene-06-churn-butter-comic-rebalance-v1.png",
        "visible_description": "A woman actively uses a laptop while rejecting an obsolete butter churn and framing the real drafting-versus-claims question.",
        "narration": "Can I use AI? Yes. Use it.",
    },
    {
        "start": 318.34,
        "end": 321.68,
        "source": "assets/episodes/ep-03/comic/ep03-emph-churn-butter-comic.png",
        "visible_description": "A comic declaration says we are not here to churn butter by candlelight.",
        "narration": "We are not here to churn butter by candlelight.",
    },
    {
        "start": 321.68,
        "end": 325.0,
        "source": "assets/episodes/ep-03/comic/ep03-concept-claim-comic.png",
        "visible_description": "The Claim card identifies the kinds of output that need checking before they can carry a person's name.",
        "narration": "Which parts are drafting and which parts are claims...",
    },
    {
        "start": 325.0,
        "end": 328.0,
        "source": "assets/episodes/ep-03/comic/ep03-concept-receipt-comic.png",
        "visible_description": "The Receipt card shows the named, dated, openable proof that keeps a claim off the stand.",
        "narration": "...that need receipts before they borrow your name?",
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
        raise RuntimeError("Repair sequence does not cover the exact p15-p16 window")
    for previous, current in zip(SEGMENTS, SEGMENTS[1:]):
        if abs(previous["end"] - current["start"]) > 0.0001:
            raise RuntimeError("Repair sequence contains a clock gap or overlap")
    for segment in SEGMENTS:
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        segment["source_sha256"] = sha256(source)
        segment["duration_seconds"] = round(segment["end"] - segment["start"], 3)
        segment["frames"] = round(segment["duration_seconds"] * FPS)

    OUT.mkdir(parents=True, exist_ok=True)
    command = [str(FFMPEG), "-y"]
    for segment in SEGMENTS:
        command += ["-loop", "1", "-framerate", str(FPS), "-t", f"{segment['duration_seconds']:.3f}", "-i", str(ROOT / segment["source"])]
    command += ["-ss", f"{START:.3f}", "-t", f"{END - START:.3f}", "-i", str(MASTER)]

    filters = []
    labels = []
    for index, segment in enumerate(SEGMENTS):
        label = f"v{index}"
        crop = f"crop={segment['crop']}," if segment.get("crop") else ""
        filters.append(
            f"[{index}:v]{crop}scale=2000:1125:force_original_aspect_ratio=increase,crop=2000:1125,"
            f"zoompan=z='min(zoom+0.00020,1.035)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"d={segment['frames']}:s=1920x1080:fps={FPS},setsar=1,format=yuv420p,"
            f"trim=duration={segment['duration_seconds']:.3f},setpts=PTS-STARTPTS[{label}]"
        )
        labels.append(f"[{label}]")
    filters.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=0[vout]")
    audio_index = len(SEGMENTS)
    command += [
        "-filter_complex", ";".join(filters), "-map", "[vout]", "-map", f"{audio_index}:a:0",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        "-r", str(FPS), "-fps_mode", "cfr", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-t", f"{END - START:.3f}", "-movflags", "+faststart",
        "-metadata", "comment=LOCAL EPISODE 03 P15-P16 REVIEW SEQUENCE — NO RELEASE AUTHORITY", str(OUTPUT),
    ]
    run(command)

    midpoint_inputs = []
    for segment in SEGMENTS:
        midpoint_inputs += ["-ss", f"{(segment['start'] + segment['end']) / 2 - START:.3f}", "-i", str(OUTPUT)]
    labels = []
    filters = []
    for index in range(len(SEGMENTS)):
        filters.append(f"[{index}:v]scale=274:154[t{index}]")
        labels.append(f"[t{index}]")
    filters.append("".join(labels) + "xstack=inputs=7:layout=0_0|274_0|548_0|822_0|1096_0|1370_0|1644_0[out]")
    run([str(FFMPEG), "-y", *midpoint_inputs, "-filter_complex", ";".join(filters), "-map", "[out]", "-frames:v", "1", str(CONTACT)])

    receipt = {
        "status": "BUILT_LOCALLY_INDEPENDENT_REVIEW_REQUIRED", "publication_authority": False,
        "master": {"path": str(MASTER.relative_to(ROOT)), "sha256": MASTER_SHA256},
        "window": {"occurrences": "p15-p16", "start_seconds": START, "end_seconds": END, "duration_seconds": END - START},
        "sequence": {"path": str(OUTPUT.relative_to(ROOT)), "sha256": sha256(OUTPUT)},
        "contact_sheet": {"path": str(CONTACT.relative_to(ROOT)), "sha256": sha256(CONTACT)},
        "segments": SEGMENTS,
        "editorial_decision": "Replace the static Claire's-headband and claims/receipts holds with seven narration-specific beats. Every beat has continuous motion, but meaning comes from the source change aligned to the narration rather than from arbitrary zoom changes.",
        "next_gate": "deterministic duration/audio/scene-order checks, contact-sheet inspection and independent normal-speed narration-picture review before successor assembly",
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["sequence"], indent=2))


if __name__ == "__main__":
    build()
