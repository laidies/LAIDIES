-- Execute only after BEGIN + candidate migration; caller appends ROLLBACK.
-- Synthetic Auth rows and every request/DDL change remain transaction-local.
insert into auth.users(id,email) values
 ('30fd534e-981d-4c70-9d7c-e28840856aa1','ksvl-transaction-a@example.com'),
 ('30fd534e-981d-4c70-9d7c-e28840856aa2','ksvl-transaction-b@example.com');
select set_config('request.jwt.claim.sub','30fd534e-981d-4c70-9d7c-e28840856aa1',true);
set local role authenticated;
do $$
declare a jsonb; b jsonb; n integer;
begin
  if has_table_privilege('authenticated','public.ksvl_song_requests','SELECT')
     or has_table_privilege('anon','public.ksvl_song_requests','INSERT')
     or has_any_column_privilege('authenticated','public.ksvl_song_requests','SELECT')
     or has_any_column_privilege('anon','public.ksvl_song_requests','INSERT')
     or has_table_privilege('authenticated','public.ksvl_song_request_receipts_v1','SELECT')
     or has_function_privilege('anon','public.submit_my_ksvl_song_request_v1(text,text,text,uuid)','EXECUTE') then
    raise exception 'FAIL direct or anonymous access';
  end if;
  a:=public.submit_my_ksvl_song_request_v1('y2k-pop-anthem','Synthetic transaction test',E'Line one\nLine two','40fd534e-981d-4c70-9d7c-e28840856aa1');
  b:=public.submit_my_ksvl_song_request_v1('y2k-pop-anthem','Synthetic transaction test',E'Line one\nLine two','40fd534e-981d-4c70-9d7c-e28840856aa1');
  if a->>'receipt_id'<>b->>'receipt_id' or b->>'replayed'<>'true' then raise exception 'FAIL replay';end if;
  if a ? 'admin_notes' or a ? 'topic' then raise exception 'FAIL private fields';end if;
  begin
    perform public.submit_my_ksvl_song_request_v1('y2k-pop-anthem','Different payload',null,'40fd534e-981d-4c70-9d7c-e28840856aa1');
    raise exception 'FAIL conflict admitted';
  exception when unique_violation then null;end;
  begin
    perform public.submit_my_ksvl_song_request_v1(null,'Invalid style',null,gen_random_uuid());
    raise exception 'FAIL null style admitted';
  exception when invalid_parameter_value then null;end;
  if jsonb_array_length(public.list_my_ksvl_song_requests_v1())<>1 then raise exception 'FAIL own list';end if;
  perform set_config('request.jwt.claim.sub','30fd534e-981d-4c70-9d7c-e28840856aa2',true);
  if jsonb_array_length(public.list_my_ksvl_song_requests_v1())<>0 then raise exception 'FAIL foreign list';end if;
  begin
    perform public.delete_my_ksvl_song_request_v1((a->>'receipt_id')::uuid);
    raise exception 'FAIL foreign delete';
  exception when no_data_found then null;end;
  perform set_config('request.jwt.claim.sub','30fd534e-981d-4c70-9d7c-e28840856aa1',true);
  b:=public.delete_my_ksvl_song_request_v1((a->>'receipt_id')::uuid);
  if b->>'state'<>'deleted' then raise exception 'FAIL delete';end if;
  b:=public.delete_my_ksvl_song_request_v1((a->>'receipt_id')::uuid);
  if b->>'state'<>'deleted' then raise exception 'FAIL idempotent delete';end if;
  b:=public.submit_my_ksvl_song_request_v1('y2k-pop-anthem','Synthetic transaction test',E'Line one\nLine two','40fd534e-981d-4c70-9d7c-e28840856aa1');
  if b->>'state'<>'deleted' then raise exception 'FAIL deleted request resurrected';end if;
  for n in 1..4 loop
    perform public.submit_my_ksvl_song_request_v1('coffeehouse-acoustic','Rate fixture '||n,null,gen_random_uuid());
  end loop;
  begin
    perform public.submit_my_ksvl_song_request_v1('coffeehouse-acoustic','Sixth request',null,gen_random_uuid());
    raise exception 'FAIL rate cap';
  exception when sqlstate 'PT429' then null;end;
end;$$;
reset role;
do $$begin
 if (select count(*) from public.ksvl_song_requests where user_id='30fd534e-981d-4c70-9d7c-e28840856aa1')<>4 then raise exception 'FAIL owner deletion';end if;
 if (select count(*) from public.ksvl_song_request_receipts_v1 where owner_id='30fd534e-981d-4c70-9d7c-e28840856aa1')<>5 then raise exception 'FAIL retry receipt retention';end if;
end;$$;
select 'KSVL provider transaction PASS: owner isolation, safe receipt, replay, deletion, validation, rate cap, unchanged retention' as verdict;
