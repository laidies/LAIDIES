begin;
do $$
declare v_owner uuid; v_before text; v_after text;
begin
  select id into strict v_owner from auth.users
    where id='3b899784-7e33-4a0e-8439-be6ed1a65ef0'
      and lower(email)='wednesday.laidies@gmail.com' and email_confirmed_at is not null;
  lock table public.member_profiles in share row exclusive mode;
  if exists(select 1 from public.member_profiles where resident_number=1 and id<>v_owner) then
    raise exception 'resident-0001-already-owned';
  end if;
  if not exists(select 1 from public.member_profiles where id=v_owner and resident_number in (1047,1)) then
    raise exception 'unexpected-founder-number';
  end if;
  select md5(coalesce(jsonb_agg(to_jsonb(c) order by owner_id)::text,'')) into v_before from public.resident_cards c;
  update public.member_profiles set resident_number=1 where id=v_owner and resident_number=1047;
  select md5(coalesce(jsonb_agg(to_jsonb(c) order by owner_id)::text,'')) into v_after from public.resident_cards c;
  if v_before<>v_after then raise exception 'card-content-changed'; end if;
end;
$$;
commit;
