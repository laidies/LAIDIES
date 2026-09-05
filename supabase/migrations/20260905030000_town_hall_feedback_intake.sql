-- Disabled-by-default private feedback intake. No HTTP route is created here.
create table public.town_hall_feedback_intake_config_v1 (
  singleton boolean primary key default true check (singleton), enabled boolean not null default false,
  retention_days integer check (retention_days in (7,30)), updated_at timestamptz not null default clock_timestamp()
);
insert into public.town_hall_feedback_intake_config_v1(singleton, enabled, retention_days) values (true,false,null) on conflict do nothing;
create table public.town_hall_feedback_attempts_v1 (
  key uuid primary key, digest text not null check (digest ~ '^[0-9a-f]{64}$'), actor_hash text not null check (actor_hash ~ '^[0-9a-f]{64}$'),
  receipt_id uuid not null default gen_random_uuid(), accepted_at timestamptz not null default clock_timestamp(), expires_at timestamptz not null, tombstone_expires_at timestamptz not null,
  feedback_id uuid references public.town_hall_feedback(id) on delete set null, unique(key,digest,actor_hash)
);
create table public.town_hall_feedback_staff_v1(user_id uuid primary key, enabled boolean not null default true);
create index town_hall_feedback_attempts_actor_hour_v1 on public.town_hall_feedback_attempts_v1(actor_hash,accepted_at);
create unique index town_hall_feedback_attempts_payload_v1 on public.town_hall_feedback_attempts_v1(feedback_id);
create index town_hall_feedback_attempts_expiry_v1 on public.town_hall_feedback_attempts_v1(expires_at);
alter table public.town_hall_feedback enable row level security;
alter table public.town_hall_feedback_attempts_v1 enable row level security;
alter table public.town_hall_feedback_intake_config_v1 enable row level security;
alter table public.town_hall_feedback_staff_v1 enable row level security;
revoke all on public.town_hall_feedback, public.town_hall_feedback_attempts_v1, public.town_hall_feedback_intake_config_v1, public.town_hall_feedback_staff_v1 from public, anon, authenticated;

