# Blend & Snap reliability repair handoff

**Evidence time:** 2026-07-27T00:11:17-07:00 (America/Vancouver)  
**Status:** BUILT LOCALLY — independent review and release/artifact gates remain open  
**Scope:** route-local café controller and its browser test only; no visual, manifest-content, component-admission, service, account, deploy or public mutation.

## Literal output

`blend-snap.html` now treats the two optional device-local values as bounded
state rather than truth:

- `laidies_bs_usual` is restored only when it exactly matches a visible,
  controlled drink button. A forged/corrupt value is cleared and cannot shape
  returning-visitor copy.
- `laidies_bs_last_pack` is restored only when it matches a currently validated
  manifest pack. A forged/stale marker is cleared and cannot imply a prior
  receipt.
- A new fetch attempt aborts the prior attempt, has one shared eight-second
  deadline for the index+manifest pair, uses `no-store`/`no-cache`, and applies
  results only when its load identity is still current. A late earlier success
  therefore cannot revive a receipt after a newer failure/retry.
- Failure remains one atomic live status with disabled ORDER, no component
  links, a released-Episodes fallback and focused Retry. A successful retry
  revalidates both sources and leaves the receipt closed.

No Study Sheet was invented, no Cards status became available, and no quiz or
downstream completion is borrowed by the café. Existing `planned`, `held` and
`unavailable` component notes remain the truthful missing-component fallback.

## Exact evidence

| Input/output | SHA-256 |
| --- | --- |
| `blend-snap.html` | `21a517635d1cf75cec023b506aca15c399dd9df28abedd8c24d125f0f427e127` |
| `scripts/test-blend-snap-browser.mjs` | `edd6ec1b85e5bb826ea98136ade647c7e3cf862f713e04e348f2fd29fb007f09` |
| `scripts/test-blend-snap-cross-entry.mjs` | `bfbb48247ecfd13220c754ce4a2faf05ef98d4cad224e8363b42cfa31653aa14` |
| `scripts/validate-blend-snap-packs.mjs` | `65a139c3a8056bda5e879555c0a87b91e0f638e62c6f36401606609bd07e549d` |

Executed locally:

```text
node scripts/test-blend-snap-browser.mjs
PASS — 110 rendered checks
node scripts/test-blend-snap-cross-entry.mjs
PASS — 54 deterministic checks
node scripts/validate-blend-snap-packs.mjs --as-of=2026-07-27
PASS — 4 published menus; 12 available, 3 held, 4 planned, 1 unavailable
git diff --check -- blend-snap.html scripts/test-blend-snap-browser.mjs
PASS
```

The added browser coverage includes malformed manifest/index JSON, fail-once
then successful retry with no cached receipt, and corrupt usual/last-pack keys.

## Remaining work and exact next action

Independent UX/accessibility review must run the exact source candidate,
including keyboard/focus, 320/390, no-JS structure and stale/timeout recovery.
The real Study Sheets, episode-specific Try-On corrections, authoritative
Cards/Closet loop, Quiz receiver handback, analytics, final café experience
and public-origin release proof remain separate owned work. The next safe
action is an independent route-local review of this exact tuple; do not turn
the local PASS into a component or release claim.

## Proactive improvement

Closed: `OPP-BS-RELIABILITY-001` — invalid local continuation values and stale
overlapping data responses could create a misleading returning state. The
measure is the 110-check browser suite, specifically the corrupt-storage and
retry-recovery scenarios. No Ali decision is required.
