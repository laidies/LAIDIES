begin;

revoke execute on function public.get_my_resident_continuation_v1()
  from authenticated;
revoke execute on function public.put_my_resident_continuation_v1(
  jsonb, uuid, uuid
) from authenticated;

drop function if exists public.put_my_resident_continuation_v1(
  jsonb, uuid, uuid
);
drop function if exists public.get_my_resident_continuation_v1();
drop function if exists public.resident_continuation_v1_is_valid(jsonb);
drop table if exists public.resident_continuation_mutations;
drop table if exists public.resident_continuations;

commit;
