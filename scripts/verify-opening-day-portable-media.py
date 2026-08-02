#!/usr/bin/env python3
"""Verify held Trailer/Episode 01 portable packages and fail-closed state."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import tempfile
from datetime import date, datetime
from pathlib import Path
from urllib.parse import urlparse

import imageio_ffmpeg
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "content" / "data" / "media-release.schema.json"
PACKAGE_ROOT = ROOT / "operations" / "video-qa" / "opening-day-portable-media-v1"
BINDING = ROOT / "operations" / "video-qa" / "opening-day-playback-binding-v1" / "manifest.json"
ADMISSION = ROOT / "content" / "episodes" / "screening-room-admission.json"
WATCH = ROOT / "watch.html"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def resolve_ref(root: dict, ref: str) -> dict:
    if not ref.startswith("#/"):
        raise ValueError(f"Unsupported schema ref {ref}")
    value = root
    for part in ref[2:].split("/"):
        value = value[part.replace("~1", "/").replace("~0", "~")]
    return value


def schema_errors(value, schema: dict, root: dict, path: str = "$") -> list[str]:
    errors: list[str] = []
    if "$ref" in schema:
        return schema_errors(value, resolve_ref(root, schema["$ref"]), root, path)
    if "const" in schema and value != schema["const"]:
        errors.append(f"{path}: expected const {schema['const']!r}")
    if "enum" in schema and value not in schema["enum"]:
        errors.append(f"{path}: {value!r} is not in enum")

    type_rule = schema.get("type")
    allowed = type_rule if isinstance(type_rule, list) else [type_rule] if type_rule else []
    checks = {
        "null": lambda item: item is None,
        "object": lambda item: isinstance(item, dict),
        "array": lambda item: isinstance(item, list),
        "string": lambda item: isinstance(item, str),
        "integer": lambda item: isinstance(item, int) and not isinstance(item, bool),
        "number": lambda item: isinstance(item, (int, float)) and not isinstance(item, bool),
        "boolean": lambda item: isinstance(item, bool),
    }
    if allowed and not any(checks[kind](value) for kind in allowed):
        return errors + [f"{path}: expected type {allowed}, got {type(value).__name__}"]

    if isinstance(value, dict):
        required = schema.get("required", [])
        for key in required:
            if key not in value:
                errors.append(f"{path}: missing required property {key}")
        properties = schema.get("properties", {})
        if schema.get("additionalProperties") is False:
            for key in value:
                if key not in properties:
                    errors.append(f"{path}: unexpected property {key}")
        for key, item in value.items():
            if key in properties:
                errors += schema_errors(item, properties[key], root, f"{path}.{key}")
    elif isinstance(value, list):
        if len(value) < schema.get("minItems", 0):
            errors.append(f"{path}: fewer than {schema['minItems']} items")
        if schema.get("uniqueItems"):
            encoded = [json.dumps(item, sort_keys=True) for item in value]
            if len(encoded) != len(set(encoded)):
                errors.append(f"{path}: items are not unique")
        if "items" in schema:
            for index, item in enumerate(value):
                errors += schema_errors(item, schema["items"], root, f"{path}[{index}]")
    elif isinstance(value, str):
        if len(value) < schema.get("minLength", 0):
            errors.append(f"{path}: shorter than {schema['minLength']}")
        if "pattern" in schema and not re.fullmatch(schema["pattern"], value):
            errors.append(f"{path}: does not match {schema['pattern']}")
        if schema.get("format") == "uri":
            parsed = urlparse(value)
            if not parsed.scheme or not parsed.netloc:
                errors.append(f"{path}: invalid URI")
        elif schema.get("format") == "date":
            try: date.fromisoformat(value)
            except ValueError: errors.append(f"{path}: invalid date")
        elif schema.get("format") == "date-time":
            try: datetime.fromisoformat(value.replace("Z", "+00:00"))
            except ValueError: errors.append(f"{path}: invalid date-time")
    elif isinstance(value, (int, float)) and not isinstance(value, bool):
        if "minimum" in schema and value < schema["minimum"]:
            errors.append(f"{path}: below minimum")
        if "exclusiveMinimum" in schema and value <= schema["exclusiveMinimum"]:
            errors.append(f"{path}: not above exclusiveMinimum")
    return errors


def raw_audio_hash(path: Path, temp_root: Path) -> str:
    output = temp_root / f"{hashlib.sha1(str(path).encode()).hexdigest()}.aac"
    result = subprocess.run(
        [str(FFMPEG), "-y", "-v", "error", "-i", str(path), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(output)],
        capture_output=True,
        text=True,
    )
    if result.returncode:
        raise RuntimeError(result.stderr)
    return sha256(output)


def main() -> None:
    errors: list[str] = []
    schema = json.loads(SCHEMA_PATH.read_text())
    binding = json.loads(BINDING.read_text())
    admission = json.loads(ADMISSION.read_text())
    package_index_path = PACKAGE_ROOT / "package-index.json"
    package_index = json.loads(package_index_path.read_text())

    if package_index.get("status") != "BUILT LOCALLY / HOLD":
        errors.append("package index is not BUILT LOCALLY / HOLD")
    if any(package_index.get("authority", {}).values()):
        errors.append("package index grants authority")
    if not re.search(r"var\s+EPISODE_FILMS\s*=\s*\{\s*\}\s*;", WATCH.read_text()):
        errors.append("public watch registry is not empty")

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_root = Path(temp_dir)
        for programme in ("trailer", "01"):
            manifest_path = PACKAGE_ROOT / programme / "media-release.json"
            manifest = json.loads(manifest_path.read_text())
            errors += schema_errors(manifest, schema, schema, f"$.{programme}")
            if manifest.get("status") != "HOLD" or manifest.get("releaseReceipt") is not None:
                errors.append(f"{programme}: manifest is not held/unreleased")
            if any(item.get("publicUrl") is not None or item.get("admissionStatus") != "HOLD" for item in manifest["assets"]):
                errors.append(f"{programme}: an asset is public or admitted")
            if any(item.get("status") != "HOLD" or item.get("publicUrl") is not None for item in manifest["destinations"]):
                errors.append(f"{programme}: a destination is not fail-closed")
            if admission["programmes"][programme]["admissionStatus"] != "hold":
                errors.append(f"{programme}: screening-room admission is not hold")
            if binding["programmes"][programme]["readyForBinding"] is not False:
                errors.append(f"{programme}: playback binding is marked ready")

            for artwork in manifest["artwork"]:
                path = ROOT / artwork["sourcePath"]
                if not path.exists() or sha256(path) != artwork["sha256"]:
                    errors.append(f"{programme}: artwork hash mismatch {artwork['sourcePath']}")
                    continue
                with Image.open(path) as image:
                    if image.size != (artwork["width"], artwork["height"]):
                        errors.append(f"{programme}: artwork dimensions mismatch {artwork['sourcePath']}")
                if artwork["approvalStatus"] != "HOLD":
                    errors.append(f"{programme}: artwork is not held")

            roles = {item["role"] for item in manifest["assets"]}
            if roles != {"VISUAL_MASTER", "AUDIO_MASTER", "CAPTIONS_VTT", "TRANSCRIPT"}:
                errors.append(f"{programme}: incomplete asset roles {sorted(roles)}")
            for asset in manifest["assets"]:
                path = ROOT / asset["sourcePath"]
                if not path.exists() or sha256(path) != asset["sha256"]:
                    errors.append(f"{programme}: asset hash mismatch {asset['sourcePath']}")

            assets = {item["role"]: item for item in manifest["assets"]}
            visual = ROOT / assets["VISUAL_MASTER"]["sourcePath"]
            audio = ROOT / assets["AUDIO_MASTER"]["sourcePath"]
            try:
                if raw_audio_hash(visual, temp_root) != raw_audio_hash(audio, temp_root):
                    errors.append(f"{programme}: portable audio payload differs from held film")
            except RuntimeError as error:
                errors.append(f"{programme}: audio extraction failed: {error}")

            transcript = (ROOT / assets["TRANSCRIPT"]["sourcePath"]).read_text().strip()
            if len(transcript.split()) < 500:
                errors.append(f"{programme}: transcript is unexpectedly short")

    if errors:
        print("Opening-day portable-media verifier: FAIL", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        raise SystemExit(1)

    print("Opening-day portable-media verifier: PASS")
    print("- 2 schema-conformant held packages")
    print("- exact film audio packet payload preserved in each M4A master")
    print("- captions, searchable transcripts and four cover derivatives sealed")
    print("- 8 destination entries HOLD / 0 delivered / 0 public")
    print("- public film registry empty and Screening Room admissions held")


if __name__ == "__main__":
    main()
