# Chick Flicks product operating specification

**Status:** SPECIFIED — reconciled for the
`EXACT_ARTIFACT_CATALOGUE_AND_DISCOVERY_TEST` trigger on 2026-07-25. Local
implementation and independent review remain separate states.

## Identity and purpose

- **Product:** The Chick Flicks
- **Parent building/product:** none; Screening Room is a child experience
- **Product type:** building and episode-discovery catalogue
- **Audience:** a first-time or returning LAiDIES visitor choosing a released
  episode by sequence or interest
- **User job:** understand what is available, choose one useful tape and reach
  the correct episode without mistaking a shelf action for watching, listening
  or completing it
- **Why LAiDIES offers it:** the video-store metaphor makes a growing season
  memorable, collectible and browsable while keeping episode access free
- **Distinct contribution:** one canonical public storefront for episode
  discovery, replacing the retired `/episodes` catalogue
- **Explicit non-goals:** judging episode learning or media craft; approving
  motion films; tracking completion; granting rewards; creating an account
  history; paywalls, late fees or fulfilment; inferring user ability or
  sensitive interests

## Experience model

- **Diegetic metaphor:** a warm Rewind Era video-rental store with New Releases,
  topic aisles, a rental card and a Screening Room
- **Ten-second comprehension:** these are LAiDIES episodes; released tapes open
  the full issue, dimmed tapes are forthcoming, aisles filter the same season,
  and choosing/favouriting a tape is not completion
- **New-user journey:** enter → see the latest verified released tape → learn
  that Episode 01 is the starting point → browse all tapes or one aisle →
  inspect released/forthcoming state → open the released issue or receive an
  honest forthcoming explanation → choose an optional next route
- **Returning-user journey:** enter → see the latest verified released tape and
  an honest device-only last rental/favourite if present → select that or
  another available tape → open its issue
- **Anonymous/signed-in differences:** none currently proven. Catalogue state
  and favourites are browser/device-local even if shared site chrome exposes
  authentication
- **Mobile/desktop/accessibility:** the same catalogue and state must remain
  available at 320/390/1280px; controls are native buttons/links; dynamic
  status is announced; selected/forthcoming detail receives logical focus;
  no interaction depends on hover, motion, colour or a wall image; reduced
  motion removes scripted smooth scrolling and transform transitions
- **Empty/loading/error/offline/retry:** loading copy makes no release claim;
  an empty valid index, invalid JSON/schema, missing index, unavailable
  destination or broken cover cannot manufacture a rentable tape. The page
  retains an understandable catalogue-unavailable state and retry action.
  A broken cover does not block an otherwise verified issue route

## Mechanics and rules

- **Inputs:** `content/episode-index.json`; selected aisle; selected tape;
  device-local `laidies_favorite_episode` and `laidies_cf_last_rental`
- **Core actions:** filter the catalogue, inspect a tape, open a verified
  released issue, save/remove a device favourite, retry a failed manifest,
  optionally play Becky's audio spot or open the trailer listen-along
- **Authoritative completion event:** none inside Chick Flicks. A successful
  store handoff is navigation to the verified local `issueUrl`
- **Outputs/visible result:** accurate latest-release arrival, aisle count,
  released/forthcoming tape state, focused rental/forthcoming detail,
  device-only favourite result and a safe issue link
- **Replay/return loop:** catalogue may remember last rental and favourite on
  this browser/device only. Clearing/blocking storage removes that memory
- **Catalogue availability rule:** a tape is rentable only when its record has
  a positive integer/unique episode number, non-empty title,
  `status: "published"`, a same-origin HTTP(S) local issue URL and an existing
  destination in the exact artifact/browser verification. Everything else is
  unavailable/forthcoming or rejected as invalid data
- **Latest rule:** choose the highest-numbered currently rentable episode from
  the authoritative index. Describe it as **latest released**, not “this
  Wednesday,” “new this week” or current unless a separately approved
  freshness contract proves that claim
- **Aisle rule:** each configured number maps to at most one episode. An aisle
  count uses the catalogue availability rule, not status text alone. An empty
  aisle says no tapes are filed there; an aisle containing only forthcoming
  entries still renders and labels them honestly
- **All-tapes/default rule:** All tapes is derived from every validated index
  record, never a copied number list. Topic aisles remain curated. Any record
  absent from every topic mapping is visibly available under **Unfiled**, so
  index growth cannot disappear behind a stale taxonomy
- **Release-status rule:** `published` is eligible for destination
  verification; `draft` alone means forthcoming. Cancelled, removed, held,
  missing and unknown values are unavailable and cannot become a future
  promise
