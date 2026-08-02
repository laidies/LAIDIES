#!/usr/bin/env python3
"""Build one Trailer successor with the seven wardrobe fixes.

The v7 picture and exact audio payload remain the base. Six still-image beats
are replaced for their existing clock windows. B39 keeps its existing poof
motion, with only the poof-clears and final-reveal states replaced. This is a
local review candidate and carries no release or public-player authority.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
BASE = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v7-b14-repaired-review-1920.mp4"
CAPTIONS = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt"
CANDIDATE_DIR = ROOT / "operations/video-qa/trailer-multicolour-outfit-candidates-v1"
OUT_DIR = ROOT / "operations/video-qa/trailer-v8-multicolour-review"
OUTPUT = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v8-multicolour-review-1920.mp4"
CONTACT = OUT_DIR / "trailer-v8-multicolour-contact.jpg"
MANIFEST = OUT_DIR / "manifest.json"

FPS = 30
DURATION = 967.2

# Exact existing picture windows from the 58-beat map / occurrence review.
STILLS = [
    ("B01", 0.000000, 6.366667, "trailer-b01-multicolour-candidate-v1.png"),
    ("B04", 36.166667, 43.266667, "trailer-b04-multicolour-candidate-v1.png"),
    ("B07", 82.866667, 99.866667, "trailer-b07-multicolour-candidate-v1.png"),
    ("B15", 205.166667, 220.400000, "trailer-b15-multicolour-candidate-v1.png"),
    ("B31", 468.533333, 482.200000, "trailer-b31-multicolour-candidate-v1.png"),
    ("B56", 872.666667, 887.833333, "trailer-b56-multicolour-candidate-v1.png"),
]

# Preserve B39's corporate/smoke motion. Replace only the two disputed states.
B39_START = 569.666667
B39_END = 577.733333
B39_STATES = [
    # Begin while the body is still smoke-covered so the rejected yellow
    # outfit can never flash through during the clearing transition.
    ("B39-p3", B39_START + 3.35, B39_START + 6.20, "trailer-b39-p3-multicolour-candidate-v1.png", 0.12, 0.18),
    ("B39-p4", B39_START + 6.00, B39_END, "trailer-b39-p4-multicolour-candidate-v1.png", 0.22, 0.00),
]


def run(args: list[str]) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    return {
        "path": str(path.relative_to(ROOT)),
        "sha256": sha256(path),
        "size_bytes": path.stat().st_size,
    }


def stream_hash(path: Path, selector: str) -> str:
    output = subprocess.check_output([
        str(FFMPEG), "-v", "error", "-i", str(path), "-map", selector,
        "-c", "copy", "-f", "hash", "-hash", "sha256", "-",
    ], cwd=ROOT, text=True)
    return output.strip().split("=", 1)[1]


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)], cwd=ROOT,
        text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def build() -> list[dict[str, object]]:
    sources = [CANDIDATE_DIR / filename for _, _, _, filename in STILLS]
    sources += [CANDIDATE_DIR / item[3] for item in B39_STATES]
    command = [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(BASE)]
    for source in sources:
        command += ["-loop", "1", "-i", str(source)]

    filters = ["[0:v]fps=30,format=yuv420p,setsar=1[base]"]
    current = "base"
    changes: list[dict[str, object]] = []
    for occurrence, (beat, start, end, filename) in enumerate(STILLS, start=1):
        duration = end - start
        prepared = f"still{occurrence}"
        output = f"overlay{occurrence}"
        filters.append(
            f"[{occurrence}:v]fps=30,scale=1920:1080,trim=duration={duration:.6f},"
            f"setpts=PTS-STARTPTS+{start:.6f}/TB,format=yuv420p,setsar=1[{prepared}]"
        )
        filters.append(
            f"[{current}][{prepared}]overlay=0:0:eof_action=pass:shortest=0:"
            f"enable='between(t,{start:.6f},{end:.6f})'[{output}]"
        )
        current = output
        changes.append({
            "beat": beat, "start_seconds": start, "end_seconds": end,
            "replacement": record(CANDIDATE_DIR / filename),
            "policy": "replace existing still beat without changing its clock",
        })

    first_state_index = len(STILLS) + 1
    for offset, (beat, start, end, filename, fade_in, fade_out) in enumerate(B39_STATES):
        source_index = first_state_index + offset
        duration = end - start
        prepared = f"b39state{offset + 1}"
        output = f"b39overlay{offset + 1}"
        fade_filters = f",fade=t=in:st=0:d={fade_in:.3f}:alpha=1" if fade_in else ""
        if fade_out:
            fade_filters += f",fade=t=out:st={max(0.0, duration - fade_out):.3f}:d={fade_out:.3f}:alpha=1"
        filters.append(
            f"[{source_index}:v]fps=30,scale=1920:1080,trim=duration={duration:.6f},"
            f"format=rgba{fade_filters},setpts=PTS-STARTPTS+{start:.6f}/TB[{prepared}]"
        )
        filters.append(
            f"[{current}][{prepared}]overlay=0:0:eof_action=pass:shortest=0:"
            f"enable='between(t,{start:.6f},{end:.6f})'[{output}]"
        )
        current = output
        changes.append({
            "beat": beat, "start_seconds": start, "end_seconds": end,
            "replacement": record(CANDIDATE_DIR / filename),
            "policy": "retain original B39 motion; dissolve only the disputed wardrobe state",
        })

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    command += [
        "-filter_complex", ";".join(filters), "-map", f"[{current}]", "-map", "0:a:0",
        "-t", f"{DURATION:.3f}", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
        "-pix_fmt", "yuv420p", "-r", "30", "-fps_mode", "cfr", "-c:a", "copy",
        "-movflags", "+faststart", str(OUTPUT),
    ]
    run(command)
    return changes


def make_contact() -> None:
    samples = [
        ("B01", 2.0), ("B04", 39.0), ("B07", 91.0), ("B15", 212.0),
        ("B31", 475.0), ("B39 corporate", 570.0), ("B39 poof", 573.8),
        ("B39 clears", 575.0), ("B39 reveal", 576.8), ("B56", 880.0),
        ("B14 preserved", 200.0), ("Ident preserved", 102.0),
    ]
    thumb = (480, 270)
    sheet = Image.new("RGB", (1920, 900), "#21102c")
    draw = ImageDraw.Draw(sheet)
    font_path = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    font = ImageFont.truetype(str(font_path), 23) if font_path.exists() else ImageFont.load_default()
    with tempfile.TemporaryDirectory(prefix="trailer-v8-contact-") as directory:
        for index, (label, timestamp) in enumerate(samples):
            frame = Path(directory) / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}", "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            image = Image.open(frame).convert("RGB").resize(thumb, Image.Resampling.LANCZOS)
            x = (index % 4) * thumb[0]
            y = (index // 4) * 300
            sheet.paste(image, (x, y))
            draw.rectangle((x, y + 238, x + thumb[0], y + 270), fill="#38163f")
            draw.text((x + 12, y + 242), f"{label} · {timestamp:.1f}s", fill="#fff7cf", font=font)
    sheet.save(CONTACT, quality=92, optimize=True)


def main() -> None:
    required = [BASE, CAPTIONS]
    required += [CANDIDATE_DIR / filename for _, _, _, filename in STILLS]
    required += [CANDIDATE_DIR / item[3] for item in B39_STATES]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n- " + "\n- ".join(missing))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    changes = build()
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    duration = probe_duration(OUTPUT)
    if abs(duration - DURATION) > 0.05:
        raise RuntimeError(f"Unexpected duration: {duration}")
    if stream_hash(BASE, "0:a:0") != stream_hash(OUTPUT, "0:a:0"):
        raise RuntimeError("Frozen audio payload changed")
    make_contact()
    manifest = {
        "schema": "laidies.trailer.multicolour-successor.v1",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT LOCALLY / HOLD",
        "authority": {"accepted": False, "release": False, "deploy": False, "publication": False, "public_player_binding": False},
        "base": record(BASE), "captions": record(CAPTIONS), "output": record(OUTPUT),
        "contact": record(CONTACT), "duration_seconds": duration,
        "audio_payload_sha256": stream_hash(OUTPUT, "0:a:0"), "full_av_decode": "PASS",
        "changed_picture_occurrences": changes,
        "preserved": [
            "exact v7 audio payload", "external 206-cue VTT", "B08 approved LAiDIES ident",
            "B14 found-home sequence", "all v6 non-outfit occurrence repairs", "B39 corporate and poof-build motion",
        ],
        "remaining_gate": "Ali or another qualified human watches this exact local candidate unmuted at 1x and returns PASS or timecoded HOLD.",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"output": record(OUTPUT), "contact": record(CONTACT), "manifest": record(MANIFEST)}, indent=2))


if __name__ == "__main__":
    main()
