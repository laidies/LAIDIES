-- LOCAL CANDIDATE ONLY — do not apply until Ali approves the operational defaults below.
-- Proposed (not admitted policy): five invitations per sender per UTC day; invite expiry 30 days.
-- The token is derived from a random invite UUID plus a private singleton key,
-- so only its SHA-256 hash is retained at rest.

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

alter table public.resident_cards add column if not exists created_at timestamptz not null default clock_timestamp();
comment on column public.resident_cards.created_at is
  'Original account-backed Card claim time. Existing Cards receive this migration time and cannot qualify an invitation accepted earlier.';

create table public.resident_referral_key_v1 (
  singleton boolean primary key default true check (singleton),
  secret bytea not null check (octet_length(secret) >= 32),
  created_at timestamptz not null default now()
);
insert into public.resident_referral_key_v1(singleton, secret)
values (true, extensions.gen_random_bytes(32)) on conflict (singleton) do nothing;
alter table public.resident_referral_key_v1 enable row level security;
revoke all on table public.resident_referral_key_v1 from public, anon, authenticated;

create table public.resident_referral_invites_v1 (
  id uuid primary key,
  sender_user_id uuid not null references auth.users(id) on delete cascade,
  recipient_user_id uuid references auth.users(id) on delete cascade,
  token_hash text not null unique check (length(token_hash) = 64),
  issue_idempotency_key uuid not null,
  state text not null check (state in ('issued','accepted','qualified','revoked','withdrawn')),
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  accepted_at timestamptz,
  qualified_at timestamptz,
  revoked_at timestamptz,
  withdrawn_at timestamptz,
  check (recipient_user_id is null or recipient_user_id <> sender_user_id),
  unique (sender_user_id, issue_idempotency_key)
);
create unique index resident_referral_one_recipient_v1
  on public.resident_referral_invites_v1(recipient_user_id) where recipient_user_id is not null;

