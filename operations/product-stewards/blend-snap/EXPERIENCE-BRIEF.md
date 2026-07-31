# Blend & Snap building experience brief

**Status:** SPECIFIED — INTENT RECOVERED; OWNER, INDEPENDENT AND CONTROL ROOM
REVIEW REQUIRED  
**Product ID:** `blend-snap`  
**Building owner:** Blend & Snap champion  
**Recovered:** 2026-07-26  
**Scope of this cycle:** dossier recovery only; no live route, shared asset,
brand/platform contract, registry or run-queue change

This brief reconciles the charter, operating specification, locked portfolio
rules, current implementation and the 2026-07-26 building championship. It does
not promote current code or maker-side visual work into approved intent.

## Stable promise and user outcome

- Blend & Snap is SUNNYVAiLE's hospitable café and the weekly place to
  **ORDER** an episode Study Pack menu. `APPROVED BRIEF/ARTIFACT`
- The visitor should understand what each admitted pack piece does, what is
  actually ready, and which one useful action she can take next without
  mistaking navigation for completion. `APPROVED BRIEF/ARTIFACT`
- The café coordinates the learning week; it does not duplicate the Episode,
  Cheat Sheet, Try-On, Trading Cards or High's Quiz.
  `LOCKED LEDGER`
- The building must feel operated through a café-native menu, ticket rail,
  counter and pickup receipt rather than a generic card grid or status
  dashboard. `LOCKED LEDGER`
- Opening a receipt or downstream route proves navigation only. It does not
  prove study, practice, assessment, reward, membership or account continuity.
  `LOCKED LEDGER`

## Audience and visitor-state jobs

| Visitor state | Arrival and orientation | Useful job | Continuity and prompts | Result and next step | Provenance |
|---|---|---|---|---|---|
| First-time visitor | JoJo introduces the current verified Special and makes ORDER visible within ten seconds | Understand the three Episode 01 pack items and the separate Quiz handoff | No saved usual or pack claim; choosing a drink is optional; Resident Card/sign-in prompts are withheld because they add no current capability | In-place receipt; open the pack cover, browse the Episode, or leave it at the counter | `APPROVED BRIEF/ARTIFACT` |
| Returning visitor without a Resident Card | Same current Special; JoJo may recognize a valid device-local usual or that this browser opened the same pack menu | Resume without replaying a compulsory onboarding sequence | `laidies_bs_usual` and `laidies_bs_last_pack` only; say “on this device/browser,” never “studied,” “caught up” or “yours everywhere” | Reopen current/past receipt; take a different available item | `APPROVED BRIEF/ARTIFACT` |
| Resident Card holder — device-local | Same café experience | Same useful job; Card presence creates no extra Blend & Snap authority | A local Card must not be read as verified identity, membership, account sync or ownership; no Card-specific prompt is needed | Same local receipt and downstream routes | `LOCKED LEDGER` |
| Resident Card holder — verified account-backed | Same café experience until a shared account contract is integrated and proved | No additional current capability | Do not read/write account progress, usual, packs, cards or rewards; do not imply cross-device state | Same device-bounded experience | `LOCKED LEDGER` |

Required transition truth:

- First visit → return without Card may restore only a valid local usual and
  last-opened pack marker; storage denial/corruption returns to a useful clean
  state. `APPROVED BRIEF/ARTIFACT`
- Visitor → device-local Card and device-local Card → verified account do not
  currently alter Blend & Snap. `CURRENT IMPLEMENTATION OBSERVED`
- Sign-out, second device and private browsing may lose the usual/opened marker
  without losing access to the menu. `APPROVED BRIEF/ARTIFACT`
- Account-backed Study Pack history, Trading Card ownership and cross-device
  usual are unsupported and must remain absent until their shared contracts
  are built and independently proved. `LOCKED LEDGER`

## Place metaphor, feeling and ritual

- The feeling is a friendly third place: useful, clever and social without
  turning study into punishment or a productivity demand. `APPROVED BRIEF/ARTIFACT`
- The ritual is **arrive → optionally name the usual → read the verified
  Special → ORDER → receive a live HTML receipt → choose one next step → linger
  at the secondary noticeboard or leave**. `APPROVED BRIEF/ARTIFACT`
