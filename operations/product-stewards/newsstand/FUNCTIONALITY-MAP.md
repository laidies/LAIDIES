# NewsStand functionality and cross-page touchpoint map

**Status:** FUNCTIONALITY RECOVERED — SOURCE-RECONCILED; BOUNDED LOCAL READER
AND REVIEW-ROUTER PROOF ONLY  
**Product/building owner:** NewsStand product champion  
**Functionality & Platform Director:** review pending  
**Trigger:** targeted owner-entry preflight failed because this map and the
experience brief did not exist.

This is a contract and gap register. It does not approve a story, visual,
account/reward behavior, shared-system edit, deployment or public state.
Current source was inspected on 2026-07-26; changing publication claims still
require a dated source and public-origin recheck.

## 1. Complete capability inventory

| Capability/element | User trigger and page | Intended visible result | Current implementation/evidence | Status |
|---|---|---|---|---|
| Building arrival and Paige | Enter `/newsstand.html` | Recognize a NewsStand, its keeper and the evidence-first job | Candidate Paige/rack room image plus live address/copy | OBSERVED; final visual/comprehension approval missing |
| Daily-first edition navigation | Enter page or choose Daily, Weekly or Big Picture | See today's complete Daily by default; switch to the complete Weekly or searchable Big Picture without losing state; each control has live name/job/date/state text | Current source still uses four equal paper buttons, including permanent Breaking and retired Big Question display copy | SUPERSEDED IMPLEMENTATION; BUILD REQUIRED |
| Persistent Find a story utility | Search, browse topics or choose All stories directly beneath the edition controls | Find eligible current and older work across Daily, Weekly, Big Picture, STRAiGHT TALK, Dear Miss Jeeves and admitted departments without treating search as a fourth edition | Current source searches eligible NewsStand headline/topic/source/tag text and builds topic buttons from raw story tags; it does not provide the confirmed governed cross-content-type topic/alias register, filters or result contract | PARTIAL; SUCCESSOR BUILD REQUIRED |
| Conditional Breaking strip | Qualified new development exists | Show a time-bound interruption above edition navigation; disappear completely on a clear day | Current source represents Breaking as a permanent paper control | SUPERSEDED IMPLEMENTATION; BUILD REQUIRED |
| Preserved Paige/rack evidence | Enter NewsStand | Reuse only place/Paige craft that supports the Daily-first newspaper | Prior four-paper rack evidence exists locally | EVIDENCE ONLY; FOUR-EQUAL-PAPER NAVIGATION INELIGIBLE |
| Global desk state | Page load | Dated clear/current/degraded result; no filler | `datasetState`, `effectivePublicationState` and arrival copy | VERIFIED LOCALLY for fixtures; freshness is time-relative |
| Complete Daily/Weekly issue | Enter Daily or choose Weekly | Newspaper hierarchy with lead, secondary reporting, governed departments, dates, sources, corrections and honest empty states | Current reader exposes eligible story cards and individual bodies, not the complete confirmed issue architecture | BUILD REQUIRED |
| Big Picture index | Choose Big Picture | Search/browse eligible questions and investigations, then open the exact feature | Current `tribune` path exposes a paper/story reader, not a complete searchable feature index | BUILD REQUIRED; MACHINE COMPATIBILITY KEY RETAINED |
| Full story/direct hash | Open a story or `/newsstand.html#slug` | Eligible explanation and sources, or truthful blocked-route notice | `renderHash` + central `accessDecision` | VERIFIED LOCALLY for paper/search/hash suppression |
| Article explanation | Read eligible story | Story/argument, LAiDIES read, consequence, watch points, sources, dates and tags | Inline renderer over canonical JS data | OBSERVED; representative human quality set incomplete |
| Correction/retraction display | Open changed preserved route | Dated correction with body, or retraction notice without body | Schema/renderer plus synthetic three-stage drill | VERIFIED LOCALLY on fixtures; no real production transaction |
| Material follow-up article | New evidence materially changes, confirms, overturns, expands or resolves a prior story | A new dated article explains the earlier report, new information, impact and why; it receives its own sources/review/release identity | Current schema can only mutate one story record's `updatedAt`/status; no lineage object | BUILD REQUIRED — SILENT MEANING-CHANGING REWRITE FORBIDDEN |
| Bidirectional Story so far | Open old/new article, search result, topic or Catch Me Up | Newer reporting and Earlier reporting links plus complete dated chain/current marker | No canonical predecessor/successor relationship or cross-surface propagation | BUILD REQUIRED |
| Narrow retraction tombstone | Exact LAiDIES article is fundamentally unreliable/unsafe and bounded correction cannot responsibly preserve its body | Old URL retains headline/dates/reason/owner/new explanation while suppressing unreliable body | Current retraction object/body suppression fixture exists | PARTIAL MECHANICAL PROOF; EDITORIAL THRESHOLD, NEW EXPLANATION AND PUBLIC TRANSACTION MISSING |
| Put paper back | Activate close | Close reader and restore invoking control/fallback | `#ns-return`, focus logic | VERIFIED LOCALLY in headless Chrome |
| Back/Forward recovery | Browser navigation after paper/search/story | Restore query, card, focus and reachable/clamped scroll, then re-evaluate access | `history.state` + observable `newsstand:history-restored` | BOUNDED LOCAL PASS; Safari/native AT and cleanup reliability open |
| Back-issue search | Submit word/phrase query and optional topic/content-type/date filters | Eligible results only with title, content type, payoff, topics, published/updated date and correction/archive state; preserve query/filter/position on return | In-memory search over canonical NewsStand story array; no admitted cross-content index or filter contract | PARTIAL; CURRENT EXACT-TEXT SEARCH VERIFIED LOCALLY |
| Governed topic discovery | Choose a topic or a More on this topic link | One plain-language topic introduction, useful current starting point and every eligible related result across content types | Current buttons are derived directly from free-form story tags | BUILD REQUIRED — TOPIC/ALIAS REGISTER AND RELATIONSHIP AUTHORITY MISSING |
| Visible clickable story topics/tags | View a result/article or activate one of its labels | Every published item shows exactly one primary browse topic and one to four governed specific tags; a click opens the complete eligible cross-content result set and announces label/count | Canonical story records already carry free-form `tags[]` mixing topics, entities, sectors, mechanisms and event types; the reader displays them as non-linked Filed under text and topic buttons can search an exact raw tag | PARTIAL EVIDENCE; TAXONOMY REVIEW, GOVERNED REGISTER, CLICK ROUTE AND PUBLICATION GUARD BUILD REQUIRED |
| Progressive archive discovery | Choose All stories, date order, recent or content type | Complete eligible index with oldest/newest controls; no old item disappears because of age | Private recent/complete/topic proof only | VERIFIED IN ISOLATED PROOF; NOT IN LIVE SOURCE |
| Quiet/hold/stale/unavailable/no-data/load-failure | Data or time state changes | Nothing misleading appears current; body suppression is consistent | Central reader contract and ten fixtures | VERIFIED LOCALLY; public-origin drill absent |
| Source links | Open cited source | New tab to exact source with vendor label where applicable | Story `sources[]`, `noopener` | OBSERVED; link availability/currentness/public-day check required |
| Stand audio | Click “Play The Newsstand” | Play/pause optional static track; recover on error | `new Audio('/content/music/sunnyvaile-newsstand.mp3')` | OBSERVED; native media/accessibility evidence open |
| Global navigation | Header/footer links | Reach plain-language neighboring products | Static links to home, Episode, Library, activities, Visitor's Centre, KSVL, Post Office and MAiKEOVER | OBSERVED; downstream completion is separate |
| Homepage/Visitor's Centre discovery | Select NewsStand from route, utility card, map or directory | Arrive with truthful current-or-limited expectation | Multiple `/newsstand.html` links; Visitor's Centre names freshness limits | OBSERVED |
| Homepage Breaking/Daily handoff | Active qualified story or Daily issue | Conditional current headline handoff; Breaking collapses on clear day | Locked direction and isolated private proof; not in `index.html` production source | MISSING FROM LIVE SOURCE |
| Wednesday Tour check-in | Merely load `/newsstand.html` | Shared tour progress should represent the accepted NewsStand completion event | `sv-tour-checkin.js` auto-writes on DOM ready | OBSERVED; completion truth gap |
| Full Ritual/FAiRY Plays propagation | NewsStand is one of eight visited routes | If all eight accepted steps complete, device-local reward/Closet event updates | Shared localStorage keys and episode fetch | OBSERVED; no account/server proof and NewsStand failure does not block check-in |
| Generic analytics | Page view / provider script | Privacy-safe product evidence | Plausible script loads; no NewsStand event adapter or delivery proof | MISSING PRODUCT CONTRACT |
| Public release/rollback | Accepted canonical dataset and artifact | Exact deployed reader, dated public verification and recoverable prior version | Bounded source/artifact hashes only | MISSING END-TO-END OPERATION |

