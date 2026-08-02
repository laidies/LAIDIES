#!/usr/bin/env python3
"""Verify the held opening-day cover family without granting release authority."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
RECEIPT = ROOT / "operations/video-qa/opening-day-cover-system-v1/cover-build.json"
BINDING = ROOT / "operations/video-qa/opening-day-playback-binding-v1/manifest.json"
ADMISSION = ROOT / "content/episodes/screening-room-admission.json"
INDEX = ROOT / "content/episode-index.json"
EXPECTED_FORMATS = {
    "MASTER_EPISODE_COVER": (3000, 3000),
    "YOUTUBE_THUMBNAIL": (1280, 720),
    "SITE_POSTER": (1600, 900),
    "SHARE_IMAGE": (1080, 1350),
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    errors: list[str] = []
    receipt = json.loads(RECEIPT.read_text())
    binding = json.loads(BINDING.read_text())
    admission = json.loads(ADMISSION.read_text())
    episode_index = json.loads(INDEX.read_text())
    if receipt.get("status") != "BUILT LOCALLY / HOLD":
        errors.append("cover receipt must remain BUILT LOCALLY / HOLD")
    if any(receipt.get("authority", {}).values()):
        errors.append("cover receipt grants authority")

    expected_titles = {str(item["number"]).zfill(2): item["title"].upper() for item in episode_index["episodes"]}
    expected_titles["trailer"] = "WELCOME TO SUNNYVAiLE"

    artifacts = receipt.get("artifacts", [])
    if len(artifacts) != 20:
        errors.append(f"expected 20 derivatives, found {len(artifacts)}")

    by_programme: dict[str, list[dict]] = {}
    for artifact in artifacts:
        programme = artifact["programme"]
        by_programme.setdefault(programme, []).append(artifact)
        path = ROOT / artifact["sourcePath"]
        if not path.exists():
            errors.append(f"missing {artifact['sourcePath']}")
            continue
        actual_hash = sha256(path)
        if actual_hash != artifact["sha256"]:
            errors.append(f"hash mismatch {artifact['sourcePath']}")
        with Image.open(path) as image:
            actual_size = image.size
        expected_size = EXPECTED_FORMATS.get(artifact["kind"])
        if actual_size != expected_size:
            errors.append(f"dimension mismatch {artifact['sourcePath']}: {actual_size} != {expected_size}")
        if (artifact["width"], artifact["height"]) != actual_size:
            errors.append(f"declared dimension mismatch {artifact['sourcePath']}")
        if artifact.get("approvalStatus") != "HOLD":
            errors.append(f"approval status is not HOLD: {artifact['sourcePath']}")
        if artifact.get("canonicalTitle") != expected_titles.get(programme):
            errors.append(f"canonical title mismatch for {programme}: {artifact.get('canonicalTitle')}")
        source = ROOT / artifact["derivedFromSource"]
        if not source.exists() or sha256(source) != artifact["derivedFromSourceSha256"]:
            errors.append(f"identity-source mismatch for {artifact['sourcePath']}")

    for programme in ("trailer", "01", "02", "03", "04"):
        kinds = {item["kind"] for item in by_programme.get(programme, [])}
        if kinds != set(EXPECTED_FORMATS):
            errors.append(f"{programme}: incomplete derivative set {sorted(kinds)}")
        bound = binding["programmes"][programme]
        if bound["cover"]["status"] != "BUILT LOCALLY / HOLD":
            errors.append(f"{programme}: binding cover status is not held")
        if bound["readyForBinding"] is not False:
            errors.append(f"{programme}: readyForBinding must remain false")
        if admission["programmes"][programme]["admissionStatus"] != "hold":
            errors.append(f"{programme}: public admission is not hold")

    contact = receipt["contactSheet"]
    contact_path = ROOT / contact["path"]
    if not contact_path.exists() or sha256(contact_path) != contact["sha256"]:
        errors.append("contact-sheet hash mismatch")
    else:
        with Image.open(contact_path) as image:
            if image.size != (contact["width"], contact["height"]):
                errors.append("contact-sheet dimension mismatch")

    if errors:
        print("Opening-day cover-system verifier: FAIL", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        raise SystemExit(1)

    print("Opening-day cover-system verifier: PASS")
    print("- 5 programmes / 20 exact derivatives / 4 required aspect ratios")
    print("- canonical titles, source identities, hashes and dimensions match")
    print("- every cover remains HOLD and 0/5 programmes are public-bound")


if __name__ == "__main__":
    main()
