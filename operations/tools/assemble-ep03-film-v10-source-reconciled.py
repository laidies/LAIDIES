#!/usr/bin/env python3
"""Build the Episode 03 v10 source-reconciled review candidate.

This is a maker lane, not a judging or release lane. The script reconciles the
49 V9 placements to the authoritative Episode 03 animation/assembly spec:

* retain every source whose identity/location/text binding is not a confirmed
  failure;
* retain the corrected monitor, Chutney/Regina, and Try-On sources;
* remove V9's unauthorized camera moves and alpha transitions;
* preserve the exact 49-cue narration/caption clock;
* preserve the 15 ambient Canva loops and one one-shot transformation;
* export no burned captions.

The already-rendered V8 hard-cut master is used as a byte-stable render base
only after all 49 current source bindings are checked against it. This avoids
re-encoding the narration or introducing a third picture treatment.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "assets/video/episode-03-v10-source-reconciled-config.json"
OUTPUT = ROOT / "assets/video/episode-03-full-v10-source-reconciled-review.mp4"
MANIFEST = ROOT / "operations/video-qa/episode-03-v10-49-placement-manifest.json"
QC = ROOT / "operations/video-qa/episode-03-full-v10-source-reconciled-qc.json"
MOTION_REPORT = ROOT / "operations/video-qa/episode-03-v10-motion-measure.json"
HARD_CUT_REPORT = ROOT / "operations/video-qa/episode-03-v10-hard-cuts.txt"
COMIC = ROOT / "assets/episodes/ep-03/comic"
TITLE = COMIC / "ep03-open-03-title-comic-v6-sky-balanced-1920.png"
TRANSFORMATION = COMIC / "ep03-cue08-canva-transformation-once-v2.mp4"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
END = 1047.98
AMBIENT_CUES = {3, 4, 5, 6, 9, 11, 14, 17, 19, 21, 22, 25, 30, 38, 45}
CAMERA_CUES_REMOVED = {13, 23, 26, 27, 28, 34, 35, 36, 39, 40, 41, 44, 46}
FLAGGED_CUES = {3, 4, 5, 22, 32, 33, 44}

FRAME_IDS = [
    "open-01-previously-strip-comic",
    "open-02-thisweek-teaser-comic",
    "open-03-title-comic",
    "scene-01-cold-open-desk",
    "scene-01b-the-lie-caught-a-screen",
    "scene-01b-the-lie-caught-b",
    "scene-02-couldnt-help-but-wonder",
    "open-04-welcome-back-comic",
    "open-05p4-transformation-reveal",
    "scene-03-newsstand",
    "emph-says-who-comic",
    "scene-04-regina-burn-book",
    "emph-same-handwriting-comic",
    "concept-hallucination-comic",
    "scene-05-bethany-byrd",
    "emph-claires-headband-comic",
    "emph-churn-butter-comic",
    "scene-07-doesnt-go-here",
    "emph-doesnt-go-here-comic",
    "scene-07b-wrong-room",
    "emph-fake-citation-comic",
    "scene-08-elle-file",
    "scene-08b-chutney-stand",
    "concept-verification-comic",
    "emph-chutney-elle-comic",
    "scene-09-chers-closet",
    "concept-draft-comic",
    "concept-claim-comic",
    "concept-receipt-comic",
    "emph-draft-outfit-comic",
    "scene-10-law-clerk",
    "emph-judgment-stayed-yours-comic",
    "emph-are-you-sure-regina-burnbook",
    "emph-peer-reviewed-comic",
    "fact-nature-comic",
    "fact-stanford-index-comic",
    "fact-kpmg-comic",
    "emph-sources-attached-comic",
    "scene-12-prompt-like-elle",
    "method-move1-comic",
    "method-move2-comic",
    "method-move3-comic",
    "method-prompt-like-elle-comicpage",
    "cocktail-comic",
    "tryon-rule-comic-v2-fix",
    "scene-14-receipts-pass-comic-rebalance-v2",
    "method-rule-comic",
    "signoff-comic",
    "open-06-nextweek-comic",
]

NARRATION_ENTRIES = [
    "Previously, on LAiDIES…",
    "She stopped typing three vague words…",
    "And on this episode…",
    "This is Episode Three: The Burn Book Problem.",
    "Nine seconds later, there it was — structure…",
    "The draft said the client had approved…",
    "What we actually said was July could work…",
    "And I couldn't help but wonder…",
    "This week, Elle Woods teaches us what to check.",
    "Before your name goes on it, you need to know…",
    "No doom, no hype, no source close to the…",
    "My job was to fact-check it before it ran…",
    "It worked because it had social authority…",
    "It'll take a real source, an old source…",
    "That's the Burn Book Problem: an official…",
    "One box of tampons, and boom — a verdict…",
    "It's a clue in a Claire's headband…",
    "Which parts are draft language rather than truth?",
    "It looks exactly like a real source…",
    "It brought the wrong ID…",
    "We talked about it promoted to a source…",
    "Stand up in the back of the courtroom…",
    "Elle is thorough; Chutney's detail is tested…",
    "Elle checks the detail that can survive contact…",
    "One tiny beauty-world rule exposes the claim…",
    "Ask what detail cannot survive the real world…",
    "If it says a number went up — from what?",
    "A draft is wording, structure, a brainstorm…",
    "A receipt is what you can actually inspect…",
    "Stand up with the file, not the outfit…",
    "The machine spent the weekend in the library…",
    "Judgment stayed yours…",
    "Read it; check the citations; ask are you sure?",
    "Sometimes it hands back the same wrong answer…",
    "AI systems can produce confident wrong claims…",
    "Newer systems can search, cite, and read documents…",
    "Stanford AI Index and KPMG evidence…",
    "Sources attached is not the same as verified…",
    "Prompt like Elle; keep the judgment…",
    "Move one: ask for the exact source…",
    "Move two: check the source itself…",
    "Move three: make her show the line…",
    "Use the full verification prompt…",
    "Instead of clean up these notes, request evidence…",
    "This week's rule: I can use the draft; I still check the alibi.",
    "LAiDIES is spelled with an i…",
    "Take one real answer from an AI…",
    "A corkboard and trench coat are optional…",
    "See you next Wednesday… in SUNNYVAiLE.",
]

MOTION_JOBS = {
    3: "monitor glow breathes 88→100%; faint warm desk-lamp pool flicker; background only; zero-net loop",
    4: "text cursor blink and subtle page-white glow; no new text; background only; zero-net loop",
    5: "screen glow and slow monitor scanline shimmer; background only; zero-net loop",
    6: "low-opacity rain behind heroine and steady lamp glow; background only; zero-net loop",
    8: "outfit transformation plays once for about five seconds, then freezes on its own final frame; no wand",
    9: "newsstand neon buzz and in-place paper ruffle; background only; zero-net loop",
    11: "warm lamp flicker and faint dust over the Burn Book; pages still; zero-net loop",
    14: "subtle screen/print glow on page; background only; zero-net loop",
    17: "faint setting lamp/screen glow; background only; zero-net loop",
    19: "subtle setting light; background only; zero-net loop",
    21: "courtroom window glow, slow dust in shafts, faint brass shimmer; background only; zero-net loop",
    22: "faint continuing courtroom light; background only; zero-net loop",
    25: "closet software screen light cycles softly; background only; zero-net loop",
    30: "green banker's-lamp flicker and dust in window light; background only; zero-net loop",
    38: "subtle setting light; background only; zero-net loop",
    45: "barely-there receipt/page glow; background only; zero-net loop",
}

IDENTITY_EXPECTATIONS = {
    0: "recap cast and Episode 03 heroine continuity",
    1: "Episode 03 heroine teaser continuity",
    3: "Episode 03 heroine in the locked Elle Woods weekly look",
    4: "same Episode 03 heroine, hair, clothes, light, and moment as cues 3/5",
    5: "same Episode 03 heroine, hair, clothes, light, and moment as cues 3/4",
    6: "same Episode 03 heroine in reflective beat",
    8: "same Episode 03 heroine; corporate base resolves to locked Elle Woods weekly look",
    9: "Episode 03 heroine",
    11: "Regina George / Burn Book pop-culture pairing",
    14: "Bethany Byrd source example",
    21: "Elle Woods courtroom homage",
    22: "Chutney courtroom witness homage — not Regina",
    24: "Chutney and Elle Woods pairing",
    25: "Cher closet homage",
    30: "Episode 03 heroine / law-clerk beat",
    32: "Regina George and the Burn Book — not Chutney",
    33: "Regina George/Burn Book verification summary — not Chutney",
    38: "Episode 03 heroine prompting like Elle",
    45: "Episode 03 heroine / receipts-pass continuity",
}

LOCATION_EXPECTATIONS = {
    3: "Episode 03 cold-open desk/office",
    4: "same cold-open monitor/office",
    5: "same cold-open monitor/office reverse view",
    6: "same office with rain at window",
    9: "SUNNYVAiLE newsstand",
    11: "Burn Book under desk lamp",
    17: "doesn't-go-here setting",
    19: "same wrong-room setting",
    21: "courtroom",
    22: "same courtroom",
    24: "courtroom",
    25: "Cher-style computerized closet",
    30: "law library",
    38: "prompt-like-Elle setting",
    45: "receipts-pass setting",
}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + f".{os.getpid()}.codex-tmp")
    temporary.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")
    os.replace(temporary, path)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def rel(path: str | Path) -> Path:
    path = Path(path)
    return path if path.is_absolute() else ROOT / path


def source_for(index: int, cue: dict) -> tuple[Path, str, Path | None]:
    still_basis = ROOT / str(cue["src"]).lstrip("/")
    if index == 2:
        return TITLE, "static_hold", still_basis
    if index == 8:
        return TRANSFORMATION, "one_shot_then_freeze", still_basis
    if index in AMBIENT_CUES:
        return COMIC / f"ep03-cue{index:02d}-canva-ambient-loop-v1.mp4", "ambient_loop", still_basis
    return still_basis, "static_hold", None


def validate_inputs(config: dict) -> list[dict]:
    if len(FRAME_IDS) != 49 or len(NARRATION_ENTRIES) != 49:
        raise RuntimeError("Internal 49-row reconciliation metadata is incomplete")
    if not FFMPEG.is_file():
        raise FileNotFoundError(FFMPEG)

    declared = [
        config["v9_source_master"],
        config["verified_hard_cut_render_base"],
        *config["clock_authorities"].values(),
        config["reference_authorities"]["animation_and_assembly_spec"],
        config["reference_authorities"]["confirmed_rework_flags"],
    ]
    for item in declared:
        path = rel(item["path"])
        if not path.is_file():
            raise FileNotFoundError(path)
        actual = sha256(path)
        if actual != item["sha256"]:
            raise RuntimeError(
                f"Authority hash mismatch for {path.relative_to(ROOT)}: "
                f"expected {item['sha256']}, found {actual}"
            )
    for declared_path in config["reference_authorities"]["style_reference_set"]:
        if not rel(declared_path).is_file():
            raise FileNotFoundError(rel(declared_path))

    cues = read_json(rel(config["clock_authorities"]["cue_file"]["path"]))["cues"]
    if len(cues) != 49:
        raise RuntimeError(f"Expected 49 cue placements, found {len(cues)}")
    if [float(item["t"]) for item in cues] != sorted(float(item["t"]) for item in cues):
        raise RuntimeError("Cue in-times are not monotonically increasing")
    for index, cue in enumerate(cues):
        source, _, still_basis = source_for(index, cue)
        if not source.is_file():
            raise FileNotFoundError(f"cue {index}: {source}")
        if still_basis is not None and not still_basis.is_file():
            raise FileNotFoundError(f"cue {index} still basis: {still_basis}")
    return cues


def flag_state(index: int) -> tuple[list[str], str]:
    flags: list[str] = []
    action = "RETAINED_VERIFIED_SOURCE_BINDING"
    if index in {3, 4, 5}:
        flags.append("monitor_orientation")
        action = "RETAINED_CONFIRMED_FIXED_MONITOR_SOURCE"
    if index in {22, 32, 33}:
        flags.append("chutney_regina_character_text_pairing")
        action = "RETAINED_CONFIRMED_CORRECT_CHARACTER_TEXT_PAIRING"
    if index == 44:
        flags.append("malformed_tryon_card")
        action = "RETAINED_CONFIRMED_FIXED_TRYON_CARD"
    if index in CAMERA_CUES_REMOVED:
        flags.append("v9_unauthorized_camera_motion")
    if index > 0:
        flags.append("v9_unauthorized_alpha_transition")
    return flags, action


def text_constraint(index: int) -> str:
    if index == 2:
        return "Exact title THE BURN BOOK PROBLEM; Episode Three script; approved sky/periwinkle title treatment"
    if index == 8:
        return "No wand; no FAiRY Godmother; transformation lettering, if present, remains legible"
    if index in {32, 33}:
        return "Regina George / Burn Book wording stays paired with Regina/Burn Book visual, never Chutney"
    if index == 44:
        return "I can use the draft. / I still check the alibi.; no leading bars or doubled-I reading"
    return "All in-art lettering remains legible and correct; AI is always two capitals"


def build_manifest(config: dict, cues: list[dict], output_hash: str | None = None) -> dict:
    rows = []
    style_refs = config["reference_authorities"]["style_reference_set"]
    for index, cue in enumerate(cues):
        start = float(cue["t"])
        stop = float(cues[index + 1]["t"]) if index + 1 < len(cues) else END
        source, mode, still_basis = source_for(index, cue)
        flags, source_action = flag_state(index)
        treatment_repairs = []
        if index in CAMERA_CUES_REMOVED:
            treatment_repairs.append("REMOVED_V9_CAMERA_MOTION")
        if index > 0:
            treatment_repairs.append("REMOVED_V9_ALPHA_TRANSITION")
        references = [
            config["reference_authorities"]["animation_and_assembly_spec"]["path"],
            config["clock_authorities"]["cue_file"]["path"],
            *style_refs,
        ]
        if index in FLAGGED_CUES:
            references.append(config["reference_authorities"]["confirmed_rework_flags"]["path"])
        row = {
            "placement_index": index,
            "cue": index,
            "start_seconds": start,
            "stop_seconds": stop,
            "duration_seconds": round(stop - start, 3),
            "frame_id": FRAME_IDS[index],
            "narration_entry": NARRATION_ENTRIES[index],
            "cue_type": cue["type"],
            "chapter": cue.get("chapter"),
            "render_source": str(source.relative_to(ROOT)),
            "render_source_sha256": sha256(source),
            "source_still_basis": (
                str(still_basis.relative_to(ROOT)) if still_basis is not None else None
            ),
            "source_still_basis_sha256": (
                sha256(still_basis) if still_basis is not None else None
            ),
            "source_action": source_action,
            "confirmed_flags_checked": flags,
            "treatment_repairs_from_v9": treatment_repairs,
            "v10_mode": mode,
            "v10_transition": "hard cut at exact cue in-time",
            "semantic_motion_job": MOTION_JOBS.get(
                index,
                "HOLD static; no animation, camera motion, or transition motion",
            ),
            "identity_expectation": IDENTITY_EXPECTATIONS.get(
                index,
                "graphic/text/concept card or no separately named character identity",
            ),
            "location_expectation": LOCATION_EXPECTATIONS.get(
                index,
                "graphic card/no physical location, or source-bound setting retained",
            ),
            "style_expectation": "comic-v1-locked; bold black ink; hard angular shadow planes; flat saturated colour; no halftone",
            "text_semantic_constraint": text_constraint(index),
            "reference_paths": references,
            "maker_observation": (
                "source/hash/timing binding recorded; maker does not adjudicate visual acceptability"
            ),
            "independent_image_identity_location_style_verdict": "PENDING",
            "independent_semantic_motion_verdict": "PENDING",
        }
        if index == 7:
            row["owner_decision"] = (
                "PENDING — shared welcome-back visual retained because no confirmed "
                "source failure authorizes replacement in this maker lane"
            )
        rows.append(row)

    return {
        "created_at": utc_now(),
        "status": (
            "BUILT_LOCAL_PLACEMENT_REFERENCE_RECONCILIATION_HOLD"
            if output_hash
            else "PRE_RENDER_REFERENCE_BOUND"
        ),
        "candidate": {
            "path": str(OUTPUT.relative_to(ROOT)),
            "sha256": output_hash,
            "placement_count": 49,
            "runtime_seconds": END,
        },
        "v9_reconciled": config["v9_source_master"],
        "verified_hard_cut_render_base": config["verified_hard_cut_render_base"],
        "clock_authorities": config["clock_authorities"],
        "reference_authorities": config["reference_authorities"],
        "source_replacement_count": 0,
        "confirmed_source_flags_retained_after_check": {
            "monitor_orientation": [3, 4, 5],
            "chutney_regina_character_text_pairing": [22, 32, 33],
            "malformed_tryon_card": [44],
        },
        "confirmed_v9_treatment_repairs": {
            "camera_motion_removed_from_cues": sorted(CAMERA_CUES_REMOVED),
            "alpha_transitions_removed_at_boundaries": list(range(1, 49)),
            "hard_cuts_restored_at_exact_in_times": True,
        },
        "placements": rows,
        "placement_count_check": len(rows),
        "maker_may_judge": False,
        "release_state": "HOLD",
        "remaining_proof": [
            "Independent Episode Media Quality judge must adjudicate all 49 full-resolution occurrences for identity, location, style, text, and narration fit.",
            "Independent Motion judge must watch the 15 ambient loops and cue 8 transformation at normal speed for semantic motion and occurrence.",
            "Independent AV/VTT/player watch remains required; maker technical checks are not admission.",
            "Cue 7 shared welcome visual retains its owner-decision flag.",
            "No release, site, deploy, public, or spend action is authorized by this manifest.",
        ],
    }


def ffmpeg(*args: str, capture: bool = False) -> subprocess.CompletedProcess:
    return subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", *args],
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    )


def probe(path: Path) -> dict:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not parse duration for {path}")
    hours, minutes, seconds = match.groups()
    duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    video = next(line.strip() for line in result.stderr.splitlines() if "Video:" in line)
    audio = next(line.strip() for line in result.stderr.splitlines() if "Audio:" in line)
    subtitles = [line.strip() for line in result.stderr.splitlines() if "Subtitle:" in line]
    return {
        "duration_seconds": duration,
        "video_stream": video,
        "audio_stream": audio,
        "subtitle_streams": subtitles,
    }


def sample(path: Path, at: float | None, width: int = 160, height: int = 90) -> np.ndarray:
    command = [str(FFMPEG), "-hide_banner", "-loglevel", "error"]
    if at is not None:
        command += ["-ss", f"{at:.3f}"]
    command += [
        "-i",
        str(path),
        "-frames:v",
        "1",
        "-vf",
        f"scale={width}:{height}:force_original_aspect_ratio=decrease,"
        f"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "gray",
        "-",
    ]
    raw = subprocess.run(command, capture_output=True, check=True).stdout
    if len(raw) != width * height:
        raise RuntimeError(f"Could not sample {path} at {at}")
    return np.frombuffer(raw, dtype=np.uint8).astype(float)


def verify_all_cue_starts(cues: list[dict]) -> list[dict]:
    checks = []
    for index, cue in enumerate(cues):
        source, mode, _ = source_for(index, cue)
        source_at = 0.30 if mode in {"ambient_loop", "one_shot_then_freeze"} else None
        actual = sample(OUTPUT, float(cue["t"]) + 0.30)
        expected = sample(source, source_at)
        mad = float(np.abs(actual - expected).mean())
        checks.append(
            {
                "cue": index,
                "at_seconds": float(cue["t"]),
                "source": str(source.relative_to(ROOT)),
                "mean_absolute_difference": round(mad, 4),
                "pass": mad < 8.0,
            }
        )
    if not all(item["pass"] for item in checks):
        failures = [item for item in checks if not item["pass"]]
        raise RuntimeError(f"Cue/source verification failed: {failures}")
    return checks


def verify_static_holds(cues: list[dict]) -> list[dict]:
    checks = []
    for index, cue in enumerate(cues):
        _, mode, _ = source_for(index, cue)
        if mode != "static_hold":
            continue
        start = float(cue["t"])
        stop = float(cues[index + 1]["t"]) if index + 1 < len(cues) else END
        inset = min(1.0, max((stop - start) / 4, 0.2))
        first = sample(OUTPUT, start + inset)
        last = sample(OUTPUT, stop - inset)
        mad = float(np.abs(first - last).mean())
        checks.append(
            {
                "cue": index,
                "first_sample_seconds": round(start + inset, 3),
                "last_sample_seconds": round(stop - inset, 3),
                "mean_absolute_difference": round(mad, 4),
                "pass": mad < 0.5,
            }
        )
    if not all(item["pass"] for item in checks):
        failures = [item for item in checks if not item["pass"]]
        raise RuntimeError(f"Static HOLD verification failed: {failures}")
    return checks


def run_required_motion_tools() -> dict:
    loop_paths = [
        COMIC / f"ep03-cue{index:02d}-canva-ambient-loop-v1.mp4"
        for index in sorted(AMBIENT_CUES)
    ]
    all_motion_paths = [
        *loop_paths[:4],
        TRANSFORMATION,
        *loop_paths[4:],
    ]
    hard_cuts = subprocess.run(
        [
            sys.executable,
            str(ROOT / "operations/tools/check-hard-cuts.py"),
            *(str(path) for path in all_motion_paths),
        ],
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    HARD_CUT_REPORT.write_text(hard_cuts.stdout, encoding="utf-8")
    if hard_cuts.returncode:
        raise RuntimeError(f"check-hard-cuts.py failed; see {HARD_CUT_REPORT}")

    motion = subprocess.run(
        [
            sys.executable,
            str(ROOT / "operations/tools/measure-motion.py"),
            "clips",
            *(str(path) for path in loop_paths),
            "--json",
            str(MOTION_REPORT),
        ],
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    if motion.returncode:
        raise RuntimeError(f"measure-motion.py failed: {motion.stdout}")
    motion_json = read_json(MOTION_REPORT)
    if not all(
        item is not None and item["verdict"] == "moving"
        for item in motion_json["results"].values()
    ):
        raise RuntimeError("One or more Episode 03 ambient loops measured STILL")
    return {
        "hard_cuts": {
            "script": "operations/tools/check-hard-cuts.py",
            "report": str(HARD_CUT_REPORT.relative_to(ROOT)),
            "report_sha256": sha256(HARD_CUT_REPORT),
            "return_code": hard_cuts.returncode,
            "result": "PASS — 16/16 clips are continuous",
        },
        "motion": {
            "script": "operations/tools/measure-motion.py",
            "report": str(MOTION_REPORT.relative_to(ROOT)),
            "report_sha256": sha256(MOTION_REPORT),
            "return_code": motion.returncode,
            "result": "PASS — 15/15 ambient clips measured moving",
            "measurements": motion_json,
        },
    }


def vtt_summary(config: dict) -> dict:
    path = rel(config["clock_authorities"]["captions"]["path"])
    text = path.read_text(encoding="utf-8")
    cues = [line for line in text.splitlines() if "-->" in line]
    return {
        "path": str(path.relative_to(ROOT)),
        "sha256": sha256(path),
        "cue_count": len(cues),
        "last_timing_line": cues[-1] if cues else None,
        "external_only": True,
    }


def build_qc(config: dict, cues: list[dict]) -> dict:
    output_probe = probe(OUTPUT)
    if abs(output_probe["duration_seconds"] - END) > 0.03:
        raise RuntimeError(f"Unexpected V10 duration: {output_probe['duration_seconds']}")
    if "h264" not in output_probe["video_stream"].lower() or f"{W}x{H}" not in output_probe["video_stream"]:
        raise RuntimeError("Unexpected V10 video stream")
    if "aac" not in output_probe["audio_stream"].lower():
        raise RuntimeError("Unexpected V10 audio stream")
    if output_probe["subtitle_streams"]:
        raise RuntimeError("V10 unexpectedly contains a subtitle stream")

    ffmpeg("-i", str(OUTPUT), "-f", "null", "-")
    cue_checks = verify_all_cue_starts(cues)
    static_checks = verify_static_holds(cues)
    transform_a = sample(OUTPUT, float(cues[8]["t"]) + 6.0)
    transform_b = sample(OUTPUT, float(cues[9]["t"]) - 1.0)
    transform_hold_mad = float(np.abs(transform_a - transform_b).mean())
    if transform_hold_mad >= 0.5:
        raise RuntimeError("Cue 8 transformation does not freeze after playing once")
    required_motion = run_required_motion_tools()

    v8 = rel(config["verified_hard_cut_render_base"]["path"])
    output_hash = sha256(OUTPUT)
    if output_hash != sha256(v8):
        raise RuntimeError("V10 is not byte-identical to its verified hard-cut render base")

    return {
        "created_at": utc_now(),
        "status": "BUILT_LOCALLY",
        "maker_verdict": "TECHNICAL_QC_PASS_ONLY",
        "maker_may_judge_or_approve": False,
        "release_state": "HOLD",
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": output_hash,
        "output_size_bytes": OUTPUT.stat().st_size,
        "output_mtime": datetime.fromtimestamp(
            OUTPUT.stat().st_mtime, timezone.utc
        ).isoformat(),
        "probe": output_probe,
        "full_decode": "PASS",
        "placement_count": 49,
        "source_replacement_count": 0,
        "v9_treatment_repairs": {
            "camera_motion_removed_from_cues": sorted(CAMERA_CUES_REMOVED),
            "alpha_transitions_removed_at_boundaries": list(range(1, 49)),
            "hard_cuts_restored": True,
        },
        "clock": {
            "runtime_seconds": END,
            "narration_source": config["clock_authorities"]["narration"],
            "caption_source": vtt_summary(config),
            "cue_sheet": config["clock_authorities"]["cue_file"],
            "audio_preservation_method": (
                "byte-identical promotion of the previously verified hard-cut render; "
                "no audio re-encode or retime"
            ),
            "captions_burned": False,
            "subtitle_streams": [],
        },
        "render_base": {
            **config["verified_hard_cut_render_base"],
            "v10_byte_identical": True,
        },
        "cue_start_source_checks": {
            "pass_count": sum(item["pass"] for item in cue_checks),
            "count": len(cue_checks),
            "mad_threshold": 8.0,
            "results": cue_checks,
        },
        "static_hold_checks": {
            "pass_count": sum(item["pass"] for item in static_checks),
            "count": len(static_checks),
            "mad_threshold": 0.5,
            "results": static_checks,
        },
        "transformation_once_then_freeze": {
            "post_event_first_sample_seconds": float(cues[8]["t"]) + 6.0,
            "pre_cut_last_sample_seconds": float(cues[9]["t"]) - 1.0,
            "mean_absolute_difference": round(transform_hold_mad, 4),
            "pass": True,
            "no_wand_source_binding": str(TRANSFORMATION.relative_to(ROOT)),
        },
        "required_tools": required_motion,
        "flag_reconciliation": {
            "monitor_orientation": {
                "cues": [3, 4, 5],
                "maker_observation": "corrected sources retained; front/rear monitor orientation binding preserved",
                "independent_verdict": "PENDING",
            },
            "chutney_regina_character_text_pairing": {
                "cues": [22, 32, 33],
                "maker_observation": "Chutney scene and Regina/Burn Book cards remain separate and correctly bound",
                "independent_verdict": "PENDING",
            },
            "malformed_tryon_card": {
                "cues": [44],
                "maker_observation": "v2-fix source retained; no leading bars in I can / I still lines",
                "independent_verdict": "PENDING",
            },
        },
        "tests": [
            "All declared authority hashes matched.",
            "All 49 exact cue starts matched their current authoritative render sources.",
            "All 33 HOLD placements measured static across their holds.",
            "Cue 8 played once and froze on its own final frame.",
            "check-hard-cuts.py passed all 16 motion clips.",
            "measure-motion.py measured all 15 ambient loops moving.",
            "Full H.264/AAC file decode passed.",
            "Runtime, frame size, frame rate, narration clock, and external VTT authority were preserved.",
            "No subtitle stream or caption source entered the render.",
        ],
        "remaining_proof": [
            "Maker cannot judge identity, location, style, text meaning, or semantic motion.",
            "Independent Episode Media Quality judge must review the exact candidate hash and all 49 manifest rows.",
            "Independent full-size, normal-speed AV/VTT/player watch remains required.",
            "Cue 7 shared welcome visual still requires the owner decision recorded in the manifest.",
            "No release, site, deploy, public, or spend action occurred.",
        ],
    }


def render_from_verified_hard_cut_base(config: dict, force: bool) -> None:
    if OUTPUT.exists() and not force:
        raise FileExistsError(f"Refusing to overwrite versioned V10 output: {OUTPUT}")
    base = rel(config["verified_hard_cut_render_base"]["path"])
    temporary = OUTPUT.with_name(OUTPUT.name + f".{os.getpid()}.rendering")
    try:
        with base.open("rb") as source, temporary.open("wb") as target:
            shutil.copyfileobj(source, target, length=8 * 1024 * 1024)
            target.flush()
            os.fsync(target.fileno())
        if sha256(temporary) != config["verified_hard_cut_render_base"]["sha256"]:
            raise RuntimeError("Temporary V10 render hash differs from verified base")
        os.replace(temporary, OUTPUT)
    finally:
        if temporary.exists():
            temporary.unlink()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--manifest-only",
        action="store_true",
        help="write the exact 49-placement pre-render manifest and stop",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="replace only the versioned V10 output and its versioned QA artifacts",
    )
    args = parser.parse_args()

    config = read_json(CONFIG_PATH)
    cues = validate_inputs(config)
    write_json(MANIFEST, build_manifest(config, cues))
    print(MANIFEST, flush=True)
    if args.manifest_only:
        return

    render_from_verified_hard_cut_base(config, args.force)
    output_hash = sha256(OUTPUT)
    write_json(MANIFEST, build_manifest(config, cues, output_hash))
    report = build_qc(config, cues)
    write_json(QC, report)
    print(OUTPUT)
    print(MANIFEST)
    print(QC)
    print(output_hash)


if __name__ == "__main__":
    main()
