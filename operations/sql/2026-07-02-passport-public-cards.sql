-- =============================================================================
-- SUNNYVAiLE — Your Closet (public shareable Residence Cards + collections)
-- =============================================================================
-- Migration date: 2026-07-02
-- Applied by: Ali (paste into Supabase → SQL Editor → Run)
-- Additive only — no destructive changes. Safe to run + re-run.
--
-- Concept: Every member has a "Closet" — a personal space that holds:
--   • The Residence Card (identity — hangs on the closet mirror)
--   • Collections (sticker book on shelf, sash on hook, charm bracelet in dish,
--     trading card binder, locked diary, cheat sheet, FAiRY piggy bank)
--   • Personality signals (motto, quote, favorite saint / song / activity)
--   • Optional public flair (pinned collectible, away message, Top 5)
--
-- URL: /@username → opens that member's closet
-- Privacy: whole closet is private by default; toggle to public (per-item
-- controls for cheat sheet pins).
--
-- What this migration builds:
--   1. Card face + closet identity columns on member_profiles
--   2. Pinned collectible (feature one earned item)
--   3. Away message (Y2K AIM-style status)
--   4. Top 5 besties (MySpace-style; no consent required)
--   5. Pinned learnings / cheat sheet (new table — private by default, opt-in public)
--   6. RLS policies so public closets are visible to anyone
-- =============================================================================


-- ==== SECTION 1 · Card face + closet identity on member_profiles ====

ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS card_username text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS resident_number int;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS favorite_saint text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS favorite_song text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS favorite_activity text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS card_motto text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS favorite_quote text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS card_archetype text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS avatar_slug text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS card_created_at timestamptz;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS card_updated_at timestamptz;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS accept_public_notes boolean DEFAULT true;

-- Pinned collectible (feature one earned item at the top of the closet)
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS pinned_collectible_type text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS pinned_collectible_ref text;

-- Away message (Y2K AIM-style — auto-expires; client filters)
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS away_message text;
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS away_expires_at timestamptz;

-- Top 5 (JSON array of {rank, username}; MySpace-style, no consent)
ALTER TABLE public.member_profiles ADD COLUMN IF NOT EXISTS besties jsonb DEFAULT '[]'::jsonb;


-- ==== SECTION 2 · Constraints ====

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'member_profiles_card_username_key') THEN
    ALTER TABLE public.member_profiles
      ADD CONSTRAINT member_profiles_card_username_key UNIQUE (card_username);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'card_username_format') THEN
    ALTER TABLE public.member_profiles ADD CONSTRAINT card_username_format
      CHECK (card_username IS NULL OR card_username ~ '^[a-z0-9_]{3,24}$');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'card_username_reserved') THEN
    ALTER TABLE public.member_profiles ADD CONSTRAINT card_username_reserved CHECK (
      card_username IS NULL OR card_username NOT IN (
        'admin','root','api','app','www','home','about','help','support','contact',
        'signup','signin','login','logout','register','settings','profile','account','card','closet','me',
        'laidies','sunnyvaile','ali','sara','eugina','josh','deb',
        'cher','dolly','elle','miranda','buffy','regina','david',
        'newsstand','library','mall','claires','bronze','chick','flicks','blend','snap','maikeover',
        'sorority','sanctuary','radio','ksvl','post','office','town','hall','high','sunnyvaile-high',
        'grimoire','coven','saint','saints','maven','mavens','clubhouse','pass','residence',
        'wednesday','tour','walk','anthem','fairy','godmother','claio'
      )
    );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'display_name_length') THEN
    ALTER TABLE public.member_profiles ADD CONSTRAINT display_name_length
      CHECK (display_name IS NULL OR char_length(display_name) BETWEEN 1 AND 30);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'card_motto_length') THEN
    ALTER TABLE public.member_profiles ADD CONSTRAINT card_motto_length
      CHECK (card_motto IS NULL OR char_length(card_motto) <= 80);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'favorite_quote_length') THEN
    ALTER TABLE public.member_profiles ADD CONSTRAINT favorite_quote_length
      CHECK (favorite_quote IS NULL OR char_length(favorite_quote) <= 140);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'away_message_length') THEN
    ALTER TABLE public.member_profiles ADD CONSTRAINT away_message_length
      CHECK (away_message IS NULL OR char_length(away_message) <= 140);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'member_profiles_resident_number_key') THEN
    ALTER TABLE public.member_profiles
      ADD CONSTRAINT member_profiles_resident_number_key UNIQUE (resident_number);
  END IF;
