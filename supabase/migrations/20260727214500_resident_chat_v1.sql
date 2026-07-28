-- ============================================================================
-- RESIDENT CHAT V1 — private and small-group SUNNYVAiLE conversations.
--
-- Handle-addressed, account-backed, block-aware and email-free. All mutations
-- use SECURITY DEFINER RPCs; clients cannot forge membership or authorship.
-- ============================================================================

create table if not exists public.resident_conversations (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('direct', 'group')),
  title text check (title is null or char_length(title) between 1 and 80),
  direct_key text unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint resident_conversations_direct_shape check (
    (kind = 'direct' and direct_key is not null and title is null)
    or
    (kind = 'group' and direct_key is null and title is not null)
  )
);

create table if not exists public.resident_conversation_members (
  conversation_id uuid not null
    references public.resident_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz not null default now(),
  last_read_at timestamptz,
  left_at timestamptz,
  primary key (conversation_id, user_id)
);

create table if not exists public.resident_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null
    references public.resident_conversations(id) on delete cascade,
  sender_user_id uuid not null references auth.users(id) on delete cascade,
  idempotency_key uuid not null,
  body text not null check (
    char_length(btrim(body)) between 1 and 2000
  ),
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (sender_user_id, idempotency_key)
);

create table if not exists public.resident_message_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.resident_messages(id) on delete cascade,
  reporter_user_id uuid not null references auth.users(id) on delete cascade,
  reason text not null check (reason in ('spam', 'harassment', 'unsafe', 'other')),
  detail text check (detail is null or char_length(detail) <= 500),
  created_at timestamptz not null default now(),
  unique (message_id, reporter_user_id)
);

create index if not exists resident_conversation_members_user_idx
  on public.resident_conversation_members(user_id, left_at);
create index if not exists resident_messages_conversation_created_idx
  on public.resident_messages(conversation_id, created_at desc);
create index if not exists resident_conversations_updated_idx
  on public.resident_conversations(updated_at desc);

alter table public.resident_conversations enable row level security;
alter table public.resident_conversation_members enable row level security;
alter table public.resident_messages enable row level security;
alter table public.resident_message_reports enable row level security;

create or replace function public.is_resident_conversation_member(
  p_conversation_id uuid,
  p_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.resident_conversation_members m
    where m.conversation_id = p_conversation_id
      and m.user_id = p_user_id
      and m.left_at is null
  );
$$;

revoke all on function public.is_resident_conversation_member(uuid, uuid)
  from public, anon;
grant execute on function public.is_resident_conversation_member(uuid, uuid)
  to authenticated;

drop policy if exists "Members read their conversations"
  on public.resident_conversations;
create policy "Members read their conversations"
  on public.resident_conversations
  for select using (public.is_resident_conversation_member(id));

drop policy if exists "Members read conversation membership"
  on public.resident_conversation_members;
create policy "Members read conversation membership"
  on public.resident_conversation_members
  for select using (public.is_resident_conversation_member(conversation_id));

drop policy if exists "Members read conversation messages"
  on public.resident_messages;
create policy "Members read conversation messages"
  on public.resident_messages
  for select using (public.is_resident_conversation_member(conversation_id));

drop policy if exists "Residents read their own reports"
  on public.resident_message_reports;
create policy "Residents read their own reports"
  on public.resident_message_reports
  for select using (auth.uid() = reporter_user_id);

-- There are deliberately no direct mutation policies.

