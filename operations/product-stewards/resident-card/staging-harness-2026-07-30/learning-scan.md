# Learning scan — 2026-07-30

**Result:** qualifying reusable success and one corrected harness-check failure.

- **Reusable success:** a migration checksum manifest makes a local database
  rebuild fail closed when the source chain changes, while preserving the
  migrations as repository-owned inputs rather than silently copying an
  unverified schema.
  **Prevention rule:** every isolated service harness pins and verifies each
  source migration before a destructive local reset.
  **Behind the Build angle:** “A test database is only useful when you can
  prove what code it is testing.”
- **Corrected surprise:** a simple forbidden-command scan matched a safety
  comment containing the forbidden phrase, producing a false failure.
  **Prevention rule:** test for executable command forms and avoid placing a
  forbidden command verbatim in scanned script comments.
  **Behind the Build angle:** “Even a safety check needs a test: the first red
  result was the guardrail proving it was actually awake.”

This record remains inside the harness because the lane's explicit write scope
prohibits edits to the canonical cross-product painpoints ledger. Reconcile it
there when that write boundary is lifted.
