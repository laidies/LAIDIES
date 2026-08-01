#!/usr/bin/env python3
"""Apply the owner actual-frame review to Episode 01's 71 occurrence rows.

This script records what is actually visible in the assembled v26 master, how
well that visual matches the contemporaneous narration, and the bounded repair
disposition. It is maker/owner evidence only: it does not replace the required
normal-speed audible watch or independent admission review.
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIT_DIR = ROOT / "operations/video-qa/episode-01-occurrence-audit-2026-08-01"
AUDIT_PATH = AUDIT_DIR / "episode-01-occurrence-audit.json"
REVIEW_PATH = AUDIT_DIR / "owner-occurrence-review.md"


DESCRIPTIONS = [
    "Season-promo comic card promising that the heroine stops feeling behind and learns to delegate without lowering her standards.",
    "Season-promo comic card promising an AI helper squad and a heroine who can make the future less confusing.",
    "Season-promo comic card bridging the future-confusion promise into the Episode 01 setup.",
    "Episode 01 comic-cover title card for On Wednesdays We Do AI.",
    "Comic office meeting in which Steve presents while colleagues react and the heroine watches.",
    "Comic text card built around the Tuesday 4:52 p.m. setup and the heroine's overworked contrast.",
    "The same Steve office-meeting image used at p04, now held over the heroine's footnotes and fourth-coffee narration.",
    "Welcome-to-LAiDIES comic text card.",
    "The heroine at a bright Y2K desk at the start and end, but a LAiDIES logo/ident frame appears at the sampled midpoint.",
    "Get in loser, we're learning AI comic interstitial.",
    "A labelled SUNNYVAiLE town map previously rejected as a fake/inaccurate town representation.",
    "Putting-it-off-era comic text card used for the group-chat invitation.",
    "The identical putting-it-off-era card repeated while the narration jumps six months ahead.",
    "AI is transformative comic text card styled as an intentionally empty slogan.",
    "The heroine at a desk facing an overloaded Miranda-style calendar and task pressure.",
    "Late-night/eleven-p.m. comic text card.",
    "An empty traditional library reading room with no heroine or Miss Jeeves present.",
    "SUNNYVAiLE LIBRAiRY exterior at dusk.",
    "Statistic card showing 78 women using generative AI for every 100 men.",
    "Gender-adoption-gap statistic card.",
    "The same gender-gap card repeated while the narration changes to manager encouragement and praise.",
    "Not imposter syndrome; pattern recognition comic text card.",
    "The identical pattern-recognition card repeated during the credibility and visible-effort explanation.",
    "The gap becomes a canyon comic text card.",
    "The identical canyon card repeated over the invisible-work and physics explanation.",
    "Dolly Parton on stage, used for the physics/cup-of-ambition bridge analogy.",
    "The tool that could return time requires time to learn comic text card.",
    "Bridge-building/Dolly comic text card leading into the Fei-Fei Li point.",
    "Fei-Fei Li/future-built-by-half-the-population comic text card.",
    "The heroine at the Blend & Snap with an orange translucent iBook, radio and cold drink.",
    "The identical Blend & Snap heroine image repeated while the narration narrows to the avoided email.",
    "Four days of dread; eleven minutes of work comic text card.",
    "The identical dread-versus-work card repeated over the eighty-percent-right draft and human judgment.",
    "The identical dread-versus-work card repeated a third time over the realization that ability was not the barrier.",
    "A group of senior women learning and working with AI together.",
    "Senior women and judgment-advantage comic text card.",
    "Professional judgment/critical-thinking comic text card.",
    "The identical critical-thinking card repeated over the full explanation of the human twenty percent.",
    "A Bronze AiGE cocktail-party scene/object composition introducing the cocktail-party explanation.",
    "Cocktail-party explanation comic text card.",
    "The identical cocktail-party card repeated while the narration introduces the talented-new-hire analogy.",
    "Talented new hire comic text card.",
    "The identical new-hire card repeated over the lived-experience limitation.",
    "The heroine and an older manager comparing work at a Y2K desk, with files and paper artifacts signalling judgment and review.",
    "Under the hood comic text card.",
    "A Y2K-styled language-prediction machine visualising next-token generation.",
    "Under-the-hood comic text card repeated after the prediction visual.",
    "The same under-the-hood card held into the two-limits transition.",
    "A Cher-style digital closet on a translucent CRT, illustrating combinatorial choice without situational context.",
    "Limit one: context comic text card.",
    "The heroine and a mentor comparing two plausible-looking outputs, used for the Burn Book/plausibility analogy.",
    "Limit two: plausibility comic text card.",
    "Three words before you go: Generative AI, Model, Hallucination comic card.",
    "The identical three-term card repeated as narration moves from Generative AI to Model.",
    "Generative AI definition card, although narration is already discussing models/editors and beginning hallucination.",
    "Model definition card, although narration is already defining hallucination.",
    "Hallucination definition card.",
    "The p50 heroine-and-mentor plausibility image repeated for pushback and human judgment.",
    "Hold auditions comic card introducing the Try-On.",
    "The same Hold auditions card, now labelled as the ten-minute Try-On.",
    "The same Hold auditions card repeated a third time while narration spells LAiDIES and mentions the written episode.",
    "The Blend & Snap heroine/iBook image reused for the three-model audition instructions.",
    "SUNNYVAiLE High exterior appears before the narration finishes comparing model strengths.",
    "KSVL Community Radio exterior appears while the narration is still finishing the Pop Quiz invitation.",
    "Mme CLAi-O storefront appears while narration begins with KSVL, then lists several different town extras.",
    "Makeover on Main exterior appears while narration begins with Fairy Godmother and hidden-charms directions.",
    "This series comes in small sips comic sign-off card.",
    "An older soft/pixelated Delta LAi Nu exterior previously superseded in the current visual system.",
    "The Rooms comic text card.",
    "Visit beautiful SUNNYVAiLE postcard frame bridging the sign-off into the next-episode teaser.",
    "A David Rose-inspired Y2K kitchen delegation scene for the Episode 02 prompting preview.",
]

# Placements whose source is semantically wrong, retired, or unsafe to retain.
REPLACE = {10, 12, 16, 20, 24, 54, 55, 60, 67}

# Placements where the source is useful but begins before or after the narration it depicts.
RETIME = {3, 8, 62, 63, 64, 65, 69}

# Semantic fit is only partial even when the still itself may be reusable.
PARTIAL = {3, 5, 7, 8, 9, 11, 12, 15, 16, 20, 21, 23, 24, 31, 33, 40,
           44, 46, 47, 49, 51, 52, 53, 54, 55, 58, 60, 62, 63, 64, 65, 69}


def excerpt(text: str, limit: int = 118) -> str:
    one_line = " ".join(text.split())
    if len(one_line) <= limit:
        return one_line
    return one_line[: limit - 1].rstrip() + "…"


def main() -> None:
    data = json.loads(AUDIT_PATH.read_text())
    occurrences = data["occurrences"]
    if len(occurrences) != len(DESCRIPTIONS):
        raise SystemExit(f"Expected {len(DESCRIPTIONS)} occurrences; found {len(occurrences)}")

    for index, occurrence in enumerate(occurrences):
        occurrence["actual_frame_description"] = DESCRIPTIONS[index]
        if index in REPLACE:
            occurrence["narration_visual_fit"] = "FAIL_REPLACE"
            occurrence["disposition"] = "REPLACE"
            occurrence["repair_class"] = "NEW_OR_APPROVED_NARRATION_SPECIFIC_VISUAL"
        elif index in RETIME:
            occurrence["narration_visual_fit"] = "FAIL_RETIME"
            occurrence["disposition"] = "RETIME"
            occurrence["repair_class"] = "SPLIT_OR_SHIFT_TO_EXACT_NARRATION_BOUNDARY"
        else:
            occurrence["narration_visual_fit"] = (
                "CLOSE_ENOUGH" if index in PARTIAL else "PASS_SOURCE_RELEVANCE"
            )
            occurrence["disposition"] = "ADD_OR_REPAIR_ANIMATION"
            occurrence["repair_class"] = "NARRATIVE_LOCAL_MOTION_OR_PURPOSEFUL_SHOT_SEQUENCE"

        occurrence["motion_quality"] = "FAIL_STATIC_HOLD_NO_CAMERA_OR_LOCAL_MOTION"
        occurrence["subject_layer_integrity"] = (
            "FAIL_FRAME_STATE_SWAP_AT_MIDPOINT" if index == 8
            else "NO_OBVIOUS_OCCLUSION_IN_THREE_SAMPLES_FULL_1X_PENDING"
        )
        notes = [
            "Three actual assembled-master samples were reviewed against the contemporaneous narration.",
            "The placement has no admitted narrative or local motion; still-image zoom/pan would not cure this failure.",
        ]
        if index in REPLACE:
            notes.append("Do not preserve this source merely by animating it; replace it first.")
        if index in RETIME:
            notes.append("Split or shift the occurrence before adding motion so the visual starts with the narration it depicts.")
        occurrence["review_notes"] = " ".join(notes)

    counts = Counter(item["disposition"] for item in occurrences)
    data["status"] = "FAIL"
    data["release_state"] = "HOLD"
    data["owner_review"] = {
        "status": "COMPLETE_FAIL",
        "reviewed_occurrences": len(occurrences),
        "disposition_counts": dict(sorted(counts.items())),
        "motion_pass_count": 0,
        "motion_fail_count": len(occurrences),
        "normal_speed_full_title_watch": "PENDING_INDEPENDENT_REVIEW",
        "independent_admission": "PENDING",
        "summary": (
            "All 71 actual assembled occurrences were sampled and described. Every placement is a static hold. "
            "Nine require source replacement, seven require retiming before motion work, and the remaining "
            "55 require meaningful narrative/local animation or a purposeful shot sequence."
        ),
    }
    data["gate_rule"] = (
        "FAIL CLOSED. Every occurrence requires visual description, exact narration comparison, a bounded "
        "PASS/CLOSE_ENOUGH/RETIME/REPLACE/ADD_OR_REPAIR_ANIMATION disposition, normal-speed final-context "
        "confirmation and independent admission. Decode, filenames, thumbnails, camera moves and motion metrics "
        "cannot admit the title."
    )
    AUDIT_PATH.write_text(json.dumps(data, indent=2) + "\n")

    lines = [
        "# Episode 01 v26 actual-occurrence owner review",
        "",
        "**Status:** `COMPLETE_FAIL / HOLD`  ",
        "**Scope:** all 71 narration-picture occurrences in the exact v26 master  ",
        "**Authority:** maker/owner evidence only; independent admission and the full 1x audible watch remain pending",
        "",
        "## Result",
        "",
        f"- `REPLACE`: {counts['REPLACE']}",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}",
        "- motion PASS: 0/71",
        "- static holds: 71/71",
        "",
        "The current master is not launch-watchable. It contains long runs of repeated text cards, repeated stills across changed narration, retired town imagery, mistimed building cards and no admitted narrative/local animation. A successful decode does not cure any of those defects.",
        "",
        "## Occurrence-by-occurrence repair queue",
        "",
        "| ID | Time | What is actually visible | Narration at that time | Fit | Required action |",
        "|---|---:|---|---|---|---|",
    ]
    for occurrence in occurrences:
        visual = occurrence["actual_frame_description"].replace("|", "\\|")
        narration = excerpt(occurrence["narration"]).replace("|", "\\|")
        lines.append(
            f"| p{occurrence['placement_index']:02d} | {occurrence['start_seconds']:.2f}–{occurrence['stop_seconds']:.2f}s "
            f"| {visual} | {narration} | `{occurrence['narration_visual_fit']}` | `{occurrence['disposition']}` |"
        )
    lines += [
        "",
        "## Admission boundary",
        "",
        "This review does **not** mark any occurrence independently approved. A successor must preserve exact narration/caption identity, implement the repair queue, pass frame-by-frame continuity/occlusion review, pass the full normal-speed audible watch and receive an independent occurrence verdict before the title can move beyond `HOLD`.",
        "",
    ]
    REVIEW_PATH.write_text("\n".join(lines))

    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")
    print(f"Wrote {REVIEW_PATH.relative_to(ROOT)}")
    print(dict(sorted(counts.items())))


if __name__ == "__main__":
    main()
