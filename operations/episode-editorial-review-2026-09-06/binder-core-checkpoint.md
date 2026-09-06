# Episode binder core: integration checkpoint

6 September 2026. Local implementation only. No live migration, account session, public release or finished Closet UI is claimed.

The private binder uses the existing Resident account identity and a separate account-owned document. It does not extend the older automatically synchronized continuation document or scrape local browser history. Writes are explicit. The storage currently supports versioned pack references, exercise drafts, trading-card references with Puffy placements, and quiz attempts. The database grants authenticated callers only owner-scoped functions; direct table access is revoked.

Maker/client checks and an independent recheck passed for this bounded core. The foreground PostgreSQL test runs the actual migration in PGlite with synthetic identities, then runs the actual browser helper against that database. This catches named RPC mismatches and JSONB reordering that earlier mocks missed. The test also exercises role/owner isolation, stale revisions, invalid null/date inputs, explicit deletion, private-data-free mutation receipts, and a save that persists but loses its response. Retry retains one quiz attempt. Client checks require UUID mutation keys before any RPC, cap pending operations at 32 without eviction and clear them on owner change.

Commands:

```sh
node scripts/test-resident-episode-binder-v1.mjs
EPISODE_BINDER_PGLITE_MODULE=/tmp/laidies-episode-binder-sql-test/node_modules/@electric-sql/pglite/dist/index.js node scripts/test-resident-episode-binder-sql.mjs
```

PGlite is an isolated temporary dependency, not a production dependency. The module may instead be installed in the verification environment and resolved normally. The database tests do not prove deployed PostgREST, sign-in, cross-device restoration or real concurrent network sessions.

## Remaining required work

The current exercise input schema covers the initial Episode01 comparison fields, but the restored prototype has additional per-product notes, style ratings, model labels and progress selections. Preserve all of them through a bounded versioned field map before integration. Episode02's two prompts, Episode03's evidence checks and Episode04's LUMINAiRY notes also need their own exact fields. Do not squeeze them into misleading provider slots or one opaque text field. This expansion is an implementation requirement under Ali's existing saving instruction, not a new product decision.

Then connect the actual exercise, cards, quiz and Closet binder; preserve in-progress edits through sign-in, failure and return. Verify the full signed-in journey and ownership separation before release. The current independent verdict permits core integration work, not an end-user completion claim.