## Visitor-state recognition and continuity

| Visitor state | Recognition source and proof scope | State loaded | Experience difference | Writes/services allowed | Cross-page continuity | Failure/fallback | Current verdict |
|---|---|---|---|---|---|---|---|
| First-time visitor | No NewsStand/Card/account state required | Public dataset and current time | Full four-job orientation; no invented history | Static reads; history state; current tour module also writes a visit | Stable public/hash routes only | Fail closed on invalid/missing/stale/held data | BOUNDED READER PASS; comprehension/visual/public proof open |
| Returning, no Resident Card | Same-tab `history.state`; separate local weekly-tour key may show route visit only | Paper/search/hash view in same browser history | Restore exact tested view and re-evaluate access; no durable reading history | History replace; shared tour visit write | Homepage/Closet can consume tour/reward keys; not story history | Clamp forged/unreachable scroll; safe focus fallback | BOUNDED SAME-TAB PASS; durable return promise absent |
| Resident Card — device-local | NewsStand reads no Card; other scripts may hold one | Same public dataset/history/tour state as anonymous visitor | None; no unlock, ownership, sync or personalization | Same as anonymous | Separate Card/tour/reward systems only | Ignore Card failure for publication access | HONESTLY NO CARD-SPECIFIC BEHAVIOR |
| Resident Card — verified account-backed, if supported | No accepted NewsStand auth/session lookup | None beyond public state | None; no saved/synced/private reader state | No account write/service authorized | Header links to sign-in only | Fall back to public NewsStand | ACCOUNT EXPERIENCE MISSING; NO CLAIM ALLOWED |

