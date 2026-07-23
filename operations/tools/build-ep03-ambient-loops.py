#!/usr/bin/env python3
"""Build foreground-locked Episode 3 ambient loops from the approved stills.

Canva's image-to-video passes are useful motion references, but they can deform
faces, bodies, lettering, and props.  These delivery loops keep every source
pixel fixed and confine the requested light/rain/dust motion to explicitly
bounded background regions.  Every animated expression is periodic over five
seconds, and the overlay fades to zero on both endpoint frames.
"""

from __future__ import annotations

import subprocess
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COMIC = ROOT / "assets/episodes/ep-03/comic"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FPS = 30
LOOP_SECONDS = 5
# Frame 149 is the last frame in a 150-frame/5-second clip.  Expressions use
# its timestamp as the period so the final encoded frame equals frame zero.
LOOP_ENDPOINT = (FPS * LOOP_SECONDS - 1) / FPS


@dataclass(frozen=True)
class LoopSpec:
    cue: int
    source: str
    boxes: tuple[tuple[int, int, int, int, str, float], ...]
    particles: str = ""


SPECS = (
    LoopSpec(
        3,
        "ep03-scene-01-cold-open-desk-comic-rebalance-v1.png",
        (
            (1260, 80, 660, 720, "B9E8FF", 0.13),
            (1160, 700, 620, 300, "FFD28B", 0.045),
        ),
    ),
    LoopSpec(
        4,
        "ep03-scene-01b-the-lie-caught-comic-a-start-v2-fix.png",
        ((0, 0, 1510, 920, "DDF4FF", 0.105),),
        "scanline",
    ),
    LoopSpec(
        5,
        "ep03-scene-01b-the-lie-caught-comic-b-end-v2-fix.png",
        ((1320, 260, 600, 820, "A9DFFF", 0.075),),
        "scanline_right",
    ),
    LoopSpec(
        6,
        "ep03-scene-02-couldnt-help-but-wonder-comic.png",
        (
            (0, 0, 610, 900, "90CFFF", 0.035),
            (1340, 0, 580, 800, "90CFFF", 0.035),
        ),
        "rain",
    ),
    LoopSpec(
        9,
        "ep03-scene-03-newsstand-comic.png",
        (
            (330, 0, 1320, 300, "FF81D5", 0.075),
            (0, 260, 500, 620, "FFD76F", 0.035),
            (1500, 260, 420, 620, "57E6E6", 0.035),
        ),
        "paper",
    ),
    LoopSpec(
        11,
        "ep03-scene-04-regina-burn-book-comic-v3-clean.png",
        (
            (0, 0, 760, 690, "FFD187", 0.055),
            (1450, 160, 470, 760, "FFD187", 0.035),
        ),
        "dust_right",
    ),
    LoopSpec(
        14,
        "ep03-scene-05-bethany-byrd-comic-rebalance-v1.png",
        (
            (1030, 650, 590, 360, "E8F6FF", 0.07),
            (0, 0, 1920, 330, "B7D8FF", 0.025),
        ),
    ),
    LoopSpec(
        17,
        "ep03-scene-07-doesnt-go-here-comic-rebalance-v1.png",
        (
            (0, 0, 700, 360, "A9D9FF", 0.035),
            (1230, 0, 690, 370, "A9D9FF", 0.035),
        ),
    ),
    LoopSpec(
        19,
        "ep03-scene-07b-wrong-room-comic-rebalance-v1.png",
        (
            (0, 0, 960, 480, "EDF7FF", 0.022),
            (960, 0, 960, 480, "FFD5E8", 0.022),
        ),
    ),
    LoopSpec(
        21,
        "ep03-scene-08-elle-file-comic-rebalance-v1.png",
        (
            (760, 0, 900, 570, "F8D99A", 0.055),
            (1440, 200, 480, 680, "FFD690", 0.025),
        ),
        "dust_center",
    ),
    LoopSpec(
        22,
        "ep03-scene-08b-chutney-stand-comic.png",
        (
            (0, 0, 610, 770, "F6D698", 0.032),
            (1420, 0, 500, 760, "F6D698", 0.032),
        ),
    ),
    LoopSpec(
        25,
        "ep03-scene-09-chers-closet-comic-rebalance-v1.png",
        ((1230, 500, 690, 580, "BFEAFF", 0.085),),
        "screen_cycle",
    ),
    LoopSpec(
        30,
        "ep03-scene-10-law-clerk-comic.png",
        (
            (0, 410, 430, 600, "A7FF9E", 0.065),
            (850, 0, 700, 610, "FFE2A3", 0.04),
        ),
        "dust_window",
    ),
    LoopSpec(
        38,
        "ep03-scene-12-prompt-like-elle-comic.png",
        (
            (760, 0, 650, 680, "FFE7AD", 0.035),
            (1330, 500, 590, 520, "FFF0C3", 0.018),
        ),
    ),
    LoopSpec(
        45,
        "ep03-scene-14-receipts-pass-comic-rebalance-v2-hair-cleanup.png",
        (
            (1180, 520, 650, 560, "D9FFB3", 0.032),
            (240, 760, 1160, 320, "FFF3CA", 0.022),
        ),
    ),
)