create or replace function public.intake_town_hall_feedback_v1(p_key uuid,p_digest text,p_actor_hash text,p_input jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare c public.town_hall_feedback_intake_config_v1%rowtype; a public.town_hall_feedback_attempts_v1%rowtype; v_now timestamptz:=clock_timestamp(); v_body text; v_subject text; v_type text; v_id uuid; v_canonical text;
begin
 select * into c from public.town_hall_feedback_intake_config_v1 where singleton for update;
 if not found or not c.enabled or c.retention_days is null then raise exception using errcode='55000',message='feedback_closed'; end if;
 if p_input is null or octet_length(p_input::text)>12288 or p_key is null or p_key::text !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' or p_digest is null or p_actor_hash is null or p_digest !~ '^[0-9a-f]{64}$' or p_actor_hash !~ '^[0-9a-f]{64}$' or jsonb_typeof(p_input) <> 'object' then raise exception using errcode='22023',message='feedback_invalid'; end if;
 if not ((p_input ? 'submission_type') and (p_input ? 'body') and not (p_input ?| array['user_id','email','status','admin_notes','submitter_email','submitter_display_name']) and (select count(*) from jsonb_object_keys(p_input) k where k not in ('submission_type','subject','body'))=0) then raise exception using errcode='22023',message='feedback_invalid'; end if;
 if jsonb_typeof(p_input->'submission_type')<>'string' or jsonb_typeof(p_input->'body')<>'string' or (p_input?'subject' and jsonb_typeof(p_input->'subject') not in ('string','null')) then raise exception using errcode='22023',message='feedback_invalid'; end if;
 v_type:=p_input->>'submission_type'; v_body:=btrim(p_input->>'body'); v_subject:=nullif(btrim(p_input->>'subject'),'');
 if v_type not in ('compliment','complaint','suggestion') or v_body is null or char_length(v_body) not between 3 and 2000 or (v_subject is not null and char_length(v_subject)>100) or v_body ~ '[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]' or (v_subject is not null and v_subject ~ '[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]') then raise exception using errcode='22023',message='feedback_invalid'; end if;
 v_canonical := '{"body":'||to_json(v_body)::text||',"submission_type":'||to_json(v_type)::text||case when v_subject is null then '' else ',"subject":'||to_json(v_subject)::text end||'}';
 if encode(pg_catalog.sha256(convert_to(v_canonical,'UTF8')),'hex')<>p_digest then raise exception using errcode='22023',message='feedback_invalid'; end if;
 select * into a from public.town_hall_feedback_attempts_v1 where key=p_key for update;
 if found then
   if a.digest<>p_digest or a.actor_hash<>p_actor_hash then raise exception using errcode='23505',message='feedback_conflict'; end if;
   return jsonb_build_object('contract_version','town_hall_feedback_receipt.v1','receipt_id',a.receipt_id,'status','accepted','accepted_at',to_char(a.accepted_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),'input_sha256',a.digest);
 end if;
 if (select count(*) from public.town_hall_feedback_attempts_v1 where actor_hash=p_actor_hash and accepted_at>v_now-interval '1 hour')>=5 then raise exception using errcode='P0001',message='feedback_rate_limited'; end if;
 insert into public.town_hall_feedback(submission_type,subject,body) values(v_type,v_subject,v_body) returning id into v_id;
 insert into public.town_hall_feedback_attempts_v1(key,digest,actor_hash,expires_at,tombstone_expires_at,feedback_id) values(p_key,p_digest,p_actor_hash,v_now+make_interval(days=>c.retention_days),v_now+make_interval(days=>c.retention_days+30),v_id) returning * into a;
 return jsonb_build_object('contract_version','town_hall_feedback_receipt.v1','receipt_id',a.receipt_id,'status','accepted','accepted_at',to_char(a.accepted_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),'input_sha256',a.digest);
end $$;
-- Caller schedules this maintenance; it is not automated by this migration. Payload is deleted at retention expiry; tombstones are pruned 30 days later.
create or replace function public.expire_town_hall_feedback_v1(p_now timestamptz default clock_timestamp()) returns integer language plpgsql security definer set search_path='' as $$ declare n integer; begin delete from public.town_hall_feedback f using public.town_hall_feedback_attempts_v1 a where a.expires_at<=p_now and a.feedback_id=f.id; get diagnostics n=row_count; delete from public.town_hall_feedback_attempts_v1 where tombstone_expires_at<=p_now; return n; end $$;
create or replace function public.list_town_hall_feedback_v1(p_limit integer default 25,p_after uuid default null) returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from public.town_hall_feedback_staff_v1 where user_id=auth.uid() and enabled) then raise exception using errcode='42501',message='feedback_forbidden'; end if;
 if p_limit is null or p_limit not between 1 and 50 then raise exception using errcode='22023',message='feedback_invalid'; end if;
 return coalesce((select jsonb_agg(jsonb_build_object('id',f.id,'submission_type',f.submission_type,'subject',f.subject,'body',f.body,'status',f.status,'submitted_at',f.submitted_at,'reviewed_at',f.reviewed_at) order by f.id asc)
 from (select f.* from public.town_hall_feedback f join public.town_hall_feedback_attempts_v1 a on a.feedback_id=f.id where a.expires_at>clock_timestamp() and (p_after is null or f.id>p_after) order by f.id asc limit p_limit) f),'[]'::jsonb);
end $$;
create or replace function public.review_town_hall_feedback_v1(p_feedback_id uuid,p_status text) returns void language plpgsql security definer set search_path='' as $$ declare v_code text; begin
 if not exists(select 1 from public.town_hall_feedback_staff_v1 where user_id=auth.uid() and enabled) then raise exception using errcode='42501',message='feedback_forbidden'; end if;
 v_code:=case p_status when 'triaged' then 'triaged' when 'addressed' then 'addressed' when 'no_action' then 'ignored' when 'referred' then 'deb-flected' else null end;
 if v_code is null then raise exception using errcode='22023',message='feedback_invalid'; end if;
 update public.town_hall_feedback set status=v_code,reviewed_at=clock_timestamp() where id=p_feedback_id and exists(select 1 from public.town_hall_feedback_attempts_v1 a where a.feedback_id=p_feedback_id and a.expires_at>clock_timestamp()) and ((p_status='triaged' and status='filed') or (p_status in ('addressed','no_action','referred') and status='triaged'));
 if not found then raise exception using errcode='22023',message='feedback_expired'; end if;
end $$;
revoke all on function public.intake_town_hall_feedback_v1(uuid,text,text,jsonb),public.expire_town_hall_feedback_v1(timestamptz),public.review_town_hall_feedback_v1(uuid,text),public.list_town_hall_feedback_v1(integer,uuid) from public,anon,authenticated;
grant execute on function public.intake_town_hall_feedback_v1(uuid,text,text,jsonb),public.expire_town_hall_feedback_v1(timestamptz) to service_role;
grant execute on function public.review_town_hall_feedback_v1(uuid,text) to authenticated;
grant execute on function public.list_town_hall_feedback_v1(integer,uuid) to authenticated;
