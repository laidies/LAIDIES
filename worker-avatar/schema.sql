CREATE TABLE IF NOT EXISTS portrait_usage (
  request_id TEXT PRIMARY KEY,
  user_hash TEXT NOT NULL,
  utc_day TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS portrait_usage_user_day ON portrait_usage(user_hash, utc_day);
CREATE INDEX IF NOT EXISTS portrait_usage_day ON portrait_usage(utc_day);
CREATE INDEX IF NOT EXISTS portrait_usage_created_at ON portrait_usage(created_at);
