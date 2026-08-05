# Episode cast held-portrait source-narrowing tuple — maker receipt

**Status:** `VERIFIED LOCALLY — INDEPENDENT JUDGMENT REQUIRED`

## What this proves

This receipt supplies the missing immediate-predecessor tuples for the ten
cast portrait removals. The predecessor bytes below are deterministic
reconstructions, not a claim that a separately saved historical file was
found: each starts with the exact current candidate and restores only the
known former `<img>` fragment for each held card. The exact former fragments
are extracted from `HEAD` commit `f8623631b7908c955078ef36b543b2fb470d9a59`,
where every named asset/name pair occurs exactly once in that issue's cast.

The verifier proves in byte order that every substring outside the intended
old-image/current-held pairs is identical. Thus unrelated navigation, hero,
scene, reading, and visual-route work is intentionally carried unchanged in
both sides of every reconstructed tuple.

No issue HTML or CSS was changed for this evidence task. No registry,
manifest, inventory, deployment, publication, or release action occurred.

## Bound tuples

| Route | Reconstructed predecessor SHA-256 | Current SHA-256 | Exact substitutions |
| --- | --- | --- | ---: |
| `issues/issue-01.html` | `036f84226f3aeab51a26a50d46cc8f98f970fa673f00bbfe81f907c399470eb0` | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` | Cher, Dolly, Regina (3) |
| `issues/issue-02.html` | `5c07adfbfbeedd8c5f5e53a31754e84bc2f66eb2d9bf2698e78050d30a8880d7` | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` | David, Miranda, Elle (3) |
| `issues/issue-03.html` | `52faffe19ee7692dc793c0b6d5f0c42d8c77cde963a35563dce02f99c294e751` | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` | Elle, Cher, Regina (3) |
| `issues/issue-04.html` | `dc840a71035294b63f2c93cf6489e3e9b05abbb82b1d148e93aead24e8a649f5` | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` | Ada (1) |

## Exact removed paths

1. `../assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.jpg` — Issues 01, 03
2. `../assets/saints/y2k-stained-glass-v2/dolly-parton-y2k-stained-glass.jpg` — Issue 01
3. `../assets/saints/y2k-stained-glass-v2/regina-george-cautionary-red-y2k-stained-glass.jpg` — Issues 01, 03
4. `../assets/saints/y2k-stained-glass-v2/david-rose-y2k-stained-glass.jpg` — Issue 02
5. `../assets/saints/y2k-stained-glass-v2/miranda-priestly-y2k-stained-glass.jpg` — Issue 02
6. `../assets/saints/y2k-stained-glass-v2/elle-woods-y2k-stained-glass.jpg` — Issues 02, 03
7. `../assets/mavens/y2k-stained-glass-v2/ada-lovelace-y2k-stained-glass.jpg` — Issue 04

Each old fragment is replaced by exactly:

```html
<span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>NAME</b>
```

with the original name, teaching-role `<span>`, LUMINAiRY URL and all
surrounding bytes retained.

## Deterministic verifier and calibration

`verify-episode-cast-source-narrowing-tuple.mjs` SHA-256:
`f6a7166a17616b31b063ecd3a6c5be9c1aba11f19869776505d484aec76440eb`.

Run from repository root:

```sh
node operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/verify-episode-cast-source-narrowing-tuple.mjs
```

Result: PASS. It binds all four current file hashes, obtains the exact old
cast-image fragments from the bound `HEAD`, reconstructs the four
predecessors, verifies bidirectional reversal, and proves byte-equality of
the surrounding source chunks. Its calibration appends an unrelated title
attribute to the Issue 01 current candidate; the bounded-diff proof rejects it
with `bytes before each intended replacement differ`.

## Limits

The reconstruction proves the narrow source transaction but cannot certify
the historical timing of any unrelated page work already present in both
sides. That is intentional: it is the evidence required to separate this
ten-substitution repair from those other changes. It does not independently
approve the current issue pages, active assets, CSS mobile layout, builder
closure, Screening Room media, deployment, release, or public delivery.
