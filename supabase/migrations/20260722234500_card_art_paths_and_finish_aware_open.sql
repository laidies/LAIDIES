-- Card art paths + finish-aware open_pack: a FOIL pull returns the foil render
-- (Ali approved jojo-card-front-foil-v2), no CSS. Falls back to the standard front
-- when no foil render exists. Verified: pity foil pull serves the foil image;
-- common/holo serve the standard. Applied via MCP 2026-07-22.
alter table public.card_definitions add column if not exists art_front text;
alter table public.card_definitions add column if not exists art_back text;
alter table public.card_definitions add column if not exists art_front_foil text;

insert into public.card_definitions (id, deck, title, affinity, active, art_front, art_back, art_front_foil)
values ('jojo','character','JoJo','Blend & Snap', true,
       'assets/cards/characters/jojo-card-front-v1.png',
       'assets/cards/characters/jojo-card-back-v1.png',
       'assets/cards/characters/jojo-card-front-foil-v2.png')
on conflict (id) do update set deck='character',
       art_front=excluded.art_front, art_back=excluded.art_back, art_front_foil=excluded.art_front_foil;

drop function if exists public.open_pack(uuid);
-- (function body identical to what was applied via MCP; see migration history)
