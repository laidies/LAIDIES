#!/usr/bin/env python3
"""Assemble Episode 03 v15 from the frozen v14 master and bounded repairs."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path

from media_builder_admission import AdmissionError, require_media_builder_admission


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts/assemble-episode-03-v14-successor.py"
PACKET = "operations/video-qa/episode-03-v15-repair-production-packet-2026-08-01"


def replacement(identifier: str, start: float, end: float, filename: str, checksum: str) -> dict[str, object]:
    return {
        "id": identifier,
        "start": start,
        "end": end,
        "path": f"{PACKET}/review-sequences/{filename}",
        "sha256": checksum,
    }


REPLACEMENTS = [
    replacement("p00-opening-recap", 0.0, 18.7, "p00-opening-recap-review-v1.mp4", "541d64c25b8eee2439e49befd9b5ba2df9e6c41d44189bf833c84e1b1c4ad9f9"),
    replacement("p07-welcome-bridge", 108.4, 135.0, "p07-welcome-bridge-review-v1.mp4", "52c04dee364471d38494fec880225a772c28686c53655964406e7df64ccf84c1"),
    replacement("p10-news-desk", 178.0, 199.0, "p10-news-desk-review-v1.mp4", "b413d0234e7eff3890fd261601fd821e34bc567d6a407f028a559ad8036627c3"),
    replacement("p12-p13-hallucination", 222.0, 261.7, "p12-p13-hallucination-review-v1.mp4", "946e5bb6ad63ce4b7528a586d74d91c5eb9f4356bd26c6fab65d0664f77773cb"),
    replacement("p15-p16-evidence-conclusion", 284.0, 328.0, "p15-p16-evidence-conclusion-review-v1.mp4", "a3105b84340c92c1bf1f00efd4feda75d2417010f2b05569682e49cd36e7f5e6"),
    replacement("p23-p24-perm-timeline", 444.0, 482.0, "p23-p24-perm-timeline-review-v1.mp4", "88f3d2381feea0688d26096249857c813722d5c2b8c6f6193bb99f008d38a160"),
    replacement("p32-judgment", 582.4, 606.0, "p32-judgment-review-v1.mp4", "1037ae178d053c0dbe01ddbab1e1dbfbdddfcf0e0a7bca4f8b55afd4610a8e08"),
    replacement("p34-p36-evidence-facts", 623.7, 691.0, "p34-p36-evidence-facts-review-v1.mp4", "6e72954e40170eb7a57c492e2b214aa4bec668e0befcbe279cc25d7124857aa8"),
    replacement("p39-p42-three-move-method", 711.2, 813.4, "p39-p42-three-move-method-review-v1.mp4", "ea3f920d9b134dfe1067d08f1faac9510c06f1e8cb5f3101ea836c9e1d58adaf"),
    replacement("p43-method-to-cocktail", 813.4, 864.1, "p43-method-to-cocktail-review-v1.mp4", "c59e2116006c51bd3558b5ee0295c8cdb335387abe9af6abafc053bbb3350215"),
    replacement("p44-weekly-rule", 864.1, 892.0, "p44-weekly-rule-review-v1.mp4", "dcb80bdd6f2083e8c093a4516366a6dc96cf180eba7a349e7ff91fb64362dc7e"),
    replacement("p46-three-claim-tryon", 930.0, 960.9, "p46-three-claim-tryon-review-v1.mp4", "76b5301f6f4a3eee4efe7a448abfc572bea6277263dfcb75ea5c131e2b1df9fe"),
    replacement("p48-episode-04-teaser", 1023.5, 1048.0, "p48-episode-04-teaser-review-v1.mp4", "dea469346c7e3450d545e5a449faa77839bb80d2ecdceaa3749d0745cc0cffb5"),
]


def load_base():
    spec = importlib.util.spec_from_file_location("episode03_v14_assembler", BASE_SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError("Could not load the frozen v14 assembler")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> None:
    try:
        require_media_builder_admission(Path(__file__), ROOT)
    except AdmissionError as error:
        raise SystemExit(str(error)) from error
    base = load_base()
    base.PARENT = ROOT / "assets/video/episode-03-full-v14-repaired-review.mp4"
    base.PARENT_SHA256 = "b67aa6d74b488c54317d42616c95908c080be962bd54c7d1d51ad471173660a7"
    base.OUTPUT = ROOT / "assets/video/episode-03-full-v15-repaired-review.mp4"
    base.TEMP_OUTPUT = base.OUTPUT.with_suffix(".building.mp4")
    base.RECEIPT = ROOT / "operations/video-qa/episode-03-v15-successor-assembly-2026-08-01.json"
    base.REPLACEMENTS = REPLACEMENTS
    base.build()

    receipt = json.loads(base.RECEIPT.read_text())
    receipt["status"] = "BUILT_LOCALLY_TECHNICAL_REVIEW_REQUIRED"
    receipt["editorial_decisions"] = [
        "Preserve the exact v14 audio stream, external captions, five admitted v14 repair windows and protected spoken-welcome ident.",
        "Replace only the 21 occurrence holds named in the independent v14 review with 13 bounded narration-specific sequences.",
        "Keep one opening ident, the correct Episode 03 Elle Woods outfit and the approved Episode 04 Founding Mothers teaser sources.",
        "Exclude rejected maps, retired teaser art, alternate outfits and unrelated generated imagery.",
    ]
    receipt["next_gate"] = "full decode, black-frame scan, repair-window scene-order verification, caption coverage, then independent full 1x audible narration-picture review"
    base.RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    main()
