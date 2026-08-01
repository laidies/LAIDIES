#!/usr/bin/env python3
"""Build current-master occurrence evidence for Episode 01.

This maker tool merges the 71-placement v24 clock/semantic authority with the
13 source replacements frozen into v26, samples the *actual v26 assembly* at
the start, middle and end of every placement, and builds labelled contact
sheets. It never grants approval: actual-frame description, narration fit,
normal-speed motion and continuity still require review.
"""

from __future__ import annotations

import hashlib
import html
import json
import re
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "assets/video/episode-01-full-v26-source-admitted-review.mp4"
PLACEMENTS = ROOT / "operations/video-qa/episode-01-v24-71-placement-manifest.json"
V26_INSERTIONS = ROOT / "operations/video-qa/episode-01-v26-source-admitted/manifest.json"
CAPTIONS = ROOT / "assets/captions/episode-01.vtt"
OUTPUT = ROOT / "operations/video-qa/episode-01-occurrence-audit-2026-08-01"
FRAME_DIR = OUTPUT / "frames"
SHEET_DIR = OUTPUT / "contact-sheets"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def md5(path: Path) -> str:
    digest = hashlib.md5()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def dhash(path: Path, size: int = 8) -> str:
    with Image.open(path) as image:
        gray = image.convert("L").resize((size + 1, size), Image.Resampling.LANCZOS)
        pixels = list(gray.getdata())
    bits = []
    for row in range(size):
        offset = row * (size + 1)
        bits.extend(pixels[offset + col] > pixels[offset + col + 1] for col in range(size))
    value = 0
    for bit in bits:
        value = (value << 1) | int(bit)
    return f"{value:0{size * size // 4}x}"


def seconds(value: str) -> float:
    hh, mm, ss = value.replace(",", ".").split(":")
    return int(hh) * 3600 + int(mm) * 60 + float(ss)


def parse_vtt(path: Path) -> list[dict]:
    blocks = re.split(r"\n\s*\n", path.read_text(encoding="utf-8"))
    cues = []
    for block in blocks:
        match = re.search(
            r"(?P<start>\d\d:\d\d:\d\d[.,]\d+)\s+-->\s+(?P<end>\d\d:\d\d:\d\d[.,]\d+)\s*\n(?P<text>[\s\S]+)",
            block,
        )
        if not match:
            continue
        text = re.sub(r"<[^>]+>", "", match.group("text"))
        text = html.unescape(re.sub(r"\s+", " ", text)).strip()
        cues.append({"start": seconds(match.group("start")), "end": seconds(match.group("end")), "text": text})
    return cues


def narration_for(start: float, stop: float, cues: list[dict]) -> str:
    return " ".join(cue["text"] for cue in cues if cue["end"] > start and cue["start"] < stop)


def sample_times(start: float, stop: float) -> list[tuple[str, float]]:
    duration = stop - start
    inset = min(0.75, max(0.08, duration * 0.08))
    return [
        ("start", start + inset),
        ("middle", start + duration / 2),
        ("end", max(start + inset, stop - inset)),
    ]


