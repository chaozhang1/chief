-- Chief D1 initial schema
-- Run: bun run db:migrate:local (after `bun run db:create` and replacing IDs in wrangler.jsonc)

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'pro_plus')),
  voice_id TEXT,
  timezone TEXT DEFAULT 'America/Los_Angeles',
  stripe_customer_id TEXT,
  deleted_at INTEGER
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);

CREATE TABLE IF NOT EXISTS chief_persona (
  user_id TEXT PRIMARY KEY,
  tone TEXT NOT NULL DEFAULT 'direct' CHECK (tone IN ('direct', 'warm', 'firm')),
  proactive_freq TEXT NOT NULL DEFAULT 'standard' CHECK (proactive_freq IN ('minimal', 'standard', 'aggressive')),
  custom_rules TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'chief', 'system')),
  content TEXT NOT NULL,
  voice_url TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  metadata TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_user_created ON messages(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS facts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('project', 'decision', 'promise', 'pattern', 'context', 'preference')),
  content TEXT NOT NULL,
  source_message_id TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  expires_at INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (source_message_id) REFERENCES messages(id) ON DELETE SET NULL
);

CREATE INDEX idx_facts_user_category ON facts(user_id, category);

CREATE TABLE IF NOT EXISTS promises (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  promised_by INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'shipped', 'dropped', 'extended')),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  resolved_at INTEGER,
  source_message_id TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (source_message_id) REFERENCES messages(id) ON DELETE SET NULL
);

CREATE INDEX idx_promises_user_status ON promises(user_id, status);
CREATE INDEX idx_promises_deadline ON promises(promised_by) WHERE status = 'open';

CREATE TABLE IF NOT EXISTS integrations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('github', 'stripe', 'calendar')),
  oauth_token_kv_key TEXT NOT NULL,
  last_synced INTEGER,
  config TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, provider)
);

CREATE INDEX idx_integrations_user ON integrations(user_id);
CREATE INDEX idx_integrations_sync ON integrations(last_synced);

CREATE TABLE IF NOT EXISTS integration_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  occurred_at INTEGER NOT NULL,
  imported_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_events_user_time ON integration_events(user_id, occurred_at DESC);
CREATE INDEX idx_events_user_provider ON integration_events(user_id, provider, occurred_at DESC);
