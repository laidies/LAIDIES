# OS Pass: Social + Growth — State of the World

Scope read: `social/**`, `docs/growth/**`, `docs/handoffs/**`, `INSTAGRAM-STRATEGY.md`, `INSTAGRAM-CONTENT-BANK.md`, `scripts/generate-social-proof.py`, plus `scripts/build-episode-assets.js` and `scripts/run-weekly-production.js` (the actual generators the docs point to).

Handles per memory: YouTube `@LAiDIES`, Instagram `@laidies.ai`.

---

## Verdict: is there a real, running social operation?

**No. It is a well-developed plan with a partial content-generation pipeline, and zero evidence of anything actually posted.**

Evidence:

- Every row of both posting trackers is `Not started`. `social/issue-01-02-posting-tracker.csv` (10 rows, all "Not started") and `social/website-feature-posting-tracker.csv` (13 rows, all "Not started").
- No posting/scheduling integration exists anywhere in the repo. A grep for `graph.facebook`, `instagram api`, `access_token`, `buffer`, `later`, `hootsuite`, `ayrshare`, `youtube api`, `oauth` across `.js/.py/.md/.json` returned **no matches**. Publishing is 100% manual (Meta Business Suite + Canva + phone), per `social/ISSUE-01-02-SOCIAL-START-HERE.md` lines 65-74, 304-318.
- `generate-social-proof.py` has never produced output on Ali's machine: `social/generated/` is empty (`find social/generated -type f` returns nothing).
- The richest, publish-ready social copy (Issue 03 kit) is **hand-authored**, not generated — the automated generator produces a much thinner kit (see "Automation" below).

So: strong strategy docs, three episodes' worth of drafted copy, a copy generator, and a review dashboard. No account activity, no graphics at scale, no video, no scheduling.

---

## What actually works (verified)

1. **A real markdown-copy generator.** `scripts/build-episode-assets.js` reads `content/episodes/issue-XX.json` and writes, per issue: an Instagram kit (`buildInstagramKit`, 3 Reels + 7-slide carousel + 5-frame Stories + hashtags/tags), a LinkedIn draft (`buildLinkedInPost`), a Buttondown email (`buildButtondownDraft`), a community prompt (`buildCommunityPrompt`), plus the issue HTML page, `content/episode-index.json`, and `content/site/site-data.js`. It runs (Node, no external deps). Outputs confirmed present for issues 01-03.
2. **A weekly review/ops layer.** `scripts/run-weekly-production.js` generates a production-readiness packet, a growth scorecard template, an ~40-agent "Agent Council" review, and a `weekly-command-center.html` dashboard that links every generated asset with per-step status (done/ready/action/todo). This is the closest thing to an operating system — but it reviews and routes, it does not post.
3. **Coherent, non-generic strategy.** `SOCIAL-GROWTH-OPERATING-RULES.md` and `INSTAGRAM-STRATEGY.md` define a defensible weekly package, a website-traffic rule (every batch must send 1 link to the issue + 1 to a named website feature), a sustainable-volume rule (explicitly rejects "14 posts/day"), voice guardrails, and a source-of-truth order that forbids building from the thin generated kit alone.
4. **Website-feature-to-social mapping.** `WEBSITE-FEATURE-SOCIAL-PLAN.md` + `website-feature-posting-tracker.csv` pair each interactive feature (Ask LAIDY, Madame CLAI-O, Dream Phone, Girl Talk, Quiz, Card Pack, Glossary Rolodex, Try-On, Burn Book, House DJ, Member Cards) with a hook, format, asset list, and exact link/anchor.
5. **A recurring weekly-series spine.** `social/instagram/content-bank/weekly-alliteration-series.md` defines Makeover Monday / Terry Tuesday / On Wednesdays We Use AI / Thursday Try-On / Fetch Friday / Soundtrack Saturday / Small Sip Sunday — a low-lift daily skeleton that maps cleanly onto an episode.
6. **LinkedIn plan is sound.** `LINKEDIN-STRATEGY.md`: lead with Ali's personal profile for reach, brand Page as legitimacy/reposting home. Generator already emits a LinkedIn draft per issue.

---

## What is broken or misleading

