#!/usr/bin/env python3
"""Build actual-master occurrence evidence for Episode 03 v13.

The 49-placement v10 manifest remains the exact programme clock. The v13
master adds the spoken-welcome ident inside placement 7 and replaces placement
30 with the independently accepted law-library ambient loop. This tool samples
the actual v13 master at the start, middle and end of every placement and binds
those pixels to the contemporaneous captions. It grants no approval.
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
VIDEO = ROOT / "assets/video/episode-03-full-v13-cue30-law-library-repaired-review.mp4"
PLACEMENTS = ROOT / "operations/video-qa/episode-03-v10-49-placement-manifest.json"
IDENT_AUTHORITY = ROOT / "operations/video-qa/episode-03-full-v12-spoken-welcome-ident-manifest.json"
REPAIR_AUTHORITY = ROOT / "operations/video-qa/episode-03-full-v13-cue30-law-library-repaired-manifest.json"
CAPTIONS = ROOT / "assets/captions/episode-03.vtt"
OUTPUT = ROOT / "operations/video-qa/episode-03-occurrence-audit-2026-08-01"
FRAME_DIR = OUTPUT / "frames"
SHEET_DIR = OUTPUT / "contact-sheets"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def dhash(path: Path, size: int = 8) -> str:
    with Image.open(path) as image:
        gray = image.convert("L").resize((size + 1, size), Image.Resampling.LANCZOS)
        pixels = list(gray.getdata())
    value = 0
    for row in range(size):
        offset = row * (size + 1)
        for col in range(size):
            value = (value << 1) | int(pixels[offset + col] > pixels[offset + col + 1])
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
        cues.append(
            {
                "start": seconds(match.group("start")),
                "end": seconds(match.group("end")),
                "text": html.unescape(re.sub(r"\s+", " ", text)).strip(),
            }
        )
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
            str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error",
            "-ss", f"{at:.3f}", "-i", str(VIDEO), "-frames:v", "1",
            "-vf", "scale=640:360:flags=lanczos", "-q:v", "2", str(destination),
        ],
        check=True,
    )
    return destination


def font(size: int, bold: bool = False):
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
                font=label_font, fill="#fff7cf", stroke_width=2, stroke_fill="#2b1230",
            )
        label = f"P{row['placement_index']:02d} · {row['start_seconds']:.2f}–{row['stop_seconds']:.2f}s · {row['motion_class']}"
        draw.text((12, y + image_h + 8), label, font=label_font, fill="#ffffff")
        draw.text((12, y + image_h + 40), Path(row["source"]).name[:105], font=small_font, fill="#68dbe4")
    destination = SHEET_DIR / f"episode-03-occurrences-{sheet_index:02d}.jpg"
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, quality=91, optimize=True)
    return destination


def main() -> None:
    for path in (VIDEO, PLACEMENTS, IDENT_AUTHORITY, REPAIR_AUTHORITY, CAPTIONS, FFMPEG):
        if not path.is_file():
            raise FileNotFoundError(path)

    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    SHEET_DIR.mkdir(parents=True, exist_ok=True)
    authority = json.loads(PLACEMENTS.read_text(encoding="utf-8"))
    captions = parse_vtt(CAPTIONS)
    rows = []
    extraction_tasks = []

    for placement in authority["placements"]:
        index = int(placement["placement_index"])
        start = float(placement["start_seconds"])
        stop = float(placement["stop_seconds"])
        evidence_frames = []
        for sample, at in sample_times(start, stop):
            relative = Path("operations/video-qa/episode-03-occurrence-audit-2026-08-01/frames") / f"p{index:02d}-{sample}-{at:08.3f}.jpg"
            extraction_tasks.append((ROOT / relative, at))
            evidence_frames.append({"sample": sample, "seconds": round(at, 3), "path": relative.as_posix()})
        if index == 7:
            motion_class = "SPOKEN_WELCOME_IDENT_WITH_STATIC_REMAINDER"
            override = "IDENT_116.18_TO_123.82"
        elif index == 30:
            motion_class = "ADMITTED_LAMP_DUST_AMBIENT_LOOP"
            override = "LAW_LIBRARY_REPAIR_565_TO_577"
        else:
            motion_class = {
                "ambient_loop": "DECLARED_AMBIENT_LOOP",
                "one_shot_then_freeze": "DECLARED_ONE_SHOT_THEN_FREEZE",
                "static_hold": "STILL_NO_CAMERA_OR_LOCAL_MOTION",
            }[placement["v10_mode"]]
            override = None
        rows.append(
            {
                "placement_index": index,
                "cue": placement.get("cue"),
                "start_seconds": start,
                "stop_seconds": stop,
                "duration_seconds": round(stop - start, 3),
                "source": placement["render_source"],
                "source_sha256": placement["render_source_sha256"],
                "declared_picture_job": placement.get("narration_entry"),
                "final_master_override": override,
                "narration": narration_for(start, stop, captions),
                "evidence_frames": evidence_frames,
                "actual_frame_description": "PENDING_ACTUAL_FRAME_REVIEW",
                "narration_visual_fit": "PENDING_JUDGMENT",
                "motion_quality": "PENDING_NORMAL_SPEED_JUDGMENT",
                "motion_class": motion_class,
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

    exact_groups: dict[str, list[str]] = {}
    perceptual_groups: dict[str, list[str]] = {}
    for row in rows:
        for frame in row["evidence_frames"]:
            path = ROOT / frame["path"]
            frame["sha256"] = sha256(path)
            frame["dhash"] = dhash(path)
            exact_groups.setdefault(frame["sha256"], []).append(frame["path"])
            perceptual_groups.setdefault(frame["dhash"], []).append(frame["path"])

    sheets = []
    for offset in range(0, len(rows), 5):
        sheet = build_sheet(rows[offset : offset + 5], offset // 5 + 1)
        sheets.append({"path": sheet.relative_to(ROOT).as_posix(), "sha256": sha256(sheet)})

    output = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "EVIDENCE_BUILT_REVIEW_REQUIRED",
        "maker_may_judge_or_approve": False,
        "release_state": "HOLD",
        "video": {"path": VIDEO.relative_to(ROOT).as_posix(), "sha256": sha256(VIDEO)},
        "placement_authority": {"path": PLACEMENTS.relative_to(ROOT).as_posix(), "sha256": sha256(PLACEMENTS)},
        "ident_authority": {"path": IDENT_AUTHORITY.relative_to(ROOT).as_posix(), "sha256": sha256(IDENT_AUTHORITY)},
        "repair_authority": {"path": REPAIR_AUTHORITY.relative_to(ROOT).as_posix(), "sha256": sha256(REPAIR_AUTHORITY)},
        "caption_authority": {"path": CAPTIONS.relative_to(ROOT).as_posix(), "sha256": sha256(CAPTIONS)},
        "placement_count": len(rows),
        "sample_count": len(extraction_tasks),
        "sampling": "start/middle/end actual assembled frames with transition-safe inset",
        "contact_sheets": sheets,
        "exact_duplicate_frame_groups": [paths for paths in exact_groups.values() if len(paths) > 1],
        "perceptual_duplicate_frame_groups": [paths for paths in perceptual_groups.values() if len(paths) > 1],
        "occurrences": rows,
        "gate_rule": "Every occurrence requires an actual-frame description, comparison to exact contemporaneous narration, normal-speed motion and layer-integrity judgment, then PASS, CLOSE_ENOUGH, RETIME, REPLACE or ADD_OR_REPAIR_ANIMATION. Earlier source/style review, filenames, decode success and static contact sheets do not approve the title.",
    }
    manifest_path = OUTPUT / "episode-03-occurrence-audit.json"
    manifest_path.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Episode 03 occurrence evidence — current v13 master", "",
        "Status: `EVIDENCE_BUILT_REVIEW_REQUIRED` / release `HOLD`.", "",
        "This samples the actual final master using the exact 49-placement clock plus the spoken-welcome and law-library overrides. Existing source/style judgments are not inherited as title-level approval.", "",
        f"- video: `{output['video']['path']}`", f"- SHA-256: `{output['video']['sha256']}`",
        f"- placements: {len(rows)}", f"- actual-master samples: {len(extraction_tasks)}", "",
        "## Contact sheets", "",
    ]
    lines += [f"- `{sheet['path']}` — `{sheet['sha256']}`" for sheet in sheets]
    lines += ["", f"The complete row-level evidence and all {len(extraction_tasks)} frame paths are in `episode-03-occurrence-audit.json`.", ""]
    (OUTPUT / "README.md").write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"manifest": manifest_path.relative_to(ROOT).as_posix(), "placements": len(rows), "frames": len(extraction_tasks), "contact_sheets": len(sheets)}, indent=2))


if __name__ == "__main__":
    main()