- JoJo is the host and continuity cue, not an account agent, tutor, assessor or
  source of false familiarity. `APPROVED BRIEF/ARTIFACT`
- Changing episode/status truth must remain live text; generated art contains
  no operational claims, fake controls, routes, schedules or rewards.
  `LOCKED LEDGER`
- The provisional visual direction is “JoJo's pickup rail,” but its art,
  palette, JoJo continuity and final composition remain an Ali and independent
  visual gate. `APPROVED BRIEF/ARTIFACT`
- The sitewide painterly/comic/hybrid rendering system remains unresolved; no
  Blend & Snap candidate selects it by implication. `LOCKED LEDGER`

## Complete owned product tree

| Surface | Product job | Current truth | Owner relationship | Provenance |
|---|---|---|---|---|
| `/blend-snap.html` | Café arrival, usual, verified current/past menu, ORDER receipt and secondary town handoffs | Bounded local controller evidence; final building design and public proof absent | Blend & Snap champion | `VERIFIED USER/PRODUCT EVIDENCE` |
| Study Pack / future episode-specific pack route and admitted assets | Open one pack cover and coordinate the Cheat Sheet, Try-On, Trading Card Pack and separate Quiz handoff | Episode 01 three-item architecture is locked; complete pack-cover route is not built | `practice-pack` subchampion reports to Blend & Snap | `LOCKED LEDGER` |
| `/try-on.html` | Episode-specific applied practice and optional device-local reflection | Built locally with prior bounded storage/failure evidence | `try-on` subchampion | `VERIFIED USER/PRODUCT EVIDENCE` |
| `/games/trading-cards.html` | Concept/character card play and collection | Route exists; episode pack admission is held or unavailable; account/Closet/trading authority is unproved | `trading-cards` subchampion | `CURRENT IMPLEMENTATION OBSERVED` |
| `/learn/quiz.html#quiz-start` | Check understanding and own any valid assessment/reward | Available as a separate “next door” handoff | SUNNYVAiLE High owner; Blend & Snap consumes route/status only | `APPROVED BRIEF/ARTIFACT` |
| Episode routes | Explain why the weekly concept matters through story | Four published identities currently cross-checked by the episode index | Chick Flicks/Episode owner | `CURRENT IMPLEMENTATION OBSERVED` |
| Printable/cheat-sheet routes | Durable reference/download | Episode-specific assets admitted by manifest where evidence exists | Content/learning owner; Blend & Snap consumes admission | `CURRENT IMPLEMENTATION OBSERVED` |
| Noticeboard town routes | Optional after-coffee exploration | Eight current HTML links overlay candidate art; receiving outcomes are not all reverified in this cycle | Each destination champion owns its result | `CURRENT IMPLEMENTATION OBSERVED` |

## Component and object-to-action map

| Object | Discoverability | Action and location | State carried | Visible result | Next step |
|---|---|---|---|---|---|
| JoJo/counter | Visible room host at entry; never essential text in pixels | Orient; mobile uses an authored crop followed by live controls | None | Café purpose and current Special are legible | Menu |
| Special menu board | Live text, status and ORDER visible at rest | Validate episode index + pack manifest; enable ORDER only on agreement | Manifest/index version and episode ID | Exact component jobs/statuses | Ticket rail |
| Usual drinks | Optional native buttons near counter | Select/replace a drink | `laidies_bs_usual`, device only | Polite confirmation and memory limitation | Continue to ORDER |
| ORDER/ticket rail | Native button in DOM/visual order | Open current or named past pack | Episode ID; local last-opened stamp only after valid receipt opens | Printed in-place receipt | Available component |
| Pickup receipt | Live HTML, focusable/announced | Read statuses; open only `available` routes; close to initiating ORDER control | No completion state | One route or truthful held/planned/unavailable label | Component owner or café |
| Past receipts / Regulars | Complete button labels, not image hotspots | Reopen a validated published pack | Episode ID only | Past pack receipt | Component owner or café |
| Noticeboard | Secondary after the order | Follow an exact named town route | No availability/completion state | Receiving route | Receiving champion owns outcome |
| Theme song control | Native play/pause with visible status | Play local audio; stop/pause; survive media failure | Media playback session only | Audible theme or explicit failure | Continue café journey |

## Required content and inventory

- The episode index and weekly-pack manifest must agree on every offered
  published episode before ORDER enables. `APPROVED BRIEF/ARTIFACT`
