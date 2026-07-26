# Post Office service-truth Repair 2 — maker evidence

**Date:** 2026-07-26  
**Status:** **BUILT AND VERIFIED LOCALLY — independent Repair 2 rejudge required**  
**Scope:** the duplicate/ambiguous published-archive P1 only  
**Public/provider mutations:** none

## Preserved judgment

`independent-rejudge-service-truth-repair-1-2026-07-26.md` remains the
authoritative bounded Repair 1 decision:

```text
PASS · 87/100
Product 18 · Trust/privacy 18 · Brand 18
```

Repair 2 closes only its collection-level duplicate finding. It does not
rewrite or supersede that report and does not claim product promotion.

## Exact repair

Before replacing any archive DOM, `content/site/post-office.js` now:

1. filters the published collection;
2. validates every published row and canonical local path;
3. requires `episode.number` to be a positive integer number;
4. requires every episode number to be unique;
5. canonicalizes each admitted issue URL through the Repair 1 path gate;
6. requires every canonical issue URL to be unique;
7. sorts only the fully validated admitted records; and
8. renders only after the whole collection passes.

Any duplicate, ambiguous or malformed published row throws before
`archive.replaceChildren()` and before any `src` or `href` assignment.

The failure state now includes a visible **Retry the archive check** button.
Retry reruns the same full validation; a repeated failure remains whole-drawer
fail-closed and leaves Retry available.

## Expanded hostile collection matrix

Source and fresh artifact now test:

1. duplicate episode number with different issue URLs;
2. duplicate canonical issue URL with different episode numbers;
3. slash-normalized duplicate issue URLs (`/issues/...` and `issues/...`);
4. string/number normalization ambiguity (`1` and `"01"`);
5. a case-variant noncanonical issue URL; and
6. one valid row mixed with an attacker-invalid image/issue row.

For every case:

- zero archive cards render;
- zero partial or repeated cards render;
- zero archive links or images are created;
- zero attacker-origin attempts occur;
- the visible Retry action remains available.

The duplicate-number fixture is retried in the browser suite and fails closed
again with zero cards.

All prior Repair 1 protocol-relative, absolute-external, encoded-origin,
backslash, control-character, traversal, unexpected-route, malformed-data,
signature/privacy, newsletter-failure and mobile checks remain.

## Source verification

```text
Post Office local contract: PASS
Post Office browser: PASS · 90 checks
External attempts blocked by deterministic harness: 69
External requests completed: 0
Attacker-origin attempts from hostile archive fixtures: 0
Inline JavaScript: PASS · 352 scripts / 132 pages
Local links: PASS · 1,966 references / 110 pages
Town consistency: PASS
Product steward checker: PASS · 65 products
```

The 69 blocked attempts include ordinary denied third-party dependencies from
the tested pages. The hostile archive fixtures themselves attempted no
attacker-origin request.

## Fresh exact artifact

```text
Path: /tmp/laidies-post-office-r2-maker.ZHi4Yj
Builder: 1,082 files / 959.58 MiB
Builder warning: artifact exceeds 750 MiB
Public metadata validator: PASS
Artifact local contract: PASS
Artifact browser: PASS · 90 checks
External attempts blocked: 69
External requests completed: 0
Attacker-origin archive attempts: 0
Source/artifact runtime byte parity: PASS
```

Matching source/artifact SHA-256:

| Runtime file | SHA-256 |
|---|---|
| `content/site/post-office.js` | `bf76de59f1a61f76ecf055599d181969e9fc279eafeedc7f6556e5f4c876462a` |
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `058a55537782f0082c141d602cf520c6b87f13b44e383d33e5e1e8d9cc0b8dfd` |

## Independent Repair 2 rejudge contract

The independent judge should:

1. preserve the Repair 1 87/100 PASS and test only this P1 closure;
2. inspect the exact collection-validation order;
3. independently attack duplicate numeric identities, duplicate canonical
   issue URLs, slash normalization, case variants and mixed valid/invalid rows;
4. confirm zero cards, links, images, partial DOM and attacker attempts;
5. exercise Retry and prove another invalid response remains fail-closed;
6. rerun the complete 90-check source suite;
7. build a new exact artifact and rerun the same 90 checks;
8. reproduce byte parity and current hashes; and
9. retain every provider/native/owner/public hold.

## Preserved holds

- Buttondown provider acceptance, confirmation, duplicates, unsubscribe,
  delivery and failure receipts;
- Supabase magic-link and session lifecycle;
- Clarity masking and actual provider payload/legacy-query retention;
- native Safari, VoiceOver, TalkBack, zoom/reflow and real mobile sharing;
- owner visual approval;
- referral/reward lifecycle;
- the 959.58 MiB artifact-size warning;
- deployment and public-origin verification.

No sign-in, subscription, email delivery, postcard delivery/open, account,
reward or public-live claim is accepted by this evidence.

## Learning scan

**Failure:** valid individual rows were treated as a valid collection.

**Prevention rule:** validate collection identity and uniqueness before any DOM
or network-capable property assignment. Test exact duplicates, normalized
duplicates and valid/invalid mixtures.

**Behind the Build angle:** “Every postcard was valid. Two belonged in the
same slot.”

The parent release owner should reconcile this rule into the canonical
pain-points ledger. This bounded repair did not edit it.
