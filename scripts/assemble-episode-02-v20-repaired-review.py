#!/usr/bin/env python3
"""Assemble the eight checksum-bound Episode 02 repair batches into v20."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

from media_builder_admission import AdmissionError, require_media_builder_admission


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4"
MASTER_SHA = "80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814"
CAPTIONS = ROOT / "assets/captions/episode-02.vtt"
CAPTIONS_SHA = "7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f"
OUTPUT = ROOT / "assets/video/episode-02-full-v20-occurrence-repaired-review.mp4"
OUT_DIR = ROOT / "operations/video-qa/episode-02-v20-occurrence-repaired-review"
CONTACT = OUT_DIR / "episode-02-v20-occurrence-repaired-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"
EXPECTED_FRAMES = 29625

BATCHES = [
    (0.0, 151.0, "operations/video-qa/episode-02-opening-repair-batch-v1/episode-02-opening-p00-p10-repaired-review-v1.mp4", "627210383dca5a2ab47c6cdc08e0e6e2f25de16f46d49ffe9c8c1aea3dbd7bbd"),
    (151.0, 283.6, "operations/video-qa/episode-02-context-cafe-repair-batch-v1/episode-02-p11-p18-context-cafe-repaired-review-v1.mp4", "32f445d29cd3b3cfd0089d4e468d57ec5caea076e0d27aeef3019b28b970deff"),
    (283.6, 430.0, "operations/video-qa/episode-02-specificity-delegation-repair-batch-v1/episode-02-p19-p26-specificity-delegation-repaired-review-v1.mp4", "f74d3d0f985f7b5a98b2d36a5bb83a75170d19d1ba4eef1490f2767b5f275664"),
    (430.0, 600.0, "operations/video-qa/episode-02-policy-proof-repair-batch-v1/episode-02-p27-p34-policy-proof-repaired-review-v1.mp4", "a4f9dbc579dbf3bda9ffb698b4fdfbccc58c4be4f979b3c6777ba7b0b85c5706"),
    (600.0, 674.0, "operations/video-qa/episode-02-radio-library-proof-repair-batch-v1/episode-02-p35-p38-radio-library-proof-repaired-review-v1.mp4", "0d9b228bf8242e5984eead9fda9337d817468c1107f2d3d847419be147f83e4b"),
    (674.0, 808.0, "operations/video-qa/episode-02-soft-skills-cocktail-repair-batch-v1/episode-02-p39-p46-soft-skills-cocktail-repaired-review-v1.mp4", "97d56c0ebaafa61970a5160a3d6f090c20e550a304bc1e9ad5f568662ae63ffb"),
    (808.0, 904.0, "operations/video-qa/episode-02-postcard-tryon-repair-batch-v1/episode-02-p47-p53-postcard-tryon-repaired-review-v1.mp4", "055f441744f0efb56e9b052e2f2c8063bd3785b478ce8dc320d3321137b8a757"),
    (904.0, 987.48, "operations/video-qa/episode-02-study-pack-signoff-repair-batch-v1/episode-02-p54-p60-study-pack-signoff-repaired-review-v1.mp4", "40c9618c68f98990012705508d0f3cf11e2272c7ca314a457c91d826697eb6cc"),
]


def run(args: list[str]) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    return {"path": str(path.relative_to(ROOT)), "sha256": sha256(path), "size_bytes": path.stat().st_size}


def verify_inputs() -> list[dict[str, object]]:
    if sha256(MASTER) != MASTER_SHA or sha256(CAPTIONS) != CAPTIONS_SHA:
        raise SystemExit("Frozen Episode 02 master or caption authority changed")
    records = []
    prior_end = 0.0
    for start, end, relative, expected_sha in BATCHES:
        if abs(start - prior_end) > 0.0001:
            raise SystemExit(f"Non-contiguous batch boundary: {prior_end} -> {start}")
        path = ROOT / relative
        if not path.exists() or sha256(path) != expected_sha:
            raise SystemExit(f"Missing or changed batch: {relative}")
        records.append({"start": start, "end": end, **record(path)})
        prior_end = end
    if abs(prior_end - 987.48) > 0.0001:
        raise SystemExit("Batch coverage does not reach the frozen endpoint")
    return records


def assemble() -> None:
    with tempfile.TemporaryDirectory(prefix="episode-02-v20-assembly-") as td:
        td_path = Path(td)
        listing = td_path / "batches.txt"
        listing.write_text("".join(f"file '{(ROOT / relative).as_posix()}'\n" for _, _, relative, _ in BATCHES))
        video_only = td_path / "video-only.mp4"
        run([str(FFMPEG), "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing), "-map", "0:v:0", "-an", "-c:v", "copy", str(video_only)])
        run([str(FFMPEG), "-y", "-v", "error", "-i", str(video_only), "-i", str(MASTER), "-map", "0:v:0", "-map", "1:a:0", "-c", "copy", "-movflags", "+faststart", str(OUTPUT)])


def make_contact() -> None:
    times = [8 + 41 * index for index in range(24)]
    with tempfile.TemporaryDirectory(prefix="episode-02-v20-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.png"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2880, 1080), (15, 8, 22))
        for index, frame in enumerate(frames):
            contact.paste(frame, ((index % 6) * 480, (index // 6) * 270))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    lines = subprocess.check_output([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-"], cwd=ROOT, text=True).splitlines()
    frames = sum(1 for line in lines if line and not line.startswith("#"))
    if frames != EXPECTED_FRAMES:
        raise RuntimeError(f"Decoded frames {frames} != {EXPECTED_FRAMES}")
    with tempfile.TemporaryDirectory(prefix="episode-02-v20-audio-") as td:
        td_path = Path(td)
        master_audio, output_audio = td_path / "master.aac", td_path / "output.aac"
        run([str(FFMPEG), "-y", "-v", "error", "-i", str(MASTER), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(master_audio)])
        run([str(FFMPEG), "-y", "-v", "error", "-i", str(OUTPUT), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(output_audio)])
        if sha256(master_audio) != sha256(output_audio):
            raise RuntimeError("Frozen AAC payload changed")
        audio_sha = sha256(output_audio)
    return {"full_av_decode": "PASS", "decoded_frames": frames, "expected_frames": EXPECTED_FRAMES, "frozen_aac_payload": "PASS_BYTE_IDENTICAL", "aac_payload_sha256": audio_sha, "caption_authority": "PASS_EXTERNAL_VTT_UNCHANGED"}


def main() -> None:
    try:
        require_media_builder_admission(Path(__file__), ROOT)
    except AdmissionError as error:
        raise SystemExit(str(error)) from error
    batch_records = verify_inputs()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    assemble(); make_contact(); checks = verify()
    manifest = {
        "schema": "laidies.episode-02.v20.occurrence-repaired-review.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_FULL_TITLE_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False, "player_binding": False},
        "frozen_master": record(MASTER), "captions": record(CAPTIONS), "builder": record(Path(__file__)),
        "batch_coverage": batch_records, "output": record(OUTPUT), "contact": record(CONTACT), "checks": checks,
        "next_gate": "independent complete normal-speed sound-on full-title review of this exact output hash",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT)); print(CONTACT.relative_to(ROOT)); print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
