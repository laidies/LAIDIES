-- ============================================================================
-- LAiDIES member pass — BASELINE SCHEMA
-- Generated 2026-07-22 by reading the LIVE database (project swqnkxzebxdbgyrzpdne),
-- not by copying the old hand-written content/site/supabase-schema.sql, which
-- documented only 3 of the 6 real tables and had drifted from reality.
--
-- WHY THIS FILE EXISTS
-- Until now, code changes went through git and database changes were typed by
-- hand into the Supabase SQL editor. The two drifted apart silently — see
-- 20260722193000_fix_constraint_drift.sql for the bugs that caused.
-- This file is the starting point so that never happens again: from here, every
-- schema change is a migration in the repo, reviewed alongside the code.
--
-- IDEMPOTENT. Safe to re-run against the existing database — it creates nothing
-- that is already there and re-declares policies rather than duplicating them.
-- ============================================================================

-- ── Sequence backing resident numbers ────────────────────────────────────────
create sequence if not exists public.resident_number_seq;

-- ── member_profiles ──────────────────────────────────────────────────────────
create table if not exists public.member_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text check (display_name is null or char_length(display_name) between 1 and 30),
  member_card_slug text,
  -- NOTE: these two lists are the LIVE (narrow) ones as of this baseline. They do
  -- not match the sign-up form — widened in 20260722193000_fix_constraint_drift.sql.
  industry text check (industry is null or industry in
    ('tax','finance','legal-compliance','ops-product','people-hr','marketing-comms','founder-consultant')),
  ai_comfort text check (ai_comfort is null or ai_comfort in ('new','prompting','weekly-user','workflow-builder','agent-curious')),
  generation text check (generation is null or generation in ('gen-x','elder-millennial','millennial','gen-z','no-label')),
  goal text check (goal is null or goal in
    ('learn-basics','save-time','write-better','build-tools','lead-team','find-community')),
  member_card_is_public boolean not null default false,
  member_card_status text not null default 'private'
    check (member_card_status in ('private','submitted','approved','published','hidden')),
  newsletter_opt_in boolean not null default false,
  newsletter_opted_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Card visual customization (MAiKEOVER)
  card_color_primary text,
  card_color_accent text,
  card_avatar_url text,
  card_role text,
  card_username text unique check (card_username is null or card_username ~ '^[a-z0-9_]{3,24}$'),
  resident_number integer unique,
  avatar_slug text,
  card_archetype text,
  card_motto text check (card_motto is null or char_length(card_motto) <= 80),
  card_created_at timestamptz,
  card_updated_at timestamptz,
  -- Resident Card v2 favourites (see memory: residence-card-format-v2)
  favorite_saint text,
  favorite_song text,
  favorite_activity text,
  favorite_episode text,
  favorite_storefront text,
  favorite_character text,
  favorite_cocktail text,
  favorite_quote text check (favorite_quote is null or char_length(favorite_quote) <= 140),
  -- Social surface (front end does not use these yet — 2026-07-22)
  accept_public_notes boolean default true,
  pinned_collectible_type text,
  pinned_collectible_ref text,
  away_message text check (away_message is null or char_length(away_message) <= 140),
  away_expires_at timestamptz,
  besties jsonb default '[]'::jsonb
);

create unique index if not exists member_profiles_member_card_slug_key
  on public.member_profiles(member_card_slug) where member_card_slug is not null;
create index if not exists idx_member_profiles_card_username
  on public.member_profiles(card_username) where card_username is not null;
create index if not exists idx_member_profiles_public
  on public.member_profiles(card_username, member_card_is_public) where member_card_is_public = true;

-- ── member_reward_events ─────────────────────────────────────────────────────
create table if not exists public.member_reward_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  dedupe_key text not null,
  -- LIVE (incomplete) list as of this baseline — the code emits two types this
  -- rejects. Fixed in 20260722193000_fix_constraint_drift.sql.
  reward_type text not null check (reward_type in (
    'quiz_score','quiz_sticker','sticker_girl_talk','trading_card','hidden_charm',
    'merit_badge','secret_badge','dare_completed','dare_penalty')),
  issue_key text,
  title text not null,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  earned_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id, dedupe_key)
);

create index if not exists member_reward_events_user_earned_idx
  on public.member_reward_events(user_id, earned_at desc);
