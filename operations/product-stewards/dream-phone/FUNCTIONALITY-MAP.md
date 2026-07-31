# Dream Phone Booth functionality map

**Status:** RECOVERED — COMPLETE FOR OBSERVED CURRENT TREE; INTENDED MODEL
REMAINS OWNER-DECISION BLOCKED  
**As of:** 2026-07-26  
**Authority:** observation and prior bounded evidence; functionality does not
select intent

## Completion rule

Every capability is traced as:

`producer → frontend/control → service/store → downstream consumer → visible
result → failure/recovery → acceptance proof`.

`OBSERVED` is not `APPROVED`; `LOCAL PASS` is not public proof; local/session
state is not Resident Card or account state.

## Route and dependency tree

```text
homepage / town map / directory / welcome tour / direct link
  -> /games/dream-phone.html
       -> Just Call (inline controller + dream-phone-bundles.js)
       -> /games/dream-phone-game.html
            -> inline ALL_ROUNDS
            -> games/data/dream-phone-claim-ledger.json
       -> shared header/back navigation + Plausible + Clarity

parked evidence:
  games/dream-phone-game.js
  -> patron-saint engine/reward bridge
  -> must not execute on the booth route
```

## Capability/touchpoint inventory

| Capability / visible element | Producer and frontend | Service/store | Consumers / result | Failure, removal and truth | Status / acceptance proof |
| --- | --- | --- | --- | --- | --- |
| Homepage/town discovery | `index.html`, map spot, directory; welcome tour | Static files | Booth arrival | Entry copy may not imply approval, personalization or saved rewards | **OBSERVED PUBLIC ENTRY**; exact public status must be reverified before release |
| Booth two-door navigation | `games/dream-phone.html` inline controller | DOM/session only | Just Call panel or game route | Must remain independent of parked engine; back/refresh returns honestly | **LOCAL PASS** in 2026-07-25 browser evidence; BTB-103 control |
| Caller directory/cards | Hard-coded caller buttons + assets | DOM | Selected caller/dial request | Broken/missing image must not remove accessible name/action | **OBSERVED**; full keyboard/AT/visual admission still open |
| Keypad/manual dial/random call | Phone hit zones, typed-number form, heart control | Runtime memory | Caller lookup or busy signal | Invalid/empty input gives recoverable busy/validation state | **LOCAL PASS** bounded browser suite |
| Scripted caller answer | `dream-phone-bundles.js` + booth controller | In-memory bundle index | Output region, recent-call list, remixes | Missing/malformed bundle fails visibly; never synthesize or imply tailoring | **OBSERVED / SCRIPTED REFLECTION ONLY** |
| Recent calls | Current runtime array | Memory only | On-page history drawer | Reload/navigation erases; no saved/history promise | **SESSION ONLY**; persistence is not an intended capability until owner ruling |
| Remix cards | Static modifier logic tied to active bundle | Memory only | Modified output | No active caller/repeat/storage failure must be harmless and explained | **LOCAL PASS**; role-specific usefulness needs product evidence |
| Jenny/secret numbers | Dial parser + scripted Easter-egg response | Any reward call is parked/local preview only | Toast/discovery language | Must not claim Card/account/cross-device grant | **REWARD HOLD**; visible wording says parked |
| Claim round catalog | `ALL_ROUNDS` in `dream-phone-game.html` | Static authored source | Admission loader | Authored round alone cannot become playable | **OBSERVED PRODUCER** |
| Claim admission | `dream-phone-claim-ledger.json`; exact runtime validator | Fetch of same-origin JSON, no backend | `admitted` round list and deck status | Missing/stale/corrected/duplicate/unknown/mismatched/impossible/future date fails whole deck closed | **BOUNDED LOCAL PASS**; one admitted round as of 2026-07-25 |
| Evidence calls/clues | Admitted round contacts and call buttons | In-memory round state | Notes panel | Repetition/confidence must not masquerade as corroboration | **OBSERVED**; strategic usefulness and AT proof open |
| Verdict | Two binary buttons | In-memory score/results | Reveal and score | Compound/mixed claims can be flattened; final model must prove control is instructionally valid | **OBSERVED / PRODUCT RISK** |
| Clause feedback/source | Exact admitted reveal rows and source URL | External official source link | Player explanation and transfer prompt | Link loss/change triggers recheck/HOLD; source supports only named clause/limit | **BOUNDED LOCAL PASS** for admitted round; no broad learning proof |
| Replay/final score | In-page round selection/results | Memory only | Next round/final state | Repeat deck can become answer memory; score is not mastery | **OBSERVED / LEARNING EVIDENCE MISSING** |
| Parked patron-saint game | `games/dream-phone-game.js` | Local badge hooks | None on booth route | Any new import/execution is regression; neutral nav must stay separate | **PARKED AND ISOLATED LOCALLY** |
| Local reward/discovery hooks | Shared `script.js` functions and localStorage history | Device localStorage; possible scheduled member sync exists platform-wide | Toast/collection consumers | An attempted write/sync is not authoritative save; delete/revoke/cross-device unproved | **NOT AN APPROVED DREAM PHONE CAPABILITY** |
| Resident Card/account continuity | No Dream Phone-specific authoritative producer | Shared auth/Supabase exists outside bounded product | Potential Closet/Card surfaces | No migration, restore, duplicate, revoke or second-device proof | **MISSING / MUST NOT BE CLAIMED** |
| Audio/music listing | `content/site/ksvl-player.js` | Static audio asset | KSVL/activity mix, not core game state | Missing audio must not block product; rights/source remain separate owner concern | **DEPENDENCY OBSERVED**, not completion evidence |
| Plausible | Page script | Third-party analytics | Aggregate page telemetry | Failure must not block; no outcome inference from pageviews | **LOADED, PRODUCT EVENTS NOT PROVED** |
| Clarity | Page script | Third-party recording service | Session/heatmap evidence | Mask interactive data, define access/retention; failure must not block | **LOADED, PRIVACY/USE REVIEW OPEN** |
| Correction/freshness operation | Champion + independent accuracy judge + ledger fields | Repository review process | Playable deck and user status | Correction immediately returns affected content to HOLD; re-admission requires independent exact review | **SPECIFIED / MANUAL OPERATION** |
| Beta feedback | Copy implies feedback value | No clearly mapped feedback service/control | None | Do not promise feedback channel without a real destination and ownership | **MISSING** |

