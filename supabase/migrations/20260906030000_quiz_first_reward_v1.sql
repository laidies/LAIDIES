-- First-completed Pop Quiz reward. The browser supplies selected indexes only;
-- scoring and the one-reward rule live here so practice retakes cannot top up clips.

create schema if not exists private;

create table if not exists private.quiz_reward_answer_definitions_v1 (
  quiz_version text not null,
  episode text not null check (episode = '01'),
  question_id text not null,
  answer_index integer not null check (answer_index >= 0),
  option_count integer not null check (option_count >= 2),
  is_bonus boolean not null default false,
  primary key (quiz_version, episode, question_id),
  check (answer_index < option_count)
);

revoke all on table private.quiz_reward_answer_definitions_v1 from public, anon, authenticated;

insert into private.quiz_reward_answer_definitions_v1
  (quiz_version, episode, question_id, answer_index, option_count, is_bonus)
values
  ('2026-09-06-v1','01','ep01-first-move',0,4,false),
  ('2026-09-06-v1','01','ep01-safe-input',1,4,false),
  ('2026-09-06-v1','01','ep01-generation',2,4,false),
  ('2026-09-06-v1','01','ep01-model-product',3,4,false),
  ('2026-09-06-v1','01','ep01-unsupported-detail',1,4,false),
  ('2026-09-06-v1','01','ep01-context',0,4,false),
  ('2026-09-06-v1','01','ep01-comparison',2,4,false),
  ('2026-09-06-v1','01','ep01-participation',3,4,false),
  ('2026-09-06-v1','01','ep01-human-judgment',1,4,false),
  ('2026-09-06-v1','01','ep01-one-tool',0,4,false),
  ('2026-09-06-v1','01','ep01-bonus-training',2,4,true),
  ('2026-09-06-v1','01','ep01-bonus-saint',1,4,true),
  ('2026-09-06-v2','01','ep01-first-move',0,4,false),
  ('2026-09-06-v2','01','ep01-safe-input',1,4,false),
  ('2026-09-06-v2','01','ep01-generation',2,4,false),
  ('2026-09-06-v2','01','ep01-model-product',3,4,false),
  ('2026-09-06-v2','01','ep01-unsupported-detail',1,4,false),
  ('2026-09-06-v2','01','ep01-context',0,4,false),
  ('2026-09-06-v2','01','ep01-comparison',2,4,false),
  ('2026-09-06-v2','01','ep01-participation',3,4,false),
  ('2026-09-06-v2','01','ep01-human-judgment',1,4,false),
  ('2026-09-06-v2','01','ep01-one-tool',0,4,false),
  ('2026-09-06-v2','01','ep01-bonus-training',2,4,true),
  ('2026-09-06-v2','01','ep01-bonus-saint',1,4,true)
on conflict (quiz_version, episode, question_id) do nothing;

-- Existing broad owner policies are permissive. Restrictive policies are ANDed
-- with them, so protected quiz reward rows cannot be forged or changed client-side.
drop policy if exists "Quiz rewards are server-only inserts" on public.member_reward_events;
drop policy if exists "Quiz rewards are server-only updates" on public.member_reward_events;
drop policy if exists "Quiz rewards are server-only deletes" on public.member_reward_events;
create policy "Quiz rewards are server-only inserts" on public.member_reward_events
  as restrictive for insert to authenticated
  with check (reward_type not in ('quiz_score', 'quiz_sticker'));
create policy "Quiz rewards are server-only updates" on public.member_reward_events
  as restrictive for update to authenticated
  using (reward_type not in ('quiz_score', 'quiz_sticker'))
  with check (reward_type not in ('quiz_score', 'quiz_sticker'));
create policy "Quiz rewards are server-only deletes" on public.member_reward_events
  as restrictive for delete to authenticated
  using (reward_type not in ('quiz_score', 'quiz_sticker'));

create or replace function public.quiz_first_reward_result_v1(event public.member_reward_events, result_state text)
returns jsonb
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select jsonb_build_object(
    'state', result_state,
    'episode', '01',
    'quiz_version', event.metadata ->> 'quiz_version',
    'attempt_id', event.metadata ->> 'attempt_id',
    'score', coalesce(nullif(event.metadata ->> 'original_score', '')::integer,
                      nullif(event.metadata ->> 'bestScore', '')::integer, 0),
    'max_score', coalesce(nullif(event.metadata ->> 'max_score', '')::integer,
                          nullif(event.metadata ->> 'maxScore', '')::integer, 10),
    'clips', coalesce(nullif(event.metadata ->> 'clips', '')::integer,
                      greatest(coalesce(nullif(event.metadata ->> 'bestScore', '')::integer, 0), 1)),
    'completed_at', event.earned_at
  )
$$;

