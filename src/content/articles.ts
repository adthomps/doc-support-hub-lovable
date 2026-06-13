export type Audience = "developers" | "businesses" | "resellers"

export type DeveloperPersona = "integrator" | "platform" | "acquirer-dev"
export type BusinessPersona = "merchant" | "owner" | "operations"
export type ResellerPersona = "reseller" | "acquirer" | "referral"
export type Persona = DeveloperPersona | BusinessPersona | ResellerPersona

export const personasByAudience: Record<Audience, { id: Persona; label: string; description: string }[]> = {
  developers: [
    { id: "integrator", label: "Integrators", description: "Build new integrations using REST APIs and SDKs." },
    { id: "platform", label: "Platform engineers", description: "Operate, scale, and secure production integrations." },
    { id: "acquirer-dev", label: "Partner / Acquirer developers", description: "Onboard sub-merchants and orchestrate split payments." },
  ],
  businesses: [
    { id: "merchant", label: "Merchants", description: "Day-to-day operations: payments, refunds, customers." },
    { id: "owner", label: "Business owners", description: "Finance, billing, team access, and growth." },
    { id: "operations", label: "Operations", description: "Disputes, fraud, payouts, and reconciliation." },
  ],
  resellers: [
    { id: "reseller", label: "Resellers", description: "Sell, package, and support the platform under your brand." },
    { id: "acquirer", label: "Acquirers / ISOs", description: "Program-level onboarding, sub-merchant lifecycle, and reporting." },
    { id: "referral", label: "Referral partners", description: "Refer customers and earn revenue share without managing accounts." },
  ],
}

