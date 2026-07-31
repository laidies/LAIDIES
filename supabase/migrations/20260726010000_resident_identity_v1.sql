-- Private Resident Card identity foundation.
-- This migration intentionally does not make device-local Card presence an
-- authentication signal and does not alter or delete browser-local state.

create table if not exists public.resident_cards (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  schema_version integer not null default 1 check (schema_version = 1),
  document jsonb not null,
  revision uuid not null default gen_random_uuid(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.resident_identity_mutations (
  owner_id uuid not null references auth.users(id) on delete cascade,
  idempotency_key uuid not null,
  operation text not null check (operation in (
    'claim-resident-card-v1',
    'revoke-resident-card-v1',
    'update-resident-profile-v1'
  )),
  request jsonb not null,
  response jsonb not null,
  created_at timestamptz not null default now(),
  primary key (owner_id, idempotency_key)
);

alter table public.resident_cards enable row level security;
alter table public.resident_identity_mutations enable row level security;

drop policy if exists "resident_cards_owner_select" on public.resident_cards;
create policy "resident_cards_owner_select"
  on public.resident_cards
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "resident_identity_mutations_owner_select"
  on public.resident_identity_mutations;
create policy "resident_identity_mutations_owner_select"
  on public.resident_identity_mutations
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

revoke all on table public.resident_cards from anon, authenticated;
revoke all on table public.resident_identity_mutations from anon, authenticated;

create or replace function public.resident_card_v1_is_valid(p_document jsonb)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_key text;
  v_value text;
  v_limit integer;
  v_nonempty boolean := false;
begin
  if p_document is null
     or jsonb_typeof(p_document) <> 'object'
     or (select count(*) from jsonb_object_keys(p_document)) <> 2
     or not (p_document ? 'version')
     or not (p_document ? 'fields')
     or p_document->'version' <> '1'::jsonb
     or jsonb_typeof(p_document->'fields') <> 'object'
     or (select count(*) from jsonb_object_keys(p_document->'fields')) = 0 then
    return false;
  end if;

  for v_key, v_value in
    select key, value
    from jsonb_each_text(p_document->'fields')
  loop
    v_limit := case v_key
      when 'activity' then 160
      when 'archetype' then 80
      when 'avatarSlug' then 64
      when 'cardAvatarUrl' then 240
      when 'cardBg' then 24
      when 'carry' then 160
      when 'character' then 160
      when 'cocktail' then 160
      when 'displayName' then 80
      when 'episode' then 160
      when 'motto' then 280
      when 'movie' then 160
      when 'quote' then 280
      when 'saint' then 160
      when 'song' then 160
      when 'storefront' then 160
      when 'tvshow' then 160
      else null
    end;

    if v_limit is null
       or char_length(v_value) > v_limit
       or v_value ~ '[<>[:cntrl:]]' then
      return false;
    end if;
    if btrim(v_value) <> '' then
      v_nonempty := true;
    end if;
    if v_key = 'cardBg'
       and v_value <> ''
       and v_value not in ('classic', 'pinklilac', 'peach', 'mint',
                           'lavender', 'holo') then
      return false;
    end if;
    if v_key = 'avatarSlug'
       and v_value <> ''
       and v_value !~ '^[a-z0-9][a-z0-9-]{0,63}$' then
      return false;
    end if;
    if v_key = 'cardAvatarUrl'
       and v_value <> ''
       and (
         v_value !~ '^/assets/[A-Za-z0-9][A-Za-z0-9._/-]*[.](png|jpg|jpeg|webp|gif|avif)$'
         or v_value like '%\%%'
         or v_value like '%\\%'
         or v_value like '%?%'
         or v_value like '%#%'
         or v_value like '%//%'
         or v_value like '%/./%'
         or v_value like '%/../%'
       ) then
      return false;
    end if;
  end loop;

  return v_nonempty;
exception
  when others then
    return false;
end;
$$;

create or replace function public.get_my_resident_state_v1()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_card public.resident_cards%rowtype;
  v_profile jsonb;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;

  select *
    into v_card
    from public.resident_cards
   where owner_id = v_owner;

  select jsonb_build_object(
           'display_name', display_name,
           'card_username', card_username,
           'member_card_is_public', member_card_is_public,
           'member_card_status', member_card_status
         )
    into v_profile
    from public.member_profiles
   where id = v_owner;

  return jsonb_build_object(
    'state', case
      when v_card.owner_id is null or v_card.deleted_at is not null
        then 'account-without-card'
      else 'account-backed-resident'
    end,
    'profile', coalesce(v_profile, 'null'::jsonb),
    'card', case
      when v_card.owner_id is null or v_card.deleted_at is not null
        then 'null'::jsonb
      else jsonb_build_object(
        'schema_version', v_card.schema_version,
        'document', v_card.document,
        'revision', v_card.revision,
        'updated_at', v_card.updated_at
      )
    end
  );
end;
$$;

create or replace function public.claim_resident_card_v1(
  p_document jsonb,
  p_idempotency_key uuid,
  p_expected_revision uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_request jsonb;
  v_receipt public.resident_identity_mutations%rowtype;
  v_current public.resident_cards%rowtype;
  v_revision uuid := gen_random_uuid();
  v_response jsonb;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;
  if p_idempotency_key is null then
    raise exception using errcode = '22023', message = 'idempotency-key-required';
  end if;
  if not public.resident_card_v1_is_valid(p_document) then
    raise exception using errcode = '22023', message = 'invalid-resident-card-v1';
  end if;

  v_request := jsonb_build_object(
    'document', p_document,
    'expected_revision', p_expected_revision
  );

  select *
    into v_receipt
    from public.resident_identity_mutations
   where owner_id = v_owner
     and idempotency_key = p_idempotency_key;

  if v_receipt.owner_id is not null then
    if v_receipt.operation <> 'claim-resident-card-v1'
       or v_receipt.request <> v_request then
      raise exception using errcode = '23505', message = 'idempotency-conflict';
    end if;
    return v_receipt.response;
  end if;

  select *
    into v_current
    from public.resident_cards
   where owner_id = v_owner
   for update;

  if v_current.owner_id is null then
    if p_expected_revision is not null then
      raise exception using errcode = '40001', message = 'revision-conflict';
    end if;
    insert into public.resident_cards (
      owner_id, schema_version, document, revision, updated_at, deleted_at
    ) values (
      v_owner, 1, p_document, v_revision, now(), null
    );
  else
    if p_expected_revision is null
       or p_expected_revision <> v_current.revision then
      raise exception using errcode = '40001', message = 'revision-conflict';
    end if;
    update public.resident_cards
       set document = p_document,
           schema_version = 1,
           revision = v_revision,
           updated_at = now(),
           deleted_at = null
     where owner_id = v_owner;
  end if;

  v_response := jsonb_build_object(
    'state', 'account-backed-resident',
    'revision', v_revision,
    'document', p_document
  );

  insert into public.resident_identity_mutations (
    owner_id, idempotency_key, operation, request, response
  ) values (
    v_owner, p_idempotency_key, 'claim-resident-card-v1', v_request, v_response
  );

  return v_response;
end;
$$;

create or replace function public.revoke_my_resident_card_v1(
  p_idempotency_key uuid,
  p_expected_revision uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_request jsonb;
  v_receipt public.resident_identity_mutations%rowtype;
  v_current public.resident_cards%rowtype;
  v_revision uuid := gen_random_uuid();
  v_response jsonb;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;
  if p_idempotency_key is null or p_expected_revision is null then
    raise exception using errcode = '22023', message = 'mutation-keys-required';
  end if;

  v_request := jsonb_build_object('expected_revision', p_expected_revision);
  select *
    into v_receipt
    from public.resident_identity_mutations
   where owner_id = v_owner
     and idempotency_key = p_idempotency_key;

  if v_receipt.owner_id is not null then
    if v_receipt.operation <> 'revoke-resident-card-v1'
       or v_receipt.request <> v_request then
      raise exception using errcode = '23505', message = 'idempotency-conflict';
    end if;
    return v_receipt.response;
  end if;

  select *
    into v_current
    from public.resident_cards
   where owner_id = v_owner
   for update;

  if v_current.owner_id is null
     or v_current.deleted_at is not null
     or v_current.revision <> p_expected_revision then
    raise exception using errcode = '40001', message = 'revision-conflict';
  end if;

  update public.resident_cards
     set revision = v_revision,
         updated_at = now(),
         deleted_at = now()
   where owner_id = v_owner;

  v_response := jsonb_build_object(
    'state', 'account-without-card',
    'revision', v_revision
  );
  insert into public.resident_identity_mutations (
    owner_id, idempotency_key, operation, request, response
  ) values (
    v_owner, p_idempotency_key, 'revoke-resident-card-v1', v_request, v_response
  );
  return v_response;
end;
$$;

create or replace function public.update_my_resident_profile_v1(
  p_display_name text,
  p_card_username text,
  p_member_card_is_public boolean,
  p_idempotency_key uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_display_name text := nullif(btrim(p_display_name), '');
  v_card_username text := nullif(lower(btrim(p_card_username)), '');
  v_public boolean := coalesce(p_member_card_is_public, false);
  v_request jsonb;
  v_receipt public.resident_identity_mutations%rowtype;
  v_response jsonb;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;
  if p_idempotency_key is null then
    raise exception using errcode = '22023', message = 'idempotency-key-required';
  end if;
  if v_display_name is not null
     and (
       char_length(v_display_name) > 30
       or v_display_name ~ '[<>[:cntrl:]]'
     ) then
    raise exception using errcode = '22023', message = 'invalid-display-name';
  end if;
  if v_card_username is not null
     and v_card_username !~ '^[a-z0-9_]{3,24}$' then
    raise exception using errcode = '22023', message = 'invalid-card-username';
  end if;

  v_request := jsonb_build_object(
    'display_name', v_display_name,
    'card_username', v_card_username,
    'member_card_is_public', v_public
  );

  select *
    into v_receipt
    from public.resident_identity_mutations
   where owner_id = v_owner
     and idempotency_key = p_idempotency_key;

  if v_receipt.owner_id is not null then
    if v_receipt.operation <> 'update-resident-profile-v1'
       or v_receipt.request <> v_request then
      raise exception using errcode = '23505', message = 'idempotency-conflict';
    end if;
    return v_receipt.response;
  end if;

  insert into public.member_profiles (
    id, display_name, card_username, member_card_is_public,
    member_card_status
  ) values (
    v_owner, v_display_name, v_card_username, v_public,
    case when v_public then 'submitted' else 'private' end
  )
  on conflict (id) do update
    set display_name = excluded.display_name,
        card_username = excluded.card_username,
        member_card_is_public = excluded.member_card_is_public,
        member_card_status = case
          when excluded.member_card_is_public then 'submitted'
          else 'private'
        end;

  v_response := jsonb_build_object(
    'display_name', v_display_name,
    'card_username', v_card_username,
    'member_card_is_public', v_public,
    'member_card_status', case
      when v_public then 'submitted'
      else 'private'
    end
  );

  insert into public.resident_identity_mutations (
    owner_id, idempotency_key, operation, request, response
  ) values (
    v_owner, p_idempotency_key, 'update-resident-profile-v1',
    v_request, v_response
  );
  return v_response;
end;
$$;

revoke execute on function public.resident_card_v1_is_valid(jsonb)
  from public, anon, authenticated;
revoke execute on function public.get_my_resident_state_v1()
  from public, anon;
revoke execute on function public.claim_resident_card_v1(jsonb, uuid, uuid)
  from public, anon;
revoke execute on function public.revoke_my_resident_card_v1(uuid, uuid)
  from public, anon;
revoke execute on function public.update_my_resident_profile_v1(
  text, text, boolean, uuid
) from public, anon;

grant execute on function public.get_my_resident_state_v1()
  to authenticated;
grant execute on function public.claim_resident_card_v1(jsonb, uuid, uuid)
  to authenticated;
grant execute on function public.revoke_my_resident_card_v1(uuid, uuid)
  to authenticated;
grant execute on function public.update_my_resident_profile_v1(
  text, text, boolean, uuid
) to authenticated;
