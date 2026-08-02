# Operating-system review coverage matrix

Status: **REQUIRED COVERAGE — NO REVIEW HANDOFF UNTIL EVERY ROW IS ADDRESSED**

Evidence date: 2026-08-02

This matrix prevents a concise operating brief from silently dropping detailed
work Ali already specified. The independent review may find a row working,
partial, documentary, conflicting or missing, but it may not omit it.

| Area | Required scope of review |
|---|---|
| Authority and memory | Precedence, newest evidence selection, conflict handling, compaction/re-entry, canonical dependency inheritance, idea capture and no silent replacement of active work. |
| Portfolio ownership | All 67 products, 17 building/function groups, champions, guild specialists, maker/judge/release separation, owner entry, handbacks and integration ownership. |
| Task execution | Capture, prerequisites, brief, pilot, build, deterministic checks, independent review, integration, Ali decision, release, public verification and learning scan. |
| Anti-stall | Real task IDs, heartbeat, timeout, retry budget, two-cycle stop-loss, blocked owner/unblock/recheck, cycle escalation and automatic removal of stale `RUNNING`. |
| Parallel work | Non-colliding research, building, content, media and review lanes; shared-write isolation; worktrees; integration locks; model/credit routing. |
| Scheduling and triggers | Actual configured schedules for Control Room, twice-daily trusted-source/freshness scans, NewsStand, weekly episodes, building health, social, analytics, release derivatives and backlog rechecks. Plans are not schedules. |
| Owner app / Control Room | Mobile and desktop; Needs Ali, live work, blockers, ready-to-release, public receipts, agent/site health, new content, visitors, sign-ups, analytics, schedule, social, recommendations and one-action decisions. |
| Repository and worktree | Half-built and untracked work inventory; source/work/review/release/rejected/archive zones; active-generation allowlists; exact commits; large-media strategy; non-destructive recovery. |
| Brand/canon/assets | Current palette, wordmark, heroine/wardrobe, town/buildings/map, character roles, image style, motion language, approved vs retired/rejected sources and deterministic builder admission. |
| Shared site UX | Consistent headers/navigation, back/return behavior, first-time comprehension, mobile/desktop, accessibility, performance, privacy and coherent SUNNYVAiLE world. |
| Building experiences | Every building page/subpage feels like the real building while remaining intuitive; meaningful mechanics, no generic card-grid redesign, no invented state, no unnecessary click layers or endless scroll. |
| Visitor-state journeys | First visit, returning non-resident, resident signed in, returning resident signed out/expired, incomplete Card, referral/deep-link, empty/loading/error/offline/provider failure and recovery. |
| Identity and Resident Card | Supabase Auth/magic links, Card create/claim/edit, portrait/glow-up generation, account restoration, RLS/isolation, UI sign-out/recovery, accessibility, public/private boundaries and current receipt reconciliation. |
| Closet and saved state | Saves, collections, charms, stamps/badges/cards, Puffy items, progress, account/device boundaries, add/remove, restore, duplicate handling, privacy, export/recovery and truthful ownership. |
| Rewards/economy | Butterfly clips earned/spent/balance/ledger, earning rates, redemptions, FAiRY plays, possible clip-to-play exchange, abuse/idempotency, affordability, gifting, future monetization and no false economy claims. |
| Gifting | Eligible items, sender/recipient identity, atomic duplicate prevention, note/privacy/safety, notification, accept/decline, Closet arrival, failure/retry and current public evidence. |
| Resident messaging | Direct/group messaging, inbox/unread indicator, identity, privacy, block/report/moderation, notification, retention/deletion, signed-out state, mobile/desktop, failure/recovery and whether it is actually public/operational. |
| Community chats | HYVOR room discovery, separate HYVOR sign-in, posting/replies, moderation/reporting, provider failure, digest ingestion, rewards boundary, privacy/terms and resident-vs-provider identity clarity. |
| FAiRY Godmother | OpenAI/ChatGPT API path, purpose and prompt contract, context/privacy, model freshness, rate/cost limits, abuse/safety, FAiRY-play entitlement, response quality, persistence, retries/errors and visitor UX. |
| Episodes/trailer/video | Narration-picture semantic fit, correct identity/wardrobe/location, real animation, captions below picture, intro/outro/credits, covers/thumbnails/metadata, playback, portable listening, updates, hosting and public binding. |
| Classes and recorded learning | Concept goals, questions answered, outcomes, why/how mental models, story/examples/counterexamples, lesson-sized narration, screenshots/screen recordings, updateable modularity, assessment/practice and delivery best practices. |
| Learning ecosystem | Distinct roles and harmony across episodes, study packs, quizzes, library, classes, NewsStand, Promptoscope, tips, career guidance, songs, games and community; avoid duplication and gaps. |
| Freshness and discovery | Twice-daily vetted intake, official/primary sources, AI Daily Brief/Ethan Mollick and other trusted voices, claim expiry, contradiction scan, content graph, indexing/search, learn-more links and owned build triggers. |
| NewsStand pipeline | Research through editorial/technical/voice/format review, canonical record, page/listing/search/topic/archive, Homepage/Daily Buzz, sources, related learning, sitemap/metadata/feed and exact public discovery chain. |
| Social/audience engine | Trends, original idea intake, channel-native production, rights/accessibility, Ali approval, schedule/publish/public verification, first-comment/support actions, replies/moderation, analytics/experiments, Instagram/LinkedIn/YouTube and derivatives. |
| Audio/music distribution | Songs and episode audio for driving/walking, KSVL, feeds, YouTube, Apple/Spotify options, intro/outro, band/artist names, covers, rights, metadata, replacement/update propagation and analytics. |
| Services/subscriptions/tools | Complete discovered inventory including GitHub, Cloudflare, Plausible, Microsoft/OneDrive, OpenAI/Codex, Claude, Supabase, Buttondown, HYVOR, ElevenLabs, Suno, Canva, CapCut, social/distribution/hosting/schedulers; cost, renewal, credentials boundary, data, evidence, fallback and exit. |
| Tool/plugin/connector/skill opportunities | Recommend missing tools only when they remove a measured bottleneck or close a required capability. Include native Codex skills/plugins/connectors, third-party services and build-vs-buy; score benefit, cost, privacy/security, lock-in, setup/maintenance, overlap and migration. |
| Analytics and health | Public bytes/journeys, errors, freshness, visitors, sign-ups, returning use, popular/unpopular content, funnel/drop-off, agent health, schedule health and ranked evidence-based improvements; unknown is not zero. |
| Revenue | Owned research lane, feasible near-/later-term offers, pricing/fulfilment/economics, entitlement design, sponsorship/affiliate/merch/course/community possibilities, ethical fit and easy future activation without false live commerce. |
| Rights and anti-theft | Copyright/terms, provenance, source protection, metadata/watermarks where useful, platform controls, monitoring/takedowns, licensing, creator-source attribution and shareability without promising impossible copy prevention. |
| Launch/release | Opening-day cutline, enough content through Episode 04, honest promise inventory, release manifest, exact commit/artifact/deployment, rollback, public verification and post-release monitoring. |
| Ideas and backlog | Full inventory of built/partial/logged/not-started ideas—including Book Fair, trading cards, clips, charms, Closet, messages, skill levels, uplifting messages, Town Group Chat, career/life-to-AI tips, AIDB-derived classes and town newspaper content—with owner, building, timing and acceptance. |
| Efficiency | Pilot-before-batch, minimum sufficient evidence, reuse accepted proof, no repeated originality checks, reviewer limited to material defects, stop-doing list and measurable throughput/quality feedback. |

## Required reviewer discipline

For every row, cite exact evidence and return one state:
`WORKING`, `PARTIAL`, `DOCUMENTARY`, `CONFLICTING` or `MISSING`. A broad PASS in
one subflow cannot be borrowed by another. Conversely, a bounded remaining
gap cannot erase a verified released core.
