#!/usr/bin/env python3

"""Build the ODC-201 narration-timed review animatic.

The output is LOCAL/HOLD. It uses a fictional clothing-swap storyboard and a
system voice only as a timing witness. It does not bind a public class route.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import re
import shutil
import subprocess
import wave
from pathlib import Path

from PIL import Image, ImageDraw
import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "operations/classes/odc-201-teaching-media-script-2026-08-02.json"
SOURCE_RECEIPT = ROOT / "operations/classes/media/odc-201-source-freshness-2026-08-02.json"
BUILD = ROOT / "operations/classes/media/odc-201-teaching-media-review-animatic-v1"
DELIVERY = ROOT / "assets/classes/odc-201"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SAY = Path("/usr/bin/say")
WIDTH, HEIGHT, FPS = 1920, 1080, 30

helper_spec = importlib.util.spec_from_file_location(
    "odc101_builder", ROOT / "scripts/build-odc-101-review-animatic.py"
)
assert helper_spec and helper_spec.loader
helper = importlib.util.module_from_spec(helper_spec)
helper_spec.loader.exec_module(helper)

PLUM = helper.PLUM
CREAM = helper.CREAM
WHITE = helper.WHITE
PINK = helper.PINK
CORAL = helper.CORAL
YELLOW = helper.YELLOW
TEAL = helper.TEAL
PURPLE = helper.PURPLE
BLUE = helper.BLUE
INK = helper.INK
font = helper.font
gradient = helper.gradient
rounded = helper.rounded
draw_wrapped = helper.draw_wrapped


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def audio_duration(path: Path) -> float:
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


def base(scene: dict, dark: bool = False) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    if dark:
        image = gradient(["#ef279f", "#a95ed3", "#548de5"], 24)
    else:
        image = gradient(["#ef5ca6", "#f7d45c", "#69cce0"], 8)
    draw = ImageDraw.Draw(image)
    draw.text((86, 65), scene["eyebrow"], font=font(31, True), fill=YELLOW if dark else PLUM)
    draw_wrapped(draw, (86, 125), scene["title"], font(73, True), CREAM if dark else PLUM, 1670, 3)
    return image, draw


def arrow(draw: ImageDraw.ImageDraw, start: tuple[int, int], end: tuple[int, int], fill: str = PLUM) -> None:
    draw.line((start, end), fill=fill, width=16)
    x, y = end
    draw.polygon([(x, y), (x - 42, y - 28), (x - 42, y + 28)], fill=fill)


def cards(draw: ImageDraw.ImageDraw, labels: list[str], colours: list[str], top: int = 510,
          height: int = 230) -> None:
    gap = 28
    width = (1748 - gap * (len(labels) - 1)) // len(labels)
    for index, label in enumerate(labels):
        x = 86 + index * (width + gap)
        rounded(draw, (x, top, x + width, top + height), colours[index % len(colours)], 38, PLUM, 5)
        draw_wrapped(draw, (x + 34, top + 55), label, font(31, True), PLUM, width - 68, 8)


def slide(scene: dict) -> Image.Image:
    visual = scene["visual"]
    dark = visual in {"title", "outro"}
    image, draw = base(scene, dark)
    deck_colour = CREAM if dark else PLUM

    if visual == "title":
        draw_wrapped(draw, (90, 520), scene["deck"], font(46, True), CREAM, 1450, 12)
        cards(draw, ["CHAT NATURALLY", "CURRENT BRIEF", "INTERVENE", "CHECKPOINT"], [PINK, TEAL, YELLOW, CORAL], 760, 150)
        draw.text((90, 1005), "REVIEW ANIMATIC · PROVISIONAL VOICE · NOT PUBLIC", font=font(23, True), fill=CREAM)
    elif visual == "conversation":
        rounded(draw, (85, 380, 1120, 990), WHITE, 42, PLUM, 5)
        bubbles = [
            (145, 445, 710, 555, "Help me plan a clothing swap.", TEAL),
            (480, 590, 1045, 700, "Absolutely—here is a first draft.", "#f3c8e6"),
            (145, 735, 780, 845, "One more thing about registration…", YELLOW),
        ]
        for x1, y1, x2, y2, label, colour in bubbles:
            rounded(draw, (x1, y1, x2, y2), colour, 45, PLUM, 4)
            draw.text(((x1 + x2) // 2, (y1 + y2) // 2), label, font=font(28, True), fill=PLUM, anchor="mm")
        rounded(draw, (1210, 380, 1835, 990), "#ad8ce0", 42, PLUM, 5)
        draw.text((1522, 455), "ONE WINDOW", font=font(36, True), fill=PLUM, anchor="mm")
        draw_wrapped(draw, (1280, 560), scene["deck"], font(35, True), PLUM, 500, 18)
    elif visual == "then-now":
        rounded(draw, (85, 390, 830, 940), "#f6b8d6", 44, PLUM, 5)
        rounded(draw, (930, 390, 1835, 940), "#8edddc", 44, PLUM, 5)
        draw.text((145, 465), "THEN", font=font(42, True), fill=PLUM)
        draw.text((990, 465), "NOW", font=font(42, True), fill=PLUM)
        draw_wrapped(draw, (145, 585), "ONE CHAT\nONE TRANSCRIPT", font(53, True), PLUM, 620, 18)
        now = ["CHAT", "WORK", "PROJECTS", "BRANCHES", "SOURCES", "ARTIFACTS"]
        for index, label in enumerate(now):
            row, col = divmod(index, 3)
            x, y = 990 + col * 260, 570 + row * 150
            rounded(draw, (x, y, x + 225, y + 105), [PINK, YELLOW, PURPLE, CORAL, BLUE, TEAL][index], 28, PLUM, 3)
            draw.text((x + 112, y + 52), label, font=font(24, True), fill=PLUM, anchor="mm")
        draw.text((960, 1000), "MORE AVAILABLE ≠ CURRENT AUTHORITY", font=font(27, True), fill=PLUM, anchor="mm")
    elif visual == "early-draft":
        rounded(draw, (85, 400, 850, 970), WHITE, 42, PLUM, 5)
        draw.text((145, 465), "YOUR REQUEST", font=font(33, True), fill=PLUM)
        draw_wrapped(draw, (145, 560), "Help me prepare the sign-up email and run sheet for our neighbourhood clothing swap.", font(37, True), PLUM, 640, 16)
        arrow(draw, (890, 680), (1050, 680))
        rounded(draw, (1090, 400, 1835, 970), "#b998e4", 42, PLUM, 5)
        draw.text((1150, 465), "EARLY DRAFT", font=font(33, True), fill=PLUM)
        draw_wrapped(draw, (1150, 560), "Everyone registers in the event app…", font(43, True), PLUM, 620, 16)
        rounded(draw, (1150, 800, 1775, 910), CORAL, 30, PLUM, 4)
        draw.text((1462, 855), "ASSUMPTION: NOT APPROVED", font=font(27, True), fill=PLUM, anchor="mm")
    elif visual == "corrections":
        notes = ["EMAIL OR PHONE", "STEP-FREE VENUE", "$200 BUDGET", "NO CLOTHING SIZES", "TWO-HOUR SETUP"]
        colours = [PINK, TEAL, YELLOW, CORAL, PURPLE]
        for index, label in enumerate(notes):
            x = 100 + index * 350
            y = 470 + (index % 2) * 260
            rounded(draw, (x, y, x + 300, y + 190), colours[index], 36, PLUM, 4)
            draw_wrapped(draw, (x + 30, y + 48), label, font(30, True), PLUM, 240, 7)
        rounded(draw, (600, 880, 1320, 1010), WHITE, 40, CORAL, 7)
        draw.text((960, 945), "EARLY APP ASSUMPTION STILL UNDERNEATH", font=font(27, True), fill=PLUM, anchor="mm")
    elif visual == "brief":
        rounded(draw, (90, 365, 1830, 1000), "#fff7dc", 50, PLUM, 6)
        labels = ["OBJECTIVE", "AUDIENCE", "SOURCES", "DECISIONS", "CONSTRAINTS", "OUTPUTS", "DONE"]
        colours = [PINK, TEAL, YELLOW, CORAL, PURPLE, BLUE, PINK]
        for index, label in enumerate(labels):
            row, col = divmod(index, 4)
            x, y = 145 + col * 410, 475 + row * 235
            rounded(draw, (x, y, x + 340, y + 165), colours[index], 34, PLUM, 4)
            draw.text((x + 170, y + 82), label, font=font(27, True), fill=PLUM, anchor="mm")
        draw.text((145, 935), "NOT A GIANT PERFECT PROMPT. A CURRENT SOURCE OF TRUTH.", font=font(29, True), fill=PLUM)
    elif visual == "before-after":
        rounded(draw, (85, 390, 860, 990), "#f2b7d7", 44, PLUM, 5)
        rounded(draw, (960, 390, 1835, 990), "#8edddc", 44, PLUM, 5)
        draw.text((145, 455), "SCATTERED CHAT", font=font(35, True), fill=PLUM)
        draw_wrapped(draw, (145, 560), "Old draft\n+ five corrections\n+ no finish line", font(42, True), PLUM, 620, 16)
        draw.text((1020, 455), "CURRENT BRIEF", font=font(35, True), fill=PLUM)
        draw_wrapped(draw, (1020, 560), "STAGE 01\nSign-up email\n\nSTAGE 02\nTimed run sheet", font(42, True), PLUM, 680, 14)
    elif visual == "stages":
        labels = ["01 · MAKE", "02 · CHECK", "03 · CONTINUE"]
        cards(draw, labels, [PINK, YELLOW, TEAL], 470, 330)
        checks = "EMAIL OR PHONE  ✓    STEP-FREE WORDING  ✓    NO SIZE COLLECTION  ✓"
        rounded(draw, (130, 875, 1790, 990), WHITE, 38, PLUM, 5)
        draw.text((960, 932), checks, font=font(27, True), fill=PLUM, anchor="mm")
    elif visual == "intervention":
        labels = ["LET FINISH\nWhy that heading?", "QUEUE\nMake a poster afterward.", "STEER NOW\nUse approved accessibility wording.", "STOP\nAudience is vendors—not neighbours."]
        colours = [BLUE, PURPLE, YELLOW, CORAL]
        cards(draw, labels, colours, 430, 440)
        rounded(draw, (280, 920, 1640, 1025), WHITE, 34, PLUM, 5)
        draw.text((960, 972), "CHOOSE BY CONSEQUENCE—NOT BY HOW LOUD THE THOUGHT FEELS", font=font(28, True), fill=PLUM, anchor="mm")
    elif visual == "decision-board":
        labels = ["SAME SESSION", "NEW SESSION", "CLEAN REVIEW", "BRANCH", "PROJECT"]
        colours = [TEAL, CORAL, YELLOW, PURPLE, PINK]
        cards(draw, labels, colours, 445, 270)
        descriptions = ["same objective", "distinct workstream", "independent check", "safe alternative", "shared scoped home"]
        for index, label in enumerate(descriptions):
            x = 86 + index * 355
            draw_wrapped(draw, (x + 10, 790), label, font(25, True), PLUM, 295, 6)
        draw.text((960, 965), "THE OBJECTIVE AND SOURCE OF TRUTH DECIDE", font=font(30, True), fill=PLUM, anchor="mm")
    elif visual == "checkpoint":
        rounded(draw, (125, 380, 1795, 980), WHITE, 52, PLUM, 6)
        draw.text((190, 445), "CURRENT WORK CHECKPOINT", font=font(40, True), fill=PLUM)
        labels = ["VERSION", "STATUS", "EVIDENCE", "OPEN DECISION", "EXACT NEXT ACTION"]
        colours = [PINK, TEAL, YELLOW, CORAL, PURPLE]
        for index, label in enumerate(labels):
            y = 550 + index * 78
            rounded(draw, (190, y, 610, y + 58), colours[index], 24, PLUM, 3)
            draw.text((400, y + 29), label, font=font(23, True), fill=PLUM, anchor="mm")
            draw.line((660, y + 29, 1690, y + 29), fill="#9b80a5", width=4)
    elif visual == "recap":
        labels = ["ORIENT", "DISCOVER", "BRIEF", "EXECUTE", "REVIEW", "CHECKPOINT", "CONTINUE / RESET"]
        colours = [PINK, TEAL, YELLOW, CORAL, PURPLE, BLUE, PINK]
        gap = 18
        item_width = 225
        x = 85
        for index, label in enumerate(labels):
            rounded(draw, (x, 520, x + item_width, 760), colours[index], 34, PLUM, 4)
            draw_wrapped(draw, (x + 24, 600), label, font(25, True), PLUM, item_width - 48, 6)
            if index < len(labels) - 1:
                draw.text((x + item_width + 5, 640), "→", font=font(35, True), fill=PLUM)
            x += item_width + gap
        draw.text((960, 920), scene["deck"], font=font(26, True), fill=PLUM, anchor="mm")
    elif visual == "outro":
        rounded(draw, (90, 420, 1830, 930), CREAM, 54, PLUM, 7)
        draw_wrapped(draw, (155, 535), scene["deck"], font(52, True), PLUM, 1550, 18)
        draw.text((155, 840), "CHAT NATURALLY. WORK DELIBERATELY.", font=font(32, True), fill=CORAL)
    else:
        draw_wrapped(draw, (90, 520), scene["deck"], font(48, True), deck_colour, 1650, 16)
    return image


def make_audio(scene: dict, target: float, aiff: Path, wav: Path) -> None:
    narration = scene["narration"].strip()
    if not narration:
        run([
            FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
            "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-t", f"{target:.3f}", str(wav)
        ])
        return
    raw = wav.with_name(f"{wav.stem}-raw.wav")
    run([str(SAY), "-v", "Samantha", "-r", "168", "-o", str(aiff), narration])
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(aiff), "-ar", "48000", "-ac", "2", str(raw)])
    spoken_target = max(1.0, target - 0.5)
    factor = audio_duration(raw) / spoken_target
    factor = min(2.0, max(0.5, factor))
    run([
        FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw),
        "-filter:a", f"atempo={factor:.6f},apad=pad_dur={target:.3f}", "-t", f"{target:.3f}",
        "-ar", "48000", "-ac", "2", str(wav)
    ])
    raw.unlink()


def main() -> None:
    spec = json.loads(SPEC.read_text())
    if BUILD.exists():
        shutil.rmtree(BUILD)
    BUILD.mkdir(parents=True)
    DELIVERY.mkdir(parents=True, exist_ok=True)
    slides = BUILD / "slides"
    audio = BUILD / "audio"
    segments = BUILD / "segments"
    rendered = BUILD / "rendered-frames"
    for directory in (slides, audio, segments, rendered):
        directory.mkdir()
    (BUILD / ".gitignore").write_text("audio/\nsegments/\nslides/\nrendered-frames/\nconcat.txt\nodc-201-*.mp4\n")

    timing: list[dict] = []
    concat_lines: list[str] = []
    cursor = 0.0
    vtt = ["WEBVTT", ""]
    transcript = [
        f"# {spec['public_title']} — review animatic transcript", "",
        f"Status: **{spec['status']}**", "",
        "The system voice is provisional and not approved for release.", "",
        f"Safe demonstration: {spec['safe_demo']}", ""
    ]

    for index, scene in enumerate(spec["scenes"], start=1):
        target = float(scene["duration_seconds"])
        slide_path = slides / f"{index:02d}-{scene['id']}.png"
        slide(scene).save(slide_path, quality=96)
        aiff = audio / f"{index:02d}-{scene['id']}.aiff"
        wav = audio / f"{index:02d}-{scene['id']}.wav"
        make_audio(scene, target, aiff, wav)
        segment = segments / f"{index:02d}-{scene['id']}.mp4"
        zoom = "zoompan=z='min(max(zoom,pzoom)+0.00004,1.016)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30"
        run([
            FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
            "-loop", "1", "-framerate", str(FPS), "-i", str(slide_path), "-i", str(wav),
            "-filter_complex", f"[0:v]{zoom},format=yuv420p[v]", "-map", "[v]", "-map", "1:a:0",
            "-t", f"{target:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
            "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-movflags", "+faststart", str(segment)
        ])
        concat_lines.append(f"file '{segment.as_posix()}'")

        narration = scene["narration"].strip()
        if narration:
            parts = sentences(narration)
            weights = [max(1, len(re.findall(r"\w+", item))) for item in parts]
            local = cursor
            for part, weight in zip(parts, weights):
                cue_duration = target * weight / sum(weights)
                vtt.extend([f"{timestamp(local)} --> {timestamp(local + cue_duration)}", part, ""])
                local += cue_duration
        else:
            vtt.extend([f"{timestamp(cursor)} --> {timestamp(cursor + target)}", f"[On screen: {scene['title']} — {scene['deck']}]", ""])
        transcript.extend([f"## {index:02d} · {scene['title']}", "", narration or f"[No narration. On screen: {scene['deck']}]", ""])
        timing.append({"scene": scene["id"], "start": round(cursor, 3), "end": round(cursor + target, 3), "duration": target})
        cursor += target

    concat = BUILD / "concat.txt"
    concat.write_text("\n".join(concat_lines) + "\n")
    temp_master = BUILD / "odc-201-from-chatting-to-working-review-animatic-v1.mp4"
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy", str(temp_master)])

    master = DELIVERY / temp_master.name
    captions = DELIVERY / "odc-201-from-chatting-to-working-review-animatic-v1.vtt"
    transcript_path = DELIVERY / "odc-201-from-chatting-to-working-review-animatic-v1-transcript.md"
    poster = DELIVERY / "odc-201-from-chatting-to-working-review-animatic-v1-poster.png"
    shutil.copy2(temp_master, master)
    captions.write_text("\n".join(vtt).rstrip() + "\n")
    transcript_path.write_text("\n".join(transcript).rstrip() + "\n")
    shutil.copy2(slides / "01-01-title.png", poster)

    for index, item in enumerate(timing, start=1):
        midpoint = (item["start"] + item["end"]) / 2
        run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{midpoint:.3f}", "-i", str(master), "-frames:v", "1", str(rendered / f"{index:02d}.png")])
    contact = BUILD / "rendered-contact-sheet.png"
    run([
        FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-pattern_type", "glob", "-i", str(rendered / "*.png"),
        "-vf", "scale=480:-1,tile=4x4:padding=8:margin=8:color=0x39143b", "-frames:v", "1", str(contact)
    ])

    outputs = [master, captions, transcript_path, poster]
    manifest = {
        "schema_version": 1,
        "class_id": spec["class_id"],
        "status": "BUILT_LOCALLY_HOLD",
        "release_boundary": "Review animatic only. Provisional system voice; no independent accuracy, teaching, accessibility, visual or human sound-on acceptance. Not bound to content/site/high-classes.json or a public player.",
        "duration_seconds": round(cursor, 3),
        "resolution": f"{WIDTH}x{HEIGHT}",
        "fps": FPS,
        "checked_on": spec["checked_on"],
        "recheck_on": spec["recheck_on"],
        "source_spec": SPEC.relative_to(ROOT).as_posix(),
        "source_receipt": SOURCE_RECEIPT.relative_to(ROOT).as_posix(),
        "source_receipt_sha256": sha256(SOURCE_RECEIPT),
        "rendered_contact_sheet": {
            "path": contact.relative_to(ROOT).as_posix(),
            "sha256": sha256(contact),
            "bytes": contact.stat().st_size
        },
        "timing": timing,
        "outputs": [
            {"path": item.relative_to(ROOT).as_posix(), "sha256": sha256(item), "bytes": item.stat().st_size}
            for item in outputs
        ],
        "known_limits": [
            "The system voice is a timing witness, not an approved performance.",
            "All interfaces and requirements are fictional/generic; no real or private account was captured.",
            "Official volatile product claims must be rechecked before release capture.",
            "The working-brief practice, downloadable artifact, class route and completion plumbing remain separate work.",
            "No public class video, poster, admission record or player binding changed."
        ]
    }
    (BUILD / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    (BUILD / "README.md").write_text(
        "# ODC-201 teaching-media review animatic v1\n\n"
        "Status: **BUILT LOCALLY / HOLD**.\n\n"
        "This is a narration-timed visual review package assembled from the existing canonical lesson and a fictional clothing-swap demo. The system voice is a timing witness only. It is not independently accepted and is not bound to a public class route or player.\n"
    )
    print(json.dumps({"master": str(master), "duration_seconds": round(cursor, 3), "sha256": sha256(master)}, indent=2))


if __name__ == "__main__":
    main()