def particle_filters(kind: str) -> list[str]:
    filters: list[str] = []
    if kind == "scanline":
        for offset in (40, 260, 490, 710):
            filters.append(
                "drawbox=x=0:"
                f"y='mod({offset}+{920 / LOOP_ENDPOINT:.4f}*t\\,920)':"
                "w=1510:h=4:color=#DFFFFF@0.180:t=fill"
            )
    elif kind == "scanline_right":
        for offset in (20, 220, 430, 650):
            filters.append(
                "drawbox=x=1320:"
                f"y='260+mod({offset}+{820 / LOOP_ENDPOINT:.4f}*t\\,820)':"
                "w=600:h=3:color=#B9EFFF@0.165:t=fill"
            )
    elif kind == "rain":
        for i, x in enumerate((55, 140, 245, 360, 480, 545)):
            filters.append(
                f"drawbox=x={x}:"
                f"y='mod({i * 137}+{900 / LOOP_ENDPOINT:.4f}*t\\,900)':"
                "w=3:h=88:color=#CDEFFF@0.240:t=fill"
            )
        for i, x in enumerate((1380, 1470, 1590, 1710, 1830)):
            filters.append(
                f"drawbox=x={x}:"
                f"y='mod({i * 149}+{800 / LOOP_ENDPOINT:.4f}*t\\,800)':"
                "w=3:h=78:color=#CDEFFF@0.220:t=fill"
            )
    elif kind.startswith("dust"):
        if kind == "dust_right":
            region = (1450, 150, 430, 720)
        elif kind == "dust_center":
            region = (760, 40, 850, 520)
        elif kind == "dust_window":
            region = (850, 0, 700, 610)
        else:
            region = (700, 0, 800, 650)
        x0, y0, w, h = region
        for i in range(14):
            x = x0 + ((i * 173) % max(w - 10, 1))
            start = (i * 97) % max(h - 10, 1)
            size = 2 + i % 3
            filters.append(
                f"drawbox=x={x}:"
                f"y='{y0}+mod({start}+{h / LOOP_ENDPOINT:.4f}*t\\,{h})':"
                f"w={size}:h={size}:color=#FFF3C8@0.280:t=fill"
            )
    elif kind == "screen_cycle":
        for offset, colour in ((0, "C8F2FF"), (190, "E0D6FF"), (380, "C8F2FF")):
            filters.append(
                "drawbox=x=1230:"
                f"y='500+mod({offset}+{580 / LOOP_ENDPOINT:.4f}*t\\,580)':"
                f"w=690:h=5:color=#{colour}@0.160:t=fill"
            )
    return filters


def build(spec: LoopSpec) -> Path:
    source = COMIC / spec.source
    output = COMIC / f"ep03-cue{spec.cue:02d}-canva-ambient-loop-v1.mp4"
    if not source.exists():
        raise FileNotFoundError(source)

    split_labels = "[main]" + "".join(
        f"[region{i}]" for i in range(len(spec.boxes))
    )
    graph = [
        "[0:v]scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p,"
        f"split={len(spec.boxes) + 1}{split_labels}"
    ]
    for i, (x, y, w, h, _colour, alpha) in enumerate(spec.boxes):
        # A 7–10% local luminance swing clears the encoder floor while remaining
        # restrained.  The crop is overlaid at its original location, so no
        # source pixel ever travels or warps.
        strength = max(0.07, min(0.10, alpha * 0.80))
        feather = min(90, max(24, w // 4), max(24, h // 4))
        edge_alpha = (
            f"min(1\\,min(min(X/{feather}\\,(W-1-X)/{feather})\\,"
            f"min(Y/{feather}\\,(H-1-Y)/{feather})))"
        )
        graph.append(
            f"[region{i}]crop={w}:{h}:{x}:{y},"
            f"eq=brightness='{strength:.4f}*"
            f"(1-cos(2*PI*t/{LOOP_ENDPOINT:.6f}))/2':eval=frame,"
            f"format=rgba[bright{i}]"
        )
        graph.append(
            f"color=c=white:s={w}x{h}:r={FPS}:d={LOOP_SECONDS},"
            f"format=gray,geq=lum='255*{edge_alpha}'[mask{i}]"
        )
        graph.append(
            f"[bright{i}][mask{i}]alphamerge[glow{i}]"
        )
    previous = "main"
    for i, (x, y, _w, _h, _colour, _alpha) in enumerate(spec.boxes):
        current = f"lit{i}"
        graph.append(
            f"[{previous}][glow{i}]overlay=x={x}:y={y}:shortest=1[{current}]"
        )
        previous = current
    final_filters = [*particle_filters(spec.particles), "format=yuv420p"]
    graph.append(f"[{previous}]{','.join(final_filters)}[out]")
    filter_complex = ";".join(graph)

    cmd = [
        str(FFMPEG),
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-i",
        str(source),
        "-filter_complex",
        filter_complex,
        "-map",
        "[out]",
        "-t",
        str(LOOP_SECONDS),
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "18",
        "-movflags",
        "+faststart",
        str(output),
    ]
    subprocess.run(cmd, check=True)
    print(output.relative_to(ROOT))
    return output


def main() -> None:
    if not FFMPEG.exists():
        raise FileNotFoundError(FFMPEG)
    for spec in SPECS:
        build(spec)


if __name__ == "__main__":
    main()
