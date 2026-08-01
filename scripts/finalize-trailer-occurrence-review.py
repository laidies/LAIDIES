#!/usr/bin/env python3
"""Record the owner actual-master review for all 58 Trailer v5 beats.

This is repair evidence, not release admission. It deliberately reopens the
older source/style review and judges the pixels in the exact current v5 master
against the words spoken during each beat.
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
AUDIT_DIR = ROOT / "operations/video-qa/trailer-v5-occurrence-audit-2026-08-01"
AUDIT_PATH = AUDIT_DIR / "trailer-v5-occurrence-audit.json"
REVIEW_PATH = AUDIT_DIR / "owner-occurrence-review.md"
README_PATH = AUDIT_DIR / "README.md"
REGISTRY_PATH = ROOT / "operations/video-qa/site-video-review-registry-2026-07-31.json"


DESCRIPTIONS = [
    "The yellow-plaid heroine welcomes viewers on SUNNYVAiLE's main street beneath a welcome banner.",
    "A retro television schedule shows a 24-episode LAiDIES season with a new episode every Wednesday.",
    "Two women talk over coffee beneath copy about one useful idea, pop-culture fluency and no jargon.",
    "The yellow-plaid heroine stands beneath the self-aware label YOUR HEROINE.",
    "The multicolour-outfit heroine walks through town and looks back toward the viewer.",
    "A comic card reads I MAKE THE MISTAKES SO YOU CAN SKIP THEM while the narration also introduces the season promo.",
    "A four-panel yellow-plaid heroine montage previews the season arc.",
    "The approved LAiDIES master ident resolves into THE TRAILER / WELCOME TO SUNNYVAiLE.",
    "Road signs compare SUNNYDALE, BAYSIDE, CAPESIDE and SUNNYVAiLE for the town-name joke.",
    "A glowing blue stock brain is crossed out beside a SUNNYVAiLE alternative.",
    "One crowded Rewind Era montage holds sleepovers, landlines, cassettes, butterfly clips and other period references.",
    "A bright GIRL POWER MEETS MACHINE POWER butterfly graphic fills the screen.",
    "A wide daytime view of SUNNYVAiLE establishes the fictional town and its streets.",
    "The multicolour-outfit heroine stands outside the Delta LAi Nu house while saying she lives in town.",
    "A yellow-plaid heroine strip combines a Resident Card, closet and town destinations.",
    "An open-book-shaped building illustrates that every building is a page and walking in is clicking.",
    "A title graphic states THE TOWN IS THE TEACHING METHOD.",
    "A single concept wheel holds the episode, study pack, song, quiz, games and community for the full learning-system explanation.",
    "An ON WEDNESDAYS WE DO AI title treatment remains visually unchanged across the sampled beat.",
    "A café-and-radio town tableau carries the new episode, anthem, study pack, charms and every-day-access explanation.",
    "A hand chooses among VHS tapes at Chick Flicks while the narration explains that nothing expires and visitors can catch up at their own pace.",
    "The yellow-plaid heroine holds a SUNNYVAiLE route map while explaining weekly tours and meeting people.",
    "A SUNNYVAiLE map card introduces the two tour types.",
    "Four Express Tour icons show the episode, study pack, quiz and song, then remain on screen as the Full Tour narration begins.",
    "A tour guide and eight-stop route explain automatic tracking and the Fairy Godmother wish reward.",
    "A Black reporter holds the AI IN PLAIN ENGLISH paper at the NewsStand.",
    "Becky browses the Chick Flicks VHS shelves while the narration moves into the screening room at the tail.",
    "An empty retro screening room displays NOW SCREENING / PREMIERE while the narration starts the Blend & Snap stop at the tail.",
    "Jojo presents the Study Pack at Blend & Snap while the narration explains class notes and the trading-card pack.",
    "Hands open a trading-card pack, then the narration starts the heroine's corner-table Try-On setup at the tail.",
    "The yellow-plaid heroine writes beside a laptop and a TRY-ON card at her café table.",
    "A bold DO THE TRY-ON / 10 MIN emphasis card supports the single-action recommendation.",
    "A SUNNYVAiLE High desk shows a ten-question sheet and a jar of butterfly clips.",
    "A colourful school-gym BOOK FAIR scene appears for the four-week book-fair announcement.",
    "Mme CLAi-O sits with cards and a crystal ball during the scheduled-free-time reading explanation.",
    "A pink Dream Phone graphic reads 1999, then the narration begins the Fairy Godmother explanation at the tail.",
    "The Fairy Godmother stands outside her house with a wand and an ANSWERS & WISHES sign while the narration moves into hidden charms at the tail.",
    "An aerial town map with a charm tray illustrates hunting seven charms, then introduces Makeover on Main at the tail.",
    "A transformation changes the heroine from a dark suit into the disputed yellow-plaid outfit for the SUNNYVAiLE glow-up.",
    "A Tourist card is stamped Resident and held beside the town identity graphic for the account-and-persistence explanation.",
    "A Bronze AiGE bartender holds the Businesswomen's Special fortune teller while the narration begins Delta LAi Nu at the tail.",
    "A colourful Delta LAi Nu hallway of room doors introduces the members-only chat wings.",
    "A three-part room strip shows Dear LAiDIES, a Mix CD room and the Burn Book for community-room examples.",
    "Five women play Girl Talk around a floor game board while the sign-off challenge and upstairs transition are narrated.",
    "A closet display holds the Resident Card, butterfly-clip jar, charm bracelet and collected cards.",
    "DJ SunnyV sits at the KSVL 99.9 console while the station is introduced.",
    "DJ SunnyV holds a WEATHER & TRAFFIC card beside SUNNY / EMPTY monitors for the fictional reports joke.",
    "Ten illustrated house-band covers fill the frame for the ten-band and episode-anthem explanation.",
    "Mix CDs, stickers and a handwritten track list show the KSVL collectible music experience.",
    "A DON'T JUST LEARN FROM BOOKS. LEARN FROM HOOKS. station graphic carries the pedagogy line and then the post-office transition.",
    "A post-office counter displays the weekly letter contents and a wrapped gift while the narration moves to the Mall at the tail.",
    "A hand selects colourful card flair at a mall kiosk while the narration immediately begins Mayor Deb's introduction.",
    "Mayor Deb gestures at Town Hall beneath campaign posters including LOOP ME OUT and DEB FOR MAYOR.",
    "A dark Luminairy interior reveals stained-glass portraits across the three women-in-computing wings.",
    "A LAiDIES.ai brand card says NEW EPISODE EVERY WEDNESDAY while the narration also explains tour pacing and starts the final message.",
    "The disputed yellow-plaid heroine waves beside YOU DON'T HAVE TO KNOW ANYTHING YET — JUST SHOW UP.",
    "A NEXT WEEK ON LAiDIES card announces Episode One: ON WEDNESDAYS WE USE AI.",
    "One DIAL UP TO SUNNYVAiLE postcard remains static for the full 64-second town-anthem outro.",
]

# Outfit continuity is an exact unresolved authority conflict. These current
# yellow-plaid appearances cannot be silently retained or regenerated.
OUTFIT_REPLACE = {0, 3, 6, 14, 30, 38, 55}

# The source begins or ends outside the exact narration beat it depicts.
RETIME = {23, 26, 27, 29, 35, 36, 37, 39, 40, 43, 49, 50, 51, 53, 54}

# Purposeful short title/establishing treatments or visible semantic motion.
PASS = {7, 11, 16, 22, 31, 33, 48, 56}
CLOSE_ENOUGH = {4, 12, 15, 23, 41, 44, 45, 46, 47}


def excerpt(text: str, limit: int = 116) -> str:
    value = " ".join(text.split())
    return value if len(value) <= limit else value[: limit - 1].rstrip() + "…"


def table_cell(text: str) -> str:
    return text.replace("|", "\\|")


def main() -> None:
    data = json.loads(AUDIT_PATH.read_text(encoding="utf-8"))
    rows = data["occurrences"]
    if len(rows) != 58 or len(DESCRIPTIONS) != 58:
        raise SystemExit(f"Expected 58 rows/descriptions; found {len(rows)}/{len(DESCRIPTIONS)}")

    for index, row in enumerate(rows):
        row["actual_frame_description"] = DESCRIPTIONS[index]
        if index in OUTFIT_REPLACE:
            row["narration_visual_fit"] = "FAIL_CONTINUITY_AUTHORITY"
            row["disposition"] = "REPLACE"
            row["repair_class"] = "OUTFIT_AUTHORITY_DECISION_REQUIRED_BEFORE_GENERATION"
        elif index in RETIME:
            row["narration_visual_fit"] = "FAIL_RETIME"
            row["disposition"] = "RETIME"
            row["repair_class"] = "SPLIT_OR_SHIFT_TO_EXACT_NARRATION_BOUNDARY"
        elif index in PASS:
            row["narration_visual_fit"] = "PASS_SOURCE_RELEVANCE"
            row["disposition"] = "PASS"
            row["repair_class"] = "NONE_PURPOSEFUL_TREATMENT_FINAL_1X_PENDING"
        elif index in CLOSE_ENOUGH:
            row["narration_visual_fit"] = "CLOSE_ENOUGH"
            row["disposition"] = "CLOSE_ENOUGH"
            row["repair_class"] = "NONE_BOUNDED_RELEVANCE_FINAL_1X_PENDING"
        else:
            row["narration_visual_fit"] = "PASS_SOURCE_RELEVANCE"
            row["disposition"] = "ADD_OR_REPAIR_ANIMATION"
            row["repair_class"] = "NARRATIVE_LOCAL_MOTION_OR_PURPOSEFUL_SHOT_SEQUENCE"

        unique_samples = len({frame["dhash"] for frame in row["evidence_frames"]})
        if row["motion_class"] == "SPOKEN_WELCOME_IDENT":
            row["motion_quality"] = "VISIBLE_IDENT_PROGRESSION_FINAL_1X_PENDING"
        elif row["motion_class"] == "DECLARED_MOTION" and unique_samples > 1:
            row["motion_quality"] = "VISIBLE_SAMPLE_CHANGE_FINAL_1X_PENDING"
        elif row["motion_class"] == "DECLARED_MOTION":
            row["motion_quality"] = "FAIL_DECLARED_MOTION_NOT_VISIBLE_IN_SAMPLES"
        elif row["disposition"] in {"PASS", "CLOSE_ENOUGH"}:
            row["motion_quality"] = "PURPOSEFUL_STATIC_OR_SHORT_TREATMENT_FINAL_1X_PENDING"
        else:
            row["motion_quality"] = "FAIL_STATIC_HOLD_NO_CAMERA_OR_LOCAL_MOTION"

        row["subject_layer_integrity"] = "NO_OBVIOUS_SAMPLE_OCCLUSION_FULL_1X_PENDING"
        notes = [
            "Three actual assembled-master samples were described before judging the source against contemporaneous narration.",
            "Earlier storyboard, source/style and midpoint judgments were treated only as supporting evidence.",
        ]
        if row["disposition"] == "REPLACE":
            notes.append("Do not generate a successor until the exact trailer heroine outfit authority is decided.")
        elif row["disposition"] == "RETIME":
            notes.append("Split or shift the beat so the visible source changes with the narration it actually depicts.")
        elif row["disposition"] == "ADD_OR_REPAIR_ANIMATION":
            notes.append("Add meaningful local motion or a narration-progressing shot sequence; a generic zoom or pan is insufficient.")
        else:
            notes.append("Preserve unless the complete 1x audible watch or independent review finds a new defect.")
        if row["beat_id"] == "B58":
            notes.append("Replace the 64-second single-card hold with a paced anthem visual sequence while retaining the closing destination card for the final line.")
        row["review_notes"] = " ".join(notes)

    counts = Counter(row["disposition"] for row in rows)
    data["status"] = "COMPLETE_FAIL"
    data["release_state"] = "HOLD"
    data["owner_review"] = {
        "status": "COMPLETE_FAIL",
        "reviewed_occurrences": 58,
        "disposition_counts": dict(sorted(counts.items())),
        "outfit_authority_blocker_count": len(OUTFIT_REPLACE),
        "timing_blocker_count": len(RETIME),
        "motion_remediation_count": counts["ADD_OR_REPAIR_ANIMATION"],
        "normal_speed_full_title_watch": "PENDING_INDEPENDENT_POST_REPAIR",
        "independent_admission": "PENDING",
        "summary": (
            "All 58 actual v5 beats were described against contemporaneous narration. Seven current yellow-plaid "
            "appearances remain blocked by the unresolved trailer-outfit authority, fifteen beats cross narration "
            f"boundaries, and {counts['ADD_OR_REPAIR_ANIMATION']} additional relevant beats require purposeful "
            "animation or shot progression. "
            "The trailer remains HOLD pending repair, the complete 1x audible watch and independent admission."
        ),
    }
    data["gate_rule"] = (
        "FAIL CLOSED. Every trailer beat requires an actual-frame description, exact narration comparison, a bounded "
        "PASS/CLOSE_ENOUGH/RETIME/REPLACE/ADD_OR_REPAIR_ANIMATION disposition, normal-speed final-context review and "
        "independent admission. Storyboard intent, decode, filenames, thumbnails, camera moves and motion metrics cannot admit the title."
    )
    AUDIT_PATH.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Trailer v5 actual-occurrence owner review", "",
        "**Status:** `COMPLETE_FAIL / HOLD`",
        "**Scope:** all 58 narration-picture beats in the exact current v5 master",
        "**Authority:** maker/owner repair evidence only; full 1x audible watch and independent admission remain pending", "",
        "## Result", "",
        f"- `PASS`: {counts['PASS']}",
        f"- `CLOSE_ENOUGH`: {counts['CLOSE_ENOUGH']}",
        f"- `REPLACE`: {counts['REPLACE']} (all require the exact heroine-outfit decision before generation)",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}",
        "- independently admitted occurrences: 0/58", "",
        "The trailer usually selects a relevant illustration, but relevance alone is not watchability. Long static holds carry multi-part narration, transitions drift into the next destination, and seven material heroine appearances use the unresolved yellow-plaid treatment while the admitted trailer-specific appearances use the multicolour Y2K outfit. B08's current LAiDIES ident is preserved.", "",
        "## Occurrence repair queue", "",
        "| Beat | Time | What is actually visible | Narration at that time | Fit | Required action |",
        "|---|---:|---|---|---|---|",
    ]
    for row in rows:
        lines.append(
            f"| {row['beat_id']} | {row['start_seconds']:.2f}–{row['stop_seconds']:.2f}s | "
            f"{table_cell(row['actual_frame_description'])} | {table_cell(excerpt(row['narration']))} | "
            f"`{row['narration_visual_fit']}` | `{row['disposition']}` |"
        )
    lines += [
        "", "## Admission boundary", "",
        "This owner review does not release or approve the trailer. Preserve the exact current narration, music, captions and B08 LAiDIES ident. Decide the canonical trailer heroine outfit before creating replacement appearances, implement the repair queue, then run the complete normal-speed audible watch with transition, occlusion, text-legibility and responsive-player checks and obtain an independent occurrence verdict.", "",
    ]
    REVIEW_PATH.write_text("\n".join(lines), encoding="utf-8")

    readme = [
        "# Trailer v5 occurrence audit — exact current master", "",
        "Status: `COMPLETE_FAIL / HOLD`.", "",
        "All 58 narration-picture beats in the exact current master now have actual-frame descriptions and bounded repair dispositions.", "",
        f"- `PASS`: {counts['PASS']}",
        f"- `CLOSE_ENOUGH`: {counts['CLOSE_ENOUGH']}",
        f"- `REPLACE`: {counts['REPLACE']}",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}", "",
        "## Evidence", "",
        "- `trailer-v5-occurrence-audit.json` — exact master, captions, frame samples and row-level dispositions",
        "- `owner-occurrence-review.md` — human-readable 58-beat repair queue",
        "- `contact-sheets/` — ten start/middle/end review sheets",
        "- `frames/` — 174 actual-master samples", "",
        "## Boundary", "",
        "This is maker/owner repair evidence, not independent admission. The repaired successor still requires the full 1x audible watch, continuity/occlusion review, responsive-player proof and an independent occurrence verdict before release.", "",
    ]
    README_PATH.write_text("\n".join(readme), encoding="utf-8")

    registry = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    programme = next(item for item in registry["programmes"] if item["id"] == "trailer")
    programme["relevance_review"] = {
        "reviewed_occurrences": 58,
        "status": "FAIL",
        "basis": f"The owner actual-master audit describes all 58 v5 beats against contemporaneous narration: 7 require source replacement after the heroine-outfit authority decision, 15 require retiming and {counts['ADD_OR_REPAIR_ANIMATION']} additional beats require purposeful motion or shot progression."
    }
    programme["continuity_and_occlusion_review"] = {
        "reviewed_occurrences": 58,
        "status": "FAIL",
        "basis": "Start/middle/end samples cover all 58 beats. Seven material yellow-plaid heroine appearances conflict with the trailer-specific multicolour treatment; no obvious sampled subject disappearance was seen, but the complete 1x watch remains pending after repair."
    }
    programme["motion_semantics_review"] = {
        "reviewed_occurrences": 58,
        "status": "FAIL",
        "basis": f"The exact v5 samples preserve the working B08 ident and visible change in four declared-motion beats, but most of the 16-minute programme remains long static holds. {counts['ADD_OR_REPAIR_ANIMATION']} additional beats need purposeful animation or narration-progressing sequences, and timing/source blockers must be repaired first."
    }
    programme["open_findings"] = [
        "Owner repair queue: operations/video-qa/trailer-v5-occurrence-audit-2026-08-01/owner-occurrence-review.md",
        "Resolve the exact canonical trailer heroine outfit before generating replacements for B01, B04, B07, B15, B31, B39 and B56",
        "15 beats require splitting or shifting to the narration they actually depict",
        f"{counts['ADD_OR_REPAIR_ANIMATION']} additional relevant beats require meaningful local animation or purposeful shot progression; B58 alone holds one postcard for the 64-second anthem outro",
        "Preserve the current v5 B08 LAiDIES welcome ident, exact narration, music and captions",
        "Full 1x audible watch, responsive-player proof and independent post-repair occurrence admission remain pending",
    ]
    programme["admission_status"] = "FAIL"
    registry["updated"] = "2026-08-01"
    REGISTRY_PATH.write_text(json.dumps(registry, indent=2) + "\n", encoding="utf-8")

    print(dict(sorted(counts.items())))
    print(REVIEW_PATH.relative_to(ROOT))


if __name__ == "__main__":
    main()
