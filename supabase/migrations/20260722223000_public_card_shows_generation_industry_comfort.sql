-- Ali 2026-07-22: "i think age bracket, industry and level is fine to share with
-- others. its general funny titles not specific."
--
-- generation / industry / ai_comfort are categorical buckets picked from a menu —
-- not free text, not identifying. On a Resident Card they read as character traits
-- ("Gen X, tax, new at this"), which is the point of the card.
--
-- Still OUT of the public view, deliberately:
--   email (see 20260722201500) · goal · besties (her social graph) ·
--   newsletter_opt_in / _at · created_at / updated_at · member_card_status
--
-- ⛔ The standing rule is unchanged: ADDING A COLUMN HERE PUBLISHES IT.
drop view if exists public.public_resident_cards;
create view public.public_resident_cards as
  select id, card_username, display_name, resident_number, card_role, card_archetype,
         card_avatar_url, avatar_slug, card_color_primary, card_color_accent, card_motto,
         generation, industry, ai_comfort,
         favorite_saint, favorite_song, favorite_activity, favorite_episode,
         favorite_storefront, favorite_character, favorite_cocktail, favorite_quote,
         pinned_collectible_type, pinned_collectible_ref, away_message, away_expires_at,
         accept_public_notes, card_created_at, member_card_is_public
  from public.member_profiles where member_card_is_public = true;
alter view public.public_resident_cards set (security_invoker = false);
grant select on public.public_resident_cards to anon, authenticated;