Transition verdicts:

- first visit → leave → new session: no NewsStand-specific durable resume;
- first/returning → local Card → same-device return: no NewsStand difference;
- local Card → account, sign-out, update, deletion/revoke and conflict: no
  NewsStand consumer exists;
- second tab/device: publication truth reloads from public bytes, but
  paper/search position does not sync;
- storage denied/corrupt: NewsStand reader still works, while the shared tour
  write silently fails and cannot prove progress;
- direct/referral hash: access is re-evaluated and blocked truthfully when the
  story is held, stale, retracted, unavailable or missing.

## 3. Producer → store/service → consumer map

| Capability/data object | Producer page/event | Frontend/module | Backend/service/provider | Authoritative store/schema/key | Consumer pages | Identity/persistence scope | Current truth |
|---|---|---|---|---|---|---|---|
| Four publication definitions | Locked ledger/editorial rules | Reader contract + HTML edition map | None | `operations/engine/LEDGER.md`; `content/newsstand.schema.json` | NewsStand; directory; homepage copy; publication dossiers | Public/canonical | Exact names/jobs locked; consumers not all reconciled |
| Radar candidate | Twice-daily operating rule or manual research | Candidate JSON + review router | No proved repository scheduler/service for the complete radar | `operations/newsstand-radar-log.md`; private radar packet | Editorial reviewers only | Private editorial | Rule/log exist; complete producer service and state reconciliation not release-proved |
| Legacy RSS candidate | Manual GitHub workflow dispatch | `scripts/update-hot-goss.py` | GitHub Actions + RSS + optional Anthropic | Seven-day `content/hot-goss-feed.json` artifact | No live page | Private/review only | Deliberately disconnected orphan, not publication |
| Review-router decision | Candidate bytes | `evaluate-newsstand-autopublish.mjs` | Local/CI process | Policy JSON + candidate schema + result | Independent reviewer | Private/cross-run identity absent | Only REJECT/HOLD; root duplicate rejection; recursive/schema/receipt gaps |
| Source/claim evidence | Research/editorial review | Private evidence JSON | Web retrieval is manual; no immutable receipt service | `newsstand/evidence/stories/*.json` | Editorial/accuracy; story `sourceApproval.record` | Private evidence | Two manifests; no retained-byte/hash/decision ledger |
| Publication dataset | Authorized editorial integration, currently manual | `content/newsstand-stories.js` | Static deployment | `window.NEWSSTAND_DATA`, schema v1.0.0 | Reader, validators, learning inventory | Public/artifact | Canonical runtime input; no transactional writer/append-only history |
| Publication freshness | Editor/recheck event | `effectivePublicationState` | Browser clock; no source-recheck runner | publication/story `lastCheckedAt`, `maxAgeHours` | Arrival, paper, search, hash | Public/time-relative | Central gate works on fixtures; renewal operation missing |
| Correction/retraction | Accuracy/editorial owner | Story object + renderer | No intake/ledger/propagation service | Story fields + evidence file | Paper, search, hash; future homepage and other consumers | Public plus private evidence | Synthetic drill only; real authoritative lifecycle missing |
| Reader/search view | Paper/search/story event | Inline NewsStand controller | None | DOM + `history.state` | Current tab | Session/history only | Bounded restoration pass |
| Tour visit | DOM ready on `/newsstand.html` | `content/site/sv-tour-checkin.js` | Fetches episode index only for reward metadata | `laidies_tour_<ISO-week>` | Homepage tour state | Browser/device | Route arrival, not authoritative NewsStand outcome |
| Ritual/reward | Eighth route check-in | Shared tour module | No server sync; optional episode-index fetch | `laidies_fairy_plays`, `laidies_tour_last_rewarded_week`, `laidies_ritual_done` | Closet/reward projections | Browser/device | Can be earned despite unavailable NewsStand desk |
| Audio state | User click | inline `Audio` + global KSVL coexistence scripts | Static file hosting | `/content/music/sunnyvaile-newsstand.mp3`; ephemeral JS state | Current page/global player behaviors | Session/device player | No product completion coupling |
| Analytics | Page/provider load; future ruled events | Plausible queue | Plausible | Provider event stream | Product/Control Room | Aggregate intended | Embed is not verified event delivery or measurement |
| Release artifact | Release manager | curated public builder/tests | Cloudflare Pages/runtime | Exact commit/artifact/deployment IDs | Public origin | Public immutable release | Prior bounded evidence exists; no current authorized NewsStand release transaction |