create table public.resident_referral_receipts_v1 (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references public.resident_referral_invites_v1(id) on delete cascade,
  actor_user_id uuid not null references auth.users(id) on delete cascade,
  operation text not null check (operation in ('issued','accepted','qualified','revoked','withdrawn')),
  idempotency_key uuid not null,
  request_target_hash text not null,
  state text not null,
  recognition_removed boolean,
  occurred_at timestamptz not null default now(),
  unique (actor_user_id, operation, idempotency_key)
);
create table public.resident_referral_awards_v1 (
  invite_id uuid primary key references public.resident_referral_invites_v1(id) on delete cascade,
  sender_event_id uuid not null references public.member_reward_events(id) on delete cascade,
  recipient_event_id uuid not null references public.member_reward_events(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.resident_referral_invites_v1 enable row level security;
alter table public.resident_referral_receipts_v1 enable row level security;
alter table public.resident_referral_awards_v1 enable row level security;
revoke all on table public.resident_referral_invites_v1, public.resident_referral_receipts_v1, public.resident_referral_awards_v1 from public, anon, authenticated;

-- Restrictive policies are ANDed with every permissive policy, including drifted
-- owner-write/public-read policies. Other reward types retain their old access.
-- All necklaces, including historical rows, remain private to their owner.
create policy resident_necklace_owner_read_v1 on public.member_reward_events
  as restrictive for select to public
  using (reward_type <> 'best_friends_necklace' or auth.uid() = user_id);
create policy resident_necklace_server_insert_v1 on public.member_reward_events
  as restrictive for insert to public
  with check (reward_type <> 'best_friends_necklace');
create policy resident_necklace_server_update_v1 on public.member_reward_events
  as restrictive for update to public
  using (reward_type <> 'best_friends_necklace')
  with check (reward_type <> 'best_friends_necklace');
create policy resident_necklace_server_delete_v1 on public.member_reward_events
  as restrictive for delete to public
  using (reward_type <> 'best_friends_necklace');

-- First-claim time is server authority, including if a later policy grants a
-- direct write. Serialize first claim with invite acceptance for this account.
create or replace function public.stamp_resident_card_claim_time_v1()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_accepted_at timestamptz;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('resident-referral-card:' || new.owner_id::text,0));
  if tg_op='UPDATE' then
    if new.owner_id is distinct from old.owner_id then raise exception using errcode='42501',message='resident-card-owner-immutable'; end if;
    new.created_at:=old.created_at;
  else
    select accepted_at into v_accepted_at from public.resident_referral_invites_v1 where recipient_user_id=new.owner_id and state='accepted';
    -- Database clocks can tie at their resolution. The account lock proves the
    -- order; preserve that order in the stored timestamp, even on tied clocks.
    new.created_at:=greatest(clock_timestamp(),v_accepted_at+interval '1 microsecond');
  end if;
  return new;
end; $$;
create trigger resident_card_claim_time_v1 before insert or update on public.resident_cards
  for each row execute function public.stamp_resident_card_claim_time_v1();

-- Remove both new-service halves while their private attribution still exists.
-- Historical necklaces are deliberately outside this cleanup boundary.
create or replace function public.delete_resident_referral_awards_v1()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_awards public.resident_referral_awards_v1%rowtype;
begin
  select * into v_awards from public.resident_referral_awards_v1 where invite_id=old.id;
  if found then
    delete from public.member_reward_events
      where id in (v_awards.sender_event_id,v_awards.recipient_event_id)
        and source='resident_referral_v1' and reward_type='best_friends_necklace';
  end if;
  return old;
end; $$;
create trigger resident_referral_delete_awards_v1
  before delete on public.resident_referral_invites_v1
  for each row execute function public.delete_resident_referral_awards_v1();

-- Auth has several independent cascading FKs. A BEFORE trigger prevents reward
-- deletion from erasing the attribution before the invite cascade gets to it.
create or replace function public.delete_account_resident_referrals_v1()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  delete from public.resident_referral_invites_v1
    where sender_user_id=old.id or recipient_user_id=old.id;
  return old;
end; $$;
create trigger account_delete_resident_referrals_v1
  before delete on auth.users
  for each row execute function public.delete_account_resident_referrals_v1();

create or replace function public.resident_referral_token_v1(p_invite_id uuid)
returns text language plpgsql stable security definer set search_path = '' as $$
declare v_secret bytea;
begin
  select secret into v_secret from public.resident_referral_key_v1 where singleton;
  if v_secret is null then raise exception using errcode = '55000', message = 'referral-token-key-unavailable'; end if;
  return pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(p_invite_id::text, 'utf8') || v_secret), 'hex');
end; $$;

create or replace function public.resident_referral_hash_v1(p_token text)
returns text language sql immutable set search_path = '' as $$
  select pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to($1, 'utf8')), 'hex')
$$;

