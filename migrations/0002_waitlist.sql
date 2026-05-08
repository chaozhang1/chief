CREATE TABLE IF NOT EXISTS waitlist (
  email TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  notified_at INTEGER
);

CREATE INDEX idx_waitlist_created ON waitlist(created_at DESC);
