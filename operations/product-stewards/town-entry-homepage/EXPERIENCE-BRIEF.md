# Town Entry & Homepage experience brief

**Status:** FIRST-VISIT HIERARCHY PROTOTYPED — EXACT COPY AND SITEWIDE STYLE DECISIONS OPEN  
**Product owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Brand & Experience Director:** review required  
**Functionality & Platform Director:** review required  
**Current authority:** dossier work and read-only route audit only; no live or shared integration lock

## Stable promise and user outcome

- LAiDIES helps women understand and use AI through accurate practical teaching, memorable Rewind Era references and the SUNNYVAiLE town world. `LOCKED LEDGER`
- The homepage is the town threshold: it explains the promise and helps a visitor choose one useful, truthful next route without learning the town first. `APPROVED BRIEF/ARTIFACT`
- Start Here is a legacy signpost that hands the visitor to the Visitor’s Centre; it is not a second homepage or a destination product. `APPROVED BRIEF/ARTIFACT`
- Entry-level success is an intentional arrival at a correctly labelled receiving route. It is not learning completion, subscription, playback, account creation, membership, reward, delivery or reopening proof. `LOCKED LEDGER`
- Practical value leads; the story world makes the lesson memorable and the optional town depth makes products discoverable. `LOCKED LEDGER`

## Audience and visitor-state jobs

| Visitor state | Arrival/orientation | Useful job | Known continuity | Primary result | Prompt or promise withheld |
|---|---|---|---|---|---|
| First-time visitor | Sees the practical-AI promise, why the town exists and one obvious safe start. `APPROVED BRIEF/ARTIFACT` | Choose current learning, orientation, lookup, bounded practical help or optional exploration. `APPROVED BRIEF/ARTIFACT` | None is assumed. `LOCKED LEDGER` | Correctly labelled receiving-route arrival. `LOCKED LEDGER` | No tour requirement, membership gate, reward, account or all-town-ready claim. `LOCKED LEDGER` |
| Returning, no Resident Card | Re-enters through current admitted content or an evergreen route. `APPROVED BRIEF/ARTIFACT` | Resume the current episode/news route when freshness and destination admission are proved, otherwise choose an evergreen route. `APPROVED BRIEF/ARTIFACT` | Device-local tour/charm history may exist, but there is no authoritative resume record. `CURRENT IMPLEMENTATION OBSERVED` | Current-or-evergreen route chosen without false freshness. `APPROVED BRIEF/ARTIFACT` | No account, cross-device, durable progress or verified reward inference. `LOCKED LEDGER` |
| Resident Card — device-local | Core entry remains open; a local Card may support an explicitly local Closet handoff only. `LOCKED LEDGER` | Continue on the same device without losing the public orientation choices. `APPROVED BRIEF/ARTIFACT` | Card, Closet, tour and charm data are browser-local at the currently proved scope. `CURRENT IMPLEMENTATION OBSERVED` | Same public routes plus a truthfully labelled local continuation. `INFERENCE` | No signed-in, public-resident, restored, synced or cross-device claim. `LOCKED LEDGER` |
| Resident Card — verified account-backed | A verified account projection may eventually offer a deliberate resume/account action. `INFERENCE` | Restore only state the authoritative account and product owners prove. `LOCKED LEDGER` | Current homepage code does not prove a complete account-backed Resident Card experience. `CURRENT IMPLEMENTATION OBSERVED` | UNKNOWN until identity/platform evidence exists. `UNKNOWN` | A browser token, initials pill or `svShowResume` hook cannot establish membership, Card ownership or synced progress. `LOCKED LEDGER` |

The first → returning, visitor → local Card, local Card → verified account,
sign-out, storage denial/corruption, second-tab/device, conflict, deletion and
revocation transitions require separate evidence; one state's PASS cannot
lend a PASS to another. `LOCKED LEDGER`

## Place metaphor, feeling and ritual

- The visitor should feel she has reached a lively, intelligent town threshold, not a generic SaaS funnel or a seventeen-item chore list. `APPROVED BRIEF/ARTIFACT`
- The page may alternate cinematic town imagery, candy-colour object cues and calm editorial explanation, but the unresolved style championship controls the eventual rendering language. `APPROVED BRIEF/ARTIFACT`
- “Guided first, explorable always” means orientation is available and map literacy is optional; the Visitor’s Centre room owns the welcome-desk ritual. `APPROVED BRIEF/ARTIFACT`
- The weekly/current ritual is optional and can appear only when its episode/news data, receiving route and correction state are current and admitted. `LOCKED LEDGER`
- The masthead/hero is evergreen and must not change with a weekly episode or
  news cycle; admitted current content belongs in a separate module below.
  `ALI CONFIRMED`

