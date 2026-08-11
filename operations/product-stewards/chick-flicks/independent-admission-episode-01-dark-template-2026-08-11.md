# Chick Flicks independent format admission — Episode 01 dark-template recovery

**Date:** 2026-08-11

**Independent judge:** `/root/chick_flicks_ep1_format_rejudge`

**Verdict:** **ACCEPT — EXACT LOCAL CHICK FLICKS FORMAT TUPLE ONLY**

## Exact committed tuple

- Branch: `codex/episode-01-dark-template-recovery-20260810`
- Reviewed commit: `309f43207094b14fc089131dff5cb4a770a093d5`
- Worktree state during judgment: clean

| Artifact | SHA-256 |
| --- | --- |
| `issues/issue-01.html` | `21b899c17f8e6250208f368b63273b96a362089fa76bacc0b98460f372a10cb4` |
| `content/episodes/episode-format-navigation-pilot.json` | `b24f8346b2fa9f5bc2b42e1920df27b7f2a1307049bf2fe0cad9bc47e61d4d15` |
| `watch.html` | `646664f84f6fb066ca38cc879abd52cb8c099a6d6b86b6bb0a614ff69fd4fd28` |
| `content/episode-format-navigation.css` | `06f2852b70ccd69c8caac28e7d1e4d0a489e815e7583b1d47d3823536f39ca94` |
| `content/episode-index.json` | `e56294baecf5effe2d936e2452fae7f9096afe238487e9e14268a382286f2762` |
| `content/episodes/screening-room-admission.json` | `cab1b040a864f31e06532b67a2806805a21db76d222bc2bdac70fcc307b85670` |

The judge independently recomputed all six hashes.

## Per-format disposition

| Format | Disposition | Exact verified behavior |
| --- | --- | --- |
| Read | **ACCEPT** | `/issues/issue-01.html` is current, preserves Episode 01 when opening Listen, contains no reader-facing production-language leak and renders only the admitted Episode 02 continuation. |
| Listen | **ACCEPT — COVER-ONLY** | The same Episode 01 renders `Cover-only audio edition · static cover · read-along captions` and explicitly says it is not an illustrated motion film or narration-specific visual sequence. |
| Watch | **HOLD — CORRECTLY REPRESENTED** | Both surfaces render Watch as a non-link with `aria-disabled="true"`. Direct `?ep=01&mode=watch` retains the visitor in Episode 01 Listen and states that Watch is not admitted. Authority remains `hold`, with 71 expected occurrences and zero admitted. |

## Independent evidence

- Isolated-mirror execution of
  `node scripts/test-episode-01-dark-reading-template.mjs` passed 34/34 at
  1440, 390 and 320px.
- The test binds all eight manifest dependencies, same-episode Read/Listen
  routing, visible held Watch, no overflow and the restored full-width layout.
- Its deliberate two-column CSS mutation was rejected.
- An independent Chromium exercise at 1440, 390 and 320 confirmed current
  state, keyboard reachability, visible focus, disabled Watch without `href`,
  direct-Watch fallback text and the exact Episode 02 destination.
- A temporary manifest with a zeroed `issue01Sha256` failed closed with
  `temporary manifest issue01Sha256 checksum mismatch`.
- Held class, Library and NewsStand records do not leak into the page as links.

## Limits and remaining gate

The broad Screening Room contract could not complete in the isolated worktree
because an unrelated Trailer v8 review MP4 is absent. That missing file is not
Episode 01 format or media evidence and did not become an admission claim.

This receipt is not a native Safari + VoiceOver witness, an actual 200% browser
zoom observation, motion-film/media admission, Episodes 02–04 propagation,
deployment, publication or public verification. The next exact gate is one
identified independent human Safari + VoiceOver session against this unchanged
tuple. No source or repository files were changed by the judge.
