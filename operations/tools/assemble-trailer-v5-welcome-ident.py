#!/usr/bin/env python3
"""Build the B08-only Trailer welcome-ident successor and maker QC."""
from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map"
CONFIG = OUT_DIR / "trailer-v5-welcome-ident-config.json"
OUT = OUT_DIR / "laidies-trailer-comic-v5-welcome-ident-review-1920.mp4"
TEMP = OUT_DIR / "laidies-trailer-comic-v5-welcome-ident-review-1920.finite-tail-20260726.mp4"
IDENT_NORMALIZED = OUT_DIR / "trailer-v5-b08-ident-normalized-165f.mp4"
TAIL_STILL = OUT_DIR / "trailer-v5-frozen-v4-decoded-frame-17086.png"
TAIL_CLIP = OUT_DIR / "trailer-v5-frozen-v4-decoded-tail-11929f.mp4"
TAIL_CLIP_TEMP = OUT_DIR / "trailer-v5-frozen-v4-decoded-tail-11929f.encode-in-progress-20260726.mp4"
QC = OUT_DIR / "laidies-trailer-comic-v5-welcome-ident-review-qc.json"
MANIFEST = OUT_DIR / "trailer-v5-welcome-ident-manifest.json"
FFMPEG = Path("/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1")

def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()

def run(args: list[str], capture=False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, cwd=ROOT, text=True, check=True,
                          stdout=subprocess.PIPE if capture else None,
                          stderr=subprocess.PIPE if capture else None)

def decoded_count(path: Path) -> int:
    p = run([
        str(FFMPEG), "-v", "error", "-i", str(path), "-map", "0:v:0",
        "-f", "null", "-", "-progress", "pipe:1"
    ], True)
    frames = [
        int(line.split("=", 1)[1])
        for line in p.stdout.splitlines()
        if line.startswith("frame=")
    ]
    if not frames:
        raise RuntimeError(f"No decoded frame count for {path}")
    return frames[-1]

def frame_hashes(path: Path, start: int, end: int) -> list[str]:
    # framecrc covers every decoded frame but completes in bounded time; the
    # complete ordered vector is then SHA-256-bound in the manifest/QC.
    p = run([str(FFMPEG), "-v", "error", "-i", str(path), "-map", "0:v:0", "-f", "framecrc", "-"], True)
    hashes = []
    for line in p.stdout.splitlines():
        if not line or not line[0].isdigit():
            continue
        fields = [v.strip() for v in line.split(",")]
        n = int(fields[1])
        if start <= n < end:
            hashes.append(fields[-1])
    return hashes