- **Favourite rule:** saving is reversible and device-local. Storage failure
  is visible and cannot produce saved/member/account language. Favourite does
  not mean rented, opened, watched, listened or completed
- **Abuse/edge/race cases:** duplicate/non-integer numbers, absent title,
  unsafe/external/data/JavaScript URL, missing local destination, delayed or
  rejected fetch, malformed/partial JSON, missing cover, storage getter/setter
  failure, stale prior local keys and rapid aisle selection fail closed

## Content and learning

- **Format-specific job:** discovery and routing, not a standalone lesson
- **Learning/behaviour outcome:** the visitor can choose an available episode
  by order or relevant aisle and understands what action will happen next
- **Correct mental model:** the tape is a catalogue control; the issue and
  Screening Room are distinct receiving experiences
- **Misconceptions addressed:** “New” does not mean current without dated
  evidence; a rental/favourite is not completion; a trailer/listen-along is
  not an approved motion film; a forthcoming tape is not playable
- **Evidence/date sensitivity:** titles/statuses/routes come from the episode
  index. Current-week freshness is time-sensitive and presently has no locked
  threshold or complete fan-out authority
- **Analogy and limit:** “rent” makes selection memorable, but nothing is paid,
  due, returned or fulfilled and no learning record is created
- **Assessment/transfer evidence:** not applicable inside the catalogue;
  learning quality and assessment belong to Episode Experience/High
- **Relationship to ecosystem:** Episode Experience owns episode purpose and
  continuation; Screening Room owns playback; Episode Media Quality owns
  audiovisual approval; High/Blend & Snap/Post Office own receiving routes
- **Next useful experience:** a verified issue route first; illustrated,
  captioned Screening Room listen-along when explicitly chosen; Study Pack,
  quiz or delivery only as honest optional handoffs

## Visual, voice and media

- **Current direction:** bright graphic-novel video-store room; dark navy,
  cyan, pink, mint and paper palette; VHS boxes and rental-card grammar
- **Approved status:** the current room and rental-card filenames are
  `candidate-v1`; technical use exists, but owner visual approval is not
  established by this specification
- **Character/location/canon:** Becky is the keeper; no new character or
  illustration is authorized in this cycle
- **Voice:** warm, specific and lightly funny. “Be kind, rewind” and spiritual
  due dates may decorate an honest action but cannot conceal state
- **Required states:** loading, released, forthcoming, empty aisle, manifest
  failure/retry, broken cover, selected issue and device favourite
- **Motion/audio/narration:** interaction motion respects reduced-motion.
  Becky's spot and trailer audio are optional. Screening Room wording is
  “illustrated listen-along” with captions where verified
- **Prohibited claims/assets:** no trailer/Episodes 1–4 motion-film approval;
  no “whole town in one watch”; no unapproved replacement visual; no retired
  or superseded media candidate; no claim that a local review export is public
- **Owner decisions still required:** final wall/rental-card visual approval;
  any future motion-film promotion; any new catalogue visual/taste direction

## Technical and operational contract

- **Routes/files:** `/chick-flicks.html` (canonical),
  `/episodes.html` (redirect), `content/chick-flicks.css`,
  `content/episode-index.json`, episode box assets, local issue pages
- **Frontend modules:** inline catalogue controller; shared header/auth/tour;
  KSVL player; `sv-trailer-player.js`
- **Backend/providers:** none for catalogue mechanics
- **Authoritative stores:** episode index for local catalogue records; exact
  artifact for destination/asset presence; localStorage for non-authoritative
  device memory
- **Identity/session:** no verified identity binding
- **Persistence/cross-device:** none; favourites/last rental are device-local
- **Reward/economy:** none
- **Privacy/security:** do not send favourite, last rental, full interests,
  identity or episode content in analytics. Reject unsafe/non-local issue URLs
- **Performance/reliability:** catalogue remains usable without cover art;
  manifest/destination checks abort after five seconds and fail closed into
  the retry state; catalogue remains usable without cover art; no auto-play.
  A retry moves focus to the loading heading, then to the visible retry on
  failure or restored latest action/heading on success
- **Costs/limits:** static delivery plus existing analytics/audio bandwidth;
  no new paid capability authorized
- **Fallback/rollback:** remove/hide catalogue expansion or restore the last
  exact locally verified storefront if a candidate cannot pass; never promote
  unavailable media to fill the wall

## Analytics and customer evidence