## Complete owned product tree

- `/` — promise, entry hierarchy, current episode/news prominence, purpose selection, activities/discovery, reference handoff, map/directory, guarded Card/Closet explanation and newsletter handoff. `APPROVED BRIEF/ARTIFACT`
- `/start-here.html` — resilient ordinary-link plus redirect handoff to `/visitors-centre.html`. `APPROVED BRIEF/ARTIFACT`
- Homepage-local interaction in `content/site/homepage.js` — menu, filters, map popup, audio handoff/fallback, tour paint, episode-index success/failure and future resume hook. `CURRENT IMPLEMENTATION OBSERVED`
- Consumed shared dependencies — global header/auth, welcome tour, tour check-in/rewards, charm hunt, directory, KSVL player, analytics providers, Buttondown and exact destination routes. `CURRENT IMPLEMENTATION OBSERVED`
- Destination products, the Visitor’s Centre room, episode/news authorship, identity/reward ledgers, platform infrastructure and global brand rulings remain outside Town Entry ownership. `APPROVED BRIEF/ARTIFACT`

## Component and object-to-action map

| Component/object | Discoverability → action | State carried | Result → next step | Provenance |
|---|---|---|---|---|
| Homepage topbar/mobile menu | Visible route shortcuts → anchor or owned destination | Menu open state; possible auth projection | Section/destination arrival → receiving owner | `CURRENT IMPLEMENTATION OBSERVED` |
| Hero | Durable promise plus non-weekly visitor jobs | None | Evergreen route/section handoff; never mutated by latest content | `ALI CONFIRMED` |
| Current-content module | Fresh episode/Breaking/Daily → exact route | Checksum-bound admitted projection | Current content or honest quiet/failure state below the hero | `ALI CONFIRMED` |
| Method/mission | Explains story → practical learning → practice → music → optional town depth | None | Visitor’s Centre, LUMINAiRY, Chick Flicks, KSVL, Card/Closet | `CURRENT IMPLEMENTATION OBSERVED` |
| Weekly hub | Episode index or evergreen fallback → read/listen/full/express routes | Published episode data; local tour paint | Exact episode/activity route; no downstream completion | `CURRENT IMPLEMENTATION OBSERVED` |
| The Breaking/The Daily | Conditional current publications → explanation | Admitted NewsStand state, freshness and corrections | Exact story/reader route | `LOCKED LEDGER` |
| Activity entrances | Concrete labelled tool/game → route/button action | Receiving-product limitations | Destination arrival only | `APPROVED BRIEF/ARTIFACT` |
| Miss Jeeves lookup | Query field → Library route | Query must not enter analytics; current implementation does not carry it | Library arrival → Library owns answer | `CURRENT IMPLEMENTATION OBSERVED` |
| Map/directory | Named hotspot/directory → popup → route | No availability truth is authoritative in map markup | Destination arrival → receiving product | `CURRENT IMPLEMENTATION OBSERVED` |
| Card/Closet panel | Explains local scope → MAiKEOVER or Closet | Device-local state only unless separately proved | Handoff to identity product | `APPROVED BRIEF/ARTIFACT` |
| Wednesday Postcard | Consentful email form → Buttondown handoff | Email goes to provider; must not enter evidence/analytics | Request/confirmation lifecycle owned by Post Office | `CURRENT IMPLEMENTATION OBSERVED` |
| Start Here sign | Redirect plus ordinary link | None | Visitor’s Centre arrival | `CURRENT IMPLEMENTATION OBSERVED` |

## Required content and inventory

- First-viewport promise must answer what LAiDIES is, what to do, where to
  start and whether an account is required. It presents one primary newcomer
  path, not four equal hero choices. `ALI CONFIRMED`
- Episode labels, art, read/listen routes and current/evergreen state must come from an admitted published artifact and fail evergreen. `APPROVED BRIEF/ARTIFACT`
- The Breaking must collapse on a clear day; The Daily must route to its current full explanation; corrections and withdrawals must propagate from NewsStand authority. `LOCKED LEDGER`
- Every promoted destination must carry owner, route, disposition, limitation, freshness and exact-artifact evidence from a shared readiness projection. `LOCKED LEDGER`
- Resident Card, account, community, reward, listening and newsletter language must state the exact observed scope and cannot treat a local event as an authoritative outcome. `LOCKED LEDGER`
- Hero, map, character/object and responsive imagery needs exact-use, crop, alt/fallback and sitewide-style admission before production migration. `LOCKED LEDGER`

