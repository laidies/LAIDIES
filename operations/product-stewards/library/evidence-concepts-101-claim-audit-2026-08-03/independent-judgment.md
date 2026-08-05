# Concepts 101 minimum successor — independent judgment

**Verdict: PASS — bounded accuracy and teaching successor.**

Judged 2026-08-03 (America/Vancouver). This verdict accepts only the exact
Concepts 101 correction below. The book remains `HOLD`; this is not owner
admission, reader/accessibility acceptance, deployment or publication
authority.

## Exact identity

- original audit `audit.md`: `40400c77d86fb75625a3b32ff61c02969658f2ec9b04567dbe6dc3e6b1ebeafe`
- updated maker receipt `maker-receipt.md`: `c9e5ede8057b008d2372b8aba7725179d78c9dc7d56149d21d35ef199c72e306`
- predecessor `HEAD:content/library-books/rendered/concepts-101.html`: `c257317c3171647632d677f99deabd85dbcb6b1086f2d87898e948cbe3e80c8c`
- first judged successor: `a4c8747ebdbba2380ff228cab48a6f5f2afd042b9385d63436189be2d934aec9`
- minimum successor `content/library-books/rendered/concepts-101.html`: `c4acc59294a000a6505552dc7389115136b15077686ce37a229ed78b562da498`
- claims ledger `content/library-books/concepts-101.claims.json`: `7f9b48ef24e1e76b58c88ef514fa34951afe67cceca97b937551a0866534f750`
- validator `scripts/check-concepts-101-claims.mjs`: `cee84ce8b0743fddc1f863f3353b29f69a62c98c4e7b435a8aa494c0b47258c7`

## Independent result

The prior sole blocker is absent. The unsupported new bullet claiming that
post-training uses feedback to shape product behaviour has been removed from
the rendered book and is not present in the claims ledger.

Byte-level scope proof: reinserting that exact one-line bullet into the minimum
successor produces SHA-256
`a4c8747ebdbba2380ff228cab48a6f5f2afd042b9385d63436189be2d934aec9`,
the exact first successor previously judged. Therefore the successor changes
no other teaching bytes.

The earlier independent source review remains applicable to the unchanged
teaching. All nine audit repair groups remain substantively resolved; the
17-term quick-reference consolidation and the useful fashion-house,
*Sex and the City*, Cher's closet, rehearsal-studio, Watcher/Elle and
chalkboard analogies remain intact. The corrected ledger binds the exact
minimum-successor hash, exact audit hash, direct sources, limitations,
currentness triggers and quick-reference propagation. The unchanged validator
checks the current tuple and retains its fail-closed rules.

## Current checks

PASS:

- `node scripts/check-product-stewards.mjs --owner-entry library`
- `node scripts/check-concepts-101-claims.mjs` (`claims=6`, `sources=8`,
  `currentness=3`, `propagations=4`, exact successor hash, status `HOLD`)
- `node scripts/check-library-vocab-concepts-consolidation.mjs` (`terms=17`,
  shelf `THE_101s`)
- `node scripts/validate-library-product.mjs` (`books=15`, `hold=8`,
  `preview=7`, `available=0`)
- `node --check scripts/check-concepts-101-claims.mjs`
- targeted `git diff --check`

The prior five adversarial validator attacks remain applicable because the
validator is byte-identical: changed rendered bytes, missing source IDs,
missing freshness triggers, unpropagated quick-reference wording and forbidden
stale wording all fail closed.

## Separate current-workspace limitation

`node scripts/test-library-product.cjs` does not currently complete against the
shared dirty Library build: it times out waiting for `.shelf-tab`. Independent
inspection shows the concurrently edited `library.html` no longer renders
`.shelf-tab`, while the concurrently edited test still expects three such
controls. This mismatch is outside the Concepts HTML/claims change and cannot
have been caused by removing the one book-body bullet. This bounded Concepts
PASS therefore does not claim a whole-Library integration PASS; that active
Library page/test mismatch must be resolved and rerun by its owning lane.

No content, release/admission state, provider configuration, credentials,
deployment, publication, runtime control, registry or dispatcher state was
changed by this judgment.
