CREATE TABLE IF NOT EXISTS miss_jeeves_answer_bank_versions (
  answer_version_id TEXT PRIMARY KEY,
  answer_key TEXT NOT NULL,
  version INTEGER NOT NULL CHECK (version > 0),
  canonical_question TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  sources_json TEXT NOT NULL,
  related_laidies_json TEXT NOT NULL,
  model_version TEXT NOT NULL,
  source_policy_version TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  recheck_triggers_json TEXT NOT NULL,
  visibility TEXT NOT NULL CHECK (visibility = 'internal_reusable'),
  approved_for_example INTEGER NOT NULL DEFAULT 0 CHECK (approved_for_example IN (0,1)),
  supersedes_version_id TEXT REFERENCES miss_jeeves_answer_bank_versions(answer_version_id),
  answer_fingerprint TEXT NOT NULL CHECK (length(answer_fingerprint) = 64),
  source_digest TEXT NOT NULL CHECK (length(source_digest) = 64),
  aliases_digest TEXT NOT NULL CHECK (length(aliases_digest) = 64),
  review_fingerprint TEXT NOT NULL CHECK (length(review_fingerprint) = 64),
  created_at TEXT NOT NULL,
  UNIQUE(answer_key, version)
);
CREATE TABLE IF NOT EXISTS miss_jeeves_answer_bank_aliases (
  answer_version_id TEXT NOT NULL REFERENCES miss_jeeves_answer_bank_versions(answer_version_id),
  alias_normalized TEXT NOT NULL,
  PRIMARY KEY (answer_version_id, alias_normalized)
);
CREATE INDEX IF NOT EXISTS miss_jeeves_answer_bank_alias_lookup ON miss_jeeves_answer_bank_aliases(alias_normalized);
CREATE TABLE IF NOT EXISTS miss_jeeves_answer_bank_reviews (
  answer_version_id TEXT PRIMARY KEY REFERENCES miss_jeeves_answer_bank_versions(answer_version_id),
  reviewer_id TEXT NOT NULL,
  role_distinct INTEGER NOT NULL CHECK (role_distinct = 1),
  total_score INTEGER NOT NULL CHECK (total_score >= 17 AND total_score <= 20),
  minimum_dimension INTEGER NOT NULL CHECK (minimum_dimension >= 3 AND minimum_dimension <= 4),
  hard_gates_json TEXT NOT NULL,
  review_fingerprint TEXT NOT NULL CHECK (length(review_fingerprint) = 64),
  reviewed_at TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS miss_jeeves_answer_bank_versions_no_update BEFORE UPDATE ON miss_jeeves_answer_bank_versions BEGIN SELECT RAISE(ABORT, 'Miss Jeeves Answer Bank versions are immutable'); END;
CREATE TRIGGER IF NOT EXISTS miss_jeeves_answer_bank_versions_no_delete BEFORE DELETE ON miss_jeeves_answer_bank_versions BEGIN SELECT RAISE(ABORT, 'Miss Jeeves Answer Bank versions are immutable'); END;
CREATE TRIGGER IF NOT EXISTS miss_jeeves_answer_bank_aliases_no_update BEFORE UPDATE ON miss_jeeves_answer_bank_aliases BEGIN SELECT RAISE(ABORT, 'Miss Jeeves Answer Bank aliases are immutable'); END;
CREATE TRIGGER IF NOT EXISTS miss_jeeves_answer_bank_aliases_no_delete BEFORE DELETE ON miss_jeeves_answer_bank_aliases BEGIN SELECT RAISE(ABORT, 'Miss Jeeves Answer Bank aliases are immutable'); END;
CREATE TRIGGER IF NOT EXISTS miss_jeeves_answer_bank_reviews_no_update BEFORE UPDATE ON miss_jeeves_answer_bank_reviews BEGIN SELECT RAISE(ABORT, 'Miss Jeeves Answer Bank reviews are immutable'); END;
CREATE TRIGGER IF NOT EXISTS miss_jeeves_answer_bank_reviews_no_delete BEFORE DELETE ON miss_jeeves_answer_bank_reviews BEGIN SELECT RAISE(ABORT, 'Miss Jeeves Answer Bank reviews are immutable'); END;
