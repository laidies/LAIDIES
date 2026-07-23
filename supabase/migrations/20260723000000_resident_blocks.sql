-- ============================================================================
-- RESIDENT BLOCKS — the ability to shut someone out of your PO box.
--
-- Ali, 2026-07-22: "sure ability to block people." Messaging (resident_mail)
-- went live earlier today with no way to stop a specific person; in a community
-- of women that gap had to close before it opens to the public.
--
-- Shape, matching resident_mail:
--   • block by @handle (member_profiles is owner-only, so resolution happens
--     inside SECURITY DEFINER functions, never client-side)
--   • blocking is MUTUAL for messaging — if either has blocked the other,
--     neither can send. Simpler and safer than one-directional.
--   • a blocked sender is told 'not-accepting' — the SAME status as a closed
--     box — so the block is never revealed as targeted.
--   • blocking also removes any letters that person already sent you.
-- ============================================================================

create table if not exists public.resident_blocks (
  blocker_user_id uuid not null references auth.users(id) on delete cascade,
  blocked_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_user_id, blocked_user_id),
  constraint resident_blocks_no_self check (blocker_user_id <> blocked_user_id)
);

create index if not exists resident_blocks_blocked_idx
  on public.resident_blocks(blocked_user_id);

alter table public.resident_blocks enable row level security;

-- You can see and lift your own blocks; nobody can see who blocked them.
drop policy if exists "See my own blocks" on public.resident_blocks;
create policy "See my own blocks" on public.resident_blocks
  for select using (auth.uid() = blocker_user_id);

drop policy if exists "Lift my own blocks" on public.resident_blocks;
create policy "Lift my own blocks" on public.resident_blocks
  for delete using (auth.uid() = blocker_user_id);

-- ⛔ No INSERT policy — blocking goes through block_resident() so the handle
--    lookup (owner-only table) and the mail cleanup happen atomically.

-- ── Block ────────────────────────────────────────────────────────────────────
-- Returns: 'blocked' | 'no-such-resident' | 'self' | 'not-signed-in'
create or replace function public.block_resident(target_handle text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  me     uuid := auth.uid();
  target uuid;
begin
  if me is null then return 'not-signed-in'; end if;

  select id into target from public.member_profiles
   where card_username = lower(btrim(target_handle));
  if target is null then return 'no-such-resident'; end if;
  if target = me then return 'self'; end if;

  insert into public.resident_blocks (blocker_user_id, blocked_user_id)
  values (me, target)
  on conflict do nothing;

  -- clear anything she already put in my box; blocking should feel like a reset
  delete from public.resident_mail
   where to_user_id = me and from_user_id = target;

  return 'blocked';
end;
$$;

-- ── Unblock ──────────────────────────────────────────────────────────────────
create or replace function public.unblock_resident(target_handle text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  me     uuid := auth.uid();
  target uuid;
begin
  if me is null then return 'not-signed-in'; end if;
  select id into target from public.member_profiles
   where card_username = lower(btrim(target_handle));
  if target is null then return 'no-such-resident'; end if;

  delete from public.resident_blocks
   where blocker_user_id = me and blocked_user_id = target;
  return 'unblocked';
end;
$$;

-- ── Who I've blocked (for the manage list) ───────────────────────────────────
create or replace function public.my_blocks()
returns table (handle text, display_name text, blocked_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select p.card_username, p.display_name, b.created_at
    from public.resident_blocks b
    join public.member_profiles p on p.id = b.blocked_user_id
   where b.blocker_user_id = auth.uid()
   order by b.created_at desc;
$$;

revoke all on function public.block_resident(text)   from public, anon;
revoke all on function public.unblock_resident(text) from public, anon;
revoke all on function public.my_blocks()            from public, anon;
grant execute on function public.block_resident(text)   to authenticated;
grant execute on function public.unblock_resident(text) to authenticated;
grant execute on function public.my_blocks()            to authenticated;

-- ── Teach send_resident_mail to respect blocks ───────────────────────────────
-- A blocked sender gets 'not-accepting' — indistinguishable from a closed box,
-- so the block is never disclosed. Mutual: either direction stops delivery.
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

  if (body is null or btrim(body) = '') and item_type is null then
    return 'empty';
  end if;

  select card_username into sender_handle from public.member_profiles where id = sender;
  if sender_handle is null then return 'need-a-handle'; end if;

  select id, coalesce(accept_public_notes, true)
    into recipient, accepts
  from public.member_profiles
  where card_username = lower(btrim(to_handle));

  if recipient is null then return 'no-such-resident'; end if;
  if recipient = sender then return 'self'; end if;
  if not accepts then return 'not-accepting'; end if;

  -- either party having blocked the other stops delivery, silently
  if exists (
    select 1 from public.resident_blocks
     where (blocker_user_id = recipient and blocked_user_id = sender)
        or (blocker_user_id = sender    and blocked_user_id = recipient)
  ) then
    return 'not-accepting';
  end if;

  insert into public.resident_mail (from_user_id, to_user_id, body, item_type, item_key)
  values (sender, recipient, nullif(btrim(body), ''), item_type, item_key);

  return 'sent';
end;
$$;