create or replace function public.create_direct_resident_chat(
  p_to_handle text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  target uuid;
  accepts boolean;
  key text;
  conversation public.resident_conversations%rowtype;
begin
  if me is null then return jsonb_build_object('status', 'not-signed-in'); end if;
  select p.id, coalesce(p.accept_public_notes, true)
    into target, accepts
  from public.member_profiles p
  where p.card_username = lower(btrim(p_to_handle));
  if target is null then return jsonb_build_object('status', 'no-such-resident'); end if;
  if target = me then return jsonb_build_object('status', 'self'); end if;
  if not accepts then return jsonb_build_object('status', 'not-accepting'); end if;
  if exists (
    select 1 from public.resident_blocks b
    where (b.blocker_user_id = target and b.blocked_user_id = me)
       or (b.blocker_user_id = me and b.blocked_user_id = target)
  ) then
    return jsonb_build_object('status', 'not-accepting');
  end if;

  key := case when me::text < target::text
    then me::text || ':' || target::text
    else target::text || ':' || me::text
  end;

  insert into public.resident_conversations (
    kind, direct_key, created_by
  )
  values ('direct', key, me)
  on conflict (direct_key) do update
    set updated_at = public.resident_conversations.updated_at
  returning * into conversation;

  insert into public.resident_conversation_members (
    conversation_id, user_id, role
  )
  values
    (conversation.id, me, 'owner'),
    (conversation.id, target, 'member')
  on conflict (conversation_id, user_id) do update
    set left_at = null;

  return jsonb_build_object(
    'status', 'ready',
    'conversation_id', conversation.id
  );
end;
$$;

create or replace function public.create_group_resident_chat(
  p_title text,
  p_handles text[]
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  conversation public.resident_conversations%rowtype;
  requested_count integer;
  resolved_count integer;
  blocked_count integer;
begin
  if me is null then return jsonb_build_object('status', 'not-signed-in'); end if;
  if char_length(btrim(coalesce(p_title, ''))) not between 1 and 80 then
    return jsonb_build_object('status', 'invalid-title');
  end if;

  select count(distinct lower(btrim(h)))
    into requested_count
  from unnest(coalesce(p_handles, array[]::text[])) h
  where btrim(h) <> '';
  if requested_count < 1 or requested_count > 15 then
    return jsonb_build_object('status', 'invalid-members');
  end if;

  with requested as (
    select distinct lower(btrim(h)) as handle
    from unnest(p_handles) h
    where btrim(h) <> ''
  )
  select count(*)
    into resolved_count
  from requested r
  join public.member_profiles p on p.card_username = r.handle
  where p.id <> me
    and coalesce(p.accept_public_notes, true);
  if resolved_count <> requested_count then
    return jsonb_build_object('status', 'member-unavailable');
  end if;

  with requested_users as (
    select p.id
    from (
      select distinct lower(btrim(h)) as handle
      from unnest(p_handles) h
      where btrim(h) <> ''
    ) r
    join public.member_profiles p on p.card_username = r.handle
  )
  select count(*)
    into blocked_count
  from requested_users u
  join public.resident_blocks b
    on (b.blocker_user_id = u.id and b.blocked_user_id = me)
    or (b.blocker_user_id = me and b.blocked_user_id = u.id);
  if blocked_count > 0 then
    return jsonb_build_object('status', 'member-unavailable');
  end if;

  insert into public.resident_conversations (
    kind, title, created_by
  )
  values ('group', btrim(p_title), me)
  returning * into conversation;

  insert into public.resident_conversation_members (
    conversation_id, user_id, role
  )
  values (conversation.id, me, 'owner');

  insert into public.resident_conversation_members (
    conversation_id, user_id, role
  )
  select conversation.id, p.id, 'member'
  from (
    select distinct lower(btrim(h)) as handle
    from unnest(p_handles) h
    where btrim(h) <> ''
  ) r
  join public.member_profiles p on p.card_username = r.handle
  where p.id <> me
  on conflict do nothing;

  return jsonb_build_object(
    'status', 'ready',
    'conversation_id', conversation.id
  );
end;
$$;

create or replace function public.send_resident_chat_message(
  p_conversation_id uuid,
  p_body text,
  p_idempotency_key uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  created public.resident_messages%rowtype;
  existing public.resident_messages%rowtype;
begin
  if me is null then return jsonb_build_object('status', 'not-signed-in'); end if;
  if not public.is_resident_conversation_member(p_conversation_id, me) then
    return jsonb_build_object('status', 'not-a-member');
  end if;
  if char_length(btrim(coalesce(p_body, ''))) not between 1 and 2000 then
    return jsonb_build_object('status', 'invalid-message');
  end if;
  if p_idempotency_key is null then
    return jsonb_build_object('status', 'missing-idempotency-key');
  end if;

  select * into existing
  from public.resident_messages m
  where m.sender_user_id = me
    and m.idempotency_key = p_idempotency_key;
  if found then
    return jsonb_build_object(
      'status', 'sent',
      'message_id', existing.id,
      'replayed', true
    );
  end if;

  if exists (
    select 1
    from public.resident_conversation_members member
    join public.resident_blocks b
      on (b.blocker_user_id = member.user_id and b.blocked_user_id = me)
      or (b.blocker_user_id = me and b.blocked_user_id = member.user_id)
    where member.conversation_id = p_conversation_id
      and member.left_at is null
      and member.user_id <> me
  ) then
    return jsonb_build_object('status', 'not-accepting');
  end if;

  insert into public.resident_messages (
    conversation_id,
    sender_user_id,
    idempotency_key,
    body
  )
  values (
    p_conversation_id,
    me,
    p_idempotency_key,
    btrim(p_body)
  )
  returning * into created;

  update public.resident_conversations
  set updated_at = created.created_at
  where id = p_conversation_id;

  update public.resident_conversation_members
  set last_read_at = created.created_at
  where conversation_id = p_conversation_id
    and user_id = me;

  return jsonb_build_object(
    'status', 'sent',
    'message_id', created.id,
    'created_at', created.created_at,
    'replayed', false
  );
end;
$$;

create or replace function public.my_resident_conversations()
returns table (
  conversation_id uuid,
  kind text,
  title text,
  display_title text,
  updated_at timestamptz,
  unread_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.id,
    c.kind,
    c.title,
    case
      when c.kind = 'group' then c.title
      else coalesce(other_profile.display_name, '@' || other_profile.card_username)
    end,
    c.updated_at,
    (
      select count(*)
      from public.resident_messages message
      where message.conversation_id = c.id
        and message.sender_user_id <> auth.uid()
        and message.deleted_at is null
        and message.created_at > coalesce(mine.last_read_at, mine.joined_at)
    )
  from public.resident_conversations c
  join public.resident_conversation_members mine
    on mine.conversation_id = c.id
    and mine.user_id = auth.uid()
    and mine.left_at is null
  left join public.resident_conversation_members other_member
    on c.kind = 'direct'
    and other_member.conversation_id = c.id
    and other_member.user_id <> auth.uid()
    and other_member.left_at is null
  left join public.member_profiles other_profile
    on other_profile.id = other_member.user_id
  order by c.updated_at desc;
$$;

create or replace function public.resident_chat_messages(
  p_conversation_id uuid,
  p_limit integer default 100
)
returns table (
  message_id uuid,
  sender_handle text,
  sender_display_name text,
  is_mine boolean,
  body text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_resident_conversation_member(p_conversation_id) then
    raise exception 'not-a-member';
  end if;

  update public.resident_conversation_members
  set last_read_at = now()
  where conversation_id = p_conversation_id
    and user_id = auth.uid();

  return query
  select
    m.id,
    p.card_username,
    p.display_name,
    m.sender_user_id = auth.uid(),
    m.body,
    m.created_at
  from public.resident_messages m
  join public.member_profiles p on p.id = m.sender_user_id
  where m.conversation_id = p_conversation_id
    and m.deleted_at is null
  order by m.created_at asc
  limit least(greatest(coalesce(p_limit, 100), 1), 200);
end;
$$;

create or replace function public.report_resident_chat_message(
  p_message_id uuid,
  p_reason text,
  p_detail text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  conversation uuid;
  sender uuid;
begin
  if auth.uid() is null then return 'not-signed-in'; end if;
  select m.conversation_id, m.sender_user_id
    into conversation, sender
  from public.resident_messages m
  where m.id = p_message_id;
  if conversation is null
     or not public.is_resident_conversation_member(conversation) then
    return 'not-found';
  end if;
  if sender = auth.uid() then return 'self'; end if;
  if p_reason not in ('spam', 'harassment', 'unsafe', 'other') then
    return 'invalid-reason';
  end if;

  insert into public.resident_message_reports (
    message_id, reporter_user_id, reason, detail
  )
  values (
    p_message_id,
    auth.uid(),
    p_reason,
    nullif(btrim(p_detail), '')
  )
  on conflict (message_id, reporter_user_id) do update
    set reason = excluded.reason,
        detail = excluded.detail,
        created_at = now();
  return 'reported';
end;
$$;

revoke all on function public.create_direct_resident_chat(text)
  from public, anon;
revoke all on function public.create_group_resident_chat(text, text[])
  from public, anon;
revoke all on function public.send_resident_chat_message(uuid, text, uuid)
  from public, anon;
revoke all on function public.my_resident_conversations()
  from public, anon;
revoke all on function public.resident_chat_messages(uuid, integer)
  from public, anon;
revoke all on function public.report_resident_chat_message(uuid, text, text)
  from public, anon;

grant execute on function public.create_direct_resident_chat(text)
  to authenticated;
grant execute on function public.create_group_resident_chat(text, text[])
  to authenticated;
grant execute on function public.send_resident_chat_message(uuid, text, uuid)
  to authenticated;
grant execute on function public.my_resident_conversations()
  to authenticated;
grant execute on function public.resident_chat_messages(uuid, integer)
  to authenticated;
grant execute on function public.report_resident_chat_message(uuid, text, text)
  to authenticated;

-- Live chat needs row-change delivery. RLS still controls what clients may read.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'resident_messages'
  ) then
    alter publication supabase_realtime add table public.resident_messages;
  end if;
end;
$$;

