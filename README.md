# Chief

> AI Chief of Staff for one-person companies.
> Knows your projects. Remembers everything. Asks the hard questions a co-founder would.
> **Never tries to be your friend.**

## Why

Real Chief of Staff costs $200K/yr. Solo founders, indie hackers, solo consultants, creator-founders — none of us can afford one. But we also don't have standup, weekly 1:1s, or anyone who remembers what we said 3 weeks ago.

ChatGPT and Claude are great at giving answers. Terrible at remembering you. They don't know your projects. They can't ping you when you're slacking. Every conversation starts cold.

Chief fills that gap.

## What Chief does

- Connects to **GitHub, Stripe, Calendar** (more integrations after v0.1)
- Keeps **full markdown memory** across all conversations — not Claude-style summary memory, full retrievable history
- **Pings you proactively**: weekly planning Sunday 8pm, midweek check-ins, promise reminders, pre-meeting briefs
- **Tracks promises** — when you say "I'll ship X by Friday," Chief logs it and follows up
- **Anti-addictive by design**: refuses to roleplay as a friend or therapist. It's a work bench, not a buddy
- **Voice** + text, single locked voice per account (consistency)

## What Chief is NOT

- Not a Replika replacement (no romantic / companion roleplay)
- Not for teams (you have Notion AI / Glean / Linear for that)
- Not "smarter than Claude" — it IS Claude, with persistent memory + integrations + accountability on top

## Who it's for

**One-person companies.**

- Solo SaaS builders / indie hackers
- Newly-solo engineers (just left FAANG)
- Solo consultants / freelancers
- Creator-founders (newsletter, course, podcast)
- Solo coaches / therapists in private practice
- Solo designers / studios of one

If you have a co-founder or a team, you don't need Chief. Use Notion AI / Linear / etc.

## Status

🚧 **Day 1 — building in public.** Watch the journey at [BUILD_JOURNAL.md](./BUILD_JOURNAL.md).

Target: v0.1 ship in 6 weeks. Show HN at week 8. First 100 signups get 1 year Pro free with code `HN100`.

## Stack

- **Frontend:** Astro on Cloudflare Pages
- **API:** Cloudflare Workers
- **DB:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (voice files)
- **LLM:** Anthropic Claude (Sonnet 4.6 default, Opus 4.7 priority)
- **Voice:** ElevenLabs TTS + Cloudflare Workers AI Whisper STT
- **Auth:** Clerk (or self-built)
- **Memory:** Markdown files in D1, full history retrievable in 1M context
- **Cron:** Cloudflare Cron Triggers for proactive outreach

Total infra cost target: <$50/mo recurring, <$200 over 90 days.

## Pricing (planned)

| Tier | Price | What you get |
|---|---|---|
| Free | $0 | Chat only, 30-day history, 1 integration, 100 messages/mo |
| Pro | $19/mo or $190/yr | All integrations, full history, voice 60 min/mo, all cron triggers |
| Pro+ | $39/mo or $390/yr | Opus 4.7 priority, voice unlimited, weekly export, custom Chief tone |

## Privacy

- Read-only OAuth scopes for all integrations
- Your data is **never** used to train any model
- Export everything anytime
- Delete your account → all data wiped within 24 hours
- See [PRIVACY.md](./PRIVACY.md) (coming soon)

## Built by

[chao zhang](https://x.com/chaozhang) — solo founder. Previous: BrandGain (Amazon MAP audits, shut down 2026 after cold-outreach failed at the channel step). Chief is what I wish I had when I was building BrandGain alone at 11pm.

## Contributing

Currently solo + closed development through v0.1. Open source plans post-launch.

## License

MIT (planned for OSS components post-launch)

---

*"Not your friend. Not your therapist. Your work bench. Remembers everything you build, ships when you ship, calls you out when you don't."*
