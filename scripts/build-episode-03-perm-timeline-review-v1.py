#!/usr/bin/env python3
"""Build the Episode 03 p23-p24 fresh-perm/timeline repair sequence."""

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
OUTPUT = OUT / "p23-p24-perm-timeline-review-v1.mp4"
CONTACT = OUT / "p23-p24-perm-timeline-review-v1-contact-sheet.jpg"
RECEIPT = OUT / "p23-p24-perm-timeline-review-v1-build.json"
START = 444.0
END = 482.0
FPS = 30

SEGMENTS = [
    {"start": 444.0, "end": 447.0, "source": "assets/episodes/ep-03/comic/ep03-scene-08-elle-file-comic-rebalance-v1.png", "visible_description": "Elle studies the testimony against a visible timeline, looking for the detail that does not fit.", "narration": "She's waiting for the detail that doesn't fit."},
    {"start": 447.0, "end": 454.0, "source": "assets/episodes/ep-03/comic/ep03-scene-08b-chutney-stand-comic.png", "visible_description": "Chutney sits on the stand with her shower timeline in front of her.", "narration": "If you know one thing about perms, you know you do not wash a fresh one."},
    {"start": 454.0, "end": 460.7, "source": "assets/episodes/ep-03/comic/ep03-concept-verification-comic.png", "visible_description": "The Verification card makes domain knowledge, contradiction, timeline and receipts visible as the alibi collapses.", "narration": "The fresh-perm contradiction destroys the alibi and the hair in the same afternoon."},
    {"start": 460.7, "end": 466.8, "source": "assets/episodes/ep-03/comic/ep03-emph-chutney-elle-comic.png", "visible_description": "The principle card contrasts Chutney repeating an answer with Elle checking the timeline.", "narration": "One tiny beauty-world rule nobody took seriously, and the story falls apart. With AI, that's the job."},
    {"start": 466.8, "end": 475.0, "source": "assets/episodes/ep-03/comic/ep03-scene-11-chutney-thrice-montage-comic-v3-textfix.png", "visible_description": "Three nearly identical Chutney panels repeat the same polished shower alibi three times.", "narration": "Do not ask whether it sounds smart. Chutney sounded smart three times."},
    {"start": 475.0, "end": 482.0, "source": "assets/episodes/ep-03/comic/ep03-scene-08-elle-file-comic-rebalance-v1.png", "visible_description": "Elle points to the exact break in the timeline rather than accepting a confident repetition.", "narration": "Ask what one detail cannot survive contact with the timeline."},
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
        raise RuntimeError("Repair sequence does not cover the exact p23-p24 window")
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
    filters, labels = [], []
    for index, segment in enumerate(SEGMENTS):
        label = f"v{index}"
        filters.append(f"[{index}:v]scale=2000:1125:force_original_aspect_ratio=increase,crop=2000:1125,zoompan=z='min(zoom+0.00020,1.035)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={segment['frames']}:s=1920x1080:fps={FPS},setsar=1,format=yuv420p,trim=duration={segment['duration_seconds']:.3f},setpts=PTS-STARTPTS[{label}]")
        labels.append(f"[{label}]")
    filters.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=0[vout]")
    audio_index = len(SEGMENTS)
    command += ["-filter_complex", ";".join(filters), "-map", "[vout]", "-map", f"{audio_index}:a:0", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", str(FPS), "-fps_mode", "cfr", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", f"{END - START:.3f}", "-movflags", "+faststart", "-metadata", "comment=LOCAL EPISODE 03 P23-P24 REVIEW SEQUENCE — NO RELEASE AUTHORITY", str(OUTPUT)]
    run(command)

    midpoint_inputs = []
    for segment in SEGMENTS:
        midpoint_inputs += ["-ss", f"{(segment['start'] + segment['end']) / 2 - START:.3f}", "-i", str(OUTPUT)]
    labels, filters = [], []
    for index in range(len(SEGMENTS)):
        filters.append(f"[{index}:v]scale=320:180[t{index}]")
        labels.append(f"[t{index}]")
    filters.append("".join(labels) + "xstack=inputs=6:layout=0_0|320_0|640_0|960_0|1280_0|1600_0[out]")
    run([str(FFMPEG), "-y", *midpoint_inputs, "-filter_complex", ";".join(filters), "-map", "[out]", "-frames:v", "1", str(CONTACT)])

    receipt = {"status": "BUILT_LOCALLY_INDEPENDENT_REVIEW_REQUIRED", "publication_authority": False, "master": {"path": str(MASTER.relative_to(ROOT)), "sha256": MASTER_SHA256}, "window": {"occurrences": "p23-p24", "start_seconds": START, "end_seconds": END, "duration_seconds": END - START}, "sequence": {"path": str(OUTPUT.relative_to(ROOT)), "sha256": sha256(OUTPUT)}, "contact_sheet": {"path": str(CONTACT.relative_to(ROOT)), "sha256": sha256(CONTACT)}, "segments": SEGMENTS, "editorial_decision": "Replace two long static cards with six narration-specific beats that move from Elle's timeline through the fresh-perm contradiction, repeated confident alibis and back to the exact detail that fails. Existing approved Episode 03 art carries the meaning; continuous camera motion is secondary.", "next_gate": "deterministic duration/audio/scene-order checks, contact-sheet inspection and independent normal-speed narration-picture review before successor assembly"}
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt["sequence"], indent=2))

if __name__ == "__main__":
    build()
