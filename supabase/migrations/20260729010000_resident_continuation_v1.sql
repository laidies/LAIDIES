-- Private, cross-device continuation for signed-in SUNNYVAiLE residents.
-- The document stores only bounded progress/collection state. It deliberately
-- excludes prompts, messages, draft text and other free-form private content.

create table if not exists public.resident_continuations (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  schema_version integer not null default 1 check (schema_version = 1),
  document jsonb not null,
  revision uuid not null default gen_random_uuid(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resident_continuation_mutations (
  owner_id uuid not null references auth.users(id) on delete cascade,
  idempotency_key uuid not null,
  request jsonb not null,
  response jsonb not null,
  created_at timestamptz not null default now(),
  primary key (owner_id, idempotency_key)
);

alter table public.resident_continuations enable row level security;
alter table public.resident_continuation_mutations enable row level security;

drop policy if exists "resident_continuations_owner_select"
  on public.resident_continuations;
create policy "resident_continuations_owner_select"
  on public.resident_continuations
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "resident_continuation_mutations_owner_select"
  on public.resident_continuation_mutations;
create policy "resident_continuation_mutations_owner_select"
  on public.resident_continuation_mutations
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

revoke all on table public.resident_continuations from anon, authenticated;
revoke all on table public.resident_continuation_mutations from anon, authenticated;

create or replace function public.resident_continuation_v1_is_valid(
  p_document jsonb
)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_path text;
  v_label text;
begin
  if p_document is null
     or jsonb_typeof(p_document) <> 'object'
     or (select count(*) from jsonb_object_keys(p_document)) <> 5
     or p_document->'version' <> '1'::jsonb
     or jsonb_typeof(p_document->'last') not in ('object', 'null')
     or jsonb_typeof(p_document->'episodes') <> 'object'
     or jsonb_typeof(p_document->'activities') <> 'object'
     or jsonb_typeof(p_document->'collections') <> 'object'
     or pg_catalog.pg_column_size(p_document) > 65536 then
    return false;
  end if;

  if p_document->'last' <> 'null'::jsonb then
    if (select count(*) from jsonb_object_keys(p_document->'last')) <> 4
       or not (p_document->'last' ?& array[
         'path', 'label', 'kind', 'updated_at'
       ]) then
      return false;
    end if;
    v_path := p_document->'last'->>'path';
    v_label := p_document->'last'->>'label';
    if char_length(v_path) > 301
       or v_path !~ '^/[A-Za-z0-9._~!$&''()*+,;=:@%/?#-]*$'
       or v_path like '//%'
       or v_path like '%\%'
       or v_path like '%/../%'
       or v_path like '%/./%'
       or char_length(v_label) > 120
       or v_label ~ '[<>[:cntrl:]]'
       or (p_document->'last'->>'kind') not in (
         'page', 'episode', 'activity', 'tour', 'closet'
       )
       or (p_document->'last'->>'updated_at') !~
         '^[0-9]{4}-[0-9]{2}-[0-9]{2}T' then
      return false;
    end if;
  end if;

  if (select count(*) from jsonb_object_keys(p_document->'episodes')) > 50
     or (select count(*) from jsonb_object_keys(p_document->'activities')) > 150
     or (select count(*) from jsonb_object_keys(p_document->'collections')) > 40 then
    return false;
  end if;

  return true;
exception
  when others then
    return false;
end;
$$;

create or replace function public.get_my_resident_continuation_v1()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_row public.resident_continuations%rowtype;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;

  select *
    into v_row
    from public.resident_continuations
   where owner_id = v_owner;

  if v_row.owner_id is null then
    return jsonb_build_object('state', 'empty', 'continuation', 'null'::jsonb);
  end if;

  return jsonb_build_object(
    'state', 'saved',
    'continuation', jsonb_build_object(
      'schema_version', v_row.schema_version,
      'document', v_row.document,
      'revision', v_row.revision,
      'updated_at', v_row.updated_at
    )
  );
end;
$$;

create or replace function public.put_my_resident_continuation_v1(
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
  v_receipt public.resident_continuation_mutations%rowtype;
  v_current public.resident_continuations%rowtype;
  v_revision uuid := gen_random_uuid();
  v_response jsonb;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;
  if p_idempotency_key is null then
    raise exception using errcode = '22023', message = 'idempotency-key-required';
  end if;
  if not public.resident_continuation_v1_is_valid(p_document) then
    raise exception using errcode = '22023', message = 'invalid-resident-continuation-v1';
  end if;

  if not pg_catalog.pg_try_advisory_xact_lock(
    pg_catalog.hashtextextended('continuation:' || v_owner::text, 0)
  ) then
    raise exception using
      errcode = '55P03',
      message = 'continuation-mutation-busy';
  end if;

  v_request := jsonb_build_object(
    'document', p_document,
    'expected_revision', p_expected_revision
  );

  select *
    into v_receipt
    from public.resident_continuation_mutations
   where owner_id = v_owner
     and idempotency_key = p_idempotency_key;

  if v_receipt.owner_id is not null then
    if v_receipt.request <> v_request then
      raise exception using errcode = '23505', message = 'idempotency-conflict';
    end if;
    return v_receipt.response;
  end if;

  select *
    into v_current
    from public.resident_continuations
   where owner_id = v_owner
   for update;

  if v_current.owner_id is null then
    if p_expected_revision is not null then
      raise exception using errcode = 'PT409', message = 'revision-conflict';
    end if;
    insert into public.resident_continuations (
      owner_id, schema_version, document, revision, updated_at
    ) values (
      v_owner, 1, p_document, v_revision, now()
    );
  else
    if p_expected_revision is null
       or p_expected_revision <> v_current.revision then
      raise exception using errcode = 'PT409', message = 'revision-conflict';
    end if;
    update public.resident_continuations
       set document = p_document,
           schema_version = 1,
           revision = v_revision,
           updated_at = now()
     where owner_id = v_owner;
  end if;

  v_response := jsonb_build_object(
    'state', 'saved',
    'revision', v_revision,
    'document', p_document
  );
  insert into public.resident_continuation_mutations (
    owner_id, idempotency_key, request, response
  ) values (
    v_owner, p_idempotency_key, v_request, v_response
  );
  return v_response;
end;
$$;

revoke execute on function public.resident_continuation_v1_is_valid(jsonb)
  from public, anon, authenticated;
revoke execute on function public.get_my_resident_continuation_v1()
  from public, anon;
revoke execute on function public.put_my_resident_continuation_v1(
  jsonb, uuid, uuid
) from public, anon;

grant execute on function public.get_my_resident_continuation_v1()
  to authenticated;
grant execute on function public.put_my_resident_continuation_v1(
  jsonb, uuid, uuid
) to authenticated;
