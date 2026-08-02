#!/usr/bin/env python3

"""Build the ODC-LAB-01 narration-timed review animatic (LOCAL/HOLD)."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import re
import shutil
import subprocess
import wave
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "operations/classes/odc-lab-01-teaching-media-script-2026-08-02.json"
SOURCE_RECEIPT = ROOT / "operations/classes/media/odc-lab-01-source-freshness-2026-08-02.json"
BUILD = ROOT / "operations/classes/media/odc-lab-01-teaching-media-review-animatic-v1"
DELIVERY = ROOT / "assets/classes/odc-lab-01"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SAY = Path("/usr/bin/say")
WIDTH, HEIGHT, FPS = 1920, 1080, 30

helper_spec = importlib.util.spec_from_file_location(
    "odc101_builder", ROOT / "scripts/build-odc-101-review-animatic.py"
)
assert helper_spec and helper_spec.loader
helper = importlib.util.module_from_spec(helper_spec)
helper_spec.loader.exec_module(helper)

PLUM, CREAM, WHITE = helper.PLUM, helper.CREAM, helper.WHITE
PINK, CORAL, YELLOW = helper.PINK, helper.CORAL, helper.YELLOW
TEAL, PURPLE, BLUE = helper.TEAL, helper.PURPLE, helper.BLUE
font, gradient, rounded, draw_wrapped = helper.font, helper.gradient, helper.rounded, helper.draw_wrapped
COLOURS = [PINK, TEAL, YELLOW, CORAL, PURPLE, BLUE]


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
    return [part.strip() for part in re.split(r"(?<=[.!?])\s+", text.strip()) if part.strip()]


def base(scene: dict, dark: bool = False) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    colours = ["#ef279f", "#a95ed3", "#548de5"] if dark else ["#67d1e3", "#b38fe3", "#ef68aa"]
    image = gradient(colours, 20 if dark else 10)
    draw = ImageDraw.Draw(image)
    draw.text((86, 58), scene["eyebrow"], font=font(29, True), fill=YELLOW if dark else PLUM)
    draw_wrapped(draw, (86, 112), scene["title"], font(68, True), CREAM if dark else PLUM, 1720, 3)
    return image, draw


def item_grid(draw: ImageDraw.ImageDraw, items: list[str], top: int, cols: int, height: int = 190) -> None:
    gap = 24
    width = (1748 - gap * (cols - 1)) // cols
    for index, label in enumerate(items):
        row, col = divmod(index, cols)
        x, y = 86 + col * (width + gap), top + row * (height + gap)
        rounded(draw, (x, y, x + width, y + height), COLOURS[index % len(COLOURS)], 34, PLUM, 4)
        draw_wrapped(draw, (x + 30, y + 46), label, font(28, True), PLUM, width - 60, 8)


def slide(scene: dict) -> Image.Image:
    visual = scene["visual"]
    dark = visual in {"title", "outro"}
    image, draw = base(scene, dark)
    items = scene.get("items", [])

    if visual == "title":
        draw_wrapped(draw, (90, 480), scene["deck"], font(52, True), CREAM, 1450, 14)
        item_grid(draw, items, 720, 4, 160)
        draw.text((90, 1005), "REVIEW ANIMATIC · PROVISIONAL VOICE · NOT PUBLIC", font=font(23, True), fill=CREAM)
    elif visual == "jump-cut":
        item_grid(draw, items, 520, 3, 250)
        draw.line((370, 820, 1550, 820), fill=PLUM, width=12)
        draw.text((960, 900), "WHERE DID THE OPERATING SETUP GO?", font=font(38, True), fill=PLUM, anchor="mm")
    elif visual == "split":
        item_grid(draw, items, 430, 2, 440)
        draw.text((960, 940), "ONE BEHAVIOUR  ≠  THE COMPLETE PATH", font=font(34, True), fill=PLUM, anchor="mm")
    elif visual == "claim":
        rounded(draw, (86, 380, 1834, 610), CREAM, 45, PLUM, 6)
        draw.text((960, 495), "INSTALL → DEPARTMENT HANDLED", font=font(47, True), fill=PLUM, anchor="mm")
        item_grid(draw, items, 690, 4, 185)
        rounded(draw, (632, 920, 1288, 1015), CORAL, 30, PLUM, 4)
        draw.text((960, 967), "MISLEADING AS STATED", font=font(31, True), fill=PLUM, anchor="mm")
    elif visual == "source":
        rounded(draw, (86, 380, 650, 980), WHITE, 40, PLUM, 5)
        draw.text((368, 455), "OFFICIAL SOURCE", font=font(34, True), fill=PLUM, anchor="mm")
        draw_wrapped(draw, (150, 560), "Reusable workflow\nInstructions\nExamples\nResources\nCode", font(34, True), PLUM, 440, 12)
        for index, label in enumerate(items):
            row, col = divmod(index, 3)
            x, y = 725 + col * 370, 405 + row * 240
            rounded(draw, (x, y, x + 330, y + 200), COLOURS[index], 34, PLUM, 4)
            draw.text((x + 165, y + 100), label, font=font(27, True), fill=PLUM, anchor="mm")
        rounded(draw, (740, 885, 1834, 995), YELLOW, 30, PLUM, 4)
        draw.text((1287, 940), "SOURCE BOUNDARY > CREATOR CAPTION", font=font(29, True), fill=PLUM, anchor="mm")
    elif visual == "grid":
        item_grid(draw, items, 405, 4, 215)
    elif visual == "checklist":
        item_grid(draw, items, 405, 3, 220)
        draw.text((960, 985), "MINIMUM USEFUL ACCESS · NOT MAXIMUM AVAILABLE ACCESS", font=font(27, True), fill=PLUM, anchor="mm")
    elif visual == "pipeline":
        gap, width, y = 22, 310, 500
        for index, label in enumerate(items):
            x = 85 + index * (width + gap)
            rounded(draw, (x, y, x + width, y + 270), COLOURS[index], 38, PLUM, 4)
            draw_wrapped(draw, (x + 25, y + 90), label, font(28, True), PLUM, width - 50, 7)
            if index < len(items) - 1:
                draw.text((x + width + 11, y + 135), "→", font=font(31, True), fill=PLUM, anchor="mm")
        draw.text((960, 920), "THE PERSON OWNS THE DECISION AND CONSEQUENCE", font=font(30, True), fill=PLUM, anchor="mm")
    elif visual == "tests":
        item_grid(draw, items, 430, 3, 380)
        draw.text((960, 900), "DEFINE SUCCESS BEFORE YOU PRESS RUN", font=font(34, True), fill=PLUM, anchor="mm")
    elif visual == "checkpoint":
        rounded(draw, (120, 370, 1800, 970), WHITE, 48, PLUM, 6)
        for index, label in enumerate(items):
            y = 455 + index * 94
            rounded(draw, (180, y, 610, y + 65), COLOURS[index], 24, PLUM, 3)
            draw.text((395, y + 32), label, font=font(24, True), fill=PLUM, anchor="mm")
            draw.line((665, y + 32, 1685, y + 32), fill="#a58db1", width=4)
    elif visual == "before-after":
        item_grid(draw, items, 400, 2, 500)
        draw.text((960, 960), "SAME FEATURE · SAME TASK · ONE OPERATING SETUP ADDED", font=font(29, True), fill=PLUM, anchor="mm")
    elif visual == "decisions":
        item_grid(draw, items, 455, 5, 280)
        draw.text((960, 890), "THE EVIDENCE CHOOSES THE NEXT MOVE", font=font(34, True), fill=PLUM, anchor="mm")
    elif visual == "four-way":
        item_grid(draw, items, 420, 2, 240)
        draw.text((960, 980), "MEMORY · RECORD · ACCESS · AUTHORITY ARE DIFFERENT", font=font(28, True), fill=PLUM, anchor="mm")
    elif visual == "recap":
        item_grid(draw, items, 470, 7, 230)
        draw.text((960, 885), scene["deck"], font=font(26, True), fill=PLUM, anchor="mm")
    elif visual == "outro":
        rounded(draw, (90, 410, 1830, 930), CREAM, 54, PLUM, 7)
        draw_wrapped(draw, (155, 535), scene["deck"], font(52, True), PLUM, 1550, 18)
        draw.text((155, 835), "THE TIP IS NOT THE WORKFLOW.", font=font(34, True), fill=CORAL)
    else:
        draw_wrapped(draw, (90, 520), scene["deck"], font(44, True), PLUM, 1650, 16)
    return image


def make_audio(scene: dict, target: float, aiff: Path, wav: Path) -> None:
    narration = scene["narration"].strip()
    if not narration:
        run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-t", f"{target:.3f}", str(wav)])
        return
    raw = wav.with_name(f"{wav.stem}-raw.wav")
    run([str(SAY), "-v", "Samantha", "-r", "168", "-o", str(aiff), narration])
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(aiff), "-ar", "48000", "-ac", "2", str(raw)])
    factor = min(2.0, max(0.5, audio_duration(raw) / max(1.0, target - 0.5)))
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw), "-filter:a", f"atempo={factor:.6f},apad=pad_dur={target:.3f}", "-t", f"{target:.3f}", "-ar", "48000", "-ac", "2", str(wav)])
    raw.unlink()


def main() -> None:
    spec = json.loads(SPEC.read_text())
    if BUILD.exists():
        shutil.rmtree(BUILD)
    BUILD.mkdir(parents=True)
    DELIVERY.mkdir(parents=True, exist_ok=True)
    slides, audio, segments, rendered = [BUILD / name for name in ("slides", "audio", "segments", "rendered-frames")]
    for directory in (slides, audio, segments, rendered):
        directory.mkdir()
    (BUILD / ".gitignore").write_text("audio/\nsegments/\nslides/\nrendered-frames/\nconcat.txt\nodc-lab-01-*.mp4\n")

    timing, concat_lines, vtt = [], [], ["WEBVTT", ""]
    cursor = 0.0
    transcript = [f"# {spec['public_title']} — review animatic transcript", "", f"Status: **{spec['status']}**", "", "The system voice is provisional and not approved for release.", "", f"Safe demonstration: {spec['safe_demo']}", ""]
    for index, scene in enumerate(spec["scenes"], start=1):
        target = float(scene["duration_seconds"])
        stem = f"{index:02d}-{scene['id']}"
        slide_path, aiff, wav, segment = slides / f"{stem}.png", audio / f"{stem}.aiff", audio / f"{stem}.wav", segments / f"{stem}.mp4"
        slide(scene).save(slide_path, quality=96)
        make_audio(scene, target, aiff, wav)
        zoom = "zoompan=z='min(max(zoom,pzoom)+0.00004,1.016)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30"
        run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-i", str(slide_path), "-i", str(wav), "-filter_complex", f"[0:v]{zoom},format=yuv420p[v]", "-map", "[v]", "-map", "1:a:0", "-t", f"{target:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-movflags", "+faststart", str(segment)])
        concat_lines.append(f"file '{segment.as_posix()}'")
        narration = scene["narration"].strip()
        if narration:
            parts = sentences(narration)
            weights = [max(1, len(re.findall(r"\w+", part))) for part in parts]
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
    temp_master = BUILD / "odc-lab-01-what-the-viral-reel-left-out-review-animatic-v1.mp4"
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy", str(temp_master)])
    master = DELIVERY / temp_master.name
    captions = DELIVERY / "odc-lab-01-what-the-viral-reel-left-out-review-animatic-v1.vtt"
    transcript_path = DELIVERY / "odc-lab-01-what-the-viral-reel-left-out-review-animatic-v1-transcript.md"
    poster = DELIVERY / "odc-lab-01-what-the-viral-reel-left-out-review-animatic-v1-poster.png"
    shutil.copy2(temp_master, master)
    captions.write_text("\n".join(vtt).rstrip() + "\n")
    transcript_path.write_text("\n".join(transcript).rstrip() + "\n")
    shutil.copy2(slides / "01-01-title.png", poster)

    for index, item in enumerate(timing, start=1):
        midpoint = (item["start"] + item["end"]) / 2
        run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{midpoint:.3f}", "-i", str(master), "-frames:v", "1", str(rendered / f"{index:02d}.png")])
    contact = BUILD / "rendered-contact-sheet.png"
    run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-pattern_type", "glob", "-i", str(rendered / "*.png"), "-vf", "scale=480:-1,tile=4x4:padding=8:margin=8:color=0x39143b", "-frames:v", "1", str(contact)])

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
        "rendered_contact_sheet": {"path": contact.relative_to(ROOT).as_posix(), "sha256": sha256(contact), "bytes": contact.stat().st_size},
        "timing": timing,
        "outputs": [{"path": item.relative_to(ROOT).as_posix(), "sha256": sha256(item), "bytes": item.stat().st_size} for item in outputs],
        "known_limits": [
            "The system voice is a timing witness, not an approved performance.",
            "All interfaces, tasks, files and results are fictional/generic; no real creator or private account appears.",
            "Official volatile product claims must be rechecked before release capture.",
            "The Missing Middle practice, downloadable card, class route and completion plumbing remain separate work.",
            "No public class video, poster, admission record or player binding changed."
        ]
    }
    (BUILD / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    (BUILD / "README.md").write_text("# ODC-LAB-01 teaching-media review animatic v1\n\nStatus: **BUILT LOCALLY / HOLD**.\n\nA narration-timed review package for the canonical Missing Middle lab. The system voice is a timing witness only. No creator content is reused, and nothing is bound to a public class route or player.\n")
    print(json.dumps({"master": str(master), "duration_seconds": round(cursor, 3), "sha256": sha256(master)}, indent=2))


if __name__ == "__main__":
    main()
