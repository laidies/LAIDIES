# Exact public-artifact build — current NewsStand release candidate

**Result:** SUPERSEDED PRELIMINARY ARTIFACT — RUNTIME DEPENDENCY GAP FOUND

**Source commit:** `a8ef971fc56ad41be2b28e7d0b4805eb52b3285c`

**Preliminary artifact identity SHA-256:** `4b420b0c069b3c485cb09cc3d652c8ca6443c02c7c841ca476834d4e5e68a044`

**Preliminary artifact:** 536 curated public files; 535,208,905 bytes

**NewsStand artifact:** `newsstand.html`; 60,313 bytes; SHA-256 `5af8beb902d4c04de853e156b72c80160eceeaa89145484b0c0c27abd3edb4d7`

The preliminary artifact was produced outside the repository with:

```sh
node scripts/build-public-site.mjs --root /Users/alisoneakin/Projects/laidies-newsstand-release-20260811 --output <temporary-directory>
node scripts/create-release-manifest.mjs <temporary-directory> <temporary-manifest.json>
```

The first build rejected ten real missing references. Eight Book Fair images had no tracked or local artifact, the Closet hero was dirty-only and self-hiding, and DJ SunnyV's public-card avatar did not exist. The repair removed only the deferred Book Fair and Closet image requests and pointed DJ SunnyV to the existing tracked portrait. The successor static build passed without weakening the curator or generating substitute art.

Native Safari then found that the optional Resident continuation bootstrap requested four runtime-computed scripts that the static curator did not see; the first missing request returned 404 and stopped the chain. That discovery invalidated this preliminary identity as the intended release artifact. The successor restores the four tracked runtime dependencies and exposes their literal deployable paths to the curator without changing the controller. A later receipt must bind the rebuilt exact successor identity.

`npm run ci` progressed through the episode gate, cue scope, Codex hooks, agent routing, Daily private pipeline, exact-preview calibration, media-defect fixtures, NewsStand canon, queue claims, output-path guards, rejection prevention, work-resolution calibration and canonical-instruction dependencies. It then failed the global operational-integrity check on four unrelated overdue work-resolution next-check records:

- `WRK-20260802-whole-town-launch-completion`;
- `WRK-20260804-ai-chips-shortage-quantum-route` (also missing a required redispatch receipt);
- `WRK-20260806-data-centre-community-agency-newsstand`;
- `WRK-20260807-trusted-course-owner-rulings`.

No timestamps or receipts were fabricated and the controller was not bypassed. The exact artifact is therefore prepared but not production-eligible.

This preliminary build proves the static checker rejected its named missing references; it does not prove complete deployable-file closure and must not be released.
