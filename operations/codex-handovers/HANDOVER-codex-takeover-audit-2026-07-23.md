# HANDOVER — Codex takeover audit and consolidated current state

**Date:** 2026-07-23  
**For:** Codex and any later agent continuing the full LAiDIES takeover  
**Repository/workspace reviewed:** `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES`  
**Active site workspace:** `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage`

This is the master handover from Codex's first takeover audit. It reconciles:

- `Website-homepage/HANDOVER.md`;
- the Claude memory index and selected current memories;
- the live site;
- the active and legacy worktrees;
- episode/canon/video files;
- the release checks and operating-system documents;
- Supabase migrations;
- social, commerce, classes, library/building, membership/card, and Tribune work;
- every earlier file in `operations/codex-handovers/`.

Detailed evidence and screenshots are saved at:

`/Users/alisoneakin/.codex/visualizations/2026/07/23/019f904a-c566-79b1-9e1d-1c13a9221a36/laidies-takeover-audit/TAKEOVER-ASSESSMENT.md`

No site, canon, approved original, video, database, external service, or deployment was changed during the audit. This handover is the only repository file Codex added. No git command was run.

---

## 0. Executive summary

LAiDIES is a strong creative product trapped in an unreliable production and release system.

The primary failure is not a lack of ideas, rules, agents, hooks, or written plans. It is the absence of one executable release path that proves:

1. the approved source was used;
2. the output passed the relevant checks;
3. the exact reviewed version was deployed;
4. the public route and media work afterward.

The first recovery milestone recommended by Codex is:

> **Episode 04 plays correctly on laidies.ai, with Ali-approved motion, accurate captions, and verified desktop/mobile behavior.**

Do not start a site rewrite, new council, broad building rebuild, or full social automation project before one complete episode passes through a real release path.

---

## 1. How to interpret status in this handover

Use these labels literally:

- **VERIFIED LIVE** — inspected on `https://laidies.ai` during this audit.
- **VERIFIED LOCAL** — inspected in the active `Website-homepage` worktree.
- **APPROVED** — an earlier handover records explicit Ali approval; Codex did not independently reconfirm it.
- **BUILT, UNPROVEN** — code/art exists but the current end-to-end behavior was not demonstrated.
- **DRAFT / PROPOSED** — planning or unfinished work only.
- **CONTRADICTED** — another current file or live observation disagrees.
- **SUPERSEDED** — a newer decision explicitly replaces it.

Do not turn **BUILT**, **APPROVED**, or a prose claim into **VERIFIED LIVE** without checking the actual public behavior.

### Current evidence hierarchy

When sources disagree:

1. Ali's newest explicit decision.
2. Current public behavior for claims about the live product.
3. The active `Website-homepage` file for the current candidate build.
4. A re-runnable deterministic check.
5. Approved source/art status recorded in a handover.
6. Handover, memory, audit, and planning prose.

No handover—including this one—self-certifies the product.

---

## 2. The main root cause: two site versions are being treated as one

**VERIFIED LOCAL**

- `Website-homepage/.git` points to a linked worktree.
- `Website-homepage` is on `refs/heads/homepage-redesign`.
- The primary `Website` checkout is on `refs/heads/main`.
- Local and remote-tracking references differ for both branches.

This explains a large share of the repeated “fixed locally but not fixed live” behavior.

### Confirmed examples

- Local `index.html` matched the deployed homepage at audit time.
- Local and deployed `watch.html`, `issues/issue-04.html`, `library.html`, and `laidies-card.html` differed.
- The live Episode 04 article links to `watch.html?ep=04`.
- That live watch route renders Episode 01 and an empty `0:00 / 0:00` player.
- The newer local watch code maps films for Episodes 01, 02, and 04 only; Episode 03 is absent even locally.

Earlier handover claim that “the redesign IS live” is therefore **CONTRADICTED as a statement about the complete current workspace**. Some redesign files are live; the active worktree as a whole is not.

---

## 3. Release-critical current state

### 3.1 Public video journey — broken

**VERIFIED LIVE**

- `watch.html?ep=04` shows Episode 01.
- No usable film mounts; the player remains at `0:00 / 0:00`.
- Direct public requests for the local Episode 01–04 MP4 paths return 404.
- The public Episode 04 VTT path returns 404.

### 3.2 Local full-length episode files — present, not public