def extract_frame(task: tuple[Path, float]) -> Path:
    destination, at = task
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{at:.3f}",
            "-i",
            str(VIDEO),
            "-frames:v",
            "1",
            "-vf",
            "scale=640:360:flags=lanczos",
            "-q:v",
            "2",
            str(destination),
        ],
        check=True,
    )
    return destination


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf"),
        Path("/System/Library/Fonts/Helvetica.ttc"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def build_sheet(rows: list[dict], sheet_index: int) -> Path:
    cell_w, image_h, label_h = 640, 360, 72
    canvas = Image.new("RGB", (cell_w * 3, (image_h + label_h) * len(rows)), "#2b1230")
    draw = ImageDraw.Draw(canvas)
    label_font = font(22, bold=True)
    small_font = font(17)
    for row_index, row in enumerate(rows):
        y = row_index * (image_h + label_h)
        for col, frame in enumerate(row["evidence_frames"]):
            with Image.open(ROOT / frame["path"]) as source:
                canvas.paste(source.convert("RGB"), (col * cell_w, y))
            draw.text(
                (col * cell_w + 12, y + 12),
                f"{frame['sample'].upper()}  {frame['seconds']:.2f}s",
                font=label_font,
                fill="#fff7cf",
                stroke_width=2,
                stroke_fill="#2b1230",
            )
        label = (
            f"P{row['placement_index']:02d} · {row['start_seconds']:.2f}–"
            f"{row['stop_seconds']:.2f}s · {row['motion_class']}"
        )
        draw.text((12, y + image_h + 8), label, font=label_font, fill="#ffffff")
        draw.text((12, y + image_h + 40), Path(row["source"]).name[:105], font=small_font, fill="#68dbe4")
    destination = SHEET_DIR / f"episode-01-occurrences-{sheet_index:02d}.jpg"
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, quality=91, optimize=True)
    return destination


