#!/usr/bin/env bash
set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUNTIME_DIR="$HARNESS_DIR/runtime"

test -f "$RUNTIME_DIR/supabase/config.toml" || {
  echo "BUILD REQUIRED: run bootstrap-local.sh first." >&2
  exit 2
}
command -v supabase >/dev/null || { echo "BUILD REQUIRED: Supabase CLI is not installed." >&2; exit 2; }
command -v docker >/dev/null || { echo "BUILD REQUIRED: Docker is not installed." >&2; exit 2; }
docker info >/dev/null 2>&1 || { echo "BUILD REQUIRED: Docker daemon is not running." >&2; exit 2; }

# Only the harness work directory is supplied to the local CLI.
supabase start --workdir "$RUNTIME_DIR"
supabase db reset --local --workdir "$RUNTIME_DIR"
supabase status --workdir "$RUNTIME_DIR"
echo "Mail capture: http://127.0.0.1:55324"
