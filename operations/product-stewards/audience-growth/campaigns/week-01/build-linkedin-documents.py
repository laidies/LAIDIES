#!/usr/bin/env python3
"""Build five-page LinkedIn document candidates from the admitted Week 01 manifest."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "seven-day-content-board.json"
OUTPUT = ROOT / "assets" / "linkedin-documents"
TEMP_PAGES = ROOT.parents[4] / "tmp" / "pdfs" / "week-01" / "linkedin-page-jpegs"
PAGE = 1200


def panels(unit: dict) -> list[tuple[str, str, str]]:
    return [
        ("OPEN", unit["hooks"][0], "Turn the page for the complete idea."),
        ("LESSON", unit["title"], unit["payoff"]),
        ("ANOTHER WAY IN", unit["hooks"][1], unit["linkedin"]["copy"]),
        ("LIMIT", "Keep the useful boundary.", unit["guardrail"]),
        (
            "KEEP IT",
            unit["hooks"][2],
            "Save the complete framework. Try it only on information you are authorized to share.",
        ),
    ]


def build(unit: dict) -> None:
    target = OUTPUT / f"{unit['id'].lower()}.pdf"
    canvas = Canvas(str(target), pagesize=(PAGE, PAGE), pageCompression=1)
    canvas.setTitle(f"{unit['id']} — {unit['title']}")
    canvas.setAuthor("LAiDIES Audience & Growth")

    for index, (eyebrow, title, body) in enumerate(panels(unit), start=1):
        page_path = (
            ROOT
            / "assets"
            / "linkedin-document-pages"
            / f"{unit['id'].lower()}-page-{index}.png"
        )
        jpeg_path = TEMP_PAGES / f"{unit['id'].lower()}-page-{index}.jpg"
        with Image.open(page_path) as page_image:
            page_image.convert("RGB").save(jpeg_path, "JPEG", quality=96, subsampling=0)
        canvas.drawImage(ImageReader(str(jpeg_path)), 0, 0, PAGE, PAGE)
        accessible = canvas.beginText(1, 1)
        accessible.setTextRenderMode(3)
        accessible.setFont("Helvetica", 1)
        accessible.textLine(
            " ".join(
                [
                    unit["source"]["label"],
                    eyebrow,
                    title,
                    body,
                    f"Page {index} of 5.",
                ]
            )
        )
        canvas.drawText(accessible)
        canvas.showPage()

    canvas.save()


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    TEMP_PAGES.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text())
    requested_ids = set(sys.argv[1:])
    selected = [
        unit
        for unit in manifest["units"]
        if unit["job"] in {"TEACH", "SAVE/SEND"}
        and (not requested_ids or unit["id"] in requested_ids)
    ]
    for unit in selected:
        build(unit)
    print(f"built {len(selected)} five-page LinkedIn document PDFs")


if __name__ == "__main__":
    main()
