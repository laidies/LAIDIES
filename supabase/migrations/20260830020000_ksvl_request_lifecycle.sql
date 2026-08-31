-- Private, account-bound KSVL request lifecycle v1.
-- APPLIED 2026-08-30; real provider/browser acceptance passed.
-- Exact originally applied file SHA256 (before this comment-only status update):
-- b415ef82cb9d72f4fbfb9c18fe7e89f6ce4c648ac147f479cc2d31833699acfc
-- Release/cleanup evidence: operations/ACTIVE-WORK.md (8ce8632d).
-- Preserve existing retention: no automatic expiry, purge function or scheduler.
-- Existing request rows are deliberately not rewritten or deleted. New requests
-- use only the RPCs below; direct PostgREST table access is removed.

alter table public.ksvl_song_requests
  add column if not exists idempotency_key uuid;

create unique index if not exists ksvl_song_requests_owner_idempotency_key_v1
  on public.ksvl_song_requests (user_id, idempotency_key)
  where idempotency_key is not null;

-- This receipt ledger intentionally contains no request text. It survives a
-- requester deletion so the 24-hour limit and a same-key retry stay truthful.
create table if not exists public.ksvl_song_request_receipts_v1 (
  owner_id uuid not null references auth.users(id) on delete cascade,
  idempotency_key uuid not null,
  request_id uuid not null,
  request_fingerprint text not null check (request_fingerprint ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  primary key (owner_id, idempotency_key)
);

create index if not exists ksvl_song_request_receipts_v1_rate_limit
  on public.ksvl_song_request_receipts_v1 (owner_id, created_at desc);

alter table public.ksvl_song_request_receipts_v1 enable row level security;

alter table public.ksvl_song_request_receipts_v1
  add column if not exists deleted_at timestamptz;

revoke all on table public.ksvl_song_requests from public, anon, authenticated;
revoke all on table public.ksvl_song_request_receipts_v1 from public, anon, authenticated;
-- Table-level REVOKE does not remove separately granted column privileges.
do $$ declare v_column record; begin
  for v_column in select table_name,column_name from information_schema.columns
    where table_schema='public' and table_name in ('ksvl_song_requests','ksvl_song_request_receipts_v1')
  loop
    execute format('revoke all (%I) on table public.%I from public, anon, authenticated',v_column.column_name,v_column.table_name);
  end loop;
end; $$;

drop policy if exists "KSVL request own insert" on public.ksvl_song_requests;
drop policy if exists "KSVL request own read" on public.ksvl_song_requests;

create or replace function public.submit_my_ksvl_song_request_v1(
  p_song_style text,
  p_topic text,
  p_lyric_ideas text,
  p_idempotency_key uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_style text := btrim(p_song_style);
  v_topic text := btrim(p_topic);
  v_lyrics text := nullif(btrim(p_lyric_ideas), '');
  v_fingerprint text;
  v_receipt public.ksvl_song_request_receipts_v1%rowtype;
  v_request_id uuid;
  v_submitted_at timestamptz;
  v_status text;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;
  if p_song_style is null or p_topic is null then
    raise exception using errcode = '22023', message = 'song-style-and-topic-required';
  end if;
  if p_idempotency_key is null then
    raise exception using errcode = '22023', message = 'idempotency-key-required';
  end if;
  if v_style not in (
    'y2k-pop-anthem', 'y2k-teen-drama-ballad', 'y2k-rnb-slow-jam',
    'late-90s-alt-rock', 'y2k-country-pop', 'coffeehouse-acoustic',
    'y2k-retro-house', 'saint-anthem', 'deb-comedy-song'
  ) then
    raise exception using errcode = '22023', message = 'invalid-song-style';
  end if;
  if char_length(v_topic) < 3 or char_length(v_topic) > 200
     or v_topic ~ '[[:cntrl:]]' then
    raise exception using errcode = '22023', message = 'invalid-topic';
  end if;
  if v_lyrics is not null and (char_length(v_lyrics) > 1000 or translate(v_lyrics, E'\n\r\t', '') ~ '[[:cntrl:]]') then
    raise exception using errcode = '22023', message = 'invalid-lyric-ideas';
  end if;

  if not pg_catalog.pg_try_advisory_xact_lock(
    pg_catalog.hashtextextended('ksvl-request:' || v_owner::text, 0)
  ) then
    raise exception using errcode = '55P03', message = 'request-submission-busy';
  end if;

  v_fingerprint := encode(pg_catalog.sha256(convert_to(
    jsonb_build_array(v_style, v_topic, v_lyrics)::text, 'UTF8'
  )), 'hex');
  select * into v_receipt
    from public.ksvl_song_request_receipts_v1
   where owner_id = v_owner and idempotency_key = p_idempotency_key;
  if v_receipt.owner_id is not null then
    if v_receipt.request_fingerprint <> v_fingerprint then
      raise exception using errcode = '23505', message = 'idempotency-conflict';
    end if;
    select submitted_at, status into v_submitted_at, v_status
      from public.ksvl_song_requests
     where id = v_receipt.request_id and user_id = v_owner;
    if not found then
      return jsonb_build_object(
        'state', 'deleted',
        'receipt_id', v_receipt.request_id, 'replayed', true
      );
    end if;
    return jsonb_build_object(
      'state', 'received', 'receipt_id', v_receipt.request_id,
      'status', v_status, 'submitted_at', v_submitted_at,
      'replayed', true
    );
  end if;

  if (select count(*) from public.ksvl_song_request_receipts_v1
      where owner_id = v_owner and created_at >= now() - interval '24 hours') >= 5 then
    raise exception using errcode = 'PT429', message = 'request-rate-limit';
  end if;

  insert into public.ksvl_song_requests (
    user_id, song_style, topic, lyric_ideas, status, idempotency_key
  ) values (
    v_owner, v_style, v_topic, v_lyrics, 'submitted', p_idempotency_key
  ) returning id, submitted_at into v_request_id, v_submitted_at;

  insert into public.ksvl_song_request_receipts_v1 (
    owner_id, idempotency_key, request_id, request_fingerprint
  ) values (v_owner, p_idempotency_key, v_request_id, v_fingerprint);

  return jsonb_build_object(
    'state', 'received', 'receipt_id', v_request_id, 'status', 'submitted',
    'submitted_at', v_submitted_at, 'replayed', false
  );
end;
$$;

create or replace function public.list_my_ksvl_song_requests_v1()
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'receipt_id', r.id, 'status', r.status, 'submitted_at', r.submitted_at,
    'status_updated_at', r.status_updated_at
  ) order by r.submitted_at desc), '[]'::jsonb)
  from public.ksvl_song_requests r
  where r.user_id = auth.uid();