## Journeys

1. **Primary first visit:** `/` → story-led AI learning world for women →
   60–90-second Visitor’s Centre introduction → Episode 01 → optional town
   practice → optional Resident Card. `ALI CONFIRMED`; exact public wording
   remains Brand/Ali-held.
2. **Optional exploration:** `/` → named map/directory choice → visible limitation → intentional route arrival → destination-owned result/back path. `APPROVED BRIEF/ARTIFACT`
3. **Returning/current:** `/` → admitted current episode and conditional news → exact explanation/content; on absent/stale data use an evergreen route. `APPROVED BRIEF/ARTIFACT`
4. **Start Here:** `/start-here.html` → redirect or ordinary link → Visitor’s Centre; blocked script/redirect must retain the link. `APPROVED BRIEF/ARTIFACT`
5. **First → return without Card:** public route choice and device-local paint may persist only at their proved scope; no identity is inferred. `LOCKED LEDGER`
6. **Visitor → local Card → same-device return:** MAiKEOVER owns creation; Town Entry may display only a validated local projection and exact limitations. `LOCKED LEDGER`
7. **Local Card → verified account:** held until Platform/Identity proves migration, conflict, revoke and cross-device behavior. `LOCKED LEDGER`
8. **Failure:** episode/news/directory/media/analytics/storage/provider failure leaves an ordinary labelled navigation route and never reports a result it did not observe. `APPROVED BRIEF/ARTIFACT`

## Cross-building relationships and handbacks

- Visitor’s Centre owns room-first orientation and all seventeen destination reveal contracts. `APPROVED BRIEF/ARTIFACT`
- NewsStand owns publication eligibility, freshness, correction and The Breaking/The Daily current state. `LOCKED LEDGER`
- Chick Flicks/Episode Experience owns episode availability and media wording. `APPROVED BRIEF/ARTIFACT`
- Library owns lookup/query handling and answer/editorial quality. `APPROVED BRIEF/ARTIFACT`
- MAiKEOVER/Resident Card/Closet and Platform own identity, local/account projections and restoration. `LOCKED LEDGER`
- Tour/Rewards owners must define whether route arrival is a step and whether any reward is authoritative; Town Entry cannot award or certify it. `LOCKED LEDGER`
- Post Office owns Buttondown, account-status and postcard delivery lifecycles. `APPROVED BRIEF/ARTIFACT`
- Platform Reliability owns exact candidate, readiness projection, deploy, rollback and public-origin proof. `APPROVED BRIEF/ARTIFACT`

## Platform contracts consumed

- Identity/account: current `sv-nav-auth.js` reads a Supabase-shaped token from local storage and can label a user “Resident”; this is implementation evidence, not a complete verified Resident Card contract. `CURRENT IMPLEMENTATION OBSERVED`
- Saves/progression/rewards: `sv-tour-checkin.js` writes weekly stops, FAiRY Plays, ritual badges and express completion; `charm-hunt.js` writes charm state. Their admission and authority are unresolved at entry. `CURRENT IMPLEMENTATION OBSERVED`
- Content/media: episode index, NewsStand authority, KSVL player/catalogue and exact route admission. `CURRENT IMPLEMENTATION OBSERVED`
- Analytics: Plausible and Clarity load, but no privacy-approved entry product event contract or evidence loop is established. `CURRENT IMPLEMENTATION OBSERVED`
- Release: no exact clean candidate or current bounded public proof belongs to this initialization. `VERIFIED USER/PRODUCT EVIDENCE`

## Brand invariants and homepage freedoms

- Invariants: practical value first; warm adult intelligence; candy colour as useful rhythm; town/object specificity; deterministic functional text; truthful limitations; no generic dashboard/card-grid takeover. `APPROVED BRIEF/ARTIFACT`
- The current painterly site, provisional comic direction and controlled hybrid are all unapproved as sitewide authority. `LOCKED LEDGER`
- The current Homepage remains the comparison baseline. Glamour-cartoon/
  pop-sticker is rejected as cheap/not adult; no new Homepage visual treatment
  advances until Brand supplies revised sophisticated adult editorial/
  graphic-novel rules. `ALI CONFIRMED`
