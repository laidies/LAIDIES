-- Private founder decision records for bounded operating handoffs only.
-- This creates no approver: Ali's authenticated subject is provisioned separately.

begin;

create table public.operating_approvers_v1 (
  user_id uuid primary key references auth.users(id) on delete restrict,
  enabled boolean not null default true,
  created_at timestamptz not null default clock_timestamp()
);

create table public.operating_decision_requests_v1 (
  id uuid primary key default gen_random_uuid(),
  work_id text not null unique check (work_id ~ '^[A-Za-z0-9][A-Za-z0-9_-]{2,79}$'),
  artifact_sha256 text not null check (artifact_sha256 ~ '^[a-f0-9]{64}$'),
  review jsonb not null,
  review_sha256 text not null check (review_sha256 ~ '^[a-f0-9]{64}$'),
  capability_hash text not null unique check (capability_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default clock_timestamp(),
  expires_at timestamptz not null
);

create table public.operating_decisions_v1 (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique references public.operating_decision_requests_v1(id) on delete restrict,
  actor_id uuid not null references auth.users(id) on delete restrict,
  action text not null check (action in ('ACKNOWLEDGE', 'HOLD')),
  idempotency_key uuid not null,
  review_sha256 text not null check (review_sha256 ~ '^[a-f0-9]{64}$'),
  artifact_sha256 text not null check (artifact_sha256 ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default clock_timestamp(),
  unique (actor_id, idempotency_key)
);

create table public.operating_resumptions_v1 (
  request_id uuid primary key references public.operating_decision_requests_v1(id) on delete restrict,
  decision_id uuid not null unique references public.operating_decisions_v1(id) on delete restrict,
  work_id text not null check (work_id ~ '^[A-Za-z0-9][A-Za-z0-9_-]{2,79}$'),
  outcome text not null check (outcome in ('ACKNOWLEDGED_FOR_REVIEW', 'HOLD')),
  created_at timestamptz not null default clock_timestamp()
);

create or replace function public.operating_immutable_v1()
returns trigger language plpgsql set search_path = '' as $$
begin
  raise exception using errcode = '42501', message = 'operating-records-are-immutable';
end;
$$;

create or replace function public.operating_validate_review_v1(p_review jsonb)
returns void language plpgsql immutable set search_path = '' as $$
declare v_key text;
begin
  if p_review is null or jsonb_typeof(p_review) is distinct from 'object'
     or octet_length(convert_to(p_review::text, 'UTF8')) > 16384
     or exists (select 1 from jsonb_object_keys(p_review) k where k not in
       ('title','summary','question','recommendation','consequences','allowedActions','authority_truth')) then
    raise exception using errcode = '22023', message = 'invalid-operating-review';
  end if;
  foreach v_key in array array['title','summary','question','recommendation'] loop
    if jsonb_typeof(p_review -> v_key) is distinct from 'string'
       or coalesce(length(btrim(p_review ->> v_key)), 0) = 0
       or length(p_review ->> v_key) > 4096 then
      raise exception using errcode = '22023', message = 'invalid-operating-review';
    end if;
  end loop;
  if jsonb_typeof(p_review -> 'consequences') is distinct from 'object'
     or (p_review -> 'consequences') <> jsonb_build_object(
       'ACKNOWLEDGE', p_review #>> '{consequences,ACKNOWLEDGE}',
       'HOLD', p_review #>> '{consequences,HOLD}')
     or coalesce(length(btrim(p_review #>> '{consequences,ACKNOWLEDGE}')), 0) = 0
     or coalesce(length(btrim(p_review #>> '{consequences,HOLD}')), 0) = 0
     or length(p_review #>> '{consequences,ACKNOWLEDGE}') > 4096
     or length(p_review #>> '{consequences,HOLD}') > 4096
     or (p_review -> 'allowedActions') is distinct from '["ACKNOWLEDGE", "HOLD"]'::jsonb
     or (p_review -> 'authority_truth') is distinct from '{"public":false,"deploy":false,"spend":false}'::jsonb then
    raise exception using errcode = '22023', message = 'invalid-operating-review';
  end if;
end;
$$;

create or replace function public.operating_request_before_insert_v1()
returns trigger language plpgsql set search_path = '' as $$
begin
  perform public.operating_validate_review_v1(new.review);
  if new.expires_at <= clock_timestamp() then raise exception using errcode = '22023', message = 'invalid-operating-expiry'; end if;
  new.review_sha256 := encode(pg_catalog.sha256(convert_to(
    jsonb_build_object('work_id', new.work_id, 'artifact_sha256', new.artifact_sha256,
      'review', new.review, 'expires_at', new.expires_at)::text, 'UTF8')), 'hex');
  return new;
end;
$$;

create trigger operating_request_before_insert_v1 before insert on public.operating_decision_requests_v1
for each row execute function public.operating_request_before_insert_v1();

create trigger operating_requests_immutable_v1 before update or delete on public.operating_decision_requests_v1
for each row execute function public.operating_immutable_v1();
create trigger operating_decisions_immutable_v1 before update or delete on public.operating_decisions_v1
for each row execute function public.operating_immutable_v1();
create trigger operating_resumptions_immutable_v1 before update or delete on public.operating_resumptions_v1
for each row execute function public.operating_immutable_v1();

alter table public.operating_approvers_v1 enable row level security;
alter table public.operating_decision_requests_v1 enable row level security;
alter table public.operating_decisions_v1 enable row level security;
alter table public.operating_resumptions_v1 enable row level security;
revoke all on table public.operating_approvers_v1, public.operating_decision_requests_v1,
  public.operating_decisions_v1, public.operating_resumptions_v1 from public, anon, authenticated;

create or replace function public.operating_founder_v1()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.operating_approvers_v1 a where a.user_id = auth.uid() and a.enabled)
$$;

create or replace function public.get_operating_inbox_v1(p_request_id uuid default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if not public.operating_founder_v1() then raise exception using errcode = '42501', message = 'founder-approval-required'; end if;
  return coalesce((select jsonb_agg(row_to_json(x)::jsonb order by x.created_at desc) from (
    select r.id as request_id, r.work_id, r.review, r.review_sha256, r.artifact_sha256, r.expires_at,
      d.id as decision_id, d.action, d.actor_id, d.created_at as decided_at,
      s.outcome, s.created_at as resumed_at, r.created_at
    from public.operating_decision_requests_v1 r
    left join public.operating_decisions_v1 d on d.request_id = r.id
    left join public.operating_resumptions_v1 s on s.request_id = r.id
    where p_request_id is null or r.id = p_request_id
    order by r.created_at desc limit 20
  ) x), '[]'::jsonb);
end;
$$;

create or replace function public.record_operating_decision_v1(p_request_id uuid, p_review_sha256 text,
  p_artifact_sha256 text, p_action text, p_idempotency_key uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r public.operating_decision_requests_v1%rowtype; d public.operating_decisions_v1%rowtype; v_actor uuid := auth.uid(); v_now timestamptz;
begin
  if not public.operating_founder_v1() then raise exception using errcode = '42501', message = 'founder-approval-required'; end if;
  if p_action is null or p_action not in ('ACKNOWLEDGE','HOLD') or p_idempotency_key is null then raise exception using errcode = '22023', message = 'invalid-operating-decision'; end if;
  select * into r from public.operating_decision_requests_v1 where id = p_request_id for update;
  if r.id is null or r.review_sha256 is distinct from p_review_sha256 or r.artifact_sha256 is distinct from p_artifact_sha256 then raise exception using errcode = '22023', message = 'operating-request-integrity-mismatch'; end if;
  select * into d from public.operating_decisions_v1 where request_id = r.id;
  if d.id is not null then
    if d.actor_id = v_actor and d.action = p_action and d.idempotency_key = p_idempotency_key and d.review_sha256 = p_review_sha256 and d.artifact_sha256 = p_artifact_sha256 then
      return jsonb_build_object('decision_id',d.id,'request_id',d.request_id,'action',d.action,'actor_id',d.actor_id,'decided_at',d.created_at,'review_sha256',d.review_sha256,'artifact_sha256',d.artifact_sha256);
    end if;
    raise exception using errcode = '23505', message = 'operating-decision-idempotency-conflict';
  end if;
  v_now := clock_timestamp();
  if r.expires_at <= v_now then raise exception using errcode = '22023', message = 'operating-request-expired'; end if;
  insert into public.operating_decisions_v1(request_id,actor_id,action,idempotency_key,review_sha256,artifact_sha256,created_at)
  values(r.id,v_actor,p_action,p_idempotency_key,p_review_sha256,p_artifact_sha256, v_now) returning * into d;
  return jsonb_build_object('decision_id',d.id,'request_id',d.request_id,'action',d.action,'actor_id',d.actor_id,'decided_at',d.created_at,'review_sha256',d.review_sha256,'artifact_sha256',d.artifact_sha256);
end;
$$;

create or replace function public.read_operating_decision_v1(p_request_id uuid, p_capability text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r public.operating_decision_requests_v1%rowtype; d public.operating_decisions_v1%rowtype; v_status text;
begin
  select * into r from public.operating_decision_requests_v1 where id = p_request_id
    and capability_hash = case when p_capability ~ '^[a-f0-9]{64}$' then encode(pg_catalog.sha256(convert_to(p_capability,'UTF8')),'hex') else null end;
  if r.id is null then raise exception using errcode = '42501', message = 'invalid-operating-capability'; end if;
  select * into d from public.operating_decisions_v1 where request_id = r.id;
  v_status := case when d.id is null and r.expires_at <= clock_timestamp() then 'EXPIRED' when d.id is null then 'PENDING'
    when not exists(select 1 from public.operating_approvers_v1 a where a.user_id=d.actor_id and a.enabled) then 'REVOKED' else d.action end;
  return jsonb_build_object('request_id',r.id,'work_id',r.work_id,'review_sha256',r.review_sha256,'artifact_sha256',r.artifact_sha256,'expires_at',r.expires_at,'status',v_status,
    'decision_id',case when v_status in ('ACKNOWLEDGE','HOLD') then d.id else null end,
    'actor_id',case when v_status in ('ACKNOWLEDGE','HOLD') then d.actor_id else null end,
    'decided_at',case when v_status in ('ACKNOWLEDGE','HOLD') then d.created_at else null end);
end;
$$;

create or replace function public.record_operating_resumption_v1(p_request_id uuid, p_capability text,
  p_decision_id uuid, p_work_id text, p_outcome text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r public.operating_decision_requests_v1%rowtype; d public.operating_decisions_v1%rowtype; s public.operating_resumptions_v1%rowtype;
begin
  select * into r from public.operating_decision_requests_v1 where id=p_request_id
    and capability_hash = case when p_capability ~ '^[a-f0-9]{64}$' then encode(pg_catalog.sha256(convert_to(p_capability,'UTF8')),'hex') else null end for update;
  if r.id is null then raise exception using errcode = '42501', message = 'invalid-operating-capability'; end if;
  select * into d from public.operating_decisions_v1 where id=p_decision_id and request_id=r.id;
  if d.id is null or not exists(select 1 from public.operating_approvers_v1 a where a.user_id=d.actor_id and a.enabled) then raise exception using errcode = '42501', message = 'invalid-operating-capability'; end if;
  if p_work_id is distinct from r.work_id or p_outcome is null
     or (d.action='ACKNOWLEDGE' and p_outcome is distinct from 'ACKNOWLEDGED_FOR_REVIEW')
     or (d.action='HOLD' and p_outcome is distinct from 'HOLD') then raise exception using errcode='22023', message='invalid-operating-resumption'; end if;
  select * into s from public.operating_resumptions_v1 where request_id=r.id;
  if s.request_id is not null then
    if s.decision_id=p_decision_id and s.work_id=p_work_id and s.outcome=p_outcome then return jsonb_build_object('request_id',s.request_id,'decision_id',s.decision_id,'work_id',s.work_id,'outcome',s.outcome,'created_at',s.created_at); end if;
    raise exception using errcode='23505', message='operating-resumption-idempotency-conflict';
  end if;
  insert into public.operating_resumptions_v1(request_id,decision_id,work_id,outcome) values(r.id,d.id,r.work_id,p_outcome) returning * into s;
  return jsonb_build_object('request_id',s.request_id,'decision_id',s.decision_id,'work_id',s.work_id,'outcome',s.outcome,'created_at',s.created_at);
end;
$$;

revoke all on function public.operating_founder_v1(), public.get_operating_inbox_v1(uuid),
  public.record_operating_decision_v1(uuid,text,text,text,uuid), public.read_operating_decision_v1(uuid,text),
  public.record_operating_resumption_v1(uuid,text,uuid,text,text) from public;
revoke all on function public.operating_immutable_v1(), public.operating_validate_review_v1(jsonb),
  public.operating_request_before_insert_v1() from public, anon, authenticated;
grant execute on function public.get_operating_inbox_v1(uuid), public.record_operating_decision_v1(uuid,text,text,text,uuid) to authenticated;
grant execute on function public.read_operating_decision_v1(uuid,text), public.record_operating_resumption_v1(uuid,text,uuid,text,text) to anon, authenticated;

commit;
