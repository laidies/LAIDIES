-- Private-pilot bridge. NULL capability_hash is disabled; provisioning the hash is external.
create table public.private_feedback_bridge_config_v1(singleton boolean primary key default true check(singleton), capability_hash text check(capability_hash is null or capability_hash ~ '^[a-f0-9]{64}$'));
insert into public.private_feedback_bridge_config_v1(singleton,capability_hash) values(true,null) on conflict do nothing;
alter table public.private_feedback_bridge_config_v1 enable row level security;
revoke all on public.private_feedback_bridge_config_v1 from public,anon,authenticated;
create or replace function public.private_feedback_bridge_v1(p_capability text,p_action text,p_payload jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_hash text; v_limit integer; v_after uuid; v_id uuid; v_status text; v_code text;
begin
 select capability_hash into v_hash from public.private_feedback_bridge_config_v1 where singleton;
 if v_hash is null or p_capability is null or p_capability !~ '^[a-f0-9]{64}$' or encode(pg_catalog.sha256(convert_to(p_capability,'UTF8')),'hex')<>v_hash then raise exception using errcode='42501',message='feedback_forbidden'; end if;
 if p_action='intake' then
   if p_payload is null or jsonb_typeof(p_payload)<>'object' or not (p_payload ?& array['key','digest','actor_hash','input']) or (select count(*) from jsonb_object_keys(p_payload) k where k not in ('key','digest','actor_hash','input'))<>0 or jsonb_typeof(p_payload->'key')<>'string' or p_payload->>'key' !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' or jsonb_typeof(p_payload->'digest')<>'string' or p_payload->>'digest' !~ '^[0-9a-f]{64}$' or jsonb_typeof(p_payload->'actor_hash')<>'string' or p_payload->>'actor_hash' !~ '^[0-9a-f]{64}$' or jsonb_typeof(p_payload->'input')<>'object' then raise exception using errcode='22023',message='feedback_invalid'; end if;
   return public.intake_town_hall_feedback_v1((p_payload->>'key')::uuid,p_payload->>'digest',p_payload->>'actor_hash',p_payload->'input');
 elsif p_action='list' then
   if p_payload is null or jsonb_typeof(p_payload)<>'object' or (select count(*) from jsonb_object_keys(p_payload) k where k not in ('limit','after'))<>0 or (p_payload ? 'limit' and (jsonb_typeof(p_payload->'limit')<>'number' or p_payload->>'limit' !~ '^[0-9]{1,2}$')) or (p_payload ? 'after' and (jsonb_typeof(p_payload->'after')<>'string' or p_payload->>'after' !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')) then raise exception using errcode='22023',message='feedback_invalid'; end if;
   v_limit:=coalesce((p_payload->>'limit')::integer,25); v_after:=nullif(p_payload->>'after','')::uuid;
   if v_limit not between 1 and 50 then raise exception using errcode='22023',message='feedback_invalid'; end if;
   return coalesce((select jsonb_agg(jsonb_build_object('id',f.id,'submission_type',f.submission_type,'subject',f.subject,'body',f.body,'status',f.status,'submitted_at',f.submitted_at,'reviewed_at',f.reviewed_at) order by f.id) from (select f.* from public.town_hall_feedback f join public.town_hall_feedback_attempts_v1 a on a.feedback_id=f.id where a.expires_at>clock_timestamp() and (v_after is null or f.id>v_after) order by f.id limit v_limit) f),'[]'::jsonb);
 elsif p_action='review' then
   if p_payload is null or jsonb_typeof(p_payload)<>'object' or not (p_payload ?& array['id','status']) or (select count(*) from jsonb_object_keys(p_payload) k where k not in ('id','status'))<>0 or jsonb_typeof(p_payload->'id')<>'string' or p_payload->>'id' !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' or jsonb_typeof(p_payload->'status')<>'string' then raise exception using errcode='22023',message='feedback_invalid'; end if;
   v_id:=(p_payload->>'id')::uuid; v_status:=p_payload->>'status'; v_code:=case v_status when 'triaged' then 'triaged' when 'addressed' then 'addressed' when 'no_action' then 'ignored' when 'referred' then 'deb-flected' else null end;
   if v_code is null then raise exception using errcode='22023',message='feedback_invalid'; end if;
   update public.town_hall_feedback set status=v_code,reviewed_at=clock_timestamp() where id=v_id and exists(select 1 from public.town_hall_feedback_attempts_v1 a where a.feedback_id=v_id and a.expires_at>clock_timestamp()) and ((v_status='triaged' and status='filed') or (v_status in ('addressed','no_action','referred') and status='triaged'));
   if not found then raise exception using errcode='22023',message='feedback_expired'; end if; return jsonb_build_object('reviewed',true,'id',v_id,'status',v_status);
 end if;
 raise exception using errcode='22023',message='feedback_invalid';
end $$;
revoke all on function public.private_feedback_bridge_v1(text,text,jsonb) from public,authenticated;
grant execute on function public.private_feedback_bridge_v1(text,text,jsonb) to anon;
