#!/usr/bin/env python3
"""Build the checksum-bound Episode 02 v19 style/semantic review candidate.

v19 deliberately reuses v18's locked still renderer and v17 clock/audio.
It replaces only the 27 occurrences independently ruled mixed-style by EMQ,
including the mandatory semantic repairs at cues 07 and 15.  It does not make
or animate art, and it is not a release or an image-admission decision.
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OPS = ROOT / "operations"
V18_SCRIPT = HERE / "build-episode-02-v18-still-only-repaired.py"

spec = importlib.util.spec_from_file_location("episode02_v18", V18_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError("Unable to load the validated v18 still-only builder")
v18 = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = v18
spec.loader.exec_module(v18)

TASK_ID = "WE-MEDIA-E02-STYLE-SEMANTIC-REPAIR-V19-2026-07-26"
CONFIG = HERE / "episode-02-v19-style-semantic-repaired-config.json"
OUTPUT = HERE / "episode-02-full-v19-style-semantic-repaired-review.mp4"
WORK_OUTPUT = HERE / ".episode-02-full-v19-style-semantic-repaired-review.rendering.mp4"
MANIFEST = OPS / "video-qa/episode-02-full-v19-style-semantic-repaired-review-manifest.json"
QC = OPS / "video-qa/episode-02-full-v19-style-semantic-repaired-review-qc.json"

# These are exactly the 27 occurrences independently identified in the v18
# full AV judge as mixed scenic/office rendering.  No accepted v18 source is
# changed unless it is in this judge-listed set.
STYLE_FAILED_SOURCES = {
    1: "assets/episodes/ep-02/comic/ep02-open-02-thisweek-teaser-comic.png",
    3: "assets/episodes/ep-02/comic/ep02-open-03-title-comic.png",
    7: "assets/episodes/ep-02/comic/ep02-open-07-welcome-back-comic.png",
    8: "assets/episodes/ep-02/comic/ep02-open-08-to-town-comic.png",
    9: "assets/episodes/ep-02/comic/ep02-scene-10-blend-snap-corner-comic.png",
    10: "assets/episodes/ep-02/comic/ep02-open-04-cold-open-desk-comic.png",
    11: "assets/episodes/ep-02/comic/ep02-concept-context-comic.png",
    15: "assets/episodes/ep-02/comic/ep02-concept-context-comic.png",
    21: "assets/episodes/ep-02/comic/ep02-scene-19-david-rose-intro-comic.png",
    23: "assets/episodes/ep-02/comic/ep02-concept-brief-questions-comic.png",
    25: "assets/episodes/ep-02/comic/ep02-scene-25-match-this-comic.png",
    29: "assets/episodes/ep-02/comic/ep02-open-04-cold-open-desk-comic.png",
    31: "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
    33: "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
    35: "assets/episodes/ep-02/comic/ep02-scene-30-request-the-song-comic.png",
    38: "assets/episodes/ep-02/comic/ep02-concept-bcg-study-comic.png",
    42: "assets/episodes/ep-02/comic/ep02-emph-soft-skills-win-comic.png",
    44: "assets/episodes/ep-02/comic/ep02-emph-soft-skills-win-comic.png",
    46: "assets/episodes/ep-02/comic/ep02-cocktail-comic.png",
    49: "assets/episodes/ep-02/comic/ep02-scene-36-postcard-comic.png",
    53: "assets/episodes/ep-02/comic/ep02-open-04-cold-open-desk-comic.png",
    54: "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
    55: "assets/episodes/ep-02/comic/ep02-tryon-comic.png",
    56: "assets/episodes/ep-02/comic/ep02-open-02-thisweek-teaser-comic.png",
    57: "assets/episodes/ep-02/comic/ep02-scene-30-request-the-song-comic.png",
    58: "assets/episodes/ep-02/comic/ep02-open-08-to-town-comic.png",
    60: "assets/episodes/ep-02/comic/ep02-open-next-week-comic.png",
}

# One concise as-recorded audio/picture job per v17 occurrence.  This maps
# what the picture must do at the locked clock; it is evidence for the next
# independent judge, not a self-admission.
JOBS = [
    "recap Episode One", "this-week AI/new-hire setup", "Episode Two title/delegation setup",
    "cold-open bridge into the paragraph problem", "show jargon output and staring contest",
    "contrast yesterday's success with today's failure", "reflect on why AI appears to read her mind",
    "establish LAiDIES welcome and last-week try-on", "transition from desk problem into town",
    "arrive at café for the ask-not-tool explanation", "compare bad output with changed ask",
    "explain missing context: what is in your head must be stated", "prompt/theater-kids origin and coffee lead-in",
    "compare familiar versus new café context", "show consequence of saying the usual at an unfamiliar café",
    "visibly define job, reader, meeting/calendar and goal context", "show new-chat stranger/remember distinction",
    "set up Spice Girls specificity lesson", "continue Spice Girls specifics setup", "state Spice Girls principle",
    "introduce David Rose as specificity example", "show David Rose's precise-instruction analogy",
    "show the brief-it-like-a-new-hire fix", "show briefing questions: who, reader, tone and length",
    "state prompting is delegation", "demonstrate show-an-example / match-this move",
    "show the vague policy ask and wall of text", "illustrate the Pivot insufficient-direction joke",
    "set up useful versus vague policy comparison", "show vague policy result as unusable", "continue failed vague-brief/Ross analogy",
    "show senior-manager specific brief", "show specific result and exemption", "reinforce contractor-exemption payoff",
    "transition to iterate/request-the-song analogy", "show radio request rather than dial spinning",
    "transition to research/proof", "establish LIBRAiRY research evidence", "show study statistics/briefing mechanism",
    "attribute Mollick point about briefing", "state soft skills reframe", "show women-ahead/judgment contrast",
    "show senior women/reader-jugment context", "state skills-that-win conclusion", "show hard plus soft skills callback",
    "introduce cocktail-party explanation", "show prompt-as-delegation cocktail-party analogy",
    "qualify delegation with fold-the-cheese example", "transition from delegation to postcard/friend", "show postcard/bring-your-people line",
    "show try-on/site instruction", "show ask-twice before/after instruction", "bridge lazy way to first lazy pass",
    "show first lazy pass", "show specific second pass/platform prompts", "show study-pack location",
    "show pop-quiz/high-school setting", "show KSVL then residence-card transition", "show residence-card instruction",
    "bridge closing quote to next-episode setup", "tease Episode Three consequence",
]

REFERENCE_PATHS = {
    "identity": "assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png",
    "master_style": "operations/reference/episode-style-popart/epstyle-scene-05.png",
    "environment": "operations/reference/episode-style-popart/epstyle-scene-03.png",
    "outfit": "operations/reference/heroine-wardrobe/iconic-outfit-02.png",
    "panel_grammar": "operations/reference/comic-book-page-style/comicpage-01.webp",
}

# Prevent the previously globally rejected Ep02 sources from returning through
# a future config edit, in addition to the cue-13/path bans inherited from v18.
EXTRA_PROHIBITED = {
    "assets/episodes/ep-02/comic/ep02-scene-11-side-by-side-comic.png",
    "assets/episodes/ep-02/comic/ep02-scene-26-vague-ask-comic.png",
    "assets/episodes/ep-02/comic/ep02-scene-31-libraiy-comic.png",
    "assets/episodes/ep-02/comic/ep02-scene-21-thats-your-ai-comic.png",
}


def reference_records() -> dict:
    return {key: v18.record(ROOT / path) for key, path in REFERENCE_PATHS.items()}


def create_config() -> dict:
    # v18 creates the locked v17 clock, its five pre-admitted substitutions,
    # and all still-only renderer controls.  We then apply exactly the v19
    # judge-listed source changes and bind all occurrence references.
    config = v18.create_config()
    refs = reference_records()
    style_replacements = []
    for item in config["placements"]:
        cue = item["cue"]
        item["as_recorded_picture_job"] = JOBS[cue]
        item["reference_binding"] = {
            "identity_reference": refs["identity"],
            "master_style_reference": refs["master_style"],
            "location_environment_reference": refs["environment"],
            "prop_costume_reference": refs["outfit"],
            "graphic_panel_reference": refs["panel_grammar"],
            "identity_reference_note": "Authority for any depicted Heroine; graphic/type-only cards retain the authority as a no-person control.",
        }
        item["source_verdict"] = "PRESERVED — no new independent v18 source failure"
        if cue in STYLE_FAILED_SOURCES:
            previous = item["source"]
            replacement = STYLE_FAILED_SOURCES[cue]
            source_record = v18.record(ROOT / replacement)
            item.update({
                "source": replacement,
                "source_sha256": source_record["sha256"],
                "source_size_bytes": source_record["size_bytes"],
                "source_verdict": "REPLACED — independently listed mixed-style/scenic occurrence",
            })
            style_replacements.append({
                "cue": cue,
                "clock": [item["start"], item["stop"]],
                "v18_source": previous,
                "v19_source": replacement,
                "v19_sha256": source_record["sha256"],
                "reason": (
                    "mandatory semantic correction: LAiDIES welcome/last-week try-on"
                    if cue == 7 else
                    "mandatory semantic correction: job/reader/meeting-calendar context"
                    if cue == 15 else
                    "independently listed mixed scenic/office illustration-system failure"
                ),
            })
    config.update({
        "schema": "laidies.episode-02.v19-style-semantic-config.v1",
        "task_id": TASK_ID,
        "base_v18_hold": {
            **v18.record(HERE / "episode-02-full-v18-still-only-repaired-review.mp4"),
            "judge_verdict": "HOLD",
            "judge_evidence": "operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v18-full-av-judge-2026-07-26.md",
        },
        "reference_authorities": refs,
        "independently_failed_style_occurrences": style_replacements,
        "preserved_v18_admitted_changes": [0, 4, 5, 6, 13],
        "semantic_mandatory_corrections": [7, 15],
    })
    config["prohibited"]["paths"] = sorted(set(config["prohibited"]["paths"]) | EXTRA_PROHIBITED)
    config["prohibited"]["sha256"] = sorted({v18.sha256(ROOT / path) for path in config["prohibited"]["paths"]})
    v18.write_json(CONFIG, config)
    return config


def validate_config(config: dict) -> None:
    original_task_id, original_config = v18.TASK_ID, v18.CONFIG
    try:
        # Retain the proven v18 source/clock/still controls while adding v19's
        # stricter semantic/reference and 27-occurrence source controls.
        v18.TASK_ID, v18.CONFIG = TASK_ID, CONFIG
        v18.validate_config(config)
    finally:
        v18.TASK_ID, v18.CONFIG = original_task_id, original_config
    placements = config.get("placements", [])
    if len(placements) != 61 or len(JOBS) != 61:
        raise RuntimeError("v19 must bind exactly 61 source/job occurrences")
    if len(config.get("independently_failed_style_occurrences", [])) != 27:
        raise RuntimeError("v19 must replace exactly the 27 judge-listed style occurrences")
    for cue, item in enumerate(placements):
        if item.get("cue") != cue or item.get("as_recorded_picture_job") != JOBS[cue]:
            raise RuntimeError(f"cue {cue} has no stable as-recorded job binding")
        if set(item.get("reference_binding", {})) != {
            "identity_reference", "master_style_reference", "location_environment_reference",
            "prop_costume_reference", "graphic_panel_reference", "identity_reference_note",
        }:
            raise RuntimeError(f"cue {cue} reference binding is incomplete")
        current = v18.record(ROOT / item["source"])
        if current["sha256"] != item["source_sha256"] or current["size_bytes"] != item["source_size_bytes"]:
            raise RuntimeError(f"cue {cue} source bytes differ from its v19 binding")
        if item["source"] in config["prohibited"]["paths"] or current["sha256"] in config["prohibited"]["sha256"]:
            raise RuntimeError(f"cue {cue} resolves to prohibited material")
    for cue, source in STYLE_FAILED_SOURCES.items():
        if placements[cue]["source"] != source:
            raise RuntimeError(f"cue {cue} does not use its exact v19 style/semantic repair")
    if placements[7]["source"] != STYLE_FAILED_SOURCES[7] or placements[15]["source"] != STYLE_FAILED_SOURCES[15]:
        raise RuntimeError("mandatory semantic repairs at cues 07 and 15 are not bound")
    cue13 = placements[13]
    if cue13["source_sha256"] != "1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13":
        raise RuntimeError("accepted cue-13 v01 must remain byte-for-byte bound")


def main() -> None:
    # Redirect the proven v18 renderer/QA to versioned v19 artifacts.
    v18.TASK_ID = TASK_ID
    v18.CONFIG, v18.OUTPUT, v18.WORK_OUTPUT = CONFIG, OUTPUT, WORK_OUTPUT
    v18.MANIFEST, v18.QC = MANIFEST, QC
    config = create_config() if not CONFIG.exists() else v18.load_json(CONFIG)
    validate_config(config)
    if "--qa-only" not in sys.argv:
        v18.render(config)
    elif not WORK_OUTPUT.is_file():
        raise RuntimeError("--qa-only requires the validated v19 temporary candidate")
    manifest, qc = v18.qa(config)
    manifest.update({
        "schema": "laidies.episode-02.v19-style-semantic-review-manifest.v1",
        "task_id": TASK_ID,
        "status": "BUILT LOCALLY — independent Episode Media Quality review required",
        "build_script": v18.record(Path(__file__)),
        "base_v18_hold": config["base_v18_hold"],
        "reference_authorities": config["reference_authorities"],
        "independently_failed_style_occurrences": config["independently_failed_style_occurrences"],
        "preserved_v18_admitted_changes": config["preserved_v18_admitted_changes"],
        "semantic_mandatory_corrections": config["semantic_mandatory_corrections"],
        "maker_scope": "Source binding and still-only assembly only; no image/style admission, release, or public-film claim.",
    })
    v18.write_json(MANIFEST, manifest)
    qc.update({
        "schema": "laidies.episode-02.v19-style-semantic-review-qc.v1",
        "task_id": TASK_ID,
        "manifest": v18.record(MANIFEST),
        "replaced_cues": sorted(set([0, 4, 5, 6, 13]) | set(STYLE_FAILED_SOURCES)),
        "style_semantic_repair_count": len(STYLE_FAILED_SOURCES),
        "mandatory_semantic_corrections": {"cue_07": config["placements"][7], "cue_15": config["placements"][15]},
        "reference_binding_count": len(config["placements"]),
        "independent_review_required": [
            "full-frame and crop-scale identity/location/prop/costume/master-style admission for all 61 occurrences",
            "normal-speed audio/VTT/image/motion review and every cue boundary",
            "no release or public assembly authority in maker task",
        ],
    })
    v18.write_json(QC, qc)
    print(OUTPUT)
    print(MANIFEST)
    print(QC)
    print(manifest["output"]["sha256"])


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"FAIL CLOSED: {error}", file=sys.stderr)
        raise
