#!/usr/bin/env python3

"""Build the ODC-101 narration-timed review animatic.

This intentionally creates a LOCAL/HOLD review artifact. It does not bind the
class registry or public player. The system voice is a timing witness, not an
approved release performance.
"""

from __future__ import annotations

import hashlib
import json
import math
import re
import shutil
import subprocess
import textwrap
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps
import imageio_ffmpeg

from media_builder_admission import AdmissionError, require_media_builder_admission


ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "operations/classes/odc-101-teaching-media-script-2026-08-02.json"
BUILD = ROOT / "operations/classes/media/odc-101-teaching-media-review-animatic-v1"
DELIVERY = ROOT / "assets/classes/odc-101"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SAY = Path("/usr/bin/say")
WIDTH, HEIGHT, FPS = 1920, 1080, 30

FONT_REGULAR = ROOT / "operations/design-explorations/study-pack-storefront-20260728/prototype/public/fonts/Jost-Regular.ttf"
FONT_BOLD = ROOT / "operations/design-explorations/study-pack-storefront-20260728/prototype/public/fonts/Jost-ExtraBold.ttf"

PLUM = "#39143b"
CREAM = "#fff7dc"
WHITE = "#fffaf7"
PINK = "#ef279f"
CORAL = "#ff675f"
YELLOW = "#ffd33d"
TEAL = "#19c8cc"
PURPLE = "#7450ed"
BLUE = "#64bde5"
INK = PLUM


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REGULAR), size=size)


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def gradient(stops: list[str], angle: float = 0.0) -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT))
    pixels = image.load()
    colours = [hex_rgb(item) for item in stops]
    radians = math.radians(angle)
    dx, dy = math.cos(radians), math.sin(radians)
    corners = [0, WIDTH * dx, HEIGHT * dy, WIDTH * dx + HEIGHT * dy]
    lo, hi = min(corners), max(corners)
    for y in range(HEIGHT):
        for x in range(WIDTH):
            t = ((x * dx + y * dy) - lo) / max(1, hi - lo)
            segment = min(len(colours) - 2, int(t * (len(colours) - 1)))
            local = t * (len(colours) - 1) - segment
            c0, c1 = colours[segment], colours[segment + 1]
            pixels[x, y] = tuple(round(c0[i] * (1 - local) + c1[i] * local) for i in range(3))
    return image


def wrap(draw: ImageDraw.ImageDraw, value: str, face: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in value.split("\n"):
        if not paragraph:
            lines.append("")
            continue
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = f"{current} {word}".strip()
            if draw.textbbox((0, 0), candidate, font=face)[2] <= width or not current:
                current = candidate
            else:
                lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], value: str,
                 face: ImageFont.FreeTypeFont, fill: str, width: int,
                 spacing: int = 12, anchor: str | None = None) -> int:
    x, y = xy
    lines = wrap(draw, value, face, width)
    line_height = face.size + spacing
    for line in lines:
        draw.text((x, y), line, font=face, fill=fill, anchor=anchor)
        y += line_height
    return y


def rounded(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill: str,
            radius: int = 36, outline: str | None = None, width: int = 4) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def header(draw: ImageDraw.ImageDraw, scene: dict, dark: bool = False) -> None:
    colour = CREAM if dark else INK
    draw.text((92, 74), scene["eyebrow"], font=font(34, True), fill=YELLOW if dark else CORAL)
    draw_wrapped(draw, (92, 145), scene["title"], font(78, True), colour, 1150, 2)


def fit_image(path: Path, box: tuple[int, int, int, int]) -> Image.Image:
    source = Image.open(path).convert("RGB")
    w, h = box[2] - box[0], box[3] - box[1]
    return ImageOps.fit(source, (w, h), method=Image.Resampling.LANCZOS)