## Learning mechanics map

| Learning stage | Required mechanic | Current observation | Gate |
| --- | --- | --- | --- |
| Notice/decompose | Separate compound claim into clauses | Reveal is clause-level for admitted round | Make decomposition visible before/at decision |
| Seek | Choose evidence sources/questions with consequences | Calls reveal authored lines; limited strategy | Prove choices change evidence quality or reasoning |
| Evaluate | Distinguish primary evidence, repetition, confidence, scope and denominator | Admitted Sky Dancers round models this | Every admitted round needs exact evidence/limit parity |
| Commit | Player submits a conclusion | Binary verdict exists | Mixed/uncertain claims may need non-binary or clause-level commitment |
| Feedback | Explain supported/unsupported clauses and source limits | Present for admitted round | Independent accuracy admission and accessible focus/announcement |
| Transfer | State what evidence would change the conclusion | Reflection prompt exists | Representative unfamiliar-player evidence required |
| Replay | New practice beyond memorized answers | Static finite deck | Seen-state/freshness model or intentionally small practice contract |

## Visitor-state and transition plumbing

| State/transition | Recognition/store | Expected product behaviour | Current truth / proof required |
| --- | --- | --- | --- |
| First visit | No trusted prior state | Boundary → clear first action → honest result | Bounded local browser pass; public and AT proof open |
| Leave → return without Card | No durable Dream Phone contract | Fresh start, reset disclosed | Session-reset behaviour observed; explicit return copy/evidence open |
| First/return → local Card | Shared Card state outside Dream Phone | Core experience unchanged; no reward pressure | No Dream Phone-specific integration approved |
| Local Card → account | Shared platform dependency | No synced history/reward unless authoritative event round trip passes | **NOT SUPPORTED/NOT PROVED** |
| Signed in → sign out → return | Shared platform dependency | Fall back honestly without leaking prior private state | **NOT PROVED** |
| Second tab/device | Memory/local storage only | No cross-tab/device promise | **NOT PROVED** |
| Storage denied/corrupt | Browser storage failure | Core call/game remains usable; no success-shaped save | Bounded storage-failure pass; corruption/AT breadth open |
| Evidence ledger stale/corrected/bad | Same-origin fetch/validator | Whole deck unavailable with retry/exit | Bounded adversarial local pass |
| Card/account deletion/revoke | Shared platform dependency | No Dream Phone artifacts survive or imply ownership | No authoritative Dream Phone objects exist; future capability requires full deletion contract |