export type Article = {
  slug: string
  audience: Audience
  category: string
  categoryLabel: string
  title: string
  summary: string
  readTime: string
  updated: string
  body: ArticleBlock[]
  personas?: Persona[]
  next?: string // slug within same audience
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
    slug: "quickstart-first-api-call",
    audience: "developers",
    category: "api-basics",
    categoryLabel: "API basics",
    title: "Quickstart: your first API call",
    summary: "Provision a key, install the SDK, and make your first authenticated request in under five minutes.",
    readTime: "4 min read",
    updated: "2025-05-02",
    personas: ["integrator"],
    next: "authentication",
    body: [
      { type: "p", text: "Who this is for: integrators wiring up a new application against the REST API." },
      { type: "h2", text: "Prerequisites" },
      { type: "ul", items: ["A workspace and admin access", "Node.js 18+ or any HTTP client", "A sandbox API key"] },
      { type: "h2", text: "Task flow" },
      { type: "ol", items: ["Generate a sandbox key in Settings → API keys.", "Export it as an environment variable.", "Call /v1/ping to confirm connectivity.", "Switch to /v1/users to create your first resource."] },
      { type: "code", lang: "bash", text: `export API_KEY=sk_test_...\ncurl https://api.example.com/v1/ping \\\n  -H "Authorization: Bearer $API_KEY"` },
      { type: "callout", tone: "success", text: "If you get back { ok: true } you're ready to build." },
    ],
  },
  {
    slug: "authentication",
    audience: "developers",
    category: "api-basics",
    categoryLabel: "API basics",
    title: "Authentication",
    summary: "API keys, OAuth tokens, and how to authenticate every request.",
    readTime: "4 min read",
    updated: "2025-04-12",
    personas: ["integrator", "platform"],
    next: "rate-limits",
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
    personas: ["integrator"],
    body: [
      { type: "p", text: "The Users API manages account records for end users in your workspace." },
      { type: "h2", text: "Create a user" },
      { type: "code", lang: "bash", text: `curl -X POST https://api.example.com/v1/users \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d '{"name":"Jane","email":"jane@example.com"}'` },
      { type: "h2", text: "Pagination" },
      { type: "p", text: "List endpoints return a cursor in `next`. Pass it as `?cursor=` to fetch the next page." },
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
    personas: ["platform"],
    body: [
      { type: "p", text: "Default limit is 1,000 requests per minute per key. Bursts up to 200 req/sec are allowed for short windows." },
      { type: "ul", items: ["429 responses include `Retry-After` in seconds.", "Use exponential backoff with jitter.", "Contact support to request a higher limit."] },
    ],
  },
  {
    slug: "hosted-checkout",
    audience: "developers",
    category: "integrations",
    categoryLabel: "Integration guides",
    title: "Hosted checkout integration",
    summary: "Redirect customers to a hosted payment page — minimal PCI scope, fastest path to live.",
    readTime: "6 min read",
    updated: "2025-05-08",
    personas: ["integrator"],
    next: "server-to-server-payments",
    body: [
      { type: "p", text: "Who this is for: integrators that want the fastest path to accepting payments without handling card data." },
      { type: "h2", text: "Task flow" },
      { type: "ol", items: ["Create a checkout session server-side.", "Redirect the customer to the returned URL.", "Handle the webhook on completion.", "Show a confirmation page."] },
      { type: "code", lang: "bash", text: `curl -X POST https://api.example.com/v1/checkout/sessions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{"amount":4999,"currency":"usd","success_url":"https://shop.example.com/done"}'` },
      { type: "callout", tone: "info", text: "Hosted checkout keeps you out of PCI DSS SAQ-D scope." },
    ],
  },
  {
    slug: "server-to-server-payments",
    audience: "developers",
    category: "integrations",
    categoryLabel: "Integration guides",
    title: "Server-to-server payments",
    summary: "Tokenize cards client-side, charge them from your backend, and handle 3DS challenges.",
    readTime: "7 min read",
    updated: "2025-05-06",
    personas: ["integrator"],
    next: "webhooks",
    body: [
      { type: "p", text: "Who this is for: integrators that need full control over the payment UX." },
      { type: "h2", text: "Task flow" },
      { type: "ol", items: ["Collect card data with the client SDK to receive a single-use token.", "POST the token plus amount to /v1/charges.", "If the response is `requires_action`, run the 3DS challenge.", "Confirm and capture the charge."] },
      { type: "callout", tone: "warning", text: "Never transmit raw PAN to your servers — always tokenize on the client." },
    ],
  },
  {
    slug: "webhooks",
    audience: "developers",
    category: "events",
    categoryLabel: "Events & webhooks",
    title: "Webhooks deep dive",
    summary: "Receive real-time events, verify signatures, and handle retries idempotently.",
    readTime: "6 min read",
    updated: "2025-04-15",
    personas: ["platform", "integrator"],
    next: "auth-and-security",
    body: [
      { type: "p", text: "Webhooks deliver events to a URL you control. Each request is signed with HMAC-SHA256 and retried with backoff for up to 24 hours on non-2xx responses." },
      { type: "h2", text: "Verify a signature" },
      { type: "code", lang: "ts", text: `import crypto from "node:crypto"\nconst sig = req.headers["x-signature"]\nconst expected = crypto.createHmac("sha256", SECRET).update(rawBody).digest("hex")\nif (sig !== expected) throw new Error("Invalid signature")` },
      { type: "callout", tone: "info", text: "Always verify against the raw request body, not the parsed JSON." },
      { type: "h2", text: "Idempotency" },
      { type: "ul", items: ["Each event has a unique `id` — store and dedupe.", "Return 2xx as soon as you've accepted the event.", "Do heavy work in a background queue."] },
    ],
  },
  {
    slug: "auth-and-security",
    audience: "developers",
    category: "security",
    categoryLabel: "Auth & security",
    title: "Auth & security",
    summary: "API key rotation, OAuth flows, request signing, IP allowlists, and PCI scope.",
    readTime: "7 min read",
    updated: "2025-05-10",
    personas: ["platform"],
    body: [
      { type: "p", text: "Who this is for: platform engineers hardening a production integration." },
      { type: "h2", text: "Checklist" },
      { type: "ul", items: ["Rotate keys at least every 90 days.", "Use OAuth for any user-delegated access.", "Sign sensitive requests with a shared secret.", "Restrict admin keys to an IP allowlist.", "Tokenize cards to stay in SAQ-A scope."] },
      { type: "callout", tone: "warning", text: "Never log full bearer tokens or card data — redact at the edge." },
    ],
  },
  {
    slug: "sub-merchant-onboarding-api",
    audience: "developers",
    category: "partner-api",
    categoryLabel: "Partner & acquirer APIs",
    title: "Sub-merchant onboarding API",
    summary: "Programmatically board sub-merchants under your partner account and track KYC status.",
    readTime: "6 min read",
    updated: "2025-05-12",
    personas: ["acquirer-dev"],
    next: "split-payments-api",
    body: [
      { type: "p", text: "Who this is for: acquirer and partner developers building boarding flows on behalf of merchants." },
      { type: "h2", text: "Task flow" },
      { type: "ol", items: ["POST /v1/partners/sub_merchants with business profile.", "Upload KYC documents via /v1/partners/sub_merchants/:id/documents.", "Poll or subscribe to `sub_merchant.kyc.updated`.", "Activate the account on `verified`."] },
      { type: "callout", tone: "info", text: "Sub-merchants inherit your platform's risk policies until they're individually configured." },
    ],
  },
  {
    slug: "split-payments-api",
    audience: "developers",
    category: "partner-api",
    categoryLabel: "Partner & acquirer APIs",
    title: "Revenue share & split payments",
    summary: "Split a single charge across multiple recipients with platform fees and partner commissions.",
    readTime: "5 min read",
    updated: "2025-05-13",
    personas: ["acquirer-dev"],
    body: [
      { type: "p", text: "Splits let you take a platform fee and route the remainder to the sub-merchant in a single charge." },
      { type: "code", lang: "json", text: `{\n  "amount": 10000,\n  "currency": "usd",\n  "transfers": [\n    { "destination": "subm_123", "amount": 9000 },\n    { "destination": "partner_self", "amount": 1000 }\n  ]\n}` },
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
    personas: ["owner", "merchant"],
    next: "accepting-payments",
    body: [
      { type: "p", text: "Who this is for: business owners setting up a new account. Onboarding takes most businesses 10–15 minutes." },
      { type: "h2", text: "Prerequisites" },
      { type: "ul", items: ["Legal business name and registration number", "Beneficial owner ID", "Bank account for payouts"] },
      { type: "h2", text: "Task flow" },
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
    summary: "Configure payment methods and start accepting payments online and in person.",
    readTime: "5 min read",
    updated: "2025-04-05",
    personas: ["merchant"],
    next: "managing-payouts",
    body: [
      { type: "p", text: "Choose which payment methods to accept based on your customer base and region." },
      { type: "ul", items: ["Cards (Visa, Mastercard, Amex, Discover)", "ACH / SEPA bank transfers", "Wallets (Apple Pay, Google Pay)", "Local methods (iDEAL, Bancontact, PIX)"] },
    ],
  },
  {
    slug: "managing-payouts",
    audience: "businesses",
    category: "payments",
    categoryLabel: "Payments & payouts",
    title: "Managing payouts & reconciliation",
    summary: "Payout schedules, currencies, and how to reconcile against your accounting system.",
    readTime: "5 min read",
    updated: "2025-04-02",
    personas: ["operations", "owner"],
    next: "handling-disputes",
    body: [
      { type: "p", text: "Standard payouts settle in 2 business days. You can switch to weekly or monthly in Settings → Payouts." },
      { type: "h2", text: "Reconciliation flow" },
      { type: "ol", items: ["Export the daily payout report (CSV).", "Match the payout total to your bank deposit.", "Match individual transactions to invoices.", "Investigate any unmatched line items."] },
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
    personas: ["operations"],
    next: "fraud-and-risk",
    body: [
      { type: "p", text: "You have 7 days from notification to submit evidence. Strong evidence packages include receipts, shipping proof, and customer communication." },
      { type: "h2", text: "Evidence checklist" },
      { type: "ul", items: ["Order receipt and confirmation email", "Proof of delivery or service rendered", "Customer communication thread", "Refund policy snapshot", "Device fingerprint and IP address"] },
      { type: "callout", tone: "warning", text: "Missing the deadline forfeits the dispute automatically." },
    ],
  },
  {
    slug: "invoicing-and-recurring",
    audience: "businesses",
    category: "billing",
    categoryLabel: "Billing & invoicing",
    title: "Invoicing and recurring billing",
    summary: "Send one-off invoices and run subscription billing with proration and dunning.",
    readTime: "5 min read",
    updated: "2025-05-04",
    personas: ["owner"],
    body: [
      { type: "p", text: "Who this is for: business owners managing customer billing." },
      { type: "h2", text: "Task flow" },
      { type: "ol", items: ["Create a product and price.", "Attach the price to a customer as a subscription.", "Configure dunning rules for failed payments.", "Enable automatic invoice emails."] },
    ],
  },
  {
    slug: "fraud-and-risk",
    audience: "businesses",
    category: "disputes",
    categoryLabel: "Disputes & risk",
    title: "Fraud and risk controls",
    summary: "Tune risk rules, block lists, and 3DS triggers to reduce fraud losses.",
    readTime: "6 min read",
    updated: "2025-05-07",
    personas: ["operations"],
    body: [
      { type: "p", text: "Risk controls balance fraud prevention against checkout conversion." },
      { type: "ul", items: ["Block list by email, BIN, or IP", "Velocity rules per card and per customer", "3DS trigger on high-risk scores", "Manual review queue for borderline charges"] },
    ],
  },
  {
    slug: "team-roles-and-permissions",
    audience: "businesses",
    category: "operations",
    categoryLabel: "Team & access",
    title: "Team roles and permissions",
    summary: "Invite teammates and scope their access with built-in roles.",
    readTime: "4 min read",
    updated: "2025-05-09",
    personas: ["owner"],
    body: [
      { type: "p", text: "Roles let you scope access to what each teammate actually needs." },
      { type: "ul", items: ["Owner — full access including billing.", "Admin — full access except billing.", "Developer — API keys and webhooks.", "Support — view-only on payments and customers."] },
    ],
  },

  // ───── Resellers / Partners ─────
  {
    slug: "partner-onboarding",
    audience: "resellers",
    category: "getting-started",
    categoryLabel: "Getting started",
    title: "Partner onboarding",
    summary: "Sign the partner agreement and access the partner portal.",
    readTime: "4 min read",
    updated: "2025-03-20",
    personas: ["reseller", "acquirer", "referral"],
    next: "commission-structure",
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
    summary: "How commissions are calculated, paid, and reported across partner types.",
    readTime: "3 min read",
    updated: "2025-03-15",
    personas: ["reseller", "acquirer", "referral"],
    body: [
      { type: "p", text: "Commission is a percentage of net revenue from accounts you manage or referred, paid monthly in arrears." },
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
    personas: ["reseller", "referral"],
    next: "co-branded-materials",
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
    personas: ["reseller", "acquirer"],
    body: [
      { type: "p", text: "Sub-accounts are full merchant accounts attached to your partner ID. You can manage billing and access on their behalf." },
    ],
  },
  {
    slug: "acquirer-program-overview",
    audience: "resellers",
    category: "acquirer",
    categoryLabel: "Acquirer & ISO program",
    title: "Acquirer / ISO program overview",
    summary: "How the acquirer program works: boarding rights, residuals, and program-level reporting.",
    readTime: "5 min read",
    updated: "2025-05-05",
    personas: ["acquirer"],
    next: "sub-merchant-lifecycle",
    body: [
      { type: "p", text: "Who this is for: ISOs and acquirers running a portfolio of sub-merchants on the platform." },
      { type: "ul", items: ["Direct boarding API access", "Residual reporting per sub-merchant", "Configurable risk and pricing templates", "Co-branded merchant experiences"] },
    ],
  },
  {
    slug: "sub-merchant-lifecycle",
    audience: "resellers",
    category: "acquirer",
    categoryLabel: "Acquirer & ISO program",
    title: "Sub-merchant lifecycle",
    summary: "Boarding, activation, monitoring, and offboarding for sub-merchants in your portfolio.",
    readTime: "6 min read",
    updated: "2025-05-11",
    personas: ["acquirer"],
    body: [
      { type: "p", text: "Sub-merchants move through a predictable lifecycle. Each stage exposes hooks you can automate." },
      { type: "ol", items: ["Boarding — submit profile + KYC docs.", "Verification — automated + manual review.", "Activation — first successful charge.", "Monitoring — risk and volume alerts.", "Offboarding — graceful close with reserve release."] },
    ],
  },
  {
    slug: "referral-quickstart",
    audience: "resellers",
    category: "getting-started",
    categoryLabel: "Getting started",
    title: "Referral program quickstart",
    summary: "Refer merchants with a tracking link and earn revenue share without managing accounts.",
    readTime: "3 min read",
    updated: "2025-05-06",
    personas: ["referral"],
    body: [
      { type: "ol", items: ["Generate your referral link in the partner portal.", "Share it via email, blog, or social.", "Track sign-ups and conversions.", "Get paid monthly once thresholds are met."] },
    ],
  },
  {
    slug: "co-branded-materials",
    audience: "resellers",
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Co-branded materials and approvals",
    summary: "Submit co-branded assets for review and turnaround within 2 business days.",
    readTime: "3 min read",
    updated: "2025-05-08",
    personas: ["reseller"],
    body: [
      { type: "p", text: "Co-branded materials require approval before public use. Use the request form in the partner portal." },
      { type: "callout", tone: "info", text: "Most requests turn around within 2 business days." },
    ],
  },
]

export const articlesByAudience = (a: Audience) => articles.filter((x) => x.audience === a)
export const findArticle = (audience: Audience, slug: string) =>
  articles.find((x) => x.audience === audience && x.slug === slug)
export const articlesByCategory = (audience: Audience, categorySlug: string) =>
  articles.filter((x) => x.audience === audience && x.category === categorySlug)
export const articlesByPersona = (audience: Audience, persona: Persona | "all") =>
  persona === "all"
    ? articlesByAudience(audience)
    : articlesByAudience(audience).filter((a) => a.personas?.includes(persona))
export const categoriesFor = (audience: Audience) => {
  const map = new Map<string, { slug: string; label: string; count: number }>()
  articlesByAudience(audience).forEach((a) => {
    const e = map.get(a.category)
    if (e) e.count += 1
    else map.set(a.category, { slug: a.category, label: a.categoryLabel, count: 1 })
  })
  return Array.from(map.values())
}