def audio_hash(path: Path) -> str:
    p = subprocess.run(
        [str(FFMPEG), "-v", "error", "-i", str(path), "-map", "0:a:0", "-c", "copy", "-f", "adts", "-"],
        cwd=ROOT, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    return hashlib.sha256(p.stdout).hexdigest()

def main() -> None:
    cfg = json.loads(CONFIG.read_text())
    master = ROOT / cfg["frozen_v4"]["master"]["path"]
    ident = ROOT / cfg["replacement"]["source_ident"]["path"]
    start, end = cfg["replacement"]["frame_start"], cfg["replacement"]["frame_end_exclusive"]
    assert digest(master) == cfg["frozen_v4"]["master"]["sha256"]
    assert decoded_count(ident) == 389
    assert digest(TAIL_STILL) == "7ff6c1a7966c350900f7643abf1cad043d2743490371c05afa8ab5ab650b06a3"
    run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-nostats", "-y",
        "-loop", "1", "-framerate", "30", "-i", str(TAIL_STILL),
        "-frames:v", "11929", "-an", "-c:v", "libx264", "-crf", "0",
        "-preset", "ultrafast", "-pix_fmt", "yuv420p", str(TAIL_CLIP_TEMP)
    ])
    if decoded_count(TAIL_CLIP_TEMP) != 11929:
        raise SystemExit("Finite tail clip QC failed; review artifact was not replaced")
    TAIL_CLIP_TEMP.replace(TAIL_CLIP)
    # The source ident is 60fps; its complete 389-frame motion is time-normalized
    # into the immutable 165-frame B08 clock, then scaled without cropping.
    graph = (
             f"[0:v]fps=30,trim=end_frame=17087,setpts=N/(30*TB)[actual];"
             f"[2:v]setpts=N/(30*TB)[tail];"
             f"[actual][tail]concat=n=2:v=1:a=0,split=2[m0][m1];"
             f"[m0]trim=end_frame={start},setpts=PTS-STARTPTS[a];"
             f"[1:v]setpts=PTS-STARTPTS,setpts=PTS*0.8483290488,"
             f"fps=30,trim=end_frame={end-start},setpts=N/(30*TB),"
             f"scale=1920:1080:flags=lanczos[b];"
             f"[m1]trim=start_frame={end},setpts=PTS-STARTPTS[c];"
             f"[a][b][c]concat=n=3:v=1:a=0[v]"
    )
    run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-nostats", "-y",
         "-i", str(master), "-i", str(ident), "-i", str(TAIL_CLIP),
         "-filter_complex", graph,
         "-map", "[v]", "-map", "0:a:0", "-c:v", "libx264", "-crf", "0", "-preset", "ultrafast",
         "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", str(TEMP)])
    ident_graph = (
        "setpts=PTS-STARTPTS,setpts=PTS*0.8483290488,"
        "fps=30,trim=end_frame=165,setpts=N/(30*TB),"
        "scale=1920:1080:flags=lanczos"
    )
    run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-nostats", "-y",
        "-i", str(ident), "-vf", ident_graph, "-an", "-c:v", "libx264",
        "-crf", "0", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
        str(IDENT_NORMALIZED)
    ])
    count_master, count_out = decoded_count(master), decoded_count(TEMP)
    # Decode each full film once.  Slicing the two complete hash vectors avoids
    # re-decoding the 16-minute master four times while still proving every
    # out-of-scope frame, not just samples or boundaries.
    master_hashes = frame_hashes(master, 0, count_master)
    output_hashes = frame_hashes(TEMP, 0, count_out)
    before_match = master_hashes[:start] == output_hashes[:start]
    after_match = master_hashes[end:] == output_hashes[end:]
    ident_hashes = frame_hashes(IDENT_NORMALIZED, 0, end - start)
    interval_match = output_hashes[start:end] == ident_hashes
    source_audio_hash = audio_hash(ROOT / cfg["audio"]["source_path"])
    output_audio_hash = audio_hash(TEMP)
    if not (
        count_out == count_master == 29016
        and before_match
        and after_match
        and interval_match
        and source_audio_hash == output_audio_hash
    ):
        print(json.dumps({
            "source_frames": count_master,
            "output_frames": count_out,
            "before_B08_equal": before_match,
            "B08_equals_normalized_ident": interval_match,
            "after_B08_equal": after_match,
            "source_audio_sha256": source_audio_hash,
            "output_audio_sha256": output_audio_hash,
        }, sort_keys=True))
        raise SystemExit("Temporary output QC failed; review artifact was not replaced")
    TEMP.replace(OUT)
    vector_digest = lambda values: hashlib.sha256(
        ("\n".join(values) + "\n").encode()
    ).hexdigest()
    manifest = {
      "schema": "laidies.trailer.v5.welcome-ident-manifest",
      "status": "maker-built-review-only-unjudged",
      "frozen_master": {"path": str(master.relative_to(ROOT)), "sha256": digest(master)},
      "source_ident": {"path": str(ident.relative_to(ROOT)), "sha256": digest(ident)},
      "frozen_tail_still": {"path": str(TAIL_STILL.relative_to(ROOT)), "sha256": digest(TAIL_STILL), "source_decoded_frame": 17086, "tail_frames": 11929},
      "finite_tail_clip": {"path": str(TAIL_CLIP.relative_to(ROOT)), "sha256": digest(TAIL_CLIP), "decoded_frames": 11929},
      "replacement": {
        "beat": "B08",
        "frame_start": start,
        "frame_end_exclusive": end,
        "seconds": [start / 30, end / 30],
        "normalized_ident_path": str(IDENT_NORMALIZED.relative_to(ROOT)),
        "normalized_ident_sha256": digest(IDENT_NORMALIZED)
      },
      "output": {"path": str(OUT.relative_to(ROOT)), "sha256": digest(OUT)},
      "full_frame_vectors": {
        "source_sha256": vector_digest(master_hashes),
        "output_sha256": vector_digest(output_hashes),
        "before_B08_equal": before_match,
        "B08_equals_normalized_ident": interval_match,
        "after_B08_equal": after_match
      },
      "audio": {
        "source_extracted_adts_sha256": source_audio_hash,
        "output_extracted_adts_sha256": output_audio_hash,
        "stream_copy_exact": source_audio_hash == output_audio_hash
      },
      "outfit_hold_preserved": True,
      "public_media_modified": False,
      "maker_may_judge_or_admit": False
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    qc = {
      "schema": "laidies.trailer.v5.welcome-ident-maker-qc",
      "status": "maker-built-review-only-unjudged",
      "source_master": {"path": str(master.relative_to(ROOT)), "sha256": digest(master), "decoded_frames": count_master},
      "ident": {"path": str(ident.relative_to(ROOT)), "sha256": digest(ident), "decoded_frames": decoded_count(ident), "audio_tracks": 0},
      "replacement": {"beat": "B08", "frame_interval": [start, end], "seconds": [start/30, end/30], "output_frames": end-start, "operation": cfg["replacement"]["fit_operation"]},
      "output": {"path": str(OUT.relative_to(ROOT)), "sha256": digest(OUT), "decoded_frames": count_out, "full_decode_passed": count_out == count_master == 29016},
      "audio": {"source_path": cfg["audio"]["source_path"], "source_extracted_sha256": source_audio_hash, "output_extracted_sha256": output_audio_hash, "stream_copy_exact": source_audio_hash == output_audio_hash},
      "out_of_scope_decoded_frame_identity": {"before_B08": before_match, "after_B08": after_match, "passed": before_match and after_match},
      "exact_interval_replacement": {"output_B08_equals_normalized_ident": interval_match, "normalized_ident_sha256": digest(IDENT_NORMALIZED)},
      "full_frame_vector_sha256": {"source": vector_digest(master_hashes), "output": vector_digest(output_hashes)},
      "manifest": {"path": str(MANIFEST.relative_to(ROOT)), "sha256": digest(MANIFEST)},
      "caption_files": {"vtt": "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt", "srt": "assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.srt", "changed": False},
      "independent_emq_required": {"target": "operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-trailer-v5-welcome-ident-independent-judge-2026-07-26.md", "required": True, "maker_may_self_accept": False}
    }
    QC.write_text(json.dumps(qc, indent=2) + "\n")
    if not (count_out == count_master == 29016 and before_match and after_match and interval_match and qc["audio"]["stream_copy_exact"]):
        raise SystemExit("QC failed")

if __name__ == "__main__":
    main()