1. **The generated Instagram kit is skeletal vs. the hand-authored one.** `buildInstagramKit()` (build-episode-assets.js:250-480) stitches JSON fields into a generic 3-Reel/7-slide template. Compare to the **hand-written** `social/episodes/issue-03-instagram-kit.md` (10-slide carousel with per-slide styling notes, 2 distinct Reel options, production/palette notes, "Ask Me Your AI Questions" caption). The good social content is manual labor; the automated content is a starting checklist. The docs even admit this ("The generated kit is a starting checklist, not the final creative," operating-rules line 53). So automation covers the low-value 20%, not the high-value 80%.
2. **`generate-social-proof.py` is effectively dead / Mac-broken.** It is hardcoded to Issue 01 only (`make_cover()` produces one slide from a curation-flagged Issue-01 art file), and its font loader only looks at `C:/Windows/Fonts/*` (lines 24-33). On Ali's darwin machine it silently falls back to `ImageFont.load_default()` — tiny bitmap type, not the brand look. It is not called by any pipeline; output dir is empty.
3. **Handle / domain drift.** Social docs consistently say `@we.are.laidies` (6 refs) and `wearelaidies.com` (11 refs). Memory canon is Instagram `@laidies.ai` and domain `laidies.ai`. The generator hardcodes `https://laidies.ai/` (build-episode-assets.js:33) while the Issue 03 kit links `wearelaidies.com`. **YouTube (`@LAiDIES`) appears nowhere in any social doc** — there is no video/YouTube social plan at all, despite YT being a primary handle.
4. **The "growth scorecard" is a blank manual form.** `buildGrowthScorecard()` emits empty fields (subscribers:, opens:, saves:, shares:…). There is no analytics ingestion (no Plausible/IG-insights/Buttondown pull). Measurement depends entirely on Ali typing numbers in by hand every Friday — which, given nothing is posted yet, has never happened.
5. **Pipeline coverage stops at Issue 03.** Only `issue-01/02/03.json` exist, so only three issues have generated kits/emails/prompts. Episodes 04-05 (which memory shows are the live editorial focus) have **no generated social assets**.
6. **PowerShell-only runners.** The weekly entry points are `.ps1` (`start-weekly-workflow.ps1`, `run-weekly-production.ps1`) with a Windows codex-runtime node path baked into the docs (START-HERE:361). On macOS these need `node scripts/…` directly. Friction for Ali running it herself.

---

## Gaps (what's missing entirely)

- **No graphics engine.** Carousels/Story frames/Reel covers are all manual Canva work. `generate-social-proof.py` was the only attempt and it's stranded. Nothing turns the generated slide text into on-brand images at scale.
- **No video/Reel production path.** Reels are "record on your phone." No stills-to-motion, no CapCut template, no auto-captioning — despite the episode machine already producing town art and the memory notes on CapCut/Canva image-to-video.
- **No scheduling or posting.** No Meta Business Suite API, no Buffer/Later, no draft push. Every asset is copy-paste-by-hand.
- **No analytics loop.** Scorecard is a blank template; nothing reads IG insights, Buttondown, or site analytics back in.
- **The alliteration weekly series is not wired to the generator.** It lives as prose in the content bank; `buildInstagramKit` does not emit Monday-Sunday framed posts.
- **No YouTube plan.** Primary handle, zero strategy/assets.

---

## What a weekly social output SHOULD be, derived from one episode

The canon is already written across the strategy docs; it just isn't automated past thin copy. Per `content/episodes/issue-XX.json`, one episode should fan out to:

**Core package (from `SOCIAL-GROWTH-OPERATING-RULES.md` "Weekly Content Mix"):**
1. **1 discovery Reel** — episode hook (`social.reelHooks[0]`) → "read the issue" CTA.
2. **1 saveable carousel** — one concept from the episode (not a full summary), copy/paste prompt in caption.
3. **1 website-feature post** — pick the feature paired to the issue in `WEBSITE-FEATURE-SOCIAL-PLAN.md` (e.g. Ep03 → Burn Book / verification), direct anchor link.
4. **1 Story sequence** — poll/question + link sticker to the issue page (`episode.issueUrl`).
5. **1 community prompt** — `episode.communityPrompt` → the Room / Try-On Debrief.

**Layered on top:**
- **Website-traffic rule:** at least one surface links to the full issue AND one links to a named feature, with a specific CTA (not "link in bio").
- **Daily light Story presence** using the alliteration spine (Makeover Monday … Small Sip Sunday), so the account keeps the ring without new ideas daily.
- **1 LinkedIn post** (personal-voice draft already generated) — the founder-voice cross-post.
- **Hashtags:** brand set `#LAiDIES #GirlPowerMeetsMachinePower #OnWednesdaysWeUseAI` + 5-8 rotating topical tags.

**The automatable slice of that (what a real OS should generate, not just template):** Reel script + on-screen hook, carousel slide copy AND rendered on-brand slides, Story frame copy + poll text + correct link/anchor, community prompt, LinkedIn draft, hashtag set, and a filled-in tracker row per surface — all keyed off the one episode JSON, using canonical handle/domain, for the current episode (04/05+), pushed to drafts.

---

## Key paths

- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/build-episode-assets.js` — the copy generator (IG kit, LinkedIn, email, community prompt) from `content/episodes/issue-XX.json`.
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/run-weekly-production.js` — review packets + `weekly-command-center.html` dashboard.
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/generate-social-proof.py` — stranded, Issue-01-only, Windows-font-only slide renderer.
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/social/SOCIAL-GROWTH-OPERATING-RULES.md` — weekly rules + source-of-truth order (authoritative).
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/social/WEBSITE-FEATURE-SOCIAL-PLAN.md` — feature→post mapping.
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/social/instagram/content-bank/weekly-alliteration-series.md` — daily series spine.
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/social/issue-01-02-posting-tracker.csv` + `social/website-feature-posting-tracker.csv` — all "Not started".
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/social/episodes/issue-03-instagram-kit.md` — the hand-authored gold-standard kit (contrast with generator output).
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/docs/growth/laidies-growth-operating-system.md` — the flywheel + phased monetization plan.
