#!/usr/bin/env python3
"""Build deterministic occurrence-level visual evidence for Episode 04.

This is a maker/evidence tool, not an approval tool. It samples the actual
assembled review master at the start, middle and end of every placement, binds
the overlapping caption text, and produces labelled contact sheets plus a
machine-readable audit skeleton. Human/independent review remains required.
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
VIDEO = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
PLACEMENTS = ROOT / "operations/video-qa/episode-04-v9-placement-reference-manifest.json"
CAPTIONS = ROOT / "assets/captions/episode-04.vtt"
OUTPUT = ROOT / "operations/video-qa/episode-04-occurrence-audit-2026-07-31"
FRAME_DIR = OUTPUT / "frames"
SHEET_DIR = OUTPUT / "contact-sheets"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

KNOWN_FINDINGS = {
    3: {
        "initial_disposition": "REPAIR_REQUIRED",
        "reason": "Opening desk sequence contributes to the repeated static/zoom-state experience reported in the owner watch; perceptible sequence continuity must be judged with placements 4-6.",
        "repair_class": "RETIME_OR_REBUILD_OPENING_SEQUENCE",
    },
    4: {
        "initial_disposition": "ADD_OR_REPAIR_ANIMATION",
        "reason": "Rain outside the window was expected but not perceptible in the owner watch; pixel motion alone is insufficient.",
        "repair_class": "MAKE_RAIN_PERCEPTIBLE_WITHOUT_MOVING_HEROINE",
    },
    5: {
        "initial_disposition": "ADD_OR_REPAIR_ANIMATION",
        "reason": "Rain outside the window was expected but not perceptible in the owner watch; this also reads as another static zoom state.",
        "repair_class": "MAKE_RAIN_PERCEPTIBLE_AND_REDUCE_ZOOM_STATE_REPETITION",
    },
    6: {
        "initial_disposition": "REPAIR_REQUIRED",
        "reason": "Static question frame completes the opening run that read as still images at different zooms rather than an intentional sequence.",
        "repair_class": "RETIME_OR_ADD_SEMANTIC_EVENT",
    },
    18: {
        "initial_disposition": "INDEPENDENT_REVIEW_REQUIRED",
        "reason": "The v9 London/1843 bridge is a new reference-bound candidate and has not received independent visual/history judgment.",
        "repair_class": "JUDGE_REFERENCE_BOUND_BRIDGE",
    },
    19: {
        "initial_disposition": "REPLACE",
        "reason": "A single static evidence board holds for nearly 50 seconds while Ada explains several distinct ideas; the coverage is not a complete visual sequence.",
        "repair_class": "BUILD_MULTI_SHOT_ADA_SEQUENCE",
    },
    20: {
        "initial_disposition": "REPLACE_OR_RETIME",
        "reason": "The retained Ada segment was outside the v9 repair and still requires identity, era, setting, source and narration-alignment judgment.",
        "repair_class": "COMPLETE_ADA_SEQUENCE_WITH_REFERENCE_BOUND_MOTION",
    },
    30: {
        "initial_disposition": "ADD_OR_REPAIR_ANIMATION",
        "reason": "The moth briefly disappears behind Grace's arm in the owner watch, violating subject-layer continuity.",
        "repair_class": "FIX_MOTH_LAYER_ORDER_AND_OCCLUSION_PATH",
    },
    43: {
        "initial_disposition": "REPLACE",
        "reason": "The heroine desk loop holds for 51.85 seconds while narration covers the 2017 Google language-system breakthrough, ChatGPT's November 2022 launch and rapid adoption.",
        "repair_class": "BUILD_2017_AND_2022_EVENT_SPECIFIC_COVERAGE",
    },
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


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
    command = [
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
    ]
    subprocess.run(command, check=True)
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
            draw.text((col * cell_w + 12, y + 12), f"{frame['sample'].upper()}  {frame['seconds']:.2f}s", font=label_font, fill="#fff7cf", stroke_width=2, stroke_fill="#2b1230")
        finding = row["initial_disposition"]
        label = f"P{row['placement_index']:02d} · cue {row['cue']} · {row['start_seconds']:.2f}–{row['stop_seconds']:.2f}s · {finding}"
        draw.text((12, y + image_h + 8), label, font=label_font, fill="#ffffff")
        source_name = Path(row["source"]).name
        draw.text((12, y + image_h + 40), source_name[:105], font=small_font, fill="#68dbe4")
    destination = SHEET_DIR / f"episode-04-occurrences-{sheet_index:02d}.jpg"
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, quality=91, optimize=True)
    return destination


def main() -> None:
    for path in (VIDEO, PLACEMENTS, CAPTIONS, FFMPEG):
        if not path.is_file():
            raise FileNotFoundError(path)

    OUTPUT.mkdir(parents=True, exist_ok=True)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    SHEET_DIR.mkdir(parents=True, exist_ok=True)

    manifest = json.loads(PLACEMENTS.read_text(encoding="utf-8"))
    captions = parse_vtt(CAPTIONS)
    rows = []
    extraction_tasks = []

    for placement in manifest["placements"]:
        index = placement["placement_index"]
        start = float(placement["start_seconds"])
        stop = float(placement["stop_seconds"])
        finding = KNOWN_FINDINGS.get(index, {})
        evidence_frames = []
        for sample, at in sample_times(start, stop):
            relative = Path("operations/video-qa/episode-04-occurrence-audit-2026-07-31/frames") / f"p{index:02d}-{sample}-{at:08.3f}.jpg"
            extraction_tasks.append((ROOT / relative, at))
            evidence_frames.append({"sample": sample, "seconds": round(at, 3), "path": relative.as_posix()})
        rows.append(
            {
                "placement_index": index,
                "cue": placement["cue"],
                "start_seconds": start,
                "stop_seconds": stop,
                "duration_seconds": round(stop - start, 3),
                "source": placement["v9_source"],
                "source_sha256": placement["v9_source_sha256"],
                "assembly_action": placement["action"],
                "narration": narration_for(start, stop, captions),
                "evidence_frames": evidence_frames,
                "actual_frame_description": "PENDING_INDEPENDENT_VISUAL_DESCRIPTION",
                "narration_visual_fit": "PENDING_INDEPENDENT_JUDGMENT",
                "motion_quality": "PENDING_NORMAL_SPEED_JUDGMENT",
                "subject_layer_integrity": "PENDING_NORMAL_SPEED_JUDGMENT",
                "initial_disposition": finding.get("initial_disposition", "PENDING_INDEPENDENT_REVIEW"),
                "known_reason": finding.get("reason"),
                "repair_class": finding.get("repair_class"),
            }
        )

    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(extract_frame, task) for task in extraction_tasks]
        for future in as_completed(futures):
            future.result()

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
        "caption_authority": {"path": CAPTIONS.relative_to(ROOT).as_posix(), "sha256": sha256(CAPTIONS)},
        "placement_count": len(rows),
        "sample_count": len(extraction_tasks),
        "sampling": "start/middle/end actual assembled frames with transition-safe inset",
        "contact_sheets": sheets,
        "occurrences": rows,
        "gate_rule": "No occurrence passes from filenames, source declarations or pixel-motion metrics. A reviewer must describe the actual shown frames, compare them with the exact narration, judge perceptible motion and subject-layer integrity, and assign PASS, CLOSE_ENOUGH, RETIME, REPLACE or ADD_OR_REPAIR_ANIMATION.",
    }
    manifest_path = OUTPUT / "episode-04-occurrence-audit.json"
    manifest_path.write_text(json.dumps(output_manifest, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Episode 04 occurrence evidence — review master v9",
        "",
        "Status: `EVIDENCE_BUILT_REVIEW_REQUIRED` / release `HOLD`.",
        "",
        "This evidence samples the actual assembled review master. It does not approve it. Every row still requires an independent actual-frame description, narration-fit verdict, normal-speed motion judgment and subject-layer check.",
        "",
        f"- video: `{output_manifest['video']['path']}`",
        f"- SHA-256: `{output_manifest['video']['sha256']}`",
        f"- placements: {len(rows)}",
        f"- actual assembled frames: {len(extraction_tasks)}",
        "",
        "## Known repair-required occurrences",
        "",
    ]
    for row in rows:
        if row["placement_index"] not in KNOWN_FINDINGS:
            continue
        lines.extend(
            [
                f"### Placement {row['placement_index']:02d} · cue {row['cue']} · {row['start_seconds']:.2f}–{row['stop_seconds']:.2f}s",
                "",
                f"- disposition: `{row['initial_disposition']}`",
                f"- repair class: `{row['repair_class']}`",
                f"- reason: {row['known_reason']}",
                f"- narration: {row['narration']}",
                "",
            ]
        )
    lines.extend(["## Contact sheets", ""])
    for sheet in sheets:
        lines.append(f"- `{sheet['path']}` — `{sheet['sha256']}`")
    lines.extend(["", "The complete row-level evidence and all 165 frame paths are in `episode-04-occurrence-audit.json`.", ""])
    (OUTPUT / "README.md").write_text("\n".join(lines), encoding="utf-8")

    print(json.dumps({"manifest": manifest_path.relative_to(ROOT).as_posix(), "placements": len(rows), "frames": len(extraction_tasks), "contact_sheets": len(sheets)}, indent=2))


if __name__ == "__main__":
    main()
