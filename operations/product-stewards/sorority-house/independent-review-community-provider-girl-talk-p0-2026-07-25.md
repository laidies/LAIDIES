# Independent judge — Delta LAi Nu community provider + Girl Talk P0

**Date:** 2026-07-25  
**Judge:** independent product/trust/brand/UX/technical reviewer; not the maker  
**Candidate verdict:** **HOLD — REJECT THIS P0 CANDIDATE FOR RELAUNCH**  
**Authority:** source, fresh exact artifact and synthetic local browser evidence only  
**External actions:** none; no provider mutation, post, sign-in, report, moderation action, credential access, deployment, Git action or publication

## Noncompensable score

| Gate | Score | Floor | Verdict |
| --- | ---: | ---: | --- |
| Product quality and useful completion | **15/20** | 17 | **FAIL** |
| Accuracy, privacy, safety and trust | **14/20** | 17 | **FAIL** |
| Positive LAiDIES brand contribution | **16/20** | 17 | **FAIL** |
| UX and accessibility | **14/20** | 17 | **FAIL** |
| Technical and exact-artifact reliability | **17/20** | 17 | PASS |
| **Total** | **76/100** | — | **HOLD** |

No total can compensate for a failed product, trust, brand or accessibility
floor.

## What independently passes

- All four wings are present and keyboard-operable. Their destination counts
  are `3 + 3 + 3 + 2 = 11`; no Resident Card is required for discovery.
- A browser-local `laidies_card_username` only personalizes arrival. Public
  copy explicitly says it is not Hyvor sign-in, community identity, post
  signature or cross-device proof.
- The house embed and all seven discussion pages import
  `content/site/community-room.js`; none eagerly imports the Hyvor module.
- Every direct provider page rendered the synthetic `unavailable` state with
  the sensitive-sharing warning and **zero** Hyvor attempts.
- Local preview and an unsupported hostile hostname made **zero** provider
  attempts. The hostile host rendered `unsupported-host`.
- On an `laidies.ai` hostname mapped to the local server, forged public fixture
  globals requesting `signed-out` were ignored. The approved-host code attempted
  the provider once and fell to `unavailable` when the intercepted script
  failed. Test globals therefore cannot self-assert a production provider
  outcome.
- Synthetic `signed-out`, `held` and `unavailable` states distinguish provider
  control and make no receipt, acceptance, publication, moderation, reply or
  reward claim.
- The direct-room Weekly Bag return passed:
  `../this-week.html?issue=4&bag=open&group=connect`.
- Girl Talk is open without a Resident gate. Its top-level explanation says
  private reflection, honour-system device-local markers, optional sanitized
  sharing, storage limits, and no Closet/member reward/FAiRY allowance.
- Denied storage withholds “local sticker marked”; no legacy community,
  Closet, reward or FAiRY allowance key is written.
- Maker suites independently reproduced on the exact artifact:
  source contract **PASS 44**, browser **PASS 40**, external attempts **0**,
  inline JavaScript **PASS 352/132**, local links **PASS 1,975/110**,
  town contract **PASS**, product stewards **PASS**, public metadata validator
  **PASS**, scoped diff check **PASS**.
- The candidate has no 320px overflow in the tested house and Girl Talk
  journeys, passes the maker reflow proxies, removes the tested transitions
  under reduced motion and gives the provider state a measured contrast ratio
  above 4.5:1.

## P0 failures

### P0-1 — Four destinations display one room while the URL names another

`openRoom()` returns before `history.pushState()` for every `embed: false`
destination. Those are:

- Chat Room Digest;
- Comment Card;
- Your Closet; and
- Dare Reports / Girl Talk.

Independent rendered evidence:

- selecting **Comment Card** displayed “Comment Card” while the URL remained
  `#room-mix-cd-exchange`;
- selecting the **Your Room** wing displayed “Your Closet” while the same stale
  `#room-mix-cd-exchange` remained.

This breaks direct-state truth, browser Back/Forward, copy/paste URLs and the
operating-spec return contract for four of eleven destinations. The maker
suite tested Back only through embedded `wins`, so it missed the branch.

**Required acceptance:** every room selection writes its own hash before any
embed/non-embed branch returns; Back and Forward must restore all eleven
destinations in source and exact artifact.

### P0-2 — “Versioned envelope” accepts forged and structurally invalid state

`readState()` checks only `version === 1`, three array types and that `names` is
an object. It accepts unknown IDs, duplicate IDs, extra properties, incoherent
cross-fields, unbounded arrays and arbitrary names as authoritative local
counts.

Injected exact-artifact fixture:

```json
{"version":1,"stickers":["NOT_A_CARD"],"dares":[],"penalties":[],"names":{"NOT_A_CARD":"forged"},"extra":"accepted"}
```

Girl Talk rendered **1 local sticker** and retained the bytes. That is not a
strict versioned envelope and lets arbitrary browser data become visible
progress.

**Required acceptance:** exact schema and allowed-ID validation, bounded and
deduplicated arrays, coherent dare/sticker/penalty relationships, no unknown
or extra fields, safe names derived from the canonical catalogue rather than
stored input, corrupt-record recovery copy, and adversarial reload tests.

### P0-3 — Keyboard focus is discarded whenever the action panel redraws

