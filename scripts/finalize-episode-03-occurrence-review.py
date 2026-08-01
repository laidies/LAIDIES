#!/usr/bin/env python3
"""Record the owner actual-frame review for all Episode 03 occurrences.

This applies plain-language actual-frame descriptions and bounded repair
dispositions to the 49 placements sampled from the exact v13 master. It is
maker evidence only: a successor still needs the complete audible 1x watch and
an independent occurrence-level admission verdict.
"""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
AUDIT_DIR = ROOT / "operations/video-qa/episode-03-occurrence-audit-2026-08-01"
AUDIT_PATH = AUDIT_DIR / "episode-03-occurrence-audit.json"
REVIEW_PATH = AUDIT_DIR / "owner-occurrence-review.md"
README_PATH = AUDIT_DIR / "README.md"


DESCRIPTIONS = [
    "Three-panel office recap: the heroine works at her computer, holds a flowchart and reads a paper beneath Previously on LAiDIES.",
    "Generic THIS WEEK card with a retro computer and an indistinct AI response panel.",
    "Episode Three title card: The Burn Book Problem, with the Burn Book and a courtroom backdrop.",
    "A concerned heroine studies her monitor beside the line The machine took a maybe and gave it a lanyard.",
    "Close view of the screen stating the client approved a July rollout while the heroine reads it.",
    "The heroine glares at the computer after the confident July-rollout claim.",
    "The heroine sits thoughtfully at her desk at night after discovering the promoted maybe.",
    "The heroine appears around the approved bright LAiDIES welcome ident; the surrounding welcome bridge remains a still.",
    "A one-shot transformation changes the heroine from a business suit into an Elle-inspired pink outfit.",
    "The heroine and a Black reporter inspect a newspaper together at the NewsStand.",
    "A newspaper fills the frame with the headline Says who? Based on what? and a fact-check reminder.",
    "A Regina-like figure holds a Burn Book beside the question Is the Burn Book peer reviewed?",
    "An official court record sits beside a pink Burn Book-style notebook, linked by the same-handwriting motif.",
    "HALLUCINATION definition card: plausible-sounding language is supplied instead of admitting the answer is unknown.",
    "Bethany Byrd stands in a school gym holding a jumbo tampon box beside a Claire's-headband conclusion bubble.",
    "Graphic reading A clue in a Claire's headband, sprinting directly to a conclusion.",
    "Verification graphic reading We are not here to churn butter by candlelight, with draft-versus-claim and receipts copy.",
    "A blue-hoodie woman in a crowd shouts She doesn't even go here!",
    "Typographic She doesn't even go here! card.",
    "Four-panel wrong-place examples: US-only advice in Canada, old pricing, discussion mistaken for decision and a technically true exception.",
    "Broken-link graphic reading cited with the confidence of my boyfriend goes to another school.",
    "An Elle-like lawyer points to a courtroom timeline beneath Do not be Chutney on the stand. Be Elle with the timeline.",
    "A Chutney-like witness holds a timeline on the stand.",
    "VERIFICATION definition and checklist: claim, timeline, domain knowledge, contradiction and receipts.",
    "Do not be Chutney on the stand. Be Elle with the timeline principle card.",
    "A Cher-inspired heroine stands in her closet beside A draft is an outfit. A claim is an alibi. Dress accordingly.",
    "DRAFT definition card: a draft is an outfit.",
    "CLAIM definition card: a claim is an alibi.",
    "RECEIPT definition card.",
    "A draft is an outfit. A claim is an alibi. Dress accordingly principle card.",
    "The heroine works as an Elle-like law clerk in a law library with a draft, CRT monitor and desk lamp.",
    "The grunt work got done for you. The judgment stayed yours principle card.",
    "Comic card comparing asking AI Are you sure? with asking Regina whether the Burn Book is peer reviewed.",
    "A near-duplicate Are you sure?/peer-reviewed card remains while narration has moved to the unchanged outfit and two popped collars.",
    "Nature study fact card explaining that some models are rewarded for a confident guess over an honest I don't know.",
    "Stanford AI Index fact card about sycophancy and agreeable answers.",
    "KPMG fact card stating that 40 of 45 AI-generated citations in sampled reports were fabricated.",
    "Sources attached is not sources checked principle card.",
    "The heroine holds a Verification Rulebook in a library with shelves labelled OpenAI, Anthropic, Google and Stanford.",
    "Move One card: provide the current source and ask for an answer only from it.",
    "Move Two card: allow the model to say I don't know.",
    "Move Three card: require the model to quote the exact supporting line.",
    "Full Prompt Like Elle rulebook page combining the three moves and the no-invented-receipts rule.",
    "Cocktail-party explanation card describing AI as the confident friend whose receipt still needs checking.",
    "This week's rule card: I can use the draft. I still check the alibi.",
    "The heroine works at a desk with a ten-minute timer, papers labelled date, quote and owner, and a magnifying glass.",
    "No invented receipts card naming missing links, dates, quotes and numbers as claims needing evidence.",
    "One static signoff card remains through the Pop Quiz, butterfly clips, KSVL, Mme CLAi-O, Dream Phone, charms and Resident Card directions before finally matching the closing Elle/Regina maxim.",
    "Episode Four teaser with Ada Lovelace, historic women in computing and The Founding Mothers title.",
]