## Accessibility obligations by control

| Control/state | Required proof |
| --- | --- |
| Pictured keypad/hit zones | Accessible name, visual focus, logical order, target size, keyboard equivalence |
| Directory/remix/verdict buttons | Name/role/state; `aria-pressed` or equivalent where selected; no color-only state |
| Answer/notes/reveal | Deliberate focus and concise live announcement; no duplicate reading |
| Mode and route changes | Heading/focus restoration; Back works; no focus loss into hidden panels |
| Motion | Reduced-motion media query plus behavioural path with no smooth scroll |
| Reflow/zoom | 320 CSS px and 200%; 390/430 mobile and 1440 desktop; no clipped result/control |
| Error/unavailable | Programmatic status, retry and exit; not conveyed only by sound/animation |

## Failure, retry and idempotency

- Multiple rapid call/verdict actions must not duplicate results or rewards.
- A failed caller bundle/evidence fetch cannot fall through to unrelated
  content.
- Source/correction changes invalidate the entire affected admitted deck before
  play.
- Reload during a call/round may reset only when the UI says the state is
  session-only.
- Analytics, Clarity, fonts, audio and reward services are non-critical; their
  failure cannot block the core experience.
- Any future account reward requires an idempotency key, authoritative write,
  duplicate handling, visible pending/saved/failed states, retry, revoke/delete
  propagation and second-device proof.

## Cross-owner handoffs

| Dependency | Owner | Required handoff before implementation |
| --- | --- | --- |
| Canonical evidence-judgment concept | LIBRAiRY/Learning owner | Concept ID, mental model, misconceptions and Dream Phone's distinct practice job |
| Episode/class relationship | Episodes and High owners | Link/extend/new/decline complement card; no automatic content commission |
| Timely claims | NewsStand owner | NewsStand retains editorial/current-news authority; Dream Phone uses reviewed bounded decks |
| Guidance boundary | FAiRY owner | Keep scripted reflection separate from personalized/live advice |
| Resident Card/rewards/Closet | Platform + MAiKEOVER/Closet owners | Authoritative event/store, migration, restore, revoke/delete and consumer proof |
| Homepage/town/welcome tour | Homepage/town owners | Status-consistent discovery copy and exact release binding |
| Analytics/privacy | Analytics/Privacy owners | Event dictionary, masking, retention/access and failure behaviour |
| Visual system/audio | Brand/Artwork/KSVL owners | Approved direction, asset rights, actual full-resolution independent review |

## Build dispositions

- **OWNER DECISION REQUIRED:** major product model.
- **BUILD BEFORE LAUNCH after decision:** one coherent promise and mechanic;
  complete visitor states; accessibility; learning transfer; source operations;
  truthful persistence/rewards; analytics/failure; exact release/public proof.
- **BLOCKED — BUILD REMAINS REQUIRED:** any owner-selected account reward or
  durable history until platform contract and cross-device lifecycle exist.
- **TEMPORARY SAFETY HOLD:** unadmitted claim rounds and parked engine; this
  does not settle final scope.
- **DECLINE only by explicit owner ruling:** any of the candidate product
  models or intended capabilities.

## Acceptance evidence index

- Product/status and trust repair packet:
  `build-packet-product-status-trust-repair-2026-07-25.md`
- Exact claim admission:
  `claim-evidence-ledger-2026-07-25.md`
- Latest bounded local evidence:
  `evidence-product-status-trust-repair-3-strict-calendar-2026-07-25.md`
- Latest independent bounded re-judge:
  `independent-rejudge-product-status-trust-repair-3-strict-calendar-2026-07-25.md`
- Current full observation/gap audit: `deep-dive-2026-07-25.md`
- Prevention rules: BTB-103, BTB-104, BTB-134, BTB-135
- Missing proof remains: owner-approved model, Council-quality competition,
  representative learning transfer, assistive technology/cross-browser,
  privacy-safe outcome analytics, authoritative rewards/history, exact release
  binding and public verification.