**VERIFIED LOCAL**

- Episode 01 v19: about 19:42, 147.6 MB.
- Episode 02 v15: about 16:27, 144.5 MB.
- Episode 03 v19: about 17:27, 149.3 MB.
- Episode 04 v7: about 20:22, 241 MB.

These files prove substantial production work exists. They do not prove the motion is approved or that the release is complete.

### 3.3 Static hosting cannot be the video plan

The active workspace contains roughly:

- 30 GB of video material;
- 14 GB of episode assets;
- 50 GB under `Website-homepage`;
- 22 GB under legacy `Website`;
- about 77 GB across the reviewed workspace.

GitHub Pages is not an appropriate finished-video host. The recommended path is:

- **Cloudflare Stream** for adaptive episode playback and captions;
- **R2** for large downloadable/source/release assets;
- static pages hosted separately.

Relevant official references:

- `https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits`
- `https://developers.cloudflare.com/stream/pricing/`
- `https://developers.cloudflare.com/stream/edit-videos/adding-captions/`
- `https://developers.cloudflare.com/r2/pricing/`

### 3.4 Database migrations are not reproducible

**VERIFIED LOCAL**

`supabase/migrations/20260722234500_card_art_paths_and_finish_aware_open.sql` drops:

`public.open_pack(uuid)`

It does not recreate the function. The comment says the function body was applied through MCP.

The earlier membership handover already flags this as owed work. A fresh database rebuilt from repository migrations would lose `open_pack`, even if the hosted project currently has the correct body.

---

## 4. Checks and operating system

### Checks run by Codex

- `node scripts/check-local-links.js` — PASS, 2,207 references across 118 pages.
- `node scripts/check-inline-js.js` — PASS, 359 scripts across 131 pages.
- `node scripts/check-town.js` — FAIL, two `href="#"` links in the library.
- `node scripts/check-episode-cues.js` — PASS for five cue sheets; trailer has three long holds.
- `operations/check-episode.sh` — can exit successfully when an episode has warnings, missing surfaces, or no MUST-MATCH ledger.
- `operations/engine/where.sh` — currently points at Episode 06 and says nothing is finished; blocked on a missing substance sheet.

### Conclusion

The checks are useful but do not form a trustworthy release gate:

- they inspect different page scopes;
- a broad link check deliberately ignores `href="#"`;
- episode checks do not prove all required surfaces exist;
- the current public watch journey is broken while several checks are green;
- disabled hooks mean most checks are not automatically attached to the current work.

### Hook status

Earlier operating-system handover says the hooks were fixed and active. The later full handover says all hooks were disabled for offboarding.

**VERIFIED LOCAL CURRENT STATE:** both inspected Claude settings files have empty hook configuration. Backups remain. Treat the “hooks active” section of the earlier handover as **SUPERSEDED**.

Do not restore all hooks blindly. Replace them later with a smaller release workflow that produces one coherent verdict.

### Agent councils

`operations/agents/` and several operating-model documents describe a large role hierarchy. The newer operating-system research correctly diagnoses that most of it is prose wired to nothing.

Recommended operating roles:

- **Producer** — chooses the current outcome and owns the manifest.
- **Builder** — produces the artifact.
- **Verifier** — runs deterministic and browser checks.
- **Ali** — approves taste, story, irreversible publication, and business decisions.

These should be workflow states, not dozens of overlapping agent personas.

---

## 5. Video-production decision conflict

### Latest recorded memory

The newest inspected Claude memory says:

- CapCut is retired for motion.
- Motion should be made in Canva.
- Ali touches no tools.
- Animate one approved still rather than generating many.
- Motion is background-only.
- Loops must have zero net travel.

### Still-active older instructions

- Several briefs specify Seedance plus CapCut.
- The full handover uses Canva/CapCut language.
- The operating-system handover describes Ali relaying prompts between Claude and Codex driving CapCut.
- The current CapCut project inspected by Codex contains one imported Episode 04 v1 video segment, not a per-beat editable animation assembly.

### Current output evidence

- Episode 04 v7 sampled contact sheets show little or no perceptible motion at review scale.
- Earlier motion heatmaps show some loops changing much of the frame, including people, which violates the background-only rule.
- `EP4-FINISH-HANDOVER.md` records long holds and unfinished review.
- `ep04-review-log.md` does not show a completed end-to-end review.

### Recommended resolution