- The live luminous-dusk masthead is the selected baseline winner. Preserve
  its exact image/composition and clean look; do not rebuild it. Reject white
  backgrounds, muddy/grungy building filters and sticker-comic decoration.
  Later changes are conservative hierarchy/deduplication/90s-accent work and
  proven stale-art replacement only. `ALI CONFIRMED`
- Legacy FAiRY Godmother and building art must be classified by exact use after
  the Brand ruling; existing presence and repetition do not confer approval.
  `ALI CONFIRMED`
- Homepage freedom after the ruling: choose threshold-specific hierarchy, imagery, section rhythm and responsive composition without cloning a Library room or Visitor’s Centre counter. `LOCKED LEDGER`
- Preserve the live Jost/rectangular homepage topbar as the current comparison authority until a separately locked shared-chrome change is admitted. `VERIFIED USER/PRODUCT EVIDENCE`
- Light candy is fill/on-dark decoration; accessible dark variants carry text, borders and focus on light surfaces unless rendered evidence proves another combination. `VERIFIED USER/PRODUCT EVIDENCE`

## Desktop, mobile, accessibility, motion and audio

- Desktop, 390px and 320px expose the same named core choices and destination truth with no horizontal overflow. `APPROVED BRIEF/ARTIFACT`
- Keyboard, visible focus, Escape, initiating-control focus return, landmarks, skip route, announcements, target size, 200% zoom/reflow, VoiceOver/Safari and failure recovery are admission gates. `LOCKED LEDGER`
- Motion explains state and respects reduced motion; sticky/collapsible behavior cannot conceal orientation. `APPROVED BRIEF/ARTIFACT`
- Audio never autoplays or becomes required; control, selected-track identity, failure and recovery must be observed. `APPROVED BRIEF/ARTIFACT`
- Hero/map/font/script weight and real-device performance require measured candidate evidence, not source inspection. `LOCKED LEDGER`

## Launch acceptance scenes

1. First-time desktop and 390/320 visitor explains “what is this, what can I do, why this route, what happens next?” then reaches one admitted destination. `APPROVED BRIEF/ARTIFACT`
2. Returning no-Card visitor sees either correctly current episode/news or an evergreen fallback, with corrupted/denied storage and failed data requests. `APPROVED BRIEF/ARTIFACT`
3. Device-local Card visitor gets no account/cross-device claim and can reach the exact local Card/Closet continuation. `LOCKED LEDGER`
4. Verified account-backed Resident state is separately tested with valid, expired, revoked, signed-out and second-device conditions, or remains visibly unavailable. `LOCKED LEDGER`
5. Start Here redirect disabled still presents the ordinary Visitor’s Centre link. `APPROVED BRIEF/ARTIFACT`
6. Map/directory/current/news/media/Buttondown failures preserve core navigation and truthful outcomes. `APPROVED BRIEF/ARTIFACT`
7. Exact clean artifact passes source, browser/native accessibility, performance and bounded public-origin evidence before campaign review. `LOCKED LEDGER`

## Unresolved decisions and non-goals

- Ali has chosen the primary hierarchy boundary: newcomer introduction and one
  primary start; returning current cue and Resident Card resume are distinct.
  Brand/Ali must still approve the exact public language after candidate
  evidence. `ALI CONFIRMED`
- Ali must rule the sitewide visual system after admitted A/B/C evidence; the homepage cannot self-select it. `LOCKED LEDGER`
- Exact responsive composition of The Breaking/The Daily remains open within D-043. `LOCKED LEDGER`
- Revenue, paid placement, destination product decisions, Visitor’s Centre design, episode/news authorship, platform architecture, global brand rules, deployment and campaign publication are non-goals. `APPROVED BRIEF/ARTIFACT`
- No external plugin/service is proposed in initialization; current gaps are authority, contract and admission gaps before tooling gaps. `INFERENCE`

## Reconciliation and approvals

- Town Entry owner maintains this intent, complete entry tree and receiving-product truth. `LOCKED LEDGER`
- Brand & Experience Director admits system fit; Ali makes hierarchy, final visual and campaign-triad decisions. `LOCKED LEDGER`
- Functionality & Platform Director validates the full touchpoint map, readiness projection, identity/reward/analytics contracts and integration order. `LOCKED LEDGER`
- Receiving owners confirm both sides of every promoted handoff. `LOCKED LEDGER`
- Control Room assigns non-overlapping locks and binds exact release/public proof. `LOCKED LEDGER`
