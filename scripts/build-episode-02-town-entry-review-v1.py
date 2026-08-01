#!/usr/bin/env python3
"""Build the Episode 02 SUNNYVAiLE entry sequence and a bounded context review.

This script never changes the episode master. It assembles the five approved
no-wand transformation frames, adds the shared silent town-entry cue, and
replaces only the narration interval from "So I did..." through "...town" in a
short review excerpt. The original episode audio remains continuous.
"""

from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "operations/video-qa/town-entry-transformation-cue-v1"
FRAME_DIR = OUT / "frames/episode-02"

MASTER = ROOT / "assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4"
CUE = OUT / "sunnyvaile-town-entry-cue-overlay-v1.mov"
SOURCES = [
    ROOT / "assets/episodes/ep-02/comic/ep02-open-09p0-transformation-stage-corporate-no-wand-comic.png",
    ROOT / "assets/episodes/ep-02/comic/ep02-open-09p1-transformation-poof-build-no-wand-comic.png",
    ROOT / "assets/episodes/ep-02/comic/ep02-open-09p2-transformation-poof-cover-no-wand-comic.png",
    ROOT / "assets/episodes/ep-02/comic/ep02-open-09p3-transformation-poof-clearing-empire-records-no-wand-comic.png",
    ROOT / "assets/episodes/ep-02/comic/ep02-open-09p4-transformation-reveal-empire-records-no-wand-comic.png",
]

SEQUENCE = OUT / "episode-02-town-entry-sequence-v1.mp4"
CONTEXT = OUT / "episode-02-town-entry-context-review-v1.mp4"
CONTACT = OUT / "episode-02-town-entry-context-contact-v1.png"

WIDTH = 1920
HEIGHT = 1080
FPS = 30
SEQUENCE_DURATION = 6.32
CONTEXT_START = 117.00
TRANSFORMATION_START = 122.77
TRANSFORMATION_END = 129.09
CONTEXT_END = 134.95
RELATIVE_TRANSFORMATION_START = TRANSFORMATION_START - CONTEXT_START
RELATIVE_TRANSFORMATION_END = TRANSFORMATION_END - CONTEXT_START
CONTEXT_DURATION = CONTEXT_END - CONTEXT_START

PLUM = (53, 17, 63)
WHITE = (255, 248, 241)
JOST = ROOT / "operations/design-explorations/study-pack-storefront-20260728/prototype/public/fonts/Jost-ExtraBold.ttf"


def run(*args: str) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def extract_frame(ffmpeg: str, timestamp: float, output: Path) -> None:
    run(
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-ss",
        f"{timestamp:.3f}",
        "-i",
        str(CONTEXT),
        "-frames:v",
        "1",
        str(output),
    )