def main() -> None:
    for path in (VIDEO, PLACEMENTS, V26_INSERTIONS, CAPTIONS, FFMPEG):
        if not path.is_file():
            raise FileNotFoundError(path)

    OUTPUT.mkdir(parents=True, exist_ok=True)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    SHEET_DIR.mkdir(parents=True, exist_ok=True)

    authority = json.loads(PLACEMENTS.read_text(encoding="utf-8"))
    insertions = json.loads(V26_INSERTIONS.read_text(encoding="utf-8"))
    replacements = {int(row["placement"]): row for row in insertions["placements"]}
    captions = parse_vtt(CAPTIONS)
    rows = []
    extraction_tasks = []

    for placement in authority["placements"]:
        index = int(placement["placement"])
        start = float(placement["start"])
        stop = float(placement["stop"])
        replacement = replacements.get(index)
        source = replacement["source_path"] if replacement else placement["source"]["path"]
        source_hash = replacement["source_sha256"] if replacement else placement["source"]["sha256"]
        evidence_frames = []
        for sample, at in sample_times(start, stop):
            relative = Path("operations/video-qa/episode-01-occurrence-audit-2026-08-01/frames") / f"p{index:02d}-{sample}-{at:08.3f}.jpg"
            extraction_tasks.append((ROOT / relative, at))
            evidence_frames.append({"sample": sample, "seconds": round(at, 3), "path": relative.as_posix()})
        rows.append(
            {
                "placement_index": index,
                "start_seconds": start,
                "stop_seconds": stop,
                "duration_seconds": round(stop - start, 3),
                "source": source,
                "source_sha256": source_hash,
                "assembly_generation": "v26-replacement" if replacement else "v24-inherited",
                "narration": narration_for(start, stop, captions),
                "evidence_frames": evidence_frames,
                "actual_frame_description": "PENDING_ACTUAL_FRAME_REVIEW",
                "narration_visual_fit": "PENDING_JUDGMENT",
                "motion_quality": "PENDING_NORMAL_SPEED_JUDGMENT",
                "motion_class": "STILL_NO_CAMERA_OR_LOCAL_MOTION",
                "subject_layer_integrity": "PENDING_NORMAL_SPEED_JUDGMENT",
                "disposition": "PENDING_REVIEW",
                "repair_class": None,
                "review_notes": None,
            }
        )

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(extract_frame, task) for task in extraction_tasks]
        for future in as_completed(futures):
            future.result()

    exact_duplicate_groups: dict[str, list[str]] = {}
    perceptual_groups: dict[str, list[str]] = {}
    for row in rows:
        for frame in row["evidence_frames"]:
            path = ROOT / frame["path"]
            frame["sha256"] = sha256(path)
            frame["md5"] = md5(path)
            frame["dhash"] = dhash(path)
            exact_duplicate_groups.setdefault(frame["sha256"], []).append(frame["path"])
            perceptual_groups.setdefault(frame["dhash"], []).append(frame["path"])

    sheets = []
    for offset in range(0, len(rows), 5):
        sheet = build_sheet(rows[offset : offset + 5], offset // 5 + 1)
        sheets.append({"path": sheet.relative_to(ROOT).as_posix(), "sha256": sha256(sheet)})

    output_manifest = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "EVIDENCE_BUILT_REVIEW_REQUIRED",
        "maker_may_judge_or_approve": False,
        "release_state": "HOLD",
        "video": {"path": VIDEO.relative_to(ROOT).as_posix(), "sha256": sha256(VIDEO)},
        "placement_authority": {"path": PLACEMENTS.relative_to(ROOT).as_posix(), "sha256": sha256(PLACEMENTS)},
        "v26_insertion_authority": {"path": V26_INSERTIONS.relative_to(ROOT).as_posix(), "sha256": sha256(V26_INSERTIONS)},
        "caption_authority": {"path": CAPTIONS.relative_to(ROOT).as_posix(), "sha256": sha256(CAPTIONS)},
        "placement_count": len(rows),
        "v26_replacement_count": len(replacements),
        "sample_count": len(extraction_tasks),
        "sampling": "start/middle/end actual assembled frames with transition-safe inset",
        "contact_sheets": sheets,
        "exact_duplicate_frame_groups": [paths for paths in exact_duplicate_groups.values() if len(paths) > 1],
        "perceptual_duplicate_frame_groups": [paths for paths in perceptual_groups.values() if len(paths) > 1],
        "occurrences": rows,
        "gate_rule": "Every occurrence requires an actual-frame description, comparison to the exact contemporaneous narration, normal-speed motion and layer-integrity judgment, then PASS, CLOSE_ENOUGH, RETIME, REPLACE or ADD_OR_REPAIR_ANIMATION. Source admission, filenames, decode success and static contact sheets do not approve the title.",
    }
    manifest_path = OUTPUT / "episode-01-occurrence-audit.json"
    manifest_path.write_text(json.dumps(output_manifest, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Episode 01 occurrence evidence — current v26 review master",
        "",
        "Status: `EVIDENCE_BUILT_REVIEW_REQUIRED` / release `HOLD`.",
        "",
        "This evidence samples the actual assembled v26 master. It merges the 71-placement clock/semantic authority with the 13 v26 source replacements; it does not inherit source admission as a title-level pass.",
        "",
        f"- video: `{output_manifest['video']['path']}`",
        f"- SHA-256: `{output_manifest['video']['sha256']}`",
        f"- placements: {len(rows)}",
        f"- current-master assembled samples: {len(extraction_tasks)}",
        f"- v26 replacement placements: {len(replacements)}",
        "- motion declaration: all 71 placements are still-only in the frozen assembly authority",
        "",
        "## Required review",
        "",
        "For every occurrence, describe the actual shown frame, compare it with the exact narration, judge whether static treatment is adequate, inspect continuity/layer integrity at normal speed, and assign a bounded disposition. Duplicate or near-duplicate frames must not be counted as distinct narrative coverage.",
        "",
        "## Contact sheets",
        "",
    ]
    for sheet in sheets:
        lines.append(f"- `{sheet['path']}` — `{sheet['sha256']}`")
    lines.extend(["", f"The complete row-level evidence and all {len(extraction_tasks)} frame paths are in `episode-01-occurrence-audit.json`.", ""])
    (OUTPUT / "README.md").write_text("\n".join(lines), encoding="utf-8")

    print(
        json.dumps(
            {
                "manifest": manifest_path.relative_to(ROOT).as_posix(),
                "placements": len(rows),
                "frames": len(extraction_tasks),
                "contact_sheets": len(sheets),
                "exact_duplicate_groups": len(output_manifest["exact_duplicate_frame_groups"]),
                "perceptual_duplicate_groups": len(output_manifest["perceptual_duplicate_frame_groups"]),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
