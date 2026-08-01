#!/usr/bin/env python3
"""Record the owner actual-frame review for all Episode 02 occurrences.

This applies visual descriptions and bounded repair dispositions to the 61
placements sampled from the exact v19 welcome-ident v2 master. It is maker
evidence only: a repaired successor still needs the complete audible 1x watch
and an independent occurrence-level admission verdict.
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
AUDIT_DIR = ROOT / "operations/video-qa/episode-02-occurrence-audit-2026-08-01"
AUDIT_PATH = AUDIT_DIR / "episode-02-occurrence-audit.json"
REVIEW_PATH = AUDIT_DIR / "owner-occurrence-review.md"
README_PATH = AUDIT_DIR / "README.md"


DESCRIPTIONS = [
    "Three-panel office recap: the heroine sighs, sends the avoided email in nine seconds and rethinks AI as a talented new hire.",
    "Pop-art THIS WEEK card with screens labelled jargon, decision and prompt equals delegation.",
    "Episode Two comic cover: the heroine sits at the Blend & Snap with a coffee and receipt beneath Tell Me What You Want.",
    "Typographic Tell Me What You Want / Episode Two title card held after the narration has moved into the 9:15 desk scene.",
    "The heroine at her office computer facing a jargon-filled response that resembles a business-school poster.",
    "Yesterday/today split screen contrasting a useful answer with the confusing response from the same app and same user.",
    "Close view of the heroine asking why AI reads her mind some days and acts like a stranger on others.",
    "Welcome-to-LAiDIES SUNNYVAiLE street frame surrounding the inserted approved LAiDIES ident interval.",
    "The heroine leaves her office and walks through the SUNNYVAiLE town scene.",
    "The heroine at the Blend & Snap counter with her oat latte, pager and menu-board surroundings.",
    "The earlier failed jargon desk image, although the narration asks for the bad and good results side by side.",
    "CONTEXT definition card: job, reader, meeting and goal are things the AI cannot see unless supplied.",
    "THE THEATER KIDS HAD IT FIRST card carried from the theatre-kid origin into the coffee-order setup.",
    "Two café versions of the heroine showing the difference between a familiar regular and an unknown customer.",
    "Generic THE USUAL title card instead of the unfamiliar barista, blank look and resulting plain-drip consequence.",
    "CONTEXT checklist card naming the missing job, reader, meeting and goal.",
    "ASSUME IT FORGOT title card used for the instruction to spell out the order every time.",
    "ASSUME IT FORGOT title card repeated while the narration contrasts a stranger-like new chat with deliberately saved memory.",
    "ASSUME IT FORGOT card still on screen after the narration has moved to the Spice Girls setup.",
    "Lyric card reading Tell me what you want, what you really, really want.",
    "The heroine in a record store with the full Spice Girls lyric displayed beside her.",
    "David Rose-inspired figure with wine and sweater, labelled the patron saint of specifics.",
    "Generic PATRON SAINT OF SPECIFICS card while the narration needs concrete wine, sweater and fold-in-the-cheese examples.",
    "BRIEF IT LIKE A NEW HIRE checklist appearing before the narration reaches the briefing questions.",
    "PROMPTING IS DELEGATION card appearing during the fold-in-the-cheese confession and before the delegation conclusion.",
    "MATCH THIS café comparison visual appearing while the narration is still asking who, reader, tone and length.",
    "PROMPTING IS DELEGATION card held across the example question and the final delegation conclusion.",
    "WHO / WHAT / TONE / LENGTH briefing card used while the narration enumerates those exact questions.",
    "WHO / WHAT / TONE / LENGTH card repeated after the narration has moved to Match this and the resulting better answer.",
    "The heroine at her desk with the vague jargon-heavy policy response on the monitor.",
    "THE LAZY ASK title card while the narration needs the wall of text, PIVOT joke and a second attempt.",
    "Comic café comparison containing a specific senior-manager brief and a policy/report/exemption response.",
    "THE REAL BRIEF title card while the narration describes the detailed instructions and the resulting exemption answer.",
    "The detailed-brief comparison image repeated for the contractor-exemption payoff.",
    "THE USEFUL ANSWER title card during the reading job and exemption payoff.",
    "The heroine holding a phone beside a KSVL compact disc before the radio-request analogy begins.",
    "THE PROOF title card while the narration is actually explaining a radio request and not spinning the dial.",
    "THE PROOF card repeated while the narration moves from radio into a LIBRAiRY evidence search.",
    "Harvard and BCG study graphic showing the narrated performance and task-speed figures.",
    "Generic statistics title card after the narration has moved to briefing/context and the Ethan Mollick source.",
    "Statistics title card repeated while the narration quotes the importance of skills often called soft.",
    "Quote card: skills dismissed as soft turned out to be the hard ones.",
    "Expanded quote graphic explaining that the human skills sit on top of hard skills rather than replacing them.",
    "THE SKILLS THAT WIN title card at the conclusion of the skills section.",
    "The expanded hard-plus-soft quote graphic repeated for the callback.",
    "THE COCKTAIL PARTY EXPLANATION title card.",
    "Cocktail-party infographic connecting prompting, delegation and the fold-in-the-cheese example.",
    "A PROMPT ISN'T CODE. IT'S A DELEGATION quote card at the exact analogy conclusion.",
    "The delegation quote card held after narration has moved to asking a friend for a postcard.",
    "The heroine at the SUNNYVAiLE Post Office handing a postcard request to the clerk.",
    "BETTER WITH YOUR PEOPLE title card during the episode-end Try-On and laidies.ai instructions.",
    "ASK TWICE card shown while the narration is still spelling LAiDIES and explaining where to read the episode.",
    "ASK TWICE card during the exact first, deliberately lazy Try-On prompt.",
    "The old failed-jargon desk still while narration calls for two attempts and a side-by-side comparison.",
    "The detailed-brief comparison image held into narration about the Study Pack, Pop Quiz, butterfly clips and KSVL.",
    "Try-On instruction panel while the narration has moved to butterfly clips, KSVL and the song in platform sandals.",
    "THIS WEEK teaser screens during narration about the SUNNYVAiLE High Pop Quiz and learning hook.",
    "The heroine with a phone and KSVL disc held from the music hook into the Resident Card instruction.",
    "Office-to-town walking image while narration specifically directs the viewer to Makeover on Main for a Resident Card.",
    "Closing quote card: AI cannot read your mind, but you can learn to brief it, with the next-time teaser beginning at the end.",
    "Episode Three teaser showing the heroine beside a polished AI-generated executive brief labelled The Burn Book Problem.",
]


# Semantically wrong, materially incomplete or retired sources.
REPLACE = {10, 14, 17, 22, 30, 32, 36, 37, 39, 50, 53, 55, 56, 58}

# Useful sources shown outside the narration beat they depict.
RETIME = {3, 18, 23, 24, 25, 26, 28, 35, 40, 48, 51, 54, 57}

# Relevant but not exact enough to inherit a clean relevance pass.
PARTIAL = {1, 7, 12, 16, 20, 27, 34, 42, 44, 46, 47, 59}


def excerpt(text: str, limit: int = 118) -> str:
    one_line = " ".join(text.split())
    if len(one_line) <= limit:
        return one_line
    return one_line[: limit - 1].rstrip() + "…"


def main() -> None:
    data = json.loads(AUDIT_PATH.read_text(encoding="utf-8"))
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

        if index == 7:
            occurrence["motion_quality"] = "FAIL_APPROVED_IDENT_ONLY_STATIC_REMAINDER"
            occurrence["subject_layer_integrity"] = (
                "NO_OBVIOUS_IDENT_OCCLUSION_IN_THREE_SAMPLES_FULL_1X_PENDING"
            )
        else:
            occurrence["motion_quality"] = "FAIL_STATIC_HOLD_NO_CAMERA_OR_LOCAL_MOTION"
            occurrence["subject_layer_integrity"] = (
                "NO_OBVIOUS_OCCLUSION_IN_THREE_SAMPLES_FULL_1X_PENDING"
            )

        notes = [
            "Three actual assembled-master samples were reviewed against the contemporaneous narration.",
            "A filename, intended picture job or previous source-level semantic verdict was not treated as proof of the visible result.",
        ]
        if index == 7:
            notes.append(
                "Preserve the approved welcome ident; add purposeful motion to the surrounding street bridge and verify the complete transition at 1x."
            )
        else:
            notes.append(
                "The placement has no admitted local or narrative motion; a generic zoom or pan would not cure this failure."
            )
        if index in REPLACE:
            notes.append("Replace the source before motion work; the present pixels do not perform the narration's job.")
        if index in RETIME:
            notes.append("Split or shift the occurrence before motion work so it begins and ends with the beat it depicts.")
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
            "All 61 actual assembled occurrences were sampled and described. Fourteen require source replacement, "
            "thirteen require retiming before motion work, and the remaining thirty-four require meaningful local "
            "or narrative animation. The approved welcome ident is present, but its surrounding bridge is still static."
        ),
    }
    data["gate_rule"] = (
        "FAIL CLOSED. Every occurrence requires an actual-frame description, exact contemporaneous narration comparison, "
        "a bounded PASS/CLOSE_ENOUGH/RETIME/REPLACE/ADD_OR_REPAIR_ANIMATION disposition, normal-speed final-context "
        "confirmation and independent admission. Intended picture jobs, decode, filenames, thumbnails, camera moves and "
        "motion metrics cannot admit the title."
    )
    AUDIT_PATH.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Episode 02 v19 welcome-ident v2 actual-occurrence owner review",
        "",
        "**Status:** `COMPLETE_FAIL / HOLD`",
        "**Scope:** all 61 narration-picture occurrences in the exact current master",
        "**Authority:** maker/owner evidence only; independent admission and the complete 1x audible watch remain pending",
        "",
        "## Result",
        "",
        f"- `REPLACE`: {counts['REPLACE']}",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}",
        "- motion PASS: 0/61",
        "- occurrence-level motion failures: 61/61",
        "",
        "The previous blanket semantic-relevance result is not sufficient. Actual-master review found title cards that remain after the narration changes, specific promised comparisons represented by only one failed result, and generic cards where the narration requires concrete examples. The current master is not launch-watchable.",
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
        "This review does **not** admit any occurrence. A successor must preserve exact narration/caption and approved-ident identity, implement the repair queue, pass frame-by-frame continuity and occlusion review, pass the full normal-speed audible watch and receive an independent occurrence verdict before the title can move beyond `HOLD`.",
        "",
    ]
    REVIEW_PATH.write_text("\n".join(lines), encoding="utf-8")

    readme = [
        "# Episode 02 occurrence audit — exact current v19 welcome-ident v2 master",
        "",
        "Status: `COMPLETE_FAIL / HOLD`.",
        "",
        "All 61 narration-picture occurrences in the exact current master have actual-frame descriptions and bounded repair dispositions. The approved welcome ident is present, but its surrounding bridge is static. The rest of the programme is composed of static holds.",
        "",
        f"- `REPLACE`: {counts['REPLACE']}",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}",
        "- motion PASS: 0/61",
        "",
        "## Evidence",
        "",
        "- `episode-02-occurrence-audit.json` — exact master, source, caption, frame and disposition bindings",
        "- `owner-occurrence-review.md` — human-readable 61-row repair queue",
        "- `contact-sheets/` — 13 start/middle/end review sheets",
        "- `frames/` — 183 actual-master samples",
        "",
        "## Boundary",
        "",
        "This is maker/owner evidence, not independent admission. A repaired successor still requires a complete normal-speed audible watch, continuity/occlusion review and independent occurrence verdict before release.",
        "",
    ]
    README_PATH.write_text("\n".join(readme), encoding="utf-8")

    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")
    print(f"Wrote {REVIEW_PATH.relative_to(ROOT)}")
    print(f"Wrote {README_PATH.relative_to(ROOT)}")
    print(dict(sorted(counts.items())))


if __name__ == "__main__":
    main()