def slide(scene: dict) -> Image.Image:
    visual = scene["visual"]
    if visual in {"title", "outro"}:
        image = gradient(["#ef279f", "#a85fd4", "#4f8fe4"], 28)
        dark = True
    elif visual in {"official-search", "interface"}:
        image = gradient(["#62cfe1", "#8caeea", "#ec78b6"], 14)
        dark = False
    elif visual in {"before-after", "task-map"}:
        image = gradient(["#ef5ca6", "#f7d45c", "#69cce0"], 8)
        dark = False
    else:
        image = gradient(["#ecd8f2", "#d9e9fb", "#f1cfe8"], 20)
        dark = False
    draw = ImageDraw.Draw(image)
    header(draw, scene, dark)

    if visual == "title":
        draw_wrapped(draw, (95, 525), scene["deck"], font(48, True), CREAM, 1200, 12)
        labels = [("APP", PINK), ("MODEL", TEAL), ("CONTEXT", YELLOW), ("CHECK", CORAL)]
        for index, (label, colour) in enumerate(labels):
            x = 95 + index * 350
            rounded(draw, (x, 780, x + 300, 930), colour, 72, INK, 5)
            draw.text((x + 150, 855), label, font=font(35, True), fill=INK, anchor="mm")
        draw.text((95, 990), "REVIEW ANIMATIC · PROVISIONAL VOICE · NOT PUBLIC", font=font(24, True), fill=CREAM)
    elif visual == "flow":
        labels = [("APP", PINK), ("MODEL", TEAL), ("TOOLS", YELLOW), ("RESPONSE", CORAL)]
        for index, (label, colour) in enumerate(labels):
            x = 95 + index * 445
            rounded(draw, (x, 560, x + 345, 760), colour, 44, INK, 5)
            draw.text((x + 172, 660), label, font=font(39, True), fill=INK, anchor="mm")
            if index < len(labels) - 1:
                draw.text((x + 392, 660), "→", font=font(62, True), fill=INK, anchor="mm")
        rounded(draw, (95, 825, 1790, 970), CREAM, 60, INK, 4)
        draw.text((942, 897), "CONTEXT MOVES THROUGH THE JOB · VERIFICATION STAYS WITH YOU", font=font(31, True), fill=INK, anchor="mm")
    elif visual == "interface":
        shot = ROOT / "operations/research/episode-01-three-tabs-one-task-20260727/chatgpt-logged-out-consumer-response.jpg"
        card = fit_image(shot, (850, 390, 1825, 1000))
        image.paste(card, (850, 390))
        draw.rounded_rectangle((830, 370, 1845, 1020), radius=30, outline=PURPLE, width=8)
        draw_wrapped(draw, (95, 530), scene["deck"], font(44, True), INK, 650, 18)
        draw.text((850, 1027), "NON-PERSONAL APP-SHELL CAPTURE · 2026-07-27", font=font(19, True), fill=INK)
    elif visual == "model":
        draw.ellipse((1210, 350, 1750, 890), fill=PURPLE, outline=INK, width=8)
        draw.ellipse((1320, 460, 1640, 780), fill=TEAL, outline=CREAM, width=10)
        draw.text((1480, 620), "MODEL", font=font(50, True), fill=INK, anchor="mm")
        draw_wrapped(draw, (95, 500), scene["deck"], font(48, True), INK, 900, 16)
        rounded(draw, (95, 800, 930, 950), CREAM, 36, INK, 4)
        draw.text((512, 875), "FLUENCY ≠ EVIDENCE", font=font(40, True), fill=CORAL, anchor="mm")
    elif visual == "context":
        items = ["YOUR REQUEST", "INSTRUCTIONS", "CONVERSATION", "FILES", "MEMORY", "TOOL RESULTS"]
        for index, item in enumerate(items):
            row, col = divmod(index, 3)
            x = 95 + col * 585
            y = 500 + row * 210
            colours = [PINK, TEAL, YELLOW, CORAL, PURPLE, BLUE]
            rounded(draw, (x, y, x + 510, y + 150), colours[index], 34, INK, 4)
            draw.text((x + 255, y + 75), item, font=font(31, True), fill=INK, anchor="mm")
        draw.text((95, 955), "CONTEXT IS WHAT ENTERED THE JOB. IT IS NOT AUTOMATICALLY TRUE.", font=font(30, True), fill=INK)
    elif visual == "official-search":
        shot = ROOT / "operations/classes/media/odc-101-interface-capture-2026-08-02/official-openai/chatgpt-search-source-picker.png"
        card = fit_image(shot, (875, 390, 1820, 1000))
        rounded(draw, (850, 365, 1845, 1025), WHITE, 34, INK, 5)
        image.paste(card, (875, 390))
        draw_wrapped(draw, (95, 500), scene["deck"], font(44, True), INK, 660, 18)
        draw.text((875, 1028), "OFFICIAL OPENAI HELP-CENTRE ILLUSTRATION · CHECKED 2026-08-02", font=font(18, True), fill=INK)
    elif visual == "before-after":
        left = (95, 430, 910, 990)
        right = (1010, 430, 1825, 990)
        rounded(draw, left, "#f7b8d8", 42, INK, 5)
        rounded(draw, right, "#9be2dc", 42, INK, 5)
        draw.text((145, 480), "QUESTION ONLY", font=font(34, True), fill=INK)
        draw_wrapped(draw, (145, 555), "Does the new rule apply on Friday?", font(44, True), INK, 700, 14)
        draw.text((145, 845), "MISSING: RULE · DATE · SOURCE", font=font(26, True), fill=CORAL)
        draw.text((1060, 480), "SOURCE-BOUND", font=font(34, True), fill=INK)
        draw_wrapped(draw, (1060, 555), "Use only this notice. Quote the effective date. Say what is missing.", font(40, True), INK, 700, 14)
        draw.text((1060, 845), "EVIDENCE IN · UNCERTAINTY VISIBLE", font=font(25, True), fill=PURPLE)
    elif visual == "check":
        labels = [
            ("01", "CURRENT SOURCE?", PINK),
            ("02", "SUPPORTS THIS CLAIM?", TEAL),
            ("03", "RIGHT SOURCE FOR THIS DECISION?", YELLOW),
        ]
        for index, (number, label, colour) in enumerate(labels):
            x = 95 + index * 585
            rounded(draw, (x, 490, x + 510, 900), colour, 44, INK, 5)
            draw.text((x + 52, 545), number, font=font(42, True), fill=INK)
            draw_wrapped(draw, (x + 52, 665), label, font(38, True), INK, 400, 12)
        draw.text((95, 970), "OPEN THE SOURCE. READ THE SOURCE. COMPARE THE CLAIM.", font=font(30, True), fill=INK)
    elif visual == "task-map":
        labels = ["OUTPUT", "CONTEXT", "TOOL", "CHECK", "KEEP PRIVATE"]
        colours = [PINK, TEAL, YELLOW, CORAL, PURPLE]
        for index, label in enumerate(labels):
            x = 75 + index * 365
            rounded(draw, (x, 560, x + 300, 810), colours[index], 54, INK, 5)
            draw.text((x + 150, 685), label, font=font(30, True), fill=INK, anchor="mm")
            if index < len(labels) - 1:
                draw.text((x + 332, 685), "→", font=font(54, True), fill=INK, anchor="mm")
        draw_wrapped(draw, (95, 900), scene["deck"], font(29, True), INK, 1700, 12)
    elif visual == "outro":
        rounded(draw, (95, 510, 1825, 900), CREAM, 50, INK, 6)
        draw_wrapped(draw, (155, 580), scene["deck"], font(45, True), INK, 1580, 20)
        draw.text((95, 990), "SAVE THE APP / MODEL / CONTEXT / CHECK MAP", font=font(25, True), fill=CREAM)
    else:
        draw_wrapped(draw, (95, 520), scene["deck"], font(48, True), INK, 1650, 16)

    return image