After “Draw a card,” `setActions()` replaces the focused Draw button through
`innerHTML`. Exact-artifact evidence showed `document.activeElement === BODY`.
The same replacement pattern follows honour/penalty actions. The new card and
actions may be visible, but a keyboard or screen-reader user loses her
interaction position and the live announcement does not provide a dependable
next control.

**Required acceptance:** keep a stable action region, move focus deliberately
to the card heading or first new action after the live update, retain visible
focus, and test draw → answer/dare → result → draw-again entirely by keyboard.

### P0-4 — Card-level sharing language contradicts the private/optional safety promise

The global instructions say sharing is optional and sanitized, but the
rendered card uses `Post in …`, and many cards say “Post proof,” “Post it,” or
imperatively “Share…” without the optional/sanitized boundary at the decision
point. More seriously:

- T10 says “Take three real emails to FAiRY GODMOTHER”;
- T17 says “Drop” the email drafted in the visitor's head on FAiRY;
- D16 asks AI to reply to “the most annoying email in your inbox”;
- D23 asks AI to infer subtext from a received email;
- D21 says “Post before and after.”

The comment above the catalogue is not user-facing protection. “Real emails”
directly conflicts with the instruction never to paste confidential work,
private messages or another person's information. A general warning cannot
repair a later, more specific unsafe imperative.

**Required acceptance:** review all 53 cards at the card level. Every external
AI/community route must say optional, use synthetic/redacted content, forbid
uploading real emails or private work, and provide an equally useful private
completion. Add deterministic content lint and rendered fixtures for every
sensitive-data/share verb.

### P0-5 — The external provider privacy boundary is named but not usable

The controller links only to LAiDIES privacy. That page does not mention
Hyvor, what community data Hyvor receives, its privacy/terms/community rules,
retention/deletion route or reporting relationship. The room says Hyvor owns
sign-in/publication/moderation but gives no Hyvor privacy or rules link.

This fails the operating specification's statement that Hyvor's privacy and
community rules apply and the pre-participation external-privacy gate.

**Required acceptance:** at every provider decision point, link the current
Hyvor privacy/terms/community or moderation information, explain the LAiDIES
versus provider responsibility boundary, and reconcile LAiDIES privacy,
deletion/reporting and retention language before live promotion. Exact legal
wording needs the responsible owner, not an invented judge rewrite.

## P1 / release holds

- `sitemap.xml` lists `/games/girl-talk` but not the Sorority House building.
  The generic metadata validator passes without testing canonical product
  coverage.
- The approved Hyvor website ID `15519` and seven page IDs are consistent in
  source and the historical setup note, but this judge did not access the
  provider account or prove production configuration.
- “Ready” means only that the custom element was defined, not that a thread,
  signed-in state or usable provider UI rendered. Public copy correctly avoids
  treating it as a receipt, but controlled provider evidence remains required.
- No named human moderation, retention/deletion, report/escalation, appeal or
  incident operation was proven.
- No Safari, VoiceOver, native zoom, physical-device, human newcomer
  comprehension, Girl Talk usefulness, owner visual/community approval,
  privacy-safe analytics, deployment or public-origin evidence exists.
- The artifact remains above the builder advisory threshold.

## Exact candidate evidence

Fresh artifact:

- path: `/tmp/laidies-sorority-judge.6E0RmO`
- builder result: **1,085 files / 961.48 MiB**
- missing dependencies: **0**
- oversized individual assets: **0**
- advisory: exceeds **750 MiB**
- governed source/artifact byte parity: **PASS, 13 files**

| Governed file | SHA-256 |
| --- | --- |
| `sorority-house.html` | `350be1c0f055a61fed0db9299e57a4408b6883ab6651e0838f25a4b3fcfdde79` |
| `content/site/sorority-house-v2.js` | `28eef0828cc6a3e7a840f638645d5f3af9d9ad96ebf0e5ed60897c37d0f88f1d` |
| `content/sorority-house-v2.css` | `c150869cb9069bf0eaf76516ceb6f27fbaf65d30be22f365f9355d17d8ad46ce` |
| `content/site/community-room.js` | `5dca9ee8628b3141bf41622d1bbf665691ef36d259d690c89e13c69c756e588c` |
| `content/community-room-v2.css` | `b6182b00e64f0820dd1f805256960b1b5a03287b9bd1769b2eb9a6e5e45eff03` |
| `games/girl-talk.html` | `d613ef886c7fc4c99e33130b6976b8e464bda46ef88143948c7330fe2144a067` |

## Final ruling

The provider boundary itself is a meaningful improvement and passes the
bounded local/unsupported-host tests. The candidate nevertheless cannot be
accepted as relaunch P0 because the complete product journey is not truthful
or keyboard-stable across all branches, the local envelope is not strict, and
several Girl Talk cards reverse the privacy promise at the moment of action.

Repair the five P0s, extend tests over the missed branches and submit a new
exact candidate for independent rejudge. Real provider/moderation, human,
native accessibility, owner and public release gates remain separate holds
after local acceptance.

## Learning scan

Reused BTB-069, BTB-105, BTB-109, BTB-110 and BTB-111. New reusable judge
lesson: branch-complete tests must cover every destination class, and
high-level privacy copy must be adversarially compared with every later
card-level instruction. No central learning file was edited because this
assignment authorized one independent report only.
