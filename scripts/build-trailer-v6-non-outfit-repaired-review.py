#!/usr/bin/env python3
"""Build the Trailer v6 non-outfit occurrence-repair master in one pass.

This successor restores existing purposeful motion, corrects the two material
picture/narration hand-offs, and replaces the 64-second static anthem card with
a narration-aware recap. Seven disputed heroine-outfit occurrences and B14's
missing approved motion remain deliberately untouched and on HOLD.

The output is local review evidence only. It carries no acceptance, release,
deployment, publication, or public-player authority.
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

BASE = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v5-welcome-ident-review-1920.mp4"
BASE_SHA = "e8bbc8e4289880a92f50bf3a10586f1512fd0cc92fc08d1b85f2694527171222"
CAPTIONS = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt"
BEAT_MAP = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/trailer-v4-exact-58-beat-map.json"
ASSET_ROOT = ROOT / "assets/episodes/trailer/comic"
OUT_DIR = ROOT / "operations/video-qa/trailer-v6-non-outfit-repaired-review"
OUTPUT = ASSET_ROOT / "delivery/canonical-named-map/laidies-trailer-comic-v6-non-outfit-repaired-review-1920.mp4"
MANIFEST = OUT_DIR / "manifest.json"
CONTACT = OUT_DIR / "trailer-v6-contact.jpg"

FPS = 30
WIDTH = 1920
HEIGHT = 1080
DURATION = 967.2


def clip(name: str) -> Path:
    return ASSET_ROOT / name


# Purposeful source motion already present in the repository. B19 deliberately
# uses the approved-title successor rather than the older title clip.
MOTION = {
    "B02": clip("trailer-b02-era-tv-24-episodes-comic-v1-1920-clip.mp4"),
    "B03": clip("trailer-b03-over-coffee-comic-v1-1920-clip.mp4"),
    "B06": clip("trailer-b06-emphasis-make-the-mistakes-comic-v1-1920-clip.mp4"),
    "B09": clip("trailer-b09-the-name-gag-comic-v1-1920-clip.mp4"),
    "B10": clip("trailer-b10-brain-vs-town-comic-v1-1920-clip.mp4"),
    "B11": clip("trailer-b11-era-montage-comic-v1-1920-clip.mp4"),
    "B18": clip("trailer-b18-echo-wheel-worlds-work-comic-v1-1920-clip.mp4"),
    "B19": clip("trailer-b19-on-wednesdays-we-do-ai-title-approved-v2-1920-clip.mp4"),
    "B20": clip("trailer-b20-town-dresses-for-wednesday-comic-v1-1920-clip.mp4"),
    "B21": clip("trailer-b21-nothing-expires-comic-v1-1920-clip.mp4"),
    "B22": clip("trailer-b22-lead-in-to-tours-comic-v1-1920-clip.mp4"),
    "B24": clip("trailer-b24-express-4-stops-comic-v1-1920-clip.mp4"),
    "B25": clip("trailer-b25-full-8-stops-tour-guide-comic-v1-1920-clip.mp4"),
    "B26": clip("trailer-b26-newsstand-plain-english-comic-v1-1920-clip.mp4"),
    "B27": clip("trailer-b27-chick-flicks-aisles-comic-v1-1920-clip.mp4"),
    "B28": clip("trailer-b28-screening-room-comic-v1-1920-clip.mp4"),
    "B29": clip("trailer-b29-blend-snap-study-pack-comic-v1-1920-clip.mp4"),
    "B30": clip("trailer-b30-trading-card-pack-comic-v1-1920-clip.mp4"),
    "B33": clip("trailer-b33-high-pop-quiz-comic-v1-1920-clip.mp4"),
    "B35": clip("trailer-b35-mme-claio-reading-comic-v1-1920-clip.mp4"),
    "B36": clip("trailer-b36-dream-phone-comic-v1-1920-clip.mp4"),
    "B37": clip("trailer-b37-fairy-godmother-comic-v1-1920-clip.mp4"),
    "B38": clip("trailer-b38-charm-hunt-comic-v1-1920-clip.mp4"),
    "B40": clip("trailer-b40-tourist-to-resident-comic-v1-1920-clip.mp4"),
    "B41": clip("trailer-b41-bronze-businesswomens-special-comic-v1-1920-clip.mp4"),
    "B43": clip("trailer-b43-room-types-strip-comic-v1-1920-clip.mp4"),
    "B44": clip("trailer-b44-girl-talk-comic-v1-1920-clip.mp4"),
    "B50": clip("trailer-b50-emphasis-learn-from-hooks-comic-v1-1920-clip.mp4"),
    "B51": clip("trailer-b51-post-office-letter-comic-v1-1920-clip.mp4"),
    "B52": clip("trailer-b52-mall-flair-comic-v1-1920-clip.mp4"),
    "B53": clip("trailer-b53-mayor-deb-comic-v1-1920-clip.mp4"),
    "B54": clip("trailer-b54-luminairy-comic-v1-1920-motion.mp4"),
    "B55": clip("trailer-b55-brand-card-approved-wordmark-v3-1920-clip.mp4"),
    "B58": clip("trailer-b58-end-card-dial-up-no-obsolete-wordmark-v2-1920-clip.mp4"),
    "B13": clip("trailer-b13-town-establishing-wide-comic-v1-1920-motion.mp4"),
}


# Start/end are exact 30fps picture intervals. B27/B28 and B44/B45 are the two
# material retimes: the screening room now starts on the screening-room words,
# and Girl Talk remains visible through the spoken "upstairs" hand-off.
WINDOWS = [
    ("B02", 6.366667, 22.066667), ("B03", 22.066667, 36.166667),
    ("B06", 60.533333, 82.866667), ("B09", 105.366667, 126.033333),
    ("B10", 126.033333, 138.100000), ("B11", 138.100000, 170.533333),
    ("B18", 240.166667, 276.566667), ("B19", 276.566667, 289.233333),
    ("B20", 289.233333, 308.233333), ("B21", 308.233333, 342.466667),
    ("B22", 342.466667, 360.200000), ("B24", 364.100000, 371.433333),
    ("B25", 371.433333, 395.833333), ("B26", 395.833333, 416.033333),
    ("B27", 416.033333, 431.966667), ("B28", 431.966667, 440.866667),
    ("B29", 440.866667, 460.466667), ("B30", 460.466667, 468.533333),
    ("B33", 489.566667, 507.633333), ("B35", 515.433333, 537.966667),
    ("B36", 537.966667, 542.033333), ("B37", 542.033333, 558.666667),
    ("B38", 558.666667, 569.666667), ("B40", 577.733333, 610.766667),
    ("B41", 610.766667, 632.366667), ("B43", 639.333333, 664.466667),
    ("B44", 664.466667, 675.866667), ("B50", 747.433333, 766.866667),
    ("B51", 766.866667, 783.633333), ("B52", 783.633333, 786.566667),
    ("B53", 786.566667, 816.800000), ("B54", 816.800000, 844.866667),
    ("B55", 844.866667, 872.666667),
]


# The anthem is a recap, not a 64-second hold. Each visual now follows the
# lyric: town arrival, women together, buzzword/brain contrast, the learning
# system, home in SUNNYVAiLE, Rewind Era memory, then the dial-up end card.
ANTHEM = [
    ("B58", 902.766667, 909.933333),
    ("B13", 909.933333, 918.966667),
    ("B03", 918.966667, 927.266667),
    ("B10", 927.266667, 938.400000),
    ("B18", 938.400000, 943.633333),
    ("B20", 943.633333, 953.500000),
    ("B11", 953.500000, 960.366667),
    ("B58", 960.366667, 967.200000),
]

UNRESOLVED = ["B01", "B04", "B07", "B14", "B15", "B31", "B39", "B56"]


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


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def build() -> list[dict[str, object]]:
    occurrences = WINDOWS + ANTHEM
    sources: list[Path] = []
    source_index: dict[Path, int] = {}
    for name, _, _ in occurrences:
        path = MOTION[name]
        if path not in source_index:
            source_index[path] = len(sources) + 1
            sources.append(path)

    command = [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(BASE)]
    for source in sources:
        command += ["-i", str(source)]

    filters = [f"[0:v]fps={FPS},format=yuv420p,setsar=1[base]"]
    current = "base"
    evidence: list[dict[str, object]] = []
    for occurrence, (name, start, end) in enumerate(occurrences, start=1):
        source = MOTION[name]
        index = source_index[source]
        target = end - start
        available = probe_duration(source)
        prepared = f"motion{occurrence}"
        # Play the intentional motion once, then freeze its resolved state only
        # when the narration window is longer than the authored clip.
        filters.append(
            f"[{index}:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,"
            f"pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2:color=black,fps={FPS},"
            f"tpad=stop_mode=clone:stop_duration={max(0.0, target - available + 0.10):.6f},"
            f"trim=duration={target:.6f},setpts=PTS-STARTPTS+{start:.6f}/TB,"
            f"format=yuv420p,setsar=1[{prepared}]"
        )
        output = f"overlay{occurrence}"
        filters.append(
            f"[{current}][{prepared}]overlay=0:0:eof_action=pass:shortest=0:"
            f"enable='between(t,{start:.6f},{end:.6f})'[{output}]"
        )
        current = output
        evidence.append({
            "beat": name,
            "start_seconds": start,
            "end_seconds": end,
            "source": str(source.relative_to(ROOT)),
            "source_sha256": sha256(source),
            "source_duration_seconds": round(available, 6),
            "policy": "purposeful-motion-once-then-resolved-frame" if available < target else "purposeful-motion-trimmed-to-window",
        })

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    command += [
        "-filter_complex", ";".join(filters), "-map", f"[{current}]", "-map", "0:a:0",
        "-t", f"{DURATION:.3f}", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
        "-pix_fmt", "yuv420p", "-r", str(FPS), "-fps_mode", "cfr", "-c:a", "copy",
        "-movflags", "+faststart", str(OUTPUT),
    ]
    run(command)
    return evidence


def stream_hash(path: Path, selector: str) -> str:
    output = subprocess.check_output([
        str(FFMPEG), "-v", "error", "-i", str(path), "-map", selector,
        "-c", "copy", "-f", "hash", "-hash", "sha256", "-",
    ], cwd=ROOT, text=True)
    return output.strip().split("=", 1)[1]


def make_contact() -> None:
    times = [2.0 + i * ((DURATION - 4.0) / 59) for i in range(60)]
    rows: list[Image.Image] = []
    frames: list[Image.Image] = []
    import tempfile
    with tempfile.TemporaryDirectory(prefix="trailer-v6-contact-") as td:
        for index, timestamp in enumerate(times):
            frame = Path(td) / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}", "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((320, 180), Image.Resampling.LANCZOS))
    for row in range(10):
        canvas = Image.new("RGB", (1920, 180), (16, 8, 24))
        for column in range(6):
            canvas.paste(frames[row * 6 + column], (column * 320, 0))
        rows.append(canvas)
    sheet = Image.new("RGB", (1920, 1800), (16, 8, 24))
    for row, image in enumerate(rows):
        sheet.paste(image, (0, row * 180))
    sheet.save(CONTACT, quality=92, optimize=True)


def main() -> None:
    required = [BASE, CAPTIONS, BEAT_MAP, *MOTION.values()]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n- " + "\n- ".join(sorted(set(missing))))
    if sha256(BASE) != BASE_SHA:
        raise SystemExit("Trailer v5 base hash changed; refusing to build")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    repairs = build()
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    if stream_hash(BASE, "0:a:0") != stream_hash(OUTPUT, "0:a:0"):
        raise RuntimeError("Frozen audio payload changed")
    duration = probe_duration(OUTPUT)
    if abs(duration - DURATION) > 0.05:
        raise RuntimeError(f"Unexpected duration: {duration}")
    make_contact()
    manifest = {
        "schema": "laidies.trailer.non-outfit-occurrence-repair.v1",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT LOCALLY / HOLD",
        "authority": {
            "accepted": False, "release": False, "deploy": False,
            "publication": False, "public_player_binding": False,
        },
        "base": record(BASE),
        "captions": record(CAPTIONS),
        "beat_map": record(BEAT_MAP),
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "duration_seconds": duration,
        "audio_payload_sha256": stream_hash(OUTPUT, "0:a:0"),
        "full_av_decode": "PASS",
        "repair_occurrences": repairs,
        "resolved_motion_beats": sorted({name for name, _, _ in WINDOWS}),
        "resolved_material_retimes": [
            {"handoff": "B27 to B28", "screening_room_starts_seconds": 431.966667},
            {"handoff": "B44 to B45", "girl_talk_ends_seconds": 675.866667},
        ],
        "anthem_policy": "eight-shot narration-aware recap; no 64-second static hold",
        "preserved": ["exact v5 audio payload", "external 206-cue VTT", "B08 approved LAiDIES ident"],
        "unresolved_occurrences": {
            "outfit_authority": ["B01", "B04", "B07", "B15", "B31", "B39", "B56"],
            "approved_motion_missing": ["B14"],
        },
        "remaining_gate": "Resolve seven outfit occurrences and B14 motion, then independent qualified human unmuted 1x full-title review.",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"output": record(OUTPUT), "manifest": record(MANIFEST), "contact": record(CONTACT)}, indent=2))


if __name__ == "__main__":
    main()
