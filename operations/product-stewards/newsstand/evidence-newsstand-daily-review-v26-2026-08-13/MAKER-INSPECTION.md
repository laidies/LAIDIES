# NewsStand Daily v26 local maker inspection

**Inspected:** 2026-08-13 11:29 PDT
**Status:** `READY_FOR_ROLE_DISTINCT_VISUAL_REVIEW`
**Scope:** self-hosted-font successor to rejected deployed v25; private direction only

## Repair under inspection

The exact deployed v25 preview rendered with fallback fonts even though its
local screenshots used Anton and Jost. V26 removes the runtime Google Fonts
dependency, stores the exact latin WOFF2 files inside the repository, preloads
the two primary faces and uses `font-display: block` so a fallback-font capture
cannot silently pass.

The browser ran with `fonts.googleapis.com` and `fonts.gstatic.com` mapped to
failure. It still loaded one exact Anton face, upright and italic Jost from
`/assets/fonts/newsstand/`, and passed 252 rendered checks. The curated public
artifact contains all three exact font files and no Google Fonts URL.

## Exact font files

- `assets/fonts/newsstand/anton-latin.woff2` — `d0fa07ff63dd60cbc0e2f58e29c802dca2a5ae0276c999f59c6111ab7bbaec3b`
- `assets/fonts/newsstand/jost-normal-latin.woff2` — `7726a5cd6f3c0e876c028ea2a643d45f7aad4b0f164b70966c669f4a4668f4b9`
- `assets/fonts/newsstand/jost-italic-latin.woff2` — `0cadc07f42c10553256ae8fd50fe5eb8b09afe79443f68f50a977fdfc8d25ea8`

## Artifact-first inspection

| State | 1440 | 390 | 320 |
|---|---|---|---|
| Complete page | `dad9675399851accb9252b219e35c2b3a38041939fed978c645fd83165d2d66d` | `d3e357f47d77cad0be9c35385d855d2a4302e3ec91c904e5ec649b7cc828932f` | `9422797fd9131478b61c5db82cd2f5e33cd958da5f4b453c3f8be72dc9f8b0ac` |
| Daily front | `52b5f1db2c26b1a2d621201771f38988d917c27aac7a3dbdf136d37fe1f87ff5` | `7e262b1666845d39ce243ddfda50744640d5a333548d038fbf4bea302b8bface` | `e15d4b3bccb35ede6ed8679391cc1ba8a27fb96fca698d6a82a864f4606e4398` |
| Full article | `1d95ee038bac9a6968b7d0c9b03fc7a9430a4e4c08c30b3f9d2cd240b566e715` | `ddae146ff77ebe13c88f40fd5b541539379262cbf2db3eee3e7a42709ef51fde` | `467ce2a3daf6b20a03195d9c3b84ed571d2069ce5f9bbf21116a214952048a9d` |

I opened all nine images at original resolution. The intended condensed display
headlines are present at every width, including the Daily lead, all four service
desks and article section heads. No clipping, overlap, horizontal page overflow,
missing desk, mobile vertical-card stack or continuous-page regression was
found. The mobile partial-next-card treatment remains explicitly labelled
`Swipe for all four`.

V26 changes only font delivery and the resulting deterministic mobile line
breaks; the story, service prose, Daily hierarchy, article sequence and
navigation remain the reviewed v25 direction. This maker inspection does not
admit the candidate or authorize deployment.
