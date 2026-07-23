-- BEST FRIENDS necklace — the two-sided referral reward.
-- Built 2026-07-22. postcard.html has promised this in four places and granted
-- nothing (laidies_invited_by was written and never read). This makes it true.
--
-- The mechanic (Ali, postcard-from-sunnyvaile-feature): you mail a friend a
-- postcard; she comes to town and makes her card; you BOTH get a half of the
-- BEST FRIENDS necklace. "You can't finish it alone. That's the point."
--
-- Why a SECURITY DEFINER function: the inviter is a different account on a
-- different browser. The invitee cannot insert a reward for the inviter's
-- user_id (the INSERT policy is auth.uid() = user_id). So the invitee calls
-- this, and it grants BOTH halves — same shape as send_resident_mail().

-- best_friends_necklace is a new reward_type; the whitelist CHECK must allow it.
alter table public.member_reward_events
  drop constraint if exists member_reward_events_reward_type_check;
alter table public.member_reward_events
  add constraint member_reward_events_reward_type_check
  check (reward_type = any (array[
    'quiz_score','quiz_sticker','sticker_girl_talk','sticker_express',
    'trading_card','hidden_charm','merit_badge','secret_badge',
    'dare_completed','dare_penalty','community_room_post',
    'best_friends_necklace'
  ]));

create or replace function public.redeem_bestie_invite(inviter_handle text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  invitee        uuid := auth.uid();
  invitee_handle text;
  inviter        uuid;
  h              text := lower(btrim(inviter_handle));
  pair_key       text;
begin
  if invitee is null then return 'not-signed-in'; end if;

  select card_username into invitee_handle from member_profiles where id = invitee;
  if invitee_handle is null then return 'need-a-handle'; end if;

  select id into inviter from member_profiles where card_username = h;
  if inviter is null then return 'no-such-resident'; end if;
  if inviter = invitee then return 'self'; end if;

  -- One necklace per pair, ever. The key is symmetric (sorted) so it does not
  -- matter which of the two the reward is written for — a second attempt from
  -- either direction is a no-op.
  pair_key := 'bestie:' || least(inviter::text, invitee::text)
                        || ':' || greatest(inviter::text, invitee::text);

  -- invitee's half — engraved with the inviter
  insert into member_reward_events (user_id, dedupe_key, reward_type, title, source, metadata)
  values (invitee, pair_key, 'best_friends_necklace',
          'BEST FRIENDS with @' || h, 'postcard',
          jsonb_build_object('bestie_handle', h))
  on conflict (user_id, dedupe_key) do nothing;

  -- inviter's half — engraved with the invitee
  insert into member_reward_events (user_id, dedupe_key, reward_type, title, source, metadata)
  values (inviter, pair_key, 'best_friends_necklace',
          'BEST FRIENDS with @' || invitee_handle, 'postcard',
          jsonb_build_object('bestie_handle', invitee_handle))
  on conflict (user_id, dedupe_key) do nothing;

  -- record the friendship both ways on the profile (besties jsonb, default []).
  -- Append only if not already present, so it is safe to re-run.
  update member_profiles
     set besties = besties || to_jsonb(h)
   where id = invitee
     and not (besties ? h);

  update member_profiles
     set besties = besties || to_jsonb(invitee_handle)
   where id = inviter
     and not (besties ? invitee_handle);

  return 'granted';
end;
$$;

revoke all on function public.redeem_bestie_invite(text) from public, anon;
grant execute on function public.redeem_bestie_invite(text) to authenticated;

comment on function public.redeem_bestie_invite(text) is
  'Invitee (authenticated) redeems a postcard invite: grants the BEST FRIENDS '
  'necklace half to both her and the inviter (by handle), idempotent per pair. '
  'Returns granted | self | no-such-resident | need-a-handle | not-signed-in.';
