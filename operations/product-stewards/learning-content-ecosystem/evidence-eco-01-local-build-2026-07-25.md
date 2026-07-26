# ECO-01 Verification Rulebook local build evidence

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE LAUNCH / HOLD  
**Maker:** ECO-01 implementation lane; this record is not independent approval  
**Trigger:** ECO-01/ECO-05 and AW-003; the LIBRAiRY shelf opened thin embedded
copy while a different standalone candidate was indexed as live

## Outcome

One canonical, reproducible Verification Rulebook candidate now exists:

- canonical structured source:
  `content/library-books/verification-rulebook.json`;
- claim/source/freshness ledger:
  `content/library-books/verification-rulebook.claims.json`;
- versioned 18-case evaluation suite:
  `content/library-books/verification-rulebook.evals.v1.json`;
- deterministic renderer:
  `scripts/render-eco01-verification-rulebook.mjs`;
- generated candidate:
  `grimoire/verification-rulebook.html`; and
- fail-closed truth/source/evaluation test:
  `scripts/test-eco01-verification-rulebook.mjs`.

The existing standalone page was reconciled into the canonical source rather
than copied into a second book. Useful incumbent material—the draft/claim
distinction, independent checking, “receipts” language, source-bound prompt
and Episode 3 continuity—was retained and qualified inside the required
seven-chapter mental model.

The generated file declares its canonical source and source SHA-256. It must
not be edited as an independent editorial source.

## Candidate content

The candidate includes:

1. Sort the output.
2. Know what the tool actually did.
3. Frame the claim before searching.
4. Choose and inspect evidence.
5. Run the Receipt Loop.
6. Currentness, media and independent checks.
7. Use, qualify, escalate or stop.

It also includes:

- the mnemonic and mechanism:
  `Frame → Split → Find → Inspect → Cross-check → Decide → Record`;
- eight deterministic, keyboard-native reasoning checks including the opening;
- `SUPPORTED`, `CONTRADICTED`, `UNRESOLVED` and `NOT APPLICABLE` verdicts;
- a claim-matched evidence table and seven source questions;
- a source-bound prompt explicitly labelled a risk-reduction aid, followed by
  the instruction to open sources independently;
- a new-domain transfer challenge;
- a source drawer;
- visible Published, Last reviewed, Next review, What can change and correction
  information;
- a high-stakes boundary that does not present the book as legal, medical,
  financial, HR or safety advice; and
- distinct, truth-labelled ecosystem handoffs.

The claim ledger contains 14 stable claim records with wording, class, risk,
source, support location, version/date, scope, maker reviewer, review trigger,
status and correction history. The evaluation suite has exactly:

- 4 explanation/distinction cases;
- 6 application cases covering source, date, scope, denominator, compound
  claims and provenance;
- 4 misconception-resistance cases; and
- 4 unseen-domain transfer cases.

Each case requires reasoning and a diagnostic evidence action. A binary label
or keyword alone cannot pass.

## Publication truth and failure behaviour

- `library.html` now exposes the exact `how-to-check` record as a non-clickable
  `AFTER REVIEW` preview. It contains no `src`, embedded body or table of
  contents that can masquerade as the book.
- `content/site/site-index.json` now records the exact Rulebook entry as
  `preview`, routes to the LIBRAiRY rather than around the hold, and says it is
  not approved or available.
- The generated direct candidate carries a prominent HOLD notice and
  `noindex,nofollow`.
- The renderer refuses any source that is not schema version 1.0.0, book ID
  `verification-rulebook`, status `HOLD`, seven chapters, complete source
  binding or exactly one keyed answer per chapter.
- The failure test proves a rejected source emits no plausible fallback HTML.

This is a local truth repair, not a deployment or publication.

## Exact candidate identity

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `7c026ea1e7a1d2588dff9c4cc0b5e86cc3384398466208d0c462b3116be8291d` |
| Claim ledger | `bf5f6e9e6348d5f74d44f04aefa1be8e8bec33f8214e03d94ce19a386bfa1c72` |
| Evaluation suite | `cef42255e5e75aa5c566dd6927e0820d797efcf1c333a10a3194b3cffca77af7` |
| Rendered HOLD candidate | `a86a0347785d7f5d86ec7367580bc8ca054c07db45d2671a0767a62999c7ca76` |
| LIBRAiRY shelf | `6fd2d8ccf736113e13d50812504f9ee00000d5ea3c04e7371ed242f2688bbcbd` |
| Miss Jeeves index | `e07fe9a40a24fc6cc6c7397bcc90e7d1ce836c445c1997b26c430b23cc4a48c6` |
| Renderer | `75db5fdd953636f47a5b6f565f552ea46ac50508af5d4c3a6bdc209e9583d89f` |
| Contract test | `c1ec218eee9c15e1f9a97ade77c749c21368423b961497aa9fc283cc199c2889` |

## Local verification

All commands passed after the final deterministic render:

```text
node scripts/render-eco01-verification-rulebook.mjs
  PASS — source SHA-256 bound into generated HTML

node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-inline-js.js
  PASS — 353 inline scripts parse across 132 live pages

node scripts/check-local-links.js
  PASS — 1,939 local references resolve across 110 pages

node scripts/check-town.js
  PASS — canon, titles, links, index, rewards and quizzes agree

node scripts/check-product-stewards.mjs
  PASS — 65 products; active queue 3/3

git diff --check -- <ECO-01 paths>
  PASS
```

The renderer produced byte-identical HTML on a second run before the final
contract tests.

## Accessibility-oriented implementation evidence

The candidate has semantic navigation/main/header/article/section/footer
landmarks, one `h1`, ordered headings, native radio fieldsets, native buttons,
keyboard-operable details, visible focus, polite live feedback, textual table
headers, a text Receipt Loop, reduced-motion handling, print source URLs,
mobile reflow CSS, wrapping URLs and a Clipboard API fallback that selects the
prompt for manual copy.

These are deterministic implementation checks, not a WCAG conformance claim.

## Exact limitations and remaining gates

The status remains **FIX BEFORE LAUNCH / HOLD** because:

1. The maker did not independently approve its own instructional design,
   claim entailment, LAiDIES brand contribution or accessibility.
2. The seven external sources were inherited from the dated, primary/official
   ECO-01 source packet. An independent accuracy reviewer has not opened 100%
   of material sources against the exact candidate wording.
3. The 18 cases pass schema/integrity checks only. They have not been
   independently administered.
4. The required eight-newcomer study has not run; therefore the 7/8
   explanation, application, analogy-limit and transfer floors are unproved.
5. Keyboard-only Chrome, current VoiceOver/Safari, manual contrast/focus,
   200% zoom and 320/390/430/1440 rendered browser checks are not recorded.
6. The correction link is a bounded email draft route, not a complete
   correction intake/triage/resolution service.
7. No analytics, public deployment, exact public-byte binding or public
   journey verification occurred.
8. Dream Phone remains HOLD as an authoritative practice destination; its
   candidate handoff is intentionally non-clickable.
9. The existing Episode 3 route is outside this build lane. Its local link may
   reach the direct candidate, but the candidate itself now announces HOLD.
   Cross-product release integration must be rechecked before approval.

No Library shelf or Miss Jeeves record may change from PREVIEW/HOLD until all
independent floors and release-binding tests in the ECO-01 build packet pass.

## Next action

Dispatch independent instructional/accuracy/brand/accessibility review against
the exact hashes above. Defects return to the maker; passing reviewer reports
still do not establish newcomer transfer, deployment or public verification.
