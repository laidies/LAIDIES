# Control Room handoff — Episode 01 dark reading-template recovery

**Status:** COMMITTED LOCAL CANDIDATE / VISUAL-LAYOUT ACCEPTED / RELEASE HOLD

**Action and evidence time:** 2026-08-10 07:10 PDT

## Literal output

Episode 01 now uses the previously aligned dark reading template: one
full-width standing-ovation hero, centred live title and metadata, an 840px
editorial shell with 720px desktop reading measure, and no split-screen or
narrow right-hand text column. Read, Listen and visibly held Watch remain
present and episode-specific.

- Branch: `codex/episode-01-dark-template-recovery-20260810`
- Implementation commit: `2c53cfe1742a6307748e5f8aad5c409e2d1d7aef`
- Candidate: `issues/issue-01.html`
- Candidate SHA-256: `21b899c17f8e6250208f368b63273b96a362089fa76bacc0b98460f372a10cb4`
- Format manifest: `content/episodes/episode-format-navigation-pilot.json`
- Manifest SHA-256: `b24f8346b2fa9f5bc2b42e1920df27b7f2a1307049bf2fe0cad9bc47e61d4d15`

## Tests and judgment

- `node scripts/test-episode-01-dark-reading-template.mjs`
- Result: PASS 34 / FAIL 0 at 1440, 390 and 320.
- Calibration: a deliberately reintroduced two-column hero was rejected.
- Independent visual/layout verdict:
  `operations/product-stewards/episode-experience/independent-visual-acceptance-episode-01-dark-template-recovery-2026-08-10.md`
- Verdict SHA-256:
  `71146f4f1fef0978522fc1ccc579b702b0555ee67edfc86cb5b5773cef98311c`
- Verdict: ACCEPT — visual/layout only.

## Locks, dependencies and next trigger

- The old iCloud worktree was read-only recovery source; none of its dirty
  bytes were reset, cleaned, stashed, moved or committed.
- Control Room owns integration of this exact commit into the current release
  branch and reconciliation with newer shared-file work.
- Chick Flicks must re-admit the exact committed Read/Listen/held-Watch tuple
  because the page and manifest identities changed.
- An identified independent human must then hear and record Safari + VoiceOver
  current/disabled states, same-episode activation, truthful Watch fallback,
  zoom/focus and recovery. Do not repeat machine-only checks.
- Episodes 02–04 propagation remains held until both gates pass and Control
  Room grants a shared-file integration lock.

## Authority truth

No media, canon, narration, deployment, publication, public verification,
spend, account/private-data action or Ali approval authority was used. This is
the Episode 01 reading-page repair only; it does not admit Episodes 1–4 motion
films or authorize Episode 5 production.