## 4. End-to-end transaction contracts

### Candidate → approved publication → reader

`radar reconciliation → complete source retrieval → immutable receipt/hash →
claim map → edition-specific independent verdict → append-only decision
identity → deterministic canonical record → schema validation → exact artifact
→ deploy → public paper/search/hash verification → monitoring`

- **Authoritative completion:** the exact approved story is readable at the
  intended public hash with sources/dates matching its accepted receipts.
- **Permission:** candidate assertions, local router output, a green script,
  canonical file edit, commit or deploy are not editorial approval.
- **Idempotency:** stable candidate/story/source/decision IDs and exact hashes
  must prevent duplicate or relabelled publication.
- **Failure/retry:** unknown/duplicate/malformed/stale/future/job-mismatched or
  hard-hold input fails closed and preserves the last accepted dataset.
- **Current missing work:** recursive raw-key rejection, one executable
  hash-bound schema, immutable source receipts, claim binding, independent
  signed/hash-bound decision, append-only ledger, canonical writer and public
  transaction receipt.

### Publication freshness and access

`publication/story timestamps + max age + dataset state + current time →
one accessDecision → arrival/paper/search/hash/history`

- **Completion:** every consumer returns the same eligibility and reason.
- **Failure:** stale, hold, unavailable, no-data, load-failure and retracted
  bodies remain suppressed; a visit timestamp never refreshes a paper.
- **Renewal:** only a new dated source/editorial recheck may advance
  `lastCheckedAt`; no automated renewal service is proved.
- **Conflict:** mixed desks may remain partly useful while naming degradation;
  dataset-wide hold/load failure blocks every route.

