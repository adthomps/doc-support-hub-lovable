

## Goal
1. Rename "Customers" → "Businesses / Merchants" across the app.
2. Flesh out the POC with real, interactive content on the currently-stubbed routes so reviewers can click through a meaningful experience.

---

## Part 1 — Rename Customers → Businesses/Merchants

**Label:** "Businesses" (primary nav label, concise) with subtitle "Merchants & business users"
**Route:** `/businesses` (redirect `/customers` → `/businesses` to avoid breaking links)
**Audience tag:** "Merchant"

Files to update:
- `src/pages/Customers.tsx` → rename to `src/pages/Businesses.tsx`; update copy (eyebrow "Businesses", title "Business & merchant hub", description aligned to merchant ops: onboarding, billing, account, dispute handling).
- `src/App.tsx` — replace `/customers` route with `/businesses`, keep `/customers` as a redirect to `/businesses`, import renamed component.
- `src/components/AppSidebar.tsx` — update `audienceItems` entry (title, url, description "Merchant guides & operations").
- `src/pages/Index.tsx` — update audiences card (title, href, description, eyebrow "Merchant").

Content tweaks on the page itself (still card-based, APT compliant):
- Popular guides → merchant-flavored: "Onboarding your business", "Accepting payments", "Managing payouts", "Handling disputes & chargebacks".
- Categories → "Onboarding & KYC", "Payments & payouts", "Billing & invoicing", "Disputes & risk".
- FAQ → merchant-relevant questions.

---

## Part 2 — Flesh out POC for richer click-through

Currently `/getting-started`, `/api`, `/changelog`, `/faq`, `/support`, `/status` all render the same `ComingSoon` placeholder. Build real, interactive content for each using existing APT primitives (no new design tokens).

### A. `/getting-started` — Getting Started
- Audience selector (3 interactive cards: Developer / Merchant / Reseller) that filters the steps shown below.
- Numbered step list (5 steps) with checkbox state stored in `localStorage` for progress persistence.
- Progress bar at top reflecting completion %.
- Sidebar: "What's next" links into Developers/Businesses/Resellers pages.

### B. `/api` — API Reference
- Searchable endpoint list (client-side filter input).
- Grouped sections: Auth, Users, Payments, Webhooks (use `accordion.tsx`).
- Each endpoint row: HTTP method tag (AptTag color by verb), path, short description.
- Right-side detail panel for the selected endpoint with example request/response (reuse code-block pattern from `Developers.tsx`).

### C. `/changelog` — Changelog
- Vertical timeline of 6–8 mock releases (version, date, AptTag for "Feature"/"Fix"/"Breaking").
- Filter chips (All / Features / Fixes / Breaking) using AptTag interactive state.
- Each entry expandable (accordion) for full notes.

### D. `/faq` — FAQ
- Tabs by audience: Developers / Businesses / Resellers (use `tabs.tsx`).
- Accordion of 6–8 Q&A per tab.
- Search input filtering across all tabs.
- Sidebar: "Still need help?" CTA to `/support`.

### E. `/support` — Contact Support
- Contact form (Name, Email, Category select, Subject, Message) using `form.tsx` + `react-hook-form` + `zod` (already in deps). Submit shows toast success and clears form (no backend — POC only).
- Sidebar cards: response time SLA, alternative channels (community, email), link to status page.

### F. `/status` — System Status
- Overall status banner ("All systems operational" with success dot).
- List of 6 services (API, Dashboard, Webhooks, Payments, Auth, Docs) each with status AptTag (operational/degraded/down) and 90-day uptime sparkline (simple CSS bar row, no chart lib).
- Recent incidents list (3 mock entries, expandable).

### G. Global polish
- Header search → make it focusable with a `Cmd/Ctrl+K` hint badge (visual only for POC, opens a simple `command.tsx` palette listing all routes).
- Sidebar search → wire to same command palette trigger.
- Index hero search → also opens command palette on focus.

---

## Technical notes
- All new pages use `AptSection` + `AptCard` variants per spec; no raw colors, only semantic tokens.
- Reuse existing shadcn components: `accordion`, `tabs`, `form`, `input`, `select`, `command`, `dialog`, `sonner` (toast).
- Persist `getting-started` checkbox state in `localStorage` only — no backend.
- All mock data lives inline in each page file (POC scope).
- No changes to design tokens, `tailwind.config.ts`, or `index.css`.

## Files touched (summary)
- Rename: `src/pages/Customers.tsx` → `src/pages/Businesses.tsx`
- Edit: `src/App.tsx`, `src/components/AppSidebar.tsx`, `src/pages/Index.tsx`
- Replace stub usage: `src/pages/GettingStarted.tsx`, `src/pages/ApiReference.tsx`, `src/pages/Changelog.tsx`, `src/pages/Faq.tsx`, `src/pages/Support.tsx`, `src/pages/Status.tsx` (new files)
- Edit: `src/components/Header.tsx` (search → command palette trigger)
- New: `src/components/CommandPalette.tsx` (shared global ⌘K)
- Keep: `src/pages/ComingSoon.tsx` (still useful as fallback)