END $$;


-- ==== SECTION 3 · Indexes ====

CREATE INDEX IF NOT EXISTS idx_member_profiles_card_username
  ON public.member_profiles(card_username)
  WHERE card_username IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_member_profiles_public
  ON public.member_profiles(card_username, member_card_is_public)
  WHERE member_card_is_public = true;


-- ==== SECTION 4 · Resident number + timestamp auto-assign ====

CREATE SEQUENCE IF NOT EXISTS public.resident_number_seq START 1000;

CREATE OR REPLACE FUNCTION public.member_profiles_before_write()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  -- Auto-assign resident number the first time the closet has any content
  IF NEW.resident_number IS NULL
     AND (NEW.display_name IS NOT NULL OR NEW.card_username IS NOT NULL)
  THEN
    NEW.resident_number := nextval('public.resident_number_seq');
  END IF;

  -- Stamp card_created_at exactly once, on first meaningful save
  IF NEW.card_created_at IS NULL
     AND (NEW.display_name IS NOT NULL OR NEW.card_username IS NOT NULL OR NEW.favorite_saint IS NOT NULL)
  THEN
    NEW.card_created_at := now();
  END IF;

  -- Bump card_updated_at any time a card field changes
  IF NEW.card_username IS NOT NULL
     OR NEW.display_name IS NOT NULL
     OR NEW.favorite_saint IS NOT NULL
     OR NEW.favorite_song IS NOT NULL
     OR NEW.avatar_slug IS NOT NULL
     OR NEW.card_motto IS NOT NULL
     OR NEW.favorite_quote IS NOT NULL
  THEN
    NEW.card_updated_at := now();
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS member_profiles_before_write ON public.member_profiles;
CREATE TRIGGER member_profiles_before_write
  BEFORE INSERT OR UPDATE ON public.member_profiles
  FOR EACH ROW EXECUTE FUNCTION public.member_profiles_before_write();


-- ==== SECTION 5 · Pinned learnings (cheat sheet) ====

-- One row per pinned reference. A LAiDY can pin from The Decoder, Chamber of
-- Receipts, SLAiYER Handbook, or an episode moment. Private by default; owner
-- toggles individual pins to public.

CREATE TABLE IF NOT EXISTS public.member_pinned_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reference_type text NOT NULL CHECK (reference_type IN ('decoder', 'chamber', 'handbook', 'episode', 'saint', 'lore')),
  reference_slug text NOT NULL,
  user_note text CHECK (user_note IS NULL OR char_length(user_note) <= 280),
  is_public boolean NOT NULL DEFAULT false,
  pinned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, reference_type, reference_slug)
);

CREATE INDEX IF NOT EXISTS idx_pinned_refs_user ON public.member_pinned_references(user_id);
CREATE INDEX IF NOT EXISTS idx_pinned_refs_public
  ON public.member_pinned_references(user_id)
  WHERE is_public = true;


-- ==== SECTION 6 · Row-Level Security for public closets ====

ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_reward_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_pinned_references ENABLE ROW LEVEL SECURITY;

-- ---- member_profiles: read policy (public OR owner) ----
DROP POLICY IF EXISTS "Closet public read" ON public.member_profiles;
CREATE POLICY "Closet public read" ON public.member_profiles
  FOR SELECT
  USING (member_card_is_public = true OR auth.uid() = id);

-- ---- member_profiles: owner write ----
DROP POLICY IF EXISTS "Closet owner write" ON public.member_profiles;
CREATE POLICY "Closet owner write" ON public.member_profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ---- member_reward_events: readable if owner's closet is public ----
DROP POLICY IF EXISTS "Closet public reward read" ON public.member_reward_events;
CREATE POLICY "Closet public reward read" ON public.member_reward_events
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.member_profiles p
      WHERE p.id = member_reward_events.user_id
      AND p.member_card_is_public = true
    )
  );