REPLACE = {1, 33}
RETIME = {3, 17, 20, 25, 28, 29, 47}
PASS = {2, 4, 5, 6, 9, 19, 22, 30, 31, 45}
CLOSE_ENOUGH = {8, 11, 14, 21, 37, 38}
AMBIENT_SOURCE_EVIDENCE = {3, 4, 5, 6, 9, 11, 14, 17, 19, 21, 22, 25, 30, 38, 45}
PURPOSEFUL_ONE_SHOT = {8}
PURPOSEFUL_SHORT_STATIC = {2, 31, 37}


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
        elif index in PASS:
            occurrence["narration_visual_fit"] = "PASS_SOURCE_RELEVANCE"
            occurrence["disposition"] = "PASS"
            occurrence["repair_class"] = "NONE_SOURCE_RELEVANCE_AND_PURPOSEFUL_TREATMENT"
        elif index in CLOSE_ENOUGH:
            occurrence["narration_visual_fit"] = "CLOSE_ENOUGH"
            occurrence["disposition"] = "CLOSE_ENOUGH"
            occurrence["repair_class"] = "NONE_BOUNDED_RELEVANCE_ACCEPTANCE"
        else:
            occurrence["narration_visual_fit"] = "PASS_SOURCE_RELEVANCE"
            occurrence["disposition"] = "ADD_OR_REPAIR_ANIMATION"
            occurrence["repair_class"] = "NARRATIVE_LOCAL_MOTION_OR_PURPOSEFUL_SHOT_SEQUENCE"

        if index == 7:
            occurrence["motion_quality"] = "FAIL_APPROVED_IDENT_ONLY_STATIC_REMAINDER"
        elif index == 30:
            occurrence["motion_quality"] = "SOURCE_LOOP_INDEPENDENT_SOURCE_PASS_FINAL_1X_PENDING"
        elif index in AMBIENT_SOURCE_EVIDENCE:
            occurrence["motion_quality"] = "SOURCE_LOOP_EVIDENCE_EXISTS_FULL_1X_PENDING"
        elif index in PURPOSEFUL_ONE_SHOT:
            occurrence["motion_quality"] = "PURPOSEFUL_ONE_SHOT_FULL_1X_PENDING"
        elif index in PURPOSEFUL_SHORT_STATIC:
            occurrence["motion_quality"] = "PURPOSEFUL_SHORT_STATIC_FULL_1X_PENDING"
        else:
            occurrence["motion_quality"] = "FAIL_STATIC_HOLD_NO_CAMERA_OR_LOCAL_MOTION"

        occurrence["subject_layer_integrity"] = (
            "NO_OBVIOUS_OCCLUSION_IN_THREE_SAMPLES_FULL_1X_PENDING"
        )
        notes = [
            "Three actual assembled-master samples were reviewed against the contemporaneous narration.",
            "The declared picture job and prior source-level verdict were not treated as proof of the visible result.",
        ]
        if occurrence["disposition"] == "REPLACE":
            notes.append("Replace the source before motion work; the present pixels do not perform the narration's job.")
        elif occurrence["disposition"] == "RETIME":
            notes.append("Split or shift the occurrence so it starts and ends with the exact beat it depicts.")
        elif occurrence["disposition"] == "ADD_OR_REPAIR_ANIMATION":
            notes.append("Add meaningful local or narrative motion; a generic zoom or pan does not cure the static hold.")
        elif index == 7:
            notes.append("Preserve the approved ident and repair only the surrounding static bridge.")
        else:
            notes.append("Preserve the source unless the final 1x audible watch or independent review finds a new defect.")
        if index == 47:
            notes.append("Split this long occurrence into destination-specific shots and retain the signoff card only for the final maxim.")
        occurrence["review_notes"] = " ".join(notes)

    counts = Counter(item["disposition"] for item in occurrences)
    data["status"] = "FAIL"
    data["release_state"] = "HOLD"
    data["owner_review"] = {
        "status": "COMPLETE_FAIL",
        "reviewed_occurrences": len(occurrences),
        "disposition_counts": dict(sorted(counts.items())),
        "semantic_blocker_count": len(REPLACE | RETIME),
        "motion_remediation_count": counts["ADD_OR_REPAIR_ANIMATION"],
        "bounded_source_or_structural_motion_evidence_count": len(
            (AMBIENT_SOURCE_EVIDENCE | PURPOSEFUL_ONE_SHOT | PURPOSEFUL_SHORT_STATIC)
            - REPLACE
            - RETIME
        ),
        "independent_motion_pass_count": 0,
        "normal_speed_full_title_watch": "PENDING_INDEPENDENT_REVIEW",
        "independent_admission": "PENDING",
        "summary": (
            "All 49 actual assembled occurrences were sampled and described. Two require source replacement, "
            "seven require retiming, twenty-four relevant passages require purposeful animation, ten receive a "
            "bounded source-treatment PASS and six are CLOSE_ENOUGH. All apparent passes remain subject to the "
            "complete 1x audible watch and independent occurrence admission."
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
        "# Episode 03 v13 actual-occurrence owner review",
        "",
        "**Status:** `COMPLETE_FAIL / HOLD`",
        "**Scope:** all 49 narration-picture occurrences in the exact current v13 master",
        "**Authority:** maker/owner evidence only; independent admission and the complete 1x audible watch remain pending",
        "",
        "## Result",
        "",
        f"- `PASS`: {counts['PASS']}",
        f"- `CLOSE_ENOUGH`: {counts['CLOSE_ENOUGH']}",
        f"- `REPLACE`: {counts['REPLACE']}",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}",
        "- independently admitted motion PASS: 0/49",
        "",
        "Episode 03 has more genuine local motion and better source relevance than Episodes 01 and 02, but the old 47/49 picture-relevance result is not an occurrence-level launch verdict. The actual assembled master still shows wrong or mistimed sources at nine narration beats and holds twenty-four relevant cards or images too long without purposeful motion.",
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
        "This review does **not** admit the title or any occurrence as release-ready. Preserve the approved LAiDIES ident and the independently source-admitted cue-30 law-library loop. A successor must implement the repair queue, pass frame-by-frame continuity and occlusion review, pass the complete normal-speed audible watch and receive an independent occurrence verdict before Episode 03 can move beyond `HOLD`.",
        "",
    ]
    REVIEW_PATH.write_text("\n".join(lines), encoding="utf-8")

    readme = [
        "# Episode 03 occurrence audit — exact current v13 master",
        "",
        "Status: `COMPLETE_FAIL / HOLD`.",
        "",
        "All 49 narration-picture occurrences in the exact current master have actual-frame descriptions and bounded repair dispositions.",
        "",
        f"- `PASS`: {counts['PASS']}",
        f"- `CLOSE_ENOUGH`: {counts['CLOSE_ENOUGH']}",
        f"- `REPLACE`: {counts['REPLACE']}",
        f"- `RETIME`: {counts['RETIME']}",
        f"- `ADD_OR_REPAIR_ANIMATION`: {counts['ADD_OR_REPAIR_ANIMATION']}",
        "",
        "## Evidence",
        "",
        "- `episode-03-occurrence-audit.json` — exact master, source, caption, frame and disposition bindings",
        "- `owner-occurrence-review.md` — human-readable 49-row repair queue",
        "- `contact-sheets/` — 10 start/middle/end review sheets",
        "- `frames/` — 147 actual-master samples",
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