create or replace function public.get_my_quiz_first_reward_v1(
  p_expected_owner uuid,
  p_episode text
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  me uuid := auth.uid();
  prior public.member_reward_events%rowtype;
begin
  if me is null then raise exception 'authentication-required'; end if;
  if p_expected_owner is null or p_expected_owner <> me then raise exception 'account-changed-reload-binder'; end if;
  if p_episode is null or p_episode <> '01' then raise exception 'unsupported-quiz-episode'; end if;
  select * into prior from public.member_reward_events
   where user_id = me and dedupe_key = 'quiz-score:issue-01';
  if found and (prior.reward_type <> 'quiz_score' or coalesce(prior.issue_key, '') not in ('issue-01', 'issue01')) then
    raise exception 'quiz-reward-dedupe-conflict';
  end if;
  if not found then
    -- Historical browser sync used issue01. It is an existing first award, not
    -- an invitation to award the same episode again under the normalized key.
    select * into prior from public.member_reward_events
     where user_id = me and dedupe_key = 'quiz-score:issue01' and reward_type = 'quiz_score'
       and coalesce(issue_key, '') in ('issue-01', 'issue01');
  end if;
  if found then return public.quiz_first_reward_result_v1(prior, 'claimed'); end if;
  return jsonb_build_object('state', 'unclaimed', 'episode', '01');
end
$$;

create or replace function public.submit_quiz_first_reward_v1(
  p_expected_owner uuid,
  p_episode text,
  p_quiz_version text,
  p_attempt_id uuid,
  p_answers jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  me uuid := auth.uid();
  prior public.member_reward_events%rowtype;
  answer_row record;
  score integer := 0;
  max_score integer := 0;
  clips integer;
  selected integer;
begin
  if me is null then raise exception 'authentication-required'; end if;
  if p_expected_owner is null or p_expected_owner <> me then raise exception 'account-changed-reload-binder'; end if;
  if p_episode is null or p_episode <> '01' then raise exception 'unsupported-quiz-episode'; end if;
  if p_attempt_id is null then raise exception 'attempt-id-required'; end if;

  -- Serialize first claims before checking the existing award. The unique key is
  -- a second defense when concurrent sessions arrive at the same time.
  perform pg_advisory_xact_lock(hashtext(me::text || ':quiz-first:' || p_episode));
  select * into prior from public.member_reward_events
   where user_id = me and dedupe_key = 'quiz-score:issue-01'
   for update;
  if found and (prior.reward_type <> 'quiz_score' or coalesce(prior.issue_key, '') not in ('issue-01', 'issue01')) then
    raise exception 'quiz-reward-dedupe-conflict';
  end if;
  if not found then
    select * into prior from public.member_reward_events
     where user_id = me and dedupe_key = 'quiz-score:issue01' and reward_type = 'quiz_score'
       and coalesce(issue_key, '') in ('issue-01', 'issue01')
     for update;
  end if;
  if found then return public.quiz_first_reward_result_v1(prior, 'existing'); end if;

  if p_quiz_version is null or not exists (
    select 1 from private.quiz_reward_answer_definitions_v1
     where quiz_version = p_quiz_version and episode = p_episode
  ) then raise exception 'unsupported-quiz-version'; end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then raise exception 'answers-must-be-an-object'; end if;
  if exists (
    select 1 from jsonb_object_keys(p_answers) as submitted(question_id)
    left join private.quiz_reward_answer_definitions_v1 d
      on d.quiz_version = p_quiz_version and d.episode = p_episode and d.question_id = submitted.question_id
    where d.question_id is null
  ) then raise exception 'unknown-quiz-question'; end if;

  for answer_row in
    select question_id, answer_index, option_count, is_bonus
      from private.quiz_reward_answer_definitions_v1
     where quiz_version = p_quiz_version and episode = p_episode
     order by question_id
  loop
    if not answer_row.is_bonus and not (p_answers ? answer_row.question_id) then
      raise exception 'missing-scored-question';
    end if;
    if p_answers ? answer_row.question_id then
      if jsonb_typeof(p_answers -> answer_row.question_id) <> 'number'
        or (p_answers ->> answer_row.question_id) !~ '^(0|[1-9][0-9]*)$' then
        raise exception 'invalid-selected-option';
      end if;
      selected := (p_answers ->> answer_row.question_id)::integer;
      if selected >= answer_row.option_count then raise exception 'invalid-selected-option'; end if;
      if not answer_row.is_bonus then
        max_score := max_score + 1;
        if selected = answer_row.answer_index then score := score + 1; end if;
      end if;
    end if;
  end loop;

  clips := greatest(score, 1);
  insert into public.member_reward_events
    (user_id, dedupe_key, reward_type, issue_key, title, source, metadata, earned_at)
  values
    (me, 'quiz-score:issue-01', 'quiz_score', 'issue-01', 'Episode 01 quiz score', 'Episode 01 Pop Quiz',
     jsonb_build_object('original_score', score, 'max_score', max_score, 'clips', clips,
                        'quiz_version', p_quiz_version, 'attempt_id', p_attempt_id::text), now())
  on conflict (user_id, dedupe_key) do nothing;

  select * into prior from public.member_reward_events
   where user_id = me and dedupe_key = 'quiz-score:issue-01';
  return public.quiz_first_reward_result_v1(prior, 'claimed');
end
$$;

revoke all on function public.quiz_first_reward_result_v1(public.member_reward_events, text) from public, anon, authenticated;
revoke all on function public.get_my_quiz_first_reward_v1(uuid, text) from public, anon;
revoke all on function public.submit_quiz_first_reward_v1(uuid, text, text, uuid, jsonb) from public, anon;
grant execute on function public.get_my_quiz_first_reward_v1(uuid, text) to authenticated;
grant execute on function public.submit_quiz_first_reward_v1(uuid, text, text, uuid, jsonb) to authenticated;
