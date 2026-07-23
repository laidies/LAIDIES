-- ============================================================================
-- Fix the code↔database constraint drift found in the 2026-07-22 member audit.
-- Full write-up: operations/member-promises-audit-2026-07-22.md
--
-- ROOT CAUSE (proven from git, not guessed): code changes went through git,
-- database changes were typed by hand into the SQL editor. Commit 18b12e4
-- ("Express tour now earns its own reward") added a new reward type to
-- script.js and touched ONLY script.js. Nothing carried it to the constraint.
--
-- Additive and safe: widening a CHECK constraint cannot invalidate existing
-- rows, and no data is modified. Verified against live data before writing —
-- 0 rows violate either new constraint.
-- ============================================================================

-- ── 1 · reward_type — the code emits two values the database rejects ─────────
--
-- SEVERITY: high. script.js:2886 upserts ALL of a resident's rewards in ONE
-- batch. In Postgres a CHECK violation on any row aborts the whole statement,
-- so a single `sticker_express` event rejected every sticker, charm, trading
-- card and merit badge alongside it — then threw, skipping the issue-progress
-- sync on the next line. The resident saw only "Sync needs attention".
--
--   sticker_express     — earned by finishing the Express tour. LIVE TODAY.
--   community_room_post — fires once the rooms are gated on sign-in
--                         (see memory: signed-in-gate-rooms-and-girl-talk).
--
-- `dare_completed` is kept: nothing emits it yet, but Girl Talk is specced to.

alter table public.member_reward_events
  drop constraint if exists member_reward_events_reward_type_check;

alter table public.member_reward_events
  add constraint member_reward_events_reward_type_check
  check (reward_type in (
    'quiz_score',
    'quiz_sticker',
    'sticker_girl_talk',
    'sticker_express',      -- ADDED 2026-07-22
    'trading_card',
    'hidden_charm',
    'merit_badge',
    'secret_badge',
    'dare_completed',
    'dare_penalty',
    'community_room_post'   -- ADDED 2026-07-22
  ));

-- ── 2 · industry — half the sign-up dropdown was being discarded ─────────────
--
-- SEVERITY: medium, and silent. The form offers 14 industries; the database
-- accepted 7. getSupabaseSafeProfileValue() in script.js filters to the same 7,
-- so nothing errored — the resident's answer was just saved as NULL. She picks
-- "Tech / Engineering", the town forgets she said it.
--
-- These 7 values are now accepted. script.js's allow-list is widened to match
-- in the same change; the two lists must stay in step.

alter table public.member_profiles
  drop constraint if exists member_profiles_industry_check;

alter table public.member_profiles
  add constraint member_profiles_industry_check
  check (industry is null or industry in (
    'tax',
    'finance',
    'legal-compliance',
    'ops-product',
    'people-hr',
    'marketing-comms',
    'founder-consultant',
    'tech-engineering',        -- ADDED 2026-07-22
    'data-analytics',          -- ADDED
    'sales-bizdev',            -- ADDED
    'education-training',      -- ADDED
    'health-life-sciences',    -- ADDED
    'government-public',       -- ADDED
    'creative-media'           -- ADDED
  ));

-- `goal` is deliberately untouched: the form offers exactly the 6 values the
-- database already accepts. Verified 2026-07-22 — no drift there.