create or replace function public.issue_resident_referral_v1(p_idempotency_key uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid := auth.uid(); v_invite public.resident_referral_invites_v1%rowtype; v_id uuid := gen_random_uuid(); v_token text;
begin
  if v_actor is null then raise exception using errcode='42501', message='authentication-required'; end if;
  if p_idempotency_key is null then raise exception using errcode='22023', message='idempotency-key-required'; end if;
  if not exists (select 1 from public.resident_cards where owner_id=v_actor and deleted_at is null) then raise exception using errcode='42501', message='claimed-resident-card-required'; end if;
  if not pg_catalog.pg_try_advisory_xact_lock(pg_catalog.hashtextextended('resident-referral-issue:' || v_actor::text, 0)) then raise exception using errcode='55P03', message='referral-issue-busy'; end if;
  select * into v_invite from public.resident_referral_invites_v1 where sender_user_id=v_actor and issue_idempotency_key=p_idempotency_key for update;
  if found then
    if v_invite.state in ('issued','accepted') and v_invite.expires_at <= now() then return jsonb_build_object('state','expired','inviteId',v_invite.id,'expiresAt',v_invite.expires_at); end if;
    if v_invite.state <> 'issued' then return jsonb_build_object('state',v_invite.state,'inviteId',v_invite.id,'expiresAt',v_invite.expires_at); end if;
    v_token := public.resident_referral_token_v1(v_invite.id);
    return jsonb_build_object('state','issued','inviteId',v_invite.id,'token',v_token,'expiresAt',v_invite.expires_at,'issueLimit',jsonb_build_object('perDay',5,'proposed',true),'expiresInDays',jsonb_build_object('value',30,'proposed',true));
  end if;
  if (select count(*) from public.resident_referral_invites_v1 where sender_user_id=v_actor and issued_at >= (date_trunc('day', now() at time zone 'UTC') at time zone 'UTC')) >= 5 then raise exception using errcode='PT429', message='referral-issue-daily-limit'; end if;
  v_token := public.resident_referral_token_v1(v_id);
  insert into public.resident_referral_invites_v1(id,sender_user_id,token_hash,issue_idempotency_key,state,expires_at) values(v_id,v_actor,public.resident_referral_hash_v1(v_token),p_idempotency_key,'issued',now()+interval '30 days');
  insert into public.resident_referral_receipts_v1(invite_id,actor_user_id,operation,idempotency_key,request_target_hash,state) values(v_id,v_actor,'issued',p_idempotency_key,public.resident_referral_hash_v1('issue:' || p_idempotency_key::text),'issued');
  return jsonb_build_object('state','issued','inviteId',v_id,'token',v_token,'expiresAt',now()+interval '30 days','issueLimit',jsonb_build_object('perDay',5,'proposed',true),'expiresInDays',jsonb_build_object('value',30,'proposed',true));
end; $$;

create or replace function public.inspect_resident_referral_invite_v1(p_token text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid := auth.uid(); v public.resident_referral_invites_v1%rowtype;
begin
  if v_actor is null then raise exception using errcode='42501', message='authentication-required'; end if;
  select * into v from public.resident_referral_invites_v1 where token_hash=public.resident_referral_hash_v1(p_token);
  if not found or (v.recipient_user_id is not null and v.recipient_user_id <> v_actor) then raise exception using errcode='42501', message='invite-unavailable'; end if;
  if v.state in ('issued','accepted') and v.expires_at <= now() then return jsonb_build_object('state','expired','expiresAt',v.expires_at,'action',null); end if;
  if v.state='issued' and exists(select 1 from public.resident_cards where owner_id=v_actor) then
    return jsonb_build_object('state',v.state,'expiresAt',v.expires_at,'action',null,'reason','already-resident');
  end if;
  return jsonb_build_object('state',v.state,'expiresAt',v.expires_at,'action',case when v.state='issued' then 'accept' when v.state='accepted' then 'claim-card-then-qualify' else null end);
end; $$;

create or replace function public.accept_resident_referral_invite_v1(p_token text, p_idempotency_key uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid := auth.uid(); v public.resident_referral_invites_v1%rowtype; v_receipt public.resident_referral_receipts_v1%rowtype; v_target_hash text := public.resident_referral_hash_v1(p_token);
begin
  if v_actor is null then raise exception using errcode='42501', message='authentication-required'; end if;
  if p_idempotency_key is null then raise exception using errcode='22023', message='idempotency-key-required'; end if;
  select * into v_receipt from public.resident_referral_receipts_v1 where actor_user_id=v_actor and operation='accepted' and idempotency_key=p_idempotency_key;
  if found then
    if v_receipt.request_target_hash <> v_target_hash then raise exception using errcode='23505', message='idempotency-conflict'; end if;
    select * into v from public.resident_referral_invites_v1 where id=v_receipt.invite_id;
    return jsonb_build_object('state',case when v.expires_at <= now() and v.state in ('issued','accepted') then 'expired' else v.state end,'inviteId',v.id);
  end if;
  if not pg_catalog.pg_try_advisory_xact_lock(pg_catalog.hashtextextended('resident-referral-card:' || v_actor::text,0)) then raise exception using errcode='55P03',message='resident-card-claim-busy'; end if;
  select * into v from public.resident_referral_invites_v1 where token_hash=v_target_hash for update;
  if not found or v.sender_user_id=v_actor or (v.recipient_user_id is not null and v.recipient_user_id<>v_actor) then raise exception using errcode='42501', message='invite-unavailable'; end if;
  if v.expires_at <= now() then raise exception using errcode='42501', message='invite-expired'; end if;
  if v.state <> 'issued' then raise exception using errcode='40900', message='invite-not-acceptable'; end if;
  if exists(select 1 from public.resident_cards where owner_id=v_actor) then raise exception using errcode='42501',message='already-resident'; end if;
  update public.resident_referral_invites_v1 set recipient_user_id=v_actor,state='accepted',accepted_at=clock_timestamp() where id=v.id;
  insert into public.resident_referral_receipts_v1(invite_id,actor_user_id,operation,idempotency_key,request_target_hash,state) values(v.id,v_actor,'accepted',p_idempotency_key,v_target_hash,'accepted');
  return jsonb_build_object('state','accepted','inviteId',v.id,'expiresAt',v.expires_at);
end; $$;

create or replace function public.qualify_my_resident_referral_v1(p_idempotency_key uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid := auth.uid(); v public.resident_referral_invites_v1%rowtype; v_sender_event uuid; v_recipient_event uuid; v_key text; v_legacy_key text; v_prior_invite uuid;
begin
  if v_actor is null then raise exception using errcode='42501', message='authentication-required'; end if;
  if p_idempotency_key is null then raise exception using errcode='22023', message='idempotency-key-required'; end if;
  select invite_id into v_prior_invite from public.resident_referral_receipts_v1 where actor_user_id=v_actor and operation='qualified' and idempotency_key=p_idempotency_key;
  if found then
    select * into v from public.resident_referral_invites_v1 where id=v_prior_invite;
    return jsonb_build_object('state',v.state,'inviteId',v.id,'awarded',case when v.state='qualified' then 'best_friends_necklace' else null end);
  end if;
  if not exists(select 1 from public.resident_cards where owner_id=v_actor and deleted_at is null) then raise exception using errcode='42501', message='claimed-resident-card-required'; end if;
  select * into v from public.resident_referral_invites_v1 where recipient_user_id=v_actor for update;
  if not found or v.state <> 'accepted' or v.expires_at <= now() then raise exception using errcode='42501', message='referral-not-qualifiable'; end if;
  if not exists(select 1 from public.resident_cards where owner_id=v_actor and deleted_at is null and created_at > v.accepted_at) then raise exception using errcode='42501', message='new-claimed-resident-card-required'; end if;
  v_legacy_key := 'bestie:' || least(v.sender_user_id::text,v_actor::text) || ':' || greatest(v.sender_user_id::text,v_actor::text);
  v_key := 'bestie:v1:' || public.resident_referral_hash_v1(v_legacy_key);
  if exists(select 1 from public.member_reward_events where dedupe_key in (v_key,v_legacy_key) and reward_type='best_friends_necklace') then raise exception using errcode='P0001', message='bestie-pair-already-recognized'; end if;
  insert into public.member_reward_events(user_id,dedupe_key,reward_type,title,source,metadata) values(v.sender_user_id,v_key,'best_friends_necklace','BEST FRIENDS necklace','resident_referral_v1','{}'::jsonb) returning id into v_sender_event;
  insert into public.member_reward_events(user_id,dedupe_key,reward_type,title,source,metadata) values(v_actor,v_key,'best_friends_necklace','BEST FRIENDS necklace','resident_referral_v1','{}'::jsonb) returning id into v_recipient_event;
  insert into public.resident_referral_awards_v1(invite_id,sender_event_id,recipient_event_id) values(v.id,v_sender_event,v_recipient_event);
  update public.resident_referral_invites_v1 set state='qualified',qualified_at=now() where id=v.id;
  insert into public.resident_referral_receipts_v1(invite_id,actor_user_id,operation,idempotency_key,request_target_hash,state) values(v.id,v_actor,'qualified',p_idempotency_key,public.resident_referral_hash_v1(v.id::text),'qualified');
  return jsonb_build_object('state','qualified','inviteId',v.id,'awarded','best_friends_necklace');
end; $$;

create or replace function public.list_my_resident_referrals_v1() returns jsonb language sql security definer set search_path = '' as $$
 select coalesce(jsonb_agg(jsonb_strip_nulls(jsonb_build_object('inviteId',i.id,'state',case when i.state in ('issued','accepted') and i.expires_at<=now() then 'expired' else i.state end,'expiresAt',i.expires_at,'role',case when i.sender_user_id=auth.uid() then 'sender' else 'recipient' end,'issueIdempotencyKey',case when i.sender_user_id=auth.uid() then i.issue_idempotency_key else null end)) order by i.issued_at desc),'[]'::jsonb)
 from public.resident_referral_invites_v1 i where i.sender_user_id=auth.uid() or i.recipient_user_id=auth.uid()
$$;

-- A private, minimal display projection: no handle, counterpart ID, invite ID,
-- dedupe key, or legacy title can enter the Closet through this response.
create or replace function public.list_my_resident_necklaces_v1()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid:=auth.uid(); v_result jsonb;
begin
  if v_actor is null then raise exception using errcode='42501',message='authentication-required'; end if;
  select coalesce(jsonb_agg(jsonb_build_object('id',e.id,'title','BEST FRIENDS necklace','createdAt',e.created_at) order by e.created_at desc,e.id),'[]'::jsonb)
    into v_result
    from public.member_reward_events e
    where e.user_id=v_actor and e.reward_type='best_friends_necklace'
      and (e.source is distinct from 'resident_referral_v1' or exists (
        select 1 from public.resident_referral_awards_v1 a
          join public.resident_referral_invites_v1 i on i.id=a.invite_id
        where i.state='qualified'
          and ((a.sender_event_id=e.id and i.sender_user_id=v_actor)
            or (a.recipient_event_id=e.id and i.recipient_user_id=v_actor))
      ));
  return v_result;
end; $$;

create or replace function public.revoke_my_resident_referral_v1(p_invite_id uuid,p_idempotency_key uuid) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid:=auth.uid(); v public.resident_referral_invites_v1%rowtype; v_receipt public.resident_referral_receipts_v1%rowtype;
begin
 if v_actor is null then raise exception using errcode='42501',message='authentication-required'; end if;
 if p_idempotency_key is null or p_invite_id is null then raise exception using errcode='22023',message='mutation-keys-required'; end if;
 select * into v_receipt from public.resident_referral_receipts_v1 where actor_user_id=v_actor and operation='revoked' and idempotency_key=p_idempotency_key;
 if found then
   if v_receipt.request_target_hash <> public.resident_referral_hash_v1(p_invite_id::text) then raise exception using errcode='23505',message='idempotency-conflict'; end if;
   return jsonb_build_object('state','revoked','inviteId',p_invite_id);
 end if;
 select * into v from public.resident_referral_invites_v1 where id=p_invite_id and sender_user_id=v_actor for update;
 if not found or v.state<>'issued' then raise exception using errcode='42501',message='invite-not-revocable'; end if;
 update public.resident_referral_invites_v1 set state='revoked',revoked_at=now() where id=v.id;
 insert into public.resident_referral_receipts_v1(invite_id,actor_user_id,operation,idempotency_key,request_target_hash,state) values(v.id,v_actor,'revoked',p_idempotency_key,public.resident_referral_hash_v1(v.id::text),'revoked');
 return jsonb_build_object('state','revoked','inviteId',v.id);
end; $$;

create or replace function public.withdraw_my_resident_referral_v1(p_invite_id uuid,p_idempotency_key uuid) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid:=auth.uid(); v public.resident_referral_invites_v1%rowtype; a public.resident_referral_awards_v1%rowtype; v_removed boolean:=false; v_receipt public.resident_referral_receipts_v1%rowtype;
begin
 if v_actor is null then raise exception using errcode='42501',message='authentication-required'; end if;
 if p_idempotency_key is null or p_invite_id is null then raise exception using errcode='22023',message='mutation-keys-required'; end if;
 select * into v_receipt from public.resident_referral_receipts_v1 where actor_user_id=v_actor and operation='withdrawn' and idempotency_key=p_idempotency_key;
 if found then
   if v_receipt.request_target_hash <> public.resident_referral_hash_v1(p_invite_id::text) then raise exception using errcode='23505',message='idempotency-conflict'; end if;
   return jsonb_build_object('state','withdrawn','inviteId',p_invite_id,'recognitionRemoved',v_receipt.recognition_removed);
 end if;
 select * into v from public.resident_referral_invites_v1 where id=p_invite_id and (recipient_user_id=v_actor or (state='qualified' and sender_user_id=v_actor)) for update;
 if not found or v.state not in ('accepted','qualified') then raise exception using errcode='42501',message='invite-not-withdrawable'; end if;
 select * into a from public.resident_referral_awards_v1 where invite_id=v.id;
 if found then delete from public.member_reward_events where id in (a.sender_event_id,a.recipient_event_id) and source='resident_referral_v1'; v_removed := found; end if;
 update public.resident_referral_invites_v1 set state='withdrawn',withdrawn_at=now() where id=v.id;
 insert into public.resident_referral_receipts_v1(invite_id,actor_user_id,operation,idempotency_key,request_target_hash,state,recognition_removed) values(v.id,v_actor,'withdrawn',p_idempotency_key,public.resident_referral_hash_v1(v.id::text),'withdrawn',v_removed);
 return jsonb_build_object('state','withdrawn','inviteId',v.id,'recognitionRemoved',v_removed);
end; $$;

-- Retire only the unsafe handle redemption path; historic necklace rows are untouched.
create or replace function public.redeem_bestie_invite(inviter_handle text) returns text language plpgsql security definer set search_path = '' as $$
begin raise exception using errcode='42501', message='legacy-handle-referral-redemption-retired'; end; $$;

revoke all on function public.resident_referral_token_v1(uuid), public.resident_referral_hash_v1(text), public.delete_resident_referral_awards_v1(), public.delete_account_resident_referrals_v1(), public.stamp_resident_card_claim_time_v1() from public, anon, authenticated;
revoke all on function public.issue_resident_referral_v1(uuid), public.inspect_resident_referral_invite_v1(text), public.accept_resident_referral_invite_v1(text,uuid), public.qualify_my_resident_referral_v1(uuid), public.list_my_resident_referrals_v1(), public.list_my_resident_necklaces_v1(), public.revoke_my_resident_referral_v1(uuid,uuid), public.withdraw_my_resident_referral_v1(uuid,uuid) from public, anon;
grant execute on function public.issue_resident_referral_v1(uuid), public.inspect_resident_referral_invite_v1(text), public.accept_resident_referral_invite_v1(text,uuid), public.qualify_my_resident_referral_v1(uuid), public.list_my_resident_referrals_v1(), public.list_my_resident_necklaces_v1(), public.revoke_my_resident_referral_v1(uuid,uuid), public.withdraw_my_resident_referral_v1(uuid,uuid), public.redeem_bestie_invite(text) to authenticated;