$$;

create or replace function public.delete_my_ksvl_song_request_v1(p_receipt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_deleted uuid;
  v_receipt public.ksvl_song_request_receipts_v1%rowtype;
begin
  if v_owner is null then
    raise exception using errcode = '42501', message = 'authentication-required';
  end if;
  delete from public.ksvl_song_requests
   where id = p_receipt_id and user_id = v_owner
   returning id into v_deleted;
  if v_deleted is not null then
    update public.ksvl_song_request_receipts_v1
       set deleted_at = coalesce(deleted_at, now())
     where owner_id = v_owner and request_id = v_deleted;
    return jsonb_build_object('state', 'deleted', 'receipt_id', v_deleted);
  end if;
  select * into v_receipt
    from public.ksvl_song_request_receipts_v1
   where owner_id = v_owner and request_id = p_receipt_id;
  if v_receipt.owner_id is null then
    raise exception using errcode = 'P0002', message = 'request-not-found';
  end if;
  if v_receipt.deleted_at is not null then
    return jsonb_build_object('state', 'deleted', 'receipt_id', p_receipt_id, 'replayed', true);
  end if;
  return jsonb_build_object('state', 'deleted', 'receipt_id', p_receipt_id, 'replayed', true);
end;
$$;

revoke all on function public.submit_my_ksvl_song_request_v1(text, text, text, uuid) from public, anon;
revoke all on function public.list_my_ksvl_song_requests_v1() from public, anon;
revoke all on function public.delete_my_ksvl_song_request_v1(uuid) from public, anon;
grant execute on function public.submit_my_ksvl_song_request_v1(text, text, text, uuid) to authenticated;
grant execute on function public.list_my_ksvl_song_requests_v1() to authenticated;
grant execute on function public.delete_my_ksvl_song_request_v1(uuid) to authenticated;
