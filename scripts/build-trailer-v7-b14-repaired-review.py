#!/usr/bin/env python3
"""Overlay the admitted B14 semantic sequence onto Trailer v6.

This successor changes only B14 (195.233333–205.166667), preserves the exact
v6 audio payload and all other v6 picture decisions, and remains local/HOLD.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
BASE = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v6-non-outfit-repaired-review-1920.mp4"
B14 = ROOT / "operations/video-qa/trailer-b14-found-home-motion-v1/trailer-b14-found-home-multicolour-review-v1.mp4"
CAPTIONS = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt"
OUT_DIR = ROOT / "operations/video-qa/trailer-v7-b14-repaired-review"
OUTPUT = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v7-b14-repaired-review-1920.mp4"
CONTACT = OUT_DIR / "trailer-v7-contact.jpg"
MANIFEST = OUT_DIR / "manifest.json"

START = 195.233333
END = 205.166667
DURATION = 967.2


def run(args: list[str]) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    return {"path": str(path.relative_to(ROOT)), "sha256": sha256(path), "size_bytes": path.stat().st_size}


def stream_hash(path: Path, selector: str) -> str:
    output = subprocess.check_output([
        str(FFMPEG), "-v", "error", "-i", str(path), "-map", selector,
        "-c", "copy", "-f", "hash", "-hash", "sha256", "-",
    ], cwd=ROOT, text=True)
    return output.strip().split("=", 1)[1]


def probe_duration(path: Path) -> float:
    result = subprocess.run([str(FFMPEG), "-hide_banner", "-i", str(path)], cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    h, m, s = match.groups()
    return int(h) * 3600 + int(m) * 60 + float(s)


def make_contact() -> None:
    # Dense enough to verify the repaired B14 and representative continuity
    # without rerunning the already-passed v6 occurrence audit.
    timestamps = [2.0, 90.0, 194.8, 195.6, 197.6, 199.0, 201.5, 203.2, 204.8, 220.0, 475.0, 575.0, 880.0, 910.0, 945.0, 965.0]
    frame_dir = OUT_DIR / "frames"
    frame_dir.mkdir(parents=True, exist_ok=True)
    frames: list[Image.Image] = []
    for index, timestamp in enumerate(timestamps):
        frame = frame_dir / f"{index + 1:02d}-{timestamp:07.2f}.jpg"
        run([str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}", "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
        frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
    sheet = Image.new("RGB", (1920, 1080), (18, 8, 25))
    for index, frame in enumerate(frames):
        sheet.paste(frame, ((index % 4) * 480, (index // 4) * 270))
    sheet.save(CONTACT, quality=92, optimize=True)


def main() -> None:
    for source in (BASE, B14, CAPTIONS):
        if not source.exists():
            raise SystemExit(f"Missing required source: {source.relative_to(ROOT)}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error",
        "-i", str(BASE), "-i", str(B14),
        "-filter_complex",
        f"[1:v]fps=30,setsar=1,setpts=PTS-STARTPTS+{START:.6f}/TB[b14];"
        f"[0:v][b14]overlay=0:0:eof_action=pass:shortest=0:enable='between(t,{START:.6f},{END:.6f})'[v]",
        "-map", "[v]", "-map", "0:a:0", "-t", f"{DURATION:.3f}",
        "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p",
        "-r", "30", "-fps_mode", "cfr", "-c:a", "copy", "-movflags", "+faststart", str(OUTPUT),
    ])
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    duration = probe_duration(OUTPUT)
    if abs(duration - DURATION) > 0.05:
        raise RuntimeError(f"Unexpected duration: {duration}")
    if stream_hash(BASE, "0:a:0") != stream_hash(OUTPUT, "0:a:0"):
        raise RuntimeError("Frozen audio payload changed")
    make_contact()
    manifest = {
        "schema": "laidies.trailer.b14-successor.v1",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT LOCALLY / HOLD",
        "authority": {"accepted": False, "release": False, "deploy": False, "publication": False, "public_player_binding": False},
        "base": record(BASE),
        "b14_repair": record(B14),
        "captions": record(CAPTIONS),
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "duration_seconds": duration,
        "audio_payload_sha256": stream_hash(OUTPUT, "0:a:0"),
        "full_av_decode": "PASS",
        "changed_picture_window": {"start_seconds": START, "end_seconds": END, "job": "home → town walk → home matches the exact B14 narration"},
        "preserved": ["all v6 non-outfit repairs", "exact v6 audio payload", "external 206-cue VTT", "B08 approved LAiDIES ident"],
        "unresolved_occurrences": {"outfit_authority": ["B01", "B04", "B07", "B15", "B31", "B39", "B56"]},
        "inventory_result": "No existing multicolour replacements were found for the seven named outfit occurrences; generation/substitution remains held for one canon decision.",
        "remaining_gate": "Resolve the single Trailer wardrobe authority question, then independent qualified human unmuted 1x full-title review.",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"output": record(OUTPUT), "manifest": record(MANIFEST), "contact": record(CONTACT)}, indent=2))


if __name__ == "__main__":
    main()
