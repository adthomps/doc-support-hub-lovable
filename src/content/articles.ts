export type Audience = "developers" | "businesses" | "resellers"

export type Article = {
  slug: string
  audience: Audience
  category: string // category slug
  categoryLabel: string
  title: string
  summary: string
  readTime: string
  updated: string
  body: ArticleBlock[]
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang?: string; text: string }
  | { type: "callout"; tone: "info" | "warning" | "success"; text: string }

export const articles: Article[] = [
  // ───── Developers ─────
  {
    slug: "authentication",
    audience: "developers",
    category: "api-basics",
    categoryLabel: "API basics",
    title: "Authentication",
    summary: "API keys, OAuth tokens, and how to authenticate every request.",
    readTime: "4 min read",
    updated: "2025-04-12",
    body: [
      { type: "p", text: "Every request to the API must include a valid bearer token. Tokens are issued per workspace and scoped by role." },
      { type: "h2", text: "Get an API key" },
      { type: "ol", items: ["Open the dashboard.", "Go to Settings → API keys.", "Click Generate and copy the value once shown."] },
      { type: "callout", tone: "warning", text: "Keys are shown only at creation time. Store them in a secret manager." },
      { type: "h2", text: "Send an authenticated request" },
      { type: "code", lang: "bash", text: `curl https://api.example.com/v1/users \\\n  -H "Authorization: Bearer YOUR_API_KEY"` },
    ],
  },
  {
    slug: "users-api",
    audience: "developers",
    category: "api-basics",
    categoryLabel: "API basics",
    title: "Users API",
    summary: "Create, list, retrieve, and delete user accounts via the REST API.",
    readTime: "5 min read",
    updated: "2025-04-09",
    body: [
      { type: "p", text: "The Users API manages account records for end users in your workspace." },
      { type: "h2", text: "Create a user" },
      { type: "code", lang: "bash", text: `curl -X POST https://api.example.com/v1/users \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d '{"name":"Jane","email":"jane@example.com"}'` },
      { type: "h2", text: "Pagination" },
      { type: "p", text: "List endpoints return a cursor in `next`. Pass it as `?cursor=` to fetch the next page." },
    ],
  },
  {
    slug: "webhooks",
    audience: "developers",
    category: "events",
    categoryLabel: "Events & webhooks",
    title: "Webhooks",
    summary: "Receive real-time event notifications and verify their signatures.",
    readTime: "6 min read",
    updated: "2025-04-15",
    body: [
      { type: "p", text: "Webhooks deliver events to a URL you control. Each request is signed with HMAC-SHA256." },
      { type: "h2", text: "Verify a signature" },
      { type: "code", lang: "ts", text: `import crypto from "node:crypto"\nconst sig = req.headers["x-signature"]\nconst expected = crypto.createHmac("sha256", SECRET).update(rawBody).digest("hex")\nif (sig !== expected) throw new Error("Invalid signature")` },
      { type: "callout", tone: "info", text: "Always verify against the raw request body, not the parsed JSON." },
    ],
  },
  {
    slug: "rate-limits",
    audience: "developers",
    category: "api-basics",
    categoryLabel: "API basics",
    title: "Rate limits",
    summary: "Default per-key limits, burst behavior, and how to request increases.",
    readTime: "3 min read",
    updated: "2025-03-28",
    body: [
      { type: "p", text: "Default limit is 1,000 requests per minute per key. Bursts up to 200 req/sec are allowed for short windows." },
      { type: "ul", items: ["429 responses include `Retry-After` in seconds.", "Use exponential backoff with jitter.", "Contact support to request a higher limit."] },
    ],
  },

  // ───── Businesses ─────
  {
    slug: "onboarding-your-business",
    audience: "businesses",
    category: "onboarding",
    categoryLabel: "Onboarding & KYC",
    title: "Onboarding your business",
    summary: "Verify your business, complete KYC, and activate your account.",
    readTime: "6 min read",
    updated: "2025-04-10",
    body: [
      { type: "p", text: "Onboarding takes most businesses 10–15 minutes. Have your business documents and a bank account ready." },
      { type: "ol", items: ["Create your account and confirm email.", "Enter business profile details.", "Upload verification documents.", "Connect a bank account.", "Submit for review."] },
      { type: "callout", tone: "info", text: "Reviews typically complete within 1 business day." },
    ],
  },
  {
    slug: "accepting-payments",
    audience: "businesses",
    category: "payments",
    categoryLabel: "Payments & payouts",
    title: "Accepting payments",
    summary: "Configure payment methods and start accepting payments online.",
    readTime: "5 min read",
    updated: "2025-04-05",
    body: [
      { type: "p", text: "Choose which payment methods to accept based on your customer base and region." },
      { type: "ul", items: ["Cards (Visa, Mastercard, Amex)", "ACH / SEPA bank transfers", "Wallets (Apple Pay, Google Pay)"] },
    ],
  },
  {
    slug: "managing-payouts",
    audience: "businesses",
    category: "payments",
    categoryLabel: "Payments & payouts",
    title: "Managing payouts",
    summary: "Payout schedules, currencies, and reconciliation reports.",
    readTime: "4 min read",
    updated: "2025-04-02",
    body: [
      { type: "p", text: "Standard payouts settle in 2 business days. You can switch to weekly or monthly in Settings → Payouts." },
    ],
  },
  {
    slug: "handling-disputes",
    audience: "businesses",
    category: "disputes",
    categoryLabel: "Disputes & risk",
    title: "Handling disputes & chargebacks",
    summary: "Respond to disputes quickly with the right evidence to win cases.",
    readTime: "7 min read",
    updated: "2025-04-14",
    body: [
      { type: "p", text: "You have 7 days from notification to submit evidence. Strong evidence packages include receipts, shipping proof, and customer communication." },
      { type: "callout", tone: "warning", text: "Missing the deadline forfeits the dispute automatically." },
    ],
  },

  // ───── Resellers ─────
  {
    slug: "partner-onboarding",
    audience: "resellers",
    category: "getting-started",
    categoryLabel: "Getting started",
    title: "Partner onboarding",
    summary: "Sign the partner agreement and access the partner portal.",
    readTime: "4 min read",
    updated: "2025-03-20",
    body: [
      { type: "ol", items: ["Sign the partner agreement.", "Complete the reseller training module.", "Get your partner ID.", "Invite teammates."] },
    ],
  },
  {
    slug: "commission-structure",
    audience: "resellers",
    category: "commercial",
    categoryLabel: "Commercial",
    title: "Commission structure",
    summary: "How commissions are calculated, paid, and reported.",
    readTime: "3 min read",
    updated: "2025-03-15",
    body: [
      { type: "p", text: "Commission is a percentage of net revenue from accounts you manage, paid monthly in arrears." },
    ],
  },
  {
    slug: "marketing-assets",
    audience: "resellers",
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Using marketing assets",
    summary: "Where to find approved logos, decks, and case studies.",
    readTime: "3 min read",
    updated: "2025-03-25",
    body: [
      { type: "ul", items: ["Brand guidelines (PDF)", "Logo pack (ZIP)", "Product brochure", "Case studies"] },
    ],
  },
  {
    slug: "managing-sub-accounts",
    audience: "resellers",
    category: "operations",
    categoryLabel: "Operations",
    title: "Managing sub-accounts",
    summary: "Create, invite, and manage merchant sub-accounts under your partner ID.",
    readTime: "5 min read",
    updated: "2025-04-01",
    body: [
      { type: "p", text: "Sub-accounts are full merchant accounts attached to your partner ID. You can manage billing and access on their behalf." },
    ],
  },
]

export const articlesByAudience = (a: Audience) => articles.filter((x) => x.audience === a)
export const findArticle = (audience: Audience, slug: string) =>
  articles.find((x) => x.audience === audience && x.slug === slug)
export const articlesByCategory = (audience: Audience, categorySlug: string) =>
  articles.filter((x) => x.audience === audience && x.category === categorySlug)
export const categoriesFor = (audience: Audience) => {
  const map = new Map<string, { slug: string; label: string; count: number }>()
  articlesByAudience(audience).forEach((a) => {
    const e = map.get(a.category)
    if (e) e.count += 1
    else map.set(a.category, { slug: a.category, label: a.categoryLabel, count: 1 })
  })
  return Array.from(map.values())
}
