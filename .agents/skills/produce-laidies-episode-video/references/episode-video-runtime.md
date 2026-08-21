# Episode video runtime reference

## Tool boundary

- Canva: image-to-video animation from one approved still.
- CapCut: assembly, cutting, sequencing, audio alignment, and final export.
- Repository scripts: reproducible review-sequence builds, decode checks, hashes, cue validation, and rejection denial.

## Required build record

Record:

- task and episode identifier;
- source path, SHA-256, current role and approval source for every input;
- narration text/window and editorial purpose per shot;
- motion class: still, transition, one-shot, or zero-net-travel loop;
- output path, SHA-256, geometry, fps, frames, duration, audio channels and sample rate;
- maker-visible inspection findings;
- exact validators run and their calibration identity;
- limits: what was not semantically judged, assembled, released, or publicly verified.

## Current denial surfaces

Use `operations/quarantine/episode-media-20260820.json` for exact quarantined paths and hashes. Use `scripts/check-rejected-episode-media.mjs` as the build-time denial guard. An archive or quarantine manifest explains history; it never admits reuse.

For real people, run `node scripts/check-real-person-references.mjs` with the required person names before rendering.
