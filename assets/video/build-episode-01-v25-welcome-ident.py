#!/usr/bin/env python3
"""Build Episode 01 v25: one cue-bound, picture-only welcome-ident insertion.

The v24 review film is frozen. This builder binds its checksum, the exact
Episode 01 ident checksum, and the caption-derived 93.900–101.920 interval.
It copies the complete v24 AAC payload and writes maker evidence only; it
does not make an editorial, admission, release, deployment, or public claim.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "assets/video/episode-01-v25-welcome-ident-config.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def checked_path(binding: dict[str, object], label: str) -> Path:
    path = ROOT / str(binding["path"])
    if not path.is_file():
        raise FileNotFoundError(f"{label} is missing: {path}")
    actual = sha256(path)
    if actual != binding["sha256"]:
        raise RuntimeError(f"{label} hash changed: {actual}")
    return path


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def adts_hash(path: Path, destination: Path) -> tuple[str, int]:
    run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(path),
         "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(destination)])
    return sha256(destination), destination.stat().st_size


def full_decode(path: Path) -> None:
    run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path), "-f", "null", "-"])


def main() -> None:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    frozen = checked_path(config["frozen_input"], "frozen v24 input")
    ident = checked_path(config["ident"], "selected Episode 01 ident")
    interval = config["canonical_interval"]
    start = float(interval["start_seconds"])
    end = float(interval["end_seconds"])
    window = end - start
    motion = float(config["ident"]["motion_duration_seconds"])
    hold = window - motion
    if hold < 0:
        raise RuntimeError("Ident exceeds the canonical replacement interval")

    output = ROOT / config["output"]["path"]
    manifest_path = ROOT / config["output"]["manifest_path"]
    qc_path = ROOT / config["output"]["qc_path"]
    review_path = ROOT / config["output"]["review_window_path"]
    temp_output = output.with_name(output.stem + ".encode-in-progress.mp4")
    for path in (output, temp_output, manifest_path, qc_path, review_path):
        if path.exists():
            raise FileExistsError(f"Refusing to overwrite existing evidence: {path}")
        path.parent.mkdir(parents=True, exist_ok=True)

    # Terminal-frame hold covers the complete spoken identity interval.  The
    # overlay source itself has no audio, and the v24 AAC stream is copied.
    filters = (
        f"[1:v]scale=1920:1080:flags=lanczos,fps=30,"
        f"tpad=stop_mode=clone:stop_duration={hold:.6f},"
        f"trim=duration={window:.6f},setpts=PTS-STARTPTS+{start:.6f}/TB[ident];"
        f"[0:v][ident]overlay=eof_action=pass:repeatlast=0:shortest=0:"
        f"enable='between(t,{start:.6f},{end:.6f})',format=yuv420p[outv]"
    )
    run([
        str(FFMPEG), "-n", "-hide_banner", "-loglevel", "error",
        "-i", str(frozen), "-i", str(ident), "-filter_complex", filters,
        "-map", "[outv]", "-map", "0:a:0", "-c:v", "libx264", "-preset", "fast",
        "-crf", "18", "-profile:v", "high", "-level:v", "4.1", "-pix_fmt", "yuv420p",
        "-r", "30", "-c:a", "copy", "-movflags", "+faststart", "-t",
        f"{float(config['frozen_input']['duration_seconds']):.2f}", str(temp_output),
    ])
    full_decode(temp_output)

    # A compact independent-review window, with five seconds of context either
    # side of the explicitly replaced picture interval.
    run([
        str(FFMPEG), "-n", "-hide_banner", "-loglevel", "error", "-ss", "90", "-t", "15",
        "-i", str(temp_output), "-map", "0:v:0", "-map", "0:a:0", "-c", "copy", "-movflags",
        "+faststart", str(review_path),
    ])
    full_decode(review_path)

    base_adts = qc_path.parent / "frozen-v24-audio.adts"
    output_adts = qc_path.parent / "v25-audio.adts"
    base_audio_hash, base_audio_bytes = adts_hash(frozen, base_adts)
    output_audio_hash, output_audio_bytes = adts_hash(temp_output, output_adts)
    if (base_audio_hash, base_audio_bytes) != (output_audio_hash, output_audio_bytes):
        raise RuntimeError("v25 audio payload differs from frozen v24")

    # The candidate name is never visible until its full decode and exact audio
    # payload checks have passed.  `replace` is atomic because both paths are in
    # the same directory/filesystem.
    temp_output.replace(output)

    manifest = {
        "schema_version": 1,
        "status": "BUILT_LOCALLY_REVIEW_REQUIRED",
        "scope": "Episode 01 frozen-v24 successor with exactly one picture-only ident operation",
        "baseline": {"path": str(frozen.relative_to(ROOT)), "sha256": sha256(frozen)},
        "ident": {"path": str(ident.relative_to(ROOT)), "sha256": sha256(ident),
                  "source_dimensions": config["ident"]["source_dimensions"],
                  "motion_duration_seconds": motion, "audio_tracks": 0},
        "placement": {"start_seconds": start, "motion_end_seconds": start + motion,
                      "end_seconds": end, "terminal_frame_hold_seconds": hold,
                      "spoken_trigger": interval["spoken_trigger"],
                      "canonical_sources": [interval["canonical_cues"], interval["caption_timing_map"],
                                            interval["caption_vtt"], interval["selection_authority"]],
                      "picture_operation": interval["picture_operation"],
                      "audio_operation": interval["audio_operation"]},
        "output": {"path": str(output.relative_to(ROOT)), "sha256": sha256(output),
                   "bytes": output.stat().st_size, "runtime_seconds": config["frozen_input"]["duration_seconds"],
                   "status": "BUILT_LOCALLY_NOT_ADMITTED_NOT_PUBLIC"},
        "review_window": {"path": str(review_path.relative_to(ROOT)), "sha256": sha256(review_path),
                          "bytes": review_path.stat().st_size, "range_seconds": [90, 105]},
        "authority": config["authority"],
    }
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    qc = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "MAKER_QC_COMPLETE_INDEPENDENT_JUDGMENT_REQUIRED",
        "output": manifest["output"], "full_decode": "PASS", "review_window_full_decode": "PASS",
        "audio_payload_comparison": {"method": "Raw ADTS stream-copy extraction and SHA-256/byte comparison.",
                                     "frozen_v24_adts_sha256": base_audio_hash,
                                     "v25_adts_sha256": output_audio_hash, "bytes_each": base_audio_bytes,
                                     "result": "PASS_EXACT_AUDIO_PAYLOAD"},
        "semantic_picture_scope": {"replacement_interval_seconds": [start, end],
                                   "motion_end_seconds": start + motion,
                                   "hold_seconds": hold,
                                   "out_of_scope_preservation": "Requires independent EMQ visual review; maker does not judge."},
        "manifest": str(manifest_path.relative_to(ROOT)), "manifest_sha256": sha256(manifest_path),
        "config": str(CONFIG_PATH.relative_to(ROOT)), "config_sha256": sha256(CONFIG_PATH),
        "maker_may_judge": False,
        "independent_emq_evidence_target": config["authority"]["independent_emq_evidence_target"],
        "release_status": "HOLD_PENDING_INDEPENDENT_EPISODE_MEDIA_QUALITY",
    }
    qc_path.write_text(json.dumps(qc, indent=2) + "\n", encoding="utf-8")
    print(output)
    print(manifest_path)
    print(qc_path)


if __name__ == "__main__":
    main()
