#!/bin/zsh
set -euo pipefail

delivery_dir="${0:A:h}"
ffmpeg_bin="/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
source_plate="$delivery_dir/ep03-cue30-law-library-law-clerk-clean-textfree-v1-1920.png"
filter_graph="$delivery_dir/ep03-cue30-motion-filter-v1.txt"
final_output="$delivery_dir/ep03-cue30-law-library-lamp-dust-zero-net-loop-v1.mp4"
expected_source_sha="d0f2a078e795b052bdaaabad6aff8de51c4d66d5d53366d7bdd64e57a37c7b2a"
actual_source_sha="$(shasum -a 256 "$source_plate" | awk '{print $1}')"

if [[ "$actual_source_sha" != "$expected_source_sha" ]]; then
  print -u2 "source plate checksum mismatch: $actual_source_sha"
  exit 1
fi

tmp_dir="$(mktemp -d "$delivery_dir/.ep03-cue30-motion-v1.XXXXXX")"
tmp_output="$tmp_dir/candidate.mp4"
trap 'rm -f "$tmp_output"; rmdir "$tmp_dir" 2>/dev/null || true' EXIT

"$ffmpeg_bin" -hide_banner -loglevel error -y \
  -loop 1 -framerate 30 -i "$source_plate" \
  -filter_complex_script "$filter_graph" \
  -map "[v]" -frames:v 360 -an \
  -c:v libx264 -preset slow -crf 0 -pix_fmt yuv420p \
  -movflags +faststart \
  "$tmp_output"

mv -f "$tmp_output" "$final_output"
rmdir "$tmp_dir"
trap - EXIT
print "$final_output"
