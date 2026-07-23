-- ============================================================================
-- Close the public-card email exposure (2026-07-22 member audit, §1b).
--
-- THE PROBLEM
-- The RLS policy `Closet public read` on member_profiles is
--   using (member_card_is_public = true or auth.uid() = id)
-- RLS filters ROWS, not COLUMNS. So a public card exposed every column of that
-- row — including `email` — to anyone holding the anon key, which is published
-- in content/site/supabase-config.js by design. Nothing was exposed yet only
-- because no profile was public. It would have leaked the first time one was.
--
-- WHY THIS FIX, of the three options considered
--   (a) a public-safe VIEW — most correct, most work, changes every read path
--   (b) column-level REVOKE on email — one line, but laidies-card.html calls
--       .select('*') and `select *` over a revoked column ERRORS, so it would
--       break the owner's own Closet until every select is made explicit
--   (c) THIS: stop keeping the copy at all
--
-- (c) wins because the column was never used. Verified 2026-07-22: member_profiles.email
-- is written in script.js (2 places) and read by NOTHING. The authoritative copy
-- already lives in auth.users.email, which the anon key cannot reach. Deleting a
-- duplicate you never read is strictly better than hiding it.
--
-- SAFE: verified before running that both existing rows' profile email was
-- byte-identical to auth.users.email, so no information is lost here.
--
-- The column is kept (not dropped) so this is reversible and so no code that
-- references it breaks. It must simply stay empty — see the COMMENT below,
-- which shows up in the Supabase table editor.
-- ============================================================================

update public.member_profiles set email = null where email is not null;

comment on column public.member_profiles.email is
  'DELIBERATELY UNUSED — do not write to this. Kept empty because `Closet public read` '
  'exposes every column of a public profile to the anon key, and RLS cannot filter columns. '
  'The real address is auth.users.email, which the anon key cannot reach. '
  'See operations/member-promises-audit-2026-07-22.md §1b.';
