"""Surgically replace the two approved Episode 2 card windows in the v15 master."""

from pathlib import Path
import argparse
import subprocess


HERE = Path(__file__).resolve().parent
FFMPEG = (
    Path.home()
    / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/"
    / "ffmpeg-macos-aarch64-v7.1"
)
BASE = HERE / "episode-02-narration-motion-v15-comic-sync-review.mp4"
DELIVERY = HERE / "delivery-20260723-ep02-v16-cover-v3"
TITLE = DELIVERY / "ep02-open-03-title-comic.png"
SPICE = DELIVERY / "ep02-cue-20-episode-style.png"
TITLE_IN_FRAME = DELIVERY / "transition-title-in-v15.png"
TITLE_OUT_FRAME = DELIVERY / "transition-title-out-v15.png"
SPICE_IN_FRAME = DELIVERY / "transition-spice-in-v15.png"
SPICE_OUT_FRAME = DELIVERY / "transition-spice-out-v15.png"
OUTPUT = HERE / "episode-02-narration-motion-v16-card-fixes.mp4"

FPS = 30
RUNTIME = 987.467
FADE = 0.55

TITLE_IN = 20.0
TITLE_NEXT = 31.4
TITLE_END = TITLE_NEXT + FADE

SPICE_IN = 299.55
SPICE_NEXT = 315.5
SPICE_END = SPICE_NEXT + FADE


def build(output: Path, end: float) -> None:
    for required in (
        FFMPEG,
        BASE,
        TITLE,
        SPICE,
        TITLE_IN_FRAME,
        TITLE_OUT_FRAME,
        SPICE_IN_FRAME,
        SPICE_OUT_FRAME,
    ):
        if not required.exists():
            raise FileNotFoundError(required)

    title_duration = TITLE_END - TITLE_IN
    spice_duration = SPICE_END - SPICE_IN
    filters = [
        (
            f"[1:v]scale=3840:2160,"
            f"zoompan=z='min(zoom+0.000006,1.008)':"
            f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"d=1:s=1920x1080:fps={FPS},"
            f"setsar=1,format=yuv420p[title]"
        ),
        f"[3:v]scale=1920:1080,setsar=1,format=yuv420p[title_in]",
        f"[4:v]scale=1920:1080,setsar=1,format=yuv420p[title_out]",
        (
            f"[title_in][title]xfade=transition=fade:duration={FADE}:offset=0"
            f"[title_started]"
        ),
        (
            f"[title_started][title_out]xfade=transition=fade:duration={FADE}:"
            f"offset={TITLE_NEXT - TITLE_IN},"
            f"setpts=PTS+{TITLE_IN}/TB[title_segment]"
        ),
        f"[2:v]scale=1920:1080,setsar=1,format=yuv420p[spice]",
        f"[5:v]scale=1920:1080,setsar=1,format=yuv420p[spice_in]",
        f"[6:v]scale=1920:1080,setsar=1,format=yuv420p[spice_out]",
        (
            f"[spice_in][spice]xfade=transition=fade:duration={FADE}:offset=0"
            f"[spice_started]"
        ),
        (
            f"[spice_started][spice_out]xfade=transition=fade:duration={FADE}:"
            f"offset={SPICE_NEXT - SPICE_IN},"
            f"setpts=PTS+{SPICE_IN}/TB[spice_segment]"
        ),
        (
            f"[0:v][title_segment]overlay=eof_action=pass:repeatlast=0:"
            f"enable='between(t,{TITLE_IN},{TITLE_END})'[title_fixed]"
        ),
        (
            f"[title_fixed][spice_segment]overlay=eof_action=pass:repeatlast=0:"
            f"enable='between(t,{SPICE_IN},{SPICE_END})',"
            f"format=yuv420p[video]"
        ),
    ]

    command = [
        str(FFMPEG),
        "-y",
        "-hide_banner",
        "-loglevel",
        "warning",
        "-i",
        str(BASE),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-t",
        f"{title_duration:.3f}",
        "-i",
        str(TITLE),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-t",
        f"{spice_duration:.3f}",
        "-i",
        str(SPICE),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-t",
        f"{FADE:.3f}",
        "-i",
        str(TITLE_IN_FRAME),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-t",
        f"{FADE:.3f}",
        "-i",
        str(TITLE_OUT_FRAME),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-t",
        f"{FADE:.3f}",
        "-i",
        str(SPICE_IN_FRAME),
        "-loop",
        "1",
        "-framerate",
        str(FPS),
        "-t",
        f"{FADE:.3f}",
        "-i",
        str(SPICE_OUT_FRAME),
        "-filter_complex",
        ";".join(filters),
        "-map",
        "[video]",
        "-map",
        "0:a:0",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "copy",
        "-t",
        f"{end:.3f}",
        str(output),
    ]
    subprocess.run(command, check=True)
    print(output)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--end", type=float, default=RUNTIME)
    args = parser.parse_args()
    build(args.output, args.end)


if __name__ == "__main__":
    main()
