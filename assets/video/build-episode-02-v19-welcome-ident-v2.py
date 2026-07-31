#!/usr/bin/env python3
"""Restore the frozen Episode 02 picture tail to the held v1 ident successor.

This is a maker-only mechanical successor. It preserves every decoded v1 picture
frame, appends the exact final 22 decoded frames from frozen v19, and copies the
frozen v19 AAC elementary stream. It cannot admit, release, or publish the film.
"""
from __future__ import annotations

import hashlib
import json
import os
import struct
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OPS = ROOT / "operations"
FFMPEG = Path.home() / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
TASK_ID = "WE-MEDIA-E02-WELCOME-IDENT-V2-TAIL-RESTORE-2026-07-26"
SOURCE = HERE / "episode-02-full-v19-style-semantic-repaired-review.mp4"
V1 = HERE / "episode-02-full-v19-welcome-ident-v1-review.mp4"
IDENT = OPS / "design-explorations/laidies-motion-ident-20260725/continuous-i-episode-02-tell-me-what-you-want-v1.mp4"
OUT = HERE / "episode-02-full-v19-welcome-ident-v2-review.mp4"
QA_DIR = OPS / "video-qa/episode-02-v19-welcome-ident-v2"
CONFIG = QA_DIR / "config.json"
MANIFEST = QA_DIR / "manifest.json"
QC = QA_DIR / "qc.json"
EVIDENCE = QA_DIR / "EVIDENCE.md"
BOUNDARY_STRIP = QA_DIR / "ident-boundary-frame-strip.png"
TAIL_STRIP = QA_DIR / "final-22-source-tail-frame-strip.png"
SOURCE_SHA = "e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3"
V1_SHA = "5b9c98281d292b18ef4e70edc023a4c322add94bfe3b7e82e7d8e3dab691191b"
IDENT_SHA = "ea5addbad951281602373cfde8d4264326e557a57b63ea2df218d0697316f138"
SOURCE_FRAMES = 29624
V1_FRAMES = 29602
TAIL_FRAMES = SOURCE_FRAMES - V1_FRAMES
FPS = 30
TIMESCALE = 15360
VIDEO_DURATION_UNITS = 15167488
AUDIO_DURATION_UNITS = 47398576
AUDIO_TIMESCALE = 48000
IDENT_INTERVAL = [91.340, 98.590]


