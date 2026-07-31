# Blend & Snap café / Study Pack / weekly handoff build packet

**Status:** SPECIFIED — EXECUTABLE AFTER CONTROL ROOM LOCK  
**Owner:** Blend & Snap champion  
**Trigger:** AW-003 active design wave and D-2026-07-26-050 through 056  
**Candidate direction:** JoJo's pickup rail, pending Ali + independent admission  
**Current write authority:** dossier/evidence only; no live/shared path is
authorized by this packet alone

## Outcome

- **Complete scope:** café arrival, usual, live Special, ORDER/ticket rail,
  receipt, past packs, Study Pack component truth, Try-On/reference/Card/Quiz
  handoffs, noticeboard, media, all visitor states and failures.
- **User problem:** the technically sound incumbent behaves like a large image
  followed by a ledger; mobile hides/crops the native room and primary action,
  and the weekly loop can look complete when components are only planned/held.
- **Intended result:** a first-time or returning visitor can operate the café's
  menu → ORDER → receipt ritual, distinguish every component job/status, take
  one admitted next step and understand the limits of device-local continuity.
- **Evidence:** `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`,
  `OPERATING-SPEC.md`, 2026-07-25 independent rejudge, and
  `championship-20260726/CHAMPIONSHIP-REPORT.md`.
- **Non-goals:** invent a Study Sheet, approve sitewide style, create account
  progress, award rewards, admit held Cards, deploy, or alter shared contracts
  without their owners.

## Lock request

Control Room must name one integration window and exact writable paths before
implementation. Proposed lock:

- primary: `blend-snap.html`;
- candidate art only after visual admission:
  `assets/building-interiors/<approved-blend-snap-delivery>/`;
- manifest/evidence only when component admission changes:
  `content/blend-snap-weekly-packs.json` and this dossier's evidence ledger;
- test paths:
  `scripts/test-blend-snap-browser.mjs`,
  `scripts/test-blend-snap-cross-entry.mjs`,
  `scripts/validate-blend-snap-packs.mjs`;
- excluded until separately locked: shared header/nav, identity, reward,
  Closet, global CSS/JS, episode source, High, Try-On, Trading Cards and all
  public deployment/release records.

## Direction and invariants

Use the isolated pickup-rail candidate as structural evidence, not production
code. Preserve the validated production controller. Dynamic truth remains
HTML. Only `available` links. Quiz stays next door. Local pack stamp means
receipt opened on this browser. The noticeboard is secondary. No image owns a
route, status, schedule, reward or account claim.

External capability recommendation: none for this bounded build. Existing
static data, HTML/CSS/JS and current test harnesses are sufficient; installing
a service would increase risk without solving the identified experience gap.

## Work breakdown

| ID | Work item | Craft owner | Inputs | Output path after lock | Dependencies | Exit evidence |
|---|---|---|---|---|---|---|
| BNS-01 | Independently judge Direction B against A/C and full-resolution art | Independent product + brand/visual judges | Championship report, screenshots, art provenance | Dossier evidence only | Maker/judge separation; Ali taste gate | Blind scores; hard floors ≥17/20; Ali ruling recorded |
| BNS-02 | Bind café-native layout to production controller | Frontend/UX maker | Approved direction, current `blend-snap.html`, operating spec | `blend-snap.html` | BNS-01 + Control Room lock | Existing 90 checks green; no controller regression |
| BNS-03 | Author desktop room and 390/320 mobile composition | Frontend + visual maker | Approved art slots and live control hierarchy | `blend-snap.html` + admitted asset folder | Sitewide style ruling or bounded approved exception | 1440/390/320 captures; no crop/overflow; ORDER visible/obvious |
| BNS-04 | Complete receipt rail interaction/failure states | Frontend/accessibility maker | Functionality map | `blend-snap.html` | BNS-02 | Keyboard/focus/close/retry/live-region/reduced-motion evidence |
| BNS-05 | Reconcile weekly component admission and handbacks | Blend & Snap + Episode/Study Pack/Try-On/Cards/High owners | Manifest, private ledger, exact routes | Manifest + dossier evidence only if changed | Affected-owner sign-off | Every component has status/job/route/evidence; no false handoff |
| BNS-06 | Decide and commission first Study Sheet | Study Pack + learning/content owners; Ali | Learning intake card, concept map, episode content | New path only after separate lock | Owner/content approval | Distinct compact-review job, sources, accessibility and public proof |
| BNS-07 | Build Trading Card authoritative round trip | Trading Cards + platform/reward/Closet owners | Functionality map, locked card economy | Separately assigned shared/service paths | Architecture/identity authority | Two-account/device/replay/duplicate/revoke/Closet evidence |
| BNS-08 | Verify visitor-state matrix and weekly loop | Independent UX/accessibility + product judge | Exact candidate/artifact | Dossier evidence | BNS-02–05 | Named first/return/Card/failure/route-return scenes pass separately |
| BNS-09 | Bind release and measure | Release + analytics owners | Accepted candidate SHA/artifact | Release/analytics paths after authority | All gates | Source/artifact/public parity, rollback, privacy-safe baseline |

## Visitor-state execution matrix

