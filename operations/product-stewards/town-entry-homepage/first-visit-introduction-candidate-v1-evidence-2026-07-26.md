# First-visit introduction candidate v1 — build and admission evidence

**Product:** `town-entry-homepage`  
**Owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Status:** `VERIFIED LOCALLY — INDEPENDENTLY ACCEPTED FOR ISOLATED CANDIDATE`  
**Evidence time:** `2026-07-26T13:25:09-07:00`  
**Authority used:** isolated owner prototype and dossier only. No live route,
shared source/token, deploy, publication, spend or external-account mutation.

## Literal visible candidate

`operations/product-stewards/town-entry-homepage/prototypes/first-visit-introduction-v1`

Local review URL:
`http://127.0.0.1:4180/?state=first&legacy=1`

State fixtures:

- first visit: `?state=first`;
- returning without Card: `?state=returning`;
- Resident Card presentation: `?state=resident`; and
- interactive reviewer controls: add `&review=1`.

The candidate uses the exact current masthead asset
`main-street-dusk.webp`, SHA-256
`4efec0f4ed1a8211b07b2db633f7c373ca3001485b43c05cefe850d0b6b19d3b`.
It does not rebuild, filter, crop into a new composition or replace the
luminous-dusk baseline.

## Proposed hierarchy

1. Domain-continuity notice only after legacy arrival.
2. Evergreen masthead answering: what LAiDIES is, what to do, where to start
   and whether an account is required.
3. Exactly one primary newcomer action: a 60–90-second Welcome Wagon
   introduction.
4. State-specific arrival:
   - first visit → introduction first;
   - returning/no Card → current admitted lesson first; and
   - Resident Card → only a proof-bounded resume cue.
5. Separate current-episode module below the hero. In the absence of a complete
   owner-admitted atomic record it labels Episode 04 as a previously published
   fallback; it never mixes fresh and hard-coded fields.
6. SUNNYVAiLE practice and directory routes only after the visitor understands
   the episode-first learning rhythm.

The Welcome Wagon link is explicitly limitation-labelled because the
Visitor's Centre owner has not admitted the receiving experience for this
newcomer promise.

## Route and acquisition verdict

Town Entry **ACCEPTS the sequence and canonical destination category, while
HOLDING the exact public wording for Brand/Ali approval**:

`approved category message → https://laidies.ai/ → one admitted episode or
one useful route → optional SUNNYVAiLE practice → optional Resident Card`.

- General acquisition/profile destination: `https://laidies.ai/`.
- Source-specific post: exact owner-admitted Issue route.
- `/start-here.html`: not the canonical general-acquisition destination while
  it continues through `/visitors-centre`; retain it as the Welcome
  Wagon/orientation and legacy handoff.
- Audience packet consumed exactly:
  `../audience-growth/FIRST-VISIT-ACQUISITION-AND-DOMAIN-CONTINUITY-2026-07-26.md`,
  SHA-256
  `d3687caf24681eddf34e4e89fba8e02ecfd48d514ef57d2574d021b4706d5fb4`.
- The category and first-visit sentences in that packet are suitable
  functional candidates, not approved public copy.

Fresh public HTTP evidence in the Audience packet proves old apex/`www`,
HTTP/HTTPS, Issue paths and tested queries redirect permanently to
`laidies.ai`. The tested old `/start-here.html` path takes three redirects to
`/visitors-centre`; query preservation passes. Fragment, unknown-path,
monitoring, cache/search migration and rollback remain Platform-owned.

## Visitor-state contract

| State | Primary hierarchy | Truth boundary |
|---|---|---|
| First | Welcome Wagon before current content | no identity, progress or Card inferred |
| Returning/no Card | admitted current content before Welcome Wagon | device visit only; no saved progress |
| Resident Card | proof-bounded resume cue; public routes unchanged | no cross-device/account restoration claim without authoritative projection |

Query fixtures demonstrate presentation only and do not represent production
state detection.

## Measurement contract

Proposed privacy-safe funnel:

`entry_viewed → entry_primary_start_selected → entry_intro_started →
entry_intro_completed → entry_episode_selected → entry_practice_selected`.

State/resume supporting events:
`entry_nav_opened`, `entry_state_action_selected`, `entry_resume_selected`,
`entry_route_failed`.

Permitted properties are controlled enums only: visitor-state class, legacy
arrival boolean, compact/wide viewport class, approved route key, admitted
content-record key and failure class. Prohibited: email, identity, search
text, local-storage values, raw URLs/query strings, prompts, recordings and
free text. The prototype records only an in-memory `window.prototypeEvents`
array; no provider receives data. Platform/Privacy admission is required
before production instrumentation.

Success measures:

- first-visit correct explanation of the story → lesson → practice rhythm;
- one primary-start selection without competing hero-action confusion;
- admitted destination arrival;
- returning current-module use; and
- zero account-required misconception.

Raw clicks alone are not success.

## Maker evidence

- `npm run build`: PASS, Vite production bundle.
- `npm run test:sites`: PASS, 4/4 worker/static/fallback packaging checks.
- 1440 first visit: PASS, exact masthead and one primary start.
- 390 first visit: PASS, `scrollWidth=390`, CTA bottom `682` within 844px
  viewport.
- 320 first visit: PASS, `scrollWidth=320`, complete 284px-wide CTA.
- 720 layout proxy: PASS, `scrollWidth=720`.
- first-state order: `hero → state → welcome → current → town`.
- returning/Resident order: `hero → state → current → welcome → town`.
- mobile menu: opens, Escape closes, focus returns to Menu; navigation
  selection closes it.
- no blocking external font request; content uses local/system fonts.
- browser diagnostics: no error-level entries observed.

Evidence renders and their hashes are recorded in
`prototypes/first-visit-introduction-v1/design-qa.md`.

Source hashes:

- `src/App.jsx`
  `31954ef5616a6f579553dfa2a7dd97caf951781d10aebcf252dafdd493bca7aa`
- `src/styles.css`
  `edab9704bc0a03cb42a6902fccf24da680a8020c930ab282462d46ef2e533b47`
- built JS
  `de6a33755160fad6d373d8d644a490e92dcfe67a6d9e8122ed9783b95364f3a1`
- built CSS
  `8d7db30b0cba38db358f949445ae0b9308d7752ce9a1e21b9a3173c1d8c34b91`

## Acceptance and remaining limits

Independent Town Entry product acceptance **ACCEPTED** this exact source/hash
pair for hierarchy, first-screen presentation, state distinction, fallback
truth, responsive behavior and masthead invariance in
`evidence/first-visit-introduction-v1-independent-2026-07-26/INDEPENDENT-VERDICT.md`,
SHA-256
`516f0aafca6575b082b79a7ee4fe1692b60a7168aa9be33c15c9a4c50aaf2c1a`.
Brand/Copy now rules the exact language. Visitor's Centre accepts the receiving Welcome Wagon
experience. Weekly Episodes supplies the atomic current record. Platform/
Privacy admits production state detection, redirect monitoring and the event
dictionary.

Native Safari, VoiceOver/assistive technology, actual 200% browser zoom,
clean-user comprehension, production performance and public-origin behavior
remain unproved. No route-level patch should begin until the remaining owner
acceptances and a fresh Control Room integration lock.

**Evidence-backed improvement opportunity:** replace the present four-answer
micro-grid with one short category paragraph plus a compact “Episode first;
town second; no account” line if clean-user testing shows scanning cost. This
is a copy-density reduction within the accepted hierarchy, not a new visual
direction.