- **Candidate events, not approved instrumentation:**
  `chick_flicks_view`, `episode_aisle_selected`,
  `episode_tape_selected`, `episode_rental_handoff`,
  `episode_coming_soon_seen`, `episode_favourite_changed`,
  `chick_flicks_error`
- **Privacy-safe properties:** episode number, release-state category, aisle
  ID, viewport class and error category only
- **Prohibited properties:** name/account/email, raw storage values, session
  replay-derived private data, full content or inferred interests/ability
- **Baseline:** not available; analytics ingestion is not wired
- **Success:** first useful released-episode handoff and low recovery/error
  rate, paired with comprehension evidence
- **Guardrails:** forthcoming/media/favourite truth, no completion proxy,
  privacy and accessibility
- **Review cadence:** on episode-index/media/public-promise change and weekly
  episode release; aggregate health review after approved instrumentation
- **Unresolved:** Platform/Privacy approval, Plausible/Clarity configuration,
  baseline and thresholds

## Dependencies and ownership

- **Parent champion:** Chick Flicks champion
- **Subchampions:** Screening Room; Episode Media Quality
- **Required guilds:** product; frontend; data/integration; UX/accessibility;
  brand; release QA; Episode Product Owner; media roles only when their
  separate trigger runs
- **Upstream:** episode index, issue pages, box assets, shared header/tour,
  Platform release builder
- **Downstream:** Episode Experience, Screening Room, Blend & Snap, High, Post
  Office, Resident Card/local profile
- **Cross-product handoffs:** index/freshness to Episode Experience/Platform;
  playback copy to Screening Room; all motion approval to Media Quality;
  favourite/account truth to Identity/Rewards. Homepage, directory, welcome
  tour, tour check-in and trailer-issue Chick Flicks entries use
  released/forthcoming truth rather than unsupported weekly freshness
- **Freshness owner:** Episode Experience/Platform for the index; Chick Flicks
  re-verifies on every index change
- **Known dependency gap:** the registry names
  `screening-room/CHARTER.md`, but that dossier is absent. No Screening Room
  rule is inferred beyond current `watch.html`, Episode Experience evidence
  and the locked media hold

## Acceptance and release

- **Product/content quality:** new/returning journeys and all aisles select a
  useful released/forthcoming state; 17/20 floor
- **Accuracy/trust:** latest/forthcoming/favourite/media language matches
  index, destination, storage and media authority; 17/20 floor
- **Brand:** rental metaphor clarifies instead of obscuring; 17/20 floor;
  owner visual approval remains separate
- **UX/accessibility:** exact source and artifact at 320/390/1280; keyboard,
  focus, live status, target size, reduced motion, 200% reflow and degraded
  states; Safari/VoiceOver/public checks remain separate
- **Backend/data/reward:** valid schema/unique numbers/safe URLs/existing
  destinations; no reward/account claim
- **Visual/media:** broken-cover fallback passes; current visuals still need
  owner ruling; motion trailer/Episodes 1–4 remain HOLD
- **Exact candidate/release/public:** source/artifact hashes and deterministic
  journeys; independent judge; deployment/public-origin verification later
- **Current status:** SPECIFIED. This cycle may reach VERIFIED LOCALLY only for
  the bounded catalogue/discovery candidate. It cannot approve media craft,
  content learning quality, deployment or promotion

## Unresolved decisions

1. Exact freshness threshold and release-date semantics for “new/current this
   week.”
2. Canon-to-index generation authority and correction owner.
3. Whether a favourite ever becomes an account-synced Resident Card field.
4. Final room/rental-card visual approval.
5. Screening Room's missing product dossier and full player contract.
6. Approved analytics/Clarity/privacy configuration and thresholds.
7. Future motion-film availability title by title.

## Source trail

- Ali/product-owner direction and `operations/ACTIVE-WORK.md`, accessed
  2026-07-25.
- `CHARTER.md`, `launch-deep-dive-2026-07-25.md`, `state.json`,
  `backlog.md`, current source and `content/episode-index.json`, inspected
  2026-07-25.
- Episode Experience charter/deep dive/state/backlog and Episode Media Quality
  charter/spec/release gate. All motion trailer/Episodes 1–4 remain HOLD.
- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/), accessed 2026-07-25:
  keyboard, focus order, reflow, status messages, reduced interaction motion
  and target-size requirements inform the accessibility contract.
- W3C, [Understanding Focus
  Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html),
  accessed 2026-07-25: programmatic focus after dynamic tape selection must
  preserve meaning and operability.
- BTB-054/056/069/094/095 prevention rules: explicit runtime manifests and
  exact artifacts; clean release verification; interface actions are not
  outcomes; media style and narration alignment require separate evidence.
