-- Restore bounded generated portraits without admitting remote URLs, SVG or HTML.
-- Existing Card rows/RLS/RPC authority are unchanged. Images remain inside the
-- private Card envelope and its existing mutation records, not public storage.
begin;
create or replace function public.resident_raster_portrait_v1_is_valid(value text)
returns boolean language plpgsql immutable set search_path = '' as $$
declare
  payload text;
  bytes bytea;
  size integer;
begin
  if value is null or char_length(value) > 131095
     or value !~ '^data:image/(jpeg|png);base64,[A-Za-z0-9+/]+={0,2}$' then
    return false;
  end if;
  payload := split_part(value, ',', 2);
  if char_length(payload) % 4 <> 0 then return false; end if;
  bytes := decode(payload, 'base64');
  size := octet_length(bytes);
  if size < 64 or size > 98304 or replace(encode(bytes, 'base64'), E'\n', '') <> payload then
    return false;
  end if;
  if value like 'data:image/jpeg;%' then
    return substring(bytes from 1 for 3) = decode('ffd8ff', 'hex')
       and substring(bytes from size - 1 for 2) = decode('ffd9', 'hex');
  end if;
  return substring(bytes from 1 for 8) = decode('89504e470d0a1a0a', 'hex')
     and substring(bytes from size - 11 for 12) = decode('0000000049454e44ae426082', 'hex');
exception when others then return false;
end;
$$;

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
      when 'cardAvatarUrl' then 131095
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
       or jsonb_typeof(p_document->'fields'->v_key) <> 'string'
       or char_length(v_value) > v_limit
       or v_value ~ '[<>[:cntrl:]]'
       or v_value ~ U&'[\200E\200F\202A-\202E\2066-\2069]' then
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
       and not public.resident_raster_portrait_v1_is_valid(v_value)
       and (
         char_length(v_value) > 240
         or v_value !~ '^/assets/[A-Za-z0-9][A-Za-z0-9._/-]*[.](png|jpg|jpeg|webp|gif|avif)$'
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


-- Calibrated admission: reject executable, truncated, oversized and non-string
-- inputs; accept a real one-pixel PNG and the existing packaged-path form.
do $$
declare
  png text := 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6X8AAAAASUVORK5CYII=';
begin
  if not public.resident_card_v1_is_valid(jsonb_build_object('version',1,'fields',jsonb_build_object('cardAvatarUrl',png)))
     or not public.resident_card_v1_is_valid('{"version":1,"fields":{"displayName":"Fixture","cardAvatarUrl":"/assets/test.png"}}')
     or public.resident_card_v1_is_valid('{"version":1,"fields":{"displayName":"Fixture","cardAvatarUrl":"data:image/svg+xml;base64,PHN2Zz4="}}')
     or public.resident_card_v1_is_valid('{"version":1,"fields":{"displayName":"Fixture","cardAvatarUrl":"data:image/png;base64,AAAA"}}')
     or public.resident_card_v1_is_valid('{"version":1,"fields":{"displayName":"Fixture","cardAvatarUrl":null}}')
     or public.resident_card_v1_is_valid('{"version":1,"fields":{"displayName":42}}')
     or public.resident_raster_portrait_v1_is_valid('data:image/png;base64,' || repeat('A',131076)) then
    raise exception 'resident-portrait-validator-calibration-failed';
  end if;
end;
$$;
commit;
