# LAiDIES master programme tracker

**Last reconciled:** 2026-07-24  
**Baseline:** `operations/codex-handovers/HANDOVER-codex-takeover-audit-2026-07-23.md`  
**Current execution handover:** `operations/codex-handovers/HANDOVER-codex-site-and-video-production-2026-07-24.md`

This is the durable, cross-project list of work. Chat history is not the
tracker. A task is not removed when a page, asset, script, or plan merely
exists; it closes only when the evidence in the final column exists.

## Status language

- **DONE LOCAL** — built and checked in the active local candidate.
- **REVIEW CUT** — exported and technically checked, but still awaiting the
  named approval or release gate.
- **OPEN** — real work remains.
- **REJECTED CANDIDATE** — a local build exists, but visual or interaction
  review proved it is not an acceptable base and it must not be propagated.
- **BLOCKED DECISION** — Ali's taste, business, or irreversible publication
  decision is genuinely required.
- **PLANNED ONLY** — prose or a proposal exists; there is no working system.
- **VERIFY LIVE** — a prior claim exists, but the public signed-in journey has
  not been proved against the exact current release.

## A. Release and video

| Workstream | Current truth | Next action | Close evidence |
|---|---|---|---|
| Episode 01 film | DONE LOCAL / REVIEW CUT. v21 passed full decode, 8/8 sampled motion checks and visual timing/transition inspection; mapped in `watch.html`. The retained source set still mixes comic text frames with earlier scenic rendering. | Owner continuity and locked-style exception review; replace only failed frames, then later upload. | Owner approval plus verified hosted playback and captions. |
| Episode 02 film | DONE LOCAL / REVIEW CUT. v17 passed full decode, 8/8 sampled motion checks and visual transition inspection; mapped in `watch.html`. | Final owner continuity watch; later upload to the selected host. | Owner approval plus verified hosted playback and captions. |
| Episode 03 film | DONE LOCAL / REVIEW CUT. v9 passed full decode and is mapped locally. | Final owner continuity watch; later upload. | Owner approval plus verified hosted playback and captions. |
| Episode 04 film | DONE LOCAL / REVIEW CUT. v8 passed full decode and is mapped locally. | Final owner continuity watch; later upload. | Owner approval plus verified hosted playback and captions. |
| Welcome trailer | REVIEW CUT. The repaired 58-beat all-comic v2 exists, preserves all original timings/audio, replaces five rejected/obsolete beats, passed full decode and passed replacement-beat/boundary visual inspection. It is not site-mapped. | Owner continuity review before promotion. | Owner approval, hosted playback, captions and correct route. |
| Shared “Welcome back to LAiDIES” moment | BLOCKED DECISION. Current candidate is not approved and must not be copied into all episodes. | Design/select one approved comic-cover-style series frame and its restrained reveal grammar. | Ali-approved still/motion proof recorded once, then cue-accurate insertion into each film. |
| Captions | Files exist for trailer and Episodes 01–04; current local timing is tied to narration. | Validate in the final hosted player for every film. | Caption toggle and timing verified on desktop/mobile public routes. |
| Film continuity | OPEN. Technical checks do not approve character, room, costume, wordmark or story continuity. | One exception-led owner watch per film after automated visual sheets. | Signed review log listing approval and any repaired timecodes. |
| Large-video hosting | OPEN. GitHub Pages is not the delivery system for these masters. | Choose and configure Cloudflare Stream or YouTube; preserve release masters in R2 if required. | Adaptive public playback, captions, poster, privacy and route checks. |
| Exact release mapping | OPEN. Local mappings are ahead of the public site state recorded in the takeover audit. | Use one release manifest to bind film, captions, article, poster and watch route. | Exact manifest version deployed and post-deploy verified. |

## B. Website and SUNNYVAiLE experience

