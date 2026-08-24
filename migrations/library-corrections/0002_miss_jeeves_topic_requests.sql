CREATE TABLE IF NOT EXISTS miss_jeeves_topic_request_events (
  request_id TEXT PRIMARY KEY,
  receipt_id TEXT NOT NULL UNIQUE,
  idempotency_key TEXT NOT NULL UNIQUE,
  request_digest TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  placement TEXT NOT NULL CHECK (placement IN ('library', 'homepage')),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS miss_jeeves_topic_request_payload_vault (
  request_id TEXT PRIMARY KEY REFERENCES miss_jeeves_topic_request_events(request_id),
  question TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS miss_jeeves_topic_request_status_events (
  status_event_id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL REFERENCES miss_jeeves_topic_request_events(request_id),
  state TEXT NOT NULL CHECK (state IN ('submitted', 'reviewing', 'planned', 'answered', 'declined')),
  reason_code TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS miss_jeeves_topic_request_aggregates (
  request_digest TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  latest_request_id TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS miss_jeeves_topic_request_receipt_lookup
  ON miss_jeeves_topic_request_events(receipt_id);

CREATE INDEX IF NOT EXISTS miss_jeeves_topic_request_status_lookup
  ON miss_jeeves_topic_request_status_events(request_id, created_at DESC);

CREATE INDEX IF NOT EXISTS miss_jeeves_topic_request_payload_expiry
  ON miss_jeeves_topic_request_payload_vault(expires_at);

CREATE TRIGGER IF NOT EXISTS miss_jeeves_topic_request_events_no_update
BEFORE UPDATE ON miss_jeeves_topic_request_events
BEGIN
  SELECT RAISE(ABORT, 'Miss Jeeves request events are append-only');
END;

CREATE TRIGGER IF NOT EXISTS miss_jeeves_topic_request_events_no_delete
BEFORE DELETE ON miss_jeeves_topic_request_events
BEGIN
  SELECT RAISE(ABORT, 'Miss Jeeves request events are append-only');
END;

CREATE TRIGGER IF NOT EXISTS miss_jeeves_topic_request_status_no_update
BEFORE UPDATE ON miss_jeeves_topic_request_status_events
BEGIN
  SELECT RAISE(ABORT, 'Miss Jeeves status events are append-only');
END;

CREATE TRIGGER IF NOT EXISTS miss_jeeves_topic_request_status_no_delete
BEFORE DELETE ON miss_jeeves_topic_request_status_events
BEGIN
  SELECT RAISE(ABORT, 'Miss Jeeves status events are append-only');
END;