### Follow-up/correction/retraction

`new evidence or original error → materiality/original-accuracy ruling → new
article when material + correction of old claim when LAiDIES erred → canonical
bidirectional relationship → every consumer → artifact/public verification →
dependent source/claim/content recheck`

- **Completion:** material later evidence is a new dated article with Newer
  reporting/Earlier reporting/Story so far; an original LAiDIES error has a
  visible dated correction; a narrow retraction preserves the route/notice and
  suppresses the unreliable body; homepage/archive/deep links agree.
- **Update/remove:** never delete the history needed to explain what changed.
- **Current gap:** no lineage schema, production intake, materiality ruling,
  receipt, relationship writer, cross-surface propagation job, rollback receipt
  or public continuing-story drill exists.

### Paper/search/hash/history

`choose paper or search → central access check → render front stories →
open #slug → recheck → render story/notice → Back/put back → restore safe
origin`

- **Completion:** visible result plus correct focus/query/card/reachable scroll.
- **Duplicate/rapid history:** the newest restoration ID wins; forged offsets
  clamp to reachable layout.
- **Failure:** missing story or changed access shows a notice, not stale body.
- **Scope:** current proof is headless Chrome and same-tab history only.

### NewsStand tour step → reward

`load route → auto check-in → weekly local array → possible eight-stop
completion → FAiRY Plays + ritual record → Homepage/Closet`

- **Current completion event:** route arrival, even before proving a usable
  current/quiet desk result.
- **Required correction:** Functionality/Platform and Tour owners must bind the
  step to an accepted NewsStand result—or explicitly rule that arrival is the
  intended step—and fail visibly/read-after-write on denied storage.
- **Idempotency:** stop key deduplicates within ISO week; reward uses a
  last-rewarded-week key; episode ritual uses episode number.
- **Failure/conflict:** writes swallow storage errors; whole-array local writes
  are device-local and no server/account merge exists.

### Analytics

`ruled UI outcome → controlled event ID/properties → privacy filter →
provider acceptance → aggregate report → product decision`

- Never send raw archive query, headline/body text, source URL, inferred
  interest, Card/account identity or health/legal topic.
- Required events should cover publication select/state, story open, source
  open, archive search/no-result, correction view/understanding and useful
  return—not alarm clicks alone.
- Provider embed, queue acceptance and page view are not outcome delivery
  proof.

## 5. Cross-page propagation matrix

| Source action | Expected consumers | State carried | Return/deep link | Update propagation | Removal/revoke propagation | Failure evidence |
|---|---|---|---|---|---|---|
| Change publication status/freshness | NewsStand arrival, selector, paper, search, hash/history; future homepage | edition, state, checked/max-age dates, reason | `/newsstand.html` or `#slug` | New accepted dataset/artifact | Hold/stale/retraction suppresses bodies everywhere | Central fixtures plus exact artifact/public matrix |
| Publish/correct/retract story | Paper front page, archive, direct route, learning inventory, future homepage | stable slug, edition, source/decision/correction IDs | Exact hash | Transactional canonical update | Retraction preserves notice; correction preserves history | Producer-to-reader/correction drill |
| Homepage utility/tour/map click | NewsStand | entry context only | `/newsstand.html` | Copy/routes must track exact four jobs and limitation | Remove stale/superseded destination copy | Round-trip and destination-state test |
| Visitor's Centre directory click | NewsStand | limited/currentness warning | `/newsstand.html` | Directory state must track NewsStand contract | Withdraw false availability | Route + first-use comprehension |
| Story Class Notes handoff | Library Accounts 101 and Episode 3 | explicit method/context link | Current exact target, then browser/site return | Story and destination owners verify both ends | Broken/held target removes or relabels handoff | Exact artifact fan-out + public response/content |
| Weekly-tour route visit | Homepage progress; Closet/rewards after full tour | stop key, ISO week, possible episode/reward records | Homepage/Closet routes | local event/page reread | No authoritative revoke/account deletion path | storage denial, duplicate, failure-desk and second-device tests |
| Directory/site metadata change | Homepage map, Visitor's Centre, shared directory, sitemap/search | route/name/job/status | `/newsstand.html` | Build/deploy of each consumer | Remove retired `hot-goss.html`/old labels | Complete reference scan + exact artifact crawl |
| Legacy episode/weekly metadata | Episode surfaces and old command-center records | stale `hot-goss.html` or `#hot-goss` paths | Currently broken/superseded routes in several source records | Requires affected owner reconciliation | Retire or migrate exact records | Reference inventory and public fan-out |

