# Resident Card external capability review

**Date:** 2026-07-26  
**Decision:** no new dependency is needed for the device-local P0.

## Consider later for authenticated identity

### Existing Supabase Auth + Postgres RLS — retain, staging only

Supabase distinguishes authentication from authorization and integrates Auth
tokens with row-level policies. Its official guidance says exposed-schema
tables require RLS. This fits a future Card only if LAiDIES uses verified
provider identity, least-privilege owner policies and a deliberately restricted
public projection.

- Official Auth guide: https://supabase.com/docs/guides/auth
- Official RLS guide:
  https://supabase.com/docs/guides/database/postgres/row-level-security
- Decision: **retain as the leading existing option; do not activate from this
  packet.**
- Gate: isolated staging, privacy/data map, non-enumeration, session/logout/
  revoke/delete and two-device tests.

### Playwright — retain for deterministic journey checks

The repository already uses Playwright for browser-level product evidence. It
is appropriate for empty/saved/corrupt/blocked-storage and cross-product
identity fixtures.

- Official docs: https://playwright.dev/docs/intro
- Decision: **retain.**

### axe-core integration — evaluate after native baseline

Automated accessibility rules can widen regression coverage, but they do not
replace keyboard, zoom, Safari or VoiceOver evidence.

- Official Playwright accessibility guidance:
  https://playwright.dev/docs/accessibility-testing
- Decision: **evaluate for the shared accessibility guild, not add a
  Resident-Card-only dependency.**

## Decline now

- A second authentication provider or identity plugin: adds migration,
  privacy, session and support complexity before the current Supabase contract
  is accepted.
- A customer-data/profile enrichment plugin: unnecessary personal-data growth.
- A gamification/reward SDK: would blur separate product ledgers and identity.
- Sentry/session-replay expansion for Card fields: defer until privacy/masking,
  retention and customer-support need are approved.
- IndexedDB wrapper/state framework: the bounded v1 Card is small; a new
  dependency does not improve the current contract.

## Build-vs-buy rule

Buy authentication delivery and durable storage only after the identity model
is approved; keep LAiDIES-specific Card projection, consent, public-field
selection, reward boundaries and recovery semantics product-owned.
