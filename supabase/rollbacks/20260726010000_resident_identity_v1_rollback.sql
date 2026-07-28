-- Roll back only the private Resident Card identity foundation.
-- This intentionally preserves auth.users, member_profiles and every
-- browser-local Resident Card.

begin;

revoke execute on function public.update_my_resident_profile_v1(
  text, text, boolean, uuid
) from public, anon, authenticated;
revoke execute on function public.revoke_my_resident_card_v1(uuid, uuid)
  from public, anon, authenticated;
revoke execute on function public.claim_resident_card_v1(jsonb, uuid, uuid)
  from public, anon, authenticated;
revoke execute on function public.get_my_resident_state_v1()
  from public, anon, authenticated;

drop function if exists public.update_my_resident_profile_v1(
  text, text, boolean, uuid
);
drop function if exists public.revoke_my_resident_card_v1(uuid, uuid);
drop function if exists public.claim_resident_card_v1(jsonb, uuid, uuid);
drop function if exists public.get_my_resident_state_v1();
drop function if exists public.resident_card_v1_is_valid(jsonb);

drop table if exists public.resident_identity_mutations;
drop table if exists public.resident_cards;

commit;
