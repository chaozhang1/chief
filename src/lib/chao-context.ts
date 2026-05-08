/**
 * Hardcoded context for the local test (v0.0).
 *
 * In v0.1 this comes from D1 + integrations. For local idea-validation,
 * we hardcode based on the actual build journal and conversation history.
 */

export const CHAO_CONTEXT = {
  userName: "chao",
  timezone: "America/Los_Angeles",
  recentBuildJournal: `## Day 1 — 2026-05-07

What happened today (chao actual):
- After 4+ hour wedge stress-test session, committed to Chief as v0.1
- Killed prior candidates: Path D Shopper Safety, Buy Box ext, Refund Concierge,
  AI Cost Dashboard, Diffwatch, AI-PR Spam Filter
- Reason for kill: each failed at least one of (incumbent will ship, LLM wrapper death,
  founder fit, distribution = BrandGain 2.0)
- Chief survived 8/8 filters: incumbent won't ship vertical, real WTP, founder
  is the user, Tolan-style anti-addictive defensible, MCP ecosystem makes integration
  achievable
- Today scaffolded the project: Astro + Cloudflare + D1 + Tailwind. Initial git commit done.
  Pushed to https://github.com/chaozhang1/chief

What chao has NOT done yet:
- Not registered domain (chief.so target)
- Not posted Day 1 build-in-public tweet
- Not announced to anyone except this AI session

Energy / mood signal:
- Worked hard, has gone through MANY pivots in past few sessions (Buy Box, ScrapeKit,
  Path D, etc) — risk: too much thrashing, not enough shipping
- BrandGain failed at cold-outreach step — chao has been burned by patience plays
- Wants $5-10K MRR lifestyle, not unicorn`,

  recentGitHubActivity: `Today (2026-05-07):
- Created repo: chaozhang1/chief (public, MIT)
- Day 1 commit: scaffold + 19 files (README, BUILD_JOURNAL, package.json, astro config,
  wrangler config, D1 migrations, landing page, waitlist endpoint, etc)
- Tech stack: Astro 6 + Cloudflare 13 + Tailwind 4 + Wrangler 4 + Anthropic SDK
- bun install successful (342 packages)
- bun run build successful (3.79s)

Other repos chao maintains:
- map-enforcement/brandgain-website (Astro + Cloudflare, dead/inactive)
- inventory-mgmt, fraud-agent, agent-observability, idv, risk-ops (older scouting projects)`,

  openPromises: `From the v0.1 spec chao locked today:

- ★ Working /api/chat endpoint by Friday 2026-05-09 EOD
- ★ First X build-in-public tweet posted today (Day 1)
- BUILD_JOURNAL.md committed to git daily

Status as of right now:
- /api/chat: NOT yet built (this is what local test is verifying)
- Day 1 tweet: NOT posted
- BUILD_JOURNAL: committed, but Day 1 "What I actually did" section not yet filled in`,

  recentDecisions: `2026-05-07 (today): Chief is the v0.1 wedge

- Position: "AI Chief of Staff for one-person companies"
- Voice: anti-addictive, anti-anthropomorphic, work bench not friend (Tolan-style)
- Day-1 integrations: GitHub + Stripe + Calendar
- Pricing: Free / $19 Pro / $39 Pro+
- Target: $5-10K MRR by month 12 lifestyle business
- Stack: Cloudflare Workers + Claude + ElevenLabs + D1 (<$50/mo recurring)
- 90-day milestone: Show HN week 8, target Day 90 = 150 paid = $2.85K MRR

2026-05-04: BrandGain stress-test outcome
- Decided to NOT switch wedges from Buy Box, but layer in ScrapeKit OSS twist
- Then killed that too via subsequent push-backs

Pattern chao has shown over past 7 days:
- Strong critical-thinking filter
- Will kill any idea that fails honest stress test
- Drove through 5+ wedge candidates before landing on Chief`,
};