- Episode 01 must disposition Cheat Sheet, Try-On and Trading Cards as
  `available`, `held`, `planned` or `unavailable`; only `available` receives a
  route. Quiz is a separately labelled adjacent handoff. `LOCKED LEDGER`
- Cheat Sheet = one-page recap/reference/download; Try-On = applied practice;
  Cards = collect/remember; Quiz = separate assessment. There is no Episode 01
  Study Sheet. `LOCKED LEDGER`
- Trading Cards remain a build obligation where approved intent requires them;
  a temporary hold prevents false ownership/reward claims but cannot count as
  completion. `LOCKED LEDGER`
- Dynamic availability, schedules, reward or account claims are prohibited
  inside artwork. `LOCKED LEDGER`

## Primary, return and failure journeys

1. **First-time:** clean storage → validate current pack → optional usual →
   ORDER → receipt → one available route → browser back returns to a coherent
   café state. `APPROVED BRIEF/ARTIFACT`
2. **Return without Card:** valid usual/last-pack marker → current Special is
   independently revalidated → truthful browser-local recognition → reopen
   current/past receipt. `APPROVED BRIEF/ARTIFACT`
3. **Card states:** local or signed-in Card presence does not create an
   enhanced journey; same device-bounded verdict applies. `LOCKED LEDGER`
4. **Storage denied/corrupt:** menu and receipt remain usable; no success-shaped
   persistence copy appears. `APPROVED BRIEF/ARTIFACT`
5. **Loading/stale/missing/offline/disagreement:** ORDER stays disabled; the
   Special closes; atomic visitor-safe status, released-Episodes fallback and
   focused Retry appear; no hard-coded pack is reused. `VERIFIED USER/PRODUCT EVIDENCE`
6. **Held/planned/unavailable component:** label explains status; no link,
   keyboard target or fake destination exists. `VERIFIED USER/PRODUCT EVIDENCE`
7. **Mobile/zoom/reduced motion:** authored 320/390 composition, DOM/visual
   order parity, no essential motion or horizontal overflow, and deterministic
   focus restoration are required. `LOCKED LEDGER`

## Cross-building relationships and handbacks

- Chick Flicks sends the visitor to Blend & Snap to check the pack menu; it may
  not advertise held Cards or a “complete pack.” `APPROVED BRIEF/ARTIFACT`
- Blend & Snap hands an available component to its actual owner and preserves
  the component's distinct learning job. `LOCKED LEDGER`
- Try-On returns to the café/episode/community only through exact routes and
  must label any reflection as device-local. `APPROVED BRIEF/ARTIFACT`
- High owns assessment and reward; Blend & Snap labels the Quiz “next door”
  and never consumes its result as café completion. `LOCKED LEDGER`
- My Closet may display Trading Cards only after a producer and authoritative
  ownership contract can prove award/open/duplicate/revoke state.
  `LOCKED LEDGER`
- Every noticeboard destination owner must confirm the receiving route and
  visible outcome before that notice is admitted to release. `LOCKED LEDGER`

## Platform contracts consumed

- **Identity/account/permissions:** none today; global header state is not
  Blend & Snap continuity. `CURRENT IMPLEMENTATION OBSERVED`
- **Saves/progression/Closet:** usual, last-opened receipt, Try-On reflection
  and current card state are separate device-local records; none proves
  learning progress or account ownership. `CURRENT IMPLEMENTATION OBSERVED`
- **Rewards/economy:** no café reward; High owns quiz rewards; Trading Card
  server authority and Closet fulfilment remain unproved. `LOCKED LEDGER`
- **Community/moderation:** only exact outbound handoffs; Blend & Snap owns no
  post completion. `APPROVED BRIEF/ARTIFACT`
- **Analytics:** proposed aggregate controlled events only; no drink label,
  prompt/reflection text, collection contents or identity. `APPROVED BRIEF/ARTIFACT`
- **Release reliability:** source, exact artifact and public-origin parity are
  separate gates. `LOCKED LEDGER`

The complete implementation truth is maintained in `FUNCTIONALITY-MAP.md`.

## Brand invariants and building freedoms

