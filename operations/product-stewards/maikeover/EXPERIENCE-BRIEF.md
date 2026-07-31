# MAiKEOVER on MAiN experience brief

**Status:** SPECIFIED — INTENT RECOVERED; DESIGN/BUILD/RELEASE EVIDENCE NOT YET
COMPLETE
**Product ID:** `maikeover`
**Owner:** MAiKEOVER building champion
**Owned experience:** `/maikeover.html`, Resident Card creation and return, the
handoff to `/laidies-card.html`, and the visitor-facing consequences of shared
identity, ownership and reward contracts
**Trigger:** D-2026-07-26-052 owner-entry recovery after targeted preflight
found this exact brief missing
**Evidence ceiling:** repository records and the actual local visual artifacts
listed below were inspected 2026-07-26. No new public-origin, real-account,
two-device, avatar-provider or authoritative reward test was performed.

## Recovered original promise

`ALI CONFIRMED` MAiKEOVER is the becoming-a-resident ritual: a visitor sits at
a Y2K salon vanity, makes a Resident Card that feels like hers and leaves with
an honest next step into her Closet. The room is the interface. It must not
become scenery above a generic profile form.

`ALI CONFIRMED` The LIBRAiRY is the interaction precedent, not a template to
copy literally. Meaningful salon objects are separately operable and open in
place: the large vanity mirror holds the live Resident Card, the vanity
drawers hold its choices, the three small mirrors hold portrait candidates and
the reception desk holds the optional account/handle handoff.

`LOCKED LEDGER — D-2026-07-26-050` The building owner owns the complete
experience, including Resident Card, Closet relationship, visual design,
state/backend plumbing, new/returning/failure journeys and measured result.

`LOCKED LEDGER — D-2026-07-26-053` Every visible result must trace through its
producer, frontend, authoritative store/service and every consumer. The Closet
may show only state that its producer and source can prove.

`LOCKED LEDGER — D-2026-07-26-054` First-time, returning-without-Card,
device-local Card and verified account-backed Card experiences are separate
product states with separate evidence and launch verdicts.

`LOCKED LEDGER — D-2026-07-26-055 / 056` Honest temporary holds do not remove
approved current-release work. Account, cross-device, ownership, reward,
privacy and delivery gaps remain build obligations unless Ali deliberately
moves or removes them.

## Experience outcome

A visitor should be able to answer, without technical knowledge:

1. what MAiKEOVER lets her make;
2. whether the chair knows her and what evidence authorizes that recognition;
3. where her current Resident Card and Closet objects are retained;
4. which salon object changes which part of the Card;
5. whether an account, public Card, owned item or cross-device restoration
   actually exists; and
6. what useful action comes next.

The emotional arc is stranger → seated guest → self-directed makeover →
Resident Card holder → truthful Closet continuation. Account claim is a
separate, informed transition within that arc, not a prerequisite for play and
not something inferred from a local handle.

## Ten-second composition

`APPROVED BRIEF/ARTIFACT` At desktop width, the operable vanity is the primary
viewport: the live Resident Card sits in the large bulb mirror, the seven
drawers sit on the counter, and three candidate mirrors are visibly available
only when portrait candidates exist. The current straight-on vanity candidate
is admitted structural evidence, not final visual approval.

`APPROVED BRIEF/ARTIFACT` The page presents four spatial beats rather than a
long form:

1. **Take the chair:** an arrival line states the exact visitor state and
   retention scope.
2. **Work the vanity:** the Card changes in the mirror as one drawer opens in
   place at a time.
3. **Finish the Card:** save produces a precise success or failure receipt and
   a Closet handoff.
4. **Sign the guest book:** when the verified account service is available,
   the reception desk explains and performs account/handle/visibility
   transition; otherwise it is an honest held construction state, not a
   success-shaped mock.

`INFERENCE — requires owner review` The reception desk may appear beside or
immediately below the vanity as a second room zone. It must remain visually
secondary to making the local Card while still being discoverable after a
successful save.

## Visitor-state scopes

