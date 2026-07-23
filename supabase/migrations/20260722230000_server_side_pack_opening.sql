-- ============================================================================
-- SERVER-SIDE PACK OPENING — the hard requirement from the locked economy.
-- Spec: operations/trading-card-economy-locked.md · memory [[trading-card-economy-locked]]
--
--   "Pack opening MUST happen server-side. If the browser decides a pack's
--    contents, anyone can reroll until they get the foil."
--
-- Today games/trading-cards.html rolls in JavaScript and has a RESET button, so
-- the deck is whatever the member wants it to be. After this, the browser asks
-- and the database answers.
--
-- ⚠ WHAT THIS DOES NOT DO: the 22-card CHARACTER roster does not exist as data
-- (content/data/character-cards.json holds 4 town-character *profiles*, not cards).
-- So this ships the machinery and seeds it with the Concept deck that does exist.
-- Character cards are rows in card_definitions when Ali has them — no rework.
-- ============================================================================

-- ── Numbers Ali has NOT set (spec §"STILL OPEN"). My defaults, in ONE place. ──
-- To change: edit these three constants in open_pack() below. Nothing else.
--   cards per standard pack ...... 3
--   cards per GOLD pack .......... 5   (spec §8: "better, not twice as good")
--   finish odds .................. common 80 / holo 15 / foil 5
-- Spec §7 says odds must be fixed and PUBLISHABLE — they live here, in the open.

create table if not exists public.card_definitions (
  id text primary key,
  deck text not null check (deck in ('concept','character')),
  title text not null,
  episode integer,
  -- Location bias (spec §2): a LUMINAiRY pack skews SAiNTS. Null = any pack.
  affinity text,
  active boolean not null default true
);
alter table public.card_definitions enable row level security;
drop policy if exists "Anyone can read the roster" on public.card_definitions;
create policy "Anyone can read the roster" on public.card_definitions for select using (true);
comment on table public.card_definitions is
  'The card roster. Character cards go here when the roster exists — see the 2026-07-22 note in the migration.';

-- ── Packs a resident has earned but not yet opened ───────────────────────────
create table if not exists public.member_packs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'standard' check (kind in ('standard','gold')),
  source text,                      -- which building earned it (biases contents)
  earned_at timestamptz not null default now(),
  opened_at timestamptz
);
create index if not exists member_packs_unopened_idx on public.member_packs(user_id) where opened_at is null;
alter table public.member_packs enable row level security;

drop policy if exists "Residents see their own packs" on public.member_packs;
create policy "Residents see their own packs" on public.member_packs
  for select using (auth.uid() = user_id);
-- ⛔ No INSERT/UPDATE policy. Packs are granted and opened by functions only —
--    otherwise the browser could mint itself packs, which is this whole problem.

-- ── Opening ──────────────────────────────────────────────────────────────────
-- Returns the pulls. Rolls server-side. Enforces: never the same card twice in a
-- pack (§5), visible pity — guaranteed foil on every 5th pack (§4), location
-- bias as a weighting not a guarantee (§2).
create or replace function public.open_pack(pack_id uuid)
returns table (card_id text, title text, finish text, is_duplicate boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  pack public.member_packs%rowtype;
  n_cards int;
  opened_before int;
  pity boolean;
  rec record;
  roll numeric;
  chosen text;
  i int := 0;
begin
  if me is null then raise exception 'not-signed-in'; end if;

  select * into pack from public.member_packs
   where id = pack_id and user_id = me and opened_at is null
   for update;
  if not found then raise exception 'no-such-unopened-pack'; end if;

  -- ⚙ THE THREE NUMBERS
  n_cards := case when pack.kind = 'gold' then 5 else 3 end;

  select count(*) into opened_before from public.member_packs
   where user_id = me and opened_at is not null;
  -- §4 visible pity: every 5th pack guarantees a foil. Gold always does (§6).
  pity := (pack.kind = 'gold') or (((opened_before + 1) % 5) = 0);

  for rec in
    select d.id, d.title
      from public.card_definitions d
     where d.active
     order by (case when pack.source is not null and d.affinity = pack.source
                    then random() + 0.35 else random() end) desc   -- §2 bias, not guarantee
     limit n_cards                                                  -- §5 distinct by construction
  loop
    i := i + 1;
    roll := random() * 100;
    -- §3 rarity is the FINISH. §7 fixed, publishable odds.
    chosen := case
      when pity and i = 1 then 'foil'      -- the guaranteed one comes out first
      when roll < 5  then 'foil'
      when roll < 20 then 'holo'
      else 'common'
    end;

    card_id := rec.id;
    title   := rec.title;
    finish  := chosen;
    is_duplicate := exists (
      select 1 from public.member_reward_events e
       where e.user_id = me and e.dedupe_key = 'trading-card:' || rec.id
    );

    -- The card lands in her binder. Duplicates bump the count (§ duplicates are
    -- the fuel for gifting) rather than being dropped.
    insert into public.member_reward_events (user_id, dedupe_key, reward_type, title, source, metadata)
    values (me, 'trading-card:' || rec.id, 'trading_card', rec.title, 'Trading Card Pack',
            jsonb_build_object('finish', chosen, 'count', 1, 'pack_kind', pack.kind))
    on conflict (user_id, dedupe_key) do update
      set metadata = jsonb_set(
            public.member_reward_events.metadata,
            '{count}',
            to_jsonb(coalesce((public.member_reward_events.metadata->>'count')::int, 1) + 1)
          );

    return next;
  end loop;

  update public.member_packs set opened_at = now() where id = pack.id;
end;
$$;

revoke all on function public.open_pack(uuid) from public;
grant execute on function public.open_pack(uuid) to authenticated;

-- ── The visible pity counter (§4) ────────────────────────────────────────────
create or replace function public.my_pack_status()
returns table (unopened int, opened int, packs_until_guaranteed_foil int)
language sql stable security definer set search_path = public as $$
  select
    (select count(*)::int from public.member_packs where user_id = auth.uid() and opened_at is null),
    (select count(*)::int from public.member_packs where user_id = auth.uid() and opened_at is not null),
    (5 - ((select count(*) from public.member_packs where user_id = auth.uid() and opened_at is not null) % 5))::int;
$$;
revoke all on function public.my_pack_status() from public;
grant execute on function public.my_pack_status() to authenticated;
