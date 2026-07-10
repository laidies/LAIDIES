-- LAiDIES — Member Pass schema (Supabase)
-- Project: laidies-member-pass
-- Last updated: 2026-06-30 (extended for Girl Talk events, charm hunt, merit badges, card customization)
--
-- Run this in the Supabase SQL editor. Idempotent — safe to re-run.
-- After the existing v1 was first drafted, this file was extended to cover the
-- full card surface (stickers from quiz AND Girl Talk, dares completed +
-- penalties, hidden charms found in town images, merit badges, and card
-- visual customization fields). The reward_type check constraint expansion
-- + new columns at the bottom apply cleanly whether or not v1 ran first.

create table if not exists public.member_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  member_card_slug text,
  industry text check (industry is null or industry in ('tax', 'finance', 'legal-compliance', 'ops-product', 'people-hr', 'marketing-comms', 'founder-consultant', 'tech-engineering', 'data-analytics', 'sales-bizdev', 'education-training', 'health-life-sciences', 'government-public', 'creative-media', 'exploring')),
  ai_comfort text check (ai_comfort is null or ai_comfort in ('new', 'prompting', 'weekly-user', 'workflow-builder', 'agent-curious')),
  generation text check (generation is null or generation in ('gen-x', 'elder-millennial', 'millennial', 'gen-z', 'no-label')),
  goal text check (goal is null or goal in ('learn-basics', 'save-time', 'write-better', 'build-tools', 'lead-team', 'find-community', 'confidence', 'templates', 'automate-work', 'career-growth')),
  goals text[] not null default '{}'::text[],
  member_card_is_public boolean not null default false,
  member_card_status text not null default 'private' check (member_card_status in ('private', 'submitted', 'approved', 'published', 'hidden')),
  -- Card visual customization (MAiKEOVER builder)
  card_color_primary text,      -- hex code, e.g. '#4b2148' (plum)
  card_color_accent text,       -- hex code, e.g. '#c9a227' (gold)
  card_avatar_url text,         -- URL to the avatar image picked at MAiKEOVER
  card_role text,               -- the role tag the member chose (free text, kept open for now)
  -- Newsletter
  newsletter_opt_in boolean not null default false,
  newsletter_opted_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists member_profiles_member_card_slug_key
on public.member_profiles(member_card_slug)
where member_card_slug is not null;

create table if not exists public.member_reward_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  dedupe_key text not null,
  reward_type text not null check (
    reward_type in (
      'quiz_score',         -- per-quiz score event (denormed onto member_issue_progress)
      'quiz_sticker',       -- the sticker awarded for that quiz attempt
      'sticker_girl_talk',  -- Girl Talk sticker (from completing dares, etc.)
      'trading_card',       -- one card unwrapped from the weekly pack (metadata.card_id)
      'hidden_charm',       -- charm spotted in a town image (metadata.charm_id, metadata.image)
      'merit_badge',        -- earned-on-purpose milestone (full week, every quiz, etc.)
      'secret_badge',       -- Easter-egg badge (found by accident)
      'dare_completed',     -- Girl Talk dare completed
      'dare_penalty'        -- Girl Talk dare declined → penalty
    )
  ),
  issue_key text,
  title text not null,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  earned_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id, dedupe_key)
);

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_member_profiles_updated_at on public.member_profiles;
create trigger set_member_profiles_updated_at
before update on public.member_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_member_issue_progress_updated_at on public.member_issue_progress;
create trigger set_member_issue_progress_updated_at
before update on public.member_issue_progress
for each row execute function public.set_updated_at();

alter table public.member_profiles enable row level security;
alter table public.member_reward_events enable row level security;
alter table public.member_issue_progress enable row level security;

drop policy if exists "Members can read their profile" on public.member_profiles;
drop policy if exists "Members can create their profile" on public.member_profiles;
drop policy if exists "Members can update their profile" on public.member_profiles;
drop policy if exists "Members can read their rewards" on public.member_reward_events;
drop policy if exists "Members can create their rewards" on public.member_reward_events;
drop policy if exists "Members can update their rewards" on public.member_reward_events;
drop policy if exists "Members can read their issue progress" on public.member_issue_progress;
drop policy if exists "Members can create their issue progress" on public.member_issue_progress;
drop policy if exists "Members can update their issue progress" on public.member_issue_progress;

create policy "Members can read their profile"
on public.member_profiles for select
using (auth.uid() = id);

create policy "Members can create their profile"
on public.member_profiles for insert
with check (auth.uid() = id);

create policy "Members can update their profile"
on public.member_profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Members can read their rewards"
on public.member_reward_events for select
using (auth.uid() = user_id);

create policy "Members can create their rewards"
on public.member_reward_events for insert
with check (auth.uid() = user_id);

create policy "Members can update their rewards"
on public.member_reward_events for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Members can read their issue progress"
on public.member_issue_progress for select
using (auth.uid() = user_id);

create policy "Members can create their issue progress"
on public.member_issue_progress for insert
with check (auth.uid() = user_id);

create policy "Members can update their issue progress"
on public.member_issue_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- ============================================================================
-- Idempotent migration block — applies extensions if v1 already ran
-- (CREATE TABLE IF NOT EXISTS above won't add new columns to an existing
--  table or update a check constraint, so we re-apply them here.)
-- ============================================================================

-- Card customization columns (no-op if already present)
alter table public.member_profiles add column if not exists card_color_primary text;
alter table public.member_profiles add column if not exists card_color_accent text;
alter table public.member_profiles add column if not exists card_avatar_url text;
alter table public.member_profiles add column if not exists card_role text;

-- Extend reward_type constraint to v2 set
alter table public.member_reward_events drop constraint if exists member_reward_events_reward_type_check;
alter table public.member_reward_events add constraint member_reward_events_reward_type_check
  check (reward_type in (
    'quiz_score',
    'quiz_sticker',
    'sticker_girl_talk',
    'trading_card',
    'hidden_charm',
    'merit_badge',
    'secret_badge',
    'dare_completed',
    'dare_penalty'
  ));

-- Helpful indexes for the dashboard reads at MAiKEOVER (this week's haul)
create index if not exists member_reward_events_user_earned_idx
on public.member_reward_events(user_id, earned_at desc);

create index if not exists member_reward_events_user_type_idx
on public.member_reward_events(user_id, reward_type);
