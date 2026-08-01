#!/usr/bin/env python3
"""Build narration-aligned Episode 03 repair review sequences.

These are review clips, not release masters. Each sequence keeps the exact audio
from the admitted Episode 03 v13 parent while replacing only the picture track
at caption-derived boundaries. The outputs make the proposed timing repair
audible and visible at normal speed before any full-master reassembly.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4"
CAPTIONS = ROOT / "assets/captions/episode-03.vtt"
ASSET_ROOT = ROOT / "assets/episodes/ep-03/comic"
OUT = ROOT / "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01"
SEQUENCE_DIR = OUT / "review-sequences"
EVIDENCE_DIR = OUT / "review-evidence"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def still_input(path: Path) -> list[str]:
    return ["-loop", "1", "-framerate", "30", "-i", str(path)]


def loop_input(path: Path) -> list[str]:
    return ["-stream_loop", "-1", "-i", str(path)]


def still_filter(input_index: int, duration: float, label: str, crop: str | None = None) -> str:
    chain = f"[{input_index}:v]"
    if crop:
        chain += f"crop={crop},"
    chain += (
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x25102a,"
        f"fps=30,trim=duration={duration:.3f},setpts=PTS-STARTPTS,format=yuv420p[{label}]"
    )
    return chain


def video_filter(input_index: int, duration: float, label: str) -> str:
    return (
        f"[{input_index}:v]"
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x25102a,"
        f"fps=30,trim=duration={duration:.3f},setpts=PTS-STARTPTS,format=yuv420p[{label}]"
    )


def build_sequence(spec: dict) -> Path:
    output = SEQUENCE_DIR / spec["filename"]
    target_frames = round((spec["end"] - spec["start"]) * 30)
    command = [str(FFMPEG), "-y", "-i", str(MASTER)]
    filters: list[str] = []
    labels: list[str] = []

    for index, segment in enumerate(spec["segments"], start=1):
        source = ROOT / segment["source"]
        command.extend(loop_input(source) if segment["kind"] == "video" else still_input(source))
        label = f"v{index}"
        labels.append(label)
        if segment["kind"] == "video":
            filters.append(video_filter(index, segment["duration"], label))
        else:
            filters.append(
                still_filter(index, segment["duration"], label, segment.get("crop"))
            )

    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"concat=n={len(labels)}:v=1:a=0[joined]"
    )
    filters.append(
        "[joined]tpad=stop_mode=clone:stop_duration=0.200,"
        f"trim=end_frame={target_frames},"
        "setpts=N/(30*TB)[video]"
    )
    filters.append(
        f"[0:a]atrim=start={spec['start']:.3f}:end={spec['end']:.3f},"
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
            str(output),
        ]
    )
    run(command)
    return output


def make_contact_sheet(video: Path, duration: float, output: Path) -> None:
    times = [0.5, duration / 2, max(0.5, duration - 0.5)]
    command = [str(FFMPEG), "-y"]
    for timestamp in times:
        command.extend(["-ss", f"{timestamp:.3f}", "-i", str(video)])
    command.extend(
        [
            "-filter_complex",
            "[0:v]scale=640:360[a];[1:v]scale=640:360[b];[2:v]scale=640:360[c];"
            "[a][b][c]hstack=inputs=3[out]",
            "-map",
            "[out]",
            "-frames:v",
            "1",
            "-update",
            "1",
            "-q:v",
            "2",
            str(output),
        ]
    )
    run(command)


def make_segment_contact_sheet(spec: dict, video: Path, output: Path) -> None:
    frame_numbers = []
    for segment in spec["segments"]:
        midpoint = ((segment["start"] + segment["end"]) / 2) - spec["start"]
        frame_numbers.append(max(0, round(midpoint * 30)))
    selector = "+".join(f"eq(n\\,{frame})" for frame in frame_numbers)
    run(
        [
            str(FFMPEG),
            "-y",
            "-i",
            str(video),
            "-vf",
            f"select='{selector}',scale=480:270,tile=4x2:padding=4:margin=4:color=0x25102a",
            "-fps_mode",
            "vfr",
            "-frames:v",
            "1",
            "-update",
            "1",
            "-q:v",
            "2",
            str(output),
        ]
    )


SEQUENCES = [
    {
        "id": "fake-citation-to-blue-hoodie",
        "filename": "p17-p20-fake-citation-to-blue-hoodie-review-v1.mp4",
        "start": 326.738,
        "end": 400.990,
        "occurrences": ["p17", "p18", "p19", "p20"],
        "purpose": "Place claims, fake citations, wrong-room examples and the blue-hoodie payoff on the exact narration they illustrate.",
        "segments": [
            {
                "start": 326.738,
                "end": 339.690,
                "duration": 12.952,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-concept-claim-comic.png",
                "narration": "Claims need receipts; obvious wrong answers are easy to spot.",
            },
            {
                "start": 339.690,
                "end": 356.080,
                "duration": 16.390,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-emph-fake-citation-comic.png",
                "narration": "The fake citation and boyfriend-at-another-school analogy.",
            },
            {
                "start": 356.080,
                "end": 372.750,
                "duration": 16.670,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-scene-07b-wrong-room-comic-rebalance-v1.png",
                "crop": "960:540:0:0",
                "narration": "A real answer in the wrong room: U.S. HR advice in a Canadian workplace.",
            },
            {
                "start": 372.750,
                "end": 377.390,
                "duration": 4.640,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-scene-07b-wrong-room-comic-rebalance-v1.png",
                "crop": "960:540:960:0",
                "narration": "Last year's pricing.",
            },
            {
                "start": 377.390,
                "end": 383.487,
                "duration": 6.097,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-scene-07b-wrong-room-comic-rebalance-v1.png",
                "crop": "960:540:0:540",
                "narration": "What people talked about instead of what they decided.",
            },
            {
                "start": 383.487,
                "end": 389.810,
                "duration": 6.323,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-scene-07b-wrong-room-comic-rebalance-v1.png",
                "crop": "960:540:960:540",
                "narration": "Technically true, except the exception is what matters.",
            },
            {
                "start": 389.810,
                "end": 400.990,
                "duration": 11.180,
                "kind": "video",
                "source": "assets/episodes/ep-03/comic/ep03-cue17-canva-ambient-loop-v1.mp4",
                "narration": "The blue-hoodie payoff: she doesn't even go here.",
            },
        ],
    },
    {
        "id": "three-piles-to-law-clerk",
        "filename": "p25-p30-three-piles-to-law-clerk-review-v1.mp4",
        "start": 477.190,
        "end": 582.390,
        "occurrences": ["p25", "p26", "p27", "p28", "p29", "p30"],
        "purpose": "Restore the question-check, draft/claim/receipt sequence, Elle analogy and law-clerk payoff to their exact narration.",
        "segments": [
            {
                "start": 477.190,
                "end": 498.670,
                "duration": 21.480,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-concept-verification-comic.png",
                "narration": "Ask for the date, quote, source and number behind the answer.",
            },
            {
                "start": 498.670,
                "end": 503.910,
                "duration": 5.240,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-scene-08-elle-file-comic-rebalance-v1.png",
                "narration": "Do not be Chutney on the stand; be Elle with the timeline.",
            },
            {
                "start": 503.910,
                "end": 515.610,
                "duration": 11.700,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-concept-draft-comic.png",
                "narration": "The three-pile system begins with a draft.",
            },
            {
                "start": 515.610,
                "end": 525.650,
                "duration": 10.040,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-concept-claim-comic.png",
                "narration": "A claim is a name, date, number, quote or consequential assertion that needs checking.",
            },
            {
                "start": 525.650,
                "end": 533.450,
                "duration": 7.800,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-concept-receipt-comic.png",
                "narration": "A receipt is what lets you prove the claim.",
            },
            {
                "start": 533.450,
                "end": 540.310,
                "duration": 6.860,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-emph-draft-outfit-comic.png",
                "narration": "A draft is an outfit. A claim is an alibi. Dress accordingly.",
            },
            {
                "start": 540.310,
                "end": 558.310,
                "duration": 18.000,
                "kind": "still",
                "source": "assets/episodes/ep-03/comic/ep03-scene-08-elle-file-comic-rebalance-v1.png",
                "narration": "Elle finds the detail that does not hold up and wins with her name on the work.",
            },
            {
                "start": 558.310,
                "end": 582.390,
                "duration": 24.080,
                "kind": "video",
                "source": "assets/episodes/ep-03/comic/delivery-20260726-cue30-law-library-repair-v1/ep03-cue30-law-library-lamp-dust-zero-net-loop-v1.mp4",
                "narration": "The machine did the library work and drafted the brief; the human still reads, checks and decides.",
            },
        ],
    },
]


def main() -> None:
    SEQUENCE_DIR.mkdir(parents=True, exist_ok=True)
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    outputs = []
    for spec in SEQUENCES:
        video = build_sequence(spec)
        duration = round(spec["end"] - spec["start"], 3)
        contact = EVIDENCE_DIR / video.with_suffix(".jpg").name
        make_contact_sheet(video, duration, contact)
        segment_contact = EVIDENCE_DIR / f"{spec['id']}-all-segments.jpg"
        make_segment_contact_sheet(spec, video, segment_contact)
        outputs.append(
            {
                "id": spec["id"],
                "path": str(video.relative_to(ROOT)),
                "sha256": sha256(video),
                "duration_seconds": duration,
                "contact_sheet": str(contact.relative_to(ROOT)),
                "contact_sheet_sha256": sha256(contact),
                "all_segments_contact_sheet": str(segment_contact.relative_to(ROOT)),
                "all_segments_contact_sheet_sha256": sha256(segment_contact),
                "occurrences": spec["occurrences"],
                "purpose": spec["purpose"],
                "segments": spec["segments"],
            }
        )

    manifest = {
        "schema_version": "1.0",
        "episode": "03",
        "status": "BUILT_LOCALLY_NORMAL_SPEED_REVIEW_REQUIRED",
        "release_authority": "NONE",
        "timing_policy": {
            "audio": "Exact parent-master audio between the caption-derived sequence boundaries.",
            "picture": "Thirty-frame-per-second picture normalized to the same boundary window.",
            "frame_grid_tolerance": "The picture tail may end no more than two 30 fps frames before the exact audio boundary when fractional caption edits cannot map exactly to the frame grid; the MP4 container must still match the exact boundary duration within 0.01 seconds.",
        },
        "parent_master": {
            "path": str(MASTER.relative_to(ROOT)),
            "sha256": sha256(MASTER),
        },
        "captions": {
            "path": str(CAPTIONS.relative_to(ROOT)),
            "sha256": sha256(CAPTIONS),
        },
        "outputs": outputs,
        "acceptance_remaining": [
            "One complete 1x audible owner watch of the reassembled Episode 03 candidate.",
            "Independent reviewer verdict under the universal narration-picture gate.",
            "Exact placement-manifest and master checksums for any accepted v14 assembly.",
            "Publication/release authority remains separate and is not implied by these files.",
        ],
    }
    (OUT / "repair-production-manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
