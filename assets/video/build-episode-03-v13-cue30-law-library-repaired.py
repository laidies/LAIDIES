#!/usr/bin/env python3
"""Build a checksum-bound Episode 03 v13 with only Cue 30 picture replaced."""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
SOURCE = ROOT / "assets/video/episode-03-full-v12-spoken-welcome-ident-review.mp4"
LOOP = (
    ROOT
    / "assets/episodes/ep-03/comic/delivery-20260726-cue30-law-library-repair-v1/"
    "ep03-cue30-law-library-lamp-dust-zero-net-loop-v1.mp4"
)
CONFIG = ROOT / "assets/video/episode-03-v13-cue30-law-library-repaired-config.json"
OUTPUT = ROOT / "assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4"
MANIFEST = (
    ROOT
    / "operations/video-qa/"
    "episode-03-full-v13-cue30-law-library-repaired-manifest.json"
)
QC = (
    ROOT
    / "operations/video-qa/"
    "episode-03-full-v13-cue30-law-library-repaired-qc.json"
)
MOTION_JUDGE_MD = (
    ROOT
    / "operations/product-stewards/episode-media-quality/evidence-2026-07-26/"
    "emq-e03-cue30-law-library-motion-independent-judge-2026-07-26.md"
)
MOTION_JUDGE_JSON = MOTION_JUDGE_MD.with_suffix(".json")

SOURCE_SHA = "4ed6057f151530c5ae760f72860718be1beda87076eb17e6cdfdfd1b7accef40"
LOOP_SHA = "6a3a6e936eb025820e261eed8ef147d7ae8d9097c3fb6bdc3c2a30754072d6bf"
MOTION_JUDGE_MD_SHA = (
    "fbeabb135474cf5806732fbfab88058a7dc076b68b2b72df79bdd3cfc119a494"
)
MOTION_JUDGE_JSON_SHA = (
    "ac1e2ba0cfe8d8d1b32b2e89f51aae53fcf739713f3b36d66959a5e4dac3bcf5"
)
FPS = 30
SOURCE_FRAMES = 31438
START_FRAME = 16950
END_FRAME = 17310
LOOP_FRAMES = END_FRAME - START_FRAME
OVERALL_DURATION_SECONDS = 1048.0


def sha(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(cmd: list[str], *, capture: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=capture,
    )


def frame_hashes(path: Path) -> list[str]:
    result = run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(path),
            "-map",
            "0:v:0",
            "-f",
            "framemd5",
            "-",
        ],
        capture=True,
    )
    hashes = []
    for line in result.stdout.splitlines():
        if not line or line.startswith("#"):
            continue
        fields = [field.strip() for field in line.split(",")]
        if len(fields) != 6:
            raise RuntimeError(f"unexpected framemd5 row: {line}")
        hashes.append(fields[-1])
    return hashes


def audio_adts_sha(path: Path) -> str:
    result = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(path),
            "-map",
            "0:a:0",
            "-c:a",
            "copy",
            "-f",
            "adts",
            "-",
        ],
        cwd=ROOT,
        check=True,
        capture_output=True,
    )
    return hashlib.sha256(result.stdout).hexdigest()


def input_summary(path: Path) -> str:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    return result.stderr


def duration_seconds(summary: str) -> float:
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", summary)
    if not match:
        raise RuntimeError("could not parse container duration")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def atomic_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        mode="w",
        prefix=f".{path.name}.",
        suffix=".tmp",
        dir=path.parent,
        delete=False,
    ) as handle:
        temp = Path(handle.name)
        json.dump(payload, handle, indent=2)
        handle.write("\n")
    temp.replace(path)


authorities = {
    SOURCE: SOURCE_SHA,
    LOOP: LOOP_SHA,
    MOTION_JUDGE_MD: MOTION_JUDGE_MD_SHA,
    MOTION_JUDGE_JSON: MOTION_JUDGE_JSON_SHA,
}
for path, expected in authorities.items():
    actual = sha(path)
    if actual != expected:
        raise SystemExit(f"authority checksum mismatch: {path} {actual}")

