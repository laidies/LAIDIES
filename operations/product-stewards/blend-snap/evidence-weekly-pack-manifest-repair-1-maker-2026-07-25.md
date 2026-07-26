# Blend & Snap weekly-pack repair 1 — maker evidence

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — READY FOR INDEPENDENT RE-JUDGE  
**Release status:** FIX BEFORE LAUNCH  
**Authority limit:** maker evidence; not product, brand, accessibility, visual
or release approval

## Bounded repair outcome

This repair addresses the independent judge's P0 trust/brand contradictions
without replacing or generating visual assets:

- the existing corkboard image is preserved, but its stale embedded “new every
  Wednesday · cards included” flyer is covered in rendered source by an
  opaque, focusable Study Pack note: “Availability checked before every order”;
- static café loading/metadata copy no longer implies a guaranteed weekly pack;
- each manifest component now has a visitor-facing `publicNote`; internal
  evidence remains available for stewardship but is never rendered as public
  unavailable-state copy;
- held card labels now say “Cards are not available yet” rather than exposing
  collection-authority repair language;
- the Welcome Tour and town directory describe the episode-specific,
  availability-governed menu;
- Episode 01–04 Study Pack rails say “Availability checked at the café” rather
  than advertising Cards; and
- the charter now matches implementation: the device-local navigation proxy is
  written when the receipt/menu opens, not when an issue link opens.

No queue, Git, deploy, publication, external service, credential or visual
asset was changed.

## Exact source identity

```text
08de97e35346a012acb9fd36a443afa40237861a975ae5818daac85ee00398de  blend-snap.html
4fca1c36058133ef39196d0d34a72c104af25163afd9ad32757e56655333cdde  content/blend-snap-weekly-packs.json
20f00850a4d6cdd460a9e5bdd36ce43c9bd897af6c94ddacd393a19756c0ee7e  content/site/sv-welcome-tour.js
12661e58bc52646b16002ecbe34e739588c559a3c698eb45bdb18fbbf02195be  content/site/sunnyvaile-directory.js
af7b3bacd267174b0e08dce51e809ad9fc3e3d3cde7d2fe38d5e596a81c69c1f  issues/issue-01.html
f9641c4f32b1c21d1616bef9308cdbe80afb1ebbed6a9ead5ac82ce5c0c5565d  issues/issue-02.html
aac8f9b723e51f862a12206c45e5d4827e47be144e08b9ec470f1f6beefea877  issues/issue-03.html
fdba77bed63e35bb8110931e3687dbc61e07c50bf65ab8ffc3bfbedc21a60e88  issues/issue-04.html
1df90186ce1323219be5e8a8e9aef435f63e559bb3e4d6742bf1b885ff92cf60  scripts/validate-blend-snap-packs.mjs
38cd43b71c1b2a5d1dd2097da27ea0fb20d1e7152455ccace0508a8931c8f2c2  scripts/test-blend-snap-cross-entry.mjs
30d020ecd2f78ac0773f1b75fdfb5ec7e8ba5e9cce47dd0aa88a63264819fa93  scripts/test-blend-snap-browser.mjs
cb5933cfb10ad9aa8c6e84b300e33472d27f71521d1305575df5ce6ba3f1d25f  operations/product-stewards/blend-snap/charter.md
```

## Verification

```text
✓ BLEND & SNAP PACKS: schema 1.0.0 · 4 published episode menus ·
  12 available · 3 held · 4 planned · 1 unavailable · fresh through 2026-08-01
✓ BLEND & SNAP CROSS-ENTRY: 51 deterministic checks ·
  café/welcome/directory/episodes/manifest
✓ BLEND & SNAP BROWSER: 59 rendered checks ·
  new/return/storage/index/stale/missing/mobile/keyboard/focus/motion/cross-entry
✓ INLINE JS: 353 scripts parse across 132 live pages.
✓ LOCAL LINKS: 1941 local references resolve across 110 pages.
✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.
PRODUCT STEWARD SYSTEM PASS · products=65 · active=3/3
git diff --check: PASS for the scoped repair candidate
```

The 59-check rendered suite passed twice: once against working source and once
against a fresh curated artifact at
`/tmp/laidies-blend-snap-repair1.5UI0Ry`. That artifact contained 1,076 files
and was 961.34 MiB. The builder warned that it exceeds the project's internal
750 MiB threshold; this repair makes no deployment or release-size decision.

The rendered cross-entry checks prove:

1. the opaque Study Pack correction is the topmost hit target at the stale
   corkboard flyer's centre and exposes the truthful accessible label;
2. public component rows do not expose internal evidence terms;
3. the Welcome Tour renders the four availability states without a weekly/card
   guarantee;
4. the directory renders availability-governed mechanics; and
5. every Episode 01–04 rail renders the exact fail-closed café label.

## Explicit holds

These remain external or owner evidence and are not claimed by automation:

- native 200% browser zoom;
- VoiceOver;
- Safari;
- newcomer comprehension of the six format jobs and partial Episode 04 pack;
- Ali's visual approval of the existing café art and the accessible correction
  treatment;
- independent product/learning, trust, brand, UX/accessibility and technical
  re-judge;
- exact release approval, deployment and public-origin verification.

The existing painpoint ledger's 2026-07-25 weekly-pack extension already records
the reusable prevention rule: composite products require explicit child
inventory, admission status, freshness ownership and rendered missing/stale
tests. No duplicate painpoint entry was added.
