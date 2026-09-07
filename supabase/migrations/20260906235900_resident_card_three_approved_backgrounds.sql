-- Extend only the inspected seven-background allowlist; preserve live security.
-- Version avoids the independently owned 020000/030000/040000 episode migrations.
begin;
do $migration$
declare
 definition text;
 old_list text := $pattern$'classic',\s*'pinklilac',\s*'peach',\s*'mint',\s*'lavender',\s*'holo',\s*'gettingready'$pattern$;
 new_list text := '''classic'', ''pinklilac'', ''peach'', ''mint'', ''lavender'', ''holo'', ''gettingready'', ''skates'', ''boombox'', ''computer''';
 finish text;
begin
 select pg_get_functiondef('public.resident_card_v1_is_valid(jsonb)'::regprocedure) into definition;
 if position('''skates''' in definition)=0 and position('''boombox''' in definition)=0 and position('''computer''' in definition)=0 then
  if (select count(*) from regexp_matches(definition,old_list,'g'))<>1 then
   raise exception 'Unknown background allowlist: inspect live validator';
  end if;
  execute regexp_replace(definition,old_list,new_list);
 end if;
 foreach finish in array array['classic','pinklilac','peach','mint','lavender','holo','gettingready','skates','boombox','computer'] loop
  if public.resident_card_v1_is_valid(jsonb_build_object('version',1,'fields',jsonb_build_object('cardBg',finish))) is distinct from true then
   raise exception 'Background did not validate: %',finish;
  end if;
 end loop;
 if public.resident_card_v1_is_valid('{"version":1,"fields":{"cardBg":"unknown-finish"}}'::jsonb) is distinct from false then
  raise exception 'Validator failed negative calibration';
 end if;
end;
$migration$;
commit;