## 6. Missing backend and integration register

| Gap | User consequence | Required backend/data/service work | Shared contract owner | Product owner | Exact files/services | Acceptance proof | Launch disposition |
|---|---|---|---|---|---|---|---|
| No complete publication authority transaction | Candidate/local file can be mistaken for approved news | Recursive strict parser; executable hash-bound schema; immutable source receipts; claim binding; independent signed/hash-bound decision; append-only ledger; deterministic writer | Editorial/Accuracy + Platform | NewsStand + four publications | Candidate schema/evaluator/policy; new private ledger/service; `content/newsstand-stories.js` writer | Hostile raw input, four job fixtures, cross-run identity and exact canonical output | BUILD BEFORE LAUNCH |
| No production correction backend | Errors cannot be received, ruled and propagated with history | Intake/receipt, permissions, append-only previous/current wording, writer, consumer invalidation and public monitor | Shared corrections + Privacy + Platform | NewsStand | Service/schema TBD by Platform; evidence records; runtime dataset/consumers | Submit → receipt → correct/retract → all consumers → rollback/public proof | BUILD BEFORE LAUNCH |
| No source-recheck runner | A paper can become overdue without an operational renewal path | Dated source retrieval/check job, immutable receipt, owner alert, hold-on-failure and canonical update transaction | Editorial operations + Platform | Publication owners | Radar/log/source service; story evidence/dataset | Current→stale→rechecked or held; outage/retry and source-change fixture | BUILD BEFORE LAUNCH |
| No canonical publication writer/deploy transaction | Manual mutation cannot prove producer-to-reader identity | Authenticated private compiler/writer, exact artifact binding, release receipt, rollback and public monitor | Platform release | NewsStand | New isolated compiler; public builder/Cloudflare release | One authorized representative per paper/quiet state, exact hashes and rollback | BUILD BEFORE LAUNCH |
| Four-paper visual/object system incomplete | Reader sees four buttons but only two physical paper props; legacy Weekly identity remains | No backend; compete/admit exact room, object and responsive assets with live text | Brand & Experience + image director | NewsStand | `newsstand.html`, CSS, admitted assets | Incumbent + 2 challengers; 17/20 floors; desktop/mobile/AT owner ruling | OWNER DECISION REQUIRED after competition |
| Homepage Breaking/Daily contract absent from live source | Repeat visitor cannot see active news without entering stand | Conditional consumer module reading the same admitted public state; no duplicate data source | Homepage + Platform | NewsStand | `index.html`, shared public data/adapter | Breaking collapses on clear day; Daily/current route exact; correction propagation | BUILD BEFORE LAUNCH |
| Tour marks route arrival as completion | Failed/held desk can contribute to “caught up” and reward | Named authoritative NewsStand stop event, read-after-write, failure state and shared reward reconciliation | Tour/rewards + Functionality/Platform | NewsStand | `sv-tour-checkin.js`; Homepage/Closet consumers | current/quiet success, unavailable failure, duplicate, storage denial, second device/account | BUILD BEFORE LAUNCH |
| No account-backed/durable NewsStand history | No saved/synced topic or reading return | Do not build until owner decides the job; if approved, versioned store, consent, RLS, merge/delete/revoke/export and second-device contract | Identity/Privacy/Platform | NewsStand | TBD | Four visitor scopes, two accounts/devices, deletion/revoke/privacy | OWNER DECISION REQUIRED |
| No NewsStand analytics contract | Cannot measure comprehension/trust safely | Controlled event dictionary, adapter, provider delivery health and qualitative review | Analytics + Privacy | NewsStand | shared event dictionary/adapter/Plausible | No raw query/text/topic; production delivery and interpretation review | BUILD BEFORE LAUNCH |
| Legacy routes/metadata remain | Visitors and downstream content may point to retired Hot Goss paths | Inventory and migrate/remove exact live consumers; keep archives clearly historical | Affected content owners + Platform | NewsStand coordinates | episode index/issues, site data, command-center records, old scripts | Source/reference scan, exact artifact fan-out and public redirect/404 policy | BUILD BEFORE LAUNCH for promoted consumers |
| Browser harness cleanup racy | Unattended release gate can fail after assertions | Await browser exit and bounded observable cleanup retries | QA/Platform | NewsStand | `test-newsstand-reader-browser.mjs` | Repeated source/artifact runs exit cleanly | BUILD BEFORE LAUNCH |
| Native accessibility/public proof absent | Headless success may not match real assistive use | Safari/VoiceOver, 320/390, real 200%, long correction and media failure; exact public run | Accessibility + Release | NewsStand | exact candidate/artifact/public origin | Named device/browser/AT evidence with recovery | BUILD BEFORE LAUNCH |