-- ---- member_issue_progress: readable if owner's closet is public ----
DROP POLICY IF EXISTS "Closet public issue read" ON public.member_issue_progress;
CREATE POLICY "Closet public issue read" ON public.member_issue_progress
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.member_profiles p
      WHERE p.id = member_issue_progress.user_id
      AND p.member_card_is_public = true
    )
  );

-- ---- pinned references: per-item public/private + owner always sees own ----
DROP POLICY IF EXISTS "Cheat sheet public pin read" ON public.member_pinned_references;
CREATE POLICY "Cheat sheet public pin read" ON public.member_pinned_references
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR (
      is_public = true
      AND EXISTS (
        SELECT 1 FROM public.member_profiles p
        WHERE p.id = member_pinned_references.user_id
        AND p.member_card_is_public = true
      )
    )
  );

DROP POLICY IF EXISTS "Cheat sheet owner write" ON public.member_pinned_references;
CREATE POLICY "Cheat sheet owner write" ON public.member_pinned_references
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ==== SECTION 7 · Town Hall feedback + KSVL song requests ====

-- Town Hall — compliments/complaints/suggestions. Officially Deb reads them.
-- Unofficially, "deb-flected" is a valid status.
CREATE TABLE IF NOT EXISTS public.town_hall_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  submission_type text NOT NULL CHECK (submission_type IN ('compliment', 'complaint', 'suggestion')),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 100),
  body text NOT NULL CHECK (char_length(body) BETWEEN 3 AND 2000),
  submitter_email text,
  submitter_display_name text,
  status text NOT NULL DEFAULT 'filed' CHECK (status IN ('filed', 'triaged', 'addressed', 'ignored', 'deb-flected')),
  admin_notes text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_town_hall_feedback_user ON public.town_hall_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_town_hall_feedback_status ON public.town_hall_feedback(status, submitted_at DESC);

-- KSVL — call-in song requests. Structured input for Ali's Suno pipeline.
CREATE TABLE IF NOT EXISTS public.ksvl_song_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  song_style text NOT NULL,
  topic text NOT NULL CHECK (char_length(topic) BETWEEN 3 AND 200),
  lyric_ideas text CHECK (lyric_ideas IS NULL OR char_length(lyric_ideas) <= 1000),
  status text NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'in-production', 'shipped', 'declined')),
  suno_prompt_id text,
  released_track_id text,
  admin_notes text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  status_updated_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_ksvl_requests_user ON public.ksvl_song_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_ksvl_requests_status ON public.ksvl_song_requests(status, submitted_at DESC);

-- RLS: users can INSERT their own; users can SELECT their own history;
-- only admin (via service role) can UPDATE status. No cross-user read.
ALTER TABLE public.town_hall_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ksvl_song_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Town Hall own insert" ON public.town_hall_feedback;
CREATE POLICY "Town Hall own insert" ON public.town_hall_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Town Hall own read" ON public.town_hall_feedback;
CREATE POLICY "Town Hall own read" ON public.town_hall_feedback
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "KSVL request own insert" ON public.ksvl_song_requests;
CREATE POLICY "KSVL request own insert" ON public.ksvl_song_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "KSVL request own read" ON public.ksvl_song_requests;
CREATE POLICY "KSVL request own read" ON public.ksvl_song_requests
  FOR SELECT
  USING (auth.uid() = user_id);


-- ==== SECTION 8 · Verify ====

-- Confirm all new columns exist
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'member_profiles'
  AND column_name IN (
    'card_username','resident_number','display_name','favorite_saint',
    'favorite_song','favorite_activity','card_motto','favorite_quote',
    'card_archetype','avatar_slug','card_created_at','card_updated_at',
    'accept_public_notes','pinned_collectible_type','pinned_collectible_ref',
    'away_message','away_expires_at','besties',
    'member_card_is_public','member_card_status'
  )
ORDER BY column_name;

-- Confirm new table exists
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'member_pinned_references'
ORDER BY ordinal_position;

-- Confirm sequence + trigger
SELECT relname FROM pg_class WHERE relname = 'resident_number_seq';
SELECT tgname FROM pg_trigger WHERE tgname = 'member_profiles_before_write';

-- Confirm all RLS policies
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND policyname LIKE 'Closet %' OR policyname LIKE 'Cheat sheet %'
ORDER BY tablename, policyname;