def make_contact() -> None:
    samples = [
        (4.75, "BEFORE · WHY THE ASK MATTERS"),
        (6.57, "NOW ENTERING SUNNYVAiLE"),
        (7.70, "REWIND ERA GLOW-UP"),
        (8.90, "CUE CLEARS · REVEAL BEGINS"),
        (10.65, "EPISODE-SPECIFIC LOOK HOLDS"),
        (13.80, "RETURN · BLEND & SNAP"),
    ]
    label_font = ImageFont.truetype(str(JOST), 26)
    tiles: list[Image.Image] = []
    for timestamp, label in samples:
        source = FRAME_DIR / f"context-{timestamp:05.2f}.png"
        tile = Image.open(source).convert("RGB").resize((640, 360), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (640, 408), PLUM)
        canvas.paste(tile, (0, 0))
        ImageDraw.Draw(canvas).text((18, 369), f"{timestamp:05.2f}s · {label}", font=label_font, fill=WHITE)
        tiles.append(canvas)

    contact = Image.new("RGB", (1920, 816), (18, 8, 24))
    for index, tile in enumerate(tiles):
        contact.paste(tile, ((index % 3) * 640, (index // 3) * 408))
    contact.save(CONTACT, optimize=True)


def main() -> None:
    required = [MASTER, CUE, JOST, *SOURCES]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing required source(s):\n- " + "\n- ".join(missing))

    OUT.mkdir(parents=True, exist_ok=True)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

    # No synthetic zooms. The five canonical states cross-dissolve at the exact
    # shared-cue beats; the final look holds after the cue has completely cleared.
    # The xfade chain trims a few terminal frames; the final source therefore
    # carries a small guard tail so the encoded sequence still fills the exact
    # 6.32-second narration interval.
    image_durations = (0.82, 0.82, 0.90, 0.90, 3.32)
    inputs: list[str] = []
    for duration, source in zip(image_durations, SOURCES):
        inputs.extend(("-loop", "1", "-t", f"{duration:.2f}", "-i", str(source)))
    inputs.extend(("-i", str(CUE)))

    sequence_filter = (
        "[0:v]fps=30,format=yuv420p,setsar=1[v0];"
        "[1:v]fps=30,format=yuv420p,setsar=1[v1];"
        "[2:v]fps=30,format=yuv420p,setsar=1[v2];"
        "[3:v]fps=30,format=yuv420p,setsar=1[v3];"
        "[4:v]fps=30,format=yuv420p,setsar=1[v4];"
        "[v0][v1]xfade=transition=fade:duration=0.12:offset=0.70[x1];"
        "[x1][v2]xfade=transition=fade:duration=0.12:offset=1.40[x2];"
        "[x2][v3]xfade=transition=fade:duration=0.12:offset=2.18[x3];"
        "[x3][v4]xfade=transition=fade:duration=0.12:offset=3.08[base];"
        # Keep the shared cue visually subordinate and clear of the centred
        # character. Scaling the transparent canvas preserves the approved cue
        # artwork while moving its right edge safely away from her face.
        "[5:v]scale=1498:842[cue];"
        "[base][cue]overlay=x=50:y=50:eof_action=pass:shortest=0:format=auto,"
        "fps=30,format=yuv420p[v]"
    )
    run(
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        *inputs,
        "-filter_complex",
        sequence_filter,
        "-map",
        "[v]",
        "-an",
        "-t",
        f"{SEQUENCE_DURATION:.2f}",
        "-c:v",
        "libx264",
        "-crf",
        "16",
        "-preset",
        "medium",
        "-movflags",
        "+faststart",
        str(SEQUENCE),
    )

    context_filter = (
        f"[0:v]trim=start=0:end={RELATIVE_TRANSFORMATION_START:.2f},"
        "setpts=PTS-STARTPTS,fps=30,format=yuv420p[v0];"
        "[1:v]trim=start=0:end=6.32,setpts=PTS-STARTPTS,fps=30,format=yuv420p[v1];"
        f"[0:v]trim=start={RELATIVE_TRANSFORMATION_END:.2f}:end={CONTEXT_DURATION:.2f},"
        "setpts=PTS-STARTPTS,fps=30,format=yuv420p[v2];"
        "[v0][v1][v2]concat=n=3:v=1:a=0[v];"
        f"[0:a]atrim=start=0:end={CONTEXT_DURATION:.2f},asetpts=PTS-STARTPTS[a]"
    )
    run(
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-ss",
        f"{CONTEXT_START:.2f}",
        "-t",
        f"{CONTEXT_DURATION:.2f}",
        "-i",
        str(MASTER),
        "-i",
        str(SEQUENCE),
        "-filter_complex",
        context_filter,
        "-map",
        "[v]",
        "-map",
        "[a]",
        "-c:v",
        "libx264",
        "-crf",
        "17",
        "-preset",
        "medium",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-movflags",
        "+faststart",
        str(CONTEXT),
    )

    for timestamp in (4.75, 6.57, 7.70, 8.90, 10.65, 13.80):
        extract_frame(ffmpeg, timestamp, FRAME_DIR / f"context-{timestamp:05.2f}.png")
    make_contact()

    print(f"Built {SEQUENCE.relative_to(ROOT)}")
    print(f"Built {CONTEXT.relative_to(ROOT)}")
    print(f"Built {CONTACT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