| Workstream | Current truth | Next action | Close evidence |
|---|---|---|---|
| Homepage | OPEN. The current piecemeal comic pass did not create a coherent approved result. The LAiDIES Method section, image choices and accent balance need one intentional system-level pass. | Reconcile the current page against the locked character rendering, saved comic references, light gradients, midnight-blue surfaces and broader vivid accent palette; redesign as a composed journey rather than isolated boxes. | Side-by-side desktop/mobile visual comparison, working interactions and Ali approval. |
| Building architecture | OPEN / REJECTED CANDIDATES. The 2026-07-23 construction pass put real mechanics into many pages, but the status ledger overclaimed completion from DOM/features and screenshots. It did not prove that the pages adapted the approved immersive room/object model; several builds visibly fall back to generic stacked sections, cards or labels over art. | Recover and visually validate the actual LIBRAiRY whole-room benchmark first. Adapt its principles building by building, then run side-by-side arrival, interaction and mobile comparisons before promoting any page. | Every public destination works at desktop/mobile with no generic card fallback or rejected art, and Ali has approved the first representative adaptation before the pattern is propagated. |
| Visitor Centre | OPEN — REPLACEMENT LOCAL CANDIDATE. The rejected numbered-pin/card-roll build has been replaced locally. The lobby is now the experience: the map sits in the wall frame, unobtrusive hotspots reveal names, desktop destination details occupy the board itself, compact widths use one in-room reveal, and the explicit named directory replaces the seventeen-card roll. Trailer/tour, first route and postcard desk remain. Desktop and compact-width interactions pass locally; Ali approval and <=560px verification remain open. | Review the actual Library and Visitor Centre candidates together; tighten from Ali's ruling, complete the true mobile pass, then decide whether this room/object grammar may propagate to the next building. | Side-by-side desktop/mobile proof against the approved room model, clear first-click comprehension, working map/directory/trailer/postcard/start route, Ali approval, then public verification. |
| Building art unification | OPEN. Many pages intentionally use replaceable painterly/ornate/structural bridge art. | Replace only from the named dependency list in the building ledger, using the Episode 04 locked dimensional graphic-novel style where characters appear. | Approved asset ledger with rejected/legacy files excluded from release. |
| Episode feature pages 01–04 | DONE LOCAL structurally. Comic feature construction and navigation are built; inherited frames still vary in rendering quality. | Final art consistency, copy/canon and mobile length pass. | Current article, film and issue metadata agree and public journeys pass. |
| School, classes, Book Fair and Pop Quiz | DONE LOCAL structurally. Interactions read authoritative current data; some room art is still a bridge. | Preserve data/mechanics while resolving art and future class-production tasks. | Classes play, quiz scores/rewards, Book Fair redemption and records work publicly. |
| Guest versus resident state | OPEN. The initial audit found guest activity creating partially populated resident state. | Define guest-demo state versus authenticated resident state and enforce it consistently. | Signed-out and signed-in journey tests with no misleading persistence. |
| Accessibility | OPEN. No full keyboard, screen-reader or assistive-technology audit has closed. | Run keyboard/focus/semantics/contrast/reduced-motion audit after page structure stabilizes. | Logged desktop/mobile accessibility pass and repaired findings. |
| Performance and page length | OPEN. Earlier mobile pages were extremely long and the final media strategy is not yet measured. | Measure current v2 pages, images, video posters and Core Web Vitals; remove redundant scroll and oversized delivery. | Performance budget and verified representative public results. |

## C. Canon, episodes and learning content

