#!/usr/bin/env python3
"""Write the checksum-bound Episode 01 v24 71-placement maker manifest."""

from __future__ import annotations

import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "assets/video/episode-01-v24-source-reconciled-config.json"
V23_QC_PATH = (
    ROOT
    / "operations/product-stewards/episode-media-quality/evidence-2026-07-25/"
    "episode-01-full-v23-eod-style-repair-qc.json"
)
OUTPUT_PATH = ROOT / "operations/video-qa/episode-01-v24-71-placement-manifest.json"
HEROINE = "assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png"
EP1_PROMPT = "operations/codex-prompts/ep01-MASTER-all-prompts.md"
VISUAL_LOCK = "operations/episode-visual-system-lock.md"
TEXT_REFS = [
    "operations/reference/font-and-text-emphasis",
    "operations/reference/comic-text-emphasis",
    "operations/reference/comic-cover-collage",
]
ENVIRONMENT_REFS = [
    "operations/reference/episode-style-popart/epstyle-scene-01.png",
    "operations/reference/episode-style-popart/epstyle-scene-02.png",
    "operations/reference/episode-style-popart/epstyle-scene-03.png",
    "operations/reference/episode-style-popart/epstyle-scene-04.png",
    "operations/reference/episode-style-popart/epstyle-scene-05.png",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def clock(value: str) -> float:
    hours, minutes, seconds = value.split(":")
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def vtt_items(path: Path) -> list[tuple[float, float, str]]:
    result: list[tuple[float, float, str]] = []
    for block in re.split(r"\n\s*\n", path.read_text(encoding="utf-8")):
        match = re.search(
            r"(\d\d:\d\d:\d\d\.\d+) --> (\d\d:\d\d:\d\d\.\d+)", block
        )
        if not match:
            continue
        lines = [
            re.sub(r"<[^>]+>", "", line.strip())
            for line in block.splitlines()[1:]
            if line.strip()
        ]
        result.append((clock(match.group(1)), clock(match.group(2)), " ".join(lines)))
    return result


def job_section(start: float) -> str:
    for boundary, section in (
        (21.0, "season-promo"),
        (27.5, "episode-title"),
        (129.5, "cold-open-and-welcome"),
        (246.5, "terrible-on-ramp"),
        (434.9, "adoption-gap-and-physics"),
        (603.2, "first-use-and-judgment"),
        (739.6, "cocktail-party-new-hire"),
        (951.7, "under-the-hood-and-two-limits"),
        (1025.0, "try-on"),
        (1117.2, "episode-routes"),
        (1150.0, "sign-off"),
        (1173.0, "next-week"),
    ):
        if start < boundary:
            return section
    raise RuntimeError(start)


def identity_binding(cue: int) -> dict[str, object]:
    if cue in {4, 6}:
        return {
            "expected": ["Heroine", "Steve", "corporate colleagues"],
            "references": [HEROINE, EP1_PROMPT],
            "note": "Steve is deliberately a generic male-exec archetype; no separate likeness authority exists.",
        }
    if cue == 8:
        return {"expected": ["Heroine"], "references": [HEROINE]}
    if cue == 14:
        return {
            "expected": ["Miranda Priestly", "office staff"],
            "references": [
                "assets/saints/y2k-stained-glass-v2/miranda-priestly-y2k-stained-glass.png",
                EP1_PROMPT,
            ],
        }
    if cue == 25:
        return {
            "expected": ["Dolly Parton", "stage musicians"],
            "references": [
                "assets/saints/y2k-stained-glass-v2/dolly-parton-y2k-stained-glass.png",
                EP1_PROMPT,
            ],
        }
    if cue in {29, 30, 61}:
        return {
            "expected": ["Heroine", "optional Blend & Snap keeper/background patron"],
            "references": [HEROINE, "assets/town-characters/scenes/jojo-scene.png", EP1_PROMPT],
        }
    if cue == 34:
        return {
            "expected": ["diverse senior women in technical roles"],
            "references": [EP1_PROMPT],
            "note": "No named supporting likeness is required by the beat.",
        }
    if cue == 38:
        return {
            "expected": ["Heroine", "women at the cocktail table"],
            "references": [HEROINE, EP1_PROMPT],
        }
    if cue in {43, 45}:
        return {
            "expected": ["Heroine", "generic colleague/new-hire figure where shown"],
            "references": [HEROINE, EP1_PROMPT],
        }
    if cue in {48, 50, 57}:
        return {"expected": ["Heroine"], "references": [HEROINE, EP1_PROMPT]}
    if cue == 70:
        return {
            "expected": ["David Rose"],
            "references": [
                "assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.png",
                EP1_PROMPT,
            ],
        }
    return {
        "expected": [],
        "references": [],
        "note": "No named person is required for this placement.",
    }


def location_binding(cue: int, source: str) -> dict[str, object]:
    bindings: dict[int, tuple[str, list[str]]] = {
        3: ("Episode 1 Y2K desk/object cover", [source, EP1_PROMPT]),
        4: (
            "present-day corporate conference room",
            ["assets/video/episode-01-full-scene-replacements-v1/ep01-miranda-office-full-scene-v1.png", EP1_PROMPT],
        ),
        6: (
            "present-day corporate conference room",
            ["assets/video/episode-01-full-scene-replacements-v1/ep01-miranda-office-full-scene-v1.png", EP1_PROMPT],
        ),
        8: ("Blend & Snap / episode welcome café", ["assets/town-characters/scenes/jojo-scene.png", EP1_PROMPT]),
        10: ("SUNNYVAiLE town overview", ["assets/sunnyvaile-town-map-v9-canon.png"]),
        14: (
            "present-day fashion/corporate office",
            ["assets/video/episode-01-full-scene-replacements-v1/ep01-miranda-office-full-scene-v1.png", EP1_PROMPT],
        ),
        16: ("LIBRAiRY reading room", ["assets/building-interiors/library-reading-room.jpg"]),
        17: ("LIBRAiRY exterior", ["assets/video/comic-interstitials-v1/library-current-pixel-v1.png"]),
        25: ("performance stage / Dolly analogy", [source, EP1_PROMPT]),
        29: ("Blend & Snap café", ["assets/town-characters/scenes/jojo-scene.png", EP1_PROMPT]),
        30: ("Blend & Snap café", ["assets/town-characters/scenes/jojo-scene.png", EP1_PROMPT]),
        34: ("present-day corporate strategy room", [EP1_PROMPT]),
        38: ("Bronze AiGE cocktail table", ["assets/town-characters/scenes/cosmo-scene.png", EP1_PROMPT]),
        43: ("new-hire onboarding office metaphor", [EP1_PROMPT]),
        45: ("under-the-hood office metaphor", [EP1_PROMPT]),
        48: ("Cher-style Y2K closet-computer room", [EP1_PROMPT]),
        50: ("Burn Book / plausibility desk metaphor", [EP1_PROMPT]),
        57: ("Burn Book / plausibility desk metaphor", [EP1_PROMPT]),
        61: ("Blend & Snap café", ["assets/town-characters/scenes/jojo-scene.png", EP1_PROMPT]),
        62: ("SUNNYVAiLE High exterior", [source]),
        63: ("KSVL Community RAiDIO exterior", [source]),
        64: ("Mme CLAi-O shop exterior", [source]),
        65: ("MAiKEOVER on MAiN exterior", [source]),
        67: ("Delta LAi Nu exterior", [source]),
        69: ("SUNNYVAiLE town postcard", [source]),
        70: ("David Rose next-week kitchen", [source, EP1_PROMPT]),
    }
    expected, references = bindings.get(cue, ("no depicted location required", []))
    return {"expected": expected, "references": references}


def source_category(cue: int, source: str) -> str:
    name = Path(source).name
    if cue == 3:
        return "episode-comic-cover"
    if "comic-interstitials-v1" in source and (
        name.startswith("ep01-cue-")
        or name.startswith("season-promo-")
        or name == "get-in-loser.png"
    ):
        return "baked-lettering-comic-card"
    if cue in {10, 17, 62, 63, 64, 65, 67, 69}:
        return "environment-or-building"
    if identity_binding(cue)["expected"]:
        return "people-scene"
    return "illustrated-scene"


def style_binding(category: str) -> dict[str, object]:
    refs = [VISUAL_LOCK, EP1_PROMPT]
    if category in {"episode-comic-cover", "baked-lettering-comic-card"}:
        refs += TEXT_REFS
    else:
        refs += ENVIRONMENT_REFS
    return {
        "category": category,
        "references": refs,
        "maker_status": "REFERENCE_BOUND_NOT_INDEPENDENTLY_JUDGED",
    }


def main() -> None:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    v23_qc = json.loads(V23_QC_PATH.read_text(encoding="utf-8"))
    captions_path = ROOT / config["locked_captions"]["path"]
    captions = vtt_items(captions_path)
    source_hashes = v23_qc["source_sha256"]
    replacement = config["v24_confirmed_repairs"][0]
    placements: list[dict[str, object]] = []
    baked_rows: list[int] = []
    modern_tech_rows: list[int] = []

    for v23_row in v23_qc["placements"]:
        cue = int(v23_row["cue"])
        source = str(v23_row["source"])
        repair_status = "unchanged-from-v23"
        authority: list[str] = []
        if cue == 3:
            source = str(replacement["replacement_source"])
            repair_status = "v24-confirmed-repair"
            authority = ["direct Ali rejection", str(replacement["confirmation"])]
        elif cue in {4, 6, 12}:
            repair_status = "carried-forward-confirmed-v23-repair"
            authority = [
                "operations/product-stewards/episode-media-quality/eod-2026-07-25-replacement-manifest.json"
            ]

        path = ROOT / source
        if not path.is_file():
            raise FileNotFoundError(path)
        actual_hash = sha256(path)
        expected_hash = (
            str(replacement["replacement_source_sha256"])
            if cue == 3
            else str(source_hashes[source])
        )
        if actual_hash != expected_hash:
            raise RuntimeError(f"Source binding changed at cue {cue}: {source}")

        start = float(v23_row["start"])
        stop = float(v23_row["stop"])
        excerpt = " ".join(
            text for item_start, item_stop, text in captions
            if item_start < stop and item_stop > start
        )
        category = source_category(cue, source)
        if category == "baked-lettering-comic-card":
            baked_rows.append(cue)
        if cue in {8, 29, 30, 43, 45, 48, 50, 57, 61}:
            modern_tech_rows.append(cue)

        concerns: list[dict[str, str]] = []
        if category == "baked-lettering-comic-card":
            concerns.append(
                {
                    "type": "caption-treatment-occurrence",
                    "observation": "Baked comic-card lettering is present; it is not the external VTT caption track.",
                    "maker_disposition": "Bound to text-treatment references; independent visual judgment remains required.",
                }
            )
        if cue in modern_tech_rows:
            concerns.append(
                {
                    "type": "period-tech-occurrence",
                    "observation": "A computer or laptop is visible in this placement.",
                    "maker_disposition": "Bound to the Episode 1 Y2K-tech rule; current-device compliance remains for independent full-size judgment.",
                }
            )

        placements.append(
            {
                "placement": cue,
                "start": start,
                "stop": stop,
                "duration": round(stop - start, 3),
                "mode": "still",
                "transition_in_seconds": float(v23_row["fade_in"]),
                "transition_tail_seconds": float(v23_row["tail"]),
                "source": {
                    "path": source,
                    "sha256": actual_hash,
                    "bytes_status": "EXACT_HASH_BOUND",
                    "v23_source_path": v23_row["source"],
                    "v23_source_sha256": source_hashes[v23_row["source"]],
                    "repair_status": repair_status,
                    "repair_authority": authority,
                },
                "identity": identity_binding(cue),
                "location": location_binding(cue, source),
                "style": style_binding(category),
                "job": {
                    "section": job_section(start),
                    "cue_sheet": config["locked_clock"]["cue_sheet_path"],
                    "cue_sheet_sha256": config["locked_clock"]["cue_sheet_sha256"],
                    "narration_vtt": config["locked_captions"]["path"],
                    "narration_vtt_sha256": config["locked_captions"]["sha256"],
                    "as_recorded_vtt_excerpt": excerpt,
                    "maker_status": "CLOCK_AND_TEXT_BOUND_NOT_NORMAL_SPEED_JUDGED",
                },
                "concerns": concerns,
                "maker_reconciliation": "SOURCE_IDENTITY_LOCATION_STYLE_JOB_REFERENCES_BOUND",
                "independent_verdict": "PENDING_EPISODE_MEDIA_QUALITY",
            }
        )

    if len(placements) != 71:
        raise RuntimeError(f"Expected 71 placements, got {len(placements)}")
    manifest = {
        "schema_version": 1,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "MAKER_RECONCILIATION_COMPLETE_INDEPENDENT_JUDGMENT_REQUIRED",
        "episode": "01",
        "version": "24",
        "frozen_input": config["frozen_input"],
        "target_output": config["output"]["path"],
        "configuration": str(CONFIG_PATH.relative_to(ROOT)),
        "configuration_sha256": sha256(CONFIG_PATH),
        "placement_count": 71,
        "clock": config["locked_clock"],
        "narration": config["locked_narration"],
        "captions": config["locked_captions"],
        "reference_authority": config["reference_authority"],
        "reconciliation_summary": {
            "exact_source_hashes_bound": 71,
            "identity_references_bound": 71,
            "location_references_bound": 71,
            "style_references_bound": 71,
            "job_references_bound": 71,
            "new_confirmed_repair_cues": [3],
            "carried_forward_confirmed_repair_cues": [4, 6, 12],
            "unchanged_v23_placements": 70,
            "baked_lettering_occurrence_rows": baked_rows,
            "period_tech_occurrence_rows": modern_tech_rows,
            "maker_cannot_judge": True,
        },
        "remaining_independent_proof": [
            "Full-size identity/style/location ruling for every row.",
            "Full-size period-tech ruling for the listed computer/laptop rows.",
            "Baked-lettering treatment versus external VTT/player-caption ruling.",
            "Normal-speed picture/audio/VTT continuity watch.",
            "Motion/still-treatment judgment.",
        ],
        "placements": placements,
    }
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(OUTPUT_PATH)


if __name__ == "__main__":
    main()
