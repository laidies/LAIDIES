#!/usr/bin/env python3
"""Insert the Episode 03 title-specific ident without changing the film clock."""

from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets/video/episode-03-full-v10-source-reconciled-review.mp4"
IDENT = (
    ROOT
    / "operations/design-explorations/laidies-motion-ident-20260725"
    / "continuous-i-episode-03-the-burn-book-problem-v1.mp4"
)
OUTPUT = ROOT / "assets/video/episode-03-full-v11-title-ident-inserted-review.mp4"
TEMP = ROOT / "assets/video/.episode-03-full-v11-title-ident-inserted-review.rendering.mp4"
MANIFEST = ROOT / "operations/video-qa/episode-03-full-v11-title-ident-inserted-manifest.json"
QC = ROOT / "operations/video-qa/episode-03-full-v11-title-ident-inserted-qc.json"

INSERT_START = 109.0
IDENT_DURATION = 6.48
INSERT_END = INSERT_START + IDENT_DURATION
EXPECTED_SOURCE_SHA = "c5dcee69c40e50d834dcc8f471eae9d621f531b37653de9eaef7bf5e362fd239"
EXPECTED_IDENT_SHA = "748faf81d9a4c3950946a455c35b7df06a44fb267505c6839ccff0d80d66de52"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


source_sha = sha256(SOURCE)
ident_sha = sha256(IDENT)
if source_sha != EXPECTED_SOURCE_SHA:
    raise SystemExit(f"Source hash mismatch: {source_sha}")
if ident_sha != EXPECTED_IDENT_SHA:
    raise SystemExit(f"Ident hash mismatch: {ident_sha}")

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
filter_graph = (
    f"[0:v]trim=start=0:end={INSERT_START},setpts=PTS-STARTPTS[pre];"
    f"[1:v]scale=1920:1080:flags=lanczos,fps=30,"
    f"trim=start=0:end={IDENT_DURATION},setpts=PTS-STARTPTS[ident];"
    f"[0:v]trim=start={INSERT_END},setpts=PTS-STARTPTS[post];"
    "[pre][ident][post]concat=n=3:v=1:a=0[v]"
)

if TEMP.exists():
    TEMP.unlink()
run(
    [
        ffmpeg,
        "-y",
        "-hide_banner",
        "-i",
        str(SOURCE),
        "-i",
        str(IDENT),
        "-filter_complex",
        filter_graph,
        "-map",
        "[v]",
        "-map",
        "0:a:0",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "17",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-c:a",
        "copy",
        "-movflags",
        "+faststart",
        str(TEMP),
    ]
)
TEMP.replace(OUTPUT)

run([ffmpeg, "-v", "error", "-i", str(OUTPUT), "-f", "null", "-"])

output_sha = sha256(OUTPUT)
created_at = datetime.now(timezone.utc).isoformat()
manifest = {
    "schema_version": 1,
    "created_at": created_at,
    "status": "BUILT_LOCALLY_NOT_ADMITTED",
    "title": "Episode 03 — The Burn Book Problem",
    "source": str(SOURCE.relative_to(ROOT)),
    "source_sha256": source_sha,
    "ident": str(IDENT.relative_to(ROOT)),
    "ident_sha256": ident_sha,
    "output": str(OUTPUT.relative_to(ROOT)),
    "output_sha256": output_sha,
    "replacement_interval_seconds": {
        "start": INSERT_START,
        "end": INSERT_END,
        "duration": IDENT_DURATION,
        "basis": "Existing Welcome back to SUNNYVAiLE cue begins at 109.0s; the title-specific Welcome back to LAiDIES ident occupies only the first 6.48s of that existing 109–125s interval.",
    },
    "preservation": {
        "audio": "Original source AAC stream mapped without re-encoding or retiming.",
        "clock": "Ident replaces an equal-duration video interval; the full-film timeline is unchanged.",
        "out_of_scope": "All source timing, cuts and semantic placements outside 109.0–115.48s remain unchanged; full video was re-encoded only to permit exact-frame insertion.",
    },
    "acceptance_owner": "Independent Episode Media Quality",
    "release_authority": False,
}
MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")

qc = {
    "created_at": created_at,
    "status": "TECHNICAL_QC_PASS_ONLY",
    "maker_may_judge_or_approve": False,
    "output": manifest["output"],
    "output_sha256": output_sha,
    "output_size_bytes": OUTPUT.stat().st_size,
    "full_decode": "PASS",
    "source_audio_stream": "COPIED_WITHOUT_REENCODE",
    "ident_interval_seconds": [INSERT_START, INSERT_END],
    "independent_review": "PENDING",
}
QC.write_text(json.dumps(qc, indent=2) + "\n")
print(f"EP03 V11 BUILT {OUTPUT} SHA256={output_sha}")
