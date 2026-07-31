#!/usr/bin/env python3
"""Make a picture-only welcome-ident successor of the frozen Episode 02 v19 review master.

This builder deliberately changes one canonical spoken interval only.  It re-encodes
the picture stream for the splice and stream-copies the existing AAC elementary
stream.  It neither alters public media nor claims acceptance/release authority.
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OPS = ROOT / "operations"
FFMPEG = Path.home() / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
TASK_ID = "WE-MEDIA-E02-WELCOME-IDENT-V1-2026-07-26"
BASE = HERE / "episode-02-full-v19-style-semantic-repaired-review.mp4"
IDENT = OPS / "design-explorations/laidies-motion-ident-20260725/continuous-i-episode-02-tell-me-what-you-want-v1.mp4"
VTT = OPS / "captions/episode-02.vtt"
TIMING_MAP = OPS / "captions/episode-02-timing-map.json"
OUT = HERE / "episode-02-full-v19-welcome-ident-v1-review.mp4"
WORK = HERE / ".episode-02-full-v19-welcome-ident-v1.rendering.mp4"
QA_DIR = OPS / "video-qa/episode-02-v19-welcome-ident-v1"
CONFIG = QA_DIR / "config.json"
MANIFEST = QA_DIR / "manifest.json"
QC = QA_DIR / "qc.json"
WINDOW = QA_DIR / "episode-02-welcome-ident-review-window-88-102.mp4"
START, END, FPS, OUTPUT_END = 91.340, 98.590, 30, 987.466667
BASE_SHA = "e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3"
IDENT_SHA = "ea5addbad951281602373cfde8d4264326e557a57b63ea2df218d0697316f138"


def run(args: list[str], allow_failure: bool = False) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(args, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode and not allow_failure:
        raise RuntimeError("command failed:\n" + " ".join(args) + "\n" + result.stderr[-4000:])
    return result


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    return {"path": str(path.relative_to(ROOT)), "sha256": sha256(path), "size_bytes": path.stat().st_size}


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n")


def info(path: Path) -> str:
    result = run([str(FFMPEG), "-hide_banner", "-i", str(path)], allow_failure=True)
    return result.stderr + result.stdout


def duration(path: Path) -> float:
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", info(path))
    if not match:
        raise RuntimeError(f"Unable to read duration: {path}")
    return int(match[1]) * 3600 + int(match[2]) * 60 + float(match[3])


def audio_hash(path: Path, destination: Path) -> str:
    run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(path), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(destination)])
    return sha256(destination)


def canonical_caption() -> dict[str, object]:
    entries = json.loads(TIMING_MAP.read_text())
    match = next((x for x in entries if x["start"] == START and x["end"] == END and "Welcome back to LAiDIES" in x["text"]), None)
    if not match:
        raise RuntimeError("Canonical Episode 02 welcome caption interval is not bound")
    return match


def make_config() -> dict[str, object]:
    caption = canonical_caption()
    config = {
        "schema": "laidies.episode-02.welcome-ident.config.v1",
        "task_id": TASK_ID,
        "status": "BUILDING_LOCAL_REVIEW_SUCCESSOR_ONLY",
        "baseline": record(BASE),
        "ident": {**record(IDENT), "source_dimensions": "960x540", "source_duration_seconds": duration(IDENT), "source_audio_tracks": 0},
        "caption": {"source": str(VTT.relative_to(ROOT)), "timing_map": str(TIMING_MAP.relative_to(ROOT)), "exact_entry": caption},
        "replacement": {
            "start_seconds": START, "end_seconds": END, "duration_seconds": round(END - START, 6),
            "operation": "replace baseline picture only; scale ident 2x to 1920x1080 without crop; hold final ident frame for remaining 0.770 seconds",
            "audio_operation": "copy exact frozen-v19 AAC elementary packet stream",
            "out_of_scope_operation": "baseline picture timeline retained before 91.340 and after 98.590 seconds",
        },
        "output": {"path": str(OUT.relative_to(ROOT)), "status": "LOCAL_REVIEW_ONLY_NOT_PUBLIC"},
    }
    write_json(CONFIG, config)
    return config


def validate(config: dict[str, object]) -> None:
    if not FFMPEG.is_file() or sha256(BASE) != BASE_SHA or sha256(IDENT) != IDENT_SHA:
        raise RuntimeError("Frozen baseline, exact ident, or FFmpeg binding failed")
    if abs(float(config["replacement"]["duration_seconds"]) - 7.25) > 0.000001:
        raise RuntimeError("Welcome interval must remain exactly 91.340–98.590")
    if duration(IDENT) > END - START:
        raise RuntimeError("Ident cannot be silently truncated")


def render() -> None:
    # tpad is a frozen final-frame hold, allowing the exact ident to occupy the
    # complete spoken interval without a second visual source or a temporal crop.
    graph = (
        f"[0:v]trim=0:{START:.6f},setpts=PTS-STARTPTS[vpre];"
        f"[1:v]setpts=PTS-STARTPTS,scale=1920:1080:flags=lanczos,setsar=1,"
        f"tpad=stop_mode=clone:stop_duration={END - START - duration(IDENT):.6f},trim=duration={END - START:.6f},setpts=PTS-STARTPTS[vident];"
        f"[0:v]trim=start={END:.6f},setpts=PTS-STARTPTS[vpost];"
        "[vpre][vident][vpost]concat=n=3:v=1:a=0,fps=30,format=yuv420p[v]"
    )
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "warning", "-i", str(BASE), "-i", str(IDENT),
        "-filter_complex", graph, "-map", "[v]", "-map", "0:a:0", "-map_metadata", "0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "copy", "-r", "30", "-video_track_timescale", "15360",
        "-movflags", "+faststart", "-t", f"{OUTPUT_END:.6f}", str(WORK),
    ])


def qa(config: dict[str, object]) -> None:
    if abs(duration(WORK) - OUTPUT_END) > 0.04:
        raise RuntimeError("Candidate duration differs from frozen v19 runtime")
    output_info = info(WORK)
    if "1920x1080" not in output_info or "Video: h264" not in output_info or "Audio: aac" not in output_info:
        raise RuntimeError("Candidate stream shape is wrong")
    decode = run([str(FFMPEG), "-v", "error", "-i", str(WORK), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"], allow_failure=True)
    if decode.returncode:
        raise RuntimeError("Full AV decode failed: " + decode.stderr[-2000:])
    with tempfile.TemporaryDirectory(prefix="e02-ident-qc-") as temp:
        temp_path = Path(temp)
        baseline_audio = audio_hash(BASE, temp_path / "base.aac")
        candidate_audio = audio_hash(WORK, temp_path / "candidate.aac")
    if baseline_audio != candidate_audio:
        raise RuntimeError("Exact frozen-v19 AAC packet stream was not preserved")
    # This is intentionally a review convenience only; all visual acceptance is independent.
    run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-ss", "88", "-i", str(WORK), "-t", "14", "-map", "0:v:0", "-map", "0:a:0", "-c:v", "libx264", "-crf", "18", "-c:a", "aac", str(WINDOW)])
    WORK.replace(OUT)
    manifest = {
        "schema": "laidies.episode-02.welcome-ident.review-manifest.v1", "task_id": TASK_ID,
        "status": "BUILT_LOCALLY_REVIEW_REQUIRED_NOT_ADMITTED_NOT_PUBLIC", "baseline": record(BASE),
        "ident": record(IDENT), "config": record(CONFIG), "builder": record(Path(__file__)),
        "caption": config["caption"], "replacement": config["replacement"], "output": record(OUT),
        "review_window": {**record(WINDOW), "start_seconds": 88, "duration_seconds": 14},
        "verification": {"full_decode": "PASS", "runtime_matches_frozen_v19": True,
                         "audio_adts_sha256_frozen_v19": baseline_audio, "audio_adts_sha256_output": candidate_audio,
                         "audio_elementary_stream_identical": True,
                         "out_of_scope_semantics": "structurally retained by baseline trim/concat; candidate must be independently watched"},
        "authority": {"maker_may_accept": False, "release": False, "deploy": False, "public": False},
    }
    write_json(MANIFEST, manifest)
    qc = {
        "schema": "laidies.episode-02.welcome-ident.qc.v1", "task_id": TASK_ID,
        "status": "VERIFIED_LOCALLY_AWAITING_INDEPENDENT_EMQ_REVIEW", "manifest": record(MANIFEST),
        "checks": {"full_decode": "PASS", "runtime": "PASS", "audio_elementary_stream_copy": "PASS", "replacement_interval": "PASS"},
        "independent_emq_evidence_target": "operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-welcome-ident-v1-independent-judge-2026-07-26.md",
        "required_independent_checks": ["normal-speed full-film watch", "91.340/98.590 boundaries and ident legibility", "picture/narration/VTT alignment", "out-of-scope continuity", "no release/public claim"],
    }
    write_json(QC, qc)


def main() -> None:
    config = make_config()
    validate(config)
    render()
    qa(config)
    print(OUT)


if __name__ == "__main__":
    main()
