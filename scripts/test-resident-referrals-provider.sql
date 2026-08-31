-- Isolated database rehearsal only. Never run against production data.
-- psql -v ON_ERROR_STOP=1 -f scripts/test-resident-referrals-provider.sql
-- Schema, permissive-policy drift, grants and all synthetic users roll back.
begin;
\ir ../supabase/migrations/20260831010000_resident_referrals_v1.sql

-- Grants are explicit: a permission error cannot substitute for an RLS test.
grant usage on schema public, auth to anon, authenticated;
grant select on public.member_profiles to authenticated;
grant select, insert, update, delete on public.member_reward_events to anon, authenticated;
create policy referral_test_permissive_drift on public.member_reward_events
  for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

create function pg_temp.actor_id(n integer) returns uuid language sql immutable as $$ select ('81000000-0000-4000-8000-'||lpad(n::text,12,'0'))::uuid $$;
create function pg_temp.key(n integer) returns uuid language sql immutable as $$ select ('82000000-0000-4000-8000-'||lpad(n::text,12,'0'))::uuid $$;
create function pg_temp.become(n integer) returns text language sql as $$ select set_config('request.jwt.claim.sub',pg_temp.actor_id(n)::text,true) $$;
insert into auth.users(id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
  select pg_temp.actor_id(n),'authenticated','authenticated','referral-'||n||'@example.invalid','x',now(),'{}','{}',now(),now() from generate_series(1,14) n;
insert into public.member_profiles(id,display_name,card_username,member_card_is_public)
  select pg_temp.actor_id(n),'Fixture '||n,'fixture_'||n,n=1 from generate_series(1,14) n;
insert into public.member_reward_events(user_id,dedupe_key,reward_type,title,source,metadata)
  values(pg_temp.actor_id(1),'historic-owner','best_friends_necklace','BEST FRIENDS with @private_history','postcard','{"bestie_handle":"private_history"}');

create temp table referral_test_invites(label text primary key,receipt jsonb not null);
grant select, insert, update on referral_test_invites to authenticated;
create function pg_temp.invite_id(label text) returns uuid language sql as $$ select (receipt->>'inviteId')::uuid from pg_temp.referral_test_invites where label=$1 $$;
create function pg_temp.token(label text) returns text language sql as $$ select receipt->>'token' from pg_temp.referral_test_invites where label=$1 $$;
create function pg_temp.issue(label text,n integer) returns void language sql as $$ insert into pg_temp.referral_test_invites values($1,public.issue_resident_referral_v1(pg_temp.key($2))) $$;
create function pg_temp.claim() returns jsonb language sql as $$ select public.claim_resident_card_v1('{"version":1,"fields":{"displayName":"Fixture"}}',gen_random_uuid()) $$;
create function pg_temp.assert_true(v boolean,m text) returns text language plpgsql as $$
begin if v is distinct from true then raise exception 'assertion-failed: %',m; end if; return m; end $$;
create function pg_temp.expect_error(sql_text text,wanted_state text,wanted_message text) returns text language plpgsql as $$
declare actual_state text; actual_message text;
begin
  begin execute sql_text;
  exception when others then get stacked diagnostics actual_state=returned_sqlstate,actual_message=message_text;
  end;
  if actual_state is null then raise exception 'expected-denial: %',wanted_message; end if;
  if actual_state<>wanted_state or position(wanted_message in actual_message)=0 then
    raise exception 'wrong-denial: wanted % / %, got % / %',wanted_state,wanted_message,actual_state,actual_message;
  end if;
  return wanted_message;
end $$;
select pg_temp.expect_error($q$select pg_temp.assert_true(null,'null-calibration')$q$,'P0001','assertion-failed: null-calibration');
select pg_temp.expect_error($q$select pg_temp.expect_error('select 1','42501','success-calibration')$q$,'P0001','expected-denial: success-calibration');

set local role anon;
set local request.jwt.claim.sub='';
select pg_temp.assert_true((select count(*)=0 from public.member_reward_events where reward_type='best_friends_necklace'),'privacy: anonymous historical necklaces hidden');
select pg_temp.expect_error($q$select public.list_my_resident_necklaces_v1()$q$,'42501','permission denied for function');
select pg_temp.expect_error($q$select public.issue_resident_referral_v1(pg_temp.key(900))$q$,'42501','permission denied for function');
reset role;
select pg_temp.assert_true((select relrowsecurity from pg_class where oid='public.resident_referral_key_v1'::regclass),'private key RLS enabled');
select pg_temp.assert_true(not has_function_privilege('authenticated','public.resident_referral_token_v1(uuid)','EXECUTE'),'private token helper denied');
select pg_temp.assert_true(not has_function_privilege('authenticated','public.resident_referral_hash_v1(text)','EXECUTE'),'private hash helper denied');
select pg_temp.assert_true(not has_function_privilege('authenticated','public.delete_resident_referral_awards_v1()','EXECUTE'),'private cleanup helper denied');

set local role authenticated;
set local request.jwt.claim.sub='';
select pg_temp.expect_error($q$select public.list_my_resident_necklaces_v1()$q$,'42501','authentication-required');
select pg_temp.become(1);
select pg_temp.assert_true(has_table_privilege(current_user,'public.member_reward_events','INSERT'),'API INSERT grant is real');
select pg_temp.expect_error($q$select * from public.resident_referral_key_v1$q$,'42501','permission denied for table');
select pg_temp.expect_error($q$select * from public.resident_referral_invites_v1$q$,'42501','permission denied for table');
select pg_temp.expect_error($q$insert into public.member_reward_events(user_id,dedupe_key,reward_type,title) values(auth.uid(),'forged','best_friends_necklace','forged')$q$,'42501','row-level security');
insert into public.member_reward_events(user_id,dedupe_key,reward_type,title) values(auth.uid(),'allowed-other','quiz_score','Original');
update public.member_reward_events set title='Updated' where dedupe_key='allowed-other';
select pg_temp.assert_true((select title='Updated' from public.member_reward_events where dedupe_key='allowed-other'),'other reward writes preserved');
select pg_temp.expect_error($q$update public.member_reward_events set reward_type='best_friends_necklace' where dedupe_key='allowed-other'$q$,'42501','row-level security');
with changed as (update public.member_reward_events set title='Forged edit' where dedupe_key='historic-owner' returning id)
select pg_temp.assert_true((select count(*)=0 from changed),'forgery: existing necklace update denied despite OR-policy drift');
with removed as (delete from public.member_reward_events where dedupe_key='historic-owner' returning id)
select pg_temp.assert_true((select count(*)=0 from removed),'forgery: direct necklace delete denied despite OR-policy drift');
select pg_temp.assert_true(jsonb_array_length(public.list_my_resident_necklaces_v1())=1,'historical owned recognition retained');
select pg_temp.assert_true((select bool_and((select count(*) from jsonb_object_keys(e))=3 and e->>'title'='BEST FRIENDS necklace' and e ? 'id' and e ? 'createdAt') from jsonb_array_elements(public.list_my_resident_necklaces_v1()) e),'projection: exactly generic id title createdAt');

-- Use actual authenticated Card RPCs, never privileged fake Card documents.
select pg_temp.claim();
select pg_temp.issue('main',1);
select pg_temp.assert_true(public.issue_resident_referral_v1(pg_temp.key(1))->>'token'=pg_temp.token('main'),'issue retry returns same token');
select pg_temp.expect_error($q$select public.accept_resident_referral_invite_v1(pg_temp.token('main'),pg_temp.key(2))$q$,'42501','invite-unavailable');
select pg_temp.become(2);
select pg_temp.assert_true(public.accept_resident_referral_invite_v1(pg_temp.token('main'),pg_temp.key(3))->>'state'='accepted','distinct account accepts');
select pg_temp.expect_error($q$select public.qualify_my_resident_referral_v1(pg_temp.key(4))$q$,'42501','claimed-resident-card-required');
select pg_temp.claim();
select pg_temp.assert_true(public.qualify_my_resident_referral_v1(pg_temp.key(4))->>'state'='qualified','actual new Card qualifies');
select pg_temp.assert_true(public.qualify_my_resident_referral_v1(pg_temp.key(4))->>'state'='qualified','qualification replay is idempotent');
select pg_temp.assert_true(public.accept_resident_referral_invite_v1(pg_temp.token('main'),pg_temp.key(3))->>'state'='qualified','accept retry reports qualified terminal state');
select pg_temp.assert_true(jsonb_array_length(public.list_my_resident_necklaces_v1())=1,'recipient projection has one necklace');
select pg_temp.assert_true((select count(*)=1 from public.member_reward_events where reward_type='best_friends_necklace'),'privacy: foreign public-owner necklaces hidden');
reset role;
select pg_temp.assert_true((select count(*)=2 from public.member_reward_events where source='resident_referral_v1'),'exactly two new awards');
select pg_temp.assert_true((select bool_and(metadata='{}'::jsonb and title='BEST FRIENDS necklace' and dedupe_key ~ '^bestie:v1:[0-9a-f]{64}$') from public.member_reward_events where source='resident_referral_v1'),'privacy: no raw identity or relationship in new reward rows');
update public.resident_referral_invites_v1 set expires_at=now()-interval '1 day' where id=pg_temp.invite_id('main');
set local role anon;
set local request.jwt.claim.sub='';
select pg_temp.assert_true((select count(*)=0 from public.member_reward_events where reward_type='best_friends_necklace'),'privacy: anonymous new necklaces hidden');
select pg_temp.assert_true((select count(*)=1 from public.member_reward_events where reward_type='quiz_score'),'other public rewards preserved');
set local role authenticated;
select pg_temp.become(3);
select pg_temp.assert_true(public.list_my_resident_necklaces_v1()='[]'::jsonb,'foreign actor cannot list another owner necklaces');
select pg_temp.assert_true(public.list_my_resident_referrals_v1()='[]'::jsonb,'foreign actor cannot list invitations');
select pg_temp.expect_error($q$select public.inspect_resident_referral_invite_v1(pg_temp.token('main'))$q$,'42501','invite-unavailable');
select pg_temp.become(2);
select pg_temp.assert_true(public.inspect_resident_referral_invite_v1(pg_temp.token('main'))->>'state'='qualified','qualified inspection retains terminal state after expiry');
select pg_temp.assert_true((public.list_my_resident_referrals_v1()->0)->>'state'='qualified','qualified list retains terminal state after expiry');
select pg_temp.assert_true(public.withdraw_my_resident_referral_v1(pg_temp.invite_id('main'),pg_temp.key(5))->>'recognitionRemoved'='true','withdraw removes recognition');
select pg_temp.assert_true(public.withdraw_my_resident_referral_v1(pg_temp.invite_id('main'),pg_temp.key(5))->>'recognitionRemoved'='true','withdraw retry retains exact removal receipt');
select pg_temp.assert_true(public.qualify_my_resident_referral_v1(pg_temp.key(4))->>'state'='withdrawn','old qualification receipt cannot resurrect');
select pg_temp.assert_true(public.accept_resident_referral_invite_v1(pg_temp.token('main'),pg_temp.key(3))->>'state'='withdrawn','old acceptance receipt cannot resurrect');
select pg_temp.expect_error($q$select public.qualify_my_resident_referral_v1(pg_temp.key(6))$q$,'42501','referral-not-qualifiable');
select pg_temp.assert_true(public.list_my_resident_necklaces_v1()='[]'::jsonb,'withdrawn recipient projection empty');
select pg_temp.become(1);
select pg_temp.assert_true(jsonb_array_length(public.list_my_resident_necklaces_v1())=1,'withdraw preserves historical owner necklace');
select pg_temp.assert_true(public.issue_resident_referral_v1(pg_temp.key(1))->>'state'='withdrawn','sender replay retains withdrawn terminal state');
select pg_temp.assert_true(not (public.issue_resident_referral_v1(pg_temp.key(1)) ? 'token'),'terminal issue retry never re-exposes token');
select pg_temp.expect_error($q$select public.redeem_bestie_invite('fixture_2')$q$,'42501','legacy-handle-referral-redemption-retired');

select pg_temp.become(3); select pg_temp.claim();
select pg_temp.become(1); select pg_temp.issue('existing',10);
select pg_temp.become(3);
select pg_temp.assert_true(public.inspect_resident_referral_invite_v1(pg_temp.token('existing'))->>'reason'='already-resident' and public.inspect_resident_referral_invite_v1(pg_temp.token('existing'))->'action'='null'::jsonb,'existing Card inspection never offers acceptance');
select pg_temp.expect_error($q$select public.accept_resident_referral_invite_v1(pg_temp.token('existing'),pg_temp.key(11))$q$,'42501','already-resident');
select pg_temp.assert_true(public.list_my_resident_referrals_v1()='[]'::jsonb,'existing resident denial does not consume recipient slot');
-- Even a later direct-UPDATE grant/policy cannot forge the first claim time.
reset role;
create temp table referral_test_card_times as select owner_id,created_at from public.resident_cards;
grant select on referral_test_card_times to authenticated;
grant select,update on public.resident_cards to authenticated;
create policy referral_test_card_update_drift on public.resident_cards for update to authenticated using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
set local role authenticated;
select pg_temp.become(3);
update public.resident_cards set created_at=now()+interval '1 year' where owner_id=auth.uid();
select pg_temp.assert_true((select c.created_at=t.created_at from public.resident_cards c join pg_temp.referral_test_card_times t using(owner_id) where c.owner_id=auth.uid()),'timestamp: existing first claim is immutable despite direct write drift');
reset role;
drop policy referral_test_card_update_drift on public.resident_cards;
revoke all on public.resident_cards from authenticated;
-- Simulate the post-accept state of a legacy/raced existing Card. The final
-- qualification timestamp gate must still reject it, independently of accept.
savepoint raced_existing_card;
update public.resident_referral_invites_v1
  set recipient_user_id=pg_temp.actor_id(3),state='accepted',
      accepted_at=(select created_at+interval '1 second' from public.resident_cards where owner_id=pg_temp.actor_id(3))
  where id=pg_temp.invite_id('existing');
set local role authenticated;
select pg_temp.become(3);
select pg_temp.expect_error($q$select public.qualify_my_resident_referral_v1(pg_temp.key(14))$q$,'42501','new-claimed-resident-card-required');
rollback to savepoint raced_existing_card;
-- Supplied creation timestamps are overwritten at insertion as well as update.
savepoint supplied_creation_time;
insert into public.resident_cards(owner_id,document,created_at)
  values(pg_temp.actor_id(14),'{"version":1,"fields":{"displayName":"Fixture"}}','2099-01-01');
select pg_temp.assert_true((select created_at<clock_timestamp()+interval '5 seconds' from public.resident_cards where owner_id=pg_temp.actor_id(14)),'timestamp: supplied insert time is server stamped');
rollback to savepoint supplied_creation_time;
set local role authenticated;
select pg_temp.become(13); select public.accept_resident_referral_invite_v1(pg_temp.token('existing'),pg_temp.key(12));
select pg_temp.assert_true(public.withdraw_my_resident_referral_v1(pg_temp.invite_id('existing'),pg_temp.key(13))->>'recognitionRemoved'='false','unqualified withdrawal did not remove recognition');
select pg_temp.assert_true(public.withdraw_my_resident_referral_v1(pg_temp.invite_id('existing'),pg_temp.key(13))->>'recognitionRemoved'='false','unqualified withdrawal retry remains false');

-- Expiry and crossed/retried actions remain truthful for both actors.
select pg_temp.become(1);
select pg_temp.issue('expired-issued',20); select pg_temp.issue('expired-accepted',21); select pg_temp.issue('revoked',22);
select pg_temp.expect_error($q$select public.issue_resident_referral_v1(pg_temp.key(23))$q$,'PT429','referral-issue-daily-limit');
select pg_temp.become(4); select public.accept_resident_referral_invite_v1(pg_temp.token('expired-accepted'),pg_temp.key(24));
select pg_temp.expect_error($q$select public.accept_resident_referral_invite_v1(pg_temp.token('expired-issued'),pg_temp.key(24))$q$,'23505','idempotency-conflict');
reset role;
update public.resident_referral_invites_v1 set expires_at=now()-interval '1 second' where id in (pg_temp.invite_id('expired-issued'),pg_temp.invite_id('expired-accepted'));
set local role authenticated;
select pg_temp.become(4);
select pg_temp.assert_true(public.accept_resident_referral_invite_v1(pg_temp.token('expired-accepted'),pg_temp.key(24))->>'state'='expired','accept retry reports expired');
select pg_temp.assert_true(public.inspect_resident_referral_invite_v1(pg_temp.token('expired-accepted'))->>'state'='expired','inspection reports expired accepted');
select pg_temp.assert_true((public.list_my_resident_referrals_v1()->0)->>'state'='expired','recipient list reports expired accepted');
select pg_temp.become(1);
select pg_temp.assert_true(public.issue_resident_referral_v1(pg_temp.key(20))->>'state'='expired','issue retry reports expired issued');
select pg_temp.assert_true(public.issue_resident_referral_v1(pg_temp.key(21))->>'state'='expired','issue retry reports expired accepted');
select pg_temp.assert_true((select count(*)=2 from jsonb_array_elements(public.list_my_resident_referrals_v1()) e where e->>'state'='expired'),'sender list reports both expiries');
select public.revoke_my_resident_referral_v1(pg_temp.invite_id('revoked'),pg_temp.key(25));
select pg_temp.assert_true(public.revoke_my_resident_referral_v1(pg_temp.invite_id('revoked'),pg_temp.key(25))->>'state'='revoked','revoke retry truthful');
select pg_temp.expect_error($q$select public.revoke_my_resident_referral_v1(pg_temp.invite_id('expired-issued'),pg_temp.key(25))$q$,'23505','idempotency-conflict');
select pg_temp.become(5);
select pg_temp.expect_error($q$select public.accept_resident_referral_invite_v1(pg_temp.token('expired-issued'),pg_temp.key(26))$q$,'42501','invite-expired');
select pg_temp.expect_error($q$select public.accept_resident_referral_invite_v1(pg_temp.token('revoked'),pg_temp.key(27))$q$,'40900','invite-not-acceptable');

-- Helpers remain SECURITY INVOKER: setup uses actual authenticated RPCs.
select pg_temp.become(5); select pg_temp.claim(); select pg_temp.issue('delete-recipient',30);
select pg_temp.become(6); select public.accept_resident_referral_invite_v1(pg_temp.token('delete-recipient'),pg_temp.key(31)); select pg_temp.claim(); select public.qualify_my_resident_referral_v1(pg_temp.key(32));
select pg_temp.become(7); select pg_temp.claim(); select pg_temp.issue('delete-sender',33);
select pg_temp.become(8); select public.accept_resident_referral_invite_v1(pg_temp.token('delete-sender'),pg_temp.key(34)); select pg_temp.claim(); select public.qualify_my_resident_referral_v1(pg_temp.key(35));
select pg_temp.become(9); select pg_temp.claim(); select pg_temp.issue('delete-invite',36);
select pg_temp.become(10); select public.accept_resident_referral_invite_v1(pg_temp.token('delete-invite'),pg_temp.key(37)); select pg_temp.claim(); select public.qualify_my_resident_referral_v1(pg_temp.key(38));
reset role;
insert into public.member_reward_events(user_id,dedupe_key,reward_type,title,source)
  values(pg_temp.actor_id(5),'historic-survivor','best_friends_necklace','Historic','postcard');
-- Stress the unsafe FK ordering explicitly: own reward deletion happens first
-- among AFTER triggers. The candidate's BEFORE-account cleanup must beat it.
create function pg_temp.delete_own_rewards_first() returns trigger language plpgsql as $$
begin delete from public.member_reward_events where user_id=old.id; return old; end $$;
create trigger "000_referral_test_reward_cascade_first" after delete on auth.users
  for each row execute function pg_temp.delete_own_rewards_first();
delete from auth.users where id=pg_temp.actor_id(6);
select pg_temp.assert_true((select count(*)=0 from public.member_reward_events where source='resident_referral_v1' and user_id in (pg_temp.actor_id(5),pg_temp.actor_id(6))),'cleanup: recipient deletion removes both new halves');
select pg_temp.assert_true((select count(*)=1 from public.member_reward_events where user_id=pg_temp.actor_id(5) and source='postcard'),'cleanup preserves survivor historical recognition');
delete from auth.users where id=pg_temp.actor_id(7);
select pg_temp.assert_true((select count(*)=0 from public.member_reward_events where source='resident_referral_v1' and user_id in (pg_temp.actor_id(7),pg_temp.actor_id(8))),'cleanup: sender deletion removes both new halves');
delete from public.resident_referral_invites_v1 where id=pg_temp.invite_id('delete-invite');
select pg_temp.assert_true((select count(*)=0 from public.member_reward_events where source='resident_referral_v1' and user_id in (pg_temp.actor_id(9),pg_temp.actor_id(10))),'cleanup: invite deletion removes both new halves');
insert into public.member_reward_events(user_id,dedupe_key,reward_type,title,source)
  values(pg_temp.actor_id(10),'orphan-v1','best_friends_necklace','Orphan','resident_referral_v1');
set local role authenticated;
select pg_temp.become(10);
select pg_temp.assert_true(public.list_my_resident_necklaces_v1()='[]'::jsonb,'projection: orphan v1 rows excluded');

-- Hashed pairs still reject a historical raw pair without rewriting history.
select pg_temp.become(11); select pg_temp.claim(); select pg_temp.issue('legacy-pair',40);
select pg_temp.become(12); select public.accept_resident_referral_invite_v1(pg_temp.token('legacy-pair'),pg_temp.key(41)); select pg_temp.claim();
reset role;
insert into public.member_reward_events(user_id,dedupe_key,reward_type,title,source)
  values(pg_temp.actor_id(11),'bestie:'||pg_temp.actor_id(11)::text||':'||pg_temp.actor_id(12)::text,'best_friends_necklace','Legacy pair','postcard');
set local role authenticated;
select pg_temp.become(12);
select pg_temp.expect_error($q$select public.qualify_my_resident_referral_v1(pg_temp.key(42))$q$,'P0001','bestie-pair-already-recognized');
reset role;

-- These ordering probes do not prove simultaneous provider sessions. Still
-- required: two-client acceptance/qualification races, issuance lock contention,
-- and daily-limit contention at the real provider.
rollback;