| Scene | Setup | Actions | Required assertions |
|---|---|---|---|
| V1 clean desktop | Empty café/Card storage, valid current data, 1440px | Enter, identify Special, choose no usual, ORDER, open Try-On/reference, back, close | Purpose/ORDER/component jobs understood; no completion/account claim; focus returns |
| V2 clean mobile | Empty state, 390 then 320px | Enter, scroll minimum necessary, choose usual, ORDER, inspect every status | JoJo crop + full live menu; no horizontal overflow; 44/48px targets; DOM/visual order |
| V3 return no Card | Valid usual and last-opened pack | Reload, observe recognition, replace usual, open current then past receipt | “On this device/browser” only; data revalidated; no “studied/caught up” |
| V4 device-local Card | Valid local Card plus café keys | Enter/reload/order | Same product; no membership/sync/ownership enhancement |
| V5 verified account | Controlled signed-in state; café keys absent/present | Enter/order/sign out/second context | No café account read/write or cross-device claim; local values remain bounded |
| V6 storage denied/corrupt | Throw on read/write; invalid values | Select usual, ORDER, reload | Menu remains useful; no false saved message; corrupt value ignored |
| V7 data failures | Missing/invalid/stale/timeout/offline/index disagreement | Load, inspect status, Retry after repair | ORDER disabled; atomic safe message; Episodes fallback; Retry focused; recovery clean |
| V8 component statuses | Fixture each available/held/planned/unavailable | Inspect and keyboard traverse receipt | Only available is link; all labels/jobs legible; Quiz distinctly next door |
| V9 weekly round trip | Exact Episode link to café and each admitted component | Episode → café → component → back/handback → High | Each owner proves receiving result; café never claims downstream completion/reward |
| V10 accessibility/media | Keyboard only, reduced motion, 200% zoom, Safari/VoiceOver; audio success/failure | Complete V1 + play/pause/fail theme | No essential motion/audio; announcements/focus correct; no clipping/loss |

Device-local and verified account-backed Resident Card verdicts remain separate.
An unsupported account enhancement must PASS only as an absent/non-misleading
state, not borrow the local journey's PASS.

## Study Pack admission packet

For every released episode, owners must sign one row:

| Component | Unique learner job | Admission evidence | Missing-work disposition |
|---|---|---|---|
| Episode | Narrative encounter: why this matters | Published episode identity + owner acceptance | Never inferred from café |
| Study Sheet | Compact review of the episode's durable model | Learning intake, source/content review, exact route | Currently owner decision, then build |
| Try-On | Apply the concept to one real task | Issue-specific route + local/failure/accessibility evidence | Repair remains owned by Try-On |
| Cheat Sheet | Durable lookup/print reference | Content/source/print/mobile/public evidence | Admit only exact accepted asset |
| Trading Cards | Remember/collect concepts without claiming mastery | Card content + authoritative issuance/ownership proof | Held while full build remains required |
| Quiz | Check understanding and own assessment/reward | High owner acceptance + exact route | Always visibly outside/next door |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Required result |
|---|---|---|---|
| Product/content quality | Moderated newcomer + returning comprehension; component-job explanation | Product/learning judge | ≥17/20 and all scenes truthful |
| Accuracy/safety/trust | Manifest/index disagreement, status/route admission, persistence/account wording | Trust/data judge | ≥17/20; no false availability/completion |
| LAiDIES brand | Full-resolution room/JoJo/object review against approved references | Independent brand/visual judge + Ali | ≥17/20 plus Ali approval |
| UX/accessibility | V1–V10; keyboard, focus, 200%, VoiceOver, reduced motion, 320/390 | Independent accessibility judge | No P0/P1; all core journeys pass |
| Technical/data integrity | Validators and browser/cross-entry suites on source and exact artifact | Independent technical judge | All green; exact candidate identity recorded |
| Cross-building loop | Sender/receiver/return proof for every admitted route | Affected champions + product judge | No orphan, false handback or borrowed completion |
| Release | SHA/artifact manifest, deploy binding, public-origin parity, rollback drill | Release judge | VERIFIED PUBLICLY only after exact origin pass |

Commands to run after the lock-bound implementation:

```sh
node scripts/validate-blend-snap-packs.mjs
node scripts/test-blend-snap-cross-entry.mjs
node scripts/test-blend-snap-browser.mjs
node scripts/check-product-stewards.mjs --owner-entry blend-snap
```

The browser suite must be extended or accompanied by evidence for V4, V5,
native 200% zoom, Safari/VoiceOver, exact receiving outcomes and the locked
candidate; the existing “90 checks” cannot lend those claims a PASS.

## Integration, release and rollback

- Affected champions: Episode/Chick Flicks, Study Pack, Try-On, Trading Cards,
  High, printables/content, Closet/rewards, analytics, release and every
  admitted noticeboard destination.
- Exact candidate: Control Room records the commit SHA plus hashes of the live
  HTML, manifest and admitted art before release.
- Release authority: Control Room/release owner; this packet grants none.
- Rollback: preserve the last exact accepted artifact; restore that full
  artifact/version and manifest together, then repeat public-origin checks.
- Public verification: clean and returning contexts at desktop/mobile,
  failure/retry fixture or controlled equivalent, all admitted routes, headers,
  media, console/network and exact build identity.

## Measurement and learning

- Baseline: none; clicks/orders are not learning evidence.
- Proposed privacy-safe events: `blend_snap_viewed`, `usual_selected`
  (occurrence only), `pack_menu_opened`, `pack_component_opened`,
  `pack_data_failed`.
- Success: first-time visitors identify the correct next action/component job;
  returning visitors understand local continuity; zero false status/account
  interpretations; admitted handoffs reach their intended result.
- Failure: repeated Retry, component-route exits, false completion/sync
  interpretation, inaccessible receipt or failed return path.
- Review: each episode/manifest change and 30 days after a valid baseline.
- Dossier updates: state, backlog, functionality map, admission evidence and
  learning log after each material result.

