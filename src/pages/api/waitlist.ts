import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response("Invalid email", { status: 400 });
  }

  const db = (env as { CHIEF_DB?: D1Database }).CHIEF_DB;

  if (db) {
    try {
      await db
        .prepare(
          `INSERT INTO waitlist (email, created_at)
           VALUES (?, unixepoch())
           ON CONFLICT(email) DO NOTHING`,
        )
        .bind(email)
        .run();
    } catch (err) {
      console.error("waitlist insert failed", err);
    }
  } else {
    // Local v0.0: D1 not configured yet. Just log.
    console.log("[waitlist v0.0] would store:", email);
  }

  return new Response(
    `<html><body style="background:#0a0a0a;color:#fafafa;font-family:monospace;padding:4rem;text-align:center"><h1>You're on the list.</h1><p>I'll email when v0.1 ships. — chao</p><p><a href="/" style="color:#a3a3a3">← back</a></p></body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } },
  );
};
