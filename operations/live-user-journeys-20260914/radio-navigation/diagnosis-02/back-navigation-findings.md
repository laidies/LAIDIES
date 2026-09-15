# Back-navigation diagnosis — 2026-09-15

## Scope

Read-only source diagnosis after the passive-follower candidate. This does not assess or modify that candidate, and does not claim a live fix.

## Fresh live source evidence

Fetched from `https://laidies.ai` at review time:

| Asset | SHA-256 | Relevant behavior |
|---|---|---|
| `content/site/sv-back-nav.js` | `5e377b8eae94fb2ca3eb9465aa0a1e547ad49e51a2c1b774cd588d62dd4a78e7` | The shared rail control calls `preventDefault()` then `history.back()` for a same-origin return. |
| `content/site/ksvl-player.js` | `e04ed425ba9e04859530aa2034a4bf794ed912d98724f5477083a33d40f09bcf` | The ordinary navigation listener ignores an event whose `defaultPrevented` is true; a persisted history return calls `hydrateFromStorage(false)`. |

`sv-back-nav.js:199-203` installs the direct anchor listener and, for the reported Back to KSVL RAiDIO click, prevents the anchor navigation before invoking `history.back()`.

`ksvl-player.js:1823-1830` is the only ordinary link path that records `laidies_ksvl_navigation_v2`. Its early return includes `event.defaultPrevented`, so the document-level listener does not write a continuation record after the rail listener prevents the default.

`ksvl-player.js:1832-1839` saves/releases on `pagehide`; when the old Radio document returns from bfcache, `pageshow` with `event.persisted` calls `hydrateFromStorage(false)`. That explicitly restores the saved queue as paused, matching the observed result.

## Verdict

**Certain for the reported path:** the back rail is a history traversal, not an ordinary link navigation. It bypasses the current click-based continuation writer and its bfcache restoration deliberately supplies `false`. This explains why ordinary Radio → LIBRAiRY continues while shared Back → Radio restores paused.

The hypothesis does not require an unreleased owner, duplicate player, or lock stealing. The passive-follower repair can be correct independently of this return-path defect.

## Bounded next mechanism, after the active release

Add one KSVL-aware continuation handoff at the shared back-nav action before `history.back()` **only when current KSVL ownership is actively playing**, using the same validated destination/expiry record that ordinary links use. The player must also distinguish the expected back destination on `pageshow` and consume that one-shot record before its current `hydrateFromStorage(false)` branch.

This needs focused history/bfcache tests for: playing return, deliberate paused return, external/history fallback, expired or wrong destination record, and a real active owner in another window. It should not convert arbitrary browser Back navigation into autoplay and must not force or steal a Web Lock.
