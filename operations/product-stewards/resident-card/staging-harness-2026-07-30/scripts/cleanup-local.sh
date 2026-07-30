#!/usr/bin/env bash
set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUNTIME_DIR="$HARNESS_DIR/runtime"

test -d "$RUNTIME_DIR" || { echo "Nothing to clean."; exit 0; }
test -f "$RUNTIME_DIR/supabase/config.toml" || { echo "Refusing: runtime lacks this harness configuration." >&2; exit 2; }
grep -q 'project_id = "laidies-resident-staging-20260730"' "$RUNTIME_DIR/supabase/config.toml" || {
  echo "Refusing: runtime is not this harness." >&2; exit 2;
}

if command -v supabase >/dev/null; then
  supabase stop --workdir "$RUNTIME_DIR" --no-backup || true
fi
rm -rf "$RUNTIME_DIR"
echo "Removed local database, captured mail, keys and fixture users for this harness."