Do not rebuild twenty minutes before approving a 20–30 second proof.

Test the same approved Episode 04 still and real narration through:

1. Canva, because it matches the newest explicit tool decision.
2. A small programmatic Remotion composition with separate background/foreground masks, controlled environmental motion, transitions, captions, and zero-net-travel loops.

Remotion is not the prior ffmpeg still-concatenation approach; it supports explicit per-frame animation. It still requires layered/masked assets for true background-only motion.

Ali approves the short proof. Only then does the selected motion grammar scale to the episode.

---

## 6. Canon and content state

The episode canon files call themselves single sources of truth but contain unresolved contradictions.

### Episode 01

- “Use AI” versus “Do AI” remains unresolved across title/slug/audio.
- The handover flags an unsourced Fei-Fei Li quote in MUST-MATCH.
- The episode check still warns about an unverified quote.

### Episode 03

- Current canon records the corrected Episode 04 teaser.
- The mechanical episode check finds banned/stale wording and old terminology.

### Episode 04

- Canon explicitly says narration and article have surface drift.
- Article and narration/cue work are substantial.
- This remains the best first recovery candidate because the content and local video are furthest along.

### Episode 05

- Current canon title is **The Super Models**.
- The older “The Model Menu” title still appears downstream.
- Canon says its rename cascade is unfinished.
- The operating-system handover records an approved direction: choosing model tier for the job, “you don't wear haute couture to the beach,” and the 200 badly named files example.
- `content/episodes/episode-05.substance.md` is recorded as awaiting final Ali approval.
- Episode 05 is not recorded.

### Episode 06

Current canon is internally inconsistent:

- continuity still calls Episode 05 “The Model Menu”;
- it assigns Cher to Episode 05 while Episode 05 assigns Samantha;
- it says its privacy guardrail sets up Episode 06 when it should set up Episode 07;
- it remains drafting/not recorded.

### Canon rule

Do not enable broad surface derivation until current canon is ruled and unverified MUST-MATCH content is removed.

---

## 7. Additional workstreams from the Codex handover folder

These are real project commitments and must not disappear, but they do not outrank the release recovery.

### 7.1 SUNNYVAiLE High Basics classes

Source: `HANDOVER-basics-intro-2026-07-23.md`

Recorded as **APPROVED, production not started**:

- `operations/classes/basics-what-these-tools-are.CONTENT.md`
- `operations/classes/basics-how-it-works.CONTENT.md`
- `operations/classes/basics-how-it-works.VISUAL-BEATS.md`
- `operations/classes/what-to-use-it-for.PRINTOUT.md`

Locked direction:

- two concept classes;
- illustrated mechanism explainers, not screen recordings;
- no Heroine face in concept frames;
- every frame must pass the mute test;
- approved teaching copy must not be rewritten;
- separate future track for tool-specific screen-recording classes.

Production queue recorded by the earlier handover:

1. Design/render the two-column printout.
2. Render Class B's 11 visual beats.
3. Create Class A's visual-beat sheet, then render.

Do not start this production queue until Ali places it relative to the Episode 04 recovery.

### 7.2 LIBRAiRY and building plan

Source: `HANDOVER-library-and-building-plan.md`

Important reconciliation:

- **VERIFIED LOCAL:** current `Website-homepage/library.html` is byte-identical to `_library-v3.html` and contains the composited bookcase/read-in-place design.
- **VERIFIED LIVE:** laidies.ai still serves the older card/shelf-grid library.

Therefore the earlier statement “LIBRAiRY is rebuilt and LIVE” is now **CONTRADICTED**. The rebuild is present locally, not deployed publicly.

The building redesigns under `operations/building-design-briefs/` are **PROPOSED ONLY**.

Recorded direction:

- library is the proposed building model;
- room render is the page;
- operable objects are separate, obviously clickable renders;
- open in place rather than hotspot hunting;
- no long-scroll center-column building pages;
- agents must not draw replacement art with SVG/CSS approximations.

The local library currently contains Claude-made SVG doodles. Ali's decision to keep, replace, or drop them remains open.

### 7.3 Membership, Supabase, and trading cards

Source: `HANDOVER-membership-and-cards-2026-07-23.md`

Recorded as built/applied in the hosted project:

- Supabase restored.
- Hyvor domain added.
- privacy/public-card migrations;
- resident mail, blocking, best-friend necklace;
- server-side pack opening;
- finish-specific card art paths;
- JoJo standard/front/back/foil card as the approved visual benchmark.

Codex did not independently authenticate into the live Supabase or Hyvor projects during this audit. Treat hosted-service claims as **BUILT, PARTIALLY PROVEN** until an end-to-end signed-in test is run.

Important contradiction:

- Membership handover says Post Office mail UI was wired in a sibling window.
- **VERIFIED LOCAL AND LIVE:** current `post-office.html` contains no `send_resident_mail` or `my_resident_mail` integration and matches the deployed old page.

Therefore the mail backend may exist, but the current frontend claim is **CONTRADICTED**.

Open card work:

- front-end pack opening still uses the wrong client-side economy;
- pack granting is not built;
- leaderboards are not built;
- mail UI is incomplete;
- the migration body problem must be fixed;
- SAiNT cards remain blocked on roster decisions;
- current character face references must be confirmed before rendering.

Locked trading-card distinction:

- episode/interstitial cards: comic-v1-locked, no halftone;
- collectible trading cards: pop-art/halftone candy palette;
- all faces/fronts/backs/foil art are image renders, not CSS overlays.

### 7.4 Tribune, AGI, ideas, and launch material

Source: `HANDOVER-tribune-agi-build-2026-07-23.md`

Recorded state:

- AGI Tribune draft exists at `outputs/overnight-2026-07-23/tribune-drafts/agi.md`.
- It is not final-approved or published.
- Its ladder framing is the recorded direction.
- Specific dated timeline quotes and currency-sensitive facts require re-verification before publication.
- Jobs and bubble topics should freshen existing reference content rather than duplicate it.
- `IDEAS.md` is the recorded idea home.
- Colouring pages, printable bookmarks, and far-future personalized universes were logged.
- Earlier launch plan prioritizes audience-first growth.

Do not publish or silently update time-sensitive AGI/jobs/bubble claims from the handover. Re-verify primary sources at ship time.

### 7.5 Social and revenue

**VERIFIED LOCAL**

- Every item in the Issue 01/02 posting tracker is “Not started.”
- Every website-feature social item is “Not started.”
- The Creatomate/Bannerbear/Airtable/Ayrshare “social engine” is a proposal, not a working system.
- The Shop has 13 products with `buyUrl: "#"`.
- Nothing is currently purchasable.

Recommended near-term operating model:

- keep Buttondown;
- one weekly social batch;
- native Meta scheduling first;
- no six-tool automation purchase until two weeks of a lighter loop proves which formats perform;
- test one revenue offer before building complex membership economics;
- Fourthwall is a possible print-on-demand/digital/member shortlist, subject to samples and business fit.

---

## 8. Product-design findings

### Strong

- Homepage desktop and mobile presentation.
- Episode 04 article visual direction.
- Distinctive SUNNYVAiLE world.
- Cohesive palette, typography, texture, and editorial voice.

### Needs recovery

- Watch route fails at the highest-intent moment.
- Mobile homepage is roughly 17,800 px tall.
- Mobile Episode 04 article is roughly 19,200 px tall.
- Post Office, Shop, Closet, MAiKEOVER, and deployed LIBRAiRY do not match the homepage's implementation depth.
- MAiKEOVER and Shop show large pale/empty regions in the audited state.
- Guest browser activity writes local building-visit state, creating a partially populated “resident” experience without authentication.
- Several present-tense promises describe future or incomplete behavior.

Accessibility limitation: no screen-reader, assistive-technology, or full keyboard-only audit has been completed.

---

## 9. Recommended target operating model

### One machine-readable product manifest

The manifest should declare:

- active brand/canon vocabulary;
- current episode number/title;
- approved narration;
- approved source frames;
- cue sheet;
- captions;
- film master;
- article;
- watch route;
- social derivatives;
- approval and release status.

Human-readable status pages should derive from or link to the manifest rather than compete with it.

### Three asset zones

1. `source-approved` — immutable approved originals.
2. `work` — disposable generations, masks, loops, previews, QC, and intermediate renders.
3. `release` — only approved named masters and metadata.

Legacy/rejected files should be quarantined by manifest status. Do not delete or move approved originals during recovery.

### One release workflow

It must:

1. validate manifest and canon references;
2. validate article, cue, caption, and film duration;
3. build a preview;
4. run links, JavaScript, route, and migration checks against one declared scope;
5. open desktop/mobile critical journeys;
6. require Ali's approval for taste/publication;
7. deploy the exact approved version;
8. verify public routes and media afterward.

### Ali's intended workload

Ali should not be the:

- prompt courier;
- file mover;
- first-line bug finder;
- tool operator;
- status reconciler.

Ali's gates should be limited to:

- story/substance;
- a small number of visual exceptions or one motion proof;
- one final watch/read;
- irreversible publication and business decisions.

---

## 10. Recovery sequence

### Stage 1 — Establish truth

- Freeze new feature scope temporarily.
- Declare active workspace and deployment source.
- Create the product manifest.
- Create a legacy/quarantine map without deleting originals.
- Reconcile Episode 01, 04, 05, and 06 canon conflicts.
- Repair migration reproducibility.

### Stage 2 — Ship one honest episode

- Use Episode 04 unless Ali chooses otherwise.
- Produce and approve one 20–30 second motion proof.
- Apply the accepted grammar to the episode.
- Produce/upload captions.
- Host the film in Cloudflare Stream.
- Wire article and watch page to the same manifest record.
- Preview, deploy, and verify desktop/mobile.

### Stage 3 — Make the public site truthful

- Repair or relabel Post Office, Shop, deployed LIBRAiRY, Closet, and MAiKEOVER.
- Separate guest demonstration state from resident state.
- Tighten excessively long mobile journeys.
- Run full accessibility testing.

### Stage 4 — Repeat and grow

- Move Episodes 03, 02, and 01 through the proven path.
- Produce social derivatives from released episode records.
- Establish weekly newsletter/social cadence.
- Test one revenue offer.
- Resume approved classes, trading cards, Tribune, and building work in a deliberate order.

---

## 11. Decisions pending from Ali

### Immediate recovery decisions

1. Confirm whether the first milestone is Episode 04 fully animated and playing correctly on laidies.ai.
2. Identify any existing 10–30 second clip closest to the desired motion.
3. Choose first revenue direction: merchandise, paid learning/downloads, membership/community, or sponsorship.
4. Confirm which accounts are live/owned: Cloudflare, GitHub, Supabase, Canva, ElevenLabs, Buttondown, Instagram/Meta, LinkedIn, and YouTube. Never request passwords in chat.
5. Decide release-control direction:
   - explicitly replace the current no-git project contract with a narrower safe release contract; or
   - publish through a connected GitHub review workflow without local git commands.

### Later backlog decisions — do not unload all of these onto Ali now

- library SVG doodles: keep, replace with Codex-rendered art, or drop;
- first building rebuild;
- building address/name collisions;
- Class A visual-beat approval and printout format;
- Episode 05 substance approval and remaining title cascade;
- AGI Tribune final approval;
- jobs/bubble refresh scope;
- SAiNT roster;
- Supabase auth redirect verification;
- social account/handle state;
- first paid offer.

---

## 12. Hard rules for the next agent

- Never run git commands under the current `AGENTS.md`.
- Never delete, overwrite, or move an approved original.
- Do not edit site code or canon without a brief authorizing that work.
- Do not reveal environment secrets, anon keys, API tokens, or credentials in reports.
- Do not treat older/rejected/superseded art as reference material.
- Verify public behavior after every release; local success is not deployment success.
- Do not self-certify “done,” “approved,” “on-brand,” or “live.”
- Do not create art with CSS/SVG approximations when the requirement is a rendered asset.
- Do not make Ali operate production tools or manually relay routine prompts/files.
- Do not launch broad multi-agent or overnight work without explicit cost-aware approval.
- Prefer small proofs before full renders, builds, or subscriptions.

---

## 13. Files created by Codex during this takeover session

1. Full audit report and evidence:

`/Users/alisoneakin/.codex/visualizations/2026/07/23/019f904a-c566-79b1-9e1d-1c13a9221a36/laidies-takeover-audit/TAKEOVER-ASSESSMENT.md`

2. This consolidated repository handover:

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/codex-handovers/HANDOVER-codex-takeover-audit-2026-07-23.md`

No other repository file was changed.

---

## 14. One-line current state

**LAiDIES has valuable finished creative material and several partly built systems, but it does not yet have one trustworthy route from approved source to verified public release; prove that route with Episode 04 before expanding scope.**
