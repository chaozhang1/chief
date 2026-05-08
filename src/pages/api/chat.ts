import type { APIRoute } from "astro";
import OpenAI from "openai";
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
  const apiKey = env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "OPENAI_API_KEY missing. Add to .dev.vars (local) or Cloudflare secrets (deploy).",
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

  const openai = new OpenAI({ apiKey });

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
    const completion = await openai.chat.completions.create({
      model: "gpt-5", // upgrade to "gpt-5" / "gpt-5-1" when available; fallback "gpt-4o"
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "(no reply)";

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
