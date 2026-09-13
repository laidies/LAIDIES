-- Reuse existing authenticated Card mutation, locks, quota and unique profile.
begin;
create or replace function public.claim_resident_card_with_handle_v1(
  p_document jsonb, p_idempotency_key uuid, p_expected_revision uuid,
  p_card_username text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_owner uuid := auth.uid();
  v_handle text := lower(btrim(p_card_username));
  v_request jsonb;
  v_receipt public.resident_identity_mutations%rowtype;
  v_response jsonb;
begin
  if v_owner is null then
    raise exception using errcode='42501', message='authentication-required';
  end if;
  if v_handle is null or v_handle !~ '^[a-z0-9_]{3,24}$' then
    raise exception using errcode='22023', message='invalid-card-username';
  end if;
  if p_idempotency_key is null then
    raise exception using errcode='22023', message='idempotency-key-required';
  end if;
  if not pg_catalog.pg_try_advisory_xact_lock(pg_catalog.hashtextextended(v_owner::text,0)) then
    raise exception using errcode='55P03', message='identity-mutation-busy';
  end if;
  v_request := jsonb_build_object('document',p_document,
    'expected_revision',p_expected_revision,'card_username',v_handle);
  select * into v_receipt from public.resident_identity_mutations
    where owner_id=v_owner and idempotency_key=p_idempotency_key;
  if found then
    if v_receipt.operation <> 'claim-resident-card-v1' or v_receipt.request <> v_request then
      raise exception using errcode='23505', message='idempotency-conflict';
    end if;
    return v_receipt.response;
  end if;
  v_response := public.claim_resident_card_v1(p_document,p_idempotency_key,p_expected_revision);
  begin
    update public.member_profiles set card_username=v_handle where id=v_owner;
    if not found then raise exception 'resident-profile-missing'; end if;
  exception when unique_violation then
    raise exception using errcode='23505', message='card-username-not-available';
  end;
  v_response := v_response || jsonb_build_object('card_username',v_handle);
  update public.resident_identity_mutations set request=v_request,response=v_response
    where owner_id=v_owner and idempotency_key=p_idempotency_key;
  return v_response;
end;
$$;
revoke all on function public.claim_resident_card_with_handle_v1(jsonb,uuid,uuid,text) from public,anon;
grant execute on function public.claim_resident_card_with_handle_v1(jsonb,uuid,uuid,text) to authenticated;
commit;
