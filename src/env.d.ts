/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Env {
  // D1
  CHIEF_DB: D1Database;
  // KV
  CHIEF_KV: KVNamespace;
  // R2
  CHIEF_R2: R2Bucket;
  // Vars
  ENVIRONMENT: string;
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  ELEVENLABS_API_KEY: string;
  GITHUB_OAUTH_CLIENT_ID: string;
  GITHUB_OAUTH_CLIENT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}