create index if not exists member_reward_events_user_type_idx
  on public.member_reward_events(user_id, reward_type);

-- ── member_issue_progress ────────────────────────────────────────────────────
create table if not exists public.member_issue_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  issue_key text not null,
  quiz_latest_score integer check (quiz_latest_score is null or quiz_latest_score between 0 and 12),
  quiz_best_score integer check (quiz_best_score is null or quiz_best_score between 0 and 12),
  quiz_attempts integer not null default 0 check (quiz_attempts >= 0),
  sticker_title text,
  sticker_tier text,
  card_count integer not null default 0 check (card_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, issue_key)
);

-- ── member_pinned_references (the Cheat Sheet) ───────────────────────────────
create table if not exists public.member_pinned_references (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference_type text not null check (reference_type in ('decoder','chamber','handbook','episode','saint','lore')),
  reference_slug text not null,
  user_note text check (user_note is null or char_length(user_note) <= 280),
  is_public boolean not null default false,
  pinned_at timestamptz not null default now(),
  unique (user_id, reference_type, reference_slug)
);

create index if not exists idx_pinned_refs_user on public.member_pinned_references(user_id);
create index if not exists idx_pinned_refs_public on public.member_pinned_references(user_id) where is_public = true;

-- ── town_hall_feedback ───────────────────────────────────────────────────────
create table if not exists public.town_hall_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  submission_type text not null check (submission_type in ('compliment','complaint','suggestion')),
  subject text check (subject is null or char_length(subject) <= 100),
  body text not null check (char_length(body) between 3 and 2000),
  submitter_email text,
  submitter_display_name text,
  status text not null default 'filed'
    check (status in ('filed','triaged','addressed','ignored','deb-flected')),
  admin_notes text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists idx_town_hall_feedback_user on public.town_hall_feedback(user_id);
create index if not exists idx_town_hall_feedback_status on public.town_hall_feedback(status, submitted_at desc);

-- ── ksvl_song_requests ───────────────────────────────────────────────────────
create table if not exists public.ksvl_song_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  song_style text not null,
  topic text not null check (char_length(topic) between 3 and 200),
  lyric_ideas text check (lyric_ideas is null or char_length(lyric_ideas) <= 1000),
  status text not null default 'submitted'
    check (status in ('submitted','in-production','shipped','declined')),
  suno_prompt_id text,
  released_track_id text,
  admin_notes text,
  submitted_at timestamptz not null default now(),
  status_updated_at timestamptz
);

create index if not exists idx_ksvl_requests_user on public.ksvl_song_requests(user_id);
create index if not exists idx_ksvl_requests_status on public.ksvl_song_requests(status, submitted_at desc);

-- ── Functions + triggers ─────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Assigns the resident number and stamps card timestamps on first real save.
create or replace function public.member_profiles_before_write()
returns trigger language plpgsql as $$
BEGIN
  IF NEW.resident_number IS NULL
     AND (NEW.display_name IS NOT NULL OR NEW.card_username IS NOT NULL)
  THEN
    NEW.resident_number := nextval('public.resident_number_seq');
  END IF;

  IF NEW.card_created_at IS NULL
     AND (NEW.display_name IS NOT NULL OR NEW.card_username IS NOT NULL OR NEW.favorite_saint IS NOT NULL)
  THEN
    NEW.card_created_at := now();
  END IF;

  IF NEW.card_username IS NOT NULL
     OR NEW.display_name IS NOT NULL
     OR NEW.favorite_saint IS NOT NULL
     OR NEW.favorite_song IS NOT NULL
     OR NEW.avatar_slug IS NOT NULL
     OR NEW.card_motto IS NOT NULL
     OR NEW.favorite_quote IS NOT NULL
  THEN
    NEW.card_updated_at := now();
  END IF;

  RETURN NEW;
END;
$$;

drop trigger if exists set_member_profiles_updated_at on public.member_profiles;
create trigger set_member_profiles_updated_at
before update on public.member_profiles
for each row execute function public.set_updated_at();

drop trigger if exists member_profiles_before_write on public.member_profiles;
create trigger member_profiles_before_write
before insert or update on public.member_profiles
for each row execute function public.member_profiles_before_write();

