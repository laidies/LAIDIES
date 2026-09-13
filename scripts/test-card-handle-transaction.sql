-- Run in SQL editor against live schema. Every test write rolls back.
begin;
do $$
declare
  owner uuid := '3b899784-7e33-4a0e-8439-be6ed1a65ef0';
  other_owner uuid;
  doc jsonb; rev uuid; response jsonb; replay jsonb;
  key uuid := gen_random_uuid(); badkey uuid := gen_random_uuid();
  handle text := 'test_' || substr(replace(gen_random_uuid()::text,'-',''),1,18);
  original jsonb; after_state jsonb; original_profile jsonb;
begin
  if has_function_privilege('anon','public.claim_resident_card_with_handle_v1(jsonb,uuid,uuid,text)','execute') then raise exception 'anon-execute'; end if;
  perform set_config('request.jwt.claim.sub','',true);
  begin
    perform public.claim_resident_card_with_handle_v1('{}',key,null,handle);
    raise exception 'unauthenticated-admitted';
  exception when insufficient_privilege then null; end;
  perform set_config('request.jwt.claim.sub',owner::text,true);
  select document,revision into strict doc,rev from public.resident_cards where owner_id=owner;
  select to_jsonb(p) into original_profile from public.member_profiles p where id=owner;
  begin
    perform public.claim_resident_card_with_handle_v1(doc,badkey,rev,'bad-handle');
    raise exception 'invalid-admitted';
  exception when invalid_parameter_value then null; end;
  response := public.claim_resident_card_with_handle_v1(doc,key,rev,handle);
  replay := public.claim_resident_card_with_handle_v1(doc,key,rev,handle);
  if response<>replay then raise exception 'retry-differs'; end if;
  if (select card_username from public.member_profiles where id=owner)<>handle then raise exception 'handle-not-saved'; end if;
  -- Existing trigger stamps card_created_at on first handle/name; only allow
  -- that initialization, not replacement of an existing timestamp.
  if original_profile->>'card_created_at' is not null and (select to_jsonb(p)->>'card_created_at' from public.member_profiles p where id=owner) is distinct from original_profile->>'card_created_at' then raise exception 'creation-time-replaced'; end if;
  if (select to_jsonb(p)-'card_username'-'updated_at'-'card_updated_at'-'card_created_at' from public.member_profiles p where id=owner)<>(original_profile-'card_username'-'updated_at'-'card_updated_at'-'card_created_at') then raise exception 'unrelated-profile-changed'; end if;
  begin
    perform public.claim_resident_card_with_handle_v1(doc,key,rev,'different_handle');
    raise exception 'conflicting-key-admitted';
  exception when unique_violation then
    if sqlerrm<>'idempotency-conflict' then raise; end if;
  end;
  select id into strict other_owner from public.member_profiles where id<>owner limit 1;
  update public.member_profiles set card_username=handle||'x' where id=other_owner;
  select to_jsonb(c) into original from public.resident_cards c where owner_id=owner;
  begin
    perform public.claim_resident_card_with_handle_v1(doc,badkey,(response->>'revision')::uuid,handle||'x');
    raise exception 'taken-handle-admitted';
  exception when unique_violation then
    if sqlerrm<>'card-username-not-available' then raise; end if;
  end;
  select to_jsonb(c) into after_state from public.resident_cards c where owner_id=owner;
  if original<>after_state or exists(select 1 from public.resident_identity_mutations where owner_id=owner and idempotency_key=badkey) then raise exception 'partial-save-on-collision'; end if;
end;
$$;
rollback;
select 'PASS auth, validation, success, exact retry, key conflict, unique collision rollback, profile preservation; all test writes rolled back' as result;