def duration(path: Path) -> float:
    with wave.open(str(path), "rb") as handle:
        return handle.getnframes() / handle.getframerate()


def timestamp(value: float) -> str:
    total_ms = round(value * 1000)
    hours, remainder = divmod(total_ms, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    seconds, milliseconds = divmod(remainder, 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}.{milliseconds:03d}"


def sentences(text: str) -> list[str]:
    return [item.strip() for item in re.split(r"(?<=[.!?])\s+", text.strip()) if item.strip()]


def main() -> None:
    try:
        require_media_builder_admission(Path(__file__), ROOT)
    except AdmissionError as error:
        raise SystemExit(str(error)) from error
    spec = json.loads(SPEC.read_text())
    if BUILD.exists():
        shutil.rmtree(BUILD)
    BUILD.mkdir(parents=True)
    DELIVERY.mkdir(parents=True, exist_ok=True)
    slides = BUILD / "slides"
    audio = BUILD / "audio"
    segments = BUILD / "segments"
    slides.mkdir()
    audio.mkdir()
    segments.mkdir()

    timing = []
    concat_lines = []
    cursor = 0.0
    vtt = ["WEBVTT", ""]
    transcript = [f"# {spec['public_title']} — review animatic transcript", "", f"Status: **{spec['status']}**", "", "The system voice in the review animatic is provisional and not approved for release.", ""]

    for index, scene in enumerate(spec["scenes"], start=1):
        slide_path = slides / f"{index:02d}-{scene['id']}.png"
        slide(scene).save(slide_path, quality=96)

        aiff = audio / f"{index:02d}-{scene['id']}.aiff"
        wav = audio / f"{index:02d}-{scene['id']}.wav"
        run([str(SAY), "-v", "Samantha", "-r", "168", "-o", str(aiff), scene["narration"]])
        run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(aiff), "-ar", "48000", "-ac", "2", str(wav)])
        scene_duration = duration(wav) + 0.45

        segment = segments / f"{index:02d}-{scene['id']}.mp4"
        zoom = "zoompan=z='min(max(zoom,pzoom)+0.000045,1.018)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30"
        run([
            FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
            "-loop", "1", "-framerate", str(FPS), "-i", str(slide_path), "-i", str(wav),
            "-filter_complex", f"[0:v]{zoom},format=yuv420p[v]",
            "-map", "[v]", "-map", "1:a:0", "-t", f"{scene_duration:.3f}",
            "-c:v", "libx264", "-preset", "medium", "-crf", "18",
            "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
            "-movflags", "+faststart", str(segment)
        ])
        concat_lines.append(f"file '{segment.as_posix()}'")

        parts = sentences(scene["narration"])
        weights = [max(1, len(re.findall(r"\w+", item))) for item in parts]
        spoken = scene_duration - 0.45
        local = cursor
        for part, weight in zip(parts, weights):
            cue_duration = spoken * weight / sum(weights)
            vtt.extend([f"{timestamp(local)} --> {timestamp(local + cue_duration)}", part, ""])
            local += cue_duration
        transcript.extend([f"## {index:02d} · {scene['title']}", "", scene["narration"], ""])
        timing.append({
            "scene": scene["id"],
            "start": round(cursor, 3),
            "end": round(cursor + scene_duration, 3),
            "duration": round(scene_duration, 3)
        })
        cursor += scene_duration

    concat = BUILD / "concat.txt"
    concat.write_text("\n".join(concat_lines) + "\n")
    temp_master = BUILD / "odc-101-what-youre-looking-at-review-animatic-v1.mp4"
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy", str(temp_master)])

    master = DELIVERY / temp_master.name
    captions = DELIVERY / "odc-101-what-youre-looking-at-review-animatic-v1.vtt"
    transcript_path = DELIVERY / "odc-101-what-youre-looking-at-review-animatic-v1-transcript.md"
    poster = DELIVERY / "odc-101-what-youre-looking-at-review-animatic-v1-poster.png"
    shutil.copy2(temp_master, master)
    captions.write_text("\n".join(vtt).rstrip() + "\n")
    transcript_path.write_text("\n".join(transcript).rstrip() + "\n")
    shutil.copy2(slides / "01-01-title.png", poster)

    outputs = [master, captions, transcript_path, poster]
    manifest = {
        "schema_version": 1,
        "class_id": spec["class_id"],
        "status": "BUILT_LOCALLY_HOLD",
        "release_boundary": "Review animatic only. Provisional system voice; no independent accuracy, teaching, accessibility, visual or human sound-on acceptance. Not bound to content/site/high-classes.json or the public player.",
        "duration_seconds": round(cursor, 3),
        "resolution": f"{WIDTH}x{HEIGHT}",
        "fps": FPS,
        "checked_on": spec["checked_on"],
        "recheck_on": spec["recheck_on"],
        "source_spec": SPEC.relative_to(ROOT).as_posix(),
        "timing": timing,
        "outputs": [
            {"path": item.relative_to(ROOT).as_posix(), "sha256": sha256(item), "bytes": item.stat().st_size}
            for item in outputs
        ],
        "known_limits": [
            "The system voice is a timing witness, not an approved performance.",
            "The direct 2026-08-02 fresh-browser capture was blocked by an anti-bot interstitial and excluded.",
            "The official Search-path images remain current help-centre illustrations, but must be rechecked before release.",
            "No public class video, poster or admission record was changed."
        ]
    }
    (BUILD / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"master": str(master), "duration_seconds": round(cursor, 3), "sha256": sha256(master)}, indent=2))


if __name__ == "__main__":
    main()
