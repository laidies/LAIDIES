CREATE TABLE IF NOT EXISTS library_correction_events (
  correction_id TEXT PRIMARY KEY,
  receipt_id TEXT NOT NULL UNIQUE,
  idempotency_key TEXT NOT NULL UNIQUE,
  request_digest TEXT NOT NULL,
  book_id TEXT NOT NULL,
  section_id TEXT,
  claim_id TEXT,
  source_id TEXT,
  content_version TEXT NOT NULL,
  category TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('submitted', 'triage', 'resolved_corrected', 'demoted')),
  record_version INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS library_correction_payload_vault (
  correction_id TEXT PRIMARY KEY REFERENCES library_correction_events(correction_id),
  finding TEXT NOT NULL,
  evidence_url TEXT,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS library_correction_receipt_lookup
  ON library_correction_events(receipt_id);

CREATE TRIGGER IF NOT EXISTS library_correction_events_no_update
BEFORE UPDATE ON library_correction_events
BEGIN
  SELECT RAISE(ABORT, 'library correction events are append-only');
END;

CREATE TRIGGER IF NOT EXISTS library_correction_events_no_delete
BEFORE DELETE ON library_correction_events
BEGIN
  SELECT RAISE(ABORT, 'library correction events are append-only');
END;