| Scope | Recognition authority | Arrival promise | Primary path | Completion and next result | Failure/transition contract | Current evidence / verdict |
|---|---|---|---|---|---|---|
| First-time visitor | Absence of an accepted Card envelope and accepted account session; no fingerprinting inference | “New here? Take the chair—let’s make your Card.” Saving is explained as this-browser/on-this-device | Inspect live Card → open each necessary drawer → save locally without sign-in → open local Closet | Complete versioned local envelope survives reload; Closet shows only supported local fields/objects | Storage denied/quota/corrupt input stays visible and non-destructive; next transition is same-device return or separately offered account claim | `CURRENT IMPLEMENTATION OBSERVED`: bounded local creation, blocked-storage and mobile evidence exist. Clean-device comprehension and full in-room composition still require judgment. |
| Returning visitor without a Resident Card | Allowed prior device-local visit/use signal, but no valid Card envelope and no provider-verified session | “Welcome back. This device has local LAiDIES activity, but no Resident Card yet.” | Resume useful supported local objects or begin the Card without replaying all newcomer explanation | Visitor reaches the relevant local continuation without being described as a member, logged in or synced | Missing/corrupt/stale signals fall back safely; never imply personal recognition from a generic visit count | `UNKNOWN`: the functionality map identifies this required state, but no canonical recognition signal or accepted journey evidence exists. BUILD BEFORE LAUNCH. |
| Resident Card holder — device-local | Valid versioned `laidies_resident_card_v1` envelope in this browser context | “This device remembers your Resident Card.” | Restored Card appears in mirror → edit/save atomically → open this-device Closet | Same allowed envelope restores after reload; local collections stay labelled on this device | Two-tab writes, corrupt envelope, storage denial and deletion/revoke-like local clear have explicit results; no account/public/cross-device implication | `VERIFIED USER/PRODUCT EVIDENCE`: Repair 2 bounded-local rejudge passed 90/100. Visual integration and the full MAiKEOVER → Closet → MAiKEOVER journey still require exact candidate proof. |
| Resident Card holder — verified account-backed | Provider-verified Supabase session plus accepted profile/handle/RLS result; account-owned objects come only from their shared authoritative services | “Signed in as @handle” plus a separate statement of what is account-backed and what remains on this device | Restore permitted profile → resolve local/account conflict → edit/visibility choice → verify consumers across two devices → sign out/revoke/delete safely | Account profile and admitted owned objects reconcile on both devices; public/private views respect current consent; Closet reads shared sources rather than re-deriving balances | Expired link/session, taken handle, retry/idempotency, local/account conflict, second-device timing, visibility revoke, RLS denial and deletion are independently tested | `CURRENT IMPLEMENTATION OBSERVED`: code/migrations/deterministic fixtures exist. `UNKNOWN/UNVERIFIED`: controlled real-account/two-device lifecycle is not accepted. HOLD public/account/sync claims; BUILD REMAINS REQUIRED through Functionality & Platform. |

Passing evidence from one row cannot pass another. Mobile and desktop are
tested within every applicable row, not treated as two extra identity states.

## Operable component map

