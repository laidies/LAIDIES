-- ============================================================================
-- AUTHORITATIVE TRADING-CARD INVENTORY + DUPLICATE GIFTING
--
-- Completes the already-shipped pack/binder/mail work without replacing it.
-- A resident may send one duplicate card through the Post Office, but may never
-- give away her final copy. The transfer, inventory updates and mail receipt are
-- one transaction and are idempotent.
-- ============================================================================

-- Browser-authored rewards remain available for the older non-card activities,
-- but trading-card inventory is now written only by SECURITY DEFINER functions.
drop policy if exists "Members can create their rewards"
  on public.member_reward_events;
create policy "Members can create their non-card rewards"
  on public.member_reward_events
  for insert
  with check (
    auth.uid() = user_id
    and reward_type <> 'trading_card'
  );

drop policy if exists "Members can update their rewards"
  on public.member_reward_events;
create policy "Members can update their non-card rewards"
  on public.member_reward_events
  for update
  using (
    auth.uid() = user_id
    and reward_type <> 'trading_card'
  )
  with check (
    auth.uid() = user_id
    and reward_type <> 'trading_card'
  );

create table if not exists public.trading_card_gifts (
  id uuid primary key default gen_random_uuid(),
  idempotency_key uuid not null,
  from_user_id uuid not null references auth.users(id) on delete cascade,
  to_user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null references public.card_definitions(id),
  note text check (note is null or char_length(note) <= 500),
  mail_id uuid references public.resident_mail(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint trading_card_gifts_no_self check (from_user_id <> to_user_id),
  constraint trading_card_gifts_sender_idempotency
    unique (from_user_id, idempotency_key)
);

create index if not exists trading_card_gifts_from_created_idx
  on public.trading_card_gifts(from_user_id, created_at desc);
create index if not exists trading_card_gifts_to_created_idx
  on public.trading_card_gifts(to_user_id, created_at desc);

alter table public.trading_card_gifts enable row level security;

drop policy if exists "Residents see card gifts they sent"
  on public.trading_card_gifts;
create policy "Residents see card gifts they sent"
  on public.trading_card_gifts
  for select using (auth.uid() = from_user_id);

drop policy if exists "Residents see card gifts they received"
  on public.trading_card_gifts;
create policy "Residents see card gifts they received"
  on public.trading_card_gifts
  for select using (auth.uid() = to_user_id);

-- No direct INSERT/UPDATE/DELETE policy. send_duplicate_trading_card() is the
-- only mutation path.

create or replace function public.my_trading_cards()
returns table (
  card_id text,
  title text,
  deck text,
  episode integer,
  finish text,
  card_count integer,
  giftable_count integer,
  art_front text,
  art_back text,
  art_front_foil text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    d.id,
    d.title,
    d.deck,
    d.episode,
    coalesce(e.metadata->>'finish', 'common'),
    greatest(coalesce((e.metadata->>'count')::integer, 1), 1),
    greatest(coalesce((e.metadata->>'count')::integer, 1) - 1, 0),
    d.art_front,
    d.art_back,
    d.art_front_foil
  from public.member_reward_events e
  join public.card_definitions d
    on e.dedupe_key = 'trading-card:' || d.id
  where e.user_id = auth.uid()
    and e.reward_type = 'trading_card'
  order by d.deck, d.episode nulls last, d.title;
$$;

revoke all on function public.my_trading_cards() from public, anon;
grant execute on function public.my_trading_cards() to authenticated;

create or replace function public.send_duplicate_trading_card(
  p_to_handle text,
  p_card_id text,
  p_note text,
  p_idempotency_key uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  sender uuid := auth.uid();
  sender_handle text;
  recipient uuid;
  accepts boolean;
  inventory public.member_reward_events%rowtype;
  definition public.card_definitions%rowtype;
  current_count integer;
  recipient_count integer;
  created_mail_id uuid;
  existing public.trading_card_gifts%rowtype;
begin
  if sender is null then
    return jsonb_build_object('status', 'not-signed-in');
  end if;
  if p_idempotency_key is null then
    return jsonb_build_object('status', 'missing-idempotency-key');
  end if;

  select * into existing
  from public.trading_card_gifts g
  where g.from_user_id = sender
    and g.idempotency_key = p_idempotency_key;
  if found then
    return jsonb_build_object(
      'status', 'sent',
      'gift_id', existing.id,
      'mail_id', existing.mail_id,
      'replayed', true
    );
  end if;

  select p.card_username into sender_handle
  from public.member_profiles p
  where p.id = sender;
  if sender_handle is null then
    return jsonb_build_object('status', 'need-a-handle');
  end if;

  select p.id, coalesce(p.accept_public_notes, true)
    into recipient, accepts
  from public.member_profiles p
  where p.card_username = lower(btrim(p_to_handle));
  if recipient is null then
    return jsonb_build_object('status', 'no-such-resident');
  end if;
  if recipient = sender then
    return jsonb_build_object('status', 'self');
  end if;
  if not accepts then
    return jsonb_build_object('status', 'not-accepting');
  end if;

  if exists (
    select 1 from public.resident_blocks b
    where (b.blocker_user_id = recipient and b.blocked_user_id = sender)
       or (b.blocker_user_id = sender and b.blocked_user_id = recipient)
  ) then
    return jsonb_build_object('status', 'not-accepting');
  end if;

  select * into definition
  from public.card_definitions d
  where d.id = p_card_id
    and d.active;
  if not found then
    return jsonb_build_object('status', 'no-such-card');
  end if;

  select * into inventory
  from public.member_reward_events e
  where e.user_id = sender
    and e.reward_type = 'trading_card'
    and e.dedupe_key = 'trading-card:' || definition.id
  for update;
  if not found then
    return jsonb_build_object('status', 'not-owned');
  end if;

  current_count := greatest(
    coalesce((inventory.metadata->>'count')::integer, 1),
    1
  );
  if current_count < 2 then
    return jsonb_build_object('status', 'last-copy');
  end if;

  update public.member_reward_events
  set metadata = jsonb_set(
    coalesce(metadata, '{}'::jsonb),
    '{count}',
    to_jsonb(current_count - 1)
  )
  where id = inventory.id;

  insert into public.member_reward_events (
    user_id,
    dedupe_key,
    reward_type,
    title,
    source,
    metadata
  )
  values (
    recipient,
    'trading-card:' || definition.id,
    'trading_card',
    definition.title,
    'Post Office gift from @' || sender_handle,
    jsonb_build_object(
      'finish', coalesce(inventory.metadata->>'finish', 'common'),
      'count', 1,
      'gifted_by', sender_handle
    )
  )
  on conflict (user_id, dedupe_key) do update
  set metadata = jsonb_set(
    coalesce(public.member_reward_events.metadata, '{}'::jsonb),
    '{count}',
    to_jsonb(
      greatest(
        coalesce(
          (public.member_reward_events.metadata->>'count')::integer,
          1
        ),
        1
      ) + 1
    )
  );

  select greatest(coalesce((e.metadata->>'count')::integer, 1), 1)
    into recipient_count
  from public.member_reward_events e
  where e.user_id = recipient
    and e.dedupe_key = 'trading-card:' || definition.id;

  insert into public.resident_mail (
    from_user_id,
    to_user_id,
    body,
    item_type,
    item_key,
    redeemed_at
  )
  values (
    sender,
    recipient,
    nullif(btrim(p_note), ''),
    'trading_card',
    definition.id,
    now()
  )
  returning id into created_mail_id;

  insert into public.trading_card_gifts (
    idempotency_key,
    from_user_id,
    to_user_id,
    card_id,
    note,
    mail_id
  )
  values (
    p_idempotency_key,
    sender,
    recipient,
    definition.id,
    nullif(btrim(p_note), ''),
    created_mail_id
  )
  returning * into existing;

  return jsonb_build_object(
    'status', 'sent',
    'gift_id', existing.id,
    'mail_id', created_mail_id,
    'card_id', definition.id,
    'title', definition.title,
    'sender_count', current_count - 1,
    'recipient_count', recipient_count,
    'replayed', false
  );
end;
$$;

revoke all on function public.send_duplicate_trading_card(text, text, text, uuid)
  from public, anon;
grant execute on function public.send_duplicate_trading_card(text, text, text, uuid)
  to authenticated;

-- Plain resident mail cannot claim to contain a card. The transfer function
-- above is the only card-attachment path.
create or replace function public.send_resident_mail(
  to_handle text,
  body text default null,
  item_type text default null,
  item_key text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  sender uuid := auth.uid();
  sender_handle text;
  recipient uuid;
  accepts boolean;
begin
  if sender is null then return 'not-signed-in'; end if;
  if item_type = 'trading_card' then return 'use-card-gift'; end if;
  if (body is null or btrim(body) = '') and item_type is null then
    return 'empty';
  end if;

  select card_username into sender_handle
  from public.member_profiles where id = sender;
  if sender_handle is null then return 'need-a-handle'; end if;

  select id, coalesce(accept_public_notes, true)
    into recipient, accepts
  from public.member_profiles
  where card_username = lower(btrim(to_handle));

  if recipient is null then return 'no-such-resident'; end if;
  if recipient = sender then return 'self'; end if;
  if not accepts then return 'not-accepting'; end if;

  if exists (
    select 1 from public.resident_blocks
    where (blocker_user_id = recipient and blocked_user_id = sender)
       or (blocker_user_id = sender and blocked_user_id = recipient)
  ) then
    return 'not-accepting';
  end if;

  insert into public.resident_mail (
    from_user_id,
    to_user_id,
    body,
    item_type,
    item_key
  )
  values (
    sender,
    recipient,
    nullif(btrim(body), ''),
    item_type,
    item_key
  );
  return 'sent';
end;
$$;

revoke all on function public.send_resident_mail(text, text, text, text)
  from public, anon;
grant execute on function public.send_resident_mail(text, text, text, text)
  to authenticated;
