#!/usr/bin/env python3
"""Build held, checksum-bound portable packages for the Trailer and Episode 01.

The audio masters are stream-copied from the exact held visual masters. Nothing
in this builder grants release, publication, destination delivery or player
binding authority.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "media" / "opening-day-portable-v1"
RECEIPT_ROOT = ROOT / "operations" / "video-qa" / "opening-day-portable-media-v1"
BINDING = ROOT / "operations" / "video-qa" / "opening-day-playback-binding-v1" / "manifest.json"
COVER_RECEIPT = ROOT / "operations" / "video-qa" / "opening-day-cover-system-v1" / "cover-build.json"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())


PROGRAMMES = {
    "trailer": {
        "releaseId": "laidies-trailer-welcome-to-sunnyvaile-v1",
        "releaseType": "TRAILER",
        "title": "Welcome to SUNNYVAiLE",
        "description": "Before the season starts, your heroine owes you a tour: the show, the streets and how a Wednesday works.",
        "canonicalUrl": "https://laidies.ai/issues/issue-trailer",
        "canonRefs": [
            "issues/issue-trailer.html",
            "docs/product/take-it-with-me-media.md",
            "operations/video-qa/opening-day-playback-binding-v1/manifest.json",
        ],
        "seasonNumber": 1,
        "episodeNumber": 0,
        "releaseDate": None,
        "captionPath": "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt",
    },
    "01": {
        "releaseId": "laidies-episode-01-on-wednesdays-we-do-ai-v1",
        "releaseType": "EPISODE",
        "title": "On Wednesdays We Do AI",
        "description": "The one in which she realizes AI is already being added to the invisible load, says ‘ugh, as if,’ and opens the tab anyway.",
        "canonicalUrl": "https://laidies.ai/issues/issue-01",
        "canonRefs": [
            "content/episodes/episode-01.canon.md",
            "content/episodes/issue-01.json",
            "docs/product/take-it-with-me-media.md",
            "operations/video-qa/opening-day-playback-binding-v1/manifest.json",
        ],
        "seasonNumber": 1,
        "episodeNumber": 1,
        "releaseDate": None,
        "captionPath": "assets/captions/episode-01.vtt",
    },
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        capture_output=True,
        text=True,
    )
    match = re.search(r"Duration:\s+(\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    hours, minutes, seconds = match.groups()
    return round(int(hours) * 3600 + int(minutes) * 60 + float(seconds), 3)


def stream_copy_audio(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = destination.with_suffix(".tmp.m4a")
    command = [
        str(FFMPEG), "-y", "-v", "error", "-i", str(source),
        "-map", "0:a:0", "-c:a", "copy", "-map_metadata", "-1",
        "-metadata", "creation_time=1970-01-01T00:00:00Z",
        "-movflags", "+faststart", str(temporary),
    ]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)
    temporary.replace(destination)


def caption_to_transcript(source: Path) -> str:
    blocks = re.split(r"\n\s*\n", source.read_text(encoding="utf-8-sig").replace("\r\n", "\n"))
    lines: list[str] = []
    for block in blocks:
        block_lines = [line.strip() for line in block.splitlines() if line.strip()]
        if not block_lines or block_lines[0] == "WEBVTT":
            continue
        timing_index = next((index for index, line in enumerate(block_lines) if "-->" in line), None)
        if timing_index is None:
            continue
        text = " ".join(block_lines[timing_index + 1:])
        text = re.sub(r"<[^>]+>", "", text)
        text = re.sub(r"\s+", " ", text).strip()
        if text and (not lines or text != lines[-1]):
            lines.append(text)
    return "\n\n".join(lines).strip() + "\n"


def artwork_for(programme: str, covers: dict) -> list[dict]:
    source_items = [item for item in covers["artifacts"] if item["programme"] == programme]
    result = []
    for item in source_items:
        result.append({
            "artworkId": f"{programme}-{item['kind'].lower().replace('_', '-')}-v1",
            "kind": item["kind"],
            "sourcePath": item["sourcePath"],
            "sha256": item["sha256"],
            "width": item["width"],
            "height": item["height"],
            "derivedFrom": item["derivedFromSource"],
            "focalPoint": {"x": 0.5, "y": 0.5},
            "safeAreaNotes": "Exact held derivative from the canonical programme identity; visual acceptance remains open.",
            "approvalStatus": "HOLD",
            "approvalRef": None,
            "creator": "LAiDIES",
            "rightsStatus": item["rightsStatus"],
            "altText": f"LAiDIES {PROGRAMMES[programme]['title']} cover artwork.",
        })
    return result


def build_programme(programme: str, config: dict, binding: dict, covers: dict) -> tuple[dict, dict]:
    bound = binding["programmes"][programme]
    film = ROOT / bound["film"]["path"]
    captions = ROOT / config["captionPath"]
    programme_out = OUT / programme
    programme_receipt = RECEIPT_ROOT / programme
    programme_out.mkdir(parents=True, exist_ok=True)
    programme_receipt.mkdir(parents=True, exist_ok=True)

    audio = programme_out / f"{programme}-audio-master-v1.m4a"
    transcript = programme_out / f"{programme}-transcript-v1.txt"
    stream_copy_audio(film, audio)
    transcript.write_text(caption_to_transcript(captions), encoding="utf-8")

    duration = probe_duration(audio)
    manifest = {
        "schemaVersion": "1.0.0",
        "releaseId": config["releaseId"],
        "releaseType": config["releaseType"],
        "version": 1,
        "status": "HOLD",
        "supersedes": None,
        "canonical": {
            "title": config["title"],
            "description": config["description"],
            "canonicalUrl": config["canonicalUrl"],
            "canonRefs": config["canonRefs"],
            "seasonNumber": config["seasonNumber"],
            "episodeNumber": config["episodeNumber"],
            "releaseDate": config["releaseDate"],
            "language": "en",
            "rightsStatus": "HOLD",
        },
        "artwork": artwork_for(programme, covers),
        "assets": [
            {
                "role": "VISUAL_MASTER",
                "sourcePath": bound["film"]["path"],
                "publicUrl": None,
                "sha256": bound["film"]["sha256"],
                "mimeType": "video/mp4",
                "durationSeconds": bound["film"]["durationSeconds"],
                "admissionStatus": "HOLD",
            },
            {
                "role": "AUDIO_MASTER",
                "sourcePath": str(audio.relative_to(ROOT)),
                "publicUrl": None,
                "sha256": sha256(audio),
                "mimeType": "audio/mp4",
                "durationSeconds": duration,
                "admissionStatus": "HOLD",
            },
            {
                "role": "CAPTIONS_VTT",
                "sourcePath": config["captionPath"],
                "publicUrl": None,
                "sha256": sha256(captions),
                "mimeType": "text/vtt",
                "durationSeconds": None,
                "admissionStatus": "HOLD",
            },
            {
                "role": "TRANSCRIPT",
                "sourcePath": str(transcript.relative_to(ROOT)),
                "publicUrl": None,
                "sha256": sha256(transcript),
                "mimeType": "text/plain",
                "durationSeconds": None,
                "admissionStatus": "HOLD",
            },
        ],
        "destinations": [
            {"name": name, "status": "HOLD", "publicUrl": None, "deliveryId": None, "verificationRef": None}
            for name in ("SITE", "APPLE_PODCASTS", "SPOTIFY_PODCASTS", "YOUTUBE")
        ],
        "freshness": {"signalIds": [], "workOrderIds": [], "lastCheckedAt": None},
        "correctionPropagation": {
            "affectedConsumers": [
                {
                    "consumer": name,
                    "disposition": "HOLD",
                    "evidence": "Exact package is built locally; independent human AV review and release admission remain open.",
                }
                for name in ("site-player", "podcast-rss", "YouTube", "search-and-related-learning")
            ],
            "complete": False,
        },
        "releaseReceipt": None,
    }
    manifest_path = programme_receipt / "media-release.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    entry = {
        "programme": programme,
        "title": config["title"],
        "status": "BUILT LOCALLY / HOLD",
        "film": {"path": bound["film"]["path"], "sha256": bound["film"]["sha256"]},
        "audio": {"path": str(audio.relative_to(ROOT)), "sha256": sha256(audio), "durationSeconds": duration},
        "captions": {"path": config["captionPath"], "sha256": sha256(captions)},
        "transcript": {"path": str(transcript.relative_to(ROOT)), "sha256": sha256(transcript)},
        "manifest": {"path": str(manifest_path.relative_to(ROOT)), "sha256": sha256(manifest_path)},
        "destinations": "4 HOLD / 0 delivered / 0 public",
    }
    return manifest, entry


def main() -> None:
    binding = json.loads(BINDING.read_text())
    covers = json.loads(COVER_RECEIPT.read_text())
    entries = []
    for programme, config in PROGRAMMES.items():
        _, entry = build_programme(programme, config, binding, covers)
        entries.append(entry)

    index = {
        "schema": "laidies.opening-day-portable-media.v1",
        "buildIdentity": "opening-day-portable-media-v1",
        "status": "BUILT LOCALLY / HOLD",
        "authority": {"accept": False, "release": False, "deliver": False, "deploy": False, "publish": False},
        "purpose": "Exact portable audio, transcript, artwork and metadata packages for the Trailer and Episode 01.",
        "programmes": entries,
        "remainingGate": "Qualified independent human unmuted 1x review, visual cover acceptance, release admission and destination-specific public verification.",
    }
    RECEIPT_ROOT.mkdir(parents=True, exist_ok=True)
    index_path = RECEIPT_ROOT / "package-index.json"
    index_path.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Built {len(entries)} held portable packages")
    for entry in entries:
        print(f"- {entry['programme']}: {entry['audio']['path']} {entry['audio']['sha256']}")
    print(f"- index: {index_path.relative_to(ROOT)} {sha256(index_path)}")


if __name__ == "__main__":
    main()
