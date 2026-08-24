CREATE TABLE IF NOT EXISTS miss_jeeves_topic_request_rate_windows (
  window_start TEXT PRIMARY KEY,
  request_count INTEGER NOT NULL DEFAULT 0
);