| Component | Visitor job | Interaction contract | Authoritative result / consumer | Provenance | Current disposition |
|---|---|---|---|---|---|
| Arrival/state line | Know whether and why the room recognizes her | Derived only from accepted Card envelope and provider session, with a distinct returning-without-Card branch | Sets truthful route framing; does not create identity | `ALI CONFIRMED`; D-054; `FUNCTIONALITY-MAP.md` | BUILD BEFORE LAUNCH |
| Large bulb vanity mirror | See the actual Resident Card change | Existing live preview renders in the mirror glass; the mirror never becomes a fake screenshot | Final allowed fields become one versioned local envelope; account write only after shared contract succeeds | Approved building brief; current `#moCard` implementation | REFRAME, DO NOT REBUILD ENGINE |
| Seven vanity drawers | Change Look, Backdrop, Soundtrack, Saint, Era Faves, Carrying and Finish | One drawer opens in place; DOM controls remain semantic and keyboard ordered; drawers are objects seated on the vanity | Choices update preview; Finish performs one atomic save and emits a receipt | Approved building brief; Repair 2 evidence | BUILD/REFINE |
| Three candidate mirrors | Compare and select portrait candidates | Hidden/inert unless admitted service returns three safe candidates; selection updates the live Card | Avatar URL/data follows avatar retention and privacy contract | Approved building brief | BLOCKED — AVATAR SERVICE GATE; BUILD REMAINS REQUIRED |
| Bulb/progress reveal | Feel the Card becoming hers | Bulbs may reflect completed Card sections, never account status, ownership or reward | Decorative/progress state only; reduced-motion equivalent required | Approved building brief; signature-detail proposal | OWNER VISUAL REVIEW REQUIRED |
| Save receipt | Understand exactly what happened | Announces success/failure and names “this device,” “account” or “public” only from authoritative result | Routes to the matching Closet mode or retry | Operating spec; D-053/054 | BUILD BEFORE LAUNCH |
| Reception desk / guest book | Deliberately claim account/handle and choose visibility | Opens after or alongside local success; informed email/session/handle/visibility flow; held state fails closed | Shared identity/profile service; restricted public view; Closet/account consumers | Approved building brief; platform identity packet | DEPENDENCY — FUNCTIONALITY & PLATFORM |
| Closet doorway | Continue with proven identity, saves, collections and entitlements | Destination and label change by visitor scope; no universal “your Closet is synced” copy | `/laidies-card.html` consumes local envelope and admitted shared read models | `FUNCTIONALITY-MAP.md`; Closet decisions/spec | BUILD/VERIFY ROUND TRIP |
| Exit to Sorority House | Use the Card socially after making it | Secondary onward route, never a substitute for Closet or account completion | Separate building journey | Approved building brief | KEEP SECONDARY |
| Keeper/Paulette | Optional warmth and guidance | May explain one state or ritual; must not obscure controls or become the source of technical truth | No data authority | Approved brief names as option only | `UNKNOWN` — ALI TASTE DECISION |

## Desktop and mobile behavior

`APPROVED BRIEF/ARTIFACT` Desktop uses the straight-on vanity geometry. The Card
is legible in the mirror, drawer labels and states are visible without hover,
and the three small mirrors are functional candidate slots rather than
decorative false affordances.

`APPROVED BRIEF/ARTIFACT` Mobile reflows instead of shrinking the room into a
banner. The live Card remains first, drawer triggers become full-width logical
rows, the open drawer follows its trigger, candidates form a horizontal group
only when present, and the Finish receipt remains adjacent to the action that
caused it.

`LOCKED/OPERATING SPEC` The full journey must work at 320 CSS px and 400% zoom,
with logical headings/landmarks, visible focus, named controls, announced
status, no keyboard trap, adequate target size/contrast and a reduced-motion
equivalent for bulb/Polaroid effects.

## Identity, ownership, rewards and cross-device boundary

This building consumes the following shared contracts; it does not author
alternatives:

- **Identity/session/profile/public visibility:** Functionality & Platform
  packet
  `platform-reliability/build-packet-identity-account-profile-cross-device-2026-07-26.md`.
- **Economic ownership and rewards:** Functionality & Platform packet
  `platform-reliability/build-packet-economic-ownership-ledger-2026-07-26.md`.
- **Launch truth:** `platform-reliability/functionality-platform-launch-truth-table-2026-07-26.md`.
- **Resident Card/Closet producers and consumers:** this dossier's
  `FUNCTIONALITY-MAP.md`.

MAiKEOVER may render shared status, initiate an authorized action and explain
its consequence. It may not define a second session, profile, entitlement,
balance, ownership, cross-device merge, visibility or public-card store.
Backgrounds remain choices until an authoritative entitlement says otherwise.
Clips, FAiRY Plays, Book Fair delivery, necklaces and other collections remain
subject to their producing owners and shared ledger.

## Visual direction and unresolved decisions

`APPROVED BRIEF/ARTIFACT` Required invariants are the straight-on operable
vanity, candy/aubergine controls, no heavy gold, Resident Card in the large
mirror, seven physical drawer stations and room-integrated interaction.

`CURRENT IMPLEMENTATION OBSERVED` The inspected desktop and mobile artifacts
successfully place the Card in the mirror and drawers on the vanity, but the
open control content continues below as a conventional long form. They are
implementation evidence, not final approval.

`LOCKED LEDGER — D-050` Sitewide style remains unresolved. MAiKEOVER must be
tested under the selected adult-comic, deliberate-dual or controlled-hybrid
system; this dossier cannot settle the global style.

`UNKNOWN — ALI OWNER REVIEW` Whether Paulette appears, whether candidate
portraits occupy the three existing mirrors or a dedicated counter group, and
the final bulb/Polaroid flourish require comparable visual evidence and
independent admission before propagation.

