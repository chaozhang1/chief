import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "../../lib/chief-prompt";
import { CHAO_CONTEXT } from "../../lib/chao-context";

export const prerender = false;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  /** If true, Chief proactively opens the conversation with awareness. */
  openProactively?: boolean;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env ?? (process.env as unknown as Env);
  const apiKey = env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "ANTHROPIC_API_KEY missing. Add to .dev.vars (local) or Cloudflare secrets (deploy).",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const todayDate = new Date().toISOString().slice(0, 10);
  const systemPrompt = buildSystemPrompt({ ...CHAO_CONTEXT, todayDate });

  const anthropic = new Anthropic({ apiKey });

  // If openProactively=true and no messages yet, ask Chief to open with awareness.
  let messages = body.messages ?? [];
  if (body.openProactively && messages.length === 0) {
    messages = [
      {
        role: "user",
        content:
          "[SYSTEM: This is the start of a new conversation. Open with awareness of my recent context. Don't say 'How can I help'. Reference what you know about my work.]",
      },
    ];
  }

  try {
    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-6", // 2026 default; swap to claude-opus-4-7 for premium tier
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const reply =
      completion.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { text: string }).text)
        .join("\n") || "(no reply)";

    return new Response(
      JSON.stringify({
        reply,
        usage: completion.usage,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("chat api error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
