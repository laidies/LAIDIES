#!/usr/bin/env python3
"""Build actual-master occurrence evidence for the current Trailer v5.

The v4 map is the exact 58-beat picture clock. Trailer v5 preserves that clock
and replaces only B08 with the approved spoken-welcome ident. This tool samples
the actual v5 master at the start, middle and end of every beat and binds those
pixels to contemporaneous captions. It grants no approval.
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
VIDEO = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v5-welcome-ident-review-1920.mp4"
BEAT_MAP = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/trailer-v4-exact-58-beat-map.json"
V5_AUTHORITY = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/trailer-v5-welcome-ident-manifest.json"
CAPTIONS = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt"
OUTPUT = ROOT / "operations/video-qa/trailer-v5-occurrence-audit-2026-08-01"
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
    cues = []
    for block in re.split(r"\n\s*\n", path.read_text(encoding="utf-8")):
        match = re.search(
            r"(?P<start>\d\d:\d\d:\d\d[.,]\d+)\s+-->\s+(?P<end>\d\d:\d\d:\d\d[.,]\d+)\s*\n(?P<text>[\s\S]+)",
            block,
        )
        if not match:
            continue
        text = re.sub(r"<[^>]+>", "", match.group("text"))
        cues.append({
            "start": seconds(match.group("start")),
            "end": seconds(match.group("end")),
            "text": html.unescape(re.sub(r"\s+", " ", text)).strip(),
        })
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
    subprocess.run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error",
        "-ss", f"{at:.3f}", "-i", str(VIDEO), "-frames:v", "1",
        "-vf", "scale=640:360:flags=lanczos", "-q:v", "2", str(destination),
    ], check=True)
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
        label = f"{row['beat_id']} · {row['start_seconds']:.2f}–{row['stop_seconds']:.2f}s · {row['motion_class']}"
        draw.text((12, y + image_h + 8), label, font=label_font, fill="#ffffff")
        draw.text((12, y + image_h + 40), Path(row["source"]).name[:105], font=small_font, fill="#68dbe4")
    destination = SHEET_DIR / f"trailer-v5-occurrences-{sheet_index:02d}.jpg"
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, quality=91, optimize=True)
    return destination


def main() -> None:
    for path in (VIDEO, BEAT_MAP, V5_AUTHORITY, CAPTIONS, FFMPEG):
        if not path.is_file():
            raise FileNotFoundError(path)

    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    SHEET_DIR.mkdir(parents=True, exist_ok=True)
    beat_map = json.loads(BEAT_MAP.read_text(encoding="utf-8"))
    v5 = json.loads(V5_AUTHORITY.read_text(encoding="utf-8"))
    captions = parse_vtt(CAPTIONS)
    rows = []
    extraction_tasks = []

    if len(beat_map["beats"]) != 58:
        raise SystemExit("Trailer map must contain exactly 58 beats")
    if v5["output"]["sha256"] != sha256(VIDEO):
        raise SystemExit("Trailer v5 master hash does not match authority")

    for beat in beat_map["beats"]:
        beat_id = beat["beat_id"]
        ordinal = int(beat["ordinal"])
        start = float(beat["actual_frame_start_seconds"])
        stop = float(beat["actual_frame_end_seconds"])
        evidence_frames = []
        for sample, at in sample_times(start, stop):
            relative = Path("operations/video-qa/trailer-v5-occurrence-audit-2026-08-01/frames") / f"{beat_id.lower()}-{sample}-{at:08.3f}.jpg"
            extraction_tasks.append((ROOT / relative, at))
            evidence_frames.append({"sample": sample, "seconds": round(at, 3), "path": relative.as_posix()})

        if beat_id == "B08":
            source = v5["stage_2"]["source_ident"]["path"]
            source_hash = v5["stage_2"]["source_ident"]["sha256"]
            motion_class = "SPOKEN_WELCOME_IDENT"
            override = "V5_B08_IDENT_REPLACEMENT"
        else:
            source = beat["source_path"]
            source_hash = beat["source_sha256"]
            motion_class = "DECLARED_MOTION" if beat["source_kind"] in {"motion", "video-first-frame"} else "STILL_NO_CAMERA_OR_LOCAL_MOTION"
            override = None

        rows.append({
            "occurrence_index": ordinal,
            "beat_id": beat_id,
            "slug": beat["slug"],
            "start_seconds": start,
            "stop_seconds": stop,
            "duration_seconds": round(stop - start, 3),
            "source": source,
            "source_sha256": source_hash,
            "map_source_kind": beat["source_kind"],
            "final_master_override": override,
            "declared_picture_job": beat.get("source_reason"),
            "map_narration_summary": beat.get("said"),
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
        })

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
    for offset in range(0, len(rows), 6):
        sheet = build_sheet(rows[offset:offset + 6], offset // 6 + 1)
        sheets.append({"path": sheet.relative_to(ROOT).as_posix(), "sha256": sha256(sheet)})

    output = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "EVIDENCE_BUILT_REVIEW_REQUIRED",
        "maker_may_judge_or_approve": False,
        "release_state": "HOLD",
        "video": {"path": VIDEO.relative_to(ROOT).as_posix(), "sha256": sha256(VIDEO)},
        "beat_map_authority": {"path": BEAT_MAP.relative_to(ROOT).as_posix(), "sha256": sha256(BEAT_MAP)},
        "v5_authority": {"path": V5_AUTHORITY.relative_to(ROOT).as_posix(), "sha256": sha256(V5_AUTHORITY)},
        "caption_authority": {"path": CAPTIONS.relative_to(ROOT).as_posix(), "sha256": sha256(CAPTIONS)},
        "occurrence_count": len(rows),
        "sample_count": len(extraction_tasks),
        "sampling": "start/middle/end actual assembled frames with transition-safe inset",
        "contact_sheets": sheets,
        "exact_duplicate_frame_groups": [paths for paths in exact_groups.values() if len(paths) > 1],
        "perceptual_duplicate_frame_groups": [paths for paths in perceptual_groups.values() if len(paths) > 1],
        "occurrences": rows,
        "gate_rule": "Every occurrence requires an actual-frame description, comparison to exact contemporaneous narration, normal-speed motion and layer-integrity judgment, then PASS, CLOSE_ENOUGH, RETIME, REPLACE or ADD_OR_REPAIR_ANIMATION. Earlier source/style review, filenames, decode success and static contact sheets do not approve the title.",
    }
    manifest_path = OUTPUT / "trailer-v5-occurrence-audit.json"
    manifest_path.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Trailer v5 occurrence evidence — current master", "",
        "Status: `EVIDENCE_BUILT_REVIEW_REQUIRED` / release `HOLD`.", "",
        "This samples the actual current trailer using the exact 58-beat clock plus the v5 B08 welcome-ident override. Existing source/style judgments are not inherited as title-level approval.", "",
        f"- video: `{output['video']['path']}`", f"- SHA-256: `{output['video']['sha256']}`",
        f"- occurrences: {len(rows)}", f"- actual-master samples: {len(extraction_tasks)}", "",
        "## Contact sheets", "",
    ]
    lines += [f"- `{sheet['path']}` — `{sheet['sha256']}`" for sheet in sheets]
    lines += ["", f"The complete row-level evidence and all {len(extraction_tasks)} frame paths are in `trailer-v5-occurrence-audit.json`.", ""]
    (OUTPUT / "README.md").write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"manifest": manifest_path.relative_to(ROOT).as_posix(), "occurrences": len(rows), "frames": len(extraction_tasks), "contact_sheets": len(sheets)}, indent=2))


if __name__ == "__main__":
    main()