## Exact source evidence

| Evidence | Provenance label | What it establishes | Limitation |
|---|---|---|---|
| `operations/building-design-briefs/maikeover.md` | `ALI CONFIRMED` corrections and approved brief | LIBRAiRY-only interaction precedent; vanity/mirror/drawers/reception composition; room-as-interface; preserved engine; canon No. 6 | Contains older claims that functions “all work”; later product evidence limits those claims |
| `operations/product-stewards/maikeover/FUNCTIONALITY-MAP.md` | `LOCKED LEDGER` control artifact | Four visitor scopes; producer/store/consumer paths; missing shared backend; exact cross-page transactions | Contract/source recovery only; no new service test |
| `operations/product-stewards/maikeover/OPERATING-SPEC.md` | Approved operating record | Purpose, mechanics, state labels, stores, privacy, accessibility and release gates | Account/public/avatar/reward/cross-device remain unverified |
| `operations/product-stewards/maikeover/independent-rejudge-controlled-account-preflight-repair-2-2026-07-25.md` | `VERIFIED USER/PRODUCT EVIDENCE` | Bounded local Repair 2 pass at 90/100 | Deterministic/local scope only |
| `operations/product-stewards/maikeover/evidence-2026-07-25/maikeover-local-return-desktop.png` | `CURRENT IMPLEMENTATION OBSERVED` | Desktop Card-in-mirror, seven drawers, held avatar content and downstream form split | Screenshot is not interaction, account, accessibility or approval proof |
| `operations/product-stewards/maikeover/evidence-2026-07-25/maikeover-held-mobile.png` | `CURRENT IMPLEMENTATION OBSERVED` | Mobile stacking and held-avatar language | Does not prove every state, reflow at 400%, or live control order |
| `assets/building-interiors/delivery-20260724-maikeover-v1/maikeover-vanity-station-comic-candidate-v1.png` and its `README.md` | `APPROVED BRIEF/ARTIFACT` structural candidate | Straight-on geometry, large mirror, three candidate mirrors and seven drawer zones | Candidate is not final visual/style approval; rendered mirror areas are not transparent |
| `operations/resident-card-design-decisions.md` | Approved product decision record | Resident Card field/object and local-first decisions | Does not prove account/public/cross-device backend |
| `operations/closet-design-decisions.md` and `operations/closet-dashboard-spec.md` | Approved product decision records | Closet as resident continuation/aggregation room and its visible vessels | Several producers and ownership ledgers remain missing |
| `operations/product-stewards/platform-reliability/build-packet-identity-account-profile-cross-device-2026-07-26.md` | Shared owner contract | Identity/account/cross-device implementation and evidence boundary | Packet is SPECIFIED, not implemented |
| `operations/product-stewards/platform-reliability/build-packet-economic-ownership-ledger-2026-07-26.md` | Shared owner contract | Canonical ownership/reward ledger boundary | Packet is SPECIFIED, not implemented |
| `operations/sitewide-style-championship-2026-07-26.md` | Locked portfolio direction | Three unresolved sitewide visual systems and comparison gate | No style winner yet |

## Build sequence and release gates

1. Admit the recovered intent and four-state matrix through targeted preflight.
2. Run the room-first experience competition without changing functionality,
   identity, ownership, rewards or persistence contracts.
3. Build the chosen frontend composition against adapters owned by
   Functionality & Platform; do not couple visual controls directly to new
   stores.
4. Prove all allowed local journeys and failures on the exact candidate.
5. Integrate and prove account/public/cross-device states only after the shared
   identity packet exposes its accepted contract.
6. Integrate owned/reward objects only from the shared entitlement/read model.
7. Obtain independent product, visual/brand, privacy/trust,
   UX/accessibility and technical judgments.
8. Bind the exact release artifact, deploy only under the active release
   authority, then retest the public origin. Analytics measurement begins only
   after privacy-safe events are wired and verified.

## Current verdict

The intended experience is **SPECIFIED**. The existing local route and visual
candidate are **BUILDING / BOUNDED LOCAL PASS** within their named scope. The
complete four-state MAiKEOVER → Resident Card → Closet experience is not
verified locally or publicly, and shared account, ownership, reward and
cross-device work remains with Functionality & Platform.
