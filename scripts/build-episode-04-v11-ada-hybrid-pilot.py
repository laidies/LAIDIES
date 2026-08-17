#!/usr/bin/env python3
"""Build the frame-accurate Episode 04 v11 Ada hybrid pilot.

This creates a local review clip only. It preserves one uninterrupted audio
window from the exact v10 master, retains the recovered moving Ada sequence
through frame 1569, and uses only the capability/evidence/credit portion of the
v2 alternate thereafter.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
ICLOUD = Path("/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage")
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
OUT = ROOT / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
RECOVERED = ICLOUD / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p18-p20-ada-recovered-v4-review-v1.mp4"
EVIDENCE = ICLOUD / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences/p19-p20-ada-narration-review-v2.mp4"
MASTER = ICLOUD / "assets/video/episode-04-full-v10-repaired-review.mp4"
TIMING = ICLOUD / "operations/captions/episode-04-timing-map.json"
VTT = ICLOUD / "assets/captions/episode-04.vtt"
OUTPUT = OUT / "episode-04-v11-ada-hybrid-pilot-review.mp4"
CONTACT = OUT / "episode-04-v11-ada-hybrid-pilot-contact-sheet.jpg"
MANIFEST = OUT / "episode-04-v11-ada-hybrid-pilot-manifest.json"

EXPECTED = {
    RECOVERED: "b4200b1f76157ca63ff13011491d8e6a3a787c8960a3f0ed12d48edec622a5cc",
    EVIDENCE: "9c8fc6644c3a977452714e528b0d95b8d80f932f1a04cd97221256ae4aa85764",
    MASTER: "9fc40d965cf67e089f6e2f540405ba0b3ae833fe6532d2cbb1831a5903d57bfb",
    TIMING: "0f12086de595de6f901872362b86b442b11d8c1e24051280ba4f124314b079ca",
    VTT: "1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4",
}

PROGRAM_START = 245.300
PROGRAM_END = 341.566667
TARGET_FRAMES = 2888


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def verify_inputs() -> dict[str, str]:
    observed = {}
    for path, expected in EXPECTED.items():
        actual = sha256(path)
        if actual != expected:
            raise RuntimeError(f"Input drift for {path}: expected {expected}, observed {actual}")
        observed[str(path)] = actual
    return observed


def build() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    inputs = verify_inputs()
    filters = [
        "[0:v]trim=start_frame=0:end_frame=1570,setpts=N/(30*TB),format=yuv420p[v0]",
        "[1:v]trim=start_frame=1420:end_frame=2047,setpts=N/(30*TB),format=yuv420p[v1]",
        "[1:v]trim=start_frame=2047:end_frame=2433,setpts=N/(30*TB),format=yuv420p[v2]",
        "[1:v]trim=start_frame=2433:end_frame=2736,setpts=N/(30*TB),format=yuv420p[v3raw]",
        "[v3raw]tpad=stop_mode=clone:stop=2,setpts=N/(30*TB)[v3]",
        "[v0][v1][v2][v3]concat=n=4:v=1:a=0[video]",
        f"[2:a]atrim=start={PROGRAM_START:.6f}:end={PROGRAM_END:.6f},asetpts=PTS-STARTPTS[audio]",
    ]
    command = [
        str(FFMPEG), "-y", "-i", str(RECOVERED), "-i", str(EVIDENCE), "-i", str(MASTER),
        "-filter_complex", ";".join(filters), "-map", "[video]", "-map", "[audio]",
        "-fps_mode", "passthrough", "-frames:v", str(TARGET_FRAMES), "-c:v", "libx264", "-preset", "medium",
        "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart", str(OUTPUT),
    ]
    run(command)

    decoded_frames, decoded_seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded_frames != TARGET_FRAMES:
        raise RuntimeError(f"Output frame-count failure: expected {TARGET_FRAMES}, observed {decoded_frames}")
    if abs(decoded_seconds - (TARGET_FRAMES / 30)) > (1 / 30):
        raise RuntimeError(f"Output duration failure: expected {TARGET_FRAMES / 30:.6f}, observed {decoded_seconds:.6f}")

    sample_times = [6.5, 31.0, 51.8, 62.5, 76.0, 90.5]
    contact_command = [str(FFMPEG), "-y"]
    for timestamp in sample_times:
        contact_command.extend(["-ss", f"{timestamp:.3f}", "-i", str(OUTPUT)])
    contact_command.extend([
        "-filter_complex",
        ";".join(
            [f"[{index}:v]scale=480:270[v{index}]" for index in range(len(sample_times))]
            + ["[v0][v1][v2][v3][v4][v5]xstack=inputs=6:layout=0_0|480_0|960_0|0_270|480_270|960_270:fill=0x10152f[out]"]
        ),
        "-map", "[out]", "-frames:v", "1", "-update", "1", "-q:v", "2", str(CONTACT),
    ])
    run(contact_command)

    manifest = {
        "status": "BUILT_LOCALLY_MAKER_REVIEW_REQUIRED",
        "authority": "NO_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "candidateId": "EP04-V11-ADA-HYBRID-PILOT-20260816",
        "programmeWindowSeconds": [PROGRAM_START, PROGRAM_END],
        "geometry": "1920x1080",
        "frameRate": 30,
        "targetFrames": TARGET_FRAMES,
        "inputs": inputs,
        "picturePlan": [
            {"outputFrames": [0, 1570], "source": str(RECOVERED), "sourceFrames": [0, 1570], "job": "moving Ada and Engine explanation through method"},
            {"outputFrames": [1570, 2197], "source": str(EVIDENCE), "sourceFrames": [1420, 2047], "job": "capability-limit evidence"},
            {"outputFrames": [2197, 2583], "source": str(EVIDENCE), "sourceFrames": [2047, 2433], "job": "1843 and Note G evidence"},
            {"outputFrames": [2583, 2888], "source": str(EVIDENCE), "sourceFrames": [2433, 2736], "finalFrameHold": 2, "job": "credit-erasure evidence; final source frame held for two frames to meet the recovered programme clock"}
        ],
        "audio": {"source": str(MASTER), "seconds": [PROGRAM_START, PROGRAM_END], "continuousSingleTrim": True},
        "captions": {"canonicalExternalVtt": str(VTT), "sha256": EXPECTED[VTT], "modified": False},
        "output": str(OUTPUT.relative_to(ROOT)),
        "outputSha256": sha256(OUTPUT),
        "decodedFrames": decoded_frames,
        "decodedDurationSeconds": decoded_seconds,
        "contactSheet": str(CONTACT.relative_to(ROOT)),
        "contactSheetSha256": sha256(CONTACT),
        "requiredNextGate": "maker full-size and 1x sound-on inspection, then role-distinct Episode Media Quality review"
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    build()
