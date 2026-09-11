-- A private saved Card receives a stable server-issued resident number.
-- Existing numbers and public-profile choices are never replaced.
begin;

create or replace function public.assign_saved_resident_number_v1()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.deleted_at is not null then return new; end if;
  insert into public.member_profiles (id, member_card_is_public, member_card_status)
    values (new.owner_id, false, 'private') on conflict (id) do nothing;
  -- The row lock and null predicate prevent simultaneous saves minting twice.
  update public.member_profiles
    set resident_number = nextval('public.resident_number_seq')
    where id = new.owner_id and resident_number is null;
  return new;
end;
$$;
revoke all on function public.assign_saved_resident_number_v1() from public, anon, authenticated;
create trigger assign_saved_resident_number_v1
  after insert or update on public.resident_cards
  for each row execute function public.assign_saved_resident_number_v1();

-- Include existing saved Cards without changing their contents or visibility.
insert into public.member_profiles (id, member_card_is_public, member_card_status)
  select owner_id, false, 'private' from public.resident_cards where deleted_at is null
  on conflict (id) do nothing;
update public.member_profiles p
  set resident_number = nextval('public.resident_number_seq')
  where p.resident_number is null and exists (
    select 1 from public.resident_cards c where c.owner_id = p.id and c.deleted_at is null
  );

-- Preserve the deployed owner-state function, including its security settings.
do $$
declare
  definition text := pg_get_functiondef('public.get_my_resident_state_v1()'::regprocedure);
  marker text := '''display_name'', display_name,';
begin
  if position('''resident_number''' in definition) > 0 then
    raise exception 'resident-number-already-present: inspect deployed definition';
  end if;
  if (length(definition) - length(replace(definition, marker, ''))) / length(marker) <> 1 then
    raise exception 'unexpected-owner-state-definition';
  end if;
  execute replace(definition, marker, '''resident_number'', resident_number, ' || marker);
end;
$$;
commit;
