# Owner handoff — selected-song music-video pilot

**Status:** CAPTURED — HANDOFF PREPARED  
**Product/system ID:** `idea-inbox`  
**Owner task ID:** `019f9f81-5da6-73a3-a1aa-0272a93ec821`  
**Evidence time:** 2026-07-26 12:17:48 PDT (America/Vancouver)  
**Recipients:** Control Room; KSVL champion  
**Acceptance owners:** KSVL champion for catalogue/pilot fit; destination
product owner; Brand & Experience for visual direction; Episode Media Quality
for independent media acceptance; Ali for song/taste/public-identity choice

## Exact bounded action completed

Captured Ali's idea—“music videos for some of the songs”—and reconciled it
against the current product tree and historical project records. Prepared a
selective one-song pilot route without selecting a song, specifying a video,
starting production or changing launch priority.

## Observed result

- KSVL already owns 29 creator-confirmed LAiDIES original tracks and their
  listening/catalogue contract.
- An older site-map queue already parks a THE LAiDIES live-show video for
  Bronze AiGE and a “Wednesday in SUNNYVAiLE” tour video.
- A prior Deb music-video attempt is recorded as paused because the Sondo
  editing experience was painful.
- Current episode-media rules reject generic third-party visual style and weak
  slideshow substitutes.
- No current record chooses the first song, narrative treatment, destination,
  production tool, budget or release.

## Inference and recommendation

**Recommendation: `MERGE`.** Treat this as a selective KSVL visual-extension
program, not a new product and not a 29-video commitment. Choose one pilot only
after the candidate track and destination are admitted. A town/character song
routes through KSVL plus its destination building. An episode song also routes
through the Weekly Episode Engine. Episode Media Quality judges the exact
finished candidate.

This is a recommendation, not an accepted product-backlog mutation.

## Evidence paths and tests

- `operations/product-stewards/idea-inbox/routing-receipts.md`
  (`IIR-20260726-001`)
- `operations/product-stewards/idea-inbox/backlog.md`
- `operations/sunnyvaile-site-map-status.md`
- `operations/research/_learn-memory-digest.md`
- `operations/product-stewards/ksvl/CHARTER.md`
- `operations/product-stewards/ksvl/OPERATING-SPEC.md`
- `operations/product-stewards/ksvl/state.json`
- `operations/product-stewards/ksvl/backlog.md`
- `operations/product-stewards/episode-experience/OPERATING-SPEC.md`
- `operations/product-stewards/episode-media-quality/OPERATING-SPEC.md`

Preflight:

```text
node scripts/check-product-stewards.mjs --owner-entry idea-inbox
PASS
node scripts/check-product-stewards.mjs --owner-entry ksvl
PASS
```

## Files, locks and dependencies

- **Files changed by Idea Inbox:** only
  `operations/product-stewards/idea-inbox/**`.
- **Lock held:** Idea Inbox dossier only.
- **Read-only dependencies consumed:** KSVL, Weekly Episode Engine, Episode
  Media Quality, registry/run queue, active work, historical site-map and
  memory records.
- **Downstream owners affected:** KSVL; destination building (likely Bronze
  AiGE for a house-band performance); Weekly Episode Engine and Chick Flicks
  for episode-song use; Brand & Experience; Episode Media Quality; Audience &
  Growth only after admission.
- **Collision boundary:** no edits to KSVL/audio, episode, Brand, building,
  media-quality, audience, shared backlog, registry, run queue, ledger or
  active-work sources.

## Remaining acceptance proof

Before a build packet:

1. KSVL accepts, adjusts or declines the routed idea.
2. Ali and KSVL select one pilot song.
3. The exact audio master, as-recorded words, rights/provenance and destination
   are admitted.
4. The destination owner defines the video's user/product job.
5. Brand & Experience supplies or approves the governing visual grammar.
6. The build packet compares credible treatments, production/editing burden,
   accessibility, rights, cost and rollback.
7. A maker and independent media judge remain separate.

## Next trigger

KSVL's next suitable owner review after one pilot candidate can be named with
an admitted exact master and destination. Do not wait for all 29 songs and do
not reopen the painful Deb workflow by default.

## Authority truth

- **Public/publish:** not used; nothing published.
- **Deploy:** not used; nothing deployed.
- **Spend/subscription/tool:** not used or authorized. Historical Sora/Sondo
  mentions are not current tool approval.
- **Ali authority:** no selection or approval inferred. Ali retains the
  consequential song, creative/taste and public-identity decision.
- **Implementation:** none. Status remains `CAPTURED`.
