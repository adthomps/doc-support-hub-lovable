## Goal

Cover more user types within the existing 3-hub structure and deepen the documentation so reviewers can click through realistic, persona-targeted content.

- Keep top-level hubs: **Developers**, **Businesses**, **Resellers** (renamed in sidebar to **Partners & Resellers**).
- Inside each hub, add **sub-persona tabs** that filter guides and surface "task flows".
- Reach **4–6 guides per persona** with step-by-step bodies, prerequisites, and "next step" chaining.
- Expand the **API reference** and add **integration guides**, **auth & security**, and **acquirer/partner technical docs**.

## Sub-personas per hub

- **Developers** → Integrators (build new), Platform engineers (operate/scale), Partner/Acquirer developers (sub-merchant APIs).
- **Businesses** → Merchants (day-to-day), Business owners (finance/strategy), Operations (disputes/fraud/payouts).
- **Partners & Resellers** → Resellers, Acquirers / ISOs, Referral partners.

Sub-persona selection filters the article list and recommended task flows; the URL keeps a `?persona=` query so links remain shareable.

## Content additions (registry-driven)

Extend `src/content/articles.ts` with a `personas?: string[]` tag on each article plus new entries:

**Developers (target 6+)**
- Quickstart: first API call (integrators)
- Hosted checkout integration (integrators) — use case guide
- Server-to-server payments (integrators)
- Webhooks deep dive + retries (platform eng)
- Auth & security: API keys, OAuth, request signing, IP allowlists, PCI scope (platform eng)
- Sub-merchant onboarding API (acquirer devs)
- Revenue share / split payments API (acquirer devs)

**Businesses (target 6+)**
- Onboarding your business (existing) — add prerequisites + next step
- Accepting payments (existing) — expand methods, regions
- Managing payouts (existing) — add reconciliation flow
- Handling disputes (existing) — add evidence checklist
- Invoicing and recurring billing (business owners)
- Fraud and risk controls (operations)
- Team roles and permissions (business owners)

**Partners & Resellers (target 6+)**
- Partner onboarding (existing)
- Commission structure (existing)
- Marketing assets (existing)
- Managing sub-accounts (existing)
- Acquirer/ISO program overview (acquirers)
- Sub-merchant lifecycle: boarding → activation → offboarding (acquirers)
- Referral program quickstart (referral partners)
- Co-branded materials and approvals (resellers)

Each article body uses existing `ArticleBlock` types and includes:
- Short "Who this is for" paragraph
- Numbered task flow (`ol`)
- `callout` for prerequisite or warning
- "Next step" link rendered by `Article.tsx`

## API reference expansion

Edit `src/pages/ApiReference.tsx` `groups` to add:
- **Auth**: refresh token, introspect.
- **Customers / Sub-merchants**: list, create, update, KYC status.
- **Payments**: refunds, captures, partial capture, 3DS authentication.
- **Payouts**: schedules, reversals.
- **Disputes**: list, submit evidence, accept.
- **Webhooks**: rotate signing secret, replay event.
- **Partners**: list sub-merchants, commission report.

Each endpoint keeps the existing `request`/`response` shape so the detail panel works unchanged. Add a small **error codes** panel at the bottom (table of common 4xx/5xx codes with meaning and remediation).

## UI / navigation changes

- `src/components/AppSidebar.tsx`: rename "Resellers" label to "Partners & Resellers"; keep the route `/resellers`.
- `src/pages/Index.tsx`: update the third audience card title + features to mention acquirers and referral partners.
- New `src/components/PersonaTabs.tsx`: APT-styled segmented control bound to `?persona=` via `useSearchParams`. Used in `Developers.tsx`, `Businesses.tsx`, `Resellers.tsx`. "All" tab shows everything; selecting a persona filters via the new `personas` field and updates a short "What you'll find here" blurb.
- `Article.tsx`: render `personas` tags and a "Next in this path" link when the article registry exposes a `next?: string` slug.

## Technical notes

- All filtering stays client-side against the static registry — no backend.
- Reuse `useArticleFilters` for keyword + read-time; persona filter composes on top.
- Keep APT tokens and primitives (`AptSection`, `AptCard`, `AptTag`, `EmptyState`); no new colors, gradients, or nested cards.
- Define loading/empty/error states for filtered lists (empty → `EmptyState` with reset action).
- No new dependencies. No schema, no Cloud changes.

## Files

**New**
- `src/components/PersonaTabs.tsx`

**Edit**
- `src/content/articles.ts` (add `personas`, optional `next`, add ~12 new articles)
- `src/pages/ApiReference.tsx` (more endpoints + error codes panel)
- `src/pages/Developers.tsx`, `src/pages/Businesses.tsx`, `src/pages/Resellers.tsx` (persona tabs + persona-aware copy)
- `src/pages/Article.tsx` (persona chips + "Next step")
- `src/components/AppSidebar.tsx` (label rename)
- `src/pages/Index.tsx` (third audience card copy)

## Validation

- Click each hub, switch personas, confirm article list updates and URL reflects `?persona=`.
- Open 2–3 new articles per hub, confirm "Next step" navigates correctly.
- Search the API reference for new endpoints (e.g., `refund`, `sub-merchant`) and confirm detail panel renders.
- Confirm sidebar shows "Partners & Resellers" and `/resellers` still resolves.
- Empty-state appears when keyword filter excludes all results.

## Out of scope

- No real auth, no backend persistence beyond existing `localStorage` feedback.
- No new top-level routes; partner content stays under `/resellers`.
- No visual redesign — APT tokens and existing components only.
