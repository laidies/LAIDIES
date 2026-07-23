#!/usr/bin/env bash
# hashstamp.sh SRC STAMP
#
# Write sha256(SRC) into STAMP — but ONLY if the hash actually changed.
#
# Why this exists: make decides "is this out of date?" by comparing modification
# times. This repo lives in iCloud Drive, where a file can be evicted and
# re-downloaded, and where "save with no edit" is common. Either moves the mtime
# without changing a single byte, and make would then rebuild the whole week.
#
# So nothing downstream ever depends on the source file. It depends on the
# stamp, and the stamp's mtime moves only when the CONTENT moved. Same idea DVC
# and go-task use; fifteen lines instead of a product.
set -euo pipefail

SRC="${1:?usage: hashstamp.sh <source file> <stamp file>}"
STAMP="${2:?usage: hashstamp.sh <source file> <stamp file>}"

if [ ! -f "$SRC" ]; then
  echo "hashstamp: source does not exist: $SRC" >&2
  exit 1
fi
if [ ! -s "$SRC" ]; then
  echo "hashstamp: source is EMPTY, refusing to stamp it as done: $SRC" >&2
  exit 1
fi

mkdir -p "$(dirname "$STAMP")"
NEW="$(shasum -a 256 "$SRC" | awk '{print $1}')"
OLD=""
[ -f "$STAMP" ] && OLD="$(awk '{print $1}' "$STAMP" 2>/dev/null || true)"

if [ "$NEW" = "$OLD" ]; then
  exit 0                      # unchanged — leave the mtime alone
fi
printf '%s  %s\n' "$NEW" "$SRC" > "$STAMP"
