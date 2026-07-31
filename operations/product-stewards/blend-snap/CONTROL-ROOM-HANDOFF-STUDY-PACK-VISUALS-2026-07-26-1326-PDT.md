# Control Room handoff — Blend & Snap Study Pack visuals

**Product/task:** `blend-snap` / expanded Episodes 01–04 Study Pack visual
coordination  
**Canonical status:** **SPECIFIED / IDLE-QUEUED**  
**Evidence time:** 2026-07-26 13:26:27 PDT

## Exact completed action

Reconciled every released episode across Study Sheet, Try-On, Cheat
Sheet/printable, concept/character Cards, Quiz handoff, café menu,
receipt/pickup, episode return, mobile, print and accessibility. Produced the
complete USE/ADAPT/REPLACE/MISSING inventory, reusable weekly geometry and
atomic receiver contract, executable owner/build/test sequence, and a
checksum-bound Episodes 01–04 producer receipt.

This is a material specification result, not visible product progress. No
implementation task or integration lock is live, so the durable owner is not
`RUNNING`.

## Evidence and tests

- `STUDY-PACK-VISUAL-INVENTORY-EP01-04-2026-07-26.md`
  (`9f4426972dee27dffae6083d41012a650736e38e21bb7d32461b5913edb206c6`)
- `STUDY-PACK-WEEKLY-VISUAL-KIT-AND-BUILD-PACKET-2026-07-26.md`
  (`65c6c1af400a460264c6996795ccb39b6ab9617bea9ec44eb3339476fd0b2347`)
- `episode-01-04-study-pack-source-receiver-receipt-2026-07-26.json`
  (`c8746e45fbdbf0bc0d880d486e7c97e0c893fbf58e48804ffa92d1e26d1e5998`)
- `LEARNING-SCAN-STUDY-PACK-VISUALS-2026-07-26.md`
  (`6228f7376fcf91fbd9b0c6a87396c9a53dc3db9a90a1b25f4a859ca12c8163f5`)

Passed:

- `jq empty` on state and receiver receipt;
- `node scripts/check-product-stewards.mjs --owner-entry blend-snap`;
- `node scripts/check-product-stewards.mjs`;
- `node scripts/validate-blend-snap-packs.mjs`;
- `node scripts/test-blend-snap-cross-entry.mjs` — 54 checks;
- `git diff --check -- operations/product-stewards/blend-snap`;
- champion status confirms `town-entry-homepage` is the sole ACTIVE product and
  `blend-snap` is NEXT/queued.

## Observed versus unproved

Observed:

- four Study Sheets are missing;
- Episode 01 Try-On currently performs Episode 02's briefing job;
- all Try-On returns discard `from=blend-snap` and go to `/`;
- Quiz has no episode-bound receiver/handback;
- print proof sizes vary and Episode 04 has four preview PNGs against current
  two-page HTML;
- Cards remain held/unavailable and current imagery is not a complete deck;
- existing café candidate evidence proves neutral functional geometry only.

Unproved:

- final Study Pack visual direction;
- four complete Study Sheets;
- exact component-owner acceptance;
- native VoiceOver/Safari/200% proof;
- card grant/open/persistence/Closet;
- integrated or public result.

## Files, locks and dependencies

Changed only
`operations/product-stewards/blend-snap/**`. No live/shared route, global
style, component source, manifest, reward, identity or service file changed.
No integration lock was held or used.

Consumed:

- Weekly Episodes source contract SHA
  `baaa31f586cfbb080c3cfde3c3e80b2c322483e05bc1e6c946db80b058102e13`;
- Episodes 01–04 producer backfill SHA
  `3ad7af03076594fb0535d0c2f0d69eb51846798c0b952f84ff4699054ff82c91`.

Affected downstream owners: Episode Experience, Study Pack/Learning,
Try-On, printables/content, Trading Cards, SUNNYVAiLE High, Brand &
Experience, Platform/Closet and release.

## Acceptance and next trigger

Acceptance owners:

- Episode/Learning for canonical lesson and four Study Sheet candidates;
- Try-On for the Episode 01 repair and origin-preserving return;
- print/content for normalized reference artifacts;
- Trading Cards/Platform for card product and ownership;
- High for episode-bound assessment receiving/handback;
- independent product/learning, trust, accessibility, technical and Brand
  judges;
- Ali for the sitewide Brand direction; Control Room for exact locks/release.

Exact next trigger:

1. Ali selects the sitewide Brand direction and rules KEEP/ADAPT/REJECT on the
   inventoried visual inputs.
2. Control Room assigns an isolated Study Pack candidate path and named
   affected-owner locks.
3. Maker executes Stage 1/2 of the build packet; no live/shared integration is
   required for that first candidate.

Episode 05 remains pre-Gate 1 and has no Study Pack handoff.

## Authority truth

No public action, deployment, publication, spend, external commission, shared
integration or Ali approval authority was used. Component availability and
the public manifest remain unchanged.