def run(args: list[str], *, allow_failure: bool = False) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(args, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode and not allow_failure:
        raise RuntimeError("command failed:\n" + " ".join(args) + "\n" + result.stderr[-5000:])
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


def frame_hashes(path: Path, vf: str | None = None) -> list[str]:
    args = [str(FFMPEG), "-v", "error", "-i", str(path), "-map", "0:v:0"]
    if vf:
        args += ["-vf", vf]
    args += ["-f", "framemd5", "-"]
    output = run(args).stdout
    return [line.rsplit(",", 1)[-1].strip() for line in output.splitlines() if line and not line.startswith("#")]


def audio_hash(path: Path, target: Path) -> str:
    run([str(FFMPEG), "-y", "-v", "error", "-i", str(path), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(target)])
    return sha256(target)


def atoms(data: bytes, start: int, stop: int):
    cursor = start
    while cursor + 8 <= stop:
        size = struct.unpack_from(">I", data, cursor)[0]
        kind = data[cursor + 4:cursor + 8].decode("latin1")
        header = 8
        if size == 1:
            size = struct.unpack_from(">Q", data, cursor + 8)[0]
            header = 16
        elif size == 0:
            size = stop - cursor
        if size < header or cursor + size > stop:
            break
        yield kind, cursor + header, cursor + size
        cursor += size


def track_durations(path: Path) -> dict[str, dict[str, int | float]]:
    data = path.read_bytes()
    found: dict[str, dict[str, int | float]] = {}
    moov = next((x for x in atoms(data, 0, len(data)) if x[0] == "moov"), None)
    if not moov:
        raise RuntimeError("MP4 moov atom missing")
    for kind, body, end in atoms(data, moov[1], moov[2]):
        if kind != "trak":
            continue
        mdia = next((x for x in atoms(data, body, end) if x[0] == "mdia"), None)
        if not mdia:
            continue
        children = list(atoms(data, mdia[1], mdia[2]))
        hdlr = next((x for x in children if x[0] == "hdlr"), None)
        mdhd = next((x for x in children if x[0] == "mdhd"), None)
        if not hdlr or not mdhd:
            continue
        handler = data[hdlr[1] + 8:hdlr[1] + 12].decode("latin1")
        version = data[mdhd[1]]
        offset = mdhd[1]
        if version == 0:
            timescale = struct.unpack_from(">I", data, offset + 12)[0]
            duration = struct.unpack_from(">I", data, offset + 16)[0]
        elif version == 1:
            timescale = struct.unpack_from(">I", data, offset + 20)[0]
            duration = struct.unpack_from(">Q", data, offset + 24)[0]
        else:
            raise RuntimeError("Unsupported mdhd version")
        found[handler] = {"timescale": timescale, "duration_units": duration, "seconds": duration / timescale}
    return found


def create_config() -> dict[str, object]:
    config = {
        "schema": "laidies.episode-02.welcome-ident-tail-restore.config.v1",
        "task_id": TASK_ID,
        "status": "BUILDING_LOCAL_REVIEW_SUCCESSOR_ONLY",
        "frozen_source": record(SOURCE),
        "held_v1": record(V1),
        "ident": record(IDENT),
        "ident_interval_seconds_preserved": IDENT_INTERVAL,
        "repair": {
            "reason": "V-TAIL-TIMELINE-DRIFT",
            "v1_video_frames": V1_FRAMES,
            "frozen_source_video_frames": SOURCE_FRAMES,
            "missing_tail_frames": TAIL_FRAMES,
            "operation": "preserve all decoded v1 picture frames, then append frozen-v19 decoded frames 29602 through 29623",
            "synthetic_hold": False,
            "audio_operation": "copy frozen-v19 AAC elementary stream unchanged",
        },
        "output": {"path": str(OUT.relative_to(ROOT)), "status": "LOCAL_REVIEW_ONLY_NOT_PUBLIC"},
    }
    write_json(CONFIG, config)
    return config


def validate() -> None:
    if not FFMPEG.is_file():
        raise RuntimeError("FFmpeg binding missing")
    expected = ((SOURCE, SOURCE_SHA), (V1, V1_SHA), (IDENT, IDENT_SHA))
    for path, digest in expected:
        if not path.is_file() or sha256(path) != digest:
            raise RuntimeError(f"Frozen input binding failed: {path}")
    if OUT.exists():
        raise RuntimeError(f"Refusing to overwrite an existing v2 output: {OUT}")
    if TAIL_FRAMES != 22:
        raise RuntimeError("Tail repair scope must remain exactly 22 frames")


def render(temp_path: Path) -> None:
    graph = (
        f"[0:v]trim=end_frame={V1_FRAMES},setpts=N/({FPS}*TB)[body];"
        f"[1:v]trim=start_frame={V1_FRAMES}:end_frame={SOURCE_FRAMES},setpts=N/({FPS}*TB)[tail];"
        "[body][tail]concat=n=2:v=1:a=0,format=yuv420p[v]"
    )
    run([
        str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning",
        "-i", str(V1), "-i", str(SOURCE), "-filter_complex", graph,
        "-map", "[v]", "-map", "1:a:0", "-map_metadata", "1",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "0", "-pix_fmt", "yuv420p",
        "-r", str(FPS), "-video_track_timescale", str(TIMESCALE),
        "-c:a", "copy", "-movflags", "+faststart", str(temp_path),
    ])


def make_strips(candidate: Path) -> None:
    boundary_select = "select='eq(n,2739)+eq(n,2740)+eq(n,2741)+eq(n,2742)+eq(n,2955)+eq(n,2956)+eq(n,2957)+eq(n,2958)',scale=480:270,tile=4x2"
    run([str(FFMPEG), "-y", "-v", "error", "-i", str(candidate), "-vf", boundary_select, "-frames:v", "1", str(BOUNDARY_STRIP)])
    tail_filter = f"trim=start_frame={V1_FRAMES}:end_frame={SOURCE_FRAMES},setpts=PTS-STARTPTS,scale=320:180,tile=11x2"
    run([str(FFMPEG), "-y", "-v", "error", "-i", str(candidate), "-vf", tail_filter, "-frames:v", "1", str(TAIL_STRIP)])


def verify_and_promote(config: dict[str, object], temp_path: Path) -> None:
    decode = run([str(FFMPEG), "-v", "error", "-i", str(temp_path), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"], allow_failure=True)
    if decode.returncode:
        raise RuntimeError("Full A/V decode failed: " + decode.stderr[-3000:])
    v1_hashes = frame_hashes(V1)
    source_tail_hashes = frame_hashes(SOURCE, f"trim=start_frame={V1_FRAMES}:end_frame={SOURCE_FRAMES},setpts=PTS-STARTPTS")
    candidate_hashes = frame_hashes(temp_path)
    if len(v1_hashes) != V1_FRAMES or len(source_tail_hashes) != TAIL_FRAMES or len(candidate_hashes) != SOURCE_FRAMES:
        raise RuntimeError(f"Decoded frame count mismatch: v1={len(v1_hashes)} tail={len(source_tail_hashes)} candidate={len(candidate_hashes)}")
    if candidate_hashes[:V1_FRAMES] != v1_hashes:
        raise RuntimeError("Lossless successor did not preserve every decoded v1 picture frame")
    if candidate_hashes[V1_FRAMES:] != source_tail_hashes:
        raise RuntimeError("Final 22 decoded frames do not exactly equal frozen-v19 source tail")
    source_tracks = track_durations(SOURCE)
    candidate_tracks = track_durations(temp_path)
    if source_tracks != candidate_tracks:
        raise RuntimeError(f"MP4 track duration mismatch: source={source_tracks} candidate={candidate_tracks}")
    if candidate_tracks.get("vide") != {"timescale": TIMESCALE, "duration_units": VIDEO_DURATION_UNITS, "seconds": VIDEO_DURATION_UNITS / TIMESCALE}:
        raise RuntimeError("Candidate video mdhd is not the frozen 987.466667-second clock")
    if candidate_tracks.get("soun") != {"timescale": AUDIO_TIMESCALE, "duration_units": AUDIO_DURATION_UNITS, "seconds": AUDIO_DURATION_UNITS / AUDIO_TIMESCALE}:
        raise RuntimeError("Candidate audio mdhd is not the frozen 987.470333-second clock")
    with tempfile.TemporaryDirectory(prefix="e02-v2-audio-qc-") as temp_dir:
        temp = Path(temp_dir)
        source_audio = audio_hash(SOURCE, temp / "source.aac")
        candidate_audio = audio_hash(temp_path, temp / "candidate.aac")
    if source_audio != candidate_audio:
        raise RuntimeError("AAC elementary payload differs from frozen v19")
    temp_path.replace(OUT)
    make_strips(OUT)
    manifest = {
        "schema": "laidies.episode-02.welcome-ident-tail-restore.manifest.v1",
        "task_id": TASK_ID,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_REVIEW_REQUIRED_NOT_ADMITTED_NOT_PUBLIC",
        "frozen_source": record(SOURCE),
        "held_v1": record(V1),
        "ident": record(IDENT),
        "config": record(CONFIG),
        "builder": record(Path(__file__)),
        "ident_interval_seconds_preserved": IDENT_INTERVAL,
        "repair": config["repair"],
        "output": record(OUT),
        "frame_evidence": {
            "decoded_v1_body_frames_exact": V1_FRAMES,
            "decoded_frozen_source_tail_frames_exact": TAIL_FRAMES,
            "decoded_output_frames": SOURCE_FRAMES,
            "body_framemd5_sequence_identical_to_v1": True,
            "tail_framemd5_sequence_identical_to_frozen_v19": True,
            "ident_boundary_strip": record(BOUNDARY_STRIP),
            "final_tail_strip": record(TAIL_STRIP),
        },
        "track_durations": {"frozen_source": source_tracks, "output": candidate_tracks},
        "audio": {
            "frozen_v19_adts_sha256": source_audio,
            "output_adts_sha256": candidate_audio,
            "elementary_stream_identical": True,
        },
        "checks": {"full_decode": "PASS", "fps": FPS, "video_track_timescale": TIMESCALE},
        "authority": {"maker_may_accept": False, "release": False, "deploy": False, "public": False},
    }
    write_json(MANIFEST, manifest)
    qc = {
        "schema": "laidies.episode-02.welcome-ident-tail-restore.qc.v1",
        "task_id": TASK_ID,
        "status": "VERIFIED_LOCALLY_AWAITING_INDEPENDENT_EMQ_REVIEW",
        "manifest": record(MANIFEST),
        "output": record(OUT),
        "checks": {
            "full_decode": "PASS",
            "ident_interval_91_340_to_98_590_unchanged_from_v1": "PASS — all 29602 decoded v1 body frames byte-identical",
            "final_22_frames_exact_from_frozen_v19": "PASS — decoded frame MD5 sequence identical",
            "video_mdhd_duration_matches_frozen_v19": "PASS",
            "audio_mdhd_duration_matches_frozen_v19": "PASS",
            "audio_elementary_stream_copy": "PASS",
            "video_standard": "PASS — H.264 1920x1080 30fps 15360tbn",
        },
        "independent_emq_evidence_target": "operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-welcome-ident-v2-independent-judge-2026-07-26.md",
        "maker_may_judge_or_accept": False,
    }
    write_json(QC, qc)
    evidence = f"""# Episode 02 v19 welcome-ident v2 tail-only successor

**Status:** BUILT LOCALLY — REVIEW REQUIRED / NOT ADMITTED / NOT PUBLIC

V2 preserves all {V1_FRAMES} decoded picture frames from held v1, including the
unchanged 91.340–98.590 welcome-ident interval, then appends the exact final
{TAIL_FRAMES} decoded frames from frozen v19. No synthetic hold is used.

- Output: {OUT.relative_to(ROOT)} — SHA-256 {sha256(OUT)}
- Frozen v19: {SOURCE.relative_to(ROOT)} — SHA-256 {SOURCE_SHA}
- Held v1: {V1.relative_to(ROOT)} — SHA-256 {V1_SHA}
- AAC ADTS SHA-256, frozen/output: {source_audio}
- Decoded output frames: {SOURCE_FRAMES} at {FPS} fps
- Video mdhd: {VIDEO_DURATION_UNITS}/{TIMESCALE} = {VIDEO_DURATION_UNITS / TIMESCALE:.6f} seconds
- Audio mdhd: {AUDIO_DURATION_UNITS}/{AUDIO_TIMESCALE} = {AUDIO_DURATION_UNITS / AUDIO_TIMESCALE:.6f} seconds
- Full A/V decode: PASS

Frame evidence:
- {BOUNDARY_STRIP.relative_to(ROOT)}
- {TAIL_STRIP.relative_to(ROOT)}

Independent EMQ target:
operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-welcome-ident-v2-independent-judge-2026-07-26.md

This maker evidence is not acceptance, release, deployment, or public-media evidence.
"""
    EVIDENCE.write_text(evidence)


def main() -> None:
    validate()
    config = create_config()
    descriptor, temp_name = tempfile.mkstemp(prefix=".episode-02-v19-welcome-ident-v2-tail-", suffix=".rendering.mp4", dir=HERE)
    os.close(descriptor)
    temp_path = Path(temp_name)
    temp_path.unlink()
    render(temp_path)
    verify_and_promote(config, temp_path)
    print(OUT)


if __name__ == "__main__":
    main()
