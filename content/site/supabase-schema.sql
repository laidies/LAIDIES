-- lAIdies Clubhouse Pass magic-link setup
-- Run this in the Supabase SQL editor for the project that will own member login.

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
    reward_type in ('quiz_score', 'quiz_sticker', 'trading_card', 'secret_badge')
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