drop trigger if exists set_member_issue_progress_updated_at on public.member_issue_progress;
create trigger set_member_issue_progress_updated_at
before update on public.member_issue_progress
for each row execute function public.set_updated_at();

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.member_profiles          enable row level security;
alter table public.member_reward_events     enable row level security;
alter table public.member_issue_progress    enable row level security;
alter table public.member_pinned_references enable row level security;
alter table public.town_hall_feedback       enable row level security;
alter table public.ksvl_song_requests       enable row level security;

-- member_profiles
drop policy if exists "Members can read their profile"   on public.member_profiles;
drop policy if exists "Members can create their profile" on public.member_profiles;
drop policy if exists "Members can update their profile" on public.member_profiles;
drop policy if exists "Closet owner write"               on public.member_profiles;
drop policy if exists "Closet public read"               on public.member_profiles;

create policy "Members can read their profile"   on public.member_profiles for select using (auth.uid() = id);
create policy "Members can create their profile" on public.member_profiles for insert with check (auth.uid() = id);
create policy "Members can update their profile" on public.member_profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Closet owner write"               on public.member_profiles for all using (auth.uid() = id) with check (auth.uid() = id);
-- ⚠ SEE 2026-07-22 AUDIT: this exposes EVERY column of a public profile —
-- including `email` — to anyone holding the (public) anon key. RLS filters rows,
-- not columns. Harmless while no profile is public; a leak the moment one is.
-- Left as-is deliberately: changing it is Ali's call, not a silent migration.
create policy "Closet public read"               on public.member_profiles for select using (member_card_is_public = true or auth.uid() = id);

-- member_reward_events
drop policy if exists "Members can read their rewards"   on public.member_reward_events;
drop policy if exists "Members can create their rewards" on public.member_reward_events;
drop policy if exists "Members can update their rewards" on public.member_reward_events;
drop policy if exists "Closet public reward read"        on public.member_reward_events;

create policy "Members can read their rewards"   on public.member_reward_events for select using (auth.uid() = user_id);
create policy "Members can create their rewards" on public.member_reward_events for insert with check (auth.uid() = user_id);
create policy "Members can update their rewards" on public.member_reward_events for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Closet public reward read"        on public.member_reward_events for select
  using (auth.uid() = user_id or exists (
    select 1 from public.member_profiles p where p.id = member_reward_events.user_id and p.member_card_is_public = true));

-- member_issue_progress
drop policy if exists "Members can read their issue progress"   on public.member_issue_progress;
drop policy if exists "Members can create their issue progress" on public.member_issue_progress;
drop policy if exists "Members can update their issue progress" on public.member_issue_progress;
drop policy if exists "Closet public issue read"                on public.member_issue_progress;

create policy "Members can read their issue progress"   on public.member_issue_progress for select using (auth.uid() = user_id);
create policy "Members can create their issue progress" on public.member_issue_progress for insert with check (auth.uid() = user_id);
create policy "Members can update their issue progress" on public.member_issue_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Closet public issue read"                on public.member_issue_progress for select
  using (auth.uid() = user_id or exists (
    select 1 from public.member_profiles p where p.id = member_issue_progress.user_id and p.member_card_is_public = true));

-- member_pinned_references
drop policy if exists "Cheat sheet owner write"      on public.member_pinned_references;
drop policy if exists "Cheat sheet public pin read"  on public.member_pinned_references;

create policy "Cheat sheet owner write"     on public.member_pinned_references for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Cheat sheet public pin read" on public.member_pinned_references for select
  using (auth.uid() = user_id or (is_public = true and exists (
    select 1 from public.member_profiles p where p.id = member_pinned_references.user_id and p.member_card_is_public = true)));

-- town_hall_feedback  (anonymous submissions allowed: user_id may be null)
drop policy if exists "Town Hall own insert" on public.town_hall_feedback;
drop policy if exists "Town Hall own read"   on public.town_hall_feedback;

create policy "Town Hall own insert" on public.town_hall_feedback for insert with check (auth.uid() = user_id or user_id is null);
create policy "Town Hall own read"   on public.town_hall_feedback for select using (auth.uid() = user_id);

-- ksvl_song_requests
drop policy if exists "KSVL request own insert" on public.ksvl_song_requests;
drop policy if exists "KSVL request own read"   on public.ksvl_song_requests;

create policy "KSVL request own insert" on public.ksvl_song_requests for insert with check (auth.uid() = user_id or user_id is null);
create policy "KSVL request own read"   on public.ksvl_song_requests for select using (auth.uid() = user_id);
