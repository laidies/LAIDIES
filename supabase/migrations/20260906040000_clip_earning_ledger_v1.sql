-- First authoritative Butterfly Clip vertical: a protected Episode 01 quiz
-- completion grants one immutable account-ledger event. Offers and spending are
-- deliberately outside this migration.

create table if not exists private.economic_events (
  event_id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references auth.users(id) on delete cascade,
  program text not null,
  -- The full registry is retained for the planned ledger, but this first
  -- migration deliberately supports GRANT only. A later reserve/spend vertical
  -- must add its state transitions and projection arithmetic atomically.
  event_type text not null check (event_type in ('GRANT','RESERVE','SPEND','RELEASE','REFUND','REVOCATION','ADJUSTMENT')),
  check (event_type = 'GRANT'),
  units integer not null check (units > 0),
  currency_or_asset text not null check (currency_or_asset = 'butterfly_clips'),
  source_completion_id text not null,
  idempotency_key text not null,
  correlation_id uuid,
  prior_event_id uuid references private.economic_events(event_id),
  catalog_version text,
  reason text not null,
  actor_authority text not null,
  occurred_at timestamptz not null default now(),
  unique (resident_id, idempotency_key)
);

create table if not exists private.quiz_reward_ledger_provenance_v1 (
  reward_event_id uuid primary key references public.member_reward_events(id) on delete cascade,
  resident_id uuid not null references auth.users(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  authority text not null check (authority = 'submit_quiz_first_reward_v1')
);

revoke all on table private.economic_events from public, anon, authenticated;
revoke all on table private.quiz_reward_ledger_provenance_v1 from public, anon, authenticated;

create or replace function private.reject_economic_event_mutation_v1()
returns trigger
language plpgsql
security definer
set search_path = private, pg_temp
as $$
begin
  -- Preserve immutable history while the account exists; allow its authorized
  -- auth.users deletion to cascade instead of making the account undeletable.
  if tg_op = 'DELETE' and not exists (select 1 from auth.users where id = old.resident_id) then return old; end if;
  raise exception 'economic-events-append-only';
end
$$;

drop trigger if exists economic_events_append_only_v1 on private.economic_events;
create trigger economic_events_append_only_v1
before update or delete on private.economic_events
for each row execute function private.reject_economic_event_mutation_v1();

create or replace function private.quiz_reward_ledger_result_v1(
  p_event private.economic_events,
  p_state text
)
returns jsonb
language sql
stable
security definer
set search_path = private, pg_temp
as $$
  select jsonb_build_object(
    'state', p_state,
    'event_id', p_event.event_id,
    'units', p_event.units,
    'currency_or_asset', p_event.currency_or_asset,
    'source_completion_id', p_event.source_completion_id,
    'occurred_at', p_event.occurred_at
  )
$$;

create or replace function private.grant_trusted_quiz_completion_v1(
  p_reward_event_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  source_event public.member_reward_events%rowtype;
  provenance private.quiz_reward_ledger_provenance_v1%rowtype;
  ledger_event private.economic_events%rowtype;
  expected_max integer;
  expected_clips integer;
  source_score integer;
  source_clips integer;
  source_version text;
begin
  select * into provenance from private.quiz_reward_ledger_provenance_v1
   where reward_event_id = p_reward_event_id;
  if not found then return jsonb_build_object('state', 'legacy-review-required'); end if;
  select * into source_event from public.member_reward_events
   where id = p_reward_event_id and user_id = provenance.resident_id
     and reward_type = 'quiz_score' and dedupe_key = 'quiz-score:issue-01'
     and issue_key = 'issue-01';
  if not found then raise exception 'trusted-quiz-source-missing'; end if;
  if not (source_event.metadata ?& array['original_score','max_score','clips','quiz_version','attempt_id']) then
    raise exception 'trusted-quiz-source-invalid';
  end if;
  source_version := source_event.metadata ->> 'quiz_version';
  if not exists (select 1 from private.quiz_reward_answer_definitions_v1 where episode = '01' and quiz_version = source_version) then
    raise exception 'trusted-quiz-source-invalid';
  end if;
  if (source_event.metadata ->> 'original_score') !~ '^(0|[1-9][0-9]*)$'
    or (source_event.metadata ->> 'max_score') !~ '^(0|[1-9][0-9]*)$'
    or (source_event.metadata ->> 'clips') !~ '^(0|[1-9][0-9]*)$'
    or (source_event.metadata ->> 'attempt_id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'trusted-quiz-source-invalid';
  end if;
  source_score := (source_event.metadata ->> 'original_score')::integer;
  source_clips := (source_event.metadata ->> 'clips')::integer;
  select count(*)::integer into expected_max from private.quiz_reward_answer_definitions_v1
   where episode = '01' and quiz_version = source_version and not is_bonus;
  expected_clips := greatest(source_score, 1);
  if source_score > expected_max or (source_event.metadata ->> 'max_score')::integer <> expected_max
    or source_clips <> expected_clips then raise exception 'trusted-quiz-source-invalid'; end if;

  select * into ledger_event from private.economic_events
   where resident_id = provenance.resident_id and idempotency_key = 'quiz-first-grant:issue-01'
   for update;
  if found then return private.quiz_reward_ledger_result_v1(ledger_event, 'existing'); end if;
  insert into private.economic_events
    (resident_id, program, event_type, units, currency_or_asset, source_completion_id,
     idempotency_key, correlation_id, catalog_version, reason, actor_authority)
  values
    (provenance.resident_id, 'episode_quiz', 'GRANT', source_clips, 'butterfly_clips', p_reward_event_id::text,
     'quiz-first-grant:issue-01', (source_event.metadata ->> 'attempt_id')::uuid, source_version,
     'Episode 01 first completed Pop Quiz', 'submit_quiz_first_reward_v1')
  on conflict (resident_id, idempotency_key) do nothing;
  select * into ledger_event from private.economic_events
   where resident_id = provenance.resident_id and idempotency_key = 'quiz-first-grant:issue-01';
  return private.quiz_reward_ledger_result_v1(ledger_event, 'granted');
end
$$;

create or replace function private.provenance_and_grant_new_quiz_reward_v1()
returns trigger
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  expected_max integer;
  source_score integer;
  source_clips integer;
  source_version text;
begin
  if new.reward_type <> 'quiz_score' then return new; end if;
  if new.dedupe_key <> 'quiz-score:issue-01' or new.issue_key <> 'issue-01' then
    raise exception 'quiz-reward-ledger-source-invalid';
  end if;
  if not (new.metadata ?& array['original_score','max_score','clips','quiz_version','attempt_id']) then
    raise exception 'quiz-reward-ledger-source-invalid';
  end if;
  source_version := new.metadata ->> 'quiz_version';
  if not exists (select 1 from private.quiz_reward_answer_definitions_v1 where episode = '01' and quiz_version = source_version) then
    raise exception 'quiz-reward-ledger-source-invalid';
  end if;
  if (new.metadata ->> 'original_score') !~ '^(0|[1-9][0-9]*)$'
    or (new.metadata ->> 'max_score') !~ '^(0|[1-9][0-9]*)$'
    or (new.metadata ->> 'clips') !~ '^(0|[1-9][0-9]*)$'
    or (new.metadata ->> 'attempt_id') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'quiz-reward-ledger-source-invalid';
  end if;
  source_score := (new.metadata ->> 'original_score')::integer;
  source_clips := (new.metadata ->> 'clips')::integer;
  select count(*)::integer into expected_max from private.quiz_reward_answer_definitions_v1
   where episode = '01' and quiz_version = source_version and not is_bonus;
  if source_score > expected_max or (new.metadata ->> 'max_score')::integer <> expected_max
    or source_clips <> greatest(source_score, 1) then raise exception 'quiz-reward-ledger-source-invalid'; end if;
  insert into private.quiz_reward_ledger_provenance_v1(reward_event_id, resident_id, authority)
    values (new.id, new.user_id, 'submit_quiz_first_reward_v1')
  on conflict (reward_event_id) do nothing;
  perform private.grant_trusted_quiz_completion_v1(new.id);
  return new;
end
$$;

drop trigger if exists quiz_first_reward_ledger_grant_v1 on public.member_reward_events;
create trigger quiz_first_reward_ledger_grant_v1
after insert on public.member_reward_events
for each row execute function private.provenance_and_grant_new_quiz_reward_v1();

create or replace function public.grant_from_completion(
  p_expected_owner uuid,
  p_completion_event_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  me uuid := auth.uid();
  source_event public.member_reward_events%rowtype;
begin
  if me is null then raise exception 'authentication-required'; end if;
  if p_expected_owner is null or p_expected_owner <> me then raise exception 'account-changed-reload-binder'; end if;
  if p_completion_event_id is null then raise exception 'completion-event-required'; end if;
  select * into source_event from public.member_reward_events
   where id = p_completion_event_id and user_id = me
   for update;
  if not found then raise exception 'completion-not-found'; end if;
  if source_event.reward_type <> 'quiz_score' or source_event.dedupe_key not in ('quiz-score:issue-01','quiz-score:issue01') then
    raise exception 'completion-not-eligible';
  end if;
  return private.grant_trusted_quiz_completion_v1(source_event.id);
end
$$;

create or replace function public.wallet_snapshot(
  p_expected_owner uuid,
  p_cursor jsonb default null,
  p_limit integer default 20
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  me uuid := auth.uid();
  capped_limit integer;
  history jsonb;
  cursor_time timestamptz;
  cursor_event uuid;
  page_tail jsonb;
  next_value jsonb;
  has_more boolean;
  legacy_needed boolean;
begin
  if me is null then raise exception 'authentication-required'; end if;
  if p_expected_owner is null or p_expected_owner <> me then raise exception 'account-changed-reload-binder'; end if;
  capped_limit := greatest(1, least(coalesce(p_limit, 20), 50));
  if p_cursor is not null then
    if jsonb_typeof(p_cursor) <> 'object' or not (p_cursor ?& array['occurred_at','event_id']) then
      raise exception 'invalid-wallet-cursor';
    end if;
    begin
      cursor_time := (p_cursor ->> 'occurred_at')::timestamptz;
      cursor_event := (p_cursor ->> 'event_id')::uuid;
    exception when others then raise exception 'invalid-wallet-cursor';
    end;
    if cursor_time is null or cursor_event is null then raise exception 'invalid-wallet-cursor'; end if;
  end if;
  select exists (
    select 1 from public.member_reward_events r
     where r.user_id = me and r.reward_type = 'quiz_score'
       and r.dedupe_key in ('quiz-score:issue-01','quiz-score:issue01')
       and not exists (select 1 from private.quiz_reward_ledger_provenance_v1 p where p.reward_event_id = r.id)
  ) into legacy_needed;
  with rows as (
    select e.* from private.economic_events e
     where e.resident_id = me and (p_cursor is null or (e.occurred_at, e.event_id) < (cursor_time, cursor_event))
     order by e.occurred_at desc, e.event_id desc
     limit capped_limit + 1
  ), page as (select * from rows limit capped_limit), more as (select 1 from rows offset capped_limit limit 1)
  select coalesce((select jsonb_agg(jsonb_build_object(
    'event_id', event_id, 'event_type', event_type, 'units', units,
      'currency_or_asset', currency_or_asset, 'source_completion_id', source_completion_id,
      'reason', reason, 'occurred_at', occurred_at
    ) order by occurred_at desc, event_id desc) from page), '[]'::jsonb),
    (select jsonb_build_object('occurred_at', occurred_at, 'event_id', event_id) from page order by occurred_at asc, event_id asc limit 1),
    exists(select 1 from more)
  into history, page_tail, has_more;
  next_value := case when has_more then page_tail else null end;
  return jsonb_build_object(
    'available', coalesce((select sum(units) from private.economic_events where resident_id = me and event_type = 'GRANT'), 0),
    'pending', 0,
    'lifetime_earned', coalesce((select sum(units) from private.economic_events where resident_id = me and event_type = 'GRANT'), 0),
    'lifetime_spent', 0,
    'lifetime_refunded', 0,
    'lifetime_adjusted', 0,
    'history', history,
    'next_cursor', next_value,
    'legacy_review_required', legacy_needed
  );
end
$$;

revoke all on function private.reject_economic_event_mutation_v1() from public, anon, authenticated;
revoke all on function private.quiz_reward_ledger_result_v1(private.economic_events, text) from public, anon, authenticated;
revoke all on function private.grant_trusted_quiz_completion_v1(uuid) from public, anon, authenticated;
revoke all on function private.provenance_and_grant_new_quiz_reward_v1() from public, anon, authenticated;
revoke all on function public.grant_from_completion(uuid, uuid) from public, anon;
revoke all on function public.wallet_snapshot(uuid, jsonb, integer) from public, anon;
grant execute on function public.grant_from_completion(uuid, uuid) to authenticated;
grant execute on function public.wallet_snapshot(uuid, jsonb, integer) to authenticated;