| Workstream | Current truth | Next action | Close evidence |
|---|---|---|---|
| Canon cleanup | OPEN. Current canon was partly reverse-extracted from shipped pages and contains known contradictions/unsourced MUST-MATCH material. | Rule Episode 01 title/quote/stat conflicts and Episode 03 wording before enabling broad surface derivation. | Canon provenance and mechanical checks pass without multiplying bad claims. |
| Episode 05 | BLOCKED DECISION. Substance and locked analogy/example exist, but approval and naming/currency choices remain open. | Resume only after release-critical films; Ali approves the substance and unresolved naming fork. | Approved substance, script, cue sheet, art, film and release record. |
| Episode 06+ | OPEN. Episode 05 overlaps a previously planned Episode 06 job. | Re-scope the episode sequence after Episode 05 is approved. | Updated season plan with non-duplicative capabilities. |
| Basics classes | APPROVED CONTENT / OPEN PRODUCTION. Two concept classes and a printout are recorded; visual production is not complete. | Produce the two-column printout, Class B visual beats, then Class A beat sheet and renders when reprioritized. | Mute-test passing visuals, approved copy preserved, finished class films and pages. |
| Clean issue-body source | OPEN. Full issue bodies remain embedded in large HTML files. | Establish `content/issues/issue-XX` structured sources and generate surfaces from them incrementally. | One source produces article/newsletter/social without copy forks. |
| Writing/style reference bank | OPEN. The broader Ali writing reference and full series bank were missing or partial in the initial audit. | Import/reconcile authoritative examples and anti-patterns without treating old files as automatically current. | Versioned reference files linked from the release manifest. |
| Time-sensitive Tribune/AGI/jobs/bubble material | PLANNED/DRAFT. Existing drafts are not publication-approved and contain time-sensitive claims. | Re-verify primary sources at ship time; obtain editorial approval. | Dated source ledger and final-approved publication. |

## D. Community, membership and data

| Workstream | Current truth | Next action | Close evidence |
|---|---|---|---|
| Community rooms | DONE LOCAL structurally. Nine room experiences and the community index are built; final room art is open. | Final art and signed-in behavior QA. | Public room navigation, posting rules and moderation state verified. |
| Community backend/moderation | PLANNED/PARTIAL. Hyvor pages and an AI-ops plan exist; the complete profile/moderation/digest workflow is not proven. | Verify current Hyvor settings and login rules; define the smallest private review queue before automation. | End-to-end post, moderation, privacy and digest test. |
| Membership/resident profile | VERIFY LIVE. Hosted-service work is recorded but not independently proved end-to-end against the current frontend. | Test signup/login/profile/card/privacy flows with test accounts. | Repeatable signed-in test log. |
| Supabase migration reproducibility | OPEN. `open_pack(uuid)` is dropped without its complete recreated body in repository migrations. | Restore the full migration definition and test a clean rebuild. | Fresh migration run retains pack opening and all policies/functions. |
| Resident mail | OPEN/CONTRADICTED. Backend claims exist, but the active Post Office frontend does not prove the recorded mail integration. | Reconcile API/function state and build/test the current UI deliberately. | Send, receive, block and privacy journeys pass signed-in tests. |
| Trading-card economy | OPEN. Card art/backend work exists, but pack granting, correct server economy, leaderboards and remaining roster/art are incomplete. | Preserve the JoJo visual benchmark; fix reproducibility and complete one honest pack journey before expanding. | Server-authoritative grant/open/collection journey with approved art. |

## E. Social, growth and revenue

| Workstream | Current truth | Next action | Close evidence |
|---|---|---|---|
| Weekly social production | OPEN. Issue 01/02 trackers and website-feature posts were recorded as not started; the six-tool “social engine” is a proposal. | After films release, produce one weekly batch and schedule natively in Meta first. | Published weekly batch with asset/source record and measured results. |
| Social templates | OPEN. Canva template plans exist but no authoritative reusable template set was confirmed in the repo. | Create/lock a small template family only after the site/episode visual system is approved. | Reusable Canva templates plus exported reference proofs. |
| Newsletter | OPEN. Buttondown is the current direction; no complete generated weekly template/workflow is proven. | Create a short reusable Buttondown issue draft from the clean episode source. | Draft-to-send checklist and delivered test. |
| LinkedIn derivatives | OPEN. Rules exist; per-issue generation is not built. | Extend the episode asset builder after the clean content source is established. | Generated, reviewed per-issue LinkedIn draft. |
| Analytics/feedback | OPEN. No weekly scorecard/dashboard is operating. | Add the small scorecard before buying more automation. | Weekly views, saves, shares, follows, subscribers, replies, comments and conversion record. |
| Shop | OPEN. The initial audit found 13 products with placeholder `buyUrl: "#"`. | Select one real paid offer and fulfilment path before expanding the catalogue. | One complete test purchase, confirmation, fulfilment and refund path. |
| First revenue model | BLOCKED DECISION, not urgent during film repair. | Choose the first test: merchandise, paid learning/download, membership/community or sponsorship. | One time-boxed offer with price, audience, fulfilment and success measure. |

