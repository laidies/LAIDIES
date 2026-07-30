#!/usr/bin/env bash
set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_DIR="$(cd "$HARNESS_DIR/../../../.." && pwd)"
RUNTIME_DIR="$HARNESS_DIR/runtime"
SOURCE_MIGRATIONS="$REPO_DIR/supabase/migrations"

command -v supabase >/dev/null || { echo "BUILD REQUIRED: Supabase CLI is not installed." >&2; exit 2; }
command -v docker >/dev/null || { echo "BUILD REQUIRED: Docker is not installed." >&2; exit 2; }
docker info >/dev/null 2>&1 || { echo "BUILD REQUIRED: Docker daemon is not running." >&2; exit 2; }

# The checksum manifest is verified before copying. This keeps the local schema
# pinned to the repository release-chain input and fails closed on source drift.
( cd "$REPO_DIR" && shasum -a 256 -c "$HARNESS_DIR/migrations.sha256" )

rm -rf "$RUNTIME_DIR"
mkdir -p "$RUNTIME_DIR/supabase/migrations"
cp "$HARNESS_DIR/supabase/config.toml" "$RUNTIME_DIR/supabase/config.toml"
cp "$SOURCE_MIGRATIONS"/*.sql "$RUNTIME_DIR/supabase/migrations/"

echo "Prepared isolated local runtime at $RUNTIME_DIR"
echo "Next: $HARNESS_DIR/scripts/start-local.sh"
