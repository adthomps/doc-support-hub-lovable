## Goal

Take the POC from "every top-level route renders something" to "every link goes somewhere meaningful, every page has complete states, and the experience aligns with APT design principles." No new design tokens.

## Audit — what's missing today

**Dead links / no terminal pages:**
- Audience hubs (Developers, Businesses, Resellers) list "Popular guides", "Categories", "Video tutorials", "API topics", "Marketing assets", "SDK buttons", "Quick FAQ → View all" — none of these are clickable to a real article/detail.
- Businesses sidebar buttons (Contact support, Live chat, Community forum, Downloads) are not wired.
- Resellers sidebar (Submit lead, Request demo, Partner support, Marketing asset downloads, Training Start/Continue) are not wired.
- Header "Visit app", "Notifications", "GitHub" are decorative only.
- Sidebar still has its own non-functional `<input>` search instead of opening the command palette.
- Index hero search input does not open the command palette.

**APT design-principle gaps (per `design.md`):**
- "Complete states are required" — no empty/loading/error states on lists, search, or forms beyond Faq's empty hint.
- No breadcrumbs / location signal on subpages.
- No 404 styling consistent with APT (NotFound is default scaffold).
- Index page shows the older hero + audience grid pattern; per APT "structure over decoration", trim hero to a single clear value statement and remove the redundant non-functional hero search (palette already in header).
- Footer is missing — no global location for principles, version, status link.

**Content gaps:**
- No actual documentation articles. Everything is a list pointing nowhere.
- Changelog/API/Status are interactive but isolated; no cross-links from audience hubs.

## Plan

### 1. New: generic Article route + content registry
- Add `src/content/articles.ts` — typed registry of ~12 mock articles (4 per audience): id, slug, audience, title, summary, readTime, body (markdown-ish string rendered as styled paragraphs/lists/code).
- Add `src/pages/Article.tsx` — renders one article by slug, with breadcrumbs (Home › {Audience} › {Title}), AptTag for audience, "Was this helpful?" footer, "Related articles" sidebar (3 from same audience), "Need help? → /support" CTA.
- Route: `/:audience/articles/:slug` in `App.tsx` (audience ∈ developers|businesses|resellers, validated in the page).
- Wire all "Popular guides", "Categories" (category opens an index list), and "API topics" cards on the three audience hubs to real article slugs.

### 2. New: Category index pages (lightweight)
- Add `src/pages/CategoryIndex.tsx` — route `/:audience/category/:categorySlug`. Lists articles in that category with empty-state when none.
- Wire category cards on Businesses/Developers/Resellers to this route.

### 3. New: Breadcrumbs primitive
- Add `src/components/apt/AptBreadcrumbs.tsx` (wraps shadcn `breadcrumb`) — used in Layout above each subpage main content based on route segments + a small route-title map.

### 4. Layout + global polish
- `Layout.tsx`: render `<AptBreadcrumbs />` between Header and `<main>` (skip on `/`).
- `Header.tsx`: remove "Visit app" decorative button OR link it to `/` ; keep Notifications/GitHub but make GitHub link to the APT principles repo (https://github.com/adthomps/apt-principles), Notifications opens a popover with "No new notifications" empty state.
- `AppSidebar.tsx`: replace the raw `<input>` with a button that opens the command palette (lift palette state to Layout via context or simple shared `useState` + provider; simplest = move palette open state into a tiny `useCommandPalette` hook with module-level event bus, or pass via `Layout` → both Header and Sidebar). Cleanest: add `src/hooks/useCommandPalette.tsx` (Context provider) wrapping Layout; Header/Sidebar both consume.
- `Index.tsx`: remove the inline hero search (palette is global). Tighten copy. Add a "What's new" strip below quick-access pulling latest 3 changelog entries (import shared changelog data — see #5).

### 5. Extract shared mock data
- Move `releases` out of `Changelog.tsx` into `src/content/changelog.ts` so Index can import latest 3.
- Move `services`/`incidents` out of `Status.tsx` into `src/content/status.ts` (Status page imports; Header status dot can read overall status from same source — future use).

### 6. Footer
- Add `src/components/Footer.tsx` (rendered in Layout): three columns — Product (links to audience hubs), Resources (Getting Started, API, Changelog), Support (FAQ, Support, Status) — plus a bottom row with "Built on APT principles" linking to the GitHub repo and a small status indicator pulling from `status.ts`.

### 7. Complete states (per APT design rule #4)
- API reference: empty state when search yields nothing (already partial — keep).
- Article: 404 fallback when slug not found → reuse `EmptyState` with link back to audience hub.
- Category index: empty state when category has no articles.
- Support form: success state already shown via toast; add a visible inline confirmation card after submit (auto-dismiss after 8s) for users who miss the toast.
- NotFound: rebuild with `EmptyState` + APT styling, links to Home / Search (opens palette) / Support.

### 8. Wire remaining dead actions (no backend, just UX)
- Businesses sidebar: Contact support → `/support`; Live chat → toast "Live chat coming soon"; Community forum → toast; Downloads buttons → toast "Download starting…".
- Resellers sidebar: Submit lead/Request demo/Partner support → all link to `/support` with prefilled `?category=partner` (read in Support page to default the Select).
- Resellers training Start/Continue/Review → toast "Module opening…" (POC scope).
- Marketing asset download buttons → toast.

### 9. APT alignment touches
- Verify all pages use `AptSection` + `AptCard` (already true).
- Add `aria-label` on icon-only buttons that are missing them (audit pass).
- Confirm no decorative gradients/glows (memory rule). Currently clean — keep.

## Files (summary)

**New:**
- `src/content/articles.ts`
- `src/content/changelog.ts`
- `src/content/status.ts`
- `src/components/apt/AptBreadcrumbs.tsx`
- `src/components/Footer.tsx`
- `src/hooks/useCommandPalette.tsx`
- `src/pages/Article.tsx`
- `src/pages/CategoryIndex.tsx`

**Edited:**
- `src/App.tsx` (new routes)
- `src/components/Layout.tsx` (breadcrumbs, footer, palette provider)
- `src/components/Header.tsx` (consume palette context, fix dead buttons)
- `src/components/AppSidebar.tsx` (search → opens palette)
- `src/pages/Index.tsx` (drop inline search, add What's new strip)
- `src/pages/Developers.tsx` (wire api topics → articles)
- `src/pages/Businesses.tsx` (wire guides/categories/sidebar)
- `src/pages/Resellers.tsx` (wire training/assets/quick actions)
- `src/pages/Changelog.tsx` (import shared data)
- `src/pages/Status.tsx` (import shared data)
- `src/pages/Support.tsx` (read `?category=` query, show inline confirmation)
- `src/pages/NotFound.tsx` (APT EmptyState style)

## Out of scope (for next iteration)
- Real authentication / Lovable Cloud persistence
- Real article search indexing (palette only navigates routes today)
- Light mode toggle
- i18n
