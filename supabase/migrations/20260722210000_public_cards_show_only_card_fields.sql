-- ============================================================================
-- A public Resident Card must show ONLY what she chose to put on her card.
-- Ali, 2026-07-22: "i don't want to expose things people don't want exposed."
--
-- THE PROBLEM
-- `Closet public read` was `using (member_card_is_public = true or auth.uid() = id)`.
-- RLS filters ROWS, not COLUMNS — so ticking "make my card public" published all
-- 39 columns of that row to anyone holding the anon key, including four answers
-- given privately at sign-up and never shown on the card:
--     generation   — her age bracket
--     ai_comfort   — her skill level, literally 'new'
--     industry     — where she works
--     goal         — why she is here
-- plus `besties` (her social graph), newsletter status, and account timestamps.
--
-- For an audience of senior women quietly learning AI, "name + industry + age
-- bracket + beginner" is precisely the combination they would not want public.
--
-- THE FIX
-- 1. A view, `public_resident_cards`, exposing only card fields.
-- 2. The three "public collection" policies stop reaching into member_profiles
--    directly (they used an EXISTS subquery that is itself subject to RLS — so
--    removing the public row-read would have silently emptied every public
--    card's collections). They now call a SECURITY DEFINER helper instead.
-- 3. `Closet public read` is dropped. The raw table becomes owner-only.
--
-- Safe to run now: 0 profiles are public (verified), so nothing changes for any
-- existing resident. The owner's own Closet is untouched — "Closet owner write"
-- and "Members can read their profile" still cover auth.uid() = id.
-- ============================================================================

-- ── 1 · Helper: is this profile public? ──────────────────────────────────────
-- SECURITY DEFINER so it can answer without the caller needing to read the row.
-- It returns a single boolean and leaks nothing else.
create or replace function public.is_public_profile(profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.member_profiles
    where id = profile_id and member_card_is_public = true
  );
$$;

revoke all on function public.is_public_profile(uuid) from public;
grant execute on function public.is_public_profile(uuid) to anon, authenticated;

-- ── 2 · Repoint the public-collection policies at the helper ─────────────────
drop policy if exists "Closet public reward read" on public.member_reward_events;
create policy "Closet public reward read" on public.member_reward_events for select
  using (auth.uid() = user_id or public.is_public_profile(user_id));

drop policy if exists "Closet public issue read" on public.member_issue_progress;
create policy "Closet public issue read" on public.member_issue_progress for select
  using (auth.uid() = user_id or public.is_public_profile(user_id));

drop policy if exists "Cheat sheet public pin read" on public.member_pinned_references;
create policy "Cheat sheet public pin read" on public.member_pinned_references for select
  using (auth.uid() = user_id or (is_public = true and public.is_public_profile(user_id)));

-- ── 3 · The public card view — card fields ONLY ──────────────────────────────
-- ⛔ Adding a column here publishes it. Anything a resident did not deliberately
--    put on her card does not belong in this list.
drop view if exists public.public_resident_cards;
create view public.public_resident_cards as
  select
    id,
    card_username,
    display_name,
    resident_number,
    card_role,
    card_archetype,
    card_avatar_url,
    avatar_slug,
    card_color_primary,
    card_color_accent,
    card_motto,
    favorite_saint,
    favorite_song,
    favorite_activity,
    favorite_episode,
    favorite_storefront,
    favorite_character,
    favorite_cocktail,
    favorite_quote,
    pinned_collectible_type,
    pinned_collectible_ref,
    away_message,
    away_expires_at,
    accept_public_notes,
    card_created_at,
    member_card_is_public
  from public.member_profiles
  where member_card_is_public = true;

-- Runs with the view owner's rights so it can read the base table; the WHERE
-- clause above is the gate, and the column list is the filter.
alter view public.public_resident_cards set (security_invoker = false);

grant select on public.public_resident_cards to anon, authenticated;

-- ── 4 · The raw table is no longer publicly readable ─────────────────────────
drop policy if exists "Closet public read" on public.member_profiles;
