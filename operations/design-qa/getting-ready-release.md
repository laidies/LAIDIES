# Getting Ready installation: prepared, not released

## Owned implementation

Source: `/Users/alisoneakin/Projects/laidies-getting-ready-20260906`.
Branch: `art-integration/getting-ready-20260906`.
Approved art SHA256: `06085887508984a498c5de4146d00e07eadeb599314f1c9db2dcb65a57f19295`.
Accessible selector name: **Getting Ready card background**.
Asset, scoped CSS, maker and Closet mapping, shared validator, six consumer cache
references, tests and migration are installed in this source. The separate
`laidies-maikeover-release-20260902` dirty email-code files were not touched.

## Exact candidate

- Directory: `/private/tmp/laidies-getting-ready-candidate-20260906`
- Manifest: `/private/tmp/laidies-getting-ready-candidate-20260906.manifest.json`
- Identity: `05c679ae7324946171603a21466819f5dd90d31552e810df3afe7651b44e966d`
- 759 files, 813567720 bytes.
- Baseline manifest: `/private/tmp/laidies-newsstand-print-ground.manifest.json`
- Baseline identity: `31ae231739527f226742507c152c6a608ab5bd4d3d3b87315972b07a15519b7e`
- Provider checked by release lane: production `127b578d-7036-49a6-8238-9aa682c4f460`, source `fc54ec5eeba4f49122953889adebb0a24870d714`.

Delta: `maikeover.html`, `laidies-card.html`, `resident-card.html`, `library.html`,
`shop.html`, `handbook.html`, `content/site/resident-card-contract-v1.js` changed;
`content/resident-card-getting-ready.css` and
`assets/resident-card/backgrounds/getting-ready-v2.png` added. No removals.
Library/Shop/Handbook/Resident desk changes are cache tokens only.
All unrelated files match the baseline manifest. NewsStand bytes are unchanged.
This is integrity evidence, not release approval or account behavior proof.

The original `/private/tmp/laidies-newsstand-brand-final-20260906` was reused
and mutated by another release lane. Its earlier brand-final manifest FAILED
comparison (unexpected newsstand.html and newsstand-design.css differences).
Do not use that directory as immutable authority. The candidate snapshot matches
the later print-ground manifest outside its explicit delta.

## Checks and honest limitations

- Source shared contract: 54/54; all original finish IDs plus gettingready survive
  parse/serialize/restore. Invalid background, malformed envelopes and unsafe
  portrait fixtures rejected.
- Source cross-surface contract: 33/33.
- Repository commit hook: town, 1949 local references, 294 inline scripts and
  rejection guards pass; hook blocked on the same 45 pre-existing missing Episode3
  art references. Intentional commit-only bypass after scoped checks; no whole-site
  pass claimed and no Episode files changed.
- Candidate shared contract: 53/54. Sole failed check is source-only test asset
  `/assets/brand/laidies-logo-square-pearl-512-v1.png` absent from existing deploy
  inventory. No irrelevant fixture was added to production to green the test.
- Release overlay negative calibration: running it on an already-patched candidate
  rejects before creating an output directory. Initial stale manifest mismatch
  likewise rejected rather than silently widening the delta.
- Browser source: populated synthetic Card and stock portrait restore in maker
  and Closet; both inspected desktop and phone width.
- Browser candidate at port4187: click Getting Ready, enter Test Resident, Save,
  follow See it in my Closet, then return to MAiKEOVER. Both real DOM finish
  attributes were gettingready. Mobile selector and Card inspected at390px.
- Existing base retains old No.____/No.0000 text and six-step maker; unrelated
  unfinished source improvements are deliberately not bundled.
- No Supabase migration executed, no live account saved, no cross-device proof,
  no Pages deployment. Approval of artwork is not proof of these outcomes.

## Resume without rediscovery

1. Restore existing Supabase dashboard authentication. Exact destination:
   `https://supabase.com/dashboard/project/swqnkxzebxdbgyrzpdne/sql/new`.
   Normal GitHub SSO was attempted and also requires login. Never request that
   Ali paste credentials into chat or reset credentials for this task.
2. Read `select pg_get_functiondef('public.resident_card_v1_is_valid(jsonb)'::regprocedure);`.
   Inspect current definition. Execute only
   `supabase/migrations/20260906010000_resident_card_getting_ready.sql`.
   It preserves other live function text, requires exactly one recognized old
   list, tests all seven accepted finishes and one rejected unknown, transactionally.
3. Verify authenticated save and restoration of new finish with an authorized test
   resident, preserving pre-existing data. SQL acceptance alone is insufficient.
4. Fresh-check provider head; if changed from127b578d, obtain exact new base and
   rebuild using `node scripts/prepare-getting-ready-release.mjs BASE NEW_OUTPUT`.
   Generate manifest using `node scripts/create-release-manifest.mjs NEW_OUTPUT MANIFEST`.
   Require exact seven-change/two-add delta, no removals or unrelated changes.
5. Complete artifact-bound visual admission, then existing authorized Pages release
   procedure. Deploy the isolated candidate, never the whole source worktree.
6. Verify actual `https://laidies.ai/maikeover` selector, save/Closet/return after
   release. Report deployment ID, exact input and manifest to coordinating task
   `01a0785e-1438-7161-b041-0be213b06e9b`.