config = json.loads(CONFIG.read_text())
temp_dir = Path(
    tempfile.mkdtemp(prefix=".episode-03-v13-cue30.", dir=OUTPUT.parent)
)
temp_output = temp_dir / "candidate.mp4"
try:
    graph = (
        f"[0:v]trim=start_frame=0:end_frame={START_FRAME},"
        f"setpts=N/({FPS}*TB)[pre];"
        f"[1:v]trim=start_frame=0:end_frame={LOOP_FRAMES},"
        f"setpts=N/({FPS}*TB)[insert];"
        f"[0:v]trim=start_frame={END_FRAME},"
        f"setpts=N/({FPS}*TB)[post];"
        "[pre][insert][post]concat=n=3:v=1:a=0,format=yuv420p[v]"
    )
    run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "warning",
            "-stats",
            "-y",
            "-i",
            str(SOURCE),
            "-i",
            str(LOOP),
            "-filter_complex",
            graph,
            "-map",
            "[v]",
            "-map",
            "0:a:0",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "0",
            "-pix_fmt",
            "yuv420p",
            "-r",
            str(FPS),
            "-video_track_timescale",
            "15360",
            "-c:a",
            "copy",
            "-movflags",
            "+faststart",
            str(temp_output),
        ]
    )

    # Full audiovisual decode must pass before any output promotion.
    run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(temp_output),
            "-map",
            "0:v:0",
            "-map",
            "0:a:0",
            "-f",
            "null",
            "-",
        ]
    )

    source_vector = frame_hashes(SOURCE)
    loop_vector = frame_hashes(LOOP)
    output_vector = frame_hashes(temp_output)
    source_audio_sha = audio_adts_sha(SOURCE)
    output_audio_sha = audio_adts_sha(temp_output)
    source_duration = duration_seconds(input_summary(SOURCE))
    output_summary = input_summary(temp_output)
    output_duration = duration_seconds(output_summary)

    prefix_equal = output_vector[:START_FRAME] == source_vector[:START_FRAME]
    insert_equal = (
        output_vector[START_FRAME:END_FRAME] == loop_vector[:LOOP_FRAMES]
    )
    suffix_equal = output_vector[END_FRAME:] == source_vector[END_FRAME:]
    frame_counts_pass = (
        len(source_vector) == SOURCE_FRAMES
        and len(loop_vector) == LOOP_FRAMES
        and len(output_vector) == SOURCE_FRAMES
    )
    duration_pass = (
        source_duration == OVERALL_DURATION_SECONDS
        and output_duration == OVERALL_DURATION_SECONDS
    )
    audio_equal = source_audio_sha == output_audio_sha
    all_gates_pass = all(
        [
            prefix_equal,
            insert_equal,
            suffix_equal,
            frame_counts_pass,
            duration_pass,
            audio_equal,
        ]
    )
    if not all_gates_pass:
        raise RuntimeError(
            "v13 promotion gate failed: "
            f"prefix={prefix_equal} insert={insert_equal} suffix={suffix_equal} "
            f"frames={frame_counts_pass} duration={duration_pass} audio={audio_equal}"
        )

    output_sha = sha(temp_output)
    output_size = temp_output.stat().st_size
    stamp = datetime.now(timezone.utc).isoformat()
    temp_output.replace(OUTPUT)
    builder_sha = sha(Path(__file__))
    config_sha = sha(CONFIG)

    manifest = {
        "schema_version": 1,
        "created_at": stamp,
        "status": "BUILT_LOCALLY_NOT_ADMITTED",
        "title": config["title"],
        "source": str(SOURCE.relative_to(ROOT)),
        "source_sha256": SOURCE_SHA,
        "replacement": str(LOOP.relative_to(ROOT)),
        "replacement_sha256": LOOP_SHA,
        "replacement_cue": 30,
        "replacement_interval_seconds": [565.0, 577.0],
        "replacement_frame_interval": [START_FRAME, END_FRAME],
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": output_sha,
        "output_size_bytes": output_size,
        "video": {
            "codec": "H.264 lossless encode from decoded yuv420p vectors",
            "width": 1920,
            "height": 1080,
            "fps": FPS,
            "frames": len(output_vector),
            "video_track_end_seconds": len(output_vector) / FPS,
        },
        "overall_duration_seconds": output_duration,
        "audio": {
            "codec": "AAC copied from v12 without re-encoding or retiming",
            "adts_sha256": output_audio_sha,
            "payload_equal_to_v12": audio_equal,
        },
        "independent_source_motion_acceptance": {
            "md": str(MOTION_JUDGE_MD.relative_to(ROOT)),
            "md_sha256": MOTION_JUDGE_MD_SHA,
            "json": str(MOTION_JUDGE_JSON.relative_to(ROOT)),
            "json_sha256": MOTION_JUDGE_JSON_SHA,
        },
        "builder": str(Path(__file__).relative_to(ROOT)),
        "builder_sha256": builder_sha,
        "config": str(CONFIG.relative_to(ROOT)),
        "config_sha256": config_sha,
        "acceptance_owner": "Independent Episode Media Quality",
        "release_authority": False,
        "public_binding": False,
    }
    qc = {
        "schema_version": 1,
        "created_at": stamp,
        "status": "MAKER_TECHNICAL_QC_PASS_ONLY",
        "maker_may_judge": False,
        "candidate": str(OUTPUT.relative_to(ROOT)),
        "candidate_sha256": output_sha,
        "full_audiovisual_decode": "PASS",
        "source_video_frames": len(source_vector),
        "replacement_video_frames": len(loop_vector),
        "output_video_frames": len(output_vector),
        "expected_output_video_frames": SOURCE_FRAMES,
        "source_overall_duration_seconds": source_duration,
        "output_overall_duration_seconds": output_duration,
        "prefix_frame_vector": {
            "range": [0, START_FRAME],
            "frames": START_FRAME,
            "equal_to_v12": prefix_equal,
        },
        "inserted_frame_vector": {
            "range": [START_FRAME, END_FRAME],
            "frames": LOOP_FRAMES,
            "equal_to_accepted_loop": insert_equal,
        },
        "suffix_frame_vector": {
            "range": [END_FRAME, SOURCE_FRAMES],
            "frames": SOURCE_FRAMES - END_FRAME,
            "equal_to_v12": suffix_equal,
        },
        "accepted_welcome_ident_preserved_by_prefix_vector": prefix_equal,
        "aac": {
            "source_adts_sha256": source_audio_sha,
            "output_adts_sha256": output_audio_sha,
            "bit_equal": audio_equal,
        },
        "all_promotion_gates_pass": all_gates_pass,
        "independent_full_title_review": "PENDING",
        "release_authority": False,
        "public_binding": False,
    }
    atomic_json(MANIFEST, manifest)
    atomic_json(QC, qc)
    print(
        f"EP03 V13 BUILT {OUTPUT.relative_to(ROOT)} "
        f"SHA256={output_sha} FRAMES={len(output_vector)} "
        f"AAC={output_audio_sha}"
    )
finally:
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
