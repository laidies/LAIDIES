-- ============================================================================
-- RESIDENT MAIL — the Post Office PO box, addressed by @handle. Never by email.
--
-- Ali, 2026-07-22: "how are people going to connect with one another if there is
-- no email … if you build a messaging function based on their handle fine —
-- i would prefer that."
--
-- This is the mechanic post-office.html has been promising in the present tense
-- ("notes and gifts from other LAiDIES arrive at your PO box in town, not in
-- your inbox") with nothing behind it. See the 2026-07-22 member audit §7.
--
-- Built to the shape already locked in memory [[gifting-mechanic-locked]]
-- (2026-06-30): one-way, sender→recipient, optional attached item, arrives in
-- her box. That memory said delivery would use Resend (email) — SUPERSEDED by
-- the ruling above. Delivery is on-site.
--
-- WHY A FUNCTION AND NOT A PLAIN INSERT
-- member_profiles is owner-only since 20260722210000, so a sender cannot look up
-- which account owns @handle — correctly, because that table holds her age
-- bracket, skill level, industry and goal. `send_resident_mail()` resolves the
-- handle inside the database and returns nothing about her except whether it
-- was delivered.
-- ============================================================================

create table if not exists public.resident_mail (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references auth.users(id) on delete cascade,
  to_user_id   uuid not null references auth.users(id) on delete cascade,
  body text check (body is null or char_length(body) <= 500),
  -- Attached collectible. NULL = a plain note. The allowed list mirrors the
  -- giftable table in [[gifting-mechanic-locked]] — merit badges, secret badges,
  -- stickers and detention slips are deliberately NOT giftable (earned/personal).
  item_type text check (item_type is null or item_type in
    ('trading_card','hall_pass','charm','fairy_play')),
  item_key text,
  sent_at     timestamptz not null default now(),
  read_at     timestamptz,
  redeemed_at timestamptz,
  -- A letter with neither words nor a gift is not a letter.
  constraint resident_mail_has_content check (body is not null or item_type is not null),
  -- No mailing yourself.
  constraint resident_mail_no_self check (from_user_id <> to_user_id)
);

create index if not exists resident_mail_to_sent_idx   on public.resident_mail(to_user_id, sent_at desc);
create index if not exists resident_mail_from_sent_idx on public.resident_mail(from_user_id, sent_at desc);
create index if not exists resident_mail_unread_idx    on public.resident_mail(to_user_id) where read_at is null;

alter table public.resident_mail enable row level security;

-- Both sides can see their own correspondence; nobody else, ever.
drop policy if exists "Mail recipient reads her box" on public.resident_mail;
create policy "Mail recipient reads her box" on public.resident_mail
  for select using (auth.uid() = to_user_id);

drop policy if exists "Mail sender sees what she sent" on public.resident_mail;
create policy "Mail sender sees what she sent" on public.resident_mail
  for select using (auth.uid() = from_user_id);

-- Recipient marks things read / redeemed. She cannot edit the words.
drop policy if exists "Mail recipient updates her own box" on public.resident_mail;
create policy "Mail recipient updates her own box" on public.resident_mail
  for update using (auth.uid() = to_user_id) with check (auth.uid() = to_user_id);

-- Recipient can throw mail away. The sender cannot un-send.
drop policy if exists "Mail recipient can bin it" on public.resident_mail;
create policy "Mail recipient can bin it" on public.resident_mail
  for delete using (auth.uid() = to_user_id);

-- ⛔ No INSERT policy on purpose. Everything goes through send_resident_mail(),
--    so the handle→account lookup and the accept-notes check cannot be skipped.

-- ── Sending ──────────────────────────────────────────────────────────────────
-- Returns a short status string the UI can show directly:
--   'sent' | 'no-such-resident' | 'not-accepting' | 'not-signed-in' | 'empty' | 'self'
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

  -- ⛔ NO ANONYMOUS MAIL. Every letter is signed with a handle. Caught in testing
  -- 2026-07-22: a sender who had never claimed a handle produced mail that
  -- arrived from "@null". In a community of women, unattributable messages are
  -- the wrong default — so claiming a handle at MAiKEOVER is the price of entry.
  select card_username into sender_handle from public.member_profiles where id = sender;
  if sender_handle is null then return 'need-a-handle'; end if;

  select id, coalesce(accept_public_notes, true)
    into recipient, accepts
  from public.member_profiles
  where card_username = lower(btrim(to_handle));

  if recipient is null then return 'no-such-resident'; end if;
  if recipient = sender then return 'self'; end if;
  -- She can close her box. That switch already existed on member_profiles.
  if not accepts then return 'not-accepting'; end if;

  insert into public.resident_mail (from_user_id, to_user_id, body, item_type, item_key)
  values (sender, recipient, nullif(btrim(body), ''), item_type, item_key);

  return 'sent';
end;
$$;

revoke all on function public.send_resident_mail(text, text, text, text) from public;
grant execute on function public.send_resident_mail(text, text, text, text) to authenticated;
-- ⛔ NOT granted to anon: you must be a resident to post a letter.

-- ── Reading your box ─────────────────────────────────────────────────────────
-- Joins the sender's HANDLE (never her email, never her private fields).
create or replace function public.my_resident_mail()
returns table (
  id uuid,
  from_handle text,
  from_display_name text,
  body text,
  item_type text,
  item_key text,
  sent_at timestamptz,
  read_at timestamptz,
  redeemed_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select m.id,
         p.card_username,
         p.display_name,
         m.body, m.item_type, m.item_key,
         m.sent_at, m.read_at, m.redeemed_at
  from public.resident_mail m
  left join public.member_profiles p on p.id = m.from_user_id
  where m.to_user_id = auth.uid()
  order by m.sent_at desc;
$$;

revoke all on function public.my_resident_mail() from public;
grant execute on function public.my_resident_mail() to authenticated;

comment on table public.resident_mail is
  'Post Office PO box. Addressed by @handle via send_resident_mail(); read via my_resident_mail(). '
  'No INSERT policy on purpose — the function is the only way in. Never carries email addresses.';
