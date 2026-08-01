#!/usr/bin/env python3
"""Recover the original full Ada scene into exact Episode 04 audio context.

This produces a local review artifact only.  It does not assemble, accept or
release an Episode 04 successor master.  The picture is the previously built
96-second Ada v4 scene; the audio is extracted from the checksum-bound v9
reference master over the original p18-p20 window.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import cv2
import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
SOURCE = ROOT / "assets/episodes/ep-04/pixel/ep04-scene-03-ada-narration-sync-v4-story.mp4"
SOURCE_BUILDER = ROOT / "assets/episodes/ep-04/pixel/.build_scene03_v4.py"
MASTER = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
OUT_DIR = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences"
OUTPUT = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1.mp4"
CONTACT = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1-contact-sheet.jpg"
TIMELINE_CONTACT = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1-timeline-contact-sheet.jpg"
BUILD_RECEIPT = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1-build.json"

EXPECTED = {
    SOURCE: "fbeea76fe689fe48ef3cf935cfea3dd98ce944cc671f9776cb261b197280881c",
    SOURCE_BUILDER: "5e45280c9c08d7b144dd789baaee16c92fa63cafe1b126ea4cc4262f8a183705",
    MASTER: "d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4",
}

# The original cue ends at 341.550.  Its 30 fps picture builder deliberately
# emitted 2,888 frames, so the bound review endpoint is the next frame boundary.
CUE_START = 245.300
CUE_END = 341.550
FRAME_ALIGNED_END = CUE_START + 2888 / 30

SHOTS = [
    {
        "local_seconds": [0.0, 13.0],
        "picture": "Ada and the Analytical Engine, wide; rain and candlelight move while the camera settles toward the machine.",
        "narration_job": "Return to the 1840s and establish the young woman facing a giant mechanical calculator.",
        "maker_disposition": "PASS_PENDING_INDEPENDENT_REVIEW",
    },
    {
        "local_seconds": [13.0, 25.0],
        "picture": "A closer Ada-and-engine composition holds her identity and the period machinery.",
        "narration_job": "Move from the machine's arithmetic purpose to Ada seeing something beyond an adding machine.",
        "maker_disposition": "PASS_PENDING_INDEPENDENT_REVIEW",
    },
    {
        "local_seconds": [25.0, 37.0],
        "picture": "The Analytical Engine and punched-card mechanism take over the frame.",
        "narration_job": "Show that written instructions can direct the machine.",
        "maker_disposition": "PASS_PENDING_INDEPENDENT_REVIEW",
    },
    {
        "local_seconds": [37.0, 48.0],
        "picture": "A second machinery view advances through the engine and its instruction path.",
        "narration_job": "Carry the explanation from precise instructions to numbers being only the beginning.",
        "maker_disposition": "PASS_PENDING_INDEPENDENT_REVIEW",
    },
    {
        "local_seconds": [48.0, 60.0],
        "picture": "A distinct end-state machine composition emphasizes the cards, mechanisms and symbolic system.",
        "narration_job": "Support symbols, music and making things no one had made before.",
        "maker_disposition": "PASS_PENDING_INDEPENDENT_REVIEW",
    },
    {
        "local_seconds": [60.0, 72.0],
        "picture": "The machine is shown closer while its cards and mechanisms remain legible.",
        "narration_job": "Support the step-by-step method and the machine's instruction-following limit.",
        "maker_disposition": "CLOSE_ENOUGH_PENDING_INDEPENDENT_REVIEW",
        "review_note": "The same machine imagery supports both the method and the limit, but does not literally render Ada's quoted capability boundary.",
    },
    {
        "local_seconds": [72.0, 84.0],
        "picture": "The scene returns to Ada beside the Analytical Engine in a stable wide view.",
        "narration_job": "Identify Ada and bridge from her warning to the 1843 algorithm.",
        "maker_disposition": "PASS_PENDING_INDEPENDENT_REVIEW",
    },
    {
        "local_seconds": [84.0, 96.266667],
        "picture": "A final closer view holds Ada with the machine and punched card.",
        "narration_job": "Close on the first algorithm and the later erasure of Ada's credit.",
        "maker_disposition": "CLOSE_ENOUGH_PENDING_HYBRID_DECISION",
        "review_note": "Ada remains on screen and the sequence preserves her authorship, but the credit-erasure claim may deserve the separate evidence/erasure beat in the newer v2 alternate cut.",
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


def probe(path: Path, has_audio: bool) -> dict:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"Could not probe video: {path}")
    width = int(round(capture.get(cv2.CAP_PROP_FRAME_WIDTH)))
    height = int(round(capture.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    fps = float(capture.get(cv2.CAP_PROP_FPS))
    frames = int(round(capture.get(cv2.CAP_PROP_FRAME_COUNT)))
    capture.release()
    streams = [
        {
            "index": 0,
            "codec_type": "video",
            "width": width,
            "height": height,
            "r_frame_rate": f"{round(fps)}/1",
            "nb_frames": str(frames),
        }
    ]
    if has_audio:
        streams.append({"index": 1, "codec_type": "audio", "codec_name": "aac"})
    return {
        "format": {"duration": f"{frames / fps:.6f}"},
        "streams": streams,
        "probe_method": "OpenCV frame geometry/count; audio codec is fixed by this builder and decoded separately by the validator.",
    }


def assert_sources() -> dict[str, str]:
    hashes: dict[str, str] = {}
    for path, expected in EXPECTED.items():
        if not path.exists():
            if path == SOURCE:
                raise FileNotFoundError(
                    f"Recovered Ada scene is missing: {path}. Rebuild it with {SOURCE_BUILDER}."
                )
            raise FileNotFoundError(path)
        actual = sha256(path)
        if actual != expected:
            raise RuntimeError(f"Source drift for {path}: expected {expected}, got {actual}")
        hashes[str(path.relative_to(ROOT))] = actual
    return hashes


def build_contact_sheet(path: Path, timestamps: list[float], columns: int) -> None:
    command = [str(FFMPEG), "-y"]
    for timestamp in timestamps:
        command.extend(["-ss", f"{timestamp:.6f}", "-i", str(OUTPUT)])
    rows = (len(timestamps) + columns - 1) // columns
    labels: list[str] = []
    filters: list[str] = []
    for index in range(len(timestamps)):
        label = f"v{index}"
        labels.append(label)
        filters.append(f"[{index}:v]scale=480:270[{label}]")
    layout = "|".join(
        f"{(index % columns) * 480}_{(index // columns) * 270}"
        for index in range(len(timestamps))
    )
    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"xstack=inputs={len(labels)}:layout={layout}:fill=0x25102a[out]"
    )
    command.extend(
        [
            "-filter_complex",
            ";".join(filters),
            "-map",
            "[out]",
            "-frames:v",
            "1",
            "-update",
            "1",
            "-q:v",
            "2",
            str(path),
        ]
    )
    run(command)


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    source_hashes = assert_sources()

    target_frames = 2888
    run(
        [
            str(FFMPEG),
            "-y",
            "-i",
            str(SOURCE),
            "-i",
            str(MASTER),
            "-filter_complex",
            (
                f"[0:v]trim=end_frame={target_frames},setpts=N/(30*TB),format=yuv420p[video];"
                f"[1:a]atrim=start={CUE_START:.3f}:end={FRAME_ALIGNED_END:.6f},"
                "asetpts=PTS-STARTPTS[audio]"
            ),
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
            str(OUTPUT),
        ]
    )

    shot_midpoints = [(shot["local_seconds"][0] + shot["local_seconds"][1]) / 2 for shot in SHOTS]
    build_contact_sheet(CONTACT, shot_midpoints, columns=4)
    build_contact_sheet(
        TIMELINE_CONTACT,
        [min(95.5, 3.0 + 6.0 * index) for index in range(16)],
        columns=4,
    )

    receipt = {
        "status": "RECOVERED_PRIOR_SEQUENCE_LOCAL_REVIEW_ONLY",
        "authority": "NO_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "created_from": "The July 15 full Ada narration-synced v4 scene that later full-episode assemblers bypassed in favour of short cue clips.",
        "cue_window_seconds": [CUE_START, CUE_END],
        "frame_aligned_audio_window_seconds": [CUE_START, round(FRAME_ALIGNED_END, 6)],
        "frame_alignment_note": "The prior scene is 2,888 frames at 30 fps; the frame-aligned endpoint is 0.016667 seconds after the cue boundary.",
        "source_hashes": source_hashes,
        "source_probe": probe(SOURCE, has_audio=False),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "output_probe": probe(OUTPUT, has_audio=True),
        "contact_sheet": str(CONTACT.relative_to(ROOT)),
        "contact_sheet_sha256": sha256(CONTACT),
        "timeline_contact_sheet": str(TIMELINE_CONTACT.relative_to(ROOT)),
        "timeline_contact_sheet_sha256": sha256(TIMELINE_CONTACT),
        "shots": SHOTS,
        "candidate_priority": "RECOVERED_CANONICAL_PRIOR_SEQUENCE; compare its final capability-limit and credit-erasure beats with the newer v2 alternate before assembling a successor.",
        "required_gate": [
            "independent exact-audio narration-picture review at normal speed",
            "independent Ada identity, historical-detail and artifact review",
            "independent shot-progression, subtle-motion and transition review",
            "explicit decision on whether to hybridize the final capability-limit and credit-erasure beats with the v2 alternate",
            "responsive-player crop and full-audible-watch review after successor assembly",
        ],
    }
    BUILD_RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    build()