- Invariants: JoJo, café third-place warmth, ORDER verb, truthful live menu,
  pink/plum/teal family pending style ruling, obvious native controls, no
  school-punishment framing, and no changing truth in pixels.
  `APPROVED BRIEF/ARTIFACT`
- Freedoms: exact counter geometry, rail material, receipt motion, mobile crop,
  noticeboard composition and atmospheric detail may compete within the
  unresolved sitewide style system. `INFERENCE`
- Final JoJo face, art direction, palette balance and public visual identity
  remain Ali decisions after independent admission evidence. `LOCKED LEDGER`

## Desktop, mobile, accessibility, motion and audio

- Desktop shows a coherent room with the live Special and ORDER in the primary
  visual sequence; the controller is not buried beneath a decorative banner.
  `APPROVED BRIEF/ARTIFACT`
- Mobile uses a purpose-built JoJo/counter crop followed by full-width live
  menu/usual/ORDER controls; it is not a scaled or clipped desktop hotspot.
  `APPROVED BRIEF/ARTIFACT`
- All actions are native buttons/links with visible focus and 44px minimum,
  48px preferred targets; DOM and visual order match. `LOCKED LEDGER`
- Receipt open/close, error and retry have deterministic focus and atomic
  status announcements; reduced motion removes nonessential animation.
  `VERIFIED USER/PRODUCT EVIDENCE`
- Theme audio is optional, user initiated, labelled and nonessential; failure
  cannot block ORDER. `APPROVED BRIEF/ARTIFACT`

## Launch acceptance scenes

| Scene | Exact evidence required | Current verdict |
|---|---|---|
| First-time desktop + 390/320 | Identify café job, Special, ORDER, the three Episode 01 pack items and separate Quiz; open the pack cover, complete one available handoff and return | BUILDING — deterministic source evidence exists; human comprehension/final design absent |
| Return without Card | Restore only valid usual/last-opened marker; revalidate current data; replace usual; handle corrupt/denied storage | BOUNDED LOCAL PASS on incumbent controller; re-run on locked candidate |
| Device-local Card | Prove Card presence creates no membership/account/sync claim or hidden capability | SPECIFIED; exact candidate evidence required |
| Verified account-backed Card | Prove no unauthorized account read/write or enhanced claim | HOLD — shared account enhancement is unsupported |
| Failure/retry | Missing/invalid/stale/timeout/offline/index disagreement; visible fallback; focused retry; recovery | BOUNDED LOCAL PASS on incumbent controller; re-run on locked candidate/artifact/public origin |
| Accessibility | Keyboard, focus, 200% native zoom, 320 reflow, reduced motion, Safari + VoiceOver | AUTOMATION PARTIAL; native zoom/Safari/VoiceOver remain required |
| Visual/brand | Full-resolution independent admission plus Ali approval of direction, JoJo and final art | OWNER DECISION REQUIRED |
| Cross-building weekly loop | Episode → café → Try-On/reference → High → café/next route, with each owner confirming its result | BUILDING — route/status evidence is partial, complete handback proof absent |

## Unresolved decisions and non-goals

1. Ali must approve the pickup-rail direction, JoJo identity and final visual
   treatment after independent review. `UNKNOWN`
2. The Episode 01 pack-cover presentation and the three admitted components
   require content-owner/learning reconciliation and Ali approval.
   `APPROVED BRIEF/ARTIFACT`
3. Trading Card account authority, issuance, duplicates, collection, trading,
   Closet delivery, revoke and correction contracts remain unresolved shared
   work. `LOCKED LEDGER`
4. Account-backed usuals, cross-device pack history and café completion are
   non-goals unless a later explicit decision adds them. `APPROVED BRIEF/ARTIFACT`
5. Ordering drinks, commerce, payment, AI-generated tutoring and compulsory
   study are not part of this product. `APPROVED BRIEF/ARTIFACT`

## Reconciliation and approvals

- Building owner: recovered and reconciled this brief on 2026-07-26.
- Brand & Experience Director: review required after Control Room assigns a
  visual/source lock.
- Functionality & Platform Director: must sign `FUNCTIONALITY-MAP.md` before
  shared identity/reward/Closet or live-route integration.
- Study Pack, Try-On, Trading Cards, Episode, High and destination champions:
  must confirm their rows and handbacks before release.
- Portfolio Control Room: must bind exact write paths, lock, integration order,
  independent judges and release authority.