## F. Operating system and sustainability

| Workstream | Current truth | Next action | Close evidence |
|---|---|---|---|
| One product/release manifest | OPEN. Status is still spread across human documents and page code. | Create a machine-readable record for each episode/release: canon, approved inputs, cues, captions, film, article, social and approval state. | Builds and status views read the same manifest. |
| Asset zones and legacy quarantine | OPEN/PARTIAL. Rejected files are sometimes quarantined, but the repository still contains a large confusing asset history. | Inventory `source-approved`, `work`, `release`, `rejected` by manifest status without deleting approved originals. | Builders can only consume declared approved/release sources. |
| One release workflow | OPEN/PARTIAL. Reusable assemblers and QA scripts now exist; deployment and public verification are not joined to them. | Connect manifest validation, film/caption checks, critical browser journeys, approval, deploy and post-deploy verification. | One command/report identifies the exact released version and public proof. |
| AI critic and repeatable drafter | OPEN. The Wednesday Engine plumbing exists, but `make critic` and a repeatable drafter were not built. | Build only after canon inputs are clean; retain mechanical grep plus independent critic. | Re-runnable draft → mechanical checks → critic → Ali gate. |
| Remove Ali as prompt courier/status reconciler | OPEN, improving. Current Codex work is being produced directly and logged, but broader weekly workflows remain fragmented. | Continue artifact-first handovers, automatic QA and this master tracker; reduce approvals to taste/business/publication. | Ali is no longer moving files, re-pasting prompts or finding first-line bugs. |
| Active workspace/deployment truth | OPEN. The takeover audit found `homepage-redesign` and `main` diverged and public pages mixed versions. | Declare the release branch/source and make deployment use only a reviewed manifest commit. | Local SHA, deployed SHA and public routes agree. |
| Git/worktree hygiene | OPEN. The active worktree contains extensive unrelated changes and very large media. | Commit scoped work intentionally; never wipe uncommitted work; separate large release media from site source. | Clean/recoverable release branch and documented media storage. |
| Homepage/archive automation | OPEN. Episode index generation exists, but homepage/archive surfaces still require manual reconciliation. | Build only after the clean issue manifest exists. | New episode record updates all intended archive surfaces deterministically. |

## Today's active order

1. Keep the visually verified trailer review-only until its continuity/owner gate.
2. Present real visual/continuity exceptions across all five review films for owner review.
3. Replace failed frames or motions without disturbing approved cue timing.
4. Choose/configure large-video hosting.
5. Upload exact approved masters/captions and verify the Screening Room.
6. Continue the homepage as one intentional design system; do not revert
   destination pages to text-card grids while final art is being replaced.

## Decisions that must not be guessed

- Final shared “Welcome back to LAiDIES” image and reveal.
- Character/keeper continuity exceptions in final films.
- Irreversible public deployment.
- External video-host/account choice if it creates cost or public exposure.
- First revenue offer and fulfilment model.
- Episode 05 remaining canon/naming choices.

## Source ledgers retained, not replaced

- `operations/codex-handovers/HANDOVER-codex-takeover-audit-2026-07-23.md`
- `operations/codex-handovers/HANDOVER-2026-07-23-operating-system.md`
- `operations/codex-handovers/HANDOVER-codex-site-and-video-production-2026-07-24.md`
- `operations/building-page-construction-status-2026-07-23.md`
- `operations/building-mechanic-audit-2026-07-22.md`
- `PRODUCTION-GAP-AUDIT.md`
- `operations/launch/sunnyvaile-public-reveal-readiness.md`
- `social/WEBSITE-FEATURE-SOCIAL-PLAN.md`
- `AI-COMMUNITY-OPS-PLAN.md`
- `SPOTLIGHT-AUTOMATION-PLAN.md`