## 7. Shared-contract collision check

- **Identity/account/profile/permissions:** NewsStand consumes none today.
  Header sign-in is navigation only. Do not infer member/private/synced reader
  state from a local Card or Supabase session elsewhere.
- **Saves/progression/Closet:** no NewsStand save exists. Browser history is not
  a saved story. Tour state and Closet projections are shared dependencies, not
  NewsStand reading history.
- **Rewards/economy/ownership/fulfilment:** a NewsStand route visit currently
  contributes to a Full Ritual and possible FAiRY Play. It cannot certify
  comprehension, story reading or current-desk success without a ruled event.
- **Community/moderation:** no comments, annotations or story sharing are
  currently owned. Future discussion needs separate moderation/identity scope.
- **Referrals/postcards/newsletter/delivery:** no subscription/delivery
  operation exists. Post Office sign-in link does not make the paper delivered.
- **AI service quality/safety:** radar/evaluator assist editorial routing only;
  neither is publication authority. High-stakes topics retain mandatory human
  and independent holds.
- **Content/media admission and freshness:** canonical story data, exact source
  manifests, visual exact-use admission and time-relative access must agree.
  Candidate art/data and orphan feeds do not self-admit.
- **Analytics/customer evidence:** controlled aggregate outcomes only; raw
  searches, headlines, reading text, source URLs and inferred interests are
  prohibited.
- **Release/build/runtime:** page, CSS, public data/contract, audio, exact
  sources and every cross-page consumer must be in the same candidate manifest.
  Private operations/evidence/candidates must not ship.

## 8. Verification and approval

Directly inspected for this recovery:

- working agreement, active work, engine ledger, owner/champion/orchestrator
  contracts, registry, queue, visitor-state and build-completion policies;
- NewsStand charter, operating spec, state, backlog, all four subproduct
  dossiers, Cycle 6 audit/packet and Repair 3 maker/independent evidence;
- `newsstand.html`, canonical data, reader contract, schema, validators/tests,
  editorial radar/autonomy/policy and the legacy private intake workflow;
- exact story evidence manifests and current publication timestamps/states;
- Homepage, Visitor's Centre, shared directory, tour/reward module and known
  legacy cross-page references; and
- relevant prevention rules BTB-045, 073, 074, 080, 081, 100, 101, 118, 121,
  125, 131 and 132.

This recovery did not rerun the full browser suite, browse/revalidate story
claims, build an artifact, deploy, perform a public-origin check or exercise a
real correction. Historical bounded evidence was not promoted.

Handoff:

- **NewsStand owner:** maintain this complete element/visitor-state map and
  commission the packet only after a Control Room lock.
- **Publication owners + Accuracy/Corrections:** supply representative,
  edition-specific fixtures and independently ruled claim/source receipts.
- **Functionality & Platform Director:** own authority ledger, correction
  service, canonical writer, tour/reward event, analytics and release design.
- **Affected product owners:** verify Homepage, Visitor's Centre,
  Library/Episode handoffs, Resident Card/Closet boundaries and every legacy
  route consumer.
- **Brand & Experience Director + Ali:** rule only on a credible competed
  four-publication environment, not on backend passes.
- **Control Room:** allocate disjoint locks and integration order; no live/shared
  file listed here is authorized by this recovery.
